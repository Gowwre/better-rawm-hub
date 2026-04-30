// ===== DEVICE STATE STORE ====================================================
// Reactive state store that centralises device management. Replaces the global
// mutable state (usb_client_list, current_usb_client, postMessage dispatch)
// with a unified event emitter + data model.
//
// Also contains the device info model and all its helper functions (migrated
// from 03-device-info.js).
// ============================================================================

import { API_VERSION, POLLING_RATE_MAX_HZ, CPI_LOW_MASK, CPI_STEP_DEFAULT, BATTERY_FULL_PERCENT, RESOLUTION_DEFAULT, POWER_MODE_DEFAULT, POWER_MODE_LOW, POWER_MODE_LOWEST, SLEEP_DEFAULT_SEC, KBD_DEFAULT_ONBOARD_NUM, KEY_DELAY_DEFAULT, BRIGHTNESS_DEFAULT, POLLING_RATE_1000HZ, POWER_MODE_COUNT_LIMIT, ESB_ALIVE_TIMEOUT_MS } from '../data/constants.js';
import { is_hs_keyboard } from '../data/device-database.js';
import { send_event, crc_process } from '../protocol/hid-transport.js';
import { send_event_mouse_param } from '../protocol/hid-protocol.js';
import { S, log_r } from '../protocol/parse-cmd-ui.js';

// ===== ACTION CONSTANTS ======================================================
export const SYNC_DATA = "SYNC!@#$%^";
export const ACTION_REFRESH_CLIENT_LIST = "action_refresh_client_list";
export const ACTION_UI_REFRESH_CLIENT_LIST = "action_ui_refresh_client_list";
export const ACTION_REFRESH_CURRENT_CLIENT = "action_refresh_current_client";
export const ACTION_UI_REFRESH_CURRENT_CLIENT = "action_ui_refresh_current_client";
export const ACTION_UI_REFRESH_CURRENT_CLIENT_RSSI = "action_ui_refresh_current_client_rssi";
export const ACTION_UI_REFRESH_SETTING = "action_ui_refresh_setting";
export const ACTION_UI_REFRESH_QUAL = "action_ui_refresh_qual";
export const ACTION_SEND_CLIENT_DATA = "action_send_client_data";
export const ACTION_UI_REFRESH_KBD_KEY = "action_ui_refresh_kbd_key";
export const ACTION_UI_REFRESH_KBD_AXIS = "action_ui_refresh_kbd_axis";
export const ACTION_UI_REFRESH_KBD_LIGHT = "action_ui_refresh_kbd_light";
export const ACTION_UI_REFRESH_KBD_MACRO = "action_ui_refresh_kbd_macro";
export const RESOURCE_URL = "https://hub.miracletek.net/hub/";

var __DS = {};
__DS.upload_mouse_config_timer = undefined;
__DS.mouse_config_timer = undefined;

export function basic_info(productId) {
  return "?os=4" + "&v=" + API_VERSION + "&c=" + productId + "&a=" + "pc-rawmhub.game" + '&ta=' + "pc-rawmhub.game" + '&mac=' + (layui.device('os').os.toLowerCase() == "mac" ? 0x1 : 0x0);
}

// ===== BACKWARD-COMPATIBLE GLOBALS ==========================================
// These will be removed in a later phase once all UI files are migrated.
// _deviceClients is the backing array. DeviceStore.clients and usb_client_list
// both reference it, so mutations via either name stay in sync.
export var _deviceClients = [];
export var usb_client_list = _deviceClients;
export var current_usb_client = null;

// ===== REACTIVE STATE STORE =================================================
export const DeviceStore = {
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

  // Sync buffers for chunked HS protocol transfers
  kbdSync: {
    index: 0,
    keyinfoList: [],
    axisinfoList: [],
    socdinfoList: [],
    mtinfoList: [],
    rsinfoList: [],
    dksinfoList: [],
    lightinfoList: [],
    macroinfoList: [],
    macroIndex: 0,
    macroBuff: [],
  },

  // Keyboard data accessors (thin reads into client.device_info)
  getKeyInfos(client)       { return client.device_info.kbd_key_infos; },
  getLightInfo(client)      { return client.device_info.kbd_light_info; },
  getAxisInfos(client)      { return client.device_info.kbd_axis_infos; },
  getAxisMode(client)       { return client.device_info.kbd_axis_mode; },
  getSocdInfos(client)      { return client.device_info.kbd_socd_infos; },
  getMtInfos(client)        { return client.device_info.kbd_mt_infos; },
  getRsInfos(client)        { return client.device_info.kbd_rs_infos; },
  getDksInfos(client)       { return client.device_info.kbd_dks_infos; },
  getMacroInfos(client)     { return client.device_info.kbd_macro_infos; },
  getMacroNum(client)       { return client.device_info.kbd_macro_num; },
  getMacroMaxSize(client)   { return client.device_info.kbd_macro_max_size; },
  getOnboardNum(client)     { return client.device_info.kbd_onboardNum; },

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
export function create_device_info() {
  var info = {};
  return reset_device_info(info);
}

export function reset_device_cfg(arr) {
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

export function reset_device_info(device) {
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

export function reset_device_info_esb(client) {
  client.esbAddressArr = [];
  client.esbSelected = -0x1;
  return client;
}

export function create_usb_client(hidDevice, value, virtual) {
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

export function is_supported(productId) {
  var flag = false;
  S.device_cfg.forEach(item => {
    if (item.product_id == productId.toString(0x10)) {
      flag = true;
    }
  });
  return flag;
}

export function get_cfg(client) {
  var revision = undefined;
  if (client.virtual) {
    S.device_cfg.forEach(item => {
      if (item.name == client.device_name) {
        revision = item;
      }
    });
  } else {
    S.device_cfg.forEach(item2 => {
      if (item2.product_id == client.device.productId.toString(0x10)) {
        revision = item2;
      }
    });
  }
  return revision;
}

export function is_receiver(device) {
  var value = get_cfg(device);
  return value != undefined ? value.receiver : false;
}

export function is_slow_receiver(client) {
  if (!client.device_info.slow) {
    return client.device_info.slow;
  } else {
    var value = get_cfg(client);
    return value != undefined ? value.slow : true;
  }
}

export function is_hub(device) {
  var value = get_cfg(device);
  return value != undefined ? value.hub : false;
}

export function is_keyboard(client) {
  return client != undefined ? is_hs_keyboard(client.device) : false;
}

export function is_keyboard_device(device) {
  var value = get_cfg(device);
  return value != undefined ? value.keyboard : false;
}

export function is_connected(client) {
  return client.connected != undefined ? client.connected : false;
}

export function get_display_name(client) {
  var value = get_cfg(client);
  return value != undefined ? value.display_name : client.device_name;
}

export function get_display_name_model(client) {
  var value = get_cfg(client);
  return value != undefined && value.display_name_model != undefined ? value.display_name_model : '';
}

export function get_product_id_hex_str(client) {
  var str = '';
  if (client.virtual) {
    S.device_cfg.forEach(item => {
      if (item.name == client.device_name) {
        str = item.product_id;
      }
    });
  } else {
    str = client.device.productId.toString(0x10);
  }
  return str;
}

export function is_battery_percent_supported(client) {
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

export function get_esb_addr(esbAddr, index) {
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

export function is_esb_addr_arr_existed(esbAddr, addr, length) {
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

export function get_esb_addr_arr(esbAddr, index) {
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

export function get_esb_channel(client) {
  return client.product_esb_ch == 0xff ? client.device_info.esbChannel : client.product_esb_ch;
}

export function get_usb_client(device) {
  var isGamingOnly = undefined;
  usb_client_list.forEach(item => {
    if (item.id == device) {
      isGamingOnly = item;
    }
  });
  return isGamingOnly;
}

export function get_color_codes(client) {
  var value = get_cfg(client);
  return value != undefined ? value.models : [];
}

export function get_color_code(client) {
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

export function is_enhanced_cpi(client) {
  return client.device_info.enhancedCpi;
}

export function is_dynamic_gom(client) {
  return client.device_info.dynamicGOM;
}

export function get_cpi(client) {
  return client.device_info.resolution;
}

export function get_cpi_range(client) {
  var value = get_cfg(client);
  return value != undefined ? value.cpi_range : [];
}

export function get_cpi_step(client) {
  var value = get_cfg(client);
  return value != undefined ? client.device_info.enhancedCpi ? CPI_STEP_DEFAULT : value.cpi_step : 0x1;
}

export function set_cpi(client, value, isXyLinked = true) {
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

export function is_cpi_xy_supported(client) {
  var value = get_cfg(client);
  return value != undefined ? value.cpi_xy : false;
}

export function is_oms(client, value) {
  var value = get_cfg(client);
  return value != undefined ? value >= 0x0 ? value.oms.indexOf(value) >= 0x0 : value.oms.length > 0x0 : false;
}

export function get_cpi_levels(client) {
  return client.device_info.cpiLevels;
}

export function get_cpi_level_colors(client) {
  return client.device_info.cpiLevelColors;
}

export function set_cpi_level(client, index, value, isUpdateLight = true) {
  if (client.device_info.cpiLevels[index] != value) {
    client.device_info.cpiLevels[index] = value;
  }
  if (isUpdateLight) {
    send_event_mouse_param(client);
  }
}

export function set_cpi_level_color(client, cpiLevel, color) {
  if (client.device_info.cpiLevelColors[cpiLevel] != color) {
    client.device_info.cpiLevelColors[cpiLevel] = color;
    send_event_mouse_param(client);
  }
}

export function remove_cpi_level(client, index) {
  client.device_info.cpiLevels.splice(index, 0x1);
  client.device_info.cpiLevels.push(0x0);
  client.device_info.cpiLevelColors.splice(index, 0x1);
  client.device_info.cpiLevelColors.push(0x0);
  send_event_mouse_param(client);
}

export function add_cpi_level(client, value, index) {
  for (let len = 0x0; len < client.device_info.cpiLevels.length; len++) {
    if (client.device_info.cpiLevels[len] == 0x0) {
      client.device_info.cpiLevels[len] = value;
      client.device_info.cpiLevelColors[len] = index;
      send_event_mouse_param(client);
      break;
    }
  }
}

export function get_polling_rates(client, arr) {
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

export function get_max_polling_rate(client, arr) {
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

export function get_max_power_polling_rate(client) {
  var value = POLLING_RATE_MAX_HZ;
  var len = get_power_modes(client);
  if (len.length >= POWER_MODE_COUNT_LIMIT && client.device_info.powerMode == POWER_MODE_LOWEST) {
    value = POLLING_RATE_MIN_HZ;
  } else if (len.length >= POWER_MODE_COUNT_LIMIT && client.device_info.powerMode == POWER_MODE_LOW) {
    value = POLLING_RATE_1000HZ;
  }
  return value;
}

export function get_polling_rate(client) {
  return client.device_info.pollingRate;
}

export function set_polling_rate(client, rate) {
  if (client.device_info.pollingRate != rate) {
    client.device_info.pollingRate = rate;
    send_event_mouse_param(client);
    return true;
  }
  return false;
}

export function get_light(client) {
  return client.device_info.light;
}

export function set_light(client, lightData) {
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

export function is_light(client) {
  var value = get_cfg(client);
  return value != undefined ? value.light : false;
}

export function get_light_colors(client) {
  var value = get_cfg(client);
  return value != undefined ? value.light_colors : [];
}

export function get_light_display_colors(client) {
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

export function get_power_modes(client) {
  var value = get_cfg(client);
  return value != undefined ? value.power_modes : [];
}

export function get_power_modes2(client) {
  var value = get_cfg(client);
  return value != undefined ? value.power_modes2 : [];
}

export function get_power_mode_tips(client) {
  var value = get_cfg(client);
  return value != undefined ? value.power_mode_tips : [];
}

export function get_power_mode(client) {
  return client.device_info.powerMode;
}

export function set_power_mode(client, mode) {
  if (client.device_info.powerMode != mode) {
    client.device_info.powerMode = mode;
    send_event_mouse_param(client);
    return true;
  }
  return false;
}

export function get_lods_list(client) {
  var value = get_cfg(client);
  return value != undefined ? value.lods : [];
}

export function get_lod(client) {
  return client.device_info.lod;
}

export function set_lod(client, lodVal) {
  if (client.device_info.lod != lodVal) {
    client.device_info.lod = lodVal;
    send_event_mouse_param(client);
    return true;
  }
  return false;
}

export function get_angle_snapping(client) {
  return client.device_info.angleSnapping;
}

export function set_angle_snapping(client, enabled) {
  if (client.device_info.angleSnapping != enabled) {
    client.device_info.angleSnapping = enabled;
    send_event_mouse_param(client);
    return true;
  }
  return false;
}

export function get_ripple_control(client) {
  return client.device_info.rippleControl;
}

export function set_ripple_control(client, enabled) {
  if (client.device_info.rippleControl != enabled) {
    client.device_info.rippleControl = enabled;
    send_event_mouse_param(client);
    return true;
  }
  return false;
}

export function get_motion_sync(client) {
  return client.device_info.motionSync;
}

export function set_motion_sync(client, enabled) {
  if (client.device_info.motionSync != enabled) {
    client.device_info.motionSync = enabled;
    send_event_mouse_param(client);
    return true;
  }
  return false;
}

export function get_wireless_turbo(client) {
  return client.device_info.txOutputPower == 0x0 ? 0x0 : 0x1;
}

export function is_auto_tx_power(client) {
  return client.device_info.autoTxPower;
}

export function set_wireless_turbo(client, enabled) {
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

export function get_tx_power_applied(client) {
  return client.device_info.txOutputPowerApplied;
}

export function get_rf_channel(client) {
  return client.device_info.rfChannel;
}

export function get_sleep_time(client) {
  return client.device_info.sleepTime;
}

export function is_angle_tuning_supported(client) {
  var value = get_cfg(client);
  return value != undefined ? value.angle_tuning : true;
}

export function get_angle_tuning(client) {
  return client.device_info.angleTuning;
}

export function set_angle_tuning(client, enabled) {
  if (client.device_info.angleTuning != enabled) {
    client.device_info.angleTuning = enabled;
    send_event_mouse_param(client);
    return true;
  }
  return false;
}

export function get_key_delay(client) {
  return client.device_info.keyDelay;
}

export function get_onboard_index(client) {
  return client.device_info.onboardIndex;
}

export function get_onboard_status(client) {
  return client.device_info.onboardStatus;
}

export function set_onboard_status(client, index, status) {
  if (client.device_info.onboardStatus[index] != status) {
    client.device_info.onboardStatus[index] = status;
    send_event_mouse_param(client);
    return true;
  }
  return false;
}

export function get_key_configs(client) {
  return JSON.parse(JSON.stringify(client.device_info.allKeyConfigs));
}

export function set_key_delay(client, delay, keyDelay) {
  if (client.device_info.keyDelay[delay] != keyDelay) {
    client.device_info.keyDelay[delay] = keyDelay;
    return true;
  }
  return false;
}

export function is_enhancement(client) {
  var value = get_cfg(client);
  return value != undefined ? value.enhancement : false;
}

export function is_glass_mode(client) {
  return client.device_info.glassMode != undefined ? client.device_info.glassMode == 0x1 : false;
}

export function is_glass_mode_enabled(client) {
  return client.device_info.glassModeEnabled != undefined ? client.device_info.glassModeEnabled == 0x1 : false;
}

export function is_glass_mode_supported(client) {
  var value = get_cfg(client);
  return value != undefined ? value.glass_mode : false;
}

export function set_enable_glass_mode(client, enabled) {
  if (client.device_info.glassModeEnabled != enabled) {
    client.device_info.glassModeEnabled = enabled;
    send_event_mouse_param(client);
    return true;
  }
  return false;
}

export function set_auto_tx_power(client, enabled) {
  if (client.device_info.autoTxPower != enabled) {
    client.device_info.autoTxPower = enabled;
    send_event_mouse_param(client);
    return true;
  }
  return false;
}

export function is_new_firmware_existed(client) {
  if (client.helloed) {
    if (client.device_info.firmwareInfo != undefined && client.device_info.firmwareInfo.code >= 0x0) {
      return client.device_info.firmwareInfo.code > client.device_info.revisionCode;
    }
  }
  return false;
}

export function get_firmware_log(client) {
  return client.device_info.firmwareInfo.log;
}

export function get_firmware_name(client) {
  return client.device_info.firmwareInfo.name;
}

export function get_keys(client) {
  var value = get_cfg(client);
  return value != undefined ? value.keys : [];
}

export function get_shortcuts(client) {
  var value = get_cfg(client);
  return value != undefined ? value.shortcuts : [];
}

export function get_setup_icon(client) {
  var value = get_cfg(client);
  return value != undefined ? value.setup_icon : '';
}

export function is_wired_mode(client) {
  return true && !client.virtual;
}

export function is_ble_mode(client) {
  return false;
}

export function is_gaming_only_mode(client) {
  return client.device_info != undefined && client.device_info.revision != undefined && client.device_info.revision.substr(0x0, 0x2) == 'G-';
}

export function get_squal(client) {
  return client.device_info.squal;
}

export function get_equal(client) {
  return client.device_info.equal;
}

export function is_wired(client) {
  return client.device_info.wired;
}

export function get_default_rf_channel(client) {
  var value = get_cfg(client);
  return value != undefined ? value.rf_chn : 0xff;
}

export function is_limit_memory(client) {
  var value = get_cfg(client);
  return value != undefined ? value.limit_memory : false;
}

export function get_soc(client) {
  var value = get_cfg(client);
  return value != undefined ? value.soc : "UNKNOWN";
}

export function is_soc_compatible(client, productId) {
  var value = get_soc(client);
  var value2 = get_soc(productId);
  return value == value2 || value == "NORDIC" && value2 == "NORDIC2" || value == "NORDIC2" && value2 == "NORDIC";
}

export function is_bt_supported(client) {
  var value = get_cfg(client);
  return value != undefined ? value.working_modes.includes('bt') : false;
}

export function is_hopping_channel_supported(client) {
  return client.device_info.hopChannelSupported;
}

export function is_hopping_channel(client) {
  return client.device_info.hopChannel;
}

export function is_brightness_supported(client) {
  var value = get_cfg(client);
  return value != undefined ? value.brightness : false;
}

export function get_brightness(client) {
  return client.device_info.brightness;
}

export function parse_device_info(value, jsonStr) {
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

// ===== SHARED MUTABLE STATE ==================================================
export var DS = {};
Object.keys(__DS).forEach(function(name) {
  Object.defineProperty(DS, name, {
    get() { return __DS[name]; },
    set(v) { __DS[name] = v; },
    configurable: true
  });
});
// current_usb_client is special: it's exported as a named var for direct imports.
// DS.current_usb_client must reference THE SAME variable so mutations through DS
// are visible to named importers.
Object.defineProperty(DS, 'current_usb_client', {
  get() { return current_usb_client; },
  set(v) { current_usb_client = v; },
  configurable: true
});
