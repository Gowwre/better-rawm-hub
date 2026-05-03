export class PacketBuilder {
  data: number[];

  constructor() {
    this.data = [];
  }

  static begin(cmd: number) {
    var b = new PacketBuilder();
    b.uint8(cmd);
    return b;
  }

  uint8(v: number) {
    this.data.push(v & 0xff);
    return this;
  }

  uint16(v: number) {
    this.data.push(v & 0xff);
    this.data.push((v >> 8) & 0xff);
    return this;
  }

  uint24(v: number) {
    this.data.push(v & 0xff);
    this.data.push((v >> 8) & 0xff);
    this.data.push((v >> 16) & 0xff);
    return this;
  }

  uint32(v: number) {
    this.data.push(v & 0xff);
    this.data.push((v >> 8) & 0xff);
    this.data.push((v >> 16) & 0xff);
    this.data.push((v >> 24) & 0xff);
    return this;
  }

  bytes(arr: number[]) {
    for (var i = 0; i < arr.length; i++) {
      this.data.push(arr[i] & 0xff);
    }
    return this;
  }

  padTo(len: number, value?: number) {
    while (this.data.length < len) {
      this.data.push(value || 0);
    }
    return this;
  }

  build() {
    return new Uint8Array(this.data);
  }
}

export class PacketReader {
  data: Uint8Array;
  offset: number;

  constructor(data: Uint8Array) {
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

  subarray(len: number) {
    var s = this.data.subarray(this.offset, this.offset + len);
    this.offset += len;
    return s;
  }

  skip(len: number) {
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
