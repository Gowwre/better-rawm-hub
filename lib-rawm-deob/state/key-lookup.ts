import { KEY_DB } from '../data/key-database.js';
import { is_keyboard_5_15 } from '../data/device-database.js';

export var modifiers: any[] = [];
export var keys: any[] = [];
export var macro_keys: any[] = [];
export var kbd_5_15_keys: any[] = [];
export var kbd_5_14_keys: any[] = [];
export var kbd_select_keys: any[] = [];
export var mouse_select_keys: any[] = [];
export var kbd_all_keys: any[] = [];
export var kbd_rgb_keys: any[] = [];
export var kbd_windows_keys: any[] = [];
export var kbd_media_keys: any[] = [];
export var kbd_macro_keys: any[] = [];

export function create_pc_key_info(type: any, vCode: any, name: any, aCode: any, aName: any, sCode: any) {
  return { type, vCode, name, aCode, aName, sCode };
}

export function kbd_create_pc_key_info(type: any, vCode: any, name: any, aCode: any, aName: any, sCode: any, keyId: any, row: any, col: any, rect: any) {
  return { type, vCode, name, aCode, aName, sCode, keyId, row, col, rect };
}

export function create_pc_select_key_info(keyType: any, value: any, keyName: any, altCode: any, altName: any, scanCode: any, keyId: any, rect: any) {
  return { type: keyType, vCode: value, name: keyName, aCode: altCode, aName: altName, sCode: scanCode, keyId, rect };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function kbd_clone_pc_key_info(client: any) {
  return { ...client };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function resolve_name(spec: any): string {
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

export function pc_key_manager_init() {
  function build(entries: any[], factory: (...args: any[]) => any) {
    return entries.map(function (d: any) {
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
    }).filter(function (item: any) { return item; });
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function findFirst(arr: any[], predicate: (item: any) => boolean, extract: (item: any) => any, defaultValue: any) {
  var result = defaultValue;
  arr.forEach(function (item: any) {
    if (predicate(item)) result = extract(item);
  });
  return result;
}

export function get_key_name_from_keyid(keyId: any) {
  return findFirst(kbd_all_keys, item => item.keyId == keyId, item => item.name, "");
}

export function get_key_code_from_keyid(keyId: any) {
  return findFirst(kbd_all_keys, item => item.keyId == keyId, item => item.vCode, 0);
}

export function get_keyid_from_code(keyCode: any) {
  return findFirst(kbd_all_keys, item => item.vCode == keyCode, item => item.keyId, 0);
}

export function get_scan_code(keyId: any) {
  return findFirst(macro_keys, item => item.vCode == keyId, item => item.sCode, 0);
}

export function get_vk_code(keyId: any) {
  return findFirst(macro_keys, item => item.sCode == keyId, item => item.vCode, 0);
}

export function get_key_name_from_code(keyCode: any) {
  return findFirst(macro_keys, item => item.vCode == keyCode, item => item.name, layui.i18np.prop("STRID_NONE"));
}

export function get_key_code_from_name(keyName: any) {
  return findFirst(macro_keys, item => item.name == keyName, item => item.vCode, 0);
}

export function get_modifier_name_from_code(modifierCode: any) {
  return findFirst(modifiers, item => item.vCode == modifierCode, item => item.name, layui.i18np.prop("STRID_NONE"));
}

export function get_modifier_code_from_name(modifierName: any) {
  return findFirst(modifiers, item => item.name == modifierName, item => item.vCode, 0);
}

export function pc_key_manager_modifiers() { return modifiers; }
export function pc_key_manager_keys() { return keys; }
export function pc_key_manager_macro_keys() { return macro_keys; }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function pc_kbd_manager_keys(client: any) {
  return is_keyboard_5_15(client.device) ? kbd_5_15_keys : kbd_5_14_keys;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function pc_kbd_key_num(client: any) {
  return is_keyboard_5_15(client.device) ? 0x4b : 0x46;
}

export function pc_kbd_select_keys() { return kbd_select_keys; }
export function pc_mouse_select_keys() { return mouse_select_keys; }
export function pc_kbd_rgb_keys() { return kbd_rgb_keys; }
export function pc_kbd_media_keys() { return kbd_media_keys; }
export function pc_kbd_windows_keys() { return kbd_windows_keys; }
