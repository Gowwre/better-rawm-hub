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
const KEY_DELAY_DEFAULT         = 0x8;
const BATT_LEVEL_COUNT          = 0xb;
const CPI_LEVEL_COUNT           = 0x8;
const CPI_LEVEL_DEFAULTS        = [0x190, 0x320, 0x640, 0xc80, 0x0, 0x0, 0x0, 0x0];
const BATT_LEVEL_DEFAULTS       = [0x1004, 0xfa0, 0xf6e, 0xf3c, 0xf0a, 0xed8, 0xea6, 0xe74, 0xdac, 0xce4, 0xc1c];
