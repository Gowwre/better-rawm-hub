function skip_recv_buf(_0x1c338c, _0x1ceba7) {
  var _0x286983 = new Uint8Array(_0x1c338c.byteLength - _0x1ceba7);
  _0x286983.set(_0x1c338c.subarray(_0x1ceba7));
  return _0x286983;
}
function parse_cmd(_0x49268d) {
  var _0x4e4e04;
  do {
    _0x4e4e04 = false;
    var _0x3ac97a = _0x49268d.recv_buf;
    var _0x1fc851 = _0x3ac97a.byteLength;
    if (_0x1fc851 >= 0x4) {
      if (_0x3ac97a[0x0] == 0xff && _0x3ac97a[0x1] == 0xff && _0x3ac97a[0x2] == 0xff && _0x3ac97a[0x3] == 0xff) {} else {
        _0x49268d.recv_buf = new Uint8Array(0x0);
        _0x49268d.syncing = true;
        log_r(">>>>>>>>sync start");
      }
    }
    if (!_0x49268d.syncing && _0x1fc851 >= 6) {
      if ((_0x3ac97a[0x4] & 0xf) == 0x3 && _0x3ac97a[6] == 0x20) {}
      var _0x5dcd0b = _0x3ac97a[0x4] << 0x4 & 0xf00 | _0x3ac97a[5] & 0xff;
      if (_0x1fc851 >= _0x5dcd0b + 0x4) {
        var _0x1a20a8 = _0x3ac97a[0x4] & 0xf;
        if (_0x1a20a8 == 0x2) {
          var _0x3ed584;
          if (_0x3ac97a[0x4 + _0x5dcd0b - 0x1] == 0x0) {
            _0x3ed584 = String.fromCharCode.apply(null, _0x3ac97a.subarray(6, 0x4 + _0x5dcd0b - 0x1));
          } else {
            _0x3ed584 = String.fromCharCode.apply(null, _0x3ac97a.subarray(6, 0x4 + _0x5dcd0b));
          }
          console.log("[JSON-ORIG] raw device_info string:", (_0x3ed584 || '').substring(0, 300));
          _0x49268d.device_info = reset_device_info(_0x49268d.device_info);
          _0x49268d.device_info = parse_device_info(_0x49268d.device_info, _0x3ed584);
          if (_0x49268d.device_info.deviceName != undefined) {
            _0x49268d.connected = true;
            _0x49268d.helloed = _0x49268d.device_info.deviceName.length > 0x0;
            _0x49268d.device_name = _0x49268d.device_info.deviceName;
          } else {
            _0x49268d.recv_buf = new Uint8Array(0x0);
            _0x49268d.syncing = true;
            log_r(">>>>>>>>sync start");
          }
          if (_0x49268d.virtual && _0x49268d.helloed) {
            _0x49268d.esb_last_alive_time = new Date().getTime();
            _0x49268d.esb_alive_timeout = 0xbb8;
          }
          if (!_0x49268d.virtual && is_receiver(_0x49268d) && _0x49268d.helloed) {
            var _0x59c781 = false;
            usb_client_list.forEach(_0x1fd950 => {
              if (_0x1fd950.virtual && _0x1fd950.device == _0x49268d.device) {
                _0x59c781 = true;
              }
            });
            if (!_0x59c781) {
              log_r("add new virtual client");
              var _0x36793b = create_usb_client(_0x49268d.device, 0x0, true);
              usb_client_list[usb_client_list.length] = _0x36793b;
              if (_0x49268d.helloed) {
                send_event_query(_0x36793b);
              }
            }
            if (!is_limit_memory(_0x49268d)) {
              send_event_action(_0x49268d, 0x42, 0x0);
            }
          }
          if (_0x49268d.device_info.revision != undefined) {
            query_firmware(_0x49268d, _0x49268d.device_info != undefined && _0x49268d.device_info.revision != undefined && _0x49268d.device_info.revision.substr(0x0, 0x2) == 'G-' ? 0x1 : 0x0);
          }
          window.postMessage({
            'action': ACTION_REFRESH_CLIENT_LIST
          });
        } else {
          if (_0x1a20a8 == 0xb) {
            var _0x214ad8 = _0x3ac97a[6];
            var _0x43aa87 = [];
            for (var _0x499fd7 = 0x3; _0x499fd7 < _0x5dcd0b; _0x499fd7++) {
              _0x43aa87.push(_0x3ac97a[0x4 + _0x499fd7]);
            }
            var _0x160078 = new Uint8Array(_0x43aa87);
            if (_0x214ad8 == 0x0) {
              _0x49268d.device_info.resolution = _0x160078[0x0] | _0x160078[0x1] << 0x8;
              window.postMessage({
                'action': ACTION_UI_REFRESH_SETTING
              });
            } else {
              if (_0x214ad8 == 0x6) {
                _0x49268d.device_info.resolution = _0x160078[0x0] | _0x160078[0x1] << 0x8 | _0x160078[0x2] << 0x10 | _0x160078[0x3] << 0x18;
                window.postMessage({
                  'action': ACTION_UI_REFRESH_SETTING
                });
              } else {
                if (_0x214ad8 == 0x1) {
                  var _0x4365df = _0x160078[0x0] | _0x160078[0x1] << 0x8;
                  if (_0x49268d.device_info.pollingRate < 0x0) {
                    _0x49268d.device_info.pollingRate = _0x4365df;
                    window.postMessage({
                      'action': ACTION_UI_REFRESH_SETTING
                    });
                  }
                } else {
                  if (_0x214ad8 == 0x5) {
                    _0x49268d.device_info.powerMode = _0x160078[0x0];
                    window.postMessage({
                      'action': ACTION_UI_REFRESH_SETTING
                    });
                  } else {
                    if (_0x214ad8 == 0x8) {
                      _0x49268d.device_info.keyDelay = [];
                      for (var _0x499fd7 = 0x0; _0x499fd7 < _0x160078.byteLength; _0x499fd7++) {
                        _0x49268d.device_info.keyDelay.push(_0x160078[_0x499fd7]);
                      }
                      window.postMessage({
                        'action': ACTION_UI_REFRESH_SETTING
                      });
                    } else {
                      if (_0x214ad8 == 0x7) {
                        _0x49268d.device_info.lod = _0x160078[0x0];
                        window.postMessage({
                          'action': ACTION_UI_REFRESH_SETTING
                        });
                      } else {
                        if (_0x214ad8 == 0xc) {
                          var _0x3ed584;
                          if (_0x3ac97a[0x4 + _0x5dcd0b - 0x1] == 0x0) {
                            _0x3ed584 = String.fromCharCode.apply(null, _0x3ac97a.subarray(7, 0x4 + _0x5dcd0b - 0x1));
                          } else {
                            _0x3ed584 = String.fromCharCode.apply(null, _0x3ac97a.subarray(7, 0x4 + _0x5dcd0b));
                          }
                          _0x49268d.device_info = reset_device_info_esb(_0x49268d.device_info);
                          _0x49268d.device_info = parse_device_info(_0x49268d.device_info, _0x3ed584);
                          window.postMessage({
                            'action': ACTION_UI_REFRESH_CLIENT_LIST
                          });
                          window.postMessage({
                            'action': ACTION_UI_REFRESH_CURRENT_CLIENT
                          });
                        } else {
                          if (_0x214ad8 == 0xd) {
                            _0x49268d.device_info.motionSync = _0x160078[0x0];
                            window.postMessage({
                              'action': ACTION_UI_REFRESH_SETTING
                            });
                          } else {
                            if (_0x214ad8 == 0xe) {
                              _0x49268d.device_info.angleTuning = _0x160078[0x0] << 0x18 >> 0x18;
                              window.postMessage({
                                'action': ACTION_UI_REFRESH_SETTING
                              });
                            } else {
                              if (_0x214ad8 == 0xf) {
                                _0x49268d.device_info.angleSnapping = _0x160078[0x0];
                                window.postMessage({
                                  'action': ACTION_UI_REFRESH_SETTING
                                });
                              } else {
                                if (_0x214ad8 == 0x10) {
                                  _0x49268d.device_info.rippleControl = _0x160078[0x0];
                                  window.postMessage({
                                    'action': ACTION_UI_REFRESH_SETTING
                                  });
                                } else {
                                  if (_0x214ad8 == 0x9) {} else {
                                    if (_0x214ad8 == 0x13) {
                                      var _0x51ae84 = _0x160078[0x0] | _0x160078[0x1] << 0x8;
                                      var _0x5926d0 = _0x160078[0x2] | _0x160078[0x3] << 0x8;
                                      var _0x219c0b = _0x160078[0x4] | _0x160078[0x5] << 0x8;
                                      log_r("2.4G scores: " + _0x51ae84 + ", " + _0x5926d0 + ", " + _0x219c0b);
                                      if (_0x51ae84 > _0x5926d0 && _0x51ae84 > _0x219c0b) {
                                        if ((_0x49268d.device_info.txOutputPower == 0x0 ? 0x0 : 0x1) == 0x1) {
                                          setTimeout(() => {
                                            log_r("set rf channel 2");
                                            send_event_set_rf_channel(_0x49268d, 0x2);
                                            window.postMessage({
                                              'action': ACTION_UI_REFRESH_SETTING
                                            });
                                          }, 0x5dc);
                                        }
                                      } else if (_0x5926d0 > _0x51ae84 && _0x5926d0 > _0x219c0b) {
                                        if ((_0x49268d.device_info.txOutputPower == 0x0 ? 0x0 : 0x1) == 0x1) {
                                          setTimeout(() => {
                                            log_r("set rf channel 40");
                                            send_event_set_rf_channel(_0x49268d, 0x28);
                                            window.postMessage({
                                              'action': ACTION_UI_REFRESH_SETTING
                                            });
                                          }, 0x5dc);
                                        }
                                      } else if ((_0x49268d.device_info.txOutputPower == 0x0 ? 0x0 : 0x1) == 0x1) {
                                        setTimeout(() => {
                                          log_r("set rf channel 80");
                                          send_event_set_rf_channel(_0x49268d, 0x50);
                                          window.postMessage({
                                            'action': ACTION_UI_REFRESH_SETTING
                                          });
                                        }, 0x5dc);
                                      }
                                    } else {
                                      if (_0x214ad8 == 0x14) {
                                        if (_0x160078.byteLength == 0x1) {
                                          if (_0x160078[0x0] != 0xff) {
                                            _0x49268d.onboard_index = _0x160078[0x0];
                                            log_r("receiver onboard " + _0x49268d.onboard_index);
                                            add_key_info(_0x49268d, _0x49268d.onboard_index, undefined);
                                            clearTimeout(mouse_config_timer);
                                            mouse_config_timer = setTimeout(() => {
                                              mouse_config_timer = undefined;
                                              _0x49268d.querying_more_result = false;
                                              window.postMessage({
                                                'action': 'action_onboard_cfg',
                                                'usb_client_id': _0x49268d.id,
                                                'msg': "ERROR"
                                              });
                                            }, 0x7d0);
                                            window.postMessage({
                                              'action': 'action_onboard_cfg',
                                              'usb_client_id': _0x49268d.id,
                                              'msg': "LOADING"
                                            });
                                          } else {
                                            window.postMessage({
                                              'action': ACTION_UI_REFRESH_SETTING
                                            });
                                            clearTimeout(mouse_config_timer);
                                            mouse_config_timer = undefined;
                                            _0x49268d.querying_more_result = false;
                                            window.postMessage({
                                              'action': 'action_onboard_cfg',
                                              'usb_client_id': _0x49268d.id,
                                              'msg': 'LOADED'
                                            });
                                          }
                                        } else {
                                          add_key_info(_0x49268d, _0x49268d.onboard_index, _0x160078);
                                          clearTimeout(mouse_config_timer);
                                          mouse_config_timer = setTimeout(() => {
                                            mouse_config_timer = undefined;
                                            _0x49268d.querying_more_result = false;
                                            window.postMessage({
                                              'action': 'action_onboard_cfg',
                                              'usb_client_id': _0x49268d.id,
                                              'msg': "ERROR"
                                            });
                                          }, 0x7d0);
                                        }
                                      } else {
                                        if (_0x214ad8 == 0x15) {
                                          if (_0x160078.byteLength == 0x1) {
                                            if (_0x160078[0x0] == 0x0) {
                                              _0x49268d.device_info.peerInfo = [];
                                            } else {
                                              window.postMessage({
                                                'action': ACTION_UI_REFRESH_SETTING
                                              });
                                            }
                                          } else {
                                            var _0x167d62 = _0x160078[0x0] | _0x160078[0x1] << 0x8;
                                            var _0x53a77f = sprintf("%02x:%02x:%02x:%02x:%02x:%02x", _0x160078[0x2], _0x160078[0x3], _0x160078[0x4], _0x160078[0x5], _0x160078[0x6], _0x160078[0x7]);
                                            _0x49268d.device_info.peerInfo.push({
                                              'id': _0x167d62,
                                              'address': _0x53a77f
                                            });
                                          }
                                        } else {
                                          if (_0x214ad8 == 0x16) {
                                            _0x49268d.device_info.batteryLevels = [];
                                            for (var _0x499fd7 = 0x0; _0x499fd7 < _0x160078.byteLength; _0x499fd7 += 0x2) {
                                              _0x49268d.device_info.batteryLevels.push(_0x160078[_0x499fd7] | _0x160078[_0x499fd7 + 0x1] << 0x8);
                                            }
                                          } else {
                                            if (_0x214ad8 == 0x17) {
                                              _0x49268d.device_info.battery = _0x160078[0x0];
                                              _0x49268d.device_info.charging = _0x160078[0x1] == 0x1;
                                              window.postMessage({
                                                'action': ACTION_UI_REFRESH_CURRENT_CLIENT
                                              });
                                            } else {
                                              if (_0x214ad8 == 0x1a) {
                                                _0x49268d.device_info.sleepTime = _0x160078[0x0] | _0x160078[0x1] << 0x8;
                                                window.postMessage({
                                                  'action': ACTION_UI_REFRESH_SETTING
                                                });
                                              } else {
                                                if (_0x214ad8 == 0x1c) {
                                                  _0x49268d.device_info.rssi = new Int8Array(_0x43aa87)[0x0];
                                                  window.postMessage({
                                                    'action': ACTION_UI_REFRESH_CURRENT_CLIENT_RSSI
                                                  });
                                                } else {
                                                  if (_0x214ad8 == 0x1d) {
                                                    _0x49268d.device_info.luaStatus = _0x160078[0x0];
                                                    window.postMessage({
                                                      'action': ACTION_UI_REFRESH_SETTING
                                                    });
                                                  } else {
                                                    if (_0x214ad8 == 0x1e) {} else {
                                                      if (_0x214ad8 == 0x1f) {} else {
                                                        if (_0x214ad8 == 0x20) {
                                                          _0x49268d.device_info.noack = _0x160078[0x0];
                                                          window.postMessage({
                                                            'action': ACTION_UI_REFRESH_SETTING
                                                          });
                                                        } else {
                                                          if (_0x214ad8 == 0x19) {
                                                            for (var _0x499fd7 = 0x0; _0x499fd7 < _0x160078.byteLength; _0x499fd7++) {
                                                              if (_0x160078[_0x499fd7] == 0x0) {
                                                                _0x49268d.device_info.colorCode = String.fromCharCode.apply(null, _0x160078.subarray(0x0, _0x499fd7));
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
                                                            if (_0x214ad8 == 0x21) {
                                                              _0x49268d.device_info.glassMode = _0x160078[0x0];
                                                              if (_0x160078.byteLength > 0x1) {
                                                                _0x49268d.device_info.glassModeEnabled = _0x160078[0x1];
                                                              } else {
                                                                _0x49268d.device_info.glassModeEnabled = 0x1;
                                                              }
                                                              window.postMessage({
                                                                'action': ACTION_UI_REFRESH_SETTING
                                                              });
                                                            } else {
                                                              if (_0x214ad8 == 0x22) {
                                                                if (_0x49268d.device_info.onboardIndex != _0x160078[0x0]) {
                                                                  _0x49268d.device_info.onboardIndex = _0x160078[0x0];
                                                                  window.postMessage({
                                                                    'action': ACTION_UI_REFRESH_SETTING
                                                                  });
                                                                }
                                                              } else {
                                                                if (_0x214ad8 == 0x23) {
                                                                  _0x49268d.device_info.onboardStatus = [];
                                                                  for (var _0x499fd7 = 0x0; _0x499fd7 < _0x160078.byteLength; _0x499fd7++) {
                                                                    _0x49268d.device_info.onboardStatus.push(_0x160078[_0x499fd7]);
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
            if (_0x1a20a8 == 0xe) {
              log_r("PING <");
              if (!_0x49268d.connected) {
                if (new Date().getTime() - _0x49268d.last_query_time >= 0xbb8) {
                  if (_0x49268d.virtual) {
                    usb_client_list.forEach(_0x27c1f0 => {
                      if (is_receiver(_0x27c1f0) && _0x27c1f0.device == _0x49268d.device) {
                        if (_0x27c1f0.helloed) {
                          send_event_query(_0x49268d);
                        }
                      }
                    });
                  } else {
                    send_event_query(_0x49268d);
                  }
                }
              } else {
                if (!is_receiver(_0x49268d)) {
                  if (new Date().getTime() - _0x49268d.last_query_time >= 0xbb8) {
                    var _0x413bfd = JSON.parse(JSON.stringify(_0x49268d.device_info.allKeyConfigs))[0x0];
                    if (_0x413bfd == undefined || _0x413bfd.length == 0x0) {
                      send_event_query(_0x49268d);
                    }
                  }
                }
              }
              _0x49268d.esb_last_alive_time = new Date().getTime();
              _0x49268d.esb_alive_timeout = 0xbb8;
              var _0x43aa87 = [];
              for (var _0x499fd7 = 0x2; _0x499fd7 < _0x5dcd0b; _0x499fd7++) {
                _0x43aa87.push(_0x3ac97a[0x4 + _0x499fd7]);
              }
              var _0x2cf7a8 = false;
              var _0x160078 = new Uint8Array(_0x43aa87);
              if (_0x160078.byteLength > 0x0) {
                if (_0x49268d.device_info.squal != _0x160078[0x0]) {
                  _0x49268d.device_info.squal = _0x160078[0x0];
                  _0x2cf7a8 = true;
                }
              }
              if (_0x160078.byteLength > 0x1) {
                if (_0x49268d.device_info.equal != _0x160078[0x1]) {
                  _0x49268d.device_info.equal = _0x160078[0x1];
                  _0x2cf7a8 = true;
                }
              }
              if (_0x160078.byteLength > 0x2) {
                if (_0x49268d.device_info.txOutputPowerApplied != _0x160078[0x2]) {
                  _0x49268d.device_info.txOutputPowerApplied = _0x160078[0x2];
                  _0x2cf7a8 = true;
                }
              }
              if (_0x2cf7a8) {
                window.postMessage({
                  'action': ACTION_UI_REFRESH_QUAL
                });
              }
            } else {
              if (_0x1a20a8 == 0x7) {
                const _0x18e5dc = new TextEncoder().encode(SYNC_DATA);
                send_event(_0x49268d, _0x18e5dc);
              }
            }
          }
        }
        if (!_0x49268d.syncing) {
          _0x49268d.recv_buf = skip_recv_buf(_0x49268d.recv_buf, _0x5dcd0b + 0x4);
          _0x4e4e04 = true;
        }
      }
    }
  } while (_0x4e4e04);
}
function bytes_index_of(_0x1bf630, _0xa50340) {
  for (var _0x389ef7 = 0x0; _0x389ef7 <= _0x1bf630.byteLength - _0xa50340.byteLength; ++_0x389ef7) {
    var _0x1ccd10 = true;
    for (var _0x9d22b0 = 0x0; _0x9d22b0 < _0xa50340.byteLength; _0x9d22b0++) {
      if (_0x1bf630[_0x389ef7 + _0x9d22b0] != _0xa50340[_0x9d22b0]) {
        _0x1ccd10 = false;
        break;
      }
    }
    if (_0x1ccd10) {
      return _0x389ef7;
    }
  }
  return -0x1;
}
function recv(_0x5afd8b, _0x31d3c7) {
  if (_0x5afd8b.eplapsed_syncing_ms != 0x0 && new Date().getTime() - _0x5afd8b.eplapsed_syncing_ms > 0x3e8) {
    if (_0x5afd8b.syncing) {
      log_r(">>>>>>>>sync success");
      _0x5afd8b.syncing = false;
    }
    _0x5afd8b.recv_buf = new Uint8Array(0x0);
  }
  _0x5afd8b.eplapsed_syncing_ms = new Date().getTime();
  var _0x6ae9b0 = new Uint8Array(_0x5afd8b.recv_buf.byteLength + _0x31d3c7.byteLength);
  _0x6ae9b0.set(_0x5afd8b.recv_buf);
  _0x6ae9b0.set(_0x31d3c7, _0x5afd8b.recv_buf.byteLength);
  _0x5afd8b.recv_buf = _0x6ae9b0;
  if (!_0x5afd8b.syncing) {
    parse_cmd(_0x5afd8b);
  }
}
async function device_receive_data({
  device: _0xc9d79,
  reportId: _0x1716fd,
  data: _0x121a43
}) {
  console.log("[DEBUG] device_receive_data called", "device=", _0xc9d79?.productName, "reportId=", _0x1716fd, "dataLen=", _0x121a43?.byteLength);
  if (_0x121a43 && _0x121a43.byteLength > 0) {
    console.log("[RXHEX-ORIG]", Array.from(new Uint8Array(_0x121a43.buffer, _0x121a43.byteOffset, _0x121a43.byteLength)).slice(0,24).map(function(b) { return b.toString(16).padStart(2,"0"); }).join(" "));
  }
  if (is_hs_keyboard(_0xc9d79)) {
    hs_device_receive_data({
      'device': _0xc9d79,
      'reportId': _0x1716fd,
      'data': _0x121a43
    });
    return;
  }
  usb_client_list.forEach(_0x2de11c => {
    if (_0x2de11c.device == _0xc9d79 && !_0x2de11c.virtual) {
      var _0x8b2923 = new Uint8Array(_0x121a43.buffer);
      var _0x1e7425 = 0xff;
      if ((_0x8b2923[0x0] & 0xc0) == 0xc0) {
        _0x1e7425 = _0x8b2923[0x0] & 0x3f;
        _0x8b2923 = _0x8b2923.subarray(0x1);
      }
      var _0x2b96d4 = _0x8b2923[0x0] & 0x3f;
      if (_0x1e7425 == 0xff) {
        if ((_0x8b2923[0x0] & 0xc0) == 0x40) {} else {
          _0x8b2923 = _0x8b2923.subarray(0x1, 0x1 + _0x2b96d4);
          recv(_0x2de11c, _0x8b2923);
        }
      } else {
        usb_client_list.forEach(_0x593222 => {
          if (_0x593222.device == _0xc9d79 && _0x593222.virtual && _0x593222.product_esb_ch == _0x1e7425) {
            if ((_0x8b2923[0x0] & 0xc0) == 0x40) {
              var _0x5ebed3 = _0x8b2923[0x1] | _0x8b2923[0x2] << 0x8 | _0x8b2923[0x3] << 0x10 | _0x8b2923[0x4] << 0x18;
              var _0x58f81b = _0x8b2923[0xf] | _0x8b2923[0x10] << 0x8 | _0x8b2923[0x11] << 0x10 | _0x8b2923[0x12] << 0x18;
              if ((_0x8b2923[0x0] & 0x3f) < 0x12) {
                _0x58f81b = NOTIFY_DATA_BUF_SIZE;
              }
              if (_0x58f81b > 0x0) {
                if (_0x5ebed3 > _0x58f81b / 0x2) {
                  remote_buf_free_size = _0x5ebed3;
                }
              } else {
                remote_buf_free_size = _0x5ebed3;
              }
              if (remote_buf_free_size >= 240) {
                _0x593222.allow_send = true;
              }
            } else {
              _0x8b2923 = _0x8b2923.subarray(0x1, 0x1 + _0x2b96d4);
              recv(_0x593222, _0x8b2923);
            }
          }
        });
      }
    }
  });
}
function log_r(_0x7a09db) {}
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
  var _0x43bd80 = new XMLHttpRequest();
  _0x43bd80.onreadystatechange = function () {
    if (this.readyState == 0x4 && this.status == 0xc8) {
      try {
        device_cfg = JSON.parse(this.responseText);
        reset_device_cfg(device_cfg);
        if (current_usb_client != undefined) {
          layui.table.reloadData('key-shortcuts', {
            'data': get_shortcuts(current_usb_client)
          });
        }
      } catch (_0x58b6c2) {
        log_r(_0x58b6c2);
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
  var _0x49747e = 0x0;
  var _0x4815ba = layui.data("lang").name;
  if (_0x4815ba == "zh_CN") {
    _0x49747e = 0x0;
  } else {
    if (_0x4815ba == "en_US") {
      _0x49747e = 0x1;
    } else {
      if (_0x4815ba == 'zh_TW') {
        _0x49747e = 0x2;
      } else {
        if (_0x4815ba == "ko_KR") {
          _0x49747e = 0x3;
        } else {
          if (_0x4815ba == "ja_JP") {
            _0x49747e = 0x4;
          } else {
            if (_0x4815ba == "uk_UA") {
              _0x49747e = 0x5;
            } else if (_0x4815ba == 'tr_TR') {
              _0x49747e = 0x6;
            }
          }
        }
      }
    }
  }
  _0x43bd80.open("GET", "https://www.miracletek.net/game/device.php" + ("?os=4" + "&v=" + 0x9 + "&c=" + 0x0 + "&a=" + "pc-rawmhub.game" + '&ta=' + "pc-rawmhub.game" + '&mac=' + (layui.device('os').os.toLowerCase() == "mac" ? 0x1 : 0x0)) + "&lang=" + _0x49747e, true);
  _0x43bd80.send();
}
function apply_theme() {
  var _0x699075 = layui.data('theme').style;
  if (_0x699075 == "undefined" || _0x699075 == '' || _0x699075 == null || _0x699075 == "dark") {
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
  var _0x3e4ba4 = layui.data('theme').style;
  return !!(_0x3e4ba4 == "undefined" || _0x3e4ba4 == '' || _0x3e4ba4 == null || _0x3e4ba4 == 'dark');
}
