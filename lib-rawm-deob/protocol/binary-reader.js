class BinaryReader {
  constructor(data) {
    this.data = data;
    this.offset = 0;
  }

  uint8() {
    return this.data[this.offset++] & 0xff;
  }

  uint16() {
    var v = this.data[this.offset] & 0xff | (this.data[this.offset + 1] & 0xff) << 8;
    this.offset += 2;
    return v;
  }

  uint32() {
    var v = 0;
    for (var i = 0; i < 4; i++) {
      v |= (this.data[this.offset++] & 0xff) << (i * 8);
    }
    return v;
  }

  subarray(len) {
    var s = this.data.subarray(this.offset, this.offset + len);
    this.offset += len;
    return s;
  }

  done() {
    return this.offset >= this.data.length;
  }

  remaining() {
    return this.data.length - this.offset;
  }
}
