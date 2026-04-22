/**
 * RAWM Mouse Configuration Blob Builder
 *
 * Ports `send_event_mouse_param()` from lib.deobfuscated.js line ~3547.
 * This is the most critical business logic: it serializes the entire mouse
 * state into a firmware-compatible byte array.
 *
 * ⚠️  The firmware has zero tolerance for malformed packets. Every field
 *     must be in the exact order and width shown below.
 */

import type { DeviceState } from './rawm-device'
import { CONFIG_TYPE_MOUSE_PARAM, CMD_CONFIG } from './rawm-protocol'

/**
 * Build the raw mouse-param payload (before crc_process / read_event).
 *
 * Output format (from deobfuscated source):
 *   [0]  = CMD_CONFIG  (0x03)  ← overwritten by crc_process later
 *   [1]  = 0x00                 ← overwritten by crc_process later
 *   [2]  = CONFIG_TYPE_MOUSE_PARAM (0x15)
 *   [3-4]   CPI X   (uint16LE, or 0,0 if using 32-bit enhanced CPI)
 *   [5-6]   Polling rate (uint16LE)
 *   [7]     Light mode
 *   [8]     CPI levels count
 *   [9..]   CPI levels[] (uint16LE each)  — omitted if enhanced CPI
 *   [n]     Power mode
 *   [n+1]   LOD
 *   [n+2..5] CPI Y / full CPI (uint32LE if enhanced, else 0,0,0,0)
 *   [n+6]   Enhanced CPI levels count (0 if not enhanced)
 *   [n+7..] Enhanced CPI levels[] (uint32LE each)
 *   [m]     Key delay count
 *   [m+1]   Key delays length
 *   [m+2..] Key delays[] (1 byte each)
 *   [p]     Motion sync
 *   [p+1]   Angle tuning
 *   [p+2]   Angle snapping
 *   [p+3]   Ripple control
 *   [p+4]   CPI level colors length
 *   [p+5..] CPI level colors[] (1 byte each, & 0x07)
 *   [q]     TX output power
 *   [q+1]   Onboard status length
 *   [q+2..] Onboard status[] (1 byte each)
 *   [r]     Glass mode
 */
export function buildMouseParamBlob(state: DeviceState): Uint8Array {
  const buf: number[] = []

  // Header (bytes 0-2)
  buf.push(CMD_CONFIG)
  buf.push(0x00)
  buf.push(CONFIG_TYPE_MOUSE_PARAM)

  // CPI X (uint16LE)
  const cpi = state.cpi.value
  const isEnhanced = (cpi & 0xffff0000) !== 0

  if (!isEnhanced) {
    buf.push(cpi & 0xff)
    buf.push((cpi >> 8) & 0xff)
  } else {
    buf.push(0x00)
    buf.push(0x00)
  }

  // Polling rate (uint16LE)
  buf.push(state.polling_rate & 0xff)
  buf.push((state.polling_rate >> 8) & 0xff)

  // Light mode
  buf.push(state.light.mode)

  // CPI levels
  const activeLevels = state.cpi_levels.filter((l) => l.value > 0)
  const hasEnhancedLevel = activeLevels.some((l) => (l.value & 0xffff0000) !== 0)

  if (hasEnhancedLevel) {
    buf.push(0x00)
  } else {
    buf.push(activeLevels.length)
    for (const level of activeLevels) {
      buf.push(level.value & 0xff)
      buf.push((level.value >> 8) & 0xff)
    }
  }

  // Power mode
  buf.push(state.power_mode.mode)

  // LOD
  buf.push(state.lod)

  // CPI Y / full 32-bit CPI
  if (!isEnhanced) {
    buf.push(0x00, 0x00, 0x00, 0x00)
  } else {
    buf.push(cpi & 0xff)
    buf.push((cpi >> 8) & 0xff)
    buf.push((cpi >> 16) & 0xff)
    buf.push((cpi >> 24) & 0xff)
  }

  // Enhanced CPI levels
  if (!hasEnhancedLevel) {
    buf.push(0x00)
  } else {
    buf.push(activeLevels.length)
    for (const level of activeLevels) {
      buf.push(level.value & 0xff)
      buf.push((level.value >> 8) & 0xff)
      buf.push((level.value >> 16) & 0xff)
      buf.push((level.value >> 24) & 0xff)
    }
  }

  // Key delay count (number of configured delay entries)
  // The firmware supports up to 7 entries; we serialize down + up as 2 entries
  const keyDelays = [state.key_delay.down_delay, state.key_delay.up_delay]
  const nonZeroDelays = keyDelays.filter((d) => d > 0)
  buf.push(nonZeroDelays.length)

  // Key delays array
  buf.push(keyDelays.length)
  for (const delay of keyDelays) {
    buf.push(delay & 0xff)
  }

  // Motion sync
  buf.push(state.motion_sync ? 1 : 0)

  // Angle tuning
  buf.push(state.angle_tuning & 0xff)

  // Angle snapping
  buf.push(state.angle_snapping ? 1 : 0)

  // Ripple control
  buf.push(state.ripple_control ? 1 : 0)

  // CPI level colors (trimmed to active CPI count, each & 0x07)
  const colorCount = Math.min(state.cpi_level_colors.length, activeLevels.length)
  buf.push(colorCount)
  for (let i = 0; i < colorCount; i++) {
    buf.push(state.cpi_level_colors[i] & 0x07)
  }

  // TX output power
  buf.push(state.tx_output_power_applied & 0xff)

  // Onboard status
  const onboardStatus = state.onboard_status.slice(0, state.onboardNum)
  buf.push(onboardStatus.length)
  for (const status of onboardStatus) {
    buf.push(status & 0xff)
  }

  // Glass mode
  buf.push(state.glass_mode ? 1 : 0)

  return new Uint8Array(buf)
}
