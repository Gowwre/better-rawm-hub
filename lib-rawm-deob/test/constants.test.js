// ===== CONSTANTS TEST SUITE ====================================================
// Tests that all named constants are valid, unique, and have expected values.
// Load after: data/constants.js (provides all CMD_*, PARAM_*, PID_*, etc.)

__SUITE__ = {
  name: 'constants',

  'HS command IDs are in valid range 0x00-0xff'() {
    var cmds = [
      CMD_FIRMWARE_VERSION, CMD_GET_KEYCODE_BUF, CMD_SET_KEYCODE,
      CMD_GET_LIGHT, CMD_SET_LIGHT, CMD_GET_LIGHT_DEFINE_BUF, CMD_SET_LIGHT_DEFINE,
      CMD_GET_AXIS_INFO, CMD_SET_AXIS_INFO, CMD_GET_ONBOARD_INDEX, CMD_SET_ONBOARD_INDEX,
      CMD_GET_LIGHT_BOX, CMD_SET_LIGHT_BOX, CMD_GET_LIGHT_SLEEP, CMD_SET_LIGHT_SLEEP,
      CMD_GET_AXIS_MODE, CMD_SET_AXIS_MODE, CMD_CUSTOM_DATA_SAVE, CMD_KEYCODE_FACTORY_RESET,
      CMD_HS_FACTORY_RESET, CMD_SOCD_GET_NUM, CMD_SOCD_SET_NUM, CMD_SOCD_GET_DATA,
      CMD_SOCD_SET_DATA, CMD_MT_GET_NUM, CMD_MT_SET_NUM, CMD_MT_GET_DATA, CMD_MT_SET_DATA,
      CMD_RS_GET_NUM, CMD_RS_SET_NUM, CMD_RS_GET_DATA, CMD_RS_SET_DATA,
      CMD_DKS_GET_NUM, CMD_DKS_SET_NUM, CMD_DKS_GET_DATA, CMD_DKS_SET_DATA,
      CMD_MACRO_GET, CMD_MACRO_SET, CMD_MACRO_NUM, CMD_MACRO_SIZE, CMD_MACRO_RESET,
    ];
    for (var i = 0; i < cmds.length; i++) {
      if (cmds[i] < 0 || cmds[i] > 0xff || (cmds[i] & 0) !== 0) {
        throw new Error('CMD constant out of range: ' + cmds[i]);
      }
    }
  },

  'product IDs are unique'() {
    var pids = [
      PID_KNIFE, PID_ML01, PID_RECEIVER, PID_RECEIVER_8K,
      PID_MH01, PID_SL01, PID_SH01, PID_GS_SH01,
      PID_ER21, PID_ES21, PID_ES21PRO, PID_ER21M,
      PID_ER21PRO, PID_ER21PRO_B, PID_ES21M, PID_MH01PRO, PID_SH01PRO,
      PID_233a, PID_233e, PID_233f, PID_2340, PID_2343, PID_2344, PID_2349, PID_234a, PID_2352,
    ];
    var seen = {};
    for (var i = 0; i < pids.length; i++) {
      if (seen[pids[i]]) {
        throw new Error('Duplicate PID: 0x' + pids[i].toString(16));
      }
      seen[pids[i]] = true;
    }
  },

  'HID_REPORT_SIZE is 0x40'() {
    if (HID_REPORT_SIZE !== 0x40) {
      throw new Error('HID_REPORT_SIZE expected 0x40, got 0x' + HID_REPORT_SIZE.toString(16));
    }
  },

  'buffer/size constants match documented values'() {
    var checks = {
      HS_FRAME_SIZE: [0x20, HS_FRAME_SIZE],
      HS_CHUNK_MAX: [0x1c, HS_CHUNK_MAX],
      HID_LENGTH_MASK: [0x3f, HID_LENGTH_MASK],
      ESB_ALIVE_TIMEOUT_MS: [0xbb8, ESB_ALIVE_TIMEOUT_MS],
      SYNC_TIMEOUT_MS: [0x3e8, SYNC_TIMEOUT_MS],
      CONFIG_TIMEOUT_MS: [0x7d0, CONFIG_TIMEOUT_MS],
      HID_SEND_DEBOUNCE_MS: [0x19, HID_SEND_DEBOUNCE_MS],
      POLLING_RATE_MAX_HZ: [0x1f40, POLLING_RATE_MAX_HZ],
      CPI_STEP_DEFAULT: [0x1, CPI_STEP_DEFAULT],
      BATTERY_FULL_PERCENT: [0x64, BATTERY_FULL_PERCENT],
      API_VERSION: [0x9, API_VERSION],
      SLEEP_MAX_SEC: [0x708, SLEEP_MAX_SEC],
      RESOLUTION_DEFAULT: [0x640, RESOLUTION_DEFAULT],
    };
    var keys = Object.keys(checks);
    for (var i = 0; i < keys.length; i++) {
      var check = checks[keys[i]];
      if (check[1] !== check[0]) {
        throw new Error(keys[i] + ' expected 0x' + check[0].toString(16) + ' got 0x' + check[1].toString(16));
      }
    }
  },

  'bitwise masks are non-zero and distinct'() {
    var masks = [MASK_LOW_NIBBLE, MASK_HIGH_NIBBLE, MASK_BYTE, MASK_HIGH_BIT,
                 MASK_LOW_7BITS, MASK_TOP_2BITS, MASK_BOTTOM_6BITS, MASK_12BIT];
    var seen = {};
    for (var i = 0; i < masks.length; i++) {
      if (masks[i] === 0) {
        throw new Error('Mask #' + i + ' is zero: ' + masks[i]);
      }
      if (seen[masks[i]]) {
        throw new Error('Duplicate mask: 0x' + masks[i].toString(16));
      }
      seen[masks[i]] = true;
    }
  },

  'mouse event constants have expected values'() {
    if (MOUSE_EVENT_KEY_DOWN !== 0x100) throw new Error('MOUSE_EVENT_KEY_DOWN');
    if (MOUSE_EVENT_KEY_UP !== 0x101) throw new Error('MOUSE_EVENT_KEY_UP');
    if (MOUSE_EVENT_MOVE !== 0x200) throw new Error('MOUSE_EVENT_MOVE');
    if (MOUSE_EVENT_WHEEL_VERT !== 0x20a) throw new Error('MOUSE_EVENT_WHEEL_VERT');
    if (MOUSE_EVENT_WHEEL_HORZ !== 0x20e) throw new Error('MOUSE_EVENT_WHEEL_HORZ');
    if (MOUSE_EVENT_POSITION !== 0x2ff) throw new Error('MOUSE_EVENT_POSITION');
  },

  'macro style constants are sequential 0-6'() {
    var styles = [MACRO_STYLE_PRESS, MACRO_STYLE_RELEASE, MACRO_STYLE_TOGGLE,
                  MACRO_STYLE_LONG_PRESS, MACRO_STYLE_LONG_TOGGLE, MACRO_STYLE_LONG_RELEASE,
                  MACRO_STYLE_TOGGLE_LOOP];
    for (var i = 0; i < styles.length; i++) {
      if (styles[i] !== i) {
        throw new Error('MACRO_STYLE_[' + i + '] expected ' + i + ' got ' + styles[i]);
      }
    }
  },

  'CPI level defaults match documented values'() {
    if (CPI_LEVEL_DEFAULTS.length !== 8) {
      throw new Error('CPI_LEVEL_DEFAULTS length expected 8, got ' + CPI_LEVEL_DEFAULTS.length);
    }
    if (CPI_LEVEL_DEFAULTS[0] !== 0x190) throw new Error('CPI default 0 expected 0x190');
    if (CPI_LEVEL_DEFAULTS[2] !== 0x640) throw new Error('CPI default 2 expected 0x640');
    if (CPI_LEVEL_DEFAULTS[3] !== 0xc80) throw new Error('CPI default 3 expected 0xc80');
  },

  'language constants are sequential 0-5'() {
    var langs = [LANG_ZH_CN, LANG_EN_US, LANG_ZH_TW, LANG_KO_KR, LANG_JA_JP, LANG_UK_UA, LANG_TR_TR];
    for (var i = 0; i < langs.length; i++) {
      if (langs[i] !== i) {
        throw new Error('LANG_[' + i + '] expected ' + i + ' got ' + langs[i]);
      }
    }
  },
};
