import { API_VERSION, POLLING_RATE_MAX_HZ, POLLING_RATE_MIN_HZ, CPI_LOW_MASK, CPI_STEP_DEFAULT, BATTERY_FULL_PERCENT, RESOLUTION_DEFAULT, POWER_MODE_DEFAULT, POWER_MODE_LOW, POWER_MODE_LOWEST, SLEEP_DEFAULT_SEC, KBD_DEFAULT_ONBOARD_NUM, KEY_DELAY_DEFAULT, BRIGHTNESS_DEFAULT, POLLING_RATE_1000HZ, POWER_MODE_COUNT_LIMIT, ESB_ALIVE_TIMEOUT_MS } from '../data/constants.js';
import { is_hs_keyboard } from '../data/device-database.js';
import { send_event, crc_process } from '../protocol/hid-transport.js';
import { send_event_mouse_param } from '../protocol/hid-protocol.js';
import { S, log_r } from '../protocol/parse-cmd-ui.js';

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
var __DS: Record<string, any> = {};
__DS.upload_mouse_config_timer = undefined;
__DS.mouse_config_timer = undefined;

export function basic_info(productId: number) {
  return "?os=4" + "&v=" + API_VERSION + "&c=" + productId + "&a=" + "pc-rawmhub.game" + '&ta=' + "pc-rawmhub.game" + '&mac=' + (layui.device('os').os.toLowerCase() == "mac" ? 0x1 : 0x0);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export var _deviceClients: any[] = [];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export var usb_client_list: any[] = _deviceClients;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export var current_usb_client: any = null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type HandlerFn = (...args: any[]) => void;

export const DeviceStore = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get clients(): any[] { return _deviceClients; },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  set clients(v: any[]) { _deviceClients = v; usb_client_list = v; },

  currentId: null as string | null,

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get current(): any {
    if (this.currentId == null) return null;
    return _deviceClients.find(c => c.id === this.currentId) || null;
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getClient(id: string): any {
    return _deviceClients.find(c => c.id === id) || null;
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getDeviceInfo(client: any) {
    return client ? client.device_info : null;
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  addClient(hidDevice: any, value: any, virtual: any) {
    var client = create_usb_client(hidDevice, value, virtual);
    _deviceClients.push(client);
    this._emit('client:added', client);
    return client;
  },

  removeClient(id: string) {
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

  selectClient(id: string) {
    var client = this.getClient(id);
    if (client) {
      this.currentId = id;
      current_usb_client = client;
      this._emit('current:changed', client);
    }
  },

  unselectClient() {
    this.currentId = null;
    current_usb_client = null;
    this._emit('current:changed', null);
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateDeviceInfo(id: string, patch: any) {
    var client = this.getClient(id);
    if (client) {
      Object.assign(client.device_info, patch);
      this._emit('device:updated', client);
    }
  },

  kbdSync: {
    index: 0,
    keyinfoList: [] as any[],
    axisinfoList: [] as any[],
    socdinfoList: [] as any[],
    mtinfoList: [] as any[],
    rsinfoList: [] as any[],
    dksinfoList: [] as any[],
    lightinfoList: [] as any[],
    macroinfoList: [] as any[],
    macroIndex: 0,
    macroBuff: [] as number[],
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getKeyInfos(client: any) { return client.device_info.kbd_key_infos; },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getLightInfo(client: any) { return client.device_info.kbd_light_info; },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getAxisInfos(client: any) { return client.device_info.kbd_axis_infos; },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getAxisMode(client: any) { return client.device_info.kbd_axis_mode; },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getSocdInfos(client: any) { return client.device_info.kbd_socd_infos; },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getMtInfos(client: any) { return client.device_info.kbd_mt_infos; },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getRsInfos(client: any) { return client.device_info.kbd_rs_infos; },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getDksInfos(client: any) { return client.device_info.kbd_dks_infos; },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getMacroInfos(client: any) { return client.device_info.kbd_macro_infos; },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getMacroNum(client: any) { return client.device_info.kbd_macro_num; },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getMacroMaxSize(client: any) { return client.device_info.kbd_macro_max_size; },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getOnboardNum(client: any) { return client.device_info.kbd_onboardNum; },

  _handlers: {} as Record<string, HandlerFn[]>,

  on(event: string, handler: HandlerFn) {
    (this._handlers[event] = this._handlers[event] || []).push(handler);
  },

  off(event: string, handler: HandlerFn) {
    var list = this._handlers[event];
    if (list) {
      var idx = list.indexOf(handler);
      if (idx >= 0) list.splice(idx, 1);
    }
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _emit(event: string, data: any) {
    var list = this._handlers[event];
    if (list) {
      list.slice().forEach(fn => fn(data));
    }
  }
};

export function create_device_info() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  var info: any = {};
  return reset_device_info(info);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function reset_device_cfg(arr: any[]) {
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function reset_device_info(device: any) {
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function reset_device_info_esb(client: any) {
  client.esbAddressArr = [];
  client.esbSelected = -0x1;
  return client;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function create_usb_client(hidDevice: any, value: any, virtual: any) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  var client: any = {
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function is_supported(productId: any) {
  if (S.device_cfg.length === 0) return true;
  var flag = false;
  S.device_cfg.forEach(item => {
    if (item.product_id == productId.toString(0x10)) {
      flag = true;
    }
  });
  return flag;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function default_device_cfg() {
  return {
    receiver: false,
    hub: false,
    slow: true,
    keyboard: false,
    light: false,
    battery_levels: [],
    oms: [],
    working_modes: [],
    polling_rates: [125, 250, 500, 1000],
    boost_polling_rates: [],
    poling_rates: [125, 250, 500, 1000],
    power_modes: [],
    power_modes2: [],
    power_mode_tips: [],
    lods: [1, 2],
    lod: [1, 2],
    light_colors: ['red', 'green', 'blue'],
    models: [],
    color_codes: [],
    angle_tuning: true,
    enhancement: false,
    glass_mode: false,
    cpi_range: [100, 26000],
    cpi_step: 100,
    cpi_xy: false,
    display_name: '',
    display_name_model: '',
    keys: [],
    shortcuts: [],
    setup_icon: '',
    rf_chn: 0xff,
    limit_memory: false,
    soc: '',
    brightness: true,
    polling_rate_max: POLLING_RATE_MAX_HZ
  };
}

export function get_cfg(client: any): any {
  var revision: any = undefined;
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
  if (revision == undefined) {
    revision = default_device_cfg();
  } else {
    var defaults = default_device_cfg();
    for (var key in defaults) {
      if (revision[key] === undefined) {
        revision[key] = defaults[key];
      }
    }
  }
  return revision;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function is_receiver(device: any) {
  var value = get_cfg(device);
  return value != undefined ? value.receiver : false;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function is_slow_receiver(client: any) {
  if (!client.device_info.slow) {
    return client.device_info.slow;
  } else {
    var value = get_cfg(client);
    return value != undefined ? value.slow : true;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function is_hub(device: any) {
  var value = get_cfg(device);
  return value != undefined ? value.hub : false;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function is_keyboard(client: any) {
  return client != undefined ? is_hs_keyboard(client.device) : false;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function is_keyboard_device(device: any) {
  var value = get_cfg(device);
  return value != undefined ? value.keyboard : false;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function is_connected(client: any) {
  return client.connected != undefined ? client.connected : false;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function get_display_name(client: any) {
  var value = get_cfg(client);
  return value != undefined ? value.display_name : client.device_name;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function get_display_name_model(client: any) {
  var value = get_cfg(client);
  return value != undefined && value.display_name_model != undefined ? value.display_name_model : '';
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function get_product_id_hex_str(client: any) {
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function is_battery_percent_supported(client: any) {
  var value = get_cfg(client);
  if (value != undefined && value.battery_levels != undefined) {
    var flag = false;
    value.battery_levels.forEach(item => {
      if (item != 0x0) {
        flag = true;
      }
    });
    return flag;
  }
  return false;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function get_esb_addr(esbAddr: any, index: number) {
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function is_esb_addr_arr_existed(esbAddr: any, addr: any, length: any) {
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function get_esb_addr_arr(esbAddr: any, index: number) {
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function get_esb_channel(client: any) {
  return client.product_esb_ch == 0xff ? client.device_info.esbChannel : client.product_esb_ch;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function get_usb_client(device: any) {
  var isGamingOnly = undefined;
  usb_client_list.forEach(item => {
    if (item.id == device) {
      isGamingOnly = item;
    }
  });
  return isGamingOnly;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function get_color_codes(client: any) {
  var value = get_cfg(client);
  return value != undefined ? value.models : [];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function get_color_code(client: any) {
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function is_enhanced_cpi(client: any) {
  return client.device_info.enhancedCpi;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function is_dynamic_gom(client: any) {
  return client.device_info.dynamicGOM;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function get_cpi(client: any) {
  return client.device_info.resolution;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function get_cpi_range(client: any) {
  var value = get_cfg(client);
  return value != undefined && value.cpi_range != undefined ? value.cpi_range : [100, 1000];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function get_cpi_step(client: any) {
  var value = get_cfg(client);
  return value != undefined ? client.device_info.enhancedCpi ? CPI_STEP_DEFAULT : value.cpi_step : 0x1;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function set_cpi(client: any, value: number, isXyLinked = true) {
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function is_cpi_xy_supported(client: any) {
  var value = get_cfg(client);
  return value != undefined ? value.cpi_xy : false;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function is_oms(client: any, omsValue: any) {
  var cfg: any = get_cfg(client);
  if (cfg == undefined || cfg.oms == undefined) return false;
  return cfg >= 0x0
    ? cfg.oms.indexOf(omsValue) >= 0x0
    : cfg.oms.length > 0x0;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function get_cpi_levels(client: any) {
  return client.device_info.cpiLevels;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function get_cpi_level_colors(client: any) {
  return client.device_info.cpiLevelColors;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function set_cpi_level(client: any, index: number, value: number, isUpdateLight = true) {
  if (client.device_info.cpiLevels[index] != value) {
    client.device_info.cpiLevels[index] = value;
  }
  if (isUpdateLight) {
    send_event_mouse_param(client);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function set_cpi_level_color(client: any, cpiLevel: number, color: number) {
  if (client.device_info.cpiLevelColors[cpiLevel] != color) {
    client.device_info.cpiLevelColors[cpiLevel] = color;
    send_event_mouse_param(client);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function remove_cpi_level(client: any, index: number) {
  client.device_info.cpiLevels.splice(index, 0x1);
  client.device_info.cpiLevels.push(0x0);
  client.device_info.cpiLevelColors.splice(index, 0x1);
  client.device_info.cpiLevelColors.push(0x0);
  send_event_mouse_param(client);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function add_cpi_level(client: any, value: number, index: number) {
  for (let len = 0x0; len < client.device_info.cpiLevels.length; len++) {
    if (client.device_info.cpiLevels[len] == 0x0) {
      client.device_info.cpiLevels[len] = value;
      client.device_info.cpiLevelColors[len] = index;
      send_event_mouse_param(client);
      break;
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function get_polling_rates(client: any, arr: any[]) {
  var value = get_cfg(client);
  if (value != undefined && value.polling_rates != undefined) {
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function get_max_polling_rate(client: any, arr: any[]) {
  var i: number;
  if (true && !client.virtual && !is_keyboard_device(client)) {
    i = POLLING_RATE_1000HZ;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var value: any = get_cfg(client);
    if (value != undefined) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      var len: any[] = value.polling_rates;
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
  var maxValue: any = get_cfg(client);
  return maxValue != undefined ? i < maxValue.polling_rate_max ? i : maxValue.polling_rate_max : i;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function get_max_power_polling_rate(client: any) {
  var value = POLLING_RATE_MAX_HZ;
  var len = get_power_modes(client);
  if (len.length >= POWER_MODE_COUNT_LIMIT && client.device_info.powerMode == POWER_MODE_LOWEST) {
    value = POLLING_RATE_MIN_HZ;
  } else if (len.length >= POWER_MODE_COUNT_LIMIT && client.device_info.powerMode == POWER_MODE_LOW) {
    value = POLLING_RATE_1000HZ;
  }
  return value;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function get_polling_rate(client: any) {
  return client.device_info.pollingRate;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function set_polling_rate(client: any, rate: number) {
  if (client.device_info.pollingRate != rate) {
    client.device_info.pollingRate = rate;
    send_event_mouse_param(client);
    return true;
  }
  return false;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function get_light(client: any) {
  return client.device_info.light;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function set_light(client: any, lightData: any) {
  if (is_receiver(client)) {
    if (client.device_info.light != lightData) {
      client.device_info.light = lightData;
      var payload: number[] = [];
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function is_light(client: any) {
  var value = get_cfg(client);
  return value != undefined ? value.light : false;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function get_light_colors(client: any) {
  var value = get_cfg(client);
  return value != undefined ? value.light_colors : [];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function get_light_display_colors(client: any) {
  var value = get_light_colors(client);
  var payload: string[] = [];
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function get_power_modes(client: any) {
  var value = get_cfg(client);
  return value != undefined ? value.power_modes : [];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function get_power_modes2(client: any) {
  var value = get_cfg(client);
  return value != undefined ? value.power_modes2 : [];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function get_power_mode_tips(client: any) {
  var value = get_cfg(client);
  return value != undefined ? value.power_mode_tips : [];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function get_power_mode(client: any) {
  return client.device_info.powerMode;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function set_power_mode(client: any, mode: any) {
  if (client.device_info.powerMode != mode) {
    client.device_info.powerMode = mode;
    send_event_mouse_param(client);
    return true;
  }
  return false;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function get_lods_list(client: any) {
  var value = get_cfg(client);
  return value != undefined ? value.lods : [];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function get_lod(client: any) {
  return client.device_info.lod;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function set_lod(client: any, lodVal: any) {
  if (client.device_info.lod != lodVal) {
    client.device_info.lod = lodVal;
    send_event_mouse_param(client);
    return true;
  }
  return false;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function get_angle_snapping(client: any) {
  return client.device_info.angleSnapping;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function set_angle_snapping(client: any, enabled: any) {
  if (client.device_info.angleSnapping != enabled) {
    client.device_info.angleSnapping = enabled;
    send_event_mouse_param(client);
    return true;
  }
  return false;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function get_ripple_control(client: any) {
  return client.device_info.rippleControl;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function set_ripple_control(client: any, enabled: any) {
  if (client.device_info.rippleControl != enabled) {
    client.device_info.rippleControl = enabled;
    send_event_mouse_param(client);
    return true;
  }
  return false;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function get_motion_sync(client: any) {
  return client.device_info.motionSync;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function set_motion_sync(client: any, enabled: any) {
  if (client.device_info.motionSync != enabled) {
    client.device_info.motionSync = enabled;
    send_event_mouse_param(client);
    return true;
  }
  return false;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function get_wireless_turbo(client: any) {
  return client.device_info.txOutputPower == 0x0 ? 0x0 : 0x1;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function is_auto_tx_power(client: any) {
  return client.device_info.autoTxPower;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function set_wireless_turbo(client: any, enabled: number) {
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function get_tx_power_applied(client: any) {
  return client.device_info.txOutputPowerApplied;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function get_rf_channel(client: any) {
  return client.device_info.rfChannel;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function get_sleep_time(client: any) {
  return client.device_info.sleepTime;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function is_angle_tuning_supported(client: any) {
  var value = get_cfg(client);
  return value != undefined ? value.angle_tuning : true;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function get_angle_tuning(client: any) {
  return client.device_info.angleTuning;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function set_angle_tuning(client: any, enabled: any) {
  if (client.device_info.angleTuning != enabled) {
    client.device_info.angleTuning = enabled;
    send_event_mouse_param(client);
    return true;
  }
  return false;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function get_key_delay(client: any) {
  return client.device_info.keyDelay;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function get_onboard_index(client: any) {
  return client.device_info.onboardIndex;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function get_onboard_status(client: any) {
  return client.device_info.onboardStatus;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function set_onboard_status(client: any, index: number, status: any) {
  if (client.device_info.onboardStatus[index] != status) {
    client.device_info.onboardStatus[index] = status;
    send_event_mouse_param(client);
    return true;
  }
  return false;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function get_key_configs(client: any) {
  return JSON.parse(JSON.stringify(client.device_info.allKeyConfigs));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function set_key_delay(client: any, delay: number, keyDelay: any) {
  if (client.device_info.keyDelay[delay] != keyDelay) {
    client.device_info.keyDelay[delay] = keyDelay;
    return true;
  }
  return false;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function is_enhancement(client: any) {
  var value = get_cfg(client);
  return value != undefined ? value.enhancement : false;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function is_glass_mode(client: any) {
  return client.device_info.glassMode != undefined ? client.device_info.glassMode == 0x1 : false;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function is_glass_mode_enabled(client: any) {
  return client.device_info.glassModeEnabled != undefined ? client.device_info.glassModeEnabled == 0x1 : false;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function is_glass_mode_supported(client: any) {
  var value = get_cfg(client);
  return value != undefined ? value.glass_mode : false;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function set_enable_glass_mode(client: any, enabled: any) {
  if (client.device_info.glassModeEnabled != enabled) {
    client.device_info.glassModeEnabled = enabled;
    send_event_mouse_param(client);
    return true;
  }
  return false;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function set_auto_tx_power(client: any, enabled: any) {
  if (client.device_info.autoTxPower != enabled) {
    client.device_info.autoTxPower = enabled;
    send_event_mouse_param(client);
    return true;
  }
  return false;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function is_new_firmware_existed(client: any) {
  if (client.helloed) {
    if (client.device_info.firmwareInfo != undefined && client.device_info.firmwareInfo.code >= 0x0) {
      return client.device_info.firmwareInfo.code > client.device_info.revisionCode;
    }
  }
  return false;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function get_firmware_log(client: any) {
  return client.device_info.firmwareInfo.log;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function get_firmware_name(client: any) {
  return client.device_info.firmwareInfo.name;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function get_keys(client: any) {
  var value = get_cfg(client);
  return value != undefined ? value.keys : [];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function get_shortcuts(client: any) {
  var value = get_cfg(client);
  return value != undefined ? value.shortcuts : [];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function get_setup_icon(client: any) {
  var value = get_cfg(client);
  return value != undefined ? value.setup_icon : '';
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function is_wired_mode(client: any) {
  return true && !client.virtual;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function is_ble_mode(client: any) {
  return false;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function is_gaming_only_mode(client: any) {
  return client.device_info != undefined && client.device_info.revision != undefined && client.device_info.revision.substr(0x0, 0x2) == 'G-';
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function get_squal(client: any) {
  return client.device_info.squal;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function get_equal(client: any) {
  return client.device_info.equal;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function is_wired(client: any) {
  return client.device_info.wired;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function get_default_rf_channel(client: any) {
  var value = get_cfg(client);
  return value != undefined ? value.rf_chn : 0xff;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function is_limit_memory(client: any) {
  var value = get_cfg(client);
  return value != undefined ? value.limit_memory : false;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function get_soc(client: any) {
  var value = get_cfg(client);
  return value != undefined ? value.soc : "UNKNOWN";
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function is_soc_compatible(client: any, productId: any) {
  var value = get_soc(client);
  var value2 = get_soc(productId);
  return value == value2 || value == "NORDIC" && value2 == "NORDIC2" || value == "NORDIC2" && value2 == "NORDIC";
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function is_bt_supported(client: any) {
  var value = get_cfg(client);
  return value != undefined ? value.working_modes.includes('bt') : false;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function is_hopping_channel_supported(client: any) {
  return client.device_info.hopChannelSupported;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function is_hopping_channel(client: any) {
  return client.device_info.hopChannel;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function is_brightness_supported(client: any) {
  var value = get_cfg(client);
  return value != undefined ? value.brightness : false;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function get_brightness(client: any) {
  return client.device_info.brightness;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parse_device_info(value: any, jsonStr: string) {
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
    let payload: any[][] = [];
    while (payload.length < value.onboardConfigNum) {
      let arr: any[] = [];
      payload.push(arr);
    }
    value.allKeyConfigs = payload;
  } catch (err) {
    log_r(err);
  }
  return value;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export var DS: Record<string, any> = {};
Object.keys(__DS).forEach(function(name) {
  Object.defineProperty(DS, name, {
    get() { return __DS[name]; },
    set(v) { __DS[name] = v; },
    configurable: true
  });
});
Object.defineProperty(DS, 'current_usb_client', {
  get() { return current_usb_client; },
  set(v) { current_usb_client = v; },
  configurable: true
});
