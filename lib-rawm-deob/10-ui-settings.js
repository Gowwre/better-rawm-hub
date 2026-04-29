let ui_refresh_setting_timer = undefined;
function ui_refresh_setting(_0x4fce20) {
  if (_0x4fce20 == undefined) {
    return;
  }
  if (_0x4fce20 != undefined ? is_hs_keyboard(_0x4fce20.device) : false) {
    return;
  }
  clearTimeout(ui_refresh_setting_timer);
  ui_refresh_setting_timer = setTimeout(() => {
    ui_refresh_setting_delayed(_0x4fce20);
    ui_refresh_setting_timer = undefined;
  }, 0x64);
}
function ui_refresh_setting_delayed(_0x2204cc) {
  var _0x4d68c2 = layui.$;
  var _0x50e254 = layui.form;
  var _0x15aa5c = layui.slider;
  var _0x2d83a6 = get_cpi_range(_0x2204cc);
  var _0x351d83 = get_cpi_step(_0x2204cc);
  var _0x16500a = _0x2204cc.device_info.resolution;
  var _0x28bf35 = _0x16500a & 0xffff;
  var _0x20e7db = _0x16500a >> 0x10 & 0xffff;
  if (_0x20e7db == 0x0) {
    _0x4d68c2("[name=\"dpi-both-x-y\"]").prop('checked', false);
    _0x4d68c2('#slider-dpi-y-input-container').css("display", "none");
    _0x4d68c2("#slider-dpi-x-input-label").css("display", "none");
    document.getElementById("slider-dpi-x-input").style.marginLeft = "0px";
  } else {
    _0x4d68c2("[name=\"dpi-both-x-y\"]").prop("checked", true);
    _0x4d68c2("#slider-dpi-y-input-container").css("display", '');
    _0x4d68c2("#slider-dpi-x-input-label").css("display", '');
    document.getElementById('slider-dpi-x-input').style.marginLeft = "18px";
  }
  if (is_cpi_xy_supported(_0x2204cc)) {
    _0x4d68c2("#dpi-both-x-y").css('display', '');
  } else {
    _0x4d68c2("#dpi-both-x-y").css("display", "none");
  }
  _0x15aa5c.render({
    'elem': "#slider-dpi-x-input",
    'min': _0x2d83a6[0x0],
    'max': _0x2d83a6[0x1],
    'step': _0x351d83,
    'value': _0x28bf35,
    'input': true,
    'tips': false,
    'theme': theme_color,
    'done': function (_0x2f28ce) {
      if (_0x2f28ce != undefined) {
        var _0x796ca5 = current_usb_client.device_info.resolution;
        var _0x4acb2e = _0x796ca5 >> 0x10 & 0xffff;
        set_cpi(current_usb_client, _0x2f28ce | _0x4acb2e << 0x10);
      }
    }
  });
  _0x15aa5c.render({
    'elem': "#slider-dpi-y-input",
    'min': _0x2d83a6[0x0],
    'max': _0x2d83a6[0x1],
    'step': _0x351d83,
    'value': _0x20e7db,
    'input': true,
    'tips': false,
    'theme': theme_color,
    'done': function (_0x17dadf) {
      if (_0x17dadf != undefined) {
        var _0x248717 = current_usb_client.device_info.resolution;
        var _0x10b983 = _0x248717 & 0xffff;
        var _0x12e50e = _0x248717 >> 0x10 & 0xffff;
        if (_0x12e50e != 0x0) {
          set_cpi(current_usb_client, _0x10b983 | _0x17dadf << 0x10);
        }
      }
    }
  });
  var _0x118fd4 = _0x4d68c2("#dpi-level-edit");
  if (cpi_level_editing) {
    _0x118fd4.addClass('layui-bg-blue');
    _0x118fd4.html(layui.i18np.prop("STRID_DONE"));
  } else {
    _0x118fd4.removeClass("layui-bg-blue");
    _0x118fd4.html(layui.i18np.prop('STRID_EDIT'));
  }
  var _0x2a841b = _0x2204cc.device_info.cpiLevels;
  var _0x1867db = 0x0;
  _0x2a841b.forEach(_0x1bdea5 => {
    if (_0x1bdea5 > 0x0) {
      _0x1867db++;
    }
  });
  if (_0x1867db < _0x2a841b.length) {
    _0x4d68c2("#dpi-level-add").css('display', '');
  } else {
    _0x4d68c2("#dpi-level-add").css("display", "none");
  }
  ui_refresh_cpi_levels(_0x2204cc);
  var _0x4d0204 = localStorage.getItem("setting-x-polling");
  if (_0x4d0204 == undefined || _0x4d0204 == 0x0) {
    var _0x1015b2 = '';
    var _0x3e17d7 = get_polling_rates(_0x2204cc, usb_client_list);
    _0x3e17d7.forEach(_0x2ec3da => {
      if (_0x2ec3da <= get_max_polling_rate(_0x2204cc, usb_client_list) && _0x2ec3da <= get_max_power_polling_rate(_0x2204cc)) {
        if (_0x2ec3da == _0x2204cc.device_info.pollingRate) {
          _0x1015b2 += "<input type=\"radio\" name=\"setting_polling_rates\" value=\"" + _0x2ec3da + "\" title=\"" + _0x2ec3da + "\" lay-filter=\"setting-polling-rates\" checked>";
        } else {
          _0x1015b2 += "<input type=\"radio\" name=\"setting_polling_rates\" value=\"" + _0x2ec3da + "\" title=\"" + _0x2ec3da + "\" lay-filter=\"setting-polling-rates\">";
        }
      } else if (_0x2ec3da == _0x2204cc.device_info.pollingRate) {
        _0x1015b2 += "<input type=\"radio\" name=\"setting_polling_rates\" value=\"" + _0x2ec3da + "\" title=\"" + _0x2ec3da + "\" lay-filter=\"setting-polling-rates\" checked disabled>";
      } else {
        _0x1015b2 += "<input type=\"radio\" name=\"setting_polling_rates\" value=\"" + _0x2ec3da + "\" title=\"" + _0x2ec3da + "\" lay-filter=\"setting-polling-rates\" disabled>";
      }
    });
    _0x4d68c2("#setting-polling-rates").html(_0x1015b2);
    _0x4d68c2("#setting-polling-rates").css('display', '');
    _0x4d68c2("#slider-x-polling-input").css("display", "none");
    _0x4d68c2("[name=\"x-polling\"]").prop("checked", false);
  } else {
    _0x4d68c2("#setting-polling-rates").css('display', 'none');
    _0x4d68c2("#slider-x-polling-input").css("display", '');
    _0x4d68c2("[name=\"x-polling\"]").prop("checked", true);
    _0x15aa5c.render({
      'elem': "#slider-x-polling-input",
      'min': 0x32,
      'max': Math.min(get_max_polling_rate(_0x2204cc, usb_client_list), get_max_power_polling_rate(_0x2204cc)),
      'step': 0x1,
      'value': _0x2204cc.device_info.pollingRate,
      'input': true,
      'tips': false,
      'theme': theme_color,
      'done': function (_0x598401) {
        if (_0x598401 != undefined) {
          set_polling_rate(_0x2204cc, _0x598401);
        }
      }
    });
  }
  if (_0x2204cc.device_info.glassMode != undefined ? _0x2204cc.device_info.glassMode == 0x1 : false) {
    _0x4d68c2("#glass-mode-activated").css("display", '');
  } else {
    _0x4d68c2("#glass-mode-activated").css("display", "none");
  }
  var _0x162d09 = _0x2204cc.device_info.light;
  if ((_0x162d09 & 32) != 0x0) {
    _0x4d68c2("[name=\"light-auto-off\"]").prop("checked", true);
  } else {
    _0x4d68c2("[name=\"light-auto-off\"]").prop("checked", false);
  }
  if ((_0x162d09 & 64) != 0x0) {
    _0x4d68c2("[name=\"light-mode\"]")[0x0].checked = true;
    _0x4d68c2("#setting-light-define-section").css("display", 'none');
    _0x4d68c2('#light').css('display', '');
  } else if ((_0x162d09 & 64) == 0x0 && (_0x162d09 & 16) == 0x0) {
    _0x4d68c2("[name=\"light-mode\"]")[0x1].checked = true;
    _0x4d68c2("#setting-light-define-section").css("display", '');
    _0x4d68c2("#light").css("display", '');
  } else {
    _0x4d68c2("[name=\"light-mode\"]")[0x2].checked = true;
    _0x4d68c2("#setting-light-define-section").css('display', "none");
    _0x4d68c2('#light').css("display", "none");
  }
  var _0x52361d = get_light_display_colors(_0x2204cc);
  var _0x1cf76f = 0x0;
  var _0x2353e0 = is_dark_theme() ? "lay-skin-color-picker" : "lay-skin-color-picker-light";
  _0x1015b2 = '<table><tr>';
  _0x52361d.forEach(_0x573a68 => {
    _0x1015b2 += "<td style=\"padding-top: 5px;\">";
    _0x1015b2 += "<a color-code=\"" + _0x573a68 + "\" light-color-action=\"select\" style=\"padding-left: 8px; padding-right: 8px;padding-top: 8px;cursor: pointer;\">";
    if (_0x573a68 == "white") {
      if ((_0x162d09 & 0x7) == 7) {
        _0x1015b2 += "<input type=\"radio\" name=\"light-color\" value=\"white\" lay-skin=\"none\" checked>";
        _0x1cf76f = 0x1;
      } else {
        _0x1015b2 += "<input type=\"radio\" name=\"light-color\" value=\"white\" lay-skin=\"none\">";
      }
      _0x1015b2 += "<div lay-radio class=\"" + _0x2353e0 + "\" style=\"color: #FFF; background-color: #FFF\"></div>";
    } else {
      if (_0x573a68 == "red") {
        if ((_0x162d09 & 0x7) == 4) {
          _0x1015b2 += "<input type=\"radio\" name=\"light-color\" value=\"red\" lay-skin=\"none\" checked>";
          _0x1cf76f = 0x1;
        } else {
          _0x1015b2 += "<input type=\"radio\" name=\"light-color\" value=\"red\" lay-skin=\"none\">";
        }
        _0x1015b2 += "<div lay-radio class=\"" + _0x2353e0 + "\" style=\"color: #F00; background-color: #F00\"></div>";
      } else {
        if (_0x573a68 == "green") {
          if ((_0x162d09 & 0x7) == 2) {
            _0x1015b2 += "<input type=\"radio\" name=\"light-color\" value=\"green\" lay-skin=\"none\" checked>";
            _0x1cf76f = 0x1;
          } else {
            _0x1015b2 += "<input type=\"radio\" name=\"light-color\" value=\"green\" lay-skin=\"none\">";
          }
          _0x1015b2 += "<div lay-radio class=\"" + _0x2353e0 + "\" style=\"color: #0F0; background-color: #0F0\"></div>";
        } else {
          if (_0x573a68 == "blue") {
            if ((_0x162d09 & 0x7) == 1) {
              _0x1015b2 += "<input type=\"radio\" name=\"light-color\" value=\"blue\" lay-skin=\"none\" checked>";
              _0x1cf76f = 0x1;
            } else {
              _0x1015b2 += "<input type=\"radio\" name=\"light-color\" value=\"blue\" lay-skin=\"none\">";
            }
            _0x1015b2 += "<div lay-radio class=\"" + _0x2353e0 + "\" style=\"color: #00F; background-color: #00F\"></div>";
          } else {
            if (_0x573a68 == "yellow") {
              if ((_0x162d09 & 0x7) == 6) {
                _0x1015b2 += "<input type=\"radio\" name=\"light-color\" value=\"yellow\" lay-skin=\"none\" checked>";
                _0x1cf76f = 0x1;
              } else {
                _0x1015b2 += "<input type=\"radio\" name=\"light-color\" value=\"yellow\" lay-skin=\"none\">";
              }
              _0x1015b2 += "<div lay-radio class=\"" + _0x2353e0 + "\" style=\"color: #FF0; background-color: #FF0\"></div>";
            } else {
              if (_0x573a68 == "purple") {
                if ((_0x162d09 & 0x7) == 5) {
                  _0x1015b2 += "<input type=\"radio\" name=\"light-color\" value=\"purple\" lay-skin=\"none\" checked>";
                  _0x1cf76f = 0x1;
                } else {
                  _0x1015b2 += "<input type=\"radio\" name=\"light-color\" value=\"purple\" lay-skin=\"none\">";
                }
                _0x1015b2 += "<div lay-radio class=\"" + _0x2353e0 + "\" style=\"color: #F0F; background-color: #F0F\"></div>";
              } else if (_0x573a68 == "skyblue") {
                if ((_0x162d09 & 0x7) == 3) {
                  _0x1015b2 += "<input type=\"radio\" name=\"light-color\" value=\"skyblue\" lay-skin=\"none\" checked>";
                  _0x1cf76f = 0x1;
                } else {
                  _0x1015b2 += "<input type=\"radio\" name=\"light-color\" value=\"skyblue\" lay-skin=\"none\">";
                }
                _0x1015b2 += "<div lay-radio class=\"" + _0x2353e0 + "\" style=\"color: #0FF; background-color: #0FF\"></div>";
              } else {
                if (_0x1cf76f == 0x0) {
                  _0x1015b2 += "<input type=\"radio\" name=\"light-color\" value=\"dark\" lay-skin=\"none\" checked>";
                } else {
                  _0x1015b2 += "<input type=\"radio\" name=\"light-color\" value=\"dark\" lay-skin=\"none\">";
                }
                _0x1015b2 += "<div lay-radio class=\"" + _0x2353e0 + "\" style=\"color: #505050; background-color: #505050\"></div>";
              }
            }
          }
        }
      }
    }
    _0x1015b2 += "</a>";
    _0x1015b2 += "</td>";
  });
  _0x1015b2 += "</tr></table>";
  _0x4d68c2('#setting-light-define-colors').html(_0x1015b2);
  _0x15aa5c.render({
    'elem': "#slider-brightness",
    'min': 0x0,
    'max': 0xff,
    'step': 0x1,
    'value': _0x2204cc.device_info.brightness,
    'input': false,
    'theme': theme_color,
    'done': function (_0x1e74c0) {
      if (_0x1e74c0 != undefined) {
        send_event_set_brightness(_0x2204cc, _0x1e74c0);
      }
    }
  });
  _0x4d68c2("#brightness").css("display", !is_brightness_supported(_0x2204cc) ? 'none' : '');
  _0x1015b2 = "<div class=\"layui-row\">";
  var _0x13bfec = _0x2204cc.device_info != undefined && _0x2204cc.device_info.revision != undefined && _0x2204cc.device_info.revision.substr(0x0, 0x2) == 'G-' ? get_power_modes2(_0x2204cc) : get_power_modes(_0x2204cc);
  for (var _0x4a2d6a = 0x0; _0x4a2d6a < _0x13bfec.length; _0x4a2d6a++) {
    if (_0x13bfec.length == 0x4) {
      _0x1015b2 += "<div class=\"layui-col-xs3\">";
    } else {
      _0x1015b2 += "<div class=\"layui-col-xs4\">";
    }
    var _0x30bf07 = _0x4a2d6a == _0x2204cc.device_info.powerMode ? " checked" : '';
    if (_0x2204cc.device_info != undefined && _0x2204cc.device_info.revision != undefined && _0x2204cc.device_info.revision.substr(0x0, 0x2) == 'G-' && _0x4a2d6a < 0x2) {
      _0x30bf07 += " disabled";
    }
    _0x1015b2 += "<input type=\"radio\" name=\"setting_power_modes\" value=\"" + _0x4a2d6a + "\" title=\"" + _0x13bfec[_0x4a2d6a] + "\" lay-filter=\"setting-power-modes\"" + _0x30bf07 + '>';
    _0x1015b2 += '</div>';
  }
  _0x1015b2 += "</div>";
  _0x4d68c2("#setting-power-modes").html(_0x1015b2);
  _0x1015b2 = '';
  var _0x13bfec = _0x2204cc.device_info != undefined && _0x2204cc.device_info.revision != undefined && _0x2204cc.device_info.revision.substr(0x0, 0x2) == 'G-' ? get_power_modes2(_0x2204cc) : get_power_modes(_0x2204cc);
  var _0xbd4d54 = _0x2204cc.device_info.powerMode;
  _0x1015b2 += _0x13bfec[_0xbd4d54];
  var _0x46a5bf = get_power_mode_tips(_0x2204cc);
  _0x1015b2 += ": " + _0x46a5bf[_0xbd4d54];
  _0x4d68c2('#selected-power-mode-tips').html(_0x1015b2);
  _0x1015b2 = "<div class=\"layui-row\">";
  var _0x3cf6f3 = get_lods_list(_0x2204cc);
  for (var _0x4a2d6a = 0x0; _0x4a2d6a < _0x3cf6f3.length; _0x4a2d6a++) {
    _0x1015b2 += "<div class=\"layui-col-xs4\">";
    if (_0x4a2d6a + 0x1 == _0x2204cc.device_info.lod) {
      _0x1015b2 += "<input type=\"radio\" name=\"setting_lods\" value=\"" + (_0x4a2d6a + 0x1) + "\" title=\"" + _0x3cf6f3[_0x4a2d6a] + "\" lay-filter=\"setting-lods\" checked>";
    } else {
      _0x1015b2 += "<input type=\"radio\" name=\"setting_lods\" value=\"" + (_0x4a2d6a + 0x1) + "\" title=\"" + _0x3cf6f3[_0x4a2d6a] + "\" lay-filter=\"setting-lods\">";
    }
    _0x1015b2 += "</div>";
  }
  _0x1015b2 += "</div>";
  _0x4d68c2('#setting-lods').html(_0x1015b2);
  _0x4d68c2("#setting-lod-section").css("display", _0x3cf6f3.length > 0x1 ? '' : "none");
  var _0x361737 = Math.round(_0x2204cc.device_info.squal * 0x64 / 0xff);
  _0x4d68c2("#surface-quality").text(layui.i18np.prop("STRID_SETTING_SURFACE_QUALITY") + " " + _0x361737 + '%');
  _0x4d68c2('#surface-quality').css("display", _0x361737 > 0x0 ? '' : 'none');
  var _0x1575aa = _0x2204cc.device_info.equal;
  if (_0x1575aa == 0xff) {
    _0x4d68c2("#wireless-quality").text('');
  } else {
    _0x1575aa = 0x3e8 - _0x1575aa;
    var _0x4071c5 = layui.i18np.prop("STRID_SETTING_WIRELESS_QUALITY") + " " + _0x1575aa / 0xa + '%';
    if ((_0x2204cc.device_info.txOutputPower == 0x0 ? 0x0 : 0x1) && !(_0x2204cc.device_info != undefined && _0x2204cc.device_info.revision != undefined && _0x2204cc.device_info.revision.substr(0x0, 0x2) == 'G-') && _0x2204cc.device_info.txOutputPowerApplied < 0x8) {
      _0x4071c5 += '(' + _0x2204cc.device_info.txOutputPowerApplied + ')';
    }
    _0x4d68c2('#wireless-quality').text(_0x4071c5);
  }
  _0x4d68c2("[name=\"setting-angle-snapping\"]").prop("checked", !!(_0x2204cc.device_info.angleSnapping == 0x1));
  _0x4d68c2("[name=\"setting-angle-snapping\"]").prop('disabled', !!(_0x2204cc.device_info != undefined && _0x2204cc.device_info.revision != undefined && _0x2204cc.device_info.revision.substr(0x0, 0x2) == 'G-'));
  _0x4d68c2("[name=\"setting-ripple-control\"]").prop("checked", !!(_0x2204cc.device_info.rippleControl == 0x1));
  _0x4d68c2("[name=\"setting-ripple-control\"]").prop("disabled", !!(_0x2204cc.device_info != undefined && _0x2204cc.device_info.revision != undefined && _0x2204cc.device_info.revision.substr(0x0, 0x2) == 'G-'));
  _0x4d68c2("[name=\"setting-motion-sync\"]").prop('checked', !!(_0x2204cc.device_info.motionSync == 0x1));
  _0x4d68c2("[name=\"setting-wireless-turbo\"]").prop('checked', !!((_0x2204cc.device_info.txOutputPower == 0x0 ? 0x0 : 0x1) == 0x1));
  _0x4d68c2("[name=\"setting-rf-channel\"]").prop('disabled', !((_0x2204cc.device_info.txOutputPower == 0x0 ? 0x0 : 0x1) == 0x1));
  if (_0x2204cc.device_info.hopChannelSupported && _0x2204cc.device_info.hopChannel) {
    _0x4d68c2("[name=\"setting-rf-channel\"]")[0x3].checked = true;
  } else {
    if (_0x2204cc.device_info.rfChannel == 0x2) {
      _0x4d68c2("[name=\"setting-rf-channel\"]")[0x0].checked = true;
    } else {
      if (_0x2204cc.device_info.rfChannel == 0x28) {
        _0x4d68c2("[name=\"setting-rf-channel\"]")[0x1].checked = true;
      } else if (_0x2204cc.device_info.rfChannel == 0x50) {
        _0x4d68c2("[name=\"setting-rf-channel\"]")[0x2].checked = true;
      }
    }
  }
  _0x4d68c2("[name=\"power-saving\"]").prop("checked", _0x2204cc.device_info.autoTxPower);
  if (!(_0x2204cc.device_info != undefined && _0x2204cc.device_info.revision != undefined && _0x2204cc.device_info.revision.substr(0x0, 0x2) == 'G-') && _0x2204cc.device_info.pollingRate <= 0x7d0 && (_0x2204cc.device_info.txOutputPower == 0x0 ? 0x0 : 0x1) == 0x1) {
    _0x4d68c2("#setting-power-saving").css('display', '');
    if (_0x2204cc.device_info.hopChannelSupported) {
      _0x4d68c2("#setting-rf-channels [class*=layui-col-xs]").each(function () {
        _0x4d68c2(this)[0x0].className = "layui-col-xs3";
      });
    } else {
      _0x4d68c2("#setting-rf-channels [class*=layui-col-xs]").each(function () {
        _0x4d68c2(this)[0x0].className = "layui-col-xs4";
      });
    }
  } else {
    _0x4d68c2('#setting-power-saving').css("display", "none");
    if (_0x2204cc.device_info.hopChannelSupported) {
      _0x4d68c2("#setting-rf-channels [class*=layui-col-xs]").each(function () {
        _0x4d68c2(this)[0x0].className = 'layui-col-xs3';
      });
    } else {
      _0x4d68c2("#setting-rf-channels [class*=layui-col-xs]").each(function () {
        _0x4d68c2(this)[0x0].className = 'layui-col-xs4';
      });
    }
  }
  _0x4d68c2("[name=\"glass-mode\"]").prop("checked", _0x2204cc.device_info.glassModeEnabled != undefined ? _0x2204cc.device_info.glassModeEnabled == 0x1 : false);
  _0x4d68c2("#setting-glass-mode").css("display", is_glass_mode_supported(_0x2204cc) ? '' : 'none');
  _0x4d68c2("#btn-wireless-optimize").css("display", _0x2204cc.device_info.hopChannelSupported ? 'none' : '');
  _0x4d68c2("#setting-wireless-turbo-desc").css("display", _0x2204cc.device_info.hopChannelSupported ? "none" : '');
  _0x4d68c2("#setting-wireless-turbo-desc2").css("display", !_0x2204cc.device_info.hopChannelSupported ? 'none' : '');
  _0x4d68c2("#setting-rf-channel-auto").css('display', !_0x2204cc.device_info.hopChannelSupported ? "none" : '');
  _0x1015b2 = '';
  if (_0x2204cc.device_info.hopChannelSupported && _0x2204cc.device_info.hopChannel) {
    _0x1015b2 += layui.i18np.prop('STRID_SETTING_RF_CHANNEL_AUTO');
    _0x1015b2 += ": " + layui.i18np.prop("STRID_SETTING_RF_CHANNEL_AUTO_TIPS");
  } else {
    if (_0x2204cc.device_info.rfChannel == 0x2) {
      _0x1015b2 += layui.i18np.prop('STRID_SETTING_RF_CHANNEL_2');
      _0x1015b2 += ": " + layui.i18np.prop("STRID_SETTING_RF_CHANNEL_2_TIPS");
    } else {
      if (_0x2204cc.device_info.rfChannel == 0x28) {
        _0x1015b2 += layui.i18np.prop("STRID_SETTING_RF_CHANNEL_40");
        _0x1015b2 += ": " + layui.i18np.prop("STRID_SETTING_RF_CHANNEL_40_TIPS");
      } else if (_0x2204cc.device_info.rfChannel == 0x50) {
        _0x1015b2 += layui.i18np.prop('STRID_SETTING_RF_CHANNEL_80');
        _0x1015b2 += ": " + layui.i18np.prop('STRID_SETTING_RF_CHANNEL_80_TIPS');
      }
    }
  }
  _0x4d68c2('#selected-rf-channel-tips').html(_0x1015b2);
  var _0x38e4f2 = _0x2204cc.device_info.sleepTime;
  if (_0x38e4f2 > 0x3c) {
    _0x38e4f2 = 0x3b + _0x38e4f2 / 0x3c;
  }
  var _0x4071c5 = _0x15aa5c.render({
    'elem': "#slider-sleep-time",
    'min': 0xa,
    'max': 0x59,
    'step': 0x1,
    'value': _0x38e4f2,
    'input': false,
    'theme': theme_color,
    'tipsAlways': true,
    'setTips': function (_0x41f01f) {
      return _0x41f01f < 0x3c ? _0x41f01f + " " + layui.i18np.prop("STRID_SETTING_UNIT_SECOND") : (_0x41f01f = _0x41f01f - 0x3b, _0x41f01f + " " + layui.i18np.prop("STRID_SETTING_UNIT_MINUTE"));
    },
    'done': function (_0x5a3590) {
      if (_0x5a3590 != undefined) {
        if (_0x5a3590 > 0x3c) {
          _0x5a3590 = (_0x5a3590 - 0x3b) * 0x3c;
        }
        if (_0x5a3590 >= 0x708) {
          _0x5a3590 = 0x708;
        }
        send_event_set_sleep_time(_0x2204cc, _0x5a3590);
      }
    }
  });
  _0x4071c5.setValue(_0x38e4f2);
  var _0x4e4b67 = _0x2204cc.device_info.angleTuning;
  if (is_angle_tuning_supported(_0x2204cc)) {
    _0x4d68c2('#setting-angle-tuning-section').css("display", '');
    _0x4071c5 = _0x15aa5c.render({
      'elem': "#slider-angle-tuning",
      'min': -0x1e,
      'max': 0x1e,
      'step': 0x1,
      'value': _0x4e4b67,
      'input': true,
      'tips': false,
      'theme': theme_color,
      'done': function (_0x3ccd32) {
        if (_0x3ccd32 != undefined) {
          set_angle_tuning(_0x2204cc, _0x3ccd32);
        }
      }
    });
    _0x4071c5.setValue(_0x4e4b67);
  } else {
    _0x4d68c2("#setting-angle-tuning-section").css('display', "none");
  }
  var _0x444af6 = _0x2204cc.device_info.keyDelay;
  if (_0x444af6.length > 0x0) {
    _0x4d68c2("#setting-key-delay-section").css("display", '');
    var _0x48f5dd = _0x4d68c2("[name=\"key-delay-select-key\"]").val();
    var _0x1cbee9 = 0x0;
    if (_0x48f5dd > 0x0) {
      var _0x5942d6 = get_key_name_from_label(mouse_key_labels[_0x48f5dd]);
      var _0x42bc26 = get_key_id_from_name(_0x5942d6);
      _0x1cbee9 = _0x42bc26 - 0xa;
      _0x1cbee9 %= _0x444af6.length;
    }
    var _0x152f7e = _0x444af6[_0x1cbee9] & 0xf;
    _0x4071c5 = _0x15aa5c.render({
      'elem': "#slider-key-down-delay",
      'min': _0x2204cc.device_info != undefined && _0x2204cc.device_info.revision != undefined && _0x2204cc.device_info.revision.substr(0x0, 0x2) == 'G-' ? 0x0 : 0x1,
      'max': 0xa,
      'step': 0x1,
      'value': _0x152f7e,
      'input': true,
      'tips': false,
      'theme': theme_color,
      'done': function (_0x1da05c) {
        if (_0x1da05c != undefined) {
          var _0x22b798 = _0x2204cc.device_info.keyDelay;
          var _0x428be1 = _0x4d68c2("[name=\"key-delay-select-key\"]").val();
          if (_0x428be1 == 0x0) {
            var _0x4b4c24 = false;
            for (var _0xc23fde = 0x0; _0xc23fde < _0x22b798.length; _0xc23fde++) {
              _0x4b4c24 |= set_key_delay(_0x2204cc, _0xc23fde, _0x1da05c & 0xf | _0x22b798[_0xc23fde] & 0xf0);
            }
            if (_0x4b4c24) {
              send_event_mouse_param(_0x2204cc);
            }
          } else {
            var _0x2ee738 = get_key_name_from_label(mouse_key_labels[_0x428be1]);
            var _0x133eba = get_key_id_from_name(_0x2ee738);
            var _0x4f6f48 = _0x133eba - 0xa;
            _0x4f6f48 %= _0x22b798.length;
            if (set_key_delay(_0x2204cc, _0x4f6f48, _0x1da05c & 0xf | _0x22b798[_0x4f6f48] & 0xf0)) {
              send_event_mouse_param(_0x2204cc);
            }
          }
          refresh_key_delay_list(_0x2204cc);
        }
      }
    });
    if (_0x2204cc.device_info != undefined && _0x2204cc.device_info.revision != undefined && _0x2204cc.device_info.revision.substr(0x0, 0x2) == 'G-') {
      var _0x24bc2e = _0x444af6[_0x1cbee9] >> 0x4 & 0xf;
      _0x4071c5 = _0x15aa5c.render({
        'elem': "#slider-key-up-delay",
        'min': 0x0,
        'max': 0xa,
        'step': 0x1,
        'value': _0x24bc2e,
        'input': true,
        'tips': false,
        'theme': theme_color,
        'done': function (_0x4099b6) {
          if (_0x4099b6 != undefined) {
            var _0xff6082 = _0x2204cc.device_info.keyDelay;
            var _0x1f8cf5 = _0x4d68c2("[name=\"key-delay-select-key\"]").val();
            if (_0x1f8cf5 == 0x0) {
              var _0x2a0ff0 = false;
              for (var _0x518a6c = 0x0; _0x518a6c < _0xff6082.length; _0x518a6c++) {
                _0x2a0ff0 |= set_key_delay(_0x2204cc, _0x518a6c, _0x4099b6 << 0x4 & 0xf0 | _0xff6082[_0x518a6c] & 0xf);
              }
              if (_0x2a0ff0) {
                send_event_mouse_param(_0x2204cc);
              }
            } else {
              var _0x4474b2 = get_key_name_from_label(mouse_key_labels[_0x1f8cf5]);
              var _0x2699c5 = get_key_id_from_name(_0x4474b2);
              var _0x2bcfdd = _0x2699c5 - 0xa;
              _0x2bcfdd %= _0xff6082.length;
              if (set_key_delay(_0x2204cc, _0x2bcfdd, _0x4099b6 << 0x4 & 0xf0 | _0xff6082[_0x2bcfdd] & 0xf)) {
                send_event_mouse_param(_0x2204cc);
              }
            }
            refresh_key_delay_list(_0x2204cc);
          }
        }
      });
    }
    refresh_key_delay_list(_0x2204cc);
  } else {
    _0x4d68c2("#setting-key-delay-section").css('display', '');
  }
  _0x50e254.render('radio');
  _0x50e254.render('checkbox');
  onboard_status = _0x2204cc.device_info.onboardStatus;
  ui_refresh_setting_mapping(_0x2204cc);
  setTimeout(function () {
    let _0x14c5e9 = document.getElementById("setting-key-delay-section");
    let _0xbbd97b = document.getElementById('setting-lod-section');
    _0xbbd97b.style.height = _0x14c5e9.offsetTop + _0x14c5e9.offsetHeight - _0xbbd97b.offsetTop - 0x14 + 'px';
  }, 0x1);
}
function refresh_key_delay_list(_0x21207f) {
  var _0x5913e3 = layui.$;
  var _0xb15b6f = layui.form;
  var _0x36e783 = _0x21207f.device_info.keyDelay;
  var _0x2393d8 = _0x5913e3("[name=\"key-delay-select-key\"] option");
  for (let _0x32dd6f = 0x1; _0x32dd6f < mouse_key_labels.length; _0x32dd6f++) {
    var _0x2375d4 = get_key_name_from_label(mouse_key_labels[_0x32dd6f]);
    var _0x3ece9a = get_key_id_from_name(_0x2375d4);
    var _0x3eceff = _0x3ece9a - 0xa;
    _0x3eceff %= _0x36e783.length;
    var _0x5865af = mouse_key_labels[_0x32dd6f];
    if (mouse_key_labels[_0x32dd6f] == 'â‘ ') {
      _0x5865af = layui.i18np.prop("STRID_KEY_LEFT_S");
    } else {
      if (mouse_key_labels[_0x32dd6f] == 'â‘¡') {
        _0x5865af = layui.i18np.prop("STRID_KEY_MIDDLE_S");
      } else if (mouse_key_labels[_0x32dd6f] == 'â‘¢') {
        _0x5865af = layui.i18np.prop("STRID_KEY_RIGHT_S");
      }
    }
    if (_0x21207f.device_info != undefined && _0x21207f.device_info.revision != undefined && _0x21207f.device_info.revision.substr(0x0, 0x2) == 'G-') {
      _0x2393d8[_0x32dd6f].textContent = _0x5865af + " - " + (_0x36e783[_0x3eceff] & 0xf) + '/' + (_0x36e783[_0x3eceff] >> 0x4 & 0xf) + " ms";
    } else {
      _0x2393d8[_0x32dd6f].textContent = _0x5865af + " - " + (_0x36e783[_0x3eceff] & 0xf) + " ms";
    }
    _0x2393d8[_0x32dd6f].disabled = mouse_keys[_0x32dd6f - 0x1].visible != undefined && !mouse_keys[_0x32dd6f - 0x1].visible;
  }
  _0xb15b6f.render('select');
}
function ui_refresh_cpi_levels(_0x440fb1) {
  var _0x2371dc = _0x440fb1.device_info.resolution;
  var _0x2485a5 = _0x2371dc & 0xffff;
  var _0x2d4a90 = _0x2371dc >> 0x10 & 0xffff;
  var _0x1b8c14 = _0x440fb1.device_info.cpiLevels;
  var _0x40f750 = _0x440fb1.device_info.cpiLevelColors;
  var _0x2f7d0d = is_dark_theme() ? '' : "_gray";
  var _0x6a19c6 = "<div class=\"layui-row\" style=\"margin-top: 10px;\">";
  for (let _0x8e8f30 = 0x0; _0x8e8f30 < _0x1b8c14.length; _0x8e8f30++) {
    var _0xbb3876 = _0x1b8c14[_0x8e8f30];
    var _0x3c6057 = _0xbb3876 & 0xffff;
    var _0x50556c = _0xbb3876 >> 0x10 & 0xffff;
    if (_0x50556c == 0x0) {
      _0x50556c = _0x3c6057;
    }
    var _0x26a7f5 = _0x40f750[_0x8e8f30];
    if (_0xbb3876 <= 0x0) {
      _0x6a19c6 += "<div class=\"layui-col-xs3\" style=\"padding-top: 3px;padding-bottom: 3px;width: fit-content;display: none;\">";
    } else {
      _0x6a19c6 += "<div class=\"layui-col-xs3\" style=\"padding-top: 3px;padding-bottom: 3px;width: fit-content;\">";
    }
    _0x6a19c6 += "<a cpi-level-index=\"" + _0x8e8f30 + "\" cpi-level-action=\"select\" style=\"cursor: pointer;\">";
    if (_0x2d4a90 == 0x0) {
      _0x6a19c6 += "<div style=\"width: 80px;height: 30px;margin-right: 6px;\">";
    } else {
      _0x6a19c6 += "<div style=\"width: 80px;height: 54px;margin-right: 6px;\">";
    }
    _0x6a19c6 += "<div style=\"position: absolute;\">";
    if (_0x2d4a90 == 0x0) {
      if (cpi_level_editing || _0x2485a5 == _0x3c6057) {
        _0x6a19c6 += "<img src=\"" + RESOURCE_URL + "setting/dpi_selected" + _0x2f7d0d + ".png\" style=\"position: absolute;\"/>";
      } else {
        _0x6a19c6 += "<img src=\"" + RESOURCE_URL + "setting/dpi_normal.png\" style=\"position: absolute;\"/>";
      }
    } else if (cpi_level_editing || _0x2371dc == _0xbb3876) {
      _0x6a19c6 += "<img src=\"" + RESOURCE_URL + "setting/dpi_selected_h" + _0x2f7d0d + ".png\" style=\"position: absolute;\"/>";
    } else {
      _0x6a19c6 += "<img src=\"" + RESOURCE_URL + "setting/dpi_normal_h.png\" style=\"position: absolute;\"/>";
    }
    _0x6a19c6 += '</div>';
    _0x6a19c6 += "<div style=\"position: absolute;\">";
    var _0x1a5188 = 0x0;
    if (_0x2d4a90 > 0x0) {
      _0x1a5188 = 0xc;
    }
    if ((_0x26a7f5 & 0x7) == 7) {
      _0x6a19c6 += "<img src=\"" + RESOURCE_URL + 'setting/dpi_color_' + "white" + ".png\" style=\"position: absolute; margin-top:" + _0x1a5188 + "px;\"/>";
    } else {
      if ((_0x26a7f5 & 0x7) == 4) {
        _0x6a19c6 += "<img src=\"" + RESOURCE_URL + 'setting/dpi_color_' + "red" + ".png\" style=\"position: absolute; margin-top:" + _0x1a5188 + "px;\"/>";
      } else {
        if ((_0x26a7f5 & 0x7) == 2) {
          _0x6a19c6 += "<img src=\"" + RESOURCE_URL + "setting/dpi_color_" + "green" + ".png\" style=\"position: absolute; margin-top:" + _0x1a5188 + "px;\"/>";
        } else {
          if ((_0x26a7f5 & 0x7) == 1) {
            _0x6a19c6 += "<img src=\"" + RESOURCE_URL + 'setting/dpi_color_' + "blue" + ".png\" style=\"position: absolute; margin-top:" + _0x1a5188 + "px;\"/>";
          } else {
            if ((_0x26a7f5 & 0x7) == 6) {
              _0x6a19c6 += "<img src=\"" + RESOURCE_URL + "setting/dpi_color_" + 'yellow' + ".png\" style=\"position: absolute; margin-top:" + _0x1a5188 + "px;\"/>";
            } else {
              if ((_0x26a7f5 & 0x7) == 5) {
                _0x6a19c6 += "<img src=\"" + RESOURCE_URL + "setting/dpi_color_" + "purple" + ".png\" style=\"position: absolute; margin-top:" + _0x1a5188 + "px;\"/>";
              } else {
                if ((_0x26a7f5 & 0x7) == 3) {
                  _0x6a19c6 += "<img src=\"" + RESOURCE_URL + 'setting/dpi_color_' + "skyblue" + ".png\" style=\"position: absolute; margin-top:" + _0x1a5188 + "px;\"/>";
                } else {}
              }
            }
          }
        }
      }
    }
    _0x6a19c6 += "</div>";
    _0x6a19c6 += "<div style=\"position: absolute;width: 80px;\">";
    if (_0x2d4a90 == 0x0) {
      if (cpi_level_editing || _0x2371dc == _0xbb3876) {
        _0x6a19c6 += "<p style=\"color:white;text-align: center;margin-top: 7px;\" >" + _0x3c6057 + '</p>';
      } else {
        _0x6a19c6 += "<p style=\"text-align: center;margin-top: 7px;\" >" + _0x3c6057 + "</p>";
      }
    } else if (cpi_level_editing || _0x2371dc == _0xbb3876) {
      _0x6a19c6 += "<p style=\"color:white;text-align: center;margin-top: 10px;\" >X:" + _0x3c6057 + "</p>";
      _0x6a19c6 += "<p style=\"color:white;text-align: center;margin-top: 2px;\" >" + 'Y:' + _0x50556c + "</p>";
    } else {
      _0x6a19c6 += "<p style=\"text-align: center;margin-top: 10px;\" >" + 'X:' + _0x3c6057 + '</p>';
      _0x6a19c6 += "<p style=\"text-align: center;margin-top: 2px;\" >" + 'Y:' + _0x50556c + "</p>";
    }
    _0x6a19c6 += "</div>";
    _0x6a19c6 += "</div>";
    _0x6a19c6 += "</a>";
    _0x6a19c6 += "</div>";
    if (_0x8e8f30 == 0x3) {
      _0x6a19c6 += "</div><div class=\"layui-row\">";
    }
  }
  ;
  _0x6a19c6 += "</div>";
  $("#setting-dpi-levels").html(_0x6a19c6);
}
function ui_refresh_dpi_input_panel(_0x8b014d, _0x1d93cc, _0x582874, _0x2ef282, _0x4e4b38) {
  cpi_level_light = _0x2ef282;
  if (_0x4e4b38) {
    $('#dpi-level-input-layout').css("display", "none");
    $("#x-dpi-level-input-layout").css("display", '');
    $("#y-dpi-level-input-layout").css("display", '');
    $("#dpi-level-input-hint").html(layui.i18np.prop("STRID_SETTING_DPI_LEVEL_SPEED_INPUT_XY"));
  } else {
    $("#dpi-level-input-layout").css("display", '');
    $("#x-dpi-level-input-layout").css('display', "none");
    $("#y-dpi-level-input-layout").css("display", 'none');
    $('#dpi-level-input-hint').html(layui.i18np.prop("STRID_SETTING_DPI_LEVEL_SPEED_INPUT"));
  }
  var _0x125d66 = get_cpi_range(_0x8b014d);
  var _0x4a0fc6 = get_cpi_step(_0x8b014d);
  var _0x5f2d8b = document.getElementById("dpi-level-input");
  _0x5f2d8b.setAttribute("step", _0x4a0fc6);
  _0x5f2d8b.setAttribute("min", _0x125d66[0x0]);
  _0x5f2d8b.setAttribute("max", _0x125d66[0x1]);
  _0x5f2d8b = document.getElementById("x-dpi-level-input");
  _0x5f2d8b.setAttribute('step', _0x4a0fc6);
  _0x5f2d8b.setAttribute('min', _0x125d66[0x0]);
  _0x5f2d8b.setAttribute("max", _0x125d66[0x1]);
  _0x5f2d8b = document.getElementById("y-dpi-level-input");
  _0x5f2d8b.setAttribute("step", _0x4a0fc6);
  _0x5f2d8b.setAttribute('min', _0x125d66[0x0]);
  _0x5f2d8b.setAttribute('max', _0x125d66[0x1]);
  $('#dpi-level-input').val(_0x1d93cc);
  $("#x-dpi-level-input").val(_0x1d93cc);
  $("#y-dpi-level-input").val(_0x582874);
  var _0x3d7140 = get_light_display_colors(_0x8b014d);
  var _0x20f2d2 = 0x0;
  var _0x4ed217 = is_dark_theme() ? "lay-skin-color-picker" : "lay-skin-color-picker-light";
  html = '<table><tr>';
  _0x3d7140.forEach(_0x277c92 => {
    html += "<td style=\"padding-top: 5px;\">";
    html += "<a color-code=\"" + _0x277c92 + "\" dpi-level-color-action=\"select\" style=\"padding-left: 8px; padding-right: 8px;padding-top: 8px;cursor: pointer;\">";
    if (_0x277c92 == "white") {
      if ((_0x2ef282 & 0x7) == 7) {
        html += "<input type=\"radio\" name=\"dpi-level-color\" value=\"white\" lay-skin=\"none\" checked>";
        _0x20f2d2 = 0x1;
      } else {
        html += "<input type=\"radio\" name=\"dpi-level-color\" value=\"white\" lay-skin=\"none\">";
      }
      html += "<div lay-radio class=\"" + _0x4ed217 + "\" style=\"color: #FFF; background-color: #FFF\"></div>";
    } else {
      if (_0x277c92 == 'red') {
        if ((_0x2ef282 & 0x7) == 4) {
          html += "<input type=\"radio\" name=\"dpi-level-color\" value=\"red\" lay-skin=\"none\" checked>";
          _0x20f2d2 = 0x1;
        } else {
          html += "<input type=\"radio\" name=\"dpi-level-color\" value=\"red\" lay-skin=\"none\">";
        }
        html += "<div lay-radio class=\"" + _0x4ed217 + "\" style=\"color: #F00; background-color: #F00\"></div>";
      } else {
        if (_0x277c92 == "green") {
          if ((_0x2ef282 & 0x7) == 2) {
            html += "<input type=\"radio\" name=\"dpi-level-color\" value=\"green\" lay-skin=\"none\" checked>";
            _0x20f2d2 = 0x1;
          } else {
            html += "<input type=\"radio\" name=\"dpi-level-color\" value=\"green\" lay-skin=\"none\">";
          }
          html += "<div lay-radio class=\"" + _0x4ed217 + "\" style=\"color: #0F0; background-color: #0F0\"></div>";
        } else {
          if (_0x277c92 == "blue") {
            if ((_0x2ef282 & 0x7) == 1) {
              html += "<input type=\"radio\" name=\"dpi-level-color\" value=\"blue\" lay-skin=\"none\" checked>";
              _0x20f2d2 = 0x1;
            } else {
              html += "<input type=\"radio\" name=\"dpi-level-color\" value=\"blue\" lay-skin=\"none\">";
            }
            html += "<div lay-radio class=\"" + _0x4ed217 + "\" style=\"color: #00F; background-color: #00F\"></div>";
          } else {
            if (_0x277c92 == "yellow") {
              if ((_0x2ef282 & 0x7) == 6) {
                html += "<input type=\"radio\" name=\"dpi-level-color\" value=\"yellow\" lay-skin=\"none\" checked>";
                _0x20f2d2 = 0x1;
              } else {
                html += "<input type=\"radio\" name=\"dpi-level-color\" value=\"yellow\" lay-skin=\"none\">";
              }
              html += "<div lay-radio class=\"" + _0x4ed217 + "\" style=\"color: #FF0; background-color: #FF0\"></div>";
            } else {
              if (_0x277c92 == "purple") {
                if ((_0x2ef282 & 0x7) == 5) {
                  html += "<input type=\"radio\" name=\"dpi-level-color\" value=\"purple\" lay-skin=\"none\" checked>";
                  _0x20f2d2 = 0x1;
                } else {
                  html += "<input type=\"radio\" name=\"dpi-level-color\" value=\"purple\" lay-skin=\"none\">";
                }
                html += "<div lay-radio class=\"" + _0x4ed217 + "\" style=\"color: #F0F; background-color: #F0F\"></div>";
              } else if (_0x277c92 == 'skyblue') {
                if ((_0x2ef282 & 0x7) == 3) {
                  html += "<input type=\"radio\" name=\"dpi-level-color\" value=\"skyblue\" lay-skin=\"none\" checked>";
                  _0x20f2d2 = 0x1;
                } else {
                  html += "<input type=\"radio\" name=\"dpi-level-color\" value=\"skyblue\" lay-skin=\"none\">";
                }
                html += "<div lay-radio class=\"" + _0x4ed217 + "\" style=\"color: #0FF; background-color: #0FF\"></div>";
              } else {
                if (_0x20f2d2 == 0x0) {
                  html += "<input type=\"radio\" name=\"dpi-level-color\" value=\"dark\" lay-skin=\"none\" checked>";
                } else {
                  html += "<input type=\"radio\" name=\"dpi-level-color\" value=\"dark\" lay-skin=\"none\">";
                }
                html += "<div lay-radio class=\"" + _0x4ed217 + "\" style=\"color: #505050; background-color: #505050\"></div>";
              }
            }
          }
        }
      }
    }
    html += "</a>";
    html += "</td>";
  });
  html += '</tr></table>';
  $("#dpi-input-colors").html(html);
  layui.form.render();
}
