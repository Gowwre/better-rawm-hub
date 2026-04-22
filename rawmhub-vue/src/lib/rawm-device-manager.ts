/**
 * RAWM Device Manager
 *
 * High-level facade that wraps RawmHidClient and maintains a reactive
 * DeviceState. It replaces the iframe bridge's global state management
 * with a clean event-driven API.
 *
 * Consumed by `useNativeHid()` composable.
 */

import { RawmHidClient } from './rawm-hid-client'
import { createDeviceState, type DeviceState } from './rawm-device'
import { buildMouseParamBlob } from './rawm-mouse-config'
import {
  RAWM_VENDOR_ID,
  RAWM_VENDOR_ID_ALT,
  RAWM_RECEIVER_PRODUCT_ID,
  RAWM_RECEIVER_8K_PRODUCT_ID,
  CMD_ACTION,
  CMD_CONFIG,
  CMD_PING,
  CONFIG_TYPE_MOUSE_PARAM,
  CONFIG_TYPE_SET_ESB_ADDR,
  CONFIG_TYPE_CLEAR_ESB_ADDR,
  CONFIG_TYPE_SELECT_ESB_ADDR,
  NOTIFY_TYPE_MOUSE_CPI,
  NOTIFY_TYPE_MOUSE_CPI2,
  NOTIFY_TYPE_MOUSE_POLLING,
  NOTIFY_TYPE_MOUSE_LIGHT,
  NOTIFY_TYPE_MOUSE_POWER_MODE,
  NOTIFY_TYPE_MOUSE_LOD,
  NOTIFY_TYPE_MOUSE_MOTION_SYNC,
  NOTIFY_TYPE_MOUSE_ANGLE_TUNING,
  NOTIFY_TYPE_MOUSE_ANGLE_SNAPPING,
  NOTIFY_TYPE_MOUSE_RIPPLE_CONTROL,
  NOTIFY_TYPE_MOUSE_TX_POWER,
  NOTIFY_TYPE_MOUSE_BATTERY,
  NOTIFY_TYPE_MOUSE_BATTERY_LEVELS,
  NOTIFY_TYPE_MOUSE_SLEEP_TIME,
  NOTIFY_TYPE_MOUSE_RF_CHN,
  NOTIFY_TYPE_MOUSE_RSSI,
  NOTIFY_TYPE_MOUSE_ONBOARD_INDEX,
  NOTIFY_TYPE_MOUSE_ONBOARD_STATUS,
  NOTIFY_TYPE_MOUSE_GLASS_MODE,
  NOTIFY_TYPE_MOUSE_CONFIG,
  NOTIFY_TYPE_MOUSE_KEY_DELAY,
  NOTIFY_TYPE_MOUSE_CPI_LEVEL_COLOR,
  NOTIFY_TYPE_MOUSE_PEER,
  NOTIFY_TYPE_MOUSE_NOACK,
  NOTIFY_TYPE_MOUSE_LUA_STATUS,
  NOTIFY_TYPE_MOUSE_COLOR_CODE,
  ACTION_READ_RSSI,
  ESB_CHANNEL_MOUSE,
  ESB_ALIVE_TIMEOUT_MS,
  IQ_GET_SOFT_DRV_VER,
  IQ_GET_KB_INFO,
  IQ_GET_KEYCODE_BUF,
  IQ_GET_RGB_COLOR_BUF,
  IQ_GET_MACRO_NUM,
  IQ_GET_MACRO_SIZE,
  IQ_GET_MACRO_DATA_BUF,
  IQ_GET_MAG_DATA,
  WM_KEYDOWN,
  WM_KEYUP,
} from './rawm-protocol'
import { buildMousePacket } from './rawm-packet'
import {
  buildSetEsbAddrPayload,
  buildClearEsbAddrPayload,
  buildSelectEsbAddrPayload,
} from './rawm-wireless'
import {
  buildMouseKeyPayload,
  buildMouseFunctionPayload,
  type MouseKeyMapArgs,
  type MouseFunctionMapArgs,
} from './rawm-mouse-keymap'
import { buildMacroSegments } from './rawm-macro'
import type { MacroAction } from './rawm-device'

export type DeviceStateListener = (state: DeviceState | null) => void

/** Product IDs that are receivers (dongles). Mice connected through these
 *  need a virtual client on ESB_CHANNEL_MOUSE for ping / keep-alive. */
const RECEIVER_PRODUCT_IDS = new Set([
  RAWM_RECEIVER_PRODUCT_ID,
  RAWM_RECEIVER_8K_PRODUCT_ID,
])

export class RawmDeviceManager {
  private client: RawmHidClient
  private state: DeviceState = createDeviceState()
  private listeners: DeviceStateListener[] = []
  private unsubHid: (() => void) | null = null
  private connected = false

  // ESB ping loop
  private pingTimer: number | null = null
  private readonly PING_INTERVAL_MS = 1000

  // Keyboard macro read-back state
  private macroReadBuf: number[] = []
  private macroReadIndex = 0
  private macroReadOffset = 0
  private readonly MACRO_READ_CHUNK_SIZE = 0x1c // 28 bytes

  constructor() {
    // Default client; will be reconfigured per-device during pair()
    this.client = new RawmHidClient({
      filters: [
        { vendorId: RAWM_VENDOR_ID },
        { vendorId: RAWM_VENDOR_ID_ALT },
      ],
      useCrc: true,
      channel: 0xff,
    })
  }

  // ---------------------------------------------------------------------------
  // Pairing (User-initiated device selection)
  // ---------------------------------------------------------------------------

  /**
   * Pair a new device via the browser's HID permission dialog.
   * This is the native equivalent of the original library's `pair()` action.
   */
  async pair(): Promise<DeviceState> {
    const device = await this.client.requestDevice()
    await this.setupDevice(device)
    return this.state
  }

  /**
   * Connect to an already-granted HID device (e.g. from a previous session).
   * Returns true if a device was found and connected.
   */
  async connectToGrantedDevice(): Promise<boolean> {
    const granted = await navigator.hid.getDevices()
    const rawmDevices = granted.filter(
      (d) => d.vendorId === RAWM_VENDOR_ID || d.vendorId === RAWM_VENDOR_ID_ALT
    )

    if (rawmDevices.length === 0) return false

    // Prefer the first connected/openable device
    for (const device of rawmDevices) {
      try {
        this.client.useDevice(device)
        await this.setupDevice(device)
        return true
      } catch (err) {
        console.warn('[RawmDeviceManager] Failed to connect to granted device:', device.productName, err)
        continue
      }
    }

    return false
  }

  /**
   * Get a list of already-granted RAWM devices without connecting.
   */
  async getGrantedDevices(): Promise<HIDDevice[]> {
    const granted = await navigator.hid.getDevices()
    return granted.filter(
      (d) => d.vendorId === RAWM_VENDOR_ID || d.vendorId === RAWM_VENDOR_ID_ALT
    )
  }

  // ---------------------------------------------------------------------------
  // Internal device setup
  // ---------------------------------------------------------------------------

  private async setupDevice(device: HIDDevice): Promise<void> {
    this.state = createDeviceState()
    this.state.vendorId = device.vendorId
    this.state.productId = device.productId
    this.state.deviceName = device.productName
    this.state.isReceiver = RECEIVER_PRODUCT_IDS.has(device.productId)

    await this.client.open()

    this.unsubHid = this.client.on((event) => this.handleHidEvent(event))

    // Handshake: send query and wait for config response
    await this.client.query()

    // The original library relies on async NOTIFY packets arriving after query.
    // We don't block here — the caller will receive state updates via `on()`.
    this.connected = true

    // Start the ESB keep-alive ping loop (~1 s interval).
    this.startPingLoop()
  }

  disconnect(): void {
    this.stopPingLoop()
    this.unsubHid?.()
    this.unsubHid = null
    this.client.close()
    this.connected = false
    this.emit(null)
  }

  // ---------------------------------------------------------------------------
  // ESB Ping Loop (mirrors original library's start() timer)
  // ---------------------------------------------------------------------------

  private startPingLoop(): void {
    this.stopPingLoop()
    this.pingTimer = window.setInterval(() => this.onPingTick(), this.PING_INTERVAL_MS)
  }

  private stopPingLoop(): void {
    if (this.pingTimer !== null) {
      clearInterval(this.pingTimer)
      this.pingTimer = null
    }
  }

  private async onPingTick(): Promise<void> {
    if (!this.connected) return

    try {
      if (this.state.isReceiver) {
        // 1. Poll RSSI on the receiver itself.
        await this.readRssi()

        // 2. Virtual-client keep-alive.
        const now = Date.now()
        const elapsed = now - this.state.esb_last_alive_time
        if (this.state.esb_last_alive_time > 0 && elapsed > this.state.esb_alive_timeout) {
          // Virtual mouse (via receiver) has gone silent.
          this.state.virtual_connected = false
          this.state.esb_alive_timeout = ESB_ALIVE_TIMEOUT_MS
          this.notify()
          // Wake the mouse side by querying the receiver again.
          await this.client.query()
        } else {
          // Ping the virtual client on the mouse ESB channel.
          await this.pingVirtualClient()
        }
      } else {
        // Direct-connected mouse — simple ping.
        await this.client.ping(0)
      }
    } catch (err) {
      // Ping errors are non-fatal; the next tick will retry.
      console.warn('[RawmDeviceManager] Ping tick error:', err)
    }
  }

  private async readRssi(): Promise<void> {
    await this.client.action(ACTION_READ_RSSI, 0)
  }

  private async pingVirtualClient(): Promise<void> {
    const payload: number[] = [CMD_PING, 0x00, 0x00, 0x00]
    await this.client.sendMouseCommandOnChannel(payload, ESB_CHANNEL_MOUSE)
  }

  // ---------------------------------------------------------------------------
  // State Access
  // ---------------------------------------------------------------------------

  getState(): DeviceState {
    return this.state
  }

  on(listener: DeviceStateListener): () => void {
    this.listeners.push(listener)
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener)
    }
  }

  private emit(state: DeviceState | null): void {
    for (const listener of this.listeners) {
      try {
        listener(state)
      } catch (err) {
        console.error('[RawmDeviceManager] Listener error:', err)
      }
    }
  }

  private notify(): void {
    this.emit(this.state)
  }

  // ---------------------------------------------------------------------------
  // Settings Mutators (mirrors bridge API)
  // ---------------------------------------------------------------------------

  async applySettings(): Promise<void> {
    const blob = buildMouseParamBlob(this.state)
    const packet = buildMousePacket(blob, { useCrc: true, channel: 0xff })
    await this.client.sendRaw(packet)
  }

  async factoryReset(): Promise<void> {
    await this.client.action(CMD_ACTION, 0x00)
  }

  async setCpi(value: number): Promise<void> {
    this.state.cpi.value = value
    this.state.cpi.x = value
    this.state.cpi.y = value
    this.notify()
  }

  async setPollingRate(value: number): Promise<void> {
    this.state.polling_rate = value
    this.notify()
  }

  async setPowerMode(value: number): Promise<void> {
    this.state.power_mode.mode = value
    this.notify()
  }

  async setLod(value: number): Promise<void> {
    this.state.lod = value
    this.notify()
  }

  async setAngleSnapping(enabled: boolean): Promise<void> {
    this.state.angle_snapping = enabled
    this.notify()
  }

  async setAngleTuning(value: number): Promise<void> {
    this.state.angle_tuning = value
    this.notify()
  }

  async setRippleControl(enabled: boolean): Promise<void> {
    this.state.ripple_control = enabled
    this.notify()
  }

  async setMotionSync(enabled: boolean): Promise<void> {
    this.state.motion_sync = enabled
    this.notify()
  }

  async setSleepTime(value: number): Promise<void> {
    this.state.sleep_time = value
    this.notify()
  }

  async setGlassMode(enabled: boolean): Promise<void> {
    this.state.glass_mode = enabled
    this.notify()
  }

  async setLightMode(mode: number, brightness: number, hue: number, saturation: number): Promise<void> {
    this.state.light.mode = mode
    this.state.light.brightness = brightness
    this.state.light.hue = hue
    this.state.light.saturation = saturation
    this.notify()
  }

  // ---------------------------------------------------------------------------
  // Wireless / Receiver
  // ---------------------------------------------------------------------------

  async pairReceiver(addr: string, channel: number, isSlow: boolean): Promise<void> {
    const payload = buildSetEsbAddrPayload(addr, channel, isSlow)
    const packet = buildMousePacket(payload, { useCrc: true, channel: 0xff })
    await this.client.sendRaw(packet)
  }

  async unpairReceiver(addr: string): Promise<void> {
    const payload = buildClearEsbAddrPayload(addr)
    const packet = buildMousePacket(payload, { useCrc: true, channel: 0xff })
    await this.client.sendRaw(packet)
  }

  async selectReceiver(addr: string): Promise<void> {
    const payload = buildSelectEsbAddrPayload(addr)
    const packet = buildMousePacket(payload, { useCrc: true, channel: 0xff })
    await this.client.sendRaw(packet)
  }

  // ---------------------------------------------------------------------------
  // Mouse Key / Function Mapping
  // ---------------------------------------------------------------------------

  async setMouseKeyMapping(args: MouseKeyMapArgs): Promise<void> {
    const payload = buildMouseKeyPayload(args)
    const packet = buildMousePacket(payload, { useCrc: true, channel: 0xff })
    await this.client.sendRaw(packet)
  }

  async setMouseFunctionMapping(args: MouseFunctionMapArgs): Promise<void> {
    const payload = buildMouseFunctionPayload(args)
    const packet = buildMousePacket(payload, { useCrc: true, channel: 0xff })
    await this.client.sendRaw(packet)
  }

  // ---------------------------------------------------------------------------
  // Macro Upload
  // ---------------------------------------------------------------------------

  async sendMacro(
    keyIds: number[],
    macroIndex: number,
    triggerType: number,
    actions: MacroAction[],
    macroName: string
  ): Promise<void> {
    const segments = buildMacroSegments(keyIds, macroIndex, triggerType, actions, macroName)
    for (const seg of segments) {
      const packet = buildMousePacket(seg.payload, { useCrc: true, channel: 0xff })
      await this.client.sendRaw(packet)
    }
  }

  // ---------------------------------------------------------------------------
  // Keyboard Macro Read-Back
  // ---------------------------------------------------------------------------

  /** Initiate reading all keyboard macros from the device. */
  async startMacroReadBack(): Promise<void> {
    this.macroReadBuf = []
    this.macroReadIndex = 0
    this.macroReadOffset = 0
    await this.requestMacroChunk()
  }

  private async requestMacroChunk(): Promise<void> {
    await this.client.getMacroDataBuf(this.macroReadOffset, this.MACRO_READ_CHUNK_SIZE)
  }

  private parseKeyboardMacroBuffer(): import('./rawm-device').KbdMacroInfo {
    const actions: import('./rawm-device').MacroAction[] = []
    // The first byte is a version/type marker; skip it.
    let i = 1
    while (i < this.macroReadBuf.length) {
      const marker = this.macroReadBuf[i]
      if (marker === 0x02) {
        // KEYDOWN
        i++
        const keyid = this.macroReadBuf[i] ?? 0
        i += 2 // skip keyid + trailing 0x01
        actions.push({ event: WM_KEYDOWN, key_code: keyid, delay: 0, mouse_x: 0, mouse_y: 0 })
      } else if (marker === 0x03) {
        // KEYUP
        i++
        const keyid = this.macroReadBuf[i] ?? 0
        i += 2 // skip keyid + trailing 0x01
        actions.push({ event: WM_KEYUP, key_code: keyid, delay: 0, mouse_x: 0, mouse_y: 0 })
      } else if (marker === 0x04) {
        // Delay (ASCII digits) applied to previous action.
        i++
        let delayStr = ''
        while (i < this.macroReadBuf.length) {
          const ch = this.macroReadBuf[i]
          if (ch >= 0x30 && ch <= 0x39) {
            delayStr += String.fromCharCode(ch)
            i++
          } else {
            break
          }
        }
        const prev = actions[actions.length - 1]
        if (prev) {
          prev.delay = parseInt(delayStr, 10) || 0
        }
        i += 2 // skip trailing 0x01 + leading 0x01 of next action
      } else {
        // Unknown marker — advance by one to avoid an infinite loop.
        i++
      }
    }
    return { id: this.macroReadIndex, name: `Macro ${this.macroReadIndex + 1}`, actions }
  }

  private handleMacroDataResponse(payload: Uint8Array): void {
    if (payload.length < 4) return
    const offset = (payload[1] << 8) | payload[2]
    const len = payload[3]
    let terminatorFound = false
    for (let j = 0; j < len && 4 + j < payload.length; j++) {
      const byte = payload[4 + j]
      if (byte === 0x00) {
        // End of one macro.
        if (this.macroReadBuf.length >= 3) {
          const macro = this.parseKeyboardMacroBuffer()
          // Ensure array is large enough.
          while (this.state.kbd_macro_infos.length <= this.macroReadIndex) {
            this.state.kbd_macro_infos.push([])
          }
          this.state.kbd_macro_infos[this.macroReadIndex] = [macro]
        }
        this.macroReadIndex++
        this.macroReadBuf = []
        this.macroReadOffset = offset + j + 1
        terminatorFound = true
      } else {
        this.macroReadBuf.push(byte)
      }
    }
    if (!terminatorFound) {
      this.macroReadOffset = offset + len
    }
    // Continue reading if there are more macros expected.
    if (this.macroReadIndex < this.state.kbd_macro_num) {
      this.requestMacroChunk()
    } else {
      this.notify()
    }
  }

  // ---------------------------------------------------------------------------
  // Firmware Update
  // ---------------------------------------------------------------------------

  /**
   * Query the RAWM firmware server for update info.
   * Mirrors the original library's `query_firmware()` XHR call.
   */
  async queryFirmwareInfo(): Promise<void> {
    const params = new URLSearchParams({
      devName: this.state.deviceName,
      vendorId: this.state.vendorId.toString(),
      productId: this.state.productId.toString(16),
      revision: this.state.revision,
      revisionCode: this.state.revisionCode.toString(),
      hardwareCode: this.state.hardwareCode.toString(),
      mode: '0', // MODE_ANDROID
      gamingOnly: '0',
    })

    try {
      const res = await fetch(
        `https://www.miracletek.net/game/firmware.php?${params.toString()}`
      )
      if (!res.ok) return
      const json = await res.json()
      this.state.firmwareInfo = json ?? {}
      this.notify()
    } catch (err) {
      console.warn('[RawmDeviceManager] Firmware query failed:', err)
    }
  }

  /**
   * Enter DFU (Device Firmware Update) mode.
   * The mouse will reboot into the bootloader and disappear from HID.
   * The actual firmware blob streaming is handled by a separate DFU tool
   * (not present in the deobfuscated library).
   */
  async enterDfuMode(): Promise<void> {
    await this.client.action(ACTION_SHUTDOWN_GOTO_DFU, 0)
  }

  // ---------------------------------------------------------------------------
  // HID Event Handling
  // ---------------------------------------------------------------------------

  private handleHidEvent(event: import('./rawm-hid-client').HidEvent): void {
    switch (event.type) {
      case 'connected': {
        this.state.connected = true
        this.state.deviceName = event.device.productName
        this.state.vendorId = event.device.vendorId
        this.state.productId = event.device.productId
        this.notify()
        break
      }

      case 'disconnected': {
        this.state.connected = false
        this.connected = false
        this.emit(null)
        break
      }

      case 'version': {
        this.state.softDrvVer = event.version
        this.notify()
        break
      }

      case 'config': {
        this.parseConfigPacket(event.configType, event.payload)
        break
      }

      case 'notify': {
        this.parseNotifyPacket(event.notifyType, event.payload)
        break
      }

      case 'iq_response': {
        this.parseIqResponse(event.opcode, event.payload)
        break
      }

      case 'device_info': {
        const info = event.info
        if (info.dn) this.state.deviceName = info.dn
        if (info.co) this.state.color = info.co
        if (info.r) this.state.revision = info.r
        if (info.rc !== undefined) this.state.revisionCode = info.rc
        if (info.hw !== undefined) this.state.hardwareCode = info.hw
        if (info.pm !== undefined) this.state.power_mode.mode = info.pm
        if (info.pi !== undefined) this.state.productId = info.pi
        if (info.vi !== undefined) this.state.vendorId = info.vi
        this.notify()
        break
      }

      case 'error': {
        console.error('[RawmDeviceManager] HID error:', event.error)
        break
      }
    }
  }

  private parseConfigPacket(configType: number, payload: Uint8Array): void {
    if (configType === CONFIG_TYPE_MOUSE_PARAM) {
      return
    }
    console.log('[RawmDeviceManager] Unhandled config type:', configType, payload)
  }

  private parseNotifyPacket(notifyType: number, payload: Uint8Array): void {
    switch (notifyType) {
      case NOTIFY_TYPE_MOUSE_CPI: {
        if (payload.length >= 4) {
          this.state.cpi.value = payload[2] | (payload[3] << 8)
        }
        break
      }

      case NOTIFY_TYPE_MOUSE_POLLING: {
        if (payload.length >= 4) {
          this.state.polling_rate = payload[2] | (payload[3] << 8)
        }
        break
      }

      case NOTIFY_TYPE_MOUSE_LIGHT: {
        if (payload.length >= 8) {
          this.state.light.mode = payload[2]
          this.state.light.brightness = payload[3]
          this.state.light.hue = payload[4] | (payload[5] << 8)
          this.state.light.saturation = payload[6]
        }
        break
      }

      case NOTIFY_TYPE_MOUSE_POWER_MODE: {
        if (payload.length >= 3) {
          this.state.power_mode.mode = payload[2]
        }
        break
      }

      case NOTIFY_TYPE_MOUSE_LOD: {
        if (payload.length >= 3) {
          this.state.lod = payload[2]
        }
        break
      }

      case NOTIFY_TYPE_MOUSE_MOTION_SYNC: {
        if (payload.length >= 3) {
          this.state.motion_sync = payload[2] !== 0
        }
        break
      }

      case NOTIFY_TYPE_MOUSE_ANGLE_TUNING: {
        if (payload.length >= 3) {
          this.state.angle_tuning = payload[2]
        }
        break
      }

      case NOTIFY_TYPE_MOUSE_ANGLE_SNAPPING: {
        if (payload.length >= 3) {
          this.state.angle_snapping = payload[2] !== 0
        }
        break
      }

      case NOTIFY_TYPE_MOUSE_RIPPLE_CONTROL: {
        if (payload.length >= 3) {
          this.state.ripple_control = payload[2] !== 0
        }
        break
      }

      case NOTIFY_TYPE_MOUSE_TX_POWER: {
        if (payload.length >= 3) {
          this.state.tx_output_power_applied = payload[2]
        }
        break
      }

      case NOTIFY_TYPE_MOUSE_BATTERY: {
        if (payload.length >= 3) {
          this.state.battery = payload[2]
        }
        if (payload.length >= 4) {
          // charging flag at byte 3 (original library)
        }
        break
      }

      case NOTIFY_TYPE_MOUSE_BATTERY_LEVELS: {
        this.state.battery = 0
        const levels: number[] = []
        for (let i = 2; i + 1 < payload.length; i += 2) {
          levels.push(payload[i] | (payload[i + 1] << 8))
        }
        if (levels.length > 0) {
          this.state.battery = levels[levels.length - 1]
        }
        break
      }

      case NOTIFY_TYPE_MOUSE_CPI2: {
        if (payload.length >= 6) {
          this.state.cpi.value =
            payload[2] | (payload[3] << 8) | (payload[4] << 16) | (payload[5] << 24)
          this.state.enhancedCpi = true
        }
        break
      }

      case NOTIFY_TYPE_MOUSE_KEY_DELAY: {
        const delays: number[] = []
        for (let i = 2; i < payload.length; i++) {
          delays.push(payload[i])
        }
        if (delays.length >= 2) {
          this.state.key_delay.down_delay = delays[0]
          this.state.key_delay.up_delay = delays[1]
        }
        break
      }

      case NOTIFY_TYPE_MOUSE_CPI_LEVEL_COLOR: {
        const colors: number[] = []
        for (let i = 2; i < payload.length; i++) {
          colors.push(payload[i] & 0x07)
        }
        this.state.cpi_level_colors = colors
        break
      }

      case NOTIFY_TYPE_MOUSE_PEER: {
        if (payload.length === 3 && payload[2] === 0) {
          this.state.esb_address_arr = []
        } else if (payload.length >= 10) {
          const id = payload[2] | (payload[3] << 8)
          const addr =
            payload[4].toString(16).padStart(2, '0') +
            payload[5].toString(16).padStart(2, '0') +
            payload[6].toString(16).padStart(2, '0') +
            payload[7].toString(16).padStart(2, '0') +
            payload[8].toString(16).padStart(2, '0')
          this.state.esb_address_arr.push({ addr, channel: payload[9] })
        }
        break
      }

      case NOTIFY_TYPE_MOUSE_RSSI: {
        if (payload.length >= 3) {
          this.state.rssi = new Int8Array([payload[2]])[0]
        }
        break
      }

      case NOTIFY_TYPE_MOUSE_NOACK: {
        if (payload.length >= 3) {
          this.state.noack = payload[2] !== 0
        }
        break
      }

      case NOTIFY_TYPE_MOUSE_LUA_STATUS: {
        if (payload.length >= 3) {
          this.state.luaStatus = payload[2]
        }
        break
      }

      case NOTIFY_TYPE_MOUSE_COLOR_CODE: {
        for (let i = 2; i < payload.length; i++) {
          if (payload[i] === 0) {
            this.state.colorCode = parseInt(
              String.fromCharCode(...payload.subarray(2, i)),
              10
            )
            break
          }
        }
        break
      }

      case NOTIFY_TYPE_MOUSE_SLEEP_TIME: {
        if (payload.length >= 4) {
          this.state.sleep_time = payload[2] | (payload[3] << 8)
        }
        break
      }

      case NOTIFY_TYPE_MOUSE_RF_CHN: {
        if (payload.length >= 3) {
          this.state.rf_channel = payload[2]
        }
        break
      }

      case NOTIFY_TYPE_MOUSE_ONBOARD_INDEX: {
        if (payload.length >= 3) {
          this.state.onboardIndex = payload[2]
        }
        break
      }

      case NOTIFY_TYPE_MOUSE_ONBOARD_STATUS: {
        if (payload.length >= 3) {
          const count = payload[2]
          for (let i = 0; i < count && i + 3 < payload.length; i++) {
            this.state.onboard_status[i] = payload[i + 3]
          }
        }
        break
      }

      case NOTIFY_TYPE_MOUSE_GLASS_MODE: {
        if (payload.length >= 3) {
          this.state.glass_mode = payload[2] !== 0
          this.state.glass_mode_enabled = payload[2] !== 0
        }
        break
      }

      case NOTIFY_TYPE_MOUSE_CONFIG: {
        this.parseBulkConfig(payload)
        break
      }

      case CMD_PING: {
        // Any ping response (direct or via receiver) resets the alive clock.
        this.state.esb_last_alive_time = Date.now()
        this.state.esb_alive_timeout = ESB_ALIVE_TIMEOUT_MS
        this.state.virtual_connected = true

        // Parse optional payload bytes: [squal, rssi, txOutputPower]
        const pingPayload = payload.subarray(3)
        if (pingPayload.length > 0) {
          this.state.squal = pingPayload[0]
        }
        if (pingPayload.length > 1) {
          this.state.rssi = new Int8Array([pingPayload[1]])[0]
        }
        if (pingPayload.length > 2) {
          this.state.tx_output_power = pingPayload[2]
        }
        break
      }

      default: {
        console.log('[RawmDeviceManager] Unhandled notify type:', notifyType, payload)
      }
    }

    this.notify()
  }

  // ---------------------------------------------------------------------------
  // Keyboard IQ Response Parsing
  // ---------------------------------------------------------------------------

  private parseIqResponse(opcode: number, payload: Uint8Array): void {
    switch (opcode) {
      case IQ_GET_SOFT_DRV_VER: {
        // [len, ...ascii]
        const len = payload[1] ?? 0
        this.state.softDrvVer = String.fromCharCode(...payload.subarray(2, 2 + len))
        break
      }

      case IQ_GET_KB_INFO: {
        // Typical layout: [row_count, col_count, key_count, layer_count, ...]
        if (payload.length >= 5) {
          const rowCount = payload[1]
          const colCount = payload[2]
          const keyCount = payload[3]
          const layerCount = payload[4]
          this.state.firmwareInfo = {
            ...this.state.firmwareInfo,
            rowCount,
            colCount,
            keyCount,
            layerCount,
          }
        }
        break
      }

      case IQ_GET_KEYCODE_BUF: {
        // Parse keycode buffer into kbd_key_infos.
        // Format: [key_type, vCode, aCode, sCode, keyId, row, col, ...] per key.
        // Exact stride depends on firmware; assume 8 bytes per key for now.
        const keys: import('./rawm-device').KbdKeyInfo[] = []
        const stride = 8
        for (let i = 1; i + stride <= payload.length; i += stride) {
          keys.push({
            type: payload[i],
            vCode: payload[i + 1],
            aCode: payload[i + 2],
            sCode: payload[i + 3] | (payload[i + 4] << 8),
            keyId: payload[i + 5],
            row: payload[i + 6],
            col: payload[i + 7],
            name: '',
            aName: '',
            rect: [],
          })
        }
        this.state.kbd_key_infos = keys
        break
      }

      case IQ_GET_RGB_COLOR_BUF: {
        // Parse RGB/light settings.
        // Typical: [mode, brightness, speed, hue_lo, hue_hi, saturation, ...]
        if (payload.length >= 7) {
          this.state.kbd_light_info = {
            mode: payload[1],
            brightness: payload[2],
            speed: payload[3],
            hue: payload[4] | (payload[5] << 8),
            saturation: payload[6],
            auto_off: payload[7] !== 0,
            colors: Array.from(payload.subarray(8)),
          }
        }
        break
      }

      case IQ_GET_MACRO_NUM: {
        if (payload.length >= 2) {
          this.state.kbd_macro_num = payload[1]
        }
        break
      }

      case IQ_GET_MACRO_SIZE: {
        if (payload.length >= 3) {
          this.state.kbd_macro_max_size = payload[1] | (payload[2] << 8)
        }
        // After learning macro count & size, start reading macro data.
        if (this.state.kbd_macro_num > 0) {
          this.startMacroReadBack()
        }
        break
      }

      case IQ_GET_MACRO_DATA_BUF: {
        this.handleMacroDataResponse(payload)
        break
      }

      case IQ_GET_MAG_DATA: {
        // Parse magnetic axis calibration data.
        // Typical: [row, col, rt_enable, top_dz_lo, top_dz_hi, apc_lv_lo, apc_lv_hi,
        //           rt_press_lv_lo, rt_press_lv_hi, rt_release_lv_lo, rt_release_lv_hi,
        //           btm_dz_lo, btm_dz_hi, switch_type]
        const axes: import('./rawm-device').MagAxisInfo[] = []
        const stride = 14
        for (let i = 1; i + stride <= payload.length; i += stride) {
          axes.push({
            row: payload[i],
            col: payload[i + 1],
            rt_enable: payload[i + 2],
            top_dz: payload[i + 3] | (payload[i + 4] << 8),
            apc_lv: payload[i + 5] | (payload[i + 6] << 8),
            rt_press_lv: payload[i + 7] | (payload[i + 8] << 8),
            rt_release_lv: payload[i + 9] | (payload[i + 10] << 8),
            btm_dz: payload[i + 11] | (payload[i + 12] << 8),
            switch_type: payload[i + 13],
          })
        }
        this.state.kbd_axis_infos = axes
        break
      }

      default: {
        // Silently ignore unhandled IQ responses; many are for one-shot commands.
      }
    }

    this.notify()
  }

  private parseBulkConfig(payload: Uint8Array): void {
    if (payload.length < 20) return

    let off = 2

    // CPI X (uint16LE)
    if (off + 2 <= payload.length) {
      this.state.cpi.value = payload[off] | (payload[off + 1] << 8)
      off += 2
    }

    // Polling rate (uint16LE)
    if (off + 2 <= payload.length) {
      this.state.polling_rate = payload[off] | (payload[off + 1] << 8)
      off += 2
    }

    // Light mode
    if (off < payload.length) {
      this.state.light.mode = payload[off++]
    }

    // Brightness
    if (off < payload.length) {
      this.state.light.brightness = payload[off++]
    }

    // CPI levels count + array (uint16LE each)
    if (off < payload.length) {
      const cpiCount = payload[off++]
      this.state.cpi_levels = []
      for (let i = 0; i < cpiCount && off + 1 < payload.length; i++) {
        this.state.cpi_levels.push({
          value: payload[off] | (payload[off + 1] << 8),
        })
        off += 2
      }
    }

    // Power mode
    if (off < payload.length) {
      this.state.power_mode.mode = payload[off++]
    }

    // LOD
    if (off < payload.length) {
      this.state.lod = payload[off++]
    }

    // Angle snapping
    if (off < payload.length) {
      this.state.angle_snapping = payload[off++] !== 0
    }

    // Motion sync
    if (off < payload.length) {
      this.state.motion_sync = payload[off++] !== 0
    }

    // Ripple control
    if (off < payload.length) {
      this.state.ripple_control = payload[off++] !== 0
    }

    // Angle tuning
    if (off < payload.length) {
      this.state.angle_tuning = payload[off++]
    }

    // Sleep time (uint16LE)
    if (off + 2 <= payload.length) {
      this.state.sleep_time = payload[off] | (payload[off + 1] << 8)
      off += 2
    }

    // Wireless turbo
    if (off < payload.length) {
      this.state.wirelessTurbo = payload[off++]
    }

    // Key delay count + delays
    if (off < payload.length) {
      const delayCount = payload[off++]
      const delayLen = payload[off++]
      const delays: number[] = []
      for (let i = 0; i < delayLen && off < payload.length; i++) {
        delays.push(payload[off++])
      }
      if (delays.length >= 1) this.state.key_delay.down_delay = delays[0]
      if (delays.length >= 2) this.state.key_delay.up_delay = delays[1]
    }

    // CPI Y / full 32-bit CPI
    if (off + 4 <= payload.length) {
      const cpi32 =
        payload[off] |
        (payload[off + 1] << 8) |
        (payload[off + 2] << 16) |
        (payload[off + 3] << 24)
      off += 4
      if (cpi32 !== 0) {
        this.state.cpi.value = cpi32
        this.state.enhancedCpi = true
      }
    }

    // Enhanced CPI levels count + array (uint32LE each)
    if (off < payload.length) {
      const enhancedCount = payload[off++]
      if (enhancedCount > 0) {
        this.state.cpi_levels = []
        for (let i = 0; i < enhancedCount && off + 3 < payload.length; i++) {
          this.state.cpi_levels.push({
            value:
              payload[off] |
              (payload[off + 1] << 8) |
              (payload[off + 2] << 16) |
              (payload[off + 3] << 24),
          })
          off += 4
        }
      }
    }

    // CPI level colors
    if (off < payload.length) {
      const colorCount = payload[off++]
      this.state.cpi_level_colors = []
      for (let i = 0; i < colorCount && off < payload.length; i++) {
        this.state.cpi_level_colors.push(payload[off++] & 0x07)
      }
    }

    // TX output power
    if (off < payload.length) {
      this.state.tx_output_power_applied = payload[off++]
    }

    // Onboard status
    if (off < payload.length) {
      const statusCount = payload[off++]
      this.state.onboard_status = []
      for (let i = 0; i < statusCount && off < payload.length; i++) {
        this.state.onboard_status.push(payload[off++])
      }
    }

    // Glass mode
    if (off < payload.length) {
      this.state.glass_mode = payload[off++] !== 0
      this.state.glass_mode_enabled = true
    }
  }
}
