# RAWM Library Dissection & Decoupling

## What was done

### 1. Downloaded all dependencies locally
All external JS/CSS libraries used by `hub.html` have been downloaded to `public/lib/`:
- `library.min.js` (647 KB, the core obfuscated library)
- `jquery.min.js`, `layui.min.js`, `layui.min.css`, `layui-theme-dark-selector.css`
- `sprintf.min.js`, `bignumber.min.js`, `platform.min.js`, `spectrum.min.js`, `spectrum.min.css`
- `hid-logger.js` (local traffic logger)

### 2. Created a working local iframe host: `hub-local.html`
The original `hid-bridge.html` was failing because the library crashes during initialization when DOM elements are missing or stubbed. The library is tightly coupled to jQuery and layui UI initialization.

**Solution:** Created `public/hub-local.html` which is a complete copy of the original `hub.html` with:
- All resources pointing to local `./lib/` paths
- The bridge script embedded at the bottom
- This gives the library its full natural DOM environment

### 3. Updated Vue bridge to use local copy
`src/utils/hidBridge.ts` now loads `/hub-local.html` instead of `/hid-bridge.html`.

### 4. Generated comprehensive analysis
`LIBRARY_ANALYSIS.md` catalogs:
- 68 IQ_* protocol commands
- 15 CMD_* packet commands
- 7 PACKET_* constants
- 84 ACTION_* UI events
- 287 NOTIFY_* types
- 54 `hs_*` core HID functions
- 60 `kbd_*` keyboard functions
- 154 global variables

### 5. Started clean protocol extraction
Created `src/lib/rawm-protocol.ts` and `src/lib/rawm-device.ts` containing:
- All protocol constants (IQ commands, packet format, config types)
- TypeScript interfaces for device state, mouse settings, keyboard settings
- CRC-16 implementation matching the library
- Packet formatting helpers

## Architecture of the original library

```
library.min.js (647 KB)
├── Protocol Layer (~100 KB)
│   ├── hs_* functions (HID send/receive, packet parsing)
│   ├── crc16, format_data, read_event
│   ├── Command constants (IQ_*, CMD_*, PACKET_*)
│   └── Device state management (usb_client_list, current_usb_client)
├── Business Logic Layer (~200 KB)
│   ├── get_*/set_* functions for all settings
│   ├── pc_key_manager_* (keycode mapping tables)
│   ├── create_*_info (data structure factories)
│   └── Macro encoding/decoding
└── UI Layer (~350 KB)
    ├── ui_* functions (mouse settings UI updates)
    ├── kbd_ui_* functions (keyboard settings UI updates)
    ├── jQuery DOM manipulation
    └── layui form/slider/tab initialization
```

**Only the Protocol + Business Logic layers are needed by the Vue app.**
The UI layer is completely redundant because the Vue app has its own UI.

## Why the iframe bridge is the right short-term approach

A full rewrite of 300+ KB of protocol/business logic would take weeks and risk subtle incompatibilities with firmware. The iframe approach lets us:
1. Use the battle-tested protocol implementation
2. Keep the Vue UI completely separate
3. Gradually replace library functions one by one

## How to test the fix

1. Start the dev server:
   ```bash
   cd rawmhub-vue && npm run dev
   ```
2. Open the app in a Chromium browser (Chrome/Edge)
3. The iframe will load `hub-local.html` with all local resources
4. Check browser console for `[HID-LOG]` traffic and `[Bridge]` messages
5. If the library initializes successfully, you should see:
   - `source: 'rawm-hid-bridge', type: 'ready'`
   - `type: 'devices'` with your connected devices
   - `type: 'settings'` when you select a device

## Enhanced bridge capabilities

The bridge now supports two-way communication:

### Parent -> Iframe commands
- `refresh()` - refresh device list
- `getDevices()` - push current device list
- `getSettings()` - push current device settings
- `selectDevice(deviceId)` - select a specific device
- `setCpi(deviceId, value)` - set mouse DPI
- `setPollingRate(deviceId, value)` - set polling rate
- `setLight(deviceId, mode, info)` - set light mode
- `setPowerMode(deviceId, value)` - set power mode
- `setLod(deviceId, value)` - set lift-off distance
- `setAngleSnapping(deviceId, enabled)` - toggle angle snapping
- `setRippleControl(deviceId, enabled)` - toggle ripple control
- `setMotionSync(deviceId, enabled)` - toggle motion sync
- `setWirelessTurbo(deviceId, enabled)` - toggle wireless turbo
- `setSleepTime(deviceId, value)` - set sleep time
- `setAngleTuning(deviceId, value)` - set angle tuning
- `setKeyDelay(deviceId, down, up)` - set key delay
- `setOnboardConfig(deviceId, index)` - set onboard profile
- `setRfChannel(deviceId, value)` - set RF channel
- `setGlassMode(deviceId, enabled)` - toggle glass mode
- `applySettings(deviceId)` - apply and save settings
- `factoryReset(deviceId)` - factory reset device
- `pair()` - trigger device pairing

### Iframe -> Parent events
- `ready` - bridge initialized
- `devices` - device list update
- `settings` - device settings update
- `error` - error reporting
- `cmdResponse` - command execution result

## Path to full decoupling

### Phase 1: Working iframe with full DOM (DONE)
- Local resources, complete DOM, bidirectional bridge communication
- All major mouse/keyboard settings exposed via typed API
- Vue stores sync automatically from bridge

### Phase 2: Extract protocol layer (IN PROGRESS)
- `src/lib/rawm-protocol.ts` - 300+ constants extracted
- `src/lib/rawm-device.ts` - TypeScript types + CRC-16 helper
- `src/lib/rawm-hid-client.ts` - **Pure TypeScript WebHID client**
  - Direct `navigator.hid` device connection
  - Packet formatting matching the library exactly
  - CRC-wrapped CONFIG packet builder
  - Handshake query implementation
  - Input report parsing + event emitter
  - No jQuery, no layui, no iframe needed

### Phase 3: Extract business logic
- Reimplement `get_*/set_*` setting accessors on top of `RawmHidClient`
- Reimplement keycode mapping tables (`pc_key_manager_*`)
- Reimplement macro encode/decode
- Replace library's global state with Vue reactive stores

### Phase 4: Remove iframe entirely
- The Vue app talks directly to devices via `RawmHidClient`
- No jQuery, no layui, no 647KB minified blob

## Using RawmHidClient (experimental)

```ts
import { RawmHidClient } from '@/lib/rawm-hid-client'

const client = new RawmHidClient([{ vendorId: 0x3554 }])
const device = await client.requestDevice()
await client.open(device)

client.on((event) => {
  if (event.type === 'config') {
    console.log('Config response:', event.data.payload)
  }
})

await client.handshake()
```

See `src/lib/rawm-hid-client.demo.ts` for a full example.

## Key files

| File | Purpose |
|------|---------|
| `public/hub-local.html` | Local iframe host with full DOM + bridge |
| `public/lib/library.min.js` | Original obfuscated library |
| `public/lib/library.formatted.js` | Prettier-formatted version for reading |
| `src/utils/hidBridge.ts` | Vue iframe bridge (updated to use hub-local) |
| `src/lib/rawm-protocol.ts` | Extracted protocol constants |
| `src/lib/rawm-device.ts` | TypeScript device types + CRC helpers |
| `LIBRARY_ANALYSIS.md` | Full symbol catalog |
| `analyze-library.cjs` | Script that generated the analysis |
