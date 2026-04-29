
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
function kbd_create_key_light_info(client, value, hue, sat) {
  var keyLightInfo = {
    row: client,
    col: value,
    hue: hue,
    sat: sat
  };
  return keyLightInfo;
}
function kbd_create_light_box_info() {
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
    id: -0x1,
    row1: -0x1,
    col1: -0x1,
    row2: -0x1,
    col2: -0x1,
    socd_mode: 0x0
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
    id: -0x1,
    row: -0x1,
    col: -0x1,
    tap_time: 0xc8,
    keyCode1: 0x0,
    keyCode2: 0x0
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
    id: -0x1,
    row1: -0x1,
    col1: -0x1,
    row2: -0x1,
    col2: -0x1
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
function is_keyboard_5_15(device) {
  if (device.productName == "Z68A") {
    return true;
  }
  return false;
}
function is_hs_keyboard(device) {
  if (device.productName == 'Z68A' || device.productName == "Z60") {
    return true;
  }
  return false;
}
function kbd_get_onboard_num(client) {
  return client.device_info.kbd_onboardNum;
}
function kbd_get_key_infos(client) {
  return client.device_info.kbd_key_infos;
}
function kbd_get_light_info(client) {
  return client.device_info.kbd_light_info;
}
function kbd_get_axis_infos(client) {
  return client.device_info.kbd_axis_infos;
}
function kbd_get_axis_mode(client) {
  return client.device_info.kbd_axis_mode;
}
function kbd_get_socd_infos(client) {
  return client.device_info.kbd_socd_infos;
}
function kbd_get_mt_infos(client) {
  return client.device_info.kbd_mt_infos;
}
function kbd_get_rs_infos(client) {
  return client.device_info.kbd_rs_infos;
}
function kbd_get_dks_infos(client) {
  return client.device_info.kbd_dks_infos;
}
function kbd_get_macro_infos(client) {
  return client.device_info.kbd_macro_infos;
}
function kbd_get_macro_num(client) {
  return client.device_info.kbd_macro_num;
}
function kbd_get_macro_max_size(client) {
  return client.device_info.kbd_macro_max_size;
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
