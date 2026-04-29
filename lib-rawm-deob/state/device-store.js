// ===== DEVICE STATE STORE ====================================================
// Reactive state store that centralises device management. Replaces the global
// mutable state (usb_client_list, current_usb_client, postMessage dispatch)
// with a unified event emitter + data model.
//
// Also contains the device info model and all its helper functions (migrated
// from 03-device-info.js).
// ============================================================================

// ===== ACTION CONSTANTS ======================================================
const SYNC_DATA = "SYNC!@#$%^";
const ACTION_REFRESH_CLIENT_LIST = "action_refresh_client_list";
const ACTION_UI_REFRESH_CLIENT_LIST = "action_ui_refresh_client_list";
const ACTION_REFRESH_CURRENT_CLIENT = "action_refresh_current_client";
const ACTION_UI_REFRESH_CURRENT_CLIENT = "action_ui_refresh_current_client";
const ACTION_UI_REFRESH_CURRENT_CLIENT_RSSI = "action_ui_refresh_current_client_rssi";
const ACTION_UI_REFRESH_SETTING = "action_ui_refresh_setting";
const ACTION_UI_REFRESH_QUAL = "action_ui_refresh_qual";
const ACTION_SEND_CLIENT_DATA = "action_send_client_data";
const ACTION_UI_REFRESH_KBD_KEY = "action_ui_refresh_kbd_key";
const ACTION_UI_REFRESH_KBD_AXIS = "action_ui_refresh_kbd_axis";
const ACTION_UI_REFRESH_KBD_LIGHT = "action_ui_refresh_kbd_light";
const ACTION_UI_REFRESH_KBD_MACRO = "action_ui_refresh_kbd_macro";
const RESOURCE_URL = "https://hub.miracletek.net/hub/";

let upload_mouse_config_timer;
let mouse_config_timer;

function basic_info(productId) {
  return "?os=4" + "&v=" + API_VERSION + "&c=" + productId + "&a=" + "pc-rawmhub.game" + '&ta=' + "pc-rawmhub.game" + '&mac=' + (layui.device('os').os.toLowerCase() == "mac" ? 0x1 : 0x0);
}

// ===== BACKWARD-COMPATIBLE GLOBALS ==========================================
// These will be removed in a later phase once all UI files are migrated.
// _deviceClients is the backing array. DeviceStore.clients and usb_client_list
// both reference it, so mutations via either name stay in sync.
var _deviceClients = [];
var usb_client_list = _deviceClients;
var current_usb_client = null;

// ===== REACTIVE STATE STORE =================================================
const DeviceStore = {
  get clients() { return _deviceClients; },
  set clients(v) { _deviceClients = v; usb_client_list = v; },

  currentId: null,

  get current() {
    if (this.currentId == null) return null;
    return _deviceClients.find(c => c.id === this.currentId) || null;
  },

  getClient(id) {
    return _deviceClients.find(c => c.id === id) || null;
  },

  getDeviceInfo(client) {
    return client ? client.device_info : null;
  },

  addClient(hidDevice, value, virtual) {
    var client = create_usb_client(hidDevice, value, virtual);
    _deviceClients.push(client);
    this._emit('client:added', client);
    return client;
  },

  removeClient(id) {
    var idx = _deviceClients.findIndex(c => c.id === id);
    if (idx >= 0) {
      var client = _deviceClients[idx];
      _deviceClients.splice(idx, 1);
      if (this.currentId === id) {
        this.currentId = null;
        current_usb_client = null;
      }
      this._emit('client:removed', client);
    }
  },

  selectClient(id) {
    var client = this.getClient(id);
    if (client) {
      this.currentId = id;
      current_usb_client = client;
      this._emit('current:changed', client);
    }
  },

  updateDeviceInfo(id, patch) {
    var client = this.getClient(id);
    if (client) {
      Object.assign(client.device_info, patch);
      this._emit('device:updated', client);
    }
  },

  _handlers: {},

  on(event, handler) {
    (this._handlers[event] = this._handlers[event] || []).push(handler);
  },

  off(event, handler) {
    var list = this._handlers[event];
    if (list) {
      var idx = list.indexOf(handler);
      if (idx >= 0) list.splice(idx, 1);
    }
  },

  _emit(event, data) {
    var list = this._handlers[event];
    if (list) {
      list.slice().forEach(fn => fn(data));
    }
  }
};

// ===== DEVICE INFO MODEL ====================================================
function create_device_info() {
  var info = {};
  return reset_device_info(info);
}

function reset_device_cfg(arr) {
  arr.forEach(item => {
    if (item.light_colors == undefined) {
      item.light_colors = [];
      item.light_colors.push("red");
      item.light_colors.push('green');
      item.light_colors.push('blue');
    }
    if (item.polling_rate_max == undefined) {
      item.polling_rate_max = POLLING_RATE_MAX_HZ;
    }
    if (item.angle_tuning == undefined) {
      item.angle_tuning = true;
    }
    if (item.lod == undefined) {
      item.lod = [];
      item.lod.push(0x1);
      item.lod.push(0x2);
    }
    if (item.glass_mode == undefined) {
      item.glass_mode = false;
    }
    if (item.oms == undefined) {
      item.oms = [];
    }
    if (item.hub == undefined) {
      item.hub = false;
    }
    if (item.rf_chn == undefined) {
      item.rf_chn = 0xff;
    }
    if (item.limit_memory == undefined) {
      item.limit_memory = false;
    }
    if (item.slow == undefined) {
      item.slow = true;
    }
  });
}

function reset_device_info(device) {
  device.revision = '';
  device.revisionCode = 0x0;
  device.hardwareCode = 0x0;
  device.battery = BATTERY_FULL_PERCENT;
  device.configNum = -0x1;
  device.resolution = RESOLUTION_DEFAULT;
  device.pollingRate = -0x1;
  device.light = 48;
  device.cpiLevels = [0x190, 0x320, 0x640, 0xc80, 0x0, 0x0, 0x0, 0x0];
  device.cpiLevelColors = [1, 2, 6, 4, 0x0, 0x0, 0x0, 0x0];
  device.assist = [];
  device.macAddress = '';
  device.onboard = 0x0;
  device.powerMode = POWER_MODE_DEFAULT;
  device.esbAddress = '';
  device.esbChannel = 0xff;
  device.deviceName = '';
  device.productId = 0xffff;
  device.vendorId = 0x0;
  device.lod = 0x1;
  device.lodCalib = 0x0;
  device.keyDelay = [KEY_DELAY_DEFAULT, KEY_DELAY_DEFAULT, KEY_DELAY_DEFAULT, KEY_DELAY_DEFAULT, KEY_DELAY_DEFAULT, KEY_DELAY_DEFAULT, KEY_DELAY_DEFAULT];
  device.motionSync = 0x1;
  device.angleTuning = 0x0;
  device.angleSnapping = 0x0;
  device.rippleControl = 0x0;
  device.charging = 0x0;
  device.txOutputPower = 0xff;
  device.autoTxPower = 0x1;
  device.sleepTime = SLEEP_DEFAULT_SEC;
  device.allKeyConfigs = [];
  device.peerInfo = [];
  device.batteryLevels = [0x1004, 0xfa0, 0xf6e, 0xf3c, 0xf0a, 0xed8, 0xea6, 0xe74, 0xdac, 0xce4, 0xc1c];
  device.colorCode = '';
  device["lzSupported;"] = false;
  device.rfChannel = 0x2;
  device.rssi = 0x0;
  device.crcSupported = false;
  device.luaStatus = 0xff;
  device.noack = 0x0;
  device.glassMode = 0x0;
  device.glassModeEnabled = 0x0;
  device.onboardConfigNum = 0x1;
  device.onboardIndex = 0x0;
  device.onboardStatus = [129, 130, 134, 132];
  device.firmwareInfo = {};
  device.squal = 0x0;
  device.equal = 0xff;
  device.txOutputPowerApplied = 0xff;
  device.enhancedCpi = false;
  device.dynamicGOM = false;
  device.wired = false;
  device.sensor = '';
  device.brightness = BRIGHTNESS_DEFAULT;
  device.hopChannelSupported = false;
  device.hopChannel = true;
  device.slow = true;
  device.kbd_onboardNum = KBD_DEFAULT_ONBOARD_NUM;
  device.kbd_key_infos = [];
  device.kbd_socd_num = 0x0;
  device.kbd_socd_infos = [];
  device.kbd_mt_num = 0x0;
  device.kbd_mt_infos = [];
  device.kbd_rs_num = 0x0;
  device.kbd_rs_infos = [];
  device.kbd_dks_num = 0x0;
  device.kbd_dks_infos = [];
  device.kbd_light_info = {};
  device.kbd_axis_mode = 0x0;
  device.kbd_axis_infos = [];
  device.kbd_macro_num = 0x0;
  device.kbd_macro_max_size = 0x0;
  device.kbd_macro_infos = [];
  return device;
}

function reset_device_info_esb(client) {
  client.esbAddressArr = [];
  client.esbSelected = -0x1;
  return client;
}

function create_usb_client(hidDevice, value, virtual) {
  var client = {
    device: hidDevice,
    product_esb_ch: value,
    recv_buf: new Uint8Array(0x0),
    send_event_buf: new Uint8Array(0x0),
    helloed: false,
    connected: false,
    device_name: '',
    virtual: virtual,
    device_info: create_device_info(),
    esb_last_alive_time: new Date().getTime(),
    esb_alive_timeout: ESB_ALIVE_TIMEOUT_MS,
    pause: false,
    syncing: false,
    id: crypto.randomUUID(),
    allow_send: true,
    eplapsed_syncing_ms: 0x0,
    last_query_time: 0x0,
    onboard_index: 0x0,
    querying_more_result: false
  };
  return client;
}

function is_supported(productId) {
  var flag = false;
  device_cfg.forEach(item => {
    if (item.product_id == productId.toString(0x10)) {
      flag = true;
    }
  });
  return flag;
}

function get_cfg(client) {
  var revision = undefined;
  if (client.virtual) {
    device_cfg.forEach(item => {
      if (item.name == client.device_name) {
        revision = item;
      }
    });
  } else {
    device_cfg.forEach(item2 => {
      if (item2.product_id == client.device.productId.toString(0x10)) {
        revision = item2;
      }
    });
  }
  return revision;
}

function is_receiver(device) {
  var value = get_cfg(device);
  return value != undefined ? value.receiver : false;
}

function is_slow_receiver(client) {
  if (!client.device_info.slow) {
    return client.device_info.slow;
  } else {
    var value = get_cfg(client);
    return value != undefined ? value.slow : true;
  }
}

function is_hub(device) {
  var value = get_cfg(device);
  return value != undefined ? value.hub : false;
}

function is_keyboard(client) {
  return client != undefined ? is_hs_keyboard(client.device) : false;
}

function is_keyboard_device(device) {
  var value = get_cfg(device);
  return value != undefined ? value.keyboard : false;
}

function is_connected(client) {
  return client.connected != undefined ? client.connected : false;
}

function get_display_name(client) {
  var value = get_cfg(client);
  return value != undefined ? value.display_name : client.device_name;
}

function get_display_name_model(client) {
  var value = get_cfg(client);
  return value != undefined && value.display_name_model != undefined ? value.display_name_model : '';
}

function get_product_id_hex_str(client) {
  var str = '';
  if (client.virtual) {
    device_cfg.forEach(item => {
      if (item.name == client.device_name) {
        str = item.product_id;
      }
    });
  } else {
    str = client.device.productId.toString(0x10);
  }
  return str;
}

function is_battery_percent_supported(client) {
  var value = get_cfg(client);
  if (value != undefined) {
    var flag = false;
    value.battery_levels.forEach(item => {
      if (item != 0x0) {
        flag = true;
      }
    });
    return flag;
  } else {
    return false;
  }
}

function get_esb_addr(esbAddr, index) {
  if (index == 0xff || esbAddr.esbAddress.length == 0x0) {
    return esbAddr.esbAddress;
  } else {
    var i;
    var idx;
    i = esbAddr.esbAddress.substr(16, 2);
    if (index == 0x0) {
      idx = esbAddr.esbAddress.substr(0x0, 8);
    } else {
      idx = esbAddr.esbAddress.substr(8, 8);
    }
    return i + idx;
  }
}

function is_esb_addr_arr_existed(esbAddr, addr, length) {
  var flag = false;
  if (esbAddr.esbAddressArr != undefined) {
    var i;
    var idx;
    esbAddr.esbAddressArr.forEach(item => {
      i = item.substr(16, 2);
      if (addr == 0x0) {
        idx = item.substr(0x0, 8);
      } else {
        idx = item.substr(8, 8);
      }
      if (i + idx == length) {
        flag = true;
      }
    });
  }
  return flag;
}

function get_esb_addr_arr(esbAddr, index) {
  if (index == 0xff || esbAddr.esbAddressArr == undefined || esbAddr.esbAddressArr.length == 0x0 || esbAddr.esbSelected < 0x0 || esbAddr.esbSelected >= esbAddr.esbAddressArr.length) {
    return '';
  } else {
    var i;
    var idx;
    var i2;
    i = esbAddr.esbAddressArr[esbAddr.esbSelected];
    idx = i.substr(16, 2);
    if (index == 0x0) {
      i2 = i.substr(0x0, 8);
    } else {
      i2 = i.substr(8, 8);
    }
    return idx + i2;
  }
}

function get_esb_channel(client) {
  return client.product_esb_ch == 0xff ? client.device_info.esbChannel : client.product_esb_ch;
}

function get_usb_client(device) {
  var isGamingOnly = undefined;
  usb_client_list.forEach(item => {
    if (item.id == device) {
      isGamingOnly = item;
    }
  });
  return isGamingOnly;
}

function get_color_codes(client) {
  var value = get_cfg(client);
  return value != undefined ? value.models : [];
}

function get_color_code(client) {
  var value = client.device_info.colorCode;
  if (value == undefined || value == '') {
    value = '';
  } else {
    var flag = false;
    get_color_codes(client).forEach(item => {
      if (item == value) {
        flag = true;
      }
    });
    if (!flag) {
      value = '';
    }
  }
  return value;
}

function is_enhanced_cpi(client) {
  return client.device_info.enhancedCpi;
}

function is_dynamic_gom(client) {
  return client.device_info.dynamicGOM;
}

function get_cpi(client) {
  return client.device_info.resolution;
}

function get_cpi_range(client) {
  var value = get_cfg(client);
  return value != undefined ? value.cpi_range : [];
}

function get_cpi_step(client) {
  var value = get_cfg(client);
  return value != undefined ? client.device_info.enhancedCpi ? CPI_STEP_DEFAULT : value.cpi_step : 0x1;
}

function set_cpi(client, value, isXyLinked = true) {
  var cpiRange = get_cpi_range(client);
  var value2 = value & CPI_LOW_MASK;
  var value3 = value >> 0x10 & CPI_LOW_MASK;
  if (value2 < cpiRange[0x0]) {
    value2 = cpiRange[0x0];
  } else if (value2 > cpiRange[0x1]) {
    value2 = cpiRange[0x1];
  }
  if (value3 != 0x0) {
    if (value3 < cpiRange[0x0]) {
      value3 = cpiRange[0x0];
    } else if (value3 > cpiRange[0x1]) {
      value3 = cpiRange[0x1];
    }
  }
  value = value2 | value3 << 0x10;
  if (client.device_info.resolution != value) {
    client.device_info.resolution = value;
    if (isXyLinked) {
      send_event_mouse_param(client);
    }
    return true;
  }
  return false;
}

function is_cpi_xy_supported(client) {
  var value = get_cfg(client);
  return value != undefined ? value.cpi_xy : false;
}

function is_oms(client, value) {
  var value = get_cfg(client);
  return value != undefined ? value >= 0x0 ? value.oms.indexOf(value) >= 0x0 : value.oms.length > 0x0 : false;
}

function get_cpi_levels(client) {
  return client.device_info.cpiLevels;
}

function get_cpi_level_colors(client) {
  return client.device_info.cpiLevelColors;
}

function set_cpi_level(client, index, value, isUpdateLight = true) {
  if (client.device_info.cpiLevels[index] != value) {
    client.device_info.cpiLevels[index] = value;
  }
  if (isUpdateLight) {
    send_event_mouse_param(client);
  }
}

function set_cpi_level_color(client, cpiLevel, color) {
  if (client.device_info.cpiLevelColors[cpiLevel] != color) {
    client.device_info.cpiLevelColors[cpiLevel] = color;
    send_event_mouse_param(client);
  }
}

function remove_cpi_level(client, index) {
  client.device_info.cpiLevels.splice(index, 0x1);
  client.device_info.cpiLevels.push(0x0);
  client.device_info.cpiLevelColors.splice(index, 0x1);
  client.device_info.cpiLevelColors.push(0x0);
  send_event_mouse_param(client);
}

function add_cpi_level(client, value, index) {
  for (let len = 0x0; len < client.device_info.cpiLevels.length; len++) {
    if (client.device_info.cpiLevels[len] == 0x0) {
      client.device_info.cpiLevels[len] = value;
      client.device_info.cpiLevelColors[len] = index;
      send_event_mouse_param(client);
      break;
    }
  }
}

function get_polling_rates(client, arr) {
  var value = get_cfg(client);
  if (value != undefined) {
    var payload = value.polling_rates.slice();
    arr.forEach(item => {
      if (item.connected != undefined ? item.connected : false) {
        if (is_receiver(item)) {
          if (client.device == item.device) {
            var value2 = get_cfg(item);
            if (value2 != undefined && value2.boost_polling_rates != undefined) {
              value2.boost_polling_rates.forEach(item2 => {
                if (!payload.includes(item2)) {
                  payload.push(item2);
                }
              });
            }
          }
        }
      }
    });
    var value3 = client.device_info.pollingRate;
    for (var len = 0x7d; len <= value3; len *= 0x2) {
      if (!payload.includes(len)) {
        payload.push(len);
      }
    }
    return payload;
  } else {
    return [];
  }
}

function get_max_polling_rate(client, arr) {
  var i;
  if (true && !client.virtual && !is_keyboard_device(client)) {
    i = POLLING_RATE_1000HZ;
    var value = get_cfg(client);
    if (value != undefined) {
      var len = value.polling_rates;
      if (len != undefined && len.length > 0x0) {
        i = len[len.length - 0x1];
      }
    }
  } else {
    i = POLLING_RATE_1000HZ;
    arr.forEach(item => {
      if (item.connected != undefined ? item.connected : false) {
        if (is_receiver(item)) {
          if (client.device == item.device) {
            var value2 = get_cfg(item);
            if (value2 != undefined && value2.boost_polling_rates != undefined) {
              value2.boost_polling_rates.forEach(item2 => {
                if (item2 > i) {
                  i = item2;
                }
              });
            }
          }
        }
      }
    });
  }
  var value = get_cfg(client);
  return value != undefined ? i < value.polling_rate_max ? i : value.polling_rate_max : i;
}

function get_max_power_polling_rate(client) {
  var value = POLLING_RATE_MAX_HZ;
  var len = get_power_modes(client);
  if (len.length >= POWER_MODE_COUNT_LIMIT && client.device_info.powerMode == POWER_MODE_LOWEST) {
    value = POLLING_RATE_MIN_HZ;
  } else if (len.length >= POWER_MODE_COUNT_LIMIT && client.device_info.powerMode == POWER_MODE_LOW) {
    value = POLLING_RATE_1000HZ;
  }
  return value;
}

function get_polling_rate(client) {
  return client.device_info.pollingRate;
}

function set_polling_rate(client, rate) {
  if (client.device_info.pollingRate != rate) {
    client.device_info.pollingRate = rate;
    send_event_mouse_param(client);
    return true;
  }
  return false;
}

function get_light(client) {
  return client.device_info.light;
}

function set_light(client, lightData) {
  if (is_receiver(client)) {
    if (client.device_info.light != lightData) {
      client.device_info.light = lightData;
      var payload = [];
      payload.push(0x3);
      payload.push(0x0);
      payload.push(0x12);
      payload.push(lightData);
      send_event(client, crc_process(client, payload));
      return true;
    }
  } else {
    if (client.device_info.light != lightData) {
      client.device_info.light = lightData | 8;
      send_event_mouse_param(client);
      return true;
    }
  }
  return false;
}

function is_light(client) {
  var value = get_cfg(client);
  return value != undefined ? value.light : false;
}

function get_light_colors(client) {
  var value = get_cfg(client);
  return value != undefined ? value.light_colors : [];
}

function get_light_display_colors(client) {
  var value = get_light_colors(client);
  var payload = [];
  if (value.includes("red") && value.includes("green") && value.includes("blue")) {
    payload.push("white");
  }
  if (value.includes('red')) {
    payload.push("red");
  }
  if (value.includes("green")) {
    payload.push("green");
  }
  if (value.includes("blue")) {
    payload.push("blue");
  }
  if (value.includes("red") && value.includes('green')) {
    payload.push("yellow");
  }
  if (value.includes('red') && value.includes("blue")) {
    payload.push("purple");
  }
  if (value.includes('green') && value.includes("blue")) {
    payload.push("skyblue");
  }
  payload.push("none");
  return payload;
}

function get_power_modes(client) {
  var value = get_cfg(client);
  return value != undefined ? value.power_modes : [];
}

function get_power_modes2(client) {
  var value = get_cfg(client);
  return value != undefined ? value.power_modes2 : [];
}

function get_power_mode_tips(client) {
  var value = get_cfg(client);
  return value != undefined ? value.power_mode_tips : [];
}

function get_power_mode(client) {
  return client.device_info.powerMode;
}

function set_power_mode(client, mode) {
  if (client.device_info.powerMode != mode) {
    client.device_info.powerMode = mode;
    send_event_mouse_param(client);
    return true;
  }
  return false;
}

function get_lods_list(client) {
  var value = get_cfg(client);
  return value != undefined ? value.lods : [];
}

function get_lod(client) {
  return client.device_info.lod;
}

function set_lod(client, lodVal) {
  if (client.device_info.lod != lodVal) {
    client.device_info.lod = lodVal;
    send_event_mouse_param(client);
    return true;
  }
  return false;
}

function get_angle_snapping(client) {
  return client.device_info.angleSnapping;
}

function set_angle_snapping(client, enabled) {
  if (client.device_info.angleSnapping != enabled) {
    client.device_info.angleSnapping = enabled;
    send_event_mouse_param(client);
    return true;
  }
  return false;
}

function get_ripple_control(client) {
  return client.device_info.rippleControl;
}

function set_ripple_control(client, enabled) {
  if (client.device_info.rippleControl != enabled) {
    client.device_info.rippleControl = enabled;
    send_event_mouse_param(client);
    return true;
  }
  return false;
}

function get_motion_sync(client) {
  return client.device_info.motionSync;
}

function set_motion_sync(client, enabled) {
  if (client.device_info.motionSync != enabled) {
    client.device_info.motionSync = enabled;
    send_event_mouse_param(client);
    return true;
  }
  return false;
}

function get_wireless_turbo(client) {
  return client.device_info.txOutputPower == 0x0 ? 0x0 : 0x1;
}

function is_auto_tx_power(client) {
  return client.device_info.autoTxPower;
}

function set_wireless_turbo(client, enabled) {
  if (enabled == 0x1) {
    if (client.device_info.txOutputPower != 0x8) {
      client.device_info.txOutputPower = 0x8;
      send_event_mouse_param(client);
    }
  } else if (client.device_info.txOutputPower != 0x0) {
    client.device_info.txOutputPower = 0x0;
    send_event_mouse_param(client);
  }
}

function get_tx_power_applied(client) {
  return client.device_info.txOutputPowerApplied;
}

function get_rf_channel(client) {
  return client.device_info.rfChannel;
}

function get_sleep_time(client) {
  return client.device_info.sleepTime;
}

function is_angle_tuning_supported(client) {
  var value = get_cfg(client);
  return value != undefined ? value.angle_tuning : true;
}

function get_angle_tuning(client) {
  return client.device_info.angleTuning;
}

function set_angle_tuning(client, enabled) {
  if (client.device_info.angleTuning != enabled) {
    client.device_info.angleTuning = enabled;
    send_event_mouse_param(client);
    return true;
  }
  return false;
}

function get_key_delay(client) {
  return client.device_info.keyDelay;
}

function get_onboard_index(client) {
  return client.device_info.onboardIndex;
}

function get_onboard_status(client) {
  return client.device_info.onboardStatus;
}

function set_onboard_status(client, index, status) {
  if (client.device_info.onboardStatus[index] != status) {
    client.device_info.onboardStatus[index] = status;
    send_event_mouse_param(client);
    return true;
  }
  return false;
}

function get_key_configs(client) {
  return JSON.parse(JSON.stringify(client.device_info.allKeyConfigs));
}

function set_key_delay(client, delay, keyDelay) {
  if (client.device_info.keyDelay[delay] != keyDelay) {
    client.device_info.keyDelay[delay] = keyDelay;
    return true;
  }
  return false;
}

function is_enhancement(client) {
  var value = get_cfg(client);
  return value != undefined ? value.enhancement : false;
}

function is_glass_mode(client) {
  return client.device_info.glassMode != undefined ? client.device_info.glassMode == 0x1 : false;
}

function is_glass_mode_enabled(client) {
  return client.device_info.glassModeEnabled != undefined ? client.device_info.glassModeEnabled == 0x1 : false;
}

function is_glass_mode_supported(client) {
  var value = get_cfg(client);
  return value != undefined ? value.glass_mode : false;
}

function set_enable_glass_mode(client, enabled) {
  if (client.device_info.glassModeEnabled != enabled) {
    client.device_info.glassModeEnabled = enabled;
    send_event_mouse_param(client);
    return true;
  }
  return false;
}

function set_auto_tx_power(client, enabled) {
  if (client.device_info.autoTxPower != enabled) {
    client.device_info.autoTxPower = enabled;
    send_event_mouse_param(client);
    return true;
  }
  return false;
}

function is_new_firmware_existed(client) {
  if (client.helloed) {
    if (client.device_info.firmwareInfo != undefined && client.device_info.firmwareInfo.code >= 0x0) {
      return client.device_info.firmwareInfo.code > client.device_info.revisionCode;
    }
  }
  return false;
}

function get_firmware_log(client) {
  return client.device_info.firmwareInfo.log;
}

function get_firmware_name(client) {
  return client.device_info.firmwareInfo.name;
}

function get_keys(client) {
  var value = get_cfg(client);
  return value != undefined ? value.keys : [];
}

function get_shortcuts(client) {
  var value = get_cfg(client);
  return value != undefined ? value.shortcuts : [];
}

function get_setup_icon(client) {
  var value = get_cfg(client);
  return value != undefined ? value.setup_icon : '';
}

function is_wired_mode(client) {
  return true && !client.virtual;
}

function is_ble_mode(client) {
  return false;
}

function is_gaming_only_mode(client) {
  return client.device_info != undefined && client.device_info.revision != undefined && client.device_info.revision.substr(0x0, 0x2) == 'G-';
}

function get_squal(client) {
  return client.device_info.squal;
}

function get_equal(client) {
  return client.device_info.equal;
}

function is_wired(client) {
  return client.device_info.wired;
}

function get_default_rf_channel(client) {
  var value = get_cfg(client);
  return value != undefined ? value.rf_chn : 0xff;
}

function is_limit_memory(client) {
  var value = get_cfg(client);
  return value != undefined ? value.limit_memory : false;
}

function get_soc(client) {
  var value = get_cfg(client);
  return value != undefined ? value.soc : "UNKNOWN";
}

function is_soc_compatible(client, productId) {
  var value = get_soc(client);
  var value2 = get_soc(productId);
  return value == value2 || value == "NORDIC" && value2 == "NORDIC2" || value == "NORDIC2" && value2 == "NORDIC";
}

function is_bt_supported(client) {
  var value = get_cfg(client);
  return value != undefined ? value.working_modes.includes('bt') : false;
}

function is_hopping_channel_supported(client) {
  return client.device_info.hopChannelSupported;
}

function is_hopping_channel(client) {
  return client.device_info.hopChannel;
}

function is_brightness_supported(client) {
  var value = get_cfg(client);
  return value != undefined ? value.brightness : false;
}

function get_brightness(client) {
  return client.device_info.brightness;
}

function parse_device_info(value, jsonStr) {
  try {
    var json = JSON.parse(jsonStr);
    if (json.revision != undefined) {
      value.revision = json.revision;
    } else if (json.r != undefined) {
      value.revision = json.r;
    }
    if (json.revision_code != undefined) {
      value.revisionCode = json.revision_code;
    } else if (json.rc != undefined) {
      value.revisionCode = json.rc;
    }
    if (json.hw != undefined) {
      value.hardwareCode = json.hw;
    }
    if (json.battery != undefined) {
      value.battery = json.battery;
    }
    if (json.addr != undefined) {
      value.macAddress = json.addr;
    }
    if (json.config_num != undefined) {
      value.configNum = json.config_num;
    } else if (json.cn != undefined) {
      value.configNum = json.cn;
    }
    if (json.cpi != undefined) {
      value.resolution = json.cpi;
    }
    if (json.polling != undefined) {
      value.pollingRate = json.polling;
    }
    if (json.light != undefined) {
      value.light = json.light;
    }
    if (json.cpi_l != undefined) {
      value.cpiLevels = json.cpi_l;
    }
    if (json.cpi_l_c != undefined) {
      value.cpiLevelColors = json.cpi_l_c;
    }
    if (json.ob != undefined) {
      value.onboard = json.ob;
    }
    if (json.esb_addr != undefined && !Array.isArray(json.esb_addr)) {
      value.esbAddress = json.esb_addr;
    }
    if (json.esb_addr != undefined && Array.isArray(json.esb_addr)) {
      value.esbAddressArr = json.esb_addr;
    }
    if (json.esb_selected != undefined) {
      value.esbSelected = json.esb_selected;
    }
    if (json.esb_ch != undefined) {
      value.esbChannel = json.esb_ch;
    }
    if (json.pm != undefined) {
      value.powerMode = json.pm;
    }
    if (json.dn != undefined) {
      value.deviceName = json.dn;
    }
    if (json.pi != undefined) {
      value.productId = json.pi;
    }
    if (json.vi != undefined) {
      value.vendorId = json.vi;
    }
    if (json.lod != undefined) {
      value.lod = json.lod;
    }
    if (json.lod_c != undefined) {
      value.lodCalib = json.lod_c;
    }
    if (json.kd != undefined) {
      value.keyDelay = json.kd;
    }
    if (json.ms != undefined) {
      value.motionSync = json.ms;
    }
    if (json.at != undefined) {
      value.angleTuning = json.at << 0x18 >> 0x18;
    }
    if (json.as != undefined) {
      value.angleSnapping = json.as;
    }
    if (json.rctrl != undefined) {
      value.rippleControl = json.rctrl;
    }
    if (json.chr != undefined) {
      value.charging = json.chr;
    }
    if (json.top != undefined) {
      value.txOutputPower = json.top;
      value.txOutputPowerApplied = value.txOutputPower;
    }
    if (json.atp != undefined) {
      value.autoTxPower = json.atp;
    }
    if (json.co != undefined) {
      value.colorCode = json.co;
    }
    if (json.lz != undefined) {
      value.lzSupported = json.lz == 0x1;
    }
    if (json.st != undefined) {
      value.sleepTime = json.st;
    }
    if (json.rf_ch != undefined) {
      value.rfChannel = json.rf_ch;
    }
    if (json.crc != undefined) {
      value.crcSupported = json.crc == 0x1;
    }
    if (json.lua != undefined) {
      value.luaStatus = json.lua;
    }
    if (json.noack != undefined) {
      value.noack = json.noack;
    }
    if (json.gm != undefined) {
      if (Array.isArray(json.gm)) {
        value.glassMode = json.gm[0x0];
        value.glassModeEnabled = json.gm[0x1];
      } else {
        value.glassMode = json.gm;
        value.glassModeEnabled = 0x1;
      }
    }
    if (json.ocn != undefined) {
      value.onboardConfigNum = json.ocn;
    }
    if (json.oci != undefined) {
      value.onboardIndex = json.oci;
    }
    if (json.ocs != undefined) {
      value.onboardStatus = json.ocs;
    }
    if (json.ec != undefined) {
      value.enhancedCpi = json.ec == 0x1;
    }
    if (json.dgom != undefined) {
      value.dynamicGOM = json.dgom == 0x1;
    }
    if (json.wired != undefined) {
      value.wired = json.wired == 0x1;
    }
    if (json.sst != undefined) {
      value.sensor = json.sst;
    }
    if (json.lbn != undefined) {
      value.brightness = json.lbn;
    }
    if (json.hc != undefined) {
      value.hopChannelSupported = json.hc != 0xff;
      value.hopChannel = json.hc == 0x1;
    }
    if (json.slow != undefined) {
      value.slow = json.slow == 0x1;
    }
    let payload = [];
    while (payload.length < value.onboardConfigNum) {
      let arr = [];
      payload.push(arr);
    }
    value.allKeyConfigs = payload;
  } catch (err) {
    log_r(err);
  }
  return value;
}
