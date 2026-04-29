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
