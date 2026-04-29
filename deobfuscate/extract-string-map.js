const fs = require('fs');
const vm = require('vm');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, '..', 'lib-rawm', '01-obfuscation.js'), 'utf8');

const ctx = {
  console, setTimeout, clearTimeout, parseInt, parseFloat,
  document: {}, window: {},
  navigator: {}, location: { href: '' },
  history: {},
  localStorage: { getItem: () => null, setItem: () => {} },
  sessionStorage: { getItem: () => null, setItem: () => {} },
  alert: () => {},
  confirm: () => true,
  URL,
  fetch: () => Promise.resolve({ json: () => ({}) }),
  WebSocket: class FakeWS {},
  XMLHttpRequest: class FakeXHR {},
  Math,
  Array,
  Uint8Array,
  Date,
  crypto: { randomUUID: () => '00000000-0000-0000-0000-000000000000' },
};
ctx.window = ctx;
ctx.self = ctx;
ctx['$'] = () => ({
  on: () => {}, css: () => '', html: () => {}, prop: () => {},
  addClass: () => {}, removeClass: () => {}, val: () => '', text: () => '',
  append: () => {}, prepend: () => {}, find: () => ctx['$'](),
  children: () => [], parent: () => ctx['$'](),
  offset: () => ({ top: 0, left: 0 }), width: () => 0, height: () => 0,
  show: () => {}, hide: () => {}, fadeIn: () => {}, fadeOut: () => {},
  attr: () => '', removeAttr: () => {}, hasClass: () => false,
  each: () => {}, slice: () => [],
});
ctx.layui = {
  use: () => {}, form: { on: () => {}, render: () => {}, val: () => {} },
  layer: { open: () => {}, close: () => {}, msg: () => {}, confirm: () => {}, load: () => {}, full: () => {}, style: () => {} },
  util: {}, jquery: ctx['$'],
  i18n: { loadProperties: () => {} }, i18np: { prop: () => '' },
  element: { on: () => {}, render: () => {}, tab: {} },
  device: () => ({ os: { os: () => '' } }),
};
vm.createContext(ctx);

try {
  vm.runInContext(src, ctx, { timeout: 10000 });
} catch (e) {
  console.error('Runtime error:', e.message.substring(0, 200));
}

const fn = ctx._0x4dcb;
if (typeof fn !== 'function') {
  console.error('ERROR: _0x4dcb not found after execution');
  console.error('Available globals:', Object.keys(ctx).filter(k => k.startsWith('_0')).join(', '));
  process.exit(1);
}

const rawArray = ctx._0x3870();
const arrayLength = rawArray.length;
console.log(`String array length: ${arrayLength}`);

const stringMap = {};
for (let i = 0; i < arrayLength; i++) {
  const hexIndex = (0xa4 + i).toString(16);
  stringMap[hexIndex] = rawArray[i];
}

fs.writeFileSync(
  path.join(__dirname, 'string-map.json'),
  JSON.stringify(stringMap, null, 2)
);

console.log(`Wrote ${Object.keys(stringMap).length} entries to string-map.json`);

const sampleKeys = Object.keys(stringMap).slice(0, 20);
sampleKeys.forEach(k => console.log(`  0x${k} → ${stringMap[k]}`));
