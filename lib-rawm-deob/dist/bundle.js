var RAWMHub = (() => {
  // data/constants.js
  var CMD_FIRMWARE_VERSION = 245;
  var CMD_GET_KEYCODE_BUF = 18;
  var CMD_SET_KEYCODE = 5;
  var CMD_GET_LIGHT = 8;
  var CMD_SET_LIGHT = 7;
  var CMD_GET_LIGHT_DEFINE_BUF = 54;
  var CMD_SET_LIGHT_DEFINE = 55;
  var CMD_GET_AXIS_INFO = 26;
  var CMD_SET_AXIS_INFO = 25;
  var CMD_GET_ONBOARD_INDEX = 57;
  var CMD_SET_ONBOARD_INDEX = 64;
  var CMD_GET_LIGHT_BOX = 80;
  var CMD_SET_LIGHT_BOX = 81;
  var CMD_GET_LIGHT_SLEEP = 82;
  var CMD_SET_LIGHT_SLEEP = 83;
  var CMD_GET_AXIS_MODE = 69;
  var CMD_SET_AXIS_MODE = 70;
  var CMD_CUSTOM_DATA_SAVE = 65;
  var CMD_KEYCODE_FACTORY_RESET = 6;
  var CMD_HS_FACTORY_RESET = 10;
  var CMD_SOCD_GET_NUM = 30;
  var CMD_SOCD_SET_NUM = 31;
  var CMD_SOCD_GET_DATA = 32;
  var CMD_SOCD_SET_DATA = 33;
  var CMD_MT_GET_NUM = 34;
  var CMD_MT_SET_NUM = 35;
  var CMD_MT_GET_DATA = 36;
  var CMD_MT_SET_DATA = 37;
  var CMD_RS_GET_NUM = 46;
  var CMD_RS_SET_NUM = 47;
  var CMD_RS_GET_DATA = 48;
  var CMD_RS_SET_DATA = 49;
  var CMD_DKS_GET_NUM = 42;
  var CMD_DKS_SET_NUM = 43;
  var CMD_DKS_GET_DATA = 44;
  var CMD_DKS_SET_DATA = 45;
  var CMD_MACRO_GET = 14;
  var CMD_MACRO_SET = 15;
  var CMD_MACRO_NUM = 12;
  var CMD_MACRO_SIZE = 13;
  var CMD_MACRO_RESET = 16;
  var LIGHT_PARAM_BRIGHTNESS = 1;
  var LIGHT_PARAM_MODE = 2;
  var LIGHT_PARAM_SPEED = 3;
  var LIGHT_PARAM_HUE_SAT = 4;
  var LIGHT_PARAM_BOX_MODE = 5;
  var SYNC_FLAG_KEYCODE = 1;
  var SYNC_FLAG_LIGHT = 2;
  var SYNC_FLAG_AXIS = 4;
  var SYNC_FLAG_ADVANCED = 8;
  var HID_QUERY = 1;
  var HID_PARAM_CMD = 3;
  var HID_ACTION_CMD = 6;
  var HID_PING_CMD = 14;
  var HID_ACTION_MOUSE_PARAM = 21;
  var HID_ACTION_MOUSE_KEY = 22;
  var HID_ACTION_MOUSE_FUNCTION = 24;
  var HID_ACTION_SET_ESB_ADDR = 28;
  var HID_ACTION_CLEAR_ESB_ADDR = 29;
  var HID_ACTION_SELECT_ESB_ADDR = 30;
  var HID_ACTION_SET_COLOR_CODE = 31;
  var HID_ACTION_SET_SLEEP_TIME = 33;
  var HID_ACTION_SET_RF_CHANNEL = 35;
  var HID_ACTION_GAMING_ONLY = 39;
  var HID_ACTION_SET_BRIGHTNESS = 49;
  var HID_ACTION_SET_AUTO_HOP = 50;
  var HID_ACTION_MACRO_FIRST = 5;
  var HID_ACTION_MACRO_CONT = 43;
  var CMD_VIRTUAL_CHILD_POLL = 66;
  var CMD_FACTORY_RESET = 53;
  var CMD_QUERY_MORE_RESULT = 52;
  var RESP_DEVICE_INFO_JSON = 2;
  var RESP_SYNC = 7;
  var RESP_PARAMETER = 11;
  var RESP_PING = 14;
  var PARAM_RESOLUTION = 0;
  var PARAM_POLLING_RATE = 1;
  var PARAM_POWER_MODE = 5;
  var PARAM_RESOLUTION_32BIT = 6;
  var PARAM_LOD = 7;
  var PARAM_KEY_DELAY = 8;
  var PARAM_KEY_DELAY_NOOP = 9;
  var PARAM_ESB_DEVICE_INFO = 12;
  var PARAM_MOTION_SYNC = 13;
  var PARAM_ANGLE_TUNING = 14;
  var PARAM_ANGLE_SNAPPING = 15;
  var PARAM_RIPPLE_CONTROL = 16;
  var PARAM_2_4G_SCORES = 19;
  var PARAM_KEY_DELAY_ENTRY = 20;
  var PARAM_PEER_INFO = 21;
  var PARAM_BATTERY_LEVELS = 22;
  var PARAM_BATTERY_PERCENT = 23;
  var PARAM_COLOR_CODE = 25;
  var PARAM_SLEEP_TIME = 26;
  var PARAM_RSSI = 28;
  var PARAM_LUA_STATUS = 29;
  var PARAM_PARAM_1e = 30;
  var PARAM_PARAM_1f = 31;
  var PARAM_NOACK = 32;
  var PARAM_GLASS_MODE = 33;
  var PARAM_ONBOARD_INDEX = 34;
  var PARAM_ONBOARD_STATUS = 35;
  var HS_FRAME_SIZE = 32;
  var HS_CHUNK_MAX = 28;
  var HID_REPORT_SIZE = 64;
  var HID_LENGTH_MASK = 63;
  var ESB_ALIVE_TIMEOUT_MS = 3e3;
  var SYNC_TIMEOUT_MS = 1e3;
  var CONFIG_TIMEOUT_MS = 2e3;
  var CHANNEL_SET_DELAY_MS = 1500;
  var REBOOT_DELAY_MS = 500;
  var RESIZE_DEBOUNCE_MS = 250;
  var MACRO_KEEP_TIME_MAX_MS = 6e4;
  var MACRO_KEEP_TIME_STEP = 500;
  var HID_SEND_DEBOUNCE_MS = 25;
  var POLLING_RATE_MAX_HZ = 8e3;
  var CPI_STEP_DEFAULT = 1;
  var CPI_XY_MASK = 4294901760;
  var CPI_LOW_MASK = 65535;
  var BATTERY_FULL_PERCENT = 100;
  var BRIGHTNESS_DEFAULT = 128;
  var SLEEP_DEFAULT_SEC = 60;
  var SLEEP_MAX_SEC = 1800;
  var RESOLUTION_DEFAULT = 1600;
  var API_VERSION = 9;
  var MOUSE_EVENT_KEY_DOWN = 256;
  var MOUSE_EVENT_KEY_UP = 257;
  var MOUSE_EVENT_MOVE = 512;
  var MOUSE_EVENT_WHEEL_VERT = 522;
  var MOUSE_EVENT_WHEEL_HORZ = 526;
  var MOUSE_EVENT_POSITION = 767;
  var MOUSE_WHEEL_UP = 1024;
  var MOUSE_WHEEL_DOWN = 1025;
  var MOUSE_WHEEL_LEFT = 1026;
  var MOUSE_WHEEL_RIGHT = 1027;
  var KEYCODE_EXT_THRESHOLD = 255;
  var KEYCODE_MEDIA_START = 512;
  var SCAN_CODE_CTRL = 162;
  var SCAN_CODE_ALT = 164;
  var SCAN_CODE_SHIFT = 160;
  var SCAN_CODE_WIN = 91;
  var VK_CODE_CTRL = 17;
  var VK_CODE_ALT = 18;
  var VK_CODE_SHIFT = 16;
  var KEY_WHEEL_UP_ID = 7;
  var KEY_WHEEL_DOWN_ID = 8;
  var MACRO_STYLE_PRESS = 0;
  var MACRO_STYLE_RELEASE = 1;
  var MACRO_STYLE_TOGGLE = 2;
  var MACRO_STYLE_LONG_PRESS = 3;
  var MACRO_STYLE_LONG_TOGGLE = 4;
  var MACRO_STYLE_LONG_RELEASE = 5;
  var MACRO_STYLE_TOGGLE_LOOP = 6;
  var MACRO_RECORD_STYLE = 22;
  var MACRO_CHUNK_SIZE = 56;
  var MACRO_CHUNK_LIMIT = 5;
  var TOUCH_STYLE_KEY_MAP = 27;
  var TOUCH_STYLE_FUNC_MAP = 29;
  var FUNC_PRESS_CPI = 9;
  var CONFIG_TYPE_KEY = 0;
  var CONFIG_TYPE_MACRO = 5;
  var LANG_ZH_CN = 0;
  var LANG_EN_US = 1;
  var LANG_ZH_TW = 2;
  var LANG_KO_KR = 3;
  var LANG_JA_JP = 4;
  var LANG_UK_UA = 5;
  var LANG_TR_TR = 6;
  var MASK_LOW_NIBBLE = 15;
  var MASK_BYTE = 255;
  var MASK_TOP_2BITS = 192;
  var MASK_12BIT = 3840;
  var KBD_DEFAULT_ONBOARD_NUM = 3;
  var POWER_MODE_DEFAULT = 2;
  var POWER_MODE_LOWEST = 0;
  var POWER_MODE_LOW = 1;
  var KEY_DELAY_DEFAULT = 8;
  var POLLING_RATE_1000HZ = 1e3;
  var POWER_MODE_COUNT_LIMIT = 3;
  var KEY_WHEEL_UP = "WHEELUP";
  var KEY_WHEEL_DOWN = "WHEELDOWN";
  var SYNC_DATA = "SYNC!@#$%^";

  // data/key-database.js
  var KEY_DB = {
    modifiers: [
      { t: 0, v: 0, n: "$STRID_NONE", a: 0, an: "NONE", s: 0 },
      { t: 0, v: 17, n: "Ctrl", a: 0, an: "NONE", s: 0 },
      { t: 0, v: 18, n: { win: "Alt", mac: "Option" }, a: 0, an: "NONE", s: 0 },
      { t: 0, v: 16, n: "Shift", a: 0, an: "NONE", s: 0 },
      { t: 0, v: 91, n: { win: "Win", mac: "Command" }, a: 0, an: "NONE", s: 0 }
    ],
    keys: [
      // None
      { t: 0, v: 0, n: "$STRID_NONE", a: 0, an: "NONE", s: 0 },
      // Mouse M1–M8
      { t: 1, v: 256, n: ["$STRID_KEY_LEFT"], a: 0, an: "M1", s: 256 },
      { t: 1, v: 257, n: ["$STRID_KEY_RIGHT"], a: 0, an: "M2", s: 257 },
      { t: 1, v: 258, n: ["$STRID_KEY_MIDDLE"], a: 0, an: "M3", s: 258 },
      { t: 1, v: 259, n: ["$STRID_KEY_BACK", "/M4"], a: 0, an: "M4", s: 259 },
      { t: 1, v: 260, n: ["$STRID_KEY_FORWARD", "/M5"], a: 0, an: "M5", s: 260 },
      { t: 1, v: 261, n: "M 6", a: 0, an: "M6", s: 261 },
      { t: 1, v: 262, n: "M 7", a: 0, an: "M7", s: 262 },
      { t: 1, v: 263, n: "M 8", a: 0, an: "M8", s: 263 },
      { t: 1, v: 1024, n: ["$STRID_KEY_WHELL_UP"], a: 0, an: "WHEELUP", s: 1024 },
      { t: 1, v: 1025, n: ["$STRID_KEY_WHELL_DOWN"], a: 0, an: "WHEELDOWN", s: 1025 },
      { t: 1, v: 1026, n: ["$STRID_KEY_WHELL_LEFT"], a: 0, an: "WHEELLEFT", s: 1026 },
      { t: 1, v: 1027, n: ["$STRID_KEY_WHELL_RIGHT"], a: 0, an: "WHEELRIGHT", s: 1027 },
      // Number row 1–9
      { t: 2, v: 49, n: "1", a: 8, an: "NUM1", s: 30 },
      { t: 2, v: 50, n: "2", a: 9, an: "NUM2", s: 31 },
      { t: 2, v: 51, n: "3", a: 10, an: "NUM3", s: 32 },
      { t: 2, v: 52, n: "4", a: 11, an: "NUM4", s: 33 },
      { t: 2, v: 53, n: "5", a: 12, an: "NUM5", s: 34 },
      { t: 2, v: 54, n: "6", a: 13, an: "NUM6", s: 35 },
      { t: 2, v: 55, n: "7", a: 14, an: "NUM7", s: 36 },
      { t: 2, v: 56, n: "8", a: 15, an: "NUM8", s: 37 },
      { t: 2, v: 57, n: "9", a: 16, an: "NUM9", s: 38 },
      { t: 2, v: 48, n: "0", a: 7, an: "NUM0", s: 39 },
      // A–Z
      { t: 2, v: 65, n: "A", a: 29, an: "A", s: 4 },
      { t: 2, v: 66, n: "B", a: 30, an: "B", s: 5 },
      { t: 2, v: 67, n: "C", a: 31, an: "C", s: 6 },
      { t: 2, v: 68, n: "D", a: 32, an: "D", s: 7 },
      { t: 2, v: 69, n: "E", a: 33, an: "E", s: 8 },
      { t: 2, v: 70, n: "F", a: 34, an: "F", s: 9 },
      { t: 2, v: 71, n: "G", a: 35, an: "G", s: 10 },
      { t: 2, v: 72, n: "H", a: 36, an: "H", s: 11 },
      { t: 2, v: 73, n: "I", a: 37, an: "I", s: 12 },
      { t: 2, v: 74, n: "J", a: 38, an: "J", s: 13 },
      { t: 2, v: 75, n: "K", a: 39, an: "K", s: 14 },
      { t: 2, v: 76, n: "L", a: 40, an: "L", s: 15 },
      { t: 2, v: 77, n: "M", a: 41, an: "M", s: 16 },
      { t: 2, v: 78, n: "N", a: 42, an: "N", s: 17 },
      { t: 2, v: 79, n: "O", a: 43, an: "O", s: 18 },
      { t: 2, v: 80, n: "P", a: 44, an: "P", s: 19 },
      { t: 2, v: 81, n: "Q", a: 45, an: "Q", s: 20 },
      { t: 2, v: 82, n: "R", a: 46, an: "R", s: 21 },
      { t: 2, v: 83, n: "S", a: 47, an: "S", s: 22 },
      { t: 2, v: 84, n: "T", a: 48, an: "T", s: 23 },
      { t: 2, v: 85, n: "U", a: 49, an: "U", s: 24 },
      { t: 2, v: 86, n: "V", a: 50, an: "V", s: 25 },
      { t: 2, v: 87, n: "W", a: 51, an: "W", s: 26 },
      { t: 2, v: 88, n: "X", a: 52, an: "X", s: 27 },
      { t: 2, v: 89, n: "Y", a: 53, an: "Y", s: 28 },
      { t: 2, v: 90, n: "Z", a: 54, an: "Z", s: 29 },
      // F1–F12
      { t: 2, v: 112, n: "F1", a: 131, an: "F1", s: 58 },
      { t: 2, v: 113, n: "F2", a: 132, an: "F2", s: 59 },
      { t: 2, v: 114, n: "F3", a: 133, an: "F3", s: 60 },
      { t: 2, v: 115, n: "F4", a: 134, an: "F4", s: 61 },
      { t: 2, v: 116, n: "F5", a: 135, an: "F5", s: 62 },
      { t: 2, v: 117, n: "F6", a: 136, an: "F6", s: 63 },
      { t: 2, v: 118, n: "F7", a: 137, an: "F7", s: 64 },
      { t: 2, v: 119, n: "F8", a: 138, an: "F8", s: 65 },
      { t: 2, v: 120, n: "F9", a: 139, an: "F9", s: 66 },
      { t: 2, v: 121, n: "F10", a: 140, an: "F10", s: 67 },
      { t: 2, v: 122, n: "F11", a: 141, an: "F11", s: 68 },
      { t: 2, v: 123, n: "F12", a: 142, an: "F12", s: 69 },
      // Special keys
      { t: 2, v: 27, n: "Esc", a: 111, an: "ESC", s: 41 },
      { t: 2, v: 192, n: "`  ~", a: 68, an: "TILDE", s: 53 },
      { t: 2, v: 189, n: "-", a: 69, an: "UNDERSCORE", s: 45 },
      { t: 2, v: 187, n: "=  +", a: 70, an: "EQUAL", s: 46 },
      { t: 2, v: 8, n: "Backspace", a: 67, an: "BACKSPACE", s: 42 },
      { t: 2, v: 9, n: "Tab", a: 61, an: "TAB", s: 43 },
      { t: 2, v: 219, n: "[  {", a: 71, an: "LEFTBRACE", s: 47 },
      { t: 2, v: 221, n: "]  }", a: 72, an: "RIGHTBRACE", s: 48 },
      { t: 2, v: 220, n: "\\  |", a: 73, an: "VERTICALBAR", s: 49 },
      { t: 2, v: 20, n: "Caps Lock", a: 115, an: "CAPSLOCK", s: 57 },
      { t: 2, v: 186, n: ";  :", a: 74, an: "COLON", s: 51 },
      { t: 2, v: 222, n: `'  "`, a: 75, an: "QUOTE", s: 52 },
      { t: 2, v: 13, n: "Enter", a: 66, an: "ENTER", s: 40 },
      { t: 2, v: 188, n: ",  <", a: 55, an: "LESSTHAN", s: 54 },
      { t: 2, v: 160, n: ["$STRID_LEFT", " Shift"], a: 59, an: "SHIFT", s: 225 },
      { t: 2, v: 190, n: ".  >", a: 56, an: "GREATTHAN", s: 55 },
      { t: 2, v: 191, n: "/  ?", a: 76, an: "QUESTION", s: 56 },
      { t: 2, v: 161, n: ["$STRID_RIGHT", " Shift"], a: 60, an: "SHIFTR", s: 229 },
      { t: 2, v: 162, n: ["$STRID_LEFT", " Ctrl"], a: 113, an: "CTRL", s: 224 },
      // Platform-dependent keys (Win/Cmd, Alt/Option)
      { t: 2, v: 91, n: { win: ["$STRID_LEFT", " Win"], mac: ["$STRID_LEFT", " Command"] }, a: 171, an: "WINDOWS", s: 227 },
      { t: 2, v: 164, n: { win: ["$STRID_LEFT", " Alt"], mac: ["$STRID_LEFT", " Option"] }, a: 57, an: "ALT", s: 226 },
      // Space
      { t: 2, v: 32, n: ["$STRID_KEY_SPACE"], a: 62, an: "SPACE", s: 44 },
      // Right Alt/Option
      { t: 2, v: 165, n: { win: ["$STRID_RIGHT", " Alt"], mac: ["$STRID_RIGHT", " Option"] }, a: 58, an: "ALTR", s: 230 },
      { t: 2, v: 93, n: "Apps", a: 187, an: "APP", s: 101 },
      { t: 2, v: 163, n: ["$STRID_RIGHT", " Ctrl"], a: 114, an: "CTRLR", s: 228 },
      { t: 2, v: 44, n: "Print", a: 120, an: "PRINT", s: 70 },
      { t: 2, v: 145, n: "Scroll", a: 116, an: "SCROLL", s: 71 },
      { t: 2, v: 19, n: "Pause", a: 121, an: "PAUSE", s: 72 },
      { t: 2, v: 45, n: "Insert", a: 124, an: "INSERT", s: 73 },
      { t: 2, v: 36, n: "Home", a: 3, an: "HOME", s: 74 },
      { t: 2, v: 33, n: "Page Up", a: 92, an: "PAGEUP", s: 75 },
      { t: 2, v: 46, n: "Delete", a: 112, an: "DELETE", s: 76 },
      { t: 2, v: 35, n: "End", a: 123, an: "END", s: 77 },
      { t: 2, v: 34, n: "Page Down", a: 93, an: "PAGEDOWN", s: 78 },
      { t: 2, v: 38, n: ["$STRID_KEY_ARROW_UP"], a: 19, an: "UPARROW", s: 82 },
      { t: 2, v: 40, n: ["$STRID_KEY_ARROW_DOWN"], a: 20, an: "DOWNARROW", s: 81 },
      { t: 2, v: 37, n: ["$STRID_KEY_ARROW_LEFT"], a: 21, an: "LEFTARROW", s: 80 },
      { t: 2, v: 39, n: ["$STRID_KEY_ARROW_RIGHT"], a: 22, an: "RIGHTARROW", s: 79 },
      // Keypad
      { t: 2, v: 97, n: "Num 1", a: 145, an: "KPD1", s: 89 },
      { t: 2, v: 98, n: "Num 2", a: 146, an: "KPD2", s: 90 },
      { t: 2, v: 99, n: "Num 3", a: 147, an: "KPD3", s: 91 },
      { t: 2, v: 100, n: "Num 4", a: 148, an: "KPD4", s: 92 },
      { t: 2, v: 101, n: "Num 5", a: 149, an: "KPD5", s: 93 },
      { t: 2, v: 102, n: "Num 6", a: 150, an: "KPD6", s: 94 },
      { t: 2, v: 103, n: "Num 7", a: 151, an: "KPD7", s: 95 },
      { t: 2, v: 104, n: "Num 8", a: 152, an: "KPD8", s: 96 },
      { t: 2, v: 105, n: "Num 9", a: 153, an: "KPD9", s: 97 },
      { t: 2, v: 96, n: "Num 0", a: 144, an: "KPD0", s: 98 },
      { t: 2, v: 144, n: "Num Lock", a: 143, an: "NUMLOCK", s: 83 },
      { t: 2, v: 111, n: "Num /", a: 154, an: "KPDSLASH", s: 84 },
      { t: 2, v: 106, n: "Num *", a: 155, an: "KPDSTAR", s: 85 },
      { t: 2, v: 109, n: "Num -", a: 156, an: "KPDMINUS", s: 86 },
      { t: 2, v: 107, n: "Num +", a: 157, an: "KPDPLUS", s: 87 },
      { t: 2, v: 110, n: "Num .", a: 158, an: "KPDDOT", s: 99 },
      { t: 2, v: 14, n: "Num Enter", a: 160, an: "KPDENTER", s: 88 },
      // Media keys
      { t: 3, v: 513, n: ["$STRID_KEY_MEDIA_MUTE"], a: 0, an: "Mute", s: 513 },
      { t: 3, v: 514, n: ["$STRID_KEY_MEDIA_VOLUME_UP"], a: 0, an: "VolumeUp", s: 514 },
      { t: 3, v: 515, n: ["$STRID_KEY_MEDIA_VOLUME_DOWN"], a: 0, an: "VolumeDown", s: 515 },
      { t: 3, v: 516, n: ["$STRID_KEY_MEDIA_PLAY_PAUSE"], a: 0, an: "PlayPause", s: 516 },
      { t: 3, v: 517, n: ["$STRID_KEY_MEDIA_STOP"], a: 0, an: "Stop", s: 517 },
      { t: 3, v: 518, n: ["$STRID_KEY_MEDIA_PREVIOUS_TRACK"], a: 0, an: "ScanPreviousTrack", s: 518 },
      { t: 3, v: 519, n: ["$STRID_KEY_MEDIA_NEXT_TRACK"], a: 0, an: "ScanNextTrack", s: 519 },
      { t: 3, v: 520, n: ["$STRID_KEY_MEDIA_MAIL"], a: 0, an: "Mail", s: 520 },
      { t: 3, v: 521, n: ["$STRID_KEY_MEDIA_CALCULATOR"], a: 0, an: "Calculator", s: 521 },
      { t: 3, v: 522, n: ["$STRID_KEY_MEDIA_MY_COMPUTER"], a: 0, an: "MyComputer", s: 522 },
      { t: 3, v: 523, n: ["$STRID_KEY_MEDIA_WWW_SEARCH"], a: 0, an: "WWWSearch", s: 523 },
      { t: 3, v: 524, n: ["$STRID_KEY_MEDIA_WWW_HOME"], a: 0, an: "WWWHome", s: 524 },
      { t: 3, v: 525, n: ["$STRID_KEY_MEDIA_WWW_REFRESH"], a: 0, an: "WWWRefresh", s: 525 },
      { t: 3, v: 526, n: ["$STRID_KEY_MEDIA_WWW_STOP"], a: 0, an: "WWWStop", s: 526 },
      { t: 3, v: 527, n: ["$STRID_KEY_MEDIA_WWW_FORWARD"], a: 0, an: "WWWForward", s: 527 },
      { t: 3, v: 528, n: ["$STRID_KEY_MEDIA_WWW_BACK"], a: 0, an: "WWWBack", s: 528 }
    ],
    kbd_5_15: [
      { t: 2, v: 27, n: "Esc", a: 111, an: "ESC", s: 41, id: 41, r: 0, c: 0, rect: [40, 58, 36, 42] },
      { t: 2, v: 49, n: "1", a: 8, an: "NUM1", s: 30, id: 30, r: 0, c: 1, rect: [20, 58, 36, 42] },
      { t: 2, v: 50, n: "2", a: 9, an: "NUM2", s: 31, id: 31, r: 0, c: 2, rect: [20, 58, 36, 42] },
      { t: 2, v: 51, n: "3", a: 10, an: "NUM3", s: 32, id: 32, r: 0, c: 3, rect: [20, 58, 36, 42] },
      { t: 2, v: 52, n: "4", a: 11, an: "NUM4", s: 33, id: 33, r: 0, c: 4, rect: [19, 58, 36, 42] },
      { t: 2, v: 53, n: "5", a: 12, an: "NUM5", s: 34, id: 34, r: 0, c: 5, rect: [20, 58, 36, 42] },
      { t: 2, v: 54, n: "6", a: 13, an: "NUM6", s: 35, id: 35, r: 0, c: 6, rect: [19, 58, 36, 42] },
      { t: 2, v: 55, n: "7", a: 14, an: "NUM7", s: 36, id: 36, r: 0, c: 7, rect: [20, 58, 36, 42] },
      { t: 2, v: 56, n: "8", a: 15, an: "NUM8", s: 37, id: 37, r: 0, c: 8, rect: [20, 58, 36, 42] },
      { t: 2, v: 57, n: "9", a: 16, an: "NUM9", s: 38, id: 38, r: 0, c: 9, rect: [19, 58, 36, 42] },
      { t: 2, v: 48, n: "0", a: 7, an: "NUM0", s: 39, id: 39, r: 0, c: 10, rect: [20, 58, 36, 42] },
      { t: 2, v: 189, n: "-", a: 69, an: "UNDERSCORE", s: 45, id: 45, r: 0, c: 11, rect: [19, 58, 36, 42] },
      { t: 2, v: 187, n: "=  +", a: 70, an: "EQUAL", s: 46, id: 46, r: 0, c: 12, rect: [20, 58, 36, 42] },
      { t: 2, v: 8, n: "Backspace", a: 67, an: "BACKSPACE", s: 42, id: 42, r: 0, c: 13, rect: [20, 58, 90, 42] },
      { t: 2, v: 36, n: "Home", a: 3, an: "HOME", s: 74, id: 74, r: 0, c: 14, rect: [21, 58, 36, 42] },
      { t: 2, v: 9, n: "Tab", a: 61, an: "TAB", s: 43, id: 43, r: 1, c: 0, rect: [41, 14, 62, 42] },
      { t: 2, v: 81, n: "Q", a: 45, an: "Q", s: 20, id: 20, r: 1, c: 1, rect: [20, 14, 36, 42] },
      { t: 2, v: 87, n: "W", a: 51, an: "W", s: 26, id: 26, r: 1, c: 2, rect: [20, 14, 36, 42] },
      { t: 2, v: 69, n: "E", a: 33, an: "E", s: 8, id: 8, r: 1, c: 3, rect: [20, 14, 36, 42] },
      { t: 2, v: 82, n: "R", a: 46, an: "R", s: 21, id: 21, r: 1, c: 4, rect: [20, 14, 36, 42] },
      { t: 2, v: 84, n: "T", a: 48, an: "T", s: 23, id: 23, r: 1, c: 5, rect: [20, 14, 36, 42] },
      { t: 2, v: 89, n: "Y", a: 53, an: "Y", s: 28, id: 28, r: 1, c: 6, rect: [19, 14, 36, 42] },
      { t: 2, v: 85, n: "U", a: 49, an: "U", s: 24, id: 24, r: 1, c: 7, rect: [20, 14, 36, 42] },
      { t: 2, v: 73, n: "I", a: 37, an: "I", s: 12, id: 12, r: 1, c: 8, rect: [20, 14, 36, 42] },
      { t: 2, v: 79, n: "O", a: 43, an: "O", s: 18, id: 18, r: 1, c: 9, rect: [19, 14, 36, 42] },
      { t: 2, v: 80, n: "P", a: 44, an: "P", s: 19, id: 19, r: 1, c: 10, rect: [20, 14, 36, 42] },
      { t: 2, v: 219, n: "[  {", a: 71, an: "LEFTBRACE", s: 47, id: 47, r: 1, c: 11, rect: [19, 14, 36, 42] },
      { t: 2, v: 221, n: "]  }", a: 72, an: "RIGHTBRACE", s: 48, id: 48, r: 1, c: 12, rect: [20, 14, 36, 42] },
      { t: 2, v: 220, n: "\\  |", a: 73, an: "VERTICALBAR", s: 49, id: 49, r: 1, c: 13, rect: [20, 14, 62, 42] },
      { t: 2, v: 46, n: "Del", a: 112, an: "DELETE", s: 76, id: 76, r: 1, c: 14, rect: [21, 14, 36, 42] },
      { t: 2, v: 20, n: "Caps Lock", a: 115, an: "CAPSLOCK", s: 57, id: 57, r: 2, c: 0, rect: [41, 14, 77, 41] },
      { t: 2, v: 65, n: "A", a: 29, an: "A", s: 4, id: 4, r: 2, c: 1, rect: [20, 14, 36, 41] },
      { t: 2, v: 83, n: "S", a: 47, an: "S", s: 22, id: 22, r: 2, c: 2, rect: [20, 14, 36, 41] },
      { t: 2, v: 68, n: "D", a: 32, an: "D", s: 7, id: 7, r: 2, c: 3, rect: [19, 14, 36, 41] },
      { t: 2, v: 70, n: "F", a: 34, an: "F", s: 9, id: 9, r: 2, c: 4, rect: [20, 14, 36, 41] },
      { t: 2, v: 71, n: "G", a: 35, an: "G", s: 10, id: 10, r: 2, c: 5, rect: [19, 14, 36, 41] },
      { t: 2, v: 72, n: "H", a: 36, an: "H", s: 11, id: 11, r: 2, c: 6, rect: [20, 14, 36, 41] },
      { t: 2, v: 74, n: "J", a: 38, an: "J", s: 13, id: 13, r: 2, c: 7, rect: [20, 14, 36, 41] },
      { t: 2, v: 75, n: "K", a: 39, an: "K", s: 14, id: 14, r: 2, c: 8, rect: [20, 14, 36, 41] },
      { t: 2, v: 76, n: "L", a: 40, an: "L", s: 15, id: 15, r: 2, c: 9, rect: [19, 14, 36, 41] },
      { t: 2, v: 186, n: ";  :", a: 74, an: "COLON", s: 51, id: 51, r: 2, c: 10, rect: [20, 14, 36, 41] },
      { t: 2, v: 222, n: `'  "`, a: 75, an: "QUOTE", s: 52, id: 52, r: 2, c: 11, rect: [20, 14, 36, 41] },
      { t: 2, v: 13, n: "Enter", a: 66, an: "ENTER", s: 40, id: 40, r: 2, c: 12, rect: [19, 14, 106, 41] },
      { t: 2, v: 0, n: "", a: 0, an: "NONE", s: 0, id: 0, r: 2, c: 13, rect: [0, 0, 0, 0] },
      { t: 2, v: 33, n: "Page Up", a: 92, an: "PAGEUP", s: 75, id: 75, r: 2, c: 14, rect: [19, 14, 36, 41] },
      { t: 2, v: 160, n: ["$STRID_LEFT", " Shift"], a: 59, an: "SHIFT", s: 225, id: 225, r: 3, c: 0, rect: [41, 14, 104, 40] },
      { t: 2, v: 0, n: "", a: 0, an: "NONE", s: 0, id: 0, r: 3, c: 1, rect: [0, 0, 0, 0] },
      { t: 2, v: 90, n: "Z", a: 54, an: "Z", s: 29, id: 29, r: 3, c: 2, rect: [21, 14, 36, 40] },
      { t: 2, v: 88, n: "X", a: 52, an: "X", s: 27, id: 27, r: 3, c: 3, rect: [20, 14, 36, 40] },
      { t: 2, v: 67, n: "C", a: 31, an: "C", s: 6, id: 6, r: 3, c: 4, rect: [20, 14, 36, 40] },
      { t: 2, v: 86, n: "V", a: 50, an: "V", s: 25, id: 25, r: 3, c: 5, rect: [19, 14, 36, 40] },
      { t: 2, v: 66, n: "B", a: 30, an: "B", s: 5, id: 5, r: 3, c: 6, rect: [20, 14, 36, 40] },
      { t: 2, v: 78, n: "N", a: 42, an: "N", s: 17, id: 17, r: 3, c: 7, rect: [19, 14, 36, 40] },
      { t: 2, v: 77, n: "M", a: 41, an: "M", s: 16, id: 16, r: 3, c: 8, rect: [20, 14, 36, 40] },
      { t: 2, v: 188, n: ",  <", a: 55, an: "LESSTHAN", s: 54, id: 54, r: 3, c: 9, rect: [19, 14, 36, 40] },
      { t: 2, v: 190, n: ".  >", a: 56, an: "GREATTHAN", s: 55, id: 55, r: 3, c: 10, rect: [20, 14, 36, 40] },
      { t: 2, v: 191, n: "/  ?", a: 76, an: "QUESTION", s: 56, id: 56, r: 3, c: 11, rect: [19, 14, 36, 40] },
      { t: 2, v: 161, n: ["$STRID_RIGHT", " Shift"], a: 60, an: "SHIFTR", s: 229, id: 229, r: 3, c: 12, rect: [20, 14, 77, 40] },
      { t: 2, v: 38, n: "\u2191", a: 19, an: "UPARROW", s: 82, id: 82, r: 3, c: 13, rect: [21, 14, 36, 40] },
      { t: 2, v: 34, n: "Page Down", a: 93, an: "PAGEDOWN", s: 78, id: 78, r: 3, c: 14, rect: [20, 14, 36, 40] },
      { t: 2, v: 162, n: ["$STRID_LEFT", " Ctrl"], a: 113, an: "CTRL", s: 224, id: 224, r: 4, c: 0, rect: [41, 16, 48, 40] },
      { t: 2, v: 91, n: { win: ["$STRID_LEFT", " Win"], mac: ["$STRID_LEFT", " Command"] }, a: 171, an: "WINDOWS", s: 227, id: 227, r: 4, c: 1, rect: [21, 16, 48, 40] },
      { t: 2, v: 164, n: { win: ["$STRID_LEFT", " Alt"], mac: ["$STRID_LEFT", " Option"] }, a: 57, an: "ALT", s: 226, id: 226, r: 4, c: 2, rect: [21, 16, 48, 40] },
      { t: 2, v: 0, n: "", a: 0, an: "NONE", s: 0, id: 0, r: 4, c: 3, rect: [0, 0, 0, 0] },
      { t: 2, v: 0, n: "", a: 0, an: "NONE", s: 0, id: 0, r: 4, c: 4, rect: [0, 0, 0, 0] },
      { t: 2, v: 0, n: "", a: 0, an: "NONE", s: 0, id: 0, r: 4, c: 5, rect: [0, 0, 0, 0] },
      { t: 2, v: 32, n: ["$STRID_KEY_SPACE"], a: 62, an: "SPACE", s: 44, id: 44, r: 4, c: 6, rect: [21, 16, 329, 40] },
      { t: 2, v: 0, n: "", a: 0, an: "NONE", s: 0, id: 0, r: 4, c: 7, rect: [0, 0, 0, 0] },
      { t: 2, v: 0, n: "", a: 0, an: "NONE", s: 0, id: 0, r: 4, c: 8, rect: [0, 0, 0, 0] },
      { t: 2, v: 165, n: { win: ["$STRID_RIGHT", " Alt"], mac: ["$STRID_RIGHT", " Option"] }, a: 58, an: "ALTR", s: 230, id: 230, r: 4, c: 9, rect: [22, 16, 34, 40] },
      { t: 2, v: 93, n: "Fn", a: 187, an: "APP", s: 101, id: 21025, r: 4, c: 10, rect: [21, 16, 34, 40] },
      { t: 2, v: 163, n: ["$STRID_RIGHT", " Ctrl"], a: 114, an: "CTRLR", s: 228, id: 228, r: 4, c: 11, rect: [22, 16, 34, 40] },
      { t: 2, v: 37, n: "\u2190", a: 21, an: "LEFTARROW", s: 80, id: 80, r: 4, c: 12, rect: [21, 16, 34, 40] },
      { t: 2, v: 40, n: "\u2193", a: 20, an: "DOWNARROW", s: 81, id: 81, r: 4, c: 13, rect: [21, 16, 34, 40] },
      { t: 2, v: 39, n: "\u2192", a: 22, an: "RIGHTARROW", s: 79, id: 79, r: 4, c: 14, rect: [22, 16, 34, 40] }
    ],
    kbd_5_14: [
      { t: 2, v: 27, n: "Esc", a: 111, an: "ESC", s: 41, id: 41, r: 0, c: 0, rect: [17, 22, 56, 57] },
      { t: 2, v: 49, n: "1", a: 8, an: "NUM1", s: 30, id: 30, r: 0, c: 1, rect: [5, 22, 56, 57] },
      { t: 2, v: 50, n: "2", a: 9, an: "NUM2", s: 31, id: 31, r: 0, c: 2, rect: [4, 22, 56, 57] },
      { t: 2, v: 51, n: "3", a: 10, an: "NUM3", s: 32, id: 32, r: 0, c: 3, rect: [4, 22, 56, 57] },
      { t: 2, v: 52, n: "4", a: 11, an: "NUM4", s: 33, id: 33, r: 0, c: 4, rect: [5, 22, 56, 57] },
      { t: 2, v: 53, n: "5", a: 12, an: "NUM5", s: 34, id: 34, r: 0, c: 5, rect: [4, 22, 56, 57] },
      { t: 2, v: 54, n: "6", a: 13, an: "NUM6", s: 35, id: 35, r: 0, c: 6, rect: [5, 22, 56, 57] },
      { t: 2, v: 55, n: "7", a: 14, an: "NUM7", s: 36, id: 36, r: 0, c: 7, rect: [4, 22, 56, 57] },
      { t: 2, v: 56, n: "8", a: 15, an: "NUM8", s: 37, id: 37, r: 0, c: 8, rect: [4, 22, 56, 57] },
      { t: 2, v: 57, n: "9", a: 16, an: "NUM9", s: 38, id: 38, r: 0, c: 9, rect: [5, 22, 56, 57] },
      { t: 2, v: 48, n: "0", a: 7, an: "NUM0", s: 39, id: 39, r: 0, c: 10, rect: [4, 22, 56, 57] },
      { t: 2, v: 189, n: "-", a: 69, an: "UNDERSCORE", s: 45, id: 45, r: 0, c: 11, rect: [5, 22, 56, 57] },
      { t: 2, v: 187, n: "=  +", a: 70, an: "EQUAL", s: 46, id: 46, r: 0, c: 12, rect: [4, 22, 56, 57] },
      { t: 2, v: 8, n: "Backspace", a: 67, an: "BACKSPACE", s: 42, id: 42, r: 0, c: 13, rect: [4, 22, 114, 57] },
      { t: 2, v: 9, n: "Tab", a: 61, an: "TAB", s: 43, id: 43, r: 1, c: 0, rect: [17, 4, 85, 57] },
      { t: 2, v: 81, n: "Q", a: 45, an: "Q", s: 20, id: 20, r: 1, c: 1, rect: [5, 4, 56, 57] },
      { t: 2, v: 87, n: "W", a: 51, an: "W", s: 26, id: 26, r: 1, c: 2, rect: [5, 4, 56, 57] },
      { t: 2, v: 69, n: "E", a: 33, an: "E", s: 8, id: 8, r: 1, c: 3, rect: [4, 4, 56, 57] },
      { t: 2, v: 82, n: "R", a: 46, an: "R", s: 21, id: 21, r: 1, c: 4, rect: [4, 4, 56, 57] },
      { t: 2, v: 84, n: "T", a: 48, an: "T", s: 23, id: 23, r: 1, c: 5, rect: [4, 4, 56, 57] },
      { t: 2, v: 89, n: "Y", a: 53, an: "Y", s: 28, id: 28, r: 1, c: 6, rect: [5, 4, 56, 57] },
      { t: 2, v: 85, n: "U", a: 49, an: "U", s: 24, id: 24, r: 1, c: 7, rect: [4, 4, 56, 57] },
      { t: 2, v: 73, n: "I", a: 37, an: "I", s: 12, id: 12, r: 1, c: 8, rect: [4, 4, 56, 57] },
      { t: 2, v: 79, n: "O", a: 43, an: "O", s: 18, id: 18, r: 1, c: 9, rect: [4, 4, 56, 57] },
      { t: 2, v: 80, n: "P", a: 44, an: "P", s: 19, id: 19, r: 1, c: 10, rect: [4, 4, 56, 57] },
      { t: 2, v: 219, n: "[  {", a: 71, an: "LEFTBRACE", s: 47, id: 47, r: 1, c: 11, rect: [5, 4, 56, 57] },
      { t: 2, v: 221, n: "]  }", a: 72, an: "RIGHTBRACE", s: 48, id: 48, r: 1, c: 12, rect: [4, 4, 56, 57] },
      { t: 2, v: 220, n: "\\  |", a: 73, an: "VERTICALBAR", s: 49, id: 49, r: 1, c: 13, rect: [4, 4, 85, 57] },
      { t: 2, v: 20, n: "Caps Lock", a: 115, an: "CAPSLOCK", s: 57, id: 57, r: 2, c: 0, rect: [17, 4, 100, 57] },
      { t: 2, v: 65, n: "A", a: 29, an: "A", s: 4, id: 4, r: 2, c: 1, rect: [4, 4, 56, 57] },
      { t: 2, v: 83, n: "S", a: 47, an: "S", s: 22, id: 22, r: 2, c: 2, rect: [5, 4, 56, 57] },
      { t: 2, v: 68, n: "D", a: 32, an: "D", s: 7, id: 7, r: 2, c: 3, rect: [5, 4, 56, 57] },
      { t: 2, v: 70, n: "F", a: 34, an: "F", s: 9, id: 9, r: 2, c: 4, rect: [5, 4, 56, 57] },
      { t: 2, v: 71, n: "G", a: 35, an: "G", s: 10, id: 10, r: 2, c: 5, rect: [4, 4, 56, 57] },
      { t: 2, v: 72, n: "H", a: 36, an: "H", s: 11, id: 11, r: 2, c: 6, rect: [5, 4, 56, 57] },
      { t: 2, v: 74, n: "J", a: 38, an: "J", s: 13, id: 13, r: 2, c: 7, rect: [4, 4, 56, 57] },
      { t: 2, v: 75, n: "K", a: 39, an: "K", s: 14, id: 14, r: 2, c: 8, rect: [4, 4, 56, 57] },
      { t: 2, v: 76, n: "L", a: 40, an: "L", s: 15, id: 15, r: 2, c: 9, rect: [5, 4, 56, 57] },
      { t: 2, v: 186, n: ";  :", a: 74, an: "COLON", s: 51, id: 51, r: 2, c: 10, rect: [4, 4, 56, 57] },
      { t: 2, v: 222, n: `'  "`, a: 75, an: "QUOTE", s: 52, id: 52, r: 2, c: 11, rect: [5, 4, 56, 57] },
      { t: 2, v: 0, n: "", a: 0, an: "NONE", s: 0, id: 0, r: 2, c: 12, rect: [0, 0, 0, 0] },
      { t: 2, v: 13, n: "Enter", a: 66, an: "ENTER", s: 40, id: 40, r: 2, c: 13, rect: [5, 4, 128, 57] },
      { t: 2, v: 160, n: ["$STRID_LEFT", " Shift"], a: 59, an: "SHIFT", s: 225, id: 225, r: 3, c: 0, rect: [18, 4, 130, 57] },
      { t: 2, v: 0, n: "", a: 0, an: "NONE", s: 0, id: 0, r: 3, c: 1, rect: [0, 0, 0, 0] },
      { t: 2, v: 90, n: "Z", a: 54, an: "Z", s: 29, id: 29, r: 3, c: 2, rect: [4, 4, 56, 57] },
      { t: 2, v: 88, n: "X", a: 52, an: "X", s: 27, id: 27, r: 3, c: 3, rect: [5, 4, 56, 57] },
      { t: 2, v: 67, n: "C", a: 31, an: "C", s: 6, id: 6, r: 3, c: 4, rect: [5, 4, 56, 57] },
      { t: 2, v: 86, n: "V", a: 50, an: "V", s: 25, id: 25, r: 3, c: 5, rect: [5, 4, 56, 57] },
      { t: 2, v: 66, n: "B", a: 30, an: "B", s: 5, id: 5, r: 3, c: 6, rect: [4, 4, 56, 57] },
      { t: 2, v: 78, n: "N", a: 42, an: "N", s: 17, id: 17, r: 3, c: 7, rect: [5, 4, 56, 57] },
      { t: 2, v: 77, n: "M", a: 41, an: "M", s: 16, id: 16, r: 3, c: 8, rect: [4, 4, 56, 57] },
      { t: 2, v: 188, n: ",  <", a: 55, an: "LESSTHAN", s: 54, id: 54, r: 3, c: 9, rect: [4, 4, 56, 57] },
      { t: 2, v: 190, n: ".  >", a: 56, an: "GREATTHAN", s: 55, id: 55, r: 3, c: 10, rect: [5, 4, 56, 57] },
      { t: 2, v: 191, n: "/  ?", a: 76, an: "QUESTION", s: 56, id: 56, r: 3, c: 11, rect: [4, 4, 56, 57] },
      { t: 2, v: 161, n: ["$STRID_RIGHT", " Shift"], a: 60, an: "SHIFTR", s: 229, id: 229, r: 3, c: 12, rect: [5, 4, 157, 57] },
      { t: 2, v: 0, n: "", a: 0, an: "NONE", s: 0, id: 0, r: 3, c: 13, rect: [0, 0, 0, 0] },
      { t: 2, v: 162, n: ["$STRID_LEFT", " Ctrl"], a: 113, an: "CTRL", s: 224, id: 224, r: 4, c: 0, rect: [18, 6, 70, 57] },
      { t: 2, v: 91, n: { win: ["$STRID_LEFT", " Win"], mac: ["$STRID_LEFT", " Command"] }, a: 171, an: "WINDOWS", s: 227, id: 227, r: 4, c: 1, rect: [6, 6, 70, 57] },
      { t: 2, v: 164, n: { win: ["$STRID_LEFT", " Alt"], mac: ["$STRID_LEFT", " Option"] }, a: 57, an: "ALT", s: 226, id: 226, r: 4, c: 2, rect: [6, 6, 70, 57] },
      { t: 2, v: 0, n: "", a: 0, an: "NONE", s: 0, id: 0, r: 4, c: 3, rect: [0, 0, 0, 0] },
      { t: 2, v: 0, n: "", a: 0, an: "NONE", s: 0, id: 0, r: 4, c: 4, rect: [0, 0, 0, 0] },
      { t: 2, v: 0, n: "", a: 0, an: "NONE", s: 0, id: 0, r: 4, c: 5, rect: [0, 0, 0, 0] },
      { t: 2, v: 32, n: ["$STRID_KEY_SPACE"], a: 62, an: "SPACE", s: 44, id: 44, r: 4, c: 6, rect: [7, 6, 362, 57] },
      { t: 2, v: 0, n: "", a: 0, an: "NONE", s: 0, id: 0, r: 4, c: 7, rect: [0, 0, 0, 0] },
      { t: 2, v: 0, n: "", a: 0, an: "NONE", s: 0, id: 0, r: 4, c: 8, rect: [0, 0, 0, 0] },
      { t: 2, v: 165, n: { win: ["$STRID_RIGHT", " Alt"], mac: ["$STRID_RIGHT", " Option"] }, a: 58, an: "ALTR", s: 230, id: 230, r: 4, c: 9, rect: [6, 6, 70, 57] },
      { t: 2, v: 18, n: "App", a: 82, an: "NONE", s: 0, id: 101, r: 4, c: 10, rect: [6, 6, 70, 57] },
      { t: 2, v: 163, n: ["$STRID_RIGHT", " Ctrl"], a: 114, an: "CTRLR", s: 228, id: 228, r: 4, c: 11, rect: [6, 6, 70, 57] },
      { t: 2, v: 93, n: "Fn", a: 187, an: "APP", s: 101, id: 21025, r: 4, c: 12, rect: [6, 6, 70, 57] },
      { t: 2, v: 0, n: "", a: 0, an: "NONE", s: 0, id: 0, r: 4, c: 13, rect: [0, 0, 0, 0] }
    ],
    kbd_select: [
      { t: 2, v: 27, n: "Esc", a: 111, an: "ESC", s: 41, id: 41, rect: [0, 6, 85, 37] },
      { t: 2, v: 112, n: "F1", a: 131, an: "F1", s: 58, id: 58, rect: [24, 6, 40, 37] },
      { t: 2, v: 113, n: "F2", a: 132, an: "F2", s: 59, id: 59, rect: [5, 6, 40, 37] },
      { t: 2, v: 114, n: "F3", a: 133, an: "F2", s: 60, id: 60, rect: [5, 6, 40, 37] },
      { t: 2, v: 115, n: "F4", a: 134, an: "F4", s: 61, id: 61, rect: [5, 6, 40, 37] },
      { t: 2, v: 116, n: "F5", a: 135, an: "F5", s: 62, id: 62, rect: [18, 6, 40, 37] },
      { t: 2, v: 117, n: "F6", a: 136, an: "F6", s: 63, id: 63, rect: [5, 6, 40, 37] },
      { t: 2, v: 118, n: "F7", a: 137, an: "F7", s: 64, id: 64, rect: [5, 6, 40, 37] },
      { t: 2, v: 119, n: "F8", a: 138, an: "F8", s: 65, id: 65, rect: [5, 6, 40, 37] },
      { t: 2, v: 120, n: "F9", a: 139, an: "F9", s: 66, id: 66, rect: [18, 6, 40, 37] },
      { t: 2, v: 121, n: "F10", a: 140, an: "F10", s: 67, id: 67, rect: [5, 6, 40, 37] },
      { t: 2, v: 122, n: "F11", a: 141, an: "F11", s: 68, id: 68, rect: [5, 6, 40, 37] },
      { t: 2, v: 123, n: "F12", a: 142, an: "F12", s: 69, id: 69, rect: [5, 6, 40, 37] },
      { t: 2, v: 44, n: "Print", a: 120, an: "PRINT", s: 70, id: 70, rect: [30, 6, 40, 37] },
      { t: 2, v: 145, n: "Scroll", a: 116, an: "SCROLL", s: 71, id: 71, rect: [5, 6, 40, 37] },
      { t: 2, v: 19, n: "Pause", a: 121, an: "PAUSE", s: 72, id: 72, rect: [5, 6, 40, 37] },
      { t: 2, v: 192, n: "`  ~", a: 68, an: "TILDE", s: 53, id: 53, rect: [0, 6, 40, 37] },
      { t: 2, v: 49, n: "1", a: 8, an: "NUM1", s: 30, id: 30, rect: [5, 6, 40, 37] },
      { t: 2, v: 50, n: "2", a: 9, an: "NUM2", s: 31, id: 31, rect: [5, 6, 40, 37] },
      { t: 2, v: 51, n: "3", a: 10, an: "NUM3", s: 32, id: 32, rect: [5, 6, 40, 37] },
      { t: 2, v: 52, n: "4", a: 11, an: "NUM4", s: 33, id: 33, rect: [5, 6, 40, 37] },
      { t: 2, v: 53, n: "5", a: 12, an: "NUM5", s: 34, id: 34, rect: [5, 6, 40, 37] },
      { t: 2, v: 54, n: "6", a: 13, an: "NUM6", s: 35, id: 35, rect: [5, 6, 40, 37] },
      { t: 2, v: 55, n: "7", a: 14, an: "NUM7", s: 36, id: 36, rect: [5, 6, 40, 37] },
      { t: 2, v: 56, n: "8", a: 15, an: "NUM8", s: 37, id: 37, rect: [5, 6, 40, 37] },
      { t: 2, v: 57, n: "9", a: 16, an: "NUM9", s: 38, id: 38, rect: [5, 6, 40, 37] },
      { t: 2, v: 48, n: "0", a: 7, an: "NUM0", s: 39, id: 39, rect: [5, 6, 40, 37] },
      { t: 2, v: 189, n: "-", a: 69, an: "UNDERSCORE", s: 45, id: 45, rect: [5, 6, 40, 37] },
      { t: 2, v: 187, n: "=  +", a: 70, an: "EQUAL", s: 46, id: 46, rect: [5, 6, 40, 37] },
      { t: 2, v: 8, n: "Backspace", a: 67, an: "BACKSPACE", s: 42, id: 42, rect: [5, 6, 85, 37] },
      { t: 2, v: 45, n: "Insert", a: 124, an: "INSERT", s: 73, id: 73, rect: [30, 6, 40, 37] },
      { t: 2, v: 36, n: "Home", a: 3, an: "HOME", s: 74, id: 74, rect: [5, 6, 40, 37] },
      { t: 2, v: 33, n: "Page Up", a: 92, an: "PAGEUP", s: 75, id: 75, rect: [5, 6, 40, 37] },
      { t: 2, v: 144, n: "Num Lock", a: 143, an: "NUMLOCK", s: 83, id: 83, rect: [30, 6, 40, 37] },
      { t: 2, v: 111, n: "Num /", a: 154, an: "KPDSLASH", s: 84, id: 84, rect: [5, 6, 40, 37] },
      { t: 2, v: 106, n: "Num *", a: 155, an: "KPDSTAR", s: 85, id: 85, rect: [5, 6, 40, 37] },
      { t: 2, v: 109, n: "Num -", a: 156, an: "KPDMINUS", s: 86, id: 86, rect: [5, 6, 40, 37] },
      { t: 2, v: 9, n: "Tab", a: 61, an: "TAB", s: 43, id: 43, rect: [0, 6, 63, 37] },
      { t: 2, v: 81, n: "Q", a: 45, an: "Q", s: 20, id: 20, rect: [5, 6, 40, 37] },
      { t: 2, v: 87, n: "W", a: 51, an: "W", s: 26, id: 26, rect: [5, 6, 40, 37] },
      { t: 2, v: 69, n: "E", a: 33, an: "E", s: 8, id: 8, rect: [5, 6, 40, 37] },
      { t: 2, v: 82, n: "R", a: 46, an: "R", s: 21, id: 21, rect: [5, 6, 40, 37] },
      { t: 2, v: 84, n: "T", a: 48, an: "T", s: 23, id: 23, rect: [5, 6, 40, 37] },
      { t: 2, v: 89, n: "Y", a: 53, an: "Y", s: 28, id: 28, rect: [5, 6, 40, 37] },
      { t: 2, v: 85, n: "U", a: 49, an: "U", s: 24, id: 24, rect: [5, 6, 40, 37] },
      { t: 2, v: 73, n: "I", a: 37, an: "I", s: 12, id: 12, rect: [5, 6, 40, 37] },
      { t: 2, v: 79, n: "O", a: 43, an: "O", s: 18, id: 18, rect: [5, 6, 40, 37] },
      { t: 2, v: 80, n: "P", a: 44, an: "P", s: 19, id: 19, rect: [5, 6, 40, 37] },
      { t: 2, v: 219, n: "[  {", a: 71, an: "LEFTBRACE", s: 47, id: 47, rect: [5, 6, 40, 37] },
      { t: 2, v: 221, n: "]  }", a: 72, an: "RIGHTBRACE", s: 48, id: 48, rect: [5, 6, 40, 37] },
      { t: 2, v: 220, n: "\\  |", a: 73, an: "VERTICALBAR", s: 49, id: 49, rect: [5, 6, 62, 37] },
      { t: 2, v: 46, n: "Delete", a: 112, an: "DELETE", s: 76, id: 76, rect: [30, 6, 40, 37] },
      { t: 2, v: 35, n: "End", a: 123, an: "END", s: 77, id: 77, rect: [5, 6, 40, 37] },
      { t: 2, v: 34, n: "Page Down", a: 93, an: "PAGEDOWN", s: 78, id: 78, rect: [5, 6, 40, 37] },
      { t: 2, v: 103, n: "Num 7", a: 151, an: "KPD7", s: 95, id: 95, rect: [30, 6, 40, 37] },
      { t: 2, v: 104, n: "Num 8", a: 152, an: "KPD8", s: 96, id: 96, rect: [5, 6, 40, 37] },
      { t: 2, v: 105, n: "Num 9", a: 153, an: "KPD9", s: 97, id: 97, rect: [5, 6, 40, 37] },
      { t: 2, v: 107, n: "Num +", a: 157, an: "KPDPLUS", s: 87, id: 87, rect: [5, 6, 40, 37] },
      { t: 2, v: 20, n: "Caps Lock", a: 115, an: "CAPSLOCK", s: 57, id: 57, rect: [0, 6, 85, 37] },
      { t: 2, v: 65, n: "A", a: 29, an: "A", s: 4, id: 4, rect: [5, 6, 40, 37] },
      { t: 2, v: 83, n: "S", a: 47, an: "S", s: 22, id: 22, rect: [5, 6, 40, 37] },
      { t: 2, v: 68, n: "D", a: 32, an: "D", s: 7, id: 7, rect: [5, 6, 40, 37] },
      { t: 2, v: 70, n: "F", a: 34, an: "F", s: 9, id: 9, rect: [5, 6, 40, 37] },
      { t: 2, v: 71, n: "G", a: 35, an: "G", s: 10, id: 10, rect: [5, 6, 40, 37] },
      { t: 2, v: 72, n: "H", a: 36, an: "H", s: 11, id: 11, rect: [5, 6, 40, 37] },
      { t: 2, v: 74, n: "J", a: 38, an: "J", s: 13, id: 13, rect: [5, 6, 40, 37] },
      { t: 2, v: 75, n: "K", a: 39, an: "K", s: 14, id: 14, rect: [5, 6, 40, 37] },
      { t: 2, v: 76, n: "L", a: 40, an: "L", s: 15, id: 15, rect: [5, 6, 40, 37] },
      { t: 2, v: 186, n: ";  :", a: 74, an: "COLON", s: 51, id: 51, rect: [5, 6, 40, 37] },
      { t: 2, v: 222, n: `'  "`, a: 75, an: "QUOTE", s: 52, id: 52, rect: [5, 6, 40, 37] },
      { t: 2, v: 13, n: "Enter", a: 66, an: "ENTER", s: 40, id: 40, rect: [5, 6, 85, 37] },
      { t: 2, v: 100, n: "Num 4", a: 148, an: "KPD4", s: 92, id: 92, rect: [190, 6, 40, 37] },
      { t: 2, v: 101, n: "Num 5", a: 149, an: "KPD5", s: 93, id: 93, rect: [5, 6, 40, 37] },
      { t: 2, v: 102, n: "Num 6", a: 150, an: "KPD6", s: 94, id: 94, rect: [5, 6, 40, 37] },
      { t: 2, v: 160, n: ["$STRID_LEFT", " Shift"], a: 59, an: "SHIFT", s: 225, id: 225, rect: [0, 6, 107, 37] },
      { t: 2, v: 90, n: "Z", a: 54, an: "Z", s: 29, id: 29, rect: [6, 6, 40, 37] },
      { t: 2, v: 88, n: "X", a: 52, an: "X", s: 27, id: 27, rect: [5, 6, 40, 37] },
      { t: 2, v: 67, n: "C", a: 31, an: "C", s: 6, id: 6, rect: [5, 6, 40, 37] },
      { t: 2, v: 86, n: "V", a: 50, an: "V", s: 25, id: 25, rect: [5, 6, 40, 37] },
      { t: 2, v: 66, n: "B", a: 30, an: "B", s: 5, id: 5, rect: [5, 6, 40, 37] },
      { t: 2, v: 78, n: "N", a: 42, an: "N", s: 17, id: 17, rect: [5, 6, 40, 37] },
      { t: 2, v: 77, n: "M", a: 41, an: "M", s: 16, id: 16, rect: [5, 6, 40, 37] },
      { t: 2, v: 188, n: ",  <", a: 55, an: "LESSTHAN", s: 54, id: 54, rect: [5, 6, 40, 37] },
      { t: 2, v: 190, n: ".  >", a: 56, an: "GREATTHAN", s: 55, id: 55, rect: [5, 6, 40, 37] },
      { t: 2, v: 191, n: "/  ?", a: 76, an: "QUESTION", s: 56, id: 56, rect: [5, 6, 40, 37] },
      { t: 2, v: 161, n: ["$STRID_RIGHT", " Shift"], a: 60, an: "SHIFTR", s: 229, id: 229, rect: [5, 6, 107, 37] },
      { t: 2, v: 38, n: "\u2191", a: 19, an: "UPARROW", s: 82, id: 82, rect: [75, 6, 40, 37] },
      { t: 2, v: 97, n: "Num 1", a: 145, an: "KPD1", s: 89, id: 89, rect: [75, 6, 40, 37] },
      { t: 2, v: 98, n: "Num 2", a: 146, an: "KPD2", s: 90, id: 90, rect: [5, 6, 40, 37] },
      { t: 2, v: 99, n: "Num 3", a: 147, an: "KPD6", s: 91, id: 91, rect: [5, 6, 40, 37] },
      { t: 2, v: 162, n: ["$STRID_LEFT", " Ctrl"], a: 113, an: "CTRL", s: 224, id: 224, rect: [0, 6, 62, 37] },
      { t: 2, v: 91, n: { mac: "Command", win: "Win" }, a: 171, an: "WINDOWS", s: 227, id: 227, rect: [5, 6, 62, 37] },
      { t: 2, v: 164, n: { mac: ["$STRID_LEFT", " Option"], win: ["$STRID_LEFT", " Alt"] }, a: 57, an: "ALT", s: 226, id: 226, rect: [5, 6, 62, 37] },
      { t: 2, v: 32, n: ["$STRID_KEY_SPACE"], a: 62, an: "SPACE", s: 44, id: 44, rect: [5, 6, 268, 37] },
      { t: 2, v: 165, n: { mac: ["$STRID_RIGHT", " Option"], win: ["$STRID_RIGHT", " Alt"] }, a: 58, an: "ALTR", s: 230, id: 230, rect: [5, 6, 62, 37] },
      { t: 2, v: 93, n: "Fn", a: 187, an: "APP", s: 101, id: 21025, rect: [5, 6, 62, 37] },
      { t: 2, v: 163, n: ["$STRID_RIGHT", " Ctrl"], a: 114, an: "CTRLR", s: 228, id: 228, rect: [5, 6, 62, 37] },
      { t: 2, v: 37, n: "\u2190", a: 21, an: "LEFTARROW", s: 80, id: 80, rect: [30, 6, 40, 37] },
      { t: 2, v: 40, n: "\u2193", a: 20, an: "DOWNARROW", s: 81, id: 81, rect: [5, 6, 40, 37] },
      { t: 2, v: 39, n: "\u2192", a: 22, an: "RIGHTARROW", s: 79, id: 79, rect: [5, 6, 40, 37] },
      { t: 2, v: 96, n: "Num 0", a: 144, an: "KPD0", s: 98, id: 98, rect: [30, 6, 85, 37] },
      { t: 2, v: 110, n: "Num .", a: 158, an: "KPDDOT", s: 99, id: 99, rect: [5, 6, 40, 37] },
      { t: 2, v: 14, n: "Num Enter", a: 160, an: "KPDENTER", s: 88, id: 88, rect: [5, 6, 40, 37] }
    ],
    mouse_select: [
      { t: 1, v: 256, n: ["$STRID_KEY_LEFT"], a: 0, an: "M1", s: 256, id: 207, rect: [0, 15, 50, 37] },
      { t: 1, v: 257, n: ["$STRID_KEY_RIGHT"], a: 0, an: "M2", s: 257, id: 208, rect: [15, 15, 50, 37] },
      { t: 1, v: 258, n: ["$STRID_KEY_MIDDLE"], a: 0, an: "M3", s: 258, id: 211, rect: [15, 15, 50, 37] },
      { t: 1, v: 1024, n: ["$STRID_KEY_WHELL_UP"], a: 0, an: "WHEELUP", s: 1024, id: 217, rect: [15, 15, 50, 37] },
      { t: 1, v: 1025, n: ["$STRID_KEY_WHELL_DOWN"], a: 0, an: "WHEELDOWN", s: 1025, id: 218, rect: [15, 15, 50, 37] },
      { t: 1, v: 1026, n: ["$STRID_KEY_WHELL_LEFT"], a: 0, an: "WHEELLEFT", s: 1026, id: 219, rect: [15, 15, 50, 37] },
      { t: 1, v: 1027, n: ["$STRID_KEY_WHELL_RIGHT"], a: 0, an: "WHEELRIGHT", s: 1027, id: 220, rect: [15, 15, 50, 37] }
    ],
    rgb: [
      { t: 2, v: 0, n: ["$STRID_KBD_KEY_RGB_TOG"], a: 0, an: "NONE", s: 0, id: 30752, rect: [0, 15, 70, 37] },
      { t: 2, v: 0, n: ["$STRID_KBD_KEY_RGB_MODE_FORWARD"], a: 0, an: "NONE", s: 0, id: 30753, rect: [15, 15, 70, 37] },
      { t: 2, v: 0, n: ["$STRID_KBD_KEY_RGB_MODE_REVERSE"], a: 0, an: "NONE", s: 0, id: 30754, rect: [15, 15, 70, 37] },
      { t: 2, v: 0, n: ["$STRID_KBD_KEY_RGB_VAI"], a: 0, an: "NONE", s: 0, id: 30759, rect: [15, 15, 70, 37] },
      { t: 2, v: 0, n: ["$STRID_KBD_KEY_RGB_VAD"], a: 0, an: "NONE", s: 0, id: 30760, rect: [15, 15, 70, 37] },
      { t: 2, v: 0, n: ["$STRID_KBD_KEY_RGB_SPI"], a: 0, an: "NONE", s: 0, id: 30761, rect: [15, 15, 70, 37] },
      { t: 2, v: 0, n: ["$STRID_KBD_KEY_RGB_SPD"], a: 0, an: "NONE", s: 0, id: 30762, rect: [15, 15, 70, 37] }
    ],
    media: [
      { t: 2, v: 0, n: ["$STRID_KBD_KEY_MEDIA"], a: 0, an: "NONE", s: 0, id: 175, rect: [0, 15, 70, 37] },
      { t: 2, v: 0, n: ["$STRID_KBD_KEY_MEDIA_PLAY_PAUSE"], a: 0, an: "NONE", s: 0, id: 174, rect: [15, 15, 70, 37] },
      { t: 2, v: 0, n: ["$STRID_KBD_KEY_MEDIA_NEXT_TRACK"], a: 0, an: "NONE", s: 0, id: 171, rect: [15, 15, 70, 37] },
      { t: 2, v: 0, n: ["$STRID_KBD_KEY_MEDIA_PREV_TRACK"], a: 0, an: "NONE", s: 0, id: 172, rect: [15, 15, 70, 37] },
      { t: 2, v: 0, n: ["$STRID_KBD_KEY_AUDIO_MUTE"], a: 0, an: "NONE", s: 0, id: 168, rect: [15, 15, 70, 37] },
      { t: 2, v: 0, n: ["$STRID_KBD_KEY_AUDIO_VOL_UP"], a: 0, an: "NONE", s: 0, id: 169, rect: [15, 15, 70, 37] },
      { t: 2, v: 0, n: ["$STRID_KBD_KEY_AUDIO_VOL_DOWN"], a: 0, an: "NONE", s: 0, id: 170, rect: [15, 15, 70, 37] }
    ],
    windows: [
      { t: 2, v: 0, n: ["$STRID_KBD_KEY_SYSTEM_POWER"], a: 0, an: "NONE", s: 0, id: 165, rect: [0, 15, 70, 37] },
      { t: 2, v: 0, n: ["$STRID_KBD_KEY_SYSTEM_SLEEP"], a: 0, an: "NONE", s: 0, id: 166, rect: [15, 15, 70, 37] },
      { t: 2, v: 0, n: ["$STRID_KBD_KEY_SYSTEM_WAKE"], a: 0, an: "NONE", s: 0, id: 167, rect: [15, 15, 70, 37] },
      { t: 2, v: 0, n: ["$STRID_KBD_KEY_MY_COMPUTER"], a: 0, an: "NONE", s: 0, id: 179, rect: [15, 15, 70, 37] },
      { t: 2, v: 0, n: ["$STRID_KBD_KEY_CALCULATOR"], a: 0, an: "NONE", s: 0, id: 178, rect: [15, 15, 70, 37] },
      { t: 2, v: 0, n: ["$STRID_KBD_KEY_MAIL"], a: 0, an: "NONE", s: 0, id: 177, rect: [15, 15, 70, 37] }
    ],
    macro: [
      { t: 2, v: 0, n: "M1", a: 0, an: "NONE", s: 0, id: 30464, rect: [15, 15, 70, 37] },
      { t: 2, v: 0, n: "M2", a: 0, an: "NONE", s: 0, id: 30465, rect: [15, 15, 70, 37] },
      { t: 2, v: 0, n: "M3", a: 0, an: "NONE", s: 0, id: 30466, rect: [15, 15, 70, 37] },
      { t: 2, v: 0, n: "M4", a: 0, an: "NONE", s: 0, id: 30467, rect: [15, 15, 70, 37] },
      { t: 2, v: 0, n: "M5", a: 0, an: "NONE", s: 0, id: 30468, rect: [15, 15, 70, 37] },
      { t: 2, v: 0, n: "M6", a: 0, an: "NONE", s: 0, id: 30469, rect: [15, 15, 70, 37] },
      { t: 2, v: 0, n: "M7", a: 0, an: "NONE", s: 0, id: 30470, rect: [15, 15, 70, 37] },
      { t: 2, v: 0, n: "M8", a: 0, an: "NONE", s: 0, id: 30471, rect: [15, 15, 70, 37] },
      { t: 2, v: 0, n: "M9", a: 0, an: "NONE", s: 0, id: 30472, rect: [15, 15, 70, 37] },
      { t: 2, v: 0, n: "M10", a: 0, an: "NONE", s: 0, id: 30473, rect: [15, 15, 70, 37] },
      { t: 2, v: 0, n: "M11", a: 0, an: "NONE", s: 0, id: 30474, rect: [15, 15, 70, 37] },
      { t: 2, v: 0, n: "M12", a: 0, an: "NONE", s: 0, id: 30475, rect: [15, 15, 70, 37] },
      { t: 2, v: 0, n: "M13", a: 0, an: "NONE", s: 0, id: 30476, rect: [15, 15, 70, 37] },
      { t: 2, v: 0, n: "M14", a: 0, an: "NONE", s: 0, id: 30477, rect: [15, 15, 70, 37] },
      { t: 2, v: 0, n: "M15", a: 0, an: "NONE", s: 0, id: 30478, rect: [15, 15, 70, 37] },
      { t: 2, v: 0, n: "M16", a: 0, an: "NONE", s: 0, id: 30479, rect: [15, 15, 70, 37] },
      { t: 2, v: 0, n: "M17", a: 0, an: "NONE", s: 0, id: 30480, rect: [15, 15, 70, 37] },
      { t: 2, v: 0, n: "M18", a: 0, an: "NONE", s: 0, id: 30481, rect: [15, 15, 70, 37] },
      { t: 2, v: 0, n: "M19", a: 0, an: "NONE", s: 0, id: 30482, rect: [15, 15, 70, 37] },
      { t: 2, v: 0, n: "M20", a: 0, an: "NONE", s: 0, id: 30483, rect: [15, 15, 70, 37] }
    ],
    extra: [
      { t: 2, v: 18, n: "Menu", a: 82, an: "NONE", s: 0, id: 118, rect: [6, 6, 70, 57] },
      { t: 2, v: 0, n: "App", a: 0, an: "NONE", s: 0, id: 101, rect: [6, 6, 70, 57] },
      { t: 2, v: 0, n: ["$STRID_KBD_KEY_RGB_HUI"], a: 0, an: "NONE", s: 0, id: 30755, rect: [6, 6, 70, 57] },
      { t: 2, v: 0, n: ["$STRID_KBD_KEY_RGB_HUD"], a: 0, an: "NONE", s: 0, id: 30756, rect: [6, 6, 70, 57] },
      { t: 2, v: 0, n: ["$STRID_KBD_KEY_BRGB_VAI"], a: 0, an: "NONE", s: 0, id: 40960, rect: [6, 6, 70, 57] },
      { t: 2, v: 0, n: ["$STRID_KBD_KEY_BRGB_VAD"], a: 0, an: "NONE", s: 0, id: 40961, rect: [6, 6, 70, 57] },
      { t: 2, v: 0, n: ["$STRID_KBD_KEY_BRGB_SPI"], a: 0, an: "NONE", s: 0, id: 40962, rect: [6, 6, 70, 57] },
      { t: 2, v: 0, n: ["$STRID_KBD_KEY_BRGB_SPD"], a: 0, an: "NONE", s: 0, id: 40963, rect: [6, 6, 70, 57] },
      { t: 2, v: 0, n: ["$STRID_KBD_KEY_BRGB_MOD"], a: 0, an: "NONE", s: 0, id: 40964, rect: [6, 6, 70, 57] },
      { t: 2, v: 0, n: ["$STRID_KBD_KEY_BRGB_RMOD"], a: 0, an: "NONE", s: 0, id: 40965, rect: [6, 6, 70, 57] },
      { t: 2, v: 0, n: ["$STRID_KBD_KEY_BRGB_COI"], a: 0, an: "NONE", s: 0, id: 40966, rect: [6, 6, 70, 57] },
      { t: 2, v: 0, n: ["$STRID_KBD_KEY_BRGB_COD"], a: 0, an: "NONE", s: 0, id: 40967, rect: [6, 6, 70, 57] },
      { t: 2, v: 0, n: ["$STRID_KBD_SWITCH_WASD"], a: 0, an: "NONE", s: 0, id: 36866, rect: [6, 6, 70, 57] },
      { t: 2, v: 0, n: ["$STRID_KBD_SWITCH_MAC_MODE"], a: 0, an: "NONE", s: 0, id: 36867, rect: [6, 6, 70, 57] }
    ]
  };

  // data/device-database.js
  var DEVICE_DB = {
    products: {
      9e3: { name: "KNIFE", sensor: null },
      9001: { name: "SA-ML01", sensor: "PAW3395" },
      9002: { name: "Receiver", sensor: null },
      9003: { name: "Receiver 8K", sensor: null },
      9004: { name: "SA-MH01", sensor: "PAW3395" },
      9005: { name: "SA-SL01", sensor: "PAW3395" },
      9006: { name: "SA-SH01", sensor: "PAW3395" },
      9007: { name: "GS-SH01", sensor: null },
      9008: { name: "ER21", sensor: null },
      9009: { name: "ES21", sensor: "PAW3950" },
      9010: { name: "ES21Pro", sensor: "PAW3950" },
      9012: { name: "ER21M", sensor: "PAW3950" },
      9013: { name: "ER21Pro", sensor: null },
      9014: { name: "ER21Pro", sensor: null },
      9015: { name: "ES21M", sensor: "PAW3950" },
      9016: { name: "MH01Pro", sensor: "PAW3950" },
      9017: { name: "SH01Pro", sensor: "PAW3950" }
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
      "SA-ML01": "PAW3395",
      "SA-MH01": "PAW3395",
      "SA-SL01": "PAW3395",
      "SA-SH01": "PAW3395",
      "ES21": "PAW3395",
      "SA-MH01Pro": "PAW3950",
      "SA-SH01Pro": "PAW3950",
      "ES21Pro": "PAW3950",
      "ES21M": "PAW3950",
      "ER21Pro": "PAW3950",
      "ER21M": "PAW3950"
    },
    getSensorByName(deviceName) {
      var sensor = DEVICE_DB.nameSensorFallbacks[deviceName];
      return sensor !== void 0 ? sensor : null;
    }
  };
  function is_keyboard_5_15(device) {
    if (device.productName == "Z68A") {
      return true;
    }
    return false;
  }
  function is_hs_keyboard(device) {
    if (device.productName == "Z68A" || device.productName == "Z60") {
      return true;
    }
    return false;
  }

  // state/key-lookup.js
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
  function resolve_name(spec) {
    if (typeof spec === "string") {
      if (spec.startsWith("$")) {
        return layui.i18np.prop(spec.substring(1));
      }
      return spec;
    }
    if (Array.isArray(spec)) {
      return spec.map((part) => resolve_name(part)).join("");
    }
    if (spec.win !== void 0) {
      var isMac = layui.device("os").os.toLowerCase() === "mac";
      return resolve_name(isMac ? spec.mac : spec.win);
    }
    return "";
  }
  function pc_key_manager_init() {
    function build(entries, factory) {
      return entries.map(function(d) {
        var resolved = { ...d };
        resolved.name = resolve_name(d.n !== void 0 ? d.n : d.name);
        if (resolved.n !== void 0) delete resolved.n;
        if (resolved.name === void 0) resolved.name = "";
        return factory(
          resolved.t !== void 0 ? resolved.t : resolved.type,
          resolved.v !== void 0 ? resolved.v : resolved.vCode,
          resolved.name,
          resolved.a !== void 0 ? resolved.a : resolved.aCode,
          resolved.an !== void 0 ? resolved.an : resolved.aName,
          resolved.s !== void 0 ? resolved.s : resolved.sCode,
          resolved.id,
          resolved.r,
          resolved.c,
          resolved.rect
        );
      }).filter(function(item) {
        return item;
      });
    }
    modifiers = build(KEY_DB.modifiers, create_pc_key_info);
    keys = build(KEY_DB.keys, create_pc_key_info);
    macro_keys = [];
    keys.forEach(function(item, idx) {
      if (idx === 9) {
        macro_keys.push(create_pc_key_info(1, 1028, resolve_name("$STRID_KEY_MOUSE_MOVE"), 0, "MOUSEMOVE", 1028));
        macro_keys.push(create_pc_key_info(1, 1029, resolve_name("$STRID_KEY_MOUSE_POSITION"), 0, "MOUSEPOSITION", 1029));
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
    kbd_select_keys.forEach(function(k) {
      kbd_all_keys.push(k);
    });
    mouse_select_keys.forEach(function(k) {
      kbd_all_keys.push(k);
    });
    kbd_rgb_keys.forEach(function(k) {
      kbd_all_keys.push(k);
    });
    kbd_media_keys.forEach(function(k) {
      kbd_all_keys.push(k);
    });
    kbd_windows_keys.forEach(function(k) {
      kbd_all_keys.push(k);
    });
    kbd_macro_keys.forEach(function(k) {
      kbd_all_keys.push(k);
    });
    build(KEY_DB.extra, kbd_create_pc_key_info).forEach(function(k) {
      kbd_all_keys.push(k);
    });
  }
  function get_key_name_from_keyid(keyId) {
    var str = "";
    kbd_all_keys.forEach(function(item) {
      if (item.keyId == keyId) str = item.name;
    });
    return str;
  }
  function get_key_code_from_keyid(keyId) {
    var offset = 0;
    kbd_all_keys.forEach(function(item) {
      if (item.keyId == keyId) offset = item.vCode;
    });
    return offset;
  }
  function get_keyid_from_code(keyCode) {
    var offset = 0;
    kbd_all_keys.forEach(function(item) {
      if (item.vCode == keyCode) offset = item.keyId;
    });
    return offset;
  }
  function get_scan_code(keyId) {
    var offset = 0;
    macro_keys.forEach(function(item) {
      if (item.vCode == keyId) offset = item.sCode;
    });
    return offset;
  }
  function get_vk_code(keyId) {
    var offset = 0;
    macro_keys.forEach(function(item) {
      if (item.sCode == keyId) offset = item.vCode;
    });
    return offset;
  }
  function get_key_name_from_code(keyCode) {
    var str = layui.i18np;
    var value = str.prop("STRID_NONE");
    macro_keys.forEach(function(item) {
      if (item.vCode == keyCode) value = item.name;
    });
    return value;
  }
  function get_key_code_from_name(keyName) {
    var offset = 0;
    macro_keys.forEach(function(item) {
      if (item.name == keyName) offset = item.vCode;
    });
    return offset;
  }
  function get_modifier_name_from_code(modifierCode) {
    var str = layui.i18np;
    var value = str.prop("STRID_NONE");
    modifiers.forEach(function(item) {
      if (item.vCode == modifierCode) value = item.name;
    });
    return value;
  }
  function pc_kbd_manager_keys(client) {
    return is_keyboard_5_15(client.device) ? kbd_5_15_keys : kbd_5_14_keys;
  }
  function pc_kbd_key_num(client) {
    return is_keyboard_5_15(client.device) ? 75 : 70;
  }

  // protocol/buffer.js
  var PacketBuilder = class _PacketBuilder {
    constructor() {
      this.data = [];
    }
    static begin(cmd) {
      var b = new _PacketBuilder();
      b.uint8(cmd);
      return b;
    }
    uint8(v) {
      this.data.push(v & 255);
      return this;
    }
    uint16(v) {
      this.data.push(v & 255);
      this.data.push(v >> 8 & 255);
      return this;
    }
    uint24(v) {
      this.data.push(v & 255);
      this.data.push(v >> 8 & 255);
      this.data.push(v >> 16 & 255);
      return this;
    }
    uint32(v) {
      this.data.push(v & 255);
      this.data.push(v >> 8 & 255);
      this.data.push(v >> 16 & 255);
      this.data.push(v >> 24 & 255);
      return this;
    }
    bytes(arr) {
      for (var i = 0; i < arr.length; i++) {
        this.data.push(arr[i] & 255);
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
  };

  // protocol/binary-reader.js
  var BinaryReader = class {
    constructor(data) {
      this.data = data;
      this.offset = 0;
    }
    uint8() {
      return this.data[this.offset++] & 255;
    }
    uint16() {
      var v = this.data[this.offset] & 255 | (this.data[this.offset + 1] & 255) << 8;
      this.offset += 2;
      return v;
    }
    uint32() {
      var v = 0;
      for (var i = 0; i < 4; i++) {
        v |= (this.data[this.offset++] & 255) << i * 8;
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
  };

  // protocol/key-config-parser.js
  function create_key_info() {
    var keyInfo = {
      cmd: 3,
      name: "",
      label: "",
      configType: 0
    };
    keyInfo.x = 0;
    keyInfo.y = 0;
    keyInfo.touch_style = 0;
    keyInfo.touch_firearms = 0;
    keyInfo.touch_continue_count = 75;
    keyInfo.slide_range = 63;
    keyInfo.slide_time = 16;
    keyInfo.slide_delay = 0;
    keyInfo.fps_style = 0;
    keyInfo.fps_shoot_mode = 0;
    keyInfo.fps_shoot_count = 2;
    keyInfo.joystick_radius = 100;
    keyInfo.joystick_timeout = 0;
    keyInfo.joystick_radiusTo0 = 0;
    keyInfo.joystick_switch_percent = 133;
    keyInfo.joystick_switch_mode = 0;
    keyInfo.joystick_navigate_mode = 0;
    keyInfo.joystick_mouse_ani = 1;
    keyInfo.moba_radius = 63;
    keyInfo.wheel_senstivity = 10;
    keyInfo.wheel_endKey = 0;
    keyInfo.mouse_lock_unlock = 0;
    keyInfo.mouse_lock_unlock_delay = 100;
    keyInfo.mouse_lock_unlock_call = 0;
    keyInfo.mouse_lock_again = 0;
    keyInfo.mouse_lock_again_delay = 200;
    keyInfo.mouse_push_joystick_again = 0;
    keyInfo.mouse_push_joystick_again_delay = 200;
    keyInfo.mouse_vision_senstivity = 10;
    keyInfo.mouse_pointer_senstivity = 15;
    keyInfo.mouse_horizontal_senstivity = 5;
    keyInfo.mouse_vertical_senstivity = 1;
    keyInfo.mouse_release_delay = 0;
    keyInfo.mouse_radius = 60;
    keyInfo.mouse_followed_left = 1;
    keyInfo.mouse_followed_right = 1;
    keyInfo.mouse_targeted_percent = 30;
    keyInfo.mouse_targeted_trigger = 0;
    keyInfo.mouse_right_drop = 0;
    keyInfo.mouse_mapping_keys = "[0,0,0]";
    keyInfo.mouse_mapping_key_data = 1;
    keyInfo.mouse_intensity_toggle_key = "";
    keyInfo.mouse_intensity_toggle_light = 1;
    keyInfo.mouse_auto_click = 0;
    keyInfo.mouse_auto_click_per_second = 5;
    keyInfo.mouse_auto_click_toggle_key = "";
    keyInfo.mouse_auto_click_light = 0;
    keyInfo.mouse_auto_click_down = 0;
    keyInfo.mouse_auto_click_up = 0;
    keyInfo.mouse_auto_click_rand = 0;
    keyInfo.mouse_intensity = [0, 0, 0, 0, 0];
    keyInfo.mouse_intensity_key = ["", "", "", "", ""];
    keyInfo.mouse_intensity_light = [-1, -1, -1, -1, -1];
    keyInfo.mouse_intensity_adjustment = [[], [], [], [], []];
    keyInfo.mouse_mapping_function = 0;
    keyInfo.mouse_mapping_function_data = 200;
    keyInfo.mouse_mapping_function_text = "";
    keyInfo.macro_style = 0;
    keyInfo.macro_toggleKey = 0;
    keyInfo.macro_endKey = 0;
    keyInfo.locked = 0;
    keyInfo.macroKeys = [];
    return keyInfo;
  }
  function create_macro_info() {
    var str = layui.i18np;
    var mouseInfo = {
      name: str.prop("STRID_NONE"),
      label: "",
      _id: 0,
      x: 0,
      y: 0,
      style: 0,
      interval_time: 0,
      continue_time: 0,
      touch_style: 0,
      moba_reverse: 0,
      moba_radius: 0,
      slide_style: 0,
      slide_range: 0,
      mouse_key_code: 0,
      mouse_key_event: 0,
      mouse_key_time: 0,
      mouse_key_loop: 0
    };
    return mouseInfo;
  }
  function clone_macro_info(client) {
    return Object.assign({}, client);
  }
  function parseKeyNames(reader, keyCount, keyInfo, client) {
    var html2 = "";
    var str = "";
    for (var i = 0; i < keyCount; i++) {
      var code = reader.uint8();
      if (code == 7) {
        if (html2.length > 0) html2 += "+";
        html2 += KEY_WHEEL_UP;
        if (str.length > 0) str += "+";
        str += "\u25B2";
      } else if (code == 8) {
        if (html2.length > 0) html2 += "+";
        html2 += KEY_WHEEL_DOWN;
        if (str.length > 0) str += "+";
        str += "\u25BC";
      } else {
        get_keys(client).forEach(function(item) {
          if (item.id.length == 1 && code == item.id[0]) {
            if (html2.length > 0) html2 += "+";
            html2 += item.name;
            if (str.length > 0) str += "+";
            str += item.label;
          }
        });
      }
    }
    keyInfo.name = html2;
    keyInfo.label = str;
  }
  function normalize_scan_code(code) {
    if (code == 162) return 17;
    if (code == 164) return 18;
    if (code == 160) return 16;
    return code;
  }
  function parse_mouse_mapping(reader, byteLen, keyInfo, totalLen, arr) {
    var modifier = get_vk_code(reader.uint8());
    modifier = normalize_scan_code(modifier);
    var eventType = reader.uint8();
    var keyCode = reader.uint8();
    if (eventType == 1) {
      keyCode += 255;
    } else if (eventType == 3) {
      keyInfo.mouse_mapping_key_data = Math.abs(keyCode - 64);
      keyCode = keyCode > 64 ? 1024 : 1025;
    } else if (eventType == 5) {
      keyInfo.mouse_mapping_key_data = Math.abs(keyCode - 64);
      keyCode = keyCode < 64 ? 1026 : 1027;
    } else if (eventType == 4) {
      keyCode += 512;
    }
    keyCode = get_vk_code(keyCode);
    var secondaryModifier = 0;
    if (reader.offset < totalLen) {
      secondaryModifier = get_vk_code(reader.uint8());
      secondaryModifier = normalize_scan_code(secondaryModifier);
    }
    keyInfo.configType = 0;
    keyInfo.touch_style = 27;
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
      keyInfo.mouse_mapping_function_data = keyInfo.mouse_mapping_function_data & 255 | highByte << 8 & 65280;
    }
    if (reader.offset < totalLen) {
      reader.uint8();
    }
    if (keyInfo.mouse_mapping_function == 9) {
      if (i8 == 2) {
        keyInfo.mouse_mapping_function_data *= get_cpi_step(client);
        keyInfo.configType = 0;
        keyInfo.touch_style = 29;
        arr.push(keyInfo);
      }
    } else if (keyInfo.mouse_mapping_function == 16) {
      var strLen = reader.uint16();
      keyInfo.mouse_mapping_function_text = String.fromCharCode.apply(null, byteLen.subarray(reader.offset, reader.offset + strLen));
      keyInfo.configType = 0;
      keyInfo.touch_style = 29;
      arr.push(keyInfo);
    } else {
      keyInfo.configType = 0;
      keyInfo.touch_style = 29;
      arr.push(keyInfo);
    }
  }
  function parse_macro_mouse_event(reader, keyInfo, macroInfo) {
    var i6 = reader.uint8();
    if ((i6 & 128) != 0) {
      macroInfo.mouse_key_loop = reader.uint16();
    } else {
      macroInfo.mouse_key_loop = 1;
    }
    i6 &= 127;
    if (i6 == 0 || i6 == 1 || i6 == 4) {
      var keyCode = reader.uint8();
      if (i6 == 1) keyCode += 255;
      else if (i6 == 4) keyCode += 512;
      macroInfo.mouse_key_code = get_vk_code(keyCode);
      var eventByte = reader.uint8();
      macroInfo.mouse_key_event = MOUSE_EVENT_KEY_UP;
      if (eventByte == 0) macroInfo.mouse_key_event = MOUSE_EVENT_KEY_DOWN;
      else if (eventByte == 2) macroInfo.mouse_key_event = MOUSE_EVENT_KEY_UP;
    } else if (i6 == 2) {
      var b1 = reader.uint8();
      var b2 = reader.uint8();
      var b3 = reader.uint8();
      var coordX = b1 & 255 | b2 << 8 & 3840;
      var coordY = b3 & 255 | b2 << 4 & 3840;
      macroInfo.mouse_key_code = coordX << 16 | coordY;
      macroInfo.mouse_key_event = MOUSE_EVENT_MOVE;
    } else if (i6 == 6) {
      var absX = reader.uint16();
      var absY = reader.uint16();
      macroInfo.mouse_key_code = absX << 16 | absY;
      macroInfo.mouse_key_event = MOUSE_EVENT_POSITION;
    } else if (i6 == 3) {
      macroInfo.mouse_key_code = reader.uint8() - 64;
      macroInfo.mouse_key_event = MOUSE_EVENT_WHEEL_VERT;
    } else if (i6 == 5) {
      macroInfo.mouse_key_code = reader.uint8() - 64;
      macroInfo.mouse_key_event = MOUSE_EVENT_WHEEL_HORZ;
    }
    macroInfo.mouse_key_time = reader.uint16();
    keyInfo.macroKeys.push(macroInfo);
  }
  function parse_macro_entry(reader, byteLen, keyInfo, idx, totalLen, arr) {
    var styleByte = reader.uint8();
    keyInfo.macro_style = 0;
    if (styleByte == 1) keyInfo.macro_style = 1;
    else if (styleByte == 2) keyInfo.macro_style = 2;
    else if (styleByte == 3) keyInfo.macro_style = 3;
    else if (styleByte == 4) keyInfo.macro_style = 4;
    else if (styleByte == 5) keyInfo.macro_style = 5;
    else if (styleByte == 6) keyInfo.macro_style = 6;
    keyInfo.macro_endKey = reader.uint8();
    var macroCount = reader.uint8();
    for (var i = 0; i < macroCount; i++) {
      var macroInfo = create_macro_info();
      reader.uint16();
      reader.uint16();
      macroInfo.interval_time = reader.uint16();
      macroInfo.continue_time = reader.uint16();
      macroInfo.style = reader.uint8() & 127;
      if (macroInfo.style == 22) {
        parse_macro_mouse_event(reader, keyInfo, macroInfo);
      }
    }
    reader.uint8();
    var contByte = reader.uint8();
    keyInfo.macro_toggleKey = reader.uint8();
    keyInfo.configType = CONFIG_TYPE_MACRO;
    if ((contByte & 8) != 0 && keyInfo.macroKeys.length >= 2) {
      var keyInfo2 = create_key_info();
      keyInfo2.name = keyInfo.name;
      keyInfo2.label = keyInfo.label;
      keyInfo2.configType = 0;
      keyInfo2.touch_style = 27;
      var payload = [0, 0, keyInfo.macroKeys[0].mouse_key_code];
      keyInfo2.mouse_mapping_keys = JSON.stringify(payload);
      keyInfo2.mouse_auto_click = 1;
      keyInfo2.mouse_auto_click_down = keyInfo.macroKeys[0].mouse_key_time;
      keyInfo2.mouse_auto_click_up = keyInfo.macroKeys[1].mouse_key_time;
      keyInfo2.mouse_auto_click_rand = keyInfo.macroKeys[0].interval_time;
      arr.push(keyInfo2);
    } else if (idx == 43) {
      arr.forEach(function(item2) {
        if (item2.configType == CONFIG_TYPE_MACRO && item2.macro_style == keyInfo.macro_style && item2.name == keyInfo.name && item2.label == keyInfo.label) {
          keyInfo.macroKeys.forEach(function(item3) {
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
    if (byteLen == void 0) {
      arr.splice(0, arr.length);
      return;
    }
    var reader = new BinaryReader(new Uint8Array(byteLen));
    var header = reader.uint8() & 15;
    if (header !== 3) return;
    var totalLen = byteLen[0] << 4 & 3840 | reader.uint8();
    if (byteLen.byteLength < totalLen) return;
    var keyInfo = create_key_info();
    var idx = reader.uint8();
    if (idx !== 22 && idx !== 24 && idx !== 5 && idx !== 43) return;
    var keyCount = reader.uint8();
    if (keyCount > 2) return;
    parseKeyNames(reader, keyCount, keyInfo, client);
    switch (idx) {
      case 22:
        parse_mouse_mapping(reader, byteLen, keyInfo, totalLen, arr);
        break;
      case 24:
        parse_mapping_function(reader, byteLen, keyInfo, totalLen, arr, client);
        break;
      case 5:
      case 43:
        parse_macro_entry(reader, byteLen, keyInfo, idx, totalLen, arr);
        break;
    }
  }

  // protocol/http-data-model.js
  function send_event_config_reset(client) {
    var payload = [];
    payload.push(3);
    payload.push(0);
    payload.push(3);
    send_event(client, crc_process(client, payload));
  }
  function send_event_factory_reset(client, isReboot) {
    send_event_action(client, CMD_FACTORY_RESET, isReboot ? 1 : 0);
    client.device_info.pollingRate = -1;
  }
  function query_firmware(client, fwChannel) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        try {
          if (this.responseText.length > 0) {
            client.device_info.firmwareInfo = JSON.parse(this.responseText);
          }
        } catch (err) {
          log_r(err);
        }
        if (navigator.hid != void 0) {
          window.postMessage({
            "action": ACTION_UI_REFRESH_CURRENT_CLIENT
          });
        }
      }
    };
    xhr.open("GET", "https://www.miracletek.net/game/firmware.php" + ("?os=4&v=9&c=1&a=pc-rawmhub.game&ta=pc-rawmhub.game&mac=" + (layui.device("os").os.toLowerCase() == "mac" ? 1 : 0)) + "&devName=" + client.device_info.deviceName + "&vendorId=" + client.device_info.vendorId + "&productId=" + client.device_info.productId + "&devRevName=" + client.device_info.revision + "&devRevCode=" + client.device_info.revisionCode + "&devHwCode=" + client.device_info.hardwareCode + "&devMode=1&devFwChn=" + fwChannel, true);
    xhr.send();
  }
  function upload_mouse_config(client, value, value2) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        try {
          if (this.responseText.length > 0) {
            log_r(this.responseText);
          }
        } catch (err2) {
          log_r(err2);
        }
      }
    };
    var bn = new BigNumber(0);
    var bn2 = new BigNumber(1);
    var len = client.device_info.keyDelay;
    for (var index = 0; index < len.length; index++) {
      var bn3 = new BigNumber(len[index]);
      bn3 = bn3.multipliedBy(bn2);
      bn = bn.plus(bn3);
      bn2 = bn2.multipliedBy(256);
    }
    var len2 = client.device_info.sensor;
    if (len2.length == 0) {
      len2 = DEVICE_DB.getSensor(client.device_info.productId) ?? DEVICE_DB.getSensorByName(client.device_info.deviceName) ?? "";
    }
    xhr.open("GET", "https://www.miracletek.net/game/mouse_config.php" + ("?os=4&v=9&c=1&a=pc-rawmhub.game&ta=pc-rawmhub.game&mac=" + (layui.device("os").os.toLowerCase() == "mac" ? 1 : 0)) + "&devName=" + client.device_info.deviceName + "&sensor=" + len2 + "&uuid=" + client.device_info.esbAddress + "&performance=" + client.device_info.powerMode + "&lod=" + client.device_info.lod + "&angle_snapping=" + client.device_info.angleSnapping + "&ripple_control=" + client.device_info.rippleControl + "&motion_sync=" + client.device_info.motionSync + "&wireless_turbo=" + (client.device_info.txOutputPower == 0 ? 0 : 1) + "&sleep_time=" + value2 + "&angle_tuning=" + client.device_info.angleTuning + "&key_delay=" + bn.toFixed() + "&channel=" + value + "&polling_rate=" + client.device_info.pollingRate + "&glass_mode=" + (is_glass_mode_supported(client) && client.device_info.glassModeEnabled ? 1 : 0) + "&dpi_xy=" + ((client.device_info.resolution & 4294901760) != 0 ? 1 : 0), true);
    xhr.send();
  }
  function upload_mouse_config_delayed(deviceInfo, channel, sleepTime) {
    DS.upload_mouse_config_timer = void 0;
    upload_mouse_config(deviceInfo, channel, sleepTime);
  }

  // state/kbd-structures.js
  function kbd_create_key_light_info(client, value, hue, sat) {
    var keyLightInfo = {
      row: client,
      col: value,
      hue,
      sat
    };
    return keyLightInfo;
  }
  function kbd_create_light_box_info() {
    var lightBoxInfo = {
      mode: 1,
      r: 0,
      g: 255,
      b: 0,
      speed: 50,
      brightness: 100,
      colored: 1
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
      mode: 13,
      hue: 255,
      sat: 255,
      speed: 50,
      brightness: 100,
      sleep_time: 0,
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
      row: -1,
      col: -1,
      switch_type: 0,
      apc_lv: 150,
      rt_enable: 0,
      rt_press_lv: 50,
      rt_release_lv: 50,
      top_dz: 15,
      btm_dz: 20
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
      id: -1,
      row1: -1,
      col1: -1,
      row2: -1,
      col2: -1,
      socd_mode: 0
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
      id: -1,
      row: -1,
      col: -1,
      tap_time: 200,
      keyCode1: 0,
      keyCode2: 0
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
      id: -1,
      row1: -1,
      col1: -1,
      row2: -1,
      col2: -1
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
      id: -1,
      row: -1,
      col: -1,
      keyCode1: 0,
      state1: 0,
      keyCode2: 0,
      state2: 0,
      keyCode3: 0,
      state3: 0,
      keyCode4: 0,
      state4: 0
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

  // protocol/hs-parser.js
  var hsHandlers = {};
  hsHandlers[CMD_FIRMWARE_VERSION] = function hs_parse_firmware_version(client, byteLen) {
    log_r("IQ_GET_SOFT_DRV_VER");
    if (client.device.productName != void 0) {
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
    window.postMessage({ "action": ACTION_REFRESH_CLIENT_LIST });
    window.postMessage({ "action": ACTION_UI_REFRESH_CLIENT_LIST });
    window.postMessage({ "action": ACTION_UI_REFRESH_CURRENT_CLIENT });
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
        DeviceStore.kbdSync.keyinfoList[63].name = "";
      }
      client.device_info.kbd_key_infos = DeviceStore.kbdSync.keyinfoList.slice();
      DeviceStore.kbdSync.keyinfoList.splice(0, DeviceStore.kbdSync.keyinfoList.length);
      log_r("IQ_GET_KEYCODE_BUF finish");
      DeviceStore.kbdSync.index = DeviceStore.kbdSync.index | SYNC_FLAG_KEYCODE;
      hs_get_macro_num(client);
      window.postMessage({ "action": ACTION_UI_REFRESH_KBD_KEY });
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
    log_r("IQ_RESET_MACRO");
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
              var str = "";
              while (DeviceStore.kbdSync.macroBuff[idx] >= "0".charCodeAt() && DeviceStore.kbdSync.macroBuff[idx] <= "9".charCodeAt()) {
                str += String.fromCharCode(DeviceStore.kbdSync.macroBuff[idx]);
                idx++;
              }
              var len2 = client.device_info.kbd_macro_infos[DeviceStore.kbdSync.macroIndex];
              var macroInfo = len2[len2.length - 1];
              if (macroInfo != void 0) {
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
    log_r("IQ_SET_MACRO_DATA_BUF");
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
      window.postMessage({ "action": ACTION_UI_REFRESH_KBD_MACRO });
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
      window.postMessage({ "action": ACTION_UI_REFRESH_KBD_LIGHT });
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
        window.postMessage({ "action": ACTION_UI_REFRESH_KBD_LIGHT });
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
      window.postMessage({ "action": ACTION_UI_REFRESH_KBD_AXIS });
    }
  };
  hsHandlers[CMD_SET_AXIS_INFO] = function hs_parse_set_axis_info(client, byteLen) {
    log_r("IQ_SET_MAG_DATA");
    if (byteLen.length >= 14) {
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
        window.postMessage({ "action": ACTION_UI_REFRESH_KBD_AXIS });
      }
    }
  };
  hsHandlers[CMD_SOCD_GET_NUM] = function hs_parse_socd_get_num(client, byteLen) {
    log_r("IQ_GET_MAG_SOCD_NUM");
    client.device_info.kbd_socd_num = byteLen[1];
    client.device_info.kbd_socd_infos.splice(0, client.device_info.kbd_socd_infos.length);
    if (client.device_info.kbd_socd_num > 0) {
      hs_get_socd_data(client, 0);
    } else {
      hs_get_mt_num(client);
    }
  };
  hsHandlers[CMD_SOCD_SET_NUM] = function hs_parse_socd_set_num(client, byteLen) {
    log_r("IQ_SET_MAG_SOCD_NUM");
    client.device_info.kbd_socd_num = byteLen[1];
    client.device_info.kbd_socd_infos.splice(0, client.device_info.kbd_socd_infos.length);
    if (client.device_info.kbd_socd_num > 0) {
      for (var offset = 0; offset < DeviceStore.kbdSync.socdinfoList.length; offset++) {
        client.device_info.kbd_socd_infos.push(kbd_clone_socd_info(DeviceStore.kbdSync.socdinfoList[offset]));
      }
      DeviceStore.kbdSync.socdinfoList.splice(0, DeviceStore.kbdSync.socdinfoList.length);
    }
    window.postMessage({ "action": "action_ui_refresh_kbd_advance_key" });
  };
  hsHandlers[CMD_SOCD_GET_DATA] = function hs_parse_socd_get_data(client, byteLen) {
    log_r("IQ_GET_MAG_SOCD_DATA");
    if (byteLen.length >= 10) {
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
        window.postMessage({ "action": "action_ui_refresh_kbd_advance_key" });
      }
    }
  };
  hsHandlers[CMD_SOCD_SET_DATA] = function hs_parse_socd_set_data(client, byteLen) {
    log_r("IQ_SET_MAG_SOCD_DATA");
    if (byteLen.length >= 10) {
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
    window.postMessage({ "action": "action_ui_refresh_kbd_advance_key" });
  };
  hsHandlers[CMD_MT_GET_DATA] = function hs_parse_mt_get_data(client, byteLen) {
    log_r("IQ_GET_MAG_MT_DATA");
    if (byteLen.length >= 10) {
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
        window.postMessage({ "action": "action_ui_refresh_kbd_advance_key" });
      }
    }
  };
  hsHandlers[CMD_MT_SET_DATA] = function hs_parse_mt_set_data(client, byteLen) {
    log_r("IQ_SET_MAG_MT_DATA");
    if (byteLen.length >= 10) {
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
    window.postMessage({ "action": "action_ui_refresh_kbd_advance_key" });
  };
  hsHandlers[CMD_RS_GET_DATA] = function hs_parse_rs_get_data(client, byteLen) {
    log_r("IQ_GET_MAG_RS_DATA");
    if (byteLen.length >= 10) {
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
        window.postMessage({ "action": "action_ui_refresh_kbd_advance_key" });
      }
    }
  };
  hsHandlers[CMD_RS_SET_DATA] = function hs_parse_rs_set_data(client, byteLen) {
    log_r("IQ_SET_MAG_RS_DATA");
    if (byteLen.length >= 10) {
      var value17 = byteLen[1];
      if (value17 < DeviceStore.kbdSync.rsinfoList.length - 1) {
        hs_set_rs_data(client, DeviceStore.kbdSync.rsinfoList[value17 + 1]);
      } else {
        hs_set_rs_num(client, DeviceStore.kbdSync.rsinfoList.length);
      }
    }
  };
  hsHandlers[CMD_DKS_GET_NUM] = function hs_parse_dks_get_num(client, byteLen) {
    log_r("IQ_GET_MAG_DKS_NUM");
    client.device_info.kbd_dks_num = byteLen[1];
    client.device_info.kbd_dks_infos.splice(0, client.device_info.kbd_dks_infos.length);
    if (client.device_info.kbd_dks_num > 0) {
      hs_get_dks_data(client, 0);
    } else {
      DeviceStore.kbdSync.index = DeviceStore.kbdSync.index | SYNC_FLAG_ADVANCED;
      hs_data_sync(client);
      window.postMessage({ "action": "action_ui_refresh_kbd_advance_key" });
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
    window.postMessage({ "action": "action_ui_refresh_kbd_advance_key" });
  };
  hsHandlers[CMD_DKS_GET_DATA] = function hs_parse_dks_get_data(client, byteLen) {
    log_r("IQ_GET_MAG_DKS_DATA");
    if (byteLen.length >= 20) {
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
        window.postMessage({ "action": "action_ui_refresh_kbd_advance_key" });
      }
    }
  };
  hsHandlers[CMD_DKS_SET_DATA] = function hs_parse_dks_set_data(client, byteLen) {
    log_r("IQ_SET_MAG_DKS_DATA");
    if (byteLen.length >= 20) {
      var value17 = byteLen[1];
      if (value17 < DeviceStore.kbdSync.dksinfoList.length - 1) {
        hs_set_dks_data(client, DeviceStore.kbdSync.dksinfoList[value17 + 1]);
      } else {
        hs_set_dks_num(client, DeviceStore.kbdSync.dksinfoList.length);
      }
    }
  };

  // protocol/hs-protocol.js
  function hs_get_firmware_version(client) {
    send_event(client, hs_format_data(client, PacketBuilder.begin(CMD_FIRMWARE_VERSION).build()));
  }
  function hs_set_factory_reset(client) {
    send_event(client, hs_format_data(client, PacketBuilder.begin(CMD_HS_FACTORY_RESET).build()));
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
    log_r("he_custom_data_save:" + data);
    send_event(client, hs_format_data(client, PacketBuilder.begin(CMD_CUSTOM_DATA_SAVE).uint8(data).build()));
  }
  function hs_get_light(client, mode) {
    log_r("hs_get_light:" + mode);
    send_event(client, hs_format_data(client, PacketBuilder.begin(CMD_GET_LIGHT).uint8(3).uint8(mode).build()));
  }
  function hs_set_light(client, value, data) {
    var builder = PacketBuilder.begin(CMD_SET_LIGHT).uint8(3).uint8(value);
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
    send_event(client, hs_format_data(client, PacketBuilder.begin(CMD_SET_LIGHT_BOX).uint8(1).uint8(value.mode).uint8(value.colored).uint8(value.brightness).uint8(value.speed).uint8(value.r).uint8(value.g).uint8(value.b).build()));
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

  // protocol/hid-protocol.js
  function send_event_query(client) {
    if (is_hs_keyboard(client.device)) {
      hs_get_firmware_version(client);
      return;
    }
    var timestamp = parseInt((/* @__PURE__ */ new Date()).getTime() / 1e3);
    var payload = PacketBuilder.begin(HID_QUERY).uint8(0).uint8(HID_PARAM_CMD).uint8(0).uint8(0);
    for (var i = 0; i < 8; i++) {
      payload.uint8(timestamp & 255);
      timestamp = Math.floor(timestamp / 256);
    }
    send_event(client, crc_process(client, payload.build()));
    client.last_query_time = (/* @__PURE__ */ new Date()).getTime();
    if (!is_receiver(client)) {
      client.querying_more_result = true;
    }
  }
  function send_event_action(client, action, value) {
    var payload = PacketBuilder.begin(HID_ACTION_CMD).uint8(0).uint8(action).uint32(value);
    send_event(client, crc_process(client, payload.build()));
    if (action == CMD_QUERY_MORE_RESULT && value == 0 && !is_receiver(client)) {
      client.querying_more_result = true;
      client.last_query_time = (/* @__PURE__ */ new Date()).getTime();
    }
  }
  function send_event_ping(client, pingIndex, isPingAll) {
    if (isPingAll === void 0) isPingAll = true;
    if (client != void 0 ? is_hs_keyboard(client.device) : false) {
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
    var payload = PacketBuilder.begin(3).uint8(0).uint8(HID_ACTION_SELECT_ESB_ADDR);
    for (var len = 0; len < value.length; len += 2) {
      payload.uint8(parseInt(value.substr(len, 2), 16) & 255);
    }
    send_event(client, crc_process(client, payload.build()));
  }
  function send_event_clear_esb_addr(client, value) {
    var payload = PacketBuilder.begin(3).uint8(0).uint8(HID_ACTION_CLEAR_ESB_ADDR);
    for (var len = 0; len < value.length; len += 2) {
      payload.uint8(parseInt(value.substr(len, 2), 16) & 255);
    }
    send_event(client, crc_process(client, payload.build()));
  }
  function send_event_set_esb_addr(client, value, addrType, addr) {
    var payload = PacketBuilder.begin(3).uint8(0).uint8(HID_ACTION_SET_ESB_ADDR);
    for (var len = 0; len < value.length; len += 2) {
      payload.uint8(parseInt(value.substr(len, 2), 16) & 255);
    }
    payload.uint8(addrType).uint8(addr ? 1 : 0);
    send_event(client, crc_process(client, payload.build()));
  }
  function send_event_set_color_code(client, value) {
    var payload = PacketBuilder.begin(3).uint8(0).uint8(HID_ACTION_SET_COLOR_CODE);
    var byteLen = new TextEncoder().encode(value);
    for (var len = 0; len < byteLen.byteLength && len < 16; len++) {
      payload.uint8(byteLen[len]);
    }
    for (var len = byteLen.byteLength; len < 16; len++) {
      payload.uint8(0);
    }
    send_event(client, crc_process(client, payload.build()));
  }
  function send_event_set_sleep_time(client, value) {
    if (client.device_info.sleepTime != value) {
      client.device_info.sleepTime = value;
      var payload = PacketBuilder.begin(3).uint8(0).uint8(HID_ACTION_SET_SLEEP_TIME).uint16(value);
      send_event(client, crc_process(client, payload.build()));
      clearTimeout(DS.upload_mouse_config_timer);
      DS.upload_mouse_config_timer = setTimeout(upload_mouse_config_delayed, SYNC_TIMEOUT_MS, client, client.device_info != void 0 && client.device_info.revision != void 0 && client.device_info.revision.substr(0, 2) == "G-" ? 1 : 0, value);
    }
  }
  function send_event_set_rf_channel(client, value) {
    var payload = PacketBuilder.begin(3).uint8(0).uint8(HID_ACTION_SET_RF_CHANNEL).uint8(value);
    send_event(client, crc_process(client, payload.build()));
    client.device_info.rfChannel = value;
  }
  function send_event_set_auto_hop(client, value) {
    var payload = PacketBuilder.begin(3).uint8(0).uint8(HID_ACTION_SET_AUTO_HOP).uint8(value ? 1 : 0);
    send_event(client, crc_process(client, payload.build()));
    client.device_info.hopChannel = value;
  }
  function send_event_mouse_param(client) {
    var value = client.device_info;
    var payload = PacketBuilder.begin(3).uint8(0).uint8(HID_ACTION_MOUSE_PARAM);
    var isXyLinked = (value.resolution & CPI_XY_MASK) == 0;
    if (isXyLinked) {
      payload.uint8(value.resolution & 255).uint8(value.resolution >> 8 & 255);
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
      payload.uint8(item5 & 7);
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
    clearTimeout(DS.upload_mouse_config_timer);
    DS.upload_mouse_config_timer = setTimeout(upload_mouse_config_delayed, SYNC_TIMEOUT_MS, client, client.device_info != void 0 && client.device_info.revision != void 0 && client.device_info.revision.substr(0, 2) == "G-" ? 1 : 0, value.sleepTime);
  }
  function send_event_mouse_key(client, arr, actionType, keyCode, macroKey, mouseFlag) {
    var payload = PacketBuilder.begin(3).uint8(0).uint8(HID_ACTION_MOUSE_KEY);
    payload.uint8(arr.length);
    arr.forEach(function(item) {
      payload.uint8(item);
    });
    payload.uint8(actionType).uint8(macroKey).uint8(mouseFlag).uint8(keyCode).uint8(0);
    send_event(client, crc_process(client, payload.build()));
  }
  function send_event_mouse_function(client, arr, actionType, functionCode, value, len) {
    var payload = PacketBuilder.begin(3).uint8(0).uint8(HID_ACTION_MOUSE_FUNCTION);
    payload.uint8(arr.length);
    arr.forEach(function(item) {
      payload.uint8(item);
    });
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
      var payload = PacketBuilder.begin(3).uint8(0);
      payload.uint8(offset == 0 ? HID_ACTION_MACRO_FIRST : HID_ACTION_MACRO_CONT);
      payload.uint8(arr.length);
      arr.forEach(function(item) {
        payload.uint8(item);
      });
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
              value2 -= 255;
            } else {
              offset2 = 4;
              value2 -= KEYCODE_MEDIA_START;
            }
          }
          if (el.mouse_key_loop > 1) {
            payload.uint8(offset2 | 128);
            payload.uint16(el.mouse_key_loop);
          } else {
            payload.uint8(offset2);
          }
          if (offset2 == 2) {
            payload.uint24(value2 >>> 0);
          } else if (offset2 == 6) {
            payload.uint16(value2 >>> 16).uint16(value2 & 65535);
          } else if (offset2 == 3) {
            payload.uint8(value2 + 64);
          } else if (offset2 == 5) {
            payload.uint8(value2 + 64);
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
        value7 |= 128;
      }
      payload.uint8(value7);
      send_event(client, crc_process(client, payload.build()));
      client.esb_alive_timeout += ESB_ALIVE_TIMEOUT_MS;
    }
  }
  function send_event_gaming_only(client, enabled) {
    var payload = PacketBuilder.begin(3).uint8(0).uint8(HID_ACTION_GAMING_ONLY).uint8(enabled ? 1 : 0);
    send_event(client, crc_process(client, payload.build()));
    clearTimeout(DS.upload_mouse_config_timer);
    DS.upload_mouse_config_timer = setTimeout(upload_mouse_config_delayed, SYNC_TIMEOUT_MS, client, enabled ? 1 : 0, client.device_info.sleepTime);
  }
  function send_event_set_brightness(client, value) {
    var payload = PacketBuilder.begin(3).uint8(0).uint8(HID_ACTION_SET_BRIGHTNESS).uint8(value);
    send_event(client, crc_process(client, payload.build()));
    client.device_info.brightness = value;
  }
  function get_key_id_by_name(name, isFuzzy) {
    var payload = [];
    if (isFuzzy != void 0) {
      isFuzzy.split("+").forEach((item) => {
        if (item == KEY_WHEEL_UP) {
          payload.push(KEY_WHEEL_UP_ID);
        } else if (item == KEY_WHEEL_DOWN) {
          payload.push(KEY_WHEEL_DOWN_ID);
        } else {
          get_keys(name).forEach((item2) => {
            if (item == item2.name) {
              item2.id.forEach((item3) => {
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
            i = void 0;
          }
          if (i != void 0) {
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
                offset3 -= 255;
              } else if (offset3 == MOUSE_WHEEL_UP) {
                offset4 = 3;
                offset3 = 64 + item.mouse_mapping_key_data;
              } else if (offset3 == MOUSE_WHEEL_DOWN) {
                offset4 = 3;
                offset3 = 64 - item.mouse_mapping_key_data;
              } else if (offset3 == MOUSE_WHEEL_LEFT) {
                offset4 = 5;
                offset3 = 64 - item.mouse_mapping_key_data;
              } else if (offset3 == MOUSE_WHEEL_RIGHT) {
                offset4 = 5;
                offset3 = 64 + item.mouse_mapping_key_data;
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

  // protocol/hid-parser.js
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
    if (client.device_info.deviceName != void 0) {
      client.connected = true;
      client.helloed = client.device_info.deviceName.length > 0;
      client.device_name = client.device_info.deviceName;
    } else {
      client.recv_buf = new Uint8Array(0);
      client.syncing = true;
      log_r(">>>>>>>>sync start");
    }
    if (client.virtual && client.helloed) {
      client.esb_last_alive_time = (/* @__PURE__ */ new Date()).getTime();
      client.esb_alive_timeout = ESB_ALIVE_TIMEOUT_MS;
    }
    if (!client.virtual && is_receiver(client) && client.helloed) {
      var flag = false;
      usb_client_list.forEach((item) => {
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
    if (client.device_info.revision != void 0) {
      query_firmware(client, client.device_info != void 0 && client.device_info.revision != void 0 && client.device_info.revision.substr(0, 2) == "G-" ? 1 : 0);
    }
    window.postMessage({ "action": ACTION_REFRESH_CLIENT_LIST });
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
      window.postMessage({ "action": ACTION_UI_REFRESH_SETTING });
    } else if (value4 == PARAM_RESOLUTION_32BIT) {
      client.device_info.resolution = bytes[0] | bytes[1] << 8 | bytes[2] << 16 | bytes[3] << 24;
      window.postMessage({ "action": ACTION_UI_REFRESH_SETTING });
    } else if (value4 == PARAM_POLLING_RATE) {
      var pollingRateVal = bytes[0] | bytes[1] << 8;
      if (client.device_info.pollingRate < 0) {
        client.device_info.pollingRate = pollingRateVal;
        window.postMessage({ "action": ACTION_UI_REFRESH_SETTING });
      }
    } else if (value4 == PARAM_POWER_MODE) {
      client.device_info.powerMode = bytes[0];
      window.postMessage({ "action": ACTION_UI_REFRESH_SETTING });
    } else if (value4 == PARAM_KEY_DELAY) {
      client.device_info.keyDelay = [];
      for (var offset = 0; offset < bytes.byteLength; offset++) {
        client.device_info.keyDelay.push(bytes[offset]);
      }
      window.postMessage({ "action": ACTION_UI_REFRESH_SETTING });
    } else if (value4 == PARAM_LOD) {
      client.device_info.lod = bytes[0];
      window.postMessage({ "action": ACTION_UI_REFRESH_SETTING });
    } else if (value4 == PARAM_ESB_DEVICE_INFO) {
      var idx;
      if (byteLen[4 + value2 - 1] == 0) {
        idx = String.fromCharCode.apply(null, byteLen.subarray(7, 4 + value2 - 1));
      } else {
        idx = String.fromCharCode.apply(null, byteLen.subarray(7, 4 + value2));
      }
      client.device_info = reset_device_info_esb(client.device_info);
      client.device_info = parse_device_info(client.device_info, idx);
      window.postMessage({ "action": ACTION_UI_REFRESH_CLIENT_LIST });
      window.postMessage({ "action": ACTION_UI_REFRESH_CURRENT_CLIENT });
    } else if (value4 == PARAM_MOTION_SYNC) {
      client.device_info.motionSync = bytes[0];
      window.postMessage({ "action": ACTION_UI_REFRESH_SETTING });
    } else if (value4 == PARAM_ANGLE_TUNING) {
      client.device_info.angleTuning = bytes[0] << 24 >> 24;
      window.postMessage({ "action": ACTION_UI_REFRESH_SETTING });
    } else if (value4 == PARAM_ANGLE_SNAPPING) {
      client.device_info.angleSnapping = bytes[0];
      window.postMessage({ "action": ACTION_UI_REFRESH_SETTING });
    } else if (value4 == PARAM_RIPPLE_CONTROL) {
      client.device_info.rippleControl = bytes[0];
      window.postMessage({ "action": ACTION_UI_REFRESH_SETTING });
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
            window.postMessage({ "action": ACTION_UI_REFRESH_SETTING });
          }, CHANNEL_SET_DELAY_MS);
        }
      } else if (value5 > scoreVal && value5 > value6) {
        if ((client.device_info.txOutputPower == 0 ? 0 : 1) == 1) {
          setTimeout(() => {
            log_r("set rf channel 40");
            send_event_set_rf_channel(client, 40);
            window.postMessage({ "action": ACTION_UI_REFRESH_SETTING });
          }, CHANNEL_SET_DELAY_MS);
        }
      } else if ((client.device_info.txOutputPower == 0 ? 0 : 1) == 1) {
        setTimeout(() => {
          log_r("set rf channel 80");
          send_event_set_rf_channel(client, 80);
          window.postMessage({ "action": ACTION_UI_REFRESH_SETTING });
        }, CHANNEL_SET_DELAY_MS);
      }
    } else if (value4 == PARAM_KEY_DELAY_ENTRY) {
      if (bytes.byteLength == 1) {
        if (bytes[0] != 255) {
          client.onboard_index = bytes[0];
          log_r("receiver onboard " + client.onboard_index);
          add_key_info(client, client.onboard_index, void 0);
          clearTimeout(DS.mouse_config_timer);
          DS.mouse_config_timer = setTimeout(() => {
            DS.mouse_config_timer = void 0;
            if (client) {
              send_event_action(client, CMD_QUERY_MORE_RESULT, 0);
            }
          }, CONFIG_TIMEOUT_MS);
          client.querying_more_result = false;
          window.postMessage({ "action": "action_onboard_cfg", "usb_client_id": client.id, "msg": "LOADED" });
        }
      } else {
        add_key_info(client, client.onboard_index, bytes);
        clearTimeout(DS.mouse_config_timer);
        DS.mouse_config_timer = setTimeout(() => {
          DS.mouse_config_timer = void 0;
          if (client) {
            send_event_action(client, CMD_QUERY_MORE_RESULT, 0);
          }
        }, CONFIG_TIMEOUT_MS);
        client.querying_more_result = false;
        window.postMessage({ "action": "action_onboard_cfg", "usb_client_id": client.id, "msg": "LOADED" });
      }
    } else if (value4 == PARAM_PEER_INFO) {
      if (bytes.byteLength == 1) {
        if (bytes[0] == 0) {
          client.device_info.peerInfo = [];
        } else {
          window.postMessage({ "action": ACTION_UI_REFRESH_SETTING });
        }
      } else {
        var elemId = bytes[0] | bytes[1] << 8;
        var value7 = sprintf("%02x:%02x:%02x:%02x:%02x:%02x", bytes[2], bytes[3], bytes[4], bytes[5], bytes[6], bytes[7]);
        client.device_info.peerInfo.push({ "id": elemId, "address": value7 });
      }
    } else if (value4 == PARAM_BATTERY_LEVELS) {
      client.device_info.batteryLevels = [];
      for (var offset = 0; offset < bytes.byteLength; offset += 2) {
        client.device_info.batteryLevels.push(bytes[offset] | bytes[offset + 1] << 8);
      }
    } else if (value4 == PARAM_BATTERY_PERCENT) {
      client.device_info.battery = bytes[0];
      client.device_info.charging = bytes[1] == 1;
      window.postMessage({ "action": ACTION_UI_REFRESH_CURRENT_CLIENT });
    } else if (value4 == PARAM_SLEEP_TIME) {
      client.device_info.sleepTime = bytes[0] | bytes[1] << 8;
      window.postMessage({ "action": ACTION_UI_REFRESH_SETTING });
    } else if (value4 == PARAM_RSSI) {
      client.device_info.rssi = new Int8Array(payload)[0];
      window.postMessage({ "action": ACTION_UI_REFRESH_CURRENT_CLIENT_RSSI });
    } else if (value4 == PARAM_LUA_STATUS) {
      client.device_info.luaStatus = bytes[0];
      window.postMessage({ "action": ACTION_UI_REFRESH_SETTING });
    } else if (value4 == PARAM_PARAM_1e) {
    } else if (value4 == PARAM_PARAM_1f) {
    } else if (value4 == PARAM_NOACK) {
      client.device_info.noack = bytes[0];
      window.postMessage({ "action": ACTION_UI_REFRESH_SETTING });
    } else if (value4 == PARAM_COLOR_CODE) {
      for (var offset = 0; offset < bytes.byteLength; offset++) {
        if (bytes[offset] == 0) {
          client.device_info.colorCode = String.fromCharCode.apply(null, bytes.subarray(0, offset));
          window.postMessage({ "action": ACTION_UI_REFRESH_CLIENT_LIST });
          window.postMessage({ "action": ACTION_UI_REFRESH_CURRENT_CLIENT });
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
      window.postMessage({ "action": ACTION_UI_REFRESH_SETTING });
    } else if (value4 == PARAM_ONBOARD_INDEX) {
      if (client.device_info.onboardIndex != bytes[0]) {
        client.device_info.onboardIndex = bytes[0];
        window.postMessage({ "action": ACTION_UI_REFRESH_SETTING });
      }
    } else if (value4 == PARAM_ONBOARD_STATUS) {
      client.device_info.onboardStatus = [];
      for (var offset = 0; offset < bytes.byteLength; offset++) {
        client.device_info.onboardStatus.push(bytes[offset]);
      }
      window.postMessage({ "action": ACTION_UI_REFRESH_SETTING });
    }
  };
  hidHandlers[RESP_PING] = function hid_parse_ping(client, byteLen, value2) {
    log_r("PING <");
    if (!client.connected) {
      if ((/* @__PURE__ */ new Date()).getTime() - client.last_query_time >= ESB_ALIVE_TIMEOUT_MS) {
        if (client.virtual) {
          usb_client_list.forEach((item2) => {
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
        if ((/* @__PURE__ */ new Date()).getTime() - client.last_query_time >= ESB_ALIVE_TIMEOUT_MS) {
          var json = JSON.parse(JSON.stringify(client.device_info.allKeyConfigs))[0];
          if (json == void 0 || json.length == 0) {
            send_event_query(client);
          }
        }
      }
    }
    client.esb_last_alive_time = (/* @__PURE__ */ new Date()).getTime();
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
      window.postMessage({ "action": ACTION_UI_REFRESH_QUAL });
    }
  };
  hidHandlers[RESP_SYNC] = function hid_parse_sync(client, byteLen, value2) {
    const encodedSync = new TextEncoder().encode(SYNC_DATA);
    send_event(client, encodedSync);
  };

  // protocol/parse-cmd-ui.js
  function parse_cmd(client) {
    var i;
    do {
      i = false;
      var byteLen = client.recv_buf;
      var value = byteLen.byteLength;
      if (value >= 4) {
        if (byteLen[0] == 255 && byteLen[1] == 255 && byteLen[2] == 255 && byteLen[3] == 255) {
        } else {
          client.recv_buf = new Uint8Array(0);
          client.syncing = true;
          log_r(">>>>>>>>sync start");
        }
      }
      if (!client.syncing && value >= 6) {
        if ((byteLen[4] & MASK_LOW_NIBBLE) == 3 && byteLen[6] == 32) {
        }
        var value2 = byteLen[4] << 4 & MASK_12BIT | byteLen[5] & MASK_BYTE;
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
  function log_r(msg) {
  }
  var __S = {};
  __S.current_usb_receiver = void 0;
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
  __S.select_key_name = "";
  __S.key_record_panel_id = void 0;
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
  __S.macro_edit_panel_id = void 0;
  __S.macro_record_panel_id = void 0;
  __S.macro_edit_index = -1;
  __S.macro_keep_time_min = 0;
  __S.combination_key_index = 0;
  __S.setting_mapping_key_recording = false;
  __S.setting_mapping_keys_recorded = [-1, -1, -1];
  __S.setting_macro_edit_recording = false;
  __S.setting_macro_edit_recording_time = -1;
  __S.wireless_optimizing = false;
  __S.resize_timer_id = void 0;
  __S.remote_buf_free_size = 0;
  __S.NOTIFY_DATA_BUF_SIZE = 512;
  __S.key_pos = {
    "2329": {
      "m1": [30, 90],
      "m2": [315, 122],
      "m3": [365, 90],
      "m4": [315, 190],
      "m5": [30, 225],
      "m6": [30, 180],
      "m7": [315, 302],
      "wheel-line-container": [315, 68],
      "wheel-down": [80, 32],
      "wheel-up": [325, 32]
    },
    "232c": {
      "m1": [30, 90],
      "m2": [315, 122],
      "m3": [365, 90],
      "m4": [313, 181],
      "m5": [26, 222],
      "m6": [30, 175],
      "m7": [315, 302],
      "wheel-line-container": [315, 68],
      "wheel-down": [80, 32],
      "wheel-up": [325, 32]
    },
    "232d": {
      "m1": [30, 90],
      "m2": [315, 122],
      "m3": [365, 90],
      "m4": [315, 190],
      "m5": [30, 240],
      "m6": [30, 180],
      "m7": [315, 302],
      "wheel-line-container": [315, 68],
      "wheel-down": [80, 32],
      "wheel-up": [325, 32]
    },
    "232f": {
      "m1": [30, 90],
      "m2": [315, 122],
      "m3": [365, 90],
      "m4": [315, 190],
      "m5": [30, 225],
      "m6": [30, 180],
      "m7": [315, 302],
      "wheel-line-container": [315, 68],
      "wheel-down": [80, 32],
      "wheel-up": [325, 32]
    },
    "2330": {
      "m1": [30, 90],
      "m2": [315, 122],
      "m3": [365, 90],
      "m4": [315, 190],
      "m5": [30, 225],
      "m6": [30, 180],
      "m7": [315, 302],
      "wheel-line-container": [315, 68],
      "wheel-down": [80, 32],
      "wheel-up": [325, 32]
    },
    "2331": {
      "m1": [30, 90],
      "m2": [315, 122],
      "m3": [365, 90],
      "m4": [315, 190],
      "m5": [30, 225],
      "m6": [30, 180],
      "m7": [315, 302],
      "wheel-line-container": [315, 68],
      "wheel-down": [80, 32],
      "wheel-up": [325, 32]
    },
    "232e": {
      "m1": [30, 90],
      "m2": [315, 122],
      "m3": [365, 90],
      "m4": [313, 180],
      "m5": [26, 234],
      "m6": [30, 184],
      "m7": [315, 302],
      "wheel-line-container": [315, 68],
      "wheel-down": [80, 32],
      "wheel-up": [325, 32]
    },
    "2332": {
      "m1": [30, 90],
      "m2": [315, 122],
      "m3": [365, 90],
      "m4": [313, 180],
      "m5": [26, 234],
      "m6": [30, 184],
      "m7": [315, 302],
      "wheel-line-container": [315, 68],
      "wheel-down": [80, 32],
      "wheel-up": [325, 32]
    },
    "2333": {
      "m1": [30, 90],
      "m2": [315, 122],
      "m3": [365, 90],
      "m4": [313, 180],
      "m5": [26, 230],
      "m6": [30, 184],
      "m7": [315, 302],
      "wheel-line-container": [313, 68],
      "wheel-down": [80, 32],
      "wheel-up": [325, 32]
    },
    "2334": {
      "m1": [30, 90],
      "m2": [315, 122],
      "m3": [365, 90],
      "m4": [313, 180],
      "m5": [26, 230],
      "m6": [30, 184],
      "m7": [315, 302],
      "wheel-line-container": [313, 68],
      "wheel-down": [80, 32],
      "wheel-up": [325, 32]
    },
    "2337": {
      "m1": [30, 90],
      "m2": [315, 122],
      "m3": [365, 90],
      "m4": [313, 180],
      "m5": [26, 230],
      "m6": [30, 184],
      "m7": [315, 302],
      "wheel-line-container": [313, 68],
      "wheel-down": [80, 32],
      "wheel-up": [325, 32]
    },
    "2338": {
      "m1": [25, 90],
      "m2": [310, 122],
      "m3": [360, 90],
      "m4": [313, 180],
      "m5": [34, 230],
      "m6": [36, 184],
      "m7": [315, 302],
      "wheel-line-container": [310, 68],
      "wheel-down": [80, 32],
      "wheel-up": [325, 32]
    },
    "2339": {
      "m1": [25, 90],
      "m2": [310, 122],
      "m3": [360, 90],
      "m4": [313, 180],
      "m5": [34, 230],
      "m6": [36, 184],
      "m7": [315, 302],
      "wheel-line-container": [310, 68],
      "wheel-down": [80, 32],
      "wheel-up": [325, 32]
    },
    "233a": {
      "m1": [25, 90],
      "m2": [312, 118],
      "m3": [360, 90],
      "m4": [313, 173],
      "m5": [34, 230],
      "m6": [36, 184],
      "m7": [315, 302],
      "wheel-line-container": [312, 68],
      "wheel-down": [80, 32],
      "wheel-up": [325, 32]
    },
    "233e": {
      "m1": [30, 90],
      "m2": [315, 122],
      "m3": [365, 90],
      "m4": [313, 180],
      "m5": [26, 234],
      "m6": [30, 184],
      "m7": [315, 302],
      "wheel-line-container": [315, 68],
      "wheel-down": [80, 32],
      "wheel-up": [325, 32]
    },
    "233f": {
      "m1": [25, 90],
      "m2": [310, 122],
      "m3": [360, 90],
      "m4": [313, 180],
      "m5": [34, 230],
      "m6": [36, 184],
      "m7": [315, 302],
      "wheel-line-container": [310, 68],
      "wheel-down": [80, 32],
      "wheel-up": [325, 32]
    },
    "2340": {
      "m1": [30, 90],
      "m2": [315, 122],
      "m3": [365, 90],
      "m4": [315, 190],
      "m5": [30, 240],
      "m6": [30, 180],
      "m7": [315, 302],
      "wheel-line-container": [315, 68],
      "wheel-down": [80, 32],
      "wheel-up": [325, 32]
    },
    "2343": {
      "m1": [25, 90],
      "m2": [312, 118],
      "m3": [360, 90],
      "m4": [313, 173],
      "m5": [34, 230],
      "m6": [36, 184],
      "m7": [315, 302],
      "wheel-line-container": [312, 68],
      "wheel-down": [80, 32],
      "wheel-up": [325, 32]
    },
    "2344": {
      "m1": [25, 90],
      "m2": [312, 118],
      "m3": [360, 90],
      "m4": [313, 173],
      "m5": [34, 230],
      "m6": [36, 184],
      "m7": [315, 302],
      "wheel-line-container": [312, 68],
      "wheel-down": [80, 32],
      "wheel-up": [325, 32]
    },
    "2349": {
      "m1": [30, 90],
      "m2": [315, 122],
      "m3": [365, 90],
      "m4": [313, 180],
      "m5": [26, 230],
      "m6": [30, 184],
      "m7": [315, 302],
      "wheel-line-container": [313, 68],
      "wheel-down": [80, 32],
      "wheel-up": [325, 32]
    },
    "234a": {
      "m1": [30, 90],
      "m2": [312, 122],
      "m3": [365, 90],
      "m4": [313, 180],
      "m5": [28, 230],
      "m6": [34, 184],
      "m7": [315, 302],
      "wheel-line-container": [312, 68],
      "wheel-down": [80, 32],
      "wheel-up": [325, 32]
    },
    "2352": {
      "m1": [30, 90],
      "m2": [315, 122],
      "m3": [365, 90],
      "m4": [313, 180],
      "m5": [26, 230],
      "m6": [30, 184],
      "m7": [315, 302],
      "wheel-line-container": [313, 68],
      "wheel-down": [80, 32],
      "wheel-up": [325, 32]
    }
  };
  __S.NUMBERS = [" \xE2\u201C\xBF", " \xE2\u017E\u20AC", " \xE2\u017E\x81", " \xE2\u017E\u201A", " \xE2\u017E\u0192"];
  __S.need_save = false;
  __S.window_focused = true;
  var theme_color = document.getElementById("current-usb-client-firmware-new").style.color;
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
  __S.kbd_select_elementId = "";
  __S.kbd_socd_infos = [];
  __S.kbd_mt_infos = [];
  __S.kbd_rs_infos = [];
  __S.kbd_dks_infos = [];
  __S.kbd_dks_dragging_name = "";
  __S.kbd_dks_dragging = false;
  __S.kbd_dks_dragging_up = false;
  __S.kbd_dks_Start_x = 0;
  __S.kbd_matrix_select_keys = [];
  __S.select_key_panel_id = void 0;
  __S.kbd_key_num = 0;
  __S.kbd_keys = [];
  __S.kbd_macro_infos = [];
  __S.kbd_macro_select_index = -1;
  function request_device_cfg() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        try {
          __S.device_cfg = JSON.parse(this.responseText);
          reset_device_cfg(__S.device_cfg);
          if (current_usb_client != void 0) {
            layui.table.reloadData("key-shortcuts", {
              "data": get_shortcuts(current_usb_client)
            });
          }
        } catch (err) {
          log_r(err);
        }
        if (navigator.hid != void 0) {
          window.postMessage({ "action": ACTION_REFRESH_CLIENT_LIST });
          window.postMessage({ "action": ACTION_UI_REFRESH_CURRENT_CLIENT });
        }
      }
    };
    var offset = 0;
    var layui2 = layui.data("lang").name;
    if (layui2 == "zh_CN") {
      offset = LANG_ZH_CN;
    } else if (layui2 == "en_US") {
      offset = LANG_EN_US;
    } else if (layui2 == "zh_TW") {
      offset = LANG_ZH_TW;
    } else if (layui2 == "ko_KR") {
      offset = LANG_KO_KR;
    } else if (layui2 == "ja_JP") {
      offset = LANG_JA_JP;
    } else if (layui2 == "uk_UA") {
      offset = LANG_UK_UA;
    } else if (layui2 == "tr_TR") {
      offset = LANG_TR_TR;
    }
    xhr.open("GET", "https://www.miracletek.net/game/device.php" + basic_info(0) + "&lang=" + offset, true);
    xhr.send();
  }
  function apply_theme() {
    var layui2 = layui.data("theme").style;
    if (layui2 == "undefined" || layui2 == "" || layui2 == null || layui2 == "dark") {
      document.getElementById("layui_theme_css").setAttribute("href", "https://hub.miracletek.net/hub/layui/css/layui-theme-dark.css");
      $("[class=layui-setting-section-light]").each(function() {
        $(this)[0].className = "layui-setting-section";
      });
      $("[class=layui-setting-light-define-section-light]").each(function() {
        $(this)[0].className = "layui-setting-light-define-section";
      });
      $("[class=layui-setting-light-define-section-arrow-light]").each(function() {
        $(this)[0].className = "layui-setting-light-define-section-arrow";
      });
      $("[class=layui-current-name-light]").each(function() {
        $(this)[0].className = "layui-current-name";
      });
      $("[class*=layui-outline-light]").each(function() {
        $(this)[0].className = $(this)[0].className.replace("layui-outline-light", "layui-outline");
      });
      $("[class*=footer-light]").each(function() {
        $(this)[0].className = $(this)[0].className.replace("footer-light", "footer");
      });
      document.getElementById("logo").src = "https://hub.miracletek.net/hub/img/rawm_hub.png?v=202412080015";
    } else {
      document.getElementById("layui_theme_css").removeAttribute("href");
      $("[class=layui-setting-section]").each(function() {
        $(this)[0].className = "layui-setting-section-light";
      });
      $("[class=layui-setting-light-define-section]").each(function() {
        $(this)[0].className = "layui-setting-light-define-section-light";
      });
      $("[class=layui-setting-light-define-section-arrow]").each(function() {
        $(this)[0].className = "layui-setting-light-define-section-arrow-light";
      });
      $("[class=layui-current-name]").each(function() {
        $(this)[0].className = "layui-current-name-light";
      });
      $("[class*=layui-outline]").each(function() {
        $(this)[0].className = $(this)[0].className.replace("layui-outline", "layui-outline-light");
      });
      $("[class*=footer]").each(function() {
        $(this)[0].className = $(this)[0].className.replace("footer", "footer-light");
      });
      document.getElementById("logo").src = "https://hub.miracletek.net/hub/img/rawm_hub_light.png?v=202412080015";
    }
  }
  function is_dark_theme() {
    var layui2 = layui.data("theme").style;
    return !!(layui2 == "undefined" || layui2 == "" || layui2 == null || layui2 == "dark");
  }
  var S = {};
  Object.keys(__S).forEach(function(name) {
    Object.defineProperty(S, name, {
      get() {
        return __S[name];
      },
      set(v) {
        __S[name] = v;
      },
      configurable: true
    });
  });

  // protocol/hid-transport.js
  var timeoutID = {};
  function post_send_client_data(item) {
    if (typeof timeoutID[item.id] === "number") {
      clearTimeout(timeoutID[item.id]);
    }
    timeoutID[item.id] = setTimeout((clientId) => {
      window.postMessage({
        "action": ACTION_SEND_CLIENT_DATA,
        "usb_client_id": clientId
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
  function crc16_compute(data, len) {
    var value = 65535;
    for (var i = 0; i < len; i++) {
      value = value >> 8 & 255 | value << 8;
      value ^= data[i];
      value ^= (value & 255) >> 4;
      value ^= value << 8 << 4;
      value ^= (value & 255) << 4 << 1;
    }
    return value;
  }
  function crc_process(client, data) {
    var bytes = new Uint8Array(data);
    var value = bytes.byteLength;
    bytes[0] = (value >> 4 & 240 | bytes[0]) & 255;
    bytes[1] = value & 255 & 255;
    if (client.device_info != void 0 && client.device_info.crcSupported) {
      var value2 = value + 5;
      var crc = crc16_compute(bytes, value);
      var bytes2 = new Uint8Array(value2);
      bytes2[0] = (value2 >> 4 & 240 | 3) & 255;
      bytes2[1] = value2 & 255 & 255;
      bytes2[2] = 36;
      bytes2[3] = crc & 255;
      bytes2[4] = crc >> 8 & 255;
      bytes2.set(bytes, 5);
      return bytes2;
    }
    return bytes;
  }
  function read_event(client, size) {
    var bytes = new Uint8Array(size);
    if (client.pause) {
      bytes[0] = 0;
    } else {
      var value = client.send_event_buf.byteLength;
      if (value <= size - 1) {
        bytes[0] = 128 | value & 255;
        bytes.set(client.send_event_buf, 1);
        client.send_event_buf = new Uint8Array(0);
      } else {
        bytes[0] = 128 | size - 1 & 255;
        bytes.set(client.send_event_buf.subarray(0, size - 1), 1);
        client.send_event_buf = client.send_event_buf.subarray(size - 1);
      }
    }
    return bytes;
  }
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
        if (value == 255) {
          bytes = read_event(client, HID_REPORT_SIZE);
          i = bytes[0] & HID_LENGTH_MASK;
        } else {
          bytes = read_event(client, 63);
          i = bytes[0] & HID_LENGTH_MASK;
          var payload = Array.from(bytes);
          payload.unshift(192 | value);
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
            usb_client_list.forEach((item) => {
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
          usb_client_list.forEach((item2) => {
            if (is_receiver(item2) && item2.device == client.device) {
              flag = is_limit_memory(item2);
            }
          });
          if (flag) {
            var bytes = new Uint8Array(1);
            var value = client.product_esb_ch;
            bytes[0] = 64;
            var payload = Array.from(bytes);
            payload.unshift(192 | value);
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
        if (value == 255) {
          bytes = hs_read_event(client, HS_FRAME_SIZE);
          i = bytes.length;
        } else {
          bytes = read_event(client, 63);
          i = bytes[0] & HID_LENGTH_MASK;
          var payload = Array.from(bytes);
          payload.unshift(192 | value);
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
            usb_client_list.forEach((item) => {
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
          usb_client_list.forEach((item2) => {
            if (is_receiver(item2) && item2.device == client.device) {
              flag = is_limit_memory(item2);
            }
          });
          if (flag) {
            var bytes = new Uint8Array(1);
            var value = client.product_esb_ch;
            bytes[0] = 64;
            var payload = Array.from(bytes);
            payload.unshift(192 | value);
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
  function hs_recv(client, data) {
    if (client.eplapsed_syncing_ms != 0 && (/* @__PURE__ */ new Date()).getTime() - client.eplapsed_syncing_ms > SYNC_TIMEOUT_MS) {
      if (client.syncing) {
        log_r(">>>>>>>>sync success");
        client.syncing = false;
      }
      client.recv_buf = new Uint8Array(0);
    }
    client.eplapsed_syncing_ms = (/* @__PURE__ */ new Date()).getTime();
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
    usb_client_list.forEach((item) => {
      if (item.device == device && !item.virtual) {
        var bytes = new Uint8Array(data.buffer);
        hs_recv(item, bytes);
      }
    });
  }
  function skip_recv_buf(data, len) {
    var bytes = new Uint8Array(data.byteLength - len);
    bytes.set(data.subarray(len));
    return bytes;
  }
  function recv(client, data) {
    if (client.eplapsed_syncing_ms != 0 && (/* @__PURE__ */ new Date()).getTime() - client.eplapsed_syncing_ms > SYNC_TIMEOUT_MS) {
      if (client.syncing) {
        log_r(">>>>>>>>sync success");
        client.syncing = false;
      }
      client.recv_buf = new Uint8Array(0);
    }
    client.eplapsed_syncing_ms = (/* @__PURE__ */ new Date()).getTime();
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
    if (data && data.byteLength > 0) {
    }
    if (is_hs_keyboard(device)) {
      hs_device_receive_data({
        "device": device,
        "reportId": reportId,
        "data": data
      });
      return;
    }
    usb_client_list.forEach((item) => {
      if (item.device == device && !item.virtual) {
        var bytes = new Uint8Array(data.buffer);
        var value = 255;
        if ((bytes[0] & MASK_TOP_2BITS) == 192) {
          value = bytes[0] & HID_LENGTH_MASK;
          bytes = bytes.subarray(1);
        }
        var offset = bytes[0] & HID_LENGTH_MASK;
        if (value == 255) {
          if ((bytes[0] & MASK_TOP_2BITS) == 64) {
          } else {
            bytes = bytes.subarray(1, 1 + offset);
            recv(item, bytes);
          }
        } else {
          usb_client_list.forEach((client) => {
            if (client.device == device && client.virtual && client.product_esb_ch == value) {
              if ((bytes[0] & MASK_TOP_2BITS) == 64) {
                var value2 = bytes[1] | bytes[2] << 8 | bytes[3] << 16 | bytes[4] << 24;
                var value3 = bytes[15] | bytes[16] << 8 | bytes[17] << 16 | bytes[18] << 24;
                if ((bytes[0] & HID_LENGTH_MASK) < 18) {
                  value3 = S.NOTIFY_DATA_BUF_SIZE;
                }
                if (value3 > 0) {
                  if (value2 > value3 / 2) {
                    S.remote_buf_free_size = value2;
                  }
                } else {
                  S.remote_buf_free_size = value2;
                }
                if (S.remote_buf_free_size >= 240) {
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

  // state/device-store.js
  var ACTION_REFRESH_CLIENT_LIST = "action_refresh_client_list";
  var ACTION_UI_REFRESH_CLIENT_LIST = "action_ui_refresh_client_list";
  var ACTION_REFRESH_CURRENT_CLIENT = "action_refresh_current_client";
  var ACTION_UI_REFRESH_CURRENT_CLIENT = "action_ui_refresh_current_client";
  var ACTION_UI_REFRESH_CURRENT_CLIENT_RSSI = "action_ui_refresh_current_client_rssi";
  var ACTION_UI_REFRESH_SETTING = "action_ui_refresh_setting";
  var ACTION_UI_REFRESH_QUAL = "action_ui_refresh_qual";
  var ACTION_SEND_CLIENT_DATA = "action_send_client_data";
  var ACTION_UI_REFRESH_KBD_KEY = "action_ui_refresh_kbd_key";
  var ACTION_UI_REFRESH_KBD_AXIS = "action_ui_refresh_kbd_axis";
  var ACTION_UI_REFRESH_KBD_LIGHT = "action_ui_refresh_kbd_light";
  var ACTION_UI_REFRESH_KBD_MACRO = "action_ui_refresh_kbd_macro";
  var RESOURCE_URL = "https://hub.miracletek.net/hub/";
  var __DS = {};
  __DS.upload_mouse_config_timer = void 0;
  __DS.mouse_config_timer = void 0;
  function basic_info(productId) {
    return "?os=4&v=" + API_VERSION + "&c=" + productId + "&a=pc-rawmhub.game&ta=pc-rawmhub.game&mac=" + (layui.device("os").os.toLowerCase() == "mac" ? 1 : 0);
  }
  var _deviceClients = [];
  var usb_client_list = _deviceClients;
  var current_usb_client = null;
  var DeviceStore = {
    get clients() {
      return _deviceClients;
    },
    set clients(v) {
      _deviceClients = v;
      usb_client_list = v;
    },
    currentId: null,
    get current() {
      if (this.currentId == null) return null;
      return _deviceClients.find((c) => c.id === this.currentId) || null;
    },
    getClient(id) {
      return _deviceClients.find((c) => c.id === id) || null;
    },
    getDeviceInfo(client) {
      return client ? client.device_info : null;
    },
    addClient(hidDevice, value, virtual) {
      var client = create_usb_client(hidDevice, value, virtual);
      _deviceClients.push(client);
      this._emit("client:added", client);
      return client;
    },
    removeClient(id) {
      var idx = _deviceClients.findIndex((c) => c.id === id);
      if (idx >= 0) {
        var client = _deviceClients[idx];
        _deviceClients.splice(idx, 1);
        if (this.currentId === id) {
          this.currentId = null;
          current_usb_client = null;
        }
        this._emit("client:removed", client);
      }
    },
    selectClient(id) {
      var client = this.getClient(id);
      if (client) {
        this.currentId = id;
        current_usb_client = client;
        this._emit("current:changed", client);
      }
    },
    updateDeviceInfo(id, patch) {
      var client = this.getClient(id);
      if (client) {
        Object.assign(client.device_info, patch);
        this._emit("device:updated", client);
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
      macroBuff: []
    },
    // Keyboard data accessors (thin reads into client.device_info)
    getKeyInfos(client) {
      return client.device_info.kbd_key_infos;
    },
    getLightInfo(client) {
      return client.device_info.kbd_light_info;
    },
    getAxisInfos(client) {
      return client.device_info.kbd_axis_infos;
    },
    getAxisMode(client) {
      return client.device_info.kbd_axis_mode;
    },
    getSocdInfos(client) {
      return client.device_info.kbd_socd_infos;
    },
    getMtInfos(client) {
      return client.device_info.kbd_mt_infos;
    },
    getRsInfos(client) {
      return client.device_info.kbd_rs_infos;
    },
    getDksInfos(client) {
      return client.device_info.kbd_dks_infos;
    },
    getMacroInfos(client) {
      return client.device_info.kbd_macro_infos;
    },
    getMacroNum(client) {
      return client.device_info.kbd_macro_num;
    },
    getMacroMaxSize(client) {
      return client.device_info.kbd_macro_max_size;
    },
    getOnboardNum(client) {
      return client.device_info.kbd_onboardNum;
    },
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
        list.slice().forEach((fn) => fn(data));
      }
    }
  };
  function create_device_info() {
    var info = {};
    return reset_device_info(info);
  }
  function reset_device_cfg(arr) {
    arr.forEach((item) => {
      if (item.light_colors == void 0) {
        item.light_colors = [];
        item.light_colors.push("red");
        item.light_colors.push("green");
        item.light_colors.push("blue");
      }
      if (item.polling_rate_max == void 0) {
        item.polling_rate_max = POLLING_RATE_MAX_HZ;
      }
      if (item.angle_tuning == void 0) {
        item.angle_tuning = true;
      }
      if (item.lod == void 0) {
        item.lod = [];
        item.lod.push(1);
        item.lod.push(2);
      }
      if (item.glass_mode == void 0) {
        item.glass_mode = false;
      }
      if (item.oms == void 0) {
        item.oms = [];
      }
      if (item.hub == void 0) {
        item.hub = false;
      }
      if (item.rf_chn == void 0) {
        item.rf_chn = 255;
      }
      if (item.limit_memory == void 0) {
        item.limit_memory = false;
      }
      if (item.slow == void 0) {
        item.slow = true;
      }
    });
  }
  function reset_device_info(device) {
    device.revision = "";
    device.revisionCode = 0;
    device.hardwareCode = 0;
    device.battery = BATTERY_FULL_PERCENT;
    device.configNum = -1;
    device.resolution = RESOLUTION_DEFAULT;
    device.pollingRate = -1;
    device.light = 48;
    device.cpiLevels = [400, 800, 1600, 3200, 0, 0, 0, 0];
    device.cpiLevelColors = [1, 2, 6, 4, 0, 0, 0, 0];
    device.assist = [];
    device.macAddress = "";
    device.onboard = 0;
    device.powerMode = POWER_MODE_DEFAULT;
    device.esbAddress = "";
    device.esbChannel = 255;
    device.deviceName = "";
    device.productId = 65535;
    device.vendorId = 0;
    device.lod = 1;
    device.lodCalib = 0;
    device.keyDelay = [KEY_DELAY_DEFAULT, KEY_DELAY_DEFAULT, KEY_DELAY_DEFAULT, KEY_DELAY_DEFAULT, KEY_DELAY_DEFAULT, KEY_DELAY_DEFAULT, KEY_DELAY_DEFAULT];
    device.motionSync = 1;
    device.angleTuning = 0;
    device.angleSnapping = 0;
    device.rippleControl = 0;
    device.charging = 0;
    device.txOutputPower = 255;
    device.autoTxPower = 1;
    device.sleepTime = SLEEP_DEFAULT_SEC;
    device.allKeyConfigs = [];
    device.peerInfo = [];
    device.batteryLevels = [4100, 4e3, 3950, 3900, 3850, 3800, 3750, 3700, 3500, 3300, 3100];
    device.colorCode = "";
    device["lzSupported;"] = false;
    device.rfChannel = 2;
    device.rssi = 0;
    device.crcSupported = false;
    device.luaStatus = 255;
    device.noack = 0;
    device.glassMode = 0;
    device.glassModeEnabled = 0;
    device.onboardConfigNum = 1;
    device.onboardIndex = 0;
    device.onboardStatus = [129, 130, 134, 132];
    device.firmwareInfo = {};
    device.squal = 0;
    device.equal = 255;
    device.txOutputPowerApplied = 255;
    device.enhancedCpi = false;
    device.dynamicGOM = false;
    device.wired = false;
    device.sensor = "";
    device.brightness = BRIGHTNESS_DEFAULT;
    device.hopChannelSupported = false;
    device.hopChannel = true;
    device.slow = true;
    device.kbd_onboardNum = KBD_DEFAULT_ONBOARD_NUM;
    device.kbd_key_infos = [];
    device.kbd_socd_num = 0;
    device.kbd_socd_infos = [];
    device.kbd_mt_num = 0;
    device.kbd_mt_infos = [];
    device.kbd_rs_num = 0;
    device.kbd_rs_infos = [];
    device.kbd_dks_num = 0;
    device.kbd_dks_infos = [];
    device.kbd_light_info = {};
    device.kbd_axis_mode = 0;
    device.kbd_axis_infos = [];
    device.kbd_macro_num = 0;
    device.kbd_macro_max_size = 0;
    device.kbd_macro_infos = [];
    return device;
  }
  function reset_device_info_esb(client) {
    client.esbAddressArr = [];
    client.esbSelected = -1;
    return client;
  }
  function create_usb_client(hidDevice, value, virtual) {
    var client = {
      device: hidDevice,
      product_esb_ch: value,
      recv_buf: new Uint8Array(0),
      send_event_buf: new Uint8Array(0),
      helloed: false,
      connected: false,
      device_name: "",
      virtual,
      device_info: create_device_info(),
      esb_last_alive_time: (/* @__PURE__ */ new Date()).getTime(),
      esb_alive_timeout: ESB_ALIVE_TIMEOUT_MS,
      pause: false,
      syncing: false,
      id: crypto.randomUUID(),
      allow_send: true,
      eplapsed_syncing_ms: 0,
      last_query_time: 0,
      onboard_index: 0,
      querying_more_result: false
    };
    return client;
  }
  function is_supported(productId) {
    var flag = false;
    S.device_cfg.forEach((item) => {
      if (item.product_id == productId.toString(16)) {
        flag = true;
      }
    });
    return flag;
  }
  function get_cfg(client) {
    var revision = void 0;
    if (client.virtual) {
      S.device_cfg.forEach((item) => {
        if (item.name == client.device_name) {
          revision = item;
        }
      });
    } else {
      S.device_cfg.forEach((item2) => {
        if (item2.product_id == client.device.productId.toString(16)) {
          revision = item2;
        }
      });
    }
    return revision;
  }
  function is_receiver(device) {
    var value = get_cfg(device);
    return value != void 0 ? value.receiver : false;
  }
  function is_slow_receiver(client) {
    if (!client.device_info.slow) {
      return client.device_info.slow;
    } else {
      var value = get_cfg(client);
      return value != void 0 ? value.slow : true;
    }
  }
  function is_hub(device) {
    var value = get_cfg(device);
    return value != void 0 ? value.hub : false;
  }
  function is_keyboard_device(device) {
    var value = get_cfg(device);
    return value != void 0 ? value.keyboard : false;
  }
  function get_display_name(client) {
    var value = get_cfg(client);
    return value != void 0 ? value.display_name : client.device_name;
  }
  function get_display_name_model(client) {
    var value = get_cfg(client);
    return value != void 0 && value.display_name_model != void 0 ? value.display_name_model : "";
  }
  function get_product_id_hex_str(client) {
    var str = "";
    if (client.virtual) {
      S.device_cfg.forEach((item) => {
        if (item.name == client.device_name) {
          str = item.product_id;
        }
      });
    } else {
      str = client.device.productId.toString(16);
    }
    return str;
  }
  function is_battery_percent_supported(client) {
    var value = get_cfg(client);
    if (value != void 0) {
      var flag = false;
      value.battery_levels.forEach((item) => {
        if (item != 0) {
          flag = true;
        }
      });
      return flag;
    } else {
      return false;
    }
  }
  function get_esb_addr(esbAddr, index) {
    if (index == 255 || esbAddr.esbAddress.length == 0) {
      return esbAddr.esbAddress;
    } else {
      var i;
      var idx;
      i = esbAddr.esbAddress.substr(16, 2);
      if (index == 0) {
        idx = esbAddr.esbAddress.substr(0, 8);
      } else {
        idx = esbAddr.esbAddress.substr(8, 8);
      }
      return i + idx;
    }
  }
  function is_esb_addr_arr_existed(esbAddr, addr, length) {
    var flag = false;
    if (esbAddr.esbAddressArr != void 0) {
      var i;
      var idx;
      esbAddr.esbAddressArr.forEach((item) => {
        i = item.substr(16, 2);
        if (addr == 0) {
          idx = item.substr(0, 8);
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
    if (index == 255 || esbAddr.esbAddressArr == void 0 || esbAddr.esbAddressArr.length == 0 || esbAddr.esbSelected < 0 || esbAddr.esbSelected >= esbAddr.esbAddressArr.length) {
      return "";
    } else {
      var i;
      var idx;
      var i2;
      i = esbAddr.esbAddressArr[esbAddr.esbSelected];
      idx = i.substr(16, 2);
      if (index == 0) {
        i2 = i.substr(0, 8);
      } else {
        i2 = i.substr(8, 8);
      }
      return idx + i2;
    }
  }
  function get_usb_client(device) {
    var isGamingOnly = void 0;
    usb_client_list.forEach((item) => {
      if (item.id == device) {
        isGamingOnly = item;
      }
    });
    return isGamingOnly;
  }
  function get_color_codes(client) {
    var value = get_cfg(client);
    return value != void 0 ? value.models : [];
  }
  function get_color_code(client) {
    var value = client.device_info.colorCode;
    if (value == void 0 || value == "") {
      value = "";
    } else {
      var flag = false;
      get_color_codes(client).forEach((item) => {
        if (item == value) {
          flag = true;
        }
      });
      if (!flag) {
        value = "";
      }
    }
    return value;
  }
  function get_cpi_range(client) {
    var value = get_cfg(client);
    return value != void 0 ? value.cpi_range : [];
  }
  function get_cpi_step(client) {
    var value = get_cfg(client);
    return value != void 0 ? client.device_info.enhancedCpi ? CPI_STEP_DEFAULT : value.cpi_step : 1;
  }
  function set_cpi(client, value, isXyLinked = true) {
    var cpiRange = get_cpi_range(client);
    var value2 = value & CPI_LOW_MASK;
    var value3 = value >> 16 & CPI_LOW_MASK;
    if (value2 < cpiRange[0]) {
      value2 = cpiRange[0];
    } else if (value2 > cpiRange[1]) {
      value2 = cpiRange[1];
    }
    if (value3 != 0) {
      if (value3 < cpiRange[0]) {
        value3 = cpiRange[0];
      } else if (value3 > cpiRange[1]) {
        value3 = cpiRange[1];
      }
    }
    value = value2 | value3 << 16;
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
    return value != void 0 ? value.cpi_xy : false;
  }
  function is_oms(client, value) {
    var value = get_cfg(client);
    return value != void 0 ? value >= 0 ? value.oms.indexOf(value) >= 0 : value.oms.length > 0 : false;
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
    client.device_info.cpiLevels.splice(index, 1);
    client.device_info.cpiLevels.push(0);
    client.device_info.cpiLevelColors.splice(index, 1);
    client.device_info.cpiLevelColors.push(0);
    send_event_mouse_param(client);
  }
  function add_cpi_level(client, value, index) {
    for (let len = 0; len < client.device_info.cpiLevels.length; len++) {
      if (client.device_info.cpiLevels[len] == 0) {
        client.device_info.cpiLevels[len] = value;
        client.device_info.cpiLevelColors[len] = index;
        send_event_mouse_param(client);
        break;
      }
    }
  }
  function get_polling_rates(client, arr) {
    var value = get_cfg(client);
    if (value != void 0) {
      var payload = value.polling_rates.slice();
      arr.forEach((item) => {
        if (item.connected != void 0 ? item.connected : false) {
          if (is_receiver(item)) {
            if (client.device == item.device) {
              var value2 = get_cfg(item);
              if (value2 != void 0 && value2.boost_polling_rates != void 0) {
                value2.boost_polling_rates.forEach((item2) => {
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
      for (var len = 125; len <= value3; len *= 2) {
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
    if (!client.virtual && !is_keyboard_device(client)) {
      i = POLLING_RATE_1000HZ;
      var value = get_cfg(client);
      if (value != void 0) {
        var len = value.polling_rates;
        if (len != void 0 && len.length > 0) {
          i = len[len.length - 1];
        }
      }
    } else {
      i = POLLING_RATE_1000HZ;
      arr.forEach((item) => {
        if (item.connected != void 0 ? item.connected : false) {
          if (is_receiver(item)) {
            if (client.device == item.device) {
              var value2 = get_cfg(item);
              if (value2 != void 0 && value2.boost_polling_rates != void 0) {
                value2.boost_polling_rates.forEach((item2) => {
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
    return value != void 0 ? i < value.polling_rate_max ? i : value.polling_rate_max : i;
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
  function set_polling_rate(client, rate) {
    if (client.device_info.pollingRate != rate) {
      client.device_info.pollingRate = rate;
      send_event_mouse_param(client);
      return true;
    }
    return false;
  }
  function set_light(client, lightData) {
    if (is_receiver(client)) {
      if (client.device_info.light != lightData) {
        client.device_info.light = lightData;
        var payload = [];
        payload.push(3);
        payload.push(0);
        payload.push(18);
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
    return value != void 0 ? value.light : false;
  }
  function get_light_colors(client) {
    var value = get_cfg(client);
    return value != void 0 ? value.light_colors : [];
  }
  function get_light_display_colors(client) {
    var value = get_light_colors(client);
    var payload = [];
    if (value.includes("red") && value.includes("green") && value.includes("blue")) {
      payload.push("white");
    }
    if (value.includes("red")) {
      payload.push("red");
    }
    if (value.includes("green")) {
      payload.push("green");
    }
    if (value.includes("blue")) {
      payload.push("blue");
    }
    if (value.includes("red") && value.includes("green")) {
      payload.push("yellow");
    }
    if (value.includes("red") && value.includes("blue")) {
      payload.push("purple");
    }
    if (value.includes("green") && value.includes("blue")) {
      payload.push("skyblue");
    }
    payload.push("none");
    return payload;
  }
  function get_power_modes(client) {
    var value = get_cfg(client);
    return value != void 0 ? value.power_modes : [];
  }
  function get_power_modes2(client) {
    var value = get_cfg(client);
    return value != void 0 ? value.power_modes2 : [];
  }
  function get_power_mode_tips(client) {
    var value = get_cfg(client);
    return value != void 0 ? value.power_mode_tips : [];
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
    return value != void 0 ? value.lods : [];
  }
  function set_lod(client, lodVal) {
    if (client.device_info.lod != lodVal) {
      client.device_info.lod = lodVal;
      send_event_mouse_param(client);
      return true;
    }
    return false;
  }
  function set_angle_snapping(client, enabled) {
    if (client.device_info.angleSnapping != enabled) {
      client.device_info.angleSnapping = enabled;
      send_event_mouse_param(client);
      return true;
    }
    return false;
  }
  function set_ripple_control(client, enabled) {
    if (client.device_info.rippleControl != enabled) {
      client.device_info.rippleControl = enabled;
      send_event_mouse_param(client);
      return true;
    }
    return false;
  }
  function set_motion_sync(client, enabled) {
    if (client.device_info.motionSync != enabled) {
      client.device_info.motionSync = enabled;
      send_event_mouse_param(client);
      return true;
    }
    return false;
  }
  function set_wireless_turbo(client, enabled) {
    if (enabled == 1) {
      if (client.device_info.txOutputPower != 8) {
        client.device_info.txOutputPower = 8;
        send_event_mouse_param(client);
      }
    } else if (client.device_info.txOutputPower != 0) {
      client.device_info.txOutputPower = 0;
      send_event_mouse_param(client);
    }
  }
  function is_angle_tuning_supported(client) {
    var value = get_cfg(client);
    return value != void 0 ? value.angle_tuning : true;
  }
  function set_angle_tuning(client, enabled) {
    if (client.device_info.angleTuning != enabled) {
      client.device_info.angleTuning = enabled;
      send_event_mouse_param(client);
      return true;
    }
    return false;
  }
  function set_onboard_status(client, index, status) {
    if (client.device_info.onboardStatus[index] != status) {
      client.device_info.onboardStatus[index] = status;
      send_event_mouse_param(client);
      return true;
    }
    return false;
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
    return value != void 0 ? value.enhancement : false;
  }
  function is_glass_mode_supported(client) {
    var value = get_cfg(client);
    return value != void 0 ? value.glass_mode : false;
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
      if (client.device_info.firmwareInfo != void 0 && client.device_info.firmwareInfo.code >= 0) {
        return client.device_info.firmwareInfo.code > client.device_info.revisionCode;
      }
    }
    return false;
  }
  function get_keys(client) {
    var value = get_cfg(client);
    return value != void 0 ? value.keys : [];
  }
  function get_shortcuts(client) {
    var value = get_cfg(client);
    return value != void 0 ? value.shortcuts : [];
  }
  function get_setup_icon(client) {
    var value = get_cfg(client);
    return value != void 0 ? value.setup_icon : "";
  }
  function get_default_rf_channel(client) {
    var value = get_cfg(client);
    return value != void 0 ? value.rf_chn : 255;
  }
  function is_limit_memory(client) {
    var value = get_cfg(client);
    return value != void 0 ? value.limit_memory : false;
  }
  function get_soc(client) {
    var value = get_cfg(client);
    return value != void 0 ? value.soc : "UNKNOWN";
  }
  function is_soc_compatible(client, productId) {
    var value = get_soc(client);
    var value2 = get_soc(productId);
    return value == value2 || value == "NORDIC" && value2 == "NORDIC2" || value == "NORDIC2" && value2 == "NORDIC";
  }
  function is_bt_supported(client) {
    var value = get_cfg(client);
    return value != void 0 ? value.working_modes.includes("bt") : false;
  }
  function is_brightness_supported(client) {
    var value = get_cfg(client);
    return value != void 0 ? value.brightness : false;
  }
  function parse_device_info(value, jsonStr) {
    try {
      var json = JSON.parse(jsonStr);
      if (json.revision != void 0) {
        value.revision = json.revision;
      } else if (json.r != void 0) {
        value.revision = json.r;
      }
      if (json.revision_code != void 0) {
        value.revisionCode = json.revision_code;
      } else if (json.rc != void 0) {
        value.revisionCode = json.rc;
      }
      if (json.hw != void 0) {
        value.hardwareCode = json.hw;
      }
      if (json.battery != void 0) {
        value.battery = json.battery;
      }
      if (json.addr != void 0) {
        value.macAddress = json.addr;
      }
      if (json.config_num != void 0) {
        value.configNum = json.config_num;
      } else if (json.cn != void 0) {
        value.configNum = json.cn;
      }
      if (json.cpi != void 0) {
        value.resolution = json.cpi;
      }
      if (json.polling != void 0) {
        value.pollingRate = json.polling;
      }
      if (json.light != void 0) {
        value.light = json.light;
      }
      if (json.cpi_l != void 0) {
        value.cpiLevels = json.cpi_l;
      }
      if (json.cpi_l_c != void 0) {
        value.cpiLevelColors = json.cpi_l_c;
      }
      if (json.ob != void 0) {
        value.onboard = json.ob;
      }
      if (json.esb_addr != void 0 && !Array.isArray(json.esb_addr)) {
        value.esbAddress = json.esb_addr;
      }
      if (json.esb_addr != void 0 && Array.isArray(json.esb_addr)) {
        value.esbAddressArr = json.esb_addr;
      }
      if (json.esb_selected != void 0) {
        value.esbSelected = json.esb_selected;
      }
      if (json.esb_ch != void 0) {
        value.esbChannel = json.esb_ch;
      }
      if (json.pm != void 0) {
        value.powerMode = json.pm;
      }
      if (json.dn != void 0) {
        value.deviceName = json.dn;
      }
      if (json.pi != void 0) {
        value.productId = json.pi;
      }
      if (json.vi != void 0) {
        value.vendorId = json.vi;
      }
      if (json.lod != void 0) {
        value.lod = json.lod;
      }
      if (json.lod_c != void 0) {
        value.lodCalib = json.lod_c;
      }
      if (json.kd != void 0) {
        value.keyDelay = json.kd;
      }
      if (json.ms != void 0) {
        value.motionSync = json.ms;
      }
      if (json.at != void 0) {
        value.angleTuning = json.at << 24 >> 24;
      }
      if (json.as != void 0) {
        value.angleSnapping = json.as;
      }
      if (json.rctrl != void 0) {
        value.rippleControl = json.rctrl;
      }
      if (json.chr != void 0) {
        value.charging = json.chr;
      }
      if (json.top != void 0) {
        value.txOutputPower = json.top;
        value.txOutputPowerApplied = value.txOutputPower;
      }
      if (json.atp != void 0) {
        value.autoTxPower = json.atp;
      }
      if (json.co != void 0) {
        value.colorCode = json.co;
      }
      if (json.lz != void 0) {
        value.lzSupported = json.lz == 1;
      }
      if (json.st != void 0) {
        value.sleepTime = json.st;
      }
      if (json.rf_ch != void 0) {
        value.rfChannel = json.rf_ch;
      }
      if (json.crc != void 0) {
        value.crcSupported = json.crc == 1;
      }
      if (json.lua != void 0) {
        value.luaStatus = json.lua;
      }
      if (json.noack != void 0) {
        value.noack = json.noack;
      }
      if (json.gm != void 0) {
        if (Array.isArray(json.gm)) {
          value.glassMode = json.gm[0];
          value.glassModeEnabled = json.gm[1];
        } else {
          value.glassMode = json.gm;
          value.glassModeEnabled = 1;
        }
      }
      if (json.ocn != void 0) {
        value.onboardConfigNum = json.ocn;
      }
      if (json.oci != void 0) {
        value.onboardIndex = json.oci;
      }
      if (json.ocs != void 0) {
        value.onboardStatus = json.ocs;
      }
      if (json.ec != void 0) {
        value.enhancedCpi = json.ec == 1;
      }
      if (json.dgom != void 0) {
        value.dynamicGOM = json.dgom == 1;
      }
      if (json.wired != void 0) {
        value.wired = json.wired == 1;
      }
      if (json.sst != void 0) {
        value.sensor = json.sst;
      }
      if (json.lbn != void 0) {
        value.brightness = json.lbn;
      }
      if (json.hc != void 0) {
        value.hopChannelSupported = json.hc != 255;
        value.hopChannel = json.hc == 1;
      }
      if (json.slow != void 0) {
        value.slow = json.slow == 1;
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
  var DS = {};
  Object.keys(__DS).forEach(function(name) {
    Object.defineProperty(DS, name, {
      get() {
        return __DS[name];
      },
      set(v) {
        __DS[name] = v;
      },
      configurable: true
    });
  });
  Object.defineProperty(DS, "current_usb_client", {
    get() {
      return current_usb_client;
    },
    set(v) {
      current_usb_client = v;
    },
    configurable: true
  });

  // ui/ui-helpers.js
  function KeyGridCell(props) {
    var prefix = props.prefix || "kbd-select-key";
    var action = props.action || "select";
    var actionAttr = props.actionAttr;
    var index = props.index;
    var x = props.x || 0;
    var y = props.y || 0;
    var width = props.width;
    var height = props.height;
    var label = props.label || "";
    var elementId = props.elementId;
    var extraClass = props.extraClass || "layui-hover-bg";
    var textStyle = props.textStyle || "font-size: smaller;";
    var extraAttrs = props.extraAttrs || "";
    var showHoverBg = props.showHoverBg !== false;
    var attrStr = prefix + '-index="' + index + '"';
    if (actionAttr) {
      attrStr += " " + actionAttr + '="' + action + '"';
    } else {
      attrStr += " " + prefix + '-action="' + action + '"';
    }
    if (elementId !== void 0) {
      attrStr += ' elementId="' + elementId + '"';
    }
    if (extraAttrs) {
      attrStr += " " + extraAttrs;
    }
    var innerStyle = "width:" + width + "px; height:" + height + "px;";
    var hoverStyle = "position: absolute; width:" + width + "px; height:" + height + "px;";
    if (showHoverBg && extraClass.indexOf("layui-hover-bg") >= 0) {
      hoverStyle = "display: flex; justify-content: center; align-items: center; position: absolute; width:" + width + "px; height:" + height + "px;";
    }
    var html2 = "";
    html2 += '<div class="layui-col-xs3" style="width:' + width + "px; height:" + height + "px; margin-left:" + x + "px; margin-top:" + y + 'px;">';
    html2 += "<a " + attrStr + ' style="cursor: pointer;">';
    html2 += '<div style="' + innerStyle + '">';
    html2 += '<div class="' + extraClass + '" style="' + hoverStyle + '">';
    html2 += '<p style="' + textStyle + 'color:white;text-align: center;">' + label + "</p>";
    html2 += "</div>";
    html2 += "</div>";
    html2 += "</a>";
    html2 += "</div>";
    return html2;
  }
  function KeyGridHighlight(props) {
    var width = props.width;
    var height = props.height;
    var cssClass = props.cssClass || "layui-key-select-red";
    return '<div class="' + cssClass + '" style="position: absolute; width:' + (width - 3) + "px; height:" + (height - 3) + 'px;"></div>';
  }
  function RowBreak(index) {
    var breakPoints = arguments.length > 1 ? Array.prototype.slice.call(arguments, 1) : [15, 36, 57, 73, 89];
    for (var i = 0; i < breakPoints.length; i++) {
      if (index == breakPoints[i]) {
        return '</div><div class="layui-row">';
      }
    }
    return "";
  }
  function SelectElement(props) {
    var name = props.name;
    var filter = props.filter || name;
    var verify = props.verify || "required";
    var extraAttrs = props.extraAttrs || "";
    var options = props.options || [];
    var selectedValue = props.selected;
    var html2 = "";
    html2 += '<select name="' + name + '" lay-verify="' + verify + '" lay-filter="' + filter + '"' + (extraAttrs ? " " + extraAttrs : "") + ">";
    for (var i = 0; i < options.length; i++) {
      var opt = options[i];
      var optValue = opt.value !== void 0 ? opt.value : i;
      var optLabel = opt.label !== void 0 ? opt.label : opt;
      var disabled = opt.disabled ? " disabled" : "";
      var selected = selectedValue !== void 0 && optValue == selectedValue ? " selected" : "";
      html2 += '<option value="' + optValue + '"' + disabled + selected + ">" + optLabel + "</option>";
    }
    html2 += "</select>";
    return html2;
  }
  function RadioInput(props) {
    var name = props.name;
    var filter = props.filter || name;
    var value = props.value;
    var label = props.label !== void 0 ? props.label : value;
    var checked = props.checked ? " checked" : "";
    var disabled = props.disabled ? " disabled" : "";
    var extraAttrs = props.extraAttrs || "";
    return '<input type="radio" name="' + name + '" value="' + value + '" title="' + label + '" lay-filter="' + filter + '"' + checked + disabled + (extraAttrs ? " " + extraAttrs : "") + ">";
  }
  var COLOR_MAP = {
    white: { mask: 7, hex: "#FFF" },
    red: { mask: 4, hex: "#F00" },
    green: { mask: 2, hex: "#0F0" },
    blue: { mask: 1, hex: "#00F" },
    yellow: { mask: 6, hex: "#FF0" },
    purple: { mask: 5, hex: "#F0F" },
    skyblue: { mask: 3, hex: "#0FF" },
    dark: { mask: 0, hex: "#505050" }
  };
  function ColorPickerClass() {
    return is_dark_theme() ? "lay-skin-color-picker" : "lay-skin-color-picker-light";
  }
  function ColorSelectorTable(props) {
    var colors = props.colors;
    var bitmask = props.bitmask;
    var name = props.name || "light-color";
    var actionAttr = props.actionAttr || "light-color-action";
    var colorHex = props.colorHex || {};
    var offsetRef = { value: 0 };
    var darkTheme = ColorPickerClass();
    var html2 = "<table><tr>";
    for (var i = 0; i < colors.length; i++) {
      var colorKey = colors[i];
      var info = COLOR_MAP[colorKey];
      if (!info) continue;
      var checked = (bitmask & 7) == info.mask;
      if (checked) {
        offsetRef.value = 1;
      }
      var hex = colorHex[colorKey] || info.hex;
      html2 += '<td style="padding-top: 5px;">';
      html2 += '<a color-code="' + colorKey + '" ' + actionAttr + '="select" style="padding-left: 8px; padding-right: 8px; padding-top: 8px; cursor: pointer;">';
      if (colorKey == "dark") {
        html2 += '<input type="radio" name="' + name + '" value="' + colorKey + '" lay-skin="none"' + (offsetRef.value == 0 ? " checked" : "") + ">";
      } else {
        html2 += '<input type="radio" name="' + name + '" value="' + colorKey + '" lay-skin="none"' + (checked ? " checked" : "") + ">";
      }
      html2 += '<div lay-radio class="' + darkTheme + '" style="color: ' + hex + "; background-color: " + hex + '"></div>';
      html2 += "</a>";
      html2 += "</td>";
    }
    html2 += "</tr></table>";
    return html2;
  }

  // lib/utilities.js
  function setting_mapping_macro_recording_remove_last() {
    if (S.edit_macros.length > 0) {
      var value = S.edit_macros[S.edit_macros.length - 1];
      if (value.mouse_key_code == 256 && value.mouse_key_event == 256) {
        S.edit_macros = S.edit_macros.slice(0, S.edit_macros.length - 1);
        if (S.edit_macros.length > 0) {
          S.edit_macros[S.edit_macros.length - 1].mouse_key_time = 1;
        }
      }
    }
  }
  function rgbToHsv(r, g, b) {
    let value = r / 255;
    let value2 = g / 255;
    let value3 = b / 255;
    let hsvH;
    let hsvS;
    let hsvV;
    let value4 = Math.max(value, value2, value3);
    let value5 = Math.min(value, value2, value3);
    let value6 = value4 - value5;
    if (value6 > 0) {
      if (value4 == value) {
        hsvH = 60 * ((value2 - value3) / value6 / 6);
      } else {
        if (value4 == value2) {
          hsvH = 60 * ((value3 - value) / value6 + 2);
        } else if (value4 == value3) {
          hsvH = 60 * ((value - value2) / value6 + 4);
        }
      }
      if (value4 > 0) {
        hsvS = value6 / value4;
      } else {
        hsvS = 0;
      }
      hsvV = value4;
    } else {
      hsvH = 0;
      hsvS = 0;
      hsvV = value4;
    }
    if (hsvH < 0) {
      hsvH = 360 + hsvH;
    }
    return {
      "h": Math.floor(hsvH * 255 / 360),
      "s": Math.floor(255 * hsvS),
      "v": Math.floor(255 * hsvV)
    };
  }
  function hsvToRgb(r, g, b) {
    let value = r * 360 / 255;
    let value2 = g / 255;
    let value3 = b / 255;
    let rgbR;
    let rgbG;
    let rgbB;
    let value4 = value3 * value2;
    let value5 = value / 60 / 6;
    let value6 = value4 * (1 - Math.abs(value5 / 2 - 1));
    let value7 = value3 - value4;
    if (0 <= value5 && value5 < 1) {
      rgbR = value4;
      rgbG = value6;
      rgbB = 0;
    } else {
      if (1 <= value5 && value5 < 2) {
        rgbR = value6;
        rgbG = value4;
        rgbB = 0;
      } else {
        if (2 <= value5 && value5 < 3) {
          rgbR = 0;
          rgbG = value4;
          rgbB = value6;
        } else {
          if (3 <= value5 && value5 < 4) {
            rgbR = 0;
            rgbG = value6;
            rgbB = value4;
          } else {
            if (4 <= value5 && value5 < 5) {
              rgbR = value6;
              rgbG = 0;
              rgbB = value4;
            } else if (5 <= value5 && value5 < 6) {
              rgbR = value4;
              rgbG = 0;
              rgbB = value6;
            } else {
              rgbR = 0;
              rgbG = 0;
              rgbB = 0;
            }
          }
        }
      }
    }
    rgbR += value7;
    rgbG += value7;
    rgbB += value7;
    return {
      "r": Math.floor(rgbR * 255),
      "g": Math.floor(rgbG * 255),
      "b": Math.floor(rgbB * 255)
    };
  }
  function rgbToHex(r, g, b) {
    var hash = "#";
    var len = r.toString(16);
    if (len.length == 1) {
      hash = hash + "0";
    }
    hash = hash + len;
    len = g.toString(16);
    if (len.length == 1) {
      hash = hash + "0";
    }
    hash = hash + len;
    len = b.toString(16);
    if (len.length == 1) {
      hash = hash + "0";
    }
    hash = hash + len;
    return hash;
  }
  function show_waiting() {
    $("#kbd-key-waiting-panel").css("display", "");
  }
  function hide_waiting() {
    $("#kbd-key-waiting-panel").css("display", "none");
  }

  // ui/event-dispatch.js
  function initDeviceStoreHandlers() {
    DeviceStore.on("client:added", () => {
      ui_refresh_client_list();
    });
    DeviceStore.on("client:removed", () => {
      ui_refresh_client_list();
    });
    DeviceStore.on("current:changed", () => {
      S.need_save = false;
      ui_refresh_client_list();
      ui_refresh_current_client();
    });
  }
  window.addEventListener("message", (event) => {
    switch (event.data.action) {
      case ACTION_REFRESH_CLIENT_LIST:
        refresh_client_list();
        break;
      case ACTION_REFRESH_CURRENT_CLIENT:
        refresh_current_client();
        break;
      case ACTION_SEND_CLIENT_DATA: {
        var client = DeviceStore.getClient(event.data.usb_client_id);
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
      case "action_ui_refresh_kbd_onboard":
        kbd_ui_refresh_onboard_config(current_usb_client);
        break;
      case ACTION_UI_REFRESH_KBD_KEY:
        if ($("#kbd-main-setting-key-container").css("display") != "none") {
          layui.element.tabChange("kbd-main-setting-type", 0);
        }
        break;
      case ACTION_UI_REFRESH_KBD_LIGHT:
        if ($("#kbd-main-setting-light-container").css("display") != "none") {
          hide_waiting();
          layui.element.tabChange("kbd-main-setting-type", 1);
        }
        break;
      case ACTION_UI_REFRESH_KBD_AXIS:
        if ($("#kbd-main-setting-axis-container").css("display") != "none") {
          hide_waiting();
          layui.element.tabChange("kbd-main-setting-type", 2);
        }
        break;
      case "action_ui_refresh_kbd_advance_key":
        hide_waiting();
        if ($("#kbd-main-setting-advance-key-container").css("display") != "none") {
          layui.element.tabChange("kbd-main-setting-type", 3);
        }
        break;
      case ACTION_UI_REFRESH_KBD_MACRO:
        hide_waiting();
        break;
      case "action_onboard_cfg": {
        var client = DeviceStore.getClient(event.data.usb_client_id);
        if (!client) break;
        var loadingEl = document.getElementById("onboard-config-loading");
        if (event.data.msg == "LOADING") {
          if (current_usb_client != void 0 && current_usb_client.id == client.id) {
            loadingEl.style.display = "";
          }
        } else if (event.data.msg == "LOADED") {
          if (current_usb_client != void 0 && current_usb_client.id == client.id) {
            loadingEl.style.display = "none";
            setting_mapping_init(current_usb_client);
            ui_refresh_mapping_key(current_usb_client);
          }
        } else if (event.data.msg == "ERROR") {
          if (current_usb_client != void 0 && current_usb_client.id == client.id) {
            loadingEl.style.display = "none";
          }
          var layer2 = layui.layer;
          var i18n = layui.i18np;
          var rebootMsg = i18n.prop("STRID_SETTING_MOUSE_ONBOARD_REBOOT_NEEDED");
          const displayName = get_display_name(client);
          layer2.confirm(rebootMsg.replace("{name1}", displayName), {
            "title": i18n.prop("STRID_TITLE_WARNING"),
            "skin": "layui-layer-confirm",
            "btn": [i18n.prop("STRID_SETTING_FACTORY_RESET_S"), i18n.prop("STRID_SETTING_MOUSE_REBOOT_S"), i18n.prop("STRID_BUTTON_CANCEL")],
            "btnAlign": "c",
            "btn1": function() {
              layer2.closeLast(0);
              send_event_factory_reset(client, false);
              setTimeout(() => {
                location.reload();
              }, REBOOT_DELAY_MS);
            },
            "btn2": function() {
              layer2.closeLast(0);
              if (client != void 0) {
                send_event_action(client, 51, 0);
                setTimeout(() => {
                  location.reload();
                }, REBOOT_DELAY_MS);
              }
            },
            "btn3": function() {
              layer2.closeLast(0);
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
    if (S.device_cfg.length > 0 && navigator.hid != void 0) {
      refresh_client_list();
    }
  });
  function do_resize() {
    $("#current-usb-client-panel").css("margin-top", (window.innerHeight - 110 - 482 - 100) / 2);
    let el = document.getElementById("setting-key-delay-section");
    let el2 = document.getElementById("setting-lod-section");
    el2.style.height = el.offsetTop + el.offsetHeight - el2.offsetTop - 20 + "px";
    let offsetLeft = ($("#pair-more-panel")[0].offsetLeft - $("#usb-client-channel")[0].offsetWidth / 2) * 100 / window.innerWidth;
    if (offsetLeft > 50) {
      offsetLeft = 50;
    }
    $("#usb-client-channel")[0].style.left = offsetLeft + "%";
    adjustTable();
  }
  window.addEventListener("resize", (event) => {
    clearTimeout(S.resize_timer_id);
    S.resize_timer_id = setTimeout(do_resize, RESIZE_DEBOUNCE_MS);
  });
  window.onscroll = function() {
    var el = document.getElementById("pair-more-panel");
    var el2 = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    if (el2 > 250) {
      el.style.opacity = 0;
    } else if (el2 > 0) {
      el.style.opacity = (250 - el2) / 250;
    } else {
      el.style.opacity = 1;
    }
  };
  if (navigator.hid != void 0) {
    navigator.hid.addEventListener("connect", (event) => {
      refresh_client_list();
    });
    navigator.hid.addEventListener("disconnect", (event) => {
      refresh_client_list();
    });
  }
  function onBlur() {
    S.window_focused = false;
  }
  function onFocus() {
    DeviceStore.clients.forEach((item) => {
      if (!is_receiver(item)) {
        if (item.helloed) {
          item.esb_last_alive_time = (/* @__PURE__ */ new Date()).getTime();
        }
      }
    });
    S.window_focused = true;
  }
  window.addEventListener("blur", onBlur);
  window.addEventListener("focus", onFocus);

  // ui/ui-keyboard.js
  function dialog_select_key_init(client) {
    var len = kbd_select_keys;
    var html2 = '<div class="layui-row" style="margin-top: 10px;">';
    for (var index = 0; index < len.length; index++) {
      var key = len[index];
      html2 += KeyGridCell({ prefix: "kbd-select-key", action: "select", actionAttr: "dialog-select-key-action", index, x: key.rect[0], y: key.rect[1], width: key.rect[2], height: key.rect[3], label: key.name, elementId: client });
      html2 += RowBreak(index);
    }
    html2 += "</div>";
    $("#dialog-select-key-container").html(html2);
    var len2 = mouse_select_keys;
    html2 = '<div class="layui-row" style="margin-top: 10px;">';
    for (var offset = 0; offset < len2.length; offset++) {
      if (client == "kbd-macro-add-select-key") {
        if (offset > 2) break;
      }
      var key = len2[offset];
      html2 += KeyGridCell({ prefix: "mouse-select-key", action: "select", actionAttr: "dialog-mouse-select-key-action", index: offset, x: key.rect[0], y: key.rect[1], width: key.rect[2], height: key.rect[3], label: key.name, showHoverBg: false, textStyle: "font-size: small;margin-top: 8px;", elementId: client });
    }
    html2 += "</div>";
    $("#dialog-mouse-select-key-container").html(html2);
  }
  function kbd_ui_refresh_onboard_config(client) {
    var layui2 = layui.$;
    var layui3 = layui.form;
    var num = client.device_info.kbd_onboardNum;
    var options = [];
    var label = layui.i18np.prop("STRID_SETTING_CONFIG_CURRENT");
    for (var i = 0; i < num; i++) {
      options.push({ value: i, label: label + S.NUMBERS[i + 1] });
    }
    var html2 = SelectElement({ name: "kbd_onboard-config", options });
    layui2("#kbd-setting-onboard-config").html(html2);
    layui2('[name="kbd_onboard-config"]').val(client.device_info.onboardIndex);
    layui3.render("select");
  }
  function kbd_ui_refresh_key_matrix(client) {
    var breakAt = is_keyboard_5_15(client.device) ? 14 : 13;
    var isSmall = is_keyboard_5_15(client.device);
    var textStyle = isSmall ? "user-select: none;font-size: smaller;" : "user-select: none;font-size: small;";
    var html2 = '<div class="layui-row" style="margin-top: 10px;">';
    for (var i = 0; i < S.kbd_key_infos.length; i++) {
      var key = S.kbd_key_infos[i];
      html2 += KeyGridCell({ prefix: "kbd-key-matrix", index: i, x: key.rect[0], y: key.rect[1], width: key.rect[2], height: key.rect[3], label: key.name, extraClass: "layui-hover-bg-trans", textStyle });
      if (S.kbd_key_matrix_index == i) {
        html2 += KeyGridHighlight({ width: key.rect[2], height: key.rect[3] });
      }
      html2 += RowBreak(i, breakAt);
    }
    html2 += "</div>";
    $("#kbd-mapping-key-container").html(html2);
  }
  function kbd_ui_refresh_key_desc(client) {
    $("#kbd-key-desc-title").css("color", "gray");
    document.getElementById("kbd-key-desc-container").style.borderColor = "gray";
    $("#kbd-key-desc-line").css("background-color", "gray");
    $("#kbd-key-desc1").css("color", "gray");
    $("#kbd-key-desc1").text(layui.i18np.prop("STRID_KBD_NO_KEY_SELECTED"));
    $("#kbd-key-desc-arrow").css("display", "none");
    $("#kbd-key-desc2").css("display", "none");
    document.getElementById("kbd-key-default").disabled = true;
    document.getElementById("kbd-key-set").disabled = true;
    if (S.kbd_key_matrix_index >= 0) {
      $("#kbd-key-desc-title").css("color", "");
      if (is_dark_theme()) {
        document.getElementById("kbd-key-desc-container").style.borderColor = "#BABABA";
        $("#kbd-key-desc-line").css("background-color", "#BABABA");
        document.getElementById("kbd-key-default").className = "layui-btn layui-key-desc-button";
        document.getElementById("kbd-key-set").className = "layui-btn layui-key-desc-button";
      } else {
        document.getElementById("kbd-key-desc-container").style.borderColor = "black";
        $("#kbd-key-desc-line").css("background-color", "black");
        document.getElementById("kbd-key-default").className = "layui-btn layui-key-desc-button-light";
        document.getElementById("kbd-key-set").className = "layui-btn layui-key-desc-button-light";
      }
      $("#kbd-key-desc1").css("color", "");
      $("#kbd-key-desc1").text(S.kbd_key_infos[S.kbd_key_matrix_index].name);
      if (S.kbd_key_setting_index == 0 || S.kbd_key_setting_index == 1 || S.kbd_key_setting_index == 2) {
        if (S.kbd_layer_id == 0) {
          if (S.kbd_key_infos[S.kbd_key_matrix_index].keyId != S.kbd_keys[S.kbd_key_matrix_index].keyId) {
            document.getElementById("kbd-key-default").disabled = false;
          }
        } else if (S.kbd_key_infos[S.kbd_key_matrix_index].keyId > 1) {
          document.getElementById("kbd-key-default").disabled = false;
        }
        if (S.kbd_select_keyId > 0) {
          if (S.kbd_key_infos[S.kbd_key_matrix_index].keyId == S.kbd_select_keyId) {
            document.getElementById("kbd-key-set").disabled = true;
          } else {
            $("#kbd-key-desc-arrow").css("display", "");
            $("#kbd-key-desc2").css("display", "");
            $("#kbd-key-desc2").css("color", S.theme_color);
            $("#kbd-key-desc2").text(get_key_name_from_keyid(S.kbd_select_keyId));
            document.getElementById("kbd-key-set").disabled = false;
          }
        }
      }
    }
  }
  function kbd_ui_key_setting_init(client) {
    var html2 = '<div class="layui-row" style="margin-top: 10px;">';
    for (var i = 0; i < kbd_select_keys.length; i++) {
      var key = kbd_select_keys[i];
      html2 += KeyGridCell({ prefix: "kbd-select-key", index: i, x: key.rect[0], y: key.rect[1], width: key.rect[2], height: key.rect[3], label: key.name, textStyle: "user-select: none;font-size: smaller;" });
      html2 += RowBreak(i);
    }
    html2 += "</div>";
    $("#select-key-container").html(html2);
    html2 = '<div class="layui-row" style="margin-top: 10px;">';
    for (var j = 0; j < mouse_select_keys.length; j++) {
      var key = mouse_select_keys[j];
      html2 += KeyGridCell({ prefix: "mouse-select-key", index: j, x: key.rect[0], y: key.rect[1], width: key.rect[2], height: key.rect[3], label: key.name, showHoverBg: false, textStyle: "user-select: none;font-size: small;margin-top: 8px;" });
    }
    html2 += "</div>";
    $("#mouse-select-key-container").html(html2);
  }
  function kbd_ui_function_setting_init(client) {
    var textStyle = "user-select: none;font-size: small;margin-top: 8px;";
    var html2 = '<div class="layui-row" style="margin-top: 10px;">';
    for (var i = 0; i < kbd_rgb_keys.length; i++) {
      var key = kbd_rgb_keys[i];
      html2 += KeyGridCell({ prefix: "kbd-key-rgb", index: i, x: key.rect[0], y: key.rect[1], width: key.rect[2], height: key.rect[3], label: key.name, showHoverBg: false, textStyle });
    }
    html2 += "</div>";
    $("#kbd-key-rgb-container").html(html2);
    html2 = '<div class="layui-row" style="margin-top: 10px;">';
    for (var j = 0; j < kbd_media_keys.length; j++) {
      var key = kbd_media_keys[j];
      html2 += KeyGridCell({ prefix: "kbd-key-media", index: j, x: key.rect[0], y: key.rect[1], width: key.rect[2], height: key.rect[3], label: key.name, showHoverBg: false, textStyle });
    }
    html2 += "</div>";
    $("#kbd-key-media-container").html(html2);
    html2 = '<div class="layui-row" style="margin-top: 10px;">';
    for (var k = 0; k < kbd_windows_keys.length; k++) {
      var key = kbd_windows_keys[k];
      html2 += KeyGridCell({ prefix: "kbd-key-windows", index: k, x: key.rect[0], y: key.rect[1], width: key.rect[2], height: key.rect[3], label: key.name, showHoverBg: false, textStyle });
    }
    html2 += "</div>";
    $("#kbd-key-windows-container").html(html2);
  }
  function kbd_ui_macro_init(client) {
    var layui2 = layui.$;
    var html2 = "<table><tr>";
    for (var i = 0; i < S.kbd_macro_infos.length; i++) {
      var macro = S.kbd_macro_infos[i];
      var isSelected = S.kbd_macro_select_index == i;
      var bgColor = isSelected ? "#16B777" : "#202020";
      var countColor = isSelected ? "white" : "gray";
      html2 += '<td style="padding-top: 5px;">';
      html2 += '<a kbd-macro-item-index="' + i + '"kbd-macro-item-action="select" style="cursor: pointer;">';
      html2 += '<div style="width: 104px; height: 68px; margin-left: 5px; background-color: ' + bgColor + ';">';
      html2 += '<div class="layui-setting-title-container" style="height: 50%;">';
      html2 += '<p style="width: 104px; color: white; margin-top: 6px; text-align: center;">M' + (i + 1) + "</p>";
      html2 += "</div>";
      html2 += '<div class="layui-setting-title-container" style="height: 50%;">';
      html2 += '<p style="width: 104px; color: ' + countColor + '; text-align: center;">' + macro.length + " " + layui.i18np.prop("STRID_SETTING_MACRO_ACTIONGS") + "</p>";
      html2 += "</div>";
      html2 += "</div>";
      html2 += "</a>";
      html2 += "</td>";
      if ((i + 1) % 4 == 0) html2 += "</tr><tr>";
    }
    html2 += "</tr></table>";
    layui2("#kbd-macro-container").html(html2);
  }
  function kbd_ui_macro_edit_init(client) {
    if (S.kbd_macro_select_index >= 0) {
      document.getElementById("kbd-macro-record").disabled = false;
      document.getElementById("kbd-macro-add").disabled = false;
      document.getElementById("kbd-macro-clear").disabled = false;
      document.getElementById("kbd-macro-save").disabled = false;
    } else {
      document.getElementById("kbd-macro-record").disabled = true;
      document.getElementById("kbd-macro-add").disabled = true;
      document.getElementById("kbd-macro-clear").disabled = true;
      document.getElementById("kbd-macro-save").disabled = true;
    }
    var layui2 = layui.$;
    var html2 = "<table><tr>";
    for (var i = 0; i < S.edit_macros.length; i++) {
      var item = S.edit_macros[i];
      var event = item.mouse_key_event;
      var code = item.mouse_key_code;
      html2 += '<td style="padding-top: 3px;">';
      html2 += '<a macro-edit-item-index="' + i + '" macro-edit-item-action="select" style="cursor: pointer;">';
      html2 += '<div style="width: 110px; height: 60px; margin-left: 3px; background-color: ' + (is_dark_theme() ? "#202020" : "gray") + ';">';
      html2 += '<div class="layui-setting-title-container" style="height: 50%;">';
      if (event == MOUSE_EVENT_WHEEL_VERT) {
        var isUp = code > 0;
        html2 += '<img src="' + RESOURCE_URL + "setting/" + (isUp ? "mkey_up" : "mkey_down") + '.png" style="width: 20px; height: 22px; margin: 4px;">';
        html2 += '<p style="color: white; margin-top: 6px;">' + layui.i18np.prop(isUp ? "STRID_KEY_WHELL_UP_S" : "STRID_KEY_WHELL_DOWN_S") + "<br>" + (isUp ? code : Math.abs(code)) + "</p>";
      } else if (event == MOUSE_EVENT_WHEEL_HORZ) {
        var isLeft = code < 0;
        html2 += '<img src="' + RESOURCE_URL + "setting/" + (isLeft ? "mkey_up" : "mkey_down") + '.png" style="width: 20px; height: 22px; margin: 4px;">';
        html2 += '<p style="color: white; margin-top: 6px;">' + layui.i18np.prop(isLeft ? "STRID_KEY_WHELL_LEFT_S" : "STRID_KEY_WHELL_RIGHT_S") + "<br>" + (isLeft ? Math.abs(code) : code) + "</p>";
      } else if (event == MOUSE_EVENT_MOVE) {
        var mx = code >> 16 & 65535;
        var my = code & 65535;
        html2 += '<img src="' + RESOURCE_URL + 'setting/mkey_move.png" style="width: 20px; height: 22px; margin: 4px;">';
        html2 += '<p style="color: white; margin-top: 6px;">' + layui.i18np.prop("STRID_KEY_MOUSE_MOVE_S") + "<br>" + (mx - 2047) / 10 + ":" + (my - 2047) / 10 + "</p>";
      } else if (event == MOUSE_EVENT_POSITION) {
        var screenW = window.screen.width;
        var screenH = window.screen.height;
        var px = parseInt((code >> 16 & 65535) * screenW / 65535);
        var py = parseInt((code & 65535) * screenH / 65535);
        html2 += '<img src="' + RESOURCE_URL + 'setting/mkey_position.png" style="width: 20px; height: 22px; margin: 4px;">';
        html2 += '<p style="color: white; margin-top: 6px;">' + layui.i18np.prop("STRID_KEY_MOUSE_POSITION_S") + "<br>" + px + ":" + py + "</p>";
      } else if (code == 0) {
        html2 += '<p style="color: white; margin-left: 4px;">' + get_key_name_from_code(code) + "</p>";
      } else {
        var isUpEvent = event == MOUSE_EVENT_KEY_UP;
        var isMouseKey = code >= 255 && code < 512;
        var imgName = (isMouseKey ? "mkey_" : "key_") + (isUpEvent ? "up" : "down");
        html2 += '<img src="' + RESOURCE_URL + "setting/" + imgName + '.png" style="width: 20px; height: 22px; margin: 4px;">';
        html2 += '<p style="color: white; margin-top: 6px;">' + get_key_name_from_code(code) + "</p>";
      }
      html2 += "</div>";
      html2 += '<div class="layui-setting-title-container" style="height: 50%;">';
      html2 += '<img src="' + RESOURCE_URL + 'setting/key_waiting.png" style="width: 18px; height: 20px; margin: 4px;">';
      if (event == MOUSE_EVENT_MOVE && item.mouse_key_loop > 1) {
        html2 += '<p style="color: white;">' + item.mouse_key_time + "x" + item.mouse_key_loop + " " + layui.i18np.prop("STRID_SETTING_MAPPING_MACRO_ACTION_KEEP_TIME_MS") + "</p>";
      } else {
        html2 += '<p style="color: white;">' + item.mouse_key_time + " " + layui.i18np.prop("STRID_SETTING_MAPPING_MACRO_ACTION_KEEP_TIME_MS") + "</p>";
      }
      html2 += "</div>";
      html2 += "</div>";
      html2 += "</a>";
      html2 += "</td>";
      if ((i + 1) % 7 == 0) html2 += "</tr><tr>";
    }
    html2 += "</tr></table>";
    layui2("#kbd-macro-edit-container").html(html2);
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
    S.kbd_light_mode.splice(0, S.kbd_light_mode.length);
    S.kbd_light_mode.push(create_light_mode_info(0, layui.i18np.prop("STRID_CLOSE")));
    S.kbd_light_mode.push(create_light_mode_info(45, layui.i18np.prop("STRID_KBD_LIGHT_MODE_DEFINE")));
    for (var offset = 1; offset < 25; offset++) {
      S.kbd_light_mode.push(create_light_mode_info(offset, layui.i18np.prop("STRID_KBD_LIGHT_MODE" + offset)));
    }
    S.kbd_light_mode.push(create_light_mode_info(28, layui.i18np.prop("STRID_KBD_LIGHT_MODE28")));
    S.kbd_light_mode.push(create_light_mode_info(29, layui.i18np.prop("STRID_KBD_LIGHT_MODE29")));
    S.kbd_light_mode.push(create_light_mode_info(30, layui.i18np.prop("STRID_KBD_LIGHT_MODE30")));
    var options = [];
    for (var i = 0; i < S.kbd_light_mode.length; i++) {
      options.push({ value: i, label: i + 1 + ". " + S.kbd_light_mode[i].name });
    }
    var html2 = SelectElement({ name: "kbd-light-mode", options });
    layui2("#kbd-light-mode-container").html(html2);
    layui2('[name="kbd-light-mode"]').val(13);
    for (var offset = 0; offset < S.kbd_light_mode.length; offset++) {
      if (S.kbd_light_mode[offset].mode == S.kbd_edit_info.mode) {
        layui2('[name="kbd-light-mode"]').val(offset);
        break;
      }
    }
    S.kbd_sleep_time.splice(0, S.kbd_light_mode.length);
    S.kbd_sleep_time.push(create_light_mode_info(0, layui.i18np.prop("STRID_KBD_LIGHT_SLEEP_TIME1")));
    S.kbd_sleep_time.push(create_light_mode_info(300, layui.i18np.prop("STRID_KBD_LIGHT_SLEEP_TIME2")));
    S.kbd_sleep_time.push(create_light_mode_info(900, layui.i18np.prop("STRID_KBD_LIGHT_SLEEP_TIME3")));
    S.kbd_sleep_time.push(create_light_mode_info(1800, layui.i18np.prop("STRID_KBD_LIGHT_SLEEP_TIME4")));
    S.kbd_sleep_time.push(create_light_mode_info(3600, layui.i18np.prop("STRID_KBD_LIGHT_SLEEP_TIME5")));
    var options = [];
    for (var i = 0; i < S.kbd_sleep_time.length; i++) {
      options.push({ value: i, label: i + 1 + ". " + S.kbd_sleep_time[i].name });
    }
    var html2 = SelectElement({ name: "kbd-light-sleep-time", options });
    layui2("#kbd-light-sleep-time-container").html(html2);
    layui2('[name="kbd-light-sleep-time"]').val(0);
    for (var offset = 0; offset < S.kbd_sleep_time.length; offset++) {
      if (S.kbd_sleep_time[offset].mode == S.kbd_edit_info.sleep_time) {
        layui2('[name="kbd-light-sleep-time"]').val(offset);
        break;
      }
    }
    layui3.render("select");
  }
  function kbd_ui_refresh_light(client) {
    if (S.kbd_edit_info.mode == 45) {
      document.getElementById("kbd-light-wasd").disabled = false;
      document.getElementById("kbd-light-select-all").disabled = false;
      document.getElementById("kbd-light-reverse-all").disabled = false;
      document.getElementById("kbd-light-clear").disabled = false;
    } else {
      document.getElementById("kbd-light-wasd").disabled = true;
      document.getElementById("kbd-light-select-all").disabled = true;
      document.getElementById("kbd-light-reverse-all").disabled = true;
      document.getElementById("kbd-light-clear").disabled = true;
    }
    var value = hsvToRgb(S.kbd_edit_info.hue, S.kbd_edit_info.sat, Math.floor(255 * S.kbd_edit_info.brightness / 100));
    if (S.kbd_edit_info.mode == 45 && S.kbd_matrix_select_keys.length > 0) {
      value = hsvToRgb(S.kbd_matrix_select_keys[0].hue, S.kbd_matrix_select_keys[0].sat, Math.floor(255 * S.kbd_edit_info.brightness / 100));
    }
    document.getElementById("pick-color").value = rgbToHex(value.r, value.g, value.b);
    $("#color-r-input").val(value.r);
    $("#color-g-input").val(value.g);
    $("#color-b-input").val(value.b);
    var layui2 = layui.slider;
    var value2 = layui2.render({
      "elem": "#kbd-light-global-brightness",
      "min": 0,
      "max": 100,
      "step": 1,
      "value": S.kbd_edit_info.brightness,
      "input": true,
      "tips": false,
      "disabled": !!(S.kbd_edit_info.mode == 0),
      "theme": S.theme_color,
      "done": function(result) {
        if (S.kbd_edit_info.brightness != result) {
          S.kbd_edit_info.brightness = result;
          hs_set_light(DS.current_usb_client, 1, S.kbd_edit_info);
        }
      }
    });
    value2.setValue(S.kbd_edit_info.brightness);
    value2 = layui2.render({
      "elem": "#kbd-light-global-speed",
      "min": 0,
      "max": 100,
      "step": 1,
      "value": S.kbd_edit_info.speed,
      "input": true,
      "tips": false,
      "disabled": !!(S.kbd_edit_info.mode == 0 || S.kbd_edit_info.mode == 1 || S.kbd_edit_info.mode == 45),
      "theme": S.theme_color,
      "done": function(result) {
        if (S.kbd_edit_info.speed != result) {
          S.kbd_edit_info.speed = result;
          hs_set_light(DS.current_usb_client, 3, S.kbd_edit_info);
        }
      }
    });
    value2.setValue(S.kbd_edit_info.speed);
    kbd_ui_refresh_light_mode(client);
  }
  function kbd_ui_refresh_light_box_mode(client) {
    var layui2 = layui.$;
    var layui3 = layui.form;
    S.kbd_light_mode.splice(0, S.kbd_light_mode.length);
    S.kbd_light_mode.push(create_light_mode_info(0, layui.i18np.prop("STRID_CLOSE")));
    S.kbd_light_mode.push(create_light_mode_info(1, layui.i18np.prop("STRID_KBD_LIGHT_BOX_MODE1")));
    S.kbd_light_mode.push(create_light_mode_info(2, layui.i18np.prop("STRID_KBD_LIGHT_BOX_MODE2")));
    S.kbd_light_mode.push(create_light_mode_info(3, layui.i18np.prop("STRID_KBD_LIGHT_BOX_MODE3")));
    S.kbd_light_mode.push(create_light_mode_info(4, layui.i18np.prop("STRID_KBD_LIGHT_BOX_MODE4")));
    var options = [];
    for (var i = 0; i < S.kbd_light_mode.length; i++) {
      options.push({ value: i, label: i + 1 + ". " + S.kbd_light_mode[i].name });
    }
    var html2 = SelectElement({ name: "kbd-light-box-mode", options });
    layui2("#kbd-light-box-mode-container").html(html2);
    layui2('[name="kbd-light-box-mode"]').val(1);
    for (var index = 0; index < S.kbd_light_mode.length; index++) {
      if (S.kbd_light_mode[index].mode == S.kbd_edit_info.light_box_info.mode) {
        layui2('[name="kbd-light-box-mode"]').val(index);
        break;
      }
    }
    layui3.render("select");
  }
  function kbd_ui_refresh_light_box(client) {
    document.getElementById("kbd-light-wasd").disabled = true;
    document.getElementById("kbd-light-select-all").disabled = true;
    document.getElementById("kbd-light-reverse-all").disabled = true;
    document.getElementById("kbd-light-clear").disabled = true;
    $('[name="kbd-light-box-colored"]').prop("checked", S.kbd_edit_info.light_box_info.colored == 1);
    var info = {
      "r": S.kbd_edit_info.light_box_info.r,
      "g": S.kbd_edit_info.light_box_info.g,
      "b": S.kbd_edit_info.light_box_info.b
    };
    document.getElementById("light-box-pick-color").value = rgbToHex(info.r, info.g, info.b);
    $("#light-box-color-r-input").val(info.r);
    $("#light-box-color-g-input").val(info.g);
    $("#light-box-color-b-input").val(info.b);
    var layui2 = layui.slider;
    var value = layui2.render({
      "elem": "#kbd-light-box-global-brightness",
      "min": 0,
      "max": 100,
      "step": 1,
      "value": S.kbd_edit_info.light_box_info.brightness,
      "input": true,
      "tips": false,
      "theme": S.theme_color,
      "done": function(result) {
        if (S.kbd_edit_info.light_box_info.brightness != result) {
          S.kbd_edit_info.light_box_info.brightness = result;
          hs_set_light_box(DS.current_usb_client, S.kbd_edit_info.light_box_info);
        }
      }
    });
    value.setValue(S.kbd_edit_info.light_box_info.brightness);
    value = layui2.render({
      "elem": "#kbd-light-box-global-speed",
      "min": 0,
      "max": 100,
      "step": 1,
      "value": S.kbd_edit_info.light_box_info.speed,
      "input": true,
      "tips": false,
      "theme": S.theme_color,
      "done": function(result) {
        if (S.kbd_edit_info.light_box_info.speed != result) {
          S.kbd_edit_info.light_box_info.speed = result;
          hs_set_light_box(DS.current_usb_client, S.kbd_edit_info.light_box_info);
        }
      }
    });
    value.setValue(S.kbd_edit_info.light_box_info.speed);
    kbd_ui_refresh_light_box_mode(client);
  }
  function kbd_ui_refresh_light_matrix(client) {
    var value = 13;
    if (is_keyboard_5_15(client.device)) {
      value = 14;
    }
    var html2 = '<div class="layui-row" style="margin-top: 10px;">';
    for (let len = 0; len < S.kbd_key_infos.length; len++) {
      var value2 = S.kbd_key_infos[len].name;
      var value3 = S.kbd_key_infos[len].rect;
      var x = value3[0];
      var value4 = value3[1];
      var value5 = value3[2];
      var value6 = value3[3];
      var value7 = S.kbd_key_infos[len].row;
      var value8 = S.kbd_key_infos[len].col;
      var flag = true;
      if (S.kbd_edit_info.mode == 45) {
        flag = false;
      }
      html2 += '<div class="layui-col-xs3" style="width:' + value5 + "px; height:" + value6 + "px; margin-left:" + x + "px; margin-top:" + value4 + 'px; ">';
      if (flag) {
        html2 += '<a kbd-light-matrix-index="-1"kbd-light-matrix-action="select" style="cursor: not-allowed;">';
        html2 += '<div style="width:' + value5 + "px; height:" + value6 + 'px;">';
        html2 += '<div style="justify-content: center; align-items: center; position: absolute; width:' + value5 + "px; height:" + value6 + 'px;">';
        " ";
      } else {
        html2 += '<a kbd-light-matrix-index="' + len + '"kbd-light-matrix-action="select" style="cursor: pointer;">';
        html2 += '<div style="width:' + value5 + "px; height:" + value6 + 'px;">';
        html2 += '<div class="layui-hover-bg-trans" style="justify-content: center; align-items: center; position: absolute; width:' + value5 + "px; height:" + value6 + 'px;">';
        " ";
      }
      if (is_keyboard_5_15(client.device)) {
        html2 += '<p style="user-select: none;font-size: smaller;color:white;text-align: center; margin-top: 10px;" >' + value2 + "</p>";
      } else {
        html2 += '<p style="user-select: none;font-size: small;color:white;text-align: center; margin-top: 16px;" >' + value2 + "</p>";
      }
      var transparentStr = "transparent";
      if (S.kbd_edit_info.mode == 45) {
        for (let index = 0; index < S.kbd_edit_info.keys.length; index++) {
          if (value7 == S.kbd_edit_info.keys[index].row && value8 == S.kbd_edit_info.keys[index].col) {
            var value9 = hsvToRgb(S.kbd_edit_info.keys[index].hue, S.kbd_edit_info.keys[index].sat, Math.floor(255 * S.kbd_edit_info.brightness / 100));
            transparentStr = rgbToHex(value9.r, value9.g, value9.b);
            break;
          }
        }
      }
      if (value2 != "") {
        var value10 = (value5 - 8) / 2;
        html2 += '<div id="key-color" style="background-color: ' + transparentStr + "; margin-top: 6px; margin-left:" + value10 + 'px; width:8px; height:2px;">';
        " ";
        html2 += "</div>";
      }
      html2 += "</div>";
      for (let offset = 0; offset < S.kbd_matrix_select_keys.length; offset++) {
        if (value7 == S.kbd_matrix_select_keys[offset].row && value8 == S.kbd_matrix_select_keys[offset].col) {
          html2 += '<div class="layui-key-select-red" style="position: absolute; width:' + (value5 - 3) + "px; height:" + (value6 - 3) + 'px;">';
          " ";
          html2 += "</div>";
          break;
        }
      }
      html2 += "</div>";
      html2 += "</a>";
      html2 += "</div>";
      if (len == value) {
        html2 += '</div><div class="layui-row">';
      }
    }
    ;
    html2 += "</div>";
    $("#kbd-mapping-light-container").html(html2);
  }
  function kbd_ui_refresh_axis_matrix(client) {
    var value = 13;
    if (is_keyboard_5_15(client.device)) {
      value = 14;
    }
    var html2 = '<div class="layui-row" style="margin-top: 10px;">';
    for (let len = 0; len < S.kbd_key_infos.length; len++) {
      var value2 = S.kbd_key_infos[len].name;
      var value3 = S.kbd_key_infos[len].rect;
      var x = value3[0];
      var value4 = value3[1];
      var value5 = value3[2];
      var value6 = value3[3];
      var value7 = S.kbd_key_infos[len].row;
      var value8 = S.kbd_key_infos[len].col;
      html2 += '<div class="layui-col-xs3" style="width:' + value5 + "px; height:" + value6 + "px; margin-left:" + x + "px; margin-top:" + value4 + 'px; ">';
      html2 += '<a kbd-axis-matrix-index="' + len + '"kbd-axis-matrix-action="select" style="cursor: pointer;">';
      html2 += '<div style="width:' + value5 + "px; height:" + value6 + 'px;">';
      html2 += '<div class="layui-hover-bg-trans" style="justify-content: center; align-items: center; position: absolute; width:' + value5 + "px; height:" + value6 + 'px;">';
      " ";
      if (is_keyboard_5_15(client.device)) {
        html2 += '<p style="user-select: none;font-size: smaller;color:white;text-align: center; margin-top: 2px;" >' + value2 + "</p>";
        if (value2 != "") {
          if (S.kbd_axis_infos.length > 0) {
            var value9 = S.kbd_axis_infos[len].rt_press_lv / 1e3;
            var value10 = S.kbd_axis_infos[len].rt_release_lv / 1e3;
            html2 += '<p style="user-select: none;font-size: 10px;color:#C0C0C0;text-align: center;" >' + value9.toFixed(3) + "</p>";
            html2 += '<p style="user-select: none;font-size: 10px;color:#C0C0C0;text-align: center; " >' + value10.toFixed(3) + "</p>";
          }
        }
      } else {
        html2 += '<p style="user-select: none;font-size: small;color:white;text-align: center; margin-top: 5px; margin-bottom:2px" >' + value2 + "</p>";
        if (value2 != "") {
          if (S.kbd_axis_infos.length > 0) {
            var value9 = S.kbd_axis_infos[len].rt_press_lv / 100;
            var value10 = S.kbd_axis_infos[len].rt_release_lv / 100;
            html2 += '<p style="user-select: none;font-size: smaller; color:#C0C0C0; text-align: center; margin-top:1px" >' + value9.toFixed(2) + "</p>";
            html2 += '<p style="user-select: none;font-size: smaller; color:#C0C0C0; text-align: center; margin-top:1px" >' + value10.toFixed(2) + "</p>";
          }
        }
      }
      html2 += "</div>";
      for (let index = 0; index < S.kbd_matrix_select_keys.length; index++) {
        if (value7 == S.kbd_matrix_select_keys[index].row && value8 == S.kbd_matrix_select_keys[index].col) {
          html2 += '<div class="layui-key-select-red" style="position: absolute; width:' + (value5 - 3) + "px; height:" + (value6 - 3) + 'px;">';
          " ";
          html2 += "</div>";
          break;
        }
      }
      html2 += "</div>";
      html2 += "</a>";
      html2 += "</div>";
      if (len == value) {
        html2 += '</div><div class="layui-row">';
      }
    }
    ;
    html2 += "</div>";
    $("#kbd-mapping-axis-container").html(html2);
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
      document.getElementById("layui-axis-type-ttc-wcw-container").style.borderColor = "#CCCCCC";
      document.getElementById("layui-axis-type-jdl-container").style.backgroundColor = "white";
      document.getElementById("layui-axis-type-hn-omega-container").style.backgroundColor = "white";
      document.getElementById("layui-axis-type-ttc-wcw-container").style.backgroundColor = "white";
    }
    document.getElementById("layui-axis-type-jdl-icon").src = RESOURCE_URL + "setting/kbd/kbd_axis_jdl.png";
    document.getElementById("layui-axis-type-hn-omega-icon").src = RESOURCE_URL + "setting/kbd/kbd_axis_hn_omega.png";
    document.getElementById("layui-axis-type-ttc-wcw-icon").src = RESOURCE_URL + "setting/kbd/kbd_axis_ttc_wcw.png";
    if (S.kbd_matrix_select_keys.length == 0) {
      return;
    }
    if (S.kbd_edit_info.switch_type == 0) {
      document.getElementById("layui-axis-type-jdl-container").style.borderColor = "#16B777";
    } else {
      if (S.kbd_edit_info.switch_type == 1) {
        document.getElementById("layui-axis-type-hn-omega-container").style.borderColor = "#16B777";
      } else if (S.kbd_edit_info.switch_type == 2) {
        document.getElementById("layui-axis-type-ttc-wcw-container").style.borderColor = "#16B777";
      }
    }
  }
  function kbd_ui_refresh_axis(client) {
    if (S.kbd_matrix_select_keys.length > 0) {
      S.kbd_edit_info = S.kbd_matrix_select_keys[0];
    } else {
      S.kbd_edit_info = kbd_create_axis_info();
    }
    $('[name="kbd-axis-quick-tigger-mode"]').prop("checked", !!(S.kbd_edit_info.rt_enable == 1));
    $('[name="kbd-axis-quick-tigger-mode"]').prop("disabled", !(S.kbd_matrix_select_keys.length > 0));
    $("#kbd-axis-button-container").css("display", S.kbd_matrix_select_keys.length > 0 ? "flex" : "none");
    var val01 = 0.01;
    var val012 = 0.01;
    var val34 = 3.4;
    var value = 100;
    if (is_keyboard_5_15(client.device)) {
      val01 = 1e-3;
      val012 = 1e-3;
      value = 1e3;
    }
    if (S.kbd_edit_info.switch_type == 1) {
      val34 = 3.5;
    }
    var value2 = S.kbd_edit_info.apc_lv / value;
    var layui2 = layui.slider;
    var value3 = layui2.render({
      "elem": "#kbd-axis-trigger-point",
      "min": 0.1,
      "max": val34,
      "step": val01,
      "value": value2,
      "input": true,
      "tips": false,
      "disabled": !(S.kbd_matrix_select_keys.length > 0),
      "theme": S.theme_color,
      "done": function(result) {
        if (result != void 0) {
          S.kbd_edit_info.apc_lv = result * value;
        }
      }
    });
    value3.setValue(value2);
    var value4 = S.kbd_edit_info.rt_press_lv / value;
    value3 = layui2.render({
      "elem": "#kbd-axis-press-distance",
      "min": val012,
      "max": val34,
      "step": val01,
      "value": value4,
      "input": true,
      "tips": false,
      "disabled": !(S.kbd_edit_info.rt_enable == 1),
      "theme": S.theme_color,
      "done": function(result) {
        if (result != void 0) {
          S.kbd_edit_info.rt_press_lv = result * value;
        }
      }
    });
    value3.setValue(value4);
    var value5 = S.kbd_edit_info.rt_release_lv / value;
    value3 = layui2.render({
      "elem": "#kbd-axis-release-distance",
      "min": val012,
      "max": val34,
      "step": val01,
      "value": value5,
      "input": true,
      "tips": false,
      "disabled": !(S.kbd_edit_info.rt_enable == 1),
      "theme": S.theme_color,
      "done": function(result) {
        if (result != void 0) {
          S.kbd_edit_info.rt_release_lv = result * value;
        }
      }
    });
    value3.setValue(value5);
    var value6 = S.kbd_edit_info.btm_dz / value;
    value3 = layui2.render({
      "elem": "#kbd-axis-dead-distance",
      "min": 0,
      "max": val34,
      "step": val01,
      "value": value6,
      "input": true,
      "tips": false,
      "disabled": !(S.kbd_edit_info.rt_enable == 1),
      "theme": S.theme_color,
      "done": function(result) {
        if (result != void 0) {
          S.kbd_edit_info.btm_dz = result * value;
        }
      }
    });
    value3.setValue(value6);
    kbd_ui_refresh_axis_type(client);
  }
  function kbd_ui_refresh_advance_key_desc(client) {
    $("#kbd-advance-key-desc-title").css("color", "gray");
    document.getElementById("kbd-advance-key-desc-container").style.borderColor = "gray";
    $("#kbd-advance-key-desc-line").css("background-color", "gray");
    $("#kbd-advance-key-desc1").css("color", "gray");
    $("#kbd-advance-key-desc1").text(layui.i18np.prop("STRID_KBD_NO_KEY_SELECTED"));
    $("#kbd-advance-key-desc-arrow").css("display", "none");
    $("#kbd-advance-key-desc-arrow").text(" \xE2\u2020\u2019 ");
    $("#kbd-advance-key-desc2").css("display", "none");
    document.getElementById("kbd-advance-key-delete").disabled = true;
    document.getElementById("kbd-advance-key-set").disabled = true;
    if (S.kbd_key_matrix_index >= 0) {
      if (S.kbd_key_setting_index != 0 && S.kbd_key_setting_index != 2 || S.kbd_key_setting_index == 0 && S.kbd_select_elementId.length > 0 || S.kbd_key_setting_index == 2 && S.kbd_select_elementId.length > 0) {
        $("#kbd-advance-key-desc-title").css("color", "");
        if (is_dark_theme()) {
          document.getElementById("kbd-advance-key-desc-container").style.borderColor = "#BABABA";
          $("#kbd-key-desc-line").css("background-color", "#BABABA");
          document.getElementById("kbd-advance-key-delete").className = "layui-btn layui-key-desc-button";
          document.getElementById("kbd-advance-key-set").className = "layui-btn layui-key-desc-button";
        } else {
          document.getElementById("kbd-advance-key-desc-container").style.borderColor = "black";
          $("#kbd-key-desc-line").css("background-color", "black");
          document.getElementById("kbd-advance-key-delete").className = "layui-btn layui-key-desc-button-light";
          document.getElementById("kbd-advance-key-set").className = "layui-btn layui-key-desc-button-light";
        }
        $("#kbd-advance-key-desc1").css("color", "");
      }
      if (S.kbd_key_setting_index == 0) {
        var flag = true;
        for (let len = 0; len < S.kbd_socd_infos.length; len++) {
          if (S.kbd_edit_info.row1 == S.kbd_socd_infos[len].row1 && S.kbd_edit_info.col1 == S.kbd_socd_infos[len].col1 && S.kbd_edit_info.row2 == S.kbd_socd_infos[len].row2 && S.kbd_edit_info.col2 == S.kbd_socd_infos[len].col2 && S.kbd_edit_info.socd_mode == S.kbd_socd_infos[len].socd_mode) {
            flag = false;
            break;
          }
        }
        if (S.kbd_select_elementId.length > 0) {
          $("#kbd-advance-key-desc1").text(S.kbd_key_infos[S.kbd_key_matrix_index].name);
        }
        if (S.kbd_edit_info.row1 >= 0 && S.kbd_edit_info.col1 >= 0 && S.kbd_edit_info.row2 >= 0 && S.kbd_edit_info.col2 >= 0) {
          for (let index = 0; index < S.kbd_key_infos.length; index++) {
            if (S.kbd_key_infos[index].row == S.kbd_edit_info.row1 && S.kbd_key_infos[index].col == S.kbd_edit_info.col1) {
              $("#kbd-advance-key-desc1").css("display", "");
              $("#kbd-advance-key-desc1").css("color", S.theme_color);
              $("#kbd-advance-key-desc1").text(S.kbd_key_infos[index].name);
              break;
            }
          }
          $("#kbd-advance-key-desc-arrow").css("display", "");
          $("#kbd-advance-key-desc-arrow").text(" + ");
          for (let offset = 0; offset < S.kbd_key_infos.length; offset++) {
            if (S.kbd_key_infos[offset].row == S.kbd_edit_info.row2 && S.kbd_key_infos[offset].col == S.kbd_edit_info.col2) {
              $("#kbd-advance-key-desc2").css("display", "");
              $("#kbd-advance-key-desc2").css("color", S.theme_color);
              $("#kbd-advance-key-desc2").text(S.kbd_key_infos[offset].name);
              break;
            }
          }
          var flag2 = false;
          for (let count = 0; count < S.kbd_socd_infos.length; count++) {
            if (S.kbd_key_infos[S.kbd_key_matrix_index].row == S.kbd_socd_infos[count].row1 && S.kbd_key_infos[S.kbd_key_matrix_index].col == S.kbd_socd_infos[count].col1 || S.kbd_key_infos[S.kbd_key_matrix_index].row == S.kbd_socd_infos[count].row2 && S.kbd_key_infos[S.kbd_key_matrix_index].col == S.kbd_socd_infos[count].col2) {
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
        if (S.kbd_key_setting_index == 2) {
          var flag = true;
          for (let len2 = 0; len2 < S.kbd_rs_infos.length; len2++) {
            if (S.kbd_edit_info.row1 == S.kbd_rs_infos[len2].row1 && S.kbd_edit_info.col1 == S.kbd_rs_infos[len2].col1 && S.kbd_edit_info.row2 == S.kbd_rs_infos[len2].row2 && S.kbd_edit_info.col2 == S.kbd_rs_infos[len2].col2) {
              flag = false;
              break;
            }
          }
          if (S.kbd_select_elementId.length > 0) {
            $("#kbd-advance-key-desc1").text(S.kbd_key_infos[S.kbd_key_matrix_index].name);
          }
          if (S.kbd_edit_info.row1 >= 0 && S.kbd_edit_info.col1 >= 0 && S.kbd_edit_info.row2 >= 0 && S.kbd_edit_info.col2 >= 0) {
            for (let len3 = 0; len3 < S.kbd_key_infos.length; len3++) {
              if (S.kbd_key_infos[len3].row == S.kbd_edit_info.row1 && S.kbd_key_infos[len3].col == S.kbd_edit_info.col1) {
                $("#kbd-advance-key-desc1").css("display", "");
                $("#kbd-advance-key-desc1").css("color", S.theme_color);
                $("#kbd-advance-key-desc1").text(S.kbd_key_infos[len3].name);
                break;
              }
            }
            $("#kbd-advance-key-desc-arrow").css("display", "");
            $("#kbd-advance-key-desc-arrow").text(" + ");
            for (let len4 = 0; len4 < S.kbd_key_infos.length; len4++) {
              if (S.kbd_key_infos[len4].row == S.kbd_edit_info.row2 && S.kbd_key_infos[len4].col == S.kbd_edit_info.col2) {
                $("#kbd-advance-key-desc2").css("display", "");
                $("#kbd-advance-key-desc2").css("color", S.theme_color);
                $("#kbd-advance-key-desc2").text(S.kbd_key_infos[len4].name);
                break;
              }
            }
            var flag2 = false;
            for (let len5 = 0; len5 < S.kbd_rs_infos.length; len5++) {
              if (S.kbd_key_infos[S.kbd_key_matrix_index].row == S.kbd_rs_infos[len5].row1 && S.kbd_key_infos[S.kbd_key_matrix_index].col == S.kbd_rs_infos[len5].col1 || S.kbd_key_infos[S.kbd_key_matrix_index].row == S.kbd_rs_infos[len5].row2 && S.kbd_key_infos[S.kbd_key_matrix_index].col == S.kbd_rs_infos[len5].col2) {
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
          if (S.kbd_key_setting_index == 1) {
            var flag = true;
            for (let len6 = 0; len6 < S.kbd_mt_infos.length; len6++) {
              if (S.kbd_edit_info.row == S.kbd_mt_infos[len6].row && S.kbd_edit_info.col == S.kbd_mt_infos[len6].col && S.kbd_edit_info.tap_time == S.kbd_mt_infos[len6].tap_time && S.kbd_edit_info.keyCode1 == S.kbd_mt_infos[len6].keyCode1 && S.kbd_edit_info.keyCode2 == S.kbd_mt_infos[len6].keyCode2) {
                flag = false;
                break;
              }
            }
            $("#kbd-advance-key-desc1").text(S.kbd_key_infos[S.kbd_key_matrix_index].name);
            if (S.kbd_edit_info.keyCode1 > 1 && S.kbd_edit_info.keyCode2 > 1) {
              if (S.kbd_key_infos[S.kbd_key_matrix_index].row == S.kbd_edit_info.row && S.kbd_key_infos[S.kbd_key_matrix_index].col == S.kbd_edit_info.col) {
                $("#kbd-advance-key-desc1").text("MT");
                $("#kbd-advance-key-desc-arrow").css("display", "none");
                $("#kbd-advance-key-desc2").css("display", "none");
                document.getElementById("kbd-advance-key-delete").disabled = false;
              } else {
                $("#kbd-advance-key-desc-arrow").css("display", "");
                $("#kbd-advance-key-desc2").css("display", "");
                $("#kbd-advance-key-desc2").css("color", S.theme_color);
                $("#kbd-advance-key-desc2").text("MT");
              }
              if (flag) {
                document.getElementById("kbd-advance-key-set").disabled = false;
              }
            }
          } else {
            if (S.kbd_key_setting_index == 3) {
              var flag = true;
              for (let len7 = 0; len7 < S.kbd_dks_infos.length; len7++) {
                if (S.kbd_edit_info.row == S.kbd_dks_infos[len7].row && S.kbd_edit_info.col == S.kbd_dks_infos[len7].col && S.kbd_edit_info.keyCode1 == S.kbd_dks_infos[len7].keyCode1 && S.kbd_edit_info.state1 == S.kbd_dks_infos[len7].state1 && S.kbd_edit_info.keyCode2 == S.kbd_dks_infos[len7].keyCode2 && S.kbd_edit_info.state2 == S.kbd_dks_infos[len7].state2 && S.kbd_edit_info.keyCode3 == S.kbd_dks_infos[len7].keyCode3 && S.kbd_edit_info.state3 == S.kbd_dks_infos[len7].state3 && S.kbd_edit_info.keyCode4 == S.kbd_dks_infos[len7].keyCode4 && S.kbd_edit_info.state4 == S.kbd_dks_infos[len7].state4) {
                  flag = false;
                  break;
                }
              }
              $("#kbd-advance-key-desc1").text(S.kbd_key_infos[S.kbd_key_matrix_index].name);
              if (S.kbd_edit_info.keyCode1 > 1 && S.kbd_edit_info.state1 > 0 || S.kbd_edit_info.keyCode2 > 1 && S.kbd_edit_info.state2 > 0 || S.kbd_edit_info.keyCode3 > 1 && S.kbd_edit_info.state3 > 0 || S.kbd_edit_info.keyCode4 > 1 && S.kbd_edit_info.state4 > 0) {
                if (S.kbd_key_infos[S.kbd_key_matrix_index].row == S.kbd_edit_info.row && S.kbd_key_infos[S.kbd_key_matrix_index].col == S.kbd_edit_info.col) {
                  $("#kbd-advance-key-desc1").text("DKS");
                  $("#kbd-advance-key-desc-arrow").css("display", "none");
                  $("#kbd-advance-key-desc2").css("display", "none");
                  document.getElementById("kbd-advance-key-delete").disabled = false;
                } else {
                  $("#kbd-advance-key-desc-arrow").css("display", "");
                  $("#kbd-advance-key-desc2").css("display", "");
                  $("#kbd-advance-key-desc2").css("color", S.theme_color);
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
    var value = 13;
    if (is_keyboard_5_15(client.device)) {
      value = 14;
    }
    var html2 = '<div class="layui-row" style="margin-top: 10px;">';
    for (let len = 0; len < S.kbd_key_infos.length; len++) {
      var value2 = S.kbd_key_infos[len].name;
      var value3 = S.kbd_key_infos[len].rect;
      var x = value3[0];
      var value4 = value3[1];
      var value5 = value3[2];
      var value6 = value3[3];
      var value7 = S.kbd_key_infos[len].row;
      var value8 = S.kbd_key_infos[len].col;
      var offset = 0;
      var value9 = (value5 - offset) / 2;
      var str = "";
      for (let index = 0; index < S.kbd_socd_infos.length; index++) {
        if (value7 == S.kbd_socd_infos[index].row1 && value8 == S.kbd_socd_infos[index].col1 || value7 == S.kbd_socd_infos[index].row2 && value8 == S.kbd_socd_infos[index].col2) {
          str = "SOCD";
          break;
        }
      }
      for (let count = 0; count < S.kbd_mt_infos.length; count++) {
        if (value7 == S.kbd_mt_infos[count].row && value8 == S.kbd_mt_infos[count].col) {
          str = "MT";
          break;
        }
      }
      for (let len2 = 0; len2 < S.kbd_dks_infos.length; len2++) {
        if (value7 == S.kbd_dks_infos[len2].row && value8 == S.kbd_dks_infos[len2].col) {
          str = "DKS";
          break;
        }
      }
      for (let len3 = 0; len3 < S.kbd_rs_infos.length; len3++) {
        if (value7 == S.kbd_rs_infos[len3].row1 && value8 == S.kbd_rs_infos[len3].col1 || value7 == S.kbd_rs_infos[len3].row2 && value8 == S.kbd_rs_infos[len3].col2) {
          str = "RS";
          break;
        }
      }
      var flag = false;
      if (S.kbd_key_setting_index == 0) {
        if (S.kbd_select_elementId.length > 0) {
          if (str == "SOCD") {
            flag = true;
          }
        }
        if (str == "MT" || str == "RS" || str == "DKS") {
          flag = true;
        }
      } else {
        if (S.kbd_key_setting_index == 2) {
          if (S.kbd_select_elementId.length > 0) {
            if (str == "RS") {
              flag = true;
            }
          }
          if (str == "SOCD" || str == "MT" || str == "DKS") {
            flag = true;
          }
        } else {
          if (S.kbd_key_setting_index == 1) {
            if (str == "SOCD" || str == "RS" || str == "DKS") {
              flag = true;
            }
          } else if (S.kbd_key_setting_index == 3) {
            if (str == "SOCD" || str == "MT" || str == "RS") {
              flag = true;
            }
          }
        }
      }
      html2 += '<div class="layui-col-xs3" style="width:' + value5 + "px; height:" + value6 + "px; margin-left:" + x + "px; margin-top:" + value4 + 'px; ">';
      if (flag) {
        html2 += '<a kbd-key-matrix-index="-1"kbd-advance-key-matrix-action="select" style="cursor: not-allowed;">';
        html2 += '<div style="width:' + value5 + "px; height:" + value6 + 'px;">';
        html2 += '<div style="justify-content: center; align-items: center; position: absolute; width:' + value5 + "px; height:" + value6 + 'px;">';
        " ";
      } else {
        html2 += '<a kbd-key-matrix-index="' + len + '"kbd-advance-key-matrix-action="select" style="cursor: pointer;">';
        html2 += '<div style="width:' + value5 + "px; height:" + value6 + 'px;">';
        html2 += '<div class="layui-hover-bg-trans" style="justify-content: center; align-items: center; position: absolute; width:' + value5 + "px; height:" + value6 + 'px;">';
        " ";
      }
      if (str == "SOCD") {
        offset = 8;
        value9 = (value5 - offset) / 2;
        if (is_keyboard_5_15(client.device)) {
          html2 += '<p style="user-select: none;font-size: smaller;color:orange;text-align: center; margin-top: 10px;" >' + str + "</p>";
        } else {
          html2 += '<p style="user-select: none;font-size: small;color:orange;text-align: center; margin-top: 16px;" >' + str + "</p>";
        }
        html2 += '<div id="key-color" style="background-color: orange; margin-top: 6px; margin-left:' + value9 + "px; width:" + offset + 'px; height:2px;">';
        " ";
      } else {
        if (str == "MT") {
          offset = 8;
          value9 = (value5 - offset) / 2;
          if (is_keyboard_5_15(client.device)) {
            html2 += '<p style="user-select: none;font-size: smaller;color:orange;text-align: center; margin-top: 10px;" >' + str + "</p>";
          } else {
            html2 += '<p style="user-select: none;font-size: small;color:orange;text-align: center; margin-top: 16px;" >' + str + "</p>";
          }
          html2 += '<div id="key-color" style="background-color: orange; margin-top: 6px; margin-left:' + value9 + "px; width:" + offset + 'px; height:2px;">';
          " ";
        } else {
          if (str == "RS") {
            offset = 8;
            value9 = (value5 - offset) / 2;
            if (is_keyboard_5_15(client.device)) {
              html2 += '<p style="user-select: none;font-size: smaller;color:orange;text-align: center; margin-top: 10px;" >' + str + "</p>";
            } else {
              html2 += '<p style="user-select: none;font-size: small;color:orange;text-align: center; margin-top: 16px;" >' + str + "</p>";
            }
            html2 += '<div id="key-color" style="background-color: orange; margin-top: 6px; margin-left:' + value9 + "px; width:" + offset + 'px; height:2px;">';
            " ";
          } else if (str == "DKS") {
            offset = 8;
            value9 = (value5 - offset) / 2;
            if (is_keyboard_5_15(client.device)) {
              html2 += '<p style="user-select: none;font-size: smaller;color:orange;text-align: center; margin-top: 10px;" >' + str + "</p>";
            } else {
              html2 += '<p style="user-select: none;font-size: small;color:orange;text-align: center; margin-top: 16px;" >' + str + "</p>";
            }
            html2 += '<div id="key-color" style="background-color: orange; margin-top: 6px; margin-left:' + value9 + "px; width:" + offset + 'px; height:2px;">';
            " ";
          } else {
            if (is_keyboard_5_15(client.device)) {
              html2 += '<p style="user-select: none;font-size: smaller;color:white;text-align: center; margin-top: 10px;" >' + value2 + "</p>";
            } else {
              html2 += '<p style="user-select: none;font-size: small;color:white;text-align: center; margin-top: 16px;" >' + value2 + "</p>";
            }
            html2 += '<div id="key-color" style="background-color: transparent; margin-top: 6px; margin-left:' + value9 + "px; width:" + offset + 'px; height:2px;">';
            " ";
          }
        }
      }
      html2 += "</div>";
      html2 += "</div>";
      if (S.kbd_key_setting_index == 0) {
        if (str == "SOCD") {
          if (S.kbd_key_matrix_index == len) {
            html2 += '<div class="layui-key-select-red" style="position: absolute; width:' + (value5 - 3) + "px; height:" + (value6 - 3) + 'px;">';
            " ";
            html2 += "</div>";
          }
        }
      } else if (S.kbd_key_setting_index == 2) {
        if (str == "RS") {
          if (S.kbd_key_matrix_index == len) {
            html2 += '<div class="layui-key-select-red" style="position: absolute; width:' + (value5 - 3) + "px; height:" + (value6 - 3) + 'px;">';
            " ";
            html2 += "</div>";
          }
        }
      } else if (!flag && S.kbd_key_matrix_index == len) {
        html2 += '<div class="layui-key-select-red" style="position: absolute; width:' + (value5 - 3) + "px; height:" + (value6 - 3) + 'px;">';
        " ";
        html2 += "</div>";
      }
      html2 += "</div>";
      html2 += "</a>";
      html2 += "</div>";
      if (len == value) {
        html2 += '</div><div class="layui-row">';
      }
    }
    ;
    html2 += "</div>";
    $("#kbd-mapping-advance-key-container").html(html2);
  }
  function kbd_ui_refresh_socd(client) {
    document.getElementById("kbd-socd-key1").style.color = "";
    document.getElementById("kbd-socd-key1").style.borderColor = "gray";
    document.getElementById("kbd-socd-key1").style.backgroundColor = "transparent";
    document.getElementById("kbd-socd-key1").textContent = layui.i18np.prop("STRID_KBD_SOCD_KEY1");
    document.getElementById("kbd-socd-key2").style.color = "";
    document.getElementById("kbd-socd-key2").style.borderColor = "gray";
    document.getElementById("kbd-socd-key2").style.backgroundColor = "transparent";
    document.getElementById("kbd-socd-key2").textContent = layui.i18np.prop("STRID_KBD_SOCD_KEY2");
    $('[name="kbd-socd-type"]')[0].checked = true;
    if (is_dark_theme()) {
      document.getElementById("kbd-socd-key1").className = "layui-btn layui-key-desc-button";
      document.getElementById("kbd-socd-key2").className = "layui-btn layui-key-desc-button";
    } else {
      document.getElementById("kbd-socd-key1").className = "layui-btn layui-key-desc-button-light";
      document.getElementById("kbd-socd-key2").className = "layui-btn layui-key-desc-button-light";
    }
    S.kbd_edit_info = kbd_create_socd_info();
    if (S.kbd_key_matrix_index > 0) {
      for (let len = 0; len < S.kbd_socd_infos.length; len++) {
        if (S.kbd_key_infos[S.kbd_key_matrix_index].row == S.kbd_socd_infos[len].row1 && S.kbd_key_infos[S.kbd_key_matrix_index].col == S.kbd_socd_infos[len].col1 || S.kbd_key_infos[S.kbd_key_matrix_index].row == S.kbd_socd_infos[len].row2 && S.kbd_key_infos[S.kbd_key_matrix_index].col == S.kbd_socd_infos[len].col2) {
          S.kbd_edit_info = kbd_clone_socd_info(S.kbd_socd_infos[len]);
          break;
        }
      }
    }
    if (S.kbd_edit_info.row1 >= 0 && S.kbd_edit_info.col1 >= 0) {
      for (let index = 0; index < S.kbd_key_infos.length; index++) {
        var value = S.kbd_key_infos[index].name;
        var value2 = S.kbd_key_infos[index].row;
        var value3 = S.kbd_key_infos[index].col;
        if (S.kbd_edit_info.row1 == value2 && S.kbd_edit_info.col1 == value3) {
          document.getElementById("kbd-socd-key1").textContent = value;
          document.getElementById("kbd-socd-key1").style.borderColor = "#16B777";
          break;
        }
      }
    }
    if (S.kbd_edit_info.row2 >= 0 && S.kbd_edit_info.col2 >= 0) {
      for (let offset = 0; offset < S.kbd_key_infos.length; offset++) {
        var value = S.kbd_key_infos[offset].name;
        var value2 = S.kbd_key_infos[offset].row;
        var value3 = S.kbd_key_infos[offset].col;
        if (S.kbd_edit_info.row2 == value2 && S.kbd_edit_info.col2 == value3) {
          document.getElementById("kbd-socd-key2").textContent = value;
          document.getElementById("kbd-socd-key2").style.borderColor = "#16B777";
          break;
        }
      }
    }
    if (S.kbd_edit_info.socd_mode >= 0 && S.kbd_edit_info.socd_mode < 4) {
      $('[name="kbd-socd-type"]')[S.kbd_edit_info.socd_mode].checked = true;
    }
  }
  function kbd_ui_refresh_mt(client) {
    S.kbd_edit_info = kbd_create_mt_info();
    if (S.kbd_key_matrix_index > 0) {
      for (let len = 0; len < S.kbd_mt_infos.length; len++) {
        if (S.kbd_key_infos[S.kbd_key_matrix_index].row == S.kbd_mt_infos[len].row && S.kbd_key_infos[S.kbd_key_matrix_index].col == S.kbd_mt_infos[len].col) {
          S.kbd_edit_info = kbd_clone_mt_info(S.kbd_mt_infos[len]);
          break;
        }
      }
    }
    if (S.kbd_edit_info.keyCode1 > 1) {
      document.getElementById("kbd-mt-key1").style.borderColor = "#16B777";
      document.getElementById("kbd-mt-key1").textContent = get_key_name_from_keyid(S.kbd_edit_info.keyCode1);
    } else {
      document.getElementById("kbd-mt-key1").style.borderColor = "gray";
      document.getElementById("kbd-mt-key1").textContent = layui.i18np.prop("STRID_KBD_MT_SELECT_KEY");
    }
    if (S.kbd_edit_info.keyCode2 > 1) {
      document.getElementById("kbd-mt-key2").style.borderColor = "#16B777";
      document.getElementById("kbd-mt-key2").textContent = get_key_name_from_keyid(S.kbd_edit_info.keyCode2);
    } else {
      document.getElementById("kbd-mt-key2").style.borderColor = "gray";
      document.getElementById("kbd-mt-key2").textContent = layui.i18np.prop("STRID_KBD_MT_SELECT_KEY");
    }
    if (is_dark_theme()) {
      document.getElementById("kbd-mt-key1").className = "layui-btn layui-key-desc-button";
      document.getElementById("kbd-mt-key2").className = "layui-btn layui-key-desc-button";
    } else {
      document.getElementById("kbd-mt-key1").className = "layui-btn layui-key-desc-button-light";
      document.getElementById("kbd-mt-key2").className = "layui-btn layui-key-desc-button-light";
    }
    var layui2 = layui.slider;
    var value = layui2.render({
      "elem": "#kbd-mt-longpress-time",
      "min": 100,
      "max": 500,
      "step": 1,
      "value": S.kbd_edit_info.tap_time,
      "input": true,
      "tips": false,
      "theme": S.theme_color,
      "done": function(result) {
        if (result != void 0) {
          S.kbd_edit_info.tap_time = result;
        }
      }
    });
    value.setValue(S.kbd_edit_info.tap_time);
  }
  function kbd_ui_refresh_rs(client) {
    document.getElementById("kbd-rs-key1").style.color = "";
    document.getElementById("kbd-rs-key1").style.borderColor = "gray";
    document.getElementById("kbd-rs-key1").style.backgroundColor = "transparent";
    document.getElementById("kbd-rs-key1").textContent = layui.i18np.prop("STRID_KBD_SOCD_KEY1");
    document.getElementById("kbd-rs-key2").style.color = "";
    document.getElementById("kbd-rs-key2").style.borderColor = "gray";
    document.getElementById("kbd-rs-key2").style.backgroundColor = "transparent";
    document.getElementById("kbd-rs-key2").textContent = layui.i18np.prop("STRID_KBD_SOCD_KEY2");
    if (is_dark_theme()) {
      document.getElementById("kbd-rs-key1").className = "layui-btn layui-key-desc-button";
      document.getElementById("kbd-rs-key2").className = "layui-btn layui-key-desc-button";
    } else {
      document.getElementById("kbd-rs-key1").className = "layui-btn layui-key-desc-button-light";
      document.getElementById("kbd-rs-key2").className = "layui-btn layui-key-desc-button-light";
    }
    S.kbd_edit_info = kbd_create_rs_info();
    if (S.kbd_key_matrix_index > 0) {
      for (let len = 0; len < S.kbd_rs_infos.length; len++) {
        if (S.kbd_key_infos[S.kbd_key_matrix_index].row == S.kbd_rs_infos[len].row1 && S.kbd_key_infos[S.kbd_key_matrix_index].col == S.kbd_rs_infos[len].col1 || S.kbd_key_infos[S.kbd_key_matrix_index].row == S.kbd_rs_infos[len].row2 && S.kbd_key_infos[S.kbd_key_matrix_index].col == S.kbd_rs_infos[len].col2) {
          S.kbd_edit_info = kbd_clone_rs_info(S.kbd_rs_infos[len]);
          break;
        }
      }
    }
    if (S.kbd_edit_info.row1 >= 0 && S.kbd_edit_info.col1 >= 0) {
      for (let index = 0; index < S.kbd_key_infos.length; index++) {
        var value = S.kbd_key_infos[index].name;
        var value2 = S.kbd_key_infos[index].row;
        var value3 = S.kbd_key_infos[index].col;
        if (S.kbd_edit_info.row1 == value2 && S.kbd_edit_info.col1 == value3) {
          document.getElementById("kbd-rs-key1").textContent = value;
          document.getElementById("kbd-rs-key1").style.borderColor = "#16B777";
          break;
        }
      }
    }
    if (S.kbd_edit_info.row2 >= 0 && S.kbd_edit_info.col2 >= 0) {
      for (let offset = 0; offset < S.kbd_key_infos.length; offset++) {
        var value = S.kbd_key_infos[offset].name;
        var value2 = S.kbd_key_infos[offset].row;
        var value3 = S.kbd_key_infos[offset].col;
        if (S.kbd_edit_info.row2 == value2 && S.kbd_edit_info.col2 == value3) {
          document.getElementById("kbd-rs-key2").textContent = value;
          document.getElementById("kbd-rs-key2").style.borderColor = "#16B777";
          break;
        }
      }
    }
  }
  function kbd_ui_refresh_dks(client) {
    S.kbd_edit_info = kbd_create_dks_info();
    if (S.kbd_key_matrix_index > 0) {
      for (let len = 0; len < S.kbd_dks_infos.length; len++) {
        if (S.kbd_key_infos[S.kbd_key_matrix_index].row == S.kbd_dks_infos[len].row && S.kbd_key_infos[S.kbd_key_matrix_index].col == S.kbd_dks_infos[len].col) {
          S.kbd_edit_info = kbd_clone_dks_info(S.kbd_dks_infos[len]);
          break;
        }
      }
    }
    if (S.kbd_edit_info.keyCode1 > 1) {
      document.getElementById("kbd-dks-key1").style.borderColor = "#16B777";
      document.getElementById("kbd-dks-key1").textContent = get_key_name_from_keyid(S.kbd_edit_info.keyCode1);
      kbd_ui_refresh_dks_step(1, S.kbd_edit_info.state1);
    } else {
      document.getElementById("kbd-dks-key1").style.borderColor = "gray";
      document.getElementById("kbd-dks-key1").textContent = layui.i18np.prop("STRID_KBD_MT_SELECT_KEY");
      kbd_ui_refresh_dks_step(1, 0);
    }
    if (S.kbd_edit_info.keyCode2 > 1) {
      document.getElementById("kbd-dks-key2").style.borderColor = "#16B777";
      document.getElementById("kbd-dks-key2").textContent = get_key_name_from_keyid(S.kbd_edit_info.keyCode2);
      kbd_ui_refresh_dks_step(2, S.kbd_edit_info.state2);
    } else {
      document.getElementById("kbd-dks-key2").style.borderColor = "gray";
      document.getElementById("kbd-dks-key2").textContent = layui.i18np.prop("STRID_KBD_MT_SELECT_KEY");
      kbd_ui_refresh_dks_step(2, 0);
    }
    if (S.kbd_edit_info.keyCode3 > 1) {
      document.getElementById("kbd-dks-key3").style.borderColor = "#16B777";
      document.getElementById("kbd-dks-key3").textContent = get_key_name_from_keyid(S.kbd_edit_info.keyCode3);
      kbd_ui_refresh_dks_step(3, S.kbd_edit_info.state3);
    } else {
      document.getElementById("kbd-dks-key3").style.borderColor = "gray";
      document.getElementById("kbd-dks-key3").textContent = layui.i18np.prop("STRID_KBD_MT_SELECT_KEY");
      kbd_ui_refresh_dks_step(3, 0);
    }
    if (S.kbd_edit_info.keyCode4 > 1) {
      document.getElementById("kbd-dks-key4").style.borderColor = "#16B777";
      document.getElementById("kbd-dks-key4").textContent = get_key_name_from_keyid(S.kbd_edit_info.keyCode4);
      kbd_ui_refresh_dks_step(4, S.kbd_edit_info.state4);
    } else {
      document.getElementById("kbd-dks-key4").style.borderColor = "gray";
      document.getElementById("kbd-dks-key4").textContent = layui.i18np.prop("STRID_KBD_MT_SELECT_KEY");
      kbd_ui_refresh_dks_step(4, 0);
    }
    if (is_dark_theme()) {
      document.getElementById("kbd-dks-key1").className = "layui-btn layui-key-desc-button";
      document.getElementById("kbd-dks-key2").className = "layui-btn layui-key-desc-button";
      document.getElementById("kbd-dks-key3").className = "layui-btn layui-key-desc-button";
      document.getElementById("kbd-dks-key4").className = "layui-btn layui-key-desc-button";
    } else {
      document.getElementById("kbd-dks-key1").className = "layui-btn layui-key-desc-button-light";
      document.getElementById("kbd-dks-key2").className = "layui-btn layui-key-desc-button-light";
      document.getElementById("kbd-dks-key3").className = "layui-btn layui-key-desc-button-light";
      document.getElementById("kbd-dks-key4").className = "layui-btn layui-key-desc-button-light";
    }
  }
  function kbd_ui_refresh_dks_dragging(client, dragIndex) {
    var value = Math.floor(S.kbd_dks_dragging_name / 10);
    var value2 = S.kbd_dks_dragging_name % 10;
    var el = "kbd-dks-key" + value + "-" + value2;
    var el2 = "#kbd-dks-arrow" + value + "-" + value2;
    var value3 = 24 + client;
    if (value2 == 1) {
      if (value3 >= 260) {
        value3 = 264;
      }
    } else {
      if (value2 == 2) {
        if (value3 >= 180) {
          value3 = 184;
        }
      } else {
        if (value2 == 3) {
          if (value3 >= 100) {
            value3 = 104;
          }
        } else if (value2 == 4) {
          value3 = 24;
        }
      }
    }
    if (dragIndex) {
      var offset = 0;
      if (value == 1) {
        offset = S.kbd_edit_info.state1;
      } else {
        if (value == 2) {
          offset = S.kbd_edit_info.state2;
        } else {
          if (value == 3) {
            offset = S.kbd_edit_info.state3;
          } else if (value == 4) {
            offset = S.kbd_edit_info.state4;
          }
        }
      }
      if (value2 == 1) {
        if (value3 < 40) {
          value3 = 24;
          offset = offset | 1;
        } else {
          if (value3 >= 40 && value3 < 100) {
            value3 = 77;
            offset = offset | 1 | 2;
          } else {
            if (value3 >= 100 && value3 < 120) {
              value3 = 104;
              offset = offset | 1 | 2 | 4 | 8;
            } else {
              if (value3 >= 120 && value3 < 180) {
                value3 = 157;
                offset = offset | 1 | 2 | 4 | 8 | 16;
              } else {
                if (value3 >= 180 && value3 < 200) {
                  value3 = 184;
                  offset = offset | 1 | 2 | 4 | 8 | 16 | 32 | 64;
                } else {
                  if (value3 >= 200 && value3 < 260) {
                    value3 = 237;
                    offset = offset | 1 | 2 | 4 | 8 | 16 | 32 | 64 | 128;
                  } else if (value3 >= 260) {
                    value3 = 264;
                    offset = offset | 1 | 2 | 4 | 8 | 16 | 32 | 64 | 128 | 256 | 512;
                  }
                }
              }
            }
          }
        }
      } else {
        if (value2 == 2) {
          if (value3 < 40) {
            value3 = 24;
            offset = offset | 8;
          } else {
            if (value3 >= 40 && value3 < 100) {
              value3 = 77;
              offset = offset | 8 | 16;
            } else {
              if (value3 >= 100 && value3 < 120) {
                value3 = 104;
                offset = offset | 8 | 16 | 32 | 64;
              } else {
                if (value3 >= 120 && value3 < 180) {
                  value3 = 157;
                  offset = offset | 8 | 16 | 32 | 64 | 128;
                } else if (value3 >= 180 && value3 < 200) {
                  value3 = 184;
                  offset = offset | 8 | 16 | 32 | 64 | 128 | 256 | 512;
                }
              }
            }
          }
        } else {
          if (value2 == 3) {
            if (value3 < 40) {
              value3 = 24;
              offset = offset | 64;
            } else {
              if (value3 >= 40 && value3 < 100) {
                value3 = 77;
                offset = offset | 64 | 128;
              } else if (value3 >= 100 && value3 < 120) {
                value3 = 104;
                offset = offset | 64 | 128 | 256 | 512;
              }
            }
          } else if (value2 == 3) {
            value3 = 24;
            offset = offset | 512;
          }
        }
      }
      if (value == 1) {
        S.kbd_edit_info.state1 = offset;
      } else {
        if (value == 2) {
          S.kbd_edit_info.state2 = offset;
        } else {
          if (value == 3) {
            S.kbd_edit_info.state3 = offset;
          } else if (value == 4) {
            S.kbd_edit_info.state4 = offset;
          }
        }
      }
      kbd_ui_refresh_advance_key_desc(DS.current_usb_client);
    }
    document.getElementById(el).className = "rounded-border-green";
    $("#" + el).css("width", value3);
    $(el2).css("margin-left", value3 - 10);
  }
  function kbd_ui_refresh_dks_step(client, stepIndex) {
    for (let len = 1; len < 5; len++) {
      var value = "kbd-dks-key" + client + "-" + len;
      var el = "#kbd-dks-add" + client + "-" + len;
      var value2 = "#kbd-dks-arrow" + client + "-" + len;
      document.getElementById(value).className = "rounded-border";
      $("#" + value).css("width", "20");
      $(el).css("display", "");
      $(value2).css("display", "none");
    }
    if ((stepIndex & 1) != 0) {
      var value = "kbd-dks-key" + client + "-1";
      var el = "#kbd-dks-add" + client + "-1";
      var value2 = "#kbd-dks-arrow" + client + "-1";
      var value3 = 24;
      if ((stepIndex & 2) != 0) {
        value3 = 78;
        if ((stepIndex & 4) != 0 && (stepIndex & 8) != 0) {
          value3 = 104;
          if ((stepIndex & 16) != 0) {
            value3 = 158;
            if ((stepIndex & 32) != 0 && (stepIndex & 64) != 0) {
              value3 = 184;
              if ((stepIndex & 128) != 0) {
                value3 = 238;
                if ((stepIndex & 256) != 0 && (stepIndex & 512) != 0) {
                  value3 = 264;
                }
              }
            }
          }
        }
      }
      document.getElementById(value).className = "rounded-border-green";
      $("#" + value).css("width", value3);
      $(value2).css("margin-left", value3 - 10);
      $(el).css("display", "none");
      $(value2).css("display", "");
    }
    if ((stepIndex & 8) != 0) {
      var value = "kbd-dks-key" + client + "-2";
      var el = "#kbd-dks-add" + client + "-2";
      var value2 = "#kbd-dks-arrow" + client + "-2";
      var value3 = 24;
      if ((stepIndex & 16) != 0) {
        value3 = 78;
        if ((stepIndex & 32) != 0 && (stepIndex & 64) != 0) {
          value3 = 104;
          if ((stepIndex & 128) != 0) {
            value3 = 158;
            if ((stepIndex & 256) != 0 && (stepIndex & 512) != 0) {
              value3 = 184;
            }
          }
        }
      }
      document.getElementById(value).className = "rounded-border-green";
      $("#" + value).css("width", value3);
      $(value2).css("margin-left", value3 - 10);
      $(el).css("display", "none");
      $(value2).css("display", "");
    }
    if ((stepIndex & 64) != 0) {
      var value = "kbd-dks-key" + client + "-3";
      var el = "#kbd-dks-add" + client + "-3";
      var value2 = "#kbd-dks-arrow" + client + "-3";
      var value3 = 24;
      if ((stepIndex & 128) != 0) {
        value3 = 78;
        if ((stepIndex & 256) != 0 && (stepIndex & 512) != 0) {
          value3 = 104;
        }
      }
      document.getElementById(value).className = "rounded-border-green";
      $("#" + value).css("width", value3);
      $(value2).css("margin-left", value3 - 10);
      $(el).css("display", "none");
      $(value2).css("display", "");
    }
    if ((stepIndex & 512) != 0) {
      var value = "kbd-dks-key" + client + "-4";
      var el = "#kbd-dks-add" + client + "-4";
      var value2 = "#kbd-dks-arrow" + client + "-4";
      var value3 = 24;
      document.getElementById(value).className = "rounded-border-green";
      $("#" + value).css("width", value3);
      $(value2).css("margin-left", value3 - 10);
      $(el).css("display", "none");
      $(value2).css("display", "");
    }
  }
  function kbd_ui_refresh_more(client) {
    $("#kbd-fireware-current-version").text(layui.i18np.prop("STRID_KBD_CURRENT_VERTION") + " " + DS.current_usb_client.device_info.revision);
    $("#kbd-fireware-download").css("display", "none");
    $("#kbd-fireware-new-version-hint").css("display", "none");
  }
  function kbd_ui_refresh_main_setting(client) {
    $("#kbd-main-setting-key").css("color", "");
    $("#kbd-main-setting-axis").css("color", "");
    $("#kbd-main-setting-advance-key").css("color", "");
    $("#kbd-main-setting-light").css("color", "");
    $("#kbd-main-setting-more").css("color", "");
    if (is_dark_theme()) {
      document.getElementById("kbd-main-setting-key-icon").src = RESOURCE_URL + "setting/kbd/kbd_key_normal.png";
      document.getElementById("kbd-main-setting-axis-icon").src = RESOURCE_URL + "setting/kbd/kbd_axis_normal.png";
      document.getElementById("kbd-main-setting-advance-key-icon").src = RESOURCE_URL + "setting/kbd/kbd_advance_key_normal.png";
      document.getElementById("kbd-main-setting-light-icon").src = RESOURCE_URL + "setting/kbd/kbd_light_normal.png";
      document.getElementById("kbd-main-setting-more-icon").src = RESOURCE_URL + "setting/kbd/kbd_more_normal.png";
    } else {
      document.getElementById("kbd-main-setting-key-icon").src = RESOURCE_URL + "setting/kbd/light/kbd_key_normal.png";
      document.getElementById("kbd-main-setting-axis-icon").src = RESOURCE_URL + "setting/kbd/light/kbd_axis_normal.png";
      document.getElementById("kbd-main-setting-advance-key-icon").src = RESOURCE_URL + "setting/kbd/light/kbd_advance_key_normal.png";
      document.getElementById("kbd-main-setting-light-icon").src = RESOURCE_URL + "setting/kbd/light/kbd_light_normal.png";
      document.getElementById("kbd-main-setting-more-icon").src = RESOURCE_URL + "setting/kbd/light/kbd_more_normal.png";
    }
    if (client == 0) {
      $("#kbd-main-setting-key").css("color", "#00f6ff");
      document.getElementById("kbd-main-setting-key-icon").src = RESOURCE_URL + "setting/kbd/kbd_key_selected.png";
    } else {
      if (client == 1) {
        $("#kbd-main-setting-light").css("color", "#00f6ff");
        document.getElementById("kbd-main-setting-light-icon").src = RESOURCE_URL + "setting/kbd/kbd_light_selected.png";
      } else {
        if (client == 2) {
          $("#kbd-main-setting-axis").css("color", "#00f6ff");
          document.getElementById("kbd-main-setting-axis-icon").src = RESOURCE_URL + "setting/kbd/kbd_axis_selected.png";
        } else {
          if (client == 3) {
            $("#kbd-main-setting-advance-key").css("color", "#00f6ff");
            document.getElementById("kbd-main-setting-advance-key-icon").src = RESOURCE_URL + "setting/kbd/kbd_advance_key_selected.png";
          } else if (client == 4) {
            $("#kbd-main-setting-more").css("color", "#00f6ff");
            document.getElementById("kbd-main-setting-more-icon").src = RESOURCE_URL + "setting/kbd/kbd_more_selected.png";
          }
        }
      }
    }
  }
  function kbd_update_setting_tab(client, value) {
    $("#kbd-main-setting-key-container").css("display", "none");
    $("#kbd-main-setting-axis-container").css("display", "none");
    $("#kbd-main-setting-advance-key-container").css("display", "none");
    $("#kbd-main-setting-light-container").css("display", "none");
    $("#kbd-main-setting-more-container").css("display", "none");
    var productHex = get_product_id_hex_str(DS.current_usb_client);
    S.kbd_key_matrix_index = -1;
    S.kbd_matrix_select_keys = [];
    S.kbd_layer_id = 0;
    if (value == 0) {
      $("#kbd-mapping-key-container").css("background-image", "url(" + RESOURCE_URL + "product/" + productHex + "/setting.png)");
      $("#kbd-main-setting-key-container").css("display", "");
      $('[name="kbd-key-layer"]')[0].checked = true;
      S.kbd_key_infos.splice(0, S.kbd_key_infos.length);
      var len = client.device_info.kbd_key_infos;
      if (len.length >= S.kbd_key_num) {
        for (var offset = 0; offset < S.kbd_key_num; offset++) {
          var value2 = len[offset];
          S.kbd_key_infos.push(kbd_clone_pc_key_info(value2));
        }
      }
      kbd_ui_refresh_key_matrix(client);
      kbd_ui_refresh_key_desc(client);
      layui.element.tabChange("kbd-setting-key-type", 0);
    } else {
      if (value == 1) {
        $("#kbd-mapping-light-container").css("background-image", "url(" + RESOURCE_URL + "product/" + productHex + "/setting.png)");
        $("#kbd-main-setting-light-container").css("display", "");
        S.kbd_edit_info = kbd_clone_light_info(client.device_info.kbd_light_info);
        $("#kbd-light-button-container").css("display", "none");
        S.kbd_key_infos.splice(0, S.kbd_key_infos.length);
        var len = client.device_info.kbd_key_infos;
        if (len.length >= S.kbd_key_num) {
          for (var offset = 0; offset < S.kbd_key_num; offset++) {
            var value2 = len[offset];
            S.kbd_key_infos.push(kbd_clone_pc_key_info(value2));
          }
        }
        kbd_ui_refresh_light_matrix(client);
        layui.element.tabChange("kbd-setting-light-type", 0);
      } else {
        if (value == 2) {
          $("#kbd-mapping-axis-container").css("background-image", "url(" + RESOURCE_URL + "product/" + productHex + "/setting.png)");
          $("#kbd-main-setting-axis-container").css("display", "");
          S.kbd_key_infos.splice(0, S.kbd_key_infos.length);
          var len = client.device_info.kbd_key_infos;
          if (len.length >= S.kbd_key_num) {
            for (var offset = 0; offset < S.kbd_key_num; offset++) {
              var value2 = len[offset];
              S.kbd_key_infos.push(kbd_clone_pc_key_info(value2));
            }
          }
          S.kbd_axis_infos.splice(0, S.kbd_axis_infos.length);
          S.kbd_axis_infos = client.device_info.kbd_axis_infos.slice();
          kbd_ui_refresh_axis_matrix(client);
          kbd_ui_refresh_axis(client);
        } else {
          if (value == 3) {
            $("#kbd-mapping-advance-key-container").css("background-image", "url(" + RESOURCE_URL + "product/" + productHex + "/setting.png)");
            $("#kbd-main-setting-advance-key-container").css("display", "");
            S.kbd_key_infos.splice(0, S.kbd_key_infos.length);
            var len = client.device_info.kbd_key_infos;
            if (len.length >= S.kbd_key_num) {
              for (var offset = 0; offset < S.kbd_key_num; offset++) {
                var value2 = len[offset];
                S.kbd_key_infos.push(kbd_clone_pc_key_info(value2));
              }
            }
            S.kbd_socd_infos.splice(0, S.kbd_socd_infos.length);
            var len2 = client.device_info.kbd_socd_infos;
            for (var offset = 0; offset < len2.length; offset++) {
              var value3 = len2[offset];
              S.kbd_socd_infos.push(kbd_clone_socd_info(value3));
            }
            S.kbd_mt_infos.splice(0, S.kbd_mt_infos.length);
            var len3 = client.device_info.kbd_mt_infos;
            for (var offset = 0; offset < len3.length; offset++) {
              var value4 = len3[offset];
              S.kbd_mt_infos.push(kbd_clone_mt_info(value4));
            }
            S.kbd_rs_infos.splice(0, S.kbd_rs_infos.length);
            var len4 = client.device_info.kbd_rs_infos;
            for (var offset = 0; offset < len4.length; offset++) {
              var value5 = len4[offset];
              S.kbd_rs_infos.push(kbd_clone_rs_info(value5));
            }
            S.kbd_dks_infos.splice(0, S.kbd_dks_infos.length);
            var len5 = client.device_info.kbd_dks_infos;
            for (var offset = 0; offset < len5.length; offset++) {
              S.kbd_dks_infos.push(kbd_clone_dks_info(len5[offset]));
            }
            if ($("#kbd-setting-dks-container").css("display") != "none") {
              layui.element.tabChange("kbd-setting-advance-key-type", 3);
            } else {
              if ($("#kbd-setting-mt-container").css("display") != "none") {
                layui.element.tabChange("kbd-setting-advance-key-type", 1);
              } else if ($("#kbd-setting-rs-container").css("display") != "none") {
                layui.element.tabChange("kbd-setting-advance-key-type", 2);
              } else {
                layui.element.tabChange("kbd-setting-advance-key-type", 0);
              }
            }
          } else if (value == 4) {
            $("#kbd-main-setting-more-container").css("display", "");
            kbd_ui_refresh_more(client);
          }
        }
      }
    }
    kbd_ui_refresh_main_setting(value);
  }
  function kbd_update_key_setting_tab(client, value) {
    $("#kbd-setting-key-base-container").css("display", "none");
    $("#kbd-setting-function-container").css("display", "none");
    $("#kbd-setting-macro-container").css("display", "none");
    S.kbd_key_setting_index = value;
    if (value == 0) {
      $("#kbd-setting-key-base-container").css("display", "");
      kbd_ui_key_setting_init(client);
    } else {
      if (value == 1) {
        $("#kbd-setting-function-container").css("display", "flex");
        kbd_ui_function_setting_init(client);
      } else {
        if (value == 2) {
          $("#kbd-setting-macro-container").css("display", "");
          S.kbd_macro_infos.splice(0, S.kbd_macro_infos.length);
          var len = client.device_info.kbd_macro_infos;
          for (var index = 0; index < len.length; index++) {
            S.kbd_macro_infos.push([]);
            var len2 = len[index];
            if (len2.length > 0) {
              for (var offset = 0; offset < len2.length; offset++) {
                S.kbd_macro_infos[index].push(clone_macro_info(len2[offset]));
              }
            }
          }
          S.kbd_macro_select_index = -1;
          S.edit_macros = [];
          kbd_ui_macro_init(client);
          kbd_ui_macro_edit_init(client);
        }
      }
    }
  }
  function kbd_update_light_setting_tab(client, value) {
    $("#kbd-setting-light-container").css("display", "none");
    $("#kbd-setting-light-box-container").css("display", "none");
    S.kbd_key_setting_index = value;
    if (value == 0) {
      $("#kbd-setting-light-container").css("display", "");
      kbd_ui_refresh_light(client);
    } else if (value == 1) {
      $("#kbd-setting-light-box-container").css("display", "");
      kbd_ui_refresh_light_box(client);
    }
  }
  function kbd_update_advance_key_setting_tab(client, value) {
    $("#kbd-setting-dks-container").css("display", "none");
    $("#kbd-setting-socd-container").css("display", "none");
    $("#kbd-setting-mt-container").css("display", "none");
    S.kbd_select_elementId = "";
    S.kbd_key_setting_index = value;
    if (value == 0) {
      $("#kbd-setting-socd-container").css("display", "");
      kbd_ui_refresh_socd(client);
    } else {
      if (value == 1) {
        $("#kbd-setting-mt-container").css("display", "");
        kbd_ui_refresh_mt(client);
      } else {
        if (value == 2) {
          $("#kbd-setting-rs-container").css("display", "");
          kbd_ui_refresh_rs(client);
        } else if (value == 3) {
          $("#kbd-setting-dks-container").css("display", "");
          kbd_ui_refresh_dks(client);
        }
      }
    }
    kbd_ui_refresh_advance_key_matrix(client);
    kbd_ui_refresh_advance_key_desc(client);
  }
  var pressedKeyCodes = [];
  var record_mouse_key_delay_timer_id = void 0;
  document.addEventListener("keydown", function(result) {
    if (S.setting_mapping_key_recording) {
      if (pressedKeyCodes.indexOf(result.key) === -1) {
        setting_mapping_key_recording_add(result.keyCode);
        pressedKeyCodes.push(result.key);
      }
      result.preventDefault();
    } else {
      if (S.setting_macro_edit_recording) {
        if (S.edit_macros.length >= 200) {
          layer.msg(layui.i18np.prop("STRID_SETTING_MAPPING_MACRO_RECORD_MAX_EX"), {
            "icon": 0
          }, function() {
          });
          return;
        }
        var macroInfo = create_macro_info();
        macroInfo.style = 22;
        macroInfo.mouse_key_code = result.keyCode;
        macroInfo.mouse_key_event = 256;
        const now1 = Date.now();
        macroInfo.mouse_key_time = 1;
        if (S.setting_macro_edit_recording_time != -1) {
          S.edit_macros[S.edit_macros.length - 1].mouse_key_time = $('[name="macro-record-fixed-time"]')[0].checked ? 50 : now1 - S.setting_macro_edit_recording_time;
        }
        S.setting_macro_edit_recording_time = now1;
        macroInfo.name = get_key_name_from_code(macroInfo.mouse_key_code);
        S.edit_macros.push(macroInfo);
        ui_refresh_mapping_macro_edit(DS.current_usb_client);
      }
    }
  });
  document.addEventListener("keyup", function(result) {
    if (S.setting_mapping_key_recording) {
      const value = pressedKeyCodes.indexOf(result.key);
      if (value > -1) {
        pressedKeyCodes.splice(value, 1);
      }
      result.preventDefault();
    } else {
      if (S.setting_macro_edit_recording) {
        if (S.edit_macros.length >= 200) {
          layer.msg(layui.i18np.prop("STRID_SETTING_MAPPING_MACRO_RECORD_MAX_EX"), {
            "icon": 0
          }, function() {
          });
          return;
        }
        var macroInfo = create_macro_info();
        macroInfo.style = 22;
        macroInfo.mouse_key_code = result.keyCode;
        macroInfo.mouse_key_event = 257;
        const now2 = Date.now();
        macroInfo.mouse_key_time = 1;
        if (S.setting_macro_edit_recording_time != -1) {
          S.edit_macros[S.edit_macros.length - 1].mouse_key_time = $('[name="macro-record-fixed-time"]')[0].checked ? 50 : now2 - S.setting_macro_edit_recording_time;
        }
        S.setting_macro_edit_recording_time = now2;
        macroInfo.name = get_key_name_from_code(macroInfo.mouse_key_code);
        S.edit_macros.push(macroInfo);
        ui_refresh_mapping_macro_edit(DS.current_usb_client);
      }
    }
  });
  document.addEventListener("mousedown", function(result) {
    if (S.kbd_dks_dragging_name.length > 0) {
      S.kbd_dks_Start_x = result.clientX;
      return;
    }
    if (S.setting_mapping_key_recording) {
      const value = "MouseButton" + result.button;
      if (pressedKeyCodes.indexOf(value) === -1) {
        if (result.button == 0) {
          record_mouse_key_delay_timer_id = setTimeout(function() {
            setting_mapping_key_recording_add(256);
            record_mouse_key_delay_timer_id = void 0;
          }, 200);
        } else {
          if (result.button == 1) {
            setting_mapping_key_recording_add(258);
          } else if (result.button == 2) {
            setting_mapping_key_recording_add(257);
          } else {
            setting_mapping_key_recording_add(255 + result.button + 1);
          }
        }
        pressedKeyCodes.push(value);
      }
      if (result.button != 0) {
        result.preventDefault();
      }
    } else {
      if (S.setting_macro_edit_recording) {
        if (S.edit_macros.length >= 200) {
          layer.msg(layui.i18np.prop("STRID_SETTING_MAPPING_MACRO_RECORD_MAX_EX"), {
            "icon": 0
          }, function() {
          });
          return;
        }
        var i;
        if (result.button == 1) {
          i = 258;
        } else if (result.button == 2) {
          i = 257;
        } else {
          i = 255 + result.button + 1;
        }
        if (result.button != 0) {
          result.preventDefault();
        }
        if (result.button == 0) {
          record_mouse_key_delay_timer_id = setTimeout(function(result2, evtCode, evtTime) {
            setting_mapping_macro_recording_add(result2, evtCode, evtTime);
            record_mouse_key_delay_timer_id = void 0;
          }, 200, i, 256, Date.now());
        } else {
          setting_mapping_macro_recording_add(i, 256, Date.now());
        }
      }
    }
  });
  document.addEventListener("mousemove", function(result) {
    if (S.kbd_dks_dragging_name.length > 0) {
      if (result.clientX - S.kbd_dks_Start_x > 5) {
        S.kbd_dks_dragging = true;
        kbd_ui_refresh_dks_dragging(result.clientX - S.kbd_dks_Start_x, false);
      }
      return;
    }
  });
  document.addEventListener("mouseup", function(result) {
    if (S.kbd_dks_dragging_name.length > 0) {
      kbd_ui_refresh_dks_dragging(result.clientX - S.kbd_dks_Start_x, true);
      S.kbd_dks_dragging_name = "";
      return;
    }
    if (S.setting_mapping_key_recording) {
      const value = "MouseButton" + result.button;
      const value2 = pressedKeyCodes.indexOf(value);
      if (value2 > -1) {
        pressedKeyCodes.splice(value2, 1);
      }
      if (result.button != 0) {
        result.preventDefault();
      }
    } else {
      if (S.setting_macro_edit_recording) {
        if (S.edit_macros.length >= 200) {
          layer.msg(layui.i18np.prop("STRID_SETTING_MAPPING_MACRO_RECORD_MAX_EX"), {
            "icon": 0
          }, function() {
          });
          return;
        }
        var i;
        if (result.button == 1) {
          i = 258;
        } else if (result.button == 2) {
          i = 257;
        } else {
          i = 255 + result.button + 1;
        }
        if (result.button != 0) {
          result.preventDefault();
        }
        if (result.button == 0) {
          record_mouse_key_delay_timer_id = setTimeout(function(result2, evtCode, evtTime) {
            setting_mapping_macro_recording_add(result2, evtCode, evtTime);
            record_mouse_key_delay_timer_id = void 0;
          }, 200, i, 257, Date.now());
        } else {
          setting_mapping_macro_recording_add(i, 257, Date.now());
        }
      }
    }
  });
  document.addEventListener("mousewheel", function(result) {
    if (DS.current_usb_client != void 0 ? is_hs_keyboard(DS.current_usb_client.device) : false) {
      return;
    }
    if (S.setting_mapping_key_recording) {
      if (result.deltaY < 0) {
        setting_mapping_key_recording_add(1024);
      } else if (result.deltaY > 0) {
        setting_mapping_key_recording_add(1025);
      }
      if (result.deltaX < 0) {
        setting_mapping_key_recording_add(1027);
      } else if (result.deltaX > 0) {
        setting_mapping_key_recording_add(1026);
      }
    } else {
      if (S.setting_macro_edit_recording) {
        if (macro_keys.length >= 200) {
          layer.msg(layui.i18np.prop("STRID_SETTING_MAPPING_MACRO_RECORD_MAX_EX"), {
            "icon": 0
          }, function() {
          });
          return;
        }
        var flag = false;
        var macroInfo = create_macro_info();
        macroInfo.style = 22;
        if (result.deltaY < 0) {
          macroInfo.mouse_key_event = 522;
          macroInfo.mouse_key_code = 1;
          if (S.edit_macros.length > 0) {
            var value = S.edit_macros[S.edit_macros.length - 1];
            if (value.mouse_key_event == 522 && macroInfo.mouse_key_code * value.mouse_key_code >= 0) {
              value.mouse_key_code += macroInfo.mouse_key_code;
              flag = true;
            }
          }
        } else {
          if (result.deltaY > 0) {
            macroInfo.mouse_key_event = 522;
            macroInfo.mouse_key_code = -1;
            if (S.edit_macros.length > 0) {
              var value = S.edit_macros[S.edit_macros.length - 1];
              if (value.mouse_key_event == 522 && macroInfo.mouse_key_code * value.mouse_key_code >= 0) {
                value.mouse_key_code += macroInfo.mouse_key_code;
                flag = true;
              }
            }
          }
        }
        const now3 = Date.now();
        if (!flag) {
          macroInfo.mouse_key_time = 1;
          if (S.setting_macro_edit_recording_time != -1) {
            S.edit_macros[S.edit_macros.length - 1].mouse_key_time = $('[name="macro-record-fixed-time"]')[0].checked ? 50 : now3 - S.setting_macro_edit_recording_time;
          }
          S.setting_macro_edit_recording_time = now3;
          macroInfo.name = get_key_name_from_code(macroInfo.mouse_key_code);
          S.edit_macros.push(macroInfo);
        } else {
          S.setting_macro_edit_recording_time = now3;
        }
        ui_refresh_mapping_macro_edit(DS.current_usb_client);
      }
    }
  });
  function refresh_recorded_mapping_keys() {
    if (S.setting_mapping_key_recording) {
      var str = "";
      var flag = true;
      if (S.setting_mapping_keys_recorded[0] >= 0) {
        str += get_modifier_name_from_code(S.setting_mapping_keys_recorded[0]);
        flag = false;
      }
      if (S.setting_mapping_keys_recorded[1] >= 0) {
        if (!flag) {
          str += "+";
        }
        str += get_modifier_name_from_code(S.setting_mapping_keys_recorded[1]);
        flag = false;
      }
      if (S.setting_mapping_keys_recorded[2] >= 0) {
        if (!flag) {
          str += "+";
        }
        str += get_key_name_from_code(S.setting_mapping_keys_recorded[2]);
        flag = false;
      }
      layui.$('[name="recorded-mapping-key"]').html(str);
    }
  }
  function receiver_cannot_pair(device) {
    var layui2 = layui.layer;
    var str = layui.i18np;
    var value = str.prop("STRID_SETTING_MOUSE_CAN_NOT_PAIR_WARNING");
    const displayName1 = get_display_name(DS.current_usb_client);
    const value2 = get_display_name(device);
    layui2.confirm(value.replace("{name1}", displayName1).replace("{name2}", value2), {
      "title": str.prop("STRID_TITLE_WARNING"),
      "skin": "layui-layer-confirm",
      "btn": [str.prop("STRID_BUTTON_CANCEL")],
      "btnAlign": "c",
      "btn1": function() {
        layui2.closeLast(0);
      }
    });
  }
  function receiver_pair(client) {
    var layui2 = layui.layer;
    var str = layui.i18np;
    var value = str.prop("STRID_SETTING_MOUSE_PAIR_WARNING");
    const displayName2 = get_display_name(DS.current_usb_client);
    const value2 = get_display_name(client);
    layui2.confirm(value.replace("{name1}", displayName2).replace("{name2}", value2), {
      "title": str.prop("STRID_TITLE_WARNING"),
      "skin": "layui-layer-confirm",
      "btn": [str.prop("STRID_SETTING_MOUSE_PAIR_S"), str.prop("STRID_BUTTON_CANCEL")],
      "btnAlign": "c",
      "btn1": function() {
        layui2.closeLast(0);
        if (DS.current_usb_client != void 0) {
          DS.current_usb_client.pause = true;
          send_event_set_esb_addr(DS.current_usb_client, get_esb_addr(client.device_info, 255), get_default_rf_channel(client), is_slow_receiver(client));
          if (DS.current_usb_client.virtual) {
            send_event_action(DS.current_usb_client, 51, 0);
          }
          DS.current_usb_client.pause = false;
          post_send_client_data(DS.current_usb_client);
        }
      },
      "btn2": function() {
        layui2.closeLast(0);
      }
    });
  }
  function receiver_unpair(client) {
    var layui2 = layui.layer;
    var str = layui.i18np;
    if (is_light(client)) {
      var value = str.prop("STRID_SETTING_MOUSE_UNPAIR_WARNING");
      const displayName3 = get_display_name(DS.current_usb_client);
      const value2 = get_display_name(client);
      layui2.confirm(value.replace("{name1}", displayName3).replace("{name2}", value2), {
        "title": str.prop("STRID_TITLE_WARNING"),
        "skin": "layui-layer-confirm",
        "btn": [str.prop("STRID_SETTING_MOUSE_UNPAIR_S"), str.prop("STRID_SETTING_LIGHT"), str.prop("STRID_BUTTON_CANCEL")],
        "btnAlign": "c",
        "btn1": function() {
          layui2.closeLast(0);
          if (DS.current_usb_client != void 0) {
            DS.current_usb_client.pause = true;
            send_event_clear_esb_addr(DS.current_usb_client, get_esb_addr(client.device_info, 255));
            if (DS.current_usb_client.virtual) {
              send_event_action(DS.current_usb_client, 51, 0);
            }
            DS.current_usb_client.pause = false;
            post_send_client_data(DS.current_usb_client);
          }
        },
        "btn2": function() {
          layui2.closeLast(0);
          S.current_usb_receiver = client;
          $('[name="receiver-light-mode"]')[S.current_usb_receiver.device_info.light % 3].checked = true;
          layui.form.render("radio");
          layui2.open({
            "type": 1,
            "title": str.prop("STRID_SETTING_LIGHT"),
            "content": $("#receiver-light-setting-panel"),
            "btn": [str.prop("STRID_CLOSE")],
            "btnAlign": "c",
            "btn1": function() {
              layui2.closeLast(0);
            }
          });
        },
        "btn3": function() {
          layui2.closeLast(0);
        }
      });
    } else {
      var value = str.prop("STRID_SETTING_MOUSE_UNPAIR_WARNING");
      const displayName4 = get_display_name(DS.current_usb_client);
      const value3 = get_display_name(client);
      layui2.confirm(value.replace("{name1}", displayName4).replace("{name2}", value3), {
        "title": str.prop("STRID_TITLE_WARNING"),
        "skin": "layui-layer-confirm",
        "btn": [str.prop("STRID_SETTING_MOUSE_UNPAIR_S"), str.prop("STRID_BUTTON_CANCEL")],
        "btnAlign": "c",
        "btn1": function() {
          layui2.closeLast(0);
          if (DS.current_usb_client != void 0) {
            DS.current_usb_client.pause = true;
            send_event_clear_esb_addr(DS.current_usb_client, get_esb_addr(client.device_info, 255));
            if (DS.current_usb_client.virtual) {
              send_event_action(DS.current_usb_client, 51, 0);
            }
            DS.current_usb_client.pause = false;
            post_send_client_data(DS.current_usb_client);
          }
        },
        "btn2": function() {
          layui2.closeLast(0);
        }
      });
    }
  }
  function receiver_unpair_switch(client) {
    var layui2 = layui.layer;
    var str = layui.i18np;
    var value = str.prop("STRID_SETTING_MOUSE_UNPAIR_WARNING");
    const displayName5 = get_display_name(DS.current_usb_client);
    const value2 = get_display_name(client);
    layui2.confirm(value.replace("{name1}", displayName5).replace("{name2}", value2), {
      "title": str.prop("STRID_TITLE_WARNING"),
      "skin": "layui-layer-confirm",
      "btn": [str.prop("STRID_SETTING_MOUSE_UNPAIR_S"), str.prop("STRID_SETTING_MOUSE_PAIRED_SELECT_S"), str.prop("STRID_BUTTON_CANCEL")],
      "btnAlign": "c",
      "btn1": function() {
        layui2.closeLast(0);
        if (DS.current_usb_client != void 0) {
          DS.current_usb_client.pause = true;
          send_event_clear_esb_addr(DS.current_usb_client, get_esb_addr(client.device_info, 255));
          DS.current_usb_client.pause = false;
          post_send_client_data(DS.current_usb_client);
        }
      },
      "btn2": function() {
        layui2.closeLast(0);
        if (DS.current_usb_client != void 0) {
          DS.current_usb_client.pause = true;
          send_event_select_esb_addr(DS.current_usb_client, get_esb_addr(client.device_info, 255));
          if (DS.current_usb_client.virtual) {
            send_event_action(DS.current_usb_client, 51, 0);
          }
          DS.current_usb_client.pause = false;
          post_send_client_data(DS.current_usb_client);
          var isSelected = void 0;
          usb_client_list.forEach((item) => {
            if (item.virtual && item.device == client.device) {
              isSelected = item;
            }
          });
          if (isSelected != void 0) {
            setTimeout(function(result) {
              send_event_query(result);
            }, 3e3, isSelected);
          }
        }
      },
      "btn3": function() {
        layui2.closeLast(0);
      }
    });
  }
  apply_theme();
  layui.config({
    "base": RESOURCE_URL + "i18n/extend-202510170047/"
  }).extend({
    "mod": "i18np"
  });
  function close_all_layer() {
    var layui2 = layui.layer;
    if (S.macro_edit_panel_id != void 0) {
      layui2.close(S.macro_edit_panel_id);
    }
    if (S.macro_record_panel_id != void 0) {
      layui2.close(S.macro_record_panel_id);
    }
    if (S.key_record_panel_id != void 0) {
      layui2.close(S.key_record_panel_id);
    }
    if (S.select_key_panel_id != void 0) {
      layui2.close(S.select_key_panel_id);
    }
  }
  layui.use(["form", "layer", "util", "i18np", "table"], function() {
    var layui2 = layui.form;
    var el = layui.layer;
    var layui3 = layui.util;
    var layui4 = layui.$;
    var str = layui.i18np;
    str.loadProperties(RESOURCE_URL);
    layui2.on("select(language)", function(result) {
      layui.data("lang", {
        "key": "name",
        "value": result.value
      });
      str.loadProperties(RESOURCE_URL);
      layui2.render("checkbox");
      if (S.pair_panel_id >= 0) {
        el.style(S.pair_panel_id, {
          "left": (window.innerWidth - layui4("[id=pair-panel]").width()) / 2 + "px"
        });
      }
      if (S.not_support_id >= 0) {
        el.style(S.not_support_id, {
          "left": (window.innerWidth - layui4("[id=not-support-panel]").width()) / 2 + "px"
        });
      }
      request_device_cfg();
      setTimeout(function() {
        pc_key_manager_init();
        if (DS.current_usb_client != void 0) {
          setting_mapping_init(DS.current_usb_client);
          ui_refresh_mapping_key(DS.current_usb_client);
          if (DS.current_usb_client.device_info != void 0 && DS.current_usb_client.device_info.revision != void 0 && DS.current_usb_client.device_info.revision.substr(0, 2) == "G-") {
            layui4('[name="setting-fw-channel"]')[1].checked = true;
          } else {
            layui4('[name="setting-fw-channel"]')[0].checked = true;
          }
          layui4('[name="setting-fw-channel"]')[0].disabled = !DS.current_usb_client.device_info.dynamicGOM;
          layui4('[name="setting-fw-channel"]')[1].disabled = !DS.current_usb_client.device_info.dynamicGOM;
          layui.form.render("radio");
        }
        window.postMessage({
          "action": ACTION_UI_REFRESH_CURRENT_CLIENT
        });
        clearTimeout(S.resize_timer_id);
        S.resize_timer_id = setTimeout(do_resize, RESIZE_DEBOUNCE_MS);
      }, 1e3);
    });
    var layui5 = layui.data("lang").name;
    layui4("select[name=language]")[0].value = layui5;
    layui4('[name="dark-theme"]').prop("checked", is_dark_theme());
    layui2.on("switch(dark-theme)", function(result) {
      if (result.elem.checked) {
        layui.data("theme", {
          "key": "style",
          "value": "dark"
        });
      } else {
        layui.data("theme", {
          "key": "style",
          "value": "light"
        });
      }
      apply_theme();
      if (navigator.hid != void 0) {
        window.postMessage({
          "action": ACTION_UI_REFRESH_CLIENT_LIST
        });
        window.postMessage({
          "action": ACTION_UI_REFRESH_CURRENT_CLIENT
        });
      }
    });
    request_device_cfg();
    pc_key_manager_init();
    ui_refresh_client_list();
    layui3.countdown(new Date(2999, 0, 1).getTime(), (/* @__PURE__ */ new Date()).getTime(), function(result, data, timer) {
      start();
    });
    if (navigator.hid == void 0) {
      S.not_support_id = el.open({
        "type": 1,
        "title": false,
        "skin": "layui-layer-panel",
        "shade": 0,
        "closeBtn": 0,
        "anim": -1,
        "shadeClose": false,
        "resize": false,
        "scrollbar": false,
        "zIndex": 100,
        "content": layui4("#not-support-panel")
      });
    }
    layui3.on("pair-action", {
      "pair": async function() {
        layui4("#pair-device").css("display", "none");
        layui4("#pairing-waiting").css("display", "");
        layui4("#pairing-tips").css("display", "");
        navigator.hid.requestDevice({
          "filters": [{
            "vendorId": 6421
          }]
        }).then((len) => {
          window.postMessage({
            "action": ACTION_REFRESH_CLIENT_LIST
          });
          if (len.length == 0) {
            layui4("#pair-device").css("display", "");
            layui4("#pairing-waiting").css("display", "none");
            layui4("#pairing-tips").css("display", "none");
          }
        }).catch((err) => {
          log_r(err);
        });
      },
      "pair-more": async function() {
        navigator.hid.requestDevice({
          "filters": [{
            "vendorId": 6421
          }]
        }).then((result) => {
          window.postMessage({
            "action": ACTION_REFRESH_CLIENT_LIST
          });
        }).catch((err) => {
          log_r(err);
        });
      },
      "refresh": async function() {
        usb_client_list.forEach((item) => {
          if (item.virtual) {
            send_event_query(item);
          }
        });
        var layui6 = layui.layer;
        if (S.loading_id < 0) {
          S.loading_id = layui6.load(0);
          setTimeout(function() {
            layui6.close(S.loading_id);
            S.loading_id = -1;
          }, ESB_ALIVE_TIMEOUT_MS);
        }
      }
    });
    layui3.on("current-action", {
      "edit": async function() {
        S.editing = true;
        S.combination_key_index = 0;
        S.onboard_config_index = DS.current_usb_client.device_info.onboardIndex;
        setting_mapping_init(DS.current_usb_client);
        select_mapping_type(DS.current_usb_client, 3);
        window.postMessage({
          "action": ACTION_UI_REFRESH_CLIENT_LIST
        });
        window.postMessage({
          "action": ACTION_UI_REFRESH_CURRENT_CLIENT
        });
        clearTimeout(S.resize_timer_id);
        S.resize_timer_id = setTimeout(do_resize, RESIZE_DEBOUNCE_MS);
      }
    });
    layui3.on("list-action", {
      "select": async function() {
        DS.current_usb_client = get_usb_client(this.getAttribute("usb-client-id"));
        S.editing = false;
        close_all_layer();
        if (S.tips_panel_id >= 0) {
          el.close(S.tips_panel_id);
          S.tips_panel_id = -1;
        }
        update_setting_x_polling();
        if (DS.current_usb_client.device_info != void 0 && DS.current_usb_client.device_info.revision != void 0 && DS.current_usb_client.device_info.revision.substr(0, 2) == "G-") {
          layui4('[name="setting-fw-channel"]')[1].checked = true;
        } else {
          layui4('[name="setting-fw-channel"]')[0].checked = true;
        }
        layui4('[name="setting-fw-channel"]')[0].disabled = !DS.current_usb_client.device_info.dynamicGOM;
        layui4('[name="setting-fw-channel"]')[1].disabled = !DS.current_usb_client.device_info.dynamicGOM;
        layui.form.render("radio");
        window.postMessage({
          "action": ACTION_UI_REFRESH_CLIENT_LIST
        });
        window.postMessage({
          "action": ACTION_UI_REFRESH_CURRENT_CLIENT
        });
      }
    });
    layui3.on("receiver-action", {
      "select": async function() {
        var client = get_usb_client(this.getAttribute("usb-client-id"));
        if (DS.current_usb_client != void 0 && DS.current_usb_client.helloed) {
          if (!is_soc_compatible(DS.current_usb_client, client)) {
            receiver_cannot_pair(client);
          } else {
            var esbChannel = DS.current_usb_client.product_esb_ch == 255 ? DS.current_usb_client.device_info.esbChannel : DS.current_usb_client.product_esb_ch;
            var value = is_esb_addr_arr_existed(DS.current_usb_client.device_info, esbChannel, get_esb_addr(client.device_info, esbChannel));
            if (!value) {
              receiver_pair(client);
            } else {
              var value2 = get_esb_addr_arr(DS.current_usb_client.device_info, esbChannel) == get_esb_addr(client.device_info, esbChannel);
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
      "select": async function() {
        var attr = this.getAttribute("color-code");
        send_event_set_color_code(DS.current_usb_client, attr);
      }
    });
    layui3.on("firmware-action", {
      "click": async function() {
        var layui7 = layui.layer;
        var layui8 = layui.i18np;
        layui7.confirm(layui8.prop("STRID_WEBHUB_NEW_FIRMWARE_INFO"), {
          "title": layui8.prop("STRID_TITLE_WARNING"),
          "btn": [layui8.prop("STRING_OK")],
          "btnAlign": "c",
          "btn1": function() {
            layui7.closeLast(0);
          }
        });
      }
    });
    layui3.on("download-action", {
      "download": async function() {
        el.open({
          "type": 1,
          "title": false,
          "offset": "rt",
          "id": "ID-download-panel-rt",
          "content": layui4("#download-panel"),
          "closeBtn": false,
          "shade": true,
          "shadeClose": true,
          "anim": "slideDown"
        });
      }
    });
    layui3.on("setting-action", {
      "back": async function() {
        S.editing = false;
        close_all_layer();
        window.postMessage({
          "action": ACTION_UI_REFRESH_CLIENT_LIST
        });
        window.postMessage({
          "action": ACTION_UI_REFRESH_CURRENT_CLIENT
        });
      }
    });
    layui2.on("checkbox(dpi-both-x-y)", function(result) {
      var resolution = DS.current_usb_client.device_info.resolution;
      var value3 = resolution & 65535;
      var value4 = resolution >> 16 & 65535;
      if (result.elem.checked) {
        if (value4 == 0) {
          value4 = value3;
          set_cpi(DS.current_usb_client, value3 | value4 << 16);
          var cpiLevels = DS.current_usb_client.device_info.cpiLevels;
          for (var offset = 0; offset < cpiLevels.length; offset++) {
            value3 = cpiLevels[offset] & 65535;
            value4 = value3;
            set_cpi_level(DS.current_usb_client, offset, value3 | value4 << 16, offset == cpiLevels.length - 1);
          }
        }
      } else {
        if (value4 != 0) {
          value4 = 0;
          set_cpi(DS.current_usb_client, value3 | value4 << 16);
          var cpiLevels = DS.current_usb_client.device_info.cpiLevels;
          for (var offset = 0; offset < cpiLevels.length; offset++) {
            value3 = cpiLevels[offset] & 65535;
            value4 = 0;
            set_cpi_level(DS.current_usb_client, offset, value3 | value4 << 16, offset == cpiLevels.length - 1);
          }
        }
      }
      window.postMessage({
        "action": ACTION_UI_REFRESH_SETTING
      });
    });
    layui2.on("checkbox(glass-mode)", function(result) {
      set_enable_glass_mode(DS.current_usb_client, result.elem.checked);
    });
    layui2.on("switch(x-polling)", function(result) {
      if (result.elem.checked) {
        localStorage.setItem("setting-x-polling", 1);
      } else {
        localStorage.setItem("setting-x-polling", 0);
      }
      window.postMessage({
        "action": ACTION_UI_REFRESH_SETTING
      });
    });
    layui3.on("dpi-level-edit-action", {
      "edit": async function() {
        if (S.cpi_level_editing) {
          S.cpi_level_editing = false;
        } else {
          S.cpi_level_editing = true;
        }
        window.postMessage({
          "action": ACTION_UI_REFRESH_SETTING
        });
      }
    });
    layui3.on("dpi-level-add-action", {
      "edit": async function() {
        var resolution2 = DS.current_usb_client.device_info.resolution;
        var isXY1 = (resolution2 >> 16 & 65535) > 0;
        var arr = DS.current_usb_client.device_info.cpiLevels;
        var firstItem = arr[0];
        arr.forEach((item2) => {
          if (item2 > firstItem) {
            firstItem = item2;
          }
        });
        var value5 = firstItem & 65535;
        var value6 = firstItem >> 16 & 65535;
        if (isXY1 && value6 == 0) {
          value6 = value5;
        }
        S.cpi_level_index = -1;
        ui_refresh_dpi_input_panel(DS.current_usb_client, value5 + 50, value6 + 50, 0, isXY1);
        el.open({
          "type": 1,
          "title": str.prop("STRID_SETTING_DPI_SPEED"),
          "skin": "layui-layer-confirm",
          "btn": [str.prop("STRING_OK"), str.prop("STRING_CANCEL")],
          "btnAlign": "c",
          "content": layui4("#dpi-level-input-panel"),
          "btn1": function() {
            el.closeLast(0);
            var cpiRange = get_cpi_range(DS.current_usb_client);
            var cpiStep1 = get_cpi_step(DS.current_usb_client);
            var resolution3 = DS.current_usb_client.device_info.resolution;
            var isXY2 = (resolution3 >> 16 & 65535) > 0;
            var value7 = 50;
            if (isXY2) {
              var value8 = cpiStep1 * (layui4("#x-dpi-level-input").val() / cpiStep1);
              if (value8 < cpiRange[0]) {
                value8 = cpiRange[1];
              }
              if (value8 > cpiRange[1]) {
                value8 = cpiRange[1];
              }
              var value9 = cpiStep1 * (layui4("#y-dpi-level-input").val() / cpiStep1);
              if (value9 < cpiRange[0]) {
                value9 = cpiRange[1];
              }
              if (value9 > cpiRange[1]) {
                value9 = cpiRange[1];
              }
              value7 = (value9 << 16) + value8;
            } else {
              value7 = cpiStep1 * (layui4("#dpi-level-input").val() / cpiStep1);
              if (value7 < cpiRange[0]) {
                value7 = cpiRange[1];
              }
              if (value7 > cpiRange[1]) {
                value7 = cpiRange[1];
              }
            }
            add_cpi_level(DS.current_usb_client, value7, S.cpi_level_light);
            window.postMessage({
              "action": ACTION_UI_REFRESH_SETTING
            });
          },
          "btn2": function() {
            el.closeLast(0);
          }
        });
      }
    });
    layui3.on("cpi-level-action", {
      "select": async function() {
        S.cpi_level_index = this.getAttribute("cpi-level-index");
        if (S.cpi_level_editing) {
          var resolution4 = DS.current_usb_client.device_info.resolution;
          var isXY3 = (resolution4 >> 16 & 65535) > 0;
          var cpiLevels2 = DS.current_usb_client.device_info.cpiLevels;
          var cpiLevelColors = DS.current_usb_client.device_info.cpiLevelColors;
          var value10 = cpiLevels2[S.cpi_level_index];
          var value11 = value10 & 65535;
          var value12 = value10 >> 16 & 65535;
          if (isXY3 && value12 == 0) {
            value12 = value11;
          }
          ui_refresh_dpi_input_panel(DS.current_usb_client, value11, value12, cpiLevelColors[S.cpi_level_index], isXY3);
          el.open({
            "type": 1,
            "title": str.prop("STRID_SETTING_DPI_SPEED"),
            "skin": "layui-layer-confirm",
            "btn": [str.prop("STRID_SETTING_MAPPING_DELETE"), str.prop("STRING_OK"), str.prop("STRING_CANCEL")],
            "btnAlign": "c",
            "content": layui4("#dpi-level-input-panel"),
            "btn1": function() {
              el.closeLast(0);
              remove_cpi_level(DS.current_usb_client, S.cpi_level_index);
              window.postMessage({
                "action": ACTION_UI_REFRESH_SETTING
              });
            },
            "btn2": function() {
              el.closeLast(0);
              var cpiRange2 = get_cpi_range(DS.current_usb_client);
              var cpiStep2 = get_cpi_step(DS.current_usb_client);
              var resolution5 = DS.current_usb_client.device_info.resolution;
              var isXY4 = (resolution5 >> 16 & 65535) > 0;
              var value13 = 50;
              if (isXY4) {
                var value14 = cpiStep2 * (layui4("#x-dpi-level-input").val() / cpiStep2);
                if (value14 < cpiRange2[0]) {
                  value14 = cpiRange2[1];
                }
                if (value14 > cpiRange2[1]) {
                  value14 = cpiRange2[1];
                }
                var value15 = cpiStep2 * (layui4("#y-dpi-level-input").val() / cpiStep2);
                if (value15 < cpiRange2[0]) {
                  value15 = cpiRange2[1];
                }
                if (value15 > cpiRange2[1]) {
                  value15 = cpiRange2[1];
                }
                value13 = (value15 << 16) + value14;
              } else {
                value13 = cpiStep2 * (layui4("#dpi-level-input").val() / cpiStep2);
                if (value13 < cpiRange2[0]) {
                  value13 = cpiRange2[1];
                }
                if (value13 > cpiRange2[1]) {
                  value13 = cpiRange2[1];
                }
              }
              set_cpi_level(DS.current_usb_client, S.cpi_level_index, value13);
              set_cpi_level_color(DS.current_usb_client, S.cpi_level_index, S.cpi_level_light);
              window.postMessage({
                "action": ACTION_UI_REFRESH_SETTING
              });
            },
            "btn3": function() {
              el.closeLast(0);
            }
          });
        } else {
          var resolution4 = DS.current_usb_client.device_info.resolution;
          var value16 = resolution4 >> 16 & 65535;
          var cpiLevels3 = DS.current_usb_client.device_info.cpiLevels;
          var value17 = cpiLevels3[S.cpi_level_index];
          if (value16 == 0) {
            value17 = value17 & 65535;
          }
          set_cpi(DS.current_usb_client, value17);
        }
        window.postMessage({
          "action": ACTION_UI_REFRESH_SETTING
        });
      }
    });
    layui3.on("dpi-level-color-action", {
      "select": async function() {
        var attr2 = this.getAttribute("color-code");
        var light = DS.current_usb_client.device_info.light;
        var value18 = light;
        if (attr2 == "white") {
          value18 = light & -8 | 4 | 2 | 1;
        } else {
          if (attr2 == "red") {
            value18 = light & -8 | 4;
          } else {
            if (attr2 == "green") {
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
        var resolution6 = DS.current_usb_client.device_info.resolution;
        var isXY5 = (resolution6 >> 16 & 65535) > 0;
        var offset2 = 0;
        var offset3 = 0;
        if (isXY5) {
          offset2 = layui4("#x-dpi-level-input").val();
          offset3 = layui4("#y-dpi-level-input").val();
        } else {
          offset2 = layui4("#dpi-level-input").val();
          offset3 = 0;
        }
        ui_refresh_dpi_input_panel(DS.current_usb_client, offset2, offset3, light, isXY5);
      }
    });
    layui2.on("radio(setting-polling-rates)", function(result) {
      var value19 = result.elem;
      var value20 = value19.value;
      set_polling_rate(DS.current_usb_client, value20);
      window.postMessage({
        "action": ACTION_UI_REFRESH_SETTING
      });
    });
    layui2.on("checkbox(light-auto-off)", function(result) {
      var light2 = DS.current_usb_client.device_info.light;
      if (result.elem.checked) {
        set_light(DS.current_usb_client, light2 | 32);
      } else {
        set_light(DS.current_usb_client, light2 & -33);
      }
    });
    layui2.on("radio(light-mode)", function(result) {
      var value21 = result.elem;
      var value22 = value21.value;
      var light3 = DS.current_usb_client.device_info.light;
      if (value22 == 1) {
        set_light(DS.current_usb_client, (light3 | 64) & -17);
      } else {
        if (value22 == 2) {
          set_light(DS.current_usb_client, light3 & -65 & -17);
        } else if (value22 == 3) {
          set_light(DS.current_usb_client, (light3 | 16) & -65);
        }
      }
      window.postMessage({
        "action": ACTION_UI_REFRESH_SETTING
      });
    });
    layui3.on("light-color-action", {
      "select": async function() {
        var attr3 = this.getAttribute("color-code");
        var light4 = DS.current_usb_client.device_info.light;
        if (attr3 == "white") {
          set_light(DS.current_usb_client, light4 & -8 | 4 | 2 | 1);
        } else {
          if (attr3 == "red") {
            set_light(DS.current_usb_client, light4 & -8 | 4);
          } else {
            if (attr3 == "green") {
              set_light(DS.current_usb_client, light4 & -8 | 2);
            } else {
              if (attr3 == "blue") {
                set_light(DS.current_usb_client, light4 & -8 | 1);
              } else {
                if (attr3 == "yellow") {
                  set_light(DS.current_usb_client, light4 & -8 | 4 | 2);
                } else {
                  if (attr3 == "purple") {
                    set_light(DS.current_usb_client, light4 & -8 | 4 | 1);
                  } else {
                    if (attr3 == "skyblue") {
                      set_light(DS.current_usb_client, light4 & -8 | 2 | 1);
                    } else if (attr3 == "none") {
                      set_light(DS.current_usb_client, light4 & -8);
                    }
                  }
                }
              }
            }
          }
        }
        window.postMessage({
          "action": ACTION_UI_REFRESH_SETTING
        });
      }
    });
    layui2.on("radio(setting-power-modes)", function(result) {
      var value23 = result.elem;
      var value24 = value23.value;
      set_power_mode(DS.current_usb_client, value24);
    });
    layui2.on("radio(setting-lods)", function(result) {
      var value25 = result.elem;
      var value26 = value25.value;
      set_lod(DS.current_usb_client, value26);
    });
    layui2.on("switch(setting-angle-snapping)", function(result) {
      set_angle_snapping(DS.current_usb_client, result.elem.checked ? 1 : 0);
    });
    layui2.on("switch(setting-ripple-control)", function(result) {
      set_ripple_control(DS.current_usb_client, result.elem.checked ? 1 : 0);
    });
    layui2.on("switch(setting-motion-sync)", function(result) {
      set_motion_sync(DS.current_usb_client, result.elem.checked ? 1 : 0);
    });
    layui2.on("switch(setting-wireless-turbo)", function(result) {
      if (result.elem.checked) {
        set_wireless_turbo(DS.current_usb_client, 1);
        layui4('[name="setting-rf-channel"]').prop("disabled", false);
      } else {
        set_wireless_turbo(DS.current_usb_client, 0);
        layui4('[name="setting-rf-channel"]').prop("disabled", true);
      }
    });
    layui2.on("radio(setting-rf-channel)", function(result) {
      var value27 = result.elem;
      var value28 = value27.value;
      if (value28 == -1) {
        send_event_set_auto_hop(DS.current_usb_client, true);
      } else {
        if (DS.current_usb_client.device_info.hopChannelSupported) {
          send_event_set_auto_hop(DS.current_usb_client, false);
        }
        if (value28 == 2) {
          send_event_set_rf_channel(DS.current_usb_client, 2);
        } else {
          if (value28 == 40) {
            send_event_set_rf_channel(DS.current_usb_client, 40);
          } else if (value28 == 80) {
            send_event_set_rf_channel(DS.current_usb_client, 80);
          }
        }
      }
      var html2 = "";
      if (value28 == -1) {
        html2 += layui.i18np.prop("STRID_SETTING_RF_CHANNEL_AUTO");
        html2 += ": " + layui.i18np.prop("STRID_SETTING_RF_CHANNEL_AUTO_TIPS");
      } else {
        if (DS.current_usb_client.device_info.rfChannel == 2) {
          html2 += layui.i18np.prop("STRID_SETTING_RF_CHANNEL_2");
          html2 += ": " + layui.i18np.prop("STRID_SETTING_RF_CHANNEL_2_TIPS");
        } else {
          if (DS.current_usb_client.device_info.rfChannel == 40) {
            html2 += layui.i18np.prop("STRID_SETTING_RF_CHANNEL_40");
            html2 += ": " + layui.i18np.prop("STRID_SETTING_RF_CHANNEL_40_TIPS");
          } else if (DS.current_usb_client.device_info.rfChannel == 80) {
            html2 += layui.i18np.prop("STRID_SETTING_RF_CHANNEL_80");
            html2 += ": " + layui.i18np.prop("STRID_SETTING_RF_CHANNEL_80_TIPS");
          }
        }
      }
      layui4("#selected-rf-channel-tips").html(html2);
    });
    layui2.on("checkbox(power-saving)", function(result) {
      set_auto_tx_power(DS.current_usb_client, result.elem.checked);
    });
    layui2.on("switch(onboard-allow-switch)", function(result) {
      var status = S.onboard_status[S.onboard_config_index];
      if (result.elem.checked) {
        status = status | 128;
      } else {
        status = status & -129;
      }
      set_onboard_status(DS.current_usb_client, S.onboard_config_index, status);
      ui_refresh_onboard_config(usb_client);
    });
    layui2.on("select(onboard-config)", function(result) {
      var value29 = result.elem;
      var value30 = value29.value;
      if (S.need_save) {
        el.confirm(str.prop("STRID_SETTING_MAPPING_NOT_SAVED_DISCARD_CONFIRM"), {
          "title": str.prop("STRID_TITLE_WARNING"),
          "skin": "layui-layer-confirm",
          "btn": [str.prop("STRID_SETTING_MAPPING_NOT_SAVED_DISCARD_S"), str.prop("STRID_SETTING_MAPPING_NOT_SAVED_BACK_S")],
          "btnAlign": "c",
          "btn1": function() {
            el.closeLast(0);
            S.need_save = false;
            S.onboard_config_index = value30;
            S.onboard_keys = S.onboard_configs[S.onboard_config_index];
            S.combination_key_index = 0;
            select_mouse_key(DS.current_usb_client, "");
            ui_refresh_combination_key(DS.current_usb_client);
            ui_refresh_onboard_config(DS.current_usb_client);
          },
          "btn2": function() {
            el.closeLast(0);
            ui_refresh_onboard_config(DS.current_usb_client);
          }
        });
        return;
      }
      S.onboard_config_index = value30;
      S.onboard_keys = S.onboard_configs[S.onboard_config_index];
      S.combination_key_index = 0;
      select_mouse_key(DS.current_usb_client, "");
      ui_refresh_combination_key(DS.current_usb_client);
      ui_refresh_onboard_config(DS.current_usb_client);
    });
    layui3.on("setting-onboard-status-action", {
      "select": async function() {
        var attr4 = this.getAttribute("color-code");
        var status2 = S.onboard_status[S.onboard_config_index];
        if (attr4 == "white") {
          set_onboard_status(DS.current_usb_client, S.onboard_config_index, status2 & -8 | 4 | 2 | 1);
        } else {
          if (attr4 == "red") {
            set_onboard_status(DS.current_usb_client, S.onboard_config_index, status2 & -8 | 4);
          } else {
            if (attr4 == "green") {
              set_onboard_status(DS.current_usb_client, S.onboard_config_index, status2 & -8 | 2);
            } else {
              if (attr4 == "blue") {
                set_onboard_status(DS.current_usb_client, S.onboard_config_index, status2 & -8 | 1);
              } else {
                if (attr4 == "yellow") {
                  set_onboard_status(DS.current_usb_client, S.onboard_config_index, status2 & -8 | 4 | 2);
                } else {
                  if (attr4 == "purple") {
                    set_onboard_status(DS.current_usb_client, S.onboard_config_index, status2 & -8 | 4 | 1);
                  } else {
                    if (attr4 == "skyblue") {
                      set_onboard_status(DS.current_usb_client, S.onboard_config_index, status2 & -8 | 2 | 1);
                    } else if (attr4 == "none") {
                      set_onboard_status(DS.current_usb_client, S.onboard_config_index, status2 & -8);
                    }
                  }
                }
              }
            }
          }
        }
        window.postMessage({
          "action": ACTION_UI_REFRESH_SETTING
        });
        ui_refresh_onboard_config(DS.current_usb_client);
      }
    });
    layui2.on("select(combination-key)", function(result) {
      var value31 = result.elem;
      var value32 = value31.value;
      S.combination_key_index = value32;
      select_mouse_key(DS.current_usb_client, "");
    });
    layui3.on("mapping-action", {
      "setting-mapping-key": async function() {
        var attr5 = this.getAttribute("value");
        S.select_key_name = "";
        if (attr5 == "setting_mapping_key_wheel_down") {
          S.select_key_name = KEY_WHEEL_DOWN;
        } else {
          if (attr5 == "setting_mapping_key_wheel_up") {
            S.select_key_name = KEY_WHEEL_UP;
          } else {
            for (let index = 0; index < S.mouse_keys.length; index++) {
              if (attr5 == S.setting_mapping_keys[index]) {
                S.select_key_name = get_key_name_from_label(S.mouse_keys[index].label);
                break;
              }
            }
          }
        }
        var label = S.mouse_key_labels[S.combination_key_index];
        var len2 = get_key_name_from_label(label);
        if (len2.length > 0) {
          S.select_key_name = len2 + "+" + S.select_key_name;
        }
        select_mouse_key(DS.current_usb_client, S.select_key_name);
      }
    });
    var layui9 = layui.element;
    layui9.on("tab(mapping-key-type)", function(result) {
      var value33 = result.index;
      if (S.select_key_name.length > 0) {
        var keyInfo = get_select_key_info();
        if (Object.keys(keyInfo).length == 0) {
          var index2 = -1;
          for (let count = 0; count < S.mouse_keys.length; count++) {
            if (S.select_key_name == S.mouse_keys[count].name) {
              index2 = count;
              break;
            }
          }
          if (index2 >= 0) {
            var keyInfo = create_key_info();
            keyInfo.name = S.mouse_keys[index2].name;
            keyInfo.label = S.mouse_keys[index2].label;
            S.onboard_keys.push(keyInfo);
          }
        }
        for (let len3 = 0; len3 < S.onboard_keys.length; len3++) {
          if (S.select_key_name == S.onboard_keys[len3].name) {
            if (value33 == 0) {
              S.onboard_keys[len3].configType = 0;
              S.onboard_keys[len3].touch_style = 27;
            } else {
              if (value33 == 1) {
                S.onboard_keys[len3].configType = 5;
              } else if (value33 == 2) {
                S.onboard_keys[len3].configType = 0;
                S.onboard_keys[len3].touch_style = 29;
              } else {
                S.onboard_keys[len3].configType = -1;
              }
            }
          }
        }
        for (let len4 = 0; len4 < S.onboard_keys.length; len4++) {
          if (S.select_key_name == S.onboard_keys[len4].name) {
            for (let index3 = S.onboard_keys.length - 1; index3 > len4; index3--) {
              if (S.select_key_name == S.onboard_keys[index3].name) {
                if (value33 == 1) {
                  if (S.onboard_keys[len4].macro_style == S.onboard_keys[index3].macro_style) {
                    S.onboard_keys.splice(index3, 1);
                  }
                } else {
                  S.onboard_keys.splice(index3, 1);
                }
              }
            }
          }
        }
        update_mapping(DS.current_usb_client, value33);
        ui_refresh_mapping_key(DS.current_usb_client);
        ui_refresh_combination_key(DS.current_usb_client);
      }
    });
    layui2.on("select(mapping-ctrl-key1)", function(result) {
      set_mapping_keys(DS.current_usb_client);
      ui_refresh_tab_mapping_key(DS.current_usb_client);
    });
    layui2.on("select(mapping-ctrl-key2)", function(result) {
      set_mapping_keys(DS.current_usb_client);
      ui_refresh_tab_mapping_key(DS.current_usb_client);
    });
    layui2.on("select(mapping-key)", function(result) {
      set_mapping_keys(DS.current_usb_client);
      ui_refresh_tab_mapping_key(DS.current_usb_client);
    });
    layui2.on("input-affix(wheel-delta-input)", function(result) {
      document.getElementById("wheel-delta-input").dispatchEvent(new Event("input", {
        "bubbles": true
      }));
    });
    layui4("#wheel-delta-input").on("input", function(result) {
      var keyInfo2 = get_select_key_info();
      if (Object.keys(keyInfo2).length == 0) {
        return;
      }
      keyInfo2.mouse_mapping_key_data = result.delegateTarget.value;
      if (keyInfo2.mouse_mapping_key_data < 1 || keyInfo2.mouse_mapping_key_data > 64) {
        keyInfo2.mouse_mapping_key_data = 1;
      }
      set_mapping_keys(DS.current_usb_client);
    });
    layui2.on("checkbox(mapping-key-turbo)", function(result) {
      var keyInfo3 = get_select_key_info();
      if (Object.keys(keyInfo3).length == 0) {
        return;
      }
      if (result.elem.checked) {
        keyInfo3.mouse_auto_click = 1;
      } else {
        keyInfo3.mouse_auto_click = 0;
      }
      ui_refresh_tab_mapping_key(DS.current_usb_client);
      S.need_save = true;
      ui_refresh_onboard_config(DS.current_usb_client);
    });
    layui3.on("shell-cmd-app-browse-action", {
      "edit": async function() {
        layui4("#shell-cmd-app-browse_file").click();
      }
    });
    layui2.on("select(mapping-function)", function(result) {
      var value34 = result.elem;
      var index4 = value34.value;
      var keyInfo4 = get_select_key_info();
      if (Object.keys(keyInfo4).length == 0) {
        return;
      }
      keyInfo4.mouse_mapping_function = S.mouse_functions[index4];
      ui_refresh_tab_mapping_function(DS.current_usb_client);
      ui_refresh_mapping_key(DS.current_usb_client);
      ui_refresh_combination_key(DS.current_usb_client);
      S.need_save = true;
      ui_refresh_onboard_config(DS.current_usb_client);
    });
    layui2.on("radio(function-shell-cmd)", function(result) {
      var value35 = result.elem;
      var value36 = value35.value;
      var keyInfo5 = get_select_key_info();
      if (Object.keys(keyInfo5).length == 0) {
        return;
      }
      if (value36 == 1) {
        keyInfo5.mouse_mapping_function_text = layui4('[name="function-shell-cmd-web"]').val();
        layui4("#function-shell-cmd-app-browse").css("display", "none");
        layui4("#function-shell-cmd-app-browse").prop("disabled", true);
        layui4('[name="function-shell-cmd-app"]').prop("disabled", true);
        layui4('[name="function-shell-cmd-web"]').prop("disabled", false);
        layui4("#function-shell-cmd-app-container").css("display", "none");
        layui4("#function-shell-cmd-web-container").css("display", "");
      } else {
        keyInfo5.mouse_mapping_function_text = layui4('[name="function-shell-cmd-app"]').val();
        layui4("#function-shell-cmd-app-browse").css("display", "none");
        layui4("#function-shell-cmd-app-browse").prop("disabled", false);
        layui4('[name="function-shell-cmd-app"]').prop("disabled", false);
        layui4('[name="function-shell-cmd-web"]').prop("disabled", true);
        layui4("#function-shell-cmd-app-container").css("display", "");
        layui4("#function-shell-cmd-web-container").css("display", "none");
      }
      S.need_save = true;
      ui_refresh_onboard_config(DS.current_usb_client);
    });
    layui4("#function-shell-cmd-app").on("input", function(result) {
      var keyInfo6 = get_select_key_info();
      if (Object.keys(keyInfo6).length == 0) {
        return;
      }
      keyInfo6.mouse_mapping_function_text = result.delegateTarget.value;
    });
    layui4("#function-shell-cmd-web").on("input", function(result) {
      var keyInfo7 = get_select_key_info();
      if (Object.keys(keyInfo7).length == 0) {
        return;
      }
      keyInfo7.mouse_mapping_function_text = result.delegateTarget.value;
      S.need_save = true;
      ui_refresh_onboard_config(DS.current_usb_client);
    });
    layui2.on("input-affix(mapping-key-turbo-freq-input)", function(result) {
      document.getElementById("mapping-key-turbo-freq-input").dispatchEvent(new Event("input", {
        "bubbles": true
      }));
    });
    layui4("#mapping-key-turbo-freq-input").on("input", function(result) {
      var keyInfo8 = get_select_key_info();
      if (Object.keys(keyInfo8).length == 0) {
        return;
      }
      var len5 = result.delegateTarget.value;
      var parsedInt1 = len5.length == 0 ? 0 : parseInt(len5);
      if (parsedInt1 <= 0) {
        parsedInt1 = 1;
      }
      if (parsedInt1 != parseInt(1e3 / (keyInfo8.mouse_auto_click_down + keyInfo8.mouse_auto_click_up))) {
        var value37 = parseInt(1e3 / parsedInt1);
        if (value37 >= 100) {
          keyInfo8.mouse_auto_click_down = 50;
          keyInfo8.mouse_auto_click_up = value37 - keyInfo8.mouse_auto_click_down;
        } else {
          keyInfo8.mouse_auto_click_up = parseInt(value37 / 2);
          keyInfo8.mouse_auto_click_down = value37 - keyInfo8.mouse_auto_click_up;
        }
        if (keyInfo8.mouse_auto_click_down < 0) {
          keyInfo8.mouse_auto_click_down = 0;
        }
        if (keyInfo8.mouse_auto_click_up < 0) {
          keyInfo8.mouse_auto_click_up = 0;
        }
        if (keyInfo8.mouse_auto_click_down == 0 && keyInfo8.mouse_auto_click_up == 0) {
          keyInfo8.mouse_auto_click_down = 1;
        }
        layui4("#mapping-key-turbo-down-keep-input").val(keyInfo8.mouse_auto_click_down);
        layui4("#mapping-key-turbo-up-keep-input").val(keyInfo8.mouse_auto_click_up);
      }
      S.need_save = true;
      ui_refresh_onboard_config(DS.current_usb_client);
    });
    layui2.on("input-affix(mapping-key-turbo-rand-input)", function(result) {
      document.getElementById("mapping-key-turbo-rand-input").dispatchEvent(new Event("input", {
        "bubbles": true
      }));
    });
    layui4("#mapping-key-turbo-rand-input").on("input", function(result) {
      var keyInfo9 = get_select_key_info();
      if (Object.keys(keyInfo9).length == 0) {
        return;
      }
      var len6 = result.delegateTarget.value;
      var parsedInt2 = len6.length == 0 ? 0 : parseInt(len6);
      if (parsedInt2 < 0) {
        parsedInt2 = 0;
      }
      keyInfo9.mouse_auto_click_rand = parsedInt2;
      S.need_save = true;
      ui_refresh_onboard_config(DS.current_usb_client);
    });
    layui2.on("input-affix(mapping-key-turbo-down-keep-input)", function(result) {
      document.getElementById("mapping-key-turbo-down-keep-input").dispatchEvent(new Event("input", {
        "bubbles": true
      }));
    });
    layui4("#mapping-key-turbo-down-keep-input").on("input", function(result) {
      var keyInfo10 = get_select_key_info();
      if (Object.keys(keyInfo10).length == 0) {
        return;
      }
      var len7 = result.delegateTarget.value;
      var parsedInt3 = len7.length == 0 ? 0 : parseInt(len7);
      if (parsedInt3 < 0) {
        parsedInt3 = 0;
      }
      keyInfo10.mouse_auto_click_down = parsedInt3;
      if (keyInfo10.mouse_auto_click_down == 0 && keyInfo10.mouse_auto_click_up == 0) {
        keyInfo10.mouse_auto_click_down = 1;
      }
      var value38 = keyInfo10.mouse_auto_click_down + keyInfo10.mouse_auto_click_up;
      if (value38 <= 0) {
        value38 = 1;
      }
      layui4("#mapping-key-turbo-freq-input").val(parseInt(1e3 / value38));
      S.need_save = true;
      ui_refresh_onboard_config(DS.current_usb_client);
    });
    layui2.on("input-affix(mapping-key-turbo-up-keep-input)", function(result) {
      document.getElementById("mapping-key-turbo-up-keep-input").dispatchEvent(new Event("input", {
        "bubbles": true
      }));
    });
    layui4("#mapping-key-turbo-up-keep-input").on("input", function(result) {
      var keyInfo11 = get_select_key_info();
      if (Object.keys(keyInfo11).length == 0) {
        return;
      }
      var len8 = result.delegateTarget.value;
      var parsedInt4 = len8.length == 0 ? 0 : parseInt(len8);
      if (parsedInt4 < 0) {
        parsedInt4 = 0;
      }
      keyInfo11.mouse_auto_click_up = parsedInt4;
      if (keyInfo11.mouse_auto_click_down == 0 && keyInfo11.mouse_auto_click_up == 0) {
        keyInfo11.mouse_auto_click_up = 1;
      }
      var value39 = keyInfo11.mouse_auto_click_down + keyInfo11.mouse_auto_click_up;
      if (value39 <= 0) {
        value39 = 1;
      }
      layui4("#mapping-key-turbo-freq-input").val(parseInt(1e3 / value39));
      S.need_save = true;
      ui_refresh_onboard_config(DS.current_usb_client);
    });
    layui3.on("macro-edit-item-action", {
      "select": async function() {
        S.macro_edit_index = this.getAttribute("macro-edit-item-index");
        S.current_edit_macro = clone_macro_info(S.edit_macros[S.macro_edit_index]);
        S.macro_keep_time_min = S.current_edit_macro.mouse_key_time / 500 * 500;
        ui_refresh_mapping_macro_add(DS.current_usb_client);
        el.open({
          "type": 1,
          "title": str.prop("STRID_SETTING_MAPPING_MACRO_ACTION_EDIT"),
          "skin": "layui-layer-confirm",
          "content": layui4("#setting-mapping-macro-add-panel"),
          "btn": [str.prop("STRID_DELETE"), str.prop("STRID_INSERT"), str.prop("STRID_SAVE")],
          "btnAlign": "c",
          "btn1": function() {
            el.closeLast(0);
            S.edit_macros.splice(S.macro_edit_index, 1);
            ui_refresh_mapping_macro_edit(DS.current_usb_client);
          },
          "btn2": function() {
            el.closeLast(0);
            var macroInfo = create_macro_info();
            macroInfo.style = 22;
            var value40 = macro_keys[parseInt(layui4('[name="macro-add-select-key"]').val())].vCode;
            if (DS.current_usb_client != void 0 ? is_hs_keyboard(DS.current_usb_client.device) : false) {
              value40 = get_key_code_from_name(document.getElementById("kbd-macro-add-select-key").textContent);
            }
            if (value40 == 1025) {
              macroInfo.mouse_key_event = 522;
              macroInfo.mouse_key_code = -parseInt(layui4("#macro-add-wheel-delta-input").val());
            } else {
              if (value40 == 1024) {
                macroInfo.mouse_key_event = 522;
                macroInfo.mouse_key_code = parseInt(layui4("#macro-add-wheel-delta-input").val());
              } else {
                if (value40 == 1026) {
                  macroInfo.mouse_key_event = 526;
                  macroInfo.mouse_key_code = -parseInt("#macro-add-wheel-delta-input".val());
                } else {
                  if (value40 == 1027) {
                    macroInfo.mouse_key_event = 526;
                    macroInfo.mouse_key_code = parseInt(layui4("#macro-add-wheel-delta-input").val());
                  } else {
                    if (value40 == 1028) {
                      macroInfo.mouse_key_event = 512;
                      var value41 = Math.round(parseFloat(layui4("#macro-add-move-delta-x-input").val()) * 10) + 2047;
                      var value42 = Math.round(parseFloat(layui4("#macro-add-move-delta-y-input").val()) * 10) + 2047;
                      macroInfo.mouse_key_code = value41 << 16 | value42;
                      macroInfo.mouse_key_loop = parseInt(layui4("#macro-add-move-loop-input").val());
                      if (macroInfo.mouse_key_loop <= 0) {
                        macroInfo.mouse_key_loop = 1;
                      }
                    } else {
                      if (value40 == 1029) {
                        macroInfo.mouse_key_event = 767;
                        var value43 = parseInt(layui4("#macro-add-position-x-input").val());
                        var value44 = parseInt(layui4("#macro-add-position-y-input").val());
                        var screenW = window.screen.width;
                        var screenH = window.screen.height;
                        value43 = parseInt((value43 + 0.9) * 65535 / screenW);
                        value44 = parseInt((value44 + 0.9) * 65535 / screenH);
                        macroInfo.mouse_key_code = value43 << 16 | value44;
                      } else {
                        macroInfo.mouse_key_code = value40;
                        if (layui4('[name="mapping-macro-action-key-event"]')[0].checked) {
                          macroInfo.mouse_key_event = 256;
                        } else if (layui4('[name="mapping-macro-action-key-event"]')[1].checked) {
                          macroInfo.mouse_key_event = 257;
                        } else {
                          macroInfo.mouse_key_event = 0;
                        }
                      }
                    }
                  }
                }
              }
            }
            macroInfo.mouse_key_time = S.current_edit_macro.mouse_key_time;
            macroInfo.name = get_key_name_from_code(value40);
            S.edit_macros.splice(S.macro_edit_index, 0, macroInfo);
            ui_refresh_mapping_macro_edit(DS.current_usb_client);
          },
          "btn3": function() {
            el.closeLast(0);
            S.current_edit_macro.style = 22;
            var value45 = macro_keys[parseInt(layui4('[name="macro-add-select-key"]').val())].vCode;
            if (DS.current_usb_client != void 0 ? is_hs_keyboard(DS.current_usb_client.device) : false) {
              value45 = get_key_code_from_name(document.getElementById("kbd-macro-add-select-key").textContent);
            }
            if (value45 == 1025) {
              S.current_edit_macro.mouse_key_event = 522;
              S.current_edit_macro.mouse_key_code = -parseInt(layui4("#macro-add-wheel-delta-input").val());
            } else {
              if (value45 == 1024) {
                S.current_edit_macro.mouse_key_event = 522;
                S.current_edit_macro.mouse_key_code = parseInt(layui4("#macro-add-wheel-delta-input").val());
              } else {
                if (value45 == 1026) {
                  S.current_edit_macro.mouse_key_event = 526;
                  S.current_edit_macro.mouse_key_code = -parseInt(layui4("#macro-add-wheel-delta-input").val());
                } else {
                  if (value45 == 1027) {
                    S.current_edit_macro.mouse_key_event = 526;
                    S.current_edit_macro.mouse_key_code = parseInt(layui4("#macro-add-wheel-delta-input").val());
                  } else {
                    if (value45 == 1028) {
                      S.current_edit_macro.mouse_key_event = 512;
                      var value46 = Math.round(parseFloat(layui4("#macro-add-move-delta-x-input").val()) * 10) + 2047;
                      var value47 = Math.round(parseFloat(layui4("#macro-add-move-delta-y-input").val()) * 10) + 2047;
                      S.current_edit_macro.mouse_key_code = value46 << 16 | value47;
                      S.current_edit_macro.mouse_key_loop = parseInt(layui4("#macro-add-move-loop-input").val());
                      if (S.current_edit_macro.mouse_key_loop <= 0) {
                        S.current_edit_macro.mouse_key_loop = 1;
                      }
                    } else {
                      if (value45 == 1029) {
                        S.current_edit_macro.mouse_key_event = 767;
                        var value48 = parseInt(layui4("#macro-add-position-x-input").val());
                        var value49 = parseInt(layui4("#macro-add-position-y-input").val());
                        var screenW = window.screen.width;
                        var screenH = window.screen.height;
                        value48 = parseInt((value48 + 0.9) * 65535 / screenW);
                        value49 = parseInt((value49 + 0.9) * 65535 / screenH);
                        S.current_edit_macro.mouse_key_code = value48 << 16 | value49;
                      } else {
                        S.current_edit_macro.mouse_key_code = value45;
                        if (layui4('[name="mapping-macro-action-key-event"]')[0].checked) {
                          S.current_edit_macro.mouse_key_event = 256;
                        } else if (layui4('[name="mapping-macro-action-key-event"]')[1].checked) {
                          S.current_edit_macro.mouse_key_event = 257;
                        } else {
                          S.current_edit_macro.mouse_key_event = 0;
                        }
                      }
                    }
                  }
                }
              }
            }
            S.current_edit_macro.name = get_key_name_from_code(value45);
            if (S.current_edit_macro.mouse_key_time == 0 && S.current_edit_macro.mouse_key_code > 0) {
              S.current_edit_macro.mouse_key_time = 1;
            }
            if (S.macro_edit_index < 0) {
              S.edit_macros.push(S.current_edit_macro);
            } else {
              S.edit_macros[S.macro_edit_index] = S.current_edit_macro;
            }
            ui_refresh_mapping_macro_edit(DS.current_usb_client);
          }
        });
      }
    });
    layui3.on("mapping-macro-edit-action", {
      "edit": async function() {
        var keyInfo12 = get_select_key_info();
        if (Object.keys(keyInfo12).length == 0) {
          return;
        }
        S.edit_macros = [];
        keyInfo12.macroKeys.forEach((item3) => {
          S.edit_macros.push(clone_macro_info(item3));
        });
        ui_refresh_mapping_macro_edit(DS.current_usb_client);
        S.macro_edit_panel_id = el.open({
          "type": 1,
          "title": str.prop("STRID_SETTING_MAPPING_MACRO_EDIT"),
          "skin": "layui-layer-confirm",
          "btn": [str.prop("STRID_SETTING_MAPPING_MACRO_RECORD"), str.prop("STRID_SETTING_MAPPING_MACRO_ACTION_ADD_S"), str.prop("STRID_CLEAR"), str.prop("STRID_SAVE")],
          "btnAlign": "c",
          "content": layui4("#setting-mapping-macro-edit-panel"),
          "btn1": function() {
            var flag = false;
            S.setting_macro_edit_recording = false;
            S.setting_macro_edit_recording_time = -1;
            document.oncontextmenu = function(result) {
              result.preventDefault();
            };
            S.macro_record_panel_id = el.open({
              "type": 1,
              "title": str.prop("STRID_SETTING_MAPPING_MACRO_RECORD_TITLE"),
              "skin": "layui-layer-confirm",
              "content": layui4("#setting-mapping-macro-record-panel"),
              "btn": [str.prop("STRID_SETTING_FACTORY_START")],
              "btnAlign": "c",
              "btn1": function() {
                if (!flag) {
                  flag = true;
                  S.setting_macro_edit_recording = true;
                  var value50 = layui4("#layui-layer" + S.macro_record_panel_id + " .layui-layer-btn .layui-layer-btn0");
                  value50.html(str.prop("STRID_DONE"));
                  layui4("#macro-record-waiting-info").css("display", "");
                  layui4("#macro-record-fixed-time-container").css("display", "none");
                  return false;
                } else {
                  if (record_mouse_key_delay_timer_id != void 0) {
                    clearTimeout(record_mouse_key_delay_timer_id);
                    record_mouse_key_delay_timer_id = void 0;
                  }
                  el.closeLast(0);
                  S.setting_macro_edit_recording = false;
                  document.oncontextmenu = null;
                  layui4("#macro-record-waiting-info").css("display", "none");
                  layui4("#macro-record-fixed-time-container").css("display", "");
                }
              },
              "cancel": function(result, data, index) {
                if (flag) {
                  if (record_mouse_key_delay_timer_id != void 0) {
                    clearTimeout(record_mouse_key_delay_timer_id);
                    record_mouse_key_delay_timer_id = void 0;
                  }
                  S.setting_macro_edit_recording = false;
                  document.oncontextmenu = null;
                }
                return true;
              },
              "end": function() {
                if (flag) {
                  setting_mapping_macro_recording_remove_last();
                  if (record_mouse_key_delay_timer_id != void 0) {
                    clearTimeout(record_mouse_key_delay_timer_id);
                    record_mouse_key_delay_timer_id = void 0;
                  }
                  S.setting_macro_edit_recording = false;
                  document.oncontextmenu = null;
                  S.macro_record_panel_id = void 0;
                }
              }
            });
            return false;
          },
          "btn2": function() {
            S.macro_keep_time_min = 0;
            S.macro_edit_index = -1;
            S.current_edit_macro = create_macro_info();
            ui_refresh_mapping_macro_add(DS.current_usb_client);
            el.open({
              "type": 1,
              "title": str.prop("STRID_SETTING_MAPPING_MACRO_ACTION_ADD"),
              "skin": "layui-layer-confirm",
              "content": layui4("#setting-mapping-macro-add-panel"),
              "btn": [str.prop("STRID_SAVE")],
              "btnAlign": "c",
              "btn1": function() {
                el.closeLast(0);
                S.current_edit_macro.style = 22;
                var value51 = macro_keys[parseInt(layui4('[name="macro-add-select-key"]').val())].vCode;
                if (value51 == 1025) {
                  S.current_edit_macro.mouse_key_event = 522;
                  S.current_edit_macro.mouse_key_code = -parseInt(layui4("#macro-add-wheel-delta-input").val());
                } else {
                  if (value51 == 1024) {
                    S.current_edit_macro.mouse_key_event = 522;
                    S.current_edit_macro.mouse_key_code = parseInt(layui4("#macro-add-wheel-delta-input").val());
                  } else {
                    if (value51 == 1026) {
                      S.current_edit_macro.mouse_key_event = 526;
                      S.current_edit_macro.mouse_key_code = -parseInt(layui4("#macro-add-wheel-delta-input").val());
                    } else {
                      if (value51 == 1027) {
                        S.current_edit_macro.mouse_key_event = 526;
                        S.current_edit_macro.mouse_key_code = parseInt(layui4("#macro-add-wheel-delta-input").val());
                      } else {
                        if (value51 == 1028) {
                          S.current_edit_macro.mouse_key_event = 512;
                          var value52 = Math.round(parseFloat(layui4("#macro-add-move-delta-x-input").val()) * 10) + 2047;
                          var value53 = Math.round(parseFloat(layui4("#macro-add-move-delta-y-input").val()) * 10) + 2047;
                          S.current_edit_macro.mouse_key_code = value52 << 16 | value53;
                          S.current_edit_macro.mouse_key_loop = parseInt(layui4("#macro-add-move-loop-input").val());
                          if (S.current_edit_macro.mouse_key_loop <= 0) {
                            S.current_edit_macro.mouse_key_loop = 1;
                          }
                        } else {
                          if (value51 == 1029) {
                            S.current_edit_macro.mouse_key_event = 767;
                            var value54 = parseInt(layui4("#macro-add-position-x-input").val());
                            var value55 = parseInt(layui4("#macro-add-position-y-input").val());
                            var screenW = window.screen.width;
                            var screenH = window.screen.height;
                            value54 = parseInt((value54 + 0.9) * 65535 / screenW);
                            value55 = parseInt((value55 + 0.9) * 65535 / screenH);
                            S.current_edit_macro.mouse_key_code = value54 << 16 | value55;
                          } else {
                            S.current_edit_macro.mouse_key_code = value51;
                            if (layui4('[name="mapping-macro-action-key-event"]')[0].checked) {
                              S.current_edit_macro.mouse_key_event = 256;
                            } else if (layui4('[name="mapping-macro-action-key-event"]')[1].checked) {
                              S.current_edit_macro.mouse_key_event = 257;
                            } else {
                              S.current_edit_macro.mouse_key_event = 0;
                            }
                          }
                        }
                      }
                    }
                  }
                }
                S.current_edit_macro.name = get_key_name_from_code(value51);
                if (S.current_edit_macro.mouse_key_time == 0 && S.current_edit_macro.mouse_key_code > 0) {
                  S.current_edit_macro.mouse_key_time = 1;
                }
                if (S.macro_edit_index < 0) {
                  S.edit_macros.push(S.current_edit_macro);
                } else {
                  S.edit_macros[S.macro_edit_index] = S.current_edit_macro;
                }
                ui_refresh_mapping_macro_edit(DS.current_usb_client);
              }
            });
            return false;
          },
          "btn3": function() {
            S.edit_macros = [];
            ui_refresh_mapping_macro_edit(DS.current_usb_client);
            return false;
          },
          "btn4": function() {
            el.closeLast(0);
            keyInfo12.macroKeys = S.edit_macros;
            ui_refresh_tab_mapping_macro(DS.current_usb_client);
            S.need_save = true;
            ui_refresh_onboard_config(DS.current_usb_client);
          },
          "end": function() {
            S.macro_edit_panel_id = void 0;
          }
        });
      }
    });
    layui2.on("select(macro-add-select-key)", function(result) {
      var value56 = result.elem;
      var index5 = value56.value;
      var value57 = macro_keys[index5].vCode;
      if (value57 == 0) {
        S.current_edit_macro.mouse_key_code = 0;
        S.current_edit_macro.mouse_key_event = 0;
        S.current_edit_macro.mouse_key_time = 0;
      } else {
        if (value57 == 1025) {
          S.current_edit_macro.mouse_key_event = 522;
          S.current_edit_macro.mouse_key_code = -1;
        } else {
          if (value57 == 1024) {
            S.current_edit_macro.mouse_key_event = 522;
            S.current_edit_macro.mouse_key_code = 1;
          } else {
            if (value57 == 1027) {
              S.current_edit_macro.mouse_key_event = 526;
              S.current_edit_macro.mouse_key_code = 1;
            } else {
              if (value57 == 1026) {
                S.current_edit_macro.mouse_key_event = 526;
                S.current_edit_macro.mouse_key_code = -1;
              } else {
                if (value57 == 1028) {
                  S.current_edit_macro.mouse_key_event = 512;
                  S.current_edit_macro.mouse_key_code = 134154239;
                  S.current_edit_macro.mouse_key_loop = 1;
                } else {
                  if (value57 == 1029) {
                    S.current_edit_macro.mouse_key_event = 767;
                    S.current_edit_macro.mouse_key_code = 0;
                  } else {
                    S.current_edit_macro.mouse_key_code = value57;
                    var offset4 = 0;
                    var offset5 = 0;
                    for (var len9 = 0; len9 < S.edit_macros.length; len9++) {
                      if (S.edit_macros[len9].mouse_key_code == value57) {
                        if (S.edit_macros[len9].mouse_key_event == 256) {
                          offset4++;
                        } else if (S.edit_macros[len9].mouse_key_event == 257) {
                          offset5++;
                        }
                      }
                    }
                    S.current_edit_macro.mouse_key_event = offset4 > offset5 ? 257 : 256;
                    S.current_edit_macro.mouse_key_time = 100;
                  }
                }
              }
            }
          }
        }
      }
      ui_refresh_mapping_macro_add(DS.current_usb_client);
    });
    layui3.on("mapping-macro-more-keep-time-action", {
      "edit": async function() {
        S.macro_keep_time_min += 500;
        S.current_edit_macro.mouse_key_time += 500;
        ui_refresh_mapping_macro_add(DS.current_usb_client);
      }
    });
    layui3.on("mapping-macro-less-keep-time-action", {
      "edit": async function() {
        S.macro_keep_time_min -= 500;
        if (S.macro_keep_time_min >= 0) {
          S.current_edit_macro.mouse_key_time -= 500;
        } else {
          S.macro_keep_time_min = 0;
        }
        ui_refresh_mapping_macro_add(DS.current_usb_client);
      }
    });
    layui2.on("input-affix(macro-add-wheel-delta-input)", function(result) {
      document.getElementById("macro-add-wheel-delta-input").dispatchEvent(new Event("input", {
        "bubbles": true
      }));
    });
    layui4("#macro-add-wheel-delta-input").on("input", function(result) {
      var len10 = result.delegateTarget.value;
      var parsedInt5 = len10.length == 0 ? 0 : parseInt(len10);
      if (parsedInt5 < 0) {
        parsedInt5 = 0;
      }
      S.current_edit_macro.mouse_key_code = parsedInt5;
      ui_refresh_mapping_macro_add(DS.current_usb_client);
    });
    layui2.on("select(mapping-macro-trigger-type)", function(result) {
      var value58 = result.elem;
      var value59 = value58.value;
      var keyInfo13 = get_select_key_info();
      if (Object.keys(keyInfo13).length == 0) {
        return;
      }
      if (S.macro_trigger_type_index != value59) {
        var triggerType = S.macro_trigger_type_index;
        S.macro_trigger_type_index = value59;
        keyInfo13 = get_select_key_info();
        if (Object.keys(keyInfo13).length != 0) {
          keyInfo13.configType = 5;
          keyInfo13.macro_style = S.macro_trigger_type_index;
        }
        if (S.macro_trigger_type_index == 6) {
          if (keyInfo13.macro_endKey == 0) {
            var len11 = keyInfo13.label.split("+");
            var value60 = len11[len11.length - 1];
            for (var offset6 = 0; offset6 < S.mouse_key_labels.length; offset6++) {
              if (S.mouse_key_labels[offset6] == value60) {
                layui4('[name="mapping-macro-stop-key"]').val(offset6);
                keyInfo13.macro_endKey = get_key_id_from_name(keyInfo13.name);
                break;
              }
            }
          } else {
            for (var offset6 = 0; offset6 < S.mouse_key_labels.length; offset6++) {
              var value61 = get_key_name_from_label(S.mouse_key_labels[offset6]);
              var value62 = get_key_id_from_name(value61);
              if (keyInfo13.macro_endKey == value62) {
                layui4('[name="mapping-macro-stop-key"]').val(offset6);
                break;
              }
            }
          }
        } else {
          if (triggerType == 6) {
            if (keyInfo13.macro_endKey != 0) {
              layui4('[name="mapping-macro-stop-key"]').val(0);
              var value61 = get_key_name_from_label(S.mouse_key_labels[0]);
              var value62 = get_key_id_from_name(value61);
              keyInfo13.macro_endKey = value62;
            }
          }
        }
        ui_refresh_tab_mapping_macro(DS.current_usb_client);
      }
    });
    layui2.on("select(mapping-macro-trigger-key)", function(result) {
      var value63 = result.elem;
      var index6 = value63.value;
      var keyInfo14 = get_select_key_info();
      if (Object.keys(keyInfo14).length == 0) {
        return;
      }
      var value64 = S.mouse_key_labels[index6];
      var value65 = get_key_name_from_label(value64);
      var value66 = get_key_id_from_name(value65);
      if (keyInfo14.macro_toggleKey != value66) {
        keyInfo14.macro_toggleKey = value66;
        S.need_save = true;
        ui_refresh_onboard_config(DS.current_usb_client);
      }
    });
    layui2.on("select(mapping-macro-stop-key)", function(result) {
      var value67 = result.elem;
      var index7 = value67.value;
      var keyInfo15 = get_select_key_info();
      if (Object.keys(keyInfo15).length == 0) {
        return;
      }
      var value68 = get_key_name_from_label(S.mouse_key_labels[index7]);
      var value69 = get_key_id_from_name(value68);
      if (keyInfo15.macro_endKey != value69) {
        keyInfo15.macro_endKey = value69;
        S.need_save = true;
        ui_refresh_onboard_config(DS.current_usb_client);
        if (S.macro_trigger_type_index == 6) {
          if (keyInfo15.macro_endKey == 0) {
            var len12 = keyInfo15.label.split("+");
            var value70 = len12[len12.length - 1];
            for (var len13 = 0; len13 < S.mouse_key_labels.length; len13++) {
              if (S.mouse_key_labels[len13] == value70) {
                layui4('[name="mapping-macro-stop-key"]').val(len13);
                layui.form.render("select");
                keyInfo15.macro_endKey = get_key_id_from_name(keyInfo15.name);
                el.msg(layui.i18np.prop("STRID_SETTING_MAPPING_MACRO_TRIGGER_TOGGLE_LOOP_WARNING"), {
                  "icon": 0
                }, function() {
                });
                break;
              }
            }
          }
        }
      }
    });
    layui3.on("mapping-apply-and-onboard-action", {
      "apply": async function() {
        if (!S.editing) {
          return;
        }
        var layui10 = layui.layer;
        var layui11 = layui.i18np;
        var offset7 = 0;
        var flag2 = false;
        S.onboard_keys.forEach((item4) => {
          if (item4.configType == 0 && item4.touch_style == 27 && get_key_id_by_name(DS.current_usb_client, item4.name).length == 1 && item4.mouse_mapping_keys == "[0,0,256]") {
            offset7++;
          }
          if (item4.configType >= 0 && item4.name == "M1") {
            flag2 = true;
          }
        });
        if (!flag2) {
          offset7++;
        }
        if (offset7 == 0) {
          layui10.confirm(layui11.prop("STRID_SETTING_MAPPING_NOT_SUPPORTED"), {
            "title": layui11.prop("STRID_SETTING_MAPPING_SAVE_AND_APPLY"),
            "skin": "layui-layer-confirm",
            "btn": [layui11.prop("STRING_CANCEL")],
            "btnAlign": "c",
            "btn1": function() {
              layui10.closeLast(0);
            }
          });
          return;
        }
        for (var len14 = 0; len14 < S.onboard_keys.length; len14++) {
          if (S.onboard_keys[len14].configType != 5) {
            for (var index8 = S.onboard_keys.length - 1; index8 > len14; index8--) {
              if (S.onboard_keys[index8].configType == S.onboard_keys[len14].configType && S.onboard_keys[index8].name == S.onboard_keys[len14].name) {
                S.onboard_keys.splice(index8, 1);
              }
            }
          }
        }
        layui10.confirm(layui11.prop("STRID_SETTING_MAPPING_SAVE_TO_FDS_CONFIRM"), {
          "title": layui11.prop("STRID_SETTING_MAPPING_APPLY_AND_ONBOARD"),
          "skin": "layui-layer-confirm",
          "btn": [layui11.prop("STRING_CANCEL"), layui11.prop("STRID_SETTING_MAPPING_SAVE_TO_FDS_S"), layui11.prop("STRID_SETTING_MAPPING_NOT_SAVE_TO_FDS_S")],
          "btnAlign": "c",
          "btn1": function() {
            layui10.closeLast(0);
          },
          "btn2": function() {
            layui10.closeLast(0);
            var status3 = (S.onboard_status[S.onboard_config_index] & 128) != 0;
            var payload = [];
            if (status3) {
              for (var len15 = 0; len15 < S.onboard_keys.length; len15++) {
                var value71 = S.onboard_keys[len15];
                if (value71.configType == 0 && value71.touch_style == 29 && (value71.mouse_mapping_function == 17 || value71.mouse_mapping_function == 18 || value71.mouse_mapping_function == 19)) {
                  for (var offset8 = 0; offset8 < S.onboard_configs.length; offset8++) {
                    if (offset8 != S.onboard_config_index) {
                      status3 = (S.onboard_status[offset8] & 128) != 0;
                      if (status3) {
                        var flag3 = false;
                        var arr2 = S.onboard_configs[offset8];
                        for (var offset9 = 0; offset9 < arr2.length; offset9++) {
                          var json = arr2[offset9];
                          if (json.configType == 0 && json.touch_style == 29 && (json.mouse_mapping_function == 17 || json.mouse_mapping_function == 18 || json.mouse_mapping_function == 19)) {
                            flag3 = true;
                            break;
                          }
                        }
                        if (!flag3) {
                          var flag4 = false;
                          for (var offset9 = 0; offset9 < arr2.length; offset9++) {
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
              for (var offset8 = 0; offset8 < S.onboard_configs.length; offset8++) {
                var arr2 = S.onboard_configs[offset8];
                for (var offset9 = 0; offset9 < payload.length; offset9++) {
                  if (offset8 == payload[offset9]) {
                    send_event_config_reset(DS.current_usb_client);
                    var value72 = 1 | offset8 << 8;
                    send_event_action(DS.current_usb_client, 52, value72);
                    arr2.forEach((item5) => {
                      write_mouse_param(DS.current_usb_client, item5);
                    });
                    send_event_action(DS.current_usb_client, 52, 256);
                  }
                }
              }
            }
            send_event_config_reset(DS.current_usb_client);
            var value72 = 1 | S.onboard_config_index << 8;
            send_event_action(DS.current_usb_client, 52, value72);
            S.onboard_keys.forEach((item6) => {
              write_mouse_param(DS.current_usb_client, item6);
            });
            send_event_action(DS.current_usb_client, 52, 0);
            S.need_save = false;
            ui_refresh_onboard_config(DS.current_usb_client);
          },
          "btn3": function() {
            layui10.closeLast(0);
            send_event_config_reset(DS.current_usb_client);
            S.onboard_keys.forEach((item7) => {
              write_mouse_param(DS.current_usb_client, item7);
            });
            S.need_save = false;
            ui_refresh_onboard_config(DS.current_usb_client);
          }
        });
      }
    });
    layui3.on("factory-reset-action", {
      "apply": async function() {
        el.open({
          "type": 1,
          "title": str.prop("STRID_TITLE_WARNING"),
          "skin": "layui-layer-confirm",
          "content": layui4("#factory-reset-panel"),
          "btn": [str.prop("STRID_SETTING_FACTORY_RESET_S"), str.prop("STRID_BUTTON_CANCEL")],
          "btnAlign": "c",
          "btn1": function() {
            el.closeLast(0);
            send_event_factory_reset(DS.current_usb_client, layui4('[name="factory-reset-esb"]')[0].checked);
          },
          "btn2": function() {
            el.closeLast(0);
          }
        });
      }
    });
    layui3.on("mapping-key-action", {
      "record": async function() {
        S.key_record_panel_id = el.open({
          "type": 1,
          "title": str.prop("STRID_SETTING_MAPPING_KEY_RECORD_TITLE"),
          "skin": "layui-layer-confirm",
          "btn": [str.prop("STRID_SETTING_MAPPING_KEY_RECORD_RESET"), str.prop("STRID_DONE")],
          "btnAlign": "c",
          "content": layui4("#record-mapping-key-panel"),
          "btn1": function() {
            if (record_mouse_key_delay_timer_id != void 0) {
              clearTimeout(record_mouse_key_delay_timer_id);
              record_mouse_key_delay_timer_id = void 0;
            }
            S.setting_mapping_keys_recorded = [-1, -1, -1];
            refresh_recorded_mapping_keys();
          },
          "btn2": function() {
            if (record_mouse_key_delay_timer_id != void 0) {
              clearTimeout(record_mouse_key_delay_timer_id);
              record_mouse_key_delay_timer_id = void 0;
            }
            el.closeLast(0);
            if (S.setting_mapping_keys_recorded[0] > 0 || S.setting_mapping_keys_recorded[1] > 0 || S.setting_mapping_keys_recorded[2] > 0) {
              var len16 = modifiers;
              var len17 = keys;
              layui4('[name="mapping-ctrl-key1"]').val(0);
              for (var offset10 = 0; offset10 < len16.length; offset10++) {
                if (S.setting_mapping_keys_recorded[0] == len16[offset10].vCode) {
                  layui4('[name="mapping-ctrl-key1"]').val(offset10);
                  break;
                }
              }
              layui4('[name="mapping-ctrl-key2"]').val(0);
              for (var offset10 = 0; offset10 < len16.length; offset10++) {
                if (S.setting_mapping_keys_recorded[1] == len16[offset10].vCode) {
                  layui4('[name="mapping-ctrl-key2"]').val(offset10);
                  break;
                }
              }
              layui4('[name="mapping-key"]').val(0);
              for (var offset10 = 0; offset10 < len17.length; offset10++) {
                if (S.setting_mapping_keys_recorded[2] == len17[offset10].vCode) {
                  layui4('[name="mapping-key"]').val(offset10);
                  break;
                }
              }
              layui.form.render("select");
              set_mapping_keys(DS.current_usb_client);
              ui_refresh_tab_mapping_key(DS.current_usb_client);
            }
          },
          "cancel": function(result, data, index) {
            if (record_mouse_key_delay_timer_id != void 0) {
              clearTimeout(record_mouse_key_delay_timer_id);
              record_mouse_key_delay_timer_id = void 0;
            }
            return true;
          },
          "end": function() {
            if (record_mouse_key_delay_timer_id != void 0) {
              clearTimeout(record_mouse_key_delay_timer_id);
              record_mouse_key_delay_timer_id = void 0;
            }
            S.setting_mapping_key_recording = false;
            document.oncontextmenu = null;
            S.key_record_panel_id = void 0;
          }
        });
        S.setting_mapping_key_recording = true;
        S.setting_mapping_keys_recorded = [-1, -1, -1];
        refresh_recorded_mapping_keys();
        document.oncontextmenu = function(result) {
          result.preventDefault();
        };
      }
    });
    layui2.on("select(key-delay-select-key)", function(result) {
      var value73 = result.elem;
      var value74 = value73.value;
      if (value74 > 0) {
        ui_refresh_setting(DS.current_usb_client);
      }
    });
    layui3.on("key-delay-action", {
      "click": async function() {
        el.open({
          "type": 1,
          "title": false,
          "skin": "layui-layer-confirm",
          "content": layui4("#key-delay-guide-panel")
        });
      }
    });
    layui3.on("wireless-optimize-action", {
      "click": async function() {
        layui4("#wireless-optimize-busy").text("");
        el.open({
          "type": 1,
          "title": str.prop("STRID_SETTING_FACTORY_TEST"),
          "skin": "layui-layer-confirm",
          "content": layui4("#wireless-optimize-panel"),
          "btn": [str.prop("STRING_CANCEL"), str.prop("STRID_SETTING_FACTORY_START")],
          "btnAlign": "c",
          "btn1": function() {
            el.closeLast(0);
          },
          "btn2": function() {
            S.wireless_optimizing = true;
            send_event_action(DS.current_usb_client, 64, 0);
            layui4("#wireless-optimize-busy").text(str.prop("STRID_SETTING_FACTORY_TESTING") + "1%");
            var now4 = /* @__PURE__ */ new Date();
            layui3.countdown({
              "date": now4.getTime() + 15e3,
              "now": now4,
              "clock": function(h, m) {
                layui4("#wireless-optimize-busy").text(str.prop("STRID_SETTING_FACTORY_TESTING") + Math.round((15 - h.s) * 100 / 15) + "%");
              },
              "done": function(result, data) {
                setTimeout(() => {
                  el.closeLast(0);
                  S.wireless_optimizing = false;
                  DS.current_usb_client.esb_last_alive_time = (/* @__PURE__ */ new Date()).getTime();
                }, 1e3);
              }
            });
            return false;
          }
        });
      }
    });
    layui2.on("radio(receiver-light-mode)", function(result) {
      var value75 = result.elem;
      var value76 = value75.checked;
      var value77 = value75.value;
      if (value76) {
        set_light(S.current_usb_receiver, value77);
      }
    });
    layui2.on("radio(setting-fw-channel)", function(result) {
      var value78 = result.elem;
      var value79 = value78.checked;
      var value80 = value78.value;
      if (value79) {
        if ((DS.current_usb_client.device_info != void 0 && DS.current_usb_client.device_info.revision != void 0 && DS.current_usb_client.device_info.revision.substr(0, 2) == "G-") != (value80 == 1)) {
          el.confirm(str.prop("STRID_WEBHUB_GOM_REBOOT_NEEDED"), {
            "title": str.prop("STRID_SETTING_MOUSE_REBOOT"),
            "btn": [str.prop("STRID_SETTING_MOUSE_REBOOT_S"), str.prop("STRID_BUTTON_CANCEL")],
            "cancel": function(result2, layero, that) {
              if (DS.current_usb_client.device_info != void 0 && DS.current_usb_client.device_info.revision != void 0 && DS.current_usb_client.device_info.revision.substr(0, 2) == "G-") {
                layui4('[name="setting-fw-channel"]')[1].checked = true;
              } else {
                layui4('[name="setting-fw-channel"]')[0].checked = true;
              }
              layui4('[name="setting-fw-channel"]')[0].disabled = !DS.current_usb_client.device_info.dynamicGOM;
              layui4('[name="setting-fw-channel"]')[1].disabled = !DS.current_usb_client.device_info.dynamicGOM;
              layui.form.render("radio");
              return true;
            }
          }, function() {
            el.closeLast(0);
            send_event_gaming_only(DS.current_usb_client, value80 == 1);
            send_event_action(DS.current_usb_client, 51, 0);
          }, function() {
            if (DS.current_usb_client.device_info != void 0 && DS.current_usb_client.device_info.revision != void 0 && DS.current_usb_client.device_info.revision.substr(0, 2) == "G-") {
              layui4('[name="setting-fw-channel"]')[1].checked = true;
            } else {
              layui4('[name="setting-fw-channel"]')[0].checked = true;
            }
            layui4('[name="setting-fw-channel"]')[0].disabled = !DS.current_usb_client.device_info.dynamicGOM;
            layui4('[name="setting-fw-channel"]')[1].disabled = !DS.current_usb_client.device_info.dynamicGOM;
            layui.form.render("radio");
          });
        }
      }
    });
    layui2.on("select(kbd_onboard-config)", function(result) {
      var value81 = result.elem;
      var value82 = value81.value;
      if (DS.current_usb_client.device_info.onboardIndex != value82) {
        hs_set_onboard_index(DS.current_usb_client, value82);
        show_waiting();
      }
    });
    layui9.on("tab(kbd-main-setting-type)", function(result) {
      var value83 = result.index;
      kbd_update_setting_tab(DS.current_usb_client, value83);
    });
    layui9.on("tab(kbd-setting-key-type)", function(result) {
      var value84 = result.index;
      kbd_update_key_setting_tab(DS.current_usb_client, value84);
    });
    layui9.on("tab(kbd-setting-light-type)", function(result) {
      var value85 = result.index;
      kbd_update_light_setting_tab(DS.current_usb_client, value85);
    });
    layui9.on("tab(kbd-setting-advance-key-type)", function(result) {
      var value86 = result.index;
      kbd_update_advance_key_setting_tab(DS.current_usb_client, value86);
    });
    layui3.on("kbd-main-setting-action", {
      "select": async function() {
        var attr6 = this.getAttribute("index");
        layui.element.tabChange("kbd-main-setting-type", attr6);
      }
    });
    layui2.on("radio(kbd-key-layer)", function(result) {
      var value87 = result.elem;
      var value88 = value87.checked;
      var value89 = value87.value;
      if (value88) {
        S.kbd_key_infos.splice(0, S.kbd_key_infos.length);
        S.kbd_layer_id = value89;
        var kbd_key_infos = DS.current_usb_client.device_info.kbd_key_infos;
        if (value89 == 1) {
          if (S.kbd_key_infos.length >= S.kbd_key_num * 2 - 1) {
            for (var offset11 = 0; offset11 < S.kbd_key_num; offset11++) {
              var value90 = S.kbd_key_infos[offset11 + S.kbd_key_num];
              S.kbd_key_infos.push(kbd_clone_pc_key_info(value90));
            }
          }
        } else {
          if (S.kbd_key_infos.length >= S.kbd_key_num) {
            for (var offset11 = 0; offset11 < S.kbd_key_num; offset11++) {
              var value90 = S.kbd_key_infos[offset11];
              S.kbd_key_infos.push(kbd_clone_pc_key_info(value90));
            }
          }
        }
        S.kbd_key_matrix_index = -1;
        kbd_ui_refresh_key_desc(DS.current_usb_client);
        kbd_ui_refresh_key_matrix(DS.current_usb_client);
      }
    });
    layui3.on("kbd-key-matrix-action", {
      "select": async function() {
        var attr7 = this.getAttribute("kbd-key-matrix-index");
        S.kbd_key_matrix_index = Number(attr7);
        S.kbd_select_keyId = 0;
        kbd_ui_refresh_key_desc(DS.current_usb_client);
        kbd_ui_refresh_key_matrix(DS.current_usb_client);
      }
    });
    layui3.on("kbd-macro-action", {
      "select": async function() {
        S.kbd_key_matrix_index = this.getAttribute("kbd-macro-index");
      }
    });
    layui3.on("kbd-key-default-action", {
      "select": async function() {
        if (S.kbd_key_matrix_index < 0) {
          return;
        }
        var offset12 = 0;
        if (S.kbd_layer_id == 0) {
          offset12 = S.kbd_keys[S.kbd_key_matrix_index].keyId;
        }
        var item8 = S.kbd_key_infos[S.kbd_key_matrix_index];
        item8.keyId = offset12;
        item8.name = get_key_name_from_keyid(item8.keyId);
        kbd_ui_refresh_key_desc(DS.current_usb_client);
        kbd_ui_refresh_key_matrix(DS.current_usb_client);
        hs_set_keycode(DS.current_usb_client, S.kbd_layer_id, item8.row, item8.col, item8.keyId);
      }
    });
    layui3.on("kbd-key-set-action", {
      "select": async function() {
        if (S.kbd_key_matrix_index < 0) {
          return;
        }
        if (S.kbd_select_keyId > 0) {
          var item9 = S.kbd_key_infos[S.kbd_key_matrix_index];
          item9.keyId = S.kbd_select_keyId;
          item9.name = get_key_name_from_keyid(item9.keyId);
          kbd_ui_refresh_key_desc(DS.current_usb_client);
          kbd_ui_refresh_key_matrix(DS.current_usb_client);
          S.kbd_select_keyId = 0;
          hs_set_keycode(DS.current_usb_client, S.kbd_layer_id, item9.row, item9.col, item9.keyId);
        }
      }
    });
    layui3.on("kbd-select-key-action", {
      "select": async function() {
        var attr8 = this.getAttribute("kbd-select-key-index");
        var kbdSelectKeysRef = kbd_select_keys;
        S.kbd_select_keyId = kbdSelectKeysRef[attr8].keyId;
        kbd_ui_refresh_key_desc(DS.current_usb_client);
        if (S.select_key_panel_id != void 0) {
          el.close(S.select_key_panel_id);
        }
      }
    });
    layui3.on("mouse-select-key-action", {
      "select": async function() {
        var attr9 = this.getAttribute("mouse-select-key-index");
        var mouseSelectKeysRef = mouse_select_keys;
        S.kbd_select_keyId = mouseSelectKeysRef[attr9].keyId;
        kbd_ui_refresh_key_desc(DS.current_usb_client);
        if (S.select_key_panel_id != void 0) {
          el.close(S.select_key_panel_id);
        }
      }
    });
    layui3.on("kbd-key-rgb-action", {
      "select": async function() {
        var attr10 = this.getAttribute("kbd-key-rgb-index");
        var kbdRgbKeysRef = kbd_rgb_keys;
        S.kbd_select_keyId = kbdRgbKeysRef[attr10].keyId;
        kbd_ui_refresh_key_desc(DS.current_usb_client);
      }
    });
    layui3.on("kbd-key-media-action", {
      "select": async function() {
        var attr11 = this.getAttribute("kbd-key-media-index");
        var kbdMediaKeysRef = kbd_media_keys;
        S.kbd_select_keyId = kbdMediaKeysRef[attr11].keyId;
        kbd_ui_refresh_key_desc(DS.current_usb_client);
      }
    });
    layui3.on("kbd-key-windows-action", {
      "select": async function() {
        var attr12 = this.getAttribute("kbd-key-windows-index");
        var kbdWindowsKeysRef = kbd_windows_keys;
        S.kbd_select_keyId = kbdWindowsKeysRef[attr12].keyId;
        kbd_ui_refresh_key_desc(DS.current_usb_client);
      }
    });
    layui3.on("kbd-key-switch-wasd-action", {
      "select": async function() {
        S.kbd_select_keyId = 36866;
        kbd_ui_refresh_key_desc(DS.current_usb_client);
      }
    });
    layui3.on("kbd-key-switch-mac-mode-action", {
      "select": async function() {
        S.kbd_select_keyId = 36867;
        kbd_ui_refresh_key_desc(DS.current_usb_client);
      }
    });
    layui3.on("kbd-light-action", {
      "select": async function() {
        var attr13 = this.getAttribute("value");
        if (attr13 == "WASD") {
          S.kbd_matrix_select_keys.splice(0, S.kbd_matrix_select_keys.length);
          for (let len18 = 0; len18 < S.kbd_key_infos.length; len18++) {
            var value91 = S.kbd_key_infos[len18].name;
            if (value91 == "W" || value91 == "A" || value91 == "S" || value91 == "D") {
              S.kbd_matrix_select_keys.push(S.kbd_edit_info.keys[len18]);
            }
            if (S.kbd_matrix_select_keys.length >= 4) {
              break;
            }
          }
        } else {
          if (attr13 == "ALL") {
            S.kbd_matrix_select_keys.splice(0, S.kbd_matrix_select_keys.length);
            for (let len19 = 0; len19 < S.kbd_key_infos.length; len19++) {
              S.kbd_matrix_select_keys.push(S.kbd_edit_info.keys[len19]);
            }
          } else {
            if (attr13 == "REVERSE") {
              var len20 = S.kbd_matrix_select_keys.slice();
              S.kbd_matrix_select_keys.splice(0, S.kbd_matrix_select_keys.length);
              for (let len21 = 0; len21 < S.kbd_key_infos.length; len21++) {
                var flag5 = false;
                for (let len22 = 0; len22 < len20.length; len22++) {
                  if (len20[len22].row == S.kbd_key_infos[len21].row && len20[len22].col == S.kbd_key_infos[len21].col) {
                    flag5 = true;
                    len20.splice(len22, 1);
                    break;
                  }
                }
                if (!flag5) {
                  S.kbd_matrix_select_keys.push(S.kbd_edit_info.keys[len21]);
                }
              }
            } else if (attr13 == "CLEAR") {
              S.kbd_matrix_select_keys.splice(0, S.kbd_matrix_select_keys.length);
            }
          }
        }
        kbd_ui_refresh_light_matrix(DS.current_usb_client);
        kbd_ui_refresh_light(DS.current_usb_client);
        if (S.kbd_matrix_select_keys.length > 0) {
          layui4("#kbd-light-button-container").css("display", "flex");
        } else {
          layui4("#kbd-light-button-container").css("display", "none");
        }
      }
    });
    layui3.on("kbd-light-cancel-action", {
      "select": async function() {
        S.kbd_matrix_select_keys.splice(0, S.kbd_matrix_select_keys.length);
        kbd_ui_refresh_light_matrix(DS.current_usb_client);
        layui4("#kbd-light-button-container").css("display", "none");
      }
    });
    layui3.on("kbd-light-save-action", {
      "select": async function() {
        if (S.kbd_matrix_select_keys.length > 0) {
          for (let len23 = 0; len23 < S.kbd_matrix_select_keys.length; len23++) {
            S.kbd_matrix_select_keys[len23].hue = S.kbd_edit_info.hue;
            S.kbd_matrix_select_keys[len23].sat = S.kbd_edit_info.sat;
          }
          show_waiting();
          hs_set_light_define_infos(DS.current_usb_client, S.kbd_matrix_select_keys);
          S.kbd_matrix_select_keys.splice(0, S.kbd_matrix_select_keys.length);
          kbd_ui_refresh_light_matrix(DS.current_usb_client);
          layui4("#kbd-light-button-container").css("display", "none");
        }
      }
    });
    layui2.on("select(kbd-light-mode)", function(result) {
      var value92 = result.elem;
      var index9 = value92.value;
      var value93 = S.kbd_light_mode[index9].mode;
      if (S.kbd_edit_info.mode != value93) {
        S.kbd_edit_info.mode = value93;
        S.kbd_matrix_select_keys.splice(0, S.kbd_matrix_select_keys.length);
        hs_set_light(DS.current_usb_client, 2, S.kbd_edit_info);
        kbd_ui_refresh_light_matrix(DS.current_usb_client);
        kbd_ui_refresh_light(DS.current_usb_client);
        layui4("#kbd-light-button-container").css("display", "none");
      }
    });
    layui2.on("select(kbd-light-box-mode)", function(result) {
      var value94 = result.elem;
      var index10 = value94.value;
      var value95 = S.kbd_light_mode[index10].mode;
      if (S.kbd_edit_info.light_box_info.mode != value95) {
        S.kbd_edit_info.light_box_info.mode = value95;
        hs_set_light_box(DS.current_usb_client, S.kbd_edit_info.light_box_info);
      }
    });
    layui2.on("select(kbd-light-sleep-time)", function(result) {
      var value96 = result.elem;
      var index11 = value96.value;
      var value97 = S.kbd_sleep_time[index11].mode;
      if (S.kbd_edit_info.sleep_time != value97) {
        S.kbd_edit_info.sleep_time = value97;
        hs_set_light_sleep_time(DS.current_usb_client, value97);
      }
    });
    layui2.on("switch(kbd-light-box-colored)", function(result) {
      if (result.elem.checked) {
        S.kbd_edit_info.light_box_info.colored = 1;
      } else {
        S.kbd_edit_info.light_box_info.colored = 0;
      }
      hs_set_light_box(DS.current_usb_client, S.kbd_edit_info.light_box_info);
    });
    document.getElementById("color-r-input").addEventListener("change", function(item10) {
      if (item10.target.value.length == 0) {
        layui4("#color-r-input").val(0);
      }
    });
    document.getElementById("color-g-input").addEventListener("change", function(item11) {
      if (item11.target.value.length == 0) {
        layui4("#color-g-input").val(0);
      }
    });
    document.getElementById("color-b-input").addEventListener("change", function(item12) {
      if (item12.target.value.length == 0) {
        layui4("#color-b-input").val(0);
      }
    });
    layui4("#color-r-input").on("input", function(result) {
      var value98 = result.delegateTarget.value;
      var value99 = parseInt(value98);
      var value100 = parseInt(layui4("#color-g-input").val());
      var value101 = parseInt(layui4("#color-b-input").val());
      if (isNaN(value99) || value99 < 0 || value99 > 255) {
        value99 = 0;
      }
      if (isNaN(value100) || value100 < 0 || value100 > 255) {
        value100 = 0;
      }
      if (isNaN(value101) || value101 < 0 || value101 > 255) {
        value101 = 0;
      }
      document.getElementById("pick-color").value = rgbToHex(value99, value100, value101);
      var value102 = rgbToHsv(value99, value100, value101);
      if (S.kbd_edit_info.hue != value102.h || S.kbd_edit_info.sat != value102.s) {
        S.kbd_edit_info.hue = value102.h;
        S.kbd_edit_info.sat = value102.s;
        if (S.kbd_edit_info.mode != 0 && S.kbd_edit_info.mode != 45) {
          hs_set_light(DS.current_usb_client, 4, S.kbd_edit_info);
        }
      }
    });
    layui4("#color-g-input").on("input", function(result) {
      var value103 = result.delegateTarget.value;
      var value104 = parseInt(layui4("#color-r-input").val());
      var value105 = parseInt(value103);
      var value106 = parseInt(layui4("#color-b-input").val());
      if (isNaN(value104) || value104 < 0 || value104 > 255) {
        value104 = 0;
      }
      if (isNaN(value105) || value105 < 0 || value105 > 255) {
        value105 = 0;
      }
      if (isNaN(value106) || value106 < 0 || value106 > 255) {
        value106 = 0;
      }
      document.getElementById("pick-color").value = rgbToHex(value104, value105, value106);
      var value107 = rgbToHsv(value104, value105, value106);
      if (S.kbd_edit_info.hue != value107.h || S.kbd_edit_info.sat != value107.s) {
        S.kbd_edit_info.hue = value107.h;
        S.kbd_edit_info.sat = value107.s;
        if (S.kbd_edit_info.mode != 0 && S.kbd_edit_info.mode != 45) {
          hs_set_light(DS.current_usb_client, 4, S.kbd_edit_info);
        }
      }
    });
    layui4("#color-b-input").on("input", function(result) {
      var value108 = result.delegateTarget.value;
      var value109 = parseInt(layui4("#color-r-input").val());
      var value110 = parseInt(layui4("#color-g-input").val());
      var value111 = parseInt(value108);
      if (isNaN(value109) || value109 < 0 || value109 > 255) {
        value109 = 0;
      }
      if (isNaN(value110) || value110 < 0 || value110 > 255) {
        value110 = 0;
      }
      if (isNaN(value111) || value111 < 0 || value111 > 255) {
        value111 = 0;
      }
      document.getElementById("pick-color").value = rgbToHex(value109, value110, value111);
      var value112 = rgbToHsv(value109, value110, value111);
      if (S.kbd_edit_info.hue != value112.h || S.kbd_edit_info.sat != value112.s) {
        S.kbd_edit_info.hue = value112.h;
        S.kbd_edit_info.sat = value112.s;
        if (S.kbd_edit_info.mode != 0 && S.kbd_edit_info.mode != 45) {
          hs_set_light(DS.current_usb_client, 4, S.kbd_edit_info);
        }
      }
    });
    document.getElementById("light-box-color-r-input").addEventListener("change", function(item13) {
      if (item13.target.value.length == 0) {
        layui4("#light-box-color-r-input").val(0);
      }
    });
    document.getElementById("light-box-color-g-input").addEventListener("change", function(item14) {
      if (item14.target.value.length == 0) {
        layui4("#light-box-color-g-input").val(0);
      }
    });
    document.getElementById("light-box-color-b-input").addEventListener("change", function(item15) {
      if (item15.target.value.length == 0) {
        layui4("#vcolor-b-input").val(0);
      }
    });
    layui4("#light-box-color-r-input").on("input", function(result) {
      var value113 = result.delegateTarget.value;
      var value114 = parseInt(value113);
      var value115 = parseInt(layui4("#light-box-color-g-input").val());
      var value116 = parseInt(layui4("#light-box-color-b-input").val());
      if (isNaN(value114) || value114 < 0 || value114 > 255) {
        value114 = 0;
      }
      if (isNaN(value115) || value115 < 0 || value115 > 255) {
        value115 = 0;
      }
      if (isNaN(value116) || value116 < 0 || value116 > 255) {
        value116 = 0;
      }
      document.getElementById("light-box-pick-color").value = rgbToHex(value114, value115, value116);
      if (S.kbd_edit_info.light_box_info.r != value114 || S.kbd_edit_info.light_box_info.g != value115 || S.kbd_edit_info.light_box_info.b != value116) {
        S.kbd_edit_info.light_box_info.r = value114;
        S.kbd_edit_info.light_box_info.g = value115;
        S.kbd_edit_info.light_box_info.b = value116;
        hs_set_light_box(DS.current_usb_client, S.kbd_edit_info.light_box_info);
      }
    });
    layui4("#light-box-color-g-input").on("input", function(result) {
      var value117 = result.delegateTarget.value;
      var value118 = parseInt(layui4("#light-box-color-r-input").val());
      var value119 = parseInt(value117);
      var value120 = parseInt(layui4("#light-box-color-b-input").val());
      if (isNaN(value118) || value118 < 0 || value118 > 255) {
        value118 = 0;
      }
      if (isNaN(value119) || value119 < 0 || value119 > 255) {
        value119 = 0;
      }
      if (isNaN(value120) || value120 < 0 || value120 > 255) {
        value120 = 0;
      }
      document.getElementById("light-box-pick-color").value = rgbToHex(value118, value119, value120);
      if (S.kbd_edit_info.light_box_info.r != value118 || S.kbd_edit_info.light_box_info.g != value119 || S.kbd_edit_info.light_box_info.b != value120) {
        S.kbd_edit_info.light_box_info.r = value118;
        S.kbd_edit_info.light_box_info.g = value119;
        S.kbd_edit_info.light_box_info.b = value120;
        hs_set_light_box(DS.current_usb_client, S.kbd_edit_info.light_box_info);
      }
    });
    layui4("#light-box-color-b-input").on("input", function(result) {
      var value121 = result.delegateTarget.value;
      var value122 = parseInt(layui4("#light-box-color-r-input").val());
      var value123 = parseInt(layui4("#light-box-color-g-input").val());
      var value124 = parseInt(value121);
      if (isNaN(value122) || value122 < 0 || value122 > 255) {
        value122 = 0;
      }
      if (isNaN(value123) || value123 < 0 || value123 > 255) {
        value123 = 0;
      }
      if (isNaN(value124) || value124 < 0 || value124 > 255) {
        value124 = 0;
      }
      document.getElementById("light-box-pick-color").value = rgbToHex(value122, value123, value124);
      if (S.kbd_edit_info.light_box_info.r != value122 || S.kbd_edit_info.light_box_info.g != value123 || S.kbd_edit_info.light_box_info.b != value124) {
        S.kbd_edit_info.light_box_info.r = value122;
        S.kbd_edit_info.light_box_info.g = value123;
        S.kbd_edit_info.light_box_info.b = value124;
        hs_set_light_box(DS.current_usb_client, S.kbd_edit_info.light_box_info);
      }
    });
    layui3.on("kbd-axis-matrix-action", {
      "select": async function() {
        var attr14 = this.getAttribute("kbd-axis-matrix-index");
        S.kbd_key_matrix_index = Number(attr14);
        var flag6 = false;
        for (let len24 = 0; len24 < S.kbd_matrix_select_keys.length; len24++) {
          if (S.kbd_matrix_select_keys[len24].row == S.kbd_key_infos[S.kbd_key_matrix_index].row && S.kbd_matrix_select_keys[len24].col == S.kbd_key_infos[S.kbd_key_matrix_index].col) {
            S.kbd_matrix_select_keys.splice(len24, 1);
            flag6 = true;
            break;
          }
        }
        if (!flag6) {
          S.kbd_matrix_select_keys.push(kbd_clone_axis_info(S.kbd_axis_infos[S.kbd_key_matrix_index]));
        }
        kbd_ui_refresh_axis_matrix(DS.current_usb_client);
        kbd_ui_refresh_axis(DS.current_usb_client);
      }
    });
    layui3.on("kbd-axis-action", {
      "select": async function() {
        var attr15 = this.getAttribute("value");
        if (attr15 == "WASD") {
          S.kbd_matrix_select_keys.splice(0, S.kbd_matrix_select_keys.length);
          for (let len25 = 0; len25 < S.kbd_key_infos.length; len25++) {
            var value125 = S.kbd_key_infos[len25].name;
            if (value125 == "W" || value125 == "A" || value125 == "S" || value125 == "D") {
              S.kbd_matrix_select_keys.push(S.kbd_axis_infos[len25]);
            }
            if (S.kbd_matrix_select_keys.length >= 4) {
              break;
            }
          }
        } else {
          if (attr15 == "ALL") {
            S.kbd_matrix_select_keys.splice(0, S.kbd_matrix_select_keys.length);
            for (let len26 = 0; len26 < S.kbd_axis_infos.length; len26++) {
              S.kbd_matrix_select_keys.push(S.kbd_axis_infos[len26]);
            }
          } else {
            if (attr15 == "REVERSE") {
              var len27 = S.kbd_matrix_select_keys.slice();
              S.kbd_matrix_select_keys.splice(0, S.kbd_matrix_select_keys.length);
              for (let len28 = 0; len28 < S.kbd_key_infos.length; len28++) {
                var flag7 = false;
                for (let len29 = 0; len29 < len27.length; len29++) {
                  if (len27[len29].row == S.kbd_key_infos[len28].row && len27[len29].col == S.kbd_key_infos[len28].col) {
                    flag7 = true;
                    len27.splice(len29, 1);
                    break;
                  }
                }
                if (!flag7) {
                  S.kbd_matrix_select_keys.push(S.kbd_axis_infos[len28]);
                }
              }
            } else if (attr15 == "CLEAR") {
              S.kbd_matrix_select_keys.splice(0, S.kbd_matrix_select_keys.length);
            }
          }
        }
        kbd_ui_refresh_axis_matrix(DS.current_usb_client);
        kbd_ui_refresh_axis(DS.current_usb_client);
      }
    });
    layui3.on("layui-axis-type-action", {
      "select": async function() {
        var attr16 = this.getAttribute("index");
        if (S.kbd_edit_info.switch_type != Number(attr16)) {
          S.kbd_edit_info.switch_type = Number(attr16);
          kbd_ui_refresh_axis(DS.current_usb_client);
        }
      }
    });
    layui2.on("radio(kbd-axis-mode)", function(result) {
      var value126 = result.elem;
      var value127 = value126.checked;
      var value128 = value126.value;
      if (value127) {
        if (value128 != DS.current_usb_client.device_info.kbd_axis_mode) {
          hs_set_axis_mode(DS.current_usb_client, value128);
        }
      }
    });
    layui2.on("switch(kbd-axis-quick-tigger-mode)", function(result) {
      if (result.elem.checked) {
        S.kbd_edit_info.rt_enable = 1;
      } else {
        S.kbd_edit_info.rt_enable = 0;
      }
      kbd_ui_refresh_axis(DS.current_usb_client);
    });
    layui3.on("kbd-light-matrix-action", {
      "select": async function() {
        if (S.kbd_edit_info.mode != 45) {
          return;
        }
        S.kbd_key_matrix_index = this.getAttribute("kbd-light-matrix-index");
        var flag8 = false;
        for (let len30 = 0; len30 < S.kbd_matrix_select_keys.length; len30++) {
          var value129 = S.kbd_matrix_select_keys[len30];
          if (S.kbd_key_infos[S.kbd_key_matrix_index].row == S.kbd_matrix_select_keys[len30].row && S.kbd_key_infos[S.kbd_key_matrix_index].col == S.kbd_matrix_select_keys[len30].col) {
            S.kbd_matrix_select_keys.splice(len30, 1);
            flag8 = true;
            break;
          }
        }
        if (!flag8) {
          S.kbd_matrix_select_keys.push(S.kbd_edit_info.keys[S.kbd_key_matrix_index]);
        }
        kbd_ui_refresh_light_matrix(DS.current_usb_client);
        kbd_ui_refresh_light(DS.current_usb_client);
        if (S.kbd_matrix_select_keys.length > 0) {
          layui4("#kbd-light-button-container").css("display", "flex");
        } else {
          layui4("#kbd-light-button-container").css("display", "none");
        }
      }
    });
    layui3.on("kbd-axis-cancel-action", {
      "select": async function() {
        S.kbd_matrix_select_keys.splice(0, S.kbd_matrix_select_keys.length);
        kbd_ui_refresh_axis(DS.current_usb_client);
        kbd_ui_refresh_axis_matrix(DS.current_usb_client);
        layui4("#kbd-axis-button-container").css("display", "none");
      }
    });
    layui3.on("kbd-axis-save-action", {
      "select": async function() {
        if (S.kbd_matrix_select_keys.length > 0) {
          for (let len31 = 0; len31 < S.kbd_matrix_select_keys.length; len31++) {
            S.kbd_matrix_select_keys[len31].switch_type = S.kbd_edit_info.switch_type;
            S.kbd_matrix_select_keys[len31].rt_enable = S.kbd_edit_info.rt_enable;
            S.kbd_matrix_select_keys[len31].apc_lv = S.kbd_edit_info.apc_lv;
            S.kbd_matrix_select_keys[len31].rt_press_lv = S.kbd_edit_info.rt_press_lv;
            S.kbd_matrix_select_keys[len31].rt_release_lv = S.kbd_edit_info.rt_release_lv;
            S.kbd_matrix_select_keys[len31].top_dz = S.kbd_edit_info.top_dz;
            S.kbd_matrix_select_keys[len31].btm_dz = S.kbd_edit_info.btm_dz;
          }
          show_waiting();
          hs_set_axis_infos(DS.current_usb_client, S.kbd_matrix_select_keys);
          S.kbd_matrix_select_keys.splice(0, S.kbd_matrix_select_keys.length);
          kbd_ui_refresh_axis(DS.current_usb_client);
          kbd_ui_refresh_axis_matrix(DS.current_usb_client);
          layui4("#kbd-axis-button-container").css("display", "none");
        }
      }
    });
    layui3.on("kbd-advance-key-matrix-action", {
      "select": async function() {
        var attr17 = this.getAttribute("kbd-key-matrix-index");
        if (S.kbd_key_matrix_index == Number(attr17)) {
          return;
        }
        S.kbd_key_matrix_index = Number(attr17);
        var flag9 = false;
        for (let len32 = 0; len32 < S.kbd_socd_infos.length; len32++) {
          if (S.kbd_key_infos[S.kbd_key_matrix_index].row == S.kbd_socd_infos[len32].row1 && S.kbd_key_infos[S.kbd_key_matrix_index].col == S.kbd_socd_infos[len32].col1 || S.kbd_key_infos[S.kbd_key_matrix_index].row == S.kbd_socd_infos[len32].row2 && S.kbd_key_infos[S.kbd_key_matrix_index].col == S.kbd_socd_infos[len32].col2) {
            S.kbd_key_setting_index = 0;
            layui.element.tabChange("kbd-setting-advance-key-type", 0);
            flag9 = true;
            break;
          }
        }
        for (let len33 = 0; len33 < S.kbd_mt_infos.length; len33++) {
          if (S.kbd_key_infos[S.kbd_key_matrix_index].row == S.kbd_mt_infos[len33].row && S.kbd_key_infos[S.kbd_key_matrix_index].col == S.kbd_mt_infos[len33].col) {
            S.kbd_key_setting_index = 1;
            layui.element.tabChange("kbd-setting-advance-key-type", 1);
            flag9 = true;
            break;
          }
        }
        for (let len34 = 0; len34 < S.kbd_rs_infos.length; len34++) {
          if (S.kbd_key_infos[S.kbd_key_matrix_index].row == S.kbd_rs_infos[len34].row1 && S.kbd_key_infos[S.kbd_key_matrix_index].col == S.kbd_rs_infos[len34].col1 || S.kbd_key_infos[S.kbd_key_matrix_index].row == S.kbd_rs_infos[len34].row2 && S.kbd_key_infos[S.kbd_key_matrix_index].col == S.kbd_rs_infos[len34].col2) {
            S.kbd_key_setting_index = 2;
            layui.element.tabChange("kbd-setting-advance-key-type", 2);
            flag9 = true;
            break;
          }
        }
        if (!flag9) {
          if (S.kbd_key_setting_index == 0) {
            if (S.kbd_select_elementId == "kbd-socd-key1") {
              document.getElementById("kbd-socd-key1").style.borderColor = "#16B777";
              document.getElementById("kbd-socd-key1").textContent = S.kbd_key_infos[S.kbd_key_matrix_index].name;
              S.kbd_edit_info.row1 = S.kbd_key_infos[S.kbd_key_matrix_index].row;
              S.kbd_edit_info.col1 = S.kbd_key_infos[S.kbd_key_matrix_index].col;
            } else if (S.kbd_select_elementId == "kbd-socd-key2") {
              document.getElementById("kbd-socd-key2").style.borderColor = "#16B777";
              document.getElementById("kbd-socd-key2").textContent = S.kbd_key_infos[S.kbd_key_matrix_index].name;
              S.kbd_edit_info.row2 = S.kbd_key_infos[S.kbd_key_matrix_index].row;
              S.kbd_edit_info.col2 = S.kbd_key_infos[S.kbd_key_matrix_index].col;
            } else {
              layui.element.tabChange("kbd-setting-advance-key-type", 0);
            }
          } else {
            if (S.kbd_key_setting_index == 2) {
              if (S.kbd_select_elementId == "kbd-rs-key1") {
                document.getElementById("kbd-rs-key1").style.borderColor = "#16B777";
                document.getElementById("kbd-rs-key1").textContent = S.kbd_key_infos[S.kbd_key_matrix_index].name;
                S.kbd_edit_info.row1 = S.kbd_key_infos[S.kbd_key_matrix_index].row;
                S.kbd_edit_info.col1 = S.kbd_key_infos[S.kbd_key_matrix_index].col;
              } else if (S.kbd_select_elementId == "kbd-rs-key2") {
                document.getElementById("kbd-rs-key2").style.borderColor = "#16B777";
                document.getElementById("kbd-rs-key2").textContent = S.kbd_key_infos[S.kbd_key_matrix_index].name;
                S.kbd_edit_info.row2 = S.kbd_key_infos[S.kbd_key_matrix_index].row;
                S.kbd_edit_info.col2 = S.kbd_key_infos[S.kbd_key_matrix_index].col;
              } else {
                layui.element.tabChange("kbd-setting-advance-key-type", 2);
              }
            } else {
              if (S.kbd_key_setting_index == 1) {
                layui.element.tabChange("kbd-setting-advance-key-type", 1);
              } else if (S.kbd_key_setting_index == 3) {
                layui.element.tabChange("kbd-setting-advance-key-type", 3);
              }
            }
          }
        }
        kbd_ui_refresh_advance_key_desc(DS.current_usb_client);
        if (S.kbd_key_setting_index != 0) {
          kbd_ui_refresh_advance_key_matrix(DS.current_usb_client);
        }
      }
    });
    layui3.on("kbd-advance-key-delete-action", {
      "select": async function() {
        if (S.kbd_key_matrix_index < 0) {
          return;
        }
        if (S.kbd_key_setting_index == 0) {
          for (var offset13 = 0; offset13 < S.kbd_socd_infos.length; offset13++) {
            var value130 = S.kbd_socd_infos[offset13];
            if (value130.row1 == S.kbd_edit_info.row1 && value130.col1 == S.kbd_edit_info.col1 && value130.row2 == S.kbd_edit_info.row2 && value130.col2 == S.kbd_edit_info.col2) {
              S.kbd_socd_infos.splice(offset13, 1);
              break;
            }
          }
          if (S.kbd_socd_infos.length > 0) {
            hs_set_socd_infos(DS.current_usb_client, S.kbd_socd_infos);
          } else {
            hs_set_socd_num(DS.current_usb_client, 0);
          }
        } else {
          if (S.kbd_key_setting_index == 2) {
            for (var offset13 = 0; offset13 < S.kbd_rs_infos.length; offset13++) {
              var value131 = S.kbd_rs_infos[offset13];
              if (value131.row1 == S.kbd_edit_info.row1 && value131.col1 == S.kbd_edit_info.col1 && value131.row2 == S.kbd_edit_info.row2 && value131.col2 == S.kbd_edit_info.col2) {
                S.kbd_rs_infos.splice(offset13, 1);
                break;
              }
            }
            if (S.kbd_rs_infos.length > 0) {
              hs_set_rs_infos(DS.current_usb_client, S.kbd_rs_infos);
            } else {
              hs_set_rs_num(DS.current_usb_client, 0);
            }
          } else {
            if (S.kbd_key_setting_index == 1) {
              for (var offset13 = 0; offset13 < S.kbd_mt_infos.length; offset13++) {
                var value132 = S.kbd_mt_infos[offset13];
                if (value132.row == S.kbd_edit_info.row && value132.col == S.kbd_edit_info.col) {
                  S.kbd_mt_infos.splice(offset13, 1);
                  break;
                }
              }
              if (S.kbd_mt_infos.length > 0) {
                hs_set_mt_infos(DS.current_usb_client, S.kbd_mt_infos);
              } else {
                hs_set_mt_num(DS.current_usb_client, 0);
              }
            } else {
              if (S.kbd_key_setting_index == 3) {
                for (var offset13 = 0; offset13 < S.kbd_dks_infos.length; offset13++) {
                  var value133 = S.kbd_dks_infos[offset13];
                  if (value133.row == S.kbd_edit_info.row && value133.col == S.kbd_edit_info.col) {
                    S.kbd_dks_infos.splice(offset13, 1);
                    break;
                  }
                }
                if (S.kbd_dks_infos.length > 0) {
                  hs_set_dks_infos(DS.current_usb_client, S.kbd_dks_infos);
                } else {
                  hs_set_dks_num(DS.current_usb_client, 0);
                }
              }
            }
          }
        }
      }
    });
    layui3.on("kbd-advance-key-set-action", {
      "select": async function() {
        if (S.kbd_key_matrix_index < 0) {
          return;
        }
        if (S.kbd_key_setting_index == 0) {
          var flag10 = false;
          for (var offset14 = 0; offset14 < S.kbd_socd_infos.length; offset14++) {
            if (S.kbd_socd_infos[offset14].row1 == S.kbd_edit_info.row1 && S.kbd_socd_infos[offset14].col1 == S.kbd_edit_info.col1 || S.kbd_socd_infos[offset14].row2 == S.kbd_edit_info.row2 && S.kbd_socd_infos[offset14].col2 == S.kbd_edit_info.col2 || S.kbd_socd_infos[offset14].row2 == S.kbd_edit_info.row1 && S.kbd_socd_infos[offset14].col2 == S.kbd_edit_info.col1 || S.kbd_socd_infos[offset14].row1 == S.kbd_edit_info.row2 && S.kbd_socd_infos[offset14].col1 == S.kbd_edit_info.col2) {
              S.kbd_edit_info.id = S.kbd_socd_infos[offset14].id;
              S.kbd_socd_infos[offset14] = kbd_clone_socd_info(S.kbd_edit_info);
              flag10 = true;
              break;
            }
          }
          if (!flag10) {
            if (S.kbd_socd_infos.length >= 20) {
              el.confirm(str.prop("STRID_KBD_ADVANCE_KEY_MAX_HINT"), {
                "title": str.prop("STRID_TITLE_WARNING"),
                "skin": "layui-layer-confirm",
                "btn": [str.prop("STRING_OK")],
                "btnAlign": "c",
                "btn1": function() {
                  el.closeLast(0);
                }
              });
              return;
            }
            S.kbd_edit_info.id = S.kbd_socd_infos.length;
            S.kbd_socd_infos.push(kbd_clone_socd_info(S.kbd_edit_info));
          }
          hs_set_socd_infos(DS.current_usb_client, S.kbd_socd_infos);
        } else {
          if (S.kbd_key_setting_index == 2) {
            var flag10 = false;
            for (var offset14 = 0; offset14 < S.kbd_rs_infos.length; offset14++) {
              if (S.kbd_rs_infos[offset14].row1 == S.kbd_edit_info.row1 && S.kbd_rs_infos[offset14].col1 == S.kbd_edit_info.col1 || S.kbd_rs_infos[offset14].row2 == S.kbd_edit_info.row2 && S.kbd_rs_infos[offset14].col2 == S.kbd_edit_info.col2 || S.kbd_rs_infos[offset14].row2 == S.kbd_edit_info.row1 && S.kbd_rs_infos[offset14].col2 == S.kbd_edit_info.col1 || S.kbd_rs_infos[offset14].row1 == S.kbd_edit_info.row2 && S.kbd_rs_infos[offset14].col1 == S.kbd_edit_info.col2) {
                S.kbd_edit_info.id = S.kbd_rs_infos[offset14].id;
                S.kbd_rs_infos[offset14] = kbd_clone_rs_info(S.kbd_edit_info);
                flag10 = true;
                break;
              }
            }
            if (!flag10) {
              if (S.kbd_rs_infos.length >= 20) {
                el.confirm(str.prop("STRID_KBD_ADVANCE_KEY_MAX_HINT"), {
                  "title": str.prop("STRID_TITLE_WARNING"),
                  "skin": "layui-layer-confirm",
                  "btn": [str.prop("STRING_OK")],
                  "btnAlign": "c",
                  "btn1": function() {
                    el.closeLast(0);
                  }
                });
                return;
              }
              S.kbd_edit_info.id = S.kbd_rs_infos.length;
              S.kbd_rs_infos.push(kbd_clone_rs_info(S.kbd_edit_info));
            }
            hs_set_rs_infos(DS.current_usb_client, S.kbd_rs_infos);
          } else {
            if (S.kbd_key_setting_index == 1) {
              var flag10 = false;
              for (var offset14 = 0; offset14 < S.kbd_mt_infos.length; offset14++) {
                if (S.kbd_mt_infos[offset14].row == S.kbd_edit_info.row && S.kbd_mt_infos[offset14].col == S.kbd_edit_info.col) {
                  S.kbd_mt_infos[offset14] = kbd_clone_mt_info(S.kbd_edit_info);
                  flag10 = true;
                  break;
                }
              }
              if (!flag10) {
                if (S.kbd_mt_infos.length >= 20) {
                  el.confirm(str.prop("STRID_KBD_ADVANCE_KEY_MAX_HINT"), {
                    "title": str.prop("STRID_TITLE_WARNING"),
                    "skin": "layui-layer-confirm",
                    "btn": [str.prop("STRING_OK")],
                    "btnAlign": "c",
                    "btn1": function() {
                      el.closeLast(0);
                    }
                  });
                  return;
                }
                S.kbd_edit_info.id = S.kbd_mt_infos.length;
                S.kbd_edit_info.row = S.kbd_key_infos[S.kbd_key_matrix_index].row;
                S.kbd_edit_info.col = S.kbd_key_infos[S.kbd_key_matrix_index].col;
                S.kbd_mt_infos.push(kbd_clone_mt_info(S.kbd_edit_info));
              }
              hs_set_mt_infos(DS.current_usb_client, S.kbd_mt_infos);
            } else {
              if (S.kbd_key_setting_index == 3) {
                var flag10 = false;
                for (var offset14 = 0; offset14 < S.kbd_dks_infos.length; offset14++) {
                  if (S.kbd_dks_infos[offset14].row == S.kbd_edit_info.row && S.kbd_dks_infos[offset14].col == S.kbd_edit_info.col) {
                    S.kbd_dks_infos[offset14] = kbd_clone_dks_info(S.kbd_edit_info);
                    flag10 = true;
                    break;
                  }
                }
                if (!flag10) {
                  if (S.kbd_dks_infos.length >= 20) {
                    el.confirm(str.prop("STRID_KBD_ADVANCE_KEY_MAX_HINT"), {
                      "title": str.prop("STRID_TITLE_WARNING"),
                      "skin": "layui-layer-confirm",
                      "btn": [str.prop("STRING_OK")],
                      "btnAlign": "c",
                      "btn1": function() {
                        el.closeLast(0);
                      }
                    });
                    return;
                  }
                  S.kbd_edit_info.id = S.kbd_dks_infos.length;
                  S.kbd_edit_info.row = S.kbd_key_infos[S.kbd_key_matrix_index].row;
                  S.kbd_edit_info.col = S.kbd_key_infos[S.kbd_key_matrix_index].col;
                  S.kbd_dks_infos.push(kbd_clone_dks_info(S.kbd_edit_info));
                }
                hs_set_dks_infos(DS.current_usb_client, S.kbd_dks_infos);
              }
            }
          }
        }
      }
    });
    layui3.on("kbd-socd-key1-action", {
      "select": async function() {
        if (S.kbd_select_elementId == "kbd-socd-key1") {
          S.kbd_select_elementId = "";
          document.getElementById("kbd-socd-key1").style.color = is_dark_theme() ? "white" : "black";
          document.getElementById("kbd-socd-key1").style.backgroundColor = "transparent";
        } else {
          S.kbd_select_elementId = "kbd-socd-key1";
          document.getElementById("kbd-socd-key1").style.color = is_dark_theme() ? "white" : "black";
          document.getElementById("kbd-socd-key1").style.backgroundColor = "#16B77788";
        }
        document.getElementById("kbd-socd-key2").style.backgroundColor = "transparent";
        kbd_ui_refresh_advance_key_matrix(DS.current_usb_client);
      }
    });
    layui3.on("kbd-socd-key2-action", {
      "select": async function() {
        if (S.kbd_select_elementId == "kbd-socd-key2") {
          S.kbd_select_elementId = "";
          document.getElementById("kbd-socd-key2").style.color = is_dark_theme() ? "white" : "black";
          document.getElementById("kbd-socd-key2").style.backgroundColor = "transparent";
        } else {
          S.kbd_select_elementId = "kbd-socd-key2";
          document.getElementById("kbd-socd-key2").style.color = is_dark_theme() ? "white" : "black";
          document.getElementById("kbd-socd-key2").style.backgroundColor = "#16B77788";
        }
        document.getElementById("kbd-socd-key1").style.backgroundColor = "transparent";
        kbd_ui_refresh_advance_key_matrix(DS.current_usb_client);
      }
    });
    layui2.on("radio(kbd-socd-type)", function(result) {
      var value134 = result.elem;
      var value135 = value134.checked;
      var value136 = value134.value;
      if (value135) {
        if (S.kbd_edit_info.socd_mode != Number(value136)) {
          S.kbd_edit_info.socd_mode = Number(value136);
          kbd_ui_refresh_advance_key_desc(DS.current_usb_client);
        }
      }
    });
    layui3.on("kbd-mt-key1-action", {
      "select": async function() {
        if (S.kbd_key_matrix_index < 0) {
          el.confirm(str.prop("STRID_KBD_MT_HINT"), {
            "title": str.prop("STRID_TITLE_WARNING"),
            "skin": "layui-layer-confirm",
            "btn": [str.prop("STRING_OK")],
            "btnAlign": "c",
            "btn1": function() {
              el.closeLast(0);
            }
          });
          return;
        }
        dialog_select_key_init("kbd-mt-key1");
        S.select_key_panel_id = el.open({
          "type": 1,
          "title": str.prop("STRID_SETTING_MAPPING_SELECT_KEY"),
          "skin": "layui-layer-confirm",
          "btn": [],
          "btnAlign": "c",
          "content": layui4("#select-key-panel"),
          "end": function() {
            S.select_key_panel_id = void 0;
          }
        });
      }
    });
    layui3.on("kbd-mt-key2-action", {
      "select": async function() {
        if (S.kbd_key_matrix_index < 0) {
          el.confirm(str.prop("STRID_KBD_MT_HINT"), {
            "title": str.prop("STRID_TITLE_WARNING"),
            "skin": "layui-layer-confirm",
            "btn": [str.prop("STRING_OK")],
            "btnAlign": "c",
            "btn1": function() {
              el.closeLast(0);
            }
          });
          return;
        }
        dialog_select_key_init("kbd-mt-key2");
        S.select_key_panel_id = el.open({
          "type": 1,
          "title": str.prop("STRID_SETTING_MAPPING_SELECT_KEY"),
          "skin": "layui-layer-confirm",
          "btn": [],
          "btnAlign": "c",
          "content": layui4("#select-key-panel"),
          "end": function() {
            S.select_key_panel_id = void 0;
          }
        });
      }
    });
    layui3.on("kbd-rs-key1-action", {
      "select": async function() {
        if (S.kbd_select_elementId == "kbd-rs-key1") {
          S.kbd_select_elementId = "";
          document.getElementById("kbd-rs-key1").style.color = is_dark_theme() ? "white" : "black";
          document.getElementById("kbd-rs-key1").style.backgroundColor = "transparent";
        } else {
          S.kbd_select_elementId = "kbd-rs-key1";
          document.getElementById("kbd-rs-key1").style.color = is_dark_theme() ? "white" : "black";
          document.getElementById("kbd-rs-key1").style.backgroundColor = "#16B77788";
        }
        document.getElementById("kbd-rs-key2").style.backgroundColor = "transparent";
        kbd_ui_refresh_advance_key_matrix(DS.current_usb_client);
      }
    });
    layui3.on("kbd-rs-key2-action", {
      "select": async function() {
        if (S.kbd_select_elementId == "kbd-rs-key2") {
          S.kbd_select_elementId = "";
          document.getElementById("kbd-rs-key2").style.color = is_dark_theme() ? "white" : "black";
          document.getElementById("kbd-rs-key2").style.backgroundColor = "transparent";
        } else {
          S.kbd_select_elementId = "kbd-rs-key2";
          document.getElementById("kbd-rs-key2").style.color = is_dark_theme() ? "white" : "black";
          document.getElementById("kbd-rs-key2").style.backgroundColor = "#16B77788";
        }
        document.getElementById("kbd-rs-key1").style.backgroundColor = "transparent";
        kbd_ui_refresh_advance_key_matrix(DS.current_usb_client);
      }
    });
    layui3.on("kbd-dks-select-key-action", {
      "select": async function() {
        if (S.kbd_key_matrix_index < 0) {
          el.confirm(str.prop("STRID_KBD_MT_HINT"), {
            "title": str.prop("STRID_TITLE_WARNING"),
            "skin": "layui-layer-confirm",
            "btn": [str.prop("STRING_OK")],
            "btnAlign": "c",
            "btn1": function() {
              el.closeLast(0);
            }
          });
          return;
        }
        var attr18 = this.getAttribute("keyId");
        dialog_select_key_init("kbd-dks-key" + attr18);
        S.select_key_panel_id = el.open({
          "type": 1,
          "title": str.prop("STRID_SETTING_MAPPING_SELECT_KEY"),
          "skin": "layui-layer-confirm",
          "btn": [],
          "btnAlign": "c",
          "content": layui4("#select-key-panel"),
          "end": function() {
            S.select_key_panel_id = void 0;
          }
        });
      }
    });
    layui3.on("kbd-dks-key-action", {
      "select": async function() {
        if (S.kbd_key_matrix_index < 0) {
          el.confirm(str.prop("STRID_KBD_MT_HINT"), {
            "title": str.prop("STRID_TITLE_WARNING"),
            "skin": "layui-layer-confirm",
            "btn": [str.prop("STRING_OK")],
            "btnAlign": "c",
            "btn1": function() {
              el.closeLast(0);
            }
          });
          return;
        }
        if (S.kbd_dks_dragging && S.kbd_dks_dragging_up) {
          S.kbd_dks_dragging = false;
          S.kbd_dks_dragging_up = false;
          return;
        }
        var attr19 = this.getAttribute("keyId");
        var value137 = Math.floor(attr19 / 10);
        var value138 = attr19 % 10;
        var el2 = "kbd-dks-key" + value137 + "-" + value138;
        var value139 = "#kbd-dks-add" + value137 + "-" + value138;
        var value140 = "#kbd-dks-arrow" + value137 + "-" + value138;
        var offset15 = 0;
        if (value137 == 1) {
          offset15 = S.kbd_edit_info.state1;
        } else {
          if (value137 == 2) {
            offset15 = S.kbd_edit_info.state2;
          } else {
            if (value137 == 3) {
              offset15 = S.kbd_edit_info.state3;
            } else if (value137 == 4) {
              offset15 = S.kbd_edit_info.state4;
            }
          }
        }
        if (layui4(value140).css("display") != "none") {
          var value141 = layui4("#" + el2).css("width");
          if (value138 == 1) {
            if (value141 == "24px") {
              offset15 = offset15 & 1022;
            } else {
              if (value141 == "77px") {
                offset15 = offset15 & 1020;
              } else {
                if (value141 == "104px") {
                  offset15 = offset15 & 1008;
                } else {
                  if (value141 == "157px") {
                    offset15 = offset15 & 992;
                  } else {
                    if (value141 == "184px") {
                      offset15 = offset15 & 896;
                    } else {
                      if (value141 == "237px") {
                        offset15 = offset15 & 768;
                      } else if (value141 == "264px") {
                        offset15 = 0;
                      }
                    }
                  }
                }
              }
            }
          } else {
            if (value138 == 2) {
              if (value141 == "24px") {
                offset15 = offset15 & 1015;
              } else {
                if (value141 == "77px") {
                  offset15 = offset15 & 999;
                } else {
                  if (value141 == "104px") {
                    offset15 = offset15 & 903;
                  } else {
                    if (value141 == "157px") {
                      offset15 = offset15 & 775;
                    } else if (value141 == "184px") {
                      offset15 = offset15 & 7;
                    }
                  }
                }
              }
            } else {
              if (value138 == 3) {
                if (value141 == "24px") {
                  offset15 = offset15 & 959;
                } else {
                  if (value141 == "77px") {
                    offset15 = offset15 & 831;
                  } else if (value141 == "104px") {
                    offset15 = offset15 & 63;
                  }
                }
              } else if (value138 == 4) {
                offset15 = offset15 & 511;
              }
            }
          }
          if (value137 == 1) {
            S.kbd_edit_info.state1 = offset15;
          } else {
            if (value137 == 2) {
              S.kbd_edit_info.state2 = offset15;
            } else {
              if (value137 == 3) {
                S.kbd_edit_info.state3 = offset15;
              } else if (value137 == 4) {
                S.kbd_edit_info.state4 = offset15;
              }
            }
          }
          kbd_ui_refresh_dks_step(value137, offset15);
        } else {
          document.getElementById(el2).className = "rounded-border-green";
          layui4("#" + el2).css("width", "24");
          layui4(value139).css("display", "none");
          layui4(value140).css("display", "");
          layui4(value140).css("margin-left", 14);
          if (value138 == 1) {
            offset15 = offset15 | 1;
          } else {
            if (value138 == 2) {
              offset15 = offset15 | 8;
            } else {
              if (value138 == 3) {
                offset15 = offset15 | 64;
              } else if (value138 == 4) {
                offset15 = offset15 | 512;
              }
            }
          }
          if (value137 == 1) {
            S.kbd_edit_info.state1 = offset15;
          } else {
            if (value137 == 2) {
              S.kbd_edit_info.state2 = offset15;
            } else {
              if (value137 == 3) {
                S.kbd_edit_info.state3 = offset15;
              } else if (value137 == 4) {
                S.kbd_edit_info.state4 = offset15;
              }
            }
          }
        }
        kbd_ui_refresh_advance_key_desc(DS.current_usb_client);
      }
    });
    layui3.on("kbd-dks-clean-action", {
      "select": async function() {
        var attr20 = this.getAttribute("keyId");
        var el3 = "kbd-dks-key" + attr20;
        document.getElementById(el3).style.borderColor = "gray";
        document.getElementById(el3).textContent = layui.i18np.prop("STRID_KBD_MT_SELECT_KEY");
        var value142 = Number(attr20);
        if (value142 == 1) {
          S.kbd_edit_info.state1 = 0;
          S.kbd_edit_info.keyCode1 = 0;
        } else {
          if (value142 == 2) {
            S.kbd_edit_info.state2 = 0;
            S.kbd_edit_info.keyCode2 = 0;
          } else {
            if (value142 == 3) {
              S.kbd_edit_info.state3 = 0;
              S.kbd_edit_info.keyCode3 = 0;
            } else if (value142 == 4) {
              S.kbd_edit_info.state4 = 0;
              S.kbd_edit_info.keyCode4 = 0;
            }
          }
        }
        kbd_ui_refresh_dks_step(value142, 0);
        kbd_ui_refresh_advance_key_desc(DS.current_usb_client);
      }
    });
    layui3.on("kbd-fireware-download-action", {
      "download": async function() {
        window.location.href = "https://static.miracletek.net/pc/RAWMHUB_WIN7.zip";
      }
    });
    layui3.on("kbd-factory-reset-action", {
      "apply": async function() {
        el.open({
          "type": 1,
          "title": str.prop("STRID_TITLE_WARNING"),
          "skin": "layui-layer-confirm",
          "content": layui4("#kbd-factory-reset-panel"),
          "btn": [str.prop("STRID_SETTING_FACTORY_RESET_S"), str.prop("STRID_BUTTON_CANCEL")],
          "btnAlign": "c",
          "btn1": function() {
            el.closeLast(0);
            hs_set_factory_reset(DS.current_usb_client);
          },
          "btn2": function() {
            el.closeLast(0);
          }
        });
      }
    });
    layui3.on("kbd-keycode-factory-reset-action", {
      "apply": async function() {
        el.open({
          "type": 1,
          "title": str.prop("STRID_TITLE_WARNING"),
          "skin": "layui-layer-confirm",
          "content": layui4("#kbd-keycode-factory-reset-panel"),
          "btn": [str.prop("STRID_SETTING_FACTORY_RESET_S"), str.prop("STRID_BUTTON_CANCEL")],
          "btnAlign": "c",
          "btn1": function() {
            el.closeLast(0);
            hs_set_keycode_factory_reset(DS.current_usb_client);
          },
          "btn2": function() {
            el.closeLast(0);
          }
        });
      }
    });
    layui3.on("dialog-select-key-action", {
      "select": async function() {
        var attr21 = this.getAttribute("kbd-select-key-index");
        attr21 = Number(attr21);
        var attr22 = this.getAttribute("elementId");
        var kbdSelectKeys = kbd_select_keys;
        document.getElementById(attr22).style.color = is_dark_theme() ? "white" : "black";
        document.getElementById(attr22).style.borderColor = "#16B777";
        document.getElementById(attr22).textContent = kbdSelectKeys[attr21].name;
        if (attr22 == "kbd-mt-key1") {
          S.kbd_edit_info.keyCode1 = kbdSelectKeys[attr21].keyId;
          kbd_ui_refresh_advance_key_desc(DS.current_usb_client);
        } else {
          if (attr22 == "kbd-mt-key2") {
            S.kbd_edit_info.keyCode2 = kbdSelectKeys[attr21].keyId;
            kbd_ui_refresh_advance_key_desc(DS.current_usb_client);
          } else {
            if (attr22 == "kbd-dks-key1") {
              S.kbd_edit_info.keyCode1 = kbdSelectKeys[attr21].keyId;
              kbd_ui_refresh_advance_key_desc(DS.current_usb_client);
            } else {
              if (attr22 == "kbd-dks-key2") {
                S.kbd_edit_info.keyCode2 = kbdSelectKeys[attr21].keyId;
                kbd_ui_refresh_advance_key_desc(DS.current_usb_client);
              } else {
                if (attr22 == "kbd-dks-key3") {
                  S.kbd_edit_info.keyCode3 = kbdSelectKeys[attr21].keyId;
                  kbd_ui_refresh_advance_key_desc(DS.current_usb_client);
                } else if (attr22 == "kbd-dks-key4") {
                  S.kbd_edit_info.keyCode4 = kbdSelectKeys[attr21].keyId;
                  kbd_ui_refresh_advance_key_desc(DS.current_usb_client);
                }
              }
            }
          }
        }
        if (S.select_key_panel_id != void 0) {
          el.close(S.select_key_panel_id);
        }
      }
    });
    layui3.on("dialog-mouse-select-key-action", {
      "select": async function() {
        var attr23 = this.getAttribute("mouse-select-key-index");
        var attr24 = this.getAttribute("elementId");
        var mouseSelectKeysRef2 = mouse_select_keys;
        document.getElementById(attr24).style.borderColor = "#16B777";
        document.getElementById(attr24).textContent = mouseSelectKeysRef2[attr23].name;
        if (S.select_key_panel_id != void 0) {
          el.close(S.select_key_panel_id);
        }
      }
    });
    layui3.on("kbd-macro-item-action", {
      "select": async function() {
        var attr25 = this.getAttribute("kbd-macro-item-index");
        S.kbd_macro_select_index = Number(attr25);
        S.edit_macros = [];
        for (var len35 = 0; len35 < S.kbd_macro_infos[S.kbd_macro_select_index].length; len35++) {
          S.edit_macros.push(clone_macro_info(S.kbd_macro_infos[S.kbd_macro_select_index][len35]));
        }
        S.kbd_select_keyId = 30464 + S.kbd_macro_select_index;
        kbd_ui_macro_init(DS.current_usb_client);
        kbd_ui_macro_edit_init(DS.current_usb_client);
        kbd_ui_refresh_key_desc(DS.current_usb_client);
      }
    });
    layui3.on("kbd-macro-add-select-key-action", {
      "select": async function() {
        dialog_select_key_init("kbd-macro-add-select-key");
        S.select_key_panel_id = el.open({
          "type": 1,
          "title": str.prop("STRID_SETTING_MAPPING_SELECT_KEY"),
          "skin": "layui-layer-confirm",
          "btn": [],
          "btnAlign": "c",
          "content": layui4("#select-key-panel"),
          "end": function() {
            S.select_key_panel_id = void 0;
          }
        });
      }
    });
    layui3.on("kbd-macro-record-action", {
      "select": async function() {
        var flag11 = false;
        S.setting_macro_edit_recording = false;
        S.setting_macro_edit_recording_time = -1;
        document.oncontextmenu = function(result) {
          result.preventDefault();
        };
        S.macro_record_panel_id = el.open({
          "type": 1,
          "title": str.prop("STRID_SETTING_MAPPING_MACRO_RECORD_TITLE"),
          "skin": "layui-layer-confirm",
          "content": layui4("#setting-mapping-macro-record-panel"),
          "btn": [str.prop("STRID_SETTING_FACTORY_START")],
          "btnAlign": "c",
          "btn1": function() {
            if (!flag11) {
              flag11 = true;
              S.setting_macro_edit_recording = true;
              var value143 = layui4("#layui-layer" + S.macro_record_panel_id + " .layui-layer-btn .layui-layer-btn0");
              value143.html(str.prop("STRID_DONE"));
              layui4("#macro-record-waiting-info").css("display", "");
              layui4("#macro-record-fixed-time-container").css("display", "none");
              return false;
            } else {
              if (record_mouse_key_delay_timer_id != void 0) {
                clearTimeout(record_mouse_key_delay_timer_id);
                record_mouse_key_delay_timer_id = void 0;
              }
              el.closeLast(0);
              S.setting_macro_edit_recording = false;
              document.oncontextmenu = null;
              layui4("#macro-record-waiting-info").css("display", "none");
              layui4("#macro-record-fixed-time-container").css("display", "");
            }
          },
          "cancel": function(result, data, index) {
            if (flag11) {
              if (record_mouse_key_delay_timer_id != void 0) {
                clearTimeout(record_mouse_key_delay_timer_id);
                record_mouse_key_delay_timer_id = void 0;
              }
              S.setting_macro_edit_recording = false;
              document.oncontextmenu = null;
            }
            return true;
          },
          "end": function() {
            if (flag11) {
              setting_mapping_macro_recording_remove_last();
              if (record_mouse_key_delay_timer_id != void 0) {
                clearTimeout(record_mouse_key_delay_timer_id);
                record_mouse_key_delay_timer_id = void 0;
              }
              S.setting_macro_edit_recording = false;
              document.oncontextmenu = null;
              S.macro_record_panel_id = void 0;
            }
          }
        });
      }
    });
    layui3.on("kbd-macro-add-action", {
      "select": async function() {
        S.macro_keep_time_min = 0;
        S.macro_edit_index = -1;
        S.current_edit_macro = create_macro_info();
        ui_refresh_mapping_macro_add(DS.current_usb_client);
        el.open({
          "type": 1,
          "title": str.prop("STRID_SETTING_MAPPING_MACRO_ACTION_ADD"),
          "skin": "layui-layer-confirm",
          "content": layui4("#setting-mapping-macro-add-panel"),
          "btn": [str.prop("STRID_SAVE")],
          "btnAlign": "c",
          "btn1": function() {
            el.closeLast(0);
            S.current_edit_macro.style = 22;
            var value144 = macro_keys[parseInt(layui4('[name="macro-add-select-key"]').val())].vCode;
            if (value144 == 1025) {
              S.current_edit_macro.mouse_key_event = 522;
              S.current_edit_macro.mouse_key_code = -parseInt(layui4("#macro-add-wheel-delta-input").val());
            } else {
              if (value144 == 1024) {
                S.current_edit_macro.mouse_key_event = 522;
                S.current_edit_macro.mouse_key_code = parseInt(layui4("#macro-add-wheel-delta-input").val());
              } else {
                if (value144 == 1026) {
                  S.current_edit_macro.mouse_key_event = 526;
                  S.current_edit_macro.mouse_key_code = -parseInt(layui4("#macro-add-wheel-delta-input").val());
                } else {
                  if (value144 == 1027) {
                    S.current_edit_macro.mouse_key_event = 526;
                    S.current_edit_macro.mouse_key_code = parseInt(layui4("#macro-add-wheel-delta-input").val());
                  } else {
                    if (value144 == 1028) {
                      S.current_edit_macro.mouse_key_event = 512;
                      var value145 = Math.round(parseFloat(layui4("#macro-add-move-delta-x-input").val()) * 10) + 2047;
                      var value146 = Math.round(parseFloat(layui4("#macro-add-move-delta-y-input").val()) * 10) + 2047;
                      S.current_edit_macro.mouse_key_code = value145 << 16 | value146;
                      S.current_edit_macro.mouse_key_loop = parseInt(layui4("#macro-add-move-loop-input").val());
                      if (S.current_edit_macro.mouse_key_loop <= 0) {
                        S.current_edit_macro.mouse_key_loop = 1;
                      }
                    } else {
                      if (value144 == 1029) {
                        S.current_edit_macro.mouse_key_event = 767;
                        var value147 = parseInt(layui4("#macro-add-position-x-input").val());
                        var value148 = parseInt(layui4("#macro-add-position-y-input").val());
                        var screenW = window.screen.width;
                        var screenH = window.screen.height;
                        value147 = parseInt((value147 + 0.9) * 65535 / screenW);
                        value148 = parseInt((value148 + 0.9) * 65535 / screenH);
                        S.current_edit_macro.mouse_key_code = value147 << 16 | value148;
                      } else {
                        S.current_edit_macro.mouse_key_code = value144;
                        if (layui4('[name="mapping-macro-action-key-event"]')[0].checked) {
                          S.current_edit_macro.mouse_key_event = 256;
                        } else if (layui4('[name="mapping-macro-action-key-event"]')[1].checked) {
                          S.current_edit_macro.mouse_key_event = 257;
                        } else {
                          S.current_edit_macro.mouse_key_event = 0;
                        }
                      }
                    }
                  }
                }
              }
            }
            S.current_edit_macro.name = get_key_name_from_code(value144);
            if (S.current_edit_macro.mouse_key_time == 0 && S.current_edit_macro.mouse_key_code > 0) {
              S.current_edit_macro.mouse_key_time = 1;
            }
            if (S.macro_edit_index < 0) {
              S.edit_macros.push(S.current_edit_macro);
            } else {
              S.edit_macros[S.macro_edit_index] = S.current_edit_macro;
            }
            kbd_ui_macro_edit_init(DS.current_usb_client);
          }
        });
      }
    });
    layui3.on("kbd-macro-clear-action", {
      "select": async function() {
        S.edit_macros = [];
        kbd_ui_macro_edit_init(DS.current_usb_client);
      }
    });
    layui3.on("kbd-macro-save-action", {
      "select": async function() {
        el.closeLast(0);
        if (S.kbd_macro_select_index >= 0) {
          S.kbd_macro_infos[S.kbd_macro_select_index] = [];
          for (var offset16 = 0; offset16 < S.edit_macros.length; offset16++) {
            S.kbd_macro_infos[S.kbd_macro_select_index].push(clone_macro_info(S.edit_macros[offset16]));
          }
          var offset17 = 0;
          for (var offset16 = 0; offset16 < S.kbd_macro_infos.length; offset16++) {
            var len36 = S.kbd_macro_infos[offset16];
            if (len36.length > 0) {
              for (var len37 = 0; len37 < len36.length; len37++) {
                var value149 = len36[len37];
                var value150 = get_keyid_from_code(value149.mouse_key_code);
                if (value149.mouse_key_event == 256) {
                  offset17 = 1;
                  macroBuff.push(offset17);
                  offset17 = 2;
                  macroBuff.push(offset17);
                  offset17 = value150 & 255;
                  macroBuff.push(offset17);
                  offset17 = 1;
                  macroBuff.push(offset17);
                  offset17 = 4;
                  macroBuff.push(offset17);
                  var value151 = value149.mouse_key_time.toString();
                  for (var offset18 = 0; offset18 < value151.length; offset18++) {
                    offset17 = value151[offset18].charCodeAt();
                    macroBuff.push(offset17);
                  }
                  offset17 = 1;
                  macroBuff.push(offset17);
                } else {
                  offset17 = 1;
                  macroBuff.push(offset17);
                  offset17 = 3;
                  macroBuff.push(offset17);
                  offset17 = value150 & 255;
                  macroBuff.push(offset17);
                  offset17 = 1;
                  macroBuff.push(offset17);
                  offset17 = 4;
                  macroBuff.push(offset17);
                  var value151 = value149.mouse_key_time.toString();
                  for (var offset18 = 0; offset18 < value151.length; offset18++) {
                    offset17 = value151[offset18].charCodeAt();
                    macroBuff.push(offset17);
                  }
                  offset17 = 1;
                  macroBuff.push(offset17);
                }
              }
            }
            offset17 = 0;
            macroBuff.push(offset17);
          }
          log_r(macroBuff);
          if (macroBuff.length > DS.current_usb_client.device_info.kbd_macro_max_size) {
            el.msg(layui.i18np.prop("STRID_SETTING_MAPPING_MACRO_RECORD_MAX_EX"), {
              "icon": 0
            }, function() {
            });
            return true;
          }
          show_waiting();
          hs_set_macro_buf(DS.current_usb_client, S.kbd_macro_infos);
          kbd_ui_macro_init(DS.current_usb_client);
        }
      }
    });
    if (platform.os.family.indexOf("Windows") >= 0 && parseFloat(platform.os.version) <= 6.1) {
      document.getElementById("rawmhub-url").href = "https://static.miracletek.net/pc/RAWMHUB_WIN7.zip";
    } else {
      document.getElementById("rawmhub-url").href = "https://static.miracletek.net/pc/RAWMHUB.zip";
    }
    layui2.render();
    clearTimeout(S.resize_timer_id);
    S.resize_timer_id = setTimeout(do_resize, RESIZE_DEBOUNCE_MS);
  });

  // ui/ui-mapping.js
  function setting_mapping_init(client) {
    if (client != void 0 ? is_hs_keyboard(client.device) : false) {
      return;
    }
    var layui2 = layui.table;
    S.select_key_name = "";
    select_mapping_type(client, 3);
    S.onboard_index = client.device_info.onboardIndex;
    S.onboard_configs = JSON.parse(JSON.stringify(client.device_info.allKeyConfigs));
    S.onboard_status = client.device_info.onboardStatus;
    S.onboard_keys = S.onboard_configs[S.onboard_index];
    S.mouse_keys = get_keys(client);
    S.setting_mapping_keys = [];
    for (let len = 0; len < S.mouse_keys.length; len++) {
      S.setting_mapping_keys.push("setting_mapping_key_m" + (len + 1));
    }
    S.mouse_key_labels = [];
    S.mouse_key_labels.push(layui.i18np.prop("STRID_NONE"));
    for (let index = 0; index < S.mouse_keys.length; index++) {
      S.mouse_key_labels.push(S.mouse_keys[index].label);
    }
    var el = document.getElementById("key-delay-guide-img");
    el.src = get_setup_icon(client);
    var html2 = '<select name="key-delay-select-key" lay-verify="required" lay-filter="key-delay-select-key">';
    for (let offset = 0; offset < S.mouse_key_labels.length; offset++) {
      if (offset == 0) {
        html2 += '<option value="' + offset + '">' + layui.i18np.prop("STRID_SETTING_SELECT_KEY_ALL") + "</option>";
      } else {
        var value = S.mouse_key_labels[offset];
        if (S.mouse_key_labels[offset] == "\xE2\u2018 ") {
          value = layui.i18np.prop("STRID_KEY_LEFT_S");
        } else {
          if (S.mouse_key_labels[offset] == "\xE2\u2018\xA1") {
            value = layui.i18np.prop("STRID_KEY_MIDDLE_S");
          } else if (S.mouse_key_labels[offset] == "\xE2\u2018\xA2") {
            value = layui.i18np.prop("STRID_KEY_RIGHT_S");
          }
        }
        if (S.mouse_keys[offset - 1].visible != void 0 && !S.mouse_keys[offset - 1].visible) {
          html2 += '<option value="' + offset + '" disabled>' + value + "</option>";
        } else {
          html2 += '<option value="' + offset + '">' + value + "</option>";
        }
      }
    }
    html2 += "</select>";
    $("#setting-key-delay-select-key").html(html2);
    var flag = true;
    var len2 = client.device_info.keyDelay;
    for (var count = 1; count < len2.length; count++) {
      if (client.device_info != void 0 && client.device_info.revision != void 0 && client.device_info.revision.substr(0, 2) == "G-") {
        if (len2[count] != len2[count - 1]) {
          flag = false;
          break;
        }
      } else {
        if ((len2[count] & 15) != (len2[count - 1] & 15)) {
          flag = false;
          break;
        }
      }
    }
    if (flag || !(client.device_info != void 0 && client.device_info.revision != void 0 && client.device_info.revision.substr(0, 2) == "G-" || is_oms(client, -1))) {
      $('[name="key-delay-select-key"]').val(0);
    } else {
      $('[name="key-delay-select-key"]').val(1);
    }
    $("#slider-key-up-delay").css("display", client.device_info != void 0 && client.device_info.revision != void 0 && client.device_info.revision.substr(0, 2) == "G-" ? "" : "none");
    $("#setting-key-delay-down-up").css("display", client.device_info != void 0 && client.device_info.revision != void 0 && client.device_info.revision.substr(0, 2) == "G-" ? "" : "none");
    $("#setting-key-delay-select-key-container").css("display", client.device_info != void 0 && client.device_info.revision != void 0 && client.device_info.revision.substr(0, 2) == "G-" || is_oms(client, -1) ? "" : "none");
    S.macro_trigger_types = [];
    S.macro_trigger_types.push(layui.i18np.prop("STRID_SETTING_MAPPING_MACRO_TRIGGER_PRESS"));
    S.macro_trigger_types.push(layui.i18np.prop("STRID_SETTING_MAPPING_MACRO_TRIGGER_RELEASE"));
    S.macro_trigger_types.push(layui.i18np.prop("STRID_SETTING_MAPPING_MACRO_TRIGGER_LOOP"));
    S.macro_trigger_types.push(layui.i18np.prop("STRID_SETTING_MAPPING_MACRO_TRIGGER_LONG_PRESS"));
    S.macro_trigger_types.push(layui.i18np.prop("STRID_SETTING_MAPPING_MACRO_TRIGGER_LONG_LOOP"));
    S.macro_trigger_types.push(layui.i18np.prop("STRID_SETTING_MAPPING_MACRO_TRIGGER_LONG_RELEASE"));
    S.macro_trigger_types.push(layui.i18np.prop("STRID_SETTING_MAPPING_MACRO_TRIGGER_TOGGLE_LOOP"));
    S.mouse_function_descs = [];
    S.mouse_functions = [];
    S.mouse_function_descs.push(layui.i18np.prop("STRID_NONE"));
    S.mouse_functions.push(0);
    S.mouse_function_descs.push(layui.i18np.prop("STRID_SETTING_MAPPING_TYPE_FUNCTION_TOGGLE_CPI"));
    S.mouse_functions.push(1);
    S.mouse_function_descs.push(layui.i18np.prop("STRID_SETTING_MAPPING_TYPE_FUNCTION_NEXT_CPI"));
    S.mouse_functions.push(2);
    S.mouse_function_descs.push(layui.i18np.prop("STRID_SETTING_MAPPING_TYPE_FUNCTION_PREVIOUS_CPI"));
    S.mouse_functions.push(3);
    if (is_enhancement(client)) {
      S.mouse_function_descs.push(layui.i18np.prop("STRID_SETTING_MAPPING_TYPE_FUNCTION_TOGGLE_ASSIST"));
      S.mouse_functions.push(4);
      S.mouse_function_descs.push(layui.i18np.prop("STRID_SETTING_MAPPING_TYPE_FUNCTION_CHOOSE_ASSIST"));
      S.mouse_functions.push(12);
      S.mouse_function_descs.push(layui.i18np.prop("STRID_SETTING_MAPPING_TYPE_FUNCTION_NEXT_ASSIST"));
      S.mouse_functions.push(5);
      S.mouse_function_descs.push(layui.i18np.prop("STRID_SETTING_MAPPING_TYPE_FUNCTION_PREVIOUS_ASSIST"));
      S.mouse_functions.push(6);
    } else {
      S.mouse_function_descs.push(layui.i18np.prop("STRID_SETTING_MAPPING_TYPE_FUNCTION_ADD_CPI"));
      S.mouse_functions.push(10);
      S.mouse_function_descs.push(layui.i18np.prop("STRID_SETTING_MAPPING_TYPE_FUNCTION_PLUS_CPI"));
      S.mouse_functions.push(11);
    }
    S.mouse_function_descs.push(layui.i18np.prop("STRID_SETTING_MAPPING_TYPE_FUNCTION_PRESS_CPI"));
    S.mouse_functions.push(9);
    S.mouse_function_descs.push(layui.i18np.prop("STRID_SETTING_MAPPING_TYPE_FUNCTION_TOGGLE_ESB_ADDR"));
    S.mouse_functions.push(13);
    S.mouse_function_descs.push(layui.i18np.prop("STRID_SETTING_MAPPING_TYPE_FUNCTION_TOGGLE_BLE_DEVICE"));
    S.mouse_functions.push(15);
    S.mouse_function_descs.push(layui.i18np.prop("STRID_SETTING_MAPPING_TYPE_FUNCTION_SHOW_POWER"));
    S.mouse_functions.push(14);
    S.mouse_function_descs.push(layui.i18np.prop("STRID_SETTING_MAPPING_TYPE_FUNCTION_SHELL_CMD"));
    S.mouse_functions.push(16);
    S.mouse_function_descs.push(layui.i18np.prop("STRID_SETTING_MAPPING_TYPE_FUNCTION_TOGGLE_ONBOARD"));
    S.mouse_functions.push(17);
    S.mouse_function_descs.push(layui.i18np.prop("STRID_SETTING_MAPPING_TYPE_FUNCTION_NEXT_ONBOARD"));
    S.mouse_functions.push(18);
    S.mouse_function_descs.push(layui.i18np.prop("STRID_SETTING_MAPPING_TYPE_FUNCTION_PREVIOUS_ONBOARD"));
    S.mouse_functions.push(19);
    S.mouse_function_descs.push(layui.i18np.prop("STRID_SETTING_MAPPING_TYPE_FUNCTION_TOGGLE_MINI_HUB"));
    S.mouse_functions.push(21);
    S.mouse_function_descs.push(layui.i18np.prop("STRID_SETTING_MAPPING_TYPE_FUNCTION_TOGGLE_WORK_MODE"));
    S.mouse_functions.push(22);
    layui2.render({
      "elem": "#key-shortcuts",
      "id": "key-shortcuts",
      "cols": [[{
        "field": "keys",
        "title": layui.i18np.prop("STRID_SETTING_MAPPING_TYPE_KEY"),
        "width": 116,
        "unresize": true
      }, {
        "field": "desc",
        "title": layui.i18np.prop("STRID_SETTING_MAPPING_TYPE_FUNCTION"),
        "width": 210,
        "unresize": true
      }]],
      "data": get_shortcuts(client),
      "skin": "grid",
      "page": false,
      "done": function(result) {
        $(".layui-table").css("width", "100%");
        $("th[data-field='delete']").css("border-right", "none");
        $("th[data-field='desc']").css("border-right", "none");
        $("td[data-field='desc']").css("border-right", "none");
      }
    });
    layui2.on("row(key-shortcuts)", function(result) {
      var len3 = modifiers;
      var len4 = keys;
      var len5 = result.data.keys.split("+");
      if (len5.length == 2) {
        var trimmedVal = len5[0].trim();
        if (trimmedVal == "\xE2\u0152\u02DC") {
          trimmedVal = "Command";
        }
        for (var offset2 = 0; offset2 < len3.length; offset2++) {
          if (trimmedVal == len3[offset2].name) {
            $('[name="mapping-ctrl-key1"]').val(offset2);
            break;
          }
        }
        $('[name="mapping-ctrl-key2"]').val(0);
        trimmedVal = len5[1].trim();
        if (trimmedVal == "\xE2\u2020\u2019") {
          trimmedVal = layui.i18np.prop("STRID_KEY_ARROW_RIGHT");
        } else {
          if (trimmedVal == "\xE2\u2020\x90") {
            trimmedVal = layui.i18np.prop("STRID_KEY_ARROW_LEFT");
          } else {
            if (trimmedVal == "\xE2\u2020\u2018") {
              trimmedVal = layui.i18np.prop("STRID_KEY_ARROW_UP");
            } else if (trimmedVal == "\xE2\u2020\u201C") {
              trimmedVal = layui.i18np.prop("STRID_KEY_ARROW_DOWN");
            }
          }
        }
        for (var offset2 = 0; offset2 < len4.length; offset2++) {
          if (trimmedVal == len4[offset2].name) {
            $('[name="mapping-key"]').val(offset2);
            break;
          }
        }
      } else {
        if (len5.length > 2) {
          var trimmedVal = len5[0].trim();
          if (trimmedVal == "\xE2\u0152\u02DC") {
            trimmedVal = "Command";
          }
          for (var offset2 = 0; offset2 < len3.length; offset2++) {
            if (trimmedVal == len3[offset2].name) {
              $('[name="mapping-ctrl-key1"]').val(offset2);
              break;
            }
          }
          trimmedVal = len5[1].trim();
          if (trimmedVal == "\xE2\u0152\u02DC") {
            trimmedVal = "Command";
          }
          for (var offset2 = 0; offset2 < len3.length; offset2++) {
            if (trimmedVal == len3[offset2].name) {
              $('[name="mapping-ctrl-key2"]').val(offset2);
              break;
            }
          }
          trimmedVal = len5[2].trim();
          if (trimmedVal == "\xE2\u2020\u2019") {
            trimmedVal = layui.i18np.prop("STRID_KEY_ARROW_RIGHT");
          } else {
            if (trimmedVal == "\xE2\u2020\x90") {
              trimmedVal = layui.i18np.prop("STRID_KEY_ARROW_LEFT");
            } else {
              if (trimmedVal == "\xE2\u2020\u2018") {
                trimmedVal = layui.i18np.prop("STRID_KEY_ARROW_UP");
              } else if (trimmedVal == "\xE2\u2020\u201C") {
                trimmedVal = layui.i18np.prop("STRID_KEY_ARROW_DOWN");
              }
            }
          }
          for (var offset2 = 0; offset2 < len4.length; offset2++) {
            if (trimmedVal == len4[offset2].name) {
              $('[name="mapping-key"]').val(offset2);
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
    if (client != void 0 ? is_hs_keyboard(client.device) : false) {
      return;
    }
    var index = get_product_id_hex_str(client);
    var value = S.key_pos[index];
    var el;
    var i;
    for (var len = 1; len <= 7; len++) {
      el = "m" + len;
      i = document.getElementById("setting-mapping-key-" + el);
      i.style.left = value[el][0] + "px";
      i.style.top = value[el][1] + "px";
    }
    el = "wheel-line-container";
    i = document.getElementById("setting-mapping-key-" + el);
    i.style.left = value[el][0] + "px";
    i.style.top = value[el][1] + "px";
    el = "wheel-up";
    i = document.getElementById("setting-mapping-key-" + el);
    i.style.left = value[el][0] + "px";
    i.style.top = value[el][1] + "px";
    el = "wheel-down";
    i = document.getElementById("setting-mapping-key-" + el);
    i.style.left = value[el][0] + "px";
    i.style.top = value[el][1] + "px";
    var len2 = get_color_code(client);
    if (len2.length > 0) {
      $("#setting_mapping_product_icon").css("background-image", "url(" + RESOURCE_URL + "product/" + index + "/" + len2 + "/setting.png)");
    } else {
      $("#setting_mapping_product_icon").css("background-image", "url(" + RESOURCE_URL + "product/" + index + "/setting.png)");
    }
    document.getElementById("product-name").src = RESOURCE_URL + "product/" + index + "/name.png";
    ui_refresh_onboard_config(client);
    ui_refresh_mapping_key(client);
    ui_refresh_combination_key(client);
  }
  function ui_refresh_onboard_config(client) {
    var layui2 = layui.$;
    var layui3 = layui.form;
    var html2 = '<select name="onboard-config" lay-verify="required" lay-filter="onboard-config">';
    for (let len = 0; len < S.onboard_configs.length; len++) {
      if (len == client.device_info.onboardIndex) {
        if (len == S.onboard_config_index && S.need_save) {
          html2 += '<option value="' + len + '">' + layui.i18np.prop("STRID_SETTING_CONFIG_CURRENT") + S.NUMBERS[len + 1] + " \xE2\u2014\u20AC *</option>";
        } else {
          html2 += '<option value="' + len + '">' + layui.i18np.prop("STRID_SETTING_CONFIG_CURRENT") + S.NUMBERS[len + 1] + " \xE2\u2014\u20AC</option>";
        }
      } else if (len == S.onboard_config_index && S.need_save) {
        html2 += '<option value="' + len + '">' + layui.i18np.prop("STRID_SETTING_CONFIG_CURRENT") + S.NUMBERS[len + 1] + " *</option>";
      } else {
        html2 += '<option value="' + len + '">' + layui.i18np.prop("STRID_SETTING_CONFIG_CURRENT") + S.NUMBERS[len + 1] + "</option>";
      }
    }
    html2 += "</select>";
    layui2("#setting-onboard-config").html(html2);
    layui2('[name="onboard-config"]').val(S.onboard_config_index);
    layui3.render("select");
    var status = S.onboard_status[S.onboard_config_index];
    if ((status & 128) != 0) {
      layui2('[name="onboard-allow-switch"]').prop("checked", true);
    } else {
      layui2('[name="onboard-allow-switch"]').prop("checked", false);
    }
    var colors = get_light_display_colors(client);
    html2 = ColorSelectorTable({ colors, bitmask: status, name: "setting-onboard-color", actionAttr: "setting-onboard-status-action", colorHex: { white: "#EEE" } });
    layui2("#setting-onboard-status-colors").html(html2);
    layui3.render("radio");
    layui3.render("checkbox");
  }
  function ui_refresh_combination_key(client) {
    var layui2 = layui.$;
    var layui3 = layui.form;
    var html2 = '<select name="combination-key" lay-verify="required" lay-filter="combination-key">';
    for (let len = 0; len < S.mouse_key_labels.length; len++) {
      var str = "";
      var value = get_key_name_from_label(S.mouse_key_labels[len]);
      S.onboard_keys.forEach((item) => {
        if (item.configType >= 0) {
          var len2 = item.name.split("+");
          if (len2.length == 2 && len2[0] == value) {
            var value2 = item.label.split("+")[1];
            if (str.indexOf(value2) == -1) {
              str += value2;
            }
          }
        }
      });
      var str2 = len > 0 && S.mouse_keys[len - 1].visible != void 0 && !S.mouse_keys[len - 1].visible ? " disabled" : "";
      if (str.length > 0) {
        html2 += '<option value="' + len + '"' + str2 + ">" + S.mouse_key_labels[len] + " + " + str + "</option>";
      } else {
        html2 += '<option value="' + len + '"' + str2 + ">" + S.mouse_key_labels[len] + "</option>";
      }
    }
    html2 += "</select>";
    layui2("#setting-combination-key").html(html2);
    layui2('[name="combination-key"]').val(S.combination_key_index);
    layui3.render("select");
  }
  function ui_refresh_mapping_key(client) {
    var selectedLabel = S.mouse_key_labels[S.combination_key_index];
    var len = get_key_name_from_label(selectedLabel);
    var payload = [];
    var arr = [];
    for (let index = 0; index < S.mouse_keys.length; index++) {
      payload.push("#setting-mapping-key-m" + (index + 1) + "-desc");
      if (len.length == 0) {
        arr.push(S.mouse_keys[index].name);
      } else {
        arr.push(len + "+" + S.mouse_keys[index].name);
      }
    }
    payload.push("#setting-mapping-key-wheel-up-desc");
    if (len.length == 0) {
      arr.push(KEY_WHEEL_UP);
    } else {
      arr.push(len + "+" + KEY_WHEEL_UP);
    }
    payload.push("#setting-mapping-key-wheel-down-desc");
    if (len.length == 0) {
      arr.push(KEY_WHEEL_DOWN);
    } else {
      arr.push(len + "+" + KEY_WHEEL_DOWN);
    }
    if (S.select_key_name.length == 0) {
      var len2 = $('[name="setting-mapping-key"]');
      for (let offset = 0; offset < len2.length; offset++) {
        len2[offset].checked = false;
      }
      layui.form.render("radio");
    }
    var len3 = S.select_key_name.split("+");
    var value = len3[len3.length - 1];
    for (let count = 0; count < S.mouse_keys.length; count++) {
      var el = count + 1;
      if (value == S.mouse_keys[count].name) {
        $("#setting-mapping-key-m" + el + "-line").css("background-color", S.theme_color);
        document.getElementById("setting-mapping-key-m" + el + "-circle").src = RESOURCE_URL + "setting/key_circle_blue.png";
        $("#setting-mapping-key-m" + el + "-desc").css("color", S.theme_color);
        $("#setting-mapping-key-m" + el + "-text").css("color", S.theme_color);
      } else {
        $("#setting-mapping-key-m" + el + "-line").css("background-color", "gray");
        document.getElementById("setting-mapping-key-m" + el + "-circle").src = RESOURCE_URL + "setting/key_circle_gray.png";
        $("#setting-mapping-key-m" + el + "-desc").css("color", "");
        $("#setting-mapping-key-m" + el + "-text").css("color", "");
      }
      $("#setting-mapping-key-m" + el).css("display", "");
    }
    if (value == "M7") {
      $("#setting-mapping-key-m7-line").css("background-color", "#00000000");
      $("#setting-mapping-key-m7-line").css("background-image", "url(" + RESOURCE_URL + "setting/mapping_key_line_selected.png)");
      document.getElementById("setting-mapping-key-m7-circle").src = RESOURCE_URL + "setting/key_circle_blue2.png";
    } else {
      $("#setting-mapping-key-m7-line").css("background-color", "#00000000");
      $("#setting-mapping-key-m7-line").css("background-image", "url(" + RESOURCE_URL + "setting/mapping_key_line_normal.png)");
      document.getElementById("setting-mapping-key-m7-circle").src = RESOURCE_URL + "setting/key_circle_gray2.png";
    }
    if (value == KEY_WHEEL_DOWN) {
      $("#setting-mapping-key-wheel-down-line").css("background-color", S.theme_color);
      $("#setting-mapping-key-wheel-down-desc").css("color", S.theme_color);
      $("#setting-mapping-key-wheel-down-text").css("color", S.theme_color);
      $("#setting-mapping-key-wheel-line").css("background-color", S.theme_color);
      document.getElementById("setting-mapping-key-wheel-circle").src = RESOURCE_URL + "setting/key_circle_blue.png";
      $("#setting-mapping-key-wheel-up-line").css("background-color", "gray");
      $("#setting-mapping-key-wheel-up-desc").css("color", "");
      $("#setting-mapping-key-wheel-up-text").css("color", "");
    } else if (value == KEY_WHEEL_UP) {
      $("#setting-mapping-key-wheel-up-line").css("background-color", S.theme_color);
      $("#setting-mapping-key-wheel-up-desc").css("color", S.theme_color);
      $("#setting-mapping-key-wheel-up-text").css("color", S.theme_color);
      $("#setting-mapping-key-wheel-line").css("background-color", S.theme_color);
      document.getElementById("setting-mapping-key-wheel-circle").src = RESOURCE_URL + "setting/key_circle_blue.png";
      $("#setting-mapping-key-wheel-down-line").css("background-color", "gray");
      $("#setting-mapping-key-wheel-down-desc").css("color", "");
      $("#setting-mapping-key-wheel-down-text").css("color", "");
    } else {
      $("#setting-mapping-key-wheel-down-line").css("background-color", "gray");
      $("#setting-mapping-key-wheel-down-desc").css("color", "");
      $("#setting-mapping-key-wheel-down-text").css("color", "");
      $("#setting-mapping-key-wheel-up-line").css("background-color", "gray");
      $("#setting-mapping-key-wheel-up-desc").css("color", "");
      $("#setting-mapping-key-wheel-up-text").css("color", "");
      $("#setting-mapping-key-wheel-line").css("background-color", "gray");
      document.getElementById("setting-mapping-key-wheel-circle").src = RESOURCE_URL + "setting/key_circle_gray.png";
    }
    for (var len4 = 0; len4 < S.mouse_keys.length; len4++) {
      if (S.mouse_keys[len4].visible != void 0 && !S.mouse_keys[len4].visible) {
        $("#setting-mapping-key-m" + (len4 + 1)).css("display", "none");
      }
    }
    if (S.combination_key_index > 0) {
      $("#setting-mapping-key-m" + S.combination_key_index).css("display", "none");
    }
    for (let len5 = 0; len5 < payload.length; len5++) {
      var el2 = payload[len5];
      $(el2).html("");
      S.onboard_keys.forEach((item) => {
        if (item.name == arr[len5]) {
          if (item.configType == 0) {
            if (item.touch_style == 27) {
              var payload2 = [];
              var len6 = item.mouse_mapping_keys;
              if (len6.length > 0) {
                len6 = len6.replace("[", "");
                len6 = len6.replace("]", "");
                var arr2 = len6.split(",");
                if (arr2.length > 0) {
                  arr2.forEach((item2) => {
                    if (item2 > 0) {
                      var flag = false;
                      var len7 = modifiers;
                      for (let len8 = 0; len8 < len7.length; len8++) {
                        if (item2 == len7[len8].vCode) {
                          payload2.push(len7[len8].name);
                          flag = true;
                          break;
                        }
                      }
                      if (!flag) {
                        var len9 = keys;
                        for (let len10 = 0; len10 < len9.length; len10++) {
                          if (item2 == len9[len10].vCode) {
                            if (item2 == 1024 || item2 == 1025 || item2 == 1026 || item2 == 1027) {
                              payload2.push(len9[len10].name + "(" + item.mouse_mapping_key_data + ")");
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
              if (payload2.length > 0) {
                var html2 = "";
                for (let len11 = 0; len11 < payload2.length; len11++) {
                  html2 += payload2[len11];
                  if (len11 < payload2.length - 1) {
                    html2 += "+";
                  }
                }
                $(el2).html(layui.i18np.prop("STRID_SETTING_MAPPING_TYPE_KEY") + " - " + html2);
              } else {
                $(el2).html(layui.i18np.prop("STRID_SETTING_MAPPING_TYPE_KEY") + " - " + layui.i18np.prop("STRID_NONE"));
              }
            } else {
              if (item.touch_style == 29) {
                for (let len12 = 0; len12 < S.mouse_functions.length; len12++) {
                  if (item.mouse_mapping_function == S.mouse_functions[len12]) {
                    var html2 = layui.i18np.prop("STRID_SETTING_MAPPING_TYPE_FUNCTION") + " - " + S.mouse_function_descs[len12];
                    if (item.mouse_mapping_function == 16) {
                      if (is_valid_url(item.mouse_mapping_function_text)) {
                        html2 += layui.i18np.prop("STRID_SETTING_MAPPING_TYPE_FUNCTION_SHELL_CMD_WEB");
                      } else {
                        html2 += layui.i18np.prop("STRID_SETTING_MAPPING_TYPE_FUNCTION_SHELL_CMD_APP");
                      }
                    }
                    $(el2).html(html2);
                    break;
                  }
                }
              }
            }
          } else if (item.configType == 5) {
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
    if (Object.keys(keyInfo).length == 0) {
      return;
    }
    var len = modifiers;
    var html2 = '<select name="mapping-ctrl-key1" lay-verify="required" lay-filter="mapping-ctrl-key1">';
    for (let index = 0; index < len.length; index++) {
      html2 += '<option value="' + index + '">' + len[index].name + "</option>";
    }
    html2 += "</select>";
    layui2("#setting-mapping-ctrl-key1").html(html2);
    layui2('[name="mapping-ctrl-key1"]').val(0);
    html2 = '<select name="mapping-ctrl-key2" lay-verify="required" lay-filter="mapping-ctrl-key1">';
    for (let offset = 0; offset < len.length; offset++) {
      html2 += '<option value="' + offset + '">' + len[offset].name + "</option>";
    }
    html2 += "</select>";
    layui2("#setting-mapping-ctrl-key2").html(html2);
    layui2('[name="mapping-ctrl-key2"]').val(0);
    var len2 = keys;
    var html2 = '<select name="mapping-key" lay-verify="required" lay-filter="mapping-key">';
    for (let count = 0; count < len2.length; count++) {
      html2 += '<option value="' + count + '">' + len2[count].name + "</option>";
    }
    html2 += "</select>";
    layui2("#setting-mapping-key").html(html2);
    layui2('[name="mapping-key"]').val(0);
    var value = keyInfo.mouse_mapping_keys;
    if (value.length > 0) {
      value = value.replace("[", "");
      value = value.replace("]", "");
      var len3 = value.split(",");
      if (len3.length >= 3) {
        for (let len4 = 0; len4 < len.length; len4++) {
          if (len3[0] == len[len4].vCode) {
            layui2('[name="mapping-ctrl-key1"]').val(len4);
            break;
          }
        }
        for (let len5 = 0; len5 < len.length; len5++) {
          if (len3[1] == len[len5].vCode) {
            layui2('[name="mapping-ctrl-key2"]').val(len5);
            break;
          }
        }
        for (let len6 = 0; len6 < len2.length; len6++) {
          if (len3[2] == len2[len6].vCode) {
            layui2('[name="mapping-key"]').val(len6);
            break;
          }
        }
      }
      if (keyInfo.mouse_mapping_keys == "[0,0,1024]" || keyInfo.mouse_mapping_keys == "[0,0,1025]" || keyInfo.mouse_mapping_keys == "[0,0,1026]" || keyInfo.mouse_mapping_keys == "[0,0,1027]") {
        layui2("#wheel-delta-container").css("display", "flex");
        layui2("#wheel-delta-input").val(keyInfo.mouse_mapping_key_data);
      } else {
        layui2("#wheel-delta-container").css("display", "none");
      }
      var value2 = len2[layui2('[name="mapping-key"]').val()].vCode;
      if (layui2('[name="mapping-ctrl-key1"]').val() == 0 && layui2('[name="mapping-ctrl-key2"]').val() == 0 && value2 != 0 && value2 != 1024 && value2 != 1025 && value2 != 1026 && value2 != 1027) {
        layui2("#mapping-key-turbo-container").css("display", "");
        if (keyInfo.mouse_auto_click == 1) {
          layui2("#mapping-key-turbo-detail-container").css("display", "");
          layui2('[name="mapping-key-turbo"]').prop("checked", true);
        } else {
          layui2("#mapping-key-turbo-detail-container").css("display", "none");
          layui2('[name="mapping-key-turbo"]').prop("checked", false);
        }
        if (keyInfo.mouse_auto_click_down == 0 && keyInfo.mouse_auto_click_up == 0) {
          keyInfo.mouse_auto_click_down = 50;
          keyInfo.mouse_auto_click_up = 50;
        }
        layui2("#mapping-key-turbo-freq-input").val(parseInt(1e3 / (keyInfo.mouse_auto_click_down + keyInfo.mouse_auto_click_up)));
        layui2("#mapping-key-turbo-rand-input").val(keyInfo.mouse_auto_click_rand);
        layui2("#mapping-key-turbo-down-keep-input").val(keyInfo.mouse_auto_click_down);
        layui2("#mapping-key-turbo-up-keep-input").val(keyInfo.mouse_auto_click_up);
        if (client.device_info != void 0 && client.device_info.revision != void 0 && client.device_info.revision.substr(0, 2) == "G-" && (value2 >= 512 && value2 < 767 || value2 == 1026 || value2 == 1027)) {
          layui2("#keys-fw-channel-gaming-tips").css("display", "");
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
    if (Object.keys(keyInfo).length == 0) {
      return;
    }
    if (keyInfo.macro_style < 0 || keyInfo.macro_style > 6) {
      keyInfo.macro_style = 0;
    }
    S.macro_counts = [];
    for (let len = 0; len <= 6; len++) {
      S.macro_counts.push(0);
    }
    for (let index = 0; index < S.onboard_keys.length; index++) {
      var value = S.onboard_keys[index];
      if (keyInfo.name == value.name) {
        S.macro_counts[value.macro_style] = value.macroKeys.length;
      }
    }
    var html2 = '<select name="mapping-macro-trigger-type" lay-verify="required" lay-filter="mapping-macro-trigger-type">';
    for (let offset = 0; offset <= 6; offset++) {
      if (S.macro_counts[offset] > 0) {
        html2 += '<option value="' + offset + '">' + S.macro_trigger_types[offset] + "(" + S.macro_counts[offset] + ")</option>";
        if (S.macro_trigger_type_index < 0) {
          S.macro_trigger_type_index = offset;
        }
      } else {
        html2 += '<option value="' + offset + '">' + S.macro_trigger_types[offset] + "</option>";
      }
    }
    html2 += "</select>";
    layui2("#setting-mapping-macro-trigger-type").html(html2);
    if (S.macro_trigger_type_index < 0) {
      S.macro_trigger_type_index = 0;
    }
    layui2('[name="mapping-macro-trigger-type"]').val(S.macro_trigger_type_index);
    html2 = '<select name="mapping-macro-trigger-key" lay-verify="required" lay-filter="mapping-macro-trigger-key">';
    for (let count = 0; count < S.mouse_key_labels.length; count++) {
      var str = count > 0 && S.mouse_keys[count - 1].visible != void 0 && !S.mouse_keys[count - 1].visible ? " disabled" : "";
      html2 += '<option value="' + count + '"' + str + ">" + S.mouse_key_labels[count] + "</option>";
    }
    html2 += "</select>";
    layui2("#setting-mapping-macro-trigger-key").html(html2);
    layui2('[name="mapping-macro-trigger-key"]').val(0);
    var value2 = get_key_label_from_id(keyInfo.macro_toggleKey);
    for (let len2 = 0; len2 < S.mouse_key_labels.length; len2++) {
      if (value2 == S.mouse_key_labels[len2]) {
        layui2('[name="mapping-macro-trigger-key"]').val(len2);
        break;
      }
    }
    html2 = '<select name="mapping-macro-stop-key" lay-verify="required" lay-filter="mapping-macro-stop-key">';
    for (let len3 = 0; len3 < S.mouse_key_labels.length; len3++) {
      var str = len3 > 0 && S.mouse_keys[len3 - 1].visible != void 0 && !S.mouse_keys[len3 - 1].visible ? " disabled" : "";
      html2 += '<option value="' + len3 + '"' + str + ">" + S.mouse_key_labels[len3] + "</option>";
    }
    html2 += "</select>";
    layui2("#setting-mapping-macro-stop-key").html(html2);
    layui2('[name="mapping-macro-stop-key"]').val(0);
    value2 = get_key_label_from_id(keyInfo.macro_endKey);
    for (let len4 = 0; len4 < S.mouse_key_labels.length; len4++) {
      if (value2 == S.mouse_key_labels[len4]) {
        layui2('[name="mapping-macro-stop-key"]').val(len4);
        break;
      }
    }
    layui2("#setting-mapping-macro-actions").html(layui.i18np.prop("STRID_SETTING_MACRO_TOTAL") + " " + S.macro_counts[S.macro_trigger_type_index] + " " + layui.i18np.prop("STRID_SETTING_MACRO_ACTIONGS"));
    layui3.render("select");
    layui3.render();
  }
  function ui_refresh_mapping_macro_edit(client) {
    if (client != void 0 ? is_hs_keyboard(client.device) : false) {
      kbd_ui_macro_edit_init(client);
      return;
    }
    var layui2 = layui.$;
    var html2 = "<table>";
    html2 += "<tr>";
    for (let len = 0; len < S.edit_macros.length; len++) {
      var value = S.edit_macros[len];
      html2 += '<td style="padding-top: 3px;">';
      html2 += '<a macro-edit-item-index="' + len + '" macro-edit-item-action="select" style="cursor: pointer;">';
      if (is_dark_theme()) {
        html2 += '<div style="width: 110px;height: 60px;margin-left: 3px;background-color: #202020;">';
      } else {
        html2 += '<div style="width: 110px;height: 60px;margin-left: 3px;background-color: gray;">';
      }
      html2 += '<div class="layui-setting-title-container" style="height: 50%;">';
      if (value.mouse_key_event == 522) {
        if (value.mouse_key_code > 0) {
          html2 += '<img src="' + RESOURCE_URL + 'setting/mkey_up.png" style="width: 20px;height: 22px; margin:4px;"/>';
          html2 += '<p style="color: white;margin-top: 6px;">' + layui.i18np.prop("STRID_KEY_WHELL_UP_S") + "<br>" + value.mouse_key_code + "</p>";
        } else {
          html2 += '<img src="' + RESOURCE_URL + 'setting/mkey_down.png" style="width: 20px;height: 22px; margin:4px;"/>';
          html2 += '<p style="color: white;margin-top: 6px;">' + layui.i18np.prop("STRID_KEY_WHELL_DOWN_S") + "<br>" + Math.abs(value.mouse_key_code) + "</p>";
        }
      } else {
        if (value.mouse_key_event == 526) {
          if (value.mouse_key_code < 0) {
            html2 += '<img src="' + RESOURCE_URL + 'setting/mkey_up.png" style="width: 20px;height: 22px; margin:4px;"/>';
            html2 += '<p style="color: white;margin-top: 6px;">' + layui.i18np.prop("STRID_KEY_WHELL_LEFT_S") + "<br>" + Math.abs(value.mouse_key_code) + "</p>";
          } else {
            html2 += '<img src="' + RESOURCE_URL + 'setting/mkey_down.png" style="width: 20px;height: 22px; margin:4px;"/>';
            html2 += '<p style="color: white;margin-top: 6px;">' + layui.i18np.prop("STRID_KEY_WHELL_RIGHT_S") + "<br>" + value.mouse_key_code + "</p>";
          }
        } else {
          if (value.mouse_key_event == 512) {
            html2 += '<img src="' + RESOURCE_URL + 'setting/mkey_move.png" style="width: 20px;height: 22px; margin:4px;"/>';
            var value2 = value.mouse_key_code >> 16 & 65535;
            var value3 = value.mouse_key_code & 65535;
            html2 += '<p style="color: white;margin-top: 6px;">' + layui.i18np.prop("STRID_KEY_MOUSE_MOVE_S") + "<br>" + (value2 - 2047) / 10 + ":" + (value3 - 2047) / 10 + "</p>";
          } else {
            if (value.mouse_key_event == 767) {
              html2 += '<img src="' + RESOURCE_URL + 'setting/mkey_position.png" style="width: 20px;height: 22px; margin:4px;"/>';
              var screenW = window.screen.width;
              var screenH = window.screen.height;
              var value4 = value.mouse_key_code >> 16 & 65535;
              var value5 = value.mouse_key_code & 65535;
              value4 = parseInt(value4 * screenW / 65535);
              value5 = parseInt(value5 * screenH / 65535);
              html2 += '<p style="color: white;margin-top: 6px;">' + layui.i18np.prop("STRID_KEY_MOUSE_POSITION_S") + "<br>" + value4 + ":" + value5 + "</p>";
            } else if (value.mouse_key_code == 0) {
              html2 += '<p style="color: white;margin-left:4px;">' + get_key_name_from_code(value.mouse_key_code) + "</p>";
            } else if (value.mouse_key_event == 257) {
              if (value.mouse_key_code >= 255 && value.mouse_key_code < 512) {
                html2 += '<img src="' + RESOURCE_URL + 'setting/mkey_up.png" style="width: 20px;height: 22px; margin:4px;"/>';
              } else {
                html2 += '<img src="' + RESOURCE_URL + 'setting/key_up.png" style="width: 20px;height: 22px; margin:4px;"/>';
              }
              html2 += '<p style="color: white;margin-top: 6px;">' + get_key_name_from_code(value.mouse_key_code) + "</p>";
            } else {
              if (value.mouse_key_code >= 255 && value.mouse_key_code < 512) {
                html2 += '<img src="' + RESOURCE_URL + 'setting/mkey_down.png" style="width: 20px;height: 22px; margin:4px;"/>';
              } else {
                html2 += '<img src="' + RESOURCE_URL + 'setting/key_down.png" style="width: 20px;height: 22px; margin:4px;"/>';
              }
              html2 += '<p style="color: white;margin-top: 6px;">' + get_key_name_from_code(value.mouse_key_code) + "</p>";
            }
          }
        }
      }
      html2 += "</div>";
      html2 += '<div class="layui-setting-title-container" style="height: 50%;">';
      html2 += '<img src="' + RESOURCE_URL + 'setting/key_waiting.png" style="width: 18px;height: 20px; margin:4px;"/>';
      if (value.mouse_key_event == 512 && value.mouse_key_loop > 1) {
        html2 += '<p style="color: white;">' + value.mouse_key_time + "x" + value.mouse_key_loop + " " + layui.i18np.prop("STRID_SETTING_MAPPING_MACRO_ACTION_KEEP_TIME_MS") + "</p>";
      } else {
        html2 += '<p style="color: white;">' + value.mouse_key_time + " " + layui.i18np.prop("STRID_SETTING_MAPPING_MACRO_ACTION_KEEP_TIME_MS") + "</p>";
      }
      html2 += "</div>";
      html2 += "</div>";
      html2 += "</a>";
      html2 += "</td>";
      if ((len + 1) % 5 == 0) {
        html2 += "</tr><tr>";
      }
    }
    ;
    html2 += "</tr>";
    html2 += "</table>";
    layui2("#mapping-macro-edit-container").html(html2);
  }
  function ui_refresh_mapping_macro_add(client) {
    var layui2 = layui.$;
    var layui3 = layui.form;
    var layui4 = layui.slider;
    var html2 = '<select name="macro-add-select-key" lay-verify="required" lay-filter="macro-add-select-key">';
    for (let len = 0; len < macro_keys.length; len++) {
      html2 += '<option value="' + len + '">' + macro_keys[len].name + "</option>";
    }
    html2 += "</select>";
    layui2("#mapping-macro-add-select-key").html(html2);
    layui2('[name="macro-add-select-key"]').val(0);
    var value = Math.floor(S.macro_keep_time_min / MACRO_KEEP_TIME_STEP) * MACRO_KEEP_TIME_STEP;
    var value2 = value + MACRO_KEEP_TIME_STEP;
    if (value2 > MACRO_KEEP_TIME_MAX_MS) {
      value2 = MACRO_KEEP_TIME_MAX_MS;
      value = value2 - MACRO_KEEP_TIME_STEP;
    }
    var value3 = layui4.render({
      "elem": "#slider-mapping-macro-keep-time-input",
      "min": value,
      "max": value2,
      "step": 1,
      "value": S.current_edit_macro.mouse_key_time,
      "input": true,
      "tips": false,
      "theme": S.theme_color,
      "done": function(result) {
        if (result != void 0) {
          S.current_edit_macro.mouse_key_time = result;
        }
      }
    });
    layui2("#slider-mapping-macro-keep-time-input input").on("input", function(result) {
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
    if (S.current_edit_macro.mouse_key_event == 522) {
      for (let index = 0; index < macro_keys.length; index++) {
        if (macro_keys[index].vCode == 1024 && S.current_edit_macro.mouse_key_code >= 0 || macro_keys[index].vCode == 1025 && S.current_edit_macro.mouse_key_code < 0) {
          layui2('[name="macro-add-select-key"]').val(index);
          break;
        }
      }
    } else {
      if (S.current_edit_macro.mouse_key_event == 526) {
        for (let offset = 0; offset < macro_keys.length; offset++) {
          if (macro_keys[offset].vCode == 1026 && S.current_edit_macro.mouse_key_code < 0 || macro_keys[offset].vCode == 1027 && S.current_edit_macro.mouse_key_code >= 0) {
            layui2('[name="macro-add-select-key"]').val(offset);
            break;
          }
        }
      } else {
        if (S.current_edit_macro.mouse_key_event == 512) {
          for (let count = 0; count < macro_keys.length; count++) {
            if (macro_keys[count].vCode == 1028) {
              layui2('[name="macro-add-select-key"]').val(count);
              break;
            }
          }
        } else {
          if (S.current_edit_macro.mouse_key_event == 767) {
            for (let len2 = 0; len2 < macro_keys.length; len2++) {
              if (macro_keys[len2].vCode == 1029) {
                layui2('[name="macro-add-select-key"]').val(len2);
                break;
              }
            }
          } else {
            for (let len3 = 0; len3 < macro_keys.length; len3++) {
              if (macro_keys[len3].vCode == S.current_edit_macro.mouse_key_code) {
                layui2('[name="macro-add-select-key"]').val(len3);
                document.getElementById("kbd-macro-add-select-key").textContent = macro_keys[len3].name;
                break;
              }
            }
          }
        }
      }
    }
    if (client != void 0 ? is_hs_keyboard(client.device) : false) {
      layui2("#mapping-macro-add-select-key").css("display", "none");
      layui2("#kbd-macro-add-select-key").css("display", "");
    } else {
      layui2("#mapping-macro-add-select-key").css("display", "");
      layui2("#kbd-macro-add-select-key").css("display", "none");
    }
    if (S.current_edit_macro.mouse_key_event == 522 || S.current_edit_macro.mouse_key_event == 526) {
      layui2("#macro-add-select-key-container").css("display", "none");
      layui2("#macro-add-wheel-delta-container").css("display", "");
      layui2("#macro-add-move-delta-container").css("display", "none");
      layui2("#macro-add-position-container").css("display", "none");
      layui2("#macro-add-wheel-delta-input").val(Math.abs(S.current_edit_macro.mouse_key_code));
    } else {
      if (S.current_edit_macro.mouse_key_event == 512) {
        layui2("#macro-add-select-key-container").css("display", "none");
        layui2("#macro-add-wheel-delta-container").css("display", "none");
        layui2("#macro-add-move-delta-container").css("display", "");
        layui2("#macro-add-position-container").css("display", "none");
        var value6 = S.current_edit_macro.mouse_key_code >> 16 & 65535;
        var value7 = S.current_edit_macro.mouse_key_code & 65535;
        layui2("#macro-add-move-delta-x-input").val((value6 - 2047) / 10);
        layui2("#macro-add-move-delta-y-input").val((value7 - 2047) / 10);
        layui2("#macro-add-move-loop-input").val(S.current_edit_macro.mouse_key_loop);
      } else {
        if (S.current_edit_macro.mouse_key_event == 767) {
          layui2("#macro-add-select-key-container").css("display", "none");
          layui2("#macro-add-wheel-delta-container").css("display", "none");
          layui2("#macro-add-move-delta-container").css("display", "none");
          layui2("#macro-add-position-container").css("display", "");
          var screenW = window.screen.width;
          var screenH = window.screen.height;
          var value8 = S.current_edit_macro.mouse_key_code >> 16 & 65535;
          var value9 = S.current_edit_macro.mouse_key_code & 65535;
          value8 = parseInt(value8 * screenW / 65535);
          value9 = parseInt(value9 * screenH / 65535);
          layui2("#macro-add-position-x-input").val(value8);
          layui2("#macro-add-position-y-input").val(value9);
        } else {
          if (S.current_edit_macro.mouse_key_code == 0) {
            layui2("#macro-add-select-key-container").css("display", "none");
            layui2("#macro-add-wheel-delta-container").css("display", "none");
            layui2("#macro-add-move-delta-container").css("display", "none");
            layui2("#macro-add-position-container").css("display", "none");
          } else {
            layui2("#macro-add-select-key-container").css("display", "");
            layui2("#macro-add-wheel-delta-container").css("display", "none");
            layui2("#macro-add-move-delta-container").css("display", "none");
            layui2("#macro-add-position-container").css("display", "none");
            if (S.current_edit_macro.mouse_key_event == 257) {
              layui2('[name="mapping-macro-action-key-event"]')[1].checked = true;
            } else if (S.current_edit_macro.mouse_key_event == 256) {
              layui2('[name="mapping-macro-action-key-event"]')[0].checked = true;
            } else {
              layui2('[name="mapping-macro-action-key-event"]')[0].checked = false;
              layui2('[name="mapping-macro-action-key-event"]')[1].checked = false;
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
    if (Object.keys(keyInfo).length == 0) {
      return;
    }
    var html2 = '<select name="mapping-function" lay-verify="required" lay-filter="mapping-function">';
    for (let len = 0; len < S.mouse_function_descs.length; len++) {
      if (S.mouse_functions[len] == 15 && !is_bt_supported(client)) {
        html2 += '<option value="' + len + '" disabled>' + S.mouse_function_descs[len] + "</option>";
      } else {
        html2 += '<option value="' + len + '">' + S.mouse_function_descs[len] + "</option>";
      }
    }
    html2 += "</select>";
    layui2("#mapping-function-select").html(html2);
    var offset = 0;
    for (let index = 0; index < S.mouse_functions.length; index++) {
      if (keyInfo.mouse_mapping_function == S.mouse_functions[index]) {
        offset = index;
        break;
      }
    }
    layui2('[name="mapping-function"]').val(offset);
    layui3.render("select");
    if (keyInfo.mouse_mapping_function == 9) {
      layui2("#mapping-function-dpi-container").css("display", "");
      var cpiRange = get_cpi_range(client);
      var value = get_cpi_step(client);
      var layui4 = layui.slider;
      layui4.render({
        "elem": "#slider-function-dpi-input",
        "min": cpiRange[0],
        "max": cpiRange[1],
        "step": value,
        "value": keyInfo.mouse_mapping_function_data,
        "input": true,
        "tips": false,
        "theme": S.theme_color,
        "done": function(result) {
          if (result != void 0) {
            keyInfo.mouse_mapping_function_data = result;
          }
        }
      });
    } else {
      layui2("#mapping-function-dpi-container").css("display", "none");
    }
    if (keyInfo.mouse_mapping_function == 13) {
      layui2("#mapping-function-toggle-esb-container").css("display", "");
    } else {
      layui2("#mapping-function-toggle-esb-container").css("display", "none");
    }
    var value2 = client.product_esb_ch == 255 ? client.device_info.esbChannel : client.product_esb_ch;
    var value3 = 1;
    html2 = '<table class="layui-table">';
    client.device_info.esbAddressArr.forEach((item) => {
      var i;
      var idx;
      i = item.substr(16, 2);
      if (value2 == 0) {
        idx = item.substr(0, 8);
      } else {
        idx = item.substr(8, 8);
      }
      item = i + idx;
      if (item != "0000000000") {
        html2 += "<tr>";
        html2 += "<td>";
        html2 += value3++;
        html2 += "</td>";
        html2 += '<td style="width: 100%;">';
        html2 += item;
        html2 += "</td>";
        html2 += "</tr>";
      }
    });
    html2 += "</table>";
    layui2("#paired-esb-addr-list").html(html2);
    if (keyInfo.mouse_mapping_function == 15) {
      layui2("#mapping-function-toggle-ble-container").css("display", "");
    } else {
      layui2("#mapping-function-toggle-ble-container").css("display", "none");
    }
    html2 = '<table class="layui-table">';
    client.device_info.peerInfo.forEach((item2) => {
      html2 += "<tr>";
      html2 += "<td>";
      html2 += item2.id;
      html2 += "</td>";
      html2 += '<td style="width: 100%;">';
      html2 += item2.address;
      html2 += "</td>";
      html2 += "</tr>";
    });
    html2 += "</table>";
    layui2("#paired-ble-addr-list").html(html2);
    if (keyInfo.mouse_mapping_function == 14) {
      layui2("#mapping-function-show-power-container").css("display", "");
    } else {
      layui2("#mapping-function-show-power-container").css("display", "none");
    }
    if (keyInfo.mouse_mapping_function == 16) {
      layui2("#mapping-function-shell-cmd-container").css("display", "");
      document.getElementById("function-shell-cmd-app-browse").src = RESOURCE_URL + "setting/folder.png";
      if (is_valid_url(keyInfo.mouse_mapping_function_text)) {
        layui2('[name="function-shell-cmd"]')[1].checked = true;
        layui2("#function-shell-cmd-app-browse").css("display", "none");
        layui2("#function-shell-cmd-app-browse").prop("disabled", true);
        layui2('[name="function-shell-cmd-app"]').prop("disabled", true);
        layui2('[name="function-shell-cmd-web"]').prop("disabled", false);
        layui2('[name="function-shell-cmd-app"]').val("");
        layui2('[name="function-shell-cmd-web"]').val(keyInfo.mouse_mapping_function_text);
        layui2("#function-shell-cmd-app-container").css("display", "none");
        layui2("#function-shell-cmd-web-container").css("display", "");
      } else {
        layui2('[name="function-shell-cmd"]')[0].checked = true;
        layui2("#function-shell-cmd-app-browse").css("display", "none");
        layui2("#function-shell-cmd-app-browse").prop("disabled", false);
        layui2('[name="function-shell-cmd-app"]').prop("disabled", false);
        layui2('[name="function-shell-cmd-web"]').prop("disabled", true);
        layui2('[name="function-shell-cmd-app"]').val(keyInfo.mouse_mapping_function_text);
        layui2('[name="function-shell-cmd-web"]').val("");
        layui2("#function-shell-cmd-app-container").css("display", "");
        layui2("#function-shell-cmd-web-container").css("display", "none");
      }
      layui3.render("radio");
    } else {
      layui2("#mapping-function-shell-cmd-container").css("display", "none");
    }
  }
  function select_mouse_key(keyCode, len) {
    if (len.length == 0) {
      S.select_key_name = "";
      ui_refresh_mapping_key(keyCode);
      select_mapping_type(keyCode, 3);
      return;
    }
    ui_refresh_mapping_key(keyCode);
    var flag = false;
    for (let index = 0; index < S.onboard_keys.length; index++) {
      var value = S.onboard_keys[index];
      if (len == value.name) {
        if (value.configType == 0) {
          if (value.touch_style == 27) {
            flag = true;
            select_mapping_type(keyCode, 0);
          } else if (value.touch_style == 29) {
            flag = true;
            select_mapping_type(keyCode, 2);
          }
        } else if (value.configType == 5) {
          flag = true;
          select_mapping_type(keyCode, 1);
        }
        break;
      }
    }
    if (!flag) {
      select_mapping_type(keyCode, 3);
    }
  }
  function select_mapping_type(client, mappingType) {
    var keyInfo = get_select_key_info();
    if (Object.keys(keyInfo).length == 0) {
      mappingType = 3;
    }
    S.macro_trigger_type_index = 0;
    layui.element.tabChange("mapping-key-type", mappingType);
    update_mapping(client, mappingType);
  }
  function update_mapping(client, mappingData) {
    $("#mapping-key-container").css("display", "none");
    $("#mapping-macro-container").css("display", "none");
    $("#mapping-function-container").css("display", "none");
    var keyInfo = get_select_key_info();
    if (Object.keys(keyInfo).length == 0) {
      return;
    }
    if (mappingData == 0) {
      $("#mapping-key-container").css("display", "");
      ui_refresh_tab_mapping_key(client);
    } else {
      if (mappingData == 1) {
        for (let len = 0; len <= 6; len++) {
          var flag = false;
          for (let index = 0; index < S.onboard_keys.length; index++) {
            if (S.onboard_keys[index].name == keyInfo.name && S.onboard_keys[index].macro_style == len) {
              flag = true;
              break;
            }
          }
          if (!flag) {
            var item = create_key_info();
            item.name = keyInfo.name;
            item.label = keyInfo.label;
            item.configType = 5;
            item.macro_style = len;
            S.onboard_keys.push(item);
            keyInfo = get_select_key_info();
          }
        }
        $("#mapping-macro-container").css("display", "");
        ui_refresh_tab_mapping_macro(client);
      } else if (mappingData == 2) {
        $("#mapping-function-container").css("display", "");
        ui_refresh_tab_mapping_function(client);
      }
    }
  }
  function set_mapping_keys(client) {
    var keyInfo = get_select_key_info();
    if (Object.keys(keyInfo).length == 0) {
      return;
    }
    var modifiersList = modifiers;
    var value = modifiersList[$('[name="mapping-ctrl-key1"]').val()].vCode;
    var value2 = modifiersList[$('[name="mapping-ctrl-key2"]').val()].vCode;
    var keysList = keys;
    var value3 = keysList[$('[name="mapping-key"]').val()].vCode;
    keyInfo.mouse_mapping_keys = "[" + value + "," + value2 + "," + value3 + "]";
    ui_refresh_mapping_key(client);
    ui_refresh_combination_key(client);
    S.need_save = true;
    ui_refresh_onboard_config(client);
  }
  function get_select_key_info() {
    if (S.select_key_name.length == 0) {
      return {};
    }
    for (let len = 0; len < S.onboard_keys.length; len++) {
      if (S.select_key_name == S.onboard_keys[len].name) {
        if (S.onboard_keys[len].configType == 5) {
          if (S.macro_trigger_type_index >= 0) {
            if (S.onboard_keys[len].macro_style == S.macro_trigger_type_index) {
              return S.onboard_keys[len];
            }
          } else {
            return S.onboard_keys[len];
          }
        } else {
          return S.onboard_keys[len];
        }
      }
    }
    var keyInfo = create_key_info();
    keyInfo.name = S.select_key_name;
    var html2 = "";
    var arr = S.select_key_name.split("+");
    arr.forEach((item) => {
      if (item == KEY_WHEEL_UP) {
        if (html2.length > 0) {
          html2 += "+";
        }
        html2 += "\xE2\u2013\xB2";
      } else {
        if (item == KEY_WHEEL_DOWN) {
          if (html2.length > 0) {
            html2 += "+";
          }
          html2 += "\xE2\u2013\xBC";
        } else {
          for (let index = 0; index < S.mouse_keys.length; index++) {
            if (item == S.mouse_keys[index].name) {
              if (html2.length > 0) {
                html2 += "+";
              }
              html2 += S.mouse_keys[index].label;
              break;
            }
          }
        }
      }
    });
    keyInfo.label = html2;
    keyInfo.configType = -1;
    S.onboard_keys.push(keyInfo);
    return keyInfo;
  }
  function shell_cmd_app_browse_file() {
    var keyInfo = get_select_key_info();
    if (Object.keys(keyInfo).length == 0) {
      return;
    }
    keyInfo.mouse_mapping_function_text = $("#shell-cmd-app-browse_file").val();
    $('[name="function-shell-cmd-app"]').val(keyInfo.mouse_mapping_function_text);
  }
  function get_key_name_from_label(label) {
    for (let len = 0; len < S.mouse_keys.length; len++) {
      if (label == S.mouse_keys[len].label) {
        return S.mouse_keys[len].name;
      }
    }
    return "";
  }
  function get_key_label_from_id(keyId) {
    for (let len = 0; len < S.mouse_keys.length; len++) {
      if (keyId == S.mouse_keys[len].id[0]) {
        return S.mouse_keys[len].label;
      }
    }
    return layui.i18np.prop("STRID_NONE");
  }
  function get_key_id_from_name(name) {
    for (let len = 0; len < S.mouse_keys.length; len++) {
      if (name == S.mouse_keys[len].name) {
        return S.mouse_keys[len].id[0];
      }
    }
    return 0;
  }
  function is_valid_url(url) {
    var urlRe = /^(https?:\/\/)?([\w.]+)\.([a-z]{2,6}\.?)(\/[\w.]*)*\/?$/i;
    return !!urlRe.test(url);
  }
  function start() {
    console.log("[DEBUG] start() called", "S.wireless_optimizing=", S.wireless_optimizing, "S.window_focused=", S.window_focused, "client_count=", usb_client_list?.length);
    if (!S.wireless_optimizing && S.window_focused) {
      usb_client_list.forEach((client) => {
        if (is_receiver(client) && client.helloed) {
          console.log("[DEBUG] start() -> send_event_action 0x42 for receiver", client?.id);
          send_event_action(client, 66, 0);
        }
        if (client.virtual) {
          if (client.connected) {
            if ((/* @__PURE__ */ new Date()).getTime() - client.esb_last_alive_time > client.esb_alive_timeout) {
              client.helloed = false;
              client.connected = false;
              client.send_event_buf = new Uint8Array(0);
              client.recv_buf = new Uint8Array(0);
              client.device_name = "";
              client.device_info = reset_device_info(client.device_info);
              client.syncing = false;
              usb_client_list.forEach((item) => {
                if (is_receiver(item) && item.device == client.device) {
                  if (item.helloed) {
                    send_event_query(client);
                  }
                }
              });
              window.postMessage({
                "action": ACTION_REFRESH_CURRENT_CLIENT
              });
              layui.layer.closeAll();
            } else if (client.syncing) {
              if (client.eplapsed_syncing_ms != 0 && (/* @__PURE__ */ new Date()).getTime() - client.eplapsed_syncing_ms > 1e3) {
                log_r(">>>>>>>>sync success");
                client.syncing = false;
                client.recv_buf = new Uint8Array(0);
              }
              client.esb_last_alive_time = (/* @__PURE__ */ new Date()).getTime();
            } else if (client.querying_more_result) {
              client.esb_last_alive_time = (/* @__PURE__ */ new Date()).getTime();
            } else {
              send_event_ping(client, false);
            }
          }
        } else if (client.connected) {
          if (client.querying_more_result) {
            client.esb_last_alive_time = (/* @__PURE__ */ new Date()).getTime();
          } else {
            send_event_ping(client, false);
          }
        }
      });
    }
  }
  function adjustTable() {
    var el = document.getElementById("settings");
    if (el.rows.length == 1) {
      if (window.innerWidth < 1780) {
        var item = document.createElement("table");
        var el2 = document.createElement("tbody");
        var firstRow = el.rows[0];
        var value = el2.insertRow();
        var value2 = value.insertCell();
        value2.innerHTML = firstRow.cells[0].innerHTML;
        value2.colSpan = 2;
        value2.style = "padding-bottom: 10px;";
        value = el2.insertRow();
        value2 = value.insertCell();
        value2.innerHTML = firstRow.cells[1].innerHTML;
        value2.style = "vertical-align: top;padding-right: 30px; width: 50%;";
        value2 = value.insertCell();
        value2.innerHTML = firstRow.cells[2].innerHTML;
        value2.style = "vertical-align: top;padding-right: 30px;";
        item.appendChild(el2);
        item.style.width = "100%";
        item.id = el.id;
        el.parentNode.replaceChild(item, el);
        if (current_usb_client != void 0) {
          setting_mapping_init(current_usb_client);
          ui_refresh_mapping_key(current_usb_client);
        }
        window.postMessage({
          "action": ACTION_UI_REFRESH_SETTING
        });
        setTimeout(function() {
          let el3 = document.getElementById("setting-key-delay-section");
          let el4 = document.getElementById("setting-lod-section");
          el4.style.height = el3.offsetTop + el3.offsetHeight - el4.offsetTop - 20 + "px";
        }, 250);
      }
    } else {
      if (window.innerWidth >= 1780) {
        var item = document.createElement("table");
        var el2 = document.createElement("tbody");
        var value = el2.insertRow();
        var value2 = value.insertCell();
        value2.innerHTML = el.rows[0].cells[0].innerHTML;
        value2.style = "vertical-align: top;height: 1px;";
        value2 = value.insertCell();
        value2.innerHTML = el.rows[1].cells[0].innerHTML;
        value2.style = "width: 35%;min-width: 340px;vertical-align: top;padding-right: 30px;";
        value2 = value.insertCell();
        value2.innerHTML = el.rows[1].cells[1].innerHTML;
        value2.style = "width: 35%;min-width: 300px;vertical-align: top;padding-right: 30px;";
        item.appendChild(el2);
        item.id = el.id;
        el.parentNode.replaceChild(item, el);
        if (current_usb_client != void 0) {
          setting_mapping_init(current_usb_client);
          ui_refresh_mapping_key(current_usb_client);
        }
        window.postMessage({
          "action": ACTION_UI_REFRESH_SETTING
        });
        setTimeout(function() {
          let el5 = document.getElementById("setting-key-delay-section");
          let el6 = document.getElementById("setting-lod-section");
          el6.style.height = el5.offsetTop + el5.offsetHeight - el6.offsetTop - 20 + "px";
        }, 250);
      }
    }
  }

  // ui/ui-settings.js
  var ui_refresh_setting_timer = void 0;
  function ui_refresh_setting(client) {
    if (client == void 0) {
      return;
    }
    if (client != void 0 ? is_hs_keyboard(client.device) : false) {
      return;
    }
    clearTimeout(ui_refresh_setting_timer);
    ui_refresh_setting_timer = setTimeout(() => {
      ui_refresh_setting_delayed(client);
      ui_refresh_setting_timer = void 0;
    }, 100);
  }
  function ui_refresh_setting_delayed(client) {
    var layui2 = layui.$;
    var layui3 = layui.form;
    var layui4 = layui.slider;
    var cpiRange = get_cpi_range(client);
    var value = get_cpi_step(client);
    var value2 = client.device_info.resolution;
    var value3 = value2 & 65535;
    var value4 = value2 >> 16 & 65535;
    if (value4 == 0) {
      layui2('[name="dpi-both-x-y"]').prop("checked", false);
      layui2("#slider-dpi-y-input-container").css("display", "none");
      layui2("#slider-dpi-x-input-label").css("display", "none");
      document.getElementById("slider-dpi-x-input").style.marginLeft = "0px";
    } else {
      layui2('[name="dpi-both-x-y"]').prop("checked", true);
      layui2("#slider-dpi-y-input-container").css("display", "");
      layui2("#slider-dpi-x-input-label").css("display", "");
      document.getElementById("slider-dpi-x-input").style.marginLeft = "18px";
    }
    if (is_cpi_xy_supported(client)) {
      layui2("#dpi-both-x-y").css("display", "");
    } else {
      layui2("#dpi-both-x-y").css("display", "none");
    }
    layui4.render({
      "elem": "#slider-dpi-x-input",
      "min": cpiRange[0],
      "max": cpiRange[1],
      "step": value,
      "value": value3,
      "input": true,
      "tips": false,
      "theme": S.theme_color,
      "done": function(result) {
        if (result != void 0) {
          var resolution = current_usb_client.device_info.resolution;
          var value5 = resolution >> 16 & 65535;
          set_cpi(current_usb_client, result | value5 << 16);
        }
      }
    });
    layui4.render({
      "elem": "#slider-dpi-y-input",
      "min": cpiRange[0],
      "max": cpiRange[1],
      "step": value,
      "value": value4,
      "input": true,
      "tips": false,
      "theme": S.theme_color,
      "done": function(result) {
        if (result != void 0) {
          var resolution2 = current_usb_client.device_info.resolution;
          var value6 = resolution2 & 65535;
          var value7 = resolution2 >> 16 & 65535;
          if (value7 != 0) {
            set_cpi(current_usb_client, value6 | result << 16);
          }
        }
      }
    });
    var value8 = layui2("#dpi-level-edit");
    if (S.cpi_level_editing) {
      value8.addClass("layui-bg-blue");
      value8.html(layui.i18np.prop("STRID_DONE"));
    } else {
      value8.removeClass("layui-bg-blue");
      value8.html(layui.i18np.prop("STRID_EDIT"));
    }
    var arr = client.device_info.cpiLevels;
    var offset = 0;
    arr.forEach((item) => {
      if (item > 0) {
        offset++;
      }
    });
    if (offset < arr.length) {
      layui2("#dpi-level-add").css("display", "");
    } else {
      layui2("#dpi-level-add").css("display", "none");
    }
    ui_refresh_cpi_levels(client);
    var stored = localStorage.getItem("setting-x-polling");
    if (stored == void 0 || stored == 0) {
      var html2 = "";
      var arr2 = get_polling_rates(client, usb_client_list);
      var maxRate = get_max_polling_rate(client, usb_client_list);
      var maxPowerRate = get_max_power_polling_rate(client);
      var currentRate = client.device_info.pollingRate;
      for (var ri = 0; ri < arr2.length; ri++) {
        var rate = arr2[ri];
        var withinLimit = rate <= maxRate && rate <= maxPowerRate;
        var isCurrent = rate == currentRate;
        html2 += RadioInput({ name: "setting_polling_rates", value: rate, label: rate, checked: isCurrent, disabled: !withinLimit });
      }
      layui2("#setting-polling-rates").html(html2);
      layui2("#setting-polling-rates").css("display", "");
      layui2("#slider-x-polling-input").css("display", "none");
      layui2('[name="x-polling"]').prop("checked", false);
    } else {
      layui2("#setting-polling-rates").css("display", "none");
      layui2("#slider-x-polling-input").css("display", "");
      layui2('[name="x-polling"]').prop("checked", true);
      layui4.render({
        "elem": "#slider-x-polling-input",
        "min": 50,
        "max": Math.min(get_max_polling_rate(client, usb_client_list), get_max_power_polling_rate(client)),
        "step": 1,
        "value": client.device_info.pollingRate,
        "input": true,
        "tips": false,
        "theme": S.theme_color,
        "done": function(result) {
          if (result != void 0) {
            set_polling_rate(client, result);
          }
        }
      });
    }
    if (client.device_info.glassMode != void 0 ? client.device_info.glassMode == 1 : false) {
      layui2("#glass-mode-activated").css("display", "");
    } else {
      layui2("#glass-mode-activated").css("display", "none");
    }
    var value9 = client.device_info.light;
    if ((value9 & 32) != 0) {
      layui2('[name="light-auto-off"]').prop("checked", true);
    } else {
      layui2('[name="light-auto-off"]').prop("checked", false);
    }
    if ((value9 & 64) != 0) {
      layui2('[name="light-mode"]')[0].checked = true;
      layui2("#setting-light-define-section").css("display", "none");
      layui2("#light").css("display", "");
    } else if ((value9 & 64) == 0 && (value9 & 16) == 0) {
      layui2('[name="light-mode"]')[1].checked = true;
      layui2("#setting-light-define-section").css("display", "");
      layui2("#light").css("display", "");
    } else {
      layui2('[name="light-mode"]')[2].checked = true;
      layui2("#setting-light-define-section").css("display", "none");
      layui2("#light").css("display", "none");
    }
    var colors = get_light_display_colors(client);
    html2 = ColorSelectorTable({ colors, bitmask: value9, name: "light-color", actionAttr: "light-color-action" });
    layui2("#setting-light-define-colors").html(html2);
    layui4.render({
      "elem": "#slider-brightness",
      "min": 0,
      "max": 255,
      "step": 1,
      "value": client.device_info.brightness,
      "input": false,
      "theme": S.theme_color,
      "done": function(result) {
        if (result != void 0) {
          send_event_set_brightness(client, result);
        }
      }
    });
    layui2("#brightness").css("display", !is_brightness_supported(client) ? "none" : "");
    html2 = '<div class="layui-row">';
    var isGseries = client.device_info != void 0 && client.device_info.revision != void 0 && client.device_info.revision.substr(0, 2) == "G-";
    var modes = isGseries ? get_power_modes2(client) : get_power_modes(client);
    var colClass = modes.length == 4 ? "layui-col-xs3" : "layui-col-xs4";
    html2 = '<div class="layui-row">';
    for (var pi = 0; pi < modes.length; pi++) {
      var isDisabled = isGseries && pi < 2;
      html2 += '<div class="' + colClass + '">';
      html2 += RadioInput({ name: "setting_power_modes", value: pi, label: modes[pi], checked: pi == client.device_info.powerMode, disabled: isDisabled });
      html2 += "</div>";
    }
    html2 += "</div>";
    layui2("#setting-power-modes").html(html2);
    var modeIdx = client.device_info.powerMode;
    var tips = get_power_mode_tips(client);
    layui2("#selected-power-mode-tips").html(modes[modeIdx] + ": " + tips[modeIdx]);
    html2 = '<div class="layui-row">';
    var lods = get_lods_list(client);
    for (var li = 0; li < lods.length; li++) {
      html2 += '<div class="layui-col-xs4">';
      html2 += RadioInput({ name: "setting_lods", value: li + 1, label: lods[li], checked: li + 1 == client.device_info.lod });
      html2 += "</div>";
    }
    html2 += "</div>";
    layui2("#setting-lods").html(html2);
    layui2("#setting-lod-section").css("display", lods.length > 1 ? "" : "none");
    var value11 = Math.round(client.device_info.squal * 100 / 255);
    layui2("#surface-quality").text(layui.i18np.prop("STRID_SETTING_SURFACE_QUALITY") + " " + value11 + "%");
    layui2("#surface-quality").css("display", value11 > 0 ? "" : "none");
    var value12 = client.device_info.equal;
    if (value12 == 255) {
      layui2("#wireless-quality").text("");
    } else {
      value12 = 1e3 - value12;
      var value13 = layui.i18np.prop("STRID_SETTING_WIRELESS_QUALITY") + " " + value12 / 10 + "%";
      if ((client.device_info.txOutputPower == 0 ? 0 : 1) && !(client.device_info != void 0 && client.device_info.revision != void 0 && client.device_info.revision.substr(0, 2) == "G-") && client.device_info.txOutputPowerApplied < 8) {
        value13 += "(" + client.device_info.txOutputPowerApplied + ")";
      }
      layui2("#wireless-quality").text(value13);
    }
    layui2('[name="setting-angle-snapping"]').prop("checked", !!(client.device_info.angleSnapping == 1));
    layui2('[name="setting-angle-snapping"]').prop("disabled", !!(client.device_info != void 0 && client.device_info.revision != void 0 && client.device_info.revision.substr(0, 2) == "G-"));
    layui2('[name="setting-ripple-control"]').prop("checked", !!(client.device_info.rippleControl == 1));
    layui2('[name="setting-ripple-control"]').prop("disabled", !!(client.device_info != void 0 && client.device_info.revision != void 0 && client.device_info.revision.substr(0, 2) == "G-"));
    layui2('[name="setting-motion-sync"]').prop("checked", !!(client.device_info.motionSync == 1));
    layui2('[name="setting-wireless-turbo"]').prop("checked", !!((client.device_info.txOutputPower == 0 ? 0 : 1) == 1));
    layui2('[name="setting-rf-channel"]').prop("disabled", !((client.device_info.txOutputPower == 0 ? 0 : 1) == 1));
    if (client.device_info.hopChannelSupported && client.device_info.hopChannel) {
      layui2('[name="setting-rf-channel"]')[3].checked = true;
    } else {
      if (client.device_info.rfChannel == 2) {
        layui2('[name="setting-rf-channel"]')[0].checked = true;
      } else {
        if (client.device_info.rfChannel == 40) {
          layui2('[name="setting-rf-channel"]')[1].checked = true;
        } else if (client.device_info.rfChannel == 80) {
          layui2('[name="setting-rf-channel"]')[2].checked = true;
        }
      }
    }
    layui2('[name="power-saving"]').prop("checked", client.device_info.autoTxPower);
    if (!(client.device_info != void 0 && client.device_info.revision != void 0 && client.device_info.revision.substr(0, 2) == "G-") && client.device_info.pollingRate <= 2e3 && (client.device_info.txOutputPower == 0 ? 0 : 1) == 1) {
      layui2("#setting-power-saving").css("display", "");
      if (client.device_info.hopChannelSupported) {
        layui2("#setting-rf-channels [class*=layui-col-xs]").each(function() {
          layui2(this)[0].className = "layui-col-xs3";
        });
      } else {
        layui2("#setting-rf-channels [class*=layui-col-xs]").each(function() {
          layui2(this)[0].className = "layui-col-xs4";
        });
      }
    } else {
      layui2("#setting-power-saving").css("display", "none");
      if (client.device_info.hopChannelSupported) {
        layui2("#setting-rf-channels [class*=layui-col-xs]").each(function() {
          layui2(this)[0].className = "layui-col-xs3";
        });
      } else {
        layui2("#setting-rf-channels [class*=layui-col-xs]").each(function() {
          layui2(this)[0].className = "layui-col-xs4";
        });
      }
    }
    layui2('[name="glass-mode"]').prop("checked", client.device_info.glassModeEnabled != void 0 ? client.device_info.glassModeEnabled == 1 : false);
    layui2("#setting-glass-mode").css("display", is_glass_mode_supported(client) ? "" : "none");
    layui2("#btn-wireless-optimize").css("display", client.device_info.hopChannelSupported ? "none" : "");
    layui2("#setting-wireless-turbo-desc").css("display", client.device_info.hopChannelSupported ? "none" : "");
    layui2("#setting-wireless-turbo-desc2").css("display", !client.device_info.hopChannelSupported ? "none" : "");
    layui2("#setting-rf-channel-auto").css("display", !client.device_info.hopChannelSupported ? "none" : "");
    html2 = "";
    if (client.device_info.hopChannelSupported && client.device_info.hopChannel) {
      html2 += layui.i18np.prop("STRID_SETTING_RF_CHANNEL_AUTO");
      html2 += ": " + layui.i18np.prop("STRID_SETTING_RF_CHANNEL_AUTO_TIPS");
    } else {
      if (client.device_info.rfChannel == 2) {
        html2 += layui.i18np.prop("STRID_SETTING_RF_CHANNEL_2");
        html2 += ": " + layui.i18np.prop("STRID_SETTING_RF_CHANNEL_2_TIPS");
      } else {
        if (client.device_info.rfChannel == 40) {
          html2 += layui.i18np.prop("STRID_SETTING_RF_CHANNEL_40");
          html2 += ": " + layui.i18np.prop("STRID_SETTING_RF_CHANNEL_40_TIPS");
        } else if (client.device_info.rfChannel == 80) {
          html2 += layui.i18np.prop("STRID_SETTING_RF_CHANNEL_80");
          html2 += ": " + layui.i18np.prop("STRID_SETTING_RF_CHANNEL_80_TIPS");
        }
      }
    }
    layui2("#selected-rf-channel-tips").html(html2);
    var value14 = client.device_info.sleepTime;
    if (value14 > 60) {
      value14 = 59 + value14 / 60;
    }
    var value13 = layui4.render({
      "elem": "#slider-sleep-time",
      "min": 10,
      "max": 89,
      "step": 1,
      "value": value14,
      "input": false,
      "theme": S.theme_color,
      "tipsAlways": true,
      "setTips": function(value5) {
        return value5 < 60 ? value5 + " " + layui.i18np.prop("STRID_SETTING_UNIT_SECOND") : (value5 = value5 - 59, value5 + " " + layui.i18np.prop("STRID_SETTING_UNIT_MINUTE"));
      },
      "done": function(result) {
        if (result != void 0) {
          if (result > 60) {
            result = (result - 59) * 60;
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
      layui2("#setting-angle-tuning-section").css("display", "");
      value13 = layui4.render({
        "elem": "#slider-angle-tuning",
        "min": -30,
        "max": 30,
        "step": 1,
        "value": value15,
        "input": true,
        "tips": false,
        "theme": S.theme_color,
        "done": function(result) {
          if (result != void 0) {
            set_angle_tuning(client, result);
          }
        }
      });
      value13.setValue(value15);
    } else {
      layui2("#setting-angle-tuning-section").css("display", "none");
    }
    var len3 = client.device_info.keyDelay;
    if (len3.length > 0) {
      layui2("#setting-key-delay-section").css("display", "");
      var index3 = layui2('[name="key-delay-select-key"]').val();
      var index4 = 0;
      if (index3 > 0) {
        var value16 = get_key_name_from_label(S.mouse_key_labels[index3]);
        var value17 = get_key_id_from_name(value16);
        index4 = value17 - 10;
        index4 %= len3.length;
      }
      var value18 = len3[index4] & 15;
      value13 = layui4.render({
        "elem": "#slider-key-down-delay",
        "min": client.device_info != void 0 && client.device_info.revision != void 0 && client.device_info.revision.substr(0, 2) == "G-" ? 0 : 1,
        "max": 10,
        "step": 1,
        "value": value18,
        "input": true,
        "tips": false,
        "theme": S.theme_color,
        "done": function(result) {
          if (result != void 0) {
            var len4 = client.device_info.keyDelay;
            var index5 = layui2('[name="key-delay-select-key"]').val();
            if (index5 == 0) {
              var flag = false;
              for (var count = 0; count < len4.length; count++) {
                flag |= set_key_delay(client, count, result & 15 | len4[count] & 240);
              }
              if (flag) {
                send_event_mouse_param(client);
              }
            } else {
              var value19 = get_key_name_from_label(S.mouse_key_labels[index5]);
              var value20 = get_key_id_from_name(value19);
              var index6 = value20 - 10;
              index6 %= len4.length;
              if (set_key_delay(client, index6, result & 15 | len4[index6] & 240)) {
                send_event_mouse_param(client);
              }
            }
            refresh_key_delay_list(client);
          }
        }
      });
      if (client.device_info != void 0 && client.device_info.revision != void 0 && client.device_info.revision.substr(0, 2) == "G-") {
        var value21 = len3[index4] >> 4 & 15;
        value13 = layui4.render({
          "elem": "#slider-key-up-delay",
          "min": 0,
          "max": 10,
          "step": 1,
          "value": value21,
          "input": true,
          "tips": false,
          "theme": S.theme_color,
          "done": function(result) {
            if (result != void 0) {
              var len5 = client.device_info.keyDelay;
              var index7 = layui2('[name="key-delay-select-key"]').val();
              if (index7 == 0) {
                var flag2 = false;
                for (var len6 = 0; len6 < len5.length; len6++) {
                  flag2 |= set_key_delay(client, len6, result << 4 & 240 | len5[len6] & 15);
                }
                if (flag2) {
                  send_event_mouse_param(client);
                }
              } else {
                var value22 = get_key_name_from_label(S.mouse_key_labels[index7]);
                var value23 = get_key_id_from_name(value22);
                var index8 = value23 - 10;
                index8 %= len5.length;
                if (set_key_delay(client, index8, result << 4 & 240 | len5[index8] & 15)) {
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
      layui2("#setting-key-delay-section").css("display", "");
    }
    layui3.render("radio");
    layui3.render("checkbox");
    S.onboard_status = client.device_info.onboardStatus;
    ui_refresh_setting_mapping(client);
    setTimeout(function() {
      let el = document.getElementById("setting-key-delay-section");
      let el2 = document.getElementById("setting-lod-section");
      el2.style.height = el.offsetTop + el.offsetHeight - el2.offsetTop - 20 + "px";
    }, 1);
  }
  function refresh_key_delay_list(client) {
    var layui2 = layui.$;
    var layui3 = layui.form;
    var len = client.device_info.keyDelay;
    var value = layui2('[name="key-delay-select-key"] option');
    for (let index = 1; index < S.mouse_key_labels.length; index++) {
      var value2 = get_key_name_from_label(S.mouse_key_labels[index]);
      var value3 = get_key_id_from_name(value2);
      var index2 = value3 - 10;
      index2 %= len.length;
      var value4 = S.mouse_key_labels[index];
      if (S.mouse_key_labels[index] == "\xE2\u2018 ") {
        value4 = layui.i18np.prop("STRID_KEY_LEFT_S");
      } else {
        if (S.mouse_key_labels[index] == "\xE2\u2018\xA1") {
          value4 = layui.i18np.prop("STRID_KEY_MIDDLE_S");
        } else if (S.mouse_key_labels[index] == "\xE2\u2018\xA2") {
          value4 = layui.i18np.prop("STRID_KEY_RIGHT_S");
        }
      }
      if (client.device_info != void 0 && client.device_info.revision != void 0 && client.device_info.revision.substr(0, 2) == "G-") {
        value[index].textContent = value4 + " - " + (len[index2] & 15) + "/" + (len[index2] >> 4 & 15) + " ms";
      } else {
        value[index].textContent = value4 + " - " + (len[index2] & 15) + " ms";
      }
      value[index].disabled = S.mouse_keys[index - 1].visible != void 0 && !S.mouse_keys[index - 1].visible;
    }
    layui3.render("select");
  }
  function ui_refresh_cpi_levels(client) {
    var value = client.device_info.resolution;
    var value2 = value & 65535;
    var value3 = value >> 16 & 65535;
    var len = client.device_info.cpiLevels;
    var value4 = client.device_info.cpiLevelColors;
    var darkTheme = is_dark_theme() ? "" : "_gray";
    var html2 = '<div class="layui-row" style="margin-top: 10px;">';
    for (let index = 0; index < len.length; index++) {
      var value5 = len[index];
      var value6 = value5 & 65535;
      var value7 = value5 >> 16 & 65535;
      if (value7 == 0) {
        value7 = value6;
      }
      var value8 = value4[index];
      if (value5 <= 0) {
        html2 += '<div class="layui-col-xs3" style="padding-top: 3px;padding-bottom: 3px;width: fit-content;display: none;">';
      } else {
        html2 += '<div class="layui-col-xs3" style="padding-top: 3px;padding-bottom: 3px;width: fit-content;">';
      }
      html2 += '<a cpi-level-index="' + index + '" cpi-level-action="select" style="cursor: pointer;">';
      if (value3 == 0) {
        html2 += '<div style="width: 80px;height: 30px;margin-right: 6px;">';
      } else {
        html2 += '<div style="width: 80px;height: 54px;margin-right: 6px;">';
      }
      html2 += '<div style="position: absolute;">';
      if (value3 == 0) {
        if (S.cpi_level_editing || value2 == value6) {
          html2 += '<img src="' + RESOURCE_URL + "setting/dpi_selected" + darkTheme + '.png" style="position: absolute;"/>';
        } else {
          html2 += '<img src="' + RESOURCE_URL + 'setting/dpi_normal.png" style="position: absolute;"/>';
        }
      } else if (S.cpi_level_editing || value == value5) {
        html2 += '<img src="' + RESOURCE_URL + "setting/dpi_selected_h" + darkTheme + '.png" style="position: absolute;"/>';
      } else {
        html2 += '<img src="' + RESOURCE_URL + 'setting/dpi_normal_h.png" style="position: absolute;"/>';
      }
      html2 += "</div>";
      html2 += '<div style="position: absolute;">';
      var offset = 0;
      if (value3 > 0) {
        offset = 12;
      }
      if ((value8 & 7) == 7) {
        html2 += '<img src="' + RESOURCE_URL + 'setting/dpi_color_white.png" style="position: absolute; margin-top:' + offset + 'px;"/>';
      } else {
        if ((value8 & 7) == 4) {
          html2 += '<img src="' + RESOURCE_URL + 'setting/dpi_color_red.png" style="position: absolute; margin-top:' + offset + 'px;"/>';
        } else {
          if ((value8 & 7) == 2) {
            html2 += '<img src="' + RESOURCE_URL + 'setting/dpi_color_green.png" style="position: absolute; margin-top:' + offset + 'px;"/>';
          } else {
            if ((value8 & 7) == 1) {
              html2 += '<img src="' + RESOURCE_URL + 'setting/dpi_color_blue.png" style="position: absolute; margin-top:' + offset + 'px;"/>';
            } else {
              if ((value8 & 7) == 6) {
                html2 += '<img src="' + RESOURCE_URL + 'setting/dpi_color_yellow.png" style="position: absolute; margin-top:' + offset + 'px;"/>';
              } else {
                if ((value8 & 7) == 5) {
                  html2 += '<img src="' + RESOURCE_URL + 'setting/dpi_color_purple.png" style="position: absolute; margin-top:' + offset + 'px;"/>';
                } else {
                  if ((value8 & 7) == 3) {
                    html2 += '<img src="' + RESOURCE_URL + 'setting/dpi_color_skyblue.png" style="position: absolute; margin-top:' + offset + 'px;"/>';
                  } else {
                  }
                }
              }
            }
          }
        }
      }
      html2 += "</div>";
      html2 += '<div style="position: absolute;width: 80px;">';
      if (value3 == 0) {
        if (S.cpi_level_editing || value == value5) {
          html2 += '<p style="color:white;text-align: center;margin-top: 7px;" >' + value6 + "</p>";
        } else {
          html2 += '<p style="text-align: center;margin-top: 7px;" >' + value6 + "</p>";
        }
      } else if (S.cpi_level_editing || value == value5) {
        html2 += '<p style="color:white;text-align: center;margin-top: 10px;" >X:' + value6 + "</p>";
        html2 += '<p style="color:white;text-align: center;margin-top: 2px;" >Y:' + value7 + "</p>";
      } else {
        html2 += '<p style="text-align: center;margin-top: 10px;" >X:' + value6 + "</p>";
        html2 += '<p style="text-align: center;margin-top: 2px;" >Y:' + value7 + "</p>";
      }
      html2 += "</div>";
      html2 += "</div>";
      html2 += "</a>";
      html2 += "</div>";
      if (index == 3) {
        html2 += '</div><div class="layui-row">';
      }
    }
    ;
    html2 += "</div>";
    $("#setting-dpi-levels").html(html2);
  }
  function ui_refresh_dpi_input_panel(client, levelIndex, cpiLabel, isXYLight, showXY) {
    S.cpi_level_light = isXYLight;
    if (showXY) {
      $("#dpi-level-input-layout").css("display", "none");
      $("#x-dpi-level-input-layout").css("display", "");
      $("#y-dpi-level-input-layout").css("display", "");
      $("#dpi-level-input-hint").html(layui.i18np.prop("STRID_SETTING_DPI_LEVEL_SPEED_INPUT_XY"));
    } else {
      $("#dpi-level-input-layout").css("display", "");
      $("#x-dpi-level-input-layout").css("display", "none");
      $("#y-dpi-level-input-layout").css("display", "none");
      $("#dpi-level-input-hint").html(layui.i18np.prop("STRID_SETTING_DPI_LEVEL_SPEED_INPUT"));
    }
    var cpiRange = get_cpi_range(client);
    var value = get_cpi_step(client);
    var el = document.getElementById("dpi-level-input");
    el.setAttribute("step", value);
    el.setAttribute("min", cpiRange[0]);
    el.setAttribute("max", cpiRange[1]);
    el = document.getElementById("x-dpi-level-input");
    el.setAttribute("step", value);
    el.setAttribute("min", cpiRange[0]);
    el.setAttribute("max", cpiRange[1]);
    el = document.getElementById("y-dpi-level-input");
    el.setAttribute("step", value);
    el.setAttribute("min", cpiRange[0]);
    el.setAttribute("max", cpiRange[1]);
    $("#dpi-level-input").val(levelIndex);
    $("#x-dpi-level-input").val(levelIndex);
    $("#y-dpi-level-input").val(cpiLabel);
    var colors2 = get_light_display_colors(client);
    html = ColorSelectorTable({ colors: colors2, bitmask: isXYLight, name: "dpi-level-color", actionAttr: "dpi-level-color-action" });
    $("#dpi-input-colors").html(html);
    layui.form.render();
  }

  // ui/ui-clients.js
  async function refresh_client_list() {
    var arr = [];
    var devicesByPid = {};
    await navigator.hid.getDevices().then((arr2) => {
      arr2.forEach((item) => {
        if (is_supported(item.productId)) {
          if (devicesByPid[item.productId] == void 0) {
            devicesByPid[item.productId] = [];
          }
          devicesByPid[item.productId][devicesByPid[item.productId].length] = item;
        }
      });
    });
    for (var index in devicesByPid) {
      devicesByPid[index].forEach((item2, item3, item4) => {
        if (item2.collections[0].inputReports.length > 0 && item2.collections[0].outputReports.length > 0) {
          arr[arr.length] = item2;
        }
      });
    }
    var kept = [];
    DeviceStore.clients.forEach((client) => {
      var connected = arr.some((device) => device == client.device);
      if (connected) {
        kept.push(client);
      } else {
        DeviceStore.removeClient(client.id);
      }
    });
    arr.forEach((device) => {
      var exists = kept.some((c) => c.device == device);
      if (!exists) {
        device.oninputreport = device_receive_data;
        var newClient = DeviceStore.addClient(device, 255, false);
        send_event_query(newClient);
      }
    });
    refresh_current_client();
  }
  function update_setting_x_polling() {
    var stored = localStorage.getItem("setting-x-polling");
    if (stored == void 0 || stored == 0) {
      var pollingRate = current_usb_client.device_info.pollingRate;
      if (pollingRate != 125 && pollingRate != 250 && pollingRate != 500 && pollingRate != 1e3 && pollingRate != 2e3 && pollingRate != 4e3 && pollingRate != POLLING_RATE_MAX_HZ) {
        localStorage.setItem("setting-x-polling", 1);
      }
    }
  }
  function refresh_current_client() {
    var flag = false;
    DeviceStore.clients.forEach((item) => {
      if (current_usb_client != void 0 && item.id == current_usb_client.id && item.helloed && !is_receiver(item)) {
        flag = true;
      }
    });
    if (!flag) {
      S.editing = false;
      close_all_layer();
      const nextClient = DeviceStore.clients.find((item2) => item2.helloed && !is_receiver(item2));
      if (nextClient) {
        DeviceStore.currentId = nextClient.id;
        DS.current_usb_client = nextClient;
        update_setting_x_polling();
        if (nextClient.device_info != void 0 && nextClient.device_info.revision != void 0 && nextClient.device_info.revision.substr(0, 2) == "G-") {
          $('[name="setting-fw-channel"]')[1].checked = true;
        } else {
          $('[name="setting-fw-channel"]')[0].checked = true;
        }
        $('[name="setting-fw-channel"]')[0].disabled = !nextClient.device_info.dynamicGOM;
        $('[name="setting-fw-channel"]')[1].disabled = !nextClient.device_info.dynamicGOM;
        layui.form.render("radio");
        DeviceStore._emit("current:changed", nextClient);
      }
    }
  }
  function ui_refresh_current_client_rssi() {
    var layui2 = layui.$;
    if (current_usb_client != void 0) {
      var el = document.getElementById("current-usb-client-rssi-icon");
      if (current_usb_client.virtual) {
        DeviceStore.clients.forEach((client) => {
          if (!client.virtual && client.device == current_usb_client.device) {
            if (is_hub(client) && client.device_info.wired) {
              layui2("#current-usb-client-rssi-icon").css("display", "");
              el.src = RESOURCE_URL + "product/usb.png";
              layui2("#current-usb-client-rssi-icon").css("left", "285px");
              layui2("#current-usb-client-rssi-icon").css("top", "40px");
            } else {
              var value = -Math.abs(client.device_info.rssi);
              if (is_limit_memory(client)) {
                layui2("#current-usb-client-rssi-icon").css("display", "");
                el.src = RESOURCE_URL + "product/wifi.png";
                layui2("#current-usb-client-rssi-icon").css("left", "285px");
                layui2("#current-usb-client-rssi-icon").css("top", "39px");
              } else {
                if (value == 0) {
                  layui2("#current-usb-client-rssi-icon").css("display", "none");
                } else {
                  if (value >= -40) {
                    layui2("#current-usb-client-rssi-icon").css("display", "");
                    el.src = RESOURCE_URL + "product/rssi_higher.png";
                  } else {
                    if (value >= -60) {
                      layui2("#current-usb-client-rssi-icon").css("display", "");
                      el.src = RESOURCE_URL + "product/rssi_high.png";
                    } else if (value >= -80) {
                      layui2("#current-usb-client-rssi-icon").css("display", "");
                      el.src = RESOURCE_URL + "product/rssi_mid.png";
                    } else {
                      layui2("#current-usb-client-rssi-icon").css("display", "");
                      el.src = RESOURCE_URL + "product/rssi_low.png";
                    }
                  }
                }
                layui2("#current-usb-client-rssi-icon").css("left", "295px");
                layui2("#current-usb-client-rssi-icon").css("top", "40px");
              }
            }
          }
        });
      } else {
        layui2("#current-usb-client-rssi-icon").css("display", "");
        el.src = RESOURCE_URL + "product/usb.png";
        layui2("#current-usb-client-rssi-icon").css("left", "285px");
      }
      el.className = is_dark_theme() ? "layui-img-tint" : "layui-img-tint-light";
      if (current_usb_client != void 0 ? is_hs_keyboard(current_usb_client.device) : false) {
        layui2("#current-usb-client-rssi-icon").css("display", "none");
      }
    }
  }
  function kbd_dks_init() {
    for (let len = 1; len < 5; len++) {
      for (let count = 1; count < 5; count++) {
        var el = "kbd-dks-arrow" + len + "-" + count;
        document.getElementById(el).addEventListener("mousedown", function() {
          var attr = this.getAttribute("keyId");
          S.kbd_dks_dragging_name = attr;
        });
        document.getElementById(el).addEventListener("mouseup", function() {
          S.kbd_dks_dragging_up = true;
        });
      }
    }
  }
  function kbd_ui_refresh_current_client() {
    var layui2 = layui.$;
    var str = layui.i18np;
    if (current_usb_client != void 0) {
      if (S.connect_panel_id >= 0) {
        var layui3 = layui.layer;
        layui3.close(S.connect_panel_id);
        S.connect_panel_id = -1;
      }
      if (S.editing) {
        layui2("#kbd-current-usb-client-panel").css("display", "none");
      } else {
        layui2("#kbd-current-usb-client-panel").css("display", "");
      }
      layui2("#receiver-panel").css("display", "none");
      layui2("#kbd-current-usb-client-panel").css("background-image", is_dark_theme() ? "url(" + RESOURCE_URL + "product/kbd_bg-hover.png)" : "url(" + RESOURCE_URL + "/product/kbd_bg-gray.png)");
      document.getElementById("kbd-current-usb-client-image").src = RESOURCE_URL + "product/" + get_product_id_hex_str(current_usb_client) + "/connected.png";
      layui2("#kbd-current-usb-client-name").html(get_display_name(current_usb_client));
      layui2("#kbd-current-usb-client-firmware").html(str.prop("STRID_HOME_PRODUCT_FIRMWARE") + "&nbsp;" + current_usb_client.device_info.revision);
      if (is_new_firmware_existed(current_usb_client)) {
        layui2("#kbd-current-usb-client-firmware-new").css("display", "");
      } else {
        layui2("#kbd-current-usb-client-firmware-new").css("display", "none");
      }
    } else {
      layui2("#kbd-current-usb-client-panel").css("background-image", "url()");
      document.getElementById("kbd-current-usb-client-image").src = "";
      layui2("#current-usb-client-name").html("");
      layui2("#current-usb-client-name-model").html("");
      layui2("#current-usb-client-firmware").html("");
      var offset = 0;
      DeviceStore.clients.forEach((item) => {
        if (item.helloed) {
          offset++;
        }
      });
      if (offset == 0) {
        layui2("#kbd-current-usb-client-panel").css("display", "none");
        if (S.connect_panel_id >= 0) {
          var layui3 = layui.layer;
          layui3.close(S.connect_panel_id);
          S.connect_panel_id = -1;
        }
      } else {
        layui2("#kbd-current-usb-client-panel").css("display", "");
        layui2("#receiver-panel").css("display", "");
        if (S.connect_panel_id < 0) {
          var layui3 = layui.layer;
          S.connect_panel_id = layui3.open({
            "type": 1,
            "title": false,
            "skin": "layui-layer-panel",
            "shade": false,
            "closeBtn": 0,
            "anim": -1,
            "shadeClose": false,
            "resize": false,
            "scrollbar": false,
            "zIndex": 100,
            "content": layui2("#connect-panel")
          });
        }
      }
      layui2("#kbd-current-usb-client-models").html("");
      layui2("#kbd-current-usb-client-firmware-new").css("display", "none");
    }
    layui2("#kbd-current-usb-client-panel").css("margin-top", (window.innerHeight - 110 - 482 - 100) / 2);
    if (S.editing) {
      ui_refresh_setting(current_usb_client);
      var productHex = get_product_id_hex_str(current_usb_client);
      document.getElementById("kbd-product-name").src = RESOURCE_URL + "product/" + productHex + "/name.png";
      layui2("#kbd-setting-panel").css("display", "");
      layui2("#kbd-setting-onboard-config").css("display", "");
      layui2("#usb-client-channel").css("display", "none");
      S.kbd_key_num = pc_kbd_key_num(current_usb_client);
      S.kbd_keys = pc_kbd_manager_keys(current_usb_client);
      kbd_dks_init();
      kbd_ui_refresh_onboard_config(current_usb_client);
      layui.element.tabChange("kbd-main-setting-type", 0);
    } else {
      layui2("#setting-panel").css("display", "none");
      layui2("#kbd-setting-panel").css("display", "none");
      layui2("#kbd-setting-onboard-config").css("display", "none");
    }
    if (current_usb_client != void 0) {
      if (S.loading_id >= 0) {
        var layui3 = layui.layer;
        layui3.close(S.loading_id);
        S.loading_id = -1;
      }
    }
  }
  function ui_refresh_current_client() {
    var layui2 = layui.$;
    var str = layui.i18np;
    if (current_usb_client != void 0 ? is_hs_keyboard(current_usb_client.device) : false) {
      kbd_ui_refresh_current_client();
      layui2("#current-usb-client-panel").css("display", "none");
      layui2("#receiver-panel").css("display", "none");
      return;
    } else {
      layui2("#kbd-current-usb-client-panel").css("display", "none");
    }
    if (current_usb_client != void 0) {
      if (S.connect_panel_id >= 0) {
        var layui3 = layui.layer;
        layui3.close(S.connect_panel_id);
        S.connect_panel_id = -1;
      }
      if (S.editing) {
        layui2("#current-usb-client-panel").css("display", "none");
        layui2("#receiver-panel").css("display", "none");
      } else {
        layui2("#current-usb-client-panel").css("display", "");
        layui2("#receiver-panel").css("display", "");
      }
      layui2("#current-usb-client-panel").css("background-image", is_dark_theme() ? "url(" + RESOURCE_URL + "product/mouse_bg-hover.png?v=1)" : "url(" + RESOURCE_URL + "/product/mouse_bg-gray.png?v=1)");
      var len = get_color_code(current_usb_client);
      if (len.length > 0) {
        document.getElementById("current-usb-client-image").src = RESOURCE_URL + "product/" + get_product_id_hex_str(current_usb_client) + "/" + len + "/connected.png";
      } else {
        document.getElementById("current-usb-client-image").src = RESOURCE_URL + "product/" + get_product_id_hex_str(current_usb_client) + "/connected.png";
      }
      layui2("#current-usb-client-name").html(get_display_name(current_usb_client));
      layui2("#current-usb-client-name-model").html(get_display_name_model(current_usb_client));
      layui2("#current-usb-client-firmware").html(str.prop("STRID_HOME_PRODUCT_FIRMWARE") + "&nbsp;" + current_usb_client.device_info.revision);
      ui_refresh_current_client_rssi();
      var el = document.getElementById("current-usb-client-battery-icon");
      if (current_usb_client != void 0 ? is_hs_keyboard(current_usb_client.device) : false) {
        layui2("#current-usb-client-battery-icon").css("display", "none");
      } else {
        layui2("#current-usb-client-battery-icon").css("display", "");
      }
      if (current_usb_client.device_info.charging) {
        if (current_usb_client.device_info.battery >= 40) {
          el.src = RESOURCE_URL + "product/charging.png";
        } else if (current_usb_client.device_info.battery >= 30) {
          el.src = RESOURCE_URL + "product/charging_yellow.png";
        } else {
          el.src = RESOURCE_URL + "product/charging_red.png";
        }
      } else {
        if (is_battery_percent_supported(current_usb_client)) {
          if (current_usb_client.device_info.battery >= 40) {
            el.src = RESOURCE_URL + "product/battery.png";
          } else if (current_usb_client.device_info.battery >= 30) {
            el.src = RESOURCE_URL + "product/battery_yellow.png";
          } else {
            el.src = RESOURCE_URL + "product/battery_red.png";
          }
        } else {
          if (current_usb_client.device_info.battery >= 40) {
            el.src = RESOURCE_URL + "product/battery2.png";
          } else if (current_usb_client.device_info.battery >= 30) {
            el.src = RESOURCE_URL + "product/battery_yellow2.png";
          } else {
            el.src = RESOURCE_URL + "product/battery_red2.png";
          }
        }
      }
      if (current_usb_client.device_info.battery >= 40) {
        el.className = is_dark_theme() ? "layui-img-tint" : "layui-img-tint-light";
      } else {
        el.className = "";
      }
      layui2("#current-usb-client-battery").css("color", is_dark_theme() ? "#303030" : "#404040");
      if (is_battery_percent_supported(current_usb_client)) {
        if (current_usb_client.helloed) {
          layui2("#current-usb-client-battery").html(current_usb_client.device_info.battery);
        } else {
          layui2("#current-usb-client-battery").html("---");
        }
      } else {
        layui2("#current-usb-client-battery").html("");
      }
      if (current_usb_client.device_info.charging) {
        layui2("#current-usb-client-battery").css("display", "none");
      } else {
        layui2("#current-usb-client-battery").css("display", "");
      }
      var html2 = "<table><tr>";
      get_color_codes(current_usb_client).forEach((item) => {
        html2 += "<td>";
        html2 += '<a color-code="' + item + '" color-action="select" style="cursor: pointer;">';
        html2 += '<img src="' + RESOURCE_URL + "product/" + get_product_id_hex_str(current_usb_client) + "/" + item + '/preview.png">';
        html2 += "</a>";
        html2 += "</td>";
      });
      html2 += "</tr></table>";
      layui2("#current-usb-client-models").html(html2);
      if (is_new_firmware_existed(current_usb_client)) {
        layui2("#current-usb-client-firmware-new").css("display", "");
      } else {
        layui2("#current-usb-client-firmware-new").css("display", "none");
      }
    } else {
      layui2("#current-usb-client-panel").css("background-image", "url()");
      document.getElementById("current-usb-client-image").src = "";
      layui2("#current-usb-client-name").html("");
      layui2("#current-usb-client-name-model").html("");
      layui2("#current-usb-client-firmware").html("");
      document.getElementById("current-usb-client-rssi-icon").src = "";
      document.getElementById("current-usb-client-battery-icon").src = "";
      layui2("#current-usb-client-battery").css("display", "none");
      var offset = 0;
      DeviceStore.clients.forEach((item2) => {
        if (item2.helloed) {
          offset++;
        }
      });
      if (offset == 0) {
        layui2("#current-usb-client-panel").css("display", "none");
        layui2("#receiver-panel").css("display", "none");
        if (S.connect_panel_id >= 0) {
          var layui3 = layui.layer;
          layui3.close(S.connect_panel_id);
          S.connect_panel_id = -1;
        }
      } else {
        layui2("#current-usb-client-panel").css("display", "");
        layui2("#receiver-panel").css("display", "");
        if (S.connect_panel_id < 0) {
          var layui3 = layui.layer;
          S.connect_panel_id = layui3.open({
            "type": 1,
            "title": false,
            "skin": "layui-layer-panel",
            "shade": false,
            "closeBtn": 0,
            "anim": -1,
            "shadeClose": false,
            "resize": false,
            "scrollbar": false,
            "zIndex": 100,
            "content": layui2("#connect-panel")
          });
        }
      }
      layui2("#current-usb-client-models").html("");
      layui2("#current-usb-client-firmware-new").css("display", "none");
    }
    layui2("#current-usb-client-panel").css("margin-top", (window.innerHeight - 110 - 482 - 100) / 2);
    offset = 0;
    var html2 = "<table><tr>";
    DeviceStore.clients.forEach((client) => {
      if (is_receiver(client) && client.helloed) {
        if (offset > 0) {
          html2 += '<td style="width: 10px;"><td>';
        }
        html2 += "<td>";
        if (current_usb_client != void 0 && current_usb_client.helloed) {
          var esbChannel = current_usb_client.product_esb_ch == 255 ? current_usb_client.device_info.esbChannel : current_usb_client.product_esb_ch;
          if (get_esb_addr_arr(current_usb_client.device_info, esbChannel) == get_esb_addr(client.device_info, esbChannel)) {
            if (is_dark_theme()) {
              html2 += '<img src="' + RESOURCE_URL + 'product/receiver-selected.png" height="17px">';
            } else {
              html2 += '<img src="' + RESOURCE_URL + 'product/receiver-selected.png" height="17px" class="layui-img-tint-light">';
            }
          } else {
            html2 += '<img height="17px">';
          }
        } else {
          html2 += '<img height="17px">';
        }
        html2 += '<p style="font-size: 14px;">' + get_display_name(client) + "</p>";
        html2 += '<a usb-client-id="' + client.id + '" receiver-action="select" style="cursor: pointer;">';
        var i;
        var idx;
        if (is_hub(client)) {
          i = "product/receiver-dh-connected.png";
          idx = "product/receiver-dh-paired.png";
        } else if (get_max_polling_rate(client, DeviceStore.clients) > 1e3) {
          i = "product/receiver-hs-connected.png";
          idx = "product/receiver-hs-paired.png";
        } else {
          i = "product/receiver-connected.png";
          idx = "product/receiver-paired.png";
        }
        var i2;
        if (current_usb_client != void 0 && is_soc_compatible(current_usb_client, client)) {
          i2 = "";
        } else {
          i2 = ' style="opacity: 0.25"';
        }
        if (current_usb_client != void 0 && current_usb_client.helloed) {
          if (is_esb_addr_arr_existed(current_usb_client.device_info, esbChannel, get_esb_addr(client.device_info, esbChannel))) {
            html2 += '<img src="' + RESOURCE_URL + idx + '"' + i2 + ' class="layui-receiver">';
          } else if (is_dark_theme()) {
            html2 += '<img src="' + RESOURCE_URL + i + '"' + i2 + ' class="layui-receiver">';
          } else {
            html2 += '<img src="' + RESOURCE_URL + i + '"' + i2 + ' class="layui-receiver layui-img-tint-light">';
          }
        } else if (is_dark_theme()) {
          html2 += '<img src="' + RESOURCE_URL + i + '"' + i2 + ' class="layui-receiver">';
        } else {
          html2 += '<img src="' + RESOURCE_URL + i + '"' + i2 + ' class="layui-receiver layui-img-tint-light">';
        }
        html2 += "</a>";
        html2 += '<p style="font-size: 14px;">' + str.prop("STRID_HOME_PRODUCT_FIRMWARE") + "&nbsp;" + client.device_info.revision + "</p>";
        if (is_new_firmware_existed(client)) {
          html2 += '<p id="current-usb-client-firmware-new" class="layui-firmware-new" firmware-action="click" data-i18n-title="STRID_HOME_NEW_VER_AVAIL">\xE6\u0153\u2030\xE6\u2013\xB0\xE7\u0161\u201E\xE7\u2030\u02C6\xE6\u0153\xAC\xE5\x8F\xAF\xE7\u201D\xA8</p>';
        }
        html2 += "</td>";
        offset++;
      }
    });
    html2 += "</tr></table>";
    layui2("#receiver-panel").html(html2);
    if (S.editing) {
      ui_refresh_setting(current_usb_client);
      layui2("#setting-panel").css("display", "");
    } else {
      layui2("#setting-panel").css("display", "none");
      layui2("#kbd-setting-panel").css("display", "none");
      layui2("#kbd-setting-onboard-config").css("display", "none");
    }
    if (current_usb_client != void 0) {
      if (S.loading_id >= 0) {
        var layui3 = layui.layer;
        layui3.close(S.loading_id);
        S.loading_id = -1;
      }
    }
  }
  function ui_refresh_client_list() {
    var offset = 0;
    var layui2 = layui.element;
    var layui3 = layui.$;
    var html2;
    if (is_dark_theme()) {
      html2 = '<div class="layui-nav" lay-filter="client-list-filter-nav" style="background-color: #37373A;padding-left: 0px;padding-right: 0px">';
    } else {
      html2 = '<div class="layui-nav layui-bg-gray" lay-filter="client-list-filter-nav" style="padding-left: 0px;padding-right: 0px">';
    }
    DeviceStore.clients.forEach((item) => {
      if (!is_receiver(item) && item.helloed) {
        if (current_usb_client != void 0 && item.id == current_usb_client.id) {
          html2 += '<li class="layui-nav-item layui-this" style="width: 140px">';
        } else {
          html2 += '<li class="layui-nav-item" style="width: 140px">';
        }
        html2 += '<a usb-client-id="' + item.id + '" list-action="select">';
        html2 += '<div style="text-align: center">';
        var len = get_color_code(item);
        if (len.length > 0) {
          html2 += '<img src="' + RESOURCE_URL + "product/" + get_product_id_hex_str(item) + "/" + len + '/connected.png" height="60px">';
        } else if (item != void 0 ? is_hs_keyboard(item.device) : false) {
          html2 += '<div style="height:60px; align-items: center;justify-content: center;">';
          html2 += '<img src="' + RESOURCE_URL + "product/" + get_product_id_hex_str(item) + '/connected.png" style="height: 40px; margin-top:10px;margin-left:-16px">';
          html2 += "</div>";
        } else {
          html2 += '<img src="' + RESOURCE_URL + "product/" + get_product_id_hex_str(item) + '/connected.png" height="60px">';
        }
        html2 += "</div>";
        html2 += '<div style="text-align: center">';
        html2 += get_display_name(item);
        html2 += "</div>";
        html2 += "</a>";
        html2 += "</li>";
        offset++;
      }
    });
    html2 += "</div>";
    if (offset > 1 && !S.editing) {
      layui3("#usb-client-list").html(html2);
    } else {
      layui3("#usb-client-list").html("");
    }
    layui2.render("nav", "client-list-filter-nav");
    offset = 0;
    DeviceStore.clients.forEach((item2) => {
      if (item2.helloed) {
        offset++;
      }
    });
    if (offset <= 0) {
      if (S.pair_panel_id < 0) {
        var layui4 = layui.layer;
        S.pair_panel_id = layui4.open({
          "type": 1,
          "title": false,
          "skin": "layui-layer-panel",
          "shade": 0,
          "closeBtn": 0,
          "anim": -1,
          "shadeClose": false,
          "resize": false,
          "scrollbar": false,
          "zIndex": 100,
          "content": layui3("#pair-panel")
        });
        layui3("#pair-device").css("display", "");
        layui3("#pairing-waiting").css("display", "none");
        layui3("#pairing-tips").css("display", "none");
      }
      layui3("#pair-more").css("display", "none");
    } else {
      if (S.pair_panel_id >= 0) {
        var layui4 = layui.layer;
        layui4.close(S.pair_panel_id);
        S.pair_panel_id = -1;
      }
      layui3("#pair-more").css("display", "");
    }
    if (S.editing) {
      layui3("#logo").css("display", "none");
      layui3("#back-home").css("display", "");
      layui3("#usb-client-channel").css("display", "");
    } else {
      layui3("#logo").css("display", "");
      layui3("#back-home").css("display", "none");
      layui3("#usb-client-channel").css("display", "none");
    }
  }
  function ui_refresh_qual(client) {
    if (client == void 0) {
      return;
    }
    var value = Math.round(client.device_info.squal * 100 / 255);
    $("#surface-quality").text(layui.i18np.prop("STRID_SETTING_SURFACE_QUALITY") + " " + value + "%");
    $("#surface-quality").css("display", value > 0 && get_lods_list(client).length > 1 ? "" : "none");
    $("#surface-quality2").text(layui.i18np.prop("STRID_SETTING_SURFACE_QUALITY") + " " + value + "%");
    $("#surface-quality2").css("display", value > 0 && get_lods_list(client).length <= 1 ? "" : "none");
    var value2 = client.device_info.equal;
    if (value2 == 255) {
      $("#wireless-quality").text("");
    } else {
      value2 = 1e3 - value2;
      var layui2 = layui.i18np.prop("STRID_SETTING_WIRELESS_QUALITY") + " " + value2 / 10 + "%";
      if ((client.device_info.txOutputPower == 0 ? 0 : 1) && !(client.device_info != void 0 && client.device_info.revision != void 0 && client.device_info.revision.substr(0, 2) == "G-") && client.device_info.txOutputPowerApplied < 8) {
        layui2 += "(" + client.device_info.txOutputPowerApplied + ")";
      }
      $("#wireless-quality").text(layui2);
    }
  }

  // src/index.js
  window.shell_cmd_app_browse_file = shell_cmd_app_browse_file;
  initDeviceStoreHandlers();
})();
