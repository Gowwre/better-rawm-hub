# `lib.deobfuscated.js` - Comprehensive Analysis

**File:** `lib.deobfuscated.js`  
**Lines:** 14,517  
**Purpose:** Core business-logic + protocol + UI layer for the RAWM Hub device configuration tool  
**Target devices:** RAWM gaming mice & keyboards (USB HID / 2.4 GHz wireless via ESB)  
**Dependencies:** jQuery, layui (UI framework), platform.js, BigNumber, sprintf, spectrum (color picker)

---

## 1. High-Level Architecture

The library is a **single IIFE** (immediately-invoked function expression) split into three conceptual layers.  
Even though the file is one flat script, the code clusters naturally as:

```
+-------------------------------------------------------------+
|  UI Layer (~4,500 lines)                                    |
|  jQuery + layui DOM manipulation, event wiring, HTML gen    |
+-------------------------------------------------------------+
|  Business Logic (~5,000 lines)                              |
|  get_*/set_* accessors, keycode tables, macro codec,        |
|  device-info factories, config parsing                      |
+-------------------------------------------------------------+
|  Protocol Layer (~4,500 lines)                              |
|  HID packet formatting, CRC-16, command dispatch,           |
|  ESB wireless framing, WebHID I/O                           |
+-------------------------------------------------------------+
```

> **Note:** The file still contains obfuscation artefacts.  
> Most string literals and property names are accessed through a string-decoder function `_0x4dcb(offset)` that looks up values in a hidden constant table (`_0x3870`).  
> This analysis **decodes the intent** of those sections rather than the raw obfuscated names.

---

## 2. Key-Mapping Tables (Lines 1 - 720)

The top of the file defines exhaustive lookup tables for every key the firmware understands.

### 2.1 `create_pc_key_info(...)` - generic key descriptor
```js
{
  type,      // 0 = modifier, 1 = mouse, 2 = keyboard, 3 = media
  vCode,     // Windows virtual-key code
  name,      // human-readable label
  aCode,     // Android key code (for mobile companion app)
  aName,     // Android key name
  sCode,     // USB HID scan code
}
```

### 2.2 `kbd_create_pc_key_info(...)` - keyboard-specific descriptor
Adds 4 extra fields for keyboard matrix positioning:
```js
{
  ...pc_key_info,
  keyId,     // firmware key ID (remappable target)
  row, col,  // physical matrix coordinates
  rect       // [x, y, w, h] for UI rendering
}
```

### 2.3 Global key arrays

| Variable | Contents | Count |
|----------|----------|-------|
| `modifiers` | Ctrl, Shift, Alt, Win, none | 5 |
| `keys` | All mouse + keyboard + media keys | ~170 |
| `macro_keys` | `keys` plus `MOUSE_MOVE` and `MOUSE_POSITION` | ~172 |
| `kbd_5_15_keys` | 5x15 keyboard matrix (75 keys + Fn row) | ~75 |
| `kbd_5_14_keys` | 5x14 keyboard matrix (70 keys) | ~70 |
| `kbd_select_keys` | Remap-source keys for UI picker | ~95 |
| `mouse_select_keys` | Mouse buttons + scroll wheels | 7 |
| `kbd_rgb_keys` | RGB control shortcuts (toggle, mode+, mode-, VAI, VAD, HUI, HUD) | 7 |
| `kbd_media_keys` | Media shortcuts (play, pause, vol+, vol-, mute, next, prev) | 7 |
| `kbd_windows_keys` | Windows shortcuts (calc, mail, my-computer, www-home) | 6 |
| `kbd_macro_keys` | Macro trigger slots M1 ... M20 | 20 |
| `kbd_all_keys` | Union of select + mouse + rgb + media + windows + macro | ~130 |

### 2.4 Platform-aware naming
The initializer `pc_key_manager_init()` detects macOS (`os === 'mac'`) and swaps labels:
- `Ctrl` -> `Control`
- `Alt` -> `Option`
- `Win` -> `Command`

---

## 3. Device State & Factories (Lines 720 - 1,900)

### 3.1 `create_device_info()` - master state object
When a device connects, the library creates a flat state object with **70+ fields**:

**Identity / Version**
- `revision`, `revisionCode`, `hardwareCode`, `deviceName`, `productId`, `vendorId`

**Mouse Sensor Settings**
- `resolution` (CPI/DPI), `pollingRate`, `cpiLevels[8]`, `cpiLevelColors[8]`
- `lod` (lift-off distance), `angleSnapping`, `angleTuning`, `rippleControl`
- `motionSync`, `glassMode`, `glassModeEnabled`

**Wireless / Power**
- `powerMode`, `sleepTime`, `autoTxPower`, `txOutputPower`, `txOutputPowerApplied`
- `esbAddress`, `esbAddressArr[]`, `esbSelected`, `rfChannel`, `hopChannel`, `hopChannelSupported`

**Keyboard Settings**
- `kbd_key_infos[]`, `kbd_light_info{}`, `kbd_axis_infos[]`, `kbd_axis_mode`
- `kbd_socd_infos[]`, `kbd_mt_infos[]`, `kbd_rs_infos[]`, `kbd_dks_infos[]`
- `kbd_macro_infos[][]`, `kbd_macro_num`, `kbd_macro_max_size`
- `onboardConfigNum`, `onboardStatus[4]`, `keyDelay[7]`

**Meta**
- `battery`, `connected`, `firmwareInfo{}`, `sensor`, `colorCode`
- `luaStatus`, `noack`, `squal`, `brightness`

### 3.2 `create_usb_client(device, esbChannel, isReceiver)` - HID client wrapper
```js
{
  device,               // WebHID HIDDevice object
  product_esb_ch,       // 0xFF = direct USB, else wireless channel
  recv_buf,             // incoming raw bytes (Uint8Array)
  send_event_buf,       // outgoing raw bytes queue
  connected,
  querying_more_result,
  device_info,          // create_device_info()
  esb_alive_timeout,
  syncing,
  allow_send,
  id,                   // crypto.randomUUID()
  ...
}
```

### 3.3 Device classification helpers
| Function | Logic |
|----------|-------|
| `is_receiver(client)` | Checks `device_cfg` table flag `receiver` |
| `is_keyboard(client)` | Checks HID `productName` or config flag `keyboard` |
| `is_keyboard_5_15(device)` | `productName === 'Z68A'` (75% layout) |
| `is_hs_keyboard(device)` | `productName === 'Z68A' or 'Z68B'` |
| `is_hub(client)` | Config flag `hub` |
| `is_slow_receiver(client)` | Config flag `slow` (limits HID report rate) |
| `is_gaming_only_mode(client)` | Revision prefix `G-` |

---

## 4. Protocol Layer - HID Packet I/O (Lines 1,900 - 3,500)

### 4.1 Packet building blocks

**`hs_format_data(client, payload)`** (line ~1962)  
Pads any payload to exactly **32 bytes** with trailing zeros.  
Keyboard firmware expects fixed-size feature reports.

**`crc16_compute(data, length)`** (line ~3370)  
Custom CRC-16 implementation.  
Algorithm (from source):
```js
let crc = 0xFFFF;
for (let i = 0; i < len; i++) {
  crc = (crc >> 8 & 0xFF) | (crc << 8);
  crc ^= data[i];
  crc ^= (crc & 0xFF) >> 4;
  crc ^= (crc << 8) << 4;
  crc ^= ((crc & 0xFF) << 4) << 1;
}
return crc;
```

**`crc_process(client, payload)`** (line ~3381)  
Wraps a payload with a 2-byte header + optional 5-byte CRC envelope:
```
[0] = (total_length >> 4 & 0xF0) | packet_type
[1] = total_length & 0xFF
--- if client requires CRC ---
[0..1] rewritten for outer length
[2] = 0x24  (CMD_RAW_DATA)
[3] = crc & 0xFF
[4] = crc >> 8 & 0xFF
[5..] = original payload
```

### 4.2 `hs_send_client_data(client)` - async WebHID write
- Reads from `client.send_event_buf`
- If wireless (`product_esb_ch !== 0xFF`), prefixes report with `0xC0 | channel`
- Pads to 64-byte report for mouse, 32-byte for keyboard
- Calls `device.sendReport(0, data)`
- Throttles via `post_send_client_data()` (25 ms timeout per client)

### 4.3 `hs_recv(client, newData)` - reassembly & dispatch
- Concatenates incoming chunks into `client.recv_buf`
- Calls `hs_parse_cmd(client)` whenever `recv_buf.length >= 32`

### 4.4 `hs_parse_cmd(client)` - the giant command parser
A `do...while` switch statement handling **~40 opcodes**.

#### IQ_* Query Responses (Keyboard)
| Opcode | Name | Purpose |
|--------|------|---------|
| `0xF5` | `IQ_GET_SOFT_DRV_VER` | Firmware version string |
| `0x06` | `IQ_RESET_KEYCODE` | Keycode factory reset ack |
| `0x39` | `IQ_GET_PROFILE_ID` | Current onboard profile index |
| `0x40` | `IQ_SET_PROFILE_ID` | Set onboard profile ack |
| `0x12` | `IQ_GET_KEYCODE_BUF` | Bulk keycode read (continues until all keys fetched) |
| `0x05` | `IQ_SET_KEYCODE` | Single keycode write ack |
| `0x0C` | `IQ_GET_MACRO_NUM` | Number of macro slots |
| `0x0D` | `IQ_GET_MACRO_SIZE` | Total macro buffer size |
| `0x0E` | `IQ_GET_MACRO_DATA_BUF` | Bulk macro read |
| `0x0F` | `IQ_SET_MACRO_DATA_BUF` | Bulk macro write ack |
| `0x10` | `IQ_RESET_MACRO` | Macro buffer reset ack |
| `0x08` | `IQ_GET_RGB_COLOR` | Global RGB settings (brightness, mode, speed, hue, sat) |
| `0x52` | `IQ_GET_RGB_COLOR_SLEEP_TIME` | RGB sleep timeout |
| `0x53` | `IQ_SET_RGB_COLOR_SLEEP_TIME` | Set sleep ack |
| `0x50` | `IQ_GET_BOX_RGB_COLOR` | Light-box (underglow) settings |
| `0x51` | `IQ_SET_BOX_RGB_COLOR` | Set light-box ack |
| `0x36` | `IQ_GET_RGB_COLOR_BUF` | Per-key RGB read |
| `0x37` | `IQ_SET_RGB_COLOR` | Per-key RGB write ack |
| `0x45` | `IQ_GET_RT_BOOST_MODE` | Rapid-trigger / axis mode |
| `0x46` | `IQ_SET_RT_BOOST_MODE` | Set axis mode ack |
| `0x1A` | `IQ_GET_MAG_DATA` | Single magnetic axis key read (RT, APC, deadzones) |
| `0x19` | `IQ_SET_MAG_DATA` | Set axis ack |
| `0x1E` | `IQ_GET_MAG_SOCD_NUM` | SOCD cleaner count |
| `0x1F` | `IQ_SET_MAG_SOCD_NUM` | Set SOCD count ack |
| `0x20` | `IQ_GET_MAG_SOCD_DATA` | Single SOCD entry read |
| `0x21` | `IQ_SET_MAG_SOCD_DATA` | Set SOCD ack |
| `0x22` | `IQ_GET_MAG_MT_NUM` | Mod-Tap count |
| `0x23` | `IQ_SET_MAG_MT_NUM` | Set MT count ack |
| `0x24` | `IQ_GET_MAG_MT_DATA` | Single MT entry read |
| `0x25` | `IQ_SET_MAG_MT_DATA` | Set MT ack |
| `0x2E` | `IQ_GET_MAG_RS_NUM` | Rapid-Shot count |
| `0x2F` | `IQ_SET_MAG_RS_NUM` | Set RS count ack |
| `0x30` | `IQ_GET_MAG_RS_DATA` | Single RS entry read |
| `0x31` | `IQ_SET_MAG_RS_DATA` | Set RS ack |
| `0x2A` | `IQ_GET_MAG_DKS_NUM` | DKS (multi-state) count |
| `0x2B` | `IQ_SET_MAG_DKS_NUM` | Set DKS count ack |
| `0x2C` | `IQ_GET_MAG_DKS_DATA` | Single DKS entry read |
| `0x2D` | `IQ_SET_MAG_DKS_DATA` | Set DKS ack |

#### Mouse / Generic Commands
| Opcode | Name | Purpose |
|--------|------|---------|
| `0x01` | `CMD_QUERY` | Handshake / device info request |
| `0x06` | `CMD_ACTION` | Perform action (factory reset, reboot, etc.) |
| `0x0E` | `CMD_PING` | Keep-alive ping |
| `0x03` | `CMD_RAW_DATA` | Generic config read/write wrapper |

### 4.5 `hs_data_sync(client)` - keyboard initialization waterfall
When a keyboard connects, the library does **staged sync** using a bit-mask (`kbd_data_sync_index`):
1. **Bit 0** - Fetch all keycodes (`IQ_GET_KEYCODE_BUF`)
2. **Bit 1** - Fetch RGB settings + per-key colors (`IQ_GET_RGB_COLOR` -> `IQ_GET_RGB_COLOR_BUF`)
3. **Bit 2** - Fetch magnetic axis data (`IQ_GET_MAG_DATA`)
4. **Bit 3** - Fetch advanced keys: SOCD -> MT -> RS -> DKS

Each stage chains the next via `window.postMessage({ action: ACTION_UI_REFRESH_KBD_* })`.

---

## 5. Mouse Protocol - `send_event_*` family (Lines 3,500 - 4,500)

### 5.1 `send_event_mouse_param(client)`
Builds a giant binary blob (~40-80 bytes) containing **all mouse settings** and queues it via `crc_process()`.

Payload structure (from source):
```
[0]  CONFIG_TYPE_MOUSE_PARAM  (0x15)
[1..2]  CPI X (uint16LE)  or 0 if using XY-CPI
[3..4]  CPI Y (uint16LE)  or 0
[5]     pollingRate & 0xFF
[6]     pollingRate >> 8
[7]     light mode
[8]     cpiLevels count
[9..]   cpiLevels[]  (uint16LE each)
...     powerMode, lod, keyDelay[], motionSync,
        angleTuning, angleSnapping, rippleControl,
        cpiLevelColors[], txOutputPower, debounce[],
        onboardStatus[], glassMode
```

### 5.2 Other `send_event_*` helpers
| Function | Config Type | Data |
|----------|-------------|------|
| `send_event_query` | - | Handshake with Unix timestamp |
| `send_event_action` | `0x06` | Action ID + 4-byte param |
| `send_event_ping` | `0x0E` | Keep-alive + sync token |
| `send_event_set_sleep_time` | `0x21` | uint16LE seconds |
| `send_event_set_rf_channel` | `0x23` | Channel byte |
| `send_event_set_auto_hop` | `0x32` | Boolean |
| `send_event_set_brightness` | `0x31` | 0-255 |
| `send_event_set_color_code` | `0x1F` | 16-byte string |
| `send_event_mouse_key` | `0x16` | Key mapping for a mouse button |
| `send_event_mouse_function` | `0x18` | Special function mapping (sniper, DPI clutch, etc.) |
| `send_event_config_macro` | `0x05` / `0x2B` | Macro payload for a button |
| `send_event_gaming_only` | `0x27` | Toggle gaming-only mode |
| `send_event_factory_reset` | `0x35` | Full reset |

---

## 6. Keyboard Advanced Keys (Lines 1,900 & 4,500 - 7,000)

The library supports **4 categories** of advanced key behaviors for magnetic / Hall-effect keyboards:

### 6.1 SOCD (Simultaneous Opposing Cardinal Directions)
- Prevents conflicting directional inputs (e.g., Left + Right)
- Mode: last-input-wins, neutral, etc.
- Data: `row1, col1, row2, col2, socd_mode`

### 6.2 MT (Mod-Tap)
- Hold = modifier, Tap = key
- Data: `row, col, tap_time, keyCode1, keyCode2`

### 6.3 RS (Rapid Shot / Turbo)
- Hold = repeated keypress
- Data: `row1, col1, row2, col2`

### 6.4 DKS (Dynamic Keystroke / Multi-State)
- 4 press-depth stages, each can emit different keys
- Data: `row, col, keyCode1, state1, keyCode2, state2, keyCode3, state3, keyCode4, state4`
- `stateN` is a bit-field indicating which depth zones are active

### 6.5 Magnetic Axis (Rapid Trigger + APC)
Each key has analog hall sensor calibration:
```js
{
  row, col,
  rt_enable,        // 0/1  rapid trigger on/off
  top_dz,           // top deadzone (uint16)
  apc_lv,           // actuation point (uint16)
  rt_press_lv,      // press sensitivity (uint16)
  rt_release_lv,    // release sensitivity (uint16)
  btm_dz,           // bottom deadzone (uint16)
  switch_type       // 0 = HN (JWK), 1 = TTC, 2 = JDL, 3 = TTC_WCW, 4 = Omega, 5 = TTC_Ace, 6 = TTC_Giant, ...
}
```

---

## 7. Macro Engine (Lines 4,500 - 5,000 & 9,000 - 11,000)

### 7.1 Macro buffer format (firmware protocol)
Macros are stored as a flat byte stream in firmware:
```
0x00                    = end-of-macro
0x01 0x02 keyId         = key down (0x100 event)
0x01 0x03 keyId         = key up   (0x101 event)
0x01 0x04 digits...     = delay in ms
```

### 7.2 Macro event types (`mouse_key_event`)
| Value | Meaning |
|-------|---------|
| `0x000` | None |
| `0x100` | Key down |
| `0x101` | Key up |
| `0x200` | Mouse move (relative X, Y encoded in `mouse_key_code`) |
| `0x20A` | Scroll wheel vertical |
| `0x20E` | Scroll wheel horizontal |
| `0x2FF` | Mouse position (absolute screen coordinates) |

### 7.3 Macro encoding for upload
`send_event_config_macro()` serializes `macroKeys[]` into the firmware byte stream.  
It handles:
- Mouse-move loops (`mouse_key_loop > 1`)
- Scroll deltas (`mouse_mapping_key_data`)
- Absolute positioning (`0x2FF`)
- Auto-click toggles (`0x100` down + timed `0x101` up)

---

## 8. UI Layer - jQuery + layui (Lines 7,000 - 14,517)

### 8.1 Mouse settings UI (`ui_refresh_*`)
- `ui_refresh_setting(client)` - rebuilds CPI sliders, polling rate dropdown, LOD, angle snapping, etc.
- `ui_refresh_mapping_key(client)` - shows current button bindings
- `ui_refresh_mapping_macro_edit(client)` - macro step editor
- `ui_refresh_cpi_levels(client)` - DPI stage LEDs/colors

### 8.2 Keyboard settings UI (`kbd_ui_*`)
- `kbd_ui_refresh_key_matrix(client)` - renders 5x14 or 5x15 clickable key grid
- `kbd_ui_refresh_key_desc(client)` - shows selected key's current & default binding
- `kbd_ui_refresh_light_matrix(client)` - per-key RGB grid
- `kbd_ui_refresh_light_box(client)` - underglow / light-box controls
- `kbd_ui_refresh_axis_matrix(client)` - rapid-trigger key selector
- `kbd_ui_refresh_dks(client)` - 4-stage DKS visual editor with draggable arrows
- `kbd_ui_macro_init(client)` / `kbd_ui_macro_edit_init(client)` - macro list & step editor

### 8.3 Event wiring
All user interaction is bound through layui's `element.on('action', { ... })` pattern:
```js
layui.$('#container').on('click', '[kbd-select-key-action="select"]', function () {
  // select key for remapping
});
```

### 8.4 Cross-window messaging
The library uses `window.postMessage` as an **internal event bus**:
```js
window.postMessage({ action: ACTION_REFRESH_CLIENT_LIST })
window.postMessage({ action: ACTION_UI_REFRESH_CURRENT_CLIENT })
window.postMessage({ action: ACTION_UI_REFRESH_KBD_KEY })
window.postMessage({ action: ACTION_UI_REFRESH_KBD_LIGHT })
window.postMessage({ action: ACTION_UI_REFRESH_KBD_AXIS })
window.postMessage({ action: ACTION_UI_REFRESH_KBD_MACRO })
```
This is how the iframe bridge intercepts state changes.

---

## 9. Data Flow Summary

### 9.1 Connecting a mouse
```
1. WebHID onconnect event
2. create_usb_client()  ->  reset_device_info()
3. send_event_query()   ->  handshake + timestamp
4. Device replies with CMD_NOTIFY config packets
5. parse_device_info()  ->  fills state object
6. ui_refresh_*()       ->  updates DOM
```

### 9.2 Changing a mouse setting (e.g. CPI)
```
1. User moves slider
2. set_cpi(client, value)
3. state updated in memory
4. send_event_mouse_param(client)  ->  builds full config blob
5. crc_process()  ->  wraps blob
6. send_event()  ->  queues to send_event_buf
7. hs_send_client_data()  ->  writes via WebHID
8. Device acks with NOTIFY_TYPE_MOUSE_CPI
```

### 9.3 Connecting a keyboard
```
1. hs_get_firmware_version()  ->  0xF5
2. Device replies version string
3. hs_get_onboard_index()     ->  0x39
4. hs_data_sync() starts waterfall:
   a. IQ_GET_KEYCODE_BUF  (all layers)
   b. IQ_GET_RGB_COLOR    (global + per-key)
   c. IQ_GET_MAG_DATA     (analog axis)
   d. IQ_GET_MAG_SOCD_NUM -> SOCD_DATA
   e. IQ_GET_MAG_MT_NUM   -> MT_DATA
   f. IQ_GET_MAG_RS_NUM   -> RS_DATA
   g. IQ_GET_MAG_DKS_NUM  -> DKS_DATA
5. Each stage fires ACTION_UI_REFRESH_KBD_* postMessage
```

---

## 10. Important Implementation Details

### 10.1 Wireless (ESB) framing
For 2.4 GHz receivers, every HID report is prefixed with:
```
Byte 0: 0xC0 | channel_id   (channel 0-15)
Bytes 1-63: payload (padded with zeros)
```
The mouse itself uses `product_esb_ch = 0xFF` for direct USB.

### 10.2 Report size differences
| Device type | Report size | Endpoint |
|-------------|-------------|----------|
| Mouse (USB) | 64 bytes | `sendReport(0, ...)` |
| Mouse (ESB) | 64 bytes | receiver forwards |
| Keyboard    | 32 bytes | feature report |

### 10.3 Keep-alive / timeout logic
- `start()` runs on a ~1 s interval via `setTimeout`
- Receivers get pinged with `send_event_ping(..., false)`
- Non-receivers timeout after `esb_alive_timeout` (default 3 s)
- If timeout expires, device is marked disconnected and `reset_device_info()` is called

### 10.4 Config upload telemetry
`upload_mouse_config()` sends an anonymous XMLHttpRequest to `static.miracletek.net` containing:
- Device name, vendorId, productId, firmware revision, hardware code
- Sensor model (PAW3395, PAW3950, etc.)
- All active settings: CPI, polling rate, LOD, angle snapping, ripple control, motion sync, sleep time, angle tuning, glass mode
- This is used for aggregate telemetry / firmware compatibility tracking

### 10.5 Obfuscation remnants
- `_0x4dcb(offset)` decodes strings from a lookup table `_0x3870`
- `_0x4dcb(0x367)` resolves to `push`
- `_0x4dcb(0x545)` resolves to `forEach`
- `_0x4dcb(0x541)` resolves to `length`
- `_0x4dcb(0x320)` resolves to `slice`
- Property access is mixed: some use bracket notation with decoded strings, others use direct dot notation (`device_info`, `recv_buf`)

---

## 11. Relationship to Other Project Files

| File | Connection |
|------|------------|
| `rawmhub-vue/public/lib/library.min.js` | Original obfuscated version (647 KB) |
| `rawmhub-vue/public/lib/library.formatted.js` | Prettier-formatted readable version |
| `rawmhub-vue/src/lib/rawm-protocol.ts` | Clean re-implementation of protocol constants extracted from this file |
| `rawmhub-vue/src/lib/rawm-device.ts` | TypeScript types matching `create_device_info()` structure |
| `rawmhub-vue/src/lib/rawm-hid-client.ts` | Pure TypeScript WebHID client replacing `hs_send_client_data` + `crc_process` |
| `rawmhub-vue/LIBRARY_ANALYSIS.md` | Symbol catalog generated by static analysis |
| `rawmhub-vue/DISSECTION.md` | Decoupling strategy documenting how to replace this file piecemeal |

---

*Analysis generated from direct source inspection of `lib.deobfuscated.js` (14,517 lines).*
