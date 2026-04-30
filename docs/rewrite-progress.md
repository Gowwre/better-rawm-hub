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


## Phase 4 — Protocol Layer Cleanup  ✅

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

## Phase 5 — UI Template Extraction + Bundle  ✅

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

## Phase 6 — Device Database & Binary Reader  ✅

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

## Phase 7 — Keyboard Structure Redistribution  ✅

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
| 4 | Protocol Layer Cleanup | ~3 hours | ✅ |
| 5 | UI Templates + Bundle | ~2 days | ✅ |
| 6 | Device Database & Binary Reader | ~1 day | ✅ |
| 7 | Keyboard Structure Redistribution | ~45 min | ✅ |
| 7.1 | Factory/clone → `state/kbd-structures.js` | ~10 min | ✅ |
| 7.2 | Device checks → `data/device-database.js` | ~5 min | ✅ |
| 7.3 | Sync buffers → `DeviceStore.kbdSync` | ~20 min | ✅ |
| 7.4 | HS comment → `protocol/hs-parser.js` | ~2 min | ✅ |
| 7.5 | Housekeeping (remove 04, update build.mjs) | ~8 min | ✅ |
| 8 | Obfuscation Retirement | ~2 hours | 🔲 |
| 9 | Test Infrastructure | ~2 days | 🔲 |
| | **Total** | **~12.75 days** | |

Each phase produces a working application. The order maximizes value per phase — Phase 1 alone eliminated 70% of `02-key-system.js` with zero behavioral risk. Phases 6–9 complete the strangler fig pattern: by the end, every module either has a clean home in `data/`, `state/`, or `protocol/`, or has been removed entirely. The final artifact (`hub-deob.html` + `dist/bundle.js`) has zero dependency on the original obfuscated runtime.
