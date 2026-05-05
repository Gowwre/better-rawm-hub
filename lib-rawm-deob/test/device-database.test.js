// ===== DEVICE DATABASE TEST SUITE ==============================================
// Tests that DEVICE_DB entries are valid and lookups return expected results.
// Load after: data/constants.js, data/device-database.js

__SUITE__ = {
  name: 'device-database',

  'every product has name and sensor'() {
    var pids = Object.keys(DEVICE_DB.products);
    for (var i = 0; i < pids.length; i++) {
      var pid = parseInt(pids[i], 10);
      var p = DEVICE_DB.products[pid];
      if (p.name === undefined || p.name === null) {
        throw new Error('Product 0x' + pid.toString(16) + ' missing name');
      }
      if (p.sensor === undefined) { // null is valid (no sensor info known)
        throw new Error('Product 0x' + pid.toString(16) + ' missing sensor field');
      }
    }
  },

  'product ID count matches expected'() {
    var pids = Object.keys(DEVICE_DB.products);
    if (pids.length !== 17) {
      throw new Error('Expected 17 products, got ' + pids.length);
    }
  },

  'getSensor returns expected values'() {
    if (DEVICE_DB.getSensor(0x2329) !== 'PAW3395') throw new Error('PID_ML01 expected PAW3395');
    if (DEVICE_DB.getSensor(0x232c) !== 'PAW3395') throw new Error('PID_MH01 expected PAW3395');
    if (DEVICE_DB.getSensor(0x2331) !== 'PAW3950') throw new Error('PID_ES21 expected PAW3950');
    if (DEVICE_DB.getSensor(0x2338) !== 'PAW3950') throw new Error('PID_MH01PRO expected PAW3950');
    if (DEVICE_DB.getSensor(0x2328) !== null) throw new Error('PID_KNIFE expected null sensor');
    if (DEVICE_DB.getSensor(0x232a) !== null) throw new Error('PID_RECEIVER expected null sensor');
  },

  'getName returns expected values'() {
    if (DEVICE_DB.getName(0x2329) !== 'SA-ML01') throw new Error('PID_ML01 expected "SA-ML01"');
    if (DEVICE_DB.getName(0x2328) !== 'KNIFE') throw new Error('PID_KNIFE expected "KNIFE"');
    if (DEVICE_DB.getName(0x232b) !== 'Receiver 8K') throw new Error('PID_RECEIVER_8K expected "Receiver 8K"');
    if (DEVICE_DB.getName(0x2339) !== 'SH01Pro') throw new Error('PID_SH01PRO expected "SH01Pro"');
  },

  'getName returns null for unknown PID'() {
    var result = DEVICE_DB.getName(0x9999);
    if (result !== null) throw new Error('Expected null for unknown PID, got ' + result);
  },

  'getSensor returns null for unknown PID'() {
    var result = DEVICE_DB.getSensor(0x9999);
    if (result !== null) throw new Error('Expected null for unknown PID, got ' + result);
  },

  'getSensorByName returns expected values'() {
    if (DEVICE_DB.getSensorByName('SA-ML01') !== 'PAW3395') throw new Error('SA-ML01 expected PAW3395');
    if (DEVICE_DB.getSensorByName('SA-MH01') !== 'PAW3395') throw new Error('SA-MH01 expected PAW3395');
    if (DEVICE_DB.getSensorByName('ES21') !== 'PAW3395') throw new Error('ES21 expected PAW3395');
    if (DEVICE_DB.getSensorByName('SA-MH01Pro') !== 'PAW3950') throw new Error('SA-MH01Pro expected PAW3950');
    if (DEVICE_DB.getSensorByName('ES21M') !== 'PAW3950') throw new Error('ES21M expected PAW3950');
    if (DEVICE_DB.getSensorByName('ER21M') !== 'PAW3950') throw new Error('ER21M expected PAW3950');
  },

  'getSensorByName returns null for unknown device name'() {
    var result = DEVICE_DB.getSensorByName('NonExistent');
    if (result !== null) throw new Error('Expected null for unknown name, got ' + result);
  },

  'is_keyboard_5_15 only matches Z68A'() {
    if (!is_keyboard_5_15({ productName: 'Z68A' })) throw new Error('Z68A should be keyboard_5_15');
    if (is_keyboard_5_15({ productName: 'Z60' })) throw new Error('Z60 should NOT be keyboard_5_15');
    if (is_keyboard_5_15({ productName: 'ML01' })) throw new Error('ML01 should NOT be keyboard_5_15');
    if (is_keyboard_5_15({ productName: '' })) throw new Error('empty should NOT be keyboard_5_15');
    if (is_keyboard_5_15({})) throw new Error('undefined should NOT be keyboard_5_15');
  },

  'is_hs_keyboard matches Z68A and Z60'() {
    if (!is_hs_keyboard({ productName: 'Z68A' })) throw new Error('Z68A should be hs_keyboard');
    if (!is_hs_keyboard({ productName: 'Z60' })) throw new Error('Z60 should be hs_keyboard');
    if (is_hs_keyboard({ productName: 'ML01' })) throw new Error('ML01 should NOT be hs_keyboard');
    if (is_hs_keyboard({ productName: '' })) throw new Error('empty should NOT be hs_keyboard');
  },

  'nameSensorFallbacks has entries not in products'() {
    // SA-MH01Pro and SA-SH01Pro are name-based fallbacks for products
    // whose PID sensor lookup returns null
    if (DEVICE_DB.nameSensorFallbacks['SA-MH01Pro'] !== 'PAW3950') throw new Error('SA-MH01Pro fallback');
    if (DEVICE_DB.nameSensorFallbacks['SA-SH01Pro'] !== 'PAW3950') throw new Error('SA-SH01Pro fallback');
  },
};
