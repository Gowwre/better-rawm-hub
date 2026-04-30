// ==== BATCH FIX ALL BARE S. REFERENCES ======================================
import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const LIB_DIR = resolve(__dirname, '..');

const S_VARS = [
  'current_usb_receiver', 'device_cfg', 'pair_panel_id', 'not_support_id',
  'connect_panel_id', 'editing', 'loading_id', 'tips_panel_id',
  'cpi_level_editing', 'cpi_level_index', 'cpi_level_light',
  'mouse_keys', 'mouse_key_labels', 'setting_mapping_keys', 'select_key_name',
  'key_record_panel_id', 'onboard_config_index', 'onboard_index',
  'onboard_configs', 'onboard_status', 'onboard_keys',
  'mouse_functions', 'mouse_function_descs', 'macro_trigger_types',
  'macro_counts', 'macro_trigger_type_index', 'edit_macros',
  'current_edit_macro', 'macro_edit_panel_id', 'macro_record_panel_id',
  'macro_edit_index', 'macro_keep_time_min', 'combination_key_index',
  'setting_mapping_key_recording', 'setting_mapping_keys_recorded',
  'setting_macro_edit_recording', 'setting_macro_edit_recording_time',
  'wireless_optimizing', 'resize_timer_id', 'remote_buf_free_size',
  'NOTIFY_DATA_BUF_SIZE', 'key_pos', 'NUMBERS', 'need_save', 'window_focused',
  'theme_color', 'kbd_key_infos', 'kbd_key_matrix_index', 'kbd_key_setting_index',
  'kbd_layer_id', 'kbd_select_keyId', 'kbd_light_mode', 'kbd_sleep_time',
  'kbd_axis_infos', 'kbd_edit_info', 'kbd_select_elementId',
  'kbd_socd_infos', 'kbd_mt_infos', 'kbd_rs_infos', 'kbd_dks_infos',
  'kbd_dks_dragging_name', 'kbd_dks_dragging', 'kbd_dks_dragging_up',
  'kbd_dks_Start_x', 'kbd_matrix_select_keys', 'select_key_panel_id',
  'kbd_key_num', 'kbd_keys', 'kbd_macro_infos', 'kbd_macro_select_index',
];

const TARGETS = [
  'ui/ui-keyboard.js',
  'ui/ui-mapping.js',
  'ui/ui-settings.js',
];

let total = 0;

for (const relPath of TARGETS) {
  const fullPath = resolve(LIB_DIR, relPath);
  let source = readFileSync(fullPath, 'utf-8');
  let changed = false;

  for (const varName of S_VARS) {
    // Process non-import lines only
    const lines = source.split('\n');
    let lineChanged = false;
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.trim().startsWith('import ')) continue;

      // Skip if this is a variable declaration (var/let/const name)
      if (new RegExp('^[^/]*\\b(?:var|let|const)\\s+' + varName + '\\b').test(line)) continue;

      const pattern = new RegExp('(?<!\\.)\\b' + varName + '\\b(?!\\s*:)', 'g');
      if (!pattern.test(line)) continue;

      const newLine = line.replace(pattern, 'S.' + varName);
      if (newLine !== line) {
        lines[i] = newLine;
        lineChanged = true;
      }
    }
    if (lineChanged) {
      source = lines.join('\n');
      changed = true;
    }
  }

  if (changed) {
    writeFileSync(fullPath, source, 'utf-8');
    console.log(`✓ ${relPath}`);
  }
}

console.log(`\n${total} total fix(es) applied.`);
