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
      hsvH = 0x3c * ((value2 - value3) / value6 / 0x6);
    } else {
      if (value4 == value2) {
        hsvH = 0x3c * ((value3 - value) / value6 + 0x2);
      } else if (value4 == value3) {
        hsvH = 0x3c * ((value - value2) / value6 + 0x4);
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
    hsvH = 0x168 + hsvH;
  }
  return {
    'h': Math.floor(hsvH * 0xff / 0x168),
    's': Math.floor(0xff * hsvS),
    'v': Math.floor(0xff * hsvV)
  };
}
function hsvToRgb(r, g, b) {
  let value = r * 0x168 / 0xff;
  let value2 = g / 0xff;
  let value3 = b / 0xff;
  let rgbR;
  let rgbG;
  let rgbB;
  let value4 = value3 * value2;
  let value5 = value / 0x3c / 0x6;
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
