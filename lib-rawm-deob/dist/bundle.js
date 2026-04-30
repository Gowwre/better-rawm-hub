// ===== data/constants.js ====================================================
// =============================================================================
// Named Constants — replaces all magic hex numbers across lib-rawm-deob
// =============================================================================
// Loaded before all other modules. Every magic number should be a named
// constant here so that code is self-documenting and grep‑able.
// =============================================================================

// ===== HS PROTOCOL — Keyboard Command IDs ====================================
const CMD_FIRMWARE_VERSION   = 0xf5;
const CMD_GET_KEYCODE_BUF    = 0x12;
const CMD_SET_KEYCODE        = 0x5;
const CMD_GET_LIGHT          = 0x8;
const CMD_SET_LIGHT          = 0x7;
const CMD_GET_LIGHT_DEFINE_BUF  = 0x36;
const CMD_SET_LIGHT_DEFINE      = 0x37;
const CMD_GET_AXIS_INFO      = 0x1a;
const CMD_SET_AXIS_INFO      = 0x19;
const CMD_GET_ONBOARD_INDEX  = 0x39;
const CMD_SET_ONBOARD_INDEX  = 0x40;
const CMD_GET_LIGHT_BOX      = 0x50;
const CMD_SET_LIGHT_BOX      = 0x51;
const CMD_GET_LIGHT_SLEEP    = 0x52;
const CMD_SET_LIGHT_SLEEP    = 0x53;
const CMD_GET_AXIS_MODE      = 0x45;
const CMD_SET_AXIS_MODE      = 0x46;
const CMD_CUSTOM_DATA_SAVE   = 0x41;
const CMD_KEYCODE_FACTORY_RESET = 0x6;
const CMD_HS_FACTORY_RESET   = 0xa;

const CMD_SOCD_GET_NUM       = 0x1e;
const CMD_SOCD_SET_NUM       = 0x1f;
const CMD_SOCD_GET_DATA      = 0x20;
const CMD_SOCD_SET_DATA      = 0x21;
const CMD_MT_GET_NUM         = 0x22;
const CMD_MT_SET_NUM         = 0x23;
const CMD_MT_GET_DATA        = 0x24;
const CMD_MT_SET_DATA        = 0x25;
const CMD_RS_GET_NUM         = 0x2e;
const CMD_RS_SET_NUM         = 0x2f;
const CMD_RS_GET_DATA        = 0x30;
const CMD_RS_SET_DATA        = 0x31;
const CMD_DKS_GET_NUM        = 0x2a;
const CMD_DKS_SET_NUM        = 0x2b;
const CMD_DKS_GET_DATA       = 0x2c;
const CMD_DKS_SET_DATA       = 0x2d;
const CMD_MACRO_GET          = 0xe;
const CMD_MACRO_SET          = 0xf;
const CMD_MACRO_NUM          = 0xc;
const CMD_MACRO_SIZE         = 0xd;
const CMD_MACRO_RESET        = 0x10;

// ===== HS PROTOCOL — Light Sub-parameter IDs ==================================
const LIGHT_PARAM_BRIGHTNESS = 0x1;
const LIGHT_PARAM_MODE       = 0x2;
const LIGHT_PARAM_SPEED      = 0x3;
const LIGHT_PARAM_HUE_SAT    = 0x4;
const LIGHT_PARAM_BOX_MODE   = 0x5;

// ===== HS SYNC — Bitmask Flags ================================================
const SYNC_FLAG_KEYCODE      = 0x1;
const SYNC_FLAG_LIGHT        = 0x2;
const SYNC_FLAG_AXIS         = 0x4;
const SYNC_FLAG_ADVANCED     = 0x8;

// ===== HID PROTOCOL — Action & Config Command IDs =============================
const HID_QUERY              = 0x1;
const HID_PARAM_CMD          = 0x3;
const HID_ACTION_CMD         = 0x6;
const HID_SYNC_CMD           = 0x7;
const HID_PING_CMD           = 0xe;

const HID_ACTION_MOUSE_PARAM       = 0x15;
const HID_ACTION_MOUSE_KEY         = 0x16;
const HID_ACTION_MOUSE_FUNCTION    = 0x18;
const HID_ACTION_SET_ESB_ADDR      = 0x1c;
const HID_ACTION_CLEAR_ESB_ADDR    = 0x1d;
const HID_ACTION_SELECT_ESB_ADDR   = 0x1e;
const HID_ACTION_SET_COLOR_CODE    = 0x1f;
const HID_ACTION_SET_SLEEP_TIME    = 0x21;
const HID_ACTION_SET_RF_CHANNEL    = 0x23;
const HID_ACTION_GAMING_ONLY       = 0x27;
const HID_ACTION_SET_BRIGHTNESS    = 0x31;
const HID_ACTION_SET_AUTO_HOP      = 0x32;
const HID_ACTION_MACRO_FIRST       = 0x5;
const HID_ACTION_MACRO_CONT         = 0x2b;

// ===== HID PROTOCOL — Action Command Values (for send_event_action) ===========
const CMD_VIRTUAL_CHILD_POLL = 0x42;
const CMD_DEVICE_REBOOT      = 0x33;
const CMD_FACTORY_RESET      = 0x35;
const CMD_CONFIG_RESET       = 0x3;
const CMD_QUERY_MORE_RESULT  = 0x34;

// ===== HID PROTOCOL — Response Types (parse_cmd outer switch) =================
const RESP_DEVICE_INFO_JSON  = 0x2;
const RESP_SYNC              = 0x7;
const RESP_PARAMETER         = 0xb;
const RESP_PING              = 0xe;

// ===== HID PROTOCOL — Parameter Subtypes (parse_cmd inner switch for 0xb) =====
const PARAM_RESOLUTION       = 0x0;
const PARAM_POLLING_RATE     = 0x1;
const PARAM_POWER_MODE       = 0x5;
const PARAM_RESOLUTION_32BIT = 0x6;
const PARAM_LOD              = 0x7;
const PARAM_KEY_DELAY        = 0x8;
const PARAM_KEY_DELAY_NOOP   = 0x9;
const PARAM_ESB_DEVICE_INFO  = 0xc;
const PARAM_MOTION_SYNC      = 0xd;
const PARAM_ANGLE_TUNING     = 0xe;
const PARAM_ANGLE_SNAPPING   = 0xf;
const PARAM_RIPPLE_CONTROL   = 0x10;
const PARAM_2_4G_SCORES      = 0x13;
const PARAM_KEY_DELAY_ENTRY  = 0x14;
const PARAM_PEER_INFO        = 0x15;
const PARAM_BATTERY_LEVELS   = 0x16;
const PARAM_BATTERY_PERCENT  = 0x17;
const PARAM_COLOR_CODE       = 0x19;
const PARAM_SLEEP_TIME       = 0x1a;
const PARAM_RSSI             = 0x1c;
const PARAM_LUA_STATUS       = 0x1d;
const PARAM_PARAM_1e         = 0x1e;
const PARAM_PARAM_1f         = 0x1f;
const PARAM_NOACK            = 0x20;
const PARAM_GLASS_MODE       = 0x21;
const PARAM_ONBOARD_INDEX    = 0x22;
const PARAM_ONBOARD_STATUS   = 0x23;

// ===== BUFFER / SIZE CONSTANTS ================================================
const HS_FRAME_SIZE          = 0x20;
const HS_CHUNK_MAX           = 0x1c;
const HID_REPORT_SIZE        = 0x40;
const HID_LENGTH_MASK        = 0x3f;
const ESB_ALIVE_TIMEOUT_MS   = 0xbb8;
const SYNC_TIMEOUT_MS        = 0x3e8;
const CONFIG_TIMEOUT_MS      = 0x7d0;
const CHANNEL_SET_DELAY_MS   = 0x5dc;
const REBOOT_DELAY_MS        = 0x1f4;
const RESIZE_DEBOUNCE_MS     = 0xfa;
const MACRO_KEEP_TIME_MAX_MS = 0xea60;
const MACRO_KEEP_TIME_STEP   = 0x1f4;
const HID_SEND_DEBOUNCE_MS   = 0x19;
const POLLING_RATE_MAX_HZ    = 0x1f40;
const POLLING_RATE_MIN_HZ    = 0x7d;
const CPI_STEP_DEFAULT       = 0x1;
const CPI_XY_MASK            = 0xffff0000;
const CPI_LOW_MASK           = 0xffff;
const BATTERY_FULL_PERCENT   = 0x64;
const BRIGHTNESS_DEFAULT     = 0x80;
const SLEEP_DEFAULT_SEC      = 0x3c;
const SLEEP_MAX_SEC          = 0x708;
const RESOLUTION_DEFAULT     = 0x640;
const API_VERSION            = 0x9;

// ===== PRODUCT IDs ============================================================
const PID_KNIFE    = 0x2328;
const PID_ML01     = 0x2329;
const PID_RECEIVER = 0x232a;
const PID_RECEIVER_8K = 0x232b;
const PID_MH01     = 0x232c;
const PID_SL01     = 0x232d;
const PID_SH01     = 0x232e;
const PID_GS_SH01  = 0x232f;
const PID_ER21     = 0x2330;
const PID_ES21     = 0x2331;
const PID_ES21PRO  = 0x2332;
const PID_ER21M    = 0x2334;
const PID_ER21PRO  = 0x2335;
const PID_ER21PRO_B = 0x2336;
const PID_ES21M    = 0x2337;
const PID_MH01PRO  = 0x2338;
const PID_SH01PRO  = 0x2339;
const PID_233a     = 0x233a;
const PID_233e     = 0x233e;
const PID_233f     = 0x233f;
const PID_2340     = 0x2340;
const PID_2343     = 0x2343;
const PID_2344     = 0x2344;
const PID_2349     = 0x2349;
const PID_234a     = 0x234a;
const PID_2352     = 0x2352;

// ===== KEY CODE / MOUSE EVENT CONSTANTS =======================================
const MOUSE_EVENT_KEY_DOWN   = 0x100;
const MOUSE_EVENT_KEY_UP     = 0x101;
const MOUSE_EVENT_MOVE       = 0x200;
const MOUSE_EVENT_WHEEL_VERT = 0x20a;
const MOUSE_EVENT_WHEEL_HORZ = 0x20e;
const MOUSE_EVENT_POSITION   = 0x2ff;
const MOUSE_WHEEL_UP         = 0x400;
const MOUSE_WHEEL_DOWN       = 0x401;
const MOUSE_WHEEL_LEFT       = 0x402;
const MOUSE_WHEEL_RIGHT      = 0x403;
const MOUSE_MOVE_CODE        = 0x404;
const MOUSE_POSITION_CODE    = 0x405;

const KEYCODE_EXT_THRESHOLD  = 0xff;
const KEYCODE_MEDIA_START    = 0x200;

const SCAN_CODE_CTRL         = 0xa2;
const SCAN_CODE_ALT          = 0xa4;
const SCAN_CODE_SHIFT        = 0xa0;
const SCAN_CODE_WIN          = 0x5b;
const VK_CODE_CTRL           = 0x11;
const VK_CODE_ALT            = 0x12;
const VK_CODE_SHIFT          = 0x10;

const KEY_WHEEL_UP_ID        = 0x7;
const KEY_WHEEL_DOWN_ID      = 0x8;

// ===== MACRO STYLE / TRIGGER CONSTANTS ========================================
const MACRO_STYLE_PRESS      = 0x0;
const MACRO_STYLE_RELEASE    = 0x1;
const MACRO_STYLE_TOGGLE     = 0x2;
const MACRO_STYLE_LONG_PRESS = 0x3;
const MACRO_STYLE_LONG_TOGGLE = 0x4;
const MACRO_STYLE_LONG_RELEASE = 0x5;
const MACRO_STYLE_TOGGLE_LOOP = 0x6;
const MACRO_RECORD_STYLE     = 0x16;

const MACRO_CHUNK_SIZE       = 0x38;
const MACRO_CHUNK_LIMIT      = 0x5;

// ===== TOUCH STYLE CONSTANTS ==================================================
const TOUCH_STYLE_KEY_MAP    = 0x1b;
const TOUCH_STYLE_FUNC_MAP   = 0x1d;

// ===== MOUSE FUNCTION IDs =====================================================
const FUNC_NONE              = 0x0;
const FUNC_TOGGLE_CPI        = 0x1;
const FUNC_NEXT_CPI          = 0x2;
const FUNC_PREV_CPI          = 0x3;
const FUNC_TOGGLE_ASSIST     = 0x4;
const FUNC_NEXT_ASSIST       = 0x5;
const FUNC_PREV_ASSIST       = 0x6;
const FUNC_PRESS_CPI         = 0x9;
const FUNC_ADD_CPI           = 0xa;
const FUNC_PLUS_CPI          = 0xb;
const FUNC_CHOOSE_ASSIST     = 0xc;
const FUNC_TOGGLE_ESB        = 0xd;
const FUNC_SHOW_POWER        = 0xe;
const FUNC_TOGGLE_BLE        = 0xf;
const FUNC_SHELL_CMD         = 0x10;
const FUNC_TOGGLE_ONBOARD    = 0x11;
const FUNC_NEXT_ONBOARD      = 0x12;
const FUNC_PREV_ONBOARD      = 0x13;
const FUNC_TOGGLE_MINI_HUB   = 0x15;
const FUNC_TOGGLE_WORK_MODE  = 0x16;

// ===== CONFIG TYPE CONSTANTS ==================================================
const CONFIG_TYPE_KEY        = 0x0;
const CONFIG_TYPE_MACRO      = 0x5;

// ===== LIGHT MODE CONSTANTS (Keyboard) ========================================
const LIGHT_MODE_CLOSE       = 0x0;
const LIGHT_MODE_CUSTOM      = 0x1c;
const LIGHT_MODE_CUSTOM_2    = 0x1d;
const LIGHT_MODE_CUSTOM_3    = 0x1e;
const LIGHT_MODE_KEY_DEFINE  = 0x2d;

// ===== LIGHT BOX MODE CONSTANTS ===============================================
const BOX_MODE_CLOSE         = 0x0;
const BOX_MODE_1             = 0x1;
const BOX_MODE_2             = 0x2;
const BOX_MODE_3             = 0x3;
const BOX_MODE_4             = 0x4;

// ===== LANGUAGE / LOCALE CONSTANTS ============================================
const LANG_ZH_CN             = 0x0;
const LANG_EN_US             = 0x1;
const LANG_ZH_TW             = 0x2;
const LANG_KO_KR             = 0x3;
const LANG_JA_JP             = 0x4;
const LANG_UK_UA             = 0x5;
const LANG_TR_TR             = 0x6;

// ===== BITWISE MASK CONSTANTS =================================================
const MASK_LOW_NIBBLE        = 0xf;
const MASK_HIGH_NIBBLE       = 0xf0;
const MASK_BYTE              = 0xff;
const MASK_HIGH_BIT          = 0x80;
const MASK_LOW_7BITS         = 0x7f;
const MASK_TOP_2BITS         = 0xc0;
const MASK_BOTTOM_6BITS      = 0x3f;
const MASK_12BIT             = 0xf00;

// ===== DEVICE INFO DEFAULT CONSTANTS ==========================================
const KBD_DEFAULT_ONBOARD_NUM   = 0x3;
const POWER_MODE_DEFAULT        = 0x2;
const POWER_MODE_LOWEST         = 0x0;
const POWER_MODE_LOW            = 0x1;
const KEY_DELAY_DEFAULT         = 0x8;
const BATT_LEVEL_COUNT          = 0xb;
const CPI_LEVEL_COUNT           = 0x8;
const CPI_LEVEL_DEFAULTS        = [0x190, 0x320, 0x640, 0xc80, 0x0, 0x0, 0x0, 0x0];
const BATT_LEVEL_DEFAULTS       = [0x1004, 0xfa0, 0xf6e, 0xf3c, 0xf0a, 0xed8, 0xea6, 0xe74, 0xdac, 0xce4, 0xc1c];

// ===== POLLING RATE CONSTANTS ==================================================
const POLLING_RATE_1000HZ       = 0x3e8;
const POWER_MODE_COUNT_LIMIT    = 0x3;


// ===== 01-obfuscation.js ====================================================
// =============================================================================
// Module 01 - Obfuscation Bootstrap & String Decoder
// =============================================================================
// This module must be loaded FIRST. It sets up the string array rotation IIFE
// and the _0x4dcb() decoder that ALL other modules rely on for string literals.
// The KEY_* constants defined here are used throughout the app as standardised
// "alternate name" tokens in key-info objects.
// =============================================================================

const KEY_NONE = "NONE";
const KEY_CTRL = "CTRL";
const KEY_SHIFT = "SHIFT";
const KEY_WINDOWS = "WINDOWS";
const KEY_SPACE = "SPACE";
const KEY_ESC = "ESC";
const KEY_TILDE = "TILDE";
const KEY_TAB = "TAB";
const KEY_SCROLL = "SCROLL";
const KEY_DOWN_ARROW = "DOWNARROW";
const KEY_UP_ARROW = "UPARROW";
const KEY_LEFT_ARROW = "LEFTARROW";
const KEY_SHIFT_R = "SHIFTR";
const KEY_ALT_R = "ALTR";
const KEY_HOME = "HOME";
const KEY_PAGEUP = "PAGEUP";
const KEY_DELETE = "DELETE";
const KEY_END = "END";
const KEY_PAGEDOWN = "PAGEDOWN";
const KEY_NUMLOCK = "NUMLOCK";
const KEY_KPD_STAR = "KPDSTAR";
const KEY_KPD_MINUS = "KPDMINUS";
const KEY_KPD_PLUS = "KPDPLUS";
const KEY_KPD_ENTER = "KPDENTER";
const KEY_KPD_DOT = "KPDDOT";
const KEY_APP = "APP";
const KEY_F10 = "F10";
const KEY_F11 = "F11";
const KEY_F12 = "F12";
const KEY_NUM0 = "NUM0";
const KEY_EQUAL = "EQUAL";
const KEY_LEFT_BRACE = "LEFTBRACE";
const KEY_RIGHT_BRACE = "RIGHTBRACE";
const KEY_VERTICAL_BAR = "VERTICALBAR";
const KEY_COLON = "COLON";
const KEY_QUOTE = "QUOTE";
const KEY_LESS_THAN = "LESSTHAN";
const KEY_GREAT_THAN = "GREATTHAN";
const KEY_WHEEL_UP = "WHEELUP";
const KEY_WHEEL_DOWN = "WHEELDOWN";
const KEY_WHEEL_LEFT = "WHEELLEFT";
const KEY_WHEEL_RIGHT = "WHEELRIGHT";
const KEY_MOUSE_MOVE = "MOUSEMOVE";

function _0x4dcb(_0x3b0e08, _0x525502) {
  _0x3b0e08 = _0x3b0e08 - 0xa4;
  const value = _0x3870();
  let value2 = value[_0x3b0e08];
  return value2;
}
function _0x3870() {
  const _0x2a9411 = ['#wireless-quality', "\" mouse-select-key-action=\"select\" style=\"cursor: pointer;\">", 'hardwareCode', 'KPDMINUS', "Num 2", 'kbd-light-clear', 'STRID_KBD_KEY_MEDIA_NEXT_TRACK', " â—€ *", 'kbd_light_normal.png', 'motionSync', "\" style=\"color: #F00; background-color: #F00\"></div>", 'usb_client_id', 'V12', 'kbd-macro-clear', 'STRID_TITLE_WARNING', 'nav', "<img src=\"", '&ripple_control=', "[name=\"macro-add-select-key\"]", 'pair-action', 'STRID_SETTING_MAPPING_MACRO_TRIGGER_TOGGLE_LOOP_WARNING', 'action', 'Esc', 'opened', '6058314XRUeGX', 'kbd-advance-key-matrix-action', 'product/charging.png', "\" macro-edit-item-action=\"select\" style=\"cursor: pointer;\">", 'hub', "width: 35%;min-width: 300px;vertical-align: top;padding-right: 30px;", 'STRID_KBD_LIGHT_SLEEP_TIME5', '[class=layui-current-name]', '#dpi-input-colors', '#kbd-light-button-container', 'APP', "<input type=\"radio\" name=\"light-color\" value=\"yellow\" lay-skin=\"none\">", '-text', 'cpiLevelColors', '#kbd-setting-socd-container', 'STRID_SETTING_RF_CHANNEL_2_TIPS', ",  <", 'kbd-macro-action', 'REVERSE', 'checkbox(power-saving)', '#dpi-level-input-hint', 'kbd-light-reverse-all', 'polling_rates', '#factory-reset-panel', '#current-usb-client-rssi-icon', '#paired-esb-addr-list', 'KPD0', 'step', 'DOWNARROW', 'IQ_GET_KEYCODE_BUF', '5QpoWyo', 'IQ_GET_BOX_RGB_COLOR', 'STRID_SETTING_MOUSE_ONBOARD_REBOOT_NEEDED', "Num Enter", 'NONE', 'border-right', 'STRID_SETTING_MAPPING_TYPE_KEY', '#mapping-function-show-power-container', 'kbd_macro_num', ".  >", 'NORDIC2', '#setting-mapping-macro-add-panel', '&key_delay=', '#kbd-main-setting-advance-key', 'kbd-axis-matrix-index', '#mapping-key-turbo-up-keep-input', 'https://hub.miracletek.net/hub/', 'fps_style', '#kbd-current-usb-client-panel', 'SA-SH01Pro', 'src', 'split', '#slider-key-up-delay', "Num -", 'SPACE', 'skyblue', '#setting-wireless-turbo-desc2', 'layui-axis-type-hn-omega-container', 'util', 'mouse_auto_click_light', '#macro-add-move-loop-input', " Ctrl", 'sst', '#setting-dpi-levels', 'onboard', 'STRID_KEY_MEDIA_MUTE', 'addr', 'insertRow', 'color', '#setting-polling-rates', 'kbd-rs-key1-action', "<select name=\"onboard-config\" lay-verify=\"required\" lay-filter=\"onboard-config\">", 'setting-mapping-key-wheel-circle', 'keyCode1', '#btn-wireless-optimize', '#292929', 'Scroll', 'indexOf', "<input type=\"radio\" name=\"setting_power_modes\" value=\"", 'STRID_KBD_KEY_MEDIA_PLAY_PAUSE', '#download-panel', 'STRID_SETTING_MAPPING_TYPE_FUNCTION_CHOOSE_ASSIST', '10143067dZMIgb', 'syncing', 'assign', 'kbd-rs-key2-action', 'kbd_more_selected.png', '#logo', "; margin-top: 6px; margin-left:", "<input type=\"radio\" name=\"setting-onboard-color\" value=\"green\" lay-skin=\"none\">", '#slider-brightness', 'randomUUID', '#slider-dpi-x-input-label', '#mapping-macro-edit-container', 'mouse_lock_again_delay', 'mouse_targeted_trigger', 'ERROR', 'dialog-mouse-select-key-action', "<p style=\"color:white;text-align: center;margin-top: 2px;\" >", "<p style=\"text-align: center;margin-top: 2px;\" >", 'input', 'STRID_CLEAR', 'mouse_vision_senstivity', '&c=', 'kbd-key-set', 'rows', 'switch(kbd-axis-quick-tigger-mode)', 'mouse_intensity', 'Z68A', 'msg', "<table class=\"layui-table\">", 'dispatchEvent', 'configNum', 'STRID_KEY_MEDIA_WWW_REFRESH', '#macro-add-select-key-container', 'wireless-optimize-action', 'state1', ";  :", 'top_dz', 'product/mouse_bg-hover.png?v=1)', 'rt_release_lv', 'select(mapping-macro-trigger-key)', 'kbd-dks-key', '</select>', "Page Down", "[name=\"kbd-light-box-mode\"]", '#macro-add-move-delta-y-input', '#paired-ble-addr-list', '#kbd-dks-arrow', 'V13', '#kbd-key-desc1', 'STRID_SETTING_MAPPING_TYPE_FUNCTION_ADD_CPI', 'innerHeight', 'STRID_SETTING_MAPPING_TYPE_FUNCTION_TOGGLE_MINI_HUB', 'hue', 'mapping-macro-less-keep-time-action', 'continue_time', 'select(key-delay-select-key)', 'tab(kbd-main-setting-type)', 'kbd-macro-record-action', 'STRID_SETTING_MOUSE_REBOOT_S', 'checked', 'pick-color', '#mapping-key-turbo-container', '&devRevName=', 'STRID_SETTING_DPI_LEVEL_SPEED_INPUT_XY', '[0,0,1026]', 'hid', "layui-btn layui-key-desc-button-light", 'apc_lv', 'ID-download-panel-rt', 'opacity', 'kbd-rs-key2', 'splice', 'lod_c', '</td>', 'macro-edit-item-index', 'KPD6', 'limit_memory', 'mapping-key-turbo-freq-input', 'kbd-macro-index', 'JOYSTICK', 'onreadystatechange', 'STRID_KBD_LIGHT_SLEEP_TIME3', 'END', 'mac', 'STRID_SETTING_RF_CHANNEL_2', 'action_ui_refresh_current_client', 'KPD3', 'Mute', "\" kbd-select-key-action=\"select\" style=\"cursor: pointer;\">", "<select name=\"mapping-macro-trigger-type\" lay-verify=\"required\" lay-filter=\"mapping-macro-trigger-type\">", 'light-box-color-r-input', '#usb-client-channel', 'kbd-key-default', 'glass_mode', 'getElementById', '#setting-key-delay-down-up', 'kbd_macro_infos', 'STRID_KBD_LIGHT_SLEEP_TIME2', 'STRID_SAVE', '#kbd-light-box-global-speed', 'STRID_KBD_KEY_RGB_SPD', '157px', 'layui-setting-light-define-section', 'state3', 'brightness', 'STRID_SETTING_MAPPING_NOT_SAVE_TO_FDS_S', 'WWWForward', 'code', 'STRID_SETTING_MAPPING_TYPE_FUNCTION_PREVIOUS_ONBOARD', "[name=\"function-shell-cmd\"]", 'appendChild', "/  ?", 'layui-layer-confirm', 'PAGEUP', 'layui-axis-type-jdl-container', "<input type=\"radio\" name=\"setting-onboard-color\" value=\"dark\" lay-skin=\"none\" checked>", "\"kbd-light-matrix-action=\"select\" style=\"cursor: pointer;\">", 'offsetLeft', 'transparent', 'angleTuning', "\" style=\"color: #FF0; background-color: #FF0\"></div>", '1233101gBwKrD', 'STRID_SETTING_RF_CHANNEL_40', 'STRID_KEY_MOUSE_POSITION', "=  +", 'pc-rawmhub.game', 'glassMode', 'radio(kbd-socd-type)', 'Command', 'esb_alive_timeout', 'slider', 'STRID_SETTING_MAPPING_TYPE_FUNCTION_NEXT_ASSIST', "<p style=\"color: white;margin-left:4px;\">", 'form', 'slow', 'btm_dz', 'confirm', 'lzSupported', 'STRID_SETTING_CONFIG_CURRENT', 'WINR', 'kbd-socd-key2-action', 'mouse_intensity_toggle_light', 'action_send_client_data', 'KPD4', 'product/battery_yellow.png', "<div id=\"key-color\" style=\"background-color: orange; margin-top: 6px; margin-left:", 'replace', 'chr', 'kbd-dks-clean-action', 'angle_tuning', 'moba_radius', ">>>>>>>>sync success", '0px', "<select name=\"macro-add-select-key\" lay-verify=\"required\" lay-filter=\"macro-add-select-key\">", '#current-usb-client-battery-icon', 'kbd-light-cancel-action', 'NUM4', '[id=pair-panel]', 'includes', 'touch_continue_count', "<input type=\"radio\" name=\"light-color\" value=\"blue\" lay-skin=\"none\" checked>", 'STRID_KEY_MEDIA_WWW_SEARCH', "\" lay-filter=\"setting-lods\" checked>", 'assist', 'cpi', 'style', 'lzSupported;', '#kbd-main-setting-light', "Num 7", 'gray', "<input type=\"radio\" name=\"setting-onboard-color\" value=\"dark\" lay-skin=\"none\">", 'setting/dpi_color_', 'STRID_DONE', 'IQ_SET_RT_BOOST_MODE', 'productId', '#setting-rf-channel-auto', 'KPDDOT', 'STRID_SETTING_FACTORY_TEST', '&dpi_xy=', 'esbChannel', "<div id=\"key-color\" style=\"background-color: transparent; margin-top: 6px; margin-left:", '14952288tWvlYW', '#mapping-key-turbo-rand-input', '#kbd-main-setting-key-container', 'mouse_followed_left', 'STRID_KBD_KEY_MY_COMPUTER', "\" style=\"color: #0F0; background-color: #0F0\"></div>", 'kbd_axis_infos', 'action_ui_refresh_kbd_axis', '#setting-mapping-key-wheel-up-desc', '#glass-mode-activated', 'pair-more-panel', "Page Up", 'TILDE', "<div class=\"layui-col-xs4\">", 'STRID_SETTING_MACRO_ACTIONGS', 'deltaX', "[name=\"mapping-macro-stop-key\"]", 'mouse-select-key-index', 'kbd-macro-save', "<input type=\"radio\" name=\"dpi-level-color\" value=\"skyblue\" lay-skin=\"none\" checked>", '7OIxZUH', 'mouse_intensity_adjustment', 'STRID_KBD_KEY_BRGB_SPI', 'theme', 'VolumeDown', "[name=\"setting-wireless-turbo\"]", 'WWWBack', "\"kbd-advance-key-matrix-action=\"select\" style=\"cursor: pointer;\">", 'mouse_auto_click_up', '18px', 'wheel_endKey', 'STRID_SETTING_MAPPING_MACRO_ACTION_ADD', 'hopChannelSupported', "<div class=\"layui-setting-title-container\" style=\"height: 50%;\">", "\" lay-filter=\"setting-lods\">", '&productId=', 'STRID_SETTING_MAPPING_NOT_SAVED_DISCARD_CONFIRM', 'sleepTime', 'ESC', '[0,0,1025]', "\\  |", '<table>', 'WHEELRIGHT', 'kbd-key-desc-container', '#mapping-function-shell-cmd-container', 'kbd_key_normal.png', "<p style=\"user-select: none;font-size: small;color:white;text-align: center; margin-top: 5px; margin-bottom:2px\" >", 'F11', 'rt_press_lv', '#kbd-main-setting-axis', '#connect-panel', "<select name=\"mapping-macro-stop-key\" lay-verify=\"required\" lay-filter=\"mapping-macro-stop-key\">", 'offsetHeight', 'STRID_KEY_ARROW_RIGHT', 'table', 'layui-outline', "[name=\"function-shell-cmd-app\"]", 'set', 'radio(setting-lods)', 'STRID_SETTING_MAPPING_MACRO_ACTION_ADD_S', 'toFixed', 'offsetTop', "<input type=\"radio\" name=\"light-color\" value=\"purple\" lay-skin=\"none\" checked>", 'Print', '#00f6ff', " - ", "<select name=\"mapping-key\" lay-verify=\"required\" lay-filter=\"mapping-key\">", "\"kbd-macro-item-action=\"select\" style=\"cursor: pointer;\">", 'mode', 'IQ_SET_RGB_COLOR_SLEEP_TIME', '#dpi-level-input-panel', '#setting-mapping-ctrl-key2', 'kbd_rs_num', " style=\"opacity: 0.25\"", 'interval_time', "[name=\"light-auto-off\"]", 'STRID_SETTING_RF_CHANNEL_40_TIPS', 'responseText', 'setting/kbd/light/', 'color-b-input', '#mapping-macro-add-select-key', 'EQUAL', 'toLowerCase', '#macro-add-move-delta-container', '#kbd-key-windows-container', 'slice', 'colored', 'outputReports', 'IQ_RESET_KEYCODE', 'STRID_SETTING_MAPPING_MACRO_RECORD_MAX_EX', 'STRID_KEY_ARROW_DOWN', 'marginLeft', "<div style=\"width: 104px;height: 68px;margin-left: 5px;background-color: #202020;\">", 'receiver', 'ocn', 'action_ui_refresh_current_client_rssi', "[name=\"mapping-macro-trigger-type\"]", 'https://www.miracletek.net/game/device.php', 'none', 'STRID_KBD_KEY_SYSTEM_WAKE', 'STRID_KEY_MEDIA_PLAY_PAUSE', 'mouseup', 'STRID_SETTING_MAPPING_SELECT_KEY', 'layui-setting-section-light', 'https://hub.miracletek.net/hub/layui/css/layui-theme-dark.css', 'KPD9', '&channel=', 'setting/key_circle_gray2.png', 'glassModeEnabled', 'product/', " Alt", 'current-usb-client-battery-icon', '/name.png', 'STRID_KEY_MEDIA_PREVIOUS_TRACK', 'col1', '</a>', '&devMode=', '#pair-panel', 'macroKeys', 'battery', "<a kbd-key-windows-index=\"", "<a kbd-select-key-index=\"", 'left', 'kbd_axis_jdl.png', 'macro_style', '#color-r-input', 'substr', 'product/rssi_low.png', 'shell-cmd-app-browse-action', "<div id=\"key-color\" style=\"background-color: ", 'red', '#mapping-function-container', '#kbd-macro-add-select-key', 'keys', 'kbd_onboardNum', 'select(onboard-config)', "<a mouse-select-key-index=\"", '#kbd-axis-trigger-point', 'switch(setting-angle-snapping)', 'elementId', '#kbd-advance-key-desc-arrow', 'LEFTBRACE', "#setting-rf-channels [class*=layui-col-xs]", 'kbd-mt-key2', 'select(combination-key)', 'IQ_GET_MACRO_NUM', "[name=\"power-saving\"]", '#kbd-mapping-advance-key-container', 'STRID_KEY_BACK', 'logo', 'product/rssi_higher.png', 'undefined', "<input type=\"radio\" name=\"light-color\" value=\"green\" lay-skin=\"none\">", '[class*=layui-outline-light]', 'STRID_KBD_KEY_RGB_SPI', 'click', 'focus', 'kbd-main-setting-type', 'kbd_axis_normal.png', 'setAttribute', 'mouse_mapping_function_text', 'test', 'prop', '#selected-rf-channel-tips', '#color-g-input', 'requestDevice', "<div class=\"layui-hover-bg\" style=\"display: flex; justify-content: center; align-items: center; position: absolute; width:", 'sCode', 'ko_KR', "\" style=\"color: #EEE; background-color: #EEE\"></div>", "Num /", "[name=\"mapping-ctrl-key1\"]", 'STRID_SETTING_UNIT_MINUTE', '#dpi-level-edit', "<input type=\"radio\" name=\"light-color\" value=\"white\" lay-skin=\"none\" checked>", 'Home', 'reloadData', '#16B77788', "[name=\"kbd-light-box-colored\"]", 'IQ_GET_RT_BOOST_MODE', 'layui-col-xs4', '#dialog-select-key-container', '#slider-dpi-x-input', "[name=\"light-mode\"]", 'setting/folder.png', '[class=layui-setting-light-define-section-arrow]', 'UNKNOWN', 'Option', '#setting-wireless-turbo-desc', 'layui-axis-type-ttc-wcw-container', 'slide_range', "<select name=\"key-delay-select-key\" lay-verify=\"required\" lay-filter=\"key-delay-select-key\">", "Num +", "[name=\"kbd-light-mode\"]", '#kbd-setting-light-box-container', "<p style=\"font-size: small;color:white;text-align: center;margin-top: 8px;\" >", "<p style=\"user-select: none;font-size: 10px;color:#C0C0C0;text-align: center;\" >", '&wireless_turbo=', 'crcSupported', 'WHEELLEFT', '</li>', 'black', 'background-color', 'light_box_info', 'LOADED', '#kbd-axis-button-container', 'select(mapping-macro-trigger-type)', 'name', 'kbd-mt-key1', 'STRID_SETTING_MAPPING_TYPE_FUNCTION_SHELL_CMD_APP', 'substring', 'STRID_SETTING_MOUSE_UNPAIR_S', 'V11', 'col2', 'switch(setting-wireless-turbo)', 'kbd-key-rgb-action', '#kbd-advance-key-desc-title', 'kbd_dks_num', 'current-usb-client-firmware-new', 'rfChannel', 'joystick_switch_mode', 'MOUSEMOVE', 'STRID_SETTING_MAPPING_TYPE_FUNCTION_NEXT_ONBOARD', 'kbd-dks-key2', 'countdown', 'close', " class=\"layui-receiver\">", '#macro-add-position-x-input', 'STRID_SETTING_DPI_SPEED', "<a color-code=\"", 'product/kbd_bg-hover.png)', 'select(mapping-ctrl-key1)', '#not-support-panel', 'dynamicGOM', 'mousedown', 'IQ_GET_RGB_COLOR_SLEEP_TIME', 'textContent', 'KPD1', 'from', "<td style=\"padding-top: 3px;\">", "<input type=\"radio\" name=\"setting-onboard-color\" value=\"purple\" lay-skin=\"none\">", '[id=not-support-panel]', '#setting-mapping-key-wheel-line', '#setting-angle-tuning-section', 'layui-col-xs3', '#kbd-mapping-key-container', "px; height:", 'STRID_KBD_KEY_SYSTEM_POWER', '#light-box-color-r-input', 'number', "px;\"/>", "<div class=\"layui-row\" style=\"margin-top: 10px;\">", 'vCode', 'TAB', '#setting-onboard-config', '#function-shell-cmd-app', 'batteryLevels', 'kbd-light-matrix-index', "[name=\"setting-mapping-key\"]", 'receiver-action', "\" style=\"color: #F0F; background-color: #F0F\"></div>", "\" lay-filter=\"setting-polling-rates\" disabled>", '#mapping-function-toggle-esb-container', 'helloed', 'charging', '#wheel-delta-container', 'action_ui_refresh_kbd_macro', 'kbd-macro-add', 'macAddress', 'kbd-setting-advance-key-type', 'STRID_KBD_LIGHT_MODE', 'kbd-macro-save-action', 'kbd_axis_ttc_wcw.png', 'checkbox(mapping-key-turbo)', 'closeAll', "<p style=\"font-size: smaller;color:white;text-align: center;\" >", 'select(mapping-key)', "/preview.png\">", '#setting-mapping-key-wheel-down-desc', 'STRID_KEY_LEFT_S', "<a kbd-light-matrix-index=\"", "<input type=\"radio\" name=\"dpi-level-color\" value=\"white\" lay-skin=\"none\" checked>", 'keydown', 'Shift', '-line', "px; margin-top:", 'STRID_SETTING_MOUSE_PAIR_WARNING', 'wheel-line-container', 'mouse_auto_click_rand', '%02x:%02x:%02x:%02x:%02x:%02x', "<input type=\"radio\" name=\"light-color\" value=\"purple\" lay-skin=\"none\">", 'STRID_KEY_MIDDLE', "\"kbd-light-matrix-action=\"select\" style=\"cursor: not-allowed;\">", '39px', 'STRID_KBD_KEY_BRGB_RMOD', '24px', " Command", 'KPD2', 'STRID_KBD_KEY_MAIL', 'margin-left', '#kbd-setting-panel', 'STRID_KEY_WHELL_RIGHT', 'keyCode3', '#current-usb-client-models', '#slider-dpi-y-input-container', 'STRID_SETTING_MAPPING_TYPE_FUNCTION_TOGGLE_CPI', 'Enter', 'mouse_mapping_keys', "\" cpi-level-action=\"select\" style=\"cursor: pointer;\">", 'https://hub.miracletek.net/hub/img/rawm_hub.png?v=202412080015', 'SA-SH01', 'Apps', 'IQ_GET_MACRO_DATA_BUF', 'NUM7', 'kbd-current-usb-client-image', 'IQ_GET_RGB_COLOR_BUF', '#light-box-color-b-input', 'SCROLL', 'text', "px; margin-left:", 'onboardConfigNum', '#setting_mapping_product_icon', 'eplapsed_syncing_ms', "<p style=\"text-align: center;margin-top: 10px;\" >", 'setting/mapping_key_line_normal.png)', "<input type=\"radio\" name=\"dpi-level-color\" value=\"purple\" lay-skin=\"none\" checked>", 'STRID_SETTING_MAPPING_MACRO_ACTION_KEEP_TIME_MS', "th[data-field='desc']", 'top', 'STRID_SETTING_MAPPING_TYPE_FUNCTION_SHELL_CMD', 'mouse_radius', 'joystick_timeout', 'STRID_KEY_MEDIA_STOP', 'power_modes', "<select name=\"kbd-light-box-mode\" lay-verify=\"required\" lay-filter=\"kbd-light-box-mode\">", "\"mouse-select-key-action=\"select\" style=\"cursor: pointer;\">", 'STRID_SETTING_MAPPING_MACRO_TRIGGER_PRESS', 'STRID_SETTING_MOUSE_UNPAIR_WARNING', 'F12', '295px', '</div>', 'key-delay-action', 'footer-light', '#kbd-factory-reset-panel', '[class=layui-setting-light-define-section-arrow-light]', 'usb-client-id', '#setting-lod-section', 'STRID_SETTING_MAPPING_NOT_SAVED_DISCARD_S', "/connected.png\" height=\"60px\">", 'cpi_step', 'peerInfo', 'mousemove', "Num Lock", 'setting/key_circle_blue.png', 'kbd-axis-save-action', "Num 4", 'send_event_buf', 'polling', 'STRID_KEY_ARROW_LEFT', 'STRID_KBD_LIGHT_BOX_MODE1', 'setting-x-polling', 'layui-setting-light-define-section-arrow-light', 'extend', "<input type=\"radio\" name=\"dpi-level-color\" value=\"blue\" lay-skin=\"none\">", '#dpi-level-add', 'kbd-axis-action', 'kbd-light-matrix-action', '#mapping-key-turbo-down-keep-input', 'radio', 'i18np', 'HOME', 'kbd-main-setting-key-icon', 'layui-setting-light-define-section-arrow', 'keyCode2', '#light-box-color-g-input', "Caps Lock", "<a kbd-key-matrix-index=\"", 'color-code', "/connected.png\" style=\"height: 40px; margin-top:10px;margin-left:-16px\">", "<input type=\"radio\" name=\"dpi-level-color\" value=\"white\" lay-skin=\"none\">", '#surface-quality', "<input type=\"radio\" name=\"setting-onboard-color\" value=\"skyblue\" lay-skin=\"none\" checked>", 'mouse_key_event', 'STRID_KBD_SWITCH_WASD', 'ocs', " .layui-layer-btn .layui-layer-btn0", "layui-btn layui-key-desc-button", "</div><div class=\"layui-row\">", 'Pause', 'mouse_key_loop', 'kbd-advance-key-delete', 'mapping-key-action', 'WWWHome', 'getItem', '38026vXwJNI', '#kbd-key-media-container', "<p style=\"text-align: center;margin-top: 7px;\" >", 'https://static.miracletek.net/pc/RAWMHUB_WIN7.zip', 'STRID_KBD_KEY_BRGB_MOD', "<td style=\"width: 10px;\"><td>", "\" list-action=\"select\">", 'QUOTE', 'lay-skin-color-picker-light', '#receiver-panel', 'row', 'STRID_SETTING_MAPPING_TYPE_FUNCTION_PREVIOUS_CPI', "setting/mkey_up.png\" style=\"width: 20px;height: 22px; margin:4px;\"/>", 'preventDefault', 'STRID_SETTING_MAPPING_KEY_RECORD_RESET', 'allKeyConfigs', '#setting-key-delay-section', "<p style=\"user-select: none;font-size: smaller;color:orange;text-align: center; margin-top: 10px;\" >", 'STRID_SETTING_MAPPING_TYPE_FUNCTION_TOGGLE_ESB_ADDR', 'pageYOffset', 'boost_polling_rates', "[name=\"mapping-macro-trigger-key\"]", 'kbd-advance-key-delete-action', 'STRID_KBD_KEY_AUDIO_MUTE', '/connected.png', 'slider-dpi-x-input', 'background-image', 'ES21', 'kbd-socd-key2', '#kbd-setting-rs-container', '-desc', '#x-dpi-level-input', 'WWWSearch', 'config', 'SA-ML01', 'kbd-socd-key1', 'colorCode', 'select[name=language]', 'STRID_KBD_CURRENT_VERTION', "<input type=\"radio\" name=\"light-color\" value=\"red\" lay-skin=\"none\">", 'action_refresh_client_list', 'STRID_KBD_KEY_RGB_MODE_FORWARD', '#dialog-mouse-select-key-container', "<div style=\"width:", "<div class=\"layui-key-select-red\" style=\"position: absolute; width:", 'STRID_SETTING_MAPPING_TYPE_FUNCTION', '</tr>', "[name=\"kbd-light-sleep-time\"]", 'kbd-axis-cancel-action', 'Z60', 'log', 'deltaY', "<p id=\"current-usb-client-firmware-new\" class=\"layui-firmware-new\" firmware-action=\"click\" data-i18n-title=\"STRID_HOME_NEW_VER_AVAIL\">æœ‰æ–°çš„ç‰ˆæœ¬å¯ç”¨</p>", 'autoTxPower', 'F10', '#kbd-current-usb-client-firmware-new', "<div class=\"layui-col-xs3\">", '{name1}', '#function-shell-cmd-app-browse', 'IQ_SET_MAG_RS_NUM', '&a=', 'MouseButton', '#setting-power-modes', '#wireless-optimize-busy', 'kbd-key-windows-action', 'STRID_SETTING_MAPPING_KEY_RECORD_TITLE', 'setting-mapping-key-', 'kbd-key-media-action', 'ALL', 'purple', 'STRID_SETTING_MAPPING_TYPE_FUNCTION_PREVIOUS_ASSIST', "<div class=\"layui-row\">", '[0,0,1027]', "<p style=\"user-select: none;font-size: smaller;color:white;text-align: center;\" >", 'radio(setting-fw-channel)', 'kbd-macro-add-action', '#y-dpi-level-input', "<div class=\"layui-nav\" lay-filter=\"client-list-filter-nav\" style=\"background-color: #37373A;padding-left: 0px;padding-right: 0px\">", '#kbd-main-setting-more', 'squal', 'layer', '&lang=', 'width', "<input type=\"radio\" name=\"setting_polling_rates\" value=\"", 'WASD', 'kbd_axis_mode', 'angleSnapping', "<div lay-radio class=\"", 'STRID_KBD_KEY_BRGB_VAD', 'mouse_lock_unlock_call', "\"kbd-key-matrix-action=\"select\" style=\"cursor: pointer;\">", "\" lay-filter=\"setting-polling-rates\" checked>", 'list-action', 'equal', 'kbd_light_selected.png', 'STRID_SETTING_FACTORY_START', 'NUM3', 'kbd_rs_infos', 'STRID_KEY_MEDIA_NEXT_TRACK', 'kbd-dks-key1', 'mouse_auto_click_toggle_key', 'inputReports', 'mapping-key-type', 'IQ_SET_MAG_DKS_DATA', 'STRID_SETTING_RF_CHANNEL_AUTO_TIPS', 'switch(x-polling)', "\" lay-filter=\"setting-polling-rates\" checked disabled>", ">>>>>>>>sync start", "\" dpi-level-color-action=\"select\" style=\"padding-left: 8px; padding-right: 8px;padding-top: 8px;cursor: pointer;\">", 'keyId', '#kbd-setting-macro-container', 'kbd-dks-key3', "<select name=\"mapping-function\" lay-verify=\"required\" lay-filter=\"mapping-function\">", 'light_box_mode', '#record-mapping-key-panel', 'product_esb_ch', '#kbd-mapping-light-container', '#kbd-dks-add', 'keyDelay', '#current-usb-client-battery', 'rf_chn', 'STRID_SETTING_MAPPING_TYPE_FUNCTION_TOGGLE_ASSIST', 'light-box-color-b-input', "<div class=\"layui-col-xs3\" style=\"width:", '#kbd-key-desc-arrow', 'macro_toggleKey', "px;\">", 'select(kbd-light-mode)', ".png\" style=\"position: absolute; margin-top:", "<p style=\"width: 104px;color: white; text-align: center;\">", '#setting-mapping-key-m', 'i18n/extend-202510170047/', "<input type=\"radio\" name=\"setting-onboard-color\" value=\"purple\" lay-skin=\"none\" checked>", 'desc', 'multipliedBy', 'product/wifi.png', 'configType', "[name=\"setting-angle-snapping\"]", 'kbd_dks_infos', '#slider-function-dpi-input', 'WHEELDOWN', '#dpi-level-input', "<p style=\"user-select: none;font-size: smaller;color:white;text-align: center; margin-top: 2px;\" >", 'kbd-macro-record', "Num *", '#light', 'setting-action', 'STRID_KEY_WHELL_DOWN_S', 'rssi', 'resolution', '#kbd-light-global-speed', 'IQ_SET_MAG_DKS_NUM', 'STRID_NONE', "<input type=\"radio\" name=\"light-color\" value=\"skyblue\" lay-skin=\"none\">", '#setting-mapping-key-wheel-up-line', 'version', 'WWWStop', 'margin-top', 'apply', " Win", 'kbd_socd_num', 'light-box-pick-color', "<input type=\"radio\" name=\"dpi-level-color\" value=\"yellow\" lay-skin=\"none\" checked>", 'lbn', 'footer', 'byteLength', 'LEFT', '#kbd-key-desc-title', '#kbd-advance-key-desc1', 'deviceName', 'href', 'STRID_SETTING_MAPPING_TYPE_FUNCTION_SHELL_CMD_WEB', "<p style=\"user-select: none;font-size: smaller;color:white;text-align: center; margin-top: 10px;\" >", '#function-shell-cmd-web-container', 'row2', 'CTRL', '#dpi-both-x-y', 'rt_enable', 'kbd_mt_num', 'charCodeAt', 'index', '[class=layui-setting-light-define-section-light]', 'tab(mapping-key-type)', "<p style=\"font-size: 14px;\">", 'kbd-light-select-all', 'checkbox(light-auto-off)', 'input-affix(wheel-delta-input)', 'oncontextmenu', 'setting_mapping_key_wheel_down', 'setting/key_circle_blue2.png', 'mouse_key_code', "<div class=\"layui-col-xs3\" style=\"padding-top: 3px;padding-bottom: 3px;width: fit-content;display: none;\">", "setting/dpi_normal.png\" style=\"position: absolute;\"/>", '#usb-client-list', 'state4', "<input type=\"radio\" name=\"light-color\" value=\"skyblue\" lay-skin=\"none\" checked>", 'STRID_KBD_KEY_SYSTEM_SLEEP', 'STRID_SETTING_MOUSE_PAIR_S', 'onboardStatus', '#kbd-mapping-axis-container', 'mapping-key-turbo-down-keep-input', " Shift", 'setItem', "Num 0", '#function-shell-cmd-app-container', 'flex', 'rippleControl', 'mouse_mapping_key_data', 'wheel-up', "\"setting-onboard-status-action=\"select\" style=\"padding-left: 8px; padding-right: 8px;padding-top: 8px;cursor: pointer;\">", 'element', 'STRID_SETTING_RF_CHANNEL_80', 'connect', 'use', 'max', 'select(kbd-light-sleep-time)', 'oms', "[name=\"kbd_onboard-config\"]", 'kbd-select-key-index', 'action_ui_refresh_kbd_light', 'kbd-select-key-action', 'isArray', 'STRID_SETTING_MOUSE_REBOOT', 'className', '#dpi-level-input-layout', 'current-action', 'wired', 'rounded-border', " checked", 'lang', 'https://www.miracletek.net/game/mouse_config.php', "<div style=\"position: absolute;width: 80px;\">", "'  \"", 'STRID_KBD_SOCD_KEY2', "[name=\"onboard-allow-switch\"]", '</tr></table>', '#kbd-main-setting-key', 'select(language)', 'action_ui_refresh_kbd_key', 'layui-setting-section', 'kbd-key-switch-mac-mode-action', 'STRID_KEY_WHELL_LEFT', 'hs_get_light:', 'STRID_SETTING_UNIT_SECOND', 'zh_CN', 'setting/key_circle_gray.png', 'borderColor', 'Calculator', '#mapping-function-select', 'disabled', 'luaStatus', 'revision_code', 'rctrl', 'product/battery.png', '#kbd-main-setting-axis-container', '&devRevCode=', '<tr>', "\" dialog-mouse-select-key-action=\"select\" style=\"cursor: pointer;\">", '#mapping-key-turbo-detail-container', 'STRID_KBD_KEY_BRGB_SPD', 'PAW3395', '#kbd-key-desc-line', "[name=\"mapping-key-turbo\"]", "<input type=\"radio\" name=\"dpi-level-color\" value=\"red\" lay-skin=\"none\">", 'Windows', 'type', '#mapping-function-toggle-ble-container', 'aName', 'ALTR', "<p style=\"user-select: none;font-size: small;color:white;text-align: center;margin-top: 8px;\" >", 'pollingRate', 'STRID_KEY_MEDIA_WWW_FORWARD', 'encode', 'select(mapping-function)', 'row1', 'KPD8', '#00000000', 'scrollTop', 'elem', "[name=\"kbd-axis-quick-tigger-mode\"]", '#setting-mapping-key-wheel-down-text', '#kbd-setting-mt-container', " disabled", 'kbd-fireware-download-action', 'Win', 'SYNC!@#$%^', 'dialog-select-key-action', "<input type=\"radio\" name=\"setting_lods\" value=\"", "<a usb-client-id=\"", 'VolumeUp', 'setting/dpi_selected_h', 'light-color-action', 'innerHTML', "[name=\"mapping-macro-action-key-event\"]", 'onboardIndex', 'aCode', 'mapping-apply-and-onboard-action', "set rf channel 80", 'mouse_key_time', 'layui-layer-panel', 'esbAddressArr', "\"kbd-key-media-action=\"select\" style=\"cursor: pointer;\">", '#setting-onboard-status-colors', 'STRID_HOME_PRODUCT_FIRMWARE', 'kbd-key-default-action', '#mapping-macro-container', 'STRID_KBD_KEY_RGB_VAD', '#slider-sleep-time', 'product/usb.png', 'NUM0', 'kbd-light-wasd', 'kbd-macro-add-select-key-action', 'keyCode', "<input type=\"radio\" name=\"dpi-level-color\" value=\"blue\" lay-skin=\"none\" checked>", 'subarray', 'current-usb-client-rssi-icon', 'data', 'ScanNextTrack', 'virtual', 'WWWRefresh', "padding-bottom: 10px;", "<select name=\"mapping-macro-trigger-key\" lay-verify=\"required\" lay-filter=\"mapping-macro-trigger-key\">", 'querying_more_result', 'mapping-key-turbo-rand-input', '100%', "th[data-field='delete']", '&performance=', 'input-affix(mapping-key-turbo-rand-input)', 'lay-skin-color-picker', 'kbd_mt_infos', 'location', "<a kbd-key-rgb-index=\"", 'macro_endKey', 'send', 'IQ_GET_SOFT_DRV_VER', 'closeLast', 'kbd_advance_key_selected.png', '#select-key-panel', 'allow_send', 'lodCalib', ".png\" style=\"position: absolute;\"/>", '#kbd-advance-key-desc-line', '---', 'radio(receiver-light-mode)', 'joystick_mouse_ani', '#current-usb-client-firmware-new', 'layui-img-tint', 'STRID_KEY_WHELL_UP_S', 'IQ_SET_MAG_MT_DATA', '#wheel-delta-input', 'firmware-action', 'tap_time', 'delegateTarget', "setting/key_up.png\" style=\"width: 20px;height: 22px; margin:4px;\"/>", 'Menu', 'layui-outline-light', 'SHIFTR', '3108916KweSbM', 'https://www.miracletek.net/game/firmware.php', 'rawmhub-url', 'parentNode', "<select name=\"mapping-ctrl-key1\" lay-verify=\"required\" lay-filter=\"mapping-ctrl-key1\">", 'KPDENTER', 'socd_mode', 'V10', 'setting-onboard-status-action', 'STRID_KEY_FORWARD', 'device_info', "vertical-align: top;height: 1px;", 'mouse_pointer_senstivity', 'replaceChild', 'unshift', "<input type=\"radio\" name=\"setting-onboard-color\" value=\"red\" lay-skin=\"none\">", 'STRID_KBD_KEY_MEDIA_PREV_TRACK', 'STRID_SETTING_RF_CHANNEL_AUTO', 'kbd-rs-key1', 'kbd-factory-reset-action', 'productName', 'VERTICALBAR', 'touch_style', 'KPD', '#current-usb-client-name', 'action_ui_refresh_qual', 'esb_selected', 'ScanPreviousTrack', 'push', 'esb_addr', 'STRID_KBD_MT_SELECT_KEY', 'STRID_SETTING_SURFACE_QUALITY', 'setting_mapping_key_wheel_up', "product/receiver-selected.png\" height=\"17px\" class=\"layui-img-tint-light\">", 'soc', 'kbd-setting-light-type', 'target', '#setting-panel', "<input type=\"radio\" name=\"light-color\" value=\"red\" lay-skin=\"none\" checked>", "\" style=\"color: #FFF; background-color: #FFF\"></div>", 'kbd-key-matrix-action', 'checkbox', 'STRID_KBD_NO_KEY_SELECTED', 'mapping-key-turbo-up-keep-input', '#pair-device', 'product/charging_red.png', 'visible', 'layui-axis-type-hn-omega-icon', "[name=\"key-delay-select-key\"]", "\" elementId=\"", 'y-dpi-level-input', 'cpi-level-action', '[class=layui-setting-section]', 'mouse_right_drop', "<div class=\"layui-hover-bg-trans\" style=\"justify-content: center; align-items: center; position: absolute; width:", " Option", 'height', '.layui-table', "[name=\"mapping-ctrl-key2\"]", 'keyCode4', 'STRID_KEY_WHELL_LEFT_S', '#16B777', 'speed', "<p style=\"user-select: none;font-size: small;color:orange;text-align: center; margin-top: 16px;\" >", '&devName=', 'kbd-dks-key-action', 'color-action', '#macro-add-wheel-delta-container', 'STRID_KEY_MEDIA_WWW_STOP', 'WHEELUP', 'STRID_RIGHT', '<td>', 'SA-MH01Pro', '#key-shortcuts', 'mouse_vertical_senstivity', 'white', 'fps_shoot_mode', 'checkbox(glass-mode)', 'state2', '#setting-mapping-key-m7-line', 'setting/dpi_selected', 'STRID_LEFT', 'rounded-border-green', 'kbd-dks-key4', '300GiAXwT', 'radio(setting-polling-rates)', '#y-dpi-level-input-layout', '#slider-angle-tuning', 'green', 'setting_mapping_key_m', '#setting-mapping-macro-record-panel', 'mouse_targeted_percent', 'display_name_model', "<input type=\"radio\" name=\"light-color\" value=\"dark\" lay-skin=\"none\">", 'kbd-key-matrix-index', "setting/mkey_move.png\" style=\"width: 20px;height: 22px; margin:4px;\"/>", 'tab(kbd-setting-light-type)', "px; width:", 'battery_levels', 'kbd-advance-key-set', 'LEFTARROW', 'setting/kbd/', 'STRID_KEY_MEDIA_WWW_BACK', 'setting-mapping-key-m', 'mouse_intensity_toggle_key', 'ES21Pro', "<input type=\"radio\" name=\"setting-onboard-color\" value=\"blue\" lay-skin=\"none\">", '#setting-combination-key', 'Ctrl', '&nbsp;', 'cpiLevels', '#macro-record-waiting-info', "<td style=\"padding-top: 5px;\">", "[  {", 'working_modes', "<input type=\"radio\" name=\"setting-onboard-color\" value=\"white\" lay-skin=\"none\">", 'locked', '#slider-dpi-y-input', "Num 8", 'readyState', 'STRID_SETTING_MAPPING_APPLY_AND_ONBOARD', 'IQ_SET_MAG_MT_NUM', 'createElement', 'mouse_auto_click_per_second', 'layui-img-tint-light', 'kbd-main-setting-advance-key-icon', 'getAttribute', "\"kbd-key-windows-action=\"select\" style=\"cursor: pointer;\">", 'STRID_SETTING_MAPPING_TYPE_MACRO', 'checkbox(dpi-both-x-y)', 'recv_buf', 'STRID_KEY_ARROW_UP', "receiver onboard ", 'NORDIC', "[name=\"x-polling\"]", 'kbd_key_infos', 'en_US', 'parse', 'CLEAR', '#kbd-axis-press-distance', 'IQ_SET_MAG_SOCD_DATA', '[0,0,1024]', 'sleep_time', 'postMessage', " class=\"layui-receiver layui-img-tint-light\">", 'kbd-axis-matrix-action', '[0,0,0]', "[name=\"dpi-both-x-y\"]", 'slide_time', 'STRID_KEY_RIGHT_S', 'css', "\" title=\"", 'mouse_followed_right', 'kbd-main-setting-action', 'label', "Num .", 'removeClass', 'floor', 'device', '#setting-power-saving', 'KPDPLUS', 'kbd-main-setting-light-icon', "\" style=\"color: #0FF; background-color: #0FF\"></div>", "\" style=\"color: #00F; background-color: #00F\"></div>", "<input type=\"radio\" name=\"dpi-level-color\" value=\"green\" lay-skin=\"none\">", 'IQ_GET_MAG_DATA', "<input type=\"radio\" name=\"dpi-level-color\" value=\"purple\" lay-skin=\"none\">", "<div class=\"layui-hover-bg-trans\" style=\"display: flex; justify-content: center; align-items: center; position: absolute; width:", 'vendorId', '#setting-mapping-macro-edit-panel', "<a cpi-level-index=\"", "<p style=\"width: 104px;color: gray; text-align: center;\">", 'switch(kbd-light-box-colored)', 'screen', "<option value=\"", 'sensor', 'IQ_SET_MAG_RS_DATA', "<input type=\"radio\" name=\"setting-onboard-color\" value=\"white\" lay-skin=\"none\" checked>", 'innerWidth', 'kbd_axis_selected.png', 'STRID_KEY_MOUSE_MOVE', '#setting-mapping-macro-trigger-type', '<table><tr>', '</table>', 'cpi_range', 'radio(setting-power-modes)', '#kbd-key-desc2', 'product/receiver-hs-connected.png', 'IQ_SET_MAG_DATA', '#surface-quality2', 'STRID_SETTING_SELECT_KEY_ALL', 'hopChannel', 'LB_B', "<p style=\"user-select: none;font-size: 10px;color:#C0C0C0;text-align: center; \" >", 'kbd-setting-key-type', '#mapping-function-dpi-container', 'kbd-advance-key-desc-container', 'DOMContentLoaded', 'ja_JP', 'collections', 'IQ_GET_MAG_MT_NUM', 'crc', '#kbd-light-box-global-brightness', '#setting-mapping-key-wheel-down-line', 'txOutputPowerApplied', 'STRID_KEY_MIDDLE_S', "<input type=\"radio\" name=\"light-color\" value=\"green\" lay-skin=\"none\" checked>", 'COLON', 'trim', 'fromCharCode', 'NUMLOCK', 'display', 'WINDOWS', 'mouse_auto_click_down', '#CCCCCC', 'STRID_SETTING_MAPPING_TYPE_FUNCTION_TOGGLE_BLE_DEVICE', '[class*=footer]', 'SHIFT', 'STRID_KEY_MEDIA_CALCULATOR', 'light-box-color-g-input', 'action_refresh_current_client', 'sat', "vertical-align: top;padding-right: 30px;", 'setting-key-delay-section', 'kbd_more_normal.png', 'blue', '#kbd-fireware-download', 'tabChange', 'polling_rate_max', '[0,0,256]', '#macro-add-position-container', 'current-usb-client-image', "<div class=\"layui-col-xs3\" style=\"padding-top: 3px;padding-bottom: 3px;width: fit-content;\">", 'SOCD', 'STRID_SETTING_MAPPING_MACRO_TRIGGER_RELEASE', '#shell-cmd-app-browse_file', 'esbAddress', 'setting/mapping_key_line_selected.png)', '#setting-light-define-section', '#kbd-light-global-brightness', "[name=\"setting-rf-channel\"]", 'Insert', 'resize', "<p style=\"color: white;\">", '#kbd-main-setting-more-container', 'firmwareInfo', "Num 1", 'LOADING', 'noack', 'setValue', 'open', 'STRING_OK', 'STRID_KEY_MEDIA_VOLUME_DOWN', 'DKS', '<br>', 'input-affix(mapping-key-turbo-freq-input)', '&angle_tuning=', 'tbody', '&lod=', 'radio(setting-rf-channel)', "IQ_GET_RGB_COLOR_BUF finish", 'models', 'STRID_SETTING_LIGHT', 'switch(setting-motion-sync)', " ms", '{name2}', 'switch(dark-theme)', 'then', 'setting-mapping-key-m7-circle', 'kbd_advance_key_normal.png', 'key-shortcuts', '#slider-x-polling-input', "setting/dpi_normal_h.png\" style=\"position: absolute;\"/>", '#mouse-select-key-container', 'mouse_mapping_function_data', "<div style=\"text-align: center\">", 'STRID_KEY_SPACE', 'sendReport', 'layui_theme_css', "[name=\"function-shell-cmd-web\"]", "\" lay-filter=\"setting-polling-rates\">", 'lod', "\"  elementId=\"", 'kbd-mt-key2-action', "IQ_GET_KEYCODE_BUF finish", 'setting-lod-section', 'Backspace', '&v=', 'uk_UA', 'slide_delay', 'STRID_KEY_WHELL_UP', 'tab(kbd-setting-advance-key-type)', 'esbSelected', 'each', 'STRID_KBD_ADVANCE_KEY_MAX_HINT', '#brightness', 'url(', '#kbd-macro-container', 'layui-setting-light-define-section-light', 'STRID_SETTING_FACTORY_TESTING', 'html', 'DELETE', '[class=layui-current-name-light]', 'blur', 'STRID_KBD_KEY_BRGB_VAI', '&sensor=', 'kbd-dks-select-key-action', 'revision', 'IQ_GET_MAG_MT_DATA', "\" style=\"color: #505050; background-color: #505050\"></div>", 'wheel-down', 'select(kbd-light-box-mode)', 'STRID_KBD_LIGHT_SLEEP_TIME4', '#slider-key-down-delay', '#kbd-setting-onboard-config', 'dpi-level-input', 'STRID_CLOSE', 'client-list-filter-nav', "[name=\"kbd-socd-type\"]", 'product/battery2.png', 'joystick_radius', 'addEventListener', 'STRID_SETTING_FACTORY_RESET_S', "product/receiver-selected.png\" height=\"17px\">", '285px', "add new virtual client", '10CKRfRZ', 'dark', 'kbd-advance-key-set-action', 'IQ_SET_RGB_COLOR', '#kbd-setting-key-base-container', 'switch_type', 'yellow', '40px', 'STRID_KEY_MOUSE_MOVE_S', 'toString', 'SA-MH01', '#kbd-light-mode-container', 'oci', 'mouse_intensity_key', "<img height=\"17px\">", 'App', 'insertCell', '#mapping-key-turbo-freq-input', '</option>', "[name=\"setting-fw-channel\"]", "setting/key_down.png\" style=\"width: 20px;height: 22px; margin:4px;\"/>", 'touch_firearms', '#setting-mapping-key-wheel-up-text', '#layui-layer', 'product_id', 'STRID_KBD_KEY_BRGB_COD', 'STRID_KEY_RIGHT', 'kbd-macro-item-action', 'change', 'IQ_SET_CUSTOM:', "[name=\"onboard-config\"]", 'now', '#pairing-waiting', '#kbd-mt-longpress-time', "\" color-action=\"select\" style=\"cursor: pointer;\">", 'ER21Pro', 'light', 'layui-current-name-light', '/setting.png)', '#setting-mapping-macro-stop-key', 'STRID_SETTING_WIRELESS_QUALITY', 'joystick_navigate_mode', 'mousewheel', '#color-b-input', "<div class=\"layui-hover-bg\" style=\"position: absolute; width:", '#kbd-setting-light-container', 'cpi_l', 'backgroundColor', 'macro-add-wheel-delta-input', 'col', '#303030', 'STRID_KEY_MEDIA_VOLUME_UP', 'STRID_WEBHUB_GOM_REBOOT_NEEDED', 'PAGEDOWN', '#pairing-tips', '#kbd-setting-dks-container', 'powerMode', '/M5', 'device_name', 'status', 'GREATTHAN', 'pause', 'esb_ch', 'Alt', 'key', 'stringify', 'enhancement', 'KPD7', '#kbd-advance-key-desc2', 'value', 'kbd_light_info', 'IQ_GET_MAG_RS_DATA', 'STRID_KBD_MT_HINT', 'cmd', 'STRID_KEY_MEDIA_MAIL', 'onboard_index', "[name=\"macro-record-fixed-time\"]", '#kbd-main-setting-advance-key-container', 'IQ_GET_MAG_RS_NUM', '_gray', 'disconnect', '#BABABA', 'cpi_l_c', "<div style=\"position: absolute;\">", 'product/receiver-dh-connected.png', 'PAW3950', 'KPDSTAR', 'NUM2', '#kbd-fireware-new-version-hint', 'body', 'kbd-main-setting-axis-icon', "<div style=\"width: 110px;height: 60px;margin-left: 3px;background-color: #202020;\">", 'PlayPause', 'val', '#macro-add-position-y-input', "Num 9", 'STRID_KBD_LIGHT_MODE_DEFINE', 'STRID_SETTING_MAPPING_MACRO_RECORD_TITLE', 'STRING_CANCEL', '#keys-fw-channel-gaming-tips', 'kbd_socd_infos', 'LB_A', 'kbd-main-setting-more-icon', 'Tab', 'kbd-key-media-index', 'x-dpi-level-input', 'IQ_GET_MACRO_SIZE', 'STRID_SETTING_MAPPING_MACRO_TRIGGER_LONG_RELEASE', '77px', 'button', 'round', '#current-usb-client-firmware', "<p style=\"user-select: none;font-size: smaller; color:#C0C0C0; text-align: center; margin-top:1px\" >", 'LESSTHAN', "\" disabled>", 'STRID_KBD_KEY_AUDIO_VOL_UP', '#macro-add-wheel-delta-input', '</tr><tr>', "set rf channel 40", 'product/receiver-paired.png', 'esb_last_alive_time', 'last_query_time', 'connected', 'cells', 'config_num', 'NUM', "Num 3", "<input type=\"radio\" name=\"light-color\" value=\"blue\" lay-skin=\"none\">", 'dgom', '#current-usb-client-name-model', 'abs', 'url()', 'function-shell-cmd-app-browse', 'oninputreport', '#setting-glass-mode', 'STRID_KEY_WHELL_RIGHT_S', 'layui-axis-type-action', 'tab(kbd-setting-key-type)', 'enhancedCpi', 'STRID_KBD_LIGHT_BOX_MODE4', 'load', 'select', 'radio(kbd-axis-mode)', "[name=\"setting-ripple-control\"]", '_id', "<input type=\"radio\" name=\"light-color\" value=\"white\" lay-skin=\"none\">", 'STRID_KEY_WHELL_DOWN', '#x-dpi-level-input-layout', 'STRID_SETTING_MAPPING_MACRO_TRIGGER_LONG_LOOP', "<a kbd-key-media-index=\"", 'color-r-input', 'grid', " + ", "\" receiver-action=\"select\" style=\"cursor: pointer;\">", 'revisionCode', 'STRID_SETTING_DPI_LEVEL_SPEED_INPUT', 'light_colors', "]  }", 'kbd-macro-add-select-key', 'STRID_SETTING_MAPPING_TYPE_FUNCTION_SHOW_POWER', "setting/mkey_down.png\" style=\"width: 20px;height: 22px; margin:4px;\"/>", "<input type=\"radio\" name=\"setting-onboard-color\" value=\"skyblue\" lay-skin=\"none\">", 'STRID_KBD_KEY_RGB_HUD', 'STRID_BUTTON_CANCEL', 'Delete', 'KPD5', 'clientX', "<p style=\"color:white;text-align: center;margin-top: 7px;\" >", 'onboard-config-loading', "\"kbd-axis-matrix-action=\"select\" style=\"cursor: pointer;\">", '104px', '&glass_mode=', 'slide_style', 'STRID_SETTING_MAPPING_DELETE', 'IQ_GET_PROFILE_ID', '#setting-mapping-key', 'length', 'mouse_mapping_function', '-circle', '&devHwCode=', 'forEach', 'mouse_auto_click', 'layui-bg-blue', 'STRID_KEY_MOUSE_POSITION_S', '#current-usb-client-panel', '#back-home', 'atp', 'RIGHTBRACE', 'mouse_push_joystick_again_delay', "`  ~", 'MyComputer', '#kbd-setting-function-container', 'STRID_SETTING_MAPPING_MACRO_TRIGGER_LOOP', 'render', 'family', 'RIGHT', 'min', 'GET', 'UPARROW', "[name=\"mapping-key\"]", '#key-delay-guide-panel', "<select name=\"combination-key\" lay-verify=\"required\" lay-filter=\"combination-key\">", '&devFwChn=', '#select-key-container', '#kbd-key-waiting-panel', "<a macro-edit-item-index=\"", "Num ", 'rect', 'action_ui_refresh_setting', 'kbd-key-windows-index', '</p>', '&polling_rate=', '#macro-record-fixed-time-container', 'action_ui_refresh_client_list', 'STRID_KBD_KEY_BRGB_COI', 'getTime', '#kbd-axis-dead-distance', '11968956ichtxr', "<input type=\"radio\" name=\"dpi-level-color\" value=\"green\" lay-skin=\"none\" checked>", 'display_name', "[name=\"glass-mode\"]", "px; \">", 'kbd-key-switch-wasd-action', "\" dialog-select-key-action=\"select\" style=\"cursor: pointer;\">", '#macro-add-move-delta-x-input', 'switch(onboard-allow-switch)', "<input type=\"radio\" name=\"light-color\" value=\"dark\" lay-skin=\"none\" checked>", "<p style=\"color: white;margin-top: 6px;\">", 'kbd_key_selected.png', 'txOutputPower', 'getDevices', 'STRID_SETTING_MAPPING_NOT_SAVED_BACK_S', 'rf_ch', 'End', 'STRID_SETTING_MAPPING_TYPE_FUNCTION_TOGGLE_ONBOARD', 'STRID_KBD_SWITCH_MAC_MODE', '#kbd-main-setting-light-container', 'STRID_SETTING_MAPPING_MACRO_TRIGGER_TOGGLE_LOOP', 'loadProperties', 'SA-SL01', 'select(mapping-ctrl-key2)', '#wireless-optimize-panel', 'catch', 'STRID_SETTING_MAPPING_MACRO_TRIGGER_LONG_PRESS', '237px'];
  _0x3870 = function () {
    return _0x2a9411;
  };
  return _0x3870();
}


// ===== data/key-database.js ====================================================
// =============================================================================
// Key Database — extracted from pc_key_manager_init()
//
// Conventions:
//   t    = type          (0=modifier, 1=mouse, 2=kbd, 3=media)
//   v    = vCode         (virtual-key code)
//   n    = name          (string | "$STRID_xxx" | ["$STRID", "suffix"]
//                         | {win: val, mac: val} for platform-dependent)
//   a    = aCode         (alternate code)
//   an   = aName         (alternate name — plain string)
//   s    = sCode         (scan code)
//   id   = keyId
//   r    = row
//   c    = col
//   rect = [x, y, w, h]  (pixel position for UI)
//
// i18n strings are prefixed with "$" and resolved at init time.
// =============================================================================

var KEY_DB = {

  modifiers: [
    { t: 0, v: 0,    n: "$STRID_NONE",  a: 0,   an: "NONE",    s: 0 },
    { t: 0, v: 0x11, n: "Ctrl",         a: 0,   an: "NONE",    s: 0 },
    { t: 0, v: 0x12, n: { win: "Alt", mac: "Option" }, a: 0, an: "NONE", s: 0 },
    { t: 0, v: 0x10, n: "Shift",        a: 0,   an: "NONE",    s: 0 },
    { t: 0, v: 0x5b, n: { win: "Win", mac: "Command" }, a: 0, an: "NONE", s: 0 },
  ],

  keys: [
    // None
    { t: 0, v: 0,    n: "$STRID_NONE",  a: 0,   an: "NONE",    s: 0 },

    // Mouse M1–M8
    { t: 1, v: 0x100, n: ["$STRID_KEY_LEFT"],             a: 0,   an: "M1", s: 0x100 },
    { t: 1, v: 0x101, n: ["$STRID_KEY_RIGHT"],            a: 0,   an: "M2", s: 0x101 },
    { t: 1, v: 0x102, n: ["$STRID_KEY_MIDDLE"],           a: 0,   an: "M3", s: 0x102 },
    { t: 1, v: 0x103, n: ["$STRID_KEY_BACK", "/M4"],      a: 0,   an: "M4", s: 0x103 },
    { t: 1, v: 0x104, n: ["$STRID_KEY_FORWARD", "/M5"],   a: 0,   an: "M5", s: 0x104 },
    { t: 1, v: 0x105, n: "M 6",  a: 0, an: "M6", s: 0x105 },
    { t: 1, v: 0x106, n: "M 7",  a: 0, an: "M7", s: 0x106 },
    { t: 1, v: 0x107, n: "M 8",  a: 0, an: "M8", s: 0x107 },
    { t: 1, v: 0x400, n: ["$STRID_KEY_WHELL_UP"],    a: 0, an: "WHEELUP",     s: 0x400 },
    { t: 1, v: 0x401, n: ["$STRID_KEY_WHELL_DOWN"],  a: 0, an: "WHEELDOWN",   s: 0x401 },
    { t: 1, v: 0x402, n: ["$STRID_KEY_WHELL_LEFT"],  a: 0, an: "WHEELLEFT",   s: 0x402 },
    { t: 1, v: 0x403, n: ["$STRID_KEY_WHELL_RIGHT"], a: 0, an: "WHEELRIGHT",  s: 0x403 },

    // Number row 1–9
    { t: 2, v: 0x31, n: "1",  a: 0x8,  an: "NUM1", s: 0x1e },
    { t: 2, v: 0x32, n: "2",  a: 0x9,  an: "NUM2", s: 0x1f },
    { t: 2, v: 0x33, n: "3",  a: 0xa,  an: "NUM3", s: 0x20 },
    { t: 2, v: 0x34, n: "4",  a: 0xb,  an: "NUM4", s: 0x21 },
    { t: 2, v: 0x35, n: "5",  a: 0xc,  an: "NUM5", s: 0x22 },
    { t: 2, v: 0x36, n: "6",  a: 0xd,  an: "NUM6", s: 0x23 },
    { t: 2, v: 0x37, n: "7",  a: 0xe,  an: "NUM7", s: 0x24 },
    { t: 2, v: 0x38, n: "8",  a: 0xf,  an: "NUM8", s: 0x25 },
    { t: 2, v: 0x39, n: "9",  a: 0x10, an: "NUM9", s: 0x26 },
    { t: 2, v: 0x30, n: "0",  a: 0x7,  an: "NUM0", s: 0x27 },

    // A–Z
    { t: 2, v: 0x41, n: "A", a: 0x1d, an: "A", s: 0x4 },
    { t: 2, v: 0x42, n: "B", a: 0x1e, an: "B", s: 0x5 },
    { t: 2, v: 0x43, n: "C", a: 0x1f, an: "C", s: 0x6 },
    { t: 2, v: 0x44, n: "D", a: 0x20, an: "D", s: 0x7 },
    { t: 2, v: 0x45, n: "E", a: 0x21, an: "E", s: 0x8 },
    { t: 2, v: 0x46, n: "F", a: 0x22, an: "F", s: 0x9 },
    { t: 2, v: 0x47, n: "G", a: 0x23, an: "G", s: 0xa },
    { t: 2, v: 0x48, n: "H", a: 0x24, an: "H", s: 0xb },
    { t: 2, v: 0x49, n: "I", a: 0x25, an: "I", s: 0xc },
    { t: 2, v: 0x4a, n: "J", a: 0x26, an: "J", s: 0xd },
    { t: 2, v: 0x4b, n: "K", a: 0x27, an: "K", s: 0xe },
    { t: 2, v: 0x4c, n: "L", a: 0x28, an: "L", s: 0xf },
    { t: 2, v: 0x4d, n: "M", a: 0x29, an: "M", s: 0x10 },
    { t: 2, v: 0x4e, n: "N", a: 0x2a, an: "N", s: 0x11 },
    { t: 2, v: 0x4f, n: "O", a: 0x2b, an: "O", s: 0x12 },
    { t: 2, v: 0x50, n: "P", a: 0x2c, an: "P", s: 0x13 },
    { t: 2, v: 0x51, n: "Q", a: 0x2d, an: "Q", s: 0x14 },
    { t: 2, v: 0x52, n: "R", a: 0x2e, an: "R", s: 0x15 },
    { t: 2, v: 0x53, n: "S", a: 0x2f, an: "S", s: 0x16 },
    { t: 2, v: 0x54, n: "T", a: 0x30, an: "T", s: 0x17 },
    { t: 2, v: 0x55, n: "U", a: 0x31, an: "U", s: 0x18 },
    { t: 2, v: 0x56, n: "V", a: 0x32, an: "V", s: 0x19 },
    { t: 2, v: 0x57, n: "W", a: 0x33, an: "W", s: 0x1a },
    { t: 2, v: 0x58, n: "X", a: 0x34, an: "X", s: 0x1b },
    { t: 2, v: 0x59, n: "Y", a: 0x35, an: "Y", s: 0x1c },
    { t: 2, v: 0x5a, n: "Z", a: 0x36, an: "Z", s: 0x1d },

    // F1–F12
    { t: 2, v: 0x70, n: "F1",  a: 0x83, an: "F1",  s: 0x3a },
    { t: 2, v: 0x71, n: "F2",  a: 0x84, an: "F2",  s: 0x3b },
    { t: 2, v: 0x72, n: "F3",  a: 0x85, an: "F3",  s: 0x3c },
    { t: 2, v: 0x73, n: "F4",  a: 0x86, an: "F4",  s: 0x3d },
    { t: 2, v: 0x74, n: "F5",  a: 0x87, an: "F5",  s: 0x3e },
    { t: 2, v: 0x75, n: "F6",  a: 0x88, an: "F6",  s: 0x3f },
    { t: 2, v: 0x76, n: "F7",  a: 0x89, an: "F7",  s: 0x40 },
    { t: 2, v: 0x77, n: "F8",  a: 0x8a, an: "F8",  s: 0x41 },
    { t: 2, v: 0x78, n: "F9",  a: 0x8b, an: "F9",  s: 0x42 },
    { t: 2, v: 0x79, n: "F10", a: 0x8c, an: "F10", s: 0x43 },
    { t: 2, v: 0x7a, n: "F11", a: 0x8d, an: "F11", s: 0x44 },
    { t: 2, v: 0x7b, n: "F12", a: 0x8e, an: "F12", s: 0x45 },

    // Special keys
    { t: 2, v: 0x1b, n: "Esc",        a: 0x6f, an: "ESC",         s: 0x29 },
    { t: 2, v: 0xc0, n: "`  ~",       a: 0x44, an: "TILDE",       s: 0x35 },
    { t: 2, v: 0xbd, n: "-",          a: 0x45, an: "UNDERSCORE",   s: 0x2d },
    { t: 2, v: 0xbb, n: "=  +",       a: 0x46, an: "EQUAL",       s: 0x2e },
    { t: 2, v: 0x8,  n: "Backspace",  a: 0x43, an: "BACKSPACE",    s: 0x2a },
    { t: 2, v: 0x9,  n: "Tab",        a: 0x3d, an: "TAB",         s: 0x2b },
    { t: 2, v: 0xdb, n: "[  {",       a: 0x47, an: "LEFTBRACE",   s: 0x2f },
    { t: 2, v: 0xdd, n: "]  }",       a: 0x48, an: "RIGHTBRACE",  s: 0x30 },
    { t: 2, v: 0xdc, n: "\\  |",      a: 0x49, an: "VERTICALBAR", s: 0x31 },
    { t: 2, v: 0x14, n: "Caps Lock",  a: 0x73, an: "CAPSLOCK",    s: 0x39 },
    { t: 2, v: 0xba, n: ";  :",       a: 0x4a, an: "COLON",       s: 0x33 },
    { t: 2, v: 0xde, n: "'  \"",      a: 0x4b, an: "QUOTE",       s: 0x34 },
    { t: 2, v: 0xd,  n: "Enter",      a: 0x42, an: "ENTER",       s: 0x28 },
    { t: 2, v: 0xbc, n: ",  <",       a: 0x37, an: "LESSTHAN",    s: 0x36 },
    { t: 2, v: 0xa0, n: ["$STRID_LEFT", " Shift"],  a: 0x3b, an: "SHIFT",   s: 0xe1 },
    { t: 2, v: 0xbe, n: ".  >",       a: 0x38, an: "GREATTHAN",   s: 0x37 },
    { t: 2, v: 0xbf, n: "/  ?",       a: 0x4c, an: "QUESTION",    s: 0x38 },
    { t: 2, v: 0xa1, n: ["$STRID_RIGHT", " Shift"], a: 0x3c, an: "SHIFTR",   s: 0xe5 },
    { t: 2, v: 0xa2, n: ["$STRID_LEFT", " Ctrl"],   a: 0x71, an: "CTRL",     s: 0xe0 },

    // Platform-dependent keys (Win/Cmd, Alt/Option)
    { t: 2, v: 0x5b, n: { win: ["$STRID_LEFT", " Win"], mac: ["$STRID_LEFT", " Command"] }, a: 0xab, an: "WINDOWS", s: 0xe3 },
    { t: 2, v: 0xa4, n: { win: ["$STRID_LEFT", " Alt"], mac: ["$STRID_LEFT", " Option"] },   a: 0x39, an: "ALT",     s: 0xe2 },

    // Space
    { t: 2, v: 0x20, n: ["$STRID_KEY_SPACE"], a: 0x3e, an: "SPACE", s: 0x2c },

    // Right Alt/Option
    { t: 2, v: 0xa5, n: { win: ["$STRID_RIGHT", " Alt"], mac: ["$STRID_RIGHT", " Option"] }, a: 0x3a, an: "ALTR", s: 0xe6 },

    { t: 2, v: 0x5d, n: "Apps",       a: 0xbb, an: "APP",       s: 0x65 },
    { t: 2, v: 0xa3, n: ["$STRID_RIGHT", " Ctrl"], a: 0x72, an: "CTRLR",     s: 0xe4 },
    { t: 2, v: 0x2c, n: "Print",      a: 0x78, an: "PRINT",     s: 0x46 },
    { t: 2, v: 0x91, n: "Scroll",     a: 0x74, an: "SCROLL",    s: 0x47 },
    { t: 2, v: 0x13, n: "Pause",      a: 0x79, an: "PAUSE",     s: 0x48 },
    { t: 2, v: 0x2d, n: "Insert",     a: 0x7c, an: "INSERT",    s: 0x49 },
    { t: 2, v: 0x24, n: "Home",       a: 0x3,  an: "HOME",      s: 0x4a },
    { t: 2, v: 0x21, n: "Page Up",    a: 0x5c, an: "PAGEUP",    s: 0x4b },
    { t: 2, v: 0x2e, n: "Delete",     a: 0x70, an: "DELETE",    s: 0x4c },
    { t: 2, v: 0x23, n: "End",        a: 0x7b, an: "END",       s: 0x4d },
    { t: 2, v: 0x22, n: "Page Down",  a: 0x5d, an: "PAGEDOWN",  s: 0x4e },
    { t: 2, v: 0x26, n: ["$STRID_KEY_ARROW_UP"],    a: 0x13, an: "UPARROW",    s: 0x52 },
    { t: 2, v: 0x28, n: ["$STRID_KEY_ARROW_DOWN"],  a: 0x14, an: "DOWNARROW",  s: 0x51 },
    { t: 2, v: 0x25, n: ["$STRID_KEY_ARROW_LEFT"],  a: 0x15, an: "LEFTARROW",  s: 0x50 },
    { t: 2, v: 0x27, n: ["$STRID_KEY_ARROW_RIGHT"], a: 0x16, an: "RIGHTARROW", s: 0x4f },

    // Keypad
    { t: 2, v: 0x61, n: "Num 1", a: 0x91, an: "KPD1", s: 0x59 },
    { t: 2, v: 0x62, n: "Num 2", a: 0x92, an: "KPD2", s: 0x5a },
    { t: 2, v: 0x63, n: "Num 3", a: 0x93, an: "KPD3", s: 0x5b },
    { t: 2, v: 0x64, n: "Num 4", a: 0x94, an: "KPD4", s: 0x5c },
    { t: 2, v: 0x65, n: "Num 5", a: 0x95, an: "KPD5", s: 0x5d },
    { t: 2, v: 0x66, n: "Num 6", a: 0x96, an: "KPD6", s: 0x5e },
    { t: 2, v: 0x67, n: "Num 7", a: 0x97, an: "KPD7", s: 0x5f },
    { t: 2, v: 0x68, n: "Num 8", a: 0x98, an: "KPD8", s: 0x60 },
    { t: 2, v: 0x69, n: "Num 9", a: 0x99, an: "KPD9", s: 0x61 },
    { t: 2, v: 0x60, n: "Num 0",      a: 0x90, an: "KPD0",       s: 0x62 },
    { t: 2, v: 0x90, n: "Num Lock",   a: 0x8f, an: "NUMLOCK",    s: 0x53 },
    { t: 2, v: 0x6f, n: "Num /",      a: 0x9a, an: "KPDSLASH",   s: 0x54 },
    { t: 2, v: 0x6a, n: "Num *",      a: 0x9b, an: "KPDSTAR",    s: 0x55 },
    { t: 2, v: 0x6d, n: "Num -",      a: 0x9c, an: "KPDMINUS",   s: 0x56 },
    { t: 2, v: 0x6b, n: "Num +",      a: 0x9d, an: "KPDPLUS",    s: 0x57 },
    { t: 2, v: 0x6e, n: "Num .",      a: 0x9e, an: "KPDDOT",     s: 0x63 },
    { t: 2, v: 0xe,  n: "Num Enter",  a: 0xa0, an: "KPDENTER",   s: 0x58 },

    // Media keys
    { t: 3, v: 0x201, n: ["$STRID_KEY_MEDIA_MUTE"],            a: 0, an: "Mute",              s: 0x201 },
    { t: 3, v: 0x202, n: ["$STRID_KEY_MEDIA_VOLUME_UP"],       a: 0, an: "VolumeUp",          s: 0x202 },
    { t: 3, v: 0x203, n: ["$STRID_KEY_MEDIA_VOLUME_DOWN"],     a: 0, an: "VolumeDown",        s: 0x203 },
    { t: 3, v: 0x204, n: ["$STRID_KEY_MEDIA_PLAY_PAUSE"],      a: 0, an: "PlayPause",          s: 0x204 },
    { t: 3, v: 0x205, n: ["$STRID_KEY_MEDIA_STOP"],            a: 0, an: "Stop",              s: 0x205 },
    { t: 3, v: 0x206, n: ["$STRID_KEY_MEDIA_PREVIOUS_TRACK"],  a: 0, an: "ScanPreviousTrack",  s: 0x206 },
    { t: 3, v: 0x207, n: ["$STRID_KEY_MEDIA_NEXT_TRACK"],      a: 0, an: "ScanNextTrack",      s: 0x207 },
    { t: 3, v: 0x208, n: ["$STRID_KEY_MEDIA_MAIL"],            a: 0, an: "Mail",              s: 0x208 },
    { t: 3, v: 0x209, n: ["$STRID_KEY_MEDIA_CALCULATOR"],      a: 0, an: "Calculator",        s: 0x209 },
    { t: 3, v: 0x20a, n: ["$STRID_KEY_MEDIA_MY_COMPUTER"],     a: 0, an: "MyComputer",         s: 0x20a },
    { t: 3, v: 0x20b, n: ["$STRID_KEY_MEDIA_WWW_SEARCH"],      a: 0, an: "WWWSearch",         s: 0x20b },
    { t: 3, v: 0x20c, n: ["$STRID_KEY_MEDIA_WWW_HOME"],        a: 0, an: "WWWHome",           s: 0x20c },
    { t: 3, v: 0x20d, n: ["$STRID_KEY_MEDIA_WWW_REFRESH"],     a: 0, an: "WWWRefresh",        s: 0x20d },
    { t: 3, v: 0x20e, n: ["$STRID_KEY_MEDIA_WWW_STOP"],        a: 0, an: "WWWStop",           s: 0x20e },
    { t: 3, v: 0x20f, n: ["$STRID_KEY_MEDIA_WWW_FORWARD"],     a: 0, an: "WWWForward",        s: 0x20f },
    { t: 3, v: 0x210, n: ["$STRID_KEY_MEDIA_WWW_BACK"],        a: 0, an: "WWWBack",           s: 0x210 },
  ],

  kbd_5_15: [
    { t: 2, v: 0x1b, n: "Esc",       a: 0x6f, an: "ESC",     s: 0x29, id: 0x29, r: 0, c: 0,  rect: [0x28, 0x3a, 0x24, 0x2a] },
    { t: 2, v: 0x31, n: "1",         a: 0x8,  an: "NUM1",    s: 0x1e, id: 0x1e, r: 0, c: 1,  rect: [0x14, 0x3a, 0x24, 0x2a] },
    { t: 2, v: 0x32, n: "2",         a: 0x9,  an: "NUM2",    s: 0x1f, id: 0x1f, r: 0, c: 2,  rect: [0x14, 0x3a, 0x24, 0x2a] },
    { t: 2, v: 0x33, n: "3",         a: 0xa,  an: "NUM3",    s: 0x20, id: 0x20, r: 0, c: 3,  rect: [0x14, 0x3a, 0x24, 0x2a] },
    { t: 2, v: 0x34, n: "4",         a: 0xb,  an: "NUM4",    s: 0x21, id: 0x21, r: 0, c: 4,  rect: [0x13, 0x3a, 0x24, 0x2a] },
    { t: 2, v: 0x35, n: "5",         a: 0xc,  an: "NUM5",    s: 0x22, id: 0x22, r: 0, c: 5,  rect: [0x14, 0x3a, 0x24, 0x2a] },
    { t: 2, v: 0x36, n: "6",         a: 0xd,  an: "NUM6",    s: 0x23, id: 0x23, r: 0, c: 6,  rect: [0x13, 0x3a, 0x24, 0x2a] },
    { t: 2, v: 0x37, n: "7",         a: 0xe,  an: "NUM7",    s: 0x24, id: 0x24, r: 0, c: 7,  rect: [0x14, 0x3a, 0x24, 0x2a] },
    { t: 2, v: 0x38, n: "8",         a: 0xf,  an: "NUM8",    s: 0x25, id: 0x25, r: 0, c: 8,  rect: [0x14, 0x3a, 0x24, 0x2a] },
    { t: 2, v: 0x39, n: "9",         a: 0x10, an: "NUM9",    s: 0x26, id: 0x26, r: 0, c: 9,  rect: [0x13, 0x3a, 0x24, 0x2a] },
    { t: 2, v: 0x30, n: "0",         a: 0x7,  an: "NUM0",    s: 0x27, id: 0x27, r: 0, c: 10, rect: [0x14, 0x3a, 0x24, 0x2a] },
    { t: 2, v: 0xbd, n: "-",         a: 0x45, an: "UNDERSCORE",  s: 0x2d, id: 0x2d, r: 0, c: 11, rect: [0x13, 0x3a, 0x24, 0x2a] },
    { t: 2, v: 0xbb, n: "=  +",      a: 0x46, an: "EQUAL",   s: 0x2e, id: 0x2e, r: 0, c: 12, rect: [0x14, 0x3a, 0x24, 0x2a] },
    { t: 2, v: 0x8,  n: "Backspace", a: 0x43, an: "BACKSPACE", s: 0x2a, id: 0x2a, r: 0, c: 13, rect: [0x14, 0x3a, 0x5a, 0x2a] },
    { t: 2, v: 0x24, n: "Home",      a: 0x3,  an: "HOME",    s: 0x4a, id: 0x4a, r: 0, c: 14, rect: [0x15, 0x3a, 0x24, 0x2a] },

    { t: 2, v: 0x9,  n: "Tab",       a: 0x3d, an: "TAB",     s: 0x2b, id: 0x2b, r: 1, c: 0,  rect: [0x29, 0xe, 0x3e, 0x2a] },
    { t: 2, v: 0x51, n: "Q",         a: 0x2d, an: "Q",       s: 0x14, id: 0x14, r: 1, c: 1,  rect: [0x14, 0xe, 0x24, 0x2a] },
    { t: 2, v: 0x57, n: "W",         a: 0x33, an: "W",       s: 0x1a, id: 0x1a, r: 1, c: 2,  rect: [0x14, 0xe, 0x24, 0x2a] },
    { t: 2, v: 0x45, n: "E",         a: 0x21, an: "E",       s: 0x8,  id: 0x8,  r: 1, c: 3,  rect: [0x14, 0xe, 0x24, 0x2a] },
    { t: 2, v: 0x52, n: "R",         a: 0x2e, an: "R",       s: 0x15, id: 0x15, r: 1, c: 4,  rect: [0x14, 0xe, 0x24, 0x2a] },
    { t: 2, v: 0x54, n: "T",         a: 0x30, an: "T",       s: 0x17, id: 0x17, r: 1, c: 5,  rect: [0x14, 0xe, 0x24, 0x2a] },
    { t: 2, v: 0x59, n: "Y",         a: 0x35, an: "Y",       s: 0x1c, id: 0x1c, r: 1, c: 6,  rect: [0x13, 0xe, 0x24, 0x2a] },
    { t: 2, v: 0x55, n: "U",         a: 0x31, an: "U",       s: 0x18, id: 0x18, r: 1, c: 7,  rect: [0x14, 0xe, 0x24, 0x2a] },
    { t: 2, v: 0x49, n: "I",         a: 0x25, an: "I",       s: 0xc,  id: 0xc,  r: 1, c: 8,  rect: [0x14, 0xe, 0x24, 0x2a] },
    { t: 2, v: 0x4f, n: "O",         a: 0x2b, an: "O",       s: 0x12, id: 0x12, r: 1, c: 9,  rect: [0x13, 0xe, 0x24, 0x2a] },
    { t: 2, v: 0x50, n: "P",         a: 0x2c, an: "P",       s: 0x13, id: 0x13, r: 1, c: 10, rect: [0x14, 0xe, 0x24, 0x2a] },
    { t: 2, v: 0xdb, n: "[  {",      a: 0x47, an: "LEFTBRACE",   s: 0x2f, id: 0x2f, r: 1, c: 11, rect: [0x13, 0xe, 0x24, 0x2a] },
    { t: 2, v: 0xdd, n: "]  }",      a: 0x48, an: "RIGHTBRACE",  s: 0x30, id: 0x30, r: 1, c: 12, rect: [0x14, 0xe, 0x24, 0x2a] },
    { t: 2, v: 0xdc, n: "\\  |",     a: 0x49, an: "VERTICALBAR", s: 0x31, id: 0x31, r: 1, c: 13, rect: [0x14, 0xe, 0x3e, 0x2a] },
    { t: 2, v: 0x2e, n: "Del",       a: 0x70, an: "DELETE",  s: 0x4c, id: 0x4c, r: 1, c: 14, rect: [0x15, 0xe, 0x24, 0x2a] },

    { t: 2, v: 0x14, n: "Caps Lock", a: 0x73, an: "CAPSLOCK", s: 0x39, id: 0x39, r: 2, c: 0,  rect: [0x29, 0xe, 0x4d, 0x29] },
    { t: 2, v: 0x41, n: "A",         a: 0x1d, an: "A",       s: 0x4,  id: 0x4,  r: 2, c: 1,  rect: [0x14, 0xe, 0x24, 0x29] },
    { t: 2, v: 0x53, n: "S",         a: 0x2f, an: "S",       s: 0x16, id: 0x16, r: 2, c: 2,  rect: [0x14, 0xe, 0x24, 0x29] },
    { t: 2, v: 0x44, n: "D",         a: 0x20, an: "D",       s: 0x7,  id: 0x7,  r: 2, c: 3,  rect: [0x13, 0xe, 0x24, 0x29] },
    { t: 2, v: 0x46, n: "F",         a: 0x22, an: "F",       s: 0x9,  id: 0x9,  r: 2, c: 4,  rect: [0x14, 0xe, 0x24, 0x29] },
    { t: 2, v: 0x47, n: "G",         a: 0x23, an: "G",       s: 0xa,  id: 0xa,  r: 2, c: 5,  rect: [0x13, 0xe, 0x24, 0x29] },
    { t: 2, v: 0x48, n: "H",         a: 0x24, an: "H",       s: 0xb,  id: 0xb,  r: 2, c: 6,  rect: [0x14, 0xe, 0x24, 0x29] },
    { t: 2, v: 0x4a, n: "J",         a: 0x26, an: "J",       s: 0xd,  id: 0xd,  r: 2, c: 7,  rect: [0x14, 0xe, 0x24, 0x29] },
    { t: 2, v: 0x4b, n: "K",         a: 0x27, an: "K",       s: 0xe,  id: 0xe,  r: 2, c: 8,  rect: [0x14, 0xe, 0x24, 0x29] },
    { t: 2, v: 0x4c, n: "L",         a: 0x28, an: "L",       s: 0xf,  id: 0xf,  r: 2, c: 9,  rect: [0x13, 0xe, 0x24, 0x29] },
    { t: 2, v: 0xba, n: ";  :",      a: 0x4a, an: "COLON",   s: 0x33, id: 0x33, r: 2, c: 10, rect: [0x14, 0xe, 0x24, 0x29] },
    { t: 2, v: 0xde, n: "'  \"",     a: 0x4b, an: "QUOTE",   s: 0x34, id: 0x34, r: 2, c: 11, rect: [0x14, 0xe, 0x24, 0x29] },
    { t: 2, v: 0xd,  n: "Enter",     a: 0x42, an: "ENTER",   s: 0x28, id: 0x28, r: 2, c: 12, rect: [0x13, 0xe, 0x6a, 0x29] },
    { t: 2, v: 0x0,  n: "",          a: 0,    an: "NONE",    s: 0,    id: 0,    r: 2, c: 13, rect: [0, 0, 0, 0] },
    { t: 2, v: 0x21, n: "Page Up",   a: 0x5c, an: "PAGEUP",  s: 0x4b, id: 0x4b, r: 2, c: 14, rect: [0x13, 0xe, 0x24, 0x29] },

    { t: 2, v: 0xa0, n: ["$STRID_LEFT", " Shift"], a: 0x3b, an: "SHIFT", s: 0xe1, id: 0xe1, r: 3, c: 0,  rect: [0x29, 0xe, 0x68, 0x28] },
    { t: 2, v: 0x0,  n: "",          a: 0, an: "NONE",  s: 0,    id: 0,    r: 3, c: 1,  rect: [0, 0, 0, 0] },
    { t: 2, v: 0x5a, n: "Z",         a: 0x36, an: "Z",   s: 0x1d, id: 0x1d, r: 3, c: 2,  rect: [0x15, 0xe, 0x24, 0x28] },
    { t: 2, v: 0x58, n: "X",         a: 0x34, an: "X",   s: 0x1b, id: 0x1b, r: 3, c: 3,  rect: [0x14, 0xe, 0x24, 0x28] },
    { t: 2, v: 0x43, n: "C",         a: 0x1f, an: "C",   s: 0x6,  id: 0x6,  r: 3, c: 4,  rect: [0x14, 0xe, 0x24, 0x28] },
    { t: 2, v: 0x56, n: "V",         a: 0x32, an: "V",   s: 0x19, id: 0x19, r: 3, c: 5,  rect: [0x13, 0xe, 0x24, 0x28] },
    { t: 2, v: 0x42, n: "B",         a: 0x1e, an: "B",   s: 0x5,  id: 0x5,  r: 3, c: 6,  rect: [0x14, 0xe, 0x24, 0x28] },
    { t: 2, v: 0x4e, n: "N",         a: 0x2a, an: "N",   s: 0x11, id: 0x11, r: 3, c: 7,  rect: [0x13, 0xe, 0x24, 0x28] },
    { t: 2, v: 0x4d, n: "M",         a: 0x29, an: "M",   s: 0x10, id: 0x10, r: 3, c: 8,  rect: [0x14, 0xe, 0x24, 0x28] },
    { t: 2, v: 0xbc, n: ",  <",      a: 0x37, an: "LESSTHAN",   s: 0x36, id: 0x36, r: 3, c: 9,  rect: [0x13, 0xe, 0x24, 0x28] },
    { t: 2, v: 0xbe, n: ".  >",      a: 0x38, an: "GREATTHAN",  s: 0x37, id: 0x37, r: 3, c: 10, rect: [0x14, 0xe, 0x24, 0x28] },
    { t: 2, v: 0xbf, n: "/  ?",      a: 0x4c, an: "QUESTION",   s: 0x38, id: 0x38, r: 3, c: 11, rect: [0x13, 0xe, 0x24, 0x28] },
    { t: 2, v: 0xa1, n: ["$STRID_RIGHT", " Shift"], a: 0x3c, an: "SHIFTR", s: 0xe5, id: 0xe5, r: 3, c: 12, rect: [0x14, 0xe, 0x4d, 0x28] },
    { t: 2, v: 0x26, n: "\u2191",     a: 0x13, an: "UPARROW",    s: 0x52, id: 0x52, r: 3, c: 13, rect: [0x15, 0xe, 0x24, 0x28] },
    { t: 2, v: 0x22, n: "Page Down", a: 0x5d, an: "PAGEDOWN",   s: 0x4e, id: 0x4e, r: 3, c: 14, rect: [0x14, 0xe, 0x24, 0x28] },

    { t: 2, v: 0xa2, n: ["$STRID_LEFT", " Ctrl"], a: 0x71, an: "CTRL", s: 0xe0, id: 0xe0, r: 4, c: 0, rect: [0x29, 0x10, 0x30, 0x28] },
    { t: 2, v: 0x5b, n: { win: ["$STRID_LEFT", " Win"], mac: ["$STRID_LEFT", " Command"] }, a: 0xab, an: "WINDOWS", s: 0xe3, id: 0xe3, r: 4, c: 1, rect: [0x15, 0x10, 0x30, 0x28] },
    { t: 2, v: 0xa4, n: { win: ["$STRID_LEFT", " Alt"], mac: ["$STRID_LEFT", " Option"] },   a: 0x39, an: "ALT",     s: 0xe2, id: 0xe2, r: 4, c: 2, rect: [0x15, 0x10, 0x30, 0x28] },
    { t: 2, v: 0x0,  n: "",   a: 0,   an: "NONE", s: 0,   id: 0,   r: 4, c: 3,  rect: [0, 0, 0, 0] },
    { t: 2, v: 0x0,  n: "",   a: 0,   an: "NONE", s: 0,   id: 0,   r: 4, c: 4,  rect: [0, 0, 0, 0] },
    { t: 2, v: 0x0,  n: "",   a: 0,   an: "NONE", s: 0,   id: 0,   r: 4, c: 5,  rect: [0, 0, 0, 0] },
    { t: 2, v: 0x20, n: ["$STRID_KEY_SPACE"], a: 0x3e, an: "SPACE", s: 0x2c, id: 0x2c, r: 4, c: 6, rect: [0x15, 0x10, 0x149, 0x28] },
    { t: 2, v: 0x0,  n: "",   a: 0,   an: "NONE", s: 0,   id: 0,   r: 4, c: 7,  rect: [0, 0, 0, 0] },
    { t: 2, v: 0x0,  n: "",   a: 0,   an: "NONE", s: 0,   id: 0,   r: 4, c: 8,  rect: [0, 0, 0, 0] },
    { t: 2, v: 0xa5, n: { win: ["$STRID_RIGHT", " Alt"], mac: ["$STRID_RIGHT", " Option"] }, a: 0x3a, an: "ALTR", s: 0xe6, id: 0xe6, r: 4, c: 9, rect: [0x16, 0x10, 0x22, 0x28] },
    { t: 2, v: 0x5d, n: "Fn", a: 0xbb, an: "APP",     s: 0x65,  id: 0x5221, r: 4, c: 10, rect: [0x15, 0x10, 0x22, 0x28] },
    { t: 2, v: 0xa3, n: ["$STRID_RIGHT", " Ctrl"],   a: 0x72, an: "CTRLR",   s: 0xe4, id: 0xe4, r: 4, c: 11, rect: [0x16, 0x10, 0x22, 0x28] },
    { t: 2, v: 0x25, n: "\u2190",    a: 0x15, an: "LEFTARROW",  s: 0x50, id: 0x50, r: 4, c: 12, rect: [0x15, 0x10, 0x22, 0x28] },
    { t: 2, v: 0x28, n: "\u2193",    a: 0x14, an: "DOWNARROW",  s: 0x51, id: 0x51, r: 4, c: 13, rect: [0x15, 0x10, 0x22, 0x28] },
    { t: 2, v: 0x27, n: "\u2192",    a: 0x16, an: "RIGHTARROW", s: 0x4f, id: 0x4f, r: 4, c: 14, rect: [0x16, 0x10, 0x22, 0x28] },
  ],

  kbd_5_14: [
    { t: 2, v: 0x1b, n: "Esc",       a: 0x6f, an: "ESC",  s: 0x29, id: 0x29, r: 0, c: 0,  rect: [0x11, 0x16, 0x38, 0x39] },
    { t: 2, v: 0x31, n: "1",         a: 0x8,  an: "NUM1", s: 0x1e, id: 0x1e, r: 0, c: 1,  rect: [0x5, 0x16, 0x38, 0x39] },
    { t: 2, v: 0x32, n: "2",         a: 0x9,  an: "NUM2", s: 0x1f, id: 0x1f, r: 0, c: 2,  rect: [0x4, 0x16, 0x38, 0x39] },
    { t: 2, v: 0x33, n: "3",         a: 0xa,  an: "NUM3", s: 0x20, id: 0x20, r: 0, c: 3,  rect: [0x4, 0x16, 0x38, 0x39] },
    { t: 2, v: 0x34, n: "4",         a: 0xb,  an: "NUM4", s: 0x21, id: 0x21, r: 0, c: 4,  rect: [0x5, 0x16, 0x38, 0x39] },
    { t: 2, v: 0x35, n: "5",         a: 0xc,  an: "NUM5", s: 0x22, id: 0x22, r: 0, c: 5,  rect: [0x4, 0x16, 0x38, 0x39] },
    { t: 2, v: 0x36, n: "6",         a: 0xd,  an: "NUM6", s: 0x23, id: 0x23, r: 0, c: 6,  rect: [0x5, 0x16, 0x38, 0x39] },
    { t: 2, v: 0x37, n: "7",         a: 0xe,  an: "NUM7", s: 0x24, id: 0x24, r: 0, c: 7,  rect: [0x4, 0x16, 0x38, 0x39] },
    { t: 2, v: 0x38, n: "8",         a: 0xf,  an: "NUM8", s: 0x25, id: 0x25, r: 0, c: 8,  rect: [0x4, 0x16, 0x38, 0x39] },
    { t: 2, v: 0x39, n: "9",         a: 0x10, an: "NUM9", s: 0x26, id: 0x26, r: 0, c: 9,  rect: [0x5, 0x16, 0x38, 0x39] },
    { t: 2, v: 0x30, n: "0",         a: 0x7,  an: "NUM0", s: 0x27, id: 0x27, r: 0, c: 10, rect: [0x4, 0x16, 0x38, 0x39] },
    { t: 2, v: 0xbd, n: "-",         a: 0x45, an: "UNDERSCORE", s: 0x2d, id: 0x2d, r: 0, c: 11, rect: [0x5, 0x16, 0x38, 0x39] },
    { t: 2, v: 0xbb, n: "=  +",      a: 0x46, an: "EQUAL",     s: 0x2e, id: 0x2e, r: 0, c: 12, rect: [0x4, 0x16, 0x38, 0x39] },
    { t: 2, v: 0x8,  n: "Backspace", a: 0x43, an: "BACKSPACE", s: 0x2a, id: 0x2a, r: 0, c: 13, rect: [0x4, 0x16, 0x72, 0x39] },

    { t: 2, v: 0x9,  n: "Tab",       a: 0x3d, an: "TAB",     s: 0x2b, id: 0x2b, r: 1, c: 0,  rect: [0x11, 0x4, 0x55, 0x39] },
    { t: 2, v: 0x51, n: "Q",         a: 0x2d, an: "Q",       s: 0x14, id: 0x14, r: 1, c: 1,  rect: [0x5, 0x4, 0x38, 0x39] },
    { t: 2, v: 0x57, n: "W",         a: 0x33, an: "W",       s: 0x1a, id: 0x1a, r: 1, c: 2,  rect: [0x5, 0x4, 0x38, 0x39] },
    { t: 2, v: 0x45, n: "E",         a: 0x21, an: "E",       s: 0x8,  id: 0x8,  r: 1, c: 3,  rect: [0x4, 0x4, 0x38, 0x39] },
    { t: 2, v: 0x52, n: "R",         a: 0x2e, an: "R",       s: 0x15, id: 0x15, r: 1, c: 4,  rect: [0x4, 0x4, 0x38, 0x39] },
    { t: 2, v: 0x54, n: "T",         a: 0x30, an: "T",       s: 0x17, id: 0x17, r: 1, c: 5,  rect: [0x4, 0x4, 0x38, 0x39] },
    { t: 2, v: 0x59, n: "Y",         a: 0x35, an: "Y",       s: 0x1c, id: 0x1c, r: 1, c: 6,  rect: [0x5, 0x4, 0x38, 0x39] },
    { t: 2, v: 0x55, n: "U",         a: 0x31, an: "U",       s: 0x18, id: 0x18, r: 1, c: 7,  rect: [0x4, 0x4, 0x38, 0x39] },
    { t: 2, v: 0x49, n: "I",         a: 0x25, an: "I",       s: 0xc,  id: 0xc,  r: 1, c: 8,  rect: [0x4, 0x4, 0x38, 0x39] },
    { t: 2, v: 0x4f, n: "O",         a: 0x2b, an: "O",       s: 0x12, id: 0x12, r: 1, c: 9,  rect: [0x4, 0x4, 0x38, 0x39] },
    { t: 2, v: 0x50, n: "P",         a: 0x2c, an: "P",       s: 0x13, id: 0x13, r: 1, c: 10, rect: [0x4, 0x4, 0x38, 0x39] },
    { t: 2, v: 0xdb, n: "[  {",      a: 0x47, an: "LEFTBRACE",   s: 0x2f, id: 0x2f, r: 1, c: 11, rect: [0x5, 0x4, 0x38, 0x39] },
    { t: 2, v: 0xdd, n: "]  }",      a: 0x48, an: "RIGHTBRACE",  s: 0x30, id: 0x30, r: 1, c: 12, rect: [0x4, 0x4, 0x38, 0x39] },
    { t: 2, v: 0xdc, n: "\\  |",     a: 0x49, an: "VERTICALBAR", s: 0x31, id: 0x31, r: 1, c: 13, rect: [0x4, 0x4, 0x55, 0x39] },

    { t: 2, v: 0x14, n: "Caps Lock", a: 0x73, an: "CAPSLOCK", s: 0x39, id: 0x39, r: 2, c: 0,  rect: [0x11, 0x4, 0x64, 0x39] },
    { t: 2, v: 0x41, n: "A",         a: 0x1d, an: "A",       s: 0x4,  id: 0x4,  r: 2, c: 1,  rect: [0x4, 0x4, 0x38, 0x39] },
    { t: 2, v: 0x53, n: "S",         a: 0x2f, an: "S",       s: 0x16, id: 0x16, r: 2, c: 2,  rect: [0x5, 0x4, 0x38, 0x39] },
    { t: 2, v: 0x44, n: "D",         a: 0x20, an: "D",       s: 0x7,  id: 0x7,  r: 2, c: 3,  rect: [0x5, 0x4, 0x38, 0x39] },
    { t: 2, v: 0x46, n: "F",         a: 0x22, an: "F",       s: 0x9,  id: 0x9,  r: 2, c: 4,  rect: [0x5, 0x4, 0x38, 0x39] },
    { t: 2, v: 0x47, n: "G",         a: 0x23, an: "G",       s: 0xa,  id: 0xa,  r: 2, c: 5,  rect: [0x4, 0x4, 0x38, 0x39] },
    { t: 2, v: 0x48, n: "H",         a: 0x24, an: "H",       s: 0xb,  id: 0xb,  r: 2, c: 6,  rect: [0x5, 0x4, 0x38, 0x39] },
    { t: 2, v: 0x4a, n: "J",         a: 0x26, an: "J",       s: 0xd,  id: 0xd,  r: 2, c: 7,  rect: [0x4, 0x4, 0x38, 0x39] },
    { t: 2, v: 0x4b, n: "K",         a: 0x27, an: "K",       s: 0xe,  id: 0xe,  r: 2, c: 8,  rect: [0x4, 0x4, 0x38, 0x39] },
    { t: 2, v: 0x4c, n: "L",         a: 0x28, an: "L",       s: 0xf,  id: 0xf,  r: 2, c: 9,  rect: [0x5, 0x4, 0x38, 0x39] },
    { t: 2, v: 0xba, n: ";  :",      a: 0x4a, an: "COLON",   s: 0x33, id: 0x33, r: 2, c: 10, rect: [0x4, 0x4, 0x38, 0x39] },
    { t: 2, v: 0xde, n: "'  \"",     a: 0x4b, an: "QUOTE",   s: 0x34, id: 0x34, r: 2, c: 11, rect: [0x5, 0x4, 0x38, 0x39] },
    { t: 2, v: 0x0,  n: "",          a: 0,    an: "NONE",    s: 0,    id: 0,    r: 2, c: 12, rect: [0, 0, 0, 0] },
    { t: 2, v: 0xd,  n: "Enter",     a: 0x42, an: "ENTER",   s: 0x28, id: 0x28, r: 2, c: 13, rect: [0x5, 0x4, 0x80, 0x39] },

    { t: 2, v: 0xa0, n: ["$STRID_LEFT", " Shift"], a: 0x3b, an: "SHIFT", s: 0xe1, id: 0xe1, r: 3, c: 0,  rect: [0x12, 0x4, 0x82, 0x39] },
    { t: 2, v: 0x0,  n: "",     a: 0,   an: "NONE", s: 0,   id: 0,   r: 3, c: 1,  rect: [0, 0, 0, 0] },
    { t: 2, v: 0x5a, n: "Z",    a: 0x36, an: "Z",   s: 0x1d, id: 0x1d, r: 3, c: 2,  rect: [0x4, 0x4, 0x38, 0x39] },
    { t: 2, v: 0x58, n: "X",    a: 0x34, an: "X",   s: 0x1b, id: 0x1b, r: 3, c: 3,  rect: [0x5, 0x4, 0x38, 0x39] },
    { t: 2, v: 0x43, n: "C",    a: 0x1f, an: "C",   s: 0x6,  id: 0x6,  r: 3, c: 4,  rect: [0x5, 0x4, 0x38, 0x39] },
    { t: 2, v: 0x56, n: "V",    a: 0x32, an: "V",   s: 0x19, id: 0x19, r: 3, c: 5,  rect: [0x5, 0x4, 0x38, 0x39] },
    { t: 2, v: 0x42, n: "B",    a: 0x1e, an: "B",   s: 0x5,  id: 0x5,  r: 3, c: 6,  rect: [0x4, 0x4, 0x38, 0x39] },
    { t: 2, v: 0x4e, n: "N",    a: 0x2a, an: "N",   s: 0x11, id: 0x11, r: 3, c: 7,  rect: [0x5, 0x4, 0x38, 0x39] },
    { t: 2, v: 0x4d, n: "M",    a: 0x29, an: "M",   s: 0x10, id: 0x10, r: 3, c: 8,  rect: [0x4, 0x4, 0x38, 0x39] },
    { t: 2, v: 0xbc, n: ",  <", a: 0x37, an: "LESSTHAN",   s: 0x36, id: 0x36, r: 3, c: 9,  rect: [0x4, 0x4, 0x38, 0x39] },
    { t: 2, v: 0xbe, n: ".  >", a: 0x38, an: "GREATTHAN",  s: 0x37, id: 0x37, r: 3, c: 10, rect: [0x5, 0x4, 0x38, 0x39] },
    { t: 2, v: 0xbf, n: "/  ?", a: 0x4c, an: "QUESTION",   s: 0x38, id: 0x38, r: 3, c: 11, rect: [0x4, 0x4, 0x38, 0x39] },
    { t: 2, v: 0xa1, n: ["$STRID_RIGHT", " Shift"], a: 0x3c, an: "SHIFTR", s: 0xe5, id: 0xe5, r: 3, c: 12, rect: [0x5, 0x4, 0x9d, 0x39] },
    { t: 2, v: 0x0,  n: "",     a: 0,   an: "NONE", s: 0,   id: 0,   r: 3, c: 13, rect: [0, 0, 0, 0] },

    { t: 2, v: 0xa2, n: ["$STRID_LEFT", " Ctrl"], a: 0x71, an: "CTRL", s: 0xe0, id: 0xe0, r: 4, c: 0, rect: [0x12, 0x6, 0x46, 0x39] },
    { t: 2, v: 0x5b, n: { win: ["$STRID_LEFT", " Win"], mac: ["$STRID_LEFT", " Command"] }, a: 0xab, an: "WINDOWS", s: 0xe3, id: 0xe3, r: 4, c: 1, rect: [0x6, 0x6, 0x46, 0x39] },
    { t: 2, v: 0xa4, n: { win: ["$STRID_LEFT", " Alt"], mac: ["$STRID_LEFT", " Option"] },   a: 0x39, an: "ALT",     s: 0xe2, id: 0xe2, r: 4, c: 2, rect: [0x6, 0x6, 0x46, 0x39] },
    { t: 2, v: 0x0,  n: "",   a: 0,   an: "NONE", s: 0,   id: 0,   r: 4, c: 3,  rect: [0, 0, 0, 0] },
    { t: 2, v: 0x0,  n: "",   a: 0,   an: "NONE", s: 0,   id: 0,   r: 4, c: 4,  rect: [0, 0, 0, 0] },
    { t: 2, v: 0x0,  n: "",   a: 0,   an: "NONE", s: 0,   id: 0,   r: 4, c: 5,  rect: [0, 0, 0, 0] },
    { t: 2, v: 0x20, n: ["$STRID_KEY_SPACE"], a: 0x3e, an: "SPACE", s: 0x2c, id: 0x2c, r: 4, c: 6, rect: [0x7, 0x6, 0x16a, 0x39] },
    { t: 2, v: 0x0,  n: "",   a: 0,   an: "NONE", s: 0,   id: 0,   r: 4, c: 7,  rect: [0, 0, 0, 0] },
    { t: 2, v: 0x0,  n: "",   a: 0,   an: "NONE", s: 0,   id: 0,   r: 4, c: 8,  rect: [0, 0, 0, 0] },
    { t: 2, v: 0xa5, n: { win: ["$STRID_RIGHT", " Alt"], mac: ["$STRID_RIGHT", " Option"] }, a: 0x3a, an: "ALTR", s: 0xe6, id: 0xe6, r: 4, c: 9, rect: [0x6, 0x6, 0x46, 0x39] },
    { t: 2, v: 0x12, n: "App", a: 0x52, an: "NONE", s: 0,    id: 0x65,  r: 4, c: 10, rect: [0x6, 0x6, 0x46, 0x39] },
    { t: 2, v: 0xa3, n: ["$STRID_RIGHT", " Ctrl"], a: 0x72, an: "CTRLR", s: 0xe4, id: 0xe4, r: 4, c: 11, rect: [0x6, 0x6, 0x46, 0x39] },
    { t: 2, v: 0x5d, n: "Fn", a: 0xbb, an: "APP", s: 0x65, id: 0x5221, r: 4, c: 12, rect: [0x6, 0x6, 0x46, 0x39] },
    { t: 2, v: 0x0,  n: "",   a: 0,   an: "NONE", s: 0,   id: 0,   r: 4, c: 13, rect: [0, 0, 0, 0] },
  ],

  kbd_select: [
    { t: 2, v: 0x1b, n: "Esc",       a: 0x6f, an: "ESC",     s: 0x29, id: 0x29, rect: [0, 6, 0x55, 0x25] },
    { t: 2, v: 0x70, n: "F1",        a: 0x83, an: "F1",      s: 0x3a, id: 0x3a, rect: [0x18, 6, 0x28, 0x25] },
    { t: 2, v: 0x71, n: "F2",        a: 0x84, an: "F2",      s: 0x3b, id: 0x3b, rect: [5, 6, 0x28, 0x25] },
    { t: 2, v: 0x72, n: "F3",        a: 0x85, an: "F2",      s: 0x3c, id: 0x3c, rect: [5, 6, 0x28, 0x25] },
    { t: 2, v: 0x73, n: "F4",        a: 0x86, an: "F4",      s: 0x3d, id: 0x3d, rect: [5, 6, 0x28, 0x25] },
    { t: 2, v: 0x74, n: "F5",        a: 0x87, an: "F5",      s: 0x3e, id: 0x3e, rect: [0x12, 6, 0x28, 0x25] },
    { t: 2, v: 0x75, n: "F6",        a: 0x88, an: "F6",      s: 0x3f, id: 0x3f, rect: [5, 6, 0x28, 0x25] },
    { t: 2, v: 0x76, n: "F7",        a: 0x89, an: "F7",      s: 0x40, id: 0x40, rect: [5, 6, 0x28, 0x25] },
    { t: 2, v: 0x77, n: "F8",        a: 0x8a, an: "F8",      s: 0x41, id: 0x41, rect: [5, 6, 0x28, 0x25] },
    { t: 2, v: 0x78, n: "F9",        a: 0x8b, an: "F9",      s: 0x42, id: 0x42, rect: [0x12, 6, 0x28, 0x25] },
    { t: 2, v: 0x79, n: "F10",       a: 0x8c, an: "F10",     s: 0x43, id: 0x43, rect: [5, 6, 0x28, 0x25] },
    { t: 2, v: 0x7a, n: "F11",       a: 0x8d, an: "F11",     s: 0x44, id: 0x44, rect: [5, 6, 0x28, 0x25] },
    { t: 2, v: 0x7b, n: "F12",       a: 0x8e, an: "F12",     s: 0x45, id: 0x45, rect: [5, 6, 0x28, 0x25] },
    { t: 2, v: 0x2c, n: "Print",     a: 0x78, an: "PRINT",   s: 0x46, id: 0x46, rect: [0x1e, 6, 0x28, 0x25] },
    { t: 2, v: 0x91, n: "Scroll",    a: 0x74, an: "SCROLL",  s: 0x47, id: 0x47, rect: [5, 6, 0x28, 0x25] },
    { t: 2, v: 0x13, n: "Pause",     a: 0x79, an: "PAUSE",   s: 0x48, id: 0x48, rect: [5, 6, 0x28, 0x25] },
    { t: 2, v: 0xc0, n: "`  ~",      a: 0x44, an: "TILDE",   s: 0x35, id: 0x35, rect: [0, 6, 0x28, 0x25] },
    { t: 2, v: 0x31, n: "1",         a: 0x8,  an: "NUM1",    s: 0x1e, id: 0x1e, rect: [5, 6, 0x28, 0x25] },
    { t: 2, v: 0x32, n: "2",         a: 0x9,  an: "NUM2",    s: 0x1f, id: 0x1f, rect: [5, 6, 0x28, 0x25] },
    { t: 2, v: 0x33, n: "3",         a: 0xa,  an: "NUM3",    s: 0x20, id: 0x20, rect: [5, 6, 0x28, 0x25] },
    { t: 2, v: 0x34, n: "4",         a: 0xb,  an: "NUM4",    s: 0x21, id: 0x21, rect: [5, 6, 0x28, 0x25] },
    { t: 2, v: 0x35, n: "5",         a: 0xc,  an: "NUM5",    s: 0x22, id: 0x22, rect: [5, 6, 0x28, 0x25] },
    { t: 2, v: 0x36, n: "6",         a: 0xd,  an: "NUM6",    s: 0x23, id: 0x23, rect: [5, 6, 0x28, 0x25] },
    { t: 2, v: 0x37, n: "7",         a: 0xe,  an: "NUM7",    s: 0x24, id: 0x24, rect: [5, 6, 0x28, 0x25] },
    { t: 2, v: 0x38, n: "8",         a: 0xf,  an: "NUM8",    s: 0x25, id: 0x25, rect: [5, 6, 0x28, 0x25] },
    { t: 2, v: 0x39, n: "9",         a: 0x10, an: "NUM9",    s: 0x26, id: 0x26, rect: [5, 6, 0x28, 0x25] },
    { t: 2, v: 0x30, n: "0",         a: 0x7,  an: "NUM0",    s: 0x27, id: 0x27, rect: [5, 6, 0x28, 0x25] },
    { t: 2, v: 0xbd, n: "-",         a: 0x45, an: "UNDERSCORE",  s: 0x2d, id: 0x2d, rect: [5, 6, 0x28, 0x25] },
    { t: 2, v: 0xbb, n: "=  +",      a: 0x46, an: "EQUAL",   s: 0x2e, id: 0x2e, rect: [5, 6, 0x28, 0x25] },
    { t: 2, v: 0x8,  n: "Backspace", a: 0x43, an: "BACKSPACE", s: 0x2a, id: 0x2a, rect: [5, 6, 0x55, 0x25] },
    { t: 2, v: 0x2d, n: "Insert",    a: 0x7c, an: "INSERT",   s: 0x49, id: 0x49, rect: [0x1e, 6, 0x28, 0x25] },
    { t: 2, v: 0x24, n: "Home",      a: 0x3,  an: "HOME",     s: 0x4a, id: 0x4a, rect: [5, 6, 0x28, 0x25] },
    { t: 2, v: 0x21, n: "Page Up",   a: 0x5c, an: "PAGEUP",   s: 0x4b, id: 0x4b, rect: [5, 6, 0x28, 0x25] },
    { t: 2, v: 0x90, n: "Num Lock",  a: 0x8f, an: "NUMLOCK",  s: 0x53, id: 0x53, rect: [0x1e, 6, 0x28, 0x25] },
    { t: 2, v: 0x6f, n: "Num /",     a: 0x9a, an: "KPDSLASH", s: 0x54, id: 0x54, rect: [5, 6, 0x28, 0x25] },
    { t: 2, v: 0x6a, n: "Num *",     a: 0x9b, an: "KPDSTAR",  s: 0x55, id: 0x55, rect: [5, 6, 0x28, 0x25] },
    { t: 2, v: 0x6d, n: "Num -",     a: 0x9c, an: "KPDMINUS", s: 0x56, id: 0x56, rect: [5, 6, 0x28, 0x25] },
    { t: 2, v: 0x9,  n: "Tab",       a: 0x3d, an: "TAB",      s: 0x2b, id: 0x2b, rect: [0, 6, 0x3f, 0x25] },
    { t: 2, v: 0x51, n: "Q",         a: 0x2d, an: "Q",        s: 0x14, id: 0x14, rect: [5, 6, 0x28, 0x25] },
    { t: 2, v: 0x57, n: "W",         a: 0x33, an: "W",        s: 0x1a, id: 0x1a, rect: [5, 6, 0x28, 0x25] },
    { t: 2, v: 0x45, n: "E",         a: 0x21, an: "E",        s: 0x8,  id: 0x8,  rect: [5, 6, 0x28, 0x25] },
    { t: 2, v: 0x52, n: "R",         a: 0x2e, an: "R",        s: 0x15, id: 0x15, rect: [5, 6, 0x28, 0x25] },
    { t: 2, v: 0x54, n: "T",         a: 0x30, an: "T",        s: 0x17, id: 0x17, rect: [5, 6, 0x28, 0x25] },
    { t: 2, v: 0x59, n: "Y",         a: 0x35, an: "Y",        s: 0x1c, id: 0x1c, rect: [5, 6, 0x28, 0x25] },
    { t: 2, v: 0x55, n: "U",         a: 0x31, an: "U",        s: 0x18, id: 0x18, rect: [5, 6, 0x28, 0x25] },
    { t: 2, v: 0x49, n: "I",         a: 0x25, an: "I",        s: 0xc,  id: 0xc,  rect: [5, 6, 0x28, 0x25] },
    { t: 2, v: 0x4f, n: "O",         a: 0x2b, an: "O",        s: 0x12, id: 0x12, rect: [5, 6, 0x28, 0x25] },
    { t: 2, v: 0x50, n: "P",         a: 0x2c, an: "P",        s: 0x13, id: 0x13, rect: [5, 6, 0x28, 0x25] },
    { t: 2, v: 0xdb, n: "[  {",      a: 0x47, an: "LEFTBRACE",   s: 0x2f, id: 0x2f, rect: [5, 6, 0x28, 0x25] },
    { t: 2, v: 0xdd, n: "]  }",      a: 0x48, an: "RIGHTBRACE",  s: 0x30, id: 0x30, rect: [5, 6, 0x28, 0x25] },
    { t: 2, v: 0xdc, n: "\\  |",     a: 0x49, an: "VERTICALBAR", s: 0x31, id: 0x31, rect: [5, 6, 0x3e, 0x25] },
    { t: 2, v: 0x2e, n: "Delete",    a: 0x70, an: "DELETE",   s: 0x4c, id: 0x4c, rect: [0x1e, 6, 0x28, 0x25] },
    { t: 2, v: 0x23, n: "End",       a: 0x7b, an: "END",      s: 0x4d, id: 0x4d, rect: [5, 6, 0x28, 0x25] },
    { t: 2, v: 0x22, n: "Page Down", a: 0x5d, an: "PAGEDOWN", s: 0x4e, id: 0x4e, rect: [5, 6, 0x28, 0x25] },
    { t: 2, v: 0x67, n: "Num 7",     a: 0x97, an: "KPD7",     s: 0x5f, id: 0x5f, rect: [0x1e, 6, 0x28, 0x25] },
    { t: 2, v: 0x68, n: "Num 8",     a: 0x98, an: "KPD8",     s: 0x60, id: 0x60, rect: [5, 6, 0x28, 0x25] },
    { t: 2, v: 0x69, n: "Num 9",     a: 0x99, an: "KPD9",     s: 0x61, id: 0x61, rect: [5, 6, 0x28, 0x25] },
    { t: 2, v: 0x6b, n: "Num +",     a: 0x9d, an: "KPDPLUS",  s: 0x57, id: 0x57, rect: [5, 6, 0x28, 0x25] },
    { t: 2, v: 0x14, n: "Caps Lock", a: 0x73, an: "CAPSLOCK", s: 0x39, id: 0x39, rect: [0, 6, 0x55, 0x25] },
    { t: 2, v: 0x41, n: "A",         a: 0x1d, an: "A",        s: 0x4,  id: 0x4,  rect: [5, 6, 0x28, 0x25] },
    { t: 2, v: 0x53, n: "S",         a: 0x2f, an: "S",        s: 0x16, id: 0x16, rect: [5, 6, 0x28, 0x25] },
    { t: 2, v: 0x44, n: "D",         a: 0x20, an: "D",        s: 0x7,  id: 0x7,  rect: [5, 6, 0x28, 0x25] },
    { t: 2, v: 0x46, n: "F",         a: 0x22, an: "F",        s: 0x9,  id: 0x9,  rect: [5, 6, 0x28, 0x25] },
    { t: 2, v: 0x47, n: "G",         a: 0x23, an: "G",        s: 0xa,  id: 0xa,  rect: [5, 6, 0x28, 0x25] },
    { t: 2, v: 0x48, n: "H",         a: 0x24, an: "H",        s: 0xb,  id: 0xb,  rect: [5, 6, 0x28, 0x25] },
    { t: 2, v: 0x4a, n: "J",         a: 0x26, an: "J",        s: 0xd,  id: 0xd,  rect: [5, 6, 0x28, 0x25] },
    { t: 2, v: 0x4b, n: "K",         a: 0x27, an: "K",        s: 0xe,  id: 0xe,  rect: [5, 6, 0x28, 0x25] },
    { t: 2, v: 0x4c, n: "L",         a: 0x28, an: "L",        s: 0xf,  id: 0xf,  rect: [5, 6, 0x28, 0x25] },
    { t: 2, v: 0xba, n: ";  :",      a: 0x4a, an: "COLON",    s: 0x33, id: 0x33, rect: [5, 6, 0x28, 0x25] },
    { t: 2, v: 0xde, n: "'  \"",     a: 0x4b, an: "QUOTE",    s: 0x34, id: 0x34, rect: [5, 6, 0x28, 0x25] },
    { t: 2, v: 0xd,  n: "Enter",     a: 0x42, an: "ENTER",    s: 0x28, id: 0x28, rect: [5, 6, 0x55, 0x25] },
    { t: 2, v: 0x64, n: "Num 4",     a: 0x94, an: "KPD4",     s: 0x5c, id: 0x5c, rect: [0xbe, 6, 0x28, 0x25] },
    { t: 2, v: 0x65, n: "Num 5",     a: 0x95, an: "KPD5",     s: 0x5d, id: 0x5d, rect: [5, 6, 0x28, 0x25] },
    { t: 2, v: 0x66, n: "Num 6",     a: 0x96, an: "KPD6",     s: 0x5e, id: 0x5e, rect: [5, 6, 0x28, 0x25] },
    { t: 2, v: 0xa0, n: ["$STRID_LEFT", " Shift"], a: 0x3b, an: "SHIFT", s: 0xe1, id: 0xe1, rect: [0, 6, 0x6b, 0x25] },
    { t: 2, v: 0x5a, n: "Z",         a: 0x36, an: "Z",        s: 0x1d, id: 0x1d, rect: [6, 6, 0x28, 0x25] },
    { t: 2, v: 0x58, n: "X",         a: 0x34, an: "X",        s: 0x1b, id: 0x1b, rect: [5, 6, 0x28, 0x25] },
    { t: 2, v: 0x43, n: "C",         a: 0x1f, an: "C",        s: 0x6,  id: 0x6,  rect: [5, 6, 0x28, 0x25] },
    { t: 2, v: 0x56, n: "V",         a: 0x32, an: "V",        s: 0x19, id: 0x19, rect: [5, 6, 0x28, 0x25] },
    { t: 2, v: 0x42, n: "B",         a: 0x1e, an: "B",        s: 0x5,  id: 0x5,  rect: [5, 6, 0x28, 0x25] },
    { t: 2, v: 0x4e, n: "N",         a: 0x2a, an: "N",        s: 0x11, id: 0x11, rect: [5, 6, 0x28, 0x25] },
    { t: 2, v: 0x4d, n: "M",         a: 0x29, an: "M",        s: 0x10, id: 0x10, rect: [5, 6, 0x28, 0x25] },
    { t: 2, v: 0xbc, n: ",  <",      a: 0x37, an: "LESSTHAN",   s: 0x36, id: 0x36, rect: [5, 6, 0x28, 0x25] },
    { t: 2, v: 0xbe, n: ".  >",      a: 0x38, an: "GREATTHAN",  s: 0x37, id: 0x37, rect: [5, 6, 0x28, 0x25] },
    { t: 2, v: 0xbf, n: "/  ?",      a: 0x4c, an: "QUESTION",   s: 0x38, id: 0x38, rect: [5, 6, 0x28, 0x25] },
    { t: 2, v: 0xa1, n: ["$STRID_RIGHT", " Shift"], a: 0x3c, an: "SHIFTR", s: 0xe5, id: 0xe5, rect: [5, 6, 0x6b, 0x25] },
    { t: 2, v: 0x26, n: "\u2191",     a: 0x13, an: "UPARROW",    s: 0x52, id: 0x52, rect: [0x4b, 6, 0x28, 0x25] },
    { t: 2, v: 0x61, n: "Num 1",      a: 0x91, an: "KPD1",      s: 0x59, id: 0x59, rect: [0x4b, 6, 0x28, 0x25] },
    { t: 2, v: 0x62, n: "Num 2",      a: 0x92, an: "KPD2",      s: 0x5a, id: 0x5a, rect: [5, 6, 0x28, 0x25] },
    { t: 2, v: 0x63, n: "Num 3",      a: 0x93, an: "KPD6",      s: 0x5b, id: 0x5b, rect: [5, 6, 0x28, 0x25] },
    { t: 2, v: 0xa2, n: ["$STRID_LEFT", " Ctrl"], a: 0x71, an: "CTRL", s: 0xe0, id: 0xe0, rect: [0, 6, 0x3e, 0x25] },
    { t: 2, v: 0x5b, n: { mac: "Command", win: "Win" }, a: 0xab, an: "WINDOWS", s: 0xe3, id: 0xe3, rect: [5, 6, 0x3e, 0x25] },
    { t: 2, v: 0xa4, n: { mac: ["$STRID_LEFT", " Option"], win: ["$STRID_LEFT", " Alt"] }, a: 0x39, an: "ALT", s: 0xe2, id: 0xe2, rect: [5, 6, 0x3e, 0x25] },
    { t: 2, v: 0x20, n: ["$STRID_KEY_SPACE"], a: 0x3e, an: "SPACE", s: 0x2c, id: 0x2c, rect: [5, 6, 0x10c, 0x25] },
    { t: 2, v: 0xa5, n: { mac: ["$STRID_RIGHT", " Option"], win: ["$STRID_RIGHT", " Alt"] }, a: 0x3a, an: "ALTR", s: 0xe6, id: 0xe6, rect: [5, 6, 0x3e, 0x25] },
    { t: 2, v: 0x5d, n: "Fn",        a: 0xbb, an: "APP",     s: 0x65, id: 0x5221, rect: [5, 6, 0x3e, 0x25] },
    { t: 2, v: 0xa3, n: ["$STRID_RIGHT", " Ctrl"], a: 0x72, an: "CTRLR", s: 0xe4, id: 0xe4, rect: [5, 6, 0x3e, 0x25] },
    { t: 2, v: 0x25, n: "\u2190",     a: 0x15, an: "LEFTARROW",  s: 0x50, id: 0x50, rect: [0x1e, 6, 0x28, 0x25] },
    { t: 2, v: 0x28, n: "\u2193",     a: 0x14, an: "DOWNARROW",  s: 0x51, id: 0x51, rect: [5, 6, 0x28, 0x25] },
    { t: 2, v: 0x27, n: "\u2192",     a: 0x16, an: "RIGHTARROW", s: 0x4f, id: 0x4f, rect: [5, 6, 0x28, 0x25] },
    { t: 2, v: 0x60, n: "Num 0",     a: 0x90, an: "KPD0",       s: 0x62, id: 0x62, rect: [0x1e, 6, 0x55, 0x25] },
    { t: 2, v: 0x6e, n: "Num .",     a: 0x9e, an: "KPDDOT",     s: 0x63, id: 0x63, rect: [5, 6, 0x28, 0x25] },
    { t: 2, v: 0xe,  n: "Num Enter", a: 0xa0, an: "KPDENTER",   s: 0x58, id: 0x58, rect: [5, 6, 0x28, 0x25] },
  ],

  mouse_select: [
    { t: 1, v: 0x100, n: ["$STRID_KEY_LEFT"],      a: 0, an: "M1",       s: 0x100, id: 0xcf, rect: [0, 0xf, 0x32, 0x25] },
    { t: 1, v: 0x101, n: ["$STRID_KEY_RIGHT"],     a: 0, an: "M2",       s: 0x101, id: 0xd0, rect: [0xf, 0xf, 0x32, 0x25] },
    { t: 1, v: 0x102, n: ["$STRID_KEY_MIDDLE"],    a: 0, an: "M3",       s: 0x102, id: 0xd3, rect: [0xf, 0xf, 0x32, 0x25] },
    { t: 1, v: 0x400, n: ["$STRID_KEY_WHELL_UP"],   a: 0, an: "WHEELUP",    s: 0x400, id: 0xd9, rect: [0xf, 0xf, 0x32, 0x25] },
    { t: 1, v: 0x401, n: ["$STRID_KEY_WHELL_DOWN"], a: 0, an: "WHEELDOWN",  s: 0x401, id: 0xda, rect: [0xf, 0xf, 0x32, 0x25] },
    { t: 1, v: 0x402, n: ["$STRID_KEY_WHELL_LEFT"], a: 0, an: "WHEELLEFT",  s: 0x402, id: 0xdb, rect: [0xf, 0xf, 0x32, 0x25] },
    { t: 1, v: 0x403, n: ["$STRID_KEY_WHELL_RIGHT"], a: 0, an: "WHEELRIGHT", s: 0x403, id: 0xdc, rect: [0xf, 0xf, 0x32, 0x25] },
  ],

  rgb: [
    { t: 2, v: 0, n: ["$STRID_KBD_KEY_RGB_TOG"],        a: 0, an: "NONE", s: 0, id: 0x7820, rect: [0, 0xf, 0x46, 0x25] },
    { t: 2, v: 0, n: ["$STRID_KBD_KEY_RGB_MODE_FORWARD"], a: 0, an: "NONE", s: 0, id: 0x7821, rect: [0xf, 0xf, 0x46, 0x25] },
    { t: 2, v: 0, n: ["$STRID_KBD_KEY_RGB_MODE_REVERSE"], a: 0, an: "NONE", s: 0, id: 0x7822, rect: [0xf, 0xf, 0x46, 0x25] },
    { t: 2, v: 0, n: ["$STRID_KBD_KEY_RGB_VAI"],         a: 0, an: "NONE", s: 0, id: 0x7827, rect: [0xf, 0xf, 0x46, 0x25] },
    { t: 2, v: 0, n: ["$STRID_KBD_KEY_RGB_VAD"],         a: 0, an: "NONE", s: 0, id: 0x7828, rect: [0xf, 0xf, 0x46, 0x25] },
    { t: 2, v: 0, n: ["$STRID_KBD_KEY_RGB_SPI"],         a: 0, an: "NONE", s: 0, id: 0x7829, rect: [0xf, 0xf, 0x46, 0x25] },
    { t: 2, v: 0, n: ["$STRID_KBD_KEY_RGB_SPD"],         a: 0, an: "NONE", s: 0, id: 0x782a, rect: [0xf, 0xf, 0x46, 0x25] },
  ],

  media: [
    { t: 2, v: 0, n: ["$STRID_KBD_KEY_MEDIA"],             a: 0, an: "NONE", s: 0, id: 0xaf, rect: [0, 0xf, 0x46, 0x25] },
    { t: 2, v: 0, n: ["$STRID_KBD_KEY_MEDIA_PLAY_PAUSE"],  a: 0, an: "NONE", s: 0, id: 0xae, rect: [0xf, 0xf, 0x46, 0x25] },
    { t: 2, v: 0, n: ["$STRID_KBD_KEY_MEDIA_NEXT_TRACK"],  a: 0, an: "NONE", s: 0, id: 0xab, rect: [0xf, 0xf, 0x46, 0x25] },
    { t: 2, v: 0, n: ["$STRID_KBD_KEY_MEDIA_PREV_TRACK"],  a: 0, an: "NONE", s: 0, id: 0xac, rect: [0xf, 0xf, 0x46, 0x25] },
    { t: 2, v: 0, n: ["$STRID_KBD_KEY_AUDIO_MUTE"],        a: 0, an: "NONE", s: 0, id: 0xa8, rect: [0xf, 0xf, 0x46, 0x25] },
    { t: 2, v: 0, n: ["$STRID_KBD_KEY_AUDIO_VOL_UP"],      a: 0, an: "NONE", s: 0, id: 0xa9, rect: [0xf, 0xf, 0x46, 0x25] },
    { t: 2, v: 0, n: ["$STRID_KBD_KEY_AUDIO_VOL_DOWN"],    a: 0, an: "NONE", s: 0, id: 0xaa, rect: [0xf, 0xf, 0x46, 0x25] },
  ],

  windows: [
    { t: 2, v: 0, n: ["$STRID_KBD_KEY_SYSTEM_POWER"],  a: 0, an: "NONE", s: 0, id: 0xa5, rect: [0, 0xf, 0x46, 0x25] },
    { t: 2, v: 0, n: ["$STRID_KBD_KEY_SYSTEM_SLEEP"],  a: 0, an: "NONE", s: 0, id: 0xa6, rect: [0xf, 0xf, 0x46, 0x25] },
    { t: 2, v: 0, n: ["$STRID_KBD_KEY_SYSTEM_WAKE"],   a: 0, an: "NONE", s: 0, id: 0xa7, rect: [0xf, 0xf, 0x46, 0x25] },
    { t: 2, v: 0, n: ["$STRID_KBD_KEY_MY_COMPUTER"],   a: 0, an: "NONE", s: 0, id: 0xb3, rect: [0xf, 0xf, 0x46, 0x25] },
    { t: 2, v: 0, n: ["$STRID_KBD_KEY_CALCULATOR"],    a: 0, an: "NONE", s: 0, id: 0xb2, rect: [0xf, 0xf, 0x46, 0x25] },
    { t: 2, v: 0, n: ["$STRID_KBD_KEY_MAIL"],          a: 0, an: "NONE", s: 0, id: 0xb1, rect: [0xf, 0xf, 0x46, 0x25] },
  ],

  macro: [
    { t: 2, v: 0, n: "M1",  a: 0, an: "NONE", s: 0, id: 0x7700, rect: [0xf, 0xf, 0x46, 0x25] },
    { t: 2, v: 0, n: "M2",  a: 0, an: "NONE", s: 0, id: 0x7701, rect: [0xf, 0xf, 0x46, 0x25] },
    { t: 2, v: 0, n: "M3",  a: 0, an: "NONE", s: 0, id: 0x7702, rect: [0xf, 0xf, 0x46, 0x25] },
    { t: 2, v: 0, n: "M4",  a: 0, an: "NONE", s: 0, id: 0x7703, rect: [0xf, 0xf, 0x46, 0x25] },
    { t: 2, v: 0, n: "M5",  a: 0, an: "NONE", s: 0, id: 0x7704, rect: [0xf, 0xf, 0x46, 0x25] },
    { t: 2, v: 0, n: "M6",  a: 0, an: "NONE", s: 0, id: 0x7705, rect: [0xf, 0xf, 0x46, 0x25] },
    { t: 2, v: 0, n: "M7",  a: 0, an: "NONE", s: 0, id: 0x7706, rect: [0xf, 0xf, 0x46, 0x25] },
    { t: 2, v: 0, n: "M8",  a: 0, an: "NONE", s: 0, id: 0x7707, rect: [0xf, 0xf, 0x46, 0x25] },
    { t: 2, v: 0, n: "M9",  a: 0, an: "NONE", s: 0, id: 0x7708, rect: [0xf, 0xf, 0x46, 0x25] },
    { t: 2, v: 0, n: "M10", a: 0, an: "NONE", s: 0, id: 0x7709, rect: [0xf, 0xf, 0x46, 0x25] },
    { t: 2, v: 0, n: "M11", a: 0, an: "NONE", s: 0, id: 0x770a, rect: [0xf, 0xf, 0x46, 0x25] },
    { t: 2, v: 0, n: "M12", a: 0, an: "NONE", s: 0, id: 0x770b, rect: [0xf, 0xf, 0x46, 0x25] },
    { t: 2, v: 0, n: "M13", a: 0, an: "NONE", s: 0, id: 0x770c, rect: [0xf, 0xf, 0x46, 0x25] },
    { t: 2, v: 0, n: "M14", a: 0, an: "NONE", s: 0, id: 0x770d, rect: [0xf, 0xf, 0x46, 0x25] },
    { t: 2, v: 0, n: "M15", a: 0, an: "NONE", s: 0, id: 0x770e, rect: [0xf, 0xf, 0x46, 0x25] },
    { t: 2, v: 0, n: "M16", a: 0, an: "NONE", s: 0, id: 0x770f, rect: [0xf, 0xf, 0x46, 0x25] },
    { t: 2, v: 0, n: "M17", a: 0, an: "NONE", s: 0, id: 0x7710, rect: [0xf, 0xf, 0x46, 0x25] },
    { t: 2, v: 0, n: "M18", a: 0, an: "NONE", s: 0, id: 0x7711, rect: [0xf, 0xf, 0x46, 0x25] },
    { t: 2, v: 0, n: "M19", a: 0, an: "NONE", s: 0, id: 0x7712, rect: [0xf, 0xf, 0x46, 0x25] },
    { t: 2, v: 0, n: "M20", a: 0, an: "NONE", s: 0, id: 0x7713, rect: [0xf, 0xf, 0x46, 0x25] },
  ],

  extra: [
    { t: 2, v: 0x12, n: "Menu",                            a: 0x52, an: "NONE", s: 0,   id: 0x76,   rect: [0x6, 0x6, 0x46, 0x39] },
    { t: 2, v: 0,    n: "App",                             a: 0,    an: "NONE", s: 0,   id: 0x65,   rect: [0x6, 0x6, 0x46, 0x39] },
    { t: 2, v: 0,    n: ["$STRID_KBD_KEY_RGB_HUI"],        a: 0,    an: "NONE", s: 0,   id: 0x7823, rect: [0x6, 0x6, 0x46, 0x39] },
    { t: 2, v: 0,    n: ["$STRID_KBD_KEY_RGB_HUD"],        a: 0,    an: "NONE", s: 0,   id: 0x7824, rect: [0x6, 0x6, 0x46, 0x39] },
    { t: 2, v: 0,    n: ["$STRID_KBD_KEY_BRGB_VAI"],       a: 0,    an: "NONE", s: 0,   id: 0xa000, rect: [0x6, 0x6, 0x46, 0x39] },
    { t: 2, v: 0,    n: ["$STRID_KBD_KEY_BRGB_VAD"],       a: 0,    an: "NONE", s: 0,   id: 0xa001, rect: [0x6, 0x6, 0x46, 0x39] },
    { t: 2, v: 0,    n: ["$STRID_KBD_KEY_BRGB_SPI"],       a: 0,    an: "NONE", s: 0,   id: 0xa002, rect: [0x6, 0x6, 0x46, 0x39] },
    { t: 2, v: 0,    n: ["$STRID_KBD_KEY_BRGB_SPD"],       a: 0,    an: "NONE", s: 0,   id: 0xa003, rect: [0x6, 0x6, 0x46, 0x39] },
    { t: 2, v: 0,    n: ["$STRID_KBD_KEY_BRGB_MOD"],       a: 0,    an: "NONE", s: 0,   id: 0xa004, rect: [0x6, 0x6, 0x46, 0x39] },
    { t: 2, v: 0,    n: ["$STRID_KBD_KEY_BRGB_RMOD"],      a: 0,    an: "NONE", s: 0,   id: 0xa005, rect: [0x6, 0x6, 0x46, 0x39] },
    { t: 2, v: 0,    n: ["$STRID_KBD_KEY_BRGB_COI"],       a: 0,    an: "NONE", s: 0,   id: 0xa006, rect: [0x6, 0x6, 0x46, 0x39] },
    { t: 2, v: 0,    n: ["$STRID_KBD_KEY_BRGB_COD"],       a: 0,    an: "NONE", s: 0,   id: 0xa007, rect: [0x6, 0x6, 0x46, 0x39] },
    { t: 2, v: 0,    n: ["$STRID_KBD_SWITCH_WASD"],        a: 0,    an: "NONE", s: 0,   id: 0x9002, rect: [0x6, 0x6, 0x46, 0x39] },
    { t: 2, v: 0,    n: ["$STRID_KBD_SWITCH_MAC_MODE"],    a: 0,    an: "NONE", s: 0,   id: 0x9003, rect: [0x6, 0x6, 0x46, 0x39] },
  ],
};


// ===== 02-key-system.js ====================================================
// ===== GLOBAL KEY ARRAYS ====================================================
// Populated by pc_key_manager_init() from KEY_DB data.
// Every other module references these globals directly.

var modifiers = [];
var keys = [];
var macro_keys = [];
var kbd_5_15_keys = [];
var kbd_5_14_keys = [];
var kbd_select_keys = [];
var mouse_select_keys = [];
var kbd_all_keys = [];
var kbd_rgb_keys = [];
var kbd_windows_keys = [];
var kbd_media_keys = [];
var kbd_macro_keys = [];

// ===== FACTORY FUNCTIONS =====================================================

function create_pc_key_info(type, vCode, name, aCode, aName, sCode) {
  return { type, vCode, name, aCode, aName, sCode };
}

function kbd_create_pc_key_info(type, vCode, name, aCode, aName, sCode, keyId, row, col, rect) {
  return { type, vCode, name, aCode, aName, sCode, keyId, row, col, rect };
}

function create_pc_select_key_info(keyType, value, keyName, altCode, altName, scanCode, keyId, rect) {
  return { type: keyType, vCode: value, name: keyName, aCode: altCode, aName: altName, sCode: scanCode, keyId, rect };
}

function kbd_clone_pc_key_info(client) {
  return { ...client };
}

// ===== I18N RESOLVER ========================================================
// Handles the conventions used in KEY_DB:
//   "$STRID_xxx"              → layui.i18np.prop("STRID_xxx")
//   ["$STRID_xxx", "suffix"]  → resolved i18n + suffix
//   {win: val, mac: val}      → platform-dependent pick
//   plain string              → as-is

function resolve_name(spec) {
  if (typeof spec === "string") {
    if (spec.startsWith("$")) {
      return layui.i18np.prop(spec.substring(1));
    }
    return spec;
  }
  if (Array.isArray(spec)) {
    return spec.map(part => resolve_name(part)).join("");
  }
  if (spec.win !== undefined) {
    var isMac = layui.device("os").os.toLowerCase() === "mac";
    return resolve_name(isMac ? spec.mac : spec.win);
  }
  return "";
}

// ===== pc_key_manager_init() — DATA-DRIVEN KEY DATABASE INITIALIZATION ======

function pc_key_manager_init() {
  function build(entries, factory) {
    return entries.map(function (d) {
      var resolved = { ...d };
      resolved.name = resolve_name(d.n !== undefined ? d.n : d.name);
      if (resolved.n !== undefined) delete resolved.n;
      if (resolved.name === undefined) resolved.name = "";
      return factory(
        resolved.t !== undefined ? resolved.t : resolved.type,
        resolved.v !== undefined ? resolved.v : resolved.vCode,
        resolved.name,
        resolved.a !== undefined ? resolved.a : resolved.aCode,
        resolved.an !== undefined ? resolved.an : resolved.aName,
        resolved.s !== undefined ? resolved.s : resolved.sCode,
        resolved.id,
        resolved.r,
        resolved.c,
        resolved.rect
      );
    }).filter(function (item) { return item; });
  }

  modifiers = build(KEY_DB.modifiers, create_pc_key_info);
  keys = build(KEY_DB.keys, create_pc_key_info);

  macro_keys = [];
  keys.forEach(function (item, idx) {
    if (idx === 9) {
      macro_keys.push(create_pc_key_info(0x1, 0x404, resolve_name("$STRID_KEY_MOUSE_MOVE"), 0x0, "MOUSEMOVE", 0x404));
      macro_keys.push(create_pc_key_info(0x1, 0x405, resolve_name("$STRID_KEY_MOUSE_POSITION"), 0x0, "MOUSEPOSITION", 0x405));
    }
    macro_keys.push(item);
  });

  kbd_5_15_keys = build(KEY_DB.kbd_5_15, kbd_create_pc_key_info);
  kbd_5_14_keys = build(KEY_DB.kbd_5_14, kbd_create_pc_key_info);
  kbd_select_keys = build(KEY_DB.kbd_select, create_pc_select_key_info);
  mouse_select_keys = build(KEY_DB.mouse_select, create_pc_select_key_info);
  kbd_rgb_keys = build(KEY_DB.rgb, create_pc_select_key_info);
  kbd_media_keys = build(KEY_DB.media, create_pc_select_key_info);
  kbd_windows_keys = build(KEY_DB.windows, create_pc_select_key_info);
  kbd_macro_keys = build(KEY_DB.macro, create_pc_select_key_info);

  kbd_all_keys = [];
  kbd_select_keys.forEach(function (k) { kbd_all_keys.push(k); });
  mouse_select_keys.forEach(function (k) { kbd_all_keys.push(k); });
  kbd_rgb_keys.forEach(function (k) { kbd_all_keys.push(k); });
  kbd_media_keys.forEach(function (k) { kbd_all_keys.push(k); });
  kbd_windows_keys.forEach(function (k) { kbd_all_keys.push(k); });
  kbd_macro_keys.forEach(function (k) { kbd_all_keys.push(k); });

  build(KEY_DB.extra, kbd_create_pc_key_info).forEach(function (k) {
    kbd_all_keys.push(k);
  });
}

// ===== LOOKUP FUNCTIONS =====================================================

function get_key_name_from_keyid(keyId) {
  var str = "";
  kbd_all_keys.forEach(function (item) {
    if (item.keyId == keyId) str = item.name;
  });
  return str;
}

function get_key_code_from_keyid(keyId) {
  var offset = 0;
  kbd_all_keys.forEach(function (item) {
    if (item.keyId == keyId) offset = item.vCode;
  });
  return offset;
}

function get_keyid_from_code(keyCode) {
  var offset = 0;
  kbd_all_keys.forEach(function (item) {
    if (item.vCode == keyCode) offset = item.keyId;
  });
  return offset;
}

function get_scan_code(keyId) {
  var offset = 0;
  macro_keys.forEach(function (item) {
    if (item.vCode == keyId) offset = item.sCode;
  });
  return offset;
}

function get_vk_code(keyId) {
  var offset = 0;
  macro_keys.forEach(function (item) {
    if (item.sCode == keyId) offset = item.vCode;
  });
  return offset;
}

function get_key_name_from_code(keyCode) {
  var str = layui.i18np;
  var value = str.prop("STRID_NONE");
  macro_keys.forEach(function (item) {
    if (item.vCode == keyCode) value = item.name;
  });
  return value;
}

function get_key_code_from_name(keyName) {
  var offset = 0;
  macro_keys.forEach(function (item) {
    if (item.name == keyName) offset = item.vCode;
  });
  return offset;
}

function get_modifier_name_from_code(modifierCode) {
  var str = layui.i18np;
  var value = str.prop("STRID_NONE");
  modifiers.forEach(function (item) {
    if (item.vCode == modifierCode) value = item.name;
  });
  return value;
}

function get_modifier_code_from_name(modifierName) {
  var r = 0;
  modifiers.forEach(function (item) {
    if (item.name == modifierName) r = item.vCode;
  });
  return r;
}

function pc_key_manager_modifiers() { return modifiers; }
function pc_key_manager_keys() { return keys; }
function pc_key_manager_macro_keys() { return macro_keys; }

function pc_kbd_manager_keys(client) {
  return is_keyboard_5_15(client.device) ? kbd_5_15_keys : kbd_5_14_keys;
}

function pc_kbd_key_num(client) {
  return is_keyboard_5_15(client.device) ? 0x4b : 0x46;
}

function pc_kbd_select_keys() { return kbd_select_keys; }
function pc_mouse_select_keys() { return mouse_select_keys; }
function pc_kbd_rgb_keys() { return kbd_rgb_keys; }
function pc_kbd_media_keys() { return kbd_media_keys; }
function pc_kbd_windows_keys() { return kbd_windows_keys; }


// ===== state/device-store.js ====================================================
// ===== DEVICE STATE STORE ====================================================
// Reactive state store that centralises device management. Replaces the global
// mutable state (usb_client_list, current_usb_client, postMessage dispatch)
// with a unified event emitter + data model.
//
// Also contains the device info model and all its helper functions (migrated
// from 03-device-info.js).
// ============================================================================

// ===== ACTION CONSTANTS ======================================================
const SYNC_DATA = "SYNC!@#$%^";
const ACTION_REFRESH_CLIENT_LIST = "action_refresh_client_list";
const ACTION_UI_REFRESH_CLIENT_LIST = "action_ui_refresh_client_list";
const ACTION_REFRESH_CURRENT_CLIENT = "action_refresh_current_client";
const ACTION_UI_REFRESH_CURRENT_CLIENT = "action_ui_refresh_current_client";
const ACTION_UI_REFRESH_CURRENT_CLIENT_RSSI = "action_ui_refresh_current_client_rssi";
const ACTION_UI_REFRESH_SETTING = "action_ui_refresh_setting";
const ACTION_UI_REFRESH_QUAL = "action_ui_refresh_qual";
const ACTION_SEND_CLIENT_DATA = "action_send_client_data";
const ACTION_UI_REFRESH_KBD_KEY = "action_ui_refresh_kbd_key";
const ACTION_UI_REFRESH_KBD_AXIS = "action_ui_refresh_kbd_axis";
const ACTION_UI_REFRESH_KBD_LIGHT = "action_ui_refresh_kbd_light";
const ACTION_UI_REFRESH_KBD_MACRO = "action_ui_refresh_kbd_macro";
const RESOURCE_URL = "https://hub.miracletek.net/hub/";

let upload_mouse_config_timer;
let mouse_config_timer;

function basic_info(productId) {
  return "?os=4" + "&v=" + API_VERSION + "&c=" + productId + "&a=" + "pc-rawmhub.game" + '&ta=' + "pc-rawmhub.game" + '&mac=' + (layui.device('os').os.toLowerCase() == "mac" ? 0x1 : 0x0);
}

// ===== BACKWARD-COMPATIBLE GLOBALS ==========================================
// These will be removed in a later phase once all UI files are migrated.
// _deviceClients is the backing array. DeviceStore.clients and usb_client_list
// both reference it, so mutations via either name stay in sync.
var _deviceClients = [];
var usb_client_list = _deviceClients;
var current_usb_client = null;

// ===== REACTIVE STATE STORE =================================================
const DeviceStore = {
  get clients() { return _deviceClients; },
  set clients(v) { _deviceClients = v; usb_client_list = v; },

  currentId: null,

  get current() {
    if (this.currentId == null) return null;
    return _deviceClients.find(c => c.id === this.currentId) || null;
  },

  getClient(id) {
    return _deviceClients.find(c => c.id === id) || null;
  },

  getDeviceInfo(client) {
    return client ? client.device_info : null;
  },

  addClient(hidDevice, value, virtual) {
    var client = create_usb_client(hidDevice, value, virtual);
    _deviceClients.push(client);
    this._emit('client:added', client);
    return client;
  },

  removeClient(id) {
    var idx = _deviceClients.findIndex(c => c.id === id);
    if (idx >= 0) {
      var client = _deviceClients[idx];
      _deviceClients.splice(idx, 1);
      if (this.currentId === id) {
        this.currentId = null;
        current_usb_client = null;
      }
      this._emit('client:removed', client);
    }
  },

  selectClient(id) {
    var client = this.getClient(id);
    if (client) {
      this.currentId = id;
      current_usb_client = client;
      this._emit('current:changed', client);
    }
  },

  updateDeviceInfo(id, patch) {
    var client = this.getClient(id);
    if (client) {
      Object.assign(client.device_info, patch);
      this._emit('device:updated', client);
    }
  },

  // Sync buffers for chunked HS protocol transfers
  kbdSync: {
    index: 0,
    keyinfoList: [],
    axisinfoList: [],
    socdinfoList: [],
    mtinfoList: [],
    rsinfoList: [],
    dksinfoList: [],
    lightinfoList: [],
    macroinfoList: [],
    macroIndex: 0,
    macroBuff: [],
  },

  // Keyboard data accessors (thin reads into client.device_info)
  getKeyInfos(client)       { return client.device_info.kbd_key_infos; },
  getLightInfo(client)      { return client.device_info.kbd_light_info; },
  getAxisInfos(client)      { return client.device_info.kbd_axis_infos; },
  getAxisMode(client)       { return client.device_info.kbd_axis_mode; },
  getSocdInfos(client)      { return client.device_info.kbd_socd_infos; },
  getMtInfos(client)        { return client.device_info.kbd_mt_infos; },
  getRsInfos(client)        { return client.device_info.kbd_rs_infos; },
  getDksInfos(client)       { return client.device_info.kbd_dks_infos; },
  getMacroInfos(client)     { return client.device_info.kbd_macro_infos; },
  getMacroNum(client)       { return client.device_info.kbd_macro_num; },
  getMacroMaxSize(client)   { return client.device_info.kbd_macro_max_size; },
  getOnboardNum(client)     { return client.device_info.kbd_onboardNum; },

  _handlers: {},

  on(event, handler) {
    (this._handlers[event] = this._handlers[event] || []).push(handler);
  },

  off(event, handler) {
    var list = this._handlers[event];
    if (list) {
      var idx = list.indexOf(handler);
      if (idx >= 0) list.splice(idx, 1);
    }
  },

  _emit(event, data) {
    var list = this._handlers[event];
    if (list) {
      list.slice().forEach(fn => fn(data));
    }
  }
};

// ===== DEVICE INFO MODEL ====================================================
function create_device_info() {
  var info = {};
  return reset_device_info(info);
}

function reset_device_cfg(arr) {
  arr.forEach(item => {
    if (item.light_colors == undefined) {
      item.light_colors = [];
      item.light_colors.push("red");
      item.light_colors.push('green');
      item.light_colors.push('blue');
    }
    if (item.polling_rate_max == undefined) {
      item.polling_rate_max = POLLING_RATE_MAX_HZ;
    }
    if (item.angle_tuning == undefined) {
      item.angle_tuning = true;
    }
    if (item.lod == undefined) {
      item.lod = [];
      item.lod.push(0x1);
      item.lod.push(0x2);
    }
    if (item.glass_mode == undefined) {
      item.glass_mode = false;
    }
    if (item.oms == undefined) {
      item.oms = [];
    }
    if (item.hub == undefined) {
      item.hub = false;
    }
    if (item.rf_chn == undefined) {
      item.rf_chn = 0xff;
    }
    if (item.limit_memory == undefined) {
      item.limit_memory = false;
    }
    if (item.slow == undefined) {
      item.slow = true;
    }
  });
}

function reset_device_info(device) {
  device.revision = '';
  device.revisionCode = 0x0;
  device.hardwareCode = 0x0;
  device.battery = BATTERY_FULL_PERCENT;
  device.configNum = -0x1;
  device.resolution = RESOLUTION_DEFAULT;
  device.pollingRate = -0x1;
  device.light = 48;
  device.cpiLevels = [0x190, 0x320, 0x640, 0xc80, 0x0, 0x0, 0x0, 0x0];
  device.cpiLevelColors = [1, 2, 6, 4, 0x0, 0x0, 0x0, 0x0];
  device.assist = [];
  device.macAddress = '';
  device.onboard = 0x0;
  device.powerMode = POWER_MODE_DEFAULT;
  device.esbAddress = '';
  device.esbChannel = 0xff;
  device.deviceName = '';
  device.productId = 0xffff;
  device.vendorId = 0x0;
  device.lod = 0x1;
  device.lodCalib = 0x0;
  device.keyDelay = [KEY_DELAY_DEFAULT, KEY_DELAY_DEFAULT, KEY_DELAY_DEFAULT, KEY_DELAY_DEFAULT, KEY_DELAY_DEFAULT, KEY_DELAY_DEFAULT, KEY_DELAY_DEFAULT];
  device.motionSync = 0x1;
  device.angleTuning = 0x0;
  device.angleSnapping = 0x0;
  device.rippleControl = 0x0;
  device.charging = 0x0;
  device.txOutputPower = 0xff;
  device.autoTxPower = 0x1;
  device.sleepTime = SLEEP_DEFAULT_SEC;
  device.allKeyConfigs = [];
  device.peerInfo = [];
  device.batteryLevels = [0x1004, 0xfa0, 0xf6e, 0xf3c, 0xf0a, 0xed8, 0xea6, 0xe74, 0xdac, 0xce4, 0xc1c];
  device.colorCode = '';
  device["lzSupported;"] = false;
  device.rfChannel = 0x2;
  device.rssi = 0x0;
  device.crcSupported = false;
  device.luaStatus = 0xff;
  device.noack = 0x0;
  device.glassMode = 0x0;
  device.glassModeEnabled = 0x0;
  device.onboardConfigNum = 0x1;
  device.onboardIndex = 0x0;
  device.onboardStatus = [129, 130, 134, 132];
  device.firmwareInfo = {};
  device.squal = 0x0;
  device.equal = 0xff;
  device.txOutputPowerApplied = 0xff;
  device.enhancedCpi = false;
  device.dynamicGOM = false;
  device.wired = false;
  device.sensor = '';
  device.brightness = BRIGHTNESS_DEFAULT;
  device.hopChannelSupported = false;
  device.hopChannel = true;
  device.slow = true;
  device.kbd_onboardNum = KBD_DEFAULT_ONBOARD_NUM;
  device.kbd_key_infos = [];
  device.kbd_socd_num = 0x0;
  device.kbd_socd_infos = [];
  device.kbd_mt_num = 0x0;
  device.kbd_mt_infos = [];
  device.kbd_rs_num = 0x0;
  device.kbd_rs_infos = [];
  device.kbd_dks_num = 0x0;
  device.kbd_dks_infos = [];
  device.kbd_light_info = {};
  device.kbd_axis_mode = 0x0;
  device.kbd_axis_infos = [];
  device.kbd_macro_num = 0x0;
  device.kbd_macro_max_size = 0x0;
  device.kbd_macro_infos = [];
  return device;
}

function reset_device_info_esb(client) {
  client.esbAddressArr = [];
  client.esbSelected = -0x1;
  return client;
}

function create_usb_client(hidDevice, value, virtual) {
  var client = {
    device: hidDevice,
    product_esb_ch: value,
    recv_buf: new Uint8Array(0x0),
    send_event_buf: new Uint8Array(0x0),
    helloed: false,
    connected: false,
    device_name: '',
    virtual: virtual,
    device_info: create_device_info(),
    esb_last_alive_time: new Date().getTime(),
    esb_alive_timeout: ESB_ALIVE_TIMEOUT_MS,
    pause: false,
    syncing: false,
    id: crypto.randomUUID(),
    allow_send: true,
    eplapsed_syncing_ms: 0x0,
    last_query_time: 0x0,
    onboard_index: 0x0,
    querying_more_result: false
  };
  return client;
}

function is_supported(productId) {
  var flag = false;
  device_cfg.forEach(item => {
    if (item.product_id == productId.toString(0x10)) {
      flag = true;
    }
  });
  return flag;
}

function get_cfg(client) {
  var revision = undefined;
  if (client.virtual) {
    device_cfg.forEach(item => {
      if (item.name == client.device_name) {
        revision = item;
      }
    });
  } else {
    device_cfg.forEach(item2 => {
      if (item2.product_id == client.device.productId.toString(0x10)) {
        revision = item2;
      }
    });
  }
  return revision;
}

function is_receiver(device) {
  var value = get_cfg(device);
  return value != undefined ? value.receiver : false;
}

function is_slow_receiver(client) {
  if (!client.device_info.slow) {
    return client.device_info.slow;
  } else {
    var value = get_cfg(client);
    return value != undefined ? value.slow : true;
  }
}

function is_hub(device) {
  var value = get_cfg(device);
  return value != undefined ? value.hub : false;
}

function is_keyboard(client) {
  return client != undefined ? is_hs_keyboard(client.device) : false;
}

function is_keyboard_device(device) {
  var value = get_cfg(device);
  return value != undefined ? value.keyboard : false;
}

function is_connected(client) {
  return client.connected != undefined ? client.connected : false;
}

function get_display_name(client) {
  var value = get_cfg(client);
  return value != undefined ? value.display_name : client.device_name;
}

function get_display_name_model(client) {
  var value = get_cfg(client);
  return value != undefined && value.display_name_model != undefined ? value.display_name_model : '';
}

function get_product_id_hex_str(client) {
  var str = '';
  if (client.virtual) {
    device_cfg.forEach(item => {
      if (item.name == client.device_name) {
        str = item.product_id;
      }
    });
  } else {
    str = client.device.productId.toString(0x10);
  }
  return str;
}

function is_battery_percent_supported(client) {
  var value = get_cfg(client);
  if (value != undefined) {
    var flag = false;
    value.battery_levels.forEach(item => {
      if (item != 0x0) {
        flag = true;
      }
    });
    return flag;
  } else {
    return false;
  }
}

function get_esb_addr(esbAddr, index) {
  if (index == 0xff || esbAddr.esbAddress.length == 0x0) {
    return esbAddr.esbAddress;
  } else {
    var i;
    var idx;
    i = esbAddr.esbAddress.substr(16, 2);
    if (index == 0x0) {
      idx = esbAddr.esbAddress.substr(0x0, 8);
    } else {
      idx = esbAddr.esbAddress.substr(8, 8);
    }
    return i + idx;
  }
}

function is_esb_addr_arr_existed(esbAddr, addr, length) {
  var flag = false;
  if (esbAddr.esbAddressArr != undefined) {
    var i;
    var idx;
    esbAddr.esbAddressArr.forEach(item => {
      i = item.substr(16, 2);
      if (addr == 0x0) {
        idx = item.substr(0x0, 8);
      } else {
        idx = item.substr(8, 8);
      }
      if (i + idx == length) {
        flag = true;
      }
    });
  }
  return flag;
}

function get_esb_addr_arr(esbAddr, index) {
  if (index == 0xff || esbAddr.esbAddressArr == undefined || esbAddr.esbAddressArr.length == 0x0 || esbAddr.esbSelected < 0x0 || esbAddr.esbSelected >= esbAddr.esbAddressArr.length) {
    return '';
  } else {
    var i;
    var idx;
    var i2;
    i = esbAddr.esbAddressArr[esbAddr.esbSelected];
    idx = i.substr(16, 2);
    if (index == 0x0) {
      i2 = i.substr(0x0, 8);
    } else {
      i2 = i.substr(8, 8);
    }
    return idx + i2;
  }
}

function get_esb_channel(client) {
  return client.product_esb_ch == 0xff ? client.device_info.esbChannel : client.product_esb_ch;
}

function get_usb_client(device) {
  var isGamingOnly = undefined;
  usb_client_list.forEach(item => {
    if (item.id == device) {
      isGamingOnly = item;
    }
  });
  return isGamingOnly;
}

function get_color_codes(client) {
  var value = get_cfg(client);
  return value != undefined ? value.models : [];
}

function get_color_code(client) {
  var value = client.device_info.colorCode;
  if (value == undefined || value == '') {
    value = '';
  } else {
    var flag = false;
    get_color_codes(client).forEach(item => {
      if (item == value) {
        flag = true;
      }
    });
    if (!flag) {
      value = '';
    }
  }
  return value;
}

function is_enhanced_cpi(client) {
  return client.device_info.enhancedCpi;
}

function is_dynamic_gom(client) {
  return client.device_info.dynamicGOM;
}

function get_cpi(client) {
  return client.device_info.resolution;
}

function get_cpi_range(client) {
  var value = get_cfg(client);
  return value != undefined ? value.cpi_range : [];
}

function get_cpi_step(client) {
  var value = get_cfg(client);
  return value != undefined ? client.device_info.enhancedCpi ? CPI_STEP_DEFAULT : value.cpi_step : 0x1;
}

function set_cpi(client, value, isXyLinked = true) {
  var cpiRange = get_cpi_range(client);
  var value2 = value & CPI_LOW_MASK;
  var value3 = value >> 0x10 & CPI_LOW_MASK;
  if (value2 < cpiRange[0x0]) {
    value2 = cpiRange[0x0];
  } else if (value2 > cpiRange[0x1]) {
    value2 = cpiRange[0x1];
  }
  if (value3 != 0x0) {
    if (value3 < cpiRange[0x0]) {
      value3 = cpiRange[0x0];
    } else if (value3 > cpiRange[0x1]) {
      value3 = cpiRange[0x1];
    }
  }
  value = value2 | value3 << 0x10;
  if (client.device_info.resolution != value) {
    client.device_info.resolution = value;
    if (isXyLinked) {
      send_event_mouse_param(client);
    }
    return true;
  }
  return false;
}

function is_cpi_xy_supported(client) {
  var value = get_cfg(client);
  return value != undefined ? value.cpi_xy : false;
}

function is_oms(client, value) {
  var value = get_cfg(client);
  return value != undefined ? value >= 0x0 ? value.oms.indexOf(value) >= 0x0 : value.oms.length > 0x0 : false;
}

function get_cpi_levels(client) {
  return client.device_info.cpiLevels;
}

function get_cpi_level_colors(client) {
  return client.device_info.cpiLevelColors;
}

function set_cpi_level(client, index, value, isUpdateLight = true) {
  if (client.device_info.cpiLevels[index] != value) {
    client.device_info.cpiLevels[index] = value;
  }
  if (isUpdateLight) {
    send_event_mouse_param(client);
  }
}

function set_cpi_level_color(client, cpiLevel, color) {
  if (client.device_info.cpiLevelColors[cpiLevel] != color) {
    client.device_info.cpiLevelColors[cpiLevel] = color;
    send_event_mouse_param(client);
  }
}

function remove_cpi_level(client, index) {
  client.device_info.cpiLevels.splice(index, 0x1);
  client.device_info.cpiLevels.push(0x0);
  client.device_info.cpiLevelColors.splice(index, 0x1);
  client.device_info.cpiLevelColors.push(0x0);
  send_event_mouse_param(client);
}

function add_cpi_level(client, value, index) {
  for (let len = 0x0; len < client.device_info.cpiLevels.length; len++) {
    if (client.device_info.cpiLevels[len] == 0x0) {
      client.device_info.cpiLevels[len] = value;
      client.device_info.cpiLevelColors[len] = index;
      send_event_mouse_param(client);
      break;
    }
  }
}

function get_polling_rates(client, arr) {
  var value = get_cfg(client);
  if (value != undefined) {
    var payload = value.polling_rates.slice();
    arr.forEach(item => {
      if (item.connected != undefined ? item.connected : false) {
        if (is_receiver(item)) {
          if (client.device == item.device) {
            var value2 = get_cfg(item);
            if (value2 != undefined && value2.boost_polling_rates != undefined) {
              value2.boost_polling_rates.forEach(item2 => {
                if (!payload.includes(item2)) {
                  payload.push(item2);
                }
              });
            }
          }
        }
      }
    });
    var value3 = client.device_info.pollingRate;
    for (var len = 0x7d; len <= value3; len *= 0x2) {
      if (!payload.includes(len)) {
        payload.push(len);
      }
    }
    return payload;
  } else {
    return [];
  }
}

function get_max_polling_rate(client, arr) {
  var i;
  if (true && !client.virtual && !is_keyboard_device(client)) {
    i = POLLING_RATE_1000HZ;
    var value = get_cfg(client);
    if (value != undefined) {
      var len = value.polling_rates;
      if (len != undefined && len.length > 0x0) {
        i = len[len.length - 0x1];
      }
    }
  } else {
    i = POLLING_RATE_1000HZ;
    arr.forEach(item => {
      if (item.connected != undefined ? item.connected : false) {
        if (is_receiver(item)) {
          if (client.device == item.device) {
            var value2 = get_cfg(item);
            if (value2 != undefined && value2.boost_polling_rates != undefined) {
              value2.boost_polling_rates.forEach(item2 => {
                if (item2 > i) {
                  i = item2;
                }
              });
            }
          }
        }
      }
    });
  }
  var value = get_cfg(client);
  return value != undefined ? i < value.polling_rate_max ? i : value.polling_rate_max : i;
}

function get_max_power_polling_rate(client) {
  var value = POLLING_RATE_MAX_HZ;
  var len = get_power_modes(client);
  if (len.length >= POWER_MODE_COUNT_LIMIT && client.device_info.powerMode == POWER_MODE_LOWEST) {
    value = POLLING_RATE_MIN_HZ;
  } else if (len.length >= POWER_MODE_COUNT_LIMIT && client.device_info.powerMode == POWER_MODE_LOW) {
    value = POLLING_RATE_1000HZ;
  }
  return value;
}

function get_polling_rate(client) {
  return client.device_info.pollingRate;
}

function set_polling_rate(client, rate) {
  if (client.device_info.pollingRate != rate) {
    client.device_info.pollingRate = rate;
    send_event_mouse_param(client);
    return true;
  }
  return false;
}

function get_light(client) {
  return client.device_info.light;
}

function set_light(client, lightData) {
  if (is_receiver(client)) {
    if (client.device_info.light != lightData) {
      client.device_info.light = lightData;
      var payload = [];
      payload.push(0x3);
      payload.push(0x0);
      payload.push(0x12);
      payload.push(lightData);
      send_event(client, crc_process(client, payload));
      return true;
    }
  } else {
    if (client.device_info.light != lightData) {
      client.device_info.light = lightData | 8;
      send_event_mouse_param(client);
      return true;
    }
  }
  return false;
}

function is_light(client) {
  var value = get_cfg(client);
  return value != undefined ? value.light : false;
}

function get_light_colors(client) {
  var value = get_cfg(client);
  return value != undefined ? value.light_colors : [];
}

function get_light_display_colors(client) {
  var value = get_light_colors(client);
  var payload = [];
  if (value.includes("red") && value.includes("green") && value.includes("blue")) {
    payload.push("white");
  }
  if (value.includes('red')) {
    payload.push("red");
  }
  if (value.includes("green")) {
    payload.push("green");
  }
  if (value.includes("blue")) {
    payload.push("blue");
  }
  if (value.includes("red") && value.includes('green')) {
    payload.push("yellow");
  }
  if (value.includes('red') && value.includes("blue")) {
    payload.push("purple");
  }
  if (value.includes('green') && value.includes("blue")) {
    payload.push("skyblue");
  }
  payload.push("none");
  return payload;
}

function get_power_modes(client) {
  var value = get_cfg(client);
  return value != undefined ? value.power_modes : [];
}

function get_power_modes2(client) {
  var value = get_cfg(client);
  return value != undefined ? value.power_modes2 : [];
}

function get_power_mode_tips(client) {
  var value = get_cfg(client);
  return value != undefined ? value.power_mode_tips : [];
}

function get_power_mode(client) {
  return client.device_info.powerMode;
}

function set_power_mode(client, mode) {
  if (client.device_info.powerMode != mode) {
    client.device_info.powerMode = mode;
    send_event_mouse_param(client);
    return true;
  }
  return false;
}

function get_lods_list(client) {
  var value = get_cfg(client);
  return value != undefined ? value.lods : [];
}

function get_lod(client) {
  return client.device_info.lod;
}

function set_lod(client, lodVal) {
  if (client.device_info.lod != lodVal) {
    client.device_info.lod = lodVal;
    send_event_mouse_param(client);
    return true;
  }
  return false;
}

function get_angle_snapping(client) {
  return client.device_info.angleSnapping;
}

function set_angle_snapping(client, enabled) {
  if (client.device_info.angleSnapping != enabled) {
    client.device_info.angleSnapping = enabled;
    send_event_mouse_param(client);
    return true;
  }
  return false;
}

function get_ripple_control(client) {
  return client.device_info.rippleControl;
}

function set_ripple_control(client, enabled) {
  if (client.device_info.rippleControl != enabled) {
    client.device_info.rippleControl = enabled;
    send_event_mouse_param(client);
    return true;
  }
  return false;
}

function get_motion_sync(client) {
  return client.device_info.motionSync;
}

function set_motion_sync(client, enabled) {
  if (client.device_info.motionSync != enabled) {
    client.device_info.motionSync = enabled;
    send_event_mouse_param(client);
    return true;
  }
  return false;
}

function get_wireless_turbo(client) {
  return client.device_info.txOutputPower == 0x0 ? 0x0 : 0x1;
}

function is_auto_tx_power(client) {
  return client.device_info.autoTxPower;
}

function set_wireless_turbo(client, enabled) {
  if (enabled == 0x1) {
    if (client.device_info.txOutputPower != 0x8) {
      client.device_info.txOutputPower = 0x8;
      send_event_mouse_param(client);
    }
  } else if (client.device_info.txOutputPower != 0x0) {
    client.device_info.txOutputPower = 0x0;
    send_event_mouse_param(client);
  }
}

function get_tx_power_applied(client) {
  return client.device_info.txOutputPowerApplied;
}

function get_rf_channel(client) {
  return client.device_info.rfChannel;
}

function get_sleep_time(client) {
  return client.device_info.sleepTime;
}

function is_angle_tuning_supported(client) {
  var value = get_cfg(client);
  return value != undefined ? value.angle_tuning : true;
}

function get_angle_tuning(client) {
  return client.device_info.angleTuning;
}

function set_angle_tuning(client, enabled) {
  if (client.device_info.angleTuning != enabled) {
    client.device_info.angleTuning = enabled;
    send_event_mouse_param(client);
    return true;
  }
  return false;
}

function get_key_delay(client) {
  return client.device_info.keyDelay;
}

function get_onboard_index(client) {
  return client.device_info.onboardIndex;
}

function get_onboard_status(client) {
  return client.device_info.onboardStatus;
}

function set_onboard_status(client, index, status) {
  if (client.device_info.onboardStatus[index] != status) {
    client.device_info.onboardStatus[index] = status;
    send_event_mouse_param(client);
    return true;
  }
  return false;
}

function get_key_configs(client) {
  return JSON.parse(JSON.stringify(client.device_info.allKeyConfigs));
}

function set_key_delay(client, delay, keyDelay) {
  if (client.device_info.keyDelay[delay] != keyDelay) {
    client.device_info.keyDelay[delay] = keyDelay;
    return true;
  }
  return false;
}

function is_enhancement(client) {
  var value = get_cfg(client);
  return value != undefined ? value.enhancement : false;
}

function is_glass_mode(client) {
  return client.device_info.glassMode != undefined ? client.device_info.glassMode == 0x1 : false;
}

function is_glass_mode_enabled(client) {
  return client.device_info.glassModeEnabled != undefined ? client.device_info.glassModeEnabled == 0x1 : false;
}

function is_glass_mode_supported(client) {
  var value = get_cfg(client);
  return value != undefined ? value.glass_mode : false;
}

function set_enable_glass_mode(client, enabled) {
  if (client.device_info.glassModeEnabled != enabled) {
    client.device_info.glassModeEnabled = enabled;
    send_event_mouse_param(client);
    return true;
  }
  return false;
}

function set_auto_tx_power(client, enabled) {
  if (client.device_info.autoTxPower != enabled) {
    client.device_info.autoTxPower = enabled;
    send_event_mouse_param(client);
    return true;
  }
  return false;
}

function is_new_firmware_existed(client) {
  if (client.helloed) {
    if (client.device_info.firmwareInfo != undefined && client.device_info.firmwareInfo.code >= 0x0) {
      return client.device_info.firmwareInfo.code > client.device_info.revisionCode;
    }
  }
  return false;
}

function get_firmware_log(client) {
  return client.device_info.firmwareInfo.log;
}

function get_firmware_name(client) {
  return client.device_info.firmwareInfo.name;
}

function get_keys(client) {
  var value = get_cfg(client);
  return value != undefined ? value.keys : [];
}

function get_shortcuts(client) {
  var value = get_cfg(client);
  return value != undefined ? value.shortcuts : [];
}

function get_setup_icon(client) {
  var value = get_cfg(client);
  return value != undefined ? value.setup_icon : '';
}

function is_wired_mode(client) {
  return true && !client.virtual;
}

function is_ble_mode(client) {
  return false;
}

function is_gaming_only_mode(client) {
  return client.device_info != undefined && client.device_info.revision != undefined && client.device_info.revision.substr(0x0, 0x2) == 'G-';
}

function get_squal(client) {
  return client.device_info.squal;
}

function get_equal(client) {
  return client.device_info.equal;
}

function is_wired(client) {
  return client.device_info.wired;
}

function get_default_rf_channel(client) {
  var value = get_cfg(client);
  return value != undefined ? value.rf_chn : 0xff;
}

function is_limit_memory(client) {
  var value = get_cfg(client);
  return value != undefined ? value.limit_memory : false;
}

function get_soc(client) {
  var value = get_cfg(client);
  return value != undefined ? value.soc : "UNKNOWN";
}

function is_soc_compatible(client, productId) {
  var value = get_soc(client);
  var value2 = get_soc(productId);
  return value == value2 || value == "NORDIC" && value2 == "NORDIC2" || value == "NORDIC2" && value2 == "NORDIC";
}

function is_bt_supported(client) {
  var value = get_cfg(client);
  return value != undefined ? value.working_modes.includes('bt') : false;
}

function is_hopping_channel_supported(client) {
  return client.device_info.hopChannelSupported;
}

function is_hopping_channel(client) {
  return client.device_info.hopChannel;
}

function is_brightness_supported(client) {
  var value = get_cfg(client);
  return value != undefined ? value.brightness : false;
}

function get_brightness(client) {
  return client.device_info.brightness;
}

function parse_device_info(value, jsonStr) {
  try {
    var json = JSON.parse(jsonStr);
    if (json.revision != undefined) {
      value.revision = json.revision;
    } else if (json.r != undefined) {
      value.revision = json.r;
    }
    if (json.revision_code != undefined) {
      value.revisionCode = json.revision_code;
    } else if (json.rc != undefined) {
      value.revisionCode = json.rc;
    }
    if (json.hw != undefined) {
      value.hardwareCode = json.hw;
    }
    if (json.battery != undefined) {
      value.battery = json.battery;
    }
    if (json.addr != undefined) {
      value.macAddress = json.addr;
    }
    if (json.config_num != undefined) {
      value.configNum = json.config_num;
    } else if (json.cn != undefined) {
      value.configNum = json.cn;
    }
    if (json.cpi != undefined) {
      value.resolution = json.cpi;
    }
    if (json.polling != undefined) {
      value.pollingRate = json.polling;
    }
    if (json.light != undefined) {
      value.light = json.light;
    }
    if (json.cpi_l != undefined) {
      value.cpiLevels = json.cpi_l;
    }
    if (json.cpi_l_c != undefined) {
      value.cpiLevelColors = json.cpi_l_c;
    }
    if (json.ob != undefined) {
      value.onboard = json.ob;
    }
    if (json.esb_addr != undefined && !Array.isArray(json.esb_addr)) {
      value.esbAddress = json.esb_addr;
    }
    if (json.esb_addr != undefined && Array.isArray(json.esb_addr)) {
      value.esbAddressArr = json.esb_addr;
    }
    if (json.esb_selected != undefined) {
      value.esbSelected = json.esb_selected;
    }
    if (json.esb_ch != undefined) {
      value.esbChannel = json.esb_ch;
    }
    if (json.pm != undefined) {
      value.powerMode = json.pm;
    }
    if (json.dn != undefined) {
      value.deviceName = json.dn;
    }
    if (json.pi != undefined) {
      value.productId = json.pi;
    }
    if (json.vi != undefined) {
      value.vendorId = json.vi;
    }
    if (json.lod != undefined) {
      value.lod = json.lod;
    }
    if (json.lod_c != undefined) {
      value.lodCalib = json.lod_c;
    }
    if (json.kd != undefined) {
      value.keyDelay = json.kd;
    }
    if (json.ms != undefined) {
      value.motionSync = json.ms;
    }
    if (json.at != undefined) {
      value.angleTuning = json.at << 0x18 >> 0x18;
    }
    if (json.as != undefined) {
      value.angleSnapping = json.as;
    }
    if (json.rctrl != undefined) {
      value.rippleControl = json.rctrl;
    }
    if (json.chr != undefined) {
      value.charging = json.chr;
    }
    if (json.top != undefined) {
      value.txOutputPower = json.top;
      value.txOutputPowerApplied = value.txOutputPower;
    }
    if (json.atp != undefined) {
      value.autoTxPower = json.atp;
    }
    if (json.co != undefined) {
      value.colorCode = json.co;
    }
    if (json.lz != undefined) {
      value.lzSupported = json.lz == 0x1;
    }
    if (json.st != undefined) {
      value.sleepTime = json.st;
    }
    if (json.rf_ch != undefined) {
      value.rfChannel = json.rf_ch;
    }
    if (json.crc != undefined) {
      value.crcSupported = json.crc == 0x1;
    }
    if (json.lua != undefined) {
      value.luaStatus = json.lua;
    }
    if (json.noack != undefined) {
      value.noack = json.noack;
    }
    if (json.gm != undefined) {
      if (Array.isArray(json.gm)) {
        value.glassMode = json.gm[0x0];
        value.glassModeEnabled = json.gm[0x1];
      } else {
        value.glassMode = json.gm;
        value.glassModeEnabled = 0x1;
      }
    }
    if (json.ocn != undefined) {
      value.onboardConfigNum = json.ocn;
    }
    if (json.oci != undefined) {
      value.onboardIndex = json.oci;
    }
    if (json.ocs != undefined) {
      value.onboardStatus = json.ocs;
    }
    if (json.ec != undefined) {
      value.enhancedCpi = json.ec == 0x1;
    }
    if (json.dgom != undefined) {
      value.dynamicGOM = json.dgom == 0x1;
    }
    if (json.wired != undefined) {
      value.wired = json.wired == 0x1;
    }
    if (json.sst != undefined) {
      value.sensor = json.sst;
    }
    if (json.lbn != undefined) {
      value.brightness = json.lbn;
    }
    if (json.hc != undefined) {
      value.hopChannelSupported = json.hc != 0xff;
      value.hopChannel = json.hc == 0x1;
    }
    if (json.slow != undefined) {
      value.slow = json.slow == 0x1;
    }
    let payload = [];
    while (payload.length < value.onboardConfigNum) {
      let arr = [];
      payload.push(arr);
    }
    value.allKeyConfigs = payload;
  } catch (err) {
    log_r(err);
  }
  return value;
}


// ===== state/kbd-structures.js ====================================================
// ===== KEYBOARD DATA STRUCTURE FACTORY FUNCTIONS =============================
// Pure constructors and cloners for keyboard config data structures.
// No side effects, no global state — these are just object factories.
// Extracted from 04-kbd-structures.js during Phase 7 refactoring.
// ============================================================================

function kbd_create_key_light_info(client, value, hue, sat) {
  var keyLightInfo = {
    row: client,
    col: value,
    hue: hue,
    sat: sat
  };
  return keyLightInfo;
}

function kbd_create_light_box_info() {
  var lightBoxInfo = {
    mode: 0x1,
    r: 0x0,
    g: 0xff,
    b: 0x0,
    speed: 0x32,
    brightness: 0x64,
    colored: 0x1
  };
  return lightBoxInfo;
}

function kbd_clone_light_box_info(client) {
  var obj = kbd_create_light_box_info();
  obj.mode = client.mode;
  obj.r = client.r;
  obj.g = client.g;
  obj.b = client.b;
  obj.speed = client.speed;
  obj.brightness = client.brightness;
  obj.colored = client.colored;
  return obj;
}

function kbd_create_light_info() {
  var lightInfo = {
    keys: [],
    mode: 0xd,
    hue: 0xff,
    sat: 0xff,
    speed: 0x32,
    brightness: 0x64,
    sleep_time: 0x0,
    light_box_info: kbd_create_light_box_info()
  };
  return lightInfo;
}

function kbd_clone_light_info(client) {
  var obj = kbd_create_light_info();
  obj.keys = client.keys.slice();
  obj.mode = client.mode;
  obj.hue = client.hue;
  obj.sat = client.sat;
  obj.speed = client.speed;
  obj.brightness = client.brightness;
  obj.sleep_time = client.sleep_time;
  obj.light_box_info = kbd_clone_light_box_info(client.light_box_info);
  return obj;
}

function kbd_create_axis_info() {
  var axisInfo = {
    row: -0x1,
    col: -0x1,
    switch_type: 0x0,
    apc_lv: 0x96,
    rt_enable: 0x0,
    rt_press_lv: 0x32,
    rt_release_lv: 0x32,
    top_dz: 0xf,
    btm_dz: 0x14
  };
  return axisInfo;
}

function kbd_clone_axis_info(client) {
  var obj = kbd_create_axis_info();
  obj.row = client.row;
  obj.col = client.col;
  obj.switch_type = client.switch_type;
  obj.apc_lv = client.apc_lv;
  obj.rt_enable = client.rt_enable;
  obj.rt_press_lv = client.rt_press_lv;
  obj.rt_release_lv = client.rt_release_lv;
  obj.top_dz = client.top_dz;
  obj.btm_dz = client.btm_dz;
  return obj;
}

function kbd_create_socd_info() {
  var socdInfo = {
    id: -0x1,
    row1: -0x1,
    col1: -0x1,
    row2: -0x1,
    col2: -0x1,
    socd_mode: 0x0
  };
  return socdInfo;
}

function kbd_clone_socd_info(client) {
  var obj = kbd_create_socd_info();
  obj.id = client.id;
  obj.row1 = client.row1;
  obj.col1 = client.col1;
  obj.row2 = client.row2;
  obj.col2 = client.col2;
  obj.socd_mode = client.socd_mode;
  return obj;
}

function kbd_create_mt_info() {
  var mtInfo = {
    id: -0x1,
    row: -0x1,
    col: -0x1,
    tap_time: 0xc8,
    keyCode1: 0x0,
    keyCode2: 0x0
  };
  return mtInfo;
}

function kbd_clone_mt_info(client) {
  var obj = kbd_create_mt_info();
  obj.id = client.id;
  obj.row = client.row;
  obj.col = client.col;
  obj.tap_time = client.tap_time;
  obj.keyCode1 = client.keyCode1;
  obj.keyCode2 = client.keyCode2;
  return obj;
}

function kbd_create_rs_info() {
  var rsInfo = {
    id: -0x1,
    row1: -0x1,
    col1: -0x1,
    row2: -0x1,
    col2: -0x1
  };
  return rsInfo;
}

function kbd_clone_rs_info(client) {
  var obj = kbd_create_rs_info();
  obj.id = client.id;
  obj.row1 = client.row1;
  obj.col1 = client.col1;
  obj.row2 = client.row2;
  obj.col2 = client.col2;
  return obj;
}

function kbd_create_dks_info() {
  var dksInfo = {
    id: -0x1,
    row: -0x1,
    col: -0x1,
    keyCode1: 0x0,
    state1: 0x0,
    keyCode2: 0x0,
    state2: 0x0,
    keyCode3: 0x0,
    state3: 0x0,
    keyCode4: 0x0,
    state4: 0x0
  };
  return dksInfo;
}

function kbd_clone_dks_info(client) {
  var obj = kbd_create_dks_info();
  obj.id = client.id;
  obj.row = client.row;
  obj.col = client.col;
  obj.keyCode1 = client.keyCode1;
  obj.state1 = client.state1;
  obj.keyCode2 = client.keyCode2;
  obj.state2 = client.state2;
  obj.keyCode3 = client.keyCode3;
  obj.state3 = client.state3;
  obj.keyCode4 = client.keyCode4;
  obj.state4 = client.state4;
  return obj;
}


// ===== protocol/buffer.js ====================================================
// ===== TYPED BUFFER HELPERS ==================================================
// PacketBuilder serialises command parameters into Uint8Array payloads.
// PacketReader deserialises response data from Uint8Array payloads.

class PacketBuilder {
  constructor() {
    this.data = [];
  }

  static begin(cmd) {
    var b = new PacketBuilder();
    b.uint8(cmd);
    return b;
  }

  uint8(v) {
    this.data.push(v & 0xff);
    return this;
  }

  uint16(v) {
    this.data.push(v & 0xff);
    this.data.push((v >> 8) & 0xff);
    return this;
  }

  uint24(v) {
    this.data.push(v & 0xff);
    this.data.push((v >> 8) & 0xff);
    this.data.push((v >> 16) & 0xff);
    return this;
  }

  uint32(v) {
    this.data.push(v & 0xff);
    this.data.push((v >> 8) & 0xff);
    this.data.push((v >> 16) & 0xff);
    this.data.push((v >> 24) & 0xff);
    return this;
  }

  bytes(arr) {
    for (var i = 0; i < arr.length; i++) {
      this.data.push(arr[i] & 0xff);
    }
    return this;
  }

  padTo(len, value) {
    while (this.data.length < len) {
      this.data.push(value || 0);
    }
    return this;
  }

  build() {
    return new Uint8Array(this.data);
  }
}

class PacketReader {
  constructor(data) {
    this.data = data;
    this.offset = 0;
  }

  uint8() {
    return this.data[this.offset++] & 0xff;
  }

  uint16() {
    var v = (this.data[this.offset] & 0xff) | ((this.data[this.offset + 1] & 0xff) << 8);
    this.offset += 2;
    return v;
  }

  uint16BE() {
    var v = ((this.data[this.offset] & 0xff) << 8) | (this.data[this.offset + 1] & 0xff);
    this.offset += 2;
    return v;
  }

  uint32() {
    var v = 0;
    for (var i = 0; i < 4; i++) {
      v |= (this.data[this.offset++] & 0xff) << (i * 8);
    }
    return v >>> 0;
  }

  subarray(len) {
    var s = this.data.subarray(this.offset, this.offset + len);
    this.offset += len;
    return s;
  }

  skip(len) {
    this.offset += len;
    return this;
  }

  done() {
    return this.offset >= this.data.length;
  }

  remaining() {
    return this.data.length - this.offset;
  }

  atEnd() {
    return this.offset >= this.data.length;
  }
}


// ===== protocol/hid-transport.js ====================================================
// ===== HID / HS TRANSPORT LAYER ==============================================
// Core send/receive primitives used by the protocol modules.

// ===== SEND BUFFER MANAGEMENT ================================================
let timeoutID = {};

function post_send_client_data(item) {
  if (typeof timeoutID[item.id] === "number") {
    clearTimeout(timeoutID[item.id]);
  }
  timeoutID[item.id] = setTimeout(clientId => {
    window.postMessage({
      'action': ACTION_SEND_CLIENT_DATA,
      'usb_client_id': clientId
    });
  }, HID_SEND_DEBOUNCE_MS, item.id);
}

function send_event(client, data) {
  var bytes = new Uint8Array(client.send_event_buf.byteLength + data.byteLength);
  bytes.set(client.send_event_buf);
  bytes.set(data, client.send_event_buf.byteLength);
  client.send_event_buf = bytes;
  post_send_client_data(client);
}

// ===== CRC ===================================================================
function crc16_compute(data, len) {
  var value = 0xffff;
  for (var i = 0; i < len; i++) {
    value = value >> 8 & 0xff | value << 8;
    value ^= data[i];
    value ^= (value & 0xff) >> 4;
    value ^= value << 8 << 4;
    value ^= (value & 0xff) << 4 << 1;
  }
  return value;
}

function crc_process(client, data) {
  var bytes = new Uint8Array(data);
  var value = bytes.byteLength;
  bytes[0] = (value >> 4 & 0xf0 | bytes[0]) & 0xff;
  bytes[1] = value & 0xff & 0xff;
  if (client.device_info != undefined && client.device_info.crcSupported) {
    var value2 = value + 5;
    var crc = crc16_compute(bytes, value);
    var bytes2 = new Uint8Array(value2);
    bytes2[0] = (value2 >> 4 & 0xf0 | 0x3) & 0xff;
    bytes2[1] = value2 & 0xff & 0xff;
    bytes2[2] = 0x24;
    bytes2[3] = crc & 0xff;
    bytes2[4] = crc >> 8 & 0xff;
    bytes2.set(bytes, 5);
    return bytes2;
  }
  return bytes;
}

// ===== HID READ EVENT ========================================================
function read_event(client, size) {
  var bytes = new Uint8Array(size);
  if (client.pause) {
    bytes[0] = 0;
  } else {
    var value = client.send_event_buf.byteLength;
    if (value <= size - 1) {
      bytes[0] = 0x80 | value & 0xff;
      bytes.set(client.send_event_buf, 1);
      client.send_event_buf = new Uint8Array(0);
    } else {
      bytes[0] = 0x80 | size - 1 & 0xff;
      bytes.set(client.send_event_buf.subarray(0, size - 1), 1);
      client.send_event_buf = client.send_event_buf.subarray(size - 1);
    }
  }
  return bytes;
}

// ===== HID SEND CLIENT DATA ==================================================
async function send_client_data(client) {
  if (is_hs_keyboard(client.device)) {
    hs_send_client_data(client);
    return;
  }
  try {
    if (client.allow_send) {
      var bytes;
      var i;
      var value = client.product_esb_ch;
      if (value == 0xff) {
        bytes = read_event(client, HID_REPORT_SIZE);
        i = bytes[0] & HID_LENGTH_MASK;
      } else {
        bytes = read_event(client, 63);
        i = bytes[0] & HID_LENGTH_MASK;
        var payload = Array.from(bytes);
        payload.unshift(0xc0 | value);
        while (payload.length < HID_REPORT_SIZE) {
          payload.push(0);
        }
        bytes = new Uint8Array(payload);
      }
      if (i > 0) {
        var value2 = client.device;
        if (!value2.opened) {
          await value2.open();
        }
        await value2.sendReport(0, bytes);
        if (client.virtual) {
          var flag = false;
          usb_client_list.forEach(item => {
            if (is_receiver(item) && item.device == client.device) {
              flag = is_limit_memory(item);
            }
          });
          if (flag) {
            client.allow_send = false;
          }
        }
        post_send_client_data(client);
      }
    } else {
      if (client.virtual) {
        var flag = false;
        usb_client_list.forEach(item2 => {
          if (is_receiver(item2) && item2.device == client.device) {
            flag = is_limit_memory(item2);
          }
        });
        if (flag) {
          var bytes = new Uint8Array(1);
          var value = client.product_esb_ch;
          bytes[0] = 64;
          var payload = Array.from(bytes);
          payload.unshift(0xc0 | value);
          while (payload.length < HID_REPORT_SIZE) {
            payload.push(0);
          }
          bytes = new Uint8Array(payload);
          var value2 = client.device;
          if (!value2.opened) {
            await value2.open();
          }
          await value2.sendReport(0, bytes);
        }
      }
      post_send_client_data(client);
    }
  } catch (err) {
    log_r(err);
  }
}

// ===== HS READ / SEND ========================================================
function hs_format_data(client, data) {
  var bytes = new Uint8Array(data);
  var payload = [];
  for (var len = 0; len < HS_FRAME_SIZE; len++) {
    if (len < bytes.byteLength) {
      payload.push(bytes[len]);
    } else {
      payload.push(0);
    }
  }
  return new Uint8Array(payload);
}

function hs_read_event(client, data) {
  var bytes = new Uint8Array(data);
  if (client.pause) {
    var value = client.send_event_buf.byteLength;
    if (value <= data - 1) {
      client.send_event_buf = new Uint8Array(0);
      return client.send_event_buf;
    }
  } else {
    var value = client.send_event_buf.byteLength;
    if (value <= data - 1) {
      client.send_event_buf = new Uint8Array(0);
      return client.send_event_buf;
    } else {
      bytes.set(client.send_event_buf.subarray(0, data), 0);
      client.send_event_buf = client.send_event_buf.subarray(data);
    }
  }
  return bytes;
}

async function hs_send_client_data(client) {
  try {
    if (client.allow_send) {
      var bytes;
      var i;
      var value = client.product_esb_ch;
      if (value == 0xff) {
        bytes = hs_read_event(client, HS_FRAME_SIZE);
        i = bytes.length;
      } else {
        bytes = read_event(client, 63);
        i = bytes[0] & HID_LENGTH_MASK;
        var payload = Array.from(bytes);
        payload.unshift(0xc0 | value);
        while (payload.length < HID_REPORT_SIZE) {
          payload.push(0);
        }
        bytes = new Uint8Array(payload);
      }
      if (i > 0) {
        var value2 = client.device;
        if (!value2.opened) {
          await value2.open();
        }
        await value2.sendReport(0, bytes);
        if (client.virtual) {
          var flag = false;
          usb_client_list.forEach(item => {
            if (is_receiver(item) && item.device == client.device) {
              flag = is_limit_memory(item);
            }
          });
          if (flag) {
            client.allow_send = false;
          }
        }
        post_send_client_data(client);
      }
    } else {
      if (client.virtual) {
        var flag = false;
        usb_client_list.forEach(item2 => {
          if (is_receiver(item2) && item2.device == client.device) {
            flag = is_limit_memory(item2);
          }
        });
        if (flag) {
          var bytes = new Uint8Array(1);
          var value = client.product_esb_ch;
          bytes[0] = 64;
          var payload = Array.from(bytes);
          payload.unshift(0xc0 | value);
          while (payload.length < HID_REPORT_SIZE) {
            payload.push(0);
          }
          bytes = new Uint8Array(payload);
          var value2 = client.device;
          if (!value2.opened) {
            await value2.open();
          }
          await value2.sendReport(0, bytes);
        }
      }
      post_send_client_data(client);
    }
  } catch (err) {
    log_r(err);
  }
}

// ===== HS RECEIVE ============================================================
function hs_recv(client, data) {
  if (client.eplapsed_syncing_ms != 0 && new Date().getTime() - client.eplapsed_syncing_ms > SYNC_TIMEOUT_MS) {
    if (client.syncing) {
      log_r(">>>>>>>>sync success");
      client.syncing = false;
    }
    client.recv_buf = new Uint8Array(0);
  }
  client.eplapsed_syncing_ms = new Date().getTime();
  var bytes = new Uint8Array(client.recv_buf.byteLength + data.byteLength);
  bytes.set(client.recv_buf);
  bytes.set(data, client.recv_buf.byteLength);
  client.recv_buf = bytes;
  if (!client.syncing) {
    hs_parse_cmd(client);
  }
}

async function hs_device_receive_data(params) {
  var device = params.device;
  var data = params.data;
  usb_client_list.forEach(item => {
    if (item.device == device && !item.virtual) {
      var bytes = new Uint8Array(data.buffer);
      hs_recv(item, bytes);
    }
  });
}

// ===== HID RECEIVE ===========================================================
function skip_recv_buf(data, len) {
  var bytes = new Uint8Array(data.byteLength - len);
  bytes.set(data.subarray(len));
  return bytes;
}

function recv(client, data) {
  if (client.eplapsed_syncing_ms != 0 && new Date().getTime() - client.eplapsed_syncing_ms > SYNC_TIMEOUT_MS) {
    if (client.syncing) {
      log_r(">>>>>>>>sync success");
      client.syncing = false;
    }
    client.recv_buf = new Uint8Array(0);
  }
  client.eplapsed_syncing_ms = new Date().getTime();
  var bytes = new Uint8Array(client.recv_buf.byteLength + data.byteLength);
  bytes.set(client.recv_buf);
  bytes.set(data, client.recv_buf.byteLength);
  client.recv_buf = bytes;
  if (!client.syncing) {
    parse_cmd(client);
  }
}

async function device_receive_data(params) {
  var device = params.device;
  var reportId = params.reportId;
  var data = params.data;
  if (data && data.byteLength > 0) {}
  if (is_hs_keyboard(device)) {
    hs_device_receive_data({
      'device': device,
      'reportId': reportId,
      'data': data
    });
    return;
  }
  usb_client_list.forEach(item => {
    if (item.device == device && !item.virtual) {
      var bytes = new Uint8Array(data.buffer);
      var value = 0xff;
      if ((bytes[0] & MASK_TOP_2BITS) == 0xc0) {
        value = bytes[0] & HID_LENGTH_MASK;
        bytes = bytes.subarray(1);
      }
      var offset = bytes[0] & HID_LENGTH_MASK;
      if (value == 0xff) {
        if ((bytes[0] & MASK_TOP_2BITS) == 0x40) {} else {
          bytes = bytes.subarray(1, 1 + offset);
          recv(item, bytes);
        }
      } else {
        usb_client_list.forEach(client => {
          if (client.device == device && client.virtual && client.product_esb_ch == value) {
            if ((bytes[0] & MASK_TOP_2BITS) == 0x40) {
              var value2 = bytes[1] | bytes[2] << 8 | bytes[3] << 16 | bytes[4] << 24;
              var value3 = bytes[15] | bytes[16] << 8 | bytes[17] << 16 | bytes[18] << 24;
              if ((bytes[0] & HID_LENGTH_MASK) < 0x12) {
                value3 = NOTIFY_DATA_BUF_SIZE;
              }
              if (value3 > 0) {
                if (value2 > value3 / 2) {
                  remote_buf_free_size = value2;
                }
              } else {
                remote_buf_free_size = value2;
              }
              if (remote_buf_free_size >= 240) {
                client.allow_send = true;
              }
            } else {
              bytes = bytes.subarray(1, 1 + offset);
              recv(client, bytes);
            }
          }
        });
      }
    }
  });
}


// ===== protocol/hs-parser.js ====================================================
// ===== HS (HIGH‑SPEED KEYBOARD) PROTOCOL =====================================
// These functions implement the RAWM HS keyboard binary protocol. Commands
// are sent via send_event() (which appends to the client's send buffer) and
// trigger a send_client_data() call. The firmware responds with 0x20‑byte
// frames that hs_parse_cmd() decodes via a large switch on the first byte.
//
// Key command IDs (first byte of the frame):
//   0xf5 — firmware version / hello
//   0x12 — get keycode buffer (chunked)
//   0x5  — set single keycode
//   0x8  — get light parameter
//   0x7  — set light parameter
//   0x36 — get light‑define buffer (chunked)
//   0x37 — set single light‑define
//   0x1a — get axis info (chunked)
//   0x19 — set axis info
//   0x1e/0x1f — SOCD get/set num
//   0x20/0x21 — SOCD get/set data
//   0x22/0x23 — MT get/set num
//   0x24/0x25 — MT get/set data
//   0x2e/0x2f — RS get/set num
//   0x30/0x31 — RS get/set data
//   0x2a/0x2b — DKS get/set num
//   0x2c/0x2d — DKS get/set data
//   0xe/0xf  — macro buffer get/set
//   0xc/0xd  — macro num / buffer size
//   0x10     — reset macro buffer
//   0x39/0x40 — get/set onboard index
//   0x45/0x46 — get/set axis mode
// ============================================================================

// ===== HS PROTOCOL HANDLER REGISTRY ==========================================
// Each handler receives (client, byteLen) where byteLen is the full frame
// from client.recv_buf. Handlers parse the response and update state via
// DeviceStore or client.device_info directly.

var hsHandlers = {};

hsHandlers[CMD_FIRMWARE_VERSION] = function hs_parse_firmware_version(client, byteLen) {
  log_r("IQ_GET_SOFT_DRV_VER");
  if (client.device.productName != undefined) {
    client.connected = true;
    client.helloed = client.device.productName.length > 0;
    client.device_name = client.device.productName;
  } else {
    client.recv_buf = new Uint8Array(0);
    client.syncing = true;
  }
  var value3 = byteLen[1];
  client.device_info.revision = String.fromCharCode.apply(null, byteLen.subarray(2, 2 + value3));
  hs_get_onboard_index(client);
  window.postMessage({ 'action': ACTION_REFRESH_CLIENT_LIST });
  window.postMessage({ 'action': ACTION_UI_REFRESH_CLIENT_LIST });
  window.postMessage({ 'action': ACTION_UI_REFRESH_CURRENT_CLIENT });
};

hsHandlers[CMD_KEYCODE_FACTORY_RESET] = function hs_parse_keycode_factory_reset(client, byteLen) {
  log_r("IQ_RESET_KEYCODE");
  hs_get_onboard_index(client);
};

hsHandlers[CMD_GET_ONBOARD_INDEX] = function hs_parse_get_onboard_index(client, byteLen) {
  log_r("IQ_GET_PROFILE_ID");
  client.device_info.onboardIndex = byteLen[1];
  DeviceStore.kbdSync.index = 0;
  hs_data_sync(client);
};

hsHandlers[CMD_SET_ONBOARD_INDEX] = function hs_parse_set_onboard_index(client, byteLen) {
  log_r("IQ_GET_PROFILE_ID");
  client.device_info.onboardIndex = byteLen[1];
  DeviceStore.kbdSync.index = 0;
  hs_data_sync(client);
};

hsHandlers[CMD_GET_KEYCODE_BUF] = function hs_parse_get_keycode_buf(client, byteLen) {
  log_r("IQ_GET_KEYCODE_BUF");
  var value = pc_kbd_key_num(client);
  var len = pc_kbd_manager_keys(client);
  var value4 = byteLen[2] | byteLen[1] << 8;
  var value5 = byteLen[3];
  for (var offset = 0; offset < value5; offset += 2) {
    var value6 = byteLen[4 + offset] << 8 | byteLen[4 + offset + 1];
    var index = (value4 + offset) / 2;
    if (index >= value) {
      index = index - value;
    }
    var item = len[index];
    DeviceStore.kbdSync.keyinfoList.push(kbd_create_pc_key_info(item.type, item.vCode, get_key_name_from_keyid(value6), item.aCode, item.aName, item.sCode, value6, item.row, item.col, item.rect));
  }
  if (value4 + value5 < value * 4) {
    var value7 = value * 4 - value4 - value5;
    hs_get_keycode_buff(client, value4 + value5, value7 < HS_CHUNK_MAX ? value7 : HS_CHUNK_MAX);
  } else {
    if (is_keyboard_5_15(client.device)) {
      DeviceStore.kbdSync.keyinfoList[0x3f].name = '';
    }
    client.device_info.kbd_key_infos = DeviceStore.kbdSync.keyinfoList.slice();
    DeviceStore.kbdSync.keyinfoList.splice(0, DeviceStore.kbdSync.keyinfoList.length);
    log_r("IQ_GET_KEYCODE_BUF finish");
    DeviceStore.kbdSync.index = DeviceStore.kbdSync.index | SYNC_FLAG_KEYCODE;
    hs_get_macro_num(client);
    window.postMessage({ 'action': ACTION_UI_REFRESH_KBD_KEY });
  }
};

hsHandlers[CMD_SET_KEYCODE] = function hs_parse_set_keycode(client, byteLen) {
  if (byteLen.length >= 6) {
    var value8 = byteLen[1];
    var value9 = byteLen[2];
    var value10 = byteLen[3];
    var value6 = byteLen[5] | byteLen[4] << 8;
    var value = pc_kbd_key_num(client);
    if (value8 == 0) {
      for (var offset = 0; offset < value; offset++) {
        var item = client.device_info.kbd_key_infos[offset];
        if (value9 == item.row && value10 == item.col) {
          item.keyId = value6;
          item.name = get_key_name_from_keyid(value6);
          break;
        }
      }
    } else {
      for (var offset = value; offset < value * 2 - 1; offset++) {
        var item = client.device_info.kbd_key_infos[offset];
        if (value9 == item.row && value10 == item.col) {
          item.keyId = value6;
          item.name = get_key_name_from_keyid(value6);
          break;
        }
      }
    }
  }
};

hsHandlers[CMD_MACRO_NUM] = function hs_parse_macro_num(client, byteLen) {
  log_r("IQ_GET_MACRO_NUM");
  client.device_info.kbd_macro_num = byteLen[1];
  client.device_info.kbd_macro_infos.splice(0, client.device_info.kbd_macro_infos.length);
  for (var offset = 0; offset < client.device_info.kbd_macro_num; offset++) {
    client.device_info.kbd_macro_infos.push([]);
  }
  hs_get_macro_buffer_size(client);
};

hsHandlers[CMD_MACRO_SIZE] = function hs_parse_macro_size(client, byteLen) {
  log_r("IQ_GET_MACRO_SIZE");
  client.device_info.kbd_macro_max_size = byteLen[1] << 8 | byteLen[2];
  DeviceStore.kbdSync.macroIndex = 0;
  DeviceStore.kbdSync.macroBuff = [];
  hs_get_macro_buf(client, 0, HS_CHUNK_MAX);
};

hsHandlers[CMD_MACRO_RESET] = function hs_parse_macro_reset(client, byteLen) {
  log_r('IQ_RESET_MACRO');
  hs_set_macro_data(client, 0);
};

hsHandlers[CMD_MACRO_GET] = function hs_parse_macro_get(client, byteLen) {
  log_r("IQ_GET_MACRO_DATA_BUF");
  var value4 = byteLen[1] << 8 | byteLen[2];
  var value11 = byteLen[3];
  for (var offset = 0; offset < value11; offset++) {
    var offset2 = byteLen[4 + offset];
    if (offset2 == 0) {
      if (DeviceStore.kbdSync.macroBuff.length >= 3) {
        var idx = 1;
        while (idx < DeviceStore.kbdSync.macroBuff.length) {
          if (DeviceStore.kbdSync.macroBuff[idx] == 2) {
            idx++;
            var value6 = DeviceStore.kbdSync.macroBuff[idx];
            var macroInfo = create_macro_info();
            macroInfo.mouse_key_event = MOUSE_EVENT_KEY_DOWN;
            macroInfo.mouse_key_code = get_key_code_from_keyid(value6);
            client.device_info.kbd_macro_infos[DeviceStore.kbdSync.macroIndex].push(macroInfo);
            idx++;
            idx++;
          } else if (DeviceStore.kbdSync.macroBuff[idx] == 3) {
            idx++;
            var value6 = DeviceStore.kbdSync.macroBuff[idx];
            var macroInfo = create_macro_info();
            macroInfo.mouse_key_event = MOUSE_EVENT_KEY_UP;
            macroInfo.mouse_key_code = get_key_code_from_keyid(value6);
            client.device_info.kbd_macro_infos[DeviceStore.kbdSync.macroIndex].push(macroInfo);
            idx++;
            idx++;
          } else if (DeviceStore.kbdSync.macroBuff[idx] == 4) {
            idx++;
            var str = '';
            while (DeviceStore.kbdSync.macroBuff[idx] >= '0'.charCodeAt() && DeviceStore.kbdSync.macroBuff[idx] <= '9'.charCodeAt()) {
              str += String.fromCharCode(DeviceStore.kbdSync.macroBuff[idx]);
              idx++;
            }
            var len2 = client.device_info.kbd_macro_infos[DeviceStore.kbdSync.macroIndex];
            var macroInfo = len2[len2.length - 1];
            if (macroInfo != undefined) {
              macroInfo.mouse_key_time = parseInt(str);
            }
            idx++;
            idx++;
          }
        }
      }
      DeviceStore.kbdSync.macroIndex++;
      DeviceStore.kbdSync.macroBuff = [];
    } else {
      DeviceStore.kbdSync.macroBuff.push(offset2);
    }
  }
  if (DeviceStore.kbdSync.macroIndex >= client.device_info.kbd_macro_num) {
    hs_data_sync(client);
  } else {
    hs_get_macro_buf(client, value4 + value11, HS_CHUNK_MAX);
  }
};

hsHandlers[CMD_MACRO_SET] = function hs_parse_macro_set(client, byteLen) {
  log_r('IQ_SET_MACRO_DATA_BUF');
  var value4 = byteLen[1] << 8 | byteLen[2];
  var value11 = byteLen[3];
  if (value4 + value11 >= DeviceStore.kbdSync.macroBuff.length) {
    client.device_info.kbd_macro_infos.splice(0, client.device_info.kbd_macro_infos.length);
    for (var offset = 0; offset < client.device_info.kbd_macro_num; offset++) {
      client.device_info.kbd_macro_infos.push([]);
      var len3 = DeviceStore.kbdSync.macroinfoList[offset];
      if (len3.length > 0) {
        for (var count = 0; count < len3.length; count++) {
          client.device_info.kbd_macro_infos[offset].push(clone_macro_info(len3[count]));
        }
      }
    }
    window.postMessage({ 'action': ACTION_UI_REFRESH_KBD_MACRO });
  } else {
    hs_set_macro_data(client, value4 + value11);
  }
};

hsHandlers[CMD_GET_LIGHT] = function hs_parse_get_light(client, byteLen) {
  if (byteLen.length >= 4) {
    var value12 = byteLen[2];
    if (value12 == LIGHT_PARAM_BRIGHTNESS) {
      client.device_info.kbd_light_info.brightness = byteLen[3];
      hs_get_light(client, LIGHT_PARAM_MODE);
    } else if (value12 == LIGHT_PARAM_MODE) {
      client.device_info.kbd_light_info.mode = byteLen[3];
      hs_get_light(client, LIGHT_PARAM_SPEED);
    } else if (value12 == LIGHT_PARAM_SPEED) {
      client.device_info.kbd_light_info.speed = byteLen[3];
      hs_get_light(client, LIGHT_PARAM_HUE_SAT);
    } else if (value12 == LIGHT_PARAM_HUE_SAT) {
      client.device_info.kbd_light_info.hue = byteLen[3];
      client.device_info.kbd_light_info.sat = byteLen[4];
      hs_get_light_sleep_time(client);
    }
  }
};

hsHandlers[CMD_GET_LIGHT_SLEEP] = function hs_parse_get_light_sleep(client, byteLen) {
  log_r("IQ_GET_RGB_COLOR_SLEEP_TIME");
  var value13 = byteLen[1];
  var value14 = byteLen[2] << 8 | byteLen[3];
  if (value13 == 0) {
    client.device_info.kbd_light_info.sleep_time = 0;
  } else {
    client.device_info.kbd_light_info.sleep_time = value14;
  }
  hs_get_light_box(client);
};

hsHandlers[CMD_SET_LIGHT_SLEEP] = function hs_parse_set_light_sleep(client, byteLen) {
  log_r("IQ_SET_RGB_COLOR_SLEEP_TIME");
  var value13 = byteLen[1];
  var value14 = byteLen[2] << 8 | byteLen[3];
  if (value13 == 0) {
    client.device_info.kbd_light_info.sleep_time = 0;
  } else {
    client.device_info.kbd_light_info.sleep_time = value14;
  }
};

hsHandlers[CMD_GET_LIGHT_BOX] = function hs_parse_get_light_box(client, byteLen) {
  log_r("IQ_GET_BOX_RGB_COLOR");
  var idx = 1;
  idx++;
  client.device_info.kbd_light_info.light_box_info.mode = byteLen[idx++];
  client.device_info.kbd_light_info.light_box_info.colored = byteLen[idx++];
  client.device_info.kbd_light_info.light_box_info.brightness = byteLen[idx++];
  client.device_info.kbd_light_info.light_box_info.speed = byteLen[idx++];
  client.device_info.kbd_light_info.light_box_info.r = byteLen[idx++];
  client.device_info.kbd_light_info.light_box_info.g = byteLen[idx++];
  client.device_info.kbd_light_info.light_box_info.b = byteLen[idx++];
  hs_get_light_buff(client, 0, HS_CHUNK_MAX);
};

hsHandlers[CMD_SET_LIGHT_BOX] = function hs_parse_set_light_box(client, byteLen) {
  log_r("IQ_GET_BOX_RGB_COLOR");
  var idx = 1;
  idx++;
  client.device_info.kbd_light_info.light_box_info.mode = byteLen[idx++];
  client.device_info.kbd_light_info.light_box_info.colored = byteLen[idx++];
  client.device_info.kbd_light_info.light_box_info.brightness = byteLen[idx++];
  client.device_info.kbd_light_info.light_box_info.speed = byteLen[idx++];
  client.device_info.kbd_light_info.light_box_info.r = byteLen[idx++];
  client.device_info.kbd_light_info.light_box_info.g = byteLen[idx++];
  client.device_info.kbd_light_info.light_box_info.b = byteLen[idx++];
};

hsHandlers[CMD_SET_LIGHT] = function hs_parse_set_light(client, byteLen) {
  if (byteLen.length >= 4) {
    log_r("IQ_SET_CUSTOM:" + byteLen);
    var value12 = byteLen[2];
    if (value12 == LIGHT_PARAM_BRIGHTNESS) {
      client.device_info.kbd_light_info.brightness = byteLen[3];
    } else if (value12 == LIGHT_PARAM_MODE) {
      client.device_info.kbd_light_info.mode = byteLen[3];
    } else if (value12 == LIGHT_PARAM_SPEED) {
      client.device_info.kbd_light_info.speed = byteLen[3];
    } else if (value12 == LIGHT_PARAM_HUE_SAT) {
      client.device_info.kbd_light_info.hue = byteLen[3];
      client.device_info.kbd_light_info.sat = byteLen[4];
    }
  }
};

hsHandlers[CMD_GET_LIGHT_DEFINE_BUF] = function hs_parse_get_light_define_buf(client, byteLen) {
  log_r("IQ_GET_RGB_COLOR_BUF");
  var value = pc_kbd_key_num(client);
  var len = pc_kbd_manager_keys(client);
  var value4 = byteLen[1] << 8 | byteLen[2];
  var value5 = byteLen[3];
  for (var offset = 0; offset < value5; offset += 2) {
    var value15 = byteLen[4 + offset];
    var value16 = byteLen[4 + offset + 1];
    var index = (value4 + offset) / 2;
    var item = len[index];
    DeviceStore.kbdSync.lightinfoList.push(kbd_create_key_light_info(item.row, item.col, value15, value16));
  }
  if (value4 + value5 < value * 2) {
    var value7 = value * 2 - value4 - value5;
    hs_get_light_buff(client, value4 + value5, value7 < HS_CHUNK_MAX ? value7 : HS_CHUNK_MAX);
  } else {
    client.device_info.kbd_light_info.keys = DeviceStore.kbdSync.lightinfoList.slice();
    DeviceStore.kbdSync.lightinfoList.splice(0, DeviceStore.kbdSync.lightinfoList.length);
    log_r("IQ_GET_RGB_COLOR_BUF finish");
    DeviceStore.kbdSync.index = DeviceStore.kbdSync.index | SYNC_FLAG_LIGHT;
    hs_data_sync(client);
    window.postMessage({ 'action': ACTION_UI_REFRESH_KBD_LIGHT });
  }
};

hsHandlers[CMD_SET_LIGHT_DEFINE] = function hs_parse_set_light_define(client, byteLen) {
  log_r("IQ_SET_RGB_COLOR");
  if (byteLen.length >= 5) {
    var value9 = byteLen[1];
    var value10 = byteLen[2];
    var value15 = byteLen[3];
    var value16 = byteLen[4];
    for (var offset = 0; offset < client.device_info.kbd_light_info.keys.length; offset++) {
      if (value9 == client.device_info.kbd_light_info.keys[offset].row && value10 == client.device_info.kbd_light_info.keys[offset].col) {
        client.device_info.kbd_light_info.keys[offset].hue = value15;
        client.device_info.kbd_light_info.keys[offset].sat = value16;
        break;
      }
    }
    for (var offset = 0; offset < DeviceStore.kbdSync.lightinfoList.length; offset++) {
      if (value9 == DeviceStore.kbdSync.lightinfoList[offset].row && value10 == DeviceStore.kbdSync.lightinfoList[offset].col) {
        DeviceStore.kbdSync.lightinfoList.splice(offset, 1);
        break;
      }
    }
    if (DeviceStore.kbdSync.lightinfoList.length > 0) {
      hs_set_light_define(client, DeviceStore.kbdSync.lightinfoList[0]);
    } else {
      he_custom_data_save(client, 1);
      window.postMessage({ 'action': ACTION_UI_REFRESH_KBD_LIGHT });
    }
  }
};

hsHandlers[CMD_GET_AXIS_MODE] = function hs_parse_get_axis_mode(client, byteLen) {
  log_r("IQ_GET_RT_BOOST_MODE");
  client.device_info.kbd_axis_mode = byteLen[1];
  DeviceStore.kbdSync.axisinfoList.splice(0, DeviceStore.kbdSync.axisinfoList.length);
  client.device_info.kbd_axis_infos.splice(0, client.device_info.kbd_axis_infos.length);
  hs_get_axis_info(client, 0, 0);
};

hsHandlers[CMD_SET_AXIS_MODE] = function hs_parse_set_axis_mode(client, byteLen) {
  log_r("IQ_SET_RT_BOOST_MODE");
  client.device_info.kbd_axis_mode = byteLen[1];
};

hsHandlers[CMD_GET_AXIS_INFO] = function hs_parse_get_axis_info(client, byteLen) {
  log_r("IQ_GET_MAG_DATA");
  var len = pc_kbd_manager_keys(client);
  var idx = 1;
  var obj = kbd_create_axis_info();
  obj.row = byteLen[idx++];
  obj.col = byteLen[idx++];
  obj.rt_enable = byteLen[idx++];
  obj.top_dz = byteLen[idx++] << 8 | byteLen[idx++];
  obj.apc_lv = byteLen[idx++] << 8 | byteLen[idx++];
  obj.rt_press_lv = byteLen[idx++] << 8 | byteLen[idx++];
  obj.rt_release_lv = byteLen[idx++] << 8 | byteLen[idx++];
  obj.btm_dz = byteLen[idx++] << 8 | byteLen[idx++];
  obj.switch_type = byteLen[idx++];
  DeviceStore.kbdSync.axisinfoList.push(obj);
  if (DeviceStore.kbdSync.axisinfoList.length < len.length) {
    hs_get_axis_info(client, len[DeviceStore.kbdSync.axisinfoList.length].row, len[DeviceStore.kbdSync.axisinfoList.length].col);
  } else {
    client.device_info.kbd_axis_infos = DeviceStore.kbdSync.axisinfoList.slice();
    DeviceStore.kbdSync.axisinfoList.splice(0, DeviceStore.kbdSync.axisinfoList.length);
    DeviceStore.kbdSync.index = DeviceStore.kbdSync.index | SYNC_FLAG_AXIS;
    hs_data_sync(client);
    window.postMessage({ 'action': ACTION_UI_REFRESH_KBD_AXIS });
  }
};

hsHandlers[CMD_SET_AXIS_INFO] = function hs_parse_set_axis_info(client, byteLen) {
  log_r("IQ_SET_MAG_DATA");
  if (byteLen.length >= 0xe) {
    var idx = 1;
    var obj = kbd_create_axis_info();
    obj.row = byteLen[idx++];
    obj.col = byteLen[idx++];
    obj.rt_enable = byteLen[idx++];
    obj.top_dz = byteLen[idx++] << 8 | byteLen[idx++];
    obj.apc_lv = byteLen[idx++] << 8 | byteLen[idx++];
    obj.rt_press_lv = byteLen[idx++] << 8 | byteLen[idx++];
    obj.rt_release_lv = byteLen[idx++] << 8 | byteLen[idx++];
    obj.btm_dz = byteLen[idx++] << 8 | byteLen[idx++];
    obj.switch_type = byteLen[idx++];
    for (var offset = 0; offset < client.device_info.kbd_axis_infos.length; offset++) {
      if (obj.row == client.device_info.kbd_axis_infos[offset].row && obj.col == client.device_info.kbd_axis_infos[offset].col) {
        client.device_info.kbd_axis_infos[offset] = obj;
        break;
      }
    }
    for (var offset = 0; offset < DeviceStore.kbdSync.axisinfoList.length; offset++) {
      if (obj.row == DeviceStore.kbdSync.axisinfoList[offset].row && obj.col == DeviceStore.kbdSync.axisinfoList[offset].col) {
        DeviceStore.kbdSync.axisinfoList.splice(offset, 1);
        break;
      }
    }
    if (DeviceStore.kbdSync.axisinfoList.length > 0) {
      hs_set_axis_info(client, DeviceStore.kbdSync.axisinfoList[0]);
    } else {
      he_custom_data_save(client, 0);
      window.postMessage({ 'action': ACTION_UI_REFRESH_KBD_AXIS });
    }
  }
};

hsHandlers[CMD_SOCD_GET_NUM] = function hs_parse_socd_get_num(client, byteLen) {
  log_r('IQ_GET_MAG_SOCD_NUM');
  client.device_info.kbd_socd_num = byteLen[1];
  client.device_info.kbd_socd_infos.splice(0, client.device_info.kbd_socd_infos.length);
  if (client.device_info.kbd_socd_num > 0) {
    hs_get_socd_data(client, 0);
  } else {
    hs_get_mt_num(client);
  }
};

hsHandlers[CMD_SOCD_SET_NUM] = function hs_parse_socd_set_num(client, byteLen) {
  log_r('IQ_SET_MAG_SOCD_NUM');
  client.device_info.kbd_socd_num = byteLen[1];
  client.device_info.kbd_socd_infos.splice(0, client.device_info.kbd_socd_infos.length);
  if (client.device_info.kbd_socd_num > 0) {
    for (var offset = 0; offset < DeviceStore.kbdSync.socdinfoList.length; offset++) {
      client.device_info.kbd_socd_infos.push(kbd_clone_socd_info(DeviceStore.kbdSync.socdinfoList[offset]));
    }
    DeviceStore.kbdSync.socdinfoList.splice(0, DeviceStore.kbdSync.socdinfoList.length);
  }
  window.postMessage({ 'action': 'action_ui_refresh_kbd_advance_key' });
};

hsHandlers[CMD_SOCD_GET_DATA] = function hs_parse_socd_get_data(client, byteLen) {
  log_r('IQ_GET_MAG_SOCD_DATA');
  if (byteLen.length >= 0xa) {
    var obj2 = kbd_create_socd_info();
    obj2.id = byteLen[1];
    obj2.row1 = byteLen[2];
    obj2.col1 = byteLen[3];
    obj2.row2 = byteLen[4];
    obj2.col2 = byteLen[5];
    obj2.socd_mode = byteLen[6];
    client.device_info.kbd_socd_infos.push(obj2);
    if (obj2.id < client.device_info.kbd_socd_num - 1) {
      hs_get_socd_data(client, obj2.id + 1);
    } else {
      hs_get_mt_num(client);
      window.postMessage({ 'action': 'action_ui_refresh_kbd_advance_key' });
    }
  }
};

hsHandlers[CMD_SOCD_SET_DATA] = function hs_parse_socd_set_data(client, byteLen) {
  log_r("IQ_SET_MAG_SOCD_DATA");
  if (byteLen.length >= 0xa) {
    var value17 = byteLen[1];
    if (value17 < DeviceStore.kbdSync.socdinfoList.length - 1) {
      hs_set_socd_data(client, DeviceStore.kbdSync.socdinfoList[value17 + 1]);
    } else {
      hs_set_socd_num(client, DeviceStore.kbdSync.socdinfoList.length);
    }
  }
};

hsHandlers[CMD_MT_GET_NUM] = function hs_parse_mt_get_num(client, byteLen) {
  log_r("IQ_GET_MAG_MT_NUM");
  client.device_info.kbd_mt_num = byteLen[1];
  client.device_info.kbd_mt_infos.splice(0, client.device_info.kbd_mt_infos.length);
  if (client.device_info.kbd_mt_num > 0) {
    hs_get_mt_data(client, 0);
  } else {
    hs_get_rs_num(client);
  }
};

hsHandlers[CMD_MT_SET_NUM] = function hs_parse_mt_set_num(client, byteLen) {
  log_r("IQ_SET_MAG_MT_NUM");
  client.device_info.kbd_mt_num = byteLen[1];
  client.device_info.kbd_mt_infos.splice(0, client.device_info.kbd_mt_infos.length);
  if (client.device_info.kbd_mt_num > 0) {
    for (var offset = 0; offset < DeviceStore.kbdSync.mtinfoList.length; offset++) {
      client.device_info.kbd_mt_infos.push(kbd_clone_mt_info(DeviceStore.kbdSync.mtinfoList[offset]));
    }
    DeviceStore.kbdSync.mtinfoList.splice(0, DeviceStore.kbdSync.mtinfoList.length);
  }
  window.postMessage({ 'action': 'action_ui_refresh_kbd_advance_key' });
};

hsHandlers[CMD_MT_GET_DATA] = function hs_parse_mt_get_data(client, byteLen) {
  log_r("IQ_GET_MAG_MT_DATA");
  if (byteLen.length >= 0xa) {
    var obj3 = kbd_create_mt_info();
    obj3.id = byteLen[1];
    obj3.row = byteLen[2];
    obj3.col = byteLen[3];
    obj3.tap_time = byteLen[5] | byteLen[4] << 8;
    obj3.keyCode1 = byteLen[7] | byteLen[6] << 8;
    obj3.keyCode2 = byteLen[9] | byteLen[8] << 8;
    client.device_info.kbd_mt_infos.push(obj3);
    if (obj3.id < client.device_info.kbd_mt_num - 1) {
      hs_get_mt_data(client, obj3.id + 1);
    } else {
      hs_get_rs_num(client);
      window.postMessage({ 'action': 'action_ui_refresh_kbd_advance_key' });
    }
  }
};

hsHandlers[CMD_MT_SET_DATA] = function hs_parse_mt_set_data(client, byteLen) {
  log_r("IQ_SET_MAG_MT_DATA");
  if (byteLen.length >= 0xa) {
    var value17 = byteLen[1];
    if (value17 < DeviceStore.kbdSync.mtinfoList.length - 1) {
      hs_set_mt_data(client, DeviceStore.kbdSync.mtinfoList[value17 + 1]);
    } else {
      hs_set_mt_num(client, DeviceStore.kbdSync.mtinfoList.length);
    }
  }
};

hsHandlers[CMD_RS_GET_NUM] = function hs_parse_rs_get_num(client, byteLen) {
  log_r("IQ_GET_MAG_RS_NUM");
  client.device_info.kbd_rs_num = byteLen[1];
  client.device_info.kbd_rs_infos.splice(0, client.device_info.kbd_rs_infos.length);
  if (client.device_info.kbd_rs_num > 0) {
    hs_get_rs_data(client, 0);
  } else {
    hs_get_dks_num(client);
  }
};

hsHandlers[CMD_RS_SET_NUM] = function hs_parse_rs_set_num(client, byteLen) {
  log_r("IQ_SET_MAG_RS_NUM");
  client.device_info.kbd_rs_num = byteLen[1];
  client.device_info.kbd_rs_infos.splice(0, client.device_info.kbd_rs_infos.length);
  if (client.device_info.kbd_rs_num > 0) {
    for (var offset = 0; offset < DeviceStore.kbdSync.rsinfoList.length; offset++) {
      client.device_info.kbd_rs_infos.push(kbd_clone_socd_info(DeviceStore.kbdSync.rsinfoList[offset]));
    }
    DeviceStore.kbdSync.rsinfoList.splice(0, DeviceStore.kbdSync.rsinfoList.length);
  }
  window.postMessage({ 'action': 'action_ui_refresh_kbd_advance_key' });
};

hsHandlers[CMD_RS_GET_DATA] = function hs_parse_rs_get_data(client, byteLen) {
  log_r("IQ_GET_MAG_RS_DATA");
  if (byteLen.length >= 0xa) {
    var obj4 = kbd_create_rs_info();
    obj4.id = byteLen[1];
    obj4.row1 = byteLen[2];
    obj4.col1 = byteLen[3];
    obj4.row2 = byteLen[4];
    obj4.col2 = byteLen[5];
    client.device_info.kbd_rs_infos.push(obj4);
    if (obj4.id < client.device_info.kbd_rs_num - 1) {
      hs_get_rs_data(client, obj4.id + 1);
    } else {
      hs_get_dks_num(client);
      window.postMessage({ 'action': 'action_ui_refresh_kbd_advance_key' });
    }
  }
};

hsHandlers[CMD_RS_SET_DATA] = function hs_parse_rs_set_data(client, byteLen) {
  log_r("IQ_SET_MAG_RS_DATA");
  if (byteLen.length >= 0xa) {
    var value17 = byteLen[1];
    if (value17 < DeviceStore.kbdSync.rsinfoList.length - 1) {
      hs_set_rs_data(client, DeviceStore.kbdSync.rsinfoList[value17 + 1]);
    } else {
      hs_set_rs_num(client, DeviceStore.kbdSync.rsinfoList.length);
    }
  }
};

hsHandlers[CMD_DKS_GET_NUM] = function hs_parse_dks_get_num(client, byteLen) {
  log_r('IQ_GET_MAG_DKS_NUM');
  client.device_info.kbd_dks_num = byteLen[1];
  client.device_info.kbd_dks_infos.splice(0, client.device_info.kbd_dks_infos.length);
  if (client.device_info.kbd_dks_num > 0) {
    hs_get_dks_data(client, 0);
  } else {
    DeviceStore.kbdSync.index = DeviceStore.kbdSync.index | SYNC_FLAG_ADVANCED;
    hs_data_sync(client);
    window.postMessage({ 'action': 'action_ui_refresh_kbd_advance_key' });
  }
};

hsHandlers[CMD_DKS_SET_NUM] = function hs_parse_dks_set_num(client, byteLen) {
  log_r("IQ_SET_MAG_DKS_NUM");
  client.device_info.kbd_dks_num = byteLen[1];
  client.device_info.kbd_dks_infos.splice(0, client.device_info.kbd_dks_infos.length);
  if (client.device_info.kbd_dks_num > 0) {
    for (var offset = 0; offset < DeviceStore.kbdSync.dksinfoList.length; offset++) {
      client.device_info.kbd_dks_infos.push(kbd_clone_dks_info(DeviceStore.kbdSync.dksinfoList[offset]));
    }
    DeviceStore.kbdSync.dksinfoList.splice(0, DeviceStore.kbdSync.dksinfoList.length);
  }
  window.postMessage({ 'action': 'action_ui_refresh_kbd_advance_key' });
};

hsHandlers[CMD_DKS_GET_DATA] = function hs_parse_dks_get_data(client, byteLen) {
  log_r('IQ_GET_MAG_DKS_DATA');
  if (byteLen.length >= 0x14) {
    var obj5 = kbd_create_dks_info();
    obj5.id = byteLen[1];
    obj5.row = byteLen[2];
    obj5.col = byteLen[3];
    obj5.keyCode1 = byteLen[5] | byteLen[4] << 8;
    obj5.state1 = byteLen[7] | byteLen[6] << 8;
    obj5.keyCode2 = byteLen[9] | byteLen[8] << 8;
    obj5.state2 = byteLen[11] | byteLen[10] << 8;
    obj5.keyCode3 = byteLen[13] | byteLen[12] << 8;
    obj5.state3 = byteLen[15] | byteLen[14] << 8;
    obj5.keyCode4 = byteLen[17] | byteLen[16] << 8;
    obj5.state4 = byteLen[19] | byteLen[18] << 8;
    client.device_info.kbd_dks_infos.push(obj5);
    if (obj5.id < client.device_info.kbd_dks_num - 1) {
      hs_get_dks_data(client, obj5.id + 1);
    } else {
      DeviceStore.kbdSync.index = DeviceStore.kbdSync.index | SYNC_FLAG_ADVANCED;
      hs_data_sync(client);
      window.postMessage({ 'action': 'action_ui_refresh_kbd_advance_key' });
    }
  }
};

hsHandlers[CMD_DKS_SET_DATA] = function hs_parse_dks_set_data(client, byteLen) {
  log_r("IQ_SET_MAG_DKS_DATA");
  if (byteLen.length >= 0x14) {
    var value17 = byteLen[1];
    if (value17 < DeviceStore.kbdSync.dksinfoList.length - 1) {
      hs_set_dks_data(client, DeviceStore.kbdSync.dksinfoList[value17 + 1]);
    } else {
      hs_set_dks_num(client, DeviceStore.kbdSync.dksinfoList.length);
    }
  }
};


// ===== protocol/hid-parser.js ====================================================
// ===== HID PROTOCOL HANDLER REGISTRY =========================================
// Each handler receives (client, byteLen, value2) where:
//   byteLen = client.recv_buf
//   value2 = total frame length (header + payload)
// Handlers parse the response and update state / dispatch UI actions.

var hidHandlers = {};

hidHandlers[RESP_DEVICE_INFO_JSON] = function hid_parse_device_info_json(client, byteLen, value2) {
  var idx;
  if (byteLen[4 + value2 - 1] == 0) {
    idx = String.fromCharCode.apply(null, byteLen.subarray(6, 4 + value2 - 1));
  } else {
    idx = String.fromCharCode.apply(null, byteLen.subarray(6, 4 + value2));
  }
  client.device_info = reset_device_info(client.device_info);
  client.device_info = parse_device_info(client.device_info, idx);
  if (client.device_info.deviceName != undefined) {
    client.connected = true;
    client.helloed = client.device_info.deviceName.length > 0;
    client.device_name = client.device_info.deviceName;
  } else {
    client.recv_buf = new Uint8Array(0);
    client.syncing = true;
    log_r(">>>>>>>>sync start");
  }
  if (client.virtual && client.helloed) {
    client.esb_last_alive_time = new Date().getTime();
    client.esb_alive_timeout = ESB_ALIVE_TIMEOUT_MS;
  }
  if (!client.virtual && is_receiver(client) && client.helloed) {
    var flag = false;
    usb_client_list.forEach(item => {
      if (item.virtual && item.device == client.device) {
        flag = true;
      }
    });
    if (!flag) {
      log_r("add new virtual client");
      var client2 = create_usb_client(client.device, 0, true);
      usb_client_list[usb_client_list.length] = client2;
      if (client.helloed) {
        send_event_query(client2);
      }
    }
    if (!is_limit_memory(client)) {
      send_event_action(client, CMD_VIRTUAL_CHILD_POLL, 0);
    }
  }
  if (client.device_info.revision != undefined) {
    query_firmware(client, client.device_info != undefined && client.device_info.revision != undefined && client.device_info.revision.substr(0, 2) == 'G-' ? 1 : 0);
  }
  window.postMessage({ 'action': ACTION_REFRESH_CLIENT_LIST });
};

hidHandlers[RESP_PARAMETER] = function hid_parse_parameter(client, byteLen, value2) {
  var value4 = byteLen[6];
  var payload = [];
  for (var offset = 3; offset < value2; offset++) {
    payload.push(byteLen[4 + offset]);
  }
  var bytes = new Uint8Array(payload);
  if (value4 == PARAM_RESOLUTION) {
    client.device_info.resolution = bytes[0] | bytes[1] << 8;
    window.postMessage({ 'action': ACTION_UI_REFRESH_SETTING });
  } else if (value4 == PARAM_RESOLUTION_32BIT) {
    client.device_info.resolution = bytes[0] | bytes[1] << 8 | bytes[2] << 16 | bytes[3] << 24;
    window.postMessage({ 'action': ACTION_UI_REFRESH_SETTING });
  } else if (value4 == PARAM_POLLING_RATE) {
    var pollingRateVal = bytes[0] | bytes[1] << 8;
    if (client.device_info.pollingRate < 0) {
      client.device_info.pollingRate = pollingRateVal;
      window.postMessage({ 'action': ACTION_UI_REFRESH_SETTING });
    }
  } else if (value4 == PARAM_POWER_MODE) {
    client.device_info.powerMode = bytes[0];
    window.postMessage({ 'action': ACTION_UI_REFRESH_SETTING });
  } else if (value4 == PARAM_KEY_DELAY) {
    client.device_info.keyDelay = [];
    for (var offset = 0; offset < bytes.byteLength; offset++) {
      client.device_info.keyDelay.push(bytes[offset]);
    }
    window.postMessage({ 'action': ACTION_UI_REFRESH_SETTING });
  } else if (value4 == PARAM_LOD) {
    client.device_info.lod = bytes[0];
    window.postMessage({ 'action': ACTION_UI_REFRESH_SETTING });
  } else if (value4 == PARAM_ESB_DEVICE_INFO) {
    var idx;
    if (byteLen[4 + value2 - 1] == 0) {
      idx = String.fromCharCode.apply(null, byteLen.subarray(7, 4 + value2 - 1));
    } else {
      idx = String.fromCharCode.apply(null, byteLen.subarray(7, 4 + value2));
    }
    client.device_info = reset_device_info_esb(client.device_info);
    client.device_info = parse_device_info(client.device_info, idx);
    window.postMessage({ 'action': ACTION_UI_REFRESH_CLIENT_LIST });
    window.postMessage({ 'action': ACTION_UI_REFRESH_CURRENT_CLIENT });
  } else if (value4 == PARAM_MOTION_SYNC) {
    client.device_info.motionSync = bytes[0];
    window.postMessage({ 'action': ACTION_UI_REFRESH_SETTING });
  } else if (value4 == PARAM_ANGLE_TUNING) {
    client.device_info.angleTuning = bytes[0] << 24 >> 24;
    window.postMessage({ 'action': ACTION_UI_REFRESH_SETTING });
  } else if (value4 == PARAM_ANGLE_SNAPPING) {
    client.device_info.angleSnapping = bytes[0];
    window.postMessage({ 'action': ACTION_UI_REFRESH_SETTING });
  } else if (value4 == PARAM_RIPPLE_CONTROL) {
    client.device_info.rippleControl = bytes[0];
    window.postMessage({ 'action': ACTION_UI_REFRESH_SETTING });
  } else if (value4 == PARAM_KEY_DELAY_NOOP) {
  } else if (value4 == PARAM_2_4G_SCORES) {
    var scoreVal = bytes[0] | bytes[1] << 8;
    var value5 = bytes[2] | bytes[3] << 8;
    var value6 = bytes[4] | bytes[5] << 8;
    log_r("2.4G scores: " + scoreVal + ", " + value5 + ", " + value6);
    if (scoreVal > value5 && scoreVal > value6) {
      if ((client.device_info.txOutputPower == 0 ? 0 : 1) == 1) {
        setTimeout(() => {
          log_r("set rf channel 2");
          send_event_set_rf_channel(client, 2);
          window.postMessage({ 'action': ACTION_UI_REFRESH_SETTING });
        }, CHANNEL_SET_DELAY_MS);
      }
    } else if (value5 > scoreVal && value5 > value6) {
      if ((client.device_info.txOutputPower == 0 ? 0 : 1) == 1) {
        setTimeout(() => {
          log_r("set rf channel 40");
          send_event_set_rf_channel(client, 0x28);
          window.postMessage({ 'action': ACTION_UI_REFRESH_SETTING });
        }, CHANNEL_SET_DELAY_MS);
      }
    } else if ((client.device_info.txOutputPower == 0 ? 0 : 1) == 1) {
      setTimeout(() => {
        log_r("set rf channel 80");
        send_event_set_rf_channel(client, 0x50);
        window.postMessage({ 'action': ACTION_UI_REFRESH_SETTING });
      }, CHANNEL_SET_DELAY_MS);
    }
  } else if (value4 == PARAM_KEY_DELAY_ENTRY) {
    if (bytes.byteLength == 1) {
      if (bytes[0] != 0xff) {
        client.onboard_index = bytes[0];
        log_r("receiver onboard " + client.onboard_index);
        add_key_info(client, client.onboard_index, undefined);
        clearTimeout(mouse_config_timer);
        mouse_config_timer = setTimeout(() => {
          mouse_config_timer = undefined;
          client.querying_more_result = false;
          window.postMessage({ 'action': 'action_onboard_cfg', 'usb_client_id': client.id, 'msg': "ERROR" });
        }, CONFIG_TIMEOUT_MS);
        window.postMessage({ 'action': 'action_onboard_cfg', 'usb_client_id': client.id, 'msg': "LOADING" });
      } else {
        window.postMessage({ 'action': ACTION_UI_REFRESH_SETTING });
        clearTimeout(mouse_config_timer);
        mouse_config_timer = undefined;
        client.querying_more_result = false;
        window.postMessage({ 'action': 'action_onboard_cfg', 'usb_client_id': client.id, 'msg': 'LOADED' });
      }
    } else {
      add_key_info(client, client.onboard_index, bytes);
      clearTimeout(mouse_config_timer);
      mouse_config_timer = setTimeout(() => {
        mouse_config_timer = undefined;
        client.querying_more_result = false;
        window.postMessage({ 'action': 'action_onboard_cfg', 'usb_client_id': client.id, 'msg': "ERROR" });
      }, CONFIG_TIMEOUT_MS);
    }
  } else if (value4 == PARAM_PEER_INFO) {
    if (bytes.byteLength == 1) {
      if (bytes[0] == 0) {
        client.device_info.peerInfo = [];
      } else {
        window.postMessage({ 'action': ACTION_UI_REFRESH_SETTING });
      }
    } else {
      var elemId = bytes[0] | bytes[1] << 8;
      var value7 = sprintf("%02x:%02x:%02x:%02x:%02x:%02x", bytes[2], bytes[3], bytes[4], bytes[5], bytes[6], bytes[7]);
      client.device_info.peerInfo.push({ 'id': elemId, 'address': value7 });
    }
  } else if (value4 == PARAM_BATTERY_LEVELS) {
    client.device_info.batteryLevels = [];
    for (var offset = 0; offset < bytes.byteLength; offset += 2) {
      client.device_info.batteryLevels.push(bytes[offset] | bytes[offset + 1] << 8);
    }
  } else if (value4 == PARAM_BATTERY_PERCENT) {
    client.device_info.battery = bytes[0];
    client.device_info.charging = bytes[1] == 1;
    window.postMessage({ 'action': ACTION_UI_REFRESH_CURRENT_CLIENT });
  } else if (value4 == PARAM_SLEEP_TIME) {
    client.device_info.sleepTime = bytes[0] | bytes[1] << 8;
    window.postMessage({ 'action': ACTION_UI_REFRESH_SETTING });
  } else if (value4 == PARAM_RSSI) {
    client.device_info.rssi = new Int8Array(payload)[0];
    window.postMessage({ 'action': ACTION_UI_REFRESH_CURRENT_CLIENT_RSSI });
  } else if (value4 == PARAM_LUA_STATUS) {
    client.device_info.luaStatus = bytes[0];
    window.postMessage({ 'action': ACTION_UI_REFRESH_SETTING });
  } else if (value4 == PARAM_PARAM_1e) {
  } else if (value4 == PARAM_PARAM_1f) {
  } else if (value4 == PARAM_NOACK) {
    client.device_info.noack = bytes[0];
    window.postMessage({ 'action': ACTION_UI_REFRESH_SETTING });
  } else if (value4 == PARAM_COLOR_CODE) {
    for (var offset = 0; offset < bytes.byteLength; offset++) {
      if (bytes[offset] == 0) {
        client.device_info.colorCode = String.fromCharCode.apply(null, bytes.subarray(0, offset));
        window.postMessage({ 'action': ACTION_UI_REFRESH_CLIENT_LIST });
        window.postMessage({ 'action': ACTION_UI_REFRESH_CURRENT_CLIENT });
        break;
      }
    }
  } else if (value4 == PARAM_GLASS_MODE) {
    client.device_info.glassMode = bytes[0];
    if (bytes.byteLength > 1) {
      client.device_info.glassModeEnabled = bytes[1];
    } else {
      client.device_info.glassModeEnabled = 1;
    }
    window.postMessage({ 'action': ACTION_UI_REFRESH_SETTING });
  } else if (value4 == PARAM_ONBOARD_INDEX) {
    if (client.device_info.onboardIndex != bytes[0]) {
      client.device_info.onboardIndex = bytes[0];
      window.postMessage({ 'action': ACTION_UI_REFRESH_SETTING });
    }
  } else if (value4 == PARAM_ONBOARD_STATUS) {
    client.device_info.onboardStatus = [];
    for (var offset = 0; offset < bytes.byteLength; offset++) {
      client.device_info.onboardStatus.push(bytes[offset]);
    }
    window.postMessage({ 'action': ACTION_UI_REFRESH_SETTING });
  }
};

hidHandlers[RESP_PING] = function hid_parse_ping(client, byteLen, value2) {
  log_r("PING <");
  if (!client.connected) {
    if (new Date().getTime() - client.last_query_time >= ESB_ALIVE_TIMEOUT_MS) {
      if (client.virtual) {
        usb_client_list.forEach(item2 => {
          if (is_receiver(item2) && item2.device == client.device) {
            if (item2.helloed) {
              send_event_query(client);
            }
          }
        });
      } else {
        send_event_query(client);
      }
    }
  } else {
    if (!is_receiver(client)) {
      if (new Date().getTime() - client.last_query_time >= ESB_ALIVE_TIMEOUT_MS) {
        var json = JSON.parse(JSON.stringify(client.device_info.allKeyConfigs))[0];
        if (json == undefined || json.length == 0) {
          send_event_query(client);
        }
      }
    }
  }
  client.esb_last_alive_time = new Date().getTime();
  client.esb_alive_timeout = ESB_ALIVE_TIMEOUT_MS;
  var payload = [];
  for (var offset = 2; offset < value2; offset++) {
    payload.push(byteLen[4 + offset]);
  }
  var flag2 = false;
  var bytes = new Uint8Array(payload);
  if (bytes.byteLength > 0) {
    if (client.device_info.squal != bytes[0]) {
      client.device_info.squal = bytes[0];
      flag2 = true;
    }
  }
  if (bytes.byteLength > 1) {
    if (client.device_info.equal != bytes[1]) {
      client.device_info.equal = bytes[1];
      flag2 = true;
    }
  }
  if (bytes.byteLength > 2) {
    if (client.device_info.txOutputPowerApplied != bytes[2]) {
      client.device_info.txOutputPowerApplied = bytes[2];
      flag2 = true;
    }
  }
  if (flag2) {
    window.postMessage({ 'action': ACTION_UI_REFRESH_QUAL });
  }
};

hidHandlers[RESP_SYNC] = function hid_parse_sync(client, byteLen, value2) {
  const encodedSync = new TextEncoder().encode(SYNC_DATA);
  send_event(client, encodedSync);
};


// ===== protocol/binary-reader.js ====================================================
class BinaryReader {
  constructor(data) {
    this.data = data;
    this.offset = 0;
  }

  uint8() {
    return this.data[this.offset++] & 0xff;
  }

  uint16() {
    var v = this.data[this.offset] & 0xff | (this.data[this.offset + 1] & 0xff) << 8;
    this.offset += 2;
    return v;
  }

  uint32() {
    var v = 0;
    for (var i = 0; i < 4; i++) {
      v |= (this.data[this.offset++] & 0xff) << (i * 8);
    }
    return v;
  }

  subarray(len) {
    var s = this.data.subarray(this.offset, this.offset + len);
    this.offset += len;
    return s;
  }

  done() {
    return this.offset >= this.data.length;
  }

  remaining() {
    return this.data.length - this.offset;
  }
}


// ===== protocol/key-config-parser.js ====================================================
function create_key_info() {
  var keyInfo = {
    cmd: 0x3,
    name: '',
    label: '',
    configType: 0x0
  };
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
  return Object.assign({}, client);
}

function parseKeyNames(reader, keyCount, keyInfo, client) {
  var html = '';
  var str = '';
  for (var i = 0; i < keyCount; i++) {
    var code = reader.uint8();
    if (code == 0x7) {
      if (html.length > 0) html += '+';
      html += KEY_WHEEL_UP;
      if (str.length > 0) str += '+';
      str += '▲';
    } else if (code == 0x8) {
      if (html.length > 0) html += '+';
      html += KEY_WHEEL_DOWN;
      if (str.length > 0) str += '+';
      str += '▼';
    } else {
      get_keys(client).forEach(function (item) {
        if (item.id.length == 1 && code == item.id[0]) {
          if (html.length > 0) html += '+';
          html += item.name;
          if (str.length > 0) str += '+';
          str += item.label;
        }
      });
    }
  }
  keyInfo.name = html;
  keyInfo.label = str;
}

function normalize_scan_code(code) {
  if (code == 0xa2) return 0x11;
  if (code == 0xa4) return 0x12;
  if (code == 0xa0) return 0x10;
  return code;
}

function parse_mouse_mapping(reader, byteLen, keyInfo, totalLen, arr) {
  var modifier = get_vk_code(reader.uint8());
  modifier = normalize_scan_code(modifier);

  var eventType = reader.uint8();
  var keyCode = reader.uint8();

  if (eventType == 0x1) {
    keyCode += 0xff;
  } else if (eventType == 0x3) {
    keyInfo.mouse_mapping_key_data = Math.abs(keyCode - 0x40);
    keyCode = keyCode > 0x40 ? 0x400 : 0x401;
  } else if (eventType == 0x5) {
    keyInfo.mouse_mapping_key_data = Math.abs(keyCode - 0x40);
    keyCode = keyCode < 0x40 ? 0x402 : 0x403;
  } else if (eventType == 0x4) {
    keyCode += 0x200;
  }

  keyCode = get_vk_code(keyCode);

  var secondaryModifier = 0;
  if (reader.offset < totalLen) {
    secondaryModifier = get_vk_code(reader.uint8());
    secondaryModifier = normalize_scan_code(secondaryModifier);
  }

  keyInfo.configType = 0x0;
  keyInfo.touch_style = 0x1b;
  var payload = [modifier, secondaryModifier, keyCode];
  keyInfo.mouse_mapping_keys = JSON.stringify(payload);
  arr.push(keyInfo);
}

function parse_mapping_function(reader, byteLen, keyInfo, totalLen, arr, client) {
  var i8 = reader.uint8();
  keyInfo.mouse_mapping_function = reader.uint8();
  keyInfo.mouse_mapping_function_data = reader.uint8();

  if (reader.offset < totalLen) {
    var highByte = reader.uint8();
    keyInfo.mouse_mapping_function_data = keyInfo.mouse_mapping_function_data & 0xff | highByte << 8 & 0xff00;
  }

  if (reader.offset < totalLen) {
    reader.uint8();
  }

  if (keyInfo.mouse_mapping_function == 0x9) {
    if (i8 == 0x2) {
      keyInfo.mouse_mapping_function_data *= get_cpi_step(client);
      keyInfo.configType = 0x0;
      keyInfo.touch_style = 0x1d;
      arr.push(keyInfo);
    }
  } else if (keyInfo.mouse_mapping_function == 0x10) {
    var strLen = reader.uint16();
    keyInfo.mouse_mapping_function_text = String.fromCharCode.apply(null, byteLen.subarray(reader.offset, reader.offset + strLen));
    keyInfo.configType = 0x0;
    keyInfo.touch_style = 0x1d;
    arr.push(keyInfo);
  } else {
    keyInfo.configType = 0x0;
    keyInfo.touch_style = 0x1d;
    arr.push(keyInfo);
  }
}

function parse_macro_mouse_event(reader, keyInfo, macroInfo) {
  var i6 = reader.uint8();

  if ((i6 & 0x80) != 0) {
    macroInfo.mouse_key_loop = reader.uint16();
  } else {
    macroInfo.mouse_key_loop = 0x1;
  }

  i6 &= 0x7f;

  if (i6 == 0x0 || i6 == 0x1 || i6 == 0x4) {
    var keyCode = reader.uint8();
    if (i6 == 0x1) keyCode += 0xff;
    else if (i6 == 0x4) keyCode += 0x200;
    macroInfo.mouse_key_code = get_vk_code(keyCode);

    var eventByte = reader.uint8();
    macroInfo.mouse_key_event = MOUSE_EVENT_KEY_UP;
    if (eventByte == 0x0) macroInfo.mouse_key_event = MOUSE_EVENT_KEY_DOWN;
    else if (eventByte == 0x2) macroInfo.mouse_key_event = MOUSE_EVENT_KEY_UP;
  } else if (i6 == 0x2) {
    var b1 = reader.uint8();
    var b2 = reader.uint8();
    var b3 = reader.uint8();
    var coordX = b1 & 0xff | b2 << 8 & 0xf00;
    var coordY = b3 & 0xff | b2 << 4 & 0xf00;
    macroInfo.mouse_key_code = coordX << 16 | coordY;
    macroInfo.mouse_key_event = MOUSE_EVENT_MOVE;
  } else if (i6 == 0x6) {
    var absX = reader.uint16();
    var absY = reader.uint16();
    macroInfo.mouse_key_code = absX << 16 | absY;
    macroInfo.mouse_key_event = MOUSE_EVENT_POSITION;
  } else if (i6 == 0x3) {
    macroInfo.mouse_key_code = reader.uint8() - 0x40;
    macroInfo.mouse_key_event = MOUSE_EVENT_WHEEL_VERT;
  } else if (i6 == 0x5) {
    macroInfo.mouse_key_code = reader.uint8() - 0x40;
    macroInfo.mouse_key_event = MOUSE_EVENT_WHEEL_HORZ;
  }

  macroInfo.mouse_key_time = reader.uint16();
  keyInfo.macroKeys.push(macroInfo);
}

function parse_macro_entry(reader, byteLen, keyInfo, idx, totalLen, arr) {
  var styleByte = reader.uint8();
  keyInfo.macro_style = 0x0;
  if (styleByte == 0x1) keyInfo.macro_style = 0x1;
  else if (styleByte == 0x2) keyInfo.macro_style = 0x2;
  else if (styleByte == 0x3) keyInfo.macro_style = 0x3;
  else if (styleByte == 0x4) keyInfo.macro_style = 0x4;
  else if (styleByte == 0x5) keyInfo.macro_style = 0x5;
  else if (styleByte == 0x6) keyInfo.macro_style = 0x6;

  keyInfo.macro_endKey = reader.uint8();
  var macroCount = reader.uint8();

  for (var i = 0; i < macroCount; i++) {
    var macroInfo = create_macro_info();
    reader.uint16();
    reader.uint16();
    macroInfo.interval_time = reader.uint16();
    macroInfo.continue_time = reader.uint16();
    macroInfo.style = reader.uint8() & 0x7f;

    if (macroInfo.style == 0x16) {
      parse_macro_mouse_event(reader, keyInfo, macroInfo);
    }
  }

  reader.uint8();
  var contByte = reader.uint8();
  keyInfo.macro_toggleKey = reader.uint8();
  keyInfo.configType = CONFIG_TYPE_MACRO;

  if ((contByte & 8) != 0 && keyInfo.macroKeys.length >= 0x2) {
    var keyInfo2 = create_key_info();
    keyInfo2.name = keyInfo.name;
    keyInfo2.label = keyInfo.label;
    keyInfo2.configType = 0x0;
    keyInfo2.touch_style = 0x1b;
    var payload = [0x0, 0x0, keyInfo.macroKeys[0].mouse_key_code];
    keyInfo2.mouse_mapping_keys = JSON.stringify(payload);
    keyInfo2.mouse_auto_click = 0x1;
    keyInfo2.mouse_auto_click_down = keyInfo.macroKeys[0].mouse_key_time;
    keyInfo2.mouse_auto_click_up = keyInfo.macroKeys[1].mouse_key_time;
    keyInfo2.mouse_auto_click_rand = keyInfo.macroKeys[0].interval_time;
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

function add_key_info(client, value, byteLen) {
  if (value >= client.device_info.allKeyConfigs.length) return;

  var arr = client.device_info.allKeyConfigs[value];
  if (byteLen == undefined) {
    arr.splice(0, arr.length);
    return;
  }

  var reader = new BinaryReader(new Uint8Array(byteLen));
  var header = reader.uint8() & 0xf;
  if (header !== 0x3) return;

  var totalLen = (byteLen[0] << 4 & 0xf00) | reader.uint8();
  if (byteLen.byteLength < totalLen) return;

  var keyInfo = create_key_info();
  var idx = reader.uint8();
  if (idx !== 0x16 && idx !== 0x18 && idx !== 0x5 && idx !== 0x2b) return;

  var keyCount = reader.uint8();
  if (keyCount > 0x2) return;

  parseKeyNames(reader, keyCount, keyInfo, client);

  switch (idx) {
    case 0x16:
      parse_mouse_mapping(reader, byteLen, keyInfo, totalLen, arr);
      break;
    case 0x18:
      parse_mapping_function(reader, byteLen, keyInfo, totalLen, arr, client);
      break;
    case 0x5:
    case 0x2b:
      parse_macro_entry(reader, byteLen, keyInfo, idx, totalLen, arr);
      break;
  }
}


// ===== 05-hs-protocol.js ====================================================
// ===== HS PROTOCOL COMMAND BUILDERS ==========================================
// Thin wrappers that build HS frames and delegate to hid-transport for sending.
// The response parsing has been extracted to hs-parser.js (handler registry).

// ===== COMMAND BUILDERS ======================================================
function hs_get_firmware_version(client) {
  send_event(client, hs_format_data(client, PacketBuilder.begin(CMD_FIRMWARE_VERSION).build()));
}

function hs_set_factory_reset(client) {
  send_event(client, hs_format_data(client, PacketBuilder.begin(CMD_HS_FACTORY_RESET).build()));
}

function hs_set_keycode_factory_reset(client) {
  send_event(client, hs_format_data(client, PacketBuilder.begin(CMD_KEYCODE_FACTORY_RESET).build()));
}

function hs_get_onboard_index(client) {
  send_event(client, hs_format_data(client, PacketBuilder.begin(CMD_GET_ONBOARD_INDEX).build()));
}

function hs_set_onboard_index(client, index) {
  send_event(client, hs_format_data(client, PacketBuilder.begin(CMD_SET_ONBOARD_INDEX).uint8(index).build()));
}

function hs_get_keycode_buff(client, offset, count) {
  if (count > HS_CHUNK_MAX) return;
  send_event(client, hs_format_data(client, PacketBuilder.begin(CMD_GET_KEYCODE_BUF).uint16(offset).uint8(count).build()));
}

function hs_set_keycode(client, value, type, index, value2) {
  send_event(client, hs_format_data(client, PacketBuilder.begin(CMD_SET_KEYCODE).uint8(value).uint8(type).uint8(index).uint16(value2).build()));
}

function he_custom_data_save(client, data) {
  log_r('he_custom_data_save:' + data);
  send_event(client, hs_format_data(client, PacketBuilder.begin(CMD_CUSTOM_DATA_SAVE).uint8(data).build()));
}

function hs_get_light(client, mode) {
  log_r("hs_get_light:" + mode);
  send_event(client, hs_format_data(client, PacketBuilder.begin(CMD_GET_LIGHT).uint8(0x3).uint8(mode).build()));
}

function hs_set_light(client, value, data) {
  var builder = PacketBuilder.begin(CMD_SET_LIGHT).uint8(0x3).uint8(value);
  if (value == LIGHT_PARAM_BRIGHTNESS) {
    builder.uint8(data.brightness);
  } else if (value == LIGHT_PARAM_MODE) {
    builder.uint8(data.mode);
  } else if (value == LIGHT_PARAM_SPEED) {
    builder.uint8(data.speed);
  } else if (value == LIGHT_PARAM_HUE_SAT) {
    builder.uint8(data.hue).uint8(data.sat);
  } else if (value == LIGHT_PARAM_BOX_MODE) {
    builder.uint8(data.light_box_mode);
  }
  send_event(client, hs_format_data(client, builder.build()));
}

function hs_get_light_sleep_time(client) {
  send_event(client, hs_format_data(client, PacketBuilder.begin(CMD_GET_LIGHT_SLEEP).build()));
}

function hs_set_light_sleep_time(client, value) {
  send_event(client, hs_format_data(client, PacketBuilder.begin(CMD_SET_LIGHT_SLEEP).uint8(value > 0 ? 1 : 0).uint16(value).build()));
}

function hs_get_light_buff(client, value, index) {
  if (index > HS_CHUNK_MAX) return;
  send_event(client, hs_format_data(client, PacketBuilder.begin(CMD_GET_LIGHT_DEFINE_BUF).uint16(value).uint8(index).build()));
}

function hs_set_light_define(client, value) {
  send_event(client, hs_format_data(client, PacketBuilder.begin(CMD_SET_LIGHT_DEFINE).uint8(value.row).uint8(value.col).uint8(value.hue).uint8(value.sat).build()));
}

function hs_set_light_define_infos(client, value) {
  if (value.length > 0) {
    DeviceStore.kbdSync.lightinfoList.splice(0, DeviceStore.kbdSync.lightinfoList.length);
    DeviceStore.kbdSync.lightinfoList = value.slice();
    hs_set_light_define(client, DeviceStore.kbdSync.lightinfoList[0]);
  }
}

function hs_get_light_box(client) {
  send_event(client, hs_format_data(client, PacketBuilder.begin(CMD_GET_LIGHT_BOX).build()));
}

function hs_set_light_box(client, value) {
  send_event(client, hs_format_data(client, PacketBuilder.begin(CMD_SET_LIGHT_BOX).uint8(0x1).uint8(value.mode).uint8(value.colored).uint8(value.brightness).uint8(value.speed).uint8(value.r).uint8(value.g).uint8(value.b).build()));
}

function hs_get_axis_mode(client) {
  send_event(client, hs_format_data(client, PacketBuilder.begin(CMD_GET_AXIS_MODE).build()));
}

function hs_set_axis_mode(client, value) {
  send_event(client, hs_format_data(client, PacketBuilder.begin(CMD_SET_AXIS_MODE).uint8(value).build()));
}

function hs_get_axis_info(client, index, count) {
  send_event(client, hs_format_data(client, PacketBuilder.begin(CMD_GET_AXIS_INFO).uint8(index).uint8(count).build()));
}

function hs_set_axis_info(client, value) {
  send_event(client, hs_format_data(client, PacketBuilder.begin(CMD_SET_AXIS_INFO).uint8(value.row).uint8(value.col).uint8(value.rt_enable).uint16(value.top_dz).uint16(value.apc_lv).uint16(value.rt_press_lv).uint16(value.rt_release_lv).uint16(value.btm_dz).uint8(value.switch_type).build()));
}

function hs_set_axis_infos(client, value) {
  if (value.length > 0) {
    DeviceStore.kbdSync.axisinfoList.splice(0, DeviceStore.kbdSync.axisinfoList.length);
    DeviceStore.kbdSync.axisinfoList = value.slice();
    hs_set_axis_info(client, DeviceStore.kbdSync.axisinfoList[0]);
  }
}

function hs_get_socd_num(client) {
  send_event(client, hs_format_data(client, PacketBuilder.begin(CMD_SOCD_GET_NUM).build()));
}

function hs_set_socd_num(client, value) {
  send_event(client, hs_format_data(client, PacketBuilder.begin(CMD_SOCD_SET_NUM).uint8(value).build()));
}

function hs_get_socd_data(client, index) {
  send_event(client, hs_format_data(client, PacketBuilder.begin(CMD_SOCD_GET_DATA).uint8(index).build()));
}

function hs_set_socd_infos(client, value) {
  if (value.length > 0) {
    DeviceStore.kbdSync.socdinfoList.splice(0, DeviceStore.kbdSync.socdinfoList.length);
    DeviceStore.kbdSync.socdinfoList = value.slice();
    hs_set_socd_data(client, DeviceStore.kbdSync.socdinfoList[0]);
  }
}

function hs_set_socd_data(client, value) {
  send_event(client, hs_format_data(client, PacketBuilder.begin(CMD_SOCD_SET_DATA).uint8(value.id).uint8(value.row1).uint8(value.col1).uint8(value.row2).uint8(value.col2).uint8(value.socd_mode).build()));
}

function hs_get_mt_num(client) {
  send_event(client, hs_format_data(client, PacketBuilder.begin(CMD_MT_GET_NUM).build()));
}

function hs_set_mt_num(client, value) {
  send_event(client, hs_format_data(client, PacketBuilder.begin(CMD_MT_SET_NUM).uint8(value).build()));
}

function hs_get_mt_data(client, index) {
  send_event(client, hs_format_data(client, PacketBuilder.begin(CMD_MT_GET_DATA).uint8(index).build()));
}

function hs_set_mt_infos(client, value) {
  if (value.length > 0) {
    DeviceStore.kbdSync.mtinfoList.splice(0, DeviceStore.kbdSync.mtinfoList.length);
    DeviceStore.kbdSync.mtinfoList = value.slice();
    hs_set_mt_data(client, DeviceStore.kbdSync.mtinfoList[0]);
  }
}

function hs_set_mt_data(client, value) {
  send_event(client, hs_format_data(client, PacketBuilder.begin(CMD_MT_SET_DATA).uint8(value.id).uint8(value.row).uint8(value.col).uint16(value.tap_time).uint16(value.keyCode1).uint16(value.keyCode2).build()));
}

function hs_get_rs_num(client) {
  send_event(client, hs_format_data(client, PacketBuilder.begin(CMD_RS_GET_NUM).build()));
}

function hs_set_rs_num(client, value) {
  send_event(client, hs_format_data(client, PacketBuilder.begin(CMD_RS_SET_NUM).uint8(value).build()));
}

function hs_get_rs_data(client, index) {
  send_event(client, hs_format_data(client, PacketBuilder.begin(CMD_RS_GET_DATA).uint8(index).build()));
}

function hs_set_rs_infos(client, value) {
  if (value.length > 0) {
    DeviceStore.kbdSync.rsinfoList.splice(0, DeviceStore.kbdSync.rsinfoList.length);
    DeviceStore.kbdSync.rsinfoList = value.slice();
    hs_set_rs_data(client, DeviceStore.kbdSync.rsinfoList[0]);
  }
}

function hs_set_rs_data(client, value) {
  send_event(client, hs_format_data(client, PacketBuilder.begin(CMD_RS_SET_DATA).uint8(value.id).uint8(value.row1).uint8(value.col1).uint8(value.row2).uint8(value.col2).build()));
}

function hs_get_dks_num(client) {
  send_event(client, hs_format_data(client, PacketBuilder.begin(CMD_DKS_GET_NUM).build()));
}

function hs_set_dks_num(client, value) {
  send_event(client, hs_format_data(client, PacketBuilder.begin(CMD_DKS_SET_NUM).uint8(value).build()));
}

function hs_get_dks_data(client, index) {
  send_event(client, hs_format_data(client, PacketBuilder.begin(CMD_DKS_GET_DATA).uint8(index).build()));
}

function hs_set_dks_infos(client, value) {
  if (value.length > 0) {
    DeviceStore.kbdSync.dksinfoList.splice(0, DeviceStore.kbdSync.dksinfoList.length);
    DeviceStore.kbdSync.dksinfoList = value.slice();
    hs_set_dks_data(client, DeviceStore.kbdSync.dksinfoList[0]);
  }
}

function hs_set_dks_data(client, value) {
  send_event(client, hs_format_data(client, PacketBuilder.begin(CMD_DKS_SET_DATA).uint8(value.id).uint8(value.row).uint8(value.col).uint16(value.keyCode1).uint16(value.state1).uint16(value.keyCode2).uint16(value.state2).uint16(value.keyCode3).uint16(value.state3).uint16(value.keyCode4).uint16(value.state4).build()));
}

function reset_macro_buf(client) {
  send_event(client, hs_format_data(client, PacketBuilder.begin(CMD_MACRO_RESET).build()));
}

function hs_get_macro_num(client) {
  send_event(client, hs_format_data(client, PacketBuilder.begin(CMD_MACRO_NUM).build()));
}

function hs_get_macro_buffer_size(client) {
  send_event(client, hs_format_data(client, PacketBuilder.begin(CMD_MACRO_SIZE).build()));
}

function hs_set_macro_buf(client, value) {
  DeviceStore.kbdSync.macroinfoList.splice(0, DeviceStore.kbdSync.macroinfoList.length);
  DeviceStore.kbdSync.macroinfoList = value.slice();
  reset_macro_buf(client);
}

function hs_set_macro_data(client, value) {
  var builder = PacketBuilder.begin(CMD_MACRO_SET).uint16(value);
  var offset = 0;
  if (value + HS_CHUNK_MAX < DeviceStore.kbdSync.macroBuff.length) {
    offset = HS_CHUNK_MAX;
  } else {
    offset = DeviceStore.kbdSync.macroBuff.length - value;
  }
  builder.uint8(offset);
  for (var len = 0; len < offset; len++) {
    builder.uint8(DeviceStore.kbdSync.macroBuff[value + len]);
  }
  send_event(client, hs_format_data(client, builder.build()));
}

function hs_get_macro_buf(client, value, index) {
  send_event(client, hs_format_data(client, PacketBuilder.begin(CMD_MACRO_GET).uint16(value).uint8(index).build()));
}

// ===== SYNC STATE MANAGEMENT =================================================
function hs_set_data_sync_index(client) {
  DeviceStore.kbdSync.index = client;
}

function hs_data_sync(client) {
  if ((DeviceStore.kbdSync.index & SYNC_FLAG_KEYCODE) != 1) {
    DeviceStore.kbdSync.keyinfoList.splice(0, DeviceStore.kbdSync.keyinfoList.length);
    client.device_info.kbd_key_infos.splice(0, client.device_info.kbd_key_infos.length);
    hs_get_keycode_buff(client, 0, HS_CHUNK_MAX);
  } else if ((DeviceStore.kbdSync.index & SYNC_FLAG_LIGHT) != 2) {
    DeviceStore.kbdSync.lightinfoList.splice(0, DeviceStore.kbdSync.lightinfoList.length);
    client.device_info.kbd_light_info = kbd_create_light_info();
    hs_get_light(client, LIGHT_PARAM_BRIGHTNESS);
  } else if ((DeviceStore.kbdSync.index & SYNC_FLAG_AXIS) != 4) {
    DeviceStore.kbdSync.axisinfoList.splice(0, DeviceStore.kbdSync.axisinfoList.length);
    client.device_info.kbd_axis_infos.splice(0, client.device_info.kbd_axis_infos.length);
    hs_get_axis_info(client, 0, 0);
  } else if ((DeviceStore.kbdSync.index & SYNC_FLAG_ADVANCED) != 8) {
    hs_get_socd_num(client);
  }
}

// ===== HS PARSE COMMAND (THIN DISPATCH) ======================================
function hs_parse_cmd(client) {
  var i;
  var value = pc_kbd_key_num(client);
  var len = pc_kbd_manager_keys(client);
  do {
    i = false;
    var byteLen = client.recv_buf;
    var value2 = byteLen.byteLength;
    if (value2 >= HS_FRAME_SIZE) {
      var firstByte = byteLen[0];
      var handler = hsHandlers[firstByte];
      if (handler) {
        handler(client, byteLen);
      }
      if (!client.syncing) {
        client.recv_buf = skip_recv_buf(client.recv_buf, HS_FRAME_SIZE);
        i = true;
      }
    }
  } while (i);
}


// ===== 06-hid-protocol.js ====================================================
// ===== HID PROTOCOL — HIGH-LEVEL COMMAND FUNCTIONS ===========================
// Thin wrappers that build HID command payloads and delegate to hid-transport
// for CRC wrapping and low-level send. The response parsing has been extracted
// to hid-parser.js (handler registry).

// ===== CORE HID PROTOCOL SEND FUNCTIONS ======================================
function send_event_query(client) {
  if (is_hs_keyboard(client.device)) {
    hs_get_firmware_version(client);
    return;
  }
  var timestamp = parseInt(new Date().getTime() / 0x3e8);
  var payload = PacketBuilder.begin(HID_QUERY).uint8(0).uint8(HID_PARAM_CMD).uint8(0).uint8(0);
  for (var i = 0; i < 8; i++) {
    payload.uint8(timestamp & 0xff);
    timestamp = Math.floor(timestamp / 0x100);
  }
  send_event(client, crc_process(client, payload.build()));
  client.last_query_time = new Date().getTime();
  if (!is_receiver(client)) {
    client.querying_more_result = true;
  }
}

function send_event_action(client, action, value) {
  var payload = PacketBuilder.begin(HID_ACTION_CMD).uint8(0).uint8(action).uint32(value);
  send_event(client, crc_process(client, payload.build()));
  if (action == CMD_QUERY_MORE_RESULT && value == 0 && !is_receiver(client)) {
    client.querying_more_result = true;
    client.last_query_time = new Date().getTime();
  }
}

function send_event_ping(client, pingIndex, isPingAll) {
  if (isPingAll === undefined) isPingAll = true;
  if (client != undefined ? is_hs_keyboard(client.device) : false) {
    return;
  }
  var payload = PacketBuilder.begin(HID_PING_CMD).uint8(0).uint8(pingIndex ? 1 : 0);
  if (isPingAll) {
    const encodedSync = new TextEncoder().encode(SYNC_DATA);
    payload.bytes(Array.from(encodedSync));
  }
  send_event(client, crc_process(client, payload.build()));
}

function send_event_select_esb_addr(client, value) {
  var payload = PacketBuilder.begin(0x3).uint8(0).uint8(HID_ACTION_SELECT_ESB_ADDR);
  for (var len = 0; len < value.length; len += 2) {
    payload.uint8(parseInt(value.substr(len, 2), 16) & 0xff);
  }
  send_event(client, crc_process(client, payload.build()));
}

function send_event_clear_esb_addr(client, value) {
  var payload = PacketBuilder.begin(0x3).uint8(0).uint8(HID_ACTION_CLEAR_ESB_ADDR);
  for (var len = 0; len < value.length; len += 2) {
    payload.uint8(parseInt(value.substr(len, 2), 16) & 0xff);
  }
  send_event(client, crc_process(client, payload.build()));
}

function send_event_set_esb_addr(client, value, addrType, addr) {
  var payload = PacketBuilder.begin(0x3).uint8(0).uint8(HID_ACTION_SET_ESB_ADDR);
  for (var len = 0; len < value.length; len += 2) {
    payload.uint8(parseInt(value.substr(len, 2), 16) & 0xff);
  }
  payload.uint8(addrType).uint8(addr ? 1 : 0);
  send_event(client, crc_process(client, payload.build()));
}

function send_event_sync(client) {
  send_event(client, crc_process(client, PacketBuilder.begin(HID_SYNC_CMD).uint8(0).build()));
}

function send_event_set_color_code(client, value) {
  var payload = PacketBuilder.begin(0x3).uint8(0).uint8(HID_ACTION_SET_COLOR_CODE);
  var byteLen = new TextEncoder().encode(value);
  for (var len = 0; len < byteLen.byteLength && len < 0x10; len++) {
    payload.uint8(byteLen[len]);
  }
  for (var len = byteLen.byteLength; len < 0x10; len++) {
    payload.uint8(0);
  }
  send_event(client, crc_process(client, payload.build()));
}

function send_event_set_sleep_time(client, value) {
  if (client.device_info.sleepTime != value) {
    client.device_info.sleepTime = value;
    var payload = PacketBuilder.begin(0x3).uint8(0).uint8(HID_ACTION_SET_SLEEP_TIME).uint16(value);
    send_event(client, crc_process(client, payload.build()));
    clearTimeout(upload_mouse_config_timer);
    upload_mouse_config_timer = setTimeout(upload_mouse_config_delayed, SYNC_TIMEOUT_MS, client, client.device_info != undefined && client.device_info.revision != undefined && client.device_info.revision.substr(0, 2) == 'G-' ? 1 : 0, value);
  }
}

function send_event_set_rf_channel(client, value) {
  var payload = PacketBuilder.begin(0x3).uint8(0).uint8(HID_ACTION_SET_RF_CHANNEL).uint8(value);
  send_event(client, crc_process(client, payload.build()));
  client.device_info.rfChannel = value;
}

function send_event_set_auto_hop(client, value) {
  var payload = PacketBuilder.begin(0x3).uint8(0).uint8(HID_ACTION_SET_AUTO_HOP).uint8(value ? 1 : 0);
  send_event(client, crc_process(client, payload.build()));
  client.device_info.hopChannel = value;
}

function send_event_mouse_param(client) {
  var value = client.device_info;
  var payload = PacketBuilder.begin(0x3).uint8(0).uint8(HID_ACTION_MOUSE_PARAM);
  var isXyLinked = (value.resolution & CPI_XY_MASK) == 0;
  if (isXyLinked) {
    payload.uint8(value.resolution & 0xff).uint8(value.resolution >> 8 & 0xff);
  } else {
    payload.uint8(0).uint8(0);
  }
  payload.uint16(value.pollingRate);
  payload.uint8(value.light);
  var hasHighCpi = false;
  value.cpiLevels.forEach(function(item) {
    if ((item & CPI_XY_MASK) != 0) {
      hasHighCpi = true;
    }
  });
  if (!hasHighCpi) {
    payload.uint8(value.cpiLevels.length);
    value.cpiLevels.forEach(function(item2) {
      payload.uint16(item2);
    });
  } else {
    payload.uint8(0);
  }
  payload.uint8(value.onboard).uint8(value.powerMode);
  if (isXyLinked) {
    payload.uint8(0).uint8(0).uint8(0).uint8(0);
  } else {
    payload.uint32(value.resolution);
  }
  if (hasHighCpi) {
    payload.uint8(value.cpiLevels.length);
    value.cpiLevels.forEach(function(item3) {
      payload.uint32(item3 >>> 0);
    });
  } else {
    payload.uint8(0);
  }
  payload.uint8(value.lod);
  payload.uint8(value.keyDelay.length);
  value.keyDelay.forEach(function(item4) {
    payload.uint8(item4);
  });
  payload.uint8(value.motionSync);
  payload.uint8(value.angleTuning);
  payload.uint8(value.angleSnapping);
  payload.uint8(value.rippleControl);
  payload.uint8(value.cpiLevelColors.length);
  value.cpiLevelColors.forEach(function(item5) {
    payload.uint8(item5 & 0x7);
  });
  payload.uint8(value.txOutputPower);
  payload.uint8(value.batteryLevels.length);
  value.batteryLevels.forEach(function(item6) {
    payload.uint16(item6);
  });
  payload.uint8(value.autoTxPower);
  payload.uint8(value.onboardStatus.length);
  value.onboardStatus.forEach(function(item7) {
    payload.uint8(item7);
  });
  payload.uint8(value.glassModeEnabled);
  send_event(client, crc_process(client, payload.build()));
  clearTimeout(upload_mouse_config_timer);
  upload_mouse_config_timer = setTimeout(upload_mouse_config_delayed, SYNC_TIMEOUT_MS, client, client.device_info != undefined && client.device_info.revision != undefined && client.device_info.revision.substr(0, 2) == 'G-' ? 1 : 0, value.sleepTime);
}

function send_event_mouse_key(client, arr, actionType, keyCode, macroKey, mouseFlag) {
  var payload = PacketBuilder.begin(0x3).uint8(0).uint8(HID_ACTION_MOUSE_KEY);
  payload.uint8(arr.length);
  arr.forEach(function(item) { payload.uint8(item); });
  payload.uint8(actionType).uint8(macroKey).uint8(mouseFlag).uint8(keyCode).uint8(0);
  send_event(client, crc_process(client, payload.build()));
}

function send_event_mouse_function(client, arr, actionType, functionCode, value, len) {
  var payload = PacketBuilder.begin(0x3).uint8(0).uint8(HID_ACTION_MOUSE_FUNCTION);
  payload.uint8(arr.length);
  arr.forEach(function(item) { payload.uint8(item); });
  payload.uint8(actionType).uint8(functionCode);
  payload.uint16(value);
  payload.uint8(0);
  payload.uint16(len.length);
  for (var offset = 0; offset < len.length; offset++) {
    payload.uint8(len.charCodeAt(offset));
  }
  send_event(client, crc_process(client, payload.build()));
}

function send_event_config_macro(client, arr, type, index, total, len, savedCount, data) {
  for (var offset = 0; offset < len.length; offset += data) {
    var payload = PacketBuilder.begin(0x3).uint8(0);
    payload.uint8(offset == 0 ? HID_ACTION_MACRO_FIRST : HID_ACTION_MACRO_CONT);
    payload.uint8(arr.length);
    arr.forEach(function(item) { payload.uint8(item); });
    payload.uint8(type).uint8(total);
    var chunkSize = len.length - offset >= data ? data : len.length - offset;
    payload.uint8(chunkSize);
    for (var idx = offset; idx < offset + data && idx < len.length; idx++) {
      var el = len[idx];
      payload.uint16(el.x).uint16(el.y).uint16(el.interval_time).uint16(el.continue_time);
      payload.uint8(el.style);
      if (el.style == 0) {
        payload.uint8(0);
      } else if (el.style == MACRO_RECORD_STYLE) {
        var offset2 = 0;
        var value2 = el.mouse_key_code;
        if (el.mouse_key_event == MOUSE_EVENT_MOVE) {
          offset2 = 2;
        } else if (el.mouse_key_event == MOUSE_EVENT_POSITION) {
          offset2 = 6;
        } else if (el.mouse_key_event == MOUSE_EVENT_WHEEL_VERT) {
          offset2 = 3;
        } else if (el.mouse_key_event == MOUSE_EVENT_WHEEL_HORZ) {
          offset2 = 5;
        } else {
          value2 = get_scan_code(el.mouse_key_code);
          if (value2 < KEYCODE_EXT_THRESHOLD) {
            offset2 = 0;
          } else if (value2 < KEYCODE_MEDIA_START) {
            offset2 = 1;
            value2 -= 0xff;
          } else {
            offset2 = 4;
            value2 -= KEYCODE_MEDIA_START;
          }
        }
        if (el.mouse_key_loop > 1) {
          payload.uint8(offset2 | 0x80);
          payload.uint16(el.mouse_key_loop);
        } else {
          payload.uint8(offset2);
        }
        if (offset2 == 2) {
          payload.uint24(value2 >>> 0);
        } else if (offset2 == 6) {
          payload.uint16(value2 >>> 16).uint16(value2 & 0xffff);
        } else if (offset2 == 3) {
          payload.uint8(value2 + 0x40);
        } else if (offset2 == 5) {
          payload.uint8(value2 + 0x40);
        } else {
          var value6 = 2;
          if (el.mouse_key_event == MOUSE_EVENT_KEY_DOWN) {
            value6 = 0;
          } else if (el.mouse_key_event == MOUSE_EVENT_KEY_UP) {
            value6 = 2;
          }
          payload.uint8(value2);
          payload.uint8(value6);
        }
        payload.uint16(el.mouse_key_time);
      }
    }
    payload.uint8(0);
    payload.uint8(savedCount);
    payload.uint8(idx);
    var value7 = offset / data;
    if (offset + data < len.length) {
      value7 |= 0x80;
    }
    payload.uint8(value7);
    send_event(client, crc_process(client, payload.build()));
    client.esb_alive_timeout += ESB_ALIVE_TIMEOUT_MS;
  }
}

function send_event_gaming_only(client, enabled) {
  var payload = PacketBuilder.begin(0x3).uint8(0).uint8(HID_ACTION_GAMING_ONLY).uint8(enabled ? 1 : 0);
  send_event(client, crc_process(client, payload.build()));
  clearTimeout(upload_mouse_config_timer);
  upload_mouse_config_timer = setTimeout(upload_mouse_config_delayed, SYNC_TIMEOUT_MS, client, enabled ? 1 : 0, client.device_info.sleepTime);
}

function send_event_set_brightness(client, value) {
  var payload = PacketBuilder.begin(0x3).uint8(0).uint8(HID_ACTION_SET_BRIGHTNESS).uint8(value);
  send_event(client, crc_process(client, payload.build()));
  client.device_info.brightness = value;
}

// ===== KEY ID / NAME HELPERS =================================================
function get_key_id_by_name(name, isFuzzy) {
  var payload = [];
  if (isFuzzy != undefined) {
    isFuzzy.split('+').forEach(item => {
      if (item == KEY_WHEEL_UP) {
        payload.push(KEY_WHEEL_UP_ID);
      } else if (item == KEY_WHEEL_DOWN) {
        payload.push(KEY_WHEEL_DOWN_ID);
      } else {
        get_keys(name).forEach(item2 => {
          if (item == item2.name) {
            item2.id.forEach(item3 => {
              payload.push(item3);
            });
          }
        });
      }
    });
  }
  return payload;
}

function write_mouse_param(client, item) {
  if (item.name.length == 0) {
    return;
  }
  var value = get_key_id_by_name(client, item.name);
  if (item.configType == CONFIG_TYPE_KEY) {
    if (item.touch_style == TOUCH_STYLE_KEY_MAP) {
      if (item.mouse_mapping_keys != "[0,0,0]") {
        var value2 = item.mouse_mapping_keys;
        var i;
        try {
          i = JSON.parse(value2);
        } catch (err) {
          i = undefined;
        }
        if (i != undefined) {
          var offset = 0;
          var offset2 = 0;
          var offset3 = 0;
          var offset4 = 0;
          if (i.length >= 3) {
            var firstByte = parseInt(i[0]);
            if (firstByte == VK_CODE_CTRL) {
              offset = get_scan_code(SCAN_CODE_CTRL);
            } else if (firstByte == VK_CODE_ALT) {
              offset = get_scan_code(SCAN_CODE_ALT);
            } else if (firstByte == VK_CODE_SHIFT) {
              offset = get_scan_code(SCAN_CODE_SHIFT);
            } else if (firstByte == SCAN_CODE_WIN) {
              offset = get_scan_code(SCAN_CODE_WIN);
            }
            firstByte = parseInt(i[1]);
            if (firstByte == VK_CODE_CTRL) {
              offset2 = get_scan_code(SCAN_CODE_CTRL);
            } else if (firstByte == VK_CODE_ALT) {
              offset2 = get_scan_code(SCAN_CODE_ALT);
            } else if (firstByte == VK_CODE_SHIFT) {
              offset2 = get_scan_code(SCAN_CODE_SHIFT);
            } else if (firstByte == SCAN_CODE_WIN) {
              offset2 = get_scan_code(SCAN_CODE_WIN);
            }
            firstByte = parseInt(i[2]);
            offset3 = get_scan_code(firstByte);
            if (offset3 < KEYCODE_EXT_THRESHOLD) {
              offset4 = 0;
            } else if (offset3 < KEYCODE_MEDIA_START) {
              offset4 = 1;
              offset3 -= 0xff;
            } else if (offset3 == MOUSE_WHEEL_UP) {
              offset4 = 3;
              offset3 = 0x40 + item.mouse_mapping_key_data;
            } else if (offset3 == MOUSE_WHEEL_DOWN) {
              offset4 = 3;
              offset3 = 0x40 - item.mouse_mapping_key_data;
            } else if (offset3 == MOUSE_WHEEL_LEFT) {
              offset4 = 5;
              offset3 = 0x40 - item.mouse_mapping_key_data;
            } else if (offset3 == MOUSE_WHEEL_RIGHT) {
              offset4 = 5;
              offset3 = 0x40 + item.mouse_mapping_key_data;
            } else {
              offset4 = 4;
              offset3 -= KEYCODE_MEDIA_START;
            }
            if (offset == 0 && offset2 == 0 && item.mouse_auto_click && offset4 != 3 && offset4 != 5) {
              var payload = [];
              var macroInfo = create_macro_info();
              macroInfo.style = MACRO_RECORD_STYLE;
              macroInfo.mouse_key_code = firstByte;
              macroInfo.mouse_key_event = MOUSE_EVENT_KEY_DOWN;
              macroInfo.mouse_key_time = item.mouse_auto_click_down;
              macroInfo.interval_time = item.mouse_auto_click_rand;
              macroInfo.name = get_key_name_from_code(firstByte);
              payload.push(macroInfo);
              macroInfo = create_macro_info();
              macroInfo.style = MACRO_RECORD_STYLE;
              macroInfo.mouse_key_code = firstByte;
              macroInfo.mouse_key_event = MOUSE_EVENT_KEY_UP;
              macroInfo.mouse_key_time = item.mouse_auto_click_up;
              macroInfo.interval_time = item.mouse_auto_click_rand;
              macroInfo.name = get_key_name_from_code(firstByte);
              payload.push(macroInfo);
              send_event_config_macro(client, value, 2, 0, 0, payload, 8, is_limit_memory(client) ? MACRO_CHUNK_LIMIT : MACRO_CHUNK_SIZE);
            } else {
              send_event_mouse_key(client, value, offset, offset2, offset4, offset3);
            }
          }
        }
      }
    } else if (item.touch_style == TOUCH_STYLE_FUNC_MAP) {
      if (item.mouse_mapping_function != 0) {
        if (item.mouse_mapping_function == FUNC_PRESS_CPI) {
          send_event_mouse_function(client, value, 2, item.mouse_mapping_function, parseInt(item.mouse_mapping_function_data / get_cpi_step(client)), item.mouse_mapping_function_text);
          send_event_mouse_function(client, value, 3, item.mouse_mapping_function, 0, item.mouse_mapping_function_text);
        } else {
          send_event_mouse_function(client, value, 2, item.mouse_mapping_function, item.mouse_mapping_function_data, item.mouse_mapping_function_text);
        }
      }
    }
  } else if (item.configType == CONFIG_TYPE_MACRO) {
    if (item.macroKeys.length > 0) {
      var offset5 = 0;
      if (item.macro_style == MACRO_STYLE_PRESS) {
        offset5 = 0;
      } else if (item.macro_style == MACRO_STYLE_RELEASE) {
        offset5 = 1;
      } else if (item.macro_style == MACRO_STYLE_TOGGLE) {
        offset5 = 2;
      } else if (item.macro_style == MACRO_STYLE_LONG_PRESS) {
        offset5 = 3;
      } else if (item.macro_style == MACRO_STYLE_LONG_TOGGLE) {
        offset5 = 4;
      } else if (item.macro_style == MACRO_STYLE_LONG_RELEASE) {
        offset5 = 5;
      } else if (item.macro_style == MACRO_STYLE_TOGGLE_LOOP) {
        offset5 = 6;
      }
      send_event_config_macro(client, value, offset5, item.macro_toggleKey, item.macro_endKey, item.macroKeys, 0, is_limit_memory(client) ? MACRO_CHUNK_LIMIT : MACRO_CHUNK_SIZE);
    }
  }
}


// ===== data/device-database.js ====================================================
const DEVICE_DB = {
  products: {
    0x2328: { name: "KNIFE",     sensor: null },
    0x2329: { name: "SA-ML01",   sensor: "PAW3395" },
    0x232a: { name: "Receiver",  sensor: null },
    0x232b: { name: "Receiver 8K", sensor: null },
    0x232c: { name: "SA-MH01",   sensor: "PAW3395" },
    0x232d: { name: "SA-SL01",   sensor: "PAW3395" },
    0x232e: { name: "SA-SH01",   sensor: "PAW3395" },
    0x232f: { name: "GS-SH01",   sensor: null },
    0x2330: { name: "ER21",      sensor: null },
    0x2331: { name: "ES21",      sensor: "PAW3950" },
    0x2332: { name: "ES21Pro",   sensor: "PAW3950" },
    0x2334: { name: "ER21M",     sensor: "PAW3950" },
    0x2335: { name: "ER21Pro",   sensor: null },
    0x2336: { name: "ER21Pro",   sensor: null },
    0x2337: { name: "ES21M",     sensor: "PAW3950" },
    0x2338: { name: "MH01Pro",   sensor: "PAW3950" },
    0x2339: { name: "SH01Pro",   sensor: "PAW3950" },
  },

  getSensor(productId) {
    var product = DEVICE_DB.products[productId];
    return product ? product.sensor : null;
  },

  getName(productId) {
    var product = DEVICE_DB.products[productId];
    return product ? product.name : null;
  },

  nameSensorFallbacks: {
    "SA-ML01":   "PAW3395",
    "SA-MH01":   "PAW3395",
    "SA-SL01":   "PAW3395",
    "SA-SH01":   "PAW3395",
    "ES21":      "PAW3395",
    "SA-MH01Pro": "PAW3950",
    "SA-SH01Pro": "PAW3950",
    "ES21Pro":   "PAW3950",
    "ES21M":     "PAW3950",
    "ER21Pro":   "PAW3950",
    "ER21M":     "PAW3950",
  },

  getSensorByName(deviceName) {
    var sensor = DEVICE_DB.nameSensorFallbacks[deviceName];
    return sensor !== undefined ? sensor : null;
  },
};

function is_keyboard_5_15(device) {
  if (device.productName == "Z68A") {
    return true;
  }
  return false;
}

function is_hs_keyboard(device) {
  if (device.productName == 'Z68A' || device.productName == "Z60") {
    return true;
  }
  return false;
}


// ===== 07-http-data-model.js ====================================================
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
    len2 = DEVICE_DB.getSensor(client.device_info.productId)
      ?? DEVICE_DB.getSensorByName(client.device_info.deviceName)
      ?? '';
  }
  xhr.open("GET", "https://www.miracletek.net/game/mouse_config.php" + ("?os=4" + "&v=" + 0x9 + "&c=" + 0x1 + "&a=" + "pc-rawmhub.game" + '&ta=' + "pc-rawmhub.game" + '&mac=' + (layui.device('os').os.toLowerCase() == "mac" ? 0x1 : 0x0)) + "&devName=" + client.device_info.deviceName + "&sensor=" + len2 + '&uuid=' + client.device_info.esbAddress + "&performance=" + client.device_info.powerMode + "&lod=" + client.device_info.lod + '&angle_snapping=' + client.device_info.angleSnapping + "&ripple_control=" + client.device_info.rippleControl + '&motion_sync=' + client.device_info.motionSync + "&wireless_turbo=" + (client.device_info.txOutputPower == 0x0 ? 0x0 : 0x1) + '&sleep_time=' + value2 + "&angle_tuning=" + client.device_info.angleTuning + "&key_delay=" + bn.toFixed() + "&channel=" + value + "&polling_rate=" + client.device_info.pollingRate + "&glass_mode=" + (is_glass_mode_supported(client) && client.device_info.glassModeEnabled ? 0x1 : 0x0) + "&dpi_xy=" + ((client.device_info.resolution & 0xffff0000) != 0x0 ? 0x1 : 0x0), true);
  xhr.send();
}
function upload_mouse_config_delayed(deviceInfo, channel, sleepTime) {
  upload_mouse_config_timer = undefined;
  upload_mouse_config(deviceInfo, channel, sleepTime);
}



// ===== 08-parse-cmd-ui.js ====================================================
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


// ===== 09-ui-clients.js ====================================================
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


// ===== ui/ui-helpers.js ====================================================
// ===== UI TEMPLATE HELPERS ====================================================
// Reusable HTML generation functions. Each returns a string fragment.
// Extracted from the string-concatenation hotspots in:
//   10-ui-settings.js, 11-ui-mapping.js, 14-ui-keyboard.js
// ============================================================================

// ===== KEYBOARD / MOUSE KEY GRID =============================================

function KeyGridCell(props) {
  var prefix = props.prefix || 'kbd-select-key';
  var action = props.action || 'select';
  var actionAttr = props.actionAttr;
  var index = props.index;
  var x = props.x || 0;
  var y = props.y || 0;
  var width = props.width;
  var height = props.height;
  var label = props.label || '';
  var elementId = props.elementId;
  var extraClass = props.extraClass || 'layui-hover-bg';
  var textStyle = props.textStyle || 'font-size: smaller;';
  var extraAttrs = props.extraAttrs || '';
  var showHoverBg = props.showHoverBg !== false;

  var attrStr = prefix + '-index="' + index + '"';
  if (actionAttr) {
    attrStr += ' ' + actionAttr + '="' + action + '"';
  } else {
    attrStr += ' ' + prefix + '-action="' + action + '"';
  }
  if (elementId !== undefined) {
    attrStr += ' elementId="' + elementId + '"';
  }
  if (extraAttrs) {
    attrStr += ' ' + extraAttrs;
  }

  var innerStyle = 'width:' + width + 'px; height:' + height + 'px;';
  var hoverStyle = 'position: absolute; width:' + width + 'px; height:' + height + 'px;';
  if (showHoverBg && extraClass.indexOf('layui-hover-bg') >= 0) {
    hoverStyle = 'display: flex; justify-content: center; align-items: center; position: absolute; width:' + width + 'px; height:' + height + 'px;';
  }

  var html = '';
  html += '<div class="layui-col-xs3" style="width:' + width + 'px; height:' + height + 'px; margin-left:' + x + 'px; margin-top:' + y + 'px;">';
  html += '<a ' + attrStr + ' style="cursor: pointer;">';
  html += '<div style="' + innerStyle + '">';
  html += '<div class="' + extraClass + '" style="' + hoverStyle + '">';
  html += '<p style="' + textStyle + 'color:white;text-align: center;">' + label + '</p>';
  html += '</div>';
  html += '</div>';
  html += '</a>';
  html += '</div>';
  return html;
}

function KeyGridHighlight(props) {
  var width = props.width;
  var height = props.height;
  var cssClass = props.cssClass || 'layui-key-select-red';
  return '<div class="' + cssClass + '" style="position: absolute; width:' + (width - 3) + 'px; height:' + (height - 3) + 'px;"></div>';
}

// Row wrapper with auto-break at specific indices
function RowBreak(index) {
  var breakPoints = arguments.length > 1 ? Array.prototype.slice.call(arguments, 1) : [0xf, 0x24, 0x39, 0x49, 0x59];
  for (var i = 0; i < breakPoints.length; i++) {
    if (index == breakPoints[i]) {
      return '</div><div class="layui-row">';
    }
  }
  return '';
}

// ===== SELECT DROPDOWNS ======================================================

function SelectElement(props) {
  var name = props.name;
  var filter = props.filter || name;
  var verify = props.verify || 'required';
  var extraAttrs = props.extraAttrs || '';
  var options = props.options || [];
  var selectedValue = props.selected;

  var html = '';
  html += '<select name="' + name + '" lay-verify="' + verify + '" lay-filter="' + filter + '"' + (extraAttrs ? ' ' + extraAttrs : '') + '>';
  for (var i = 0; i < options.length; i++) {
    var opt = options[i];
    var optValue = opt.value !== undefined ? opt.value : i;
    var optLabel = opt.label !== undefined ? opt.label : opt;
    var disabled = opt.disabled ? ' disabled' : '';
    var selected = selectedValue !== undefined && optValue == selectedValue ? ' selected' : '';
    html += '<option value="' + optValue + '"' + disabled + selected + '>' + optLabel + '</option>';
  }
  html += '</select>';
  return html;
}

// ===== RADIO BUTTONS =========================================================

function RadioInput(props) {
  var name = props.name;
  var filter = props.filter || name;
  var value = props.value;
  var label = props.label !== undefined ? props.label : value;
  var checked = props.checked ? ' checked' : '';
  var disabled = props.disabled ? ' disabled' : '';
  var extraAttrs = props.extraAttrs || '';
  return '<input type="radio" name="' + name + '" value="' + value + '" title="' + label + '" lay-filter="' + filter + '"' + checked + disabled + (extraAttrs ? ' ' + extraAttrs : '') + '>';
}

// ===== COLOR SELECTOR ========================================================
// The deeply-nested 7-color chain extracted into data-driven helpers.

var COLOR_MAP = {
  white:   { mask: 7, hex: '#FFF' },
  red:     { mask: 4, hex: '#F00' },
  green:   { mask: 2, hex: '#0F0' },
  blue:    { mask: 1, hex: '#00F' },
  yellow:  { mask: 6, hex: '#FF0' },
  purple:  { mask: 5, hex: '#F0F' },
  skyblue: { mask: 3, hex: '#0FF' },
  dark:    { mask: 0, hex: '#505050' },
};

// Returns the CSS dark-theme class for color picker radios
function ColorPickerClass() {
  return is_dark_theme() ? 'lay-skin-color-picker' : 'lay-skin-color-picker-light';
}

// Build a single color radio option
function ColorRadioOption(props) {
  var colorKey = props.color;
  var bitmask = props.bitmask;
  var name = props.name || 'light-color';
  var action = props.action || 'select';
  var offset = props.offsetRef;
  var darkTheme = ColorPickerClass();
  var info = COLOR_MAP[colorKey];
  if (!info) return '';

  var checked = (bitmask & 0x7) == info.mask ? ' checked' : '';
  var isFirstMatch = '';
  if (checked) {
    if (offset) { offset.value = 1; }
    isFirstMatch = ' checked';
  } else {
    isFirstMatch = '';
  }
  if (checked && !props.keepChecked) {
    isFirstMatch = ' checked';
  }

  var html = '';
  html += '<a color-code="' + colorKey + '" ' + (props.actionAttr || 'light-color-action') + '="' + action + '" style="padding-left: 8px; padding-right: 8px; padding-top: 8px; cursor: pointer;">';
  html += '<input type="radio" name="' + name + '" value="' + colorKey + '" lay-skin="none"' + (checked ? ' checked' : '') + '>';
  html += '<div lay-radio class="' + darkTheme + '" style="color: ' + info.hex + '; background-color: ' + info.hex + '"></div>';
  html += '</a>';
  return html;
}

// Build a full color selector table row from available colors
function ColorSelectorTable(props) {
  var colors = props.colors;
  var bitmask = props.bitmask;
  var name = props.name || 'light-color';
  var actionAttr = props.actionAttr || 'light-color-action';
  var colorHex = props.colorHex || {};
  var offsetRef = { value: 0 };
  var darkTheme = ColorPickerClass();

  var html = '<table><tr>';
  for (var i = 0; i < colors.length; i++) {
    var colorKey = colors[i];
    var info = COLOR_MAP[colorKey];
    if (!info) continue;

    var checked = (bitmask & 0x7) == info.mask;
    if (checked) { offsetRef.value = 1; }
    var hex = colorHex[colorKey] || info.hex;

    html += '<td style="padding-top: 5px;">';
    html += '<a color-code="' + colorKey + '" ' + actionAttr + '="select" style="padding-left: 8px; padding-right: 8px; padding-top: 8px; cursor: pointer;">';

    if (colorKey == 'dark') {
      html += '<input type="radio" name="' + name + '" value="' + colorKey + '" lay-skin="none"' + (offsetRef.value == 0 ? ' checked' : '') + '>';
    } else {
      html += '<input type="radio" name="' + name + '" value="' + colorKey + '" lay-skin="none"' + (checked ? ' checked' : '') + '>';
    }

    html += '<div lay-radio class="' + darkTheme + '" style="color: ' + hex + '; background-color: ' + hex + '"></div>';
    html += '</a>';
    html += '</td>';
  }
  html += '</tr></table>';
  return html;
}

// ===== CPI LEVEL GRID ========================================================

function CpiLevelItem(props) {
  var index = props.index;
  var cpiValue = props.value;
  var cpiX = cpiValue & 0xffff;
  var cpiY = cpiValue >> 16 & 0xffff;
  if (cpiY == 0) { cpiY = cpiX; }
  var colorMask = props.colorMask || 0;
  var currentX = props.currentX;
  var currentY = props.currentY;
  var hasXY = cpiY !== undefined && props.showXY;
  var isSelected = hasXY ? (currentX == cpiX && currentY == cpiY) : (currentX == cpiX);
  var isEditing = props.editing;
  var darkTheme = is_dark_theme() ? '' : '_gray';

  var visible = cpiValue > 0;
  var html = '';
  html += '<div class="layui-col-xs3" style="padding-top: 3px; padding-bottom: 3px; width: fit-content;' + (visible ? '' : ' display: none;') + '">';
  html += '<a cpi-level-index="' + index + '" cpi-level-action="select" style="cursor: pointer;">';

  var imgHeight = hasXY ? '54px' : '30px';
  html += '<div style="width: 80px; height: ' + imgHeight + '; margin-right: 6px;">';

  // Background image
  html += '<div style="position: absolute;">';
  if (!hasXY) {
    if (isEditing || currentX == cpiX) {
      html += '<img src="' + RESOURCE_URL + 'setting/dpi_selected' + darkTheme + '.png" style="position: absolute;">';
    } else {
      html += '<img src="' + RESOURCE_URL + 'setting/dpi_normal.png" style="position: absolute;">';
    }
  } else if (isEditing || (currentX == cpiX && currentY == cpiY)) {
    html += '<img src="' + RESOURCE_URL + 'setting/dpi_selected_h' + darkTheme + '.png" style="position: absolute;">';
  } else {
    html += '<img src="' + RESOURCE_URL + 'setting/dpi_normal_h.png" style="position: absolute;">';
  }
  html += '</div>';

  // Color indicator
  html += '<div style="position: absolute;">';
  var colorOffset = hasXY ? 12 : 0;
  var colorName = get_color_name_from_mask(colorMask);
  if (colorName) {
    html += '<img src="' + RESOURCE_URL + 'setting/dpi_color_' + colorName + '.png" style="position: absolute; margin-top: ' + colorOffset + 'px;">';
  }
  html += '</div>';

  // Text label
  html += '<div style="position: absolute; width: 80px;">';
  if (!hasXY) {
    var textColor = (isEditing || currentX == cpiX) ? 'color:white;' : '';
    html += '<p style="text-align: center; margin-top: 7px;' + textColor + '">' + cpiX + '</p>';
  } else if (isEditing || (currentX == cpiX && currentY == cpiY)) {
    html += '<p style="color:white; text-align: center; margin-top: 10px;">X:' + cpiX + '</p>';
    html += '<p style="color:white; text-align: center; margin-top: 2px;">Y:' + cpiY + '</p>';
  } else {
    html += '<p style="text-align: center; margin-top: 10px;">X:' + cpiX + '</p>';
    html += '<p style="text-align: center; margin-top: 2px;">Y:' + cpiY + '</p>';
  }
  html += '</div>';

  html += '</div>';
  html += '</a>';
  html += '</div>';
  return html;
}

function get_color_name_from_mask(mask) {
  for (var key in COLOR_MAP) {
    if (COLOR_MAP[key].mask == (mask & 0x7)) {
      return key;
    }
  }
  return null;
}

// ===== MACRO EDIT GRID =======================================================

function MacroEditCell(props) {
  var item = props.item;
  var index = props.index;
  var resourceUrl = props.resourceUrl || RESOURCE_URL;

  var keyCode = item.mouse_key_code;
  var keyEvent = item.mouse_key_event;
  var keyTime = item.mouse_key_time;

  var bgColor = (index % 2 == 0) ? 'gray' : '#202020';

  var html = '';
  html += '<td style="padding: 1px;">';
  html += '<a macro-edit-item-index="' + index + '" macro-edit-item-action="select" style="cursor: pointer;">';
  html += '<div style="width: 110px; background-color: ' + bgColor + '; border-radius: 5px; padding: 2px;">';
  html += '<div style="display: flex; align-items: center;">';

  // Title area with conditional icon + text
  if (keyEvent == MOUSE_EVENT_WHEEL_VERT) {
    var isUp = keyCode > 0;
    html += '<img src="' + resourceUrl + 'setting/mkey_wheel.png" style="width: 25px; height: 25px;">';
    html += '<p style="font-size: smaller; margin-left: 2px;">' + layui.i18np.prop('STRID_SETTING_MAPPING_MACRO_ACTION_WHEEL') + '</p>';
    html += '<p style="font-size: smaller; margin-left: 2px;">' + (isUp ? '▲' : '▼') + '</p>';
    html += '<p style="font-size: smaller; margin-left: 2px;">' + keyCode + '</p>';
  } else if (keyEvent == MOUSE_EVENT_WHEEL_HORZ) {
    var isLeft = keyCode < 0;
    html += '<img src="' + resourceUrl + 'setting/mkey_wheel.png" style="width: 25px; height: 25px;">';
    html += '<p style="font-size: smaller; margin-left: 2px;">' + layui.i18np.prop('STRID_SETTING_MAPPING_MACRO_ACTION_WHEEL') + '</p>';
    html += '<p style="margin-left: 2px;">' + (isLeft ? '◄' : '►') + '</p>';
    html += '<p style="font-size: smaller; margin-left: 2px;">' + keyCode + '</p>';
  } else if (keyEvent == MOUSE_EVENT_MOVE) {
    var dx = (keyCode >> 16 & 0xffff) - 0x7ff;
    var dy = (keyCode & 0xffff) - 0x7ff;
    html += '<img src="' + resourceUrl + 'setting/mkey_move.png" style="width: 25px; height: 25px;">';
    html += '<p style="font-size: smaller; margin-left: 2px;">' + layui.i18np.prop('STRID_SETTING_MAPPING_MACRO_ACTION_MOVE') + '</p>';
    html += '<p style="font-size: smaller; margin-left: 2px;">(' + (dx / 10) + ', ' + (dy / 10) + ')</p>';
  } else if (keyEvent == MOUSE_EVENT_POSITION) {
    html += '<img src="' + resourceUrl + 'setting/mkey_move.png" style="width: 25px; height: 25px;">';
    html += '<p style="font-size: smaller; margin-left: 2px;">' + layui.i18np.prop('STRID_SETTING_MAPPING_MACRO_ACTION_POSITION') + '</p>';
    var screenW = document.documentElement.clientWidth;
    var screenH = document.documentElement.clientHeight;
    var px = Math.round((keyCode >> 16 & 0xffff) * screenW / 0xffff);
    var py = Math.round((keyCode & 0xffff) * screenH / 0xffff);
    html += '<p style="font-size: smaller; margin-left: 2px;">(' + px + ', ' + py + ')</p>';
  } else if (keyEvent == MOUSE_EVENT_KEY_UP) {
    html += '<img src="' + resourceUrl + 'setting/' + (keyCode > 0xff ? 'mkey_up.png' : 'key_up.png') + '" style="width: 25px; height: 25px;">';
    html += '<p style="font-size: smaller; margin-left: 2px;">' + get_key_name_from_code(keyCode) + '</p>';
  } else {
    if (keyCode == 0) {
      html += '<p style="font-size: smaller;">' + get_key_name_from_code(keyCode) + '</p>';
    } else {
      html += '<img src="' + resourceUrl + 'setting/' + (keyCode > 0xff ? 'mkey_down.png' : 'key_down.png') + '" style="width: 25px; height: 25px;">';
      html += '<p style="font-size: smaller; margin-left: 2px;">' + get_key_name_from_code(keyCode) + '</p>';
    }
  }

  html += '</div>'; // flex end

  // Bottom row: wait icon + time
  html += '<div style="display: flex; align-items: center;">';
  html += '<img src="' + resourceUrl + 'setting/mkey_wait.png" style="width: 15px; height: 15px;">';
  html += '<p style="font-size: smaller; margin-left: 2px;">' + keyTime + '</p>';
  if (item.x && item.loop) {
    html += '<p style="font-size: smaller; margin-left: 2px;">x' + item.loop + '</p>';
  }
  html += '</div>';

  html += '</div>'; // outer div
  html += '</a>';
  html += '</td>';
  return html;
}


// ===== 10-ui-settings.js ====================================================
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
    var maxRate = get_max_polling_rate(client, usb_client_list);
    var maxPowerRate = get_max_power_polling_rate(client);
    var currentRate = client.device_info.pollingRate;
    for (var ri = 0; ri < arr2.length; ri++) {
      var rate = arr2[ri];
      var withinLimit = rate <= maxRate && rate <= maxPowerRate;
      var isCurrent = rate == currentRate;
      html += RadioInput({ name: 'setting_polling_rates', value: rate, label: rate, checked: isCurrent, disabled: !withinLimit });
    }
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
  var colors = get_light_display_colors(client);
  html = ColorSelectorTable({ colors: colors, bitmask: value9, name: 'light-color', actionAttr: 'light-color-action' });
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
  var isGseries = client.device_info != undefined && client.device_info.revision != undefined && client.device_info.revision.substr(0, 2) == 'G-';
  var modes = isGseries ? get_power_modes2(client) : get_power_modes(client);
  var colClass = modes.length == 4 ? 'layui-col-xs3' : 'layui-col-xs4';
  html = '<div class="layui-row">';
  for (var pi = 0; pi < modes.length; pi++) {
    var isDisabled = isGseries && pi < 2;
    html += '<div class="' + colClass + '">';
    html += RadioInput({ name: 'setting_power_modes', value: pi, label: modes[pi], checked: pi == client.device_info.powerMode, disabled: isDisabled });
    html += '</div>';
  }
  html += '</div>';
  layui2('#setting-power-modes').html(html);
  var modeIdx = client.device_info.powerMode;
  var tips = get_power_mode_tips(client);
  layui2('#selected-power-mode-tips').html(modes[modeIdx] + ': ' + tips[modeIdx]);
  html = '<div class="layui-row">';
  var lods = get_lods_list(client);
  for (var li = 0; li < lods.length; li++) {
    html += '<div class="layui-col-xs4">';
    html += RadioInput({ name: 'setting_lods', value: li + 1, label: lods[li], checked: li + 1 == client.device_info.lod });
    html += '</div>';
  }
  html += '</div>';
  layui2('#setting-lods').html(html);
  layui2("#setting-lod-section").css("display", lods.length > 0x1 ? '' : "none");
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
  var colors2 = get_light_display_colors(client);
  html = ColorSelectorTable({ colors: colors2, bitmask: isXYLight, name: 'dpi-level-color', actionAttr: 'dpi-level-color-action' });
  $('#dpi-input-colors').html(html);
  layui.form.render();
}


// ===== 11-ui-mapping.js ====================================================
function setting_mapping_init(client) {
  if (client != undefined ? is_hs_keyboard(client.device) : false) {
    return;
  }
  var layui2 = layui.table;
  select_key_name = '';
  select_mapping_type(client, 0x3);
  onboard_index = client.device_info.onboardIndex;
  onboard_configs = JSON.parse(JSON.stringify(client.device_info.allKeyConfigs));
  onboard_status = client.device_info.onboardStatus;
  onboard_keys = onboard_configs[onboard_index];
  mouse_keys = get_keys(client);
  setting_mapping_keys = [];
  for (let len = 0x0; len < mouse_keys.length; len++) {
    setting_mapping_keys.push("setting_mapping_key_m" + (len + 0x1));
  }
  mouse_key_labels = [];
  mouse_key_labels.push(layui.i18np.prop('STRID_NONE'));
  for (let index = 0x0; index < mouse_keys.length; index++) {
    mouse_key_labels.push(mouse_keys[index].label);
  }
  var el = document.getElementById('key-delay-guide-img');
  el.src = get_setup_icon(client);
  var html = "<select name=\"key-delay-select-key\" lay-verify=\"required\" lay-filter=\"key-delay-select-key\">";
  for (let offset = 0x0; offset < mouse_key_labels.length; offset++) {
    if (offset == 0x0) {
      html += "<option value=\"" + offset + "\">" + layui.i18np.prop("STRID_SETTING_SELECT_KEY_ALL") + "</option>";
    } else {
      var value = mouse_key_labels[offset];
      if (mouse_key_labels[offset] == 'â‘ ') {
        value = layui.i18np.prop("STRID_KEY_LEFT_S");
      } else {
        if (mouse_key_labels[offset] == 'â‘¡') {
          value = layui.i18np.prop("STRID_KEY_MIDDLE_S");
        } else if (mouse_key_labels[offset] == 'â‘¢') {
          value = layui.i18np.prop('STRID_KEY_RIGHT_S');
        }
      }
      if (mouse_keys[offset - 0x1].visible != undefined && !mouse_keys[offset - 0x1].visible) {
        html += "<option value=\"" + offset + "\" disabled>" + value + "</option>";
      } else {
        html += "<option value=\"" + offset + "\">" + value + "</option>";
      }
    }
  }
  html += '</select>';
  $('#setting-key-delay-select-key').html(html);
  var flag = true;
  var len2 = client.device_info.keyDelay;
  for (var count = 0x1; count < len2.length; count++) {
    if (client.device_info != undefined && client.device_info.revision != undefined && client.device_info.revision.substr(0x0, 0x2) == 'G-') {
      if (len2[count] != len2[count - 0x1]) {
        flag = false;
        break;
      }
    } else {
      if ((len2[count] & 0xf) != (len2[count - 0x1] & 0xf)) {
        flag = false;
        break;
      }
    }
  }
  if (flag || !(client.device_info != undefined && client.device_info.revision != undefined && client.device_info.revision.substr(0x0, 0x2) == 'G-' || is_oms(client, -0x1))) {
    $("[name=\"key-delay-select-key\"]").val(0x0);
  } else {
    $("[name=\"key-delay-select-key\"]").val(0x1);
  }
  $("#slider-key-up-delay").css('display', client.device_info != undefined && client.device_info.revision != undefined && client.device_info.revision.substr(0x0, 0x2) == 'G-' ? '' : 'none');
  $("#setting-key-delay-down-up").css("display", client.device_info != undefined && client.device_info.revision != undefined && client.device_info.revision.substr(0x0, 0x2) == 'G-' ? '' : 'none');
  $('#setting-key-delay-select-key-container').css("display", client.device_info != undefined && client.device_info.revision != undefined && client.device_info.revision.substr(0x0, 0x2) == 'G-' || is_oms(client, -0x1) ? '' : 'none');
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
  if (is_enhancement(client)) {
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
  layui2.render({
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
    'data': get_shortcuts(client),
    'skin': "grid",
    'page': false,
    'done': function (result) {
      $(".layui-table").css("width", "100%");
      $("th[data-field='delete']").css("border-right", "none");
      $("th[data-field='desc']").css("border-right", "none");
      $("td[data-field='desc']").css('border-right', "none");
    }
  });
  layui2.on('row(key-shortcuts)', function (result) {
    var len3 = modifiers;
    var len4 = keys;
    var len5 = result.data.keys.split('+');
    if (len5.length == 0x2) {
      var trimmedVal = len5[0x0].trim();
      if (trimmedVal == 'âŒ˜') {
        trimmedVal = "Command";
      }
      for (var offset2 = 0x0; offset2 < len3.length; offset2++) {
        if (trimmedVal == len3[offset2].name) {
          $("[name=\"mapping-ctrl-key1\"]").val(offset2);
          break;
        }
      }
      $("[name=\"mapping-ctrl-key2\"]").val(0x0);
      trimmedVal = len5[0x1].trim();
      if (trimmedVal == 'â†’') {
        trimmedVal = layui.i18np.prop("STRID_KEY_ARROW_RIGHT");
      } else {
        if (trimmedVal == 'â†') {
          trimmedVal = layui.i18np.prop("STRID_KEY_ARROW_LEFT");
        } else {
          if (trimmedVal == 'â†‘') {
            trimmedVal = layui.i18np.prop("STRID_KEY_ARROW_UP");
          } else if (trimmedVal == 'â†“') {
            trimmedVal = layui.i18np.prop("STRID_KEY_ARROW_DOWN");
          }
        }
      }
      for (var offset2 = 0x0; offset2 < len4.length; offset2++) {
        if (trimmedVal == len4[offset2].name) {
          $("[name=\"mapping-key\"]").val(offset2);
          break;
        }
      }
    } else {
      if (len5.length > 0x2) {
        var trimmedVal = len5[0x0].trim();
        if (trimmedVal == 'âŒ˜') {
          trimmedVal = 'Command';
        }
        for (var offset2 = 0x0; offset2 < len3.length; offset2++) {
          if (trimmedVal == len3[offset2].name) {
            $("[name=\"mapping-ctrl-key1\"]").val(offset2);
            break;
          }
        }
        trimmedVal = len5[0x1].trim();
        if (trimmedVal == 'âŒ˜') {
          trimmedVal = "Command";
        }
        for (var offset2 = 0x0; offset2 < len3.length; offset2++) {
          if (trimmedVal == len3[offset2].name) {
            $("[name=\"mapping-ctrl-key2\"]").val(offset2);
            break;
          }
        }
        trimmedVal = len5[0x2].trim();
        if (trimmedVal == 'â†’') {
          trimmedVal = layui.i18np.prop("STRID_KEY_ARROW_RIGHT");
        } else {
          if (trimmedVal == 'â†') {
            trimmedVal = layui.i18np.prop("STRID_KEY_ARROW_LEFT");
          } else {
            if (trimmedVal == 'â†‘') {
              trimmedVal = layui.i18np.prop("STRID_KEY_ARROW_UP");
            } else if (trimmedVal == 'â†“') {
              trimmedVal = layui.i18np.prop("STRID_KEY_ARROW_DOWN");
            }
          }
        }
        for (var offset2 = 0x0; offset2 < len4.length; offset2++) {
          if (trimmedVal == len4[offset2].name) {
            $("[name=\"mapping-key\"]").val(offset2);
            break;
          }
        }
      }
    }
    layui.form.render("select");
    set_mapping_keys(client);
    ui_refresh_tab_mapping_key(client);
  });
}
function ui_refresh_setting_mapping(client) {
  if (client != undefined ? is_hs_keyboard(client.device) : false) {
    return;
  }
  var index = get_product_id_hex_str(client);
  var value = key_pos[index];
  var el;
  var i;
  for (var len = 0x1; len <= 0x7; len++) {
    el = 'm' + len;
    i = document.getElementById("setting-mapping-key-" + el);
    i.style.left = value[el][0x0] + 'px';
    i.style.top = value[el][0x1] + 'px';
  }
  el = "wheel-line-container";
  i = document.getElementById("setting-mapping-key-" + el);
  i.style.left = value[el][0x0] + 'px';
  i.style.top = value[el][0x1] + 'px';
  el = "wheel-up";
  i = document.getElementById("setting-mapping-key-" + el);
  i.style.left = value[el][0x0] + 'px';
  i.style.top = value[el][0x1] + 'px';
  el = "wheel-down";
  i = document.getElementById("setting-mapping-key-" + el);
  i.style.left = value[el][0x0] + 'px';
  i.style.top = value[el][0x1] + 'px';
  var len2 = get_color_code(client);
  if (len2.length > 0x0) {
    $("#setting_mapping_product_icon").css("background-image", "url(" + RESOURCE_URL + "product/" + index + '/' + len2 + "/setting.png)");
  } else {
    $("#setting_mapping_product_icon").css('background-image', 'url(' + RESOURCE_URL + 'product/' + index + "/setting.png)");
  }
  document.getElementById('product-name').src = RESOURCE_URL + "product/" + index + "/name.png";
  ui_refresh_onboard_config(client);
  ui_refresh_mapping_key(client);
  ui_refresh_combination_key(client);
}
function ui_refresh_onboard_config(client) {
  var layui2 = layui.$;
  var layui3 = layui.form;
  var html = "<select name=\"onboard-config\" lay-verify=\"required\" lay-filter=\"onboard-config\">";
  for (let len = 0x0; len < onboard_configs.length; len++) {
    if (len == client.device_info.onboardIndex) {
      if (len == onboard_config_index && need_save) {
        html += "<option value=\"" + len + "\">" + layui.i18np.prop("STRID_SETTING_CONFIG_CURRENT") + NUMBERS[len + 0x1] + " â—€ *" + "</option>";
      } else {
        html += "<option value=\"" + len + "\">" + layui.i18np.prop('STRID_SETTING_CONFIG_CURRENT') + NUMBERS[len + 0x1] + " â—€" + '</option>';
      }
    } else if (len == onboard_config_index && need_save) {
      html += "<option value=\"" + len + "\">" + layui.i18np.prop("STRID_SETTING_CONFIG_CURRENT") + NUMBERS[len + 0x1] + " *" + '</option>';
    } else {
      html += "<option value=\"" + len + "\">" + layui.i18np.prop('STRID_SETTING_CONFIG_CURRENT') + NUMBERS[len + 0x1] + "</option>";
    }
  }
  html += "</select>";
  layui2("#setting-onboard-config").html(html);
  layui2("[name=\"onboard-config\"]").val(onboard_config_index);
  layui3.render("select");
  var status = onboard_status[onboard_config_index];
  if ((status & 0x80) != 0x0) {
    layui2("[name=\"onboard-allow-switch\"]").prop("checked", true);
  } else {
    layui2("[name=\"onboard-allow-switch\"]").prop("checked", false);
  }
  var colors = get_light_display_colors(client);
  html = ColorSelectorTable({ colors: colors, bitmask: status, name: 'setting-onboard-color', actionAttr: 'setting-onboard-status-action', colorHex: { white: '#EEE' } });
  layui2('#setting-onboard-status-colors').html(html);
  layui3.render('radio');
  layui3.render("checkbox");
}
function ui_refresh_combination_key(client) {
  var layui2 = layui.$;
  var layui3 = layui.form;
  var html = "<select name=\"combination-key\" lay-verify=\"required\" lay-filter=\"combination-key\">";
  for (let len = 0x0; len < mouse_key_labels.length; len++) {
    var str = '';
    var value = get_key_name_from_label(mouse_key_labels[len]);
    onboard_keys.forEach(item => {
      if (item.configType >= 0x0) {
        var len2 = item.name.split('+');
        if (len2.length == 0x2 && len2[0x0] == value) {
          var value2 = item.label.split('+')[0x1];
          if (str.indexOf(value2) == -0x1) {
            str += value2;
          }
        }
      }
    });
    var str2 = len > 0x0 && mouse_keys[len - 0x1].visible != undefined && !mouse_keys[len - 0x1].visible ? " disabled" : '';
    if (str.length > 0x0) {
      html += "<option value=\"" + len + "\"" + str2 + '>' + mouse_key_labels[len] + " + " + str + "</option>";
    } else {
      html += "<option value=\"" + len + "\"" + str2 + '>' + mouse_key_labels[len] + "</option>";
    }
  }
  html += "</select>";
  layui2("#setting-combination-key").html(html);
  layui2("[name=\"combination-key\"]").val(combination_key_index);
  layui3.render("select");
}
function ui_refresh_mapping_key(client) {
  var selectedLabel = mouse_key_labels[combination_key_index];
  var len = get_key_name_from_label(selectedLabel);
  var payload = [];
  var arr = [];
  for (let index = 0x0; index < mouse_keys.length; index++) {
    payload.push("#setting-mapping-key-m" + (index + 0x1) + "-desc");
    if (len.length == 0x0) {
      arr.push(mouse_keys[index].name);
    } else {
      arr.push(len + '+' + mouse_keys[index].name);
    }
  }
  payload.push("#setting-mapping-key-wheel-up-desc");
  if (len.length == 0x0) {
    arr.push(KEY_WHEEL_UP);
  } else {
    arr.push(len + '+' + KEY_WHEEL_UP);
  }
  payload.push("#setting-mapping-key-wheel-down-desc");
  if (len.length == 0x0) {
    arr.push(KEY_WHEEL_DOWN);
  } else {
    arr.push(len + '+' + KEY_WHEEL_DOWN);
  }
  if (select_key_name.length == 0x0) {
    var len2 = $("[name=\"setting-mapping-key\"]");
    for (let offset = 0x0; offset < len2.length; offset++) {
      len2[offset].checked = false;
    }
    layui.form.render('radio');
  }
  var len3 = select_key_name.split('+');
  var value = len3[len3.length - 0x1];
  for (let count = 0x0; count < mouse_keys.length; count++) {
    var el = count + 0x1;
    if (value == mouse_keys[count].name) {
      $("#setting-mapping-key-m" + el + "-line").css("background-color", theme_color);
      document.getElementById("setting-mapping-key-m" + el + '-circle').src = RESOURCE_URL + "setting/key_circle_blue.png";
      $("#setting-mapping-key-m" + el + "-desc").css("color", theme_color);
      $("#setting-mapping-key-m" + el + "-text").css("color", theme_color);
    } else {
      $("#setting-mapping-key-m" + el + "-line").css('background-color', "gray");
      document.getElementById('setting-mapping-key-m' + el + "-circle").src = RESOURCE_URL + 'setting/key_circle_gray.png';
      $("#setting-mapping-key-m" + el + "-desc").css("color", '');
      $('#setting-mapping-key-m' + el + "-text").css('color', '');
    }
    $("#setting-mapping-key-m" + el).css("display", '');
  }
  if (value == 'M7') {
    $("#setting-mapping-key-m7-line").css('background-color', "#00000000");
    $("#setting-mapping-key-m7-line").css('background-image', "url(" + RESOURCE_URL + "setting/mapping_key_line_selected.png)");
    document.getElementById("setting-mapping-key-m7-circle").src = RESOURCE_URL + "setting/key_circle_blue2.png";
  } else {
    $("#setting-mapping-key-m7-line").css("background-color", "#00000000");
    $("#setting-mapping-key-m7-line").css("background-image", 'url(' + RESOURCE_URL + "setting/mapping_key_line_normal.png)");
    document.getElementById('setting-mapping-key-m7-circle').src = RESOURCE_URL + "setting/key_circle_gray2.png";
  }
  if (value == KEY_WHEEL_DOWN) {
    $("#setting-mapping-key-wheel-down-line").css("background-color", theme_color);
    $("#setting-mapping-key-wheel-down-desc").css("color", theme_color);
    $("#setting-mapping-key-wheel-down-text").css("color", theme_color);
    $("#setting-mapping-key-wheel-line").css("background-color", theme_color);
    document.getElementById("setting-mapping-key-wheel-circle").src = RESOURCE_URL + "setting/key_circle_blue.png";
    $("#setting-mapping-key-wheel-up-line").css("background-color", "gray");
    $("#setting-mapping-key-wheel-up-desc").css("color", '');
    $('#setting-mapping-key-wheel-up-text').css('color', '');
  } else if (value == KEY_WHEEL_UP) {
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
  for (var len4 = 0x0; len4 < mouse_keys.length; len4++) {
    if (mouse_keys[len4].visible != undefined && !mouse_keys[len4].visible) {
      $("#setting-mapping-key-m" + (len4 + 0x1)).css('display', "none");
    }
  }
  if (combination_key_index > 0x0) {
    $("#setting-mapping-key-m" + combination_key_index).css("display", 'none');
  }
  for (let len5 = 0x0; len5 < payload.length; len5++) {
    var el2 = payload[len5];
    $(el2).html('');
    onboard_keys.forEach(item => {
      if (item.name == arr[len5]) {
        if (item.configType == 0x0) {
          if (item.touch_style == 0x1b) {
            var payload2 = [];
            var len6 = item.mouse_mapping_keys;
            if (len6.length > 0x0) {
              len6 = len6.replace('[', '');
              len6 = len6.replace(']', '');
              var arr2 = len6.split(',');
              if (arr2.length > 0x0) {
                arr2.forEach(item2 => {
                  if (item2 > 0x0) {
                    var flag = false;
                    var len7 = modifiers;
                    for (let len8 = 0x0; len8 < len7.length; len8++) {
                      if (item2 == len7[len8].vCode) {
                        payload2.push(len7[len8].name);
                        flag = true;
                        break;
                      }
                    }
                    if (!flag) {
                      var len9 = keys;
                      for (let len10 = 0x0; len10 < len9.length; len10++) {
                        if (item2 == len9[len10].vCode) {
                          if (item2 == 0x400 || item2 == 0x401 || item2 == 0x402 || item2 == 0x403) {
                            payload2.push(len9[len10].name + '(' + item.mouse_mapping_key_data + ')');
                          } else {
                            payload2.push(len9[len10].name);
                          }
                          flag = true;
                          break;
                        }
                      }
                    }
                  }
                });
              }
            }
            if (payload2.length > 0x0) {
              var html = '';
              for (let len11 = 0x0; len11 < payload2.length; len11++) {
                html += payload2[len11];
                if (len11 < payload2.length - 0x1) {
                  html += '+';
                }
              }
              $(el2).html(layui.i18np.prop('STRID_SETTING_MAPPING_TYPE_KEY') + " - " + html);
            } else {
              $(el2).html(layui.i18np.prop("STRID_SETTING_MAPPING_TYPE_KEY") + " - " + layui.i18np.prop('STRID_NONE'));
            }
          } else {
            if (item.touch_style == 0x1d) {
              for (let len12 = 0x0; len12 < mouse_functions.length; len12++) {
                if (item.mouse_mapping_function == mouse_functions[len12]) {
                  var html = layui.i18np.prop("STRID_SETTING_MAPPING_TYPE_FUNCTION") + " - " + mouse_function_descs[len12];
                  if (item.mouse_mapping_function == 0x10) {
                    if (is_valid_url(item.mouse_mapping_function_text)) {
                      html += layui.i18np.prop("STRID_SETTING_MAPPING_TYPE_FUNCTION_SHELL_CMD_WEB");
                    } else {
                      html += layui.i18np.prop("STRID_SETTING_MAPPING_TYPE_FUNCTION_SHELL_CMD_APP");
                    }
                  }
                  $(el2).html(html);
                  break;
                }
              }
            }
          }
        } else if (item.configType == 0x5) {
          $(el2).html(layui.i18np.prop("STRID_SETTING_MAPPING_TYPE_MACRO"));
        }
      }
    });
  }
}
function ui_refresh_tab_mapping_key(client) {
  var layui2 = layui.$;
  var layui3 = layui.form;
  var keyInfo = get_select_key_info();
  if (Object.keys(keyInfo).length == 0x0) {
    return;
  }
  var len = modifiers;
  var html = "<select name=\"mapping-ctrl-key1\" lay-verify=\"required\" lay-filter=\"mapping-ctrl-key1\">";
  for (let index = 0x0; index < len.length; index++) {
    html += "<option value=\"" + index + "\">" + len[index].name + "</option>";
  }
  html += "</select>";
  layui2('#setting-mapping-ctrl-key1').html(html);
  layui2("[name=\"mapping-ctrl-key1\"]").val(0x0);
  html = "<select name=\"mapping-ctrl-key2\" lay-verify=\"required\" lay-filter=\"mapping-ctrl-key1\">";
  for (let offset = 0x0; offset < len.length; offset++) {
    html += "<option value=\"" + offset + "\">" + len[offset].name + "</option>";
  }
  html += "</select>";
  layui2("#setting-mapping-ctrl-key2").html(html);
  layui2("[name=\"mapping-ctrl-key2\"]").val(0x0);
  var len2 = keys;
  var html = "<select name=\"mapping-key\" lay-verify=\"required\" lay-filter=\"mapping-key\">";
  for (let count = 0x0; count < len2.length; count++) {
    html += "<option value=\"" + count + "\">" + len2[count].name + "</option>";
  }
  html += "</select>";
  layui2("#setting-mapping-key").html(html);
  layui2("[name=\"mapping-key\"]").val(0x0);
  var value = keyInfo.mouse_mapping_keys;
  if (value.length > 0x0) {
    value = value.replace('[', '');
    value = value.replace(']', '');
    var len3 = value.split(',');
    if (len3.length >= 0x3) {
      for (let len4 = 0x0; len4 < len.length; len4++) {
        if (len3[0x0] == len[len4].vCode) {
          layui2("[name=\"mapping-ctrl-key1\"]").val(len4);
          break;
        }
      }
      for (let len5 = 0x0; len5 < len.length; len5++) {
        if (len3[0x1] == len[len5].vCode) {
          layui2("[name=\"mapping-ctrl-key2\"]").val(len5);
          break;
        }
      }
      for (let len6 = 0x0; len6 < len2.length; len6++) {
        if (len3[0x2] == len2[len6].vCode) {
          layui2("[name=\"mapping-key\"]").val(len6);
          break;
        }
      }
    }
    if (keyInfo.mouse_mapping_keys == "[0,0,1024]" || keyInfo.mouse_mapping_keys == "[0,0,1025]" || keyInfo.mouse_mapping_keys == "[0,0,1026]" || keyInfo.mouse_mapping_keys == "[0,0,1027]") {
      layui2("#wheel-delta-container").css("display", 'flex');
      layui2("#wheel-delta-input").val(keyInfo.mouse_mapping_key_data);
    } else {
      layui2("#wheel-delta-container").css('display', "none");
    }
    var value2 = len2[layui2("[name=\"mapping-key\"]").val()].vCode;
    if (layui2("[name=\"mapping-ctrl-key1\"]").val() == 0x0 && layui2("[name=\"mapping-ctrl-key2\"]").val() == 0x0 && value2 != 0x0 && value2 != 0x400 && value2 != 0x401 && value2 != 0x402 && value2 != 0x403) {
      layui2("#mapping-key-turbo-container").css("display", '');
      if (keyInfo.mouse_auto_click == 0x1) {
        layui2("#mapping-key-turbo-detail-container").css("display", '');
        layui2("[name=\"mapping-key-turbo\"]").prop('checked', true);
      } else {
        layui2("#mapping-key-turbo-detail-container").css("display", "none");
        layui2("[name=\"mapping-key-turbo\"]").prop("checked", false);
      }
      if (keyInfo.mouse_auto_click_down == 0x0 && keyInfo.mouse_auto_click_up == 0x0) {
        keyInfo.mouse_auto_click_down = 0x32;
        keyInfo.mouse_auto_click_up = 0x32;
      }
      layui2("#mapping-key-turbo-freq-input").val(parseInt(0x3e8 / (keyInfo.mouse_auto_click_down + keyInfo.mouse_auto_click_up)));
      layui2("#mapping-key-turbo-rand-input").val(keyInfo.mouse_auto_click_rand);
      layui2('#mapping-key-turbo-down-keep-input').val(keyInfo.mouse_auto_click_down);
      layui2("#mapping-key-turbo-up-keep-input").val(keyInfo.mouse_auto_click_up);
      if (client.device_info != undefined && client.device_info.revision != undefined && client.device_info.revision.substr(0x0, 0x2) == 'G-' && (value2 >= 0x200 && value2 < 767 || value2 == 0x402 || value2 == 0x403)) {
        layui2("#keys-fw-channel-gaming-tips").css("display", '');
      } else {
        layui2("#keys-fw-channel-gaming-tips").css("display", "none");
      }
    } else {
      layui2("#mapping-key-turbo-container").css("display", "none");
      layui2("#keys-fw-channel-gaming-tips").css("display", "none");
    }
  }
  layui3.render("checkbox");
  layui3.render("select");
}
function ui_refresh_tab_mapping_macro(client) {
  var layui2 = layui.$;
  var layui3 = layui.form;
  var keyInfo = get_select_key_info();
  if (Object.keys(keyInfo).length == 0x0) {
    return;
  }
  if (keyInfo.macro_style < 0x0 || keyInfo.macro_style > 0x6) {
    keyInfo.macro_style = 0x0;
  }
  macro_counts = [];
  for (let len = 0x0; len <= 0x6; len++) {
    macro_counts.push(0x0);
  }
  for (let index = 0x0; index < onboard_keys.length; index++) {
    var value = onboard_keys[index];
    if (keyInfo.name == value.name) {
      macro_counts[value.macro_style] = value.macroKeys.length;
    }
  }
  var html = "<select name=\"mapping-macro-trigger-type\" lay-verify=\"required\" lay-filter=\"mapping-macro-trigger-type\">";
  for (let offset = 0x0; offset <= 0x6; offset++) {
    if (macro_counts[offset] > 0x0) {
      html += "<option value=\"" + offset + "\">" + macro_trigger_types[offset] + '(' + macro_counts[offset] + ')' + "</option>";
      if (macro_trigger_type_index < 0x0) {
        macro_trigger_type_index = offset;
      }
    } else {
      html += "<option value=\"" + offset + "\">" + macro_trigger_types[offset] + '</option>';
    }
  }
  html += '</select>';
  layui2("#setting-mapping-macro-trigger-type").html(html);
  if (macro_trigger_type_index < 0x0) {
    macro_trigger_type_index = 0x0;
  }
  layui2("[name=\"mapping-macro-trigger-type\"]").val(macro_trigger_type_index);
  html = "<select name=\"mapping-macro-trigger-key\" lay-verify=\"required\" lay-filter=\"mapping-macro-trigger-key\">";
  for (let count = 0x0; count < mouse_key_labels.length; count++) {
    var str = count > 0x0 && mouse_keys[count - 0x1].visible != undefined && !mouse_keys[count - 0x1].visible ? " disabled" : '';
    html += "<option value=\"" + count + "\"" + str + '>' + mouse_key_labels[count] + "</option>";
  }
  html += '</select>';
  layui2('#setting-mapping-macro-trigger-key').html(html);
  layui2("[name=\"mapping-macro-trigger-key\"]").val(0x0);
  var value2 = get_key_label_from_id(keyInfo.macro_toggleKey);
  for (let len2 = 0x0; len2 < mouse_key_labels.length; len2++) {
    if (value2 == mouse_key_labels[len2]) {
      layui2("[name=\"mapping-macro-trigger-key\"]").val(len2);
      break;
    }
  }
  html = "<select name=\"mapping-macro-stop-key\" lay-verify=\"required\" lay-filter=\"mapping-macro-stop-key\">";
  for (let len3 = 0x0; len3 < mouse_key_labels.length; len3++) {
    var str = len3 > 0x0 && mouse_keys[len3 - 0x1].visible != undefined && !mouse_keys[len3 - 0x1].visible ? " disabled" : '';
    html += "<option value=\"" + len3 + "\"" + str + '>' + mouse_key_labels[len3] + '</option>';
  }
  html += "</select>";
  layui2("#setting-mapping-macro-stop-key").html(html);
  layui2("[name=\"mapping-macro-stop-key\"]").val(0x0);
  value2 = get_key_label_from_id(keyInfo.macro_endKey);
  for (let len4 = 0x0; len4 < mouse_key_labels.length; len4++) {
    if (value2 == mouse_key_labels[len4]) {
      layui2("[name=\"mapping-macro-stop-key\"]").val(len4);
      break;
    }
  }
  layui2('#setting-mapping-macro-actions').html(layui.i18np.prop('STRID_SETTING_MACRO_TOTAL') + " " + macro_counts[macro_trigger_type_index] + " " + layui.i18np.prop("STRID_SETTING_MACRO_ACTIONGS"));
  layui3.render("select");
  layui3.render();
}
function ui_refresh_mapping_macro_edit(client) {
  if (client != undefined ? is_hs_keyboard(client.device) : false) {
    kbd_ui_macro_edit_init(client);
    return;
  }
  var layui2 = layui.$;
  var html = "<table>";
  html += '<tr>';
  for (let len = 0x0; len < edit_macros.length; len++) {
    var value = edit_macros[len];
    html += "<td style=\"padding-top: 3px;\">";
    html += "<a macro-edit-item-index=\"" + len + "\" macro-edit-item-action=\"select\" style=\"cursor: pointer;\">";
    if (is_dark_theme()) {
      html += "<div style=\"width: 110px;height: 60px;margin-left: 3px;background-color: #202020;\">";
    } else {
      html += "<div style=\"width: 110px;height: 60px;margin-left: 3px;background-color: gray;\">";
    }
    html += "<div class=\"layui-setting-title-container\" style=\"height: 50%;\">";
    if (value.mouse_key_event == 0x20a) {
      if (value.mouse_key_code > 0x0) {
        html += "<img src=\"" + RESOURCE_URL + "setting/mkey_up.png\" style=\"width: 20px;height: 22px; margin:4px;\"/>";
        html += "<p style=\"color: white;margin-top: 6px;\">" + layui.i18np.prop("STRID_KEY_WHELL_UP_S") + "<br>" + value.mouse_key_code + '</p>';
      } else {
        html += "<img src=\"" + RESOURCE_URL + "setting/mkey_down.png\" style=\"width: 20px;height: 22px; margin:4px;\"/>";
        html += "<p style=\"color: white;margin-top: 6px;\">" + layui.i18np.prop("STRID_KEY_WHELL_DOWN_S") + '<br>' + Math.abs(value.mouse_key_code) + "</p>";
      }
    } else {
      if (value.mouse_key_event == 0x20e) {
        if (value.mouse_key_code < 0x0) {
          html += "<img src=\"" + RESOURCE_URL + "setting/mkey_up.png\" style=\"width: 20px;height: 22px; margin:4px;\"/>";
          html += "<p style=\"color: white;margin-top: 6px;\">" + layui.i18np.prop("STRID_KEY_WHELL_LEFT_S") + "<br>" + Math.abs(value.mouse_key_code) + "</p>";
        } else {
          html += "<img src=\"" + RESOURCE_URL + "setting/mkey_down.png\" style=\"width: 20px;height: 22px; margin:4px;\"/>";
          html += "<p style=\"color: white;margin-top: 6px;\">" + layui.i18np.prop("STRID_KEY_WHELL_RIGHT_S") + "<br>" + value.mouse_key_code + "</p>";
        }
      } else {
        if (value.mouse_key_event == 0x200) {
          html += "<img src=\"" + RESOURCE_URL + "setting/mkey_move.png\" style=\"width: 20px;height: 22px; margin:4px;\"/>";
          var value2 = value.mouse_key_code >> 0x10 & 0xffff;
          var value3 = value.mouse_key_code & 0xffff;
          html += "<p style=\"color: white;margin-top: 6px;\">" + layui.i18np.prop("STRID_KEY_MOUSE_MOVE_S") + '<br>' + (value2 - 0x7ff) / 0xa + ':' + (value3 - 0x7ff) / 0xa + "</p>";
        } else {
          if (value.mouse_key_event == 0x2ff) {
            html += "<img src=\"" + RESOURCE_URL + "setting/mkey_position.png\" style=\"width: 20px;height: 22px; margin:4px;\"/>";
            var screenW = window.screen.width;
            var screenH = window.screen.height;
            var value4 = value.mouse_key_code >> 0x10 & 0xffff;
            var value5 = value.mouse_key_code & 0xffff;
            value4 = parseInt(value4 * screenW / 0xffff);
            value5 = parseInt(value5 * screenH / 0xffff);
            html += "<p style=\"color: white;margin-top: 6px;\">" + layui.i18np.prop("STRID_KEY_MOUSE_POSITION_S") + "<br>" + value4 + ':' + value5 + "</p>";
          } else if (value.mouse_key_code == 0x0) {
            html += "<p style=\"color: white;margin-left:4px;\">" + get_key_name_from_code(value.mouse_key_code) + '</p>';
          } else if (value.mouse_key_event == 0x101) {
            if (value.mouse_key_code >= 0xff && value.mouse_key_code < 0x200) {
              html += "<img src=\"" + RESOURCE_URL + "setting/mkey_up.png\" style=\"width: 20px;height: 22px; margin:4px;\"/>";
            } else {
              html += "<img src=\"" + RESOURCE_URL + "setting/key_up.png\" style=\"width: 20px;height: 22px; margin:4px;\"/>";
            }
            html += "<p style=\"color: white;margin-top: 6px;\">" + get_key_name_from_code(value.mouse_key_code) + '</p>';
          } else {
            if (value.mouse_key_code >= 0xff && value.mouse_key_code < 0x200) {
              html += "<img src=\"" + RESOURCE_URL + "setting/mkey_down.png\" style=\"width: 20px;height: 22px; margin:4px;\"/>";
            } else {
              html += "<img src=\"" + RESOURCE_URL + "setting/key_down.png\" style=\"width: 20px;height: 22px; margin:4px;\"/>";
            }
            html += "<p style=\"color: white;margin-top: 6px;\">" + get_key_name_from_code(value.mouse_key_code) + "</p>";
          }
        }
      }
    }
    html += "</div>";
    html += "<div class=\"layui-setting-title-container\" style=\"height: 50%;\">";
    html += "<img src=\"" + RESOURCE_URL + "setting/key_waiting.png\" style=\"width: 18px;height: 20px; margin:4px;\"/>";
    if (value.mouse_key_event == 0x200 && value.mouse_key_loop > 0x1) {
      html += "<p style=\"color: white;\">" + value.mouse_key_time + 'x' + value.mouse_key_loop + " " + layui.i18np.prop("STRID_SETTING_MAPPING_MACRO_ACTION_KEEP_TIME_MS") + '</p>';
    } else {
      html += "<p style=\"color: white;\">" + value.mouse_key_time + " " + layui.i18np.prop("STRID_SETTING_MAPPING_MACRO_ACTION_KEEP_TIME_MS") + '</p>';
    }
    html += "</div>";
    html += '</div>';
    html += "</a>";
    html += "</td>";
    if ((len + 0x1) % 0x5 == 0x0) {
      html += "</tr><tr>";
    }
  }
  ;
  html += "</tr>";
  html += "</table>";
  layui2("#mapping-macro-edit-container").html(html);
}
function ui_refresh_mapping_macro_add(client) {
  var layui2 = layui.$;
  var layui3 = layui.form;
  var layui4 = layui.slider;
  var html = "<select name=\"macro-add-select-key\" lay-verify=\"required\" lay-filter=\"macro-add-select-key\">";
  for (let len = 0x0; len < macro_keys.length; len++) {
    html += "<option value=\"" + len + "\">" + macro_keys[len].name + "</option>";
  }
  html += '</select>';
  layui2('#mapping-macro-add-select-key').html(html);
  layui2("[name=\"macro-add-select-key\"]").val(0x0);
  var value = Math.floor(macro_keep_time_min / MACRO_KEEP_TIME_STEP) * MACRO_KEEP_TIME_STEP;
  var value2 = value + MACRO_KEEP_TIME_STEP;
  if (value2 > MACRO_KEEP_TIME_MAX_MS) {
    value2 = MACRO_KEEP_TIME_MAX_MS;
    value = value2 - MACRO_KEEP_TIME_STEP;
  }
  var value3 = layui4.render({
    'elem': '#slider-mapping-macro-keep-time-input',
    'min': value,
    'max': value2,
    'step': 0x1,
    'value': current_edit_macro.mouse_key_time,
    'input': true,
    'tips': false,
    'theme': theme_color,
    'done': function (result) {
      if (result != undefined) {
        current_edit_macro.mouse_key_time = result;
      }
    }
  });
  layui2("#slider-mapping-macro-keep-time-input input").on("input", function (result) {
    if (result.delegateTarget.value > MACRO_KEEP_TIME_MAX_MS) {
      result.delegateTarget.value = MACRO_KEEP_TIME_MAX_MS;
    }
    var value4 = Math.floor(result.delegateTarget.value / MACRO_KEEP_TIME_STEP) * MACRO_KEEP_TIME_STEP;
    var value5 = value4 + MACRO_KEEP_TIME_STEP;
    if (value5 > MACRO_KEEP_TIME_MAX_MS) {
      value5 = MACRO_KEEP_TIME_MAX_MS;
      value4 = value5 - MACRO_KEEP_TIME_STEP;
    }
    value3.config.min = value4;
    value3.config.max = value5;
    value3.setValue(result.delegateTarget.value);
  });
  if (current_edit_macro.mouse_key_event == 0x20a) {
    for (let index = 0x0; index < macro_keys.length; index++) {
      if (macro_keys[index].vCode == 0x400 && current_edit_macro.mouse_key_code >= 0x0 || macro_keys[index].vCode == 0x401 && current_edit_macro.mouse_key_code < 0x0) {
        layui2("[name=\"macro-add-select-key\"]").val(index);
        break;
      }
    }
  } else {
    if (current_edit_macro.mouse_key_event == 0x20e) {
      for (let offset = 0x0; offset < macro_keys.length; offset++) {
        if (macro_keys[offset].vCode == 0x402 && current_edit_macro.mouse_key_code < 0x0 || macro_keys[offset].vCode == 0x403 && current_edit_macro.mouse_key_code >= 0x0) {
          layui2("[name=\"macro-add-select-key\"]").val(offset);
          break;
        }
      }
    } else {
      if (current_edit_macro.mouse_key_event == 0x200) {
        for (let count = 0x0; count < macro_keys.length; count++) {
          if (macro_keys[count].vCode == 0x404) {
            layui2("[name=\"macro-add-select-key\"]").val(count);
            break;
          }
        }
      } else {
        if (current_edit_macro.mouse_key_event == 0x2ff) {
          for (let len2 = 0x0; len2 < macro_keys.length; len2++) {
            if (macro_keys[len2].vCode == 0x405) {
              layui2("[name=\"macro-add-select-key\"]").val(len2);
              break;
            }
          }
        } else {
          for (let len3 = 0x0; len3 < macro_keys.length; len3++) {
            if (macro_keys[len3].vCode == current_edit_macro.mouse_key_code) {
              layui2("[name=\"macro-add-select-key\"]").val(len3);
              document.getElementById("kbd-macro-add-select-key").textContent = macro_keys[len3].name;
              break;
            }
          }
        }
      }
    }
  }
  if (client != undefined ? is_hs_keyboard(client.device) : false) {
    layui2('#mapping-macro-add-select-key').css("display", "none");
    layui2("#kbd-macro-add-select-key").css('display', '');
  } else {
    layui2("#mapping-macro-add-select-key").css('display', '');
    layui2("#kbd-macro-add-select-key").css("display", "none");
  }
  if (current_edit_macro.mouse_key_event == 0x20a || current_edit_macro.mouse_key_event == 0x20e) {
    layui2("#macro-add-select-key-container").css("display", "none");
    layui2('#macro-add-wheel-delta-container').css("display", '');
    layui2("#macro-add-move-delta-container").css("display", 'none');
    layui2('#macro-add-position-container').css("display", "none");
    layui2("#macro-add-wheel-delta-input").val(Math.abs(current_edit_macro.mouse_key_code));
  } else {
    if (current_edit_macro.mouse_key_event == 0x200) {
      layui2("#macro-add-select-key-container").css("display", "none");
      layui2('#macro-add-wheel-delta-container').css("display", 'none');
      layui2("#macro-add-move-delta-container").css("display", '');
      layui2("#macro-add-position-container").css("display", "none");
      var value6 = current_edit_macro.mouse_key_code >> 0x10 & 0xffff;
      var value7 = current_edit_macro.mouse_key_code & 0xffff;
      layui2("#macro-add-move-delta-x-input").val((value6 - 0x7ff) / 0xa);
      layui2("#macro-add-move-delta-y-input").val((value7 - 0x7ff) / 0xa);
      layui2('#macro-add-move-loop-input').val(current_edit_macro.mouse_key_loop);
    } else {
      if (current_edit_macro.mouse_key_event == 0x2ff) {
        layui2("#macro-add-select-key-container").css("display", "none");
        layui2("#macro-add-wheel-delta-container").css("display", "none");
        layui2("#macro-add-move-delta-container").css("display", "none");
        layui2("#macro-add-position-container").css('display', '');
        var screenW = window.screen.width;
        var screenH = window.screen.height;
        var value8 = current_edit_macro.mouse_key_code >> 0x10 & 0xffff;
        var value9 = current_edit_macro.mouse_key_code & 0xffff;
        value8 = parseInt(value8 * screenW / 0xffff);
        value9 = parseInt(value9 * screenH / 0xffff);
        layui2("#macro-add-position-x-input").val(value8);
        layui2("#macro-add-position-y-input").val(value9);
      } else {
        if (current_edit_macro.mouse_key_code == 0x0) {
          layui2("#macro-add-select-key-container").css("display", "none");
          layui2("#macro-add-wheel-delta-container").css("display", 'none');
          layui2("#macro-add-move-delta-container").css("display", "none");
          layui2('#macro-add-position-container').css("display", "none");
        } else {
          layui2("#macro-add-select-key-container").css('display', '');
          layui2("#macro-add-wheel-delta-container").css("display", "none");
          layui2('#macro-add-move-delta-container').css("display", "none");
          layui2("#macro-add-position-container").css("display", "none");
          if (current_edit_macro.mouse_key_event == 0x101) {
            layui2("[name=\"mapping-macro-action-key-event\"]")[0x1].checked = true;
          } else if (current_edit_macro.mouse_key_event == 0x100) {
            layui2("[name=\"mapping-macro-action-key-event\"]")[0x0].checked = true;
          } else {
            layui2("[name=\"mapping-macro-action-key-event\"]")[0x0].checked = false;
            layui2("[name=\"mapping-macro-action-key-event\"]")[0x1].checked = false;
          }
        }
      }
    }
  }
  layui3.render("radio");
  layui3.render("select");
}
function ui_refresh_tab_mapping_function(client) {
  var layui2 = layui.$;
  var layui3 = layui.form;
  var keyInfo = get_select_key_info();
  if (Object.keys(keyInfo).length == 0x0) {
    return;
  }
  var html = "<select name=\"mapping-function\" lay-verify=\"required\" lay-filter=\"mapping-function\">";
  for (let len = 0x0; len < mouse_function_descs.length; len++) {
    if (mouse_functions[len] == 0xf && !is_bt_supported(client)) {
      html += "<option value=\"" + len + "\" disabled>" + mouse_function_descs[len] + '</option>';
    } else {
      html += "<option value=\"" + len + "\">" + mouse_function_descs[len] + "</option>";
    }
  }
  html += "</select>";
  layui2("#mapping-function-select").html(html);
  var offset = 0x0;
  for (let index = 0x0; index < mouse_functions.length; index++) {
    if (keyInfo.mouse_mapping_function == mouse_functions[index]) {
      offset = index;
      break;
    }
  }
  layui2("[name=\"mapping-function\"]").val(offset);
  layui3.render("select");
  if (keyInfo.mouse_mapping_function == 0x9) {
    layui2("#mapping-function-dpi-container").css('display', '');
    var cpiRange = get_cpi_range(client);
    var value = get_cpi_step(client);
    var layui4 = layui.slider;
    layui4.render({
      'elem': "#slider-function-dpi-input",
      'min': cpiRange[0x0],
      'max': cpiRange[0x1],
      'step': value,
      'value': keyInfo.mouse_mapping_function_data,
      'input': true,
      'tips': false,
      'theme': theme_color,
      'done': function (result) {
        if (result != undefined) {
          keyInfo.mouse_mapping_function_data = result;
        }
      }
    });
  } else {
    layui2("#mapping-function-dpi-container").css("display", "none");
  }
  if (keyInfo.mouse_mapping_function == 0xd) {
    layui2("#mapping-function-toggle-esb-container").css("display", '');
  } else {
    layui2("#mapping-function-toggle-esb-container").css("display", 'none');
  }
  var value2 = client.product_esb_ch == 0xff ? client.device_info.esbChannel : client.product_esb_ch;
  var value3 = 0x1;
  html = "<table class=\"layui-table\">";
  client.device_info.esbAddressArr.forEach(item => {
    var i;
    var idx;
    i = item.substr(16, 2);
    if (value2 == 0x0) {
      idx = item.substr(0x0, 8);
    } else {
      idx = item.substr(8, 8);
    }
    item = i + idx;
    if (item != '0000000000') {
      html += "<tr>";
      html += '<td>';
      html += value3++;
      html += '</td>';
      html += "<td style=\"width: 100%;\">";
      html += item;
      html += '</td>';
      html += "</tr>";
    }
  });
  html += "</table>";
  layui2("#paired-esb-addr-list").html(html);
  if (keyInfo.mouse_mapping_function == 0xf) {
    layui2("#mapping-function-toggle-ble-container").css("display", '');
  } else {
    layui2("#mapping-function-toggle-ble-container").css("display", "none");
  }
  html = "<table class=\"layui-table\">";
  client.device_info.peerInfo.forEach(item2 => {
    html += '<tr>';
    html += '<td>';
    html += item2.id;
    html += "</td>";
    html += "<td style=\"width: 100%;\">";
    html += item2.address;
    html += "</td>";
    html += "</tr>";
  });
  html += "</table>";
  layui2("#paired-ble-addr-list").html(html);
  if (keyInfo.mouse_mapping_function == 0xe) {
    layui2("#mapping-function-show-power-container").css('display', '');
  } else {
    layui2('#mapping-function-show-power-container').css('display', "none");
  }
  if (keyInfo.mouse_mapping_function == 0x10) {
    layui2("#mapping-function-shell-cmd-container").css('display', '');
    document.getElementById("function-shell-cmd-app-browse").src = RESOURCE_URL + "setting/folder.png";
    if (is_valid_url(keyInfo.mouse_mapping_function_text)) {
      layui2("[name=\"function-shell-cmd\"]")[0x1].checked = true;
      layui2("#function-shell-cmd-app-browse").css('display', "none");
      layui2('#function-shell-cmd-app-browse').prop("disabled", true);
      layui2("[name=\"function-shell-cmd-app\"]").prop("disabled", true);
      layui2("[name=\"function-shell-cmd-web\"]").prop("disabled", false);
      layui2("[name=\"function-shell-cmd-app\"]").val('');
      layui2("[name=\"function-shell-cmd-web\"]").val(keyInfo.mouse_mapping_function_text);
      layui2("#function-shell-cmd-app-container").css("display", "none");
      layui2("#function-shell-cmd-web-container").css('display', '');
    } else {
      layui2("[name=\"function-shell-cmd\"]")[0x0].checked = true;
      layui2("#function-shell-cmd-app-browse").css("display", "none");
      layui2("#function-shell-cmd-app-browse").prop('disabled', false);
      layui2("[name=\"function-shell-cmd-app\"]").prop("disabled", false);
      layui2("[name=\"function-shell-cmd-web\"]").prop("disabled", true);
      layui2("[name=\"function-shell-cmd-app\"]").val(keyInfo.mouse_mapping_function_text);
      layui2("[name=\"function-shell-cmd-web\"]").val('');
      layui2("#function-shell-cmd-app-container").css('display', '');
      layui2("#function-shell-cmd-web-container").css("display", "none");
    }
    layui3.render("radio");
  } else {
    layui2('#mapping-function-shell-cmd-container').css("display", "none");
  }
}
function select_mouse_key(keyCode, len) {
  if (len.length == 0x0) {
    select_key_name = '';
    ui_refresh_mapping_key(keyCode);
    select_mapping_type(keyCode, 0x3);
    return;
  }
  ui_refresh_mapping_key(keyCode);
  var flag = false;
  for (let index = 0x0; index < onboard_keys.length; index++) {
    var value = onboard_keys[index];
    if (len == value.name) {
      if (value.configType == 0x0) {
        if (value.touch_style == 0x1b) {
          flag = true;
          select_mapping_type(keyCode, 0x0);
        } else if (value.touch_style == 0x1d) {
          flag = true;
          select_mapping_type(keyCode, 0x2);
        }
      } else if (value.configType == 0x5) {
        flag = true;
        select_mapping_type(keyCode, 0x1);
      }
      break;
    }
  }
  if (!flag) {
    select_mapping_type(keyCode, 0x3);
  }
}
function select_mapping_type(client, mappingType) {
  var keyInfo = get_select_key_info();
  if (Object.keys(keyInfo).length == 0x0) {
    mappingType = 0x3;
  }
  macro_trigger_type_index = 0x0;
  layui.element.tabChange("mapping-key-type", mappingType);
  update_mapping(client, mappingType);
}
function update_mapping(client, mappingData) {
  $('#mapping-key-container').css("display", "none");
  $("#mapping-macro-container").css("display", "none");
  $('#mapping-function-container').css("display", "none");
  var keyInfo = get_select_key_info();
  if (Object.keys(keyInfo).length == 0x0) {
    return;
  }
  if (mappingData == 0x0) {
    $('#mapping-key-container').css("display", '');
    ui_refresh_tab_mapping_key(client);
  } else {
    if (mappingData == 0x1) {
      for (let len = 0x0; len <= 0x6; len++) {
        var flag = false;
        for (let index = 0x0; index < onboard_keys.length; index++) {
          if (onboard_keys[index].name == keyInfo.name && onboard_keys[index].macro_style == len) {
            flag = true;
            break;
          }
        }
        if (!flag) {
          var item = create_key_info();
          item.name = keyInfo.name;
          item.label = keyInfo.label;
          item.configType = 0x5;
          item.macro_style = len;
          onboard_keys.push(item);
          keyInfo = get_select_key_info();
        }
      }
      $("#mapping-macro-container").css("display", '');
      ui_refresh_tab_mapping_macro(client);
    } else if (mappingData == 0x2) {
      $("#mapping-function-container").css("display", '');
      ui_refresh_tab_mapping_function(client);
    }
  }
}
function set_mapping_keys(client) {
  var keyInfo = get_select_key_info();
  if (Object.keys(keyInfo).length == 0x0) {
    return;
  }
  var modifiersList = modifiers;
  var value = modifiersList[$("[name=\"mapping-ctrl-key1\"]").val()].vCode;
  var value2 = modifiersList[$("[name=\"mapping-ctrl-key2\"]").val()].vCode;
  var keysList = keys;
  var value3 = keysList[$("[name=\"mapping-key\"]").val()].vCode;
  keyInfo.mouse_mapping_keys = '[' + value + ',' + value2 + ',' + value3 + ']';
  ui_refresh_mapping_key(client);
  ui_refresh_combination_key(client);
  need_save = true;
  ui_refresh_onboard_config(client);
}
function get_select_key_info() {
  if (select_key_name.length == 0x0) {
    return {};
  }
  for (let len = 0x0; len < onboard_keys.length; len++) {
    if (select_key_name == onboard_keys[len].name) {
      if (onboard_keys[len].configType == 0x5) {
        if (macro_trigger_type_index >= 0x0) {
          if (onboard_keys[len].macro_style == macro_trigger_type_index) {
            return onboard_keys[len];
          }
        } else {
          return onboard_keys[len];
        }
      } else {
        return onboard_keys[len];
      }
    }
  }
  var keyInfo = create_key_info();
  keyInfo.name = select_key_name;
  var html = '';
  var arr = select_key_name.split('+');
  arr.forEach(item => {
    if (item == KEY_WHEEL_UP) {
      if (html.length > 0x0) {
        html += '+';
      }
      html += 'â–²';
    } else {
      if (item == KEY_WHEEL_DOWN) {
        if (html.length > 0x0) {
          html += '+';
        }
        html += 'â–¼';
      } else {
        for (let index = 0x0; index < mouse_keys.length; index++) {
          if (item == mouse_keys[index].name) {
            if (html.length > 0x0) {
              html += '+';
            }
            html += mouse_keys[index].label;
            break;
          }
        }
      }
    }
  });
  keyInfo.label = html;
  keyInfo.configType = -0x1;
  onboard_keys.push(keyInfo);
  return keyInfo;
}
function shell_cmd_app_browse_file() {
  var keyInfo = get_select_key_info();
  if (Object.keys(keyInfo).length == 0x0) {
    return;
  }
  keyInfo.mouse_mapping_function_text = $("#shell-cmd-app-browse_file").val();
  $("[name=\"function-shell-cmd-app\"]").val(keyInfo.mouse_mapping_function_text);
}
function get_key_name_from_label(label) {
  for (let len = 0x0; len < mouse_keys.length; len++) {
    if (label == mouse_keys[len].label) {
      return mouse_keys[len].name;
    }
  }
  return '';
}
function get_key_label_from_id(keyId) {
  for (let len = 0x0; len < mouse_keys.length; len++) {
    if (keyId == mouse_keys[len].id[0x0]) {
      return mouse_keys[len].label;
    }
  }
  return layui.i18np.prop("STRID_NONE");
}
function get_key_id_from_name(name) {
  for (let len = 0x0; len < mouse_keys.length; len++) {
    if (name == mouse_keys[len].name) {
      return mouse_keys[len].id[0x0];
    }
  }
  return 0x0;
}
function is_valid_url(url) {
  var urlRe = /^(https?:\/\/)?([\w.]+)\.([a-z]{2,6}\.?)(\/[\w.]*)*\/?$/i;
  return !!urlRe.test(url);
}
// Periodic keep‑alive & health‑check loop (called from hub.html setInterval)
function start() {
  console.log("[DEBUG] start() called", "wireless_optimizing=", wireless_optimizing, "window_focused=", window_focused, "client_count=", usb_client_list?.length);
  if (!wireless_optimizing && window_focused) {
    usb_client_list.forEach(client => {
      if (is_receiver(client) && client.helloed) {
        console.log("[DEBUG] start() -> send_event_action 0x42 for receiver", client?.id);
        send_event_action(client, 0x42, 0x0);
      }
      if (client.virtual) {
        if (client.connected) {
          if (new Date().getTime() - client.esb_last_alive_time > client.esb_alive_timeout) {
            client.helloed = false;
            client.connected = false;
            client.send_event_buf = new Uint8Array(0x0);
            client.recv_buf = new Uint8Array(0x0);
            client.device_name = '';
            client.device_info = reset_device_info(client.device_info);
            client.syncing = false;
            usb_client_list.forEach(item => {
              if (is_receiver(item) && item.device == client.device) {
                if (item.helloed) {
                  send_event_query(client);
                }
              }
            });
            window.postMessage({
              'action': ACTION_REFRESH_CURRENT_CLIENT
            });
            layui.layer.closeAll();
          } else if (true && client.syncing) {
            if (client.eplapsed_syncing_ms != 0x0 && new Date().getTime() - client.eplapsed_syncing_ms > 0x3e8) {
              log_r(">>>>>>>>sync success");
              client.syncing = false;
              client.recv_buf = new Uint8Array(0x0);
            }
            client.esb_last_alive_time = new Date().getTime();
          } else if (client.querying_more_result) {
            client.esb_last_alive_time = new Date().getTime();
          } else {
            send_event_ping(client, false);
          }
        }
      } else if (client.connected) {
        if (client.querying_more_result) {
          client.esb_last_alive_time = new Date().getTime();
        } else {
          send_event_ping(client, false);
        }
      }
    });
  }
}
function adjustTable() {
  var el = document.getElementById('settings');
  if (el.rows.length == 0x1) {
    if (window.innerWidth < 0x6f4) {
      var item = document.createElement('table');
      var el2 = document.createElement("tbody");
      var firstRow = el.rows[0x0];
      var value = el2.insertRow();
      var value2 = value.insertCell();
      value2.innerHTML = firstRow.cells[0x0].innerHTML;
      value2.colSpan = 0x2;
      value2.style = "padding-bottom: 10px;";
      value = el2.insertRow();
      value2 = value.insertCell();
      value2.innerHTML = firstRow.cells[0x1].innerHTML;
      value2.style = "vertical-align: top;padding-right: 30px; width: 50%;";
      value2 = value.insertCell();
      value2.innerHTML = firstRow.cells[0x2].innerHTML;
      value2.style = "vertical-align: top;padding-right: 30px;";
      item.appendChild(el2);
      item.style.width = "100%";
      item.id = el.id;
      el.parentNode.replaceChild(item, el);
      if (current_usb_client != undefined) {
        setting_mapping_init(current_usb_client);
        ui_refresh_mapping_key(current_usb_client);
      }
      window.postMessage({
        'action': ACTION_UI_REFRESH_SETTING
      });
      setTimeout(function () {
        let el3 = document.getElementById('setting-key-delay-section');
        let el4 = document.getElementById("setting-lod-section");
        el4.style.height = el3.offsetTop + el3.offsetHeight - el4.offsetTop - 0x14 + 'px';
      }, 0xfa);
    }
  } else {
    if (window.innerWidth >= 0x6f4) {
      var item = document.createElement("table");
      var el2 = document.createElement("tbody");
      var value = el2.insertRow();
      var value2 = value.insertCell();
      value2.innerHTML = el.rows[0x0].cells[0x0].innerHTML;
      value2.style = "vertical-align: top;height: 1px;";
      value2 = value.insertCell();
      value2.innerHTML = el.rows[0x1].cells[0x0].innerHTML;
      value2.style = "width: 35%;min-width: 340px;vertical-align: top;padding-right: 30px;";
      value2 = value.insertCell();
      value2.innerHTML = el.rows[0x1].cells[0x1].innerHTML;
      value2.style = "width: 35%;min-width: 300px;vertical-align: top;padding-right: 30px;";
      item.appendChild(el2);
      item.id = el.id;
      el.parentNode.replaceChild(item, el);
      if (current_usb_client != undefined) {
        setting_mapping_init(current_usb_client);
        ui_refresh_mapping_key(current_usb_client);
      }
      window.postMessage({
        'action': ACTION_UI_REFRESH_SETTING
      });
      setTimeout(function () {
        let el5 = document.getElementById("setting-key-delay-section");
        let el6 = document.getElementById("setting-lod-section");
        el6.style.height = el5.offsetTop + el5.offsetHeight - el6.offsetTop - 0x14 + 'px';
      }, 0xfa);
    }
  }
}


// ===== 12-utilities.js ====================================================
function setting_mapping_macro_recording_remove_last() {
  if (edit_macros.length > 0x0) {
    var value = edit_macros[edit_macros.length - 0x1];
    if (value.mouse_key_code == 256 && value.mouse_key_event == 0x100) {
      edit_macros = edit_macros.slice(0x0, edit_macros.length - 0x1);
      if (edit_macros.length > 0x0) {
        edit_macros[edit_macros.length - 0x1].mouse_key_time = 0x1;
      }
    }
  }
}

// ===== UTILITY FUNCTIONS ====================================================
// Colour-space conversions used for the RGB light settings and the LED
// colour picker UI:
//   rgbToHsv(r, g, b) → { h, s, v }   (0–255 ranges)
//   hsvToRgb(h, s, v) → { r, g, b }
//   rgbToHex(r, g, b) → "#RRGGBB"
//
// show_waiting() / hide_waiting() toggle a wait overlay during long
// firmware data transfers.
//
// ui_select_key_init() and dialog_select_key_init() render the visual
// keyboard layout (positioned key buttons) used in the key‑picker dialogs.
// ============================================================================
function rgbToHsv(r, g, b) {
  let value = r / 0xff;
  let value2 = g / 0xff;
  let value3 = b / 0xff;
  let hsvH;
  let hsvS;
  let hsvV;
  let value4 = Math.max(value, value2, value3);
  let value5 = Math.min(value, value2, value3);
  let value6 = value4 - value5;
  if (value6 > 0x0) {
    if (value4 == value) {
      hsvH = 60 * ((value2 - value3) / value6 / 0x6);
    } else {
      if (value4 == value2) {
        hsvH = 60 * ((value3 - value) / value6 + 0x2);
      } else if (value4 == value3) {
        hsvH = 60 * ((value - value2) / value6 + 0x4);
      }
    }
    if (value4 > 0x0) {
      hsvS = value6 / value4;
    } else {
      hsvS = 0x0;
    }
    hsvV = value4;
  } else {
    hsvH = 0x0;
    hsvS = 0x0;
    hsvV = value4;
  }
  if (hsvH < 0x0) {
    hsvH = 360 + hsvH;
  }
  return {
    'h': Math.floor(hsvH * 0xff / 360),
    's': Math.floor(0xff * hsvS),
    'v': Math.floor(0xff * hsvV)
  };
}
function hsvToRgb(r, g, b) {
  let value = r * 360 / 0xff;
  let value2 = g / 0xff;
  let value3 = b / 0xff;
  let rgbR;
  let rgbG;
  let rgbB;
  let value4 = value3 * value2;
  let value5 = value / 60 / 0x6;
  let value6 = value4 * (0x1 - Math.abs(value5 / 0x2 - 0x1));
  let value7 = value3 - value4;
  if (0x0 <= value5 && value5 < 0x1) {
    rgbR = value4;
    rgbG = value6;
    rgbB = 0x0;
  } else {
    if (0x1 <= value5 && value5 < 0x2) {
      rgbR = value6;
      rgbG = value4;
      rgbB = 0x0;
    } else {
      if (0x2 <= value5 && value5 < 0x3) {
        rgbR = 0x0;
        rgbG = value4;
        rgbB = value6;
      } else {
        if (0x3 <= value5 && value5 < 0x4) {
          rgbR = 0x0;
          rgbG = value6;
          rgbB = value4;
        } else {
          if (0x4 <= value5 && value5 < 0x5) {
            rgbR = value6;
            rgbG = 0x0;
            rgbB = value4;
          } else if (0x5 <= value5 && value5 < 0x6) {
            rgbR = value4;
            rgbG = 0x0;
            rgbB = value6;
          } else {
            rgbR = 0x0;
            rgbG = 0x0;
            rgbB = 0x0;
          }
        }
      }
    }
  }
  rgbR += value7;
  rgbG += value7;
  rgbB += value7;
  return {
    'r': Math.floor(rgbR * 0xff),
    'g': Math.floor(rgbG * 0xff),
    'b': Math.floor(rgbB * 0xff)
  };
}
function rgbToHex(r, g, b) {
  var hash = '#';
  var len = r.toString(0x10);
  if (len.length == 0x1) {
    hash = hash + '0';
  }
  hash = hash + len;
  len = g.toString(0x10);
  if (len.length == 0x1) {
    hash = hash + '0';
  }
  hash = hash + len;
  len = b.toString(0x10);
  if (len.length == 0x1) {
    hash = hash + '0';
  }
  hash = hash + len;
  return hash;
}
function show_waiting() {
  $("#kbd-key-waiting-panel").css("display", '');
}
function hide_waiting() {
  $("#kbd-key-waiting-panel").css('display', "none");
}


// ===== 13-event-dispatch.js ====================================================
// ===== EVENT DISPATCH & APPLICATION LIFECYCLE ===============================
// Two dispatch paths:
//   1. DeviceStore events (primary) — for code paths that use the reactive store
//   2. postMessage events (legacy) — for code paths still using the old dispatch
//
// DeviceStore events:
//   'client:added'       → ui_refresh_client_list()
//   'current:changed'    → ui_refresh_current_client()
//   'device:updated'     → ui_refresh_setting(DeviceStore.current)
//
// postMessage actions:
//   Same actions as before, mapped through a flat switch.
//   Will be replaced by store events as each caller migrates.
// ============================================================================

// ===== DEVICESTORE EVENT HANDLERS ===========================================
DeviceStore.on('client:added', () => {
  ui_refresh_client_list();
});
DeviceStore.on('client:removed', () => {
  ui_refresh_client_list();
});
DeviceStore.on('current:changed', () => {
  need_save = false;
  ui_refresh_client_list();
  ui_refresh_current_client();
});

// ===== LEGACY postMessage DISPATCH ==========================================
window.addEventListener('message', event => {
  switch (event.data.action) {
    case ACTION_REFRESH_CLIENT_LIST:
      refresh_client_list();
      break;
    case ACTION_REFRESH_CURRENT_CLIENT:
      refresh_current_client();
      break;
    case ACTION_SEND_CLIENT_DATA:
      {
        var client = DeviceStore.getClient(event.data.usb_client_id);
        if (client) send_client_data(client);
        break;
      }
    case ACTION_UI_REFRESH_CLIENT_LIST:
      ui_refresh_client_list();
      break;
    case ACTION_UI_REFRESH_CURRENT_CLIENT:
      need_save = false;
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
        var client = DeviceStore.getClient(event.data.usb_client_id);
        if (!client) break;
        var loadingEl = document.getElementById("onboard-config-loading");
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

// ===== APPLICATION LIFECYCLE ================================================
document.addEventListener("DOMContentLoaded", async () => {
  if (device_cfg.length > 0x0 && navigator.hid != undefined) {
    refresh_client_list();
  }
});

function do_resize() {
  $("#current-usb-client-panel").css("margin-top", (window.innerHeight - 0x6e - 0x1e2 - 0x64) / 0x2);
  let el = document.getElementById("setting-key-delay-section");
  let el2 = document.getElementById("setting-lod-section");
  el2.style.height = el.offsetTop + el.offsetHeight - el2.offsetTop - 0x14 + 'px';
  let offsetLeft = ($('#pair-more-panel')[0x0].offsetLeft - $('#usb-client-channel')[0x0].offsetWidth / 0x2) * 0x64 / window.innerWidth;
  if (offsetLeft > 0x32) {
    offsetLeft = 0x32;
  }
  $('#usb-client-channel')[0x0].style.left = offsetLeft + '%';
  adjustTable();
}

window.addEventListener("resize", event => {
  clearTimeout(resize_timer_id);
  resize_timer_id = setTimeout(do_resize, RESIZE_DEBOUNCE_MS);
});

window.onscroll = function () {
  var el = document.getElementById("pair-more-panel");
  var el2 = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
  if (el2 > 0xfa) {
    el.style.opacity = 0x0;
  } else if (el2 > 0x0) {
    el.style.opacity = (0xfa - el2) / 0xfa;
  } else {
    el.style.opacity = 0x1;
  }
};

if (navigator.hid != undefined) {
  navigator.hid.addEventListener("connect", event => {
    refresh_client_list();
  });
  navigator.hid.addEventListener("disconnect", event => {
    refresh_client_list();
  });
}

// ===== WINDOW FOCUS / BLUR =================================================
function onBlur() {
  window_focused = false;
}

function onFocus() {
  DeviceStore.clients.forEach(item => {
    if (!is_receiver(item)) {
      if (item.helloed) {
        item.esb_last_alive_time = new Date().getTime();
      }
    }
  });
  window_focused = true;
}

window.addEventListener("blur", onBlur);
window.addEventListener("focus", onFocus);

// ===== LEGACY UTILITY FUNCTIONS =============================================
function setting_mapping_key_recording_add(client) {
  if (client == 0x10 || client == 0x11 || client == 0x12 || client == 0x5b) {
    if (setting_mapping_keys_recorded[0x2] < 0x0) {
      if (setting_mapping_keys_recorded[0x0] < 0x0) {
        setting_mapping_keys_recorded[0x0] = client;
      } else if (setting_mapping_keys_recorded[0x1] < 0x0 && setting_mapping_keys_recorded[0x0] != client) {
        setting_mapping_keys_recorded[0x1] = client;
      }
    }
  } else if (client != 0x0) {
    if (setting_mapping_keys_recorded[0x2] < 0x0) {
      setting_mapping_keys_recorded[0x2] = client;
    }
  }
  refresh_recorded_mapping_keys();
}

function setting_mapping_macro_recording_add(client, macroData, timeoutId) {
  var macroInfo = create_macro_info();
  macroInfo.style = 0x16;
  macroInfo.mouse_key_code = client;
  macroInfo.mouse_key_event = macroData;
  macroInfo.mouse_key_time = 0x1;
  macroInfo.continue_time = 0x0;
  macroInfo.interval_time = 0x0;
  if (setting_macro_edit_recording_time != -0x1) {
    edit_macros[edit_macros.length - 0x1].mouse_key_time = $("[name=\"macro-record-fixed-time\"]")[0x0].checked ? 0x32 : timeoutId - setting_macro_edit_recording_time;
  }
  setting_macro_edit_recording_time = timeoutId;
  macroInfo.name = get_key_name_from_code(macroInfo.mouse_key_code);
  edit_macros.push(macroInfo);
  if (client != 256 || macroData != 0x100) {
    ui_refresh_mapping_macro_edit(current_usb_client);
  }
}


// ===== 14-ui-keyboard.js ====================================================
function ui_select_key_init() {
  var len = kbd_select_keys;
  var html = '<div class="layui-row" style="margin-top: 10px;">';
  for (var index = 0; index < len.length; index++) {
    var key = len[index];
    html += KeyGridCell({ prefix: 'kbd-select-key', index: index, x: key.rect[0], y: key.rect[1], width: key.rect[2], height: key.rect[3], label: key.name });
    html += RowBreak(index);
  }
  html += '</div>';
  $('#select-key-container').html(html);
  var len2 = mouse_select_keys;
  html = '<div class="layui-row" style="margin-top: 10px;">';
  for (var offset = 0; offset < len2.length; offset++) {
    var key = len2[offset];
    html += KeyGridCell({ prefix: 'mouse-select-key', index: offset, x: key.rect[0], y: key.rect[1], width: key.rect[2], height: key.rect[3], label: key.name, showHoverBg: false, textStyle: 'font-size: small;margin-top: 8px;' });
  }
  html += '</div>';
  $('#mouse-select-key-container').html(html);
}
function dialog_select_key_init(client) {
  var len = kbd_select_keys;
  var html = '<div class="layui-row" style="margin-top: 10px;">';
  for (var index = 0; index < len.length; index++) {
    var key = len[index];
    html += KeyGridCell({ prefix: 'kbd-select-key', action: 'select', actionAttr: 'dialog-select-key-action', index: index, x: key.rect[0], y: key.rect[1], width: key.rect[2], height: key.rect[3], label: key.name, elementId: client });
    html += RowBreak(index);
  }
  html += '</div>';
  $('#dialog-select-key-container').html(html);
  var len2 = mouse_select_keys;
  html = '<div class="layui-row" style="margin-top: 10px;">';
  for (var offset = 0; offset < len2.length; offset++) {
    if (client == 'kbd-macro-add-select-key') {
      if (offset > 2) break;
    }
    var key = len2[offset];
    html += KeyGridCell({ prefix: 'mouse-select-key', action: 'select', actionAttr: 'dialog-mouse-select-key-action', index: offset, x: key.rect[0], y: key.rect[1], width: key.rect[2], height: key.rect[3], label: key.name, showHoverBg: false, textStyle: 'font-size: small;margin-top: 8px;', elementId: client });
  }
  html += '</div>';
  $('#dialog-mouse-select-key-container').html(html);
}
function kbd_ui_refresh_onboard_config(client) {
  var layui2 = layui.$;
  var layui3 = layui.form;
  var num = client.device_info.kbd_onboardNum;
  var options = [];
  var label = layui.i18np.prop('STRID_SETTING_CONFIG_CURRENT');
  for (var i = 0; i < num; i++) {
    options.push({ value: i, label: label + NUMBERS[i + 1] });
  }
  var html = SelectElement({ name: 'kbd_onboard-config', options: options });
  layui2('#kbd-setting-onboard-config').html(html);
  layui2('[name="kbd_onboard-config"]').val(client.device_info.onboardIndex);
  layui3.render('select');
}
function kbd_ui_refresh_key_matrix(client) {
  var breakAt = is_keyboard_5_15(client.device) ? 0xe : 0xd;
  var isSmall = is_keyboard_5_15(client.device);
  var textStyle = isSmall ? 'user-select: none;font-size: smaller;' : 'user-select: none;font-size: small;';
  var html = '<div class="layui-row" style="margin-top: 10px;">';
  for (var i = 0; i < kbd_key_infos.length; i++) {
    var key = kbd_key_infos[i];
    html += KeyGridCell({ prefix: 'kbd-key-matrix', index: i, x: key.rect[0], y: key.rect[1], width: key.rect[2], height: key.rect[3], label: key.name, extraClass: 'layui-hover-bg-trans', textStyle: textStyle });
    if (kbd_key_matrix_index == i) {
      html += KeyGridHighlight({ width: key.rect[2], height: key.rect[3] });
    }
    html += RowBreak(i, breakAt);
  }
  html += '</div>';
  $('#kbd-mapping-key-container').html(html);
}
function kbd_ui_refresh_key_desc(client) {
  $("#kbd-key-desc-title").css("color", "gray");
  document.getElementById("kbd-key-desc-container").style.borderColor = 'gray';
  $("#kbd-key-desc-line").css("background-color", 'gray');
  $("#kbd-key-desc1").css("color", "gray");
  $("#kbd-key-desc1").text(layui.i18np.prop("STRID_KBD_NO_KEY_SELECTED"));
  $("#kbd-key-desc-arrow").css("display", 'none');
  $("#kbd-key-desc2").css("display", "none");
  document.getElementById("kbd-key-default").disabled = true;
  document.getElementById("kbd-key-set").disabled = true;
  if (kbd_key_matrix_index >= 0x0) {
    $("#kbd-key-desc-title").css("color", '');
    if (is_dark_theme()) {
      document.getElementById("kbd-key-desc-container").style.borderColor = "#BABABA";
      $("#kbd-key-desc-line").css("background-color", '#BABABA');
      document.getElementById('kbd-key-default').className = "layui-btn layui-key-desc-button";
      document.getElementById('kbd-key-set').className = "layui-btn layui-key-desc-button";
    } else {
      document.getElementById("kbd-key-desc-container").style.borderColor = 'black';
      $("#kbd-key-desc-line").css("background-color", "black");
      document.getElementById("kbd-key-default").className = "layui-btn layui-key-desc-button-light";
      document.getElementById("kbd-key-set").className = "layui-btn layui-key-desc-button-light";
    }
    $("#kbd-key-desc1").css("color", '');
    $("#kbd-key-desc1").text(kbd_key_infos[kbd_key_matrix_index].name);
    if (kbd_key_setting_index == 0x0 || kbd_key_setting_index == 0x1 || kbd_key_setting_index == 0x2) {
      if (kbd_layer_id == 0x0) {
        if (kbd_key_infos[kbd_key_matrix_index].keyId != kbd_keys[kbd_key_matrix_index].keyId) {
          document.getElementById("kbd-key-default").disabled = false;
        }
      } else if (kbd_key_infos[kbd_key_matrix_index].keyId > 0x1) {
        document.getElementById("kbd-key-default").disabled = false;
      }
      if (kbd_select_keyId > 0x0) {
        if (kbd_key_infos[kbd_key_matrix_index].keyId == kbd_select_keyId) {
          document.getElementById("kbd-key-set").disabled = true;
        } else {
          $("#kbd-key-desc-arrow").css("display", '');
          $('#kbd-key-desc2').css('display', '');
          $("#kbd-key-desc2").css('color', theme_color);
          $("#kbd-key-desc2").text(get_key_name_from_keyid(kbd_select_keyId));
          document.getElementById("kbd-key-set").disabled = false;
        }
      }
    }
  }
}
function kbd_ui_key_setting_init(client) {
  var html = '<div class="layui-row" style="margin-top: 10px;">';
  for (var i = 0; i < kbd_select_keys.length; i++) {
    var key = kbd_select_keys[i];
    html += KeyGridCell({ prefix: 'kbd-select-key', index: i, x: key.rect[0], y: key.rect[1], width: key.rect[2], height: key.rect[3], label: key.name, textStyle: 'user-select: none;font-size: smaller;' });
    html += RowBreak(i);
  }
  html += '</div>';
  $('#select-key-container').html(html);
  html = '<div class="layui-row" style="margin-top: 10px;">';
  for (var j = 0; j < mouse_select_keys.length; j++) {
    var key = mouse_select_keys[j];
    html += KeyGridCell({ prefix: 'mouse-select-key', index: j, x: key.rect[0], y: key.rect[1], width: key.rect[2], height: key.rect[3], label: key.name, showHoverBg: false, textStyle: 'user-select: none;font-size: small;margin-top: 8px;' });
  }
  html += '</div>';
  $('#mouse-select-key-container').html(html);
}
function kbd_ui_function_setting_init(client) {
  var textStyle = 'user-select: none;font-size: small;margin-top: 8px;';
  var html = '<div class="layui-row" style="margin-top: 10px;">';
  for (var i = 0; i < kbd_rgb_keys.length; i++) {
    var key = kbd_rgb_keys[i];
    html += KeyGridCell({ prefix: 'kbd-key-rgb', index: i, x: key.rect[0], y: key.rect[1], width: key.rect[2], height: key.rect[3], label: key.name, showHoverBg: false, textStyle: textStyle });
  }
  html += '</div>';
  $('#kbd-key-rgb-container').html(html);
  html = '<div class="layui-row" style="margin-top: 10px;">';
  for (var j = 0; j < kbd_media_keys.length; j++) {
    var key = kbd_media_keys[j];
    html += KeyGridCell({ prefix: 'kbd-key-media', index: j, x: key.rect[0], y: key.rect[1], width: key.rect[2], height: key.rect[3], label: key.name, showHoverBg: false, textStyle: textStyle });
  }
  html += '</div>';
  $('#kbd-key-media-container').html(html);
  html = '<div class="layui-row" style="margin-top: 10px;">';
  for (var k = 0; k < kbd_windows_keys.length; k++) {
    var key = kbd_windows_keys[k];
    html += KeyGridCell({ prefix: 'kbd-key-windows', index: k, x: key.rect[0], y: key.rect[1], width: key.rect[2], height: key.rect[3], label: key.name, showHoverBg: false, textStyle: textStyle });
  }
  html += '</div>';
  $('#kbd-key-windows-container').html(html);
}
function kbd_ui_macro_init(client) {
  var layui2 = layui.$;
  var html = '<table><tr>';
  for (var i = 0; i < kbd_macro_infos.length; i++) {
    var macro = kbd_macro_infos[i];
    var isSelected = kbd_macro_select_index == i;
    var bgColor = isSelected ? '#16B777' : '#202020';
    var countColor = isSelected ? 'white' : 'gray';
    html += '<td style="padding-top: 5px;">';
    html += '<a kbd-macro-item-index="' + i + '"kbd-macro-item-action="select" style="cursor: pointer;">';
    html += '<div style="width: 104px; height: 68px; margin-left: 5px; background-color: ' + bgColor + ';">';
    html += '<div class="layui-setting-title-container" style="height: 50%;">';
    html += '<p style="width: 104px; color: white; margin-top: 6px; text-align: center;">M' + (i + 1) + '</p>';
    html += '</div>';
    html += '<div class="layui-setting-title-container" style="height: 50%;">';
    html += '<p style="width: 104px; color: ' + countColor + '; text-align: center;">' + macro.length + ' ' + layui.i18np.prop('STRID_SETTING_MACRO_ACTIONGS') + '</p>';
    html += '</div>';
    html += '</div>';
    html += '</a>';
    html += '</td>';
    if ((i + 1) % 4 == 0) html += '</tr><tr>';
  }
  html += '</tr></table>';
  layui2('#kbd-macro-container').html(html);
}
function kbd_ui_macro_edit_init(client) {
  if (kbd_macro_select_index >= 0x0) {
    document.getElementById("kbd-macro-record").disabled = false;
    document.getElementById('kbd-macro-add').disabled = false;
    document.getElementById("kbd-macro-clear").disabled = false;
    document.getElementById("kbd-macro-save").disabled = false;
  } else {
    document.getElementById("kbd-macro-record").disabled = true;
    document.getElementById("kbd-macro-add").disabled = true;
    document.getElementById("kbd-macro-clear").disabled = true;
    document.getElementById('kbd-macro-save').disabled = true;
  }
  var layui2 = layui.$;
  var html = '<table><tr>';
  for (var i = 0; i < edit_macros.length; i++) {
    var item = edit_macros[i];
    var event = item.mouse_key_event;
    var code = item.mouse_key_code;

    html += '<td style="padding-top: 3px;">';
    html += '<a macro-edit-item-index="' + i + '" macro-edit-item-action="select" style="cursor: pointer;">';
    html += '<div style="width: 110px; height: 60px; margin-left: 3px; background-color: ' + (is_dark_theme() ? '#202020' : 'gray') + ';">';
    html += '<div class="layui-setting-title-container" style="height: 50%;">';

    if (event == MOUSE_EVENT_WHEEL_VERT) {
      var isUp = code > 0;
      html += '<img src="' + RESOURCE_URL + 'setting/' + (isUp ? 'mkey_up' : 'mkey_down') + '.png" style="width: 20px; height: 22px; margin: 4px;">';
      html += '<p style="color: white; margin-top: 6px;">' + layui.i18np.prop(isUp ? 'STRID_KEY_WHELL_UP_S' : 'STRID_KEY_WHELL_DOWN_S') + '<br>' + (isUp ? code : Math.abs(code)) + '</p>';
    } else if (event == MOUSE_EVENT_WHEEL_HORZ) {
      var isLeft = code < 0;
      html += '<img src="' + RESOURCE_URL + 'setting/' + (isLeft ? 'mkey_up' : 'mkey_down') + '.png" style="width: 20px; height: 22px; margin: 4px;">';
      html += '<p style="color: white; margin-top: 6px;">' + layui.i18np.prop(isLeft ? 'STRID_KEY_WHELL_LEFT_S' : 'STRID_KEY_WHELL_RIGHT_S') + '<br>' + (isLeft ? Math.abs(code) : code) + '</p>';
    } else if (event == MOUSE_EVENT_MOVE) {
      var mx = code >> 16 & 0xffff;
      var my = code & 0xffff;
      html += '<img src="' + RESOURCE_URL + 'setting/mkey_move.png" style="width: 20px; height: 22px; margin: 4px;">';
      html += '<p style="color: white; margin-top: 6px;">' + layui.i18np.prop('STRID_KEY_MOUSE_MOVE_S') + '<br>' + ((mx - 0x7ff) / 10) + ':' + ((my - 0x7ff) / 10) + '</p>';
    } else if (event == MOUSE_EVENT_POSITION) {
      var screenW = window.screen.width;
      var screenH = window.screen.height;
      var px = parseInt((code >> 16 & 0xffff) * screenW / 0xffff);
      var py = parseInt((code & 0xffff) * screenH / 0xffff);
      html += '<img src="' + RESOURCE_URL + 'setting/mkey_position.png" style="width: 20px; height: 22px; margin: 4px;">';
      html += '<p style="color: white; margin-top: 6px;">' + layui.i18np.prop('STRID_KEY_MOUSE_POSITION_S') + '<br>' + px + ':' + py + '</p>';
    } else if (code == 0) {
      html += '<p style="color: white; margin-left: 4px;">' + get_key_name_from_code(code) + '</p>';
    } else {
      var isUpEvent = event == MOUSE_EVENT_KEY_UP;
      var isMouseKey = code >= 0xff && code < 0x200;
      var imgName = (isMouseKey ? 'mkey_' : 'key_') + (isUpEvent ? 'up' : 'down');
      html += '<img src="' + RESOURCE_URL + 'setting/' + imgName + '.png" style="width: 20px; height: 22px; margin: 4px;">';
      html += '<p style="color: white; margin-top: 6px;">' + get_key_name_from_code(code) + '</p>';
    }

    html += '</div>';
    html += '<div class="layui-setting-title-container" style="height: 50%;">';
    html += '<img src="' + RESOURCE_URL + 'setting/key_waiting.png" style="width: 18px; height: 20px; margin: 4px;">';
    if (event == MOUSE_EVENT_MOVE && item.mouse_key_loop > 1) {
      html += '<p style="color: white;">' + item.mouse_key_time + 'x' + item.mouse_key_loop + ' ' + layui.i18np.prop('STRID_SETTING_MAPPING_MACRO_ACTION_KEEP_TIME_MS') + '</p>';
    } else {
      html += '<p style="color: white;">' + item.mouse_key_time + ' ' + layui.i18np.prop('STRID_SETTING_MAPPING_MACRO_ACTION_KEEP_TIME_MS') + '</p>';
    }
    html += '</div>';
    html += '</div>';
    html += '</a>';
    html += '</td>';
    if ((i + 1) % 7 == 0) html += '</tr><tr>';
  }
  html += '</tr></table>';
  layui2('#kbd-macro-edit-container').html(html);
}
function create_light_mode_info(client, value) {
  var info = {
    mode: client,
    name: value
  };
  return info;
}
function kbd_ui_refresh_light_mode(client) {
  var layui2 = layui.$;
  var layui3 = layui.form;
  kbd_light_mode.splice(0x0, kbd_light_mode.length);
  kbd_light_mode.push(create_light_mode_info(0x0, layui.i18np.prop('STRID_CLOSE')));
  kbd_light_mode.push(create_light_mode_info(0x2d, layui.i18np.prop("STRID_KBD_LIGHT_MODE_DEFINE")));
  for (var offset = 0x1; offset < 0x19; offset++) {
    kbd_light_mode.push(create_light_mode_info(offset, layui.i18np.prop("STRID_KBD_LIGHT_MODE" + offset)));
  }
  kbd_light_mode.push(create_light_mode_info(0x1c, layui.i18np.prop("STRID_KBD_LIGHT_MODE" + 0x1c)));
  kbd_light_mode.push(create_light_mode_info(0x1d, layui.i18np.prop("STRID_KBD_LIGHT_MODE" + 0x1d)));
  kbd_light_mode.push(create_light_mode_info(0x1e, layui.i18np.prop("STRID_KBD_LIGHT_MODE" + 0x1e)));
  var options = [];
  for (var i = 0; i < kbd_light_mode.length; i++) {
    options.push({ value: i, label: (i + 1) + '. ' + kbd_light_mode[i].name });
  }
  var html = SelectElement({ name: 'kbd-light-mode', options: options });
  layui2('#kbd-light-mode-container').html(html);
  layui2("[name=\"kbd-light-mode\"]").val(0xd);
  for (var offset = 0x0; offset < kbd_light_mode.length; offset++) {
    if (kbd_light_mode[offset].mode == kbd_edit_info.mode) {
      layui2("[name=\"kbd-light-mode\"]").val(offset);
      break;
    }
  }
  kbd_sleep_time.splice(0x0, kbd_light_mode.length);
  kbd_sleep_time.push(create_light_mode_info(0x0, layui.i18np.prop('STRID_KBD_LIGHT_SLEEP_TIME1')));
  kbd_sleep_time.push(create_light_mode_info(0x12c, layui.i18np.prop("STRID_KBD_LIGHT_SLEEP_TIME2")));
  kbd_sleep_time.push(create_light_mode_info(0x384, layui.i18np.prop("STRID_KBD_LIGHT_SLEEP_TIME3")));
  kbd_sleep_time.push(create_light_mode_info(0x708, layui.i18np.prop("STRID_KBD_LIGHT_SLEEP_TIME4")));
  kbd_sleep_time.push(create_light_mode_info(0xe10, layui.i18np.prop("STRID_KBD_LIGHT_SLEEP_TIME5")));
  var options = [];
  for (var i = 0; i < kbd_sleep_time.length; i++) {
    options.push({ value: i, label: (i + 1) + '. ' + kbd_sleep_time[i].name });
  }
  var html = SelectElement({ name: 'kbd-light-sleep-time', options: options });
  layui2('#kbd-light-sleep-time-container').html(html);
  layui2("[name=\"kbd-light-sleep-time\"]").val(0x0);
  for (var offset = 0x0; offset < kbd_sleep_time.length; offset++) {
    if (kbd_sleep_time[offset].mode == kbd_edit_info.sleep_time) {
      layui2("[name=\"kbd-light-sleep-time\"]").val(offset);
      break;
    }
  }
  layui3.render('select');
}
function kbd_ui_refresh_light(client) {
  if (kbd_edit_info.mode == 0x2d) {
    document.getElementById("kbd-light-wasd").disabled = false;
    document.getElementById('kbd-light-select-all').disabled = false;
    document.getElementById("kbd-light-reverse-all").disabled = false;
    document.getElementById("kbd-light-clear").disabled = false;
  } else {
    document.getElementById("kbd-light-wasd").disabled = true;
    document.getElementById("kbd-light-select-all").disabled = true;
    document.getElementById('kbd-light-reverse-all').disabled = true;
    document.getElementById('kbd-light-clear').disabled = true;
  }
  var value = hsvToRgb(kbd_edit_info.hue, kbd_edit_info.sat, Math.floor(0xff * kbd_edit_info.brightness / 0x64));
  if (kbd_edit_info.mode == 0x2d && kbd_matrix_select_keys.length > 0x0) {
    value = hsvToRgb(kbd_matrix_select_keys[0x0].hue, kbd_matrix_select_keys[0x0].sat, Math.floor(0xff * kbd_edit_info.brightness / 0x64));
  }
  document.getElementById("pick-color").value = rgbToHex(value.r, value.g, value.b);
  $('#color-r-input').val(value.r);
  $('#color-g-input').val(value.g);
  $("#color-b-input").val(value.b);
  var layui2 = layui.slider;
  var value2 = layui2.render({
    'elem': "#kbd-light-global-brightness",
    'min': 0x0,
    'max': 0x64,
    'step': 0x1,
    'value': kbd_edit_info.brightness,
    'input': true,
    'tips': false,
    'disabled': !!(kbd_edit_info.mode == 0x0),
    'theme': theme_color,
    'done': function (result) {
      if (kbd_edit_info.brightness != result) {
        kbd_edit_info.brightness = result;
        hs_set_light(current_usb_client, 0x1, kbd_edit_info);
      }
    }
  });
  value2.setValue(kbd_edit_info.brightness);
  value2 = layui2.render({
    'elem': "#kbd-light-global-speed",
    'min': 0x0,
    'max': 0x64,
    'step': 0x1,
    'value': kbd_edit_info.speed,
    'input': true,
    'tips': false,
    'disabled': !!(kbd_edit_info.mode == 0x0 || kbd_edit_info.mode == 0x1 || kbd_edit_info.mode == 0x2d),
    'theme': theme_color,
    'done': function (result) {
      if (kbd_edit_info.speed != result) {
        kbd_edit_info.speed = result;
        hs_set_light(current_usb_client, 0x3, kbd_edit_info);
      }
    }
  });
  value2.setValue(kbd_edit_info.speed);
  kbd_ui_refresh_light_mode(client);
}
function kbd_ui_refresh_light_box_mode(client) {
  var layui2 = layui.$;
  var layui3 = layui.form;
  kbd_light_mode.splice(0x0, kbd_light_mode.length);
  kbd_light_mode.push(create_light_mode_info(0x0, layui.i18np.prop('STRID_CLOSE')));
  kbd_light_mode.push(create_light_mode_info(0x1, layui.i18np.prop("STRID_KBD_LIGHT_BOX_MODE1")));
  kbd_light_mode.push(create_light_mode_info(0x2, layui.i18np.prop('STRID_KBD_LIGHT_BOX_MODE2')));
  kbd_light_mode.push(create_light_mode_info(0x3, layui.i18np.prop('STRID_KBD_LIGHT_BOX_MODE3')));
  kbd_light_mode.push(create_light_mode_info(0x4, layui.i18np.prop("STRID_KBD_LIGHT_BOX_MODE4")));
  var options = [];
  for (var i = 0; i < kbd_light_mode.length; i++) {
    options.push({ value: i, label: (i + 1) + '. ' + kbd_light_mode[i].name });
  }
  var html = SelectElement({ name: 'kbd-light-box-mode', options: options });
  layui2('#kbd-light-box-mode-container').html(html);
  layui2("[name=\"kbd-light-box-mode\"]").val(0x1);
  for (var index = 0x0; index < kbd_light_mode.length; index++) {
    if (kbd_light_mode[index].mode == kbd_edit_info.light_box_info.mode) {
      layui2("[name=\"kbd-light-box-mode\"]").val(index);
      break;
    }
  }
  layui3.render("select");
}
function kbd_ui_refresh_light_box(client) {
  document.getElementById('kbd-light-wasd').disabled = true;
  document.getElementById('kbd-light-select-all').disabled = true;
  document.getElementById("kbd-light-reverse-all").disabled = true;
  document.getElementById("kbd-light-clear").disabled = true;
  $("[name=\"kbd-light-box-colored\"]").prop('checked', kbd_edit_info.light_box_info.colored == 0x1);
  var info = {
    'r': kbd_edit_info.light_box_info.r,
    'g': kbd_edit_info.light_box_info.g,
    'b': kbd_edit_info.light_box_info.b
  };
  document.getElementById("light-box-pick-color").value = rgbToHex(info.r, info.g, info.b);
  $("#light-box-color-r-input").val(info.r);
  $("#light-box-color-g-input").val(info.g);
  $("#light-box-color-b-input").val(info.b);
  var layui2 = layui.slider;
  var value = layui2.render({
    'elem': "#kbd-light-box-global-brightness",
    'min': 0x0,
    'max': 0x64,
    'step': 0x1,
    'value': kbd_edit_info.light_box_info.brightness,
    'input': true,
    'tips': false,
    'theme': theme_color,
    'done': function (result) {
      if (kbd_edit_info.light_box_info.brightness != result) {
        kbd_edit_info.light_box_info.brightness = result;
        hs_set_light_box(current_usb_client, kbd_edit_info.light_box_info);
      }
    }
  });
  value.setValue(kbd_edit_info.light_box_info.brightness);
  value = layui2.render({
    'elem': "#kbd-light-box-global-speed",
    'min': 0x0,
    'max': 0x64,
    'step': 0x1,
    'value': kbd_edit_info.light_box_info.speed,
    'input': true,
    'tips': false,
    'theme': theme_color,
    'done': function (result) {
      if (kbd_edit_info.light_box_info.speed != result) {
        kbd_edit_info.light_box_info.speed = result;
        hs_set_light_box(current_usb_client, kbd_edit_info.light_box_info);
      }
    }
  });
  value.setValue(kbd_edit_info.light_box_info.speed);
  kbd_ui_refresh_light_box_mode(client);
}
function changeColor() {
  if (kbd_edit_info.mode == 0x0) {
    return;
  }
  var el = document.getElementById("pick-color");
  var value = '0x' + el.value.substring(0x1);
  var value2 = Number(value);
  var value3 = value2 >> 0x10 & 0xff;
  var value4 = value2 >> 0x8 & 0xff;
  var value5 = value2 & 0xff;
  var value6 = rgbToHsv(value3, value4, value5);
  $("#color-r-input").val(value3);
  $('#color-g-input').val(value4);
  $("#color-b-input").val(value5);
  if (kbd_edit_info.hue != value6.h || kbd_edit_info.sat != value6.s) {
    kbd_edit_info.hue = value6.h;
    kbd_edit_info.sat = value6.s;
    if (kbd_edit_info.mode != 0x0 && kbd_edit_info.mode != 0x2d) {
      hs_set_light(current_usb_client, 0x4, kbd_edit_info);
    }
  }
}
function light_box_changeColor() {
  var el = document.getElementById('light-box-pick-color');
  var value = '0x' + el.value.substring(0x1);
  var value2 = Number(value);
  var value3 = value2 >> 0x10 & 0xff;
  var value4 = value2 >> 0x8 & 0xff;
  var value5 = value2 & 0xff;
  $("#light-box-color-r-input").val(value3);
  $('#light-box-color-g-input').val(value4);
  $("#light-box-color-b-input").val(value5);
  if (kbd_edit_info.light_box_info.r != value3 || kbd_edit_info.light_box_info.g != value4 || kbd_edit_info.light_box_info.b != value5) {
    kbd_edit_info.light_box_info.r = value3;
    kbd_edit_info.light_box_info.g = value4;
    kbd_edit_info.light_box_info.b = value5;
    hs_set_light_box(current_usb_client, kbd_edit_info.light_box_info);
  }
}
function kbd_ui_refresh_light_matrix(client) {
  var value = 0xd;
  if (is_keyboard_5_15(client.device)) {
    value = 0xe;
  }
  var html = "<div class=\"layui-row\" style=\"margin-top: 10px;\">";
  for (let len = 0x0; len < kbd_key_infos.length; len++) {
    var value2 = kbd_key_infos[len].name;
    var value3 = kbd_key_infos[len].rect;
    var x = value3[0x0];
    var value4 = value3[0x1];
    var value5 = value3[0x2];
    var value6 = value3[0x3];
    var value7 = kbd_key_infos[len].row;
    var value8 = kbd_key_infos[len].col;
    var flag = true;
    if (kbd_edit_info.mode == 0x2d) {
      flag = false;
    }
    html += "<div class=\"layui-col-xs3\" style=\"width:" + value5 + "px; height:" + value6 + "px; margin-left:" + x + "px; margin-top:" + value4 + "px; \">";
    if (flag) {
      html += "<a kbd-light-matrix-index=\"" + -0x1 + "\"kbd-light-matrix-action=\"select\" style=\"cursor: not-allowed;\">";
      html += "<div style=\"width:" + value5 + "px; height:" + value6 + "px;\">";
      html += "<div style=\"justify-content: center; align-items: center; position: absolute; width:" + value5 + "px; height:" + value6 + "px;\">";
      " ";
    } else {
      html += "<a kbd-light-matrix-index=\"" + len + "\"kbd-light-matrix-action=\"select\" style=\"cursor: pointer;\">";
      html += "<div style=\"width:" + value5 + "px; height:" + value6 + "px;\">";
      html += "<div class=\"layui-hover-bg-trans\" style=\"justify-content: center; align-items: center; position: absolute; width:" + value5 + "px; height:" + value6 + "px;\">";
      " ";
    }
    if (is_keyboard_5_15(client.device)) {
      html += "<p style=\"user-select: none;font-size: smaller;color:white;text-align: center; margin-top: 10px;\" >" + value2 + '</p>';
    } else {
      html += "<p style=\"user-select: none;font-size: small;color:white;text-align: center; margin-top: 16px;\" >" + value2 + '</p>';
    }
    var transparentStr = "transparent";
    if (kbd_edit_info.mode == 0x2d) {
      for (let index = 0x0; index < kbd_edit_info.keys.length; index++) {
        if (value7 == kbd_edit_info.keys[index].row && value8 == kbd_edit_info.keys[index].col) {
          var value9 = hsvToRgb(kbd_edit_info.keys[index].hue, kbd_edit_info.keys[index].sat, Math.floor(0xff * kbd_edit_info.brightness / 0x64));
          transparentStr = rgbToHex(value9.r, value9.g, value9.b);
          break;
        }
      }
    }
    if (value2 != '') {
      var value10 = (value5 - 0x8) / 0x2;
      html += "<div id=\"key-color\" style=\"background-color: " + transparentStr + "; margin-top: 6px; margin-left:" + value10 + "px; width:" + 0x8 + "px; height:" + '2' + "px;\">";
      " ";
      html += "</div>";
    }
    html += "</div>";
    for (let offset = 0x0; offset < kbd_matrix_select_keys.length; offset++) {
      if (value7 == kbd_matrix_select_keys[offset].row && value8 == kbd_matrix_select_keys[offset].col) {
        html += "<div class=\"layui-key-select-red\" style=\"position: absolute; width:" + (value5 - 0x3) + "px; height:" + (value6 - 0x3) + "px;\">";
        " ";
        html += "</div>";
        break;
      }
    }
    html += '</div>';
    html += "</a>";
    html += "</div>";
    if (len == value) {
      html += "</div><div class=\"layui-row\">";
    }
  }
  ;
  html += "</div>";
  $('#kbd-mapping-light-container').html(html);
}
function kbd_ui_refresh_axis_matrix(client) {
  var value = 0xd;
  if (is_keyboard_5_15(client.device)) {
    value = 0xe;
  }
  var html = "<div class=\"layui-row\" style=\"margin-top: 10px;\">";
  for (let len = 0x0; len < kbd_key_infos.length; len++) {
    var value2 = kbd_key_infos[len].name;
    var value3 = kbd_key_infos[len].rect;
    var x = value3[0x0];
    var value4 = value3[0x1];
    var value5 = value3[0x2];
    var value6 = value3[0x3];
    var value7 = kbd_key_infos[len].row;
    var value8 = kbd_key_infos[len].col;
    html += "<div class=\"layui-col-xs3\" style=\"width:" + value5 + "px; height:" + value6 + "px; margin-left:" + x + "px; margin-top:" + value4 + "px; \">";
    html += "<a kbd-axis-matrix-index=\"" + len + "\"kbd-axis-matrix-action=\"select\" style=\"cursor: pointer;\">";
    html += "<div style=\"width:" + value5 + "px; height:" + value6 + "px;\">";
    html += "<div class=\"layui-hover-bg-trans\" style=\"justify-content: center; align-items: center; position: absolute; width:" + value5 + "px; height:" + value6 + "px;\">";
    " ";
    if (is_keyboard_5_15(client.device)) {
      html += "<p style=\"user-select: none;font-size: smaller;color:white;text-align: center; margin-top: 2px;\" >" + value2 + '</p>';
      if (value2 != '') {
        if (kbd_axis_infos.length > 0x0) {
          var value9 = kbd_axis_infos[len].rt_press_lv / 0x3e8;
          var value10 = kbd_axis_infos[len].rt_release_lv / 0x3e8;
          html += "<p style=\"user-select: none;font-size: 10px;color:#C0C0C0;text-align: center;\" >" + value9.toFixed(0x3) + "</p>";
          html += "<p style=\"user-select: none;font-size: 10px;color:#C0C0C0;text-align: center; \" >" + value10.toFixed(0x3) + '</p>';
        }
      }
    } else {
      html += "<p style=\"user-select: none;font-size: small;color:white;text-align: center; margin-top: 5px; margin-bottom:2px\" >" + value2 + "</p>";
      if (value2 != '') {
        if (kbd_axis_infos.length > 0x0) {
          var value9 = kbd_axis_infos[len].rt_press_lv / 0x64;
          var value10 = kbd_axis_infos[len].rt_release_lv / 0x64;
          html += "<p style=\"user-select: none;font-size: smaller; color:#C0C0C0; text-align: center; margin-top:1px\" >" + value9.toFixed(0x2) + "</p>";
          html += "<p style=\"user-select: none;font-size: smaller; color:#C0C0C0; text-align: center; margin-top:1px\" >" + value10.toFixed(0x2) + "</p>";
        }
      }
    }
    html += '</div>';
    for (let index = 0x0; index < kbd_matrix_select_keys.length; index++) {
      if (value7 == kbd_matrix_select_keys[index].row && value8 == kbd_matrix_select_keys[index].col) {
        html += "<div class=\"layui-key-select-red\" style=\"position: absolute; width:" + (value5 - 0x3) + "px; height:" + (value6 - 0x3) + "px;\">";
        " ";
        html += "</div>";
        break;
      }
    }
    html += "</div>";
    html += '</a>';
    html += "</div>";
    if (len == value) {
      html += "</div><div class=\"layui-row\">";
    }
  }
  ;
  html += "</div>";
  $('#kbd-mapping-axis-container').html(html);
}
function kbd_ui_refresh_axis_type(client) {
  if (is_dark_theme()) {
    document.getElementById("layui-axis-type-jdl-container").style.borderColor = "#292929";
    document.getElementById("layui-axis-type-hn-omega-container").style.borderColor = "#292929";
    document.getElementById("layui-axis-type-ttc-wcw-container").style.borderColor = "#292929";
    document.getElementById("layui-axis-type-jdl-container").style.backgroundColor = "#292929";
    document.getElementById("layui-axis-type-hn-omega-container").style.backgroundColor = "#292929";
    document.getElementById("layui-axis-type-ttc-wcw-container").style.backgroundColor = "#292929";
  } else {
    document.getElementById("layui-axis-type-jdl-container").style.borderColor = "#CCCCCC";
    document.getElementById("layui-axis-type-hn-omega-container").style.borderColor = "#CCCCCC";
    document.getElementById('layui-axis-type-ttc-wcw-container').style.borderColor = "#CCCCCC";
    document.getElementById("layui-axis-type-jdl-container").style.backgroundColor = "white";
    document.getElementById("layui-axis-type-hn-omega-container").style.backgroundColor = "white";
    document.getElementById("layui-axis-type-ttc-wcw-container").style.backgroundColor = "white";
  }
  document.getElementById('layui-axis-type-jdl-icon').src = RESOURCE_URL + "setting/kbd/" + "kbd_axis_jdl.png";
  document.getElementById("layui-axis-type-hn-omega-icon").src = RESOURCE_URL + 'setting/kbd/' + 'kbd_axis_hn_omega.png';
  document.getElementById('layui-axis-type-ttc-wcw-icon').src = RESOURCE_URL + "setting/kbd/" + "kbd_axis_ttc_wcw.png";
  if (kbd_matrix_select_keys.length == 0x0) {
    return;
  }
  if (kbd_edit_info.switch_type == 0x0) {
    document.getElementById("layui-axis-type-jdl-container").style.borderColor = "#16B777";
  } else {
    if (kbd_edit_info.switch_type == 0x1) {
      document.getElementById("layui-axis-type-hn-omega-container").style.borderColor = "#16B777";
    } else if (kbd_edit_info.switch_type == 0x2) {
      document.getElementById('layui-axis-type-ttc-wcw-container').style.borderColor = '#16B777';
    }
  }
}
function kbd_ui_refresh_axis(client) {
  if (kbd_matrix_select_keys.length > 0x0) {
    kbd_edit_info = kbd_matrix_select_keys[0x0];
  } else {
    kbd_edit_info = kbd_create_axis_info();
  }
  $("[name=\"kbd-axis-quick-tigger-mode\"]").prop('checked', !!(kbd_edit_info.rt_enable == 0x1));
  $("[name=\"kbd-axis-quick-tigger-mode\"]").prop('disabled', !(kbd_matrix_select_keys.length > 0x0));
  $("#kbd-axis-button-container").css('display', kbd_matrix_select_keys.length > 0x0 ? "flex" : "none");
  var val01 = 0.01;
  var val012 = 0.01;
  var val34 = 3.4;
  var value = 0x64;
  if (is_keyboard_5_15(client.device)) {
    val01 = 0.001;
    val012 = 0.001;
    value = 0x3e8;
  }
  if (kbd_edit_info.switch_type == 0x1) {
    val34 = 3.5;
  }
  var value2 = kbd_edit_info.apc_lv / value;
  var layui2 = layui.slider;
  var value3 = layui2.render({
    'elem': "#kbd-axis-trigger-point",
    'min': 0.1,
    'max': val34,
    'step': val01,
    'value': value2,
    'input': true,
    'tips': false,
    'disabled': !(kbd_matrix_select_keys.length > 0x0),
    'theme': theme_color,
    'done': function (result) {
      if (result != undefined) {
        kbd_edit_info.apc_lv = result * value;
      }
    }
  });
  value3.setValue(value2);
  var value4 = kbd_edit_info.rt_press_lv / value;
  value3 = layui2.render({
    'elem': "#kbd-axis-press-distance",
    'min': val012,
    'max': val34,
    'step': val01,
    'value': value4,
    'input': true,
    'tips': false,
    'disabled': !(kbd_edit_info.rt_enable == 0x1),
    'theme': theme_color,
    'done': function (result) {
      if (result != undefined) {
        kbd_edit_info.rt_press_lv = result * value;
      }
    }
  });
  value3.setValue(value4);
  var value5 = kbd_edit_info.rt_release_lv / value;
  value3 = layui2.render({
    'elem': '#kbd-axis-release-distance',
    'min': val012,
    'max': val34,
    'step': val01,
    'value': value5,
    'input': true,
    'tips': false,
    'disabled': !(kbd_edit_info.rt_enable == 0x1),
    'theme': theme_color,
    'done': function (result) {
      if (result != undefined) {
        kbd_edit_info.rt_release_lv = result * value;
      }
    }
  });
  value3.setValue(value5);
  var value6 = kbd_edit_info.btm_dz / value;
  value3 = layui2.render({
    'elem': "#kbd-axis-dead-distance",
    'min': 0x0,
    'max': val34,
    'step': val01,
    'value': value6,
    'input': true,
    'tips': false,
    'disabled': !(kbd_edit_info.rt_enable == 0x1),
    'theme': theme_color,
    'done': function (result) {
      if (result != undefined) {
        kbd_edit_info.btm_dz = result * value;
      }
    }
  });
  value3.setValue(value6);
  kbd_ui_refresh_axis_type(client);
}
function kbd_ui_refresh_advance_key_desc(client) {
  $("#kbd-advance-key-desc-title").css("color", 'gray');
  document.getElementById('kbd-advance-key-desc-container').style.borderColor = "gray";
  $("#kbd-advance-key-desc-line").css('background-color', 'gray');
  $("#kbd-advance-key-desc1").css("color", "gray");
  $('#kbd-advance-key-desc1').text(layui.i18np.prop("STRID_KBD_NO_KEY_SELECTED"));
  $("#kbd-advance-key-desc-arrow").css("display", "none");
  $("#kbd-advance-key-desc-arrow").text(" â†’ ");
  $("#kbd-advance-key-desc2").css("display", "none");
  document.getElementById('kbd-advance-key-delete').disabled = true;
  document.getElementById("kbd-advance-key-set").disabled = true;
  if (kbd_key_matrix_index >= 0x0) {
    if (kbd_key_setting_index != 0x0 && kbd_key_setting_index != 0x2 || kbd_key_setting_index == 0x0 && kbd_select_elementId.length > 0x0 || kbd_key_setting_index == 0x2 && kbd_select_elementId.length > 0x0) {
      $("#kbd-advance-key-desc-title").css("color", '');
      if (is_dark_theme()) {
        document.getElementById("kbd-advance-key-desc-container").style.borderColor = '#BABABA';
        $("#kbd-key-desc-line").css('background-color', '#BABABA');
        document.getElementById("kbd-advance-key-delete").className = "layui-btn layui-key-desc-button";
        document.getElementById('kbd-advance-key-set').className = "layui-btn layui-key-desc-button";
      } else {
        document.getElementById("kbd-advance-key-desc-container").style.borderColor = 'black';
        $('#kbd-key-desc-line').css("background-color", "black");
        document.getElementById("kbd-advance-key-delete").className = "layui-btn layui-key-desc-button-light";
        document.getElementById("kbd-advance-key-set").className = "layui-btn layui-key-desc-button-light";
      }
      $('#kbd-advance-key-desc1').css("color", '');
    }
    if (kbd_key_setting_index == 0x0) {
      var flag = true;
      for (let len = 0x0; len < kbd_socd_infos.length; len++) {
        if (kbd_edit_info.row1 == kbd_socd_infos[len].row1 && kbd_edit_info.col1 == kbd_socd_infos[len].col1 && kbd_edit_info.row2 == kbd_socd_infos[len].row2 && kbd_edit_info.col2 == kbd_socd_infos[len].col2 && kbd_edit_info.socd_mode == kbd_socd_infos[len].socd_mode) {
          flag = false;
          break;
        }
      }
      if (kbd_select_elementId.length > 0x0) {
        $("#kbd-advance-key-desc1").text(kbd_key_infos[kbd_key_matrix_index].name);
      }
      if (kbd_edit_info.row1 >= 0x0 && kbd_edit_info.col1 >= 0x0 && kbd_edit_info.row2 >= 0x0 && kbd_edit_info.col2 >= 0x0) {
        for (let index = 0x0; index < kbd_key_infos.length; index++) {
          if (kbd_key_infos[index].row == kbd_edit_info.row1 && kbd_key_infos[index].col == kbd_edit_info.col1) {
            $("#kbd-advance-key-desc1").css("display", '');
            $("#kbd-advance-key-desc1").css('color', theme_color);
            $('#kbd-advance-key-desc1').text(kbd_key_infos[index].name);
            break;
          }
        }
        $("#kbd-advance-key-desc-arrow").css('display', '');
        $("#kbd-advance-key-desc-arrow").text(" + ");
        for (let offset = 0x0; offset < kbd_key_infos.length; offset++) {
          if (kbd_key_infos[offset].row == kbd_edit_info.row2 && kbd_key_infos[offset].col == kbd_edit_info.col2) {
            $("#kbd-advance-key-desc2").css('display', '');
            $("#kbd-advance-key-desc2").css("color", theme_color);
            $("#kbd-advance-key-desc2").text(kbd_key_infos[offset].name);
            break;
          }
        }
        var flag2 = false;
        for (let count = 0x0; count < kbd_socd_infos.length; count++) {
          if (kbd_key_infos[kbd_key_matrix_index].row == kbd_socd_infos[count].row1 && kbd_key_infos[kbd_key_matrix_index].col == kbd_socd_infos[count].col1 || kbd_key_infos[kbd_key_matrix_index].row == kbd_socd_infos[count].row2 && kbd_key_infos[kbd_key_matrix_index].col == kbd_socd_infos[count].col2) {
            flag2 = true;
            break;
          }
        }
        if (flag2) {
          document.getElementById("kbd-advance-key-delete").disabled = false;
        }
        if (flag) {
          document.getElementById("kbd-advance-key-set").disabled = false;
        }
      }
    } else {
      if (kbd_key_setting_index == 0x2) {
        var flag = true;
        for (let len2 = 0x0; len2 < kbd_rs_infos.length; len2++) {
          if (kbd_edit_info.row1 == kbd_rs_infos[len2].row1 && kbd_edit_info.col1 == kbd_rs_infos[len2].col1 && kbd_edit_info.row2 == kbd_rs_infos[len2].row2 && kbd_edit_info.col2 == kbd_rs_infos[len2].col2) {
            flag = false;
            break;
          }
        }
        if (kbd_select_elementId.length > 0x0) {
          $("#kbd-advance-key-desc1").text(kbd_key_infos[kbd_key_matrix_index].name);
        }
        if (kbd_edit_info.row1 >= 0x0 && kbd_edit_info.col1 >= 0x0 && kbd_edit_info.row2 >= 0x0 && kbd_edit_info.col2 >= 0x0) {
          for (let len3 = 0x0; len3 < kbd_key_infos.length; len3++) {
            if (kbd_key_infos[len3].row == kbd_edit_info.row1 && kbd_key_infos[len3].col == kbd_edit_info.col1) {
              $("#kbd-advance-key-desc1").css("display", '');
              $("#kbd-advance-key-desc1").css('color', theme_color);
              $("#kbd-advance-key-desc1").text(kbd_key_infos[len3].name);
              break;
            }
          }
          $("#kbd-advance-key-desc-arrow").css('display', '');
          $("#kbd-advance-key-desc-arrow").text(" + ");
          for (let len4 = 0x0; len4 < kbd_key_infos.length; len4++) {
            if (kbd_key_infos[len4].row == kbd_edit_info.row2 && kbd_key_infos[len4].col == kbd_edit_info.col2) {
              $('#kbd-advance-key-desc2').css("display", '');
              $("#kbd-advance-key-desc2").css("color", theme_color);
              $("#kbd-advance-key-desc2").text(kbd_key_infos[len4].name);
              break;
            }
          }
          var flag2 = false;
          for (let len5 = 0x0; len5 < kbd_rs_infos.length; len5++) {
            if (kbd_key_infos[kbd_key_matrix_index].row == kbd_rs_infos[len5].row1 && kbd_key_infos[kbd_key_matrix_index].col == kbd_rs_infos[len5].col1 || kbd_key_infos[kbd_key_matrix_index].row == kbd_rs_infos[len5].row2 && kbd_key_infos[kbd_key_matrix_index].col == kbd_rs_infos[len5].col2) {
              flag2 = true;
              break;
            }
          }
          if (flag2) {
            document.getElementById("kbd-advance-key-delete").disabled = false;
          }
          if (flag) {
            document.getElementById("kbd-advance-key-set").disabled = false;
          }
        }
      } else {
        if (kbd_key_setting_index == 0x1) {
          var flag = true;
          for (let len6 = 0x0; len6 < kbd_mt_infos.length; len6++) {
            if (kbd_edit_info.row == kbd_mt_infos[len6].row && kbd_edit_info.col == kbd_mt_infos[len6].col && kbd_edit_info.tap_time == kbd_mt_infos[len6].tap_time && kbd_edit_info.keyCode1 == kbd_mt_infos[len6].keyCode1 && kbd_edit_info.keyCode2 == kbd_mt_infos[len6].keyCode2) {
              flag = false;
              break;
            }
          }
          $("#kbd-advance-key-desc1").text(kbd_key_infos[kbd_key_matrix_index].name);
          if (kbd_edit_info.keyCode1 > 0x1 && kbd_edit_info.keyCode2 > 0x1) {
            if (kbd_key_infos[kbd_key_matrix_index].row == kbd_edit_info.row && kbd_key_infos[kbd_key_matrix_index].col == kbd_edit_info.col) {
              $("#kbd-advance-key-desc1").text('MT');
              $("#kbd-advance-key-desc-arrow").css("display", 'none');
              $("#kbd-advance-key-desc2").css("display", "none");
              document.getElementById("kbd-advance-key-delete").disabled = false;
            } else {
              $('#kbd-advance-key-desc-arrow').css("display", '');
              $("#kbd-advance-key-desc2").css('display', '');
              $("#kbd-advance-key-desc2").css("color", theme_color);
              $("#kbd-advance-key-desc2").text('MT');
            }
            if (flag) {
              document.getElementById("kbd-advance-key-set").disabled = false;
            }
          }
        } else {
          if (kbd_key_setting_index == 0x3) {
            var flag = true;
            for (let len7 = 0x0; len7 < kbd_dks_infos.length; len7++) {
              if (kbd_edit_info.row == kbd_dks_infos[len7].row && kbd_edit_info.col == kbd_dks_infos[len7].col && kbd_edit_info.keyCode1 == kbd_dks_infos[len7].keyCode1 && kbd_edit_info.state1 == kbd_dks_infos[len7].state1 && kbd_edit_info.keyCode2 == kbd_dks_infos[len7].keyCode2 && kbd_edit_info.state2 == kbd_dks_infos[len7].state2 && kbd_edit_info.keyCode3 == kbd_dks_infos[len7].keyCode3 && kbd_edit_info.state3 == kbd_dks_infos[len7].state3 && kbd_edit_info.keyCode4 == kbd_dks_infos[len7].keyCode4 && kbd_edit_info.state4 == kbd_dks_infos[len7].state4) {
                flag = false;
                break;
              }
            }
            $("#kbd-advance-key-desc1").text(kbd_key_infos[kbd_key_matrix_index].name);
            if (kbd_edit_info.keyCode1 > 0x1 && kbd_edit_info.state1 > 0x0 || kbd_edit_info.keyCode2 > 0x1 && kbd_edit_info.state2 > 0x0 || kbd_edit_info.keyCode3 > 0x1 && kbd_edit_info.state3 > 0x0 || kbd_edit_info.keyCode4 > 0x1 && kbd_edit_info.state4 > 0x0) {
              if (kbd_key_infos[kbd_key_matrix_index].row == kbd_edit_info.row && kbd_key_infos[kbd_key_matrix_index].col == kbd_edit_info.col) {
                $('#kbd-advance-key-desc1').text("DKS");
                $("#kbd-advance-key-desc-arrow").css('display', "none");
                $("#kbd-advance-key-desc2").css('display', "none");
                document.getElementById("kbd-advance-key-delete").disabled = false;
              } else {
                $("#kbd-advance-key-desc-arrow").css('display', '');
                $("#kbd-advance-key-desc2").css('display', '');
                $("#kbd-advance-key-desc2").css('color', theme_color);
                $("#kbd-advance-key-desc2").text("DKS");
              }
              if (flag) {
                document.getElementById("kbd-advance-key-set").disabled = false;
              }
            }
          }
        }
      }
    }
  }
}
function kbd_ui_refresh_advance_key_matrix(client) {
  var value = 0xd;
  if (is_keyboard_5_15(client.device)) {
    value = 0xe;
  }
  var html = "<div class=\"layui-row\" style=\"margin-top: 10px;\">";
  for (let len = 0x0; len < kbd_key_infos.length; len++) {
    var value2 = kbd_key_infos[len].name;
    var value3 = kbd_key_infos[len].rect;
    var x = value3[0x0];
    var value4 = value3[0x1];
    var value5 = value3[0x2];
    var value6 = value3[0x3];
    var value7 = kbd_key_infos[len].row;
    var value8 = kbd_key_infos[len].col;
    var offset = 0x0;
    var value9 = (value5 - offset) / 0x2;
    var str = '';
    for (let index = 0x0; index < kbd_socd_infos.length; index++) {
      if (value7 == kbd_socd_infos[index].row1 && value8 == kbd_socd_infos[index].col1 || value7 == kbd_socd_infos[index].row2 && value8 == kbd_socd_infos[index].col2) {
        str = "SOCD";
        break;
      }
    }
    for (let count = 0x0; count < kbd_mt_infos.length; count++) {
      if (value7 == kbd_mt_infos[count].row && value8 == kbd_mt_infos[count].col) {
        str = 'MT';
        break;
      }
    }
    for (let len2 = 0x0; len2 < kbd_dks_infos.length; len2++) {
      if (value7 == kbd_dks_infos[len2].row && value8 == kbd_dks_infos[len2].col) {
        str = "DKS";
        break;
      }
    }
    for (let len3 = 0x0; len3 < kbd_rs_infos.length; len3++) {
      if (value7 == kbd_rs_infos[len3].row1 && value8 == kbd_rs_infos[len3].col1 || value7 == kbd_rs_infos[len3].row2 && value8 == kbd_rs_infos[len3].col2) {
        str = 'RS';
        break;
      }
    }
    var flag = false;
    if (kbd_key_setting_index == 0x0) {
      if (kbd_select_elementId.length > 0x0) {
        if (str == "SOCD") {
          flag = true;
        }
      }
      if (str == 'MT' || str == 'RS' || str == 'DKS') {
        flag = true;
      }
    } else {
      if (kbd_key_setting_index == 0x2) {
        if (kbd_select_elementId.length > 0x0) {
          if (str == 'RS') {
            flag = true;
          }
        }
        if (str == "SOCD" || str == 'MT' || str == 'DKS') {
          flag = true;
        }
      } else {
        if (kbd_key_setting_index == 0x1) {
          if (str == "SOCD" || str == 'RS' || str == 'DKS') {
            flag = true;
          }
        } else if (kbd_key_setting_index == 0x3) {
          if (str == "SOCD" || str == 'MT' || str == 'RS') {
            flag = true;
          }
        }
      }
    }
    html += "<div class=\"layui-col-xs3\" style=\"width:" + value5 + "px; height:" + value6 + "px; margin-left:" + x + "px; margin-top:" + value4 + "px; \">";
    if (flag) {
      html += "<a kbd-key-matrix-index=\"" + -0x1 + "\"kbd-advance-key-matrix-action=\"select\" style=\"cursor: not-allowed;\">";
      html += "<div style=\"width:" + value5 + "px; height:" + value6 + "px;\">";
      html += "<div style=\"justify-content: center; align-items: center; position: absolute; width:" + value5 + "px; height:" + value6 + "px;\">";
      " ";
    } else {
      html += "<a kbd-key-matrix-index=\"" + len + "\"kbd-advance-key-matrix-action=\"select\" style=\"cursor: pointer;\">";
      html += "<div style=\"width:" + value5 + "px; height:" + value6 + "px;\">";
      html += "<div class=\"layui-hover-bg-trans\" style=\"justify-content: center; align-items: center; position: absolute; width:" + value5 + "px; height:" + value6 + "px;\">";
      " ";
    }
    if (str == "SOCD") {
      offset = 0x8;
      value9 = (value5 - offset) / 0x2;
      if (is_keyboard_5_15(client.device)) {
        html += "<p style=\"user-select: none;font-size: smaller;color:orange;text-align: center; margin-top: 10px;\" >" + str + "</p>";
      } else {
        html += "<p style=\"user-select: none;font-size: small;color:orange;text-align: center; margin-top: 16px;\" >" + str + "</p>";
      }
      html += "<div id=\"key-color\" style=\"background-color: orange; margin-top: 6px; margin-left:" + value9 + "px; width:" + offset + "px; height:" + '2' + "px;\">";
      " ";
    } else {
      if (str == 'MT') {
        offset = 0x8;
        value9 = (value5 - offset) / 0x2;
        if (is_keyboard_5_15(client.device)) {
          html += "<p style=\"user-select: none;font-size: smaller;color:orange;text-align: center; margin-top: 10px;\" >" + str + "</p>";
        } else {
          html += "<p style=\"user-select: none;font-size: small;color:orange;text-align: center; margin-top: 16px;\" >" + str + "</p>";
        }
        html += "<div id=\"key-color\" style=\"background-color: orange; margin-top: 6px; margin-left:" + value9 + "px; width:" + offset + "px; height:" + '2' + "px;\">";
        " ";
      } else {
        if (str == 'RS') {
          offset = 0x8;
          value9 = (value5 - offset) / 0x2;
          if (is_keyboard_5_15(client.device)) {
            html += "<p style=\"user-select: none;font-size: smaller;color:orange;text-align: center; margin-top: 10px;\" >" + str + "</p>";
          } else {
            html += "<p style=\"user-select: none;font-size: small;color:orange;text-align: center; margin-top: 16px;\" >" + str + "</p>";
          }
          html += "<div id=\"key-color\" style=\"background-color: orange; margin-top: 6px; margin-left:" + value9 + "px; width:" + offset + "px; height:" + '2' + "px;\">";
          " ";
        } else if (str == "DKS") {
          offset = 0x8;
          value9 = (value5 - offset) / 0x2;
          if (is_keyboard_5_15(client.device)) {
            html += "<p style=\"user-select: none;font-size: smaller;color:orange;text-align: center; margin-top: 10px;\" >" + str + '</p>';
          } else {
            html += "<p style=\"user-select: none;font-size: small;color:orange;text-align: center; margin-top: 16px;\" >" + str + "</p>";
          }
          html += "<div id=\"key-color\" style=\"background-color: orange; margin-top: 6px; margin-left:" + value9 + "px; width:" + offset + "px; height:" + '2' + "px;\">";
          " ";
        } else {
          if (is_keyboard_5_15(client.device)) {
            html += "<p style=\"user-select: none;font-size: smaller;color:white;text-align: center; margin-top: 10px;\" >" + value2 + "</p>";
          } else {
            html += "<p style=\"user-select: none;font-size: small;color:white;text-align: center; margin-top: 16px;\" >" + value2 + "</p>";
          }
          html += "<div id=\"key-color\" style=\"background-color: transparent; margin-top: 6px; margin-left:" + value9 + "px; width:" + offset + "px; height:" + '2' + "px;\">";
          " ";
        }
      }
    }
    html += "</div>";
    html += "</div>";
    if (kbd_key_setting_index == 0x0) {
      if (str == "SOCD") {
        if (kbd_key_matrix_index == len) {
          html += "<div class=\"layui-key-select-red\" style=\"position: absolute; width:" + (value5 - 0x3) + "px; height:" + (value6 - 0x3) + "px;\">";
          " ";
          html += '</div>';
        }
      }
    } else if (kbd_key_setting_index == 0x2) {
      if (str == 'RS') {
        if (kbd_key_matrix_index == len) {
          html += "<div class=\"layui-key-select-red\" style=\"position: absolute; width:" + (value5 - 0x3) + "px; height:" + (value6 - 0x3) + "px;\">";
          " ";
          html += '</div>';
        }
      }
    } else if (!flag && kbd_key_matrix_index == len) {
      html += "<div class=\"layui-key-select-red\" style=\"position: absolute; width:" + (value5 - 0x3) + "px; height:" + (value6 - 0x3) + "px;\">";
      " ";
      html += "</div>";
    }
    html += "</div>";
    html += '</a>';
    html += '</div>';
    if (len == value) {
      html += "</div><div class=\"layui-row\">";
    }
  }
  ;
  html += "</div>";
  $("#kbd-mapping-advance-key-container").html(html);
}
function kbd_ui_refresh_socd(client) {
  document.getElementById("kbd-socd-key1").style.color = '';
  document.getElementById("kbd-socd-key1").style.borderColor = "gray";
  document.getElementById("kbd-socd-key1").style.backgroundColor = "transparent";
  document.getElementById('kbd-socd-key1').textContent = layui.i18np.prop('STRID_KBD_SOCD_KEY1');
  document.getElementById('kbd-socd-key2').style.color = '';
  document.getElementById('kbd-socd-key2').style.borderColor = 'gray';
  document.getElementById("kbd-socd-key2").style.backgroundColor = "transparent";
  document.getElementById('kbd-socd-key2').textContent = layui.i18np.prop("STRID_KBD_SOCD_KEY2");
  $("[name=\"kbd-socd-type\"]")[0x0].checked = true;
  if (is_dark_theme()) {
    document.getElementById("kbd-socd-key1").className = "layui-btn layui-key-desc-button";
    document.getElementById('kbd-socd-key2').className = "layui-btn layui-key-desc-button";
  } else {
    document.getElementById("kbd-socd-key1").className = "layui-btn layui-key-desc-button-light";
    document.getElementById("kbd-socd-key2").className = "layui-btn layui-key-desc-button-light";
  }
  kbd_edit_info = kbd_create_socd_info();
  if (kbd_key_matrix_index > 0x0) {
    for (let len = 0x0; len < kbd_socd_infos.length; len++) {
      if (kbd_key_infos[kbd_key_matrix_index].row == kbd_socd_infos[len].row1 && kbd_key_infos[kbd_key_matrix_index].col == kbd_socd_infos[len].col1 || kbd_key_infos[kbd_key_matrix_index].row == kbd_socd_infos[len].row2 && kbd_key_infos[kbd_key_matrix_index].col == kbd_socd_infos[len].col2) {
        kbd_edit_info = kbd_clone_socd_info(kbd_socd_infos[len]);
        break;
      }
    }
  }
  if (kbd_edit_info.row1 >= 0x0 && kbd_edit_info.col1 >= 0x0) {
    for (let index = 0x0; index < kbd_key_infos.length; index++) {
      var value = kbd_key_infos[index].name;
      var value2 = kbd_key_infos[index].row;
      var value3 = kbd_key_infos[index].col;
      if (kbd_edit_info.row1 == value2 && kbd_edit_info.col1 == value3) {
        document.getElementById("kbd-socd-key1").textContent = value;
        document.getElementById("kbd-socd-key1").style.borderColor = "#16B777";
        break;
      }
    }
  }
  if (kbd_edit_info.row2 >= 0x0 && kbd_edit_info.col2 >= 0x0) {
    for (let offset = 0x0; offset < kbd_key_infos.length; offset++) {
      var value = kbd_key_infos[offset].name;
      var value2 = kbd_key_infos[offset].row;
      var value3 = kbd_key_infos[offset].col;
      if (kbd_edit_info.row2 == value2 && kbd_edit_info.col2 == value3) {
        document.getElementById('kbd-socd-key2').textContent = value;
        document.getElementById("kbd-socd-key2").style.borderColor = '#16B777';
        break;
      }
    }
  }
  if (kbd_edit_info.socd_mode >= 0x0 && kbd_edit_info.socd_mode < 0x4) {
    $("[name=\"kbd-socd-type\"]")[kbd_edit_info.socd_mode].checked = true;
  }
}
function kbd_ui_refresh_mt(client) {
  kbd_edit_info = kbd_create_mt_info();
  if (kbd_key_matrix_index > 0x0) {
    for (let len = 0x0; len < kbd_mt_infos.length; len++) {
      if (kbd_key_infos[kbd_key_matrix_index].row == kbd_mt_infos[len].row && kbd_key_infos[kbd_key_matrix_index].col == kbd_mt_infos[len].col) {
        kbd_edit_info = kbd_clone_mt_info(kbd_mt_infos[len]);
        break;
      }
    }
  }
  if (kbd_edit_info.keyCode1 > 0x1) {
    document.getElementById("kbd-mt-key1").style.borderColor = "#16B777";
    document.getElementById("kbd-mt-key1").textContent = get_key_name_from_keyid(kbd_edit_info.keyCode1);
  } else {
    document.getElementById("kbd-mt-key1").style.borderColor = "gray";
    document.getElementById('kbd-mt-key1').textContent = layui.i18np.prop('STRID_KBD_MT_SELECT_KEY');
  }
  if (kbd_edit_info.keyCode2 > 0x1) {
    document.getElementById("kbd-mt-key2").style.borderColor = "#16B777";
    document.getElementById('kbd-mt-key2').textContent = get_key_name_from_keyid(kbd_edit_info.keyCode2);
  } else {
    document.getElementById("kbd-mt-key2").style.borderColor = "gray";
    document.getElementById('kbd-mt-key2').textContent = layui.i18np.prop('STRID_KBD_MT_SELECT_KEY');
  }
  if (is_dark_theme()) {
    document.getElementById("kbd-mt-key1").className = "layui-btn layui-key-desc-button";
    document.getElementById('kbd-mt-key2').className = "layui-btn layui-key-desc-button";
  } else {
    document.getElementById("kbd-mt-key1").className = "layui-btn layui-key-desc-button-light";
    document.getElementById("kbd-mt-key2").className = "layui-btn layui-key-desc-button-light";
  }
  var layui2 = layui.slider;
  var value = layui2.render({
    'elem': "#kbd-mt-longpress-time",
    'min': 0x64,
    'max': 0x1f4,
    'step': 0x1,
    'value': kbd_edit_info.tap_time,
    'input': true,
    'tips': false,
    'theme': theme_color,
    'done': function (result) {
      if (result != undefined) {
        kbd_edit_info.tap_time = result;
      }
    }
  });
  value.setValue(kbd_edit_info.tap_time);
}
function kbd_ui_refresh_rs(client) {
  document.getElementById('kbd-rs-key1').style.color = '';
  document.getElementById("kbd-rs-key1").style.borderColor = "gray";
  document.getElementById("kbd-rs-key1").style.backgroundColor = "transparent";
  document.getElementById("kbd-rs-key1").textContent = layui.i18np.prop('STRID_KBD_SOCD_KEY1');
  document.getElementById("kbd-rs-key2").style.color = '';
  document.getElementById('kbd-rs-key2').style.borderColor = "gray";
  document.getElementById('kbd-rs-key2').style.backgroundColor = "transparent";
  document.getElementById("kbd-rs-key2").textContent = layui.i18np.prop("STRID_KBD_SOCD_KEY2");
  if (is_dark_theme()) {
    document.getElementById("kbd-rs-key1").className = "layui-btn layui-key-desc-button";
    document.getElementById('kbd-rs-key2').className = "layui-btn layui-key-desc-button";
  } else {
    document.getElementById("kbd-rs-key1").className = "layui-btn layui-key-desc-button-light";
    document.getElementById("kbd-rs-key2").className = "layui-btn layui-key-desc-button-light";
  }
  kbd_edit_info = kbd_create_rs_info();
  if (kbd_key_matrix_index > 0x0) {
    for (let len = 0x0; len < kbd_rs_infos.length; len++) {
      if (kbd_key_infos[kbd_key_matrix_index].row == kbd_rs_infos[len].row1 && kbd_key_infos[kbd_key_matrix_index].col == kbd_rs_infos[len].col1 || kbd_key_infos[kbd_key_matrix_index].row == kbd_rs_infos[len].row2 && kbd_key_infos[kbd_key_matrix_index].col == kbd_rs_infos[len].col2) {
        kbd_edit_info = kbd_clone_rs_info(kbd_rs_infos[len]);
        break;
      }
    }
  }
  if (kbd_edit_info.row1 >= 0x0 && kbd_edit_info.col1 >= 0x0) {
    for (let index = 0x0; index < kbd_key_infos.length; index++) {
      var value = kbd_key_infos[index].name;
      var value2 = kbd_key_infos[index].row;
      var value3 = kbd_key_infos[index].col;
      if (kbd_edit_info.row1 == value2 && kbd_edit_info.col1 == value3) {
        document.getElementById('kbd-rs-key1').textContent = value;
        document.getElementById("kbd-rs-key1").style.borderColor = '#16B777';
        break;
      }
    }
  }
  if (kbd_edit_info.row2 >= 0x0 && kbd_edit_info.col2 >= 0x0) {
    for (let offset = 0x0; offset < kbd_key_infos.length; offset++) {
      var value = kbd_key_infos[offset].name;
      var value2 = kbd_key_infos[offset].row;
      var value3 = kbd_key_infos[offset].col;
      if (kbd_edit_info.row2 == value2 && kbd_edit_info.col2 == value3) {
        document.getElementById('kbd-rs-key2').textContent = value;
        document.getElementById("kbd-rs-key2").style.borderColor = "#16B777";
        break;
      }
    }
  }
}
function kbd_ui_refresh_dks(client) {
  kbd_edit_info = kbd_create_dks_info();
  if (kbd_key_matrix_index > 0x0) {
    for (let len = 0x0; len < kbd_dks_infos.length; len++) {
      if (kbd_key_infos[kbd_key_matrix_index].row == kbd_dks_infos[len].row && kbd_key_infos[kbd_key_matrix_index].col == kbd_dks_infos[len].col) {
        kbd_edit_info = kbd_clone_dks_info(kbd_dks_infos[len]);
        break;
      }
    }
  }
  if (kbd_edit_info.keyCode1 > 0x1) {
    document.getElementById("kbd-dks-key1").style.borderColor = '#16B777';
    document.getElementById("kbd-dks-key1").textContent = get_key_name_from_keyid(kbd_edit_info.keyCode1);
    kbd_ui_refresh_dks_step(0x1, kbd_edit_info.state1);
  } else {
    document.getElementById("kbd-dks-key1").style.borderColor = 'gray';
    document.getElementById("kbd-dks-key1").textContent = layui.i18np.prop("STRID_KBD_MT_SELECT_KEY");
    kbd_ui_refresh_dks_step(0x1, 0x0);
  }
  if (kbd_edit_info.keyCode2 > 0x1) {
    document.getElementById('kbd-dks-key2').style.borderColor = "#16B777";
    document.getElementById("kbd-dks-key2").textContent = get_key_name_from_keyid(kbd_edit_info.keyCode2);
    kbd_ui_refresh_dks_step(0x2, kbd_edit_info.state2);
  } else {
    document.getElementById('kbd-dks-key2').style.borderColor = "gray";
    document.getElementById('kbd-dks-key2').textContent = layui.i18np.prop("STRID_KBD_MT_SELECT_KEY");
    kbd_ui_refresh_dks_step(0x2, 0x0);
  }
  if (kbd_edit_info.keyCode3 > 0x1) {
    document.getElementById('kbd-dks-key3').style.borderColor = '#16B777';
    document.getElementById("kbd-dks-key3").textContent = get_key_name_from_keyid(kbd_edit_info.keyCode3);
    kbd_ui_refresh_dks_step(0x3, kbd_edit_info.state3);
  } else {
    document.getElementById("kbd-dks-key3").style.borderColor = 'gray';
    document.getElementById("kbd-dks-key3").textContent = layui.i18np.prop('STRID_KBD_MT_SELECT_KEY');
    kbd_ui_refresh_dks_step(0x3, 0x0);
  }
  if (kbd_edit_info.keyCode4 > 0x1) {
    document.getElementById("kbd-dks-key4").style.borderColor = '#16B777';
    document.getElementById("kbd-dks-key4").textContent = get_key_name_from_keyid(kbd_edit_info.keyCode4);
    kbd_ui_refresh_dks_step(0x4, kbd_edit_info.state4);
  } else {
    document.getElementById("kbd-dks-key4").style.borderColor = "gray";
    document.getElementById("kbd-dks-key4").textContent = layui.i18np.prop("STRID_KBD_MT_SELECT_KEY");
    kbd_ui_refresh_dks_step(0x4, 0x0);
  }
  if (is_dark_theme()) {
    document.getElementById("kbd-dks-key1").className = "layui-btn layui-key-desc-button";
    document.getElementById("kbd-dks-key2").className = "layui-btn layui-key-desc-button";
    document.getElementById("kbd-dks-key3").className = "layui-btn layui-key-desc-button";
    document.getElementById("kbd-dks-key4").className = "layui-btn layui-key-desc-button";
  } else {
    document.getElementById("kbd-dks-key1").className = "layui-btn layui-key-desc-button-light";
    document.getElementById("kbd-dks-key2").className = "layui-btn layui-key-desc-button-light";
    document.getElementById('kbd-dks-key3').className = "layui-btn layui-key-desc-button-light";
    document.getElementById("kbd-dks-key4").className = "layui-btn layui-key-desc-button-light";
  }
}
function kbd_ui_refresh_dks_dragging(client, dragIndex) {
  var value = Math.floor(kbd_dks_dragging_name / 0xa);
  var value2 = kbd_dks_dragging_name % 0xa;
  var el = "kbd-dks-key" + value + '-' + value2;
  var el2 = "#kbd-dks-arrow" + value + '-' + value2;
  var value3 = 0x18 + client;
  if (value2 == 0x1) {
    if (value3 >= 0x104) {
      value3 = 0x108;
    }
  } else {
    if (value2 == 0x2) {
      if (value3 >= 0xb4) {
        value3 = 0xb8;
      }
    } else {
      if (value2 == 0x3) {
        if (value3 >= 0x64) {
          value3 = 0x68;
        }
      } else if (value2 == 0x4) {
        value3 = 0x18;
      }
    }
  }
  if (dragIndex) {
    var offset = 0x0;
    if (value == 0x1) {
      offset = kbd_edit_info.state1;
    } else {
      if (value == 0x2) {
        offset = kbd_edit_info.state2;
      } else {
        if (value == 0x3) {
          offset = kbd_edit_info.state3;
        } else if (value == 0x4) {
          offset = kbd_edit_info.state4;
        }
      }
    }
    if (value2 == 0x1) {
      if (value3 < 0x28) {
        value3 = 0x18;
        offset = offset | 0x1;
      } else {
        if (value3 >= 0x28 && value3 < 0x64) {
          value3 = 0x4d;
          offset = offset | 0x1 | 0x2;
        } else {
          if (value3 >= 0x64 && value3 < 0x78) {
            value3 = 0x68;
            offset = offset | 0x1 | 0x2 | 0x4 | 0x8;
          } else {
            if (value3 >= 0x78 && value3 < 0xb4) {
              value3 = 0x9d;
              offset = offset | 0x1 | 0x2 | 0x4 | 0x8 | 0x10;
            } else {
              if (value3 >= 0xb4 && value3 < 0xc8) {
                value3 = 0xb8;
                offset = offset | 0x1 | 0x2 | 0x4 | 0x8 | 0x10 | 0x20 | 0x40;
              } else {
                if (value3 >= 0xc8 && value3 < 0x104) {
                  value3 = 0xed;
                  offset = offset | 0x1 | 0x2 | 0x4 | 0x8 | 0x10 | 0x20 | 0x40 | 0x80;
                } else if (value3 >= 0x104) {
                  value3 = 0x108;
                  offset = offset | 0x1 | 0x2 | 0x4 | 0x8 | 0x10 | 0x20 | 0x40 | 0x80 | 0x100 | 0x200;
                }
              }
            }
          }
        }
      }
    } else {
      if (value2 == 0x2) {
        if (value3 < 0x28) {
          value3 = 0x18;
          offset = offset | 0x8;
        } else {
          if (value3 >= 0x28 && value3 < 0x64) {
            value3 = 0x4d;
            offset = offset | 0x8 | 0x10;
          } else {
            if (value3 >= 0x64 && value3 < 0x78) {
              value3 = 0x68;
              offset = offset | 0x8 | 0x10 | 0x20 | 0x40;
            } else {
              if (value3 >= 0x78 && value3 < 0xb4) {
                value3 = 0x9d;
                offset = offset | 0x8 | 0x10 | 0x20 | 0x40 | 0x80;
              } else if (value3 >= 0xb4 && value3 < 0xc8) {
                value3 = 0xb8;
                offset = offset | 0x8 | 0x10 | 0x20 | 0x40 | 0x80 | 0x100 | 0x200;
              }
            }
          }
        }
      } else {
        if (value2 == 0x3) {
          if (value3 < 0x28) {
            value3 = 0x18;
            offset = offset | 0x40;
          } else {
            if (value3 >= 0x28 && value3 < 0x64) {
              value3 = 0x4d;
              offset = offset | 0x40 | 0x80;
            } else if (value3 >= 0x64 && value3 < 0x78) {
              value3 = 0x68;
              offset = offset | 0x40 | 0x80 | 0x100 | 0x200;
            }
          }
        } else if (value2 == 0x3) {
          value3 = 0x18;
          offset = offset | 0x200;
        }
      }
    }
    if (value == 0x1) {
      kbd_edit_info.state1 = offset;
    } else {
      if (value == 0x2) {
        kbd_edit_info.state2 = offset;
      } else {
        if (value == 0x3) {
          kbd_edit_info.state3 = offset;
        } else if (value == 0x4) {
          kbd_edit_info.state4 = offset;
        }
      }
    }
    kbd_ui_refresh_advance_key_desc(current_usb_client);
  }
  document.getElementById(el).className = 'rounded-border-green';
  $('#' + el).css('width', value3);
  $(el2).css("margin-left", value3 - 0xa);
}
function kbd_ui_refresh_dks_step(client, stepIndex) {
  for (let len = 0x1; len < 0x5; len++) {
    var value = "kbd-dks-key" + client + '-' + len;
    var el = '#kbd-dks-add' + client + '-' + len;
    var value2 = "#kbd-dks-arrow" + client + '-' + len;
    document.getElementById(value).className = "rounded-border";
    $('#' + value).css('width', '20');
    $(el).css('display', '');
    $(value2).css("display", "none");
  }
  if ((stepIndex & 0x1) != 0x0) {
    var value = "kbd-dks-key" + client + '-' + 0x1;
    var el = "#kbd-dks-add" + client + '-' + 0x1;
    var value2 = "#kbd-dks-arrow" + client + '-' + 0x1;
    var value3 = 0x18;
    if ((stepIndex & 0x2) != 0x0) {
      value3 = 0x4e;
      if ((stepIndex & 0x4) != 0x0 && (stepIndex & 0x8) != 0x0) {
        value3 = 0x68;
        if ((stepIndex & 0x10) != 0x0) {
          value3 = 0x9e;
          if ((stepIndex & 0x20) != 0x0 && (stepIndex & 0x40) != 0x0) {
            value3 = 0xb8;
            if ((stepIndex & 0x80) != 0x0) {
              value3 = 0xee;
              if ((stepIndex & 0x100) != 0x0 && (stepIndex & 0x200) != 0x0) {
                value3 = 0x108;
              }
            }
          }
        }
      }
    }
    document.getElementById(value).className = "rounded-border-green";
    $('#' + value).css("width", value3);
    $(value2).css("margin-left", value3 - 0xa);
    $(el).css("display", "none");
    $(value2).css("display", '');
  }
  if ((stepIndex & 0x8) != 0x0) {
    var value = "kbd-dks-key" + client + '-' + 0x2;
    var el = "#kbd-dks-add" + client + '-' + 0x2;
    var value2 = "#kbd-dks-arrow" + client + '-' + 0x2;
    var value3 = 0x18;
    if ((stepIndex & 0x10) != 0x0) {
      value3 = 0x4e;
      if ((stepIndex & 0x20) != 0x0 && (stepIndex & 0x40) != 0x0) {
        value3 = 0x68;
        if ((stepIndex & 0x80) != 0x0) {
          value3 = 0x9e;
          if ((stepIndex & 0x100) != 0x0 && (stepIndex & 0x200) != 0x0) {
            value3 = 0xb8;
          }
        }
      }
    }
    document.getElementById(value).className = "rounded-border-green";
    $('#' + value).css("width", value3);
    $(value2).css("margin-left", value3 - 0xa);
    $(el).css('display', "none");
    $(value2).css("display", '');
  }
  if ((stepIndex & 0x40) != 0x0) {
    var value = "kbd-dks-key" + client + '-' + 0x3;
    var el = "#kbd-dks-add" + client + '-' + 0x3;
    var value2 = "#kbd-dks-arrow" + client + '-' + 0x3;
    var value3 = 0x18;
    if ((stepIndex & 0x80) != 0x0) {
      value3 = 0x4e;
      if ((stepIndex & 0x100) != 0x0 && (stepIndex & 0x200) != 0x0) {
        value3 = 0x68;
      }
    }
    document.getElementById(value).className = "rounded-border-green";
    $('#' + value).css("width", value3);
    $(value2).css("margin-left", value3 - 0xa);
    $(el).css("display", 'none');
    $(value2).css("display", '');
  }
  if ((stepIndex & 0x200) != 0x0) {
    var value = "kbd-dks-key" + client + '-' + 0x4;
    var el = '#kbd-dks-add' + client + '-' + 0x4;
    var value2 = "#kbd-dks-arrow" + client + '-' + 0x4;
    var value3 = 0x18;
    document.getElementById(value).className = "rounded-border-green";
    $('#' + value).css('width', value3);
    $(value2).css('margin-left', value3 - 0xa);
    $(el).css("display", "none");
    $(value2).css("display", '');
  }
}
function kbd_ui_refresh_more(client) {
  $('#kbd-fireware-current-version').text(layui.i18np.prop("STRID_KBD_CURRENT_VERTION") + " " + current_usb_client.device_info.revision);
  $("#kbd-fireware-download").css('display', "none");
  $("#kbd-fireware-new-version-hint").css("display", "none");
}
function kbd_ui_refresh_main_setting(client) {
  $("#kbd-main-setting-key").css('color', '');
  $("#kbd-main-setting-axis").css("color", '');
  $("#kbd-main-setting-advance-key").css("color", '');
  $("#kbd-main-setting-light").css('color', '');
  $("#kbd-main-setting-more").css("color", '');
  if (is_dark_theme()) {
    document.getElementById('kbd-main-setting-key-icon').src = RESOURCE_URL + "setting/kbd/" + "kbd_key_normal.png";
    document.getElementById('kbd-main-setting-axis-icon').src = RESOURCE_URL + "setting/kbd/" + "kbd_axis_normal.png";
    document.getElementById("kbd-main-setting-advance-key-icon").src = RESOURCE_URL + "setting/kbd/" + "kbd_advance_key_normal.png";
    document.getElementById('kbd-main-setting-light-icon').src = RESOURCE_URL + "setting/kbd/" + "kbd_light_normal.png";
    document.getElementById("kbd-main-setting-more-icon").src = RESOURCE_URL + "setting/kbd/" + "kbd_more_normal.png";
  } else {
    document.getElementById("kbd-main-setting-key-icon").src = RESOURCE_URL + 'setting/kbd/light/' + 'kbd_key_normal.png';
    document.getElementById("kbd-main-setting-axis-icon").src = RESOURCE_URL + "setting/kbd/light/" + "kbd_axis_normal.png";
    document.getElementById("kbd-main-setting-advance-key-icon").src = RESOURCE_URL + 'setting/kbd/light/' + "kbd_advance_key_normal.png";
    document.getElementById("kbd-main-setting-light-icon").src = RESOURCE_URL + "setting/kbd/light/" + 'kbd_light_normal.png';
    document.getElementById('kbd-main-setting-more-icon').src = RESOURCE_URL + "setting/kbd/light/" + 'kbd_more_normal.png';
  }
  if (client == 0x0) {
    $("#kbd-main-setting-key").css('color', "#00f6ff");
    document.getElementById("kbd-main-setting-key-icon").src = RESOURCE_URL + "setting/kbd/" + "kbd_key_selected.png";
  } else {
    if (client == 0x1) {
      $("#kbd-main-setting-light").css("color", '#00f6ff');
      document.getElementById("kbd-main-setting-light-icon").src = RESOURCE_URL + "setting/kbd/" + "kbd_light_selected.png";
    } else {
      if (client == 0x2) {
        $("#kbd-main-setting-axis").css('color', "#00f6ff");
        document.getElementById("kbd-main-setting-axis-icon").src = RESOURCE_URL + "setting/kbd/" + "kbd_axis_selected.png";
      } else {
        if (client == 0x3) {
          $("#kbd-main-setting-advance-key").css("color", "#00f6ff");
          document.getElementById("kbd-main-setting-advance-key-icon").src = RESOURCE_URL + "setting/kbd/" + "kbd_advance_key_selected.png";
        } else if (client == 0x4) {
          $("#kbd-main-setting-more").css('color', "#00f6ff");
          document.getElementById('kbd-main-setting-more-icon').src = RESOURCE_URL + "setting/kbd/" + "kbd_more_selected.png";
        }
      }
    }
  }
}
function kbd_update_setting_tab(client, value) {
  $("#kbd-main-setting-key-container").css("display", "none");
  $("#kbd-main-setting-axis-container").css("display", "none");
  $('#kbd-main-setting-advance-key-container').css('display', "none");
  $("#kbd-main-setting-light-container").css("display", "none");
  $("#kbd-main-setting-more-container").css('display', "none");
  var productHex = get_product_id_hex_str(current_usb_client);
  kbd_key_matrix_index = -0x1;
  kbd_matrix_select_keys = [];
  kbd_layer_id = 0x0;
  if (value == 0x0) {
    $("#kbd-mapping-key-container").css("background-image", "url(" + RESOURCE_URL + "product/" + productHex + "/setting.png)");
    $('#kbd-main-setting-key-container').css('display', '');
    $("[name=\"kbd-key-layer\"]")[0x0].checked = true;
    kbd_key_infos.splice(0x0, kbd_key_infos.length);
    var len = client.device_info.kbd_key_infos;
    if (len.length >= kbd_key_num) {
      for (var offset = 0x0; offset < kbd_key_num; offset++) {
        var value2 = len[offset];
        kbd_key_infos.push(kbd_clone_pc_key_info(value2));
      }
    }
    kbd_ui_refresh_key_matrix(client);
    kbd_ui_refresh_key_desc(client);
    layui.element.tabChange("kbd-setting-key-type", 0x0);
  } else {
    if (value == 0x1) {
      $("#kbd-mapping-light-container").css("background-image", "url(" + RESOURCE_URL + 'product/' + productHex + "/setting.png)");
      $("#kbd-main-setting-light-container").css('display', '');
      kbd_edit_info = kbd_clone_light_info(client.device_info.kbd_light_info);
      $('#kbd-light-button-container').css("display", "none");
      kbd_key_infos.splice(0x0, kbd_key_infos.length);
      var len = client.device_info.kbd_key_infos;
      if (len.length >= kbd_key_num) {
        for (var offset = 0x0; offset < kbd_key_num; offset++) {
          var value2 = len[offset];
          kbd_key_infos.push(kbd_clone_pc_key_info(value2));
        }
      }
      kbd_ui_refresh_light_matrix(client);
      layui.element.tabChange("kbd-setting-light-type", 0x0);
    } else {
      if (value == 0x2) {
        $("#kbd-mapping-axis-container").css('background-image', "url(" + RESOURCE_URL + "product/" + productHex + '/setting.png)');
        $('#kbd-main-setting-axis-container').css("display", '');
        kbd_key_infos.splice(0x0, kbd_key_infos.length);
        var len = client.device_info.kbd_key_infos;
        if (len.length >= kbd_key_num) {
          for (var offset = 0x0; offset < kbd_key_num; offset++) {
            var value2 = len[offset];
            kbd_key_infos.push(kbd_clone_pc_key_info(value2));
          }
        }
        kbd_axis_infos.splice(0x0, kbd_axis_infos.length);
        kbd_axis_infos = client.device_info.kbd_axis_infos.slice();
        kbd_ui_refresh_axis_matrix(client);
        kbd_ui_refresh_axis(client);
      } else {
        if (value == 0x3) {
          $('#kbd-mapping-advance-key-container').css('background-image', 'url(' + RESOURCE_URL + "product/" + productHex + "/setting.png)");
          $("#kbd-main-setting-advance-key-container").css('display', '');
          kbd_key_infos.splice(0x0, kbd_key_infos.length);
          var len = client.device_info.kbd_key_infos;
          if (len.length >= kbd_key_num) {
            for (var offset = 0x0; offset < kbd_key_num; offset++) {
              var value2 = len[offset];
              kbd_key_infos.push(kbd_clone_pc_key_info(value2));
            }
          }
          kbd_socd_infos.splice(0x0, kbd_socd_infos.length);
          var len2 = client.device_info.kbd_socd_infos;
          for (var offset = 0x0; offset < len2.length; offset++) {
            var value3 = len2[offset];
            kbd_socd_infos.push(kbd_clone_socd_info(value3));
          }
          kbd_mt_infos.splice(0x0, kbd_mt_infos.length);
          var len3 = client.device_info.kbd_mt_infos;
          for (var offset = 0x0; offset < len3.length; offset++) {
            var value4 = len3[offset];
            kbd_mt_infos.push(kbd_clone_mt_info(value4));
          }
          kbd_rs_infos.splice(0x0, kbd_rs_infos.length);
          var len4 = client.device_info.kbd_rs_infos;
          for (var offset = 0x0; offset < len4.length; offset++) {
            var value5 = len4[offset];
            kbd_rs_infos.push(kbd_clone_rs_info(value5));
          }
          kbd_dks_infos.splice(0x0, kbd_dks_infos.length);
          var len5 = client.device_info.kbd_dks_infos;
          for (var offset = 0x0; offset < len5.length; offset++) {
            kbd_dks_infos.push(kbd_clone_dks_info(len5[offset]));
          }
          if ($("#kbd-setting-dks-container").css("display") != "none") {
            layui.element.tabChange("kbd-setting-advance-key-type", 0x3);
          } else {
            if ($("#kbd-setting-mt-container").css("display") != "none") {
              layui.element.tabChange('kbd-setting-advance-key-type', 0x1);
            } else if ($("#kbd-setting-rs-container").css("display") != "none") {
              layui.element.tabChange("kbd-setting-advance-key-type", 0x2);
            } else {
              layui.element.tabChange("kbd-setting-advance-key-type", 0x0);
            }
          }
        } else if (value == 0x4) {
          $("#kbd-main-setting-more-container").css("display", '');
          kbd_ui_refresh_more(client);
        }
      }
    }
  }
  kbd_ui_refresh_main_setting(value);
}
function kbd_update_key_setting_tab(client, value) {
  $("#kbd-setting-key-base-container").css('display', 'none');
  $('#kbd-setting-function-container').css('display', 'none');
  $("#kbd-setting-macro-container").css("display", 'none');
  kbd_key_setting_index = value;
  if (value == 0x0) {
    $("#kbd-setting-key-base-container").css('display', '');
    kbd_ui_key_setting_init(client);
  } else {
    if (value == 0x1) {
      $("#kbd-setting-function-container").css("display", "flex");
      kbd_ui_function_setting_init(client);
    } else {
      if (value == 0x2) {
        $("#kbd-setting-macro-container").css("display", '');
        kbd_macro_infos.splice(0x0, kbd_macro_infos.length);
        var len = client.device_info.kbd_macro_infos;
        for (var index = 0x0; index < len.length; index++) {
          kbd_macro_infos.push([]);
          var len2 = len[index];
          if (len2.length > 0x0) {
            for (var offset = 0x0; offset < len2.length; offset++) {
              kbd_macro_infos[index].push(clone_macro_info(len2[offset]));
            }
          }
        }
        kbd_macro_select_index = -0x1;
        edit_macros = [];
        kbd_ui_macro_init(client);
        kbd_ui_macro_edit_init(client);
      }
    }
  }
}
function kbd_update_light_setting_tab(client, value) {
  $("#kbd-setting-light-container").css("display", "none");
  $("#kbd-setting-light-box-container").css("display", "none");
  kbd_key_setting_index = value;
  if (value == 0x0) {
    $("#kbd-setting-light-container").css("display", '');
    kbd_ui_refresh_light(client);
  } else if (value == 0x1) {
    $("#kbd-setting-light-box-container").css('display', '');
    kbd_ui_refresh_light_box(client);
  }
}
function kbd_update_advance_key_setting_tab(client, value) {
  $('#kbd-setting-dks-container').css("display", "none");
  $("#kbd-setting-socd-container").css("display", "none");
  $("#kbd-setting-mt-container").css("display", "none");
  kbd_select_elementId = '';
  kbd_key_setting_index = value;
  if (value == 0x0) {
    $("#kbd-setting-socd-container").css('display', '');
    kbd_ui_refresh_socd(client);
  } else {
    if (value == 0x1) {
      $("#kbd-setting-mt-container").css('display', '');
      kbd_ui_refresh_mt(client);
    } else {
      if (value == 0x2) {
        $("#kbd-setting-rs-container").css('display', '');
        kbd_ui_refresh_rs(client);
      } else if (value == 0x3) {
        $("#kbd-setting-dks-container").css("display", '');
        kbd_ui_refresh_dks(client);
      }
    }
  }
  kbd_ui_refresh_advance_key_matrix(client);
  kbd_ui_refresh_advance_key_desc(client);
}
let pressedKeyCodes = [];
let record_mouse_key_delay_timer_id = undefined;
document.addEventListener("keydown", function (result) {
  if (setting_mapping_key_recording) {
    if (pressedKeyCodes.indexOf(result.key) === -0x1) {
      setting_mapping_key_recording_add(result.keyCode);
      pressedKeyCodes.push(result.key);
    }
    result.preventDefault();
  } else {
    if (setting_macro_edit_recording) {
      if (edit_macros.length >= 0xc8) {
        layer.msg(layui.i18np.prop("STRID_SETTING_MAPPING_MACRO_RECORD_MAX_EX"), {
          'icon': 0x0
        }, function () {});
        return;
      }
      var macroInfo = create_macro_info();
      macroInfo.style = 0x16;
      macroInfo.mouse_key_code = result.keyCode;
      macroInfo.mouse_key_event = 0x100;
      const now1 = Date.now();
      macroInfo.mouse_key_time = 0x1;
      if (setting_macro_edit_recording_time != -0x1) {
        edit_macros[edit_macros.length - 0x1].mouse_key_time = $("[name=\"macro-record-fixed-time\"]")[0x0].checked ? 0x32 : now1 - setting_macro_edit_recording_time;
      }
      setting_macro_edit_recording_time = now1;
      macroInfo.name = get_key_name_from_code(macroInfo.mouse_key_code);
      edit_macros.push(macroInfo);
      ui_refresh_mapping_macro_edit(current_usb_client);
    }
  }
});
document.addEventListener('keyup', function (result) {
  if (setting_mapping_key_recording) {
    const value = pressedKeyCodes.indexOf(result.key);
    if (value > -0x1) {
      pressedKeyCodes.splice(value, 0x1);
    }
    result.preventDefault();
  } else {
    if (setting_macro_edit_recording) {
      if (edit_macros.length >= 0xc8) {
        layer.msg(layui.i18np.prop("STRID_SETTING_MAPPING_MACRO_RECORD_MAX_EX"), {
          'icon': 0x0
        }, function () {});
        return;
      }
      var macroInfo = create_macro_info();
      macroInfo.style = 0x16;
      macroInfo.mouse_key_code = result.keyCode;
      macroInfo.mouse_key_event = 0x101;
      const now2 = Date.now();
      macroInfo.mouse_key_time = 0x1;
      if (setting_macro_edit_recording_time != -0x1) {
        edit_macros[edit_macros.length - 0x1].mouse_key_time = $("[name=\"macro-record-fixed-time\"]")[0x0].checked ? 0x32 : now2 - setting_macro_edit_recording_time;
      }
      setting_macro_edit_recording_time = now2;
      macroInfo.name = get_key_name_from_code(macroInfo.mouse_key_code);
      edit_macros.push(macroInfo);
      ui_refresh_mapping_macro_edit(current_usb_client);
    }
  }
});
document.addEventListener("mousedown", function (result) {
  if (kbd_dks_dragging_name.length > 0x0) {
    kbd_dks_Start_x = result.clientX;
    return;
  }
  if (setting_mapping_key_recording) {
    const value = "MouseButton" + result.button;
    if (pressedKeyCodes.indexOf(value) === -0x1) {
      if (result.button == 0x0) {
        record_mouse_key_delay_timer_id = setTimeout(function () {
          setting_mapping_key_recording_add(256);
          record_mouse_key_delay_timer_id = undefined;
        }, 0xc8);
      } else {
        if (result.button == 0x1) {
          setting_mapping_key_recording_add(258);
        } else if (result.button == 0x2) {
          setting_mapping_key_recording_add(257);
        } else {
          setting_mapping_key_recording_add(0xff + result.button + 0x1);
        }
      }
      pressedKeyCodes.push(value);
    }
    if (result.button != 0x0) {
      result.preventDefault();
    }
  } else {
    if (setting_macro_edit_recording) {
      if (edit_macros.length >= 0xc8) {
        layer.msg(layui.i18np.prop('STRID_SETTING_MAPPING_MACRO_RECORD_MAX_EX'), {
          'icon': 0x0
        }, function () {});
        return;
      }
      var i;
      if (result.button == 0x1) {
        i = 258;
      } else if (result.button == 0x2) {
        i = 257;
      } else {
        i = 0xff + result.button + 0x1;
      }
      if (result.button != 0x0) {
        result.preventDefault();
      }
      if (result.button == 0x0) {
        record_mouse_key_delay_timer_id = setTimeout(function (result, evtCode, evtTime) {
          setting_mapping_macro_recording_add(result, evtCode, evtTime);
          record_mouse_key_delay_timer_id = undefined;
        }, 0xc8, i, 0x100, Date.now());
      } else {
        setting_mapping_macro_recording_add(i, 0x100, Date.now());
      }
    }
  }
});
document.addEventListener("mousemove", function (result) {
  if (kbd_dks_dragging_name.length > 0x0) {
    if (result.clientX - kbd_dks_Start_x > 0x5) {
      kbd_dks_dragging = true;
      kbd_ui_refresh_dks_dragging(result.clientX - kbd_dks_Start_x, false);
    }
    return;
  }
});
document.addEventListener("mouseup", function (result) {
  if (kbd_dks_dragging_name.length > 0x0) {
    kbd_ui_refresh_dks_dragging(result.clientX - kbd_dks_Start_x, true);
    kbd_dks_dragging_name = '';
    return;
  }
  if (setting_mapping_key_recording) {
    const value = 'MouseButton' + result.button;
    const value2 = pressedKeyCodes.indexOf(value);
    if (value2 > -0x1) {
      pressedKeyCodes.splice(value2, 0x1);
    }
    if (result.button != 0x0) {
      result.preventDefault();
    }
  } else {
    if (setting_macro_edit_recording) {
      if (edit_macros.length >= 0xc8) {
        layer.msg(layui.i18np.prop("STRID_SETTING_MAPPING_MACRO_RECORD_MAX_EX"), {
          'icon': 0x0
        }, function () {});
        return;
      }
      var i;
      if (result.button == 0x1) {
        i = 258;
      } else if (result.button == 0x2) {
        i = 257;
      } else {
        i = 0xff + result.button + 0x1;
      }
      if (result.button != 0x0) {
        result.preventDefault();
      }
      if (result.button == 0x0) {
        record_mouse_key_delay_timer_id = setTimeout(function (result, evtCode, evtTime) {
          setting_mapping_macro_recording_add(result, evtCode, evtTime);
          record_mouse_key_delay_timer_id = undefined;
        }, 0xc8, i, 0x101, Date.now());
      } else {
        setting_mapping_macro_recording_add(i, 0x101, Date.now());
      }
    }
  }
});
document.addEventListener("mousewheel", function (result) {
  if (current_usb_client != undefined ? is_hs_keyboard(current_usb_client.device) : false) {
    return;
  }
  if (setting_mapping_key_recording) {
    if (result.deltaY < 0x0) {
      setting_mapping_key_recording_add(0x400);
    } else if (result.deltaY > 0x0) {
      setting_mapping_key_recording_add(0x401);
    }
    if (result.deltaX < 0x0) {
      setting_mapping_key_recording_add(0x403);
    } else if (result.deltaX > 0x0) {
      setting_mapping_key_recording_add(0x402);
    }
  } else {
    if (setting_macro_edit_recording) {
      if (macro_keys.length >= 0xc8) {
        layer.msg(layui.i18np.prop("STRID_SETTING_MAPPING_MACRO_RECORD_MAX_EX"), {
          'icon': 0x0
        }, function () {});
        return;
      }
      var flag = false;
      var macroInfo = create_macro_info();
      macroInfo.style = 0x16;
      if (result.deltaY < 0x0) {
        macroInfo.mouse_key_event = 0x20a;
        macroInfo.mouse_key_code = 0x1;
        if (edit_macros.length > 0x0) {
          var value = edit_macros[edit_macros.length - 0x1];
          if (value.mouse_key_event == 0x20a && macroInfo.mouse_key_code * value.mouse_key_code >= 0x0) {
            value.mouse_key_code += macroInfo.mouse_key_code;
            flag = true;
          }
        }
      } else {
        if (result.deltaY > 0x0) {
          macroInfo.mouse_key_event = 0x20a;
          macroInfo.mouse_key_code = -0x1;
          if (edit_macros.length > 0x0) {
            var value = edit_macros[edit_macros.length - 0x1];
            if (value.mouse_key_event == 0x20a && macroInfo.mouse_key_code * value.mouse_key_code >= 0x0) {
              value.mouse_key_code += macroInfo.mouse_key_code;
              flag = true;
            }
          }
        }
      }
      const now3 = Date.now();
      if (!flag) {
        macroInfo.mouse_key_time = 0x1;
        if (setting_macro_edit_recording_time != -0x1) {
          edit_macros[edit_macros.length - 0x1].mouse_key_time = $("[name=\"macro-record-fixed-time\"]")[0x0].checked ? 0x32 : now3 - setting_macro_edit_recording_time;
        }
        setting_macro_edit_recording_time = now3;
        macroInfo.name = get_key_name_from_code(macroInfo.mouse_key_code);
        edit_macros.push(macroInfo);
      } else {
        setting_macro_edit_recording_time = now3;
      }
      ui_refresh_mapping_macro_edit(current_usb_client);
    }
  }
});
function refresh_recorded_mapping_keys() {
  if (setting_mapping_key_recording) {
    var str = '';
    var flag = true;
    if (setting_mapping_keys_recorded[0x0] >= 0x0) {
      str += get_modifier_name_from_code(setting_mapping_keys_recorded[0x0]);
      flag = false;
    }
    if (setting_mapping_keys_recorded[0x1] >= 0x0) {
      if (!flag) {
        str += '+';
      }
      str += get_modifier_name_from_code(setting_mapping_keys_recorded[0x1]);
      flag = false;
    }
    if (setting_mapping_keys_recorded[0x2] >= 0x0) {
      if (!flag) {
        str += '+';
      }
      str += get_key_name_from_code(setting_mapping_keys_recorded[0x2]);
      flag = false;
    }
    layui.$("[name=\"recorded-mapping-key\"]").html(str);
  }
}
function receiver_cannot_pair(device) {
  var layui2 = layui.layer;
  var str = layui.i18np;
  var value = str.prop('STRID_SETTING_MOUSE_CAN_NOT_PAIR_WARNING');
  const displayName1 = get_display_name(current_usb_client);
  const value2 = get_display_name(device);
  layui2.confirm(value.replace("{name1}", displayName1).replace("{name2}", value2), {
    'title': str.prop('STRID_TITLE_WARNING'),
    'skin': 'layui-layer-confirm',
    'btn': [str.prop("STRID_BUTTON_CANCEL")],
    'btnAlign': 'c',
    'btn1': function () {
      layui2.closeLast(0x0);
    }
  });
}
function receiver_pair(client) {
  var layui2 = layui.layer;
  var str = layui.i18np;
  var value = str.prop("STRID_SETTING_MOUSE_PAIR_WARNING");
  const displayName2 = get_display_name(current_usb_client);
  const value2 = get_display_name(client);
  layui2.confirm(value.replace('{name1}', displayName2).replace("{name2}", value2), {
    'title': str.prop("STRID_TITLE_WARNING"),
    'skin': "layui-layer-confirm",
    'btn': [str.prop("STRID_SETTING_MOUSE_PAIR_S"), str.prop("STRID_BUTTON_CANCEL")],
    'btnAlign': 'c',
    'btn1': function () {
      layui2.closeLast(0x0);
      if (current_usb_client != undefined) {
        current_usb_client.pause = true;
        send_event_set_esb_addr(current_usb_client, get_esb_addr(client.device_info, 0xff), get_default_rf_channel(client), is_slow_receiver(client));
        if (current_usb_client.virtual) {
          send_event_action(current_usb_client, 0x33, 0x0);
        }
        current_usb_client.pause = false;
        post_send_client_data(current_usb_client);
      }
    },
    'btn2': function () {
      layui2.closeLast(0x0);
    }
  });
}
function receiver_unpair(client) {
  var layui2 = layui.layer;
  var str = layui.i18np;
  if (is_light(client)) {
    var value = str.prop("STRID_SETTING_MOUSE_UNPAIR_WARNING");
    const displayName3 = get_display_name(current_usb_client);
    const value2 = get_display_name(client);
    layui2.confirm(value.replace("{name1}", displayName3).replace("{name2}", value2), {
      'title': str.prop("STRID_TITLE_WARNING"),
      'skin': 'layui-layer-confirm',
      'btn': [str.prop('STRID_SETTING_MOUSE_UNPAIR_S'), str.prop("STRID_SETTING_LIGHT"), str.prop("STRID_BUTTON_CANCEL")],
      'btnAlign': 'c',
      'btn1': function () {
        layui2.closeLast(0x0);
        if (current_usb_client != undefined) {
          current_usb_client.pause = true;
          send_event_clear_esb_addr(current_usb_client, get_esb_addr(client.device_info, 0xff));
          if (current_usb_client.virtual) {
            send_event_action(current_usb_client, 0x33, 0x0);
          }
          current_usb_client.pause = false;
          post_send_client_data(current_usb_client);
        }
      },
      'btn2': function () {
        layui2.closeLast(0x0);
        current_usb_receiver = client;
        $("[name=\"receiver-light-mode\"]")[current_usb_receiver.device_info.light % 0x3].checked = true;
        layui.form.render('radio');
        layui2.open({
          'type': 0x1,
          'title': str.prop("STRID_SETTING_LIGHT"),
          'content': $('#receiver-light-setting-panel'),
          'btn': [str.prop("STRID_CLOSE")],
          'btnAlign': 'c',
          'btn1': function () {
            layui2.closeLast(0x0);
          }
        });
      },
      'btn3': function () {
        layui2.closeLast(0x0);
      }
    });
  } else {
    var value = str.prop("STRID_SETTING_MOUSE_UNPAIR_WARNING");
    const displayName4 = get_display_name(current_usb_client);
    const value3 = get_display_name(client);
    layui2.confirm(value.replace("{name1}", displayName4).replace("{name2}", value3), {
      'title': str.prop("STRID_TITLE_WARNING"),
      'skin': "layui-layer-confirm",
      'btn': [str.prop("STRID_SETTING_MOUSE_UNPAIR_S"), str.prop("STRID_BUTTON_CANCEL")],
      'btnAlign': 'c',
      'btn1': function () {
        layui2.closeLast(0x0);
        if (current_usb_client != undefined) {
          current_usb_client.pause = true;
          send_event_clear_esb_addr(current_usb_client, get_esb_addr(client.device_info, 0xff));
          if (current_usb_client.virtual) {
            send_event_action(current_usb_client, 0x33, 0x0);
          }
          current_usb_client.pause = false;
          post_send_client_data(current_usb_client);
        }
      },
      'btn2': function () {
        layui2.closeLast(0x0);
      }
    });
  }
}
function receiver_unpair_switch(client) {
  var layui2 = layui.layer;
  var str = layui.i18np;
  var value = str.prop("STRID_SETTING_MOUSE_UNPAIR_WARNING");
  const displayName5 = get_display_name(current_usb_client);
  const value2 = get_display_name(client);
  layui2.confirm(value.replace('{name1}', displayName5).replace("{name2}", value2), {
    'title': str.prop('STRID_TITLE_WARNING'),
    'skin': "layui-layer-confirm",
    'btn': [str.prop("STRID_SETTING_MOUSE_UNPAIR_S"), str.prop('STRID_SETTING_MOUSE_PAIRED_SELECT_S'), str.prop("STRID_BUTTON_CANCEL")],
    'btnAlign': 'c',
    'btn1': function () {
      layui2.closeLast(0x0);
      if (current_usb_client != undefined) {
        current_usb_client.pause = true;
        send_event_clear_esb_addr(current_usb_client, get_esb_addr(client.device_info, 0xff));
        current_usb_client.pause = false;
        post_send_client_data(current_usb_client);
      }
    },
    'btn2': function () {
      layui2.closeLast(0x0);
      if (current_usb_client != undefined) {
        current_usb_client.pause = true;
        send_event_select_esb_addr(current_usb_client, get_esb_addr(client.device_info, 0xff));
        if (current_usb_client.virtual) {
          send_event_action(current_usb_client, 0x33, 0x0);
        }
        current_usb_client.pause = false;
        post_send_client_data(current_usb_client);
        var isSelected = undefined;
        usb_client_list.forEach(item => {
          if (item.virtual && item.device == client.device) {
            isSelected = item;
          }
        });
        if (isSelected != undefined) {
          setTimeout(function (result) {
            send_event_query(result);
          }, 0xbb8, isSelected);
        }
      }
    },
    'btn3': function () {
      layui2.closeLast(0x0);
    }
  });
}
apply_theme();
layui.config({
  'base': RESOURCE_URL + "i18n/extend-202510170047/"
}).extend({
  'mod': "i18np"
});
function close_all_layer() {
  var layui2 = layui.layer;
  if (macro_edit_panel_id != undefined) {
    layui2.close(macro_edit_panel_id);
  }
  if (macro_record_panel_id != undefined) {
    layui2.close(macro_record_panel_id);
  }
  if (key_record_panel_id != undefined) {
    layui2.close(key_record_panel_id);
  }
  if (select_key_panel_id != undefined) {
    layui2.close(select_key_panel_id);
  }
}
layui.use(['form', "layer", 'util', "i18np", "table"], function () {
  var layui2 = layui.form;
  var el = layui.layer;
  var layui3 = layui.util;
  var layui4 = layui.$;
  var str = layui.i18np;
  str.loadProperties(RESOURCE_URL);
  layui2.on("select(language)", function (result) {
    layui.data("lang", {
      'key': 'name',
      'value': result.value
    });
    str.loadProperties(RESOURCE_URL);
    layui2.render("checkbox");
    if (pair_panel_id >= 0x0) {
      el.style(pair_panel_id, {
        'left': (window.innerWidth - layui4("[id=pair-panel]").width()) / 0x2 + 'px'
      });
    }
    if (not_support_id >= 0x0) {
      el.style(not_support_id, {
        'left': (window.innerWidth - layui4("[id=not-support-panel]").width()) / 0x2 + 'px'
      });
    }
    request_device_cfg();
    setTimeout(function () {
      pc_key_manager_init();
      if (current_usb_client != undefined) {
        setting_mapping_init(current_usb_client);
        ui_refresh_mapping_key(current_usb_client);
        if (current_usb_client.device_info != undefined && current_usb_client.device_info.revision != undefined && current_usb_client.device_info.revision.substr(0x0, 0x2) == 'G-') {
          layui4("[name=\"setting-fw-channel\"]")[0x1].checked = true;
        } else {
          layui4("[name=\"setting-fw-channel\"]")[0x0].checked = true;
        }
        layui4("[name=\"setting-fw-channel\"]")[0x0].disabled = !current_usb_client.device_info.dynamicGOM;
        layui4("[name=\"setting-fw-channel\"]")[0x1].disabled = !current_usb_client.device_info.dynamicGOM;
        layui.form.render("radio");
      }
      window.postMessage({
        'action': ACTION_UI_REFRESH_CURRENT_CLIENT
      });
      clearTimeout(resize_timer_id);
      resize_timer_id = setTimeout(do_resize, RESIZE_DEBOUNCE_MS);
    }, 0x3e8);
  });
  var layui5 = layui.data('lang').name;
  layui4("select[name=language]")[0x0].value = layui5;
  layui4("[name=\"dark-theme\"]").prop("checked", is_dark_theme());
  layui2.on("switch(dark-theme)", function (result) {
    if (result.elem.checked) {
      layui.data("theme", {
        'key': "style",
        'value': "dark"
      });
    } else {
      layui.data("theme", {
        'key': 'style',
        'value': 'light'
      });
    }
    apply_theme();
    if (navigator.hid != undefined) {
      window.postMessage({
        'action': ACTION_UI_REFRESH_CLIENT_LIST
      });
      window.postMessage({
        'action': ACTION_UI_REFRESH_CURRENT_CLIENT
      });
    }
  });
  request_device_cfg();
  pc_key_manager_init();
  ui_refresh_client_list();
  layui3.countdown(new Date(0xbb7, 0x0, 0x1).getTime(), new Date().getTime(), function (result, data, timer) {
    start();
  });
  if (navigator.hid == undefined) {
    not_support_id = el.open({
      'type': 0x1,
      'title': false,
      'skin': "layui-layer-panel",
      'shade': 0x0,
      'closeBtn': 0x0,
      'anim': -0x1,
      'shadeClose': false,
      'resize': false,
      'scrollbar': false,
      'zIndex': 0x64,
      'content': layui4("#not-support-panel")
    });
  }
  layui3.on("pair-action", {
    'pair': async function () {
      layui4("#pair-device").css("display", "none");
      layui4("#pairing-waiting").css('display', '');
      layui4("#pairing-tips").css("display", '');
      navigator.hid.requestDevice({
        'filters': [{
          'vendorId': 0x1915
        }]
      }).then(len => {
        window.postMessage({
          'action': ACTION_REFRESH_CLIENT_LIST
        });
        if (len.length == 0x0) {
          layui4('#pair-device').css("display", '');
          layui4("#pairing-waiting").css("display", "none");
          layui4("#pairing-tips").css("display", 'none');
        }
      }).catch(err => {
        log_r(err);
      });
    },
    'pair-more': async function () {
      navigator.hid.requestDevice({
        'filters': [{
          'vendorId': 0x1915
        }]
      }).then(result => {
        window.postMessage({
          'action': ACTION_REFRESH_CLIENT_LIST
        });
      }).catch(err => {
        log_r(err);
      });
    },
    'refresh': async function () {
      usb_client_list.forEach(item => {
        if (item.virtual) {
          send_event_query(item);
        }
      });
      var layui6 = layui.layer;
      if (loading_id < 0x0) {
        loading_id = layui6.load(0x0);
        setTimeout(function () {
          layui6.close(loading_id);
          loading_id = -0x1;
        }, ESB_ALIVE_TIMEOUT_MS);
      }
    }
  });
  layui3.on("current-action", {
    'edit': async function () {
      editing = true;
      combination_key_index = 0x0;
      onboard_config_index = current_usb_client.device_info.onboardIndex;
      setting_mapping_init(current_usb_client);
      select_mapping_type(current_usb_client, 0x3);
      window.postMessage({
        'action': ACTION_UI_REFRESH_CLIENT_LIST
      });
      window.postMessage({
        'action': ACTION_UI_REFRESH_CURRENT_CLIENT
      });
      clearTimeout(resize_timer_id);
      resize_timer_id = setTimeout(do_resize, RESIZE_DEBOUNCE_MS);
    }
  });
  layui3.on("list-action", {
    'select': async function () {
      current_usb_client = get_usb_client(this.getAttribute('usb-client-id'));
      editing = false;
      close_all_layer();
      if (tips_panel_id >= 0x0) {
        el.close(tips_panel_id);
        tips_panel_id = -0x1;
      }
      update_setting_x_polling();
      if (current_usb_client.device_info != undefined && current_usb_client.device_info.revision != undefined && current_usb_client.device_info.revision.substr(0x0, 0x2) == 'G-') {
        layui4("[name=\"setting-fw-channel\"]")[0x1].checked = true;
      } else {
        layui4("[name=\"setting-fw-channel\"]")[0x0].checked = true;
      }
      layui4("[name=\"setting-fw-channel\"]")[0x0].disabled = !current_usb_client.device_info.dynamicGOM;
      layui4("[name=\"setting-fw-channel\"]")[0x1].disabled = !current_usb_client.device_info.dynamicGOM;
      layui.form.render("radio");
      window.postMessage({
        'action': ACTION_UI_REFRESH_CLIENT_LIST
      });
      window.postMessage({
        'action': ACTION_UI_REFRESH_CURRENT_CLIENT
      });
    }
  });
  layui3.on("receiver-action", {
    'select': async function () {
      var client = get_usb_client(this.getAttribute("usb-client-id"));
      if (current_usb_client != undefined && current_usb_client.helloed) {
        if (!is_soc_compatible(current_usb_client, client)) {
          receiver_cannot_pair(client);
        } else {
          var esbChannel = current_usb_client.product_esb_ch == 0xff ? current_usb_client.device_info.esbChannel : current_usb_client.product_esb_ch;
          var value = is_esb_addr_arr_existed(current_usb_client.device_info, esbChannel, get_esb_addr(client.device_info, esbChannel));
          if (!value) {
            receiver_pair(client);
          } else {
            var value2 = get_esb_addr_arr(current_usb_client.device_info, esbChannel) == get_esb_addr(client.device_info, esbChannel);
            if (value2) {
              receiver_unpair(client);
            } else {
              receiver_unpair_switch(client);
            }
          }
        }
      }
    }
  });
  layui3.on("color-action", {
    'select': async function () {
      var attr = this.getAttribute("color-code");
      send_event_set_color_code(current_usb_client, attr);
    }
  });
  layui3.on("firmware-action", {
    'click': async function () {
      var layui7 = layui.layer;
      var layui8 = layui.i18np;
      layui7.confirm(layui8.prop('STRID_WEBHUB_NEW_FIRMWARE_INFO'), {
        'title': layui8.prop('STRID_TITLE_WARNING'),
        'btn': [layui8.prop("STRING_OK")],
        'btnAlign': 'c',
        'btn1': function () {
          layui7.closeLast(0x0);
        }
      });
    }
  });
  layui3.on('download-action', {
    'download': async function () {
      el.open({
        'type': 0x1,
        'title': false,
        'offset': 'rt',
        'id': "ID-download-panel-rt",
        'content': layui4("#download-panel"),
        'closeBtn': false,
        'shade': true,
        'shadeClose': true,
        'anim': 'slideDown'
      });
    }
  });
  layui3.on("setting-action", {
    'back': async function () {
      editing = false;
      close_all_layer();
      window.postMessage({
        'action': ACTION_UI_REFRESH_CLIENT_LIST
      });
      window.postMessage({
        'action': ACTION_UI_REFRESH_CURRENT_CLIENT
      });
    }
  });
  layui2.on("checkbox(dpi-both-x-y)", function (result) {
    var resolution = current_usb_client.device_info.resolution;
    var value3 = resolution & 0xffff;
    var value4 = resolution >> 0x10 & 0xffff;
    if (result.elem.checked) {
      if (value4 == 0x0) {
        value4 = value3;
        set_cpi(current_usb_client, value3 | value4 << 0x10);
        var cpiLevels = current_usb_client.device_info.cpiLevels;
        for (var offset = 0x0; offset < cpiLevels.length; offset++) {
          value3 = cpiLevels[offset] & 0xffff;
          value4 = value3;
          set_cpi_level(current_usb_client, offset, value3 | value4 << 0x10, offset == cpiLevels.length - 0x1);
        }
      }
    } else {
      if (value4 != 0x0) {
        value4 = 0x0;
        set_cpi(current_usb_client, value3 | value4 << 0x10);
        var cpiLevels = current_usb_client.device_info.cpiLevels;
        for (var offset = 0x0; offset < cpiLevels.length; offset++) {
          value3 = cpiLevels[offset] & 0xffff;
          value4 = 0x0;
          set_cpi_level(current_usb_client, offset, value3 | value4 << 0x10, offset == cpiLevels.length - 0x1);
        }
      }
    }
    window.postMessage({
      'action': ACTION_UI_REFRESH_SETTING
    });
  });
  layui2.on("checkbox(glass-mode)", function (result) {
    set_enable_glass_mode(current_usb_client, result.elem.checked);
  });
  layui2.on("switch(x-polling)", function (result) {
    if (result.elem.checked) {
      localStorage.setItem("setting-x-polling", 0x1);
    } else {
      localStorage.setItem("setting-x-polling", 0x0);
    }
    window.postMessage({
      'action': ACTION_UI_REFRESH_SETTING
    });
  });
  layui3.on('dpi-level-edit-action', {
    'edit': async function () {
      if (cpi_level_editing) {
        cpi_level_editing = false;
      } else {
        cpi_level_editing = true;
      }
      window.postMessage({
        'action': ACTION_UI_REFRESH_SETTING
      });
    }
  });
  layui3.on('dpi-level-add-action', {
    'edit': async function () {
      var resolution2 = current_usb_client.device_info.resolution;
      var isXY1 = (resolution2 >> 0x10 & 0xffff) > 0x0;
      var arr = current_usb_client.device_info.cpiLevels;
      var firstItem = arr[0x0];
      arr.forEach(item2 => {
        if (item2 > firstItem) {
          firstItem = item2;
        }
      });
      var value5 = firstItem & 0xffff;
      var value6 = firstItem >> 0x10 & 0xffff;
      if (isXY1 && value6 == 0x0) {
        value6 = value5;
      }
      cpi_level_index = -0x1;
      ui_refresh_dpi_input_panel(current_usb_client, value5 + 0x32, value6 + 0x32, 0x0, isXY1);
      el.open({
        'type': 0x1,
        'title': str.prop("STRID_SETTING_DPI_SPEED"),
        'skin': "layui-layer-confirm",
        'btn': [str.prop('STRING_OK'), str.prop("STRING_CANCEL")],
        'btnAlign': 'c',
        'content': layui4("#dpi-level-input-panel"),
        'btn1': function () {
          el.closeLast(0x0);
          var cpiRange = get_cpi_range(current_usb_client);
          var cpiStep1 = get_cpi_step(current_usb_client);
          var resolution3 = current_usb_client.device_info.resolution;
          var isXY2 = (resolution3 >> 0x10 & 0xffff) > 0x0;
          var value7 = 0x32;
          if (isXY2) {
            var value8 = cpiStep1 * (layui4("#x-dpi-level-input").val() / cpiStep1);
            if (value8 < cpiRange[0x0]) {
              value8 = cpiRange[0x1];
            }
            if (value8 > cpiRange[0x1]) {
              value8 = cpiRange[0x1];
            }
            var value9 = cpiStep1 * (layui4("#y-dpi-level-input").val() / cpiStep1);
            if (value9 < cpiRange[0x0]) {
              value9 = cpiRange[0x1];
            }
            if (value9 > cpiRange[0x1]) {
              value9 = cpiRange[0x1];
            }
            value7 = (value9 << 0x10) + value8;
          } else {
            value7 = cpiStep1 * (layui4("#dpi-level-input").val() / cpiStep1);
            if (value7 < cpiRange[0x0]) {
              value7 = cpiRange[0x1];
            }
            if (value7 > cpiRange[0x1]) {
              value7 = cpiRange[0x1];
            }
          }
          add_cpi_level(current_usb_client, value7, cpi_level_light);
          window.postMessage({
            'action': ACTION_UI_REFRESH_SETTING
          });
        },
        'btn2': function () {
          el.closeLast(0x0);
        }
      });
    }
  });
  layui3.on("cpi-level-action", {
    'select': async function () {
      cpi_level_index = this.getAttribute('cpi-level-index');
      if (cpi_level_editing) {
        var resolution4 = current_usb_client.device_info.resolution;
        var isXY3 = (resolution4 >> 0x10 & 0xffff) > 0x0;
        var cpiLevels2 = current_usb_client.device_info.cpiLevels;
        var cpiLevelColors = current_usb_client.device_info.cpiLevelColors;
        var value10 = cpiLevels2[cpi_level_index];
        var value11 = value10 & 0xffff;
        var value12 = value10 >> 0x10 & 0xffff;
        if (isXY3 && value12 == 0x0) {
          value12 = value11;
        }
        ui_refresh_dpi_input_panel(current_usb_client, value11, value12, cpiLevelColors[cpi_level_index], isXY3);
        el.open({
          'type': 0x1,
          'title': str.prop("STRID_SETTING_DPI_SPEED"),
          'skin': "layui-layer-confirm",
          'btn': [str.prop("STRID_SETTING_MAPPING_DELETE"), str.prop('STRING_OK'), str.prop("STRING_CANCEL")],
          'btnAlign': 'c',
          'content': layui4("#dpi-level-input-panel"),
          'btn1': function () {
            el.closeLast(0x0);
            remove_cpi_level(current_usb_client, cpi_level_index);
            window.postMessage({
              'action': ACTION_UI_REFRESH_SETTING
            });
          },
          'btn2': function () {
            el.closeLast(0x0);
            var cpiRange2 = get_cpi_range(current_usb_client);
            var cpiStep2 = get_cpi_step(current_usb_client);
            var resolution5 = current_usb_client.device_info.resolution;
            var isXY4 = (resolution5 >> 0x10 & 0xffff) > 0x0;
            var value13 = 0x32;
            if (isXY4) {
              var value14 = cpiStep2 * (layui4("#x-dpi-level-input").val() / cpiStep2);
              if (value14 < cpiRange2[0x0]) {
                value14 = cpiRange2[0x1];
              }
              if (value14 > cpiRange2[0x1]) {
                value14 = cpiRange2[0x1];
              }
              var value15 = cpiStep2 * (layui4('#y-dpi-level-input').val() / cpiStep2);
              if (value15 < cpiRange2[0x0]) {
                value15 = cpiRange2[0x1];
              }
              if (value15 > cpiRange2[0x1]) {
                value15 = cpiRange2[0x1];
              }
              value13 = (value15 << 0x10) + value14;
            } else {
              value13 = cpiStep2 * (layui4("#dpi-level-input").val() / cpiStep2);
              if (value13 < cpiRange2[0x0]) {
                value13 = cpiRange2[0x1];
              }
              if (value13 > cpiRange2[0x1]) {
                value13 = cpiRange2[0x1];
              }
            }
            set_cpi_level(current_usb_client, cpi_level_index, value13);
            set_cpi_level_color(current_usb_client, cpi_level_index, cpi_level_light);
            window.postMessage({
              'action': ACTION_UI_REFRESH_SETTING
            });
          },
          'btn3': function () {
            el.closeLast(0x0);
          }
        });
      } else {
        var resolution4 = current_usb_client.device_info.resolution;
        var value16 = resolution4 >> 0x10 & 0xffff;
        var cpiLevels3 = current_usb_client.device_info.cpiLevels;
        var value17 = cpiLevels3[cpi_level_index];
        if (value16 == 0x0) {
          value17 = value17 & 0xffff;
        }
        set_cpi(current_usb_client, value17);
      }
      window.postMessage({
        'action': ACTION_UI_REFRESH_SETTING
      });
    }
  });
  layui3.on('dpi-level-color-action', {
    'select': async function () {
      var attr2 = this.getAttribute("color-code");
      var light = current_usb_client.device_info.light;
      var value18 = light;
      if (attr2 == 'white') {
        value18 = light & -8 | 4 | 2 | 1;
      } else {
        if (attr2 == "red") {
          value18 = light & -8 | 4;
        } else {
          if (attr2 == 'green') {
            value18 = light & -8 | 2;
          } else {
            if (attr2 == "blue") {
              value18 = light & -8 | 1;
            } else {
              if (attr2 == "yellow") {
                value18 = light & -8 | 4 | 2;
              } else {
                if (attr2 == "purple") {
                  value18 = light & -8 | 4 | 1;
                } else {
                  if (attr2 == "skyblue") {
                    value18 = light & -8 | 2 | 1;
                  } else if (attr2 == "none") {
                    value18 = light & -8;
                  }
                }
              }
            }
          }
        }
      }
      light = value18 | 8;
      var resolution6 = current_usb_client.device_info.resolution;
      var isXY5 = (resolution6 >> 0x10 & 0xffff) > 0x0;
      var offset2 = 0x0;
      var offset3 = 0x0;
      if (isXY5) {
        offset2 = layui4("#x-dpi-level-input").val();
        offset3 = layui4("#y-dpi-level-input").val();
      } else {
        offset2 = layui4("#dpi-level-input").val();
        offset3 = 0x0;
      }
      ui_refresh_dpi_input_panel(current_usb_client, offset2, offset3, light, isXY5);
    }
  });
  layui2.on("radio(setting-polling-rates)", function (result) {
    var value19 = result.elem;
    var value20 = value19.value;
    set_polling_rate(current_usb_client, value20);
    window.postMessage({
      'action': ACTION_UI_REFRESH_SETTING
    });
  });
  layui2.on("checkbox(light-auto-off)", function (result) {
    var light2 = current_usb_client.device_info.light;
    if (result.elem.checked) {
      set_light(current_usb_client, light2 | 32);
    } else {
      set_light(current_usb_client, light2 & -33);
    }
  });
  layui2.on('radio(light-mode)', function (result) {
    var value21 = result.elem;
    var value22 = value21.value;
    var light3 = current_usb_client.device_info.light;
    if (value22 == 0x1) {
      set_light(current_usb_client, (light3 | 64) & -17);
    } else {
      if (value22 == 0x2) {
        set_light(current_usb_client, light3 & -65 & -17);
      } else if (value22 == 0x3) {
        set_light(current_usb_client, (light3 | 16) & -65);
      }
    }
    window.postMessage({
      'action': ACTION_UI_REFRESH_SETTING
    });
  });
  layui3.on("light-color-action", {
    'select': async function () {
      var attr3 = this.getAttribute("color-code");
      var light4 = current_usb_client.device_info.light;
      if (attr3 == "white") {
        set_light(current_usb_client, light4 & -8 | 4 | 2 | 1);
      } else {
        if (attr3 == "red") {
          set_light(current_usb_client, light4 & -8 | 4);
        } else {
          if (attr3 == "green") {
            set_light(current_usb_client, light4 & -8 | 2);
          } else {
            if (attr3 == "blue") {
              set_light(current_usb_client, light4 & -8 | 1);
            } else {
              if (attr3 == "yellow") {
                set_light(current_usb_client, light4 & -8 | 4 | 2);
              } else {
                if (attr3 == "purple") {
                  set_light(current_usb_client, light4 & -8 | 4 | 1);
                } else {
                  if (attr3 == "skyblue") {
                    set_light(current_usb_client, light4 & -8 | 2 | 1);
                  } else if (attr3 == "none") {
                    set_light(current_usb_client, light4 & -8);
                  }
                }
              }
            }
          }
        }
      }
      window.postMessage({
        'action': ACTION_UI_REFRESH_SETTING
      });
    }
  });
  layui2.on("radio(setting-power-modes)", function (result) {
    var value23 = result.elem;
    var value24 = value23.value;
    set_power_mode(current_usb_client, value24);
  });
  layui2.on("radio(setting-lods)", function (result) {
    var value25 = result.elem;
    var value26 = value25.value;
    set_lod(current_usb_client, value26);
  });
  layui2.on("switch(setting-angle-snapping)", function (result) {
    set_angle_snapping(current_usb_client, result.elem.checked ? 0x1 : 0x0);
  });
  layui2.on('switch(setting-ripple-control)', function (result) {
    set_ripple_control(current_usb_client, result.elem.checked ? 0x1 : 0x0);
  });
  layui2.on("switch(setting-motion-sync)", function (result) {
    set_motion_sync(current_usb_client, result.elem.checked ? 0x1 : 0x0);
  });
  layui2.on("switch(setting-wireless-turbo)", function (result) {
    if (result.elem.checked) {
      set_wireless_turbo(current_usb_client, 0x1);
      layui4("[name=\"setting-rf-channel\"]").prop('disabled', false);
    } else {
      set_wireless_turbo(current_usb_client, 0x0);
      layui4("[name=\"setting-rf-channel\"]").prop('disabled', true);
    }
  });
  layui2.on("radio(setting-rf-channel)", function (result) {
    var value27 = result.elem;
    var value28 = value27.value;
    if (value28 == -0x1) {
      send_event_set_auto_hop(current_usb_client, true);
    } else {
      if (current_usb_client.device_info.hopChannelSupported) {
        send_event_set_auto_hop(current_usb_client, false);
      }
      if (value28 == 0x2) {
        send_event_set_rf_channel(current_usb_client, 0x2);
      } else {
        if (value28 == 0x28) {
          send_event_set_rf_channel(current_usb_client, 0x28);
        } else if (value28 == 0x50) {
          send_event_set_rf_channel(current_usb_client, 0x50);
        }
      }
    }
    var html = '';
    if (value28 == -0x1) {
      html += layui.i18np.prop("STRID_SETTING_RF_CHANNEL_AUTO");
      html += ": " + layui.i18np.prop('STRID_SETTING_RF_CHANNEL_AUTO_TIPS');
    } else {
      if (current_usb_client.device_info.rfChannel == 0x2) {
        html += layui.i18np.prop("STRID_SETTING_RF_CHANNEL_2");
        html += ": " + layui.i18np.prop('STRID_SETTING_RF_CHANNEL_2_TIPS');
      } else {
        if (current_usb_client.device_info.rfChannel == 0x28) {
          html += layui.i18np.prop("STRID_SETTING_RF_CHANNEL_40");
          html += ": " + layui.i18np.prop('STRID_SETTING_RF_CHANNEL_40_TIPS');
        } else if (current_usb_client.device_info.rfChannel == 0x50) {
          html += layui.i18np.prop("STRID_SETTING_RF_CHANNEL_80");
          html += ": " + layui.i18np.prop('STRID_SETTING_RF_CHANNEL_80_TIPS');
        }
      }
    }
    layui4("#selected-rf-channel-tips").html(html);
  });
  layui2.on("checkbox(power-saving)", function (result) {
    set_auto_tx_power(current_usb_client, result.elem.checked);
  });
  layui2.on("switch(onboard-allow-switch)", function (result) {
    var status = onboard_status[onboard_config_index];
    if (result.elem.checked) {
      status = status | 0x80;
    } else {
      status = status & -129;
    }
    set_onboard_status(current_usb_client, onboard_config_index, status);
    ui_refresh_onboard_config(usb_client);
  });
  layui2.on("select(onboard-config)", function (result) {
    var value29 = result.elem;
    var value30 = value29.value;
    if (need_save) {
      el.confirm(str.prop("STRID_SETTING_MAPPING_NOT_SAVED_DISCARD_CONFIRM"), {
        'title': str.prop("STRID_TITLE_WARNING"),
        'skin': 'layui-layer-confirm',
        'btn': [str.prop("STRID_SETTING_MAPPING_NOT_SAVED_DISCARD_S"), str.prop("STRID_SETTING_MAPPING_NOT_SAVED_BACK_S")],
        'btnAlign': 'c',
        'btn1': function () {
          el.closeLast(0x0);
          need_save = false;
          onboard_config_index = value30;
          onboard_keys = onboard_configs[onboard_config_index];
          combination_key_index = 0x0;
          select_mouse_key(current_usb_client, '');
          ui_refresh_combination_key(current_usb_client);
          ui_refresh_onboard_config(current_usb_client);
        },
        'btn2': function () {
          el.closeLast(0x0);
          ui_refresh_onboard_config(current_usb_client);
        }
      });
      return;
    }
    onboard_config_index = value30;
    onboard_keys = onboard_configs[onboard_config_index];
    combination_key_index = 0x0;
    select_mouse_key(current_usb_client, '');
    ui_refresh_combination_key(current_usb_client);
    ui_refresh_onboard_config(current_usb_client);
  });
  layui3.on("setting-onboard-status-action", {
    'select': async function () {
      var attr4 = this.getAttribute("color-code");
      var status2 = onboard_status[onboard_config_index];
      if (attr4 == 'white') {
        set_onboard_status(current_usb_client, onboard_config_index, status2 & -8 | 4 | 2 | 1);
      } else {
        if (attr4 == "red") {
          set_onboard_status(current_usb_client, onboard_config_index, status2 & -8 | 4);
        } else {
          if (attr4 == "green") {
            set_onboard_status(current_usb_client, onboard_config_index, status2 & -8 | 2);
          } else {
            if (attr4 == "blue") {
              set_onboard_status(current_usb_client, onboard_config_index, status2 & -8 | 1);
            } else {
              if (attr4 == 'yellow') {
                set_onboard_status(current_usb_client, onboard_config_index, status2 & -8 | 4 | 2);
              } else {
                if (attr4 == "purple") {
                  set_onboard_status(current_usb_client, onboard_config_index, status2 & -8 | 4 | 1);
                } else {
                  if (attr4 == "skyblue") {
                    set_onboard_status(current_usb_client, onboard_config_index, status2 & -8 | 2 | 1);
                  } else if (attr4 == "none") {
                    set_onboard_status(current_usb_client, onboard_config_index, status2 & -8);
                  }
                }
              }
            }
          }
        }
      }
      window.postMessage({
        'action': ACTION_UI_REFRESH_SETTING
      });
      ui_refresh_onboard_config(current_usb_client);
    }
  });
  layui2.on("select(combination-key)", function (result) {
    var value31 = result.elem;
    var value32 = value31.value;
    combination_key_index = value32;
    select_mouse_key(current_usb_client, '');
  });
  layui3.on('mapping-action', {
    'setting-mapping-key': async function () {
      var attr5 = this.getAttribute("value");
      select_key_name = '';
      if (attr5 == "setting_mapping_key_wheel_down") {
        select_key_name = KEY_WHEEL_DOWN;
      } else {
        if (attr5 == "setting_mapping_key_wheel_up") {
          select_key_name = KEY_WHEEL_UP;
        } else {
          for (let index = 0x0; index < mouse_keys.length; index++) {
            if (attr5 == setting_mapping_keys[index]) {
              select_key_name = get_key_name_from_label(mouse_keys[index].label);
              break;
            }
          }
        }
      }
      var label = mouse_key_labels[combination_key_index];
      var len2 = get_key_name_from_label(label);
      if (len2.length > 0x0) {
        select_key_name = len2 + '+' + select_key_name;
      }
      select_mouse_key(current_usb_client, select_key_name);
    }
  });
  var layui9 = layui.element;
  layui9.on("tab(mapping-key-type)", function (result) {
    var value33 = result.index;
    if (select_key_name.length > 0x0) {
      var keyInfo = get_select_key_info();
      if (Object.keys(keyInfo).length == 0x0) {
        var index2 = -0x1;
        for (let count = 0x0; count < mouse_keys.length; count++) {
          if (select_key_name == mouse_keys[count].name) {
            index2 = count;
            break;
          }
        }
        if (index2 >= 0x0) {
          var keyInfo = create_key_info();
          keyInfo.name = mouse_keys[index2].name;
          keyInfo.label = mouse_keys[index2].label;
          onboard_keys.push(keyInfo);
        }
      }
      for (let len3 = 0x0; len3 < onboard_keys.length; len3++) {
        if (select_key_name == onboard_keys[len3].name) {
          if (value33 == 0x0) {
            onboard_keys[len3].configType = 0x0;
            onboard_keys[len3].touch_style = 0x1b;
          } else {
            if (value33 == 0x1) {
              onboard_keys[len3].configType = 0x5;
            } else if (value33 == 0x2) {
              onboard_keys[len3].configType = 0x0;
              onboard_keys[len3].touch_style = 0x1d;
            } else {
              onboard_keys[len3].configType = -0x1;
            }
          }
        }
      }
      for (let len4 = 0x0; len4 < onboard_keys.length; len4++) {
        if (select_key_name == onboard_keys[len4].name) {
          for (let index3 = onboard_keys.length - 0x1; index3 > len4; index3--) {
            if (select_key_name == onboard_keys[index3].name) {
              if (value33 == 0x1) {
                if (onboard_keys[len4].macro_style == onboard_keys[index3].macro_style) {
                  onboard_keys.splice(index3, 0x1);
                }
              } else {
                onboard_keys.splice(index3, 0x1);
              }
            }
          }
        }
      }
      update_mapping(current_usb_client, value33);
      ui_refresh_mapping_key(current_usb_client);
      ui_refresh_combination_key(current_usb_client);
    }
  });
  layui2.on("select(mapping-ctrl-key1)", function (result) {
    set_mapping_keys(current_usb_client);
    ui_refresh_tab_mapping_key(current_usb_client);
  });
  layui2.on("select(mapping-ctrl-key2)", function (result) {
    set_mapping_keys(current_usb_client);
    ui_refresh_tab_mapping_key(current_usb_client);
  });
  layui2.on("select(mapping-key)", function (result) {
    set_mapping_keys(current_usb_client);
    ui_refresh_tab_mapping_key(current_usb_client);
  });
  layui2.on("input-affix(wheel-delta-input)", function (result) {
    document.getElementById('wheel-delta-input').dispatchEvent(new Event("input", {
      'bubbles': true
    }));
  });
  layui4('#wheel-delta-input').on("input", function (result) {
    var keyInfo2 = get_select_key_info();
    if (Object.keys(keyInfo2).length == 0x0) {
      return;
    }
    keyInfo2.mouse_mapping_key_data = result.delegateTarget.value;
    if (keyInfo2.mouse_mapping_key_data < 0x1 || keyInfo2.mouse_mapping_key_data > 0x40) {
      keyInfo2.mouse_mapping_key_data = 0x1;
    }
    set_mapping_keys(current_usb_client);
  });
  layui2.on("checkbox(mapping-key-turbo)", function (result) {
    var keyInfo3 = get_select_key_info();
    if (Object.keys(keyInfo3).length == 0x0) {
      return;
    }
    if (result.elem.checked) {
      keyInfo3.mouse_auto_click = 0x1;
    } else {
      keyInfo3.mouse_auto_click = 0x0;
    }
    ui_refresh_tab_mapping_key(current_usb_client);
    need_save = true;
    ui_refresh_onboard_config(current_usb_client);
  });
  layui3.on("shell-cmd-app-browse-action", {
    'edit': async function () {
      layui4('#shell-cmd-app-browse_file').click();
    }
  });
  layui2.on("select(mapping-function)", function (result) {
    var value34 = result.elem;
    var index4 = value34.value;
    var keyInfo4 = get_select_key_info();
    if (Object.keys(keyInfo4).length == 0x0) {
      return;
    }
    keyInfo4.mouse_mapping_function = mouse_functions[index4];
    ui_refresh_tab_mapping_function(current_usb_client);
    ui_refresh_mapping_key(current_usb_client);
    ui_refresh_combination_key(current_usb_client);
    need_save = true;
    ui_refresh_onboard_config(current_usb_client);
  });
  layui2.on('radio(function-shell-cmd)', function (result) {
    var value35 = result.elem;
    var value36 = value35.value;
    var keyInfo5 = get_select_key_info();
    if (Object.keys(keyInfo5).length == 0x0) {
      return;
    }
    if (value36 == 0x1) {
      keyInfo5.mouse_mapping_function_text = layui4("[name=\"function-shell-cmd-web\"]").val();
      layui4('#function-shell-cmd-app-browse').css('display', 'none');
      layui4('#function-shell-cmd-app-browse').prop("disabled", true);
      layui4("[name=\"function-shell-cmd-app\"]").prop("disabled", true);
      layui4("[name=\"function-shell-cmd-web\"]").prop("disabled", false);
      layui4("#function-shell-cmd-app-container").css('display', "none");
      layui4("#function-shell-cmd-web-container").css("display", '');
    } else {
      keyInfo5.mouse_mapping_function_text = layui4("[name=\"function-shell-cmd-app\"]").val();
      layui4("#function-shell-cmd-app-browse").css('display', "none");
      layui4("#function-shell-cmd-app-browse").prop("disabled", false);
      layui4("[name=\"function-shell-cmd-app\"]").prop("disabled", false);
      layui4("[name=\"function-shell-cmd-web\"]").prop("disabled", true);
      layui4("#function-shell-cmd-app-container").css('display', '');
      layui4("#function-shell-cmd-web-container").css('display', "none");
    }
    need_save = true;
    ui_refresh_onboard_config(current_usb_client);
  });
  layui4("#function-shell-cmd-app").on("input", function (result) {
    var keyInfo6 = get_select_key_info();
    if (Object.keys(keyInfo6).length == 0x0) {
      return;
    }
    keyInfo6.mouse_mapping_function_text = result.delegateTarget.value;
  });
  layui4('#function-shell-cmd-web').on("input", function (result) {
    var keyInfo7 = get_select_key_info();
    if (Object.keys(keyInfo7).length == 0x0) {
      return;
    }
    keyInfo7.mouse_mapping_function_text = result.delegateTarget.value;
    need_save = true;
    ui_refresh_onboard_config(current_usb_client);
  });
  layui2.on("input-affix(mapping-key-turbo-freq-input)", function (result) {
    document.getElementById("mapping-key-turbo-freq-input").dispatchEvent(new Event('input', {
      'bubbles': true
    }));
  });
  layui4("#mapping-key-turbo-freq-input").on('input', function (result) {
    var keyInfo8 = get_select_key_info();
    if (Object.keys(keyInfo8).length == 0x0) {
      return;
    }
    var len5 = result.delegateTarget.value;
    var parsedInt1 = len5.length == 0x0 ? 0x0 : parseInt(len5);
    if (parsedInt1 <= 0x0) {
      parsedInt1 = 0x1;
    }
    if (parsedInt1 != parseInt(0x3e8 / (keyInfo8.mouse_auto_click_down + keyInfo8.mouse_auto_click_up))) {
      var value37 = parseInt(0x3e8 / parsedInt1);
      if (value37 >= 0x64) {
        keyInfo8.mouse_auto_click_down = 0x32;
        keyInfo8.mouse_auto_click_up = value37 - keyInfo8.mouse_auto_click_down;
      } else {
        keyInfo8.mouse_auto_click_up = parseInt(value37 / 0x2);
        keyInfo8.mouse_auto_click_down = value37 - keyInfo8.mouse_auto_click_up;
      }
      if (keyInfo8.mouse_auto_click_down < 0x0) {
        keyInfo8.mouse_auto_click_down = 0x0;
      }
      if (keyInfo8.mouse_auto_click_up < 0x0) {
        keyInfo8.mouse_auto_click_up = 0x0;
      }
      if (keyInfo8.mouse_auto_click_down == 0x0 && keyInfo8.mouse_auto_click_up == 0x0) {
        keyInfo8.mouse_auto_click_down = 0x1;
      }
      layui4("#mapping-key-turbo-down-keep-input").val(keyInfo8.mouse_auto_click_down);
      layui4("#mapping-key-turbo-up-keep-input").val(keyInfo8.mouse_auto_click_up);
    }
    need_save = true;
    ui_refresh_onboard_config(current_usb_client);
  });
  layui2.on("input-affix(mapping-key-turbo-rand-input)", function (result) {
    document.getElementById("mapping-key-turbo-rand-input").dispatchEvent(new Event("input", {
      'bubbles': true
    }));
  });
  layui4("#mapping-key-turbo-rand-input").on("input", function (result) {
    var keyInfo9 = get_select_key_info();
    if (Object.keys(keyInfo9).length == 0x0) {
      return;
    }
    var len6 = result.delegateTarget.value;
    var parsedInt2 = len6.length == 0x0 ? 0x0 : parseInt(len6);
    if (parsedInt2 < 0x0) {
      parsedInt2 = 0x0;
    }
    keyInfo9.mouse_auto_click_rand = parsedInt2;
    need_save = true;
    ui_refresh_onboard_config(current_usb_client);
  });
  layui2.on('input-affix(mapping-key-turbo-down-keep-input)', function (result) {
    document.getElementById("mapping-key-turbo-down-keep-input").dispatchEvent(new Event("input", {
      'bubbles': true
    }));
  });
  layui4("#mapping-key-turbo-down-keep-input").on("input", function (result) {
    var keyInfo10 = get_select_key_info();
    if (Object.keys(keyInfo10).length == 0x0) {
      return;
    }
    var len7 = result.delegateTarget.value;
    var parsedInt3 = len7.length == 0x0 ? 0x0 : parseInt(len7);
    if (parsedInt3 < 0x0) {
      parsedInt3 = 0x0;
    }
    keyInfo10.mouse_auto_click_down = parsedInt3;
    if (keyInfo10.mouse_auto_click_down == 0x0 && keyInfo10.mouse_auto_click_up == 0x0) {
      keyInfo10.mouse_auto_click_down = 0x1;
    }
    var value38 = keyInfo10.mouse_auto_click_down + keyInfo10.mouse_auto_click_up;
    if (value38 <= 0x0) {
      value38 = 0x1;
    }
    layui4("#mapping-key-turbo-freq-input").val(parseInt(0x3e8 / value38));
    need_save = true;
    ui_refresh_onboard_config(current_usb_client);
  });
  layui2.on('input-affix(mapping-key-turbo-up-keep-input)', function (result) {
    document.getElementById("mapping-key-turbo-up-keep-input").dispatchEvent(new Event('input', {
      'bubbles': true
    }));
  });
  layui4("#mapping-key-turbo-up-keep-input").on("input", function (result) {
    var keyInfo11 = get_select_key_info();
    if (Object.keys(keyInfo11).length == 0x0) {
      return;
    }
    var len8 = result.delegateTarget.value;
    var parsedInt4 = len8.length == 0x0 ? 0x0 : parseInt(len8);
    if (parsedInt4 < 0x0) {
      parsedInt4 = 0x0;
    }
    keyInfo11.mouse_auto_click_up = parsedInt4;
    if (keyInfo11.mouse_auto_click_down == 0x0 && keyInfo11.mouse_auto_click_up == 0x0) {
      keyInfo11.mouse_auto_click_up = 0x1;
    }
    var value39 = keyInfo11.mouse_auto_click_down + keyInfo11.mouse_auto_click_up;
    if (value39 <= 0x0) {
      value39 = 0x1;
    }
    layui4("#mapping-key-turbo-freq-input").val(parseInt(0x3e8 / value39));
    need_save = true;
    ui_refresh_onboard_config(current_usb_client);
  });
  layui3.on('macro-edit-item-action', {
    'select': async function () {
      macro_edit_index = this.getAttribute("macro-edit-item-index");
      current_edit_macro = clone_macro_info(edit_macros[macro_edit_index]);
      macro_keep_time_min = current_edit_macro.mouse_key_time / 0x1f4 * 0x1f4;
      ui_refresh_mapping_macro_add(current_usb_client);
      el.open({
        'type': 0x1,
        'title': str.prop('STRID_SETTING_MAPPING_MACRO_ACTION_EDIT'),
        'skin': "layui-layer-confirm",
        'content': layui4('#setting-mapping-macro-add-panel'),
        'btn': [str.prop('STRID_DELETE'), str.prop('STRID_INSERT'), str.prop("STRID_SAVE")],
        'btnAlign': 'c',
        'btn1': function () {
          el.closeLast(0x0);
          edit_macros.splice(macro_edit_index, 0x1);
          ui_refresh_mapping_macro_edit(current_usb_client);
        },
        'btn2': function () {
          el.closeLast(0x0);
          var macroInfo = create_macro_info();
          macroInfo.style = 0x16;
          var value40 = macro_keys[parseInt(layui4("[name=\"macro-add-select-key\"]").val())].vCode;
          if (current_usb_client != undefined ? is_hs_keyboard(current_usb_client.device) : false) {
            value40 = get_key_code_from_name(document.getElementById("kbd-macro-add-select-key").textContent);
          }
          if (value40 == 0x401) {
            macroInfo.mouse_key_event = 0x20a;
            macroInfo.mouse_key_code = -parseInt(layui4("#macro-add-wheel-delta-input").val());
          } else {
            if (value40 == 0x400) {
              macroInfo.mouse_key_event = 0x20a;
              macroInfo.mouse_key_code = parseInt(layui4("#macro-add-wheel-delta-input").val());
            } else {
              if (value40 == 0x402) {
                macroInfo.mouse_key_event = 0x20e;
                macroInfo.mouse_key_code = -parseInt("#macro-add-wheel-delta-input".val());
              } else {
                if (value40 == 0x403) {
                  macroInfo.mouse_key_event = 0x20e;
                  macroInfo.mouse_key_code = parseInt(layui4('#macro-add-wheel-delta-input').val());
                } else {
                  if (value40 == 0x404) {
                    macroInfo.mouse_key_event = 0x200;
                    var value41 = Math.round(parseFloat(layui4('#macro-add-move-delta-x-input').val()) * 0xa) + 0x7ff;
                    var value42 = Math.round(parseFloat(layui4("#macro-add-move-delta-y-input").val()) * 0xa) + 0x7ff;
                    macroInfo.mouse_key_code = value41 << 0x10 | value42;
                    macroInfo.mouse_key_loop = parseInt(layui4('#macro-add-move-loop-input').val());
                    if (macroInfo.mouse_key_loop <= 0x0) {
                      macroInfo.mouse_key_loop = 0x1;
                    }
                  } else {
                    if (value40 == 0x405) {
                      macroInfo.mouse_key_event = 0x2ff;
                      var value43 = parseInt(layui4("#macro-add-position-x-input").val());
                      var value44 = parseInt(layui4('#macro-add-position-y-input').val());
                      var screenW = window.screen.width;
                      var screenH = window.screen.height;
                      value43 = parseInt((value43 + 0.9) * 0xffff / screenW);
                      value44 = parseInt((value44 + 0.9) * 0xffff / screenH);
                      macroInfo.mouse_key_code = value43 << 0x10 | value44;
                    } else {
                      macroInfo.mouse_key_code = value40;
                      if (layui4("[name=\"mapping-macro-action-key-event\"]")[0x0].checked) {
                        macroInfo.mouse_key_event = 0x100;
                      } else if (layui4("[name=\"mapping-macro-action-key-event\"]")[0x1].checked) {
                        macroInfo.mouse_key_event = 0x101;
                      } else {
                        macroInfo.mouse_key_event = 0x0;
                      }
                    }
                  }
                }
              }
            }
          }
          macroInfo.mouse_key_time = current_edit_macro.mouse_key_time;
          macroInfo.name = get_key_name_from_code(value40);
          edit_macros.splice(macro_edit_index, 0x0, macroInfo);
          ui_refresh_mapping_macro_edit(current_usb_client);
        },
        'btn3': function () {
          el.closeLast(0x0);
          current_edit_macro.style = 0x16;
          var value45 = macro_keys[parseInt(layui4("[name=\"macro-add-select-key\"]").val())].vCode;
          if (current_usb_client != undefined ? is_hs_keyboard(current_usb_client.device) : false) {
            value45 = get_key_code_from_name(document.getElementById('kbd-macro-add-select-key').textContent);
          }
          if (value45 == 0x401) {
            current_edit_macro.mouse_key_event = 0x20a;
            current_edit_macro.mouse_key_code = -parseInt(layui4("#macro-add-wheel-delta-input").val());
          } else {
            if (value45 == 0x400) {
              current_edit_macro.mouse_key_event = 0x20a;
              current_edit_macro.mouse_key_code = parseInt(layui4("#macro-add-wheel-delta-input").val());
            } else {
              if (value45 == 0x402) {
                current_edit_macro.mouse_key_event = 0x20e;
                current_edit_macro.mouse_key_code = -parseInt(layui4("#macro-add-wheel-delta-input").val());
              } else {
                if (value45 == 0x403) {
                  current_edit_macro.mouse_key_event = 0x20e;
                  current_edit_macro.mouse_key_code = parseInt(layui4("#macro-add-wheel-delta-input").val());
                } else {
                  if (value45 == 0x404) {
                    current_edit_macro.mouse_key_event = 0x200;
                    var value46 = Math.round(parseFloat(layui4("#macro-add-move-delta-x-input").val()) * 0xa) + 0x7ff;
                    var value47 = Math.round(parseFloat(layui4("#macro-add-move-delta-y-input").val()) * 0xa) + 0x7ff;
                    current_edit_macro.mouse_key_code = value46 << 0x10 | value47;
                    current_edit_macro.mouse_key_loop = parseInt(layui4('#macro-add-move-loop-input').val());
                    if (current_edit_macro.mouse_key_loop <= 0x0) {
                      current_edit_macro.mouse_key_loop = 0x1;
                    }
                  } else {
                    if (value45 == 0x405) {
                      current_edit_macro.mouse_key_event = 0x2ff;
                      var value48 = parseInt(layui4("#macro-add-position-x-input").val());
                      var value49 = parseInt(layui4('#macro-add-position-y-input').val());
                      var screenW = window.screen.width;
                      var screenH = window.screen.height;
                      value48 = parseInt((value48 + 0.9) * 0xffff / screenW);
                      value49 = parseInt((value49 + 0.9) * 0xffff / screenH);
                      current_edit_macro.mouse_key_code = value48 << 0x10 | value49;
                    } else {
                      current_edit_macro.mouse_key_code = value45;
                      if (layui4("[name=\"mapping-macro-action-key-event\"]")[0x0].checked) {
                        current_edit_macro.mouse_key_event = 0x100;
                      } else if (layui4("[name=\"mapping-macro-action-key-event\"]")[0x1].checked) {
                        current_edit_macro.mouse_key_event = 0x101;
                      } else {
                        current_edit_macro.mouse_key_event = 0x0;
                      }
                    }
                  }
                }
              }
            }
          }
          current_edit_macro.name = get_key_name_from_code(value45);
          if (current_edit_macro.mouse_key_time == 0x0 && current_edit_macro.mouse_key_code > 0x0) {
            current_edit_macro.mouse_key_time = 0x1;
          }
          if (macro_edit_index < 0x0) {
            edit_macros.push(current_edit_macro);
          } else {
            edit_macros[macro_edit_index] = current_edit_macro;
          }
          ui_refresh_mapping_macro_edit(current_usb_client);
        }
      });
    }
  });
  layui3.on('mapping-macro-edit-action', {
    'edit': async function () {
      var keyInfo12 = get_select_key_info();
      if (Object.keys(keyInfo12).length == 0x0) {
        return;
      }
      edit_macros = [];
      keyInfo12.macroKeys.forEach(item3 => {
        edit_macros.push(clone_macro_info(item3));
      });
      ui_refresh_mapping_macro_edit(current_usb_client);
      macro_edit_panel_id = el.open({
        'type': 0x1,
        'title': str.prop('STRID_SETTING_MAPPING_MACRO_EDIT'),
        'skin': 'layui-layer-confirm',
        'btn': [str.prop('STRID_SETTING_MAPPING_MACRO_RECORD'), str.prop("STRID_SETTING_MAPPING_MACRO_ACTION_ADD_S"), str.prop("STRID_CLEAR"), str.prop("STRID_SAVE")],
        'btnAlign': 'c',
        'content': layui4("#setting-mapping-macro-edit-panel"),
        'btn1': function () {
          var flag = false;
          setting_macro_edit_recording = false;
          setting_macro_edit_recording_time = -0x1;
          document.oncontextmenu = function (result) {
            result.preventDefault();
          };
          macro_record_panel_id = el.open({
            'type': 0x1,
            'title': str.prop("STRID_SETTING_MAPPING_MACRO_RECORD_TITLE"),
            'skin': "layui-layer-confirm",
            'content': layui4("#setting-mapping-macro-record-panel"),
            'btn': [str.prop("STRID_SETTING_FACTORY_START")],
            'btnAlign': 'c',
            'btn1': function () {
              if (!flag) {
                flag = true;
                setting_macro_edit_recording = true;
                var value50 = layui4('#layui-layer' + macro_record_panel_id + " .layui-layer-btn .layui-layer-btn0");
                value50.html(str.prop("STRID_DONE"));
                layui4('#macro-record-waiting-info').css("display", '');
                layui4("#macro-record-fixed-time-container").css("display", "none");
                return false;
              } else {
                if (record_mouse_key_delay_timer_id != undefined) {
                  clearTimeout(record_mouse_key_delay_timer_id);
                  record_mouse_key_delay_timer_id = undefined;
                }
                el.closeLast(0x0);
                setting_macro_edit_recording = false;
                document.oncontextmenu = null;
                layui4("#macro-record-waiting-info").css('display', "none");
                layui4("#macro-record-fixed-time-container").css('display', '');
              }
            },
            'cancel': function (result, data, index) {
              if (flag) {
                if (record_mouse_key_delay_timer_id != undefined) {
                  clearTimeout(record_mouse_key_delay_timer_id);
                  record_mouse_key_delay_timer_id = undefined;
                }
                setting_macro_edit_recording = false;
                document.oncontextmenu = null;
              }
              return true;
            },
            'end': function () {
              if (flag) {
                setting_mapping_macro_recording_remove_last();
                if (record_mouse_key_delay_timer_id != undefined) {
                  clearTimeout(record_mouse_key_delay_timer_id);
                  record_mouse_key_delay_timer_id = undefined;
                }
                setting_macro_edit_recording = false;
                document.oncontextmenu = null;
                macro_record_panel_id = undefined;
              }
            }
          });
          return false;
        },
        'btn2': function () {
          macro_keep_time_min = 0x0;
          macro_edit_index = -0x1;
          current_edit_macro = create_macro_info();
          ui_refresh_mapping_macro_add(current_usb_client);
          el.open({
            'type': 0x1,
            'title': str.prop("STRID_SETTING_MAPPING_MACRO_ACTION_ADD"),
            'skin': "layui-layer-confirm",
            'content': layui4("#setting-mapping-macro-add-panel"),
            'btn': [str.prop("STRID_SAVE")],
            'btnAlign': 'c',
            'btn1': function () {
              el.closeLast(0x0);
              current_edit_macro.style = 0x16;
              var value51 = macro_keys[parseInt(layui4("[name=\"macro-add-select-key\"]").val())].vCode;
              if (value51 == 0x401) {
                current_edit_macro.mouse_key_event = 0x20a;
                current_edit_macro.mouse_key_code = -parseInt(layui4("#macro-add-wheel-delta-input").val());
              } else {
                if (value51 == 0x400) {
                  current_edit_macro.mouse_key_event = 0x20a;
                  current_edit_macro.mouse_key_code = parseInt(layui4("#macro-add-wheel-delta-input").val());
                } else {
                  if (value51 == 0x402) {
                    current_edit_macro.mouse_key_event = 0x20e;
                    current_edit_macro.mouse_key_code = -parseInt(layui4("#macro-add-wheel-delta-input").val());
                  } else {
                    if (value51 == 0x403) {
                      current_edit_macro.mouse_key_event = 0x20e;
                      current_edit_macro.mouse_key_code = parseInt(layui4("#macro-add-wheel-delta-input").val());
                    } else {
                      if (value51 == 0x404) {
                        current_edit_macro.mouse_key_event = 0x200;
                        var value52 = Math.round(parseFloat(layui4("#macro-add-move-delta-x-input").val()) * 0xa) + 0x7ff;
                        var value53 = Math.round(parseFloat(layui4("#macro-add-move-delta-y-input").val()) * 0xa) + 0x7ff;
                        current_edit_macro.mouse_key_code = value52 << 0x10 | value53;
                        current_edit_macro.mouse_key_loop = parseInt(layui4("#macro-add-move-loop-input").val());
                        if (current_edit_macro.mouse_key_loop <= 0x0) {
                          current_edit_macro.mouse_key_loop = 0x1;
                        }
                      } else {
                        if (value51 == 0x405) {
                          current_edit_macro.mouse_key_event = 0x2ff;
                          var value54 = parseInt(layui4("#macro-add-position-x-input").val());
                          var value55 = parseInt(layui4("#macro-add-position-y-input").val());
                          var screenW = window.screen.width;
                          var screenH = window.screen.height;
                          value54 = parseInt((value54 + 0.9) * 0xffff / screenW);
                          value55 = parseInt((value55 + 0.9) * 0xffff / screenH);
                          current_edit_macro.mouse_key_code = value54 << 0x10 | value55;
                        } else {
                          current_edit_macro.mouse_key_code = value51;
                          if (layui4("[name=\"mapping-macro-action-key-event\"]")[0x0].checked) {
                            current_edit_macro.mouse_key_event = 0x100;
                          } else if (layui4("[name=\"mapping-macro-action-key-event\"]")[0x1].checked) {
                            current_edit_macro.mouse_key_event = 0x101;
                          } else {
                            current_edit_macro.mouse_key_event = 0x0;
                          }
                        }
                      }
                    }
                  }
                }
              }
              current_edit_macro.name = get_key_name_from_code(value51);
              if (current_edit_macro.mouse_key_time == 0x0 && current_edit_macro.mouse_key_code > 0x0) {
                current_edit_macro.mouse_key_time = 0x1;
              }
              if (macro_edit_index < 0x0) {
                edit_macros.push(current_edit_macro);
              } else {
                edit_macros[macro_edit_index] = current_edit_macro;
              }
              ui_refresh_mapping_macro_edit(current_usb_client);
            }
          });
          return false;
        },
        'btn3': function () {
          edit_macros = [];
          ui_refresh_mapping_macro_edit(current_usb_client);
          return false;
        },
        'btn4': function () {
          el.closeLast(0x0);
          keyInfo12.macroKeys = edit_macros;
          ui_refresh_tab_mapping_macro(current_usb_client);
          need_save = true;
          ui_refresh_onboard_config(current_usb_client);
        },
        'end': function () {
          macro_edit_panel_id = undefined;
        }
      });
    }
  });
  layui2.on('select(macro-add-select-key)', function (result) {
    var value56 = result.elem;
    var index5 = value56.value;
    var value57 = macro_keys[index5].vCode;
    if (value57 == 0x0) {
      current_edit_macro.mouse_key_code = 0x0;
      current_edit_macro.mouse_key_event = 0x0;
      current_edit_macro.mouse_key_time = 0x0;
    } else {
      if (value57 == 0x401) {
        current_edit_macro.mouse_key_event = 0x20a;
        current_edit_macro.mouse_key_code = -0x1;
      } else {
        if (value57 == 0x400) {
          current_edit_macro.mouse_key_event = 0x20a;
          current_edit_macro.mouse_key_code = 0x1;
        } else {
          if (value57 == 0x403) {
            current_edit_macro.mouse_key_event = 0x20e;
            current_edit_macro.mouse_key_code = 0x1;
          } else {
            if (value57 == 0x402) {
              current_edit_macro.mouse_key_event = 0x20e;
              current_edit_macro.mouse_key_code = -0x1;
            } else {
              if (value57 == 0x404) {
                current_edit_macro.mouse_key_event = 0x200;
                current_edit_macro.mouse_key_code = 134154239;
                current_edit_macro.mouse_key_loop = 0x1;
              } else {
                if (value57 == 0x405) {
                  current_edit_macro.mouse_key_event = 0x2ff;
                  current_edit_macro.mouse_key_code = 0x0;
                } else {
                  current_edit_macro.mouse_key_code = value57;
                  var offset4 = 0x0;
                  var offset5 = 0x0;
                  for (var len9 = 0x0; len9 < edit_macros.length; len9++) {
                    if (edit_macros[len9].mouse_key_code == value57) {
                      if (edit_macros[len9].mouse_key_event == 0x100) {
                        offset4++;
                      } else if (edit_macros[len9].mouse_key_event == 0x101) {
                        offset5++;
                      }
                    }
                  }
                  current_edit_macro.mouse_key_event = offset4 > offset5 ? 0x101 : 0x100;
                  current_edit_macro.mouse_key_time = 0x64;
                }
              }
            }
          }
        }
      }
    }
    ui_refresh_mapping_macro_add(current_usb_client);
  });
  layui3.on('mapping-macro-more-keep-time-action', {
    'edit': async function () {
      macro_keep_time_min += 0x1f4;
      current_edit_macro.mouse_key_time += 0x1f4;
      ui_refresh_mapping_macro_add(current_usb_client);
    }
  });
  layui3.on("mapping-macro-less-keep-time-action", {
    'edit': async function () {
      macro_keep_time_min -= 0x1f4;
      if (macro_keep_time_min >= 0x0) {
        current_edit_macro.mouse_key_time -= 0x1f4;
      } else {
        macro_keep_time_min = 0x0;
      }
      ui_refresh_mapping_macro_add(current_usb_client);
    }
  });
  layui2.on('input-affix(macro-add-wheel-delta-input)', function (result) {
    document.getElementById("macro-add-wheel-delta-input").dispatchEvent(new Event("input", {
      'bubbles': true
    }));
  });
  layui4("#macro-add-wheel-delta-input").on('input', function (result) {
    var len10 = result.delegateTarget.value;
    var parsedInt5 = len10.length == 0x0 ? 0x0 : parseInt(len10);
    if (parsedInt5 < 0x0) {
      parsedInt5 = 0x0;
    }
    current_edit_macro.mouse_key_code = parsedInt5;
    ui_refresh_mapping_macro_add(current_usb_client);
  });
  layui2.on("select(mapping-macro-trigger-type)", function (result) {
    var value58 = result.elem;
    var value59 = value58.value;
    var keyInfo13 = get_select_key_info();
    if (Object.keys(keyInfo13).length == 0x0) {
      return;
    }
    if (macro_trigger_type_index != value59) {
      var triggerType = macro_trigger_type_index;
      macro_trigger_type_index = value59;
      keyInfo13 = get_select_key_info();
      if (Object.keys(keyInfo13).length != 0x0) {
        keyInfo13.configType = 0x5;
        keyInfo13.macro_style = macro_trigger_type_index;
      }
      if (macro_trigger_type_index == 0x6) {
        if (keyInfo13.macro_endKey == 0x0) {
          var len11 = keyInfo13.label.split('+');
          var value60 = len11[len11.length - 0x1];
          for (var offset6 = 0x0; offset6 < mouse_key_labels.length; offset6++) {
            if (mouse_key_labels[offset6] == value60) {
              layui4("[name=\"mapping-macro-stop-key\"]").val(offset6);
              keyInfo13.macro_endKey = get_key_id_from_name(keyInfo13.name);
              break;
            }
          }
        } else {
          for (var offset6 = 0x0; offset6 < mouse_key_labels.length; offset6++) {
            var value61 = get_key_name_from_label(mouse_key_labels[offset6]);
            var value62 = get_key_id_from_name(value61);
            if (keyInfo13.macro_endKey == value62) {
              layui4("[name=\"mapping-macro-stop-key\"]").val(offset6);
              break;
            }
          }
        }
      } else {
        if (triggerType == 0x6) {
          if (keyInfo13.macro_endKey != 0x0) {
            layui4("[name=\"mapping-macro-stop-key\"]").val(0x0);
            var value61 = get_key_name_from_label(mouse_key_labels[0x0]);
            var value62 = get_key_id_from_name(value61);
            keyInfo13.macro_endKey = value62;
          }
        }
      }
      ui_refresh_tab_mapping_macro(current_usb_client);
    }
  });
  layui2.on("select(mapping-macro-trigger-key)", function (result) {
    var value63 = result.elem;
    var index6 = value63.value;
    var keyInfo14 = get_select_key_info();
    if (Object.keys(keyInfo14).length == 0x0) {
      return;
    }
    var value64 = mouse_key_labels[index6];
    var value65 = get_key_name_from_label(value64);
    var value66 = get_key_id_from_name(value65);
    if (keyInfo14.macro_toggleKey != value66) {
      keyInfo14.macro_toggleKey = value66;
      need_save = true;
      ui_refresh_onboard_config(current_usb_client);
    }
  });
  layui2.on('select(mapping-macro-stop-key)', function (result) {
    var value67 = result.elem;
    var index7 = value67.value;
    var keyInfo15 = get_select_key_info();
    if (Object.keys(keyInfo15).length == 0x0) {
      return;
    }
    var value68 = get_key_name_from_label(mouse_key_labels[index7]);
    var value69 = get_key_id_from_name(value68);
    if (keyInfo15.macro_endKey != value69) {
      keyInfo15.macro_endKey = value69;
      need_save = true;
      ui_refresh_onboard_config(current_usb_client);
      if (macro_trigger_type_index == 0x6) {
        if (keyInfo15.macro_endKey == 0x0) {
          var len12 = keyInfo15.label.split('+');
          var value70 = len12[len12.length - 0x1];
          for (var len13 = 0x0; len13 < mouse_key_labels.length; len13++) {
            if (mouse_key_labels[len13] == value70) {
              layui4("[name=\"mapping-macro-stop-key\"]").val(len13);
              layui.form.render("select");
              keyInfo15.macro_endKey = get_key_id_from_name(keyInfo15.name);
              el.msg(layui.i18np.prop("STRID_SETTING_MAPPING_MACRO_TRIGGER_TOGGLE_LOOP_WARNING"), {
                'icon': 0x0
              }, function () {});
              break;
            }
          }
        }
      }
    }
  });
  layui3.on("mapping-apply-and-onboard-action", {
    'apply': async function () {
      if (!editing) {
        return;
      }
      var layui10 = layui.layer;
      var layui11 = layui.i18np;
      var offset7 = 0x0;
      var flag2 = false;
      onboard_keys.forEach(item4 => {
        if (item4.configType == 0x0 && item4.touch_style == 0x1b && get_key_id_by_name(current_usb_client, item4.name).length == 0x1 && item4.mouse_mapping_keys == "[0,0,256]") {
          offset7++;
        }
        if (item4.configType >= 0x0 && item4.name == 'M1') {
          flag2 = true;
        }
      });
      if (!flag2) {
        offset7++;
      }
      if (offset7 == 0x0) {
        layui10.confirm(layui11.prop('STRID_SETTING_MAPPING_NOT_SUPPORTED'), {
          'title': layui11.prop('STRID_SETTING_MAPPING_SAVE_AND_APPLY'),
          'skin': "layui-layer-confirm",
          'btn': [layui11.prop("STRING_CANCEL")],
          'btnAlign': 'c',
          'btn1': function () {
            layui10.closeLast(0x0);
          }
        });
        return;
      }
      for (var len14 = 0x0; len14 < onboard_keys.length; len14++) {
        if (onboard_keys[len14].configType != 0x5) {
          for (var index8 = onboard_keys.length - 0x1; index8 > len14; index8--) {
            if (onboard_keys[index8].configType == onboard_keys[len14].configType && onboard_keys[index8].name == onboard_keys[len14].name) {
              onboard_keys.splice(index8, 0x1);
            }
          }
        }
      }
      layui10.confirm(layui11.prop('STRID_SETTING_MAPPING_SAVE_TO_FDS_CONFIRM'), {
        'title': layui11.prop("STRID_SETTING_MAPPING_APPLY_AND_ONBOARD"),
        'skin': 'layui-layer-confirm',
        'btn': [layui11.prop("STRING_CANCEL"), layui11.prop('STRID_SETTING_MAPPING_SAVE_TO_FDS_S'), layui11.prop("STRID_SETTING_MAPPING_NOT_SAVE_TO_FDS_S")],
        'btnAlign': 'c',
        'btn1': function () {
          layui10.closeLast(0x0);
        },
        'btn2': function () {
          layui10.closeLast(0x0);
          var status3 = (onboard_status[onboard_config_index] & 0x80) != 0x0;
          var payload = [];
          if (status3) {
            for (var len15 = 0x0; len15 < onboard_keys.length; len15++) {
              var value71 = onboard_keys[len15];
              if (value71.configType == 0x0 && value71.touch_style == 0x1d && (value71.mouse_mapping_function == 0x11 || value71.mouse_mapping_function == 0x12 || value71.mouse_mapping_function == 0x13)) {
                for (var offset8 = 0x0; offset8 < onboard_configs.length; offset8++) {
                  if (offset8 != onboard_config_index) {
                    status3 = (onboard_status[offset8] & 0x80) != 0x0;
                    if (status3) {
                      var flag3 = false;
                      var arr2 = onboard_configs[offset8];
                      for (var offset9 = 0x0; offset9 < arr2.length; offset9++) {
                        var json = arr2[offset9];
                        if (json.configType == 0x0 && json.touch_style == 0x1d && (json.mouse_mapping_function == 0x11 || json.mouse_mapping_function == 0x12 || json.mouse_mapping_function == 0x13)) {
                          flag3 = true;
                          break;
                        }
                      }
                      if (!flag3) {
                        var flag4 = false;
                        for (var offset9 = 0x0; offset9 < arr2.length; offset9++) {
                          var json = arr2[offset9];
                          if (json.name == value71.name) {
                            if (value71.configType != json.configType || value71.touch_style != json.touch_style || value71.mouse_mapping_function != json.mouse_mapping_function) {
                              json.configType = value71.configType;
                              json.touch_style = value71.touch_style;
                              json.mouse_mapping_function = value71.mouse_mapping_function;
                              payload.push(offset8);
                            }
                            flag4 = true;
                          }
                        }
                        if (!flag4) {
                          var json = JSON.parse(JSON.stringify(value71));
                          arr2.push(json);
                          payload.push(offset8);
                        }
                      }
                    }
                  }
                }
              }
            }
            for (var offset8 = 0x0; offset8 < onboard_configs.length; offset8++) {
              var arr2 = onboard_configs[offset8];
              for (var offset9 = 0x0; offset9 < payload.length; offset9++) {
                if (offset8 == payload[offset9]) {
                  send_event_config_reset(current_usb_client);
                  var value72 = 0x1 | offset8 << 0x8;
                  send_event_action(current_usb_client, 0x34, value72);
                  arr2.forEach(item5 => {
                    write_mouse_param(current_usb_client, item5);
                  });
                  send_event_action(current_usb_client, 0x34, 256);
                }
              }
            }
          }
          send_event_config_reset(current_usb_client);
          var value72 = 0x1 | onboard_config_index << 0x8;
          send_event_action(current_usb_client, 0x34, value72);
          onboard_keys.forEach(item6 => {
            write_mouse_param(current_usb_client, item6);
          });
          send_event_action(current_usb_client, 0x34, 0x0);
          need_save = false;
          ui_refresh_onboard_config(current_usb_client);
        },
        'btn3': function () {
          layui10.closeLast(0x0);
          send_event_config_reset(current_usb_client);
          onboard_keys.forEach(item7 => {
            write_mouse_param(current_usb_client, item7);
          });
          need_save = false;
          ui_refresh_onboard_config(current_usb_client);
        }
      });
    }
  });
  layui3.on('factory-reset-action', {
    'apply': async function () {
      el.open({
        'type': 0x1,
        'title': str.prop("STRID_TITLE_WARNING"),
        'skin': "layui-layer-confirm",
        'content': layui4("#factory-reset-panel"),
        'btn': [str.prop('STRID_SETTING_FACTORY_RESET_S'), str.prop("STRID_BUTTON_CANCEL")],
        'btnAlign': 'c',
        'btn1': function () {
          el.closeLast(0x0);
          send_event_factory_reset(current_usb_client, layui4("[name=\"factory-reset-esb\"]")[0x0].checked);
        },
        'btn2': function () {
          el.closeLast(0x0);
        }
      });
    }
  });
  layui3.on("mapping-key-action", {
    'record': async function () {
      key_record_panel_id = el.open({
        'type': 0x1,
        'title': str.prop("STRID_SETTING_MAPPING_KEY_RECORD_TITLE"),
        'skin': "layui-layer-confirm",
        'btn': [str.prop("STRID_SETTING_MAPPING_KEY_RECORD_RESET"), str.prop("STRID_DONE")],
        'btnAlign': 'c',
        'content': layui4("#record-mapping-key-panel"),
        'btn1': function () {
          if (record_mouse_key_delay_timer_id != undefined) {
            clearTimeout(record_mouse_key_delay_timer_id);
            record_mouse_key_delay_timer_id = undefined;
          }
          setting_mapping_keys_recorded = [-0x1, -0x1, -0x1];
          refresh_recorded_mapping_keys();
        },
        'btn2': function () {
          if (record_mouse_key_delay_timer_id != undefined) {
            clearTimeout(record_mouse_key_delay_timer_id);
            record_mouse_key_delay_timer_id = undefined;
          }
          el.closeLast(0x0);
          if (setting_mapping_keys_recorded[0x0] > 0x0 || setting_mapping_keys_recorded[0x1] > 0x0 || setting_mapping_keys_recorded[0x2] > 0x0) {
            var len16 = modifiers;
            var len17 = keys;
            layui4("[name=\"mapping-ctrl-key1\"]").val(0x0);
            for (var offset10 = 0x0; offset10 < len16.length; offset10++) {
              if (setting_mapping_keys_recorded[0x0] == len16[offset10].vCode) {
                layui4("[name=\"mapping-ctrl-key1\"]").val(offset10);
                break;
              }
            }
            layui4("[name=\"mapping-ctrl-key2\"]").val(0x0);
            for (var offset10 = 0x0; offset10 < len16.length; offset10++) {
              if (setting_mapping_keys_recorded[0x1] == len16[offset10].vCode) {
                layui4("[name=\"mapping-ctrl-key2\"]").val(offset10);
                break;
              }
            }
            layui4("[name=\"mapping-key\"]").val(0x0);
            for (var offset10 = 0x0; offset10 < len17.length; offset10++) {
              if (setting_mapping_keys_recorded[0x2] == len17[offset10].vCode) {
                layui4("[name=\"mapping-key\"]").val(offset10);
                break;
              }
            }
            layui.form.render('select');
            set_mapping_keys(current_usb_client);
            ui_refresh_tab_mapping_key(current_usb_client);
          }
        },
        'cancel': function (result, data, index) {
          if (record_mouse_key_delay_timer_id != undefined) {
            clearTimeout(record_mouse_key_delay_timer_id);
            record_mouse_key_delay_timer_id = undefined;
          }
          return true;
        },
        'end': function () {
          if (record_mouse_key_delay_timer_id != undefined) {
            clearTimeout(record_mouse_key_delay_timer_id);
            record_mouse_key_delay_timer_id = undefined;
          }
          setting_mapping_key_recording = false;
          document.oncontextmenu = null;
          key_record_panel_id = undefined;
        }
      });
      setting_mapping_key_recording = true;
      setting_mapping_keys_recorded = [-0x1, -0x1, -0x1];
      refresh_recorded_mapping_keys();
      document.oncontextmenu = function (result) {
        result.preventDefault();
      };
    }
  });
  layui2.on("select(key-delay-select-key)", function (result) {
    var value73 = result.elem;
    var value74 = value73.value;
    if (value74 > 0x0) {
      ui_refresh_setting(current_usb_client);
    }
  });
  layui3.on("key-delay-action", {
    'click': async function () {
      el.open({
        'type': 0x1,
        'title': false,
        'skin': "layui-layer-confirm",
        'content': layui4("#key-delay-guide-panel")
      });
    }
  });
  layui3.on("wireless-optimize-action", {
    'click': async function () {
      layui4("#wireless-optimize-busy").text('');
      el.open({
        'type': 0x1,
        'title': str.prop("STRID_SETTING_FACTORY_TEST"),
        'skin': "layui-layer-confirm",
        'content': layui4("#wireless-optimize-panel"),
        'btn': [str.prop("STRING_CANCEL"), str.prop("STRID_SETTING_FACTORY_START")],
        'btnAlign': 'c',
        'btn1': function () {
          el.closeLast(0x0);
        },
        'btn2': function () {
          wireless_optimizing = true;
          send_event_action(current_usb_client, 0x40, 0x0);
          layui4("#wireless-optimize-busy").text(str.prop('STRID_SETTING_FACTORY_TESTING') + '1%');
          var now4 = new Date();
          layui3.countdown({
            'date': now4.getTime() + 0x3a98,
            'now': now4,
            'clock': function (h, m) {
              layui4('#wireless-optimize-busy').text(str.prop("STRID_SETTING_FACTORY_TESTING") + Math.round((0xf - h.s) * 0x64 / 0xf) + '%');
            },
            'done': function (result, data) {
              setTimeout(() => {
                el.closeLast(0x0);
                wireless_optimizing = false;
                current_usb_client.esb_last_alive_time = new Date().getTime();
              }, 0x3e8);
            }
          });
          return false;
        }
      });
    }
  });
  layui2.on("radio(receiver-light-mode)", function (result) {
    var value75 = result.elem;
    var value76 = value75.checked;
    var value77 = value75.value;
    if (value76) {
      set_light(current_usb_receiver, value77);
    }
  });
  layui2.on("radio(setting-fw-channel)", function (result) {
    var value78 = result.elem;
    var value79 = value78.checked;
    var value80 = value78.value;
    if (value79) {
      if ((current_usb_client.device_info != undefined && current_usb_client.device_info.revision != undefined && current_usb_client.device_info.revision.substr(0x0, 0x2) == 'G-') != (value80 == 0x1)) {
        el.confirm(str.prop("STRID_WEBHUB_GOM_REBOOT_NEEDED"), {
          'title': str.prop("STRID_SETTING_MOUSE_REBOOT"),
          'btn': [str.prop('STRID_SETTING_MOUSE_REBOOT_S'), str.prop('STRID_BUTTON_CANCEL')],
          'cancel': function (result, layero, that) {
            if (current_usb_client.device_info != undefined && current_usb_client.device_info.revision != undefined && current_usb_client.device_info.revision.substr(0x0, 0x2) == 'G-') {
              layui4("[name=\"setting-fw-channel\"]")[0x1].checked = true;
            } else {
              layui4("[name=\"setting-fw-channel\"]")[0x0].checked = true;
            }
            layui4("[name=\"setting-fw-channel\"]")[0x0].disabled = !current_usb_client.device_info.dynamicGOM;
            layui4("[name=\"setting-fw-channel\"]")[0x1].disabled = !current_usb_client.device_info.dynamicGOM;
            layui.form.render("radio");
            return true;
          }
        }, function () {
          el.closeLast(0x0);
          send_event_gaming_only(current_usb_client, value80 == 0x1);
          send_event_action(current_usb_client, 0x33, 0x0);
        }, function () {
          if (current_usb_client.device_info != undefined && current_usb_client.device_info.revision != undefined && current_usb_client.device_info.revision.substr(0x0, 0x2) == 'G-') {
            layui4("[name=\"setting-fw-channel\"]")[0x1].checked = true;
          } else {
            layui4("[name=\"setting-fw-channel\"]")[0x0].checked = true;
          }
          layui4("[name=\"setting-fw-channel\"]")[0x0].disabled = !current_usb_client.device_info.dynamicGOM;
          layui4("[name=\"setting-fw-channel\"]")[0x1].disabled = !current_usb_client.device_info.dynamicGOM;
          layui.form.render("radio");
        });
      }
    }
  });
  layui2.on('select(kbd_onboard-config)', function (result) {
    var value81 = result.elem;
    var value82 = value81.value;
    if (current_usb_client.device_info.onboardIndex != value82) {
      hs_set_onboard_index(current_usb_client, value82);
      show_waiting();
    }
  });
  layui9.on("tab(kbd-main-setting-type)", function (result) {
    var value83 = result.index;
    kbd_update_setting_tab(current_usb_client, value83);
  });
  layui9.on("tab(kbd-setting-key-type)", function (result) {
    var value84 = result.index;
    kbd_update_key_setting_tab(current_usb_client, value84);
  });
  layui9.on("tab(kbd-setting-light-type)", function (result) {
    var value85 = result.index;
    kbd_update_light_setting_tab(current_usb_client, value85);
  });
  layui9.on("tab(kbd-setting-advance-key-type)", function (result) {
    var value86 = result.index;
    kbd_update_advance_key_setting_tab(current_usb_client, value86);
  });
  layui3.on("kbd-main-setting-action", {
    'select': async function () {
      var attr6 = this.getAttribute('index');
      layui.element.tabChange('kbd-main-setting-type', attr6);
    }
  });
  layui2.on('radio(kbd-key-layer)', function (result) {
    var value87 = result.elem;
    var value88 = value87.checked;
    var value89 = value87.value;
    if (value88) {
      kbd_key_infos.splice(0x0, kbd_key_infos.length);
      kbd_layer_id = value89;
      var kbd_key_infos = current_usb_client.device_info.kbd_key_infos;
      if (value89 == 0x1) {
        if (kbd_key_infos.length >= kbd_key_num * 0x2 - 0x1) {
          for (var offset11 = 0x0; offset11 < kbd_key_num; offset11++) {
            var value90 = kbd_key_infos[offset11 + kbd_key_num];
            kbd_key_infos.push(kbd_clone_pc_key_info(value90));
          }
        }
      } else {
        if (kbd_key_infos.length >= kbd_key_num) {
          for (var offset11 = 0x0; offset11 < kbd_key_num; offset11++) {
            var value90 = kbd_key_infos[offset11];
            kbd_key_infos.push(kbd_clone_pc_key_info(value90));
          }
        }
      }
      kbd_key_matrix_index = -0x1;
      kbd_ui_refresh_key_desc(current_usb_client);
      kbd_ui_refresh_key_matrix(current_usb_client);
    }
  });
  layui3.on("kbd-key-matrix-action", {
    'select': async function () {
      var attr7 = this.getAttribute("kbd-key-matrix-index");
      kbd_key_matrix_index = Number(attr7);
      kbd_select_keyId = 0x0;
      kbd_ui_refresh_key_desc(current_usb_client);
      kbd_ui_refresh_key_matrix(current_usb_client);
    }
  });
  layui3.on("kbd-macro-action", {
    'select': async function () {
      kbd_key_matrix_index = this.getAttribute("kbd-macro-index");
    }
  });
  layui3.on("kbd-key-default-action", {
    'select': async function () {
      if (kbd_key_matrix_index < 0x0) {
        return;
      }
      var offset12 = 0x0;
      if (kbd_layer_id == 0x0) {
        offset12 = kbd_keys[kbd_key_matrix_index].keyId;
      }
      var item8 = kbd_key_infos[kbd_key_matrix_index];
      item8.keyId = offset12;
      item8.name = get_key_name_from_keyid(item8.keyId);
      kbd_ui_refresh_key_desc(current_usb_client);
      kbd_ui_refresh_key_matrix(current_usb_client);
      hs_set_keycode(current_usb_client, kbd_layer_id, item8.row, item8.col, item8.keyId);
    }
  });
  layui3.on('kbd-key-set-action', {
    'select': async function () {
      if (kbd_key_matrix_index < 0x0) {
        return;
      }
      if (kbd_select_keyId > 0x0) {
        var item9 = kbd_key_infos[kbd_key_matrix_index];
        item9.keyId = kbd_select_keyId;
        item9.name = get_key_name_from_keyid(item9.keyId);
        kbd_ui_refresh_key_desc(current_usb_client);
        kbd_ui_refresh_key_matrix(current_usb_client);
        kbd_select_keyId = 0x0;
        hs_set_keycode(current_usb_client, kbd_layer_id, item9.row, item9.col, item9.keyId);
      }
    }
  });
  layui3.on("kbd-select-key-action", {
    'select': async function () {
      var attr8 = this.getAttribute("kbd-select-key-index");
      var kbdSelectKeysRef = kbd_select_keys;
      kbd_select_keyId = kbdSelectKeysRef[attr8].keyId;
      kbd_ui_refresh_key_desc(current_usb_client);
      if (select_key_panel_id != undefined) {
        el.close(select_key_panel_id);
      }
    }
  });
  layui3.on('mouse-select-key-action', {
    'select': async function () {
      var attr9 = this.getAttribute("mouse-select-key-index");
      var mouseSelectKeysRef = mouse_select_keys;
      kbd_select_keyId = mouseSelectKeysRef[attr9].keyId;
      kbd_ui_refresh_key_desc(current_usb_client);
      if (select_key_panel_id != undefined) {
        el.close(select_key_panel_id);
      }
    }
  });
  layui3.on("kbd-key-rgb-action", {
    'select': async function () {
      var attr10 = this.getAttribute('kbd-key-rgb-index');
      var kbdRgbKeysRef = kbd_rgb_keys;
      kbd_select_keyId = kbdRgbKeysRef[attr10].keyId;
      kbd_ui_refresh_key_desc(current_usb_client);
    }
  });
  layui3.on("kbd-key-media-action", {
    'select': async function () {
      var attr11 = this.getAttribute("kbd-key-media-index");
      var kbdMediaKeysRef = kbd_media_keys;
      kbd_select_keyId = kbdMediaKeysRef[attr11].keyId;
      kbd_ui_refresh_key_desc(current_usb_client);
    }
  });
  layui3.on("kbd-key-windows-action", {
    'select': async function () {
      var attr12 = this.getAttribute("kbd-key-windows-index");
      var kbdWindowsKeysRef = kbd_windows_keys;
      kbd_select_keyId = kbdWindowsKeysRef[attr12].keyId;
      kbd_ui_refresh_key_desc(current_usb_client);
    }
  });
  layui3.on("kbd-key-switch-wasd-action", {
    'select': async function () {
      kbd_select_keyId = 0x9002;
      kbd_ui_refresh_key_desc(current_usb_client);
    }
  });
  layui3.on("kbd-key-switch-mac-mode-action", {
    'select': async function () {
      kbd_select_keyId = 0x9003;
      kbd_ui_refresh_key_desc(current_usb_client);
    }
  });
  layui3.on('kbd-light-action', {
    'select': async function () {
      var attr13 = this.getAttribute("value");
      if (attr13 == "WASD") {
        kbd_matrix_select_keys.splice(0x0, kbd_matrix_select_keys.length);
        for (let len18 = 0x0; len18 < kbd_key_infos.length; len18++) {
          var value91 = kbd_key_infos[len18].name;
          if (value91 == 'W' || value91 == 'A' || value91 == 'S' || value91 == 'D') {
            kbd_matrix_select_keys.push(kbd_edit_info.keys[len18]);
          }
          if (kbd_matrix_select_keys.length >= 0x4) {
            break;
          }
        }
      } else {
        if (attr13 == "ALL") {
          kbd_matrix_select_keys.splice(0x0, kbd_matrix_select_keys.length);
          for (let len19 = 0x0; len19 < kbd_key_infos.length; len19++) {
            kbd_matrix_select_keys.push(kbd_edit_info.keys[len19]);
          }
        } else {
          if (attr13 == "REVERSE") {
            var len20 = kbd_matrix_select_keys.slice();
            kbd_matrix_select_keys.splice(0x0, kbd_matrix_select_keys.length);
            for (let len21 = 0x0; len21 < kbd_key_infos.length; len21++) {
              var flag5 = false;
              for (let len22 = 0x0; len22 < len20.length; len22++) {
                if (len20[len22].row == kbd_key_infos[len21].row && len20[len22].col == kbd_key_infos[len21].col) {
                  flag5 = true;
                  len20.splice(len22, 0x1);
                  break;
                }
              }
              if (!flag5) {
                kbd_matrix_select_keys.push(kbd_edit_info.keys[len21]);
              }
            }
          } else if (attr13 == "CLEAR") {
            kbd_matrix_select_keys.splice(0x0, kbd_matrix_select_keys.length);
          }
        }
      }
      kbd_ui_refresh_light_matrix(current_usb_client);
      kbd_ui_refresh_light(current_usb_client);
      if (kbd_matrix_select_keys.length > 0x0) {
        layui4('#kbd-light-button-container').css("display", 'flex');
      } else {
        layui4('#kbd-light-button-container').css("display", 'none');
      }
    }
  });
  layui3.on("kbd-light-cancel-action", {
    'select': async function () {
      kbd_matrix_select_keys.splice(0x0, kbd_matrix_select_keys.length);
      kbd_ui_refresh_light_matrix(current_usb_client);
      layui4("#kbd-light-button-container").css("display", 'none');
    }
  });
  layui3.on('kbd-light-save-action', {
    'select': async function () {
      if (kbd_matrix_select_keys.length > 0x0) {
        for (let len23 = 0x0; len23 < kbd_matrix_select_keys.length; len23++) {
          kbd_matrix_select_keys[len23].hue = kbd_edit_info.hue;
          kbd_matrix_select_keys[len23].sat = kbd_edit_info.sat;
        }
        show_waiting();
        hs_set_light_define_infos(current_usb_client, kbd_matrix_select_keys);
        kbd_matrix_select_keys.splice(0x0, kbd_matrix_select_keys.length);
        kbd_ui_refresh_light_matrix(current_usb_client);
        layui4("#kbd-light-button-container").css("display", "none");
      }
    }
  });
  layui2.on("select(kbd-light-mode)", function (result) {
    var value92 = result.elem;
    var index9 = value92.value;
    var value93 = kbd_light_mode[index9].mode;
    if (kbd_edit_info.mode != value93) {
      kbd_edit_info.mode = value93;
      kbd_matrix_select_keys.splice(0x0, kbd_matrix_select_keys.length);
      hs_set_light(current_usb_client, 0x2, kbd_edit_info);
      kbd_ui_refresh_light_matrix(current_usb_client);
      kbd_ui_refresh_light(current_usb_client);
      layui4("#kbd-light-button-container").css("display", "none");
    }
  });
  layui2.on("select(kbd-light-box-mode)", function (result) {
    var value94 = result.elem;
    var index10 = value94.value;
    var value95 = kbd_light_mode[index10].mode;
    if (kbd_edit_info.light_box_info.mode != value95) {
      kbd_edit_info.light_box_info.mode = value95;
      hs_set_light_box(current_usb_client, kbd_edit_info.light_box_info);
    }
  });
  layui2.on("select(kbd-light-sleep-time)", function (result) {
    var value96 = result.elem;
    var index11 = value96.value;
    var value97 = kbd_sleep_time[index11].mode;
    if (kbd_edit_info.sleep_time != value97) {
      kbd_edit_info.sleep_time = value97;
      hs_set_light_sleep_time(current_usb_client, value97);
    }
  });
  layui2.on("switch(kbd-light-box-colored)", function (result) {
    if (result.elem.checked) {
      kbd_edit_info.light_box_info.colored = 0x1;
    } else {
      kbd_edit_info.light_box_info.colored = 0x0;
    }
    hs_set_light_box(current_usb_client, kbd_edit_info.light_box_info);
  });
  document.getElementById("color-r-input").addEventListener("change", function (item10) {
    if (item10.target.value.length == 0x0) {
      layui4('#color-r-input').val(0x0);
    }
  });
  document.getElementById('color-g-input').addEventListener("change", function (item11) {
    if (item11.target.value.length == 0x0) {
      layui4('#color-g-input').val(0x0);
    }
  });
  document.getElementById("color-b-input").addEventListener('change', function (item12) {
    if (item12.target.value.length == 0x0) {
      layui4("#color-b-input").val(0x0);
    }
  });
  layui4("#color-r-input").on('input', function (result) {
    var value98 = result.delegateTarget.value;
    var value99 = parseInt(value98);
    var value100 = parseInt(layui4("#color-g-input").val());
    var value101 = parseInt(layui4("#color-b-input").val());
    if (isNaN(value99) || value99 < 0x0 || value99 > 0xff) {
      value99 = 0x0;
    }
    if (isNaN(value100) || value100 < 0x0 || value100 > 0xff) {
      value100 = 0x0;
    }
    if (isNaN(value101) || value101 < 0x0 || value101 > 0xff) {
      value101 = 0x0;
    }
    document.getElementById("pick-color").value = rgbToHex(value99, value100, value101);
    var value102 = rgbToHsv(value99, value100, value101);
    if (kbd_edit_info.hue != value102.h || kbd_edit_info.sat != value102.s) {
      kbd_edit_info.hue = value102.h;
      kbd_edit_info.sat = value102.s;
      if (kbd_edit_info.mode != 0x0 && kbd_edit_info.mode != 0x2d) {
        hs_set_light(current_usb_client, 0x4, kbd_edit_info);
      }
    }
  });
  layui4('#color-g-input').on("input", function (result) {
    var value103 = result.delegateTarget.value;
    var value104 = parseInt(layui4("#color-r-input").val());
    var value105 = parseInt(value103);
    var value106 = parseInt(layui4("#color-b-input").val());
    if (isNaN(value104) || value104 < 0x0 || value104 > 0xff) {
      value104 = 0x0;
    }
    if (isNaN(value105) || value105 < 0x0 || value105 > 0xff) {
      value105 = 0x0;
    }
    if (isNaN(value106) || value106 < 0x0 || value106 > 0xff) {
      value106 = 0x0;
    }
    document.getElementById("pick-color").value = rgbToHex(value104, value105, value106);
    var value107 = rgbToHsv(value104, value105, value106);
    if (kbd_edit_info.hue != value107.h || kbd_edit_info.sat != value107.s) {
      kbd_edit_info.hue = value107.h;
      kbd_edit_info.sat = value107.s;
      if (kbd_edit_info.mode != 0x0 && kbd_edit_info.mode != 0x2d) {
        hs_set_light(current_usb_client, 0x4, kbd_edit_info);
      }
    }
  });
  layui4("#color-b-input").on("input", function (result) {
    var value108 = result.delegateTarget.value;
    var value109 = parseInt(layui4("#color-r-input").val());
    var value110 = parseInt(layui4("#color-g-input").val());
    var value111 = parseInt(value108);
    if (isNaN(value109) || value109 < 0x0 || value109 > 0xff) {
      value109 = 0x0;
    }
    if (isNaN(value110) || value110 < 0x0 || value110 > 0xff) {
      value110 = 0x0;
    }
    if (isNaN(value111) || value111 < 0x0 || value111 > 0xff) {
      value111 = 0x0;
    }
    document.getElementById("pick-color").value = rgbToHex(value109, value110, value111);
    var value112 = rgbToHsv(value109, value110, value111);
    if (kbd_edit_info.hue != value112.h || kbd_edit_info.sat != value112.s) {
      kbd_edit_info.hue = value112.h;
      kbd_edit_info.sat = value112.s;
      if (kbd_edit_info.mode != 0x0 && kbd_edit_info.mode != 0x2d) {
        hs_set_light(current_usb_client, 0x4, kbd_edit_info);
      }
    }
  });
  document.getElementById("light-box-color-r-input").addEventListener('change', function (item13) {
    if (item13.target.value.length == 0x0) {
      layui4("#light-box-color-r-input").val(0x0);
    }
  });
  document.getElementById("light-box-color-g-input").addEventListener('change', function (item14) {
    if (item14.target.value.length == 0x0) {
      layui4('#light-box-color-g-input').val(0x0);
    }
  });
  document.getElementById("light-box-color-b-input").addEventListener("change", function (item15) {
    if (item15.target.value.length == 0x0) {
      layui4('#vcolor-b-input').val(0x0);
    }
  });
  layui4("#light-box-color-r-input").on("input", function (result) {
    var value113 = result.delegateTarget.value;
    var value114 = parseInt(value113);
    var value115 = parseInt(layui4("#light-box-color-g-input").val());
    var value116 = parseInt(layui4('#light-box-color-b-input').val());
    if (isNaN(value114) || value114 < 0x0 || value114 > 0xff) {
      value114 = 0x0;
    }
    if (isNaN(value115) || value115 < 0x0 || value115 > 0xff) {
      value115 = 0x0;
    }
    if (isNaN(value116) || value116 < 0x0 || value116 > 0xff) {
      value116 = 0x0;
    }
    document.getElementById('light-box-pick-color').value = rgbToHex(value114, value115, value116);
    if (kbd_edit_info.light_box_info.r != value114 || kbd_edit_info.light_box_info.g != value115 || kbd_edit_info.light_box_info.b != value116) {
      kbd_edit_info.light_box_info.r = value114;
      kbd_edit_info.light_box_info.g = value115;
      kbd_edit_info.light_box_info.b = value116;
      hs_set_light_box(current_usb_client, kbd_edit_info.light_box_info);
    }
  });
  layui4("#light-box-color-g-input").on("input", function (result) {
    var value117 = result.delegateTarget.value;
    var value118 = parseInt(layui4("#light-box-color-r-input").val());
    var value119 = parseInt(value117);
    var value120 = parseInt(layui4("#light-box-color-b-input").val());
    if (isNaN(value118) || value118 < 0x0 || value118 > 0xff) {
      value118 = 0x0;
    }
    if (isNaN(value119) || value119 < 0x0 || value119 > 0xff) {
      value119 = 0x0;
    }
    if (isNaN(value120) || value120 < 0x0 || value120 > 0xff) {
      value120 = 0x0;
    }
    document.getElementById("light-box-pick-color").value = rgbToHex(value118, value119, value120);
    if (kbd_edit_info.light_box_info.r != value118 || kbd_edit_info.light_box_info.g != value119 || kbd_edit_info.light_box_info.b != value120) {
      kbd_edit_info.light_box_info.r = value118;
      kbd_edit_info.light_box_info.g = value119;
      kbd_edit_info.light_box_info.b = value120;
      hs_set_light_box(current_usb_client, kbd_edit_info.light_box_info);
    }
  });
  layui4("#light-box-color-b-input").on("input", function (result) {
    var value121 = result.delegateTarget.value;
    var value122 = parseInt(layui4("#light-box-color-r-input").val());
    var value123 = parseInt(layui4("#light-box-color-g-input").val());
    var value124 = parseInt(value121);
    if (isNaN(value122) || value122 < 0x0 || value122 > 0xff) {
      value122 = 0x0;
    }
    if (isNaN(value123) || value123 < 0x0 || value123 > 0xff) {
      value123 = 0x0;
    }
    if (isNaN(value124) || value124 < 0x0 || value124 > 0xff) {
      value124 = 0x0;
    }
    document.getElementById("light-box-pick-color").value = rgbToHex(value122, value123, value124);
    if (kbd_edit_info.light_box_info.r != value122 || kbd_edit_info.light_box_info.g != value123 || kbd_edit_info.light_box_info.b != value124) {
      kbd_edit_info.light_box_info.r = value122;
      kbd_edit_info.light_box_info.g = value123;
      kbd_edit_info.light_box_info.b = value124;
      hs_set_light_box(current_usb_client, kbd_edit_info.light_box_info);
    }
  });
  layui3.on("kbd-axis-matrix-action", {
    'select': async function () {
      var attr14 = this.getAttribute("kbd-axis-matrix-index");
      kbd_key_matrix_index = Number(attr14);
      var flag6 = false;
      for (let len24 = 0x0; len24 < kbd_matrix_select_keys.length; len24++) {
        if (kbd_matrix_select_keys[len24].row == kbd_key_infos[kbd_key_matrix_index].row && kbd_matrix_select_keys[len24].col == kbd_key_infos[kbd_key_matrix_index].col) {
          kbd_matrix_select_keys.splice(len24, 0x1);
          flag6 = true;
          break;
        }
      }
      if (!flag6) {
        kbd_matrix_select_keys.push(kbd_clone_axis_info(kbd_axis_infos[kbd_key_matrix_index]));
      }
      kbd_ui_refresh_axis_matrix(current_usb_client);
      kbd_ui_refresh_axis(current_usb_client);
    }
  });
  layui3.on("kbd-axis-action", {
    'select': async function () {
      var attr15 = this.getAttribute("value");
      if (attr15 == "WASD") {
        kbd_matrix_select_keys.splice(0x0, kbd_matrix_select_keys.length);
        for (let len25 = 0x0; len25 < kbd_key_infos.length; len25++) {
          var value125 = kbd_key_infos[len25].name;
          if (value125 == 'W' || value125 == 'A' || value125 == 'S' || value125 == 'D') {
            kbd_matrix_select_keys.push(kbd_axis_infos[len25]);
          }
          if (kbd_matrix_select_keys.length >= 0x4) {
            break;
          }
        }
      } else {
        if (attr15 == "ALL") {
          kbd_matrix_select_keys.splice(0x0, kbd_matrix_select_keys.length);
          for (let len26 = 0x0; len26 < kbd_axis_infos.length; len26++) {
            kbd_matrix_select_keys.push(kbd_axis_infos[len26]);
          }
        } else {
          if (attr15 == "REVERSE") {
            var len27 = kbd_matrix_select_keys.slice();
            kbd_matrix_select_keys.splice(0x0, kbd_matrix_select_keys.length);
            for (let len28 = 0x0; len28 < kbd_key_infos.length; len28++) {
              var flag7 = false;
              for (let len29 = 0x0; len29 < len27.length; len29++) {
                if (len27[len29].row == kbd_key_infos[len28].row && len27[len29].col == kbd_key_infos[len28].col) {
                  flag7 = true;
                  len27.splice(len29, 0x1);
                  break;
                }
              }
              if (!flag7) {
                kbd_matrix_select_keys.push(kbd_axis_infos[len28]);
              }
            }
          } else if (attr15 == "CLEAR") {
            kbd_matrix_select_keys.splice(0x0, kbd_matrix_select_keys.length);
          }
        }
      }
      kbd_ui_refresh_axis_matrix(current_usb_client);
      kbd_ui_refresh_axis(current_usb_client);
    }
  });
  layui3.on("layui-axis-type-action", {
    'select': async function () {
      var attr16 = this.getAttribute("index");
      if (kbd_edit_info.switch_type != Number(attr16)) {
        kbd_edit_info.switch_type = Number(attr16);
        kbd_ui_refresh_axis(current_usb_client);
      }
    }
  });
  layui2.on("radio(kbd-axis-mode)", function (result) {
    var value126 = result.elem;
    var value127 = value126.checked;
    var value128 = value126.value;
    if (value127) {
      if (value128 != current_usb_client.device_info.kbd_axis_mode) {
        hs_set_axis_mode(current_usb_client, value128);
      }
    }
  });
  layui2.on("switch(kbd-axis-quick-tigger-mode)", function (result) {
    if (result.elem.checked) {
      kbd_edit_info.rt_enable = 0x1;
    } else {
      kbd_edit_info.rt_enable = 0x0;
    }
    kbd_ui_refresh_axis(current_usb_client);
  });
  layui3.on("kbd-light-matrix-action", {
    'select': async function () {
      if (kbd_edit_info.mode != 0x2d) {
        return;
      }
      kbd_key_matrix_index = this.getAttribute("kbd-light-matrix-index");
      var flag8 = false;
      for (let len30 = 0x0; len30 < kbd_matrix_select_keys.length; len30++) {
        var value129 = kbd_matrix_select_keys[len30];
        if (kbd_key_infos[kbd_key_matrix_index].row == kbd_matrix_select_keys[len30].row && kbd_key_infos[kbd_key_matrix_index].col == kbd_matrix_select_keys[len30].col) {
          kbd_matrix_select_keys.splice(len30, 0x1);
          flag8 = true;
          break;
        }
      }
      if (!flag8) {
        kbd_matrix_select_keys.push(kbd_edit_info.keys[kbd_key_matrix_index]);
      }
      kbd_ui_refresh_light_matrix(current_usb_client);
      kbd_ui_refresh_light(current_usb_client);
      if (kbd_matrix_select_keys.length > 0x0) {
        layui4("#kbd-light-button-container").css('display', "flex");
      } else {
        layui4("#kbd-light-button-container").css("display", "none");
      }
    }
  });
  layui3.on("kbd-axis-cancel-action", {
    'select': async function () {
      kbd_matrix_select_keys.splice(0x0, kbd_matrix_select_keys.length);
      kbd_ui_refresh_axis(current_usb_client);
      kbd_ui_refresh_axis_matrix(current_usb_client);
      layui4('#kbd-axis-button-container').css("display", "none");
    }
  });
  layui3.on("kbd-axis-save-action", {
    'select': async function () {
      if (kbd_matrix_select_keys.length > 0x0) {
        for (let len31 = 0x0; len31 < kbd_matrix_select_keys.length; len31++) {
          kbd_matrix_select_keys[len31].switch_type = kbd_edit_info.switch_type;
          kbd_matrix_select_keys[len31].rt_enable = kbd_edit_info.rt_enable;
          kbd_matrix_select_keys[len31].apc_lv = kbd_edit_info.apc_lv;
          kbd_matrix_select_keys[len31].rt_press_lv = kbd_edit_info.rt_press_lv;
          kbd_matrix_select_keys[len31].rt_release_lv = kbd_edit_info.rt_release_lv;
          kbd_matrix_select_keys[len31].top_dz = kbd_edit_info.top_dz;
          kbd_matrix_select_keys[len31].btm_dz = kbd_edit_info.btm_dz;
        }
        show_waiting();
        hs_set_axis_infos(current_usb_client, kbd_matrix_select_keys);
        kbd_matrix_select_keys.splice(0x0, kbd_matrix_select_keys.length);
        kbd_ui_refresh_axis(current_usb_client);
        kbd_ui_refresh_axis_matrix(current_usb_client);
        layui4("#kbd-axis-button-container").css("display", "none");
      }
    }
  });
  layui3.on("kbd-advance-key-matrix-action", {
    'select': async function () {
      var attr17 = this.getAttribute("kbd-key-matrix-index");
      if (kbd_key_matrix_index == Number(attr17)) {
        return;
      }
      kbd_key_matrix_index = Number(attr17);
      var flag9 = false;
      for (let len32 = 0x0; len32 < kbd_socd_infos.length; len32++) {
        if (kbd_key_infos[kbd_key_matrix_index].row == kbd_socd_infos[len32].row1 && kbd_key_infos[kbd_key_matrix_index].col == kbd_socd_infos[len32].col1 || kbd_key_infos[kbd_key_matrix_index].row == kbd_socd_infos[len32].row2 && kbd_key_infos[kbd_key_matrix_index].col == kbd_socd_infos[len32].col2) {
          kbd_key_setting_index = 0x0;
          layui.element.tabChange("kbd-setting-advance-key-type", 0x0);
          flag9 = true;
          break;
        }
      }
      for (let len33 = 0x0; len33 < kbd_mt_infos.length; len33++) {
        if (kbd_key_infos[kbd_key_matrix_index].row == kbd_mt_infos[len33].row && kbd_key_infos[kbd_key_matrix_index].col == kbd_mt_infos[len33].col) {
          kbd_key_setting_index = 0x1;
          layui.element.tabChange("kbd-setting-advance-key-type", 0x1);
          flag9 = true;
          break;
        }
      }
      for (let len34 = 0x0; len34 < kbd_rs_infos.length; len34++) {
        if (kbd_key_infos[kbd_key_matrix_index].row == kbd_rs_infos[len34].row1 && kbd_key_infos[kbd_key_matrix_index].col == kbd_rs_infos[len34].col1 || kbd_key_infos[kbd_key_matrix_index].row == kbd_rs_infos[len34].row2 && kbd_key_infos[kbd_key_matrix_index].col == kbd_rs_infos[len34].col2) {
          kbd_key_setting_index = 0x2;
          layui.element.tabChange("kbd-setting-advance-key-type", 0x2);
          flag9 = true;
          break;
        }
      }
      if (!flag9) {
        if (kbd_key_setting_index == 0x0) {
          if (kbd_select_elementId == "kbd-socd-key1") {
            document.getElementById("kbd-socd-key1").style.borderColor = '#16B777';
            document.getElementById("kbd-socd-key1").textContent = kbd_key_infos[kbd_key_matrix_index].name;
            kbd_edit_info.row1 = kbd_key_infos[kbd_key_matrix_index].row;
            kbd_edit_info.col1 = kbd_key_infos[kbd_key_matrix_index].col;
          } else if (kbd_select_elementId == "kbd-socd-key2") {
            document.getElementById("kbd-socd-key2").style.borderColor = '#16B777';
            document.getElementById("kbd-socd-key2").textContent = kbd_key_infos[kbd_key_matrix_index].name;
            kbd_edit_info.row2 = kbd_key_infos[kbd_key_matrix_index].row;
            kbd_edit_info.col2 = kbd_key_infos[kbd_key_matrix_index].col;
          } else {
            layui.element.tabChange("kbd-setting-advance-key-type", 0x0);
          }
        } else {
          if (kbd_key_setting_index == 0x2) {
            if (kbd_select_elementId == "kbd-rs-key1") {
              document.getElementById("kbd-rs-key1").style.borderColor = "#16B777";
              document.getElementById("kbd-rs-key1").textContent = kbd_key_infos[kbd_key_matrix_index].name;
              kbd_edit_info.row1 = kbd_key_infos[kbd_key_matrix_index].row;
              kbd_edit_info.col1 = kbd_key_infos[kbd_key_matrix_index].col;
            } else if (kbd_select_elementId == "kbd-rs-key2") {
              document.getElementById("kbd-rs-key2").style.borderColor = "#16B777";
              document.getElementById("kbd-rs-key2").textContent = kbd_key_infos[kbd_key_matrix_index].name;
              kbd_edit_info.row2 = kbd_key_infos[kbd_key_matrix_index].row;
              kbd_edit_info.col2 = kbd_key_infos[kbd_key_matrix_index].col;
            } else {
              layui.element.tabChange("kbd-setting-advance-key-type", 0x2);
            }
          } else {
            if (kbd_key_setting_index == 0x1) {
              layui.element.tabChange("kbd-setting-advance-key-type", 0x1);
            } else if (kbd_key_setting_index == 0x3) {
              layui.element.tabChange('kbd-setting-advance-key-type', 0x3);
            }
          }
        }
      }
      kbd_ui_refresh_advance_key_desc(current_usb_client);
      if (kbd_key_setting_index != 0x0) {
        kbd_ui_refresh_advance_key_matrix(current_usb_client);
      }
    }
  });
  layui3.on("kbd-advance-key-delete-action", {
    'select': async function () {
      if (kbd_key_matrix_index < 0x0) {
        return;
      }
      if (kbd_key_setting_index == 0x0) {
        for (var offset13 = 0x0; offset13 < kbd_socd_infos.length; offset13++) {
          var value130 = kbd_socd_infos[offset13];
          if (value130.row1 == kbd_edit_info.row1 && value130.col1 == kbd_edit_info.col1 && value130.row2 == kbd_edit_info.row2 && value130.col2 == kbd_edit_info.col2) {
            kbd_socd_infos.splice(offset13, 0x1);
            break;
          }
        }
        if (kbd_socd_infos.length > 0x0) {
          hs_set_socd_infos(current_usb_client, kbd_socd_infos);
        } else {
          hs_set_socd_num(current_usb_client, 0x0);
        }
      } else {
        if (kbd_key_setting_index == 0x2) {
          for (var offset13 = 0x0; offset13 < kbd_rs_infos.length; offset13++) {
            var value131 = kbd_rs_infos[offset13];
            if (value131.row1 == kbd_edit_info.row1 && value131.col1 == kbd_edit_info.col1 && value131.row2 == kbd_edit_info.row2 && value131.col2 == kbd_edit_info.col2) {
              kbd_rs_infos.splice(offset13, 0x1);
              break;
            }
          }
          if (kbd_rs_infos.length > 0x0) {
            hs_set_rs_infos(current_usb_client, kbd_rs_infos);
          } else {
            hs_set_rs_num(current_usb_client, 0x0);
          }
        } else {
          if (kbd_key_setting_index == 0x1) {
            for (var offset13 = 0x0; offset13 < kbd_mt_infos.length; offset13++) {
              var value132 = kbd_mt_infos[offset13];
              if (value132.row == kbd_edit_info.row && value132.col == kbd_edit_info.col) {
                kbd_mt_infos.splice(offset13, 0x1);
                break;
              }
            }
            if (kbd_mt_infos.length > 0x0) {
              hs_set_mt_infos(current_usb_client, kbd_mt_infos);
            } else {
              hs_set_mt_num(current_usb_client, 0x0);
            }
          } else {
            if (kbd_key_setting_index == 0x3) {
              for (var offset13 = 0x0; offset13 < kbd_dks_infos.length; offset13++) {
                var value133 = kbd_dks_infos[offset13];
                if (value133.row == kbd_edit_info.row && value133.col == kbd_edit_info.col) {
                  kbd_dks_infos.splice(offset13, 0x1);
                  break;
                }
              }
              if (kbd_dks_infos.length > 0x0) {
                hs_set_dks_infos(current_usb_client, kbd_dks_infos);
              } else {
                hs_set_dks_num(current_usb_client, 0x0);
              }
            }
          }
        }
      }
    }
  });
  layui3.on("kbd-advance-key-set-action", {
    'select': async function () {
      if (kbd_key_matrix_index < 0x0) {
        return;
      }
      if (kbd_key_setting_index == 0x0) {
        var flag10 = false;
        for (var offset14 = 0x0; offset14 < kbd_socd_infos.length; offset14++) {
          if (kbd_socd_infos[offset14].row1 == kbd_edit_info.row1 && kbd_socd_infos[offset14].col1 == kbd_edit_info.col1 || kbd_socd_infos[offset14].row2 == kbd_edit_info.row2 && kbd_socd_infos[offset14].col2 == kbd_edit_info.col2 || kbd_socd_infos[offset14].row2 == kbd_edit_info.row1 && kbd_socd_infos[offset14].col2 == kbd_edit_info.col1 || kbd_socd_infos[offset14].row1 == kbd_edit_info.row2 && kbd_socd_infos[offset14].col1 == kbd_edit_info.col2) {
            kbd_edit_info.id = kbd_socd_infos[offset14].id;
            kbd_socd_infos[offset14] = kbd_clone_socd_info(kbd_edit_info);
            flag10 = true;
            break;
          }
        }
        if (!flag10) {
          if (kbd_socd_infos.length >= 0x14) {
            el.confirm(str.prop("STRID_KBD_ADVANCE_KEY_MAX_HINT"), {
              'title': str.prop("STRID_TITLE_WARNING"),
              'skin': "layui-layer-confirm",
              'btn': [str.prop('STRING_OK')],
              'btnAlign': 'c',
              'btn1': function () {
                el.closeLast(0x0);
              }
            });
            return;
          }
          kbd_edit_info.id = kbd_socd_infos.length;
          kbd_socd_infos.push(kbd_clone_socd_info(kbd_edit_info));
        }
        hs_set_socd_infos(current_usb_client, kbd_socd_infos);
      } else {
        if (kbd_key_setting_index == 0x2) {
          var flag10 = false;
          for (var offset14 = 0x0; offset14 < kbd_rs_infos.length; offset14++) {
            if (kbd_rs_infos[offset14].row1 == kbd_edit_info.row1 && kbd_rs_infos[offset14].col1 == kbd_edit_info.col1 || kbd_rs_infos[offset14].row2 == kbd_edit_info.row2 && kbd_rs_infos[offset14].col2 == kbd_edit_info.col2 || kbd_rs_infos[offset14].row2 == kbd_edit_info.row1 && kbd_rs_infos[offset14].col2 == kbd_edit_info.col1 || kbd_rs_infos[offset14].row1 == kbd_edit_info.row2 && kbd_rs_infos[offset14].col1 == kbd_edit_info.col2) {
              kbd_edit_info.id = kbd_rs_infos[offset14].id;
              kbd_rs_infos[offset14] = kbd_clone_rs_info(kbd_edit_info);
              flag10 = true;
              break;
            }
          }
          if (!flag10) {
            if (kbd_rs_infos.length >= 0x14) {
              el.confirm(str.prop('STRID_KBD_ADVANCE_KEY_MAX_HINT'), {
                'title': str.prop("STRID_TITLE_WARNING"),
                'skin': "layui-layer-confirm",
                'btn': [str.prop('STRING_OK')],
                'btnAlign': 'c',
                'btn1': function () {
                  el.closeLast(0x0);
                }
              });
              return;
            }
            kbd_edit_info.id = kbd_rs_infos.length;
            kbd_rs_infos.push(kbd_clone_rs_info(kbd_edit_info));
          }
          hs_set_rs_infos(current_usb_client, kbd_rs_infos);
        } else {
          if (kbd_key_setting_index == 0x1) {
            var flag10 = false;
            for (var offset14 = 0x0; offset14 < kbd_mt_infos.length; offset14++) {
              if (kbd_mt_infos[offset14].row == kbd_edit_info.row && kbd_mt_infos[offset14].col == kbd_edit_info.col) {
                kbd_mt_infos[offset14] = kbd_clone_mt_info(kbd_edit_info);
                flag10 = true;
                break;
              }
            }
            if (!flag10) {
              if (kbd_mt_infos.length >= 0x14) {
                el.confirm(str.prop("STRID_KBD_ADVANCE_KEY_MAX_HINT"), {
                  'title': str.prop("STRID_TITLE_WARNING"),
                  'skin': 'layui-layer-confirm',
                  'btn': [str.prop("STRING_OK")],
                  'btnAlign': 'c',
                  'btn1': function () {
                    el.closeLast(0x0);
                  }
                });
                return;
              }
              kbd_edit_info.id = kbd_mt_infos.length;
              kbd_edit_info.row = kbd_key_infos[kbd_key_matrix_index].row;
              kbd_edit_info.col = kbd_key_infos[kbd_key_matrix_index].col;
              kbd_mt_infos.push(kbd_clone_mt_info(kbd_edit_info));
            }
            hs_set_mt_infos(current_usb_client, kbd_mt_infos);
          } else {
            if (kbd_key_setting_index == 0x3) {
              var flag10 = false;
              for (var offset14 = 0x0; offset14 < kbd_dks_infos.length; offset14++) {
                if (kbd_dks_infos[offset14].row == kbd_edit_info.row && kbd_dks_infos[offset14].col == kbd_edit_info.col) {
                  kbd_dks_infos[offset14] = kbd_clone_dks_info(kbd_edit_info);
                  flag10 = true;
                  break;
                }
              }
              if (!flag10) {
                if (kbd_dks_infos.length >= 0x14) {
                  el.confirm(str.prop("STRID_KBD_ADVANCE_KEY_MAX_HINT"), {
                    'title': str.prop("STRID_TITLE_WARNING"),
                    'skin': "layui-layer-confirm",
                    'btn': [str.prop("STRING_OK")],
                    'btnAlign': 'c',
                    'btn1': function () {
                      el.closeLast(0x0);
                    }
                  });
                  return;
                }
                kbd_edit_info.id = kbd_dks_infos.length;
                kbd_edit_info.row = kbd_key_infos[kbd_key_matrix_index].row;
                kbd_edit_info.col = kbd_key_infos[kbd_key_matrix_index].col;
                kbd_dks_infos.push(kbd_clone_dks_info(kbd_edit_info));
              }
              hs_set_dks_infos(current_usb_client, kbd_dks_infos);
            }
          }
        }
      }
    }
  });
  layui3.on('kbd-socd-key1-action', {
    'select': async function () {
      if (kbd_select_elementId == "kbd-socd-key1") {
        kbd_select_elementId = '';
        document.getElementById('kbd-socd-key1').style.color = is_dark_theme() ? "white" : "black";
        document.getElementById('kbd-socd-key1').style.backgroundColor = "transparent";
      } else {
        kbd_select_elementId = 'kbd-socd-key1';
        document.getElementById("kbd-socd-key1").style.color = is_dark_theme() ? "white" : 'black';
        document.getElementById("kbd-socd-key1").style.backgroundColor = "#16B77788";
      }
      document.getElementById('kbd-socd-key2').style.backgroundColor = "transparent";
      kbd_ui_refresh_advance_key_matrix(current_usb_client);
    }
  });
  layui3.on("kbd-socd-key2-action", {
    'select': async function () {
      if (kbd_select_elementId == "kbd-socd-key2") {
        kbd_select_elementId = '';
        document.getElementById("kbd-socd-key2").style.color = is_dark_theme() ? "white" : "black";
        document.getElementById("kbd-socd-key2").style.backgroundColor = "transparent";
      } else {
        kbd_select_elementId = "kbd-socd-key2";
        document.getElementById("kbd-socd-key2").style.color = is_dark_theme() ? "white" : "black";
        document.getElementById("kbd-socd-key2").style.backgroundColor = "#16B77788";
      }
      document.getElementById('kbd-socd-key1').style.backgroundColor = 'transparent';
      kbd_ui_refresh_advance_key_matrix(current_usb_client);
    }
  });
  layui2.on("radio(kbd-socd-type)", function (result) {
    var value134 = result.elem;
    var value135 = value134.checked;
    var value136 = value134.value;
    if (value135) {
      if (kbd_edit_info.socd_mode != Number(value136)) {
        kbd_edit_info.socd_mode = Number(value136);
        kbd_ui_refresh_advance_key_desc(current_usb_client);
      }
    }
  });
  layui3.on('kbd-mt-key1-action', {
    'select': async function () {
      if (kbd_key_matrix_index < 0x0) {
        el.confirm(str.prop('STRID_KBD_MT_HINT'), {
          'title': str.prop("STRID_TITLE_WARNING"),
          'skin': "layui-layer-confirm",
          'btn': [str.prop("STRING_OK")],
          'btnAlign': 'c',
          'btn1': function () {
            el.closeLast(0x0);
          }
        });
        return;
      }
      dialog_select_key_init('kbd-mt-key1');
      select_key_panel_id = el.open({
        'type': 0x1,
        'title': str.prop("STRID_SETTING_MAPPING_SELECT_KEY"),
        'skin': "layui-layer-confirm",
        'btn': [],
        'btnAlign': 'c',
        'content': layui4("#select-key-panel"),
        'end': function () {
          select_key_panel_id = undefined;
        }
      });
    }
  });
  layui3.on("kbd-mt-key2-action", {
    'select': async function () {
      if (kbd_key_matrix_index < 0x0) {
        el.confirm(str.prop('STRID_KBD_MT_HINT'), {
          'title': str.prop("STRID_TITLE_WARNING"),
          'skin': "layui-layer-confirm",
          'btn': [str.prop("STRING_OK")],
          'btnAlign': 'c',
          'btn1': function () {
            el.closeLast(0x0);
          }
        });
        return;
      }
      dialog_select_key_init("kbd-mt-key2");
      select_key_panel_id = el.open({
        'type': 0x1,
        'title': str.prop("STRID_SETTING_MAPPING_SELECT_KEY"),
        'skin': "layui-layer-confirm",
        'btn': [],
        'btnAlign': 'c',
        'content': layui4('#select-key-panel'),
        'end': function () {
          select_key_panel_id = undefined;
        }
      });
    }
  });
  layui3.on("kbd-rs-key1-action", {
    'select': async function () {
      if (kbd_select_elementId == "kbd-rs-key1") {
        kbd_select_elementId = '';
        document.getElementById("kbd-rs-key1").style.color = is_dark_theme() ? "white" : "black";
        document.getElementById("kbd-rs-key1").style.backgroundColor = 'transparent';
      } else {
        kbd_select_elementId = "kbd-rs-key1";
        document.getElementById('kbd-rs-key1').style.color = is_dark_theme() ? "white" : "black";
        document.getElementById("kbd-rs-key1").style.backgroundColor = '#16B77788';
      }
      document.getElementById('kbd-rs-key2').style.backgroundColor = "transparent";
      kbd_ui_refresh_advance_key_matrix(current_usb_client);
    }
  });
  layui3.on("kbd-rs-key2-action", {
    'select': async function () {
      if (kbd_select_elementId == 'kbd-rs-key2') {
        kbd_select_elementId = '';
        document.getElementById("kbd-rs-key2").style.color = is_dark_theme() ? 'white' : 'black';
        document.getElementById("kbd-rs-key2").style.backgroundColor = 'transparent';
      } else {
        kbd_select_elementId = "kbd-rs-key2";
        document.getElementById("kbd-rs-key2").style.color = is_dark_theme() ? 'white' : 'black';
        document.getElementById("kbd-rs-key2").style.backgroundColor = "#16B77788";
      }
      document.getElementById("kbd-rs-key1").style.backgroundColor = "transparent";
      kbd_ui_refresh_advance_key_matrix(current_usb_client);
    }
  });
  layui3.on("kbd-dks-select-key-action", {
    'select': async function () {
      if (kbd_key_matrix_index < 0x0) {
        el.confirm(str.prop("STRID_KBD_MT_HINT"), {
          'title': str.prop("STRID_TITLE_WARNING"),
          'skin': "layui-layer-confirm",
          'btn': [str.prop("STRING_OK")],
          'btnAlign': 'c',
          'btn1': function () {
            el.closeLast(0x0);
          }
        });
        return;
      }
      var attr18 = this.getAttribute("keyId");
      dialog_select_key_init("kbd-dks-key" + attr18);
      select_key_panel_id = el.open({
        'type': 0x1,
        'title': str.prop("STRID_SETTING_MAPPING_SELECT_KEY"),
        'skin': "layui-layer-confirm",
        'btn': [],
        'btnAlign': 'c',
        'content': layui4("#select-key-panel"),
        'end': function () {
          select_key_panel_id = undefined;
        }
      });
    }
  });
  layui3.on("kbd-dks-key-action", {
    'select': async function () {
      if (kbd_key_matrix_index < 0x0) {
        el.confirm(str.prop("STRID_KBD_MT_HINT"), {
          'title': str.prop("STRID_TITLE_WARNING"),
          'skin': "layui-layer-confirm",
          'btn': [str.prop('STRING_OK')],
          'btnAlign': 'c',
          'btn1': function () {
            el.closeLast(0x0);
          }
        });
        return;
      }
      if (kbd_dks_dragging && kbd_dks_dragging_up) {
        kbd_dks_dragging = false;
        kbd_dks_dragging_up = false;
        return;
      }
      var attr19 = this.getAttribute("keyId");
      var value137 = Math.floor(attr19 / 0xa);
      var value138 = attr19 % 0xa;
      var el2 = 'kbd-dks-key' + value137 + '-' + value138;
      var value139 = '#kbd-dks-add' + value137 + '-' + value138;
      var value140 = '#kbd-dks-arrow' + value137 + '-' + value138;
      var offset15 = 0x0;
      if (value137 == 0x1) {
        offset15 = kbd_edit_info.state1;
      } else {
        if (value137 == 0x2) {
          offset15 = kbd_edit_info.state2;
        } else {
          if (value137 == 0x3) {
            offset15 = kbd_edit_info.state3;
          } else if (value137 == 0x4) {
            offset15 = kbd_edit_info.state4;
          }
        }
      }
      if (layui4(value140).css('display') != 'none') {
        var value141 = layui4('#' + el2).css("width");
        if (value138 == 0x1) {
          if (value141 == "24px") {
            offset15 = offset15 & 0x3fe;
          } else {
            if (value141 == "77px") {
              offset15 = offset15 & 0x3fc;
            } else {
              if (value141 == "104px") {
                offset15 = offset15 & 0x3f0;
              } else {
                if (value141 == "157px") {
                  offset15 = offset15 & 0x3e0;
                } else {
                  if (value141 == '184px') {
                    offset15 = offset15 & 0x380;
                  } else {
                    if (value141 == "237px") {
                      offset15 = offset15 & 0x300;
                    } else if (value141 == '264px') {
                      offset15 = 0x0;
                    }
                  }
                }
              }
            }
          }
        } else {
          if (value138 == 0x2) {
            if (value141 == '24px') {
              offset15 = offset15 & 0x3f7;
            } else {
              if (value141 == "77px") {
                offset15 = offset15 & 0x3e7;
              } else {
                if (value141 == "104px") {
                  offset15 = offset15 & 0x387;
                } else {
                  if (value141 == "157px") {
                    offset15 = offset15 & 0x307;
                  } else if (value141 == '184px') {
                    offset15 = offset15 & 0x7;
                  }
                }
              }
            }
          } else {
            if (value138 == 0x3) {
              if (value141 == '24px') {
                offset15 = offset15 & 0x3bf;
              } else {
                if (value141 == '77px') {
                  offset15 = offset15 & 0x33f;
                } else if (value141 == '104px') {
                  offset15 = offset15 & 0x3f;
                }
              }
            } else if (value138 == 0x4) {
              offset15 = offset15 & 0x1ff;
            }
          }
        }
        if (value137 == 0x1) {
          kbd_edit_info.state1 = offset15;
        } else {
          if (value137 == 0x2) {
            kbd_edit_info.state2 = offset15;
          } else {
            if (value137 == 0x3) {
              kbd_edit_info.state3 = offset15;
            } else if (value137 == 0x4) {
              kbd_edit_info.state4 = offset15;
            }
          }
        }
        kbd_ui_refresh_dks_step(value137, offset15);
      } else {
        document.getElementById(el2).className = 'rounded-border-green';
        layui4('#' + el2).css("width", '24');
        layui4(value139).css("display", 'none');
        layui4(value140).css('display', '');
        layui4(value140).css("margin-left", 0xe);
        if (value138 == 0x1) {
          offset15 = offset15 | 0x1;
        } else {
          if (value138 == 0x2) {
            offset15 = offset15 | 0x8;
          } else {
            if (value138 == 0x3) {
              offset15 = offset15 | 0x40;
            } else if (value138 == 0x4) {
              offset15 = offset15 | 0x200;
            }
          }
        }
        if (value137 == 0x1) {
          kbd_edit_info.state1 = offset15;
        } else {
          if (value137 == 0x2) {
            kbd_edit_info.state2 = offset15;
          } else {
            if (value137 == 0x3) {
              kbd_edit_info.state3 = offset15;
            } else if (value137 == 0x4) {
              kbd_edit_info.state4 = offset15;
            }
          }
        }
      }
      kbd_ui_refresh_advance_key_desc(current_usb_client);
    }
  });
  layui3.on("kbd-dks-clean-action", {
    'select': async function () {
      var attr20 = this.getAttribute("keyId");
      var el3 = "kbd-dks-key" + attr20;
      document.getElementById(el3).style.borderColor = "gray";
      document.getElementById(el3).textContent = layui.i18np.prop("STRID_KBD_MT_SELECT_KEY");
      var value142 = Number(attr20);
      if (value142 == 0x1) {
        kbd_edit_info.state1 = 0x0;
        kbd_edit_info.keyCode1 = 0x0;
      } else {
        if (value142 == 0x2) {
          kbd_edit_info.state2 = 0x0;
          kbd_edit_info.keyCode2 = 0x0;
        } else {
          if (value142 == 0x3) {
            kbd_edit_info.state3 = 0x0;
            kbd_edit_info.keyCode3 = 0x0;
          } else if (value142 == 0x4) {
            kbd_edit_info.state4 = 0x0;
            kbd_edit_info.keyCode4 = 0x0;
          }
        }
      }
      kbd_ui_refresh_dks_step(value142, 0x0);
      kbd_ui_refresh_advance_key_desc(current_usb_client);
    }
  });
  layui3.on("kbd-fireware-download-action", {
    'download': async function () {
      window.location.href = "https://static.miracletek.net/pc/RAWMHUB_WIN7.zip";
    }
  });
  layui3.on("kbd-factory-reset-action", {
    'apply': async function () {
      el.open({
        'type': 0x1,
        'title': str.prop('STRID_TITLE_WARNING'),
        'skin': 'layui-layer-confirm',
        'content': layui4("#kbd-factory-reset-panel"),
        'btn': [str.prop("STRID_SETTING_FACTORY_RESET_S"), str.prop("STRID_BUTTON_CANCEL")],
        'btnAlign': 'c',
        'btn1': function () {
          el.closeLast(0x0);
          hs_set_factory_reset(current_usb_client);
        },
        'btn2': function () {
          el.closeLast(0x0);
        }
      });
    }
  });
  layui3.on('kbd-keycode-factory-reset-action', {
    'apply': async function () {
      el.open({
        'type': 0x1,
        'title': str.prop('STRID_TITLE_WARNING'),
        'skin': "layui-layer-confirm",
        'content': layui4('#kbd-keycode-factory-reset-panel'),
        'btn': [str.prop("STRID_SETTING_FACTORY_RESET_S"), str.prop("STRID_BUTTON_CANCEL")],
        'btnAlign': 'c',
        'btn1': function () {
          el.closeLast(0x0);
          hs_set_keycode_factory_reset(current_usb_client);
        },
        'btn2': function () {
          el.closeLast(0x0);
        }
      });
    }
  });
  layui3.on("dialog-select-key-action", {
    'select': async function () {
      var attr21 = this.getAttribute('kbd-select-key-index');
      attr21 = Number(attr21);
      var attr22 = this.getAttribute('elementId');
      var kbdSelectKeys = kbd_select_keys;
      document.getElementById(attr22).style.color = is_dark_theme() ? "white" : "black";
      document.getElementById(attr22).style.borderColor = "#16B777";
      document.getElementById(attr22).textContent = kbdSelectKeys[attr21].name;
      if (attr22 == "kbd-mt-key1") {
        kbd_edit_info.keyCode1 = kbdSelectKeys[attr21].keyId;
        kbd_ui_refresh_advance_key_desc(current_usb_client);
      } else {
        if (attr22 == "kbd-mt-key2") {
          kbd_edit_info.keyCode2 = kbdSelectKeys[attr21].keyId;
          kbd_ui_refresh_advance_key_desc(current_usb_client);
        } else {
          if (attr22 == "kbd-dks-key1") {
            kbd_edit_info.keyCode1 = kbdSelectKeys[attr21].keyId;
            kbd_ui_refresh_advance_key_desc(current_usb_client);
          } else {
            if (attr22 == "kbd-dks-key2") {
              kbd_edit_info.keyCode2 = kbdSelectKeys[attr21].keyId;
              kbd_ui_refresh_advance_key_desc(current_usb_client);
            } else {
              if (attr22 == "kbd-dks-key3") {
                kbd_edit_info.keyCode3 = kbdSelectKeys[attr21].keyId;
                kbd_ui_refresh_advance_key_desc(current_usb_client);
              } else if (attr22 == 'kbd-dks-key4') {
                kbd_edit_info.keyCode4 = kbdSelectKeys[attr21].keyId;
                kbd_ui_refresh_advance_key_desc(current_usb_client);
              }
            }
          }
        }
      }
      if (select_key_panel_id != undefined) {
        el.close(select_key_panel_id);
      }
    }
  });
  layui3.on("dialog-mouse-select-key-action", {
    'select': async function () {
      var attr23 = this.getAttribute("mouse-select-key-index");
      var attr24 = this.getAttribute("elementId");
      var mouseSelectKeysRef2 = mouse_select_keys;
      document.getElementById(attr24).style.borderColor = '#16B777';
      document.getElementById(attr24).textContent = mouseSelectKeysRef2[attr23].name;
      if (select_key_panel_id != undefined) {
        el.close(select_key_panel_id);
      }
    }
  });
  layui3.on("kbd-macro-item-action", {
    'select': async function () {
      var attr25 = this.getAttribute('kbd-macro-item-index');
      kbd_macro_select_index = Number(attr25);
      edit_macros = [];
      for (var len35 = 0x0; len35 < kbd_macro_infos[kbd_macro_select_index].length; len35++) {
        edit_macros.push(clone_macro_info(kbd_macro_infos[kbd_macro_select_index][len35]));
      }
      kbd_select_keyId = 0x7700 + kbd_macro_select_index;
      kbd_ui_macro_init(current_usb_client);
      kbd_ui_macro_edit_init(current_usb_client);
      kbd_ui_refresh_key_desc(current_usb_client);
    }
  });
  layui3.on("kbd-macro-add-select-key-action", {
    'select': async function () {
      dialog_select_key_init("kbd-macro-add-select-key");
      select_key_panel_id = el.open({
        'type': 0x1,
        'title': str.prop('STRID_SETTING_MAPPING_SELECT_KEY'),
        'skin': 'layui-layer-confirm',
        'btn': [],
        'btnAlign': 'c',
        'content': layui4("#select-key-panel"),
        'end': function () {
          select_key_panel_id = undefined;
        }
      });
    }
  });
  layui3.on("kbd-macro-record-action", {
    'select': async function () {
      var flag11 = false;
      setting_macro_edit_recording = false;
      setting_macro_edit_recording_time = -0x1;
      document.oncontextmenu = function (result) {
        result.preventDefault();
      };
      macro_record_panel_id = el.open({
        'type': 0x1,
        'title': str.prop('STRID_SETTING_MAPPING_MACRO_RECORD_TITLE'),
        'skin': 'layui-layer-confirm',
        'content': layui4('#setting-mapping-macro-record-panel'),
        'btn': [str.prop("STRID_SETTING_FACTORY_START")],
        'btnAlign': 'c',
        'btn1': function () {
          if (!flag11) {
            flag11 = true;
            setting_macro_edit_recording = true;
            var value143 = layui4("#layui-layer" + macro_record_panel_id + " .layui-layer-btn .layui-layer-btn0");
            value143.html(str.prop("STRID_DONE"));
            layui4("#macro-record-waiting-info").css('display', '');
            layui4('#macro-record-fixed-time-container').css("display", "none");
            return false;
          } else {
            if (record_mouse_key_delay_timer_id != undefined) {
              clearTimeout(record_mouse_key_delay_timer_id);
              record_mouse_key_delay_timer_id = undefined;
            }
            el.closeLast(0x0);
            setting_macro_edit_recording = false;
            document.oncontextmenu = null;
            layui4("#macro-record-waiting-info").css("display", "none");
            layui4('#macro-record-fixed-time-container').css('display', '');
          }
        },
        'cancel': function (result, data, index) {
          if (flag11) {
            if (record_mouse_key_delay_timer_id != undefined) {
              clearTimeout(record_mouse_key_delay_timer_id);
              record_mouse_key_delay_timer_id = undefined;
            }
            setting_macro_edit_recording = false;
            document.oncontextmenu = null;
          }
          return true;
        },
        'end': function () {
          if (flag11) {
            setting_mapping_macro_recording_remove_last();
            if (record_mouse_key_delay_timer_id != undefined) {
              clearTimeout(record_mouse_key_delay_timer_id);
              record_mouse_key_delay_timer_id = undefined;
            }
            setting_macro_edit_recording = false;
            document.oncontextmenu = null;
            macro_record_panel_id = undefined;
          }
        }
      });
    }
  });
  layui3.on("kbd-macro-add-action", {
    'select': async function () {
      macro_keep_time_min = 0x0;
      macro_edit_index = -0x1;
      current_edit_macro = create_macro_info();
      ui_refresh_mapping_macro_add(current_usb_client);
      el.open({
        'type': 0x1,
        'title': str.prop('STRID_SETTING_MAPPING_MACRO_ACTION_ADD'),
        'skin': "layui-layer-confirm",
        'content': layui4("#setting-mapping-macro-add-panel"),
        'btn': [str.prop("STRID_SAVE")],
        'btnAlign': 'c',
        'btn1': function () {
          el.closeLast(0x0);
          current_edit_macro.style = 0x16;
          var value144 = macro_keys[parseInt(layui4("[name=\"macro-add-select-key\"]").val())].vCode;
          if (value144 == 0x401) {
            current_edit_macro.mouse_key_event = 0x20a;
            current_edit_macro.mouse_key_code = -parseInt(layui4("#macro-add-wheel-delta-input").val());
          } else {
            if (value144 == 0x400) {
              current_edit_macro.mouse_key_event = 0x20a;
              current_edit_macro.mouse_key_code = parseInt(layui4('#macro-add-wheel-delta-input').val());
            } else {
              if (value144 == 0x402) {
                current_edit_macro.mouse_key_event = 0x20e;
                current_edit_macro.mouse_key_code = -parseInt(layui4("#macro-add-wheel-delta-input").val());
              } else {
                if (value144 == 0x403) {
                  current_edit_macro.mouse_key_event = 0x20e;
                  current_edit_macro.mouse_key_code = parseInt(layui4("#macro-add-wheel-delta-input").val());
                } else {
                  if (value144 == 0x404) {
                    current_edit_macro.mouse_key_event = 0x200;
                    var value145 = Math.round(parseFloat(layui4("#macro-add-move-delta-x-input").val()) * 0xa) + 0x7ff;
                    var value146 = Math.round(parseFloat(layui4("#macro-add-move-delta-y-input").val()) * 0xa) + 0x7ff;
                    current_edit_macro.mouse_key_code = value145 << 0x10 | value146;
                    current_edit_macro.mouse_key_loop = parseInt(layui4("#macro-add-move-loop-input").val());
                    if (current_edit_macro.mouse_key_loop <= 0x0) {
                      current_edit_macro.mouse_key_loop = 0x1;
                    }
                  } else {
                    if (value144 == 0x405) {
                      current_edit_macro.mouse_key_event = 0x2ff;
                      var value147 = parseInt(layui4("#macro-add-position-x-input").val());
                      var value148 = parseInt(layui4("#macro-add-position-y-input").val());
                      var screenW = window.screen.width;
                      var screenH = window.screen.height;
                      value147 = parseInt((value147 + 0.9) * 0xffff / screenW);
                      value148 = parseInt((value148 + 0.9) * 0xffff / screenH);
                      current_edit_macro.mouse_key_code = value147 << 0x10 | value148;
                    } else {
                      current_edit_macro.mouse_key_code = value144;
                      if (layui4("[name=\"mapping-macro-action-key-event\"]")[0x0].checked) {
                        current_edit_macro.mouse_key_event = 0x100;
                      } else if (layui4("[name=\"mapping-macro-action-key-event\"]")[0x1].checked) {
                        current_edit_macro.mouse_key_event = 0x101;
                      } else {
                        current_edit_macro.mouse_key_event = 0x0;
                      }
                    }
                  }
                }
              }
            }
          }
          current_edit_macro.name = get_key_name_from_code(value144);
          if (current_edit_macro.mouse_key_time == 0x0 && current_edit_macro.mouse_key_code > 0x0) {
            current_edit_macro.mouse_key_time = 0x1;
          }
          if (macro_edit_index < 0x0) {
            edit_macros.push(current_edit_macro);
          } else {
            edit_macros[macro_edit_index] = current_edit_macro;
          }
          kbd_ui_macro_edit_init(current_usb_client);
        }
      });
    }
  });
  layui3.on('kbd-macro-clear-action', {
    'select': async function () {
      edit_macros = [];
      kbd_ui_macro_edit_init(current_usb_client);
    }
  });
  layui3.on("kbd-macro-save-action", {
    'select': async function () {
      el.closeLast(0x0);
      if (kbd_macro_select_index >= 0x0) {
        kbd_macro_infos[kbd_macro_select_index] = [];
        for (var offset16 = 0x0; offset16 < edit_macros.length; offset16++) {
          kbd_macro_infos[kbd_macro_select_index].push(clone_macro_info(edit_macros[offset16]));
        }
        var offset17 = 0x0;
        for (var offset16 = 0x0; offset16 < kbd_macro_infos.length; offset16++) {
          var len36 = kbd_macro_infos[offset16];
          if (len36.length > 0x0) {
            for (var len37 = 0x0; len37 < len36.length; len37++) {
              var value149 = len36[len37];
              var value150 = get_keyid_from_code(value149.mouse_key_code);
              if (value149.mouse_key_event == 0x100) {
                offset17 = 0x1;
                macroBuff.push(offset17);
                offset17 = 0x2;
                macroBuff.push(offset17);
                offset17 = value150 & 0xff;
                macroBuff.push(offset17);
                offset17 = 0x1;
                macroBuff.push(offset17);
                offset17 = 0x4;
                macroBuff.push(offset17);
                var value151 = value149.mouse_key_time.toString();
                for (var offset18 = 0x0; offset18 < value151.length; offset18++) {
                  offset17 = value151[offset18].charCodeAt();
                  macroBuff.push(offset17);
                }
                offset17 = 0x1;
                macroBuff.push(offset17);
              } else {
                offset17 = 0x1;
                macroBuff.push(offset17);
                offset17 = 0x3;
                macroBuff.push(offset17);
                offset17 = value150 & 0xff;
                macroBuff.push(offset17);
                offset17 = 0x1;
                macroBuff.push(offset17);
                offset17 = 0x4;
                macroBuff.push(offset17);
                var value151 = value149.mouse_key_time.toString();
                for (var offset18 = 0x0; offset18 < value151.length; offset18++) {
                  offset17 = value151[offset18].charCodeAt();
                  macroBuff.push(offset17);
                }
                offset17 = 0x1;
                macroBuff.push(offset17);
              }
            }
          }
          offset17 = 0x0;
          macroBuff.push(offset17);
        }
        log_r(macroBuff);
        if (macroBuff.length > current_usb_client.device_info.kbd_macro_max_size) {
          el.msg(layui.i18np.prop("STRID_SETTING_MAPPING_MACRO_RECORD_MAX_EX"), {
            'icon': 0x0
          }, function () {});
          return true;
        }
        show_waiting();
        hs_set_macro_buf(current_usb_client, kbd_macro_infos);
        kbd_ui_macro_init(current_usb_client);
      }
    }
  });
  if (platform.os.family.indexOf("Windows") >= 0x0 && parseFloat(platform.os.version) <= 6.1) {
    document.getElementById("rawmhub-url").href = "https://static.miracletek.net/pc/RAWMHUB_WIN7.zip";
  } else {
    document.getElementById("rawmhub-url").href = 'https://static.miracletek.net/pc/RAWMHUB.zip';
  }
  layui2.render();
  clearTimeout(resize_timer_id);
  resize_timer_id = setTimeout(do_resize, RESIZE_DEBOUNCE_MS);
});

