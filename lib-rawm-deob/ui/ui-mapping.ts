import { is_hs_keyboard } from '../data/device-database.js';
import { DeviceStore, DS, current_usb_client, is_receiver, is_hub, is_keyboard_device, is_limit_memory, is_keyboard, is_wired, is_enhanced_cpi, is_enhancement, is_cpi_xy_supported, is_glass_mode_supported, is_glass_mode, is_battery_percent_supported, get_cfg, get_cpi_step, get_cpi, get_cpi_level_colors, get_display_name, get_display_name_model, get_keys, get_key_configs, get_color_code, get_color_codes, get_product_id_hex_str, get_setup_icon, get_soc, is_soc_compatible, get_esb_addr_arr, ACTION_REFRESH_CURRENT_CLIENT, ACTION_UI_REFRESH_SETTING, ACTION_UI_REFRESH_CURRENT_CLIENT, RESOURCE_URL, is_oms, get_shortcuts, get_light_display_colors, is_bt_supported, get_cpi_range, usb_client_list, reset_device_info } from '../state/device-store.js';
import { modifiers, keys, macro_keys, get_key_name_from_code, get_key_name_from_keyid, get_key_code_from_name, get_modifier_name_from_code, get_modifier_code_from_name, get_scan_code, get_vk_code, pc_key_manager_keys, pc_key_manager_modifiers } from '../state/key-lookup.js';
import { create_macro_info, create_key_info, clone_macro_info, copy_key_info } from '../protocol/key-config-parser.js';
import { send_event_action, send_event_set_rf_channel, send_event_mouse_param, send_event_set_sleep_time, send_event_set_color_code, send_event_set_brightness, send_event_gaming_only, send_event_set_auto_hop, send_event_query, send_event_ping } from '../protocol/hid-protocol.js';
import { post_send_client_data } from '../protocol/hid-transport.js';
import { S, is_dark_theme, log_r, theme_color } from '../protocol/parse-cmd-ui.js';
import { ColorSelectorTable } from './ui-helpers.js';
import { kbd_ui_macro_edit_init } from './ui-keyboard.js';
import { MACRO_STYLE_PRESS, MACRO_STYLE_RELEASE, MACRO_STYLE_TOGGLE, MACRO_STYLE_LONG_PRESS, MACRO_STYLE_LONG_TOGGLE, MACRO_STYLE_LONG_RELEASE, MACRO_STYLE_TOGGLE_LOOP, MACRO_CHUNK_SIZE, MACRO_CHUNK_LIMIT, MACRO_KEEP_TIME_MAX_MS, MACRO_KEEP_TIME_STEP, MOUSE_EVENT_KEY_DOWN, MOUSE_EVENT_KEY_UP, MOUSE_EVENT_MOVE, MOUSE_EVENT_WHEEL_VERT, MOUSE_EVENT_WHEEL_HORZ, MOUSE_EVENT_POSITION, MOUSE_WHEEL_UP, MOUSE_WHEEL_DOWN, MOUSE_WHEEL_LEFT, MOUSE_WHEEL_RIGHT, MOUSE_MOVE_CODE, MOUSE_POSITION_CODE, KEYCODE_EXT_THRESHOLD, KEYCODE_MEDIA_START, HID_ACTION_MACRO_FIRST, HID_ACTION_MACRO_CONT, HID_ACTION_MOUSE_PARAM, HID_ACTION_SET_RF_CHANNEL, HID_ACTION_SET_COLOR_CODE, HID_ACTION_SET_SLEEP_TIME, HID_ACTION_SET_BRIGHTNESS, HID_ACTION_GAMING_ONLY, HID_ACTION_SET_AUTO_HOP, CMD_VIRTUAL_CHILD_POLL, FUNC_NONE, FUNC_TOGGLE_CPI, FUNC_NEXT_CPI, FUNC_PREV_CPI, FUNC_TOGGLE_ASSIST, FUNC_NEXT_ASSIST, FUNC_PREV_ASSIST, FUNC_PRESS_CPI, FUNC_ADD_CPI, FUNC_PLUS_CPI, FUNC_CHOOSE_ASSIST, FUNC_TOGGLE_ESB, FUNC_SHOW_POWER, FUNC_TOGGLE_BLE, FUNC_SHELL_CMD, FUNC_TOGGLE_ONBOARD, FUNC_NEXT_ONBOARD, FUNC_PREV_ONBOARD, FUNC_TOGGLE_MINI_HUB, FUNC_TOGGLE_WORK_MODE, CONFIG_TYPE_KEY, CONFIG_TYPE_MACRO, CPI_LOW_MASK, CPI_XY_MASK, CPI_STEP_DEFAULT, SCAN_CODE_CTRL, SCAN_CODE_ALT, SCAN_CODE_SHIFT, SCAN_CODE_WIN, VK_CODE_CTRL, VK_CODE_ALT, VK_CODE_SHIFT, KEY_WHEEL_UP_ID, KEY_WHEEL_DOWN_ID, KEY_NONE, KEY_CTRL, KEY_SHIFT, KEY_WINDOWS, KEY_SPACE, KEY_ESC, KEY_TILDE, KEY_TAB, KEY_SCROLL, KEY_DOWN_ARROW, KEY_UP_ARROW, KEY_LEFT_ARROW, KEY_SHIFT_R, KEY_ALT_R, KEY_HOME, KEY_PAGEUP, KEY_DELETE, KEY_END, KEY_PAGEDOWN, KEY_NUMLOCK, KEY_KPD_STAR, KEY_KPD_MINUS, KEY_KPD_PLUS, KEY_KPD_ENTER, KEY_KPD_DOT, KEY_APP, KEY_F10, KEY_F11, KEY_F12, KEY_NUM0, KEY_EQUAL, KEY_LEFT_BRACE, KEY_RIGHT_BRACE, KEY_VERTICAL_BAR, KEY_COLON, KEY_QUOTE, KEY_LESS_THAN, KEY_GREAT_THAN, KEY_WHEEL_UP, KEY_WHEEL_DOWN, KEY_WHEEL_LEFT, KEY_WHEEL_RIGHT, KEY_MOUSE_MOVE } from '../data/constants.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function setting_mapping_init(client: any) {
  if (client != undefined ? is_hs_keyboard(client.device) : false) {
    return;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  var layui2: any = layui.table;
  S.select_key_name = '';
  select_mapping_type(client, 0x3);
  S.onboard_index = client.device_info.onboardIndex;
  S.onboard_configs = JSON.parse(JSON.stringify(client.device_info.allKeyConfigs));
  S.onboard_status = client.device_info.onboardStatus;
  S.onboard_keys = S.onboard_configs[S.onboard_index];
  S.mouse_keys = get_keys(client);
  S.setting_mapping_keys = [];
  for (let len = 0x0; len < S.mouse_keys.length; len++) {
    S.setting_mapping_keys.push("setting_mapping_key_m" + (len + 0x1));
  }
  S.mouse_key_labels = [];
  S.mouse_key_labels.push(layui.i18np.prop('STRID_NONE'));
  for (let index = 0x0; index < S.mouse_keys.length; index++) {
    S.mouse_key_labels.push(S.mouse_keys[index].label);
  }
  var el = document.getElementById('key-delay-guide-img') as HTMLImageElement;
  el.src = get_setup_icon(client);
  var html = "<select name=\"key-delay-select-key\" lay-verify=\"required\" lay-filter=\"key-delay-select-key\">";
  for (let offset = 0x0; offset < S.mouse_key_labels.length; offset++) {
    if (offset == 0x0) {
      html += "<option value=\"" + offset + "\">" + layui.i18np.prop("STRID_SETTING_SELECT_KEY_ALL") + "</option>";
    } else {
      var value = S.mouse_key_labels[offset];
      if (S.mouse_key_labels[offset] == '\u2460') {
        value = layui.i18np.prop("STRID_KEY_LEFT_S");
      } else {
        if (S.mouse_key_labels[offset] == '\u2461') {
          value = layui.i18np.prop("STRID_KEY_MIDDLE_S");
        } else if (S.mouse_key_labels[offset] == '\u2462') {
          value = layui.i18np.prop('STRID_KEY_RIGHT_S');
        }
      }
      if (S.mouse_keys[offset - 0x1].visible != undefined && !S.mouse_keys[offset - 0x1].visible) {
        html += "<option value=\"" + offset + "\" disabled>" + value + "</option>";
      } else {
        html += "<option value=\"" + offset + "\">" + value + "</option>";
      }
    }
  }
  html += '</select>';
  $('#setting-key-delay-select-key').html(html);
  var flag = true;
  var len2 = client.device_info.keyDelay;
  for (var count = 0x1; count < len2.length; count++) {
    if (client.device_info != undefined && client.device_info.revision != undefined && client.device_info.revision.substr(0x0, 0x2) == 'G-') {
      if (len2[count] != len2[count - 0x1]) {
        flag = false;
        break;
      }
    } else {
      if ((len2[count] & 0xf) != (len2[count - 0x1] & 0xf)) {
        flag = false;
        break;
      }
    }
  }
  if (flag || !(client.device_info != undefined && client.device_info.revision != undefined && client.device_info.revision.substr(0x0, 0x2) == 'G-' || is_oms(client, -0x1))) {
    $("[name=\"key-delay-select-key\"]").val(0x0);
  } else {
    $("[name=\"key-delay-select-key\"]").val(0x1);
  }
  $("#slider-key-up-delay").css('display', client.device_info != undefined && client.device_info.revision != undefined && client.device_info.revision.substr(0x0, 0x2) == 'G-' ? '' : 'none');
  $("#setting-key-delay-down-up").css("display", client.device_info != undefined && client.device_info.revision != undefined && client.device_info.revision.substr(0x0, 0x2) == 'G-' ? '' : 'none');
  $('#setting-key-delay-select-key-container').css("display", client.device_info != undefined && client.device_info.revision != undefined && client.device_info.revision.substr(0x0, 0x2) == 'G-' || is_oms(client, -0x1) ? '' : 'none');
  S.macro_trigger_types = [];
  S.macro_trigger_types.push(layui.i18np.prop("STRID_SETTING_MAPPING_MACRO_TRIGGER_PRESS"));
  S.macro_trigger_types.push(layui.i18np.prop("STRID_SETTING_MAPPING_MACRO_TRIGGER_RELEASE"));
  S.macro_trigger_types.push(layui.i18np.prop("STRID_SETTING_MAPPING_MACRO_TRIGGER_LOOP"));
  S.macro_trigger_types.push(layui.i18np.prop("STRID_SETTING_MAPPING_MACRO_TRIGGER_LONG_PRESS"));
  S.macro_trigger_types.push(layui.i18np.prop("STRID_SETTING_MAPPING_MACRO_TRIGGER_LONG_LOOP"));
  S.macro_trigger_types.push(layui.i18np.prop("STRID_SETTING_MAPPING_MACRO_TRIGGER_LONG_RELEASE"));
  S.macro_trigger_types.push(layui.i18np.prop("STRID_SETTING_MAPPING_MACRO_TRIGGER_TOGGLE_LOOP"));
  S.mouse_function_descs = [];
  S.mouse_functions = [];
  S.mouse_function_descs.push(layui.i18np.prop('STRID_NONE'));
  S.mouse_functions.push(0x0);
  S.mouse_function_descs.push(layui.i18np.prop("STRID_SETTING_MAPPING_TYPE_FUNCTION_TOGGLE_CPI"));
  S.mouse_functions.push(0x1);
  S.mouse_function_descs.push(layui.i18np.prop('STRID_SETTING_MAPPING_TYPE_FUNCTION_NEXT_CPI'));
  S.mouse_functions.push(0x2);
  S.mouse_function_descs.push(layui.i18np.prop("STRID_SETTING_MAPPING_TYPE_FUNCTION_PREVIOUS_CPI"));
  S.mouse_functions.push(0x3);
  if (is_enhancement(client)) {
    S.mouse_function_descs.push(layui.i18np.prop("STRID_SETTING_MAPPING_TYPE_FUNCTION_TOGGLE_ASSIST"));
    S.mouse_functions.push(0x4);
    S.mouse_function_descs.push(layui.i18np.prop("STRID_SETTING_MAPPING_TYPE_FUNCTION_CHOOSE_ASSIST"));
    S.mouse_functions.push(0xc);
    S.mouse_function_descs.push(layui.i18np.prop("STRID_SETTING_MAPPING_TYPE_FUNCTION_NEXT_ASSIST"));
    S.mouse_functions.push(0x5);
    S.mouse_function_descs.push(layui.i18np.prop("STRID_SETTING_MAPPING_TYPE_FUNCTION_PREVIOUS_ASSIST"));
    S.mouse_functions.push(0x6);
  } else {
    S.mouse_function_descs.push(layui.i18np.prop("STRID_SETTING_MAPPING_TYPE_FUNCTION_ADD_CPI"));
    S.mouse_functions.push(0xa);
    S.mouse_function_descs.push(layui.i18np.prop('STRID_SETTING_MAPPING_TYPE_FUNCTION_PLUS_CPI'));
    S.mouse_functions.push(0xb);
  }
  S.mouse_function_descs.push(layui.i18np.prop('STRID_SETTING_MAPPING_TYPE_FUNCTION_PRESS_CPI'));
  S.mouse_functions.push(0x9);
  S.mouse_function_descs.push(layui.i18np.prop("STRID_SETTING_MAPPING_TYPE_FUNCTION_TOGGLE_ESB_ADDR"));
  S.mouse_functions.push(0xd);
  S.mouse_function_descs.push(layui.i18np.prop("STRID_SETTING_MAPPING_TYPE_FUNCTION_TOGGLE_BLE_DEVICE"));
  S.mouse_functions.push(0xf);
  S.mouse_function_descs.push(layui.i18np.prop("STRID_SETTING_MAPPING_TYPE_FUNCTION_SHOW_POWER"));
  S.mouse_functions.push(0xe);
  S.mouse_function_descs.push(layui.i18np.prop("STRID_SETTING_MAPPING_TYPE_FUNCTION_SHELL_CMD"));
  S.mouse_functions.push(0x10);
  S.mouse_function_descs.push(layui.i18np.prop("STRID_SETTING_MAPPING_TYPE_FUNCTION_TOGGLE_ONBOARD"));
  S.mouse_functions.push(0x11);
  S.mouse_function_descs.push(layui.i18np.prop("STRID_SETTING_MAPPING_TYPE_FUNCTION_NEXT_ONBOARD"));
  S.mouse_functions.push(0x12);
  S.mouse_function_descs.push(layui.i18np.prop("STRID_SETTING_MAPPING_TYPE_FUNCTION_PREVIOUS_ONBOARD"));
  S.mouse_functions.push(0x13);
  S.mouse_function_descs.push(layui.i18np.prop("STRID_SETTING_MAPPING_TYPE_FUNCTION_TOGGLE_MINI_HUB"));
  S.mouse_functions.push(0x15);
  S.mouse_function_descs.push(layui.i18np.prop('STRID_SETTING_MAPPING_TYPE_FUNCTION_TOGGLE_WORK_MODE'));
  S.mouse_functions.push(0x16);
  layui2.render({
    'elem': "#key-shortcuts",
    'id': "key-shortcuts",
    'cols': [[{
      'field': "keys",
      'title': layui.i18np.prop('STRID_SETTING_MAPPING_TYPE_KEY'),
      'width': 0x74,
      'unresize': true
    }, {
      'field': "desc",
      'title': layui.i18np.prop("STRID_SETTING_MAPPING_TYPE_FUNCTION"),
      'width': 0xd2,
      'unresize': true
    }]],
    'data': get_shortcuts(client),
    'skin': "grid",
    'page': false,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    'done': function (result: any) {
      $(".layui-table").css("width", "100%");
      $("th[data-field='delete']").css("border-right", "none");
      $("th[data-field='desc']").css("border-right", "none");
      $("td[data-field='desc']").css('border-right', "none");
    }
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  layui2.on('row(key-shortcuts)', function (result: any) {
    var len3 = modifiers;
    var len4 = keys;
    var len5 = result.data.keys.split('+');
    if (len5.length == 0x2) {
      var trimmedVal = len5[0x0].trim();
      if (trimmedVal == '\u2318') {
        trimmedVal = "Command";
      }
      for (var offset2 = 0x0; offset2 < len3.length; offset2++) {
        if (trimmedVal == len3[offset2].name) {
          $("[name=\"mapping-ctrl-key1\"]").val(offset2);
          break;
        }
      }
      $("[name=\"mapping-ctrl-key2\"]").val(0x0);
      trimmedVal = len5[0x1].trim();
      if (trimmedVal == '\u2192') {
        trimmedVal = layui.i18np.prop("STRID_KEY_ARROW_RIGHT");
      } else {
        if (trimmedVal == '\u2190') {
          trimmedVal = layui.i18np.prop("STRID_KEY_ARROW_LEFT");
        } else {
          if (trimmedVal == '\u2191') {
            trimmedVal = layui.i18np.prop("STRID_KEY_ARROW_UP");
          } else if (trimmedVal == '\u2193') {
            trimmedVal = layui.i18np.prop("STRID_KEY_ARROW_DOWN");
          }
        }
      }
      for (var offset2 = 0x0; offset2 < len4.length; offset2++) {
        if (trimmedVal == len4[offset2].name) {
          $("[name=\"mapping-key\"]").val(offset2);
          break;
        }
      }
    } else {
      if (len5.length > 0x2) {
        var trimmedVal = len5[0x0].trim();
        if (trimmedVal == '\u2318') {
          trimmedVal = 'Command';
        }
        for (var offset2 = 0x0; offset2 < len3.length; offset2++) {
          if (trimmedVal == len3[offset2].name) {
            $("[name=\"mapping-ctrl-key1\"]").val(offset2);
            break;
          }
        }
        trimmedVal = len5[0x1].trim();
        if (trimmedVal == '\u2318') {
          trimmedVal = "Command";
        }
        for (var offset2 = 0x0; offset2 < len3.length; offset2++) {
          if (trimmedVal == len3[offset2].name) {
            $("[name=\"mapping-ctrl-key2\"]").val(offset2);
            break;
          }
        }
        trimmedVal = len5[0x2].trim();
        if (trimmedVal == '\u2192') {
          trimmedVal = layui.i18np.prop("STRID_KEY_ARROW_RIGHT");
        } else {
          if (trimmedVal == '\u2190') {
            trimmedVal = layui.i18np.prop("STRID_KEY_ARROW_LEFT");
          } else {
            if (trimmedVal == '\u2191') {
              trimmedVal = layui.i18np.prop("STRID_KEY_ARROW_UP");
            } else if (trimmedVal == '\u2193') {
              trimmedVal = layui.i18np.prop("STRID_KEY_ARROW_DOWN");
            }
          }
        }
        for (var offset2 = 0x0; offset2 < len4.length; offset2++) {
          if (trimmedVal == len4[offset2].name) {
            $("[name=\"mapping-key\"]").val(offset2);
            break;
          }
        }
      }
    }
    layui.form.render("select");
    set_mapping_keys(client);
    ui_refresh_tab_mapping_key(client);
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ui_refresh_setting_mapping(client: any) {
  if (client != undefined ? is_hs_keyboard(client.device) : false) {
    return;
  }
  var index = get_product_id_hex_str(client);
  var value = S.key_pos[index];
  if (value == undefined) return;
  var el: string;
  var i: HTMLElement;
  for (var len = 0x1; len <= 0x7; len++) {
    el = 'm' + len;
    i = document.getElementById("setting-mapping-key-" + el)!;
    i.style.left = value[el][0x0] + 'px';
    i.style.top = value[el][0x1] + 'px';
  }
  el = "wheel-line-container";
  i = document.getElementById("setting-mapping-key-" + el)!;
  i.style.left = value[el][0x0] + 'px';
  i.style.top = value[el][0x1] + 'px';
  el = "wheel-up";
  i = document.getElementById("setting-mapping-key-" + el)!;
  i.style.left = value[el][0x0] + 'px';
  i.style.top = value[el][0x1] + 'px';
  el = "wheel-down";
  i = document.getElementById("setting-mapping-key-" + el)!;
  i.style.left = value[el][0x0] + 'px';
  i.style.top = value[el][0x1] + 'px';
  var len2 = get_color_code(client);
  if (len2.length > 0x0) {
    $("#setting_mapping_product_icon").css("background-image", "url(" + RESOURCE_URL + "product/" + index + '/' + len2 + "/setting.png)");
  } else {
    $("#setting_mapping_product_icon").css('background-image', 'url(' + RESOURCE_URL + 'product/' + index + "/setting.png)");
  }
  (document.getElementById('product-name') as HTMLImageElement).src = RESOURCE_URL + "product/" + index + "/name.png";
  ui_refresh_onboard_config(client);
  ui_refresh_mapping_key(client);
  ui_refresh_combination_key(client);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ui_refresh_onboard_config(client: any) {
  var layui2 = layui.$;
  var layui3 = layui.form;
  var html = "<select name=\"onboard-config\" lay-verify=\"required\" lay-filter=\"onboard-config\">";
  for (let len = 0x0; len < S.onboard_configs.length; len++) {
    if (len == client.device_info.onboardIndex) {
      if (len == S.onboard_config_index && S.need_save) {
        html += "<option value=\"" + len + "\">" + layui.i18np.prop("STRID_SETTING_CONFIG_CURRENT") + S.NUMBERS[len + 0x1] + " \u25C0 *" + "</option>";
      } else {
        html += "<option value=\"" + len + "\">" + layui.i18np.prop('STRID_SETTING_CONFIG_CURRENT') + S.NUMBERS[len + 0x1] + " \u25C0" + '</option>';
      }
    } else if (len == S.onboard_config_index && S.need_save) {
      html += "<option value=\"" + len + "\">" + layui.i18np.prop("STRID_SETTING_CONFIG_CURRENT") + S.NUMBERS[len + 0x1] + " *" + '</option>';
    } else {
      html += "<option value=\"" + len + "\">" + layui.i18np.prop('STRID_SETTING_CONFIG_CURRENT') + S.NUMBERS[len + 0x1] + "</option>";
    }
  }
  html += "</select>";
  layui2("#setting-onboard-config").html(html);
  layui2("[name=\"onboard-config\"]").val(S.onboard_config_index);
  layui3.render("select");
  var status = S.onboard_status[S.onboard_config_index];
  if ((status & 0x80) != 0x0) {
    layui2("[name=\"onboard-allow-switch\"]").prop("checked", true);
  } else {
    layui2("[name=\"onboard-allow-switch\"]").prop("checked", false);
  }
  var colors = get_light_display_colors(client);
  html = ColorSelectorTable({ colors: colors, bitmask: status, name: 'setting-onboard-color', actionAttr: 'setting-onboard-status-action', colorHex: { white: '#EEE' } });
  layui2('#setting-onboard-status-colors').html(html);
  layui3.render('radio');
  layui3.render("checkbox");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ui_refresh_combination_key(client: any) {
  var layui2 = layui.$;
  var layui3 = layui.form;
  var html = "<select name=\"combination-key\" lay-verify=\"required\" lay-filter=\"combination-key\">";
  for (let len = 0x0; len < S.mouse_key_labels.length; len++) {
    var str = '';
    var value = get_key_name_from_label(S.mouse_key_labels[len]);
    S.onboard_keys.forEach(item => {
      if (item.configType >= 0x0) {
        var len2 = item.name.split('+');
        if (len2.length == 0x2 && len2[0x0] == value) {
          var value2 = item.label.split('+')[0x1];
          if (str.indexOf(value2) == -0x1) {
            str += value2;
          }
        }
      }
    });
    var str2 = len > 0x0 && S.mouse_keys[len - 0x1].visible != undefined && !S.mouse_keys[len - 0x1].visible ? " disabled" : '';
    if (str.length > 0x0) {
      html += "<option value=\"" + len + "\"" + str2 + '>' + S.mouse_key_labels[len] + " + " + str + "</option>";
    } else {
      html += "<option value=\"" + len + "\"" + str2 + '>' + S.mouse_key_labels[len] + "</option>";
    }
  }
  html += "</select>";
  layui2("#setting-combination-key").html(html);
  layui2("[name=\"combination-key\"]").val(S.combination_key_index);
  layui3.render("select");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ui_refresh_mapping_key(client: any) {
  var selectedLabel = S.mouse_key_labels[S.combination_key_index];
  var len = get_key_name_from_label(selectedLabel);
  var payload: string[] = [];
  var arr: string[] = [];
  for (let index = 0x0; index < S.mouse_keys.length; index++) {
    payload.push("#setting-mapping-key-m" + (index + 0x1) + "-desc");
    if (len.length == 0x0) {
      arr.push(S.mouse_keys[index].name);
    } else {
      arr.push(len + '+' + S.mouse_keys[index].name);
    }
  }
  payload.push("#setting-mapping-key-wheel-up-desc");
  if (len.length == 0x0) {
    arr.push(KEY_WHEEL_UP);
  } else {
    arr.push(len + '+' + KEY_WHEEL_UP);
  }
  payload.push("#setting-mapping-key-wheel-down-desc");
  if (len.length == 0x0) {
    arr.push(KEY_WHEEL_DOWN);
  } else {
    arr.push(len + '+' + KEY_WHEEL_DOWN);
  }
  if (S.select_key_name.length == 0x0) {
    var len2: JQuery = $("[name=\"setting-mapping-key\"]");
    for (let offset = 0x0; offset < len2.length; offset++) {
      (len2[offset] as HTMLInputElement).checked = false;
    }
    layui.form.render('radio');
  }
  var len3 = S.select_key_name.split('+');
  var value = len3[len3.length - 0x1];
  for (let count = 0x0; count < S.mouse_keys.length; count++) {
    var el = count + 0x1;
    if (value == S.mouse_keys[count].name) {
      $("#setting-mapping-key-m" + el + "-line").css("background-color", S.theme_color);
      (document.getElementById("setting-mapping-key-m" + el + "-circle") as HTMLImageElement).src = RESOURCE_URL + "setting/key_circle_blue.png";
      $("#setting-mapping-key-m" + el + "-desc").css("color", S.theme_color);
      $("#setting-mapping-key-m" + el + "-text").css("color", S.theme_color);
    } else {
      $("#setting-mapping-key-m" + el + "-line").css('background-color', "gray");
      (document.getElementById('setting-mapping-key-m' + el + "-circle") as HTMLImageElement).src = RESOURCE_URL + 'setting/key_circle_gray.png';
      $("#setting-mapping-key-m" + el + "-desc").css("color", '');
      $('#setting-mapping-key-m' + el + "-text").css('color', '');
    }
    $("#setting-mapping-key-m" + el).css("display", '');
  }
  if (value == 'M7') {
    $("#setting-mapping-key-m7-line").css('background-color', "#00000000");
    $("#setting-mapping-key-m7-line").css('background-image', "url(" + RESOURCE_URL + "setting/mapping_key_line_selected.png)");
    (document.getElementById("setting-mapping-key-m7-circle") as HTMLImageElement).src = RESOURCE_URL + "setting/key_circle_blue2.png";
  } else {
    $("#setting-mapping-key-m7-line").css("background-color", "#00000000");
    $("#setting-mapping-key-m7-line").css("background-image", 'url(' + RESOURCE_URL + "setting/mapping_key_line_normal.png)");
    (document.getElementById('setting-mapping-key-m7-circle') as HTMLImageElement).src = RESOURCE_URL + "setting/key_circle_gray2.png";
  }
  if (value == KEY_WHEEL_DOWN) {
    $("#setting-mapping-key-wheel-down-line").css("background-color", S.theme_color);
    $("#setting-mapping-key-wheel-down-desc").css("color", S.theme_color);
    $("#setting-mapping-key-wheel-down-text").css("color", S.theme_color);
    $("#setting-mapping-key-wheel-line").css("background-color", S.theme_color);
    (document.getElementById("setting-mapping-key-wheel-circle") as HTMLImageElement).src = RESOURCE_URL + "setting/key_circle_blue.png";
    $("#setting-mapping-key-wheel-up-line").css("background-color", "gray");
    $("#setting-mapping-key-wheel-up-desc").css("color", '');
    $('#setting-mapping-key-wheel-up-text').css('color', '');
  } else if (value == KEY_WHEEL_UP) {
    $("#setting-mapping-key-wheel-up-line").css('background-color', S.theme_color);
    $("#setting-mapping-key-wheel-up-desc").css("color", S.theme_color);
    $("#setting-mapping-key-wheel-up-text").css('color', S.theme_color);
    $("#setting-mapping-key-wheel-line").css('background-color', S.theme_color);
    (document.getElementById("setting-mapping-key-wheel-circle") as HTMLImageElement).src = RESOURCE_URL + 'setting/key_circle_blue.png';
    $('#setting-mapping-key-wheel-down-line').css("background-color", "gray");
    $("#setting-mapping-key-wheel-down-desc").css("color", '');
    $('#setting-mapping-key-wheel-down-text').css("color", '');
  } else {
    $("#setting-mapping-key-wheel-down-line").css("background-color", "gray");
    $("#setting-mapping-key-wheel-down-desc").css("color", '');
    $("#setting-mapping-key-wheel-down-text").css("color", '');
    $('#setting-mapping-key-wheel-up-line').css("background-color", "gray");
    $("#setting-mapping-key-wheel-up-desc").css("color", '');
    $('#setting-mapping-key-wheel-up-text').css('color', '');
    $("#setting-mapping-key-wheel-line").css("background-color", "gray");
    (document.getElementById('setting-mapping-key-wheel-circle') as HTMLImageElement).src = RESOURCE_URL + "setting/key_circle_gray.png";
  }
  for (var len4 = 0x0; len4 < S.mouse_keys.length; len4++) {
    if (S.mouse_keys[len4].visible != undefined && !S.mouse_keys[len4].visible) {
      $("#setting-mapping-key-m" + (len4 + 0x1)).css('display', "none");
    }
  }
  if (S.combination_key_index > 0x0) {
    $("#setting-mapping-key-m" + S.combination_key_index).css("display", 'none');
  }
  for (let len5 = 0x0; len5 < payload.length; len5++) {
    var el2 = payload[len5];
    $(el2).html('');
    S.onboard_keys.forEach(item => {
      if (item.name == arr[len5]) {
        if (item.configType == 0x0) {
          if (item.touch_style == 0x1b) {
            var payload2: string[] = [];
            var len6 = item.mouse_mapping_keys;
            if (len6.length > 0x0) {
              len6 = len6.replace('[', '');
              len6 = len6.replace(']', '');
              var arr2 = len6.split(',');
              if (arr2.length > 0x0) {
                arr2.forEach(item2 => {
                  if (item2 > 0x0) {
                    var flag = false;
                    var len7 = modifiers;
                    for (let len8 = 0x0; len8 < len7.length; len8++) {
                      if (item2 == len7[len8].vCode) {
                        payload2.push(len7[len8].name);
                        flag = true;
                        break;
                      }
                    }
                    if (!flag) {
                      var len9 = keys;
                      for (let len10 = 0x0; len10 < len9.length; len10++) {
                        if (item2 == len9[len10].vCode) {
                          if (item2 == 0x400 || item2 == 0x401 || item2 == 0x402 || item2 == 0x403) {
                            payload2.push(len9[len10].name + '(' + item.mouse_mapping_key_data + ')');
                          } else {
                            payload2.push(len9[len10].name);
                          }
                          flag = true;
                          break;
                        }
                      }
                    }
                  }
                });
              }
            }
            if (payload2.length > 0x0) {
              var html = '';
              for (let len11 = 0x0; len11 < payload2.length; len11++) {
                html += payload2[len11];
                if (len11 < payload2.length - 0x1) {
                  html += '+';
                }
              }
              $(el2).html(layui.i18np.prop('STRID_SETTING_MAPPING_TYPE_KEY') + " - " + html);
            } else {
              $(el2).html(layui.i18np.prop("STRID_SETTING_MAPPING_TYPE_KEY") + " - " + layui.i18np.prop('STRID_NONE'));
            }
          } else {
            if (item.touch_style == 0x1d) {
              for (let len12 = 0x0; len12 < S.mouse_functions.length; len12++) {
                if (item.mouse_mapping_function == S.mouse_functions[len12]) {
                  var html = layui.i18np.prop("STRID_SETTING_MAPPING_TYPE_FUNCTION") + " - " + S.mouse_function_descs[len12];
                  if (item.mouse_mapping_function == 0x10) {
                    if (is_valid_url(item.mouse_mapping_function_text)) {
                      html += layui.i18np.prop("STRID_SETTING_MAPPING_TYPE_FUNCTION_SHELL_CMD_WEB");
                    } else {
                      html += layui.i18np.prop("STRID_SETTING_MAPPING_TYPE_FUNCTION_SHELL_CMD_APP");
                    }
                  }
                  $(el2).html(html);
                  break;
                }
              }
            }
          }
        } else if (item.configType == 0x5) {
          $(el2).html(layui.i18np.prop("STRID_SETTING_MAPPING_TYPE_MACRO"));
        }
      }
    });
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ui_refresh_tab_mapping_key(client: any) {
  var layui2 = layui.$;
  var layui3 = layui.form;
  var keyInfo = get_select_key_info();
  if (Object.keys(keyInfo).length == 0x0) {
    return;
  }
  var len = modifiers;
  var html = "<select name=\"mapping-ctrl-key1\" lay-verify=\"required\" lay-filter=\"mapping-ctrl-key1\">";
  for (let index = 0x0; index < len.length; index++) {
    html += "<option value=\"" + index + "\">" + len[index].name + "</option>";
  }
  html += "</select>";
  layui2('#setting-mapping-ctrl-key1').html(html);
  layui2("[name=\"mapping-ctrl-key1\"]").val(0x0);
  html = "<select name=\"mapping-ctrl-key2\" lay-verify=\"required\" lay-filter=\"mapping-ctrl-key1\">";
  for (let offset = 0x0; offset < len.length; offset++) {
    html += "<option value=\"" + offset + "\">" + len[offset].name + "</option>";
  }
  html += "</select>";
  layui2("#setting-mapping-ctrl-key2").html(html);
  layui2("[name=\"mapping-ctrl-key2\"]").val(0x0);
  var len2 = keys;
  var html = "<select name=\"mapping-key\" lay-verify=\"required\" lay-filter=\"mapping-key\">";
  for (let count = 0x0; count < len2.length; count++) {
    html += "<option value=\"" + count + "\">" + len2[count].name + "</option>";
  }
  html += "</select>";
  layui2("#setting-mapping-key").html(html);
  layui2("[name=\"mapping-key\"]").val(0x0);
  var value = keyInfo.mouse_mapping_keys;
  if (value.length > 0x0) {
    value = value.replace('[', '');
    value = value.replace(']', '');
    var len3 = value.split(',');
    if (len3.length >= 0x3) {
      for (let len4 = 0x0; len4 < len.length; len4++) {
        if (len3[0x0] == len[len4].vCode) {
          layui2("[name=\"mapping-ctrl-key1\"]").val(len4);
          break;
        }
      }
      for (let len5 = 0x0; len5 < len.length; len5++) {
        if (len3[0x1] == len[len5].vCode) {
          layui2("[name=\"mapping-ctrl-key2\"]").val(len5);
          break;
        }
      }
      for (let len6 = 0x0; len6 < len2.length; len6++) {
        if (len3[0x2] == len2[len6].vCode) {
          layui2("[name=\"mapping-key\"]").val(len6);
          break;
        }
      }
    }
    if (keyInfo.mouse_mapping_keys == "[0,0,1024]" || keyInfo.mouse_mapping_keys == "[0,0,1025]" || keyInfo.mouse_mapping_keys == "[0,0,1026]" || keyInfo.mouse_mapping_keys == "[0,0,1027]") {
      layui2("#wheel-delta-container").css("display", 'flex');
      layui2("#wheel-delta-input").val(keyInfo.mouse_mapping_key_data);
    } else {
      layui2("#wheel-delta-container").css('display', "none");
    }
    var value2 = len2[layui2("[name=\"mapping-key\"]").val()].vCode;
    if (layui2("[name=\"mapping-ctrl-key1\"]").val() == 0x0 && layui2("[name=\"mapping-ctrl-key2\"]").val() == 0x0 && value2 != 0x0 && value2 != 0x400 && value2 != 0x401 && value2 != 0x402 && value2 != 0x403) {
      layui2("#mapping-key-turbo-container").css("display", '');
      if (keyInfo.mouse_auto_click == 0x1) {
        layui2("#mapping-key-turbo-detail-container").css("display", '');
        layui2("[name=\"mapping-key-turbo\"]").prop('checked', true);
      } else {
        layui2("#mapping-key-turbo-detail-container").css("display", "none");
        layui2("[name=\"mapping-key-turbo\"]").prop("checked", false);
      }
      if (keyInfo.mouse_auto_click_down == 0x0 && keyInfo.mouse_auto_click_up == 0x0) {
        keyInfo.mouse_auto_click_down = 0x32;
        keyInfo.mouse_auto_click_up = 0x32;
      }
      layui2("#mapping-key-turbo-freq-input").val(Math.floor(0x3e8 / (keyInfo.mouse_auto_click_down + keyInfo.mouse_auto_click_up)));
      layui2("#mapping-key-turbo-rand-input").val(keyInfo.mouse_auto_click_rand);
      layui2('#mapping-key-turbo-down-keep-input').val(keyInfo.mouse_auto_click_down);
      layui2("#mapping-key-turbo-up-keep-input").val(keyInfo.mouse_auto_click_up);
      if (client.device_info != undefined && client.device_info.revision != undefined && client.device_info.revision.substr(0x0, 0x2) == 'G-' && (value2 >= 0x200 && value2 < 767 || value2 == 0x402 || value2 == 0x403)) {
        layui2("#keys-fw-channel-gaming-tips").css("display", '');
      } else {
        layui2("#keys-fw-channel-gaming-tips").css("display", "none");
      }
    } else {
      layui2("#mapping-key-turbo-container").css("display", "none");
      layui2("#keys-fw-channel-gaming-tips").css("display", "none");
    }
  }
  layui3.render("checkbox");
  layui3.render("select");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ui_refresh_tab_mapping_macro(client: any) {
  var layui2 = layui.$;
  var layui3 = layui.form;
  var keyInfo = get_select_key_info();
  if (Object.keys(keyInfo).length == 0x0) {
    return;
  }
  if (keyInfo.macro_style < 0x0 || keyInfo.macro_style > 0x6) {
    keyInfo.macro_style = 0x0;
  }
  S.macro_counts = [];
  for (let len = 0x0; len <= 0x6; len++) {
    S.macro_counts.push(0x0);
  }
  for (let index = 0x0; index < S.onboard_keys.length; index++) {
    var value = S.onboard_keys[index];
    if (keyInfo.name == value.name) {
      S.macro_counts[value.macro_style] = value.macroKeys.length;
    }
  }
  var html = "<select name=\"mapping-macro-trigger-type\" lay-verify=\"required\" lay-filter=\"mapping-macro-trigger-type\">";
  for (let offset = 0x0; offset <= 0x6; offset++) {
    if (S.macro_counts[offset] > 0x0) {
      html += "<option value=\"" + offset + "\">" + S.macro_trigger_types[offset] + '(' + S.macro_counts[offset] + ')' + "</option>";
      if (S.macro_trigger_type_index < 0x0) {
        S.macro_trigger_type_index = offset;
      }
    } else {
      html += "<option value=\"" + offset + "\">" + S.macro_trigger_types[offset] + '</option>';
    }
  }
  html += '</select>';
  layui2("#setting-mapping-macro-trigger-type").html(html);
  if (S.macro_trigger_type_index < 0x0) {
    S.macro_trigger_type_index = 0x0;
  }
  layui2("[name=\"mapping-macro-trigger-type\"]").val(S.macro_trigger_type_index);
  html = "<select name=\"mapping-macro-trigger-key\" lay-verify=\"required\" lay-filter=\"mapping-macro-trigger-key\">";
  for (let count = 0x0; count < S.mouse_key_labels.length; count++) {
    var str = count > 0x0 && S.mouse_keys[count - 0x1].visible != undefined && !S.mouse_keys[count - 0x1].visible ? " disabled" : '';
    html += "<option value=\"" + count + "\"" + str + '>' + S.mouse_key_labels[count] + "</option>";
  }
  html += '</select>';
  layui2('#setting-mapping-macro-trigger-key').html(html);
  layui2("[name=\"mapping-macro-trigger-key\"]").val(0x0);
  var value2 = get_key_label_from_id(keyInfo.macro_toggleKey);
  for (let len2 = 0x0; len2 < S.mouse_key_labels.length; len2++) {
    if (value2 == S.mouse_key_labels[len2]) {
      layui2("[name=\"mapping-macro-trigger-key\"]").val(len2);
      break;
    }
  }
  html = "<select name=\"mapping-macro-stop-key\" lay-verify=\"required\" lay-filter=\"mapping-macro-stop-key\">";
  for (let len3 = 0x0; len3 < S.mouse_key_labels.length; len3++) {
    var str = len3 > 0x0 && S.mouse_keys[len3 - 0x1].visible != undefined && !S.mouse_keys[len3 - 0x1].visible ? " disabled" : '';
    html += "<option value=\"" + len3 + "\"" + str + '>' + S.mouse_key_labels[len3] + '</option>';
  }
  html += "</select>";
  layui2("#setting-mapping-macro-stop-key").html(html);
  layui2("[name=\"mapping-macro-stop-key\"]").val(0x0);
  value2 = get_key_label_from_id(keyInfo.macro_endKey);
  for (let len4 = 0x0; len4 < S.mouse_key_labels.length; len4++) {
    if (value2 == S.mouse_key_labels[len4]) {
      layui2("[name=\"mapping-macro-stop-key\"]").val(len4);
      break;
    }
  }
  layui2('#setting-mapping-macro-actions').html(layui.i18np.prop('STRID_SETTING_MACRO_TOTAL') + " " + S.macro_counts[S.macro_trigger_type_index] + " " + layui.i18np.prop("STRID_SETTING_MACRO_ACTIONGS"));
  layui3.render("select");
  layui3.render();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ui_refresh_mapping_macro_edit(client: any) {
  if (client != undefined ? is_hs_keyboard(client.device) : false) {
    kbd_ui_macro_edit_init(client);
    return;
  }
  var layui2 = layui.$;
  var html = "<table>";
  html += '<tr>';
  for (let len = 0x0; len < S.edit_macros.length; len++) {
    var value = S.edit_macros[len];
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
        html += "<p style=\"color: white;margin-top: 6px;\">" + layui.i18np.prop("STRID_KEY_WHELL_UP_S") + "<br>" + value.mouse_key_code + '</p>';
      } else {
        html += "<img src=\"" + RESOURCE_URL + "setting/mkey_down.png\" style=\"width: 20px;height: 22px; margin:4px;\"/>";
        html += "<p style=\"color: white;margin-top: 6px;\">" + layui.i18np.prop("STRID_KEY_WHELL_DOWN_S") + '<br>' + Math.abs(value.mouse_key_code) + "</p>";
      }
    } else {
      if (value.mouse_key_event == 0x20e) {
        if (value.mouse_key_code < 0x0) {
          html += "<img src=\"" + RESOURCE_URL + "setting/mkey_up.png\" style=\"width: 20px;height: 22px; margin:4px;\"/>";
          html += "<p style=\"color: white;margin-top: 6px;\">" + layui.i18np.prop("STRID_KEY_WHELL_LEFT_S") + "<br>" + Math.abs(value.mouse_key_code) + "</p>";
        } else {
          html += "<img src=\"" + RESOURCE_URL + "setting/mkey_down.png\" style=\"width: 20px;height: 22px; margin:4px;\"/>";
          html += "<p style=\"color: white;margin-top: 6px;\">" + layui.i18np.prop("STRID_KEY_WHELL_RIGHT_S") + "<br>" + value.mouse_key_code + "</p>";
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
            value4 = Math.floor(value4 * screenW / 0xffff);
            value5 = Math.floor(value5 * screenH / 0xffff);
            html += "<p style=\"color: white;margin-top: 6px;\">" + layui.i18np.prop("STRID_KEY_MOUSE_POSITION_S") + "<br>" + value4 + ':' + value5 + "</p>";
          } else if (value.mouse_key_code == 0x0) {
            html += "<p style=\"color: white;margin-left:4px;\">" + get_key_name_from_code(value.mouse_key_code) + '</p>';
          } else if (value.mouse_key_event == 0x101) {
            if (value.mouse_key_code >= 0xff && value.mouse_key_code < 0x200) {
              html += "<img src=\"" + RESOURCE_URL + "setting/mkey_up.png\" style=\"width: 20px;height: 22px; margin:4px;\"/>";
            } else {
              html += "<img src=\"" + RESOURCE_URL + "setting/key_up.png\" style=\"width: 20px;height: 22px; margin:4px;\"/>";
            }
            html += "<p style=\"color: white;margin-top: 6px;\">" + get_key_name_from_code(value.mouse_key_code) + '</p>';
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
      html += "<p style=\"color: white;\">" + value.mouse_key_time + 'x' + value.mouse_key_loop + " " + layui.i18np.prop("STRID_SETTING_MAPPING_MACRO_ACTION_KEEP_TIME_MS") + '</p>';
    } else {
      html += "<p style=\"color: white;\">" + value.mouse_key_time + " " + layui.i18np.prop("STRID_SETTING_MAPPING_MACRO_ACTION_KEEP_TIME_MS") + '</p>';
    }
    html += "</div>";
    html += '</div>';
    html += "</a>";
    html += "</td>";
    if ((len + 0x1) % 0x5 == 0x0) {
      html += "</tr><tr>";
    }
  }
  html += "</tr>";
  html += "</table>";
  layui2("#mapping-macro-edit-container").html(html);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ui_refresh_mapping_macro_add(client: any) {
  var layui2 = layui.$;
  var layui3 = layui.form;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  var layui4: any = layui.slider;
  var html = "<select name=\"macro-add-select-key\" lay-verify=\"required\" lay-filter=\"macro-add-select-key\">";
  for (let len = 0x0; len < macro_keys.length; len++) {
    html += "<option value=\"" + len + "\">" + macro_keys[len].name + "</option>";
  }
  html += '</select>';
  layui2('#mapping-macro-add-select-key').html(html);
  layui2("[name=\"macro-add-select-key\"]").val(0x0);
  var value = Math.floor(S.macro_keep_time_min / MACRO_KEEP_TIME_STEP) * MACRO_KEEP_TIME_STEP;
  var value2 = value + MACRO_KEEP_TIME_STEP;
  if (value2 > MACRO_KEEP_TIME_MAX_MS) {
    value2 = MACRO_KEEP_TIME_MAX_MS;
    value = value2 - MACRO_KEEP_TIME_STEP;
  }
  var value3: any = layui4.render({
    'elem': '#slider-mapping-macro-keep-time-input',
    'min': value,
    'max': value2,
    'step': 0x1,
    'value': S.current_edit_macro.mouse_key_time,
    'input': true,
    'tips': false,
    'theme': S.theme_color,
    'done': function (result: any) {
      if (result != undefined) {
        S.current_edit_macro.mouse_key_time = result;
      }
    }
  });
  layui2("#slider-mapping-macro-keep-time-input input").on("input", function (result: any) {
    if (result.delegateTarget.value > MACRO_KEEP_TIME_MAX_MS) {
      result.delegateTarget.value = MACRO_KEEP_TIME_MAX_MS;
    }
    var value4 = Math.floor(result.delegateTarget.value / MACRO_KEEP_TIME_STEP) * MACRO_KEEP_TIME_STEP;
    var value5 = value4 + MACRO_KEEP_TIME_STEP;
    if (value5 > MACRO_KEEP_TIME_MAX_MS) {
      value5 = MACRO_KEEP_TIME_MAX_MS;
      value4 = value5 - MACRO_KEEP_TIME_STEP;
    }
    value3.config.min = value4;
    value3.config.max = value5;
    value3.setValue(result.delegateTarget.value);
  });
  if (S.current_edit_macro.mouse_key_event == 0x20a) {
    for (let index = 0x0; index < macro_keys.length; index++) {
      if (macro_keys[index].vCode == 0x400 && S.current_edit_macro.mouse_key_code >= 0x0 || macro_keys[index].vCode == 0x401 && S.current_edit_macro.mouse_key_code < 0x0) {
        layui2("[name=\"macro-add-select-key\"]").val(index);
        break;
      }
    }
  } else {
    if (S.current_edit_macro.mouse_key_event == 0x20e) {
      for (let offset = 0x0; offset < macro_keys.length; offset++) {
        if (macro_keys[offset].vCode == 0x402 && S.current_edit_macro.mouse_key_code < 0x0 || macro_keys[offset].vCode == 0x403 && S.current_edit_macro.mouse_key_code >= 0x0) {
          layui2("[name=\"macro-add-select-key\"]").val(offset);
          break;
        }
      }
    } else {
      if (S.current_edit_macro.mouse_key_event == 0x200) {
        for (let count = 0x0; count < macro_keys.length; count++) {
          if (macro_keys[count].vCode == 0x404) {
            layui2("[name=\"macro-add-select-key\"]").val(count);
            break;
          }
        }
      } else {
        if (S.current_edit_macro.mouse_key_event == 0x2ff) {
          for (let len2 = 0x0; len2 < macro_keys.length; len2++) {
            if (macro_keys[len2].vCode == 0x405) {
              layui2("[name=\"macro-add-select-key\"]").val(len2);
              break;
            }
          }
        } else {
          for (let len3 = 0x0; len3 < macro_keys.length; len3++) {
            if (macro_keys[len3].vCode == S.current_edit_macro.mouse_key_code) {
              layui2("[name=\"macro-add-select-key\"]").val(len3);
              document.getElementById("kbd-macro-add-select-key")!.textContent = macro_keys[len3].name;
              break;
            }
          }
        }
      }
    }
  }
  if (client != undefined ? is_hs_keyboard(client.device) : false) {
    layui2('#mapping-macro-add-select-key').css("display", "none");
    layui2("#kbd-macro-add-select-key").css('display', '');
  } else {
    layui2("#mapping-macro-add-select-key").css('display', '');
    layui2("#kbd-macro-add-select-key").css("display", "none");
  }
  if (S.current_edit_macro.mouse_key_event == 0x20a || S.current_edit_macro.mouse_key_event == 0x20e) {
    layui2("#macro-add-select-key-container").css("display", "none");
    layui2('#macro-add-wheel-delta-container').css("display", '');
    layui2("#macro-add-move-delta-container").css("display", 'none');
    layui2('#macro-add-position-container').css("display", "none");
    layui2("#macro-add-wheel-delta-input").val(Math.abs(S.current_edit_macro.mouse_key_code));
  } else {
    if (S.current_edit_macro.mouse_key_event == 0x200) {
      layui2("#macro-add-select-key-container").css("display", "none");
      layui2('#macro-add-wheel-delta-container').css("display", 'none');
      layui2("#macro-add-move-delta-container").css("display", '');
      layui2("#macro-add-position-container").css("display", "none");
      var value6 = S.current_edit_macro.mouse_key_code >> 0x10 & 0xffff;
      var value7 = S.current_edit_macro.mouse_key_code & 0xffff;
      layui2("#macro-add-move-delta-x-input").val((value6 - 0x7ff) / 0xa);
      layui2("#macro-add-move-delta-y-input").val((value7 - 0x7ff) / 0xa);
      layui2('#macro-add-move-loop-input').val(S.current_edit_macro.mouse_key_loop);
    } else {
      if (S.current_edit_macro.mouse_key_event == 0x2ff) {
        layui2("#macro-add-select-key-container").css("display", "none");
        layui2("#macro-add-wheel-delta-container").css("display", "none");
        layui2("#macro-add-move-delta-container").css("display", "none");
        layui2("#macro-add-position-container").css('display', '');
        var screenW = window.screen.width;
        var screenH = window.screen.height;
        var value8 = S.current_edit_macro.mouse_key_code >> 0x10 & 0xffff;
        var value9 = S.current_edit_macro.mouse_key_code & 0xffff;
        value8 = Math.floor(value8 * screenW / 0xffff);
        value9 = Math.floor(value9 * screenH / 0xffff);
        layui2("#macro-add-position-x-input").val(value8);
        layui2("#macro-add-position-y-input").val(value9);
      } else {
        if (S.current_edit_macro.mouse_key_code == 0x0) {
          layui2("#macro-add-select-key-container").css("display", "none");
          layui2("#macro-add-wheel-delta-container").css("display", 'none');
          layui2("#macro-add-move-delta-container").css("display", "none");
          layui2('#macro-add-position-container').css("display", "none");
        } else {
          layui2("#macro-add-select-key-container").css('display', '');
          layui2("#macro-add-wheel-delta-container").css("display", "none");
          layui2('#macro-add-move-delta-container').css("display", "none");
          layui2("#macro-add-position-container").css("display", "none");
          if (S.current_edit_macro.mouse_key_event == 0x101) {
            (layui2("[name=\"mapping-macro-action-key-event\"]")[0x1] as HTMLInputElement).checked = true;
          } else if (S.current_edit_macro.mouse_key_event == 0x100) {
            (layui2("[name=\"mapping-macro-action-key-event\"]")[0x0] as HTMLInputElement).checked = true;
          } else {
            (layui2("[name=\"mapping-macro-action-key-event\"]")[0x0] as HTMLInputElement).checked = false;
            (layui2("[name=\"mapping-macro-action-key-event\"]")[0x1] as HTMLInputElement).checked = false;
          }
        }
      }
    }
  }
  layui3.render("radio");
  layui3.render("select");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ui_refresh_tab_mapping_function(client: any) {
  var layui2 = layui.$;
  var layui3 = layui.form;
  var keyInfo = get_select_key_info();
  if (Object.keys(keyInfo).length == 0x0) {
    return;
  }
  var html = "<select name=\"mapping-function\" lay-verify=\"required\" lay-filter=\"mapping-function\">";
  for (let len = 0x0; len < S.mouse_function_descs.length; len++) {
    if (S.mouse_functions[len] == 0xf && !is_bt_supported(client)) {
      html += "<option value=\"" + len + "\" disabled>" + S.mouse_function_descs[len] + '</option>';
    } else {
      html += "<option value=\"" + len + "\">" + S.mouse_function_descs[len] + "</option>";
    }
  }
  html += "</select>";
  layui2("#mapping-function-select").html(html);
  var offset = 0x0;
  for (let index = 0x0; index < S.mouse_functions.length; index++) {
    if (keyInfo.mouse_mapping_function == S.mouse_functions[index]) {
      offset = index;
      break;
    }
  }
  layui2("[name=\"mapping-function\"]").val(offset);
  layui3.render("select");
  if (keyInfo.mouse_mapping_function == 0x9) {
    layui2("#mapping-function-dpi-container").css('display', '');
    var cpiRange = get_cpi_range(client);
    var value = get_cpi_step(client);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var layui4: any = layui.slider;
    layui4.render({
      'elem': "#slider-function-dpi-input",
      'min': cpiRange[0x0],
      'max': cpiRange[0x1],
      'step': value,
      'value': keyInfo.mouse_mapping_function_data,
      'input': true,
      'tips': false,
      'theme': S.theme_color,
      'done': function (result: any) {
        if (result != undefined) {
          keyInfo.mouse_mapping_function_data = result;
        }
      }
    });
  } else {
    layui2("#mapping-function-dpi-container").css("display", "none");
  }
  if (keyInfo.mouse_mapping_function == 0xd) {
    layui2("#mapping-function-toggle-esb-container").css("display", '');
  } else {
    layui2("#mapping-function-toggle-esb-container").css("display", 'none');
  }
  var value2 = client.product_esb_ch == 0xff ? client.device_info.esbChannel : client.product_esb_ch;
  var value3 = 0x1;
  html = "<table class=\"layui-table\">";
  client.device_info.esbAddressArr.forEach(item => {
    var i: string;
    var idx: string;
    i = item.substr(16, 2);
    if (value2 == 0x0) {
      idx = item.substr(0x0, 8);
    } else {
      idx = item.substr(8, 8);
    }
    item = i + idx;
    if (item != '0000000000') {
      html += "<tr>";
      html += '<td>';
      html += value3++;
      html += '</td>';
      html += "<td style=\"width: 100%;\">";
      html += item;
      html += '</td>';
      html += "</tr>";
    }
  });
  html += "</table>";
  layui2("#paired-esb-addr-list").html(html);
  if (keyInfo.mouse_mapping_function == 0xf) {
    layui2("#mapping-function-toggle-ble-container").css("display", '');
  } else {
    layui2("#mapping-function-toggle-ble-container").css("display", "none");
  }
  html = "<table class=\"layui-table\">";
  client.device_info.peerInfo.forEach(item2 => {
    html += '<tr>';
    html += '<td>';
    html += item2.id;
    html += "</td>";
    html += "<td style=\"width: 100%;\">";
    html += item2.address;
    html += "</td>";
    html += "</tr>";
  });
  html += "</table>";
  layui2("#paired-ble-addr-list").html(html);
  if (keyInfo.mouse_mapping_function == 0xe) {
    layui2("#mapping-function-show-power-container").css('display', '');
  } else {
    layui2('#mapping-function-show-power-container').css('display', "none");
  }
  if (keyInfo.mouse_mapping_function == 0x10) {
    layui2("#mapping-function-shell-cmd-container").css('display', '');
    (document.getElementById("function-shell-cmd-app-browse") as HTMLImageElement).src = RESOURCE_URL + "setting/folder.png";
    if (is_valid_url(keyInfo.mouse_mapping_function_text)) {
      (layui2("[name=\"function-shell-cmd\"]")[0x1] as HTMLInputElement).checked = true;
      layui2("#function-shell-cmd-app-browse").css('display', "none");
      layui2('#function-shell-cmd-app-browse').prop("disabled", true);
      layui2("[name=\"function-shell-cmd-app\"]").prop("disabled", true);
      layui2("[name=\"function-shell-cmd-web\"]").prop("disabled", false);
      layui2("[name=\"function-shell-cmd-app\"]").val('');
      layui2("[name=\"function-shell-cmd-web\"]").val(keyInfo.mouse_mapping_function_text);
      layui2("#function-shell-cmd-app-container").css("display", "none");
      layui2("#function-shell-cmd-web-container").css('display', '');
    } else {
      (layui2("[name=\"function-shell-cmd\"]")[0x0] as HTMLInputElement).checked = true;
      layui2("#function-shell-cmd-app-browse").css("display", "none");
      layui2("#function-shell-cmd-app-browse").prop('disabled', false);
      layui2("[name=\"function-shell-cmd-app\"]").prop("disabled", false);
      layui2("[name=\"function-shell-cmd-web\"]").prop("disabled", true);
      layui2("[name=\"function-shell-cmd-app\"]").val(keyInfo.mouse_mapping_function_text);
      layui2("[name=\"function-shell-cmd-web\"]").val('');
      layui2("#function-shell-cmd-app-container").css('display', '');
      layui2("#function-shell-cmd-web-container").css("display", "none");
    }
    layui3.render("radio");
  } else {
    layui2('#mapping-function-shell-cmd-container').css("display", "none");
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function select_mouse_key(keyCode: any, len: any) {
  if (len.length == 0x0) {
    S.select_key_name = '';
    ui_refresh_mapping_key(keyCode);
    select_mapping_type(keyCode, 0x3);
    return;
  }
  ui_refresh_mapping_key(keyCode);
  var flag = false;
  for (let index = 0x0; index < S.onboard_keys.length; index++) {
    var value = S.onboard_keys[index];
    if (len == value.name) {
      if (value.configType == 0x0) {
        if (value.touch_style == 0x1b) {
          flag = true;
          select_mapping_type(keyCode, 0x0);
        } else if (value.touch_style == 0x1d) {
          flag = true;
          select_mapping_type(keyCode, 0x2);
        }
      } else if (value.configType == 0x5) {
        flag = true;
        select_mapping_type(keyCode, 0x1);
      }
      break;
    }
  }
  if (!flag) {
    select_mapping_type(keyCode, 0x3);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function select_mapping_type(client: any, mappingType: any) {
  var keyInfo = get_select_key_info();
  if (Object.keys(keyInfo).length == 0x0) {
    mappingType = 0x3;
  }
  S.macro_trigger_type_index = 0x0;
  layui.element.tabChange("mapping-key-type", mappingType);
  update_mapping(client, mappingType);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function update_mapping(client: any, mappingData: any) {
  $('#mapping-key-container').css("display", "none");
  $("#mapping-macro-container").css("display", "none");
  $('#mapping-function-container').css("display", "none");
  var keyInfo = get_select_key_info();
  if (Object.keys(keyInfo).length == 0x0) {
    return;
  }
  if (mappingData == 0x0) {
    $('#mapping-key-container').css("display", '');
    ui_refresh_tab_mapping_key(client);
  } else {
    if (mappingData == 0x1) {
      for (let len = 0x0; len <= 0x6; len++) {
        var flag = false;
        for (let index = 0x0; index < S.onboard_keys.length; index++) {
          if (S.onboard_keys[index].name == keyInfo.name && S.onboard_keys[index].macro_style == len) {
            flag = true;
            break;
          }
        }
        if (!flag) {
          var item = create_key_info();
          item.name = keyInfo.name;
          item.label = keyInfo.label;
          item.configType = 0x5;
          item.macro_style = len;
          S.onboard_keys.push(item);
          keyInfo = get_select_key_info();
        }
      }
      $("#mapping-macro-container").css("display", '');
      ui_refresh_tab_mapping_macro(client);
    } else if (mappingData == 0x2) {
      $("#mapping-function-container").css("display", '');
      ui_refresh_tab_mapping_function(client);
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function set_mapping_keys(client: any) {
  var keyInfo = get_select_key_info();
  if (Object.keys(keyInfo).length == 0x0) {
    return;
  }
  var modifiersList = modifiers;
  var value = modifiersList[$("[name=\"mapping-ctrl-key1\"]").val()].vCode;
  var value2 = modifiersList[$("[name=\"mapping-ctrl-key2\"]").val()].vCode;
  var keysList = keys;
  var value3 = keysList[$("[name=\"mapping-key\"]").val()].vCode;
  keyInfo.mouse_mapping_keys = '[' + value + ',' + value2 + ',' + value3 + ']';
  ui_refresh_mapping_key(client);
  ui_refresh_combination_key(client);
  S.need_save = true;
  ui_refresh_onboard_config(client);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function get_select_key_info(): any {
  if (S.select_key_name.length == 0x0) {
    return {};
  }
  for (let len = 0x0; len < S.onboard_keys.length; len++) {
    if (S.select_key_name == S.onboard_keys[len].name) {
      if (S.onboard_keys[len].configType == 0x5) {
        if (S.macro_trigger_type_index >= 0x0) {
          if (S.onboard_keys[len].macro_style == S.macro_trigger_type_index) {
            return S.onboard_keys[len];
          }
        } else {
          return S.onboard_keys[len];
        }
      } else {
        return S.onboard_keys[len];
      }
    }
  }
  var keyInfo = create_key_info();
  keyInfo.name = S.select_key_name;
  var html = '';
  var arr = S.select_key_name.split('+');
  arr.forEach(item => {
    if (item == KEY_WHEEL_UP) {
      if (html.length > 0x0) {
        html += '+';
      }
      html += '\u25B2';
    } else {
      if (item == KEY_WHEEL_DOWN) {
        if (html.length > 0x0) {
          html += '+';
        }
        html += '\u25BC';
      } else {
        for (let index = 0x0; index < S.mouse_keys.length; index++) {
          if (item == S.mouse_keys[index].name) {
            if (html.length > 0x0) {
              html += '+';
            }
            html += S.mouse_keys[index].label;
            break;
          }
        }
      }
    }
  });
  keyInfo.label = html;
  keyInfo.configType = -0x1;
  S.onboard_keys.push(keyInfo);
  return keyInfo;
}

export function shell_cmd_app_browse_file() {
  var keyInfo = get_select_key_info();
  if (Object.keys(keyInfo).length == 0x0) {
    return;
  }
  keyInfo.mouse_mapping_function_text = ($("#shell-cmd-app-browse_file") as JQuery).val() as string;
  $("[name=\"function-shell-cmd-app\"]").val(keyInfo.mouse_mapping_function_text);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function get_key_name_from_label(label: any) {
  for (let len = 0x0; len < S.mouse_keys.length; len++) {
    if (label == S.mouse_keys[len].label) {
      return S.mouse_keys[len].name;
    }
  }
  return '';
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function get_key_label_from_id(keyId: any) {
  for (let len = 0x0; len < S.mouse_keys.length; len++) {
    if (keyId == S.mouse_keys[len].id[0x0]) {
      return S.mouse_keys[len].label;
    }
  }
  return layui.i18np.prop("STRID_NONE");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function get_key_id_from_name(name: any) {
  for (let len = 0x0; len < S.mouse_keys.length; len++) {
    if (name == S.mouse_keys[len].name) {
      return S.mouse_keys[len].id[0x0];
    }
  }
  return 0x0;
}

export function is_valid_url(url: string) {
  var urlRe = /^(https?:\/\/)?([\w.]+)\.([a-z]{2,6}\.?)(\/[\w.]*)*\/?$/i;
  return !!urlRe.test(url);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function start() {
  if (!S.wireless_optimizing && S.window_focused) {
    usb_client_list.forEach(client => {
      if (is_receiver(client) && client.helloed) {
        send_event_action(client, 0x42, 0x0);
      }
      if (client.virtual) {
        if (client.connected) {
          if (new Date().getTime() - client.esb_last_alive_time > client.esb_alive_timeout) {
            client.helloed = false;
            client.connected = false;
            client.send_event_buf = new Uint8Array(0x0);
            client.recv_buf = new Uint8Array(0x0);
            client.device_name = '';
            client.device_info = reset_device_info(client.device_info);
            client.syncing = false;
            usb_client_list.forEach(item => {
              if (is_receiver(item) && item.device == client.device) {
                if (item.helloed) {
                  send_event_query(client);
                }
              }
            });
            window.postMessage({
              'action': ACTION_REFRESH_CURRENT_CLIENT
            });
            layui.layer.closeAll();
          } else if (true && client.syncing) {
            if (client.eplapsed_syncing_ms != 0x0 && new Date().getTime() - client.eplapsed_syncing_ms > 0x3e8) {
              log_r(">>>>>>>>sync success");
              client.syncing = false;
              client.recv_buf = new Uint8Array(0x0);
            }
            client.esb_last_alive_time = new Date().getTime();
          } else if (client.querying_more_result) {
            client.esb_last_alive_time = new Date().getTime();
          } else {
            send_event_ping(client, false);
          }
        }
      } else if (client.connected) {
        if (client.querying_more_result) {
          client.esb_last_alive_time = new Date().getTime();
        } else {
          send_event_ping(client, false);
        }
      }
    });
  }
}

export function adjustTable() {
  var el = document.getElementById('settings') as HTMLTableElement;
  if (el.rows.length == 0x1) {
    if (window.innerWidth < 0x6f4) {
      var item = document.createElement('table');
      var el2 = document.createElement("tbody");
      var firstRow = el.rows[0x0];
      var value = el2.insertRow();
      var value2 = value.insertCell();
      value2.innerHTML = firstRow.cells[0x0].innerHTML;
      value2.colSpan = 0x2;
      value2.style = "padding-bottom: 10px;";
      value = el2.insertRow();
      value2 = value.insertCell();
      value2.innerHTML = firstRow.cells[0x1].innerHTML;
      value2.style = "vertical-align: top;padding-right: 30px; width: 50%;";
      value2 = value.insertCell();
      value2.innerHTML = firstRow.cells[0x2].innerHTML;
      value2.style = "vertical-align: top;padding-right: 30px;";
      item.appendChild(el2);
      item.style.width = "100%";
      item.id = el.id;
      el.parentNode!.replaceChild(item, el);
      if (current_usb_client != undefined) {
        setting_mapping_init(current_usb_client);
        ui_refresh_mapping_key(current_usb_client);
      }
      window.postMessage({
        'action': ACTION_UI_REFRESH_SETTING
      });
      setTimeout(function () {
        let el3 = document.getElementById('setting-key-delay-section')!;
        let el4 = document.getElementById("setting-lod-section")!;
        el4.style.height = el3.offsetTop + el3.offsetHeight - el4.offsetTop - 0x14 + 'px';
      }, 0xfa);
    }
  } else {
    if (window.innerWidth >= 0x6f4) {
      var item = document.createElement("table");
      var el2 = document.createElement("tbody");
      var value = el2.insertRow();
      var value2 = value.insertCell();
      value2.innerHTML = el.rows[0x0].cells[0x0].innerHTML;
      value2.style = "vertical-align: top;height: 1px;";
      value2 = value.insertCell();
      value2.innerHTML = el.rows[0x1].cells[0x0].innerHTML;
      value2.style = "width: 35%;min-width: 340px;vertical-align: top;padding-right: 30px;";
      value2 = value.insertCell();
      value2.innerHTML = el.rows[0x1].cells[0x1].innerHTML;
      value2.style = "width: 35%;min-width: 300px;vertical-align: top;padding-right: 30px;";
      item.appendChild(el2);
      item.id = el.id;
      el.parentNode!.replaceChild(item, el);
      if (current_usb_client != undefined) {
        setting_mapping_init(current_usb_client);
        ui_refresh_mapping_key(current_usb_client);
      }
      window.postMessage({
        'action': ACTION_UI_REFRESH_SETTING
      });
      setTimeout(function () {
        let el5 = document.getElementById("setting-key-delay-section")!;
        let el6 = document.getElementById("setting-lod-section")!;
        el6.style.height = el5.offsetTop + el5.offsetHeight - el6.offsetTop - 0x14 + 'px';
      }, 0xfa);
    }
  }
}
