async function refresh_client_list() {
  var _0x3b58e9 = [];
  var _0x1d2794 = {};
  await navigator.hid.getDevices().then(_0x2d58ae => {
    _0x2d58ae.forEach(_0x28d538 => {
      if (is_supported(_0x28d538.productId)) {
        if (_0x1d2794[_0x28d538.productId] == undefined) {
          _0x1d2794[_0x28d538.productId] = [];
        }
        _0x1d2794[_0x28d538.productId][_0x1d2794[_0x28d538.productId].length] = _0x28d538;
      }
    });
  });
  for (var _0x1ed9db in _0x1d2794) {
    _0x1d2794[_0x1ed9db].forEach((_0x37b6e2, _0x1ace7f, _0x577b44) => {
      if (_0x37b6e2.collections[0x0].inputReports.length > 0x0 && _0x37b6e2.collections[0x0].outputReports.length > 0x0) {
        _0x3b58e9[_0x3b58e9.length] = _0x37b6e2;
      }
    });
  }
  var _0xd92187 = [];
  usb_client_list.forEach(_0x5b3d89 => {
    var _0x3d3bca = false;
    _0x3b58e9.forEach(_0x802c8c => {
      if (_0x802c8c == _0x5b3d89.device) {
        _0x3d3bca = true;
      }
    });
    if (_0x3d3bca) {
      _0xd92187[_0xd92187.length] = _0x5b3d89;
    }
  });
  _0x3b58e9.forEach(_0x1f4372 => {
    var _0x508c9b = false;
    _0xd92187.forEach(_0x4b7361 => {
      if (_0x1f4372 == _0x4b7361.device) {
        _0x508c9b = true;
      }
    });
    if (!_0x508c9b) {
      _0x1f4372.oninputreport = device_receive_data;
      var _0x39cc7e = create_usb_client(_0x1f4372, 0xff, false);
      _0xd92187[_0xd92187.length] = _0x39cc7e;
      send_event_query(_0x39cc7e);
    }
  });
  usb_client_list = _0xd92187;
  window.postMessage({
    'action': ACTION_REFRESH_CURRENT_CLIENT
  });
}
function update_setting_x_polling() {
  var _0x3a5204 = localStorage.getItem('setting-x-polling');
  if (_0x3a5204 == undefined || _0x3a5204 == 0x0) {
    var _0x509952 = current_usb_client.device_info.pollingRate;
    if (_0x509952 != 0x7d && _0x509952 != 0xfa && _0x509952 != 0x1f4 && _0x509952 != 0x3e8 && _0x509952 != 0x7d0 && _0x509952 != 0xfa0 && _0x509952 != 0x1f40) {
      localStorage.setItem("setting-x-polling", 0x1);
    }
  }
}
function refresh_current_client() {
  var _0x174a21 = false;
  usb_client_list.forEach(_0x265c3e => {
    if (current_usb_client != undefined && _0x265c3e.id == current_usb_client.id && _0x265c3e.helloed && !is_receiver(_0x265c3e)) {
      _0x174a21 = true;
    }
  });
  if (!_0x174a21) {
    editing = false;
    close_all_layer();
    current_usb_client = undefined;
    usb_client_list.forEach(_0x1b3c61 => {
      if (current_usb_client == undefined && _0x1b3c61.helloed && !is_receiver(_0x1b3c61)) {
        current_usb_client = _0x1b3c61;
        update_setting_x_polling();
        if (current_usb_client.device_info != undefined && current_usb_client.device_info.revision != undefined && current_usb_client.device_info.revision.substr(0x0, 0x2) == 'G-') {
          $("[name=\"setting-fw-channel\"]")[0x1].checked = true;
        } else {
          $("[name=\"setting-fw-channel\"]")[0x0].checked = true;
        }
        $("[name=\"setting-fw-channel\"]")[0x0].disabled = !current_usb_client.device_info.dynamicGOM;
        $("[name=\"setting-fw-channel\"]")[0x1].disabled = !current_usb_client.device_info.dynamicGOM;
        layui.form.render('radio');
      }
    });
  }
  window.postMessage({
    'action': ACTION_UI_REFRESH_CLIENT_LIST
  });
  window.postMessage({
    'action': ACTION_UI_REFRESH_CURRENT_CLIENT
  });
}
function ui_refresh_current_client_rssi() {
  var _0x2c9d1a = layui.$;
  if (current_usb_client != undefined) {
    var _0x207040 = document.getElementById("current-usb-client-rssi-icon");
    if (current_usb_client.virtual) {
      usb_client_list.forEach(_0xabb1a5 => {
        if (!_0xabb1a5.virtual && _0xabb1a5.device == current_usb_client.device) {
          if (is_hub(_0xabb1a5) && _0xabb1a5.device_info.wired) {
            _0x2c9d1a("#current-usb-client-rssi-icon").css("display", '');
            _0x207040.src = RESOURCE_URL + "product/usb.png";
            _0x2c9d1a("#current-usb-client-rssi-icon").css("left", "285px");
            _0x2c9d1a("#current-usb-client-rssi-icon").css('top', "40px");
          } else {
            var _0x974ec5 = -Math.abs(_0xabb1a5.device_info.rssi);
            if (is_limit_memory(_0xabb1a5)) {
              _0x2c9d1a("#current-usb-client-rssi-icon").css("display", '');
              _0x207040.src = RESOURCE_URL + "product/wifi.png";
              _0x2c9d1a('#current-usb-client-rssi-icon').css('left', "285px");
              _0x2c9d1a("#current-usb-client-rssi-icon").css("top", "39px");
            } else {
              if (_0x974ec5 == 0x0) {
                _0x2c9d1a("#current-usb-client-rssi-icon").css("display", 'none');
              } else {
                if (_0x974ec5 >= -0x28) {
                  _0x2c9d1a("#current-usb-client-rssi-icon").css("display", '');
                  _0x207040.src = RESOURCE_URL + "product/rssi_higher.png";
                } else {
                  if (_0x974ec5 >= -0x3c) {
                    _0x2c9d1a("#current-usb-client-rssi-icon").css('display', '');
                    _0x207040.src = RESOURCE_URL + 'product/rssi_high.png';
                  } else if (_0x974ec5 >= -0x50) {
                    _0x2c9d1a("#current-usb-client-rssi-icon").css("display", '');
                    _0x207040.src = RESOURCE_URL + 'product/rssi_mid.png';
                  } else {
                    _0x2c9d1a("#current-usb-client-rssi-icon").css("display", '');
                    _0x207040.src = RESOURCE_URL + "product/rssi_low.png";
                  }
                }
              }
              _0x2c9d1a("#current-usb-client-rssi-icon").css('left', "295px");
              _0x2c9d1a("#current-usb-client-rssi-icon").css("top", "40px");
            }
          }
        }
      });
    } else {
      _0x2c9d1a("#current-usb-client-rssi-icon").css("display", '');
      _0x207040.src = RESOURCE_URL + "product/usb.png";
      _0x2c9d1a("#current-usb-client-rssi-icon").css("left", "285px");
    }
    _0x207040.className = is_dark_theme() ? "layui-img-tint" : "layui-img-tint-light";
    if (current_usb_client != undefined ? is_hs_keyboard(current_usb_client.device) : false) {
      _0x2c9d1a("#current-usb-client-rssi-icon").css("display", "none");
    }
  }
}
function kbd_dks_init() {
  for (let _0x266ccf = 0x1; _0x266ccf < 0x5; _0x266ccf++) {
    for (let _0xa72ede = 0x1; _0xa72ede < 0x5; _0xa72ede++) {
      var _0xdecc34 = 'kbd-dks-arrow' + _0x266ccf + '-' + _0xa72ede;
      document.getElementById(_0xdecc34).addEventListener("mousedown", function () {
        var _0x54e105 = this.getAttribute("keyId");
        kbd_dks_dragging_name = _0x54e105;
      });
      document.getElementById(_0xdecc34).addEventListener("mouseup", function () {
        kbd_dks_dragging_up = true;
      });
    }
  }
}
function kbd_ui_refresh_current_client() {
  var _0x54f319 = layui.$;
  var _0x3c018d = layui.i18np;
  if (current_usb_client != undefined) {
    if (connect_panel_id >= 0x0) {
      var _0xdc9da9 = layui.layer;
      _0xdc9da9.close(connect_panel_id);
      connect_panel_id = -0x1;
    }
    if (editing) {
      _0x54f319("#kbd-current-usb-client-panel").css('display', "none");
    } else {
      _0x54f319("#kbd-current-usb-client-panel").css("display", '');
    }
    _0x54f319("#receiver-panel").css("display", "none");
    _0x54f319("#kbd-current-usb-client-panel").css("background-image", is_dark_theme() ? "url(" + RESOURCE_URL + "product/kbd_bg-hover.png)" : "url(" + RESOURCE_URL + '/product/kbd_bg-gray.png)');
    document.getElementById("kbd-current-usb-client-image").src = RESOURCE_URL + "product/" + get_product_id_hex_str(current_usb_client) + "/connected.png";
    _0x54f319('#kbd-current-usb-client-name').html(get_display_name(current_usb_client));
    _0x54f319('#kbd-current-usb-client-firmware').html(_0x3c018d.prop('STRID_HOME_PRODUCT_FIRMWARE') + "&nbsp;" + current_usb_client.device_info.revision);
    if (is_new_firmware_existed(current_usb_client)) {
      _0x54f319("#kbd-current-usb-client-firmware-new").css("display", '');
    } else {
      _0x54f319("#kbd-current-usb-client-firmware-new").css('display', "none");
    }
  } else {
    _0x54f319('#kbd-current-usb-client-panel').css("background-image", "url()");
    document.getElementById("kbd-current-usb-client-image").src = '';
    _0x54f319("#current-usb-client-name").html('');
    _0x54f319("#current-usb-client-name-model").html('');
    _0x54f319("#current-usb-client-firmware").html('');
    var _0x307142 = 0x0;
    usb_client_list.forEach(_0x117182 => {
      if (_0x117182.helloed) {
        _0x307142++;
      }
    });
    if (_0x307142 == 0x0) {
      _0x54f319('#kbd-current-usb-client-panel').css("display", "none");
      if (connect_panel_id >= 0x0) {
        var _0xdc9da9 = layui.layer;
        _0xdc9da9.close(connect_panel_id);
        connect_panel_id = -0x1;
      }
    } else {
      _0x54f319("#kbd-current-usb-client-panel").css("display", '');
      _0x54f319("#receiver-panel").css("display", '');
      if (connect_panel_id < 0x0) {
        var _0xdc9da9 = layui.layer;
        connect_panel_id = _0xdc9da9.open({
          'type': 0x1,
          'title': false,
          'skin': "layui-layer-panel",
          'shade': false,
          'closeBtn': 0x0,
          'anim': -0x1,
          'shadeClose': false,
          'resize': false,
          'scrollbar': false,
          'zIndex': 0x64,
          'content': _0x54f319("#connect-panel")
        });
      }
    }
    _0x54f319('#kbd-current-usb-client-models').html('');
    _0x54f319("#kbd-current-usb-client-firmware-new").css("display", "none");
  }
  _0x54f319("#kbd-current-usb-client-panel").css("margin-top", (window.innerHeight - 0x6e - 0x1e2 - 0x64) / 0x2);
  if (editing) {
    ui_refresh_setting(current_usb_client);
    var _0xe0a869 = get_product_id_hex_str(current_usb_client);
    document.getElementById('kbd-product-name').src = RESOURCE_URL + "product/" + _0xe0a869 + "/name.png";
    _0x54f319('#kbd-setting-panel').css('display', '');
    _0x54f319("#kbd-setting-onboard-config").css("display", '');
    _0x54f319("#usb-client-channel").css("display", "none");
    kbd_key_num = pc_kbd_key_num(current_usb_client);
    kbd_keys = pc_kbd_manager_keys(current_usb_client);
    kbd_dks_init();
    kbd_ui_refresh_onboard_config(current_usb_client);
    layui.element.tabChange("kbd-main-setting-type", 0x0);
  } else {
    _0x54f319('#setting-panel').css("display", "none");
    _0x54f319("#kbd-setting-panel").css('display', 'none');
    _0x54f319("#kbd-setting-onboard-config").css("display", "none");
  }
  if (current_usb_client != undefined) {
    if (loading_id >= 0x0) {
      var _0xdc9da9 = layui.layer;
      _0xdc9da9.close(loading_id);
      loading_id = -0x1;
    }
  }
}
function ui_refresh_current_client() {
  var _0x147026 = layui.$;
  var _0x5ab4fa = layui.i18np;
  if (current_usb_client != undefined ? is_hs_keyboard(current_usb_client.device) : false) {
    kbd_ui_refresh_current_client();
    _0x147026('#current-usb-client-panel').css("display", "none");
    _0x147026("#receiver-panel").css('display', "none");
    return;
  } else {
    _0x147026("#kbd-current-usb-client-panel").css("display", 'none');
  }
  if (current_usb_client != undefined) {
    if (connect_panel_id >= 0x0) {
      var _0x257fe8 = layui.layer;
      _0x257fe8.close(connect_panel_id);
      connect_panel_id = -0x1;
    }
    if (editing) {
      _0x147026('#current-usb-client-panel').css("display", "none");
      _0x147026("#receiver-panel").css("display", "none");
    } else {
      _0x147026("#current-usb-client-panel").css("display", '');
      _0x147026('#receiver-panel').css("display", '');
    }
    _0x147026("#current-usb-client-panel").css("background-image", is_dark_theme() ? 'url(' + RESOURCE_URL + "product/mouse_bg-hover.png?v=1)" : "url(" + RESOURCE_URL + '/product/mouse_bg-gray.png?v=1)');
    var _0x488cf5 = get_color_code(current_usb_client);
    if (_0x488cf5.length > 0x0) {
      document.getElementById("current-usb-client-image").src = RESOURCE_URL + "product/" + get_product_id_hex_str(current_usb_client) + '/' + _0x488cf5 + "/connected.png";
    } else {
      document.getElementById("current-usb-client-image").src = RESOURCE_URL + "product/" + get_product_id_hex_str(current_usb_client) + '/connected.png';
    }
    _0x147026("#current-usb-client-name").html(get_display_name(current_usb_client));
    _0x147026("#current-usb-client-name-model").html(get_display_name_model(current_usb_client));
    _0x147026("#current-usb-client-firmware").html(_0x5ab4fa.prop("STRID_HOME_PRODUCT_FIRMWARE") + "&nbsp;" + current_usb_client.device_info.revision);
    ui_refresh_current_client_rssi();
    var _0x1b0dc1 = document.getElementById("current-usb-client-battery-icon");
    if (current_usb_client != undefined ? is_hs_keyboard(current_usb_client.device) : false) {
      _0x147026("#current-usb-client-battery-icon").css('display', 'none');
    } else {
      _0x147026("#current-usb-client-battery-icon").css('display', '');
    }
    if (current_usb_client.device_info.charging) {
      if (current_usb_client.device_info.battery >= 0x28) {
        _0x1b0dc1.src = RESOURCE_URL + "product/charging.png";
      } else if (current_usb_client.device_info.battery >= 0x1e) {
        _0x1b0dc1.src = RESOURCE_URL + 'product/charging_yellow.png';
      } else {
        _0x1b0dc1.src = RESOURCE_URL + "product/charging_red.png";
      }
    } else {
      if (is_battery_percent_supported(current_usb_client)) {
        if (current_usb_client.device_info.battery >= 0x28) {
          _0x1b0dc1.src = RESOURCE_URL + "product/battery.png";
        } else if (current_usb_client.device_info.battery >= 0x1e) {
          _0x1b0dc1.src = RESOURCE_URL + "product/battery_yellow.png";
        } else {
          _0x1b0dc1.src = RESOURCE_URL + 'product/battery_red.png';
        }
      } else {
        if (current_usb_client.device_info.battery >= 0x28) {
          _0x1b0dc1.src = RESOURCE_URL + "product/battery2.png";
        } else if (current_usb_client.device_info.battery >= 0x1e) {
          _0x1b0dc1.src = RESOURCE_URL + 'product/battery_yellow2.png';
        } else {
          _0x1b0dc1.src = RESOURCE_URL + 'product/battery_red2.png';
        }
      }
    }
    if (current_usb_client.device_info.battery >= 0x28) {
      _0x1b0dc1.className = is_dark_theme() ? "layui-img-tint" : "layui-img-tint-light";
    } else {
      _0x1b0dc1.className = '';
    }
    _0x147026("#current-usb-client-battery").css("color", is_dark_theme() ? "#303030" : '#404040');
    if (is_battery_percent_supported(current_usb_client)) {
      if (current_usb_client.helloed) {
        _0x147026("#current-usb-client-battery").html(current_usb_client.device_info.battery);
      } else {
        _0x147026('#current-usb-client-battery').html("---");
      }
    } else {
      _0x147026("#current-usb-client-battery").html('');
    }
    if (current_usb_client.device_info.charging) {
      _0x147026("#current-usb-client-battery").css("display", 'none');
    } else {
      _0x147026("#current-usb-client-battery").css("display", '');
    }
    var _0x58bce3 = "<table><tr>";
    get_color_codes(current_usb_client).forEach(_0xa10b9b => {
      _0x58bce3 += "<td>";
      _0x58bce3 += "<a color-code=\"" + _0xa10b9b + "\" color-action=\"select\" style=\"cursor: pointer;\">";
      _0x58bce3 += "<img src=\"" + RESOURCE_URL + "product/" + get_product_id_hex_str(current_usb_client) + '/' + _0xa10b9b + "/preview.png\">";
      _0x58bce3 += '</a>';
      _0x58bce3 += "</td>";
    });
    _0x58bce3 += '</tr></table>';
    _0x147026("#current-usb-client-models").html(_0x58bce3);
    if (is_new_firmware_existed(current_usb_client)) {
      _0x147026("#current-usb-client-firmware-new").css('display', '');
    } else {
      _0x147026("#current-usb-client-firmware-new").css("display", 'none');
    }
  } else {
    _0x147026('#current-usb-client-panel').css('background-image', "url()");
    document.getElementById("current-usb-client-image").src = '';
    _0x147026("#current-usb-client-name").html('');
    _0x147026('#current-usb-client-name-model').html('');
    _0x147026("#current-usb-client-firmware").html('');
    document.getElementById("current-usb-client-rssi-icon").src = '';
    document.getElementById("current-usb-client-battery-icon").src = '';
    _0x147026("#current-usb-client-battery").css("display", "none");
    var _0x4b7831 = 0x0;
    usb_client_list.forEach(_0x347c53 => {
      if (_0x347c53.helloed) {
        _0x4b7831++;
      }
    });
    if (_0x4b7831 == 0x0) {
      _0x147026("#current-usb-client-panel").css("display", "none");
      _0x147026("#receiver-panel").css('display', 'none');
      if (connect_panel_id >= 0x0) {
        var _0x257fe8 = layui.layer;
        _0x257fe8.close(connect_panel_id);
        connect_panel_id = -0x1;
      }
    } else {
      _0x147026("#current-usb-client-panel").css("display", '');
      _0x147026('#receiver-panel').css("display", '');
      if (connect_panel_id < 0x0) {
        var _0x257fe8 = layui.layer;
        connect_panel_id = _0x257fe8.open({
          'type': 0x1,
          'title': false,
          'skin': "layui-layer-panel",
          'shade': false,
          'closeBtn': 0x0,
          'anim': -0x1,
          'shadeClose': false,
          'resize': false,
          'scrollbar': false,
          'zIndex': 0x64,
          'content': _0x147026("#connect-panel")
        });
      }
    }
    _0x147026("#current-usb-client-models").html('');
    _0x147026('#current-usb-client-firmware-new').css("display", "none");
  }
  _0x147026('#current-usb-client-panel').css("margin-top", (window.innerHeight - 0x6e - 0x1e2 - 0x64) / 0x2);
  _0x4b7831 = 0x0;
  var _0x58bce3 = '<table><tr>';
  usb_client_list.forEach(_0xb387c6 => {
    if (is_receiver(_0xb387c6) && _0xb387c6.helloed) {
      if (_0x4b7831 > 0x0) {
        _0x58bce3 += "<td style=\"width: 10px;\"><td>";
      }
      _0x58bce3 += "<td>";
      if (current_usb_client != undefined && current_usb_client.helloed) {
        var _0x392d3d = current_usb_client.product_esb_ch == 0xff ? current_usb_client.device_info.esbChannel : current_usb_client.product_esb_ch;
        if (get_esb_addr_arr(current_usb_client.device_info, _0x392d3d) == get_esb_addr(_0xb387c6.device_info, _0x392d3d)) {
          if (is_dark_theme()) {
            _0x58bce3 += "<img src=\"" + RESOURCE_URL + "product/receiver-selected.png\" height=\"17px\">";
          } else {
            _0x58bce3 += "<img src=\"" + RESOURCE_URL + "product/receiver-selected.png\" height=\"17px\" class=\"layui-img-tint-light\">";
          }
        } else {
          _0x58bce3 += "<img height=\"17px\">";
        }
      } else {
        _0x58bce3 += "<img height=\"17px\">";
      }
      _0x58bce3 += "<p style=\"font-size: 14px;\">" + get_display_name(_0xb387c6) + "</p>";
      _0x58bce3 += "<a usb-client-id=\"" + _0xb387c6.id + "\" receiver-action=\"select\" style=\"cursor: pointer;\">";
      var _0x3a694a;
      var _0x362636;
      if (is_hub(_0xb387c6)) {
        _0x3a694a = "product/receiver-dh-connected.png";
        _0x362636 = 'product/receiver-dh-paired.png';
      } else if (get_max_polling_rate(_0xb387c6, usb_client_list) > 0x3e8) {
        _0x3a694a = "product/receiver-hs-connected.png";
        _0x362636 = 'product/receiver-hs-paired.png';
      } else {
        _0x3a694a = 'product/receiver-connected.png';
        _0x362636 = "product/receiver-paired.png";
      }
      var _0x586be4;
      if (current_usb_client != undefined && is_soc_compatible(current_usb_client, _0xb387c6)) {
        _0x586be4 = '';
      } else {
        _0x586be4 = " style=\"opacity: 0.25\"";
      }
      if (current_usb_client != undefined && current_usb_client.helloed) {
        if (is_esb_addr_arr_existed(current_usb_client.device_info, _0x392d3d, get_esb_addr(_0xb387c6.device_info, _0x392d3d))) {
          _0x58bce3 += "<img src=\"" + RESOURCE_URL + _0x362636 + "\"" + _0x586be4 + " class=\"layui-receiver\">";
        } else if (is_dark_theme()) {
          _0x58bce3 += "<img src=\"" + RESOURCE_URL + _0x3a694a + "\"" + _0x586be4 + " class=\"layui-receiver\">";
        } else {
          _0x58bce3 += "<img src=\"" + RESOURCE_URL + _0x3a694a + "\"" + _0x586be4 + " class=\"layui-receiver layui-img-tint-light\">";
        }
      } else if (is_dark_theme()) {
        _0x58bce3 += "<img src=\"" + RESOURCE_URL + _0x3a694a + "\"" + _0x586be4 + " class=\"layui-receiver\">";
      } else {
        _0x58bce3 += "<img src=\"" + RESOURCE_URL + _0x3a694a + "\"" + _0x586be4 + " class=\"layui-receiver layui-img-tint-light\">";
      }
      _0x58bce3 += "</a>";
      _0x58bce3 += "<p style=\"font-size: 14px;\">" + _0x5ab4fa.prop("STRID_HOME_PRODUCT_FIRMWARE") + '&nbsp;' + _0xb387c6.device_info.revision + "</p>";
      if (is_new_firmware_existed(_0xb387c6)) {
        _0x58bce3 += "<p id=\"current-usb-client-firmware-new\" class=\"layui-firmware-new\" firmware-action=\"click\" data-i18n-title=\"STRID_HOME_NEW_VER_AVAIL\">æœ‰æ–°çš„ç‰ˆæœ¬å¯ç”¨</p>";
      }
      _0x58bce3 += "</td>";
      _0x4b7831++;
    }
  });
  _0x58bce3 += "</tr></table>";
  _0x147026('#receiver-panel').html(_0x58bce3);
  if (editing) {
    ui_refresh_setting(current_usb_client);
    _0x147026("#setting-panel").css("display", '');
  } else {
    _0x147026("#setting-panel").css("display", "none");
    _0x147026("#kbd-setting-panel").css("display", 'none');
    _0x147026("#kbd-setting-onboard-config").css("display", 'none');
  }
  if (current_usb_client != undefined) {
    if (loading_id >= 0x0) {
      var _0x257fe8 = layui.layer;
      _0x257fe8.close(loading_id);
      loading_id = -0x1;
    }
  }
}
function ui_refresh_client_list() {
  var _0x3aec36 = 0x0;
  var _0x29874f = layui.element;
  var _0x203e0a = layui.$;
  var _0x1153bb;
  if (is_dark_theme()) {
    _0x1153bb = "<div class=\"layui-nav\" lay-filter=\"client-list-filter-nav\" style=\"background-color: #37373A;padding-left: 0px;padding-right: 0px\">";
  } else {
    _0x1153bb = "<div class=\"layui-nav layui-bg-gray\" lay-filter=\"client-list-filter-nav\" style=\"padding-left: 0px;padding-right: 0px\">";
  }
  usb_client_list.forEach(_0x108a3c => {
    if (!is_receiver(_0x108a3c) && _0x108a3c.helloed) {
      if (current_usb_client != undefined && _0x108a3c.id == current_usb_client.id) {
        _0x1153bb += "<li class=\"layui-nav-item layui-this\" style=\"width: 140px\">";
      } else {
        _0x1153bb += "<li class=\"layui-nav-item\" style=\"width: 140px\">";
      }
      _0x1153bb += "<a usb-client-id=\"" + _0x108a3c.id + "\" list-action=\"select\">";
      _0x1153bb += "<div style=\"text-align: center\">";
      var _0x4269b1 = get_color_code(_0x108a3c);
      if (_0x4269b1.length > 0x0) {
        _0x1153bb += "<img src=\"" + RESOURCE_URL + "product/" + get_product_id_hex_str(_0x108a3c) + '/' + _0x4269b1 + "/connected.png\" height=\"60px\">";
      } else if (_0x108a3c != undefined ? is_hs_keyboard(_0x108a3c.device) : false) {
        _0x1153bb += "<div style=\"height:60px; align-items: center;justify-content: center;\">";
        _0x1153bb += "<img src=\"" + RESOURCE_URL + "product/" + get_product_id_hex_str(_0x108a3c) + "/connected.png\" style=\"height: 40px; margin-top:10px;margin-left:-16px\">";
        _0x1153bb += '</div>';
      } else {
        _0x1153bb += "<img src=\"" + RESOURCE_URL + "product/" + get_product_id_hex_str(_0x108a3c) + "/connected.png\" height=\"60px\">";
      }
      _0x1153bb += "</div>";
      _0x1153bb += "<div style=\"text-align: center\">";
      _0x1153bb += get_display_name(_0x108a3c);
      _0x1153bb += "</div>";
      _0x1153bb += "</a>";
      _0x1153bb += "</li>";
      _0x3aec36++;
    }
  });
  _0x1153bb += "</div>";
  if (_0x3aec36 > 0x1 && !editing) {
    _0x203e0a("#usb-client-list").html(_0x1153bb);
  } else {
    _0x203e0a('#usb-client-list').html('');
  }
  _0x29874f.render("nav", "client-list-filter-nav");
  _0x3aec36 = 0x0;
  usb_client_list.forEach(_0x1574c3 => {
    if (_0x1574c3.helloed) {
      _0x3aec36++;
    }
  });
  if (_0x3aec36 <= 0x0) {
    if (pair_panel_id < 0x0) {
      var _0x29c786 = layui.layer;
      pair_panel_id = _0x29c786.open({
        'type': 0x1,
        'title': false,
        'skin': 'layui-layer-panel',
        'shade': 0x0,
        'closeBtn': 0x0,
        'anim': -0x1,
        'shadeClose': false,
        'resize': false,
        'scrollbar': false,
        'zIndex': 0x64,
        'content': _0x203e0a("#pair-panel")
      });
      _0x203e0a("#pair-device").css('display', '');
      _0x203e0a("#pairing-waiting").css('display', "none");
      _0x203e0a('#pairing-tips').css('display', 'none');
    }
    _0x203e0a('#pair-more').css("display", "none");
  } else {
    if (pair_panel_id >= 0x0) {
      var _0x29c786 = layui.layer;
      _0x29c786.close(pair_panel_id);
      pair_panel_id = -0x1;
    }
    _0x203e0a('#pair-more').css('display', '');
  }
  if (editing) {
    _0x203e0a("#logo").css("display", "none");
    _0x203e0a("#back-home").css("display", '');
    _0x203e0a("#usb-client-channel").css("display", '');
  } else {
    _0x203e0a("#logo").css("display", '');
    _0x203e0a("#back-home").css("display", "none");
    _0x203e0a("#usb-client-channel").css('display', "none");
  }
}
function ui_refresh_qual(_0x1b6566) {
  if (_0x1b6566 == undefined) {
    return;
  }
  var _0x52156a = Math.round(_0x1b6566.device_info.squal * 0x64 / 0xff);
  $("#surface-quality").text(layui.i18np.prop('STRID_SETTING_SURFACE_QUALITY') + " " + _0x52156a + '%');
  $("#surface-quality").css("display", _0x52156a > 0x0 && get_lods_list(_0x1b6566).length > 0x1 ? '' : "none");
  $("#surface-quality2").text(layui.i18np.prop("STRID_SETTING_SURFACE_QUALITY") + " " + _0x52156a + '%');
  $("#surface-quality2").css("display", _0x52156a > 0x0 && get_lods_list(_0x1b6566).length <= 0x1 ? '' : "none");
  var _0x5a53bc = _0x1b6566.device_info.equal;
  if (_0x5a53bc == 0xff) {
    $("#wireless-quality").text('');
  } else {
    _0x5a53bc = 0x3e8 - _0x5a53bc;
    var _0x14f04c = layui.i18np.prop("STRID_SETTING_WIRELESS_QUALITY") + " " + _0x5a53bc / 0xa + '%';
    if ((_0x1b6566.device_info.txOutputPower == 0x0 ? 0x0 : 0x1) && !(_0x1b6566.device_info != undefined && _0x1b6566.device_info.revision != undefined && _0x1b6566.device_info.revision.substr(0x0, 0x2) == 'G-') && _0x1b6566.device_info.txOutputPowerApplied < 0x8) {
      _0x14f04c += '(' + _0x1b6566.device_info.txOutputPowerApplied + ')';
    }
    $("#wireless-quality").text(_0x14f04c);
  }
}
