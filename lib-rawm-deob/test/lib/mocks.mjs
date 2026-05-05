// Shared mock setup for browser APIs + protocol globals
// Call before loading source modules via indirect eval.

export function setupMocks() {
  globalThis.window = globalThis;
  globalThis.setTimeout = setTimeout;
  globalThis.clearTimeout = clearTimeout;
  globalThis.setInterval = setInterval;
  globalThis.clearInterval = clearInterval;
  globalThis.console = console;
  globalThis.device_cfg = [];

  globalThis.layui = {
    device: function () { return { os: 'Windows' }; },
    i18np: {
      prop: function (key) {
        var map = {
          STRID_NONE: 'None',
          STRID_LEFT: 'Left',
          STRID_RIGHT: 'Right',
          STRID_KEY_LEFT: 'Left',
          STRID_KEY_RIGHT: 'Right',
          STRID_KEY_MIDDLE: 'Middle',
          STRID_KEY_BACK: 'Back',
          STRID_KEY_FORWARD: 'Forward',
          STRID_KEY_WHELL_UP: 'Wheel Up',
          STRID_KEY_WHELL_DOWN: 'Wheel Down',
          STRID_KEY_WHELL_LEFT: 'Wheel Left',
          STRID_KEY_WHELL_RIGHT: 'Wheel Right',
          STRID_KEY_SPACE: 'Space',
          STRID_KEY_ARROW_UP: '\u2191',
          STRID_KEY_ARROW_DOWN: '\u2193',
          STRID_KEY_ARROW_LEFT: '\u2190',
          STRID_KEY_ARROW_RIGHT: '\u2192',
          STRID_KEY_MOUSE_MOVE: 'Mouse Move',
          STRID_KEY_MOUSE_POSITION: 'Mouse Position',
          STRID_KEY_MEDIA_MUTE: 'Mute',
          STRID_KEY_MEDIA_VOLUME_UP: 'Volume Up',
          STRID_KEY_MEDIA_VOLUME_DOWN: 'Volume Down',
          STRID_KEY_MEDIA_PLAY_PAUSE: 'Play/Pause',
          STRID_KEY_MEDIA_STOP: 'Stop',
          STRID_KEY_MEDIA_PREVIOUS_TRACK: 'Previous Track',
          STRID_KEY_MEDIA_NEXT_TRACK: 'Next Track',
          STRID_KEY_MEDIA_MAIL: 'Mail',
          STRID_KEY_MEDIA_CALCULATOR: 'Calculator',
          STRID_KEY_MEDIA_MY_COMPUTER: 'My Computer',
          STRID_KEY_MEDIA_WWW_SEARCH: 'Search',
          STRID_KEY_MEDIA_WWW_HOME: 'Home',
          STRID_KEY_MEDIA_WWW_REFRESH: 'Refresh',
          STRID_KEY_MEDIA_WWW_STOP: 'Stop',
          STRID_KEY_MEDIA_WWW_FORWARD: 'Forward',
          STRID_KEY_MEDIA_WWW_BACK: 'Back',
          STRID_KBD_KEY_RGB_TOG: 'RGB Toggle',
          STRID_KBD_KEY_RGB_MODE_FORWARD: 'RGB Mode Forward',
          STRID_KBD_KEY_RGB_MODE_REVERSE: 'RGB Mode Reverse',
          STRID_KBD_KEY_RGB_VAI: 'RGB Brightness Up',
          STRID_KBD_KEY_RGB_VAD: 'RGB Brightness Down',
          STRID_KBD_KEY_RGB_SPI: 'RGB Speed Up',
          STRID_KBD_KEY_RGB_SPD: 'RGB Speed Down',
          STRID_KBD_KEY_MEDIA: 'Media',
          STRID_KBD_KEY_MEDIA_PLAY_PAUSE: 'Play/Pause',
          STRID_KBD_KEY_MEDIA_NEXT_TRACK: 'Next Track',
          STRID_KBD_KEY_MEDIA_PREV_TRACK: 'Prev Track',
          STRID_KBD_KEY_AUDIO_MUTE: 'Audio Mute',
          STRID_KBD_KEY_AUDIO_VOL_UP: 'Vol Up',
          STRID_KBD_KEY_AUDIO_VOL_DOWN: 'Vol Down',
          STRID_KBD_KEY_SYSTEM_POWER: 'Power',
          STRID_KBD_KEY_SYSTEM_SLEEP: 'Sleep',
          STRID_KBD_KEY_SYSTEM_WAKE: 'Wake',
          STRID_KBD_KEY_MY_COMPUTER: 'My PC',
          STRID_KBD_KEY_CALCULATOR: 'Calc',
          STRID_KBD_KEY_MAIL: 'Mail',
        };
        return map[key] || key;
      }
    },
  };
}

export function clearState() {
  // Clear globals that source modules may have created
  var globals = [
    'DeviceStore', 'usb_client_list', 'current_usb_client',
    'modifiers', 'keys', 'macro_keys', 'kbd_5_15_keys', 'kbd_5_14_keys',
    'kbd_select_keys', 'mouse_select_keys', 'kbd_all_keys',
    'kbd_rgb_keys', 'kbd_windows_keys', 'kbd_media_keys', 'kbd_macro_keys',
    'PacketBuilder', 'PacketReader', 'BinaryReader',
    'DEVICE_DB', 'KEY_DB',
    'timeoutID', 'upload_mouse_config_timer', 'mouse_config_timer',
    '_deviceClients', '__SUITE__',
    // All constants from constants.js (these don't need clearing since they're const,
    // but clearing them prevents state leakage between test files)
  ];

  for (var name of globals) {
    delete globalThis[name];
  }
}
