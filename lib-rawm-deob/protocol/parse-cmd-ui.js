// ===== HID PARSE COMMAND + UI LAYER ==========================================
// parse_cmd dispatches to hidHandlers (hid-parser.js) for response handling.
// Transport-layer functions (recv, device_receive_data) are in hid-transport.js.

// ===== HID PARSE COMMAND (THIN DISPATCH) =====================================
function parse_cmd(client) {
  var i;
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

// ===== BYTE INDEX SEARCH =====================================================
function bytes_index_of(byteLen, index) {
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

// ===== GLOBAL STATE ==========================================================
// UI state variables, key positions, and configuration data.

function log_r(msg) {}
let current_usb_receiver;
let device_cfg = [];
let pair_panel_id = -1;
let not_support_id = -1;
let connect_panel_id = -1;
let editing = false;
let loading_id = -1;
let tips_panel_id = -1;
let cpi_level_editing = false;
let cpi_level_index = -1;
let cpi_level_light = 0;
let mouse_keys = [];
let mouse_key_labels = [];
let setting_mapping_keys = [];
let select_key_name = '';
let key_record_panel_id = undefined;
let onboard_config_index = 0;
let onboard_index = 0;
let onboard_configs = [];
let onboard_status = [];
let onboard_keys = [];
let mouse_functions = [];
let mouse_function_descs = [];
let macro_trigger_types = [];
let macro_counts = [];
let macro_trigger_type_index = 0;
let edit_macros = [];
let current_edit_macro = [];
let macro_edit_panel_id = undefined;
let macro_record_panel_id = undefined;
let macro_edit_index = -1;
let macro_keep_time_min = 0;
let combination_key_index = 0;
let setting_mapping_key_recording = false;
let setting_mapping_keys_recorded = [-1, -1, -1];
let setting_macro_edit_recording = false;
let setting_macro_edit_recording_time = -1;
let wireless_optimizing = false;
let resize_timer_id;
let remote_buf_free_size = 0;
let NOTIFY_DATA_BUF_SIZE = 512;

let key_pos = {
  '2329': {
    'm1': [0x1e, 0x5a], 'm2': [0x13b, 0x7a], 'm3': [0x16d, 0x5a],
    'm4': [0x13b, 0xbe], 'm5': [0x1e, 0xe1], 'm6': [0x1e, 0xb4],
    'm7': [0x13b, 0x12e], 'wheel-line-container': [0x13b, 0x44],
    'wheel-down': [0x50, 0x20], 'wheel-up': [0x145, 0x20]
  },
  '232c': {
    'm1': [0x1e, 0x5a], 'm2': [0x13b, 0x7a], 'm3': [0x16d, 0x5a],
    'm4': [0x139, 0xb5], 'm5': [0x1a, 0xde], 'm6': [0x1e, 0xaf],
    'm7': [0x13b, 0x12e], 'wheel-line-container': [0x13b, 0x44],
    'wheel-down': [0x50, 0x20], 'wheel-up': [0x145, 0x20]
  },
  '232d': {
    'm1': [0x1e, 0x5a], 'm2': [0x13b, 0x7a], 'm3': [0x16d, 0x5a],
    'm4': [0x13b, 0xbe], 'm5': [0x1e, 0xf0], 'm6': [0x1e, 0xb4],
    'm7': [0x13b, 0x12e], 'wheel-line-container': [0x13b, 0x44],
    'wheel-down': [0x50, 0x20], 'wheel-up': [0x145, 0x20]
  },
  '232f': {
    'm1': [0x1e, 0x5a], 'm2': [0x13b, 0x7a], 'm3': [0x16d, 0x5a],
    'm4': [0x13b, 0xbe], 'm5': [0x1e, 0xe1], 'm6': [0x1e, 0xb4],
    'm7': [0x13b, 0x12e], 'wheel-line-container': [0x13b, 0x44],
    'wheel-down': [0x50, 0x20], 'wheel-up': [0x145, 0x20]
  },
  '2330': {
    'm1': [0x1e, 0x5a], 'm2': [0x13b, 0x7a], 'm3': [0x16d, 0x5a],
    'm4': [0x13b, 0xbe], 'm5': [0x1e, 0xe1], 'm6': [0x1e, 0xb4],
    'm7': [0x13b, 0x12e], 'wheel-line-container': [0x13b, 0x44],
    'wheel-down': [0x50, 0x20], 'wheel-up': [0x145, 0x20]
  },
  '2331': {
    'm1': [0x1e, 0x5a], 'm2': [0x13b, 0x7a], 'm3': [0x16d, 0x5a],
    'm4': [0x13b, 0xbe], 'm5': [0x1e, 0xe1], 'm6': [0x1e, 0xb4],
    'm7': [0x13b, 0x12e], 'wheel-line-container': [0x13b, 0x44],
    'wheel-down': [0x50, 0x20], 'wheel-up': [0x145, 0x20]
  },
  '232e': {
    'm1': [0x1e, 0x5a], 'm2': [0x13b, 0x7a], 'm3': [0x16d, 0x5a],
    'm4': [0x139, 0xb4], 'm5': [0x1a, 0xea], 'm6': [0x1e, 0xb8],
    'm7': [0x13b, 0x12e], 'wheel-line-container': [0x13b, 0x44],
    'wheel-down': [0x50, 0x20], 'wheel-up': [0x145, 0x20]
  },
  '2332': {
    'm1': [0x1e, 0x5a], 'm2': [0x13b, 0x7a], 'm3': [0x16d, 0x5a],
    'm4': [0x139, 0xb4], 'm5': [0x1a, 0xea], 'm6': [0x1e, 0xb8],
    'm7': [0x13b, 0x12e], 'wheel-line-container': [0x13b, 0x44],
    'wheel-down': [0x50, 0x20], 'wheel-up': [0x145, 0x20]
  },
  '2333': {
    'm1': [0x1e, 0x5a], 'm2': [0x13b, 0x7a], 'm3': [0x16d, 0x5a],
    'm4': [0x139, 0xb4], 'm5': [0x1a, 0xe6], 'm6': [0x1e, 0xb8],
    'm7': [0x13b, 0x12e], 'wheel-line-container': [0x139, 0x44],
    'wheel-down': [0x50, 0x20], 'wheel-up': [0x145, 0x20]
  },
  '2334': {
    'm1': [0x1e, 0x5a], 'm2': [0x13b, 0x7a], 'm3': [0x16d, 0x5a],
    'm4': [0x139, 0xb4], 'm5': [0x1a, 0xe6], 'm6': [0x1e, 0xb8],
    'm7': [0x13b, 0x12e], 'wheel-line-container': [0x139, 0x44],
    'wheel-down': [0x50, 0x20], 'wheel-up': [0x145, 0x20]
  },
  '2337': {
    'm1': [0x1e, 0x5a], 'm2': [0x13b, 0x7a], 'm3': [0x16d, 0x5a],
    'm4': [0x139, 0xb4], 'm5': [0x1a, 0xe6], 'm6': [0x1e, 0xb8],
    'm7': [0x13b, 0x12e], 'wheel-line-container': [0x139, 0x44],
    'wheel-down': [0x50, 0x20], 'wheel-up': [0x145, 0x20]
  },
  '2338': {
    'm1': [0x19, 0x5a], 'm2': [0x136, 0x7a], 'm3': [0x168, 0x5a],
    'm4': [0x139, 0xb4], 'm5': [0x22, 0xe6], 'm6': [0x24, 0xb8],
    'm7': [0x13b, 0x12e], 'wheel-line-container': [0x136, 0x44],
    'wheel-down': [0x50, 0x20], 'wheel-up': [0x145, 0x20]
  },
  '2339': {
    'm1': [0x19, 0x5a], 'm2': [0x136, 0x7a], 'm3': [0x168, 0x5a],
    'm4': [0x139, 0xb4], 'm5': [0x22, 0xe6], 'm6': [0x24, 0xb8],
    'm7': [0x13b, 0x12e], 'wheel-line-container': [0x136, 0x44],
    'wheel-down': [0x50, 0x20], 'wheel-up': [0x145, 0x20]
  },
  '233a': {
    'm1': [0x19, 0x5a], 'm2': [0x138, 0x76], 'm3': [0x168, 0x5a],
    'm4': [0x139, 0xad], 'm5': [0x22, 0xe6], 'm6': [0x24, 0xb8],
    'm7': [0x13b, 0x12e], 'wheel-line-container': [0x138, 0x44],
    'wheel-down': [0x50, 0x20], 'wheel-up': [0x145, 0x20]
  },
  '233e': {
    'm1': [0x1e, 0x5a], 'm2': [0x13b, 0x7a], 'm3': [0x16d, 0x5a],
    'm4': [0x139, 0xb4], 'm5': [0x1a, 0xea], 'm6': [0x1e, 0xb8],
    'm7': [0x13b, 0x12e], 'wheel-line-container': [0x13b, 0x44],
    'wheel-down': [0x50, 0x20], 'wheel-up': [0x145, 0x20]
  },
  '233f': {
    'm1': [0x19, 0x5a], 'm2': [0x136, 0x7a], 'm3': [0x168, 0x5a],
    'm4': [0x139, 0xb4], 'm5': [0x22, 0xe6], 'm6': [0x24, 0xb8],
    'm7': [0x13b, 0x12e], 'wheel-line-container': [0x136, 0x44],
    'wheel-down': [0x50, 0x20], 'wheel-up': [0x145, 0x20]
  },
  '2340': {
    'm1': [0x1e, 0x5a], 'm2': [0x13b, 0x7a], 'm3': [0x16d, 0x5a],
    'm4': [0x13b, 0xbe], 'm5': [0x1e, 0xf0], 'm6': [0x1e, 0xb4],
    'm7': [0x13b, 0x12e], 'wheel-line-container': [0x13b, 0x44],
    'wheel-down': [0x50, 0x20], 'wheel-up': [0x145, 0x20]
  },
  '2343': {
    'm1': [0x19, 0x5a], 'm2': [0x138, 0x76], 'm3': [0x168, 0x5a],
    'm4': [0x139, 0xad], 'm5': [0x22, 0xe6], 'm6': [0x24, 0xb8],
    'm7': [0x13b, 0x12e], 'wheel-line-container': [0x138, 0x44],
    'wheel-down': [0x50, 0x20], 'wheel-up': [0x145, 0x20]
  },
  '2344': {
    'm1': [0x19, 0x5a], 'm2': [0x138, 0x76], 'm3': [0x168, 0x5a],
    'm4': [0x139, 0xad], 'm5': [0x22, 0xe6], 'm6': [0x24, 0xb8],
    'm7': [0x13b, 0x12e], 'wheel-line-container': [0x138, 0x44],
    'wheel-down': [0x50, 0x20], 'wheel-up': [0x145, 0x20]
  },
  '2349': {
    'm1': [0x1e, 0x5a], 'm2': [0x13b, 0x7a], 'm3': [0x16d, 0x5a],
    'm4': [0x139, 0xb4], 'm5': [0x1a, 0xe6], 'm6': [0x1e, 0xb8],
    'm7': [0x13b, 0x12e], 'wheel-line-container': [0x139, 0x44],
    'wheel-down': [0x50, 0x20], 'wheel-up': [0x145, 0x20]
  },
  '234a': {
    'm1': [0x1e, 0x5a], 'm2': [0x138, 0x7a], 'm3': [0x16d, 0x5a],
    'm4': [0x139, 0xb4], 'm5': [0x1c, 0xe6], 'm6': [0x22, 0xb8],
    'm7': [0x13b, 0x12e], 'wheel-line-container': [0x138, 0x44],
    'wheel-down': [0x50, 0x20], 'wheel-up': [0x145, 0x20]
  },
  '2352': {
    'm1': [0x1e, 0x5a], 'm2': [0x13b, 0x7a], 'm3': [0x16d, 0x5a],
    'm4': [0x139, 0xb4], 'm5': [0x1a, 0xe6], 'm6': [0x1e, 0xb8],
    'm7': [0x13b, 0x12e], 'wheel-line-container': [0x139, 0x44],
    'wheel-down': [0x50, 0x20], 'wheel-up': [0x145, 0x20]
  }
};

let NUMBERS = [" â“¿", " âž€", " âž", " âž‚", " âžƒ"];
let need_save = false;
let window_focused = true;
const theme_color = document.getElementById("current-usb-client-firmware-new").style.color;
let kbd_key_infos = [];
let kbd_key_matrix_index = -1;
let kbd_key_setting_index = -1;
let kbd_layer_id = 0;
let kbd_select_keyId = 0;
let kbd_light_mode = [];
let kbd_sleep_time = [];
let kbd_axis_infos = [];
let kbd_edit_info = {};
let kbd_select_elementId = '';
let kbd_socd_infos = [];
let kbd_mt_infos = [];
let kbd_rs_infos = [];
let kbd_dks_infos = [];
let kbd_dks_dragging_name = '';
let kbd_dks_dragging = false;
let kbd_dks_dragging_up = false;
let kbd_dks_Start_x = 0;
let kbd_matrix_select_keys = [];
let select_key_panel_id = undefined;
let kbd_key_num = 0;
let kbd_keys = [];
let kbd_macro_infos = [];
let kbd_macro_select_index = -1;

// ===== UI LAYER ==============================================================

function request_device_cfg() {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 0xc8) {
      try {
        device_cfg = JSON.parse(this.responseText);
        reset_device_cfg(device_cfg);
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
  var layui2 = layui.data("lang").name;
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

function apply_theme() {
  var layui2 = layui.data('theme').style;
  if (layui2 == "undefined" || layui2 == '' || layui2 == null || layui2 == "dark") {
    document.getElementById('layui_theme_css').setAttribute("href", "https://hub.miracletek.net/hub/layui/css/layui-theme-dark.css");
    $('[class=layui-setting-section-light]').each(function () {
      $(this)[0].className = "layui-setting-section";
    });
    $("[class=layui-setting-light-define-section-light]").each(function () {
      $(this)[0].className = "layui-setting-light-define-section";
    });
    $("[class=layui-setting-light-define-section-arrow-light]").each(function () {
      $(this)[0].className = "layui-setting-light-define-section-arrow";
    });
    $("[class=layui-current-name-light]").each(function () {
      $(this)[0].className = 'layui-current-name';
    });
    $("[class*=layui-outline-light]").each(function () {
      $(this)[0].className = $(this)[0].className.replace("layui-outline-light", 'layui-outline');
    });
    $('[class*=footer-light]').each(function () {
      $(this)[0].className = $(this)[0].className.replace('footer-light', 'footer');
    });
    document.getElementById("logo").src = "https://hub.miracletek.net/hub/img/rawm_hub.png?v=202412080015";
  } else {
    document.getElementById("layui_theme_css").removeAttribute("href");
    $("[class=layui-setting-section]").each(function () {
      $(this)[0].className = "layui-setting-section-light";
    });
    $('[class=layui-setting-light-define-section]').each(function () {
      $(this)[0].className = "layui-setting-light-define-section-light";
    });
    $("[class=layui-setting-light-define-section-arrow]").each(function () {
      $(this)[0].className = "layui-setting-light-define-section-arrow-light";
    });
    $("[class=layui-current-name]").each(function () {
      $(this)[0].className = "layui-current-name-light";
    });
    $('[class*=layui-outline]').each(function () {
      $(this)[0].className = $(this)[0].className.replace("layui-outline", "layui-outline-light");
    });
    $("[class*=footer]").each(function () {
      $(this)[0].className = $(this)[0].className.replace("footer", "footer-light");
    });
    document.getElementById("logo").src = 'https://hub.miracletek.net/hub/img/rawm_hub_light.png?v=202412080015';
  }
}

function is_dark_theme() {
  var layui2 = layui.data('theme').style;
  return !!(layui2 == "undefined" || layui2 == '' || layui2 == null || layui2 == 'dark');
}
