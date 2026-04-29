function hs_recv(client, data) {
  if (client.eplapsed_syncing_ms != 0x0 && new Date().getTime() - client.eplapsed_syncing_ms > 0x3e8) {
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
    hs_parse_cmd(client);
  }
}
async function hs_device_receive_data({
  device: device,
  reportId: reportId,
  data: data
}) {
  usb_client_list.forEach(item => {
    if (item.device == device && !item.virtual) {
      var bytes = new Uint8Array(data.buffer);
      hs_recv(item, bytes);
    }
  });
}
function read_event(client, data) {
  console.log("[DEBUG] read_event", "client=", client?.id, "size=", data, "send_event_buf.len=", client?.send_event_buf?.byteLength, "pause=", client?.pause);
  var bytes = new Uint8Array(data);
  if (client.pause) {
    bytes[0x0] = 0;
  } else {
    var value = client.send_event_buf.byteLength;
    if (value <= data - 0x1) {
      bytes[0x0] = 0x80 | value & 0xff;
      bytes.set(client.send_event_buf, 0x1);
      client.send_event_buf = new Uint8Array(0x0);
    } else {
      bytes[0x0] = 0x80 | data - 0x1 & 0xff;
      bytes.set(client.send_event_buf.subarray(0x0, data - 0x1), 0x1);
      client.send_event_buf = client.send_event_buf.subarray(data - 0x1);
    }
  }
  return bytes;
}
let timeoutID = {};
function post_send_client_data(item) {
  if (typeof timeoutID[item.id] === "number") {
    clearTimeout(timeoutID[item.id]);
  }
  timeoutID[item.id] = setTimeout(clientId => {
    window.postMessage({
      'action': ACTION_SEND_CLIENT_DATA,
      'usb_client_id': clientId
    });
  }, 0x19, item.id);
}
async function send_client_data(client) {
  console.log("[DEBUG] send_client_data", "client=", client?.id, "allow_send=", client?.allow_send, "virtual=", client?.virtual, "helloed=", client?.helloed, "connected=", client?.connected);
  if (is_hs_keyboard(client.device)) {
    hs_send_client_data(client);
    return;
  }
  try {
    if (client.allow_send) {
      var bytes;
      var i;
      var value = client.product_esb_ch;
      if (value == 0xff) {
        bytes = read_event(client, HID_REPORT_SIZE);
        i = bytes[0x0] & 0x3f;
      } else {
        bytes = read_event(client, 63.00000000000001);
        i = bytes[0x0] & 0x3f;
        var payload = Array.from(bytes);
        payload.unshift(0xc0 | value);
        while (payload.length < HID_REPORT_SIZE) {
          payload.push(0x0);
        }
        bytes = new Uint8Array(payload);
      }
      if (i > 0x0) {
        var _hexDebug = Array.from(bytes).slice(0,16).map(function(b) { return b.toString(16).padStart(2,'0'); }).join(' ');
        console.log("[HEX-ORIG] sendReport client=" + (client.id || '').substring(0,8) + " virtual=" + client.virtual + " esb_ch=" + client.product_esb_ch + " data_len=" + i + " hex=" + _hexDebug);
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
          while (payload.length < HID_REPORT_SIZE) {
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
    console.log("[DEBUG] send_client_data -> ERROR", err);
    log_r(err);
  }
}
// ===== CORE HID PROTOCOL: SEND / CRC / PARSE ================================
// These functions implement the RAWM USB HID protocol used for mice and
// receivers (non‑HS keyboards). The protocol frame format:
//   byte 0: length (top nibble) | flags (bottom nibble)
//   byte 1: length (low byte)
//   bytes 2+: payload
//   (optional CRC suffix when crcSupported is true)
//
// send_event() appends a data frame to the client's send buffer and triggers
// a delayed send via post_send_client_data().
//
// crc16_compute() calculates CRC‑16 over the payload.
// crc_process() wraps the payload with length prefix and optional CRC.
//
// parse_cmd() reads incoming data from the firmware — the main switch
// dispatches on the type field (byte 4 & 0xf):
//   0x2 — device info JSON (hello)
//   0xb — parameter responses (resolution, polling rate, LOD, battery…)
//   0xe — ping / squal / wireless quality
//   0x7 — sync request
// ============================================================================
function send_event(client, data) {
  var bytes = new Uint8Array(client.send_event_buf.byteLength + data.byteLength);
  bytes.set(client.send_event_buf);
  bytes.set(data, client.send_event_buf.byteLength);
  client.send_event_buf = bytes;
  post_send_client_data(client);
}

// CRC‑16 computation over a byte array (used in crc_process)
function crc16_compute(data, crc) {
  var value = 0xffff;
  for (var len = 0x0; len < crc; len++) {
    value = value >> 0x8 & 0xff | value << 0x8;
    value ^= data[len];
    value ^= (value & 0xff) >> 0x4;
    value ^= value << 0x8 << 0x4;
    value ^= (value & 0xff) << 0x4 << 0x1;
  }
  return value;
}
function crc_process(client, data) {
  var bytes = new Uint8Array(data);
  var value = bytes.byteLength;
  bytes[0x0] = (value >> 0x4 & 0xf0 | bytes[0x0]) & 0xff;
  bytes[0x1] = value & 0xff & 0xff;
  var _crcDebug = Array.from(bytes).slice(0,10).map(function(b) { return b.toString(16).padStart(2,'0'); }).join(' ');
  console.log("[CRC-ORIG] crc_process v=" + value + " crcSupported=" + (client.device_info != undefined && client.device_info.crcSupported) + " original[0]=" + (bytes[0x0].toString(16)) + " hex=" + _crcDebug);
  if (client.device_info != undefined && client.device_info.crcSupported) {
    var value2 = value + 0x5;
    var value3 = crc16_compute(bytes, value);
    var bytes2 = new Uint8Array(value2);
    bytes2[0x0] = (value2 >> 0x4 & 0xf0 | 0x3) & 0xff;
    bytes2[0x1] = value2 & 0xff & 0xff;
    bytes2[0x2] = 0x24;
    bytes2[0x3] = value3 & 0xff;
    bytes2[0x4] = value3 >> 0x8 & 0xff;
    bytes2.set(bytes, 0x5);
    return bytes2;
  }
  return bytes;
}
function send_event_query(client) {
  if (is_hs_keyboard(client.device)) {
    hs_get_firmware_version(client);
    return;
  }
  var payload = [];
  payload.push(HID_QUERY);
  payload.push(0x0);
  payload.push(HID_PARAM_CMD);
  payload.push(0x0);
  payload.push(0x0);
  var timestamp = parseInt(new Date().getTime() / 0x3e8);
  payload.push(timestamp & 0xff);
  timestamp = timestamp / 0x100;
  payload.push(timestamp & 0xff);
  timestamp = timestamp / 0x100;
  payload.push(timestamp & 0xff);
  timestamp = timestamp / 0x100;
  payload.push(timestamp & 0xff);
  timestamp = timestamp / 0x100;
  payload.push(timestamp & 0xff);
  timestamp = timestamp / 0x100;
  payload.push(timestamp & 0xff);
  timestamp = timestamp / 0x100;
  payload.push(timestamp & 0xff);
  timestamp = timestamp / 0x100;
  payload.push(timestamp & 0xff);
  timestamp = timestamp / 0x100;
  send_event(client, crc_process(client, payload));
  client.last_query_time = new Date().getTime();
  if (!is_receiver(client)) {
    client.querying_more_result = true;
  }
}
function send_event_action(client, action, value) {
  console.log("[DEBUG] send_event_action", "client=", client?.id, "action=", action, "value=", value, "helloed=", client?.helloed, "connected=", client?.connected);
  console.log("[TRACE-ORIG] send_event_action client=" + (client?.id || '').substring(0,8) + " action=" + action + " value=" + value);
  var payload = [];
  payload.push(HID_ACTION_CMD);
  payload.push(0x0);
  payload.push(action);
  payload.push(value & 0xff);
  payload.push(value >> 0x8 & 0xff);
  payload.push(value >> 0x10 & 0xff);
  payload.push(value >> 0x18 & 0xff);
  send_event(client, crc_process(client, payload));
  if (action == CMD_QUERY_MORE_RESULT && value == 0x0 && !is_receiver(client)) {
    client.querying_more_result = true;
    client.last_query_time = new Date().getTime();
  }
}
function send_event_ping(client, pingIndex, isPingAll = true) {
  if (client != undefined ? is_hs_keyboard(client.device) : false) {
    return;
  }
  var payload = [];
  payload.push(HID_PING_CMD);
  payload.push(0x0);
  payload.push(pingIndex ? 0x1 : 0x0);
  if (isPingAll) {
    const encodedSync = new TextEncoder().encode(SYNC_DATA);
    payload.push(encodedSync);
  }
  send_event(client, crc_process(client, payload));
}
function send_event_select_esb_addr(client, value) {
  var payload = [];
  payload.push(0x3);
  payload.push(0x0);
  payload.push(HID_ACTION_SELECT_ESB_ADDR);
  for (var len = 0x0; len < value.length; len += 0x2) {
    payload.push(parseInt(value.substr(len, 0x2), 0x10) & 0xff);
  }
  send_event(client, crc_process(client, payload));
}
function send_event_clear_esb_addr(client, value) {
  var payload = [];
  payload.push(0x3);
  payload.push(0x0);
  payload.push(HID_ACTION_CLEAR_ESB_ADDR);
  for (var len = 0x0; len < value.length; len += 0x2) {
    payload.push(parseInt(value.substr(len, 0x2), 0x10) & 0xff);
  }
  send_event(client, crc_process(client, payload));
}
function send_event_set_esb_addr(client, value, addrType, addr) {
  var payload = [];
  payload.push(0x3);
  payload.push(0x0);
  payload.push(HID_ACTION_SET_ESB_ADDR);
  for (var len = 0x0; len < value.length; len += 0x2) {
    payload.push(parseInt(value.substr(len, 0x2), 0x10) & 0xff);
  }
  payload.push(addrType);
  payload.push(addr ? 0x1 : 0x0);
  send_event(client, crc_process(client, payload));
}
function send_event_sync(client) {
  var payload = [];
  payload.push(HID_SYNC_CMD);
  payload.push(0x0);
  send_event(client, crc_process(client, payload));
}
function send_event_set_color_code(client, value) {
  var payload = [];
  payload.push(0x3);
  payload.push(0x0);
  payload.push(HID_ACTION_SET_COLOR_CODE);
  var byteLen = new TextEncoder().encode(value);
  for (var len = 0x0; len < byteLen.byteLength && len < 0x10; len++) {
    payload.push(byteLen[len]);
  }
  for (var len = byteLen.byteLength; len < 0x10; len++) {
    payload.push(0x0);
  }
  send_event(client, crc_process(client, payload));
}
function send_event_set_sleep_time(client, value) {
  if (client.device_info.sleepTime != value) {
    client.device_info.sleepTime = value;
    var payload = [];
    payload.push(0x3);
    payload.push(0x0);
    payload.push(HID_ACTION_SET_SLEEP_TIME);
    payload.push(value & 0xff);
    payload.push(value >> 0x8 & 0xff);
    send_event(client, crc_process(client, payload));
    clearTimeout(upload_mouse_config_timer);
    upload_mouse_config_timer = setTimeout(upload_mouse_config_delayed, SYNC_TIMEOUT_MS, client, client.device_info != undefined && client.device_info.revision != undefined && client.device_info.revision.substr(0x0, 0x2) == 'G-' ? 0x1 : 0x0, value);
  }
}
function send_event_set_rf_channel(client, value) {
  var payload = [];
  payload.push(0x3);
  payload.push(0x0);
  payload.push(HID_ACTION_SET_RF_CHANNEL);
  payload.push(value);
  send_event(client, crc_process(client, payload));
  client.device_info.rfChannel = value;
}
function send_event_set_auto_hop(client, value) {
  var payload = [];
  payload.push(0x3);
  payload.push(0x0);
  payload.push(HID_ACTION_SET_AUTO_HOP);
  payload.push(value ? 0x1 : 0x0);
  send_event(client, crc_process(client, payload));
  client.device_info.hopChannel = value;
}
function send_event_mouse_param(client) {
  var value = client.device_info;
  var payload = [];
  payload.push(0x3);
  payload.push(0x0);
  payload.push(HID_ACTION_MOUSE_PARAM);
  if ((value.resolution & 0xffff0000) == 0x0) {
    payload.push(value.resolution & 0xff);
    payload.push(value.resolution >> 0x8 & 0xff);
  } else {
    payload.push(0x0);
    payload.push(0x0);
  }
  payload.push(value.pollingRate & 0xff);
  payload.push(value.pollingRate >> 0x8 & 0xff);
  payload.push(value.light);
  var flag = false;
  value.cpiLevels.forEach(item => {
    if ((item & 0xffff0000) != 0x0) {
      flag = true;
    }
  });
  if (flag) {
    payload.push(0x0);
  } else {
    payload.push(value.cpiLevels.length);
    value.cpiLevels.forEach(item2 => {
      payload.push(item2 & 0xff);
      payload.push(item2 >> 0x8 & 0xff);
    });
  }
  payload.push(value.onboard);
  payload.push(value.powerMode);
  if ((value.resolution & 0xffff0000) == 0x0) {
    payload.push(0x0);
    payload.push(0x0);
    payload.push(0x0);
    payload.push(0x0);
  } else {
    payload.push(value.resolution & 0xff);
    payload.push(value.resolution >> 0x8 & 0xff);
    payload.push(value.resolution >> 0x10 & 0xff);
    payload.push(value.resolution >> 0x18 & 0xff);
  }
  if (!flag) {
    payload.push(0x0);
  } else {
    payload.push(value.cpiLevels.length);
    value.cpiLevels.forEach(item3 => {
      payload.push(item3 & 0xff);
      payload.push(item3 >> 0x8 & 0xff);
      payload.push(item3 >> 0x10 & 0xff);
      payload.push(item3 >> 0x18 & 0xff);
    });
  }
  payload.push(value.lod);
  payload.push(value.keyDelay.length);
  value.keyDelay.forEach(item4 => {
    payload.push(item4);
  });
  payload.push(value.motionSync);
  payload.push(value.angleTuning);
  payload.push(value.angleSnapping);
  payload.push(value.rippleControl);
  payload.push(value.cpiLevelColors.length);
  value.cpiLevelColors.forEach(item5 => {
    payload.push(item5 & 0x7);
  });
  payload.push(value.txOutputPower);
  payload.push(value.batteryLevels.length);
  value.batteryLevels.forEach(item6 => {
    payload.push(item6 & 0xff);
    payload.push(item6 >> 0x8 & 0xff);
  });
  payload.push(value.autoTxPower);
  payload.push(value.onboardStatus.length);
  value.onboardStatus.forEach(item7 => {
    payload.push(item7);
  });
  payload.push(value.glassModeEnabled);
  send_event(client, crc_process(client, payload));
  clearTimeout(upload_mouse_config_timer);
  upload_mouse_config_timer = setTimeout(upload_mouse_config_delayed, SYNC_TIMEOUT_MS, client, client.device_info != undefined && client.device_info.revision != undefined && client.device_info.revision.substr(0x0, 0x2) == 'G-' ? 0x1 : 0x0, value.sleepTime);
}
function send_event_mouse_key(client, arr, actionType, keyCode, macroKey, mouseFlag) {
  var payload = [];
  payload.push(0x3);
  payload.push(0x0);
  payload.push(HID_ACTION_MOUSE_KEY);
  payload.push(arr.length);
  arr.forEach(item => {
    payload.push(item);
  });
  payload.push(actionType);
  payload.push(macroKey);
  payload.push(mouseFlag);
  payload.push(keyCode);
  payload.push(0x0);
  send_event(client, crc_process(client, payload));
}
function send_event_mouse_function(client, arr, actionType, functionCode, value, len) {
  var payload = [];
  payload.push(0x3);
  payload.push(0x0);
  payload.push(HID_ACTION_MOUSE_FUNCTION);
  payload.push(arr.length);
  arr.forEach(item => {
    payload.push(item);
  });
  payload.push(actionType);
  payload.push(functionCode);
  payload.push(value & 0xff);
  payload.push(value >> 0x8 & 0xff);
  payload.push(0x0);
  payload.push(len.length & 0xff);
  payload.push(len.length >> 0x8 & 0xff);
  for (var offset = 0x0; offset < len.length; offset++) {
    payload.push(len.charCodeAt(offset));
  }
  send_event(client, crc_process(client, payload));
}
function send_event_config_macro(client, arr, type, index, total, len, savedCount, data) {
  for (var offset = 0x0; offset < len.length; offset += data) {
    var payload = [];
    payload.push(0x3);
    payload.push(0x0);
    payload.push(offset == 0x0 ? 0x5 : 0x2b);
    payload.push(arr.length);
    arr.forEach(item => {
      payload.push(item);
    });
    payload.push(type);
    payload.push(total);
    payload.push(len.length - offset >= data ? data : len.length - offset);
    for (var index = offset; index < offset + data && index < len.length; index++) {
      var el = len[index];
      payload.push(el.x & 0xff);
      payload.push(el.x >> 0x8 & 0xff);
      payload.push(el.y & 0xff);
      payload.push(el.y >> 0x8 & 0xff);
      payload.push(el.interval_time & 0xff);
      payload.push(el.interval_time >> 0x8 & 0xff);
      payload.push(el.continue_time & 0xff);
      payload.push(el.continue_time >> 0x8 & 0xff);
      payload.push(el.style);
      if (el.style == 0x0) {
        payload.push(0x0);
      } else {
        if (el.style == MACRO_RECORD_STYLE) {
          var offset2 = 0x0;
          var value = el.mouse_key_code;
          if (el.mouse_key_event == MOUSE_EVENT_MOVE) {
            offset2 = 0x2;
          } else {
            if (el.mouse_key_event == MOUSE_EVENT_POSITION) {
              offset2 = 0x6;
            } else {
              if (el.mouse_key_event == MOUSE_EVENT_WHEEL_VERT) {
                offset2 = 0x3;
              } else {
                if (el.mouse_key_event == MOUSE_EVENT_WHEEL_HORZ) {
                  offset2 = 0x5;
                } else {
                  value = get_scan_code(el.mouse_key_code);
                  if (value < KEYCODE_EXT_THRESHOLD) {
                    offset2 = 0x0;
                  } else if (value < KEYCODE_MEDIA_START) {
                    offset2 = 0x1;
                    value -= 0xff;
                  } else {
                    offset2 = 0x4;
                    value -= 0x200;
                  }
                }
              }
            }
          }
          if (el.mouse_key_loop > 0x1) {
            payload.push(offset2 | 0x80);
          } else {
            payload.push(offset2);
          }
          if (el.mouse_key_loop > 0x1) {
            payload.push(el.mouse_key_loop & 0xff);
            payload.push(el.mouse_key_loop >> 0x8 & 0xff);
          }
          if (offset2 == 0x2) {
            var value2 = value >> 0x10 & 0xffff;
            var value3 = value & 0xffff;
            payload.push(value2 & 0xff);
            payload.push((value2 >> 0x8 & 0xf | value3 >> 0x4 & 0xf0) & 0xff);
            payload.push(value3 & 0xff);
          } else {
            if (offset2 == 0x6) {
              var value4 = value >> 0x10 & 0xffff;
              var value5 = value & 0xffff;
              payload.push(value4 & 0xff);
              payload.push(value4 >> 0x8 & 0xff);
              payload.push(value5 & 0xff);
              payload.push(value5 >> 0x8 & 0xff);
            } else {
              if (offset2 == 0x3) {
                payload.push(value + 0x40);
              } else {
                if (offset2 == 0x5) {
                  payload.push(value + 0x40);
                } else {
                  var value6 = 0x2;
                  if (el.mouse_key_event == MOUSE_EVENT_KEY_DOWN) {
                    value6 = 0x0;
                  } else if (el.mouse_key_event == MOUSE_EVENT_KEY_UP) {
                    value6 = 0x2;
                  }
                  payload.push(value);
                  payload.push(value6);
                }
              }
            }
          }
          payload.push(el.mouse_key_time & 0xff);
          payload.push(el.mouse_key_time >> 0x8 & 0xff);
        }
      }
    }
    payload.push(0x0);
    payload.push(savedCount);
    payload.push(index);
    var value7 = offset / data;
    if (offset + data < len.length) {
      value7 |= 0x80;
    }
    payload.push(value7);
    send_event(client, crc_process(client, payload));
    client.esb_alive_timeout += ESB_ALIVE_TIMEOUT_MS;
  }
}
function send_event_gaming_only(client, enabled) {
  var payload = [];
  payload.push(0x3);
  payload.push(0x0);
  payload.push(HID_ACTION_GAMING_ONLY);
  payload.push(enabled ? 0x1 : 0x0);
  send_event(client, crc_process(client, payload));
  clearTimeout(upload_mouse_config_timer);
  upload_mouse_config_timer = setTimeout(upload_mouse_config_delayed, SYNC_TIMEOUT_MS, client, enabled ? 0x1 : 0x0, client.device_info.sleepTime);
}
function send_event_set_brightness(client, value) {
  var payload = [];
  payload.push(0x3);
  payload.push(0x0);
  payload.push(HID_ACTION_SET_BRIGHTNESS);
  payload.push(value);
  send_event(client, crc_process(client, payload));
  client.device_info.brightness = value;
}
function get_key_id_by_name(name, isFuzzy) {
  var payload = [];
  if (isFuzzy != undefined) {
    isFuzzy.split('+').forEach(item => {
      if (item == KEY_WHEEL_UP) {
        payload.push(KEY_WHEEL_UP_ID);
      } else if (item == KEY_WHEEL_DOWN) {
        payload.push(KEY_WHEEL_DOWN_ID);
      } else {
        get_keys(name).forEach(item2 => {
          if (item == item2.name) {
            item2.id.forEach(item3 => {
              payload.push(item3);
            });
          }
        });
      }
    });
  }
  return payload;
}
function write_mouse_param(client, item) {
  if (item.name.length == 0x0) {
    return;
  }
  var value = get_key_id_by_name(client, item.name);
  if (item.configType == CONFIG_TYPE_KEY) {
    if (item.touch_style == TOUCH_STYLE_KEY_MAP) {
      if (item.mouse_mapping_keys != "[0,0,0]") {
        var value2 = item.mouse_mapping_keys;
        var i;
        try {
          i = JSON.parse(value2);
        } catch (err) {
          i = undefined;
        }
        if (i != undefined) {
          var offset = 0x0;
          var offset2 = 0x0;
          var offset3 = 0x0;
          var offset4 = 0x0;
          if (i.length >= 0x3) {
            var firstByte = parseInt(i[0x0]);
            if (firstByte == VK_CODE_CTRL) {
              offset = get_scan_code(SCAN_CODE_CTRL);
            } else {
              if (firstByte == VK_CODE_ALT) {
                offset = get_scan_code(SCAN_CODE_ALT);
              } else {
                if (firstByte == VK_CODE_SHIFT) {
                  offset = get_scan_code(SCAN_CODE_SHIFT);
                } else if (firstByte == SCAN_CODE_WIN) {
                  offset = get_scan_code(SCAN_CODE_WIN);
                }
              }
            }
            firstByte = parseInt(i[0x1]);
            if (firstByte == VK_CODE_CTRL) {
              offset2 = get_scan_code(SCAN_CODE_CTRL);
            } else {
              if (firstByte == VK_CODE_ALT) {
                offset2 = get_scan_code(SCAN_CODE_ALT);
              } else {
                if (firstByte == VK_CODE_SHIFT) {
                  offset2 = get_scan_code(SCAN_CODE_SHIFT);
                } else if (firstByte == SCAN_CODE_WIN) {
                  offset2 = get_scan_code(SCAN_CODE_WIN);
                }
              }
            }
            firstByte = parseInt(i[0x2]);
            offset3 = get_scan_code(firstByte);
            if (offset3 < KEYCODE_EXT_THRESHOLD) {
              offset4 = 0x0;
            } else {
              if (offset3 < KEYCODE_MEDIA_START) {
                offset4 = 0x1;
                offset3 -= 0xff;
              } else {
                if (offset3 == MOUSE_WHEEL_UP) {
                  offset4 = 0x3;
                  offset3 = 0x40 + item.mouse_mapping_key_data;
                } else {
                  if (offset3 == MOUSE_WHEEL_DOWN) {
                    offset4 = 0x3;
                    offset3 = 0x40 - item.mouse_mapping_key_data;
                  } else {
                    if (offset3 == MOUSE_WHEEL_LEFT) {
                      offset4 = 0x5;
                      offset3 = 0x40 - item.mouse_mapping_key_data;
                    } else if (offset3 == MOUSE_WHEEL_RIGHT) {
                      offset4 = 0x5;
                      offset3 = 0x40 + item.mouse_mapping_key_data;
                    } else {
                      offset4 = 0x4;
                      offset3 -= 0x200;
                    }
                  }
                }
              }
            }
            if (offset == 0x0 && offset2 == 0x0 && item.mouse_auto_click && offset4 != 0x3 && offset4 != 0x5) {
              var payload = [];
              var macroInfo = create_macro_info();
              macroInfo.style = 0x16;
              macroInfo.mouse_key_code = firstByte;
              macroInfo.mouse_key_event = 0x100;
              macroInfo.mouse_key_time = item.mouse_auto_click_down;
              macroInfo.interval_time = item.mouse_auto_click_rand;
              macroInfo.name = get_key_name_from_code(firstByte);
              payload.push(macroInfo);
              macroInfo = create_macro_info();
              macroInfo.style = 0x16;
              macroInfo.mouse_key_code = firstByte;
              macroInfo.mouse_key_event = 0x101;
              macroInfo.mouse_key_time = item.mouse_auto_click_up;
              macroInfo.interval_time = item.mouse_auto_click_rand;
              macroInfo.name = get_key_name_from_code(firstByte);
              payload.push(macroInfo);
              send_event_config_macro(client, value, 0x2, 0x0, 0x0, payload, 8, is_limit_memory(client) ? MACRO_CHUNK_LIMIT : MACRO_CHUNK_SIZE);
            } else {
              send_event_mouse_key(client, value, offset, offset2, offset4, offset3);
            }
          }
        }
      }
    } else if (item.touch_style == TOUCH_STYLE_FUNC_MAP) {
      if (item.mouse_mapping_function != 0x0) {
        if (item.mouse_mapping_function == 0x9) {
          send_event_mouse_function(client, value, 0x2, item.mouse_mapping_function, parseInt(item.mouse_mapping_function_data / get_cpi_step(client)), item.mouse_mapping_function_text);
          send_event_mouse_function(client, value, 0x3, item.mouse_mapping_function, 0x0, item.mouse_mapping_function_text);
        } else {
          send_event_mouse_function(client, value, 0x2, item.mouse_mapping_function, item.mouse_mapping_function_data, item.mouse_mapping_function_text);
        }
      }
    }
  } else {
    if (item.configType == CONFIG_TYPE_MACRO) {
      if (item.macroKeys.length > 0x0) {
        var offset5 = 0x0;
        if (item.macro_style == MACRO_STYLE_PRESS) {
          offset5 = 0x0;
        } else {
          if (item.macro_style == MACRO_STYLE_RELEASE) {
            offset5 = 0x1;
          } else {
            if (item.macro_style == MACRO_STYLE_TOGGLE) {
              offset5 = 0x2;
            } else {
              if (item.macro_style == MACRO_STYLE_LONG_PRESS) {
                offset5 = 0x3;
              } else {
                if (item.macro_style == MACRO_STYLE_LONG_TOGGLE) {
                  offset5 = 0x4;
                } else {
                  if (item.macro_style == MACRO_STYLE_LONG_RELEASE) {
                    offset5 = 0x5;
                  } else if (item.macro_style == MACRO_STYLE_TOGGLE_LOOP) {
                    offset5 = 0x6;
                  }
                }
              }
            }
          }
        }
        send_event_config_macro(client, value, offset5, item.macro_toggleKey, item.macro_endKey, item.macroKeys, 0x0, is_limit_memory(client) ? MACRO_CHUNK_LIMIT : MACRO_CHUNK_SIZE);
      }
    }
  }
}
