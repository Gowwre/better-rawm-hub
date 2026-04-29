function send_event_config_reset(client) {
  var payload = [];
  payload.push(0x3);
  payload.push(0x0);
  payload.push(0x3);
  send_event(client, crc_process(client, payload));
}
function send_event_factory_reset(client, isReboot) {
  send_event_action(client, CMD_FACTORY_RESET, isReboot ? 0x1 : 0x0);
  client.device_info.pollingRate = -0x1;
}
function query_firmware(client, fwChannel) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (this.readyState == 0x4 && this.status == 0xc8) {
      try {
        if (this.responseText.length > 0x0) {
          client.device_info.firmwareInfo = JSON.parse(this.responseText);
        }
      } catch (err) {
        log_r(err);
      }
      if (navigator.hid != undefined) {
        window.postMessage({
          'action': ACTION_UI_REFRESH_CURRENT_CLIENT
        });
      }
    }
  };
  xhr.open("GET", "https://www.miracletek.net/game/firmware.php" + ("?os=4" + "&v=" + 0x9 + "&c=" + 0x1 + "&a=" + "pc-rawmhub.game" + '&ta=' + "pc-rawmhub.game" + '&mac=' + (layui.device('os').os.toLowerCase() == "mac" ? 0x1 : 0x0)) + '&devName=' + client.device_info.deviceName + '&vendorId=' + client.device_info.vendorId + "&productId=" + client.device_info.productId + "&devRevName=" + client.device_info.revision + "&devRevCode=" + client.device_info.revisionCode + "&devHwCode=" + client.device_info.hardwareCode + "&devMode=" + 0x1 + "&devFwChn=" + fwChannel, true);
  xhr.send();
}
function upload_mouse_config(client, value, value2) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (this.readyState == 0x4 && this.status == 0xc8) {
      try {
        if (this.responseText.length > 0x0) {
          log_r(this.responseText);
        }
      } catch (err2) {
        log_r(err2);
      }
    }
  };
  var bn = new BigNumber(0x0);
  var bn2 = new BigNumber(0x1);
  var len = client.device_info.keyDelay;
  for (var index = 0x0; index < len.length; index++) {
    var bn3 = new BigNumber(len[index]);
    bn3 = bn3.multipliedBy(bn2);
    bn = bn.plus(bn3);
    bn2 = bn2.multipliedBy(0x100);
  }
  var len2 = client.device_info.sensor;
  if (len2.length == 0x0) {
    switch (client.device_info.productId) {
      case PID_KNIFE:
        break;
      case PID_ML01:
        len2 = "PAW3395";
        break;
      case PID_RECEIVER:
        break;
      case PID_RECEIVER_8K:
        break;
      case PID_MH01:
        len2 = "PAW3395";
        break;
      case PID_SL01:
        len2 = "PAW3395";
        break;
      case PID_SH01:
        len2 = 'PAW3395';
        break;
      case PID_GS_SH01:
        break;
      case PID_ER21:
        break;
      case PID_ES21:
        len2 = "PAW3950";
        break;
      case PID_ES21PRO:
        len2 = "PAW3950";
        break;
      case PID_ER21M:
        len2 = "PAW3950";
        break;
      case PID_ER21PRO:
        break;
      case PID_ER21PRO_B:
        break;
      case PID_ES21M:
        len2 = 'PAW3950';
        break;
      case PID_MH01PRO:
        len2 = "PAW3950";
        break;
      case PID_SH01PRO:
        len2 = 'PAW3950';
        break;
    }
  }
  if (len2.length == 0x0) {
    if (client.device_info.deviceName == "SA-ML01" || client.device_info.deviceName == "SA-MH01" || client.device_info.deviceName == "SA-SL01" || client.device_info.deviceName == "SA-SH01" || client.device_info.deviceName == "ES21") {
      len2 = "PAW3395";
    } else if (client.device_info.deviceName == "SA-MH01Pro" || client.device_info.deviceName == "SA-SH01Pro" || client.device_info.deviceName == "ES21Pro" || client.device_info.deviceName == 'ES21M' || client.device_info.deviceName == "ER21Pro" || client.device_info.deviceName == 'ER21M') {
      len2 = "PAW3950";
    }
  }
  xhr.open("GET", "https://www.miracletek.net/game/mouse_config.php" + ("?os=4" + "&v=" + 0x9 + "&c=" + 0x1 + "&a=" + "pc-rawmhub.game" + '&ta=' + "pc-rawmhub.game" + '&mac=' + (layui.device('os').os.toLowerCase() == "mac" ? 0x1 : 0x0)) + "&devName=" + client.device_info.deviceName + "&sensor=" + len2 + '&uuid=' + client.device_info.esbAddress + "&performance=" + client.device_info.powerMode + "&lod=" + client.device_info.lod + '&angle_snapping=' + client.device_info.angleSnapping + "&ripple_control=" + client.device_info.rippleControl + '&motion_sync=' + client.device_info.motionSync + "&wireless_turbo=" + (client.device_info.txOutputPower == 0x0 ? 0x0 : 0x1) + '&sleep_time=' + value2 + "&angle_tuning=" + client.device_info.angleTuning + "&key_delay=" + bn.toFixed() + "&channel=" + value + "&polling_rate=" + client.device_info.pollingRate + "&glass_mode=" + (is_glass_mode_supported(client) && client.device_info.glassModeEnabled ? 0x1 : 0x0) + "&dpi_xy=" + ((client.device_info.resolution & 0xffff0000) != 0x0 ? 0x1 : 0x0), true);
  xhr.send();
}
function upload_mouse_config_delayed(deviceInfo, channel, sleepTime) {
  upload_mouse_config_timer = undefined;
  upload_mouse_config(deviceInfo, channel, sleepTime);
}
function GET_UINT8(value, value2) {
  var value3 = value[value2] & 0xff;
  value2++;
  return [value3, value2];
}
function GET_UINT16(value, value2) {
  var value3 = value[value2] & 0xff | value[value2 + 0x1] << 0x8 & 0xff00;
  value2 += 0x2;
  return [value3, value2];
}
function GET_UINT32(value, value2) {
  var value3 = value[value2] & 0xff | value[value2 + 0x1] << 0x8 & 0xff00 | value[value2 + 0x2] << 0x10 & 0xff0000 | value[value2 + 0x3] << 0x18 & 0xff000000;
  value2 += 0x4;
  return [value3, value2];
}
function create_key_info() {
  var keyInfo = {
    cmd: 0x3,
    name: '',
    label: '',
    configType: 0x0
  };
  ;
  keyInfo.x = 0x0;
  keyInfo.y = 0x0;
  keyInfo.touch_style = 0x0;
  keyInfo.touch_firearms = 0x0;
  keyInfo.touch_continue_count = 0x4b;
  keyInfo.slide_range = 0x3f;
  keyInfo.slide_time = 0x10;
  keyInfo.slide_delay = 0x0;
  keyInfo.fps_style = 0x0;
  keyInfo.fps_shoot_mode = 0x0;
  keyInfo.fps_shoot_count = 0x2;
  keyInfo.joystick_radius = 0x64;
  keyInfo.joystick_timeout = 0x0;
  keyInfo.joystick_radiusTo0 = 0x0;
  keyInfo.joystick_switch_percent = 0x85;
  keyInfo.joystick_switch_mode = 0x0;
  keyInfo.joystick_navigate_mode = 0x0;
  keyInfo.joystick_mouse_ani = 0x1;
  keyInfo.moba_radius = 0x3f;
  keyInfo.wheel_senstivity = 0xa;
  keyInfo.wheel_endKey = 0x0;
  keyInfo.mouse_lock_unlock = 0x0;
  keyInfo.mouse_lock_unlock_delay = 0x64;
  keyInfo.mouse_lock_unlock_call = 0x0;
  keyInfo.mouse_lock_again = 0x0;
  keyInfo.mouse_lock_again_delay = 0xc8;
  keyInfo.mouse_push_joystick_again = 0x0;
  keyInfo.mouse_push_joystick_again_delay = 0xc8;
  keyInfo.mouse_vision_senstivity = 0xa;
  keyInfo.mouse_pointer_senstivity = 0xf;
  keyInfo.mouse_horizontal_senstivity = 0x5;
  keyInfo.mouse_vertical_senstivity = 0x1;
  keyInfo.mouse_release_delay = 0x0;
  keyInfo.mouse_radius = 0x3c;
  keyInfo.mouse_followed_left = 0x1;
  keyInfo.mouse_followed_right = 0x1;
  keyInfo.mouse_targeted_percent = 0x1e;
  keyInfo.mouse_targeted_trigger = 0x0;
  keyInfo.mouse_right_drop = 0x0;
  keyInfo.mouse_mapping_keys = "[0,0,0]";
  keyInfo.mouse_mapping_key_data = 0x1;
  keyInfo.mouse_intensity_toggle_key = '';
  keyInfo.mouse_intensity_toggle_light = 0x1;
  keyInfo.mouse_auto_click = 0x0;
  keyInfo.mouse_auto_click_per_second = 0x5;
  keyInfo.mouse_auto_click_toggle_key = '';
  keyInfo.mouse_auto_click_light = 0x0;
  keyInfo.mouse_auto_click_down = 0x0;
  keyInfo.mouse_auto_click_up = 0x0;
  keyInfo.mouse_auto_click_rand = 0x0;
  keyInfo.mouse_intensity = [0x0, 0x0, 0x0, 0x0, 0x0];
  keyInfo.mouse_intensity_key = ['', '', '', '', ''];
  keyInfo.mouse_intensity_light = [-0x1, -0x1, -0x1, -0x1, -0x1];
  keyInfo.mouse_intensity_adjustment = [[], [], [], [], []];
  keyInfo.mouse_mapping_function = 0x0;
  keyInfo.mouse_mapping_function_data = 0xc8;
  keyInfo.mouse_mapping_function_text = '';
  keyInfo.macro_style = 0x0;
  keyInfo.macro_toggleKey = 0x0;
  keyInfo.macro_endKey = 0x0;
  keyInfo.locked = 0x0;
  keyInfo.macroKeys = [];
  return keyInfo;
}
function copy_key_info(sourceKeyInfo) {
  return JSON.parse(JSON.stringify(sourceKeyInfo));
}
function create_macro_info() {
  var str = layui.i18np;
  var mouseInfo = {
    name: str.prop("STRID_NONE"),
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
  return mouseInfo;
}
function clone_macro_info(client) {
  let clone = Object.assign({}, client);
  return clone;
}
function add_key_info(client, value, byteLen) {
  if (value >= client.device_info.allKeyConfigs.length) {
    return;
  }
  let arr = client.device_info.allKeyConfigs[value];
  if (byteLen == undefined) {
    arr.splice(0x0, arr.length);
  } else {
    var value2 = byteLen.byteLength;
    var value3 = 0xf;
    var offset = 0x0;
    if (value2 >= 0x2) {
      [value3, offset] = GET_UINT8(byteLen, offset);
      value3 &= 0xf;
    }
    if (value3 == 0x3) {
      var i;
      [i, offset] = GET_UINT8(byteLen, offset);
      i = byteLen[0x0] << 0x4 & 0xf00 | i & 0xff;
      if (value2 >= i) {
        var len;
        var idx;
        var i2;
        var i3;
        var i4;
        var i5;
        var i6;
        var i7;
        var i8;
        var i9;
        var i10;
        var i11;
        var i12;
        var keyInfo = create_key_info();
        [idx, offset] = GET_UINT8(byteLen, offset);
        if (idx == 0x16 || idx == 0x18 || idx == 0x5 || idx == 0x2b) {
          [i2, offset] = GET_UINT8(byteLen, offset);
          if (i2 <= 0x2) {
            var html = '';
            var str = '';
            for (var len = 0x0; len < i2; len++) {
              [i3, offset] = GET_UINT8(byteLen, offset);
              if (i3 == 0x7) {
                if (html.length > 0x0) {
                  html += '+';
                }
                html += KEY_WHEEL_UP;
                if (str.length > 0x0) {
                  str += '+';
                }
                str += 'â–²';
              } else if (i3 == 0x8) {
                if (html.length > 0x0) {
                  html += '+';
                }
                html += KEY_WHEEL_DOWN;
                if (str.length > 0x0) {
                  str += '+';
                }
                str += 'â–¼';
              } else {
                get_keys(client).forEach(item => {
                  if (item.id.length == 0x1 && i3 == item.id[0x0]) {
                    if (html.length > 0x0) {
                      html += '+';
                    }
                    html += item.name;
                    if (str.length > 0x0) {
                      str += '+';
                    }
                    str += item.label;
                  }
                });
              }
            }
            keyInfo.name = html;
            keyInfo.label = str;
          }
        }
        switch (idx) {
          case 0x16:
            if (i2 <= 0x2) {
              [i4, offset] = GET_UINT8(byteLen, offset);
              i4 = get_vk_code(i4);
              if (i4 == 0xa2) {
                i4 = 0x11;
              } else {
                if (i4 == 0xa4) {
                  i4 = 0x12;
                } else if (i4 == 0xa0) {
                  i4 = 0x10;
                }
              }
              [i6, offset] = GET_UINT8(byteLen, offset);
              [i11, offset] = GET_UINT8(byteLen, offset);
              if (i6 == 0x1) {
                i11 += 0xff;
              } else {
                if (i6 == 0x3) {
                  keyInfo.mouse_mapping_key_data = Math.abs(i11 - 0x40);
                  if (i11 > 0x40) {
                    i11 = 0x400;
                  } else {
                    i11 = 0x401;
                  }
                } else {
                  if (i6 == 0x5) {
                    keyInfo.mouse_mapping_key_data = Math.abs(i11 - 0x40);
                    if (i11 < 0x40) {
                      i11 = 0x402;
                    } else {
                      i11 = 0x403;
                    }
                  } else if (i6 == 0x4) {
                    i11 += 0x200;
                  }
                }
              }
              i11 = get_vk_code(i11);
              if (offset < i) {
                [i7, offset] = GET_UINT8(byteLen, offset);
                i7 = get_vk_code(i7);
                if (i7 == 0xa2) {
                  i7 = 0x11;
                } else {
                  if (i7 == 0xa4) {
                    i7 = 0x12;
                  } else if (i7 == 0xa0) {
                    i7 = 0x10;
                  }
                }
              } else {
                i7 = 0x0;
              }
              keyInfo.configType = 0x0;
              keyInfo.touch_style = 0x1b;
              var payload = [];
              payload.push(i4);
              payload.push(i7);
              payload.push(i11);
              keyInfo.mouse_mapping_keys = JSON.stringify(payload);
              arr.push(keyInfo);
            }
            break;
          case 0x18:
            if (i2 <= 0x2) {
              [i8, offset] = GET_UINT8(byteLen, offset);
              [keyInfo.mouse_mapping_function, offset] = GET_UINT8(byteLen, offset);
              [keyInfo.mouse_mapping_function_data, offset] = GET_UINT8(byteLen, offset);
              if (offset < i) {
                var i13;
                [i13, offset] = GET_UINT8(byteLen, offset);
                keyInfo.mouse_mapping_function_data = keyInfo.mouse_mapping_function_data & 0xff | i13 << 0x8 & 0xff00;
              }
              if (offset < i) {
                var i14;
                [i14, offset] = GET_UINT8(byteLen, offset);
              }
              if (keyInfo.mouse_mapping_function == 0x9) {
                if (0x2 == i8) {
                  keyInfo.mouse_mapping_function_data *= get_cpi_step(client);
                  keyInfo.configType = 0x0;
                  keyInfo.touch_style = 0x1d;
                  arr.push(keyInfo);
                }
              } else {
                if (keyInfo.mouse_mapping_function == 0x10) {
                  var i15;
                  [i15, offset] = GET_UINT16(byteLen, offset);
                  keyInfo.mouse_mapping_function_text = String.fromCharCode.apply(null, byteLen.subarray(offset, offset + i15));
                  keyInfo.configType = 0x0;
                  keyInfo.touch_style = 0x1d;
                  arr.push(keyInfo);
                } else {
                  keyInfo.configType = 0x0;
                  keyInfo.touch_style = 0x1d;
                  arr.push(keyInfo);
                }
              }
            }
            break;
          case 0x5:
          case 0x2b:
            if (i2 <= 0x2) {
              [i9, offset] = GET_UINT8(byteLen, offset);
              keyInfo.macro_style = 0x0;
              if (i9 == 0x0) {
                keyInfo.macro_style = 0x0;
              } else {
                if (i9 == 0x1) {
                  keyInfo.macro_style = 0x1;
                } else {
                  if (i9 == 0x2) {
                    keyInfo.macro_style = 0x2;
                  } else {
                    if (i9 == 0x3) {
                      keyInfo.macro_style = 0x3;
                    } else {
                      if (i9 == 0x4) {
                        keyInfo.macro_style = 0x4;
                      } else {
                        if (i9 == 0x5) {
                          keyInfo.macro_style = 0x5;
                        } else if (i9 == 0x6) {
                          keyInfo.macro_style = 0x6;
                        }
                      }
                    }
                  }
                }
              }
              [keyInfo.macro_endKey, offset] = GET_UINT8(byteLen, offset);
              [i10, offset] = GET_UINT8(byteLen, offset);
              for (len = 0x0; len < i10; len++) {
                var macroInfo = create_macro_info();
                [i12, offset] = GET_UINT16(byteLen, offset);
                [i12, offset] = GET_UINT16(byteLen, offset);
                [macroInfo.interval_time, offset] = GET_UINT16(byteLen, offset);
                [macroInfo.continue_time, offset] = GET_UINT16(byteLen, offset);
                [macroInfo.style, offset] = GET_UINT8(byteLen, offset);
                macroInfo.style &= 0x7f;
                if (macroInfo.style == 0x16) {
                  [i6, offset] = GET_UINT8(byteLen, offset);
                  if ((i6 & 0x80) != 0x0) {
                    [macroInfo.mouse_key_loop, offset] = GET_UINT16(byteLen, offset);
                  } else {
                    macroInfo.mouse_key_loop = 0x1;
                  }
                  i6 &= 0x7f;
                  if (i6 == 0x0 || i6 == 0x1 || i6 == 0x4) {
                    [i11, offset] = GET_UINT8(byteLen, offset);
                    if (i6 == 0x1) {
                      i11 += 0xff;
                    } else if (i6 == 0x4) {
                      i11 += 0x200;
                    }
                    macroInfo.mouse_key_code = get_vk_code(i11);
                    [i5, offset] = GET_UINT8(byteLen, offset);
                    macroInfo.mouse_key_event = MOUSE_EVENT_KEY_UP;
                    if (i5 == 0x0) {
                      macroInfo.mouse_key_event = MOUSE_EVENT_KEY_DOWN;
                    } else if (i5 == 0x2) {
                      macroInfo.mouse_key_event = MOUSE_EVENT_KEY_UP;
                    }
                  } else {
                    if (i6 == 0x2) {
                      var i16;
                      var i17;
                      var i18;
                      var i19;
                      var i20;
                      [i16, offset] = GET_UINT8(byteLen, offset);
                      [i17, offset] = GET_UINT8(byteLen, offset);
                      [i18, offset] = GET_UINT8(byteLen, offset);
                      i19 = i16 & 0xff | i17 << 0x8 & 0xf00;
                      i20 = i18 & 0xff | i17 << 0x4 & 0xf00;
                      macroInfo.mouse_key_code = i19 << 0x10 | i20;
                      macroInfo.mouse_key_event = 0x200;
                    } else {
                      if (i6 == 0x6) {
                        var i21;
                        var i22;
                        [i21, offset] = GET_UINT16(byteLen, offset);
                        [i22, offset] = GET_UINT16(byteLen, offset);
                        macroInfo.mouse_key_code = i21 << 0x10 | i22;
                        macroInfo.mouse_key_event = 0x2ff;
                      } else {
                        if (i6 == 0x3) {
                          [macroInfo.mouse_key_code, offset] = GET_UINT8(byteLen, offset);
                          macroInfo.mouse_key_code -= 0x40;
                          macroInfo.mouse_key_event = 0x20a;
                        } else if (i6 == 0x5) {
                          [macroInfo.mouse_key_code, offset] = GET_UINT8(byteLen, offset);
                          macroInfo.mouse_key_code -= 0x40;
                          macroInfo.mouse_key_event = 0x20e;
                        }
                      }
                    }
                  }
                  [macroInfo.mouse_key_time, offset] = GET_UINT16(byteLen, offset);
                  keyInfo.macroKeys.push(macroInfo);
                }
              }
              [i13, offset] = GET_UINT8(byteLen, offset);
              var i14;
              [i14, offset] = GET_UINT8(byteLen, offset);
              [keyInfo.macro_toggleKey, offset] = GET_UINT8(byteLen, offset);
              keyInfo.configType = 0x5;
              if ((i14 & 8) != 0x0 && keyInfo.macroKeys.length >= 0x2) {
                var keyInfo2 = create_key_info();
                keyInfo2.name = keyInfo.name;
                keyInfo2.label = keyInfo.label;
                keyInfo2.configType = 0x0;
                keyInfo2.touch_style = 0x1b;
                var payload = [];
                payload.push(0x0);
                payload.push(0x0);
                payload.push(keyInfo.macroKeys[0x0].mouse_key_code);
                keyInfo2.mouse_mapping_keys = JSON.stringify(payload);
                keyInfo2.mouse_auto_click = 0x1;
                keyInfo2.mouse_auto_click_down = keyInfo.macroKeys[0x0].mouse_key_time;
                keyInfo2.mouse_auto_click_up = keyInfo.macroKeys[0x1].mouse_key_time;
                keyInfo2.mouse_auto_click_rand = keyInfo.macroKeys[0x0].interval_time;
                arr.push(keyInfo2);
              } else if (idx == 0x2b) {
                arr.forEach(function (item2) {
                  if (item2.configType == CONFIG_TYPE_MACRO && item2.macro_style == keyInfo.macro_style && item2.name == keyInfo.name && item2.label == keyInfo.label) {
                    keyInfo.macroKeys.forEach(function (item3) {
                      item2.macroKeys.push(item3);
                    });
                  }
                });
              } else {
                arr.push(keyInfo);
              }
            }
            break;
        }
      }
    }
  }
}
