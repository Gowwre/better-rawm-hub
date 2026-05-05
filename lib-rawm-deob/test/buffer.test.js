// ===== BUFFER TEST SUITE =======================================================
// Round-trip tests for PacketBuilder and PacketReader.
// Load after: data/constants.js, protocol/buffer.js

__SUITE__ = {
  name: 'buffer',

  'PacketBuilder.begin() creates single-byte payload'() {
    var buf = PacketBuilder.begin(0x12).build();
    if (buf.byteLength !== 1) throw new Error('Expected 1 byte, got ' + buf.byteLength);
    if (buf[0] !== 0x12) throw new Error('Expected 0x12, got 0x' + buf[0].toString(16));
  },

  'PacketBuilder.uint8 writes little-endian byte'() {
    var buf = PacketBuilder.begin(0x00).uint8(0xab).build();
    if (buf.length !== 2) throw new Error('Expected 2 bytes, got ' + buf.length);
    if (buf[1] !== 0xab) throw new Error('Expected 0xab, got 0x' + buf[1].toString(16));
  },

  'PacketBuilder.uint16 writes little-endian'() {
    var buf = PacketBuilder.begin(0x00).uint16(0x1234).build();
    if (buf[1] !== 0x34) throw new Error('Expected low byte 0x34, got 0x' + buf[1].toString(16));
    if (buf[2] !== 0x12) throw new Error('Expected high byte 0x12, got 0x' + buf[2].toString(16));
  },

  'PacketBuilder.uint24 writes little-endian'() {
    var buf = PacketBuilder.begin(0x00).uint24(0x123456).build();
    if (buf[1] !== 0x56) throw new Error('byte0 expected 0x56');
    if (buf[2] !== 0x34) throw new Error('byte1 expected 0x34');
    if (buf[3] !== 0x12) throw new Error('byte2 expected 0x12');
  },

  'PacketBuilder.uint32 writes little-endian'() {
    var buf = PacketBuilder.begin(0x00).uint32(0xdeadbeef).build();
    if (buf[1] !== 0xef) throw new Error('byte0 expected 0xef');
    if (buf[2] !== 0xbe) throw new Error('byte1 expected 0xbe');
    if (buf[3] !== 0xad) throw new Error('byte2 expected 0xad');
    if (buf[4] !== 0xde) throw new Error('byte3 expected 0xde');
  },

  'PacketBuilder.bytes appends raw array'() {
    var buf = PacketBuilder.begin(0x00).bytes(new Uint8Array([1, 2, 3])).build();
    if (buf.length !== 4) throw new Error('Expected 4 bytes, got ' + buf.length);
    if (buf[1] !== 1 || buf[2] !== 2 || buf[3] !== 3) throw new Error('bytes mismatch');
  },

  'PacketBuilder.padTo fills to length with default 0'() {
    var buf = PacketBuilder.begin(0x00).uint8(0xff).padTo(5).build();
    if (buf.length !== 5) throw new Error('Expected 5 bytes, got ' + buf.length);
    if (buf[1] !== 0xff) throw new Error('byte1 expected 0xff');
    if (buf[2] !== 0 || buf[3] !== 0 || buf[4] !== 0) throw new Error('padding should be 0');
  },

  'round-trip build and parse — all types'() {
    var original = PacketBuilder.begin(0x12)
      .uint16(0x4567)
      .uint8(0x89)
      .uint32(0xdeadbeef)
      .bytes(new Uint8Array([0xaa, 0xbb]))
      .build();

    var reader = new PacketReader(original);
    if (reader.uint8() !== 0x12) throw new Error('round-trip cmd');
    if (reader.uint16() !== 0x4567) throw new Error('round-trip uint16');
    if (reader.uint8() !== 0x89) throw new Error('round-trip uint8');
    if (reader.uint32() !== 0xdeadbeef) throw new Error('round-trip uint32');
    if (reader.uint8() !== 0xaa) throw new Error('round-trip byte0');
    if (reader.uint8() !== 0xbb) throw new Error('round-trip byte1');
    if (!reader.done()) throw new Error('round-trip: reader not at end');
  },

  'PacketReader.uint16BE reads big-endian'() {
    var data = new Uint8Array([0x12, 0x34]);
    var reader = new PacketReader(data);
    if (reader.uint16BE() !== 0x1234) throw new Error('uint16BE expected 0x1234');
  },

  'PacketReader.subarray extracts slice and advances offset'() {
    var data = new Uint8Array([0x01, 0x02, 0x03, 0x04, 0x05]);
    var reader = new PacketReader(data);
    reader.uint8(); // skip 1 byte
    var sub = reader.subarray(3);
    if (sub.byteLength !== 3) throw new Error('subarray length expected 3, got ' + sub.byteLength);
    if (sub[0] !== 0x02 || sub[1] !== 0x03 || sub[2] !== 0x04) throw new Error('subarray content mismatch');
    if (reader.uint8() !== 0x05) throw new Error('offset after subarray');
  },

  'PacketReader.skip advances offset'() {
    var data = new Uint8Array([0x01, 0x02, 0x03, 0x04]);
    var reader = new PacketReader(data);
    reader.skip(2);
    if (reader.uint8() !== 0x03) throw new Error('after skip, expected 0x03');
  },

  'PacketReader.done/remaining/atEnd work correctly'() {
    var data = new Uint8Array([0x01, 0x02]);
    var reader = new PacketReader(data);
    if (reader.done()) throw new Error('should not be done at start');
    if (reader.atEnd()) throw new Error('should not be at end at start');
    if (reader.remaining() !== 2) throw new Error('remaining expected 2');
    reader.uint8();
    reader.uint8();
    if (!reader.done()) throw new Error('should be done');
    if (!reader.atEnd()) throw new Error('should be at end');
    if (reader.remaining() !== 0) throw new Error('remaining expected 0');
  },
};
