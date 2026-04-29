function ui_select_key_init() {
  var len = kbd_select_keys;
  var html = "<div class=\"layui-row\" style=\"margin-top: 10px;\">";
  for (let index = 0x0; index < len.length; index++) {
    var value = len[index].name;
    var value2 = len[index].rect;
    var x = value2[0x0];
    var value3 = value2[0x1];
    var value4 = value2[0x2];
    var value5 = value2[0x3];
    html += "<div class=\"layui-col-xs3\" style=\"width:" + value4 + "px; height:" + value5 + "px; margin-left:" + x + "px; margin-top:" + value3 + "px; \">";
    html += "<a kbd-select-key-index=\"" + index + "\" kbd-select-key-action=\"select\" style=\"cursor: pointer;\">";
    html += "<div style=\"width:" + value4 + "px; height:" + value5 + "px;\">";
    html += "<div class=\"layui-hover-bg\" style=\"display: flex; justify-content: center; align-items: center; position: absolute; width:" + value4 + "px; height:" + value5 + "px;\">";
    " ";
    html += "<p style=\"font-size: smaller;color:white;text-align: center;\" >" + value + "</p>";
    html += '</div>';
    html += '</div>';
    html += '</a>';
    html += "</div>";
    if (index == 0xf || index == 0x24 || index == 0x39 || index == 0x49 || index == 0x59) {
      html += "</div><div class=\"layui-row\">";
    }
  }
  ;
  html += "</div>";
  $("#select-key-container").html(html);
  var len2 = mouse_select_keys;
  html = "<div class=\"layui-row\" style=\"margin-top: 10px;\">";
  for (let offset = 0x0; offset < len2.length; offset++) {
    var value = len2[offset].name;
    var value2 = len2[offset].rect;
    var x = value2[0x0];
    var value3 = value2[0x1];
    var value4 = value2[0x2];
    var value5 = value2[0x3];
    html += "<div class=\"layui-col-xs3\" style=\"width:" + value4 + "px; height:" + value5 + "px; margin-left:" + x + "px; margin-top:" + value3 + "px; \">";
    html += "<a mouse-select-key-index=\"" + offset + "\" mouse-select-key-action=\"select\" style=\"cursor: pointer;\">";
    html += "<div style=\"width:" + value4 + "px; height:" + value5 + "px;\">";
    html += "<div class=\"layui-hover-bg\" style=\"position: absolute; width:" + value4 + "px; height:" + value5 + "px;\">";
    " ";
    html += "<p style=\"font-size: small;color:white;text-align: center;margin-top: 8px;\" >" + value + "</p>";
    html += "</div>";
    html += "</div>";
    html += "</a>";
    html += '</div>';
  }
  ;
  html += "</div>";
  $("#mouse-select-key-container").html(html);
}
function dialog_select_key_init(client) {
  var len = kbd_select_keys;
  var html = "<div class=\"layui-row\" style=\"margin-top: 10px;\">";
  for (let index = 0x0; index < len.length; index++) {
    var value = len[index].name;
    var value2 = len[index].rect;
    var x = value2[0x0];
    var value3 = value2[0x1];
    var value4 = value2[0x2];
    var value5 = value2[0x3];
    html += "<div class=\"layui-col-xs3\" style=\"width:" + value4 + "px; height:" + value5 + "px; margin-left:" + x + "px; margin-top:" + value3 + "px; \">";
    html += "<a kbd-select-key-index=\"" + index + "\" elementId=\"" + client + "\" dialog-select-key-action=\"select\" style=\"cursor: pointer;\">";
    html += "<div style=\"width:" + value4 + "px; height:" + value5 + "px;\">";
    html += "<div class=\"layui-hover-bg\" style=\"display: flex; justify-content: center; align-items: center; position: absolute; width:" + value4 + "px; height:" + value5 + "px;\">";
    " ";
    html += "<p style=\"font-size: smaller;color:white;text-align: center;\" >" + value + '</p>';
    html += "</div>";
    html += "</div>";
    html += "</a>";
    html += '</div>';
    if (index == 0xf || index == 0x24 || index == 0x39 || index == 0x49 || index == 0x59) {
      html += "</div><div class=\"layui-row\">";
    }
  }
  ;
  html += '</div>';
  $("#dialog-select-key-container").html(html);
  var len2 = mouse_select_keys;
  html = "<div class=\"layui-row\" style=\"margin-top: 10px;\">";
  for (let offset = 0x0; offset < len2.length; offset++) {
    if (client == "kbd-macro-add-select-key") {
      if (offset > 0x2) {
        break;
      }
    }
    var value = len2[offset].name;
    var value2 = len2[offset].rect;
    var x = value2[0x0];
    var value3 = value2[0x1];
    var value4 = value2[0x2];
    var value5 = value2[0x3];
    html += "<div class=\"layui-col-xs3\" style=\"width:" + value4 + "px; height:" + value5 + "px; margin-left:" + x + "px; margin-top:" + value3 + "px; \">";
    html += "<a mouse-select-key-index=\"" + offset + "\"  elementId=\"" + client + "\" dialog-mouse-select-key-action=\"select\" style=\"cursor: pointer;\">";
    html += "<div style=\"width:" + value4 + "px; height:" + value5 + "px;\">";
    html += "<div class=\"layui-hover-bg\" style=\"position: absolute; width:" + value4 + "px; height:" + value5 + "px;\">";
    " ";
    html += "<p style=\"font-size: small;color:white;text-align: center;margin-top: 8px;\" >" + value + "</p>";
    html += "</div>";
    html += "</div>";
    html += "</a>";
    html += "</div>";
  }
  ;
  html += '</div>';
  $("#dialog-mouse-select-key-container").html(html);
}
function kbd_ui_refresh_onboard_config(client) {
  var layui2 = layui.$;
  var layui3 = layui.form;
  var html = "<select name=\"kbd_onboard-config\" lay-verify=\"required\" lay-filter=\"kbd_onboard-config\">";
  var value = client.device_info.onboardIndex;
  var value2 = client.device_info.kbd_onboardNum;
  for (let len = 0x0; len < value2; len++) {
    html += "<option value=\"" + len + "\">" + layui.i18np.prop("STRID_SETTING_CONFIG_CURRENT") + NUMBERS[len + 0x1] + '</option>';
  }
  html += "</select>";
  layui2("#kbd-setting-onboard-config").html(html);
  layui2("[name=\"kbd_onboard-config\"]").val(value);
  layui3.render('select');
}
function kbd_ui_refresh_key_matrix(client) {
  var value = 0xd;
  if (is_keyboard_5_15(client.device)) {
    value = 0xe;
  }
  var html = "<div class=\"layui-row\" style=\"margin-top: 10px;\">";
  for (let len = 0x0; len < kbd_key_infos.length; len++) {
    var value2 = kbd_key_infos[len].name;
    var value3 = kbd_key_infos[len].rect;
    var x = value3[0x0];
    var value4 = value3[0x1];
    var value5 = value3[0x2];
    var value6 = value3[0x3];
    html += "<div class=\"layui-col-xs3\" style=\"width:" + value5 + "px; height:" + value6 + "px; margin-left:" + x + "px; margin-top:" + value4 + "px; \">";
    html += "<a kbd-key-matrix-index=\"" + len + "\"kbd-key-matrix-action=\"select\" style=\"cursor: pointer;\">";
    html += "<div style=\"width:" + value5 + "px; height:" + value6 + "px;\">";
    html += "<div class=\"layui-hover-bg-trans\" style=\"display: flex; justify-content: center; align-items: center; position: absolute; width:" + value5 + "px; height:" + value6 + "px;\">";
    " ";
    if (is_keyboard_5_15(client.device)) {
      html += "<p style=\"user-select: none;font-size: smaller;color:white;text-align: center;\" >" + value2 + '</p>';
    } else {
      html += "<p style=\"user-select: none;font-size: small;color:white;text-align: center;\" >" + value2 + "</p>";
    }
    html += "</div>";
    if (kbd_key_matrix_index == len) {
      html += "<div class=\"layui-key-select-red\" style=\"position: absolute; width:" + (value5 - 0x3) + "px; height:" + (value6 - 0x3) + "px;\">";
      " ";
      html += "</div>";
    }
    html += '</div>';
    html += '</a>';
    html += "</div>";
    if (len == value) {
      html += "</div><div class=\"layui-row\">";
    }
  }
  ;
  html += "</div>";
  $('#kbd-mapping-key-container').html(html);
}
function kbd_ui_refresh_key_desc(client) {
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
function kbd_ui_key_setting_init(client) {
  var len = kbd_select_keys;
  var html = "<div class=\"layui-row\" style=\"margin-top: 10px;\">";
  for (let index = 0x0; index < len.length; index++) {
    var value = len[index].name;
    var value2 = len[index].rect;
    var x = value2[0x0];
    var value3 = value2[0x1];
    var value4 = value2[0x2];
    var value5 = value2[0x3];
    html += "<div class=\"layui-col-xs3\" style=\"width:" + value4 + "px; height:" + value5 + "px; margin-left:" + x + "px; margin-top:" + value3 + "px; \">";
    html += "<a kbd-select-key-index=\"" + index + "\"kbd-select-key-action=\"select\" style=\"cursor: pointer;\">";
    html += "<div style=\"width:" + value4 + "px; height:" + value5 + "px;\">";
    html += "<div class=\"layui-hover-bg\" style=\"display: flex; justify-content: center; align-items: center; position: absolute; width:" + value4 + "px; height:" + value5 + "px;\">";
    " ";
    html += "<p style=\"user-select: none;font-size: smaller;color:white;text-align: center;\" >" + value + "</p>";
    html += "</div>";
    html += "</div>";
    html += "</a>";
    html += "</div>";
    if (index == 0xf || index == 0x24 || index == 0x39 || index == 0x49 || index == 0x59) {
      html += "</div><div class=\"layui-row\">";
    }
  }
  ;
  html += "</div>";
  $("#select-key-container").html(html);
  var len2 = mouse_select_keys;
  html = "<div class=\"layui-row\" style=\"margin-top: 10px;\">";
  for (let offset = 0x0; offset < len2.length; offset++) {
    var value = len2[offset].name;
    var value2 = len2[offset].rect;
    var x = value2[0x0];
    var value3 = value2[0x1];
    var value4 = value2[0x2];
    var value5 = value2[0x3];
    html += "<div class=\"layui-col-xs3\" style=\"width:" + value4 + "px; height:" + value5 + "px; margin-left:" + x + "px; margin-top:" + value3 + "px; \">";
    html += "<a mouse-select-key-index=\"" + offset + "\"mouse-select-key-action=\"select\" style=\"cursor: pointer;\">";
    html += "<div style=\"width:" + value4 + "px; height:" + value5 + "px;\">";
    html += "<div class=\"layui-hover-bg\" style=\"position: absolute; width:" + value4 + "px; height:" + value5 + "px;\">";
    " ";
    html += "<p style=\"user-select: none;font-size: small;color:white;text-align: center;margin-top: 8px;\" >" + value + "</p>";
    html += '</div>';
    html += "</div>";
    html += "</a>";
    html += "</div>";
  }
  ;
  html += "</div>";
  $('#mouse-select-key-container').html(html);
}
function kbd_ui_function_setting_init(client) {
  var len = kbd_rgb_keys;
  html = "<div class=\"layui-row\" style=\"margin-top: 10px;\">";
  for (let index = 0x0; index < len.length; index++) {
    var value = len[index].name;
    var value2 = len[index].rect;
    var x = value2[0x0];
    var value3 = value2[0x1];
    var value4 = value2[0x2];
    var value5 = value2[0x3];
    html += "<div class=\"layui-col-xs3\" style=\"width:" + value4 + "px; height:" + value5 + "px; margin-left:" + x + "px; margin-top:" + value3 + "px; \">";
    html += "<a kbd-key-rgb-index=\"" + index + "\"kbd-key-rgb-action=\"select\" style=\"cursor: pointer;\">";
    html += "<div style=\"width:" + value4 + "px; height:" + value5 + "px;\">";
    html += "<div class=\"layui-hover-bg\" style=\"position: absolute; width:" + value4 + "px; height:" + value5 + "px;\">";
    " ";
    html += "<p style=\"user-select: none;font-size: small;color:white;text-align: center;margin-top: 8px;\" >" + value + "</p>";
    html += "</div>";
    html += '</div>';
    html += "</a>";
    html += "</div>";
  }
  ;
  html += "</div>";
  $('#kbd-key-rgb-container').html(html);
  var len2 = kbd_media_keys;
  html = "<div class=\"layui-row\" style=\"margin-top: 10px;\">";
  for (let offset = 0x0; offset < len2.length; offset++) {
    var value = len2[offset].name;
    var value2 = len2[offset].rect;
    var x = value2[0x0];
    var value3 = value2[0x1];
    var value4 = value2[0x2];
    var value5 = value2[0x3];
    html += "<div class=\"layui-col-xs3\" style=\"width:" + value4 + "px; height:" + value5 + "px; margin-left:" + x + "px; margin-top:" + value3 + "px; \">";
    html += "<a kbd-key-media-index=\"" + offset + "\"kbd-key-media-action=\"select\" style=\"cursor: pointer;\">";
    html += "<div style=\"width:" + value4 + "px; height:" + value5 + "px;\">";
    html += "<div class=\"layui-hover-bg\" style=\"position: absolute; width:" + value4 + "px; height:" + value5 + "px;\">";
    " ";
    html += "<p style=\"user-select: none;font-size: small;color:white;text-align: center;margin-top: 8px;\" >" + value + '</p>';
    html += "</div>";
    html += '</div>';
    html += "</a>";
    html += '</div>';
  }
  ;
  html += "</div>";
  $("#kbd-key-media-container").html(html);
  var len3 = kbd_windows_keys;
  html = "<div class=\"layui-row\" style=\"margin-top: 10px;\">";
  for (let count = 0x0; count < len3.length; count++) {
    var value = len3[count].name;
    var value2 = len3[count].rect;
    var x = value2[0x0];
    var value3 = value2[0x1];
    var value4 = value2[0x2];
    var value5 = value2[0x3];
    html += "<div class=\"layui-col-xs3\" style=\"width:" + value4 + "px; height:" + value5 + "px; margin-left:" + x + "px; margin-top:" + value3 + "px; \">";
    html += "<a kbd-key-windows-index=\"" + count + "\"kbd-key-windows-action=\"select\" style=\"cursor: pointer;\">";
    html += "<div style=\"width:" + value4 + "px; height:" + value5 + "px;\">";
    html += "<div class=\"layui-hover-bg\" style=\"position: absolute; width:" + value4 + "px; height:" + value5 + "px;\">";
    " ";
    html += "<p style=\"user-select: none;font-size: small;color:white;text-align: center;margin-top: 8px;\" >" + value + "</p>";
    html += '</div>';
    html += "</div>";
    html += '</a>';
    html += "</div>";
  }
  ;
  html += "</div>";
  $("#kbd-key-windows-container").html(html);
}
function kbd_ui_macro_init(client) {
  var layui2 = layui.$;
  var html = "<table>";
  html += "<tr>";
  for (let len = 0x0; len < kbd_macro_infos.length; len++) {
    var value = kbd_macro_infos[len];
    html += "<td style=\"padding-top: 5px;\">";
    html += "<a kbd-macro-item-index=\"" + len + "\"kbd-macro-item-action=\"select\" style=\"cursor: pointer;\">";
    if (kbd_macro_select_index == len) {
      html += "<div style=\"width: 104px;height: 68px;margin-left: 5px;background-color: #16B777;\">";
    } else {
      html += "<div style=\"width: 104px;height: 68px;margin-left: 5px;background-color: #202020;\">";
    }
    html += "<div class=\"layui-setting-title-container\" style=\"height: 50%;\">";
    html += "<p style=\"width: 104px;color: white;margin-top: 6px;text-align: center;\">M" + (len + 0x1) + "</p>";
    html += "</div>";
    html += "<div class=\"layui-setting-title-container\" style=\"height: 50%;\">";
    if (kbd_macro_select_index == len) {
      html += "<p style=\"width: 104px;color: white; text-align: center;\">" + value.length + " " + layui.i18np.prop('STRID_SETTING_MACRO_ACTIONGS') + "</p>";
    } else {
      html += "<p style=\"width: 104px;color: gray; text-align: center;\">" + value.length + " " + layui.i18np.prop("STRID_SETTING_MACRO_ACTIONGS") + "</p>";
    }
    html += '</div>';
    html += "</div>";
    html += "</a>";
    html += "</td>";
    if ((len + 0x1) % 0x4 == 0x0) {
      html += '</tr><tr>';
    }
  }
  ;
  html += "</tr>";
  html += "</table>";
  layui2("#kbd-macro-container").html(html);
}
function kbd_ui_macro_edit_init(client) {
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
  var layui2 = layui.$;
  var html = "<table>";
  html += "<tr>";
  for (let len = 0x0; len < edit_macros.length; len++) {
    var value = edit_macros[len];
    html += "<td style=\"padding-top: 3px;\">";
    html += "<a macro-edit-item-index=\"" + len + "\" macro-edit-item-action=\"select\" style=\"cursor: pointer;\">";
    if (is_dark_theme()) {
      html += "<div style=\"width: 110px;height: 60px;margin-left: 3px;background-color: #202020;\">";
    } else {
      html += "<div style=\"width: 110px;height: 60px;margin-left: 3px;background-color: gray;\">";
    }
    html += "<div class=\"layui-setting-title-container\" style=\"height: 50%;\">";
    if (value.mouse_key_event == 0x20a) {
      if (value.mouse_key_code > 0x0) {
        html += "<img src=\"" + RESOURCE_URL + "setting/mkey_up.png\" style=\"width: 20px;height: 22px; margin:4px;\"/>";
        html += "<p style=\"color: white;margin-top: 6px;\">" + layui.i18np.prop("STRID_KEY_WHELL_UP_S") + '<br>' + value.mouse_key_code + "</p>";
      } else {
        html += "<img src=\"" + RESOURCE_URL + "setting/mkey_down.png\" style=\"width: 20px;height: 22px; margin:4px;\"/>";
        html += "<p style=\"color: white;margin-top: 6px;\">" + layui.i18np.prop("STRID_KEY_WHELL_DOWN_S") + "<br>" + Math.abs(value.mouse_key_code) + "</p>";
      }
    } else {
      if (value.mouse_key_event == 0x20e) {
        if (value.mouse_key_code < 0x0) {
          html += "<img src=\"" + RESOURCE_URL + "setting/mkey_up.png\" style=\"width: 20px;height: 22px; margin:4px;\"/>";
          html += "<p style=\"color: white;margin-top: 6px;\">" + layui.i18np.prop("STRID_KEY_WHELL_LEFT_S") + '<br>' + Math.abs(value.mouse_key_code) + "</p>";
        } else {
          html += "<img src=\"" + RESOURCE_URL + "setting/mkey_down.png\" style=\"width: 20px;height: 22px; margin:4px;\"/>";
          html += "<p style=\"color: white;margin-top: 6px;\">" + layui.i18np.prop('STRID_KEY_WHELL_RIGHT_S') + "<br>" + value.mouse_key_code + "</p>";
        }
      } else {
        if (value.mouse_key_event == 0x200) {
          html += "<img src=\"" + RESOURCE_URL + "setting/mkey_move.png\" style=\"width: 20px;height: 22px; margin:4px;\"/>";
          var value2 = value.mouse_key_code >> 0x10 & 0xffff;
          var value3 = value.mouse_key_code & 0xffff;
          html += "<p style=\"color: white;margin-top: 6px;\">" + layui.i18np.prop("STRID_KEY_MOUSE_MOVE_S") + '<br>' + (value2 - 0x7ff) / 0xa + ':' + (value3 - 0x7ff) / 0xa + "</p>";
        } else {
          if (value.mouse_key_event == 0x2ff) {
            html += "<img src=\"" + RESOURCE_URL + "setting/mkey_position.png\" style=\"width: 20px;height: 22px; margin:4px;\"/>";
            var screenW = window.screen.width;
            var screenH = window.screen.height;
            var value4 = value.mouse_key_code >> 0x10 & 0xffff;
            var value5 = value.mouse_key_code & 0xffff;
            value4 = parseInt(value4 * screenW / 0xffff);
            value5 = parseInt(value5 * screenH / 0xffff);
            html += "<p style=\"color: white;margin-top: 6px;\">" + layui.i18np.prop("STRID_KEY_MOUSE_POSITION_S") + "<br>" + value4 + ':' + value5 + "</p>";
          } else if (value.mouse_key_code == 0x0) {
            html += "<p style=\"color: white;margin-left:4px;\">" + get_key_name_from_code(value.mouse_key_code) + "</p>";
          } else if (value.mouse_key_event == 0x101) {
            if (value.mouse_key_code >= 0xff && value.mouse_key_code < 0x200) {
              html += "<img src=\"" + RESOURCE_URL + "setting/mkey_up.png\" style=\"width: 20px;height: 22px; margin:4px;\"/>";
            } else {
              html += "<img src=\"" + RESOURCE_URL + "setting/key_up.png\" style=\"width: 20px;height: 22px; margin:4px;\"/>";
            }
            html += "<p style=\"color: white;margin-top: 6px;\">" + get_key_name_from_code(value.mouse_key_code) + "</p>";
          } else {
            if (value.mouse_key_code >= 0xff && value.mouse_key_code < 0x200) {
              html += "<img src=\"" + RESOURCE_URL + "setting/mkey_down.png\" style=\"width: 20px;height: 22px; margin:4px;\"/>";
            } else {
              html += "<img src=\"" + RESOURCE_URL + "setting/key_down.png\" style=\"width: 20px;height: 22px; margin:4px;\"/>";
            }
            html += "<p style=\"color: white;margin-top: 6px;\">" + get_key_name_from_code(value.mouse_key_code) + "</p>";
          }
        }
      }
    }
    html += "</div>";
    html += "<div class=\"layui-setting-title-container\" style=\"height: 50%;\">";
    html += "<img src=\"" + RESOURCE_URL + "setting/key_waiting.png\" style=\"width: 18px;height: 20px; margin:4px;\"/>";
    if (value.mouse_key_event == 0x200 && value.mouse_key_loop > 0x1) {
      html += "<p style=\"color: white;\">" + value.mouse_key_time + 'x' + value.mouse_key_loop + " " + layui.i18np.prop("STRID_SETTING_MAPPING_MACRO_ACTION_KEEP_TIME_MS") + "</p>";
    } else {
      html += "<p style=\"color: white;\">" + value.mouse_key_time + " " + layui.i18np.prop("STRID_SETTING_MAPPING_MACRO_ACTION_KEEP_TIME_MS") + "</p>";
    }
    html += "</div>";
    html += "</div>";
    html += "</a>";
    html += "</td>";
    if ((len + 0x1) % 0x7 == 0x0) {
      html += "</tr><tr>";
    }
  }
  ;
  html += '</tr>';
  html += "</table>";
  layui2('#kbd-macro-edit-container').html(html);
}
function create_light_mode_info(client, value) {
  var info = {
    mode: client,
    name: value
  };
  return info;
}
function kbd_ui_refresh_light_mode(client) {
  var layui2 = layui.$;
  var layui3 = layui.form;
  kbd_light_mode.splice(0x0, kbd_light_mode.length);
  kbd_light_mode.push(create_light_mode_info(0x0, layui.i18np.prop('STRID_CLOSE')));
  kbd_light_mode.push(create_light_mode_info(0x2d, layui.i18np.prop("STRID_KBD_LIGHT_MODE_DEFINE")));
  for (var offset = 0x1; offset < 0x19; offset++) {
    kbd_light_mode.push(create_light_mode_info(offset, layui.i18np.prop("STRID_KBD_LIGHT_MODE" + offset)));
  }
  kbd_light_mode.push(create_light_mode_info(0x1c, layui.i18np.prop("STRID_KBD_LIGHT_MODE" + 0x1c)));
  kbd_light_mode.push(create_light_mode_info(0x1d, layui.i18np.prop("STRID_KBD_LIGHT_MODE" + 0x1d)));
  kbd_light_mode.push(create_light_mode_info(0x1e, layui.i18np.prop("STRID_KBD_LIGHT_MODE" + 0x1e)));
  var html = "<select name=\"kbd-light-mode\" lay-verify=\"required\" lay-filter=\"kbd-light-mode\">";
  for (let len = 0x0; len < kbd_light_mode.length; len++) {
    html += "<option value=\"" + len + "\">" + (len + 0x1 + ". " + kbd_light_mode[len].name) + "</option>";
  }
  html += "</select>";
  layui2("#kbd-light-mode-container").html(html);
  layui2("[name=\"kbd-light-mode\"]").val(0xd);
  for (var offset = 0x0; offset < kbd_light_mode.length; offset++) {
    if (kbd_light_mode[offset].mode == kbd_edit_info.mode) {
      layui2("[name=\"kbd-light-mode\"]").val(offset);
      break;
    }
  }
  kbd_sleep_time.splice(0x0, kbd_light_mode.length);
  kbd_sleep_time.push(create_light_mode_info(0x0, layui.i18np.prop('STRID_KBD_LIGHT_SLEEP_TIME1')));
  kbd_sleep_time.push(create_light_mode_info(0x12c, layui.i18np.prop("STRID_KBD_LIGHT_SLEEP_TIME2")));
  kbd_sleep_time.push(create_light_mode_info(0x384, layui.i18np.prop("STRID_KBD_LIGHT_SLEEP_TIME3")));
  kbd_sleep_time.push(create_light_mode_info(0x708, layui.i18np.prop("STRID_KBD_LIGHT_SLEEP_TIME4")));
  kbd_sleep_time.push(create_light_mode_info(0xe10, layui.i18np.prop("STRID_KBD_LIGHT_SLEEP_TIME5")));
  var html = "<select name=\"kbd-light-sleep-time\" lay-verify=\"required\" lay-filter=\"kbd-light-sleep-time\">";
  for (let index = 0x0; index < kbd_sleep_time.length; index++) {
    html += "<option value=\"" + index + "\">" + (index + 0x1 + ". " + kbd_sleep_time[index].name) + "</option>";
  }
  html += "</select>";
  layui2('#kbd-light-sleep-time-container').html(html);
  layui2("[name=\"kbd-light-sleep-time\"]").val(0x0);
  for (var offset = 0x0; offset < kbd_sleep_time.length; offset++) {
    if (kbd_sleep_time[offset].mode == kbd_edit_info.sleep_time) {
      layui2("[name=\"kbd-light-sleep-time\"]").val(offset);
      break;
    }
  }
  layui3.render('select');
}
function kbd_ui_refresh_light(client) {
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
  var value = hsvToRgb(kbd_edit_info.hue, kbd_edit_info.sat, Math.floor(0xff * kbd_edit_info.brightness / 0x64));
  if (kbd_edit_info.mode == 0x2d && kbd_matrix_select_keys.length > 0x0) {
    value = hsvToRgb(kbd_matrix_select_keys[0x0].hue, kbd_matrix_select_keys[0x0].sat, Math.floor(0xff * kbd_edit_info.brightness / 0x64));
  }
  document.getElementById("pick-color").value = rgbToHex(value.r, value.g, value.b);
  $('#color-r-input').val(value.r);
  $('#color-g-input').val(value.g);
  $("#color-b-input").val(value.b);
  var layui2 = layui.slider;
  var value2 = layui2.render({
    'elem': "#kbd-light-global-brightness",
    'min': 0x0,
    'max': 0x64,
    'step': 0x1,
    'value': kbd_edit_info.brightness,
    'input': true,
    'tips': false,
    'disabled': !!(kbd_edit_info.mode == 0x0),
    'theme': theme_color,
    'done': function (result) {
      if (kbd_edit_info.brightness != result) {
        kbd_edit_info.brightness = result;
        hs_set_light(current_usb_client, 0x1, kbd_edit_info);
      }
    }
  });
  value2.setValue(kbd_edit_info.brightness);
  value2 = layui2.render({
    'elem': "#kbd-light-global-speed",
    'min': 0x0,
    'max': 0x64,
    'step': 0x1,
    'value': kbd_edit_info.speed,
    'input': true,
    'tips': false,
    'disabled': !!(kbd_edit_info.mode == 0x0 || kbd_edit_info.mode == 0x1 || kbd_edit_info.mode == 0x2d),
    'theme': theme_color,
    'done': function (result) {
      if (kbd_edit_info.speed != result) {
        kbd_edit_info.speed = result;
        hs_set_light(current_usb_client, 0x3, kbd_edit_info);
      }
    }
  });
  value2.setValue(kbd_edit_info.speed);
  kbd_ui_refresh_light_mode(client);
}
function kbd_ui_refresh_light_box_mode(client) {
  var layui2 = layui.$;
  var layui3 = layui.form;
  kbd_light_mode.splice(0x0, kbd_light_mode.length);
  kbd_light_mode.push(create_light_mode_info(0x0, layui.i18np.prop('STRID_CLOSE')));
  kbd_light_mode.push(create_light_mode_info(0x1, layui.i18np.prop("STRID_KBD_LIGHT_BOX_MODE1")));
  kbd_light_mode.push(create_light_mode_info(0x2, layui.i18np.prop('STRID_KBD_LIGHT_BOX_MODE2')));
  kbd_light_mode.push(create_light_mode_info(0x3, layui.i18np.prop('STRID_KBD_LIGHT_BOX_MODE3')));
  kbd_light_mode.push(create_light_mode_info(0x4, layui.i18np.prop("STRID_KBD_LIGHT_BOX_MODE4")));
  var html = "<select name=\"kbd-light-box-mode\" lay-verify=\"required\" lay-filter=\"kbd-light-box-mode\">";
  for (let len = 0x0; len < kbd_light_mode.length; len++) {
    html += "<option value=\"" + len + "\">" + (len + 0x1 + ". " + kbd_light_mode[len].name) + "</option>";
  }
  html += "</select>";
  layui2('#kbd-light-box-mode-container').html(html);
  layui2("[name=\"kbd-light-box-mode\"]").val(0x1);
  for (var index = 0x0; index < kbd_light_mode.length; index++) {
    if (kbd_light_mode[index].mode == kbd_edit_info.light_box_info.mode) {
      layui2("[name=\"kbd-light-box-mode\"]").val(index);
      break;
    }
  }
  layui3.render("select");
}
function kbd_ui_refresh_light_box(client) {
  document.getElementById('kbd-light-wasd').disabled = true;
  document.getElementById('kbd-light-select-all').disabled = true;
  document.getElementById("kbd-light-reverse-all").disabled = true;
  document.getElementById("kbd-light-clear").disabled = true;
  $("[name=\"kbd-light-box-colored\"]").prop('checked', kbd_edit_info.light_box_info.colored == 0x1);
  var info = {
    'r': kbd_edit_info.light_box_info.r,
    'g': kbd_edit_info.light_box_info.g,
    'b': kbd_edit_info.light_box_info.b
  };
  document.getElementById("light-box-pick-color").value = rgbToHex(info.r, info.g, info.b);
  $("#light-box-color-r-input").val(info.r);
  $("#light-box-color-g-input").val(info.g);
  $("#light-box-color-b-input").val(info.b);
  var layui2 = layui.slider;
  var value = layui2.render({
    'elem': "#kbd-light-box-global-brightness",
    'min': 0x0,
    'max': 0x64,
    'step': 0x1,
    'value': kbd_edit_info.light_box_info.brightness,
    'input': true,
    'tips': false,
    'theme': theme_color,
    'done': function (result) {
      if (kbd_edit_info.light_box_info.brightness != result) {
        kbd_edit_info.light_box_info.brightness = result;
        hs_set_light_box(current_usb_client, kbd_edit_info.light_box_info);
      }
    }
  });
  value.setValue(kbd_edit_info.light_box_info.brightness);
  value = layui2.render({
    'elem': "#kbd-light-box-global-speed",
    'min': 0x0,
    'max': 0x64,
    'step': 0x1,
    'value': kbd_edit_info.light_box_info.speed,
    'input': true,
    'tips': false,
    'theme': theme_color,
    'done': function (result) {
      if (kbd_edit_info.light_box_info.speed != result) {
        kbd_edit_info.light_box_info.speed = result;
        hs_set_light_box(current_usb_client, kbd_edit_info.light_box_info);
      }
    }
  });
  value.setValue(kbd_edit_info.light_box_info.speed);
  kbd_ui_refresh_light_box_mode(client);
}
function changeColor() {
  if (kbd_edit_info.mode == 0x0) {
    return;
  }
  var el = document.getElementById("pick-color");
  var value = '0x' + el.value.substring(0x1);
  var value2 = Number(value);
  var value3 = value2 >> 0x10 & 0xff;
  var value4 = value2 >> 0x8 & 0xff;
  var value5 = value2 & 0xff;
  var value6 = rgbToHsv(value3, value4, value5);
  $("#color-r-input").val(value3);
  $('#color-g-input').val(value4);
  $("#color-b-input").val(value5);
  if (kbd_edit_info.hue != value6.h || kbd_edit_info.sat != value6.s) {
    kbd_edit_info.hue = value6.h;
    kbd_edit_info.sat = value6.s;
    if (kbd_edit_info.mode != 0x0 && kbd_edit_info.mode != 0x2d) {
      hs_set_light(current_usb_client, 0x4, kbd_edit_info);
    }
  }
}
function light_box_changeColor() {
  var el = document.getElementById('light-box-pick-color');
  var value = '0x' + el.value.substring(0x1);
  var value2 = Number(value);
  var value3 = value2 >> 0x10 & 0xff;
  var value4 = value2 >> 0x8 & 0xff;
  var value5 = value2 & 0xff;
  $("#light-box-color-r-input").val(value3);
  $('#light-box-color-g-input').val(value4);
  $("#light-box-color-b-input").val(value5);
  if (kbd_edit_info.light_box_info.r != value3 || kbd_edit_info.light_box_info.g != value4 || kbd_edit_info.light_box_info.b != value5) {
    kbd_edit_info.light_box_info.r = value3;
    kbd_edit_info.light_box_info.g = value4;
    kbd_edit_info.light_box_info.b = value5;
    hs_set_light_box(current_usb_client, kbd_edit_info.light_box_info);
  }
}
function kbd_ui_refresh_light_matrix(client) {
  var value = 0xd;
  if (is_keyboard_5_15(client.device)) {
    value = 0xe;
  }
  var html = "<div class=\"layui-row\" style=\"margin-top: 10px;\">";
  for (let len = 0x0; len < kbd_key_infos.length; len++) {
    var value2 = kbd_key_infos[len].name;
    var value3 = kbd_key_infos[len].rect;
    var x = value3[0x0];
    var value4 = value3[0x1];
    var value5 = value3[0x2];
    var value6 = value3[0x3];
    var value7 = kbd_key_infos[len].row;
    var value8 = kbd_key_infos[len].col;
    var flag = true;
    if (kbd_edit_info.mode == 0x2d) {
      flag = false;
    }
    html += "<div class=\"layui-col-xs3\" style=\"width:" + value5 + "px; height:" + value6 + "px; margin-left:" + x + "px; margin-top:" + value4 + "px; \">";
    if (flag) {
      html += "<a kbd-light-matrix-index=\"" + -0x1 + "\"kbd-light-matrix-action=\"select\" style=\"cursor: not-allowed;\">";
      html += "<div style=\"width:" + value5 + "px; height:" + value6 + "px;\">";
      html += "<div style=\"justify-content: center; align-items: center; position: absolute; width:" + value5 + "px; height:" + value6 + "px;\">";
      " ";
    } else {
      html += "<a kbd-light-matrix-index=\"" + len + "\"kbd-light-matrix-action=\"select\" style=\"cursor: pointer;\">";
      html += "<div style=\"width:" + value5 + "px; height:" + value6 + "px;\">";
      html += "<div class=\"layui-hover-bg-trans\" style=\"justify-content: center; align-items: center; position: absolute; width:" + value5 + "px; height:" + value6 + "px;\">";
      " ";
    }
    if (is_keyboard_5_15(client.device)) {
      html += "<p style=\"user-select: none;font-size: smaller;color:white;text-align: center; margin-top: 10px;\" >" + value2 + '</p>';
    } else {
      html += "<p style=\"user-select: none;font-size: small;color:white;text-align: center; margin-top: 16px;\" >" + value2 + '</p>';
    }
    var transparentStr = "transparent";
    if (kbd_edit_info.mode == 0x2d) {
      for (let index = 0x0; index < kbd_edit_info.keys.length; index++) {
        if (value7 == kbd_edit_info.keys[index].row && value8 == kbd_edit_info.keys[index].col) {
          var value9 = hsvToRgb(kbd_edit_info.keys[index].hue, kbd_edit_info.keys[index].sat, Math.floor(0xff * kbd_edit_info.brightness / 0x64));
          transparentStr = rgbToHex(value9.r, value9.g, value9.b);
          break;
        }
      }
    }
    if (value2 != '') {
      var value10 = (value5 - 0x8) / 0x2;
      html += "<div id=\"key-color\" style=\"background-color: " + transparentStr + "; margin-top: 6px; margin-left:" + value10 + "px; width:" + 0x8 + "px; height:" + '2' + "px;\">";
      " ";
      html += "</div>";
    }
    html += "</div>";
    for (let offset = 0x0; offset < kbd_matrix_select_keys.length; offset++) {
      if (value7 == kbd_matrix_select_keys[offset].row && value8 == kbd_matrix_select_keys[offset].col) {
        html += "<div class=\"layui-key-select-red\" style=\"position: absolute; width:" + (value5 - 0x3) + "px; height:" + (value6 - 0x3) + "px;\">";
        " ";
        html += "</div>";
        break;
      }
    }
    html += '</div>';
    html += "</a>";
    html += "</div>";
    if (len == value) {
      html += "</div><div class=\"layui-row\">";
    }
  }
  ;
  html += "</div>";
  $('#kbd-mapping-light-container').html(html);
}
function kbd_ui_refresh_axis_matrix(client) {
  var value = 0xd;
  if (is_keyboard_5_15(client.device)) {
    value = 0xe;
  }
  var html = "<div class=\"layui-row\" style=\"margin-top: 10px;\">";
  for (let len = 0x0; len < kbd_key_infos.length; len++) {
    var value2 = kbd_key_infos[len].name;
    var value3 = kbd_key_infos[len].rect;
    var x = value3[0x0];
    var value4 = value3[0x1];
    var value5 = value3[0x2];
    var value6 = value3[0x3];
    var value7 = kbd_key_infos[len].row;
    var value8 = kbd_key_infos[len].col;
    html += "<div class=\"layui-col-xs3\" style=\"width:" + value5 + "px; height:" + value6 + "px; margin-left:" + x + "px; margin-top:" + value4 + "px; \">";
    html += "<a kbd-axis-matrix-index=\"" + len + "\"kbd-axis-matrix-action=\"select\" style=\"cursor: pointer;\">";
    html += "<div style=\"width:" + value5 + "px; height:" + value6 + "px;\">";
    html += "<div class=\"layui-hover-bg-trans\" style=\"justify-content: center; align-items: center; position: absolute; width:" + value5 + "px; height:" + value6 + "px;\">";
    " ";
    if (is_keyboard_5_15(client.device)) {
      html += "<p style=\"user-select: none;font-size: smaller;color:white;text-align: center; margin-top: 2px;\" >" + value2 + '</p>';
      if (value2 != '') {
        if (kbd_axis_infos.length > 0x0) {
          var value9 = kbd_axis_infos[len].rt_press_lv / 0x3e8;
          var value10 = kbd_axis_infos[len].rt_release_lv / 0x3e8;
          html += "<p style=\"user-select: none;font-size: 10px;color:#C0C0C0;text-align: center;\" >" + value9.toFixed(0x3) + "</p>";
          html += "<p style=\"user-select: none;font-size: 10px;color:#C0C0C0;text-align: center; \" >" + value10.toFixed(0x3) + '</p>';
        }
      }
    } else {
      html += "<p style=\"user-select: none;font-size: small;color:white;text-align: center; margin-top: 5px; margin-bottom:2px\" >" + value2 + "</p>";
      if (value2 != '') {
        if (kbd_axis_infos.length > 0x0) {
          var value9 = kbd_axis_infos[len].rt_press_lv / 0x64;
          var value10 = kbd_axis_infos[len].rt_release_lv / 0x64;
          html += "<p style=\"user-select: none;font-size: smaller; color:#C0C0C0; text-align: center; margin-top:1px\" >" + value9.toFixed(0x2) + "</p>";
          html += "<p style=\"user-select: none;font-size: smaller; color:#C0C0C0; text-align: center; margin-top:1px\" >" + value10.toFixed(0x2) + "</p>";
        }
      }
    }
    html += '</div>';
    for (let index = 0x0; index < kbd_matrix_select_keys.length; index++) {
      if (value7 == kbd_matrix_select_keys[index].row && value8 == kbd_matrix_select_keys[index].col) {
        html += "<div class=\"layui-key-select-red\" style=\"position: absolute; width:" + (value5 - 0x3) + "px; height:" + (value6 - 0x3) + "px;\">";
        " ";
        html += "</div>";
        break;
      }
    }
    html += "</div>";
    html += '</a>';
    html += "</div>";
    if (len == value) {
      html += "</div><div class=\"layui-row\">";
    }
  }
  ;
  html += "</div>";
  $('#kbd-mapping-axis-container').html(html);
}
function kbd_ui_refresh_axis_type(client) {
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
function kbd_ui_refresh_axis(client) {
  if (kbd_matrix_select_keys.length > 0x0) {
    kbd_edit_info = kbd_matrix_select_keys[0x0];
  } else {
    kbd_edit_info = kbd_create_axis_info();
  }
  $("[name=\"kbd-axis-quick-tigger-mode\"]").prop('checked', !!(kbd_edit_info.rt_enable == 0x1));
  $("[name=\"kbd-axis-quick-tigger-mode\"]").prop('disabled', !(kbd_matrix_select_keys.length > 0x0));
  $("#kbd-axis-button-container").css('display', kbd_matrix_select_keys.length > 0x0 ? "flex" : "none");
  var val01 = 0.01;
  var val012 = 0.01;
  var val34 = 3.4;
  var value = 0x64;
  if (is_keyboard_5_15(client.device)) {
    val01 = 0.001;
    val012 = 0.001;
    value = 0x3e8;
  }
  if (kbd_edit_info.switch_type == 0x1) {
    val34 = 3.5;
  }
  var value2 = kbd_edit_info.apc_lv / value;
  var layui2 = layui.slider;
  var value3 = layui2.render({
    'elem': "#kbd-axis-trigger-point",
    'min': 0.1,
    'max': val34,
    'step': val01,
    'value': value2,
    'input': true,
    'tips': false,
    'disabled': !(kbd_matrix_select_keys.length > 0x0),
    'theme': theme_color,
    'done': function (result) {
      if (result != undefined) {
        kbd_edit_info.apc_lv = result * value;
      }
    }
  });
  value3.setValue(value2);
  var value4 = kbd_edit_info.rt_press_lv / value;
  value3 = layui2.render({
    'elem': "#kbd-axis-press-distance",
    'min': val012,
    'max': val34,
    'step': val01,
    'value': value4,
    'input': true,
    'tips': false,
    'disabled': !(kbd_edit_info.rt_enable == 0x1),
    'theme': theme_color,
    'done': function (result) {
      if (result != undefined) {
        kbd_edit_info.rt_press_lv = result * value;
      }
    }
  });
  value3.setValue(value4);
  var value5 = kbd_edit_info.rt_release_lv / value;
  value3 = layui2.render({
    'elem': '#kbd-axis-release-distance',
    'min': val012,
    'max': val34,
    'step': val01,
    'value': value5,
    'input': true,
    'tips': false,
    'disabled': !(kbd_edit_info.rt_enable == 0x1),
    'theme': theme_color,
    'done': function (result) {
      if (result != undefined) {
        kbd_edit_info.rt_release_lv = result * value;
      }
    }
  });
  value3.setValue(value5);
  var value6 = kbd_edit_info.btm_dz / value;
  value3 = layui2.render({
    'elem': "#kbd-axis-dead-distance",
    'min': 0x0,
    'max': val34,
    'step': val01,
    'value': value6,
    'input': true,
    'tips': false,
    'disabled': !(kbd_edit_info.rt_enable == 0x1),
    'theme': theme_color,
    'done': function (result) {
      if (result != undefined) {
        kbd_edit_info.btm_dz = result * value;
      }
    }
  });
  value3.setValue(value6);
  kbd_ui_refresh_axis_type(client);
}
function kbd_ui_refresh_advance_key_desc(client) {
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
      var flag = true;
      for (let len = 0x0; len < kbd_socd_infos.length; len++) {
        if (kbd_edit_info.row1 == kbd_socd_infos[len].row1 && kbd_edit_info.col1 == kbd_socd_infos[len].col1 && kbd_edit_info.row2 == kbd_socd_infos[len].row2 && kbd_edit_info.col2 == kbd_socd_infos[len].col2 && kbd_edit_info.socd_mode == kbd_socd_infos[len].socd_mode) {
          flag = false;
          break;
        }
      }
      if (kbd_select_elementId.length > 0x0) {
        $("#kbd-advance-key-desc1").text(kbd_key_infos[kbd_key_matrix_index].name);
      }
      if (kbd_edit_info.row1 >= 0x0 && kbd_edit_info.col1 >= 0x0 && kbd_edit_info.row2 >= 0x0 && kbd_edit_info.col2 >= 0x0) {
        for (let index = 0x0; index < kbd_key_infos.length; index++) {
          if (kbd_key_infos[index].row == kbd_edit_info.row1 && kbd_key_infos[index].col == kbd_edit_info.col1) {
            $("#kbd-advance-key-desc1").css("display", '');
            $("#kbd-advance-key-desc1").css('color', theme_color);
            $('#kbd-advance-key-desc1').text(kbd_key_infos[index].name);
            break;
          }
        }
        $("#kbd-advance-key-desc-arrow").css('display', '');
        $("#kbd-advance-key-desc-arrow").text(" + ");
        for (let offset = 0x0; offset < kbd_key_infos.length; offset++) {
          if (kbd_key_infos[offset].row == kbd_edit_info.row2 && kbd_key_infos[offset].col == kbd_edit_info.col2) {
            $("#kbd-advance-key-desc2").css('display', '');
            $("#kbd-advance-key-desc2").css("color", theme_color);
            $("#kbd-advance-key-desc2").text(kbd_key_infos[offset].name);
            break;
          }
        }
        var flag2 = false;
        for (let count = 0x0; count < kbd_socd_infos.length; count++) {
          if (kbd_key_infos[kbd_key_matrix_index].row == kbd_socd_infos[count].row1 && kbd_key_infos[kbd_key_matrix_index].col == kbd_socd_infos[count].col1 || kbd_key_infos[kbd_key_matrix_index].row == kbd_socd_infos[count].row2 && kbd_key_infos[kbd_key_matrix_index].col == kbd_socd_infos[count].col2) {
            flag2 = true;
            break;
          }
        }
        if (flag2) {
          document.getElementById("kbd-advance-key-delete").disabled = false;
        }
        if (flag) {
          document.getElementById("kbd-advance-key-set").disabled = false;
        }
      }
    } else {
      if (kbd_key_setting_index == 0x2) {
        var flag = true;
        for (let len2 = 0x0; len2 < kbd_rs_infos.length; len2++) {
          if (kbd_edit_info.row1 == kbd_rs_infos[len2].row1 && kbd_edit_info.col1 == kbd_rs_infos[len2].col1 && kbd_edit_info.row2 == kbd_rs_infos[len2].row2 && kbd_edit_info.col2 == kbd_rs_infos[len2].col2) {
            flag = false;
            break;
          }
        }
        if (kbd_select_elementId.length > 0x0) {
          $("#kbd-advance-key-desc1").text(kbd_key_infos[kbd_key_matrix_index].name);
        }
        if (kbd_edit_info.row1 >= 0x0 && kbd_edit_info.col1 >= 0x0 && kbd_edit_info.row2 >= 0x0 && kbd_edit_info.col2 >= 0x0) {
          for (let len3 = 0x0; len3 < kbd_key_infos.length; len3++) {
            if (kbd_key_infos[len3].row == kbd_edit_info.row1 && kbd_key_infos[len3].col == kbd_edit_info.col1) {
              $("#kbd-advance-key-desc1").css("display", '');
              $("#kbd-advance-key-desc1").css('color', theme_color);
              $("#kbd-advance-key-desc1").text(kbd_key_infos[len3].name);
              break;
            }
          }
          $("#kbd-advance-key-desc-arrow").css('display', '');
          $("#kbd-advance-key-desc-arrow").text(" + ");
          for (let len4 = 0x0; len4 < kbd_key_infos.length; len4++) {
            if (kbd_key_infos[len4].row == kbd_edit_info.row2 && kbd_key_infos[len4].col == kbd_edit_info.col2) {
              $('#kbd-advance-key-desc2').css("display", '');
              $("#kbd-advance-key-desc2").css("color", theme_color);
              $("#kbd-advance-key-desc2").text(kbd_key_infos[len4].name);
              break;
            }
          }
          var flag2 = false;
          for (let len5 = 0x0; len5 < kbd_rs_infos.length; len5++) {
            if (kbd_key_infos[kbd_key_matrix_index].row == kbd_rs_infos[len5].row1 && kbd_key_infos[kbd_key_matrix_index].col == kbd_rs_infos[len5].col1 || kbd_key_infos[kbd_key_matrix_index].row == kbd_rs_infos[len5].row2 && kbd_key_infos[kbd_key_matrix_index].col == kbd_rs_infos[len5].col2) {
              flag2 = true;
              break;
            }
          }
          if (flag2) {
            document.getElementById("kbd-advance-key-delete").disabled = false;
          }
          if (flag) {
            document.getElementById("kbd-advance-key-set").disabled = false;
          }
        }
      } else {
        if (kbd_key_setting_index == 0x1) {
          var flag = true;
          for (let len6 = 0x0; len6 < kbd_mt_infos.length; len6++) {
            if (kbd_edit_info.row == kbd_mt_infos[len6].row && kbd_edit_info.col == kbd_mt_infos[len6].col && kbd_edit_info.tap_time == kbd_mt_infos[len6].tap_time && kbd_edit_info.keyCode1 == kbd_mt_infos[len6].keyCode1 && kbd_edit_info.keyCode2 == kbd_mt_infos[len6].keyCode2) {
              flag = false;
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
            if (flag) {
              document.getElementById("kbd-advance-key-set").disabled = false;
            }
          }
        } else {
          if (kbd_key_setting_index == 0x3) {
            var flag = true;
            for (let len7 = 0x0; len7 < kbd_dks_infos.length; len7++) {
              if (kbd_edit_info.row == kbd_dks_infos[len7].row && kbd_edit_info.col == kbd_dks_infos[len7].col && kbd_edit_info.keyCode1 == kbd_dks_infos[len7].keyCode1 && kbd_edit_info.state1 == kbd_dks_infos[len7].state1 && kbd_edit_info.keyCode2 == kbd_dks_infos[len7].keyCode2 && kbd_edit_info.state2 == kbd_dks_infos[len7].state2 && kbd_edit_info.keyCode3 == kbd_dks_infos[len7].keyCode3 && kbd_edit_info.state3 == kbd_dks_infos[len7].state3 && kbd_edit_info.keyCode4 == kbd_dks_infos[len7].keyCode4 && kbd_edit_info.state4 == kbd_dks_infos[len7].state4) {
                flag = false;
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
              if (flag) {
                document.getElementById("kbd-advance-key-set").disabled = false;
              }
            }
          }
        }
      }
    }
  }
}
function kbd_ui_refresh_advance_key_matrix(client) {
  var value = 0xd;
  if (is_keyboard_5_15(client.device)) {
    value = 0xe;
  }
  var html = "<div class=\"layui-row\" style=\"margin-top: 10px;\">";
  for (let len = 0x0; len < kbd_key_infos.length; len++) {
    var value2 = kbd_key_infos[len].name;
    var value3 = kbd_key_infos[len].rect;
    var x = value3[0x0];
    var value4 = value3[0x1];
    var value5 = value3[0x2];
    var value6 = value3[0x3];
    var value7 = kbd_key_infos[len].row;
    var value8 = kbd_key_infos[len].col;
    var offset = 0x0;
    var value9 = (value5 - offset) / 0x2;
    var str = '';
    for (let index = 0x0; index < kbd_socd_infos.length; index++) {
      if (value7 == kbd_socd_infos[index].row1 && value8 == kbd_socd_infos[index].col1 || value7 == kbd_socd_infos[index].row2 && value8 == kbd_socd_infos[index].col2) {
        str = "SOCD";
        break;
      }
    }
    for (let count = 0x0; count < kbd_mt_infos.length; count++) {
      if (value7 == kbd_mt_infos[count].row && value8 == kbd_mt_infos[count].col) {
        str = 'MT';
        break;
      }
    }
    for (let len2 = 0x0; len2 < kbd_dks_infos.length; len2++) {
      if (value7 == kbd_dks_infos[len2].row && value8 == kbd_dks_infos[len2].col) {
        str = "DKS";
        break;
      }
    }
    for (let len3 = 0x0; len3 < kbd_rs_infos.length; len3++) {
      if (value7 == kbd_rs_infos[len3].row1 && value8 == kbd_rs_infos[len3].col1 || value7 == kbd_rs_infos[len3].row2 && value8 == kbd_rs_infos[len3].col2) {
        str = 'RS';
        break;
      }
    }
    var flag = false;
    if (kbd_key_setting_index == 0x0) {
      if (kbd_select_elementId.length > 0x0) {
        if (str == "SOCD") {
          flag = true;
        }
      }
      if (str == 'MT' || str == 'RS' || str == 'DKS') {
        flag = true;
      }
    } else {
      if (kbd_key_setting_index == 0x2) {
        if (kbd_select_elementId.length > 0x0) {
          if (str == 'RS') {
            flag = true;
          }
        }
        if (str == "SOCD" || str == 'MT' || str == 'DKS') {
          flag = true;
        }
      } else {
        if (kbd_key_setting_index == 0x1) {
          if (str == "SOCD" || str == 'RS' || str == 'DKS') {
            flag = true;
          }
        } else if (kbd_key_setting_index == 0x3) {
          if (str == "SOCD" || str == 'MT' || str == 'RS') {
            flag = true;
          }
        }
      }
    }
    html += "<div class=\"layui-col-xs3\" style=\"width:" + value5 + "px; height:" + value6 + "px; margin-left:" + x + "px; margin-top:" + value4 + "px; \">";
    if (flag) {
      html += "<a kbd-key-matrix-index=\"" + -0x1 + "\"kbd-advance-key-matrix-action=\"select\" style=\"cursor: not-allowed;\">";
      html += "<div style=\"width:" + value5 + "px; height:" + value6 + "px;\">";
      html += "<div style=\"justify-content: center; align-items: center; position: absolute; width:" + value5 + "px; height:" + value6 + "px;\">";
      " ";
    } else {
      html += "<a kbd-key-matrix-index=\"" + len + "\"kbd-advance-key-matrix-action=\"select\" style=\"cursor: pointer;\">";
      html += "<div style=\"width:" + value5 + "px; height:" + value6 + "px;\">";
      html += "<div class=\"layui-hover-bg-trans\" style=\"justify-content: center; align-items: center; position: absolute; width:" + value5 + "px; height:" + value6 + "px;\">";
      " ";
    }
    if (str == "SOCD") {
      offset = 0x8;
      value9 = (value5 - offset) / 0x2;
      if (is_keyboard_5_15(client.device)) {
        html += "<p style=\"user-select: none;font-size: smaller;color:orange;text-align: center; margin-top: 10px;\" >" + str + "</p>";
      } else {
        html += "<p style=\"user-select: none;font-size: small;color:orange;text-align: center; margin-top: 16px;\" >" + str + "</p>";
      }
      html += "<div id=\"key-color\" style=\"background-color: orange; margin-top: 6px; margin-left:" + value9 + "px; width:" + offset + "px; height:" + '2' + "px;\">";
      " ";
    } else {
      if (str == 'MT') {
        offset = 0x8;
        value9 = (value5 - offset) / 0x2;
        if (is_keyboard_5_15(client.device)) {
          html += "<p style=\"user-select: none;font-size: smaller;color:orange;text-align: center; margin-top: 10px;\" >" + str + "</p>";
        } else {
          html += "<p style=\"user-select: none;font-size: small;color:orange;text-align: center; margin-top: 16px;\" >" + str + "</p>";
        }
        html += "<div id=\"key-color\" style=\"background-color: orange; margin-top: 6px; margin-left:" + value9 + "px; width:" + offset + "px; height:" + '2' + "px;\">";
        " ";
      } else {
        if (str == 'RS') {
          offset = 0x8;
          value9 = (value5 - offset) / 0x2;
          if (is_keyboard_5_15(client.device)) {
            html += "<p style=\"user-select: none;font-size: smaller;color:orange;text-align: center; margin-top: 10px;\" >" + str + "</p>";
          } else {
            html += "<p style=\"user-select: none;font-size: small;color:orange;text-align: center; margin-top: 16px;\" >" + str + "</p>";
          }
          html += "<div id=\"key-color\" style=\"background-color: orange; margin-top: 6px; margin-left:" + value9 + "px; width:" + offset + "px; height:" + '2' + "px;\">";
          " ";
        } else if (str == "DKS") {
          offset = 0x8;
          value9 = (value5 - offset) / 0x2;
          if (is_keyboard_5_15(client.device)) {
            html += "<p style=\"user-select: none;font-size: smaller;color:orange;text-align: center; margin-top: 10px;\" >" + str + '</p>';
          } else {
            html += "<p style=\"user-select: none;font-size: small;color:orange;text-align: center; margin-top: 16px;\" >" + str + "</p>";
          }
          html += "<div id=\"key-color\" style=\"background-color: orange; margin-top: 6px; margin-left:" + value9 + "px; width:" + offset + "px; height:" + '2' + "px;\">";
          " ";
        } else {
          if (is_keyboard_5_15(client.device)) {
            html += "<p style=\"user-select: none;font-size: smaller;color:white;text-align: center; margin-top: 10px;\" >" + value2 + "</p>";
          } else {
            html += "<p style=\"user-select: none;font-size: small;color:white;text-align: center; margin-top: 16px;\" >" + value2 + "</p>";
          }
          html += "<div id=\"key-color\" style=\"background-color: transparent; margin-top: 6px; margin-left:" + value9 + "px; width:" + offset + "px; height:" + '2' + "px;\">";
          " ";
        }
      }
    }
    html += "</div>";
    html += "</div>";
    if (kbd_key_setting_index == 0x0) {
      if (str == "SOCD") {
        if (kbd_key_matrix_index == len) {
          html += "<div class=\"layui-key-select-red\" style=\"position: absolute; width:" + (value5 - 0x3) + "px; height:" + (value6 - 0x3) + "px;\">";
          " ";
          html += '</div>';
        }
      }
    } else if (kbd_key_setting_index == 0x2) {
      if (str == 'RS') {
        if (kbd_key_matrix_index == len) {
          html += "<div class=\"layui-key-select-red\" style=\"position: absolute; width:" + (value5 - 0x3) + "px; height:" + (value6 - 0x3) + "px;\">";
          " ";
          html += '</div>';
        }
      }
    } else if (!flag && kbd_key_matrix_index == len) {
      html += "<div class=\"layui-key-select-red\" style=\"position: absolute; width:" + (value5 - 0x3) + "px; height:" + (value6 - 0x3) + "px;\">";
      " ";
      html += "</div>";
    }
    html += "</div>";
    html += '</a>';
    html += '</div>';
    if (len == value) {
      html += "</div><div class=\"layui-row\">";
    }
  }
  ;
  html += "</div>";
  $("#kbd-mapping-advance-key-container").html(html);
}
function kbd_ui_refresh_socd(client) {
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
    for (let len = 0x0; len < kbd_socd_infos.length; len++) {
      if (kbd_key_infos[kbd_key_matrix_index].row == kbd_socd_infos[len].row1 && kbd_key_infos[kbd_key_matrix_index].col == kbd_socd_infos[len].col1 || kbd_key_infos[kbd_key_matrix_index].row == kbd_socd_infos[len].row2 && kbd_key_infos[kbd_key_matrix_index].col == kbd_socd_infos[len].col2) {
        kbd_edit_info = kbd_clone_socd_info(kbd_socd_infos[len]);
        break;
      }
    }
  }
  if (kbd_edit_info.row1 >= 0x0 && kbd_edit_info.col1 >= 0x0) {
    for (let index = 0x0; index < kbd_key_infos.length; index++) {
      var value = kbd_key_infos[index].name;
      var value2 = kbd_key_infos[index].row;
      var value3 = kbd_key_infos[index].col;
      if (kbd_edit_info.row1 == value2 && kbd_edit_info.col1 == value3) {
        document.getElementById("kbd-socd-key1").textContent = value;
        document.getElementById("kbd-socd-key1").style.borderColor = "#16B777";
        break;
      }
    }
  }
  if (kbd_edit_info.row2 >= 0x0 && kbd_edit_info.col2 >= 0x0) {
    for (let offset = 0x0; offset < kbd_key_infos.length; offset++) {
      var value = kbd_key_infos[offset].name;
      var value2 = kbd_key_infos[offset].row;
      var value3 = kbd_key_infos[offset].col;
      if (kbd_edit_info.row2 == value2 && kbd_edit_info.col2 == value3) {
        document.getElementById('kbd-socd-key2').textContent = value;
        document.getElementById("kbd-socd-key2").style.borderColor = '#16B777';
        break;
      }
    }
  }
  if (kbd_edit_info.socd_mode >= 0x0 && kbd_edit_info.socd_mode < 0x4) {
    $("[name=\"kbd-socd-type\"]")[kbd_edit_info.socd_mode].checked = true;
  }
}
function kbd_ui_refresh_mt(client) {
  kbd_edit_info = kbd_create_mt_info();
  if (kbd_key_matrix_index > 0x0) {
    for (let len = 0x0; len < kbd_mt_infos.length; len++) {
      if (kbd_key_infos[kbd_key_matrix_index].row == kbd_mt_infos[len].row && kbd_key_infos[kbd_key_matrix_index].col == kbd_mt_infos[len].col) {
        kbd_edit_info = kbd_clone_mt_info(kbd_mt_infos[len]);
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
  var layui2 = layui.slider;
  var value = layui2.render({
    'elem': "#kbd-mt-longpress-time",
    'min': 0x64,
    'max': 0x1f4,
    'step': 0x1,
    'value': kbd_edit_info.tap_time,
    'input': true,
    'tips': false,
    'theme': theme_color,
    'done': function (result) {
      if (result != undefined) {
        kbd_edit_info.tap_time = result;
      }
    }
  });
  value.setValue(kbd_edit_info.tap_time);
}
function kbd_ui_refresh_rs(client) {
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
    for (let len = 0x0; len < kbd_rs_infos.length; len++) {
      if (kbd_key_infos[kbd_key_matrix_index].row == kbd_rs_infos[len].row1 && kbd_key_infos[kbd_key_matrix_index].col == kbd_rs_infos[len].col1 || kbd_key_infos[kbd_key_matrix_index].row == kbd_rs_infos[len].row2 && kbd_key_infos[kbd_key_matrix_index].col == kbd_rs_infos[len].col2) {
        kbd_edit_info = kbd_clone_rs_info(kbd_rs_infos[len]);
        break;
      }
    }
  }
  if (kbd_edit_info.row1 >= 0x0 && kbd_edit_info.col1 >= 0x0) {
    for (let index = 0x0; index < kbd_key_infos.length; index++) {
      var value = kbd_key_infos[index].name;
      var value2 = kbd_key_infos[index].row;
      var value3 = kbd_key_infos[index].col;
      if (kbd_edit_info.row1 == value2 && kbd_edit_info.col1 == value3) {
        document.getElementById('kbd-rs-key1').textContent = value;
        document.getElementById("kbd-rs-key1").style.borderColor = '#16B777';
        break;
      }
    }
  }
  if (kbd_edit_info.row2 >= 0x0 && kbd_edit_info.col2 >= 0x0) {
    for (let offset = 0x0; offset < kbd_key_infos.length; offset++) {
      var value = kbd_key_infos[offset].name;
      var value2 = kbd_key_infos[offset].row;
      var value3 = kbd_key_infos[offset].col;
      if (kbd_edit_info.row2 == value2 && kbd_edit_info.col2 == value3) {
        document.getElementById('kbd-rs-key2').textContent = value;
        document.getElementById("kbd-rs-key2").style.borderColor = "#16B777";
        break;
      }
    }
  }
}
function kbd_ui_refresh_dks(client) {
  kbd_edit_info = kbd_create_dks_info();
  if (kbd_key_matrix_index > 0x0) {
    for (let len = 0x0; len < kbd_dks_infos.length; len++) {
      if (kbd_key_infos[kbd_key_matrix_index].row == kbd_dks_infos[len].row && kbd_key_infos[kbd_key_matrix_index].col == kbd_dks_infos[len].col) {
        kbd_edit_info = kbd_clone_dks_info(kbd_dks_infos[len]);
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
function kbd_ui_refresh_dks_dragging(client, dragIndex) {
  var value = Math.floor(kbd_dks_dragging_name / 0xa);
  var value2 = kbd_dks_dragging_name % 0xa;
  var el = "kbd-dks-key" + value + '-' + value2;
  var el2 = "#kbd-dks-arrow" + value + '-' + value2;
  var value3 = 0x18 + client;
  if (value2 == 0x1) {
    if (value3 >= 0x104) {
      value3 = 0x108;
    }
  } else {
    if (value2 == 0x2) {
      if (value3 >= 0xb4) {
        value3 = 0xb8;
      }
    } else {
      if (value2 == 0x3) {
        if (value3 >= 0x64) {
          value3 = 0x68;
        }
      } else if (value2 == 0x4) {
        value3 = 0x18;
      }
    }
  }
  if (dragIndex) {
    var offset = 0x0;
    if (value == 0x1) {
      offset = kbd_edit_info.state1;
    } else {
      if (value == 0x2) {
        offset = kbd_edit_info.state2;
      } else {
        if (value == 0x3) {
          offset = kbd_edit_info.state3;
        } else if (value == 0x4) {
          offset = kbd_edit_info.state4;
        }
      }
    }
    if (value2 == 0x1) {
      if (value3 < 0x28) {
        value3 = 0x18;
        offset = offset | 0x1;
      } else {
        if (value3 >= 0x28 && value3 < 0x64) {
          value3 = 0x4d;
          offset = offset | 0x1 | 0x2;
        } else {
          if (value3 >= 0x64 && value3 < 0x78) {
            value3 = 0x68;
            offset = offset | 0x1 | 0x2 | 0x4 | 0x8;
          } else {
            if (value3 >= 0x78 && value3 < 0xb4) {
              value3 = 0x9d;
              offset = offset | 0x1 | 0x2 | 0x4 | 0x8 | 0x10;
            } else {
              if (value3 >= 0xb4 && value3 < 0xc8) {
                value3 = 0xb8;
                offset = offset | 0x1 | 0x2 | 0x4 | 0x8 | 0x10 | 0x20 | 0x40;
              } else {
                if (value3 >= 0xc8 && value3 < 0x104) {
                  value3 = 0xed;
                  offset = offset | 0x1 | 0x2 | 0x4 | 0x8 | 0x10 | 0x20 | 0x40 | 0x80;
                } else if (value3 >= 0x104) {
                  value3 = 0x108;
                  offset = offset | 0x1 | 0x2 | 0x4 | 0x8 | 0x10 | 0x20 | 0x40 | 0x80 | 0x100 | 0x200;
                }
              }
            }
          }
        }
      }
    } else {
      if (value2 == 0x2) {
        if (value3 < 0x28) {
          value3 = 0x18;
          offset = offset | 0x8;
        } else {
          if (value3 >= 0x28 && value3 < 0x64) {
            value3 = 0x4d;
            offset = offset | 0x8 | 0x10;
          } else {
            if (value3 >= 0x64 && value3 < 0x78) {
              value3 = 0x68;
              offset = offset | 0x8 | 0x10 | 0x20 | 0x40;
            } else {
              if (value3 >= 0x78 && value3 < 0xb4) {
                value3 = 0x9d;
                offset = offset | 0x8 | 0x10 | 0x20 | 0x40 | 0x80;
              } else if (value3 >= 0xb4 && value3 < 0xc8) {
                value3 = 0xb8;
                offset = offset | 0x8 | 0x10 | 0x20 | 0x40 | 0x80 | 0x100 | 0x200;
              }
            }
          }
        }
      } else {
        if (value2 == 0x3) {
          if (value3 < 0x28) {
            value3 = 0x18;
            offset = offset | 0x40;
          } else {
            if (value3 >= 0x28 && value3 < 0x64) {
              value3 = 0x4d;
              offset = offset | 0x40 | 0x80;
            } else if (value3 >= 0x64 && value3 < 0x78) {
              value3 = 0x68;
              offset = offset | 0x40 | 0x80 | 0x100 | 0x200;
            }
          }
        } else if (value2 == 0x3) {
          value3 = 0x18;
          offset = offset | 0x200;
        }
      }
    }
    if (value == 0x1) {
      kbd_edit_info.state1 = offset;
    } else {
      if (value == 0x2) {
        kbd_edit_info.state2 = offset;
      } else {
        if (value == 0x3) {
          kbd_edit_info.state3 = offset;
        } else if (value == 0x4) {
          kbd_edit_info.state4 = offset;
        }
      }
    }
    kbd_ui_refresh_advance_key_desc(current_usb_client);
  }
  document.getElementById(el).className = 'rounded-border-green';
  $('#' + el).css('width', value3);
  $(el2).css("margin-left", value3 - 0xa);
}
function kbd_ui_refresh_dks_step(client, stepIndex) {
  for (let len = 0x1; len < 0x5; len++) {
    var value = "kbd-dks-key" + client + '-' + len;
    var el = '#kbd-dks-add' + client + '-' + len;
    var value2 = "#kbd-dks-arrow" + client + '-' + len;
    document.getElementById(value).className = "rounded-border";
    $('#' + value).css('width', '20');
    $(el).css('display', '');
    $(value2).css("display", "none");
  }
  if ((stepIndex & 0x1) != 0x0) {
    var value = "kbd-dks-key" + client + '-' + 0x1;
    var el = "#kbd-dks-add" + client + '-' + 0x1;
    var value2 = "#kbd-dks-arrow" + client + '-' + 0x1;
    var value3 = 0x18;
    if ((stepIndex & 0x2) != 0x0) {
      value3 = 0x4e;
      if ((stepIndex & 0x4) != 0x0 && (stepIndex & 0x8) != 0x0) {
        value3 = 0x68;
        if ((stepIndex & 0x10) != 0x0) {
          value3 = 0x9e;
          if ((stepIndex & 0x20) != 0x0 && (stepIndex & 0x40) != 0x0) {
            value3 = 0xb8;
            if ((stepIndex & 0x80) != 0x0) {
              value3 = 0xee;
              if ((stepIndex & 0x100) != 0x0 && (stepIndex & 0x200) != 0x0) {
                value3 = 0x108;
              }
            }
          }
        }
      }
    }
    document.getElementById(value).className = "rounded-border-green";
    $('#' + value).css("width", value3);
    $(value2).css("margin-left", value3 - 0xa);
    $(el).css("display", "none");
    $(value2).css("display", '');
  }
  if ((stepIndex & 0x8) != 0x0) {
    var value = "kbd-dks-key" + client + '-' + 0x2;
    var el = "#kbd-dks-add" + client + '-' + 0x2;
    var value2 = "#kbd-dks-arrow" + client + '-' + 0x2;
    var value3 = 0x18;
    if ((stepIndex & 0x10) != 0x0) {
      value3 = 0x4e;
      if ((stepIndex & 0x20) != 0x0 && (stepIndex & 0x40) != 0x0) {
        value3 = 0x68;
        if ((stepIndex & 0x80) != 0x0) {
          value3 = 0x9e;
          if ((stepIndex & 0x100) != 0x0 && (stepIndex & 0x200) != 0x0) {
            value3 = 0xb8;
          }
        }
      }
    }
    document.getElementById(value).className = "rounded-border-green";
    $('#' + value).css("width", value3);
    $(value2).css("margin-left", value3 - 0xa);
    $(el).css('display', "none");
    $(value2).css("display", '');
  }
  if ((stepIndex & 0x40) != 0x0) {
    var value = "kbd-dks-key" + client + '-' + 0x3;
    var el = "#kbd-dks-add" + client + '-' + 0x3;
    var value2 = "#kbd-dks-arrow" + client + '-' + 0x3;
    var value3 = 0x18;
    if ((stepIndex & 0x80) != 0x0) {
      value3 = 0x4e;
      if ((stepIndex & 0x100) != 0x0 && (stepIndex & 0x200) != 0x0) {
        value3 = 0x68;
      }
    }
    document.getElementById(value).className = "rounded-border-green";
    $('#' + value).css("width", value3);
    $(value2).css("margin-left", value3 - 0xa);
    $(el).css("display", 'none');
    $(value2).css("display", '');
  }
  if ((stepIndex & 0x200) != 0x0) {
    var value = "kbd-dks-key" + client + '-' + 0x4;
    var el = '#kbd-dks-add' + client + '-' + 0x4;
    var value2 = "#kbd-dks-arrow" + client + '-' + 0x4;
    var value3 = 0x18;
    document.getElementById(value).className = "rounded-border-green";
    $('#' + value).css('width', value3);
    $(value2).css('margin-left', value3 - 0xa);
    $(el).css("display", "none");
    $(value2).css("display", '');
  }
}
function kbd_ui_refresh_more(client) {
  $('#kbd-fireware-current-version').text(layui.i18np.prop("STRID_KBD_CURRENT_VERTION") + " " + current_usb_client.device_info.revision);
  $("#kbd-fireware-download").css('display', "none");
  $("#kbd-fireware-new-version-hint").css("display", "none");
}
function kbd_ui_refresh_main_setting(client) {
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
  if (client == 0x0) {
    $("#kbd-main-setting-key").css('color', "#00f6ff");
    document.getElementById("kbd-main-setting-key-icon").src = RESOURCE_URL + "setting/kbd/" + "kbd_key_selected.png";
  } else {
    if (client == 0x1) {
      $("#kbd-main-setting-light").css("color", '#00f6ff');
      document.getElementById("kbd-main-setting-light-icon").src = RESOURCE_URL + "setting/kbd/" + "kbd_light_selected.png";
    } else {
      if (client == 0x2) {
        $("#kbd-main-setting-axis").css('color', "#00f6ff");
        document.getElementById("kbd-main-setting-axis-icon").src = RESOURCE_URL + "setting/kbd/" + "kbd_axis_selected.png";
      } else {
        if (client == 0x3) {
          $("#kbd-main-setting-advance-key").css("color", "#00f6ff");
          document.getElementById("kbd-main-setting-advance-key-icon").src = RESOURCE_URL + "setting/kbd/" + "kbd_advance_key_selected.png";
        } else if (client == 0x4) {
          $("#kbd-main-setting-more").css('color', "#00f6ff");
          document.getElementById('kbd-main-setting-more-icon').src = RESOURCE_URL + "setting/kbd/" + "kbd_more_selected.png";
        }
      }
    }
  }
}
function kbd_update_setting_tab(client, value) {
  $("#kbd-main-setting-key-container").css("display", "none");
  $("#kbd-main-setting-axis-container").css("display", "none");
  $('#kbd-main-setting-advance-key-container').css('display', "none");
  $("#kbd-main-setting-light-container").css("display", "none");
  $("#kbd-main-setting-more-container").css('display', "none");
  var productHex = get_product_id_hex_str(current_usb_client);
  kbd_key_matrix_index = -0x1;
  kbd_matrix_select_keys = [];
  kbd_layer_id = 0x0;
  if (value == 0x0) {
    $("#kbd-mapping-key-container").css("background-image", "url(" + RESOURCE_URL + "product/" + productHex + "/setting.png)");
    $('#kbd-main-setting-key-container').css('display', '');
    $("[name=\"kbd-key-layer\"]")[0x0].checked = true;
    kbd_key_infos.splice(0x0, kbd_key_infos.length);
    var len = client.device_info.kbd_key_infos;
    if (len.length >= kbd_key_num) {
      for (var offset = 0x0; offset < kbd_key_num; offset++) {
        var value2 = len[offset];
        kbd_key_infos.push(kbd_clone_pc_key_info(value2));
      }
    }
    kbd_ui_refresh_key_matrix(client);
    kbd_ui_refresh_key_desc(client);
    layui.element.tabChange("kbd-setting-key-type", 0x0);
  } else {
    if (value == 0x1) {
      $("#kbd-mapping-light-container").css("background-image", "url(" + RESOURCE_URL + 'product/' + productHex + "/setting.png)");
      $("#kbd-main-setting-light-container").css('display', '');
      kbd_edit_info = kbd_clone_light_info(client.device_info.kbd_light_info);
      $('#kbd-light-button-container').css("display", "none");
      kbd_key_infos.splice(0x0, kbd_key_infos.length);
      var len = client.device_info.kbd_key_infos;
      if (len.length >= kbd_key_num) {
        for (var offset = 0x0; offset < kbd_key_num; offset++) {
          var value2 = len[offset];
          kbd_key_infos.push(kbd_clone_pc_key_info(value2));
        }
      }
      kbd_ui_refresh_light_matrix(client);
      layui.element.tabChange("kbd-setting-light-type", 0x0);
    } else {
      if (value == 0x2) {
        $("#kbd-mapping-axis-container").css('background-image', "url(" + RESOURCE_URL + "product/" + productHex + '/setting.png)');
        $('#kbd-main-setting-axis-container').css("display", '');
        kbd_key_infos.splice(0x0, kbd_key_infos.length);
        var len = client.device_info.kbd_key_infos;
        if (len.length >= kbd_key_num) {
          for (var offset = 0x0; offset < kbd_key_num; offset++) {
            var value2 = len[offset];
            kbd_key_infos.push(kbd_clone_pc_key_info(value2));
          }
        }
        kbd_axis_infos.splice(0x0, kbd_axis_infos.length);
        kbd_axis_infos = client.device_info.kbd_axis_infos.slice();
        kbd_ui_refresh_axis_matrix(client);
        kbd_ui_refresh_axis(client);
      } else {
        if (value == 0x3) {
          $('#kbd-mapping-advance-key-container').css('background-image', 'url(' + RESOURCE_URL + "product/" + productHex + "/setting.png)");
          $("#kbd-main-setting-advance-key-container").css('display', '');
          kbd_key_infos.splice(0x0, kbd_key_infos.length);
          var len = client.device_info.kbd_key_infos;
          if (len.length >= kbd_key_num) {
            for (var offset = 0x0; offset < kbd_key_num; offset++) {
              var value2 = len[offset];
              kbd_key_infos.push(kbd_clone_pc_key_info(value2));
            }
          }
          kbd_socd_infos.splice(0x0, kbd_socd_infos.length);
          var len2 = client.device_info.kbd_socd_infos;
          for (var offset = 0x0; offset < len2.length; offset++) {
            var value3 = len2[offset];
            kbd_socd_infos.push(kbd_clone_socd_info(value3));
          }
          kbd_mt_infos.splice(0x0, kbd_mt_infos.length);
          var len3 = client.device_info.kbd_mt_infos;
          for (var offset = 0x0; offset < len3.length; offset++) {
            var value4 = len3[offset];
            kbd_mt_infos.push(kbd_clone_mt_info(value4));
          }
          kbd_rs_infos.splice(0x0, kbd_rs_infos.length);
          var len4 = client.device_info.kbd_rs_infos;
          for (var offset = 0x0; offset < len4.length; offset++) {
            var value5 = len4[offset];
            kbd_rs_infos.push(kbd_clone_rs_info(value5));
          }
          kbd_dks_infos.splice(0x0, kbd_dks_infos.length);
          var len5 = client.device_info.kbd_dks_infos;
          for (var offset = 0x0; offset < len5.length; offset++) {
            kbd_dks_infos.push(kbd_clone_dks_info(len5[offset]));
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
        } else if (value == 0x4) {
          $("#kbd-main-setting-more-container").css("display", '');
          kbd_ui_refresh_more(client);
        }
      }
    }
  }
  kbd_ui_refresh_main_setting(value);
}
function kbd_update_key_setting_tab(client, value) {
  $("#kbd-setting-key-base-container").css('display', 'none');
  $('#kbd-setting-function-container').css('display', 'none');
  $("#kbd-setting-macro-container").css("display", 'none');
  kbd_key_setting_index = value;
  if (value == 0x0) {
    $("#kbd-setting-key-base-container").css('display', '');
    kbd_ui_key_setting_init(client);
  } else {
    if (value == 0x1) {
      $("#kbd-setting-function-container").css("display", "flex");
      kbd_ui_function_setting_init(client);
    } else {
      if (value == 0x2) {
        $("#kbd-setting-macro-container").css("display", '');
        kbd_macro_infos.splice(0x0, kbd_macro_infos.length);
        var len = client.device_info.kbd_macro_infos;
        for (var index = 0x0; index < len.length; index++) {
          kbd_macro_infos.push([]);
          var len2 = len[index];
          if (len2.length > 0x0) {
            for (var offset = 0x0; offset < len2.length; offset++) {
              kbd_macro_infos[index].push(clone_macro_info(len2[offset]));
            }
          }
        }
        kbd_macro_select_index = -0x1;
        edit_macros = [];
        kbd_ui_macro_init(client);
        kbd_ui_macro_edit_init(client);
      }
    }
  }
}
function kbd_update_light_setting_tab(client, value) {
  $("#kbd-setting-light-container").css("display", "none");
  $("#kbd-setting-light-box-container").css("display", "none");
  kbd_key_setting_index = value;
  if (value == 0x0) {
    $("#kbd-setting-light-container").css("display", '');
    kbd_ui_refresh_light(client);
  } else if (value == 0x1) {
    $("#kbd-setting-light-box-container").css('display', '');
    kbd_ui_refresh_light_box(client);
  }
}
function kbd_update_advance_key_setting_tab(client, value) {
  $('#kbd-setting-dks-container').css("display", "none");
  $("#kbd-setting-socd-container").css("display", "none");
  $("#kbd-setting-mt-container").css("display", "none");
  kbd_select_elementId = '';
  kbd_key_setting_index = value;
  if (value == 0x0) {
    $("#kbd-setting-socd-container").css('display', '');
    kbd_ui_refresh_socd(client);
  } else {
    if (value == 0x1) {
      $("#kbd-setting-mt-container").css('display', '');
      kbd_ui_refresh_mt(client);
    } else {
      if (value == 0x2) {
        $("#kbd-setting-rs-container").css('display', '');
        kbd_ui_refresh_rs(client);
      } else if (value == 0x3) {
        $("#kbd-setting-dks-container").css("display", '');
        kbd_ui_refresh_dks(client);
      }
    }
  }
  kbd_ui_refresh_advance_key_matrix(client);
  kbd_ui_refresh_advance_key_desc(client);
}
let pressedKeyCodes = [];
let record_mouse_key_delay_timer_id = undefined;
document.addEventListener("keydown", function (result) {
  if (setting_mapping_key_recording) {
    if (pressedKeyCodes.indexOf(result.key) === -0x1) {
      setting_mapping_key_recording_add(result.keyCode);
      pressedKeyCodes.push(result.key);
    }
    result.preventDefault();
  } else {
    if (setting_macro_edit_recording) {
      if (edit_macros.length >= 0xc8) {
        layer.msg(layui.i18np.prop("STRID_SETTING_MAPPING_MACRO_RECORD_MAX_EX"), {
          'icon': 0x0
        }, function () {});
        return;
      }
      var macroInfo = create_macro_info();
      macroInfo.style = 0x16;
      macroInfo.mouse_key_code = result.keyCode;
      macroInfo.mouse_key_event = 0x100;
      const now1 = Date.now();
      macroInfo.mouse_key_time = 0x1;
      if (setting_macro_edit_recording_time != -0x1) {
        edit_macros[edit_macros.length - 0x1].mouse_key_time = $("[name=\"macro-record-fixed-time\"]")[0x0].checked ? 0x32 : now1 - setting_macro_edit_recording_time;
      }
      setting_macro_edit_recording_time = now1;
      macroInfo.name = get_key_name_from_code(macroInfo.mouse_key_code);
      edit_macros.push(macroInfo);
      ui_refresh_mapping_macro_edit(current_usb_client);
    }
  }
});
document.addEventListener('keyup', function (result) {
  if (setting_mapping_key_recording) {
    const value = pressedKeyCodes.indexOf(result.key);
    if (value > -0x1) {
      pressedKeyCodes.splice(value, 0x1);
    }
    result.preventDefault();
  } else {
    if (setting_macro_edit_recording) {
      if (edit_macros.length >= 0xc8) {
        layer.msg(layui.i18np.prop("STRID_SETTING_MAPPING_MACRO_RECORD_MAX_EX"), {
          'icon': 0x0
        }, function () {});
        return;
      }
      var macroInfo = create_macro_info();
      macroInfo.style = 0x16;
      macroInfo.mouse_key_code = result.keyCode;
      macroInfo.mouse_key_event = 0x101;
      const now2 = Date.now();
      macroInfo.mouse_key_time = 0x1;
      if (setting_macro_edit_recording_time != -0x1) {
        edit_macros[edit_macros.length - 0x1].mouse_key_time = $("[name=\"macro-record-fixed-time\"]")[0x0].checked ? 0x32 : now2 - setting_macro_edit_recording_time;
      }
      setting_macro_edit_recording_time = now2;
      macroInfo.name = get_key_name_from_code(macroInfo.mouse_key_code);
      edit_macros.push(macroInfo);
      ui_refresh_mapping_macro_edit(current_usb_client);
    }
  }
});
document.addEventListener("mousedown", function (result) {
  if (kbd_dks_dragging_name.length > 0x0) {
    kbd_dks_Start_x = result.clientX;
    return;
  }
  if (setting_mapping_key_recording) {
    const value = "MouseButton" + result.button;
    if (pressedKeyCodes.indexOf(value) === -0x1) {
      if (result.button == 0x0) {
        record_mouse_key_delay_timer_id = setTimeout(function () {
          setting_mapping_key_recording_add(256);
          record_mouse_key_delay_timer_id = undefined;
        }, 0xc8);
      } else {
        if (result.button == 0x1) {
          setting_mapping_key_recording_add(258);
        } else if (result.button == 0x2) {
          setting_mapping_key_recording_add(257);
        } else {
          setting_mapping_key_recording_add(0xff + result.button + 0x1);
        }
      }
      pressedKeyCodes.push(value);
    }
    if (result.button != 0x0) {
      result.preventDefault();
    }
  } else {
    if (setting_macro_edit_recording) {
      if (edit_macros.length >= 0xc8) {
        layer.msg(layui.i18np.prop('STRID_SETTING_MAPPING_MACRO_RECORD_MAX_EX'), {
          'icon': 0x0
        }, function () {});
        return;
      }
      var i;
      if (result.button == 0x1) {
        i = 258;
      } else if (result.button == 0x2) {
        i = 257;
      } else {
        i = 0xff + result.button + 0x1;
      }
      if (result.button != 0x0) {
        result.preventDefault();
      }
      if (result.button == 0x0) {
        record_mouse_key_delay_timer_id = setTimeout(function (result, data, data) {
          setting_mapping_macro_recording_add(result, data, data);
          record_mouse_key_delay_timer_id = undefined;
        }, 0xc8, i, 0x100, Date.now());
      } else {
        setting_mapping_macro_recording_add(i, 0x100, Date.now());
      }
    }
  }
});
document.addEventListener("mousemove", function (result) {
  if (kbd_dks_dragging_name.length > 0x0) {
    if (result.clientX - kbd_dks_Start_x > 0x5) {
      kbd_dks_dragging = true;
      kbd_ui_refresh_dks_dragging(result.clientX - kbd_dks_Start_x, false);
    }
    return;
  }
});
document.addEventListener("mouseup", function (result) {
  if (kbd_dks_dragging_name.length > 0x0) {
    kbd_ui_refresh_dks_dragging(result.clientX - kbd_dks_Start_x, true);
    kbd_dks_dragging_name = '';
    return;
  }
  if (setting_mapping_key_recording) {
    const value = 'MouseButton' + result.button;
    const value2 = pressedKeyCodes.indexOf(value);
    if (value2 > -0x1) {
      pressedKeyCodes.splice(value2, 0x1);
    }
    if (result.button != 0x0) {
      result.preventDefault();
    }
  } else {
    if (setting_macro_edit_recording) {
      if (edit_macros.length >= 0xc8) {
        layer.msg(layui.i18np.prop("STRID_SETTING_MAPPING_MACRO_RECORD_MAX_EX"), {
          'icon': 0x0
        }, function () {});
        return;
      }
      var i;
      if (result.button == 0x1) {
        i = 258;
      } else if (result.button == 0x2) {
        i = 257;
      } else {
        i = 0xff + result.button + 0x1;
      }
      if (result.button != 0x0) {
        result.preventDefault();
      }
      if (result.button == 0x0) {
        record_mouse_key_delay_timer_id = setTimeout(function (result, data, data) {
          setting_mapping_macro_recording_add(result, data, data);
          record_mouse_key_delay_timer_id = undefined;
        }, 0xc8, i, 0x101, Date.now());
      } else {
        setting_mapping_macro_recording_add(i, 0x101, Date.now());
      }
    }
  }
});
document.addEventListener("mousewheel", function (result) {
  if (current_usb_client != undefined ? is_hs_keyboard(current_usb_client.device) : false) {
    return;
  }
  if (setting_mapping_key_recording) {
    if (result.deltaY < 0x0) {
      setting_mapping_key_recording_add(0x400);
    } else if (result.deltaY > 0x0) {
      setting_mapping_key_recording_add(0x401);
    }
    if (result.deltaX < 0x0) {
      setting_mapping_key_recording_add(0x403);
    } else if (result.deltaX > 0x0) {
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
      var flag = false;
      var macroInfo = create_macro_info();
      macroInfo.style = 0x16;
      if (result.deltaY < 0x0) {
        macroInfo.mouse_key_event = 0x20a;
        macroInfo.mouse_key_code = 0x1;
        if (edit_macros.length > 0x0) {
          var value = edit_macros[edit_macros.length - 0x1];
          if (value.mouse_key_event == 0x20a && macroInfo.mouse_key_code * value.mouse_key_code >= 0x0) {
            value.mouse_key_code += macroInfo.mouse_key_code;
            flag = true;
          }
        }
      } else {
        if (result.deltaY > 0x0) {
          macroInfo.mouse_key_event = 0x20a;
          macroInfo.mouse_key_code = -0x1;
          if (edit_macros.length > 0x0) {
            var value = edit_macros[edit_macros.length - 0x1];
            if (value.mouse_key_event == 0x20a && macroInfo.mouse_key_code * value.mouse_key_code >= 0x0) {
              value.mouse_key_code += macroInfo.mouse_key_code;
              flag = true;
            }
          }
        }
      }
      const now3 = Date.now();
      if (!flag) {
        macroInfo.mouse_key_time = 0x1;
        if (setting_macro_edit_recording_time != -0x1) {
          edit_macros[edit_macros.length - 0x1].mouse_key_time = $("[name=\"macro-record-fixed-time\"]")[0x0].checked ? 0x32 : now3 - setting_macro_edit_recording_time;
        }
        setting_macro_edit_recording_time = now3;
        macroInfo.name = get_key_name_from_code(macroInfo.mouse_key_code);
        edit_macros.push(macroInfo);
      } else {
        setting_macro_edit_recording_time = now3;
      }
      ui_refresh_mapping_macro_edit(current_usb_client);
    }
  }
});
function refresh_recorded_mapping_keys() {
  if (setting_mapping_key_recording) {
    var str = '';
    var flag = true;
    if (setting_mapping_keys_recorded[0x0] >= 0x0) {
      str += get_modifier_name_from_code(setting_mapping_keys_recorded[0x0]);
      flag = false;
    }
    if (setting_mapping_keys_recorded[0x1] >= 0x0) {
      if (!flag) {
        str += '+';
      }
      str += get_modifier_name_from_code(setting_mapping_keys_recorded[0x1]);
      flag = false;
    }
    if (setting_mapping_keys_recorded[0x2] >= 0x0) {
      if (!flag) {
        str += '+';
      }
      str += get_key_name_from_code(setting_mapping_keys_recorded[0x2]);
      flag = false;
    }
    layui.$("[name=\"recorded-mapping-key\"]").html(str);
  }
}
function receiver_cannot_pair(device) {
  var layui2 = layui.layer;
  var str = layui.i18np;
  var value = str.prop('STRID_SETTING_MOUSE_CAN_NOT_PAIR_WARNING');
  const displayName1 = get_display_name(current_usb_client);
  const value2 = get_display_name(device);
  layui2.confirm(value.replace("{name1}", displayName1).replace("{name2}", value2), {
    'title': str.prop('STRID_TITLE_WARNING'),
    'skin': 'layui-layer-confirm',
    'btn': [str.prop("STRID_BUTTON_CANCEL")],
    'btnAlign': 'c',
    'btn1': function () {
      layui2.closeLast(0x0);
    }
  });
}
function receiver_pair(client) {
  var layui2 = layui.layer;
  var str = layui.i18np;
  var value = str.prop("STRID_SETTING_MOUSE_PAIR_WARNING");
  const displayName2 = get_display_name(current_usb_client);
  const value2 = get_display_name(client);
  layui2.confirm(value.replace('{name1}', displayName2).replace("{name2}", value2), {
    'title': str.prop("STRID_TITLE_WARNING"),
    'skin': "layui-layer-confirm",
    'btn': [str.prop("STRID_SETTING_MOUSE_PAIR_S"), str.prop("STRID_BUTTON_CANCEL")],
    'btnAlign': 'c',
    'btn1': function () {
      layui2.closeLast(0x0);
      if (current_usb_client != undefined) {
        current_usb_client.pause = true;
        send_event_set_esb_addr(current_usb_client, get_esb_addr(client.device_info, 0xff), get_default_rf_channel(client), is_slow_receiver(client));
        if (current_usb_client.virtual) {
          send_event_action(current_usb_client, 0x33, 0x0);
        }
        current_usb_client.pause = false;
        post_send_client_data(current_usb_client);
      }
    },
    'btn2': function () {
      layui2.closeLast(0x0);
    }
  });
}
function receiver_unpair(client) {
  var layui2 = layui.layer;
  var str = layui.i18np;
  if (is_light(client)) {
    var value = str.prop("STRID_SETTING_MOUSE_UNPAIR_WARNING");
    const displayName3 = get_display_name(current_usb_client);
    const value2 = get_display_name(client);
    layui2.confirm(value.replace("{name1}", displayName3).replace("{name2}", value2), {
      'title': str.prop("STRID_TITLE_WARNING"),
      'skin': 'layui-layer-confirm',
      'btn': [str.prop('STRID_SETTING_MOUSE_UNPAIR_S'), str.prop("STRID_SETTING_LIGHT"), str.prop("STRID_BUTTON_CANCEL")],
      'btnAlign': 'c',
      'btn1': function () {
        layui2.closeLast(0x0);
        if (current_usb_client != undefined) {
          current_usb_client.pause = true;
          send_event_clear_esb_addr(current_usb_client, get_esb_addr(client.device_info, 0xff));
          if (current_usb_client.virtual) {
            send_event_action(current_usb_client, 0x33, 0x0);
          }
          current_usb_client.pause = false;
          post_send_client_data(current_usb_client);
        }
      },
      'btn2': function () {
        layui2.closeLast(0x0);
        current_usb_receiver = client;
        $("[name=\"receiver-light-mode\"]")[current_usb_receiver.device_info.light % 0x3].checked = true;
        layui.form.render('radio');
        layui2.open({
          'type': 0x1,
          'title': str.prop("STRID_SETTING_LIGHT"),
          'content': $('#receiver-light-setting-panel'),
          'btn': [str.prop("STRID_CLOSE")],
          'btnAlign': 'c',
          'btn1': function () {
            layui2.closeLast(0x0);
          }
        });
      },
      'btn3': function () {
        layui2.closeLast(0x0);
      }
    });
  } else {
    var value = str.prop("STRID_SETTING_MOUSE_UNPAIR_WARNING");
    const displayName4 = get_display_name(current_usb_client);
    const value3 = get_display_name(client);
    layui2.confirm(value.replace("{name1}", displayName4).replace("{name2}", value3), {
      'title': str.prop("STRID_TITLE_WARNING"),
      'skin': "layui-layer-confirm",
      'btn': [str.prop("STRID_SETTING_MOUSE_UNPAIR_S"), str.prop("STRID_BUTTON_CANCEL")],
      'btnAlign': 'c',
      'btn1': function () {
        layui2.closeLast(0x0);
        if (current_usb_client != undefined) {
          current_usb_client.pause = true;
          send_event_clear_esb_addr(current_usb_client, get_esb_addr(client.device_info, 0xff));
          if (current_usb_client.virtual) {
            send_event_action(current_usb_client, 0x33, 0x0);
          }
          current_usb_client.pause = false;
          post_send_client_data(current_usb_client);
        }
      },
      'btn2': function () {
        layui2.closeLast(0x0);
      }
    });
  }
}
function receiver_unpair_switch(client) {
  var layui2 = layui.layer;
  var str = layui.i18np;
  var value = str.prop("STRID_SETTING_MOUSE_UNPAIR_WARNING");
  const displayName5 = get_display_name(current_usb_client);
  const value2 = get_display_name(client);
  layui2.confirm(value.replace('{name1}', displayName5).replace("{name2}", value2), {
    'title': str.prop('STRID_TITLE_WARNING'),
    'skin': "layui-layer-confirm",
    'btn': [str.prop("STRID_SETTING_MOUSE_UNPAIR_S"), str.prop('STRID_SETTING_MOUSE_PAIRED_SELECT_S'), str.prop("STRID_BUTTON_CANCEL")],
    'btnAlign': 'c',
    'btn1': function () {
      layui2.closeLast(0x0);
      if (current_usb_client != undefined) {
        current_usb_client.pause = true;
        send_event_clear_esb_addr(current_usb_client, get_esb_addr(client.device_info, 0xff));
        current_usb_client.pause = false;
        post_send_client_data(current_usb_client);
      }
    },
    'btn2': function () {
      layui2.closeLast(0x0);
      if (current_usb_client != undefined) {
        current_usb_client.pause = true;
        send_event_select_esb_addr(current_usb_client, get_esb_addr(client.device_info, 0xff));
        if (current_usb_client.virtual) {
          send_event_action(current_usb_client, 0x33, 0x0);
        }
        current_usb_client.pause = false;
        post_send_client_data(current_usb_client);
        var isSelected = undefined;
        usb_client_list.forEach(item => {
          if (item.virtual && item.device == client.device) {
            isSelected = item;
          }
        });
        if (isSelected != undefined) {
          setTimeout(function (result) {
            send_event_query(result);
          }, 0xbb8, isSelected);
        }
      }
    },
    'btn3': function () {
      layui2.closeLast(0x0);
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
  var layui2 = layui.layer;
  if (macro_edit_panel_id != undefined) {
    layui2.close(macro_edit_panel_id);
  }
  if (macro_record_panel_id != undefined) {
    layui2.close(macro_record_panel_id);
  }
  if (key_record_panel_id != undefined) {
    layui2.close(key_record_panel_id);
  }
  if (select_key_panel_id != undefined) {
    layui2.close(select_key_panel_id);
  }
}
layui.use(['form', "layer", 'util', "i18np", "table"], function () {
  var layui2 = layui.form;
  var el = layui.layer;
  var layui3 = layui.util;
  var layui4 = layui.$;
  var str = layui.i18np;
  str.loadProperties(RESOURCE_URL);
  layui2.on("select(language)", function (result) {
    layui.data("lang", {
      'key': 'name',
      'value': result.value
    });
    str.loadProperties(RESOURCE_URL);
    layui2.render("checkbox");
    if (pair_panel_id >= 0x0) {
      el.style(pair_panel_id, {
        'left': (window.innerWidth - layui4("[id=pair-panel]").width()) / 0x2 + 'px'
      });
    }
    if (not_support_id >= 0x0) {
      el.style(not_support_id, {
        'left': (window.innerWidth - layui4("[id=not-support-panel]").width()) / 0x2 + 'px'
      });
    }
    request_device_cfg();
    setTimeout(function () {
      pc_key_manager_init();
      if (current_usb_client != undefined) {
        setting_mapping_init(current_usb_client);
        ui_refresh_mapping_key(current_usb_client);
        if (current_usb_client.device_info != undefined && current_usb_client.device_info.revision != undefined && current_usb_client.device_info.revision.substr(0x0, 0x2) == 'G-') {
          layui4("[name=\"setting-fw-channel\"]")[0x1].checked = true;
        } else {
          layui4("[name=\"setting-fw-channel\"]")[0x0].checked = true;
        }
        layui4("[name=\"setting-fw-channel\"]")[0x0].disabled = !current_usb_client.device_info.dynamicGOM;
        layui4("[name=\"setting-fw-channel\"]")[0x1].disabled = !current_usb_client.device_info.dynamicGOM;
        layui.form.render("radio");
      }
      window.postMessage({
        'action': ACTION_UI_REFRESH_CURRENT_CLIENT
      });
      clearTimeout(resize_timer_id);
      resize_timer_id = setTimeout(do_resize, 0xfa);
    }, 0x3e8);
  });
  var layui5 = layui.data('lang').name;
  layui4("select[name=language]")[0x0].value = layui5;
  layui4("[name=\"dark-theme\"]").prop("checked", is_dark_theme());
  layui2.on("switch(dark-theme)", function (result) {
    if (result.elem.checked) {
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
  layui3.countdown(new Date(0xbb7, 0x0, 0x1).getTime(), new Date().getTime(), function (result, data, timer) {
    start();
  });
  if (navigator.hid == undefined) {
    not_support_id = el.open({
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
      'content': layui4("#not-support-panel")
    });
  }
  layui3.on("pair-action", {
    'pair': async function () {
      layui4("#pair-device").css("display", "none");
      layui4("#pairing-waiting").css('display', '');
      layui4("#pairing-tips").css("display", '');
      navigator.hid.requestDevice({
        'filters': [{
          'vendorId': 0x1915
        }]
      }).then(len => {
        window.postMessage({
          'action': ACTION_REFRESH_CLIENT_LIST
        });
        if (len.length == 0x0) {
          layui4('#pair-device').css("display", '');
          layui4("#pairing-waiting").css("display", "none");
          layui4("#pairing-tips").css("display", 'none');
        }
      }).catch(err => {
        log_r(err);
      });
    },
    'pair-more': async function () {
      navigator.hid.requestDevice({
        'filters': [{
          'vendorId': 0x1915
        }]
      }).then(result => {
        window.postMessage({
          'action': ACTION_REFRESH_CLIENT_LIST
        });
      }).catch(err => {
        log_r(err);
      });
    },
    'refresh': async function () {
      usb_client_list.forEach(item => {
        if (item.virtual) {
          send_event_query(item);
        }
      });
      var layui6 = layui.layer;
      if (loading_id < 0x0) {
        loading_id = layui6.load(0x0);
        setTimeout(function () {
          layui6.close(loading_id);
          loading_id = -0x1;
        }, 0xbb8);
      }
    }
  });
  layui3.on("current-action", {
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
  layui3.on("list-action", {
    'select': async function () {
      current_usb_client = get_usb_client(this.getAttribute('usb-client-id'));
      editing = false;
      close_all_layer();
      if (tips_panel_id >= 0x0) {
        el.close(tips_panel_id);
        tips_panel_id = -0x1;
      }
      update_setting_x_polling();
      if (current_usb_client.device_info != undefined && current_usb_client.device_info.revision != undefined && current_usb_client.device_info.revision.substr(0x0, 0x2) == 'G-') {
        layui4("[name=\"setting-fw-channel\"]")[0x1].checked = true;
      } else {
        layui4("[name=\"setting-fw-channel\"]")[0x0].checked = true;
      }
      layui4("[name=\"setting-fw-channel\"]")[0x0].disabled = !current_usb_client.device_info.dynamicGOM;
      layui4("[name=\"setting-fw-channel\"]")[0x1].disabled = !current_usb_client.device_info.dynamicGOM;
      layui.form.render("radio");
      window.postMessage({
        'action': ACTION_UI_REFRESH_CLIENT_LIST
      });
      window.postMessage({
        'action': ACTION_UI_REFRESH_CURRENT_CLIENT
      });
    }
  });
  layui3.on("receiver-action", {
    'select': async function () {
      var client = get_usb_client(this.getAttribute("usb-client-id"));
      if (current_usb_client != undefined && current_usb_client.helloed) {
        if (!is_soc_compatible(current_usb_client, client)) {
          receiver_cannot_pair(client);
        } else {
          var esbChannel = current_usb_client.product_esb_ch == 0xff ? current_usb_client.device_info.esbChannel : current_usb_client.product_esb_ch;
          var value = is_esb_addr_arr_existed(current_usb_client.device_info, esbChannel, get_esb_addr(client.device_info, esbChannel));
          if (!value) {
            receiver_pair(client);
          } else {
            var value2 = get_esb_addr_arr(current_usb_client.device_info, esbChannel) == get_esb_addr(client.device_info, esbChannel);
            if (value2) {
              receiver_unpair(client);
            } else {
              receiver_unpair_switch(client);
            }
          }
        }
      }
    }
  });
  layui3.on("color-action", {
    'select': async function () {
      var attr = this.getAttribute("color-code");
      send_event_set_color_code(current_usb_client, attr);
    }
  });
  layui3.on("firmware-action", {
    'click': async function () {
      var layui7 = layui.layer;
      var layui8 = layui.i18np;
      layui7.confirm(layui8.prop('STRID_WEBHUB_NEW_FIRMWARE_INFO'), {
        'title': layui8.prop('STRID_TITLE_WARNING'),
        'btn': [layui8.prop("STRING_OK")],
        'btnAlign': 'c',
        'btn1': function () {
          layui7.closeLast(0x0);
        }
      });
    }
  });
  layui3.on('download-action', {
    'download': async function () {
      el.open({
        'type': 0x1,
        'title': false,
        'offset': 'rt',
        'id': "ID-download-panel-rt",
        'content': layui4("#download-panel"),
        'closeBtn': false,
        'shade': true,
        'shadeClose': true,
        'anim': 'slideDown'
      });
    }
  });
  layui3.on("setting-action", {
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
  layui2.on("checkbox(dpi-both-x-y)", function (result) {
    var resolution = current_usb_client.device_info.resolution;
    var value3 = resolution & 0xffff;
    var value4 = resolution >> 0x10 & 0xffff;
    if (result.elem.checked) {
      if (value4 == 0x0) {
        value4 = value3;
        set_cpi(current_usb_client, value3 | value4 << 0x10);
        var cpiLevels = current_usb_client.device_info.cpiLevels;
        for (var offset = 0x0; offset < cpiLevels.length; offset++) {
          value3 = cpiLevels[offset] & 0xffff;
          value4 = value3;
          set_cpi_level(current_usb_client, offset, value3 | value4 << 0x10, offset == cpiLevels.length - 0x1);
        }
      }
    } else {
      if (value4 != 0x0) {
        value4 = 0x0;
        set_cpi(current_usb_client, value3 | value4 << 0x10);
        var cpiLevels = current_usb_client.device_info.cpiLevels;
        for (var offset = 0x0; offset < cpiLevels.length; offset++) {
          value3 = cpiLevels[offset] & 0xffff;
          value4 = 0x0;
          set_cpi_level(current_usb_client, offset, value3 | value4 << 0x10, offset == cpiLevels.length - 0x1);
        }
      }
    }
    window.postMessage({
      'action': ACTION_UI_REFRESH_SETTING
    });
  });
  layui2.on("checkbox(glass-mode)", function (result) {
    set_enable_glass_mode(current_usb_client, result.elem.checked);
  });
  layui2.on("switch(x-polling)", function (result) {
    if (result.elem.checked) {
      localStorage.setItem("setting-x-polling", 0x1);
    } else {
      localStorage.setItem("setting-x-polling", 0x0);
    }
    window.postMessage({
      'action': ACTION_UI_REFRESH_SETTING
    });
  });
  layui3.on('dpi-level-edit-action', {
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
  layui3.on('dpi-level-add-action', {
    'edit': async function () {
      var resolution2 = current_usb_client.device_info.resolution;
      var isXY1 = (resolution2 >> 0x10 & 0xffff) > 0x0;
      var arr = current_usb_client.device_info.cpiLevels;
      var firstItem = arr[0x0];
      arr.forEach(item2 => {
        if (item2 > firstItem) {
          firstItem = item2;
        }
      });
      var value5 = firstItem & 0xffff;
      var value6 = firstItem >> 0x10 & 0xffff;
      if (isXY1 && value6 == 0x0) {
        value6 = value5;
      }
      cpi_level_index = -0x1;
      ui_refresh_dpi_input_panel(current_usb_client, value5 + 0x32, value6 + 0x32, 0x0, isXY1);
      el.open({
        'type': 0x1,
        'title': str.prop("STRID_SETTING_DPI_SPEED"),
        'skin': "layui-layer-confirm",
        'btn': [str.prop('STRING_OK'), str.prop("STRING_CANCEL")],
        'btnAlign': 'c',
        'content': layui4("#dpi-level-input-panel"),
        'btn1': function () {
          el.closeLast(0x0);
          var cpiRange = get_cpi_range(current_usb_client);
          var cpiStep1 = get_cpi_step(current_usb_client);
          var resolution3 = current_usb_client.device_info.resolution;
          var isXY2 = (resolution3 >> 0x10 & 0xffff) > 0x0;
          var value7 = 0x32;
          if (isXY2) {
            var value8 = cpiStep1 * (layui4("#x-dpi-level-input").val() / cpiStep1);
            if (value8 < cpiRange[0x0]) {
              value8 = cpiRange[0x1];
            }
            if (value8 > cpiRange[0x1]) {
              value8 = cpiRange[0x1];
            }
            var value9 = cpiStep1 * (layui4("#y-dpi-level-input").val() / cpiStep1);
            if (value9 < cpiRange[0x0]) {
              value9 = cpiRange[0x1];
            }
            if (value9 > cpiRange[0x1]) {
              value9 = cpiRange[0x1];
            }
            value7 = (value9 << 0x10) + value8;
          } else {
            value7 = cpiStep1 * (layui4("#dpi-level-input").val() / cpiStep1);
            if (value7 < cpiRange[0x0]) {
              value7 = cpiRange[0x1];
            }
            if (value7 > cpiRange[0x1]) {
              value7 = cpiRange[0x1];
            }
          }
          add_cpi_level(current_usb_client, value7, cpi_level_light);
          window.postMessage({
            'action': ACTION_UI_REFRESH_SETTING
          });
        },
        'btn2': function () {
          el.closeLast(0x0);
        }
      });
    }
  });
  layui3.on("cpi-level-action", {
    'select': async function () {
      cpi_level_index = this.getAttribute('cpi-level-index');
      if (cpi_level_editing) {
        var resolution4 = current_usb_client.device_info.resolution;
        var isXY3 = (resolution4 >> 0x10 & 0xffff) > 0x0;
        var cpiLevels2 = current_usb_client.device_info.cpiLevels;
        var cpiLevelColors = current_usb_client.device_info.cpiLevelColors;
        var value10 = cpiLevels2[cpi_level_index];
        var value11 = value10 & 0xffff;
        var value12 = value10 >> 0x10 & 0xffff;
        if (isXY3 && value12 == 0x0) {
          value12 = value11;
        }
        ui_refresh_dpi_input_panel(current_usb_client, value11, value12, cpiLevelColors[cpi_level_index], isXY3);
        el.open({
          'type': 0x1,
          'title': str.prop("STRID_SETTING_DPI_SPEED"),
          'skin': "layui-layer-confirm",
          'btn': [str.prop("STRID_SETTING_MAPPING_DELETE"), str.prop('STRING_OK'), str.prop("STRING_CANCEL")],
          'btnAlign': 'c',
          'content': layui4("#dpi-level-input-panel"),
          'btn1': function () {
            el.closeLast(0x0);
            remove_cpi_level(current_usb_client, cpi_level_index);
            window.postMessage({
              'action': ACTION_UI_REFRESH_SETTING
            });
          },
          'btn2': function () {
            el.closeLast(0x0);
            var cpiRange2 = get_cpi_range(current_usb_client);
            var cpiStep2 = get_cpi_step(current_usb_client);
            var resolution5 = current_usb_client.device_info.resolution;
            var isXY4 = (resolution5 >> 0x10 & 0xffff) > 0x0;
            var value13 = 0x32;
            if (isXY4) {
              var value14 = cpiStep2 * (layui4("#x-dpi-level-input").val() / cpiStep2);
              if (value14 < cpiRange2[0x0]) {
                value14 = cpiRange2[0x1];
              }
              if (value14 > cpiRange2[0x1]) {
                value14 = cpiRange2[0x1];
              }
              var value15 = cpiStep2 * (layui4('#y-dpi-level-input').val() / cpiStep2);
              if (value15 < cpiRange2[0x0]) {
                value15 = cpiRange2[0x1];
              }
              if (value15 > cpiRange2[0x1]) {
                value15 = cpiRange2[0x1];
              }
              value13 = (value15 << 0x10) + value14;
            } else {
              value13 = cpiStep2 * (layui4("#dpi-level-input").val() / cpiStep2);
              if (value13 < cpiRange2[0x0]) {
                value13 = cpiRange2[0x1];
              }
              if (value13 > cpiRange2[0x1]) {
                value13 = cpiRange2[0x1];
              }
            }
            set_cpi_level(current_usb_client, cpi_level_index, value13);
            set_cpi_level_color(current_usb_client, cpi_level_index, cpi_level_light);
            window.postMessage({
              'action': ACTION_UI_REFRESH_SETTING
            });
          },
          'btn3': function () {
            el.closeLast(0x0);
          }
        });
      } else {
        var resolution4 = current_usb_client.device_info.resolution;
        var value16 = resolution4 >> 0x10 & 0xffff;
        var cpiLevels3 = current_usb_client.device_info.cpiLevels;
        var value17 = cpiLevels3[cpi_level_index];
        if (value16 == 0x0) {
          value17 = value17 & 0xffff;
        }
        set_cpi(current_usb_client, value17);
      }
      window.postMessage({
        'action': ACTION_UI_REFRESH_SETTING
      });
    }
  });
  layui3.on('dpi-level-color-action', {
    'select': async function () {
      var attr2 = this.getAttribute("color-code");
      var light = current_usb_client.device_info.light;
      var value18 = light;
      if (attr2 == 'white') {
        value18 = light & -8 | 4 | 2 | 1;
      } else {
        if (attr2 == "red") {
          value18 = light & -8 | 4;
        } else {
          if (attr2 == 'green') {
            value18 = light & -8 | 2;
          } else {
            if (attr2 == "blue") {
              value18 = light & -8 | 1;
            } else {
              if (attr2 == "yellow") {
                value18 = light & -8 | 4 | 2;
              } else {
                if (attr2 == "purple") {
                  value18 = light & -8 | 4 | 1;
                } else {
                  if (attr2 == "skyblue") {
                    value18 = light & -8 | 2 | 1;
                  } else if (attr2 == "none") {
                    value18 = light & -8;
                  }
                }
              }
            }
          }
        }
      }
      light = value18 | 8;
      var resolution6 = current_usb_client.device_info.resolution;
      var isXY5 = (resolution6 >> 0x10 & 0xffff) > 0x0;
      var offset2 = 0x0;
      var offset3 = 0x0;
      if (isXY5) {
        offset2 = layui4("#x-dpi-level-input").val();
        offset3 = layui4("#y-dpi-level-input").val();
      } else {
        offset2 = layui4("#dpi-level-input").val();
        offset3 = 0x0;
      }
      ui_refresh_dpi_input_panel(current_usb_client, offset2, offset3, light, isXY5);
    }
  });
  layui2.on("radio(setting-polling-rates)", function (result) {
    var value19 = result.elem;
    var value20 = value19.value;
    set_polling_rate(current_usb_client, value20);
    window.postMessage({
      'action': ACTION_UI_REFRESH_SETTING
    });
  });
  layui2.on("checkbox(light-auto-off)", function (result) {
    var light2 = current_usb_client.device_info.light;
    if (result.elem.checked) {
      set_light(current_usb_client, light2 | 32);
    } else {
      set_light(current_usb_client, light2 & -33);
    }
  });
  layui2.on('radio(light-mode)', function (result) {
    var value21 = result.elem;
    var value22 = value21.value;
    var light3 = current_usb_client.device_info.light;
    if (value22 == 0x1) {
      set_light(current_usb_client, (light3 | 64) & -17);
    } else {
      if (value22 == 0x2) {
        set_light(current_usb_client, light3 & -65 & -17);
      } else if (value22 == 0x3) {
        set_light(current_usb_client, (light3 | 16) & -65);
      }
    }
    window.postMessage({
      'action': ACTION_UI_REFRESH_SETTING
    });
  });
  layui3.on("light-color-action", {
    'select': async function () {
      var attr3 = this.getAttribute("color-code");
      var light4 = current_usb_client.device_info.light;
      if (attr3 == "white") {
        set_light(current_usb_client, light4 & -8 | 4 | 2 | 1);
      } else {
        if (attr3 == "red") {
          set_light(current_usb_client, light4 & -8 | 4);
        } else {
          if (attr3 == "green") {
            set_light(current_usb_client, light4 & -8 | 2);
          } else {
            if (attr3 == "blue") {
              set_light(current_usb_client, light4 & -8 | 1);
            } else {
              if (attr3 == "yellow") {
                set_light(current_usb_client, light4 & -8 | 4 | 2);
              } else {
                if (attr3 == "purple") {
                  set_light(current_usb_client, light4 & -8 | 4 | 1);
                } else {
                  if (attr3 == "skyblue") {
                    set_light(current_usb_client, light4 & -8 | 2 | 1);
                  } else if (attr3 == "none") {
                    set_light(current_usb_client, light4 & -8);
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
  layui2.on("radio(setting-power-modes)", function (result) {
    var value23 = result.elem;
    var value24 = value23.value;
    set_power_mode(current_usb_client, value24);
  });
  layui2.on("radio(setting-lods)", function (result) {
    var value25 = result.elem;
    var value26 = value25.value;
    set_lod(current_usb_client, value26);
  });
  layui2.on("switch(setting-angle-snapping)", function (result) {
    set_angle_snapping(current_usb_client, result.elem.checked ? 0x1 : 0x0);
  });
  layui2.on('switch(setting-ripple-control)', function (result) {
    set_ripple_control(current_usb_client, result.elem.checked ? 0x1 : 0x0);
  });
  layui2.on("switch(setting-motion-sync)", function (result) {
    set_motion_sync(current_usb_client, result.elem.checked ? 0x1 : 0x0);
  });
  layui2.on("switch(setting-wireless-turbo)", function (result) {
    if (result.elem.checked) {
      set_wireless_turbo(current_usb_client, 0x1);
      layui4("[name=\"setting-rf-channel\"]").prop('disabled', false);
    } else {
      set_wireless_turbo(current_usb_client, 0x0);
      layui4("[name=\"setting-rf-channel\"]").prop('disabled', true);
    }
  });
  layui2.on("radio(setting-rf-channel)", function (result) {
    var value27 = result.elem;
    var value28 = value27.value;
    if (value28 == -0x1) {
      send_event_set_auto_hop(current_usb_client, true);
    } else {
      if (current_usb_client.device_info.hopChannelSupported) {
        send_event_set_auto_hop(current_usb_client, false);
      }
      if (value28 == 0x2) {
        send_event_set_rf_channel(current_usb_client, 0x2);
      } else {
        if (value28 == 0x28) {
          send_event_set_rf_channel(current_usb_client, 0x28);
        } else if (value28 == 0x50) {
          send_event_set_rf_channel(current_usb_client, 0x50);
        }
      }
    }
    var html = '';
    if (value28 == -0x1) {
      html += layui.i18np.prop("STRID_SETTING_RF_CHANNEL_AUTO");
      html += ": " + layui.i18np.prop('STRID_SETTING_RF_CHANNEL_AUTO_TIPS');
    } else {
      if (current_usb_client.device_info.rfChannel == 0x2) {
        html += layui.i18np.prop("STRID_SETTING_RF_CHANNEL_2");
        html += ": " + layui.i18np.prop('STRID_SETTING_RF_CHANNEL_2_TIPS');
      } else {
        if (current_usb_client.device_info.rfChannel == 0x28) {
          html += layui.i18np.prop("STRID_SETTING_RF_CHANNEL_40");
          html += ": " + layui.i18np.prop('STRID_SETTING_RF_CHANNEL_40_TIPS');
        } else if (current_usb_client.device_info.rfChannel == 0x50) {
          html += layui.i18np.prop("STRID_SETTING_RF_CHANNEL_80");
          html += ": " + layui.i18np.prop('STRID_SETTING_RF_CHANNEL_80_TIPS');
        }
      }
    }
    layui4("#selected-rf-channel-tips").html(html);
  });
  layui2.on("checkbox(power-saving)", function (result) {
    set_auto_tx_power(current_usb_client, result.elem.checked);
  });
  layui2.on("switch(onboard-allow-switch)", function (result) {
    var status = onboard_status[onboard_config_index];
    if (result.elem.checked) {
      status = status | 0x80;
    } else {
      status = status & -129;
    }
    set_onboard_status(current_usb_client, onboard_config_index, status);
    ui_refresh_onboard_config(usb_client);
  });
  layui2.on("select(onboard-config)", function (result) {
    var value29 = result.elem;
    var value30 = value29.value;
    if (need_save) {
      el.confirm(str.prop("STRID_SETTING_MAPPING_NOT_SAVED_DISCARD_CONFIRM"), {
        'title': str.prop("STRID_TITLE_WARNING"),
        'skin': 'layui-layer-confirm',
        'btn': [str.prop("STRID_SETTING_MAPPING_NOT_SAVED_DISCARD_S"), str.prop("STRID_SETTING_MAPPING_NOT_SAVED_BACK_S")],
        'btnAlign': 'c',
        'btn1': function () {
          el.closeLast(0x0);
          need_save = false;
          onboard_config_index = value30;
          onboard_keys = onboard_configs[onboard_config_index];
          combination_key_index = 0x0;
          select_mouse_key(current_usb_client, '');
          ui_refresh_combination_key(current_usb_client);
          ui_refresh_onboard_config(current_usb_client);
        },
        'btn2': function () {
          el.closeLast(0x0);
          ui_refresh_onboard_config(current_usb_client);
        }
      });
      return;
    }
    onboard_config_index = value30;
    onboard_keys = onboard_configs[onboard_config_index];
    combination_key_index = 0x0;
    select_mouse_key(current_usb_client, '');
    ui_refresh_combination_key(current_usb_client);
    ui_refresh_onboard_config(current_usb_client);
  });
  layui3.on("setting-onboard-status-action", {
    'select': async function () {
      var attr4 = this.getAttribute("color-code");
      var status2 = onboard_status[onboard_config_index];
      if (attr4 == 'white') {
        set_onboard_status(current_usb_client, onboard_config_index, status2 & -8 | 4 | 2 | 1);
      } else {
        if (attr4 == "red") {
          set_onboard_status(current_usb_client, onboard_config_index, status2 & -8 | 4);
        } else {
          if (attr4 == "green") {
            set_onboard_status(current_usb_client, onboard_config_index, status2 & -8 | 2);
          } else {
            if (attr4 == "blue") {
              set_onboard_status(current_usb_client, onboard_config_index, status2 & -8 | 1);
            } else {
              if (attr4 == 'yellow') {
                set_onboard_status(current_usb_client, onboard_config_index, status2 & -8 | 4 | 2);
              } else {
                if (attr4 == "purple") {
                  set_onboard_status(current_usb_client, onboard_config_index, status2 & -8 | 4 | 1);
                } else {
                  if (attr4 == "skyblue") {
                    set_onboard_status(current_usb_client, onboard_config_index, status2 & -8 | 2 | 1);
                  } else if (attr4 == "none") {
                    set_onboard_status(current_usb_client, onboard_config_index, status2 & -8);
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
  layui2.on("select(combination-key)", function (result) {
    var value31 = result.elem;
    var value32 = value31.value;
    combination_key_index = value32;
    select_mouse_key(current_usb_client, '');
  });
  layui3.on('mapping-action', {
    'setting-mapping-key': async function () {
      var attr5 = this.getAttribute("value");
      select_key_name = '';
      if (attr5 == "setting_mapping_key_wheel_down") {
        select_key_name = KEY_WHEEL_DOWN;
      } else {
        if (attr5 == "setting_mapping_key_wheel_up") {
          select_key_name = KEY_WHEEL_UP;
        } else {
          for (let index = 0x0; index < mouse_keys.length; index++) {
            if (attr5 == setting_mapping_keys[index]) {
              select_key_name = get_key_name_from_label(mouse_keys[index].label);
              break;
            }
          }
        }
      }
      var label = mouse_key_labels[combination_key_index];
      var len2 = get_key_name_from_label(label);
      if (len2.length > 0x0) {
        select_key_name = len2 + '+' + select_key_name;
      }
      select_mouse_key(current_usb_client, select_key_name);
    }
  });
  var layui9 = layui.element;
  layui9.on("tab(mapping-key-type)", function (result) {
    var value33 = result.index;
    if (select_key_name.length > 0x0) {
      var keyInfo = get_select_key_info();
      if (Object.keys(keyInfo).length == 0x0) {
        var index2 = -0x1;
        for (let count = 0x0; count < mouse_keys.length; count++) {
          if (select_key_name == mouse_keys[count].name) {
            index2 = count;
            break;
          }
        }
        if (index2 >= 0x0) {
          var keyInfo = create_key_info();
          keyInfo.name = mouse_keys[index2].name;
          keyInfo.label = mouse_keys[index2].label;
          onboard_keys.push(keyInfo);
        }
      }
      for (let len3 = 0x0; len3 < onboard_keys.length; len3++) {
        if (select_key_name == onboard_keys[len3].name) {
          if (value33 == 0x0) {
            onboard_keys[len3].configType = 0x0;
            onboard_keys[len3].touch_style = 0x1b;
          } else {
            if (value33 == 0x1) {
              onboard_keys[len3].configType = 0x5;
            } else if (value33 == 0x2) {
              onboard_keys[len3].configType = 0x0;
              onboard_keys[len3].touch_style = 0x1d;
            } else {
              onboard_keys[len3].configType = -0x1;
            }
          }
        }
      }
      for (let len4 = 0x0; len4 < onboard_keys.length; len4++) {
        if (select_key_name == onboard_keys[len4].name) {
          for (let index3 = onboard_keys.length - 0x1; index3 > len4; index3--) {
            if (select_key_name == onboard_keys[index3].name) {
              if (value33 == 0x1) {
                if (onboard_keys[len4].macro_style == onboard_keys[index3].macro_style) {
                  onboard_keys.splice(index3, 0x1);
                }
              } else {
                onboard_keys.splice(index3, 0x1);
              }
            }
          }
        }
      }
      update_mapping(current_usb_client, value33);
      ui_refresh_mapping_key(current_usb_client);
      ui_refresh_combination_key(current_usb_client);
    }
  });
  layui2.on("select(mapping-ctrl-key1)", function (result) {
    set_mapping_keys(current_usb_client);
    ui_refresh_tab_mapping_key(current_usb_client);
  });
  layui2.on("select(mapping-ctrl-key2)", function (result) {
    set_mapping_keys(current_usb_client);
    ui_refresh_tab_mapping_key(current_usb_client);
  });
  layui2.on("select(mapping-key)", function (result) {
    set_mapping_keys(current_usb_client);
    ui_refresh_tab_mapping_key(current_usb_client);
  });
  layui2.on("input-affix(wheel-delta-input)", function (result) {
    document.getElementById('wheel-delta-input').dispatchEvent(new Event("input", {
      'bubbles': true
    }));
  });
  layui4('#wheel-delta-input').on("input", function (result) {
    var keyInfo2 = get_select_key_info();
    if (Object.keys(keyInfo2).length == 0x0) {
      return;
    }
    keyInfo2.mouse_mapping_key_data = result.delegateTarget.value;
    if (keyInfo2.mouse_mapping_key_data < 0x1 || keyInfo2.mouse_mapping_key_data > 0x40) {
      keyInfo2.mouse_mapping_key_data = 0x1;
    }
    set_mapping_keys(current_usb_client);
  });
  layui2.on("checkbox(mapping-key-turbo)", function (result) {
    var keyInfo3 = get_select_key_info();
    if (Object.keys(keyInfo3).length == 0x0) {
      return;
    }
    if (result.elem.checked) {
      keyInfo3.mouse_auto_click = 0x1;
    } else {
      keyInfo3.mouse_auto_click = 0x0;
    }
    ui_refresh_tab_mapping_key(current_usb_client);
    need_save = true;
    ui_refresh_onboard_config(current_usb_client);
  });
  layui3.on("shell-cmd-app-browse-action", {
    'edit': async function () {
      layui4('#shell-cmd-app-browse_file').click();
    }
  });
  layui2.on("select(mapping-function)", function (result) {
    var value34 = result.elem;
    var index4 = value34.value;
    var keyInfo4 = get_select_key_info();
    if (Object.keys(keyInfo4).length == 0x0) {
      return;
    }
    keyInfo4.mouse_mapping_function = mouse_functions[index4];
    ui_refresh_tab_mapping_function(current_usb_client);
    ui_refresh_mapping_key(current_usb_client);
    ui_refresh_combination_key(current_usb_client);
    need_save = true;
    ui_refresh_onboard_config(current_usb_client);
  });
  layui2.on('radio(function-shell-cmd)', function (result) {
    var value35 = result.elem;
    var value36 = value35.value;
    var keyInfo5 = get_select_key_info();
    if (Object.keys(keyInfo5).length == 0x0) {
      return;
    }
    if (value36 == 0x1) {
      keyInfo5.mouse_mapping_function_text = layui4("[name=\"function-shell-cmd-web\"]").val();
      layui4('#function-shell-cmd-app-browse').css('display', 'none');
      layui4('#function-shell-cmd-app-browse').prop("disabled", true);
      layui4("[name=\"function-shell-cmd-app\"]").prop("disabled", true);
      layui4("[name=\"function-shell-cmd-web\"]").prop("disabled", false);
      layui4("#function-shell-cmd-app-container").css('display', "none");
      layui4("#function-shell-cmd-web-container").css("display", '');
    } else {
      keyInfo5.mouse_mapping_function_text = layui4("[name=\"function-shell-cmd-app\"]").val();
      layui4("#function-shell-cmd-app-browse").css('display', "none");
      layui4("#function-shell-cmd-app-browse").prop("disabled", false);
      layui4("[name=\"function-shell-cmd-app\"]").prop("disabled", false);
      layui4("[name=\"function-shell-cmd-web\"]").prop("disabled", true);
      layui4("#function-shell-cmd-app-container").css('display', '');
      layui4("#function-shell-cmd-web-container").css('display', "none");
    }
    need_save = true;
    ui_refresh_onboard_config(current_usb_client);
  });
  layui4("#function-shell-cmd-app").on("input", function (result) {
    var keyInfo6 = get_select_key_info();
    if (Object.keys(keyInfo6).length == 0x0) {
      return;
    }
    keyInfo6.mouse_mapping_function_text = result.delegateTarget.value;
  });
  layui4('#function-shell-cmd-web').on("input", function (result) {
    var keyInfo7 = get_select_key_info();
    if (Object.keys(keyInfo7).length == 0x0) {
      return;
    }
    keyInfo7.mouse_mapping_function_text = result.delegateTarget.value;
    need_save = true;
    ui_refresh_onboard_config(current_usb_client);
  });
  layui2.on("input-affix(mapping-key-turbo-freq-input)", function (result) {
    document.getElementById("mapping-key-turbo-freq-input").dispatchEvent(new Event('input', {
      'bubbles': true
    }));
  });
  layui4("#mapping-key-turbo-freq-input").on('input', function (result) {
    var keyInfo8 = get_select_key_info();
    if (Object.keys(keyInfo8).length == 0x0) {
      return;
    }
    var len5 = result.delegateTarget.value;
    var parsedInt1 = len5.length == 0x0 ? 0x0 : parseInt(len5);
    if (parsedInt1 <= 0x0) {
      parsedInt1 = 0x1;
    }
    if (parsedInt1 != parseInt(0x3e8 / (keyInfo8.mouse_auto_click_down + keyInfo8.mouse_auto_click_up))) {
      var value37 = parseInt(0x3e8 / parsedInt1);
      if (value37 >= 0x64) {
        keyInfo8.mouse_auto_click_down = 0x32;
        keyInfo8.mouse_auto_click_up = value37 - keyInfo8.mouse_auto_click_down;
      } else {
        keyInfo8.mouse_auto_click_up = parseInt(value37 / 0x2);
        keyInfo8.mouse_auto_click_down = value37 - keyInfo8.mouse_auto_click_up;
      }
      if (keyInfo8.mouse_auto_click_down < 0x0) {
        keyInfo8.mouse_auto_click_down = 0x0;
      }
      if (keyInfo8.mouse_auto_click_up < 0x0) {
        keyInfo8.mouse_auto_click_up = 0x0;
      }
      if (keyInfo8.mouse_auto_click_down == 0x0 && keyInfo8.mouse_auto_click_up == 0x0) {
        keyInfo8.mouse_auto_click_down = 0x1;
      }
      layui4("#mapping-key-turbo-down-keep-input").val(keyInfo8.mouse_auto_click_down);
      layui4("#mapping-key-turbo-up-keep-input").val(keyInfo8.mouse_auto_click_up);
    }
    need_save = true;
    ui_refresh_onboard_config(current_usb_client);
  });
  layui2.on("input-affix(mapping-key-turbo-rand-input)", function (result) {
    document.getElementById("mapping-key-turbo-rand-input").dispatchEvent(new Event("input", {
      'bubbles': true
    }));
  });
  layui4("#mapping-key-turbo-rand-input").on("input", function (result) {
    var keyInfo9 = get_select_key_info();
    if (Object.keys(keyInfo9).length == 0x0) {
      return;
    }
    var len6 = result.delegateTarget.value;
    var parsedInt2 = len6.length == 0x0 ? 0x0 : parseInt(len6);
    if (parsedInt2 < 0x0) {
      parsedInt2 = 0x0;
    }
    keyInfo9.mouse_auto_click_rand = parsedInt2;
    need_save = true;
    ui_refresh_onboard_config(current_usb_client);
  });
  layui2.on('input-affix(mapping-key-turbo-down-keep-input)', function (result) {
    document.getElementById("mapping-key-turbo-down-keep-input").dispatchEvent(new Event("input", {
      'bubbles': true
    }));
  });
  layui4("#mapping-key-turbo-down-keep-input").on("input", function (result) {
    var keyInfo10 = get_select_key_info();
    if (Object.keys(keyInfo10).length == 0x0) {
      return;
    }
    var len7 = result.delegateTarget.value;
    var parsedInt3 = len7.length == 0x0 ? 0x0 : parseInt(len7);
    if (parsedInt3 < 0x0) {
      parsedInt3 = 0x0;
    }
    keyInfo10.mouse_auto_click_down = parsedInt3;
    if (keyInfo10.mouse_auto_click_down == 0x0 && keyInfo10.mouse_auto_click_up == 0x0) {
      keyInfo10.mouse_auto_click_down = 0x1;
    }
    var value38 = keyInfo10.mouse_auto_click_down + keyInfo10.mouse_auto_click_up;
    if (value38 <= 0x0) {
      value38 = 0x1;
    }
    layui4("#mapping-key-turbo-freq-input").val(parseInt(0x3e8 / value38));
    need_save = true;
    ui_refresh_onboard_config(current_usb_client);
  });
  layui2.on('input-affix(mapping-key-turbo-up-keep-input)', function (result) {
    document.getElementById("mapping-key-turbo-up-keep-input").dispatchEvent(new Event('input', {
      'bubbles': true
    }));
  });
  layui4("#mapping-key-turbo-up-keep-input").on("input", function (result) {
    var keyInfo11 = get_select_key_info();
    if (Object.keys(keyInfo11).length == 0x0) {
      return;
    }
    var len8 = result.delegateTarget.value;
    var parsedInt4 = len8.length == 0x0 ? 0x0 : parseInt(len8);
    if (parsedInt4 < 0x0) {
      parsedInt4 = 0x0;
    }
    keyInfo11.mouse_auto_click_up = parsedInt4;
    if (keyInfo11.mouse_auto_click_down == 0x0 && keyInfo11.mouse_auto_click_up == 0x0) {
      keyInfo11.mouse_auto_click_up = 0x1;
    }
    var value39 = keyInfo11.mouse_auto_click_down + keyInfo11.mouse_auto_click_up;
    if (value39 <= 0x0) {
      value39 = 0x1;
    }
    layui4("#mapping-key-turbo-freq-input").val(parseInt(0x3e8 / value39));
    need_save = true;
    ui_refresh_onboard_config(current_usb_client);
  });
  layui3.on('macro-edit-item-action', {
    'select': async function () {
      macro_edit_index = this.getAttribute("macro-edit-item-index");
      current_edit_macro = clone_macro_info(edit_macros[macro_edit_index]);
      macro_keep_time_min = current_edit_macro.mouse_key_time / 0x1f4 * 0x1f4;
      ui_refresh_mapping_macro_add(current_usb_client);
      el.open({
        'type': 0x1,
        'title': str.prop('STRID_SETTING_MAPPING_MACRO_ACTION_EDIT'),
        'skin': "layui-layer-confirm",
        'content': layui4('#setting-mapping-macro-add-panel'),
        'btn': [str.prop('STRID_DELETE'), str.prop('STRID_INSERT'), str.prop("STRID_SAVE")],
        'btnAlign': 'c',
        'btn1': function () {
          el.closeLast(0x0);
          edit_macros.splice(macro_edit_index, 0x1);
          ui_refresh_mapping_macro_edit(current_usb_client);
        },
        'btn2': function () {
          el.closeLast(0x0);
          var macroInfo = create_macro_info();
          macroInfo.style = 0x16;
          var value40 = macro_keys[parseInt(layui4("[name=\"macro-add-select-key\"]").val())].vCode;
          if (current_usb_client != undefined ? is_hs_keyboard(current_usb_client.device) : false) {
            value40 = get_key_code_from_name(document.getElementById("kbd-macro-add-select-key").textContent);
          }
          if (value40 == 0x401) {
            macroInfo.mouse_key_event = 0x20a;
            macroInfo.mouse_key_code = -parseInt(layui4("#macro-add-wheel-delta-input").val());
          } else {
            if (value40 == 0x400) {
              macroInfo.mouse_key_event = 0x20a;
              macroInfo.mouse_key_code = parseInt(layui4("#macro-add-wheel-delta-input").val());
            } else {
              if (value40 == 0x402) {
                macroInfo.mouse_key_event = 0x20e;
                macroInfo.mouse_key_code = -parseInt("#macro-add-wheel-delta-input".val());
              } else {
                if (value40 == 0x403) {
                  macroInfo.mouse_key_event = 0x20e;
                  macroInfo.mouse_key_code = parseInt(layui4('#macro-add-wheel-delta-input').val());
                } else {
                  if (value40 == 0x404) {
                    macroInfo.mouse_key_event = 0x200;
                    var value41 = Math.round(parseFloat(layui4('#macro-add-move-delta-x-input').val()) * 0xa) + 0x7ff;
                    var value42 = Math.round(parseFloat(layui4("#macro-add-move-delta-y-input").val()) * 0xa) + 0x7ff;
                    macroInfo.mouse_key_code = value41 << 0x10 | value42;
                    macroInfo.mouse_key_loop = parseInt(layui4('#macro-add-move-loop-input').val());
                    if (macroInfo.mouse_key_loop <= 0x0) {
                      macroInfo.mouse_key_loop = 0x1;
                    }
                  } else {
                    if (value40 == 0x405) {
                      macroInfo.mouse_key_event = 0x2ff;
                      var value43 = parseInt(layui4("#macro-add-position-x-input").val());
                      var value44 = parseInt(layui4('#macro-add-position-y-input').val());
                      var screenW = window.screen.width;
                      var screenH = window.screen.height;
                      value43 = parseInt((value43 + 0.9) * 0xffff / screenW);
                      value44 = parseInt((value44 + 0.9) * 0xffff / screenH);
                      macroInfo.mouse_key_code = value43 << 0x10 | value44;
                    } else {
                      macroInfo.mouse_key_code = value40;
                      if (layui4("[name=\"mapping-macro-action-key-event\"]")[0x0].checked) {
                        macroInfo.mouse_key_event = 0x100;
                      } else if (layui4("[name=\"mapping-macro-action-key-event\"]")[0x1].checked) {
                        macroInfo.mouse_key_event = 0x101;
                      } else {
                        macroInfo.mouse_key_event = 0x0;
                      }
                    }
                  }
                }
              }
            }
          }
          macroInfo.mouse_key_time = current_edit_macro.mouse_key_time;
          macroInfo.name = get_key_name_from_code(value40);
          edit_macros.splice(macro_edit_index, 0x0, macroInfo);
          ui_refresh_mapping_macro_edit(current_usb_client);
        },
        'btn3': function () {
          el.closeLast(0x0);
          current_edit_macro.style = 0x16;
          var value45 = macro_keys[parseInt(layui4("[name=\"macro-add-select-key\"]").val())].vCode;
          if (current_usb_client != undefined ? is_hs_keyboard(current_usb_client.device) : false) {
            value45 = get_key_code_from_name(document.getElementById('kbd-macro-add-select-key').textContent);
          }
          if (value45 == 0x401) {
            current_edit_macro.mouse_key_event = 0x20a;
            current_edit_macro.mouse_key_code = -parseInt(layui4("#macro-add-wheel-delta-input").val());
          } else {
            if (value45 == 0x400) {
              current_edit_macro.mouse_key_event = 0x20a;
              current_edit_macro.mouse_key_code = parseInt(layui4("#macro-add-wheel-delta-input").val());
            } else {
              if (value45 == 0x402) {
                current_edit_macro.mouse_key_event = 0x20e;
                current_edit_macro.mouse_key_code = -parseInt(layui4("#macro-add-wheel-delta-input").val());
              } else {
                if (value45 == 0x403) {
                  current_edit_macro.mouse_key_event = 0x20e;
                  current_edit_macro.mouse_key_code = parseInt(layui4("#macro-add-wheel-delta-input").val());
                } else {
                  if (value45 == 0x404) {
                    current_edit_macro.mouse_key_event = 0x200;
                    var value46 = Math.round(parseFloat(layui4("#macro-add-move-delta-x-input").val()) * 0xa) + 0x7ff;
                    var value47 = Math.round(parseFloat(layui4("#macro-add-move-delta-y-input").val()) * 0xa) + 0x7ff;
                    current_edit_macro.mouse_key_code = value46 << 0x10 | value47;
                    current_edit_macro.mouse_key_loop = parseInt(layui4('#macro-add-move-loop-input').val());
                    if (current_edit_macro.mouse_key_loop <= 0x0) {
                      current_edit_macro.mouse_key_loop = 0x1;
                    }
                  } else {
                    if (value45 == 0x405) {
                      current_edit_macro.mouse_key_event = 0x2ff;
                      var value48 = parseInt(layui4("#macro-add-position-x-input").val());
                      var value49 = parseInt(layui4('#macro-add-position-y-input').val());
                      var screenW = window.screen.width;
                      var screenH = window.screen.height;
                      value48 = parseInt((value48 + 0.9) * 0xffff / screenW);
                      value49 = parseInt((value49 + 0.9) * 0xffff / screenH);
                      current_edit_macro.mouse_key_code = value48 << 0x10 | value49;
                    } else {
                      current_edit_macro.mouse_key_code = value45;
                      if (layui4("[name=\"mapping-macro-action-key-event\"]")[0x0].checked) {
                        current_edit_macro.mouse_key_event = 0x100;
                      } else if (layui4("[name=\"mapping-macro-action-key-event\"]")[0x1].checked) {
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
          current_edit_macro.name = get_key_name_from_code(value45);
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
  layui3.on('mapping-macro-edit-action', {
    'edit': async function () {
      var keyInfo12 = get_select_key_info();
      if (Object.keys(keyInfo12).length == 0x0) {
        return;
      }
      edit_macros = [];
      keyInfo12.macroKeys.forEach(item3 => {
        edit_macros.push(clone_macro_info(item3));
      });
      ui_refresh_mapping_macro_edit(current_usb_client);
      macro_edit_panel_id = el.open({
        'type': 0x1,
        'title': str.prop('STRID_SETTING_MAPPING_MACRO_EDIT'),
        'skin': 'layui-layer-confirm',
        'btn': [str.prop('STRID_SETTING_MAPPING_MACRO_RECORD'), str.prop("STRID_SETTING_MAPPING_MACRO_ACTION_ADD_S"), str.prop("STRID_CLEAR"), str.prop("STRID_SAVE")],
        'btnAlign': 'c',
        'content': layui4("#setting-mapping-macro-edit-panel"),
        'btn1': function () {
          var flag = false;
          setting_macro_edit_recording = false;
          setting_macro_edit_recording_time = -0x1;
          document.oncontextmenu = function (result) {
            result.preventDefault();
          };
          macro_record_panel_id = el.open({
            'type': 0x1,
            'title': str.prop("STRID_SETTING_MAPPING_MACRO_RECORD_TITLE"),
            'skin': "layui-layer-confirm",
            'content': layui4("#setting-mapping-macro-record-panel"),
            'btn': [str.prop("STRID_SETTING_FACTORY_START")],
            'btnAlign': 'c',
            'btn1': function () {
              if (!flag) {
                flag = true;
                setting_macro_edit_recording = true;
                var value50 = layui4('#layui-layer' + macro_record_panel_id + " .layui-layer-btn .layui-layer-btn0");
                value50.html(str.prop("STRID_DONE"));
                layui4('#macro-record-waiting-info').css("display", '');
                layui4("#macro-record-fixed-time-container").css("display", "none");
                return false;
              } else {
                if (record_mouse_key_delay_timer_id != undefined) {
                  clearTimeout(record_mouse_key_delay_timer_id);
                  record_mouse_key_delay_timer_id = undefined;
                }
                el.closeLast(0x0);
                setting_macro_edit_recording = false;
                document.oncontextmenu = null;
                layui4("#macro-record-waiting-info").css('display', "none");
                layui4("#macro-record-fixed-time-container").css('display', '');
              }
            },
            'cancel': function (result, data, index) {
              if (flag) {
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
              if (flag) {
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
          el.open({
            'type': 0x1,
            'title': str.prop("STRID_SETTING_MAPPING_MACRO_ACTION_ADD"),
            'skin': "layui-layer-confirm",
            'content': layui4("#setting-mapping-macro-add-panel"),
            'btn': [str.prop("STRID_SAVE")],
            'btnAlign': 'c',
            'btn1': function () {
              el.closeLast(0x0);
              current_edit_macro.style = 0x16;
              var value51 = macro_keys[parseInt(layui4("[name=\"macro-add-select-key\"]").val())].vCode;
              if (value51 == 0x401) {
                current_edit_macro.mouse_key_event = 0x20a;
                current_edit_macro.mouse_key_code = -parseInt(layui4("#macro-add-wheel-delta-input").val());
              } else {
                if (value51 == 0x400) {
                  current_edit_macro.mouse_key_event = 0x20a;
                  current_edit_macro.mouse_key_code = parseInt(layui4("#macro-add-wheel-delta-input").val());
                } else {
                  if (value51 == 0x402) {
                    current_edit_macro.mouse_key_event = 0x20e;
                    current_edit_macro.mouse_key_code = -parseInt(layui4("#macro-add-wheel-delta-input").val());
                  } else {
                    if (value51 == 0x403) {
                      current_edit_macro.mouse_key_event = 0x20e;
                      current_edit_macro.mouse_key_code = parseInt(layui4("#macro-add-wheel-delta-input").val());
                    } else {
                      if (value51 == 0x404) {
                        current_edit_macro.mouse_key_event = 0x200;
                        var value52 = Math.round(parseFloat(layui4("#macro-add-move-delta-x-input").val()) * 0xa) + 0x7ff;
                        var value53 = Math.round(parseFloat(layui4("#macro-add-move-delta-y-input").val()) * 0xa) + 0x7ff;
                        current_edit_macro.mouse_key_code = value52 << 0x10 | value53;
                        current_edit_macro.mouse_key_loop = parseInt(layui4("#macro-add-move-loop-input").val());
                        if (current_edit_macro.mouse_key_loop <= 0x0) {
                          current_edit_macro.mouse_key_loop = 0x1;
                        }
                      } else {
                        if (value51 == 0x405) {
                          current_edit_macro.mouse_key_event = 0x2ff;
                          var value54 = parseInt(layui4("#macro-add-position-x-input").val());
                          var value55 = parseInt(layui4("#macro-add-position-y-input").val());
                          var screenW = window.screen.width;
                          var screenH = window.screen.height;
                          value54 = parseInt((value54 + 0.9) * 0xffff / screenW);
                          value55 = parseInt((value55 + 0.9) * 0xffff / screenH);
                          current_edit_macro.mouse_key_code = value54 << 0x10 | value55;
                        } else {
                          current_edit_macro.mouse_key_code = value51;
                          if (layui4("[name=\"mapping-macro-action-key-event\"]")[0x0].checked) {
                            current_edit_macro.mouse_key_event = 0x100;
                          } else if (layui4("[name=\"mapping-macro-action-key-event\"]")[0x1].checked) {
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
              current_edit_macro.name = get_key_name_from_code(value51);
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
          el.closeLast(0x0);
          keyInfo12.macroKeys = edit_macros;
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
  layui2.on('select(macro-add-select-key)', function (result) {
    var value56 = result.elem;
    var index5 = value56.value;
    var value57 = macro_keys[index5].vCode;
    if (value57 == 0x0) {
      current_edit_macro.mouse_key_code = 0x0;
      current_edit_macro.mouse_key_event = 0x0;
      current_edit_macro.mouse_key_time = 0x0;
    } else {
      if (value57 == 0x401) {
        current_edit_macro.mouse_key_event = 0x20a;
        current_edit_macro.mouse_key_code = -0x1;
      } else {
        if (value57 == 0x400) {
          current_edit_macro.mouse_key_event = 0x20a;
          current_edit_macro.mouse_key_code = 0x1;
        } else {
          if (value57 == 0x403) {
            current_edit_macro.mouse_key_event = 0x20e;
            current_edit_macro.mouse_key_code = 0x1;
          } else {
            if (value57 == 0x402) {
              current_edit_macro.mouse_key_event = 0x20e;
              current_edit_macro.mouse_key_code = -0x1;
            } else {
              if (value57 == 0x404) {
                current_edit_macro.mouse_key_event = 0x200;
                current_edit_macro.mouse_key_code = 134154239;
                current_edit_macro.mouse_key_loop = 0x1;
              } else {
                if (value57 == 0x405) {
                  current_edit_macro.mouse_key_event = 0x2ff;
                  current_edit_macro.mouse_key_code = 0x0;
                } else {
                  current_edit_macro.mouse_key_code = value57;
                  var offset4 = 0x0;
                  var offset5 = 0x0;
                  for (var len9 = 0x0; len9 < edit_macros.length; len9++) {
                    if (edit_macros[len9].mouse_key_code == value57) {
                      if (edit_macros[len9].mouse_key_event == 0x100) {
                        offset4++;
                      } else if (edit_macros[len9].mouse_key_event == 0x101) {
                        offset5++;
                      }
                    }
                  }
                  current_edit_macro.mouse_key_event = offset4 > offset5 ? 0x101 : 0x100;
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
  layui3.on('mapping-macro-more-keep-time-action', {
    'edit': async function () {
      macro_keep_time_min += 0x1f4;
      current_edit_macro.mouse_key_time += 0x1f4;
      ui_refresh_mapping_macro_add(current_usb_client);
    }
  });
  layui3.on("mapping-macro-less-keep-time-action", {
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
  layui2.on('input-affix(macro-add-wheel-delta-input)', function (result) {
    document.getElementById("macro-add-wheel-delta-input").dispatchEvent(new Event("input", {
      'bubbles': true
    }));
  });
  layui4("#macro-add-wheel-delta-input").on('input', function (result) {
    var len10 = result.delegateTarget.value;
    var parsedInt5 = len10.length == 0x0 ? 0x0 : parseInt(len10);
    if (parsedInt5 < 0x0) {
      parsedInt5 = 0x0;
    }
    current_edit_macro.mouse_key_code = parsedInt5;
    ui_refresh_mapping_macro_add(current_usb_client);
  });
  layui2.on("select(mapping-macro-trigger-type)", function (result) {
    var value58 = result.elem;
    var value59 = value58.value;
    var keyInfo13 = get_select_key_info();
    if (Object.keys(keyInfo13).length == 0x0) {
      return;
    }
    if (macro_trigger_type_index != value59) {
      var triggerType = macro_trigger_type_index;
      macro_trigger_type_index = value59;
      keyInfo13 = get_select_key_info();
      if (Object.keys(keyInfo13).length != 0x0) {
        keyInfo13.configType = 0x5;
        keyInfo13.macro_style = macro_trigger_type_index;
      }
      if (macro_trigger_type_index == 0x6) {
        if (keyInfo13.macro_endKey == 0x0) {
          var len11 = keyInfo13.label.split('+');
          var value60 = len11[len11.length - 0x1];
          for (var offset6 = 0x0; offset6 < mouse_key_labels.length; offset6++) {
            if (mouse_key_labels[offset6] == value60) {
              layui4("[name=\"mapping-macro-stop-key\"]").val(offset6);
              keyInfo13.macro_endKey = get_key_id_from_name(keyInfo13.name);
              break;
            }
          }
        } else {
          for (var offset6 = 0x0; offset6 < mouse_key_labels.length; offset6++) {
            var value61 = get_key_name_from_label(mouse_key_labels[offset6]);
            var value62 = get_key_id_from_name(value61);
            if (keyInfo13.macro_endKey == value62) {
              layui4("[name=\"mapping-macro-stop-key\"]").val(offset6);
              break;
            }
          }
        }
      } else {
        if (triggerType == 0x6) {
          if (keyInfo13.macro_endKey != 0x0) {
            layui4("[name=\"mapping-macro-stop-key\"]").val(0x0);
            var value61 = get_key_name_from_label(mouse_key_labels[0x0]);
            var value62 = get_key_id_from_name(value61);
            keyInfo13.macro_endKey = value62;
          }
        }
      }
      ui_refresh_tab_mapping_macro(current_usb_client);
    }
  });
  layui2.on("select(mapping-macro-trigger-key)", function (result) {
    var value63 = result.elem;
    var index6 = value63.value;
    var keyInfo14 = get_select_key_info();
    if (Object.keys(keyInfo14).length == 0x0) {
      return;
    }
    var value64 = mouse_key_labels[index6];
    var value65 = get_key_name_from_label(value64);
    var value66 = get_key_id_from_name(value65);
    if (keyInfo14.macro_toggleKey != value66) {
      keyInfo14.macro_toggleKey = value66;
      need_save = true;
      ui_refresh_onboard_config(current_usb_client);
    }
  });
  layui2.on('select(mapping-macro-stop-key)', function (result) {
    var value67 = result.elem;
    var index7 = value67.value;
    var keyInfo15 = get_select_key_info();
    if (Object.keys(keyInfo15).length == 0x0) {
      return;
    }
    var value68 = get_key_name_from_label(mouse_key_labels[index7]);
    var value69 = get_key_id_from_name(value68);
    if (keyInfo15.macro_endKey != value69) {
      keyInfo15.macro_endKey = value69;
      need_save = true;
      ui_refresh_onboard_config(current_usb_client);
      if (macro_trigger_type_index == 0x6) {
        if (keyInfo15.macro_endKey == 0x0) {
          var len12 = keyInfo15.label.split('+');
          var value70 = len12[len12.length - 0x1];
          for (var len13 = 0x0; len13 < mouse_key_labels.length; len13++) {
            if (mouse_key_labels[len13] == value70) {
              layui4("[name=\"mapping-macro-stop-key\"]").val(len13);
              layui.form.render("select");
              keyInfo15.macro_endKey = get_key_id_from_name(keyInfo15.name);
              el.msg(layui.i18np.prop("STRID_SETTING_MAPPING_MACRO_TRIGGER_TOGGLE_LOOP_WARNING"), {
                'icon': 0x0
              }, function () {});
              break;
            }
          }
        }
      }
    }
  });
  layui3.on("mapping-apply-and-onboard-action", {
    'apply': async function () {
      if (!editing) {
        return;
      }
      var layui10 = layui.layer;
      var layui11 = layui.i18np;
      var offset7 = 0x0;
      var flag2 = false;
      onboard_keys.forEach(item4 => {
        if (item4.configType == 0x0 && item4.touch_style == 0x1b && get_key_id_by_name(current_usb_client, item4.name).length == 0x1 && item4.mouse_mapping_keys == "[0,0,256]") {
          offset7++;
        }
        if (item4.configType >= 0x0 && item4.name == 'M1') {
          flag2 = true;
        }
      });
      if (!flag2) {
        offset7++;
      }
      if (offset7 == 0x0) {
        layui10.confirm(layui11.prop('STRID_SETTING_MAPPING_NOT_SUPPORTED'), {
          'title': layui11.prop('STRID_SETTING_MAPPING_SAVE_AND_APPLY'),
          'skin': "layui-layer-confirm",
          'btn': [layui11.prop("STRING_CANCEL")],
          'btnAlign': 'c',
          'btn1': function () {
            layui10.closeLast(0x0);
          }
        });
        return;
      }
      for (var len14 = 0x0; len14 < onboard_keys.length; len14++) {
        if (onboard_keys[len14].configType != 0x5) {
          for (var index8 = onboard_keys.length - 0x1; index8 > len14; index8--) {
            if (onboard_keys[index8].configType == onboard_keys[len14].configType && onboard_keys[index8].name == onboard_keys[len14].name) {
              onboard_keys.splice(index8, 0x1);
            }
          }
        }
      }
      layui10.confirm(layui11.prop('STRID_SETTING_MAPPING_SAVE_TO_FDS_CONFIRM'), {
        'title': layui11.prop("STRID_SETTING_MAPPING_APPLY_AND_ONBOARD"),
        'skin': 'layui-layer-confirm',
        'btn': [layui11.prop("STRING_CANCEL"), layui11.prop('STRID_SETTING_MAPPING_SAVE_TO_FDS_S'), layui11.prop("STRID_SETTING_MAPPING_NOT_SAVE_TO_FDS_S")],
        'btnAlign': 'c',
        'btn1': function () {
          layui10.closeLast(0x0);
        },
        'btn2': function () {
          layui10.closeLast(0x0);
          var status3 = (onboard_status[onboard_config_index] & 0x80) != 0x0;
          var payload = [];
          if (status3) {
            for (var len15 = 0x0; len15 < onboard_keys.length; len15++) {
              var value71 = onboard_keys[len15];
              if (value71.configType == 0x0 && value71.touch_style == 0x1d && (value71.mouse_mapping_function == 0x11 || value71.mouse_mapping_function == 0x12 || value71.mouse_mapping_function == 0x13)) {
                for (var offset8 = 0x0; offset8 < onboard_configs.length; offset8++) {
                  if (offset8 != onboard_config_index) {
                    status3 = (onboard_status[offset8] & 0x80) != 0x0;
                    if (status3) {
                      var flag3 = false;
                      var arr2 = onboard_configs[offset8];
                      for (var offset9 = 0x0; offset9 < arr2.length; offset9++) {
                        var json = arr2[offset9];
                        if (json.configType == 0x0 && json.touch_style == 0x1d && (json.mouse_mapping_function == 0x11 || json.mouse_mapping_function == 0x12 || json.mouse_mapping_function == 0x13)) {
                          flag3 = true;
                          break;
                        }
                      }
                      if (!flag3) {
                        var flag4 = false;
                        for (var offset9 = 0x0; offset9 < arr2.length; offset9++) {
                          var json = arr2[offset9];
                          if (json.name == value71.name) {
                            if (value71.configType != json.configType || value71.touch_style != json.touch_style || value71.mouse_mapping_function != json.mouse_mapping_function) {
                              json.configType = value71.configType;
                              json.touch_style = value71.touch_style;
                              json.mouse_mapping_function = value71.mouse_mapping_function;
                              payload.push(offset8);
                            }
                            flag4 = true;
                          }
                        }
                        if (!flag4) {
                          var json = JSON.parse(JSON.stringify(value71));
                          arr2.push(json);
                          payload.push(offset8);
                        }
                      }
                    }
                  }
                }
              }
            }
            for (var offset8 = 0x0; offset8 < onboard_configs.length; offset8++) {
              var arr2 = onboard_configs[offset8];
              for (var offset9 = 0x0; offset9 < payload.length; offset9++) {
                if (offset8 == payload[offset9]) {
                  send_event_config_reset(current_usb_client);
                  var value72 = 0x1 | offset8 << 0x8;
                  send_event_action(current_usb_client, 0x34, value72);
                  arr2.forEach(item5 => {
                    write_mouse_param(current_usb_client, item5);
                  });
                  send_event_action(current_usb_client, 0x34, 256);
                }
              }
            }
          }
          send_event_config_reset(current_usb_client);
          var value72 = 0x1 | onboard_config_index << 0x8;
          send_event_action(current_usb_client, 0x34, value72);
          onboard_keys.forEach(item6 => {
            write_mouse_param(current_usb_client, item6);
          });
          send_event_action(current_usb_client, 0x34, 0x0);
          need_save = false;
          ui_refresh_onboard_config(current_usb_client);
        },
        'btn3': function () {
          layui10.closeLast(0x0);
          send_event_config_reset(current_usb_client);
          onboard_keys.forEach(item7 => {
            write_mouse_param(current_usb_client, item7);
          });
          need_save = false;
          ui_refresh_onboard_config(current_usb_client);
        }
      });
    }
  });
  layui3.on('factory-reset-action', {
    'apply': async function () {
      el.open({
        'type': 0x1,
        'title': str.prop("STRID_TITLE_WARNING"),
        'skin': "layui-layer-confirm",
        'content': layui4("#factory-reset-panel"),
        'btn': [str.prop('STRID_SETTING_FACTORY_RESET_S'), str.prop("STRID_BUTTON_CANCEL")],
        'btnAlign': 'c',
        'btn1': function () {
          el.closeLast(0x0);
          send_event_factory_reset(current_usb_client, layui4("[name=\"factory-reset-esb\"]")[0x0].checked);
        },
        'btn2': function () {
          el.closeLast(0x0);
        }
      });
    }
  });
  layui3.on("mapping-key-action", {
    'record': async function () {
      key_record_panel_id = el.open({
        'type': 0x1,
        'title': str.prop("STRID_SETTING_MAPPING_KEY_RECORD_TITLE"),
        'skin': "layui-layer-confirm",
        'btn': [str.prop("STRID_SETTING_MAPPING_KEY_RECORD_RESET"), str.prop("STRID_DONE")],
        'btnAlign': 'c',
        'content': layui4("#record-mapping-key-panel"),
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
          el.closeLast(0x0);
          if (setting_mapping_keys_recorded[0x0] > 0x0 || setting_mapping_keys_recorded[0x1] > 0x0 || setting_mapping_keys_recorded[0x2] > 0x0) {
            var len16 = modifiers;
            var len17 = keys;
            layui4("[name=\"mapping-ctrl-key1\"]").val(0x0);
            for (var offset10 = 0x0; offset10 < len16.length; offset10++) {
              if (setting_mapping_keys_recorded[0x0] == len16[offset10].vCode) {
                layui4("[name=\"mapping-ctrl-key1\"]").val(offset10);
                break;
              }
            }
            layui4("[name=\"mapping-ctrl-key2\"]").val(0x0);
            for (var offset10 = 0x0; offset10 < len16.length; offset10++) {
              if (setting_mapping_keys_recorded[0x1] == len16[offset10].vCode) {
                layui4("[name=\"mapping-ctrl-key2\"]").val(offset10);
                break;
              }
            }
            layui4("[name=\"mapping-key\"]").val(0x0);
            for (var offset10 = 0x0; offset10 < len17.length; offset10++) {
              if (setting_mapping_keys_recorded[0x2] == len17[offset10].vCode) {
                layui4("[name=\"mapping-key\"]").val(offset10);
                break;
              }
            }
            layui.form.render('select');
            set_mapping_keys(current_usb_client);
            ui_refresh_tab_mapping_key(current_usb_client);
          }
        },
        'cancel': function (result, data, index) {
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
      document.oncontextmenu = function (result) {
        result.preventDefault();
      };
    }
  });
  layui2.on("select(key-delay-select-key)", function (result) {
    var value73 = result.elem;
    var value74 = value73.value;
    if (value74 > 0x0) {
      ui_refresh_setting(current_usb_client);
    }
  });
  layui3.on("key-delay-action", {
    'click': async function () {
      el.open({
        'type': 0x1,
        'title': false,
        'skin': "layui-layer-confirm",
        'content': layui4("#key-delay-guide-panel")
      });
    }
  });
  layui3.on("wireless-optimize-action", {
    'click': async function () {
      layui4("#wireless-optimize-busy").text('');
      el.open({
        'type': 0x1,
        'title': str.prop("STRID_SETTING_FACTORY_TEST"),
        'skin': "layui-layer-confirm",
        'content': layui4("#wireless-optimize-panel"),
        'btn': [str.prop("STRING_CANCEL"), str.prop("STRID_SETTING_FACTORY_START")],
        'btnAlign': 'c',
        'btn1': function () {
          el.closeLast(0x0);
        },
        'btn2': function () {
          wireless_optimizing = true;
          send_event_action(current_usb_client, 0x40, 0x0);
          layui4("#wireless-optimize-busy").text(str.prop('STRID_SETTING_FACTORY_TESTING') + '1%');
          var now4 = new Date();
          layui3.countdown({
            'date': now4.getTime() + 0x3a98,
            'now': now4,
            'clock': function (h, m) {
              layui4('#wireless-optimize-busy').text(str.prop("STRID_SETTING_FACTORY_TESTING") + Math.round((0xf - h.s) * 0x64 / 0xf) + '%');
            },
            'done': function (result, data) {
              setTimeout(() => {
                el.closeLast(0x0);
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
  layui2.on("radio(receiver-light-mode)", function (result) {
    var value75 = result.elem;
    var value76 = value75.checked;
    var value77 = value75.value;
    if (value76) {
      set_light(current_usb_receiver, value77);
    }
  });
  layui2.on("radio(setting-fw-channel)", function (result) {
    var value78 = result.elem;
    var value79 = value78.checked;
    var value80 = value78.value;
    if (value79) {
      if ((current_usb_client.device_info != undefined && current_usb_client.device_info.revision != undefined && current_usb_client.device_info.revision.substr(0x0, 0x2) == 'G-') != (value80 == 0x1)) {
        el.confirm(str.prop("STRID_WEBHUB_GOM_REBOOT_NEEDED"), {
          'title': str.prop("STRID_SETTING_MOUSE_REBOOT"),
          'btn': [str.prop('STRID_SETTING_MOUSE_REBOOT_S'), str.prop('STRID_BUTTON_CANCEL')],
          'cancel': function (result, data, data) {
            if (current_usb_client.device_info != undefined && current_usb_client.device_info.revision != undefined && current_usb_client.device_info.revision.substr(0x0, 0x2) == 'G-') {
              layui4("[name=\"setting-fw-channel\"]")[0x1].checked = true;
            } else {
              layui4("[name=\"setting-fw-channel\"]")[0x0].checked = true;
            }
            layui4("[name=\"setting-fw-channel\"]")[0x0].disabled = !current_usb_client.device_info.dynamicGOM;
            layui4("[name=\"setting-fw-channel\"]")[0x1].disabled = !current_usb_client.device_info.dynamicGOM;
            layui.form.render("radio");
            return true;
          }
        }, function () {
          el.closeLast(0x0);
          send_event_gaming_only(current_usb_client, value80 == 0x1);
          send_event_action(current_usb_client, 0x33, 0x0);
        }, function () {
          if (current_usb_client.device_info != undefined && current_usb_client.device_info.revision != undefined && current_usb_client.device_info.revision.substr(0x0, 0x2) == 'G-') {
            layui4("[name=\"setting-fw-channel\"]")[0x1].checked = true;
          } else {
            layui4("[name=\"setting-fw-channel\"]")[0x0].checked = true;
          }
          layui4("[name=\"setting-fw-channel\"]")[0x0].disabled = !current_usb_client.device_info.dynamicGOM;
          layui4("[name=\"setting-fw-channel\"]")[0x1].disabled = !current_usb_client.device_info.dynamicGOM;
          layui.form.render("radio");
        });
      }
    }
  });
  layui2.on('select(kbd_onboard-config)', function (result) {
    var value81 = result.elem;
    var value82 = value81.value;
    if (current_usb_client.device_info.onboardIndex != value82) {
      hs_set_onboard_index(current_usb_client, value82);
      show_waiting();
    }
  });
  layui9.on("tab(kbd-main-setting-type)", function (result) {
    var value83 = result.index;
    kbd_update_setting_tab(current_usb_client, value83);
  });
  layui9.on("tab(kbd-setting-key-type)", function (result) {
    var value84 = result.index;
    kbd_update_key_setting_tab(current_usb_client, value84);
  });
  layui9.on("tab(kbd-setting-light-type)", function (result) {
    var value85 = result.index;
    kbd_update_light_setting_tab(current_usb_client, value85);
  });
  layui9.on("tab(kbd-setting-advance-key-type)", function (result) {
    var value86 = result.index;
    kbd_update_advance_key_setting_tab(current_usb_client, value86);
  });
  layui3.on("kbd-main-setting-action", {
    'select': async function () {
      var attr6 = this.getAttribute('index');
      layui.element.tabChange('kbd-main-setting-type', attr6);
    }
  });
  layui2.on('radio(kbd-key-layer)', function (result) {
    var value87 = result.elem;
    var value88 = value87.checked;
    var value89 = value87.value;
    if (value88) {
      kbd_key_infos.splice(0x0, kbd_key_infos.length);
      kbd_layer_id = value89;
      var kbd_key_infos = current_usb_client.device_info.kbd_key_infos;
      if (value89 == 0x1) {
        if (kbd_key_infos.length >= kbd_key_num * 0x2 - 0x1) {
          for (var offset11 = 0x0; offset11 < kbd_key_num; offset11++) {
            var value90 = kbd_key_infos[offset11 + kbd_key_num];
            kbd_key_infos.push(kbd_clone_pc_key_info(value90));
          }
        }
      } else {
        if (kbd_key_infos.length >= kbd_key_num) {
          for (var offset11 = 0x0; offset11 < kbd_key_num; offset11++) {
            var value90 = kbd_key_infos[offset11];
            kbd_key_infos.push(kbd_clone_pc_key_info(value90));
          }
        }
      }
      kbd_key_matrix_index = -0x1;
      kbd_ui_refresh_key_desc(current_usb_client);
      kbd_ui_refresh_key_matrix(current_usb_client);
    }
  });
  layui3.on("kbd-key-matrix-action", {
    'select': async function () {
      var attr7 = this.getAttribute("kbd-key-matrix-index");
      kbd_key_matrix_index = Number(attr7);
      kbd_select_keyId = 0x0;
      kbd_ui_refresh_key_desc(current_usb_client);
      kbd_ui_refresh_key_matrix(current_usb_client);
    }
  });
  layui3.on("kbd-macro-action", {
    'select': async function () {
      kbd_key_matrix_index = this.getAttribute("kbd-macro-index");
    }
  });
  layui3.on("kbd-key-default-action", {
    'select': async function () {
      if (kbd_key_matrix_index < 0x0) {
        return;
      }
      var offset12 = 0x0;
      if (kbd_layer_id == 0x0) {
        offset12 = kbd_keys[kbd_key_matrix_index].keyId;
      }
      var item8 = kbd_key_infos[kbd_key_matrix_index];
      item8.keyId = offset12;
      item8.name = get_key_name_from_keyid(item8.keyId);
      kbd_ui_refresh_key_desc(current_usb_client);
      kbd_ui_refresh_key_matrix(current_usb_client);
      hs_set_keycode(current_usb_client, kbd_layer_id, item8.row, item8.col, item8.keyId);
    }
  });
  layui3.on('kbd-key-set-action', {
    'select': async function () {
      if (kbd_key_matrix_index < 0x0) {
        return;
      }
      if (kbd_select_keyId > 0x0) {
        var item9 = kbd_key_infos[kbd_key_matrix_index];
        item9.keyId = kbd_select_keyId;
        item9.name = get_key_name_from_keyid(item9.keyId);
        kbd_ui_refresh_key_desc(current_usb_client);
        kbd_ui_refresh_key_matrix(current_usb_client);
        kbd_select_keyId = 0x0;
        hs_set_keycode(current_usb_client, kbd_layer_id, item9.row, item9.col, item9.keyId);
      }
    }
  });
  layui3.on("kbd-select-key-action", {
    'select': async function () {
      var attr8 = this.getAttribute("kbd-select-key-index");
      var kbdSelectKeysRef = kbd_select_keys;
      kbd_select_keyId = kbdSelectKeysRef[attr8].keyId;
      kbd_ui_refresh_key_desc(current_usb_client);
      if (select_key_panel_id != undefined) {
        el.close(select_key_panel_id);
      }
    }
  });
  layui3.on('mouse-select-key-action', {
    'select': async function () {
      var attr9 = this.getAttribute("mouse-select-key-index");
      var mouseSelectKeysRef = mouse_select_keys;
      kbd_select_keyId = mouseSelectKeysRef[attr9].keyId;
      kbd_ui_refresh_key_desc(current_usb_client);
      if (select_key_panel_id != undefined) {
        el.close(select_key_panel_id);
      }
    }
  });
  layui3.on("kbd-key-rgb-action", {
    'select': async function () {
      var attr10 = this.getAttribute('kbd-key-rgb-index');
      var kbdRgbKeysRef = kbd_rgb_keys;
      kbd_select_keyId = kbdRgbKeysRef[attr10].keyId;
      kbd_ui_refresh_key_desc(current_usb_client);
    }
  });
  layui3.on("kbd-key-media-action", {
    'select': async function () {
      var attr11 = this.getAttribute("kbd-key-media-index");
      var kbdMediaKeysRef = kbd_media_keys;
      kbd_select_keyId = kbdMediaKeysRef[attr11].keyId;
      kbd_ui_refresh_key_desc(current_usb_client);
    }
  });
  layui3.on("kbd-key-windows-action", {
    'select': async function () {
      var attr12 = this.getAttribute("kbd-key-windows-index");
      var kbdWindowsKeysRef = kbd_windows_keys;
      kbd_select_keyId = kbdWindowsKeysRef[attr12].keyId;
      kbd_ui_refresh_key_desc(current_usb_client);
    }
  });
  layui3.on("kbd-key-switch-wasd-action", {
    'select': async function () {
      kbd_select_keyId = 0x9002;
      kbd_ui_refresh_key_desc(current_usb_client);
    }
  });
  layui3.on("kbd-key-switch-mac-mode-action", {
    'select': async function () {
      kbd_select_keyId = 0x9003;
      kbd_ui_refresh_key_desc(current_usb_client);
    }
  });
  layui3.on('kbd-light-action', {
    'select': async function () {
      var attr13 = this.getAttribute("value");
      if (attr13 == "WASD") {
        kbd_matrix_select_keys.splice(0x0, kbd_matrix_select_keys.length);
        for (let len18 = 0x0; len18 < kbd_key_infos.length; len18++) {
          var value91 = kbd_key_infos[len18].name;
          if (value91 == 'W' || value91 == 'A' || value91 == 'S' || value91 == 'D') {
            kbd_matrix_select_keys.push(kbd_edit_info.keys[len18]);
          }
          if (kbd_matrix_select_keys.length >= 0x4) {
            break;
          }
        }
      } else {
        if (attr13 == "ALL") {
          kbd_matrix_select_keys.splice(0x0, kbd_matrix_select_keys.length);
          for (let len19 = 0x0; len19 < kbd_key_infos.length; len19++) {
            kbd_matrix_select_keys.push(kbd_edit_info.keys[len19]);
          }
        } else {
          if (attr13 == "REVERSE") {
            var len20 = kbd_matrix_select_keys.slice();
            kbd_matrix_select_keys.splice(0x0, kbd_matrix_select_keys.length);
            for (let len21 = 0x0; len21 < kbd_key_infos.length; len21++) {
              var flag5 = false;
              for (let len22 = 0x0; len22 < len20.length; len22++) {
                if (len20[len22].row == kbd_key_infos[len21].row && len20[len22].col == kbd_key_infos[len21].col) {
                  flag5 = true;
                  len20.splice(len22, 0x1);
                  break;
                }
              }
              if (!flag5) {
                kbd_matrix_select_keys.push(kbd_edit_info.keys[len21]);
              }
            }
          } else if (attr13 == "CLEAR") {
            kbd_matrix_select_keys.splice(0x0, kbd_matrix_select_keys.length);
          }
        }
      }
      kbd_ui_refresh_light_matrix(current_usb_client);
      kbd_ui_refresh_light(current_usb_client);
      if (kbd_matrix_select_keys.length > 0x0) {
        layui4('#kbd-light-button-container').css("display", 'flex');
      } else {
        layui4('#kbd-light-button-container').css("display", 'none');
      }
    }
  });
  layui3.on("kbd-light-cancel-action", {
    'select': async function () {
      kbd_matrix_select_keys.splice(0x0, kbd_matrix_select_keys.length);
      kbd_ui_refresh_light_matrix(current_usb_client);
      layui4("#kbd-light-button-container").css("display", 'none');
    }
  });
  layui3.on('kbd-light-save-action', {
    'select': async function () {
      if (kbd_matrix_select_keys.length > 0x0) {
        for (let len23 = 0x0; len23 < kbd_matrix_select_keys.length; len23++) {
          kbd_matrix_select_keys[len23].hue = kbd_edit_info.hue;
          kbd_matrix_select_keys[len23].sat = kbd_edit_info.sat;
        }
        show_waiting();
        hs_set_light_define_infos(current_usb_client, kbd_matrix_select_keys);
        kbd_matrix_select_keys.splice(0x0, kbd_matrix_select_keys.length);
        kbd_ui_refresh_light_matrix(current_usb_client);
        layui4("#kbd-light-button-container").css("display", "none");
      }
    }
  });
  layui2.on("select(kbd-light-mode)", function (result) {
    var value92 = result.elem;
    var index9 = value92.value;
    var value93 = kbd_light_mode[index9].mode;
    if (kbd_edit_info.mode != value93) {
      kbd_edit_info.mode = value93;
      kbd_matrix_select_keys.splice(0x0, kbd_matrix_select_keys.length);
      hs_set_light(current_usb_client, 0x2, kbd_edit_info);
      kbd_ui_refresh_light_matrix(current_usb_client);
      kbd_ui_refresh_light(current_usb_client);
      layui4("#kbd-light-button-container").css("display", "none");
    }
  });
  layui2.on("select(kbd-light-box-mode)", function (result) {
    var value94 = result.elem;
    var index10 = value94.value;
    var value95 = kbd_light_mode[index10].mode;
    if (kbd_edit_info.light_box_info.mode != value95) {
      kbd_edit_info.light_box_info.mode = value95;
      hs_set_light_box(current_usb_client, kbd_edit_info.light_box_info);
    }
  });
  layui2.on("select(kbd-light-sleep-time)", function (result) {
    var value96 = result.elem;
    var index11 = value96.value;
    var value97 = kbd_sleep_time[index11].mode;
    if (kbd_edit_info.sleep_time != value97) {
      kbd_edit_info.sleep_time = value97;
      hs_set_light_sleep_time(current_usb_client, value97);
    }
  });
  layui2.on("switch(kbd-light-box-colored)", function (result) {
    if (result.elem.checked) {
      kbd_edit_info.light_box_info.colored = 0x1;
    } else {
      kbd_edit_info.light_box_info.colored = 0x0;
    }
    hs_set_light_box(current_usb_client, kbd_edit_info.light_box_info);
  });
  document.getElementById("color-r-input").addEventListener("change", function (item10) {
    if (item10.target.value.length == 0x0) {
      layui4('#color-r-input').val(0x0);
    }
  });
  document.getElementById('color-g-input').addEventListener("change", function (item11) {
    if (item11.target.value.length == 0x0) {
      layui4('#color-g-input').val(0x0);
    }
  });
  document.getElementById("color-b-input").addEventListener('change', function (item12) {
    if (item12.target.value.length == 0x0) {
      layui4("#color-b-input").val(0x0);
    }
  });
  layui4("#color-r-input").on('input', function (result) {
    var value98 = result.delegateTarget.value;
    var value99 = parseInt(value98);
    var value100 = parseInt(layui4("#color-g-input").val());
    var value101 = parseInt(layui4("#color-b-input").val());
    if (isNaN(value99) || value99 < 0x0 || value99 > 0xff) {
      value99 = 0x0;
    }
    if (isNaN(value100) || value100 < 0x0 || value100 > 0xff) {
      value100 = 0x0;
    }
    if (isNaN(value101) || value101 < 0x0 || value101 > 0xff) {
      value101 = 0x0;
    }
    document.getElementById("pick-color").value = rgbToHex(value99, value100, value101);
    var value102 = rgbToHsv(value99, value100, value101);
    if (kbd_edit_info.hue != value102.h || kbd_edit_info.sat != value102.s) {
      kbd_edit_info.hue = value102.h;
      kbd_edit_info.sat = value102.s;
      if (kbd_edit_info.mode != 0x0 && kbd_edit_info.mode != 0x2d) {
        hs_set_light(current_usb_client, 0x4, kbd_edit_info);
      }
    }
  });
  layui4('#color-g-input').on("input", function (result) {
    var value103 = result.delegateTarget.value;
    var value104 = parseInt(layui4("#color-r-input").val());
    var value105 = parseInt(value103);
    var value106 = parseInt(layui4("#color-b-input").val());
    if (isNaN(value104) || value104 < 0x0 || value104 > 0xff) {
      value104 = 0x0;
    }
    if (isNaN(value105) || value105 < 0x0 || value105 > 0xff) {
      value105 = 0x0;
    }
    if (isNaN(value106) || value106 < 0x0 || value106 > 0xff) {
      value106 = 0x0;
    }
    document.getElementById("pick-color").value = rgbToHex(value104, value105, value106);
    var value107 = rgbToHsv(value104, value105, value106);
    if (kbd_edit_info.hue != value107.h || kbd_edit_info.sat != value107.s) {
      kbd_edit_info.hue = value107.h;
      kbd_edit_info.sat = value107.s;
      if (kbd_edit_info.mode != 0x0 && kbd_edit_info.mode != 0x2d) {
        hs_set_light(current_usb_client, 0x4, kbd_edit_info);
      }
    }
  });
  layui4("#color-b-input").on("input", function (result) {
    var value108 = result.delegateTarget.value;
    var value109 = parseInt(layui4("#color-r-input").val());
    var value110 = parseInt(layui4("#color-g-input").val());
    var value111 = parseInt(value108);
    if (isNaN(value109) || value109 < 0x0 || value109 > 0xff) {
      value109 = 0x0;
    }
    if (isNaN(value110) || value110 < 0x0 || value110 > 0xff) {
      value110 = 0x0;
    }
    if (isNaN(value111) || value111 < 0x0 || value111 > 0xff) {
      value111 = 0x0;
    }
    document.getElementById("pick-color").value = rgbToHex(value109, value110, value111);
    var value112 = rgbToHsv(value109, value110, value111);
    if (kbd_edit_info.hue != value112.h || kbd_edit_info.sat != value112.s) {
      kbd_edit_info.hue = value112.h;
      kbd_edit_info.sat = value112.s;
      if (kbd_edit_info.mode != 0x0 && kbd_edit_info.mode != 0x2d) {
        hs_set_light(current_usb_client, 0x4, kbd_edit_info);
      }
    }
  });
  document.getElementById("light-box-color-r-input").addEventListener('change', function (item13) {
    if (item13.target.value.length == 0x0) {
      layui4("#light-box-color-r-input").val(0x0);
    }
  });
  document.getElementById("light-box-color-g-input").addEventListener('change', function (item14) {
    if (item14.target.value.length == 0x0) {
      layui4('#light-box-color-g-input').val(0x0);
    }
  });
  document.getElementById("light-box-color-b-input").addEventListener("change", function (item15) {
    if (item15.target.value.length == 0x0) {
      layui4('#vcolor-b-input').val(0x0);
    }
  });
  layui4("#light-box-color-r-input").on("input", function (result) {
    var value113 = result.delegateTarget.value;
    var value114 = parseInt(value113);
    var value115 = parseInt(layui4("#light-box-color-g-input").val());
    var value116 = parseInt(layui4('#light-box-color-b-input').val());
    if (isNaN(value114) || value114 < 0x0 || value114 > 0xff) {
      value114 = 0x0;
    }
    if (isNaN(value115) || value115 < 0x0 || value115 > 0xff) {
      value115 = 0x0;
    }
    if (isNaN(value116) || value116 < 0x0 || value116 > 0xff) {
      value116 = 0x0;
    }
    document.getElementById('light-box-pick-color').value = rgbToHex(value114, value115, value116);
    if (kbd_edit_info.light_box_info.r != value114 || kbd_edit_info.light_box_info.g != value115 || kbd_edit_info.light_box_info.b != value116) {
      kbd_edit_info.light_box_info.r = value114;
      kbd_edit_info.light_box_info.g = value115;
      kbd_edit_info.light_box_info.b = value116;
      hs_set_light_box(current_usb_client, kbd_edit_info.light_box_info);
    }
  });
  layui4("#light-box-color-g-input").on("input", function (result) {
    var value117 = result.delegateTarget.value;
    var value118 = parseInt(layui4("#light-box-color-r-input").val());
    var value119 = parseInt(value117);
    var value120 = parseInt(layui4("#light-box-color-b-input").val());
    if (isNaN(value118) || value118 < 0x0 || value118 > 0xff) {
      value118 = 0x0;
    }
    if (isNaN(value119) || value119 < 0x0 || value119 > 0xff) {
      value119 = 0x0;
    }
    if (isNaN(value120) || value120 < 0x0 || value120 > 0xff) {
      value120 = 0x0;
    }
    document.getElementById("light-box-pick-color").value = rgbToHex(value118, value119, value120);
    if (kbd_edit_info.light_box_info.r != value118 || kbd_edit_info.light_box_info.g != value119 || kbd_edit_info.light_box_info.b != value120) {
      kbd_edit_info.light_box_info.r = value118;
      kbd_edit_info.light_box_info.g = value119;
      kbd_edit_info.light_box_info.b = value120;
      hs_set_light_box(current_usb_client, kbd_edit_info.light_box_info);
    }
  });
  layui4("#light-box-color-b-input").on("input", function (result) {
    var value121 = result.delegateTarget.value;
    var value122 = parseInt(layui4("#light-box-color-r-input").val());
    var value123 = parseInt(layui4("#light-box-color-g-input").val());
    var value124 = parseInt(value121);
    if (isNaN(value122) || value122 < 0x0 || value122 > 0xff) {
      value122 = 0x0;
    }
    if (isNaN(value123) || value123 < 0x0 || value123 > 0xff) {
      value123 = 0x0;
    }
    if (isNaN(value124) || value124 < 0x0 || value124 > 0xff) {
      value124 = 0x0;
    }
    document.getElementById("light-box-pick-color").value = rgbToHex(value122, value123, value124);
    if (kbd_edit_info.light_box_info.r != value122 || kbd_edit_info.light_box_info.g != value123 || kbd_edit_info.light_box_info.b != value124) {
      kbd_edit_info.light_box_info.r = value122;
      kbd_edit_info.light_box_info.g = value123;
      kbd_edit_info.light_box_info.b = value124;
      hs_set_light_box(current_usb_client, kbd_edit_info.light_box_info);
    }
  });
  layui3.on("kbd-axis-matrix-action", {
    'select': async function () {
      var attr14 = this.getAttribute("kbd-axis-matrix-index");
      kbd_key_matrix_index = Number(attr14);
      var flag6 = false;
      for (let len24 = 0x0; len24 < kbd_matrix_select_keys.length; len24++) {
        if (kbd_matrix_select_keys[len24].row == kbd_key_infos[kbd_key_matrix_index].row && kbd_matrix_select_keys[len24].col == kbd_key_infos[kbd_key_matrix_index].col) {
          kbd_matrix_select_keys.splice(len24, 0x1);
          flag6 = true;
          break;
        }
      }
      if (!flag6) {
        kbd_matrix_select_keys.push(kbd_clone_axis_info(kbd_axis_infos[kbd_key_matrix_index]));
      }
      kbd_ui_refresh_axis_matrix(current_usb_client);
      kbd_ui_refresh_axis(current_usb_client);
    }
  });
  layui3.on("kbd-axis-action", {
    'select': async function () {
      var attr15 = this.getAttribute("value");
      if (attr15 == "WASD") {
        kbd_matrix_select_keys.splice(0x0, kbd_matrix_select_keys.length);
        for (let len25 = 0x0; len25 < kbd_key_infos.length; len25++) {
          var value125 = kbd_key_infos[len25].name;
          if (value125 == 'W' || value125 == 'A' || value125 == 'S' || value125 == 'D') {
            kbd_matrix_select_keys.push(kbd_axis_infos[len25]);
          }
          if (kbd_matrix_select_keys.length >= 0x4) {
            break;
          }
        }
      } else {
        if (attr15 == "ALL") {
          kbd_matrix_select_keys.splice(0x0, kbd_matrix_select_keys.length);
          for (let len26 = 0x0; len26 < kbd_axis_infos.length; len26++) {
            kbd_matrix_select_keys.push(kbd_axis_infos[len26]);
          }
        } else {
          if (attr15 == "REVERSE") {
            var len27 = kbd_matrix_select_keys.slice();
            kbd_matrix_select_keys.splice(0x0, kbd_matrix_select_keys.length);
            for (let len28 = 0x0; len28 < kbd_key_infos.length; len28++) {
              var flag7 = false;
              for (let len29 = 0x0; len29 < len27.length; len29++) {
                if (len27[len29].row == kbd_key_infos[len28].row && len27[len29].col == kbd_key_infos[len28].col) {
                  flag7 = true;
                  len27.splice(len29, 0x1);
                  break;
                }
              }
              if (!flag7) {
                kbd_matrix_select_keys.push(kbd_axis_infos[len28]);
              }
            }
          } else if (attr15 == "CLEAR") {
            kbd_matrix_select_keys.splice(0x0, kbd_matrix_select_keys.length);
          }
        }
      }
      kbd_ui_refresh_axis_matrix(current_usb_client);
      kbd_ui_refresh_axis(current_usb_client);
    }
  });
  layui3.on("layui-axis-type-action", {
    'select': async function () {
      var attr16 = this.getAttribute("index");
      if (kbd_edit_info.switch_type != Number(attr16)) {
        kbd_edit_info.switch_type = Number(attr16);
        kbd_ui_refresh_axis(current_usb_client);
      }
    }
  });
  layui2.on("radio(kbd-axis-mode)", function (result) {
    var value126 = result.elem;
    var value127 = value126.checked;
    var value128 = value126.value;
    if (value127) {
      if (value128 != current_usb_client.device_info.kbd_axis_mode) {
        hs_set_axis_mode(current_usb_client, value128);
      }
    }
  });
  layui2.on("switch(kbd-axis-quick-tigger-mode)", function (result) {
    if (result.elem.checked) {
      kbd_edit_info.rt_enable = 0x1;
    } else {
      kbd_edit_info.rt_enable = 0x0;
    }
    kbd_ui_refresh_axis(current_usb_client);
  });
  layui3.on("kbd-light-matrix-action", {
    'select': async function () {
      if (kbd_edit_info.mode != 0x2d) {
        return;
      }
      kbd_key_matrix_index = this.getAttribute("kbd-light-matrix-index");
      var flag8 = false;
      for (let len30 = 0x0; len30 < kbd_matrix_select_keys.length; len30++) {
        var value129 = kbd_matrix_select_keys[len30];
        if (kbd_key_infos[kbd_key_matrix_index].row == kbd_matrix_select_keys[len30].row && kbd_key_infos[kbd_key_matrix_index].col == kbd_matrix_select_keys[len30].col) {
          kbd_matrix_select_keys.splice(len30, 0x1);
          flag8 = true;
          break;
        }
      }
      if (!flag8) {
        kbd_matrix_select_keys.push(kbd_edit_info.keys[kbd_key_matrix_index]);
      }
      kbd_ui_refresh_light_matrix(current_usb_client);
      kbd_ui_refresh_light(current_usb_client);
      if (kbd_matrix_select_keys.length > 0x0) {
        layui4("#kbd-light-button-container").css('display', "flex");
      } else {
        layui4("#kbd-light-button-container").css("display", "none");
      }
    }
  });
  layui3.on("kbd-axis-cancel-action", {
    'select': async function () {
      kbd_matrix_select_keys.splice(0x0, kbd_matrix_select_keys.length);
      kbd_ui_refresh_axis(current_usb_client);
      kbd_ui_refresh_axis_matrix(current_usb_client);
      layui4('#kbd-axis-button-container').css("display", "none");
    }
  });
  layui3.on("kbd-axis-save-action", {
    'select': async function () {
      if (kbd_matrix_select_keys.length > 0x0) {
        for (let len31 = 0x0; len31 < kbd_matrix_select_keys.length; len31++) {
          kbd_matrix_select_keys[len31].switch_type = kbd_edit_info.switch_type;
          kbd_matrix_select_keys[len31].rt_enable = kbd_edit_info.rt_enable;
          kbd_matrix_select_keys[len31].apc_lv = kbd_edit_info.apc_lv;
          kbd_matrix_select_keys[len31].rt_press_lv = kbd_edit_info.rt_press_lv;
          kbd_matrix_select_keys[len31].rt_release_lv = kbd_edit_info.rt_release_lv;
          kbd_matrix_select_keys[len31].top_dz = kbd_edit_info.top_dz;
          kbd_matrix_select_keys[len31].btm_dz = kbd_edit_info.btm_dz;
        }
        show_waiting();
        hs_set_axis_infos(current_usb_client, kbd_matrix_select_keys);
        kbd_matrix_select_keys.splice(0x0, kbd_matrix_select_keys.length);
        kbd_ui_refresh_axis(current_usb_client);
        kbd_ui_refresh_axis_matrix(current_usb_client);
        layui4("#kbd-axis-button-container").css("display", "none");
      }
    }
  });
  layui3.on("kbd-advance-key-matrix-action", {
    'select': async function () {
      var attr17 = this.getAttribute("kbd-key-matrix-index");
      if (kbd_key_matrix_index == Number(attr17)) {
        return;
      }
      kbd_key_matrix_index = Number(attr17);
      var flag9 = false;
      for (let len32 = 0x0; len32 < kbd_socd_infos.length; len32++) {
        if (kbd_key_infos[kbd_key_matrix_index].row == kbd_socd_infos[len32].row1 && kbd_key_infos[kbd_key_matrix_index].col == kbd_socd_infos[len32].col1 || kbd_key_infos[kbd_key_matrix_index].row == kbd_socd_infos[len32].row2 && kbd_key_infos[kbd_key_matrix_index].col == kbd_socd_infos[len32].col2) {
          kbd_key_setting_index = 0x0;
          layui.element.tabChange("kbd-setting-advance-key-type", 0x0);
          flag9 = true;
          break;
        }
      }
      for (let len33 = 0x0; len33 < kbd_mt_infos.length; len33++) {
        if (kbd_key_infos[kbd_key_matrix_index].row == kbd_mt_infos[len33].row && kbd_key_infos[kbd_key_matrix_index].col == kbd_mt_infos[len33].col) {
          kbd_key_setting_index = 0x1;
          layui.element.tabChange("kbd-setting-advance-key-type", 0x1);
          flag9 = true;
          break;
        }
      }
      for (let len34 = 0x0; len34 < kbd_rs_infos.length; len34++) {
        if (kbd_key_infos[kbd_key_matrix_index].row == kbd_rs_infos[len34].row1 && kbd_key_infos[kbd_key_matrix_index].col == kbd_rs_infos[len34].col1 || kbd_key_infos[kbd_key_matrix_index].row == kbd_rs_infos[len34].row2 && kbd_key_infos[kbd_key_matrix_index].col == kbd_rs_infos[len34].col2) {
          kbd_key_setting_index = 0x2;
          layui.element.tabChange("kbd-setting-advance-key-type", 0x2);
          flag9 = true;
          break;
        }
      }
      if (!flag9) {
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
  layui3.on("kbd-advance-key-delete-action", {
    'select': async function () {
      if (kbd_key_matrix_index < 0x0) {
        return;
      }
      if (kbd_key_setting_index == 0x0) {
        for (var offset13 = 0x0; offset13 < kbd_socd_infos.length; offset13++) {
          var value130 = kbd_socd_infos[offset13];
          if (value130.row1 == kbd_edit_info.row1 && value130.col1 == kbd_edit_info.col1 && value130.row2 == kbd_edit_info.row2 && value130.col2 == kbd_edit_info.col2) {
            kbd_socd_infos.splice(offset13, 0x1);
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
          for (var offset13 = 0x0; offset13 < kbd_rs_infos.length; offset13++) {
            var value131 = kbd_rs_infos[offset13];
            if (value131.row1 == kbd_edit_info.row1 && value131.col1 == kbd_edit_info.col1 && value131.row2 == kbd_edit_info.row2 && value131.col2 == kbd_edit_info.col2) {
              kbd_rs_infos.splice(offset13, 0x1);
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
            for (var offset13 = 0x0; offset13 < kbd_mt_infos.length; offset13++) {
              var value132 = kbd_mt_infos[offset13];
              if (value132.row == kbd_edit_info.row && value132.col == kbd_edit_info.col) {
                kbd_mt_infos.splice(offset13, 0x1);
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
              for (var offset13 = 0x0; offset13 < kbd_dks_infos.length; offset13++) {
                var value133 = kbd_dks_infos[offset13];
                if (value133.row == kbd_edit_info.row && value133.col == kbd_edit_info.col) {
                  kbd_dks_infos.splice(offset13, 0x1);
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
  layui3.on("kbd-advance-key-set-action", {
    'select': async function () {
      if (kbd_key_matrix_index < 0x0) {
        return;
      }
      if (kbd_key_setting_index == 0x0) {
        var flag10 = false;
        for (var offset14 = 0x0; offset14 < kbd_socd_infos.length; offset14++) {
          if (kbd_socd_infos[offset14].row1 == kbd_edit_info.row1 && kbd_socd_infos[offset14].col1 == kbd_edit_info.col1 || kbd_socd_infos[offset14].row2 == kbd_edit_info.row2 && kbd_socd_infos[offset14].col2 == kbd_edit_info.col2 || kbd_socd_infos[offset14].row2 == kbd_edit_info.row1 && kbd_socd_infos[offset14].col2 == kbd_edit_info.col1 || kbd_socd_infos[offset14].row1 == kbd_edit_info.row2 && kbd_socd_infos[offset14].col1 == kbd_edit_info.col2) {
            kbd_edit_info.id = kbd_socd_infos[offset14].id;
            kbd_socd_infos[offset14] = kbd_clone_socd_info(kbd_edit_info);
            flag10 = true;
            break;
          }
        }
        if (!flag10) {
          if (kbd_socd_infos.length >= 0x14) {
            el.confirm(str.prop("STRID_KBD_ADVANCE_KEY_MAX_HINT"), {
              'title': str.prop("STRID_TITLE_WARNING"),
              'skin': "layui-layer-confirm",
              'btn': [str.prop('STRING_OK')],
              'btnAlign': 'c',
              'btn1': function () {
                el.closeLast(0x0);
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
          var flag10 = false;
          for (var offset14 = 0x0; offset14 < kbd_rs_infos.length; offset14++) {
            if (kbd_rs_infos[offset14].row1 == kbd_edit_info.row1 && kbd_rs_infos[offset14].col1 == kbd_edit_info.col1 || kbd_rs_infos[offset14].row2 == kbd_edit_info.row2 && kbd_rs_infos[offset14].col2 == kbd_edit_info.col2 || kbd_rs_infos[offset14].row2 == kbd_edit_info.row1 && kbd_rs_infos[offset14].col2 == kbd_edit_info.col1 || kbd_rs_infos[offset14].row1 == kbd_edit_info.row2 && kbd_rs_infos[offset14].col1 == kbd_edit_info.col2) {
              kbd_edit_info.id = kbd_rs_infos[offset14].id;
              kbd_rs_infos[offset14] = kbd_clone_rs_info(kbd_edit_info);
              flag10 = true;
              break;
            }
          }
          if (!flag10) {
            if (kbd_rs_infos.length >= 0x14) {
              el.confirm(str.prop('STRID_KBD_ADVANCE_KEY_MAX_HINT'), {
                'title': str.prop("STRID_TITLE_WARNING"),
                'skin': "layui-layer-confirm",
                'btn': [str.prop('STRING_OK')],
                'btnAlign': 'c',
                'btn1': function () {
                  el.closeLast(0x0);
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
            var flag10 = false;
            for (var offset14 = 0x0; offset14 < kbd_mt_infos.length; offset14++) {
              if (kbd_mt_infos[offset14].row == kbd_edit_info.row && kbd_mt_infos[offset14].col == kbd_edit_info.col) {
                kbd_mt_infos[offset14] = kbd_clone_mt_info(kbd_edit_info);
                flag10 = true;
                break;
              }
            }
            if (!flag10) {
              if (kbd_mt_infos.length >= 0x14) {
                el.confirm(str.prop("STRID_KBD_ADVANCE_KEY_MAX_HINT"), {
                  'title': str.prop("STRID_TITLE_WARNING"),
                  'skin': 'layui-layer-confirm',
                  'btn': [str.prop("STRING_OK")],
                  'btnAlign': 'c',
                  'btn1': function () {
                    el.closeLast(0x0);
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
              var flag10 = false;
              for (var offset14 = 0x0; offset14 < kbd_dks_infos.length; offset14++) {
                if (kbd_dks_infos[offset14].row == kbd_edit_info.row && kbd_dks_infos[offset14].col == kbd_edit_info.col) {
                  kbd_dks_infos[offset14] = kbd_clone_dks_info(kbd_edit_info);
                  flag10 = true;
                  break;
                }
              }
              if (!flag10) {
                if (kbd_dks_infos.length >= 0x14) {
                  el.confirm(str.prop("STRID_KBD_ADVANCE_KEY_MAX_HINT"), {
                    'title': str.prop("STRID_TITLE_WARNING"),
                    'skin': "layui-layer-confirm",
                    'btn': [str.prop("STRING_OK")],
                    'btnAlign': 'c',
                    'btn1': function () {
                      el.closeLast(0x0);
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
  layui3.on('kbd-socd-key1-action', {
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
  layui3.on("kbd-socd-key2-action", {
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
  layui2.on("radio(kbd-socd-type)", function (result) {
    var value134 = result.elem;
    var value135 = value134.checked;
    var value136 = value134.value;
    if (value135) {
      if (kbd_edit_info.socd_mode != Number(value136)) {
        kbd_edit_info.socd_mode = Number(value136);
        kbd_ui_refresh_advance_key_desc(current_usb_client);
      }
    }
  });
  layui3.on('kbd-mt-key1-action', {
    'select': async function () {
      if (kbd_key_matrix_index < 0x0) {
        el.confirm(str.prop('STRID_KBD_MT_HINT'), {
          'title': str.prop("STRID_TITLE_WARNING"),
          'skin': "layui-layer-confirm",
          'btn': [str.prop("STRING_OK")],
          'btnAlign': 'c',
          'btn1': function () {
            el.closeLast(0x0);
          }
        });
        return;
      }
      dialog_select_key_init('kbd-mt-key1');
      select_key_panel_id = el.open({
        'type': 0x1,
        'title': str.prop("STRID_SETTING_MAPPING_SELECT_KEY"),
        'skin': "layui-layer-confirm",
        'btn': [],
        'btnAlign': 'c',
        'content': layui4("#select-key-panel"),
        'end': function () {
          select_key_panel_id = undefined;
        }
      });
    }
  });
  layui3.on("kbd-mt-key2-action", {
    'select': async function () {
      if (kbd_key_matrix_index < 0x0) {
        el.confirm(str.prop('STRID_KBD_MT_HINT'), {
          'title': str.prop("STRID_TITLE_WARNING"),
          'skin': "layui-layer-confirm",
          'btn': [str.prop("STRING_OK")],
          'btnAlign': 'c',
          'btn1': function () {
            el.closeLast(0x0);
          }
        });
        return;
      }
      dialog_select_key_init("kbd-mt-key2");
      select_key_panel_id = el.open({
        'type': 0x1,
        'title': str.prop("STRID_SETTING_MAPPING_SELECT_KEY"),
        'skin': "layui-layer-confirm",
        'btn': [],
        'btnAlign': 'c',
        'content': layui4('#select-key-panel'),
        'end': function () {
          select_key_panel_id = undefined;
        }
      });
    }
  });
  layui3.on("kbd-rs-key1-action", {
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
  layui3.on("kbd-rs-key2-action", {
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
  layui3.on("kbd-dks-select-key-action", {
    'select': async function () {
      if (kbd_key_matrix_index < 0x0) {
        el.confirm(str.prop("STRID_KBD_MT_HINT"), {
          'title': str.prop("STRID_TITLE_WARNING"),
          'skin': "layui-layer-confirm",
          'btn': [str.prop("STRING_OK")],
          'btnAlign': 'c',
          'btn1': function () {
            el.closeLast(0x0);
          }
        });
        return;
      }
      var attr18 = this.getAttribute("keyId");
      dialog_select_key_init("kbd-dks-key" + attr18);
      select_key_panel_id = el.open({
        'type': 0x1,
        'title': str.prop("STRID_SETTING_MAPPING_SELECT_KEY"),
        'skin': "layui-layer-confirm",
        'btn': [],
        'btnAlign': 'c',
        'content': layui4("#select-key-panel"),
        'end': function () {
          select_key_panel_id = undefined;
        }
      });
    }
  });
  layui3.on("kbd-dks-key-action", {
    'select': async function () {
      if (kbd_key_matrix_index < 0x0) {
        el.confirm(str.prop("STRID_KBD_MT_HINT"), {
          'title': str.prop("STRID_TITLE_WARNING"),
          'skin': "layui-layer-confirm",
          'btn': [str.prop('STRING_OK')],
          'btnAlign': 'c',
          'btn1': function () {
            el.closeLast(0x0);
          }
        });
        return;
      }
      if (kbd_dks_dragging && kbd_dks_dragging_up) {
        kbd_dks_dragging = false;
        kbd_dks_dragging_up = false;
        return;
      }
      var attr19 = this.getAttribute("keyId");
      var value137 = Math.floor(attr19 / 0xa);
      var value138 = attr19 % 0xa;
      var el2 = 'kbd-dks-key' + value137 + '-' + value138;
      var value139 = '#kbd-dks-add' + value137 + '-' + value138;
      var value140 = '#kbd-dks-arrow' + value137 + '-' + value138;
      var offset15 = 0x0;
      if (value137 == 0x1) {
        offset15 = kbd_edit_info.state1;
      } else {
        if (value137 == 0x2) {
          offset15 = kbd_edit_info.state2;
        } else {
          if (value137 == 0x3) {
            offset15 = kbd_edit_info.state3;
          } else if (value137 == 0x4) {
            offset15 = kbd_edit_info.state4;
          }
        }
      }
      if (layui4(value140).css('display') != 'none') {
        var value141 = layui4('#' + el2).css("width");
        if (value138 == 0x1) {
          if (value141 == "24px") {
            offset15 = offset15 & 0x3fe;
          } else {
            if (value141 == "77px") {
              offset15 = offset15 & 0x3fc;
            } else {
              if (value141 == "104px") {
                offset15 = offset15 & 0x3f0;
              } else {
                if (value141 == "157px") {
                  offset15 = offset15 & 0x3e0;
                } else {
                  if (value141 == '184px') {
                    offset15 = offset15 & 0x380;
                  } else {
                    if (value141 == "237px") {
                      offset15 = offset15 & 0x300;
                    } else if (value141 == '264px') {
                      offset15 = 0x0;
                    }
                  }
                }
              }
            }
          }
        } else {
          if (value138 == 0x2) {
            if (value141 == '24px') {
              offset15 = offset15 & 0x3f7;
            } else {
              if (value141 == "77px") {
                offset15 = offset15 & 0x3e7;
              } else {
                if (value141 == "104px") {
                  offset15 = offset15 & 0x387;
                } else {
                  if (value141 == "157px") {
                    offset15 = offset15 & 0x307;
                  } else if (value141 == '184px') {
                    offset15 = offset15 & 0x7;
                  }
                }
              }
            }
          } else {
            if (value138 == 0x3) {
              if (value141 == '24px') {
                offset15 = offset15 & 0x3bf;
              } else {
                if (value141 == '77px') {
                  offset15 = offset15 & 0x33f;
                } else if (value141 == '104px') {
                  offset15 = offset15 & 0x3f;
                }
              }
            } else if (value138 == 0x4) {
              offset15 = offset15 & 0x1ff;
            }
          }
        }
        if (value137 == 0x1) {
          kbd_edit_info.state1 = offset15;
        } else {
          if (value137 == 0x2) {
            kbd_edit_info.state2 = offset15;
          } else {
            if (value137 == 0x3) {
              kbd_edit_info.state3 = offset15;
            } else if (value137 == 0x4) {
              kbd_edit_info.state4 = offset15;
            }
          }
        }
        kbd_ui_refresh_dks_step(value137, offset15);
      } else {
        document.getElementById(el2).className = 'rounded-border-green';
        layui4('#' + el2).css("width", '24');
        layui4(value139).css("display", 'none');
        layui4(value140).css('display', '');
        layui4(value140).css("margin-left", 0xe);
        if (value138 == 0x1) {
          offset15 = offset15 | 0x1;
        } else {
          if (value138 == 0x2) {
            offset15 = offset15 | 0x8;
          } else {
            if (value138 == 0x3) {
              offset15 = offset15 | 0x40;
            } else if (value138 == 0x4) {
              offset15 = offset15 | 0x200;
            }
          }
        }
        if (value137 == 0x1) {
          kbd_edit_info.state1 = offset15;
        } else {
          if (value137 == 0x2) {
            kbd_edit_info.state2 = offset15;
          } else {
            if (value137 == 0x3) {
              kbd_edit_info.state3 = offset15;
            } else if (value137 == 0x4) {
              kbd_edit_info.state4 = offset15;
            }
          }
        }
      }
      kbd_ui_refresh_advance_key_desc(current_usb_client);
    }
  });
  layui3.on("kbd-dks-clean-action", {
    'select': async function () {
      var attr20 = this.getAttribute("keyId");
      var el3 = "kbd-dks-key" + attr20;
      document.getElementById(el3).style.borderColor = "gray";
      document.getElementById(el3).textContent = layui.i18np.prop("STRID_KBD_MT_SELECT_KEY");
      var value142 = Number(attr20);
      if (value142 == 0x1) {
        kbd_edit_info.state1 = 0x0;
        kbd_edit_info.keyCode1 = 0x0;
      } else {
        if (value142 == 0x2) {
          kbd_edit_info.state2 = 0x0;
          kbd_edit_info.keyCode2 = 0x0;
        } else {
          if (value142 == 0x3) {
            kbd_edit_info.state3 = 0x0;
            kbd_edit_info.keyCode3 = 0x0;
          } else if (value142 == 0x4) {
            kbd_edit_info.state4 = 0x0;
            kbd_edit_info.keyCode4 = 0x0;
          }
        }
      }
      kbd_ui_refresh_dks_step(value142, 0x0);
      kbd_ui_refresh_advance_key_desc(current_usb_client);
    }
  });
  layui3.on("kbd-fireware-download-action", {
    'download': async function () {
      window.location.href = "https://static.miracletek.net/pc/RAWMHUB_WIN7.zip";
    }
  });
  layui3.on("kbd-factory-reset-action", {
    'apply': async function () {
      el.open({
        'type': 0x1,
        'title': str.prop('STRID_TITLE_WARNING'),
        'skin': 'layui-layer-confirm',
        'content': layui4("#kbd-factory-reset-panel"),
        'btn': [str.prop("STRID_SETTING_FACTORY_RESET_S"), str.prop("STRID_BUTTON_CANCEL")],
        'btnAlign': 'c',
        'btn1': function () {
          el.closeLast(0x0);
          hs_set_factory_reset(current_usb_client);
        },
        'btn2': function () {
          el.closeLast(0x0);
        }
      });
    }
  });
  layui3.on('kbd-keycode-factory-reset-action', {
    'apply': async function () {
      el.open({
        'type': 0x1,
        'title': str.prop('STRID_TITLE_WARNING'),
        'skin': "layui-layer-confirm",
        'content': layui4('#kbd-keycode-factory-reset-panel'),
        'btn': [str.prop("STRID_SETTING_FACTORY_RESET_S"), str.prop("STRID_BUTTON_CANCEL")],
        'btnAlign': 'c',
        'btn1': function () {
          el.closeLast(0x0);
          hs_set_keycode_factory_reset(current_usb_client);
        },
        'btn2': function () {
          el.closeLast(0x0);
        }
      });
    }
  });
  layui3.on("dialog-select-key-action", {
    'select': async function () {
      var attr21 = this.getAttribute('kbd-select-key-index');
      attr21 = Number(attr21);
      var attr22 = this.getAttribute('elementId');
      var kbdSelectKeys = kbd_select_keys;
      document.getElementById(attr22).style.color = is_dark_theme() ? "white" : "black";
      document.getElementById(attr22).style.borderColor = "#16B777";
      document.getElementById(attr22).textContent = kbdSelectKeys[attr21].name;
      if (attr22 == "kbd-mt-key1") {
        kbd_edit_info.keyCode1 = kbdSelectKeys[attr21].keyId;
        kbd_ui_refresh_advance_key_desc(current_usb_client);
      } else {
        if (attr22 == "kbd-mt-key2") {
          kbd_edit_info.keyCode2 = kbdSelectKeys[attr21].keyId;
          kbd_ui_refresh_advance_key_desc(current_usb_client);
        } else {
          if (attr22 == "kbd-dks-key1") {
            kbd_edit_info.keyCode1 = kbdSelectKeys[attr21].keyId;
            kbd_ui_refresh_advance_key_desc(current_usb_client);
          } else {
            if (attr22 == "kbd-dks-key2") {
              kbd_edit_info.keyCode2 = kbdSelectKeys[attr21].keyId;
              kbd_ui_refresh_advance_key_desc(current_usb_client);
            } else {
              if (attr22 == "kbd-dks-key3") {
                kbd_edit_info.keyCode3 = kbdSelectKeys[attr21].keyId;
                kbd_ui_refresh_advance_key_desc(current_usb_client);
              } else if (attr22 == 'kbd-dks-key4') {
                kbd_edit_info.keyCode4 = kbdSelectKeys[attr21].keyId;
                kbd_ui_refresh_advance_key_desc(current_usb_client);
              }
            }
          }
        }
      }
      if (select_key_panel_id != undefined) {
        el.close(select_key_panel_id);
      }
    }
  });
  layui3.on("dialog-mouse-select-key-action", {
    'select': async function () {
      var attr23 = this.getAttribute("mouse-select-key-index");
      var attr24 = this.getAttribute("elementId");
      var mouseSelectKeysRef2 = mouse_select_keys;
      document.getElementById(attr24).style.borderColor = '#16B777';
      document.getElementById(attr24).textContent = mouseSelectKeysRef2[attr23].name;
      if (select_key_panel_id != undefined) {
        el.close(select_key_panel_id);
      }
    }
  });
  layui3.on("kbd-macro-item-action", {
    'select': async function () {
      var attr25 = this.getAttribute('kbd-macro-item-index');
      kbd_macro_select_index = Number(attr25);
      edit_macros = [];
      for (var len35 = 0x0; len35 < kbd_macro_infos[kbd_macro_select_index].length; len35++) {
        edit_macros.push(clone_macro_info(kbd_macro_infos[kbd_macro_select_index][len35]));
      }
      kbd_select_keyId = 0x7700 + kbd_macro_select_index;
      kbd_ui_macro_init(current_usb_client);
      kbd_ui_macro_edit_init(current_usb_client);
      kbd_ui_refresh_key_desc(current_usb_client);
    }
  });
  layui3.on("kbd-macro-add-select-key-action", {
    'select': async function () {
      dialog_select_key_init("kbd-macro-add-select-key");
      select_key_panel_id = el.open({
        'type': 0x1,
        'title': str.prop('STRID_SETTING_MAPPING_SELECT_KEY'),
        'skin': 'layui-layer-confirm',
        'btn': [],
        'btnAlign': 'c',
        'content': layui4("#select-key-panel"),
        'end': function () {
          select_key_panel_id = undefined;
        }
      });
    }
  });
  layui3.on("kbd-macro-record-action", {
    'select': async function () {
      var flag11 = false;
      setting_macro_edit_recording = false;
      setting_macro_edit_recording_time = -0x1;
      document.oncontextmenu = function (result) {
        result.preventDefault();
      };
      macro_record_panel_id = el.open({
        'type': 0x1,
        'title': str.prop('STRID_SETTING_MAPPING_MACRO_RECORD_TITLE'),
        'skin': 'layui-layer-confirm',
        'content': layui4('#setting-mapping-macro-record-panel'),
        'btn': [str.prop("STRID_SETTING_FACTORY_START")],
        'btnAlign': 'c',
        'btn1': function () {
          if (!flag11) {
            flag11 = true;
            setting_macro_edit_recording = true;
            var value143 = layui4("#layui-layer" + macro_record_panel_id + " .layui-layer-btn .layui-layer-btn0");
            value143.html(str.prop("STRID_DONE"));
            layui4("#macro-record-waiting-info").css('display', '');
            layui4('#macro-record-fixed-time-container').css("display", "none");
            return false;
          } else {
            if (record_mouse_key_delay_timer_id != undefined) {
              clearTimeout(record_mouse_key_delay_timer_id);
              record_mouse_key_delay_timer_id = undefined;
            }
            el.closeLast(0x0);
            setting_macro_edit_recording = false;
            document.oncontextmenu = null;
            layui4("#macro-record-waiting-info").css("display", "none");
            layui4('#macro-record-fixed-time-container').css('display', '');
          }
        },
        'cancel': function (result, data, index) {
          if (flag11) {
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
          if (flag11) {
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
  layui3.on("kbd-macro-add-action", {
    'select': async function () {
      macro_keep_time_min = 0x0;
      macro_edit_index = -0x1;
      current_edit_macro = create_macro_info();
      ui_refresh_mapping_macro_add(current_usb_client);
      el.open({
        'type': 0x1,
        'title': str.prop('STRID_SETTING_MAPPING_MACRO_ACTION_ADD'),
        'skin': "layui-layer-confirm",
        'content': layui4("#setting-mapping-macro-add-panel"),
        'btn': [str.prop("STRID_SAVE")],
        'btnAlign': 'c',
        'btn1': function () {
          el.closeLast(0x0);
          current_edit_macro.style = 0x16;
          var value144 = macro_keys[parseInt(layui4("[name=\"macro-add-select-key\"]").val())].vCode;
          if (value144 == 0x401) {
            current_edit_macro.mouse_key_event = 0x20a;
            current_edit_macro.mouse_key_code = -parseInt(layui4("#macro-add-wheel-delta-input").val());
          } else {
            if (value144 == 0x400) {
              current_edit_macro.mouse_key_event = 0x20a;
              current_edit_macro.mouse_key_code = parseInt(layui4('#macro-add-wheel-delta-input').val());
            } else {
              if (value144 == 0x402) {
                current_edit_macro.mouse_key_event = 0x20e;
                current_edit_macro.mouse_key_code = -parseInt(layui4("#macro-add-wheel-delta-input").val());
              } else {
                if (value144 == 0x403) {
                  current_edit_macro.mouse_key_event = 0x20e;
                  current_edit_macro.mouse_key_code = parseInt(layui4("#macro-add-wheel-delta-input").val());
                } else {
                  if (value144 == 0x404) {
                    current_edit_macro.mouse_key_event = 0x200;
                    var value145 = Math.round(parseFloat(layui4("#macro-add-move-delta-x-input").val()) * 0xa) + 0x7ff;
                    var value146 = Math.round(parseFloat(layui4("#macro-add-move-delta-y-input").val()) * 0xa) + 0x7ff;
                    current_edit_macro.mouse_key_code = value145 << 0x10 | value146;
                    current_edit_macro.mouse_key_loop = parseInt(layui4("#macro-add-move-loop-input").val());
                    if (current_edit_macro.mouse_key_loop <= 0x0) {
                      current_edit_macro.mouse_key_loop = 0x1;
                    }
                  } else {
                    if (value144 == 0x405) {
                      current_edit_macro.mouse_key_event = 0x2ff;
                      var value147 = parseInt(layui4("#macro-add-position-x-input").val());
                      var value148 = parseInt(layui4("#macro-add-position-y-input").val());
                      var screenW = window.screen.width;
                      var screenH = window.screen.height;
                      value147 = parseInt((value147 + 0.9) * 0xffff / screenW);
                      value148 = parseInt((value148 + 0.9) * 0xffff / screenH);
                      current_edit_macro.mouse_key_code = value147 << 0x10 | value148;
                    } else {
                      current_edit_macro.mouse_key_code = value144;
                      if (layui4("[name=\"mapping-macro-action-key-event\"]")[0x0].checked) {
                        current_edit_macro.mouse_key_event = 0x100;
                      } else if (layui4("[name=\"mapping-macro-action-key-event\"]")[0x1].checked) {
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
          current_edit_macro.name = get_key_name_from_code(value144);
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
  layui3.on('kbd-macro-clear-action', {
    'select': async function () {
      edit_macros = [];
      kbd_ui_macro_edit_init(current_usb_client);
    }
  });
  layui3.on("kbd-macro-save-action", {
    'select': async function () {
      el.closeLast(0x0);
      if (kbd_macro_select_index >= 0x0) {
        kbd_macro_infos[kbd_macro_select_index] = [];
        for (var offset16 = 0x0; offset16 < edit_macros.length; offset16++) {
          kbd_macro_infos[kbd_macro_select_index].push(clone_macro_info(edit_macros[offset16]));
        }
        var offset17 = 0x0;
        for (var offset16 = 0x0; offset16 < kbd_macro_infos.length; offset16++) {
          var len36 = kbd_macro_infos[offset16];
          if (len36.length > 0x0) {
            for (var len37 = 0x0; len37 < len36.length; len37++) {
              var value149 = len36[len37];
              var value150 = get_keyid_from_code(value149.mouse_key_code);
              if (value149.mouse_key_event == 0x100) {
                offset17 = 0x1;
                macroBuff.push(offset17);
                offset17 = 0x2;
                macroBuff.push(offset17);
                offset17 = value150 & 0xff;
                macroBuff.push(offset17);
                offset17 = 0x1;
                macroBuff.push(offset17);
                offset17 = 0x4;
                macroBuff.push(offset17);
                var value151 = value149.mouse_key_time.toString();
                for (var offset18 = 0x0; offset18 < value151.length; offset18++) {
                  offset17 = value151[offset18].charCodeAt();
                  macroBuff.push(offset17);
                }
                offset17 = 0x1;
                macroBuff.push(offset17);
              } else {
                offset17 = 0x1;
                macroBuff.push(offset17);
                offset17 = 0x3;
                macroBuff.push(offset17);
                offset17 = value150 & 0xff;
                macroBuff.push(offset17);
                offset17 = 0x1;
                macroBuff.push(offset17);
                offset17 = 0x4;
                macroBuff.push(offset17);
                var value151 = value149.mouse_key_time.toString();
                for (var offset18 = 0x0; offset18 < value151.length; offset18++) {
                  offset17 = value151[offset18].charCodeAt();
                  macroBuff.push(offset17);
                }
                offset17 = 0x1;
                macroBuff.push(offset17);
              }
            }
          }
          offset17 = 0x0;
          macroBuff.push(offset17);
        }
        log_r(macroBuff);
        if (macroBuff.length > current_usb_client.device_info.kbd_macro_max_size) {
          el.msg(layui.i18np.prop("STRID_SETTING_MAPPING_MACRO_RECORD_MAX_EX"), {
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
  layui2.render();
  clearTimeout(resize_timer_id);
  resize_timer_id = setTimeout(do_resize, 0xfa);
});
