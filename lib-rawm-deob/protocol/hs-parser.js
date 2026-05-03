// ===== HS (HIGH‑SPEED KEYBOARD) PROTOCOL =====================================
// These functions implement the RAWM HS keyboard binary protocol. Commands
// are sent via send_event() (which appends to the client's send buffer) and
// trigger a send_client_data() call. The firmware responds with 0x20‑byte
// frames that hs_parse_cmd() decodes via a large switch on the first byte.
//
// Key command IDs (first byte of the frame):
//   0xf5 — firmware version / hello
//   0x12 — get keycode buffer (chunked)
//   0x5  — set single keycode
//   0x8  — get light parameter
//   0x7  — set light parameter
//   0x36 — get light‑define buffer (chunked)
//   0x37 — set single light‑define
//   0x1a — get axis info (chunked)
//   0x19 — set axis info
//   0x1e/0x1f — SOCD get/set num
//   0x20/0x21 — SOCD get/set data
//   0x22/0x23 — MT get/set num
//   0x24/0x25 — MT get/set data
//   0x2e/0x2f — RS get/set num
//   0x30/0x31 — RS get/set data
//   0x2a/0x2b — DKS get/set num
//   0x2c/0x2d — DKS get/set data
//   0xe/0xf  — macro buffer get/set
//   0xc/0xd  — macro num / buffer size
//   0x10     — reset macro buffer
//   0x39/0x40 — get/set onboard index
//   0x45/0x46 — get/set axis mode
// ============================================================================

// ===== HS PROTOCOL HANDLER REGISTRY ==========================================
// Each handler receives (client, byteLen) where byteLen is the full frame
// from client.recv_buf. Handlers parse the response and update state via
// DeviceStore or client.device_info directly.

var hsHandlers = {};

hsHandlers[CMD_FIRMWARE_VERSION] = function hs_parse_firmware_version(client, byteLen) {
  log_r("IQ_GET_SOFT_DRV_VER");
  if (client.device.productName != undefined) {
    client.connected = true;
    client.helloed = client.device.productName.length > 0;
    client.device_name = client.device.productName;
  } else {
    client.recv_buf = new Uint8Array(0);
    client.syncing = true;
  }
  var value3 = byteLen[1];
  client.device_info.revision = String.fromCharCode.apply(null, byteLen.subarray(2, 2 + value3));
  hs_get_onboard_index(client);
  window.postMessage({ 'action': ACTION_REFRESH_CLIENT_LIST });
  window.postMessage({ 'action': ACTION_UI_REFRESH_CLIENT_LIST });
  window.postMessage({ 'action': ACTION_UI_REFRESH_CURRENT_CLIENT });
};

hsHandlers[CMD_KEYCODE_FACTORY_RESET] = function hs_parse_keycode_factory_reset(client, byteLen) {
  log_r("IQ_RESET_KEYCODE");
  hs_get_onboard_index(client);
};

hsHandlers[CMD_GET_ONBOARD_INDEX] = function hs_parse_get_onboard_index(client, byteLen) {
  log_r("IQ_GET_PROFILE_ID");
  client.device_info.onboardIndex = byteLen[1];
  DeviceStore.kbdSync.index = 0;
  hs_data_sync(client);
};

hsHandlers[CMD_SET_ONBOARD_INDEX] = function hs_parse_set_onboard_index(client, byteLen) {
  log_r("IQ_GET_PROFILE_ID");
  client.device_info.onboardIndex = byteLen[1];
  DeviceStore.kbdSync.index = 0;
  hs_data_sync(client);
};

hsHandlers[CMD_GET_KEYCODE_BUF] = function hs_parse_get_keycode_buf(client, byteLen) {
  log_r("IQ_GET_KEYCODE_BUF");
  var value = pc_kbd_key_num(client);
  var len = pc_kbd_manager_keys(client);
  var value4 = byteLen[2] | byteLen[1] << 8;
  var value5 = byteLen[3];
  for (var offset = 0; offset < value5; offset += 2) {
    var value6 = byteLen[4 + offset] << 8 | byteLen[4 + offset + 1];
    var index = (value4 + offset) / 2;
    if (index >= value) {
      index = index - value;
    }
    var item = len[index];
    DeviceStore.kbdSync.keyinfoList.push(kbd_create_pc_key_info(item.type, item.vCode, get_key_name_from_keyid(value6), item.aCode, item.aName, item.sCode, value6, item.row, item.col, item.rect));
  }
  if (value4 + value5 < value * 4) {
    var value7 = value * 4 - value4 - value5;
    hs_get_keycode_buff(client, value4 + value5, value7 < HS_CHUNK_MAX ? value7 : HS_CHUNK_MAX);
  } else {
    if (is_keyboard_5_15(client.device)) {
      DeviceStore.kbdSync.keyinfoList[0x3f].name = '';
    }
    client.device_info.kbd_key_infos = DeviceStore.kbdSync.keyinfoList.slice();
    DeviceStore.kbdSync.keyinfoList.splice(0, DeviceStore.kbdSync.keyinfoList.length);
    log_r("IQ_GET_KEYCODE_BUF finish");
    DeviceStore.kbdSync.index = DeviceStore.kbdSync.index | SYNC_FLAG_KEYCODE;
    hs_get_macro_num(client);
    window.postMessage({ 'action': ACTION_UI_REFRESH_KBD_KEY });
  }
};

hsHandlers[CMD_SET_KEYCODE] = function hs_parse_set_keycode(client, byteLen) {
  if (byteLen.length >= 6) {
    var value8 = byteLen[1];
    var value9 = byteLen[2];
    var value10 = byteLen[3];
    var value6 = byteLen[5] | byteLen[4] << 8;
    var value = pc_kbd_key_num(client);
    if (value8 == 0) {
      for (var offset = 0; offset < value; offset++) {
        var item = client.device_info.kbd_key_infos[offset];
        if (value9 == item.row && value10 == item.col) {
          item.keyId = value6;
          item.name = get_key_name_from_keyid(value6);
          break;
        }
      }
    } else {
      for (var offset = value; offset < value * 2 - 1; offset++) {
        var item = client.device_info.kbd_key_infos[offset];
        if (value9 == item.row && value10 == item.col) {
          item.keyId = value6;
          item.name = get_key_name_from_keyid(value6);
          break;
        }
      }
    }
  }
};

hsHandlers[CMD_MACRO_NUM] = function hs_parse_macro_num(client, byteLen) {
  log_r("IQ_GET_MACRO_NUM");
  client.device_info.kbd_macro_num = byteLen[1];
  client.device_info.kbd_macro_infos.splice(0, client.device_info.kbd_macro_infos.length);
  for (var offset = 0; offset < client.device_info.kbd_macro_num; offset++) {
    client.device_info.kbd_macro_infos.push([]);
  }
  hs_get_macro_buffer_size(client);
};

hsHandlers[CMD_MACRO_SIZE] = function hs_parse_macro_size(client, byteLen) {
  log_r("IQ_GET_MACRO_SIZE");
  client.device_info.kbd_macro_max_size = byteLen[1] << 8 | byteLen[2];
  DeviceStore.kbdSync.macroIndex = 0;
  DeviceStore.kbdSync.macroBuff = [];
  hs_get_macro_buf(client, 0, HS_CHUNK_MAX);
};

hsHandlers[CMD_MACRO_RESET] = function hs_parse_macro_reset(client, byteLen) {
  log_r('IQ_RESET_MACRO');
  hs_set_macro_data(client, 0);
};

hsHandlers[CMD_MACRO_GET] = function hs_parse_macro_get(client, byteLen) {
  log_r("IQ_GET_MACRO_DATA_BUF");
  var value4 = byteLen[1] << 8 | byteLen[2];
  var value11 = byteLen[3];
  for (var offset = 0; offset < value11; offset++) {
    var offset2 = byteLen[4 + offset];
    if (offset2 == 0) {
      if (DeviceStore.kbdSync.macroBuff.length >= 3) {
        var idx = 1;
        while (idx < DeviceStore.kbdSync.macroBuff.length) {
          if (DeviceStore.kbdSync.macroBuff[idx] == 2) {
            idx++;
            var value6 = DeviceStore.kbdSync.macroBuff[idx];
            var macroInfo = create_macro_info();
            macroInfo.mouse_key_event = MOUSE_EVENT_KEY_DOWN;
            macroInfo.mouse_key_code = get_key_code_from_keyid(value6);
            client.device_info.kbd_macro_infos[DeviceStore.kbdSync.macroIndex].push(macroInfo);
            idx++;
            idx++;
          } else if (DeviceStore.kbdSync.macroBuff[idx] == 3) {
            idx++;
            var value6 = DeviceStore.kbdSync.macroBuff[idx];
            var macroInfo = create_macro_info();
            macroInfo.mouse_key_event = MOUSE_EVENT_KEY_UP;
            macroInfo.mouse_key_code = get_key_code_from_keyid(value6);
            client.device_info.kbd_macro_infos[DeviceStore.kbdSync.macroIndex].push(macroInfo);
            idx++;
            idx++;
          } else if (DeviceStore.kbdSync.macroBuff[idx] == 4) {
            idx++;
            var str = '';
            while (DeviceStore.kbdSync.macroBuff[idx] >= '0'.charCodeAt() && DeviceStore.kbdSync.macroBuff[idx] <= '9'.charCodeAt()) {
              str += String.fromCharCode(DeviceStore.kbdSync.macroBuff[idx]);
              idx++;
            }
            var len2 = client.device_info.kbd_macro_infos[DeviceStore.kbdSync.macroIndex];
            var macroInfo = len2[len2.length - 1];
            if (macroInfo != undefined) {
              macroInfo.mouse_key_time = parseInt(str);
            }
            idx++;
            idx++;
          }
        }
      }
      DeviceStore.kbdSync.macroIndex++;
      DeviceStore.kbdSync.macroBuff = [];
    } else {
      DeviceStore.kbdSync.macroBuff.push(offset2);
    }
  }
  if (DeviceStore.kbdSync.macroIndex >= client.device_info.kbd_macro_num) {
    hs_data_sync(client);
  } else {
    hs_get_macro_buf(client, value4 + value11, HS_CHUNK_MAX);
  }
};

hsHandlers[CMD_MACRO_SET] = function hs_parse_macro_set(client, byteLen) {
  log_r('IQ_SET_MACRO_DATA_BUF');
  var value4 = byteLen[1] << 8 | byteLen[2];
  var value11 = byteLen[3];
  if (value4 + value11 >= DeviceStore.kbdSync.macroBuff.length) {
    client.device_info.kbd_macro_infos.splice(0, client.device_info.kbd_macro_infos.length);
    for (var offset = 0; offset < client.device_info.kbd_macro_num; offset++) {
      client.device_info.kbd_macro_infos.push([]);
      var len3 = DeviceStore.kbdSync.macroinfoList[offset];
      if (len3.length > 0) {
        for (var count = 0; count < len3.length; count++) {
          client.device_info.kbd_macro_infos[offset].push(clone_macro_info(len3[count]));
        }
      }
    }
    window.postMessage({ 'action': ACTION_UI_REFRESH_KBD_MACRO });
  } else {
    hs_set_macro_data(client, value4 + value11);
  }
};

hsHandlers[CMD_GET_LIGHT] = function hs_parse_get_light(client, byteLen) {
  if (byteLen.length >= 4) {
    var value12 = byteLen[2];
    if (value12 == LIGHT_PARAM_BRIGHTNESS) {
      client.device_info.kbd_light_info.brightness = byteLen[3];
      hs_get_light(client, LIGHT_PARAM_MODE);
    } else if (value12 == LIGHT_PARAM_MODE) {
      client.device_info.kbd_light_info.mode = byteLen[3];
      hs_get_light(client, LIGHT_PARAM_SPEED);
    } else if (value12 == LIGHT_PARAM_SPEED) {
      client.device_info.kbd_light_info.speed = byteLen[3];
      hs_get_light(client, LIGHT_PARAM_HUE_SAT);
    } else if (value12 == LIGHT_PARAM_HUE_SAT) {
      client.device_info.kbd_light_info.hue = byteLen[3];
      client.device_info.kbd_light_info.sat = byteLen[4];
      hs_get_light_sleep_time(client);
    }
  }
};

hsHandlers[CMD_GET_LIGHT_SLEEP] = function hs_parse_get_light_sleep(client, byteLen) {
  log_r("IQ_GET_RGB_COLOR_SLEEP_TIME");
  var value13 = byteLen[1];
  var value14 = byteLen[2] << 8 | byteLen[3];
  if (value13 == 0) {
    client.device_info.kbd_light_info.sleep_time = 0;
  } else {
    client.device_info.kbd_light_info.sleep_time = value14;
  }
  hs_get_light_box(client);
};

hsHandlers[CMD_SET_LIGHT_SLEEP] = function hs_parse_set_light_sleep(client, byteLen) {
  log_r("IQ_SET_RGB_COLOR_SLEEP_TIME");
  var value13 = byteLen[1];
  var value14 = byteLen[2] << 8 | byteLen[3];
  if (value13 == 0) {
    client.device_info.kbd_light_info.sleep_time = 0;
  } else {
    client.device_info.kbd_light_info.sleep_time = value14;
  }
};

hsHandlers[CMD_GET_LIGHT_BOX] = function hs_parse_get_light_box(client, byteLen) {
  log_r("IQ_GET_BOX_RGB_COLOR");
  var idx = 1;
  idx++;
  client.device_info.kbd_light_info.light_box_info.mode = byteLen[idx++];
  client.device_info.kbd_light_info.light_box_info.colored = byteLen[idx++];
  client.device_info.kbd_light_info.light_box_info.brightness = byteLen[idx++];
  client.device_info.kbd_light_info.light_box_info.speed = byteLen[idx++];
  client.device_info.kbd_light_info.light_box_info.r = byteLen[idx++];
  client.device_info.kbd_light_info.light_box_info.g = byteLen[idx++];
  client.device_info.kbd_light_info.light_box_info.b = byteLen[idx++];
  hs_get_light_buff(client, 0, HS_CHUNK_MAX);
};

hsHandlers[CMD_SET_LIGHT_BOX] = function hs_parse_set_light_box(client, byteLen) {
  log_r("IQ_GET_BOX_RGB_COLOR");
  var idx = 1;
  idx++;
  client.device_info.kbd_light_info.light_box_info.mode = byteLen[idx++];
  client.device_info.kbd_light_info.light_box_info.colored = byteLen[idx++];
  client.device_info.kbd_light_info.light_box_info.brightness = byteLen[idx++];
  client.device_info.kbd_light_info.light_box_info.speed = byteLen[idx++];
  client.device_info.kbd_light_info.light_box_info.r = byteLen[idx++];
  client.device_info.kbd_light_info.light_box_info.g = byteLen[idx++];
  client.device_info.kbd_light_info.light_box_info.b = byteLen[idx++];
};

hsHandlers[CMD_SET_LIGHT] = function hs_parse_set_light(client, byteLen) {
  if (byteLen.length >= 4) {
    log_r("IQ_SET_CUSTOM:" + byteLen);
    var value12 = byteLen[2];
    if (value12 == LIGHT_PARAM_BRIGHTNESS) {
      client.device_info.kbd_light_info.brightness = byteLen[3];
    } else if (value12 == LIGHT_PARAM_MODE) {
      client.device_info.kbd_light_info.mode = byteLen[3];
    } else if (value12 == LIGHT_PARAM_SPEED) {
      client.device_info.kbd_light_info.speed = byteLen[3];
    } else if (value12 == LIGHT_PARAM_HUE_SAT) {
      client.device_info.kbd_light_info.hue = byteLen[3];
      client.device_info.kbd_light_info.sat = byteLen[4];
    }
  }
};

hsHandlers[CMD_GET_LIGHT_DEFINE_BUF] = function hs_parse_get_light_define_buf(client, byteLen) {
  log_r("IQ_GET_RGB_COLOR_BUF");
  var value = pc_kbd_key_num(client);
  var len = pc_kbd_manager_keys(client);
  var value4 = byteLen[1] << 8 | byteLen[2];
  var value5 = byteLen[3];
  for (var offset = 0; offset < value5; offset += 2) {
    var value15 = byteLen[4 + offset];
    var value16 = byteLen[4 + offset + 1];
    var index = (value4 + offset) / 2;
    var item = len[index];
    DeviceStore.kbdSync.lightinfoList.push(kbd_create_key_light_info(item.row, item.col, value15, value16));
  }
  if (value4 + value5 < value * 2) {
    var value7 = value * 2 - value4 - value5;
    hs_get_light_buff(client, value4 + value5, value7 < HS_CHUNK_MAX ? value7 : HS_CHUNK_MAX);
  } else {
    client.device_info.kbd_light_info.keys = DeviceStore.kbdSync.lightinfoList.slice();
    DeviceStore.kbdSync.lightinfoList.splice(0, DeviceStore.kbdSync.lightinfoList.length);
    log_r("IQ_GET_RGB_COLOR_BUF finish");
    DeviceStore.kbdSync.index = DeviceStore.kbdSync.index | SYNC_FLAG_LIGHT;
    hs_data_sync(client);
    window.postMessage({ 'action': ACTION_UI_REFRESH_KBD_LIGHT });
  }
};

hsHandlers[CMD_SET_LIGHT_DEFINE] = function hs_parse_set_light_define(client, byteLen) {
  log_r("IQ_SET_RGB_COLOR");
  if (byteLen.length >= 5) {
    var value9 = byteLen[1];
    var value10 = byteLen[2];
    var value15 = byteLen[3];
    var value16 = byteLen[4];
    for (var offset = 0; offset < client.device_info.kbd_light_info.keys.length; offset++) {
      if (value9 == client.device_info.kbd_light_info.keys[offset].row && value10 == client.device_info.kbd_light_info.keys[offset].col) {
        client.device_info.kbd_light_info.keys[offset].hue = value15;
        client.device_info.kbd_light_info.keys[offset].sat = value16;
        break;
      }
    }
    for (var offset = 0; offset < DeviceStore.kbdSync.lightinfoList.length; offset++) {
      if (value9 == DeviceStore.kbdSync.lightinfoList[offset].row && value10 == DeviceStore.kbdSync.lightinfoList[offset].col) {
        DeviceStore.kbdSync.lightinfoList.splice(offset, 1);
        break;
      }
    }
    if (DeviceStore.kbdSync.lightinfoList.length > 0) {
      hs_set_light_define(client, DeviceStore.kbdSync.lightinfoList[0]);
    } else {
      he_custom_data_save(client, 1);
      window.postMessage({ 'action': ACTION_UI_REFRESH_KBD_LIGHT });
    }
  }
};

hsHandlers[CMD_GET_AXIS_MODE] = function hs_parse_get_axis_mode(client, byteLen) {
  log_r("IQ_GET_RT_BOOST_MODE");
  client.device_info.kbd_axis_mode = byteLen[1];
  DeviceStore.kbdSync.axisinfoList.splice(0, DeviceStore.kbdSync.axisinfoList.length);
  client.device_info.kbd_axis_infos.splice(0, client.device_info.kbd_axis_infos.length);
  hs_get_axis_info(client, 0, 0);
};

hsHandlers[CMD_SET_AXIS_MODE] = function hs_parse_set_axis_mode(client, byteLen) {
  log_r("IQ_SET_RT_BOOST_MODE");
  client.device_info.kbd_axis_mode = byteLen[1];
};

hsHandlers[CMD_GET_AXIS_INFO] = function hs_parse_get_axis_info(client, byteLen) {
  log_r("IQ_GET_MAG_DATA");
  var len = pc_kbd_manager_keys(client);
  var idx = 1;
  var obj = kbd_create_axis_info();
  obj.row = byteLen[idx++];
  obj.col = byteLen[idx++];
  obj.rt_enable = byteLen[idx++];
  obj.top_dz = byteLen[idx++] << 8 | byteLen[idx++];
  obj.apc_lv = byteLen[idx++] << 8 | byteLen[idx++];
  obj.rt_press_lv = byteLen[idx++] << 8 | byteLen[idx++];
  obj.rt_release_lv = byteLen[idx++] << 8 | byteLen[idx++];
  obj.btm_dz = byteLen[idx++] << 8 | byteLen[idx++];
  obj.switch_type = byteLen[idx++];
  DeviceStore.kbdSync.axisinfoList.push(obj);
  if (DeviceStore.kbdSync.axisinfoList.length < len.length) {
    hs_get_axis_info(client, len[DeviceStore.kbdSync.axisinfoList.length].row, len[DeviceStore.kbdSync.axisinfoList.length].col);
  } else {
    client.device_info.kbd_axis_infos = DeviceStore.kbdSync.axisinfoList.slice();
    DeviceStore.kbdSync.axisinfoList.splice(0, DeviceStore.kbdSync.axisinfoList.length);
    DeviceStore.kbdSync.index = DeviceStore.kbdSync.index | SYNC_FLAG_AXIS;
    hs_data_sync(client);
    window.postMessage({ 'action': ACTION_UI_REFRESH_KBD_AXIS });
  }
};

hsHandlers[CMD_SET_AXIS_INFO] = function hs_parse_set_axis_info(client, byteLen) {
  log_r("IQ_SET_MAG_DATA");
  if (byteLen.length >= 0xe) {
    var idx = 1;
    var obj = kbd_create_axis_info();
    obj.row = byteLen[idx++];
    obj.col = byteLen[idx++];
    obj.rt_enable = byteLen[idx++];
    obj.top_dz = byteLen[idx++] << 8 | byteLen[idx++];
    obj.apc_lv = byteLen[idx++] << 8 | byteLen[idx++];
    obj.rt_press_lv = byteLen[idx++] << 8 | byteLen[idx++];
    obj.rt_release_lv = byteLen[idx++] << 8 | byteLen[idx++];
    obj.btm_dz = byteLen[idx++] << 8 | byteLen[idx++];
    obj.switch_type = byteLen[idx++];
    for (var offset = 0; offset < client.device_info.kbd_axis_infos.length; offset++) {
      if (obj.row == client.device_info.kbd_axis_infos[offset].row && obj.col == client.device_info.kbd_axis_infos[offset].col) {
        client.device_info.kbd_axis_infos[offset] = obj;
        break;
      }
    }
    for (var offset = 0; offset < DeviceStore.kbdSync.axisinfoList.length; offset++) {
      if (obj.row == DeviceStore.kbdSync.axisinfoList[offset].row && obj.col == DeviceStore.kbdSync.axisinfoList[offset].col) {
        DeviceStore.kbdSync.axisinfoList.splice(offset, 1);
        break;
      }
    }
    if (DeviceStore.kbdSync.axisinfoList.length > 0) {
      hs_set_axis_info(client, DeviceStore.kbdSync.axisinfoList[0]);
    } else {
      he_custom_data_save(client, 0);
      window.postMessage({ 'action': ACTION_UI_REFRESH_KBD_AXIS });
    }
  }
};

hsHandlers[CMD_SOCD_GET_NUM] = function hs_parse_socd_get_num(client, byteLen) {
  log_r('IQ_GET_MAG_SOCD_NUM');
  client.device_info.kbd_socd_num = byteLen[1];
  client.device_info.kbd_socd_infos.splice(0, client.device_info.kbd_socd_infos.length);
  if (client.device_info.kbd_socd_num > 0) {
    hs_get_socd_data(client, 0);
  } else {
    hs_get_mt_num(client);
  }
};

hsHandlers[CMD_SOCD_SET_NUM] = function hs_parse_socd_set_num(client, byteLen) {
  log_r('IQ_SET_MAG_SOCD_NUM');
  client.device_info.kbd_socd_num = byteLen[1];
  client.device_info.kbd_socd_infos.splice(0, client.device_info.kbd_socd_infos.length);
  if (client.device_info.kbd_socd_num > 0) {
    for (var offset = 0; offset < DeviceStore.kbdSync.socdinfoList.length; offset++) {
      client.device_info.kbd_socd_infos.push(kbd_clone_socd_info(DeviceStore.kbdSync.socdinfoList[offset]));
    }
    DeviceStore.kbdSync.socdinfoList.splice(0, DeviceStore.kbdSync.socdinfoList.length);
  }
  window.postMessage({ 'action': 'action_ui_refresh_kbd_advance_key' });
};

hsHandlers[CMD_SOCD_GET_DATA] = function hs_parse_socd_get_data(client, byteLen) {
  log_r('IQ_GET_MAG_SOCD_DATA');
  if (byteLen.length >= 0xa) {
    var obj2 = kbd_create_socd_info();
    obj2.id = byteLen[1];
    obj2.row1 = byteLen[2];
    obj2.col1 = byteLen[3];
    obj2.row2 = byteLen[4];
    obj2.col2 = byteLen[5];
    obj2.socd_mode = byteLen[6];
    client.device_info.kbd_socd_infos.push(obj2);
    if (obj2.id < client.device_info.kbd_socd_num - 1) {
      hs_get_socd_data(client, obj2.id + 1);
    } else {
      hs_get_mt_num(client);
      window.postMessage({ 'action': 'action_ui_refresh_kbd_advance_key' });
    }
  }
};

hsHandlers[CMD_SOCD_SET_DATA] = function hs_parse_socd_set_data(client, byteLen) {
  log_r("IQ_SET_MAG_SOCD_DATA");
  if (byteLen.length >= 0xa) {
    var value17 = byteLen[1];
    if (value17 < DeviceStore.kbdSync.socdinfoList.length - 1) {
      hs_set_socd_data(client, DeviceStore.kbdSync.socdinfoList[value17 + 1]);
    } else {
      hs_set_socd_num(client, DeviceStore.kbdSync.socdinfoList.length);
    }
  }
};

hsHandlers[CMD_MT_GET_NUM] = function hs_parse_mt_get_num(client, byteLen) {
  log_r("IQ_GET_MAG_MT_NUM");
  client.device_info.kbd_mt_num = byteLen[1];
  client.device_info.kbd_mt_infos.splice(0, client.device_info.kbd_mt_infos.length);
  if (client.device_info.kbd_mt_num > 0) {
    hs_get_mt_data(client, 0);
  } else {
    hs_get_rs_num(client);
  }
};

hsHandlers[CMD_MT_SET_NUM] = function hs_parse_mt_set_num(client, byteLen) {
  log_r("IQ_SET_MAG_MT_NUM");
  client.device_info.kbd_mt_num = byteLen[1];
  client.device_info.kbd_mt_infos.splice(0, client.device_info.kbd_mt_infos.length);
  if (client.device_info.kbd_mt_num > 0) {
    for (var offset = 0; offset < DeviceStore.kbdSync.mtinfoList.length; offset++) {
      client.device_info.kbd_mt_infos.push(kbd_clone_mt_info(DeviceStore.kbdSync.mtinfoList[offset]));
    }
    DeviceStore.kbdSync.mtinfoList.splice(0, DeviceStore.kbdSync.mtinfoList.length);
  }
  window.postMessage({ 'action': 'action_ui_refresh_kbd_advance_key' });
};

hsHandlers[CMD_MT_GET_DATA] = function hs_parse_mt_get_data(client, byteLen) {
  log_r("IQ_GET_MAG_MT_DATA");
  if (byteLen.length >= 0xa) {
    var obj3 = kbd_create_mt_info();
    obj3.id = byteLen[1];
    obj3.row = byteLen[2];
    obj3.col = byteLen[3];
    obj3.tap_time = byteLen[5] | byteLen[4] << 8;
    obj3.keyCode1 = byteLen[7] | byteLen[6] << 8;
    obj3.keyCode2 = byteLen[9] | byteLen[8] << 8;
    client.device_info.kbd_mt_infos.push(obj3);
    if (obj3.id < client.device_info.kbd_mt_num - 1) {
      hs_get_mt_data(client, obj3.id + 1);
    } else {
      hs_get_rs_num(client);
      window.postMessage({ 'action': 'action_ui_refresh_kbd_advance_key' });
    }
  }
};

hsHandlers[CMD_MT_SET_DATA] = function hs_parse_mt_set_data(client, byteLen) {
  log_r("IQ_SET_MAG_MT_DATA");
  if (byteLen.length >= 0xa) {
    var value17 = byteLen[1];
    if (value17 < DeviceStore.kbdSync.mtinfoList.length - 1) {
      hs_set_mt_data(client, DeviceStore.kbdSync.mtinfoList[value17 + 1]);
    } else {
      hs_set_mt_num(client, DeviceStore.kbdSync.mtinfoList.length);
    }
  }
};

hsHandlers[CMD_RS_GET_NUM] = function hs_parse_rs_get_num(client, byteLen) {
  log_r("IQ_GET_MAG_RS_NUM");
  client.device_info.kbd_rs_num = byteLen[1];
  client.device_info.kbd_rs_infos.splice(0, client.device_info.kbd_rs_infos.length);
  if (client.device_info.kbd_rs_num > 0) {
    hs_get_rs_data(client, 0);
  } else {
    hs_get_dks_num(client);
  }
};

hsHandlers[CMD_RS_SET_NUM] = function hs_parse_rs_set_num(client, byteLen) {
  log_r("IQ_SET_MAG_RS_NUM");
  client.device_info.kbd_rs_num = byteLen[1];
  client.device_info.kbd_rs_infos.splice(0, client.device_info.kbd_rs_infos.length);
  if (client.device_info.kbd_rs_num > 0) {
    for (var offset = 0; offset < DeviceStore.kbdSync.rsinfoList.length; offset++) {
      client.device_info.kbd_rs_infos.push(kbd_clone_socd_info(DeviceStore.kbdSync.rsinfoList[offset]));
    }
    DeviceStore.kbdSync.rsinfoList.splice(0, DeviceStore.kbdSync.rsinfoList.length);
  }
  window.postMessage({ 'action': 'action_ui_refresh_kbd_advance_key' });
};

hsHandlers[CMD_RS_GET_DATA] = function hs_parse_rs_get_data(client, byteLen) {
  log_r("IQ_GET_MAG_RS_DATA");
  if (byteLen.length >= 0xa) {
    var obj4 = kbd_create_rs_info();
    obj4.id = byteLen[1];
    obj4.row1 = byteLen[2];
    obj4.col1 = byteLen[3];
    obj4.row2 = byteLen[4];
    obj4.col2 = byteLen[5];
    client.device_info.kbd_rs_infos.push(obj4);
    if (obj4.id < client.device_info.kbd_rs_num - 1) {
      hs_get_rs_data(client, obj4.id + 1);
    } else {
      hs_get_dks_num(client);
      window.postMessage({ 'action': 'action_ui_refresh_kbd_advance_key' });
    }
  }
};

hsHandlers[CMD_RS_SET_DATA] = function hs_parse_rs_set_data(client, byteLen) {
  log_r("IQ_SET_MAG_RS_DATA");
  if (byteLen.length >= 0xa) {
    var value17 = byteLen[1];
    if (value17 < DeviceStore.kbdSync.rsinfoList.length - 1) {
      hs_set_rs_data(client, DeviceStore.kbdSync.rsinfoList[value17 + 1]);
    } else {
      hs_set_rs_num(client, DeviceStore.kbdSync.rsinfoList.length);
    }
  }
};

hsHandlers[CMD_DKS_GET_NUM] = function hs_parse_dks_get_num(client, byteLen) {
  log_r('IQ_GET_MAG_DKS_NUM');
  client.device_info.kbd_dks_num = byteLen[1];
  client.device_info.kbd_dks_infos.splice(0, client.device_info.kbd_dks_infos.length);
  if (client.device_info.kbd_dks_num > 0) {
    hs_get_dks_data(client, 0);
  } else {
    DeviceStore.kbdSync.index = DeviceStore.kbdSync.index | SYNC_FLAG_ADVANCED;
    hs_data_sync(client);
    window.postMessage({ 'action': 'action_ui_refresh_kbd_advance_key' });
  }
};

hsHandlers[CMD_DKS_SET_NUM] = function hs_parse_dks_set_num(client, byteLen) {
  log_r("IQ_SET_MAG_DKS_NUM");
  client.device_info.kbd_dks_num = byteLen[1];
  client.device_info.kbd_dks_infos.splice(0, client.device_info.kbd_dks_infos.length);
  if (client.device_info.kbd_dks_num > 0) {
    for (var offset = 0; offset < DeviceStore.kbdSync.dksinfoList.length; offset++) {
      client.device_info.kbd_dks_infos.push(kbd_clone_dks_info(DeviceStore.kbdSync.dksinfoList[offset]));
    }
    DeviceStore.kbdSync.dksinfoList.splice(0, DeviceStore.kbdSync.dksinfoList.length);
  }
  window.postMessage({ 'action': 'action_ui_refresh_kbd_advance_key' });
};

hsHandlers[CMD_DKS_GET_DATA] = function hs_parse_dks_get_data(client, byteLen) {
  log_r('IQ_GET_MAG_DKS_DATA');
  if (byteLen.length >= 0x14) {
    var obj5 = kbd_create_dks_info();
    obj5.id = byteLen[1];
    obj5.row = byteLen[2];
    obj5.col = byteLen[3];
    obj5.keyCode1 = byteLen[5] | byteLen[4] << 8;
    obj5.state1 = byteLen[7] | byteLen[6] << 8;
    obj5.keyCode2 = byteLen[9] | byteLen[8] << 8;
    obj5.state2 = byteLen[11] | byteLen[10] << 8;
    obj5.keyCode3 = byteLen[13] | byteLen[12] << 8;
    obj5.state3 = byteLen[15] | byteLen[14] << 8;
    obj5.keyCode4 = byteLen[17] | byteLen[16] << 8;
    obj5.state4 = byteLen[19] | byteLen[18] << 8;
    client.device_info.kbd_dks_infos.push(obj5);
    if (obj5.id < client.device_info.kbd_dks_num - 1) {
      hs_get_dks_data(client, obj5.id + 1);
    } else {
      DeviceStore.kbdSync.index = DeviceStore.kbdSync.index | SYNC_FLAG_ADVANCED;
      hs_data_sync(client);
      window.postMessage({ 'action': 'action_ui_refresh_kbd_advance_key' });
    }
  }
};

hsHandlers[CMD_DKS_SET_DATA] = function hs_parse_dks_set_data(client, byteLen) {
  log_r("IQ_SET_MAG_DKS_DATA");
  if (byteLen.length >= 0x14) {
    var value17 = byteLen[1];
    if (value17 < DeviceStore.kbdSync.dksinfoList.length - 1) {
      hs_set_dks_data(client, DeviceStore.kbdSync.dksinfoList[value17 + 1]);
    } else {
      hs_set_dks_num(client, DeviceStore.kbdSync.dksinfoList.length);
    }
  }
};
