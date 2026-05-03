import { DeviceStore, current_usb_client, get_display_name, is_receiver, ACTION_REFRESH_CLIENT_LIST, ACTION_REFRESH_CURRENT_CLIENT, ACTION_SEND_CLIENT_DATA, ACTION_UI_REFRESH_CLIENT_LIST, ACTION_UI_REFRESH_CURRENT_CLIENT, ACTION_UI_REFRESH_CURRENT_CLIENT_RSSI, ACTION_UI_REFRESH_SETTING, ACTION_UI_REFRESH_QUAL, ACTION_UI_REFRESH_KBD_KEY, ACTION_UI_REFRESH_KBD_AXIS, ACTION_UI_REFRESH_KBD_LIGHT, ACTION_UI_REFRESH_KBD_MACRO } from '../state/device-store.js';
import { refresh_client_list, refresh_current_client, ui_refresh_current_client_rssi, ui_refresh_current_client, ui_refresh_client_list, ui_refresh_qual } from './ui-clients.js';
import { ui_refresh_setting } from './ui-settings.js';
import { kbd_ui_refresh_onboard_config } from './ui-keyboard.js';
import { setting_mapping_init, ui_refresh_mapping_key, ui_refresh_mapping_macro_edit, adjustTable } from './ui-mapping.js';
import { refresh_recorded_mapping_keys } from './ui-keyboard.js';
import { send_client_data } from '../protocol/hid-transport.js';
import { send_event_action } from '../protocol/hid-protocol.js';
import { send_event_factory_reset } from '../protocol/http-data-model.js';
import { create_macro_info } from '../protocol/key-config-parser.js';
import { get_key_name_from_code } from '../state/key-lookup.js';
import { hide_waiting } from '../lib/utilities.js';
import { S } from '../protocol/parse-cmd-ui.js';
import { REBOOT_DELAY_MS, RESIZE_DEBOUNCE_MS } from '../data/constants.js';

export function initDeviceStoreHandlers() {
  DeviceStore.on('client:added', () => {
    ui_refresh_client_list();
  });
  DeviceStore.on('client:removed', () => {
    ui_refresh_client_list();
  });
  DeviceStore.on('current:changed', () => {
    S.need_save = false;
    ui_refresh_client_list();
    ui_refresh_current_client();
  });
}

window.addEventListener('message', (event: MessageEvent) => {
  switch (event.data.action) {
    case ACTION_REFRESH_CLIENT_LIST:
      refresh_client_list();
      break;
    case ACTION_REFRESH_CURRENT_CLIENT:
      refresh_current_client();
      break;
    case ACTION_SEND_CLIENT_DATA:
      {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var client: any = DeviceStore.getClient(event.data.usb_client_id);
        if (client) send_client_data(client);
        break;
      }
    case ACTION_UI_REFRESH_CLIENT_LIST:
      ui_refresh_client_list();
      break;
    case ACTION_UI_REFRESH_CURRENT_CLIENT:
      S.need_save = false;
      ui_refresh_current_client();
      break;
    case ACTION_UI_REFRESH_CURRENT_CLIENT_RSSI:
      ui_refresh_current_client_rssi();
      break;
    case ACTION_UI_REFRESH_SETTING:
      ui_refresh_setting(current_usb_client);
      break;
    case ACTION_UI_REFRESH_QUAL:
      ui_refresh_qual(current_usb_client);
      break;
    case 'action_ui_refresh_kbd_onboard':
      kbd_ui_refresh_onboard_config(current_usb_client);
      break;
    case ACTION_UI_REFRESH_KBD_KEY:
      if ($("#kbd-main-setting-key-container").css('display') != 'none') {
        layui.element.tabChange("kbd-main-setting-type", 0x0);
      }
      break;
    case ACTION_UI_REFRESH_KBD_LIGHT:
      if ($('#kbd-main-setting-light-container').css('display') != "none") {
        hide_waiting();
        layui.element.tabChange("kbd-main-setting-type", 0x1);
      }
      break;
    case ACTION_UI_REFRESH_KBD_AXIS:
      if ($("#kbd-main-setting-axis-container").css('display') != "none") {
        hide_waiting();
        layui.element.tabChange('kbd-main-setting-type', 0x2);
      }
      break;
    case 'action_ui_refresh_kbd_advance_key':
      hide_waiting();
      if ($('#kbd-main-setting-advance-key-container').css("display") != "none") {
        layui.element.tabChange("kbd-main-setting-type", 0x3);
      }
      break;
    case ACTION_UI_REFRESH_KBD_MACRO:
      hide_waiting();
      break;
    case 'action_onboard_cfg':
      {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var client: any = DeviceStore.getClient(event.data.usb_client_id);
        if (!client) break;
        var loadingEl = document.getElementById("onboard-config-loading")!;
        if (event.data.msg == "LOADING") {
          if (current_usb_client != undefined && current_usb_client.id == client.id) {
            loadingEl.style.display = '';
          }
        } else if (event.data.msg == "LOADED") {
          if (current_usb_client != undefined && current_usb_client.id == client.id) {
            loadingEl.style.display = 'none';
            setting_mapping_init(current_usb_client);
            ui_refresh_mapping_key(current_usb_client);
          }
        } else if (event.data.msg == "ERROR") {
          if (current_usb_client != undefined && current_usb_client.id == client.id) {
            loadingEl.style.display = "none";
          }
          var layer = layui.layer;
          var i18n = layui.i18np;
          var rebootMsg = i18n.prop("STRID_SETTING_MOUSE_ONBOARD_REBOOT_NEEDED");
          const displayName = get_display_name(client);
          layer.confirm(rebootMsg.replace("{name1}", displayName), {
            'title': i18n.prop("STRID_TITLE_WARNING"),
            'skin': "layui-layer-confirm",
            'btn': [i18n.prop("STRID_SETTING_FACTORY_RESET_S"), i18n.prop("STRID_SETTING_MOUSE_REBOOT_S"), i18n.prop("STRID_BUTTON_CANCEL")],
            'btnAlign': 'c',
            'btn1': function () {
              layer.closeLast(0x0);
              send_event_factory_reset(client, false);
              setTimeout(() => {
                location.reload();
              }, REBOOT_DELAY_MS);
            },
            'btn2': function () {
              layer.closeLast(0x0);
              if (client != undefined) {
                send_event_action(client, 0x33, 0x0);
                setTimeout(() => {
                  location.reload();
                }, REBOOT_DELAY_MS);
              }
            },
            'btn3': function () {
              layer.closeLast(0x0);
            }
          });
        }
        break;
      }
    default:
      break;
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  if (S.device_cfg.length > 0x0 && navigator.hid != undefined) {
    refresh_client_list();
  }
});

export function do_resize() {
  $("#current-usb-client-panel").css("margin-top", (window.innerHeight - 0x6e - 0x1e2 - 0x64) / 0x2);
  let el = document.getElementById("setting-key-delay-section")!;
  let el2 = document.getElementById("setting-lod-section")!;
  el2.style.height = el.offsetTop + el.offsetHeight - el2.offsetTop - 0x14 + 'px';
  var offsetLeft = ($('#pair-more-panel')[0x0].offsetLeft - $('#usb-client-channel')[0x0].offsetWidth / 0x2) * 0x64 / window.innerWidth;
  if (offsetLeft > 0x32) {
    offsetLeft = 0x32;
  }
  $('#usb-client-channel')[0x0].style.left = offsetLeft + '%';
  adjustTable();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
window.addEventListener("resize", (event: any) => {
  clearTimeout(S.resize_timer_id);
  S.resize_timer_id = setTimeout(do_resize, RESIZE_DEBOUNCE_MS);
});

window.onscroll = function () {
  var el = document.getElementById("pair-more-panel")!;
  var el2 = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
  if (el2 > 0xfa) {
    el.style.opacity = '0';
  } else if (el2 > 0x0) {
    el.style.opacity = String((0xfa - el2) / 0xfa);
  } else {
    el.style.opacity = '1';
  }
};

if (navigator.hid != undefined) {
  navigator.hid.addEventListener("connect", (event: Event) => {
    refresh_client_list();
  });
  navigator.hid.addEventListener("disconnect", (event: Event) => {
    refresh_client_list();
  });
}

function onBlur() {
  S.window_focused = false;
}

function onFocus() {
  DeviceStore.clients.forEach(item => {
    if (!is_receiver(item)) {
      if (item.helloed) {
        item.esb_last_alive_time = new Date().getTime();
      }
    }
  });
  S.window_focused = true;
}

window.addEventListener("blur", onBlur);
window.addEventListener("focus", onFocus);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function setting_mapping_key_recording_add(client: any) {
  if (client == 0x10 || client == 0x11 || client == 0x12 || client == 0x5b) {
    if (S.setting_mapping_keys_recorded[0x2] < 0x0) {
      if (S.setting_mapping_keys_recorded[0x0] < 0x0) {
        S.setting_mapping_keys_recorded[0x0] = client;
      } else if (S.setting_mapping_keys_recorded[0x1] < 0x0 && S.setting_mapping_keys_recorded[0x0] != client) {
        S.setting_mapping_keys_recorded[0x1] = client;
      }
    }
  } else if (client != 0x0) {
    if (S.setting_mapping_keys_recorded[0x2] < 0x0) {
      S.setting_mapping_keys_recorded[0x2] = client;
    }
  }
  refresh_recorded_mapping_keys();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function setting_mapping_macro_recording_add(client: any, macroData: any, timeoutId: any) {
  var macroInfo = create_macro_info();
  macroInfo.style = 0x16;
  macroInfo.mouse_key_code = client;
  macroInfo.mouse_key_event = macroData;
  macroInfo.mouse_key_time = 0x1;
  macroInfo.continue_time = 0x0;
  macroInfo.interval_time = 0x0;
  if (S.setting_macro_edit_recording_time != -0x1) {
    S.edit_macros[S.edit_macros.length - 0x1].mouse_key_time = ($("[name=\"macro-record-fixed-time\"]")[0x0] as HTMLInputElement).checked ? 0x32 : timeoutId - S.setting_macro_edit_recording_time;
  }
  S.setting_macro_edit_recording_time = timeoutId;
  macroInfo.name = get_key_name_from_code(macroInfo.mouse_key_code);
  S.edit_macros.push(macroInfo);
  if (client != 256 || macroData != 0x100) {
    ui_refresh_mapping_macro_edit(current_usb_client);
  }
}
