import { DeviceStore, ACTION_REFRESH_CLIENT_LIST, ACTION_UI_REFRESH_CLIENT_LIST, ACTION_UI_REFRESH_CURRENT_CLIENT, ACTION_UI_REFRESH_KBD_LIGHT, ACTION_UI_REFRESH_KBD_AXIS, ACTION_UI_REFRESH_KBD_KEY, ACTION_UI_REFRESH_KBD_MACRO } from '../state/device-store.js';
import { pc_kbd_key_num, pc_kbd_manager_keys, get_key_name_from_keyid, get_key_code_from_keyid, kbd_create_pc_key_info, keys } from '../state/key-lookup.js';
import { is_keyboard_5_15 } from '../data/device-database.js';
import { hs_get_onboard_index, hs_data_sync, hs_get_keycode_buff, hs_get_light, hs_set_light, hs_get_light_buff, hs_set_light_define, hs_get_light_sleep_time, hs_set_light_sleep_time, hs_get_light_box, hs_set_light_box, hs_get_axis_info, hs_set_axis_info, hs_get_socd_num, hs_set_socd_num, hs_get_socd_data, hs_set_socd_data, hs_get_mt_num, hs_set_mt_num, hs_get_mt_data, hs_set_mt_data, hs_get_rs_num, hs_set_rs_num, hs_get_rs_data, hs_set_rs_data, hs_get_dks_num, hs_set_dks_num, hs_get_dks_data, hs_set_dks_data, hs_get_macro_num, hs_get_macro_buf, hs_set_macro_buf, hs_get_macro_buffer_size, hs_set_macro_data, hs_get_axis_mode, hs_set_axis_mode, hs_set_onboard_index, hs_set_keycode, he_custom_data_save, hs_set_factory_reset } from './hs-protocol.js';
import { kbd_create_key_light_info, kbd_create_light_box_info, kbd_create_light_info, kbd_clone_light_info, kbd_create_axis_info, kbd_clone_axis_info, kbd_create_socd_info, kbd_clone_socd_info, kbd_create_mt_info, kbd_clone_mt_info, kbd_create_rs_info, kbd_clone_rs_info, kbd_create_dks_info, kbd_clone_dks_info } from '../state/kbd-structures.js';
import { create_macro_info, clone_macro_info } from './key-config-parser.js';
import { skip_recv_buf, send_event, crc_process } from './hid-transport.js';
import { log_r } from './parse-cmd-ui.js';
import { CMD_FIRMWARE_VERSION, CMD_KEYCODE_FACTORY_RESET, CMD_GET_ONBOARD_INDEX, CMD_SET_ONBOARD_INDEX, CMD_GET_KEYCODE_BUF, CMD_SET_KEYCODE, CMD_GET_LIGHT, CMD_SET_LIGHT, CMD_GET_LIGHT_DEFINE_BUF, CMD_SET_LIGHT_DEFINE, CMD_GET_AXIS_INFO, CMD_SET_AXIS_INFO, CMD_GET_LIGHT_BOX, CMD_SET_LIGHT_BOX, CMD_GET_LIGHT_SLEEP, CMD_SET_LIGHT_SLEEP, CMD_GET_AXIS_MODE, CMD_SET_AXIS_MODE, CMD_CUSTOM_DATA_SAVE, CMD_HS_FACTORY_RESET, CMD_SOCD_GET_NUM, CMD_SOCD_SET_NUM, CMD_SOCD_GET_DATA, CMD_SOCD_SET_DATA, CMD_MT_GET_NUM, CMD_MT_SET_NUM, CMD_MT_GET_DATA, CMD_MT_SET_DATA, CMD_RS_GET_NUM, CMD_RS_SET_NUM, CMD_RS_GET_DATA, CMD_RS_SET_DATA, CMD_DKS_GET_NUM, CMD_DKS_SET_NUM, CMD_DKS_GET_DATA, CMD_DKS_SET_DATA, CMD_MACRO_GET, CMD_MACRO_SET, CMD_MACRO_NUM, CMD_MACRO_SIZE, CMD_MACRO_RESET, HS_FRAME_SIZE, HS_CHUNK_MAX, SYNC_FLAG_KEYCODE, SYNC_FLAG_LIGHT, SYNC_FLAG_AXIS, SYNC_FLAG_ADVANCED, LIGHT_PARAM_BRIGHTNESS, LIGHT_PARAM_MODE, LIGHT_PARAM_SPEED, LIGHT_PARAM_HUE_SAT, LIGHT_PARAM_BOX_MODE, KEY_WHEEL_UP_ID, KEY_WHEEL_DOWN_ID, MOUSE_EVENT_KEY_DOWN, MOUSE_EVENT_KEY_UP } from '../data/constants.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export var hsHandlers: Record<number, any> = {};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
hsHandlers[CMD_FIRMWARE_VERSION] = function hs_parse_firmware_version(client: any, byteLen: any) {
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
  if (client.device_info.revision.length > 0) {
    hs_get_onboard_index(client);
  } else {
    client.recv_buf = new Uint8Array(0);
    client.syncing = true;
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
hsHandlers[CMD_GET_ONBOARD_INDEX] = function hs_parse_onboard_index(client: any, byteLen: any) {
  var value = byteLen[1] | byteLen[2] << 8;
  client.device_info.kbd_onboardNum = value;
  hs_data_sync(client);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
hsHandlers[CMD_GET_KEYCODE_BUF] = function hs_parse_keycode_buf(client: any, byteLen: any) {
  var value = byteLen[1];
  var value2 = byteLen[2];
  var value3 = value | value2 << 8;
  var value4 = byteLen[3];
  var index = value3;
  var list = DeviceStore.kbdSync.keyinfoList;
  for (var offset = 0; offset < value4; offset++) {
    var scanCode = byteLen[7 + offset * 2];
    var keyCode = byteLen[8 + offset * 2];
    scanCode = keyCode == KEY_WHEEL_UP_ID || keyCode == KEY_WHEEL_DOWN_ID ? keyCode : scanCode;
    if (scanCode == 0 && keyCode == 0) break;
    var item = kbd_create_pc_key_info(0, keyCode, '', 0, '', scanCode, scanCode, 0, 0, undefined);
    list.push(item);
    client.device_info.kbd_key_infos.push(item);
  }
  index += value4;
  if (index < pc_kbd_key_num(client)) {
    hs_get_keycode_buff(client, index, HS_CHUNK_MAX);
  } else {
    var kbd_keys = pc_kbd_manager_keys(client);
    for (var ki = 0; ki < list.length; ki++) {
      var name = '';
      var value5 = -1;
      for (var idx = 0; idx < kbd_keys.length; idx++) {
        if (list[ki].keyId == kbd_keys[idx].keyId) {
          name = kbd_keys[idx].name;
          value5 = kbd_keys[idx].vCode;
          break;
        }
      }
      if (name.length > 0) {
        list[ki].name = name;
      } else {
        list[ki].name = get_key_name_from_keyid(list[ki].keyId);
      }
      if (value5 >= 0) {
        list[ki].vCode = value5;
      } else {
        list[ki].vCode = get_key_code_from_keyid(list[ki].keyId);
      }
    }
    DeviceStore.kbdSync.index = DeviceStore.kbdSync.index | SYNC_FLAG_KEYCODE;
    hs_data_sync(client);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
hsHandlers[CMD_SET_KEYCODE] = function hs_parse_set_keycode(client: any, byteLen: any) {
  hs_get_keycode_buff(client, 0, pc_kbd_key_num(client));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
hsHandlers[CMD_GET_LIGHT] = function hs_parse_light(client: any, byteLen: any) {
  var value = byteLen[1];
  if (value == 0x8 || value == 0x9) {
    var value2 = byteLen[2] | byteLen[3] << 8 | byteLen[4] << 16 | byteLen[5] << 24;
    DeviceStore.kbdSync.lightinfoList.push(kbd_create_key_light_info(byteLen[2], byteLen[3], byteLen[4], byteLen[5]));
    if (value == 0x8) {
      client.device_info.kbd_light_info.keys = DeviceStore.kbdSync.lightinfoList.slice();
      hs_get_light(client, LIGHT_PARAM_MODE);
    } else {
      hs_get_light(client, LIGHT_PARAM_SPEED);
    }
  } else if (value == 0x1 || value == 0x2 || value == 0x3 || value == 0x4) {
    if (value == LIGHT_PARAM_BRIGHTNESS) {
      client.device_info.kbd_light_info.brightness = byteLen[2];
      hs_get_light(client, LIGHT_PARAM_MODE);
    } else if (value == LIGHT_PARAM_MODE) {
      client.device_info.kbd_light_info.mode = byteLen[2];
      hs_get_light(client, LIGHT_PARAM_SPEED);
    } else if (value == LIGHT_PARAM_SPEED) {
      client.device_info.kbd_light_info.speed = byteLen[2];
      hs_get_light(client, LIGHT_PARAM_HUE_SAT);
    } else if (value == LIGHT_PARAM_HUE_SAT) {
      client.device_info.kbd_light_info.hue = byteLen[2];
      client.device_info.kbd_light_info.sat = byteLen[3];
      hs_get_light_sleep_time(client);
    }
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
hsHandlers[CMD_SET_LIGHT] = function hs_parse_set_light(client: any, byteLen: any) {
  var value = byteLen[1];
  var value2 = byteLen[2];
  if (value == 0x1 || value == 0x2 || value == 0x3 || value == 0x4) {
    if (value == LIGHT_PARAM_BRIGHTNESS) {
      client.device_info.kbd_light_info.brightness = value2;
    } else if (value == LIGHT_PARAM_MODE) {
      client.device_info.kbd_light_info.mode = value2;
    } else if (value == LIGHT_PARAM_SPEED) {
      client.device_info.kbd_light_info.speed = value2;
    } else if (value == LIGHT_PARAM_HUE_SAT) {
      client.device_info.kbd_light_info.hue = byteLen[2];
      client.device_info.kbd_light_info.sat = byteLen[3];
    }
    window.postMessage({ 'action': ACTION_UI_REFRESH_KBD_LIGHT });
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
hsHandlers[CMD_GET_LIGHT_SLEEP] = function hs_parse_light_sleep(client: any, byteLen: any) {
  client.device_info.kbd_light_info.sleep_time = byteLen[1] | byteLen[2] << 8;
  hs_get_light_box(client);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
hsHandlers[CMD_SET_LIGHT_SLEEP] = function hs_parse_set_light_sleep(client: any, byteLen: any) {
  hs_get_light_sleep_time(client);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
hsHandlers[CMD_GET_LIGHT_DEFINE_BUF] = function hs_parse_light_define_buf(client: any, byteLen: any) {
  var index = byteLen[1] | byteLen[2] << 8;
  var count = byteLen[3];
  var list = DeviceStore.kbdSync.lightinfoList;
  for (var offset = 0; offset < count; offset++) {
    var value5 = byteLen[7 + offset * 4];
    var value6 = byteLen[8 + offset * 4];
    var value7 = byteLen[9 + offset * 4];
    var value8 = byteLen[10 + offset * 4];
    var item = kbd_create_key_light_info(value5, value6, value7, value8);
    list.push(item);
    client.device_info.kbd_light_info.keys.push(item);
  }
  index += count;
  if (index < DeviceStore.kbdSync.lightinfoList.length) {
    var value9 = Math.round(index / HS_CHUNK_MAX);
    hs_get_light_buff(client, index, value9);
  } else {
    DeviceStore.kbdSync.index = DeviceStore.kbdSync.index | SYNC_FLAG_LIGHT;
    hs_data_sync(client);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
hsHandlers[CMD_SET_LIGHT_DEFINE] = function hs_parse_set_light_define(client: any, byteLen: any) {
  DeviceStore.kbdSync.lightinfoList.splice(0, 1);
  if (DeviceStore.kbdSync.lightinfoList.length > 0) {
    hs_set_light_define(client, DeviceStore.kbdSync.lightinfoList[0]);
  } else {
    hs_get_light(client, LIGHT_PARAM_BRIGHTNESS);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
hsHandlers[CMD_GET_LIGHT_BOX] = function hs_parse_light_box(client: any, byteLen: any) {
  var value = byteLen[1];
  client.device_info.kbd_light_info.light_box_info = kbd_create_light_box_info();
  if (value != 0) {
    client.device_info.kbd_light_info.light_box_info.mode = byteLen[2];
    client.device_info.kbd_light_info.light_box_info.colored = byteLen[3];
    client.device_info.kbd_light_info.light_box_info.brightness = byteLen[4];
    client.device_info.kbd_light_info.light_box_info.speed = byteLen[5];
    client.device_info.kbd_light_info.light_box_info.r = byteLen[6];
    client.device_info.kbd_light_info.light_box_info.g = byteLen[7];
    client.device_info.kbd_light_info.light_box_info.b = byteLen[8];
    hs_get_axis_mode(client);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
hsHandlers[CMD_SET_LIGHT_BOX] = function hs_parse_set_light_box(client: any, byteLen: any) {
  hs_get_light_box(client);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
hsHandlers[CMD_GET_AXIS_MODE] = function hs_parse_axis_mode(client: any, byteLen: any) {
  client.device_info.kbd_axis_mode = byteLen[1] | byteLen[2] << 8;
  hs_get_axis_info(client, 0, 0);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
hsHandlers[CMD_SET_AXIS_MODE] = function hs_parse_set_axis_mode(client: any, byteLen: any) {
  hs_get_axis_mode(client);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
hsHandlers[CMD_GET_AXIS_INFO] = function hs_parse_axis_info(client: any, byteLen: any) {
  var index = byteLen[1];
  var count = byteLen[2];
  var list = DeviceStore.kbdSync.axisinfoList;
  for (var offset = 0; offset < count; offset++) {
    var base = 6 + offset * 11;
    if (base + 11 > byteLen.byteLength) break;
    var item = kbd_create_axis_info();
    item.row = byteLen[base];
    item.col = byteLen[base + 1];
    item.rt_enable = byteLen[base + 2];
    item.top_dz = byteLen[base + 3] | byteLen[base + 4] << 8;
    item.apc_lv = byteLen[base + 5] | byteLen[base + 6] << 8;
    item.rt_press_lv = byteLen[base + 7] | byteLen[base + 8] << 8;
    item.rt_release_lv = byteLen[base + 9];
    item.btm_dz = byteLen[base + 10];
    list.push(item);
    client.device_info.kbd_axis_infos.push(item);
  }
  index += count;
  if (index < pc_kbd_key_num(client)) {
    hs_get_axis_info(client, index, HS_CHUNK_MAX);
  } else {
    DeviceStore.kbdSync.index = DeviceStore.kbdSync.index | SYNC_FLAG_AXIS;
    hs_data_sync(client);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
hsHandlers[CMD_SET_AXIS_INFO] = function hs_parse_set_axis_info(client: any, byteLen: any) {
  DeviceStore.kbdSync.axisinfoList.splice(0, 1);
  if (DeviceStore.kbdSync.axisinfoList.length > 0) {
    hs_set_axis_info(client, DeviceStore.kbdSync.axisinfoList[0]);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
hsHandlers[CMD_SOCD_GET_NUM] = function hs_parse_socd_num(client: any, byteLen: any) {
  DeviceStore.kbdSync.socdinfoList.splice(0, DeviceStore.kbdSync.socdinfoList.length);
  client.device_info.kbd_socd_infos.splice(0, client.device_info.kbd_socd_infos.length);
  var socdNum = byteLen[1] | byteLen[2] << 8;
  client.device_info.kbd_socd_num = socdNum;
  if (socdNum > 0) {
    hs_get_socd_data(client, 0);
  } else {
    hs_get_mt_num(client);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
hsHandlers[CMD_SOCD_SET_NUM] = function hs_parse_set_socd_num(client: any, byteLen: any) {
  hs_get_socd_num(client);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
hsHandlers[CMD_SOCD_GET_DATA] = function hs_parse_socd_data(client: any, byteLen: any) {
  var index = byteLen[1];
  var list = DeviceStore.kbdSync.socdinfoList;
  var item = kbd_create_socd_info();
  item.id = byteLen[2];
  item.row1 = byteLen[3];
  item.col1 = byteLen[4];
  item.row2 = byteLen[5];
  item.col2 = byteLen[6];
  item.socd_mode = byteLen[7];
  list.push(item);
  client.device_info.kbd_socd_infos.push(item);
  index += 1;
  if (index < client.device_info.kbd_socd_num) {
    hs_get_socd_data(client, index);
  } else {
    hs_get_mt_num(client);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
hsHandlers[CMD_SOCD_SET_DATA] = function hs_parse_set_socd_data(client: any, byteLen: any) {
  DeviceStore.kbdSync.socdinfoList.splice(0, 1);
  if (DeviceStore.kbdSync.socdinfoList.length > 0) {
    hs_set_socd_data(client, DeviceStore.kbdSync.socdinfoList[0]);
  } else {
    hs_get_socd_num(client);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
hsHandlers[CMD_MT_GET_NUM] = function hs_parse_mt_num(client: any, byteLen: any) {
  DeviceStore.kbdSync.mtinfoList.splice(0, DeviceStore.kbdSync.mtinfoList.length);
  client.device_info.kbd_mt_infos.splice(0, client.device_info.kbd_mt_infos.length);
  var mtNum = byteLen[1] | byteLen[2] << 8;
  client.device_info.kbd_mt_num = mtNum;
  if (mtNum > 0) {
    hs_get_mt_data(client, 0);
  } else {
    hs_get_rs_num(client);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
hsHandlers[CMD_MT_SET_NUM] = function hs_parse_set_mt_num(client: any, byteLen: any) {
  hs_get_mt_num(client);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
hsHandlers[CMD_MT_GET_DATA] = function hs_parse_mt_data(client: any, byteLen: any) {
  var index = byteLen[1];
  var list = DeviceStore.kbdSync.mtinfoList;
  var item = kbd_create_mt_info();
  item.id = byteLen[2];
  item.row = byteLen[3];
  item.col = byteLen[4];
  item.tap_time = byteLen[5] | byteLen[6] << 8;
  item.keyCode1 = byteLen[7] | byteLen[8] << 8;
  item.keyCode2 = byteLen[9] | byteLen[10] << 8;
  list.push(item);
  client.device_info.kbd_mt_infos.push(item);
  index += 1;
  if (index < client.device_info.kbd_mt_num) {
    hs_get_mt_data(client, index);
  } else {
    hs_get_rs_num(client);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
hsHandlers[CMD_MT_SET_DATA] = function hs_parse_set_mt_data(client: any, byteLen: any) {
  DeviceStore.kbdSync.mtinfoList.splice(0, 1);
  if (DeviceStore.kbdSync.mtinfoList.length > 0) {
    hs_set_mt_data(client, DeviceStore.kbdSync.mtinfoList[0]);
  } else {
    hs_get_mt_num(client);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
hsHandlers[CMD_RS_GET_NUM] = function hs_parse_rs_num(client: any, byteLen: any) {
  DeviceStore.kbdSync.rsinfoList.splice(0, DeviceStore.kbdSync.rsinfoList.length);
  client.device_info.kbd_rs_infos.splice(0, client.device_info.kbd_rs_infos.length);
  var rsNum = byteLen[1] | byteLen[2] << 8;
  client.device_info.kbd_rs_num = rsNum;
  if (rsNum > 0) {
    hs_get_rs_data(client, 0);
  } else {
    hs_get_dks_num(client);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
hsHandlers[CMD_RS_SET_NUM] = function hs_parse_set_rs_num(client: any, byteLen: any) {
  hs_get_rs_num(client);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
hsHandlers[CMD_RS_GET_DATA] = function hs_parse_rs_data(client: any, byteLen: any) {
  var index = byteLen[1];
  var list = DeviceStore.kbdSync.rsinfoList;
  var item = kbd_create_rs_info();
  item.id = byteLen[2];
  item.row1 = byteLen[3];
  item.col1 = byteLen[4];
  item.row2 = byteLen[5];
  item.col2 = byteLen[6];
  list.push(item);
  client.device_info.kbd_rs_infos.push(item);
  index += 1;
  if (index < client.device_info.kbd_rs_num) {
    hs_get_rs_data(client, index);
  } else {
    hs_get_dks_num(client);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
hsHandlers[CMD_RS_SET_DATA] = function hs_parse_set_rs_data(client: any, byteLen: any) {
  DeviceStore.kbdSync.rsinfoList.splice(0, 1);
  if (DeviceStore.kbdSync.rsinfoList.length > 0) {
    hs_set_rs_data(client, DeviceStore.kbdSync.rsinfoList[0]);
  } else {
    hs_get_rs_num(client);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
hsHandlers[CMD_DKS_GET_NUM] = function hs_parse_dks_num(client: any, byteLen: any) {
  DeviceStore.kbdSync.dksinfoList.splice(0, DeviceStore.kbdSync.dksinfoList.length);
  client.device_info.kbd_dks_infos.splice(0, client.device_info.kbd_dks_infos.length);
  var dksNum = byteLen[1] | byteLen[2] << 8;
  client.device_info.kbd_dks_num = dksNum;
  if (dksNum > 0) {
    hs_get_dks_data(client, 0);
  } else {
    hs_get_macro_num(client);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
hsHandlers[CMD_DKS_SET_NUM] = function hs_parse_set_dks_num(client: any, byteLen: any) {
  hs_get_dks_num(client);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
hsHandlers[CMD_DKS_GET_DATA] = function hs_parse_dks_data(client: any, byteLen: any) {
  var index = byteLen[1];
  var list = DeviceStore.kbdSync.dksinfoList;
  var item = kbd_create_dks_info();
  item.id = byteLen[2];
  item.row = byteLen[3];
  item.col = byteLen[4];
  item.keyCode1 = byteLen[5] | byteLen[6] << 8;
  item.state1 = byteLen[7] | byteLen[8] << 8;
  item.keyCode2 = byteLen[9] | byteLen[10] << 8;
  item.state2 = byteLen[11] | byteLen[12] << 8;
  item.keyCode3 = byteLen[13] | byteLen[14] << 8;
  item.state3 = byteLen[15] | byteLen[16] << 8;
  item.keyCode4 = byteLen[17] | byteLen[18] << 8;
  item.state4 = byteLen[19] | byteLen[20] << 8;
  list.push(item);
  client.device_info.kbd_dks_infos.push(item);
  index += 1;
  if (index < client.device_info.kbd_dks_num) {
    hs_get_dks_data(client, index);
  } else {
    hs_get_macro_num(client);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
hsHandlers[CMD_DKS_SET_DATA] = function hs_parse_set_dks_data(client: any, byteLen: any) {
  DeviceStore.kbdSync.dksinfoList.splice(0, 1);
  if (DeviceStore.kbdSync.dksinfoList.length > 0) {
    hs_set_dks_data(client, DeviceStore.kbdSync.dksinfoList[0]);
  } else {
    hs_get_dks_num(client);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
hsHandlers[CMD_MACRO_NUM] = function hs_parse_macro_num(client: any, byteLen: any) {
  DeviceStore.kbdSync.macroinfoList.splice(0, DeviceStore.kbdSync.macroinfoList.length);
  client.device_info.kbd_macro_infos.splice(0, client.device_info.kbd_macro_infos.length);
  var macroNum = byteLen[1] | byteLen[2] << 8;
  client.device_info.kbd_macro_num = macroNum;
  if (macroNum > 0) {
    hs_get_macro_buffer_size(client);
  } else {
    DeviceStore.kbdSync.index = DeviceStore.kbdSync.index | SYNC_FLAG_ADVANCED;
    hs_data_sync(client);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
hsHandlers[CMD_MACRO_SIZE] = function hs_parse_macro_size(client: any, byteLen: any) {
  var macroSize = byteLen[1] | byteLen[2] << 8;
  client.device_info.kbd_macro_max_size = macroSize;
  if (macroSize > 0) {
    hs_get_macro_buf(client, 0, HS_CHUNK_MAX);
  } else {
    DeviceStore.kbdSync.index = DeviceStore.kbdSync.index | SYNC_FLAG_ADVANCED;
    hs_data_sync(client);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
hsHandlers[CMD_MACRO_GET] = function hs_parse_macro_get(client: any, byteLen: any) {
  var offset = byteLen[1] | byteLen[2] << 8;
  var count = byteLen[3];
  for (var len = 0; len < count; len++) {
    var position = 7 + len;
    DeviceStore.kbdSync.macroBuff.push(byteLen[position]);
  }
  offset += count;
  if (offset < client.device_info.kbd_macro_max_size) {
    hs_get_macro_buf(client, offset, HS_CHUNK_MAX);
  } else {
    var macroCharLen = DeviceStore.kbdSync.macroBuff.length;
    var macroInfoListLocal: any[] = [];
    var j = 0;
    var k = 0;
    while (j < macroCharLen) {
      var keyInfo = create_macro_info();
      var start = j;
      var nameLen = DeviceStore.kbdSync.macroBuff[j++];
      keyInfo.name = '';
      for (var n = 0; n < nameLen; n++) {
        if (j < macroCharLen) {
          keyInfo.name += String.fromCharCode(DeviceStore.kbdSync.macroBuff[j++]);
        }
      }
      var labelLen = DeviceStore.kbdSync.macroBuff[j++];
      keyInfo.label = '';
      for (var n = 0; n < labelLen; n++) {
        if (j < macroCharLen) {
          keyInfo.label += String.fromCharCode(DeviceStore.kbdSync.macroBuff[j++]);
        }
      }
      keyInfo._id = DeviceStore.kbdSync.macroBuff[j++];
      keyInfo.x = DeviceStore.kbdSync.macroBuff[j++];
      keyInfo.y = DeviceStore.kbdSync.macroBuff[j++];
      var macroKeyCount = DeviceStore.kbdSync.macroBuff[j++];
      keyInfo.mouse_key_code = DeviceStore.kbdSync.macroBuff[j++];
      keyInfo.mouse_key_event = DeviceStore.kbdSync.macroBuff[j++];
      keyInfo.mouse_key_time = DeviceStore.kbdSync.macroBuff[j] | DeviceStore.kbdSync.macroBuff[j + 1] << 8;
      j += 2;
      var mouseKeys: any[] = [];
      for (var n = 0; n < macroKeyCount; n++) {
        var macroKey = clone_macro_info(keyInfo);
        macroKey.interval_time = DeviceStore.kbdSync.macroBuff[j] | DeviceStore.kbdSync.macroBuff[j + 1] << 8;
        j += 2;
        macroKey.continue_time = DeviceStore.kbdSync.macroBuff[j] | DeviceStore.kbdSync.macroBuff[j + 1] << 8;
        j += 2;
        macroKey.style = DeviceStore.kbdSync.macroBuff[j++];
        if (macroKey.style == 0x16) {
          var i6 = DeviceStore.kbdSync.macroBuff[j++];
          if ((i6 & 0x80) != 0) {
            macroKey.mouse_key_loop = DeviceStore.kbdSync.macroBuff[j] | DeviceStore.kbdSync.macroBuff[j + 1] << 8;
            j += 2;
          } else {
            macroKey.mouse_key_loop = 1;
          }
          i6 &= 0x7f;
          if (i6 == 0 || i6 == 1 || i6 == 4) {
            macroKey.mouse_key_code = DeviceStore.kbdSync.macroBuff[j++];
            if (i6 == 1) macroKey.mouse_key_code += 0xff;
            else if (i6 == 4) macroKey.mouse_key_code += 0x200;
            macroKey.mouse_key_code = get_key_code_from_keyid(macroKey.mouse_key_code);
            var eventByte = DeviceStore.kbdSync.macroBuff[j++];
            macroKey.mouse_key_event = MOUSE_EVENT_KEY_UP;
            if (eventByte == 0) macroKey.mouse_key_event = MOUSE_EVENT_KEY_DOWN;
            else if (eventByte == 2) macroKey.mouse_key_event = MOUSE_EVENT_KEY_UP;
          } else if (i6 == 2) {
            var b1 = DeviceStore.kbdSync.macroBuff[j++];
            var b2 = DeviceStore.kbdSync.macroBuff[j++];
            var b3 = DeviceStore.kbdSync.macroBuff[j++];
            macroKey.mouse_key_code = (b1 & 0xff | b2 << 8 & 0xf00) << 16 | (b3 & 0xff | b2 << 4 & 0xf00);
            macroKey.mouse_key_event = 0x200;
          } else if (i6 == 6) {
            macroKey.mouse_key_code = (DeviceStore.kbdSync.macroBuff[j] | DeviceStore.kbdSync.macroBuff[j + 1] << 8) << 16 | (DeviceStore.kbdSync.macroBuff[j + 2] | DeviceStore.kbdSync.macroBuff[j + 3] << 8);
            j += 4;
            macroKey.mouse_key_event = 0x2ff;
          } else if (i6 == 3) {
            macroKey.mouse_key_code = DeviceStore.kbdSync.macroBuff[j++] - 0x40;
            macroKey.mouse_key_event = 0x20a;
          } else if (i6 == 5) {
            macroKey.mouse_key_code = DeviceStore.kbdSync.macroBuff[j++] - 0x40;
            macroKey.mouse_key_event = 0x20e;
          }
          macroKey.mouse_key_time = DeviceStore.kbdSync.macroBuff[j] | DeviceStore.kbdSync.macroBuff[j + 1] << 8;
          j += 2;
        }
        mouseKeys.push(macroKey);
      }
      keyInfo.macroKeys = mouseKeys;
      macroInfoListLocal.push(keyInfo);
    }
    DeviceStore.kbdSync.macroinfoList = macroInfoListLocal;
    for (var i = 0; i < macroInfoListLocal.length; i++) {
      var clone = clone_macro_info(macroInfoListLocal[i]);
      delete clone.macroKeys;
      client.device_info.kbd_macro_infos.push(clone);
    }
    DeviceStore.kbdSync.index = DeviceStore.kbdSync.index | SYNC_FLAG_ADVANCED;
    hs_data_sync(client);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
hsHandlers[CMD_MACRO_SET] = function hs_parse_macro_set(client: any, byteLen: any) {
  var value = DeviceStore.kbdSync.macroIndex;
  var value2 = byteLen[1];
  for (var len = 0; len < value2; len++) {
    var value3 = value + len;
    DeviceStore.kbdSync.macroBuff[value3] = byteLen[7 + len];
  }
  value += value2;
  if (+value < DeviceStore.kbdSync.macroBuff.length) {
    DeviceStore.kbdSync.macroIndex = value;
    hs_set_macro_data(client, value);
  } else {
    hs_get_macro_num(client);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
hsHandlers[CMD_MACRO_RESET] = function hs_parse_macro_reset(client: any, byteLen: any) {
  DeviceStore.kbdSync.macroIndex = 0;
  DeviceStore.kbdSync.macroBuff = [];
  var fillSize = 0;
  for (var i = 0; i < DeviceStore.kbdSync.macroinfoList.length; i++) {
    var l = DeviceStore.kbdSync.macroinfoList[i];
    var nameBuffer = new TextEncoder().encode(l.name);
    var labelBuffer = new TextEncoder().encode(l.label);
    var macroKeys = l.macroKeys;
    fillSize += 1 + nameBuffer.byteLength + 1 + labelBuffer.byteLength + 4 + 2 + 7;
    for (var n = 0; n < macroKeys.length; n++) {
      fillSize += 4 + 4 + 1;
      if (macroKeys[n].style == 0x16) {
        fillSize += 1;
        var i6 = 0;
        if (macroKeys[n].mouse_key_event == 0x200) {
          i6 = 2;
          fillSize += 3;
        } else if (macroKeys[n].mouse_key_event == 0x2ff) {
          i6 = 6;
          fillSize += 4;
        } else if (macroKeys[n].mouse_key_event == 0x20a) {
          i6 = 3;
          fillSize += 1;
        } else if (macroKeys[n].mouse_key_event == 0x20e) {
          i6 = 5;
          fillSize += 1;
        } else {
          i6 = 0;
          fillSize += 2;
        }
        if (macroKeys[n].mouse_key_loop > 1) {
          fillSize += 1 + 2;
          i6 |= 0x80;
        }
        fillSize += 2;
      }
    }
  }
  DeviceStore.kbdSync.macroBuff = new Array(fillSize);
  var pos = 0;
  for (var i = 0; i < DeviceStore.kbdSync.macroinfoList.length; i++) {
    var l = DeviceStore.kbdSync.macroinfoList[i];
    var nameBuffer = new TextEncoder().encode(l.name);
    var labelBuffer = new TextEncoder().encode(l.label);
    var macroKeys = l.macroKeys;
    DeviceStore.kbdSync.macroBuff[pos++] = nameBuffer.byteLength;
    for (var n = 0; n < nameBuffer.byteLength; n++) {
      DeviceStore.kbdSync.macroBuff[pos++] = nameBuffer[n];
    }
    DeviceStore.kbdSync.macroBuff[pos++] = labelBuffer.byteLength;
    for (var n = 0; n < labelBuffer.byteLength; n++) {
      DeviceStore.kbdSync.macroBuff[pos++] = labelBuffer[n];
    }
    DeviceStore.kbdSync.macroBuff[pos++] = l._id;
    DeviceStore.kbdSync.macroBuff[pos++] = l.x;
    DeviceStore.kbdSync.macroBuff[pos++] = l.y;
    DeviceStore.kbdSync.macroBuff[pos++] = macroKeys.length;
    DeviceStore.kbdSync.macroBuff[pos++] = l.mouse_key_code;
    DeviceStore.kbdSync.macroBuff[pos++] = l.mouse_key_event;
    DeviceStore.kbdSync.macroBuff[pos++] = l.mouse_key_time & 0xff;
    DeviceStore.kbdSync.macroBuff[pos++] = l.mouse_key_time >> 8 & 0xff;
    for (var n = 0; n < macroKeys.length; n++) {
      DeviceStore.kbdSync.macroBuff[pos++] = macroKeys[n].interval_time & 0xff;
      DeviceStore.kbdSync.macroBuff[pos++] = macroKeys[n].interval_time >> 8 & 0xff;
      DeviceStore.kbdSync.macroBuff[pos++] = macroKeys[n].continue_time & 0xff;
      DeviceStore.kbdSync.macroBuff[pos++] = macroKeys[n].continue_time >> 8 & 0xff;
      DeviceStore.kbdSync.macroBuff[pos++] = macroKeys[n].style;
      if (macroKeys[n].style == 0x16) {
        var i6 = 0;
        if (macroKeys[n].mouse_key_event == 0x200) {
          i6 = 2;
        } else if (macroKeys[n].mouse_key_event == 0x2ff) {
          i6 = 6;
        } else if (macroKeys[n].mouse_key_event == 0x20a) {
          i6 = 3;
        } else if (macroKeys[n].mouse_key_event == 0x20e) {
          i6 = 5;
        }
        if (macroKeys[n].mouse_key_loop > 1) {
          i6 |= 0x80;
          DeviceStore.kbdSync.macroBuff[pos++] = i6;
          DeviceStore.kbdSync.macroBuff[pos++] = macroKeys[n].mouse_key_loop & 0xff;
          DeviceStore.kbdSync.macroBuff[pos++] = macroKeys[n].mouse_key_loop >> 8 & 0xff;
        } else {
          DeviceStore.kbdSync.macroBuff[pos++] = i6;
        }
        if (i6 == 0) {
          DeviceStore.kbdSync.macroBuff[pos++] = macroKeys[n].mouse_key_code;
          var eventByte = 2;
          if (macroKeys[n].mouse_key_event == MOUSE_EVENT_KEY_DOWN) {
            eventByte = 0;
          } else if (macroKeys[n].mouse_key_event == MOUSE_EVENT_KEY_UP) {
            eventByte = 2;
          }
          DeviceStore.kbdSync.macroBuff[pos++] = eventByte;
        } else if (i6 == 2) {
          DeviceStore.kbdSync.macroBuff[pos++] = macroKeys[n].mouse_key_code >> 16 & 0xff;
          DeviceStore.kbdSync.macroBuff[pos++] = (macroKeys[n].mouse_key_code >> 8 & 0xf0) | (macroKeys[n].mouse_key_code >> 16 >> 4 & 0xf);
          DeviceStore.kbdSync.macroBuff[pos++] = macroKeys[n].mouse_key_code & 0xff;
        } else if (i6 == 6) {
          DeviceStore.kbdSync.macroBuff[pos++] = macroKeys[n].mouse_key_code >> 16 & 0xff;
          DeviceStore.kbdSync.macroBuff[pos++] = macroKeys[n].mouse_key_code >> 24 & 0xff;
          DeviceStore.kbdSync.macroBuff[pos++] = macroKeys[n].mouse_key_code & 0xff;
          DeviceStore.kbdSync.macroBuff[pos++] = macroKeys[n].mouse_key_code >> 8 & 0xff;
        } else if (i6 == 3) {
          DeviceStore.kbdSync.macroBuff[pos++] = macroKeys[n].mouse_key_code + 0x40;
        } else if (i6 == 5) {
          DeviceStore.kbdSync.macroBuff[pos++] = macroKeys[n].mouse_key_code + 0x40;
        }
        DeviceStore.kbdSync.macroBuff[pos++] = macroKeys[n].mouse_key_time & 0xff;
        DeviceStore.kbdSync.macroBuff[pos++] = macroKeys[n].mouse_key_time >> 8 & 0xff;
      }
    }
  }
  DeviceStore.kbdSync.macroIndex = 0;
  hs_set_macro_data(client, 0);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
hsHandlers[CMD_KEYCODE_FACTORY_RESET] = function hs_parse_keycode_factory_reset(client: any, byteLen: any) {
  DeviceStore.kbdSync.index = 0;
  hs_data_sync(client);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
hsHandlers[CMD_HS_FACTORY_RESET] = function hs_parse_factory_reset(client: any, byteLen: any) {
  DeviceStore.kbdSync.index = 0;
  hs_data_sync(client);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
hsHandlers[CMD_CUSTOM_DATA_SAVE] = function hs_parse_custom_data_save(client: any, byteLen: any) {
  hs_get_onboard_index(client);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
hsHandlers[CMD_SET_ONBOARD_INDEX] = function hs_parse_set_onboard_index(client: any, byteLen: any) {
  hs_get_onboard_index(client);
};
