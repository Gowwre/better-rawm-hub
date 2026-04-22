/**
 * Library Analysis Script
 * Parses library.formatted.js to extract protocol constants, data structures,
 * and key functions for reverse-engineering the RAWM HID protocol.
 */
const fs = require('fs');
const path = require('path');

const libPath = path.join(__dirname, 'public', 'lib', 'library.formatted.js');
const src = fs.readFileSync(libPath, 'utf-8');

function extractMatches(regex, label) {
  const matches = new Set();
  let m;
  while ((m = regex.exec(src)) !== null) {
    matches.add(m[1] || m[0]);
  }
  return Array.from(matches).sort();
}

// 1. Protocol constants
const iqConstants = extractMatches(/\b(IQ_[A-Z_0-9]+)\b/g, 'IQ');
const cmdConstants = extractMatches(/\b(CMD_[A-Z_0-9]+)\b/g, 'CMD');
const packetConstants = extractMatches(/\b(PACKET_[A-Z_0-9]+)\b/g, 'PACKET');
const configConstants = extractMatches(/\b(CONFIG_[A-Z_0-9]+)\b/g, 'CONFIG');
const actionConstants = extractMatches(/\b(ACTION_[A-Z_0-9]+)\b/g, 'ACTION');
const notifyConstants = extractMatches(/\b(NOTIFY_[A-Z_0-9]+)\b/g, 'NOTIFY');
const esbConstants = extractMatches(/\b(ESB_[A-Z_0-9]+)\b/g, 'ESB');
const wmConstants = extractMatches(/\b(WM_[A-Z_0-9]+)\b/g, 'WM');
const kbdConstants = extractMatches(/\b(KBD_[A-Z_0-9_]+)\b/g, 'KBD');
const keyConstants = extractMatches(/\b(KEY_[A-Z_0-9_]+)\b/g, 'KEY');

// 2. Global variables
const globals = extractMatches(/\b(usb_client_list|current_usb_client|refresh_client_list|kbd_[a-z_]+|setting_[a-z_]+|theme_color|RESOURCE_URL|MAXIMUM_PACKET_SIZE|HS_MAXIMUM_PACKET_SIZE|SYNC_TIMEOUT_MS|SYNC_DATA|SYNC_BY_CMD_SYNC|OS_PC|NRF_ESB_MAX_PAYLOAD_LENGTH|PACKET_SIZE_MASK|PACKET_TYPE_[A-Z_]+|remote_buf_free_size|macroBuff|edit_macros|NUMBERS|iq_[a-z_]+)\b/g, 'globals');

// 3. Function declarations (readable ones)
const functions = extractMatches(/function\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g, 'functions');
const hsFunctions = functions.filter(f => f.startsWith('hs_'));
const uiFunctions = functions.filter(f => f.startsWith('ui_'));
const kbdFunctions = functions.filter(f => f.startsWith('kbd_'));
const pcFunctions = functions.filter(f => f.startsWith('pc_'));
const createFunctions = functions.filter(f => f.startsWith('create_') || f.startsWith('kbd_create_'));
const getFunctions = functions.filter(f => f.startsWith('get_'));
const setFunctions = functions.filter(f => f.startsWith('set_'));

// 4. jQuery selectors / layui usage
const jQuerySelectors = extractMatches(/\$\(['"]([^'"]+)['"]\)/g, 'jQuery');
const layuiProps = extractMatches(/layui\['([^']+)'\]/g, 'layui');
const layuiDotProps = extractMatches(/layui\.([a-zA-Z_][a-zA-Z0-9_]*)/g, 'layui-dot');

// Build report
const report = [];
report.push('# RAWM Library Analysis Report');
report.push(`Generated: ${new Date().toISOString()}`);
report.push(`Source: ${libPath} (${(src.length / 1024).toFixed(1)} KB)`);
report.push('');

report.push('## 1. Protocol Constants');
report.push('');
report.push('### IQ_* Commands (Device Query/Response)');
report.push('```');
iqConstants.forEach(c => report.push(c));
report.push('```');
report.push('');

report.push('### CMD_* Commands');
report.push('```');
cmdConstants.forEach(c => report.push(c));
report.push('```');
report.push('');

report.push('### PACKET_* Constants');
report.push('```');
packetConstants.forEach(c => report.push(c));
report.push('```');
report.push('');

report.push('### CONFIG_* Constants');
report.push('```');
configConstants.forEach(c => report.push(c));
report.push('```');
report.push('');

report.push('### ACTION_* Constants (UI postMessage actions)');
report.push('```');
actionConstants.forEach(c => report.push(c));
report.push('```');
report.push('');

report.push('### NOTIFY_* Constants');
report.push('```');
notifyConstants.forEach(c => report.push(c));
report.push('```');
report.push('');

report.push('### ESB_* Constants (Wireless protocol)');
report.push('```');
esbConstants.forEach(c => report.push(c));
report.push('```');
report.push('');

report.push('### WM_* Constants (Windows message constants)');
report.push('```');
wmConstants.forEach(c => report.push(c));
report.push('```');
report.push('');

report.push('### KBD_* Constants');
report.push('```');
kbdConstants.forEach(c => report.push(c));
report.push('```');
report.push('');

report.push('### KEY_* Constants');
report.push('```');
keyConstants.forEach(c => report.push(c));
report.push('```');
report.push('');

report.push('## 2. Core HID Functions (hs_*)');
report.push('```');
hsFunctions.forEach(f => report.push(f));
report.push('```');
report.push('');

report.push('## 3. UI Functions (ui_*)');
report.push('```');
uiFunctions.forEach(f => report.push(f));
report.push('```');
report.push('');

report.push('## 4. Keyboard Functions (kbd_*)');
report.push('```');
kbdFunctions.forEach(f => report.push(f));
report.push('```');
report.push('');

report.push('## 5. Data Structure Creators');
report.push('```');
createFunctions.forEach(f => report.push(f));
report.push('```');
report.push('');

report.push('## 6. Getter Functions');
report.push('```');
getFunctions.forEach(f => report.push(f));
report.push('```');
report.push('');

report.push('## 7. Setter Functions');
report.push('```');
setFunctions.forEach(f => report.push(f));
report.push('```');
report.push('');

report.push('## 8. Key Global Variables');
report.push('```');
globals.forEach(g => report.push(g));
report.push('```');
report.push('');

report.push('## 9. jQuery Selectors');
report.push('```');
jQuerySelectors.slice(0, 100).forEach(s => report.push(s));
report.push(`... and ${jQuerySelectors.length - 100} more`);
report.push('```');
report.push('');

report.push('## 10. layui Properties');
report.push('```');
[...layuiProps, ...layuiDotProps].sort().forEach(p => report.push(p));
report.push('```');
report.push('');

// Write report
const outPath = path.join(__dirname, 'LIBRARY_ANALYSIS.md');
fs.writeFileSync(outPath, report.join('\n'));
console.log(`Analysis written to ${outPath}`);
console.log(`  IQ constants: ${iqConstants.length}`);
console.log(`  CMD constants: ${cmdConstants.length}`);
console.log(`  PACKET constants: ${packetConstants.length}`);
console.log(`  ACTION constants: ${actionConstants.length}`);
console.log(`  hs_* functions: ${hsFunctions.length}`);
console.log(`  ui_* functions: ${uiFunctions.length}`);
console.log(`  kbd_* functions: ${kbdFunctions.length}`);
console.log(`  create_* functions: ${createFunctions.length}`);
console.log(`  Global vars: ${globals.length}`);
console.log(`  jQuery selectors: ${jQuerySelectors.length}`);
console.log(`  layui props: ${layuiProps.length + layuiDotProps.length}`);
