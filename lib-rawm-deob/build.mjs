// ===== BUILD SCRIPT ===========================================================
// Concatenates all lib-rawm-deob modules in dependency order and bundles them
// into a single file using esbuild.
//
// Usage: node build.mjs
// Output: dist/bundle.js
// ============================================================================

import esbuild from 'esbuild';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Dependency order (must match hub-deob.html script tag order)
const FILES = [
  'data/constants.js',
  '01-obfuscation.js',
  'data/key-database.js',
  '02-key-system.js',
  'state/device-store.js',
  '04-kbd-structures.js',
  'protocol/buffer.js',
  'protocol/hid-transport.js',
  'protocol/hs-parser.js',
  'protocol/hid-parser.js',
  'protocol/binary-reader.js',
  'protocol/key-config-parser.js',
  '05-hs-protocol.js',
  '06-hid-protocol.js',
  'data/device-database.js',
  '07-http-data-model.js',
  '08-parse-cmd-ui.js',
  '09-ui-clients.js',
  'ui/ui-helpers.js',
  '10-ui-settings.js',
  '11-ui-mapping.js',
  '12-utilities.js',
  '13-event-dispatch.js',
  '14-ui-keyboard.js',
];

// Read and concatenate all files
function concatFiles() {
  var parts = [];
  for (var i = 0; i < FILES.length; i++) {
    var filepath = resolve(__dirname, FILES[i]);
    parts.push('// ===== ' + FILES[i] + ' ====================================================');
    parts.push(readFileSync(filepath, 'utf-8'));
    parts.push('');
  }
  return parts.join('\n');
}

// Ensure dist/ directory exists
var distDir = resolve(__dirname, 'dist');
if (!existsSync(distDir)) {
  mkdirSync(distDir);
}

// Write unminified bundle
var bundle = concatFiles();
var outfile = resolve(distDir, 'bundle.js');
writeFileSync(outfile, bundle, 'utf-8');
console.log('Wrote ' + outfile);

// Minify with esbuild
esbuild.buildSync({
  stdin: {
    contents: bundle,
    sourcefile: 'bundle.js',
  },
  outfile: resolve(distDir, 'bundle.min.js'),
  minify: true,
  format: 'iife',
  globalName: 'RAWMHub',
});
console.log('Wrote ' + resolve(distDir, 'bundle.min.js'));
