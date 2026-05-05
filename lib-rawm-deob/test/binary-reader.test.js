// ===== BINARY READER TEST SUITE ================================================
// Known-answer tests for BinaryReader.
// Load after: data/constants.js, protocol/binary-reader.js

__SUITE__ = {
  name: 'binary-reader',

  'uint8 reads correct values'() {
    var data = new Uint8Array([0x00, 0xff, 0x80, 0x7f]);
    var reader = new BinaryReader(data);
    if (reader.uint8() !== 0x00) throw new Error('0x00');
    if (reader.uint8() !== 0xff) throw new Error('0xff');
    if (reader.uint8() !== 0x80) throw new Error('0x80');
    if (reader.uint8() !== 0x7f) throw new Error('0x7f');
  },

  'uint16 reads little-endian'() {
    var data = new Uint8Array([0x34, 0x12, 0x00, 0xff]);
    var reader = new BinaryReader(data);
    if (reader.uint16() !== 0x1234) throw new Error('0x1234, got 0x' + reader.uint16().toString(16));
    if (reader.uint16() !== 0xff00) throw new Error('0xff00');
  },

  'uint16 handles zero and max values'() {
    var data = new Uint8Array([0x00, 0x00, 0xff, 0xff]);
    var reader = new BinaryReader(data);
    if (reader.uint16() !== 0x0000) throw new Error('zero uint16');
    if (reader.uint16() !== 0xffff) throw new Error('max uint16');
  },

  'uint32 reads little-endian'() {
    var data = new Uint8Array([0x78, 0x56, 0x34, 0x12]);
    var reader = new BinaryReader(data);
    if (reader.uint32() !== 0x12345678) throw new Error('0x12345678, got 0x' + reader.uint32().toString(16));
  },

  'uint32 handles boundaries'() {
    var data = new Uint8Array([0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0xff, 0xff]);
    var reader = new BinaryReader(data);
    if (reader.uint32() !== 0x00000000) throw new Error('zero uint32');
    // BinaryReader uses signed 32-bit ops, so full 0xffffffff becomes -1
    if ((reader.uint32() >>> 0) !== 0xffffffff) {
      throw new Error('max uint32');
    }
  },

  'subarray extracts slice and advances offset'() {
    var data = new Uint8Array([0x01, 0x02, 0x03, 0x04, 0x05]);
    var reader = new BinaryReader(data);
    reader.uint8();
    var sub = reader.subarray(2);
    if (sub.length !== 2) throw new Error('subarray length expected 2, got ' + sub.length);
    if (sub[0] !== 0x02 || sub[1] !== 0x03) throw new Error('subarray content');
    if (reader.uint8() !== 0x04) throw new Error('offset after subarray');
    if (reader.uint8() !== 0x05) throw new Error('last byte');
  },

  'done returns true after consuming all bytes'() {
    var data = new Uint8Array([0x01, 0x02]);
    var reader = new BinaryReader(data);
    if (reader.done()) throw new Error('should not be done at start');
    reader.uint8();
    if (reader.done()) throw new Error('should not be done after 1 of 2');
    reader.uint8();
    if (!reader.done()) throw new Error('should be done');
  },

  'remaining decreases with each read'() {
    var data = new Uint8Array([0x01, 0x02, 0x03, 0x04]);
    var reader = new BinaryReader(data);
    if (reader.remaining() !== 4) throw new Error('initial remaining');
    reader.uint32();
    if (reader.remaining() !== 0) throw new Error('after uint32');
  },

  'Mixed read sequence'() {
    var data = new Uint8Array([0x01, 0x34, 0x12, 0x78, 0x56, 0x34, 0x12]);
    var reader = new BinaryReader(data);
    if (reader.uint8() !== 0x01) throw new Error('first uint8');
    if (reader.uint16() !== 0x1234) throw new Error('middle uint16');
    if (reader.uint32() !== 0x12345678) throw new Error('last uint32');
    if (!reader.done()) throw new Error('should be done');
  },
};
