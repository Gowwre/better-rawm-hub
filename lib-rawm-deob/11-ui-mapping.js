function setting_mapping_init(_0x282510) {
  if (_0x282510 != undefined ? is_hs_keyboard(_0x282510.device) : false) {
    return;
  }
  var _0x339474 = layui.table;
  select_key_name = '';
  select_mapping_type(_0x282510, 0x3);
  onboard_index = _0x282510.device_info.onboardIndex;
  onboard_configs = JSON.parse(JSON.stringify(_0x282510.device_info.allKeyConfigs));
  onboard_status = _0x282510.device_info.onboardStatus;
  onboard_keys = onboard_configs[onboard_index];
  mouse_keys = get_keys(_0x282510);
  setting_mapping_keys = [];
  for (let _0x3e4bdf = 0x0; _0x3e4bdf < mouse_keys.length; _0x3e4bdf++) {
    setting_mapping_keys.push("setting_mapping_key_m" + (_0x3e4bdf + 0x1));
  }
  mouse_key_labels = [];
  mouse_key_labels.push(layui.i18np.prop('STRID_NONE'));
  for (let _0x48a266 = 0x0; _0x48a266 < mouse_keys.length; _0x48a266++) {
    mouse_key_labels.push(mouse_keys[_0x48a266].label);
  }
  var _0x4d1695 = document.getElementById('key-delay-guide-img');
  _0x4d1695.src = get_setup_icon(_0x282510);
  var _0x37820e = "<select name=\"key-delay-select-key\" lay-verify=\"required\" lay-filter=\"key-delay-select-key\">";
  for (let _0x4337fc = 0x0; _0x4337fc < mouse_key_labels.length; _0x4337fc++) {
    if (_0x4337fc == 0x0) {
      _0x37820e += "<option value=\"" + _0x4337fc + "\">" + layui.i18np.prop("STRID_SETTING_SELECT_KEY_ALL") + "</option>";
    } else {
      var _0xd9fb0f = mouse_key_labels[_0x4337fc];
      if (mouse_key_labels[_0x4337fc] == 'â‘ ') {
        _0xd9fb0f = layui.i18np.prop("STRID_KEY_LEFT_S");
      } else {
        if (mouse_key_labels[_0x4337fc] == 'â‘¡') {
          _0xd9fb0f = layui.i18np.prop("STRID_KEY_MIDDLE_S");
        } else if (mouse_key_labels[_0x4337fc] == 'â‘¢') {
          _0xd9fb0f = layui.i18np.prop('STRID_KEY_RIGHT_S');
        }
      }
      if (mouse_keys[_0x4337fc - 0x1].visible != undefined && !mouse_keys[_0x4337fc - 0x1].visible) {
        _0x37820e += "<option value=\"" + _0x4337fc + "\" disabled>" + _0xd9fb0f + "</option>";
      } else {
        _0x37820e += "<option value=\"" + _0x4337fc + "\">" + _0xd9fb0f + "</option>";
      }
    }
  }
  _0x37820e += '</select>';
  $('#setting-key-delay-select-key').html(_0x37820e);
  var _0x40e33c = true;
  var _0x126692 = _0x282510.device_info.keyDelay;
  for (var _0xc0e63c = 0x1; _0xc0e63c < _0x126692.length; _0xc0e63c++) {
    if (_0x282510.device_info != undefined && _0x282510.device_info.revision != undefined && _0x282510.device_info.revision.substr(0x0, 0x2) == 'G-') {
      if (_0x126692[_0xc0e63c] != _0x126692[_0xc0e63c - 0x1]) {
        _0x40e33c = false;
        break;
      }
    } else {
      if ((_0x126692[_0xc0e63c] & 0xf) != (_0x126692[_0xc0e63c - 0x1] & 0xf)) {
        _0x40e33c = false;
        break;
      }
    }
  }
  if (_0x40e33c || !(_0x282510.device_info != undefined && _0x282510.device_info.revision != undefined && _0x282510.device_info.revision.substr(0x0, 0x2) == 'G-' || is_oms(_0x282510, -0x1))) {
    $("[name=\"key-delay-select-key\"]").val(0x0);
  } else {
    $("[name=\"key-delay-select-key\"]").val(0x1);
  }
  $("#slider-key-up-delay").css('display', _0x282510.device_info != undefined && _0x282510.device_info.revision != undefined && _0x282510.device_info.revision.substr(0x0, 0x2) == 'G-' ? '' : 'none');
  $("#setting-key-delay-down-up").css("display", _0x282510.device_info != undefined && _0x282510.device_info.revision != undefined && _0x282510.device_info.revision.substr(0x0, 0x2) == 'G-' ? '' : 'none');
  $('#setting-key-delay-select-key-container').css("display", _0x282510.device_info != undefined && _0x282510.device_info.revision != undefined && _0x282510.device_info.revision.substr(0x0, 0x2) == 'G-' || is_oms(_0x282510, -0x1) ? '' : 'none');
  macro_trigger_types = [];
  macro_trigger_types.push(layui.i18np.prop("STRID_SETTING_MAPPING_MACRO_TRIGGER_PRESS"));
  macro_trigger_types.push(layui.i18np.prop("STRID_SETTING_MAPPING_MACRO_TRIGGER_RELEASE"));
  macro_trigger_types.push(layui.i18np.prop("STRID_SETTING_MAPPING_MACRO_TRIGGER_LOOP"));
  macro_trigger_types.push(layui.i18np.prop("STRID_SETTING_MAPPING_MACRO_TRIGGER_LONG_PRESS"));
  macro_trigger_types.push(layui.i18np.prop("STRID_SETTING_MAPPING_MACRO_TRIGGER_LONG_LOOP"));
  macro_trigger_types.push(layui.i18np.prop("STRID_SETTING_MAPPING_MACRO_TRIGGER_LONG_RELEASE"));
  macro_trigger_types.push(layui.i18np.prop("STRID_SETTING_MAPPING_MACRO_TRIGGER_TOGGLE_LOOP"));
  mouse_function_descs = [];
  mouse_functions = [];
  mouse_function_descs.push(layui.i18np.prop('STRID_NONE'));
  mouse_functions.push(0x0);
  mouse_function_descs.push(layui.i18np.prop("STRID_SETTING_MAPPING_TYPE_FUNCTION_TOGGLE_CPI"));
  mouse_functions.push(0x1);
  mouse_function_descs.push(layui.i18np.prop('STRID_SETTING_MAPPING_TYPE_FUNCTION_NEXT_CPI'));
  mouse_functions.push(0x2);
  mouse_function_descs.push(layui.i18np.prop("STRID_SETTING_MAPPING_TYPE_FUNCTION_PREVIOUS_CPI"));
  mouse_functions.push(0x3);
  if (is_enhancement(_0x282510)) {
    mouse_function_descs.push(layui.i18np.prop("STRID_SETTING_MAPPING_TYPE_FUNCTION_TOGGLE_ASSIST"));
    mouse_functions.push(0x4);
    mouse_function_descs.push(layui.i18np.prop("STRID_SETTING_MAPPING_TYPE_FUNCTION_CHOOSE_ASSIST"));
    mouse_functions.push(0xc);
    mouse_function_descs.push(layui.i18np.prop("STRID_SETTING_MAPPING_TYPE_FUNCTION_NEXT_ASSIST"));
    mouse_functions.push(0x5);
    mouse_function_descs.push(layui.i18np.prop("STRID_SETTING_MAPPING_TYPE_FUNCTION_PREVIOUS_ASSIST"));
    mouse_functions.push(0x6);
  } else {
    mouse_function_descs.push(layui.i18np.prop("STRID_SETTING_MAPPING_TYPE_FUNCTION_ADD_CPI"));
    mouse_functions.push(0xa);
    mouse_function_descs.push(layui.i18np.prop('STRID_SETTING_MAPPING_TYPE_FUNCTION_PLUS_CPI'));
    mouse_functions.push(0xb);
  }
  mouse_function_descs.push(layui.i18np.prop('STRID_SETTING_MAPPING_TYPE_FUNCTION_PRESS_CPI'));
  mouse_functions.push(0x9);
  mouse_function_descs.push(layui.i18np.prop("STRID_SETTING_MAPPING_TYPE_FUNCTION_TOGGLE_ESB_ADDR"));
  mouse_functions.push(0xd);
  mouse_function_descs.push(layui.i18np.prop("STRID_SETTING_MAPPING_TYPE_FUNCTION_TOGGLE_BLE_DEVICE"));
  mouse_functions.push(0xf);
  mouse_function_descs.push(layui.i18np.prop("STRID_SETTING_MAPPING_TYPE_FUNCTION_SHOW_POWER"));
  mouse_functions.push(0xe);
  mouse_function_descs.push(layui.i18np.prop("STRID_SETTING_MAPPING_TYPE_FUNCTION_SHELL_CMD"));
  mouse_functions.push(0x10);
  mouse_function_descs.push(layui.i18np.prop("STRID_SETTING_MAPPING_TYPE_FUNCTION_TOGGLE_ONBOARD"));
  mouse_functions.push(0x11);
  mouse_function_descs.push(layui.i18np.prop("STRID_SETTING_MAPPING_TYPE_FUNCTION_NEXT_ONBOARD"));
  mouse_functions.push(0x12);
  mouse_function_descs.push(layui.i18np.prop("STRID_SETTING_MAPPING_TYPE_FUNCTION_PREVIOUS_ONBOARD"));
  mouse_functions.push(0x13);
  mouse_function_descs.push(layui.i18np.prop("STRID_SETTING_MAPPING_TYPE_FUNCTION_TOGGLE_MINI_HUB"));
  mouse_functions.push(0x15);
  mouse_function_descs.push(layui.i18np.prop('STRID_SETTING_MAPPING_TYPE_FUNCTION_TOGGLE_WORK_MODE'));
  mouse_functions.push(0x16);
  _0x339474.render({
    'elem': "#key-shortcuts",
    'id': "key-shortcuts",
    'cols': [[{
      'field': "keys",
      'title': layui.i18np.prop('STRID_SETTING_MAPPING_TYPE_KEY'),
      'width': 0x74,
      'unresize': true
    }, {
      'field': "desc",
      'title': layui.i18np.prop("STRID_SETTING_MAPPING_TYPE_FUNCTION"),
      'width': 0xd2,
      'unresize': true
    }]],
    'data': get_shortcuts(_0x282510),
    'skin': "grid",
    'page': false,
    'done': function (_0x3e985e) {
      $(".layui-table").css("width", "100%");
      $("th[data-field='delete']").css("border-right", "none");
      $("th[data-field='desc']").css("border-right", "none");
      $("td[data-field='desc']").css('border-right', "none");
    }
  });
  _0x339474.on('row(key-shortcuts)', function (_0x340a28) {
    var _0x1734a5 = modifiers;
    var _0xbe2b3a = keys;
    var _0x3a220d = _0x340a28.data.keys.split('+');
    if (_0x3a220d.length == 0x2) {
      var _0x2dc193 = _0x3a220d[0x0].trim();
      if (_0x2dc193 == 'âŒ˜') {
        _0x2dc193 = "Command";
      }
      for (var _0x2ff5c2 = 0x0; _0x2ff5c2 < _0x1734a5.length; _0x2ff5c2++) {
        if (_0x2dc193 == _0x1734a5[_0x2ff5c2].name) {
          $("[name=\"mapping-ctrl-key1\"]").val(_0x2ff5c2);
          break;
        }
      }
      $("[name=\"mapping-ctrl-key2\"]").val(0x0);
      _0x2dc193 = _0x3a220d[0x1].trim();
      if (_0x2dc193 == 'â†’') {
        _0x2dc193 = layui.i18np.prop("STRID_KEY_ARROW_RIGHT");
      } else {
        if (_0x2dc193 == 'â†') {
          _0x2dc193 = layui.i18np.prop("STRID_KEY_ARROW_LEFT");
        } else {
          if (_0x2dc193 == 'â†‘') {
            _0x2dc193 = layui.i18np.prop("STRID_KEY_ARROW_UP");
          } else if (_0x2dc193 == 'â†“') {
            _0x2dc193 = layui.i18np.prop("STRID_KEY_ARROW_DOWN");
          }
        }
      }
      for (var _0x2ff5c2 = 0x0; _0x2ff5c2 < _0xbe2b3a.length; _0x2ff5c2++) {
        if (_0x2dc193 == _0xbe2b3a[_0x2ff5c2].name) {
          $("[name=\"mapping-key\"]").val(_0x2ff5c2);
          break;
        }
      }
    } else {
      if (_0x3a220d.length > 0x2) {
        var _0x2dc193 = _0x3a220d[0x0].trim();
        if (_0x2dc193 == 'âŒ˜') {
          _0x2dc193 = 'Command';
        }
        for (var _0x2ff5c2 = 0x0; _0x2ff5c2 < _0x1734a5.length; _0x2ff5c2++) {
          if (_0x2dc193 == _0x1734a5[_0x2ff5c2].name) {
            $("[name=\"mapping-ctrl-key1\"]").val(_0x2ff5c2);
            break;
          }
        }
        _0x2dc193 = _0x3a220d[0x1].trim();
        if (_0x2dc193 == 'âŒ˜') {
          _0x2dc193 = "Command";
        }
        for (var _0x2ff5c2 = 0x0; _0x2ff5c2 < _0x1734a5.length; _0x2ff5c2++) {
          if (_0x2dc193 == _0x1734a5[_0x2ff5c2].name) {
            $("[name=\"mapping-ctrl-key2\"]").val(_0x2ff5c2);
            break;
          }
        }
        _0x2dc193 = _0x3a220d[0x2].trim();
        if (_0x2dc193 == 'â†’') {
          _0x2dc193 = layui.i18np.prop("STRID_KEY_ARROW_RIGHT");
        } else {
          if (_0x2dc193 == 'â†') {
            _0x2dc193 = layui.i18np.prop("STRID_KEY_ARROW_LEFT");
          } else {
            if (_0x2dc193 == 'â†‘') {
              _0x2dc193 = layui.i18np.prop("STRID_KEY_ARROW_UP");
            } else if (_0x2dc193 == 'â†“') {
              _0x2dc193 = layui.i18np.prop("STRID_KEY_ARROW_DOWN");
            }
          }
        }
        for (var _0x2ff5c2 = 0x0; _0x2ff5c2 < _0xbe2b3a.length; _0x2ff5c2++) {
          if (_0x2dc193 == _0xbe2b3a[_0x2ff5c2].name) {
            $("[name=\"mapping-key\"]").val(_0x2ff5c2);
            break;
          }
        }
      }
    }
    layui.form.render("select");
    set_mapping_keys(_0x282510);
    ui_refresh_tab_mapping_key(_0x282510);
  });
}
function ui_refresh_setting_mapping(_0x3883ee) {
  if (_0x3883ee != undefined ? is_hs_keyboard(_0x3883ee.device) : false) {
    return;
  }
  var _0x213a74 = get_product_id_hex_str(_0x3883ee);
  var _0x25aaa1 = key_pos[_0x213a74];
  var _0x187bad;
  var _0x457923;
  for (var _0x3a7402 = 0x1; _0x3a7402 <= 0x7; _0x3a7402++) {
    _0x187bad = 'm' + _0x3a7402;
    _0x457923 = document.getElementById("setting-mapping-key-" + _0x187bad);
    _0x457923.style.left = _0x25aaa1[_0x187bad][0x0] + 'px';
    _0x457923.style.top = _0x25aaa1[_0x187bad][0x1] + 'px';
  }
  _0x187bad = "wheel-line-container";
  _0x457923 = document.getElementById("setting-mapping-key-" + _0x187bad);
  _0x457923.style.left = _0x25aaa1[_0x187bad][0x0] + 'px';
  _0x457923.style.top = _0x25aaa1[_0x187bad][0x1] + 'px';
  _0x187bad = "wheel-up";
  _0x457923 = document.getElementById("setting-mapping-key-" + _0x187bad);
  _0x457923.style.left = _0x25aaa1[_0x187bad][0x0] + 'px';
  _0x457923.style.top = _0x25aaa1[_0x187bad][0x1] + 'px';
  _0x187bad = "wheel-down";
  _0x457923 = document.getElementById("setting-mapping-key-" + _0x187bad);
  _0x457923.style.left = _0x25aaa1[_0x187bad][0x0] + 'px';
  _0x457923.style.top = _0x25aaa1[_0x187bad][0x1] + 'px';
  var _0x46610d = get_color_code(_0x3883ee);
  if (_0x46610d.length > 0x0) {
    $("#setting_mapping_product_icon").css("background-image", "url(" + RESOURCE_URL + "product/" + _0x213a74 + '/' + _0x46610d + "/setting.png)");
  } else {
    $("#setting_mapping_product_icon").css('background-image', 'url(' + RESOURCE_URL + 'product/' + _0x213a74 + "/setting.png)");
  }
  document.getElementById('product-name').src = RESOURCE_URL + "product/" + _0x213a74 + "/name.png";
  ui_refresh_onboard_config(_0x3883ee);
  ui_refresh_mapping_key(_0x3883ee);
  ui_refresh_combination_key(_0x3883ee);
}
function ui_refresh_onboard_config(_0x53e10e) {
  var _0x3f72f3 = layui.$;
  var _0x501dcd = layui.form;
  var _0x1f8ac0 = "<select name=\"onboard-config\" lay-verify=\"required\" lay-filter=\"onboard-config\">";
  for (let _0x8b9e41 = 0x0; _0x8b9e41 < onboard_configs.length; _0x8b9e41++) {
    if (_0x8b9e41 == _0x53e10e.device_info.onboardIndex) {
      if (_0x8b9e41 == onboard_config_index && need_save) {
        _0x1f8ac0 += "<option value=\"" + _0x8b9e41 + "\">" + layui.i18np.prop("STRID_SETTING_CONFIG_CURRENT") + NUMBERS[_0x8b9e41 + 0x1] + " â—€ *" + "</option>";
      } else {
        _0x1f8ac0 += "<option value=\"" + _0x8b9e41 + "\">" + layui.i18np.prop('STRID_SETTING_CONFIG_CURRENT') + NUMBERS[_0x8b9e41 + 0x1] + " â—€" + '</option>';
      }
    } else if (_0x8b9e41 == onboard_config_index && need_save) {
      _0x1f8ac0 += "<option value=\"" + _0x8b9e41 + "\">" + layui.i18np.prop("STRID_SETTING_CONFIG_CURRENT") + NUMBERS[_0x8b9e41 + 0x1] + " *" + '</option>';
    } else {
      _0x1f8ac0 += "<option value=\"" + _0x8b9e41 + "\">" + layui.i18np.prop('STRID_SETTING_CONFIG_CURRENT') + NUMBERS[_0x8b9e41 + 0x1] + "</option>";
    }
  }
  _0x1f8ac0 += "</select>";
  _0x3f72f3("#setting-onboard-config").html(_0x1f8ac0);
  _0x3f72f3("[name=\"onboard-config\"]").val(onboard_config_index);
  _0x501dcd.render("select");
  var _0x4f2733 = onboard_status[onboard_config_index];
  if ((_0x4f2733 & 0x80) != 0x0) {
    _0x3f72f3("[name=\"onboard-allow-switch\"]").prop("checked", true);
  } else {
    _0x3f72f3("[name=\"onboard-allow-switch\"]").prop("checked", false);
  }
  var _0xa8f807 = get_light_display_colors(_0x53e10e);
  var _0x2b329f = 0x0;
  var _0x27ac94 = is_dark_theme() ? "lay-skin-color-picker" : 'lay-skin-color-picker-light';
  _0x1f8ac0 = "<table><tr>";
  _0xa8f807.forEach(_0xa77e69 => {
    _0x1f8ac0 += "<td style=\"padding-top: 5px;\">";
    _0x1f8ac0 += "<a color-code=\"" + _0xa77e69 + "\"setting-onboard-status-action=\"select\" style=\"padding-left: 8px; padding-right: 8px;padding-top: 8px;cursor: pointer;\">";
    if (_0xa77e69 == 'white') {
      if ((_0x4f2733 & 0x7) == 7) {
        _0x1f8ac0 += "<input type=\"radio\" name=\"setting-onboard-color\" value=\"white\" lay-skin=\"none\" checked>";
        _0x2b329f = 0x1;
      } else {
        _0x1f8ac0 += "<input type=\"radio\" name=\"setting-onboard-color\" value=\"white\" lay-skin=\"none\">";
      }
      _0x1f8ac0 += "<div lay-radio class=\"" + _0x27ac94 + "\" style=\"color: #EEE; background-color: #EEE\"></div>";
    } else {
      if (_0xa77e69 == "red") {
        if ((_0x4f2733 & 0x7) == 4) {
          _0x1f8ac0 += "<input type=\"radio\" name=\"setting-onboard-color\" value=\"red\" lay-skin=\"none\" checked>";
          _0x2b329f = 0x1;
        } else {
          _0x1f8ac0 += "<input type=\"radio\" name=\"setting-onboard-color\" value=\"red\" lay-skin=\"none\">";
        }
        _0x1f8ac0 += "<div lay-radio class=\"" + _0x27ac94 + "\" style=\"color: #F00; background-color: #F00\"></div>";
      } else {
        if (_0xa77e69 == "green") {
          if ((_0x4f2733 & 0x7) == 2) {
            _0x1f8ac0 += "<input type=\"radio\" name=\"setting-onboard-color\" value=\"green\" lay-skin=\"none\" checked>";
            _0x2b329f = 0x1;
          } else {
            _0x1f8ac0 += "<input type=\"radio\" name=\"setting-onboard-color\" value=\"green\" lay-skin=\"none\">";
          }
          _0x1f8ac0 += "<div lay-radio class=\"" + _0x27ac94 + "\" style=\"color: #0F0; background-color: #0F0\"></div>";
        } else {
          if (_0xa77e69 == "blue") {
            if ((_0x4f2733 & 0x7) == 1) {
              _0x1f8ac0 += "<input type=\"radio\" name=\"setting-onboard-color\" value=\"blue\" lay-skin=\"none\" checked>";
              _0x2b329f = 0x1;
            } else {
              _0x1f8ac0 += "<input type=\"radio\" name=\"setting-onboard-color\" value=\"blue\" lay-skin=\"none\">";
            }
            _0x1f8ac0 += "<div lay-radio class=\"" + _0x27ac94 + "\" style=\"color: #00F; background-color: #00F\"></div>";
          } else {
            if (_0xa77e69 == 'yellow') {
              if ((_0x4f2733 & 0x7) == 6) {
                _0x1f8ac0 += "<input type=\"radio\" name=\"setting-onboard-color\" value=\"yellow\" lay-skin=\"none\" checked>";
                _0x2b329f = 0x1;
              } else {
                _0x1f8ac0 += "<input type=\"radio\" name=\"setting-onboard-color\" value=\"yellow\" lay-skin=\"none\">";
              }
              _0x1f8ac0 += "<div lay-radio class=\"" + _0x27ac94 + "\" style=\"color: #FF0; background-color: #FF0\"></div>";
            } else {
              if (_0xa77e69 == 'purple') {
                if ((_0x4f2733 & 0x7) == 5) {
                  _0x1f8ac0 += "<input type=\"radio\" name=\"setting-onboard-color\" value=\"purple\" lay-skin=\"none\" checked>";
                  _0x2b329f = 0x1;
                } else {
                  _0x1f8ac0 += "<input type=\"radio\" name=\"setting-onboard-color\" value=\"purple\" lay-skin=\"none\">";
                }
                _0x1f8ac0 += "<div lay-radio class=\"" + _0x27ac94 + "\" style=\"color: #F0F; background-color: #F0F\"></div>";
              } else if (_0xa77e69 == "skyblue") {
                if ((_0x4f2733 & 0x7) == 3) {
                  _0x1f8ac0 += "<input type=\"radio\" name=\"setting-onboard-color\" value=\"skyblue\" lay-skin=\"none\" checked>";
                  _0x2b329f = 0x1;
                } else {
                  _0x1f8ac0 += "<input type=\"radio\" name=\"setting-onboard-color\" value=\"skyblue\" lay-skin=\"none\">";
                }
                _0x1f8ac0 += "<div lay-radio class=\"" + _0x27ac94 + "\" style=\"color: #0FF; background-color: #0FF\"></div>";
              } else {
                if (_0x2b329f == 0x0) {
                  _0x1f8ac0 += "<input type=\"radio\" name=\"setting-onboard-color\" value=\"dark\" lay-skin=\"none\" checked>";
                } else {
                  _0x1f8ac0 += "<input type=\"radio\" name=\"setting-onboard-color\" value=\"dark\" lay-skin=\"none\">";
                }
                _0x1f8ac0 += "<div lay-radio class=\"" + _0x27ac94 + "\" style=\"color: #505050; background-color: #505050\"></div>";
              }
            }
          }
        }
      }
    }
    _0x1f8ac0 += "</a>";
    _0x1f8ac0 += '</td>';
  });
  _0x1f8ac0 += "</tr></table>";
  _0x3f72f3("#setting-onboard-status-colors").html(_0x1f8ac0);
  _0x501dcd.render('radio');
  _0x501dcd.render("checkbox");
}
function ui_refresh_combination_key(_0x51bfaf) {
  var _0x29205a = layui.$;
  var _0x2ddf4c = layui.form;
  var _0x3fd236 = "<select name=\"combination-key\" lay-verify=\"required\" lay-filter=\"combination-key\">";
  for (let _0x27d147 = 0x0; _0x27d147 < mouse_key_labels.length; _0x27d147++) {
    var _0x43e321 = '';
    var _0x2a382e = get_key_name_from_label(mouse_key_labels[_0x27d147]);
    onboard_keys.forEach(_0xeac439 => {
      if (_0xeac439.configType >= 0x0) {
        var _0x44d389 = _0xeac439.name.split('+');
        if (_0x44d389.length == 0x2 && _0x44d389[0x0] == _0x2a382e) {
          var _0x23e7a1 = _0xeac439.label.split('+')[0x1];
          if (_0x43e321.indexOf(_0x23e7a1) == -0x1) {
            _0x43e321 += _0x23e7a1;
          }
        }
      }
    });
    var _0x1f606f = _0x27d147 > 0x0 && mouse_keys[_0x27d147 - 0x1].visible != undefined && !mouse_keys[_0x27d147 - 0x1].visible ? " disabled" : '';
    if (_0x43e321.length > 0x0) {
      _0x3fd236 += "<option value=\"" + _0x27d147 + "\"" + _0x1f606f + '>' + mouse_key_labels[_0x27d147] + " + " + _0x43e321 + "</option>";
    } else {
      _0x3fd236 += "<option value=\"" + _0x27d147 + "\"" + _0x1f606f + '>' + mouse_key_labels[_0x27d147] + "</option>";
    }
  }
  _0x3fd236 += "</select>";
  _0x29205a("#setting-combination-key").html(_0x3fd236);
  _0x29205a("[name=\"combination-key\"]").val(combination_key_index);
  _0x2ddf4c.render("select");
}
function ui_refresh_mapping_key(_0x381b63) {
  var _0x50eadf = mouse_key_labels[combination_key_index];
  var _0x12fb2a = get_key_name_from_label(_0x50eadf);
  var _0x66e529 = [];
  var _0x2f65e4 = [];
  for (let _0x395384 = 0x0; _0x395384 < mouse_keys.length; _0x395384++) {
    _0x66e529.push("#setting-mapping-key-m" + (_0x395384 + 0x1) + "-desc");
    if (_0x12fb2a.length == 0x0) {
      _0x2f65e4.push(mouse_keys[_0x395384].name);
    } else {
      _0x2f65e4.push(_0x12fb2a + '+' + mouse_keys[_0x395384].name);
    }
  }
  _0x66e529.push("#setting-mapping-key-wheel-up-desc");
  if (_0x12fb2a.length == 0x0) {
    _0x2f65e4.push(KEY_WHEEL_UP);
  } else {
    _0x2f65e4.push(_0x12fb2a + '+' + KEY_WHEEL_UP);
  }
  _0x66e529.push("#setting-mapping-key-wheel-down-desc");
  if (_0x12fb2a.length == 0x0) {
    _0x2f65e4.push(KEY_WHEEL_DOWN);
  } else {
    _0x2f65e4.push(_0x12fb2a + '+' + KEY_WHEEL_DOWN);
  }
  if (select_key_name.length == 0x0) {
    var _0x4270b5 = $("[name=\"setting-mapping-key\"]");
    for (let _0x332de3 = 0x0; _0x332de3 < _0x4270b5.length; _0x332de3++) {
      _0x4270b5[_0x332de3].checked = false;
    }
    layui.form.render('radio');
  }
  var _0x168e5b = select_key_name.split('+');
  var _0x477d87 = _0x168e5b[_0x168e5b.length - 0x1];
  for (let _0x562d94 = 0x0; _0x562d94 < mouse_keys.length; _0x562d94++) {
    var _0x659c72 = _0x562d94 + 0x1;
    if (_0x477d87 == mouse_keys[_0x562d94].name) {
      $("#setting-mapping-key-m" + _0x659c72 + "-line").css("background-color", theme_color);
      document.getElementById("setting-mapping-key-m" + _0x659c72 + '-circle').src = RESOURCE_URL + "setting/key_circle_blue.png";
      $("#setting-mapping-key-m" + _0x659c72 + "-desc").css("color", theme_color);
      $("#setting-mapping-key-m" + _0x659c72 + "-text").css("color", theme_color);
    } else {
      $("#setting-mapping-key-m" + _0x659c72 + "-line").css('background-color', "gray");
      document.getElementById('setting-mapping-key-m' + _0x659c72 + "-circle").src = RESOURCE_URL + 'setting/key_circle_gray.png';
      $("#setting-mapping-key-m" + _0x659c72 + "-desc").css("color", '');
      $('#setting-mapping-key-m' + _0x659c72 + "-text").css('color', '');
    }
    $("#setting-mapping-key-m" + _0x659c72).css("display", '');
  }
  if (_0x477d87 == 'M7') {
    $("#setting-mapping-key-m7-line").css('background-color', "#00000000");
    $("#setting-mapping-key-m7-line").css('background-image', "url(" + RESOURCE_URL + "setting/mapping_key_line_selected.png)");
    document.getElementById("setting-mapping-key-m7-circle").src = RESOURCE_URL + "setting/key_circle_blue2.png";
  } else {
    $("#setting-mapping-key-m7-line").css("background-color", "#00000000");
    $("#setting-mapping-key-m7-line").css("background-image", 'url(' + RESOURCE_URL + "setting/mapping_key_line_normal.png)");
    document.getElementById('setting-mapping-key-m7-circle').src = RESOURCE_URL + "setting/key_circle_gray2.png";
  }
  if (_0x477d87 == KEY_WHEEL_DOWN) {
    $("#setting-mapping-key-wheel-down-line").css("background-color", theme_color);
    $("#setting-mapping-key-wheel-down-desc").css("color", theme_color);
    $("#setting-mapping-key-wheel-down-text").css("color", theme_color);
    $("#setting-mapping-key-wheel-line").css("background-color", theme_color);
    document.getElementById("setting-mapping-key-wheel-circle").src = RESOURCE_URL + "setting/key_circle_blue.png";
    $("#setting-mapping-key-wheel-up-line").css("background-color", "gray");
    $("#setting-mapping-key-wheel-up-desc").css("color", '');
    $('#setting-mapping-key-wheel-up-text').css('color', '');
  } else if (_0x477d87 == KEY_WHEEL_UP) {
    $("#setting-mapping-key-wheel-up-line").css('background-color', theme_color);
    $("#setting-mapping-key-wheel-up-desc").css("color", theme_color);
    $("#setting-mapping-key-wheel-up-text").css('color', theme_color);
    $("#setting-mapping-key-wheel-line").css('background-color', theme_color);
    document.getElementById("setting-mapping-key-wheel-circle").src = RESOURCE_URL + 'setting/key_circle_blue.png';
    $('#setting-mapping-key-wheel-down-line').css("background-color", "gray");
    $("#setting-mapping-key-wheel-down-desc").css("color", '');
    $('#setting-mapping-key-wheel-down-text').css("color", '');
  } else {
    $("#setting-mapping-key-wheel-down-line").css("background-color", "gray");
    $("#setting-mapping-key-wheel-down-desc").css("color", '');
    $("#setting-mapping-key-wheel-down-text").css("color", '');
    $('#setting-mapping-key-wheel-up-line').css("background-color", "gray");
    $("#setting-mapping-key-wheel-up-desc").css("color", '');
    $('#setting-mapping-key-wheel-up-text').css('color', '');
    $("#setting-mapping-key-wheel-line").css("background-color", "gray");
    document.getElementById('setting-mapping-key-wheel-circle').src = RESOURCE_URL + "setting/key_circle_gray.png";
  }
  for (var _0x2ba6ff = 0x0; _0x2ba6ff < mouse_keys.length; _0x2ba6ff++) {
    if (mouse_keys[_0x2ba6ff].visible != undefined && !mouse_keys[_0x2ba6ff].visible) {
      $("#setting-mapping-key-m" + (_0x2ba6ff + 0x1)).css('display', "none");
    }
  }
  if (combination_key_index > 0x0) {
    $("#setting-mapping-key-m" + combination_key_index).css("display", 'none');
  }
  for (let _0x33f846 = 0x0; _0x33f846 < _0x66e529.length; _0x33f846++) {
    var _0x236893 = _0x66e529[_0x33f846];
    $(_0x236893).html('');
    onboard_keys.forEach(_0xbe158a => {
      if (_0xbe158a.name == _0x2f65e4[_0x33f846]) {
        if (_0xbe158a.configType == 0x0) {
          if (_0xbe158a.touch_style == 0x1b) {
            var _0x2a5ff6 = [];
            var _0x207f1a = _0xbe158a.mouse_mapping_keys;
            if (_0x207f1a.length > 0x0) {
              _0x207f1a = _0x207f1a.replace('[', '');
              _0x207f1a = _0x207f1a.replace(']', '');
              var _0x2f2286 = _0x207f1a.split(',');
              if (_0x2f2286.length > 0x0) {
                _0x2f2286.forEach(_0x197445 => {
                  if (_0x197445 > 0x0) {
                    var _0x5363ed = false;
                    var _0xdc44f3 = modifiers;
                    for (let _0x3e7012 = 0x0; _0x3e7012 < _0xdc44f3.length; _0x3e7012++) {
                      if (_0x197445 == _0xdc44f3[_0x3e7012].vCode) {
                        _0x2a5ff6.push(_0xdc44f3[_0x3e7012].name);
                        _0x5363ed = true;
                        break;
                      }
                    }
                    if (!_0x5363ed) {
                      var _0x9a9623 = keys;
                      for (let _0x4954d7 = 0x0; _0x4954d7 < _0x9a9623.length; _0x4954d7++) {
                        if (_0x197445 == _0x9a9623[_0x4954d7].vCode) {
                          if (_0x197445 == 0x400 || _0x197445 == 0x401 || _0x197445 == 0x402 || _0x197445 == 0x403) {
                            _0x2a5ff6.push(_0x9a9623[_0x4954d7].name + '(' + _0xbe158a.mouse_mapping_key_data + ')');
                          } else {
                            _0x2a5ff6.push(_0x9a9623[_0x4954d7].name);
                          }
                          _0x5363ed = true;
                          break;
                        }
                      }
                    }
                  }
                });
              }
            }
            if (_0x2a5ff6.length > 0x0) {
              var _0x2fb4d0 = '';
              for (let _0x299a27 = 0x0; _0x299a27 < _0x2a5ff6.length; _0x299a27++) {
                _0x2fb4d0 += _0x2a5ff6[_0x299a27];
                if (_0x299a27 < _0x2a5ff6.length - 0x1) {
                  _0x2fb4d0 += '+';
                }
              }
              $(_0x236893).html(layui.i18np.prop('STRID_SETTING_MAPPING_TYPE_KEY') + " - " + _0x2fb4d0);
            } else {
              $(_0x236893).html(layui.i18np.prop("STRID_SETTING_MAPPING_TYPE_KEY") + " - " + layui.i18np.prop('STRID_NONE'));
            }
          } else {
            if (_0xbe158a.touch_style == 0x1d) {
              for (let _0x4c46b4 = 0x0; _0x4c46b4 < mouse_functions.length; _0x4c46b4++) {
                if (_0xbe158a.mouse_mapping_function == mouse_functions[_0x4c46b4]) {
                  var _0x2fb4d0 = layui.i18np.prop("STRID_SETTING_MAPPING_TYPE_FUNCTION") + " - " + mouse_function_descs[_0x4c46b4];
                  if (_0xbe158a.mouse_mapping_function == 0x10) {
                    if (is_valid_url(_0xbe158a.mouse_mapping_function_text)) {
                      _0x2fb4d0 += layui.i18np.prop("STRID_SETTING_MAPPING_TYPE_FUNCTION_SHELL_CMD_WEB");
                    } else {
                      _0x2fb4d0 += layui.i18np.prop("STRID_SETTING_MAPPING_TYPE_FUNCTION_SHELL_CMD_APP");
                    }
                  }
                  $(_0x236893).html(_0x2fb4d0);
                  break;
                }
              }
            }
          }
        } else if (_0xbe158a.configType == 0x5) {
          $(_0x236893).html(layui.i18np.prop("STRID_SETTING_MAPPING_TYPE_MACRO"));
        }
      }
    });
  }
}
function ui_refresh_tab_mapping_key(_0x324a55) {
  var _0x1a7fc3 = layui.$;
  var _0x29cf59 = layui.form;
  var _0x24d602 = get_select_key_info();
  if (Object.keys(_0x24d602).length == 0x0) {
    return;
  }
  var _0x207535 = modifiers;
  var _0x331b0d = "<select name=\"mapping-ctrl-key1\" lay-verify=\"required\" lay-filter=\"mapping-ctrl-key1\">";
  for (let _0x5f6672 = 0x0; _0x5f6672 < _0x207535.length; _0x5f6672++) {
    _0x331b0d += "<option value=\"" + _0x5f6672 + "\">" + _0x207535[_0x5f6672].name + "</option>";
  }
  _0x331b0d += "</select>";
  _0x1a7fc3('#setting-mapping-ctrl-key1').html(_0x331b0d);
  _0x1a7fc3("[name=\"mapping-ctrl-key1\"]").val(0x0);
  _0x331b0d = "<select name=\"mapping-ctrl-key2\" lay-verify=\"required\" lay-filter=\"mapping-ctrl-key1\">";
  for (let _0x4415f6 = 0x0; _0x4415f6 < _0x207535.length; _0x4415f6++) {
    _0x331b0d += "<option value=\"" + _0x4415f6 + "\">" + _0x207535[_0x4415f6].name + "</option>";
  }
  _0x331b0d += "</select>";
  _0x1a7fc3("#setting-mapping-ctrl-key2").html(_0x331b0d);
  _0x1a7fc3("[name=\"mapping-ctrl-key2\"]").val(0x0);
  var _0x37dfd4 = keys;
  var _0x331b0d = "<select name=\"mapping-key\" lay-verify=\"required\" lay-filter=\"mapping-key\">";
  for (let _0x2d50f2 = 0x0; _0x2d50f2 < _0x37dfd4.length; _0x2d50f2++) {
    _0x331b0d += "<option value=\"" + _0x2d50f2 + "\">" + _0x37dfd4[_0x2d50f2].name + "</option>";
  }
  _0x331b0d += "</select>";
  _0x1a7fc3("#setting-mapping-key").html(_0x331b0d);
  _0x1a7fc3("[name=\"mapping-key\"]").val(0x0);
  var _0x3e7685 = _0x24d602.mouse_mapping_keys;
  if (_0x3e7685.length > 0x0) {
    _0x3e7685 = _0x3e7685.replace('[', '');
    _0x3e7685 = _0x3e7685.replace(']', '');
    var _0x18eb7b = _0x3e7685.split(',');
    if (_0x18eb7b.length >= 0x3) {
      for (let _0x437c2e = 0x0; _0x437c2e < _0x207535.length; _0x437c2e++) {
        if (_0x18eb7b[0x0] == _0x207535[_0x437c2e].vCode) {
          _0x1a7fc3("[name=\"mapping-ctrl-key1\"]").val(_0x437c2e);
          break;
        }
      }
      for (let _0x2461f5 = 0x0; _0x2461f5 < _0x207535.length; _0x2461f5++) {
        if (_0x18eb7b[0x1] == _0x207535[_0x2461f5].vCode) {
          _0x1a7fc3("[name=\"mapping-ctrl-key2\"]").val(_0x2461f5);
          break;
        }
      }
      for (let _0x13ac5b = 0x0; _0x13ac5b < _0x37dfd4.length; _0x13ac5b++) {
        if (_0x18eb7b[0x2] == _0x37dfd4[_0x13ac5b].vCode) {
          _0x1a7fc3("[name=\"mapping-key\"]").val(_0x13ac5b);
          break;
        }
      }
    }
    if (_0x24d602.mouse_mapping_keys == "[0,0,1024]" || _0x24d602.mouse_mapping_keys == "[0,0,1025]" || _0x24d602.mouse_mapping_keys == "[0,0,1026]" || _0x24d602.mouse_mapping_keys == "[0,0,1027]") {
      _0x1a7fc3("#wheel-delta-container").css("display", 'flex');
      _0x1a7fc3("#wheel-delta-input").val(_0x24d602.mouse_mapping_key_data);
    } else {
      _0x1a7fc3("#wheel-delta-container").css('display', "none");
    }
    var _0x1a8384 = _0x37dfd4[_0x1a7fc3("[name=\"mapping-key\"]").val()].vCode;
    if (_0x1a7fc3("[name=\"mapping-ctrl-key1\"]").val() == 0x0 && _0x1a7fc3("[name=\"mapping-ctrl-key2\"]").val() == 0x0 && _0x1a8384 != 0x0 && _0x1a8384 != 0x400 && _0x1a8384 != 0x401 && _0x1a8384 != 0x402 && _0x1a8384 != 0x403) {
      _0x1a7fc3("#mapping-key-turbo-container").css("display", '');
      if (_0x24d602.mouse_auto_click == 0x1) {
        _0x1a7fc3("#mapping-key-turbo-detail-container").css("display", '');
        _0x1a7fc3("[name=\"mapping-key-turbo\"]").prop('checked', true);
      } else {
        _0x1a7fc3("#mapping-key-turbo-detail-container").css("display", "none");
        _0x1a7fc3("[name=\"mapping-key-turbo\"]").prop("checked", false);
      }
      if (_0x24d602.mouse_auto_click_down == 0x0 && _0x24d602.mouse_auto_click_up == 0x0) {
        _0x24d602.mouse_auto_click_down = 0x32;
        _0x24d602.mouse_auto_click_up = 0x32;
      }
      _0x1a7fc3("#mapping-key-turbo-freq-input").val(parseInt(0x3e8 / (_0x24d602.mouse_auto_click_down + _0x24d602.mouse_auto_click_up)));
      _0x1a7fc3("#mapping-key-turbo-rand-input").val(_0x24d602.mouse_auto_click_rand);
      _0x1a7fc3('#mapping-key-turbo-down-keep-input').val(_0x24d602.mouse_auto_click_down);
      _0x1a7fc3("#mapping-key-turbo-up-keep-input").val(_0x24d602.mouse_auto_click_up);
      if (_0x324a55.device_info != undefined && _0x324a55.device_info.revision != undefined && _0x324a55.device_info.revision.substr(0x0, 0x2) == 'G-' && (_0x1a8384 >= 0x200 && _0x1a8384 < 767 || _0x1a8384 == 0x402 || _0x1a8384 == 0x403)) {
        _0x1a7fc3("#keys-fw-channel-gaming-tips").css("display", '');
      } else {
        _0x1a7fc3("#keys-fw-channel-gaming-tips").css("display", "none");
      }
    } else {
      _0x1a7fc3("#mapping-key-turbo-container").css("display", "none");
      _0x1a7fc3("#keys-fw-channel-gaming-tips").css("display", "none");
    }
  }
  _0x29cf59.render("checkbox");
  _0x29cf59.render("select");
}
function ui_refresh_tab_mapping_macro(_0x43b464) {
  var _0x5336c2 = layui.$;
  var _0x1e9e0e = layui.form;
  var _0x82d073 = get_select_key_info();
  if (Object.keys(_0x82d073).length == 0x0) {
    return;
  }
  if (_0x82d073.macro_style < 0x0 || _0x82d073.macro_style > 0x6) {
    _0x82d073.macro_style = 0x0;
  }
  macro_counts = [];
  for (let _0x1a00a9 = 0x0; _0x1a00a9 <= 0x6; _0x1a00a9++) {
    macro_counts.push(0x0);
  }
  for (let _0x404d16 = 0x0; _0x404d16 < onboard_keys.length; _0x404d16++) {
    var _0x345945 = onboard_keys[_0x404d16];
    if (_0x82d073.name == _0x345945.name) {
      macro_counts[_0x345945.macro_style] = _0x345945.macroKeys.length;
    }
  }
  var _0x190a42 = "<select name=\"mapping-macro-trigger-type\" lay-verify=\"required\" lay-filter=\"mapping-macro-trigger-type\">";
  for (let _0x312c42 = 0x0; _0x312c42 <= 0x6; _0x312c42++) {
    if (macro_counts[_0x312c42] > 0x0) {
      _0x190a42 += "<option value=\"" + _0x312c42 + "\">" + macro_trigger_types[_0x312c42] + '(' + macro_counts[_0x312c42] + ')' + "</option>";
      if (macro_trigger_type_index < 0x0) {
        macro_trigger_type_index = _0x312c42;
      }
    } else {
      _0x190a42 += "<option value=\"" + _0x312c42 + "\">" + macro_trigger_types[_0x312c42] + '</option>';
    }
  }
  _0x190a42 += '</select>';
  _0x5336c2("#setting-mapping-macro-trigger-type").html(_0x190a42);
  if (macro_trigger_type_index < 0x0) {
    macro_trigger_type_index = 0x0;
  }
  _0x5336c2("[name=\"mapping-macro-trigger-type\"]").val(macro_trigger_type_index);
  _0x190a42 = "<select name=\"mapping-macro-trigger-key\" lay-verify=\"required\" lay-filter=\"mapping-macro-trigger-key\">";
  for (let _0x1824dc = 0x0; _0x1824dc < mouse_key_labels.length; _0x1824dc++) {
    var _0x7756a9 = _0x1824dc > 0x0 && mouse_keys[_0x1824dc - 0x1].visible != undefined && !mouse_keys[_0x1824dc - 0x1].visible ? " disabled" : '';
    _0x190a42 += "<option value=\"" + _0x1824dc + "\"" + _0x7756a9 + '>' + mouse_key_labels[_0x1824dc] + "</option>";
  }
  _0x190a42 += '</select>';
  _0x5336c2('#setting-mapping-macro-trigger-key').html(_0x190a42);
  _0x5336c2("[name=\"mapping-macro-trigger-key\"]").val(0x0);
  var _0xa396f8 = get_key_label_from_id(_0x82d073.macro_toggleKey);
  for (let _0x51b818 = 0x0; _0x51b818 < mouse_key_labels.length; _0x51b818++) {
    if (_0xa396f8 == mouse_key_labels[_0x51b818]) {
      _0x5336c2("[name=\"mapping-macro-trigger-key\"]").val(_0x51b818);
      break;
    }
  }
  _0x190a42 = "<select name=\"mapping-macro-stop-key\" lay-verify=\"required\" lay-filter=\"mapping-macro-stop-key\">";
  for (let _0x4bfc23 = 0x0; _0x4bfc23 < mouse_key_labels.length; _0x4bfc23++) {
    var _0x7756a9 = _0x4bfc23 > 0x0 && mouse_keys[_0x4bfc23 - 0x1].visible != undefined && !mouse_keys[_0x4bfc23 - 0x1].visible ? " disabled" : '';
    _0x190a42 += "<option value=\"" + _0x4bfc23 + "\"" + _0x7756a9 + '>' + mouse_key_labels[_0x4bfc23] + '</option>';
  }
  _0x190a42 += "</select>";
  _0x5336c2("#setting-mapping-macro-stop-key").html(_0x190a42);
  _0x5336c2("[name=\"mapping-macro-stop-key\"]").val(0x0);
  _0xa396f8 = get_key_label_from_id(_0x82d073.macro_endKey);
  for (let _0x58ec70 = 0x0; _0x58ec70 < mouse_key_labels.length; _0x58ec70++) {
    if (_0xa396f8 == mouse_key_labels[_0x58ec70]) {
      _0x5336c2("[name=\"mapping-macro-stop-key\"]").val(_0x58ec70);
      break;
    }
  }
  _0x5336c2('#setting-mapping-macro-actions').html(layui.i18np.prop('STRID_SETTING_MACRO_TOTAL') + " " + macro_counts[macro_trigger_type_index] + " " + layui.i18np.prop("STRID_SETTING_MACRO_ACTIONGS"));
  _0x1e9e0e.render("select");
  _0x1e9e0e.render();
}
function ui_refresh_mapping_macro_edit(_0x237626) {
  if (_0x237626 != undefined ? is_hs_keyboard(_0x237626.device) : false) {
    kbd_ui_macro_edit_init(_0x237626);
    return;
  }
  var _0x43e42e = layui.$;
  var _0x4ed5fc = "<table>";
  _0x4ed5fc += '<tr>';
  for (let _0x43c4b6 = 0x0; _0x43c4b6 < edit_macros.length; _0x43c4b6++) {
    var _0xb435ba = edit_macros[_0x43c4b6];
    _0x4ed5fc += "<td style=\"padding-top: 3px;\">";
    _0x4ed5fc += "<a macro-edit-item-index=\"" + _0x43c4b6 + "\" macro-edit-item-action=\"select\" style=\"cursor: pointer;\">";
    if (is_dark_theme()) {
      _0x4ed5fc += "<div style=\"width: 110px;height: 60px;margin-left: 3px;background-color: #202020;\">";
    } else {
      _0x4ed5fc += "<div style=\"width: 110px;height: 60px;margin-left: 3px;background-color: gray;\">";
    }
    _0x4ed5fc += "<div class=\"layui-setting-title-container\" style=\"height: 50%;\">";
    if (_0xb435ba.mouse_key_event == 0x20a) {
      if (_0xb435ba.mouse_key_code > 0x0) {
        _0x4ed5fc += "<img src=\"" + RESOURCE_URL + "setting/mkey_up.png\" style=\"width: 20px;height: 22px; margin:4px;\"/>";
        _0x4ed5fc += "<p style=\"color: white;margin-top: 6px;\">" + layui.i18np.prop("STRID_KEY_WHELL_UP_S") + "<br>" + _0xb435ba.mouse_key_code + '</p>';
      } else {
        _0x4ed5fc += "<img src=\"" + RESOURCE_URL + "setting/mkey_down.png\" style=\"width: 20px;height: 22px; margin:4px;\"/>";
        _0x4ed5fc += "<p style=\"color: white;margin-top: 6px;\">" + layui.i18np.prop("STRID_KEY_WHELL_DOWN_S") + '<br>' + Math.abs(_0xb435ba.mouse_key_code) + "</p>";
      }
    } else {
      if (_0xb435ba.mouse_key_event == 0x20e) {
        if (_0xb435ba.mouse_key_code < 0x0) {
          _0x4ed5fc += "<img src=\"" + RESOURCE_URL + "setting/mkey_up.png\" style=\"width: 20px;height: 22px; margin:4px;\"/>";
          _0x4ed5fc += "<p style=\"color: white;margin-top: 6px;\">" + layui.i18np.prop("STRID_KEY_WHELL_LEFT_S") + "<br>" + Math.abs(_0xb435ba.mouse_key_code) + "</p>";
        } else {
          _0x4ed5fc += "<img src=\"" + RESOURCE_URL + "setting/mkey_down.png\" style=\"width: 20px;height: 22px; margin:4px;\"/>";
          _0x4ed5fc += "<p style=\"color: white;margin-top: 6px;\">" + layui.i18np.prop("STRID_KEY_WHELL_RIGHT_S") + "<br>" + _0xb435ba.mouse_key_code + "</p>";
        }
      } else {
        if (_0xb435ba.mouse_key_event == 0x200) {
          _0x4ed5fc += "<img src=\"" + RESOURCE_URL + "setting/mkey_move.png\" style=\"width: 20px;height: 22px; margin:4px;\"/>";
          var _0x13a45e = _0xb435ba.mouse_key_code >> 0x10 & 0xffff;
          var _0x162fbe = _0xb435ba.mouse_key_code & 0xffff;
          _0x4ed5fc += "<p style=\"color: white;margin-top: 6px;\">" + layui.i18np.prop("STRID_KEY_MOUSE_MOVE_S") + '<br>' + (_0x13a45e - 0x7ff) / 0xa + ':' + (_0x162fbe - 0x7ff) / 0xa + "</p>";
        } else {
          if (_0xb435ba.mouse_key_event == 0x2ff) {
            _0x4ed5fc += "<img src=\"" + RESOURCE_URL + "setting/mkey_position.png\" style=\"width: 20px;height: 22px; margin:4px;\"/>";
            var _0x8efca9 = window.screen.width;
            var _0x420852 = window.screen.height;
            var _0x5d3589 = _0xb435ba.mouse_key_code >> 0x10 & 0xffff;
            var _0x39bc50 = _0xb435ba.mouse_key_code & 0xffff;
            _0x5d3589 = parseInt(_0x5d3589 * _0x8efca9 / 0xffff);
            _0x39bc50 = parseInt(_0x39bc50 * _0x420852 / 0xffff);
            _0x4ed5fc += "<p style=\"color: white;margin-top: 6px;\">" + layui.i18np.prop("STRID_KEY_MOUSE_POSITION_S") + "<br>" + _0x5d3589 + ':' + _0x39bc50 + "</p>";
          } else if (_0xb435ba.mouse_key_code == 0x0) {
            _0x4ed5fc += "<p style=\"color: white;margin-left:4px;\">" + get_key_name_from_code(_0xb435ba.mouse_key_code) + '</p>';
          } else if (_0xb435ba.mouse_key_event == 0x101) {
            if (_0xb435ba.mouse_key_code >= 0xff && _0xb435ba.mouse_key_code < 0x200) {
              _0x4ed5fc += "<img src=\"" + RESOURCE_URL + "setting/mkey_up.png\" style=\"width: 20px;height: 22px; margin:4px;\"/>";
            } else {
              _0x4ed5fc += "<img src=\"" + RESOURCE_URL + "setting/key_up.png\" style=\"width: 20px;height: 22px; margin:4px;\"/>";
            }
            _0x4ed5fc += "<p style=\"color: white;margin-top: 6px;\">" + get_key_name_from_code(_0xb435ba.mouse_key_code) + '</p>';
          } else {
            if (_0xb435ba.mouse_key_code >= 0xff && _0xb435ba.mouse_key_code < 0x200) {
              _0x4ed5fc += "<img src=\"" + RESOURCE_URL + "setting/mkey_down.png\" style=\"width: 20px;height: 22px; margin:4px;\"/>";
            } else {
              _0x4ed5fc += "<img src=\"" + RESOURCE_URL + "setting/key_down.png\" style=\"width: 20px;height: 22px; margin:4px;\"/>";
            }
            _0x4ed5fc += "<p style=\"color: white;margin-top: 6px;\">" + get_key_name_from_code(_0xb435ba.mouse_key_code) + "</p>";
          }
        }
      }
    }
    _0x4ed5fc += "</div>";
    _0x4ed5fc += "<div class=\"layui-setting-title-container\" style=\"height: 50%;\">";
    _0x4ed5fc += "<img src=\"" + RESOURCE_URL + "setting/key_waiting.png\" style=\"width: 18px;height: 20px; margin:4px;\"/>";
    if (_0xb435ba.mouse_key_event == 0x200 && _0xb435ba.mouse_key_loop > 0x1) {
      _0x4ed5fc += "<p style=\"color: white;\">" + _0xb435ba.mouse_key_time + 'x' + _0xb435ba.mouse_key_loop + " " + layui.i18np.prop("STRID_SETTING_MAPPING_MACRO_ACTION_KEEP_TIME_MS") + '</p>';
    } else {
      _0x4ed5fc += "<p style=\"color: white;\">" + _0xb435ba.mouse_key_time + " " + layui.i18np.prop("STRID_SETTING_MAPPING_MACRO_ACTION_KEEP_TIME_MS") + '</p>';
    }
    _0x4ed5fc += "</div>";
    _0x4ed5fc += '</div>';
    _0x4ed5fc += "</a>";
    _0x4ed5fc += "</td>";
    if ((_0x43c4b6 + 0x1) % 0x5 == 0x0) {
      _0x4ed5fc += "</tr><tr>";
    }
  }
  ;
  _0x4ed5fc += "</tr>";
  _0x4ed5fc += "</table>";
  _0x43e42e("#mapping-macro-edit-container").html(_0x4ed5fc);
}
function ui_refresh_mapping_macro_add(_0x44df24) {
  var _0x1c98da = layui.$;
  var _0x41647f = layui.form;
  var _0x37b8de = layui.slider;
  var _0x53c0e8 = "<select name=\"macro-add-select-key\" lay-verify=\"required\" lay-filter=\"macro-add-select-key\">";
  for (let _0x1c4130 = 0x0; _0x1c4130 < macro_keys.length; _0x1c4130++) {
    _0x53c0e8 += "<option value=\"" + _0x1c4130 + "\">" + macro_keys[_0x1c4130].name + "</option>";
  }
  _0x53c0e8 += '</select>';
  _0x1c98da('#mapping-macro-add-select-key').html(_0x53c0e8);
  _0x1c98da("[name=\"macro-add-select-key\"]").val(0x0);
  var _0x4915b5 = Math.floor(macro_keep_time_min / 0x1f4) * 0x1f4;
  var _0x58c55d = _0x4915b5 + 0x1f4;
  if (_0x58c55d > 0xea60) {
    _0x58c55d = 0xea60;
    _0x4915b5 = _0x58c55d - 0x1f4;
  }
  var _0x28f1ad = _0x37b8de.render({
    'elem': '#slider-mapping-macro-keep-time-input',
    'min': _0x4915b5,
    'max': _0x58c55d,
    'step': 0x1,
    'value': current_edit_macro.mouse_key_time,
    'input': true,
    'tips': false,
    'theme': theme_color,
    'done': function (_0x3e9d79) {
      if (_0x3e9d79 != undefined) {
        current_edit_macro.mouse_key_time = _0x3e9d79;
      }
    }
  });
  _0x1c98da("#slider-mapping-macro-keep-time-input input").on("input", function (_0x1c43c5) {
    if (_0x1c43c5.delegateTarget.value > 0xea60) {
      _0x1c43c5.delegateTarget.value = 0xea60;
    }
    var _0x50fed7 = Math.floor(_0x1c43c5.delegateTarget.value / 0x1f4) * 0x1f4;
    var _0xdf618c = _0x50fed7 + 0x1f4;
    if (_0xdf618c > 0xea60) {
      _0xdf618c = 0xea60;
      _0x50fed7 = _0xdf618c - 0x1f4;
    }
    _0x28f1ad.config.min = _0x50fed7;
    _0x28f1ad.config.max = _0xdf618c;
    _0x28f1ad.setValue(_0x1c43c5.delegateTarget.value);
  });
  if (current_edit_macro.mouse_key_event == 0x20a) {
    for (let _0x2659b4 = 0x0; _0x2659b4 < macro_keys.length; _0x2659b4++) {
      if (macro_keys[_0x2659b4].vCode == 0x400 && current_edit_macro.mouse_key_code >= 0x0 || macro_keys[_0x2659b4].vCode == 0x401 && current_edit_macro.mouse_key_code < 0x0) {
        _0x1c98da("[name=\"macro-add-select-key\"]").val(_0x2659b4);
        break;
      }
    }
  } else {
    if (current_edit_macro.mouse_key_event == 0x20e) {
      for (let _0xa51d20 = 0x0; _0xa51d20 < macro_keys.length; _0xa51d20++) {
        if (macro_keys[_0xa51d20].vCode == 0x402 && current_edit_macro.mouse_key_code < 0x0 || macro_keys[_0xa51d20].vCode == 0x403 && current_edit_macro.mouse_key_code >= 0x0) {
          _0x1c98da("[name=\"macro-add-select-key\"]").val(_0xa51d20);
          break;
        }
      }
    } else {
      if (current_edit_macro.mouse_key_event == 0x200) {
        for (let _0x22ac8c = 0x0; _0x22ac8c < macro_keys.length; _0x22ac8c++) {
          if (macro_keys[_0x22ac8c].vCode == 0x404) {
            _0x1c98da("[name=\"macro-add-select-key\"]").val(_0x22ac8c);
            break;
          }
        }
      } else {
        if (current_edit_macro.mouse_key_event == 0x2ff) {
          for (let _0x568c93 = 0x0; _0x568c93 < macro_keys.length; _0x568c93++) {
            if (macro_keys[_0x568c93].vCode == 0x405) {
              _0x1c98da("[name=\"macro-add-select-key\"]").val(_0x568c93);
              break;
            }
          }
        } else {
          for (let _0xdd040e = 0x0; _0xdd040e < macro_keys.length; _0xdd040e++) {
            if (macro_keys[_0xdd040e].vCode == current_edit_macro.mouse_key_code) {
              _0x1c98da("[name=\"macro-add-select-key\"]").val(_0xdd040e);
              document.getElementById("kbd-macro-add-select-key").textContent = macro_keys[_0xdd040e].name;
              break;
            }
          }
        }
      }
    }
  }
  if (_0x44df24 != undefined ? is_hs_keyboard(_0x44df24.device) : false) {
    _0x1c98da('#mapping-macro-add-select-key').css("display", "none");
    _0x1c98da("#kbd-macro-add-select-key").css('display', '');
  } else {
    _0x1c98da("#mapping-macro-add-select-key").css('display', '');
    _0x1c98da("#kbd-macro-add-select-key").css("display", "none");
  }
  if (current_edit_macro.mouse_key_event == 0x20a || current_edit_macro.mouse_key_event == 0x20e) {
    _0x1c98da("#macro-add-select-key-container").css("display", "none");
    _0x1c98da('#macro-add-wheel-delta-container').css("display", '');
    _0x1c98da("#macro-add-move-delta-container").css("display", 'none');
    _0x1c98da('#macro-add-position-container').css("display", "none");
    _0x1c98da("#macro-add-wheel-delta-input").val(Math.abs(current_edit_macro.mouse_key_code));
  } else {
    if (current_edit_macro.mouse_key_event == 0x200) {
      _0x1c98da("#macro-add-select-key-container").css("display", "none");
      _0x1c98da('#macro-add-wheel-delta-container').css("display", 'none');
      _0x1c98da("#macro-add-move-delta-container").css("display", '');
      _0x1c98da("#macro-add-position-container").css("display", "none");
      var _0x12757f = current_edit_macro.mouse_key_code >> 0x10 & 0xffff;
      var _0x4aa95f = current_edit_macro.mouse_key_code & 0xffff;
      _0x1c98da("#macro-add-move-delta-x-input").val((_0x12757f - 0x7ff) / 0xa);
      _0x1c98da("#macro-add-move-delta-y-input").val((_0x4aa95f - 0x7ff) / 0xa);
      _0x1c98da('#macro-add-move-loop-input').val(current_edit_macro.mouse_key_loop);
    } else {
      if (current_edit_macro.mouse_key_event == 0x2ff) {
        _0x1c98da("#macro-add-select-key-container").css("display", "none");
        _0x1c98da("#macro-add-wheel-delta-container").css("display", "none");
        _0x1c98da("#macro-add-move-delta-container").css("display", "none");
        _0x1c98da("#macro-add-position-container").css('display', '');
        var _0x3efa43 = window.screen.width;
        var _0x59279a = window.screen.height;
        var _0x31c542 = current_edit_macro.mouse_key_code >> 0x10 & 0xffff;
        var _0xff3155 = current_edit_macro.mouse_key_code & 0xffff;
        _0x31c542 = parseInt(_0x31c542 * _0x3efa43 / 0xffff);
        _0xff3155 = parseInt(_0xff3155 * _0x59279a / 0xffff);
        _0x1c98da("#macro-add-position-x-input").val(_0x31c542);
        _0x1c98da("#macro-add-position-y-input").val(_0xff3155);
      } else {
        if (current_edit_macro.mouse_key_code == 0x0) {
          _0x1c98da("#macro-add-select-key-container").css("display", "none");
          _0x1c98da("#macro-add-wheel-delta-container").css("display", 'none');
          _0x1c98da("#macro-add-move-delta-container").css("display", "none");
          _0x1c98da('#macro-add-position-container').css("display", "none");
        } else {
          _0x1c98da("#macro-add-select-key-container").css('display', '');
          _0x1c98da("#macro-add-wheel-delta-container").css("display", "none");
          _0x1c98da('#macro-add-move-delta-container').css("display", "none");
          _0x1c98da("#macro-add-position-container").css("display", "none");
          if (current_edit_macro.mouse_key_event == 0x101) {
            _0x1c98da("[name=\"mapping-macro-action-key-event\"]")[0x1].checked = true;
          } else if (current_edit_macro.mouse_key_event == 0x100) {
            _0x1c98da("[name=\"mapping-macro-action-key-event\"]")[0x0].checked = true;
          } else {
            _0x1c98da("[name=\"mapping-macro-action-key-event\"]")[0x0].checked = false;
            _0x1c98da("[name=\"mapping-macro-action-key-event\"]")[0x1].checked = false;
          }
        }
      }
    }
  }
  _0x41647f.render("radio");
  _0x41647f.render("select");
}
function ui_refresh_tab_mapping_function(_0x42dcc7) {
  var _0x1f02ea = layui.$;
  var _0x3b95ff = layui.form;
  var _0x371724 = get_select_key_info();
  if (Object.keys(_0x371724).length == 0x0) {
    return;
  }
  var _0x319cd4 = "<select name=\"mapping-function\" lay-verify=\"required\" lay-filter=\"mapping-function\">";
  for (let _0x3974e6 = 0x0; _0x3974e6 < mouse_function_descs.length; _0x3974e6++) {
    if (mouse_functions[_0x3974e6] == 0xf && !is_bt_supported(_0x42dcc7)) {
      _0x319cd4 += "<option value=\"" + _0x3974e6 + "\" disabled>" + mouse_function_descs[_0x3974e6] + '</option>';
    } else {
      _0x319cd4 += "<option value=\"" + _0x3974e6 + "\">" + mouse_function_descs[_0x3974e6] + "</option>";
    }
  }
  _0x319cd4 += "</select>";
  _0x1f02ea("#mapping-function-select").html(_0x319cd4);
  var _0x3adeb5 = 0x0;
  for (let _0x25e27d = 0x0; _0x25e27d < mouse_functions.length; _0x25e27d++) {
    if (_0x371724.mouse_mapping_function == mouse_functions[_0x25e27d]) {
      _0x3adeb5 = _0x25e27d;
      break;
    }
  }
  _0x1f02ea("[name=\"mapping-function\"]").val(_0x3adeb5);
  _0x3b95ff.render("select");
  if (_0x371724.mouse_mapping_function == 0x9) {
    _0x1f02ea("#mapping-function-dpi-container").css('display', '');
    var _0x3e2714 = get_cpi_range(_0x42dcc7);
    var _0xfbb35f = get_cpi_step(_0x42dcc7);
    var _0x2b0cc1 = layui.slider;
    _0x2b0cc1.render({
      'elem': "#slider-function-dpi-input",
      'min': _0x3e2714[0x0],
      'max': _0x3e2714[0x1],
      'step': _0xfbb35f,
      'value': _0x371724.mouse_mapping_function_data,
      'input': true,
      'tips': false,
      'theme': theme_color,
      'done': function (_0x34f999) {
        if (_0x34f999 != undefined) {
          _0x371724.mouse_mapping_function_data = _0x34f999;
        }
      }
    });
  } else {
    _0x1f02ea("#mapping-function-dpi-container").css("display", "none");
  }
  if (_0x371724.mouse_mapping_function == 0xd) {
    _0x1f02ea("#mapping-function-toggle-esb-container").css("display", '');
  } else {
    _0x1f02ea("#mapping-function-toggle-esb-container").css("display", 'none');
  }
  var _0x3ad999 = _0x42dcc7.product_esb_ch == 0xff ? _0x42dcc7.device_info.esbChannel : _0x42dcc7.product_esb_ch;
  var _0x3f1bb1 = 0x1;
  _0x319cd4 = "<table class=\"layui-table\">";
  _0x42dcc7.device_info.esbAddressArr.forEach(_0x112bc5 => {
    var _0x5bf850;
    var _0x1e1d90;
    _0x5bf850 = _0x112bc5.substr(16, 2);
    if (_0x3ad999 == 0x0) {
      _0x1e1d90 = _0x112bc5.substr(0x0, 8);
    } else {
      _0x1e1d90 = _0x112bc5.substr(8, 8);
    }
    _0x112bc5 = _0x5bf850 + _0x1e1d90;
    if (_0x112bc5 != '0000000000') {
      _0x319cd4 += "<tr>";
      _0x319cd4 += '<td>';
      _0x319cd4 += _0x3f1bb1++;
      _0x319cd4 += '</td>';
      _0x319cd4 += "<td style=\"width: 100%;\">";
      _0x319cd4 += _0x112bc5;
      _0x319cd4 += '</td>';
      _0x319cd4 += "</tr>";
    }
  });
  _0x319cd4 += "</table>";
  _0x1f02ea("#paired-esb-addr-list").html(_0x319cd4);
  if (_0x371724.mouse_mapping_function == 0xf) {
    _0x1f02ea("#mapping-function-toggle-ble-container").css("display", '');
  } else {
    _0x1f02ea("#mapping-function-toggle-ble-container").css("display", "none");
  }
  _0x319cd4 = "<table class=\"layui-table\">";
  _0x42dcc7.device_info.peerInfo.forEach(_0x532c73 => {
    _0x319cd4 += '<tr>';
    _0x319cd4 += '<td>';
    _0x319cd4 += _0x532c73.id;
    _0x319cd4 += "</td>";
    _0x319cd4 += "<td style=\"width: 100%;\">";
    _0x319cd4 += _0x532c73.address;
    _0x319cd4 += "</td>";
    _0x319cd4 += "</tr>";
  });
  _0x319cd4 += "</table>";
  _0x1f02ea("#paired-ble-addr-list").html(_0x319cd4);
  if (_0x371724.mouse_mapping_function == 0xe) {
    _0x1f02ea("#mapping-function-show-power-container").css('display', '');
  } else {
    _0x1f02ea('#mapping-function-show-power-container').css('display', "none");
  }
  if (_0x371724.mouse_mapping_function == 0x10) {
    _0x1f02ea("#mapping-function-shell-cmd-container").css('display', '');
    document.getElementById("function-shell-cmd-app-browse").src = RESOURCE_URL + "setting/folder.png";
    if (is_valid_url(_0x371724.mouse_mapping_function_text)) {
      _0x1f02ea("[name=\"function-shell-cmd\"]")[0x1].checked = true;
      _0x1f02ea("#function-shell-cmd-app-browse").css('display', "none");
      _0x1f02ea('#function-shell-cmd-app-browse').prop("disabled", true);
      _0x1f02ea("[name=\"function-shell-cmd-app\"]").prop("disabled", true);
      _0x1f02ea("[name=\"function-shell-cmd-web\"]").prop("disabled", false);
      _0x1f02ea("[name=\"function-shell-cmd-app\"]").val('');
      _0x1f02ea("[name=\"function-shell-cmd-web\"]").val(_0x371724.mouse_mapping_function_text);
      _0x1f02ea("#function-shell-cmd-app-container").css("display", "none");
      _0x1f02ea("#function-shell-cmd-web-container").css('display', '');
    } else {
      _0x1f02ea("[name=\"function-shell-cmd\"]")[0x0].checked = true;
      _0x1f02ea("#function-shell-cmd-app-browse").css("display", "none");
      _0x1f02ea("#function-shell-cmd-app-browse").prop('disabled', false);
      _0x1f02ea("[name=\"function-shell-cmd-app\"]").prop("disabled", false);
      _0x1f02ea("[name=\"function-shell-cmd-web\"]").prop("disabled", true);
      _0x1f02ea("[name=\"function-shell-cmd-app\"]").val(_0x371724.mouse_mapping_function_text);
      _0x1f02ea("[name=\"function-shell-cmd-web\"]").val('');
      _0x1f02ea("#function-shell-cmd-app-container").css('display', '');
      _0x1f02ea("#function-shell-cmd-web-container").css("display", "none");
    }
    _0x3b95ff.render("radio");
  } else {
    _0x1f02ea('#mapping-function-shell-cmd-container').css("display", "none");
  }
}
function select_mouse_key(_0x2ee83c, _0x2a9e47) {
  if (_0x2a9e47.length == 0x0) {
    select_key_name = '';
    ui_refresh_mapping_key(_0x2ee83c);
    select_mapping_type(_0x2ee83c, 0x3);
    return;
  }
  ui_refresh_mapping_key(_0x2ee83c);
  var _0x189e7d = false;
  for (let _0x365337 = 0x0; _0x365337 < onboard_keys.length; _0x365337++) {
    var _0x5b7b4f = onboard_keys[_0x365337];
    if (_0x2a9e47 == _0x5b7b4f.name) {
      if (_0x5b7b4f.configType == 0x0) {
        if (_0x5b7b4f.touch_style == 0x1b) {
          _0x189e7d = true;
          select_mapping_type(_0x2ee83c, 0x0);
        } else if (_0x5b7b4f.touch_style == 0x1d) {
          _0x189e7d = true;
          select_mapping_type(_0x2ee83c, 0x2);
        }
      } else if (_0x5b7b4f.configType == 0x5) {
        _0x189e7d = true;
        select_mapping_type(_0x2ee83c, 0x1);
      }
      break;
    }
  }
  if (!_0x189e7d) {
    select_mapping_type(_0x2ee83c, 0x3);
  }
}
function select_mapping_type(_0x2685a7, _0xb8d29c) {
  var _0x4226b0 = get_select_key_info();
  if (Object.keys(_0x4226b0).length == 0x0) {
    _0xb8d29c = 0x3;
  }
  macro_trigger_type_index = 0x0;
  layui.element.tabChange("mapping-key-type", _0xb8d29c);
  update_mapping(_0x2685a7, _0xb8d29c);
}
function update_mapping(_0x50cce2, _0x41184e) {
  $('#mapping-key-container').css("display", "none");
  $("#mapping-macro-container").css("display", "none");
  $('#mapping-function-container').css("display", "none");
  var _0x4d2e56 = get_select_key_info();
  if (Object.keys(_0x4d2e56).length == 0x0) {
    return;
  }
  if (_0x41184e == 0x0) {
    $('#mapping-key-container').css("display", '');
    ui_refresh_tab_mapping_key(_0x50cce2);
  } else {
    if (_0x41184e == 0x1) {
      for (let _0x516c7b = 0x0; _0x516c7b <= 0x6; _0x516c7b++) {
        var _0x5efac4 = false;
        for (let _0x547598 = 0x0; _0x547598 < onboard_keys.length; _0x547598++) {
          if (onboard_keys[_0x547598].name == _0x4d2e56.name && onboard_keys[_0x547598].macro_style == _0x516c7b) {
            _0x5efac4 = true;
            break;
          }
        }
        if (!_0x5efac4) {
          var _0x41a802 = create_key_info();
          _0x41a802.name = _0x4d2e56.name;
          _0x41a802.label = _0x4d2e56.label;
          _0x41a802.configType = 0x5;
          _0x41a802.macro_style = _0x516c7b;
          onboard_keys.push(_0x41a802);
          _0x4d2e56 = get_select_key_info();
        }
      }
      $("#mapping-macro-container").css("display", '');
      ui_refresh_tab_mapping_macro(_0x50cce2);
    } else if (_0x41184e == 0x2) {
      $("#mapping-function-container").css("display", '');
      ui_refresh_tab_mapping_function(_0x50cce2);
    }
  }
}
function set_mapping_keys(_0x4a862f) {
  var _0x18857d = get_select_key_info();
  if (Object.keys(_0x18857d).length == 0x0) {
    return;
  }
  var _0x57c541 = modifiers;
  var _0x3c76e0 = _0x57c541[$("[name=\"mapping-ctrl-key1\"]").val()].vCode;
  var _0x396e8f = _0x57c541[$("[name=\"mapping-ctrl-key2\"]").val()].vCode;
  var _0x49e151 = keys;
  var _0x2ce341 = _0x49e151[$("[name=\"mapping-key\"]").val()].vCode;
  _0x18857d.mouse_mapping_keys = '[' + _0x3c76e0 + ',' + _0x396e8f + ',' + _0x2ce341 + ']';
  ui_refresh_mapping_key(_0x4a862f);
  ui_refresh_combination_key(_0x4a862f);
  need_save = true;
  ui_refresh_onboard_config(_0x4a862f);
}
function get_select_key_info() {
  if (select_key_name.length == 0x0) {
    return {};
  }
  for (let _0x3507b1 = 0x0; _0x3507b1 < onboard_keys.length; _0x3507b1++) {
    if (select_key_name == onboard_keys[_0x3507b1].name) {
      if (onboard_keys[_0x3507b1].configType == 0x5) {
        if (macro_trigger_type_index >= 0x0) {
          if (onboard_keys[_0x3507b1].macro_style == macro_trigger_type_index) {
            return onboard_keys[_0x3507b1];
          }
        } else {
          return onboard_keys[_0x3507b1];
        }
      } else {
        return onboard_keys[_0x3507b1];
      }
    }
  }
  var _0x23bdf6 = create_key_info();
  _0x23bdf6.name = select_key_name;
  var _0x3cb92d = '';
  var _0x545f49 = select_key_name.split('+');
  _0x545f49.forEach(_0x127fc4 => {
    if (_0x127fc4 == KEY_WHEEL_UP) {
      if (_0x3cb92d.length > 0x0) {
        _0x3cb92d += '+';
      }
      _0x3cb92d += 'â–²';
    } else {
      if (_0x127fc4 == KEY_WHEEL_DOWN) {
        if (_0x3cb92d.length > 0x0) {
          _0x3cb92d += '+';
        }
        _0x3cb92d += 'â–¼';
      } else {
        for (let _0x59dc28 = 0x0; _0x59dc28 < mouse_keys.length; _0x59dc28++) {
          if (_0x127fc4 == mouse_keys[_0x59dc28].name) {
            if (_0x3cb92d.length > 0x0) {
              _0x3cb92d += '+';
            }
            _0x3cb92d += mouse_keys[_0x59dc28].label;
            break;
          }
        }
      }
    }
  });
  _0x23bdf6.label = _0x3cb92d;
  _0x23bdf6.configType = -0x1;
  onboard_keys.push(_0x23bdf6);
  return _0x23bdf6;
}
function shell_cmd_app_browse_file() {
  var _0x22b896 = get_select_key_info();
  if (Object.keys(_0x22b896).length == 0x0) {
    return;
  }
  _0x22b896.mouse_mapping_function_text = $("#shell-cmd-app-browse_file").val();
  $("[name=\"function-shell-cmd-app\"]").val(_0x22b896.mouse_mapping_function_text);
}
function get_key_name_from_label(_0x28d85b) {
  for (let _0x5d8638 = 0x0; _0x5d8638 < mouse_keys.length; _0x5d8638++) {
    if (_0x28d85b == mouse_keys[_0x5d8638].label) {
      return mouse_keys[_0x5d8638].name;
    }
  }
  return '';
}
function get_key_label_from_id(_0x265c2b) {
  for (let _0x11b864 = 0x0; _0x11b864 < mouse_keys.length; _0x11b864++) {
    if (_0x265c2b == mouse_keys[_0x11b864].id[0x0]) {
      return mouse_keys[_0x11b864].label;
    }
  }
  return layui.i18np.prop("STRID_NONE");
}
function get_key_id_from_name(_0x55c831) {
  for (let _0xae3ed4 = 0x0; _0xae3ed4 < mouse_keys.length; _0xae3ed4++) {
    if (_0x55c831 == mouse_keys[_0xae3ed4].name) {
      return mouse_keys[_0xae3ed4].id[0x0];
    }
  }
  return 0x0;
}
function is_valid_url(_0x30d6bb) {
  var _0x550c19 = /^(https?:\/\/)?([\w.]+)\.([a-z]{2,6}\.?)(\/[\w.]*)*\/?$/i;
  return !!_0x550c19.test(_0x30d6bb);
}
// Periodic keep‑alive & health‑check loop (called from hub.html setInterval)
function start() {
  console.log("[DEBUG] start() called", "wireless_optimizing=", wireless_optimizing, "window_focused=", window_focused, "client_count=", usb_client_list?.length);
  if (!wireless_optimizing && window_focused) {
    usb_client_list.forEach(_0x1ba170 => {
      if (is_receiver(_0x1ba170) && _0x1ba170.helloed) {
        console.log("[DEBUG] start() -> send_event_action 0x42 for receiver", _0x1ba170?.id);
        send_event_action(_0x1ba170, 0x42, 0x0);
      }
      if (_0x1ba170.virtual) {
        if (_0x1ba170.connected) {
          if (new Date().getTime() - _0x1ba170.esb_last_alive_time > _0x1ba170.esb_alive_timeout) {
            _0x1ba170.helloed = false;
            _0x1ba170.connected = false;
            _0x1ba170.send_event_buf = new Uint8Array(0x0);
            _0x1ba170.recv_buf = new Uint8Array(0x0);
            _0x1ba170.device_name = '';
            _0x1ba170.device_info = reset_device_info(_0x1ba170.device_info);
            _0x1ba170.syncing = false;
            usb_client_list.forEach(_0x2854ae => {
              if (is_receiver(_0x2854ae) && _0x2854ae.device == _0x1ba170.device) {
                if (_0x2854ae.helloed) {
                  send_event_query(_0x1ba170);
                }
              }
            });
            window.postMessage({
              'action': ACTION_REFRESH_CURRENT_CLIENT
            });
            layui.layer.closeAll();
          } else if (true && _0x1ba170.syncing) {
            if (_0x1ba170.eplapsed_syncing_ms != 0x0 && new Date().getTime() - _0x1ba170.eplapsed_syncing_ms > 0x3e8) {
              log_r(">>>>>>>>sync success");
              _0x1ba170.syncing = false;
              _0x1ba170.recv_buf = new Uint8Array(0x0);
            }
            _0x1ba170.esb_last_alive_time = new Date().getTime();
          } else if (_0x1ba170.querying_more_result) {
            _0x1ba170.esb_last_alive_time = new Date().getTime();
          } else {
            send_event_ping(_0x1ba170, false);
          }
        }
      } else if (_0x1ba170.connected) {
        if (_0x1ba170.querying_more_result) {
          _0x1ba170.esb_last_alive_time = new Date().getTime();
        } else {
          send_event_ping(_0x1ba170, false);
        }
      }
    });
  }
}
function adjustTable() {
  var _0x528b24 = document.getElementById('settings');
  if (_0x528b24.rows.length == 0x1) {
    if (window.innerWidth < 0x6f4) {
      var _0x5df2d5 = document.createElement('table');
      var _0x26342f = document.createElement("tbody");
      var _0x4061b7 = _0x528b24.rows[0x0];
      var _0x4e552f = _0x26342f.insertRow();
      var _0x4b8304 = _0x4e552f.insertCell();
      _0x4b8304.innerHTML = _0x4061b7.cells[0x0].innerHTML;
      _0x4b8304.colSpan = 0x2;
      _0x4b8304.style = "padding-bottom: 10px;";
      _0x4e552f = _0x26342f.insertRow();
      _0x4b8304 = _0x4e552f.insertCell();
      _0x4b8304.innerHTML = _0x4061b7.cells[0x1].innerHTML;
      _0x4b8304.style = "vertical-align: top;padding-right: 30px; width: 50%;";
      _0x4b8304 = _0x4e552f.insertCell();
      _0x4b8304.innerHTML = _0x4061b7.cells[0x2].innerHTML;
      _0x4b8304.style = "vertical-align: top;padding-right: 30px;";
      _0x5df2d5.appendChild(_0x26342f);
      _0x5df2d5.style.width = "100%";
      _0x5df2d5.id = _0x528b24.id;
      _0x528b24.parentNode.replaceChild(_0x5df2d5, _0x528b24);
      if (current_usb_client != undefined) {
        setting_mapping_init(current_usb_client);
        ui_refresh_mapping_key(current_usb_client);
      }
      window.postMessage({
        'action': ACTION_UI_REFRESH_SETTING
      });
      setTimeout(function () {
        let _0x51fae2 = document.getElementById('setting-key-delay-section');
        let _0xc511ee = document.getElementById("setting-lod-section");
        _0xc511ee.style.height = _0x51fae2.offsetTop + _0x51fae2.offsetHeight - _0xc511ee.offsetTop - 0x14 + 'px';
      }, 0xfa);
    }
  } else {
    if (window.innerWidth >= 0x6f4) {
      var _0x5df2d5 = document.createElement("table");
      var _0x26342f = document.createElement("tbody");
      var _0x4e552f = _0x26342f.insertRow();
      var _0x4b8304 = _0x4e552f.insertCell();
      _0x4b8304.innerHTML = _0x528b24.rows[0x0].cells[0x0].innerHTML;
      _0x4b8304.style = "vertical-align: top;height: 1px;";
      _0x4b8304 = _0x4e552f.insertCell();
      _0x4b8304.innerHTML = _0x528b24.rows[0x1].cells[0x0].innerHTML;
      _0x4b8304.style = "width: 35%;min-width: 340px;vertical-align: top;padding-right: 30px;";
      _0x4b8304 = _0x4e552f.insertCell();
      _0x4b8304.innerHTML = _0x528b24.rows[0x1].cells[0x1].innerHTML;
      _0x4b8304.style = "width: 35%;min-width: 300px;vertical-align: top;padding-right: 30px;";
      _0x5df2d5.appendChild(_0x26342f);
      _0x5df2d5.id = _0x528b24.id;
      _0x528b24.parentNode.replaceChild(_0x5df2d5, _0x528b24);
      if (current_usb_client != undefined) {
        setting_mapping_init(current_usb_client);
        ui_refresh_mapping_key(current_usb_client);
      }
      window.postMessage({
        'action': ACTION_UI_REFRESH_SETTING
      });
      setTimeout(function () {
        let _0x55e764 = document.getElementById("setting-key-delay-section");
        let _0x24da53 = document.getElementById("setting-lod-section");
        _0x24da53.style.height = _0x55e764.offsetTop + _0x55e764.offsetHeight - _0x24da53.offsetTop - 0x14 + 'px';
      }, 0xfa);
    }
  }
}
