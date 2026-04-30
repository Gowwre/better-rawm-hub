// ===== AUTO-FIX MISSING IMPORTS ==============================================
// Reads the list from check-imports output and adds missing imports to each file.
// Run: node scripts/fix-imports.mjs
// ============================================================================

import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname, relative } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// Map of file → [ { name, sourceFile } ]
// Generated from check-imports.mjs output, organized by origin module
const MISSING = {
  'protocol/hid-parser.js': {
    '../data/constants.js': ['CHANNEL_SET_DELAY_MS', 'CONFIG_TIMEOUT_MS'],
    '../state/device-store.js': ['ACTION_UI_REFRESH_SETTING', 'ACTION_UI_REFRESH_CLIENT_LIST', 'ACTION_UI_REFRESH_CURRENT_CLIENT', 'ACTION_UI_REFRESH_CURRENT_CLIENT_RSSI', 'ACTION_UI_REFRESH_QUAL', 'reset_device_info_esb', 'mouse_config_timer'],
  },
  'protocol/hid-protocol.js': {
    '../data/constants.js': ['SYNC_TIMEOUT_MS', 'HID_ACTION_MACRO_FIRST', 'HID_ACTION_MACRO_CONT', 'MOUSE_EVENT_POSITION', 'MOUSE_EVENT_KEY_UP', 'KEY_WHEEL_UP', 'KEY_WHEEL_UP_ID', 'KEY_WHEEL_DOWN', 'KEY_WHEEL_DOWN_ID'],
    '../state/device-store.js': ['upload_mouse_config_timer', 'get_cpi_step', 'get_keys'],
    '../protocol/hs-protocol.js': ['hs_get_firmware_version'],
  },
  'protocol/hid-transport.js': {
    '../data/constants.js': ['HS_FRAME_SIZE'],
  },
  'protocol/hs-parser.js': {
    '../state/key-lookup.js': ['keys'],
    '../state/device-store.js': ['ACTION_UI_REFRESH_KBD_LIGHT', 'ACTION_UI_REFRESH_KBD_AXIS'],
  },
  'protocol/hs-protocol.js': {
    '../state/key-lookup.js': ['pc_kbd_key_num', 'pc_kbd_manager_keys'],
  },
  'protocol/http-data-model.js': {
    '../data/constants.js': ['CMD_FACTORY_RESET'],
    '../state/device-store.js': ['upload_mouse_config_timer'],
  },
  'protocol/key-config-parser.js': {
    '../data/constants.js': ['KEY_WHEEL_UP', 'KEY_WHEEL_DOWN', 'MOUSE_EVENT_KEY_UP', 'MOUSE_EVENT_POSITION', 'CONFIG_TYPE_MACRO'],
  },
  'state/kbd-structures.js': {
    '../state/key-lookup.js': ['keys'],
  },
  'ui/ui-clients.js': {
    '../state/device-store.js': ['current_usb_client'],
  },
  'ui/ui-helpers.js': {
    '../data/constants.js': ['MOUSE_EVENT_WHEEL_VERT', 'MOUSE_EVENT_WHEEL_HORZ', 'MOUSE_EVENT_MOVE', 'MOUSE_EVENT_POSITION', 'MOUSE_EVENT_KEY_UP'],
  },
  'ui/ui-mapping.js': {
    '../data/constants.js': [],
    '../state/device-store.js': ['is_oms', 'get_shortcuts', 'get_light_display_colors', 'is_bt_supported', 'get_cpi_range', 'usb_client_list', 'reset_device_info'],
    '../protocol/parse-cmd-ui.js': ['theme_color'],
    '../protocol/hid-protocol.js': ['send_event_query', 'send_event_ping'],
  },
  'ui/ui-settings.js': {
    '../state/device-store.js': ['usb_client_list'],
  },
  'ui/ui-keyboard.js': {
    '../data/constants.js': ['MOUSE_EVENT_WHEEL_VERT', 'MOUSE_EVENT_WHEEL_HORZ', 'MOUSE_EVENT_MOVE', 'MOUSE_EVENT_POSITION', 'MOUSE_EVENT_KEY_UP'],
    '../state/device-store.js': ['current_usb_client', 'get_esb_addr', 'get_default_rf_channel', 'is_slow_receiver', 'is_light', 'usb_client_list', 'get_usb_client', 'is_soc_compatible', 'get_esb_addr_arr', 'set_cpi', 'set_cpi_level', 'set_enable_glass_mode', 'get_cpi_range', 'set_cpi_level_color', 'set_polling_rate', 'set_light', 'set_power_mode', 'set_lod', 'set_angle_snapping', 'set_ripple_control', 'set_motion_sync', 'set_wireless_turbo', 'set_auto_tx_power', 'set_onboard_status'],
    '../protocol/parse-cmd-ui.js': ['theme_color'],
    '../ui/ui-clients.js': ['ui_refresh_client_list', 'update_setting_x_polling'],
    '../ui/ui-settings.js': ['ui_refresh_dpi_input_panel'],
    '../ui/ui-mapping.js': ['ui_refresh_mapping_macro_edit', 'ui_refresh_mapping_key', 'ui_refresh_onboard_config', 'select_mouse_key', 'ui_refresh_combination_key', 'get_select_key_info', 'update_mapping', 'set_mapping_keys', 'ui_refresh_tab_mapping_key', 'ui_refresh_tab_mapping_function', 'ui_refresh_mapping_macro_add', 'ui_refresh_tab_mapping_macro', 'get_key_id_from_name', 'start'],
    '../protocol/hid-protocol.js': ['send_event_set_auto_hop', 'get_key_id_by_name', 'write_mouse_param'],
    '../protocol/http-data-model.js': ['send_event_config_reset'],
    '../ui/ui-helpers.js': ['KeyGridHighlight'],
  },
};

function addImports(filePath, importsBySource) {
  const fullPath = resolve(ROOT, filePath);
  let source = readFileSync(fullPath, 'utf-8');
  const lines = source.split('\n');

  // Find the end of existing import block
  let importEndIdx = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim().startsWith('import ')) {
      importEndIdx = i;
    } else if (importEndIdx >= 0 && lines[i].trim() === '') {
      // blank line after imports
    } else if (importEndIdx >= 0) {
      break;
    }
  }

  // Build new import lines
  const newLines = [];
  for (const [sourcePath, names] of Object.entries(importsBySource)) {
    if (names.length === 0) continue;
    // Check if this source already has an import in the file
    const existingImport = lines.find(l => l.includes(` from '${sourcePath}'`));
    if (existingImport) {
      // Merge into existing import
      const idx = lines.indexOf(existingImport);
      const match = existingImport.match(/import\s+\{([^}]+)\}\s+from\s+'[^']+'/);
      if (match) {
        const existingNames = match[1].split(',').map(n => n.trim().replace(/\s+as\s+\w+$/, ''));
        const allNames = [...new Set([...existingNames, ...names])];
        lines[idx] = existingImport.replace(
          /\{([^}]+)\}/,
          '{ ' + allNames.join(', ') + ' }'
        );
      }
    } else {
      newLines.push(`import { ${names.join(', ')} } from '${sourcePath}';`);
    }
  }

  if (newLines.length > 0) {
    // Insert new imports after the last existing import (or at top of file)
    const insertIdx = importEndIdx >= 0 ? importEndIdx + 1 : 0;
    lines.splice(insertIdx, 0, ...newLines);
  }

  const result = lines.join('\n');
  if (result !== source) {
    writeFileSync(fullPath, result, 'utf-8');
    console.log(`✓ ${filePath} — fixed`);
  } else {
    console.log(`- ${filePath} — no changes needed`);
  }
}

for (const [file, imports] of Object.entries(MISSING)) {
  addImports(file, imports);
}
