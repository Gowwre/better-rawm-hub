// ===== TYPED BUFFER HELPERS ==================================================
// PacketBuilder serialises command parameters into Uint8Array payloads.
// PacketReader deserialises response data from Uint8Array payloads.

class PacketBuilder {
  constructor() {
    this.data = [];
  }

  static begin(cmd) {
    var b = new PacketBuilder();
    b.uint8(cmd);
    return b;
  }

  uint8(v) {
    this.data.push(v & 0xff);
    return this;
  }

  uint16(v) {
    this.data.push(v & 0xff);
    this.data.push((v >> 8) & 0xff);
    return this;
  }

  uint24(v) {
    this.data.push(v & 0xff);
    this.data.push((v >> 8) & 0xff);
    this.data.push((v >> 16) & 0xff);
    return this;
  }

  uint32(v) {
    this.data.push(v & 0xff);
    this.data.push((v >> 8) & 0xff);
    this.data.push((v >> 16) & 0xff);
    this.data.push((v >> 24) & 0xff);
    return this;
  }

  bytes(arr) {
    for (var i = 0; i < arr.length; i++) {
      this.data.push(arr[i] & 0xff);
    }
    return this;
  }

  padTo(len, value) {
    while (this.data.length < len) {
      this.data.push(value || 0);
    }
    return this;
  }

  build() {
    return new Uint8Array(this.data);
  }
}

class PacketReader {
  constructor(data) {
    this.data = data;
    this.offset = 0;
  }

  uint8() {
    return this.data[this.offset++] & 0xff;
  }

  uint16() {
    var v = (this.data[this.offset] & 0xff) | ((this.data[this.offset + 1] & 0xff) << 8);
    this.offset += 2;
    return v;
  }

  uint16BE() {
    var v = ((this.data[this.offset] & 0xff) << 8) | (this.data[this.offset + 1] & 0xff);
    this.offset += 2;
    return v;
  }

  uint32() {
    var v = 0;
    for (var i = 0; i < 4; i++) {
      v |= (this.data[this.offset++] & 0xff) << (i * 8);
    }
    return v >>> 0;
  }

  subarray(len) {
    var s = this.data.subarray(this.offset, this.offset + len);
    this.offset += len;
    return s;
  }

  skip(len) {
    this.offset += len;
    return this;
  }

  done() {
    return this.offset >= this.data.length;
  }

  remaining() {
    return this.data.length - this.offset;
  }

  atEnd() {
    return this.offset >= this.data.length;
  }
}
