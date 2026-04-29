function send_event_config_reset(_0x3f4244) {
  var _0x522ad6 = [];
  _0x522ad6.push(0x3);
  _0x522ad6.push(0x0);
  _0x522ad6.push(0x3);
  send_event(_0x3f4244, crc_process(_0x3f4244, _0x522ad6));
}
function send_event_factory_reset(_0x4fe6a1, _0x4d7d92) {
  send_event_action(_0x4fe6a1, 0x35, _0x4d7d92 ? 0x1 : 0x0);
  _0x4fe6a1.device_info.pollingRate = -0x1;
}
function query_firmware(_0x4c8d91, _0x109509) {
  var _0x4704f5 = new XMLHttpRequest();
  _0x4704f5.onreadystatechange = function () {
    if (this.readyState == 0x4 && this.status == 0xc8) {
      try {
        if (this.responseText.length > 0x0) {
          _0x4c8d91.device_info.firmwareInfo = JSON.parse(this.responseText);
        }
      } catch (_0x2dda27) {
        log_r(_0x2dda27);
      }
      if (navigator.hid != undefined) {
        window.postMessage({
          'action': ACTION_UI_REFRESH_CURRENT_CLIENT
        });
      }
    }
  };
  _0x4704f5.open("GET", "https://www.miracletek.net/game/firmware.php" + ("?os=4" + "&v=" + 0x9 + "&c=" + 0x1 + "&a=" + "pc-rawmhub.game" + '&ta=' + "pc-rawmhub.game" + '&mac=' + (layui.device('os').os.toLowerCase() == "mac" ? 0x1 : 0x0)) + '&devName=' + _0x4c8d91.device_info.deviceName + '&vendorId=' + _0x4c8d91.device_info.vendorId + "&productId=" + _0x4c8d91.device_info.productId + "&devRevName=" + _0x4c8d91.device_info.revision + "&devRevCode=" + _0x4c8d91.device_info.revisionCode + "&devHwCode=" + _0x4c8d91.device_info.hardwareCode + "&devMode=" + 0x1 + "&devFwChn=" + _0x109509, true);
  _0x4704f5.send();
}
function upload_mouse_config(_0x20d609, _0x57731a, _0x5d5710) {
  var _0x3bac03 = new XMLHttpRequest();
  _0x3bac03.onreadystatechange = function () {
    if (this.readyState == 0x4 && this.status == 0xc8) {
      try {
        if (this.responseText.length > 0x0) {
          log_r(this.responseText);
        }
      } catch (_0x32c5d4) {
        log_r(_0x32c5d4);
      }
    }
  };
  var _0x2cc53a = new BigNumber(0x0);
  var _0x3e79a2 = new BigNumber(0x1);
  var _0x2a2884 = _0x20d609.device_info.keyDelay;
  for (var _0x3afbc1 = 0x0; _0x3afbc1 < _0x2a2884.length; _0x3afbc1++) {
    var _0x499a8e = new BigNumber(_0x2a2884[_0x3afbc1]);
    _0x499a8e = _0x499a8e.multipliedBy(_0x3e79a2);
    _0x2cc53a = _0x2cc53a.plus(_0x499a8e);
    _0x3e79a2 = _0x3e79a2.multipliedBy(0x100);
  }
  var _0x5a6c0d = _0x20d609.device_info.sensor;
  if (_0x5a6c0d.length == 0x0) {
    switch (_0x20d609.device_info.productId) {
      case 0x2328:
        break;
      case 0x2329:
        _0x5a6c0d = "PAW3395";
        break;
      case 0x232a:
        break;
      case 0x232b:
        break;
      case 0x232c:
        _0x5a6c0d = "PAW3395";
        break;
      case 0x232d:
        _0x5a6c0d = "PAW3395";
        break;
      case 0x232e:
        _0x5a6c0d = 'PAW3395';
        break;
      case 0x232f:
        break;
      case 0x2330:
        break;
      case 0x2331:
        _0x5a6c0d = "PAW3950";
        break;
      case 0x2332:
        _0x5a6c0d = "PAW3950";
        break;
      case 0x2334:
        _0x5a6c0d = "PAW3950";
        break;
      case 0x2335:
        break;
      case 0x2336:
        break;
      case 0x2337:
        _0x5a6c0d = 'PAW3950';
        break;
      case 0x2338:
        _0x5a6c0d = "PAW3950";
        break;
      case 0x2339:
        _0x5a6c0d = 'PAW3950';
        break;
    }
  }
  if (_0x5a6c0d.length == 0x0) {
    if (_0x20d609.device_info.deviceName == "SA-ML01" || _0x20d609.device_info.deviceName == "SA-MH01" || _0x20d609.device_info.deviceName == "SA-SL01" || _0x20d609.device_info.deviceName == "SA-SH01" || _0x20d609.device_info.deviceName == "ES21") {
      _0x5a6c0d = "PAW3395";
    } else if (_0x20d609.device_info.deviceName == "SA-MH01Pro" || _0x20d609.device_info.deviceName == "SA-SH01Pro" || _0x20d609.device_info.deviceName == "ES21Pro" || _0x20d609.device_info.deviceName == 'ES21M' || _0x20d609.device_info.deviceName == "ER21Pro" || _0x20d609.device_info.deviceName == 'ER21M') {
      _0x5a6c0d = "PAW3950";
    }
  }
  _0x3bac03.open("GET", "https://www.miracletek.net/game/mouse_config.php" + ("?os=4" + "&v=" + 0x9 + "&c=" + 0x1 + "&a=" + "pc-rawmhub.game" + '&ta=' + "pc-rawmhub.game" + '&mac=' + (layui.device('os').os.toLowerCase() == "mac" ? 0x1 : 0x0)) + "&devName=" + _0x20d609.device_info.deviceName + "&sensor=" + _0x5a6c0d + '&uuid=' + _0x20d609.device_info.esbAddress + "&performance=" + _0x20d609.device_info.powerMode + "&lod=" + _0x20d609.device_info.lod + '&angle_snapping=' + _0x20d609.device_info.angleSnapping + "&ripple_control=" + _0x20d609.device_info.rippleControl + '&motion_sync=' + _0x20d609.device_info.motionSync + "&wireless_turbo=" + (_0x20d609.device_info.txOutputPower == 0x0 ? 0x0 : 0x1) + '&sleep_time=' + _0x5d5710 + "&angle_tuning=" + _0x20d609.device_info.angleTuning + "&key_delay=" + _0x2cc53a.toFixed() + "&channel=" + _0x57731a + "&polling_rate=" + _0x20d609.device_info.pollingRate + "&glass_mode=" + (is_glass_mode_supported(_0x20d609) && _0x20d609.device_info.glassModeEnabled ? 0x1 : 0x0) + "&dpi_xy=" + ((_0x20d609.device_info.resolution & 0xffff0000) != 0x0 ? 0x1 : 0x0), true);
  _0x3bac03.send();
}
function upload_mouse_config_delayed(_0x346458, _0x5b0e27, _0x27472c) {
  upload_mouse_config_timer = undefined;
  upload_mouse_config(_0x346458, _0x5b0e27, _0x27472c);
}
function GET_UINT8(_0x255523, _0x14510b) {
  var _0x30f8db = _0x255523[_0x14510b] & 0xff;
  _0x14510b++;
  return [_0x30f8db, _0x14510b];
}
function GET_UINT16(_0x1b7dcc, _0x4a8759) {
  var _0x147291 = _0x1b7dcc[_0x4a8759] & 0xff | _0x1b7dcc[_0x4a8759 + 0x1] << 0x8 & 0xff00;
  _0x4a8759 += 0x2;
  return [_0x147291, _0x4a8759];
}
function GET_UINT32(_0x468bda, _0x59eedc) {
  var _0xeff68d = _0x468bda[_0x59eedc] & 0xff | _0x468bda[_0x59eedc + 0x1] << 0x8 & 0xff00 | _0x468bda[_0x59eedc + 0x2] << 0x10 & 0xff0000 | _0x468bda[_0x59eedc + 0x3] << 0x18 & 0xff000000;
  _0x59eedc += 0x4;
  return [_0xeff68d, _0x59eedc];
}
function create_key_info() {
  var _0x4af6c0 = {
    cmd: 0x3,
    name: '',
    label: '',
    configType: 0x0
  };
  ;
  _0x4af6c0.x = 0x0;
  _0x4af6c0.y = 0x0;
  _0x4af6c0.touch_style = 0x0;
  _0x4af6c0.touch_firearms = 0x0;
  _0x4af6c0.touch_continue_count = 0x4b;
  _0x4af6c0.slide_range = 0x3f;
  _0x4af6c0.slide_time = 0x10;
  _0x4af6c0.slide_delay = 0x0;
  _0x4af6c0.fps_style = 0x0;
  _0x4af6c0.fps_shoot_mode = 0x0;
  _0x4af6c0.fps_shoot_count = 0x2;
  _0x4af6c0.joystick_radius = 0x64;
  _0x4af6c0.joystick_timeout = 0x0;
  _0x4af6c0.joystick_radiusTo0 = 0x0;
  _0x4af6c0.joystick_switch_percent = 0x85;
  _0x4af6c0.joystick_switch_mode = 0x0;
  _0x4af6c0.joystick_navigate_mode = 0x0;
  _0x4af6c0.joystick_mouse_ani = 0x1;
  _0x4af6c0.moba_radius = 0x3f;
  _0x4af6c0.wheel_senstivity = 0xa;
  _0x4af6c0.wheel_endKey = 0x0;
  _0x4af6c0.mouse_lock_unlock = 0x0;
  _0x4af6c0.mouse_lock_unlock_delay = 0x64;
  _0x4af6c0.mouse_lock_unlock_call = 0x0;
  _0x4af6c0.mouse_lock_again = 0x0;
  _0x4af6c0.mouse_lock_again_delay = 0xc8;
  _0x4af6c0.mouse_push_joystick_again = 0x0;
  _0x4af6c0.mouse_push_joystick_again_delay = 0xc8;
  _0x4af6c0.mouse_vision_senstivity = 0xa;
  _0x4af6c0.mouse_pointer_senstivity = 0xf;
  _0x4af6c0.mouse_horizontal_senstivity = 0x5;
  _0x4af6c0.mouse_vertical_senstivity = 0x1;
  _0x4af6c0.mouse_release_delay = 0x0;
  _0x4af6c0.mouse_radius = 0x3c;
  _0x4af6c0.mouse_followed_left = 0x1;
  _0x4af6c0.mouse_followed_right = 0x1;
  _0x4af6c0.mouse_targeted_percent = 0x1e;
  _0x4af6c0.mouse_targeted_trigger = 0x0;
  _0x4af6c0.mouse_right_drop = 0x0;
  _0x4af6c0.mouse_mapping_keys = "[0,0,0]";
  _0x4af6c0.mouse_mapping_key_data = 0x1;
  _0x4af6c0.mouse_intensity_toggle_key = '';
  _0x4af6c0.mouse_intensity_toggle_light = 0x1;
  _0x4af6c0.mouse_auto_click = 0x0;
  _0x4af6c0.mouse_auto_click_per_second = 0x5;
  _0x4af6c0.mouse_auto_click_toggle_key = '';
  _0x4af6c0.mouse_auto_click_light = 0x0;
  _0x4af6c0.mouse_auto_click_down = 0x0;
  _0x4af6c0.mouse_auto_click_up = 0x0;
  _0x4af6c0.mouse_auto_click_rand = 0x0;
  _0x4af6c0.mouse_intensity = [0x0, 0x0, 0x0, 0x0, 0x0];
  _0x4af6c0.mouse_intensity_key = ['', '', '', '', ''];
  _0x4af6c0.mouse_intensity_light = [-0x1, -0x1, -0x1, -0x1, -0x1];
  _0x4af6c0.mouse_intensity_adjustment = [[], [], [], [], []];
  _0x4af6c0.mouse_mapping_function = 0x0;
  _0x4af6c0.mouse_mapping_function_data = 0xc8;
  _0x4af6c0.mouse_mapping_function_text = '';
  _0x4af6c0.macro_style = 0x0;
  _0x4af6c0.macro_toggleKey = 0x0;
  _0x4af6c0.macro_endKey = 0x0;
  _0x4af6c0.locked = 0x0;
  _0x4af6c0.macroKeys = [];
  return _0x4af6c0;
}
function copy_key_info(_0xd00a56) {
  return JSON.parse(JSON.stringify(_0xd00a56));
}
function create_macro_info() {
  var _0x56e799 = layui.i18np;
  var _0x16be9e = {
    name: _0x56e799.prop("STRID_NONE"),
    label: '',
    _id: 0x0,
    x: 0x0,
    y: 0x0,
    style: 0x0,
    interval_time: 0x0,
    continue_time: 0x0,
    touch_style: 0x0,
    moba_reverse: 0x0,
    moba_radius: 0x0,
    slide_style: 0x0,
    slide_range: 0x0,
    mouse_key_code: 0x0,
    mouse_key_event: 0x0,
    mouse_key_time: 0x0,
    mouse_key_loop: 0x0
  };
  return _0x16be9e;
}
function clone_macro_info(_0x1fae92) {
  let _0x3778ce = Object.assign({}, _0x1fae92);
  return _0x3778ce;
}
function add_key_info(_0x3c9b25, _0x274f53, _0x583cbc) {
  if (_0x274f53 >= _0x3c9b25.device_info.allKeyConfigs.length) {
    return;
  }
  let _0x2a40ee = _0x3c9b25.device_info.allKeyConfigs[_0x274f53];
  if (_0x583cbc == undefined) {
    _0x2a40ee.splice(0x0, _0x2a40ee.length);
  } else {
    var _0x152fa1 = _0x583cbc.byteLength;
    var _0x560bec = 0xf;
    var _0x1f6abf = 0x0;
    if (_0x152fa1 >= 0x2) {
      [_0x560bec, _0x1f6abf] = GET_UINT8(_0x583cbc, _0x1f6abf);
      _0x560bec &= 0xf;
    }
    if (_0x560bec == 0x3) {
      var _0x2ff4a7;
      [_0x2ff4a7, _0x1f6abf] = GET_UINT8(_0x583cbc, _0x1f6abf);
      _0x2ff4a7 = _0x583cbc[0x0] << 0x4 & 0xf00 | _0x2ff4a7 & 0xff;
      if (_0x152fa1 >= _0x2ff4a7) {
        var _0x59b548;
        var _0x14cf25;
        var _0xe18f73;
        var _0x1ff65a;
        var _0x5e328f;
        var _0x5f1570;
        var _0x5e7cb8;
        var _0x3704c4;
        var _0x191767;
        var _0x54716a;
        var _0xb9a22a;
        var _0x158179;
        var _0x1ea20b;
        var _0x18b14d = create_key_info();
        [_0x14cf25, _0x1f6abf] = GET_UINT8(_0x583cbc, _0x1f6abf);
        if (_0x14cf25 == 0x16 || _0x14cf25 == 0x18 || _0x14cf25 == 0x5 || _0x14cf25 == 0x2b) {
          [_0xe18f73, _0x1f6abf] = GET_UINT8(_0x583cbc, _0x1f6abf);
          if (_0xe18f73 <= 0x2) {
            var _0x23da19 = '';
            var _0x102b41 = '';
            for (var _0x59b548 = 0x0; _0x59b548 < _0xe18f73; _0x59b548++) {
              [_0x1ff65a, _0x1f6abf] = GET_UINT8(_0x583cbc, _0x1f6abf);
              if (_0x1ff65a == 0x7) {
                if (_0x23da19.length > 0x0) {
                  _0x23da19 += '+';
                }
                _0x23da19 += KEY_WHEEL_UP;
                if (_0x102b41.length > 0x0) {
                  _0x102b41 += '+';
                }
                _0x102b41 += 'â–²';
              } else if (_0x1ff65a == 0x8) {
                if (_0x23da19.length > 0x0) {
                  _0x23da19 += '+';
                }
                _0x23da19 += KEY_WHEEL_DOWN;
                if (_0x102b41.length > 0x0) {
                  _0x102b41 += '+';
                }
                _0x102b41 += 'â–¼';
              } else {
                get_keys(_0x3c9b25).forEach(_0x210718 => {
                  if (_0x210718.id.length == 0x1 && _0x1ff65a == _0x210718.id[0x0]) {
                    if (_0x23da19.length > 0x0) {
                      _0x23da19 += '+';
                    }
                    _0x23da19 += _0x210718.name;
                    if (_0x102b41.length > 0x0) {
                      _0x102b41 += '+';
                    }
                    _0x102b41 += _0x210718.label;
                  }
                });
              }
            }
            _0x18b14d.name = _0x23da19;
            _0x18b14d.label = _0x102b41;
          }
        }
        switch (_0x14cf25) {
          case 0x16:
            if (_0xe18f73 <= 0x2) {
              [_0x5e328f, _0x1f6abf] = GET_UINT8(_0x583cbc, _0x1f6abf);
              _0x5e328f = get_vk_code(_0x5e328f);
              if (_0x5e328f == 0xa2) {
                _0x5e328f = 0x11;
              } else {
                if (_0x5e328f == 0xa4) {
                  _0x5e328f = 0x12;
                } else if (_0x5e328f == 0xa0) {
                  _0x5e328f = 0x10;
                }
              }
              [_0x5e7cb8, _0x1f6abf] = GET_UINT8(_0x583cbc, _0x1f6abf);
              [_0x158179, _0x1f6abf] = GET_UINT8(_0x583cbc, _0x1f6abf);
              if (_0x5e7cb8 == 0x1) {
                _0x158179 += 0xff;
              } else {
                if (_0x5e7cb8 == 0x3) {
                  _0x18b14d.mouse_mapping_key_data = Math.abs(_0x158179 - 0x40);
                  if (_0x158179 > 0x40) {
                    _0x158179 = 0x400;
                  } else {
                    _0x158179 = 0x401;
                  }
                } else {
                  if (_0x5e7cb8 == 0x5) {
                    _0x18b14d.mouse_mapping_key_data = Math.abs(_0x158179 - 0x40);
                    if (_0x158179 < 0x40) {
                      _0x158179 = 0x402;
                    } else {
                      _0x158179 = 0x403;
                    }
                  } else if (_0x5e7cb8 == 0x4) {
                    _0x158179 += 0x200;
                  }
                }
              }
              _0x158179 = get_vk_code(_0x158179);
              if (_0x1f6abf < _0x2ff4a7) {
                [_0x3704c4, _0x1f6abf] = GET_UINT8(_0x583cbc, _0x1f6abf);
                _0x3704c4 = get_vk_code(_0x3704c4);
                if (_0x3704c4 == 0xa2) {
                  _0x3704c4 = 0x11;
                } else {
                  if (_0x3704c4 == 0xa4) {
                    _0x3704c4 = 0x12;
                  } else if (_0x3704c4 == 0xa0) {
                    _0x3704c4 = 0x10;
                  }
                }
              } else {
                _0x3704c4 = 0x0;
              }
              _0x18b14d.configType = 0x0;
              _0x18b14d.touch_style = 0x1b;
              var _0x557511 = [];
              _0x557511.push(_0x5e328f);
              _0x557511.push(_0x3704c4);
              _0x557511.push(_0x158179);
              _0x18b14d.mouse_mapping_keys = JSON.stringify(_0x557511);
              _0x2a40ee.push(_0x18b14d);
            }
            break;
          case 0x18:
            if (_0xe18f73 <= 0x2) {
              [_0x191767, _0x1f6abf] = GET_UINT8(_0x583cbc, _0x1f6abf);
              [_0x18b14d.mouse_mapping_function, _0x1f6abf] = GET_UINT8(_0x583cbc, _0x1f6abf);
              [_0x18b14d.mouse_mapping_function_data, _0x1f6abf] = GET_UINT8(_0x583cbc, _0x1f6abf);
              if (_0x1f6abf < _0x2ff4a7) {
                var _0x5932b9;
                [_0x5932b9, _0x1f6abf] = GET_UINT8(_0x583cbc, _0x1f6abf);
                _0x18b14d.mouse_mapping_function_data = _0x18b14d.mouse_mapping_function_data & 0xff | _0x5932b9 << 0x8 & 0xff00;
              }
              if (_0x1f6abf < _0x2ff4a7) {
                var _0x3f8f05;
                [_0x3f8f05, _0x1f6abf] = GET_UINT8(_0x583cbc, _0x1f6abf);
              }
              if (_0x18b14d.mouse_mapping_function == 0x9) {
                if (0x2 == _0x191767) {
                  _0x18b14d.mouse_mapping_function_data *= get_cpi_step(_0x3c9b25);
                  _0x18b14d.configType = 0x0;
                  _0x18b14d.touch_style = 0x1d;
                  _0x2a40ee.push(_0x18b14d);
                }
              } else {
                if (_0x18b14d.mouse_mapping_function == 0x10) {
                  var _0x2e42b2;
                  [_0x2e42b2, _0x1f6abf] = GET_UINT16(_0x583cbc, _0x1f6abf);
                  _0x18b14d.mouse_mapping_function_text = String.fromCharCode.apply(null, _0x583cbc.subarray(_0x1f6abf, _0x1f6abf + _0x2e42b2));
                  _0x18b14d.configType = 0x0;
                  _0x18b14d.touch_style = 0x1d;
                  _0x2a40ee.push(_0x18b14d);
                } else {
                  _0x18b14d.configType = 0x0;
                  _0x18b14d.touch_style = 0x1d;
                  _0x2a40ee.push(_0x18b14d);
                }
              }
            }
            break;
          case 0x5:
          case 0x2b:
            if (_0xe18f73 <= 0x2) {
              [_0x54716a, _0x1f6abf] = GET_UINT8(_0x583cbc, _0x1f6abf);
              _0x18b14d.macro_style = 0x0;
              if (_0x54716a == 0x0) {
                _0x18b14d.macro_style = 0x0;
              } else {
                if (_0x54716a == 0x1) {
                  _0x18b14d.macro_style = 0x1;
                } else {
                  if (_0x54716a == 0x2) {
                    _0x18b14d.macro_style = 0x2;
                  } else {
                    if (_0x54716a == 0x3) {
                      _0x18b14d.macro_style = 0x3;
                    } else {
                      if (_0x54716a == 0x4) {
                        _0x18b14d.macro_style = 0x4;
                      } else {
                        if (_0x54716a == 0x5) {
                          _0x18b14d.macro_style = 0x5;
                        } else if (_0x54716a == 0x6) {
                          _0x18b14d.macro_style = 0x6;
                        }
                      }
                    }
                  }
                }
              }
              [_0x18b14d.macro_endKey, _0x1f6abf] = GET_UINT8(_0x583cbc, _0x1f6abf);
              [_0xb9a22a, _0x1f6abf] = GET_UINT8(_0x583cbc, _0x1f6abf);
              for (_0x59b548 = 0x0; _0x59b548 < _0xb9a22a; _0x59b548++) {
                var _0x429d1f = create_macro_info();
                [_0x1ea20b, _0x1f6abf] = GET_UINT16(_0x583cbc, _0x1f6abf);
                [_0x1ea20b, _0x1f6abf] = GET_UINT16(_0x583cbc, _0x1f6abf);
                [_0x429d1f.interval_time, _0x1f6abf] = GET_UINT16(_0x583cbc, _0x1f6abf);
                [_0x429d1f.continue_time, _0x1f6abf] = GET_UINT16(_0x583cbc, _0x1f6abf);
                [_0x429d1f.style, _0x1f6abf] = GET_UINT8(_0x583cbc, _0x1f6abf);
                _0x429d1f.style &= 0x7f;
                if (_0x429d1f.style == 0x16) {
                  [_0x5e7cb8, _0x1f6abf] = GET_UINT8(_0x583cbc, _0x1f6abf);
                  if ((_0x5e7cb8 & 0x80) != 0x0) {
                    [_0x429d1f.mouse_key_loop, _0x1f6abf] = GET_UINT16(_0x583cbc, _0x1f6abf);
                  } else {
                    _0x429d1f.mouse_key_loop = 0x1;
                  }
                  _0x5e7cb8 &= 0x7f;
                  if (_0x5e7cb8 == 0x0 || _0x5e7cb8 == 0x1 || _0x5e7cb8 == 0x4) {
                    [_0x158179, _0x1f6abf] = GET_UINT8(_0x583cbc, _0x1f6abf);
                    if (_0x5e7cb8 == 0x1) {
                      _0x158179 += 0xff;
                    } else if (_0x5e7cb8 == 0x4) {
                      _0x158179 += 0x200;
                    }
                    _0x429d1f.mouse_key_code = get_vk_code(_0x158179);
                    [_0x5f1570, _0x1f6abf] = GET_UINT8(_0x583cbc, _0x1f6abf);
                    _0x429d1f.mouse_key_event = 0x101;
                    if (_0x5f1570 == 0x0) {
                      _0x429d1f.mouse_key_event = 0x100;
                    } else if (_0x5f1570 == 0x2) {
                      _0x429d1f.mouse_key_event = 0x101;
                    }
                  } else {
                    if (_0x5e7cb8 == 0x2) {
                      var _0x3753d1;
                      var _0x4afa02;
                      var _0x3e8435;
                      var _0x4ead66;
                      var _0x42631e;
                      [_0x3753d1, _0x1f6abf] = GET_UINT8(_0x583cbc, _0x1f6abf);
                      [_0x4afa02, _0x1f6abf] = GET_UINT8(_0x583cbc, _0x1f6abf);
                      [_0x3e8435, _0x1f6abf] = GET_UINT8(_0x583cbc, _0x1f6abf);
                      _0x4ead66 = _0x3753d1 & 0xff | _0x4afa02 << 0x8 & 0xf00;
                      _0x42631e = _0x3e8435 & 0xff | _0x4afa02 << 0x4 & 0xf00;
                      _0x429d1f.mouse_key_code = _0x4ead66 << 0x10 | _0x42631e;
                      _0x429d1f.mouse_key_event = 0x200;
                    } else {
                      if (_0x5e7cb8 == 0x6) {
                        var _0x49600d;
                        var _0x34ce39;
                        [_0x49600d, _0x1f6abf] = GET_UINT16(_0x583cbc, _0x1f6abf);
                        [_0x34ce39, _0x1f6abf] = GET_UINT16(_0x583cbc, _0x1f6abf);
                        _0x429d1f.mouse_key_code = _0x49600d << 0x10 | _0x34ce39;
                        _0x429d1f.mouse_key_event = 0x2ff;
                      } else {
                        if (_0x5e7cb8 == 0x3) {
                          [_0x429d1f.mouse_key_code, _0x1f6abf] = GET_UINT8(_0x583cbc, _0x1f6abf);
                          _0x429d1f.mouse_key_code -= 0x40;
                          _0x429d1f.mouse_key_event = 0x20a;
                        } else if (_0x5e7cb8 == 0x5) {
                          [_0x429d1f.mouse_key_code, _0x1f6abf] = GET_UINT8(_0x583cbc, _0x1f6abf);
                          _0x429d1f.mouse_key_code -= 0x40;
                          _0x429d1f.mouse_key_event = 0x20e;
                        }
                      }
                    }
                  }
                  [_0x429d1f.mouse_key_time, _0x1f6abf] = GET_UINT16(_0x583cbc, _0x1f6abf);
                  _0x18b14d.macroKeys.push(_0x429d1f);
                }
              }
              [_0x5932b9, _0x1f6abf] = GET_UINT8(_0x583cbc, _0x1f6abf);
              var _0x3f8f05;
              [_0x3f8f05, _0x1f6abf] = GET_UINT8(_0x583cbc, _0x1f6abf);
              [_0x18b14d.macro_toggleKey, _0x1f6abf] = GET_UINT8(_0x583cbc, _0x1f6abf);
              _0x18b14d.configType = 0x5;
              if ((_0x3f8f05 & 8) != 0x0 && _0x18b14d.macroKeys.length >= 0x2) {
                var _0x29c5ce = create_key_info();
                _0x29c5ce.name = _0x18b14d.name;
                _0x29c5ce.label = _0x18b14d.label;
                _0x29c5ce.configType = 0x0;
                _0x29c5ce.touch_style = 0x1b;
                var _0x557511 = [];
                _0x557511.push(0x0);
                _0x557511.push(0x0);
                _0x557511.push(_0x18b14d.macroKeys[0x0].mouse_key_code);
                _0x29c5ce.mouse_mapping_keys = JSON.stringify(_0x557511);
                _0x29c5ce.mouse_auto_click = 0x1;
                _0x29c5ce.mouse_auto_click_down = _0x18b14d.macroKeys[0x0].mouse_key_time;
                _0x29c5ce.mouse_auto_click_up = _0x18b14d.macroKeys[0x1].mouse_key_time;
                _0x29c5ce.mouse_auto_click_rand = _0x18b14d.macroKeys[0x0].interval_time;
                _0x2a40ee.push(_0x29c5ce);
              } else if (_0x14cf25 == 0x2b) {
                _0x2a40ee.forEach(function (_0x50b3f7) {
                  if (_0x50b3f7.configType == 0x5 && _0x50b3f7.macro_style == _0x18b14d.macro_style && _0x50b3f7.name == _0x18b14d.name && _0x50b3f7.label == _0x18b14d.label) {
                    _0x18b14d.macroKeys.forEach(function (_0x5b8f70) {
                      _0x50b3f7.macroKeys.push(_0x5b8f70);
                    });
                  }
                });
              } else {
                _0x2a40ee.push(_0x18b14d);
              }
            }
            break;
        }
      }
    }
  }
}
