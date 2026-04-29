
// ===== EVENT DISPATCH & APPLICATION LIFECYCLE ===============================
// This message listener is the core event loop: every component sends a
// postMessage({action: ...}) and the central switch dispatches to the
// appropriate handler. This decouples the HID layer from the UI layer.
//
// Actions handled:
//   ACTION_REFRESH_CLIENT_LIST       → refresh_client_list()
//   ACTION_REFRESH_CURRENT_CLIENT    → refresh_current_client()
//   ACTION_SEND_CLIENT_DATA          → send_client_data(client)
//   ACTION_UI_REFRESH_CLIENT_LIST    → ui_refresh_client_list()
//   ACTION_UI_REFRESH_CURRENT_CLIENT → ui_refresh_current_client()
//   ACTION_UI_REFRESH_SETTING        → ui_refresh_setting()
//   ACTION_UI_REFRESH_QUAL           → ui_refresh_qual()
//   ACTION_UI_REFRESH_KBD_KEY        → switch kbd tab to key view
//   ACTION_UI_REFRESH_KBD_LIGHT      → switch kbd tab to light view
//   ACTION_UI_REFRESH_KBD_AXIS       → switch kbd tab to axis view
//   action_onboard_cfg               → onboard config load/save status
//
// The document "visibilitychange" handler re‑queries devices when the page
// becomes visible again (after sleep/wake).
//
// HID connect/disconnect events from navigator.hid also trigger a client
// list refresh.
//
// start() is the periodic "tick" — called by a setInterval in hub.html. It
// sends pings to every connected client and checks for timeouts.
//
// The start() function (line ~8429) is the device health monitor loop:
// - Sends 0x42 action to receivers to poll virtual children
// - Sends ping (0xe) frames to keep the connection alive
// - Detects stale connections (esb_alive_timeout exceeded)
// ============================================================================
window[_0x4dcb(0x48c)]('message', _0x44647a => {
  if (_0x44647a.data[_0x4dcb(0x59b)] == ACTION_REFRESH_CLIENT_LIST) {
    refresh_client_list();
  } else {
    if (_0x44647a.data[_0x4dcb(0x59b)] == ACTION_REFRESH_CURRENT_CLIENT) {
      refresh_current_client();
    } else {
      if (_0x44647a[_0x4dcb(0x322)][_0x4dcb(0x59b)] == ACTION_SEND_CLIENT_DATA) {
        usb_client_list[_0x4dcb(0x545)](_0x4a6fe3 => {
          if (_0x4a6fe3.id == _0x44647a[_0x4dcb(0x322)][_0x4dcb(0x591)]) {
            send_client_data(_0x4a6fe3);
          }
        });
      } else {
        if (_0x44647a.data[_0x4dcb(0x59b)] == ACTION_UI_REFRESH_CLIENT_LIST) {
          ui_refresh_client_list();
        } else {
          if (_0x44647a[_0x4dcb(0x322)][_0x4dcb(0x59b)] == ACTION_UI_REFRESH_CURRENT_CLIENT) {
            need_save = false;
            ui_refresh_current_client();
          } else {
            if (_0x44647a[_0x4dcb(0x322)][_0x4dcb(0x59b)] == ACTION_UI_REFRESH_CURRENT_CLIENT_RSSI) {
              ui_refresh_current_client_rssi();
            } else {
              if (_0x44647a[_0x4dcb(0x322)][_0x4dcb(0x59b)] == ACTION_UI_REFRESH_SETTING) {
                ui_refresh_setting(current_usb_client);
              } else {
                if (_0x44647a[_0x4dcb(0x322)][_0x4dcb(0x59b)] == ACTION_UI_REFRESH_QUAL) {
                  ui_refresh_qual(current_usb_client);
                } else {
                  if (_0x44647a.data[_0x4dcb(0x59b)] == 'action_ui_refresh_kbd_onboard') {
                    kbd_ui_refresh_onboard_config(current_usb_client);
                  } else {
                    if (_0x44647a[_0x4dcb(0x322)][_0x4dcb(0x59b)] == ACTION_UI_REFRESH_KBD_KEY) {
                      if ($(_0x4dcb(0x6a7))[_0x4dcb(0x3e1)]('display') != 'none') {
                        layui[_0x4dcb(0x2b8)][_0x4dcb(0x42e)](_0x4dcb(0xf9), 0x0);
                      }
                    } else {
                      if (_0x44647a.data.action == ACTION_UI_REFRESH_KBD_LIGHT) {
                        if ($('#kbd-main-setting-light-container')[_0x4dcb(0x3e1)]('display') != _0x4dcb(0xbe)) {
                          hide_waiting();
                          layui[_0x4dcb(0x2b8)][_0x4dcb(0x42e)](_0x4dcb(0xf9), 0x1);
                        }
                      } else {
                        if (_0x44647a[_0x4dcb(0x322)][_0x4dcb(0x59b)] == ACTION_UI_REFRESH_KBD_AXIS) {
                          if ($(_0x4dcb(0x2e4)).css('display') != _0x4dcb(0xbe)) {
                            hide_waiting();
                            layui.element[_0x4dcb(0x42e)]('kbd-main-setting-type', 0x2);
                          }
                        } else {
                          if (_0x44647a[_0x4dcb(0x322)][_0x4dcb(0x59b)] == 'action_ui_refresh_kbd_advance_key') {
                            hide_waiting();
                            if ($('#kbd-main-setting-advance-key-container').css(_0x4dcb(0x41e)) != _0x4dcb(0xbe)) {
                              layui[_0x4dcb(0x2b8)][_0x4dcb(0x42e)](_0x4dcb(0xf9), 0x3);
                            }
                          } else {
                            if (_0x44647a[_0x4dcb(0x322)].action == ACTION_UI_REFRESH_KBD_MACRO) {
                              hide_waiting();
                            } else if (_0x44647a.data.action == 'action_onboard_cfg') {
                              usb_client_list.forEach(_0x51a648 => {
                                if (_0x51a648.id == _0x44647a[_0x4dcb(0x322)][_0x4dcb(0x591)]) {
                                  let _0x25591b = document.getElementById(_0x4dcb(0x539));
                                  if (_0x44647a[_0x4dcb(0x322)][_0x4dcb(0x60b)] == _0x4dcb(0x442)) {
                                    if (current_usb_client != undefined && current_usb_client.id == _0x51a648.id) {
                                      _0x25591b[_0x4dcb(0x695)][_0x4dcb(0x41e)] = '';
                                    }
                                  } else {
                                    if (_0x44647a[_0x4dcb(0x322)][_0x4dcb(0x60b)] == _0x4dcb(0x128)) {
                                      if (current_usb_client != undefined && current_usb_client.id == _0x51a648.id) {
                                        _0x25591b[_0x4dcb(0x695)][_0x4dcb(0x41e)] = 'none';
                                        setting_mapping_init(current_usb_client);
                                        ui_refresh_mapping_key(current_usb_client);
                                      }
                                    } else {
                                      if (_0x44647a[_0x4dcb(0x322)][_0x4dcb(0x60b)] == _0x4dcb(0x5fe)) {
                                        if (current_usb_client != undefined && current_usb_client.id == _0x51a648.id) {
                                          _0x25591b[_0x4dcb(0x695)][_0x4dcb(0x41e)] = _0x4dcb(0xbe);
                                        }
                                        var _0x505144 = layui[_0x4dcb(0x236)];
                                        var _0x5cffe8 = layui[_0x4dcb(0x1cd)];
                                        var _0x442419 = _0x5cffe8[_0x4dcb(0xfe)](_0x4dcb(0x5be));
                                        const _0xf15303 = get_display_name(_0x51a648);
                                        _0x505144[_0x4dcb(0x678)](_0x442419.replace(_0x4dcb(0x21f), _0xf15303), {
                                          'title': _0x5cffe8[_0x4dcb(0xfe)](_0x4dcb(0x594)),
                                          'skin': _0x4dcb(0x660),
                                          'btn': [_0x5cffe8[_0x4dcb(0xfe)](_0x4dcb(0x48d)), _0x5cffe8.prop(_0x4dcb(0x62a)), _0x5cffe8[_0x4dcb(0xfe)](_0x4dcb(0x534))],
                                          'btnAlign': 'c',
                                          'btn1': function () {
                                            _0x505144[_0x4dcb(0x335)](0x0);
                                            send_event_factory_reset(_0x51a648, false);
                                            setTimeout(() => {
                                              location.reload();
                                            }, 0x1f4);
                                          },
                                          'btn2': function () {
                                            _0x505144.closeLast(0x0);
                                            if (_0x51a648 != undefined) {
                                              send_event_action(_0x51a648, 0x33, 0x0);
                                              setTimeout(() => {
                                                location.reload();
                                              }, 0x1f4);
                                            }
                                          },
                                          'btn3': function () {
                                            _0x505144[_0x4dcb(0x335)](0x0);
                                          }
                                        });
                                      }
                                    }
                                  }
                                }
                              });
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
});
document.addEventListener(_0x4dcb(0x410), async () => {
  if (device_cfg[_0x4dcb(0x541)] > 0x0 && navigator[_0x4dcb(0x631)] != undefined) {
    window[_0x4dcb(0x3da)]({
      'action': ACTION_REFRESH_CLIENT_LIST
    });
  }
});
function do_resize() {
  $(_0x4dcb(0x549))[_0x4dcb(0x3e1)](_0x4dcb(0x283), (window[_0x4dcb(0x622)] - 0x6e - 0x1e2 - 0x64) / 0x2);
  let _0x245817 = document[_0x4dcb(0x64e)](_0x4dcb(0x42a));
  let _0xa75f59 = document[_0x4dcb(0x64e)](_0x4dcb(0x468));
  _0xa75f59[_0x4dcb(0x695)][_0x4dcb(0x383)] = _0x245817[_0x4dcb(0x6e2)] + _0x245817.offsetHeight - _0xa75f59.offsetTop - 0x14 + 'px';
  let _0x269dd5 = ($('#pair-more-panel')[0x0][_0x4dcb(0x665)] - $('#usb-client-channel')[0x0].offsetWidth / 0x2) * 0x64 / window[_0x4dcb(0x3fd)];
  if (_0x269dd5 > 0x32) {
    _0x269dd5 = 0x32;
  }
  $('#usb-client-channel')[0x0][_0x4dcb(0x695)][_0x4dcb(0xd6)] = _0x269dd5 + '%';
  adjustTable();
}
window[_0x4dcb(0x48c)](_0x4dcb(0x43d), _0x3e95a3 => {
  clearTimeout(resize_timer_id);
  resize_timer_id = setTimeout(do_resize, 0xfa);
});
window.onscroll = function () {
  var _0xcaf9ac = document[_0x4dcb(0x64e)](_0x4dcb(0x6af));
  var _0x50ac84 = window[_0x4dcb(0x1f9)] || document.documentElement[_0x4dcb(0x2fb)] || document[_0x4dcb(0x4ea)][_0x4dcb(0x2fb)];
  if (_0x50ac84 > 0xfa) {
    _0xcaf9ac.style[_0x4dcb(0x635)] = 0x0;
  } else if (_0x50ac84 > 0x0) {
    _0xcaf9ac[_0x4dcb(0x695)][_0x4dcb(0x635)] = (0xfa - _0x50ac84) / 0xfa;
  } else {
    _0xcaf9ac[_0x4dcb(0x695)].opacity = 0x1;
  }
};
if (navigator[_0x4dcb(0x631)] != undefined) {
  navigator[_0x4dcb(0x631)][_0x4dcb(0x48c)](_0x4dcb(0x2ba), _0xd644e0 => {
    window[_0x4dcb(0x3da)]({
      'action': ACTION_REFRESH_CLIENT_LIST
    });
  });
  navigator[_0x4dcb(0x631)][_0x4dcb(0x48c)](_0x4dcb(0x4e1), _0x136a6a => {
    window[_0x4dcb(0x3da)]({
      'action': ACTION_REFRESH_CLIENT_LIST
    });
  });
}

// ===== WINDOW FOCUS / BLUR =================================================
// Pause keep‑alive pings when the window is hidden (stop() is not called,
// but start() checks window_focused before sending pings).
function onBlur() {
  window_focused = false;
}
// Resume keep‑alive and refresh device timestamps on window focus
function onFocus() {
  usb_client_list.forEach(_0x536b26 => {
    if (!is_receiver(_0x536b26)) {
      if (_0x536b26[_0x4dcb(0x163)]) {
        _0x536b26[_0x4dcb(0x509)] = new Date()[_0x4dcb(0x568)]();
      }
    }
  });
  window_focused = true;
}
window.addEventListener(_0x4dcb(0x47a), onBlur);
window[_0x4dcb(0x48c)](_0x4dcb(0xf8), onFocus);
function setting_mapping_key_recording_add(_0x385931) {
  if (_0x385931 == 0x10 || _0x385931 == 0x11 || _0x385931 == 0x12 || _0x385931 == 0x5b) {
    if (setting_mapping_keys_recorded[0x2] < 0x0) {
      if (setting_mapping_keys_recorded[0x0] < 0x0) {
        setting_mapping_keys_recorded[0x0] = _0x385931;
      } else if (setting_mapping_keys_recorded[0x1] < 0x0 && setting_mapping_keys_recorded[0x0] != _0x385931) {
        setting_mapping_keys_recorded[0x1] = _0x385931;
      }
    }
  } else if (_0x385931 != 0x0) {
    if (setting_mapping_keys_recorded[0x2] < 0x0) {
      setting_mapping_keys_recorded[0x2] = _0x385931;
    }
  }
  refresh_recorded_mapping_keys();
}
function setting_mapping_macro_recording_add(_0x316b61, _0x281d0d, _0x4228b2) {
  var _0x4db02b = create_macro_info();
  _0x4db02b[_0x4dcb(0x695)] = 0x16;
  _0x4db02b[_0x4dcb(0x2a4)] = _0x316b61;
  _0x4db02b.mouse_key_event = _0x281d0d;
  _0x4db02b.mouse_key_time = 0x1;
  _0x4db02b.continue_time = 0x0;
  _0x4db02b[_0x4dcb(0xa6)] = 0x0;
  if (setting_macro_edit_recording_time != -0x1) {
    edit_macros[edit_macros[_0x4dcb(0x541)] - 0x1][_0x4dcb(0x310)] = $("[name=\"macro-record-fixed-time\"]")[0x0][_0x4dcb(0x62b)] ? 0x32 : _0x4228b2 - setting_macro_edit_recording_time;
  }
  setting_macro_edit_recording_time = _0x4228b2;
  _0x4db02b.name = get_key_name_from_code(_0x4db02b[_0x4dcb(0x2a4)]);
  edit_macros.push(_0x4db02b);
  if (_0x316b61 != 256 || _0x281d0d != 0x100) {
    ui_refresh_mapping_macro_edit(current_usb_client);
  }
}
