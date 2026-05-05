// ===== KEY DATABASE TEST SUITE =================================================
// Tests that KEY_DB entries have valid structure and lookup functions work.
// Load after: data/constants.js, data/key-database.js, state/key-lookup.js
// (key-lookup.js provides pc_key_manager_init + lookup functions)

__SUITE__ = {
  name: 'key-database',

  'all keys have vCode (v field)'() {
    for (var i = 0; i < KEY_DB.keys.length; i++) {
      var k = KEY_DB.keys[i];
      if (k.v === undefined) throw new Error('keys[' + i + '] missing v field');
      if (typeof k.v !== 'number') throw new Error('keys[' + i + '] v is not number: ' + typeof k.v);
    }
  },

  'all keys have type (t field)'() {
    for (var i = 0; i < KEY_DB.keys.length; i++) {
      var k = KEY_DB.keys[i];
      if (k.t === undefined) throw new Error('keys[' + i + '] missing t field');
    }
  },

  'types are in valid range 0-3'() {
    for (var i = 0; i < KEY_DB.keys.length; i++) {
      var t = KEY_DB.keys[i].t;
      if (t < 0 || t > 3) throw new Error('keys[' + i + '] invalid type: ' + t);
    }
  },

  'all keys have name (n field)'() {
    for (var i = 0; i < KEY_DB.keys.length; i++) {
      if (KEY_DB.keys[i].n === undefined) throw new Error('keys[' + i + '] missing n field');
    }
  },

  'modifiers array has exactly 5 entries'() {
    if (KEY_DB.modifiers.length !== 5) {
      throw new Error('Expected 5 modifiers, got ' + KEY_DB.modifiers.length);
    }
  },

  'first modifier is NONE with vCode 0'() {
    var first = KEY_DB.modifiers[0];
    if (first.v !== 0 || first.n !== '$STRID_NONE') {
      throw new Error('First modifier should be NONE (v=0), got v=' + first.v + ' n=' + first.n);
    }
  },

  'kbd_5_15 has expected entry count'() {
    if (KEY_DB.kbd_5_15.length < 70) {
      throw new Error('kbd_5_15 expected >= 70 entries, got ' + KEY_DB.kbd_5_15.length);
    }
  },

  'p_kbd_select has at least 100 entries'() {
    if (KEY_DB.kbd_select.length < 100) {
      throw new Error('kbd_select expected >= 100 entries, got ' + KEY_DB.kbd_select.length);
    }
  },

  'vCodes in keys array are unique'() {
    var seen = {};
    for (var i = 0; i < KEY_DB.keys.length; i++) {
      var v = KEY_DB.keys[i].v;
      if (v !== undefined && seen[v]) {
        throw new Error('Duplicate vCode 0x' + v.toString(16) + ' at index ' + i);
      }
      if (v !== undefined) seen[v] = true;
    }
  },

  'kbd_5_15 entries have rect arrays with 4 elements'() {
    for (var i = 0; i < KEY_DB.kbd_5_15.length; i++) {
      var r = KEY_DB.kbd_5_15[i].rect;
      if (!r || r.length !== 4) {
        throw new Error('kbd_5_15[' + i + '] rect expected 4 elements, got ' + JSON.stringify(r));
      }
    }
  },

  'macro_keys has mouse_move + mouse_position inserted at index 9'() {
    pc_key_manager_init();
    if (macro_keys.length <= 9) throw new Error('macro_keys too short');
    // Index 9 should be mouse move (vCode 0x404)
    // Index 10 should be mouse position (vCode 0x405)
    if (macro_keys[9].vCode !== 0x404) throw new Error('macro_keys[9] expected mouse_move(0x404), got ' + macro_keys[9].vCode);
    if (macro_keys[10].vCode !== 0x405) throw new Error('macro_keys[10] expected mouse_position(0x405), got ' + macro_keys[10].vCode);
  },

  'lookup functions work after init'() {
    pc_key_manager_init();

    // get_key_name_from_code should find Esc by vCode 0x1b
    var escName = get_key_name_from_code(0x1b);
    if (escName !== 'Esc') throw new Error('Esc expected "Esc", got "' + escName + '"');

    // get_key_name_from_code should find M1 by vCode 0x100
    var m1name = get_key_name_from_code(0x100);
    if (!m1name || m1name !== 'Left') {
      throw new Error('get_key_name_from_code(0x100) expected "Left", got "' + m1name + '"');
    }

    // get_modifier_name_from_code should find Ctrl
    var ctrlName = get_modifier_name_from_code(0x11);
    if (ctrlName !== 'Ctrl') throw new Error('Ctrl modifier expected "Ctrl", got "' + ctrlName + '"');
  },

  'kbd_all_keys contains entries from all sub-arrays'() {
    pc_key_manager_init();
    // Should have at least kbd_select_keys + mouse_select_keys + rgb + media + windows + macro
    var minExpected = KEY_DB.kbd_select.length + KEY_DB.mouse_select.length
      + KEY_DB.rgb.length + KEY_DB.media.length + KEY_DB.windows.length + KEY_DB.macro.length
      + (KEY_DB.extra ? KEY_DB.extra.length : 0);
    if (kbd_all_keys.length < minExpected) {
      throw new Error('kbd_all_keys expected >= ' + minExpected + ', got ' + kbd_all_keys.length);
    }
  },
};
