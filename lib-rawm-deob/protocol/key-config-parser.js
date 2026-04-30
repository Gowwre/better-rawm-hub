function create_key_info() {
  var keyInfo = {
    cmd: 0x3,
    name: '',
    label: '',
    configType: 0x0
  };
  keyInfo.x = 0x0;
  keyInfo.y = 0x0;
  keyInfo.touch_style = 0x0;
  keyInfo.touch_firearms = 0x0;
  keyInfo.touch_continue_count = 0x4b;
  keyInfo.slide_range = 0x3f;
  keyInfo.slide_time = 0x10;
  keyInfo.slide_delay = 0x0;
  keyInfo.fps_style = 0x0;
  keyInfo.fps_shoot_mode = 0x0;
  keyInfo.fps_shoot_count = 0x2;
  keyInfo.joystick_radius = 0x64;
  keyInfo.joystick_timeout = 0x0;
  keyInfo.joystick_radiusTo0 = 0x0;
  keyInfo.joystick_switch_percent = 0x85;
  keyInfo.joystick_switch_mode = 0x0;
  keyInfo.joystick_navigate_mode = 0x0;
  keyInfo.joystick_mouse_ani = 0x1;
  keyInfo.moba_radius = 0x3f;
  keyInfo.wheel_senstivity = 0xa;
  keyInfo.wheel_endKey = 0x0;
  keyInfo.mouse_lock_unlock = 0x0;
  keyInfo.mouse_lock_unlock_delay = 0x64;
  keyInfo.mouse_lock_unlock_call = 0x0;
  keyInfo.mouse_lock_again = 0x0;
  keyInfo.mouse_lock_again_delay = 0xc8;
  keyInfo.mouse_push_joystick_again = 0x0;
  keyInfo.mouse_push_joystick_again_delay = 0xc8;
  keyInfo.mouse_vision_senstivity = 0xa;
  keyInfo.mouse_pointer_senstivity = 0xf;
  keyInfo.mouse_horizontal_senstivity = 0x5;
  keyInfo.mouse_vertical_senstivity = 0x1;
  keyInfo.mouse_release_delay = 0x0;
  keyInfo.mouse_radius = 0x3c;
  keyInfo.mouse_followed_left = 0x1;
  keyInfo.mouse_followed_right = 0x1;
  keyInfo.mouse_targeted_percent = 0x1e;
  keyInfo.mouse_targeted_trigger = 0x0;
  keyInfo.mouse_right_drop = 0x0;
  keyInfo.mouse_mapping_keys = "[0,0,0]";
  keyInfo.mouse_mapping_key_data = 0x1;
  keyInfo.mouse_intensity_toggle_key = '';
  keyInfo.mouse_intensity_toggle_light = 0x1;
  keyInfo.mouse_auto_click = 0x0;
  keyInfo.mouse_auto_click_per_second = 0x5;
  keyInfo.mouse_auto_click_toggle_key = '';
  keyInfo.mouse_auto_click_light = 0x0;
  keyInfo.mouse_auto_click_down = 0x0;
  keyInfo.mouse_auto_click_up = 0x0;
  keyInfo.mouse_auto_click_rand = 0x0;
  keyInfo.mouse_intensity = [0x0, 0x0, 0x0, 0x0, 0x0];
  keyInfo.mouse_intensity_key = ['', '', '', '', ''];
  keyInfo.mouse_intensity_light = [-0x1, -0x1, -0x1, -0x1, -0x1];
  keyInfo.mouse_intensity_adjustment = [[], [], [], [], []];
  keyInfo.mouse_mapping_function = 0x0;
  keyInfo.mouse_mapping_function_data = 0xc8;
  keyInfo.mouse_mapping_function_text = '';
  keyInfo.macro_style = 0x0;
  keyInfo.macro_toggleKey = 0x0;
  keyInfo.macro_endKey = 0x0;
  keyInfo.locked = 0x0;
  keyInfo.macroKeys = [];
  return keyInfo;
}

function copy_key_info(sourceKeyInfo) {
  return JSON.parse(JSON.stringify(sourceKeyInfo));
}

function create_macro_info() {
  var str = layui.i18np;
  var mouseInfo = {
    name: str.prop("STRID_NONE"),
    label: '',
    _id: 0x0,
    x: 0x0,
    y: 0x0,
    style: 0x0,
    interval_time: 0x0,
    continue_time: 0x0,
    touch_style: 0x0,
    moba_reverse: 0x0,
    moba_radius: 0x0,
    slide_style: 0x0,
    slide_range: 0x0,
    mouse_key_code: 0x0,
    mouse_key_event: 0x0,
    mouse_key_time: 0x0,
    mouse_key_loop: 0x0
  };
  return mouseInfo;
}

function clone_macro_info(client) {
  return Object.assign({}, client);
}

function parseKeyNames(reader, keyCount, keyInfo, client) {
  var html = '';
  var str = '';
  for (var i = 0; i < keyCount; i++) {
    var code = reader.uint8();
    if (code == 0x7) {
      if (html.length > 0) html += '+';
      html += KEY_WHEEL_UP;
      if (str.length > 0) str += '+';
      str += '▲';
    } else if (code == 0x8) {
      if (html.length > 0) html += '+';
      html += KEY_WHEEL_DOWN;
      if (str.length > 0) str += '+';
      str += '▼';
    } else {
      get_keys(client).forEach(function (item) {
        if (item.id.length == 1 && code == item.id[0]) {
          if (html.length > 0) html += '+';
          html += item.name;
          if (str.length > 0) str += '+';
          str += item.label;
        }
      });
    }
  }
  keyInfo.name = html;
  keyInfo.label = str;
}

function normalize_scan_code(code) {
  if (code == 0xa2) return 0x11;
  if (code == 0xa4) return 0x12;
  if (code == 0xa0) return 0x10;
  return code;
}

function parse_mouse_mapping(reader, byteLen, keyInfo, totalLen, arr) {
  var modifier = get_vk_code(reader.uint8());
  modifier = normalize_scan_code(modifier);

  var eventType = reader.uint8();
  var keyCode = reader.uint8();

  if (eventType == 0x1) {
    keyCode += 0xff;
  } else if (eventType == 0x3) {
    keyInfo.mouse_mapping_key_data = Math.abs(keyCode - 0x40);
    keyCode = keyCode > 0x40 ? 0x400 : 0x401;
  } else if (eventType == 0x5) {
    keyInfo.mouse_mapping_key_data = Math.abs(keyCode - 0x40);
    keyCode = keyCode < 0x40 ? 0x402 : 0x403;
  } else if (eventType == 0x4) {
    keyCode += 0x200;
  }

  keyCode = get_vk_code(keyCode);

  var secondaryModifier = 0;
  if (reader.offset < totalLen) {
    secondaryModifier = get_vk_code(reader.uint8());
    secondaryModifier = normalize_scan_code(secondaryModifier);
  }

  keyInfo.configType = 0x0;
  keyInfo.touch_style = 0x1b;
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
    keyInfo.mouse_mapping_function_data = keyInfo.mouse_mapping_function_data & 0xff | highByte << 8 & 0xff00;
  }

  if (reader.offset < totalLen) {
    reader.uint8();
  }

  if (keyInfo.mouse_mapping_function == 0x9) {
    if (i8 == 0x2) {
      keyInfo.mouse_mapping_function_data *= get_cpi_step(client);
      keyInfo.configType = 0x0;
      keyInfo.touch_style = 0x1d;
      arr.push(keyInfo);
    }
  } else if (keyInfo.mouse_mapping_function == 0x10) {
    var strLen = reader.uint16();
    keyInfo.mouse_mapping_function_text = String.fromCharCode.apply(null, byteLen.subarray(reader.offset, reader.offset + strLen));
    keyInfo.configType = 0x0;
    keyInfo.touch_style = 0x1d;
    arr.push(keyInfo);
  } else {
    keyInfo.configType = 0x0;
    keyInfo.touch_style = 0x1d;
    arr.push(keyInfo);
  }
}

function parse_macro_mouse_event(reader, keyInfo, macroInfo) {
  var i6 = reader.uint8();

  if ((i6 & 0x80) != 0) {
    macroInfo.mouse_key_loop = reader.uint16();
  } else {
    macroInfo.mouse_key_loop = 0x1;
  }

  i6 &= 0x7f;

  if (i6 == 0x0 || i6 == 0x1 || i6 == 0x4) {
    var keyCode = reader.uint8();
    if (i6 == 0x1) keyCode += 0xff;
    else if (i6 == 0x4) keyCode += 0x200;
    macroInfo.mouse_key_code = get_vk_code(keyCode);

    var eventByte = reader.uint8();
    macroInfo.mouse_key_event = MOUSE_EVENT_KEY_UP;
    if (eventByte == 0x0) macroInfo.mouse_key_event = MOUSE_EVENT_KEY_DOWN;
    else if (eventByte == 0x2) macroInfo.mouse_key_event = MOUSE_EVENT_KEY_UP;
  } else if (i6 == 0x2) {
    var b1 = reader.uint8();
    var b2 = reader.uint8();
    var b3 = reader.uint8();
    var coordX = b1 & 0xff | b2 << 8 & 0xf00;
    var coordY = b3 & 0xff | b2 << 4 & 0xf00;
    macroInfo.mouse_key_code = coordX << 16 | coordY;
    macroInfo.mouse_key_event = MOUSE_EVENT_MOVE;
  } else if (i6 == 0x6) {
    var absX = reader.uint16();
    var absY = reader.uint16();
    macroInfo.mouse_key_code = absX << 16 | absY;
    macroInfo.mouse_key_event = MOUSE_EVENT_POSITION;
  } else if (i6 == 0x3) {
    macroInfo.mouse_key_code = reader.uint8() - 0x40;
    macroInfo.mouse_key_event = MOUSE_EVENT_WHEEL_VERT;
  } else if (i6 == 0x5) {
    macroInfo.mouse_key_code = reader.uint8() - 0x40;
    macroInfo.mouse_key_event = MOUSE_EVENT_WHEEL_HORZ;
  }

  macroInfo.mouse_key_time = reader.uint16();
  keyInfo.macroKeys.push(macroInfo);
}

function parse_macro_entry(reader, byteLen, keyInfo, idx, totalLen, arr) {
  var styleByte = reader.uint8();
  keyInfo.macro_style = 0x0;
  if (styleByte == 0x1) keyInfo.macro_style = 0x1;
  else if (styleByte == 0x2) keyInfo.macro_style = 0x2;
  else if (styleByte == 0x3) keyInfo.macro_style = 0x3;
  else if (styleByte == 0x4) keyInfo.macro_style = 0x4;
  else if (styleByte == 0x5) keyInfo.macro_style = 0x5;
  else if (styleByte == 0x6) keyInfo.macro_style = 0x6;

  keyInfo.macro_endKey = reader.uint8();
  var macroCount = reader.uint8();

  for (var i = 0; i < macroCount; i++) {
    var macroInfo = create_macro_info();
    reader.uint16();
    reader.uint16();
    macroInfo.interval_time = reader.uint16();
    macroInfo.continue_time = reader.uint16();
    macroInfo.style = reader.uint8() & 0x7f;

    if (macroInfo.style == 0x16) {
      parse_macro_mouse_event(reader, keyInfo, macroInfo);
    }
  }

  reader.uint8();
  var contByte = reader.uint8();
  keyInfo.macro_toggleKey = reader.uint8();
  keyInfo.configType = CONFIG_TYPE_MACRO;

  if ((contByte & 8) != 0 && keyInfo.macroKeys.length >= 0x2) {
    var keyInfo2 = create_key_info();
    keyInfo2.name = keyInfo.name;
    keyInfo2.label = keyInfo.label;
    keyInfo2.configType = 0x0;
    keyInfo2.touch_style = 0x1b;
    var payload = [0x0, 0x0, keyInfo.macroKeys[0].mouse_key_code];
    keyInfo2.mouse_mapping_keys = JSON.stringify(payload);
    keyInfo2.mouse_auto_click = 0x1;
    keyInfo2.mouse_auto_click_down = keyInfo.macroKeys[0].mouse_key_time;
    keyInfo2.mouse_auto_click_up = keyInfo.macroKeys[1].mouse_key_time;
    keyInfo2.mouse_auto_click_rand = keyInfo.macroKeys[0].interval_time;
    arr.push(keyInfo2);
  } else if (idx == 0x2b) {
    arr.forEach(function (item2) {
      if (item2.configType == CONFIG_TYPE_MACRO && item2.macro_style == keyInfo.macro_style && item2.name == keyInfo.name && item2.label == keyInfo.label) {
        keyInfo.macroKeys.forEach(function (item3) {
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
  if (byteLen == undefined) {
    arr.splice(0, arr.length);
    return;
  }

  var reader = new BinaryReader(new Uint8Array(byteLen));
  var header = reader.uint8() & 0xf;
  if (header !== 0x3) return;

  var totalLen = (byteLen[0] << 4 & 0xf00) | reader.uint8();
  if (byteLen.byteLength < totalLen) return;

  var keyInfo = create_key_info();
  var idx = reader.uint8();
  if (idx !== 0x16 && idx !== 0x18 && idx !== 0x5 && idx !== 0x2b) return;

  var keyCount = reader.uint8();
  if (keyCount > 0x2) return;

  parseKeyNames(reader, keyCount, keyInfo, client);

  switch (idx) {
    case 0x16:
      parse_mouse_mapping(reader, byteLen, keyInfo, totalLen, arr);
      break;
    case 0x18:
      parse_mapping_function(reader, byteLen, keyInfo, totalLen, arr, client);
      break;
    case 0x5:
    case 0x2b:
      parse_macro_entry(reader, byteLen, keyInfo, idx, totalLen, arr);
      break;
  }
}
