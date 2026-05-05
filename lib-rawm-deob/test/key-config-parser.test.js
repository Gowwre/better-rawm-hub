// ===== KEY-CONFIG PARSER TEST SUITE ============================================
// Tests the binary key config parser (add_key_info) with synthetic and golden data.
// Load after: constants, key-database, key-lookup, device-store, kbd-structures,
//             buffer, binary-reader, key-config-parser
//
// The parser reads binary HID response data and produces key info objects.
// Each test constructs known byte sequences and verifies the parsed output.

__SUITE__ = {
  name: 'key-config-parser',

  // ── Factory functions ──────────────────────────────────────────────

  'create_key_info returns all expected fields'() {
    var ki = create_key_info();
    if (!ki) throw new Error('create_key_info returned null/undefined');
    // Verify it's an object with expected properties
    var expectedKeys = ['cmd', 'name', 'label', 'configType', 'touch_style',
      'macroKeys', 'mouse_mapping_keys', 'x', 'y'];
    for (var i = 0; i < expectedKeys.length; i++) {
      if (ki[expectedKeys[i]] === undefined) {
        throw new Error('create_key_info missing: ' + expectedKeys[i]);
      }
    }
    if (ki.cmd !== 0x3) throw new Error('cmd expected 0x3, got 0x' + ki.cmd.toString(16));
    if (ki.configType !== 0x0) throw new Error('configType expected 0x0, got ' + ki.configType);
    if (ki.touch_style !== 0x0) throw new Error('touch_style expected 0x0, got ' + ki.touch_style);
  },

  'create_macro_info returns correct structure'() {
    var mi = create_macro_info();
    if (!mi) throw new Error('create_macro_info returned null/undefined');
    if (mi.interval_time === undefined) throw new Error('macro_info missing interval_time');
    if (mi.continue_time === undefined) throw new Error('macro_info missing continue_time');
    if (mi.style === undefined) throw new Error('macro_info missing style');
  },

  'copy_key_info produces deep equal copy'() {
    var orig = create_key_info();
    orig.name = 'TestKey';
    orig.x = 42;
    var copy = copy_key_info(orig);
    if (copy.name !== 'TestKey') throw new Error('copy.name mismatch');
    if (copy.x !== 42) throw new Error('copy.x mismatch');
    if (copy === orig) throw new Error('copy_key_info returned same reference');
  },

  // ── Edge cases ─────────────────────────────────────────────────────

  'add_key_info with byteLen undefined clears the array'() {
    var client = {
      device_info: {
        allKeyConfigs: [[{ cmd: 0x3, name: 'existing' }]],
      },
    };
    add_key_info(client, 0, undefined);
    if (client.device_info.allKeyConfigs[0].length !== 0) {
      throw new Error('Expected empty array after clearing');
    }
  },

  // ── Edge cases ─────────────────────────────────────────────────────

  'add_key_info with invalid header is rejected'() {
    var client = {
      device_info: {
        allKeyConfigs: [[]],
      },
    };
    // Invalid header (0x0 in low nibble instead of 0x3)
    var bytes = new Uint8Array([0x00, 0x08, 0x16, 0x01, 0x00, 0x00, 0x00, 0x00]);
    add_key_info(client, 0, bytes);
    if (client.device_info.allKeyConfigs[0].length !== 0) {
      throw new Error('Should not push on invalid header');
    }
  },

  'add_key_info with invalid idx is rejected'() {
    var client = {
      device_info: {
        allKeyConfigs: [[]],
      },
    };
    // Valid header, but invalid idx (0xff)
    var totalLen = 0x08;
    var bytes = new Uint8Array([
      ((totalLen >> 8) & 0xf) << 4 | 0x3,
      totalLen & 0xff,
      0xff,  // invalid idx
      0x01,  // keyCount
      0x00, 0x00, 0x00, 0x00,
    ]);
    add_key_info(client, 0, bytes);
    if (client.device_info.allKeyConfigs[0].length !== 0) {
      throw new Error('Should not push on invalid idx');
    }
  },

  'add_key_info with value out of range does nothing'() {
    var client = {
      device_info: {
        allKeyConfigs: [[]],
      },
    };
    add_key_info(client, 99, new Uint8Array([0x03, 0x08, 0x16, 0x01]));
    // No crash is the test
  },

  'add_key_info with truncated data does not crash'() {
    var client = {
      device_info: {
        allKeyConfigs: [[]],
      },
    };
    // Only 3 bytes when we need 4+ — truncated
    var bytes = new Uint8Array([0x03, 0x08, 0x16]);
    add_key_info(client, 0, bytes);
    // Must not throw
  },

  // ── Mapping function parsing (idx=0x18, FUNC_TOGGLE_CPI) ───────────
  // Construct binary data for FUNC_TOGGLE_CPI (function 0x1).
  // The function parser path: i8=0, function=0x1, function_data=0.
  // Since function != 0x9 and != 0x10, takes the else branch: push keyInfo.

  'add_key_info parses FUNC_TOGGLE_CPI mapping function'() {
    var client = {
      device_info: {
        allKeyConfigs: [[]],
        crcSupported: false,
        productName: 'ML01',
      },
    };
    pc_key_manager_init();

    var totalLen = 0x07;
    var bytes = new Uint8Array([
      ((totalLen >> 8) & 0xf) << 4 | 0x3,
      totalLen & 0xff,
      0x18,                                   // idx = mapping function
      0x01,                                   // keyCount
      0x00,                                   // i8
      0x01,                                   // function = FUNC_TOGGLE_CPI
      0x00,                                   // function_data
    ]);

    add_key_info(client, 0, bytes);
    if (client.device_info.allKeyConfigs[0].length !== 1) {
      throw new Error('Expected exactly 1 parsed key config, got ' +
        client.device_info.allKeyConfigs[0].length);
    }
    var parsed = client.device_info.allKeyConfigs[0][0];
    if (parsed.configType !== 0x0) throw new Error('configType expected 0x0, got ' + parsed.configType);
  },

  // ── Mouse mapping parsing (idx=0x16) ───────────────────────────────
  // Construct binary data for a mouse key mapping.
  // modifier=0 (None), eventType=0 (key down), keyCode=0 (None),
  // secondaryModifier=0 (None). After parsing, payload = [0, 0, 0].

  'add_key_info parses mouse mapping'() {
    var client = {
      device_info: {
        allKeyConfigs: [[]],
        crcSupported: false,
        productName: 'ML01',
      },
    };
    pc_key_manager_init();

    var totalLen = 0x08;
    var bytes = new Uint8Array([
      ((totalLen >> 8) & 0xf) << 4 | 0x3,
      totalLen & 0xff,
      0x16,                                  // idx = mouse mapping
      0x01,                                  // keyCount
      0x00,                                  // modifier (None)
      0x00,                                  // eventType (key down)
      0x00,                                  // keyCode (None)
      0x00,                                  // secondaryModifier (None)
    ]);

    add_key_info(client, 0, bytes);
    if (client.device_info.allKeyConfigs[0].length !== 1) {
      throw new Error('Expected 1 parsed key config, got ' +
        client.device_info.allKeyConfigs[0].length);
    }
    var parsed = client.device_info.allKeyConfigs[0][0];
    if (parsed.touch_style !== 0x1b) {
      throw new Error('touch_style expected 0x1b, got 0x' + parsed.touch_style.toString(16));
    }
    var payload = JSON.parse(parsed.mouse_mapping_keys);
    if (!Array.isArray(payload) || payload.length !== 3) {
      throw new Error('mouse_mapping_keys expected 3-element array');
    }
  },

  // ── Golden data round-trip placeholder ─────────────────────────────
  // To add real device traffic:
  // 1. Connect a LEVIATHAN V4 / MH01Pro to hub-deob.html
  // 2. Open console, capture HID response for key config query
  // 3. Save bytes to test/fixtures/<device>-key-config.bin
  // 4. Call add_key_info() on those bytes → JSON.stringify result
  // 5. Save expected output to test/fixtures/<device>-key-config.json
  // 6. Add test below that loads .bin → parse → deep-equal .json
};
