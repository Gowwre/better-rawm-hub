// ===== HID PROTOCOL HANDLER REGISTRY =========================================
// Each handler receives (client, byteLen, value2) where:
//   byteLen = client.recv_buf
//   value2 = total frame length (header + payload)
// Handlers parse the response and update state / dispatch UI actions.

import { send_event, crc_process } from './hid-transport.js';
import { send_event_query, send_event_action, send_event_set_rf_channel } from './hid-protocol.js';
import { add_key_info } from './key-config-parser.js';
import { query_firmware } from './http-data-model.js';
import { DeviceStore, DS, usb_client_list, is_receiver, is_limit_memory, reset_device_info, parse_device_info, create_usb_client, ACTION_REFRESH_CLIENT_LIST, ACTION_REFRESH_CURRENT_CLIENT, ACTION_UI_REFRESH_KBD_KEY, ACTION_UI_REFRESH_KBD_LIGHT, ACTION_UI_REFRESH_KBD_AXIS, ACTION_UI_REFRESH_KBD_MACRO, RESOURCE_URL, ACTION_UI_REFRESH_SETTING, ACTION_UI_REFRESH_CLIENT_LIST, ACTION_UI_REFRESH_CURRENT_CLIENT, ACTION_UI_REFRESH_CURRENT_CLIENT_RSSI, ACTION_UI_REFRESH_QUAL, reset_device_info_esb } from '../state/device-store.js';
import { is_hs_keyboard } from '../data/device-database.js';
import { log_r } from './parse-cmd-ui.js';
import { RESP_DEVICE_INFO_JSON, RESP_PARAMETER, RESP_SYNC, RESP_PING, ESB_ALIVE_TIMEOUT_MS, CMD_VIRTUAL_CHILD_POLL, CMD_QUERY_MORE_RESULT, HID_QUERY, HID_PARAM_CMD, HID_ACTION_CMD, PARAM_RESOLUTION, PARAM_POLLING_RATE, PARAM_POWER_MODE, PARAM_RESOLUTION_32BIT, PARAM_LOD, PARAM_KEY_DELAY, PARAM_KEY_DELAY_NOOP, PARAM_ESB_DEVICE_INFO, PARAM_MOTION_SYNC, PARAM_ANGLE_TUNING, PARAM_ANGLE_SNAPPING, PARAM_RIPPLE_CONTROL, PARAM_2_4G_SCORES, PARAM_KEY_DELAY_ENTRY, PARAM_PEER_INFO, PARAM_BATTERY_LEVELS, PARAM_BATTERY_PERCENT, PARAM_COLOR_CODE, PARAM_SLEEP_TIME, PARAM_LUA_STATUS, PARAM_RSSI, PARAM_PARAM_1e, PARAM_PARAM_1f, PARAM_NOACK, PARAM_GLASS_MODE, PARAM_ONBOARD_INDEX, PARAM_ONBOARD_STATUS, HID_ACTION_MOUSE_PARAM, HID_ACTION_MOUSE_KEY, HID_ACTION_MOUSE_FUNCTION, HID_ACTION_SET_ESB_ADDR, HID_ACTION_CLEAR_ESB_ADDR, HID_ACTION_SELECT_ESB_ADDR, HID_ACTION_SET_COLOR_CODE, HID_ACTION_SET_SLEEP_TIME, HID_ACTION_GAMING_ONLY, HID_ACTION_SET_BRIGHTNESS, HID_ACTION_MACRO_FIRST, HID_ACTION_MACRO_CONT, CMD_DEVICE_REBOOT, CMD_FACTORY_RESET, CMD_CONFIG_RESET, HID_REPORT_SIZE, MACRO_STYLE_PRESS, MACRO_STYLE_RELEASE, MACRO_STYLE_TOGGLE, MACRO_STYLE_LONG_PRESS, MACRO_STYLE_LONG_TOGGLE, MACRO_STYLE_LONG_RELEASE, MACRO_STYLE_TOGGLE_LOOP, MOUSE_EVENT_KEY_DOWN, MOUSE_EVENT_KEY_UP, MOUSE_EVENT_MOVE, MOUSE_EVENT_WHEEL_VERT, MOUSE_EVENT_WHEEL_HORZ, MOUSE_EVENT_POSITION, MOUSE_WHEEL_UP, MOUSE_WHEEL_DOWN, MOUSE_WHEEL_LEFT, MOUSE_WHEEL_RIGHT, MOUSE_MOVE_CODE, MOUSE_POSITION_CODE, KEYCODE_MEDIA_START, KEYCODE_EXT_THRESHOLD, SCAN_CODE_CTRL, SCAN_CODE_ALT, SCAN_CODE_SHIFT, SCAN_CODE_WIN, MACRO_CHUNK_SIZE, MACRO_CHUNK_LIMIT, MACRO_RECORD_STYLE, SYNC_DATA, FUNC_TOGGLE_CPI, FUNC_NEXT_CPI, FUNC_PREV_CPI, FUNC_TOGGLE_ASSIST, FUNC_NEXT_ASSIST, FUNC_PREV_ASSIST, FUNC_PRESS_CPI, FUNC_ADD_CPI, FUNC_PLUS_CPI, FUNC_CHOOSE_ASSIST, FUNC_TOGGLE_ESB, FUNC_SHOW_POWER, FUNC_TOGGLE_BLE, FUNC_SHELL_CMD, FUNC_TOGGLE_ONBOARD, FUNC_NEXT_ONBOARD, FUNC_PREV_ONBOARD, FUNC_TOGGLE_MINI_HUB, FUNC_TOGGLE_WORK_MODE, TOUCH_STYLE_KEY_MAP, TOUCH_STYLE_FUNC_MAP, CONFIG_TYPE_KEY, CONFIG_TYPE_MACRO, CPI_LOW_MASK, CPI_XY_MASK, KBD_DEFAULT_ONBOARD_NUM, POWER_MODE_DEFAULT, POWER_MODE_LOWEST, POWER_MODE_LOW, BATT_LEVEL_COUNT, CPI_LEVEL_COUNT, CPI_LEVEL_DEFAULTS, BATT_LEVEL_DEFAULTS, CHANNEL_SET_DELAY_MS, CONFIG_TIMEOUT_MS } from '../data/constants.js';

export var hidHandlers = {};

hidHandlers[RESP_DEVICE_INFO_JSON] = function hid_parse_device_info_json(client, byteLen, value2) {
  var idx;
  if (byteLen[4 + value2 - 1] == 0) {
    idx = String.fromCharCode.apply(null, byteLen.subarray(6, 4 + value2 - 1));
  } else {
    idx = String.fromCharCode.apply(null, byteLen.subarray(6, 4 + value2));
  }
  client.device_info = reset_device_info(client.device_info);
  client.device_info = parse_device_info(client.device_info, idx);
  if (client.device_info.deviceName != undefined) {
    client.connected = true;
    client.helloed = client.device_info.deviceName.length > 0;
    client.device_name = client.device_info.deviceName;
  } else {
    client.recv_buf = new Uint8Array(0);
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
      var client2 = create_usb_client(client.device, 0, true);
      usb_client_list[usb_client_list.length] = client2;
      if (client.helloed) {
        send_event_query(client2);
      }
    }
    if (!is_limit_memory(client)) {
      send_event_action(client, CMD_VIRTUAL_CHILD_POLL, 0);
    }
  }
  if (client.device_info.revision != undefined) {
    query_firmware(client, client.device_info != undefined && client.device_info.revision != undefined && client.device_info.revision.substr(0, 2) == 'G-' ? 1 : 0);
  }
  window.postMessage({ 'action': ACTION_REFRESH_CLIENT_LIST });
};

hidHandlers[RESP_PARAMETER] = function hid_parse_parameter(client, byteLen, value2) {
  var value4 = byteLen[6];
  var payload = [];
  for (var offset = 3; offset < value2; offset++) {
    payload.push(byteLen[4 + offset]);
  }
  var bytes = new Uint8Array(payload);
  if (value4 == PARAM_RESOLUTION) {
    client.device_info.resolution = bytes[0] | bytes[1] << 8;
    window.postMessage({ 'action': ACTION_UI_REFRESH_SETTING });
  } else if (value4 == PARAM_RESOLUTION_32BIT) {
    client.device_info.resolution = bytes[0] | bytes[1] << 8 | bytes[2] << 16 | bytes[3] << 24;
    window.postMessage({ 'action': ACTION_UI_REFRESH_SETTING });
  } else if (value4 == PARAM_POLLING_RATE) {
    var pollingRateVal = bytes[0] | bytes[1] << 8;
    if (client.device_info.pollingRate < 0) {
      client.device_info.pollingRate = pollingRateVal;
      window.postMessage({ 'action': ACTION_UI_REFRESH_SETTING });
    }
  } else if (value4 == PARAM_POWER_MODE) {
    client.device_info.powerMode = bytes[0];
    window.postMessage({ 'action': ACTION_UI_REFRESH_SETTING });
  } else if (value4 == PARAM_KEY_DELAY) {
    client.device_info.keyDelay = [];
    for (var offset = 0; offset < bytes.byteLength; offset++) {
      client.device_info.keyDelay.push(bytes[offset]);
    }
    window.postMessage({ 'action': ACTION_UI_REFRESH_SETTING });
  } else if (value4 == PARAM_LOD) {
    client.device_info.lod = bytes[0];
    window.postMessage({ 'action': ACTION_UI_REFRESH_SETTING });
  } else if (value4 == PARAM_ESB_DEVICE_INFO) {
    var idx;
    if (byteLen[4 + value2 - 1] == 0) {
      idx = String.fromCharCode.apply(null, byteLen.subarray(7, 4 + value2 - 1));
    } else {
      idx = String.fromCharCode.apply(null, byteLen.subarray(7, 4 + value2));
    }
    client.device_info = reset_device_info_esb(client.device_info);
    client.device_info = parse_device_info(client.device_info, idx);
    window.postMessage({ 'action': ACTION_UI_REFRESH_CLIENT_LIST });
    window.postMessage({ 'action': ACTION_UI_REFRESH_CURRENT_CLIENT });
  } else if (value4 == PARAM_MOTION_SYNC) {
    client.device_info.motionSync = bytes[0];
    window.postMessage({ 'action': ACTION_UI_REFRESH_SETTING });
  } else if (value4 == PARAM_ANGLE_TUNING) {
    client.device_info.angleTuning = bytes[0] << 24 >> 24;
    window.postMessage({ 'action': ACTION_UI_REFRESH_SETTING });
  } else if (value4 == PARAM_ANGLE_SNAPPING) {
    client.device_info.angleSnapping = bytes[0];
    window.postMessage({ 'action': ACTION_UI_REFRESH_SETTING });
  } else if (value4 == PARAM_RIPPLE_CONTROL) {
    client.device_info.rippleControl = bytes[0];
    window.postMessage({ 'action': ACTION_UI_REFRESH_SETTING });
  } else if (value4 == PARAM_KEY_DELAY_NOOP) {
  } else if (value4 == PARAM_2_4G_SCORES) {
    var scoreVal = bytes[0] | bytes[1] << 8;
    var value5 = bytes[2] | bytes[3] << 8;
    var value6 = bytes[4] | bytes[5] << 8;
    log_r("2.4G scores: " + scoreVal + ", " + value5 + ", " + value6);
    if (scoreVal > value5 && scoreVal > value6) {
      if ((client.device_info.txOutputPower == 0 ? 0 : 1) == 1) {
        setTimeout(() => {
          log_r("set rf channel 2");
          send_event_set_rf_channel(client, 2);
          window.postMessage({ 'action': ACTION_UI_REFRESH_SETTING });
        }, CHANNEL_SET_DELAY_MS);
      }
    } else if (value5 > scoreVal && value5 > value6) {
      if ((client.device_info.txOutputPower == 0 ? 0 : 1) == 1) {
        setTimeout(() => {
          log_r("set rf channel 40");
          send_event_set_rf_channel(client, 0x28);
          window.postMessage({ 'action': ACTION_UI_REFRESH_SETTING });
        }, CHANNEL_SET_DELAY_MS);
      }
    } else if ((client.device_info.txOutputPower == 0 ? 0 : 1) == 1) {
      setTimeout(() => {
        log_r("set rf channel 80");
        send_event_set_rf_channel(client, 0x50);
        window.postMessage({ 'action': ACTION_UI_REFRESH_SETTING });
      }, CHANNEL_SET_DELAY_MS);
    }
  } else if (value4 == PARAM_KEY_DELAY_ENTRY) {
    if (bytes.byteLength == 1) {
      if (bytes[0] != 0xff) {
        client.onboard_index = bytes[0];
        log_r("receiver onboard " + client.onboard_index);
        add_key_info(client, client.onboard_index, undefined);
        clearTimeout(DS.mouse_config_timer);
        DS.mouse_config_timer = setTimeout(() => {
          DS.mouse_config_timer = undefined;
          if (client) {
            send_event_action(client, CMD_QUERY_MORE_RESULT, 0);
          }
        }, CONFIG_TIMEOUT_MS);
        client.querying_more_result = false;
        window.postMessage({ 'action': 'action_onboard_cfg', 'usb_client_id': client.id, 'msg': 'LOADED' });
      }
    } else {
      add_key_info(client, client.onboard_index, bytes);
      clearTimeout(DS.mouse_config_timer);
      DS.mouse_config_timer = setTimeout(() => {
        DS.mouse_config_timer = undefined;
        if (client) {
          send_event_action(client, CMD_QUERY_MORE_RESULT, 0);
        }
      }, CONFIG_TIMEOUT_MS);
      client.querying_more_result = false;
      window.postMessage({ 'action': 'action_onboard_cfg', 'usb_client_id': client.id, 'msg': 'LOADED' });
    }
  } else if (value4 == PARAM_PEER_INFO) {
    if (bytes.byteLength == 1) {
      if (bytes[0] == 0) {
        client.device_info.peerInfo = [];
      } else {
        window.postMessage({ 'action': ACTION_UI_REFRESH_SETTING });
      }
    } else {
      var elemId = bytes[0] | bytes[1] << 8;
      var value7 = sprintf("%02x:%02x:%02x:%02x:%02x:%02x", bytes[2], bytes[3], bytes[4], bytes[5], bytes[6], bytes[7]);
      client.device_info.peerInfo.push({ 'id': elemId, 'address': value7 });
    }
  } else if (value4 == PARAM_BATTERY_LEVELS) {
    client.device_info.batteryLevels = [];
    for (var offset = 0; offset < bytes.byteLength; offset += 2) {
      client.device_info.batteryLevels.push(bytes[offset] | bytes[offset + 1] << 8);
    }
  } else if (value4 == PARAM_BATTERY_PERCENT) {
    client.device_info.battery = bytes[0];
    client.device_info.charging = bytes[1] == 1;
    window.postMessage({ 'action': ACTION_UI_REFRESH_CURRENT_CLIENT });
  } else if (value4 == PARAM_SLEEP_TIME) {
    client.device_info.sleepTime = bytes[0] | bytes[1] << 8;
    window.postMessage({ 'action': ACTION_UI_REFRESH_SETTING });
  } else if (value4 == PARAM_RSSI) {
    client.device_info.rssi = new Int8Array(payload)[0];
    window.postMessage({ 'action': ACTION_UI_REFRESH_CURRENT_CLIENT_RSSI });
  } else if (value4 == PARAM_LUA_STATUS) {
    client.device_info.luaStatus = bytes[0];
    window.postMessage({ 'action': ACTION_UI_REFRESH_SETTING });
  } else if (value4 == PARAM_PARAM_1e) {
  } else if (value4 == PARAM_PARAM_1f) {
  } else if (value4 == PARAM_NOACK) {
    client.device_info.noack = bytes[0];
    window.postMessage({ 'action': ACTION_UI_REFRESH_SETTING });
  } else if (value4 == PARAM_COLOR_CODE) {
    for (var offset = 0; offset < bytes.byteLength; offset++) {
      if (bytes[offset] == 0) {
        client.device_info.colorCode = String.fromCharCode.apply(null, bytes.subarray(0, offset));
        window.postMessage({ 'action': ACTION_UI_REFRESH_CLIENT_LIST });
        window.postMessage({ 'action': ACTION_UI_REFRESH_CURRENT_CLIENT });
        break;
      }
    }
  } else if (value4 == PARAM_GLASS_MODE) {
    client.device_info.glassMode = bytes[0];
    if (bytes.byteLength > 1) {
      client.device_info.glassModeEnabled = bytes[1];
    } else {
      client.device_info.glassModeEnabled = 1;
    }
    window.postMessage({ 'action': ACTION_UI_REFRESH_SETTING });
  } else if (value4 == PARAM_ONBOARD_INDEX) {
    if (client.device_info.onboardIndex != bytes[0]) {
      client.device_info.onboardIndex = bytes[0];
      window.postMessage({ 'action': ACTION_UI_REFRESH_SETTING });
    }
  } else if (value4 == PARAM_ONBOARD_STATUS) {
    client.device_info.onboardStatus = [];
    for (var offset = 0; offset < bytes.byteLength; offset++) {
      client.device_info.onboardStatus.push(bytes[offset]);
    }
    window.postMessage({ 'action': ACTION_UI_REFRESH_SETTING });
  }
};

hidHandlers[RESP_PING] = function hid_parse_ping(client, byteLen, value2) {
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
        var json = JSON.parse(JSON.stringify(client.device_info.allKeyConfigs))[0];
        if (json == undefined || json.length == 0) {
          send_event_query(client);
        }
      }
    }
  }
  client.esb_last_alive_time = new Date().getTime();
  client.esb_alive_timeout = ESB_ALIVE_TIMEOUT_MS;
  var payload = [];
  for (var offset = 2; offset < value2; offset++) {
    payload.push(byteLen[4 + offset]);
  }
  var flag2 = false;
  var bytes = new Uint8Array(payload);
  if (bytes.byteLength > 0) {
    if (client.device_info.squal != bytes[0]) {
      client.device_info.squal = bytes[0];
      flag2 = true;
    }
  }
  if (bytes.byteLength > 1) {
    if (client.device_info.equal != bytes[1]) {
      client.device_info.equal = bytes[1];
      flag2 = true;
    }
  }
  if (bytes.byteLength > 2) {
    if (client.device_info.txOutputPowerApplied != bytes[2]) {
      client.device_info.txOutputPowerApplied = bytes[2];
      flag2 = true;
    }
  }
  if (flag2) {
    window.postMessage({ 'action': ACTION_UI_REFRESH_QUAL });
  }
};

hidHandlers[RESP_SYNC] = function hid_parse_sync(client, byteLen, value2) {
  const encodedSync = new TextEncoder().encode(SYNC_DATA);
  send_event(client, encodedSync);
};
