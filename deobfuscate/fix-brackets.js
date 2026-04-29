const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'lib-rawm-deob');

const files = fs.readdirSync(outDir)
  .filter(f => f.endsWith('.js'))
  .sort();

const VALID_JS_IDENT = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/;

files.forEach((fileName) => {
  let src = fs.readFileSync(path.join(outDir, fileName), 'utf8');

  // Step 1: In object literal definitions, convert ["key"]: to key:
  // Match {["string"]: or ,["string"]: patterns
  src = src.replace(/(\{|,)\s*\["([^"]+)"\]\s*:/g, '$1$2:');
  src = src.replace(/(\{|,)\s*\['([^']+)'\]\s*:/g, '$1$2:');

  // Step 2: For remaining property access, convert ["string"] to .string
  // Using a function to check it's a valid identifier
  src = src.replace(/\["([^"]+)"\]/g, (match, inner) => {
    if (VALID_JS_IDENT.test(inner)) {
      return '.' + inner;
    }
    return match;
  });
  src = src.replace(/\['([^']+)'\]/g, (match, inner) => {
    if (VALID_JS_IDENT.test(inner)) {
      return '.' + inner;
    }
    return match;
  });

  fs.writeFileSync(path.join(outDir, fileName), src, 'utf8');
  console.log(`Fixed brackets: ${fileName}`);
});

console.log('\nDone.');
