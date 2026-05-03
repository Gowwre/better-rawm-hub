// ===== UI CLIENT LAYER =======================================================
// Device enumeration, client selection, and UI rendering for connected devices.
//
// Uses DeviceStore (the reactive state store) instead of direct global mutation.
// The rendering functions read from backward-compatible globals (usb_client_list,
// current_usb_client) which are aliases for DeviceStore's internal state.
// ============================================================================

async function refresh_client_list() {
  var arr = [];
  var devicesByPid = {};
  await navigator.hid.getDevices().then(arr2 => {
    arr2.forEach(item => {
      if (is_supported(item.productId)) {
        if (devicesByPid[item.productId] == undefined) {
          devicesByPid[item.productId] = [];
        }
        devicesByPid[item.productId][devicesByPid[item.productId].length] = item;
      }
    });
  });
  for (var index in devicesByPid) {
    devicesByPid[index].forEach((item2, item3, item4) => {
      if (item2.collections[0x0].inputReports.length > 0x0 && item2.collections[0x0].outputReports.length > 0x0) {
        arr[arr.length] = item2;
      }
    });
  }

  // Reconcile: remove stale clients, keep connected ones
  var kept = [];
  DeviceStore.clients.forEach(client => {
    var connected = arr.some(device => device == client.device);
    if (connected) {
      kept.push(client);
    } else {
      DeviceStore.removeClient(client.id);
    }
  });

  // Add new devices as clients
  arr.forEach(device => {
    var exists = kept.some(c => c.device == device);
    if (!exists) {
      device.oninputreport = device_receive_data;
      var newClient = DeviceStore.addClient(device, 0xff, false);
      send_event_query(newClient);
    }
  });

  // Cascade: select the first available client after reconciliation
  refresh_current_client();
}

function update_setting_x_polling() {
  var stored = localStorage.getItem('setting-x-polling');
  if (stored == undefined || stored == 0x0) {
    var pollingRate = current_usb_client.device_info.pollingRate;
    if (pollingRate != 0x7d && pollingRate != 0xfa && pollingRate != 0x1f4 && pollingRate != 0x3e8 && pollingRate != 0x7d0 && pollingRate != 4000 && pollingRate != POLLING_RATE_MAX_HZ) {
      localStorage.setItem("setting-x-polling", 0x1);
    }
  }
}

function refresh_current_client() {
  var flag = false;
  DeviceStore.clients.forEach(item => {
    if (current_usb_client != undefined && item.id == current_usb_client.id && item.helloed && !is_receiver(item)) {
      flag = true;
    }
  });
  if (!flag) {
    editing = false;
    close_all_layer();
    const nextClient = DeviceStore.clients.find(item2 => item2.helloed && !is_receiver(item2));
    if (nextClient) {
      DeviceStore.currentId = nextClient.id;
      current_usb_client = nextClient;
      update_setting_x_polling();
      if (nextClient.device_info != undefined && nextClient.device_info.revision != undefined && nextClient.device_info.revision.substr(0x0, 0x2) == 'G-') {
        $("[name=\"setting-fw-channel\"]")[0x1].checked = true;
      } else {
        $("[name=\"setting-fw-channel\"]")[0x0].checked = true;
      }
      $("[name=\"setting-fw-channel\"]")[0x0].disabled = !nextClient.device_info.dynamicGOM;
      $("[name=\"setting-fw-channel\"]")[0x1].disabled = !nextClient.device_info.dynamicGOM;
      layui.form.render('radio');
      DeviceStore._emit('current:changed', nextClient);
    }
  }
}

function ui_refresh_current_client_rssi() {
  var layui2 = layui.$;
  if (current_usb_client != undefined) {
    var el = document.getElementById("current-usb-client-rssi-icon");
    if (current_usb_client.virtual) {
      DeviceStore.clients.forEach(client => {
        if (!client.virtual && client.device == current_usb_client.device) {
          if (is_hub(client) && client.device_info.wired) {
            layui2("#current-usb-client-rssi-icon").css("display", '');
            el.src = RESOURCE_URL + "product/usb.png";
            layui2("#current-usb-client-rssi-icon").css("left", "285px");
            layui2("#current-usb-client-rssi-icon").css('top', "40px");
          } else {
            var value = -Math.abs(client.device_info.rssi);
            if (is_limit_memory(client)) {
              layui2("#current-usb-client-rssi-icon").css("display", '');
              el.src = RESOURCE_URL + "product/wifi.png";
              layui2('#current-usb-client-rssi-icon').css('left', "285px");
              layui2("#current-usb-client-rssi-icon").css("top", "39px");
            } else {
              if (value == 0x0) {
                layui2("#current-usb-client-rssi-icon").css("display", 'none');
              } else {
                if (value >= -0x28) {
                  layui2("#current-usb-client-rssi-icon").css("display", '');
                  el.src = RESOURCE_URL + "product/rssi_higher.png";
                } else {
                  if (value >= -0x3c) {
                    layui2("#current-usb-client-rssi-icon").css('display', '');
                    el.src = RESOURCE_URL + 'product/rssi_high.png';
                  } else if (value >= -0x50) {
                    layui2("#current-usb-client-rssi-icon").css("display", '');
                    el.src = RESOURCE_URL + 'product/rssi_mid.png';
                  } else {
                    layui2("#current-usb-client-rssi-icon").css("display", '');
                    el.src = RESOURCE_URL + "product/rssi_low.png";
                  }
                }
              }
              layui2("#current-usb-client-rssi-icon").css('left', "295px");
              layui2("#current-usb-client-rssi-icon").css("top", "40px");
            }
          }
        }
      });
    } else {
      layui2("#current-usb-client-rssi-icon").css("display", '');
      el.src = RESOURCE_URL + "product/usb.png";
      layui2("#current-usb-client-rssi-icon").css("left", "285px");
    }
    el.className = is_dark_theme() ? "layui-img-tint" : "layui-img-tint-light";
    if (current_usb_client != undefined ? is_hs_keyboard(current_usb_client.device) : false) {
      layui2("#current-usb-client-rssi-icon").css("display", "none");
    }
  }
}

function kbd_dks_init() {
  for (let len = 0x1; len < 0x5; len++) {
    for (let count = 0x1; count < 0x5; count++) {
      var el = 'kbd-dks-arrow' + len + '-' + count;
      document.getElementById(el).addEventListener("mousedown", function () {
        var attr = this.getAttribute("keyId");
        kbd_dks_dragging_name = attr;
      });
      document.getElementById(el).addEventListener("mouseup", function () {
        kbd_dks_dragging_up = true;
      });
    }
  }
}

function kbd_ui_refresh_current_client() {
  var layui2 = layui.$;
  var str = layui.i18np;
  if (current_usb_client != undefined) {
    if (connect_panel_id >= 0x0) {
      var layui3 = layui.layer;
      layui3.close(connect_panel_id);
      connect_panel_id = -0x1;
    }
    if (editing) {
      layui2("#kbd-current-usb-client-panel").css('display', "none");
    } else {
      layui2("#kbd-current-usb-client-panel").css("display", '');
    }
    layui2("#receiver-panel").css("display", "none");
    layui2("#kbd-current-usb-client-panel").css("background-image", is_dark_theme() ? "url(" + RESOURCE_URL + "product/kbd_bg-hover.png)" : "url(" + RESOURCE_URL + '/product/kbd_bg-gray.png)');
    document.getElementById("kbd-current-usb-client-image").src = RESOURCE_URL + "product/" + get_product_id_hex_str(current_usb_client) + "/connected.png";
    layui2('#kbd-current-usb-client-name').html(get_display_name(current_usb_client));
    layui2('#kbd-current-usb-client-firmware').html(str.prop('STRID_HOME_PRODUCT_FIRMWARE') + "&nbsp;" + current_usb_client.device_info.revision);
    if (is_new_firmware_existed(current_usb_client)) {
      layui2("#kbd-current-usb-client-firmware-new").css("display", '');
    } else {
      layui2("#kbd-current-usb-client-firmware-new").css('display', "none");
    }
  } else {
    layui2('#kbd-current-usb-client-panel').css("background-image", "url()");
    document.getElementById("kbd-current-usb-client-image").src = '';
    layui2("#current-usb-client-name").html('');
    layui2("#current-usb-client-name-model").html('');
    layui2("#current-usb-client-firmware").html('');
    var offset = 0x0;
    DeviceStore.clients.forEach(item => {
      if (item.helloed) {
        offset++;
      }
    });
    if (offset == 0x0) {
      layui2('#kbd-current-usb-client-panel').css("display", "none");
      if (connect_panel_id >= 0x0) {
        var layui3 = layui.layer;
        layui3.close(connect_panel_id);
        connect_panel_id = -0x1;
      }
    } else {
      layui2("#kbd-current-usb-client-panel").css("display", '');
      layui2("#receiver-panel").css("display", '');
      if (connect_panel_id < 0x0) {
        var layui3 = layui.layer;
        connect_panel_id = layui3.open({
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
          'content': layui2("#connect-panel")
        });
      }
    }
    layui2('#kbd-current-usb-client-models').html('');
    layui2("#kbd-current-usb-client-firmware-new").css("display", "none");
  }
  layui2("#kbd-current-usb-client-panel").css("margin-top", (window.innerHeight - 0x6e - 0x1e2 - 0x64) / 0x2);
  if (editing) {
    ui_refresh_setting(current_usb_client);
    var productHex = get_product_id_hex_str(current_usb_client);
    document.getElementById('kbd-product-name').src = RESOURCE_URL + "product/" + productHex + "/name.png";
    layui2('#kbd-setting-panel').css('display', '');
    layui2("#kbd-setting-onboard-config").css("display", '');
    layui2("#usb-client-channel").css("display", "none");
    kbd_key_num = pc_kbd_key_num(current_usb_client);
    kbd_keys = pc_kbd_manager_keys(current_usb_client);
    kbd_dks_init();
    kbd_ui_refresh_onboard_config(current_usb_client);
    layui.element.tabChange("kbd-main-setting-type", 0x0);
  } else {
    layui2('#setting-panel').css("display", "none");
    layui2("#kbd-setting-panel").css('display', 'none');
    layui2("#kbd-setting-onboard-config").css("display", "none");
  }
  if (current_usb_client != undefined) {
    if (loading_id >= 0x0) {
      var layui3 = layui.layer;
      layui3.close(loading_id);
      loading_id = -0x1;
    }
  }
}

function ui_refresh_current_client() {
  var layui2 = layui.$;
  var str = layui.i18np;
  if (current_usb_client != undefined ? is_hs_keyboard(current_usb_client.device) : false) {
    kbd_ui_refresh_current_client();
    layui2('#current-usb-client-panel').css("display", "none");
    layui2("#receiver-panel").css('display', "none");
    return;
  } else {
    layui2("#kbd-current-usb-client-panel").css("display", 'none');
  }
  if (current_usb_client != undefined) {
    if (connect_panel_id >= 0x0) {
      var layui3 = layui.layer;
      layui3.close(connect_panel_id);
      connect_panel_id = -0x1;
    }
    if (editing) {
      layui2('#current-usb-client-panel').css("display", "none");
      layui2("#receiver-panel").css("display", "none");
    } else {
      layui2("#current-usb-client-panel").css("display", '');
      layui2('#receiver-panel').css("display", '');
    }
    layui2("#current-usb-client-panel").css("background-image", is_dark_theme() ? 'url(' + RESOURCE_URL + "product/mouse_bg-hover.png?v=1)" : "url(" + RESOURCE_URL + '/product/mouse_bg-gray.png?v=1)');
    var len = get_color_code(current_usb_client);
    if (len.length > 0x0) {
      document.getElementById("current-usb-client-image").src = RESOURCE_URL + "product/" + get_product_id_hex_str(current_usb_client) + '/' + len + "/connected.png";
    } else {
      document.getElementById("current-usb-client-image").src = RESOURCE_URL + "product/" + get_product_id_hex_str(current_usb_client) + '/connected.png';
    }
    layui2("#current-usb-client-name").html(get_display_name(current_usb_client));
    layui2("#current-usb-client-name-model").html(get_display_name_model(current_usb_client));
    layui2("#current-usb-client-firmware").html(str.prop("STRID_HOME_PRODUCT_FIRMWARE") + "&nbsp;" + current_usb_client.device_info.revision);
    ui_refresh_current_client_rssi();
    var el = document.getElementById("current-usb-client-battery-icon");
    if (current_usb_client != undefined ? is_hs_keyboard(current_usb_client.device) : false) {
      layui2("#current-usb-client-battery-icon").css('display', 'none');
    } else {
      layui2("#current-usb-client-battery-icon").css('display', '');
    }
    if (current_usb_client.device_info.charging) {
      if (current_usb_client.device_info.battery >= 0x28) {
        el.src = RESOURCE_URL + "product/charging.png";
      } else if (current_usb_client.device_info.battery >= 0x1e) {
        el.src = RESOURCE_URL + 'product/charging_yellow.png';
      } else {
        el.src = RESOURCE_URL + "product/charging_red.png";
      }
    } else {
      if (is_battery_percent_supported(current_usb_client)) {
        if (current_usb_client.device_info.battery >= 0x28) {
          el.src = RESOURCE_URL + "product/battery.png";
        } else if (current_usb_client.device_info.battery >= 0x1e) {
          el.src = RESOURCE_URL + "product/battery_yellow.png";
        } else {
          el.src = RESOURCE_URL + 'product/battery_red.png';
        }
      } else {
        if (current_usb_client.device_info.battery >= 0x28) {
          el.src = RESOURCE_URL + "product/battery2.png";
        } else if (current_usb_client.device_info.battery >= 0x1e) {
          el.src = RESOURCE_URL + 'product/battery_yellow2.png';
        } else {
          el.src = RESOURCE_URL + 'product/battery_red2.png';
        }
      }
    }
    if (current_usb_client.device_info.battery >= 0x28) {
      el.className = is_dark_theme() ? "layui-img-tint" : "layui-img-tint-light";
    } else {
      el.className = '';
    }
    layui2("#current-usb-client-battery").css("color", is_dark_theme() ? "#303030" : '#404040');
    if (is_battery_percent_supported(current_usb_client)) {
      if (current_usb_client.helloed) {
        layui2("#current-usb-client-battery").html(current_usb_client.device_info.battery);
      } else {
        layui2('#current-usb-client-battery').html("---");
      }
    } else {
      layui2("#current-usb-client-battery").html('');
    }
    if (current_usb_client.device_info.charging) {
      layui2("#current-usb-client-battery").css("display", 'none');
    } else {
      layui2("#current-usb-client-battery").css("display", '');
    }
    var html = "<table><tr>";
    get_color_codes(current_usb_client).forEach(item => {
      html += "<td>";
      html += "<a color-code=\"" + item + "\" color-action=\"select\" style=\"cursor: pointer;\">";
      html += "<img src=\"" + RESOURCE_URL + "product/" + get_product_id_hex_str(current_usb_client) + '/' + item + "/preview.png\">";
      html += '</a>';
      html += "</td>";
    });
    html += '</tr></table>';
    layui2("#current-usb-client-models").html(html);
    if (is_new_firmware_existed(current_usb_client)) {
      layui2("#current-usb-client-firmware-new").css('display', '');
    } else {
      layui2("#current-usb-client-firmware-new").css("display", 'none');
    }
  } else {
    layui2('#current-usb-client-panel').css('background-image', "url()");
    document.getElementById("current-usb-client-image").src = '';
    layui2("#current-usb-client-name").html('');
    layui2('#current-usb-client-name-model').html('');
    layui2("#current-usb-client-firmware").html('');
    document.getElementById("current-usb-client-rssi-icon").src = '';
    document.getElementById("current-usb-client-battery-icon").src = '';
    layui2("#current-usb-client-battery").css("display", "none");
    var offset = 0x0;
    DeviceStore.clients.forEach(item2 => {
      if (item2.helloed) {
        offset++;
      }
    });
    if (offset == 0x0) {
      layui2("#current-usb-client-panel").css("display", "none");
      layui2("#receiver-panel").css('display', 'none');
      if (connect_panel_id >= 0x0) {
        var layui3 = layui.layer;
        layui3.close(connect_panel_id);
        connect_panel_id = -0x1;
      }
    } else {
      layui2("#current-usb-client-panel").css("display", '');
      layui2('#receiver-panel').css("display", '');
      if (connect_panel_id < 0x0) {
        var layui3 = layui.layer;
        connect_panel_id = layui3.open({
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
          'content': layui2("#connect-panel")
        });
      }
    }
    layui2("#current-usb-client-models").html('');
    layui2('#current-usb-client-firmware-new').css("display", "none");
  }
  layui2('#current-usb-client-panel').css("margin-top", (window.innerHeight - 0x6e - 0x1e2 - 0x64) / 0x2);
  offset = 0x0;
  var html = '<table><tr>';
  DeviceStore.clients.forEach(client => {
    if (is_receiver(client) && client.helloed) {
      if (offset > 0x0) {
        html += "<td style=\"width: 10px;\"><td>";
      }
      html += "<td>";
      if (current_usb_client != undefined && current_usb_client.helloed) {
        var esbChannel = current_usb_client.product_esb_ch == 0xff ? current_usb_client.device_info.esbChannel : current_usb_client.product_esb_ch;
        if (get_esb_addr_arr(current_usb_client.device_info, esbChannel) == get_esb_addr(client.device_info, esbChannel)) {
          if (is_dark_theme()) {
            html += "<img src=\"" + RESOURCE_URL + "product/receiver-selected.png\" height=\"17px\">";
          } else {
            html += "<img src=\"" + RESOURCE_URL + "product/receiver-selected.png\" height=\"17px\" class=\"layui-img-tint-light\">";
          }
        } else {
          html += "<img height=\"17px\">";
        }
      } else {
        html += "<img height=\"17px\">";
      }
      html += "<p style=\"font-size: 14px;\">" + get_display_name(client) + "</p>";
      html += "<a usb-client-id=\"" + client.id + "\" receiver-action=\"select\" style=\"cursor: pointer;\">";
      var i;
      var idx;
      if (is_hub(client)) {
        i = "product/receiver-dh-connected.png";
        idx = 'product/receiver-dh-paired.png';
      } else if (get_max_polling_rate(client, DeviceStore.clients) > 0x3e8) {
        i = "product/receiver-hs-connected.png";
        idx = 'product/receiver-hs-paired.png';
      } else {
        i = 'product/receiver-connected.png';
        idx = "product/receiver-paired.png";
      }
      var i2;
      if (current_usb_client != undefined && is_soc_compatible(current_usb_client, client)) {
        i2 = '';
      } else {
        i2 = " style=\"opacity: 0.25\"";
      }
      if (current_usb_client != undefined && current_usb_client.helloed) {
        if (is_esb_addr_arr_existed(current_usb_client.device_info, esbChannel, get_esb_addr(client.device_info, esbChannel))) {
          html += "<img src=\"" + RESOURCE_URL + idx + "\"" + i2 + " class=\"layui-receiver\">";
        } else if (is_dark_theme()) {
          html += "<img src=\"" + RESOURCE_URL + i + "\"" + i2 + " class=\"layui-receiver\">";
        } else {
          html += "<img src=\"" + RESOURCE_URL + i + "\"" + i2 + " class=\"layui-receiver layui-img-tint-light\">";
        }
      } else if (is_dark_theme()) {
        html += "<img src=\"" + RESOURCE_URL + i + "\"" + i2 + " class=\"layui-receiver\">";
      } else {
        html += "<img src=\"" + RESOURCE_URL + i + "\"" + i2 + " class=\"layui-receiver layui-img-tint-light\">";
      }
      html += "</a>";
      html += "<p style=\"font-size: 14px;\">" + str.prop("STRID_HOME_PRODUCT_FIRMWARE") + '&nbsp;' + client.device_info.revision + "</p>";
      if (is_new_firmware_existed(client)) {
        html += "<p id=\"current-usb-client-firmware-new\" class=\"layui-firmware-new\" firmware-action=\"click\" data-i18n-title=\"STRID_HOME_NEW_VER_AVAIL\">æœ‰æ–°çš„ç‰ˆæœ¬å¯ç”¨</p>";
      }
      html += "</td>";
      offset++;
    }
  });
  html += "</tr></table>";
  layui2('#receiver-panel').html(html);
  if (editing) {
    ui_refresh_setting(current_usb_client);
    layui2("#setting-panel").css("display", '');
  } else {
    layui2("#setting-panel").css("display", "none");
    layui2("#kbd-setting-panel").css("display", 'none');
    layui2("#kbd-setting-onboard-config").css("display", 'none');
  }
  if (current_usb_client != undefined) {
    if (loading_id >= 0x0) {
      var layui3 = layui.layer;
      layui3.close(loading_id);
      loading_id = -0x1;
    }
  }
}

function ui_refresh_client_list() {
  var offset = 0x0;
  var layui2 = layui.element;
  var layui3 = layui.$;
  var html;
  if (is_dark_theme()) {
    html = "<div class=\"layui-nav\" lay-filter=\"client-list-filter-nav\" style=\"background-color: #37373A;padding-left: 0px;padding-right: 0px\">";
  } else {
    html = "<div class=\"layui-nav layui-bg-gray\" lay-filter=\"client-list-filter-nav\" style=\"padding-left: 0px;padding-right: 0px\">";
  }
  DeviceStore.clients.forEach(item => {
    if (!is_receiver(item) && item.helloed) {
      if (current_usb_client != undefined && item.id == current_usb_client.id) {
        html += "<li class=\"layui-nav-item layui-this\" style=\"width: 140px\">";
      } else {
        html += "<li class=\"layui-nav-item\" style=\"width: 140px\">";
      }
      html += "<a usb-client-id=\"" + item.id + "\" list-action=\"select\">";
      html += "<div style=\"text-align: center\">";
      var len = get_color_code(item);
      if (len.length > 0x0) {
        html += "<img src=\"" + RESOURCE_URL + "product/" + get_product_id_hex_str(item) + '/' + len + "/connected.png\" height=\"60px\">";
      } else if (item != undefined ? is_hs_keyboard(item.device) : false) {
        html += "<div style=\"height:60px; align-items: center;justify-content: center;\">";
        html += "<img src=\"" + RESOURCE_URL + "product/" + get_product_id_hex_str(item) + "/connected.png\" style=\"height: 40px; margin-top:10px;margin-left:-16px\">";
        html += '</div>';
      } else {
        html += "<img src=\"" + RESOURCE_URL + "product/" + get_product_id_hex_str(item) + "/connected.png\" height=\"60px\">";
      }
      html += "</div>";
      html += "<div style=\"text-align: center\">";
      html += get_display_name(item);
      html += "</div>";
      html += "</a>";
      html += "</li>";
      offset++;
    }
  });
  html += "</div>";
  if (offset > 0x1 && !editing) {
    layui3("#usb-client-list").html(html);
  } else {
    layui3('#usb-client-list').html('');
  }
  layui2.render("nav", "client-list-filter-nav");
  offset = 0x0;
  DeviceStore.clients.forEach(item2 => {
    if (item2.helloed) {
      offset++;
    }
  });
  if (offset <= 0x0) {
    if (pair_panel_id < 0x0) {
      var layui4 = layui.layer;
      pair_panel_id = layui4.open({
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
        'content': layui3("#pair-panel")
      });
      layui3("#pair-device").css('display', '');
      layui3("#pairing-waiting").css('display', "none");
      layui3('#pairing-tips').css('display', 'none');
    }
    layui3('#pair-more').css("display", "none");
  } else {
    if (pair_panel_id >= 0x0) {
      var layui4 = layui.layer;
      layui4.close(pair_panel_id);
      pair_panel_id = -0x1;
    }
    layui3('#pair-more').css('display', '');
  }
  if (editing) {
    layui3("#logo").css("display", "none");
    layui3("#back-home").css("display", '');
    layui3("#usb-client-channel").css("display", '');
  } else {
    layui3("#logo").css("display", '');
    layui3("#back-home").css("display", "none");
    layui3("#usb-client-channel").css('display', "none");
  }
}

function ui_refresh_qual(client) {
  if (client == undefined) {
    return;
  }
  var value = Math.round(client.device_info.squal * 0x64 / 0xff);
  $("#surface-quality").text(layui.i18np.prop('STRID_SETTING_SURFACE_QUALITY') + " " + value + '%');
  $("#surface-quality").css("display", value > 0x0 && get_lods_list(client).length > 0x1 ? '' : "none");
  $("#surface-quality2").text(layui.i18np.prop("STRID_SETTING_SURFACE_QUALITY") + " " + value + '%');
  $("#surface-quality2").css("display", value > 0x0 && get_lods_list(client).length <= 0x1 ? '' : "none");
  var value2 = client.device_info.equal;
  if (value2 == 0xff) {
    $("#wireless-quality").text('');
  } else {
    value2 = 0x3e8 - value2;
    var layui2 = layui.i18np.prop("STRID_SETTING_WIRELESS_QUALITY") + " " + value2 / 0xa + '%';
    if ((client.device_info.txOutputPower == 0x0 ? 0x0 : 0x1) && !(client.device_info != undefined && client.device_info.revision != undefined && client.device_info.revision.substr(0x0, 0x2) == 'G-') && client.device_info.txOutputPowerApplied < 0x8) {
      layui2 += '(' + client.device_info.txOutputPowerApplied + ')';
    }
    $("#wireless-quality").text(layui2);
  }
}
