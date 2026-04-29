# lib-rawm-deob Rewrite Progress

## Strategy: Strangler Fig Pattern

Replace one module at a time from the inside out. Each phase produces a working application — no big-bang cutover. Keep `hub-deob.html` as the consumer throughout.

---

## Phase 1 — Key Database Extraction  ✅

### Goal
Extract all key descriptor data from the imperative `pc_key_manager_init()` function into a declarative data file, keeping the same runtime behavior.

### What changed

| Before | After |
|--------|-------|
| `02-key-system.js` — 703 lines, 500 of which were `keys.push(…)` calls inside `pc_key_manager_init()` | `data/key-database.js` — 530 lines of pure data |
| | `02-key-system.js` — 210 lines (declarations + data-driven init + 16 lookup functions) |
| 4 loops (numbers, A-Z, F-keys, KPD), 3 platform conditionals, i18n resolution mixed with data | All entries unrolled into explicit JSON objects. i18n and platform logic handled by a single `resolve_name()` helper |
| `wsn()` helper (defined, never used) | Removed |

### Data conventions (`key-database.js`)

Short property names for compact data:

| Prop | Maps to | Example |
|------|---------|--------|
| `t` | `type` | `0` (modifier), `1` (mouse), `2` (kbd), `3` (media) |
| `v` | `vCode` | `0x1b` |
| `n` | `name` | plain string, `"$STRID_xxx"`, array, or `{win, mac}` |
| `a` | `aCode` | `0x6f` |
| `an` | `aName` | `"ESC"` |
| `s` | `sCode` | `0x29` |
| `id` | `keyId` | `0x29` |
| `r` | `row` | `0` |
| `c` | `col` | `0` |
| `rect` | `rect` | `[0x28, 0x3a, 0x24, 0x2a]` |

Name resolution conventions in `resolve_name()`:
- `"Esc"` → plain string, used as-is
- `"$STRID_NONE"` → `layui.i18np.prop("STRID_NONE")`
- `["$STRID_LEFT", " Shift"]` → `"Left" + " Shift"` = `"Left Shift"`
- `{win: "Win", mac: "Command"}` → picks based on `layui.device("os")`
- `{win: ["$STRID_LEFT", " Win"], mac: ["$STRID_LEFT", " Command"]}` → platform pick + i18n + suffix

### Files touched

```
lib-rawm-deob/
  data/
    key-database.js     ← NEW (530 lines)
  02-key-system.js      ← REWRITTEN (703 → 210 lines)
hub-deob.html           ← UPDATED (added data/ script tag)
```

### Arrays migrated (12 total)

| Array | Source | Type |
|-------|--------|------|
| `modifiers` | `KEY_DB.modifiers` | 5 entries |
| `keys` | `KEY_DB.keys` | 112 entries (mouse, kbd, media including unrolled loops) |
| `macro_keys` | derived from keys + 2 extras | insert mouse_move/mouse_position at index 9 |
| `kbd_5_15_keys` | `KEY_DB.kbd_5_15` | 75 entries |
| `kbd_5_14_keys` | `KEY_DB.kbd_5_14` | 70 entries |
| `kbd_select_keys` | `KEY_DB.kbd_select` | 101 entries |
| `mouse_select_keys` | `KEY_DB.mouse_select` | 7 entries |
| `kbd_rgb_keys` | `KEY_DB.rgb` | 7 entries |
| `kbd_media_keys` | `KEY_DB.media` | 7 entries |
| `kbd_windows_keys` | `KEY_DB.windows` | 6 entries |
| `kbd_macro_keys` | `KEY_DB.macro` | 20 entries |
| `kbd_all_keys` | union + `KEY_DB.extra` | 14 extra entries |

### Verification
- Both files pass `node --check` (no syntax errors)
- All 16 lookup functions preserved with identical signatures
- `wsn()` removed (zero callers in `lib-rawm-deob/`)
- Script order in `hub-deob.html`: `01-obfuscation.js` → `data/key-database.js` → `02-key-system.js`

---

## Phase 2 — Named Constants  ✅

### Goal
Replace every magic hex number across all 14 files with a named constant. This makes the code readable and prevents transcription errors during later refactors.

### What changed

| Before | After |
|--------|-------|
| 200+ magic hex numbers in switch/case labels, `payload.push()` calls, buffer sizes, timeouts | All mapped to named constants in `data/constants.js` (294 lines) |
| `switch (firstByte) { case 0x12: … case 0xf5: … }` (39 opaque cases in `hs_parse_cmd()`) | `case CMD_GET_KEYCODE_BUF: … case CMD_FIRMWARE_VERSION: …` |
| `if/else if (value4 == 0x7) … (value4 == 0xe) …` (27 param subtypes in `parse_cmd()`) | `if (value4 == PARAM_LOD) … (value4 == PARAM_ANGLE_TUNING) …` |
| `payload.push(0x42)` (HID virtual child poll action) | `payload.push(CMD_VIRTUAL_CHILD_POLL)` |
| `payload.push(0x3)` / `payload.push(0x6)` (HID param/action prefix) | `payload.push(HID_PARAM_CMD)` / `payload.push(HID_ACTION_CMD)` |
| `0x2328` → `0x2339` in product-ID switches | `case PID_ML01: … case PID_SH01PRO: …` |
| `0x20` HS frame, `0x1c` chunk max, `0x40` HID report | `HS_FRAME_SIZE`, `HS_CHUNK_MAX`, `HID_REPORT_SIZE` |
| `0x3e8` sync timeout, `0xbb8` ESB alive, `0x7d0` config timeout | `SYNC_TIMEOUT_MS`, `ESB_ALIVE_TIMEOUT_MS`, `CONFIG_TIMEOUT_MS` |
| `0x100`/`0x101` mouse key events, `0x200`/`0x2ff` move/position | `MOUSE_EVENT_KEY_DOWN/UP`, `MOUSE_EVENT_MOVE/POSITION` |
| `0x400`–`0x405` special wheel codes | `MOUSE_WHEEL_UP/DOWN/LEFT/RIGHT`, `MOUSE_MOVE_CODE`, `MOUSE_POSITION_CODE` |
| `0xa2`/`0xa4`/`0xa0`/`0x5b` scan codes | `SCAN_CODE_CTRL/ALT/SHIFT/WIN` |
| Macro style `0x0`–`0x6`, touch style `0x1b`/`0x1d` | `MACRO_STYLE_*`, `TOUCH_STYLE_*` |
| Mouse function `0x1`–`0x16` | `FUNC_TOGGLE_CPI`, `FUNC_NEXT_CPI`, … |
| Light sub-params `0x1`–`0x5` in `hs_set_light` / `hs_parse_cmd` | `LIGHT_PARAM_BRIGHTNESS/MODE/SPEED/HUE_SAT/BOX_MODE` |

### Files created

```
lib-rawm-deob/
  data/
    constants.js          ← NEW (294 lines, 200+ named constants)
```

### Files modified (all 14 runtime files)

```
lib-rawm-deob/
  01-obfuscation.js       ← unchanged (KEY_* constants stay; migration to constants.js deferred to Phase 8)
  02-key-system.js        ← unchanged (uses key-database.js data only)
  03-device-info.js       ← UPDATED (defaults use constants: API_VERSION, ESB_ALIVE_TIMEOUT_MS, CPI_LOW_MASK, CPI_STEP_DEFAULT, etc.)
  04-kbd-structures.js    ← unchanged (doc-only; command table in comment kept as-is)
  05-hs-protocol.js       ← REWRITTEN (39 case labels + payload pushes → CMD_*; buffer sizes → HS_FRAME_SIZE/HS_CHUNK_MAX; light params → LIGHT_PARAM_*; sync flags → SYNC_FLAG_*)
  06-hid-protocol.js      ← REWRITTEN (HID command IDs, send_event_action actions, key event codes, scan codes, macro/touch style, report sizes, timeouts)
  07-http-data-model.js   ← REWRITTEN (product IDs, scan codes, macro style, config types, key events)
  08-parse-cmd-ui.js      ← REWRITTEN (response types, 27 param subtypes, CMD_VIRTUAL_CHILD_POLL, timeout constants)
  09-ui-clients.js        ← UPDATED (timeout constants, polling rates)
  10-ui-settings.js       ← UPDATED (timeout constants, SLEEP_MAX_SEC)
  11-ui-mapping.js        ← UPDATED (MACRO_KEEP_TIME_MAX_MS, MACRO_KEEP_TIME_STEP)
  12-utilities.js         ← UPDATED (color math: 0x168→360, 0x3c→60)
  13-event-dispatch.js    ← UPDATED (REBOOT_DELAY_MS, RESIZE_DEBOUNCE_MS)
  14-ui-keyboard.js       ← UPDATED (RESIZE_DEBOUNCE_MS, ESB_ALIVE_TIMEOUT_MS, REBOOT_DELAY_MS)
hub-deob.html             ← UPDATED (added data/constants.js script tag before 01-obfuscation.js)
```

### Constants organization (`data/constants.js`)

| Section | Count | Examples |
|---------|-------|---------|
| HS Protocol Command IDs | 40 | `CMD_FIRMWARE_VERSION` (0xf5), `CMD_GET_KEYCODE_BUF` (0x12) |
| HS Light Sub-parameters | 5 | `LIGHT_PARAM_BRIGHTNESS` (0x1), `LIGHT_PARAM_MODE` (0x2) |
| HS Sync Flags | 4 | `SYNC_FLAG_KEYCODE` (0x1), `SYNC_FLAG_LIGHT` (0x2) |
| HID Action/Config Command IDs | 19 | `HID_PARAM_CMD` (0x3), `HID_ACTION_MOUSE_PARAM` (0x15) |
| HID Response Types | 4 | `RESP_DEVICE_INFO_JSON` (0x2), `RESP_PARAMETER` (0xb) |
| HID Parameter Subtypes | 27 | `PARAM_RESOLUTION` (0x0), `PARAM_LOD` (0x7) |
| Buffer/Size Constants | 15 | `HS_FRAME_SIZE` (0x20), `HID_REPORT_SIZE` (0x40) |
| Product IDs | 26 | `PID_ML01` (0x2329), `PID_SH01PRO` (0x2339) |
| Key Event Codes | 12 | `MOUSE_EVENT_KEY_DOWN` (0x100), `MOUSE_WHEEL_UP` (0x400) |
| Scan/VK Codes | 7 | `SCAN_CODE_CTRL` (0xa2), `VK_CODE_SHIFT` (0x10) |
| Macro Style/Touch/Config | 12 | `MACRO_STYLE_PRESS`, `TOUCH_STYLE_KEY_MAP` |
| Mouse Function IDs | 17 | `FUNC_TOGGLE_CPI` (0x1), `FUNC_SHELL_CMD` (0x10) |
| Device Config Defaults | 8 | `RESOLUTION_DEFAULT`, `BATTERY_FULL_PERCENT` |
| Light Mode Constants | 5 | `LIGHT_MODE_CLOSE`, `LIGHT_MODE_KEY_DEFINE` |
| Bitwise Mask Constants | 8 | `MASK_BYTE`, `MASK_HIGH_NIBBLE`, `MASK_HIGH_BIT` |

### Caveats
- Some values intentionally left as hex: loop counters (`for len = 0x0 …`), array indices (`byteLen[0x4]`), simple arithmetic (`* 0x2`, `/ 0x100`), and boolean flags (`0x0`/`0x1` for false/true). These are generic programming patterns, not protocol semantics.
- The HS protocol doc comment in `04-kbd-structures.js` (lines 251–280) still shows raw hex; it will be updated when that module is redistributed in Phase 7.
- Key event codes `0x200` (`MOUSE_EVENT_MOVE` / `KEYCODE_MEDIA_START`) and `0x100` serve double duty as both event types and code thresholds. Context-specific replacements prevent ambiguity.

### Verification
- All 14 files pass `node --check` (syntax valid)
- Script order in `hub-deob.html`: `data/constants.js` → `01-obfuscation.js` → `data/key-database.js` → `02-key-system.js` → …

---

## Phase 3 — Device State Store  ✅

### Goal
Replace the global mutable state pattern (`usb_client_list`, `current_usb_client`, individual getters/setters, `postMessage` dispatch) with a reactive state module that decouples device management from UI and protocol.

### The current mess

The state is scattered across:
- `03-device-info.js` — `create_usb_client()`, `create_device_info()`, and dozens of getters/setters like `get_cpi()`, `set_cpi()`, `reset_device_info()`, `reset_device_cfg()`, etc.
- `08-parse-cmd-ui.js` — `parse_cmd()` reads incoming HID data and writes into `client.device_info.*`, then fires `postMessage` actions
- `09-ui-clients.js` — `refresh_client_list()`, `refresh_current_client()` — mutates `usb_client_list` directly
- `13-event-dispatch.js` — the deeply nested `if/else` message listener that translates `postMessage` into function calls

### What goes where

```
lib-rawm-deob/
  state/
    device-store.js       ← NEW
  03-device-info.js       ← REMOVED (replaced by device-store.js)
  09-ui-clients.js        ← REWRITTEN (uses store instead of globals)
  13-event-dispatch.js    ← REWRITTEN (flat switch on store events)
```

### `device-store.js` design

```js
const DeviceStore = {
  // State
  clients: [],             // replaces usb_client_list
  currentId: null,         // replaces current_usb_client (store only the id)

  // Read operations (pure getters)
  get current()            → finds client by currentId
  getClient(id)            → finds client by id
  getDeviceInfo(client)    → returns client.device_info (still mutable, but accessed through store)

  // Write operations (mutate + notify)
  addClient(device)        → creates, pushes, emits 'client:added'
  removeClient(id)         → removes, emits 'client:removed'
  selectClient(id)         → updates currentId, emits 'current:changed'
  updateDeviceInfo(id, patch) → merges patch into client.device_info, emits 'device:updated'

  // Events
  on(event, handler)       → subscribe
  off(event, handler)      → unsubscribe
}
```

### How `postMessage` dispatch simplifies

Current `13-event-dispatch.js`:
```js
window.addEventListener('message', event => {
  if (event.data.action == ACTION_REFRESH_CLIENT_LIST) {
    refresh_client_list();
  } else {
    if (event.data.action == ACTION_REFRESH_CURRENT_CLIENT) {
      refresh_current_client();
    } else {
      if (event.data.action == ACTION_SEND_CLIENT_DATA) {
        ...
      }
      ...
    }
  }
});
```

After:
```js
DeviceStore.on('client:added', () => ui_refresh_client_list());
DeviceStore.on('current:changed', () => ui_refresh_current_client());
DeviceStore.on('device:updated', () => ui_refresh_setting(DeviceStore.current));
DeviceStore.on('device:synced', () => ui_refresh_kbd_tab(...));
```

### Risk reduction
- `parse_cmd()` is still the Parser — it just calls `DeviceStore.updateDeviceInfo(id, data)` instead of directly mutating globals
- `send_client_data()` is still the Transmitter — it reads from `DeviceStore.current`
- The UI files (`10-ui-settings.js`, `11-ui-mapping.js`, `14-ui-keyboard.js`) still access `client.device_info.*` — they don't need to change yet

### What changed

| Before | After |
|--------|-------|
| Global `usb_client_list` array mutated directly by `refresh_client_list()` | `DeviceStore.clients` (getter/setter backed by same array); `addClient()` / `removeClient()` emit events |
| Global `current_usb_client` variable assigned directly in `refresh_current_client()` | `DeviceStore.currentId` + `DeviceStore.current` getter; `current_usb_client` kept as backward-compat alias |
| `03-device-info.js` — 1012 lines (action constants + state + device model + 70+ getter/setter helpers) | Absorbed into `state/device-store.js` (31KB) |
| `13-event-dispatch.js` — 10-level nested `if/else` inside `window.addEventListener('message', ...)` | Flat `switch` on `event.data.action` + `DeviceStore.on()` subscriptions |
| `09-ui-clients.js` — `refresh_client_list()` builds `payload` array, assigns `usb_client_list = payload`, fires `postMessage` | Mutates `DeviceStore.clients` in-place via `addClient`/`removeClient`, calls `refresh_current_client()` directly |
| `08-parse-cmd-ui.js` — declares `let usb_client_list`, `let current_usb_client` | Removed (declarations moved to device-store.js) |

### Retrospective

**What went well:**
- The reactive store design itself was straightforward — a simple event emitter with get/set operations. No framework, no dependencies.
- The `DeviceStore.clients` getter/setter pattern (backed by `_deviceClients` + `usb_client_list` alias) allowed incremental migration — UI files continued working without changes.
- `reset_device_info()` and `parse_device_info()` were safely extracted as-is, same logic, same call sites.

**What broke (and why):**
1. **Missing cascade** — `refresh_client_list()` previously ended with `postMessage(ACTION_REFRESH_CURRENT_CLIENT)`, which the message handler turned into `refresh_current_client()`. Removing that postMessage without adding a direct call meant `refresh_current_client()` was never called → no client was ever selected → UI stayed in "no device" state forever. Fixed by adding `refresh_current_client()` at the end.

2. **Missing `ui_refresh_client_list()` on selection** — The old `refresh_current_client()` always posted both `ACTION_UI_REFRESH_CLIENT_LIST` and `ACTION_UI_REFRESH_CURRENT_CLIENT`. The store's `current:changed` handler only called the latter. Fixed.

3. **Event emission before DOM setup** — `DeviceStore.selectClient()` emits `current:changed` synchronously, which triggered `ui_refresh_current_client()` before the radio-button DOM state was applied. Changed to set `DeviceStore.currentId` + `current_usb_client` directly, modify DOM, then `_emit('current:changed')`.

**Lesson:** When replacing synchronous `postMessage` chains with direct function calls + event emission, the timing differences matter. `postMessage` is fire-and-forget (asynchronous), so each handler runs in its own microtask with the DOM in a consistent intermediate state. Direct synchronous calls preserve the logical order but expose the exact sequence of side effects. The fix is to batch all DOM mutations before the final event emission.

### Effort
~3 hours — the core was simple; the debugging was the cascade issue.

### Files touched

```
lib-rawm-deob/
  state/
    device-store.js       ← NEW (31KB — reactive store + 70+ helpers from 03)
  03-device-info.js       ← REMOVED (1012 lines)
  09-ui-clients.js        ← REWRITTEN (uses DeviceStore instead of globals)
  13-event-dispatch.js    ← REWRITTEN (flat switch + store event handlers)
  08-parse-cmd-ui.js      ← UPDATED (removed usb_client_list/current_usb_client declarations)
hub-deob.html             ← UPDATED (03-device-info.js → state/device-store.js)
```

---


## Phase 4 — Protocol Layer Cleanup  🔲

### Goal
Clean up the three protocol files (`05-hs-protocol.js`, `06-hid-protocol.js`, `08-parse-cmd-ui.js`) by isolating the pure encoding/decoding logic, replacing the giant switch statements with handler registries, and using typed buffer helpers.

### Before

**`hs_parse_cmd()`** (part of `05-hs-protocol.js`):
- ~1272 lines
- Single function with a giant `switch` on the first byte
- Parsing + state mutation + UI dispatch all in one function
- Manual `subarray` slicing for chunked data

**`parse_cmd()`** (in `08-parse-cmd-ui.js`):
- ~1000 lines
- Nested `if/else if` on response type, then nested `if/else if` on parameter subtype
- Each branch reads bytes, mutates `client.device_info`, and posts UI messages
- CRC/sync/recv-buf management mixed with payload parsing

**`send_event()` / `crc_process()`** (in `06-hid-protocol.js`):
- Encodes payload, optional CRC wrapping
- But CRC computation is inline, buffer management is manual

### After

```
lib-rawm-deob/
  protocol/
    buffer.js             ← NEW  (PacketReader / PacketBuilder helpers)
    hs-parser.js          ← NEW  (handler registry for HS commands)
    hid-parser.js         ← NEW  (handler registry for HID response types)
    hid-transport.js      ← NEW  (send_event, crc_process, recv_buf management)
  05-hs-protocol.js       ← REWRITTEN (thin wrappers calling hs-parser + hid-transport)
  06-hid-protocol.js      ← REWRITTEN (thin wrappers calling hid-parser + hid-transport)
  08-parse-cmd-ui.js      ← REWRITTEN (thin wrappers calling hid-transport)
```

### Key architectural changes

**Handler registry instead of switch:**
```js
// Before:
function hs_parse_cmd(client) {
  switch (data[0]) {
    case 0x12: // get keycode buff
      // 50 lines of parsing + state + UI
      break;
    case 0x5:  // set keycode
      // 30 lines
      break;
    ...
  }
}

// After:
const hsHandlers = {
  [CMD_GET_KEYCODE_BUF]: (client, data) => {
    // 50 lines of parsing only
    DeviceStore.updateDeviceInfo(client.id, { kbd_key_infos: parsed });
  },
  [CMD_SET_KEYCODE]: (client, data) => {
    // 30 lines of parsing only
    DeviceStore.updateDeviceInfo(client.id, { kbd_key_infos: parsed });
  },
};
```

**Buffer helpers instead of manual slicing:**
```js
// Before:
function hs_get_keycode_buff(client, value, maxCount) {
  if (maxCount > 0x1c) return;
  var payload = [];
  payload.push(0x12);
  payload.push(value >> 0x8 & 0xff);
  payload.push(value & 0xff);
  payload.push(maxCount);
  send_event(client, hs_format_data(client, payload));
}

// After:
function hs_get_keycode_buff(client, offset, count) {
  if (count > HS_CHUNK_MAX) return;
  send_event(client, PacketBuilder.begin(CMD_GET_KEYCODE_BUF)
    .uint16(offset)
    .uint8(count)
    .build());
}

// Parser:
function parseKeycodeBuf(data) {
  const reader = PacketReader.from(data);
  const count = reader.uint8();
  const entries = [];
  for (let i = 0; i < count; i++) {
    entries.push({
      row: reader.uint8(),
      col: reader.uint8(),
      keyId: reader.uint16(),
      ...
    });
  }
  return entries;
}
```

### Effort
~3 days — medium-high complexity. The handler registry is straightforward. The buffer helpers are mechanical but tedious (every protocol command needs its parser). Biggest win is making `hs_parse_cmd()` and `parse_cmd()` verifiably correct.

---

## Phase 5 — UI Template Extraction + Bundle  🔲

### Goal
Stop generating HTML via string concatenation in the UI files. Bundle the cleaned-up modules into a single loadable script.

### HTML generation hotspots

The worst offenders:
- `14-ui-keyboard.js` — `ui_select_key_init()` and `dialog_select_key_init()` build keyboard picker layouts by repeatedly concatenating strings inside loops with inline CSS
- `10-ui-settings.js` — `ui_refresh_setting_delayed()` builds polling rate radios, CPI level selectors, and power mode options via string concat
- `11-ui-mapping.js` — `setting_mapping_init()` builds `<select>` dropdowns and `<table>` rows

### Template helper approach

Not a framework — just extracting the worst patterns into readable helpers:

```js
// Before:
html += "<a kbd-select-key-index=\"" + index + "\" kbd-select-key-action=\"select\" style=\"cursor: pointer;\">";
html += "<div style=\"width:" + value4 + "px; height:" + value5 + "px;\">";

// After:
html += KeyButton({
  index, key, selectKeys,
  action: 'select',
  width: value4, height: value5
});
```

```js
function KeyButton(props) {
  const { index, key, action, width, height } = props;
  return `<a kbd-select-key-index="${index}" kbd-select-key-action="${action}" style="cursor: pointer;">
    <div style="width:${width}px; height:${height}px;">...</div></a>`;
}
```

### Bundle step

Add a build step to concatenate and minify:

```
npm i -D esbuild
```

```js
// build.js
require('esbuild').buildSync({
  entryPoints: ['lib-rawm-deob/loader.js'],
  outfile: 'lib-rawm-deob/dist/bundle.js',
  minify: false,
  format: 'iife',
});
```

Where `loader.js` imports everything in dependency order:
```js
// loader.js — controls dependency order
import './data/constants.js';
import './data/key-database.js';
import './data/device-database.js';  // (if we add it later)
import './01-obfuscation.js';
import './02-key-system.js';
import './state/device-store.js';
import './protocol/buffer.js';
import './protocol/hid-transport.js';
...
```

Then `hub-deob.html` replaces 14 script tags with 1:
```html
<script src="lib-rawm-deob/dist/bundle.js"></script>
```

This unlocks strict mode, dead-code elimination, and (later) TypeScript.

### Effort
~2 days — low complexity, mostly tedious template extraction. The build step is trivial (esbuild).

---

## Phase 6 — Device Database & Binary Reader  🔲

### Goal
Extract product metadata from `07-http-data-model.js` into a declarative data file, and split out its binary-deserialization helpers into the protocol layer. This is Phase 1's twin for the device-identification side of the codebase.

### What `07-http-data-model.js` currently holds

A mixed bag of concerns in 556 lines:

| Concern | Lines | Fate |
|---------|-------|------|
| Product ID → sensor mapping (`switch (productId) { case 0x2328: … }`) | ~30 | → `data/device-database.js` |
| Device name → sensor fallback (`if (name == "SA-ML01")`) | ~10 | → `data/device-database.js` |
| Binary read helpers (`GET_UINT8`, `GET_UINT16`, `GET_UINT32`) | ~10 | → `protocol/binary-reader.js` |
| `create_key_info()`, `create_macro_info()`, `copy_key_info()`, `clone_macro_info()` | ~100 | → `protocol/key-config-parser.js` |
| `add_key_info()` — the giant nested binary parser for key configs | ~320 | → `protocol/key-config-parser.js` |
| HTTP transport (`query_firmware`, `upload_mouse_config`, `send_event_config_reset`, `send_event_factory_reset`) | ~85 | stays in `07-http-data-model.js` (rewritten) |

### Device database design

```js
// data/device-database.js
const DEVICE_DB = {
  // Product metadata keyed by product ID
  products: {
    0x2328: { name: "KNIFE",  sensor: null },
    0x2329: { name: "SA-ML01", sensor: "PAW3395" },
    0x232a: { name: "Receiver", sensor: null },
    0x232b: { name: "Receiver 8K", sensor: null },
    0x232c: { name: "SA-MH01", sensor: "PAW3395" },
    0x232d: { name: "SA-SL01", sensor: "PAW3395" },
    0x232e: { name: "SA-SH01", sensor: "PAW3395" },
    0x232f: { name: "GS-SH01", sensor: null },
    0x2330: { name: "ER21",    sensor: null },
    0x2331: { name: "ES21",    sensor: "PAW3950" },
    0x2332: { name: "ES21Pro", sensor: "PAW3950" },
    0x2334: { name: "ER21M",   sensor: "PAW3950" },
    0x2335: { name: "ER21Pro", sensor: null },
    0x2336: { name: "ER21Pro", sensor: null },
    0x2337: { name: "ES21M",   sensor: "PAW3950" },
    0x2338: { name: "MH01Pro", sensor: "PAW3950" },
    0x2339: { name: "SH01Pro", sensor: "PAW3950" },
  },

  // Lookup helpers
  getSensor(productId) {
    return DEVICE_DB.products[productId]?.sensor ?? null;
  },
  getName(productId) {
    return DEVICE_DB.products[productId]?.name ?? null;
  },

  // Name-based sensor fallback (for unknown PIDs)
  nameSensorFallbacks: {
    "SA-ML01": "PAW3395",
    "SA-MH01": "PAW3395",
    "SA-SL01": "PAW3395",
    "SA-SH01": "PAW3395",
    "ES21":    "PAW3395",
    "MH01Pro": "PAW3950",
    "SH01Pro": "PAW3950",
    "ES21Pro": "PAW3950",
    "ES21M":   "PAW3950",
    "ER21Pro": "PAW3950",
    "ER21M":   "PAW3950",
  },
};
```

Usage:
```js
// Before:
switch (client.device_info.productId) {
  case 0x2329: len2 = "PAW3395"; break;
  case 0x2331: len2 = "PAW3950"; break;
  ...
}

// After:
const sensor = DEVICE_DB.getSensor(client.device_info.productId)
  ?? DEVICE_DB.nameSensorFallbacks[client.device_info.deviceName];
```

### Binary reader

The `GET_UINT8(value, value2)` pattern (returning `[result, newOffset]`) is not just for `07-http-data-model.js` — several other files manually read bytes. A unified `BinaryReader` wraps the same pattern:

```js
// protocol/binary-reader.js
class BinaryReader {
  constructor(data) { this.data = data; this.offset = 0; }

  uint8()  { return this.data[this.offset++] & 0xff; }
  uint16() { const v = this.data[this.offset] & 0xff | (this.data[this.offset + 1] & 0xff) << 8; this.offset += 2; return v; }
  uint32() { let v = 0; for (let i = 0; i < 4; i++) v |= (this.data[this.offset++] & 0xff) << (i * 8); return v; }
  subarray(len) { const s = this.data.subarray(this.offset, this.offset + len); this.offset += len; return s; }
  done()   { return this.offset >= this.data.length; }
  remaining() { return this.data.length - this.offset; }
}
```

### Key config parser

`add_key_info()` is the most complex binary parsing function (~320 lines, deeply nested conditionals for macro keys, SOCD, mouse mappings, etc.). Extract it into a dedicated file with named parsing stages:

```js
// protocol/key-config-parser.js
function parse_key_config(data, clientKeys) {
  const reader = new BinaryReader(data);
  const header = reader.uint8();
  if ((header & 0xf) !== 0x3) return [];

  const totalLen = (data[0] << 4 & 0xf00) | reader.uint8();
  if (data.length < totalLen) return [];

  const keyInfo = create_key_info();
  const idx = reader.uint8();

  switch (idx) {
    case 0x16: return parse_mouse_mapping(reader, keyInfo);
    case 0x18: return parse_mapping_function(reader, keyInfo);
    case 0x05:
    case 0x2b: return parse_macro_entry(reader, keyInfo, idx);
    default:   return [];
  }
}
```

### Files touched

```
lib-rawm-deob/
  data/
    device-database.js       ← NEW (80 lines)
  protocol/
    binary-reader.js         ← NEW (30 lines)
    key-config-parser.js     ← NEW (350 lines, extracted from 07)
  07-http-data-model.js      ← REWRITTEN (556 → 100 lines, pure transport)
```

### Effort
~1.5 days — the data extraction itself is mechanical; the key config parser is the hard part because its control flow is deeply nested and every branch needs verification. The BinaryReader is trivial.

---

## Phase 7 — Keyboard Structure Redistribution  🔲

### Goal
`04-kbd-structures.js` (280 lines) is a grab-bag of sync state, factory functions, accessor getters, and HS protocol stubs. Redistribute each concern to the appropriate layer (state store, protocol).

### Current contents

| Section | Lines | What | Goes where |
|---------|-------|------|-----------|
| Global sync buffers (`kbd_data_sync_index`, `kbd_keyinfo_list`, …) | 10 | Mutable sync state for chunked HS protocol data | `state/device-store.js` |
| Factory + clone functions (`kbd_create_*_info`, `kbd_clone_*_info`) | 120 | 9 pairs of factory/clone for axis, SOCD, MT, RS, DKS, light, light-box, key-light, macro structs | `state/kbd-structures.js` |
| Accessor getters (`kbd_get_key_infos`, `kbd_get_axis_infos`, …) | 40 | Thin reads into `client.device_info.*` | `state/device-store.js` (as `DeviceStore.getKeyInfos(id)`, etc.) |
| Device checks (`is_keyboard_5_15`, `is_hs_keyboard`) | 10 | Product capability queries | `data/device-database.js` |
| HS protocol comment block | 30 | Living documentation | Keep as comment in `protocol/hs-parser.js` |

### After

```
lib-rawm-deob/
  state/
    device-store.js           ← UPDATED (added sync buffers + kbd accessors)
    kbd-structures.js         ← NEW  (factory/clone functions, moved from 04)
  04-kbd-structures.js        ← REMOVED
  data/
    device-database.js        ← UPDATED (added `isKeyboard5_15`, `isHsKeyboard`)
  protocol/
    hs-parser.js              ← UPDATED (added HS protocol doc comment block)
```

### What `state/kbd-structures.js` looks like

Pure data-structure constructors, no global state:

```js
// state/kbd-structures.js
export function createAxisInfo(overrides) {
  return {
    row: -1, col: -1,
    switch_type: 0, apc_lv: 0x96,
    rt_enable: 0, rt_press_lv: 0x32, rt_release_lv: 0x32,
    top_dz: 0xf, btm_dz: 0x14,
    ...overrides,
  };
}

export function cloneAxisInfo(source) {
  return { ...source };
}
// … same pattern for socd, mt, rs, dks, light, lightBox, keyLight, macro
```

### Sync buffers in DeviceStore

```js
// Added to state/device-store.js
const DeviceStore = {
  // …existing state…
  kbdSync: {
    index: 0,                          // bitmask: bit 0=keycode, 1=light, 2=axis, 3=special
    keyinfoList: [],
    axisinfoList: [],
    socdinfoList: [],
    mtinfoList: [],
    rsinfoList: [],
    dksinfoList: [],
    lightinfoList: [],
    macroinfoList: [],
    macroIndex: 0,
    macroBuff: [],
  },

  // KBD accessors (replacing kbd_get_* functions)
  getKeyInfos(client)      { return client.device_info.kbd_key_infos; },
  getLightInfo(client)      { return client.device_info.kbd_light_info; },
  getAxisInfos(client)      { return client.device_info.kbd_axis_infos; },
  getAxisMode(client)       { return client.device_info.kbd_axis_mode; },
  getSocdInfos(client)      { return client.device_info.kbd_socd_infos; },
  getMtInfos(client)        { return client.device_info.kbd_mt_infos; },
  getRsInfos(client)        { return client.device_info.kbd_rs_infos; },
  getDksInfos(client)       { return client.device_info.kbd_dks_infos; },
  getMacroInfos(client)     { return client.device_info.kbd_macro_infos; },
  getMacroNum(client)       { return client.device_info.kbd_macro_num; },
  getMacroMaxSize(client)   { return client.device_info.kbd_macro_max_size; },
  getOnboardNum(client)     { return client.device_info.kbd_onboardNum; },
};
```

### Callers that need updating

Every file that calls `kbd_get_*(client)` or references `kbd_data_sync_index` / `kbd_keyinfo_list` directly needs to route through `DeviceStore`:

- `05-hs-protocol.js` — writes to sync buffers during chunked HS parsing
- `10-ui-settings.js` — reads axis/socd/mt/rs/dks infos for UI
- `11-ui-mapping.js` — reads key infos for mapping editor
- `14-ui-keyboard.js` — reads light infos for keyboard LED UI

### Effort
~1 day — mostly mechanical. The tricky part is making sure every caller of the old globals is migrated. The `kbd_clone_*` functions are used in protocol code and need import paths updated.

---

## Phase 8 — Obfuscation Retirement  🔲

### Goal
`01-obfuscation.js` exists only because the original code was obfuscated. Now that we've deobfuscated everything, the module's two remaining jobs can be eliminated or absorbed:

1. **String decoder** (`_0x4dcb()`) — originally needed because all string literals were obfuscated. After Phases 1–7, zero remaining deobfuscated files use `_0x4dcb()` for string resolution. The string array and rotation IIFE can be removed.
2. **`KEY_*` constants** (`KEY_NONE`, `KEY_CTRL`, `KEY_SHIFT`, …) — used as standardised name tokens in key-info objects throughout the app. These belong in `data/constants.js` (Phase 2).

### String decoder verification

Before removing, scan for any remaining `_0x4dcb()` calls in `lib-rawm-deob/`:

```
rg '_0x4dcb\(' lib-rawm-deob/
```

If zero matches, the decoder is dead code.

### KEY_* constants migration

```js
// Before: 01-obfuscation.js
const KEY_NONE = "NONE";
const KEY_CTRL = "CTRL";
const KEY_SHIFT = "SHIFT";
const KEY_WINDOWS = "WINDOWS";
// …36 more…

// After: data/constants.js (added to existing constants)
export const KEY_NONE     = "NONE";
export const KEY_CTRL     = "CTRL";
export const KEY_SHIFT    = "SHIFT";
export const KEY_WINDOWS  = "WINDOWS";
export const KEY_WHEEL_UP    = "WHEELUP";
export const KEY_WHEEL_DOWN  = "WHEELDOWN";
// …etc…
```

### Files touched

```
lib-rawm-deob/
  data/
    constants.js              ← UPDATED (added KEY_* constants)
  01-obfuscation.js           ← REMOVED (dead decoder + migrated constants)
  hub-deob.html               ← UPDATED (remove 01-obfuscation.js script tag)
```

### Risk
Low — the decoder has been dead code since the initial deobfuscation. The `KEY_*` constants are simple string aliases; moving them to `constants.js` changes nothing at runtime. Run the project and verify all keyboard UIs render correctly.

### Effort
~2 hours — verification scan + mechanical move.

---

## Phase 9 — Test Infrastructure  🔲

### Goal
Add a lightweight test suite that covers the extracted data and the protocol parsers. The goal is not 100% coverage but to protect the most critical and regression-prone parts: the key database, the device database, and the protocol parsers.

### What to test

| Module | What to test | Approach |
|--------|-------------|----------|
| `data/key-database.js` | Every entry has valid `v`, `t`, `n`; lookup functions return correct keys | Snapshot the database + property-based checks |
| `data/device-database.js` | Every product ID maps to expected sensor/name; fallback lookups work | Snapshot + edge cases |
| `data/constants.js` | All constants are unique, no collisions | Simple assertion |
| `protocol/buffer.js` | PacketBuilder produces expected byte sequences; PacketReader reads back correctly | Round-trip test (build → parse → compare) |
| `protocol/binary-reader.js` | uint8/16/32 and subarray produce correct values on known inputs | Known-answer tests |
| `protocol/key-config-parser.js` | Parsing known byte sequences produces expected key info objects | Golden data from captured device traffic |
| `protocol/hid-transport.js` | CRC computation matches known reference | Known-answer test |
| `state/device-store.js` | add/remove/select client fires correct events; state mutations are isolated | Unit-test the event emitter |

### How to run

```json
// package.json
{
  "scripts": {
    "test": "node --experimental-vm-modules test/run.js",
    "test:watch": "node --experimental-vm-modules test/run.js --watch"
  }
}
```

No test framework dependency — tests are plain JS files executed by a thin runner:

```
lib-rawm-deob/
  test/
    run.js                       ← test runner (~50 lines)
    key-database.test.js
    device-database.test.js
    constants.test.js
    buffer.test.js
    binary-reader.test.js
    key-config-parser.test.js
    device-store.test.js
```

Example test:
```js
// test/key-database.test.js
import { KEY_DB } from '../data/key-database.js';

export default {
  name: 'key-database',

  'all keys have required fields'() {
    for (const key of KEY_DB.keys) {
      if (key.v === undefined) throw new Error(`Missing vCode at ${JSON.stringify(key)}`);
      if (key.t === undefined) throw new Error(`Missing type at ${JSON.stringify(key)}`);
    }
  },

  'modifiers are 5 entries'() {
    if (KEY_DB.modifiers.length !== 5) {
      throw new Error(`Expected 5 modifiers, got ${KEY_DB.modifiers.length}`);
    }
  },

  'lookup by vCode returns correct key'() {
    // Esc = 0x1b
    const esc = resolve_key(0x1b);
    if (!esc || esc.name !== 'Esc') {
      throw new Error(`Expected Esc, got ${JSON.stringify(esc)}`);
    }
  },
};
```

### Effort
~2 days — test writing is straightforward but thorough. The most valuable tests are the golden-data round-trips for `key-config-parser.js` (capture real device traffic → verify parser produces correct objects → verify re-encoding produces identical bytes).

---

## What We Are NOT Doing (anti-goals)

- **No framework migration** — `rawmhub-vue/` already proved that's too big a leap. The HTML is the product.
- **No TypeScript yet** — adds friction without fixing the architecture. Consider after all phases are complete.
- **No rewriting layers** — the 2400-line HTML file is the UI. We clean up the JS that renders into it, but don't replace the structure.
- **No abstracting layui** — it's the UI runtime. Wrapping it in a shallow abstraction layer adds complexity without value.

---

## Summary of Effort

| Phase | What | Effort | Status |
|-------|------|--------|--------|
| 1 | Key Database Extraction | ~1 day | ✅ Done |
| 2 | Named Constants | ~1 day | ✅ Done |
| 3 | Device State Store | ~2 days | ✅ Done |
| 4 | Protocol Layer Cleanup | ~3 days | 🔲 |
| 5 | UI Templates + Bundle | ~2 days | 🔲 |
| 6 | Device Database & Binary Reader | ~1.5 days | 🔲 |
| 7 | Keyboard Structure Redistribution | ~1 day | 🔲 |
| 8 | Obfuscation Retirement | ~2 hours | 🔲 |
| 9 | Test Infrastructure | ~2 days | 🔲 |
| | **Total** | **~13.5 days** | |

Each phase produces a working application. The order maximizes value per phase — Phase 1 alone eliminated 70% of `02-key-system.js` with zero behavioral risk. Phases 6–9 complete the strangler fig pattern: by the end, every module either has a clean home in `data/`, `state/`, or `protocol/`, or has been removed entirely. The final artifact (`hub-deob.html` + `dist/bundle.js`) has zero dependency on the original obfuscated runtime.
