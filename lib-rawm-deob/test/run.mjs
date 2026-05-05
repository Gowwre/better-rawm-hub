// ===== Test Runner ==============================================================
// A thin script that loads source modules via single-string concatenation eval
// and runs test suites. Zero dependencies — uses Node built-in assert only.
//
// Why single-string eval: Source modules use `const`, `class`, and `var` at
// top level. Indirect eval of separate files would scope `const`/`class` to
// each eval, making them invisible to subsequent evals. By concatenating all
// deps + test code into one eval string, all declarations are in the same
// scope and visible to each other — exactly like the concatenation build.
//
// Usage:
//   node test/run.mjs               ← runs all test files
//   node test/run.mjs --watch       ← watches for changes, re-runs
//   node test/run.mjs --list        ← lists available test suites
//   node test/run.mjs --only const  ← runs only matching test(s)
//
// Each test file assigns test functions to globalThis.__SUITE__:
//   __SUITE__ = {
//     name: 'my-suite',
//     'test description'() {
//       if (actual !== expected) throw new Error('...');
//     },
//   };
// Functions throw on failure. Runner reports pass/fail per test.
// ===============================================================================

import { readFileSync, readdirSync, watch } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { setupMocks, clearState } from './lib/mocks.mjs';

var __dirname = dirname(fileURLToPath(import.meta.url));
var ROOT = resolve(__dirname, '..');

// Dependency order for each test suite (mirrors build.mjs FILES array)
var DEPS = {
  'constants.test.js': [
    'data/constants.js',
  ],
  'key-database.test.js': [
    'data/constants.js',
    'data/key-database.js',
    'state/key-lookup.js',
  ],
  'device-database.test.js': [
    'data/constants.js',
    'data/device-database.js',
  ],
  'buffer.test.js': [
    'data/constants.js',
    'protocol/buffer.js',
  ],
  'binary-reader.test.js': [
    'data/constants.js',
    'protocol/binary-reader.js',
  ],
  'crc.test.js': [
    'data/constants.js',
    'protocol/hid-transport.js',
  ],
  'key-config-parser.test.js': [
    'data/constants.js',
    'data/key-database.js',
    'state/key-lookup.js',
    'state/device-store.js',
    'state/kbd-structures.js',
    'protocol/buffer.js',
    'protocol/binary-reader.js',
    'protocol/key-config-parser.js',
  ],
  'device-store.test.js': [
    'data/constants.js',
    'data/device-database.js',
    'state/device-store.js',
  ],
};

// ===== Discovery ===============================================================

function discoverTests() {
  var testDir = resolve(__dirname);
  return readdirSync(testDir).filter(function (f) { return f.endsWith('.test.js'); }).sort();
}

// ===== Suite Runner ============================================================

function runSuite(testFile) {
  var testPath = resolve(__dirname, testFile);
  var deps = DEPS[testFile];

  if (!deps) {
    console.error('  SKIP  (unknown dependencies for ' + testFile + ')');
    return { passed: 0, failed: 0, skipped: 1, tests: 0 };
  }

  // Setup mocks before loading source modules
  setupMocks();

  // Concatenate all dependencies + test code into a single eval string.
  // Within this one eval, `const`, `class`, `var`, and `function` declarations
  // are all in the same scope and visible to each other.
  try {
    var fullCode = '';

    // Insert mock overrides before source modules
    fullCode += 'globalThis.__SUITE__ = null;\n';

    // Append each dependency
    for (var i = 0; i < deps.length; i++) {
      var filepath = resolve(ROOT, deps[i]);
      fullCode += readFileSync(filepath, 'utf-8') + '\n';
    }

    // Append the test file
    fullCode += '\n' + readFileSync(testPath, 'utf-8') + '\n';

    // Single eval — all declarations are in-scope
    (0, eval)(fullCode);
  } catch (e) {
    console.error('  FAIL  eval load: ' + testFile + ' — ' + e.message);
    clearState();
    return { passed: 0, failed: 0, skipped: 1, tests: 0 };
  }

  var suite = globalThis.__SUITE__;
  if (!suite || !suite.name) {
    console.error('  FAIL  no __SUITE__ from ' + testFile);
    clearState();
    return { passed: 0, failed: 0, skipped: 1, tests: 0 };
  }

  var results = { passed: 0, failed: 0, skipped: 0, tests: 0 };
  var testNames = Object.keys(suite).filter(function (k) { return k !== 'name'; });
  results.tests = testNames.length;

  for (var n = 0; n < testNames.length; n++) {
    var testName = testNames[n];
    try {
      suite[testName]();
      results.passed++;
    } catch (e) {
      console.error('  FAIL  ' + suite.name + ' > ' + testName + ' — ' + e.message);
      results.failed++;
    }
  }

  if (results.passed === results.tests) {
    console.log('  PASS  ' + suite.name + ' (' + results.passed + '/' + results.tests + ')');
  } else {
    console.log('  FAIL  ' + suite.name + ' (' + results.passed + '/' + results.tests + ' failed=' + results.failed + ')');
  }

  clearState();
  return results;
}

// ===== Main ====================================================================

function main() {
  var args = process.argv.slice(2);
  var watchMode = args.indexOf('--watch') >= 0;
  var listMode = args.indexOf('--list') >= 0;
  var onlyIdx = args.indexOf('--only');
  var onlyFilter = onlyIdx >= 0 ? args[onlyIdx + 1] : null;

  var testFiles = discoverTests();

  if (listMode) {
    console.log('Available test suites:');
    for (var i = 0; i < testFiles.length; i++) {
      console.log('  ' + testFiles[i].replace('.test.js', ''));
    }
    return;
  }

  function runAll() {
    var toRun = testFiles;
    if (onlyFilter) {
      toRun = testFiles.filter(function (f) { return f.indexOf(onlyFilter) >= 0; });
    }

    console.log('');
    var totals = { passed: 0, failed: 0, skipped: 0, tests: 0 };

    for (var i = 0; i < toRun.length; i++) {
      console.log('Test: ' + toRun[i].replace('.test.js', ''));
      var r = runSuite(toRun[i]);
      totals.passed += r.passed;
      totals.failed += r.failed;
      totals.skipped += r.skipped;
      totals.tests += r.tests;
      console.log('');
    }

    console.log('Results: ' + totals.passed + ' passed, ' + totals.failed + ' failed, ' + totals.skipped + ' skipped (' + totals.tests + ' total)');
    console.log('');

    if (totals.failed > 0) {
      process.exit(1);
    }
  }

  runAll();

  if (watchMode) {
    var watching = [
      resolve(__dirname),
      resolve(__dirname, '..', 'data'),
      resolve(__dirname, '..', 'state'),
      resolve(__dirname, '..', 'protocol'),
    ];
    console.log('Watching for changes...');

    var debounceTimer = null;
    function debouncedRun() {
      if (debounceTimer) clearTimeout(debounceTimer);
      debounceTimer = setTimeout(function () {
        debounceTimer = null;
        runAll();
      }, 300);
    }

    for (var w = 0; w < watching.length; w++) {
      watch(watching[w], { recursive: true }, debouncedRun);
    }
  }
}

main();
