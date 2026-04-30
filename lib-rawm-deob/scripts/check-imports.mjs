// ===== IMPORT VERIFICATION SCRIPT ============================================
// Scans all source files for cross-module references that lack imports.
// Run with: node scripts/check-imports.mjs
// ============================================================================

import { readFileSync, readdirSync, statSync } from 'fs';
import { resolve, dirname, relative, sep } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// Known globals: browser APIs, JS built-ins, layui/jQuery
const GLOBALS = new Set([
  // JS built-ins
  'Object', 'Array', 'String', 'Number', 'Boolean', 'Date', 'RegExp', 'Math',
  'JSON', 'Map', 'Set', 'WeakMap', 'WeakSet', 'Promise', 'Symbol', 'Error',
  'TypeError', 'ReferenceError', 'RangeError', 'SyntaxError', 'URIError',
  'parseInt', 'parseFloat', 'isNaN', 'isFinite', 'decodeURI', 'encodeURI',
  'decodeURIComponent', 'encodeURIComponent', 'Infinity', 'NaN', 'undefined',
  'null', 'true', 'false', 'this', 'arguments',
  // Browser globals
  'window', 'document', 'navigator', 'console', 'location', 'history',
  'localStorage', 'sessionStorage', 'fetch', 'crypto', 'performance',
  'setTimeout', 'clearTimeout', 'setInterval', 'clearInterval', 'setImmediate',
  'requestAnimationFrame', 'cancelAnimationFrame',
  'XMLHttpRequest', 'TextEncoder', 'TextDecoder', 'FormData', 'Blob', 'File',
  'FileReader', 'URL', 'URLSearchParams', 'AbortController', 'AbortSignal',
  'Int8Array', 'Uint8Array', 'Uint8ClampedArray', 'Int16Array', 'Uint16Array',
  'Int32Array', 'Uint32Array', 'Float32Array', 'Float64Array', 'ArrayBuffer',
  'DataView', 'BigInt64Array', 'BigUint64Array', 'BigInt', 'BigNumber',
  'atob', 'btoa', 'structuredClone', 'globalThis',
  // Application globals (provided by layui/jQuery at runtime)
  'layui', 'jQuery', '$',
  // Event handlers
  'onChange', 'onClick', 'onSubmit',
  // Common false positives (property access patterns)
  'keys', 'length', 'name', 'prototype', 'call', 'apply', 'bind',
  'slice', 'splice', 'push', 'pop', 'shift', 'unshift', 'concat',
  'indexOf', 'lastIndexOf', 'includes', 'forEach', 'map', 'filter',
  'reduce', 'find', 'findIndex', 'some', 'every', 'flat', 'flatMap',
  'toString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf',
  'substr', 'substring', 'charAt', 'charCodeAt', 'toLowerCase',
  'toUpperCase', 'trim', 'replace', 'split', 'match', 'search',
]);

// Known false positives — names that look like identifiers but aren't
// (property access patterns like `.foo()`, string content, etc.)
const SKIP_PREFIXES = ['__'];

// Collect all .js files recursively
function collectFiles(dir) {
  const files = [];
  const entries = readdirSync(dir);
  for (const entry of entries) {
    if (entry === 'node_modules' || entry === 'dist' || entry.startsWith('.')) continue;
    const full = resolve(dir, entry);
    if (statSync(full).isDirectory()) {
      files.push(...collectFiles(full));
    } else if (entry.endsWith('.js') && entry !== 'build.mjs' && !entry.includes('.test.')) {
      files.push(full);
    }
  }
  return files;
}

// Build module name from file path (relative to ROOT, with forward slashes)
function moduleName(filePath) {
  return relative(ROOT, filePath).replace(/\\/g, '/');
}

// Extract imports from source
function extractImports(source) {
  const imports = [];
  const importPattern = /import\s+\{([^}]+)\}\s+from\s+['"]\.\.?[^'"]+['"]/g;
  let match;
  while ((match = importPattern.exec(source)) !== null) {
    match[1].split(',').forEach(name => {
      name = name.trim().replace(/\s+as\s+\w+$/, '');
      if (name) imports.push(name);
    });
  }
  return imports;
}

// Extract exports from source
function extractExports(source) {
  const exports = new Set();
  // export function name(...
  let pattern = /^export\s+(?:async\s+)?function\s+(\w+)/gm;
  let match;
  while ((match = pattern.exec(source)) !== null) exports.add(match[1]);
  // export const|let|var name
  pattern = /^export\s+(?:const|let|var)\s+(\w+)/gm;
  while ((match = pattern.exec(source)) !== null) exports.add(match[1]);
  // export class Name
  pattern = /^export\s+class\s+(\w+)/gm;
  while ((match = pattern.exec(source)) !== null) exports.add(match[1]);
  // export { name }
  pattern = /^export\s+\{\s*([^}]+)\s*\}/gm;
  while ((match = pattern.exec(source)) !== null) {
    match[1].split(',').forEach(name => {
      name = name.trim().replace(/\s+as\s+\w+$/, '');
      if (name) exports.add(name);
    });
  }
  return exports;
}

// Extract locally defined names (function names, var/let/const, inner function params)
function extractLocals(source) {
  const locals = new Set();
  // function name(...
  let pattern = /(?:^|\n)\s*(?:export\s+)?(?:async\s+)?function\s+(\w+)/g;
  let match;
  while ((match = pattern.exec(source)) !== null) locals.add(match[1]);
  // const|let|var name =  or const|let|var name;
  pattern = /(?:^|\n)\s*(?:export\s+)?(?:const|let|var)\s+(\w+)/g;
  while ((match = pattern.exec(source)) !== null) locals.add(match[1]);
  // class Name
  pattern = /(?:^|\n)\s*(?:export\s+)?class\s+(\w+)/g;
  while ((match = pattern.exec(source)) !== null) locals.add(match[1]);
  // for (var/let/const name
  pattern = /for\s*\(\s*(?:var|let|const)\s+(\w+)/g;
  while ((match = pattern.exec(source)) !== null) locals.add(match[1]);
  // catch (name)
  pattern = /catch\s*\(\s*(\w+)\s*\)/g;
  while ((match = pattern.exec(source)) !== null) locals.add(match[1]);
  return locals;
}

// Remove strings, comments, and regex patterns from source to avoid false positives
function stripNonCode(source) {
  // Remove single-line comments
  let s = source.replace(/\/\/.*$/gm, '');
  // Remove multi-line comments
  s = s.replace(/\/\*[\s\S]*?\*\//g, '');
  // Remove template literals
  s = s.replace(/`[^`]*`/g, '``');
  // Remove strings (double and single quoted)
  s = s.replace(/'[^']*'/g, "''");
  s = s.replace(/"[^"]*"/g, '""');
  // Regex literals NOT stripped — the approximate pattern was too aggressive,
  // treating division operators (e.g. `/ 0x3c`) as regex starts and eating
  // hundreds of lines looking for a closing slash. This caused false negatives
  // in the import checker (e.g. SLEEP_MAX_SEC being silently removed).
  // Accept the small number of false positives from regex patterns instead.
  return s;
}

// Check if a name only appears as `prefix.name` (property access) in the source
function isOnlyPropertyAccess(source, name, prefix) {
  const prefixPattern = new RegExp('\\b' + prefix + '\\.' + name + '\\b', 'g');
  const barePattern = new RegExp('\\b' + name + '\\b', 'g');
  const bareCount = (source.match(barePattern) || []).length;
  const prefixedCount = (source.match(prefixPattern) || []).length;
  return bareCount > 0 && bareCount === prefixedCount;
}

// Check if a name only appears as an object key (`name:` pattern) in the source
function isOnlyObjectKey(source, name) {
  const bare = new RegExp('\\b' + name + '\\b', 'g');
  const colon = new RegExp('\\b' + name + '\\s*:', 'g');
  let bareCount = 0, colonCount = 0;
  let m;
  while ((m = bare.exec(source)) !== null) bareCount++;
  while ((m = colon.exec(source)) !== null) colonCount++;
  return bareCount === colonCount;
}

// Extract all identifier-like names from stripped source
function extractUsedNames(source) {
  const names = new Set();
  const cleaned = stripNonCode(source);
  // Match word boundaries for identifiers
  const pattern = /\b([a-zA-Z_$][\w$]*)\b/g;
  let match;
  while ((match = pattern.exec(cleaned)) !== null) {
    const name = match[1];
    // Skip single-letter names (loop counters, etc.)
    if (name.length <= 1 && name !== '_') continue;
    // Skip hex/octal numbers disguised as identifiers
    if (/^[0-9]/.test(name)) continue;
    names.add(name);
  }
  return names;
}

// --- Main ---
const files = collectFiles(ROOT);

// Phase 1: Build export map (file → Set of exported names)
const exportMap = new Map();
for (const file of files) {
  const source = readFileSync(file, 'utf-8');
  const name = moduleName(file);
  exportMap.set(name, extractExports(source));
}

// Phase 2: Build reverse export map (name → Set of files that export it)
const nameToFiles = new Map();
for (const [file, exports] of exportMap) {
  for (const name of exports) {
    if (!nameToFiles.has(name)) nameToFiles.set(name, []);
    nameToFiles.get(name).push(file);
  }
}

// Phase 3: Analyze each file
let totalIssues = 0;
for (const file of files) {
  const source = readFileSync(file, 'utf-8');
  const name = moduleName(file);

  const imports = extractImports(source);
  const exports = extractExports(source);
  const locals = extractLocals(source);
  const cleaned = stripNonCode(source);
  const used = extractUsedNames(source);

  // Combine all defined/imported names for this file
  const defined = new Set([...imports, ...locals]);

  const issues = [];
  for (const usedName of used) {
    if (defined.has(usedName)) continue;        // defined or imported locally
    if (GLOBALS.has(usedName)) continue;         // known global
    if (exports.has(usedName)) continue;         // self-export (file defines and exports it — already in locals)
    if (usedName.startsWith('_')) continue;      // private convention
    if (SKIP_PREFIXES.some(p => usedName.startsWith(p))) continue;
    // Skip names that only appear as object literal keys in this file
    if (isOnlyObjectKey(cleaned, usedName)) continue;
    // Skip names that only appear as S.varName or DS.varName property access
    if (isOnlyPropertyAccess(cleaned, usedName, 'S') || isOnlyPropertyAccess(cleaned, usedName, 'DS')) continue;
    // Check if this name is exported by another module (potential missing import)
    const exporters = nameToFiles.get(usedName);
    if (exporters) {
      issues.push(`  ${usedName} (exported by: ${exporters.join(', ')})`);
    }
  }

  if (issues.length > 0) {
    totalIssues += issues.length;
    console.log(`\n\x1b[33m${name}\x1b[0m — ${issues.length} missing import(s):`);
    issues.forEach(i => console.log(i));
  }
}

console.log(`\n${totalIssues === 0 ? '\x1b[32m✓ No missing imports found\x1b[0m' : `\x1b[31m✗ ${totalIssues} total missing import(s)\x1b[0m`}`);
process.exit(totalIssues > 0 ? 1 : 0);
