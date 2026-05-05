// ===== DEVICE STORE TEST SUITE =================================================
// Tests the reactive event emitter and state management in DeviceStore.
// Load after: data/constants.js, data/device-database.js, state/device-store.js

__SUITE__ = {
  name: 'device-store',

  // ── Setup: mock create_usb_client to avoid crypto/device_info deps ──

  _setup() {
    // Reset state before each test — _deviceClients is a var in the shared eval scope
    _deviceClients.length = 0;
    DeviceStore.currentId = null;
    current_usb_client = null;

    // Override create_usb_client with a lightweight mock
    create_usb_client = function (hidDevice, value, virtual) {
      var idx = _deviceClients.length + 1;
      return {
        id: 'client-' + idx,
        device: hidDevice || { productName: 'ML01' },
        product_esb_ch: value || 0xff,
        recv_buf: new Uint8Array(0),
        send_event_buf: new Uint8Array(0),
        virtual: virtual || false,
        device_info: {},
        pause: false,
        syncing: false,
        allow_send: true,
        helloed: false,
        connected: false,
        esb_last_alive_time: Date.now(),
      };
    };
  },

  // ── Initial state ──────────────────────────────────────────────────

  'clients starts empty'() {
    this._setup();
    if (DeviceStore.clients.length !== 0) {
      throw new Error('Expected empty clients, got ' + DeviceStore.clients.length);
    }
  },

  'current is null when no selection'() {
    if (DeviceStore.current !== null) {
      throw new Error('Expected null current, got ' + JSON.stringify(DeviceStore.current));
    }
  },

  'currentId starts null'() {
    if (DeviceStore.currentId !== null) {
      throw new Error('currentId expected null, got ' + DeviceStore.currentId);
    }
  },

  // ── Event emitter ──────────────────────────────────────────────────

  'on/off subscribe and unsubscribe handlers'() {
    this._setup();
    var called = false;
    function handler(data) { called = true; }
    DeviceStore.on('test:event', handler);
    DeviceStore._emit('test:event', 'data');
    if (!called) throw new Error('Handler was not called');
    called = false;
    DeviceStore.off('test:event', handler);
    DeviceStore._emit('test:event', 'data');
    if (called) throw new Error('Handler was called after off()');
  },

  'multiple handlers on same event all fire'() {
    this._setup();
    var count = 0;
    DeviceStore.on('multi:event', function () { count++; });
    DeviceStore.on('multi:event', function () { count++; });
    DeviceStore._emit('multi:event');
    if (count !== 2) throw new Error('Expected 2 handler calls, got ' + count);
  },

  'different events fire different handlers'() {
    this._setup();
    var a = 0, b = 0;
    DeviceStore.on('evt:a', function () { a++; });
    DeviceStore.on('evt:b', function () { b++; });
    DeviceStore._emit('evt:a');
    if (a !== 1) throw new Error('evt:a expected 1, got ' + a);
    if (b !== 0) throw new Error('evt:b expected 0, got ' + b);
  },

  // ── addClient ──────────────────────────────────────────────────────

  'addClient adds to clients array and emits client:added'() {
    this._setup();
    var addedClient = null;
    DeviceStore.on('client:added', function (c) { addedClient = c; });
    var client = DeviceStore.addClient(null, 0xff, false);
    if (DeviceStore.clients.length !== 1) {
      throw new Error('Expected 1 client, got ' + DeviceStore.clients.length);
    }
    if (!addedClient) throw new Error('client:added was not emitted');
    if (addedClient.id !== client.id) throw new Error('Emitted client has wrong id');
  },

  'addClient with virtual flag works'() {
    this._setup();
    var client = DeviceStore.addClient(null, 0xff, true);
    if (!client.virtual) throw new Error('Expected virtual client');
  },

  // ── removeClient ───────────────────────────────────────────────────

  'removeClient removes from array and emits client:removed'() {
    this._setup();
    var removed = [];
    DeviceStore.on('client:removed', function (c) { removed.push(c.id); });
    var c1 = DeviceStore.addClient(null, 0xff, false);
    var c2 = DeviceStore.addClient(null, 0xfe, false);
    DeviceStore.removeClient(c1.id);
    if (DeviceStore.clients.length !== 1) throw new Error('Expected 1 client left, got ' + DeviceStore.clients.length);
    if (removed.length !== 1) throw new Error('client:removed not emitted');
    if (removed[0] !== c1.id) throw new Error('Wrong client id in removed event');
  },

  'removeClient on non-existent id does nothing'() {
    this._setup();
    DeviceStore.addClient(null, 0xff, false);
    var len = DeviceStore.clients.length;
    DeviceStore.removeClient('non-existent');
    if (DeviceStore.clients.length !== len) throw new Error('Clients length changed');
  },

  // ── selectClient ───────────────────────────────────────────────────

  'selectClient updates currentId'() {
    this._setup();
    var client = DeviceStore.addClient(null, 0xff, false);
    DeviceStore.selectClient(client.id);
    if (DeviceStore.currentId !== client.id) {
      throw new Error('currentId expected ' + client.id + ', got ' + DeviceStore.currentId);
    }
    if (DeviceStore.current === null || DeviceStore.current.id !== client.id) {
      throw new Error('current getter returns wrong client');
    }
  },

  'selectClient with unknown id does nothing'() {
    this._setup();
    DeviceStore.addClient(null, 0xff, false);
    DeviceStore.selectClient('does-not-exist');
    // currentId should still be null since we never selected a valid client
    if (DeviceStore.currentId !== null) {
      throw new Error('currentId should remain null, got ' + DeviceStore.currentId);
    }
  },

  // ── getClient ──────────────────────────────────────────────────────

  'getClient returns correct client by id'() {
    this._setup();
    var c1 = DeviceStore.addClient(null, 0xff, false);
    var c2 = DeviceStore.addClient(null, 0xfe, false);
    var found = DeviceStore.getClient(c2.id);
    if (!found || found.id !== c2.id) throw new Error('getClient returned wrong client');
    var notFound = DeviceStore.getClient('nope');
    if (notFound !== null) throw new Error('getClient should return null for unknown id');
  },

  // ── getDeviceInfo ──────────────────────────────────────────────────

  'getDeviceInfo returns client.device_info'() {
    this._setup();
    var client = DeviceStore.addClient(null, 0xff, false);
    var info = DeviceStore.getDeviceInfo(client);
    if (info === null || info === undefined) throw new Error('getDeviceInfo returned null');
    // Should be the same object reference
    if (info !== client.device_info) {
      throw new Error('getDeviceInfo should return client.device_info reference');
    }
  },

  'getDeviceInfo handles null client'() {
    this._setup();
    var info = DeviceStore.getDeviceInfo(null);
    if (info !== null) throw new Error('getDeviceInfo(null) should return null');
  },

  // ── updateDeviceInfo ───────────────────────────────────────────────

  'updateDeviceInfo merges patch and emits device:updated'() {
    this._setup();
    var updated = null;
    DeviceStore.on('device:updated', function (c) { updated = c; });
    var client = DeviceStore.addClient(null, 0xff, false);
    DeviceStore.updateDeviceInfo(client.id, { productName: 'TestMouse', pollingRate: 1000 });
    if (client.device_info.productName !== 'TestMouse') throw new Error('productName not merged');
    if (client.device_info.pollingRate !== 1000) throw new Error('pollingRate not merged');
    if (!updated) throw new Error('device:updated not emitted');
    if (updated.id !== client.id) throw new Error('Wrong client in device:updated');
  },

  'updateDeviceInfo on unknown id does nothing'() {
    this._setup();
    var emitted = false;
    DeviceStore.on('device:updated', function () { emitted = true; });
    DeviceStore.updateDeviceInfo('nope', { x: 1 });
    if (emitted) throw new Error('device:updated should not fire for unknown id');
  },

  // ── kbdSync ────────────────────────────────────────────────────────

  'kbdSync starts with default values'() {
    this._setup();
    if (DeviceStore.kbdSync.index !== 0) throw new Error('kbdSync.index expected 0');
    if (!Array.isArray(DeviceStore.kbdSync.keyinfoList)) throw new Error('kbdSync.keyinfoList not array');
    if (!Array.isArray(DeviceStore.kbdSync.macroBuff)) throw new Error('kbdSync.macroBuff not array');
    if (DeviceStore.kbdSync.keyinfoList.length !== 0) throw new Error('kbdSync.keyinfoList not empty');
  },

  // ── Backward-compatible globals ────────────────────────────────────

  'usb_client_list stays in sync with clients'() {
    this._setup();
    var c1 = DeviceStore.addClient(null, 0xff, false);
    if (usb_client_list.length !== 1) throw new Error('usb_client_list length mismatch');
    // Direct mutation via usb_client_list should be visible through DeviceStore
    var originalLen = DeviceStore.clients.length;
    var c2 = { id: 'direct-push', device_info: {} };
    usb_client_list.push(c2);
    if (DeviceStore.clients.length !== originalLen + 1) {
      throw new Error('DeviceStore.clients not synced after usb_client_list push');
    }
  },

  'current_usb_client alias references same object as DeviceStore.current'() {
    this._setup();
    var client = DeviceStore.addClient(null, 0xff, false);
    DeviceStore.selectClient(client.id);
    if (current_usb_client === null) throw new Error('current_usb_client should not be null');
    if (current_usb_client.id !== client.id) throw new Error('current_usb_client id mismatch');
  },
};
