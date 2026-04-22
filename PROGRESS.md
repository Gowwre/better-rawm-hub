# RAWM Native WebHID Implementation — Progress Report

**Date:** 2026-04-22  
**Status:** Phase 1 & 2 Complete (Foundation + Pairing + Mouse Core)  
**Build:** `vue-tsc -b && vite build` — **0 errors, 0 warnings**

---

## Goal

Implement a native WebHID replacement for the iframe-bridge approach in `rawmhub-vue`, bypassing the 647 KB obfuscated `library.min.js` that is tightly coupled to jQuery/layui/DOM, while maintaining byte-exact protocol compatibility with RAWM gaming mice and keyboards.

The original library (`lib.deobfuscated.js`) is a 14,517-line IIFE split into three layers:
- **UI Layer** (~350 KB) — jQuery selectors, layui form initialization, slider rendering
- **Business Logic** (~200 KB) — state management, action dispatch, macro encoding
- **Protocol Layer** (~100 KB) — HID packet builders, CRC-16, command dispatch

Only the **Protocol + Business Logic** layers are being reimplemented. The UI layer is replaced by Vue 3 reactivity and standard DOM.

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  Vue UI Layer (Components)                                                  │
│  PairPanel.vue · ConnectPanel.vue · Settings panels · Reactive refs         │
├─────────────────────────────────────────────────────────────────────────────┤
│  Composables                                                                │
│  useNativeHid.ts — bridges RawmDeviceManager → Vue reactive refs            │
│  useHidMode.ts — feature flag (native vs iframe bridge)                     │
├─────────────────────────────────────────────────────────────────────────────┤
│  Device Manager (State + Business Logic)                                    │
│  rawm-device-manager.ts — facade: pairing, settings mutators, events        │
├─────────────────────────────────────────────────────────────────────────────┤
│  HID Transport                                                              │
│  rawm-hid-client.ts — direct navigator.hid I/O + event emitter              │
├─────────────────────────────────────────────────────────────────────────────┤
│  Protocol Layer (Byte-Exact)                                                │
│  rawm-protocol.ts · rawm-crc.ts · rawm-packet.ts                            │
│  rawm-mouse-config.ts · rawm-mouse-keymap.ts · rawm-macro.ts                │
│  rawm-wireless.ts · rawm-keymaps.ts                                         │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Unidirectional Data Flow

```
HID packets → Protocol parser → DeviceState → Vue refs → Template
```

This inverts the original architecture where jQuery DOM elements were the intermediate data store and the library directly mutated them via selectors like `$('#current-usb-client-battery').text(...)`.

---

## Completed Work

### Phase 1: Foundation

#### `src/lib/rawm-protocol.ts` (431 → 530 lines)
- **68 IQ commands** (keyboard query/response opcodes)
- **15 CMD commands** (mouse/generic packet commands)
- **42 CONFIG types** (payload type identifiers)
- **36 NOTIFY types** (async device-to-host notifications)
- **PACKET/ESB/Macro/Action constants**
- **Keyboard setting types** (key, light, axis, advance key, more)
- **Key modifier masks** (LCTRL, LSHIFT, LALT, LMETA, RCTRL, RSHIFT, RALT, RMETA)
- **RAWM Vendor/Product IDs** (0x3554, 0x1915, and 18 known product IDs)
- **NEW:** Mouse Key Types (`MOUSE_KEY_TYPE_KBD` … `POSITION`)
- **NEW:** Scan Code Boundaries (`SCAN_CODE_MOUSE_START`, `SCAN_CODE_MEDIA_START`, wheel codes)
- **NEW:** VK Code Constants (`VK_SHIFT`, `VK_CONTROL`, `VK_MENU`, `VK_LSHIFT`, `VK_LCONTROL`, `VK_LMENU`)
- **NEW:** Touch Event Types (`TOUCH_EVENT_DOWN` … `POSITION`, `TOUCH_TYPE_NORMAL` … `LINK`)
- **NEW:** Property Styles (`PROPERTY_STYLE_MOUSE_KEY`, `PROPERTY_STYLE_MOUSE_ASSIST`, `PROPERTY_STYLE_MOUSE_FUNCTION`)

#### `src/lib/rawm-crc.ts` (~80 lines)
- Byte-exact `crc16Compute()` port from `lib.deobfuscated.js` line ~3370
- Used by `wrapCrcProcess()` to envelope packets before transmission

#### `src/lib/rawm-packet.ts` (219 lines)
- `wrapCrcProcess(payload, useCrc)` — adds length header + optional CRC envelope
- `formatKeyboardPacket(payload)` — pads to exactly 32 bytes for keyboard feature reports
- `buildMouseOutputReport(payload)` — builds 64-byte HID output report with length prefix
- `buildWirelessReport(payload, channel)` — prefixes ESB wireless channel byte (`0xC0 | channel`)
- `buildMousePacket(payload, options)` — full mouse pipeline (wrap → mouse report → wireless)
- `buildKeyboardPacket(payload, options)` — full keyboard pipeline (pad → wireless)
- Little-endian helpers: `writeUint16LE`, `readUint16LE`, `writeUint32LE`, `readUint32LE`

#### `src/lib/rawm-keymaps.ts` (309 lines)
- Pure-data key tables with no UI coupling
- `MODIFIERS` (5 entries), `MOUSE_BUTTONS` (8 entries), `MOUSE_WHEELS` (4 entries)
- `KEYBOARD_KEYS` (full alphanumeric, symbols, function, navigation, numpad)
- `MEDIA_KEYS` (18 entries: prev, next, stop, play, mute, vol, mail, calc, www, etc.)
- `KEYS` (unified array), `MACRO_KEYS` (KEYS + MOUSE_MOVE + MOUSE_POSITION)
- `MOUSE_SELECT_KEYS`, `KBD_RGB_KEYS`, `KBD_MEDIA_KEYS`, `KBD_WINDOWS_KEYS`, `KBD_MACRO_KEYS`
- Lookup helpers: `findKeyByVCode`, `findKeyByName`, `findKeyBySCode`, `findModifierByVCode`, `getKeyLabel`

#### `src/lib/rawm-device.ts` (372 lines)
- `DeviceState` interface with 70+ fields covering:
  - Identity (vendorId, productId, deviceName, revision, firmware)
  - Mouse sensor (CPI, polling, LOD, angle snapping/tuning, ripple control, motion sync, glass mode)
  - Wireless / power (power mode, sleep time, TX power, ESB addresses, RF channel, wireless turbo)
  - Lighting (mode, brightness, hue, saturation, auto-off, define_colors, light_box)
  - Keyboard advanced (mag axis, SOCD, MT, RS, DKS, key infos, light info, macro infos)
  - Onboard profiles (index, count, status, colors)
  - Meta (battery, rssi, lua status, shell cmd)
  - Mappings (mouse_key_mappings, mouse_function_mappings, macros)
- `createDeviceState()` factory with sensible defaults
- Classification helpers: `isKeyboard`, `isKeyboard5x15`, `isHsKeyboard`, `isGamingOnlyMode`

#### `src/lib/rawm-hid-client.ts` (381 → 410 lines)
- `RawmHidClient` class wrapping `navigator.hid`
- Event emitter pattern with typed `HidEvent` union:
  - `connected`, `disconnected`, `error`, `notify`, `config`, `iq_response`, `version`, `raw`
- Auto-detects keyboard from `productName` (Z68, keyboard)
- Supports multiple `HIDDeviceFilter[]` for pairing
- Methods: `requestDevice()`, `open()`, `close()`, `useDevice()`, `on()`, `sendRaw()`
- High-level commands: `query()` (handshake with Unix timestamp), `action()`, `ping()`, `sendMouseConfigBlob()`
- **NEW:** `startKeyboardHandshake()` — fires IQ waterfall:
  `IQ_GET_SOFT_DRV_VER` → `IQ_GET_KB_INFO` → `IQ_GET_KEYCODE_BUF` → `IQ_GET_RGB_COLOR_BUF` → `IQ_GET_MACRO_NUM` → `IQ_GET_MACRO_SIZE` → `IQ_GET_MAG_DATA`
- Receiving: accumulates reports into `recvBuf`, strips ESB prefix, parses packets by type

#### `src/lib/rawm-mouse-config.ts` (161 lines)
- `buildMouseParamBlob(state)` — serializes full mouse state into firmware-compatible bytes
- Handles both standard (uint16LE) and enhanced (uint32LE) CPI modes
- Serializes: CPI X/Y, polling rate, light mode, CPI levels, power mode, LOD,
  key delays, motion sync, angle tuning/snapping, ripple control,
  CPI level colors, TX power, onboard status, glass mode

#### `src/lib/utils.ts` (166 lines)
- `cn()` utility for Tailwind CSS class merging (fixes pre-existing UI build error)

---

### Phase 2: Pairing Logic

#### `src/lib/rawm-device-manager.ts` (497 → 640 lines)
- High-level facade with reactive `DeviceState` and observer pattern
- `pair()` — user-initiated pairing via browser HID permission dialog
- `connectToGrantedDevice()` — auto-connects to previously-granted devices on startup
- `getGrantedDevices()` — lists granted RAWM devices without connecting
- Settings mutators (update local state + notify listeners):
  `setCpi`, `setPollingRate`, `setPowerMode`, `setLod`, `setAngleSnapping`, `setAngleTuning`, `setRippleControl`, `setMotionSync`, `setSleepTime`, `setGlassMode`, `setLightMode`
- `applySettings()` — builds `buildMouseParamBlob()` → `buildMousePacket()` → `sendRaw()`
- `factoryReset()` — sends `CMD_ACTION` reboot/reset

#### HID Event Handling (complete notify parser)
Handles all 23+ mouse NOTIFY types from the original `parse_cmd()` switch statement:

| Notify Type | Field Updated |
|-------------|---------------|
| `MOUSE_CPI` | `cpi.value` (uint16LE) |
| `MOUSE_CPI2` | `cpi.value` (uint32LE), `enhancedCpi = true` |
| `MOUSE_POLLING` | `polling_rate` |
| `MOUSE_LIGHT` | `light.mode`, `.brightness`, `.hue`, `.saturation` |
| `MOUSE_POWER_MODE` | `power_mode.mode` |
| `MOUSE_LOD` | `lod` |
| `MOUSE_KEY_DELAY` | `key_delay.down_delay`, `.up_delay` |
| `MOUSE_MOTION_SYNC` | `motion_sync` |
| `MOUSE_ANGLE_TUNING` | `angle_tuning` |
| `MOUSE_ANGLE_SNAPPING` | `angle_snapping` |
| `MOUSE_RIPPLE_CONTROL` | `ripple_control` |
| `MOUSE_TX_POWER` | `tx_output_power_applied` |
| `MOUSE_BATTERY` | `battery` |
| `MOUSE_BATTERY_LEVELS` | `battery` (from last level) |
| `MOUSE_SLEEP_TIME` | `sleep_time` (uint16LE) |
| `MOUSE_RF_CHN` | `rf_channel` |
| `MOUSE_RSSI` | `rssi` (signed int8) |
| `MOUSE_ONBOARD_INDEX` | `onboardIndex` |
| `MOUSE_ONBOARD_STATUS` | `onboard_status[]` |
| `MOUSE_GLASS_MODE` | `glass_mode`, `glass_mode_enabled` |
| `MOUSE_PEER` | `esb_address_arr[]` (id + 5-byte addr + channel) |
| `MOUSE_NOACK` | `noack` |
| `MOUSE_LUA_STATUS` | `luaStatus` |
| `MOUSE_COLOR_CODE` | `colorCode` (parsed from ASCII) |
| `MOUSE_CONFIG` | **Full bulk config parser** (see below) |

#### Bulk Config Parser (`parseBulkConfig`)
Complete port of the original `NOTIFY_TYPE_MOUSE_CONFIG` handler. Parses:
1. CPI X (uint16LE)
2. Polling rate (uint16LE)
3. Light mode
4. Brightness
5. CPI levels count + array (uint16LE each)
6. Power mode
7. LOD
8. Angle snapping
9. Motion sync
10. Ripple control
11. Angle tuning
12. Sleep time (uint16LE)
13. Wireless turbo
14. Key delay count + delays array
15. CPI Y / full 32-bit CPI (uint32LE)
16. Enhanced CPI levels count + array (uint32LE each)
17. CPI level colors
18. TX output power
19. Onboard status array
20. Glass mode

---

### Phase 3: Wireless + Keymap + Macro (Just Completed)

#### `src/lib/rawm-wireless.ts` (1,831 bytes)
Port of `send_event_set_esb_addr`, `send_event_clear_esb_addr`, `send_event_select_esb_addr`:
- `buildSetEsbAddrPayload(addr, channel, isSlow)` — pair mouse with receiver
- `buildClearEsbAddrPayload(addr)` — unpair / forget receiver
- `buildSelectEsbAddrPayload(addr)` — switch active receiver
- ESB addresses are 5-byte hex strings (e.g. `"A1B2C3D4E5"`)

#### `src/lib/rawm-mouse-keymap.ts` (4,984 bytes)
Port of `send_event_mouse_key` and `send_event_mouse_function`:
- `buildMouseKeyPayload({keyIds, modifier, vkCode, macroIndex, wheelData})`
  - Handles VK normalization (LCONTROL→CONTROL, etc.)
  - Scan-code translation: KBD → MKEY → MEDIA → WHEEL → AC_PAN
  - Wheel delta encoding (+0x40 / −0x40)
- `buildMouseFunctionPayload({keyIds, functionType, param, shellCmd})`
  - Function types: DPI clutch, cycle up/down, toggle ESB/BLE, show power, shell cmd, gaming-only, calib LOD
  - Appends shell command string as trailing bytes with length prefix

#### `src/lib/rawm-macro.ts` (8,109 bytes)
Port of `send_event_config_macro`:
- `encodeMacroActions(actions)` — serializes macro actions into firmware records
  - Base record: 9 bytes `[x_lo, x_hi, y_lo, y_hi, delay_lo, delay_hi, key_lo, key_hi, style]`
  - Key-type tail: MOVE (3-byte XY), POSITION (4-byte XY), WHEEL/AC_PAN (1-byte delta), KBD (key + touchEvent)
  - Loop count support (2-byte prefix when loop > 1)
- `buildMacroSegments(keyIds, macroIndex, triggerType, actions, macroName, segmentSize)`
  - Chunks macro data into 56-byte segments
  - First segment uses `CONFIG_TYPE_MACRO` (0x05), rest use `CONFIG_TYPE_MACRO_APPEND` (0x2B)
  - Segment index byte with `0x80` continuation flag
- `decodeMacroActions(data)` — streaming decoder for reading macro data back from device

#### Device Manager Integration
New facade methods added to `RawmDeviceManager`:
- `pairReceiver(addr, channel, isSlow)` → sends `buildSetEsbAddrPayload`
- `unpairReceiver(addr)` → sends `buildClearEsbAddrPayload`
- `selectReceiver(addr)` → sends `buildSelectEsbAddrPayload`
- `setMouseKeyMapping(args)` → sends `buildMouseKeyPayload`
- `setMouseFunctionMapping(args)` → sends `buildMouseFunctionPayload`
- `sendMacro(keyIds, macroIndex, triggerType, actions, macroName)` → sends all `buildMacroSegments`

---

### Vue Integration

#### `src/composables/useNativeHid.ts` (207 lines)
- Thin adapter between `RawmDeviceManager` and Vue reactivity
- Reactive refs: `nativeReady`, `nativeError`, `devices`, `currentDevice`, `rawSettings`
- `mapDeviceStateToBridgeDevice()` — converts `DeviceState` → `BridgeDevice` (common format)
- `mapDeviceStateToMouseSettings()` — converts `DeviceState` → `BridgeMouseSettings`
- `start()` — initializes manager, subscribes to state updates, auto-connects to granted devices
- `pair()` — triggers browser HID permission dialog
- `disconnect()`, `applySettings()`, `factoryReset()`

#### `src/components/device/PairPanel.vue`
- Routes to `native.pair()` when `useNativeHidFlag` is true
- Falls back to iframe bridge mode otherwise

#### `src/components/device/ConnectPanel.vue`
- Routes to `native.start()` when native mode is on

---

## File Inventory

### Created (12 files, ~95 KB)
| File | Size | Purpose |
|------|------|---------|
| `src/lib/rawm-protocol.ts` | 20.2 KB | All protocol constants |
| `src/lib/rawm-crc.ts` | 0.8 KB | CRC-16 implementation |
| `src/lib/rawm-packet.ts` | 7.1 KB | Packet builders |
| `src/lib/rawm-keymaps.ts` | 17.5 KB | Key code tables |
| `src/lib/rawm-device.ts` | 7.9 KB | State types + factory |
| `src/lib/rawm-hid-client.ts` | 12.8 KB | WebHID transport |
| `src/lib/rawm-mouse-config.ts` | 4.6 KB | Mouse param blob builder |
| `src/lib/rawm-device-manager.ts` | 21.4 KB | High-level facade |
| `src/lib/rawm-wireless.ts` | 1.8 KB | ESB pairing packets |
| `src/lib/rawm-mouse-keymap.ts` | 5.0 KB | Button mapping packets |
| `src/lib/rawm-macro.ts` | 8.1 KB | Macro encode/decode |
| `src/lib/utils.ts` | 0.2 KB | Tailwind class merge |

### Modified (8 files)
| File | Changes |
|------|---------|
| `src/composables/useNativeHid.ts` | Rewired to use `RawmDeviceManager`; added `syncMouseStoreToManagerState()`; exposed receiver + mapping + macro methods |
| `src/lib/rawm-device-manager.ts` | Added IQ response parsers + keyboard handshake handling |
| `src/lib/rawm-macro.ts` | Hardened `decodeMacroActions` with bounds checks and event mapping |
| `src/components/device/ReceiverPanel.vue` | Full receiver management UI (pair/unpair/select with validation) |
| `src/components/mouse/KeyMappingSection.vue` | Wired key/function/macro tabs to native HID with protocol key tables |
| `src/components/device/PairPanel.vue` | Native/bridge routing |
| `src/components/device/ConnectPanel.vue` | Native/bridge routing |

### Reference (read-only)
| File | Purpose |
|------|---------|
| `lib.deobfuscated.js` | Source of truth for protocol logic (14,517 lines) |
| `lib.deobfuscated.analysis.md` | Architecture overview |
| `rawmhub-vue/DISSECTION.md` | Decoupling strategy |
| `rawmhub-vue/LIBRARY_ANALYSIS.md` | Symbol catalog |
| `rawmhub-vue/public/lib/library.formatted.js` | Prettier-formatted obfuscated library |
| `hub.html` | Original DOM that the library is coupled to |

---

## Still In Progress / Not Started

### Verification
- [ ] **Byte-exact verification** against iframe bridge output (needs hardware testing)
- [ ] CRC cross-check: send identical packets via both paths, compare hex dumps

### Keyboard Advanced Features (Deferred)
- [x] **IQ Response parsing** — `parseIqResponse()` handles `SOFT_DRV_VER`, `KB_INFO`, `KEYCODE_BUF`, `RGB_COLOR_BUF`, `MACRO_NUM`, `MACRO_SIZE`, `MAG_DATA`
- [ ] SOCD (Simultaneous Opposing Cardinal Directions) encode/decode
- [ ] MT (Multi-Tap) encode/decode
- [ ] RS (Rapid Shot) encode/decode
- [ ] DKS (Dynamic Keystroke) encode/decode
- [ ] Magnetic axis calibration data handling

### Macro Refinement
- [x] **Decode edge cases** — `decodeMacroActions` now has bounds checks, correct MOVE/POSITION parsing, and touchEvent→WM_* mapping
- [x] **Macro buffer read-back** — `IQ_GET_MACRO_DATA_BUF` waterfall: request 28-byte chunks → accumulate into `macroReadBuf` → parse on `0x00` terminator → `kbd_macro_infos` populated with decoded actions

### UI Wiring
- [x] **Native settings panels** — `syncMouseStoreToManagerState()` maps all Pinia mouse settings → `DeviceState` before `applySettings()`
- [x] **Mouse button mapping UI** — `KeyMappingSection.vue` wired to `setMouseKeyMapping()` / `setMouseFunctionMapping()` with comprehensive key options from `rawm-keymaps.ts`
- [x] **Macro editor UI** — `KeyMappingSection.vue` macro tab wired to `sendMacro()` with store-to-protocol action conversion
- [x] **Receiver pairing UI** — `ReceiverPanel.vue` wired to `pairReceiver()` / `unpairReceiver()` / `selectReceiver()` with address validation

### ESB Wireless
- [x] **Receiver pairing UI** — `ReceiverPanel.vue` with pair/unpair/select
- [x] **Receiver auto-detection** — `RECEIVER_PRODUCT_IDS` set detects dongles by `productId` (`0x232a`, `0x232b`)
- [x] **Virtual client ping** — `pingVirtualClient()` sends `CMD_PING` on `ESB_CHANNEL_MOUSE` (0x00) for receiver-connected mice
- [x] **`esb_alive_timeout` ping loop** — `onPingTick()` runs every 1000 ms; 3000 ms timeout marks virtual mouse offline and re-queries receiver
- [x] **RSSI polling** — `ACTION_READ_RSSI` sent every tick for receivers; `NOTIFY_TYPE_MOUSE_RSSI` + ping payload both update `state.rssi`
- [x] **CMD_PING handler** — resets `esb_last_alive_time`, `esb_alive_timeout`, sets `virtual_connected = true`; parses `squal`, `rssi`, `txOutputPower` from payload

### Firmware Update
- [x] **Firmware info query** — `queryFirmwareInfo()` fetches from `miracletek.net/game/firmware.php` with device params (name, vendorId, productId, revision, revisionCode, hardwareCode)
- [x] **`hasNewFirmware` mapping** — computed from `firmwareInfo.revisionCode > state.revisionCode` in `mapDeviceStateToBridgeDevice()`
- [x] **Auto-query on connect** — triggered once per device when `softDrvVer` becomes available
- [x] **DFU mode entry** — `enterDfuMode()` sends `ACTION_SHUTDOWN_GOTO_DFU` (0x3f); actual blob streaming is device-specific and not present in the deobfuscated library
- [ ] Firmware blob streaming protocol (needs hardware reverse-engineering or bootloader documentation)

---

## Key Design Decisions

1. **No DOM coupling in protocol layer** — All `src/lib/*.ts` files are pure TypeScript with no `document`, `window`, or `navigator.hid` events that touch UI. The UI layer subscribes to reactive state via the observer pattern.

2. **Feature flag coexistence** — `useNativeHidFlag` controls whether `PairPanel.vue` and `ConnectPanel.vue` use native WebHID or the iframe bridge. The same `BridgeDevice` / `BridgeMouseSettings` types are used regardless of transport, so UI components need zero changes.

3. **Byte-exact porting** — Every packet builder was traced line-by-line from `library.formatted.js`. Field order, width, and encoding match the original exactly because the firmware has zero tolerance for malformed packets.

4. **Layered unidirectional data flow** — HID packets → Protocol parser → DeviceState → Vue refs → Template. This replaces the original's bidirectional jQuery callback spaghetti.

5. **Keyboard deferred** — Mouse + pairing is the critical path. Keyboard advanced features (magnetic axis, SOCD, etc.) are stubbed in `DeviceState` but not yet wired.

---

## Build Output

```
vite v8.0.9 building client environment for production...
transforming...✓ 187 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html                   0.58 kB │ gzip:   0.39 kB
dist/assets/index-DBzEKMRg.css   41.28 kB │ gzip:   8.12 kB
dist/assets/index-Co3ThR4k.js   417.14 kB │ gzip: 131.43 kB

✓ built in 624ms
```

Total JS bundle: **417 KB** (131 KB gzipped) — compared to the original library alone at **647 KB** (obfuscated, not gzipped) plus jQuery + layui.

---

## Bug Fixes
- **Device image not loading in native mode** — `mapDeviceStateToBridgeDevice()` in `useNativeHid.ts` was setting `imageUrl: ''` with a TODO comment. Fixed to call `getDeviceImageUrl(state.productId, type)` which resolves to `https://hub.miracletek.net/hub/product/{hexPid}/connected.png`, matching the original library's `RESOURCE_URL + "product/" + get_product_id_hex_str(device) + "/connected.png"`.
- **Device image missing color variant** — The original library's image URL includes a color subdirectory (e.g., `product/234a/blue/connected.png`) which comes from `device_cfg` loaded from the server. Since we don't load `device_cfg`, we now parse `CMD_QUERY_RESULT` packets (which contain JSON device info with a `co` color field) and use that color in `getDeviceImageUrl()`.

## Next Recommended Steps

1. **Hardware smoke test** — Connect a RAWM mouse via native mode, verify that `query()` handshake succeeds and `NOTIFY_TYPE_MOUSE_CONFIG` populates all fields correctly.
2. **Packet capture comparison** — Use Chrome's `chrome://device-log` or Wireshark USB capture to compare bytes sent by native implementation vs. iframe bridge for identical operations (e.g., changing DPI).
3. **Settings live-send** — Decide whether to send individual settings immediately on slider change (like original library) or keep batch-apply. If live-send, wire each settings section to call manager mutators directly.
4. **Firmware blob streaming** — With your Leviathan V4, capture the USB traffic during a firmware update to reverse-engineer the DFU packet structure (chunk size, handshake, CRC, ACK mechanism).
5. **Byte-exact verification** — CRC cross-check sending identical packets via both native and iframe paths.
7. **DFU / firmware update** — Analyze and implement firmware blob streaming protocol.
