const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, '..', 'lib-rawm-deob');
const files = fs.readdirSync(SRC_DIR)
  .filter(f => f.endsWith('.js'))
  .sort();

const OBFUSCATED_RE = /_0x[0-9a-f]+/g;
const isObf = s => /^_0x[0-9a-f]+$/.test(s);

// ---- Enhanced heuristic analysis ------------------------------------------------
//
// Extracts much more context: assignment RHS, function name, param position,
// property access patterns, callback style, etc.

function analyzeUsage(bodyText, ident, params, functionName) {
  const lines = bodyText.split('\n');
  const ctx = {
    paramPos: params.indexOf(ident),  // -1 if not a param
    isParam: params.includes(ident),
    functionName,
    assignments: [],    // RHS of 'var x = ...'
    propertyAccesses: [],
    usedWithNew: false,
    usedInFor: false,
    usedInForEach: false,
    usedInSendEvent: false,
    usedInCrcProcess: false,
    hasPushCalls: 0,
    hasForEachCalls: 0,
    htmlConcat: 0,
    usedWithJQuery: false,
    accessedWithBrackets: false,  // x[0], x[1], etc.
    arrayIndexAccess: false,      // _0xHEX[i]
    usedAsLoopCounter: false,     // for (ident = 0; ...; ident++)
    usedAsLoopLimit: false,       // for (...; ident < ...; ...)
    usedInComparison: false,
    assignedToGlobal: false,
    usedWithDocument: false,
    usedInTernary: false,
    usedInReturn: false,
    usedAsObjectKey: false,
    usedWithStringMethod: false, // .prop(), .substring(), etc.
    passedToFunction: [],         // functionName(ident, ...)
    comparedWith: [],             // num or ident compared with
  };

  for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
    const line = lines[lineIdx];
    if (!line.includes(ident)) continue;

    // Assignment detection: var/let/const ident = RHS
    const varMatch = line.match(new RegExp(
      `(?:var|let|const)\\s+${ident}\\s*=\\s*(.+)`
    ));
    if (varMatch) {
      ctx.assignments.push(varMatch[1].replace(/;.*$/, '').trim());
    }

    // For loop detection
    if (new RegExp(`for\\s*\\([^;]*\\b${ident}\\b[^;]*;[^;]*\\b${ident}\\b[^;]*\\)`).test(line)) {
      ctx.usedInFor = true;
    }
    // Loop counter: for (...; ...; ident++)
    if (new RegExp(`for\\s*\\([^;]*\\b${ident}\\b\\s*=\\s*0x[0-9a-f]+\\s*;`).test(line)) {
      ctx.usedAsLoopCounter = true;
    }
    // Loop limit: for (...; ident < ...; ...)
    if (new RegExp(`for\\s*\\([^;]*;[^;]*\\b${ident}\\b\\s*<\\s*`).test(line)) {
      ctx.usedAsLoopLimit = true;
    }
    // forEach/map callback param (function or arrow)
    if (new RegExp(`forEach\\(\\s*function\\s*\\([^)]*\\b${ident}\\b`).test(line) ||
        new RegExp(`forEach\\(\\s*\\((?:[^)]*)\\b${ident}\\b`).test(line) ||
        new RegExp(`forEach\\(\\s*${ident}\\s*=>`).test(line) ||
        new RegExp(`addEventListener\\(\\s*(['\"])\\w+\\1\\s*,\\s*function\\s*\\([^)]*\\b${ident}\\b`).test(line) ||
        new RegExp(`addEventListener\\(\\s*(['\"])\\w+\\1\\s*,\\s*${ident}\\s*=>`).test(line)) {
      ctx.isForEachCallback = true;
    }
    // Destructured param: { key: ident }
    if (new RegExp(`\\{\\s*\\w+\\s*:\\s*${ident}\\b`).test(line) && !line.includes('=>') && !line.includes('function')) {
      ctx.isDestructuredDevice = true;
      const prop = line.match(new RegExp(`(\\w+)\\s*:\\s*${ident}`));
      if (prop) ctx.destructuredFrom = prop[1];
    }
    // Uninitialized var used as loop index: var _0xHEX; then for (_0xHEX = 0; ...
    if (new RegExp(`var\\s+${ident}\\s*;`).test(line)) {
      ctx.assignedFromLayui = true; // reuse this flag to indicate uninitialized
    }
    // this.getAttribute("...") pattern
    if (new RegExp(`${ident}\\s*=\\s*this\\.getAttribute`).test(line)) {
      ctx.isDestructuredDevice = true;
      ctx.destructuredFrom = 'attr';
    }

    // Property access
    const propMatches = line.match(new RegExp(`${ident}\\.(\\w+)`, 'g'));
    if (propMatches) {
      for (const pm of propMatches) ctx.propertyAccesses.push(pm.split('.')[1]);
    }

    // Method calls
    if (new RegExp(`${ident}\\.push\\(`).test(line)) ctx.hasPushCalls++;
    if (new RegExp(`${ident}\\.forEach\\(`).test(line)) ctx.hasForEachCalls++;
    if (new RegExp(`send_event\\(\\s*${ident}\\b`).test(line)) ctx.usedInSendEvent = true;
    if (new RegExp(`${ident}\\.prop\\(`).test(line)) ctx.usedWithStringMethod = true;
    if (new RegExp(`${ident}\\.substring\\(|${ident}\\.substr\\(|${ident}\\.slice\\(|${ident}\\.indexOf\\(`).test(line)) {
      ctx.usedWithStringMethod = true;
    }

    // HTML building
    if (new RegExp(`${ident}\\s*\\+=`).test(line) && /['"<>]/.test(line)) ctx.htmlConcat++;

    // jQuery
    if (new RegExp(`\\$\\([^)]*\\b${ident}\\b`).test(line)) ctx.usedWithJQuery = true;

    // Document
    if (new RegExp(`document\\.\\w+\\s*\\([^)]*\\b${ident}\\b`).test(line)) ctx.usedWithDocument = true;

    // Special variable names pattern: used as array index arr[ident]
    if (new RegExp(`\\[\\s*\\b${ident}\\b\\s*\\]`).test(line)) ctx.arrayIndexAccess = true;

    // Passed to known functions
    const funcCalls = line.match(new RegExp(
      `(\\w+)\\s*\\([^)]*\\b${ident}\\b[^)]*\\)`, 'g'
    ));
    if (funcCalls) {
      for (const fc of funcCalls) {
        const fname = fc.match(/^(\w+)/);
        if (fname) ctx.passedToFunction.push(fname[1]);
      }
    }
  }

  // ---- Scoring ----
  const scores = {};
  const add = (name, w) => { scores[name] = (scores[name] || 0) + w; };

  // 1. Function name → parameter name hints
  const fn = functionName || '';
  if (ctx.isParam && ctx.paramPos === 0) {
    if (/^(kbd_ui|ui_|kbd_)/.test(fn)) add('client', 10);
    if (/^(hs_|he_|send_|query_)/.test(fn)) add('client', 10);
    if (fn.includes('_init') || fn.includes('_refresh') || fn.includes('_update')) add('client', 9);
    if (fn.includes('_setting') || fn.includes('_mapping') || fn.includes('_macro')) add('client', 8);
    if (fn.includes('_key_desc') || fn.includes('_light') || fn.includes('_axis')) add('client', 8);
  }
  if (ctx.isParam && ctx.paramPos === 1) {
    if (fn.includes('_set') || fn.includes('_update') || fn.includes('add_') || fn.includes('create_')) add('value', 5);
    if (fn.includes('_index') || fn.includes('_onboard')) add('index', 6);
  }

  // 1b. Parameter-level heuristics (check each line for usage patterns)
  if (ctx.isParam) {
    for (const line of lines) {
      if (!line.includes(ident)) continue;
      if (new RegExp(`new\\s+Uint8Array\\([^)]*\\b${ident}\\b`).test(line)) add('data', 8);
      if (new RegExp(`\\b${ident}\\b.*>>\\s*0x|\\b${ident}\\b.*&\\s*0xff`).test(line)) add('value', 6);
      if (new RegExp(`\\b${ident}\\b\\s*>\\s*0x[0-9a-f]+`).test(line) && /^[\d0x]+$/.test(line.split('>')[1]?.trim())) add('max', 4);
    }
  }

  // 2. Assignment RHS patterns
  for (const rhs of ctx.assignments) {
    if (/new\s+Uint8Array/.test(rhs)) add('bytes', 10);
    if (/new\s+BigNumber/.test(rhs)) add('bn', 5);
    if (/^\[\s*\]/.test(rhs)) add('payload', 6);
    if (/^\[\s*\]/.test(rhs)) add('arr', 4);
    if (/false|true/.test(rhs)) add('flag', 6);
    if (/layui\./.test(rhs)) add('layui', 5);
    if (/localStorage/.test(rhs)) add('stored', 4);
    if (/document\./.test(rhs)) add('el', 6);
    if (/JSON\.parse/.test(rhs)) add('json', 5);
    if (/create_key_info/.test(rhs)) add('keyInfo', 7);
    if (/create_macro_info/.test(rhs)) add('macroInfo', 7);
    if (/create_device_info/.test(rhs)) add('deviceInfo', 7);
    if (/create_usb_client/.test(rhs)) add('client', 8);
    if (/kbd_create_/.test(rhs)) add('obj', 6);
    if (/get_select_key_info/.test(rhs)) add('keyInfo', 8);
    if (/get_cpi_range/.test(rhs)) add('cpiRange', 6);
    if (/''|""/.test(rhs) || /^`$/.test(rhs)) add('str', 3);
    if (/'</.test(rhs) || /"</.test(rhs)) add('html', 8);
    if (/Object\.assign/.test(rhs)) add('clone', 4);
    if (/^0x0$/.test(rhs.trim())) add('offset', 4);
    if (/0x[0-9a-f]+/.test(rhs) && !/new/.test(rhs) && !/0x0/.test(rhs)) add('value', 3);
    if (/new\s+XMLHttpRequest/.test(rhs)) add('xhr', 7);
    if (/parseInt\(new Date\(\)/.test(rhs)) add('timestamp', 7);
    if (/is_dark_theme/.test(rhs)) add('darkTheme', 4);
    if (/current_usb_client\.device_info\.(\w+)/.test(rhs)) add(RegExp.$1, 5);
    if (/current_usb_client\.device_info\.(.+)\.(\w+)/.test(rhs)) add(RegExp.$2, 4);
    if (/onboard_status\[onboard_config_index\]/.test(rhs)) add('status', 4);
  }

  // 3. Property access patterns
  const props = ctx.propertyAccesses;
  if (props.includes('device_info')) add('client', 10);
  if (props.includes('recv_buf')) add('client', 9);
  if (props.includes('connected')) add('client', 8);
  if (props.includes('syncing')) add('client', 8);
  if (props.includes('send_event_buf')) add('client', 8);
  if (props.includes('device')) add('client', 7);
  if (props.includes('productName') || props.includes('productId')) add('device', 6);
  if (props.includes('length')) add('len', 4);
  if (props.includes('byteLength')) add('byteLen', 5);
  if (props.includes('length') && props.includes('byteLength')) add('size', 4);
  if (props.includes('id')) add('item', 3);
  if (props.includes('name')) add('item', 2);
  if (props.includes('style') || props.includes('innerHTML')) add('el', 5);
  if (props.includes('src') || props.includes('href')) add('el', 3);

  // 4. Call patterns
  if (ctx.usedInSendEvent) add('client', 9);
  if (ctx.usedInFor && ctx.usedAsLoopCounter) add('i', 10);
  if (ctx.usedAsLoopLimit) add('len', 5);
  if (ctx.usedAsLoopLimit) add('count', 4);
  if (ctx.htmlConcat > 2) add('html', 9);

  // 5. jQuery/document
  if (ctx.usedWithJQuery && ctx.htmlConcat === 0) add('el', 4);
  if (ctx.usedWithDocument) add('el', 5);

  // 6. Array operations
  if (ctx.hasPushCalls > 0 && ctx.htmlConcat === 0) add('payload', 7);
  if (ctx.hasPushCalls > 0 && ctx.htmlConcat === 0) add('arr', 4);
  if (ctx.hasForEachCalls > 0) add('arr', 5);
  if (ctx.arrayIndexAccess && !ctx.isParam) add('index', 5);

  // 7. String operations
  if (ctx.usedWithStringMethod) add('str', 4);

  // 7b. forEach/addEventListener callbacks
  if (ctx.isForEachCallback) add('item', 8);
  // Check if it's specifically a message event listener
  if (ctx.isForEachCallback && /addEventListener/.test(bodyText.substring(0, 200))) add('event', 7);

  // 7c. Destructured param: { key: ident } → ident gets the key name
  if (ctx.isDestructuredDevice && ctx.destructuredFrom) add(ctx.destructuredFrom, 9);
  if (ctx.isDestructuredDevice && ctx.destructuredFrom === 'attr') add('attr', 6);
  
  // 7c2. Uninitialized var → likely loop index
  if (ctx.assignedFromLayui && ctx.isParam === false) add('i', 5);
  if (ctx.assignedFromLayui && ctx.isParam === false) add('idx', 4);

  // 7c3. Hash/prefix variables initialized with literal tiny strings
  for (const rhs of ctx.assignments) {
    if (/^'.{1,2}'$/.test(rhs) || /^".{1,2}"$/.test(rhs)) add('str', 3);
    if (/^'#'$/.test(rhs)) add('hash', 5);
  }

  // 7d. Color conversion function vars
  if (fn === 'rgbToHsv' || fn === 'hsvToRgb') {
    if (ctx.paramPos === 0) add('r', 6);
    if (ctx.paramPos === 1) add('g', 6);
    if (ctx.paramPos === 2) add('b', 6);
    if (!ctx.isParam && ctx.propertyAccesses.length === 0) {
      const lineText = bodyText.split('\n').filter(l => l.includes(ident))[0] || '';
      if (lineText.includes('hsv.')) add('hsv', 3);
    }
  }

  // 8. Callback function — if function name is empty or generic
  if (!fn || fn === 'anonymous' || /^(done|cancel|success|error)$/.test(fn)) {
    if (ctx.isParam && ctx.paramPos === 0) add('result', 4);
    if (ctx.isParam && ctx.paramPos === 1) add('data', 4);
  }

  return scores;
}

// ---- Parse all function scopes ---------------------------------------------

function parseFile(text) {
  const functions = [];
  let fnId = 0;

  // Match ANY function pattern:
  // 1. function name(params) { ... }
  // 2. function(params) { ... }  
  // 3. 'key': function(params) { ... }
  // 4. = function(params) { ... }
  // 5. async function name(params) { ... }
  const fnRe = /(?:'(?:done|cancel|success|error|change|click)'\s*:\s*)?(?:=\s*)?(?:async\s+)?function\s*(?:\w+\s*)?\(([^)]*)\)\s*\{/g;

  let match;
  while ((match = fnRe.exec(text)) !== null) {
    const rawParams = match[1].split(',').map(s => s.trim()).filter(Boolean);
    const paramNames = [];
    for (const p of rawParams) {
      const obf = p.match(/^(_0x[0-9a-f]+)$/);
      if (obf) paramNames.push(obf[1]);
      const normal = p.match(/^([a-zA-Z_$]\w+)$/);
      if (normal && !['function','var','let','const','if','else','for','while','return','true','false','null','undefined','new','this','typeof'].includes(normal[1])) {
        paramNames.push(normal[1]);
      }
      const dest = p.match(/_0x[0-9a-f]+/g);
      if (dest) paramNames.push(...dest);
    }

    const fullMatch = match[0];
    const fnStart = match.index;

    // Extract function name from the match
    let fnName = '';
    const nameMatch = fullMatch.match(/function\s+(\w+)/);
    if (nameMatch) fnName = nameMatch[1];
    else {
      // Check if preceded by 'key': pattern
      const before = text.substring(Math.max(0, fnStart - 40), fnStart);
      const keyMatch = before.match(/'(\w+)'\s*:\s*$/);
      if (keyMatch) fnName = keyMatch[1];
    }

    // Find body by brace matching
    let depth = 0, opened = false;
    let pos = match.index + fullMatch.length - 1;
    while (pos < text.length) {
      const ch = text[pos];
      if (ch === '{') { depth++; opened = true; }
      else if (ch === '}') depth--;
      if (opened && depth === 0) break;
      pos++;
    }

    const body = text.substring(fnStart, pos + 1);
    const idents = [...new Set(body.match(OBFUSCATED_RE) || [])];

    functions.push({
      id: fnId++,
      name: fnName || 'anonymous',
      start: fnStart,
      end: pos,
      params: [...new Set(paramNames)],
      idents,
      body,
    });
  }

  return functions;
}

// ---- Rename one file -------------------------------------------------------

function renameFile(filePath) {
  let src = fs.readFileSync(filePath, 'utf8');
  const functions = parseFile(src);
  const renameMap = {};

  // Collect all already-named identifiers in the file (prevents conflicts)
  const usedGlobalNames = new Set();
  const fnParamNames = new Set();

  for (const fn of functions) {
    const paramIdents = fn.params.filter(isObf);
    const bodyIdents = fn.idents.filter(id => isObf(id) && !renameMap[id]);

    const allIdents = [...new Set([...paramIdents, ...bodyIdents])];
    if (allIdents.length === 0) continue;

    // Names already taken in this scope
    const taken = new Set(fn.params.filter(p => !isObf(p)));

    const suggestions = {};
    for (const ident of allIdents) {
      if (renameMap[ident]) continue;
      const scores = analyzeUsage(fn.body, ident, fn.params, fn.name);
      if (Object.keys(scores).length > 0) {
        suggestions[ident] = Object.entries(scores)
          .map(([n, s]) => ({ name: n, score: s }))
          .sort((a, b) => b.score - a.score);
      }
    }

    // Assign names, avoiding conflicts with known globals
    const RESERVED = new Set([
      'window', 'document', 'navigator', 'location', 'history', 'console',
      'setTimeout', 'setInterval', 'clearTimeout', 'clearInterval',
      'parseInt', 'parseFloat', 'Math', 'Array', 'Object', 'String', 'Number',
      'Boolean', 'Date', 'RegExp', 'JSON', 'Promise', 'Error', 'Map', 'Set',
      'Uint8Array', 'Int8Array', 'Uint16Array', 'Int16Array', 'Uint32Array', 'Int32Array',
      'BigNumber', 'crypto', 'fetch', 'WebSocket', 'XMLHttpRequest',
      'localStorage', 'sessionStorage', 'alert', 'confirm', 'postMessage',
      'addEventListener', 'removeEventListener', 'requestAnimationFrame',
      'isNaN', 'isFinite', 'encodeURI', 'decodeURI',
      'self', 'globalThis', 'top', 'parent',
      'layui', 'layer', 'form', 'element', 'util', 'table', 'jquery',
      'i18n', 'i18np',
    ]);

    for (const [ident, ranked] of Object.entries(suggestions)) {
      let chosen = null;
      for (const { name } of ranked) {
        if (!taken.has(name) && !RESERVED.has(name)) {
          chosen = name;
          break;
        }
      }
      if (!chosen) {
        const best = ranked[0].name;
        let suffix = 2;
        while (taken.has(best + suffix) || RESERVED.has(best + suffix)) suffix++;
        chosen = best + suffix;
      }
      renameMap[ident] = chosen;
      taken.add(chosen);
    }
  }

  // Apply
  let newSrc = src;
  for (const [ident, name] of Object.entries(renameMap)) {
    newSrc = newSrc.replace(new RegExp(`\\b${ident}\\b`, 'g'), name);
  }

  fs.writeFileSync(filePath, newSrc, 'utf8');
  return Object.keys(renameMap).length;
}

// ---- MAIN ----
let totalRenamed = 0;
for (const fileName of files) {
  const filePath = path.join(SRC_DIR, fileName);
  const count = renameFile(filePath);
  totalRenamed += count;
  console.log(`${fileName}: renamed ${count} identifiers`);
}
console.log(`\nTotal renames: ${totalRenamed}`);
