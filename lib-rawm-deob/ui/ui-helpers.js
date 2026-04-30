// ===== UI TEMPLATE HELPERS ====================================================
// Reusable HTML generation functions. Each returns a string fragment.
// Extracted from the string-concatenation hotspots in:
//   10-ui-settings.js, 11-ui-mapping.js, 14-ui-keyboard.js
// ============================================================================
import { get_key_name_from_code } from '../state/key-lookup.js';
import { RESOURCE_URL } from '../state/device-store.js';
import { is_dark_theme } from '../protocol/parse-cmd-ui.js';
import { MOUSE_EVENT_WHEEL_VERT, MOUSE_EVENT_WHEEL_HORZ, MOUSE_EVENT_MOVE, MOUSE_EVENT_POSITION, MOUSE_EVENT_KEY_UP } from '../data/constants.js';

// ===== KEYBOARD / MOUSE KEY GRID =============================================

export function KeyGridCell(props) {
  var prefix = props.prefix || 'kbd-select-key';
  var action = props.action || 'select';
  var actionAttr = props.actionAttr;
  var index = props.index;
  var x = props.x || 0;
  var y = props.y || 0;
  var width = props.width;
  var height = props.height;
  var label = props.label || '';
  var elementId = props.elementId;
  var extraClass = props.extraClass || 'layui-hover-bg';
  var textStyle = props.textStyle || 'font-size: smaller;';
  var extraAttrs = props.extraAttrs || '';
  var showHoverBg = props.showHoverBg !== false;

  var attrStr = prefix + '-index="' + index + '"';
  if (actionAttr) {
    attrStr += ' ' + actionAttr + '="' + action + '"';
  } else {
    attrStr += ' ' + prefix + '-action="' + action + '"';
  }
  if (elementId !== undefined) {
    attrStr += ' elementId="' + elementId + '"';
  }
  if (extraAttrs) {
    attrStr += ' ' + extraAttrs;
  }

  var innerStyle = 'width:' + width + 'px; height:' + height + 'px;';
  var hoverStyle = 'position: absolute; width:' + width + 'px; height:' + height + 'px;';
  if (showHoverBg && extraClass.indexOf('layui-hover-bg') >= 0) {
    hoverStyle = 'display: flex; justify-content: center; align-items: center; position: absolute; width:' + width + 'px; height:' + height + 'px;';
  }

  var html = '';
  html += '<div class="layui-col-xs3" style="width:' + width + 'px; height:' + height + 'px; margin-left:' + x + 'px; margin-top:' + y + 'px;">';
  html += '<a ' + attrStr + ' style="cursor: pointer;">';
  html += '<div style="' + innerStyle + '">';
  html += '<div class="' + extraClass + '" style="' + hoverStyle + '">';
  html += '<p style="' + textStyle + 'color:white;text-align: center;">' + label + '</p>';
  html += '</div>';
  html += '</div>';
  html += '</a>';
  html += '</div>';
  return html;
}

export function KeyGridHighlight(props) {
  var width = props.width;
  var height = props.height;
  var cssClass = props.cssClass || 'layui-key-select-red';
  return '<div class="' + cssClass + '" style="position: absolute; width:' + (width - 3) + 'px; height:' + (height - 3) + 'px;"></div>';
}

// Row wrapper with auto-break at specific indices
export function RowBreak(index) {
  var breakPoints = arguments.length > 1 ? Array.prototype.slice.call(arguments, 1) : [0xf, 0x24, 0x39, 0x49, 0x59];
  for (var i = 0; i < breakPoints.length; i++) {
    if (index == breakPoints[i]) {
      return '</div><div class="layui-row">';
    }
  }
  return '';
}

// ===== SELECT DROPDOWNS ======================================================

export function SelectElement(props) {
  var name = props.name;
  var filter = props.filter || name;
  var verify = props.verify || 'required';
  var extraAttrs = props.extraAttrs || '';
  var options = props.options || [];
  var selectedValue = props.selected;

  var html = '';
  html += '<select name="' + name + '" lay-verify="' + verify + '" lay-filter="' + filter + '"' + (extraAttrs ? ' ' + extraAttrs : '') + '>';
  for (var i = 0; i < options.length; i++) {
    var opt = options[i];
    var optValue = opt.value !== undefined ? opt.value : i;
    var optLabel = opt.label !== undefined ? opt.label : opt;
    var disabled = opt.disabled ? ' disabled' : '';
    var selected = selectedValue !== undefined && optValue == selectedValue ? ' selected' : '';
    html += '<option value="' + optValue + '"' + disabled + selected + '>' + optLabel + '</option>';
  }
  html += '</select>';
  return html;
}

// ===== RADIO BUTTONS =========================================================

export function RadioInput(props) {
  var name = props.name;
  var filter = props.filter || name;
  var value = props.value;
  var label = props.label !== undefined ? props.label : value;
  var checked = props.checked ? ' checked' : '';
  var disabled = props.disabled ? ' disabled' : '';
  var extraAttrs = props.extraAttrs || '';
  return '<input type="radio" name="' + name + '" value="' + value + '" title="' + label + '" lay-filter="' + filter + '"' + checked + disabled + (extraAttrs ? ' ' + extraAttrs : '') + '>';
}

// ===== COLOR SELECTOR ========================================================
// The deeply-nested 7-color chain extracted into data-driven helpers.

var COLOR_MAP = {
  white:   { mask: 7, hex: '#FFF' },
  red:     { mask: 4, hex: '#F00' },
  green:   { mask: 2, hex: '#0F0' },
  blue:    { mask: 1, hex: '#00F' },
  yellow:  { mask: 6, hex: '#FF0' },
  purple:  { mask: 5, hex: '#F0F' },
  skyblue: { mask: 3, hex: '#0FF' },
  dark:    { mask: 0, hex: '#505050' },
};

// Returns the CSS dark-theme class for color picker radios
export function ColorPickerClass() {
  return is_dark_theme() ? 'lay-skin-color-picker' : 'lay-skin-color-picker-light';
}

// Build a single color radio option
export function ColorRadioOption(props) {
  var colorKey = props.color;
  var bitmask = props.bitmask;
  var name = props.name || 'light-color';
  var action = props.action || 'select';
  var offset = props.offsetRef;
  var darkTheme = ColorPickerClass();
  var info = COLOR_MAP[colorKey];
  if (!info) return '';

  var checked = (bitmask & 0x7) == info.mask ? ' checked' : '';
  var isFirstMatch = '';
  if (checked) {
    if (offset) { offset.value = 1; }
    isFirstMatch = ' checked';
  } else {
    isFirstMatch = '';
  }
  if (checked && !props.keepChecked) {
    isFirstMatch = ' checked';
  }

  var html = '';
  html += '<a color-code="' + colorKey + '" ' + (props.actionAttr || 'light-color-action') + '="' + action + '" style="padding-left: 8px; padding-right: 8px; padding-top: 8px; cursor: pointer;">';
  html += '<input type="radio" name="' + name + '" value="' + colorKey + '" lay-skin="none"' + (checked ? ' checked' : '') + '>';
  html += '<div lay-radio class="' + darkTheme + '" style="color: ' + info.hex + '; background-color: ' + info.hex + '"></div>';
  html += '</a>';
  return html;
}

// Build a full color selector table row from available colors
export function ColorSelectorTable(props) {
  var colors = props.colors;
  var bitmask = props.bitmask;
  var name = props.name || 'light-color';
  var actionAttr = props.actionAttr || 'light-color-action';
  var colorHex = props.colorHex || {};
  var offsetRef = { value: 0 };
  var darkTheme = ColorPickerClass();

  var html = '<table><tr>';
  for (var i = 0; i < colors.length; i++) {
    var colorKey = colors[i];
    var info = COLOR_MAP[colorKey];
    if (!info) continue;

    var checked = (bitmask & 0x7) == info.mask;
    if (checked) { offsetRef.value = 1; }
    var hex = colorHex[colorKey] || info.hex;

    html += '<td style="padding-top: 5px;">';
    html += '<a color-code="' + colorKey + '" ' + actionAttr + '="select" style="padding-left: 8px; padding-right: 8px; padding-top: 8px; cursor: pointer;">';

    if (colorKey == 'dark') {
      html += '<input type="radio" name="' + name + '" value="' + colorKey + '" lay-skin="none"' + (offsetRef.value == 0 ? ' checked' : '') + '>';
    } else {
      html += '<input type="radio" name="' + name + '" value="' + colorKey + '" lay-skin="none"' + (checked ? ' checked' : '') + '>';
    }

    html += '<div lay-radio class="' + darkTheme + '" style="color: ' + hex + '; background-color: ' + hex + '"></div>';
    html += '</a>';
    html += '</td>';
  }
  html += '</tr></table>';
  return html;
}

// ===== CPI LEVEL GRID ========================================================

export function CpiLevelItem(props) {
  var index = props.index;
  var cpiValue = props.value;
  var cpiX = cpiValue & 0xffff;
  var cpiY = cpiValue >> 16 & 0xffff;
  if (cpiY == 0) { cpiY = cpiX; }
  var colorMask = props.colorMask || 0;
  var currentX = props.currentX;
  var currentY = props.currentY;
  var hasXY = cpiY !== undefined && props.showXY;
  var isSelected = hasXY ? (currentX == cpiX && currentY == cpiY) : (currentX == cpiX);
  var isEditing = props.editing;
  var darkTheme = is_dark_theme() ? '' : '_gray';

  var visible = cpiValue > 0;
  var html = '';
  html += '<div class="layui-col-xs3" style="padding-top: 3px; padding-bottom: 3px; width: fit-content;' + (visible ? '' : ' display: none;') + '">';
  html += '<a cpi-level-index="' + index + '" cpi-level-action="select" style="cursor: pointer;">';

  var imgHeight = hasXY ? '54px' : '30px';
  html += '<div style="width: 80px; height: ' + imgHeight + '; margin-right: 6px;">';

  // Background image
  html += '<div style="position: absolute;">';
  if (!hasXY) {
    if (isEditing || currentX == cpiX) {
      html += '<img src="' + RESOURCE_URL + 'setting/dpi_selected' + darkTheme + '.png" style="position: absolute;">';
    } else {
      html += '<img src="' + RESOURCE_URL + 'setting/dpi_normal.png" style="position: absolute;">';
    }
  } else if (isEditing || (currentX == cpiX && currentY == cpiY)) {
    html += '<img src="' + RESOURCE_URL + 'setting/dpi_selected_h' + darkTheme + '.png" style="position: absolute;">';
  } else {
    html += '<img src="' + RESOURCE_URL + 'setting/dpi_normal_h.png" style="position: absolute;">';
  }
  html += '</div>';

  // Color indicator
  html += '<div style="position: absolute;">';
  var colorOffset = hasXY ? 12 : 0;
  var colorName = get_color_name_from_mask(colorMask);
  if (colorName) {
    html += '<img src="' + RESOURCE_URL + 'setting/dpi_color_' + colorName + '.png" style="position: absolute; margin-top: ' + colorOffset + 'px;">';
  }
  html += '</div>';

  // Text label
  html += '<div style="position: absolute; width: 80px;">';
  if (!hasXY) {
    var textColor = (isEditing || currentX == cpiX) ? 'color:white;' : '';
    html += '<p style="text-align: center; margin-top: 7px;' + textColor + '">' + cpiX + '</p>';
  } else if (isEditing || (currentX == cpiX && currentY == cpiY)) {
    html += '<p style="color:white; text-align: center; margin-top: 10px;">X:' + cpiX + '</p>';
    html += '<p style="color:white; text-align: center; margin-top: 2px;">Y:' + cpiY + '</p>';
  } else {
    html += '<p style="text-align: center; margin-top: 10px;">X:' + cpiX + '</p>';
    html += '<p style="text-align: center; margin-top: 2px;">Y:' + cpiY + '</p>';
  }
  html += '</div>';

  html += '</div>';
  html += '</a>';
  html += '</div>';
  return html;
}

export function get_color_name_from_mask(mask) {
  for (var key in COLOR_MAP) {
    if (COLOR_MAP[key].mask == (mask & 0x7)) {
      return key;
    }
  }
  return null;
}

// ===== MACRO EDIT GRID =======================================================

export function MacroEditCell(props) {
  var item = props.item;
  var index = props.index;
  var resourceUrl = props.resourceUrl || RESOURCE_URL;

  var keyCode = item.mouse_key_code;
  var keyEvent = item.mouse_key_event;
  var keyTime = item.mouse_key_time;

  var bgColor = (index % 2 == 0) ? 'gray' : '#202020';

  var html = '';
  html += '<td style="padding: 1px;">';
  html += '<a macro-edit-item-index="' + index + '" macro-edit-item-action="select" style="cursor: pointer;">';
  html += '<div style="width: 110px; background-color: ' + bgColor + '; border-radius: 5px; padding: 2px;">';
  html += '<div style="display: flex; align-items: center;">';

  // Title area with conditional icon + text
  if (keyEvent == MOUSE_EVENT_WHEEL_VERT) {
    var isUp = keyCode > 0;
    html += '<img src="' + resourceUrl + 'setting/mkey_wheel.png" style="width: 25px; height: 25px;">';
    html += '<p style="font-size: smaller; margin-left: 2px;">' + layui.i18np.prop('STRID_SETTING_MAPPING_MACRO_ACTION_WHEEL') + '</p>';
    html += '<p style="font-size: smaller; margin-left: 2px;">' + (isUp ? '▲' : '▼') + '</p>';
    html += '<p style="font-size: smaller; margin-left: 2px;">' + keyCode + '</p>';
  } else if (keyEvent == MOUSE_EVENT_WHEEL_HORZ) {
    var isLeft = keyCode < 0;
    html += '<img src="' + resourceUrl + 'setting/mkey_wheel.png" style="width: 25px; height: 25px;">';
    html += '<p style="font-size: smaller; margin-left: 2px;">' + layui.i18np.prop('STRID_SETTING_MAPPING_MACRO_ACTION_WHEEL') + '</p>';
    html += '<p style="margin-left: 2px;">' + (isLeft ? '◄' : '►') + '</p>';
    html += '<p style="font-size: smaller; margin-left: 2px;">' + keyCode + '</p>';
  } else if (keyEvent == MOUSE_EVENT_MOVE) {
    var dx = (keyCode >> 16 & 0xffff) - 0x7ff;
    var dy = (keyCode & 0xffff) - 0x7ff;
    html += '<img src="' + resourceUrl + 'setting/mkey_move.png" style="width: 25px; height: 25px;">';
    html += '<p style="font-size: smaller; margin-left: 2px;">' + layui.i18np.prop('STRID_SETTING_MAPPING_MACRO_ACTION_MOVE') + '</p>';
    html += '<p style="font-size: smaller; margin-left: 2px;">(' + (dx / 10) + ', ' + (dy / 10) + ')</p>';
  } else if (keyEvent == MOUSE_EVENT_POSITION) {
    html += '<img src="' + resourceUrl + 'setting/mkey_move.png" style="width: 25px; height: 25px;">';
    html += '<p style="font-size: smaller; margin-left: 2px;">' + layui.i18np.prop('STRID_SETTING_MAPPING_MACRO_ACTION_POSITION') + '</p>';
    var screenW = document.documentElement.clientWidth;
    var screenH = document.documentElement.clientHeight;
    var px = Math.round((keyCode >> 16 & 0xffff) * screenW / 0xffff);
    var py = Math.round((keyCode & 0xffff) * screenH / 0xffff);
    html += '<p style="font-size: smaller; margin-left: 2px;">(' + px + ', ' + py + ')</p>';
  } else if (keyEvent == MOUSE_EVENT_KEY_UP) {
    html += '<img src="' + resourceUrl + 'setting/' + (keyCode > 0xff ? 'mkey_up.png' : 'key_up.png') + '" style="width: 25px; height: 25px;">';
    html += '<p style="font-size: smaller; margin-left: 2px;">' + get_key_name_from_code(keyCode) + '</p>';
  } else {
    if (keyCode == 0) {
      html += '<p style="font-size: smaller;">' + get_key_name_from_code(keyCode) + '</p>';
    } else {
      html += '<img src="' + resourceUrl + 'setting/' + (keyCode > 0xff ? 'mkey_down.png' : 'key_down.png') + '" style="width: 25px; height: 25px;">';
      html += '<p style="font-size: smaller; margin-left: 2px;">' + get_key_name_from_code(keyCode) + '</p>';
    }
  }

  html += '</div>'; // flex end

  // Bottom row: wait icon + time
  html += '<div style="display: flex; align-items: center;">';
  html += '<img src="' + resourceUrl + 'setting/mkey_wait.png" style="width: 15px; height: 15px;">';
  html += '<p style="font-size: smaller; margin-left: 2px;">' + keyTime + '</p>';
  if (item.x && item.loop) {
    html += '<p style="font-size: smaller; margin-left: 2px;">x' + item.loop + '</p>';
  }
  html += '</div>';

  html += '</div>'; // outer div
  html += '</a>';
  html += '</td>';
  return html;
}
