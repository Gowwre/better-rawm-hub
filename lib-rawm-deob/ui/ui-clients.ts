import { is_hs_keyboard } from '../data/device-database.js';
import { DeviceStore, DS, is_supported, is_receiver, is_hub, get_display_name, get_display_name_model, get_color_code, get_color_codes, get_product_id_hex_str, is_new_firmware_existed, get_max_polling_rate, is_soc_compatible, is_esb_addr_arr_existed, get_esb_addr, get_esb_addr_arr, is_battery_percent_supported, get_lods_list, is_limit_memory, RESOURCE_URL, current_usb_client, ACTION_REFRESH_CURRENT_CLIENT, ACTION_UI_REFRESH_CLIENT_LIST, ACTION_UI_REFRESH_CURRENT_CLIENT } from '../state/device-store.js';
import { send_event_query } from '../protocol/hid-protocol.js';
import { device_receive_data } from '../protocol/hid-transport.js';
import { S, is_dark_theme } from '../protocol/parse-cmd-ui.js';
import { pc_kbd_key_num, pc_kbd_manager_keys } from '../state/key-lookup.js';
import { ui_refresh_setting } from './ui-settings.js';
import { kbd_ui_refresh_onboard_config, close_all_layer } from './ui-keyboard.js';
import { POLLING_RATE_MAX_HZ } from '../data/constants.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function refresh_client_list() {
  var arr: any[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  var devicesByPid: Record<string, any[]> = {};
  await navigator.hid!.getDevices().then((arr2: HIDDevice[]) => {
    arr2.forEach(item => {
      if (devicesByPid[item.productId] == undefined) {
        devicesByPid[item.productId] = [];
      }
      devicesByPid[item.productId][devicesByPid[item.productId].length] = item;
    });
  });
  // Add all detected devices; S.device_cfg is used for feature config, not connection gating
  for (var key in devicesByPid) {
    arr = arr.concat(devicesByPid[key]);
  }
  // [1] Merge existing DeviceStore clients with newly discovered devices
  var merged: any[] = [];
  DeviceStore.clients.forEach((client: any) => {
    var found = arr.find((item: HIDDevice) => item == client.device);
    if (found) {
      merged.push(client);
    }
  });
  // [2] For each new device (not already in merged list), register it and send event query
  for (var idx = 0; idx < arr.length; idx++) {
    var item = arr[idx];
    var found = merged.find((c: any) => c.device == item && !c.virtual);
    if (!found) {
      item.oninputreport = device_receive_data;
      var newClient = DeviceStore.addClient(item, 0xff, false);
      try {
        if (!item.opened) {
          await item.open();
        }
        send_event_query(newClient);
      } catch (err) {
        console.error('[refresh_client_list] open/query error', err);
      }
      merged.push(newClient);
    }
  }
  DeviceStore.clients = merged;
  // [3] Refresh the current client selection
  // Always refresh the pair panel and client selection after a list refresh
  if (!DeviceStore.current && DeviceStore.clients.length > 0) {
    var first = DeviceStore.clients.find((c: any) => !c.virtual);
    if (first) DeviceStore.selectClient(first.id);
  }
  window.postMessage({
    'action': ACTION_UI_REFRESH_CLIENT_LIST
  });
  window.postMessage({
    'action': ACTION_REFRESH_CURRENT_CLIENT
  });
}

export function update_setting_x_polling() {
  var stored = localStorage.getItem('setting-x-polling');
  if (stored == undefined || stored == '0') {
    var pollingRate = current_usb_client.device_info.pollingRate;
    if (pollingRate != 0x7d && pollingRate != 0xfa && pollingRate != 0x1f4 && pollingRate != 0x3e8 && pollingRate != 0x7d0 && pollingRate != 4000 && pollingRate != POLLING_RATE_MAX_HZ) {
      localStorage.setItem("setting-x-polling", '1');
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ui_refresh_current_client_panel(client: any) {
  if (client != undefined) {
    var html = '';
    var displayName = get_display_name(client);
    html += '<div id="current-usb-client-info" usb-client-id="' + client.id + '">';
    html += '<div class="layui-row" style="width: 100%; height: 100%;">';
    html += '<div class="layui-col-xs9">';
    html += '<div class="layui-row" style="width: 100%; margin-left: 10px;">';
    html += '<div class="layui-col-xs12" style="padding-left: 0; height: 30px;">';
    if (is_new_firmware_existed(client)) {
      html += '<span style="font-size: medium; font-weight: bold;">' + displayName + '</span>';
      html += '<span id="current-usb-client-firmware-new" style="font-size: larger; font-weight: bold; margin-left: 10px; color:' + (is_dark_theme() ? '#FF0' : 'green') + ';">' + S.firmware_new + '</span>';
    } else {
      html += '<span style="font-size: medium; font-weight: bold;">' + displayName + '</span>';
    }
    html += '</div>';
    html += '<div class="layui-col-xs12" style="padding-left: 0; height: 30px;">';
    html += '<span id="current-usb-client-name" style="font-size: small;">' + client.device_name + '</span>';
    html += '</div>';
    html += '</div>';
    html += '</div>';
    html += '<div class="layui-col-xs3" style="padding-right: 12px;">';
    var img = get_display_name_model(client);
    if (img.length > 0) {
      html += '<div style="position: absolute; right: 0;">';
      html += '<img src="' + RESOURCE_URL + 'setting/' + img + '" style="width: 100px; height: auto;">';
      html += '</div>';
    }
    html += '</div>';
    html += '</div>';
    html += '</div>';
    if (document.getElementById('current-usb-client-info') != undefined) {
      document.getElementById('current-usb-client-info')!.outerHTML = html;
    }
    $('[usb-client-id="' + client.id + '"]');
    var isHid = is_hs_keyboard(client);
    var kbdEl = document.getElementById('current-usb-client-kbd');
    if (kbdEl) kbdEl.style.display = isHid ? '' : 'none';
    ui_refresh_setting(client);
    if (client.device_info != undefined && client.device_info.kbd_onboardNum > 0) {
      kbd_ui_refresh_onboard_config(client);
    }
  } else {
    var html = '';
    html += '<div id="current-usb-client-info" style="display: flex; align-items: center; justify-content: center; height: 100%;">';
    html += '<span style="color: gray;">' + layui.i18np.prop('STRID_USB_CLIENT_LIST_DISCONNECT') + '</span>';
    html += '</div>';
    var infoEl = document.getElementById('current-usb-client-info');
    if (infoEl) infoEl.outerHTML = html;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function refresh_current_client() {
  // Original: validates current selection, picks first helloed non-receiver if invalid
  var found = false;
  DeviceStore.clients.forEach((client: any) => {
    if (current_usb_client != undefined && client.id == current_usb_client.id && client.helloed && !is_receiver(client)) {
      found = true;
    }
  });
  if (!found) {
    S.editing = false;
    close_all_layer();
    var selected = false;
    // Prefer virtual helloed clients over non-virtual ones
    DeviceStore.clients.forEach((client: any) => {
      if (!selected && client.helloed && client.virtual && !is_receiver(client)) {
        DeviceStore.selectClient(client.id);
        selected = true;
        update_setting_x_polling();
      }
    });
    if (!selected) {
      DeviceStore.clients.forEach((client: any) => {
        if (!selected && client.helloed && !is_receiver(client)) {
          DeviceStore.selectClient(client.id);
          selected = true;
          update_setting_x_polling();
        }
      });
    }
    if (!selected) {
      DeviceStore.unselectClient();
    }
  }
  window.postMessage({ 'action': ACTION_UI_REFRESH_CLIENT_LIST });
  window.postMessage({ 'action': ACTION_UI_REFRESH_CURRENT_CLIENT });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ui_refresh_current_client() {
  ui_refresh_current_client_panel(current_usb_client);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ui_refresh_client_list() {
  var value = DeviceStore.clients;
  var html = '<div class="layui-row" style="display: flex;">';
  if (value.length > 0) {
    value.forEach((client: any) => {
      if (client.virtual && current_usb_client != undefined && is_receiver(current_usb_client)) {
        var displayName = get_display_name(client);
        var hasColor = get_color_code(client);
        var isSelected = client.id == DeviceStore.currentId;
        var isHid = is_hs_keyboard(client.device);
        html += '<div class="layui-col-xs3" style="width: 230px;">';
        html += '<a usb-client-index="' + client.id + '" usb-client-action="select">';
        html += '<div style="display: flex; flex-direction: row; margin-top: 10px;' + (isSelected ? ' background:#202020; border-radius:5px;' : '') + '">';
        html += '<div style="margin-left: 6px;">';
        var imgPath = hasColor != '' && hasColor != undefined && hasColor.length > 0 && get_color_codes(client).includes(hasColor) ? 'setting/' + hasColor + '.png' : 'mouse_white.png';
        html += '<img src="' + RESOURCE_URL + imgPath + '" style="width: 52px; height: 38px;">';
        html += '</div>';
        html += '<div style="display: flex; margin-left: 8px;">';
        html += '<div style="display: flex; flex-direction: column;">';
        html += '<span style="font-size: small;">' + displayName + '</span>';
        html += '<span style="font-size: x-small; color: gray;">' + decodeURI(client.device_name) + '</span>';
        html += '</div>';
        if (is_new_firmware_existed(client)) {
          html += '<div>';
          html += '<span id="current-usb-client-firmware-new" style="font-size: small; font-weight: bold; color:#FF0; margin-left: 6px;">' + S.firmware_new + '</span>';
          html += '</div>';
        }
        html += '</div>';
        html += '</div>';
        html += '</a>';
        html += '</div>';
      }
    });
  }
  html += '</div>';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  var pairPanel: any = document.getElementById('usb-client-device-pair-panel');
  if (pairPanel) {
    pairPanel.innerHTML = html;
  }
  // Manage pair panel layer visibility (matching original behavior)
  var helloedCount = 0;
  DeviceStore.clients.forEach((client: any) => {
    if (client.helloed) {
      helloedCount++;
    }
  });
  var $ = layui.$;
  var layer = layui.layer;
  if (helloedCount <= 0) {
    if (S.pair_panel_id < 0) {
      S.pair_panel_id = layer.open({
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
        'content': $('#pair-panel')
      });
      $('#pair-device').css('display', '');
      $('#pairing-waiting').css('display', 'none');
      $('#pairing-tips').css('display', 'none');
    }
    $('#pair-more').css('display', '');
  } else {
    if (S.pair_panel_id >= 0) {
      layer.close(S.pair_panel_id);
      S.pair_panel_id = -1;
    }
    $('#pair-more').css('display', '');
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ui_refresh_current_client_rssi() {
  var value = current_usb_client;
  if (value != undefined && value.device_info != undefined && value.device_info.rssi != undefined) {
    var el = document.getElementById('current-usb-client-rssi');
    if (el) el.innerHTML = value.device_info.rssi.toString();
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ui_refresh_qual(client: any) {
  if (client != undefined && client.device_info != undefined) {
    if (client.device_info.squal != undefined) {
      var el = document.getElementById('current-usb-client-squal');
      if (el) el.innerHTML = '' + client.device_info.squal;
    }
    if (client.device_info.equal != undefined) {
      var el = document.getElementById('current-usb-client-equal');
      if (el) el.innerHTML = '' + client.device_info.equal;
    }
    if (client.device_info.txOutputPowerApplied != undefined) {
      var value = client.device_info.txOutputPowerApplied;
    }
  }
}
