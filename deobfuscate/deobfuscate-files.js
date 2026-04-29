const fs = require('fs');
const path = require('path');

const stringMap = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'string-map.json'), 'utf8')
);

const libRawmDir = path.join(__dirname, '..', 'lib-rawm');
const outDir = path.join(__dirname, '..', 'lib-rawm-deob');
fs.mkdirSync(outDir, { recursive: true });

const files = fs.readdirSync(libRawmDir)
  .filter(f => f.endsWith('.js'))
  .sort();

let totalReplacements = 0;
let unmatched = new Set();

files.forEach((fileName) => {
  const src = fs.readFileSync(path.join(libRawmDir, fileName), 'utf8');
  const lines = src.split('\n');

  let resolvedLines = [];
  let fileReplacements = 0;

  for (const line of lines) {
    let resolved = line;

    // Replace _0x4dcb(0xHEX) patterns — these are string literal lookups
    resolved = resolved.replace(/_0x4dcb\(0x([0-9a-f]+)\)/gi, (match, hex) => {
      const key = hex.toLowerCase();
      if (stringMap[key] !== undefined) {
        fileReplacements++;
        // Use the string value directly; for property access we'll wrap in quotes if needed
        return JSON.stringify(stringMap[key]);
      }
      unmatched.add(hex);
      return match;
    });

    // Replace plain _0x4dcb(HEX) (without 0x prefix) — just in case
    resolved = resolved.replace(/_0x4dcb\((\d+)\)/g, (match, dec) => {
      const hex = Number(dec).toString(16);
      if (stringMap[hex] !== undefined) {
        fileReplacements++;
        return JSON.stringify(stringMap[hex]);
      }
      unmatched.add(hex);
      return match;
    });

    resolvedLines.push(resolved);
  }

  const outPath = path.join(outDir, fileName);
  fs.writeFileSync(outPath, resolvedLines.join('\n'), 'utf8');
  totalReplacements += fileReplacements;
  console.log(`${fileName}: ${fileReplacements} replacements → ${outPath}`);
});

console.log(`\nTotal: ${totalReplacements} replacements across ${files.length} files`);
if (unmatched.size > 0) {
  console.log(`Unmatched indices (${unmatched.size}): ${[...unmatched].slice(0, 30).join(', ')}`);
}
