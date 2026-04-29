function ui_select_key_init() {
  var _0xd58aa3 = kbd_select_keys;
  var _0x127754 = "<div class=\"layui-row\" style=\"margin-top: 10px;\">";
  for (let _0x5802da = 0x0; _0x5802da < _0xd58aa3.length; _0x5802da++) {
    var _0x5f3276 = _0xd58aa3[_0x5802da].name;
    var _0x12a66a = _0xd58aa3[_0x5802da].rect;
    var _0x7bf602 = _0x12a66a[0x0];
    var _0x34dc60 = _0x12a66a[0x1];
    var _0x514c17 = _0x12a66a[0x2];
    var _0x4dc647 = _0x12a66a[0x3];
    _0x127754 += "<div class=\"layui-col-xs3\" style=\"width:" + _0x514c17 + "px; height:" + _0x4dc647 + "px; margin-left:" + _0x7bf602 + "px; margin-top:" + _0x34dc60 + "px; \">";
    _0x127754 += "<a kbd-select-key-index=\"" + _0x5802da + "\" kbd-select-key-action=\"select\" style=\"cursor: pointer;\">";
    _0x127754 += "<div style=\"width:" + _0x514c17 + "px; height:" + _0x4dc647 + "px;\">";
    _0x127754 += "<div class=\"layui-hover-bg\" style=\"display: flex; justify-content: center; align-items: center; position: absolute; width:" + _0x514c17 + "px; height:" + _0x4dc647 + "px;\">";
    " ";
    _0x127754 += "<p style=\"font-size: smaller;color:white;text-align: center;\" >" + _0x5f3276 + "</p>";
    _0x127754 += '</div>';
    _0x127754 += '</div>';
    _0x127754 += '</a>';
    _0x127754 += "</div>";
    if (_0x5802da == 0xf || _0x5802da == 0x24 || _0x5802da == 0x39 || _0x5802da == 0x49 || _0x5802da == 0x59) {
      _0x127754 += "</div><div class=\"layui-row\">";
    }
  }
  ;
  _0x127754 += "</div>";
  $("#select-key-container").html(_0x127754);
  var _0x585109 = mouse_select_keys;
  _0x127754 = "<div class=\"layui-row\" style=\"margin-top: 10px;\">";
  for (let _0xa73842 = 0x0; _0xa73842 < _0x585109.length; _0xa73842++) {
    var _0x5f3276 = _0x585109[_0xa73842].name;
    var _0x12a66a = _0x585109[_0xa73842].rect;
    var _0x7bf602 = _0x12a66a[0x0];
    var _0x34dc60 = _0x12a66a[0x1];
    var _0x514c17 = _0x12a66a[0x2];
    var _0x4dc647 = _0x12a66a[0x3];
    _0x127754 += "<div class=\"layui-col-xs3\" style=\"width:" + _0x514c17 + "px; height:" + _0x4dc647 + "px; margin-left:" + _0x7bf602 + "px; margin-top:" + _0x34dc60 + "px; \">";
    _0x127754 += "<a mouse-select-key-index=\"" + _0xa73842 + "\" mouse-select-key-action=\"select\" style=\"cursor: pointer;\">";
    _0x127754 += "<div style=\"width:" + _0x514c17 + "px; height:" + _0x4dc647 + "px;\">";
    _0x127754 += "<div class=\"layui-hover-bg\" style=\"position: absolute; width:" + _0x514c17 + "px; height:" + _0x4dc647 + "px;\">";
    " ";
    _0x127754 += "<p style=\"font-size: small;color:white;text-align: center;margin-top: 8px;\" >" + _0x5f3276 + "</p>";
    _0x127754 += "</div>";
    _0x127754 += "</div>";
    _0x127754 += "</a>";
    _0x127754 += '</div>';
  }
  ;
  _0x127754 += "</div>";
  $("#mouse-select-key-container").html(_0x127754);
}
function dialog_select_key_init(_0x56a25c) {
  var _0xb2e325 = kbd_select_keys;
  var _0x1f6ec3 = "<div class=\"layui-row\" style=\"margin-top: 10px;\">";
  for (let _0x2c3509 = 0x0; _0x2c3509 < _0xb2e325.length; _0x2c3509++) {
    var _0x8505e4 = _0xb2e325[_0x2c3509].name;
    var _0x281cfb = _0xb2e325[_0x2c3509].rect;
    var _0x4736d9 = _0x281cfb[0x0];
    var _0xd1b0b6 = _0x281cfb[0x1];
    var _0x4c90b8 = _0x281cfb[0x2];
    var _0x10ff2d = _0x281cfb[0x3];
    _0x1f6ec3 += "<div class=\"layui-col-xs3\" style=\"width:" + _0x4c90b8 + "px; height:" + _0x10ff2d + "px; margin-left:" + _0x4736d9 + "px; margin-top:" + _0xd1b0b6 + "px; \">";
    _0x1f6ec3 += "<a kbd-select-key-index=\"" + _0x2c3509 + "\" elementId=\"" + _0x56a25c + "\" dialog-select-key-action=\"select\" style=\"cursor: pointer;\">";
    _0x1f6ec3 += "<div style=\"width:" + _0x4c90b8 + "px; height:" + _0x10ff2d + "px;\">";
    _0x1f6ec3 += "<div class=\"layui-hover-bg\" style=\"display: flex; justify-content: center; align-items: center; position: absolute; width:" + _0x4c90b8 + "px; height:" + _0x10ff2d + "px;\">";
    " ";
    _0x1f6ec3 += "<p style=\"font-size: smaller;color:white;text-align: center;\" >" + _0x8505e4 + '</p>';
    _0x1f6ec3 += "</div>";
    _0x1f6ec3 += "</div>";
    _0x1f6ec3 += "</a>";
    _0x1f6ec3 += '</div>';
    if (_0x2c3509 == 0xf || _0x2c3509 == 0x24 || _0x2c3509 == 0x39 || _0x2c3509 == 0x49 || _0x2c3509 == 0x59) {
      _0x1f6ec3 += "</div><div class=\"layui-row\">";
    }
  }
  ;
  _0x1f6ec3 += '</div>';
  $("#dialog-select-key-container").html(_0x1f6ec3);
  var _0x549529 = mouse_select_keys;
  _0x1f6ec3 = "<div class=\"layui-row\" style=\"margin-top: 10px;\">";
  for (let _0x13be1d = 0x0; _0x13be1d < _0x549529.length; _0x13be1d++) {
    if (_0x56a25c == "kbd-macro-add-select-key") {
      if (_0x13be1d > 0x2) {
        break;
      }
    }
    var _0x8505e4 = _0x549529[_0x13be1d].name;
    var _0x281cfb = _0x549529[_0x13be1d].rect;
    var _0x4736d9 = _0x281cfb[0x0];
    var _0xd1b0b6 = _0x281cfb[0x1];
    var _0x4c90b8 = _0x281cfb[0x2];
    var _0x10ff2d = _0x281cfb[0x3];
    _0x1f6ec3 += "<div class=\"layui-col-xs3\" style=\"width:" + _0x4c90b8 + "px; height:" + _0x10ff2d + "px; margin-left:" + _0x4736d9 + "px; margin-top:" + _0xd1b0b6 + "px; \">";
    _0x1f6ec3 += "<a mouse-select-key-index=\"" + _0x13be1d + "\"  elementId=\"" + _0x56a25c + "\" dialog-mouse-select-key-action=\"select\" style=\"cursor: pointer;\">";
    _0x1f6ec3 += "<div style=\"width:" + _0x4c90b8 + "px; height:" + _0x10ff2d + "px;\">";
    _0x1f6ec3 += "<div class=\"layui-hover-bg\" style=\"position: absolute; width:" + _0x4c90b8 + "px; height:" + _0x10ff2d + "px;\">";
    " ";
    _0x1f6ec3 += "<p style=\"font-size: small;color:white;text-align: center;margin-top: 8px;\" >" + _0x8505e4 + "</p>";
    _0x1f6ec3 += "</div>";
    _0x1f6ec3 += "</div>";
    _0x1f6ec3 += "</a>";
    _0x1f6ec3 += "</div>";
  }
  ;
  _0x1f6ec3 += '</div>';
  $("#dialog-mouse-select-key-container").html(_0x1f6ec3);
}
function kbd_ui_refresh_onboard_config(_0x2b0c23) {
  var _0x5c74fb = layui.$;
  var _0x1104b9 = layui.form;
  var _0x174c4a = "<select name=\"kbd_onboard-config\" lay-verify=\"required\" lay-filter=\"kbd_onboard-config\">";
  var _0x37992b = _0x2b0c23.device_info.onboardIndex;
  var _0x1cdb56 = _0x2b0c23.device_info.kbd_onboardNum;
  for (let _0x6622ea = 0x0; _0x6622ea < _0x1cdb56; _0x6622ea++) {
    _0x174c4a += "<option value=\"" + _0x6622ea + "\">" + layui.i18np.prop("STRID_SETTING_CONFIG_CURRENT") + NUMBERS[_0x6622ea + 0x1] + '</option>';
  }
  _0x174c4a += "</select>";
  _0x5c74fb("#kbd-setting-onboard-config").html(_0x174c4a);
  _0x5c74fb("[name=\"kbd_onboard-config\"]").val(_0x37992b);
  _0x1104b9.render('select');
}
function kbd_ui_refresh_key_matrix(_0x1bde04) {
  var _0x40d220 = 0xd;
  if (is_keyboard_5_15(_0x1bde04.device)) {
    _0x40d220 = 0xe;
  }
  var _0x514046 = "<div class=\"layui-row\" style=\"margin-top: 10px;\">";
  for (let _0x416b69 = 0x0; _0x416b69 < kbd_key_infos.length; _0x416b69++) {
    var _0xf5f5dc = kbd_key_infos[_0x416b69].name;
    var _0x47dc62 = kbd_key_infos[_0x416b69].rect;
    var _0x24ac6a = _0x47dc62[0x0];
    var _0x220242 = _0x47dc62[0x1];
    var _0x391c7a = _0x47dc62[0x2];
    var _0x4cb7c5 = _0x47dc62[0x3];
    _0x514046 += "<div class=\"layui-col-xs3\" style=\"width:" + _0x391c7a + "px; height:" + _0x4cb7c5 + "px; margin-left:" + _0x24ac6a + "px; margin-top:" + _0x220242 + "px; \">";
    _0x514046 += "<a kbd-key-matrix-index=\"" + _0x416b69 + "\"kbd-key-matrix-action=\"select\" style=\"cursor: pointer;\">";
    _0x514046 += "<div style=\"width:" + _0x391c7a + "px; height:" + _0x4cb7c5 + "px;\">";
    _0x514046 += "<div class=\"layui-hover-bg-trans\" style=\"display: flex; justify-content: center; align-items: center; position: absolute; width:" + _0x391c7a + "px; height:" + _0x4cb7c5 + "px;\">";
    " ";
    if (is_keyboard_5_15(_0x1bde04.device)) {
      _0x514046 += "<p style=\"user-select: none;font-size: smaller;color:white;text-align: center;\" >" + _0xf5f5dc + '</p>';
    } else {
      _0x514046 += "<p style=\"user-select: none;font-size: small;color:white;text-align: center;\" >" + _0xf5f5dc + "</p>";
    }
    _0x514046 += "</div>";
    if (kbd_key_matrix_index == _0x416b69) {
      _0x514046 += "<div class=\"layui-key-select-red\" style=\"position: absolute; width:" + (_0x391c7a - 0x3) + "px; height:" + (_0x4cb7c5 - 0x3) + "px;\">";
      " ";
      _0x514046 += "</div>";
    }
    _0x514046 += '</div>';
    _0x514046 += '</a>';
    _0x514046 += "</div>";
    if (_0x416b69 == _0x40d220) {
      _0x514046 += "</div><div class=\"layui-row\">";
    }
  }
  ;
  _0x514046 += "</div>";
  $('#kbd-mapping-key-container').html(_0x514046);
}
function kbd_ui_refresh_key_desc(_0x3a1877) {
  $("#kbd-key-desc-title").css("color", "gray");
  document.getElementById("kbd-key-desc-container").style.borderColor = 'gray';
  $("#kbd-key-desc-line").css("background-color", 'gray');
  $("#kbd-key-desc1").css("color", "gray");
  $("#kbd-key-desc1").text(layui.i18np.prop("STRID_KBD_NO_KEY_SELECTED"));
  $("#kbd-key-desc-arrow").css("display", 'none');
  $("#kbd-key-desc2").css("display", "none");
  document.getElementById("kbd-key-default").disabled = true;
  document.getElementById("kbd-key-set").disabled = true;
  if (kbd_key_matrix_index >= 0x0) {
    $("#kbd-key-desc-title").css("color", '');
    if (is_dark_theme()) {
      document.getElementById("kbd-key-desc-container").style.borderColor = "#BABABA";
      $("#kbd-key-desc-line").css("background-color", '#BABABA');
      document.getElementById('kbd-key-default').className = "layui-btn layui-key-desc-button";
      document.getElementById('kbd-key-set').className = "layui-btn layui-key-desc-button";
    } else {
      document.getElementById("kbd-key-desc-container").style.borderColor = 'black';
      $("#kbd-key-desc-line").css("background-color", "black");
      document.getElementById("kbd-key-default").className = "layui-btn layui-key-desc-button-light";
      document.getElementById("kbd-key-set").className = "layui-btn layui-key-desc-button-light";
    }
    $("#kbd-key-desc1").css("color", '');
    $("#kbd-key-desc1").text(kbd_key_infos[kbd_key_matrix_index].name);
    if (kbd_key_setting_index == 0x0 || kbd_key_setting_index == 0x1 || kbd_key_setting_index == 0x2) {
      if (kbd_layer_id == 0x0) {
        if (kbd_key_infos[kbd_key_matrix_index].keyId != kbd_keys[kbd_key_matrix_index].keyId) {
          document.getElementById("kbd-key-default").disabled = false;
        }
      } else if (kbd_key_infos[kbd_key_matrix_index].keyId > 0x1) {
        document.getElementById("kbd-key-default").disabled = false;
      }
      if (kbd_select_keyId > 0x0) {
        if (kbd_key_infos[kbd_key_matrix_index].keyId == kbd_select_keyId) {
          document.getElementById("kbd-key-set").disabled = true;
        } else {
          $("#kbd-key-desc-arrow").css("display", '');
          $('#kbd-key-desc2').css('display', '');
          $("#kbd-key-desc2").css('color', theme_color);
          $("#kbd-key-desc2").text(get_key_name_from_keyid(kbd_select_keyId));
          document.getElementById("kbd-key-set").disabled = false;
        }
      }
    }
  }
}
function kbd_ui_key_setting_init(_0x4145fc) {
  var _0x4b2372 = kbd_select_keys;
  var _0x4d59bc = "<div class=\"layui-row\" style=\"margin-top: 10px;\">";
  for (let _0x18f281 = 0x0; _0x18f281 < _0x4b2372.length; _0x18f281++) {
    var _0x2aee23 = _0x4b2372[_0x18f281].name;
    var _0x33e434 = _0x4b2372[_0x18f281].rect;
    var _0x1ad957 = _0x33e434[0x0];
    var _0x4c07ab = _0x33e434[0x1];
    var _0x27b98f = _0x33e434[0x2];
    var _0xbef58a = _0x33e434[0x3];
    _0x4d59bc += "<div class=\"layui-col-xs3\" style=\"width:" + _0x27b98f + "px; height:" + _0xbef58a + "px; margin-left:" + _0x1ad957 + "px; margin-top:" + _0x4c07ab + "px; \">";
    _0x4d59bc += "<a kbd-select-key-index=\"" + _0x18f281 + "\"kbd-select-key-action=\"select\" style=\"cursor: pointer;\">";
    _0x4d59bc += "<div style=\"width:" + _0x27b98f + "px; height:" + _0xbef58a + "px;\">";
    _0x4d59bc += "<div class=\"layui-hover-bg\" style=\"display: flex; justify-content: center; align-items: center; position: absolute; width:" + _0x27b98f + "px; height:" + _0xbef58a + "px;\">";
    " ";
    _0x4d59bc += "<p style=\"user-select: none;font-size: smaller;color:white;text-align: center;\" >" + _0x2aee23 + "</p>";
    _0x4d59bc += "</div>";
    _0x4d59bc += "</div>";
    _0x4d59bc += "</a>";
    _0x4d59bc += "</div>";
    if (_0x18f281 == 0xf || _0x18f281 == 0x24 || _0x18f281 == 0x39 || _0x18f281 == 0x49 || _0x18f281 == 0x59) {
      _0x4d59bc += "</div><div class=\"layui-row\">";
    }
  }
  ;
  _0x4d59bc += "</div>";
  $("#select-key-container").html(_0x4d59bc);
  var _0x38b05b = mouse_select_keys;
  _0x4d59bc = "<div class=\"layui-row\" style=\"margin-top: 10px;\">";
  for (let _0x5bea7b = 0x0; _0x5bea7b < _0x38b05b.length; _0x5bea7b++) {
    var _0x2aee23 = _0x38b05b[_0x5bea7b].name;
    var _0x33e434 = _0x38b05b[_0x5bea7b].rect;
    var _0x1ad957 = _0x33e434[0x0];
    var _0x4c07ab = _0x33e434[0x1];
    var _0x27b98f = _0x33e434[0x2];
    var _0xbef58a = _0x33e434[0x3];
    _0x4d59bc += "<div class=\"layui-col-xs3\" style=\"width:" + _0x27b98f + "px; height:" + _0xbef58a + "px; margin-left:" + _0x1ad957 + "px; margin-top:" + _0x4c07ab + "px; \">";
    _0x4d59bc += "<a mouse-select-key-index=\"" + _0x5bea7b + "\"mouse-select-key-action=\"select\" style=\"cursor: pointer;\">";
    _0x4d59bc += "<div style=\"width:" + _0x27b98f + "px; height:" + _0xbef58a + "px;\">";
    _0x4d59bc += "<div class=\"layui-hover-bg\" style=\"position: absolute; width:" + _0x27b98f + "px; height:" + _0xbef58a + "px;\">";
    " ";
    _0x4d59bc += "<p style=\"user-select: none;font-size: small;color:white;text-align: center;margin-top: 8px;\" >" + _0x2aee23 + "</p>";
    _0x4d59bc += '</div>';
    _0x4d59bc += "</div>";
    _0x4d59bc += "</a>";
    _0x4d59bc += "</div>";
  }
  ;
  _0x4d59bc += "</div>";
  $('#mouse-select-key-container').html(_0x4d59bc);
}
function kbd_ui_function_setting_init(_0x4c3648) {
  var _0x291db4 = kbd_rgb_keys;
  html = "<div class=\"layui-row\" style=\"margin-top: 10px;\">";
  for (let _0x21e7de = 0x0; _0x21e7de < _0x291db4.length; _0x21e7de++) {
    var _0x1ed2bf = _0x291db4[_0x21e7de].name;
    var _0x5641f2 = _0x291db4[_0x21e7de].rect;
    var _0x33f62c = _0x5641f2[0x0];
    var _0x30ea3b = _0x5641f2[0x1];
    var _0x601507 = _0x5641f2[0x2];
    var _0x24a4d2 = _0x5641f2[0x3];
    html += "<div class=\"layui-col-xs3\" style=\"width:" + _0x601507 + "px; height:" + _0x24a4d2 + "px; margin-left:" + _0x33f62c + "px; margin-top:" + _0x30ea3b + "px; \">";
    html += "<a kbd-key-rgb-index=\"" + _0x21e7de + "\"kbd-key-rgb-action=\"select\" style=\"cursor: pointer;\">";
    html += "<div style=\"width:" + _0x601507 + "px; height:" + _0x24a4d2 + "px;\">";
    html += "<div class=\"layui-hover-bg\" style=\"position: absolute; width:" + _0x601507 + "px; height:" + _0x24a4d2 + "px;\">";
    " ";
    html += "<p style=\"user-select: none;font-size: small;color:white;text-align: center;margin-top: 8px;\" >" + _0x1ed2bf + "</p>";
    html += "</div>";
    html += '</div>';
    html += "</a>";
    html += "</div>";
  }
  ;
  html += "</div>";
  $('#kbd-key-rgb-container').html(html);
  var _0x19666e = kbd_media_keys;
  html = "<div class=\"layui-row\" style=\"margin-top: 10px;\">";
  for (let _0x4d0a85 = 0x0; _0x4d0a85 < _0x19666e.length; _0x4d0a85++) {
    var _0x1ed2bf = _0x19666e[_0x4d0a85].name;
    var _0x5641f2 = _0x19666e[_0x4d0a85].rect;
    var _0x33f62c = _0x5641f2[0x0];
    var _0x30ea3b = _0x5641f2[0x1];
    var _0x601507 = _0x5641f2[0x2];
    var _0x24a4d2 = _0x5641f2[0x3];
    html += "<div class=\"layui-col-xs3\" style=\"width:" + _0x601507 + "px; height:" + _0x24a4d2 + "px; margin-left:" + _0x33f62c + "px; margin-top:" + _0x30ea3b + "px; \">";
    html += "<a kbd-key-media-index=\"" + _0x4d0a85 + "\"kbd-key-media-action=\"select\" style=\"cursor: pointer;\">";
    html += "<div style=\"width:" + _0x601507 + "px; height:" + _0x24a4d2 + "px;\">";
    html += "<div class=\"layui-hover-bg\" style=\"position: absolute; width:" + _0x601507 + "px; height:" + _0x24a4d2 + "px;\">";
    " ";
    html += "<p style=\"user-select: none;font-size: small;color:white;text-align: center;margin-top: 8px;\" >" + _0x1ed2bf + '</p>';
    html += "</div>";
    html += '</div>';
    html += "</a>";
    html += '</div>';
  }
  ;
  html += "</div>";
  $("#kbd-key-media-container").html(html);
  var _0x58cd83 = kbd_windows_keys;
  html = "<div class=\"layui-row\" style=\"margin-top: 10px;\">";
  for (let _0x3320e2 = 0x0; _0x3320e2 < _0x58cd83.length; _0x3320e2++) {
    var _0x1ed2bf = _0x58cd83[_0x3320e2].name;
    var _0x5641f2 = _0x58cd83[_0x3320e2].rect;
    var _0x33f62c = _0x5641f2[0x0];
    var _0x30ea3b = _0x5641f2[0x1];
    var _0x601507 = _0x5641f2[0x2];
    var _0x24a4d2 = _0x5641f2[0x3];
    html += "<div class=\"layui-col-xs3\" style=\"width:" + _0x601507 + "px; height:" + _0x24a4d2 + "px; margin-left:" + _0x33f62c + "px; margin-top:" + _0x30ea3b + "px; \">";
    html += "<a kbd-key-windows-index=\"" + _0x3320e2 + "\"kbd-key-windows-action=\"select\" style=\"cursor: pointer;\">";
    html += "<div style=\"width:" + _0x601507 + "px; height:" + _0x24a4d2 + "px;\">";
    html += "<div class=\"layui-hover-bg\" style=\"position: absolute; width:" + _0x601507 + "px; height:" + _0x24a4d2 + "px;\">";
    " ";
    html += "<p style=\"user-select: none;font-size: small;color:white;text-align: center;margin-top: 8px;\" >" + _0x1ed2bf + "</p>";
    html += '</div>';
    html += "</div>";
    html += '</a>';
    html += "</div>";
  }
  ;
  html += "</div>";
  $("#kbd-key-windows-container").html(html);
}
function kbd_ui_macro_init(_0x49dc80) {
  var _0x4fd9f6 = layui.$;
  var _0x228efc = "<table>";
  _0x228efc += "<tr>";
  for (let _0x123d20 = 0x0; _0x123d20 < kbd_macro_infos.length; _0x123d20++) {
    var _0x1e7555 = kbd_macro_infos[_0x123d20];
    _0x228efc += "<td style=\"padding-top: 5px;\">";
    _0x228efc += "<a kbd-macro-item-index=\"" + _0x123d20 + "\"kbd-macro-item-action=\"select\" style=\"cursor: pointer;\">";
    if (kbd_macro_select_index == _0x123d20) {
      _0x228efc += "<div style=\"width: 104px;height: 68px;margin-left: 5px;background-color: #16B777;\">";
    } else {
      _0x228efc += "<div style=\"width: 104px;height: 68px;margin-left: 5px;background-color: #202020;\">";
    }
    _0x228efc += "<div class=\"layui-setting-title-container\" style=\"height: 50%;\">";
    _0x228efc += "<p style=\"width: 104px;color: white;margin-top: 6px;text-align: center;\">M" + (_0x123d20 + 0x1) + "</p>";
    _0x228efc += "</div>";
    _0x228efc += "<div class=\"layui-setting-title-container\" style=\"height: 50%;\">";
    if (kbd_macro_select_index == _0x123d20) {
      _0x228efc += "<p style=\"width: 104px;color: white; text-align: center;\">" + _0x1e7555.length + " " + layui.i18np.prop('STRID_SETTING_MACRO_ACTIONGS') + "</p>";
    } else {
      _0x228efc += "<p style=\"width: 104px;color: gray; text-align: center;\">" + _0x1e7555.length + " " + layui.i18np.prop("STRID_SETTING_MACRO_ACTIONGS") + "</p>";
    }
    _0x228efc += '</div>';
    _0x228efc += "</div>";
    _0x228efc += "</a>";
    _0x228efc += "</td>";
    if ((_0x123d20 + 0x1) % 0x4 == 0x0) {
      _0x228efc += '</tr><tr>';
    }
  }
  ;
  _0x228efc += "</tr>";
  _0x228efc += "</table>";
  _0x4fd9f6("#kbd-macro-container").html(_0x228efc);
}
function kbd_ui_macro_edit_init(_0x4e2018) {
  if (kbd_macro_select_index >= 0x0) {
    document.getElementById("kbd-macro-record").disabled = false;
    document.getElementById('kbd-macro-add').disabled = false;
    document.getElementById("kbd-macro-clear").disabled = false;
    document.getElementById("kbd-macro-save").disabled = false;
  } else {
    document.getElementById("kbd-macro-record").disabled = true;
    document.getElementById("kbd-macro-add").disabled = true;
    document.getElementById("kbd-macro-clear").disabled = true;
    document.getElementById('kbd-macro-save').disabled = true;
  }
  var _0x4d1778 = layui.$;
  var _0x204005 = "<table>";
  _0x204005 += "<tr>";
  for (let _0xa18316 = 0x0; _0xa18316 < edit_macros.length; _0xa18316++) {
    var _0x4a5051 = edit_macros[_0xa18316];
    _0x204005 += "<td style=\"padding-top: 3px;\">";
    _0x204005 += "<a macro-edit-item-index=\"" + _0xa18316 + "\" macro-edit-item-action=\"select\" style=\"cursor: pointer;\">";
    if (is_dark_theme()) {
      _0x204005 += "<div style=\"width: 110px;height: 60px;margin-left: 3px;background-color: #202020;\">";
    } else {
      _0x204005 += "<div style=\"width: 110px;height: 60px;margin-left: 3px;background-color: gray;\">";
    }
    _0x204005 += "<div class=\"layui-setting-title-container\" style=\"height: 50%;\">";
    if (_0x4a5051.mouse_key_event == 0x20a) {
      if (_0x4a5051.mouse_key_code > 0x0) {
        _0x204005 += "<img src=\"" + RESOURCE_URL + "setting/mkey_up.png\" style=\"width: 20px;height: 22px; margin:4px;\"/>";
        _0x204005 += "<p style=\"color: white;margin-top: 6px;\">" + layui.i18np.prop("STRID_KEY_WHELL_UP_S") + '<br>' + _0x4a5051.mouse_key_code + "</p>";
      } else {
        _0x204005 += "<img src=\"" + RESOURCE_URL + "setting/mkey_down.png\" style=\"width: 20px;height: 22px; margin:4px;\"/>";
        _0x204005 += "<p style=\"color: white;margin-top: 6px;\">" + layui.i18np.prop("STRID_KEY_WHELL_DOWN_S") + "<br>" + Math.abs(_0x4a5051.mouse_key_code) + "</p>";
      }
    } else {
      if (_0x4a5051.mouse_key_event == 0x20e) {
        if (_0x4a5051.mouse_key_code < 0x0) {
          _0x204005 += "<img src=\"" + RESOURCE_URL + "setting/mkey_up.png\" style=\"width: 20px;height: 22px; margin:4px;\"/>";
          _0x204005 += "<p style=\"color: white;margin-top: 6px;\">" + layui.i18np.prop("STRID_KEY_WHELL_LEFT_S") + '<br>' + Math.abs(_0x4a5051.mouse_key_code) + "</p>";
        } else {
          _0x204005 += "<img src=\"" + RESOURCE_URL + "setting/mkey_down.png\" style=\"width: 20px;height: 22px; margin:4px;\"/>";
          _0x204005 += "<p style=\"color: white;margin-top: 6px;\">" + layui.i18np.prop('STRID_KEY_WHELL_RIGHT_S') + "<br>" + _0x4a5051.mouse_key_code + "</p>";
        }
      } else {
        if (_0x4a5051.mouse_key_event == 0x200) {
          _0x204005 += "<img src=\"" + RESOURCE_URL + "setting/mkey_move.png\" style=\"width: 20px;height: 22px; margin:4px;\"/>";
          var _0x6b054a = _0x4a5051.mouse_key_code >> 0x10 & 0xffff;
          var _0x41bdcb = _0x4a5051.mouse_key_code & 0xffff;
          _0x204005 += "<p style=\"color: white;margin-top: 6px;\">" + layui.i18np.prop("STRID_KEY_MOUSE_MOVE_S") + '<br>' + (_0x6b054a - 0x7ff) / 0xa + ':' + (_0x41bdcb - 0x7ff) / 0xa + "</p>";
        } else {
          if (_0x4a5051.mouse_key_event == 0x2ff) {
            _0x204005 += "<img src=\"" + RESOURCE_URL + "setting/mkey_position.png\" style=\"width: 20px;height: 22px; margin:4px;\"/>";
            var _0x47e98c = window.screen.width;
            var _0x1ceffd = window.screen.height;
            var _0x34bf71 = _0x4a5051.mouse_key_code >> 0x10 & 0xffff;
            var _0xacfbb9 = _0x4a5051.mouse_key_code & 0xffff;
            _0x34bf71 = parseInt(_0x34bf71 * _0x47e98c / 0xffff);
            _0xacfbb9 = parseInt(_0xacfbb9 * _0x1ceffd / 0xffff);
            _0x204005 += "<p style=\"color: white;margin-top: 6px;\">" + layui.i18np.prop("STRID_KEY_MOUSE_POSITION_S") + "<br>" + _0x34bf71 + ':' + _0xacfbb9 + "</p>";
          } else if (_0x4a5051.mouse_key_code == 0x0) {
            _0x204005 += "<p style=\"color: white;margin-left:4px;\">" + get_key_name_from_code(_0x4a5051.mouse_key_code) + "</p>";
          } else if (_0x4a5051.mouse_key_event == 0x101) {
            if (_0x4a5051.mouse_key_code >= 0xff && _0x4a5051.mouse_key_code < 0x200) {
              _0x204005 += "<img src=\"" + RESOURCE_URL + "setting/mkey_up.png\" style=\"width: 20px;height: 22px; margin:4px;\"/>";
            } else {
              _0x204005 += "<img src=\"" + RESOURCE_URL + "setting/key_up.png\" style=\"width: 20px;height: 22px; margin:4px;\"/>";
            }
            _0x204005 += "<p style=\"color: white;margin-top: 6px;\">" + get_key_name_from_code(_0x4a5051.mouse_key_code) + "</p>";
          } else {
            if (_0x4a5051.mouse_key_code >= 0xff && _0x4a5051.mouse_key_code < 0x200) {
              _0x204005 += "<img src=\"" + RESOURCE_URL + "setting/mkey_down.png\" style=\"width: 20px;height: 22px; margin:4px;\"/>";
            } else {
              _0x204005 += "<img src=\"" + RESOURCE_URL + "setting/key_down.png\" style=\"width: 20px;height: 22px; margin:4px;\"/>";
            }
            _0x204005 += "<p style=\"color: white;margin-top: 6px;\">" + get_key_name_from_code(_0x4a5051.mouse_key_code) + "</p>";
          }
        }
      }
    }
    _0x204005 += "</div>";
    _0x204005 += "<div class=\"layui-setting-title-container\" style=\"height: 50%;\">";
    _0x204005 += "<img src=\"" + RESOURCE_URL + "setting/key_waiting.png\" style=\"width: 18px;height: 20px; margin:4px;\"/>";
    if (_0x4a5051.mouse_key_event == 0x200 && _0x4a5051.mouse_key_loop > 0x1) {
      _0x204005 += "<p style=\"color: white;\">" + _0x4a5051.mouse_key_time + 'x' + _0x4a5051.mouse_key_loop + " " + layui.i18np.prop("STRID_SETTING_MAPPING_MACRO_ACTION_KEEP_TIME_MS") + "</p>";
    } else {
      _0x204005 += "<p style=\"color: white;\">" + _0x4a5051.mouse_key_time + " " + layui.i18np.prop("STRID_SETTING_MAPPING_MACRO_ACTION_KEEP_TIME_MS") + "</p>";
    }
    _0x204005 += "</div>";
    _0x204005 += "</div>";
    _0x204005 += "</a>";
    _0x204005 += "</td>";
    if ((_0xa18316 + 0x1) % 0x7 == 0x0) {
      _0x204005 += "</tr><tr>";
    }
  }
  ;
  _0x204005 += '</tr>';
  _0x204005 += "</table>";
  _0x4d1778('#kbd-macro-edit-container').html(_0x204005);
}
function create_light_mode_info(_0x1ec958, _0x57258e) {
  var _0x35d389 = {
    mode: _0x1ec958,
    name: _0x57258e
  };
  return _0x35d389;
}
function kbd_ui_refresh_light_mode(_0x483eea) {
  var _0x5ec3fc = layui.$;
  var _0x16de74 = layui.form;
  kbd_light_mode.splice(0x0, kbd_light_mode.length);
  kbd_light_mode.push(create_light_mode_info(0x0, layui.i18np.prop('STRID_CLOSE')));
  kbd_light_mode.push(create_light_mode_info(0x2d, layui.i18np.prop("STRID_KBD_LIGHT_MODE_DEFINE")));
  for (var _0x577627 = 0x1; _0x577627 < 0x19; _0x577627++) {
    kbd_light_mode.push(create_light_mode_info(_0x577627, layui.i18np.prop("STRID_KBD_LIGHT_MODE" + _0x577627)));
  }
  kbd_light_mode.push(create_light_mode_info(0x1c, layui.i18np.prop("STRID_KBD_LIGHT_MODE" + 0x1c)));
  kbd_light_mode.push(create_light_mode_info(0x1d, layui.i18np.prop("STRID_KBD_LIGHT_MODE" + 0x1d)));
  kbd_light_mode.push(create_light_mode_info(0x1e, layui.i18np.prop("STRID_KBD_LIGHT_MODE" + 0x1e)));
  var _0x4862d5 = "<select name=\"kbd-light-mode\" lay-verify=\"required\" lay-filter=\"kbd-light-mode\">";
  for (let _0x1d7406 = 0x0; _0x1d7406 < kbd_light_mode.length; _0x1d7406++) {
    _0x4862d5 += "<option value=\"" + _0x1d7406 + "\">" + (_0x1d7406 + 0x1 + ". " + kbd_light_mode[_0x1d7406].name) + "</option>";
  }
  _0x4862d5 += "</select>";
  _0x5ec3fc("#kbd-light-mode-container").html(_0x4862d5);
  _0x5ec3fc("[name=\"kbd-light-mode\"]").val(0xd);
  for (var _0x577627 = 0x0; _0x577627 < kbd_light_mode.length; _0x577627++) {
    if (kbd_light_mode[_0x577627].mode == kbd_edit_info.mode) {
      _0x5ec3fc("[name=\"kbd-light-mode\"]").val(_0x577627);
      break;
    }
  }
  kbd_sleep_time.splice(0x0, kbd_light_mode.length);
  kbd_sleep_time.push(create_light_mode_info(0x0, layui.i18np.prop('STRID_KBD_LIGHT_SLEEP_TIME1')));
  kbd_sleep_time.push(create_light_mode_info(0x12c, layui.i18np.prop("STRID_KBD_LIGHT_SLEEP_TIME2")));
  kbd_sleep_time.push(create_light_mode_info(0x384, layui.i18np.prop("STRID_KBD_LIGHT_SLEEP_TIME3")));
  kbd_sleep_time.push(create_light_mode_info(0x708, layui.i18np.prop("STRID_KBD_LIGHT_SLEEP_TIME4")));
  kbd_sleep_time.push(create_light_mode_info(0xe10, layui.i18np.prop("STRID_KBD_LIGHT_SLEEP_TIME5")));
  var _0x4862d5 = "<select name=\"kbd-light-sleep-time\" lay-verify=\"required\" lay-filter=\"kbd-light-sleep-time\">";
  for (let _0x3a359f = 0x0; _0x3a359f < kbd_sleep_time.length; _0x3a359f++) {
    _0x4862d5 += "<option value=\"" + _0x3a359f + "\">" + (_0x3a359f + 0x1 + ". " + kbd_sleep_time[_0x3a359f].name) + "</option>";
  }
  _0x4862d5 += "</select>";
  _0x5ec3fc('#kbd-light-sleep-time-container').html(_0x4862d5);
  _0x5ec3fc("[name=\"kbd-light-sleep-time\"]").val(0x0);
  for (var _0x577627 = 0x0; _0x577627 < kbd_sleep_time.length; _0x577627++) {
    if (kbd_sleep_time[_0x577627].mode == kbd_edit_info.sleep_time) {
      _0x5ec3fc("[name=\"kbd-light-sleep-time\"]").val(_0x577627);
      break;
    }
  }
  _0x16de74.render('select');
}
function kbd_ui_refresh_light(_0x1505ed) {
  if (kbd_edit_info.mode == 0x2d) {
    document.getElementById("kbd-light-wasd").disabled = false;
    document.getElementById('kbd-light-select-all').disabled = false;
    document.getElementById("kbd-light-reverse-all").disabled = false;
    document.getElementById("kbd-light-clear").disabled = false;
  } else {
    document.getElementById("kbd-light-wasd").disabled = true;
    document.getElementById("kbd-light-select-all").disabled = true;
    document.getElementById('kbd-light-reverse-all').disabled = true;
    document.getElementById('kbd-light-clear').disabled = true;
  }
  var _0x33444e = hsvToRgb(kbd_edit_info.hue, kbd_edit_info.sat, Math.floor(0xff * kbd_edit_info.brightness / 0x64));
  if (kbd_edit_info.mode == 0x2d && kbd_matrix_select_keys.length > 0x0) {
    _0x33444e = hsvToRgb(kbd_matrix_select_keys[0x0].hue, kbd_matrix_select_keys[0x0].sat, Math.floor(0xff * kbd_edit_info.brightness / 0x64));
  }
  document.getElementById("pick-color").value = rgbToHex(_0x33444e.r, _0x33444e.g, _0x33444e.b);
  $('#color-r-input').val(_0x33444e.r);
  $('#color-g-input').val(_0x33444e.g);
  $("#color-b-input").val(_0x33444e.b);
  var _0x15eeab = layui.slider;
  var _0x12679b = _0x15eeab.render({
    'elem': "#kbd-light-global-brightness",
    'min': 0x0,
    'max': 0x64,
    'step': 0x1,
    'value': kbd_edit_info.brightness,
    'input': true,
    'tips': false,
    'disabled': !!(kbd_edit_info.mode == 0x0),
    'theme': theme_color,
    'done': function (_0x541909) {
      if (kbd_edit_info.brightness != _0x541909) {
        kbd_edit_info.brightness = _0x541909;
        hs_set_light(current_usb_client, 0x1, kbd_edit_info);
      }
    }
  });
  _0x12679b.setValue(kbd_edit_info.brightness);
  _0x12679b = _0x15eeab.render({
    'elem': "#kbd-light-global-speed",
    'min': 0x0,
    'max': 0x64,
    'step': 0x1,
    'value': kbd_edit_info.speed,
    'input': true,
    'tips': false,
    'disabled': !!(kbd_edit_info.mode == 0x0 || kbd_edit_info.mode == 0x1 || kbd_edit_info.mode == 0x2d),
    'theme': theme_color,
    'done': function (_0x385024) {
      if (kbd_edit_info.speed != _0x385024) {
        kbd_edit_info.speed = _0x385024;
        hs_set_light(current_usb_client, 0x3, kbd_edit_info);
      }
    }
  });
  _0x12679b.setValue(kbd_edit_info.speed);
  kbd_ui_refresh_light_mode(_0x1505ed);
}
function kbd_ui_refresh_light_box_mode(_0x4f9d40) {
  var _0x2847a3 = layui.$;
  var _0x147be3 = layui.form;
  kbd_light_mode.splice(0x0, kbd_light_mode.length);
  kbd_light_mode.push(create_light_mode_info(0x0, layui.i18np.prop('STRID_CLOSE')));
  kbd_light_mode.push(create_light_mode_info(0x1, layui.i18np.prop("STRID_KBD_LIGHT_BOX_MODE1")));
  kbd_light_mode.push(create_light_mode_info(0x2, layui.i18np.prop('STRID_KBD_LIGHT_BOX_MODE2')));
  kbd_light_mode.push(create_light_mode_info(0x3, layui.i18np.prop('STRID_KBD_LIGHT_BOX_MODE3')));
  kbd_light_mode.push(create_light_mode_info(0x4, layui.i18np.prop("STRID_KBD_LIGHT_BOX_MODE4")));
  var _0x4e1fc9 = "<select name=\"kbd-light-box-mode\" lay-verify=\"required\" lay-filter=\"kbd-light-box-mode\">";
  for (let _0x567d8d = 0x0; _0x567d8d < kbd_light_mode.length; _0x567d8d++) {
    _0x4e1fc9 += "<option value=\"" + _0x567d8d + "\">" + (_0x567d8d + 0x1 + ". " + kbd_light_mode[_0x567d8d].name) + "</option>";
  }
  _0x4e1fc9 += "</select>";
  _0x2847a3('#kbd-light-box-mode-container').html(_0x4e1fc9);
  _0x2847a3("[name=\"kbd-light-box-mode\"]").val(0x1);
  for (var _0x9ce5d9 = 0x0; _0x9ce5d9 < kbd_light_mode.length; _0x9ce5d9++) {
    if (kbd_light_mode[_0x9ce5d9].mode == kbd_edit_info.light_box_info.mode) {
      _0x2847a3("[name=\"kbd-light-box-mode\"]").val(_0x9ce5d9);
      break;
    }
  }
  _0x147be3.render("select");
}
function kbd_ui_refresh_light_box(_0xd18c98) {
  document.getElementById('kbd-light-wasd').disabled = true;
  document.getElementById('kbd-light-select-all').disabled = true;
  document.getElementById("kbd-light-reverse-all").disabled = true;
  document.getElementById("kbd-light-clear").disabled = true;
  $("[name=\"kbd-light-box-colored\"]").prop('checked', kbd_edit_info.light_box_info.colored == 0x1);
  var _0x445f46 = {
    'r': kbd_edit_info.light_box_info.r,
    'g': kbd_edit_info.light_box_info.g,
    'b': kbd_edit_info.light_box_info.b
  };
  document.getElementById("light-box-pick-color").value = rgbToHex(_0x445f46.r, _0x445f46.g, _0x445f46.b);
  $("#light-box-color-r-input").val(_0x445f46.r);
  $("#light-box-color-g-input").val(_0x445f46.g);
  $("#light-box-color-b-input").val(_0x445f46.b);
  var _0x588c50 = layui.slider;
  var _0x133ed1 = _0x588c50.render({
    'elem': "#kbd-light-box-global-brightness",
    'min': 0x0,
    'max': 0x64,
    'step': 0x1,
    'value': kbd_edit_info.light_box_info.brightness,
    'input': true,
    'tips': false,
    'theme': theme_color,
    'done': function (_0x2aaeb2) {
      if (kbd_edit_info.light_box_info.brightness != _0x2aaeb2) {
        kbd_edit_info.light_box_info.brightness = _0x2aaeb2;
        hs_set_light_box(current_usb_client, kbd_edit_info.light_box_info);
      }
    }
  });
  _0x133ed1.setValue(kbd_edit_info.light_box_info.brightness);
  _0x133ed1 = _0x588c50.render({
    'elem': "#kbd-light-box-global-speed",
    'min': 0x0,
    'max': 0x64,
    'step': 0x1,
    'value': kbd_edit_info.light_box_info.speed,
    'input': true,
    'tips': false,
    'theme': theme_color,
    'done': function (_0x226db5) {
      if (kbd_edit_info.light_box_info.speed != _0x226db5) {
        kbd_edit_info.light_box_info.speed = _0x226db5;
        hs_set_light_box(current_usb_client, kbd_edit_info.light_box_info);
      }
    }
  });
  _0x133ed1.setValue(kbd_edit_info.light_box_info.speed);
  kbd_ui_refresh_light_box_mode(_0xd18c98);
}
function changeColor() {
  if (kbd_edit_info.mode == 0x0) {
    return;
  }
  var _0x4ae655 = document.getElementById("pick-color");
  var _0x411978 = '0x' + _0x4ae655.value.substring(0x1);
  var _0x47648c = Number(_0x411978);
  var _0x4f9fff = _0x47648c >> 0x10 & 0xff;
  var _0x3581b2 = _0x47648c >> 0x8 & 0xff;
  var _0x4c934d = _0x47648c & 0xff;
  var _0x1fbc5b = rgbToHsv(_0x4f9fff, _0x3581b2, _0x4c934d);
  $("#color-r-input").val(_0x4f9fff);
  $('#color-g-input').val(_0x3581b2);
  $("#color-b-input").val(_0x4c934d);
  if (kbd_edit_info.hue != _0x1fbc5b.h || kbd_edit_info.sat != _0x1fbc5b.s) {
    kbd_edit_info.hue = _0x1fbc5b.h;
    kbd_edit_info.sat = _0x1fbc5b.s;
    if (kbd_edit_info.mode != 0x0 && kbd_edit_info.mode != 0x2d) {
      hs_set_light(current_usb_client, 0x4, kbd_edit_info);
    }
  }
}
function light_box_changeColor() {
  var _0x474346 = document.getElementById('light-box-pick-color');
  var _0xb5ae48 = '0x' + _0x474346.value.substring(0x1);
  var _0x380f3c = Number(_0xb5ae48);
  var _0x24d74b = _0x380f3c >> 0x10 & 0xff;
  var _0x1a9592 = _0x380f3c >> 0x8 & 0xff;
  var _0x359d70 = _0x380f3c & 0xff;
  $("#light-box-color-r-input").val(_0x24d74b);
  $('#light-box-color-g-input').val(_0x1a9592);
  $("#light-box-color-b-input").val(_0x359d70);
  if (kbd_edit_info.light_box_info.r != _0x24d74b || kbd_edit_info.light_box_info.g != _0x1a9592 || kbd_edit_info.light_box_info.b != _0x359d70) {
    kbd_edit_info.light_box_info.r = _0x24d74b;
    kbd_edit_info.light_box_info.g = _0x1a9592;
    kbd_edit_info.light_box_info.b = _0x359d70;
    hs_set_light_box(current_usb_client, kbd_edit_info.light_box_info);
  }
}
function kbd_ui_refresh_light_matrix(_0x3ed352) {
  var _0x599038 = 0xd;
  if (is_keyboard_5_15(_0x3ed352.device)) {
    _0x599038 = 0xe;
  }
  var _0x197e16 = "<div class=\"layui-row\" style=\"margin-top: 10px;\">";
  for (let _0x4ce1d6 = 0x0; _0x4ce1d6 < kbd_key_infos.length; _0x4ce1d6++) {
    var _0x446774 = kbd_key_infos[_0x4ce1d6].name;
    var _0x46b90a = kbd_key_infos[_0x4ce1d6].rect;
    var _0xd87a0e = _0x46b90a[0x0];
    var _0x1b021c = _0x46b90a[0x1];
    var _0x5377f0 = _0x46b90a[0x2];
    var _0x30c57f = _0x46b90a[0x3];
    var _0x16e888 = kbd_key_infos[_0x4ce1d6].row;
    var _0x1ec6a7 = kbd_key_infos[_0x4ce1d6].col;
    var _0x253748 = true;
    if (kbd_edit_info.mode == 0x2d) {
      _0x253748 = false;
    }
    _0x197e16 += "<div class=\"layui-col-xs3\" style=\"width:" + _0x5377f0 + "px; height:" + _0x30c57f + "px; margin-left:" + _0xd87a0e + "px; margin-top:" + _0x1b021c + "px; \">";
    if (_0x253748) {
      _0x197e16 += "<a kbd-light-matrix-index=\"" + -0x1 + "\"kbd-light-matrix-action=\"select\" style=\"cursor: not-allowed;\">";
      _0x197e16 += "<div style=\"width:" + _0x5377f0 + "px; height:" + _0x30c57f + "px;\">";
      _0x197e16 += "<div style=\"justify-content: center; align-items: center; position: absolute; width:" + _0x5377f0 + "px; height:" + _0x30c57f + "px;\">";
      " ";
    } else {
      _0x197e16 += "<a kbd-light-matrix-index=\"" + _0x4ce1d6 + "\"kbd-light-matrix-action=\"select\" style=\"cursor: pointer;\">";
      _0x197e16 += "<div style=\"width:" + _0x5377f0 + "px; height:" + _0x30c57f + "px;\">";
      _0x197e16 += "<div class=\"layui-hover-bg-trans\" style=\"justify-content: center; align-items: center; position: absolute; width:" + _0x5377f0 + "px; height:" + _0x30c57f + "px;\">";
      " ";
    }
    if (is_keyboard_5_15(_0x3ed352.device)) {
      _0x197e16 += "<p style=\"user-select: none;font-size: smaller;color:white;text-align: center; margin-top: 10px;\" >" + _0x446774 + '</p>';
    } else {
      _0x197e16 += "<p style=\"user-select: none;font-size: small;color:white;text-align: center; margin-top: 16px;\" >" + _0x446774 + '</p>';
    }
    var _0x227975 = "transparent";
    if (kbd_edit_info.mode == 0x2d) {
      for (let _0x2ebb33 = 0x0; _0x2ebb33 < kbd_edit_info.keys.length; _0x2ebb33++) {
        if (_0x16e888 == kbd_edit_info.keys[_0x2ebb33].row && _0x1ec6a7 == kbd_edit_info.keys[_0x2ebb33].col) {
          var _0x5aaa5d = hsvToRgb(kbd_edit_info.keys[_0x2ebb33].hue, kbd_edit_info.keys[_0x2ebb33].sat, Math.floor(0xff * kbd_edit_info.brightness / 0x64));
          _0x227975 = rgbToHex(_0x5aaa5d.r, _0x5aaa5d.g, _0x5aaa5d.b);
          break;
        }
      }
    }
    if (_0x446774 != '') {
      var _0x4d239c = (_0x5377f0 - 0x8) / 0x2;
      _0x197e16 += "<div id=\"key-color\" style=\"background-color: " + _0x227975 + "; margin-top: 6px; margin-left:" + _0x4d239c + "px; width:" + 0x8 + "px; height:" + '2' + "px;\">";
      " ";
      _0x197e16 += "</div>";
    }
    _0x197e16 += "</div>";
    for (let _0xf6c6ef = 0x0; _0xf6c6ef < kbd_matrix_select_keys.length; _0xf6c6ef++) {
      if (_0x16e888 == kbd_matrix_select_keys[_0xf6c6ef].row && _0x1ec6a7 == kbd_matrix_select_keys[_0xf6c6ef].col) {
        _0x197e16 += "<div class=\"layui-key-select-red\" style=\"position: absolute; width:" + (_0x5377f0 - 0x3) + "px; height:" + (_0x30c57f - 0x3) + "px;\">";
        " ";
        _0x197e16 += "</div>";
        break;
      }
    }
    _0x197e16 += '</div>';
    _0x197e16 += "</a>";
    _0x197e16 += "</div>";
    if (_0x4ce1d6 == _0x599038) {
      _0x197e16 += "</div><div class=\"layui-row\">";
    }
  }
  ;
  _0x197e16 += "</div>";
  $('#kbd-mapping-light-container').html(_0x197e16);
}
function kbd_ui_refresh_axis_matrix(_0x1c91ea) {
  var _0x4c38dd = 0xd;
  if (is_keyboard_5_15(_0x1c91ea.device)) {
    _0x4c38dd = 0xe;
  }
  var _0x3b584e = "<div class=\"layui-row\" style=\"margin-top: 10px;\">";
  for (let _0xb31b2b = 0x0; _0xb31b2b < kbd_key_infos.length; _0xb31b2b++) {
    var _0x35df5c = kbd_key_infos[_0xb31b2b].name;
    var _0x117f13 = kbd_key_infos[_0xb31b2b].rect;
    var _0x21c37d = _0x117f13[0x0];
    var _0x4069ad = _0x117f13[0x1];
    var _0x33ff21 = _0x117f13[0x2];
    var _0x1abd3c = _0x117f13[0x3];
    var _0x33ce11 = kbd_key_infos[_0xb31b2b].row;
    var _0x5438fb = kbd_key_infos[_0xb31b2b].col;
    _0x3b584e += "<div class=\"layui-col-xs3\" style=\"width:" + _0x33ff21 + "px; height:" + _0x1abd3c + "px; margin-left:" + _0x21c37d + "px; margin-top:" + _0x4069ad + "px; \">";
    _0x3b584e += "<a kbd-axis-matrix-index=\"" + _0xb31b2b + "\"kbd-axis-matrix-action=\"select\" style=\"cursor: pointer;\">";
    _0x3b584e += "<div style=\"width:" + _0x33ff21 + "px; height:" + _0x1abd3c + "px;\">";
    _0x3b584e += "<div class=\"layui-hover-bg-trans\" style=\"justify-content: center; align-items: center; position: absolute; width:" + _0x33ff21 + "px; height:" + _0x1abd3c + "px;\">";
    " ";
    if (is_keyboard_5_15(_0x1c91ea.device)) {
      _0x3b584e += "<p style=\"user-select: none;font-size: smaller;color:white;text-align: center; margin-top: 2px;\" >" + _0x35df5c + '</p>';
      if (_0x35df5c != '') {
        if (kbd_axis_infos.length > 0x0) {
          var _0x2d93c0 = kbd_axis_infos[_0xb31b2b].rt_press_lv / 0x3e8;
          var _0x4b6a54 = kbd_axis_infos[_0xb31b2b].rt_release_lv / 0x3e8;
          _0x3b584e += "<p style=\"user-select: none;font-size: 10px;color:#C0C0C0;text-align: center;\" >" + _0x2d93c0.toFixed(0x3) + "</p>";
          _0x3b584e += "<p style=\"user-select: none;font-size: 10px;color:#C0C0C0;text-align: center; \" >" + _0x4b6a54.toFixed(0x3) + '</p>';
        }
      }
    } else {
      _0x3b584e += "<p style=\"user-select: none;font-size: small;color:white;text-align: center; margin-top: 5px; margin-bottom:2px\" >" + _0x35df5c + "</p>";
      if (_0x35df5c != '') {
        if (kbd_axis_infos.length > 0x0) {
          var _0x2d93c0 = kbd_axis_infos[_0xb31b2b].rt_press_lv / 0x64;
          var _0x4b6a54 = kbd_axis_infos[_0xb31b2b].rt_release_lv / 0x64;
          _0x3b584e += "<p style=\"user-select: none;font-size: smaller; color:#C0C0C0; text-align: center; margin-top:1px\" >" + _0x2d93c0.toFixed(0x2) + "</p>";
          _0x3b584e += "<p style=\"user-select: none;font-size: smaller; color:#C0C0C0; text-align: center; margin-top:1px\" >" + _0x4b6a54.toFixed(0x2) + "</p>";
        }
      }
    }
    _0x3b584e += '</div>';
    for (let _0x515f79 = 0x0; _0x515f79 < kbd_matrix_select_keys.length; _0x515f79++) {
      if (_0x33ce11 == kbd_matrix_select_keys[_0x515f79].row && _0x5438fb == kbd_matrix_select_keys[_0x515f79].col) {
        _0x3b584e += "<div class=\"layui-key-select-red\" style=\"position: absolute; width:" + (_0x33ff21 - 0x3) + "px; height:" + (_0x1abd3c - 0x3) + "px;\">";
        " ";
        _0x3b584e += "</div>";
        break;
      }
    }
    _0x3b584e += "</div>";
    _0x3b584e += '</a>';
    _0x3b584e += "</div>";
    if (_0xb31b2b == _0x4c38dd) {
      _0x3b584e += "</div><div class=\"layui-row\">";
    }
  }
  ;
  _0x3b584e += "</div>";
  $('#kbd-mapping-axis-container').html(_0x3b584e);
}
function kbd_ui_refresh_axis_type(_0x42b66e) {
  if (is_dark_theme()) {
    document.getElementById("layui-axis-type-jdl-container").style.borderColor = "#292929";
    document.getElementById("layui-axis-type-hn-omega-container").style.borderColor = "#292929";
    document.getElementById("layui-axis-type-ttc-wcw-container").style.borderColor = "#292929";
    document.getElementById("layui-axis-type-jdl-container").style.backgroundColor = "#292929";
    document.getElementById("layui-axis-type-hn-omega-container").style.backgroundColor = "#292929";
    document.getElementById("layui-axis-type-ttc-wcw-container").style.backgroundColor = "#292929";
  } else {
    document.getElementById("layui-axis-type-jdl-container").style.borderColor = "#CCCCCC";
    document.getElementById("layui-axis-type-hn-omega-container").style.borderColor = "#CCCCCC";
    document.getElementById('layui-axis-type-ttc-wcw-container').style.borderColor = "#CCCCCC";
    document.getElementById("layui-axis-type-jdl-container").style.backgroundColor = "white";
    document.getElementById("layui-axis-type-hn-omega-container").style.backgroundColor = "white";
    document.getElementById("layui-axis-type-ttc-wcw-container").style.backgroundColor = "white";
  }
  document.getElementById('layui-axis-type-jdl-icon').src = RESOURCE_URL + "setting/kbd/" + "kbd_axis_jdl.png";
  document.getElementById("layui-axis-type-hn-omega-icon").src = RESOURCE_URL + 'setting/kbd/' + 'kbd_axis_hn_omega.png';
  document.getElementById('layui-axis-type-ttc-wcw-icon').src = RESOURCE_URL + "setting/kbd/" + "kbd_axis_ttc_wcw.png";
  if (kbd_matrix_select_keys.length == 0x0) {
    return;
  }
  if (kbd_edit_info.switch_type == 0x0) {
    document.getElementById("layui-axis-type-jdl-container").style.borderColor = "#16B777";
  } else {
    if (kbd_edit_info.switch_type == 0x1) {
      document.getElementById("layui-axis-type-hn-omega-container").style.borderColor = "#16B777";
    } else if (kbd_edit_info.switch_type == 0x2) {
      document.getElementById('layui-axis-type-ttc-wcw-container').style.borderColor = '#16B777';
    }
  }
}
function kbd_ui_refresh_axis(_0x10001) {
  if (kbd_matrix_select_keys.length > 0x0) {
    kbd_edit_info = kbd_matrix_select_keys[0x0];
  } else {
    kbd_edit_info = kbd_create_axis_info();
  }
  $("[name=\"kbd-axis-quick-tigger-mode\"]").prop('checked', !!(kbd_edit_info.rt_enable == 0x1));
  $("[name=\"kbd-axis-quick-tigger-mode\"]").prop('disabled', !(kbd_matrix_select_keys.length > 0x0));
  $("#kbd-axis-button-container").css('display', kbd_matrix_select_keys.length > 0x0 ? "flex" : "none");
  var _0x31d826 = 0.01;
  var _0x3090a1 = 0.01;
  var _0x470b57 = 3.4;
  var _0x486375 = 0x64;
  if (is_keyboard_5_15(_0x10001.device)) {
    _0x31d826 = 0.001;
    _0x3090a1 = 0.001;
    _0x486375 = 0x3e8;
  }
  if (kbd_edit_info.switch_type == 0x1) {
    _0x470b57 = 3.5;
  }
  var _0x1dbae3 = kbd_edit_info.apc_lv / _0x486375;
  var _0x2f5f01 = layui.slider;
  var _0x70f6e1 = _0x2f5f01.render({
    'elem': "#kbd-axis-trigger-point",
    'min': 0.1,
    'max': _0x470b57,
    'step': _0x31d826,
    'value': _0x1dbae3,
    'input': true,
    'tips': false,
    'disabled': !(kbd_matrix_select_keys.length > 0x0),
    'theme': theme_color,
    'done': function (_0x5870dc) {
      if (_0x5870dc != undefined) {
        kbd_edit_info.apc_lv = _0x5870dc * _0x486375;
      }
    }
  });
  _0x70f6e1.setValue(_0x1dbae3);
  var _0x24a720 = kbd_edit_info.rt_press_lv / _0x486375;
  _0x70f6e1 = _0x2f5f01.render({
    'elem': "#kbd-axis-press-distance",
    'min': _0x3090a1,
    'max': _0x470b57,
    'step': _0x31d826,
    'value': _0x24a720,
    'input': true,
    'tips': false,
    'disabled': !(kbd_edit_info.rt_enable == 0x1),
    'theme': theme_color,
    'done': function (_0x5450ca) {
      if (_0x5450ca != undefined) {
        kbd_edit_info.rt_press_lv = _0x5450ca * _0x486375;
      }
    }
  });
  _0x70f6e1.setValue(_0x24a720);
  var _0x55fffd = kbd_edit_info.rt_release_lv / _0x486375;
  _0x70f6e1 = _0x2f5f01.render({
    'elem': '#kbd-axis-release-distance',
    'min': _0x3090a1,
    'max': _0x470b57,
    'step': _0x31d826,
    'value': _0x55fffd,
    'input': true,
    'tips': false,
    'disabled': !(kbd_edit_info.rt_enable == 0x1),
    'theme': theme_color,
    'done': function (_0x4df52c) {
      if (_0x4df52c != undefined) {
        kbd_edit_info.rt_release_lv = _0x4df52c * _0x486375;
      }
    }
  });
  _0x70f6e1.setValue(_0x55fffd);
  var _0x777e26 = kbd_edit_info.btm_dz / _0x486375;
  _0x70f6e1 = _0x2f5f01.render({
    'elem': "#kbd-axis-dead-distance",
    'min': 0x0,
    'max': _0x470b57,
    'step': _0x31d826,
    'value': _0x777e26,
    'input': true,
    'tips': false,
    'disabled': !(kbd_edit_info.rt_enable == 0x1),
    'theme': theme_color,
    'done': function (_0x5215ea) {
      if (_0x5215ea != undefined) {
        kbd_edit_info.btm_dz = _0x5215ea * _0x486375;
      }
    }
  });
  _0x70f6e1.setValue(_0x777e26);
  kbd_ui_refresh_axis_type(_0x10001);
}
function kbd_ui_refresh_advance_key_desc(_0x37b69c) {
  $("#kbd-advance-key-desc-title").css("color", 'gray');
  document.getElementById('kbd-advance-key-desc-container').style.borderColor = "gray";
  $("#kbd-advance-key-desc-line").css('background-color', 'gray');
  $("#kbd-advance-key-desc1").css("color", "gray");
  $('#kbd-advance-key-desc1').text(layui.i18np.prop("STRID_KBD_NO_KEY_SELECTED"));
  $("#kbd-advance-key-desc-arrow").css("display", "none");
  $("#kbd-advance-key-desc-arrow").text(" â†’ ");
  $("#kbd-advance-key-desc2").css("display", "none");
  document.getElementById('kbd-advance-key-delete').disabled = true;
  document.getElementById("kbd-advance-key-set").disabled = true;
  if (kbd_key_matrix_index >= 0x0) {
    if (kbd_key_setting_index != 0x0 && kbd_key_setting_index != 0x2 || kbd_key_setting_index == 0x0 && kbd_select_elementId.length > 0x0 || kbd_key_setting_index == 0x2 && kbd_select_elementId.length > 0x0) {
      $("#kbd-advance-key-desc-title").css("color", '');
      if (is_dark_theme()) {
        document.getElementById("kbd-advance-key-desc-container").style.borderColor = '#BABABA';
        $("#kbd-key-desc-line").css('background-color', '#BABABA');
        document.getElementById("kbd-advance-key-delete").className = "layui-btn layui-key-desc-button";
        document.getElementById('kbd-advance-key-set').className = "layui-btn layui-key-desc-button";
      } else {
        document.getElementById("kbd-advance-key-desc-container").style.borderColor = 'black';
        $('#kbd-key-desc-line').css("background-color", "black");
        document.getElementById("kbd-advance-key-delete").className = "layui-btn layui-key-desc-button-light";
        document.getElementById("kbd-advance-key-set").className = "layui-btn layui-key-desc-button-light";
      }
      $('#kbd-advance-key-desc1').css("color", '');
    }
    if (kbd_key_setting_index == 0x0) {
      var _0x333d9b = true;
      for (let _0x2889ae = 0x0; _0x2889ae < kbd_socd_infos.length; _0x2889ae++) {
        if (kbd_edit_info.row1 == kbd_socd_infos[_0x2889ae].row1 && kbd_edit_info.col1 == kbd_socd_infos[_0x2889ae].col1 && kbd_edit_info.row2 == kbd_socd_infos[_0x2889ae].row2 && kbd_edit_info.col2 == kbd_socd_infos[_0x2889ae].col2 && kbd_edit_info.socd_mode == kbd_socd_infos[_0x2889ae].socd_mode) {
          _0x333d9b = false;
          break;
        }
      }
      if (kbd_select_elementId.length > 0x0) {
        $("#kbd-advance-key-desc1").text(kbd_key_infos[kbd_key_matrix_index].name);
      }
      if (kbd_edit_info.row1 >= 0x0 && kbd_edit_info.col1 >= 0x0 && kbd_edit_info.row2 >= 0x0 && kbd_edit_info.col2 >= 0x0) {
        for (let _0x49466d = 0x0; _0x49466d < kbd_key_infos.length; _0x49466d++) {
          if (kbd_key_infos[_0x49466d].row == kbd_edit_info.row1 && kbd_key_infos[_0x49466d].col == kbd_edit_info.col1) {
            $("#kbd-advance-key-desc1").css("display", '');
            $("#kbd-advance-key-desc1").css('color', theme_color);
            $('#kbd-advance-key-desc1').text(kbd_key_infos[_0x49466d].name);
            break;
          }
        }
        $("#kbd-advance-key-desc-arrow").css('display', '');
        $("#kbd-advance-key-desc-arrow").text(" + ");
        for (let _0x49831b = 0x0; _0x49831b < kbd_key_infos.length; _0x49831b++) {
          if (kbd_key_infos[_0x49831b].row == kbd_edit_info.row2 && kbd_key_infos[_0x49831b].col == kbd_edit_info.col2) {
            $("#kbd-advance-key-desc2").css('display', '');
            $("#kbd-advance-key-desc2").css("color", theme_color);
            $("#kbd-advance-key-desc2").text(kbd_key_infos[_0x49831b].name);
            break;
          }
        }
        var _0x1ae5a3 = false;
        for (let _0x23ee8c = 0x0; _0x23ee8c < kbd_socd_infos.length; _0x23ee8c++) {
          if (kbd_key_infos[kbd_key_matrix_index].row == kbd_socd_infos[_0x23ee8c].row1 && kbd_key_infos[kbd_key_matrix_index].col == kbd_socd_infos[_0x23ee8c].col1 || kbd_key_infos[kbd_key_matrix_index].row == kbd_socd_infos[_0x23ee8c].row2 && kbd_key_infos[kbd_key_matrix_index].col == kbd_socd_infos[_0x23ee8c].col2) {
            _0x1ae5a3 = true;
            break;
          }
        }
        if (_0x1ae5a3) {
          document.getElementById("kbd-advance-key-delete").disabled = false;
        }
        if (_0x333d9b) {
          document.getElementById("kbd-advance-key-set").disabled = false;
        }
      }
    } else {
      if (kbd_key_setting_index == 0x2) {
        var _0x333d9b = true;
        for (let _0x4e2f0f = 0x0; _0x4e2f0f < kbd_rs_infos.length; _0x4e2f0f++) {
          if (kbd_edit_info.row1 == kbd_rs_infos[_0x4e2f0f].row1 && kbd_edit_info.col1 == kbd_rs_infos[_0x4e2f0f].col1 && kbd_edit_info.row2 == kbd_rs_infos[_0x4e2f0f].row2 && kbd_edit_info.col2 == kbd_rs_infos[_0x4e2f0f].col2) {
            _0x333d9b = false;
            break;
          }
        }
        if (kbd_select_elementId.length > 0x0) {
          $("#kbd-advance-key-desc1").text(kbd_key_infos[kbd_key_matrix_index].name);
        }
        if (kbd_edit_info.row1 >= 0x0 && kbd_edit_info.col1 >= 0x0 && kbd_edit_info.row2 >= 0x0 && kbd_edit_info.col2 >= 0x0) {
          for (let _0x5dfe72 = 0x0; _0x5dfe72 < kbd_key_infos.length; _0x5dfe72++) {
            if (kbd_key_infos[_0x5dfe72].row == kbd_edit_info.row1 && kbd_key_infos[_0x5dfe72].col == kbd_edit_info.col1) {
              $("#kbd-advance-key-desc1").css("display", '');
              $("#kbd-advance-key-desc1").css('color', theme_color);
              $("#kbd-advance-key-desc1").text(kbd_key_infos[_0x5dfe72].name);
              break;
            }
          }
          $("#kbd-advance-key-desc-arrow").css('display', '');
          $("#kbd-advance-key-desc-arrow").text(" + ");
          for (let _0x4a9921 = 0x0; _0x4a9921 < kbd_key_infos.length; _0x4a9921++) {
            if (kbd_key_infos[_0x4a9921].row == kbd_edit_info.row2 && kbd_key_infos[_0x4a9921].col == kbd_edit_info.col2) {
              $('#kbd-advance-key-desc2').css("display", '');
              $("#kbd-advance-key-desc2").css("color", theme_color);
              $("#kbd-advance-key-desc2").text(kbd_key_infos[_0x4a9921].name);
              break;
            }
          }
          var _0x1ae5a3 = false;
          for (let _0xffa906 = 0x0; _0xffa906 < kbd_rs_infos.length; _0xffa906++) {
            if (kbd_key_infos[kbd_key_matrix_index].row == kbd_rs_infos[_0xffa906].row1 && kbd_key_infos[kbd_key_matrix_index].col == kbd_rs_infos[_0xffa906].col1 || kbd_key_infos[kbd_key_matrix_index].row == kbd_rs_infos[_0xffa906].row2 && kbd_key_infos[kbd_key_matrix_index].col == kbd_rs_infos[_0xffa906].col2) {
              _0x1ae5a3 = true;
              break;
            }
          }
          if (_0x1ae5a3) {
            document.getElementById("kbd-advance-key-delete").disabled = false;
          }
          if (_0x333d9b) {
            document.getElementById("kbd-advance-key-set").disabled = false;
          }
        }
      } else {
        if (kbd_key_setting_index == 0x1) {
          var _0x333d9b = true;
          for (let _0x486514 = 0x0; _0x486514 < kbd_mt_infos.length; _0x486514++) {
            if (kbd_edit_info.row == kbd_mt_infos[_0x486514].row && kbd_edit_info.col == kbd_mt_infos[_0x486514].col && kbd_edit_info.tap_time == kbd_mt_infos[_0x486514].tap_time && kbd_edit_info.keyCode1 == kbd_mt_infos[_0x486514].keyCode1 && kbd_edit_info.keyCode2 == kbd_mt_infos[_0x486514].keyCode2) {
              _0x333d9b = false;
              break;
            }
          }
          $("#kbd-advance-key-desc1").text(kbd_key_infos[kbd_key_matrix_index].name);
          if (kbd_edit_info.keyCode1 > 0x1 && kbd_edit_info.keyCode2 > 0x1) {
            if (kbd_key_infos[kbd_key_matrix_index].row == kbd_edit_info.row && kbd_key_infos[kbd_key_matrix_index].col == kbd_edit_info.col) {
              $("#kbd-advance-key-desc1").text('MT');
              $("#kbd-advance-key-desc-arrow").css("display", 'none');
              $("#kbd-advance-key-desc2").css("display", "none");
              document.getElementById("kbd-advance-key-delete").disabled = false;
            } else {
              $('#kbd-advance-key-desc-arrow').css("display", '');
              $("#kbd-advance-key-desc2").css('display', '');
              $("#kbd-advance-key-desc2").css("color", theme_color);
              $("#kbd-advance-key-desc2").text('MT');
            }
            if (_0x333d9b) {
              document.getElementById("kbd-advance-key-set").disabled = false;
            }
          }
        } else {
          if (kbd_key_setting_index == 0x3) {
            var _0x333d9b = true;
            for (let _0x2d44e1 = 0x0; _0x2d44e1 < kbd_dks_infos.length; _0x2d44e1++) {
              if (kbd_edit_info.row == kbd_dks_infos[_0x2d44e1].row && kbd_edit_info.col == kbd_dks_infos[_0x2d44e1].col && kbd_edit_info.keyCode1 == kbd_dks_infos[_0x2d44e1].keyCode1 && kbd_edit_info.state1 == kbd_dks_infos[_0x2d44e1].state1 && kbd_edit_info.keyCode2 == kbd_dks_infos[_0x2d44e1].keyCode2 && kbd_edit_info.state2 == kbd_dks_infos[_0x2d44e1].state2 && kbd_edit_info.keyCode3 == kbd_dks_infos[_0x2d44e1].keyCode3 && kbd_edit_info.state3 == kbd_dks_infos[_0x2d44e1].state3 && kbd_edit_info.keyCode4 == kbd_dks_infos[_0x2d44e1].keyCode4 && kbd_edit_info.state4 == kbd_dks_infos[_0x2d44e1].state4) {
                _0x333d9b = false;
                break;
              }
            }
            $("#kbd-advance-key-desc1").text(kbd_key_infos[kbd_key_matrix_index].name);
            if (kbd_edit_info.keyCode1 > 0x1 && kbd_edit_info.state1 > 0x0 || kbd_edit_info.keyCode2 > 0x1 && kbd_edit_info.state2 > 0x0 || kbd_edit_info.keyCode3 > 0x1 && kbd_edit_info.state3 > 0x0 || kbd_edit_info.keyCode4 > 0x1 && kbd_edit_info.state4 > 0x0) {
              if (kbd_key_infos[kbd_key_matrix_index].row == kbd_edit_info.row && kbd_key_infos[kbd_key_matrix_index].col == kbd_edit_info.col) {
                $('#kbd-advance-key-desc1').text("DKS");
                $("#kbd-advance-key-desc-arrow").css('display', "none");
                $("#kbd-advance-key-desc2").css('display', "none");
                document.getElementById("kbd-advance-key-delete").disabled = false;
              } else {
                $("#kbd-advance-key-desc-arrow").css('display', '');
                $("#kbd-advance-key-desc2").css('display', '');
                $("#kbd-advance-key-desc2").css('color', theme_color);
                $("#kbd-advance-key-desc2").text("DKS");
              }
              if (_0x333d9b) {
                document.getElementById("kbd-advance-key-set").disabled = false;
              }
            }
          }
        }
      }
    }
  }
}
function kbd_ui_refresh_advance_key_matrix(_0x510737) {
  var _0x297242 = 0xd;
  if (is_keyboard_5_15(_0x510737.device)) {
    _0x297242 = 0xe;
  }
  var _0x4e99ae = "<div class=\"layui-row\" style=\"margin-top: 10px;\">";
  for (let _0x24c69e = 0x0; _0x24c69e < kbd_key_infos.length; _0x24c69e++) {
    var _0x4a8018 = kbd_key_infos[_0x24c69e].name;
    var _0x55c3b0 = kbd_key_infos[_0x24c69e].rect;
    var _0x445a48 = _0x55c3b0[0x0];
    var _0x3a9013 = _0x55c3b0[0x1];
    var _0x1b77a3 = _0x55c3b0[0x2];
    var _0x5c8c80 = _0x55c3b0[0x3];
    var _0x3b9c12 = kbd_key_infos[_0x24c69e].row;
    var _0x322fee = kbd_key_infos[_0x24c69e].col;
    var _0x20dc6f = 0x0;
    var _0x524852 = (_0x1b77a3 - _0x20dc6f) / 0x2;
    var _0x1548a3 = '';
    for (let _0x3537cc = 0x0; _0x3537cc < kbd_socd_infos.length; _0x3537cc++) {
      if (_0x3b9c12 == kbd_socd_infos[_0x3537cc].row1 && _0x322fee == kbd_socd_infos[_0x3537cc].col1 || _0x3b9c12 == kbd_socd_infos[_0x3537cc].row2 && _0x322fee == kbd_socd_infos[_0x3537cc].col2) {
        _0x1548a3 = "SOCD";
        break;
      }
    }
    for (let _0x444ac9 = 0x0; _0x444ac9 < kbd_mt_infos.length; _0x444ac9++) {
      if (_0x3b9c12 == kbd_mt_infos[_0x444ac9].row && _0x322fee == kbd_mt_infos[_0x444ac9].col) {
        _0x1548a3 = 'MT';
        break;
      }
    }
    for (let _0x1e4738 = 0x0; _0x1e4738 < kbd_dks_infos.length; _0x1e4738++) {
      if (_0x3b9c12 == kbd_dks_infos[_0x1e4738].row && _0x322fee == kbd_dks_infos[_0x1e4738].col) {
        _0x1548a3 = "DKS";
        break;
      }
    }
    for (let _0x270c40 = 0x0; _0x270c40 < kbd_rs_infos.length; _0x270c40++) {
      if (_0x3b9c12 == kbd_rs_infos[_0x270c40].row1 && _0x322fee == kbd_rs_infos[_0x270c40].col1 || _0x3b9c12 == kbd_rs_infos[_0x270c40].row2 && _0x322fee == kbd_rs_infos[_0x270c40].col2) {
        _0x1548a3 = 'RS';
        break;
      }
    }
    var _0x1d3417 = false;
    if (kbd_key_setting_index == 0x0) {
      if (kbd_select_elementId.length > 0x0) {
        if (_0x1548a3 == "SOCD") {
          _0x1d3417 = true;
        }
      }
      if (_0x1548a3 == 'MT' || _0x1548a3 == 'RS' || _0x1548a3 == 'DKS') {
        _0x1d3417 = true;
      }
    } else {
      if (kbd_key_setting_index == 0x2) {
        if (kbd_select_elementId.length > 0x0) {
          if (_0x1548a3 == 'RS') {
            _0x1d3417 = true;
          }
        }
        if (_0x1548a3 == "SOCD" || _0x1548a3 == 'MT' || _0x1548a3 == 'DKS') {
          _0x1d3417 = true;
        }
      } else {
        if (kbd_key_setting_index == 0x1) {
          if (_0x1548a3 == "SOCD" || _0x1548a3 == 'RS' || _0x1548a3 == 'DKS') {
            _0x1d3417 = true;
          }
        } else if (kbd_key_setting_index == 0x3) {
          if (_0x1548a3 == "SOCD" || _0x1548a3 == 'MT' || _0x1548a3 == 'RS') {
            _0x1d3417 = true;
          }
        }
      }
    }
    _0x4e99ae += "<div class=\"layui-col-xs3\" style=\"width:" + _0x1b77a3 + "px; height:" + _0x5c8c80 + "px; margin-left:" + _0x445a48 + "px; margin-top:" + _0x3a9013 + "px; \">";
    if (_0x1d3417) {
      _0x4e99ae += "<a kbd-key-matrix-index=\"" + -0x1 + "\"kbd-advance-key-matrix-action=\"select\" style=\"cursor: not-allowed;\">";
      _0x4e99ae += "<div style=\"width:" + _0x1b77a3 + "px; height:" + _0x5c8c80 + "px;\">";
      _0x4e99ae += "<div style=\"justify-content: center; align-items: center; position: absolute; width:" + _0x1b77a3 + "px; height:" + _0x5c8c80 + "px;\">";
      " ";
    } else {
      _0x4e99ae += "<a kbd-key-matrix-index=\"" + _0x24c69e + "\"kbd-advance-key-matrix-action=\"select\" style=\"cursor: pointer;\">";
      _0x4e99ae += "<div style=\"width:" + _0x1b77a3 + "px; height:" + _0x5c8c80 + "px;\">";
      _0x4e99ae += "<div class=\"layui-hover-bg-trans\" style=\"justify-content: center; align-items: center; position: absolute; width:" + _0x1b77a3 + "px; height:" + _0x5c8c80 + "px;\">";
      " ";
    }
    if (_0x1548a3 == "SOCD") {
      _0x20dc6f = 0x8;
      _0x524852 = (_0x1b77a3 - _0x20dc6f) / 0x2;
      if (is_keyboard_5_15(_0x510737.device)) {
        _0x4e99ae += "<p style=\"user-select: none;font-size: smaller;color:orange;text-align: center; margin-top: 10px;\" >" + _0x1548a3 + "</p>";
      } else {
        _0x4e99ae += "<p style=\"user-select: none;font-size: small;color:orange;text-align: center; margin-top: 16px;\" >" + _0x1548a3 + "</p>";
      }
      _0x4e99ae += "<div id=\"key-color\" style=\"background-color: orange; margin-top: 6px; margin-left:" + _0x524852 + "px; width:" + _0x20dc6f + "px; height:" + '2' + "px;\">";
      " ";
    } else {
      if (_0x1548a3 == 'MT') {
        _0x20dc6f = 0x8;
        _0x524852 = (_0x1b77a3 - _0x20dc6f) / 0x2;
        if (is_keyboard_5_15(_0x510737.device)) {
          _0x4e99ae += "<p style=\"user-select: none;font-size: smaller;color:orange;text-align: center; margin-top: 10px;\" >" + _0x1548a3 + "</p>";
        } else {
          _0x4e99ae += "<p style=\"user-select: none;font-size: small;color:orange;text-align: center; margin-top: 16px;\" >" + _0x1548a3 + "</p>";
        }
        _0x4e99ae += "<div id=\"key-color\" style=\"background-color: orange; margin-top: 6px; margin-left:" + _0x524852 + "px; width:" + _0x20dc6f + "px; height:" + '2' + "px;\">";
        " ";
      } else {
        if (_0x1548a3 == 'RS') {
          _0x20dc6f = 0x8;
          _0x524852 = (_0x1b77a3 - _0x20dc6f) / 0x2;
          if (is_keyboard_5_15(_0x510737.device)) {
            _0x4e99ae += "<p style=\"user-select: none;font-size: smaller;color:orange;text-align: center; margin-top: 10px;\" >" + _0x1548a3 + "</p>";
          } else {
            _0x4e99ae += "<p style=\"user-select: none;font-size: small;color:orange;text-align: center; margin-top: 16px;\" >" + _0x1548a3 + "</p>";
          }
          _0x4e99ae += "<div id=\"key-color\" style=\"background-color: orange; margin-top: 6px; margin-left:" + _0x524852 + "px; width:" + _0x20dc6f + "px; height:" + '2' + "px;\">";
          " ";
        } else if (_0x1548a3 == "DKS") {
          _0x20dc6f = 0x8;
          _0x524852 = (_0x1b77a3 - _0x20dc6f) / 0x2;
          if (is_keyboard_5_15(_0x510737.device)) {
            _0x4e99ae += "<p style=\"user-select: none;font-size: smaller;color:orange;text-align: center; margin-top: 10px;\" >" + _0x1548a3 + '</p>';
          } else {
            _0x4e99ae += "<p style=\"user-select: none;font-size: small;color:orange;text-align: center; margin-top: 16px;\" >" + _0x1548a3 + "</p>";
          }
          _0x4e99ae += "<div id=\"key-color\" style=\"background-color: orange; margin-top: 6px; margin-left:" + _0x524852 + "px; width:" + _0x20dc6f + "px; height:" + '2' + "px;\">";
          " ";
        } else {
          if (is_keyboard_5_15(_0x510737.device)) {
            _0x4e99ae += "<p style=\"user-select: none;font-size: smaller;color:white;text-align: center; margin-top: 10px;\" >" + _0x4a8018 + "</p>";
          } else {
            _0x4e99ae += "<p style=\"user-select: none;font-size: small;color:white;text-align: center; margin-top: 16px;\" >" + _0x4a8018 + "</p>";
          }
          _0x4e99ae += "<div id=\"key-color\" style=\"background-color: transparent; margin-top: 6px; margin-left:" + _0x524852 + "px; width:" + _0x20dc6f + "px; height:" + '2' + "px;\">";
          " ";
        }
      }
    }
    _0x4e99ae += "</div>";
    _0x4e99ae += "</div>";
    if (kbd_key_setting_index == 0x0) {
      if (_0x1548a3 == "SOCD") {
        if (kbd_key_matrix_index == _0x24c69e) {
          _0x4e99ae += "<div class=\"layui-key-select-red\" style=\"position: absolute; width:" + (_0x1b77a3 - 0x3) + "px; height:" + (_0x5c8c80 - 0x3) + "px;\">";
          " ";
          _0x4e99ae += '</div>';
        }
      }
    } else if (kbd_key_setting_index == 0x2) {
      if (_0x1548a3 == 'RS') {
        if (kbd_key_matrix_index == _0x24c69e) {
          _0x4e99ae += "<div class=\"layui-key-select-red\" style=\"position: absolute; width:" + (_0x1b77a3 - 0x3) + "px; height:" + (_0x5c8c80 - 0x3) + "px;\">";
          " ";
          _0x4e99ae += '</div>';
        }
      }
    } else if (!_0x1d3417 && kbd_key_matrix_index == _0x24c69e) {
      _0x4e99ae += "<div class=\"layui-key-select-red\" style=\"position: absolute; width:" + (_0x1b77a3 - 0x3) + "px; height:" + (_0x5c8c80 - 0x3) + "px;\">";
      " ";
      _0x4e99ae += "</div>";
    }
    _0x4e99ae += "</div>";
    _0x4e99ae += '</a>';
    _0x4e99ae += '</div>';
    if (_0x24c69e == _0x297242) {
      _0x4e99ae += "</div><div class=\"layui-row\">";
    }
  }
  ;
  _0x4e99ae += "</div>";
  $("#kbd-mapping-advance-key-container").html(_0x4e99ae);
}
function kbd_ui_refresh_socd(_0x289c2e) {
  document.getElementById("kbd-socd-key1").style.color = '';
  document.getElementById("kbd-socd-key1").style.borderColor = "gray";
  document.getElementById("kbd-socd-key1").style.backgroundColor = "transparent";
  document.getElementById('kbd-socd-key1').textContent = layui.i18np.prop('STRID_KBD_SOCD_KEY1');
  document.getElementById('kbd-socd-key2').style.color = '';
  document.getElementById('kbd-socd-key2').style.borderColor = 'gray';
  document.getElementById("kbd-socd-key2").style.backgroundColor = "transparent";
  document.getElementById('kbd-socd-key2').textContent = layui.i18np.prop("STRID_KBD_SOCD_KEY2");
  $("[name=\"kbd-socd-type\"]")[0x0].checked = true;
  if (is_dark_theme()) {
    document.getElementById("kbd-socd-key1").className = "layui-btn layui-key-desc-button";
    document.getElementById('kbd-socd-key2').className = "layui-btn layui-key-desc-button";
  } else {
    document.getElementById("kbd-socd-key1").className = "layui-btn layui-key-desc-button-light";
    document.getElementById("kbd-socd-key2").className = "layui-btn layui-key-desc-button-light";
  }
  kbd_edit_info = kbd_create_socd_info();
  if (kbd_key_matrix_index > 0x0) {
    for (let _0xccdef5 = 0x0; _0xccdef5 < kbd_socd_infos.length; _0xccdef5++) {
      if (kbd_key_infos[kbd_key_matrix_index].row == kbd_socd_infos[_0xccdef5].row1 && kbd_key_infos[kbd_key_matrix_index].col == kbd_socd_infos[_0xccdef5].col1 || kbd_key_infos[kbd_key_matrix_index].row == kbd_socd_infos[_0xccdef5].row2 && kbd_key_infos[kbd_key_matrix_index].col == kbd_socd_infos[_0xccdef5].col2) {
        kbd_edit_info = kbd_clone_socd_info(kbd_socd_infos[_0xccdef5]);
        break;
      }
    }
  }
  if (kbd_edit_info.row1 >= 0x0 && kbd_edit_info.col1 >= 0x0) {
    for (let _0x5a94fd = 0x0; _0x5a94fd < kbd_key_infos.length; _0x5a94fd++) {
      var _0x2ec0a9 = kbd_key_infos[_0x5a94fd].name;
      var _0x281861 = kbd_key_infos[_0x5a94fd].row;
      var _0x4913fe = kbd_key_infos[_0x5a94fd].col;
      if (kbd_edit_info.row1 == _0x281861 && kbd_edit_info.col1 == _0x4913fe) {
        document.getElementById("kbd-socd-key1").textContent = _0x2ec0a9;
        document.getElementById("kbd-socd-key1").style.borderColor = "#16B777";
        break;
      }
    }
  }
  if (kbd_edit_info.row2 >= 0x0 && kbd_edit_info.col2 >= 0x0) {
    for (let _0x3947e2 = 0x0; _0x3947e2 < kbd_key_infos.length; _0x3947e2++) {
      var _0x2ec0a9 = kbd_key_infos[_0x3947e2].name;
      var _0x281861 = kbd_key_infos[_0x3947e2].row;
      var _0x4913fe = kbd_key_infos[_0x3947e2].col;
      if (kbd_edit_info.row2 == _0x281861 && kbd_edit_info.col2 == _0x4913fe) {
        document.getElementById('kbd-socd-key2').textContent = _0x2ec0a9;
        document.getElementById("kbd-socd-key2").style.borderColor = '#16B777';
        break;
      }
    }
  }
  if (kbd_edit_info.socd_mode >= 0x0 && kbd_edit_info.socd_mode < 0x4) {
    $("[name=\"kbd-socd-type\"]")[kbd_edit_info.socd_mode].checked = true;
  }
}
function kbd_ui_refresh_mt(_0x385057) {
  kbd_edit_info = kbd_create_mt_info();
  if (kbd_key_matrix_index > 0x0) {
    for (let _0x388735 = 0x0; _0x388735 < kbd_mt_infos.length; _0x388735++) {
      if (kbd_key_infos[kbd_key_matrix_index].row == kbd_mt_infos[_0x388735].row && kbd_key_infos[kbd_key_matrix_index].col == kbd_mt_infos[_0x388735].col) {
        kbd_edit_info = kbd_clone_mt_info(kbd_mt_infos[_0x388735]);
        break;
      }
    }
  }
  if (kbd_edit_info.keyCode1 > 0x1) {
    document.getElementById("kbd-mt-key1").style.borderColor = "#16B777";
    document.getElementById("kbd-mt-key1").textContent = get_key_name_from_keyid(kbd_edit_info.keyCode1);
  } else {
    document.getElementById("kbd-mt-key1").style.borderColor = "gray";
    document.getElementById('kbd-mt-key1').textContent = layui.i18np.prop('STRID_KBD_MT_SELECT_KEY');
  }
  if (kbd_edit_info.keyCode2 > 0x1) {
    document.getElementById("kbd-mt-key2").style.borderColor = "#16B777";
    document.getElementById('kbd-mt-key2').textContent = get_key_name_from_keyid(kbd_edit_info.keyCode2);
  } else {
    document.getElementById("kbd-mt-key2").style.borderColor = "gray";
    document.getElementById('kbd-mt-key2').textContent = layui.i18np.prop('STRID_KBD_MT_SELECT_KEY');
  }
  if (is_dark_theme()) {
    document.getElementById("kbd-mt-key1").className = "layui-btn layui-key-desc-button";
    document.getElementById('kbd-mt-key2').className = "layui-btn layui-key-desc-button";
  } else {
    document.getElementById("kbd-mt-key1").className = "layui-btn layui-key-desc-button-light";
    document.getElementById("kbd-mt-key2").className = "layui-btn layui-key-desc-button-light";
  }
  var _0x1456f6 = layui.slider;
  var _0x55da90 = _0x1456f6.render({
    'elem': "#kbd-mt-longpress-time",
    'min': 0x64,
    'max': 0x1f4,
    'step': 0x1,
    'value': kbd_edit_info.tap_time,
    'input': true,
    'tips': false,
    'theme': theme_color,
    'done': function (_0x3ebc87) {
      if (_0x3ebc87 != undefined) {
        kbd_edit_info.tap_time = _0x3ebc87;
      }
    }
  });
  _0x55da90.setValue(kbd_edit_info.tap_time);
}
function kbd_ui_refresh_rs(_0x3b244e) {
  document.getElementById('kbd-rs-key1').style.color = '';
  document.getElementById("kbd-rs-key1").style.borderColor = "gray";
  document.getElementById("kbd-rs-key1").style.backgroundColor = "transparent";
  document.getElementById("kbd-rs-key1").textContent = layui.i18np.prop('STRID_KBD_SOCD_KEY1');
  document.getElementById("kbd-rs-key2").style.color = '';
  document.getElementById('kbd-rs-key2').style.borderColor = "gray";
  document.getElementById('kbd-rs-key2').style.backgroundColor = "transparent";
  document.getElementById("kbd-rs-key2").textContent = layui.i18np.prop("STRID_KBD_SOCD_KEY2");
  if (is_dark_theme()) {
    document.getElementById("kbd-rs-key1").className = "layui-btn layui-key-desc-button";
    document.getElementById('kbd-rs-key2').className = "layui-btn layui-key-desc-button";
  } else {
    document.getElementById("kbd-rs-key1").className = "layui-btn layui-key-desc-button-light";
    document.getElementById("kbd-rs-key2").className = "layui-btn layui-key-desc-button-light";
  }
  kbd_edit_info = kbd_create_rs_info();
  if (kbd_key_matrix_index > 0x0) {
    for (let _0x1b034f = 0x0; _0x1b034f < kbd_rs_infos.length; _0x1b034f++) {
      if (kbd_key_infos[kbd_key_matrix_index].row == kbd_rs_infos[_0x1b034f].row1 && kbd_key_infos[kbd_key_matrix_index].col == kbd_rs_infos[_0x1b034f].col1 || kbd_key_infos[kbd_key_matrix_index].row == kbd_rs_infos[_0x1b034f].row2 && kbd_key_infos[kbd_key_matrix_index].col == kbd_rs_infos[_0x1b034f].col2) {
        kbd_edit_info = kbd_clone_rs_info(kbd_rs_infos[_0x1b034f]);
        break;
      }
    }
  }
  if (kbd_edit_info.row1 >= 0x0 && kbd_edit_info.col1 >= 0x0) {
    for (let _0x1b15bd = 0x0; _0x1b15bd < kbd_key_infos.length; _0x1b15bd++) {
      var _0x6777ea = kbd_key_infos[_0x1b15bd].name;
      var _0x5c3a86 = kbd_key_infos[_0x1b15bd].row;
      var _0x189cbd = kbd_key_infos[_0x1b15bd].col;
      if (kbd_edit_info.row1 == _0x5c3a86 && kbd_edit_info.col1 == _0x189cbd) {
        document.getElementById('kbd-rs-key1').textContent = _0x6777ea;
        document.getElementById("kbd-rs-key1").style.borderColor = '#16B777';
        break;
      }
    }
  }
  if (kbd_edit_info.row2 >= 0x0 && kbd_edit_info.col2 >= 0x0) {
    for (let _0x402dab = 0x0; _0x402dab < kbd_key_infos.length; _0x402dab++) {
      var _0x6777ea = kbd_key_infos[_0x402dab].name;
      var _0x5c3a86 = kbd_key_infos[_0x402dab].row;
      var _0x189cbd = kbd_key_infos[_0x402dab].col;
      if (kbd_edit_info.row2 == _0x5c3a86 && kbd_edit_info.col2 == _0x189cbd) {
        document.getElementById('kbd-rs-key2').textContent = _0x6777ea;
        document.getElementById("kbd-rs-key2").style.borderColor = "#16B777";
        break;
      }
    }
  }
}
function kbd_ui_refresh_dks(_0x42d847) {
  kbd_edit_info = kbd_create_dks_info();
  if (kbd_key_matrix_index > 0x0) {
    for (let _0x382397 = 0x0; _0x382397 < kbd_dks_infos.length; _0x382397++) {
      if (kbd_key_infos[kbd_key_matrix_index].row == kbd_dks_infos[_0x382397].row && kbd_key_infos[kbd_key_matrix_index].col == kbd_dks_infos[_0x382397].col) {
        kbd_edit_info = kbd_clone_dks_info(kbd_dks_infos[_0x382397]);
        break;
      }
    }
  }
  if (kbd_edit_info.keyCode1 > 0x1) {
    document.getElementById("kbd-dks-key1").style.borderColor = '#16B777';
    document.getElementById("kbd-dks-key1").textContent = get_key_name_from_keyid(kbd_edit_info.keyCode1);
    kbd_ui_refresh_dks_step(0x1, kbd_edit_info.state1);
  } else {
    document.getElementById("kbd-dks-key1").style.borderColor = 'gray';
    document.getElementById("kbd-dks-key1").textContent = layui.i18np.prop("STRID_KBD_MT_SELECT_KEY");
    kbd_ui_refresh_dks_step(0x1, 0x0);
  }
  if (kbd_edit_info.keyCode2 > 0x1) {
    document.getElementById('kbd-dks-key2').style.borderColor = "#16B777";
    document.getElementById("kbd-dks-key2").textContent = get_key_name_from_keyid(kbd_edit_info.keyCode2);
    kbd_ui_refresh_dks_step(0x2, kbd_edit_info.state2);
  } else {
    document.getElementById('kbd-dks-key2').style.borderColor = "gray";
    document.getElementById('kbd-dks-key2').textContent = layui.i18np.prop("STRID_KBD_MT_SELECT_KEY");
    kbd_ui_refresh_dks_step(0x2, 0x0);
  }
  if (kbd_edit_info.keyCode3 > 0x1) {
    document.getElementById('kbd-dks-key3').style.borderColor = '#16B777';
    document.getElementById("kbd-dks-key3").textContent = get_key_name_from_keyid(kbd_edit_info.keyCode3);
    kbd_ui_refresh_dks_step(0x3, kbd_edit_info.state3);
  } else {
    document.getElementById("kbd-dks-key3").style.borderColor = 'gray';
    document.getElementById("kbd-dks-key3").textContent = layui.i18np.prop('STRID_KBD_MT_SELECT_KEY');
    kbd_ui_refresh_dks_step(0x3, 0x0);
  }
  if (kbd_edit_info.keyCode4 > 0x1) {
    document.getElementById("kbd-dks-key4").style.borderColor = '#16B777';
    document.getElementById("kbd-dks-key4").textContent = get_key_name_from_keyid(kbd_edit_info.keyCode4);
    kbd_ui_refresh_dks_step(0x4, kbd_edit_info.state4);
  } else {
    document.getElementById("kbd-dks-key4").style.borderColor = "gray";
    document.getElementById("kbd-dks-key4").textContent = layui.i18np.prop("STRID_KBD_MT_SELECT_KEY");
    kbd_ui_refresh_dks_step(0x4, 0x0);
  }
  if (is_dark_theme()) {
    document.getElementById("kbd-dks-key1").className = "layui-btn layui-key-desc-button";
    document.getElementById("kbd-dks-key2").className = "layui-btn layui-key-desc-button";
    document.getElementById("kbd-dks-key3").className = "layui-btn layui-key-desc-button";
    document.getElementById("kbd-dks-key4").className = "layui-btn layui-key-desc-button";
  } else {
    document.getElementById("kbd-dks-key1").className = "layui-btn layui-key-desc-button-light";
    document.getElementById("kbd-dks-key2").className = "layui-btn layui-key-desc-button-light";
    document.getElementById('kbd-dks-key3').className = "layui-btn layui-key-desc-button-light";
    document.getElementById("kbd-dks-key4").className = "layui-btn layui-key-desc-button-light";
  }
}
function kbd_ui_refresh_dks_dragging(_0x1b1716, _0x724926) {
  var _0x4d5e80 = Math.floor(kbd_dks_dragging_name / 0xa);
  var _0x62c56b = kbd_dks_dragging_name % 0xa;
  var _0x49fed1 = "kbd-dks-key" + _0x4d5e80 + '-' + _0x62c56b;
  var _0x2e5481 = "#kbd-dks-arrow" + _0x4d5e80 + '-' + _0x62c56b;
  var _0x237d8d = 0x18 + _0x1b1716;
  if (_0x62c56b == 0x1) {
    if (_0x237d8d >= 0x104) {
      _0x237d8d = 0x108;
    }
  } else {
    if (_0x62c56b == 0x2) {
      if (_0x237d8d >= 0xb4) {
        _0x237d8d = 0xb8;
      }
    } else {
      if (_0x62c56b == 0x3) {
        if (_0x237d8d >= 0x64) {
          _0x237d8d = 0x68;
        }
      } else if (_0x62c56b == 0x4) {
        _0x237d8d = 0x18;
      }
    }
  }
  if (_0x724926) {
    var _0x1a7ed8 = 0x0;
    if (_0x4d5e80 == 0x1) {
      _0x1a7ed8 = kbd_edit_info.state1;
    } else {
      if (_0x4d5e80 == 0x2) {
        _0x1a7ed8 = kbd_edit_info.state2;
      } else {
        if (_0x4d5e80 == 0x3) {
          _0x1a7ed8 = kbd_edit_info.state3;
        } else if (_0x4d5e80 == 0x4) {
          _0x1a7ed8 = kbd_edit_info.state4;
        }
      }
    }
    if (_0x62c56b == 0x1) {
      if (_0x237d8d < 0x28) {
        _0x237d8d = 0x18;
        _0x1a7ed8 = _0x1a7ed8 | 0x1;
      } else {
        if (_0x237d8d >= 0x28 && _0x237d8d < 0x64) {
          _0x237d8d = 0x4d;
          _0x1a7ed8 = _0x1a7ed8 | 0x1 | 0x2;
        } else {
          if (_0x237d8d >= 0x64 && _0x237d8d < 0x78) {
            _0x237d8d = 0x68;
            _0x1a7ed8 = _0x1a7ed8 | 0x1 | 0x2 | 0x4 | 0x8;
          } else {
            if (_0x237d8d >= 0x78 && _0x237d8d < 0xb4) {
              _0x237d8d = 0x9d;
              _0x1a7ed8 = _0x1a7ed8 | 0x1 | 0x2 | 0x4 | 0x8 | 0x10;
            } else {
              if (_0x237d8d >= 0xb4 && _0x237d8d < 0xc8) {
                _0x237d8d = 0xb8;
                _0x1a7ed8 = _0x1a7ed8 | 0x1 | 0x2 | 0x4 | 0x8 | 0x10 | 0x20 | 0x40;
              } else {
                if (_0x237d8d >= 0xc8 && _0x237d8d < 0x104) {
                  _0x237d8d = 0xed;
                  _0x1a7ed8 = _0x1a7ed8 | 0x1 | 0x2 | 0x4 | 0x8 | 0x10 | 0x20 | 0x40 | 0x80;
                } else if (_0x237d8d >= 0x104) {
                  _0x237d8d = 0x108;
                  _0x1a7ed8 = _0x1a7ed8 | 0x1 | 0x2 | 0x4 | 0x8 | 0x10 | 0x20 | 0x40 | 0x80 | 0x100 | 0x200;
                }
              }
            }
          }
        }
      }
    } else {
      if (_0x62c56b == 0x2) {
        if (_0x237d8d < 0x28) {
          _0x237d8d = 0x18;
          _0x1a7ed8 = _0x1a7ed8 | 0x8;
        } else {
          if (_0x237d8d >= 0x28 && _0x237d8d < 0x64) {
            _0x237d8d = 0x4d;
            _0x1a7ed8 = _0x1a7ed8 | 0x8 | 0x10;
          } else {
            if (_0x237d8d >= 0x64 && _0x237d8d < 0x78) {
              _0x237d8d = 0x68;
              _0x1a7ed8 = _0x1a7ed8 | 0x8 | 0x10 | 0x20 | 0x40;
            } else {
              if (_0x237d8d >= 0x78 && _0x237d8d < 0xb4) {
                _0x237d8d = 0x9d;
                _0x1a7ed8 = _0x1a7ed8 | 0x8 | 0x10 | 0x20 | 0x40 | 0x80;
              } else if (_0x237d8d >= 0xb4 && _0x237d8d < 0xc8) {
                _0x237d8d = 0xb8;
                _0x1a7ed8 = _0x1a7ed8 | 0x8 | 0x10 | 0x20 | 0x40 | 0x80 | 0x100 | 0x200;
              }
            }
          }
        }
      } else {
        if (_0x62c56b == 0x3) {
          if (_0x237d8d < 0x28) {
            _0x237d8d = 0x18;
            _0x1a7ed8 = _0x1a7ed8 | 0x40;
          } else {
            if (_0x237d8d >= 0x28 && _0x237d8d < 0x64) {
              _0x237d8d = 0x4d;
              _0x1a7ed8 = _0x1a7ed8 | 0x40 | 0x80;
            } else if (_0x237d8d >= 0x64 && _0x237d8d < 0x78) {
              _0x237d8d = 0x68;
              _0x1a7ed8 = _0x1a7ed8 | 0x40 | 0x80 | 0x100 | 0x200;
            }
          }
        } else if (_0x62c56b == 0x3) {
          _0x237d8d = 0x18;
          _0x1a7ed8 = _0x1a7ed8 | 0x200;
        }
      }
    }
    if (_0x4d5e80 == 0x1) {
      kbd_edit_info.state1 = _0x1a7ed8;
    } else {
      if (_0x4d5e80 == 0x2) {
        kbd_edit_info.state2 = _0x1a7ed8;
      } else {
        if (_0x4d5e80 == 0x3) {
          kbd_edit_info.state3 = _0x1a7ed8;
        } else if (_0x4d5e80 == 0x4) {
          kbd_edit_info.state4 = _0x1a7ed8;
        }
      }
    }
    kbd_ui_refresh_advance_key_desc(current_usb_client);
  }
  document.getElementById(_0x49fed1).className = 'rounded-border-green';
  $('#' + _0x49fed1).css('width', _0x237d8d);
  $(_0x2e5481).css("margin-left", _0x237d8d - 0xa);
}
function kbd_ui_refresh_dks_step(_0x3d02ab, _0x495282) {
  for (let _0x3ef873 = 0x1; _0x3ef873 < 0x5; _0x3ef873++) {
    var _0x4f1d38 = "kbd-dks-key" + _0x3d02ab + '-' + _0x3ef873;
    var _0x572c5f = '#kbd-dks-add' + _0x3d02ab + '-' + _0x3ef873;
    var _0x4bd833 = "#kbd-dks-arrow" + _0x3d02ab + '-' + _0x3ef873;
    document.getElementById(_0x4f1d38).className = "rounded-border";
    $('#' + _0x4f1d38).css('width', '20');
    $(_0x572c5f).css('display', '');
    $(_0x4bd833).css("display", "none");
  }
  if ((_0x495282 & 0x1) != 0x0) {
    var _0x4f1d38 = "kbd-dks-key" + _0x3d02ab + '-' + 0x1;
    var _0x572c5f = "#kbd-dks-add" + _0x3d02ab + '-' + 0x1;
    var _0x4bd833 = "#kbd-dks-arrow" + _0x3d02ab + '-' + 0x1;
    var _0x144f76 = 0x18;
    if ((_0x495282 & 0x2) != 0x0) {
      _0x144f76 = 0x4e;
      if ((_0x495282 & 0x4) != 0x0 && (_0x495282 & 0x8) != 0x0) {
        _0x144f76 = 0x68;
        if ((_0x495282 & 0x10) != 0x0) {
          _0x144f76 = 0x9e;
          if ((_0x495282 & 0x20) != 0x0 && (_0x495282 & 0x40) != 0x0) {
            _0x144f76 = 0xb8;
            if ((_0x495282 & 0x80) != 0x0) {
              _0x144f76 = 0xee;
              if ((_0x495282 & 0x100) != 0x0 && (_0x495282 & 0x200) != 0x0) {
                _0x144f76 = 0x108;
              }
            }
          }
        }
      }
    }
    document.getElementById(_0x4f1d38).className = "rounded-border-green";
    $('#' + _0x4f1d38).css("width", _0x144f76);
    $(_0x4bd833).css("margin-left", _0x144f76 - 0xa);
    $(_0x572c5f).css("display", "none");
    $(_0x4bd833).css("display", '');
  }
  if ((_0x495282 & 0x8) != 0x0) {
    var _0x4f1d38 = "kbd-dks-key" + _0x3d02ab + '-' + 0x2;
    var _0x572c5f = "#kbd-dks-add" + _0x3d02ab + '-' + 0x2;
    var _0x4bd833 = "#kbd-dks-arrow" + _0x3d02ab + '-' + 0x2;
    var _0x144f76 = 0x18;
    if ((_0x495282 & 0x10) != 0x0) {
      _0x144f76 = 0x4e;
      if ((_0x495282 & 0x20) != 0x0 && (_0x495282 & 0x40) != 0x0) {
        _0x144f76 = 0x68;
        if ((_0x495282 & 0x80) != 0x0) {
          _0x144f76 = 0x9e;
          if ((_0x495282 & 0x100) != 0x0 && (_0x495282 & 0x200) != 0x0) {
            _0x144f76 = 0xb8;
          }
        }
      }
    }
    document.getElementById(_0x4f1d38).className = "rounded-border-green";
    $('#' + _0x4f1d38).css("width", _0x144f76);
    $(_0x4bd833).css("margin-left", _0x144f76 - 0xa);
    $(_0x572c5f).css('display', "none");
    $(_0x4bd833).css("display", '');
  }
  if ((_0x495282 & 0x40) != 0x0) {
    var _0x4f1d38 = "kbd-dks-key" + _0x3d02ab + '-' + 0x3;
    var _0x572c5f = "#kbd-dks-add" + _0x3d02ab + '-' + 0x3;
    var _0x4bd833 = "#kbd-dks-arrow" + _0x3d02ab + '-' + 0x3;
    var _0x144f76 = 0x18;
    if ((_0x495282 & 0x80) != 0x0) {
      _0x144f76 = 0x4e;
      if ((_0x495282 & 0x100) != 0x0 && (_0x495282 & 0x200) != 0x0) {
        _0x144f76 = 0x68;
      }
    }
    document.getElementById(_0x4f1d38).className = "rounded-border-green";
    $('#' + _0x4f1d38).css("width", _0x144f76);
    $(_0x4bd833).css("margin-left", _0x144f76 - 0xa);
    $(_0x572c5f).css("display", 'none');
    $(_0x4bd833).css("display", '');
  }
  if ((_0x495282 & 0x200) != 0x0) {
    var _0x4f1d38 = "kbd-dks-key" + _0x3d02ab + '-' + 0x4;
    var _0x572c5f = '#kbd-dks-add' + _0x3d02ab + '-' + 0x4;
    var _0x4bd833 = "#kbd-dks-arrow" + _0x3d02ab + '-' + 0x4;
    var _0x144f76 = 0x18;
    document.getElementById(_0x4f1d38).className = "rounded-border-green";
    $('#' + _0x4f1d38).css('width', _0x144f76);
    $(_0x4bd833).css('margin-left', _0x144f76 - 0xa);
    $(_0x572c5f).css("display", "none");
    $(_0x4bd833).css("display", '');
  }
}
function kbd_ui_refresh_more(_0xedfe2d) {
  $('#kbd-fireware-current-version').text(layui.i18np.prop("STRID_KBD_CURRENT_VERTION") + " " + current_usb_client.device_info.revision);
  $("#kbd-fireware-download").css('display', "none");
  $("#kbd-fireware-new-version-hint").css("display", "none");
}
function kbd_ui_refresh_main_setting(_0x1609ef) {
  $("#kbd-main-setting-key").css('color', '');
  $("#kbd-main-setting-axis").css("color", '');
  $("#kbd-main-setting-advance-key").css("color", '');
  $("#kbd-main-setting-light").css('color', '');
  $("#kbd-main-setting-more").css("color", '');
  if (is_dark_theme()) {
    document.getElementById('kbd-main-setting-key-icon').src = RESOURCE_URL + "setting/kbd/" + "kbd_key_normal.png";
    document.getElementById('kbd-main-setting-axis-icon').src = RESOURCE_URL + "setting/kbd/" + "kbd_axis_normal.png";
    document.getElementById("kbd-main-setting-advance-key-icon").src = RESOURCE_URL + "setting/kbd/" + "kbd_advance_key_normal.png";
    document.getElementById('kbd-main-setting-light-icon').src = RESOURCE_URL + "setting/kbd/" + "kbd_light_normal.png";
    document.getElementById("kbd-main-setting-more-icon").src = RESOURCE_URL + "setting/kbd/" + "kbd_more_normal.png";
  } else {
    document.getElementById("kbd-main-setting-key-icon").src = RESOURCE_URL + 'setting/kbd/light/' + 'kbd_key_normal.png';
    document.getElementById("kbd-main-setting-axis-icon").src = RESOURCE_URL + "setting/kbd/light/" + "kbd_axis_normal.png";
    document.getElementById("kbd-main-setting-advance-key-icon").src = RESOURCE_URL + 'setting/kbd/light/' + "kbd_advance_key_normal.png";
    document.getElementById("kbd-main-setting-light-icon").src = RESOURCE_URL + "setting/kbd/light/" + 'kbd_light_normal.png';
    document.getElementById('kbd-main-setting-more-icon').src = RESOURCE_URL + "setting/kbd/light/" + 'kbd_more_normal.png';
  }
  if (_0x1609ef == 0x0) {
    $("#kbd-main-setting-key").css('color', "#00f6ff");
    document.getElementById("kbd-main-setting-key-icon").src = RESOURCE_URL + "setting/kbd/" + "kbd_key_selected.png";
  } else {
    if (_0x1609ef == 0x1) {
      $("#kbd-main-setting-light").css("color", '#00f6ff');
      document.getElementById("kbd-main-setting-light-icon").src = RESOURCE_URL + "setting/kbd/" + "kbd_light_selected.png";
    } else {
      if (_0x1609ef == 0x2) {
        $("#kbd-main-setting-axis").css('color', "#00f6ff");
        document.getElementById("kbd-main-setting-axis-icon").src = RESOURCE_URL + "setting/kbd/" + "kbd_axis_selected.png";
      } else {
        if (_0x1609ef == 0x3) {
          $("#kbd-main-setting-advance-key").css("color", "#00f6ff");
          document.getElementById("kbd-main-setting-advance-key-icon").src = RESOURCE_URL + "setting/kbd/" + "kbd_advance_key_selected.png";
        } else if (_0x1609ef == 0x4) {
          $("#kbd-main-setting-more").css('color', "#00f6ff");
          document.getElementById('kbd-main-setting-more-icon').src = RESOURCE_URL + "setting/kbd/" + "kbd_more_selected.png";
        }
      }
    }
  }
}
function kbd_update_setting_tab(_0x56ec69, _0xe54f81) {
  $("#kbd-main-setting-key-container").css("display", "none");
  $("#kbd-main-setting-axis-container").css("display", "none");
  $('#kbd-main-setting-advance-key-container').css('display', "none");
  $("#kbd-main-setting-light-container").css("display", "none");
  $("#kbd-main-setting-more-container").css('display', "none");
  var _0x3df8da = get_product_id_hex_str(current_usb_client);
  kbd_key_matrix_index = -0x1;
  kbd_matrix_select_keys = [];
  kbd_layer_id = 0x0;
  if (_0xe54f81 == 0x0) {
    $("#kbd-mapping-key-container").css("background-image", "url(" + RESOURCE_URL + "product/" + _0x3df8da + "/setting.png)");
    $('#kbd-main-setting-key-container').css('display', '');
    $("[name=\"kbd-key-layer\"]")[0x0].checked = true;
    kbd_key_infos.splice(0x0, kbd_key_infos.length);
    var _0x32d3cd = _0x56ec69.device_info.kbd_key_infos;
    if (_0x32d3cd.length >= kbd_key_num) {
      for (var _0x336b20 = 0x0; _0x336b20 < kbd_key_num; _0x336b20++) {
        var _0x375564 = _0x32d3cd[_0x336b20];
        kbd_key_infos.push(kbd_clone_pc_key_info(_0x375564));
      }
    }
    kbd_ui_refresh_key_matrix(_0x56ec69);
    kbd_ui_refresh_key_desc(_0x56ec69);
    layui.element.tabChange("kbd-setting-key-type", 0x0);
  } else {
    if (_0xe54f81 == 0x1) {
      $("#kbd-mapping-light-container").css("background-image", "url(" + RESOURCE_URL + 'product/' + _0x3df8da + "/setting.png)");
      $("#kbd-main-setting-light-container").css('display', '');
      kbd_edit_info = kbd_clone_light_info(_0x56ec69.device_info.kbd_light_info);
      $('#kbd-light-button-container').css("display", "none");
      kbd_key_infos.splice(0x0, kbd_key_infos.length);
      var _0x32d3cd = _0x56ec69.device_info.kbd_key_infos;
      if (_0x32d3cd.length >= kbd_key_num) {
        for (var _0x336b20 = 0x0; _0x336b20 < kbd_key_num; _0x336b20++) {
          var _0x375564 = _0x32d3cd[_0x336b20];
          kbd_key_infos.push(kbd_clone_pc_key_info(_0x375564));
        }
      }
      kbd_ui_refresh_light_matrix(_0x56ec69);
      layui.element.tabChange("kbd-setting-light-type", 0x0);
    } else {
      if (_0xe54f81 == 0x2) {
        $("#kbd-mapping-axis-container").css('background-image', "url(" + RESOURCE_URL + "product/" + _0x3df8da + '/setting.png)');
        $('#kbd-main-setting-axis-container').css("display", '');
        kbd_key_infos.splice(0x0, kbd_key_infos.length);
        var _0x32d3cd = _0x56ec69.device_info.kbd_key_infos;
        if (_0x32d3cd.length >= kbd_key_num) {
          for (var _0x336b20 = 0x0; _0x336b20 < kbd_key_num; _0x336b20++) {
            var _0x375564 = _0x32d3cd[_0x336b20];
            kbd_key_infos.push(kbd_clone_pc_key_info(_0x375564));
          }
        }
        kbd_axis_infos.splice(0x0, kbd_axis_infos.length);
        kbd_axis_infos = _0x56ec69.device_info.kbd_axis_infos.slice();
        kbd_ui_refresh_axis_matrix(_0x56ec69);
        kbd_ui_refresh_axis(_0x56ec69);
      } else {
        if (_0xe54f81 == 0x3) {
          $('#kbd-mapping-advance-key-container').css('background-image', 'url(' + RESOURCE_URL + "product/" + _0x3df8da + "/setting.png)");
          $("#kbd-main-setting-advance-key-container").css('display', '');
          kbd_key_infos.splice(0x0, kbd_key_infos.length);
          var _0x32d3cd = _0x56ec69.device_info.kbd_key_infos;
          if (_0x32d3cd.length >= kbd_key_num) {
            for (var _0x336b20 = 0x0; _0x336b20 < kbd_key_num; _0x336b20++) {
              var _0x375564 = _0x32d3cd[_0x336b20];
              kbd_key_infos.push(kbd_clone_pc_key_info(_0x375564));
            }
          }
          kbd_socd_infos.splice(0x0, kbd_socd_infos.length);
          var _0x4bcf37 = _0x56ec69.device_info.kbd_socd_infos;
          for (var _0x336b20 = 0x0; _0x336b20 < _0x4bcf37.length; _0x336b20++) {
            var _0x55c122 = _0x4bcf37[_0x336b20];
            kbd_socd_infos.push(kbd_clone_socd_info(_0x55c122));
          }
          kbd_mt_infos.splice(0x0, kbd_mt_infos.length);
          var _0x1addf4 = _0x56ec69.device_info.kbd_mt_infos;
          for (var _0x336b20 = 0x0; _0x336b20 < _0x1addf4.length; _0x336b20++) {
            var _0x172edb = _0x1addf4[_0x336b20];
            kbd_mt_infos.push(kbd_clone_mt_info(_0x172edb));
          }
          kbd_rs_infos.splice(0x0, kbd_rs_infos.length);
          var _0x3a5445 = _0x56ec69.device_info.kbd_rs_infos;
          for (var _0x336b20 = 0x0; _0x336b20 < _0x3a5445.length; _0x336b20++) {
            var _0xf57959 = _0x3a5445[_0x336b20];
            kbd_rs_infos.push(kbd_clone_rs_info(_0xf57959));
          }
          kbd_dks_infos.splice(0x0, kbd_dks_infos.length);
          var _0x1570c5 = _0x56ec69.device_info.kbd_dks_infos;
          for (var _0x336b20 = 0x0; _0x336b20 < _0x1570c5.length; _0x336b20++) {
            kbd_dks_infos.push(kbd_clone_dks_info(_0x1570c5[_0x336b20]));
          }
          if ($("#kbd-setting-dks-container").css("display") != "none") {
            layui.element.tabChange("kbd-setting-advance-key-type", 0x3);
          } else {
            if ($("#kbd-setting-mt-container").css("display") != "none") {
              layui.element.tabChange('kbd-setting-advance-key-type', 0x1);
            } else if ($("#kbd-setting-rs-container").css("display") != "none") {
              layui.element.tabChange("kbd-setting-advance-key-type", 0x2);
            } else {
              layui.element.tabChange("kbd-setting-advance-key-type", 0x0);
            }
          }
        } else if (_0xe54f81 == 0x4) {
          $("#kbd-main-setting-more-container").css("display", '');
          kbd_ui_refresh_more(_0x56ec69);
        }
      }
    }
  }
  kbd_ui_refresh_main_setting(_0xe54f81);
}
function kbd_update_key_setting_tab(_0x420521, _0x2e68c8) {
  $("#kbd-setting-key-base-container").css('display', 'none');
  $('#kbd-setting-function-container').css('display', 'none');
  $("#kbd-setting-macro-container").css("display", 'none');
  kbd_key_setting_index = _0x2e68c8;
  if (_0x2e68c8 == 0x0) {
    $("#kbd-setting-key-base-container").css('display', '');
    kbd_ui_key_setting_init(_0x420521);
  } else {
    if (_0x2e68c8 == 0x1) {
      $("#kbd-setting-function-container").css("display", "flex");
      kbd_ui_function_setting_init(_0x420521);
    } else {
      if (_0x2e68c8 == 0x2) {
        $("#kbd-setting-macro-container").css("display", '');
        kbd_macro_infos.splice(0x0, kbd_macro_infos.length);
        var _0x2137b6 = _0x420521.device_info.kbd_macro_infos;
        for (var _0x5bfedd = 0x0; _0x5bfedd < _0x2137b6.length; _0x5bfedd++) {
          kbd_macro_infos.push([]);
          var _0x36d229 = _0x2137b6[_0x5bfedd];
          if (_0x36d229.length > 0x0) {
            for (var _0x1df022 = 0x0; _0x1df022 < _0x36d229.length; _0x1df022++) {
              kbd_macro_infos[_0x5bfedd].push(clone_macro_info(_0x36d229[_0x1df022]));
            }
          }
        }
        kbd_macro_select_index = -0x1;
        edit_macros = [];
        kbd_ui_macro_init(_0x420521);
        kbd_ui_macro_edit_init(_0x420521);
      }
    }
  }
}
function kbd_update_light_setting_tab(_0x2243b9, _0xf2580e) {
  $("#kbd-setting-light-container").css("display", "none");
  $("#kbd-setting-light-box-container").css("display", "none");
  kbd_key_setting_index = _0xf2580e;
  if (_0xf2580e == 0x0) {
    $("#kbd-setting-light-container").css("display", '');
    kbd_ui_refresh_light(_0x2243b9);
  } else if (_0xf2580e == 0x1) {
    $("#kbd-setting-light-box-container").css('display', '');
    kbd_ui_refresh_light_box(_0x2243b9);
  }
}
function kbd_update_advance_key_setting_tab(_0x2bda0f, _0x24f786) {
  $('#kbd-setting-dks-container').css("display", "none");
  $("#kbd-setting-socd-container").css("display", "none");
  $("#kbd-setting-mt-container").css("display", "none");
  kbd_select_elementId = '';
  kbd_key_setting_index = _0x24f786;
  if (_0x24f786 == 0x0) {
    $("#kbd-setting-socd-container").css('display', '');
    kbd_ui_refresh_socd(_0x2bda0f);
  } else {
    if (_0x24f786 == 0x1) {
      $("#kbd-setting-mt-container").css('display', '');
      kbd_ui_refresh_mt(_0x2bda0f);
    } else {
      if (_0x24f786 == 0x2) {
        $("#kbd-setting-rs-container").css('display', '');
        kbd_ui_refresh_rs(_0x2bda0f);
      } else if (_0x24f786 == 0x3) {
        $("#kbd-setting-dks-container").css("display", '');
        kbd_ui_refresh_dks(_0x2bda0f);
      }
    }
  }
  kbd_ui_refresh_advance_key_matrix(_0x2bda0f);
  kbd_ui_refresh_advance_key_desc(_0x2bda0f);
}
let pressedKeyCodes = [];
let record_mouse_key_delay_timer_id = undefined;
document.addEventListener("keydown", function (_0x31c30b) {
  if (setting_mapping_key_recording) {
    if (pressedKeyCodes.indexOf(_0x31c30b.key) === -0x1) {
      setting_mapping_key_recording_add(_0x31c30b.keyCode);
      pressedKeyCodes.push(_0x31c30b.key);
    }
    _0x31c30b.preventDefault();
  } else {
    if (setting_macro_edit_recording) {
      if (edit_macros.length >= 0xc8) {
        layer.msg(layui.i18np.prop("STRID_SETTING_MAPPING_MACRO_RECORD_MAX_EX"), {
          'icon': 0x0
        }, function () {});
        return;
      }
      var _0x24c448 = create_macro_info();
      _0x24c448.style = 0x16;
      _0x24c448.mouse_key_code = _0x31c30b.keyCode;
      _0x24c448.mouse_key_event = 0x100;
      const _0x3769bc = Date.now();
      _0x24c448.mouse_key_time = 0x1;
      if (setting_macro_edit_recording_time != -0x1) {
        edit_macros[edit_macros.length - 0x1].mouse_key_time = $("[name=\"macro-record-fixed-time\"]")[0x0].checked ? 0x32 : _0x3769bc - setting_macro_edit_recording_time;
      }
      setting_macro_edit_recording_time = _0x3769bc;
      _0x24c448.name = get_key_name_from_code(_0x24c448.mouse_key_code);
      edit_macros.push(_0x24c448);
      ui_refresh_mapping_macro_edit(current_usb_client);
    }
  }
});
document.addEventListener('keyup', function (_0x21a29b) {
  if (setting_mapping_key_recording) {
    const _0x9e9cd8 = pressedKeyCodes.indexOf(_0x21a29b.key);
    if (_0x9e9cd8 > -0x1) {
      pressedKeyCodes.splice(_0x9e9cd8, 0x1);
    }
    _0x21a29b.preventDefault();
  } else {
    if (setting_macro_edit_recording) {
      if (edit_macros.length >= 0xc8) {
        layer.msg(layui.i18np.prop("STRID_SETTING_MAPPING_MACRO_RECORD_MAX_EX"), {
          'icon': 0x0
        }, function () {});
        return;
      }
      var _0x210c83 = create_macro_info();
      _0x210c83.style = 0x16;
      _0x210c83.mouse_key_code = _0x21a29b.keyCode;
      _0x210c83.mouse_key_event = 0x101;
      const _0x2a9cc4 = Date.now();
      _0x210c83.mouse_key_time = 0x1;
      if (setting_macro_edit_recording_time != -0x1) {
        edit_macros[edit_macros.length - 0x1].mouse_key_time = $("[name=\"macro-record-fixed-time\"]")[0x0].checked ? 0x32 : _0x2a9cc4 - setting_macro_edit_recording_time;
      }
      setting_macro_edit_recording_time = _0x2a9cc4;
      _0x210c83.name = get_key_name_from_code(_0x210c83.mouse_key_code);
      edit_macros.push(_0x210c83);
      ui_refresh_mapping_macro_edit(current_usb_client);
    }
  }
});
document.addEventListener("mousedown", function (_0x97f72e) {
  if (kbd_dks_dragging_name.length > 0x0) {
    kbd_dks_Start_x = _0x97f72e.clientX;
    return;
  }
  if (setting_mapping_key_recording) {
    const _0x1c2fb8 = "MouseButton" + _0x97f72e.button;
    if (pressedKeyCodes.indexOf(_0x1c2fb8) === -0x1) {
      if (_0x97f72e.button == 0x0) {
        record_mouse_key_delay_timer_id = setTimeout(function () {
          setting_mapping_key_recording_add(256);
          record_mouse_key_delay_timer_id = undefined;
        }, 0xc8);
      } else {
        if (_0x97f72e.button == 0x1) {
          setting_mapping_key_recording_add(258);
        } else if (_0x97f72e.button == 0x2) {
          setting_mapping_key_recording_add(257);
        } else {
          setting_mapping_key_recording_add(0xff + _0x97f72e.button + 0x1);
        }
      }
      pressedKeyCodes.push(_0x1c2fb8);
    }
    if (_0x97f72e.button != 0x0) {
      _0x97f72e.preventDefault();
    }
  } else {
    if (setting_macro_edit_recording) {
      if (edit_macros.length >= 0xc8) {
        layer.msg(layui.i18np.prop('STRID_SETTING_MAPPING_MACRO_RECORD_MAX_EX'), {
          'icon': 0x0
        }, function () {});
        return;
      }
      var _0x3fd9fb;
      if (_0x97f72e.button == 0x1) {
        _0x3fd9fb = 258;
      } else if (_0x97f72e.button == 0x2) {
        _0x3fd9fb = 257;
      } else {
        _0x3fd9fb = 0xff + _0x97f72e.button + 0x1;
      }
      if (_0x97f72e.button != 0x0) {
        _0x97f72e.preventDefault();
      }
      if (_0x97f72e.button == 0x0) {
        record_mouse_key_delay_timer_id = setTimeout(function (_0x37799a, _0x3837f6, _0x23d616) {
          setting_mapping_macro_recording_add(_0x37799a, _0x3837f6, _0x23d616);
          record_mouse_key_delay_timer_id = undefined;
        }, 0xc8, _0x3fd9fb, 0x100, Date.now());
      } else {
        setting_mapping_macro_recording_add(_0x3fd9fb, 0x100, Date.now());
      }
    }
  }
});
document.addEventListener("mousemove", function (_0x4ce60d) {
  if (kbd_dks_dragging_name.length > 0x0) {
    if (_0x4ce60d.clientX - kbd_dks_Start_x > 0x5) {
      kbd_dks_dragging = true;
      kbd_ui_refresh_dks_dragging(_0x4ce60d.clientX - kbd_dks_Start_x, false);
    }
    return;
  }
});
document.addEventListener("mouseup", function (_0x1992b6) {
  if (kbd_dks_dragging_name.length > 0x0) {
    kbd_ui_refresh_dks_dragging(_0x1992b6.clientX - kbd_dks_Start_x, true);
    kbd_dks_dragging_name = '';
    return;
  }
  if (setting_mapping_key_recording) {
    const _0x8247cc = 'MouseButton' + _0x1992b6.button;
    const _0x5175ca = pressedKeyCodes.indexOf(_0x8247cc);
    if (_0x5175ca > -0x1) {
      pressedKeyCodes.splice(_0x5175ca, 0x1);
    }
    if (_0x1992b6.button != 0x0) {
      _0x1992b6.preventDefault();
    }
  } else {
    if (setting_macro_edit_recording) {
      if (edit_macros.length >= 0xc8) {
        layer.msg(layui.i18np.prop("STRID_SETTING_MAPPING_MACRO_RECORD_MAX_EX"), {
          'icon': 0x0
        }, function () {});
        return;
      }
      var _0xc0716b;
      if (_0x1992b6.button == 0x1) {
        _0xc0716b = 258;
      } else if (_0x1992b6.button == 0x2) {
        _0xc0716b = 257;
      } else {
        _0xc0716b = 0xff + _0x1992b6.button + 0x1;
      }
      if (_0x1992b6.button != 0x0) {
        _0x1992b6.preventDefault();
      }
      if (_0x1992b6.button == 0x0) {
        record_mouse_key_delay_timer_id = setTimeout(function (_0x3031e3, _0x35c794, _0x1e3700) {
          setting_mapping_macro_recording_add(_0x3031e3, _0x35c794, _0x1e3700);
          record_mouse_key_delay_timer_id = undefined;
        }, 0xc8, _0xc0716b, 0x101, Date.now());
      } else {
        setting_mapping_macro_recording_add(_0xc0716b, 0x101, Date.now());
      }
    }
  }
});
document.addEventListener("mousewheel", function (_0x360381) {
  if (current_usb_client != undefined ? is_hs_keyboard(current_usb_client.device) : false) {
    return;
  }
  if (setting_mapping_key_recording) {
    if (_0x360381.deltaY < 0x0) {
      setting_mapping_key_recording_add(0x400);
    } else if (_0x360381.deltaY > 0x0) {
      setting_mapping_key_recording_add(0x401);
    }
    if (_0x360381.deltaX < 0x0) {
      setting_mapping_key_recording_add(0x403);
    } else if (_0x360381.deltaX > 0x0) {
      setting_mapping_key_recording_add(0x402);
    }
  } else {
    if (setting_macro_edit_recording) {
      if (macro_keys.length >= 0xc8) {
        layer.msg(layui.i18np.prop("STRID_SETTING_MAPPING_MACRO_RECORD_MAX_EX"), {
          'icon': 0x0
        }, function () {});
        return;
      }
      var _0x9f2a9e = false;
      var _0x34afe3 = create_macro_info();
      _0x34afe3.style = 0x16;
      if (_0x360381.deltaY < 0x0) {
        _0x34afe3.mouse_key_event = 0x20a;
        _0x34afe3.mouse_key_code = 0x1;
        if (edit_macros.length > 0x0) {
          var _0x5a5af4 = edit_macros[edit_macros.length - 0x1];
          if (_0x5a5af4.mouse_key_event == 0x20a && _0x34afe3.mouse_key_code * _0x5a5af4.mouse_key_code >= 0x0) {
            _0x5a5af4.mouse_key_code += _0x34afe3.mouse_key_code;
            _0x9f2a9e = true;
          }
        }
      } else {
        if (_0x360381.deltaY > 0x0) {
          _0x34afe3.mouse_key_event = 0x20a;
          _0x34afe3.mouse_key_code = -0x1;
          if (edit_macros.length > 0x0) {
            var _0x5a5af4 = edit_macros[edit_macros.length - 0x1];
            if (_0x5a5af4.mouse_key_event == 0x20a && _0x34afe3.mouse_key_code * _0x5a5af4.mouse_key_code >= 0x0) {
              _0x5a5af4.mouse_key_code += _0x34afe3.mouse_key_code;
              _0x9f2a9e = true;
            }
          }
        }
      }
      const _0x22c343 = Date.now();
      if (!_0x9f2a9e) {
        _0x34afe3.mouse_key_time = 0x1;
        if (setting_macro_edit_recording_time != -0x1) {
          edit_macros[edit_macros.length - 0x1].mouse_key_time = $("[name=\"macro-record-fixed-time\"]")[0x0].checked ? 0x32 : _0x22c343 - setting_macro_edit_recording_time;
        }
        setting_macro_edit_recording_time = _0x22c343;
        _0x34afe3.name = get_key_name_from_code(_0x34afe3.mouse_key_code);
        edit_macros.push(_0x34afe3);
      } else {
        setting_macro_edit_recording_time = _0x22c343;
      }
      ui_refresh_mapping_macro_edit(current_usb_client);
    }
  }
});
function refresh_recorded_mapping_keys() {
  if (setting_mapping_key_recording) {
    var _0x921b34 = '';
    var _0x4f39a9 = true;
    if (setting_mapping_keys_recorded[0x0] >= 0x0) {
      _0x921b34 += get_modifier_name_from_code(setting_mapping_keys_recorded[0x0]);
      _0x4f39a9 = false;
    }
    if (setting_mapping_keys_recorded[0x1] >= 0x0) {
      if (!_0x4f39a9) {
        _0x921b34 += '+';
      }
      _0x921b34 += get_modifier_name_from_code(setting_mapping_keys_recorded[0x1]);
      _0x4f39a9 = false;
    }
    if (setting_mapping_keys_recorded[0x2] >= 0x0) {
      if (!_0x4f39a9) {
        _0x921b34 += '+';
      }
      _0x921b34 += get_key_name_from_code(setting_mapping_keys_recorded[0x2]);
      _0x4f39a9 = false;
    }
    layui.$("[name=\"recorded-mapping-key\"]").html(_0x921b34);
  }
}
function receiver_cannot_pair(_0x355dfd) {
  var _0x406e4a = layui.layer;
  var _0x483256 = layui.i18np;
  var _0x198a2a = _0x483256.prop('STRID_SETTING_MOUSE_CAN_NOT_PAIR_WARNING');
  const _0x3d649b = get_display_name(current_usb_client);
  const _0x170bf1 = get_display_name(_0x355dfd);
  _0x406e4a.confirm(_0x198a2a.replace("{name1}", _0x3d649b).replace("{name2}", _0x170bf1), {
    'title': _0x483256.prop('STRID_TITLE_WARNING'),
    'skin': 'layui-layer-confirm',
    'btn': [_0x483256.prop("STRID_BUTTON_CANCEL")],
    'btnAlign': 'c',
    'btn1': function () {
      _0x406e4a.closeLast(0x0);
    }
  });
}
function receiver_pair(_0x27d374) {
  var _0x339281 = layui.layer;
  var _0x40712c = layui.i18np;
  var _0x54e5b3 = _0x40712c.prop("STRID_SETTING_MOUSE_PAIR_WARNING");
  const _0x269ba9 = get_display_name(current_usb_client);
  const _0x1c700f = get_display_name(_0x27d374);
  _0x339281.confirm(_0x54e5b3.replace('{name1}', _0x269ba9).replace("{name2}", _0x1c700f), {
    'title': _0x40712c.prop("STRID_TITLE_WARNING"),
    'skin': "layui-layer-confirm",
    'btn': [_0x40712c.prop("STRID_SETTING_MOUSE_PAIR_S"), _0x40712c.prop("STRID_BUTTON_CANCEL")],
    'btnAlign': 'c',
    'btn1': function () {
      _0x339281.closeLast(0x0);
      if (current_usb_client != undefined) {
        current_usb_client.pause = true;
        send_event_set_esb_addr(current_usb_client, get_esb_addr(_0x27d374.device_info, 0xff), get_default_rf_channel(_0x27d374), is_slow_receiver(_0x27d374));
        if (current_usb_client.virtual) {
          send_event_action(current_usb_client, 0x33, 0x0);
        }
        current_usb_client.pause = false;
        post_send_client_data(current_usb_client);
      }
    },
    'btn2': function () {
      _0x339281.closeLast(0x0);
    }
  });
}
function receiver_unpair(_0x468288) {
  var _0xafec86 = layui.layer;
  var _0x5926a9 = layui.i18np;
  if (is_light(_0x468288)) {
    var _0x1fa7c9 = _0x5926a9.prop("STRID_SETTING_MOUSE_UNPAIR_WARNING");
    const _0x178dab = get_display_name(current_usb_client);
    const _0x54b473 = get_display_name(_0x468288);
    _0xafec86.confirm(_0x1fa7c9.replace("{name1}", _0x178dab).replace("{name2}", _0x54b473), {
      'title': _0x5926a9.prop("STRID_TITLE_WARNING"),
      'skin': 'layui-layer-confirm',
      'btn': [_0x5926a9.prop('STRID_SETTING_MOUSE_UNPAIR_S'), _0x5926a9.prop("STRID_SETTING_LIGHT"), _0x5926a9.prop("STRID_BUTTON_CANCEL")],
      'btnAlign': 'c',
      'btn1': function () {
        _0xafec86.closeLast(0x0);
        if (current_usb_client != undefined) {
          current_usb_client.pause = true;
          send_event_clear_esb_addr(current_usb_client, get_esb_addr(_0x468288.device_info, 0xff));
          if (current_usb_client.virtual) {
            send_event_action(current_usb_client, 0x33, 0x0);
          }
          current_usb_client.pause = false;
          post_send_client_data(current_usb_client);
        }
      },
      'btn2': function () {
        _0xafec86.closeLast(0x0);
        current_usb_receiver = _0x468288;
        $("[name=\"receiver-light-mode\"]")[current_usb_receiver.device_info.light % 0x3].checked = true;
        layui.form.render('radio');
        _0xafec86.open({
          'type': 0x1,
          'title': _0x5926a9.prop("STRID_SETTING_LIGHT"),
          'content': $('#receiver-light-setting-panel'),
          'btn': [_0x5926a9.prop("STRID_CLOSE")],
          'btnAlign': 'c',
          'btn1': function () {
            _0xafec86.closeLast(0x0);
          }
        });
      },
      'btn3': function () {
        _0xafec86.closeLast(0x0);
      }
    });
  } else {
    var _0x1fa7c9 = _0x5926a9.prop("STRID_SETTING_MOUSE_UNPAIR_WARNING");
    const _0x300610 = get_display_name(current_usb_client);
    const _0x3d66ed = get_display_name(_0x468288);
    _0xafec86.confirm(_0x1fa7c9.replace("{name1}", _0x300610).replace("{name2}", _0x3d66ed), {
      'title': _0x5926a9.prop("STRID_TITLE_WARNING"),
      'skin': "layui-layer-confirm",
      'btn': [_0x5926a9.prop("STRID_SETTING_MOUSE_UNPAIR_S"), _0x5926a9.prop("STRID_BUTTON_CANCEL")],
      'btnAlign': 'c',
      'btn1': function () {
        _0xafec86.closeLast(0x0);
        if (current_usb_client != undefined) {
          current_usb_client.pause = true;
          send_event_clear_esb_addr(current_usb_client, get_esb_addr(_0x468288.device_info, 0xff));
          if (current_usb_client.virtual) {
            send_event_action(current_usb_client, 0x33, 0x0);
          }
          current_usb_client.pause = false;
          post_send_client_data(current_usb_client);
        }
      },
      'btn2': function () {
        _0xafec86.closeLast(0x0);
      }
    });
  }
}
function receiver_unpair_switch(_0x40864b) {
  var _0x17df3c = layui.layer;
  var _0x5a9932 = layui.i18np;
  var _0x18708c = _0x5a9932.prop("STRID_SETTING_MOUSE_UNPAIR_WARNING");
  const _0x1bb6fb = get_display_name(current_usb_client);
  const _0x4091cb = get_display_name(_0x40864b);
  _0x17df3c.confirm(_0x18708c.replace('{name1}', _0x1bb6fb).replace("{name2}", _0x4091cb), {
    'title': _0x5a9932.prop('STRID_TITLE_WARNING'),
    'skin': "layui-layer-confirm",
    'btn': [_0x5a9932.prop("STRID_SETTING_MOUSE_UNPAIR_S"), _0x5a9932.prop('STRID_SETTING_MOUSE_PAIRED_SELECT_S'), _0x5a9932.prop("STRID_BUTTON_CANCEL")],
    'btnAlign': 'c',
    'btn1': function () {
      _0x17df3c.closeLast(0x0);
      if (current_usb_client != undefined) {
        current_usb_client.pause = true;
        send_event_clear_esb_addr(current_usb_client, get_esb_addr(_0x40864b.device_info, 0xff));
        current_usb_client.pause = false;
        post_send_client_data(current_usb_client);
      }
    },
    'btn2': function () {
      _0x17df3c.closeLast(0x0);
      if (current_usb_client != undefined) {
        current_usb_client.pause = true;
        send_event_select_esb_addr(current_usb_client, get_esb_addr(_0x40864b.device_info, 0xff));
        if (current_usb_client.virtual) {
          send_event_action(current_usb_client, 0x33, 0x0);
        }
        current_usb_client.pause = false;
        post_send_client_data(current_usb_client);
        var _0x36c1c7 = undefined;
        usb_client_list.forEach(_0x2c3781 => {
          if (_0x2c3781.virtual && _0x2c3781.device == _0x40864b.device) {
            _0x36c1c7 = _0x2c3781;
          }
        });
        if (_0x36c1c7 != undefined) {
          setTimeout(function (_0x3fccfa) {
            send_event_query(_0x3fccfa);
          }, 0xbb8, _0x36c1c7);
        }
      }
    },
    'btn3': function () {
      _0x17df3c.closeLast(0x0);
    }
  });
}
apply_theme();
layui.config({
  'base': RESOURCE_URL + "i18n/extend-202510170047/"
}).extend({
  'mod': "i18np"
});
function close_all_layer() {
  var _0x1851fb = layui.layer;
  if (macro_edit_panel_id != undefined) {
    _0x1851fb.close(macro_edit_panel_id);
  }
  if (macro_record_panel_id != undefined) {
    _0x1851fb.close(macro_record_panel_id);
  }
  if (key_record_panel_id != undefined) {
    _0x1851fb.close(key_record_panel_id);
  }
  if (select_key_panel_id != undefined) {
    _0x1851fb.close(select_key_panel_id);
  }
}
layui.use(['form', "layer", 'util', "i18np", "table"], function () {
  var _0x1435f3 = layui.form;
  var _0x2a0d7b = layui.layer;
  var _0x3f4986 = layui.util;
  var _0x3d5eb9 = layui.$;
  var _0x542cd7 = layui.i18np;
  _0x542cd7.loadProperties(RESOURCE_URL);
  _0x1435f3.on("select(language)", function (_0x4bbbd3) {
    layui.data("lang", {
      'key': 'name',
      'value': _0x4bbbd3.value
    });
    _0x542cd7.loadProperties(RESOURCE_URL);
    _0x1435f3.render("checkbox");
    if (pair_panel_id >= 0x0) {
      _0x2a0d7b.style(pair_panel_id, {
        'left': (window.innerWidth - _0x3d5eb9("[id=pair-panel]").width()) / 0x2 + 'px'
      });
    }
    if (not_support_id >= 0x0) {
      _0x2a0d7b.style(not_support_id, {
        'left': (window.innerWidth - _0x3d5eb9("[id=not-support-panel]").width()) / 0x2 + 'px'
      });
    }
    request_device_cfg();
    setTimeout(function () {
      pc_key_manager_init();
      if (current_usb_client != undefined) {
        setting_mapping_init(current_usb_client);
        ui_refresh_mapping_key(current_usb_client);
        if (current_usb_client.device_info != undefined && current_usb_client.device_info.revision != undefined && current_usb_client.device_info.revision.substr(0x0, 0x2) == 'G-') {
          _0x3d5eb9("[name=\"setting-fw-channel\"]")[0x1].checked = true;
        } else {
          _0x3d5eb9("[name=\"setting-fw-channel\"]")[0x0].checked = true;
        }
        _0x3d5eb9("[name=\"setting-fw-channel\"]")[0x0].disabled = !current_usb_client.device_info.dynamicGOM;
        _0x3d5eb9("[name=\"setting-fw-channel\"]")[0x1].disabled = !current_usb_client.device_info.dynamicGOM;
        layui.form.render("radio");
      }
      window.postMessage({
        'action': ACTION_UI_REFRESH_CURRENT_CLIENT
      });
      clearTimeout(resize_timer_id);
      resize_timer_id = setTimeout(do_resize, 0xfa);
    }, 0x3e8);
  });
  var _0x356a2b = layui.data('lang').name;
  _0x3d5eb9("select[name=language]")[0x0].value = _0x356a2b;
  _0x3d5eb9("[name=\"dark-theme\"]").prop("checked", is_dark_theme());
  _0x1435f3.on("switch(dark-theme)", function (_0x554acb) {
    if (_0x554acb.elem.checked) {
      layui.data("theme", {
        'key': "style",
        'value': "dark"
      });
    } else {
      layui.data("theme", {
        'key': 'style',
        'value': 'light'
      });
    }
    apply_theme();
    if (navigator.hid != undefined) {
      window.postMessage({
        'action': ACTION_UI_REFRESH_CLIENT_LIST
      });
      window.postMessage({
        'action': ACTION_UI_REFRESH_CURRENT_CLIENT
      });
    }
  });
  request_device_cfg();
  pc_key_manager_init();
  _0x3f4986.countdown(new Date(0xbb7, 0x0, 0x1).getTime(), new Date().getTime(), function (_0x15e845, _0x3335b3, _0x5de21e) {
    start();
  });
  if (navigator.hid == undefined) {
    not_support_id = _0x2a0d7b.open({
      'type': 0x1,
      'title': false,
      'skin': "layui-layer-panel",
      'shade': 0x0,
      'closeBtn': 0x0,
      'anim': -0x1,
      'shadeClose': false,
      'resize': false,
      'scrollbar': false,
      'zIndex': 0x64,
      'content': _0x3d5eb9("#not-support-panel")
    });
  }
  _0x3f4986.on("pair-action", {
    'pair': async function () {
      _0x3d5eb9("#pair-device").css("display", "none");
      _0x3d5eb9("#pairing-waiting").css('display', '');
      _0x3d5eb9("#pairing-tips").css("display", '');
      navigator.hid.requestDevice({
        'filters': [{
          'vendorId': 0x1915
        }]
      }).then(_0x288e64 => {
        window.postMessage({
          'action': ACTION_REFRESH_CLIENT_LIST
        });
        if (_0x288e64.length == 0x0) {
          _0x3d5eb9('#pair-device').css("display", '');
          _0x3d5eb9("#pairing-waiting").css("display", "none");
          _0x3d5eb9("#pairing-tips").css("display", 'none');
        }
      }).catch(_0x1eb582 => {
        log_r(_0x1eb582);
      });
    },
    'pair-more': async function () {
      navigator.hid.requestDevice({
        'filters': [{
          'vendorId': 0x1915
        }]
      }).then(_0x405458 => {
        window.postMessage({
          'action': ACTION_REFRESH_CLIENT_LIST
        });
      }).catch(_0x28230d => {
        log_r(_0x28230d);
      });
    },
    'refresh': async function () {
      usb_client_list.forEach(_0x5d7c17 => {
        if (_0x5d7c17.virtual) {
          send_event_query(_0x5d7c17);
        }
      });
      var _0x4351b5 = layui.layer;
      if (loading_id < 0x0) {
        loading_id = _0x4351b5.load(0x0);
        setTimeout(function () {
          _0x4351b5.close(loading_id);
          loading_id = -0x1;
        }, 0xbb8);
      }
    }
  });
  _0x3f4986.on("current-action", {
    'edit': async function () {
      editing = true;
      combination_key_index = 0x0;
      onboard_config_index = current_usb_client.device_info.onboardIndex;
      setting_mapping_init(current_usb_client);
      select_mapping_type(current_usb_client, 0x3);
      window.postMessage({
        'action': ACTION_UI_REFRESH_CLIENT_LIST
      });
      window.postMessage({
        'action': ACTION_UI_REFRESH_CURRENT_CLIENT
      });
      clearTimeout(resize_timer_id);
      resize_timer_id = setTimeout(do_resize, 0xfa);
    }
  });
  _0x3f4986.on("list-action", {
    'select': async function () {
      current_usb_client = get_usb_client(this.getAttribute('usb-client-id'));
      editing = false;
      close_all_layer();
      if (tips_panel_id >= 0x0) {
        _0x2a0d7b.close(tips_panel_id);
        tips_panel_id = -0x1;
      }
      update_setting_x_polling();
      if (current_usb_client.device_info != undefined && current_usb_client.device_info.revision != undefined && current_usb_client.device_info.revision.substr(0x0, 0x2) == 'G-') {
        _0x3d5eb9("[name=\"setting-fw-channel\"]")[0x1].checked = true;
      } else {
        _0x3d5eb9("[name=\"setting-fw-channel\"]")[0x0].checked = true;
      }
      _0x3d5eb9("[name=\"setting-fw-channel\"]")[0x0].disabled = !current_usb_client.device_info.dynamicGOM;
      _0x3d5eb9("[name=\"setting-fw-channel\"]")[0x1].disabled = !current_usb_client.device_info.dynamicGOM;
      layui.form.render("radio");
      window.postMessage({
        'action': ACTION_UI_REFRESH_CLIENT_LIST
      });
      window.postMessage({
        'action': ACTION_UI_REFRESH_CURRENT_CLIENT
      });
    }
  });
  _0x3f4986.on("receiver-action", {
    'select': async function () {
      var _0x37dda7 = get_usb_client(this.getAttribute("usb-client-id"));
      if (current_usb_client != undefined && current_usb_client.helloed) {
        if (!is_soc_compatible(current_usb_client, _0x37dda7)) {
          receiver_cannot_pair(_0x37dda7);
        } else {
          var _0x29dd8d = current_usb_client.product_esb_ch == 0xff ? current_usb_client.device_info.esbChannel : current_usb_client.product_esb_ch;
          var _0x438cb6 = is_esb_addr_arr_existed(current_usb_client.device_info, _0x29dd8d, get_esb_addr(_0x37dda7.device_info, _0x29dd8d));
          if (!_0x438cb6) {
            receiver_pair(_0x37dda7);
          } else {
            var _0x3039b7 = get_esb_addr_arr(current_usb_client.device_info, _0x29dd8d) == get_esb_addr(_0x37dda7.device_info, _0x29dd8d);
            if (_0x3039b7) {
              receiver_unpair(_0x37dda7);
            } else {
              receiver_unpair_switch(_0x37dda7);
            }
          }
        }
      }
    }
  });
  _0x3f4986.on("color-action", {
    'select': async function () {
      var _0x45701e = this.getAttribute("color-code");
      send_event_set_color_code(current_usb_client, _0x45701e);
    }
  });
  _0x3f4986.on("firmware-action", {
    'click': async function () {
      var _0x59b55f = layui.layer;
      var _0x372c09 = layui.i18np;
      _0x59b55f.confirm(_0x372c09.prop('STRID_WEBHUB_NEW_FIRMWARE_INFO'), {
        'title': _0x372c09.prop('STRID_TITLE_WARNING'),
        'btn': [_0x372c09.prop("STRING_OK")],
        'btnAlign': 'c',
        'btn1': function () {
          _0x59b55f.closeLast(0x0);
        }
      });
    }
  });
  _0x3f4986.on('download-action', {
    'download': async function () {
      _0x2a0d7b.open({
        'type': 0x1,
        'title': false,
        'offset': 'rt',
        'id': "ID-download-panel-rt",
        'content': _0x3d5eb9("#download-panel"),
        'closeBtn': false,
        'shade': true,
        'shadeClose': true,
        'anim': 'slideDown'
      });
    }
  });
  _0x3f4986.on("setting-action", {
    'back': async function () {
      editing = false;
      close_all_layer();
      window.postMessage({
        'action': ACTION_UI_REFRESH_CLIENT_LIST
      });
      window.postMessage({
        'action': ACTION_UI_REFRESH_CURRENT_CLIENT
      });
    }
  });
  _0x1435f3.on("checkbox(dpi-both-x-y)", function (_0x2b56ae) {
    var _0x5642ca = current_usb_client.device_info.resolution;
    var _0x368d17 = _0x5642ca & 0xffff;
    var _0x4f7b65 = _0x5642ca >> 0x10 & 0xffff;
    if (_0x2b56ae.elem.checked) {
      if (_0x4f7b65 == 0x0) {
        _0x4f7b65 = _0x368d17;
        set_cpi(current_usb_client, _0x368d17 | _0x4f7b65 << 0x10);
        var _0x4448c3 = current_usb_client.device_info.cpiLevels;
        for (var _0x365c13 = 0x0; _0x365c13 < _0x4448c3.length; _0x365c13++) {
          _0x368d17 = _0x4448c3[_0x365c13] & 0xffff;
          _0x4f7b65 = _0x368d17;
          set_cpi_level(current_usb_client, _0x365c13, _0x368d17 | _0x4f7b65 << 0x10, _0x365c13 == _0x4448c3.length - 0x1);
        }
      }
    } else {
      if (_0x4f7b65 != 0x0) {
        _0x4f7b65 = 0x0;
        set_cpi(current_usb_client, _0x368d17 | _0x4f7b65 << 0x10);
        var _0x4448c3 = current_usb_client.device_info.cpiLevels;
        for (var _0x365c13 = 0x0; _0x365c13 < _0x4448c3.length; _0x365c13++) {
          _0x368d17 = _0x4448c3[_0x365c13] & 0xffff;
          _0x4f7b65 = 0x0;
          set_cpi_level(current_usb_client, _0x365c13, _0x368d17 | _0x4f7b65 << 0x10, _0x365c13 == _0x4448c3.length - 0x1);
        }
      }
    }
    window.postMessage({
      'action': ACTION_UI_REFRESH_SETTING
    });
  });
  _0x1435f3.on("checkbox(glass-mode)", function (_0x388d2e) {
    set_enable_glass_mode(current_usb_client, _0x388d2e.elem.checked);
  });
  _0x1435f3.on("switch(x-polling)", function (_0x3f3ec6) {
    if (_0x3f3ec6.elem.checked) {
      localStorage.setItem("setting-x-polling", 0x1);
    } else {
      localStorage.setItem("setting-x-polling", 0x0);
    }
    window.postMessage({
      'action': ACTION_UI_REFRESH_SETTING
    });
  });
  _0x3f4986.on('dpi-level-edit-action', {
    'edit': async function () {
      if (cpi_level_editing) {
        cpi_level_editing = false;
      } else {
        cpi_level_editing = true;
      }
      window.postMessage({
        'action': ACTION_UI_REFRESH_SETTING
      });
    }
  });
  _0x3f4986.on('dpi-level-add-action', {
    'edit': async function () {
      var _0x1ebcee = current_usb_client.device_info.resolution;
      var _0x4b84a7 = (_0x1ebcee >> 0x10 & 0xffff) > 0x0;
      var _0x29527f = current_usb_client.device_info.cpiLevels;
      var _0x1a5d43 = _0x29527f[0x0];
      _0x29527f.forEach(_0x532e3 => {
        if (_0x532e3 > _0x1a5d43) {
          _0x1a5d43 = _0x532e3;
        }
      });
      var _0x50373f = _0x1a5d43 & 0xffff;
      var _0x51da6c = _0x1a5d43 >> 0x10 & 0xffff;
      if (_0x4b84a7 && _0x51da6c == 0x0) {
        _0x51da6c = _0x50373f;
      }
      cpi_level_index = -0x1;
      ui_refresh_dpi_input_panel(current_usb_client, _0x50373f + 0x32, _0x51da6c + 0x32, 0x0, _0x4b84a7);
      _0x2a0d7b.open({
        'type': 0x1,
        'title': _0x542cd7.prop("STRID_SETTING_DPI_SPEED"),
        'skin': "layui-layer-confirm",
        'btn': [_0x542cd7.prop('STRING_OK'), _0x542cd7.prop("STRING_CANCEL")],
        'btnAlign': 'c',
        'content': _0x3d5eb9("#dpi-level-input-panel"),
        'btn1': function () {
          _0x2a0d7b.closeLast(0x0);
          var _0x1e59bb = get_cpi_range(current_usb_client);
          var _0x3573d5 = get_cpi_step(current_usb_client);
          var _0x41a975 = current_usb_client.device_info.resolution;
          var _0x27689c = (_0x41a975 >> 0x10 & 0xffff) > 0x0;
          var _0x2acfab = 0x32;
          if (_0x27689c) {
            var _0x4a6325 = _0x3573d5 * (_0x3d5eb9("#x-dpi-level-input").val() / _0x3573d5);
            if (_0x4a6325 < _0x1e59bb[0x0]) {
              _0x4a6325 = _0x1e59bb[0x1];
            }
            if (_0x4a6325 > _0x1e59bb[0x1]) {
              _0x4a6325 = _0x1e59bb[0x1];
            }
            var _0x53b159 = _0x3573d5 * (_0x3d5eb9("#y-dpi-level-input").val() / _0x3573d5);
            if (_0x53b159 < _0x1e59bb[0x0]) {
              _0x53b159 = _0x1e59bb[0x1];
            }
            if (_0x53b159 > _0x1e59bb[0x1]) {
              _0x53b159 = _0x1e59bb[0x1];
            }
            _0x2acfab = (_0x53b159 << 0x10) + _0x4a6325;
          } else {
            _0x2acfab = _0x3573d5 * (_0x3d5eb9("#dpi-level-input").val() / _0x3573d5);
            if (_0x2acfab < _0x1e59bb[0x0]) {
              _0x2acfab = _0x1e59bb[0x1];
            }
            if (_0x2acfab > _0x1e59bb[0x1]) {
              _0x2acfab = _0x1e59bb[0x1];
            }
          }
          add_cpi_level(current_usb_client, _0x2acfab, cpi_level_light);
          window.postMessage({
            'action': ACTION_UI_REFRESH_SETTING
          });
        },
        'btn2': function () {
          _0x2a0d7b.closeLast(0x0);
        }
      });
    }
  });
  _0x3f4986.on("cpi-level-action", {
    'select': async function () {
      cpi_level_index = this.getAttribute('cpi-level-index');
      if (cpi_level_editing) {
        var _0x430973 = current_usb_client.device_info.resolution;
        var _0x31d729 = (_0x430973 >> 0x10 & 0xffff) > 0x0;
        var _0x2a5bcd = current_usb_client.device_info.cpiLevels;
        var _0xfb12a8 = current_usb_client.device_info.cpiLevelColors;
        var _0x814ae5 = _0x2a5bcd[cpi_level_index];
        var _0x519272 = _0x814ae5 & 0xffff;
        var _0x55ada7 = _0x814ae5 >> 0x10 & 0xffff;
        if (_0x31d729 && _0x55ada7 == 0x0) {
          _0x55ada7 = _0x519272;
        }
        ui_refresh_dpi_input_panel(current_usb_client, _0x519272, _0x55ada7, _0xfb12a8[cpi_level_index], _0x31d729);
        _0x2a0d7b.open({
          'type': 0x1,
          'title': _0x542cd7.prop("STRID_SETTING_DPI_SPEED"),
          'skin': "layui-layer-confirm",
          'btn': [_0x542cd7.prop("STRID_SETTING_MAPPING_DELETE"), _0x542cd7.prop('STRING_OK'), _0x542cd7.prop("STRING_CANCEL")],
          'btnAlign': 'c',
          'content': _0x3d5eb9("#dpi-level-input-panel"),
          'btn1': function () {
            _0x2a0d7b.closeLast(0x0);
            remove_cpi_level(current_usb_client, cpi_level_index);
            window.postMessage({
              'action': ACTION_UI_REFRESH_SETTING
            });
          },
          'btn2': function () {
            _0x2a0d7b.closeLast(0x0);
            var _0x575922 = get_cpi_range(current_usb_client);
            var _0x508604 = get_cpi_step(current_usb_client);
            var _0x23afe5 = current_usb_client.device_info.resolution;
            var _0x3c2c93 = (_0x23afe5 >> 0x10 & 0xffff) > 0x0;
            var _0x133bbe = 0x32;
            if (_0x3c2c93) {
              var _0x37750d = _0x508604 * (_0x3d5eb9("#x-dpi-level-input").val() / _0x508604);
              if (_0x37750d < _0x575922[0x0]) {
                _0x37750d = _0x575922[0x1];
              }
              if (_0x37750d > _0x575922[0x1]) {
                _0x37750d = _0x575922[0x1];
              }
              var _0xc6d11e = _0x508604 * (_0x3d5eb9('#y-dpi-level-input').val() / _0x508604);
              if (_0xc6d11e < _0x575922[0x0]) {
                _0xc6d11e = _0x575922[0x1];
              }
              if (_0xc6d11e > _0x575922[0x1]) {
                _0xc6d11e = _0x575922[0x1];
              }
              _0x133bbe = (_0xc6d11e << 0x10) + _0x37750d;
            } else {
              _0x133bbe = _0x508604 * (_0x3d5eb9("#dpi-level-input").val() / _0x508604);
              if (_0x133bbe < _0x575922[0x0]) {
                _0x133bbe = _0x575922[0x1];
              }
              if (_0x133bbe > _0x575922[0x1]) {
                _0x133bbe = _0x575922[0x1];
              }
            }
            set_cpi_level(current_usb_client, cpi_level_index, _0x133bbe);
            set_cpi_level_color(current_usb_client, cpi_level_index, cpi_level_light);
            window.postMessage({
              'action': ACTION_UI_REFRESH_SETTING
            });
          },
          'btn3': function () {
            _0x2a0d7b.closeLast(0x0);
          }
        });
      } else {
        var _0x430973 = current_usb_client.device_info.resolution;
        var _0x5379fc = _0x430973 >> 0x10 & 0xffff;
        var _0x246586 = current_usb_client.device_info.cpiLevels;
        var _0x5582c1 = _0x246586[cpi_level_index];
        if (_0x5379fc == 0x0) {
          _0x5582c1 = _0x5582c1 & 0xffff;
        }
        set_cpi(current_usb_client, _0x5582c1);
      }
      window.postMessage({
        'action': ACTION_UI_REFRESH_SETTING
      });
    }
  });
  _0x3f4986.on('dpi-level-color-action', {
    'select': async function () {
      var _0x53f631 = this.getAttribute("color-code");
      var _0x263b2a = current_usb_client.device_info.light;
      var _0xc451fc = _0x263b2a;
      if (_0x53f631 == 'white') {
        _0xc451fc = _0x263b2a & -8 | 4 | 2 | 1;
      } else {
        if (_0x53f631 == "red") {
          _0xc451fc = _0x263b2a & -8 | 4;
        } else {
          if (_0x53f631 == 'green') {
            _0xc451fc = _0x263b2a & -8 | 2;
          } else {
            if (_0x53f631 == "blue") {
              _0xc451fc = _0x263b2a & -8 | 1;
            } else {
              if (_0x53f631 == "yellow") {
                _0xc451fc = _0x263b2a & -8 | 4 | 2;
              } else {
                if (_0x53f631 == "purple") {
                  _0xc451fc = _0x263b2a & -8 | 4 | 1;
                } else {
                  if (_0x53f631 == "skyblue") {
                    _0xc451fc = _0x263b2a & -8 | 2 | 1;
                  } else if (_0x53f631 == "none") {
                    _0xc451fc = _0x263b2a & -8;
                  }
                }
              }
            }
          }
        }
      }
      _0x263b2a = _0xc451fc | 8;
      var _0x10e108 = current_usb_client.device_info.resolution;
      var _0x53d15e = (_0x10e108 >> 0x10 & 0xffff) > 0x0;
      var _0x27e600 = 0x0;
      var _0x1ae03d = 0x0;
      if (_0x53d15e) {
        _0x27e600 = _0x3d5eb9("#x-dpi-level-input").val();
        _0x1ae03d = _0x3d5eb9("#y-dpi-level-input").val();
      } else {
        _0x27e600 = _0x3d5eb9("#dpi-level-input").val();
        _0x1ae03d = 0x0;
      }
      ui_refresh_dpi_input_panel(current_usb_client, _0x27e600, _0x1ae03d, _0x263b2a, _0x53d15e);
    }
  });
  _0x1435f3.on("radio(setting-polling-rates)", function (_0x369091) {
    var _0x470c13 = _0x369091.elem;
    var _0x47d8a1 = _0x470c13.value;
    set_polling_rate(current_usb_client, _0x47d8a1);
    window.postMessage({
      'action': ACTION_UI_REFRESH_SETTING
    });
  });
  _0x1435f3.on("checkbox(light-auto-off)", function (_0x1a6a15) {
    var _0x197577 = current_usb_client.device_info.light;
    if (_0x1a6a15.elem.checked) {
      set_light(current_usb_client, _0x197577 | 32);
    } else {
      set_light(current_usb_client, _0x197577 & -33);
    }
  });
  _0x1435f3.on('radio(light-mode)', function (_0x4175b5) {
    var _0x5ce58c = _0x4175b5.elem;
    var _0x503a82 = _0x5ce58c.value;
    var _0x3405d4 = current_usb_client.device_info.light;
    if (_0x503a82 == 0x1) {
      set_light(current_usb_client, (_0x3405d4 | 64) & -17);
    } else {
      if (_0x503a82 == 0x2) {
        set_light(current_usb_client, _0x3405d4 & -65 & -17);
      } else if (_0x503a82 == 0x3) {
        set_light(current_usb_client, (_0x3405d4 | 16) & -65);
      }
    }
    window.postMessage({
      'action': ACTION_UI_REFRESH_SETTING
    });
  });
  _0x3f4986.on("light-color-action", {
    'select': async function () {
      var _0x1699cb = this.getAttribute("color-code");
      var _0x17e6de = current_usb_client.device_info.light;
      if (_0x1699cb == "white") {
        set_light(current_usb_client, _0x17e6de & -8 | 4 | 2 | 1);
      } else {
        if (_0x1699cb == "red") {
          set_light(current_usb_client, _0x17e6de & -8 | 4);
        } else {
          if (_0x1699cb == "green") {
            set_light(current_usb_client, _0x17e6de & -8 | 2);
          } else {
            if (_0x1699cb == "blue") {
              set_light(current_usb_client, _0x17e6de & -8 | 1);
            } else {
              if (_0x1699cb == "yellow") {
                set_light(current_usb_client, _0x17e6de & -8 | 4 | 2);
              } else {
                if (_0x1699cb == "purple") {
                  set_light(current_usb_client, _0x17e6de & -8 | 4 | 1);
                } else {
                  if (_0x1699cb == "skyblue") {
                    set_light(current_usb_client, _0x17e6de & -8 | 2 | 1);
                  } else if (_0x1699cb == "none") {
                    set_light(current_usb_client, _0x17e6de & -8);
                  }
                }
              }
            }
          }
        }
      }
      window.postMessage({
        'action': ACTION_UI_REFRESH_SETTING
      });
    }
  });
  _0x1435f3.on("radio(setting-power-modes)", function (_0x26b77b) {
    var _0x49c816 = _0x26b77b.elem;
    var _0x21abb7 = _0x49c816.value;
    set_power_mode(current_usb_client, _0x21abb7);
  });
  _0x1435f3.on("radio(setting-lods)", function (_0x2fb835) {
    var _0x3224e9 = _0x2fb835.elem;
    var _0x362f81 = _0x3224e9.value;
    set_lod(current_usb_client, _0x362f81);
  });
  _0x1435f3.on("switch(setting-angle-snapping)", function (_0x583115) {
    set_angle_snapping(current_usb_client, _0x583115.elem.checked ? 0x1 : 0x0);
  });
  _0x1435f3.on('switch(setting-ripple-control)', function (_0x58d3f8) {
    set_ripple_control(current_usb_client, _0x58d3f8.elem.checked ? 0x1 : 0x0);
  });
  _0x1435f3.on("switch(setting-motion-sync)", function (_0x5b389a) {
    set_motion_sync(current_usb_client, _0x5b389a.elem.checked ? 0x1 : 0x0);
  });
  _0x1435f3.on("switch(setting-wireless-turbo)", function (_0x44ec16) {
    if (_0x44ec16.elem.checked) {
      set_wireless_turbo(current_usb_client, 0x1);
      _0x3d5eb9("[name=\"setting-rf-channel\"]").prop('disabled', false);
    } else {
      set_wireless_turbo(current_usb_client, 0x0);
      _0x3d5eb9("[name=\"setting-rf-channel\"]").prop('disabled', true);
    }
  });
  _0x1435f3.on("radio(setting-rf-channel)", function (_0x3f33d3) {
    var _0x20c47e = _0x3f33d3.elem;
    var _0x5b766e = _0x20c47e.value;
    if (_0x5b766e == -0x1) {
      send_event_set_auto_hop(current_usb_client, true);
    } else {
      if (current_usb_client.device_info.hopChannelSupported) {
        send_event_set_auto_hop(current_usb_client, false);
      }
      if (_0x5b766e == 0x2) {
        send_event_set_rf_channel(current_usb_client, 0x2);
      } else {
        if (_0x5b766e == 0x28) {
          send_event_set_rf_channel(current_usb_client, 0x28);
        } else if (_0x5b766e == 0x50) {
          send_event_set_rf_channel(current_usb_client, 0x50);
        }
      }
    }
    var _0x4f0adf = '';
    if (_0x5b766e == -0x1) {
      _0x4f0adf += layui.i18np.prop("STRID_SETTING_RF_CHANNEL_AUTO");
      _0x4f0adf += ": " + layui.i18np.prop('STRID_SETTING_RF_CHANNEL_AUTO_TIPS');
    } else {
      if (current_usb_client.device_info.rfChannel == 0x2) {
        _0x4f0adf += layui.i18np.prop("STRID_SETTING_RF_CHANNEL_2");
        _0x4f0adf += ": " + layui.i18np.prop('STRID_SETTING_RF_CHANNEL_2_TIPS');
      } else {
        if (current_usb_client.device_info.rfChannel == 0x28) {
          _0x4f0adf += layui.i18np.prop("STRID_SETTING_RF_CHANNEL_40");
          _0x4f0adf += ": " + layui.i18np.prop('STRID_SETTING_RF_CHANNEL_40_TIPS');
        } else if (current_usb_client.device_info.rfChannel == 0x50) {
          _0x4f0adf += layui.i18np.prop("STRID_SETTING_RF_CHANNEL_80");
          _0x4f0adf += ": " + layui.i18np.prop('STRID_SETTING_RF_CHANNEL_80_TIPS');
        }
      }
    }
    _0x3d5eb9("#selected-rf-channel-tips").html(_0x4f0adf);
  });
  _0x1435f3.on("checkbox(power-saving)", function (_0x12a2c6) {
    set_auto_tx_power(current_usb_client, _0x12a2c6.elem.checked);
  });
  _0x1435f3.on("switch(onboard-allow-switch)", function (_0x3b7eec) {
    var _0x5dab3a = onboard_status[onboard_config_index];
    if (_0x3b7eec.elem.checked) {
      _0x5dab3a = _0x5dab3a | 0x80;
    } else {
      _0x5dab3a = _0x5dab3a & -129;
    }
    set_onboard_status(current_usb_client, onboard_config_index, _0x5dab3a);
    ui_refresh_onboard_config(usb_client);
  });
  _0x1435f3.on("select(onboard-config)", function (_0x316c62) {
    var _0x4d4735 = _0x316c62.elem;
    var _0x425ffc = _0x4d4735.value;
    if (need_save) {
      _0x2a0d7b.confirm(_0x542cd7.prop("STRID_SETTING_MAPPING_NOT_SAVED_DISCARD_CONFIRM"), {
        'title': _0x542cd7.prop("STRID_TITLE_WARNING"),
        'skin': 'layui-layer-confirm',
        'btn': [_0x542cd7.prop("STRID_SETTING_MAPPING_NOT_SAVED_DISCARD_S"), _0x542cd7.prop("STRID_SETTING_MAPPING_NOT_SAVED_BACK_S")],
        'btnAlign': 'c',
        'btn1': function () {
          _0x2a0d7b.closeLast(0x0);
          need_save = false;
          onboard_config_index = _0x425ffc;
          onboard_keys = onboard_configs[onboard_config_index];
          combination_key_index = 0x0;
          select_mouse_key(current_usb_client, '');
          ui_refresh_combination_key(current_usb_client);
          ui_refresh_onboard_config(current_usb_client);
        },
        'btn2': function () {
          _0x2a0d7b.closeLast(0x0);
          ui_refresh_onboard_config(current_usb_client);
        }
      });
      return;
    }
    onboard_config_index = _0x425ffc;
    onboard_keys = onboard_configs[onboard_config_index];
    combination_key_index = 0x0;
    select_mouse_key(current_usb_client, '');
    ui_refresh_combination_key(current_usb_client);
    ui_refresh_onboard_config(current_usb_client);
  });
  _0x3f4986.on("setting-onboard-status-action", {
    'select': async function () {
      var _0x32ca9c = this.getAttribute("color-code");
      var _0x3cdf62 = onboard_status[onboard_config_index];
      if (_0x32ca9c == 'white') {
        set_onboard_status(current_usb_client, onboard_config_index, _0x3cdf62 & -8 | 4 | 2 | 1);
      } else {
        if (_0x32ca9c == "red") {
          set_onboard_status(current_usb_client, onboard_config_index, _0x3cdf62 & -8 | 4);
        } else {
          if (_0x32ca9c == "green") {
            set_onboard_status(current_usb_client, onboard_config_index, _0x3cdf62 & -8 | 2);
          } else {
            if (_0x32ca9c == "blue") {
              set_onboard_status(current_usb_client, onboard_config_index, _0x3cdf62 & -8 | 1);
            } else {
              if (_0x32ca9c == 'yellow') {
                set_onboard_status(current_usb_client, onboard_config_index, _0x3cdf62 & -8 | 4 | 2);
              } else {
                if (_0x32ca9c == "purple") {
                  set_onboard_status(current_usb_client, onboard_config_index, _0x3cdf62 & -8 | 4 | 1);
                } else {
                  if (_0x32ca9c == "skyblue") {
                    set_onboard_status(current_usb_client, onboard_config_index, _0x3cdf62 & -8 | 2 | 1);
                  } else if (_0x32ca9c == "none") {
                    set_onboard_status(current_usb_client, onboard_config_index, _0x3cdf62 & -8);
                  }
                }
              }
            }
          }
        }
      }
      window.postMessage({
        'action': ACTION_UI_REFRESH_SETTING
      });
      ui_refresh_onboard_config(current_usb_client);
    }
  });
  _0x1435f3.on("select(combination-key)", function (_0x19846f) {
    var _0x140783 = _0x19846f.elem;
    var _0x1034f1 = _0x140783.value;
    combination_key_index = _0x1034f1;
    select_mouse_key(current_usb_client, '');
  });
  _0x3f4986.on('mapping-action', {
    'setting-mapping-key': async function () {
      var _0x2cf16e = this.getAttribute("value");
      select_key_name = '';
      if (_0x2cf16e == "setting_mapping_key_wheel_down") {
        select_key_name = KEY_WHEEL_DOWN;
      } else {
        if (_0x2cf16e == "setting_mapping_key_wheel_up") {
          select_key_name = KEY_WHEEL_UP;
        } else {
          for (let _0x4b3bf3 = 0x0; _0x4b3bf3 < mouse_keys.length; _0x4b3bf3++) {
            if (_0x2cf16e == setting_mapping_keys[_0x4b3bf3]) {
              select_key_name = get_key_name_from_label(mouse_keys[_0x4b3bf3].label);
              break;
            }
          }
        }
      }
      var _0x21196f = mouse_key_labels[combination_key_index];
      var _0x3031b3 = get_key_name_from_label(_0x21196f);
      if (_0x3031b3.length > 0x0) {
        select_key_name = _0x3031b3 + '+' + select_key_name;
      }
      select_mouse_key(current_usb_client, select_key_name);
    }
  });
  var _0x57d7c7 = layui.element;
  _0x57d7c7.on("tab(mapping-key-type)", function (_0x48ef6c) {
    var _0x38e405 = _0x48ef6c.index;
    if (select_key_name.length > 0x0) {
      var _0x2dda02 = get_select_key_info();
      if (Object.keys(_0x2dda02).length == 0x0) {
        var _0x899935 = -0x1;
        for (let _0x2e0aa9 = 0x0; _0x2e0aa9 < mouse_keys.length; _0x2e0aa9++) {
          if (select_key_name == mouse_keys[_0x2e0aa9].name) {
            _0x899935 = _0x2e0aa9;
            break;
          }
        }
        if (_0x899935 >= 0x0) {
          var _0x2dda02 = create_key_info();
          _0x2dda02.name = mouse_keys[_0x899935].name;
          _0x2dda02.label = mouse_keys[_0x899935].label;
          onboard_keys.push(_0x2dda02);
        }
      }
      for (let _0x564105 = 0x0; _0x564105 < onboard_keys.length; _0x564105++) {
        if (select_key_name == onboard_keys[_0x564105].name) {
          if (_0x38e405 == 0x0) {
            onboard_keys[_0x564105].configType = 0x0;
            onboard_keys[_0x564105].touch_style = 0x1b;
          } else {
            if (_0x38e405 == 0x1) {
              onboard_keys[_0x564105].configType = 0x5;
            } else if (_0x38e405 == 0x2) {
              onboard_keys[_0x564105].configType = 0x0;
              onboard_keys[_0x564105].touch_style = 0x1d;
            } else {
              onboard_keys[_0x564105].configType = -0x1;
            }
          }
        }
      }
      for (let _0x336aaa = 0x0; _0x336aaa < onboard_keys.length; _0x336aaa++) {
        if (select_key_name == onboard_keys[_0x336aaa].name) {
          for (let _0x7a897b = onboard_keys.length - 0x1; _0x7a897b > _0x336aaa; _0x7a897b--) {
            if (select_key_name == onboard_keys[_0x7a897b].name) {
              if (_0x38e405 == 0x1) {
                if (onboard_keys[_0x336aaa].macro_style == onboard_keys[_0x7a897b].macro_style) {
                  onboard_keys.splice(_0x7a897b, 0x1);
                }
              } else {
                onboard_keys.splice(_0x7a897b, 0x1);
              }
            }
          }
        }
      }
      update_mapping(current_usb_client, _0x38e405);
      ui_refresh_mapping_key(current_usb_client);
      ui_refresh_combination_key(current_usb_client);
    }
  });
  _0x1435f3.on("select(mapping-ctrl-key1)", function (_0xa18e40) {
    set_mapping_keys(current_usb_client);
    ui_refresh_tab_mapping_key(current_usb_client);
  });
  _0x1435f3.on("select(mapping-ctrl-key2)", function (_0x539ca8) {
    set_mapping_keys(current_usb_client);
    ui_refresh_tab_mapping_key(current_usb_client);
  });
  _0x1435f3.on("select(mapping-key)", function (_0x2d7044) {
    set_mapping_keys(current_usb_client);
    ui_refresh_tab_mapping_key(current_usb_client);
  });
  _0x1435f3.on("input-affix(wheel-delta-input)", function (_0x222051) {
    document.getElementById('wheel-delta-input').dispatchEvent(new Event("input", {
      'bubbles': true
    }));
  });
  _0x3d5eb9('#wheel-delta-input').on("input", function (_0x586f65) {
    var _0x4f25e9 = get_select_key_info();
    if (Object.keys(_0x4f25e9).length == 0x0) {
      return;
    }
    _0x4f25e9.mouse_mapping_key_data = _0x586f65.delegateTarget.value;
    if (_0x4f25e9.mouse_mapping_key_data < 0x1 || _0x4f25e9.mouse_mapping_key_data > 0x40) {
      _0x4f25e9.mouse_mapping_key_data = 0x1;
    }
    set_mapping_keys(current_usb_client);
  });
  _0x1435f3.on("checkbox(mapping-key-turbo)", function (_0x3a402a) {
    var _0x8dcca8 = get_select_key_info();
    if (Object.keys(_0x8dcca8).length == 0x0) {
      return;
    }
    if (_0x3a402a.elem.checked) {
      _0x8dcca8.mouse_auto_click = 0x1;
    } else {
      _0x8dcca8.mouse_auto_click = 0x0;
    }
    ui_refresh_tab_mapping_key(current_usb_client);
    need_save = true;
    ui_refresh_onboard_config(current_usb_client);
  });
  _0x3f4986.on("shell-cmd-app-browse-action", {
    'edit': async function () {
      _0x3d5eb9('#shell-cmd-app-browse_file').click();
    }
  });
  _0x1435f3.on("select(mapping-function)", function (_0x426981) {
    var _0x136d38 = _0x426981.elem;
    var _0x380491 = _0x136d38.value;
    var _0x47f92d = get_select_key_info();
    if (Object.keys(_0x47f92d).length == 0x0) {
      return;
    }
    _0x47f92d.mouse_mapping_function = mouse_functions[_0x380491];
    ui_refresh_tab_mapping_function(current_usb_client);
    ui_refresh_mapping_key(current_usb_client);
    ui_refresh_combination_key(current_usb_client);
    need_save = true;
    ui_refresh_onboard_config(current_usb_client);
  });
  _0x1435f3.on('radio(function-shell-cmd)', function (_0x4b7920) {
    var _0x4eacdb = _0x4b7920.elem;
    var _0x1ef5f0 = _0x4eacdb.value;
    var _0x12eb02 = get_select_key_info();
    if (Object.keys(_0x12eb02).length == 0x0) {
      return;
    }
    if (_0x1ef5f0 == 0x1) {
      _0x12eb02.mouse_mapping_function_text = _0x3d5eb9("[name=\"function-shell-cmd-web\"]").val();
      _0x3d5eb9('#function-shell-cmd-app-browse').css('display', 'none');
      _0x3d5eb9('#function-shell-cmd-app-browse').prop("disabled", true);
      _0x3d5eb9("[name=\"function-shell-cmd-app\"]").prop("disabled", true);
      _0x3d5eb9("[name=\"function-shell-cmd-web\"]").prop("disabled", false);
      _0x3d5eb9("#function-shell-cmd-app-container").css('display', "none");
      _0x3d5eb9("#function-shell-cmd-web-container").css("display", '');
    } else {
      _0x12eb02.mouse_mapping_function_text = _0x3d5eb9("[name=\"function-shell-cmd-app\"]").val();
      _0x3d5eb9("#function-shell-cmd-app-browse").css('display', "none");
      _0x3d5eb9("#function-shell-cmd-app-browse").prop("disabled", false);
      _0x3d5eb9("[name=\"function-shell-cmd-app\"]").prop("disabled", false);
      _0x3d5eb9("[name=\"function-shell-cmd-web\"]").prop("disabled", true);
      _0x3d5eb9("#function-shell-cmd-app-container").css('display', '');
      _0x3d5eb9("#function-shell-cmd-web-container").css('display', "none");
    }
    need_save = true;
    ui_refresh_onboard_config(current_usb_client);
  });
  _0x3d5eb9("#function-shell-cmd-app").on("input", function (_0x25a3d7) {
    var _0x1e8ee2 = get_select_key_info();
    if (Object.keys(_0x1e8ee2).length == 0x0) {
      return;
    }
    _0x1e8ee2.mouse_mapping_function_text = _0x25a3d7.delegateTarget.value;
  });
  _0x3d5eb9('#function-shell-cmd-web').on("input", function (_0x2fd7dd) {
    var _0x46c0ad = get_select_key_info();
    if (Object.keys(_0x46c0ad).length == 0x0) {
      return;
    }
    _0x46c0ad.mouse_mapping_function_text = _0x2fd7dd.delegateTarget.value;
    need_save = true;
    ui_refresh_onboard_config(current_usb_client);
  });
  _0x1435f3.on("input-affix(mapping-key-turbo-freq-input)", function (_0x229101) {
    document.getElementById("mapping-key-turbo-freq-input").dispatchEvent(new Event('input', {
      'bubbles': true
    }));
  });
  _0x3d5eb9("#mapping-key-turbo-freq-input").on('input', function (_0x2ba76c) {
    var _0x2dcff2 = get_select_key_info();
    if (Object.keys(_0x2dcff2).length == 0x0) {
      return;
    }
    var _0x3aba85 = _0x2ba76c.delegateTarget.value;
    var _0x54f33d = _0x3aba85.length == 0x0 ? 0x0 : parseInt(_0x3aba85);
    if (_0x54f33d <= 0x0) {
      _0x54f33d = 0x1;
    }
    if (_0x54f33d != parseInt(0x3e8 / (_0x2dcff2.mouse_auto_click_down + _0x2dcff2.mouse_auto_click_up))) {
      var _0x284b44 = parseInt(0x3e8 / _0x54f33d);
      if (_0x284b44 >= 0x64) {
        _0x2dcff2.mouse_auto_click_down = 0x32;
        _0x2dcff2.mouse_auto_click_up = _0x284b44 - _0x2dcff2.mouse_auto_click_down;
      } else {
        _0x2dcff2.mouse_auto_click_up = parseInt(_0x284b44 / 0x2);
        _0x2dcff2.mouse_auto_click_down = _0x284b44 - _0x2dcff2.mouse_auto_click_up;
      }
      if (_0x2dcff2.mouse_auto_click_down < 0x0) {
        _0x2dcff2.mouse_auto_click_down = 0x0;
      }
      if (_0x2dcff2.mouse_auto_click_up < 0x0) {
        _0x2dcff2.mouse_auto_click_up = 0x0;
      }
      if (_0x2dcff2.mouse_auto_click_down == 0x0 && _0x2dcff2.mouse_auto_click_up == 0x0) {
        _0x2dcff2.mouse_auto_click_down = 0x1;
      }
      _0x3d5eb9("#mapping-key-turbo-down-keep-input").val(_0x2dcff2.mouse_auto_click_down);
      _0x3d5eb9("#mapping-key-turbo-up-keep-input").val(_0x2dcff2.mouse_auto_click_up);
    }
    need_save = true;
    ui_refresh_onboard_config(current_usb_client);
  });
  _0x1435f3.on("input-affix(mapping-key-turbo-rand-input)", function (_0x5715f3) {
    document.getElementById("mapping-key-turbo-rand-input").dispatchEvent(new Event("input", {
      'bubbles': true
    }));
  });
  _0x3d5eb9("#mapping-key-turbo-rand-input").on("input", function (_0x2f4f72) {
    var _0x1c1d50 = get_select_key_info();
    if (Object.keys(_0x1c1d50).length == 0x0) {
      return;
    }
    var _0x3b6fe8 = _0x2f4f72.delegateTarget.value;
    var _0x30e4ae = _0x3b6fe8.length == 0x0 ? 0x0 : parseInt(_0x3b6fe8);
    if (_0x30e4ae < 0x0) {
      _0x30e4ae = 0x0;
    }
    _0x1c1d50.mouse_auto_click_rand = _0x30e4ae;
    need_save = true;
    ui_refresh_onboard_config(current_usb_client);
  });
  _0x1435f3.on('input-affix(mapping-key-turbo-down-keep-input)', function (_0x19da15) {
    document.getElementById("mapping-key-turbo-down-keep-input").dispatchEvent(new Event("input", {
      'bubbles': true
    }));
  });
  _0x3d5eb9("#mapping-key-turbo-down-keep-input").on("input", function (_0x2d99b1) {
    var _0x73ab18 = get_select_key_info();
    if (Object.keys(_0x73ab18).length == 0x0) {
      return;
    }
    var _0x282c08 = _0x2d99b1.delegateTarget.value;
    var _0x2e6779 = _0x282c08.length == 0x0 ? 0x0 : parseInt(_0x282c08);
    if (_0x2e6779 < 0x0) {
      _0x2e6779 = 0x0;
    }
    _0x73ab18.mouse_auto_click_down = _0x2e6779;
    if (_0x73ab18.mouse_auto_click_down == 0x0 && _0x73ab18.mouse_auto_click_up == 0x0) {
      _0x73ab18.mouse_auto_click_down = 0x1;
    }
    var _0x20f1f1 = _0x73ab18.mouse_auto_click_down + _0x73ab18.mouse_auto_click_up;
    if (_0x20f1f1 <= 0x0) {
      _0x20f1f1 = 0x1;
    }
    _0x3d5eb9("#mapping-key-turbo-freq-input").val(parseInt(0x3e8 / _0x20f1f1));
    need_save = true;
    ui_refresh_onboard_config(current_usb_client);
  });
  _0x1435f3.on('input-affix(mapping-key-turbo-up-keep-input)', function (_0x4b4cb3) {
    document.getElementById("mapping-key-turbo-up-keep-input").dispatchEvent(new Event('input', {
      'bubbles': true
    }));
  });
  _0x3d5eb9("#mapping-key-turbo-up-keep-input").on("input", function (_0x17668b) {
    var _0x2326c7 = get_select_key_info();
    if (Object.keys(_0x2326c7).length == 0x0) {
      return;
    }
    var _0x1e0f6f = _0x17668b.delegateTarget.value;
    var _0xdd1bff = _0x1e0f6f.length == 0x0 ? 0x0 : parseInt(_0x1e0f6f);
    if (_0xdd1bff < 0x0) {
      _0xdd1bff = 0x0;
    }
    _0x2326c7.mouse_auto_click_up = _0xdd1bff;
    if (_0x2326c7.mouse_auto_click_down == 0x0 && _0x2326c7.mouse_auto_click_up == 0x0) {
      _0x2326c7.mouse_auto_click_up = 0x1;
    }
    var _0x2f43b0 = _0x2326c7.mouse_auto_click_down + _0x2326c7.mouse_auto_click_up;
    if (_0x2f43b0 <= 0x0) {
      _0x2f43b0 = 0x1;
    }
    _0x3d5eb9("#mapping-key-turbo-freq-input").val(parseInt(0x3e8 / _0x2f43b0));
    need_save = true;
    ui_refresh_onboard_config(current_usb_client);
  });
  _0x3f4986.on('macro-edit-item-action', {
    'select': async function () {
      macro_edit_index = this.getAttribute("macro-edit-item-index");
      current_edit_macro = clone_macro_info(edit_macros[macro_edit_index]);
      macro_keep_time_min = current_edit_macro.mouse_key_time / 0x1f4 * 0x1f4;
      ui_refresh_mapping_macro_add(current_usb_client);
      _0x2a0d7b.open({
        'type': 0x1,
        'title': _0x542cd7.prop('STRID_SETTING_MAPPING_MACRO_ACTION_EDIT'),
        'skin': "layui-layer-confirm",
        'content': _0x3d5eb9('#setting-mapping-macro-add-panel'),
        'btn': [_0x542cd7.prop('STRID_DELETE'), _0x542cd7.prop('STRID_INSERT'), _0x542cd7.prop("STRID_SAVE")],
        'btnAlign': 'c',
        'btn1': function () {
          _0x2a0d7b.closeLast(0x0);
          edit_macros.splice(macro_edit_index, 0x1);
          ui_refresh_mapping_macro_edit(current_usb_client);
        },
        'btn2': function () {
          _0x2a0d7b.closeLast(0x0);
          var _0x2ab34a = create_macro_info();
          _0x2ab34a.style = 0x16;
          var _0x1a4828 = macro_keys[parseInt(_0x3d5eb9("[name=\"macro-add-select-key\"]").val())].vCode;
          if (current_usb_client != undefined ? is_hs_keyboard(current_usb_client.device) : false) {
            _0x1a4828 = get_key_code_from_name(document.getElementById("kbd-macro-add-select-key").textContent);
          }
          if (_0x1a4828 == 0x401) {
            _0x2ab34a.mouse_key_event = 0x20a;
            _0x2ab34a.mouse_key_code = -parseInt(_0x3d5eb9("#macro-add-wheel-delta-input").val());
          } else {
            if (_0x1a4828 == 0x400) {
              _0x2ab34a.mouse_key_event = 0x20a;
              _0x2ab34a.mouse_key_code = parseInt(_0x3d5eb9("#macro-add-wheel-delta-input").val());
            } else {
              if (_0x1a4828 == 0x402) {
                _0x2ab34a.mouse_key_event = 0x20e;
                _0x2ab34a.mouse_key_code = -parseInt("#macro-add-wheel-delta-input".val());
              } else {
                if (_0x1a4828 == 0x403) {
                  _0x2ab34a.mouse_key_event = 0x20e;
                  _0x2ab34a.mouse_key_code = parseInt(_0x3d5eb9('#macro-add-wheel-delta-input').val());
                } else {
                  if (_0x1a4828 == 0x404) {
                    _0x2ab34a.mouse_key_event = 0x200;
                    var _0xe6069e = Math.round(parseFloat(_0x3d5eb9('#macro-add-move-delta-x-input').val()) * 0xa) + 0x7ff;
                    var _0x5e53da = Math.round(parseFloat(_0x3d5eb9("#macro-add-move-delta-y-input").val()) * 0xa) + 0x7ff;
                    _0x2ab34a.mouse_key_code = _0xe6069e << 0x10 | _0x5e53da;
                    _0x2ab34a.mouse_key_loop = parseInt(_0x3d5eb9('#macro-add-move-loop-input').val());
                    if (_0x2ab34a.mouse_key_loop <= 0x0) {
                      _0x2ab34a.mouse_key_loop = 0x1;
                    }
                  } else {
                    if (_0x1a4828 == 0x405) {
                      _0x2ab34a.mouse_key_event = 0x2ff;
                      var _0x29fbcf = parseInt(_0x3d5eb9("#macro-add-position-x-input").val());
                      var _0x4a5bff = parseInt(_0x3d5eb9('#macro-add-position-y-input').val());
                      var _0xd36baf = window.screen.width;
                      var _0xcd8e2f = window.screen.height;
                      _0x29fbcf = parseInt((_0x29fbcf + 0.9) * 0xffff / _0xd36baf);
                      _0x4a5bff = parseInt((_0x4a5bff + 0.9) * 0xffff / _0xcd8e2f);
                      _0x2ab34a.mouse_key_code = _0x29fbcf << 0x10 | _0x4a5bff;
                    } else {
                      _0x2ab34a.mouse_key_code = _0x1a4828;
                      if (_0x3d5eb9("[name=\"mapping-macro-action-key-event\"]")[0x0].checked) {
                        _0x2ab34a.mouse_key_event = 0x100;
                      } else if (_0x3d5eb9("[name=\"mapping-macro-action-key-event\"]")[0x1].checked) {
                        _0x2ab34a.mouse_key_event = 0x101;
                      } else {
                        _0x2ab34a.mouse_key_event = 0x0;
                      }
                    }
                  }
                }
              }
            }
          }
          _0x2ab34a.mouse_key_time = current_edit_macro.mouse_key_time;
          _0x2ab34a.name = get_key_name_from_code(_0x1a4828);
          edit_macros.splice(macro_edit_index, 0x0, _0x2ab34a);
          ui_refresh_mapping_macro_edit(current_usb_client);
        },
        'btn3': function () {
          _0x2a0d7b.closeLast(0x0);
          current_edit_macro.style = 0x16;
          var _0x2e0501 = macro_keys[parseInt(_0x3d5eb9("[name=\"macro-add-select-key\"]").val())].vCode;
          if (current_usb_client != undefined ? is_hs_keyboard(current_usb_client.device) : false) {
            _0x2e0501 = get_key_code_from_name(document.getElementById('kbd-macro-add-select-key').textContent);
          }
          if (_0x2e0501 == 0x401) {
            current_edit_macro.mouse_key_event = 0x20a;
            current_edit_macro.mouse_key_code = -parseInt(_0x3d5eb9("#macro-add-wheel-delta-input").val());
          } else {
            if (_0x2e0501 == 0x400) {
              current_edit_macro.mouse_key_event = 0x20a;
              current_edit_macro.mouse_key_code = parseInt(_0x3d5eb9("#macro-add-wheel-delta-input").val());
            } else {
              if (_0x2e0501 == 0x402) {
                current_edit_macro.mouse_key_event = 0x20e;
                current_edit_macro.mouse_key_code = -parseInt(_0x3d5eb9("#macro-add-wheel-delta-input").val());
              } else {
                if (_0x2e0501 == 0x403) {
                  current_edit_macro.mouse_key_event = 0x20e;
                  current_edit_macro.mouse_key_code = parseInt(_0x3d5eb9("#macro-add-wheel-delta-input").val());
                } else {
                  if (_0x2e0501 == 0x404) {
                    current_edit_macro.mouse_key_event = 0x200;
                    var _0x3485a6 = Math.round(parseFloat(_0x3d5eb9("#macro-add-move-delta-x-input").val()) * 0xa) + 0x7ff;
                    var _0x248b67 = Math.round(parseFloat(_0x3d5eb9("#macro-add-move-delta-y-input").val()) * 0xa) + 0x7ff;
                    current_edit_macro.mouse_key_code = _0x3485a6 << 0x10 | _0x248b67;
                    current_edit_macro.mouse_key_loop = parseInt(_0x3d5eb9('#macro-add-move-loop-input').val());
                    if (current_edit_macro.mouse_key_loop <= 0x0) {
                      current_edit_macro.mouse_key_loop = 0x1;
                    }
                  } else {
                    if (_0x2e0501 == 0x405) {
                      current_edit_macro.mouse_key_event = 0x2ff;
                      var _0x5c5c9b = parseInt(_0x3d5eb9("#macro-add-position-x-input").val());
                      var _0x52b229 = parseInt(_0x3d5eb9('#macro-add-position-y-input').val());
                      var _0x3f8898 = window.screen.width;
                      var _0xd15f98 = window.screen.height;
                      _0x5c5c9b = parseInt((_0x5c5c9b + 0.9) * 0xffff / _0x3f8898);
                      _0x52b229 = parseInt((_0x52b229 + 0.9) * 0xffff / _0xd15f98);
                      current_edit_macro.mouse_key_code = _0x5c5c9b << 0x10 | _0x52b229;
                    } else {
                      current_edit_macro.mouse_key_code = _0x2e0501;
                      if (_0x3d5eb9("[name=\"mapping-macro-action-key-event\"]")[0x0].checked) {
                        current_edit_macro.mouse_key_event = 0x100;
                      } else if (_0x3d5eb9("[name=\"mapping-macro-action-key-event\"]")[0x1].checked) {
                        current_edit_macro.mouse_key_event = 0x101;
                      } else {
                        current_edit_macro.mouse_key_event = 0x0;
                      }
                    }
                  }
                }
              }
            }
          }
          current_edit_macro.name = get_key_name_from_code(_0x2e0501);
          if (current_edit_macro.mouse_key_time == 0x0 && current_edit_macro.mouse_key_code > 0x0) {
            current_edit_macro.mouse_key_time = 0x1;
          }
          if (macro_edit_index < 0x0) {
            edit_macros.push(current_edit_macro);
          } else {
            edit_macros[macro_edit_index] = current_edit_macro;
          }
          ui_refresh_mapping_macro_edit(current_usb_client);
        }
      });
    }
  });
  _0x3f4986.on('mapping-macro-edit-action', {
    'edit': async function () {
      var _0x5bf662 = get_select_key_info();
      if (Object.keys(_0x5bf662).length == 0x0) {
        return;
      }
      edit_macros = [];
      _0x5bf662.macroKeys.forEach(_0x2754be => {
        edit_macros.push(clone_macro_info(_0x2754be));
      });
      ui_refresh_mapping_macro_edit(current_usb_client);
      macro_edit_panel_id = _0x2a0d7b.open({
        'type': 0x1,
        'title': _0x542cd7.prop('STRID_SETTING_MAPPING_MACRO_EDIT'),
        'skin': 'layui-layer-confirm',
        'btn': [_0x542cd7.prop('STRID_SETTING_MAPPING_MACRO_RECORD'), _0x542cd7.prop("STRID_SETTING_MAPPING_MACRO_ACTION_ADD_S"), _0x542cd7.prop("STRID_CLEAR"), _0x542cd7.prop("STRID_SAVE")],
        'btnAlign': 'c',
        'content': _0x3d5eb9("#setting-mapping-macro-edit-panel"),
        'btn1': function () {
          var _0x188eb2 = false;
          setting_macro_edit_recording = false;
          setting_macro_edit_recording_time = -0x1;
          document.oncontextmenu = function (_0x1d520b) {
            _0x1d520b.preventDefault();
          };
          macro_record_panel_id = _0x2a0d7b.open({
            'type': 0x1,
            'title': _0x542cd7.prop("STRID_SETTING_MAPPING_MACRO_RECORD_TITLE"),
            'skin': "layui-layer-confirm",
            'content': _0x3d5eb9("#setting-mapping-macro-record-panel"),
            'btn': [_0x542cd7.prop("STRID_SETTING_FACTORY_START")],
            'btnAlign': 'c',
            'btn1': function () {
              if (!_0x188eb2) {
                _0x188eb2 = true;
                setting_macro_edit_recording = true;
                var _0x3369a0 = _0x3d5eb9('#layui-layer' + macro_record_panel_id + " .layui-layer-btn .layui-layer-btn0");
                _0x3369a0.html(_0x542cd7.prop("STRID_DONE"));
                _0x3d5eb9('#macro-record-waiting-info').css("display", '');
                _0x3d5eb9("#macro-record-fixed-time-container").css("display", "none");
                return false;
              } else {
                if (record_mouse_key_delay_timer_id != undefined) {
                  clearTimeout(record_mouse_key_delay_timer_id);
                  record_mouse_key_delay_timer_id = undefined;
                }
                _0x2a0d7b.closeLast(0x0);
                setting_macro_edit_recording = false;
                document.oncontextmenu = null;
                _0x3d5eb9("#macro-record-waiting-info").css('display', "none");
                _0x3d5eb9("#macro-record-fixed-time-container").css('display', '');
              }
            },
            'cancel': function (_0x124531, _0x352889, _0x487edf) {
              if (_0x188eb2) {
                if (record_mouse_key_delay_timer_id != undefined) {
                  clearTimeout(record_mouse_key_delay_timer_id);
                  record_mouse_key_delay_timer_id = undefined;
                }
                setting_macro_edit_recording = false;
                document.oncontextmenu = null;
              }
              return true;
            },
            'end': function () {
              if (_0x188eb2) {
                setting_mapping_macro_recording_remove_last();
                if (record_mouse_key_delay_timer_id != undefined) {
                  clearTimeout(record_mouse_key_delay_timer_id);
                  record_mouse_key_delay_timer_id = undefined;
                }
                setting_macro_edit_recording = false;
                document.oncontextmenu = null;
                macro_record_panel_id = undefined;
              }
            }
          });
          return false;
        },
        'btn2': function () {
          macro_keep_time_min = 0x0;
          macro_edit_index = -0x1;
          current_edit_macro = create_macro_info();
          ui_refresh_mapping_macro_add(current_usb_client);
          _0x2a0d7b.open({
            'type': 0x1,
            'title': _0x542cd7.prop("STRID_SETTING_MAPPING_MACRO_ACTION_ADD"),
            'skin': "layui-layer-confirm",
            'content': _0x3d5eb9("#setting-mapping-macro-add-panel"),
            'btn': [_0x542cd7.prop("STRID_SAVE")],
            'btnAlign': 'c',
            'btn1': function () {
              _0x2a0d7b.closeLast(0x0);
              current_edit_macro.style = 0x16;
              var _0x2ab7b8 = macro_keys[parseInt(_0x3d5eb9("[name=\"macro-add-select-key\"]").val())].vCode;
              if (_0x2ab7b8 == 0x401) {
                current_edit_macro.mouse_key_event = 0x20a;
                current_edit_macro.mouse_key_code = -parseInt(_0x3d5eb9("#macro-add-wheel-delta-input").val());
              } else {
                if (_0x2ab7b8 == 0x400) {
                  current_edit_macro.mouse_key_event = 0x20a;
                  current_edit_macro.mouse_key_code = parseInt(_0x3d5eb9("#macro-add-wheel-delta-input").val());
                } else {
                  if (_0x2ab7b8 == 0x402) {
                    current_edit_macro.mouse_key_event = 0x20e;
                    current_edit_macro.mouse_key_code = -parseInt(_0x3d5eb9("#macro-add-wheel-delta-input").val());
                  } else {
                    if (_0x2ab7b8 == 0x403) {
                      current_edit_macro.mouse_key_event = 0x20e;
                      current_edit_macro.mouse_key_code = parseInt(_0x3d5eb9("#macro-add-wheel-delta-input").val());
                    } else {
                      if (_0x2ab7b8 == 0x404) {
                        current_edit_macro.mouse_key_event = 0x200;
                        var _0x4cd387 = Math.round(parseFloat(_0x3d5eb9("#macro-add-move-delta-x-input").val()) * 0xa) + 0x7ff;
                        var _0x33cc19 = Math.round(parseFloat(_0x3d5eb9("#macro-add-move-delta-y-input").val()) * 0xa) + 0x7ff;
                        current_edit_macro.mouse_key_code = _0x4cd387 << 0x10 | _0x33cc19;
                        current_edit_macro.mouse_key_loop = parseInt(_0x3d5eb9("#macro-add-move-loop-input").val());
                        if (current_edit_macro.mouse_key_loop <= 0x0) {
                          current_edit_macro.mouse_key_loop = 0x1;
                        }
                      } else {
                        if (_0x2ab7b8 == 0x405) {
                          current_edit_macro.mouse_key_event = 0x2ff;
                          var _0x32ea6c = parseInt(_0x3d5eb9("#macro-add-position-x-input").val());
                          var _0x2f7270 = parseInt(_0x3d5eb9("#macro-add-position-y-input").val());
                          var _0x25eabd = window.screen.width;
                          var _0x221045 = window.screen.height;
                          _0x32ea6c = parseInt((_0x32ea6c + 0.9) * 0xffff / _0x25eabd);
                          _0x2f7270 = parseInt((_0x2f7270 + 0.9) * 0xffff / _0x221045);
                          current_edit_macro.mouse_key_code = _0x32ea6c << 0x10 | _0x2f7270;
                        } else {
                          current_edit_macro.mouse_key_code = _0x2ab7b8;
                          if (_0x3d5eb9("[name=\"mapping-macro-action-key-event\"]")[0x0].checked) {
                            current_edit_macro.mouse_key_event = 0x100;
                          } else if (_0x3d5eb9("[name=\"mapping-macro-action-key-event\"]")[0x1].checked) {
                            current_edit_macro.mouse_key_event = 0x101;
                          } else {
                            current_edit_macro.mouse_key_event = 0x0;
                          }
                        }
                      }
                    }
                  }
                }
              }
              current_edit_macro.name = get_key_name_from_code(_0x2ab7b8);
              if (current_edit_macro.mouse_key_time == 0x0 && current_edit_macro.mouse_key_code > 0x0) {
                current_edit_macro.mouse_key_time = 0x1;
              }
              if (macro_edit_index < 0x0) {
                edit_macros.push(current_edit_macro);
              } else {
                edit_macros[macro_edit_index] = current_edit_macro;
              }
              ui_refresh_mapping_macro_edit(current_usb_client);
            }
          });
          return false;
        },
        'btn3': function () {
          edit_macros = [];
          ui_refresh_mapping_macro_edit(current_usb_client);
          return false;
        },
        'btn4': function () {
          _0x2a0d7b.closeLast(0x0);
          _0x5bf662.macroKeys = edit_macros;
          ui_refresh_tab_mapping_macro(current_usb_client);
          need_save = true;
          ui_refresh_onboard_config(current_usb_client);
        },
        'end': function () {
          macro_edit_panel_id = undefined;
        }
      });
    }
  });
  _0x1435f3.on('select(macro-add-select-key)', function (_0x3a7672) {
    var _0x1c380a = _0x3a7672.elem;
    var _0xe8f80d = _0x1c380a.value;
    var _0x4d6a02 = macro_keys[_0xe8f80d].vCode;
    if (_0x4d6a02 == 0x0) {
      current_edit_macro.mouse_key_code = 0x0;
      current_edit_macro.mouse_key_event = 0x0;
      current_edit_macro.mouse_key_time = 0x0;
    } else {
      if (_0x4d6a02 == 0x401) {
        current_edit_macro.mouse_key_event = 0x20a;
        current_edit_macro.mouse_key_code = -0x1;
      } else {
        if (_0x4d6a02 == 0x400) {
          current_edit_macro.mouse_key_event = 0x20a;
          current_edit_macro.mouse_key_code = 0x1;
        } else {
          if (_0x4d6a02 == 0x403) {
            current_edit_macro.mouse_key_event = 0x20e;
            current_edit_macro.mouse_key_code = 0x1;
          } else {
            if (_0x4d6a02 == 0x402) {
              current_edit_macro.mouse_key_event = 0x20e;
              current_edit_macro.mouse_key_code = -0x1;
            } else {
              if (_0x4d6a02 == 0x404) {
                current_edit_macro.mouse_key_event = 0x200;
                current_edit_macro.mouse_key_code = 134154239;
                current_edit_macro.mouse_key_loop = 0x1;
              } else {
                if (_0x4d6a02 == 0x405) {
                  current_edit_macro.mouse_key_event = 0x2ff;
                  current_edit_macro.mouse_key_code = 0x0;
                } else {
                  current_edit_macro.mouse_key_code = _0x4d6a02;
                  var _0x42d576 = 0x0;
                  var _0x2b6ce9 = 0x0;
                  for (var _0x1eb3d2 = 0x0; _0x1eb3d2 < edit_macros.length; _0x1eb3d2++) {
                    if (edit_macros[_0x1eb3d2].mouse_key_code == _0x4d6a02) {
                      if (edit_macros[_0x1eb3d2].mouse_key_event == 0x100) {
                        _0x42d576++;
                      } else if (edit_macros[_0x1eb3d2].mouse_key_event == 0x101) {
                        _0x2b6ce9++;
                      }
                    }
                  }
                  current_edit_macro.mouse_key_event = _0x42d576 > _0x2b6ce9 ? 0x101 : 0x100;
                  current_edit_macro.mouse_key_time = 0x64;
                }
              }
            }
          }
        }
      }
    }
    ui_refresh_mapping_macro_add(current_usb_client);
  });
  _0x3f4986.on('mapping-macro-more-keep-time-action', {
    'edit': async function () {
      macro_keep_time_min += 0x1f4;
      current_edit_macro.mouse_key_time += 0x1f4;
      ui_refresh_mapping_macro_add(current_usb_client);
    }
  });
  _0x3f4986.on("mapping-macro-less-keep-time-action", {
    'edit': async function () {
      macro_keep_time_min -= 0x1f4;
      if (macro_keep_time_min >= 0x0) {
        current_edit_macro.mouse_key_time -= 0x1f4;
      } else {
        macro_keep_time_min = 0x0;
      }
      ui_refresh_mapping_macro_add(current_usb_client);
    }
  });
  _0x1435f3.on('input-affix(macro-add-wheel-delta-input)', function (_0x47c20a) {
    document.getElementById("macro-add-wheel-delta-input").dispatchEvent(new Event("input", {
      'bubbles': true
    }));
  });
  _0x3d5eb9("#macro-add-wheel-delta-input").on('input', function (_0x3658c8) {
    var _0x489b3c = _0x3658c8.delegateTarget.value;
    var _0x24521e = _0x489b3c.length == 0x0 ? 0x0 : parseInt(_0x489b3c);
    if (_0x24521e < 0x0) {
      _0x24521e = 0x0;
    }
    current_edit_macro.mouse_key_code = _0x24521e;
    ui_refresh_mapping_macro_add(current_usb_client);
  });
  _0x1435f3.on("select(mapping-macro-trigger-type)", function (_0x34dea2) {
    var _0x4822da = _0x34dea2.elem;
    var _0x76b921 = _0x4822da.value;
    var _0x2cdc05 = get_select_key_info();
    if (Object.keys(_0x2cdc05).length == 0x0) {
      return;
    }
    if (macro_trigger_type_index != _0x76b921) {
      var _0x38968e = macro_trigger_type_index;
      macro_trigger_type_index = _0x76b921;
      _0x2cdc05 = get_select_key_info();
      if (Object.keys(_0x2cdc05).length != 0x0) {
        _0x2cdc05.configType = 0x5;
        _0x2cdc05.macro_style = macro_trigger_type_index;
      }
      if (macro_trigger_type_index == 0x6) {
        if (_0x2cdc05.macro_endKey == 0x0) {
          var _0x49b77f = _0x2cdc05.label.split('+');
          var _0x3e2b39 = _0x49b77f[_0x49b77f.length - 0x1];
          for (var _0x5f50d2 = 0x0; _0x5f50d2 < mouse_key_labels.length; _0x5f50d2++) {
            if (mouse_key_labels[_0x5f50d2] == _0x3e2b39) {
              _0x3d5eb9("[name=\"mapping-macro-stop-key\"]").val(_0x5f50d2);
              _0x2cdc05.macro_endKey = get_key_id_from_name(_0x2cdc05.name);
              break;
            }
          }
        } else {
          for (var _0x5f50d2 = 0x0; _0x5f50d2 < mouse_key_labels.length; _0x5f50d2++) {
            var _0x430175 = get_key_name_from_label(mouse_key_labels[_0x5f50d2]);
            var _0x39a7b8 = get_key_id_from_name(_0x430175);
            if (_0x2cdc05.macro_endKey == _0x39a7b8) {
              _0x3d5eb9("[name=\"mapping-macro-stop-key\"]").val(_0x5f50d2);
              break;
            }
          }
        }
      } else {
        if (_0x38968e == 0x6) {
          if (_0x2cdc05.macro_endKey != 0x0) {
            _0x3d5eb9("[name=\"mapping-macro-stop-key\"]").val(0x0);
            var _0x430175 = get_key_name_from_label(mouse_key_labels[0x0]);
            var _0x39a7b8 = get_key_id_from_name(_0x430175);
            _0x2cdc05.macro_endKey = _0x39a7b8;
          }
        }
      }
      ui_refresh_tab_mapping_macro(current_usb_client);
    }
  });
  _0x1435f3.on("select(mapping-macro-trigger-key)", function (_0x3a6bba) {
    var _0x3946e9 = _0x3a6bba.elem;
    var _0x403fc5 = _0x3946e9.value;
    var _0x57fdc1 = get_select_key_info();
    if (Object.keys(_0x57fdc1).length == 0x0) {
      return;
    }
    var _0x27e3e5 = mouse_key_labels[_0x403fc5];
    var _0x25ed43 = get_key_name_from_label(_0x27e3e5);
    var _0x4baed1 = get_key_id_from_name(_0x25ed43);
    if (_0x57fdc1.macro_toggleKey != _0x4baed1) {
      _0x57fdc1.macro_toggleKey = _0x4baed1;
      need_save = true;
      ui_refresh_onboard_config(current_usb_client);
    }
  });
  _0x1435f3.on('select(mapping-macro-stop-key)', function (_0xf4fe94) {
    var _0x53073d = _0xf4fe94.elem;
    var _0x37ad0a = _0x53073d.value;
    var _0x594668 = get_select_key_info();
    if (Object.keys(_0x594668).length == 0x0) {
      return;
    }
    var _0x268881 = get_key_name_from_label(mouse_key_labels[_0x37ad0a]);
    var _0x4ec9af = get_key_id_from_name(_0x268881);
    if (_0x594668.macro_endKey != _0x4ec9af) {
      _0x594668.macro_endKey = _0x4ec9af;
      need_save = true;
      ui_refresh_onboard_config(current_usb_client);
      if (macro_trigger_type_index == 0x6) {
        if (_0x594668.macro_endKey == 0x0) {
          var _0x205f6c = _0x594668.label.split('+');
          var _0x762035 = _0x205f6c[_0x205f6c.length - 0x1];
          for (var _0x5aff9a = 0x0; _0x5aff9a < mouse_key_labels.length; _0x5aff9a++) {
            if (mouse_key_labels[_0x5aff9a] == _0x762035) {
              _0x3d5eb9("[name=\"mapping-macro-stop-key\"]").val(_0x5aff9a);
              layui.form.render("select");
              _0x594668.macro_endKey = get_key_id_from_name(_0x594668.name);
              _0x2a0d7b.msg(layui.i18np.prop("STRID_SETTING_MAPPING_MACRO_TRIGGER_TOGGLE_LOOP_WARNING"), {
                'icon': 0x0
              }, function () {});
              break;
            }
          }
        }
      }
    }
  });
  _0x3f4986.on("mapping-apply-and-onboard-action", {
    'apply': async function () {
      if (!editing) {
        return;
      }
      var _0xe6fa69 = layui.layer;
      var _0x17d9f0 = layui.i18np;
      var _0x5284f6 = 0x0;
      var _0x1a4522 = false;
      onboard_keys.forEach(_0x1b1fb6 => {
        if (_0x1b1fb6.configType == 0x0 && _0x1b1fb6.touch_style == 0x1b && get_key_id_by_name(current_usb_client, _0x1b1fb6.name).length == 0x1 && _0x1b1fb6.mouse_mapping_keys == "[0,0,256]") {
          _0x5284f6++;
        }
        if (_0x1b1fb6.configType >= 0x0 && _0x1b1fb6.name == 'M1') {
          _0x1a4522 = true;
        }
      });
      if (!_0x1a4522) {
        _0x5284f6++;
      }
      if (_0x5284f6 == 0x0) {
        _0xe6fa69.confirm(_0x17d9f0.prop('STRID_SETTING_MAPPING_NOT_SUPPORTED'), {
          'title': _0x17d9f0.prop('STRID_SETTING_MAPPING_SAVE_AND_APPLY'),
          'skin': "layui-layer-confirm",
          'btn': [_0x17d9f0.prop("STRING_CANCEL")],
          'btnAlign': 'c',
          'btn1': function () {
            _0xe6fa69.closeLast(0x0);
          }
        });
        return;
      }
      for (var _0xbfa381 = 0x0; _0xbfa381 < onboard_keys.length; _0xbfa381++) {
        if (onboard_keys[_0xbfa381].configType != 0x5) {
          for (var _0x12ae5d = onboard_keys.length - 0x1; _0x12ae5d > _0xbfa381; _0x12ae5d--) {
            if (onboard_keys[_0x12ae5d].configType == onboard_keys[_0xbfa381].configType && onboard_keys[_0x12ae5d].name == onboard_keys[_0xbfa381].name) {
              onboard_keys.splice(_0x12ae5d, 0x1);
            }
          }
        }
      }
      _0xe6fa69.confirm(_0x17d9f0.prop('STRID_SETTING_MAPPING_SAVE_TO_FDS_CONFIRM'), {
        'title': _0x17d9f0.prop("STRID_SETTING_MAPPING_APPLY_AND_ONBOARD"),
        'skin': 'layui-layer-confirm',
        'btn': [_0x17d9f0.prop("STRING_CANCEL"), _0x17d9f0.prop('STRID_SETTING_MAPPING_SAVE_TO_FDS_S'), _0x17d9f0.prop("STRID_SETTING_MAPPING_NOT_SAVE_TO_FDS_S")],
        'btnAlign': 'c',
        'btn1': function () {
          _0xe6fa69.closeLast(0x0);
        },
        'btn2': function () {
          _0xe6fa69.closeLast(0x0);
          var _0x4acebe = (onboard_status[onboard_config_index] & 0x80) != 0x0;
          var _0x3a3d2c = [];
          if (_0x4acebe) {
            for (var _0x572f88 = 0x0; _0x572f88 < onboard_keys.length; _0x572f88++) {
              var _0x14b588 = onboard_keys[_0x572f88];
              if (_0x14b588.configType == 0x0 && _0x14b588.touch_style == 0x1d && (_0x14b588.mouse_mapping_function == 0x11 || _0x14b588.mouse_mapping_function == 0x12 || _0x14b588.mouse_mapping_function == 0x13)) {
                for (var _0x589e9b = 0x0; _0x589e9b < onboard_configs.length; _0x589e9b++) {
                  if (_0x589e9b != onboard_config_index) {
                    _0x4acebe = (onboard_status[_0x589e9b] & 0x80) != 0x0;
                    if (_0x4acebe) {
                      var _0x4871a9 = false;
                      var _0x40d5e7 = onboard_configs[_0x589e9b];
                      for (var _0x3ba151 = 0x0; _0x3ba151 < _0x40d5e7.length; _0x3ba151++) {
                        var _0x595ffb = _0x40d5e7[_0x3ba151];
                        if (_0x595ffb.configType == 0x0 && _0x595ffb.touch_style == 0x1d && (_0x595ffb.mouse_mapping_function == 0x11 || _0x595ffb.mouse_mapping_function == 0x12 || _0x595ffb.mouse_mapping_function == 0x13)) {
                          _0x4871a9 = true;
                          break;
                        }
                      }
                      if (!_0x4871a9) {
                        var _0x91e812 = false;
                        for (var _0x3ba151 = 0x0; _0x3ba151 < _0x40d5e7.length; _0x3ba151++) {
                          var _0x595ffb = _0x40d5e7[_0x3ba151];
                          if (_0x595ffb.name == _0x14b588.name) {
                            if (_0x14b588.configType != _0x595ffb.configType || _0x14b588.touch_style != _0x595ffb.touch_style || _0x14b588.mouse_mapping_function != _0x595ffb.mouse_mapping_function) {
                              _0x595ffb.configType = _0x14b588.configType;
                              _0x595ffb.touch_style = _0x14b588.touch_style;
                              _0x595ffb.mouse_mapping_function = _0x14b588.mouse_mapping_function;
                              _0x3a3d2c.push(_0x589e9b);
                            }
                            _0x91e812 = true;
                          }
                        }
                        if (!_0x91e812) {
                          var _0x595ffb = JSON.parse(JSON.stringify(_0x14b588));
                          _0x40d5e7.push(_0x595ffb);
                          _0x3a3d2c.push(_0x589e9b);
                        }
                      }
                    }
                  }
                }
              }
            }
            for (var _0x589e9b = 0x0; _0x589e9b < onboard_configs.length; _0x589e9b++) {
              var _0x40d5e7 = onboard_configs[_0x589e9b];
              for (var _0x3ba151 = 0x0; _0x3ba151 < _0x3a3d2c.length; _0x3ba151++) {
                if (_0x589e9b == _0x3a3d2c[_0x3ba151]) {
                  send_event_config_reset(current_usb_client);
                  var _0x15d42d = 0x1 | _0x589e9b << 0x8;
                  send_event_action(current_usb_client, 0x34, _0x15d42d);
                  _0x40d5e7.forEach(_0x2b7d33 => {
                    write_mouse_param(current_usb_client, _0x2b7d33);
                  });
                  send_event_action(current_usb_client, 0x34, 256);
                }
              }
            }
          }
          send_event_config_reset(current_usb_client);
          var _0x15d42d = 0x1 | onboard_config_index << 0x8;
          send_event_action(current_usb_client, 0x34, _0x15d42d);
          onboard_keys.forEach(_0x5dd6cb => {
            write_mouse_param(current_usb_client, _0x5dd6cb);
          });
          send_event_action(current_usb_client, 0x34, 0x0);
          need_save = false;
          ui_refresh_onboard_config(current_usb_client);
        },
        'btn3': function () {
          _0xe6fa69.closeLast(0x0);
          send_event_config_reset(current_usb_client);
          onboard_keys.forEach(_0x1d6ca6 => {
            write_mouse_param(current_usb_client, _0x1d6ca6);
          });
          need_save = false;
          ui_refresh_onboard_config(current_usb_client);
        }
      });
    }
  });
  _0x3f4986.on('factory-reset-action', {
    'apply': async function () {
      _0x2a0d7b.open({
        'type': 0x1,
        'title': _0x542cd7.prop("STRID_TITLE_WARNING"),
        'skin': "layui-layer-confirm",
        'content': _0x3d5eb9("#factory-reset-panel"),
        'btn': [_0x542cd7.prop('STRID_SETTING_FACTORY_RESET_S'), _0x542cd7.prop("STRID_BUTTON_CANCEL")],
        'btnAlign': 'c',
        'btn1': function () {
          _0x2a0d7b.closeLast(0x0);
          send_event_factory_reset(current_usb_client, _0x3d5eb9("[name=\"factory-reset-esb\"]")[0x0].checked);
        },
        'btn2': function () {
          _0x2a0d7b.closeLast(0x0);
        }
      });
    }
  });
  _0x3f4986.on("mapping-key-action", {
    'record': async function () {
      key_record_panel_id = _0x2a0d7b.open({
        'type': 0x1,
        'title': _0x542cd7.prop("STRID_SETTING_MAPPING_KEY_RECORD_TITLE"),
        'skin': "layui-layer-confirm",
        'btn': [_0x542cd7.prop("STRID_SETTING_MAPPING_KEY_RECORD_RESET"), _0x542cd7.prop("STRID_DONE")],
        'btnAlign': 'c',
        'content': _0x3d5eb9("#record-mapping-key-panel"),
        'btn1': function () {
          if (record_mouse_key_delay_timer_id != undefined) {
            clearTimeout(record_mouse_key_delay_timer_id);
            record_mouse_key_delay_timer_id = undefined;
          }
          setting_mapping_keys_recorded = [-0x1, -0x1, -0x1];
          refresh_recorded_mapping_keys();
        },
        'btn2': function () {
          if (record_mouse_key_delay_timer_id != undefined) {
            clearTimeout(record_mouse_key_delay_timer_id);
            record_mouse_key_delay_timer_id = undefined;
          }
          _0x2a0d7b.closeLast(0x0);
          if (setting_mapping_keys_recorded[0x0] > 0x0 || setting_mapping_keys_recorded[0x1] > 0x0 || setting_mapping_keys_recorded[0x2] > 0x0) {
            var _0x30ba24 = modifiers;
            var _0x19f4c8 = keys;
            _0x3d5eb9("[name=\"mapping-ctrl-key1\"]").val(0x0);
            for (var _0xe1e4db = 0x0; _0xe1e4db < _0x30ba24.length; _0xe1e4db++) {
              if (setting_mapping_keys_recorded[0x0] == _0x30ba24[_0xe1e4db].vCode) {
                _0x3d5eb9("[name=\"mapping-ctrl-key1\"]").val(_0xe1e4db);
                break;
              }
            }
            _0x3d5eb9("[name=\"mapping-ctrl-key2\"]").val(0x0);
            for (var _0xe1e4db = 0x0; _0xe1e4db < _0x30ba24.length; _0xe1e4db++) {
              if (setting_mapping_keys_recorded[0x1] == _0x30ba24[_0xe1e4db].vCode) {
                _0x3d5eb9("[name=\"mapping-ctrl-key2\"]").val(_0xe1e4db);
                break;
              }
            }
            _0x3d5eb9("[name=\"mapping-key\"]").val(0x0);
            for (var _0xe1e4db = 0x0; _0xe1e4db < _0x19f4c8.length; _0xe1e4db++) {
              if (setting_mapping_keys_recorded[0x2] == _0x19f4c8[_0xe1e4db].vCode) {
                _0x3d5eb9("[name=\"mapping-key\"]").val(_0xe1e4db);
                break;
              }
            }
            layui.form.render('select');
            set_mapping_keys(current_usb_client);
            ui_refresh_tab_mapping_key(current_usb_client);
          }
        },
        'cancel': function (_0x5aec63, _0xaf7bc, _0x47a57d) {
          if (record_mouse_key_delay_timer_id != undefined) {
            clearTimeout(record_mouse_key_delay_timer_id);
            record_mouse_key_delay_timer_id = undefined;
          }
          return true;
        },
        'end': function () {
          if (record_mouse_key_delay_timer_id != undefined) {
            clearTimeout(record_mouse_key_delay_timer_id);
            record_mouse_key_delay_timer_id = undefined;
          }
          setting_mapping_key_recording = false;
          document.oncontextmenu = null;
          key_record_panel_id = undefined;
        }
      });
      setting_mapping_key_recording = true;
      setting_mapping_keys_recorded = [-0x1, -0x1, -0x1];
      refresh_recorded_mapping_keys();
      document.oncontextmenu = function (_0x4361e6) {
        _0x4361e6.preventDefault();
      };
    }
  });
  _0x1435f3.on("select(key-delay-select-key)", function (_0x23a79a) {
    var _0x52f5ad = _0x23a79a.elem;
    var _0x561fe5 = _0x52f5ad.value;
    if (_0x561fe5 > 0x0) {
      ui_refresh_setting(current_usb_client);
    }
  });
  _0x3f4986.on("key-delay-action", {
    'click': async function () {
      _0x2a0d7b.open({
        'type': 0x1,
        'title': false,
        'skin': "layui-layer-confirm",
        'content': _0x3d5eb9("#key-delay-guide-panel")
      });
    }
  });
  _0x3f4986.on("wireless-optimize-action", {
    'click': async function () {
      _0x3d5eb9("#wireless-optimize-busy").text('');
      _0x2a0d7b.open({
        'type': 0x1,
        'title': _0x542cd7.prop("STRID_SETTING_FACTORY_TEST"),
        'skin': "layui-layer-confirm",
        'content': _0x3d5eb9("#wireless-optimize-panel"),
        'btn': [_0x542cd7.prop("STRING_CANCEL"), _0x542cd7.prop("STRID_SETTING_FACTORY_START")],
        'btnAlign': 'c',
        'btn1': function () {
          _0x2a0d7b.closeLast(0x0);
        },
        'btn2': function () {
          wireless_optimizing = true;
          send_event_action(current_usb_client, 0x40, 0x0);
          _0x3d5eb9("#wireless-optimize-busy").text(_0x542cd7.prop('STRID_SETTING_FACTORY_TESTING') + '1%');
          var _0xe4ceae = new Date();
          _0x3f4986.countdown({
            'date': _0xe4ceae.getTime() + 0x3a98,
            'now': _0xe4ceae,
            'clock': function (_0x17ad28, _0x2d7e35) {
              _0x3d5eb9('#wireless-optimize-busy').text(_0x542cd7.prop("STRID_SETTING_FACTORY_TESTING") + Math.round((0xf - _0x17ad28.s) * 0x64 / 0xf) + '%');
            },
            'done': function (_0x402909, _0x3d9c97) {
              setTimeout(() => {
                _0x2a0d7b.closeLast(0x0);
                wireless_optimizing = false;
                current_usb_client.esb_last_alive_time = new Date().getTime();
              }, 0x3e8);
            }
          });
          return false;
        }
      });
    }
  });
  _0x1435f3.on("radio(receiver-light-mode)", function (_0x12d4f7) {
    var _0x5e0f30 = _0x12d4f7.elem;
    var _0x5a53a8 = _0x5e0f30.checked;
    var _0x4e6b6b = _0x5e0f30.value;
    if (_0x5a53a8) {
      set_light(current_usb_receiver, _0x4e6b6b);
    }
  });
  _0x1435f3.on("radio(setting-fw-channel)", function (_0x33f630) {
    var _0x9a6112 = _0x33f630.elem;
    var _0x56135c = _0x9a6112.checked;
    var _0x15c9f6 = _0x9a6112.value;
    if (_0x56135c) {
      if ((current_usb_client.device_info != undefined && current_usb_client.device_info.revision != undefined && current_usb_client.device_info.revision.substr(0x0, 0x2) == 'G-') != (_0x15c9f6 == 0x1)) {
        _0x2a0d7b.confirm(_0x542cd7.prop("STRID_WEBHUB_GOM_REBOOT_NEEDED"), {
          'title': _0x542cd7.prop("STRID_SETTING_MOUSE_REBOOT"),
          'btn': [_0x542cd7.prop('STRID_SETTING_MOUSE_REBOOT_S'), _0x542cd7.prop('STRID_BUTTON_CANCEL')],
          'cancel': function (_0x575bc6, _0xd998a6, _0x16214b) {
            if (current_usb_client.device_info != undefined && current_usb_client.device_info.revision != undefined && current_usb_client.device_info.revision.substr(0x0, 0x2) == 'G-') {
              _0x3d5eb9("[name=\"setting-fw-channel\"]")[0x1].checked = true;
            } else {
              _0x3d5eb9("[name=\"setting-fw-channel\"]")[0x0].checked = true;
            }
            _0x3d5eb9("[name=\"setting-fw-channel\"]")[0x0].disabled = !current_usb_client.device_info.dynamicGOM;
            _0x3d5eb9("[name=\"setting-fw-channel\"]")[0x1].disabled = !current_usb_client.device_info.dynamicGOM;
            layui.form.render("radio");
            return true;
          }
        }, function () {
          _0x2a0d7b.closeLast(0x0);
          send_event_gaming_only(current_usb_client, _0x15c9f6 == 0x1);
          send_event_action(current_usb_client, 0x33, 0x0);
        }, function () {
          if (current_usb_client.device_info != undefined && current_usb_client.device_info.revision != undefined && current_usb_client.device_info.revision.substr(0x0, 0x2) == 'G-') {
            _0x3d5eb9("[name=\"setting-fw-channel\"]")[0x1].checked = true;
          } else {
            _0x3d5eb9("[name=\"setting-fw-channel\"]")[0x0].checked = true;
          }
          _0x3d5eb9("[name=\"setting-fw-channel\"]")[0x0].disabled = !current_usb_client.device_info.dynamicGOM;
          _0x3d5eb9("[name=\"setting-fw-channel\"]")[0x1].disabled = !current_usb_client.device_info.dynamicGOM;
          layui.form.render("radio");
        });
      }
    }
  });
  _0x1435f3.on('select(kbd_onboard-config)', function (_0x249e1d) {
    var _0x5706e7 = _0x249e1d.elem;
    var _0x28dba1 = _0x5706e7.value;
    if (current_usb_client.device_info.onboardIndex != _0x28dba1) {
      hs_set_onboard_index(current_usb_client, _0x28dba1);
      show_waiting();
    }
  });
  _0x57d7c7.on("tab(kbd-main-setting-type)", function (_0x39ea42) {
    var _0x4ebc71 = _0x39ea42.index;
    kbd_update_setting_tab(current_usb_client, _0x4ebc71);
  });
  _0x57d7c7.on("tab(kbd-setting-key-type)", function (_0x293aab) {
    var _0xf385aa = _0x293aab.index;
    kbd_update_key_setting_tab(current_usb_client, _0xf385aa);
  });
  _0x57d7c7.on("tab(kbd-setting-light-type)", function (_0x1131a1) {
    var _0x1f6021 = _0x1131a1.index;
    kbd_update_light_setting_tab(current_usb_client, _0x1f6021);
  });
  _0x57d7c7.on("tab(kbd-setting-advance-key-type)", function (_0x5b83ee) {
    var _0x3878ab = _0x5b83ee.index;
    kbd_update_advance_key_setting_tab(current_usb_client, _0x3878ab);
  });
  _0x3f4986.on("kbd-main-setting-action", {
    'select': async function () {
      var _0x556a65 = this.getAttribute('index');
      layui.element.tabChange('kbd-main-setting-type', _0x556a65);
    }
  });
  _0x1435f3.on('radio(kbd-key-layer)', function (_0x30ee2e) {
    var _0x1a0450 = _0x30ee2e.elem;
    var _0x5af328 = _0x1a0450.checked;
    var _0x4cbf24 = _0x1a0450.value;
    if (_0x5af328) {
      kbd_key_infos.splice(0x0, kbd_key_infos.length);
      kbd_layer_id = _0x4cbf24;
      var _0x5a92da = current_usb_client.device_info.kbd_key_infos;
      if (_0x4cbf24 == 0x1) {
        if (_0x5a92da.length >= kbd_key_num * 0x2 - 0x1) {
          for (var _0x256a1a = 0x0; _0x256a1a < kbd_key_num; _0x256a1a++) {
            var _0x5e3969 = _0x5a92da[_0x256a1a + kbd_key_num];
            kbd_key_infos.push(kbd_clone_pc_key_info(_0x5e3969));
          }
        }
      } else {
        if (_0x5a92da.length >= kbd_key_num) {
          for (var _0x256a1a = 0x0; _0x256a1a < kbd_key_num; _0x256a1a++) {
            var _0x5e3969 = _0x5a92da[_0x256a1a];
            kbd_key_infos.push(kbd_clone_pc_key_info(_0x5e3969));
          }
        }
      }
      kbd_key_matrix_index = -0x1;
      kbd_ui_refresh_key_desc(current_usb_client);
      kbd_ui_refresh_key_matrix(current_usb_client);
    }
  });
  _0x3f4986.on("kbd-key-matrix-action", {
    'select': async function () {
      var _0x4b1acb = this.getAttribute("kbd-key-matrix-index");
      kbd_key_matrix_index = Number(_0x4b1acb);
      kbd_select_keyId = 0x0;
      kbd_ui_refresh_key_desc(current_usb_client);
      kbd_ui_refresh_key_matrix(current_usb_client);
    }
  });
  _0x3f4986.on("kbd-macro-action", {
    'select': async function () {
      kbd_key_matrix_index = this.getAttribute("kbd-macro-index");
    }
  });
  _0x3f4986.on("kbd-key-default-action", {
    'select': async function () {
      if (kbd_key_matrix_index < 0x0) {
        return;
      }
      var _0x34732d = 0x0;
      if (kbd_layer_id == 0x0) {
        _0x34732d = kbd_keys[kbd_key_matrix_index].keyId;
      }
      var _0x5664ba = kbd_key_infos[kbd_key_matrix_index];
      _0x5664ba.keyId = _0x34732d;
      _0x5664ba.name = get_key_name_from_keyid(_0x5664ba.keyId);
      kbd_ui_refresh_key_desc(current_usb_client);
      kbd_ui_refresh_key_matrix(current_usb_client);
      hs_set_keycode(current_usb_client, kbd_layer_id, _0x5664ba.row, _0x5664ba.col, _0x5664ba.keyId);
    }
  });
  _0x3f4986.on('kbd-key-set-action', {
    'select': async function () {
      if (kbd_key_matrix_index < 0x0) {
        return;
      }
      if (kbd_select_keyId > 0x0) {
        var _0x3468f2 = kbd_key_infos[kbd_key_matrix_index];
        _0x3468f2.keyId = kbd_select_keyId;
        _0x3468f2.name = get_key_name_from_keyid(_0x3468f2.keyId);
        kbd_ui_refresh_key_desc(current_usb_client);
        kbd_ui_refresh_key_matrix(current_usb_client);
        kbd_select_keyId = 0x0;
        hs_set_keycode(current_usb_client, kbd_layer_id, _0x3468f2.row, _0x3468f2.col, _0x3468f2.keyId);
      }
    }
  });
  _0x3f4986.on("kbd-select-key-action", {
    'select': async function () {
      var _0x318a16 = this.getAttribute("kbd-select-key-index");
      var _0x290602 = kbd_select_keys;
      kbd_select_keyId = _0x290602[_0x318a16].keyId;
      kbd_ui_refresh_key_desc(current_usb_client);
      if (select_key_panel_id != undefined) {
        _0x2a0d7b.close(select_key_panel_id);
      }
    }
  });
  _0x3f4986.on('mouse-select-key-action', {
    'select': async function () {
      var _0x1f04c4 = this.getAttribute("mouse-select-key-index");
      var _0x55c699 = mouse_select_keys;
      kbd_select_keyId = _0x55c699[_0x1f04c4].keyId;
      kbd_ui_refresh_key_desc(current_usb_client);
      if (select_key_panel_id != undefined) {
        _0x2a0d7b.close(select_key_panel_id);
      }
    }
  });
  _0x3f4986.on("kbd-key-rgb-action", {
    'select': async function () {
      var _0x5c0015 = this.getAttribute('kbd-key-rgb-index');
      var _0x56a017 = kbd_rgb_keys;
      kbd_select_keyId = _0x56a017[_0x5c0015].keyId;
      kbd_ui_refresh_key_desc(current_usb_client);
    }
  });
  _0x3f4986.on("kbd-key-media-action", {
    'select': async function () {
      var _0x113168 = this.getAttribute("kbd-key-media-index");
      var _0x1ae7ac = kbd_media_keys;
      kbd_select_keyId = _0x1ae7ac[_0x113168].keyId;
      kbd_ui_refresh_key_desc(current_usb_client);
    }
  });
  _0x3f4986.on("kbd-key-windows-action", {
    'select': async function () {
      var _0x45af02 = this.getAttribute("kbd-key-windows-index");
      var _0x559e3a = kbd_windows_keys;
      kbd_select_keyId = _0x559e3a[_0x45af02].keyId;
      kbd_ui_refresh_key_desc(current_usb_client);
    }
  });
  _0x3f4986.on("kbd-key-switch-wasd-action", {
    'select': async function () {
      kbd_select_keyId = 0x9002;
      kbd_ui_refresh_key_desc(current_usb_client);
    }
  });
  _0x3f4986.on("kbd-key-switch-mac-mode-action", {
    'select': async function () {
      kbd_select_keyId = 0x9003;
      kbd_ui_refresh_key_desc(current_usb_client);
    }
  });
  _0x3f4986.on('kbd-light-action', {
    'select': async function () {
      var _0x270181 = this.getAttribute("value");
      if (_0x270181 == "WASD") {
        kbd_matrix_select_keys.splice(0x0, kbd_matrix_select_keys.length);
        for (let _0x4651f7 = 0x0; _0x4651f7 < kbd_key_infos.length; _0x4651f7++) {
          var _0x512900 = kbd_key_infos[_0x4651f7].name;
          if (_0x512900 == 'W' || _0x512900 == 'A' || _0x512900 == 'S' || _0x512900 == 'D') {
            kbd_matrix_select_keys.push(kbd_edit_info.keys[_0x4651f7]);
          }
          if (kbd_matrix_select_keys.length >= 0x4) {
            break;
          }
        }
      } else {
        if (_0x270181 == "ALL") {
          kbd_matrix_select_keys.splice(0x0, kbd_matrix_select_keys.length);
          for (let _0x71ed1b = 0x0; _0x71ed1b < kbd_key_infos.length; _0x71ed1b++) {
            kbd_matrix_select_keys.push(kbd_edit_info.keys[_0x71ed1b]);
          }
        } else {
          if (_0x270181 == "REVERSE") {
            var _0x5b31c5 = kbd_matrix_select_keys.slice();
            kbd_matrix_select_keys.splice(0x0, kbd_matrix_select_keys.length);
            for (let _0x2dad7a = 0x0; _0x2dad7a < kbd_key_infos.length; _0x2dad7a++) {
              var _0x133791 = false;
              for (let _0x569748 = 0x0; _0x569748 < _0x5b31c5.length; _0x569748++) {
                if (_0x5b31c5[_0x569748].row == kbd_key_infos[_0x2dad7a].row && _0x5b31c5[_0x569748].col == kbd_key_infos[_0x2dad7a].col) {
                  _0x133791 = true;
                  _0x5b31c5.splice(_0x569748, 0x1);
                  break;
                }
              }
              if (!_0x133791) {
                kbd_matrix_select_keys.push(kbd_edit_info.keys[_0x2dad7a]);
              }
            }
          } else if (_0x270181 == "CLEAR") {
            kbd_matrix_select_keys.splice(0x0, kbd_matrix_select_keys.length);
          }
        }
      }
      kbd_ui_refresh_light_matrix(current_usb_client);
      kbd_ui_refresh_light(current_usb_client);
      if (kbd_matrix_select_keys.length > 0x0) {
        _0x3d5eb9('#kbd-light-button-container').css("display", 'flex');
      } else {
        _0x3d5eb9('#kbd-light-button-container').css("display", 'none');
      }
    }
  });
  _0x3f4986.on("kbd-light-cancel-action", {
    'select': async function () {
      kbd_matrix_select_keys.splice(0x0, kbd_matrix_select_keys.length);
      kbd_ui_refresh_light_matrix(current_usb_client);
      _0x3d5eb9("#kbd-light-button-container").css("display", 'none');
    }
  });
  _0x3f4986.on('kbd-light-save-action', {
    'select': async function () {
      if (kbd_matrix_select_keys.length > 0x0) {
        for (let _0x1a325e = 0x0; _0x1a325e < kbd_matrix_select_keys.length; _0x1a325e++) {
          kbd_matrix_select_keys[_0x1a325e].hue = kbd_edit_info.hue;
          kbd_matrix_select_keys[_0x1a325e].sat = kbd_edit_info.sat;
        }
        show_waiting();
        hs_set_light_define_infos(current_usb_client, kbd_matrix_select_keys);
        kbd_matrix_select_keys.splice(0x0, kbd_matrix_select_keys.length);
        kbd_ui_refresh_light_matrix(current_usb_client);
        _0x3d5eb9("#kbd-light-button-container").css("display", "none");
      }
    }
  });
  _0x1435f3.on("select(kbd-light-mode)", function (_0x15b407) {
    var _0x26d8d5 = _0x15b407.elem;
    var _0x35c95c = _0x26d8d5.value;
    var _0xf75ac8 = kbd_light_mode[_0x35c95c].mode;
    if (kbd_edit_info.mode != _0xf75ac8) {
      kbd_edit_info.mode = _0xf75ac8;
      kbd_matrix_select_keys.splice(0x0, kbd_matrix_select_keys.length);
      hs_set_light(current_usb_client, 0x2, kbd_edit_info);
      kbd_ui_refresh_light_matrix(current_usb_client);
      kbd_ui_refresh_light(current_usb_client);
      _0x3d5eb9("#kbd-light-button-container").css("display", "none");
    }
  });
  _0x1435f3.on("select(kbd-light-box-mode)", function (_0x902c37) {
    var _0x369ab6 = _0x902c37.elem;
    var _0x3981eb = _0x369ab6.value;
    var _0x33ab31 = kbd_light_mode[_0x3981eb].mode;
    if (kbd_edit_info.light_box_info.mode != _0x33ab31) {
      kbd_edit_info.light_box_info.mode = _0x33ab31;
      hs_set_light_box(current_usb_client, kbd_edit_info.light_box_info);
    }
  });
  _0x1435f3.on("select(kbd-light-sleep-time)", function (_0x1e3a0) {
    var _0x13c3c6 = _0x1e3a0.elem;
    var _0x5d79d1 = _0x13c3c6.value;
    var _0x368f2a = kbd_sleep_time[_0x5d79d1].mode;
    if (kbd_edit_info.sleep_time != _0x368f2a) {
      kbd_edit_info.sleep_time = _0x368f2a;
      hs_set_light_sleep_time(current_usb_client, _0x368f2a);
    }
  });
  _0x1435f3.on("switch(kbd-light-box-colored)", function (_0xd397d0) {
    if (_0xd397d0.elem.checked) {
      kbd_edit_info.light_box_info.colored = 0x1;
    } else {
      kbd_edit_info.light_box_info.colored = 0x0;
    }
    hs_set_light_box(current_usb_client, kbd_edit_info.light_box_info);
  });
  document.getElementById("color-r-input").addEventListener("change", function (_0x53df4b) {
    if (_0x53df4b.target.value.length == 0x0) {
      _0x3d5eb9('#color-r-input').val(0x0);
    }
  });
  document.getElementById('color-g-input').addEventListener("change", function (_0x5cbf30) {
    if (_0x5cbf30.target.value.length == 0x0) {
      _0x3d5eb9('#color-g-input').val(0x0);
    }
  });
  document.getElementById("color-b-input").addEventListener('change', function (_0x576ada) {
    if (_0x576ada.target.value.length == 0x0) {
      _0x3d5eb9("#color-b-input").val(0x0);
    }
  });
  _0x3d5eb9("#color-r-input").on('input', function (_0x535bbc) {
    var _0x257477 = _0x535bbc.delegateTarget.value;
    var _0x3bca63 = parseInt(_0x257477);
    var _0x18e97a = parseInt(_0x3d5eb9("#color-g-input").val());
    var _0x2ab5e5 = parseInt(_0x3d5eb9("#color-b-input").val());
    if (isNaN(_0x3bca63) || _0x3bca63 < 0x0 || _0x3bca63 > 0xff) {
      _0x3bca63 = 0x0;
    }
    if (isNaN(_0x18e97a) || _0x18e97a < 0x0 || _0x18e97a > 0xff) {
      _0x18e97a = 0x0;
    }
    if (isNaN(_0x2ab5e5) || _0x2ab5e5 < 0x0 || _0x2ab5e5 > 0xff) {
      _0x2ab5e5 = 0x0;
    }
    document.getElementById("pick-color").value = rgbToHex(_0x3bca63, _0x18e97a, _0x2ab5e5);
    var _0x3c5040 = rgbToHsv(_0x3bca63, _0x18e97a, _0x2ab5e5);
    if (kbd_edit_info.hue != _0x3c5040.h || kbd_edit_info.sat != _0x3c5040.s) {
      kbd_edit_info.hue = _0x3c5040.h;
      kbd_edit_info.sat = _0x3c5040.s;
      if (kbd_edit_info.mode != 0x0 && kbd_edit_info.mode != 0x2d) {
        hs_set_light(current_usb_client, 0x4, kbd_edit_info);
      }
    }
  });
  _0x3d5eb9('#color-g-input').on("input", function (_0x378816) {
    var _0x213988 = _0x378816.delegateTarget.value;
    var _0x4cc129 = parseInt(_0x3d5eb9("#color-r-input").val());
    var _0x11aa04 = parseInt(_0x213988);
    var _0x1c8724 = parseInt(_0x3d5eb9("#color-b-input").val());
    if (isNaN(_0x4cc129) || _0x4cc129 < 0x0 || _0x4cc129 > 0xff) {
      _0x4cc129 = 0x0;
    }
    if (isNaN(_0x11aa04) || _0x11aa04 < 0x0 || _0x11aa04 > 0xff) {
      _0x11aa04 = 0x0;
    }
    if (isNaN(_0x1c8724) || _0x1c8724 < 0x0 || _0x1c8724 > 0xff) {
      _0x1c8724 = 0x0;
    }
    document.getElementById("pick-color").value = rgbToHex(_0x4cc129, _0x11aa04, _0x1c8724);
    var _0x1764d7 = rgbToHsv(_0x4cc129, _0x11aa04, _0x1c8724);
    if (kbd_edit_info.hue != _0x1764d7.h || kbd_edit_info.sat != _0x1764d7.s) {
      kbd_edit_info.hue = _0x1764d7.h;
      kbd_edit_info.sat = _0x1764d7.s;
      if (kbd_edit_info.mode != 0x0 && kbd_edit_info.mode != 0x2d) {
        hs_set_light(current_usb_client, 0x4, kbd_edit_info);
      }
    }
  });
  _0x3d5eb9("#color-b-input").on("input", function (_0x26e28c) {
    var _0x4335c6 = _0x26e28c.delegateTarget.value;
    var _0x3cb63f = parseInt(_0x3d5eb9("#color-r-input").val());
    var _0x33c602 = parseInt(_0x3d5eb9("#color-g-input").val());
    var _0x26081d = parseInt(_0x4335c6);
    if (isNaN(_0x3cb63f) || _0x3cb63f < 0x0 || _0x3cb63f > 0xff) {
      _0x3cb63f = 0x0;
    }
    if (isNaN(_0x33c602) || _0x33c602 < 0x0 || _0x33c602 > 0xff) {
      _0x33c602 = 0x0;
    }
    if (isNaN(_0x26081d) || _0x26081d < 0x0 || _0x26081d > 0xff) {
      _0x26081d = 0x0;
    }
    document.getElementById("pick-color").value = rgbToHex(_0x3cb63f, _0x33c602, _0x26081d);
    var _0x319aa9 = rgbToHsv(_0x3cb63f, _0x33c602, _0x26081d);
    if (kbd_edit_info.hue != _0x319aa9.h || kbd_edit_info.sat != _0x319aa9.s) {
      kbd_edit_info.hue = _0x319aa9.h;
      kbd_edit_info.sat = _0x319aa9.s;
      if (kbd_edit_info.mode != 0x0 && kbd_edit_info.mode != 0x2d) {
        hs_set_light(current_usb_client, 0x4, kbd_edit_info);
      }
    }
  });
  document.getElementById("light-box-color-r-input").addEventListener('change', function (_0x120ec0) {
    if (_0x120ec0.target.value.length == 0x0) {
      _0x3d5eb9("#light-box-color-r-input").val(0x0);
    }
  });
  document.getElementById("light-box-color-g-input").addEventListener('change', function (_0x1fc483) {
    if (_0x1fc483.target.value.length == 0x0) {
      _0x3d5eb9('#light-box-color-g-input').val(0x0);
    }
  });
  document.getElementById("light-box-color-b-input").addEventListener("change", function (_0x23f22a) {
    if (_0x23f22a.target.value.length == 0x0) {
      _0x3d5eb9('#vcolor-b-input').val(0x0);
    }
  });
  _0x3d5eb9("#light-box-color-r-input").on("input", function (_0x37a8d5) {
    var _0x566eb8 = _0x37a8d5.delegateTarget.value;
    var _0x2bcaa9 = parseInt(_0x566eb8);
    var _0x223f16 = parseInt(_0x3d5eb9("#light-box-color-g-input").val());
    var _0x4ba9da = parseInt(_0x3d5eb9('#light-box-color-b-input').val());
    if (isNaN(_0x2bcaa9) || _0x2bcaa9 < 0x0 || _0x2bcaa9 > 0xff) {
      _0x2bcaa9 = 0x0;
    }
    if (isNaN(_0x223f16) || _0x223f16 < 0x0 || _0x223f16 > 0xff) {
      _0x223f16 = 0x0;
    }
    if (isNaN(_0x4ba9da) || _0x4ba9da < 0x0 || _0x4ba9da > 0xff) {
      _0x4ba9da = 0x0;
    }
    document.getElementById('light-box-pick-color').value = rgbToHex(_0x2bcaa9, _0x223f16, _0x4ba9da);
    if (kbd_edit_info.light_box_info.r != _0x2bcaa9 || kbd_edit_info.light_box_info.g != _0x223f16 || kbd_edit_info.light_box_info.b != _0x4ba9da) {
      kbd_edit_info.light_box_info.r = _0x2bcaa9;
      kbd_edit_info.light_box_info.g = _0x223f16;
      kbd_edit_info.light_box_info.b = _0x4ba9da;
      hs_set_light_box(current_usb_client, kbd_edit_info.light_box_info);
    }
  });
  _0x3d5eb9("#light-box-color-g-input").on("input", function (_0xbb5763) {
    var _0x3e37e8 = _0xbb5763.delegateTarget.value;
    var _0x2e1977 = parseInt(_0x3d5eb9("#light-box-color-r-input").val());
    var _0x54c6fe = parseInt(_0x3e37e8);
    var _0x3dece9 = parseInt(_0x3d5eb9("#light-box-color-b-input").val());
    if (isNaN(_0x2e1977) || _0x2e1977 < 0x0 || _0x2e1977 > 0xff) {
      _0x2e1977 = 0x0;
    }
    if (isNaN(_0x54c6fe) || _0x54c6fe < 0x0 || _0x54c6fe > 0xff) {
      _0x54c6fe = 0x0;
    }
    if (isNaN(_0x3dece9) || _0x3dece9 < 0x0 || _0x3dece9 > 0xff) {
      _0x3dece9 = 0x0;
    }
    document.getElementById("light-box-pick-color").value = rgbToHex(_0x2e1977, _0x54c6fe, _0x3dece9);
    if (kbd_edit_info.light_box_info.r != _0x2e1977 || kbd_edit_info.light_box_info.g != _0x54c6fe || kbd_edit_info.light_box_info.b != _0x3dece9) {
      kbd_edit_info.light_box_info.r = _0x2e1977;
      kbd_edit_info.light_box_info.g = _0x54c6fe;
      kbd_edit_info.light_box_info.b = _0x3dece9;
      hs_set_light_box(current_usb_client, kbd_edit_info.light_box_info);
    }
  });
  _0x3d5eb9("#light-box-color-b-input").on("input", function (_0x4ca149) {
    var _0x26faff = _0x4ca149.delegateTarget.value;
    var _0x2982df = parseInt(_0x3d5eb9("#light-box-color-r-input").val());
    var _0x2c9afb = parseInt(_0x3d5eb9("#light-box-color-g-input").val());
    var _0x35284c = parseInt(_0x26faff);
    if (isNaN(_0x2982df) || _0x2982df < 0x0 || _0x2982df > 0xff) {
      _0x2982df = 0x0;
    }
    if (isNaN(_0x2c9afb) || _0x2c9afb < 0x0 || _0x2c9afb > 0xff) {
      _0x2c9afb = 0x0;
    }
    if (isNaN(_0x35284c) || _0x35284c < 0x0 || _0x35284c > 0xff) {
      _0x35284c = 0x0;
    }
    document.getElementById("light-box-pick-color").value = rgbToHex(_0x2982df, _0x2c9afb, _0x35284c);
    if (kbd_edit_info.light_box_info.r != _0x2982df || kbd_edit_info.light_box_info.g != _0x2c9afb || kbd_edit_info.light_box_info.b != _0x35284c) {
      kbd_edit_info.light_box_info.r = _0x2982df;
      kbd_edit_info.light_box_info.g = _0x2c9afb;
      kbd_edit_info.light_box_info.b = _0x35284c;
      hs_set_light_box(current_usb_client, kbd_edit_info.light_box_info);
    }
  });
  _0x3f4986.on("kbd-axis-matrix-action", {
    'select': async function () {
      var _0x4de43a = this.getAttribute("kbd-axis-matrix-index");
      kbd_key_matrix_index = Number(_0x4de43a);
      var _0xb0ebbd = false;
      for (let _0x1fc2db = 0x0; _0x1fc2db < kbd_matrix_select_keys.length; _0x1fc2db++) {
        if (kbd_matrix_select_keys[_0x1fc2db].row == kbd_key_infos[kbd_key_matrix_index].row && kbd_matrix_select_keys[_0x1fc2db].col == kbd_key_infos[kbd_key_matrix_index].col) {
          kbd_matrix_select_keys.splice(_0x1fc2db, 0x1);
          _0xb0ebbd = true;
          break;
        }
      }
      if (!_0xb0ebbd) {
        kbd_matrix_select_keys.push(kbd_clone_axis_info(kbd_axis_infos[kbd_key_matrix_index]));
      }
      kbd_ui_refresh_axis_matrix(current_usb_client);
      kbd_ui_refresh_axis(current_usb_client);
    }
  });
  _0x3f4986.on("kbd-axis-action", {
    'select': async function () {
      var _0x390da9 = this.getAttribute("value");
      if (_0x390da9 == "WASD") {
        kbd_matrix_select_keys.splice(0x0, kbd_matrix_select_keys.length);
        for (let _0x325a71 = 0x0; _0x325a71 < kbd_key_infos.length; _0x325a71++) {
          var _0xa20e5b = kbd_key_infos[_0x325a71].name;
          if (_0xa20e5b == 'W' || _0xa20e5b == 'A' || _0xa20e5b == 'S' || _0xa20e5b == 'D') {
            kbd_matrix_select_keys.push(kbd_axis_infos[_0x325a71]);
          }
          if (kbd_matrix_select_keys.length >= 0x4) {
            break;
          }
        }
      } else {
        if (_0x390da9 == "ALL") {
          kbd_matrix_select_keys.splice(0x0, kbd_matrix_select_keys.length);
          for (let _0xec7df8 = 0x0; _0xec7df8 < kbd_axis_infos.length; _0xec7df8++) {
            kbd_matrix_select_keys.push(kbd_axis_infos[_0xec7df8]);
          }
        } else {
          if (_0x390da9 == "REVERSE") {
            var _0x2494d5 = kbd_matrix_select_keys.slice();
            kbd_matrix_select_keys.splice(0x0, kbd_matrix_select_keys.length);
            for (let _0x166c18 = 0x0; _0x166c18 < kbd_key_infos.length; _0x166c18++) {
              var _0x4cc1a8 = false;
              for (let _0x5d6757 = 0x0; _0x5d6757 < _0x2494d5.length; _0x5d6757++) {
                if (_0x2494d5[_0x5d6757].row == kbd_key_infos[_0x166c18].row && _0x2494d5[_0x5d6757].col == kbd_key_infos[_0x166c18].col) {
                  _0x4cc1a8 = true;
                  _0x2494d5.splice(_0x5d6757, 0x1);
                  break;
                }
              }
              if (!_0x4cc1a8) {
                kbd_matrix_select_keys.push(kbd_axis_infos[_0x166c18]);
              }
            }
          } else if (_0x390da9 == "CLEAR") {
            kbd_matrix_select_keys.splice(0x0, kbd_matrix_select_keys.length);
          }
        }
      }
      kbd_ui_refresh_axis_matrix(current_usb_client);
      kbd_ui_refresh_axis(current_usb_client);
    }
  });
  _0x3f4986.on("layui-axis-type-action", {
    'select': async function () {
      var _0x2647c3 = this.getAttribute("index");
      if (kbd_edit_info.switch_type != Number(_0x2647c3)) {
        kbd_edit_info.switch_type = Number(_0x2647c3);
        kbd_ui_refresh_axis(current_usb_client);
      }
    }
  });
  _0x1435f3.on("radio(kbd-axis-mode)", function (_0x1aa027) {
    var _0x3cc844 = _0x1aa027.elem;
    var _0x405646 = _0x3cc844.checked;
    var _0x2d4f14 = _0x3cc844.value;
    if (_0x405646) {
      if (_0x2d4f14 != current_usb_client.device_info.kbd_axis_mode) {
        hs_set_axis_mode(current_usb_client, _0x2d4f14);
      }
    }
  });
  _0x1435f3.on("switch(kbd-axis-quick-tigger-mode)", function (_0x2996b8) {
    if (_0x2996b8.elem.checked) {
      kbd_edit_info.rt_enable = 0x1;
    } else {
      kbd_edit_info.rt_enable = 0x0;
    }
    kbd_ui_refresh_axis(current_usb_client);
  });
  _0x3f4986.on("kbd-light-matrix-action", {
    'select': async function () {
      if (kbd_edit_info.mode != 0x2d) {
        return;
      }
      kbd_key_matrix_index = this.getAttribute("kbd-light-matrix-index");
      var _0x3babb4 = false;
      for (let _0x98f130 = 0x0; _0x98f130 < kbd_matrix_select_keys.length; _0x98f130++) {
        var _0x5a375f = kbd_matrix_select_keys[_0x98f130];
        if (kbd_key_infos[kbd_key_matrix_index].row == kbd_matrix_select_keys[_0x98f130].row && kbd_key_infos[kbd_key_matrix_index].col == kbd_matrix_select_keys[_0x98f130].col) {
          kbd_matrix_select_keys.splice(_0x98f130, 0x1);
          _0x3babb4 = true;
          break;
        }
      }
      if (!_0x3babb4) {
        kbd_matrix_select_keys.push(kbd_edit_info.keys[kbd_key_matrix_index]);
      }
      kbd_ui_refresh_light_matrix(current_usb_client);
      kbd_ui_refresh_light(current_usb_client);
      if (kbd_matrix_select_keys.length > 0x0) {
        _0x3d5eb9("#kbd-light-button-container").css('display', "flex");
      } else {
        _0x3d5eb9("#kbd-light-button-container").css("display", "none");
      }
    }
  });
  _0x3f4986.on("kbd-axis-cancel-action", {
    'select': async function () {
      kbd_matrix_select_keys.splice(0x0, kbd_matrix_select_keys.length);
      kbd_ui_refresh_axis(current_usb_client);
      kbd_ui_refresh_axis_matrix(current_usb_client);
      _0x3d5eb9('#kbd-axis-button-container').css("display", "none");
    }
  });
  _0x3f4986.on("kbd-axis-save-action", {
    'select': async function () {
      if (kbd_matrix_select_keys.length > 0x0) {
        for (let _0x43c3db = 0x0; _0x43c3db < kbd_matrix_select_keys.length; _0x43c3db++) {
          kbd_matrix_select_keys[_0x43c3db].switch_type = kbd_edit_info.switch_type;
          kbd_matrix_select_keys[_0x43c3db].rt_enable = kbd_edit_info.rt_enable;
          kbd_matrix_select_keys[_0x43c3db].apc_lv = kbd_edit_info.apc_lv;
          kbd_matrix_select_keys[_0x43c3db].rt_press_lv = kbd_edit_info.rt_press_lv;
          kbd_matrix_select_keys[_0x43c3db].rt_release_lv = kbd_edit_info.rt_release_lv;
          kbd_matrix_select_keys[_0x43c3db].top_dz = kbd_edit_info.top_dz;
          kbd_matrix_select_keys[_0x43c3db].btm_dz = kbd_edit_info.btm_dz;
        }
        show_waiting();
        hs_set_axis_infos(current_usb_client, kbd_matrix_select_keys);
        kbd_matrix_select_keys.splice(0x0, kbd_matrix_select_keys.length);
        kbd_ui_refresh_axis(current_usb_client);
        kbd_ui_refresh_axis_matrix(current_usb_client);
        _0x3d5eb9("#kbd-axis-button-container").css("display", "none");
      }
    }
  });
  _0x3f4986.on("kbd-advance-key-matrix-action", {
    'select': async function () {
      var _0x38ecce = this.getAttribute("kbd-key-matrix-index");
      if (kbd_key_matrix_index == Number(_0x38ecce)) {
        return;
      }
      kbd_key_matrix_index = Number(_0x38ecce);
      var _0x4dcea7 = false;
      for (let _0x82f998 = 0x0; _0x82f998 < kbd_socd_infos.length; _0x82f998++) {
        if (kbd_key_infos[kbd_key_matrix_index].row == kbd_socd_infos[_0x82f998].row1 && kbd_key_infos[kbd_key_matrix_index].col == kbd_socd_infos[_0x82f998].col1 || kbd_key_infos[kbd_key_matrix_index].row == kbd_socd_infos[_0x82f998].row2 && kbd_key_infos[kbd_key_matrix_index].col == kbd_socd_infos[_0x82f998].col2) {
          kbd_key_setting_index = 0x0;
          layui.element.tabChange("kbd-setting-advance-key-type", 0x0);
          _0x4dcea7 = true;
          break;
        }
      }
      for (let _0x3784f9 = 0x0; _0x3784f9 < kbd_mt_infos.length; _0x3784f9++) {
        if (kbd_key_infos[kbd_key_matrix_index].row == kbd_mt_infos[_0x3784f9].row && kbd_key_infos[kbd_key_matrix_index].col == kbd_mt_infos[_0x3784f9].col) {
          kbd_key_setting_index = 0x1;
          layui.element.tabChange("kbd-setting-advance-key-type", 0x1);
          _0x4dcea7 = true;
          break;
        }
      }
      for (let _0x2af070 = 0x0; _0x2af070 < kbd_rs_infos.length; _0x2af070++) {
        if (kbd_key_infos[kbd_key_matrix_index].row == kbd_rs_infos[_0x2af070].row1 && kbd_key_infos[kbd_key_matrix_index].col == kbd_rs_infos[_0x2af070].col1 || kbd_key_infos[kbd_key_matrix_index].row == kbd_rs_infos[_0x2af070].row2 && kbd_key_infos[kbd_key_matrix_index].col == kbd_rs_infos[_0x2af070].col2) {
          kbd_key_setting_index = 0x2;
          layui.element.tabChange("kbd-setting-advance-key-type", 0x2);
          _0x4dcea7 = true;
          break;
        }
      }
      if (!_0x4dcea7) {
        if (kbd_key_setting_index == 0x0) {
          if (kbd_select_elementId == "kbd-socd-key1") {
            document.getElementById("kbd-socd-key1").style.borderColor = '#16B777';
            document.getElementById("kbd-socd-key1").textContent = kbd_key_infos[kbd_key_matrix_index].name;
            kbd_edit_info.row1 = kbd_key_infos[kbd_key_matrix_index].row;
            kbd_edit_info.col1 = kbd_key_infos[kbd_key_matrix_index].col;
          } else if (kbd_select_elementId == "kbd-socd-key2") {
            document.getElementById("kbd-socd-key2").style.borderColor = '#16B777';
            document.getElementById("kbd-socd-key2").textContent = kbd_key_infos[kbd_key_matrix_index].name;
            kbd_edit_info.row2 = kbd_key_infos[kbd_key_matrix_index].row;
            kbd_edit_info.col2 = kbd_key_infos[kbd_key_matrix_index].col;
          } else {
            layui.element.tabChange("kbd-setting-advance-key-type", 0x0);
          }
        } else {
          if (kbd_key_setting_index == 0x2) {
            if (kbd_select_elementId == "kbd-rs-key1") {
              document.getElementById("kbd-rs-key1").style.borderColor = "#16B777";
              document.getElementById("kbd-rs-key1").textContent = kbd_key_infos[kbd_key_matrix_index].name;
              kbd_edit_info.row1 = kbd_key_infos[kbd_key_matrix_index].row;
              kbd_edit_info.col1 = kbd_key_infos[kbd_key_matrix_index].col;
            } else if (kbd_select_elementId == "kbd-rs-key2") {
              document.getElementById("kbd-rs-key2").style.borderColor = "#16B777";
              document.getElementById("kbd-rs-key2").textContent = kbd_key_infos[kbd_key_matrix_index].name;
              kbd_edit_info.row2 = kbd_key_infos[kbd_key_matrix_index].row;
              kbd_edit_info.col2 = kbd_key_infos[kbd_key_matrix_index].col;
            } else {
              layui.element.tabChange("kbd-setting-advance-key-type", 0x2);
            }
          } else {
            if (kbd_key_setting_index == 0x1) {
              layui.element.tabChange("kbd-setting-advance-key-type", 0x1);
            } else if (kbd_key_setting_index == 0x3) {
              layui.element.tabChange('kbd-setting-advance-key-type', 0x3);
            }
          }
        }
      }
      kbd_ui_refresh_advance_key_desc(current_usb_client);
      if (kbd_key_setting_index != 0x0) {
        kbd_ui_refresh_advance_key_matrix(current_usb_client);
      }
    }
  });
  _0x3f4986.on("kbd-advance-key-delete-action", {
    'select': async function () {
      if (kbd_key_matrix_index < 0x0) {
        return;
      }
      if (kbd_key_setting_index == 0x0) {
        for (var _0x695e67 = 0x0; _0x695e67 < kbd_socd_infos.length; _0x695e67++) {
          var _0x333b78 = kbd_socd_infos[_0x695e67];
          if (_0x333b78.row1 == kbd_edit_info.row1 && _0x333b78.col1 == kbd_edit_info.col1 && _0x333b78.row2 == kbd_edit_info.row2 && _0x333b78.col2 == kbd_edit_info.col2) {
            kbd_socd_infos.splice(_0x695e67, 0x1);
            break;
          }
        }
        if (kbd_socd_infos.length > 0x0) {
          hs_set_socd_infos(current_usb_client, kbd_socd_infos);
        } else {
          hs_set_socd_num(current_usb_client, 0x0);
        }
      } else {
        if (kbd_key_setting_index == 0x2) {
          for (var _0x695e67 = 0x0; _0x695e67 < kbd_rs_infos.length; _0x695e67++) {
            var _0x37cc69 = kbd_rs_infos[_0x695e67];
            if (_0x37cc69.row1 == kbd_edit_info.row1 && _0x37cc69.col1 == kbd_edit_info.col1 && _0x37cc69.row2 == kbd_edit_info.row2 && _0x37cc69.col2 == kbd_edit_info.col2) {
              kbd_rs_infos.splice(_0x695e67, 0x1);
              break;
            }
          }
          if (kbd_rs_infos.length > 0x0) {
            hs_set_rs_infos(current_usb_client, kbd_rs_infos);
          } else {
            hs_set_rs_num(current_usb_client, 0x0);
          }
        } else {
          if (kbd_key_setting_index == 0x1) {
            for (var _0x695e67 = 0x0; _0x695e67 < kbd_mt_infos.length; _0x695e67++) {
              var _0x9cdc4d = kbd_mt_infos[_0x695e67];
              if (_0x9cdc4d.row == kbd_edit_info.row && _0x9cdc4d.col == kbd_edit_info.col) {
                kbd_mt_infos.splice(_0x695e67, 0x1);
                break;
              }
            }
            if (kbd_mt_infos.length > 0x0) {
              hs_set_mt_infos(current_usb_client, kbd_mt_infos);
            } else {
              hs_set_mt_num(current_usb_client, 0x0);
            }
          } else {
            if (kbd_key_setting_index == 0x3) {
              for (var _0x695e67 = 0x0; _0x695e67 < kbd_dks_infos.length; _0x695e67++) {
                var _0x33f431 = kbd_dks_infos[_0x695e67];
                if (_0x33f431.row == kbd_edit_info.row && _0x33f431.col == kbd_edit_info.col) {
                  kbd_dks_infos.splice(_0x695e67, 0x1);
                  break;
                }
              }
              if (kbd_dks_infos.length > 0x0) {
                hs_set_dks_infos(current_usb_client, kbd_dks_infos);
              } else {
                hs_set_dks_num(current_usb_client, 0x0);
              }
            }
          }
        }
      }
    }
  });
  _0x3f4986.on("kbd-advance-key-set-action", {
    'select': async function () {
      if (kbd_key_matrix_index < 0x0) {
        return;
      }
      if (kbd_key_setting_index == 0x0) {
        var _0x12aab0 = false;
        for (var _0x1f7c38 = 0x0; _0x1f7c38 < kbd_socd_infos.length; _0x1f7c38++) {
          if (kbd_socd_infos[_0x1f7c38].row1 == kbd_edit_info.row1 && kbd_socd_infos[_0x1f7c38].col1 == kbd_edit_info.col1 || kbd_socd_infos[_0x1f7c38].row2 == kbd_edit_info.row2 && kbd_socd_infos[_0x1f7c38].col2 == kbd_edit_info.col2 || kbd_socd_infos[_0x1f7c38].row2 == kbd_edit_info.row1 && kbd_socd_infos[_0x1f7c38].col2 == kbd_edit_info.col1 || kbd_socd_infos[_0x1f7c38].row1 == kbd_edit_info.row2 && kbd_socd_infos[_0x1f7c38].col1 == kbd_edit_info.col2) {
            kbd_edit_info.id = kbd_socd_infos[_0x1f7c38].id;
            kbd_socd_infos[_0x1f7c38] = kbd_clone_socd_info(kbd_edit_info);
            _0x12aab0 = true;
            break;
          }
        }
        if (!_0x12aab0) {
          if (kbd_socd_infos.length >= 0x14) {
            _0x2a0d7b.confirm(_0x542cd7.prop("STRID_KBD_ADVANCE_KEY_MAX_HINT"), {
              'title': _0x542cd7.prop("STRID_TITLE_WARNING"),
              'skin': "layui-layer-confirm",
              'btn': [_0x542cd7.prop('STRING_OK')],
              'btnAlign': 'c',
              'btn1': function () {
                _0x2a0d7b.closeLast(0x0);
              }
            });
            return;
          }
          kbd_edit_info.id = kbd_socd_infos.length;
          kbd_socd_infos.push(kbd_clone_socd_info(kbd_edit_info));
        }
        hs_set_socd_infos(current_usb_client, kbd_socd_infos);
      } else {
        if (kbd_key_setting_index == 0x2) {
          var _0x12aab0 = false;
          for (var _0x1f7c38 = 0x0; _0x1f7c38 < kbd_rs_infos.length; _0x1f7c38++) {
            if (kbd_rs_infos[_0x1f7c38].row1 == kbd_edit_info.row1 && kbd_rs_infos[_0x1f7c38].col1 == kbd_edit_info.col1 || kbd_rs_infos[_0x1f7c38].row2 == kbd_edit_info.row2 && kbd_rs_infos[_0x1f7c38].col2 == kbd_edit_info.col2 || kbd_rs_infos[_0x1f7c38].row2 == kbd_edit_info.row1 && kbd_rs_infos[_0x1f7c38].col2 == kbd_edit_info.col1 || kbd_rs_infos[_0x1f7c38].row1 == kbd_edit_info.row2 && kbd_rs_infos[_0x1f7c38].col1 == kbd_edit_info.col2) {
              kbd_edit_info.id = kbd_rs_infos[_0x1f7c38].id;
              kbd_rs_infos[_0x1f7c38] = kbd_clone_rs_info(kbd_edit_info);
              _0x12aab0 = true;
              break;
            }
          }
          if (!_0x12aab0) {
            if (kbd_rs_infos.length >= 0x14) {
              _0x2a0d7b.confirm(_0x542cd7.prop('STRID_KBD_ADVANCE_KEY_MAX_HINT'), {
                'title': _0x542cd7.prop("STRID_TITLE_WARNING"),
                'skin': "layui-layer-confirm",
                'btn': [_0x542cd7.prop('STRING_OK')],
                'btnAlign': 'c',
                'btn1': function () {
                  _0x2a0d7b.closeLast(0x0);
                }
              });
              return;
            }
            kbd_edit_info.id = kbd_rs_infos.length;
            kbd_rs_infos.push(kbd_clone_rs_info(kbd_edit_info));
          }
          hs_set_rs_infos(current_usb_client, kbd_rs_infos);
        } else {
          if (kbd_key_setting_index == 0x1) {
            var _0x12aab0 = false;
            for (var _0x1f7c38 = 0x0; _0x1f7c38 < kbd_mt_infos.length; _0x1f7c38++) {
              if (kbd_mt_infos[_0x1f7c38].row == kbd_edit_info.row && kbd_mt_infos[_0x1f7c38].col == kbd_edit_info.col) {
                kbd_mt_infos[_0x1f7c38] = kbd_clone_mt_info(kbd_edit_info);
                _0x12aab0 = true;
                break;
              }
            }
            if (!_0x12aab0) {
              if (kbd_mt_infos.length >= 0x14) {
                _0x2a0d7b.confirm(_0x542cd7.prop("STRID_KBD_ADVANCE_KEY_MAX_HINT"), {
                  'title': _0x542cd7.prop("STRID_TITLE_WARNING"),
                  'skin': 'layui-layer-confirm',
                  'btn': [_0x542cd7.prop("STRING_OK")],
                  'btnAlign': 'c',
                  'btn1': function () {
                    _0x2a0d7b.closeLast(0x0);
                  }
                });
                return;
              }
              kbd_edit_info.id = kbd_mt_infos.length;
              kbd_edit_info.row = kbd_key_infos[kbd_key_matrix_index].row;
              kbd_edit_info.col = kbd_key_infos[kbd_key_matrix_index].col;
              kbd_mt_infos.push(kbd_clone_mt_info(kbd_edit_info));
            }
            hs_set_mt_infos(current_usb_client, kbd_mt_infos);
          } else {
            if (kbd_key_setting_index == 0x3) {
              var _0x12aab0 = false;
              for (var _0x1f7c38 = 0x0; _0x1f7c38 < kbd_dks_infos.length; _0x1f7c38++) {
                if (kbd_dks_infos[_0x1f7c38].row == kbd_edit_info.row && kbd_dks_infos[_0x1f7c38].col == kbd_edit_info.col) {
                  kbd_dks_infos[_0x1f7c38] = kbd_clone_dks_info(kbd_edit_info);
                  _0x12aab0 = true;
                  break;
                }
              }
              if (!_0x12aab0) {
                if (kbd_dks_infos.length >= 0x14) {
                  _0x2a0d7b.confirm(_0x542cd7.prop("STRID_KBD_ADVANCE_KEY_MAX_HINT"), {
                    'title': _0x542cd7.prop("STRID_TITLE_WARNING"),
                    'skin': "layui-layer-confirm",
                    'btn': [_0x542cd7.prop("STRING_OK")],
                    'btnAlign': 'c',
                    'btn1': function () {
                      _0x2a0d7b.closeLast(0x0);
                    }
                  });
                  return;
                }
                kbd_edit_info.id = kbd_dks_infos.length;
                kbd_edit_info.row = kbd_key_infos[kbd_key_matrix_index].row;
                kbd_edit_info.col = kbd_key_infos[kbd_key_matrix_index].col;
                kbd_dks_infos.push(kbd_clone_dks_info(kbd_edit_info));
              }
              hs_set_dks_infos(current_usb_client, kbd_dks_infos);
            }
          }
        }
      }
    }
  });
  _0x3f4986.on('kbd-socd-key1-action', {
    'select': async function () {
      if (kbd_select_elementId == "kbd-socd-key1") {
        kbd_select_elementId = '';
        document.getElementById('kbd-socd-key1').style.color = is_dark_theme() ? "white" : "black";
        document.getElementById('kbd-socd-key1').style.backgroundColor = "transparent";
      } else {
        kbd_select_elementId = 'kbd-socd-key1';
        document.getElementById("kbd-socd-key1").style.color = is_dark_theme() ? "white" : 'black';
        document.getElementById("kbd-socd-key1").style.backgroundColor = "#16B77788";
      }
      document.getElementById('kbd-socd-key2').style.backgroundColor = "transparent";
      kbd_ui_refresh_advance_key_matrix(current_usb_client);
    }
  });
  _0x3f4986.on("kbd-socd-key2-action", {
    'select': async function () {
      if (kbd_select_elementId == "kbd-socd-key2") {
        kbd_select_elementId = '';
        document.getElementById("kbd-socd-key2").style.color = is_dark_theme() ? "white" : "black";
        document.getElementById("kbd-socd-key2").style.backgroundColor = "transparent";
      } else {
        kbd_select_elementId = "kbd-socd-key2";
        document.getElementById("kbd-socd-key2").style.color = is_dark_theme() ? "white" : "black";
        document.getElementById("kbd-socd-key2").style.backgroundColor = "#16B77788";
      }
      document.getElementById('kbd-socd-key1').style.backgroundColor = 'transparent';
      kbd_ui_refresh_advance_key_matrix(current_usb_client);
    }
  });
  _0x1435f3.on("radio(kbd-socd-type)", function (_0x6665e7) {
    var _0xb540a3 = _0x6665e7.elem;
    var _0x1fee45 = _0xb540a3.checked;
    var _0x16886e = _0xb540a3.value;
    if (_0x1fee45) {
      if (kbd_edit_info.socd_mode != Number(_0x16886e)) {
        kbd_edit_info.socd_mode = Number(_0x16886e);
        kbd_ui_refresh_advance_key_desc(current_usb_client);
      }
    }
  });
  _0x3f4986.on('kbd-mt-key1-action', {
    'select': async function () {
      if (kbd_key_matrix_index < 0x0) {
        _0x2a0d7b.confirm(_0x542cd7.prop('STRID_KBD_MT_HINT'), {
          'title': _0x542cd7.prop("STRID_TITLE_WARNING"),
          'skin': "layui-layer-confirm",
          'btn': [_0x542cd7.prop("STRING_OK")],
          'btnAlign': 'c',
          'btn1': function () {
            _0x2a0d7b.closeLast(0x0);
          }
        });
        return;
      }
      dialog_select_key_init('kbd-mt-key1');
      select_key_panel_id = _0x2a0d7b.open({
        'type': 0x1,
        'title': _0x542cd7.prop("STRID_SETTING_MAPPING_SELECT_KEY"),
        'skin': "layui-layer-confirm",
        'btn': [],
        'btnAlign': 'c',
        'content': _0x3d5eb9("#select-key-panel"),
        'end': function () {
          select_key_panel_id = undefined;
        }
      });
    }
  });
  _0x3f4986.on("kbd-mt-key2-action", {
    'select': async function () {
      if (kbd_key_matrix_index < 0x0) {
        _0x2a0d7b.confirm(_0x542cd7.prop('STRID_KBD_MT_HINT'), {
          'title': _0x542cd7.prop("STRID_TITLE_WARNING"),
          'skin': "layui-layer-confirm",
          'btn': [_0x542cd7.prop("STRING_OK")],
          'btnAlign': 'c',
          'btn1': function () {
            _0x2a0d7b.closeLast(0x0);
          }
        });
        return;
      }
      dialog_select_key_init("kbd-mt-key2");
      select_key_panel_id = _0x2a0d7b.open({
        'type': 0x1,
        'title': _0x542cd7.prop("STRID_SETTING_MAPPING_SELECT_KEY"),
        'skin': "layui-layer-confirm",
        'btn': [],
        'btnAlign': 'c',
        'content': _0x3d5eb9('#select-key-panel'),
        'end': function () {
          select_key_panel_id = undefined;
        }
      });
    }
  });
  _0x3f4986.on("kbd-rs-key1-action", {
    'select': async function () {
      if (kbd_select_elementId == "kbd-rs-key1") {
        kbd_select_elementId = '';
        document.getElementById("kbd-rs-key1").style.color = is_dark_theme() ? "white" : "black";
        document.getElementById("kbd-rs-key1").style.backgroundColor = 'transparent';
      } else {
        kbd_select_elementId = "kbd-rs-key1";
        document.getElementById('kbd-rs-key1').style.color = is_dark_theme() ? "white" : "black";
        document.getElementById("kbd-rs-key1").style.backgroundColor = '#16B77788';
      }
      document.getElementById('kbd-rs-key2').style.backgroundColor = "transparent";
      kbd_ui_refresh_advance_key_matrix(current_usb_client);
    }
  });
  _0x3f4986.on("kbd-rs-key2-action", {
    'select': async function () {
      if (kbd_select_elementId == 'kbd-rs-key2') {
        kbd_select_elementId = '';
        document.getElementById("kbd-rs-key2").style.color = is_dark_theme() ? 'white' : 'black';
        document.getElementById("kbd-rs-key2").style.backgroundColor = 'transparent';
      } else {
        kbd_select_elementId = "kbd-rs-key2";
        document.getElementById("kbd-rs-key2").style.color = is_dark_theme() ? 'white' : 'black';
        document.getElementById("kbd-rs-key2").style.backgroundColor = "#16B77788";
      }
      document.getElementById("kbd-rs-key1").style.backgroundColor = "transparent";
      kbd_ui_refresh_advance_key_matrix(current_usb_client);
    }
  });
  _0x3f4986.on("kbd-dks-select-key-action", {
    'select': async function () {
      if (kbd_key_matrix_index < 0x0) {
        _0x2a0d7b.confirm(_0x542cd7.prop("STRID_KBD_MT_HINT"), {
          'title': _0x542cd7.prop("STRID_TITLE_WARNING"),
          'skin': "layui-layer-confirm",
          'btn': [_0x542cd7.prop("STRING_OK")],
          'btnAlign': 'c',
          'btn1': function () {
            _0x2a0d7b.closeLast(0x0);
          }
        });
        return;
      }
      var _0x251c02 = this.getAttribute("keyId");
      dialog_select_key_init("kbd-dks-key" + _0x251c02);
      select_key_panel_id = _0x2a0d7b.open({
        'type': 0x1,
        'title': _0x542cd7.prop("STRID_SETTING_MAPPING_SELECT_KEY"),
        'skin': "layui-layer-confirm",
        'btn': [],
        'btnAlign': 'c',
        'content': _0x3d5eb9("#select-key-panel"),
        'end': function () {
          select_key_panel_id = undefined;
        }
      });
    }
  });
  _0x3f4986.on("kbd-dks-key-action", {
    'select': async function () {
      if (kbd_key_matrix_index < 0x0) {
        _0x2a0d7b.confirm(_0x542cd7.prop("STRID_KBD_MT_HINT"), {
          'title': _0x542cd7.prop("STRID_TITLE_WARNING"),
          'skin': "layui-layer-confirm",
          'btn': [_0x542cd7.prop('STRING_OK')],
          'btnAlign': 'c',
          'btn1': function () {
            _0x2a0d7b.closeLast(0x0);
          }
        });
        return;
      }
      if (kbd_dks_dragging && kbd_dks_dragging_up) {
        kbd_dks_dragging = false;
        kbd_dks_dragging_up = false;
        return;
      }
      var _0x5e3b81 = this.getAttribute("keyId");
      var _0xe76680 = Math.floor(_0x5e3b81 / 0xa);
      var _0x73759b = _0x5e3b81 % 0xa;
      var _0x2f90d1 = 'kbd-dks-key' + _0xe76680 + '-' + _0x73759b;
      var _0x33de73 = '#kbd-dks-add' + _0xe76680 + '-' + _0x73759b;
      var _0x1a536b = '#kbd-dks-arrow' + _0xe76680 + '-' + _0x73759b;
      var _0x2abb27 = 0x0;
      if (_0xe76680 == 0x1) {
        _0x2abb27 = kbd_edit_info.state1;
      } else {
        if (_0xe76680 == 0x2) {
          _0x2abb27 = kbd_edit_info.state2;
        } else {
          if (_0xe76680 == 0x3) {
            _0x2abb27 = kbd_edit_info.state3;
          } else if (_0xe76680 == 0x4) {
            _0x2abb27 = kbd_edit_info.state4;
          }
        }
      }
      if (_0x3d5eb9(_0x1a536b).css('display') != 'none') {
        var _0x19974a = _0x3d5eb9('#' + _0x2f90d1).css("width");
        if (_0x73759b == 0x1) {
          if (_0x19974a == "24px") {
            _0x2abb27 = _0x2abb27 & 0x3fe;
          } else {
            if (_0x19974a == "77px") {
              _0x2abb27 = _0x2abb27 & 0x3fc;
            } else {
              if (_0x19974a == "104px") {
                _0x2abb27 = _0x2abb27 & 0x3f0;
              } else {
                if (_0x19974a == "157px") {
                  _0x2abb27 = _0x2abb27 & 0x3e0;
                } else {
                  if (_0x19974a == '184px') {
                    _0x2abb27 = _0x2abb27 & 0x380;
                  } else {
                    if (_0x19974a == "237px") {
                      _0x2abb27 = _0x2abb27 & 0x300;
                    } else if (_0x19974a == '264px') {
                      _0x2abb27 = 0x0;
                    }
                  }
                }
              }
            }
          }
        } else {
          if (_0x73759b == 0x2) {
            if (_0x19974a == '24px') {
              _0x2abb27 = _0x2abb27 & 0x3f7;
            } else {
              if (_0x19974a == "77px") {
                _0x2abb27 = _0x2abb27 & 0x3e7;
              } else {
                if (_0x19974a == "104px") {
                  _0x2abb27 = _0x2abb27 & 0x387;
                } else {
                  if (_0x19974a == "157px") {
                    _0x2abb27 = _0x2abb27 & 0x307;
                  } else if (_0x19974a == '184px') {
                    _0x2abb27 = _0x2abb27 & 0x7;
                  }
                }
              }
            }
          } else {
            if (_0x73759b == 0x3) {
              if (_0x19974a == '24px') {
                _0x2abb27 = _0x2abb27 & 0x3bf;
              } else {
                if (_0x19974a == '77px') {
                  _0x2abb27 = _0x2abb27 & 0x33f;
                } else if (_0x19974a == '104px') {
                  _0x2abb27 = _0x2abb27 & 0x3f;
                }
              }
            } else if (_0x73759b == 0x4) {
              _0x2abb27 = _0x2abb27 & 0x1ff;
            }
          }
        }
        if (_0xe76680 == 0x1) {
          kbd_edit_info.state1 = _0x2abb27;
        } else {
          if (_0xe76680 == 0x2) {
            kbd_edit_info.state2 = _0x2abb27;
          } else {
            if (_0xe76680 == 0x3) {
              kbd_edit_info.state3 = _0x2abb27;
            } else if (_0xe76680 == 0x4) {
              kbd_edit_info.state4 = _0x2abb27;
            }
          }
        }
        kbd_ui_refresh_dks_step(_0xe76680, _0x2abb27);
      } else {
        document.getElementById(_0x2f90d1).className = 'rounded-border-green';
        _0x3d5eb9('#' + _0x2f90d1).css("width", '24');
        _0x3d5eb9(_0x33de73).css("display", 'none');
        _0x3d5eb9(_0x1a536b).css('display', '');
        _0x3d5eb9(_0x1a536b).css("margin-left", 0xe);
        if (_0x73759b == 0x1) {
          _0x2abb27 = _0x2abb27 | 0x1;
        } else {
          if (_0x73759b == 0x2) {
            _0x2abb27 = _0x2abb27 | 0x8;
          } else {
            if (_0x73759b == 0x3) {
              _0x2abb27 = _0x2abb27 | 0x40;
            } else if (_0x73759b == 0x4) {
              _0x2abb27 = _0x2abb27 | 0x200;
            }
          }
        }
        if (_0xe76680 == 0x1) {
          kbd_edit_info.state1 = _0x2abb27;
        } else {
          if (_0xe76680 == 0x2) {
            kbd_edit_info.state2 = _0x2abb27;
          } else {
            if (_0xe76680 == 0x3) {
              kbd_edit_info.state3 = _0x2abb27;
            } else if (_0xe76680 == 0x4) {
              kbd_edit_info.state4 = _0x2abb27;
            }
          }
        }
      }
      kbd_ui_refresh_advance_key_desc(current_usb_client);
    }
  });
  _0x3f4986.on("kbd-dks-clean-action", {
    'select': async function () {
      var _0x5bb58b = this.getAttribute("keyId");
      var _0x368713 = "kbd-dks-key" + _0x5bb58b;
      document.getElementById(_0x368713).style.borderColor = "gray";
      document.getElementById(_0x368713).textContent = layui.i18np.prop("STRID_KBD_MT_SELECT_KEY");
      var _0xea6bfb = Number(_0x5bb58b);
      if (_0xea6bfb == 0x1) {
        kbd_edit_info.state1 = 0x0;
        kbd_edit_info.keyCode1 = 0x0;
      } else {
        if (_0xea6bfb == 0x2) {
          kbd_edit_info.state2 = 0x0;
          kbd_edit_info.keyCode2 = 0x0;
        } else {
          if (_0xea6bfb == 0x3) {
            kbd_edit_info.state3 = 0x0;
            kbd_edit_info.keyCode3 = 0x0;
          } else if (_0xea6bfb == 0x4) {
            kbd_edit_info.state4 = 0x0;
            kbd_edit_info.keyCode4 = 0x0;
          }
        }
      }
      kbd_ui_refresh_dks_step(_0xea6bfb, 0x0);
      kbd_ui_refresh_advance_key_desc(current_usb_client);
    }
  });
  _0x3f4986.on("kbd-fireware-download-action", {
    'download': async function () {
      window.location.href = "https://static.miracletek.net/pc/RAWMHUB_WIN7.zip";
    }
  });
  _0x3f4986.on("kbd-factory-reset-action", {
    'apply': async function () {
      _0x2a0d7b.open({
        'type': 0x1,
        'title': _0x542cd7.prop('STRID_TITLE_WARNING'),
        'skin': 'layui-layer-confirm',
        'content': _0x3d5eb9("#kbd-factory-reset-panel"),
        'btn': [_0x542cd7.prop("STRID_SETTING_FACTORY_RESET_S"), _0x542cd7.prop("STRID_BUTTON_CANCEL")],
        'btnAlign': 'c',
        'btn1': function () {
          _0x2a0d7b.closeLast(0x0);
          hs_set_factory_reset(current_usb_client);
        },
        'btn2': function () {
          _0x2a0d7b.closeLast(0x0);
        }
      });
    }
  });
  _0x3f4986.on('kbd-keycode-factory-reset-action', {
    'apply': async function () {
      _0x2a0d7b.open({
        'type': 0x1,
        'title': _0x542cd7.prop('STRID_TITLE_WARNING'),
        'skin': "layui-layer-confirm",
        'content': _0x3d5eb9('#kbd-keycode-factory-reset-panel'),
        'btn': [_0x542cd7.prop("STRID_SETTING_FACTORY_RESET_S"), _0x542cd7.prop("STRID_BUTTON_CANCEL")],
        'btnAlign': 'c',
        'btn1': function () {
          _0x2a0d7b.closeLast(0x0);
          hs_set_keycode_factory_reset(current_usb_client);
        },
        'btn2': function () {
          _0x2a0d7b.closeLast(0x0);
        }
      });
    }
  });
  _0x3f4986.on("dialog-select-key-action", {
    'select': async function () {
      var _0x36540a = this.getAttribute('kbd-select-key-index');
      _0x36540a = Number(_0x36540a);
      var _0x37bcff = this.getAttribute('elementId');
      var _0x281927 = kbd_select_keys;
      document.getElementById(_0x37bcff).style.color = is_dark_theme() ? "white" : "black";
      document.getElementById(_0x37bcff).style.borderColor = "#16B777";
      document.getElementById(_0x37bcff).textContent = _0x281927[_0x36540a].name;
      if (_0x37bcff == "kbd-mt-key1") {
        kbd_edit_info.keyCode1 = _0x281927[_0x36540a].keyId;
        kbd_ui_refresh_advance_key_desc(current_usb_client);
      } else {
        if (_0x37bcff == "kbd-mt-key2") {
          kbd_edit_info.keyCode2 = _0x281927[_0x36540a].keyId;
          kbd_ui_refresh_advance_key_desc(current_usb_client);
        } else {
          if (_0x37bcff == "kbd-dks-key1") {
            kbd_edit_info.keyCode1 = _0x281927[_0x36540a].keyId;
            kbd_ui_refresh_advance_key_desc(current_usb_client);
          } else {
            if (_0x37bcff == "kbd-dks-key2") {
              kbd_edit_info.keyCode2 = _0x281927[_0x36540a].keyId;
              kbd_ui_refresh_advance_key_desc(current_usb_client);
            } else {
              if (_0x37bcff == "kbd-dks-key3") {
                kbd_edit_info.keyCode3 = _0x281927[_0x36540a].keyId;
                kbd_ui_refresh_advance_key_desc(current_usb_client);
              } else if (_0x37bcff == 'kbd-dks-key4') {
                kbd_edit_info.keyCode4 = _0x281927[_0x36540a].keyId;
                kbd_ui_refresh_advance_key_desc(current_usb_client);
              }
            }
          }
        }
      }
      if (select_key_panel_id != undefined) {
        _0x2a0d7b.close(select_key_panel_id);
      }
    }
  });
  _0x3f4986.on("dialog-mouse-select-key-action", {
    'select': async function () {
      var _0x16b560 = this.getAttribute("mouse-select-key-index");
      var _0x50a5b5 = this.getAttribute("elementId");
      var _0x141500 = mouse_select_keys;
      document.getElementById(_0x50a5b5).style.borderColor = '#16B777';
      document.getElementById(_0x50a5b5).textContent = _0x141500[_0x16b560].name;
      if (select_key_panel_id != undefined) {
        _0x2a0d7b.close(select_key_panel_id);
      }
    }
  });
  _0x3f4986.on("kbd-macro-item-action", {
    'select': async function () {
      var _0x234198 = this.getAttribute('kbd-macro-item-index');
      kbd_macro_select_index = Number(_0x234198);
      edit_macros = [];
      for (var _0x5cf785 = 0x0; _0x5cf785 < kbd_macro_infos[kbd_macro_select_index].length; _0x5cf785++) {
        edit_macros.push(clone_macro_info(kbd_macro_infos[kbd_macro_select_index][_0x5cf785]));
      }
      kbd_select_keyId = 0x7700 + kbd_macro_select_index;
      kbd_ui_macro_init(current_usb_client);
      kbd_ui_macro_edit_init(current_usb_client);
      kbd_ui_refresh_key_desc(current_usb_client);
    }
  });
  _0x3f4986.on("kbd-macro-add-select-key-action", {
    'select': async function () {
      dialog_select_key_init("kbd-macro-add-select-key");
      select_key_panel_id = _0x2a0d7b.open({
        'type': 0x1,
        'title': _0x542cd7.prop('STRID_SETTING_MAPPING_SELECT_KEY'),
        'skin': 'layui-layer-confirm',
        'btn': [],
        'btnAlign': 'c',
        'content': _0x3d5eb9("#select-key-panel"),
        'end': function () {
          select_key_panel_id = undefined;
        }
      });
    }
  });
  _0x3f4986.on("kbd-macro-record-action", {
    'select': async function () {
      var _0x92439a = false;
      setting_macro_edit_recording = false;
      setting_macro_edit_recording_time = -0x1;
      document.oncontextmenu = function (_0x2d5199) {
        _0x2d5199.preventDefault();
      };
      macro_record_panel_id = _0x2a0d7b.open({
        'type': 0x1,
        'title': _0x542cd7.prop('STRID_SETTING_MAPPING_MACRO_RECORD_TITLE'),
        'skin': 'layui-layer-confirm',
        'content': _0x3d5eb9('#setting-mapping-macro-record-panel'),
        'btn': [_0x542cd7.prop("STRID_SETTING_FACTORY_START")],
        'btnAlign': 'c',
        'btn1': function () {
          if (!_0x92439a) {
            _0x92439a = true;
            setting_macro_edit_recording = true;
            var _0x381a20 = _0x3d5eb9("#layui-layer" + macro_record_panel_id + " .layui-layer-btn .layui-layer-btn0");
            _0x381a20.html(_0x542cd7.prop("STRID_DONE"));
            _0x3d5eb9("#macro-record-waiting-info").css('display', '');
            _0x3d5eb9('#macro-record-fixed-time-container').css("display", "none");
            return false;
          } else {
            if (record_mouse_key_delay_timer_id != undefined) {
              clearTimeout(record_mouse_key_delay_timer_id);
              record_mouse_key_delay_timer_id = undefined;
            }
            _0x2a0d7b.closeLast(0x0);
            setting_macro_edit_recording = false;
            document.oncontextmenu = null;
            _0x3d5eb9("#macro-record-waiting-info").css("display", "none");
            _0x3d5eb9('#macro-record-fixed-time-container').css('display', '');
          }
        },
        'cancel': function (_0x54aa9f, _0x2b95d7, _0xb4db90) {
          if (_0x92439a) {
            if (record_mouse_key_delay_timer_id != undefined) {
              clearTimeout(record_mouse_key_delay_timer_id);
              record_mouse_key_delay_timer_id = undefined;
            }
            setting_macro_edit_recording = false;
            document.oncontextmenu = null;
          }
          return true;
        },
        'end': function () {
          if (_0x92439a) {
            setting_mapping_macro_recording_remove_last();
            if (record_mouse_key_delay_timer_id != undefined) {
              clearTimeout(record_mouse_key_delay_timer_id);
              record_mouse_key_delay_timer_id = undefined;
            }
            setting_macro_edit_recording = false;
            document.oncontextmenu = null;
            macro_record_panel_id = undefined;
          }
        }
      });
    }
  });
  _0x3f4986.on("kbd-macro-add-action", {
    'select': async function () {
      macro_keep_time_min = 0x0;
      macro_edit_index = -0x1;
      current_edit_macro = create_macro_info();
      ui_refresh_mapping_macro_add(current_usb_client);
      _0x2a0d7b.open({
        'type': 0x1,
        'title': _0x542cd7.prop('STRID_SETTING_MAPPING_MACRO_ACTION_ADD'),
        'skin': "layui-layer-confirm",
        'content': _0x3d5eb9("#setting-mapping-macro-add-panel"),
        'btn': [_0x542cd7.prop("STRID_SAVE")],
        'btnAlign': 'c',
        'btn1': function () {
          _0x2a0d7b.closeLast(0x0);
          current_edit_macro.style = 0x16;
          var _0x268a10 = macro_keys[parseInt(_0x3d5eb9("[name=\"macro-add-select-key\"]").val())].vCode;
          if (_0x268a10 == 0x401) {
            current_edit_macro.mouse_key_event = 0x20a;
            current_edit_macro.mouse_key_code = -parseInt(_0x3d5eb9("#macro-add-wheel-delta-input").val());
          } else {
            if (_0x268a10 == 0x400) {
              current_edit_macro.mouse_key_event = 0x20a;
              current_edit_macro.mouse_key_code = parseInt(_0x3d5eb9('#macro-add-wheel-delta-input').val());
            } else {
              if (_0x268a10 == 0x402) {
                current_edit_macro.mouse_key_event = 0x20e;
                current_edit_macro.mouse_key_code = -parseInt(_0x3d5eb9("#macro-add-wheel-delta-input").val());
              } else {
                if (_0x268a10 == 0x403) {
                  current_edit_macro.mouse_key_event = 0x20e;
                  current_edit_macro.mouse_key_code = parseInt(_0x3d5eb9("#macro-add-wheel-delta-input").val());
                } else {
                  if (_0x268a10 == 0x404) {
                    current_edit_macro.mouse_key_event = 0x200;
                    var _0x3b9300 = Math.round(parseFloat(_0x3d5eb9("#macro-add-move-delta-x-input").val()) * 0xa) + 0x7ff;
                    var _0x33716b = Math.round(parseFloat(_0x3d5eb9("#macro-add-move-delta-y-input").val()) * 0xa) + 0x7ff;
                    current_edit_macro.mouse_key_code = _0x3b9300 << 0x10 | _0x33716b;
                    current_edit_macro.mouse_key_loop = parseInt(_0x3d5eb9("#macro-add-move-loop-input").val());
                    if (current_edit_macro.mouse_key_loop <= 0x0) {
                      current_edit_macro.mouse_key_loop = 0x1;
                    }
                  } else {
                    if (_0x268a10 == 0x405) {
                      current_edit_macro.mouse_key_event = 0x2ff;
                      var _0xf6f301 = parseInt(_0x3d5eb9("#macro-add-position-x-input").val());
                      var _0x16b81a = parseInt(_0x3d5eb9("#macro-add-position-y-input").val());
                      var _0x4b1bb5 = window.screen.width;
                      var _0x1d190b = window.screen.height;
                      _0xf6f301 = parseInt((_0xf6f301 + 0.9) * 0xffff / _0x4b1bb5);
                      _0x16b81a = parseInt((_0x16b81a + 0.9) * 0xffff / _0x1d190b);
                      current_edit_macro.mouse_key_code = _0xf6f301 << 0x10 | _0x16b81a;
                    } else {
                      current_edit_macro.mouse_key_code = _0x268a10;
                      if (_0x3d5eb9("[name=\"mapping-macro-action-key-event\"]")[0x0].checked) {
                        current_edit_macro.mouse_key_event = 0x100;
                      } else if (_0x3d5eb9("[name=\"mapping-macro-action-key-event\"]")[0x1].checked) {
                        current_edit_macro.mouse_key_event = 0x101;
                      } else {
                        current_edit_macro.mouse_key_event = 0x0;
                      }
                    }
                  }
                }
              }
            }
          }
          current_edit_macro.name = get_key_name_from_code(_0x268a10);
          if (current_edit_macro.mouse_key_time == 0x0 && current_edit_macro.mouse_key_code > 0x0) {
            current_edit_macro.mouse_key_time = 0x1;
          }
          if (macro_edit_index < 0x0) {
            edit_macros.push(current_edit_macro);
          } else {
            edit_macros[macro_edit_index] = current_edit_macro;
          }
          kbd_ui_macro_edit_init(current_usb_client);
        }
      });
    }
  });
  _0x3f4986.on('kbd-macro-clear-action', {
    'select': async function () {
      edit_macros = [];
      kbd_ui_macro_edit_init(current_usb_client);
    }
  });
  _0x3f4986.on("kbd-macro-save-action", {
    'select': async function () {
      _0x2a0d7b.closeLast(0x0);
      if (kbd_macro_select_index >= 0x0) {
        kbd_macro_infos[kbd_macro_select_index] = [];
        for (var _0x4223f3 = 0x0; _0x4223f3 < edit_macros.length; _0x4223f3++) {
          kbd_macro_infos[kbd_macro_select_index].push(clone_macro_info(edit_macros[_0x4223f3]));
        }
        var _0x1ed70e = 0x0;
        for (var _0x4223f3 = 0x0; _0x4223f3 < kbd_macro_infos.length; _0x4223f3++) {
          var _0x526e7e = kbd_macro_infos[_0x4223f3];
          if (_0x526e7e.length > 0x0) {
            for (var _0x551c39 = 0x0; _0x551c39 < _0x526e7e.length; _0x551c39++) {
              var _0x2206c9 = _0x526e7e[_0x551c39];
              var _0x5b2812 = get_keyid_from_code(_0x2206c9.mouse_key_code);
              if (_0x2206c9.mouse_key_event == 0x100) {
                _0x1ed70e = 0x1;
                macroBuff.push(_0x1ed70e);
                _0x1ed70e = 0x2;
                macroBuff.push(_0x1ed70e);
                _0x1ed70e = _0x5b2812 & 0xff;
                macroBuff.push(_0x1ed70e);
                _0x1ed70e = 0x1;
                macroBuff.push(_0x1ed70e);
                _0x1ed70e = 0x4;
                macroBuff.push(_0x1ed70e);
                var _0x52f46e = _0x2206c9.mouse_key_time.toString();
                for (var _0x2fec69 = 0x0; _0x2fec69 < _0x52f46e.length; _0x2fec69++) {
                  _0x1ed70e = _0x52f46e[_0x2fec69].charCodeAt();
                  macroBuff.push(_0x1ed70e);
                }
                _0x1ed70e = 0x1;
                macroBuff.push(_0x1ed70e);
              } else {
                _0x1ed70e = 0x1;
                macroBuff.push(_0x1ed70e);
                _0x1ed70e = 0x3;
                macroBuff.push(_0x1ed70e);
                _0x1ed70e = _0x5b2812 & 0xff;
                macroBuff.push(_0x1ed70e);
                _0x1ed70e = 0x1;
                macroBuff.push(_0x1ed70e);
                _0x1ed70e = 0x4;
                macroBuff.push(_0x1ed70e);
                var _0x52f46e = _0x2206c9.mouse_key_time.toString();
                for (var _0x2fec69 = 0x0; _0x2fec69 < _0x52f46e.length; _0x2fec69++) {
                  _0x1ed70e = _0x52f46e[_0x2fec69].charCodeAt();
                  macroBuff.push(_0x1ed70e);
                }
                _0x1ed70e = 0x1;
                macroBuff.push(_0x1ed70e);
              }
            }
          }
          _0x1ed70e = 0x0;
          macroBuff.push(_0x1ed70e);
        }
        log_r(macroBuff);
        if (macroBuff.length > current_usb_client.device_info.kbd_macro_max_size) {
          _0x2a0d7b.msg(layui.i18np.prop("STRID_SETTING_MAPPING_MACRO_RECORD_MAX_EX"), {
            'icon': 0x0
          }, function () {});
          return true;
        }
        show_waiting();
        hs_set_macro_buf(current_usb_client, kbd_macro_infos);
        kbd_ui_macro_init(current_usb_client);
      }
    }
  });
  if (platform.os.family.indexOf("Windows") >= 0x0 && parseFloat(platform.os.version) <= 6.1) {
    document.getElementById("rawmhub-url").href = "https://static.miracletek.net/pc/RAWMHUB_WIN7.zip";
  } else {
    document.getElementById("rawmhub-url").href = 'https://static.miracletek.net/pc/RAWMHUB.zip';
  }
  _0x1435f3.render();
  clearTimeout(resize_timer_id);
  resize_timer_id = setTimeout(do_resize, 0xfa);
});
