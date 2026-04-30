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
  'data/key-database.js',
  'state/key-lookup.js',
  'state/device-store.js',
  'state/kbd-structures.js',
  'protocol/buffer.js',
  'protocol/hid-transport.js',
  'protocol/hs-parser.js',
  'protocol/hid-parser.js',
  'protocol/binary-reader.js',
  'protocol/key-config-parser.js',
  'protocol/hs-protocol.js',
  'protocol/hid-protocol.js',
  'data/device-database.js',
  'protocol/http-data-model.js',
  'protocol/parse-cmd-ui.js',
  'ui/ui-clients.js',
  'ui/ui-helpers.js',
  'ui/ui-settings.js',
  'ui/ui-mapping.js',
  'lib/utilities.js',
  'ui/event-dispatch.js',
  'ui/ui-keyboard.js',
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
