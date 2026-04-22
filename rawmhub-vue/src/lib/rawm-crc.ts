/**
 * RAWM CRC-16 Implementation
 *
 * Byte-exact port of crc16_compute() from lib.deobfuscated.js line ~3370.
 * The firmware validates this CRC on every config packet; any deviation
 * causes silent rejection.
 */

/**
 * Compute the RAWM custom CRC-16 over the given data.
 *
 * @param data - Bytes to checksum
 * @param len  - Number of bytes to read (defaults to data.length)
 * @returns 16-bit CRC value
 */
export function crc16Compute(data: Uint8Array | number[], len?: number): number {
  let crc = 0xffff
  const n = len ?? data.length

  for (let i = 0; i < n; i++) {
    crc = ((crc >> 8) & 0xff) | (crc << 8)
    crc ^= data[i]
    crc ^= (crc & 0xff) >> 4
    crc ^= (crc << 8) << 4
    crc ^= ((crc & 0xff) << 4) << 1
    crc &= 0xffff
  }

  return crc
}
