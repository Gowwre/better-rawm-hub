/**
 * RAWM Packet Formatting Utilities
 *
 * Ports the following library functions:
 *   - crc_process()      … adds length header + optional CRC envelope
 *   - hs_format_data()   … pads keyboard payload to exactly 32 bytes
 *   - read_event()       … reads from send queue with length prefix
 *   - hs_read_event()    … keyboard variant of read_event
 *
 * These helpers build the *final* HID report bytes that must be sent
 * byte-for-byte identical to the original library.
 */

import { crc16Compute } from './rawm-crc'
import {
  MAXIMUM_PACKET_SIZE,
  HS_MAXIMUM_PACKET_SIZE,
  CONFIG_TYPE_CRC,
  CMD_CONFIG,
  PACKET_SIZE_MASK,
} from './rawm-protocol'

// =============================================================================
// CRC Wrapping (crc_process)
// =============================================================================

/**
 * Wrap a raw payload with the library's length header and optional CRC envelope.
 *
 * The original logic (lib.deobfuscated.js ~3381):
 *   byte[0] = (total_length >> 4 & 0xF0) | payload[0]
 *   byte[1] = total_length & 0xFF
 *   if (client.cfg.crc) {
 *     byte[0] = (new_total_length >> 4 & 0xF0) | CMD_CONFIG
 *     byte[2] = CONFIG_TYPE_CRC
 *     byte[3] = crc & 0xFF
 *     byte[4] = crc >> 8 & 0xFF
 *     bytes[5..] = original payload
 *   }
 *
 * @param payload  Raw payload bytes (will be modified in-place logic)
 * @param useCrc   Whether to add the 5-byte CRC envelope
 * @returns        Wrapped packet bytes
 */
export function wrapCrcProcess(payload: number[] | Uint8Array, useCrc: boolean): Uint8Array {
  const plain = new Uint8Array(payload)
  const plainLen = plain.length

  // Step 1: length header on plain payload
  const withLen = new Uint8Array(plainLen)
  withLen[0] = ((plainLen >> 4) & 0xf0) | (plain[0] & 0x0f)
  withLen[1] = plainLen & 0xff
  withLen.set(plain.subarray(2), 2)

  if (!useCrc) {
    return withLen
  }

  // Step 2: CRC envelope
  const totalLen = plainLen + 5
  const out = new Uint8Array(totalLen)
  out[0] = ((totalLen >> 4) & 0xf0) | CMD_CONFIG
  out[1] = totalLen & 0xff
  out[2] = CONFIG_TYPE_CRC

  const crc = crc16Compute(withLen, withLen.length)
  out[3] = crc & 0xff
  out[4] = (crc >> 8) & 0xff
  out.set(withLen, 5)

  return out
}

// =============================================================================
// Keyboard Formatting (hs_format_data)
// =============================================================================

/**
 * Pad a keyboard payload to exactly 32 bytes with trailing zeros.
 * Keyboard firmware expects fixed-size feature reports.
 */
export function formatKeyboardPacket(payload: Uint8Array | number[]): Uint8Array {
  const out = new Uint8Array(HS_MAXIMUM_PACKET_SIZE)
  const src = new Uint8Array(payload)
  out.set(src.subarray(0, HS_MAXIMUM_PACKET_SIZE))
  return out
}

// =============================================================================
// Mouse Report Building (read_event logic)
// =============================================================================

/**
 * Build a 64-byte mouse HID output report from a queued payload.
 *
 * The library's read_event() sets:
 *   byte[0] = 0x80 | min(payloadLength, 63)
 *   byte[1..N] = payload bytes
 *   remainder = zeros
 *
 * @param payload  Bytes to embed (up to 63)
 * @returns        64-byte Uint8Array ready for sendReport()
 */
export function buildMouseOutputReport(payload: Uint8Array | number[]): Uint8Array {
  const src = new Uint8Array(payload)
  const len = Math.min(src.length, MAXIMUM_PACKET_SIZE - 1)
  const out = new Uint8Array(MAXIMUM_PACKET_SIZE)

  out[0] = 0x80 | (len & PACKET_SIZE_MASK)
  out.set(src.subarray(0, len), 1)
  // rest is already zero-initialized

  return out
}

// =============================================================================
// Wireless (ESB) Framing
// =============================================================================

/**
 * Prefix a payload with the ESB wireless channel byte and pad to 64 bytes.
 *
 * The library does:
 *   bytes.unshift(0xC0 | channel)
 *   while (length < 64) push(0x00)
 *
 * @param payload  Raw payload bytes
 * @param channel  ESB channel ID (0-15)
 * @returns        64-byte Uint8Array ready for sendReport()
 */
export function buildWirelessReport(payload: Uint8Array | number[], channel: number): Uint8Array {
  const src = new Uint8Array(payload)
  const out = new Uint8Array(MAXIMUM_PACKET_SIZE)

  out[0] = 0xc0 | (channel & 0x0f)
  out.set(src.subarray(0, MAXIMUM_PACKET_SIZE - 1), 1)
  // rest is already zero-initialized

  return out
}

// =============================================================================
// Convenience: full mouse packet pipeline
// =============================================================================

export interface MousePacketOptions {
  useCrc: boolean
  channel?: number // 0xFF = direct USB; else wireless
}

/**
 * Build the complete HID report for a mouse command.
 *
 * Pipeline:
 *   payload -> crc_process -> read_event -> [wireless prefix] -> 64-byte report
 */
export function buildMousePacket(
  payload: number[] | Uint8Array,
  options: MousePacketOptions
): Uint8Array {
  const wrapped = wrapCrcProcess(payload, options.useCrc)

  if (options.channel !== undefined && options.channel !== 0xff) {
    return buildWirelessReport(wrapped, options.channel)
  }

  return buildMouseOutputReport(wrapped)
}

// =============================================================================
// Convenience: full keyboard packet pipeline
// =============================================================================

export interface KeyboardPacketOptions {
  channel?: number // 0xFF = direct USB; else wireless
}

/**
 * Build the complete HID report for a keyboard IQ command.
 *
 * Pipeline:
 *   payload -> hs_format_data (pad to 32) -> [wireless prefix] -> report
 */
export function buildKeyboardPacket(
  payload: number[] | Uint8Array,
  options: KeyboardPacketOptions
): Uint8Array {
  const formatted = formatKeyboardPacket(payload)

  if (options.channel !== undefined && options.channel !== 0xff) {
    return buildWirelessReport(formatted, options.channel)
  }

  return formatted
}

// =============================================================================
// Little-endian helpers
// =============================================================================

export function writeUint16LE(buf: Uint8Array, offset: number, value: number): void {
  buf[offset] = value & 0xff
  buf[offset + 1] = (value >> 8) & 0xff
}

export function readUint16LE(buf: Uint8Array, offset: number): number {
  return buf[offset] | (buf[offset + 1] << 8)
}

export function writeUint32LE(buf: Uint8Array, offset: number, value: number): void {
  buf[offset] = value & 0xff
  buf[offset + 1] = (value >> 8) & 0xff
  buf[offset + 2] = (value >> 16) & 0xff
  buf[offset + 3] = (value >> 24) & 0xff
}

export function readUint32LE(buf: Uint8Array, offset: number): number {
  return buf[offset] | (buf[offset + 1] << 8) | (buf[offset + 2] << 16) | (buf[offset + 3] << 24)
}
