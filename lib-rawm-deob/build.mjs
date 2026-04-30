// ===== BUILD SCRIPT ===========================================================
// Bundles all ESM modules into a single IIFE using esbuild.
// Runs static analysis checks after building.
//
// Usage: node build.mjs
// Output: dist/bundle.js (unminified)
//         dist/bundle.min.js (minified)
// ============================================================================

import esbuild from 'esbuild';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { spawnSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));

const ENTRY_POINT = resolve(__dirname, 'src/index.js');
const DIST_DIR = resolve(__dirname, 'dist');

async function build() {
  // Unminified bundle
  await esbuild.build({
    entryPoints: [ENTRY_POINT],
    bundle: true,
    format: 'iife',
    globalName: 'RAWMHub',
    outfile: resolve(DIST_DIR, 'bundle.js'),
    minify: false,
  });
  console.log('Wrote ' + resolve(DIST_DIR, 'bundle.js'));

  // Minified bundle
  await esbuild.build({
    entryPoints: [ENTRY_POINT],
    bundle: true,
    format: 'iife',
    globalName: 'RAWMHub',
    outfile: resolve(DIST_DIR, 'bundle.min.js'),
    minify: true,
  });
  console.log('Wrote ' + resolve(DIST_DIR, 'bundle.min.js'));
}

function runCheck(script) {
  const result = spawnSync('node', [script], {
    cwd: __dirname,
    stdio: 'inherit',
    shell: true,
  });
  if (result.status !== 0) {
    console.error(`\n❌ Check failed: ${script}`);
    process.exit(result.status);
  }
}

build().then(() => {
  console.log('\n=== Running static analysis checks ===\n');
  runCheck('scripts/check-imports.mjs');
  runCheck('scripts/check-bare-state-refs.mjs');
  console.log('\n✅ All checks passed');
}).catch(err => {
  console.error(err);
  process.exit(1);
});
