import { hidHandlers } from './hid-parser.js';
import { skip_recv_buf } from './hid-transport.js';
import { current_usb_client, basic_info, reset_device_cfg, get_shortcuts } from '../state/device-store.js';
import { MASK_LOW_NIBBLE, MASK_12BIT, MASK_BYTE, LANG_ZH_CN, LANG_EN_US, LANG_ZH_TW, LANG_KO_KR, LANG_JA_JP, LANG_UK_UA, LANG_TR_TR } from '../data/constants.js';
import { ACTION_REFRESH_CLIENT_LIST, ACTION_UI_REFRESH_CURRENT_CLIENT } from '../state/device-store.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parse_cmd(client: any) {
  var i: boolean;
  do {
    i = false;
    var byteLen = client.recv_buf;
    var value = byteLen.byteLength;
    if (value >= 4) {
      if (byteLen[0] == 0xff && byteLen[1] == 0xff && byteLen[2] == 0xff && byteLen[3] == 0xff) {} else {
        client.recv_buf = new Uint8Array(0);
        client.syncing = true;
        log_r(">>>>>>>>sync start");
      }
    }
    if (!client.syncing && value >= 6) {
      if ((byteLen[4] & MASK_LOW_NIBBLE) == 3 && byteLen[6] == 0x20) {}
      var value2 = (byteLen[4] << 4 & MASK_12BIT) | (byteLen[5] & MASK_BYTE);
      if (value >= value2 + 4) {
        var value3 = byteLen[4] & MASK_LOW_NIBBLE;
        var handler = hidHandlers[value3];
        if (handler) {
          handler(client, byteLen, value2);
        }
        if (!client.syncing) {
          client.recv_buf = skip_recv_buf(client.recv_buf, value2 + 4);
          i = true;
        }
      }
    }
  } while (i);
}

export function bytes_index_of(byteLen: Uint8Array, index: Uint8Array) {
  for (var len = 0; len <= byteLen.byteLength - index.byteLength; ++len) {
    var flag = true;
    for (var offset = 0; offset < index.byteLength; offset++) {
      if (byteLen[len + offset] != index[offset]) {
        flag = false;
        break;
      }
    }
    if (flag) {
      return len;
    }
  }
  return -1;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function log_r(msg: any) { console.error(msg); }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
var __S: Record<string, any> = {};
__S.current_usb_receiver = undefined;
__S.device_cfg = [];
__S.pair_panel_id = -1;
__S.not_support_id = -1;
__S.connect_panel_id = -1;
__S.editing = false;
__S.loading_id = -1;
__S.tips_panel_id = -1;
__S.cpi_level_editing = false;
__S.cpi_level_index = -1;
__S.cpi_level_light = 0;
__S.mouse_keys = [];
__S.mouse_key_labels = [];
__S.setting_mapping_keys = [];
__S.select_key_name = '';
__S.key_record_panel_id = undefined;
__S.onboard_config_index = 0;
__S.onboard_index = 0;
__S.onboard_configs = [];
__S.onboard_status = [];
__S.onboard_keys = [];
__S.mouse_functions = [];
__S.mouse_function_descs = [];
__S.macro_trigger_types = [];
__S.macro_counts = [];
__S.macro_trigger_type_index = 0;
__S.edit_macros = [];
__S.current_edit_macro = [];
__S.macro_edit_panel_id = undefined;
__S.macro_record_panel_id = undefined;
__S.macro_edit_index = -1;
__S.macro_keep_time_min = 0;
__S.combination_key_index = 0;
__S.setting_mapping_key_recording = false;
__S.setting_mapping_keys_recorded = [-1, -1, -1];
__S.setting_macro_edit_recording = false;
__S.setting_macro_edit_recording_time = -1;
__S.wireless_optimizing = false;
__S.resize_timer_id = undefined;
__S.remote_buf_free_size = 0;
__S.NOTIFY_DATA_BUF_SIZE = 512;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
__S.key_pos = {} as any;
__S.key_pos['2329'] = {
  'm1': [0x1e, 0x5a], 'm2': [0x13b, 0x7a], 'm3': [0x16d, 0x5a],
  'm4': [0x13b, 0xbe], 'm5': [0x1e, 0xe1], 'm6': [0x1e, 0xb4],
  'm7': [0x13b, 0x12e], 'wheel-line-container': [0x13b, 0x44],
  'wheel-down': [0x50, 0x20], 'wheel-up': [0x145, 0x20]
};
__S.key_pos['232c'] = {
  'm1': [0x1e, 0x5a], 'm2': [0x13b, 0x7a], 'm3': [0x16d, 0x5a],
  'm4': [0x139, 0xb5], 'm5': [0x1a, 0xde], 'm6': [0x1e, 0xaf],
  'm7': [0x13b, 0x12e], 'wheel-line-container': [0x13b, 0x44],
  'wheel-down': [0x50, 0x20], 'wheel-up': [0x145, 0x20]
};
__S.key_pos['232d'] = {
  'm1': [0x1e, 0x5a], 'm2': [0x13b, 0x7a], 'm3': [0x16d, 0x5a],
  'm4': [0x13b, 0xbe], 'm5': [0x1e, 0xf0], 'm6': [0x1e, 0xb4],
  'm7': [0x13b, 0x12e], 'wheel-line-container': [0x13b, 0x44],
  'wheel-down': [0x50, 0x20], 'wheel-up': [0x145, 0x20]
};
__S.key_pos['232f'] = {
  'm1': [0x1e, 0x5a], 'm2': [0x13b, 0x7a], 'm3': [0x16d, 0x5a],
  'm4': [0x13b, 0xbe], 'm5': [0x1e, 0xe1], 'm6': [0x1e, 0xb4],
  'm7': [0x13b, 0x12e], 'wheel-line-container': [0x13b, 0x44],
  'wheel-down': [0x50, 0x20], 'wheel-up': [0x145, 0x20]
};
__S.key_pos['2330'] = {
  'm1': [0x1e, 0x5a], 'm2': [0x13b, 0x7a], 'm3': [0x16d, 0x5a],
  'm4': [0x13b, 0xbe], 'm5': [0x1e, 0xe1], 'm6': [0x1e, 0xb4],
  'm7': [0x13b, 0x12e], 'wheel-line-container': [0x13b, 0x44],
  'wheel-down': [0x50, 0x20], 'wheel-up': [0x145, 0x20]
};
__S.key_pos['2331'] = {
  'm1': [0x1e, 0x5a], 'm2': [0x13b, 0x7a], 'm3': [0x16d, 0x5a],
  'm4': [0x13b, 0xbe], 'm5': [0x1e, 0xe1], 'm6': [0x1e, 0xb4],
  'm7': [0x13b, 0x12e], 'wheel-line-container': [0x13b, 0x44],
  'wheel-down': [0x50, 0x20], 'wheel-up': [0x145, 0x20]
};
__S.key_pos['232e'] = {
  'm1': [0x1e, 0x5a], 'm2': [0x13b, 0x7a], 'm3': [0x16d, 0x5a],
  'm4': [0x139, 0xb4], 'm5': [0x1a, 0xea], 'm6': [0x1e, 0xb8],
  'm7': [0x13b, 0x12e], 'wheel-line-container': [0x13b, 0x44],
  'wheel-down': [0x50, 0x20], 'wheel-up': [0x145, 0x20]
};
__S.key_pos['2332'] = {
  'm1': [0x1e, 0x5a], 'm2': [0x13b, 0x7a], 'm3': [0x16d, 0x5a],
  'm4': [0x139, 0xb4], 'm5': [0x1a, 0xea], 'm6': [0x1e, 0xb8],
  'm7': [0x13b, 0x12e], 'wheel-line-container': [0x13b, 0x44],
  'wheel-down': [0x50, 0x20], 'wheel-up': [0x145, 0x20]
};
__S.key_pos['2333'] = {
  'm1': [0x1e, 0x5a], 'm2': [0x13b, 0x7a], 'm3': [0x16d, 0x5a],
  'm4': [0x139, 0xb4], 'm5': [0x1a, 0xe6], 'm6': [0x1e, 0xb8],
  'm7': [0x13b, 0x12e], 'wheel-line-container': [0x139, 0x44],
  'wheel-down': [0x50, 0x20], 'wheel-up': [0x145, 0x20]
};
__S.key_pos['2334'] = {
  'm1': [0x1e, 0x5a], 'm2': [0x13b, 0x7a], 'm3': [0x16d, 0x5a],
  'm4': [0x139, 0xb4], 'm5': [0x1a, 0xe6], 'm6': [0x1e, 0xb8],
  'm7': [0x13b, 0x12e], 'wheel-line-container': [0x139, 0x44],
  'wheel-down': [0x50, 0x20], 'wheel-up': [0x145, 0x20]
};
__S.key_pos['2337'] = {
  'm1': [0x1e, 0x5a], 'm2': [0x13b, 0x7a], 'm3': [0x16d, 0x5a],
  'm4': [0x139, 0xb4], 'm5': [0x1a, 0xe6], 'm6': [0x1e, 0xb8],
  'm7': [0x13b, 0x12e], 'wheel-line-container': [0x139, 0x44],
  'wheel-down': [0x50, 0x20], 'wheel-up': [0x145, 0x20]
};
__S.key_pos['2338'] = {
  'm1': [0x19, 0x5a], 'm2': [0x136, 0x7a], 'm3': [0x168, 0x5a],
  'm4': [0x139, 0xb4], 'm5': [0x22, 0xe6], 'm6': [0x24, 0xb8],
  'm7': [0x13b, 0x12e], 'wheel-line-container': [0x136, 0x44],
  'wheel-down': [0x50, 0x20], 'wheel-up': [0x145, 0x20]
};
__S.key_pos['2339'] = {
  'm1': [0x19, 0x5a], 'm2': [0x136, 0x7a], 'm3': [0x168, 0x5a],
  'm4': [0x139, 0xb4], 'm5': [0x22, 0xe6], 'm6': [0x24, 0xb8],
  'm7': [0x13b, 0x12e], 'wheel-line-container': [0x136, 0x44],
  'wheel-down': [0x50, 0x20], 'wheel-up': [0x145, 0x20]
};
__S.key_pos['233a'] = {
  'm1': [0x19, 0x5a], 'm2': [0x138, 0x76], 'm3': [0x168, 0x5a],
  'm4': [0x139, 0xad], 'm5': [0x22, 0xe6], 'm6': [0x24, 0xb8],
  'm7': [0x13b, 0x12e], 'wheel-line-container': [0x138, 0x44],
  'wheel-down': [0x50, 0x20], 'wheel-up': [0x145, 0x20]
};
__S.key_pos['233e'] = {
  'm1': [0x1e, 0x5a], 'm2': [0x13b, 0x7a], 'm3': [0x16d, 0x5a],
  'm4': [0x139, 0xb4], 'm5': [0x1a, 0xea], 'm6': [0x1e, 0xb8],
  'm7': [0x13b, 0x12e], 'wheel-line-container': [0x13b, 0x44],
  'wheel-down': [0x50, 0x20], 'wheel-up': [0x145, 0x20]
};
__S.key_pos['233f'] = {
  'm1': [0x19, 0x5a], 'm2': [0x136, 0x7a], 'm3': [0x168, 0x5a],
  'm4': [0x139, 0xb4], 'm5': [0x22, 0xe6], 'm6': [0x24, 0xb8],
  'm7': [0x13b, 0x12e], 'wheel-line-container': [0x136, 0x44],
  'wheel-down': [0x50, 0x20], 'wheel-up': [0x145, 0x20]
};
__S.key_pos['2340'] = {
  'm1': [0x1e, 0x5a], 'm2': [0x13b, 0x7a], 'm3': [0x16d, 0x5a],
  'm4': [0x13b, 0xbe], 'm5': [0x1e, 0xf0], 'm6': [0x1e, 0xb4],
  'm7': [0x13b, 0x12e], 'wheel-line-container': [0x13b, 0x44],
  'wheel-down': [0x50, 0x20], 'wheel-up': [0x145, 0x20]
};
__S.key_pos['2343'] = {
  'm1': [0x19, 0x5a], 'm2': [0x138, 0x76], 'm3': [0x168, 0x5a],
  'm4': [0x139, 0xad], 'm5': [0x22, 0xe6], 'm6': [0x24, 0xb8],
  'm7': [0x13b, 0x12e], 'wheel-line-container': [0x138, 0x44],
  'wheel-down': [0x50, 0x20], 'wheel-up': [0x145, 0x20]
};
__S.key_pos['2344'] = {
  'm1': [0x19, 0x5a], 'm2': [0x138, 0x76], 'm3': [0x168, 0x5a],
  'm4': [0x139, 0xad], 'm5': [0x22, 0xe6], 'm6': [0x24, 0xb8],
  'm7': [0x13b, 0x12e], 'wheel-line-container': [0x138, 0x44],
  'wheel-down': [0x50, 0x20], 'wheel-up': [0x145, 0x20]
};
__S.key_pos['2349'] = {
  'm1': [0x1e, 0x5a], 'm2': [0x13b, 0x7a], 'm3': [0x16d, 0x5a],
  'm4': [0x139, 0xb4], 'm5': [0x1a, 0xe6], 'm6': [0x1e, 0xb8],
  'm7': [0x13b, 0x12e], 'wheel-line-container': [0x139, 0x44],
  'wheel-down': [0x50, 0x20], 'wheel-up': [0x145, 0x20]
};
__S.key_pos['234a'] = {
  'm1': [0x1e, 0x5a], 'm2': [0x138, 0x7a], 'm3': [0x16d, 0x5a],
  'm4': [0x139, 0xb4], 'm5': [0x1c, 0xe6], 'm6': [0x22, 0xb8],
  'm7': [0x13b, 0x12e], 'wheel-line-container': [0x138, 0x44],
  'wheel-down': [0x50, 0x20], 'wheel-up': [0x145, 0x20]
};
__S.key_pos['2352'] = {
  'm1': [0x1e, 0x5a], 'm2': [0x13b, 0x7a], 'm3': [0x16d, 0x5a],
  'm4': [0x139, 0xb4], 'm5': [0x1a, 0xe6], 'm6': [0x1e, 0xb8],
  'm7': [0x13b, 0x12e], 'wheel-line-container': [0x139, 0x44],
  'wheel-down': [0x50, 0x20], 'wheel-up': [0x145, 0x20]
};

__S.NUMBERS = [" â“¿", " âž€", " âž", " âž‚", " âžƒ"];
__S.need_save = false;
__S.window_focused = true;
var themeColorEl = document.getElementById("current-usb-client-firmware-new");
export const theme_color = themeColorEl ? themeColorEl.style.color : '#16B777';
__S.theme_color = theme_color;
__S.kbd_key_infos = [];
__S.kbd_key_matrix_index = -1;
__S.kbd_key_setting_index = -1;
__S.kbd_layer_id = 0;
__S.kbd_select_keyId = 0;
__S.kbd_light_mode = [];
__S.kbd_sleep_time = [];
__S.kbd_axis_infos = [];
__S.kbd_edit_info = {};
__S.kbd_select_elementId = '';
__S.kbd_socd_infos = [];
__S.kbd_mt_infos = [];
__S.kbd_rs_infos = [];
__S.kbd_dks_infos = [];
__S.kbd_dks_dragging_name = '';
__S.kbd_dks_dragging = false;
__S.kbd_dks_dragging_up = false;
__S.kbd_dks_Start_x = 0;
__S.kbd_matrix_select_keys = [];
__S.select_key_panel_id = undefined;
__S.kbd_key_num = 0;
__S.kbd_keys = [];
__S.kbd_macro_infos = [];
__S.kbd_macro_select_index = -1;

export function request_device_cfg() {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function (this: XMLHttpRequest) {
    if (this.readyState == 4 && this.status == 0xc8) {
      try {
        __S.device_cfg = JSON.parse(this.responseText);
        reset_device_cfg(__S.device_cfg);
        if (current_usb_client != undefined) {
          layui.table.reloadData('key-shortcuts', {
            'data': get_shortcuts(current_usb_client)
          });
        }
      } catch (err) {
        log_r(err);
      }
      if (navigator.hid != undefined) {
        window.postMessage({ 'action': ACTION_REFRESH_CLIENT_LIST });
        window.postMessage({ 'action': ACTION_UI_REFRESH_CURRENT_CLIENT });
      }
    }
  };
  var offset = 0;
  var layui2 = (layui.data as (key: string) => Record<string, string>)("lang").name;
  if (layui2 == "zh_CN") {
    offset = LANG_ZH_CN;
  } else if (layui2 == "en_US") {
    offset = LANG_EN_US;
  } else if (layui2 == 'zh_TW') {
    offset = LANG_ZH_TW;
  } else if (layui2 == "ko_KR") {
    offset = LANG_KO_KR;
  } else if (layui2 == "ja_JP") {
    offset = LANG_JA_JP;
  } else if (layui2 == "uk_UA") {
    offset = LANG_UK_UA;
  } else if (layui2 == 'tr_TR') {
    offset = LANG_TR_TR;
  }
  xhr.open("GET", "https://www.miracletek.net/game/device.php" + basic_info(0) + "&lang=" + offset, true);
  xhr.send();
}

export function apply_theme() {
  var layui2 = (layui.data as (key: string) => Record<string, string>)('theme').style;
  if (layui2 == "undefined" || layui2 == '' || layui2 == null || layui2 == "dark") {
    document.getElementById('layui_theme_css')!.setAttribute("href", "https://hub.miracletek.net/hub/layui/css/layui-theme-dark.css");
    $('[class=layui-setting-section-light]').each(function (this: Element) {
      $(this)[0].className = "layui-setting-section";
    });
    $("[class=layui-setting-light-define-section-light]").each(function (this: Element) {
      $(this)[0].className = "layui-setting-light-define-section";
    });
    $("[class=layui-setting-light-define-section-arrow-light]").each(function (this: Element) {
      $(this)[0].className = "layui-setting-light-define-section-arrow";
    });
    $("[class=layui-current-name-light]").each(function (this: Element) {
      $(this)[0].className = 'layui-current-name';
    });
    $("[class*=layui-outline-light]").each(function (this: Element) {
      $(this)[0].className = $(this)[0].className.replace("layui-outline-light", 'layui-outline');
    });
    $('[class*=footer-light]').each(function (this: Element) {
      $(this)[0].className = $(this)[0].className.replace('footer-light', 'footer');
    });
    (document.getElementById("logo") as HTMLImageElement).src = "https://hub.miracletek.net/hub/img/rawm_hub.png?v=202412080015";
  } else {
    document.getElementById("layui_theme_css")!.removeAttribute("href");
    $("[class=layui-setting-section]").each(function (this: Element) {
      $(this)[0].className = "layui-setting-section-light";
    });
    $('[class=layui-setting-light-define-section]').each(function (this: Element) {
      $(this)[0].className = "layui-setting-light-define-section-light";
    });
    $("[class=layui-setting-light-define-section-arrow]").each(function (this: Element) {
      $(this)[0].className = "layui-setting-light-define-section-arrow-light";
    });
    $("[class=layui-current-name]").each(function (this: Element) {
      $(this)[0].className = "layui-current-name-light";
    });
    $('[class*=layui-outline]').each(function (this: Element) {
      $(this)[0].className = $(this)[0].className.replace("layui-outline", "layui-outline-light");
    });
    $("[class*=footer]").each(function (this: Element) {
      $(this)[0].className = $(this)[0].className.replace("footer", "footer-light");
    });
    (document.getElementById("logo") as HTMLImageElement).src = 'https://hub.miracletek.net/hub/img/rawm_hub_light.png?v=202412080015';
  }
}

export function is_dark_theme() {
  var layui2 = (layui.data as (key: string) => Record<string, string>)('theme').style;
  return !!(layui2 == "undefined" || layui2 == '' || layui2 == null || layui2 == 'dark');
}

export var S: Record<string, any> = {};
Object.keys(__S).forEach(function(name) {
  Object.defineProperty(S, name, {
    get() { return __S[name]; },
    set(v) { __S[name] = v; },
    configurable: true
  });
});
