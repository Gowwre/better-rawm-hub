// ===== FIX BARE REFERENCES TO __S VARIABLES ==================================
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
  'NOTIFY_DATA_BUF_SIZE', 'need_save', 'window_focused',
  'kbd_key_infos', 'kbd_key_matrix_index', 'kbd_key_setting_index',
  'kbd_layer_id', 'kbd_select_keyId', 'kbd_light_mode', 'kbd_sleep_time',
  'kbd_axis_infos', 'kbd_edit_info', 'kbd_select_elementId',
  'kbd_socd_infos', 'kbd_mt_infos', 'kbd_rs_infos', 'kbd_dks_infos',
  'kbd_dks_dragging_name', 'kbd_dks_dragging', 'kbd_dks_dragging_up',
  'kbd_dks_Start_x', 'kbd_matrix_select_keys', 'select_key_panel_id',
  'kbd_key_num', 'kbd_keys', 'kbd_macro_infos', 'kbd_macro_select_index',
  'key_pos', 'NUMBERS', 'theme_color',
];

const FILES = [
  'protocol/parse-cmd-ui.js',
  'ui/ui-helpers.js', 'ui/ui-clients.js', 'ui/ui-settings.js',
  'ui/ui-mapping.js', 'ui/ui-keyboard.js', 'ui/event-dispatch.js',
  'lib/utilities.js', 'state/key-lookup.js',
  'protocol/parse-cmd-ui.js', 'protocol/parse-cmd-ui.js',
  'protocol/hid-parser.js', 'protocol/hid-transport.js',
  'protocol/http-data-model.js',
];

let totalFixes = 0;

for (const relPath of [...new Set(FILES)]) {
  const fullPath = resolve(LIB_DIR, relPath);
  let source = readFileSync(fullPath, 'utf-8');
  const lines = source.split('\n');
  let changed = false;

  const prefix = relPath === 'protocol/parse-cmd-ui.js' ? '__S.' : 'S.';

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    const trimmed = line.trim();
    if (trimmed.startsWith('import ') || trimmed.startsWith('//') || trimmed.startsWith('*')) continue;

    for (const varName of S_VARS) {
      const barePattern = new RegExp('(?<!\\.)' + varName + '(?!\\s*:)');
      if (!barePattern.test(line)) continue;
      if (line.includes(prefix + varName)) continue;
      if (line.includes('__S.' + varName)) continue;
      if (line.includes("'" + varName + "'") || line.includes('"' + varName + '"')) continue;

      const idx = line.search(barePattern);
      if (idx < 0) continue;
      const before = line.substring(0, idx);
      if (before.endsWith('.')) continue;

      lines[i] = line.replace(barePattern, prefix + varName);
      changed = true;
      totalFixes++;
    }
  }

  if (changed) {
    writeFileSync(fullPath, lines.join('\n'), 'utf-8');
    console.log(`✓ ${relPath}`);
  }
}

console.log(`\n${totalFixes} fix(es) applied.`);
