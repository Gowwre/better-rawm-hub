// ===== BARE STATE REFERENCE CHECKER ========================================
// Scans all source files for bare identifiers matching __S/__DS variable keys.
// These cause ReferenceErrors at runtime because esbuild treats them as globals.
// Run with: node scripts/check-bare-state-refs.mjs
// ============================================================================

import { readFileSync, readdirSync, statSync } from 'fs';
import { resolve, dirname, relative } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// ===== STATE KEYS ============================================================
// Extracted from parse-cmd-ui.js __S and device-store.js __DS definitions.

const S_VARS = new Set([
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
]);

const DS_VARS = new Set([
  'upload_mouse_config_timer', 'mouse_config_timer', 'current_usb_client',
]);

// Map: variable name → correct prefix to use
const VAR_PREFIX = new Map();
for (const v of S_VARS) VAR_PREFIX.set(v, 'S.');
for (const v of DS_VARS) VAR_PREFIX.set(v, 'DS.');

const ALL_VARS = new Set([...S_VARS, ...DS_VARS]);

// Files excluded from checking (owning module or known patterns)
const OWNER_FILES = new Map();
for (const v of S_VARS) OWNER_FILES.set(v, 'protocol/parse-cmd-ui.js');
for (const v of DS_VARS) OWNER_FILES.set(v, 'state/device-store.js');

// Strip source to avoid false positives from strings, comments, regex
function stripNonCode(source) {
  let s = source;
  s = s.replace(/\/\/.*$/gm, '');
  s = s.replace(/\/\*[\s\S]*?\*\//g, '');
  s = s.replace(/`[^`]*`/g, '``');
  s = s.replace(/'[^']*'/g, "''");
  s = s.replace(/"[^"]*"/g, '""');
  // Regex literals NOT stripped — see check-imports.mjs for reasoning.
  return s;
}

// Collect all source files
function collectFiles(dir) {
  const files = [];
  const entries = readdirSync(dir);
  for (const entry of entries) {
    if (entry === 'node_modules' || entry === 'dist' || entry === 'scripts' || entry.startsWith('.')) continue;
    const full = resolve(dir, entry);
    if (statSync(full).isDirectory()) {
      files.push(...collectFiles(full));
    } else if (entry.endsWith('.js')) {
      files.push(full);
    }
  }
  return files;
}

const files = collectFiles(ROOT);
let totalIssues = 0;

for (const file of files) {
  const relPath = relative(ROOT, file).replace(/\\/g, '/');
  const source = readFileSync(file, 'utf-8');
  const clean = stripNonCode(source);
  const lines = clean.split('\n');
  const rawLines = source.split('\n');

  // Get names this file imports directly (those are OK to use bare)
  const imported = new Set();
  const importRe = /import\s+\{([^}]+)\}\s+from/g;
  let m;
  while ((m = importRe.exec(source)) !== null) {
    m[1].split(',').forEach(n => imported.add(n.trim().replace(/\s+as\s+\w+$/, '')));
  }

  const fileIssues = [];

  for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
    const line = lines[lineIdx];
    const rawLine = rawLines[lineIdx];

    // Skip import lines, comment-only lines
    const trimmed = line.trim();
    if (trimmed.startsWith('import ') || trimmed.startsWith('export ') ||
        trimmed.startsWith('//') || trimmed.startsWith('*') || trimmed === '') continue;

    for (const varName of ALL_VARS) {
      // Build regex for bare identifier (word boundaries)
      const pattern = new RegExp('\\b' + varName + '\\b');
      if (!pattern.test(line)) continue;

      // Skip if this file imports the variable directly (named import is valid)
      if (imported.has(varName)) continue;

      // Skip if this is a var/let/const declaration (local variable, not shared state)
      if (new RegExp('^[^/]*\\b(?:var|let|const)\\s+' + varName + '\\b').test(line)) continue;

      // Skip if already correctly prefixed in this line
      const prefix = VAR_PREFIX.get(varName);
      if (line.includes(prefix + varName)) continue;
      if (line.includes('__S.' + varName)) continue;
      if (line.includes('__DS.' + varName)) continue;

      // Find each match position and verify it's a bare identifier
      let match;
      const re = new RegExp('\\b' + varName + '\\b', 'g');
      while ((match = re.exec(line)) !== null) {
        const idx = match.index;

        // Skip if preceded by a dot (property access like obj.varname)
        if (idx > 0 && line[idx - 1] === '.') continue;

        // Skip if followed by colon (object key: like `varName: value`)
        const afterMatch = line.substring(idx + varName.length).trim();
        if (afterMatch.startsWith(':')) continue;

        // Skip if it's inside a string (should already be stripped, but double-check)
        const beforePart = line.substring(0, idx);
        const quotePairs = (beforePart.match(/''/g) || []).length;
        if (quotePairs % 2 !== 0) continue;

        // Skip if it's the owning file (uses __S. or __DS. prefix internally)
        const owner = OWNER_FILES.get(varName);
        if (owner && relPath === owner) continue;
        // Also skip parse-cmd-ui.js: it defines __S and uses __S. prefix
        if (relPath === 'protocol/parse-cmd-ui.js') continue;
        if (relPath === 'state/device-store.js') continue;

        // This is a bare reference — flag it
        fileIssues.push(`  Line ${lineIdx + 1}: ${varName} → should be ${prefix}${varName}`);
        break; // one issue per variable per line
      }
    }
  }

  if (fileIssues.length > 0) {
    totalIssues += fileIssues.length;
    console.log(`\n\x1b[33m${relPath}\x1b[0m — ${fileIssues.length} bare state reference(s):`);
    fileIssues.forEach(i => console.log(i));
  }
}

console.log(`\n${totalIssues === 0
  ? '\x1b[32m✓ No bare state references found\x1b[0m'
  : `\x1b[31m✗ ${totalIssues} bare state reference(s) found — must use S. or DS. prefix\x1b[0m`}`);
process.exit(totalIssues > 0 ? 1 : 0);
