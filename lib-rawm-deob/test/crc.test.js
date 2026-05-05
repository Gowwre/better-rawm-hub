// ===== CRC TEST SUITE ==========================================================
// Known-answer tests for the CRC-16 computation used by hid-transport.
// Load after: data/constants.js, protocol/hid-transport.js
//
// The CRC function crc16_compute(data, len) is a custom bitwise CRC variant.
// It does NOT mask to 16 bits internally — values can overflow beyond 0xFFFF.
// In practice only the lower 16 bits are used: (result & 0xffff).
// The expected values below are the masked 16-bit results.

__SUITE__ = {
  name: 'crc',

  'CRC of known sequence "123456789"'() {
    var data = new Uint8Array([0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39]);
    var crc = crc16_compute(data, data.length) & 0xffff;
    if (crc !== 0x29b1) {
      throw new Error('CRC "123456789" expected 0x29b1, got 0x' + crc.toString(16));
    }
  },

  'CRC of single byte 0x00'() {
    var data = new Uint8Array([0x00]);
    var crc = crc16_compute(data, 1) & 0xffff;
    if (crc !== 0xe1f0) {
      throw new Error('CRC [0x00] expected 0xe1f0, got 0x' + crc.toString(16));
    }
  },

  'CRC of single byte 0xff'() {
    var data = new Uint8Array([0xff]);
    var crc = crc16_compute(data, 1) & 0xffff;
    if (crc !== 0xff00) {
      throw new Error('CRC [0xff] expected 0xff00, got 0x' + crc.toString(16));
    }
  },

  'CRC of two bytes 0x01, 0x02'() {
    var data = new Uint8Array([0x01, 0x02]);
    var crc = crc16_compute(data, 2) & 0xffff;
    if (crc !== 0x0e7c) {
      throw new Error('CRC [0x01,0x02] expected 0x0e7c, got 0x' + crc.toString(16));
    }
  },

  'CRC with partial length (shorter than array)'() {
    var data = new Uint8Array([0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0xff, 0xff]);
    var crc = crc16_compute(data, 9) & 0xffff;
    if (crc !== 0x29b1) {
      throw new Error('CRC partial expected 0x29b1, got 0x' + crc.toString(16));
    }
  },

  'CRC is deterministic (same input = same output)'() {
    var data = new Uint8Array([0x12, 0x34, 0x56, 0x78]);
    var crc1 = crc16_compute(data, 4) & 0xffff;
    var crc2 = crc16_compute(data, 4) & 0xffff;
    if (crc1 !== crc2) {
      throw new Error('CRC not deterministic: ' + crc1 + ' vs ' + crc2);
    }
  },
};
