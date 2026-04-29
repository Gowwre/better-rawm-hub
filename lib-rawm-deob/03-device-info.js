// ===== ACTION CONSTANTS & DEVICE INFO LAYER =================================
// SYNC_DATA is the payload string used in ping/sync frames.
// ACTION_* constants are postMessage action names that coordinate the UI with
// the data layer. Every window.postMessage({action: ...}) call uses one of
// these to tell the message handler what to refresh.

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

// Generates the query-string suffix for HTTP API calls (firmware check, config upload)
function basic_info(_0x49749e) {
  return "?os=4" + "&v=" + 0x9 + "&c=" + _0x49749e + "&a=" + "pc-rawmhub.game" + '&ta=' + "pc-rawmhub.game" + '&mac=' + (layui.device('os').os.toLowerCase() == "mac" ? 0x1 : 0x0);
}

// ===== DEVICE INFO MODEL =====================================================
// The device_info object is the canonical model for a peripheral's current
// state. Fields include: revision, revisionCode, hardwareCode, battery,
// resolution (CPI/DPI), pollingRate, light, cpiLevels, cpiLevelColors,
// esbAddress, esbAddressArr, powerMode, lod, keyDelay, motionSync,
// angleTuning, angleSnapping, rippleControl, txOutputPower, glassMode,
// hopChannel, onboardConfigNum, firmwareInfo, sensor name, brightness, etc.
//
// reset_device_info() initialises every field to safe defaults.
// parse_device_info() merges values from a JSON string received from the
// firmware (firmware sends a JSON device-info report during initial handshake).
// reset_device_cfg() ensures the device_cfg array (loaded from server) has
// default light colors, LOD values, etc.
// ============================================================================
function create_device_info() {
  var _0x4b0cd = {};
  return reset_device_info(_0x4b0cd);
}
function reset_device_cfg(_0x2fba49) {
  _0x2fba49.forEach(_0xc1b5f2 => {
    if (_0xc1b5f2.light_colors == undefined) {
      _0xc1b5f2.light_colors = [];
      _0xc1b5f2.light_colors.push("red");
      _0xc1b5f2.light_colors.push('green');
      _0xc1b5f2.light_colors.push('blue');
    }
    if (_0xc1b5f2.polling_rate_max == undefined) {
      _0xc1b5f2.polling_rate_max = 0x1f40;
    }
    if (_0xc1b5f2.angle_tuning == undefined) {
      _0xc1b5f2.angle_tuning = true;
    }
    if (_0xc1b5f2.lod == undefined) {
      _0xc1b5f2.lod = [];
      _0xc1b5f2.lod.push(0x1);
      _0xc1b5f2.lod.push(0x2);
    }
    if (_0xc1b5f2.glass_mode == undefined) {
      _0xc1b5f2.glass_mode = false;
    }
    if (_0xc1b5f2.oms == undefined) {
      _0xc1b5f2.oms = [];
    }
    if (_0xc1b5f2.hub == undefined) {
      _0xc1b5f2.hub = false;
    }
    if (_0xc1b5f2.rf_chn == undefined) {
      _0xc1b5f2.rf_chn = 0xff;
    }
    if (_0xc1b5f2.limit_memory == undefined) {
      _0xc1b5f2.limit_memory = false;
    }
    if (_0xc1b5f2.slow == undefined) {
      _0xc1b5f2.slow = true;
    }
  });
}
function reset_device_info(_0x541ce1) {
  _0x541ce1.revision = '';
  _0x541ce1.revisionCode = 0x0;
  _0x541ce1.hardwareCode = 0x0;
  _0x541ce1.battery = 0x64;
  _0x541ce1.configNum = -0x1;
  _0x541ce1.resolution = 0x640;
  _0x541ce1.pollingRate = -0x1;
  _0x541ce1.light = 48;
  _0x541ce1.cpiLevels = [0x190, 0x320, 0x640, 0xc80, 0x0, 0x0, 0x0, 0x0];
  _0x541ce1.cpiLevelColors = [1, 2, 6, 4, 0x0, 0x0, 0x0, 0x0];
  _0x541ce1.assist = [];
  _0x541ce1.macAddress = '';
  _0x541ce1.onboard = 0x0;
  _0x541ce1.powerMode = 0x2;
  _0x541ce1.esbAddress = '';
  _0x541ce1.esbChannel = 0xff;
  _0x541ce1.deviceName = '';
  _0x541ce1.productId = 0xffff;
  _0x541ce1.vendorId = 0x0;
  _0x541ce1.lod = 0x1;
  _0x541ce1.lodCalib = 0x0;
  _0x541ce1.keyDelay = [0x8, 0x8, 0x8, 0x8, 0x8, 0x8, 0x8];
  _0x541ce1.motionSync = 0x1;
  _0x541ce1.angleTuning = 0x0;
  _0x541ce1.angleSnapping = 0x0;
  _0x541ce1.rippleControl = 0x0;
  _0x541ce1.charging = 0x0;
  _0x541ce1.txOutputPower = 0xff;
  _0x541ce1.autoTxPower = 0x1;
  _0x541ce1.sleepTime = 0x3c;
  _0x541ce1.allKeyConfigs = [];
  _0x541ce1.peerInfo = [];
  _0x541ce1.batteryLevels = [0x1004, 0xfa0, 0xf6e, 0xf3c, 0xf0a, 0xed8, 0xea6, 0xe74, 0xdac, 0xce4, 0xc1c];
  _0x541ce1.colorCode = '';
  _0x541ce1["lzSupported;"] = false;
  _0x541ce1.rfChannel = 0x2;
  _0x541ce1.rssi = 0x0;
  _0x541ce1.crcSupported = false;
  _0x541ce1.luaStatus = 0xff;
  _0x541ce1.noack = 0x0;
  _0x541ce1.glassMode = 0x0;
  _0x541ce1.glassModeEnabled = 0x0;
  _0x541ce1.onboardConfigNum = 0x1;
  _0x541ce1.onboardIndex = 0x0;
  _0x541ce1.onboardStatus = [129, 130, 134, 132];
  _0x541ce1.firmwareInfo = {};
  _0x541ce1.squal = 0x0;
  _0x541ce1.equal = 0xff;
  _0x541ce1.txOutputPowerApplied = 0xff;
  _0x541ce1.enhancedCpi = false;
  _0x541ce1.dynamicGOM = false;
  _0x541ce1.wired = false;
  _0x541ce1.sensor = '';
  _0x541ce1.brightness = 0x80;
  _0x541ce1.hopChannelSupported = false;
  _0x541ce1.hopChannel = true;
  _0x541ce1.slow = true;
  _0x541ce1.kbd_onboardNum = 0x3;
  _0x541ce1.kbd_key_infos = [];
  _0x541ce1.kbd_socd_num = 0x0;
  _0x541ce1.kbd_socd_infos = [];
  _0x541ce1.kbd_mt_num = 0x0;
  _0x541ce1.kbd_mt_infos = [];
  _0x541ce1.kbd_rs_num = 0x0;
  _0x541ce1.kbd_rs_infos = [];
  _0x541ce1.kbd_dks_num = 0x0;
  _0x541ce1.kbd_dks_infos = [];
  _0x541ce1.kbd_light_info = {};
  _0x541ce1.kbd_axis_mode = 0x0;
  _0x541ce1.kbd_axis_infos = [];
  _0x541ce1.kbd_macro_num = 0x0;
  _0x541ce1.kbd_macro_max_size = 0x0;
  _0x541ce1.kbd_macro_infos = [];
  return _0x541ce1;
}
function reset_device_info_esb(_0x5c479f) {
  _0x5c479f.esbAddressArr = [];
  _0x5c479f.esbSelected = -0x1;
  return _0x5c479f;
}
function create_usb_client(_0x2ce8ab, _0x55f64d, _0x392bce) {
  var _0x422a78 = {
    device: _0x2ce8ab,
    product_esb_ch: _0x55f64d,
    recv_buf: new Uint8Array(0x0),
    send_event_buf: new Uint8Array(0x0),
    helloed: false,
    connected: false,
    device_name: '',
    virtual: _0x392bce,
    device_info: create_device_info(),
    esb_last_alive_time: new Date().getTime(),
    esb_alive_timeout: 0xbb8,
    pause: false,
    syncing: false,
    id: crypto.randomUUID(),
    allow_send: true,
    eplapsed_syncing_ms: 0x0,
    last_query_time: 0x0,
    onboard_index: 0x0,
    querying_more_result: false
  };
  return _0x422a78;
}
function is_supported(_0x178c93) {
  var _0xed0125 = false;
  device_cfg.forEach(_0x5c6963 => {
    if (_0x5c6963.product_id == _0x178c93.toString(0x10)) {
      _0xed0125 = true;
    }
  });
  return _0xed0125;
}
function get_cfg(_0x121434) {
  var _0x2255e6 = undefined;
  if (_0x121434.virtual) {
    device_cfg.forEach(_0x39024e => {
      if (_0x39024e.name == _0x121434.device_name) {
        _0x2255e6 = _0x39024e;
      }
    });
  } else {
    device_cfg.forEach(_0x99b9f6 => {
      if (_0x99b9f6.product_id == _0x121434.device.productId.toString(0x10)) {
        _0x2255e6 = _0x99b9f6;
      }
    });
  }
  return _0x2255e6;
}
function is_receiver(_0x22637c) {
  var _0x14b165 = get_cfg(_0x22637c);
  return _0x14b165 != undefined ? _0x14b165.receiver : false;
}
function is_slow_receiver(_0x243858) {
  if (!_0x243858.device_info.slow) {
    return _0x243858.device_info.slow;
  } else {
    var _0x2c160c = get_cfg(_0x243858);
    return _0x2c160c != undefined ? _0x2c160c.slow : true;
  }
}
function is_hub(_0x5078af) {
  var _0x3968d9 = get_cfg(_0x5078af);
  return _0x3968d9 != undefined ? _0x3968d9.hub : false;
}
function is_keyboard(_0x4fb526) {
  return _0x4fb526 != undefined ? is_hs_keyboard(_0x4fb526.device) : false;
}
function is_keyboard_device(_0x3db738) {
  var _0x173b03 = get_cfg(_0x3db738);
  return _0x173b03 != undefined ? _0x173b03.keyboard : false;
}
function is_connected(_0x2991a4) {
  return _0x2991a4.connected != undefined ? _0x2991a4.connected : false;
}
function get_display_name(_0x41db23) {
  var _0x1eab5e = get_cfg(_0x41db23);
  return _0x1eab5e != undefined ? _0x1eab5e.display_name : _0x41db23.device_name;
}
function get_display_name_model(_0x429ee4) {
  var _0xf091c9 = get_cfg(_0x429ee4);
  return _0xf091c9 != undefined && _0xf091c9.display_name_model != undefined ? _0xf091c9.display_name_model : '';
}
function get_product_id_hex_str(_0x18647b) {
  var _0x2fe879 = '';
  if (_0x18647b.virtual) {
    device_cfg.forEach(_0xfe3390 => {
      if (_0xfe3390.name == _0x18647b.device_name) {
        _0x2fe879 = _0xfe3390.product_id;
      }
    });
  } else {
    _0x2fe879 = _0x18647b.device.productId.toString(0x10);
  }
  return _0x2fe879;
}
function is_battery_percent_supported(_0x38bd72) {
  var _0x497825 = get_cfg(_0x38bd72);
  if (_0x497825 != undefined) {
    var _0x5db6f0 = false;
    _0x497825.battery_levels.forEach(_0x26bb58 => {
      if (_0x26bb58 != 0x0) {
        _0x5db6f0 = true;
      }
    });
    return _0x5db6f0;
  } else {
    return false;
  }
}
function get_esb_addr(_0x1fafc5, _0x4eee45) {
  if (_0x4eee45 == 0xff || _0x1fafc5.esbAddress.length == 0x0) {
    return _0x1fafc5.esbAddress;
  } else {
    var _0x506641;
    var _0x6c4174;
    _0x506641 = _0x1fafc5.esbAddress.substr(16, 2);
    if (_0x4eee45 == 0x0) {
      _0x6c4174 = _0x1fafc5.esbAddress.substr(0x0, 8);
    } else {
      _0x6c4174 = _0x1fafc5.esbAddress.substr(8, 8);
    }
    return _0x506641 + _0x6c4174;
  }
}
function is_esb_addr_arr_existed(_0x2b10c4, _0x45a47d, _0x1ac44c) {
  var _0x44fbbb = false;
  if (_0x2b10c4.esbAddressArr != undefined) {
    var _0x9793d3;
    var _0x47fa10;
    _0x2b10c4.esbAddressArr.forEach(_0x42ef93 => {
      _0x9793d3 = _0x42ef93.substr(16, 2);
      if (_0x45a47d == 0x0) {
        _0x47fa10 = _0x42ef93.substr(0x0, 8);
      } else {
        _0x47fa10 = _0x42ef93.substr(8, 8);
      }
      if (_0x9793d3 + _0x47fa10 == _0x1ac44c) {
        _0x44fbbb = true;
      }
    });
  }
  return _0x44fbbb;
}
function get_esb_addr_arr(_0x124584, _0x5d2ed1) {
  if (_0x5d2ed1 == 0xff || _0x124584.esbAddressArr == undefined || _0x124584.esbAddressArr.length == 0x0 || _0x124584.esbSelected < 0x0 || _0x124584.esbSelected >= _0x124584.esbAddressArr.length) {
    return '';
  } else {
    var _0x216409;
    var _0x3ace70;
    var _0x239f9d;
    _0x216409 = _0x124584.esbAddressArr[_0x124584.esbSelected];
    _0x3ace70 = _0x216409.substr(16, 2);
    if (_0x5d2ed1 == 0x0) {
      _0x239f9d = _0x216409.substr(0x0, 8);
    } else {
      _0x239f9d = _0x216409.substr(8, 8);
    }
    return _0x3ace70 + _0x239f9d;
  }
}
function get_esb_channel(_0x21e029) {
  return _0x21e029.product_esb_ch == 0xff ? _0x21e029.device_info.esbChannel : _0x21e029.product_esb_ch;
}
function get_usb_client(_0x33b226) {
  var _0x18b350 = undefined;
  usb_client_list.forEach(_0x1969b1 => {
    if (_0x1969b1.id == _0x33b226) {
      _0x18b350 = _0x1969b1;
    }
  });
  return _0x18b350;
}
function get_color_codes(_0x3907a2) {
  var _0x3ca823 = get_cfg(_0x3907a2);
  return _0x3ca823 != undefined ? _0x3ca823.models : [];
}
function get_color_code(_0x85be85) {
  var _0x26f650 = _0x85be85.device_info.colorCode;
  if (_0x26f650 == undefined || _0x26f650 == '') {
    _0x26f650 = '';
  } else {
    var _0xae1e8c = false;
    get_color_codes(_0x85be85).forEach(_0x10f566 => {
      if (_0x10f566 == _0x26f650) {
        _0xae1e8c = true;
      }
    });
    if (!_0xae1e8c) {
      _0x26f650 = '';
    }
  }
  return _0x26f650;
}
function is_enhanced_cpi(_0x5518a6) {
  return _0x5518a6.device_info.enhancedCpi;
}
function is_dynamic_gom(_0x43884a) {
  return _0x43884a.device_info.dynamicGOM;
}
function get_cpi(_0x2872cd) {
  return _0x2872cd.device_info.resolution;
}
function get_cpi_range(_0x3ec055) {
  var _0x68b427 = get_cfg(_0x3ec055);
  return _0x68b427 != undefined ? _0x68b427.cpi_range : [];
}
function get_cpi_step(_0x427cba) {
  var _0xc2d18f = get_cfg(_0x427cba);
  return _0xc2d18f != undefined ? _0x427cba.device_info.enhancedCpi ? 0x1 : _0xc2d18f.cpi_step : 0x1;
}
function set_cpi(_0x1decc5, _0x2c7cb9, _0x2827a5 = true) {
  var _0x2d18b9 = get_cpi_range(_0x1decc5);
  var _0x84cc78 = _0x2c7cb9 & 0xffff;
  var _0x5c9e95 = _0x2c7cb9 >> 0x10 & 0xffff;
  if (_0x84cc78 < _0x2d18b9[0x0]) {
    _0x84cc78 = _0x2d18b9[0x0];
  } else if (_0x84cc78 > _0x2d18b9[0x1]) {
    _0x84cc78 = _0x2d18b9[0x1];
  }
  if (_0x5c9e95 != 0x0) {
    if (_0x5c9e95 < _0x2d18b9[0x0]) {
      _0x5c9e95 = _0x2d18b9[0x0];
    } else if (_0x5c9e95 > _0x2d18b9[0x1]) {
      _0x5c9e95 = _0x2d18b9[0x1];
    }
  }
  _0x2c7cb9 = _0x84cc78 | _0x5c9e95 << 0x10;
  if (_0x1decc5.device_info.resolution != _0x2c7cb9) {
    _0x1decc5.device_info.resolution = _0x2c7cb9;
    if (_0x2827a5) {
      send_event_mouse_param(_0x1decc5);
    }
    return true;
  }
  return false;
}
function is_cpi_xy_supported(_0x23e7ee) {
  var _0x2b64dd = get_cfg(_0x23e7ee);
  return _0x2b64dd != undefined ? _0x2b64dd.cpi_xy : false;
}
function is_oms(_0x46c17a, _0x1431aa) {
  var _0x33c264 = get_cfg(_0x46c17a);
  return _0x33c264 != undefined ? _0x1431aa >= 0x0 ? _0x33c264.oms.indexOf(_0x1431aa) >= 0x0 : _0x33c264.oms.length > 0x0 : false;
}
function get_cpi_levels(_0x54023e) {
  return _0x54023e.device_info.cpiLevels;
}
function get_cpi_level_colors(_0x55a70e) {
  return _0x55a70e.device_info.cpiLevelColors;
}
function set_cpi_level(_0x426019, _0x595f87, _0x1369e2, _0x1981e5 = true) {
  if (_0x426019.device_info.cpiLevels[_0x595f87] != _0x1369e2) {
    _0x426019.device_info.cpiLevels[_0x595f87] = _0x1369e2;
  }
  if (_0x1981e5) {
    send_event_mouse_param(_0x426019);
  }
}
function set_cpi_level_color(_0x556f2f, _0x567012, _0x3cc7bf) {
  if (_0x556f2f.device_info.cpiLevelColors[_0x567012] != _0x3cc7bf) {
    _0x556f2f.device_info.cpiLevelColors[_0x567012] = _0x3cc7bf;
    send_event_mouse_param(_0x556f2f);
  }
}
function remove_cpi_level(_0x56e32e, _0x1f124c) {
  _0x56e32e.device_info.cpiLevels.splice(_0x1f124c, 0x1);
  _0x56e32e.device_info.cpiLevels.push(0x0);
  _0x56e32e.device_info.cpiLevelColors.splice(_0x1f124c, 0x1);
  _0x56e32e.device_info.cpiLevelColors.push(0x0);
  send_event_mouse_param(_0x56e32e);
}
function add_cpi_level(_0x42c243, _0x23bc23, _0x2348ad) {
  for (let _0xa22a1e = 0x0; _0xa22a1e < _0x42c243.device_info.cpiLevels.length; _0xa22a1e++) {
    if (_0x42c243.device_info.cpiLevels[_0xa22a1e] == 0x0) {
      _0x42c243.device_info.cpiLevels[_0xa22a1e] = _0x23bc23;
      _0x42c243.device_info.cpiLevelColors[_0xa22a1e] = _0x2348ad;
      send_event_mouse_param(_0x42c243);
      break;
    }
  }
}
function get_polling_rates(_0x473848, _0x16bff0) {
  var _0x1be25a = get_cfg(_0x473848);
  if (_0x1be25a != undefined) {
    var _0x4229f0 = _0x1be25a.polling_rates.slice();
    _0x16bff0.forEach(_0x2081b7 => {
      if (_0x2081b7.connected != undefined ? _0x2081b7.connected : false) {
        if (is_receiver(_0x2081b7)) {
          if (_0x473848.device == _0x2081b7.device) {
            var _0x831af3 = get_cfg(_0x2081b7);
            if (_0x831af3 != undefined && _0x831af3.boost_polling_rates != undefined) {
              _0x831af3.boost_polling_rates.forEach(_0x36b728 => {
                if (!_0x4229f0.includes(_0x36b728)) {
                  _0x4229f0.push(_0x36b728);
                }
              });
            }
          }
        }
      }
    });
    var _0x285739 = _0x473848.device_info.pollingRate;
    for (var _0x301457 = 0x7d; _0x301457 <= _0x285739; _0x301457 *= 0x2) {
      if (!_0x4229f0.includes(_0x301457)) {
        _0x4229f0.push(_0x301457);
      }
    }
    return _0x4229f0;
  } else {
    return [];
  }
}
function get_max_polling_rate(_0x329e2f, _0x31af28) {
  var _0x3bbd26;
  if (true && !_0x329e2f.virtual && !is_keyboard_device(_0x329e2f)) {
    _0x3bbd26 = 0x3e8;
    var _0x1ffa59 = get_cfg(_0x329e2f);
    if (_0x1ffa59 != undefined) {
      var _0x391d70 = _0x1ffa59.polling_rates;
      if (_0x391d70 != undefined && _0x391d70.length > 0x0) {
        _0x3bbd26 = _0x391d70[_0x391d70.length - 0x1];
      }
    }
  } else {
    _0x3bbd26 = 0x3e8;
    _0x31af28.forEach(_0x264b3f => {
      if (_0x264b3f.connected != undefined ? _0x264b3f.connected : false) {
        if (is_receiver(_0x264b3f)) {
          if (_0x329e2f.device == _0x264b3f.device) {
            var _0x230b2b = get_cfg(_0x264b3f);
            if (_0x230b2b != undefined && _0x230b2b.boost_polling_rates != undefined) {
              _0x230b2b.boost_polling_rates.forEach(_0x4bb52c => {
                if (_0x4bb52c > _0x3bbd26) {
                  _0x3bbd26 = _0x4bb52c;
                }
              });
            }
          }
        }
      }
    });
  }
  var _0x1ffa59 = get_cfg(_0x329e2f);
  return _0x1ffa59 != undefined ? _0x3bbd26 < _0x1ffa59.polling_rate_max ? _0x3bbd26 : _0x1ffa59.polling_rate_max : _0x3bbd26;
}
function get_max_power_polling_rate(_0x31875c) {
  var _0x36285c = 0x1f40;
  var _0xe63601 = get_power_modes(_0x31875c);
  if (_0xe63601.length >= 0x3 && _0x31875c.device_info.powerMode == 0x0) {
    _0x36285c = 0x7d;
  } else if (_0xe63601.length >= 0x3 && _0x31875c.device_info.powerMode == 0x1) {
    _0x36285c = 0x3e8;
  }
  return _0x36285c;
}
function get_polling_rate(_0xa5ec31) {
  return _0xa5ec31.device_info.pollingRate;
}
function set_polling_rate(_0x9f42e0, _0x416147) {
  if (_0x9f42e0.device_info.pollingRate != _0x416147) {
    _0x9f42e0.device_info.pollingRate = _0x416147;
    send_event_mouse_param(_0x9f42e0);
    return true;
  }
  return false;
}
function get_light(_0x2a2cb7) {
  return _0x2a2cb7.device_info.light;
}
function set_light(_0x5f43e7, _0x15e26b) {
  if (is_receiver(_0x5f43e7)) {
    if (_0x5f43e7.device_info.light != _0x15e26b) {
      _0x5f43e7.device_info.light = _0x15e26b;
      var _0x1fb958 = [];
      _0x1fb958.push(0x3);
      _0x1fb958.push(0x0);
      _0x1fb958.push(0x12);
      _0x1fb958.push(_0x15e26b);
      send_event(_0x5f43e7, crc_process(_0x5f43e7, _0x1fb958));
      return true;
    }
  } else {
    if (_0x5f43e7.device_info.light != _0x15e26b) {
      _0x5f43e7.device_info.light = _0x15e26b | 8;
      send_event_mouse_param(_0x5f43e7);
      return true;
    }
  }
  return false;
}
function is_light(_0xefb531) {
  var _0x3fa181 = get_cfg(_0xefb531);
  return _0x3fa181 != undefined ? _0x3fa181.light : false;
}
function get_light_colors(_0x27115b) {
  var _0x28aec3 = get_cfg(_0x27115b);
  return _0x28aec3 != undefined ? _0x28aec3.light_colors : [];
}
function get_light_display_colors(_0x408125) {
  var _0x112c1e = get_light_colors(_0x408125);
  var _0x4180c3 = [];
  if (_0x112c1e.includes("red") && _0x112c1e.includes("green") && _0x112c1e.includes("blue")) {
    _0x4180c3.push("white");
  }
  if (_0x112c1e.includes('red')) {
    _0x4180c3.push("red");
  }
  if (_0x112c1e.includes("green")) {
    _0x4180c3.push("green");
  }
  if (_0x112c1e.includes("blue")) {
    _0x4180c3.push("blue");
  }
  if (_0x112c1e.includes("red") && _0x112c1e.includes('green')) {
    _0x4180c3.push("yellow");
  }
  if (_0x112c1e.includes('red') && _0x112c1e.includes("blue")) {
    _0x4180c3.push("purple");
  }
  if (_0x112c1e.includes('green') && _0x112c1e.includes("blue")) {
    _0x4180c3.push("skyblue");
  }
  _0x4180c3.push("none");
  return _0x4180c3;
}
function get_power_modes(_0x42c2c9) {
  var _0x48058f = get_cfg(_0x42c2c9);
  return _0x48058f != undefined ? _0x48058f.power_modes : [];
}
function get_power_modes2(_0x172cfb) {
  var _0x1f243d = get_cfg(_0x172cfb);
  return _0x1f243d != undefined ? _0x1f243d.power_modes2 : [];
}
function get_power_mode_tips(_0x57af85) {
  var _0x466f45 = get_cfg(_0x57af85);
  return _0x466f45 != undefined ? _0x466f45.power_mode_tips : [];
}
function get_power_mode(_0x4030bb) {
  return _0x4030bb.device_info.powerMode;
}
function set_power_mode(_0x5ea7c3, _0x529295) {
  if (_0x5ea7c3.device_info.powerMode != _0x529295) {
    _0x5ea7c3.device_info.powerMode = _0x529295;
    send_event_mouse_param(_0x5ea7c3);
    return true;
  }
  return false;
}
function get_lods_list(_0x413fc0) {
  var _0x5b891b = get_cfg(_0x413fc0);
  return _0x5b891b != undefined ? _0x5b891b.lods : [];
}
function get_lod(_0x41ee0e) {
  return _0x41ee0e.device_info.lod;
}
function set_lod(_0x2d489a, _0x921b53) {
  if (_0x2d489a.device_info.lod != _0x921b53) {
    _0x2d489a.device_info.lod = _0x921b53;
    send_event_mouse_param(_0x2d489a);
    return true;
  }
  return false;
}
function get_angle_snapping(_0x4518c4) {
  return _0x4518c4.device_info.angleSnapping;
}
function set_angle_snapping(_0x305d3c, _0x5674ff) {
  if (_0x305d3c.device_info.angleSnapping != _0x5674ff) {
    _0x305d3c.device_info.angleSnapping = _0x5674ff;
    send_event_mouse_param(_0x305d3c);
    return true;
  }
  return false;
}
function get_ripple_control(_0x1e6a32) {
  return _0x1e6a32.device_info.rippleControl;
}
function set_ripple_control(_0x26fab5, _0x592020) {
  if (_0x26fab5.device_info.rippleControl != _0x592020) {
    _0x26fab5.device_info.rippleControl = _0x592020;
    send_event_mouse_param(_0x26fab5);
    return true;
  }
  return false;
}
function get_motion_sync(_0xfa1106) {
  return _0xfa1106.device_info.motionSync;
}
function set_motion_sync(_0x18390, _0x521db4) {
  if (_0x18390.device_info.motionSync != _0x521db4) {
    _0x18390.device_info.motionSync = _0x521db4;
    send_event_mouse_param(_0x18390);
    return true;
  }
  return false;
}
function get_wireless_turbo(_0xad6837) {
  return _0xad6837.device_info.txOutputPower == 0x0 ? 0x0 : 0x1;
}
function is_auto_tx_power(_0x25229c) {
  return _0x25229c.device_info.autoTxPower;
}
function set_wireless_turbo(_0x3eb6e1, _0x5c9baf) {
  if (_0x5c9baf == 0x1) {
    if (_0x3eb6e1.device_info.txOutputPower != 0x8) {
      _0x3eb6e1.device_info.txOutputPower = 0x8;
      send_event_mouse_param(_0x3eb6e1);
    }
  } else if (_0x3eb6e1.device_info.txOutputPower != 0x0) {
    _0x3eb6e1.device_info.txOutputPower = 0x0;
    send_event_mouse_param(_0x3eb6e1);
  }
}
function get_tx_power_applied(_0x32b58d) {
  return _0x32b58d.device_info.txOutputPowerApplied;
}
function get_rf_channel(_0x5eaec9) {
  return _0x5eaec9.device_info.rfChannel;
}
function get_sleep_time(_0x59581d) {
  return _0x59581d.device_info.sleepTime;
}
function is_angle_tuning_supported(_0x1ea6b9) {
  var _0x5c0e08 = get_cfg(_0x1ea6b9);
  return _0x5c0e08 != undefined ? _0x5c0e08.angle_tuning : true;
}
function get_angle_tuning(_0x64b014) {
  return _0x64b014.device_info.angleTuning;
}
function set_angle_tuning(_0x847de, _0x26fee0) {
  if (_0x847de.device_info.angleTuning != _0x26fee0) {
    _0x847de.device_info.angleTuning = _0x26fee0;
    send_event_mouse_param(_0x847de);
    return true;
  }
  return false;
}
function get_key_delay(_0x3e993b) {
  return _0x3e993b.device_info.keyDelay;
}
function get_onboard_index(_0x13e02e) {
  return _0x13e02e.device_info.onboardIndex;
}
function get_onboard_status(_0x5e1f5d) {
  return _0x5e1f5d.device_info.onboardStatus;
}
function set_onboard_status(_0x26e41a, _0x14cd09, _0xb3b8a1) {
  if (_0x26e41a.device_info.onboardStatus[_0x14cd09] != _0xb3b8a1) {
    _0x26e41a.device_info.onboardStatus[_0x14cd09] = _0xb3b8a1;
    send_event_mouse_param(_0x26e41a);
    return true;
  }
  return false;
}
function get_key_configs(_0x1eebd3) {
  return JSON.parse(JSON.stringify(_0x1eebd3.device_info.allKeyConfigs));
}
function set_key_delay(_0x25e2f7, _0x1707b2, _0x8e8b53) {
  if (_0x25e2f7.device_info.keyDelay[_0x1707b2] != _0x8e8b53) {
    _0x25e2f7.device_info.keyDelay[_0x1707b2] = _0x8e8b53;
    return true;
  }
  return false;
}
function is_enhancement(_0x4d6236) {
  var _0x5e3533 = get_cfg(_0x4d6236);
  return _0x5e3533 != undefined ? _0x5e3533.enhancement : false;
}
function is_glass_mode(_0x3c6fce) {
  return _0x3c6fce.device_info.glassMode != undefined ? _0x3c6fce.device_info.glassMode == 0x1 : false;
}
function is_glass_mode_enabled(_0x389c7d) {
  return _0x389c7d.device_info.glassModeEnabled != undefined ? _0x389c7d.device_info.glassModeEnabled == 0x1 : false;
}
function is_glass_mode_supported(_0x203434) {
  var _0x2a8e99 = get_cfg(_0x203434);
  return _0x2a8e99 != undefined ? _0x2a8e99.glass_mode : false;
}
function set_enable_glass_mode(_0x4cf476, _0x334a6e) {
  if (_0x4cf476.device_info.glassModeEnabled != _0x334a6e) {
    _0x4cf476.device_info.glassModeEnabled = _0x334a6e;
    send_event_mouse_param(_0x4cf476);
    return true;
  }
  return false;
}
function set_auto_tx_power(_0x2507f0, _0x48bfb9) {
  if (_0x2507f0.device_info.autoTxPower != _0x48bfb9) {
    _0x2507f0.device_info.autoTxPower = _0x48bfb9;
    send_event_mouse_param(_0x2507f0);
    return true;
  }
  return false;
}
function is_new_firmware_existed(_0x7a999e) {
  if (_0x7a999e.helloed) {
    if (_0x7a999e.device_info.firmwareInfo != undefined && _0x7a999e.device_info.firmwareInfo.code >= 0x0) {
      return _0x7a999e.device_info.firmwareInfo.code > _0x7a999e.device_info.revisionCode;
    }
  }
  return false;
}
function get_firmware_log(_0x389e29) {
  return _0x389e29.device_info.firmwareInfo.log;
}
function get_firmware_name(_0x582cbd) {
  return _0x582cbd.device_info.firmwareInfo.name;
}
function get_keys(_0x50acc8) {
  var _0xa8f03e = get_cfg(_0x50acc8);
  return _0xa8f03e != undefined ? _0xa8f03e.keys : [];
}
function get_shortcuts(_0x1828ca) {
  var _0xa4d385 = get_cfg(_0x1828ca);
  return _0xa4d385 != undefined ? _0xa4d385.shortcuts : [];
}
function get_setup_icon(_0x429aab) {
  var _0x2e1be3 = get_cfg(_0x429aab);
  return _0x2e1be3 != undefined ? _0x2e1be3.setup_icon : '';
}
function is_wired_mode(_0x3dd99e) {
  return true && !_0x3dd99e.virtual;
}
function is_ble_mode(_0x26aa36) {
  return false;
}
function is_gaming_only_mode(_0x13a85f) {
  return _0x13a85f.device_info != undefined && _0x13a85f.device_info.revision != undefined && _0x13a85f.device_info.revision.substr(0x0, 0x2) == 'G-';
}
function get_squal(_0x4ec827) {
  return _0x4ec827.device_info.squal;
}
function get_equal(_0x4ae1f4) {
  return _0x4ae1f4.device_info.equal;
}
function is_wired(_0x429739) {
  return _0x429739.device_info.wired;
}
function get_default_rf_channel(_0x12966e) {
  var _0x22f3d0 = get_cfg(_0x12966e);
  return _0x22f3d0 != undefined ? _0x22f3d0.rf_chn : 0xff;
}
function is_limit_memory(_0x1ae00c) {
  var _0x1345c4 = get_cfg(_0x1ae00c);
  return _0x1345c4 != undefined ? _0x1345c4.limit_memory : false;
}
function get_soc(_0x4cabf4) {
  var _0x449a8e = get_cfg(_0x4cabf4);
  return _0x449a8e != undefined ? _0x449a8e.soc : "UNKNOWN";
}
function is_soc_compatible(_0x5e57f9, _0xfba5c0) {
  var _0x1c7280 = get_soc(_0x5e57f9);
  var _0x3cc400 = get_soc(_0xfba5c0);
  return _0x1c7280 == _0x3cc400 || _0x1c7280 == "NORDIC" && _0x3cc400 == "NORDIC2" || _0x1c7280 == "NORDIC2" && _0x3cc400 == "NORDIC";
}
function is_bt_supported(_0x15a92f) {
  var _0x416c45 = get_cfg(_0x15a92f);
  return _0x416c45 != undefined ? _0x416c45.working_modes.includes('bt') : false;
}
function is_hopping_channel_supported(_0x26fa5c) {
  return _0x26fa5c.device_info.hopChannelSupported;
}
function is_hopping_channel(_0x3ab97d) {
  return _0x3ab97d.device_info.hopChannel;
}
function is_brightness_supported(_0x2356ea) {
  var _0x3c6d78 = get_cfg(_0x2356ea);
  return _0x3c6d78 != undefined ? _0x3c6d78.brightness : false;
}
function get_brightness(_0x3f3473) {
  return _0x3f3473.device_info.brightness;
}
function parse_device_info(_0x2711ee, _0x5d7e63) {
  try {
    var _0x37087d = JSON.parse(_0x5d7e63);
    if (_0x37087d.revision != undefined) {
      _0x2711ee.revision = _0x37087d.revision;
    } else if (_0x37087d.r != undefined) {
      _0x2711ee.revision = _0x37087d.r;
    }
    if (_0x37087d.revision_code != undefined) {
      _0x2711ee.revisionCode = _0x37087d.revision_code;
    } else if (_0x37087d.rc != undefined) {
      _0x2711ee.revisionCode = _0x37087d.rc;
    }
    if (_0x37087d.hw != undefined) {
      _0x2711ee.hardwareCode = _0x37087d.hw;
    }
    if (_0x37087d.battery != undefined) {
      _0x2711ee.battery = _0x37087d.battery;
    }
    if (_0x37087d.addr != undefined) {
      _0x2711ee.macAddress = _0x37087d.addr;
    }
    if (_0x37087d.config_num != undefined) {
      _0x2711ee.configNum = _0x37087d.config_num;
    } else if (_0x37087d.cn != undefined) {
      _0x2711ee.configNum = _0x37087d.cn;
    }
    if (_0x37087d.cpi != undefined) {
      _0x2711ee.resolution = _0x37087d.cpi;
    }
    if (_0x37087d.polling != undefined) {
      _0x2711ee.pollingRate = _0x37087d.polling;
    }
    if (_0x37087d.light != undefined) {
      _0x2711ee.light = _0x37087d.light;
    }
    if (_0x37087d.cpi_l != undefined) {
      _0x2711ee.cpiLevels = _0x37087d.cpi_l;
    }
    if (_0x37087d.cpi_l_c != undefined) {
      _0x2711ee.cpiLevelColors = _0x37087d.cpi_l_c;
    }
    if (_0x37087d.ob != undefined) {
      _0x2711ee.onboard = _0x37087d.ob;
    }
    if (_0x37087d.esb_addr != undefined && !Array.isArray(_0x37087d.esb_addr)) {
      _0x2711ee.esbAddress = _0x37087d.esb_addr;
    }
    if (_0x37087d.esb_addr != undefined && Array.isArray(_0x37087d.esb_addr)) {
      _0x2711ee.esbAddressArr = _0x37087d.esb_addr;
    }
    if (_0x37087d.esb_selected != undefined) {
      _0x2711ee.esbSelected = _0x37087d.esb_selected;
    }
    if (_0x37087d.esb_ch != undefined) {
      _0x2711ee.esbChannel = _0x37087d.esb_ch;
    }
    if (_0x37087d.pm != undefined) {
      _0x2711ee.powerMode = _0x37087d.pm;
    }
    if (_0x37087d.dn != undefined) {
      _0x2711ee.deviceName = _0x37087d.dn;
    }
    if (_0x37087d.pi != undefined) {
      _0x2711ee.productId = _0x37087d.pi;
    }
    if (_0x37087d.vi != undefined) {
      _0x2711ee.vendorId = _0x37087d.vi;
    }
    if (_0x37087d.lod != undefined) {
      _0x2711ee.lod = _0x37087d.lod;
    }
    if (_0x37087d.lod_c != undefined) {
      _0x2711ee.lodCalib = _0x37087d.lod_c;
    }
    if (_0x37087d.kd != undefined) {
      _0x2711ee.keyDelay = _0x37087d.kd;
    }
    if (_0x37087d.ms != undefined) {
      _0x2711ee.motionSync = _0x37087d.ms;
    }
    if (_0x37087d.at != undefined) {
      _0x2711ee.angleTuning = _0x37087d.at << 0x18 >> 0x18;
    }
    if (_0x37087d.as != undefined) {
      _0x2711ee.angleSnapping = _0x37087d.as;
    }
    if (_0x37087d.rctrl != undefined) {
      _0x2711ee.rippleControl = _0x37087d.rctrl;
    }
    if (_0x37087d.chr != undefined) {
      _0x2711ee.charging = _0x37087d.chr;
    }
    if (_0x37087d.top != undefined) {
      _0x2711ee.txOutputPower = _0x37087d.top;
      _0x2711ee.txOutputPowerApplied = _0x2711ee.txOutputPower;
    }
    if (_0x37087d.atp != undefined) {
      _0x2711ee.autoTxPower = _0x37087d.atp;
    }
    if (_0x37087d.co != undefined) {
      _0x2711ee.colorCode = _0x37087d.co;
    }
    if (_0x37087d.lz != undefined) {
      _0x2711ee.lzSupported = _0x37087d.lz == 0x1;
    }
    if (_0x37087d.st != undefined) {
      _0x2711ee.sleepTime = _0x37087d.st;
    }
    if (_0x37087d.rf_ch != undefined) {
      _0x2711ee.rfChannel = _0x37087d.rf_ch;
    }
    if (_0x37087d.crc != undefined) {
      _0x2711ee.crcSupported = _0x37087d.crc == 0x1;
    }
    if (_0x37087d.lua != undefined) {
      _0x2711ee.luaStatus = _0x37087d.lua;
    }
    if (_0x37087d.noack != undefined) {
      _0x2711ee.noack = _0x37087d.noack;
    }
    if (_0x37087d.gm != undefined) {
      if (Array.isArray(_0x37087d.gm)) {
        _0x2711ee.glassMode = _0x37087d.gm[0x0];
        _0x2711ee.glassModeEnabled = _0x37087d.gm[0x1];
      } else {
        _0x2711ee.glassMode = _0x37087d.gm;
        _0x2711ee.glassModeEnabled = 0x1;
      }
    }
    if (_0x37087d.ocn != undefined) {
      _0x2711ee.onboardConfigNum = _0x37087d.ocn;
    }
    if (_0x37087d.oci != undefined) {
      _0x2711ee.onboardIndex = _0x37087d.oci;
    }
    if (_0x37087d.ocs != undefined) {
      _0x2711ee.onboardStatus = _0x37087d.ocs;
    }
    if (_0x37087d.ec != undefined) {
      _0x2711ee.enhancedCpi = _0x37087d.ec == 0x1;
    }
    if (_0x37087d.dgom != undefined) {
      _0x2711ee.dynamicGOM = _0x37087d.dgom == 0x1;
    }
    if (_0x37087d.wired != undefined) {
      _0x2711ee.wired = _0x37087d.wired == 0x1;
    }
    if (_0x37087d.sst != undefined) {
      _0x2711ee.sensor = _0x37087d.sst;
    }
    if (_0x37087d.lbn != undefined) {
      _0x2711ee.brightness = _0x37087d.lbn;
    }
    if (_0x37087d.hc != undefined) {
      _0x2711ee.hopChannelSupported = _0x37087d.hc != 0xff;
      _0x2711ee.hopChannel = _0x37087d.hc == 0x1;
    }
    if (_0x37087d.slow != undefined) {
      _0x2711ee.slow = _0x37087d.slow == 0x1;
    }
    let _0x12cdbe = [];
    while (_0x12cdbe.length < _0x2711ee.onboardConfigNum) {
      let _0x5c0ae7 = [];
      _0x12cdbe.push(_0x5c0ae7);
    }
    _0x2711ee.allKeyConfigs = _0x12cdbe;
  } catch (_0x1f0946) {
    log_r(_0x1f0946);
  }
  return _0x2711ee;
}
