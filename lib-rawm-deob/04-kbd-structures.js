
// ===== KEYBOARD DATA STRUCTURES & HID PROTOCOL LAYER ========================
// These global lists act as staging buffers during keyboard-config sync.
// kbd_data_sync_index is a bitmask tracking which data set is being synced:
//   bit 0 — keycode data
//   bit 1 — light data
//   bit 2 — axis data
//   bit 3 — SOCD/MT/RS/DKS data
//
// The kbd_*info_list arrays buffer chunks received from the firmware
// via the HS (high‑speed) protocol, which sends data in 0x1c‑byte chunks.
// Once all chunks arrive, the data is copied into the client's device_info
// and the UI is refreshed.

let kbd_data_sync_index = 0x0;
let kbd_keyinfo_list = [];
let kbd_axisinfo_list = [];
let kbd_socdinfo_list = [];
let kbd_mtinfo_list = [];
let kbd_rsinfo_list = [];
let kbd_dksinfo_list = [];
let kbd_lightinfo_list = [];
let kbd_macroinfo_list = [];
let kbd_macro_index = 0x0;
var macroBuff = [];
function kbd_create_key_light_info(_0x3e43bf, _0xa6b89f, _0x5eeeae, _0x232ad5) {
  var _0x168dd7 = {
    row: _0x3e43bf,
    col: _0xa6b89f,
    hue: _0x5eeeae,
    sat: _0x232ad5
  };
  return _0x168dd7;
}
function kbd_create_light_box_info() {
  var _0x5e380a = {
    mode: 0x1,
    r: 0x0,
    g: 0xff,
    b: 0x0,
    speed: 0x32,
    brightness: 0x64,
    colored: 0x1
  };
  return _0x5e380a;
}
function kbd_clone_light_box_info(_0x266c0a) {
  var _0x58e04a = kbd_create_light_box_info();
  _0x58e04a.mode = _0x266c0a.mode;
  _0x58e04a.r = _0x266c0a.r;
  _0x58e04a.g = _0x266c0a.g;
  _0x58e04a.b = _0x266c0a.b;
  _0x58e04a.speed = _0x266c0a.speed;
  _0x58e04a.brightness = _0x266c0a.brightness;
  _0x58e04a.colored = _0x266c0a.colored;
  return _0x58e04a;
}
function kbd_create_light_info() {
  var _0x4a827b = {
    keys: [],
    mode: 0xd,
    hue: 0xff,
    sat: 0xff,
    speed: 0x32,
    brightness: 0x64,
    sleep_time: 0x0,
    light_box_info: kbd_create_light_box_info()
  };
  return _0x4a827b;
}
function kbd_clone_light_info(_0x514851) {
  var _0x4771e1 = kbd_create_light_info();
  _0x4771e1.keys = _0x514851.keys.slice();
  _0x4771e1.mode = _0x514851.mode;
  _0x4771e1.hue = _0x514851.hue;
  _0x4771e1.sat = _0x514851.sat;
  _0x4771e1.speed = _0x514851.speed;
  _0x4771e1.brightness = _0x514851.brightness;
  _0x4771e1.sleep_time = _0x514851.sleep_time;
  _0x4771e1.light_box_info = kbd_clone_light_box_info(_0x514851.light_box_info);
  return _0x4771e1;
}
function kbd_create_axis_info() {
  var _0x57142a = {
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
  return _0x57142a;
}
function kbd_clone_axis_info(_0x5a8e33) {
  var _0x3fa98c = kbd_create_axis_info();
  _0x3fa98c.row = _0x5a8e33.row;
  _0x3fa98c.col = _0x5a8e33.col;
  _0x3fa98c.switch_type = _0x5a8e33.switch_type;
  _0x3fa98c.apc_lv = _0x5a8e33.apc_lv;
  _0x3fa98c.rt_enable = _0x5a8e33.rt_enable;
  _0x3fa98c.rt_press_lv = _0x5a8e33.rt_press_lv;
  _0x3fa98c.rt_release_lv = _0x5a8e33.rt_release_lv;
  _0x3fa98c.top_dz = _0x5a8e33.top_dz;
  _0x3fa98c.btm_dz = _0x5a8e33.btm_dz;
  return _0x3fa98c;
}
function kbd_create_socd_info() {
  var _0x137966 = {
    id: -0x1,
    row1: -0x1,
    col1: -0x1,
    row2: -0x1,
    col2: -0x1,
    socd_mode: 0x0
  };
  return _0x137966;
}
function kbd_clone_socd_info(_0x2e7131) {
  var _0x1f2ef3 = kbd_create_socd_info();
  _0x1f2ef3.id = _0x2e7131.id;
  _0x1f2ef3.row1 = _0x2e7131.row1;
  _0x1f2ef3.col1 = _0x2e7131.col1;
  _0x1f2ef3.row2 = _0x2e7131.row2;
  _0x1f2ef3.col2 = _0x2e7131.col2;
  _0x1f2ef3.socd_mode = _0x2e7131.socd_mode;
  return _0x1f2ef3;
}
function kbd_create_mt_info() {
  var _0x51e52a = {
    id: -0x1,
    row: -0x1,
    col: -0x1,
    tap_time: 0xc8,
    keyCode1: 0x0,
    keyCode2: 0x0
  };
  return _0x51e52a;
}
function kbd_clone_mt_info(_0x4eacd2) {
  var _0x53590c = kbd_create_mt_info();
  _0x53590c.id = _0x4eacd2.id;
  _0x53590c.row = _0x4eacd2.row;
  _0x53590c.col = _0x4eacd2.col;
  _0x53590c.tap_time = _0x4eacd2.tap_time;
  _0x53590c.keyCode1 = _0x4eacd2.keyCode1;
  _0x53590c.keyCode2 = _0x4eacd2.keyCode2;
  return _0x53590c;
}
function kbd_create_rs_info() {
  var _0x474c5f = {
    id: -0x1,
    row1: -0x1,
    col1: -0x1,
    row2: -0x1,
    col2: -0x1
  };
  return _0x474c5f;
}
function kbd_clone_rs_info(_0x20c24d) {
  var _0x448538 = kbd_create_rs_info();
  _0x448538.id = _0x20c24d.id;
  _0x448538.row1 = _0x20c24d.row1;
  _0x448538.col1 = _0x20c24d.col1;
  _0x448538.row2 = _0x20c24d.row2;
  _0x448538.col2 = _0x20c24d.col2;
  return _0x448538;
}
function kbd_create_dks_info() {
  var _0x21f9bc = {
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
  return _0x21f9bc;
}
function kbd_clone_dks_info(_0x38390a) {
  var _0x4f0da9 = kbd_create_dks_info();
  _0x4f0da9.id = _0x38390a.id;
  _0x4f0da9.row = _0x38390a.row;
  _0x4f0da9.col = _0x38390a.col;
  _0x4f0da9.keyCode1 = _0x38390a.keyCode1;
  _0x4f0da9.state1 = _0x38390a.state1;
  _0x4f0da9.keyCode2 = _0x38390a.keyCode2;
  _0x4f0da9.state2 = _0x38390a.state2;
  _0x4f0da9.keyCode3 = _0x38390a.keyCode3;
  _0x4f0da9.state3 = _0x38390a.state3;
  _0x4f0da9.keyCode4 = _0x38390a.keyCode4;
  _0x4f0da9.state4 = _0x38390a.state4;
  return _0x4f0da9;
}
function is_keyboard_5_15(_0x370ce4) {
  if (_0x370ce4.productName == "Z68A") {
    return true;
  }
  return false;
}
function is_hs_keyboard(_0x2da46d) {
  if (_0x2da46d.productName == 'Z68A' || _0x2da46d.productName == "Z60") {
    return true;
  }
  return false;
}
function kbd_get_onboard_num(_0x2a3bec) {
  return _0x2a3bec.device_info.kbd_onboardNum;
}
function kbd_get_key_infos(_0x1bae4a) {
  return _0x1bae4a.device_info.kbd_key_infos;
}
function kbd_get_light_info(_0x29e871) {
  return _0x29e871.device_info.kbd_light_info;
}
function kbd_get_axis_infos(_0xd99dc) {
  return _0xd99dc.device_info.kbd_axis_infos;
}
function kbd_get_axis_mode(_0x402b6d) {
  return _0x402b6d.device_info.kbd_axis_mode;
}
function kbd_get_socd_infos(_0x3602de) {
  return _0x3602de.device_info.kbd_socd_infos;
}
function kbd_get_mt_infos(_0x1c1065) {
  return _0x1c1065.device_info.kbd_mt_infos;
}
function kbd_get_rs_infos(_0x1b7ebd) {
  return _0x1b7ebd.device_info.kbd_rs_infos;
}
function kbd_get_dks_infos(_0x145465) {
  return _0x145465.device_info.kbd_dks_infos;
}
function kbd_get_macro_infos(_0x4ccc84) {
  return _0x4ccc84.device_info.kbd_macro_infos;
}
function kbd_get_macro_num(_0xa08577) {
  return _0xa08577.device_info.kbd_macro_num;
}
function kbd_get_macro_max_size(_0x4fb60d) {
  return _0x4fb60d.device_info.kbd_macro_max_size;
}

// ===== HS (HIGH‑SPEED KEYBOARD) PROTOCOL FUNCTIONS ==========================
// These functions implement the RAWM HS keyboard binary protocol. Commands
// are sent via send_event() (which appends to the client's send buffer) and
// trigger a send_client_data() call. The firmware responds with 0x20‑byte
// frames that hs_parse_cmd() decodes via a large switch on the first byte.
//
// Key command IDs (first byte of the frame):
//   0xf5 — firmware version / hello
//   0x12 — get keycode buffer (chunked)
//   0x5  — set single keycode
//   0x8  — get light parameter
//   0x7  — set light parameter
//   0x36 — get light‑define buffer (chunked)
//   0x37 — set single light‑define
//   0x1a — get axis info (chunked)
//   0x19 — set axis info
//   0x1e/0x1f — SOCD get/set num
//   0x20/0x21 — SOCD get/set data
//   0x22/0x23 — MT get/set num
//   0x24/0x25 — MT get/set data
//   0x2e/0x2f — RS get/set num
//   0x30/0x31 — RS get/set data
//   0x2a/0x2b — DKS get/set num
//   0x2c/0x2d — DKS get/set data
//   0xe/0xf  — macro buffer get/set
//   0xc/0xd  — macro num / buffer size
//   0x10     — reset macro buffer
//   0x39/0x40 — get/set onboard index
//   0x45/0x46 — get/set axis mode
// ============================================================================
