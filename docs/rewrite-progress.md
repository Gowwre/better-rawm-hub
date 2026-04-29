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

## Phase 2 — Named Constants  🔲

### Goal
Replace every magic hex number across all 14 files with a named constant. This makes the code readable and prevents transcription errors during later refactors.

### What this targets

The most egregious examples found during Phase 1:

**Protocol command IDs** in `05-hs-protocol.js` and `08-parse-cmd-ui.js`:
```
0xf5  →  CMD_FIRMWARE_VERSION
0x12  →  CMD_GET_KEYCODE_BUF
0x5   →  CMD_SET_KEYCODE
0x8   →  CMD_GET_LIGHT
0x7   →  CMD_SET_LIGHT
0x36  →  CMD_GET_LIGHT_DEFINE_BUF
0x37  →  CMD_SET_LIGHT_DEFINE
0x1a  →  CMD_GET_AXIS_INFO
0x19  →  CMD_SET_AXIS_INFO
...   →  ~30 more HS protocol commands
```

**Protocol command IDs** in `06-hid-protocol.js` and `07-http-data-model.js`:
```
0x42  →  CMD_VIRTUAL_CHILD_POLL  (the 0x42 action)
0x33  →  CMD_DEVICE_REBOOT
0x35  →  CMD_FACTORY_RESET
0x3   →  CMD_CONFIG_RESET
...   →  ~20 more HID commands
```

**Response type IDs** in `parse_cmd()`:
```
type 0x2  →  RESP_DEVICE_INFO_JSON
type 0xb  →  RESP_PARAMETER
type 0xe  →  RESP_PING
type 0x7  →  RESP_SYNC
...       →  ~15 more response types (including the deeply nested subtype switch for 0xb)
```

**Parameter IDs** inside the `type == 0xb` switch (the deep nesting):
```
subtype 0x0  →  PARAM_RESOLUTION
subtype 0x6  →  PARAM_RESOLUTION_32BIT
subtype 0x1  →  PARAM_POLLING_RATE
subtype 0x5  →  PARAM_POWER_MODE
subtype 0x8  →  PARAM_KEY_DELAY
subtype 0x7  →  PARAM_LOD
subtype 0xc  →  PARAM_ESB_DEVICE_INFO
subtype 0xd  →  PARAM_MOTION_SYNC
subtype 0xe  →  PARAM_ANGLE_TUNING
subtype 0xf  →  PARAM_ANGLE_SNAPPING
subtype 0x10 →  PARAM_RIPPLE_CONTROL
subtype 0x13 →  PARAM_2_4G_SCORES
subtype 0x14 →  PARAM_KEY_DELAY_ENTRY
...          →  ~10 more subtypes
```

**Product ID constants** scattered in `07-http-data-model.js`:
```
0x2328  →  PID_ML01
0x2329  →  PID_... (each maps to a product name)
0x232a
...
0x2339  →  18+ product IDs
```

**Buffer / chunk sizes**:
```
0x20  →  HS_FRAME_SIZE   (HS protocol frame)
0x1c  →  HS_CHUNK_MAX    (max items per chunk)
0x40  →  HID_REPORT_SIZE (HID output report)
0x3e8 →  SYNC_TIMEOUT_MS (1 second sync timeout)
```

**Response type constants** in `hs_parse_cmd()` (the 1272-line function):
```
0xf5  →  CMD_FIRMWARE_VERSION
0x12  →  CMD_GET_KEYCODE_BUF
0x39  →  CMD_GET_ONBOARD_INDEX
0x40  →  CMD_SET_ONBOARD_INDEX
0x50  →  CMD_GET_LIGHT_BOX
0x51  →  CMD_SET_LIGHT_BOX
0x52  →  CMD_GET_LIGHT_SLEEP_TIME
0x53  →  CMD_SET_LIGHT_SLEEP_TIME
0x45  →  CMD_GET_AXIS_MODE
0x46  →  CMD_SET_AXIS_MODE
0x41  →  CMD_CUSTOM_DATA_SAVE
0x1a  →  CMD_GET_AXIS_INFO
0x19  →  CMD_SET_AXIS_INFO
0x1e/1f → CMD_SOCD_GET_NUM / CMD_SOCD_SET_NUM
0x20/21 → CMD_SOCD_GET_DATA / CMD_SOCD_SET_DATA
0x22/23 → CMD_MT_GET_NUM / CMD_MT_SET_NUM
0x24/25 → CMD_MT_GET_DATA / CMD_MT_SET_DATA
0x2e/2f → CMD_RS_GET_NUM / CMD_RS_SET_NUM
0x30/31 → CMD_RS_GET_DATA / CMD_RS_SET_DATA
0x2a/2b → CMD_DKS_GET_NUM / CMD_DKS_SET_NUM
0x2c/2d → CMD_DKS_GET_DATA / CMD_DKS_SET_DATA
0xe/0f  → CMD_MACRO_GET / CMD_MACRO_SET
0xc/0d  → CMD_MACRO_NUM / CMD_MACRO_SIZE
0x10    → CMD_MACRO_RESET
0x6     → CMD_KEYCODE_FACTORY_RESET
0xa     → CMD_HS_FACTORY_RESET
```

### Deliverable
A single `constants.js` file loaded before all other scripts:
```
lib-rawm-deob/
  data/
    key-database.js
    constants.js          ← NEW
```

Usage pattern:
```js
// Before:
hs_parse_cmd: case 0x12: ...

// After:
hs_parse_cmd: case CMD_GET_KEYCODE_BUF: ...
```

### Effort
~1 day — mechanical search-and-replace across ~15K lines. Best done with a script to batch-replace known patterns, then manual review of edge cases.

---

## Phase 3 — Device State Store  🔲

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

### Effort
~2 days — medium complexity. The core is the reactive event emitter. The tricky part is ensuring every existing code path that reads/writes globals is covered.

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
| 2 | Named Constants | ~1 day | 🔲 |
| 3 | Device State Store | ~2 days | 🔲 |
| 4 | Protocol Layer Cleanup | ~3 days | 🔲 |
| 5 | UI Templates + Bundle | ~2 days | 🔲 |
| | **Total** | **~9 days** | |

Each phase produces a working application. The order maximizes value per phase — Phase 1 alone eliminated 70% of `02-key-system.js` with zero behavioral risk.
