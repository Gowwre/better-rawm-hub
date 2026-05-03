import { send_event, crc_process } from './hid-transport.js';
import { PacketBuilder } from './buffer.js';
import { DeviceStore, DS, is_receiver, is_limit_memory, get_cpi_step, get_keys } from '../state/device-store.js';
import { is_hs_keyboard } from '../data/device-database.js';
import { get_scan_code, get_key_name_from_code } from '../state/key-lookup.js';
import { create_macro_info } from './key-config-parser.js';
import { upload_mouse_config_delayed } from './http-data-model.js';
import { CONFIG_TYPE_KEY, CONFIG_TYPE_MACRO, HID_QUERY, HID_PARAM_CMD, HID_ACTION_CMD, HID_SYNC_CMD, HID_PING_CMD, HID_ACTION_SELECT_ESB_ADDR, HID_ACTION_CLEAR_ESB_ADDR, HID_ACTION_SET_ESB_ADDR, HID_ACTION_SET_COLOR_CODE, HID_ACTION_SET_SLEEP_TIME, HID_ACTION_SET_BRIGHTNESS, HID_ACTION_SET_RF_CHANNEL, HID_ACTION_GAMING_ONLY, HID_ACTION_SET_AUTO_HOP, HID_ACTION_MOUSE_PARAM, HID_ACTION_MOUSE_KEY, HID_ACTION_MOUSE_FUNCTION, HID_ACTION_MACRO_FIRST, HID_ACTION_MACRO_CONT, CMD_VIRTUAL_CHILD_POLL, CMD_DEVICE_REBOOT, CMD_FACTORY_RESET, CMD_CONFIG_RESET, CMD_QUERY_MORE_RESULT, SYNC_DATA, ESB_ALIVE_TIMEOUT_MS, MACRO_CHUNK_SIZE, MACRO_CHUNK_LIMIT, MACRO_STYLE_PRESS, MACRO_STYLE_RELEASE, MACRO_STYLE_TOGGLE, MACRO_STYLE_LONG_PRESS, MACRO_STYLE_LONG_TOGGLE, MACRO_STYLE_LONG_RELEASE, MACRO_STYLE_TOGGLE_LOOP, CPI_LOW_MASK, CPI_XY_MASK, SCAN_CODE_CTRL, SCAN_CODE_ALT, SCAN_CODE_SHIFT, SCAN_CODE_WIN, VK_CODE_CTRL, VK_CODE_ALT, VK_CODE_SHIFT, KEYCODE_EXT_THRESHOLD, KEYCODE_MEDIA_START, MOUSE_EVENT_KEY_DOWN, MOUSE_EVENT_KEY_UP, MOUSE_EVENT_MOVE, MOUSE_EVENT_POSITION, MOUSE_EVENT_WHEEL_VERT, MOUSE_EVENT_WHEEL_HORZ, MOUSE_WHEEL_UP, MOUSE_WHEEL_DOWN, MOUSE_WHEEL_LEFT, MOUSE_WHEEL_RIGHT, MOUSE_MOVE_CODE, MOUSE_POSITION_CODE, MACRO_RECORD_STYLE, TOUCH_STYLE_KEY_MAP, TOUCH_STYLE_FUNC_MAP, FUNC_NONE, FUNC_TOGGLE_CPI, FUNC_NEXT_CPI, FUNC_PREV_CPI, FUNC_TOGGLE_ASSIST, FUNC_NEXT_ASSIST, FUNC_PREV_ASSIST, FUNC_PRESS_CPI, FUNC_ADD_CPI, FUNC_PLUS_CPI, FUNC_CHOOSE_ASSIST, FUNC_TOGGLE_ESB, FUNC_SHOW_POWER, FUNC_TOGGLE_BLE, FUNC_SHELL_CMD, FUNC_TOGGLE_ONBOARD, FUNC_NEXT_ONBOARD, FUNC_PREV_ONBOARD, FUNC_TOGGLE_MINI_HUB, FUNC_TOGGLE_WORK_MODE, KEY_WHEEL_UP_ID, KEY_WHEEL_DOWN_ID, KEY_WHEEL_UP, KEY_WHEEL_DOWN, SYNC_TIMEOUT_MS } from '../data/constants.js';
import { hs_get_firmware_version } from './hs-protocol.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function send_event_query(client: any) {
  if (is_hs_keyboard(client.device)) {
    hs_get_firmware_version(client);
    return;
  }
  var timestamp = Math.floor(new Date().getTime() / 0x3e8);
  var payload = PacketBuilder.begin(HID_QUERY).uint8(0).uint8(HID_PARAM_CMD).uint8(0).uint8(0);
  for (var i = 0; i < 8; i++) {
    payload.uint8(timestamp & 0xff);
    timestamp = Math.floor(timestamp / 0x100);
  }
  send_event(client, crc_process(client, payload.build()));
  client.last_query_time = new Date().getTime();
  if (!is_receiver(client)) {
    client.querying_more_result = true;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function send_event_action(client: any, action: any, value: any) {
  var payload = PacketBuilder.begin(HID_ACTION_CMD).uint8(0).uint8(action).uint32(value);
  send_event(client, crc_process(client, payload.build()));
  if (action == CMD_QUERY_MORE_RESULT && value == 0 && !is_receiver(client)) {
    client.querying_more_result = true;
    client.last_query_time = new Date().getTime();
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function send_event_ping(client: any, pingIndex: any, isPingAll?: boolean) {
  if (isPingAll === undefined) isPingAll = true;
  if (client != undefined ? is_hs_keyboard(client.device) : false) {
    return;
  }
  var payload = PacketBuilder.begin(HID_PING_CMD).uint8(0).uint8(pingIndex ? 1 : 0);
  if (isPingAll) {
    const encodedSync = new TextEncoder().encode(SYNC_DATA);
    payload.bytes(Array.from(encodedSync));
  }
  send_event(client, crc_process(client, payload.build()));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function send_event_select_esb_addr(client: any, value: any) {
  var payload = PacketBuilder.begin(0x3).uint8(0).uint8(HID_ACTION_SELECT_ESB_ADDR);
  for (var len = 0; len < value.length; len += 2) {
    payload.uint8(parseInt(value.substr(len, 2), 16) & 0xff);
  }
  send_event(client, crc_process(client, payload.build()));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function send_event_clear_esb_addr(client: any, value: any) {
  var payload = PacketBuilder.begin(0x3).uint8(0).uint8(HID_ACTION_CLEAR_ESB_ADDR);
  for (var len = 0; len < value.length; len += 2) {
    payload.uint8(parseInt(value.substr(len, 2), 16) & 0xff);
  }
  send_event(client, crc_process(client, payload.build()));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function send_event_set_esb_addr(client: any, value: any, addrType: any, addr: any) {
  var payload = PacketBuilder.begin(0x3).uint8(0).uint8(HID_ACTION_SET_ESB_ADDR);
  for (var len = 0; len < value.length; len += 2) {
    payload.uint8(parseInt(value.substr(len, 2), 16) & 0xff);
  }
  payload.uint8(addrType).uint8(addr ? 1 : 0);
  send_event(client, crc_process(client, payload.build()));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function send_event_sync(client: any) {
  send_event(client, crc_process(client, PacketBuilder.begin(HID_SYNC_CMD).uint8(0).build()));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function send_event_set_color_code(client: any, value: any) {
  var payload = PacketBuilder.begin(0x3).uint8(0).uint8(HID_ACTION_SET_COLOR_CODE);
  var byteLen = new TextEncoder().encode(value);
  for (var len = 0; len < byteLen.byteLength && len < 0x10; len++) {
    payload.uint8(byteLen[len]);
  }
  for (var len = byteLen.byteLength; len < 0x10; len++) {
    payload.uint8(0);
  }
  send_event(client, crc_process(client, payload.build()));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function send_event_set_sleep_time(client: any, value: any) {
  if (client.device_info.sleepTime != value) {
    client.device_info.sleepTime = value;
    var payload = PacketBuilder.begin(0x3).uint8(0).uint8(HID_ACTION_SET_SLEEP_TIME).uint16(value);
    send_event(client, crc_process(client, payload.build()));
    clearTimeout(DS.upload_mouse_config_timer);
    DS.upload_mouse_config_timer = setTimeout(upload_mouse_config_delayed, SYNC_TIMEOUT_MS, client, client.device_info != undefined && client.device_info.revision != undefined && client.device_info.revision.substr(0, 2) == 'G-' ? 1 : 0, value);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function send_event_set_rf_channel(client: any, value: any) {
  var payload = PacketBuilder.begin(0x3).uint8(0).uint8(HID_ACTION_SET_RF_CHANNEL).uint8(value);
  send_event(client, crc_process(client, payload.build()));
  client.device_info.rfChannel = value;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function send_event_set_auto_hop(client: any, value: any) {
  var payload = PacketBuilder.begin(0x3).uint8(0).uint8(HID_ACTION_SET_AUTO_HOP).uint8(value ? 1 : 0);
  send_event(client, crc_process(client, payload.build()));
  client.device_info.hopChannel = value;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function send_event_mouse_param(client: any) {
  var value = client.device_info;
  var payload = PacketBuilder.begin(0x3).uint8(0).uint8(HID_ACTION_MOUSE_PARAM);
  var isXyLinked = (value.resolution & CPI_XY_MASK) == 0;
  if (isXyLinked) {
    payload.uint8(value.resolution & 0xff).uint8(value.resolution >> 8 & 0xff);
  } else {
    payload.uint8(0).uint8(0);
  }
  payload.uint16(value.pollingRate);
  payload.uint8(value.light);
  var hasHighCpi = false;
  value.cpiLevels.forEach(function(item: number) {
    if ((item & CPI_XY_MASK) != 0) {
      hasHighCpi = true;
    }
  });
  if (!hasHighCpi) {
    payload.uint8(value.cpiLevels.length);
    value.cpiLevels.forEach(function(item2: number) {
      payload.uint16(item2);
    });
  } else {
    payload.uint8(0);
  }
  payload.uint8(value.onboard).uint8(value.powerMode);
  if (isXyLinked) {
    payload.uint8(0).uint8(0).uint8(0).uint8(0);
  } else {
    payload.uint32(value.resolution);
  }
  if (hasHighCpi) {
    payload.uint8(value.cpiLevels.length);
    value.cpiLevels.forEach(function(item3: number) {
      payload.uint32(item3 >>> 0);
    });
  } else {
    payload.uint8(0);
  }
  payload.uint8(value.lod);
  payload.uint8(value.keyDelay.length);
  value.keyDelay.forEach(function(item4: number) {
    payload.uint8(item4);
  });
  payload.uint8(value.motionSync);
  payload.uint8(value.angleTuning);
  payload.uint8(value.angleSnapping);
  payload.uint8(value.rippleControl);
  payload.uint8(value.cpiLevelColors.length);
  value.cpiLevelColors.forEach(function(item5: number) {
    payload.uint8(item5 & 0x7);
  });
  payload.uint8(value.txOutputPower);
  payload.uint8(value.batteryLevels.length);
  value.batteryLevels.forEach(function(item6: number) {
    payload.uint16(item6);
  });
  payload.uint8(value.autoTxPower);
  payload.uint8(value.onboardStatus.length);
  value.onboardStatus.forEach(function(item7: number) {
    payload.uint8(item7);
  });
  payload.uint8(value.glassModeEnabled);
  send_event(client, crc_process(client, payload.build()));
  clearTimeout(DS.upload_mouse_config_timer);
  DS.upload_mouse_config_timer = setTimeout(upload_mouse_config_delayed, SYNC_TIMEOUT_MS, client, client.device_info != undefined && client.device_info.revision != undefined && client.device_info.revision.substr(0, 2) == 'G-' ? 1 : 0, value.sleepTime);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function send_event_mouse_key(client: any, arr: any[], actionType: any, keyCode: any, macroKey: any, mouseFlag: any) {
  var payload = PacketBuilder.begin(0x3).uint8(0).uint8(HID_ACTION_MOUSE_KEY);
  payload.uint8(arr.length);
  arr.forEach(function(item: any) { payload.uint8(item); });
  payload.uint8(actionType).uint8(macroKey).uint8(mouseFlag).uint8(keyCode).uint8(0);
  send_event(client, crc_process(client, payload.build()));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function send_event_mouse_function(client: any, arr: any[], actionType: any, functionCode: any, value: any, len: any) {
  var payload = PacketBuilder.begin(0x3).uint8(0).uint8(HID_ACTION_MOUSE_FUNCTION);
  payload.uint8(arr.length);
  arr.forEach(function(item: any) { payload.uint8(item); });
  payload.uint8(actionType).uint8(functionCode);
  payload.uint16(value);
  payload.uint8(0);
  payload.uint16(len.length);
  for (var offset = 0; offset < len.length; offset++) {
    payload.uint8(len.charCodeAt(offset));
  }
  send_event(client, crc_process(client, payload.build()));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function send_event_config_macro(client: any, arr: any[], type: any, index: any, total: any, len: any[], savedCount: any, data: number) {
  for (var offset = 0; offset < len.length; offset += data) {
    var payload = PacketBuilder.begin(0x3).uint8(0);
    payload.uint8(offset == 0 ? HID_ACTION_MACRO_FIRST : HID_ACTION_MACRO_CONT);
    payload.uint8(arr.length);
    arr.forEach(function(item: any) { payload.uint8(item); });
    payload.uint8(type).uint8(total);
    var chunkSize = len.length - offset >= data ? data : len.length - offset;
    payload.uint8(chunkSize);
    for (var idx = offset; idx < offset + data && idx < len.length; idx++) {
      var el: any = len[idx];
      payload.uint16(el.x).uint16(el.y).uint16(el.interval_time).uint16(el.continue_time);
      payload.uint8(el.style);
      if (el.style == 0) {
        payload.uint8(0);
      } else if (el.style == MACRO_RECORD_STYLE) {
        var offset2 = 0;
        var value2 = el.mouse_key_code;
        if (el.mouse_key_event == MOUSE_EVENT_MOVE) {
          offset2 = 2;
        } else if (el.mouse_key_event == MOUSE_EVENT_POSITION) {
          offset2 = 6;
        } else if (el.mouse_key_event == MOUSE_EVENT_WHEEL_VERT) {
          offset2 = 3;
        } else if (el.mouse_key_event == MOUSE_EVENT_WHEEL_HORZ) {
          offset2 = 5;
        } else {
          value2 = get_scan_code(el.mouse_key_code);
          if (value2 < KEYCODE_EXT_THRESHOLD) {
            offset2 = 0;
          } else if (value2 < KEYCODE_MEDIA_START) {
            offset2 = 1;
            value2 -= 0xff;
          } else {
            offset2 = 4;
            value2 -= KEYCODE_MEDIA_START;
          }
        }
        if (el.mouse_key_loop > 1) {
          payload.uint8(offset2 | 0x80);
          payload.uint16(el.mouse_key_loop);
        } else {
          payload.uint8(offset2);
        }
        if (offset2 == 2) {
          payload.uint24(value2 >>> 0);
        } else if (offset2 == 6) {
          payload.uint16(value2 >>> 16).uint16(value2 & 0xffff);
        } else if (offset2 == 3) {
          payload.uint8(value2 + 0x40);
        } else if (offset2 == 5) {
          payload.uint8(value2 + 0x40);
        } else {
          var value6 = 2;
          if (el.mouse_key_event == MOUSE_EVENT_KEY_DOWN) {
            value6 = 0;
          } else if (el.mouse_key_event == MOUSE_EVENT_KEY_UP) {
            value6 = 2;
          }
          payload.uint8(value2);
          payload.uint8(value6);
        }
        payload.uint16(el.mouse_key_time);
      }
    }
    payload.uint8(0);
    payload.uint8(savedCount);
    payload.uint8(idx);
    var value7 = offset / data;
    if (offset + data < len.length) {
      value7 |= 0x80;
    }
    payload.uint8(value7);
    send_event(client, crc_process(client, payload.build()));
    client.esb_alive_timeout += ESB_ALIVE_TIMEOUT_MS;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function send_event_gaming_only(client: any, enabled: any) {
  var payload = PacketBuilder.begin(0x3).uint8(0).uint8(HID_ACTION_GAMING_ONLY).uint8(enabled ? 1 : 0);
  send_event(client, crc_process(client, payload.build()));
  clearTimeout(DS.upload_mouse_config_timer);
  DS.upload_mouse_config_timer = setTimeout(upload_mouse_config_delayed, SYNC_TIMEOUT_MS, client, enabled ? 1 : 0, client.device_info.sleepTime);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function send_event_set_brightness(client: any, value: any) {
  var payload = PacketBuilder.begin(0x3).uint8(0).uint8(HID_ACTION_SET_BRIGHTNESS).uint8(value);
  send_event(client, crc_process(client, payload.build()));
  client.device_info.brightness = value;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function get_key_id_by_name(name: any, isFuzzy: any) {
  var payload: number[] = [];
  if (isFuzzy != undefined) {
    isFuzzy.split('+').forEach(item => {
      if (item == KEY_WHEEL_UP) {
        payload.push(KEY_WHEEL_UP_ID);
      } else if (item == KEY_WHEEL_DOWN) {
        payload.push(KEY_WHEEL_DOWN_ID);
      } else {
        get_keys(name).forEach((item2: any) => {
          if (item == item2.name) {
            item2.id.forEach((item3: number) => {
              payload.push(item3);
            });
          }
        });
      }
    });
  }
  return payload;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function write_mouse_param(client: any, item: any) {
  if (item.name.length == 0) {
    return;
  }
  var value = get_key_id_by_name(client, item.name);
  if (item.configType == CONFIG_TYPE_KEY) {
    if (item.touch_style == TOUCH_STYLE_KEY_MAP) {
      if (item.mouse_mapping_keys != "[0,0,0]") {
        var value2 = item.mouse_mapping_keys;
        var i: any;
        try {
          i = JSON.parse(value2);
        } catch (err) {
          i = undefined;
        }
        if (i != undefined) {
          var offset = 0;
          var offset2 = 0;
          var offset3 = 0;
          var offset4 = 0;
          if (i.length >= 3) {
            var firstByte = parseInt(i[0]);
            if (firstByte == VK_CODE_CTRL) {
              offset = get_scan_code(SCAN_CODE_CTRL);
            } else if (firstByte == VK_CODE_ALT) {
              offset = get_scan_code(SCAN_CODE_ALT);
            } else if (firstByte == VK_CODE_SHIFT) {
              offset = get_scan_code(SCAN_CODE_SHIFT);
            } else if (firstByte == SCAN_CODE_WIN) {
              offset = get_scan_code(SCAN_CODE_WIN);
            }
            firstByte = parseInt(i[1]);
            if (firstByte == VK_CODE_CTRL) {
              offset2 = get_scan_code(SCAN_CODE_CTRL);
            } else if (firstByte == VK_CODE_ALT) {
              offset2 = get_scan_code(SCAN_CODE_ALT);
            } else if (firstByte == VK_CODE_SHIFT) {
              offset2 = get_scan_code(SCAN_CODE_SHIFT);
            } else if (firstByte == SCAN_CODE_WIN) {
              offset2 = get_scan_code(SCAN_CODE_WIN);
            }
            firstByte = parseInt(i[2]);
            offset3 = get_scan_code(firstByte);
            if (offset3 < KEYCODE_EXT_THRESHOLD) {
              offset4 = 0;
            } else if (offset3 < KEYCODE_MEDIA_START) {
              offset4 = 1;
              offset3 -= 0xff;
            } else if (offset3 == MOUSE_WHEEL_UP) {
              offset4 = 3;
              offset3 = 0x40 + item.mouse_mapping_key_data;
            } else if (offset3 == MOUSE_WHEEL_DOWN) {
              offset4 = 3;
              offset3 = 0x40 - item.mouse_mapping_key_data;
            } else if (offset3 == MOUSE_WHEEL_LEFT) {
              offset4 = 5;
              offset3 = 0x40 - item.mouse_mapping_key_data;
            } else if (offset3 == MOUSE_WHEEL_RIGHT) {
              offset4 = 5;
              offset3 = 0x40 + item.mouse_mapping_key_data;
            } else {
              offset4 = 4;
              offset3 -= KEYCODE_MEDIA_START;
            }
            if (offset == 0 && offset2 == 0 && item.mouse_auto_click && offset4 != 3 && offset4 != 5) {
              var payload: any[] = [];
              var macroInfo = create_macro_info();
              macroInfo.style = MACRO_RECORD_STYLE;
              macroInfo.mouse_key_code = firstByte;
              macroInfo.mouse_key_event = MOUSE_EVENT_KEY_DOWN;
              macroInfo.mouse_key_time = item.mouse_auto_click_down;
              macroInfo.interval_time = item.mouse_auto_click_rand;
              macroInfo.name = get_key_name_from_code(firstByte);
              payload.push(macroInfo);
              macroInfo = create_macro_info();
              macroInfo.style = MACRO_RECORD_STYLE;
              macroInfo.mouse_key_code = firstByte;
              macroInfo.mouse_key_event = MOUSE_EVENT_KEY_UP;
              macroInfo.mouse_key_time = item.mouse_auto_click_up;
              macroInfo.interval_time = item.mouse_auto_click_rand;
              macroInfo.name = get_key_name_from_code(firstByte);
              payload.push(macroInfo);
              send_event_config_macro(client, value, 2, 0, 0, payload, 8, is_limit_memory(client) ? MACRO_CHUNK_LIMIT : MACRO_CHUNK_SIZE);
            } else {
              send_event_mouse_key(client, value, offset, offset2, offset4, offset3);
            }
          }
        }
      }
    } else if (item.touch_style == TOUCH_STYLE_FUNC_MAP) {
      if (item.mouse_mapping_function != 0) {
        if (item.mouse_mapping_function == FUNC_PRESS_CPI) {
          send_event_mouse_function(client, value, 2, item.mouse_mapping_function, Math.floor(item.mouse_mapping_function_data / get_cpi_step(client)), item.mouse_mapping_function_text);
          send_event_mouse_function(client, value, 3, item.mouse_mapping_function, 0, item.mouse_mapping_function_text);
        } else {
          send_event_mouse_function(client, value, 2, item.mouse_mapping_function, item.mouse_mapping_function_data, item.mouse_mapping_function_text);
        }
      }
    }
  } else if (item.configType == CONFIG_TYPE_MACRO) {
    if (item.macroKeys.length > 0) {
      var offset5 = 0;
      if (item.macro_style == MACRO_STYLE_PRESS) {
        offset5 = 0;
      } else if (item.macro_style == MACRO_STYLE_RELEASE) {
        offset5 = 1;
      } else if (item.macro_style == MACRO_STYLE_TOGGLE) {
        offset5 = 2;
      } else if (item.macro_style == MACRO_STYLE_LONG_PRESS) {
        offset5 = 3;
      } else if (item.macro_style == MACRO_STYLE_LONG_TOGGLE) {
        offset5 = 4;
      } else if (item.macro_style == MACRO_STYLE_LONG_RELEASE) {
        offset5 = 5;
      } else if (item.macro_style == MACRO_STYLE_TOGGLE_LOOP) {
        offset5 = 6;
      }
      send_event_config_macro(client, value, offset5, item.macro_toggleKey, item.macro_endKey, item.macroKeys, 0, is_limit_memory(client) ? MACRO_CHUNK_LIMIT : MACRO_CHUNK_SIZE);
    }
  }
}
