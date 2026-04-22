/**
 * RAWM Macro Encode / Decode Engine
 *
 * Ports:
 *   - send_event_config_macro() ... macro packet builder with segmentation
 *   - Macro action serialization / deserialization
 *
 * Macro actions are encoded as 9-byte records:
 *   [x_lo, x_hi, y_lo, y_hi, delay_lo, delay_hi, key_lo, key_hi, style]
 * followed by an optional loop-count (2 bytes) if loop > 1.
 *
 * For keyboard-style keys (MOUSE_KEY_TYPE_KBD etc.) additional bytes follow:
 *   [type|loop_flag, [loop_lo, loop_hi], key_bytes..., delay_lo, delay_hi]
 */

import {
  CMD_CONFIG,
  CONFIG_TYPE_MACRO,
  CONFIG_TYPE_MACRO_APPEND,
  CONFIG_TYPE_TOUCH,
  MOUSE_KEY_TYPE_KBD,
  MOUSE_KEY_TYPE_MOVE,
  MOUSE_KEY_TYPE_POSITION,
  MOUSE_KEY_TYPE_WHEEL,
  MOUSE_KEY_TYPE_AC_PAN,
  SCAN_CODE_MOUSE_START,
  SCAN_CODE_MEDIA_START,
  WM_KEYDOWN,
  WM_KEYUP,
  WM_MOUSEMOVE,
  WM_MOUSEWHEEL,
  WM_MOUSEHWHEEL,
  WM_MOUSEPOSITION,
} from './rawm-protocol'

import type { MacroAction } from './rawm-device'

// ============================================================================
// Encode
// ============================================================================

function encodeMacroAction(action: MacroAction): number[] {
  const bytes: number[] = []

  bytes.push(action.mouse_x & 0xff)
  bytes.push((action.mouse_x >> 8) & 0xff)
  bytes.push(action.mouse_y & 0xff)
  bytes.push((action.mouse_y >> 8) & 0xff)
  bytes.push(action.delay & 0xff)
  bytes.push((action.delay >> 8) & 0xff)
  bytes.push(action.key_code & 0xff)
  bytes.push((action.key_code >> 8) & 0xff)

  let style = 0
  let keyType = MOUSE_KEY_TYPE_KBD
  let encodedKey = action.key_code

  if (action.event === WM_MOUSEMOVE) {
    keyType = MOUSE_KEY_TYPE_MOVE
    encodedKey = action.key_code
  } else if (action.event === WM_MOUSEPOSITION) {
    keyType = MOUSE_KEY_TYPE_POSITION
    encodedKey = action.key_code
  } else if (action.event === WM_MOUSEWHEEL) {
    keyType = MOUSE_KEY_TYPE_WHEEL
    encodedKey = action.key_code + 0x40
  } else if (action.event === WM_MOUSEHWHEEL) {
    keyType = MOUSE_KEY_TYPE_AC_PAN
    encodedKey = action.key_code + 0x40
  } else {
    // Keyboard / media key
    if (action.key_code >= SCAN_CODE_MEDIA_START) {
      keyType = MOUSE_KEY_TYPE_KBD // firmware reclassifies at parse time
    } else if (action.key_code >= SCAN_CODE_MOUSE_START) {
      keyType = MOUSE_KEY_TYPE_KBD
    }
  }

  bytes.push(style)

  // Touch type tag for macro containers (CONFIG_TYPE_TOUCH)
  if (style === CONFIG_TYPE_TOUCH) {
    bytes.push(0) // TOUCH_TYPE_NORMAL placeholder
  }

  // Loop count
  const loop = 1 // default; original library stores loop per action but our model doesn't
  if (loop > 1) {
    bytes.push(loop & 0xff)
    bytes.push((loop >> 8) & 0xff)
  }

  // Key-type byte with loop flag
  const loopFlag = loop > 1 ? 0x80 : 0x00
  bytes.push(keyType | loopFlag)

  if (loop > 1) {
    bytes.push(loop & 0xff)
    bytes.push((loop >> 8) & 0xff)
  }

  // Key-specific payload
  if (keyType === MOUSE_KEY_TYPE_MOVE) {
    const x = (encodedKey >> 16) & 0xffff
    const y = encodedKey & 0xffff
    bytes.push(x & 0xff)
    bytes.push(((x >> 8) & 0x0f) | ((y >> 4) & 0xf0))
    bytes.push(y & 0xff)
  } else if (keyType === MOUSE_KEY_TYPE_POSITION) {
    const x = (encodedKey >> 16) & 0xffff
    const y = encodedKey & 0xffff
    bytes.push(x & 0xff)
    bytes.push((x >> 8) & 0xff)
    bytes.push(y & 0xff)
    bytes.push((y >> 8) & 0xff)
  } else if (keyType === MOUSE_KEY_TYPE_WHEEL || keyType === MOUSE_KEY_TYPE_AC_PAN) {
    bytes.push(encodedKey & 0xff)
  } else {
    // KBD / MKEY / MEDIA
    const touchEvent = action.event === WM_KEYDOWN ? 0 : 2 // TOUCH_EVENT_DOWN / TOUCH_EVENT_UP
    bytes.push(encodedKey & 0xff)
    bytes.push(touchEvent)
  }

  bytes.push(action.delay & 0xff)
  bytes.push((action.delay >> 8) & 0xff)

  return bytes
}

/**
 * Encode an array of macro actions into a flat byte array.
 */
export function encodeMacroActions(actions: MacroAction[]): number[] {
  const bytes: number[] = []
  for (const action of actions) {
    bytes.push(...encodeMacroAction(action))
  }
  return bytes
}

// ============================================================================
// Packet Builder (segmented upload)
// ============================================================================

export interface MacroPacketSegment {
  payload: number[]
  isFirst: boolean
  segmentIndex: number
  hasMore: boolean
}

/**
 * Build macro upload segments.
 *
 * Original (library.formatted.js:9303):
 *   Each segment = [CMD_CONFIG, 0x00, type, keyIds.length, ...keyIds,
 *                   macroIndex, triggerType, segLen, ...actionBytes,
 *                   0x00, macroNameLen, segmentIndex]
 *
 *   type = CONFIG_TYPE_MACRO for first segment, CONFIG_TYPE_MACRO_APPEND for rest.
 */
export function buildMacroSegments(
  keyIds: number[],
  macroIndex: number,
  triggerType: number,
  actions: MacroAction[],
  macroName: string,
  segmentSize: number = 0x38 // 56 bytes per segment
): MacroPacketSegment[] {
  const actionBytes = encodeMacroActions(actions)
  const segments: MacroPacketSegment[] = []

  for (let offset = 0; offset < actionBytes.length; offset += segmentSize) {
    const isFirst = offset === 0
    const type = isFirst ? CONFIG_TYPE_MACRO : CONFIG_TYPE_MACRO_APPEND
    const chunk = actionBytes.slice(offset, offset + segmentSize)
    const hasMore = offset + segmentSize < actionBytes.length

    const payload: number[] = [
      CMD_CONFIG,
      0x00,
      type,
      keyIds.length,
      ...keyIds,
      macroIndex,
      triggerType,
      chunk.length,
      ...chunk,
      0x00,
      macroName.length & 0xff,
      (macroName.length >> 8) & 0xff,
    ]

    for (let i = 0; i < macroName.length; i++) {
      payload.push(macroName.charCodeAt(i) & 0xff)
    }

    const segIndex = offset / segmentSize
    payload.push(segIndex | (hasMore ? 0x80 : 0x00))

    segments.push({
      payload,
      isFirst,
      segmentIndex: segIndex,
      hasMore,
    })
  }

  return segments
}

// ============================================================================
// Decode (for reading macro data back from device)
// ============================================================================

/**
 * Decode macro actions from raw firmware bytes.
 *
 * This is the inverse of encodeMacroAction. Because the encoding is
 * context-sensitive (keyType changes the byte layout), decoding requires
 * streaming through the bytes.
 *
 * The encoded layout per action (loop == 1, which is our current default):
 *   [0-1] mouse_x
 *   [2-3] mouse_y
 *   [4-5] delay
 *   [6-7] key_code
 *   [8]   style (always 0 in current encoder)
 *   [9]   touch_type (0 because style === CONFIG_TYPE_TOUCH)
 *   [10]  keyType | loopFlag
 *   [11+] key-specific bytes
 *   [last-1, last] trailing delay
 */
export function decodeMacroActions(data: Uint8Array): MacroAction[] {
  const actions: MacroAction[] = []
  let i = 0

  while (i + 9 <= data.length) {
    const mouseX = data[i] | (data[i + 1] << 8)
    const mouseY = data[i + 2] | (data[i + 3] << 8)
    const delay = data[i + 4] | (data[i + 5] << 8)
    const keyCode = data[i + 6] | (data[i + 7] << 8)
    let style = data[i + 8]
    i += 9

    // Current encoder always pushes touch_type == 0 because style is 0
    // and CONFIG_TYPE_TOUCH === 0x00. Be defensive for future changes.
    if (style === CONFIG_TYPE_TOUCH && i < data.length) {
      i++ // consume touch_type placeholder
    }

    let loop = 1
    let keyType: number

    // Loop flag lives on the keyType byte in the encoder, not on style.
    // The decoder below checks style & 0x80 for compatibility with other
    // firmware variants, but our encoder never sets it there.
    if (style & 0x80) {
      if (i + 2 > data.length) break
      loop = data[i] | (data[i + 1] << 8)
      i += 2
      if (i >= data.length) break
      keyType = data[i++] & 0x7f
    } else {
      if (i >= data.length) break
      keyType = data[i++] & 0x7f
    }

    // Consume key-specific tail bytes
    let event = WM_KEYDOWN

    if (keyType === MOUSE_KEY_TYPE_MOVE) {
      if (i + 3 > data.length) break
      const xLo = data[i++]
      const xHi = data[i++]
      const yLo = data[i++]
      // Reconstruct packed coordinates the same way the encoder packs them
      const x = xLo | ((xHi & 0x0f) << 8)
      const y = yLo | ((xHi & 0xf0) << 4)
      event = WM_MOUSEMOVE
      // Store reconstructed coordinates back into key_code for round-trip fidelity
      // (the encoder packs x into upper 16 bits and y into lower 16 bits)
      // keyCode already holds the original packed value from the base record,
      // so we leave it untouched.
    } else if (keyType === MOUSE_KEY_TYPE_POSITION) {
      if (i + 4 > data.length) break
      i += 4
      event = WM_MOUSEPOSITION
    } else if (keyType === MOUSE_KEY_TYPE_WHEEL) {
      if (i + 1 > data.length) break
      i++
      event = WM_MOUSEWHEEL
    } else if (keyType === MOUSE_KEY_TYPE_AC_PAN) {
      if (i + 1 > data.length) break
      i++
      event = WM_MOUSEHWHEEL
    } else {
      // KBD / MKEY / MEDIA: [encodedKey, touchEvent]
      if (i + 2 > data.length) break
      const encodedKey = data[i++]
      const touchEvent = data[i++]
      // Map touchEvent back to WM_* event
      if (touchEvent === 2) {
        event = WM_KEYUP
      } else {
        event = WM_KEYDOWN
      }
      // encodedKey could differ from base keyCode for media/mouse keys;
      // the base record already stores the correct scan-code, so no override needed.
    }

    // Trailing delay (duplicated from base record)
    if (i + 2 > data.length) break
    const trailingDelay = data[i] | (data[i + 1] << 8)
    i += 2

    actions.push({
      event,
      key_code: keyCode,
      delay: trailingDelay,
      mouse_x: mouseX,
      mouse_y: mouseY,
    })
  }

  return actions
}
