/**
 * RAWM Mouse Key-Mapping Packet Builders
 *
 * Ports:
 *   - send_event_mouse_key()      ... CONFIG_TYPE_MOUSE_KEY (0x16)
 *   - send_event_mouse_function() ... CONFIG_TYPE_MOUSE_FUNCTION (0x18)
 *
 * These commands remap physical mouse buttons (M1-M8, wheel, etc.) to
 * keyboard keys, media keys, macros, or special functions (DPI clutch,
 * sniper, toggle connection, etc.).
 */

import {
  CMD_CONFIG,
  CONFIG_TYPE_MOUSE_KEY,
  CONFIG_TYPE_MOUSE_FUNCTION,
  MOUSE_KEY_TYPE_KBD,
  MOUSE_KEY_TYPE_MKEY,
  MOUSE_KEY_TYPE_MOVE,
  MOUSE_KEY_TYPE_WHEEL,
  MOUSE_KEY_TYPE_MEDIA,
  MOUSE_KEY_TYPE_AC_PAN,
  MOUSE_KEY_TYPE_POSITION,
  SCAN_CODE_MOUSE_START,
  SCAN_CODE_MEDIA_START,
  SCAN_CODE_MOUSEWHEEL_UP,
  SCAN_CODE_MOUSEWHEEL_DOWN,
  SCAN_CODE_MOUSEWHEEL_LEFT,
  SCAN_CODE_MOUSEWHEEL_RIGHT,
  VK_CONTROL,
  VK_MENU,
  VK_SHIFT,
  VK_LCONTROL,
  VK_LMENU,
  VK_LSHIFT,
} from './rawm-protocol'

// ============================================================================
// Internal helpers
// ============================================================================

function normalizeVk(vk: number): number {
  if (vk === VK_LCONTROL) return VK_CONTROL
  if (vk === VK_LMENU) return VK_MENU
  if (vk === VK_LSHIFT) return VK_SHIFT
  return vk
}

function getMouseKeyTypeAndScanCode(vk: number, wheelData: number): { type: number; scanCode: number } {
  if (vk === SCAN_CODE_MOUSEWHEEL_UP) {
    return { type: MOUSE_KEY_TYPE_WHEEL, scanCode: 0x40 + wheelData }
  }
  if (vk === SCAN_CODE_MOUSEWHEEL_DOWN) {
    return { type: MOUSE_KEY_TYPE_WHEEL, scanCode: 0x40 - wheelData }
  }
  if (vk === SCAN_CODE_MOUSEWHEEL_LEFT) {
    return { type: MOUSE_KEY_TYPE_AC_PAN, scanCode: 0x40 - wheelData }
  }
  if (vk === SCAN_CODE_MOUSEWHEEL_RIGHT) {
    return { type: MOUSE_KEY_TYPE_AC_PAN, scanCode: 0x40 + wheelData }
  }
  if (vk >= SCAN_CODE_MEDIA_START) {
    return { type: MOUSE_KEY_TYPE_MEDIA, scanCode: vk - SCAN_CODE_MEDIA_START }
  }
  if (vk >= SCAN_CODE_MOUSE_START && vk < SCAN_CODE_MEDIA_START) {
    return { type: MOUSE_KEY_TYPE_MKEY, scanCode: vk - SCAN_CODE_MOUSE_START }
  }
  if (vk >= 0x404 && vk <= 0x405) {
    return { type: MOUSE_KEY_TYPE_KBD, scanCode: vk }
  }
  return { type: MOUSE_KEY_TYPE_KBD, scanCode: vk }
}

// ============================================================================
// Mouse Key Mapping (CONFIG_TYPE_MOUSE_KEY)
// ============================================================================

export interface MouseKeyMapArgs {
  keyIds: number[]
  modifier: number
  vkCode: number
  macroIndex: number
  wheelData?: number
}

/**
 * Build payload for remapping a mouse button to a key or macro.
 *
 * Original (library.formatted.js:9262):
 *   [CMD_CONFIG, 0x00, CONFIG_TYPE_MOUSE_KEY,
 *    keyIds.length, ...keyIds,
 *    keyType, scanCode, modifier, 0x00]
 */
export function buildMouseKeyPayload(args: MouseKeyMapArgs): number[] {
  const { keyIds, modifier, vkCode, macroIndex, wheelData = 0 } = args

  const normalizedVk = normalizeVk(vkCode)
  const { type, scanCode } = getMouseKeyTypeAndScanCode(normalizedVk, wheelData)

  return [
    CMD_CONFIG,
    0x00,
    CONFIG_TYPE_MOUSE_KEY,
    keyIds.length,
    ...keyIds,
    type,
    scanCode & 0xff,
    normalizeVk(modifier) & 0xff,
    macroIndex & 0xff,
    0x00,
  ]
}

// ============================================================================
// Mouse Function Mapping (CONFIG_TYPE_MOUSE_FUNCTION)
// ============================================================================

export interface MouseFunctionMapArgs {
  keyIds: number[]
  functionType: number
  param: number
  shellCmd?: string
}

/** Function types used by RAWM mice. */
export const FUNCTION_TYPE_NONE = 0x00
export const FUNCTION_TYPE_DPI_CLUTCH = 0x01
export const FUNCTION_TYPE_DPI_CYCLE_UP = 0x02
export const FUNCTION_TYPE_DPI_CYCLE_DOWN = 0x03
export const FUNCTION_TYPE_TOGGLE_ESB = 0x04
export const FUNCTION_TYPE_TOGGLE_BLE = 0x05
export const FUNCTION_TYPE_SHOW_POWER = 0x06
export const FUNCTION_TYPE_SHELL_CMD = 0x07
export const FUNCTION_TYPE_TOGGLE_GAMING_ONLY = 0x08
export const FUNCTION_TYPE_CALIB_LOD = 0x09

/**
 * Build payload for assigning a special function to a mouse button.
 *
 * Original (library.formatted.js:9280):
 *   [CMD_CONFIG, 0x00, CONFIG_TYPE_MOUSE_FUNCTION,
 *    keyIds.length, ...keyIds,
 *    functionType, param_lo, param_hi, 0x00,
 *    shellCmd.length_lo, shellCmd.length_hi, ...shellCmd.bytes]
 */
export function buildMouseFunctionPayload(args: MouseFunctionMapArgs): number[] {
  const { keyIds, functionType, param, shellCmd } = args

  const buf: number[] = [
    CMD_CONFIG,
    0x00,
    CONFIG_TYPE_MOUSE_FUNCTION,
    keyIds.length,
    ...keyIds,
    functionType,
    param & 0xff,
    (param >> 8) & 0xff,
    0x00,
  ]

  const cmd = shellCmd ?? ''
  buf.push(cmd.length & 0xff)
  buf.push((cmd.length >> 8) & 0xff)
  for (let i = 0; i < cmd.length; i++) {
    buf.push(cmd.charCodeAt(i) & 0xff)
  }

  return buf
}
