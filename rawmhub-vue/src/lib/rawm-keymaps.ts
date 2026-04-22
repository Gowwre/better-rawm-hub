/**
 * RAWM Key Mapping Tables
 *
 * Pure-data port of the key tables from lib.deobfuscated.js lines 1-720.
 * No UI coupling, no jQuery, no layui — just static lookup tables.
 *
 * Structures:
 *   PcKeyInfo        … generic descriptor (mouse / keyboard / media)
 *   KbdPcKeyInfo     … keyboard matrix descriptor (+ row, col, rect, keyId)
 *   PcSelectKeyInfo  … remappable source key descriptor
 */

export interface PcKeyInfo {
  type: number // 0=modifier, 1=mouse, 2=keyboard, 3=media
  vCode: number // Windows virtual-key code
  name: string // human-readable label
  aCode: number // Android key code
  aName: string // Android key name
  sCode: number // USB HID scan code
}

export interface KbdPcKeyInfo extends PcKeyInfo {
  keyId: number // firmware key ID (remappable target)
  row: number // physical matrix row
  col: number // physical matrix column
  rect: number[] // [x, y, w, h] for UI rendering
}

export interface PcSelectKeyInfo {
  type: number
  vCode: number
  name: string
  aCode: number
  aName: string
  sCode: number
  keyId: number
  rect: number[]
}

// =============================================================================
// Modifiers
// =============================================================================

export const MODIFIERS: PcKeyInfo[] = [
  { type: 0, vCode: 0x00, name: 'None', aCode: 0x00, aName: 'KEY_NONE', sCode: 0x00 },
  { type: 0, vCode: 0x11, name: 'Ctrl', aCode: 0x00, aName: 'KEY_NONE', sCode: 0x00 },
  { type: 0, vCode: 0x12, name: 'Alt', aCode: 0x00, aName: 'KEY_NONE', sCode: 0x00 },
  { type: 0, vCode: 0x10, name: 'Shift', aCode: 0x00, aName: 'KEY_NONE', sCode: 0x00 },
  { type: 0, vCode: 0x5b, name: 'Win', aCode: 0x00, aName: 'KEY_NONE', sCode: 0x00 },
]

// =============================================================================
// Mouse Buttons + Scroll Wheels
// =============================================================================

export const MOUSE_BUTTONS: PcKeyInfo[] = [
  { type: 1, vCode: 0xff + 1, name: 'M1', aCode: 0x00, aName: 'M1', sCode: 0xff + 1 },
  { type: 1, vCode: 0xff + 2, name: 'M2', aCode: 0x00, aName: 'M2', sCode: 0xff + 2 },
  { type: 1, vCode: 0xff + 3, name: 'M3', aCode: 0x00, aName: 'M3', sCode: 0xff + 3 },
  { type: 1, vCode: 0xff + 4, name: 'M4 / DPI', aCode: 0x00, aName: 'M4', sCode: 0xff + 4 },
  { type: 1, vCode: 0xff + 5, name: 'M5 / Sniper', aCode: 0x00, aName: 'M5', sCode: 0xff + 5 },
  { type: 1, vCode: 0xff + 6, name: 'M6', aCode: 0x00, aName: 'M6', sCode: 0xff + 6 },
  { type: 1, vCode: 0xff + 7, name: 'M7', aCode: 0x00, aName: 'M7', sCode: 0xff + 7 },
  { type: 1, vCode: 0xff + 8, name: 'M8', aCode: 0x00, aName: 'M8', sCode: 0xff + 8 },
]

export const MOUSE_WHEELS: PcKeyInfo[] = [
  { type: 1, vCode: 0x400, name: 'Wheel Up', aCode: 0x00, aName: 'KEY_WHEEL_UP', sCode: 0x400 },
  { type: 1, vCode: 0x401, name: 'Wheel Down', aCode: 0x00, aName: 'KEY_WHEEL_DOWN', sCode: 0x401 },
  { type: 1, vCode: 0x402, name: 'Wheel Left', aCode: 0x00, aName: 'KEY_WHEEL_LEFT', sCode: 0x402 },
  { type: 1, vCode: 0x403, name: 'Wheel Right', aCode: 0x00, aName: 'KEY_WHEEL_RIGHT', sCode: 0x403 },
]

// =============================================================================
// Keyboard Keys (Alphanumeric + Symbols + Function + Navigation)
// =============================================================================

export const KEYBOARD_KEYS: PcKeyInfo[] = [
  // Numbers row
  { type: 2, vCode: 0x31, name: '1', aCode: 0x08, aName: 'NUM1', sCode: 0x1e },
  { type: 2, vCode: 0x32, name: '2', aCode: 0x09, aName: 'NUM2', sCode: 0x1f },
  { type: 2, vCode: 0x33, name: '3', aCode: 0x0a, aName: 'NUM3', sCode: 0x20 },
  { type: 2, vCode: 0x34, name: '4', aCode: 0x0b, aName: 'NUM4', sCode: 0x21 },
  { type: 2, vCode: 0x35, name: '5', aCode: 0x0c, aName: 'NUM5', sCode: 0x22 },
  { type: 2, vCode: 0x36, name: '6', aCode: 0x0d, aName: 'NUM6', sCode: 0x23 },
  { type: 2, vCode: 0x37, name: '7', aCode: 0x0e, aName: 'NUM7', sCode: 0x24 },
  { type: 2, vCode: 0x38, name: '8', aCode: 0x0f, aName: 'NUM8', sCode: 0x25 },
  { type: 2, vCode: 0x39, name: '9', aCode: 0x10, aName: 'NUM9', sCode: 0x26 },
  { type: 2, vCode: 0x30, name: '0', aCode: 0x07, aName: 'NUM0', sCode: 0x27 },

  // Letters
  { type: 2, vCode: 0x41, name: 'A', aCode: 0x1d, aName: 'A', sCode: 0x04 },
  { type: 2, vCode: 0x42, name: 'B', aCode: 0x1e, aName: 'B', sCode: 0x05 },
  { type: 2, vCode: 0x43, name: 'C', aCode: 0x1f, aName: 'C', sCode: 0x06 },
  { type: 2, vCode: 0x44, name: 'D', aCode: 0x20, aName: 'D', sCode: 0x07 },
  { type: 2, vCode: 0x45, name: 'E', aCode: 0x21, aName: 'E', sCode: 0x08 },
  { type: 2, vCode: 0x46, name: 'F', aCode: 0x22, aName: 'F', sCode: 0x09 },
  { type: 2, vCode: 0x47, name: 'G', aCode: 0x23, aName: 'G', sCode: 0x0a },
  { type: 2, vCode: 0x48, name: 'H', aCode: 0x24, aName: 'H', sCode: 0x0b },
  { type: 2, vCode: 0x49, name: 'I', aCode: 0x25, aName: 'I', sCode: 0x0c },
  { type: 2, vCode: 0x4a, name: 'J', aCode: 0x26, aName: 'J', sCode: 0x0d },
  { type: 2, vCode: 0x4b, name: 'K', aCode: 0x27, aName: 'K', sCode: 0x0e },
  { type: 2, vCode: 0x4c, name: 'L', aCode: 0x28, aName: 'L', sCode: 0x0f },
  { type: 2, vCode: 0x4d, name: 'M', aCode: 0x29, aName: 'M', sCode: 0x10 },
  { type: 2, vCode: 0x4e, name: 'N', aCode: 0x2a, aName: 'N', sCode: 0x11 },
  { type: 2, vCode: 0x4f, name: 'O', aCode: 0x2b, aName: 'O', sCode: 0x12 },
  { type: 2, vCode: 0x50, name: 'P', aCode: 0x2c, aName: 'P', sCode: 0x13 },
  { type: 2, vCode: 0x51, name: 'Q', aCode: 0x2d, aName: 'Q', sCode: 0x14 },
  { type: 2, vCode: 0x52, name: 'R', aCode: 0x2e, aName: 'R', sCode: 0x15 },
  { type: 2, vCode: 0x53, name: 'S', aCode: 0x2f, aName: 'S', sCode: 0x16 },
  { type: 2, vCode: 0x54, name: 'T', aCode: 0x30, aName: 'T', sCode: 0x17 },
  { type: 2, vCode: 0x55, name: 'U', aCode: 0x31, aName: 'U', sCode: 0x18 },
  { type: 2, vCode: 0x56, name: 'V', aCode: 0x32, aName: 'V', sCode: 0x19 },
  { type: 2, vCode: 0x57, name: 'W', aCode: 0x33, aName: 'W', sCode: 0x1a },
  { type: 2, vCode: 0x58, name: 'X', aCode: 0x34, aName: 'X', sCode: 0x1b },
  { type: 2, vCode: 0x59, name: 'Y', aCode: 0x35, aName: 'Y', sCode: 0x1c },
  { type: 2, vCode: 0x5a, name: 'Z', aCode: 0x36, aName: 'Z', sCode: 0x1d },

  // Function keys
  { type: 2, vCode: 0x70, name: 'F1', aCode: 0x83, aName: 'F1', sCode: 0x3a },
  { type: 2, vCode: 0x71, name: 'F2', aCode: 0x84, aName: 'F2', sCode: 0x3b },
  { type: 2, vCode: 0x72, name: 'F3', aCode: 0x85, aName: 'F3', sCode: 0x3c },
  { type: 2, vCode: 0x73, name: 'F4', aCode: 0x86, aName: 'F4', sCode: 0x3d },
  { type: 2, vCode: 0x74, name: 'F5', aCode: 0x87, aName: 'F5', sCode: 0x3e },
  { type: 2, vCode: 0x75, name: 'F6', aCode: 0x88, aName: 'F6', sCode: 0x3f },
  { type: 2, vCode: 0x76, name: 'F7', aCode: 0x89, aName: 'F7', sCode: 0x40 },
  { type: 2, vCode: 0x77, name: 'F8', aCode: 0x8a, aName: 'F8', sCode: 0x41 },
  { type: 2, vCode: 0x78, name: 'F9', aCode: 0x8b, aName: 'F9', sCode: 0x42 },
  { type: 2, vCode: 0x79, name: 'F10', aCode: 0x8c, aName: 'KEY_F10', sCode: 0x43 },
  { type: 2, vCode: 0x7a, name: 'F11', aCode: 0x8d, aName: 'KEY_F11', sCode: 0x44 },
  { type: 2, vCode: 0x7b, name: 'F12', aCode: 0x8e, aName: 'KEY_F12', sCode: 0x45 },

  // Symbols + control
  { type: 2, vCode: 0x1b, name: 'Esc', aCode: 0x6f, aName: 'KEY_ESC', sCode: 0x29 },
  { type: 2, vCode: 0xc0, name: '` ~', aCode: 0x44, aName: 'KEY_TILDE', sCode: 0x35 },
  { type: 2, vCode: 0xbd, name: '-', aCode: 0x45, aName: 'UNDERSCORE', sCode: 0x2d },
  { type: 2, vCode: 0xbb, name: '=  +', aCode: 0x46, aName: 'KEY_EQUAL', sCode: 0x2e },
  { type: 2, vCode: 0x08, name: 'Backspace', aCode: 0x43, aName: 'BACKSPACE', sCode: 0x2a },
  { type: 2, vCode: 0x09, name: 'Tab', aCode: 0x3d, aName: 'KEY_TAB', sCode: 0x2b },
  { type: 2, vCode: 0xdb, name: '[  {', aCode: 0x47, aName: 'KEY_LEFT_BRACE', sCode: 0x2f },
  { type: 2, vCode: 0xdd, name: ']  }', aCode: 0x48, aName: 'KEY_RIGHT_BRACE', sCode: 0x30 },
  { type: 2, vCode: 0xdc, name: '\\  |', aCode: 0x49, aName: 'KEY_VERTICAL_BAR', sCode: 0x31 },
  { type: 2, vCode: 0x14, name: 'Caps Lock', aCode: 0x73, aName: 'CAPSLOCK', sCode: 0x39 },
  { type: 2, vCode: 0xba, name: ';  :', aCode: 0x4a, aName: 'KEY_COLON', sCode: 0x33 },
  { type: 2, vCode: 0xde, name: "'  \"", aCode: 0x4b, aName: 'KEY_QUOTE', sCode: 0x34 },
  { type: 2, vCode: 0x0d, name: 'Enter', aCode: 0x42, aName: 'ENTER', sCode: 0x28 },
  { type: 2, vCode: 0xbc, name: ',  <', aCode: 0x37, aName: 'KEY_LESS_THAN', sCode: 0x36 },
  { type: 2, vCode: 0xa0, name: 'L Shift', aCode: 0x3b, aName: 'KEY_SHIFT', sCode: 0xe1 },
  { type: 2, vCode: 0xbe, name: '.  >', aCode: 0x38, aName: 'KEY_GREAT_THAN', sCode: 0x37 },
  { type: 2, vCode: 0xbf, name: '/  ?', aCode: 0x4c, aName: 'QUESTION', sCode: 0x38 },
  { type: 2, vCode: 0xa1, name: 'R Shift', aCode: 0x3c, aName: 'KEY_SHIFT_R', sCode: 0xe5 },
  { type: 2, vCode: 0xa2, name: 'L Ctrl', aCode: 0x71, aName: 'KEY_CTRL', sCode: 0xe0 },
  { type: 2, vCode: 0x5b, name: 'L Win', aCode: 0xab, aName: 'KEY_WINDOWS', sCode: 0xe3 },
  { type: 2, vCode: 0xa4, name: 'L Alt', aCode: 0x39, aName: 'ALT', sCode: 0xe2 },
  { type: 2, vCode: 0x20, name: 'Space', aCode: 0x3e, aName: 'KEY_SPACE', sCode: 0x2c },
  { type: 2, vCode: 0xa5, name: 'R Alt', aCode: 0x3a, aName: 'KEY_ALT_R', sCode: 0xe6 },
  { type: 2, vCode: 0x5d, name: 'App / Fn', aCode: 0xbb, aName: 'KEY_APP', sCode: 0x65 },
  { type: 2, vCode: 0xa3, name: 'R Ctrl', aCode: 0x72, aName: 'CTRLR', sCode: 0xe4 },

  // Navigation + lock
  { type: 2, vCode: 0x2c, name: 'Print', aCode: 0x78, aName: 'PRINT', sCode: 0x46 },
  { type: 2, vCode: 0x91, name: 'Scroll', aCode: 0x74, aName: 'KEY_SCROLL', sCode: 0x47 },
  { type: 2, vCode: 0x13, name: 'Pause', aCode: 0x79, aName: 'PAUSE', sCode: 0x48 },
  { type: 2, vCode: 0x2d, name: 'Insert', aCode: 0x7c, aName: 'INSERT', sCode: 0x49 },
  { type: 2, vCode: 0x24, name: 'Home', aCode: 0x03, aName: 'KEY_HOME', sCode: 0x4a },
  { type: 2, vCode: 0x21, name: 'Page Up', aCode: 0x5c, aName: 'KEY_PAGEUP', sCode: 0x4b },
  { type: 2, vCode: 0x2e, name: 'Delete', aCode: 0x70, aName: 'KEY_DELETE', sCode: 0x4c },
  { type: 2, vCode: 0x23, name: 'End', aCode: 0x7b, aName: 'KEY_END', sCode: 0x4d },
  { type: 2, vCode: 0x22, name: 'Page Down', aCode: 0x5d, aName: 'KEY_PAGEDOWN', sCode: 0x4e },
  { type: 2, vCode: 0x26, name: '↑', aCode: 0x13, aName: 'KEY_UP_ARROW', sCode: 0x52 },
  { type: 2, vCode: 0x28, name: '↓', aCode: 0x14, aName: 'KEY_DOWN_ARROW', sCode: 0x51 },
  { type: 2, vCode: 0x25, name: '←', aCode: 0x15, aName: 'KEY_LEFT_ARROW', sCode: 0x50 },
  { type: 2, vCode: 0x27, name: '→', aCode: 0x16, aName: 'RIGHTARROW', sCode: 0x4f },

  // Numpad
  { type: 2, vCode: 0x60, name: 'Num 0', aCode: 0x90, aName: 'KPD0', sCode: 0x62 },
  { type: 2, vCode: 0x61, name: 'Num 1', aCode: 0x91, aName: 'KPD1', sCode: 0x59 },
  { type: 2, vCode: 0x62, name: 'Num 2', aCode: 0x92, aName: 'KPD2', sCode: 0x5a },
  { type: 2, vCode: 0x63, name: 'Num 3', aCode: 0x93, aName: 'KPD3', sCode: 0x5b },
  { type: 2, vCode: 0x64, name: 'Num 4', aCode: 0x94, aName: 'KPD4', sCode: 0x5c },
  { type: 2, vCode: 0x65, name: 'Num 5', aCode: 0x95, aName: 'KPD5', sCode: 0x5d },
  { type: 2, vCode: 0x66, name: 'Num 6', aCode: 0x96, aName: 'KPD6', sCode: 0x5e },
  { type: 2, vCode: 0x67, name: 'Num 7', aCode: 0x97, aName: 'KPD7', sCode: 0x5f },
  { type: 2, vCode: 0x68, name: 'Num 8', aCode: 0x98, aName: 'KPD8', sCode: 0x60 },
  { type: 2, vCode: 0x69, name: 'Num 9', aCode: 0x99, aName: 'KPD9', sCode: 0x61 },
  { type: 2, vCode: 0x90, name: 'Num Lock', aCode: 0x8f, aName: 'KEY_NUMLOCK', sCode: 0x53 },
  { type: 2, vCode: 0x6f, name: 'Num /', aCode: 0x9a, aName: 'KPDSLASH', sCode: 0x54 },
  { type: 2, vCode: 0x6a, name: 'Num *', aCode: 0x9b, aName: 'KEY_KPD_STAR', sCode: 0x55 },
  { type: 2, vCode: 0x6d, name: 'Num -', aCode: 0x9c, aName: 'KEY_KPD_MINUS', sCode: 0x56 },
  { type: 2, vCode: 0x6b, name: 'Num +', aCode: 0x9d, aName: 'KEY_KPD_PLUS', sCode: 0x57 },
  { type: 2, vCode: 0x6e, name: 'Num .', aCode: 0x9e, aName: 'KEY_KPD_DOT', sCode: 0x63 },
  { type: 2, vCode: 0x0e, name: 'Num Enter', aCode: 0xa0, aName: 'KEY_KPD_ENTER', sCode: 0x58 },
]

// =============================================================================
// Media Keys
// =============================================================================

export const MEDIA_KEYS: PcKeyInfo[] = [
  { type: 3, vCode: 0x200 + 1, name: 'Media Prev', aCode: 0x00, aName: 'MEDIAPREV', sCode: 0x200 + 1 },
  { type: 3, vCode: 0x200 + 2, name: 'Media Next', aCode: 0x00, aName: 'MEDIANEXT', sCode: 0x200 + 2 },
  { type: 3, vCode: 0x200 + 3, name: 'Media Stop', aCode: 0x00, aName: 'MEDIASTOP', sCode: 0x200 + 3 },
  { type: 3, vCode: 0x200 + 4, name: 'Media Play/Pause', aCode: 0x00, aName: 'MEDIAPLAY', sCode: 0x200 + 4 },
  { type: 3, vCode: 0x200 + 5, name: 'Media Mute', aCode: 0x00, aName: 'MUTE', sCode: 0x200 + 5 },
  { type: 3, vCode: 0x200 + 6, name: 'Media Vol+', aCode: 0x00, aName: 'VOLUP', sCode: 0x200 + 6 },
  { type: 3, vCode: 0x200 + 7, name: 'Media Vol-', aCode: 0x00, aName: 'VOLDOWN', sCode: 0x200 + 7 },
  { type: 3, vCode: 0x200 + 8, name: 'Media Select', aCode: 0x00, aName: 'MEDIASELECT', sCode: 0x200 + 8 },
  { type: 3, vCode: 0x200 + 9, name: 'Mail', aCode: 0x00, aName: 'Mail', sCode: 0x200 + 9 },
  { type: 3, vCode: 0x200 + 10, name: 'Calculator', aCode: 0x00, aName: 'CALC', sCode: 0x200 + 10 },
  { type: 3, vCode: 0x200 + 11, name: 'My Computer', aCode: 0x00, aName: 'MYCOMPUTER', sCode: 0x200 + 11 },
  { type: 3, vCode: 0x200 + 12, name: 'WWW Search', aCode: 0x00, aName: 'WWWSEARCH', sCode: 0x200 + 12 },
  { type: 3, vCode: 0x200 + 13, name: 'WWW Home', aCode: 0x00, aName: 'WWWHOME', sCode: 0x200 + 13 },
  { type: 3, vCode: 0x200 + 14, name: 'WWW Back', aCode: 0x00, aName: 'WWWBACK', sCode: 0x200 + 14 },
  { type: 3, vCode: 0x200 + 15, name: 'WWW Forward', aCode: 0x00, aName: 'WWWFORWARD', sCode: 0x200 + 15 },
  { type: 3, vCode: 0x200 + 16, name: 'WWW Stop', aCode: 0x00, aName: 'WWWSTOP', sCode: 0x200 + 16 },
  { type: 3, vCode: 0x200 + 17, name: 'WWW Refresh', aCode: 0x00, aName: 'WWWREFRESH', sCode: 0x200 + 17 },
  { type: 3, vCode: 0x200 + 18, name: 'Favorites', aCode: 0x00, aName: 'FAVORITES', sCode: 0x200 + 18 },
]

// =============================================================================
// Unified Arrays
// =============================================================================

/** All mouse + keyboard + media keys (used by the original `keys` array). */
export const KEYS: PcKeyInfo[] = [...MOUSE_BUTTONS, ...MOUSE_WHEELS, ...KEYBOARD_KEYS, ...MEDIA_KEYS]

/** Macro keys = KEYS + MOUSE_MOVE + MOUSE_POSITION. */
export const MACRO_KEYS: PcKeyInfo[] = [
  { type: 1, vCode: 0x404, name: 'Mouse Move', aCode: 0x00, aName: 'KEY_MOUSE_MOVE', sCode: 0x404 },
  { type: 1, vCode: 0x405, name: 'Mouse Position', aCode: 0x00, aName: 'MOUSEPOSITION', sCode: 0x405 },
  ...KEYS,
]

/** Mouse-selectable keys for the mouse button mapping UI. */
export const MOUSE_SELECT_KEYS: PcKeyInfo[] = [...MOUSE_BUTTONS, ...MOUSE_WHEELS]

/** Keyboard RGB control shortcuts. */
export const KBD_RGB_KEYS: PcKeyInfo[] = [
  { type: 2, vCode: 0x3b, name: 'RGB Toggle', aCode: 0x00, aName: 'F1', sCode: 0x3a },
  { type: 2, vCode: 0x3c, name: 'RGB Mode+', aCode: 0x00, aName: 'F2', sCode: 0x3b },
  { type: 2, vCode: 0x3d, name: 'RGB Mode-', aCode: 0x00, aName: 'F3', sCode: 0x3c },
  { type: 2, vCode: 0x3e, name: 'RGB VAI', aCode: 0x00, aName: 'F4', sCode: 0x3d },
  { type: 2, vCode: 0x3f, name: 'RGB VAD', aCode: 0x00, aName: 'F5', sCode: 0x3e },
  { type: 2, vCode: 0x40, name: 'RGB HUI', aCode: 0x00, aName: 'F6', sCode: 0x3f },
  { type: 2, vCode: 0x41, name: 'RGB HUD', aCode: 0x00, aName: 'F7', sCode: 0x40 },
]

/** Media shortcut keys. */
export const KBD_MEDIA_KEYS: PcKeyInfo[] = MEDIA_KEYS.slice(0, 7)

/** Windows shortcut keys. */
export const KBD_WINDOWS_KEYS: PcKeyInfo[] = MEDIA_KEYS.slice(9, 15)

/** Macro trigger slots M1 … M20. */
export const KBD_MACRO_KEYS: PcKeyInfo[] = Array.from({ length: 20 }, (_, i) => ({
  type: 1,
  vCode: 0xff + i + 1,
  name: `M${i + 1}`,
  aCode: 0x00,
  aName: `M${i + 1}`,
  sCode: 0xff + i + 1,
}))

// =============================================================================
// Lookup Helpers
// =============================================================================

export function findKeyByVCode(vCode: number): PcKeyInfo | undefined {
  return KEYS.find(k => k.vCode === vCode)
}

export function findKeyByName(name: string): PcKeyInfo | undefined {
  return KEYS.find(k => k.aName === name || k.name === name)
}

export function findKeyBySCode(sCode: number): PcKeyInfo | undefined {
  return KEYS.find(k => k.sCode === sCode)
}

export function findModifierByVCode(vCode: number): PcKeyInfo | undefined {
  return MODIFIERS.find(k => k.vCode === vCode)
}

export function getKeyLabel(key: PcKeyInfo | undefined, isMac = false): string {
  if (!key) return 'Unknown'
  if (!isMac) return key.name

  // Platform-aware naming (mirrors pc_key_manager_init logic)
  switch (key.name) {
    case 'Ctrl':
      return 'Control'
    case 'L Ctrl':
      return 'L Control'
    case 'R Ctrl':
      return 'R Control'
    case 'Alt':
      return 'Option'
    case 'L Alt':
      return 'L Option'
    case 'R Alt':
      return 'R Option'
    case 'Win':
      return 'Command'
    case 'L Win':
      return 'L Command'
    default:
      return key.name
  }
}
