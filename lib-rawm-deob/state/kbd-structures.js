import { keys } from '../state/key-lookup.js';
// ===== KEYBOARD DATA STRUCTURE FACTORY FUNCTIONS =============================
// Pure constructors and cloners for keyboard config data structures.
// No side effects, no global state — these are just object factories.
// Extracted from 04-kbd-structures.js during Phase 7 refactoring.
// ============================================================================

export function kbd_create_key_light_info(client, value, hue, sat) {
  var keyLightInfo = {
    row: client,
    col: value,
    hue: hue,
    sat: sat
  };
  return keyLightInfo;
}

export function kbd_create_light_box_info() {
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

export function kbd_clone_light_box_info(client) {
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

export function kbd_create_light_info() {
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

export function kbd_clone_light_info(client) {
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

export function kbd_create_axis_info() {
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

export function kbd_clone_axis_info(client) {
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

export function kbd_create_socd_info() {
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

export function kbd_clone_socd_info(client) {
  var obj = kbd_create_socd_info();
  obj.id = client.id;
  obj.row1 = client.row1;
  obj.col1 = client.col1;
  obj.row2 = client.row2;
  obj.col2 = client.col2;
  obj.socd_mode = client.socd_mode;
  return obj;
}

export function kbd_create_mt_info() {
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

export function kbd_clone_mt_info(client) {
  var obj = kbd_create_mt_info();
  obj.id = client.id;
  obj.row = client.row;
  obj.col = client.col;
  obj.tap_time = client.tap_time;
  obj.keyCode1 = client.keyCode1;
  obj.keyCode2 = client.keyCode2;
  return obj;
}

export function kbd_create_rs_info() {
  var rsInfo = {
    id: -0x1,
    row1: -0x1,
    col1: -0x1,
    row2: -0x1,
    col2: -0x1
  };
  return rsInfo;
}

export function kbd_clone_rs_info(client) {
  var obj = kbd_create_rs_info();
  obj.id = client.id;
  obj.row1 = client.row1;
  obj.col1 = client.col1;
  obj.row2 = client.row2;
  obj.col2 = client.col2;
  return obj;
}

export function kbd_create_dks_info() {
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

export function kbd_clone_dks_info(client) {
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
