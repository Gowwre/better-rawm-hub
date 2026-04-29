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
  kbd_data_sync_index = 0;
  hs_data_sync(client);
};

hsHandlers[CMD_SET_ONBOARD_INDEX] = function hs_parse_set_onboard_index(client, byteLen) {
  log_r("IQ_GET_PROFILE_ID");
  client.device_info.onboardIndex = byteLen[1];
  kbd_data_sync_index = 0;
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
    kbd_keyinfo_list.push(kbd_create_pc_key_info(item.type, item.vCode, get_key_name_from_keyid(value6), item.aCode, item.aName, item.sCode, value6, item.row, item.col, item.rect));
  }
  if (value4 + value5 < value * 4) {
    var value7 = value * 4 - value4 - value5;
    hs_get_keycode_buff(client, value4 + value5, value7 < HS_CHUNK_MAX ? value7 : HS_CHUNK_MAX);
  } else {
    if (is_keyboard_5_15(client.device)) {
      kbd_keyinfo_list[0x3f].name = '';
    }
    client.device_info.kbd_key_infos = kbd_keyinfo_list.slice();
    kbd_keyinfo_list.splice(0, kbd_keyinfo_list.length);
    log_r("IQ_GET_KEYCODE_BUF finish");
    kbd_data_sync_index = kbd_data_sync_index | SYNC_FLAG_KEYCODE;
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
  kbd_macro_index = 0;
  macroBuff = [];
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
      if (macroBuff.length >= 3) {
        var idx = 1;
        while (idx < macroBuff.length) {
          if (macroBuff[idx] == 2) {
            idx++;
            var value6 = macroBuff[idx];
            var macroInfo = create_macro_info();
            macroInfo.mouse_key_event = MOUSE_EVENT_KEY_DOWN;
            macroInfo.mouse_key_code = get_key_code_from_keyid(value6);
            client.device_info.kbd_macro_infos[kbd_macro_index].push(macroInfo);
            idx++;
            idx++;
          } else if (macroBuff[idx] == 3) {
            idx++;
            var value6 = macroBuff[idx];
            var macroInfo = create_macro_info();
            macroInfo.mouse_key_event = MOUSE_EVENT_KEY_UP;
            macroInfo.mouse_key_code = get_key_code_from_keyid(value6);
            client.device_info.kbd_macro_infos[kbd_macro_index].push(macroInfo);
            idx++;
            idx++;
          } else if (macroBuff[idx] == 4) {
            idx++;
            var str = '';
            while (macroBuff[idx] >= '0'.charCodeAt() && macroBuff[idx] <= '9'.charCodeAt()) {
              str += String.fromCharCode(macroBuff[idx]);
              idx++;
            }
            var len2 = client.device_info.kbd_macro_infos[kbd_macro_index];
            var macroInfo = len2[len2.length - 1];
            if (macroInfo != undefined) {
              macroInfo.mouse_key_time = parseInt(str);
            }
            idx++;
            idx++;
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
};

hsHandlers[CMD_MACRO_SET] = function hs_parse_macro_set(client, byteLen) {
  log_r('IQ_SET_MACRO_DATA_BUF');
  var value4 = byteLen[1] << 8 | byteLen[2];
  var value11 = byteLen[3];
  if (value4 + value11 >= macroBuff.length) {
    client.device_info.kbd_macro_infos.splice(0, client.device_info.kbd_macro_infos.length);
    for (var offset = 0; offset < client.device_info.kbd_macro_num; offset++) {
      client.device_info.kbd_macro_infos.push([]);
      var len3 = kbd_macroinfo_list[offset];
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
    kbd_lightinfo_list.push(kbd_create_key_light_info(item.row, item.col, value15, value16));
  }
  if (value4 + value5 < value * 2) {
    var value7 = value * 2 - value4 - value5;
    hs_get_light_buff(client, value4 + value5, value7 < HS_CHUNK_MAX ? value7 : HS_CHUNK_MAX);
  } else {
    client.device_info.kbd_light_info.keys = kbd_lightinfo_list.slice();
    kbd_lightinfo_list.splice(0, kbd_lightinfo_list.length);
    log_r("IQ_GET_RGB_COLOR_BUF finish");
    kbd_data_sync_index = kbd_data_sync_index | SYNC_FLAG_LIGHT;
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
    for (var offset = 0; offset < kbd_lightinfo_list.length; offset++) {
      if (value9 == kbd_lightinfo_list[offset].row && value10 == kbd_lightinfo_list[offset].col) {
        kbd_lightinfo_list.splice(offset, 1);
        break;
      }
    }
    if (kbd_lightinfo_list.length > 0) {
      hs_set_light_define(client, kbd_lightinfo_list[0]);
    } else {
      he_custom_data_save(client, 1);
      window.postMessage({ 'action': ACTION_UI_REFRESH_KBD_LIGHT });
    }
  }
};

hsHandlers[CMD_GET_AXIS_MODE] = function hs_parse_get_axis_mode(client, byteLen) {
  log_r("IQ_GET_RT_BOOST_MODE");
  client.device_info.kbd_axis_mode = byteLen[1];
  kbd_axisinfo_list.splice(0, kbd_axisinfo_list.length);
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
  kbd_axisinfo_list.push(obj);
  if (kbd_axisinfo_list.length < len.length) {
    hs_get_axis_info(client, len[kbd_axisinfo_list.length].row, len[kbd_axisinfo_list.length].col);
  } else {
    client.device_info.kbd_axis_infos = kbd_axisinfo_list.slice();
    kbd_axisinfo_list.splice(0, kbd_axisinfo_list.length);
    kbd_data_sync_index = kbd_data_sync_index | SYNC_FLAG_AXIS;
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
    for (var offset = 0; offset < kbd_axisinfo_list.length; offset++) {
      if (obj.row == kbd_axisinfo_list[offset].row && obj.col == kbd_axisinfo_list[offset].col) {
        kbd_axisinfo_list.splice(offset, 1);
        break;
      }
    }
    if (kbd_axisinfo_list.length > 0) {
      hs_set_axis_info(client, kbd_axisinfo_list[0]);
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
    for (var offset = 0; offset < kbd_socdinfo_list.length; offset++) {
      client.device_info.kbd_socd_infos.push(kbd_clone_socd_info(kbd_socdinfo_list[offset]));
    }
    kbd_socdinfo_list.splice(0, kbd_socdinfo_list.length);
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
    if (value17 < kbd_socdinfo_list.length - 1) {
      hs_set_socd_data(client, kbd_socdinfo_list[value17 + 1]);
    } else {
      hs_set_socd_num(client, kbd_socdinfo_list.length);
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
    for (var offset = 0; offset < kbd_mtinfo_list.length; offset++) {
      client.device_info.kbd_mt_infos.push(kbd_clone_mt_info(kbd_mtinfo_list[offset]));
    }
    kbd_mtinfo_list.splice(0, kbd_mtinfo_list.length);
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
    if (value17 < kbd_mtinfo_list.length - 1) {
      hs_set_mt_data(client, kbd_mtinfo_list[value17 + 1]);
    } else {
      hs_set_mt_num(client, kbd_mtinfo_list.length);
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
    for (var offset = 0; offset < kbd_rsinfo_list.length; offset++) {
      client.device_info.kbd_rs_infos.push(kbd_clone_socd_info(kbd_rsinfo_list[offset]));
    }
    kbd_rsinfo_list.splice(0, kbd_rsinfo_list.length);
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
    if (value17 < kbd_rsinfo_list.length - 1) {
      hs_set_rs_data(client, kbd_rsinfo_list[value17 + 1]);
    } else {
      hs_set_rs_num(client, kbd_rsinfo_list.length);
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
    kbd_data_sync_index = kbd_data_sync_index | SYNC_FLAG_ADVANCED;
    hs_data_sync(client);
    window.postMessage({ 'action': 'action_ui_refresh_kbd_advance_key' });
  }
};

hsHandlers[CMD_DKS_SET_NUM] = function hs_parse_dks_set_num(client, byteLen) {
  log_r("IQ_SET_MAG_DKS_NUM");
  client.device_info.kbd_dks_num = byteLen[1];
  client.device_info.kbd_dks_infos.splice(0, client.device_info.kbd_dks_infos.length);
  if (client.device_info.kbd_dks_num > 0) {
    for (var offset = 0; offset < kbd_dksinfo_list.length; offset++) {
      client.device_info.kbd_dks_infos.push(kbd_clone_dks_info(kbd_dksinfo_list[offset]));
    }
    kbd_dksinfo_list.splice(0, kbd_dksinfo_list.length);
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
      kbd_data_sync_index = kbd_data_sync_index | SYNC_FLAG_ADVANCED;
      hs_data_sync(client);
      window.postMessage({ 'action': 'action_ui_refresh_kbd_advance_key' });
    }
  }
};

hsHandlers[CMD_DKS_SET_DATA] = function hs_parse_dks_set_data(client, byteLen) {
  log_r("IQ_SET_MAG_DKS_DATA");
  if (byteLen.length >= 0x14) {
    var value17 = byteLen[1];
    if (value17 < kbd_dksinfo_list.length - 1) {
      hs_set_dks_data(client, kbd_dksinfo_list[value17 + 1]);
    } else {
      hs_set_dks_num(client, kbd_dksinfo_list.length);
    }
  }
};
