function skip_recv_buf(data, data2) {
  var bytes = new Uint8Array(data.byteLength - data2);
  bytes.set(data.subarray(data2));
  return bytes;
}
function parse_cmd(client) {
  var i;
  do {
    i = false;
    var byteLen = client.recv_buf;
    var value = byteLen.byteLength;
    if (value >= 0x4) {
      if (byteLen[0x0] == 0xff && byteLen[0x1] == 0xff && byteLen[0x2] == 0xff && byteLen[0x3] == 0xff) {} else {
        client.recv_buf = new Uint8Array(0x0);
        client.syncing = true;
        log_r(">>>>>>>>sync start");
      }
    }
    if (!client.syncing && value >= 6) {
      if ((byteLen[0x4] & 0xf) == 0x3 && byteLen[6] == 0x20) {}
      var value2 = byteLen[0x4] << 0x4 & 0xf00 | byteLen[5] & 0xff;
      if (value >= value2 + 0x4) {
        var value3 = byteLen[0x4] & 0xf;
        if (value3 == RESP_DEVICE_INFO_JSON) {
          var idx;
          if (byteLen[0x4 + value2 - 0x1] == 0x0) {
            idx = String.fromCharCode.apply(null, byteLen.subarray(6, 0x4 + value2 - 0x1));
          } else {
            idx = String.fromCharCode.apply(null, byteLen.subarray(6, 0x4 + value2));
          }
          console.log("[JSON-ORIG] raw device_info string:", (idx || '').substring(0, 300));
          client.device_info = reset_device_info(client.device_info);
          client.device_info = parse_device_info(client.device_info, idx);
          if (client.device_info.deviceName != undefined) {
            client.connected = true;
            client.helloed = client.device_info.deviceName.length > 0x0;
            client.device_name = client.device_info.deviceName;
          } else {
            client.recv_buf = new Uint8Array(0x0);
            client.syncing = true;
            log_r(">>>>>>>>sync start");
          }
          if (client.virtual && client.helloed) {
            client.esb_last_alive_time = new Date().getTime();
            client.esb_alive_timeout = ESB_ALIVE_TIMEOUT_MS;
          }
          if (!client.virtual && is_receiver(client) && client.helloed) {
            var flag = false;
            usb_client_list.forEach(item => {
              if (item.virtual && item.device == client.device) {
                flag = true;
              }
            });
            if (!flag) {
              log_r("add new virtual client");
              var client2 = create_usb_client(client.device, 0x0, true);
              usb_client_list[usb_client_list.length] = client2;
              if (client.helloed) {
                send_event_query(client2);
              }
            }
            if (!is_limit_memory(client)) {
              send_event_action(client, CMD_VIRTUAL_CHILD_POLL, 0x0);
            }
          }
          if (client.device_info.revision != undefined) {
            query_firmware(client, client.device_info != undefined && client.device_info.revision != undefined && client.device_info.revision.substr(0x0, 0x2) == 'G-' ? 0x1 : 0x0);
          }
          window.postMessage({
            'action': ACTION_REFRESH_CLIENT_LIST
          });
        } else {
          if (value3 == RESP_PARAMETER) {
            var value4 = byteLen[6];
            var payload = [];
            for (var offset = 0x3; offset < value2; offset++) {
              payload.push(byteLen[0x4 + offset]);
            }
            var bytes = new Uint8Array(payload);
            if (value4 == PARAM_RESOLUTION) {
              client.device_info.resolution = bytes[0x0] | bytes[0x1] << 0x8;
              window.postMessage({
                'action': ACTION_UI_REFRESH_SETTING
              });
            } else {
              if (value4 == PARAM_RESOLUTION_32BIT) {
                client.device_info.resolution = bytes[0x0] | bytes[0x1] << 0x8 | bytes[0x2] << 0x10 | bytes[0x3] << 0x18;
                window.postMessage({
                  'action': ACTION_UI_REFRESH_SETTING
                });
              } else {
                if (value4 == PARAM_POLLING_RATE) {
                  var pollingRateVal = bytes[0x0] | bytes[0x1] << 0x8;
                  if (client.device_info.pollingRate < 0x0) {
                    client.device_info.pollingRate = pollingRateVal;
                    window.postMessage({
                      'action': ACTION_UI_REFRESH_SETTING
                    });
                  }
                } else {
                  if (value4 == PARAM_POWER_MODE) {
                    client.device_info.powerMode = bytes[0x0];
                    window.postMessage({
                      'action': ACTION_UI_REFRESH_SETTING
                    });
                  } else {
                    if (value4 == PARAM_KEY_DELAY) {
                      client.device_info.keyDelay = [];
                      for (var offset = 0x0; offset < bytes.byteLength; offset++) {
                        client.device_info.keyDelay.push(bytes[offset]);
                      }
                      window.postMessage({
                        'action': ACTION_UI_REFRESH_SETTING
                      });
                    } else {
                      if (value4 == PARAM_LOD) {
                        client.device_info.lod = bytes[0x0];
                        window.postMessage({
                          'action': ACTION_UI_REFRESH_SETTING
                        });
                      } else {
                        if (value4 == PARAM_ESB_DEVICE_INFO) {
                          var idx;
                          if (byteLen[0x4 + value2 - 0x1] == 0x0) {
                            idx = String.fromCharCode.apply(null, byteLen.subarray(7, 0x4 + value2 - 0x1));
                          } else {
                            idx = String.fromCharCode.apply(null, byteLen.subarray(7, 0x4 + value2));
                          }
                          client.device_info = reset_device_info_esb(client.device_info);
                          client.device_info = parse_device_info(client.device_info, idx);
                          window.postMessage({
                            'action': ACTION_UI_REFRESH_CLIENT_LIST
                          });
                          window.postMessage({
                            'action': ACTION_UI_REFRESH_CURRENT_CLIENT
                          });
                        } else {
                          if (value4 == PARAM_MOTION_SYNC) {
                            client.device_info.motionSync = bytes[0x0];
                            window.postMessage({
                              'action': ACTION_UI_REFRESH_SETTING
                            });
                          } else {
                            if (value4 == PARAM_ANGLE_TUNING) {
                              client.device_info.angleTuning = bytes[0x0] << 0x18 >> 0x18;
                              window.postMessage({
                                'action': ACTION_UI_REFRESH_SETTING
                              });
                            } else {
                              if (value4 == PARAM_ANGLE_SNAPPING) {
                                client.device_info.angleSnapping = bytes[0x0];
                                window.postMessage({
                                  'action': ACTION_UI_REFRESH_SETTING
                                });
                              } else {
                                if (value4 == PARAM_RIPPLE_CONTROL) {
                                  client.device_info.rippleControl = bytes[0x0];
                                  window.postMessage({
                                    'action': ACTION_UI_REFRESH_SETTING
                                  });
                                } else {
                                  if (value4 == PARAM_KEY_DELAY_NOOP) {} else {
                                    if (value4 == PARAM_2_4G_SCORES) {
                                      var scoreVal = bytes[0x0] | bytes[0x1] << 0x8;
                                      var value5 = bytes[0x2] | bytes[0x3] << 0x8;
                                      var value6 = bytes[0x4] | bytes[0x5] << 0x8;
                                      log_r("2.4G scores: " + scoreVal + ", " + value5 + ", " + value6);
                                      if (scoreVal > value5 && scoreVal > value6) {
                                        if ((client.device_info.txOutputPower == 0x0 ? 0x0 : 0x1) == 0x1) {
                                          setTimeout(() => {
                                            log_r("set rf channel 2");
                                            send_event_set_rf_channel(client, 0x2);
                                            window.postMessage({
                                              'action': ACTION_UI_REFRESH_SETTING
                                            });
                                          }, CHANNEL_SET_DELAY_MS);
                                        }
                                      } else if (value5 > scoreVal && value5 > value6) {
                                        if ((client.device_info.txOutputPower == 0x0 ? 0x0 : 0x1) == 0x1) {
                                          setTimeout(() => {
                                            log_r("set rf channel 40");
                                            send_event_set_rf_channel(client, 0x28);
                                            window.postMessage({
                                              'action': ACTION_UI_REFRESH_SETTING
                                            });
                                          }, CHANNEL_SET_DELAY_MS);
                                        }
                                      } else if ((client.device_info.txOutputPower == 0x0 ? 0x0 : 0x1) == 0x1) {
                                        setTimeout(() => {
                                          log_r("set rf channel 80");
                                          send_event_set_rf_channel(client, 0x50);
                                          window.postMessage({
                                            'action': ACTION_UI_REFRESH_SETTING
                                          });
                                        }, CHANNEL_SET_DELAY_MS);
                                      }
                                    } else {
                                      if (value4 == PARAM_KEY_DELAY_ENTRY) {
                                        if (bytes.byteLength == 0x1) {
                                          if (bytes[0x0] != 0xff) {
                                            client.onboard_index = bytes[0x0];
                                            log_r("receiver onboard " + client.onboard_index);
                                            add_key_info(client, client.onboard_index, undefined);
                                            clearTimeout(mouse_config_timer);
                                            mouse_config_timer = setTimeout(() => {
                                              mouse_config_timer = undefined;
                                              client.querying_more_result = false;
                                              window.postMessage({
                                                'action': 'action_onboard_cfg',
                                                'usb_client_id': client.id,
                                                'msg': "ERROR"
                                              });
                                            }, CONFIG_TIMEOUT_MS);
                                            window.postMessage({
                                              'action': 'action_onboard_cfg',
                                              'usb_client_id': client.id,
                                              'msg': "LOADING"
                                            });
                                          } else {
                                            window.postMessage({
                                              'action': ACTION_UI_REFRESH_SETTING
                                            });
                                            clearTimeout(mouse_config_timer);
                                            mouse_config_timer = undefined;
                                            client.querying_more_result = false;
                                            window.postMessage({
                                              'action': 'action_onboard_cfg',
                                              'usb_client_id': client.id,
                                              'msg': 'LOADED'
                                            });
                                          }
                                        } else {
                                          add_key_info(client, client.onboard_index, bytes);
                                          clearTimeout(mouse_config_timer);
                                          mouse_config_timer = setTimeout(() => {
                                            mouse_config_timer = undefined;
                                            client.querying_more_result = false;
                                            window.postMessage({
                                              'action': 'action_onboard_cfg',
                                              'usb_client_id': client.id,
                                              'msg': "ERROR"
                                            });
                                          }, CONFIG_TIMEOUT_MS);
                                        }
                                      } else {
                                        if (value4 == PARAM_PEER_INFO) {
                                          if (bytes.byteLength == 0x1) {
                                            if (bytes[0x0] == 0x0) {
                                              client.device_info.peerInfo = [];
                                            } else {
                                              window.postMessage({
                                                'action': ACTION_UI_REFRESH_SETTING
                                              });
                                            }
                                          } else {
                                            var elemId = bytes[0x0] | bytes[0x1] << 0x8;
                                            var value7 = sprintf("%02x:%02x:%02x:%02x:%02x:%02x", bytes[0x2], bytes[0x3], bytes[0x4], bytes[0x5], bytes[0x6], bytes[0x7]);
                                            client.device_info.peerInfo.push({
                                              'id': elemId,
                                              'address': value7
                                            });
                                          }
                                        } else {
                                          if (value4 == PARAM_BATTERY_LEVELS) {
                                            client.device_info.batteryLevels = [];
                                            for (var offset = 0x0; offset < bytes.byteLength; offset += 0x2) {
                                              client.device_info.batteryLevels.push(bytes[offset] | bytes[offset + 0x1] << 0x8);
                                            }
                                          } else {
                                            if (value4 == PARAM_BATTERY_PERCENT) {
                                              client.device_info.battery = bytes[0x0];
                                              client.device_info.charging = bytes[0x1] == 0x1;
                                              window.postMessage({
                                                'action': ACTION_UI_REFRESH_CURRENT_CLIENT
                                              });
                                            } else {
                                              if (value4 == PARAM_SLEEP_TIME) {
                                                client.device_info.sleepTime = bytes[0x0] | bytes[0x1] << 0x8;
                                                window.postMessage({
                                                  'action': ACTION_UI_REFRESH_SETTING
                                                });
                                              } else {
                                                if (value4 == PARAM_RSSI) {
                                                  client.device_info.rssi = new Int8Array(payload)[0x0];
                                                  window.postMessage({
                                                    'action': ACTION_UI_REFRESH_CURRENT_CLIENT_RSSI
                                                  });
                                                } else {
                                                  if (value4 == PARAM_LUA_STATUS) {
                                                    client.device_info.luaStatus = bytes[0x0];
                                                    window.postMessage({
                                                      'action': ACTION_UI_REFRESH_SETTING
                                                    });
                                                  } else {
                                                    if (value4 == PARAM_PARAM_1e) {} else {
                                                      if (value4 == PARAM_PARAM_1f) {} else {
                                                        if (value4 == PARAM_NOACK) {
                                                          client.device_info.noack = bytes[0x0];
                                                          window.postMessage({
                                                            'action': ACTION_UI_REFRESH_SETTING
                                                          });
                                                        } else {
                                                          if (value4 == PARAM_COLOR_CODE) {
                                                            for (var offset = 0x0; offset < bytes.byteLength; offset++) {
                                                              if (bytes[offset] == 0x0) {
                                                                client.device_info.colorCode = String.fromCharCode.apply(null, bytes.subarray(0x0, offset));
                                                                window.postMessage({
                                                                  'action': ACTION_UI_REFRESH_CLIENT_LIST
                                                                });
                                                                window.postMessage({
                                                                  'action': ACTION_UI_REFRESH_CURRENT_CLIENT
                                                                });
                                                                break;
                                                              }
                                                            }
                                                          } else {
                                                            if (value4 == PARAM_GLASS_MODE) {
                                                              client.device_info.glassMode = bytes[0x0];
                                                              if (bytes.byteLength > 0x1) {
                                                                client.device_info.glassModeEnabled = bytes[0x1];
                                                              } else {
                                                                client.device_info.glassModeEnabled = 0x1;
                                                              }
                                                              window.postMessage({
                                                                'action': ACTION_UI_REFRESH_SETTING
                                                              });
                                                            } else {
                                                              if (value4 == PARAM_ONBOARD_INDEX) {
                                                                if (client.device_info.onboardIndex != bytes[0x0]) {
                                                                  client.device_info.onboardIndex = bytes[0x0];
                                                                  window.postMessage({
                                                                    'action': ACTION_UI_REFRESH_SETTING
                                                                  });
                                                                }
                                                              } else {
                                                                if (value4 == PARAM_ONBOARD_STATUS) {
                                                                  client.device_info.onboardStatus = [];
                                                                  for (var offset = 0x0; offset < bytes.byteLength; offset++) {
                                                                    client.device_info.onboardStatus.push(bytes[offset]);
                                                                  }
                                                                  window.postMessage({
                                                                    'action': ACTION_UI_REFRESH_SETTING
                                                                  });
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          } else {
            if (value3 == RESP_PING) {
              log_r("PING <");
              if (!client.connected) {
                if (new Date().getTime() - client.last_query_time >= ESB_ALIVE_TIMEOUT_MS) {
                  if (client.virtual) {
                    usb_client_list.forEach(item2 => {
                      if (is_receiver(item2) && item2.device == client.device) {
                        if (item2.helloed) {
                          send_event_query(client);
                        }
                      }
                    });
                  } else {
                    send_event_query(client);
                  }
                }
              } else {
                if (!is_receiver(client)) {
                  if (new Date().getTime() - client.last_query_time >= ESB_ALIVE_TIMEOUT_MS) {
                    var json = JSON.parse(JSON.stringify(client.device_info.allKeyConfigs))[0x0];
                    if (json == undefined || json.length == 0x0) {
                      send_event_query(client);
                    }
                  }
                }
              }
              client.esb_last_alive_time = new Date().getTime();
              client.esb_alive_timeout = ESB_ALIVE_TIMEOUT_MS;
              var payload = [];
              for (var offset = 0x2; offset < value2; offset++) {
                payload.push(byteLen[0x4 + offset]);
              }
              var flag2 = false;
              var bytes = new Uint8Array(payload);
              if (bytes.byteLength > 0x0) {
                if (client.device_info.squal != bytes[0x0]) {
                  client.device_info.squal = bytes[0x0];
                  flag2 = true;
                }
              }
              if (bytes.byteLength > 0x1) {
                if (client.device_info.equal != bytes[0x1]) {
                  client.device_info.equal = bytes[0x1];
                  flag2 = true;
                }
              }
              if (bytes.byteLength > 0x2) {
                if (client.device_info.txOutputPowerApplied != bytes[0x2]) {
                  client.device_info.txOutputPowerApplied = bytes[0x2];
                  flag2 = true;
                }
              }
              if (flag2) {
                window.postMessage({
                  'action': ACTION_UI_REFRESH_QUAL
                });
              }
            } else {
              if (value3 == RESP_SYNC) {
                const encodedSync = new TextEncoder().encode(SYNC_DATA);
                send_event(client, encodedSync);
              }
            }
          }
        }
        if (!client.syncing) {
          client.recv_buf = skip_recv_buf(client.recv_buf, value2 + 0x4);
          i = true;
        }
      }
    }
  } while (i);
}
function bytes_index_of(byteLen, index) {
  for (var len = 0x0; len <= byteLen.byteLength - index.byteLength; ++len) {
    var flag = true;
    for (var offset = 0x0; offset < index.byteLength; offset++) {
      if (byteLen[len + offset] != index[offset]) {
        flag = false;
        break;
      }
    }
    if (flag) {
      return len;
    }
  }
  return -0x1;
}
function recv(client, data) {
  if (client.eplapsed_syncing_ms != 0x0 && new Date().getTime() - client.eplapsed_syncing_ms > SYNC_TIMEOUT_MS) {
    if (client.syncing) {
      log_r(">>>>>>>>sync success");
      client.syncing = false;
    }
    client.recv_buf = new Uint8Array(0x0);
  }
  client.eplapsed_syncing_ms = new Date().getTime();
  var bytes = new Uint8Array(client.recv_buf.byteLength + data.byteLength);
  bytes.set(client.recv_buf);
  bytes.set(data, client.recv_buf.byteLength);
  client.recv_buf = bytes;
  if (!client.syncing) {
    parse_cmd(client);
  }
}
async function device_receive_data({
  device: device,
  reportId: reportId,
  data: data
}) {
  console.log("[DEBUG] device_receive_data called", "device=", device?.productName, "reportId=", reportId, "dataLen=", data?.byteLength);
  if (data && data.byteLength > 0) {
    console.log("[RXHEX-ORIG]", Array.from(new Uint8Array(data.buffer, data.byteOffset, data.byteLength)).slice(0,24).map(function(b) { return b.toString(16).padStart(2,"0"); }).join(" "));
  }
  if (is_hs_keyboard(device)) {
    hs_device_receive_data({
      'device': device,
      'reportId': reportId,
      'data': data
    });
    return;
  }
  usb_client_list.forEach(item => {
    if (item.device == device && !item.virtual) {
      var bytes = new Uint8Array(data.buffer);
      var value = 0xff;
      if ((bytes[0x0] & 0xc0) == 0xc0) {
        value = bytes[0x0] & 0x3f;
        bytes = bytes.subarray(0x1);
      }
      var offset = bytes[0x0] & 0x3f;
      if (value == 0xff) {
        if ((bytes[0x0] & 0xc0) == 0x40) {} else {
          bytes = bytes.subarray(0x1, 0x1 + offset);
          recv(item, bytes);
        }
      } else {
        usb_client_list.forEach(client => {
          if (client.device == device && client.virtual && client.product_esb_ch == value) {
            if ((bytes[0x0] & 0xc0) == 0x40) {
              var value2 = bytes[0x1] | bytes[0x2] << 0x8 | bytes[0x3] << 0x10 | bytes[0x4] << 0x18;
              var value3 = bytes[0xf] | bytes[0x10] << 0x8 | bytes[0x11] << 0x10 | bytes[0x12] << 0x18;
              if ((bytes[0x0] & 0x3f) < 0x12) {
                value3 = NOTIFY_DATA_BUF_SIZE;
              }
              if (value3 > 0x0) {
                if (value2 > value3 / 0x2) {
                  remote_buf_free_size = value2;
                }
              } else {
                remote_buf_free_size = value2;
              }
              if (remote_buf_free_size >= 240) {
                client.allow_send = true;
              }
            } else {
              bytes = bytes.subarray(0x1, 0x1 + offset);
              recv(client, bytes);
            }
          }
        });
      }
    }
  });
}
function log_r(msg) {}
let usb_client_list = [];
let current_usb_client;
let current_usb_receiver;
let device_cfg = [];
let pair_panel_id = -0x1;
let not_support_id = -0x1;
let connect_panel_id = -0x1;
let editing = false;
let loading_id = -0x1;
let tips_panel_id = -0x1;
let cpi_level_editing = false;
let cpi_level_index = -0x1;
let cpi_level_light = 0x0;
let mouse_keys = [];
let mouse_key_labels = [];
let setting_mapping_keys = [];
let select_key_name = '';
let key_record_panel_id = undefined;
let onboard_config_index = 0x0;
let onboard_index = 0x0;
let onboard_configs = [];
let onboard_status = [];
let onboard_keys = [];
let mouse_functions = [];
let mouse_function_descs = [];
let macro_trigger_types = [];
let macro_counts = [];
let macro_trigger_type_index = 0x0;
let edit_macros = [];
let current_edit_macro = [];
let macro_edit_panel_id = undefined;
let macro_record_panel_id = undefined;
let macro_edit_index = -0x1;
let macro_keep_time_min = 0x0;
let combination_key_index = 0x0;
let setting_mapping_key_recording = false;
let setting_mapping_keys_recorded = [-0x1, -0x1, -0x1];
let setting_macro_edit_recording = false;
let setting_macro_edit_recording_time = -0x1;
let wireless_optimizing = false;
let resize_timer_id;
let key_pos = {
  '2329': {
    'm1': [0x1e, 0x5a],
    'm2': [0x13b, 0x7a],
    'm3': [0x16d, 0x5a],
    'm4': [0x13b, 0xbe],
    'm5': [0x1e, 0xe1],
    'm6': [0x1e, 0xb4],
    'm7': [0x13b, 0x12e],
    'wheel-line-container': [0x13b, 0x44],
    'wheel-down': [0x50, 0x20],
    'wheel-up': [0x145, 0x20]
  },
  '232c': {
    'm1': [0x1e, 0x5a],
    'm2': [0x13b, 0x7a],
    'm3': [0x16d, 0x5a],
    'm4': [0x139, 0xb5],
    'm5': [0x1a, 0xde],
    'm6': [0x1e, 0xaf],
    'm7': [0x13b, 0x12e],
    'wheel-line-container': [0x13b, 0x44],
    'wheel-down': [0x50, 0x20],
    'wheel-up': [0x145, 0x20]
  },
  '232d': {
    'm1': [0x1e, 0x5a],
    'm2': [0x13b, 0x7a],
    'm3': [0x16d, 0x5a],
    'm4': [0x13b, 0xbe],
    'm5': [0x1e, 0xf0],
    'm6': [0x1e, 0xb4],
    'm7': [0x13b, 0x12e],
    'wheel-line-container': [0x13b, 0x44],
    'wheel-down': [0x50, 0x20],
    'wheel-up': [0x145, 0x20]
  },
  '232f': {
    'm1': [0x1e, 0x5a],
    'm2': [0x13b, 0x7a],
    'm3': [0x16d, 0x5a],
    'm4': [0x13b, 0xbe],
    'm5': [0x1e, 0xe1],
    'm6': [0x1e, 0xb4],
    'm7': [0x13b, 0x12e],
    'wheel-line-container': [0x13b, 0x44],
    'wheel-down': [0x50, 0x20],
    'wheel-up': [0x145, 0x20]
  },
  '2330': {
    'm1': [0x1e, 0x5a],
    'm2': [0x13b, 0x7a],
    'm3': [0x16d, 0x5a],
    'm4': [0x13b, 0xbe],
    'm5': [0x1e, 0xe1],
    'm6': [0x1e, 0xb4],
    'm7': [0x13b, 0x12e],
    'wheel-line-container': [0x13b, 0x44],
    'wheel-down': [0x50, 0x20],
    'wheel-up': [0x145, 0x20]
  },
  '2331': {
    'm1': [0x1e, 0x5a],
    'm2': [0x13b, 0x7a],
    'm3': [0x16d, 0x5a],
    'm4': [0x13b, 0xbe],
    'm5': [0x1e, 0xe1],
    'm6': [0x1e, 0xb4],
    'm7': [0x13b, 0x12e],
    'wheel-line-container': [0x13b, 0x44],
    'wheel-down': [0x50, 0x20],
    'wheel-up': [0x145, 0x20]
  },
  '232e': {
    'm1': [0x1e, 0x5a],
    'm2': [0x13b, 0x7a],
    'm3': [0x16d, 0x5a],
    'm4': [0x139, 0xb4],
    'm5': [0x1a, 0xea],
    'm6': [0x1e, 0xb8],
    'm7': [0x13b, 0x12e],
    'wheel-line-container': [0x13b, 0x44],
    'wheel-down': [0x50, 0x20],
    'wheel-up': [0x145, 0x20]
  },
  '2332': {
    'm1': [0x1e, 0x5a],
    'm2': [0x13b, 0x7a],
    'm3': [0x16d, 0x5a],
    'm4': [0x139, 0xb4],
    'm5': [0x1a, 0xea],
    'm6': [0x1e, 0xb8],
    'm7': [0x13b, 0x12e],
    'wheel-line-container': [0x13b, 0x44],
    'wheel-down': [0x50, 0x20],
    'wheel-up': [0x145, 0x20]
  },
  '2333': {
    'm1': [0x1e, 0x5a],
    'm2': [0x13b, 0x7a],
    'm3': [0x16d, 0x5a],
    'm4': [0x139, 0xb4],
    'm5': [0x1a, 0xe6],
    'm6': [0x1e, 0xb8],
    'm7': [0x13b, 0x12e],
    'wheel-line-container': [0x139, 0x44],
    'wheel-down': [0x50, 0x20],
    'wheel-up': [0x145, 0x20]
  },
  '2334': {
    'm1': [0x1e, 0x5a],
    'm2': [0x13b, 0x7a],
    'm3': [0x16d, 0x5a],
    'm4': [0x139, 0xb4],
    'm5': [0x1a, 0xe6],
    'm6': [0x1e, 0xb8],
    'm7': [0x13b, 0x12e],
    'wheel-line-container': [0x139, 0x44],
    'wheel-down': [0x50, 0x20],
    'wheel-up': [0x145, 0x20]
  },
  '2337': {
    'm1': [0x1e, 0x5a],
    'm2': [0x13b, 0x7a],
    'm3': [0x16d, 0x5a],
    'm4': [0x139, 0xb4],
    'm5': [0x1a, 0xe6],
    'm6': [0x1e, 0xb8],
    'm7': [0x13b, 0x12e],
    'wheel-line-container': [0x139, 0x44],
    'wheel-down': [0x50, 0x20],
    'wheel-up': [0x145, 0x20]
  },
  '2338': {
    'm1': [0x19, 0x5a],
    'm2': [0x136, 0x7a],
    'm3': [0x168, 0x5a],
    'm4': [0x139, 0xb4],
    'm5': [0x22, 0xe6],
    'm6': [0x24, 0xb8],
    'm7': [0x13b, 0x12e],
    'wheel-line-container': [0x136, 0x44],
    'wheel-down': [0x50, 0x20],
    'wheel-up': [0x145, 0x20]
  },
  '2339': {
    'm1': [0x19, 0x5a],
    'm2': [0x136, 0x7a],
    'm3': [0x168, 0x5a],
    'm4': [0x139, 0xb4],
    'm5': [0x22, 0xe6],
    'm6': [0x24, 0xb8],
    'm7': [0x13b, 0x12e],
    'wheel-line-container': [0x136, 0x44],
    'wheel-down': [0x50, 0x20],
    'wheel-up': [0x145, 0x20]
  },
  '233a': {
    'm1': [0x19, 0x5a],
    'm2': [0x138, 0x76],
    'm3': [0x168, 0x5a],
    'm4': [0x139, 0xad],
    'm5': [0x22, 0xe6],
    'm6': [0x24, 0xb8],
    'm7': [0x13b, 0x12e],
    'wheel-line-container': [0x138, 0x44],
    'wheel-down': [0x50, 0x20],
    'wheel-up': [0x145, 0x20]
  },
  '233e': {
    'm1': [0x1e, 0x5a],
    'm2': [0x13b, 0x7a],
    'm3': [0x16d, 0x5a],
    'm4': [0x139, 0xb4],
    'm5': [0x1a, 0xea],
    'm6': [0x1e, 0xb8],
    'm7': [0x13b, 0x12e],
    'wheel-line-container': [0x13b, 0x44],
    'wheel-down': [0x50, 0x20],
    'wheel-up': [0x145, 0x20]
  },
  '233f': {
    'm1': [0x19, 0x5a],
    'm2': [0x136, 0x7a],
    'm3': [0x168, 0x5a],
    'm4': [0x139, 0xb4],
    'm5': [0x22, 0xe6],
    'm6': [0x24, 0xb8],
    'm7': [0x13b, 0x12e],
    'wheel-line-container': [0x136, 0x44],
    'wheel-down': [0x50, 0x20],
    'wheel-up': [0x145, 0x20]
  },
  '2340': {
    'm1': [0x1e, 0x5a],
    'm2': [0x13b, 0x7a],
    'm3': [0x16d, 0x5a],
    'm4': [0x13b, 0xbe],
    'm5': [0x1e, 0xf0],
    'm6': [0x1e, 0xb4],
    'm7': [0x13b, 0x12e],
    'wheel-line-container': [0x13b, 0x44],
    'wheel-down': [0x50, 0x20],
    'wheel-up': [0x145, 0x20]
  },
  '2343': {
    'm1': [0x19, 0x5a],
    'm2': [0x138, 0x76],
    'm3': [0x168, 0x5a],
    'm4': [0x139, 0xad],
    'm5': [0x22, 0xe6],
    'm6': [0x24, 0xb8],
    'm7': [0x13b, 0x12e],
    'wheel-line-container': [0x138, 0x44],
    'wheel-down': [0x50, 0x20],
    'wheel-up': [0x145, 0x20]
  },
  '2344': {
    'm1': [0x19, 0x5a],
    'm2': [0x138, 0x76],
    'm3': [0x168, 0x5a],
    'm4': [0x139, 0xad],
    'm5': [0x22, 0xe6],
    'm6': [0x24, 0xb8],
    'm7': [0x13b, 0x12e],
    'wheel-line-container': [0x138, 0x44],
    'wheel-down': [0x50, 0x20],
    'wheel-up': [0x145, 0x20]
  },
  '2349': {
    'm1': [0x1e, 0x5a],
    'm2': [0x13b, 0x7a],
    'm3': [0x16d, 0x5a],
    'm4': [0x139, 0xb4],
    'm5': [0x1a, 0xe6],
    'm6': [0x1e, 0xb8],
    'm7': [0x13b, 0x12e],
    'wheel-line-container': [0x139, 0x44],
    'wheel-down': [0x50, 0x20],
    'wheel-up': [0x145, 0x20]
  },
  '234a': {
    'm1': [0x1e, 0x5a],
    'm2': [0x138, 0x7a],
    'm3': [0x16d, 0x5a],
    'm4': [0x139, 0xb4],
    'm5': [0x1c, 0xe6],
    'm6': [0x22, 0xb8],
    'm7': [0x13b, 0x12e],
    'wheel-line-container': [0x138, 0x44],
    'wheel-down': [0x50, 0x20],
    'wheel-up': [0x145, 0x20]
  },
  '2352': {
    'm1': [0x1e, 0x5a],
    'm2': [0x13b, 0x7a],
    'm3': [0x16d, 0x5a],
    'm4': [0x139, 0xb4],
    'm5': [0x1a, 0xe6],
    'm6': [0x1e, 0xb8],
    'm7': [0x13b, 0x12e],
    'wheel-line-container': [0x139, 0x44],
    'wheel-down': [0x50, 0x20],
    'wheel-up': [0x145, 0x20]
  }
};
let NUMBERS = [" â“¿", " âž€", " âž", " âž‚", " âžƒ"];
let need_save = false;
let window_focused = true;
const theme_color = document.getElementById("current-usb-client-firmware-new").style.color;
let kbd_key_infos = [];
let kbd_key_matrix_index = -0x1;
let kbd_key_setting_index = -0x1;
let kbd_layer_id = 0x0;
let kbd_select_keyId = 0x0;
let kbd_light_mode = [];
let kbd_sleep_time = [];
let kbd_axis_infos = [];
let kbd_edit_info = {};
let kbd_select_elementId = '';
let kbd_socd_infos = [];
let kbd_mt_infos = [];
let kbd_rs_infos = [];
let kbd_dks_infos = [];
let kbd_dks_dragging_name = '';
let kbd_dks_dragging = false;
let kbd_dks_dragging_up = false;
let kbd_dks_Start_x = 0x0;
let kbd_matrix_select_keys = [];
let select_key_panel_id = undefined;
let kbd_key_num = 0x0;
let kbd_keys = [];
let kbd_macro_infos = [];
let kbd_macro_select_index = -0x1;

// ===== UI LAYER =============================================================
// These functions render and manage the RAWM Hub web UI using jQuery + layui.
// They are triggered indirectly by postMessage actions (see message handler
// at the bottom of the file), or by user interaction through layui form events.
//
// Key functions:
//   request_device_cfg() — fetches device_cfg JSON from the server (product
//     definitions, polling rates, colour codes, key mappings, etc.)
//   apply_theme() — toggles between dark/light theme CSS
//   refresh_client_list() — re‑enumerates HID devices and reconciles
//     usb_client_list with the current set of connected hardware
//   refresh_current_client() — picks the first non‑receiver client if none
//     is currently selected
//   ui_refresh_current_client() — renders the mouse info panel
//   kbd_ui_refresh_current_client() — renders the keyboard info panel
//   ui_refresh_setting() — rebuilds the settings panel (CPI sliders, polling
//     rate radios, power modes, LOD, angle snapping, etc.)
//   setting_mapping_init() — initialises the key‑mapping editor UI
//   ui_refresh_setting_mapping() — positions mouse button overlays on the
//     product image
//   ui_refresh_cpi_levels() — renders the multi‑level CPI picker
//   ui_refresh_mapping_key() — highlights & labels mouse key overlays
// ============================================================================

function request_device_cfg() {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (this.readyState == 0x4 && this.status == 0xc8) {
      try {
        device_cfg = JSON.parse(this.responseText);
        reset_device_cfg(device_cfg);
        if (current_usb_client != undefined) {
          layui.table.reloadData('key-shortcuts', {
            'data': get_shortcuts(current_usb_client)
          });
        }
      } catch (err) {
        log_r(err);
      }
      if (navigator.hid != undefined) {
        window.postMessage({
          'action': ACTION_REFRESH_CLIENT_LIST
        });
        window.postMessage({
          'action': ACTION_UI_REFRESH_CURRENT_CLIENT
        });
      }
    }
  };
  var offset = 0x0;
  var layui2 = layui.data("lang").name;
  if (layui2 == "zh_CN") {
    offset = 0x0;
  } else {
    if (layui2 == "en_US") {
      offset = 0x1;
    } else {
      if (layui2 == 'zh_TW') {
        offset = 0x2;
      } else {
        if (layui2 == "ko_KR") {
          offset = 0x3;
        } else {
          if (layui2 == "ja_JP") {
            offset = 0x4;
          } else {
            if (layui2 == "uk_UA") {
              offset = 0x5;
            } else if (layui2 == 'tr_TR') {
              offset = 0x6;
            }
          }
        }
      }
    }
  }
  xhr.open("GET", "https://www.miracletek.net/game/device.php" + ("?os=4" + "&v=" + 0x9 + "&c=" + 0x0 + "&a=" + "pc-rawmhub.game" + '&ta=' + "pc-rawmhub.game" + '&mac=' + (layui.device('os').os.toLowerCase() == "mac" ? 0x1 : 0x0)) + "&lang=" + offset, true);
  xhr.send();
}
function apply_theme() {
  var layui2 = layui.data('theme').style;
  if (layui2 == "undefined" || layui2 == '' || layui2 == null || layui2 == "dark") {
    document.getElementById('layui_theme_css').setAttribute("href", "https://hub.miracletek.net/hub/layui/css/layui-theme-dark.css");
    $('[class=layui-setting-section-light]').each(function () {
      $(this)[0x0].className = "layui-setting-section";
    });
    $("[class=layui-setting-light-define-section-light]").each(function () {
      $(this)[0x0].className = "layui-setting-light-define-section";
    });
    $("[class=layui-setting-light-define-section-arrow-light]").each(function () {
      $(this)[0x0].className = "layui-setting-light-define-section-arrow";
    });
    $("[class=layui-current-name-light]").each(function () {
      $(this)[0x0].className = 'layui-current-name';
    });
    $("[class*=layui-outline-light]").each(function () {
      $(this)[0x0].className = $(this)[0x0].className.replace("layui-outline-light", 'layui-outline');
    });
    $('[class*=footer-light]').each(function () {
      $(this)[0x0].className = $(this)[0x0].className.replace('footer-light', 'footer');
    });
    document.getElementById("logo").src = "https://hub.miracletek.net/hub/img/rawm_hub.png?v=202412080015";
  } else {
    document.getElementById("layui_theme_css").removeAttribute("href");
    $("[class=layui-setting-section]").each(function () {
      $(this)[0x0].className = "layui-setting-section-light";
    });
    $('[class=layui-setting-light-define-section]').each(function () {
      $(this)[0x0].className = "layui-setting-light-define-section-light";
    });
    $("[class=layui-setting-light-define-section-arrow]").each(function () {
      $(this)[0x0].className = "layui-setting-light-define-section-arrow-light";
    });
    $("[class=layui-current-name]").each(function () {
      $(this)[0x0].className = "layui-current-name-light";
    });
    $('[class*=layui-outline]').each(function () {
      $(this)[0x0].className = $(this)[0x0].className.replace("layui-outline", "layui-outline-light");
    });
    $("[class*=footer]").each(function () {
      $(this)[0x0].className = $(this)[0x0].className.replace("footer", "footer-light");
    });
    document.getElementById("logo").src = 'https://hub.miracletek.net/hub/img/rawm_hub_light.png?v=202412080015';
  }
}
function is_dark_theme() {
  var layui2 = layui.data('theme').style;
  return !!(layui2 == "undefined" || layui2 == '' || layui2 == null || layui2 == 'dark');
}
