import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// Simulate the checker
const source = readFileSync(resolve(ROOT, 'ui/ui-settings.js'), 'utf-8');

// extractImports
const imports = [];
const importPattern = /import\s+\{([^}]+)\}\s+from\s+['"]\.\.?[^'"]+['"]/g;
let match;
while ((match = importPattern.exec(source)) !== null) {
  match[1].split(',').forEach(name => {
    name = name.trim().replace(/\s+as\s+\w+$/, '');
    if (name) imports.push(name);
  });
}
console.log('Has SLEEP_MAX_SEC in imports:', imports.includes('SLEEP_MAX_SEC'));

// stripNonCode
let s = source.replace(/\/\/.*$/gm, '');
s = s.replace(/\/\*[\s\S]*?\*\//g, '');
s = s.replace(/`[^`]*`/g, '``');
s = s.replace(/'[^']*'/g, "''");
s = s.replace(/"[^"]*"/g, '""');
s = s.replace(/\/(?![*/])[^/\\]*(?:\\.[^/\\]*)*\/[gimsuy]*/g, '//');

// extractUsedNames for SLEEP_MAX_SEC
const pattern = /\bSLEEP_MAX_SEC\b/g;
const matches = s.match(pattern);
console.log('Matches in stripped source:', matches ? matches.length : 0);
if (matches) {
  let m;
  while ((m = pattern.exec(s)) !== null) {
    console.log(`  at index ${m.index}: ...${s.substring(Math.max(0,m.index-10), m.index+20)}...`);
  }
}
