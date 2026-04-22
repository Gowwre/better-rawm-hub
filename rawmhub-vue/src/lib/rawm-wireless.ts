/**
 * RAWM Wireless (ESB) Packet Builders
 *
 * Ports:
 *   - send_event_set_esb_addr()    … pair mouse with receiver
 *   - send_event_clear_esb_addr()  … unpair / forget receiver
 *   - send_event_select_esb_addr() … switch active receiver
 *
 * All ESB addresses are 5-byte hex strings (e.g. "A1B2C3D4E5").
 */

import {
  CMD_CONFIG,
  CONFIG_TYPE_SET_ESB_ADDR,
  CONFIG_TYPE_CLEAR_ESB_ADDR,
  CONFIG_TYPE_SELECT_ESB_ADDR,
} from './rawm-protocol'

/**
 * Convert a hex address string to byte array.
 */
function esbAddrToBytes(addr: string): number[] {
  const bytes: number[] = []
  for (let i = 0; i < addr.length; i += 2) {
    bytes.push(parseInt(addr.substr(i, 2), 16) & 0xff)
  }
  return bytes
}

/**
 * Build payload for pairing a mouse with a wireless receiver.
 *
 * Original (library.formatted.js:9106):
 *   [CMD_CONFIG, 0x00, CONFIG_TYPE_SET_ESB_ADDR, <addr bytes>, channel, isSlow ? 1 : 0]
 */
export function buildSetEsbAddrPayload(
  addr: string,
  channel: number,
  isSlow: boolean
): number[] {
  return [
    CMD_CONFIG,
    0x00,
    CONFIG_TYPE_SET_ESB_ADDR,
    ...esbAddrToBytes(addr),
    channel & 0xff,
    isSlow ? 1 : 0,
  ]
}

/**
 * Build payload for clearing (unpairing) a receiver address.
 *
 * Original (library.formatted.js:9095):
 *   [CMD_CONFIG, 0x00, CONFIG_TYPE_CLEAR_ESB_ADDR, <addr bytes>]
 */
export function buildClearEsbAddrPayload(addr: string): number[] {
  return [CMD_CONFIG, 0x00, CONFIG_TYPE_CLEAR_ESB_ADDR, ...esbAddrToBytes(addr)]
}

/**
 * Build payload for selecting an already-paired receiver.
 *
 * Original (library.formatted.js:9084):
 *   [CMD_CONFIG, 0x00, CONFIG_TYPE_SELECT_ESB_ADDR, <addr bytes>]
 */
export function buildSelectEsbAddrPayload(addr: string): number[] {
  return [CMD_CONFIG, 0x00, CONFIG_TYPE_SELECT_ESB_ADDR, ...esbAddrToBytes(addr)]
}
