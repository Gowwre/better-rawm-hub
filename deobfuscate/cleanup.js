const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'lib-rawm-deob');

const files = fs.readdirSync(outDir)
  .filter(f => f.endsWith('.js'))
  .sort();

const VALID_JS_IDENT = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/;

files.forEach((fileName) => {
  let src = fs.readFileSync(path.join(outDir, fileName), 'utf8');

  // Phase 3a: Convert bracket notation to dot notation for valid identifiers
  // ["literalStr"] → .literalStr  (only when preceded by a valid expression character)
  src = src.replace(/\["([^"]+)"\]/g, (match, inner) => {
    if (VALID_JS_IDENT.test(inner)) {
      return '.' + inner;
    }
    return match;
  });
  // Also handle single-quoted keys
  src = src.replace(/\['([^']+)'\]/g, (match, inner) => {
    if (VALID_JS_IDENT.test(inner)) {
      return '.' + inner;
    }
    return match;
  });

  // Phase 4 for module 01: Remove the IIFE rotation bootstrap (dead code)
  if (fileName === '01-obfuscation.js') {
    // Remove the IIFE that rotates the string array (lines starting with (function (_0x70ea07, _0x4ddb87) {)
    src = src.replace(
      /\(function\s*\(_0x70ea07,\s*_0x4ddb87\)[\s\S]*?\}\)\(_0x3870,\s*0xeb79c\);\n*/,
      ''
    );
  }

  // Phase 3b for module 02: Remove duplicate global array declarations
  if (fileName === '02-key-system.js') {
    // Remove the second set of duplicate var declarations and the second create_pc_key_info
    // The pattern: after the first create_pc_key_info function, there are duplicate var declarations
    // and a second create_pc_key_info. Remove everything between the first function and the comments.
    src = src.replace(
      /function create_pc_key_info\(type, vCode, name, aCode, aName, sCode\) \{[\s\S]*?return \{ type, vCode, name, aCode, aName, sCode \};\n\}\nvar modifiers = \[\]\n[\s\S]*?var kbd_macro_keys = \[\]\nfunction create_pc_key_info/,
      'function create_pc_key_info(type, vCode, name, aCode, aName, sCode) {\n  return { type, vCode, name, aCode, aName, sCode };\n}\nfunction create_pc_key_info'
    );
    // Remove the second duplicate function (which is now bare)
    src = src.replace(
      /function create_pc_key_info\(_0x49a93d, _0x5cecf4, _0x361a7e, _0x5a0e4c, _0x1dd966, _0x2afd58\) \{[\s\S]*?return _0x1c401c;\n\}\n/,
      ''
    );
  }

  fs.writeFileSync(path.join(outDir, fileName), src, 'utf8');
  console.log(`Cleaned: ${fileName}`);
});

console.log('\nCleanup complete.');
