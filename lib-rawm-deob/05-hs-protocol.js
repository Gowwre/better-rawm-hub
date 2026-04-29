function hs_format_data(client, data) {
  var bytes = new Uint8Array(data);
  var payload = [];
  for (var len = 0x0; len < HS_FRAME_SIZE; len++) {
    if (len < bytes.byteLength) {
      payload.push(bytes[len]);
    } else {
      payload.push(0x0);
    }
  }
  return new Uint8Array(payload);
}
function hs_get_firmware_version(client) {
  var payload = [];
  payload.push(CMD_FIRMWARE_VERSION);
  send_event(client, hs_format_data(client, payload));
}
function hs_set_factory_reset(client) {
  var payload = [];
  payload.push(CMD_HS_FACTORY_RESET);
  send_event(client, hs_format_data(client, payload));
}
function hs_set_keycode_factory_reset(client) {
  var payload = [];
  payload.push(CMD_KEYCODE_FACTORY_RESET);
  send_event(client, hs_format_data(client, payload));
}
function hs_get_onboard_index(client) {
  var payload = [];
  payload.push(CMD_GET_ONBOARD_INDEX);
  send_event(client, hs_format_data(client, payload));
}
function hs_set_onboard_index(client, index) {
  var payload = [];
  payload.push(CMD_SET_ONBOARD_INDEX);
  payload.push(index);
  send_event(client, hs_format_data(client, payload));
}
function hs_get_keycode_buff(client, value, maxCount) {
  if (maxCount > HS_CHUNK_MAX) {
    return;
  }
  var payload = [];
  payload.push(CMD_GET_KEYCODE_BUF);
  payload.push(value >> 0x8 & 0xff);
  payload.push(value & 0xff);
  payload.push(maxCount);
  send_event(client, hs_format_data(client, payload));
}
function hs_set_keycode(client, value, type, index, value2) {
  var payload = [];
  payload.push(CMD_SET_KEYCODE);
  payload.push(value);
  payload.push(type);
  payload.push(index);
  payload.push(value2 >> 0x8 & 0xff);
  payload.push(value2 & 0xff);
  send_event(client, hs_format_data(client, payload));
}
function he_custom_data_save(client, data) {
  log_r('he_custom_data_save:' + data);
  var payload = [];
  payload.push(CMD_CUSTOM_DATA_SAVE);
  payload.push(data);
  send_event(client, hs_format_data(client, payload));
}
function hs_get_light(client, mode) {
  var payload = [];
  log_r("hs_get_light:" + mode);
  payload.push(CMD_GET_LIGHT);
  payload.push(0x3);
  payload.push(mode);
  send_event(client, hs_format_data(client, payload));
}
function hs_set_light(client, value, data) {
  var payload = [];
  payload.push(CMD_SET_LIGHT);
  payload.push(0x3);
  payload.push(value);
  if (value == LIGHT_PARAM_BRIGHTNESS) {
    payload.push(data.brightness);
  } else {
    if (value == LIGHT_PARAM_MODE) {
      payload.push(data.mode);
    } else {
      if (value == LIGHT_PARAM_SPEED) {
        payload.push(data.speed);
      } else {
        if (value == LIGHT_PARAM_HUE_SAT) {
          payload.push(data.hue);
          payload.push(data.sat);
        } else if (value == LIGHT_PARAM_BOX_MODE) {
          payload.push(data.light_box_mode);
        }
      }
    }
  }
  send_event(client, hs_format_data(client, payload));
}
function hs_get_light_sleep_time(client) {
  var payload = [];
  payload.push(CMD_GET_LIGHT_SLEEP);
  send_event(client, hs_format_data(client, payload));
}
function hs_set_light_sleep_time(client, value) {
  var payload = [];
  payload.push(CMD_SET_LIGHT_SLEEP);
  if (value > 0x0) {
    payload.push(0x1);
  } else {
    payload.push(0x0);
  }
  payload.push(value >> 0x8 & 0xff);
  payload.push(value & 0xff);
  send_event(client, hs_format_data(client, payload));
}
function hs_get_light_buff(client, value, index) {
  if (index > HS_CHUNK_MAX) {
    return;
  }
  var payload = [];
  payload.push(CMD_GET_LIGHT_DEFINE_BUF);
  payload.push(value >> 0x8 & 0xff);
  payload.push(value & 0xff);
  payload.push(index);
  send_event(client, hs_format_data(client, payload));
}
function hs_set_light_define(client, value) {
  var payload = [];
  payload.push(CMD_SET_LIGHT_DEFINE);
  payload.push(value.row);
  payload.push(value.col);
  payload.push(value.hue);
  payload.push(value.sat);
  send_event(client, hs_format_data(client, payload));
}
function hs_set_light_define_infos(client, value) {
  if (value.length > 0x0) {
    kbd_lightinfo_list.splice(0x0, kbd_lightinfo_list.length);
    kbd_lightinfo_list = value.slice();
    hs_set_light_define(client, kbd_lightinfo_list[0x0]);
  }
}
function hs_get_light_box(client) {
  var payload = [];
  payload.push(CMD_GET_LIGHT_BOX);
  send_event(client, hs_format_data(client, payload));
}
function hs_set_light_box(client, value) {
  var payload = [];
  payload.push(CMD_SET_LIGHT_BOX);
  payload.push(0x1);
  payload.push(value.mode);
  payload.push(value.colored);
  payload.push(value.brightness);
  payload.push(value.speed);
  payload.push(value.r);
  payload.push(value.g);
  payload.push(value.b);
  send_event(client, hs_format_data(client, payload));
}
function hs_get_axis_mode(client) {
  var payload = [];
  payload.push(CMD_GET_AXIS_MODE);
  send_event(client, hs_format_data(client, payload));
}
function hs_set_axis_mode(client, value) {
  var payload = [];
  payload.push(CMD_SET_AXIS_MODE);
  payload.push(value);
  send_event(client, hs_format_data(client, payload));
}
function hs_get_axis_info(client, index, count) {
  var payload = [];
  payload.push(CMD_GET_AXIS_INFO);
  payload.push(index);
  payload.push(count);
  send_event(client, hs_format_data(client, payload));
}
function hs_set_axis_info(client, value) {
  var payload = [];
  payload.push(CMD_SET_AXIS_INFO);
  payload.push(value.row);
  payload.push(value.col);
  payload.push(value.rt_enable);
  payload.push(value.top_dz >> 0x8 & 0xff);
  payload.push(value.top_dz & 0xff);
  payload.push(value.apc_lv >> 0x8 & 0xff);
  payload.push(value.apc_lv & 0xff);
  payload.push(value.rt_press_lv >> 0x8 & 0xff);
  payload.push(value.rt_press_lv & 0xff);
  payload.push(value.rt_release_lv >> 0x8 & 0xff);
  payload.push(value.rt_release_lv & 0xff);
  payload.push(value.btm_dz >> 0x8 & 0xff);
  payload.push(value.btm_dz & 0xff);
  payload.push(value.switch_type);
  send_event(client, hs_format_data(client, payload));
}
function hs_set_axis_infos(client, value) {
  if (value.length > 0x0) {
    kbd_axisinfo_list.splice(0x0, kbd_axisinfo_list.length);
    kbd_axisinfo_list = value.slice();
    hs_set_axis_info(client, kbd_axisinfo_list[0x0]);
  }
}
function hs_get_socd_num(client) {
  var payload = [];
  payload.push(CMD_SOCD_GET_NUM);
  send_event(client, hs_format_data(client, payload));
}
function hs_set_socd_num(client, value) {
  var payload = [];
  payload.push(CMD_SOCD_SET_NUM);
  payload.push(value);
  send_event(client, hs_format_data(client, payload));
}
function hs_get_socd_data(client, index) {
  var payload = [];
  payload.push(CMD_SOCD_GET_DATA);
  payload.push(index);
  send_event(client, hs_format_data(client, payload));
}
function hs_set_socd_infos(client, value) {
  if (value.length > 0x0) {
    kbd_socdinfo_list.splice(0x0, kbd_socdinfo_list.length);
    kbd_socdinfo_list = value.slice();
    hs_set_socd_data(client, kbd_socdinfo_list[0x0]);
  }
}
function hs_set_socd_data(client, value) {
  var payload = [];
  payload.push(CMD_SOCD_SET_DATA);
  payload.push(value.id);
  payload.push(value.row1);
  payload.push(value.col1);
  payload.push(value.row2);
  payload.push(value.col2);
  payload.push(value.socd_mode);
  send_event(client, hs_format_data(client, payload));
}
function hs_get_mt_num(client) {
  var payload = [];
  payload.push(CMD_MT_GET_NUM);
  send_event(client, hs_format_data(client, payload));
}
function hs_set_mt_num(client, value) {
  var payload = [];
  payload.push(CMD_MT_SET_NUM);
  payload.push(value);
  send_event(client, hs_format_data(client, payload));
}
function hs_get_mt_data(client, index) {
  var payload = [];
  payload.push(CMD_MT_GET_DATA);
  payload.push(index);
  send_event(client, hs_format_data(client, payload));
}
function hs_set_mt_infos(client, value) {
  if (value.length > 0x0) {
    kbd_mtinfo_list.splice(0x0, kbd_mtinfo_list.length);
    kbd_mtinfo_list = value.slice();
    hs_set_mt_data(client, kbd_mtinfo_list[0x0]);
  }
}
function hs_set_mt_data(client, value) {
  var payload = [];
  payload.push(CMD_MT_SET_DATA);
  payload.push(value.id);
  payload.push(value.row);
  payload.push(value.col);
  payload.push(value.tap_time >> 0x8 & 0xff);
  payload.push(value.tap_time & 0xff);
  payload.push(value.keyCode1 >> 0x8 & 0xff);
  payload.push(value.keyCode1 & 0xff);
  payload.push(value.keyCode2 >> 0x8 & 0xff);
  payload.push(value.keyCode2 & 0xff);
  send_event(client, hs_format_data(client, payload));
}
function hs_get_rs_num(client) {
  var payload = [];
  payload.push(CMD_RS_GET_NUM);
  send_event(client, hs_format_data(client, payload));
}
function hs_set_rs_num(client, value) {
  var payload = [];
  payload.push(CMD_RS_SET_NUM);
  payload.push(value);
  send_event(client, hs_format_data(client, payload));
}
function hs_get_rs_data(client, index) {
  var payload = [];
  payload.push(CMD_RS_GET_DATA);
  payload.push(index);
  send_event(client, hs_format_data(client, payload));
}
function hs_set_rs_infos(client, value) {
  if (value.length > 0x0) {
    kbd_rsinfo_list.splice(0x0, kbd_rsinfo_list.length);
    kbd_rsinfo_list = value.slice();
    hs_set_rs_data(client, kbd_rsinfo_list[0x0]);
  }
}
function hs_set_rs_data(client, value) {
  var payload = [];
  payload.push(CMD_RS_SET_DATA);
  payload.push(value.id);
  payload.push(value.row1);
  payload.push(value.col1);
  payload.push(value.row2);
  payload.push(value.col2);
  send_event(client, hs_format_data(client, payload));
}
function hs_get_dks_num(client) {
  var payload = [];
  payload.push(CMD_DKS_GET_NUM);
  send_event(client, hs_format_data(client, payload));
}
function hs_set_dks_num(client, value) {
  var payload = [];
  payload.push(CMD_DKS_SET_NUM);
  payload.push(value);
  send_event(client, hs_format_data(client, payload));
}
function hs_get_dks_data(client, index) {
  var payload = [];
  payload.push(CMD_DKS_GET_DATA);
  payload.push(index);
  send_event(client, hs_format_data(client, payload));
}
function hs_set_dks_infos(client, value) {
  if (value.length > 0x0) {
    kbd_dksinfo_list.splice(0x0, kbd_dksinfo_list.length);
    kbd_dksinfo_list = value.slice();
    hs_set_dks_data(client, kbd_dksinfo_list[0x0]);
  }
}
function hs_set_dks_data(client, value) {
  var payload = [];
  payload.push(CMD_DKS_SET_DATA);
  payload.push(value.id);
  payload.push(value.row);
  payload.push(value.col);
  payload.push(value.keyCode1 >> 0x8 & 0xff);
  payload.push(value.keyCode1 & 0xff);
  payload.push(value.state1 >> 0x8 & 0xff);
  payload.push(value.state1 & 0xff);
  payload.push(value.keyCode2 >> 0x8 & 0xff);
  payload.push(value.keyCode2 & 0xff);
  payload.push(value.state2 >> 0x8 & 0xff);
  payload.push(value.state2 & 0xff);
  payload.push(value.keyCode3 >> 0x8 & 0xff);
  payload.push(value.keyCode3 & 0xff);
  payload.push(value.state3 >> 0x8 & 0xff);
  payload.push(value.state3 & 0xff);
  payload.push(value.keyCode4 >> 0x8 & 0xff);
  payload.push(value.keyCode4 & 0xff);
  payload.push(value.state4 >> 0x8 & 0xff);
  payload.push(value.state4 & 0xff);
  send_event(client, hs_format_data(client, payload));
}
function reset_macro_buf(client) {
  var payload = [];
  payload.push(CMD_MACRO_RESET);
  send_event(client, hs_format_data(client, payload));
}
function hs_get_macro_num(client) {
  var payload = [];
  payload.push(CMD_MACRO_NUM);
  send_event(client, hs_format_data(client, payload));
}
function hs_get_macro_buffer_size(client) {
  var payload = [];
  payload.push(CMD_MACRO_SIZE);
  send_event(client, hs_format_data(client, payload));
}
function hs_set_macro_buf(client, value) {
  kbd_macroinfo_list.splice(0x0, kbd_macroinfo_list.length);
  kbd_macroinfo_list = value.slice();
  reset_macro_buf(client);
}
function hs_set_macro_data(client, value) {
  var payload = [];
  payload.push(CMD_MACRO_SET);
  payload.push(value >> 0x8 & 0xff);
  payload.push(value & 0xff);
  var offset = 0x0;
  if (value + HS_CHUNK_MAX < macroBuff.length) {
    offset = HS_CHUNK_MAX;
  } else {
    offset = macroBuff.length - value;
  }
  payload.push(offset);
  for (var len = 0x0; len < offset; len++) {
    payload.push(macroBuff[value + len]);
  }
  send_event(client, hs_format_data(client, payload));
}
function hs_get_macro_buf(client, value, index) {
  var payload = [];
  payload.push(CMD_MACRO_GET);
  payload.push(value >> 0x8 & 0xff);
  payload.push(value & 0xff);
  payload.push(index);
  send_event(client, hs_format_data(client, payload));
}
function hs_set_data_sync_index(client) {
  kbd_data_sync_index = client;
}
function hs_data_sync(client) {
  if ((kbd_data_sync_index & SYNC_FLAG_KEYCODE) != 0x1) {
    kbd_keyinfo_list.splice(0x0, kbd_keyinfo_list.length);
    client.device_info.kbd_key_infos.splice(0x0, client.device_info.kbd_key_infos.length);
    hs_get_keycode_buff(client, 0x0, HS_CHUNK_MAX);
  } else {
    if ((kbd_data_sync_index & SYNC_FLAG_LIGHT) != 0x2) {
      kbd_lightinfo_list.splice(0x0, kbd_lightinfo_list.length);
      client.device_info.kbd_light_info = kbd_create_light_info();
      hs_get_light(client, LIGHT_PARAM_BRIGHTNESS);
    } else {
      if ((kbd_data_sync_index & SYNC_FLAG_AXIS) != 0x4) {
        kbd_axisinfo_list.splice(0x0, kbd_axisinfo_list.length);
        client.device_info.kbd_axis_infos.splice(0x0, client.device_info.kbd_axis_infos.length);
        hs_get_axis_info(client, 0x0, 0x0);
      } else if ((kbd_data_sync_index & SYNC_FLAG_ADVANCED) != 0x8) {
        hs_get_socd_num(client);
      }
    }
  }
}
function hs_read_event(client, data) {
  var bytes = new Uint8Array(data);
  if (client.pause) {
    var value = client.send_event_buf.byteLength;
    if (value <= data - 0x1) {
      client.send_event_buf = new Uint8Array(0x0);
      return client.send_event_buf;
    }
  } else {
    var value = client.send_event_buf.byteLength;
    if (value <= data - 0x1) {
      client.send_event_buf = new Uint8Array(0x0);
      return client.send_event_buf;
    } else {
      bytes.set(client.send_event_buf.subarray(0x0, data), 0x0);
      client.send_event_buf = client.send_event_buf.subarray(data);
    }
  }
  return bytes;
}
async function hs_send_client_data(client) {
  console.log("[DEBUG] hs_send_client_data", "client=", client?.id, "allow_send=", client?.allow_send, "virtual=", client?.virtual);
  try {
    if (client.allow_send) {
      var bytes;
      var i;
      var value = client.product_esb_ch;
      if (value == 0xff) {
        bytes = hs_read_event(client, HS_FRAME_SIZE);
        i = bytes.length;
      } else {
        bytes = read_event(client, 63.00000000000001);
        i = bytes[0x0] & 0x3f;
        var payload = Array.from(bytes);
        payload.unshift(0xc0 | value);
        while (payload.length < 0x40) {
          payload.push(0x0);
        }
        bytes = new Uint8Array(payload);
      }
      if (i > 0x0) {
        var value2 = client.device;
        if (!value2.opened) {
          await value2.open();
        }
        await value2.sendReport(0x0, bytes);
        if (client.virtual) {
          var flag = false;
          usb_client_list.forEach(item => {
            if (is_receiver(item) && item.device == client.device) {
              flag = is_limit_memory(item);
            }
          });
          if (flag) {
            client.allow_send = false;
          }
        }
        post_send_client_data(client);
      }
    } else {
      if (client.virtual) {
        var flag = false;
        usb_client_list.forEach(item2 => {
          if (is_receiver(item2) && item2.device == client.device) {
            flag = is_limit_memory(item2);
          }
        });
        if (flag) {
          var bytes = new Uint8Array(0x1);
          var value = client.product_esb_ch;
          bytes[0x0] = 64;
          var payload = Array.from(bytes);
          payload.unshift(0xc0 | value);
          while (payload.length < 0x40) {
            payload.push(0x0);
          }
          bytes = new Uint8Array(payload);
          var value2 = client.device;
          if (!value2.opened) {
            await value2.open();
          }
          await value2.sendReport(0x0, bytes);
        }
      }
      post_send_client_data(client);
    }
  } catch (err) {
    console.log("[DEBUG] hs_send_client_data -> ERROR", err);
    log_r(err);
  }
}
function hs_parse_cmd(client) {
  console.log("[DEBUG] hs_parse_cmd", "client=", client?.id, "recv_buf.len=", client?.recv_buf?.byteLength, "helloed=", client?.helloed, "connected=", client?.connected);
  var i;
  var value = pc_kbd_key_num(client);
  var len = pc_kbd_manager_keys(client);
  do {
    i = false;
    var byteLen = client.recv_buf;
    var value2 = byteLen.byteLength;
    if (value2 >= 0x20) {
      var firstByte = byteLen[0x0];
      switch (firstByte) {
        case CMD_FIRMWARE_VERSION:
          {
            log_r("IQ_GET_SOFT_DRV_VER");
            if (client.device.productName != undefined) {
              client.connected = true;
              client.helloed = client.device.productName.length > 0x0;
              client.device_name = client.device.productName;
            } else {
              client.recv_buf = new Uint8Array(0x0);
              client.syncing = true;
            }
            var value3 = byteLen[0x1];
            client.device_info.revision = String.fromCharCode.apply(null, byteLen.subarray(0x2, 0x2 + value3));
            hs_get_onboard_index(client);
            window.postMessage({
              'action': ACTION_REFRESH_CLIENT_LIST
            });
            window.postMessage({
              'action': ACTION_UI_REFRESH_CLIENT_LIST
            });
            window.postMessage({
              'action': ACTION_UI_REFRESH_CURRENT_CLIENT
            });
          }
          break;
        case CMD_KEYCODE_FACTORY_RESET:
          {
            log_r("IQ_RESET_KEYCODE");
            hs_get_onboard_index(client);
          }
          break;
        case CMD_GET_ONBOARD_INDEX:
          {
            log_r("IQ_GET_PROFILE_ID");
            client.device_info.onboardIndex = byteLen[0x1];
            kbd_data_sync_index = 0x0;
            hs_data_sync(client);
          }
          break;
        case CMD_SET_ONBOARD_INDEX:
          {
            log_r("IQ_GET_PROFILE_ID");
            client.device_info.onboardIndex = byteLen[0x1];
            kbd_data_sync_index = 0x0;
            hs_data_sync(client);
          }
          break;
        case CMD_GET_KEYCODE_BUF:
          {
            log_r("IQ_GET_KEYCODE_BUF");
            var value4 = byteLen[0x2] | byteLen[0x1] << 0x8;
            var value5 = byteLen[0x3];
            for (var offset = 0x0; offset < value5; offset += 0x2) {
              var value6 = byteLen[0x4 + offset] << 0x8 | byteLen[0x4 + offset + 0x1];
              var index = (value4 + offset) / 0x2;
              if (index >= value) {
                index = index - value;
              }
              var item = len[index];
              kbd_keyinfo_list.push(kbd_create_pc_key_info(item.type, item.vCode, get_key_name_from_keyid(value6), item.aCode, item.aName, item.sCode, value6, item.row, item.col, item.rect));
            }
            if (value4 + value5 < value * 0x4) {
              var value7 = value * 0x4 - value4 - value5;
              hs_get_keycode_buff(client, value4 + value5, value7 < HS_CHUNK_MAX ? value7 : HS_CHUNK_MAX);
            } else {
              if (is_keyboard_5_15(client.device)) {
                kbd_keyinfo_list[0x3f].name = '';
              }
              client.device_info.kbd_key_infos = kbd_keyinfo_list.slice();
              kbd_keyinfo_list.splice(0x0, kbd_keyinfo_list.length);
              log_r("IQ_GET_KEYCODE_BUF finish");
              kbd_data_sync_index = kbd_data_sync_index | SYNC_FLAG_KEYCODE;
              hs_get_macro_num(client);
              window.postMessage({
                'action': ACTION_UI_REFRESH_KBD_KEY
              });
            }
          }
          break;
        case CMD_SET_KEYCODE:
          {
            if (byteLen.length >= 0x6) {
              var value8 = byteLen[0x1];
              var value9 = byteLen[0x2];
              var value10 = byteLen[0x3];
              var value6 = byteLen[0x5] | byteLen[0x4] << 0x8;
              if (value8 == 0x0) {
                for (var offset = 0x0; offset < value; offset++) {
                  var item = client.device_info.kbd_key_infos[offset];
                  if (value9 == item.row && value10 == item.col) {
                    item.keyId = value6;
                    item.name = get_key_name_from_keyid(value6);
                    break;
                  }
                }
              } else {
                for (var offset = value; offset < value * 0x2 - 0x1; offset++) {
                  var item = client.device_info.kbd_key_infos[offset];
                  if (value9 == item.row && value10 == item.col) {
                    item.keyId = value6;
                    item.name = get_key_name_from_keyid(value6);
                    break;
                  }
                }
              }
            }
          }
          break;
        case CMD_MACRO_NUM:
          {
            log_r("IQ_GET_MACRO_NUM");
            client.device_info.kbd_macro_num = byteLen[0x1];
            client.device_info.kbd_macro_infos.splice(0x0, client.device_info.kbd_macro_infos.length);
            for (var offset = 0x0; offset < client.device_info.kbd_macro_num; offset++) {
              client.device_info.kbd_macro_infos.push([]);
            }
            hs_get_macro_buffer_size(client);
          }
          break;
        case CMD_MACRO_SIZE:
          {
            log_r("IQ_GET_MACRO_SIZE");
            client.device_info.kbd_macro_max_size = byteLen[0x1] << 0x8 | byteLen[0x2];
            kbd_macro_index = 0x0;
            macroBuff = [];
            hs_get_macro_buf(client, 0x0, HS_CHUNK_MAX);
          }
          break;
        case CMD_MACRO_RESET:
          {
            log_r('IQ_RESET_MACRO');
            hs_set_macro_data(client, 0x0);
          }
          break;
        case CMD_MACRO_GET:
          {
            log_r("IQ_GET_MACRO_DATA_BUF");
            var value4 = byteLen[0x1] << 0x8 | byteLen[0x2];
            var value11 = byteLen[0x3];
            var offset2 = 0x0;
            for (var offset = 0x0; offset < value11; offset++) {
              offset2 = byteLen[0x4 + offset];
              if (offset2 == 0x0) {
                if (macroBuff.length >= 0x3) {
                  var index = 0x1;
                  while (index < macroBuff.length) {
                    if (macroBuff[index] == 0x2) {
                      index++;
                      var value6 = macroBuff[index];
                      var macroInfo = create_macro_info();
                      macroInfo.mouse_key_event = 0x100;
                      macroInfo.mouse_key_code = get_key_code_from_keyid(value6);
                      client.device_info.kbd_macro_infos[kbd_macro_index].push(macroInfo);
                      index++;
                      index++;
                    } else {
                      if (macroBuff[index] == 0x3) {
                        index++;
                        var value6 = macroBuff[index];
                        var macroInfo = create_macro_info();
                        macroInfo.mouse_key_event = 0x101;
                        macroInfo.mouse_key_code = get_key_code_from_keyid(value6);
                        client.device_info.kbd_macro_infos[kbd_macro_index].push(macroInfo);
                        index++;
                        index++;
                      } else {
                        if (macroBuff[index] == 0x4) {
                          index++;
                          var str = '';
                          while (macroBuff[index] >= '0'.charCodeAt() && macroBuff[index] <= '9'.charCodeAt()) {
                            str += String.fromCharCode(macroBuff[index]);
                            index++;
                          }
                          var len2 = client.device_info.kbd_macro_infos[kbd_macro_index];
                          var macroInfo = len2[len2.length - 0x1];
                          if (macroInfo != undefined) {
                            macroInfo.mouse_key_time = parseInt(str);
                          }
                          index++;
                          index++;
                        }
                      }
                    }
                  }
                }
                kbd_macro_index++;
                macroBuff = [];
              } else {
                macroBuff.push(offset2);
              }
            }
            if (kbd_macro_index >= client.device_info.kbd_macro_num) {
              hs_data_sync(client);
            } else {
              hs_get_macro_buf(client, value4 + value11, HS_CHUNK_MAX);
            }
          }
          break;
        case CMD_MACRO_SET:
          {
            log_r('IQ_SET_MACRO_DATA_BUF');
            var value4 = byteLen[0x1] << 0x8 | byteLen[0x2];
            var value11 = byteLen[0x3];
            if (value4 + value11 >= macroBuff.length) {
              client.device_info.kbd_macro_infos.splice(0x0, client.device_info.kbd_macro_infos.length);
              for (var offset = 0x0; offset < client.device_info.kbd_macro_num; offset++) {
                client.device_info.kbd_macro_infos.push([]);
                var len3 = kbd_macroinfo_list[offset];
                if (len3.length > 0x0) {
                  for (var count = 0x0; count < len3.length; count++) {
                    client.device_info.kbd_macro_infos[offset].push(clone_macro_info(len3[count]));
                  }
                }
              }
              window.postMessage({
                'action': ACTION_UI_REFRESH_KBD_MACRO
              });
            } else {
              hs_set_macro_data(client, value4 + value11);
            }
          }
          break;
        case CMD_GET_LIGHT:
          {
            if (byteLen.length >= 0x4) {
              var value12 = byteLen[0x2];
              if (value12 == LIGHT_PARAM_BRIGHTNESS) {
                client.device_info.kbd_light_info.brightness = byteLen[0x3];
                hs_get_light(client, LIGHT_PARAM_MODE);
              } else {
                if (value12 == LIGHT_PARAM_MODE) {
                  client.device_info.kbd_light_info.mode = byteLen[0x3];
                  hs_get_light(client, LIGHT_PARAM_SPEED);
                } else {
                  if (value12 == LIGHT_PARAM_SPEED) {
                    client.device_info.kbd_light_info.speed = byteLen[0x3];
                    hs_get_light(client, LIGHT_PARAM_HUE_SAT);
                  } else if (value12 == LIGHT_PARAM_HUE_SAT) {
                    client.device_info.kbd_light_info.hue = byteLen[0x3];
                    client.device_info.kbd_light_info.sat = byteLen[0x4];
                    hs_get_light_sleep_time(client);
                  }
                }
              }
            }
          }
          break;
        case CMD_GET_LIGHT_SLEEP:
          {
            log_r("IQ_GET_RGB_COLOR_SLEEP_TIME");
            var value13 = byteLen[0x1];
            var value14 = byteLen[0x2] << 0x8 | byteLen[0x3];
            if (value13 == 0x0) {
              client.device_info.kbd_light_info.sleep_time = 0x0;
            } else {
              client.device_info.kbd_light_info.sleep_time = value14;
            }
            hs_get_light_box(client);
          }
          break;
        case CMD_SET_LIGHT_SLEEP:
          {
            log_r("IQ_SET_RGB_COLOR_SLEEP_TIME");
            var value13 = byteLen[0x1];
            var value14 = byteLen[0x2] << 0x8 | byteLen[0x3];
            if (value13 == 0x0) {
              client.device_info.kbd_light_info.sleep_time = 0x0;
            } else {
              client.device_info.kbd_light_info.sleep_time = value14;
            }
          }
          break;
        case CMD_GET_LIGHT_BOX:
          {
            log_r("IQ_GET_BOX_RGB_COLOR");
            var index = 0x1;
            index++;
            client.device_info.kbd_light_info.light_box_info.mode = byteLen[index++];
            client.device_info.kbd_light_info.light_box_info.colored = byteLen[index++];
            client.device_info.kbd_light_info.light_box_info.brightness = byteLen[index++];
            client.device_info.kbd_light_info.light_box_info.speed = byteLen[index++];
            client.device_info.kbd_light_info.light_box_info.r = byteLen[index++];
            client.device_info.kbd_light_info.light_box_info.g = byteLen[index++];
            client.device_info.kbd_light_info.light_box_info.b = byteLen[index++];
            hs_get_light_buff(client, 0x0, HS_CHUNK_MAX);
          }
          break;
        case CMD_SET_LIGHT_BOX:
          {
            log_r("IQ_GET_BOX_RGB_COLOR");
            var index = 0x1;
            index++;
            client.device_info.kbd_light_info.light_box_info.mode = byteLen[index++];
            client.device_info.kbd_light_info.light_box_info.colored = byteLen[index++];
            client.device_info.kbd_light_info.light_box_info.brightness = byteLen[index++];
            client.device_info.kbd_light_info.light_box_info.speed = byteLen[index++];
            client.device_info.kbd_light_info.light_box_info.r = byteLen[index++];
            client.device_info.kbd_light_info.light_box_info.g = byteLen[index++];
            client.device_info.kbd_light_info.light_box_info.b = byteLen[index++];
          }
          break;
        case CMD_SET_LIGHT:
          {
            if (byteLen.length >= 0x4) {
              log_r("IQ_SET_CUSTOM:" + byteLen);
              var value12 = byteLen[0x2];
              if (value12 == LIGHT_PARAM_BRIGHTNESS) {
                client.device_info.kbd_light_info.brightness = byteLen[0x3];
              } else {
                if (value12 == LIGHT_PARAM_MODE) {
                  client.device_info.kbd_light_info.mode = byteLen[0x3];
                } else {
                  if (value12 == LIGHT_PARAM_SPEED) {
                    client.device_info.kbd_light_info.speed = byteLen[0x3];
                  } else if (value12 == LIGHT_PARAM_HUE_SAT) {
                    client.device_info.kbd_light_info.hue = byteLen[0x3];
                    client.device_info.kbd_light_info.sat = byteLen[0x4];
                  }
                }
              }
            }
          }
          break;
        case CMD_GET_LIGHT_DEFINE_BUF:
          {
            log_r("IQ_GET_RGB_COLOR_BUF");
            var value4 = byteLen[0x1] << 0x8 | byteLen[0x2];
            var value5 = byteLen[0x3];
            for (var offset = 0x0; offset < value5; offset += 0x2) {
              var value15 = byteLen[0x4 + offset];
              var value16 = byteLen[0x4 + offset + 0x1];
              var index = (value4 + offset) / 0x2;
              var item = len[index];
              kbd_lightinfo_list.push(kbd_create_key_light_info(item.row, item.col, value15, value16));
            }
            if (value4 + value5 < value * 0x2) {
              var value7 = value * 0x2 - value4 - value5;
              hs_get_light_buff(client, value4 + value5, value7 < HS_CHUNK_MAX ? value7 : HS_CHUNK_MAX);
            } else {
              client.device_info.kbd_light_info.keys = kbd_lightinfo_list.slice();
              kbd_lightinfo_list.splice(0x0, kbd_lightinfo_list.length);
              log_r("IQ_GET_RGB_COLOR_BUF finish");
              kbd_data_sync_index = kbd_data_sync_index | SYNC_FLAG_LIGHT;
              hs_data_sync(client);
              window.postMessage({
                'action': ACTION_UI_REFRESH_KBD_LIGHT
              });
            }
          }
          break;
        case CMD_SET_LIGHT_DEFINE:
          {
            log_r("IQ_SET_RGB_COLOR");
            if (byteLen.length >= 0x5) {
              var value9 = byteLen[0x1];
              var value10 = byteLen[0x2];
              var value15 = byteLen[0x3];
              var value16 = byteLen[0x4];
              for (var offset = 0x0; offset < client.device_info.kbd_light_info.keys.length; offset++) {
                if (value9 == client.device_info.kbd_light_info.keys[offset].row && value10 == client.device_info.kbd_light_info.keys[offset].col) {
                  client.device_info.kbd_light_info.keys[offset].hue = value15;
                  client.device_info.kbd_light_info.keys[offset].sat = value16;
                  break;
                }
              }
              for (var offset = 0x0; offset < kbd_lightinfo_list.length; offset++) {
                if (value9 == kbd_lightinfo_list[offset].row && value10 == kbd_lightinfo_list[offset].col) {
                  kbd_lightinfo_list.splice(offset, 0x1);
                  break;
                }
              }
              if (kbd_lightinfo_list.length > 0x0) {
                hs_set_light_define(client, kbd_lightinfo_list[0x0]);
              } else {
                he_custom_data_save(client, 0x1);
                window.postMessage({
                  'action': ACTION_UI_REFRESH_KBD_LIGHT
                });
              }
            }
          }
          break;
        case CMD_GET_AXIS_MODE:
          {
            log_r("IQ_GET_RT_BOOST_MODE");
            client.device_info.kbd_axis_mode = byteLen[0x1];
            kbd_axisinfo_list.splice(0x0, kbd_axisinfo_list.length);
            0x4;
            client.device_info.kbd_axis_infos.splice(0x0, client.device_info.kbd_axis_infos.length);
            hs_get_axis_info(client, 0x0, 0x0);
          }
          break;
        case CMD_SET_AXIS_MODE:
          {
            log_r("IQ_SET_RT_BOOST_MODE");
            client.device_info.kbd_axis_mode = byteLen[0x1];
          }
          break;
        case CMD_GET_AXIS_INFO:
          {
            log_r("IQ_GET_MAG_DATA");
            var index = 0x1;
            var obj = kbd_create_axis_info();
            obj.row = byteLen[index++];
            obj.col = byteLen[index++];
            obj.rt_enable = byteLen[index++];
            obj.top_dz = byteLen[index++] << 0x8 | byteLen[index++];
            obj.apc_lv = byteLen[index++] << 0x8 | byteLen[index++];
            obj.rt_press_lv = byteLen[index++] << 0x8 | byteLen[index++];
            obj.rt_release_lv = byteLen[index++] << 0x8 | byteLen[index++];
            obj.btm_dz = byteLen[index++] << 0x8 | byteLen[index++];
            obj.switch_type = byteLen[index++];
            kbd_axisinfo_list.push(obj);
            if (kbd_axisinfo_list.length < len.length) {
              hs_get_axis_info(client, len[kbd_axisinfo_list.length].row, len[kbd_axisinfo_list.length].col);
            } else {
              client.device_info.kbd_axis_infos = kbd_axisinfo_list.slice();
              kbd_axisinfo_list.splice(0x0, kbd_axisinfo_list.length);
              kbd_data_sync_index = kbd_data_sync_index | SYNC_FLAG_AXIS;
              hs_data_sync(client);
              log_r(client.device_info.kbd_axis_infos);
              window.postMessage({
                'action': ACTION_UI_REFRESH_KBD_AXIS
              });
            }
          }
          break;
        case CMD_SET_AXIS_INFO:
          {
            log_r("IQ_SET_MAG_DATA");
            if (byteLen.length >= 0xe) {
              var index = 0x1;
              var obj = kbd_create_axis_info();
              obj.row = byteLen[index++];
              obj.col = byteLen[index++];
              obj.rt_enable = byteLen[index++];
              obj.top_dz = byteLen[index++] << 0x8 | byteLen[index++];
              obj.apc_lv = byteLen[index++] << 0x8 | byteLen[index++];
              obj.rt_press_lv = byteLen[index++] << 0x8 | byteLen[index++];
              obj.rt_release_lv = byteLen[index++] << 0x8 | byteLen[index++];
              obj.btm_dz = byteLen[index++] << 0x8 | byteLen[index++];
              obj.switch_type = byteLen[index++];
              for (var offset = 0x0; offset < client.device_info.kbd_axis_infos.length; offset++) {
                if (obj.row == client.device_info.kbd_axis_infos[offset].row && obj.col == client.device_info.kbd_axis_infos[offset].col) {
                  client.device_info.kbd_axis_infos[offset] = obj;
                  break;
                }
              }
              for (var offset = 0x0; offset < kbd_axisinfo_list.length; offset++) {
                if (obj.row == kbd_axisinfo_list[offset].row && obj.col == kbd_axisinfo_list[offset].col) {
                  kbd_axisinfo_list.splice(offset, 0x1);
                  break;
                }
              }
              if (kbd_axisinfo_list.length > 0x0) {
                hs_set_axis_info(client, kbd_axisinfo_list[0x0]);
              } else {
                he_custom_data_save(client, 0x0);
                window.postMessage({
                  'action': ACTION_UI_REFRESH_KBD_AXIS
                });
              }
            }
          }
          break;
        case CMD_SOCD_GET_NUM:
          {
            log_r('IQ_GET_MAG_SOCD_NUM');
            client.device_info.kbd_socd_num = byteLen[0x1];
            client.device_info.kbd_socd_infos.splice(0x0, client.device_info.kbd_socd_infos.length);
            if (client.device_info.kbd_socd_num > 0x0) {
              hs_get_socd_data(client, 0x0);
            } else {
              hs_get_mt_num(client);
            }
          }
          break;
        case CMD_SOCD_SET_NUM:
          {
            log_r('IQ_SET_MAG_SOCD_NUM');
            client.device_info.kbd_socd_num = byteLen[0x1];
            client.device_info.kbd_socd_infos.splice(0x0, client.device_info.kbd_socd_infos.length);
            if (client.device_info.kbd_socd_num > 0x0) {
              for (var offset = 0x0; offset < kbd_socdinfo_list.length; offset++) {
                client.device_info.kbd_socd_infos.push(kbd_clone_socd_info(kbd_socdinfo_list[offset]));
              }
              kbd_socdinfo_list.splice(0x0, kbd_socdinfo_list.length);
            }
            window.postMessage({
              'action': 'action_ui_refresh_kbd_advance_key'
            });
          }
          break;
        case CMD_SOCD_GET_DATA:
          {
            log_r('IQ_GET_MAG_SOCD_DATA');
            if (byteLen.length >= 0xa) {
              var obj2 = kbd_create_socd_info();
              obj2.id = byteLen[0x1];
              obj2.row1 = byteLen[0x2];
              obj2.col1 = byteLen[0x3];
              obj2.row2 = byteLen[0x4];
              obj2.col2 = byteLen[0x5];
              obj2.socd_mode = byteLen[0x6];
              client.device_info.kbd_socd_infos.push(obj2);
              if (obj2.id < client.device_info.kbd_socd_num - 0x1) {
                hs_get_socd_data(client, obj2.id + 0x1);
              } else {
                hs_get_mt_num(client);
                window.postMessage({
                  'action': 'action_ui_refresh_kbd_advance_key'
                });
              }
            }
          }
          break;
        case CMD_SOCD_SET_DATA:
          {
            log_r("IQ_SET_MAG_SOCD_DATA");
            if (byteLen.length >= 0xa) {
              var value17 = byteLen[0x1];
              if (value17 < kbd_socdinfo_list.length - 0x1) {
                hs_set_socd_data(client, kbd_socdinfo_list[value17 + 0x1]);
              } else {
                hs_set_socd_num(client, kbd_socdinfo_list.length);
              }
            }
          }
          break;
        case CMD_MT_GET_NUM:
          {
            log_r("IQ_GET_MAG_MT_NUM");
            client.device_info.kbd_mt_num = byteLen[0x1];
            client.device_info.kbd_mt_infos.splice(0x0, client.device_info.kbd_mt_infos.length);
            if (client.device_info.kbd_mt_num > 0x0) {
              hs_get_mt_data(client, 0x0);
            } else {
              hs_get_rs_num(client);
            }
          }
          break;
        case CMD_MT_SET_NUM:
          {
            log_r("IQ_SET_MAG_MT_NUM");
            client.device_info.kbd_mt_num = byteLen[0x1];
            client.device_info.kbd_mt_infos.splice(0x0, client.device_info.kbd_mt_infos.length);
            if (client.device_info.kbd_mt_num > 0x0) {
              for (var offset = 0x0; offset < kbd_mtinfo_list.length; offset++) {
                client.device_info.kbd_mt_infos.push(kbd_clone_mt_info(kbd_mtinfo_list[offset]));
              }
              kbd_mtinfo_list.splice(0x0, kbd_mtinfo_list.length);
            }
            window.postMessage({
              'action': 'action_ui_refresh_kbd_advance_key'
            });
          }
          break;
        case CMD_MT_GET_DATA:
          {
            log_r("IQ_GET_MAG_MT_DATA");
            if (byteLen.length >= 0xa) {
              var obj3 = kbd_create_mt_info();
              obj3.id = byteLen[0x1];
              obj3.row = byteLen[0x2];
              obj3.col = byteLen[0x3];
              obj3.tap_time = byteLen[0x5] | byteLen[0x4] << 0x8;
              obj3.keyCode1 = byteLen[0x7] | byteLen[0x6] << 0x8;
              obj3.keyCode2 = byteLen[0x9] | byteLen[0x8] << 0x8;
              client.device_info.kbd_mt_infos.push(obj3);
              log_r(client.device_info.kbd_mt_infos);
              if (obj3.id < client.device_info.kbd_mt_num - 0x1) {
                hs_get_mt_data(client, obj3.id + 0x1);
              } else {
                hs_get_rs_num(client);
                window.postMessage({
                  'action': 'action_ui_refresh_kbd_advance_key'
                });
              }
            }
          }
          break;
        case CMD_MT_SET_DATA:
          {
            log_r("IQ_SET_MAG_MT_DATA");
            if (byteLen.length >= 0xa) {
              var value17 = byteLen[0x1];
              if (value17 < kbd_mtinfo_list.length - 0x1) {
                hs_set_mt_data(client, kbd_mtinfo_list[value17 + 0x1]);
              } else {
                hs_set_mt_num(client, kbd_mtinfo_list.length);
              }
            }
          }
          break;
        case CMD_RS_GET_NUM:
          {
            log_r("IQ_GET_MAG_RS_NUM");
            client.device_info.kbd_rs_num = byteLen[0x1];
            client.device_info.kbd_rs_infos.splice(0x0, client.device_info.kbd_rs_infos.length);
            if (client.device_info.kbd_rs_num > 0x0) {
              hs_get_rs_data(client, 0x0);
            } else {
              hs_get_dks_num(client);
            }
          }
          break;
        case CMD_RS_SET_NUM:
          {
            log_r("IQ_SET_MAG_RS_NUM");
            client.device_info.kbd_rs_num = byteLen[0x1];
            client.device_info.kbd_rs_infos.splice(0x0, client.device_info.kbd_rs_infos.length);
            if (client.device_info.kbd_rs_num > 0x0) {
              for (var offset = 0x0; offset < kbd_rsinfo_list.length; offset++) {
                client.device_info.kbd_rs_infos.push(kbd_clone_socd_info(kbd_rsinfo_list[offset]));
              }
              kbd_rsinfo_list.splice(0x0, kbd_rsinfo_list.length);
            }
            window.postMessage({
              'action': 'action_ui_refresh_kbd_advance_key'
            });
          }
          break;
        case CMD_RS_GET_DATA:
          {
            log_r("IQ_GET_MAG_RS_DATA");
            if (byteLen.length >= 0xa) {
              var obj4 = kbd_create_rs_info();
              obj4.id = byteLen[0x1];
              obj4.row1 = byteLen[0x2];
              obj4.col1 = byteLen[0x3];
              obj4.row2 = byteLen[0x4];
              obj4.col2 = byteLen[0x5];
              client.device_info.kbd_rs_infos.push(obj4);
              if (obj4.id < client.device_info.kbd_rs_num - 0x1) {
                hs_get_rs_data(client, obj4.id + 0x1);
              } else {
                hs_get_dks_num(client);
                window.postMessage({
                  'action': 'action_ui_refresh_kbd_advance_key'
                });
              }
            }
          }
          break;
        case CMD_RS_SET_DATA:
          {
            log_r("IQ_SET_MAG_RS_DATA");
            if (byteLen.length >= 0xa) {
              var value17 = byteLen[0x1];
              if (value17 < kbd_rsinfo_list.length - 0x1) {
                hs_set_rs_data(client, kbd_rsinfo_list[value17 + 0x1]);
              } else {
                hs_set_rs_num(client, kbd_rsinfo_list.length);
              }
            }
          }
          break;
        case CMD_DKS_GET_NUM:
          {
            log_r('IQ_GET_MAG_DKS_NUM');
            client.device_info.kbd_dks_num = byteLen[0x1];
            client.device_info.kbd_dks_infos.splice(0x0, client.device_info.kbd_dks_infos.length);
            if (client.device_info.kbd_dks_num > 0x0) {
              hs_get_dks_data(client, 0x0);
            } else {
              kbd_data_sync_index = kbd_data_sync_index | SYNC_FLAG_ADVANCED;
              hs_data_sync(client);
              window.postMessage({
                'action': 'action_ui_refresh_kbd_advance_key'
              });
            }
          }
          break;
        case CMD_DKS_SET_NUM:
          {
            log_r("IQ_SET_MAG_DKS_NUM");
            client.device_info.kbd_dks_num = byteLen[0x1];
            client.device_info.kbd_dks_infos.splice(0x0, client.device_info.kbd_dks_infos.length);
            if (client.device_info.kbd_dks_num > 0x0) {
              for (var offset = 0x0; offset < kbd_dksinfo_list.length; offset++) {
                client.device_info.kbd_dks_infos.push(kbd_clone_dks_info(kbd_dksinfo_list[offset]));
              }
              kbd_dksinfo_list.splice(0x0, kbd_dksinfo_list.length);
            }
            log_r(client.device_info.kbd_dks_infos);
            window.postMessage({
              'action': 'action_ui_refresh_kbd_advance_key'
            });
          }
          break;
        case CMD_DKS_GET_DATA:
          {
            log_r('IQ_GET_MAG_DKS_DATA');
            if (byteLen.length >= 0x14) {
              var obj5 = kbd_create_dks_info();
              obj5.id = byteLen[0x1];
              obj5.row = byteLen[0x2];
              obj5.col = byteLen[0x3];
              obj5.keyCode1 = byteLen[0x5] | byteLen[0x4] << 0x8;
              obj5.state1 = byteLen[0x7] | byteLen[0x6] << 0x8;
              obj5.keyCode2 = byteLen[0x9] | byteLen[0x8] << 0x8;
              obj5.state2 = byteLen[0xb] | byteLen[0xa] << 0x8;
              obj5.keyCode3 = byteLen[0xd] | byteLen[0xc] << 0x8;
              obj5.state3 = byteLen[0xf] | byteLen[0xe] << 0x8;
              obj5.keyCode4 = byteLen[0x11] | byteLen[0x10] << 0x8;
              obj5.state4 = byteLen[0x13] | byteLen[0x12] << 0x8;
              client.device_info.kbd_dks_infos.push(obj5);
              if (obj5.id < client.device_info.kbd_dks_num - 0x1) {
                hs_get_dks_data(client, obj5.id + 0x1);
              } else {
                kbd_data_sync_index = kbd_data_sync_index | SYNC_FLAG_ADVANCED;
                hs_data_sync(client);
                window.postMessage({
                  'action': 'action_ui_refresh_kbd_advance_key'
                });
              }
            }
          }
          break;
        case CMD_DKS_SET_DATA:
          {
            log_r("IQ_SET_MAG_DKS_DATA");
            if (byteLen.length >= 0x14) {
              var value17 = byteLen[0x1];
              if (value17 < kbd_dksinfo_list.length - 0x1) {
                hs_set_dks_data(client, kbd_dksinfo_list[value17 + 0x1]);
              } else {
                hs_set_dks_num(client, kbd_dksinfo_list.length);
              }
            }
          }
          break;
      }
      if (!client.syncing) {
        client.recv_buf = skip_recv_buf(client.recv_buf, 0x20);
        i = true;
      }
    }
  } while (i);
}
