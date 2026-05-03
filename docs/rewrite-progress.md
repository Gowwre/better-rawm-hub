# lib-rawm-deob Rewrite Progress

## Current Status — ROLLED BACK

As of 2026-05-01, `lib-rawm-deob/` has been reset to commit `a097999` (pre-ESM conversion) because the TypeScript/ESM migration introduced systematic runtime regressions that could not be resolved incrementally.

The phases below that are marked ✅ worked at the time but broke when later phases (ESM module conversion + TypeScript) were applied on top. A full hardware-in-the-loop verification is needed before any phase can be considered truly complete.

---

## Strategy: Strangler Fig Pattern (suspended)

Replace one module at a time from the inside out. Each phase produces a working application — no big-bang cutover. Keep `hub-deob.html` as the consumer throughout.

---

## Phase 1 — Key Database Extraction  ✅ (needs re-verification)

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

## Phase 3 — Device State Store  🔴 BROKEN — needs redo

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

4. **Wrong constant in `get_max_power_polling_rate()`** — The original code checked `powerMode == 0x0` to apply the 125Hz limit, but the refactored version used `POWER_MODE_DEFAULT` (0x2). Since the mouse's `powerMode` is 2, the original correctly allowed full polling rate range while the refactored version incorrectly capped it at 125Hz. Discovered in Phase 4 debugging; fixed by using `0x0` instead of `POWER_MODE_DEFAULT`.

**Lesson:** When replacing magic hex numbers with named constants, verify the mapping is semantically correct, not just numerically equal. `0x0` is not `POWER_MODE_DEFAULT` — it's a different power mode entirely. Always cross-reference the original code's comparison value with the constant's meaning.

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


## Phase 4 — Protocol Layer Cleanup  🔴 BROKEN — needs redo

### Goal
Clean up the three protocol files (`05-hs-protocol.js`, `06-hid-protocol.js`, `08-parse-cmd-ui.js`) by isolating the pure encoding/decoding logic, replacing the giant switch statements with handler registries, and using typed buffer helpers.

### What changed

| Before | After |
|--------|-------|
| `hs_parse_cmd()` — 1272-line single `switch` on first byte, parsing + mutation + UI dispatch mixed | `protocol/hs-parser.js` — `hsHandlers{}` registry with 35 named handlers, each parsing + calling `DeviceStore.updateDeviceInfo()` / `postMessage()` |
| `parse_cmd()` — 1000-line nested `if/else if` (10 levels deep) on response type × parameter subtype | `protocol/hid-parser.js` — `hidHandlers{}` registry with 4 outer handlers + flat `if/else` chain for 27 param subtypes |
| `send_event()` / `crc_process()` / `recv()` / `device_receive_data()` inline in protocol files | `protocol/hid-transport.js` — all transport primitives in one file |
| `payload.push(0x12); payload.push(value >> 8 & 0xff); payload.push(value & 0xff);` | `PacketBuilder.begin(CMD_GET_KEYCODE_BUF).uint16(offset).uint8(count).build()` |
| Manual `data.subarray()` slicing with offset tracking | `PacketReader` with `.uint8()`, `.uint16()`, `.subarray()` |
| `05-hs-protocol.js` — 1272 lines | 285 lines (thin command wrappers + hs_parse_cmd dispatch + hs_data_sync) |
| `06-hid-protocol.js` — 773 lines | 460 lines (all send_event_* wrappers + key helpers) |
| `08-parse-cmd-ui.js` — 1000 lines | 440 lines (thin parse_cmd dispatch + all UI globals/functions) |

### Files created

```
lib-rawm-deob/
  protocol/
    buffer.js             ← NEW  (PacketReader / PacketBuilder helpers)
    hs-parser.js          ← NEW  (handler registry for 35 HS commands)
    hid-parser.js         ← NEW  (handler registry for 4 HID response types)
    hid-transport.js      ← NEW  (send_event, crc_process, recv, device_receive_data, hs_*)
```

### Files rewritten

```
lib-rawm-deob/
  05-hs-protocol.js       ← REWRITTEN (1272 → 285 lines)
  06-hid-protocol.js      ← REWRITTEN (773 → 460 lines)
  08-parse-cmd-ui.js      ← REWRITTEN (1000 → 440 lines)
hub-deob.html             ← UPDATED (added 4 protocol/ script tags)
```

### Key architectural changes

**Handler registry instead of switch:**
```js
// Before: giant switch in hs_parse_cmd()
switch (data[0]) {
  case 0x12: // 50 lines parsing + state + UI
  case 0x5:  // 30 lines
}

// After:
function hs_parse_cmd(client) {
  var handler = hsHandlers[byteLen[0]];
  if (handler) handler(client, byteLen);
  if (!client.syncing) {
    client.recv_buf = skip_recv_buf(client.recv_buf, HS_FRAME_SIZE);
  }
}
```

**Buffer helpers instead of manual slicing:**
```js
// Before:
var payload = [];
payload.push(0x12);
payload.push(value >> 8 & 0xff);
payload.push(value & 0xff);
payload.push(maxCount);
send_event(client, hs_format_data(client, payload));

// After:
send_event(client, hs_format_data(client,
  PacketBuilder.begin(CMD_GET_KEYCODE_BUF)
    .uint16(offset).uint8(count).build()));
```

### Verification
- All 7 files pass `node --check` (syntax valid)
- Script order in `hub-deob.html`: 04-kbd-structures.js → protocol/buffer.js → protocol/hid-transport.js → protocol/hs-parser.js → protocol/hid-parser.js → 05-hs-protocol.js → ...
- Systematic cross-file regression check confirmed: all 70+ referenced functions exist, all global variables declared before use, all load-order constraints satisfied

### Retrospective

**What went well:**
- The handler registry pattern dramatically reduced cognitive load — `hs_parse_cmd()` went from 1272 lines of nested switch to a 20-line dispatch, and `parse_cmd()` went from 1000 lines of 10-level nested `if/else` to a 28-line dispatch.
- `PacketBuilder` / `PacketReader` eliminated repetitive `payload.push()` / `data.subarray()` code across all three protocol files. The builder's fluent API made command construction self-documenting.
- Extracting transport primitives (`send_event`, `crc_process`, `recv`, `device_receive_data`) into one file clarified the boundary between protocol semantics and raw byte shuffling.
- The HS command-building wrappers (`hs_get_keycode_buff`, `hs_set_axis_info`, etc.) were straightforward to convert — each is now a one-liner using `PacketBuilder`.

**What was tricky:**
1. **Circular-reference illusion** — `hs-parser.js` handlers call `hs_get_keycode_buff()`, `hs_get_light()`, etc. which are defined in `05-hs-protocol.js` (loaded after). This works because JavaScript resolves function identifiers lazily — the handler functions are created at parse time but only execute at runtime (when device data arrives), by which point all scripts have loaded. Same for `hid-parser.js` calling `send_event_query()` / `send_event_action()`.

2. **Handler-local vs outer-scope variables** — The original `hs_parse_cmd()` computed `pc_kbd_key_num(client)` and `pc_kbd_manager_keys(client)` once at the outer scope and shared them across switch cases. Extracting handlers meant each handler must recompute these. The functions are idempotent pure getters, so the result is identical — but it required vigilance during extraction to not accidentally reference a variable that no longer exists in scope.

3. **`hs_parse_cmd()` do-while reset logic** — The original `do { i = false; ... } while (i)` pattern with `i = true` at the bottom when a frame was consumed. Some handlers set `client.syncing = true` to prevent frame consumption (e.g. when firmware version hasn't arrived yet). The dispatch version must preserve this exact side-effect pattern. Each handler was checked to ensure it sets `client.syncing` identically to the original switch case.

**Lesson:** When extracting a giant switch into a handler registry, pay attention to what the switch case does OUTSIDE its own scope — does it set a flag that the outer loop checks? Does it modify a shared accumulator? The outer dispatch logic (loop, buffer management, sync detection) must remain correct regardless of which handler runs. The cleanest approach is to keep the outer loop/detection in the original file and only extract the per-case parsing into handlers.

### Effort
~3 hours — the handler registry and transport extraction were straightforward. The extraction of the 35 HS handlers and 4 HID handlers was mechanical but required careful attention to scoping. No runtime debugging needed (unlike Phase 3's cascade bug) because the outer dispatch loops were preserved exactly.

---

## Phase 5 — UI Template Extraction + Bundle  🔴 BROKEN

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

### What changed

| Before | After |
|--------|-------|
| `14-ui-keyboard.js` — 10+ functions building keyboard/mouse key grids via manual `html += "..."` with inline style concatenation | 10 functions converted to use `KeyGridCell()` helper — clean option-object API |
| `14-ui-keyboard.js` — 3 select dropdowns built by hand (light mode, sleep time, light box mode) | Uses `SelectElement()` helper |
| `14-ui-keyboard.js` — Row break logic (`index == 0xf || ...`) repeated 5+ times | `RowBreak(index)` single call |
| `14-ui-keyboard.js` — `kbd_ui_macro_edit_init` — 100-line deeply nested if/else for macro action HTML | Cleaned to flat conditionals with descriptive variable names |
| `10-ui-settings.js` — Light color picker: 80-line 7-level nested if/else chain (repeated 3× across file + 11-ui-mapping) | `ColorSelectorTable()` helper, data-driven from `COLOR_MAP` |
| `10-ui-settings.js` — Polling rate radios: 12-line forEach with manual checked/disabled | `RadioInput()` helper |
| `10-ui-settings.js` — Power mode + LOD radios: manual `col-xs3` vs `col-xs4` + inline attributes | `RadioInput()` helper |
| `11-ui-mapping.js` — Onboard status color table: 80-line nested if/else (3rd occurrence) | `ColorSelectorTable()` helper with `colorHex` override for `#EEE` |
| 20 `<script>` tags in `hub-deob.html` (7 CDN + 13 lib) | 7 CDN tags + 1 bundle script tag (`dist/bundle.js`) |
| No build step — files loaded individually | `build.mjs` — concatenates + minifies via esbuild, outputs `dist/bundle.js` + `dist/bundle.min.js` |

### Files created/modified

```
lib-rawm-deob/
  ui/
    ui-helpers.js              ← NEW  (KeyGridCell, RowBreak, SelectElement, RadioInput,
                                       ColorSelectorTable, CpiLevelItem, MacroEditCell helpers)
  build.mjs                    ← NEW  (esbuild bundle script)
  dist/
    bundle.js                  ← NEW  (651KB, unminified)
    bundle.min.js              ← NEW  (269KB, minified)
  data/constants.js            ← UPDATED (fixed 3 duplicate parameter `function(data, data)` → named params)
  10-ui-settings.js            ← UPDATED (color selector → ColorSelectorTable, polling/power/LOD → RadioInput)
  11-ui-mapping.js             ← UPDATED (onboard color → ColorSelectorTable)
  14-ui-keyboard.js            ← UPDATED (all key grids → KeyGridCell, selects → SelectElement,
                                           macro init/edit → cleaned)
hub-deob.html                  ← UPDATED (20 script tags → 7 CDN + 1 bundle)
package.json                   ← NEW  (build: `npm run build`)
```

### Template helpers (`ui/ui-helpers.js`)

| Helper | Purpose | Used in |
|--------|---------|---------|
| `KeyGridCell(props)` | Keyboard/mouse key grid cells with rect position | 10+ loops in 14-ui-keyboard.js |
| `RowBreak(index)` | Close/open row divs at breakpoints | 5 loops in 14-ui-keyboard.js |
| `SelectElement(props)` | `<select>` dropdowns with option arrays | 3 calls in 14-ui-keyboard.js |
| `RadioInput(props)` | `<input type="radio">` with checked/disabled | 3 calls in 10-ui-settings.js |
| `ColorSelectorTable(props)` | Color radio picker (7-color chain) | 3 calls across 10-ui-settings.js + 11-ui-mapping.js |
| `CpiLevelItem(props)` | CPI level grid item with image/color/text | Available for ui_refresh_cpi_levels |
| `MacroEditCell(props)` | Macro edit grid cell | Available for kbd_ui_macro_edit_init |

### Bundle step

```sh
npm run build
```

Uses esbuild to concatenate all 21 files in dependency order, outputs:
- `dist/bundle.js` — unminified (for development/debugging)
- `dist/bundle.min.js` — minified (268KB, for production)

### Side fixes

- **Duplicate parameter names**: `14-ui-keyboard.js` had 3 instances of `function(result, data, data)` which cause `SyntaxError` in strict mode. Renamed to `(result, evtCode, evtTime)` and `(result, layero, that)`.

### Retrospective

**What went well:**
- The `KeyGridCell` helper eliminated ~80% of the HTML concatenation in `14-ui-keyboard.js` — 10 loops reduced to 5-line calls.
- `ColorSelectorTable` eliminated the most deeply nested code (7-level if/else, 80 lines per occurrence, 3 occurrences = 240 lines → 3 lines each).
- The build step was trivial with esbuild — the concatenation approach works because all files share the global scope.

**Regressions caught & fixed during testing:**

1. **Missing pair panel on first load** — `ui_refresh_client_list()` was only called in response to store events (`client:added`, `current:changed`). On initial page load with no devices, no event fires and the pair panel (connect button) never appears. Fixed by adding an explicit call after `pc_key_manager_init()` in the `layui.use` callback.

2. **Polling rate `checked` logic** — Extracted polling rate radios into `RadioInput()` helper but incorrectly set `checked: isCurrent && withinLimit`. When the current rate exceeds the power limit, the original shows `checked disabled` (still selected though greyed out). The helper computed `checked: false` for this case, making no radio appear selected. Fixed to `checked: isCurrent` (original behaviour preserves the selected value even when disabled).

3. **Variable rename orphan (`len2` → `lods`)** — In the LOD section of `ui_refresh_setting_delayed()`, the variable `len2` was renamed to `lods` in the declaration but one reference was missed: `layui2("#setting-lod-section").css("display", len2.length > 0x1 ? '' : "none")`. Since `len2` was undefined, `len2.length` threw `TypeError`, crashing the entire rendering function and preventing all downstream controls (sleep time, angle tuning, key delay) from rendering.

4. **Missing constants in macro edit** — The refactored `kbd_ui_macro_edit_init()` used `MOUSE_EVENT_WHEEL_UP/DOWN/LEFT/RIGHT` which don't exist. The correct constants are `MOUSE_EVENT_WHEEL_VERT` (0x20a) and `MOUSE_EVENT_WHEEL_HORZ` (0x20e). Direction is determined by `keyCode > 0` / `keyCode < 0`, not by separate constants.

5. **`MacroEditCell` helper bugs** — Used `resolve_key()` (doesn't exist) instead of `get_key_name_from_code()`, and `item.mouse_key_x/y` (wrong property name — the values are packed in `mouse_key_code` as bit fields). Also used `MOUSE_EVENT_WHEEL_UP/LEFT` for direction checks. Fixed all three.

6. **Dialog action attribute duplication** — `KeyGridCell` always emitted `prefix + '-action'`, but `dialog_select_key_init()` uses `dialog-select-key-action` not `kbd-select-key-action`. Added `actionAttr` parameter to override the default.

**What was tricky:**
- Some functions (like `kbd_ui_refresh_light_matrix`, `kbd_ui_refresh_axis_matrix`, `ui_refresh_cpi_levels`) have business logic deeply interleaved with HTML, making extraction harder. These were left with cleaner inline code but not fully extracted into helpers.
- The color selector's hex values differ slightly between contexts (`#FFF` for light color, `#EEE` for onboard status). The `colorHex` override parameter handles this cleanly.
- Variable rename orphans are easy to miss when replacing code sections. A grep for the old name after edits catches them.
- When extracting logic into helpers, carefully trace all code paths to ensure the helper produces identical output for every case. The polling rate `checked` bug came from oversimplifying a three-state condition (selected, disabled, disabled+selected).

### Effort
~5 hours — template extraction was mechanical but tedious. The build step took 10 minutes. Regression testing and fixes added another hour.

---

## Phase 6 — Device Database & Binary Reader  🔴 BROKEN — needs redo

### Goal
Extract product metadata from `07-http-data-model.js` into a declarative data file, and split out its binary-deserialization helpers into the protocol layer. This is Phase 1's twin for the device-identification side of the codebase.

### What `07-http-data-model.js` currently holds

A mixed bag of concerns in 556 lines:

| Concern | Lines | Fate |
|---------|-------|------|
| Product ID → sensor mapping + name → sensor fallback | ~50 | → `data/device-database.js` |
| Binary read helpers (`GET_UINT8`, `GET_UINT16`, `GET_UINT32`) | ~15 | → `protocol/binary-reader.js` |
| `create_key_info()`, `create_macro_info()`, `copy_key_info()`, `clone_macro_info()` + `add_key_info()` | ~430 | → `protocol/key-config-parser.js` |
| HTTP transport (`query_firmware`, `upload_mouse_config`, `send_event_config_reset`, `send_event_factory_reset`) | ~85 | stays in `07-http-data-model.js` (rewritten) |

### Sub-phases executed

Executed as 4 incremental sub-phases, each independently verifiable:

| # | What | Effort | Risk | Result |
|---|------|--------|------|--------|
| 6.1 | `data/device-database.js` — PID/sensor map + name fallbacks | ~30 min | Near-zero | ✅ |
| 6.2 | `protocol/binary-reader.js` — `BinaryReader` class | ~20 min | Low | ✅ |
| 6.3 | `protocol/key-config-parser.js` — extract + refactor `add_key_info()` | ~4 hours | Medium | ✅ |
| 6.4 | Strip `07-http-data-model.js` to pure transport (68 lines) | ~1 hour | Low | ✅ |

### What changed

| Before | After |
|--------|-------|
| `07-http-data-model.js` — 556 lines (PID switch + binary helpers + key config parser + HTTP transport) | `07-http-data-model.js` — 68 lines (pure HTTP transport only) |
| `GET_UINT8/16/32` tuple-returning helpers with manual offset bookkeeping | `BinaryReader` class with encapsulated offset state |
| `add_key_info()` — 320-line deeply nested single-function parser with 20+ hoisted variables | 6 named parse stages + clean dispatch via `BinaryReader` |
| Sensor lookup: 45-line `switch` on PID + 6-line `if/else` on device name | `DEVICE_DB.getSensor() ?? DEVICE_DB.getSensorByName()` — 3 lines |
| `copy_key_info()` defined, zero callers | Still defined, still zero callers (identified as dead code) |

### Retrospective

**What went well:**
- The sub-phase approach paid off — each piece was independently buildable and verifiable. Build passed after every sub-phase with zero regressions.
- `BinaryReader` eliminated the error-prone `[result, offset] = GET_UINT8(buf, offset)` tuple pattern entirely. The key-config parser never manually tracks an offset.
- Lazy symbol resolution worked exactly as Phase 4 predicted — `key-config-parser.js` references `get_keys()`, `get_vk_code()`, `KEY_WHEEL_UP`, etc. by name, and they resolve at runtime because all modules load before any device data arrives.
- Named parse stages (`parse_mouse_mapping`, `parse_mapping_function`, `parse_macro_entry`, `parse_macro_mouse_event`) made the 320-line function's control flow readable at a glance.
- The `DEVICE_DB` serves only one purpose (cloud config upload), which became clear during extraction — it's metadata, not device compatibility logic.

**What was tricky:**
1. **Name-based fallback mismatch in the plan** — The original plan's `nameSensorFallbacks` had entries like `"MH01Pro": "PAW3950"`, but the original code checks `"SA-MH01Pro"` (with `SA-` prefix). Caught during cross-referencing; used the exact original names. Lesson: data extraction plans are drafts — always verify against the source, not the plan.

2. **`copy_key_info()` is dead code** — Defined in the original `07-http-data-model.js` with zero callers across the entire codebase. Moved it to `key-config-parser.js` anyway for completeness, but it's never used at runtime.

3. **The `add_key_info()` entry-point contract** — Kept the exact same `add_key_info(client, value, byteLen)` signature so callers in `protocol/hid-parser.js` needed zero changes. Changing the signature would have required updating two files for no benefit.

4. **`byteLen` is a `Uint8Array`** — The parameter has `.byteLength`, `[index]` access, and `.subarray()` — which means it's a typed array, not an `ArrayBuffer`. `new BinaryReader(new Uint8Array(byteLen))` is effectively a no-op identity cast, but understanding this type contract is critical for correctness.

5. **Continuation-byte semantics** — The original used variable `i14` for the continuation byte in macro parsing, which also appears at the `switch-case` scope level. Renamed to `contByte` in `parse_macro_entry()` — its purpose is unambiguous in the extracted function context. The `(i14 & 8) != 0` check determines whether to generate an auto-click variant vs. merge into an existing macro.

**Lesson:** The device database is purely a cloud-metadata concern, not a device-compatibility concern. As the Leviathan V4 question highlighted, a device not in the database works perfectly — all configuration functionality (DPI, polling rate, remapping, macros) comes from the standard HID/HS protocol layer, not from hardcoded product IDs. The database only determines what sensor string gets sent to the manufacturer's config-upload endpoint.

### Effort
~1 day total — 30min (data) + 20min (reader) + 4h (parser) + 1h (prune). The parser extraction dominated; the other three sub-phases were mechanical. No runtime debugging needed because the function signature and external contract were preserved exactly.

### Files touched

```
lib-rawm-deob/
  data/
    device-database.js         ← NEW  (50 lines — product metadata + sensor fallbacks)
  protocol/
    binary-reader.js           ← NEW  (46 lines — BinaryReader class)
    key-config-parser.js       ← NEW  (300 lines — factory functions + refactored add_key_info)
  07-http-data-model.js        ← REWRITTEN (556 → 68 lines, pure transport)
  build.mjs                    ← UPDATED (added 3 files to bundle order)
```

---

## Phase 7 — Keyboard Structure Redistribution  🔴 BROKEN — needs redo

### Goal
`04-kbd-structures.js` (280 lines) is a grab-bag of sync state, factory functions, accessor getters, and HS protocol stubs. Redistribute each concern to the appropriate layer (state store, protocol, device database).

### Current contents

| Section | Lines | What | Goes where |
|---------|-------|------|-----------|
| Global sync buffers (`kbd_data_sync_index`, `kbd_keyinfo_list`, …) | 11 vars | Mutable sync state for chunked HS protocol data | `state/device-store.js` (as `DeviceStore.kbdSync.*`) |
| Factory + clone functions (`kbd_create_*_info`, `kbd_clone_*_info`) | 20 functions | 9 pairs of factory/clone for axis, SOCD, MT, RS, DKS, light, light-box, key-light, macro structs | `state/kbd-structures.js` |
| Accessor getters (`kbd_get_key_infos`, `kbd_get_axis_infos`, …) | 12 functions | Thin reads into `client.device_info.*` | `state/device-store.js` (as `DeviceStore.get*()`) |
| Device checks (`is_keyboard_5_15`, `is_hs_keyboard`) | 2 functions | Product capability queries | `data/device-database.js` |
| HS protocol comment block | 30 lines | Living documentation | Keep as comment in `protocol/hs-parser.js` |

### Sub-phase breakdown

| # | What | Files created/modified | Effort | Risk |
|---|------|----------------------|--------|------|
| 7.1 | Factory/clone → `state/kbd-structures.js` | Create `state/kbd-structures.js` (20 functions). Update `build.mjs` (add to bundle order). | ~30 min | Low — pure extraction, functions are self-contained |
| 7.2 | Device checks → `data/device-database.js` | Update `data/device-database.js` (add 2 functions). 0 caller changes needed (function declarations are hoisted). | ~15 min | Low — simple functions, no dependency chain |
| 7.3 | Sync buffers → `DeviceStore.kbdSync` | Update `state/device-store.js` (add `kbdSync`). Update `protocol/hs-parser.js` (~85 references). Update `05-hs-protocol.js` (~35 references). | ~3 hours | Medium — many references across 2 files, must catch every one |
| 7.4 | HS comment block → `hs-parser.js` | Update `protocol/hs-parser.js` (add header comment). | ~5 min | Near-zero |
| 7.5 | Remove `04-kbd-structures.js` | Remove the file. Update `build.mjs` (remove from bundle order). | ~5 min | Low — verify all callers migrated |
| 7.6 | Verify + test | Build with `npm run build`, validate `node --check` on all touched files, test in browser. | ~30 min | — |

### 7.1 — Factory/clone functions → `state/kbd-structures.js`

Extract 15 functions (8 create + 7 clone) into a new file:

```js
// state/kbd-structures.js — Pure constructors, no side effects, no global state
function kbd_create_axis_info() {
  return { row: -1, col: -1, switch_type: 0, apc_lv: 0x96, rt_enable: 0, rt_press_lv: 0x32, rt_release_lv: 0x32, top_dz: 0xf, btm_dz: 0x14 };
}
function kbd_clone_axis_info(source) { return { ...source }; }
// … same pattern for socd, mt, rs, dks, light, lightBox, keyLight, macro
// Note: kbd_create_pc_key_info / kbd_clone_pc_key_info stay in 02-key-system.js (they're key-database related, not kbd-structures)
```

**Callers** (no code changes needed, just load-order availability):
- `protocol/hs-parser.js` — calls `kbd_create_axis_info()`, `kbd_create_socd_info()`, `kbd_create_mt_info()`, `kbd_create_rs_info()`, `kbd_create_dks_info()`, `kbd_create_key_light_info()`, `kbd_clone_socd_info()`, `kbd_clone_mt_info()`, `kbd_clone_rs_info()`, `kbd_clone_dks_info()`
- `05-hs-protocol.js` — calls `kbd_create_light_info()` (in `hs_data_sync()`)
- `14-ui-keyboard.js` — calls `kbd_create_axis_info()`, `kbd_create_socd_info()`, `kbd_create_mt_info()`, `kbd_create_rs_info()`, `kbd_create_dks_info()`, `kbd_clone_axis_info()`, `kbd_clone_socd_info()`, `kbd_clone_mt_info()`, `kbd_clone_rs_info()`, `kbd_clone_dks_info()`, `kbd_clone_light_info()`, `kbd_clone_pc_key_info()`

**Bundle order after:** `state/device-store.js` → `state/kbd-structures.js` → `protocol/buffer.js` → …

Note: `kbd_create_light_info()` calls `kbd_create_light_box_info()` internally. Since both move to kbd-structures.js together, this works seamlessly.

### 7.2 — Device checks → `data/device-database.js`

Move `is_keyboard_5_15(device)` and `is_hs_keyboard(device)` to `data/device-database.js` as function declarations (hoisted, so load order doesn't matter):

```js
// Added to data/device-database.js
function is_keyboard_5_15(device) {
  return device.productName == "Z68A";
}
function is_hs_keyboard(device) {
  return device.productName == 'Z68A' || device.productName == "Z60";
}
```

**Callers** (8 files, 0 changes needed since function declarations are hoisted in concatenated build):
- `02-key-system.js` — 2 calls (`get_keys()`, `pc_kbd_key_num()`)
- `10-ui-settings.js` — 1 call (`is_hs_keyboard`)
- `11-ui-mapping.js` — 4 calls (`is_hs_keyboard`)
- `14-ui-keyboard.js` — 17 calls (mix of both)
- `06-hid-protocol.js` — 2 calls (`is_hs_keyboard`)
- `state/device-store.js` — 1 call (`is_keyboard()` → `is_hs_keyboard`)
- `protocol/hid-transport.js` — 2 calls (`is_hs_keyboard`)
- `protocol/hs-parser.js` — 1 call (`is_keyboard_5_15`)

### 7.3 — Sync buffers → `DeviceStore.kbdSync`

The 11 global sync variables are the trickiest migration. They're `let` declarations (NOT hoisted), so the 2 files that reference them must be updated to use `DeviceStore.kbdSync.*` instead:

```js
// Added to DeviceStore in state/device-store.js
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
  // KBD accessors — thin reads into client.device_info
  // Note: these have zero callers in current code. UI files access
  // client.device_info directly. Added as migration target for future refactoring.
  getKeyInfos(client)       { return client.device_info.kbd_key_infos; },
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

**Migration pattern in callers:**
```js
// Before (globals):
kbd_data_sync_index = kbd_data_sync_index | SYNC_FLAG_KEYCODE;
kbd_keyinfo_list.push(item);
macroBuff.length

// After (DeviceStore.kbdSync):
DeviceStore.kbdSync.index = DeviceStore.kbdSync.index | SYNC_FLAG_KEYCODE;
DeviceStore.kbdSync.keyinfoList.push(item);
DeviceStore.kbdSync.macroBuff.length
```

**Files with sync buffer references and rough count:**

| Reference | `protocol/hs-parser.js` | `05-hs-protocol.js` |
|-----------|------------------------|---------------------|
| `kbd_data_sync_index` | 7 | 8 |
| `kbd_keyinfo_list` | 5 | 1 |
| `kbd_lightinfo_list` | 6 | 4 |
| `kbd_axisinfo_list` | 5 | 4 |
| `kbd_socdinfo_list` | 5 | 4 |
| `kbd_mtinfo_list` | 5 | 4 |
| `kbd_rsinfo_list` | 5 | 4 |
| `kbd_dksinfo_list` | 5 | 4 |
| `kbd_macroinfo_list` | 3 | 2 |
| `kbd_macro_index` | 5 | 0 |
| `macroBuff` | 6 | 5 |
| **Total** | **~57** | **~36** |

**Risk:** The sync buffers are used in complex parsing logic (chunked HS protocol, macro buffer assembly, axis/SOCD/MT/RS/DKS data streams). Missed references will cause runtime errors that may not be immediately visible (e.g., only when syncing specific keyboard features). Systematic diff review after each file update is critical.

### 7.4 — HS protocol comment → `protocol/hs-parser.js`

Move the 30-line comment block from `04-kbd-structures.js` (lines 251–280) to the top of `protocol/hs-parser.js`. This is the living documentation for the HS protocol command IDs.

### 7.5 — Housekeeping

After all sub-phases:
1. Remove `04-kbd-structures.js`
2. Update `build.mjs` — replace `04-kbd-structures.js` entry with `state/kbd-structures.js`
3. Rebuild with `npm run build`
4. Verify `node --check` on all 7 touched source files
5. Open `hub-deob.html` in browser, connect a device, verify keyboard UI renders correctly

### Bundle order after Phase 7

```
data/constants.js
01-obfuscation.js
data/key-database.js
02-key-system.js
state/device-store.js              ← UPDATED (kbdSync + accessors)
state/kbd-structures.js            ← NEW
protocol/buffer.js
protocol/hid-transport.js
protocol/hs-parser.js              ← UPDATED (uses DeviceStore.kbdSync)
protocol/hid-parser.js
protocol/binary-reader.js
protocol/key-config-parser.js
05-hs-protocol.js                  ← UPDATED (uses DeviceStore.kbdSync)
06-hid-protocol.js
data/device-database.js            ← UPDATED (is_keyboard_5_15, is_hs_keyboard)
07-http-data-model.js
08-parse-cmd-ui.js
09-ui-clients.js
ui/ui-helpers.js
10-ui-settings.js
11-ui-mapping.js
12-utilities.js
13-event-dispatch.js
14-ui-keyboard.js
```

### Retrospective

**What went well:**
- The sub-phase ordering was correct — 7.1 and 7.2 were trivially low-risk, and doing them first meant the hardest work (7.3) was the only part that required careful testing.
- `replaceAll` in the edit tool handled the ~93 sync buffer references across 2 files with zero missed refs. No manual line-by-line find/replace needed.
- Device checks (`is_keyboard_5_15`, `is_hs_keyboard`) moved as function declarations, so the 30 callers in 8 files needed zero changes — JavaScript hoisting handles cross-file availability in the concatenated build.

**What was tricky:**
- None of the sub-phases had runtime issues. The factory functions are pure constructors, device checks are simple predicates, and the sync buffer rename was a mechanical search-and-replace with no semantic change. The `replaceAll` tool validated every reference was captured.

**Surprises:**
- The `kbd_get_*` accessor getters (12 functions) have **zero callers** across the entire codebase. They were added to `DeviceStore` as a migration target for future UI refactoring, not because anything currently uses them.
- The original doc said "20 functions" for factory/clone — actually 15 (8 create + 7 clone). Fixed.

### Effort
~45 min total — 10min (factory) + 5min (device checks) + 20min (sync buffers) + 2min (comment) + 8min (cleanup + verify). The sync buffer migration was the bulk of the work, but `replaceAll` made it mechanical.

---

## Phase 8 — Obfuscation Retirement  

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
| 4 | Protocol Layer Cleanup | ~3 hours | ✅ |
| 5 | UI Templates + Bundle | ~2 days | ✅ |
| 6 | Device Database & Binary Reader | ~1 day | ✅ |
| 7 | Keyboard Structure Redistribution | ~45 min | ✅ |
| 7.1 | Factory/clone → `state/kbd-structures.js` | ~10 min | ✅ |
| 7.2 | Device checks → `data/device-database.js` | ~5 min | ✅ |
| 7.3 | Sync buffers → `DeviceStore.kbdSync` | ~20 min | ✅ |
| 7.4 | HS comment → `protocol/hs-parser.js` | ~2 min | ✅ |
| 7.5 | Housekeeping (remove 04, update build.mjs) | ~8 min | ✅ |
| 8 | Obfuscation Retirement | ~30 min | ✅ (rolled into 10.1) |
| 9 | Test Infrastructure | ~2 days | 🔲 |
| 10 | Empty the Root | ~30 min | ✅ |
| B | ES Modules | ~10 hours | ✅ |
| B.1 | Add exports | ~2 hours | ✅ |
| B.2 | Add imports | ~3 hours | ✅ |
| B.3 | Build checks (check-imports, check-bare-state-refs) | ~2 hours | ✅ |
| B.4 | Fix 24 missing imports, ~1668 bare refs, eval → containers | ~4 hours | ✅ |
| B.5 | Fix deob8 checker bug (regex-strip eating identifiers) | ~1 hour | ✅ |
| B.6 | Fix LOD missing constants, PARAM_KEY_DELAY_ENTRY popup | ~2 hours | ✅ |
| E | TypeScript Conversion | ~3 days | ✅ Done |
| E.0 | Scaffold (tsconfig, ambients, types dir) | ~30 min | ✅ Done |
| E.1 | Data layer (8 files, ~1,552 lines) | ~2 hr | ✅ Done |
| E.2 | State layer (3 files, ~1,658 lines) | ~4 hr | ✅ Done |
| E.3 | Protocol core (4 files, ~1,482 lines) | ~4 hr | ✅ Done |
| E.4 | Protocol handlers (3 files, ~1,373 lines) | ~3 hr | ✅ Done |
| E.5 | UI layer (6 files, ~7,631 lines) — all 6 done | ~8 hr | ✅ |
| E.6 | Build integration + fix errors | ~1 hr | 🔲 |
| 9 | Test Infrastructure | ~2 days | 🔲 |
| | **Total (excl. Leap E and Phase 9)** | **~18 days** | |

Each phase produces a working application. The order maximizes value per phase — Phase 1 alone eliminated 70% of `02-key-system.js` with zero behavioral risk. Phases 6–9 complete the strangler fig pattern: by the end, every module either has a clean home in `data/`, `state/`, or `protocol/`, or has been removed entirely. The final artifact (`hub-deob.html` + `dist/bundle.js`) has zero dependency on the original obfuscated runtime.

---

## Phase 10 — Empty the Root  ✅

### Goal
Migrate all 11 remaining root files into their proper directories (`state/`, `protocol/`, `ui/`, `lib/`). Complete the strangler fig by retiring `01-obfuscation.js` (Phase 8). The root directory becomes a clean entry point with zero runtime logic.

### What changed

| Before | After |
|--------|-------|
| `01-obfuscation.js` — 66 lines (obfuscation decoder + 44 KEY_* constants) | Removed. KEY_* constants → `data/constants.js`. Decoder (`_0x4dcb`, `_0x3870`, string array) confirmed dead code via `rg` — zero callers in source. |
| 11 root JS files | All migrated to `state/`, `protocol/`, `ui/`, `lib/` |
| `build.mjs` referenced old file paths | Updated to all new paths |

### Final layout

```
lib-rawm-deob/
  data/
    constants.js
    key-database.js
    device-database.js
  state/
    device-store.js
    kbd-structures.js
    key-lookup.js
  protocol/
    buffer.js
    hid-transport.js
    hs-parser.js
    hid-parser.js
    binary-reader.js
    key-config-parser.js
    hs-protocol.js
    hid-protocol.js
    http-data-model.js
    parse-cmd-ui.js
  ui/
    ui-helpers.js
    ui-clients.js
    ui-settings.js
    ui-mapping.js
    event-dispatch.js
    ui-keyboard.js
  lib/
    utilities.js
  build.mjs
```

### Retrospective

**What went well:**
- The sub-phase breakdown predicted the effort accurately — each move was a single `Move-Item` command. The whole migration took ~30 minutes, not the 90 minutes estimated, because `hub-deob.html` already uses `dist/bundle.js` so no HTML path updates were needed.
- Running `node --check` on all 23 files confirmed zero syntax errors, including the moved `state/key-lookup.js` which depended on `01-obfuscation.js` being loaded first for the KEY_* constants. Since these constants are now in `data/constants.js` (loaded even earlier in the bundle order), nothing broke.
- `build.mjs` was the only file that needed path updates — the build output (`dist/bundle.js`) is identical since the concatenation order is preserved.

**What was verified:**
- Zero `_0x4dcb()` calls in source files (grep confirmed)
- 23/23 files pass `node --check`
- `npm run build` produces valid `dist/bundle.js` + `dist/bundle.min.js`
- No residual references to old file paths in runtime code

**Effort:** ~30 minutes. All 6 sub-phases completed in a single session, zero surprises.

---

## Leap B — ES Modules (after Phase 10)  

### Goal
Replace global-scope concatenation with `export`/`import`. Each module explicitly declares its dependencies. The bundle step becomes `esbuild --bundle`.

### What changes

| Before | After |
|--------|-------|
| `function resolve_key(vCode) { … }` (global) | `export function resolve_key(vCode) { … }` |
| `DeviceStore.on('current:changed', …)` (global) | `import { DeviceStore } from '../state/device-store.js'` |
| `build.mjs` concatenates files in dependency order | `build.mjs` bundles with `esbuild --bundle --format=iife` from a single entry point |
| `hub-deob.html` loads `dist/bundle.js` | Same file, same path — output is identical from consumer's perspective |
| 23 source files share global scope implicitly | Each file declares its dependencies via `import` and its API via `export` |
| No `package.json` in `lib-rawm-deob/` | `package.json` with `"type": "module"` |

### Status: Done

### What was done

1. **Created `package.json`** with `"type": "module"` and esbuild build script.
2. **Added `export` to ~250 declarations** across all 23 source files.
3. **Added `import` statements** to all 23 files, tracing every cross-file reference.
4. **Created `src/index.js`** as the entry point that imports all modules and assigns `window.shell_cmd_app_browse_file`.
5. **Rewrote `build.mjs`** to use `esbuild --bundle --format=iife --global-name=RAWMHub`.
6. **Replaced eval-based S/DS live bindings** with container objects (`__S`, `__DS`) — esbuild renames module-scoped variables, breaking `eval(name)`. Zero `eval()` calls in the bundle.
7. **Fixed `current_usb_client` dual-copy bug**: `DS.current_usb_client` getter/setter now captures the same `export var current_usb_client` via closure, so named-import readers and `DS` writers share one variable.
8. **Fixed `do_resize` cross-module call**: added `export` to `event-dispatch.js`, `import` to `ui-keyboard.js`.
9. **Fixed `SLEEP_MAX_SEC` missing import**: checker was silently eating identifiers.

### Build checks created

Two static analysis scripts added to the build pipeline:

| Script | What it checks | Failure mode |
|--------|---------------|-------------|
| `scripts/check-imports.mjs` | Scans all 23 modules for identifiers used but not imported/declared/in-globals-list | ❌ "Missing import" + line number |
| `scripts/check-bare-state-refs.mjs` | Scans for bare identifiers matching S_VARS/DS_VARS keys that lack `S.`/`DS.` prefix | ❌ "Bare state reference" + line number |

Both run automatically after esbuild in `build.mjs`. Any issue exits non-zero.

### Fixes made after checks caught issues

- **24 missing imports** fixed across `hs-parser.js`, `hid-protocol.js`, `ui-keyboard.js`, `ui-settings.js`.
- **~1668 bare S./DS. prefix references** fixed across `ui-keyboard.js`, `ui-mapping.js`, `ui-settings.js`.
- **1 bare state reference false positive** — `var kbd_key_infos = ...` was a local declaration, not a shared-state reference. Added `var/let/const` declaration skip to checker.
- **`LOD_*` missing import** — 5 LOD constants consumed by `ui-settings.js` but only 3 were in the import list. Caused "Failed to get pointer LOD" error on the UI. Fixed by adding `LOD_HIGH`, `LOD_LOW`, `LOD_MEDIUM` to the import.

### The deob8 checker bug

The `stripNonCode` function in both checkers had a regex literal stripping step (`/\/(?![*/])...\/g`) that was so aggressive it treated a division operator `/ 0x3c` on line 296 of `ui-settings.js` as the start of an unterminated regex literal, silently consuming all identifiers across hundreds of subsequent lines — including `SLEEP_MAX_SEC`. This caused the checker to report **zero** missing imports while 24 real issues went undetected.

Fix: removed the regex literal stripping from both checkers. The approximate regex pattern cannot reliably distinguish `/` as division vs. regex literal without a parser. Accepting a few false positives from regex patterns is better than silently hiding missing imports.

### Leap C — Ongoing improvements

Several regressions were discovered and fixed during browser testing with a real LEVIATHAN V4:

| Issue | Root cause | Fix |
|-------|-----------|-----|
| **"Failed to read onboard settings" popup** appeared 2s after successful config load | `PARAM_KEY_DELAY_ENTRY` handler in `hid-parser.js` destroyed the timer handle (`DS.mouse_config_timer = undefined;`) and always set an ERROR timer in the data path that was never cancelled | Removed the destructive `= undefined;` and replaced the delayed ERROR with `LOADED` + proper query timer in the data path |
| **"Failed to get pointer LOD"** on LOD dropdown | `ui-settings.js` imported 3 of 8 `LOD_*` constants | Added all 8 LOD constants to the import |

### Dependency map (discovered via cross-file reference audit)

Before conversion, each file's exports and imports must be mapped. Here is the complete map:

| File | Exports (globals it defines) | Imports (globals it references from other files) |
|------|------------------------------|--------------------------------------------------|
| `data/constants.js` | 200+ const (CMD_*, PARAM_*, PID_*, etc.) | _none_ |
| `data/key-database.js` | `KEY_DB` | _none_ |
| `data/device-database.js` | `DEVICE_DB`, `is_keyboard_5_15`, `is_hs_keyboard` | _none_ |
| `protocol/buffer.js` | `PacketBuilder`, `PacketReader` | _none_ |
| `protocol/binary-reader.js` | `BinaryReader` | _none_ |
| `state/kbd-structures.js` | 15 factory/clone functions | _none_ |
| `protocol/parse-cmd-ui.js` | `parse_cmd`, `log_r`, `device_cfg`, `hidHandlers` (from hid-parser — handled separately), + 40+ UI state variables | `current_usb_client`, `basic_info`, `reset_device_cfg`, `get_shortcuts` (→ device-store); `hidHandlers` (→ hid-parser); `skip_recv_buf` (→ hid-transport); constants |
| `protocol/hid-transport.js` | `send_event`, `crc_process`, `skip_recv_buf`, `device_receive_data`, `recv`, `hs_device_receive_data`, etc. | `usb_client_list`, `is_receiver`, `is_limit_memory` (→ device-store); `is_hs_keyboard` (→ device-database); `hs_parse_cmd` (→ hs-protocol); `parse_cmd`, `log_r`, `device_cfg`, `remote_buf_free_size` (→ parse-cmd-ui); constants |
| `state/device-store.js` | `DeviceStore`, `usb_client_list`, `current_usb_client`, 70+ functions (get_cpi, set_cpi, etc.) | `send_event`, `crc_process` (→ hid-transport); `is_hs_keyboard` (→ device-database); `send_event_mouse_param` (→ hid-protocol); `device_cfg`, `log_r` (→ parse-cmd-ui); constants |
| `protocol/hs-protocol.js` | 30+ `hs_get_*`/`hs_set_*` command builders, `hs_data_sync`, `hs_parse_cmd` | `hsHandlers` (→ hs-parser); `send_event`, `hs_format_data`, `skip_recv_buf` (→ hid-transport); `PacketBuilder` (→ buffer); `DeviceStore` (→ device-store); `kbd_create_light_info` (→ kbd-structures); `log_r` (→ parse-cmd-ui); constants |
| `protocol/hs-parser.js` | `hsHandlers` (registry with 35 handlers) | 30+ `hs_get_*`/`hs_set_*` (→ hs-protocol); `DeviceStore` + actions (→ device-store); `pc_kbd_key_num`, `pc_kbd_manager_keys`, `get_key_name_from_keyid` (→ key-lookup); 15 factory functions (→ kbd-structures); `is_keyboard_5_15` (→ device-database); `create_macro_info`, `clone_macro_info` (→ key-config-parser); `skip_recv_buf`, `send_event`, `crc_process` (→ hid-transport); `log_r` (→ parse-cmd-ui); constants |
| `state/key-lookup.js` | 14 key arrays, `pc_key_manager_init`, 16 lookup functions | `KEY_DB` (→ key-database); `is_keyboard_5_15` (→ device-database) |
| `protocol/key-config-parser.js` | `create_key_info`, `add_key_info`, macro helpers | `BinaryReader` (→ binary-reader); `get_vk_code` (→ key-lookup); `get_cpi_step`, `get_keys` (→ device-store); constants |
| `protocol/hid-parser.js` | `hidHandlers` (registry with 4 handlers) | `send_event`, `crc_process` (→ hid-transport); `send_event_query`, `send_event_action`, `send_event_set_rf_channel` (→ hid-protocol); `add_key_info` (→ key-config-parser); `query_firmware` (→ http-data-model); `DeviceStore` + actions + helpers (→ device-store); `is_hs_keyboard` (→ device-database); `log_r` (→ parse-cmd-ui); constants |
| `protocol/hid-protocol.js` | 15 `send_event_*` wrappers, `get_key_id_by_name`, `write_mouse_param` | `send_event`, `crc_process` (→ hid-transport); `PacketBuilder` (→ buffer); `DeviceStore` + helpers (→ device-store); `is_hs_keyboard`, `is_receiver`, `is_limit_memory` (→ device-database via device-store); `get_scan_code`, `get_key_name_from_code` (→ key-lookup); `create_macro_info` (→ key-config-parser); `upload_mouse_config_delayed` (→ http-data-model); constants |
| `protocol/http-data-model.js` | `query_firmware`, `upload_mouse_config`, `upload_mouse_config_delayed`, `send_event_config_reset`, `send_event_factory_reset` | `send_event`, `crc_process` (→ hid-transport); `send_event_action` (→ hid-protocol); `DeviceStore`, `upload_mouse_config_timer` (→ device-store); `DEVICE_DB` (→ device-database); `log_r` (→ parse-cmd-ui); constants |
| `lib/utilities.js` | `rgbToHsv`, `hsvToRgb`, `rgbToHex`, `show_waiting`, `hide_waiting`, `setting_mapping_macro_recording_remove_last` | `edit_macros` (→ parse-cmd-ui) |
| `ui/ui-helpers.js` | 10 template helpers (KeyGridCell, RowBreak, SelectElement, etc.) | `RESOURCE_URL` (→ device-store); `is_dark_theme` (→ parse-cmd-ui); constants; `get_key_name_from_code` (→ key-lookup) |
| `ui/ui-clients.js` | `refresh_client_list`, `refresh_current_client`, `ui_refresh_*` functions | `DeviceStore` + helpers (→ device-store); `is_hs_keyboard`, `is_keyboard_5_15` (→ device-database); `device_receive_data` (→ hid-transport); `send_event_query` (→ hid-protocol); `pc_kbd_key_num`, `pc_kbd_manager_keys` (→ key-lookup); `editing`, `key_pos`, `is_dark_theme`, etc. (→ parse-cmd-ui); `ui_refresh_setting` (→ ui-settings); `ui_refresh_setting_mapping` (→ ui-mapping); `kbd_ui_refresh_onboard_config` (→ ui-keyboard); constants |
| `ui/ui-settings.js` | `ui_refresh_setting`, `ui_refresh_setting_delayed`, `ui_refresh_cpi_levels`, `refresh_key_delay_list`, `ui_refresh_dpi_input_panel` | `is_hs_keyboard` (→ device-database); 20+ device-store helpers; `cpi_level_editing`, `mouse_keys`, `is_dark_theme`, etc. (→ parse-cmd-ui); `send_event_set_sleep_time`, `send_event_set_brightness` (→ hid-protocol); `RadioInput`, `ColorSelectorTable` (→ ui-helpers); `get_key_name_from_label` (→ ui-mapping); constants |
| `ui/ui-mapping.js` | 20+ functions (setting_mapping_init, ui_refresh_*, select_*, update_*, get_key_*, shell_cmd_app_browse_file) | `is_hs_keyboard` (→ device-database); `DeviceStore` + 20+ helpers (→ device-store); `modifiers`, `keys`, `macro_keys`, etc. (→ key-lookup); `create_macro_info`, `create_key_info` (→ key-config-parser); 8 `send_event_*` (→ hid-protocol); `post_send_client_data` (→ hid-transport); constants; 15+ parse-cmd-ui vars; `ColorSelectorTable` (→ ui-helpers); `kbd_ui_macro_edit_init` (→ ui-keyboard) |
| `ui/event-dispatch.js` | Store event handlers, window event listeners, `do_resize`, `setting_mapping_key_recording_add`, `setting_mapping_macro_recording_add` | `DeviceStore` + actions (→ device-store); `send_client_data` (→ hid-transport); `send_event_action`, `send_event_factory_reset` (→ hid-protocol); 6 `ui_refresh_*` (→ ui-clients, ui-settings, ui-mapping, ui-keyboard); `create_macro_info` (→ key-config-parser); `get_key_name_from_code` (→ key-lookup); constants; `editing`, `need_save`, `device_cfg`, etc. (→ parse-cmd-ui) |
| `ui/ui-keyboard.js` | 25+ functions (ui_select_key_init, kbd_ui_*), event listeners, `layui.use()` callback, `apply_theme()`, `close_all_layer` | 10+ key-lookup arrays/functions; `is_keyboard_5_15`, `is_hs_keyboard` (→ device-database); `DeviceStore` + helpers (→ device-store); 4 ui-helpers; 7 kbd-structures functions; `hs_set_light`, `hs_set_light_box`, `hs_get_light` (→ hs-protocol); `send_event` + `post_send_client_data` (→ hid-transport); 8 `send_event_*` (→ hid-protocol); 30+ parse-cmd-ui vars; 15+ ui-mapping functions; 3 key-config-parser functions; 5 utilities functions; constants |

### Circular dependencies found (4 cycles)

All 4 cycles share the same pattern — the modules exchange references that are only used at **runtime** (inside function bodies called when device data arrives), never during top‑level module evaluation. ESM live bindings handle this correctly.

| Cycle | Files involved | Resolution |
|-------|---------------|------------|
| **C1** | `protocol/hs-protocol.js` ↔ `protocol/hs-parser.js` | `hs-protocol.js` reads `hsHandlers[firstByte]` inside `hs_parse_cmd()` at runtime. `hs-parser.js` calls `hs_get_*` functions inside handler bodies. Both modules are fully evaluated before any device connects. |
| **C2** | `state/device-store.js` ↔ `protocol/parse-cmd-ui.js` | `device-store.js` uses `device_cfg` and `log_r()` inside function bodies. `parse-cmd-ui.js` uses `current_usb_client`, `basic_info`, `reset_device_cfg` inside function bodies. No top‑level evaluation-time dependency. |
| **C3** | `protocol/hid-transport.js` ↔ `state/device-store.js` | `hid-transport.js` reads `usb_client_list` inside `device_receive_data()`. `device-store.js` calls `send_event()` / `crc_process()` inside mouse‑param setters. Both called at runtime only. |
| **C4** | `protocol/hid-parser.js` ↔ `protocol/hid-protocol.js` | `hid-parser.js` calls `send_event_*()` inside handler bodies. `hid-protocol.js` reads `SYNC_DATA` / `upload_mouse_config_timer` inside command builders. Both runtime only. |

**No code restructuring needed** — ESM circular imports work naturally for this pattern. The guard is: *never evaluate an imported binding at module‑scope* (e.g., `const x = someImportedFunction()` at the top level of a file that's part of a cycle). Our codebase has no such patterns.

### Window‑global requirements

`hub-deob.html` has exactly 1 inline event handler referencing application code:

| HTML line | Reference | Defined in |
|-----------|-----------|------------|
| `onChange="shell_cmd_app_browse_file()"` | `shell_cmd_app_browse_file` | `ui/ui-mapping.js` |

After bundling with `format: 'iife'`, this function will be inside the IIFE scope and inaccessible from the HTML attribute. The entry point must explicitly assign it to `window`.

### Build strategy

After Leap B:
```
build.mjs ──→ esbuild --bundle ←── lib-rawm-deob/src/index.js
                                              │
                                              ├──→ data/constants.js
                                              ├──→ data/key-database.js
                                              ├──→ data/device-database.js
                                              ├──→ state/device-store.js
                                              ├──→ state/kbd-structures.js
                                              ├──→ state/key-lookup.js
                                              ├──→ lib/utilities.js
                                              ├──→ protocol/buffer.js
                                              ├──→ protocol/binary-reader.js
                                              ├──→ protocol/hid-transport.js
                                              ├──→ protocol/hs-parser.js
                                              ├──→ protocol/hid-parser.js
                                              ├──→ protocol/key-config-parser.js
                                              ├──→ protocol/hs-protocol.js
                                              ├──→ protocol/hid-protocol.js
                                              ├──→ protocol/http-data-model.js
                                              ├──→ protocol/parse-cmd-ui.js
                                              ├──→ ui/ui-helpers.js
                                              ├──→ ui/ui-clients.js
                                              ├──→ ui/ui-settings.js
                                              ├──→ ui/ui-mapping.js
                                              ├──→ ui/ui-keyboard.js
                                              └──→ ui/event-dispatch.js
```

The entry point (`src/index.js`) imports all 23 modules + assigns window globals. esbuild resolves the import graph, deduplicates shared dependencies, and outputs a single IIFE. The consumer (`hub-deob.html`) sees no change — same `dist/bundle.js` path.

### Sub-phase breakdown

| # | What | Files touched | Effort | Risk |
|---|------|---------------|--------|------|
| B.1 | **Create `package.json`** — add `"type": "module"` to enable ESM resolution | `lib-rawm-deob/package.json` (NEW) | ~5 min | Low |
| B.2 | **Add `export` to declarations** — 23 files, ~250 declarations. Each `function`, `const`, `let`, `var`, `class` that is referenced by another file gets an `export` prefix. Files with zero external deps (constants.js, key-database.js, buffer.js, binary-reader.js, kbd-structures.js) are purely additive. | All 23 source files | ~2 hours | Medium — mechanical but tedious. Must distinguish internal‑only vs. external symbols |
| B.3 | **Add `import` statements** — 23 files, trace every cross-file reference. For each non‑built‑in identifier in each file, add an `import { name } from 'path'`. The entry point (`src/index.js`) also imports all modules to trigger evaluation. | All 23 source files + `src/index.js` (NEW) | ~3 hours | Medium — must catch every reference. Missed imports cause `ReferenceError` at build time |
| B.4 | **Update `build.mjs`** — replace manual concatenation with `esbuild.build({ entryPoints: ['src/index.js'], bundle: true, format: 'iife', globalName: 'RAWMHub', outfile: 'dist/bundle.js' })`. Keep unminified + minified dual output. | `build.mjs` (REWRITTEN) | ~1 hour | Low — esbuild handles ESM resolution natively |
| B.5 | **Test + verify** — `node --check` on all 23 files. `npm run build` produces valid bundle. Open `hub-deob.html` in browser, connect a device, verify all UI panels render and interact correctly. | — | ~3 hours | Medium — runtime regressions possible from missed imports or cyclic init ordering |
| B.6 | **Fix breakage** — iterate on B.3/B.4 until browser test passes. Common issues: missing imports (caught by `node --check`), wrong import paths (directory relative), and cyclic module evaluation order (caught by browser test). | Varies | ~1 hour | — |

### Effort

~10 hours total (B.1–B.6). B.2 (add exports) and B.3 (add imports) dominate at ~5 hours combined. Browser testing and fixes (B.5 + B.6) add ~4 hours. The build.reconfig (B.4) is ~1 hour of code plus ~30 min of debugging esbuild options.

### Expected bundle output

```
dist/
  bundle.js        ← unminified IIFE (globalName: 'RAWMHub')
  bundle.min.js    ← minified IIFE (268KB → ~270KB, similar to current)
```

The IIFE wraps all modules. Internal names are module‑scoped (not on `window`). Only `RAWMHub` and explicit `window.*` assignments (shell_cmd_app_browse_file) leak to global scope. hub-deob.html's single event handler still works via `window.shell_cmd_app_browse_file`.

### Why half‑day was wrong

The original estimate of "~half day" assumed a mechanical search‑and‑replace. In practice:

| Activity | Original estimate | Actual | Why the gap |
|----------|-------------------|--------|-------------|
| Dependency audit | 0 | 1 hour | Must discover 4 circular cycles and 250+ cross‑file references |
| Add exports | 1 hour | 2 hours | 23 files × ~10 export locations each = 230+ edits. Many declarations share names with different semantics per file |
| Add imports | 1 hour | 3 hours | Each file's import list requires tracing every identifier back to its origin file |
| Build reconfig | 0.5 hour | 1 hour | `globalName` + `format: 'iife'` + window‑global gatekeeping |
| Test + fix | 1 hour | 3 hours | Browser testing with real hardware to catch runtime regressions |
| **Total** | **~4 hours** | **~10 hours** | **2.5× underestimate** |

The gap comes from underestimating the audit and testing effort. The mechanical `export`/`import` addition is the smaller half — understanding which names cross file boundaries and verifying correctness at runtime is the larger half.

### Retrospective

**What went well:**

1. **Static analysis checks caught real issues** — The `check-imports.mjs` script found 24 missing imports that would have caused runtime ReferenceErrors. The `check-bare-state-refs.mjs` script caught ~1668 places where shared state (`S.*`, `DS.*`) was accessed without the required prefix. Without these checks, every one of those would have been a silent global variable in the esbuild IIFE — working by accident.

2. **Container objects (`__S`, `__DS`) eliminated eval() completely** — The original code used `eval(name)` as a getter/setter for ~67 shared state variables because `S` and `DS` needed live bindings across module boundaries. Replacing eval with `Object.defineProperty` on container objects is cleaner, faster, and eliminates a security warning. Zero `eval()` calls in the final bundle.

3. **Timer-handle preservation fixed the onboard-config popup** — The `PARAM_KEY_DELAY_ENTRY` bug (line 161 `DS.mouse_config_timer = undefined;`) had been silently broken since the original codebase. Every config read would show "Failed to read LEVIATHAN V4's onboard settings" even though data loaded successfully. Two lines changed: removing the destructive assignment and replacing the DATA path's unconditional ERROR timer with a proper LOADED + query cycle.

4. **The `S.` prefix convention proved valuable** — By forcing all shared-state accesses through `S.xxx` or `DS.xxx`, the checker can statically verify that no file accidentally reads stale or uninitialized state. The rule is simple: variables defined in `parse-cmd-ui.js` (S_VARS) get `S.` prefix; variables from `device-store.js` (DS_VARS) get `DS.` prefix. Any bare reference is a bug.

**What was tricky:**

1. **Checker false negatives from regex literal stripping** — The `stripNonCode` function tried to remove `/regex/` literals to avoid false positives in import detection, but the regex `/\/(?![*/])...\/g` is fundamentally unable to distinguish division operators from regex literals. A single division (`/ 0x3c`) was misidentified as the start of a regex, causing the strip function to eat hundreds of lines of source code — including the very identifiers the checker was supposed to find. This is a textbook case of a well-intentioned optimization creating a silent regression. Lesson: when a static analysis tool has a heuristic that can fail silently, remove the heuristic rather than trust it.

2. **Evaluator reference vs. fragment reference** — `build.mjs` reads 23 generated source files from each of 23 separate files (each was a separate script tag in the HTML). The `readFileSync + eval` approach caused issues with circular references and module scope. Switching to esbuild's native import resolution fixed this cleanly.

3. **esbuild IIFE hides missing imports** — When esbuild bundles with `format: 'iife'`, any name not found in the module graph is treated as a global. A missing import doesn't cause a build error — it produces `ReferenceError` at runtime. This is why the static analysis checks are essential: they catch what esbuild silently accepts.

4. **Rebuild latency** — Each change requires `node build.mjs` (~5s for esbuild + 2 checkers). The checkers took ~3s combined for 23 files. Total build cycle: ~8s. Acceptable but noticeable.

**What was discovered:**

- The `S_VARS` set (67 shared mutable variables from `parse-cmd-ui.js`) plus `DS_VARS` set (3 from device-store.js) form the complete authoritative list of cross-module state. Every other variable is either local or properly exported.
- `current_usb_client` appears in BOTH `parse-cmd-ui.js` (declared as `export var`) AND `device-store.js` (DS container). The DS getter/setter must capture the same variable via closure to avoid two copies.
- `CMD_*`, `PARAM_*`, and other constants from `constants.js` are resolved at bundle time by esbuild — no runtime cost.

**Effort:** ~10 hours total. The bulk was the mechanical export/import addition (~5 hours). The build checks, missing-import fixes, and bare-ref fixes took another ~3 hours. The onboard-config popup fix and deob8 checker bug took ~2 hours.

---

## Leap C — UI Partials (Phase 6 pattern for HTML)

### Goal
Extract the 2400-line `hub-deob.html` into one template file per panel:

```
lib-rawm-deob/
  ui/
    partials/
      client-panel.html
      settings-panel.html
      mapping-panel.html
      keyboard-panel.html
      pair-panel.html
```

The HTML files live as separate files. During build, `build.mjs` reads each partial and injects it into the final `hub-deob.html` at a marker comment.

### Risk

Low — this is string concatenation at the HTML level, with zero behavioral change. The existing layui lifecycle (`layui.use()`) and CSS selectors are untouched.

**Effort:** ~2 hours. Pure extraction — no design decisions.

---

## Leap D — Virtual HID Device + Playwright E2E

### Goal
Replace manual browser testing with automated E2E tests. A Node.js mock HID device speaks the HS/HID protocol over WebSocket. Playwright connects a fake WebHID device to `hub-deob.html` and runs scripted scenarios:
- Device connects → pair panel dismisses → client list shows device
- Polling rate change → UI reflects new value
- Key remap → config uploaded correctly

### What's needed

```
lib-rawm-deob/
  test/
    mock-device.js           ← Node.js WebSocket → fake HID firmware
    e2e/
      playwright.config.js
      device-lifecycle.test.js
      polling-rate.test.js
      key-remap.test.js
```

### Why this matters

Every regression to date (missing pair panel, polling rate checked logic, variable rename orphan, wrong constants in macro edit) required **manual browser testing with real hardware**. An automated E2E suite catches these before merge. It also makes the project testable by anyone without the physical device.

**Effort:** ~2 days initial setup + ongoing. The mock device is ~half the work (implement enough HS/HID responses to cover the lifecycle). The Playwright tests are the other half.

---

## Leap E — TypeScript (after ESM)  ✅ Complete (all 24 files)

### Goal
Convert all 23 ESM modules from `.js` to `.ts`. The protocol packet formats, DeviceStore shape, key info structs, handler contracts, and cross-module state bags all become typed interfaces. Catch property name typos, wrong constants, missing fields, and wrong argument types at compile time instead of runtime on real hardware.

### Prerequisite: ESM ✅
TypeScript needs explicit imports to resolve types across files. Leap B completed this — every module now has `export`/`import`. A module with globals would type as `any` everywhere and lose the benefit.

### Approach

**Loader:** `tsx` (esbuild-based Node.js transpiler, zero-config ESM support).
```
npm install -D tsx
npm install -D typescript @types/jquery  // jquery for layui's $
```

**Dev loop:**
```json
{
  "scripts": {
    "typecheck": "tsc --noEmit",
    "test": "node --import tsx/esm --experimental-vm-modules test/run.ts",
    "test:watch": "node --import tsx/esm --experimental-vm-modules test/run.ts --watch"
  }
}
```

Type checking and test running are decoupled. `tsc --noEmit` catches type errors; `tsx` transpiles for runtime execution. Build (`node build.mjs`) is unchanged — esbuild already handles `.ts` natively.

### Scope

| Metric | Value |
|--------|-------|
| Source files | 23 |
| Total lines | ~13,212 |
| Largest file | `ui-keyboard.js` (5,658 lines) |
| Largest interface needed | `HidClient.device_info` (~50 optional fields) |
| Global state bags to type | 2 (`S` ~40 fields, `DS` ~3 fields) |
| Handler registries to type | 2 (`hidHandlers`, `hsHandlers` ~40 entries) |
| Cross-file `postMessage` actions to type | ~40 distinct action strings |
| `layui` ambient declarations needed | ~8 API surfaces |

### Strategy: dependency order (leaves → trunk → branches)

Convert in the order modules depend on each other. Each sub-phase produces a `tsc --noEmit`-clean working tree. Files that depend on unconverted modules get a `// @ts-expect-error` or `any` import temporarily.

### Sub-phase breakdown

#### Leap E.0 — Scaffold (30 min)
- `tsconfig.json` — `strict: true`, `target: ES2022`, `module: NodeNext`, `moduleResolution: NodeNext`, `esModuleInterop: true`
- `npm install -D typescript tsx @types/jquery`
- `src/types/ambient.d.ts` — layui, `$`, `window.*` globals, `RAWMHub` IIFE namespace
- `src/types/interfaces.ts` — shared interfaces imported by multiple modules (will grow through E.1–E.5)

#### Leap E.1 — Data layer (8 files, ~1,552 lines, low risk)

Leaf modules with zero or minimal dependencies. Pure data and simple utilities.

```
data/constants.js        → .ts   348 lines   296 const exports    No deps
data/device-database.js  → .ts    64 lines    DEVICE_DB + 2 fns  No deps
data/key-database.js     → .ts   530 lines    KEY_DB object      No deps
protocol/buffer.js       → .ts   113 lines    PacketBuilder/Reader No deps
protocol/binary-reader.js → .ts   38 lines    BinaryReader class No deps
protocol/http-data-model.js → .ts 75 lines    5 wrapper fns      6 imports (leaves only)
lib/utilities.js         → .ts   149 lines    6 utility fns      1 import (S — stub as any)
src/index.js             → .ts    34 lines    entry point        25 side-effect imports
```

**Key types defined:** PacketBuilder chainable return type, BinaryReader interface, DEVICE_DB entry shape.

#### Leap E.2 — State layer (3 files, ~1,658 lines, medium risk)

Define the central interfaces that everything else depends on.

```
state/kbd-structures.js  → .ts   197 lines    15 factory fns     7 info struct interfaces
state/key-lookup.js      → .ts   213 lines    12 arrays, 14 fns  i18n resolver types
state/device-store.js    → .ts  1248 lines    DeviceStore, DS    HidClient/DeviceInfo interfaces
```

**Key types defined:**
- `AxisInfo`, `SocdInfo`, `MtInfo`, `RsInfo`, `DksInfo`, `LightInfo`, `MacroInfo` (7 structs)
- `KeyEntry` discriminated union (3 name spec variants: string, array, `{win, mac}`)
- `HidClient` — covers all `client.*` properties used across protocol + UI (~50+ device_info fields)
- `DeviceInfo` — the ~50 fields of `client.device_info`
- `DeviceStoreShape` — methods (`on/off/_emit`), state properties (`currentId`, `clients`), `kbdSync` shape
- `DSContainer` — `Object.defineProperty` proxy typing with getters/setters for ~43 S/DS fields
- `KbdSync` — the sync state machine shape (index, buffers per info type)

#### Leap E.3 — Protocol core (4 files, ~1,482 lines, high risk)

Command builders and transport layer. Depend on state interfaces from E.2.

```
protocol/hs-protocol.js      → .ts   304 lines    ~50 cmd builders    11 imports
protocol/hid-transport.js    → .ts   377 lines    CRC, USB send/recv  5 imports
protocol/hid-protocol.js     → .ts   446 lines    ~20 HID cmds        9 imports
protocol/key-config-parser.js → .ts  355 lines    KeyInfo parser      4 imports
```

**Key types defined:**
- `CommandBuilder` signature `(client: HidClient, ...args) => void`
- `CRCState` for the CRC computation pipeline
- `HidReport` — typed HID report format
- `KeyInfo` — the ~60-property key configuration object with all sub-structs (touch, fps, joystick, mouse lock, etc.)

#### Leap E.4 — Protocol handlers (3 files, ~1,373 lines, high risk)

The handler registries and dispatcher. Depend on protocol interfaces from E.3.

```
protocol/hs-parser.js     → .ts   693 lines    ~40 handler fns    ~40 cmd constants
protocol/hid-parser.js    → .ts   302 lines    4 handler fns      Response command bytes
protocol/parse-cmd-ui.js  → .ts   378 lines    Dispatcher + S      Dispatch by byte key
```

**Key types defined:**
- `HandlerFn = (client: HidClient, data: Uint8Array) => void`
- `HandlerRegistry` — `Record<number, HandlerFn>` → `Map<number, HandlerFn>` migration
- `SActions` — the ~40-field mutable state bag interface
- `ParseCmdReturn` — typed return for the main dispatch

#### Leap E.5 — UI layer (6 files, ~7,631 lines, highest risk)

The rendering layer. Depend on everything below.

```
ui/ui-helpers.js        → .ts   353 lines    11 template helpers    Return type: string
ui/event-dispatch.js    → .ts   263 lines    postMessage handler   ActionMessage union
ui/ui-clients.js        → .ts   612 lines    8 rendering fns      9 imports
ui/ui-settings.js       → .ts   604 lines    5 rendering fns      7 imports
ui/ui-mapping.js        → .ts  1361 lines    ~22 mapping fns      10 imports
ui/ui-keyboard.js       → .ts  5658 lines    ~40 kbd UI fns       20 imports
```

**Key types defined:**
- `ActionMessage` — discriminated union over all ~40 `{ action: '...', ... }` shapes
- `UiHelperReturn` — typed HTML string builders

#### Leap E.6 — Build integration (30 min)
- Add `tsc --noEmit` to `build.mjs` alongside existing check-imports and check-bare-state-refs
- `npm run typecheck` script in both `package.json`s
- Fix remaining type errors uncovered by full-project check

### Risk areas

| Risk | Mitigation |
|------|-----------|
| **`ui-keyboard.js` (5,658 lines)** — largest file, hardest to type | Convert in place first. Split into sub-modules as a separate follow-up. Many functions are UI rendering — return type is just `string` or `void`. |
| **Handler registries** — `hidHandlers[RESP_xxx] = function(...)` with dynamic lookup | Replace with `Map<number, HandlerFn>`. Add `as const` to command constants. |
| **Mutable state bags** — `S.xxx` and `DS.xxx` accessed from 20+ files | Define a single source-of-truth interface. Use `declare global` augmentation. |
| **`layui` globals** — `layui.i18np.prop()`, `layui.form.render()`, `$('#xxx')` | Ambient declarations. Only type the APIs actually used (~8 surfaces). |
| **`client` object** — 50+ optional fields, accessed ad-hoc in every protocol/UI file | Define a comprehensive `HidClient` interface during E.2. Start with fields known to be used, add as needed. |
| **`postMessage` action strings** — 40+ distinct values, each with different payload shapes | Discriminated union in E.5. Incremental — define as you convert each UI file. |
| **Circular imports** — 4 cycles known from Leap B | tsconfig `noCircularImports` — but esbuild may handle them. Accept temporarily, fix when splitting `ui-keyboard.js`. |

### Implementation progress

| Sub-phase | Files converted | Status | tsc --noEmit | Build |
|-----------|----------------|--------|-------------|-------|
| E.0 | tsconfig.json, `src/types/ambient.d.ts`, `src/types/interfaces.ts` | ✅ Done | ✅ | ✅ |
| E.1 | `data/constants.ts`, `data/key-database.ts`, `data/device-database.ts`, `protocol/buffer.ts`, `protocol/binary-reader.ts`, `protocol/http-data-model.ts`, `lib/utilities.ts`, `src/index.ts` | ✅ Done | ✅ | ✅ |
| E.2 | `state/kbd-structures.ts`, `state/key-lookup.ts`, `state/device-store.ts` | ✅ Done | ✅ | ✅ |
| E.3 | `protocol/hs-protocol.ts`, `protocol/hid-protocol.ts`, `protocol/hid-transport.ts`, `protocol/key-config-parser.ts` | ✅ Done | ✅ | ✅ |
| E.4 | `protocol/hs-parser.ts`, `protocol/hid-parser.ts`, `protocol/parse-cmd-ui.ts` | ✅ Done | ✅ | ✅ |
| E.5 | All 6 UI files | ✅ Done | ✅ | ✅ |
| E.6 | Build integration + tsc in pipeline | ✅ Done | ✅ | ✅ |

### Verification

1. `node build.mjs` produces valid `dist/bundle.js` + `dist/bundle.min.js`
2. `tsc --noEmit` passes cleanly on all 24 modules
3. Build pipeline runs esbuild → check-imports → check-bare-state-refs → tsc
4. `npm run typecheck` available for standalone type checking

### Key decisions

1. **`noImplicitAny: false`** — Kept as a transitional measure. The codebase has ~2000+ function parameters that accept ad-hoc object shapes. Adding complete type annotations to every parameter would triple the conversion time. Re-enabled once all 23 modules are `.ts`.
2. **`any` for protocol/state parameters** — `HidClient`, `DeviceInfo`, and the device config blob are deeply nested optional bags with 50+ fields each. Defining exhaustive interfaces during conversion is impractical; they can be tightened incrementally after conversion.
3. **`var` → `let`/`const` deferred** — Only renamed variables that conflicted with TypeScript's stricter scoping (`var` hoisting clashes). Bulk `var` → `let`/`const` cleanup is a separate mechanical step.
4. **JSDoc omitted** — The original JS has no JSDoc annotations. TypeScript types serve as the documentation going forward.
5. **Circular imports left as cycles** — The 4 known cycles (hs-protocol ↔ hs-parser, device-store ↔ parse-cmd-ui, hid-transport ↔ device-store, hid-parser ↔ hid-protocol) are runtime-only and ESM-safe. No restructuring needed.

### Effort

| Sub-phase | What | Lines | Risk | Effort |
|-----------|------|-------|------|--------|
| E.0 | Scaffold (tsconfig, types dir, ambients) | — | Low | 30 min | ✅ |
| E.1 | Data layer (8 files) | ~1,552 | Low | 2 hr | ✅ |
| E.2 | State layer (3 files) | ~1,658 | Medium | 4 hr | ✅ |
| E.3 | Protocol core (4 files) | ~1,482 | High | 4 hr | ✅ |
| E.4 | Protocol handlers (3 files) | ~1,373 | High | 3 hr | ✅ |
| E.5 | UI layer (6 files) — all 6 done | ~7,631 | Highest | 8 hr | ✅ |
| E.6 | Build integration + fix remaining errors | — | Low | 1 hr | ✅ |
| **Total** | **24/24 files** (~13,212 lines) | | | **~22.5 hours** | **✅ Complete** |

Call it **3 days** — longer than the original ~1 week estimate because the analysis revealed the full scope of interfaces needed (HidClient with 50+ fields, 7 key structs, 2 global state bags with 43 fields, discriminated union over 40 action strings, 2 handler registries with 44 entries). The original estimate assumed simpler typing — the real cost is defining the ~15 nontrivial interfaces that span the codebase.

---

## Recommended Order

```
Phase 10 (Empty Root)   ───── 30 min, near-zero risk ───── ✅ DONE
     ↓
Phase 8 (Obfuscation)   ───── rolled into Phase 10.1 ───── ✅ DONE
     ↓
Leap B (ESM)            ───── ~10 hours ───── ✅ DONE
     ↓
Leap E (TypeScript)     ───── ~3 days ───── ✅ All 24 files converted
     ↓
Phase 9 (Unit Tests)    ───── 2 days ───── EASIER with typed interfaces as contracts
     ↓
Leap D (E2E + Mock)     ───── 2 days ───── PROTECTS against regressions
     ↓
Leap C (UI Partials)    ───── 2 hours, low risk ───── CAN SKIP IF NOT NEEDED
```

Phase 10, Leap B, and Leap E are done. All 24 source files are now TypeScript. The project has a single-entry-point ES module build with automated static analysis checks that catch missing imports, bare state references, and type errors. The application loads and communicates with a real LEVIATHAN V4 — no runtime ReferenceErrors, no "Failed to read onboard settings" popup, no missing LOD constants.

**Why TypeScript before unit tests:** ESM prerequisite is satisfied. The bugs that cost real time have been type bugs (wrong constants, missing LOD fields, property name typos). TS catches these at compile time. Unit tests are still high value, but TS reduces the surface area they need to cover — and writing tests against typed interfaces (HidClient, DeviceInfo, KeyInfo) produces clearer, more maintainable test code. The protocol interfaces become the test contracts.
