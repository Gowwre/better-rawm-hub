import { S } from '../protocol/parse-cmd-ui.js';

export function setting_mapping_macro_recording_remove_last() {
  if (S.edit_macros.length > 0x0) {
    var value = S.edit_macros[S.edit_macros.length - 0x1];
    if (value.mouse_key_code == 256 && value.mouse_key_event == 0x100) {
      S.edit_macros = S.edit_macros.slice(0x0, S.edit_macros.length - 0x1);
      if (S.edit_macros.length > 0x0) {
        S.edit_macros[S.edit_macros.length - 0x1].mouse_key_time = 0x1;
      }
    }
  }
}

export function rgbToHsv(r: number, g: number, b: number) {
  let value = r / 0xff;
  let value2 = g / 0xff;
  let value3 = b / 0xff;
  let hsvH = 0;
  let hsvS = 0;
  let hsvV = 0;
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

export function hsvToRgb(r: number, g: number, b: number) {
  let value = r * 360 / 0xff;
  let value2 = g / 0xff;
  let value3 = b / 0xff;
  let rgbR = 0;
  let rgbG = 0;
  let rgbB = 0;
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

export function rgbToHex(r: number, g: number, b: number) {
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

export function show_waiting() {
  $("#kbd-key-waiting-panel").css("display", '');
}

export function hide_waiting() {
  $("#kbd-key-waiting-panel").css('display', "none");
}
