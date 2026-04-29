// ===== HID PROTOCOL HANDLER REGISTRY =========================================
// Each handler receives (client, byteLen, value2) where:
//   byteLen = client.recv_buf
//   value2 = total frame length (header + payload)
// Handlers parse the response and update state / dispatch UI actions.

var hidHandlers = {};

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
        clearTimeout(mouse_config_timer);
        mouse_config_timer = setTimeout(() => {
          mouse_config_timer = undefined;
          client.querying_more_result = false;
          window.postMessage({ 'action': 'action_onboard_cfg', 'usb_client_id': client.id, 'msg': "ERROR" });
        }, CONFIG_TIMEOUT_MS);
        window.postMessage({ 'action': 'action_onboard_cfg', 'usb_client_id': client.id, 'msg': "LOADING" });
      } else {
        window.postMessage({ 'action': ACTION_UI_REFRESH_SETTING });
        clearTimeout(mouse_config_timer);
        mouse_config_timer = undefined;
        client.querying_more_result = false;
        window.postMessage({ 'action': 'action_onboard_cfg', 'usb_client_id': client.id, 'msg': 'LOADED' });
      }
    } else {
      add_key_info(client, client.onboard_index, bytes);
      clearTimeout(mouse_config_timer);
      mouse_config_timer = setTimeout(() => {
        mouse_config_timer = undefined;
        client.querying_more_result = false;
        window.postMessage({ 'action': 'action_onboard_cfg', 'usb_client_id': client.id, 'msg': "ERROR" });
      }, CONFIG_TIMEOUT_MS);
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
