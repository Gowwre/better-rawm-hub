function hs_recv(_0x578cc5, _0x52e597) {
  if (_0x578cc5.eplapsed_syncing_ms != 0x0 && new Date().getTime() - _0x578cc5.eplapsed_syncing_ms > 0x3e8) {
    if (_0x578cc5.syncing) {
      log_r(">>>>>>>>sync success");
      _0x578cc5.syncing = false;
    }
    _0x578cc5.recv_buf = new Uint8Array(0x0);
  }
  _0x578cc5.eplapsed_syncing_ms = new Date().getTime();
  var _0x298d90 = new Uint8Array(_0x578cc5.recv_buf.byteLength + _0x52e597.byteLength);
  _0x298d90.set(_0x578cc5.recv_buf);
  _0x298d90.set(_0x52e597, _0x578cc5.recv_buf.byteLength);
  _0x578cc5.recv_buf = _0x298d90;
  if (!_0x578cc5.syncing) {
    hs_parse_cmd(_0x578cc5);
  }
}
async function hs_device_receive_data({
  device: _0x1ba2ae,
  reportId: _0x1c937f,
  data: _0x249172
}) {
  usb_client_list.forEach(_0x2d4e0b => {
    if (_0x2d4e0b.device == _0x1ba2ae && !_0x2d4e0b.virtual) {
      var _0x550754 = new Uint8Array(_0x249172.buffer);
      hs_recv(_0x2d4e0b, _0x550754);
    }
  });
}
function read_event(_0x4bd89e, _0x25c4bc) {
  console.log("[DEBUG] read_event", "client=", _0x4bd89e?.id, "size=", _0x25c4bc, "send_event_buf.len=", _0x4bd89e?.send_event_buf?.byteLength, "pause=", _0x4bd89e?.pause);
  var _0x3c9329 = new Uint8Array(_0x25c4bc);
  if (_0x4bd89e.pause) {
    _0x3c9329[0x0] = 0;
  } else {
    var _0x425af7 = _0x4bd89e.send_event_buf.byteLength;
    if (_0x425af7 <= _0x25c4bc - 0x1) {
      _0x3c9329[0x0] = 0x80 | _0x425af7 & 0xff;
      _0x3c9329.set(_0x4bd89e.send_event_buf, 0x1);
      _0x4bd89e.send_event_buf = new Uint8Array(0x0);
    } else {
      _0x3c9329[0x0] = 0x80 | _0x25c4bc - 0x1 & 0xff;
      _0x3c9329.set(_0x4bd89e.send_event_buf.subarray(0x0, _0x25c4bc - 0x1), 0x1);
      _0x4bd89e.send_event_buf = _0x4bd89e.send_event_buf.subarray(_0x25c4bc - 0x1);
    }
  }
  return _0x3c9329;
}
let timeoutID = {};
function post_send_client_data(_0x3a954b) {
  if (typeof timeoutID[_0x3a954b.id] === "number") {
    clearTimeout(timeoutID[_0x3a954b.id]);
  }
  timeoutID[_0x3a954b.id] = setTimeout(_0x1260be => {
    window.postMessage({
      'action': ACTION_SEND_CLIENT_DATA,
      'usb_client_id': _0x1260be
    });
  }, 0x19, _0x3a954b.id);
}
async function send_client_data(_0x2d025f) {
  console.log("[DEBUG] send_client_data", "client=", _0x2d025f?.id, "allow_send=", _0x2d025f?.allow_send, "virtual=", _0x2d025f?.virtual, "helloed=", _0x2d025f?.helloed, "connected=", _0x2d025f?.connected);
  if (is_hs_keyboard(_0x2d025f.device)) {
    hs_send_client_data(_0x2d025f);
    return;
  }
  try {
    if (_0x2d025f.allow_send) {
      var _0x16757c;
      var _0xe85b13;
      var _0x16f40f = _0x2d025f.product_esb_ch;
      if (_0x16f40f == 0xff) {
        _0x16757c = read_event(_0x2d025f, 0x40);
        _0xe85b13 = _0x16757c[0x0] & 0x3f;
      } else {
        _0x16757c = read_event(_0x2d025f, 63.00000000000001);
        _0xe85b13 = _0x16757c[0x0] & 0x3f;
        var _0x3a7240 = Array.from(_0x16757c);
        _0x3a7240.unshift(0xc0 | _0x16f40f);
        while (_0x3a7240.length < 0x40) {
          _0x3a7240.push(0x0);
        }
        _0x16757c = new Uint8Array(_0x3a7240);
      }
      if (_0xe85b13 > 0x0) {
        var _hexDebug = Array.from(_0x16757c).slice(0,16).map(function(b) { return b.toString(16).padStart(2,'0'); }).join(' ');
        console.log("[HEX-ORIG] sendReport client=" + (_0x2d025f.id || '').substring(0,8) + " virtual=" + _0x2d025f.virtual + " esb_ch=" + _0x2d025f.product_esb_ch + " data_len=" + _0xe85b13 + " hex=" + _hexDebug);
        var _0x944c54 = _0x2d025f.device;
        if (!_0x944c54.opened) {
          await _0x944c54.open();
        }
        await _0x944c54.sendReport(0x0, _0x16757c);
        if (_0x2d025f.virtual) {
          var _0x442c7b = false;
          usb_client_list.forEach(_0x28f69f => {
            if (is_receiver(_0x28f69f) && _0x28f69f.device == _0x2d025f.device) {
              _0x442c7b = is_limit_memory(_0x28f69f);
            }
          });
          if (_0x442c7b) {
            _0x2d025f.allow_send = false;
          }
        }
        post_send_client_data(_0x2d025f);
      }
    } else {
      if (_0x2d025f.virtual) {
        var _0x442c7b = false;
        usb_client_list.forEach(_0x47a7fd => {
          if (is_receiver(_0x47a7fd) && _0x47a7fd.device == _0x2d025f.device) {
            _0x442c7b = is_limit_memory(_0x47a7fd);
          }
        });
        if (_0x442c7b) {
          var _0x16757c = new Uint8Array(0x1);
          var _0x16f40f = _0x2d025f.product_esb_ch;
          _0x16757c[0x0] = 64;
          var _0x3a7240 = Array.from(_0x16757c);
          _0x3a7240.unshift(0xc0 | _0x16f40f);
          while (_0x3a7240.length < 0x40) {
            _0x3a7240.push(0x0);
          }
          _0x16757c = new Uint8Array(_0x3a7240);
          var _0x944c54 = _0x2d025f.device;
          if (!_0x944c54.opened) {
            await _0x944c54.open();
          }
          await _0x944c54.sendReport(0x0, _0x16757c);
        }
      }
      post_send_client_data(_0x2d025f);
    }
  } catch (_0x48dc88) {
    console.log("[DEBUG] send_client_data -> ERROR", _0x48dc88);
    log_r(_0x48dc88);
  }
}
// ===== CORE HID PROTOCOL: SEND / CRC / PARSE ================================
// These functions implement the RAWM USB HID protocol used for mice and
// receivers (non‑HS keyboards). The protocol frame format:
//   byte 0: length (top nibble) | flags (bottom nibble)
//   byte 1: length (low byte)
//   bytes 2+: payload
//   (optional CRC suffix when crcSupported is true)
//
// send_event() appends a data frame to the client's send buffer and triggers
// a delayed send via post_send_client_data().
//
// crc16_compute() calculates CRC‑16 over the payload.
// crc_process() wraps the payload with length prefix and optional CRC.
//
// parse_cmd() reads incoming data from the firmware — the main switch
// dispatches on the type field (byte 4 & 0xf):
//   0x2 — device info JSON (hello)
//   0xb — parameter responses (resolution, polling rate, LOD, battery…)
//   0xe — ping / squal / wireless quality
//   0x7 — sync request
// ============================================================================
function send_event(_0x37e146, _0x1896bc) {
  var _0x5dcc74 = new Uint8Array(_0x37e146.send_event_buf.byteLength + _0x1896bc.byteLength);
  _0x5dcc74.set(_0x37e146.send_event_buf);
  _0x5dcc74.set(_0x1896bc, _0x37e146.send_event_buf.byteLength);
  _0x37e146.send_event_buf = _0x5dcc74;
  post_send_client_data(_0x37e146);
}

// CRC‑16 computation over a byte array (used in crc_process)
function crc16_compute(_0x125351, _0x1b4843) {
  var _0xb6238a = 0xffff;
  for (var _0x5a155a = 0x0; _0x5a155a < _0x1b4843; _0x5a155a++) {
    _0xb6238a = _0xb6238a >> 0x8 & 0xff | _0xb6238a << 0x8;
    _0xb6238a ^= _0x125351[_0x5a155a];
    _0xb6238a ^= (_0xb6238a & 0xff) >> 0x4;
    _0xb6238a ^= _0xb6238a << 0x8 << 0x4;
    _0xb6238a ^= (_0xb6238a & 0xff) << 0x4 << 0x1;
  }
  return _0xb6238a;
}
function crc_process(_0x581d2b, _0x121429) {
  var _0x3c73ae = new Uint8Array(_0x121429);
  var _0x5ef20b = _0x3c73ae.byteLength;
  _0x3c73ae[0x0] = (_0x5ef20b >> 0x4 & 0xf0 | _0x3c73ae[0x0]) & 0xff;
  _0x3c73ae[0x1] = _0x5ef20b & 0xff & 0xff;
  var _crcDebug = Array.from(_0x3c73ae).slice(0,10).map(function(b) { return b.toString(16).padStart(2,'0'); }).join(' ');
  console.log("[CRC-ORIG] crc_process v=" + _0x5ef20b + " crcSupported=" + (_0x581d2b.device_info != undefined && _0x581d2b.device_info.crcSupported) + " original[0]=" + (_0x3c73ae[0x0].toString(16)) + " hex=" + _crcDebug);
  if (_0x581d2b.device_info != undefined && _0x581d2b.device_info.crcSupported) {
    var _0x4ab810 = _0x5ef20b + 0x5;
    var _0xd28464 = crc16_compute(_0x3c73ae, _0x5ef20b);
    var _0x795c90 = new Uint8Array(_0x4ab810);
    _0x795c90[0x0] = (_0x4ab810 >> 0x4 & 0xf0 | 0x3) & 0xff;
    _0x795c90[0x1] = _0x4ab810 & 0xff & 0xff;
    _0x795c90[0x2] = 0x24;
    _0x795c90[0x3] = _0xd28464 & 0xff;
    _0x795c90[0x4] = _0xd28464 >> 0x8 & 0xff;
    _0x795c90.set(_0x3c73ae, 0x5);
    return _0x795c90;
  }
  return _0x3c73ae;
}
function send_event_query(_0x9aa45f) {
  if (is_hs_keyboard(_0x9aa45f.device)) {
    hs_get_firmware_version(_0x9aa45f);
    return;
  }
  var _0x435496 = [];
  _0x435496.push(0x1);
  _0x435496.push(0x0);
  _0x435496.push(0x3);
  _0x435496.push(0x0);
  _0x435496.push(0x0);
  var _0x329c30 = parseInt(new Date().getTime() / 0x3e8);
  _0x435496.push(_0x329c30 & 0xff);
  _0x329c30 = _0x329c30 / 0x100;
  _0x435496.push(_0x329c30 & 0xff);
  _0x329c30 = _0x329c30 / 0x100;
  _0x435496.push(_0x329c30 & 0xff);
  _0x329c30 = _0x329c30 / 0x100;
  _0x435496.push(_0x329c30 & 0xff);
  _0x329c30 = _0x329c30 / 0x100;
  _0x435496.push(_0x329c30 & 0xff);
  _0x329c30 = _0x329c30 / 0x100;
  _0x435496.push(_0x329c30 & 0xff);
  _0x329c30 = _0x329c30 / 0x100;
  _0x435496.push(_0x329c30 & 0xff);
  _0x329c30 = _0x329c30 / 0x100;
  _0x435496.push(_0x329c30 & 0xff);
  _0x329c30 = _0x329c30 / 0x100;
  send_event(_0x9aa45f, crc_process(_0x9aa45f, _0x435496));
  _0x9aa45f.last_query_time = new Date().getTime();
  if (!is_receiver(_0x9aa45f)) {
    _0x9aa45f.querying_more_result = true;
  }
}
function send_event_action(_0x172939, _0x1451af, _0x5ac3c3) {
  console.log("[DEBUG] send_event_action", "client=", _0x172939?.id, "action=", _0x1451af, "value=", _0x5ac3c3, "helloed=", _0x172939?.helloed, "connected=", _0x172939?.connected);
  console.log("[TRACE-ORIG] send_event_action client=" + (_0x172939?.id || '').substring(0,8) + " action=" + _0x1451af + " value=" + _0x5ac3c3);
  var _0x168f0b = [];
  _0x168f0b.push(0x6);
  _0x168f0b.push(0x0);
  _0x168f0b.push(_0x1451af);
  _0x168f0b.push(_0x5ac3c3 & 0xff);
  _0x168f0b.push(_0x5ac3c3 >> 0x8 & 0xff);
  _0x168f0b.push(_0x5ac3c3 >> 0x10 & 0xff);
  _0x168f0b.push(_0x5ac3c3 >> 0x18 & 0xff);
  send_event(_0x172939, crc_process(_0x172939, _0x168f0b));
  if (_0x1451af == 0x34 && _0x5ac3c3 == 0x0 && !is_receiver(_0x172939)) {
    _0x172939.querying_more_result = true;
    _0x172939.last_query_time = new Date().getTime();
  }
}
function send_event_ping(_0x4c25e8, _0xa58372, _0x39e088 = true) {
  if (_0x4c25e8 != undefined ? is_hs_keyboard(_0x4c25e8.device) : false) {
    return;
  }
  var _0x211ea8 = [];
  _0x211ea8.push(0xe);
  _0x211ea8.push(0x0);
  _0x211ea8.push(_0xa58372 ? 0x1 : 0x0);
  if (_0x39e088) {
    const _0x4604b5 = new TextEncoder().encode(SYNC_DATA);
    _0x211ea8.push(_0x4604b5);
  }
  send_event(_0x4c25e8, crc_process(_0x4c25e8, _0x211ea8));
}
function send_event_select_esb_addr(_0xcbb743, _0x1823c1) {
  var _0x1a9c47 = [];
  _0x1a9c47.push(0x3);
  _0x1a9c47.push(0x0);
  _0x1a9c47.push(0x1e);
  for (var _0x2298d5 = 0x0; _0x2298d5 < _0x1823c1.length; _0x2298d5 += 0x2) {
    _0x1a9c47.push(parseInt(_0x1823c1.substr(_0x2298d5, 0x2), 0x10) & 0xff);
  }
  send_event(_0xcbb743, crc_process(_0xcbb743, _0x1a9c47));
}
function send_event_clear_esb_addr(_0x342870, _0xa8769f) {
  var _0x136d1c = [];
  _0x136d1c.push(0x3);
  _0x136d1c.push(0x0);
  _0x136d1c.push(0x1d);
  for (var _0x188fd9 = 0x0; _0x188fd9 < _0xa8769f.length; _0x188fd9 += 0x2) {
    _0x136d1c.push(parseInt(_0xa8769f.substr(_0x188fd9, 0x2), 0x10) & 0xff);
  }
  send_event(_0x342870, crc_process(_0x342870, _0x136d1c));
}
function send_event_set_esb_addr(_0x2e58bf, _0x3a0576, _0x4ac8e8, _0x40235e) {
  var _0x352523 = [];
  _0x352523.push(0x3);
  _0x352523.push(0x0);
  _0x352523.push(0x1c);
  for (var _0x3309a5 = 0x0; _0x3309a5 < _0x3a0576.length; _0x3309a5 += 0x2) {
    _0x352523.push(parseInt(_0x3a0576.substr(_0x3309a5, 0x2), 0x10) & 0xff);
  }
  _0x352523.push(_0x4ac8e8);
  _0x352523.push(_0x40235e ? 0x1 : 0x0);
  send_event(_0x2e58bf, crc_process(_0x2e58bf, _0x352523));
}
function send_event_sync(_0x5c2105) {
  var _0x5e1440 = [];
  _0x5e1440.push(0x7);
  _0x5e1440.push(0x0);
  send_event(_0x5c2105, crc_process(_0x5c2105, _0x5e1440));
}
function send_event_set_color_code(_0x50f7bf, _0x285834) {
  var _0x26d20d = [];
  _0x26d20d.push(0x3);
  _0x26d20d.push(0x0);
  _0x26d20d.push(0x1f);
  var _0xb68b02 = new TextEncoder().encode(_0x285834);
  for (var _0x28156a = 0x0; _0x28156a < _0xb68b02.byteLength && _0x28156a < 0x10; _0x28156a++) {
    _0x26d20d.push(_0xb68b02[_0x28156a]);
  }
  for (var _0x28156a = _0xb68b02.byteLength; _0x28156a < 0x10; _0x28156a++) {
    _0x26d20d.push(0x0);
  }
  send_event(_0x50f7bf, crc_process(_0x50f7bf, _0x26d20d));
}
function send_event_set_sleep_time(_0x2b4253, _0x23c58a) {
  if (_0x2b4253.device_info.sleepTime != _0x23c58a) {
    _0x2b4253.device_info.sleepTime = _0x23c58a;
    var _0x30fea3 = [];
    _0x30fea3.push(0x3);
    _0x30fea3.push(0x0);
    _0x30fea3.push(0x21);
    _0x30fea3.push(_0x23c58a & 0xff);
    _0x30fea3.push(_0x23c58a >> 0x8 & 0xff);
    send_event(_0x2b4253, crc_process(_0x2b4253, _0x30fea3));
    clearTimeout(upload_mouse_config_timer);
    upload_mouse_config_timer = setTimeout(upload_mouse_config_delayed, 0x3e8, _0x2b4253, _0x2b4253.device_info != undefined && _0x2b4253.device_info.revision != undefined && _0x2b4253.device_info.revision.substr(0x0, 0x2) == 'G-' ? 0x1 : 0x0, _0x23c58a);
  }
}
function send_event_set_rf_channel(_0x1523e2, _0x13e7bf) {
  var _0xc8ce83 = [];
  _0xc8ce83.push(0x3);
  _0xc8ce83.push(0x0);
  _0xc8ce83.push(0x23);
  _0xc8ce83.push(_0x13e7bf);
  send_event(_0x1523e2, crc_process(_0x1523e2, _0xc8ce83));
  _0x1523e2.device_info.rfChannel = _0x13e7bf;
}
function send_event_set_auto_hop(_0x266269, _0xb95c9a) {
  var _0x1109b9 = [];
  _0x1109b9.push(0x3);
  _0x1109b9.push(0x0);
  _0x1109b9.push(0x32);
  _0x1109b9.push(_0xb95c9a ? 0x1 : 0x0);
  send_event(_0x266269, crc_process(_0x266269, _0x1109b9));
  _0x266269.device_info.hopChannel = _0xb95c9a;
}
function send_event_mouse_param(_0x52df89) {
  var _0x529efa = _0x52df89.device_info;
  var _0x5b81e4 = [];
  _0x5b81e4.push(0x3);
  _0x5b81e4.push(0x0);
  _0x5b81e4.push(0x15);
  if ((_0x529efa.resolution & 0xffff0000) == 0x0) {
    _0x5b81e4.push(_0x529efa.resolution & 0xff);
    _0x5b81e4.push(_0x529efa.resolution >> 0x8 & 0xff);
  } else {
    _0x5b81e4.push(0x0);
    _0x5b81e4.push(0x0);
  }
  _0x5b81e4.push(_0x529efa.pollingRate & 0xff);
  _0x5b81e4.push(_0x529efa.pollingRate >> 0x8 & 0xff);
  _0x5b81e4.push(_0x529efa.light);
  var _0x51ffdf = false;
  _0x529efa.cpiLevels.forEach(_0x58a4cc => {
    if ((_0x58a4cc & 0xffff0000) != 0x0) {
      _0x51ffdf = true;
    }
  });
  if (_0x51ffdf) {
    _0x5b81e4.push(0x0);
  } else {
    _0x5b81e4.push(_0x529efa.cpiLevels.length);
    _0x529efa.cpiLevels.forEach(_0x2811b9 => {
      _0x5b81e4.push(_0x2811b9 & 0xff);
      _0x5b81e4.push(_0x2811b9 >> 0x8 & 0xff);
    });
  }
  _0x5b81e4.push(_0x529efa.onboard);
  _0x5b81e4.push(_0x529efa.powerMode);
  if ((_0x529efa.resolution & 0xffff0000) == 0x0) {
    _0x5b81e4.push(0x0);
    _0x5b81e4.push(0x0);
    _0x5b81e4.push(0x0);
    _0x5b81e4.push(0x0);
  } else {
    _0x5b81e4.push(_0x529efa.resolution & 0xff);
    _0x5b81e4.push(_0x529efa.resolution >> 0x8 & 0xff);
    _0x5b81e4.push(_0x529efa.resolution >> 0x10 & 0xff);
    _0x5b81e4.push(_0x529efa.resolution >> 0x18 & 0xff);
  }
  if (!_0x51ffdf) {
    _0x5b81e4.push(0x0);
  } else {
    _0x5b81e4.push(_0x529efa.cpiLevels.length);
    _0x529efa.cpiLevels.forEach(_0x136a6e => {
      _0x5b81e4.push(_0x136a6e & 0xff);
      _0x5b81e4.push(_0x136a6e >> 0x8 & 0xff);
      _0x5b81e4.push(_0x136a6e >> 0x10 & 0xff);
      _0x5b81e4.push(_0x136a6e >> 0x18 & 0xff);
    });
  }
  _0x5b81e4.push(_0x529efa.lod);
  _0x5b81e4.push(_0x529efa.keyDelay.length);
  _0x529efa.keyDelay.forEach(_0x15f536 => {
    _0x5b81e4.push(_0x15f536);
  });
  _0x5b81e4.push(_0x529efa.motionSync);
  _0x5b81e4.push(_0x529efa.angleTuning);
  _0x5b81e4.push(_0x529efa.angleSnapping);
  _0x5b81e4.push(_0x529efa.rippleControl);
  _0x5b81e4.push(_0x529efa.cpiLevelColors.length);
  _0x529efa.cpiLevelColors.forEach(_0x3c3da8 => {
    _0x5b81e4.push(_0x3c3da8 & 0x7);
  });
  _0x5b81e4.push(_0x529efa.txOutputPower);
  _0x5b81e4.push(_0x529efa.batteryLevels.length);
  _0x529efa.batteryLevels.forEach(_0x4133c3 => {
    _0x5b81e4.push(_0x4133c3 & 0xff);
    _0x5b81e4.push(_0x4133c3 >> 0x8 & 0xff);
  });
  _0x5b81e4.push(_0x529efa.autoTxPower);
  _0x5b81e4.push(_0x529efa.onboardStatus.length);
  _0x529efa.onboardStatus.forEach(_0x43561f => {
    _0x5b81e4.push(_0x43561f);
  });
  _0x5b81e4.push(_0x529efa.glassModeEnabled);
  send_event(_0x52df89, crc_process(_0x52df89, _0x5b81e4));
  clearTimeout(upload_mouse_config_timer);
  upload_mouse_config_timer = setTimeout(upload_mouse_config_delayed, 0x3e8, _0x52df89, _0x52df89.device_info != undefined && _0x52df89.device_info.revision != undefined && _0x52df89.device_info.revision.substr(0x0, 0x2) == 'G-' ? 0x1 : 0x0, _0x529efa.sleepTime);
}
function send_event_mouse_key(_0x188370, _0x5cee3d, _0x37b035, _0x29910b, _0xeeae14, _0x4f6b14) {
  var _0x363d4e = [];
  _0x363d4e.push(0x3);
  _0x363d4e.push(0x0);
  _0x363d4e.push(0x16);
  _0x363d4e.push(_0x5cee3d.length);
  _0x5cee3d.forEach(_0x4fa011 => {
    _0x363d4e.push(_0x4fa011);
  });
  _0x363d4e.push(_0x37b035);
  _0x363d4e.push(_0xeeae14);
  _0x363d4e.push(_0x4f6b14);
  _0x363d4e.push(_0x29910b);
  _0x363d4e.push(0x0);
  send_event(_0x188370, crc_process(_0x188370, _0x363d4e));
}
function send_event_mouse_function(_0x31b389, _0x34fe46, _0x855f62, _0x331d87, _0x70675b, _0x45156a) {
  var _0x5d1f25 = [];
  _0x5d1f25.push(0x3);
  _0x5d1f25.push(0x0);
  _0x5d1f25.push(0x18);
  _0x5d1f25.push(_0x34fe46.length);
  _0x34fe46.forEach(_0x2258ff => {
    _0x5d1f25.push(_0x2258ff);
  });
  _0x5d1f25.push(_0x855f62);
  _0x5d1f25.push(_0x331d87);
  _0x5d1f25.push(_0x70675b & 0xff);
  _0x5d1f25.push(_0x70675b >> 0x8 & 0xff);
  _0x5d1f25.push(0x0);
  _0x5d1f25.push(_0x45156a.length & 0xff);
  _0x5d1f25.push(_0x45156a.length >> 0x8 & 0xff);
  for (var _0x45abdb = 0x0; _0x45abdb < _0x45156a.length; _0x45abdb++) {
    _0x5d1f25.push(_0x45156a.charCodeAt(_0x45abdb));
  }
  send_event(_0x31b389, crc_process(_0x31b389, _0x5d1f25));
}
function send_event_config_macro(_0x5aea9f, _0x2bd2a6, _0x5d31aa, _0x52307d, _0x408bf5, _0x1c3e42, _0x545a56, _0x45a4a1) {
  for (var _0xe56c53 = 0x0; _0xe56c53 < _0x1c3e42.length; _0xe56c53 += _0x45a4a1) {
    var _0x50556a = [];
    _0x50556a.push(0x3);
    _0x50556a.push(0x0);
    _0x50556a.push(_0xe56c53 == 0x0 ? 0x5 : 0x2b);
    _0x50556a.push(_0x2bd2a6.length);
    _0x2bd2a6.forEach(_0x4544e7 => {
      _0x50556a.push(_0x4544e7);
    });
    _0x50556a.push(_0x5d31aa);
    _0x50556a.push(_0x408bf5);
    _0x50556a.push(_0x1c3e42.length - _0xe56c53 >= _0x45a4a1 ? _0x45a4a1 : _0x1c3e42.length - _0xe56c53);
    for (var _0x3062d6 = _0xe56c53; _0x3062d6 < _0xe56c53 + _0x45a4a1 && _0x3062d6 < _0x1c3e42.length; _0x3062d6++) {
      var _0x5e44e1 = _0x1c3e42[_0x3062d6];
      _0x50556a.push(_0x5e44e1.x & 0xff);
      _0x50556a.push(_0x5e44e1.x >> 0x8 & 0xff);
      _0x50556a.push(_0x5e44e1.y & 0xff);
      _0x50556a.push(_0x5e44e1.y >> 0x8 & 0xff);
      _0x50556a.push(_0x5e44e1.interval_time & 0xff);
      _0x50556a.push(_0x5e44e1.interval_time >> 0x8 & 0xff);
      _0x50556a.push(_0x5e44e1.continue_time & 0xff);
      _0x50556a.push(_0x5e44e1.continue_time >> 0x8 & 0xff);
      _0x50556a.push(_0x5e44e1.style);
      if (_0x5e44e1.style == 0x0) {
        _0x50556a.push(0x0);
      } else {
        if (_0x5e44e1.style == 0x16) {
          var _0x32a3c8 = 0x0;
          var _0x246d6a = _0x5e44e1.mouse_key_code;
          if (_0x5e44e1.mouse_key_event == 0x200) {
            _0x32a3c8 = 0x2;
          } else {
            if (_0x5e44e1.mouse_key_event == 0x2ff) {
              _0x32a3c8 = 0x6;
            } else {
              if (_0x5e44e1.mouse_key_event == 0x20a) {
                _0x32a3c8 = 0x3;
              } else {
                if (_0x5e44e1.mouse_key_event == 0x20e) {
                  _0x32a3c8 = 0x5;
                } else {
                  _0x246d6a = get_scan_code(_0x5e44e1.mouse_key_code);
                  if (_0x246d6a < 0xff) {
                    _0x32a3c8 = 0x0;
                  } else if (_0x246d6a < 0x200) {
                    _0x32a3c8 = 0x1;
                    _0x246d6a -= 0xff;
                  } else {
                    _0x32a3c8 = 0x4;
                    _0x246d6a -= 0x200;
                  }
                }
              }
            }
          }
          if (_0x5e44e1.mouse_key_loop > 0x1) {
            _0x50556a.push(_0x32a3c8 | 0x80);
          } else {
            _0x50556a.push(_0x32a3c8);
          }
          if (_0x5e44e1.mouse_key_loop > 0x1) {
            _0x50556a.push(_0x5e44e1.mouse_key_loop & 0xff);
            _0x50556a.push(_0x5e44e1.mouse_key_loop >> 0x8 & 0xff);
          }
          if (_0x32a3c8 == 0x2) {
            var _0x271f58 = _0x246d6a >> 0x10 & 0xffff;
            var _0x144258 = _0x246d6a & 0xffff;
            _0x50556a.push(_0x271f58 & 0xff);
            _0x50556a.push((_0x271f58 >> 0x8 & 0xf | _0x144258 >> 0x4 & 0xf0) & 0xff);
            _0x50556a.push(_0x144258 & 0xff);
          } else {
            if (_0x32a3c8 == 0x6) {
              var _0x1ada82 = _0x246d6a >> 0x10 & 0xffff;
              var _0x55eac4 = _0x246d6a & 0xffff;
              _0x50556a.push(_0x1ada82 & 0xff);
              _0x50556a.push(_0x1ada82 >> 0x8 & 0xff);
              _0x50556a.push(_0x55eac4 & 0xff);
              _0x50556a.push(_0x55eac4 >> 0x8 & 0xff);
            } else {
              if (_0x32a3c8 == 0x3) {
                _0x50556a.push(_0x246d6a + 0x40);
              } else {
                if (_0x32a3c8 == 0x5) {
                  _0x50556a.push(_0x246d6a + 0x40);
                } else {
                  var _0x3fcf9a = 0x2;
                  if (_0x5e44e1.mouse_key_event == 0x100) {
                    _0x3fcf9a = 0x0;
                  } else if (_0x5e44e1.mouse_key_event == 0x101) {
                    _0x3fcf9a = 0x2;
                  }
                  _0x50556a.push(_0x246d6a);
                  _0x50556a.push(_0x3fcf9a);
                }
              }
            }
          }
          _0x50556a.push(_0x5e44e1.mouse_key_time & 0xff);
          _0x50556a.push(_0x5e44e1.mouse_key_time >> 0x8 & 0xff);
        }
      }
    }
    _0x50556a.push(0x0);
    _0x50556a.push(_0x545a56);
    _0x50556a.push(_0x52307d);
    var _0x340433 = _0xe56c53 / _0x45a4a1;
    if (_0xe56c53 + _0x45a4a1 < _0x1c3e42.length) {
      _0x340433 |= 0x80;
    }
    _0x50556a.push(_0x340433);
    send_event(_0x5aea9f, crc_process(_0x5aea9f, _0x50556a));
    _0x5aea9f.esb_alive_timeout += 0xbb8;
  }
}
function send_event_gaming_only(_0x5068d8, _0x5451d2) {
  var _0x6e85a2 = [];
  _0x6e85a2.push(0x3);
  _0x6e85a2.push(0x0);
  _0x6e85a2.push(0x27);
  _0x6e85a2.push(_0x5451d2 ? 0x1 : 0x0);
  send_event(_0x5068d8, crc_process(_0x5068d8, _0x6e85a2));
  clearTimeout(upload_mouse_config_timer);
  upload_mouse_config_timer = setTimeout(upload_mouse_config_delayed, 0x3e8, _0x5068d8, _0x5451d2 ? 0x1 : 0x0, _0x5068d8.device_info.sleepTime);
}
function send_event_set_brightness(_0x536098, _0x1a230e) {
  var _0x1ecee5 = [];
  _0x1ecee5.push(0x3);
  _0x1ecee5.push(0x0);
  _0x1ecee5.push(0x31);
  _0x1ecee5.push(_0x1a230e);
  send_event(_0x536098, crc_process(_0x536098, _0x1ecee5));
  _0x536098.device_info.brightness = _0x1a230e;
}
function get_key_id_by_name(_0x92d57b, _0x4b6927) {
  var _0xd79a49 = [];
  if (_0x4b6927 != undefined) {
    _0x4b6927.split('+').forEach(_0x2d7382 => {
      if (_0x2d7382 == KEY_WHEEL_UP) {
        _0xd79a49.push(0x7);
      } else if (_0x2d7382 == KEY_WHEEL_DOWN) {
        _0xd79a49.push(0x8);
      } else {
        get_keys(_0x92d57b).forEach(_0x5a7e7f => {
          if (_0x2d7382 == _0x5a7e7f.name) {
            _0x5a7e7f.id.forEach(_0x110507 => {
              _0xd79a49.push(_0x110507);
            });
          }
        });
      }
    });
  }
  return _0xd79a49;
}
function write_mouse_param(_0x2fdc4a, _0x45269b) {
  if (_0x45269b.name.length == 0x0) {
    return;
  }
  var _0x363ff1 = get_key_id_by_name(_0x2fdc4a, _0x45269b.name);
  if (_0x45269b.configType == 0x0) {
    if (_0x45269b.touch_style == 0x1b) {
      if (_0x45269b.mouse_mapping_keys != "[0,0,0]") {
        var _0x50d1ad = _0x45269b.mouse_mapping_keys;
        var _0x202ad3;
        try {
          _0x202ad3 = JSON.parse(_0x50d1ad);
        } catch (_0x1d9025) {
          _0x202ad3 = undefined;
        }
        if (_0x202ad3 != undefined) {
          var _0x56352d = 0x0;
          var _0x8b9866 = 0x0;
          var _0x4e52a2 = 0x0;
          var _0x24ff00 = 0x0;
          if (_0x202ad3.length >= 0x3) {
            var _0x4e135b = parseInt(_0x202ad3[0x0]);
            if (_0x4e135b == 0x11) {
              _0x56352d = get_scan_code(0xa2);
            } else {
              if (_0x4e135b == 0x12) {
                _0x56352d = get_scan_code(0xa4);
              } else {
                if (_0x4e135b == 0x10) {
                  _0x56352d = get_scan_code(0xa0);
                } else if (_0x4e135b == 0x5b) {
                  _0x56352d = get_scan_code(0x5b);
                }
              }
            }
            _0x4e135b = parseInt(_0x202ad3[0x1]);
            if (_0x4e135b == 0x11) {
              _0x8b9866 = get_scan_code(0xa2);
            } else {
              if (_0x4e135b == 0x12) {
                _0x8b9866 = get_scan_code(0xa4);
              } else {
                if (_0x4e135b == 0x10) {
                  _0x8b9866 = get_scan_code(0xa0);
                } else if (_0x4e135b == 0x5b) {
                  _0x8b9866 = get_scan_code(0x5b);
                }
              }
            }
            _0x4e135b = parseInt(_0x202ad3[0x2]);
            _0x4e52a2 = get_scan_code(_0x4e135b);
            if (_0x4e52a2 < 0xff) {
              _0x24ff00 = 0x0;
            } else {
              if (_0x4e52a2 < 0x200) {
                _0x24ff00 = 0x1;
                _0x4e52a2 -= 0xff;
              } else {
                if (_0x4e52a2 == 0x400) {
                  _0x24ff00 = 0x3;
                  _0x4e52a2 = 0x40 + _0x45269b.mouse_mapping_key_data;
                } else {
                  if (_0x4e52a2 == 0x401) {
                    _0x24ff00 = 0x3;
                    _0x4e52a2 = 0x40 - _0x45269b.mouse_mapping_key_data;
                  } else {
                    if (_0x4e52a2 == 0x402) {
                      _0x24ff00 = 0x5;
                      _0x4e52a2 = 0x40 - _0x45269b.mouse_mapping_key_data;
                    } else if (_0x4e52a2 == 0x403) {
                      _0x24ff00 = 0x5;
                      _0x4e52a2 = 0x40 + _0x45269b.mouse_mapping_key_data;
                    } else {
                      _0x24ff00 = 0x4;
                      _0x4e52a2 -= 0x200;
                    }
                  }
                }
              }
            }
            if (_0x56352d == 0x0 && _0x8b9866 == 0x0 && _0x45269b.mouse_auto_click && _0x24ff00 != 0x3 && _0x24ff00 != 0x5) {
              var _0x52c836 = [];
              var _0x24348c = create_macro_info();
              _0x24348c.style = 0x16;
              _0x24348c.mouse_key_code = _0x4e135b;
              _0x24348c.mouse_key_event = 0x100;
              _0x24348c.mouse_key_time = _0x45269b.mouse_auto_click_down;
              _0x24348c.interval_time = _0x45269b.mouse_auto_click_rand;
              _0x24348c.name = get_key_name_from_code(_0x4e135b);
              _0x52c836.push(_0x24348c);
              _0x24348c = create_macro_info();
              _0x24348c.style = 0x16;
              _0x24348c.mouse_key_code = _0x4e135b;
              _0x24348c.mouse_key_event = 0x101;
              _0x24348c.mouse_key_time = _0x45269b.mouse_auto_click_up;
              _0x24348c.interval_time = _0x45269b.mouse_auto_click_rand;
              _0x24348c.name = get_key_name_from_code(_0x4e135b);
              _0x52c836.push(_0x24348c);
              send_event_config_macro(_0x2fdc4a, _0x363ff1, 0x2, 0x0, 0x0, _0x52c836, 8, is_limit_memory(_0x2fdc4a) ? 0x5 : 0x38);
            } else {
              send_event_mouse_key(_0x2fdc4a, _0x363ff1, _0x56352d, _0x8b9866, _0x24ff00, _0x4e52a2);
            }
          }
        }
      }
    } else if (_0x45269b.touch_style == 0x1d) {
      if (_0x45269b.mouse_mapping_function != 0x0) {
        if (_0x45269b.mouse_mapping_function == 0x9) {
          send_event_mouse_function(_0x2fdc4a, _0x363ff1, 0x2, _0x45269b.mouse_mapping_function, parseInt(_0x45269b.mouse_mapping_function_data / get_cpi_step(_0x2fdc4a)), _0x45269b.mouse_mapping_function_text);
          send_event_mouse_function(_0x2fdc4a, _0x363ff1, 0x3, _0x45269b.mouse_mapping_function, 0x0, _0x45269b.mouse_mapping_function_text);
        } else {
          send_event_mouse_function(_0x2fdc4a, _0x363ff1, 0x2, _0x45269b.mouse_mapping_function, _0x45269b.mouse_mapping_function_data, _0x45269b.mouse_mapping_function_text);
        }
      }
    }
  } else {
    if (_0x45269b.configType == 0x5) {
      if (_0x45269b.macroKeys.length > 0x0) {
        var _0x5b6700 = 0x0;
        if (_0x45269b.macro_style == 0x0) {
          _0x5b6700 = 0x0;
        } else {
          if (_0x45269b.macro_style == 0x1) {
            _0x5b6700 = 0x1;
          } else {
            if (_0x45269b.macro_style == 0x2) {
              _0x5b6700 = 0x2;
            } else {
              if (_0x45269b.macro_style == 0x3) {
                _0x5b6700 = 0x3;
              } else {
                if (_0x45269b.macro_style == 0x4) {
                  _0x5b6700 = 0x4;
                } else {
                  if (_0x45269b.macro_style == 0x5) {
                    _0x5b6700 = 0x5;
                  } else if (_0x45269b.macro_style == 0x6) {
                    _0x5b6700 = 0x6;
                  }
                }
              }
            }
          }
        }
        send_event_config_macro(_0x2fdc4a, _0x363ff1, _0x5b6700, _0x45269b.macro_toggleKey, _0x45269b.macro_endKey, _0x45269b.macroKeys, 0x0, is_limit_memory(_0x2fdc4a) ? 0x5 : 0x38);
      }
    }
  }
}
