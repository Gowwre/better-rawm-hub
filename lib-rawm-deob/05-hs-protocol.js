function hs_format_data(_0x1ec479, _0x3e4b45) {
  var _0x1728fc = new Uint8Array(_0x3e4b45);
  var _0x4e422b = [];
  for (var _0x50c275 = 0x0; _0x50c275 < 0x20; _0x50c275++) {
    if (_0x50c275 < _0x1728fc.byteLength) {
      _0x4e422b.push(_0x1728fc[_0x50c275]);
    } else {
      _0x4e422b.push(0x0);
    }
  }
  return new Uint8Array(_0x4e422b);
}
function hs_get_firmware_version(_0x50b6db) {
  var _0x1be101 = [];
  _0x1be101.push(0xf5);
  send_event(_0x50b6db, hs_format_data(_0x50b6db, _0x1be101));
}
function hs_set_factory_reset(_0x4f0f03) {
  var _0x547338 = [];
  _0x547338.push(0xa);
  send_event(_0x4f0f03, hs_format_data(_0x4f0f03, _0x547338));
}
function hs_set_keycode_factory_reset(_0x4a1c44) {
  var _0x5bac6f = [];
  _0x5bac6f.push(0x6);
  send_event(_0x4a1c44, hs_format_data(_0x4a1c44, _0x5bac6f));
}
function hs_get_onboard_index(_0xf7f7d5) {
  var _0x596f2f = [];
  _0x596f2f.push(0x39);
  send_event(_0xf7f7d5, hs_format_data(_0xf7f7d5, _0x596f2f));
}
function hs_set_onboard_index(_0xe9d433, _0x16ec9c) {
  var _0x5114a9 = [];
  _0x5114a9.push(0x40);
  _0x5114a9.push(_0x16ec9c);
  send_event(_0xe9d433, hs_format_data(_0xe9d433, _0x5114a9));
}
function hs_get_keycode_buff(_0x2a0b41, _0x52868a, _0x4b2183) {
  if (_0x4b2183 > 0x1c) {
    return;
  }
  var _0x555d68 = [];
  _0x555d68.push(0x12);
  _0x555d68.push(_0x52868a >> 0x8 & 0xff);
  _0x555d68.push(_0x52868a & 0xff);
  _0x555d68.push(_0x4b2183);
  send_event(_0x2a0b41, hs_format_data(_0x2a0b41, _0x555d68));
}
function hs_set_keycode(_0x456434, _0x7f059, _0x2d2090, _0x25a94f, _0x1ebf5c) {
  var _0x983815 = [];
  _0x983815.push(0x5);
  _0x983815.push(_0x7f059);
  _0x983815.push(_0x2d2090);
  _0x983815.push(_0x25a94f);
  _0x983815.push(_0x1ebf5c >> 0x8 & 0xff);
  _0x983815.push(_0x1ebf5c & 0xff);
  send_event(_0x456434, hs_format_data(_0x456434, _0x983815));
}
function he_custom_data_save(_0x253fc3, _0x2ee500) {
  log_r('he_custom_data_save:' + _0x2ee500);
  var _0x8e630f = [];
  _0x8e630f.push(0x41);
  _0x8e630f.push(_0x2ee500);
  send_event(_0x253fc3, hs_format_data(_0x253fc3, _0x8e630f));
}
function hs_get_light(_0x8e8496, _0x34383b) {
  var _0x2ea9a9 = [];
  log_r("hs_get_light:" + _0x34383b);
  _0x2ea9a9.push(0x8);
  _0x2ea9a9.push(0x3);
  _0x2ea9a9.push(_0x34383b);
  send_event(_0x8e8496, hs_format_data(_0x8e8496, _0x2ea9a9));
}
function hs_set_light(_0x17d687, _0x242c38, _0x41642f) {
  var _0x18ddd8 = [];
  _0x18ddd8.push(0x7);
  _0x18ddd8.push(0x3);
  _0x18ddd8.push(_0x242c38);
  if (_0x242c38 == 0x1) {
    _0x18ddd8.push(_0x41642f.brightness);
  } else {
    if (_0x242c38 == 0x2) {
      _0x18ddd8.push(_0x41642f.mode);
    } else {
      if (_0x242c38 == 0x3) {
        _0x18ddd8.push(_0x41642f.speed);
      } else {
        if (_0x242c38 == 0x4) {
          _0x18ddd8.push(_0x41642f.hue);
          _0x18ddd8.push(_0x41642f.sat);
        } else if (_0x242c38 == 0x5) {
          _0x18ddd8.push(_0x41642f.light_box_mode);
        }
      }
    }
  }
  send_event(_0x17d687, hs_format_data(_0x17d687, _0x18ddd8));
}
function hs_get_light_sleep_time(_0x26398e) {
  var _0x4ffa83 = [];
  _0x4ffa83.push(0x52);
  send_event(_0x26398e, hs_format_data(_0x26398e, _0x4ffa83));
}
function hs_set_light_sleep_time(_0x5485c8, _0x317f86) {
  var _0xdcea4f = [];
  _0xdcea4f.push(0x53);
  if (_0x317f86 > 0x0) {
    _0xdcea4f.push(0x1);
  } else {
    _0xdcea4f.push(0x0);
  }
  _0xdcea4f.push(_0x317f86 >> 0x8 & 0xff);
  _0xdcea4f.push(_0x317f86 & 0xff);
  send_event(_0x5485c8, hs_format_data(_0x5485c8, _0xdcea4f));
}
function hs_get_light_buff(_0x552fd4, _0x1e9d2d, _0x31edb9) {
  if (_0x31edb9 > 0x1c) {
    return;
  }
  var _0xb56e5e = [];
  _0xb56e5e.push(0x36);
  _0xb56e5e.push(_0x1e9d2d >> 0x8 & 0xff);
  _0xb56e5e.push(_0x1e9d2d & 0xff);
  _0xb56e5e.push(_0x31edb9);
  send_event(_0x552fd4, hs_format_data(_0x552fd4, _0xb56e5e));
}
function hs_set_light_define(_0x18ea5f, _0x552eb6) {
  var _0x3e749c = [];
  _0x3e749c.push(0x37);
  _0x3e749c.push(_0x552eb6.row);
  _0x3e749c.push(_0x552eb6.col);
  _0x3e749c.push(_0x552eb6.hue);
  _0x3e749c.push(_0x552eb6.sat);
  send_event(_0x18ea5f, hs_format_data(_0x18ea5f, _0x3e749c));
}
function hs_set_light_define_infos(_0x1441cd, _0x27fee8) {
  if (_0x27fee8.length > 0x0) {
    kbd_lightinfo_list.splice(0x0, kbd_lightinfo_list.length);
    kbd_lightinfo_list = _0x27fee8.slice();
    hs_set_light_define(_0x1441cd, kbd_lightinfo_list[0x0]);
  }
}
function hs_get_light_box(_0x43b6a0) {
  var _0x2424eb = [];
  _0x2424eb.push(0x50);
  send_event(_0x43b6a0, hs_format_data(_0x43b6a0, _0x2424eb));
}
function hs_set_light_box(_0x37a00e, _0x2827ba) {
  var _0x36c8b3 = [];
  _0x36c8b3.push(0x51);
  _0x36c8b3.push(0x1);
  _0x36c8b3.push(_0x2827ba.mode);
  _0x36c8b3.push(_0x2827ba.colored);
  _0x36c8b3.push(_0x2827ba.brightness);
  _0x36c8b3.push(_0x2827ba.speed);
  _0x36c8b3.push(_0x2827ba.r);
  _0x36c8b3.push(_0x2827ba.g);
  _0x36c8b3.push(_0x2827ba.b);
  send_event(_0x37a00e, hs_format_data(_0x37a00e, _0x36c8b3));
}
function hs_get_axis_mode(_0x4d9f85) {
  var _0x490f42 = [];
  _0x490f42.push(0x45);
  send_event(_0x4d9f85, hs_format_data(_0x4d9f85, _0x490f42));
}
function hs_set_axis_mode(_0xf11ef2, _0x596ab3) {
  var _0x24504d = [];
  _0x24504d.push(0x46);
  _0x24504d.push(_0x596ab3);
  send_event(_0xf11ef2, hs_format_data(_0xf11ef2, _0x24504d));
}
function hs_get_axis_info(_0x1c57df, _0x5190a3, _0x5149c2) {
  var _0x546389 = [];
  _0x546389.push(0x1a);
  _0x546389.push(_0x5190a3);
  _0x546389.push(_0x5149c2);
  send_event(_0x1c57df, hs_format_data(_0x1c57df, _0x546389));
}
function hs_set_axis_info(_0x5ec657, _0x18174e) {
  var _0x2a91d9 = [];
  _0x2a91d9.push(0x19);
  _0x2a91d9.push(_0x18174e.row);
  _0x2a91d9.push(_0x18174e.col);
  _0x2a91d9.push(_0x18174e.rt_enable);
  _0x2a91d9.push(_0x18174e.top_dz >> 0x8 & 0xff);
  _0x2a91d9.push(_0x18174e.top_dz & 0xff);
  _0x2a91d9.push(_0x18174e.apc_lv >> 0x8 & 0xff);
  _0x2a91d9.push(_0x18174e.apc_lv & 0xff);
  _0x2a91d9.push(_0x18174e.rt_press_lv >> 0x8 & 0xff);
  _0x2a91d9.push(_0x18174e.rt_press_lv & 0xff);
  _0x2a91d9.push(_0x18174e.rt_release_lv >> 0x8 & 0xff);
  _0x2a91d9.push(_0x18174e.rt_release_lv & 0xff);
  _0x2a91d9.push(_0x18174e.btm_dz >> 0x8 & 0xff);
  _0x2a91d9.push(_0x18174e.btm_dz & 0xff);
  _0x2a91d9.push(_0x18174e.switch_type);
  send_event(_0x5ec657, hs_format_data(_0x5ec657, _0x2a91d9));
}
function hs_set_axis_infos(_0x581819, _0x4216cc) {
  if (_0x4216cc.length > 0x0) {
    kbd_axisinfo_list.splice(0x0, kbd_axisinfo_list.length);
    kbd_axisinfo_list = _0x4216cc.slice();
    hs_set_axis_info(_0x581819, kbd_axisinfo_list[0x0]);
  }
}
function hs_get_socd_num(_0x56542a) {
  var _0x3ba708 = [];
  _0x3ba708.push(0x1e);
  send_event(_0x56542a, hs_format_data(_0x56542a, _0x3ba708));
}
function hs_set_socd_num(_0x24abbe, _0x463fb8) {
  var _0x51410e = [];
  _0x51410e.push(0x1f);
  _0x51410e.push(_0x463fb8);
  send_event(_0x24abbe, hs_format_data(_0x24abbe, _0x51410e));
}
function hs_get_socd_data(_0x5b04f2, _0x2eedc1) {
  var _0x28ebcc = [];
  _0x28ebcc.push(0x20);
  _0x28ebcc.push(_0x2eedc1);
  send_event(_0x5b04f2, hs_format_data(_0x5b04f2, _0x28ebcc));
}
function hs_set_socd_infos(_0x552e5a, _0xf8d118) {
  if (_0xf8d118.length > 0x0) {
    kbd_socdinfo_list.splice(0x0, kbd_socdinfo_list.length);
    kbd_socdinfo_list = _0xf8d118.slice();
    hs_set_socd_data(_0x552e5a, kbd_socdinfo_list[0x0]);
  }
}
function hs_set_socd_data(_0x2fd563, _0x8f0a10) {
  var _0x49665c = [];
  _0x49665c.push(0x21);
  _0x49665c.push(_0x8f0a10.id);
  _0x49665c.push(_0x8f0a10.row1);
  _0x49665c.push(_0x8f0a10.col1);
  _0x49665c.push(_0x8f0a10.row2);
  _0x49665c.push(_0x8f0a10.col2);
  _0x49665c.push(_0x8f0a10.socd_mode);
  send_event(_0x2fd563, hs_format_data(_0x2fd563, _0x49665c));
}
function hs_get_mt_num(_0x3c07f1) {
  var _0x5a71e5 = [];
  _0x5a71e5.push(0x22);
  send_event(_0x3c07f1, hs_format_data(_0x3c07f1, _0x5a71e5));
}
function hs_set_mt_num(_0x47eb98, _0xf8794c) {
  var _0x5bd938 = [];
  _0x5bd938.push(0x23);
  _0x5bd938.push(_0xf8794c);
  send_event(_0x47eb98, hs_format_data(_0x47eb98, _0x5bd938));
}
function hs_get_mt_data(_0x159c7e, _0x12f89a) {
  var _0x1ea0b6 = [];
  _0x1ea0b6.push(0x24);
  _0x1ea0b6.push(_0x12f89a);
  send_event(_0x159c7e, hs_format_data(_0x159c7e, _0x1ea0b6));
}
function hs_set_mt_infos(_0x23723f, _0x1b6de7) {
  if (_0x1b6de7.length > 0x0) {
    kbd_mtinfo_list.splice(0x0, kbd_mtinfo_list.length);
    kbd_mtinfo_list = _0x1b6de7.slice();
    hs_set_mt_data(_0x23723f, kbd_mtinfo_list[0x0]);
  }
}
function hs_set_mt_data(_0xf6e4b9, _0x3ef80f) {
  var _0x3a317f = [];
  _0x3a317f.push(0x25);
  _0x3a317f.push(_0x3ef80f.id);
  _0x3a317f.push(_0x3ef80f.row);
  _0x3a317f.push(_0x3ef80f.col);
  _0x3a317f.push(_0x3ef80f.tap_time >> 0x8 & 0xff);
  _0x3a317f.push(_0x3ef80f.tap_time & 0xff);
  _0x3a317f.push(_0x3ef80f.keyCode1 >> 0x8 & 0xff);
  _0x3a317f.push(_0x3ef80f.keyCode1 & 0xff);
  _0x3a317f.push(_0x3ef80f.keyCode2 >> 0x8 & 0xff);
  _0x3a317f.push(_0x3ef80f.keyCode2 & 0xff);
  send_event(_0xf6e4b9, hs_format_data(_0xf6e4b9, _0x3a317f));
}
function hs_get_rs_num(_0x542056) {
  var _0x370639 = [];
  _0x370639.push(0x2e);
  send_event(_0x542056, hs_format_data(_0x542056, _0x370639));
}
function hs_set_rs_num(_0x450e11, _0x4cf3f6) {
  var _0x5aa620 = [];
  _0x5aa620.push(0x2f);
  _0x5aa620.push(_0x4cf3f6);
  send_event(_0x450e11, hs_format_data(_0x450e11, _0x5aa620));
}
function hs_get_rs_data(_0x4ba823, _0x53cac4) {
  var _0x549d3f = [];
  _0x549d3f.push(0x30);
  _0x549d3f.push(_0x53cac4);
  send_event(_0x4ba823, hs_format_data(_0x4ba823, _0x549d3f));
}
function hs_set_rs_infos(_0x5bc5f4, _0x512719) {
  if (_0x512719.length > 0x0) {
    kbd_rsinfo_list.splice(0x0, kbd_rsinfo_list.length);
    kbd_rsinfo_list = _0x512719.slice();
    hs_set_rs_data(_0x5bc5f4, kbd_rsinfo_list[0x0]);
  }
}
function hs_set_rs_data(_0xae8d41, _0x346373) {
  var _0x409e4f = [];
  _0x409e4f.push(0x31);
  _0x409e4f.push(_0x346373.id);
  _0x409e4f.push(_0x346373.row1);
  _0x409e4f.push(_0x346373.col1);
  _0x409e4f.push(_0x346373.row2);
  _0x409e4f.push(_0x346373.col2);
  send_event(_0xae8d41, hs_format_data(_0xae8d41, _0x409e4f));
}
function hs_get_dks_num(_0x15b20c) {
  var _0x258120 = [];
  _0x258120.push(0x2a);
  send_event(_0x15b20c, hs_format_data(_0x15b20c, _0x258120));
}
function hs_set_dks_num(_0x1aa932, _0x951c7a) {
  var _0x53a33f = [];
  _0x53a33f.push(0x2b);
  _0x53a33f.push(_0x951c7a);
  send_event(_0x1aa932, hs_format_data(_0x1aa932, _0x53a33f));
}
function hs_get_dks_data(_0x20fda6, _0x12b01b) {
  var _0x27624d = [];
  _0x27624d.push(0x2c);
  _0x27624d.push(_0x12b01b);
  send_event(_0x20fda6, hs_format_data(_0x20fda6, _0x27624d));
}
function hs_set_dks_infos(_0x5023aa, _0xd09fdc) {
  if (_0xd09fdc.length > 0x0) {
    kbd_dksinfo_list.splice(0x0, kbd_dksinfo_list.length);
    kbd_dksinfo_list = _0xd09fdc.slice();
    hs_set_dks_data(_0x5023aa, kbd_dksinfo_list[0x0]);
  }
}
function hs_set_dks_data(_0x30aa73, _0x38d056) {
  var _0x5e045e = [];
  _0x5e045e.push(0x2d);
  _0x5e045e.push(_0x38d056.id);
  _0x5e045e.push(_0x38d056.row);
  _0x5e045e.push(_0x38d056.col);
  _0x5e045e.push(_0x38d056.keyCode1 >> 0x8 & 0xff);
  _0x5e045e.push(_0x38d056.keyCode1 & 0xff);
  _0x5e045e.push(_0x38d056.state1 >> 0x8 & 0xff);
  _0x5e045e.push(_0x38d056.state1 & 0xff);
  _0x5e045e.push(_0x38d056.keyCode2 >> 0x8 & 0xff);
  _0x5e045e.push(_0x38d056.keyCode2 & 0xff);
  _0x5e045e.push(_0x38d056.state2 >> 0x8 & 0xff);
  _0x5e045e.push(_0x38d056.state2 & 0xff);
  _0x5e045e.push(_0x38d056.keyCode3 >> 0x8 & 0xff);
  _0x5e045e.push(_0x38d056.keyCode3 & 0xff);
  _0x5e045e.push(_0x38d056.state3 >> 0x8 & 0xff);
  _0x5e045e.push(_0x38d056.state3 & 0xff);
  _0x5e045e.push(_0x38d056.keyCode4 >> 0x8 & 0xff);
  _0x5e045e.push(_0x38d056.keyCode4 & 0xff);
  _0x5e045e.push(_0x38d056.state4 >> 0x8 & 0xff);
  _0x5e045e.push(_0x38d056.state4 & 0xff);
  send_event(_0x30aa73, hs_format_data(_0x30aa73, _0x5e045e));
}
function reset_macro_buf(_0x1b76c0) {
  var _0x1b1c4a = [];
  _0x1b1c4a.push(0x10);
  send_event(_0x1b76c0, hs_format_data(_0x1b76c0, _0x1b1c4a));
}
function hs_get_macro_num(_0x142fa4) {
  var _0x483fb2 = [];
  _0x483fb2.push(0xc);
  send_event(_0x142fa4, hs_format_data(_0x142fa4, _0x483fb2));
}
function hs_get_macro_buffer_size(_0x306367) {
  var _0x33c161 = [];
  _0x33c161.push(0xd);
  send_event(_0x306367, hs_format_data(_0x306367, _0x33c161));
}
function hs_set_macro_buf(_0x19adfc, _0x5112e2) {
  kbd_macroinfo_list.splice(0x0, kbd_macroinfo_list.length);
  kbd_macroinfo_list = _0x5112e2.slice();
  reset_macro_buf(_0x19adfc);
}
function hs_set_macro_data(_0x1156ee, _0x3ac13f) {
  var _0x5235b4 = [];
  _0x5235b4.push(0xf);
  _0x5235b4.push(_0x3ac13f >> 0x8 & 0xff);
  _0x5235b4.push(_0x3ac13f & 0xff);
  var _0x53b78d = 0x0;
  if (_0x3ac13f + 0x1c < macroBuff.length) {
    _0x53b78d = 0x1c;
  } else {
    _0x53b78d = macroBuff.length - _0x3ac13f;
  }
  _0x5235b4.push(_0x53b78d);
  for (var _0x38e9ce = 0x0; _0x38e9ce < _0x53b78d; _0x38e9ce++) {
    _0x5235b4.push(macroBuff[_0x3ac13f + _0x38e9ce]);
  }
  send_event(_0x1156ee, hs_format_data(_0x1156ee, _0x5235b4));
}
function hs_get_macro_buf(_0xc1bb29, _0x1baf3f, _0x2dff91) {
  var _0x377d96 = [];
  _0x377d96.push(0xe);
  _0x377d96.push(_0x1baf3f >> 0x8 & 0xff);
  _0x377d96.push(_0x1baf3f & 0xff);
  _0x377d96.push(_0x2dff91);
  send_event(_0xc1bb29, hs_format_data(_0xc1bb29, _0x377d96));
}
function hs_set_data_sync_index(_0x18b3ba) {
  kbd_data_sync_index = _0x18b3ba;
}
function hs_data_sync(_0x10e545) {
  if ((kbd_data_sync_index & 0x1) != 0x1) {
    kbd_keyinfo_list.splice(0x0, kbd_keyinfo_list.length);
    _0x10e545.device_info.kbd_key_infos.splice(0x0, _0x10e545.device_info.kbd_key_infos.length);
    hs_get_keycode_buff(_0x10e545, 0x0, 0x1c);
  } else {
    if ((kbd_data_sync_index & 0x2) != 0x2) {
      kbd_lightinfo_list.splice(0x0, kbd_lightinfo_list.length);
      _0x10e545.device_info.kbd_light_info = kbd_create_light_info();
      hs_get_light(_0x10e545, 0x1);
    } else {
      if ((kbd_data_sync_index & 0x4) != 0x4) {
        kbd_axisinfo_list.splice(0x0, kbd_axisinfo_list.length);
        _0x10e545.device_info.kbd_axis_infos.splice(0x0, _0x10e545.device_info.kbd_axis_infos.length);
        hs_get_axis_info(_0x10e545, 0x0, 0x0);
      } else if ((kbd_data_sync_index & 0x8) != 0x8) {
        hs_get_socd_num(_0x10e545);
      }
    }
  }
}
function hs_read_event(_0x5d9d5d, _0x1a1803) {
  var _0x2bf9b4 = new Uint8Array(_0x1a1803);
  if (_0x5d9d5d.pause) {
    var _0x2d47ee = _0x5d9d5d.send_event_buf.byteLength;
    if (_0x2d47ee <= _0x1a1803 - 0x1) {
      _0x5d9d5d.send_event_buf = new Uint8Array(0x0);
      return _0x5d9d5d.send_event_buf;
    }
  } else {
    var _0x2d47ee = _0x5d9d5d.send_event_buf.byteLength;
    if (_0x2d47ee <= _0x1a1803 - 0x1) {
      _0x5d9d5d.send_event_buf = new Uint8Array(0x0);
      return _0x5d9d5d.send_event_buf;
    } else {
      _0x2bf9b4.set(_0x5d9d5d.send_event_buf.subarray(0x0, _0x1a1803), 0x0);
      _0x5d9d5d.send_event_buf = _0x5d9d5d.send_event_buf.subarray(_0x1a1803);
    }
  }
  return _0x2bf9b4;
}
async function hs_send_client_data(_0x1f215a) {
  console.log("[DEBUG] hs_send_client_data", "client=", _0x1f215a?.id, "allow_send=", _0x1f215a?.allow_send, "virtual=", _0x1f215a?.virtual);
  try {
    if (_0x1f215a.allow_send) {
      var _0x52be91;
      var _0x4dbfe9;
      var _0x2bb4fc = _0x1f215a.product_esb_ch;
      if (_0x2bb4fc == 0xff) {
        _0x52be91 = hs_read_event(_0x1f215a, 0x20);
        _0x4dbfe9 = _0x52be91.length;
      } else {
        _0x52be91 = read_event(_0x1f215a, 63.00000000000001);
        _0x4dbfe9 = _0x52be91[0x0] & 0x3f;
        var _0x3e940a = Array.from(_0x52be91);
        _0x3e940a.unshift(0xc0 | _0x2bb4fc);
        while (_0x3e940a.length < 0x40) {
          _0x3e940a.push(0x0);
        }
        _0x52be91 = new Uint8Array(_0x3e940a);
      }
      if (_0x4dbfe9 > 0x0) {
        var _0x4be254 = _0x1f215a.device;
        if (!_0x4be254.opened) {
          await _0x4be254.open();
        }
        await _0x4be254.sendReport(0x0, _0x52be91);
        if (_0x1f215a.virtual) {
          var _0x24e50a = false;
          usb_client_list.forEach(_0x15a3a4 => {
            if (is_receiver(_0x15a3a4) && _0x15a3a4.device == _0x1f215a.device) {
              _0x24e50a = is_limit_memory(_0x15a3a4);
            }
          });
          if (_0x24e50a) {
            _0x1f215a.allow_send = false;
          }
        }
        post_send_client_data(_0x1f215a);
      }
    } else {
      if (_0x1f215a.virtual) {
        var _0x24e50a = false;
        usb_client_list.forEach(_0x386f64 => {
          if (is_receiver(_0x386f64) && _0x386f64.device == _0x1f215a.device) {
            _0x24e50a = is_limit_memory(_0x386f64);
          }
        });
        if (_0x24e50a) {
          var _0x52be91 = new Uint8Array(0x1);
          var _0x2bb4fc = _0x1f215a.product_esb_ch;
          _0x52be91[0x0] = 64;
          var _0x3e940a = Array.from(_0x52be91);
          _0x3e940a.unshift(0xc0 | _0x2bb4fc);
          while (_0x3e940a.length < 0x40) {
            _0x3e940a.push(0x0);
          }
          _0x52be91 = new Uint8Array(_0x3e940a);
          var _0x4be254 = _0x1f215a.device;
          if (!_0x4be254.opened) {
            await _0x4be254.open();
          }
          await _0x4be254.sendReport(0x0, _0x52be91);
        }
      }
      post_send_client_data(_0x1f215a);
    }
  } catch (_0x185c93) {
    console.log("[DEBUG] hs_send_client_data -> ERROR", _0x185c93);
    log_r(_0x185c93);
  }
}
function hs_parse_cmd(_0x384f68) {
  console.log("[DEBUG] hs_parse_cmd", "client=", _0x384f68?.id, "recv_buf.len=", _0x384f68?.recv_buf?.byteLength, "helloed=", _0x384f68?.helloed, "connected=", _0x384f68?.connected);
  var _0x3933df;
  var _0x3bca37 = pc_kbd_key_num(_0x384f68);
  var _0x4d4688 = pc_kbd_manager_keys(_0x384f68);
  do {
    _0x3933df = false;
    var _0x153882 = _0x384f68.recv_buf;
    var _0xce3c76 = _0x153882.byteLength;
    if (_0xce3c76 >= 0x20) {
      var _0x4ed5c0 = _0x153882[0x0];
      switch (_0x4ed5c0) {
        case 0xf5:
          {
            log_r("IQ_GET_SOFT_DRV_VER");
            if (_0x384f68.device.productName != undefined) {
              _0x384f68.connected = true;
              _0x384f68.helloed = _0x384f68.device.productName.length > 0x0;
              _0x384f68.device_name = _0x384f68.device.productName;
            } else {
              _0x384f68.recv_buf = new Uint8Array(0x0);
              _0x384f68.syncing = true;
            }
            var _0x1710e3 = _0x153882[0x1];
            _0x384f68.device_info.revision = String.fromCharCode.apply(null, _0x153882.subarray(0x2, 0x2 + _0x1710e3));
            hs_get_onboard_index(_0x384f68);
            window.postMessage({
              'action': ACTION_REFRESH_CLIENT_LIST
            });
            window.postMessage({
              'action': ACTION_UI_REFRESH_CLIENT_LIST
            });
            window.postMessage({
              'action': ACTION_UI_REFRESH_CURRENT_CLIENT
            });
          }
          break;
        case 0x6:
          {
            log_r("IQ_RESET_KEYCODE");
            hs_get_onboard_index(_0x384f68);
          }
          break;
        case 0x39:
          {
            log_r("IQ_GET_PROFILE_ID");
            _0x384f68.device_info.onboardIndex = _0x153882[0x1];
            kbd_data_sync_index = 0x0;
            hs_data_sync(_0x384f68);
          }
          break;
        case 0x40:
          {
            log_r("IQ_GET_PROFILE_ID");
            _0x384f68.device_info.onboardIndex = _0x153882[0x1];
            kbd_data_sync_index = 0x0;
            hs_data_sync(_0x384f68);
          }
          break;
        case 0x12:
          {
            log_r("IQ_GET_KEYCODE_BUF");
            var _0x42fa4d = _0x153882[0x2] | _0x153882[0x1] << 0x8;
            var _0x150e1a = _0x153882[0x3];
            for (var _0x2a7e82 = 0x0; _0x2a7e82 < _0x150e1a; _0x2a7e82 += 0x2) {
              var _0x5393f5 = _0x153882[0x4 + _0x2a7e82] << 0x8 | _0x153882[0x4 + _0x2a7e82 + 0x1];
              var _0x4756cd = (_0x42fa4d + _0x2a7e82) / 0x2;
              if (_0x4756cd >= _0x3bca37) {
                _0x4756cd = _0x4756cd - _0x3bca37;
              }
              var _0x28b649 = _0x4d4688[_0x4756cd];
              kbd_keyinfo_list.push(kbd_create_pc_key_info(_0x28b649.type, _0x28b649.vCode, get_key_name_from_keyid(_0x5393f5), _0x28b649.aCode, _0x28b649.aName, _0x28b649.sCode, _0x5393f5, _0x28b649.row, _0x28b649.col, _0x28b649.rect));
            }
            if (_0x42fa4d + _0x150e1a < _0x3bca37 * 0x4) {
              var _0x1fd16c = _0x3bca37 * 0x4 - _0x42fa4d - _0x150e1a;
              hs_get_keycode_buff(_0x384f68, _0x42fa4d + _0x150e1a, _0x1fd16c < 0x1c ? _0x1fd16c : 0x1c);
            } else {
              if (is_keyboard_5_15(_0x384f68.device)) {
                kbd_keyinfo_list[0x3f].name = '';
              }
              _0x384f68.device_info.kbd_key_infos = kbd_keyinfo_list.slice();
              kbd_keyinfo_list.splice(0x0, kbd_keyinfo_list.length);
              log_r("IQ_GET_KEYCODE_BUF finish");
              kbd_data_sync_index = kbd_data_sync_index | 0x1;
              hs_get_macro_num(_0x384f68);
              window.postMessage({
                'action': ACTION_UI_REFRESH_KBD_KEY
              });
            }
          }
          break;
        case 0x5:
          {
            if (_0x153882.length >= 0x6) {
              var _0x12246a = _0x153882[0x1];
              var _0x715fc = _0x153882[0x2];
              var _0x2eb05c = _0x153882[0x3];
              var _0x5393f5 = _0x153882[0x5] | _0x153882[0x4] << 0x8;
              if (_0x12246a == 0x0) {
                for (var _0x2a7e82 = 0x0; _0x2a7e82 < _0x3bca37; _0x2a7e82++) {
                  var _0x28b649 = _0x384f68.device_info.kbd_key_infos[_0x2a7e82];
                  if (_0x715fc == _0x28b649.row && _0x2eb05c == _0x28b649.col) {
                    _0x28b649.keyId = _0x5393f5;
                    _0x28b649.name = get_key_name_from_keyid(_0x5393f5);
                    break;
                  }
                }
              } else {
                for (var _0x2a7e82 = _0x3bca37; _0x2a7e82 < _0x3bca37 * 0x2 - 0x1; _0x2a7e82++) {
                  var _0x28b649 = _0x384f68.device_info.kbd_key_infos[_0x2a7e82];
                  if (_0x715fc == _0x28b649.row && _0x2eb05c == _0x28b649.col) {
                    _0x28b649.keyId = _0x5393f5;
                    _0x28b649.name = get_key_name_from_keyid(_0x5393f5);
                    break;
                  }
                }
              }
            }
          }
          break;
        case 0xc:
          {
            log_r("IQ_GET_MACRO_NUM");
            _0x384f68.device_info.kbd_macro_num = _0x153882[0x1];
            _0x384f68.device_info.kbd_macro_infos.splice(0x0, _0x384f68.device_info.kbd_macro_infos.length);
            for (var _0x2a7e82 = 0x0; _0x2a7e82 < _0x384f68.device_info.kbd_macro_num; _0x2a7e82++) {
              _0x384f68.device_info.kbd_macro_infos.push([]);
            }
            hs_get_macro_buffer_size(_0x384f68);
          }
          break;
        case 0xd:
          {
            log_r("IQ_GET_MACRO_SIZE");
            _0x384f68.device_info.kbd_macro_max_size = _0x153882[0x1] << 0x8 | _0x153882[0x2];
            kbd_macro_index = 0x0;
            macroBuff = [];
            hs_get_macro_buf(_0x384f68, 0x0, 0x1c);
          }
          break;
        case 0x10:
          {
            log_r('IQ_RESET_MACRO');
            hs_set_macro_data(_0x384f68, 0x0);
          }
          break;
        case 0xe:
          {
            log_r("IQ_GET_MACRO_DATA_BUF");
            var _0x42fa4d = _0x153882[0x1] << 0x8 | _0x153882[0x2];
            var _0x4870ac = _0x153882[0x3];
            var _0x30a01b = 0x0;
            for (var _0x2a7e82 = 0x0; _0x2a7e82 < _0x4870ac; _0x2a7e82++) {
              _0x30a01b = _0x153882[0x4 + _0x2a7e82];
              if (_0x30a01b == 0x0) {
                if (macroBuff.length >= 0x3) {
                  var _0x4756cd = 0x1;
                  while (_0x4756cd < macroBuff.length) {
                    if (macroBuff[_0x4756cd] == 0x2) {
                      _0x4756cd++;
                      var _0x5393f5 = macroBuff[_0x4756cd];
                      var _0x4e7e7d = create_macro_info();
                      _0x4e7e7d.mouse_key_event = 0x100;
                      _0x4e7e7d.mouse_key_code = get_key_code_from_keyid(_0x5393f5);
                      _0x384f68.device_info.kbd_macro_infos[kbd_macro_index].push(_0x4e7e7d);
                      _0x4756cd++;
                      _0x4756cd++;
                    } else {
                      if (macroBuff[_0x4756cd] == 0x3) {
                        _0x4756cd++;
                        var _0x5393f5 = macroBuff[_0x4756cd];
                        var _0x4e7e7d = create_macro_info();
                        _0x4e7e7d.mouse_key_event = 0x101;
                        _0x4e7e7d.mouse_key_code = get_key_code_from_keyid(_0x5393f5);
                        _0x384f68.device_info.kbd_macro_infos[kbd_macro_index].push(_0x4e7e7d);
                        _0x4756cd++;
                        _0x4756cd++;
                      } else {
                        if (macroBuff[_0x4756cd] == 0x4) {
                          _0x4756cd++;
                          var _0x56e583 = '';
                          while (macroBuff[_0x4756cd] >= '0'.charCodeAt() && macroBuff[_0x4756cd] <= '9'.charCodeAt()) {
                            _0x56e583 += String.fromCharCode(macroBuff[_0x4756cd]);
                            _0x4756cd++;
                          }
                          var _0x485074 = _0x384f68.device_info.kbd_macro_infos[kbd_macro_index];
                          var _0x4e7e7d = _0x485074[_0x485074.length - 0x1];
                          if (_0x4e7e7d != undefined) {
                            _0x4e7e7d.mouse_key_time = parseInt(_0x56e583);
                          }
                          _0x4756cd++;
                          _0x4756cd++;
                        }
                      }
                    }
                  }
                }
                kbd_macro_index++;
                macroBuff = [];
              } else {
                macroBuff.push(_0x30a01b);
              }
            }
            if (kbd_macro_index >= _0x384f68.device_info.kbd_macro_num) {
              hs_data_sync(_0x384f68);
            } else {
              hs_get_macro_buf(_0x384f68, _0x42fa4d + _0x4870ac, 0x1c);
            }
          }
          break;
        case 0xf:
          {
            log_r('IQ_SET_MACRO_DATA_BUF');
            var _0x42fa4d = _0x153882[0x1] << 0x8 | _0x153882[0x2];
            var _0x4870ac = _0x153882[0x3];
            if (_0x42fa4d + _0x4870ac >= macroBuff.length) {
              _0x384f68.device_info.kbd_macro_infos.splice(0x0, _0x384f68.device_info.kbd_macro_infos.length);
              for (var _0x2a7e82 = 0x0; _0x2a7e82 < _0x384f68.device_info.kbd_macro_num; _0x2a7e82++) {
                _0x384f68.device_info.kbd_macro_infos.push([]);
                var _0xd3bc28 = kbd_macroinfo_list[_0x2a7e82];
                if (_0xd3bc28.length > 0x0) {
                  for (var _0xb40c5d = 0x0; _0xb40c5d < _0xd3bc28.length; _0xb40c5d++) {
                    _0x384f68.device_info.kbd_macro_infos[_0x2a7e82].push(clone_macro_info(_0xd3bc28[_0xb40c5d]));
                  }
                }
              }
              window.postMessage({
                'action': ACTION_UI_REFRESH_KBD_MACRO
              });
            } else {
              hs_set_macro_data(_0x384f68, _0x42fa4d + _0x4870ac);
            }
          }
          break;
        case 0x8:
          {
            if (_0x153882.length >= 0x4) {
              var _0x4a22d6 = _0x153882[0x2];
              if (_0x4a22d6 == 0x1) {
                _0x384f68.device_info.kbd_light_info.brightness = _0x153882[0x3];
                hs_get_light(_0x384f68, 0x2);
              } else {
                if (_0x4a22d6 == 0x2) {
                  _0x384f68.device_info.kbd_light_info.mode = _0x153882[0x3];
                  hs_get_light(_0x384f68, 0x3);
                } else {
                  if (_0x4a22d6 == 0x3) {
                    _0x384f68.device_info.kbd_light_info.speed = _0x153882[0x3];
                    hs_get_light(_0x384f68, 0x4);
                  } else if (_0x4a22d6 == 0x4) {
                    _0x384f68.device_info.kbd_light_info.hue = _0x153882[0x3];
                    _0x384f68.device_info.kbd_light_info.sat = _0x153882[0x4];
                    hs_get_light_sleep_time(_0x384f68);
                  }
                }
              }
            }
          }
          break;
        case 0x52:
          {
            log_r("IQ_GET_RGB_COLOR_SLEEP_TIME");
            var _0x3e4f18 = _0x153882[0x1];
            var _0x104b61 = _0x153882[0x2] << 0x8 | _0x153882[0x3];
            if (_0x3e4f18 == 0x0) {
              _0x384f68.device_info.kbd_light_info.sleep_time = 0x0;
            } else {
              _0x384f68.device_info.kbd_light_info.sleep_time = _0x104b61;
            }
            hs_get_light_box(_0x384f68);
          }
          break;
        case 0x53:
          {
            log_r("IQ_SET_RGB_COLOR_SLEEP_TIME");
            var _0x3e4f18 = _0x153882[0x1];
            var _0x104b61 = _0x153882[0x2] << 0x8 | _0x153882[0x3];
            if (_0x3e4f18 == 0x0) {
              _0x384f68.device_info.kbd_light_info.sleep_time = 0x0;
            } else {
              _0x384f68.device_info.kbd_light_info.sleep_time = _0x104b61;
            }
          }
          break;
        case 0x50:
          {
            log_r("IQ_GET_BOX_RGB_COLOR");
            var _0x4756cd = 0x1;
            _0x4756cd++;
            _0x384f68.device_info.kbd_light_info.light_box_info.mode = _0x153882[_0x4756cd++];
            _0x384f68.device_info.kbd_light_info.light_box_info.colored = _0x153882[_0x4756cd++];
            _0x384f68.device_info.kbd_light_info.light_box_info.brightness = _0x153882[_0x4756cd++];
            _0x384f68.device_info.kbd_light_info.light_box_info.speed = _0x153882[_0x4756cd++];
            _0x384f68.device_info.kbd_light_info.light_box_info.r = _0x153882[_0x4756cd++];
            _0x384f68.device_info.kbd_light_info.light_box_info.g = _0x153882[_0x4756cd++];
            _0x384f68.device_info.kbd_light_info.light_box_info.b = _0x153882[_0x4756cd++];
            hs_get_light_buff(_0x384f68, 0x0, 0x1c);
          }
          break;
        case 0x51:
          {
            log_r("IQ_GET_BOX_RGB_COLOR");
            var _0x4756cd = 0x1;
            _0x4756cd++;
            _0x384f68.device_info.kbd_light_info.light_box_info.mode = _0x153882[_0x4756cd++];
            _0x384f68.device_info.kbd_light_info.light_box_info.colored = _0x153882[_0x4756cd++];
            _0x384f68.device_info.kbd_light_info.light_box_info.brightness = _0x153882[_0x4756cd++];
            _0x384f68.device_info.kbd_light_info.light_box_info.speed = _0x153882[_0x4756cd++];
            _0x384f68.device_info.kbd_light_info.light_box_info.r = _0x153882[_0x4756cd++];
            _0x384f68.device_info.kbd_light_info.light_box_info.g = _0x153882[_0x4756cd++];
            _0x384f68.device_info.kbd_light_info.light_box_info.b = _0x153882[_0x4756cd++];
          }
          break;
        case 0x7:
          {
            if (_0x153882.length >= 0x4) {
              log_r("IQ_SET_CUSTOM:" + _0x153882);
              var _0x4a22d6 = _0x153882[0x2];
              if (_0x4a22d6 == 0x1) {
                _0x384f68.device_info.kbd_light_info.brightness = _0x153882[0x3];
              } else {
                if (_0x4a22d6 == 0x2) {
                  _0x384f68.device_info.kbd_light_info.mode = _0x153882[0x3];
                } else {
                  if (_0x4a22d6 == 0x3) {
                    _0x384f68.device_info.kbd_light_info.speed = _0x153882[0x3];
                  } else if (_0x4a22d6 == 0x4) {
                    _0x384f68.device_info.kbd_light_info.hue = _0x153882[0x3];
                    _0x384f68.device_info.kbd_light_info.sat = _0x153882[0x4];
                  }
                }
              }
            }
          }
          break;
        case 0x36:
          {
            log_r("IQ_GET_RGB_COLOR_BUF");
            var _0x42fa4d = _0x153882[0x1] << 0x8 | _0x153882[0x2];
            var _0x150e1a = _0x153882[0x3];
            for (var _0x2a7e82 = 0x0; _0x2a7e82 < _0x150e1a; _0x2a7e82 += 0x2) {
              var _0x20f47f = _0x153882[0x4 + _0x2a7e82];
              var _0x2457e3 = _0x153882[0x4 + _0x2a7e82 + 0x1];
              var _0x4756cd = (_0x42fa4d + _0x2a7e82) / 0x2;
              var _0x28b649 = _0x4d4688[_0x4756cd];
              kbd_lightinfo_list.push(kbd_create_key_light_info(_0x28b649.row, _0x28b649.col, _0x20f47f, _0x2457e3));
            }
            if (_0x42fa4d + _0x150e1a < _0x3bca37 * 0x2) {
              var _0x1fd16c = _0x3bca37 * 0x2 - _0x42fa4d - _0x150e1a;
              hs_get_light_buff(_0x384f68, _0x42fa4d + _0x150e1a, _0x1fd16c < 0x1c ? _0x1fd16c : 0x1c);
            } else {
              _0x384f68.device_info.kbd_light_info.keys = kbd_lightinfo_list.slice();
              kbd_lightinfo_list.splice(0x0, kbd_lightinfo_list.length);
              log_r("IQ_GET_RGB_COLOR_BUF finish");
              kbd_data_sync_index = kbd_data_sync_index | 0x2;
              hs_data_sync(_0x384f68);
              window.postMessage({
                'action': ACTION_UI_REFRESH_KBD_LIGHT
              });
            }
          }
          break;
        case 0x37:
          {
            log_r("IQ_SET_RGB_COLOR");
            if (_0x153882.length >= 0x5) {
              var _0x715fc = _0x153882[0x1];
              var _0x2eb05c = _0x153882[0x2];
              var _0x20f47f = _0x153882[0x3];
              var _0x2457e3 = _0x153882[0x4];
              for (var _0x2a7e82 = 0x0; _0x2a7e82 < _0x384f68.device_info.kbd_light_info.keys.length; _0x2a7e82++) {
                if (_0x715fc == _0x384f68.device_info.kbd_light_info.keys[_0x2a7e82].row && _0x2eb05c == _0x384f68.device_info.kbd_light_info.keys[_0x2a7e82].col) {
                  _0x384f68.device_info.kbd_light_info.keys[_0x2a7e82].hue = _0x20f47f;
                  _0x384f68.device_info.kbd_light_info.keys[_0x2a7e82].sat = _0x2457e3;
                  break;
                }
              }
              for (var _0x2a7e82 = 0x0; _0x2a7e82 < kbd_lightinfo_list.length; _0x2a7e82++) {
                if (_0x715fc == kbd_lightinfo_list[_0x2a7e82].row && _0x2eb05c == kbd_lightinfo_list[_0x2a7e82].col) {
                  kbd_lightinfo_list.splice(_0x2a7e82, 0x1);
                  break;
                }
              }
              if (kbd_lightinfo_list.length > 0x0) {
                hs_set_light_define(_0x384f68, kbd_lightinfo_list[0x0]);
              } else {
                he_custom_data_save(_0x384f68, 0x1);
                window.postMessage({
                  'action': ACTION_UI_REFRESH_KBD_LIGHT
                });
              }
            }
          }
          break;
        case 0x45:
          {
            log_r("IQ_GET_RT_BOOST_MODE");
            _0x384f68.device_info.kbd_axis_mode = _0x153882[0x1];
            kbd_axisinfo_list.splice(0x0, kbd_axisinfo_list.length);
            0x4;
            _0x384f68.device_info.kbd_axis_infos.splice(0x0, _0x384f68.device_info.kbd_axis_infos.length);
            hs_get_axis_info(_0x384f68, 0x0, 0x0);
          }
          break;
        case 0x46:
          {
            log_r("IQ_SET_RT_BOOST_MODE");
            _0x384f68.device_info.kbd_axis_mode = _0x153882[0x1];
          }
          break;
        case 0x1a:
          {
            log_r("IQ_GET_MAG_DATA");
            var _0x4756cd = 0x1;
            var _0x17a1d5 = kbd_create_axis_info();
            _0x17a1d5.row = _0x153882[_0x4756cd++];
            _0x17a1d5.col = _0x153882[_0x4756cd++];
            _0x17a1d5.rt_enable = _0x153882[_0x4756cd++];
            _0x17a1d5.top_dz = _0x153882[_0x4756cd++] << 0x8 | _0x153882[_0x4756cd++];
            _0x17a1d5.apc_lv = _0x153882[_0x4756cd++] << 0x8 | _0x153882[_0x4756cd++];
            _0x17a1d5.rt_press_lv = _0x153882[_0x4756cd++] << 0x8 | _0x153882[_0x4756cd++];
            _0x17a1d5.rt_release_lv = _0x153882[_0x4756cd++] << 0x8 | _0x153882[_0x4756cd++];
            _0x17a1d5.btm_dz = _0x153882[_0x4756cd++] << 0x8 | _0x153882[_0x4756cd++];
            _0x17a1d5.switch_type = _0x153882[_0x4756cd++];
            kbd_axisinfo_list.push(_0x17a1d5);
            if (kbd_axisinfo_list.length < _0x4d4688.length) {
              hs_get_axis_info(_0x384f68, _0x4d4688[kbd_axisinfo_list.length].row, _0x4d4688[kbd_axisinfo_list.length].col);
            } else {
              _0x384f68.device_info.kbd_axis_infos = kbd_axisinfo_list.slice();
              kbd_axisinfo_list.splice(0x0, kbd_axisinfo_list.length);
              kbd_data_sync_index = kbd_data_sync_index | 0x4;
              hs_data_sync(_0x384f68);
              log_r(_0x384f68.device_info.kbd_axis_infos);
              window.postMessage({
                'action': ACTION_UI_REFRESH_KBD_AXIS
              });
            }
          }
          break;
        case 0x19:
          {
            log_r("IQ_SET_MAG_DATA");
            if (_0x153882.length >= 0xe) {
              var _0x4756cd = 0x1;
              var _0x17a1d5 = kbd_create_axis_info();
              _0x17a1d5.row = _0x153882[_0x4756cd++];
              _0x17a1d5.col = _0x153882[_0x4756cd++];
              _0x17a1d5.rt_enable = _0x153882[_0x4756cd++];
              _0x17a1d5.top_dz = _0x153882[_0x4756cd++] << 0x8 | _0x153882[_0x4756cd++];
              _0x17a1d5.apc_lv = _0x153882[_0x4756cd++] << 0x8 | _0x153882[_0x4756cd++];
              _0x17a1d5.rt_press_lv = _0x153882[_0x4756cd++] << 0x8 | _0x153882[_0x4756cd++];
              _0x17a1d5.rt_release_lv = _0x153882[_0x4756cd++] << 0x8 | _0x153882[_0x4756cd++];
              _0x17a1d5.btm_dz = _0x153882[_0x4756cd++] << 0x8 | _0x153882[_0x4756cd++];
              _0x17a1d5.switch_type = _0x153882[_0x4756cd++];
              for (var _0x2a7e82 = 0x0; _0x2a7e82 < _0x384f68.device_info.kbd_axis_infos.length; _0x2a7e82++) {
                if (_0x17a1d5.row == _0x384f68.device_info.kbd_axis_infos[_0x2a7e82].row && _0x17a1d5.col == _0x384f68.device_info.kbd_axis_infos[_0x2a7e82].col) {
                  _0x384f68.device_info.kbd_axis_infos[_0x2a7e82] = _0x17a1d5;
                  break;
                }
              }
              for (var _0x2a7e82 = 0x0; _0x2a7e82 < kbd_axisinfo_list.length; _0x2a7e82++) {
                if (_0x17a1d5.row == kbd_axisinfo_list[_0x2a7e82].row && _0x17a1d5.col == kbd_axisinfo_list[_0x2a7e82].col) {
                  kbd_axisinfo_list.splice(_0x2a7e82, 0x1);
                  break;
                }
              }
              if (kbd_axisinfo_list.length > 0x0) {
                hs_set_axis_info(_0x384f68, kbd_axisinfo_list[0x0]);
              } else {
                he_custom_data_save(_0x384f68, 0x0);
                window.postMessage({
                  'action': ACTION_UI_REFRESH_KBD_AXIS
                });
              }
            }
          }
          break;
        case 0x1e:
          {
            log_r('IQ_GET_MAG_SOCD_NUM');
            _0x384f68.device_info.kbd_socd_num = _0x153882[0x1];
            _0x384f68.device_info.kbd_socd_infos.splice(0x0, _0x384f68.device_info.kbd_socd_infos.length);
            if (_0x384f68.device_info.kbd_socd_num > 0x0) {
              hs_get_socd_data(_0x384f68, 0x0);
            } else {
              hs_get_mt_num(_0x384f68);
            }
          }
          break;
        case 0x1f:
          {
            log_r('IQ_SET_MAG_SOCD_NUM');
            _0x384f68.device_info.kbd_socd_num = _0x153882[0x1];
            _0x384f68.device_info.kbd_socd_infos.splice(0x0, _0x384f68.device_info.kbd_socd_infos.length);
            if (_0x384f68.device_info.kbd_socd_num > 0x0) {
              for (var _0x2a7e82 = 0x0; _0x2a7e82 < kbd_socdinfo_list.length; _0x2a7e82++) {
                _0x384f68.device_info.kbd_socd_infos.push(kbd_clone_socd_info(kbd_socdinfo_list[_0x2a7e82]));
              }
              kbd_socdinfo_list.splice(0x0, kbd_socdinfo_list.length);
            }
            window.postMessage({
              'action': 'action_ui_refresh_kbd_advance_key'
            });
          }
          break;
        case 0x20:
          {
            log_r('IQ_GET_MAG_SOCD_DATA');
            if (_0x153882.length >= 0xa) {
              var _0x4a9bc7 = kbd_create_socd_info();
              _0x4a9bc7.id = _0x153882[0x1];
              _0x4a9bc7.row1 = _0x153882[0x2];
              _0x4a9bc7.col1 = _0x153882[0x3];
              _0x4a9bc7.row2 = _0x153882[0x4];
              _0x4a9bc7.col2 = _0x153882[0x5];
              _0x4a9bc7.socd_mode = _0x153882[0x6];
              _0x384f68.device_info.kbd_socd_infos.push(_0x4a9bc7);
              if (_0x4a9bc7.id < _0x384f68.device_info.kbd_socd_num - 0x1) {
                hs_get_socd_data(_0x384f68, _0x4a9bc7.id + 0x1);
              } else {
                hs_get_mt_num(_0x384f68);
                window.postMessage({
                  'action': 'action_ui_refresh_kbd_advance_key'
                });
              }
            }
          }
          break;
        case 0x21:
          {
            log_r("IQ_SET_MAG_SOCD_DATA");
            if (_0x153882.length >= 0xa) {
              var _0x50396c = _0x153882[0x1];
              if (_0x50396c < kbd_socdinfo_list.length - 0x1) {
                hs_set_socd_data(_0x384f68, kbd_socdinfo_list[_0x50396c + 0x1]);
              } else {
                hs_set_socd_num(_0x384f68, kbd_socdinfo_list.length);
              }
            }
          }
          break;
        case 0x22:
          {
            log_r("IQ_GET_MAG_MT_NUM");
            _0x384f68.device_info.kbd_mt_num = _0x153882[0x1];
            _0x384f68.device_info.kbd_mt_infos.splice(0x0, _0x384f68.device_info.kbd_mt_infos.length);
            if (_0x384f68.device_info.kbd_mt_num > 0x0) {
              hs_get_mt_data(_0x384f68, 0x0);
            } else {
              hs_get_rs_num(_0x384f68);
            }
          }
          break;
        case 0x23:
          {
            log_r("IQ_SET_MAG_MT_NUM");
            _0x384f68.device_info.kbd_mt_num = _0x153882[0x1];
            _0x384f68.device_info.kbd_mt_infos.splice(0x0, _0x384f68.device_info.kbd_mt_infos.length);
            if (_0x384f68.device_info.kbd_mt_num > 0x0) {
              for (var _0x2a7e82 = 0x0; _0x2a7e82 < kbd_mtinfo_list.length; _0x2a7e82++) {
                _0x384f68.device_info.kbd_mt_infos.push(kbd_clone_mt_info(kbd_mtinfo_list[_0x2a7e82]));
              }
              kbd_mtinfo_list.splice(0x0, kbd_mtinfo_list.length);
            }
            window.postMessage({
              'action': 'action_ui_refresh_kbd_advance_key'
            });
          }
          break;
        case 0x24:
          {
            log_r("IQ_GET_MAG_MT_DATA");
            if (_0x153882.length >= 0xa) {
              var _0x1d7947 = kbd_create_mt_info();
              _0x1d7947.id = _0x153882[0x1];
              _0x1d7947.row = _0x153882[0x2];
              _0x1d7947.col = _0x153882[0x3];
              _0x1d7947.tap_time = _0x153882[0x5] | _0x153882[0x4] << 0x8;
              _0x1d7947.keyCode1 = _0x153882[0x7] | _0x153882[0x6] << 0x8;
              _0x1d7947.keyCode2 = _0x153882[0x9] | _0x153882[0x8] << 0x8;
              _0x384f68.device_info.kbd_mt_infos.push(_0x1d7947);
              log_r(_0x384f68.device_info.kbd_mt_infos);
              if (_0x1d7947.id < _0x384f68.device_info.kbd_mt_num - 0x1) {
                hs_get_mt_data(_0x384f68, _0x1d7947.id + 0x1);
              } else {
                hs_get_rs_num(_0x384f68);
                window.postMessage({
                  'action': 'action_ui_refresh_kbd_advance_key'
                });
              }
            }
          }
          break;
        case 0x25:
          {
            log_r("IQ_SET_MAG_MT_DATA");
            if (_0x153882.length >= 0xa) {
              var _0x50396c = _0x153882[0x1];
              if (_0x50396c < kbd_mtinfo_list.length - 0x1) {
                hs_set_mt_data(_0x384f68, kbd_mtinfo_list[_0x50396c + 0x1]);
              } else {
                hs_set_mt_num(_0x384f68, kbd_mtinfo_list.length);
              }
            }
          }
          break;
        case 0x2e:
          {
            log_r("IQ_GET_MAG_RS_NUM");
            _0x384f68.device_info.kbd_rs_num = _0x153882[0x1];
            _0x384f68.device_info.kbd_rs_infos.splice(0x0, _0x384f68.device_info.kbd_rs_infos.length);
            if (_0x384f68.device_info.kbd_rs_num > 0x0) {
              hs_get_rs_data(_0x384f68, 0x0);
            } else {
              hs_get_dks_num(_0x384f68);
            }
          }
          break;
        case 0x2f:
          {
            log_r("IQ_SET_MAG_RS_NUM");
            _0x384f68.device_info.kbd_rs_num = _0x153882[0x1];
            _0x384f68.device_info.kbd_rs_infos.splice(0x0, _0x384f68.device_info.kbd_rs_infos.length);
            if (_0x384f68.device_info.kbd_rs_num > 0x0) {
              for (var _0x2a7e82 = 0x0; _0x2a7e82 < kbd_rsinfo_list.length; _0x2a7e82++) {
                _0x384f68.device_info.kbd_rs_infos.push(kbd_clone_socd_info(kbd_rsinfo_list[_0x2a7e82]));
              }
              kbd_rsinfo_list.splice(0x0, kbd_rsinfo_list.length);
            }
            window.postMessage({
              'action': 'action_ui_refresh_kbd_advance_key'
            });
          }
          break;
        case 0x30:
          {
            log_r("IQ_GET_MAG_RS_DATA");
            if (_0x153882.length >= 0xa) {
              var _0x1ba15b = kbd_create_rs_info();
              _0x1ba15b.id = _0x153882[0x1];
              _0x1ba15b.row1 = _0x153882[0x2];
              _0x1ba15b.col1 = _0x153882[0x3];
              _0x1ba15b.row2 = _0x153882[0x4];
              _0x1ba15b.col2 = _0x153882[0x5];
              _0x384f68.device_info.kbd_rs_infos.push(_0x1ba15b);
              if (_0x1ba15b.id < _0x384f68.device_info.kbd_rs_num - 0x1) {
                hs_get_rs_data(_0x384f68, _0x1ba15b.id + 0x1);
              } else {
                hs_get_dks_num(_0x384f68);
                window.postMessage({
                  'action': 'action_ui_refresh_kbd_advance_key'
                });
              }
            }
          }
          break;
        case 0x31:
          {
            log_r("IQ_SET_MAG_RS_DATA");
            if (_0x153882.length >= 0xa) {
              var _0x50396c = _0x153882[0x1];
              if (_0x50396c < kbd_rsinfo_list.length - 0x1) {
                hs_set_rs_data(_0x384f68, kbd_rsinfo_list[_0x50396c + 0x1]);
              } else {
                hs_set_rs_num(_0x384f68, kbd_rsinfo_list.length);
              }
            }
          }
          break;
        case 0x2a:
          {
            log_r('IQ_GET_MAG_DKS_NUM');
            _0x384f68.device_info.kbd_dks_num = _0x153882[0x1];
            _0x384f68.device_info.kbd_dks_infos.splice(0x0, _0x384f68.device_info.kbd_dks_infos.length);
            if (_0x384f68.device_info.kbd_dks_num > 0x0) {
              hs_get_dks_data(_0x384f68, 0x0);
            } else {
              kbd_data_sync_index = kbd_data_sync_index | 0x8;
              hs_data_sync(_0x384f68);
              window.postMessage({
                'action': 'action_ui_refresh_kbd_advance_key'
              });
            }
          }
          break;
        case 0x2b:
          {
            log_r("IQ_SET_MAG_DKS_NUM");
            _0x384f68.device_info.kbd_dks_num = _0x153882[0x1];
            _0x384f68.device_info.kbd_dks_infos.splice(0x0, _0x384f68.device_info.kbd_dks_infos.length);
            if (_0x384f68.device_info.kbd_dks_num > 0x0) {
              for (var _0x2a7e82 = 0x0; _0x2a7e82 < kbd_dksinfo_list.length; _0x2a7e82++) {
                _0x384f68.device_info.kbd_dks_infos.push(kbd_clone_dks_info(kbd_dksinfo_list[_0x2a7e82]));
              }
              kbd_dksinfo_list.splice(0x0, kbd_dksinfo_list.length);
            }
            log_r(_0x384f68.device_info.kbd_dks_infos);
            window.postMessage({
              'action': 'action_ui_refresh_kbd_advance_key'
            });
          }
          break;
        case 0x2c:
          {
            log_r('IQ_GET_MAG_DKS_DATA');
            if (_0x153882.length >= 0x14) {
              var _0x45bd7d = kbd_create_dks_info();
              _0x45bd7d.id = _0x153882[0x1];
              _0x45bd7d.row = _0x153882[0x2];
              _0x45bd7d.col = _0x153882[0x3];
              _0x45bd7d.keyCode1 = _0x153882[0x5] | _0x153882[0x4] << 0x8;
              _0x45bd7d.state1 = _0x153882[0x7] | _0x153882[0x6] << 0x8;
              _0x45bd7d.keyCode2 = _0x153882[0x9] | _0x153882[0x8] << 0x8;
              _0x45bd7d.state2 = _0x153882[0xb] | _0x153882[0xa] << 0x8;
              _0x45bd7d.keyCode3 = _0x153882[0xd] | _0x153882[0xc] << 0x8;
              _0x45bd7d.state3 = _0x153882[0xf] | _0x153882[0xe] << 0x8;
              _0x45bd7d.keyCode4 = _0x153882[0x11] | _0x153882[0x10] << 0x8;
              _0x45bd7d.state4 = _0x153882[0x13] | _0x153882[0x12] << 0x8;
              _0x384f68.device_info.kbd_dks_infos.push(_0x45bd7d);
              if (_0x45bd7d.id < _0x384f68.device_info.kbd_dks_num - 0x1) {
                hs_get_dks_data(_0x384f68, _0x45bd7d.id + 0x1);
              } else {
                kbd_data_sync_index = kbd_data_sync_index | 0x8;
                hs_data_sync(_0x384f68);
                window.postMessage({
                  'action': 'action_ui_refresh_kbd_advance_key'
                });
              }
            }
          }
          break;
        case 0x2d:
          {
            log_r("IQ_SET_MAG_DKS_DATA");
            if (_0x153882.length >= 0x14) {
              var _0x50396c = _0x153882[0x1];
              if (_0x50396c < kbd_dksinfo_list.length - 0x1) {
                hs_set_dks_data(_0x384f68, kbd_dksinfo_list[_0x50396c + 0x1]);
              } else {
                hs_set_dks_num(_0x384f68, kbd_dksinfo_list.length);
              }
            }
          }
          break;
      }
      if (!_0x384f68.syncing) {
        _0x384f68.recv_buf = skip_recv_buf(_0x384f68.recv_buf, 0x20);
        _0x3933df = true;
      }
    }
  } while (_0x3933df);
}
