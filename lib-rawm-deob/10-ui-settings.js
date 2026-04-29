let ui_refresh_setting_timer = undefined;
function ui_refresh_setting(client) {
  if (client == undefined) {
    return;
  }
  if (client != undefined ? is_hs_keyboard(client.device) : false) {
    return;
  }
  clearTimeout(ui_refresh_setting_timer);
  ui_refresh_setting_timer = setTimeout(() => {
    ui_refresh_setting_delayed(client);
    ui_refresh_setting_timer = undefined;
  }, 0x64);
}
function ui_refresh_setting_delayed(client) {
  var layui2 = layui.$;
  var layui3 = layui.form;
  var layui4 = layui.slider;
  var cpiRange = get_cpi_range(client);
  var value = get_cpi_step(client);
  var value2 = client.device_info.resolution;
  var value3 = value2 & 0xffff;
  var value4 = value2 >> 0x10 & 0xffff;
  if (value4 == 0x0) {
    layui2("[name=\"dpi-both-x-y\"]").prop('checked', false);
    layui2('#slider-dpi-y-input-container').css("display", "none");
    layui2("#slider-dpi-x-input-label").css("display", "none");
    document.getElementById("slider-dpi-x-input").style.marginLeft = "0px";
  } else {
    layui2("[name=\"dpi-both-x-y\"]").prop("checked", true);
    layui2("#slider-dpi-y-input-container").css("display", '');
    layui2("#slider-dpi-x-input-label").css("display", '');
    document.getElementById('slider-dpi-x-input').style.marginLeft = "18px";
  }
  if (is_cpi_xy_supported(client)) {
    layui2("#dpi-both-x-y").css('display', '');
  } else {
    layui2("#dpi-both-x-y").css("display", "none");
  }
  layui4.render({
    'elem': "#slider-dpi-x-input",
    'min': cpiRange[0x0],
    'max': cpiRange[0x1],
    'step': value,
    'value': value3,
    'input': true,
    'tips': false,
    'theme': theme_color,
    'done': function (result) {
      if (result != undefined) {
        var resolution = current_usb_client.device_info.resolution;
        var value5 = resolution >> 0x10 & 0xffff;
        set_cpi(current_usb_client, result | value5 << 0x10);
      }
    }
  });
  layui4.render({
    'elem': "#slider-dpi-y-input",
    'min': cpiRange[0x0],
    'max': cpiRange[0x1],
    'step': value,
    'value': value4,
    'input': true,
    'tips': false,
    'theme': theme_color,
    'done': function (result) {
      if (result != undefined) {
        var resolution2 = current_usb_client.device_info.resolution;
        var value6 = resolution2 & 0xffff;
        var value7 = resolution2 >> 0x10 & 0xffff;
        if (value7 != 0x0) {
          set_cpi(current_usb_client, value6 | result << 0x10);
        }
      }
    }
  });
  var value8 = layui2("#dpi-level-edit");
  if (cpi_level_editing) {
    value8.addClass('layui-bg-blue');
    value8.html(layui.i18np.prop("STRID_DONE"));
  } else {
    value8.removeClass("layui-bg-blue");
    value8.html(layui.i18np.prop('STRID_EDIT'));
  }
  var arr = client.device_info.cpiLevels;
  var offset = 0x0;
  arr.forEach(item => {
    if (item > 0x0) {
      offset++;
    }
  });
  if (offset < arr.length) {
    layui2("#dpi-level-add").css('display', '');
  } else {
    layui2("#dpi-level-add").css("display", "none");
  }
  ui_refresh_cpi_levels(client);
  var stored = localStorage.getItem("setting-x-polling");
  if (stored == undefined || stored == 0x0) {
    var html = '';
    var arr2 = get_polling_rates(client, usb_client_list);
    arr2.forEach(item2 => {
      if (item2 <= get_max_polling_rate(client, usb_client_list) && item2 <= get_max_power_polling_rate(client)) {
        if (item2 == client.device_info.pollingRate) {
          html += "<input type=\"radio\" name=\"setting_polling_rates\" value=\"" + item2 + "\" title=\"" + item2 + "\" lay-filter=\"setting-polling-rates\" checked>";
        } else {
          html += "<input type=\"radio\" name=\"setting_polling_rates\" value=\"" + item2 + "\" title=\"" + item2 + "\" lay-filter=\"setting-polling-rates\">";
        }
      } else if (item2 == client.device_info.pollingRate) {
        html += "<input type=\"radio\" name=\"setting_polling_rates\" value=\"" + item2 + "\" title=\"" + item2 + "\" lay-filter=\"setting-polling-rates\" checked disabled>";
      } else {
        html += "<input type=\"radio\" name=\"setting_polling_rates\" value=\"" + item2 + "\" title=\"" + item2 + "\" lay-filter=\"setting-polling-rates\" disabled>";
      }
    });
    layui2("#setting-polling-rates").html(html);
    layui2("#setting-polling-rates").css('display', '');
    layui2("#slider-x-polling-input").css("display", "none");
    layui2("[name=\"x-polling\"]").prop("checked", false);
  } else {
    layui2("#setting-polling-rates").css('display', 'none');
    layui2("#slider-x-polling-input").css("display", '');
    layui2("[name=\"x-polling\"]").prop("checked", true);
    layui4.render({
      'elem': "#slider-x-polling-input",
      'min': 0x32,
      'max': Math.min(get_max_polling_rate(client, usb_client_list), get_max_power_polling_rate(client)),
      'step': 0x1,
      'value': client.device_info.pollingRate,
      'input': true,
      'tips': false,
      'theme': theme_color,
      'done': function (result) {
        if (result != undefined) {
          set_polling_rate(client, result);
        }
      }
    });
  }
  if (client.device_info.glassMode != undefined ? client.device_info.glassMode == 0x1 : false) {
    layui2("#glass-mode-activated").css("display", '');
  } else {
    layui2("#glass-mode-activated").css("display", "none");
  }
  var value9 = client.device_info.light;
  if ((value9 & 32) != 0x0) {
    layui2("[name=\"light-auto-off\"]").prop("checked", true);
  } else {
    layui2("[name=\"light-auto-off\"]").prop("checked", false);
  }
  if ((value9 & 64) != 0x0) {
    layui2("[name=\"light-mode\"]")[0x0].checked = true;
    layui2("#setting-light-define-section").css("display", 'none');
    layui2('#light').css('display', '');
  } else if ((value9 & 64) == 0x0 && (value9 & 16) == 0x0) {
    layui2("[name=\"light-mode\"]")[0x1].checked = true;
    layui2("#setting-light-define-section").css("display", '');
    layui2("#light").css("display", '');
  } else {
    layui2("[name=\"light-mode\"]")[0x2].checked = true;
    layui2("#setting-light-define-section").css('display', "none");
    layui2('#light').css("display", "none");
  }
  var arr3 = get_light_display_colors(client);
  var offset2 = 0x0;
  var darkTheme = is_dark_theme() ? "lay-skin-color-picker" : "lay-skin-color-picker-light";
  html = '<table><tr>';
  arr3.forEach(item3 => {
    html += "<td style=\"padding-top: 5px;\">";
    html += "<a color-code=\"" + item3 + "\" light-color-action=\"select\" style=\"padding-left: 8px; padding-right: 8px;padding-top: 8px;cursor: pointer;\">";
    if (item3 == "white") {
      if ((value9 & 0x7) == 7) {
        html += "<input type=\"radio\" name=\"light-color\" value=\"white\" lay-skin=\"none\" checked>";
        offset2 = 0x1;
      } else {
        html += "<input type=\"radio\" name=\"light-color\" value=\"white\" lay-skin=\"none\">";
      }
      html += "<div lay-radio class=\"" + darkTheme + "\" style=\"color: #FFF; background-color: #FFF\"></div>";
    } else {
      if (item3 == "red") {
        if ((value9 & 0x7) == 4) {
          html += "<input type=\"radio\" name=\"light-color\" value=\"red\" lay-skin=\"none\" checked>";
          offset2 = 0x1;
        } else {
          html += "<input type=\"radio\" name=\"light-color\" value=\"red\" lay-skin=\"none\">";
        }
        html += "<div lay-radio class=\"" + darkTheme + "\" style=\"color: #F00; background-color: #F00\"></div>";
      } else {
        if (item3 == "green") {
          if ((value9 & 0x7) == 2) {
            html += "<input type=\"radio\" name=\"light-color\" value=\"green\" lay-skin=\"none\" checked>";
            offset2 = 0x1;
          } else {
            html += "<input type=\"radio\" name=\"light-color\" value=\"green\" lay-skin=\"none\">";
          }
          html += "<div lay-radio class=\"" + darkTheme + "\" style=\"color: #0F0; background-color: #0F0\"></div>";
        } else {
          if (item3 == "blue") {
            if ((value9 & 0x7) == 1) {
              html += "<input type=\"radio\" name=\"light-color\" value=\"blue\" lay-skin=\"none\" checked>";
              offset2 = 0x1;
            } else {
              html += "<input type=\"radio\" name=\"light-color\" value=\"blue\" lay-skin=\"none\">";
            }
            html += "<div lay-radio class=\"" + darkTheme + "\" style=\"color: #00F; background-color: #00F\"></div>";
          } else {
            if (item3 == "yellow") {
              if ((value9 & 0x7) == 6) {
                html += "<input type=\"radio\" name=\"light-color\" value=\"yellow\" lay-skin=\"none\" checked>";
                offset2 = 0x1;
              } else {
                html += "<input type=\"radio\" name=\"light-color\" value=\"yellow\" lay-skin=\"none\">";
              }
              html += "<div lay-radio class=\"" + darkTheme + "\" style=\"color: #FF0; background-color: #FF0\"></div>";
            } else {
              if (item3 == "purple") {
                if ((value9 & 0x7) == 5) {
                  html += "<input type=\"radio\" name=\"light-color\" value=\"purple\" lay-skin=\"none\" checked>";
                  offset2 = 0x1;
                } else {
                  html += "<input type=\"radio\" name=\"light-color\" value=\"purple\" lay-skin=\"none\">";
                }
                html += "<div lay-radio class=\"" + darkTheme + "\" style=\"color: #F0F; background-color: #F0F\"></div>";
              } else if (item3 == "skyblue") {
                if ((value9 & 0x7) == 3) {
                  html += "<input type=\"radio\" name=\"light-color\" value=\"skyblue\" lay-skin=\"none\" checked>";
                  offset2 = 0x1;
                } else {
                  html += "<input type=\"radio\" name=\"light-color\" value=\"skyblue\" lay-skin=\"none\">";
                }
                html += "<div lay-radio class=\"" + darkTheme + "\" style=\"color: #0FF; background-color: #0FF\"></div>";
              } else {
                if (offset2 == 0x0) {
                  html += "<input type=\"radio\" name=\"light-color\" value=\"dark\" lay-skin=\"none\" checked>";
                } else {
                  html += "<input type=\"radio\" name=\"light-color\" value=\"dark\" lay-skin=\"none\">";
                }
                html += "<div lay-radio class=\"" + darkTheme + "\" style=\"color: #505050; background-color: #505050\"></div>";
              }
            }
          }
        }
      }
    }
    html += "</a>";
    html += "</td>";
  });
  html += "</tr></table>";
  layui2('#setting-light-define-colors').html(html);
  layui4.render({
    'elem': "#slider-brightness",
    'min': 0x0,
    'max': 0xff,
    'step': 0x1,
    'value': client.device_info.brightness,
    'input': false,
    'theme': theme_color,
    'done': function (result) {
      if (result != undefined) {
        send_event_set_brightness(client, result);
      }
    }
  });
  layui2("#brightness").css("display", !is_brightness_supported(client) ? 'none' : '');
  html = "<div class=\"layui-row\">";
  var len = client.device_info != undefined && client.device_info.revision != undefined && client.device_info.revision.substr(0x0, 0x2) == 'G-' ? get_power_modes2(client) : get_power_modes(client);
  for (var index = 0x0; index < len.length; index++) {
    if (len.length == 0x4) {
      html += "<div class=\"layui-col-xs3\">";
    } else {
      html += "<div class=\"layui-col-xs4\">";
    }
    var str = index == client.device_info.powerMode ? " checked" : '';
    if (client.device_info != undefined && client.device_info.revision != undefined && client.device_info.revision.substr(0x0, 0x2) == 'G-' && index < 0x2) {
      str += " disabled";
    }
    html += "<input type=\"radio\" name=\"setting_power_modes\" value=\"" + index + "\" title=\"" + len[index] + "\" lay-filter=\"setting-power-modes\"" + str + '>';
    html += '</div>';
  }
  html += "</div>";
  layui2("#setting-power-modes").html(html);
  html = '';
  var len = client.device_info != undefined && client.device_info.revision != undefined && client.device_info.revision.substr(0x0, 0x2) == 'G-' ? get_power_modes2(client) : get_power_modes(client);
  var index2 = client.device_info.powerMode;
  html += len[index2];
  var value10 = get_power_mode_tips(client);
  html += ": " + value10[index2];
  layui2('#selected-power-mode-tips').html(html);
  html = "<div class=\"layui-row\">";
  var len2 = get_lods_list(client);
  for (var index = 0x0; index < len2.length; index++) {
    html += "<div class=\"layui-col-xs4\">";
    if (index + 0x1 == client.device_info.lod) {
      html += "<input type=\"radio\" name=\"setting_lods\" value=\"" + (index + 0x1) + "\" title=\"" + len2[index] + "\" lay-filter=\"setting-lods\" checked>";
    } else {
      html += "<input type=\"radio\" name=\"setting_lods\" value=\"" + (index + 0x1) + "\" title=\"" + len2[index] + "\" lay-filter=\"setting-lods\">";
    }
    html += "</div>";
  }
  html += "</div>";
  layui2('#setting-lods').html(html);
  layui2("#setting-lod-section").css("display", len2.length > 0x1 ? '' : "none");
  var value11 = Math.round(client.device_info.squal * 0x64 / 0xff);
  layui2("#surface-quality").text(layui.i18np.prop("STRID_SETTING_SURFACE_QUALITY") + " " + value11 + '%');
  layui2('#surface-quality').css("display", value11 > 0x0 ? '' : 'none');
  var value12 = client.device_info.equal;
  if (value12 == 0xff) {
    layui2("#wireless-quality").text('');
  } else {
    value12 = 0x3e8 - value12;
    var value13 = layui.i18np.prop("STRID_SETTING_WIRELESS_QUALITY") + " " + value12 / 0xa + '%';
    if ((client.device_info.txOutputPower == 0x0 ? 0x0 : 0x1) && !(client.device_info != undefined && client.device_info.revision != undefined && client.device_info.revision.substr(0x0, 0x2) == 'G-') && client.device_info.txOutputPowerApplied < 0x8) {
      value13 += '(' + client.device_info.txOutputPowerApplied + ')';
    }
    layui2('#wireless-quality').text(value13);
  }
  layui2("[name=\"setting-angle-snapping\"]").prop("checked", !!(client.device_info.angleSnapping == 0x1));
  layui2("[name=\"setting-angle-snapping\"]").prop('disabled', !!(client.device_info != undefined && client.device_info.revision != undefined && client.device_info.revision.substr(0x0, 0x2) == 'G-'));
  layui2("[name=\"setting-ripple-control\"]").prop("checked", !!(client.device_info.rippleControl == 0x1));
  layui2("[name=\"setting-ripple-control\"]").prop("disabled", !!(client.device_info != undefined && client.device_info.revision != undefined && client.device_info.revision.substr(0x0, 0x2) == 'G-'));
  layui2("[name=\"setting-motion-sync\"]").prop('checked', !!(client.device_info.motionSync == 0x1));
  layui2("[name=\"setting-wireless-turbo\"]").prop('checked', !!((client.device_info.txOutputPower == 0x0 ? 0x0 : 0x1) == 0x1));
  layui2("[name=\"setting-rf-channel\"]").prop('disabled', !((client.device_info.txOutputPower == 0x0 ? 0x0 : 0x1) == 0x1));
  if (client.device_info.hopChannelSupported && client.device_info.hopChannel) {
    layui2("[name=\"setting-rf-channel\"]")[0x3].checked = true;
  } else {
    if (client.device_info.rfChannel == 0x2) {
      layui2("[name=\"setting-rf-channel\"]")[0x0].checked = true;
    } else {
      if (client.device_info.rfChannel == 0x28) {
        layui2("[name=\"setting-rf-channel\"]")[0x1].checked = true;
      } else if (client.device_info.rfChannel == 0x50) {
        layui2("[name=\"setting-rf-channel\"]")[0x2].checked = true;
      }
    }
  }
  layui2("[name=\"power-saving\"]").prop("checked", client.device_info.autoTxPower);
  if (!(client.device_info != undefined && client.device_info.revision != undefined && client.device_info.revision.substr(0x0, 0x2) == 'G-') && client.device_info.pollingRate <= 0x7d0 && (client.device_info.txOutputPower == 0x0 ? 0x0 : 0x1) == 0x1) {
    layui2("#setting-power-saving").css('display', '');
    if (client.device_info.hopChannelSupported) {
      layui2("#setting-rf-channels [class*=layui-col-xs]").each(function () {
        layui2(this)[0x0].className = "layui-col-xs3";
      });
    } else {
      layui2("#setting-rf-channels [class*=layui-col-xs]").each(function () {
        layui2(this)[0x0].className = "layui-col-xs4";
      });
    }
  } else {
    layui2('#setting-power-saving').css("display", "none");
    if (client.device_info.hopChannelSupported) {
      layui2("#setting-rf-channels [class*=layui-col-xs]").each(function () {
        layui2(this)[0x0].className = 'layui-col-xs3';
      });
    } else {
      layui2("#setting-rf-channels [class*=layui-col-xs]").each(function () {
        layui2(this)[0x0].className = 'layui-col-xs4';
      });
    }
  }
  layui2("[name=\"glass-mode\"]").prop("checked", client.device_info.glassModeEnabled != undefined ? client.device_info.glassModeEnabled == 0x1 : false);
  layui2("#setting-glass-mode").css("display", is_glass_mode_supported(client) ? '' : 'none');
  layui2("#btn-wireless-optimize").css("display", client.device_info.hopChannelSupported ? 'none' : '');
  layui2("#setting-wireless-turbo-desc").css("display", client.device_info.hopChannelSupported ? "none" : '');
  layui2("#setting-wireless-turbo-desc2").css("display", !client.device_info.hopChannelSupported ? 'none' : '');
  layui2("#setting-rf-channel-auto").css('display', !client.device_info.hopChannelSupported ? "none" : '');
  html = '';
  if (client.device_info.hopChannelSupported && client.device_info.hopChannel) {
    html += layui.i18np.prop('STRID_SETTING_RF_CHANNEL_AUTO');
    html += ": " + layui.i18np.prop("STRID_SETTING_RF_CHANNEL_AUTO_TIPS");
  } else {
    if (client.device_info.rfChannel == 0x2) {
      html += layui.i18np.prop('STRID_SETTING_RF_CHANNEL_2');
      html += ": " + layui.i18np.prop("STRID_SETTING_RF_CHANNEL_2_TIPS");
    } else {
      if (client.device_info.rfChannel == 0x28) {
        html += layui.i18np.prop("STRID_SETTING_RF_CHANNEL_40");
        html += ": " + layui.i18np.prop("STRID_SETTING_RF_CHANNEL_40_TIPS");
      } else if (client.device_info.rfChannel == 0x50) {
        html += layui.i18np.prop('STRID_SETTING_RF_CHANNEL_80');
        html += ": " + layui.i18np.prop('STRID_SETTING_RF_CHANNEL_80_TIPS');
      }
    }
  }
  layui2('#selected-rf-channel-tips').html(html);
  var value14 = client.device_info.sleepTime;
  if (value14 > 0x3c) {
    value14 = 0x3b + value14 / 0x3c;
  }
  var value13 = layui4.render({
    'elem': "#slider-sleep-time",
    'min': 0xa,
    'max': 0x59,
    'step': 0x1,
    'value': value14,
    'input': false,
    'theme': theme_color,
    'tipsAlways': true,
    'setTips': function (value) {
      return value < 0x3c ? value + " " + layui.i18np.prop("STRID_SETTING_UNIT_SECOND") : (value = value - 0x3b, value + " " + layui.i18np.prop("STRID_SETTING_UNIT_MINUTE"));
    },
    'done': function (result) {
      if (result != undefined) {
        if (result > 0x3c) {
          result = (result - 0x3b) * 0x3c;
        }
        if (result >= SLEEP_MAX_SEC) {
          result = SLEEP_MAX_SEC;
        }
        send_event_set_sleep_time(client, result);
      }
    }
  });
  value13.setValue(value14);
  var value15 = client.device_info.angleTuning;
  if (is_angle_tuning_supported(client)) {
    layui2('#setting-angle-tuning-section').css("display", '');
    value13 = layui4.render({
      'elem': "#slider-angle-tuning",
      'min': -0x1e,
      'max': 0x1e,
      'step': 0x1,
      'value': value15,
      'input': true,
      'tips': false,
      'theme': theme_color,
      'done': function (result) {
        if (result != undefined) {
          set_angle_tuning(client, result);
        }
      }
    });
    value13.setValue(value15);
  } else {
    layui2("#setting-angle-tuning-section").css('display', "none");
  }
  var len3 = client.device_info.keyDelay;
  if (len3.length > 0x0) {
    layui2("#setting-key-delay-section").css("display", '');
    var index3 = layui2("[name=\"key-delay-select-key\"]").val();
    var index4 = 0x0;
    if (index3 > 0x0) {
      var value16 = get_key_name_from_label(mouse_key_labels[index3]);
      var value17 = get_key_id_from_name(value16);
      index4 = value17 - 0xa;
      index4 %= len3.length;
    }
    var value18 = len3[index4] & 0xf;
    value13 = layui4.render({
      'elem': "#slider-key-down-delay",
      'min': client.device_info != undefined && client.device_info.revision != undefined && client.device_info.revision.substr(0x0, 0x2) == 'G-' ? 0x0 : 0x1,
      'max': 0xa,
      'step': 0x1,
      'value': value18,
      'input': true,
      'tips': false,
      'theme': theme_color,
      'done': function (result) {
        if (result != undefined) {
          var len4 = client.device_info.keyDelay;
          var index5 = layui2("[name=\"key-delay-select-key\"]").val();
          if (index5 == 0x0) {
            var flag = false;
            for (var count = 0x0; count < len4.length; count++) {
              flag |= set_key_delay(client, count, result & 0xf | len4[count] & 0xf0);
            }
            if (flag) {
              send_event_mouse_param(client);
            }
          } else {
            var value19 = get_key_name_from_label(mouse_key_labels[index5]);
            var value20 = get_key_id_from_name(value19);
            var index6 = value20 - 0xa;
            index6 %= len4.length;
            if (set_key_delay(client, index6, result & 0xf | len4[index6] & 0xf0)) {
              send_event_mouse_param(client);
            }
          }
          refresh_key_delay_list(client);
        }
      }
    });
    if (client.device_info != undefined && client.device_info.revision != undefined && client.device_info.revision.substr(0x0, 0x2) == 'G-') {
      var value21 = len3[index4] >> 0x4 & 0xf;
      value13 = layui4.render({
        'elem': "#slider-key-up-delay",
        'min': 0x0,
        'max': 0xa,
        'step': 0x1,
        'value': value21,
        'input': true,
        'tips': false,
        'theme': theme_color,
        'done': function (result) {
          if (result != undefined) {
            var len5 = client.device_info.keyDelay;
            var index7 = layui2("[name=\"key-delay-select-key\"]").val();
            if (index7 == 0x0) {
              var flag2 = false;
              for (var len6 = 0x0; len6 < len5.length; len6++) {
                flag2 |= set_key_delay(client, len6, result << 0x4 & 0xf0 | len5[len6] & 0xf);
              }
              if (flag2) {
                send_event_mouse_param(client);
              }
            } else {
              var value22 = get_key_name_from_label(mouse_key_labels[index7]);
              var value23 = get_key_id_from_name(value22);
              var index8 = value23 - 0xa;
              index8 %= len5.length;
              if (set_key_delay(client, index8, result << 0x4 & 0xf0 | len5[index8] & 0xf)) {
                send_event_mouse_param(client);
              }
            }
            refresh_key_delay_list(client);
          }
        }
      });
    }
    refresh_key_delay_list(client);
  } else {
    layui2("#setting-key-delay-section").css('display', '');
  }
  layui3.render('radio');
  layui3.render('checkbox');
  onboard_status = client.device_info.onboardStatus;
  ui_refresh_setting_mapping(client);
  setTimeout(function () {
    let el = document.getElementById("setting-key-delay-section");
    let el2 = document.getElementById('setting-lod-section');
    el2.style.height = el.offsetTop + el.offsetHeight - el2.offsetTop - 0x14 + 'px';
  }, 0x1);
}
function refresh_key_delay_list(client) {
  var layui2 = layui.$;
  var layui3 = layui.form;
  var len = client.device_info.keyDelay;
  var value = layui2("[name=\"key-delay-select-key\"] option");
  for (let index = 0x1; index < mouse_key_labels.length; index++) {
    var value2 = get_key_name_from_label(mouse_key_labels[index]);
    var value3 = get_key_id_from_name(value2);
    var index2 = value3 - 0xa;
    index2 %= len.length;
    var value4 = mouse_key_labels[index];
    if (mouse_key_labels[index] == 'â‘ ') {
      value4 = layui.i18np.prop("STRID_KEY_LEFT_S");
    } else {
      if (mouse_key_labels[index] == 'â‘¡') {
        value4 = layui.i18np.prop("STRID_KEY_MIDDLE_S");
      } else if (mouse_key_labels[index] == 'â‘¢') {
        value4 = layui.i18np.prop("STRID_KEY_RIGHT_S");
      }
    }
    if (client.device_info != undefined && client.device_info.revision != undefined && client.device_info.revision.substr(0x0, 0x2) == 'G-') {
      value[index].textContent = value4 + " - " + (len[index2] & 0xf) + '/' + (len[index2] >> 0x4 & 0xf) + " ms";
    } else {
      value[index].textContent = value4 + " - " + (len[index2] & 0xf) + " ms";
    }
    value[index].disabled = mouse_keys[index - 0x1].visible != undefined && !mouse_keys[index - 0x1].visible;
  }
  layui3.render('select');
}
function ui_refresh_cpi_levels(client) {
  var value = client.device_info.resolution;
  var value2 = value & 0xffff;
  var value3 = value >> 0x10 & 0xffff;
  var len = client.device_info.cpiLevels;
  var value4 = client.device_info.cpiLevelColors;
  var darkTheme = is_dark_theme() ? '' : "_gray";
  var html = "<div class=\"layui-row\" style=\"margin-top: 10px;\">";
  for (let index = 0x0; index < len.length; index++) {
    var value5 = len[index];
    var value6 = value5 & 0xffff;
    var value7 = value5 >> 0x10 & 0xffff;
    if (value7 == 0x0) {
      value7 = value6;
    }
    var value8 = value4[index];
    if (value5 <= 0x0) {
      html += "<div class=\"layui-col-xs3\" style=\"padding-top: 3px;padding-bottom: 3px;width: fit-content;display: none;\">";
    } else {
      html += "<div class=\"layui-col-xs3\" style=\"padding-top: 3px;padding-bottom: 3px;width: fit-content;\">";
    }
    html += "<a cpi-level-index=\"" + index + "\" cpi-level-action=\"select\" style=\"cursor: pointer;\">";
    if (value3 == 0x0) {
      html += "<div style=\"width: 80px;height: 30px;margin-right: 6px;\">";
    } else {
      html += "<div style=\"width: 80px;height: 54px;margin-right: 6px;\">";
    }
    html += "<div style=\"position: absolute;\">";
    if (value3 == 0x0) {
      if (cpi_level_editing || value2 == value6) {
        html += "<img src=\"" + RESOURCE_URL + "setting/dpi_selected" + darkTheme + ".png\" style=\"position: absolute;\"/>";
      } else {
        html += "<img src=\"" + RESOURCE_URL + "setting/dpi_normal.png\" style=\"position: absolute;\"/>";
      }
    } else if (cpi_level_editing || value == value5) {
      html += "<img src=\"" + RESOURCE_URL + "setting/dpi_selected_h" + darkTheme + ".png\" style=\"position: absolute;\"/>";
    } else {
      html += "<img src=\"" + RESOURCE_URL + "setting/dpi_normal_h.png\" style=\"position: absolute;\"/>";
    }
    html += '</div>';
    html += "<div style=\"position: absolute;\">";
    var offset = 0x0;
    if (value3 > 0x0) {
      offset = 0xc;
    }
    if ((value8 & 0x7) == 7) {
      html += "<img src=\"" + RESOURCE_URL + 'setting/dpi_color_' + "white" + ".png\" style=\"position: absolute; margin-top:" + offset + "px;\"/>";
    } else {
      if ((value8 & 0x7) == 4) {
        html += "<img src=\"" + RESOURCE_URL + 'setting/dpi_color_' + "red" + ".png\" style=\"position: absolute; margin-top:" + offset + "px;\"/>";
      } else {
        if ((value8 & 0x7) == 2) {
          html += "<img src=\"" + RESOURCE_URL + "setting/dpi_color_" + "green" + ".png\" style=\"position: absolute; margin-top:" + offset + "px;\"/>";
        } else {
          if ((value8 & 0x7) == 1) {
            html += "<img src=\"" + RESOURCE_URL + 'setting/dpi_color_' + "blue" + ".png\" style=\"position: absolute; margin-top:" + offset + "px;\"/>";
          } else {
            if ((value8 & 0x7) == 6) {
              html += "<img src=\"" + RESOURCE_URL + "setting/dpi_color_" + 'yellow' + ".png\" style=\"position: absolute; margin-top:" + offset + "px;\"/>";
            } else {
              if ((value8 & 0x7) == 5) {
                html += "<img src=\"" + RESOURCE_URL + "setting/dpi_color_" + "purple" + ".png\" style=\"position: absolute; margin-top:" + offset + "px;\"/>";
              } else {
                if ((value8 & 0x7) == 3) {
                  html += "<img src=\"" + RESOURCE_URL + 'setting/dpi_color_' + "skyblue" + ".png\" style=\"position: absolute; margin-top:" + offset + "px;\"/>";
                } else {}
              }
            }
          }
        }
      }
    }
    html += "</div>";
    html += "<div style=\"position: absolute;width: 80px;\">";
    if (value3 == 0x0) {
      if (cpi_level_editing || value == value5) {
        html += "<p style=\"color:white;text-align: center;margin-top: 7px;\" >" + value6 + '</p>';
      } else {
        html += "<p style=\"text-align: center;margin-top: 7px;\" >" + value6 + "</p>";
      }
    } else if (cpi_level_editing || value == value5) {
      html += "<p style=\"color:white;text-align: center;margin-top: 10px;\" >X:" + value6 + "</p>";
      html += "<p style=\"color:white;text-align: center;margin-top: 2px;\" >" + 'Y:' + value7 + "</p>";
    } else {
      html += "<p style=\"text-align: center;margin-top: 10px;\" >" + 'X:' + value6 + '</p>';
      html += "<p style=\"text-align: center;margin-top: 2px;\" >" + 'Y:' + value7 + "</p>";
    }
    html += "</div>";
    html += "</div>";
    html += "</a>";
    html += "</div>";
    if (index == 0x3) {
      html += "</div><div class=\"layui-row\">";
    }
  }
  ;
  html += "</div>";
  $("#setting-dpi-levels").html(html);
}
function ui_refresh_dpi_input_panel(client, levelIndex, cpiLabel, isXYLight, showXY) {
  cpi_level_light = isXYLight;
  if (showXY) {
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
  var cpiRange = get_cpi_range(client);
  var value = get_cpi_step(client);
  var el = document.getElementById("dpi-level-input");
  el.setAttribute("step", value);
  el.setAttribute("min", cpiRange[0x0]);
  el.setAttribute("max", cpiRange[0x1]);
  el = document.getElementById("x-dpi-level-input");
  el.setAttribute('step', value);
  el.setAttribute('min', cpiRange[0x0]);
  el.setAttribute("max", cpiRange[0x1]);
  el = document.getElementById("y-dpi-level-input");
  el.setAttribute("step", value);
  el.setAttribute('min', cpiRange[0x0]);
  el.setAttribute('max', cpiRange[0x1]);
  $('#dpi-level-input').val(levelIndex);
  $("#x-dpi-level-input").val(levelIndex);
  $("#y-dpi-level-input").val(cpiLabel);
  var arr = get_light_display_colors(client);
  var offset = 0x0;
  var darkTheme = is_dark_theme() ? "lay-skin-color-picker" : "lay-skin-color-picker-light";
  html = '<table><tr>';
  arr.forEach(item => {
    html += "<td style=\"padding-top: 5px;\">";
    html += "<a color-code=\"" + item + "\" dpi-level-color-action=\"select\" style=\"padding-left: 8px; padding-right: 8px;padding-top: 8px;cursor: pointer;\">";
    if (item == "white") {
      if ((isXYLight & 0x7) == 7) {
        html += "<input type=\"radio\" name=\"dpi-level-color\" value=\"white\" lay-skin=\"none\" checked>";
        offset = 0x1;
      } else {
        html += "<input type=\"radio\" name=\"dpi-level-color\" value=\"white\" lay-skin=\"none\">";
      }
      html += "<div lay-radio class=\"" + darkTheme + "\" style=\"color: #FFF; background-color: #FFF\"></div>";
    } else {
      if (item == 'red') {
        if ((isXYLight & 0x7) == 4) {
          html += "<input type=\"radio\" name=\"dpi-level-color\" value=\"red\" lay-skin=\"none\" checked>";
          offset = 0x1;
        } else {
          html += "<input type=\"radio\" name=\"dpi-level-color\" value=\"red\" lay-skin=\"none\">";
        }
        html += "<div lay-radio class=\"" + darkTheme + "\" style=\"color: #F00; background-color: #F00\"></div>";
      } else {
        if (item == "green") {
          if ((isXYLight & 0x7) == 2) {
            html += "<input type=\"radio\" name=\"dpi-level-color\" value=\"green\" lay-skin=\"none\" checked>";
            offset = 0x1;
          } else {
            html += "<input type=\"radio\" name=\"dpi-level-color\" value=\"green\" lay-skin=\"none\">";
          }
          html += "<div lay-radio class=\"" + darkTheme + "\" style=\"color: #0F0; background-color: #0F0\"></div>";
        } else {
          if (item == "blue") {
            if ((isXYLight & 0x7) == 1) {
              html += "<input type=\"radio\" name=\"dpi-level-color\" value=\"blue\" lay-skin=\"none\" checked>";
              offset = 0x1;
            } else {
              html += "<input type=\"radio\" name=\"dpi-level-color\" value=\"blue\" lay-skin=\"none\">";
            }
            html += "<div lay-radio class=\"" + darkTheme + "\" style=\"color: #00F; background-color: #00F\"></div>";
          } else {
            if (item == "yellow") {
              if ((isXYLight & 0x7) == 6) {
                html += "<input type=\"radio\" name=\"dpi-level-color\" value=\"yellow\" lay-skin=\"none\" checked>";
                offset = 0x1;
              } else {
                html += "<input type=\"radio\" name=\"dpi-level-color\" value=\"yellow\" lay-skin=\"none\">";
              }
              html += "<div lay-radio class=\"" + darkTheme + "\" style=\"color: #FF0; background-color: #FF0\"></div>";
            } else {
              if (item == "purple") {
                if ((isXYLight & 0x7) == 5) {
                  html += "<input type=\"radio\" name=\"dpi-level-color\" value=\"purple\" lay-skin=\"none\" checked>";
                  offset = 0x1;
                } else {
                  html += "<input type=\"radio\" name=\"dpi-level-color\" value=\"purple\" lay-skin=\"none\">";
                }
                html += "<div lay-radio class=\"" + darkTheme + "\" style=\"color: #F0F; background-color: #F0F\"></div>";
              } else if (item == 'skyblue') {
                if ((isXYLight & 0x7) == 3) {
                  html += "<input type=\"radio\" name=\"dpi-level-color\" value=\"skyblue\" lay-skin=\"none\" checked>";
                  offset = 0x1;
                } else {
                  html += "<input type=\"radio\" name=\"dpi-level-color\" value=\"skyblue\" lay-skin=\"none\">";
                }
                html += "<div lay-radio class=\"" + darkTheme + "\" style=\"color: #0FF; background-color: #0FF\"></div>";
              } else {
                if (offset == 0x0) {
                  html += "<input type=\"radio\" name=\"dpi-level-color\" value=\"dark\" lay-skin=\"none\" checked>";
                } else {
                  html += "<input type=\"radio\" name=\"dpi-level-color\" value=\"dark\" lay-skin=\"none\">";
                }
                html += "<div lay-radio class=\"" + darkTheme + "\" style=\"color: #505050; background-color: #505050\"></div>";
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
