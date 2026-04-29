const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'lib-rawm-deob');

const files = fs.readdirSync(outDir)
  .filter(f => f.endsWith('.js'))
  .sort();

files.forEach((fileName) => {
  let src = fs.readFileSync(path.join(outDir, fileName), 'utf8');

  // Step 1: Fix object literal keys that have leading dots
  // .type: → type:  (only within object literal context: preceded by { or ,)
  src = src.replace(/([,\{]\s*)\.(\w+)(\s*:)/g, '$1$2$3');

  // Step 2: For module 02, remove the duplicate var declarations
  if (fileName === '02-key-system.js') {
    // Remove lines between the first create_pc_key_info and the kbd_create_pc_key_info comment
    src = src.replace(
      /(function create_pc_key_info\(type, vCode, name, aCode, aName, sCode\) \{\n  return \{ type, vCode, name, aCode, aName, sCode \};\n\}\n)var modifiers = \[\][\s\S]*?var kbd_macro_keys = \[\];?\n(\/\/ Factory: keyboard-layout)/,
      '$1$2'
    );
  }

  fs.writeFileSync(path.join(outDir, fileName), src, 'utf8');
  console.log(`Fixed: ${fileName}`);
});

console.log('\nDone.');
