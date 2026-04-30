// =============================================================================
// Named Constants — replaces all magic hex numbers across lib-rawm-deob
// =============================================================================
// Loaded before all other modules. Every magic number should be a named
// constant here so that code is self-documenting and grep‑able.
// =============================================================================

// ===== HS PROTOCOL — Keyboard Command IDs ====================================
export const CMD_FIRMWARE_VERSION   = 0xf5;
export const CMD_GET_KEYCODE_BUF    = 0x12;
export const CMD_SET_KEYCODE        = 0x5;
export const CMD_GET_LIGHT          = 0x8;
export const CMD_SET_LIGHT          = 0x7;
export const CMD_GET_LIGHT_DEFINE_BUF  = 0x36;
export const CMD_SET_LIGHT_DEFINE      = 0x37;
export const CMD_GET_AXIS_INFO      = 0x1a;
export const CMD_SET_AXIS_INFO      = 0x19;
export const CMD_GET_ONBOARD_INDEX  = 0x39;
export const CMD_SET_ONBOARD_INDEX  = 0x40;
export const CMD_GET_LIGHT_BOX      = 0x50;
export const CMD_SET_LIGHT_BOX      = 0x51;
export const CMD_GET_LIGHT_SLEEP    = 0x52;
export const CMD_SET_LIGHT_SLEEP    = 0x53;
export const CMD_GET_AXIS_MODE      = 0x45;
export const CMD_SET_AXIS_MODE      = 0x46;
export const CMD_CUSTOM_DATA_SAVE   = 0x41;
export const CMD_KEYCODE_FACTORY_RESET = 0x6;
export const CMD_HS_FACTORY_RESET   = 0xa;

export const CMD_SOCD_GET_NUM       = 0x1e;
export const CMD_SOCD_SET_NUM       = 0x1f;
export const CMD_SOCD_GET_DATA      = 0x20;
export const CMD_SOCD_SET_DATA      = 0x21;
export const CMD_MT_GET_NUM         = 0x22;
export const CMD_MT_SET_NUM         = 0x23;
export const CMD_MT_GET_DATA        = 0x24;
export const CMD_MT_SET_DATA        = 0x25;
export const CMD_RS_GET_NUM         = 0x2e;
export const CMD_RS_SET_NUM         = 0x2f;
export const CMD_RS_GET_DATA        = 0x30;
export const CMD_RS_SET_DATA        = 0x31;
export const CMD_DKS_GET_NUM        = 0x2a;
export const CMD_DKS_SET_NUM        = 0x2b;
export const CMD_DKS_GET_DATA       = 0x2c;
export const CMD_DKS_SET_DATA       = 0x2d;
export const CMD_MACRO_GET          = 0xe;
export const CMD_MACRO_SET          = 0xf;
export const CMD_MACRO_NUM          = 0xc;
export const CMD_MACRO_SIZE         = 0xd;
export const CMD_MACRO_RESET        = 0x10;

// ===== HS PROTOCOL — Light Sub-parameter IDs ==================================
export const LIGHT_PARAM_BRIGHTNESS = 0x1;
export const LIGHT_PARAM_MODE       = 0x2;
export const LIGHT_PARAM_SPEED      = 0x3;
export const LIGHT_PARAM_HUE_SAT    = 0x4;
export const LIGHT_PARAM_BOX_MODE   = 0x5;

// ===== HS SYNC — Bitmask Flags ================================================
export const SYNC_FLAG_KEYCODE      = 0x1;
export const SYNC_FLAG_LIGHT        = 0x2;
export const SYNC_FLAG_AXIS         = 0x4;
export const SYNC_FLAG_ADVANCED     = 0x8;

// ===== HID PROTOCOL — Action & Config Command IDs =============================
export const HID_QUERY              = 0x1;
export const HID_PARAM_CMD          = 0x3;
export const HID_ACTION_CMD         = 0x6;
export const HID_SYNC_CMD           = 0x7;
export const HID_PING_CMD           = 0xe;

export const HID_ACTION_MOUSE_PARAM       = 0x15;
export const HID_ACTION_MOUSE_KEY         = 0x16;
export const HID_ACTION_MOUSE_FUNCTION    = 0x18;
export const HID_ACTION_SET_ESB_ADDR      = 0x1c;
export const HID_ACTION_CLEAR_ESB_ADDR    = 0x1d;
export const HID_ACTION_SELECT_ESB_ADDR   = 0x1e;
export const HID_ACTION_SET_COLOR_CODE    = 0x1f;
export const HID_ACTION_SET_SLEEP_TIME    = 0x21;
export const HID_ACTION_SET_RF_CHANNEL    = 0x23;
export const HID_ACTION_GAMING_ONLY       = 0x27;
export const HID_ACTION_SET_BRIGHTNESS    = 0x31;
export const HID_ACTION_SET_AUTO_HOP      = 0x32;
export const HID_ACTION_MACRO_FIRST       = 0x5;
export const HID_ACTION_MACRO_CONT         = 0x2b;

// ===== HID PROTOCOL — Action Command Values (for send_event_action) ===========
export const CMD_VIRTUAL_CHILD_POLL = 0x42;
export const CMD_DEVICE_REBOOT      = 0x33;
export const CMD_FACTORY_RESET      = 0x35;
export const CMD_CONFIG_RESET       = 0x3;
export const CMD_QUERY_MORE_RESULT  = 0x34;

// ===== HID PROTOCOL — Response Types (parse_cmd outer switch) =================
export const RESP_DEVICE_INFO_JSON  = 0x2;
export const RESP_SYNC              = 0x7;
export const RESP_PARAMETER         = 0xb;
export const RESP_PING              = 0xe;

// ===== HID PROTOCOL — Parameter Subtypes (parse_cmd inner switch for 0xb) =====
export const PARAM_RESOLUTION       = 0x0;
export const PARAM_POLLING_RATE     = 0x1;
export const PARAM_POWER_MODE       = 0x5;
export const PARAM_RESOLUTION_32BIT = 0x6;
export const PARAM_LOD              = 0x7;
export const PARAM_KEY_DELAY        = 0x8;
export const PARAM_KEY_DELAY_NOOP   = 0x9;
export const PARAM_ESB_DEVICE_INFO  = 0xc;
export const PARAM_MOTION_SYNC      = 0xd;
export const PARAM_ANGLE_TUNING     = 0xe;
export const PARAM_ANGLE_SNAPPING   = 0xf;
export const PARAM_RIPPLE_CONTROL   = 0x10;
export const PARAM_2_4G_SCORES      = 0x13;
export const PARAM_KEY_DELAY_ENTRY  = 0x14;
export const PARAM_PEER_INFO        = 0x15;
export const PARAM_BATTERY_LEVELS   = 0x16;
export const PARAM_BATTERY_PERCENT  = 0x17;
export const PARAM_COLOR_CODE       = 0x19;
export const PARAM_SLEEP_TIME       = 0x1a;
export const PARAM_RSSI             = 0x1c;
export const PARAM_LUA_STATUS       = 0x1d;
export const PARAM_PARAM_1e         = 0x1e;
export const PARAM_PARAM_1f         = 0x1f;
export const PARAM_NOACK            = 0x20;
export const PARAM_GLASS_MODE       = 0x21;
export const PARAM_ONBOARD_INDEX    = 0x22;
export const PARAM_ONBOARD_STATUS   = 0x23;

// ===== BUFFER / SIZE CONSTANTS ================================================
export const HS_FRAME_SIZE          = 0x20;
export const HS_CHUNK_MAX           = 0x1c;
export const HID_REPORT_SIZE        = 0x40;
export const HID_LENGTH_MASK        = 0x3f;
export const ESB_ALIVE_TIMEOUT_MS   = 0xbb8;
export const SYNC_TIMEOUT_MS        = 0x3e8;
export const CONFIG_TIMEOUT_MS      = 0x7d0;
export const CHANNEL_SET_DELAY_MS   = 0x5dc;
export const REBOOT_DELAY_MS        = 0x1f4;
export const RESIZE_DEBOUNCE_MS     = 0xfa;
export const MACRO_KEEP_TIME_MAX_MS = 0xea60;
export const MACRO_KEEP_TIME_STEP   = 0x1f4;
export const HID_SEND_DEBOUNCE_MS   = 0x19;
export const POLLING_RATE_MAX_HZ    = 0x1f40;
export const POLLING_RATE_MIN_HZ    = 0x7d;
export const CPI_STEP_DEFAULT       = 0x1;
export const CPI_XY_MASK            = 0xffff0000;
export const CPI_LOW_MASK           = 0xffff;
export const BATTERY_FULL_PERCENT   = 0x64;
export const BRIGHTNESS_DEFAULT     = 0x80;
export const SLEEP_DEFAULT_SEC      = 0x3c;
export const SLEEP_MAX_SEC          = 0x708;
export const RESOLUTION_DEFAULT     = 0x640;
export const API_VERSION            = 0x9;

// ===== PRODUCT IDs ============================================================
export const PID_KNIFE    = 0x2328;
export const PID_ML01     = 0x2329;
export const PID_RECEIVER = 0x232a;
export const PID_RECEIVER_8K = 0x232b;
export const PID_MH01     = 0x232c;
export const PID_SL01     = 0x232d;
export const PID_SH01     = 0x232e;
export const PID_GS_SH01  = 0x232f;
export const PID_ER21     = 0x2330;
export const PID_ES21     = 0x2331;
export const PID_ES21PRO  = 0x2332;
export const PID_ER21M    = 0x2334;
export const PID_ER21PRO  = 0x2335;
export const PID_ER21PRO_B = 0x2336;
export const PID_ES21M    = 0x2337;
export const PID_MH01PRO  = 0x2338;
export const PID_SH01PRO  = 0x2339;
export const PID_233a     = 0x233a;
export const PID_233e     = 0x233e;
export const PID_233f     = 0x233f;
export const PID_2340     = 0x2340;
export const PID_2343     = 0x2343;
export const PID_2344     = 0x2344;
export const PID_2349     = 0x2349;
export const PID_234a     = 0x234a;
export const PID_2352     = 0x2352;

// ===== KEY CODE / MOUSE EVENT CONSTANTS =======================================
export const MOUSE_EVENT_KEY_DOWN   = 0x100;
export const MOUSE_EVENT_KEY_UP     = 0x101;
export const MOUSE_EVENT_MOVE       = 0x200;
export const MOUSE_EVENT_WHEEL_VERT = 0x20a;
export const MOUSE_EVENT_WHEEL_HORZ = 0x20e;
export const MOUSE_EVENT_POSITION   = 0x2ff;
export const MOUSE_WHEEL_UP         = 0x400;
export const MOUSE_WHEEL_DOWN       = 0x401;
export const MOUSE_WHEEL_LEFT       = 0x402;
export const MOUSE_WHEEL_RIGHT      = 0x403;
export const MOUSE_MOVE_CODE        = 0x404;
export const MOUSE_POSITION_CODE    = 0x405;

export const KEYCODE_EXT_THRESHOLD  = 0xff;
export const KEYCODE_MEDIA_START    = 0x200;

export const SCAN_CODE_CTRL         = 0xa2;
export const SCAN_CODE_ALT          = 0xa4;
export const SCAN_CODE_SHIFT        = 0xa0;
export const SCAN_CODE_WIN          = 0x5b;
export const VK_CODE_CTRL           = 0x11;
export const VK_CODE_ALT            = 0x12;
export const VK_CODE_SHIFT          = 0x10;

export const KEY_WHEEL_UP_ID        = 0x7;
export const KEY_WHEEL_DOWN_ID      = 0x8;

// ===== MACRO STYLE / TRIGGER CONSTANTS ========================================
export const MACRO_STYLE_PRESS      = 0x0;
export const MACRO_STYLE_RELEASE    = 0x1;
export const MACRO_STYLE_TOGGLE     = 0x2;
export const MACRO_STYLE_LONG_PRESS = 0x3;
export const MACRO_STYLE_LONG_TOGGLE = 0x4;
export const MACRO_STYLE_LONG_RELEASE = 0x5;
export const MACRO_STYLE_TOGGLE_LOOP = 0x6;
export const MACRO_RECORD_STYLE     = 0x16;

export const MACRO_CHUNK_SIZE       = 0x38;
export const MACRO_CHUNK_LIMIT      = 0x5;

// ===== TOUCH STYLE CONSTANTS ==================================================
export const TOUCH_STYLE_KEY_MAP    = 0x1b;
export const TOUCH_STYLE_FUNC_MAP   = 0x1d;

// ===== MOUSE FUNCTION IDs =====================================================
export const FUNC_NONE              = 0x0;
export const FUNC_TOGGLE_CPI        = 0x1;
export const FUNC_NEXT_CPI          = 0x2;
export const FUNC_PREV_CPI          = 0x3;
export const FUNC_TOGGLE_ASSIST     = 0x4;
export const FUNC_NEXT_ASSIST       = 0x5;
export const FUNC_PREV_ASSIST       = 0x6;
export const FUNC_PRESS_CPI         = 0x9;
export const FUNC_ADD_CPI           = 0xa;
export const FUNC_PLUS_CPI          = 0xb;
export const FUNC_CHOOSE_ASSIST     = 0xc;
export const FUNC_TOGGLE_ESB        = 0xd;
export const FUNC_SHOW_POWER        = 0xe;
export const FUNC_TOGGLE_BLE        = 0xf;
export const FUNC_SHELL_CMD         = 0x10;
export const FUNC_TOGGLE_ONBOARD    = 0x11;
export const FUNC_NEXT_ONBOARD      = 0x12;
export const FUNC_PREV_ONBOARD      = 0x13;
export const FUNC_TOGGLE_MINI_HUB   = 0x15;
export const FUNC_TOGGLE_WORK_MODE  = 0x16;

// ===== CONFIG TYPE CONSTANTS ==================================================
export const CONFIG_TYPE_KEY        = 0x0;
export const CONFIG_TYPE_MACRO      = 0x5;

// ===== LIGHT MODE CONSTANTS (Keyboard) ========================================
export const LIGHT_MODE_CLOSE       = 0x0;
export const LIGHT_MODE_CUSTOM      = 0x1c;
export const LIGHT_MODE_CUSTOM_2    = 0x1d;
export const LIGHT_MODE_CUSTOM_3    = 0x1e;
export const LIGHT_MODE_KEY_DEFINE  = 0x2d;

// ===== LIGHT BOX MODE CONSTANTS ===============================================
export const BOX_MODE_CLOSE         = 0x0;
export const BOX_MODE_1             = 0x1;
export const BOX_MODE_2             = 0x2;
export const BOX_MODE_3             = 0x3;
export const BOX_MODE_4             = 0x4;

// ===== LANGUAGE / LOCALE CONSTANTS ============================================
export const LANG_ZH_CN             = 0x0;
export const LANG_EN_US             = 0x1;
export const LANG_ZH_TW             = 0x2;
export const LANG_KO_KR             = 0x3;
export const LANG_JA_JP             = 0x4;
export const LANG_UK_UA             = 0x5;
export const LANG_TR_TR             = 0x6;

// ===== BITWISE MASK CONSTANTS =================================================
export const MASK_LOW_NIBBLE        = 0xf;
export const MASK_HIGH_NIBBLE       = 0xf0;
export const MASK_BYTE              = 0xff;
export const MASK_HIGH_BIT          = 0x80;
export const MASK_LOW_7BITS         = 0x7f;
export const MASK_TOP_2BITS         = 0xc0;
export const MASK_BOTTOM_6BITS      = 0x3f;
export const MASK_12BIT             = 0xf00;

// ===== DEVICE INFO DEFAULT CONSTANTS ==========================================
export const KBD_DEFAULT_ONBOARD_NUM   = 0x3;
export const POWER_MODE_DEFAULT        = 0x2;
export const POWER_MODE_LOWEST         = 0x0;
export const POWER_MODE_LOW            = 0x1;
export const KEY_DELAY_DEFAULT         = 0x8;
export const BATT_LEVEL_COUNT          = 0xb;
export const CPI_LEVEL_COUNT           = 0x8;
export const CPI_LEVEL_DEFAULTS        = [0x190, 0x320, 0x640, 0xc80, 0x0, 0x0, 0x0, 0x0];
export const BATT_LEVEL_DEFAULTS       = [0x1004, 0xfa0, 0xf6e, 0xf3c, 0xf0a, 0xed8, 0xea6, 0xe74, 0xdac, 0xce4, 0xc1c];

// ===== POLLING RATE CONSTANTS ==================================================
export const POLLING_RATE_1000HZ       = 0x3e8;
export const POWER_MODE_COUNT_LIMIT    = 0x3;

// ===== KEY NAME STRING CONSTANTS (migrated from 01-obfuscation.js) ==============
export const KEY_NONE          = "NONE";
export const KEY_CTRL          = "CTRL";
export const KEY_SHIFT         = "SHIFT";
export const KEY_WINDOWS       = "WINDOWS";
export const KEY_SPACE         = "SPACE";
export const KEY_ESC           = "ESC";
export const KEY_TILDE         = "TILDE";
export const KEY_TAB           = "TAB";
export const KEY_SCROLL        = "SCROLL";
export const KEY_DOWN_ARROW    = "DOWNARROW";
export const KEY_UP_ARROW      = "UPARROW";
export const KEY_LEFT_ARROW    = "LEFTARROW";
export const KEY_SHIFT_R       = "SHIFTR";
export const KEY_ALT_R         = "ALTR";
export const KEY_HOME          = "HOME";
export const KEY_PAGEUP        = "PAGEUP";
export const KEY_DELETE        = "DELETE";
export const KEY_END           = "END";
export const KEY_PAGEDOWN      = "PAGEDOWN";
export const KEY_NUMLOCK       = "NUMLOCK";
export const KEY_KPD_STAR      = "KPDSTAR";
export const KEY_KPD_MINUS     = "KPDMINUS";
export const KEY_KPD_PLUS      = "KPDPLUS";
export const KEY_KPD_ENTER     = "KPDENTER";
export const KEY_KPD_DOT       = "KPDDOT";
export const KEY_APP           = "APP";
export const KEY_F10           = "F10";
export const KEY_F11           = "F11";
export const KEY_F12           = "F12";
export const KEY_NUM0          = "NUM0";
export const KEY_EQUAL         = "EQUAL";
export const KEY_LEFT_BRACE    = "LEFTBRACE";
export const KEY_RIGHT_BRACE   = "RIGHTBRACE";
export const KEY_VERTICAL_BAR  = "VERTICALBAR";
export const KEY_COLON         = "COLON";
export const KEY_QUOTE         = "QUOTE";
export const KEY_LESS_THAN     = "LESSTHAN";
export const KEY_GREAT_THAN    = "GREATTHAN";
export const KEY_WHEEL_UP      = "WHEELUP";
export const KEY_WHEEL_DOWN    = "WHEELDOWN";
export const KEY_WHEEL_LEFT    = "WHEELLEFT";
export const KEY_WHEEL_RIGHT   = "WHEELRIGHT";
export const KEY_MOUSE_MOVE    = "MOUSEMOVE";

// ===== DEVICE SYNC ===========================================================
export const SYNC_DATA = "SYNC!@#$%^";
