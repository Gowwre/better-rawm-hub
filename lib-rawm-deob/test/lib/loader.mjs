import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

var __dirname = dirname(fileURLToPath(import.meta.url));
var ROOT = resolve(__dirname, '..', '..');

// Load a JS source file into global scope using indirect eval.
// (0, eval) runs in global scope, so `var` / `function` declarations
// become globalThis.* — replicating browser <script> tag behaviour.
export function loadFile(relPath) {
  var filepath = resolve(ROOT, relPath);
  var code = readFileSync(filepath, 'utf-8');
  (0, eval)(code);
}
