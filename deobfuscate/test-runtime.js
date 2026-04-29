const fs = require('fs');
const vm = require('vm');

// Concatenate all 14 files in order
const files = [
  '01-obfuscation.js', '02-key-system.js', '03-device-info.js',
  '04-kbd-structures.js', '05-hs-protocol.js', '06-hid-protocol.js',
  '07-http-data-model.js', '08-parse-cmd-ui.js', '09-ui-clients.js',
  '10-ui-settings.js', '11-ui-mapping.js', '12-utilities.js',
  '13-event-dispatch.js', '14-ui-keyboard.js'
];

let combined = '';
for (const f of files) {
  combined += fs.readFileSync(`lib-rawm-deob/${f}`, 'utf8') + '\n';
}

console.log(`Combined size: ${combined.length} chars`);

const ctx = {
  console, setTimeout, clearTimeout, setInterval, parseInt, parseFloat,
  Math, Array, Uint8Array, Int8Array, Uint16Array, String, Number, Boolean,
  Date, RegExp, Object, JSON, crypto: { randomUUID: () => '00000000-0000-0000-0000-000000000000' },
  document: {
    createElement: () => ({ style: {}, appendChild: () => {}, setAttribute: () => {} }),
    addEventListener: () => {}, removeEventListener: () => {},
    querySelector: () => null, querySelectorAll: () => [],
    getElementById: () => ({
      style: {}, value: '', innerHTML: '', click: () => {},
      setAttribute: () => {}, getAttribute: () => null,
      addEventListener: () => {}, removeEventListener: () => {},
      appendChild: () => {}, removeChild: () => {},
      classList: { add: () => {}, remove: () => {}, contains: () => false, toggle: () => {} },
      parentNode: { removeChild: () => {}, insertBefore: () => {} },
      focus: () => {}, blur: () => {},
      checked: false, disabled: false, selectedIndex: 0,
    }),
    documentElement: { style: {} },
    body: { appendChild: () => {}, style: {} },
    head: { appendChild: () => {} },
    createTextNode: () => ({}),
    createDocumentFragment: () => ({}),
  },
  window: {}, location: { href: '' },   navigator: { hid: { addEventListener: () => {}, removeEventListener: () => {}, getDevices: () => Promise.resolve([]), requestDevice: () => Promise.resolve([]) }, usb: {}, platform: '' }, history: {},
  localStorage: { getItem: () => null, setItem: () => {} },
  sessionStorage: { getItem: () => null, setItem: () => {} },
  alert: () => {}, confirm: () => true,
  URL, fetch: () => Promise.resolve({ json: () => ({}) }),
  WebSocket: class FakeWS {},
  XMLHttpRequest: class FakeXHR {},
  postMessage: () => {},
  addEventListener: () => {},
};
ctx.window = ctx;
ctx.self = ctx;
ctx.globalThis = ctx;

ctx['$'] = () => ({
  on: () => {}, css: () => '', html: () => {}, prop: () => {},
  addClass: () => {}, removeClass: () => {}, val: () => '', text: () => '',
  append: () => {}, prepend: () => {}, find: () => ctx['$'](),
  children: () => [], parent: () => ctx['$'](),
  offset: () => ({ top: 0, left: 0 }), width: () => 0, height: () => 0,
  show: () => {}, hide: () => {}, fadeIn: () => {}, fadeOut: () => {},
  attr: () => '', removeAttr: () => {}, hasClass: () => false,
  each: () => {}, slice: () => [], trigger: () => {},
  ready: () => {}, get: () => 0, index: () => 0,
  data: () => null, closest: () => ctx['$'](),
  not: () => ctx['$'](), is: () => false,
});
ctx.layui = {
  use: () => {}, data: () => ({ style: '', theme: '' }),
  form: { on: () => {}, render: () => {}, val: () => {} },
  layer: { open: () => 0, close: () => {}, msg: () => {}, confirm: () => {}, load: () => 0, full: () => {}, style: () => {} },
  util: {}, jquery: ctx['$'],
  i18n: { loadProperties: () => {} }, i18np: { prop: () => '' },
  element: { on: () => {}, render: () => {}, tab: { add: () => {} } },
  device: (x) => ({ os: { os: () => 'windows' } }),
  $: ctx['$'],
};
ctx.layui.device = function(x) { return { os: 'windows', version: '10' }; };
ctx.layui.hint = () => ({ success: () => {}, error: () => {} });
ctx.layui.config = () => ctx.layui;
ctx.layui.extend = () => ctx.layui;

vm.createContext(ctx);

try {
  vm.runInContext(combined, ctx, { timeout: 5000 });
  console.log('RUNTIME OK — all 14 modules loaded without error');
  console.log('Globals created:');
  const globals = [
    'modifiers', 'keys', 'macro_keys', 'kbd_5_15_keys', 'kbd_5_14_keys',
    'kbd_select_keys', 'mouse_select_keys', 'kbd_all_keys',
    'kbd_rgb_keys', 'kbd_windows_keys', 'kbd_media_keys', 'kbd_macro_keys',
    'usb_client_list', 'current_usb_client',
    'SYNC_DATA', 'RESOURCE_URL',
    'create_pc_key_info', 'kbd_create_pc_key_info', 'pc_key_manager_init',
    'create_device_info', 'reset_device_info',
    'hs_format_data', 'hs_get_firmware_version',
    'crc16_compute', 'send_event',
    'KEY_NONE', 'KEY_CTRL', 'KEY_SHIFT',
    'start',
  ];
  for (const g of globals) {
    const exists = ctx[g] !== undefined;
    const typeStr = typeof ctx[g];
    const marker = exists ? '✓' : (['usb_client_list','current_usb_client','SYNC_DATA','RESOURCE_URL','KEY_NONE','KEY_CTRL','KEY_SHIFT'].includes(g) ? '~' : '✗');
    console.log(`  ${marker} ${g} (${typeStr})`);
  }

  // Test: call pc_key_manager_init to populate key arrays
  ctx.pc_key_manager_init();
  console.log(`modifiers after init: ${ctx.modifiers.length} entries`);
  console.log(`keys after init: ${ctx.keys.length} entries`);
  console.log(`macro_keys after init: ${ctx.macro_keys.length} entries`);
  console.log(`kbd_all_keys after init: ${ctx.kbd_all_keys.length} entries`);
  console.log(`kbd_macro_keys after init: ${ctx.kbd_macro_keys.length} entries`);
} catch (e) {
  console.error('RUNTIME ERROR:', e.message.substring(0, 300));
  console.error('Stack:', e.stack.substring(0, 500));
}
