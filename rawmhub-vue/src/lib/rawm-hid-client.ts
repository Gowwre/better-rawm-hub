/**
 * RAWM HID Client
 *
 * Pure TypeScript WebHID client replacing `hs_send_client_data()`,
 * `crc_process()`, and the giant `hs_parse_cmd()` switch statement.
 *
 * No jQuery, no layui, no iframe — just direct `navigator.hid` I/O.
 */

import {
  MAXIMUM_PACKET_SIZE,
  HS_MAXIMUM_PACKET_SIZE,
  CONFIG_TYPE_CRC,
  CMD_QUERY,
  CMD_QUERY_RESULT,
  CMD_CONFIG,
  CMD_ACTION,
  CMD_PING,
  IQ_GET_SOFT_DRV_VER,
  IQ_GET_KB_INFO,
  IQ_GET_KEYCODE_BUF,
  IQ_GET_RGB_COLOR_BUF,
  IQ_GET_MACRO_NUM,
  IQ_GET_MACRO_SIZE,
  IQ_GET_MAG_DATA,
  ESB_CHANNEL_INVALID,
  ESB_CHANNEL_MOUSE,
  IQ_GET_MACRO_DATA_BUF,
} from './rawm-protocol'

import { buildMousePacket, buildKeyboardPacket } from './rawm-packet'

// =============================================================================
// Event Types
// =============================================================================

export type HidEvent =
  | { type: 'connected'; device: HIDDevice }
  | { type: 'disconnected'; device: HIDDevice }
  | { type: 'error'; error: Error }
  | { type: 'notify'; notifyType: number; payload: Uint8Array }
  | { type: 'config'; configType: number; payload: Uint8Array }
  | { type: 'iq_response'; opcode: number; payload: Uint8Array }
  | { type: 'version'; version: string }
  | { type: 'device_info'; info: Record<string, any> }
  | { type: 'raw'; data: Uint8Array }

export type HidEventListener = (event: HidEvent) => void

// =============================================================================
// Client Options
// =============================================================================

export interface RawmHidClientOptions {
  vendorId?: number
  productId?: number
  usagePage?: number
  usage?: number
  isKeyboard?: boolean
  channel?: number // ESB channel; 0xFF = direct USB
  useCrc?: boolean
  filters?: HIDDeviceFilter[] // Multiple filters for pairing
}

// =============================================================================
// RawmHidClient
// =============================================================================

export class RawmHidClient {
  private device: HIDDevice | null = null
  private listeners: HidEventListener[] = []
  private recvBuf: Uint8Array = new Uint8Array(0)
  private reportSize: number = MAXIMUM_PACKET_SIZE
  private isKeyboardDevice: boolean = false
  private channel: number = ESB_CHANNEL_INVALID
  private useCrc: boolean = false
  private options: RawmHidClientOptions

  constructor(options: RawmHidClientOptions) {
    this.options = options
    this.isKeyboardDevice = options.isKeyboard ?? false
    this.channel = options.channel ?? ESB_CHANNEL_INVALID
    this.useCrc = options.useCrc ?? false
    this.reportSize = this.isKeyboardDevice ? HS_MAXIMUM_PACKET_SIZE : MAXIMUM_PACKET_SIZE
  }

  // ---------------------------------------------------------------------------
  // Device Lifecycle
  // ---------------------------------------------------------------------------

  async requestDevice(): Promise<HIDDevice> {
    const filters: HIDDeviceFilter[] =
      this.options.filters ??
      (this.options.vendorId
        ? [
            {
              vendorId: this.options.vendorId,
              ...(this.options.productId ? { productId: this.options.productId } : {}),
              ...(this.options.usagePage ? { usagePage: this.options.usagePage } : {}),
              ...(this.options.usage ? { usage: this.options.usage } : {}),
            },
          ]
        : [])

    const devices = await navigator.hid.requestDevice({ filters })
    if (!devices.length) {
      throw new Error('No HID device selected by user')
    }

    this.device = devices[0]

    // Auto-detect keyboard from product name
    const productName = this.device.productName || ''
    if (!this.options.isKeyboard && (productName.includes('Z68') || productName.toLowerCase().includes('keyboard'))) {
      this.isKeyboardDevice = true
      this.reportSize = HS_MAXIMUM_PACKET_SIZE
    }

    this.emit({ type: 'connected', device: this.device })
    return this.device
  }

  async open(): Promise<void> {
    if (!this.device) {
      throw new Error('Device not selected. Call requestDevice() first.')
    }

    await this.device.open()
    this.device.addEventListener('inputreport', (e) => this.handleInputReport(e as HIDInputReportEvent))
  }

  close(): void {
    if (this.device) {
      this.device.removeEventListener('inputreport', this.handleInputReport as any)
      this.device.close().catch(() => {})
      this.emit({ type: 'disconnected', device: this.device })
      this.device = null
    }
    this.recvBuf = new Uint8Array(0)
  }

  getDevice(): HIDDevice | null {
    return this.device
  }

  useDevice(device: HIDDevice): void {
    this.device = device
    const productName = device.productName || ''
    if (!this.options.isKeyboard && (productName.includes('Z68') || productName.toLowerCase().includes('keyboard'))) {
      this.isKeyboardDevice = true
      this.reportSize = HS_MAXIMUM_PACKET_SIZE
    }
  }

  // ---------------------------------------------------------------------------
  // Event Emitter
  // ---------------------------------------------------------------------------

  on(listener: HidEventListener): () => void {
    this.listeners.push(listener)
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener)
    }
  }

  private emit(event: HidEvent): void {
    for (const listener of this.listeners) {
      try {
        listener(event)
      } catch (err) {
        console.error('[RawmHidClient] Listener error:', err)
      }
    }
  }

  // ---------------------------------------------------------------------------
  // Sending
  // ---------------------------------------------------------------------------

  async sendMouseCommand(payload: number[] | Uint8Array): Promise<void> {
    if (!this.device) return
    const report = buildMousePacket(payload, {
      useCrc: this.useCrc,
      channel: this.channel,
    })
    await this.device.sendReport(0, report as BufferSource)
  }

  /** Send a mouse command on a specific ESB channel (used for virtual clients). */
  async sendMouseCommandOnChannel(payload: number[] | Uint8Array, channel: number): Promise<void> {
    if (!this.device) return
    const report = buildMousePacket(payload, {
      useCrc: this.useCrc,
      channel,
    })
    await this.device.sendReport(0, report as BufferSource)
  }

  async sendKeyboardCommand(payload: number[] | Uint8Array): Promise<void> {
    if (!this.device) return
    const report = buildKeyboardPacket(payload, {
      channel: this.channel,
    })
    await this.device.sendReport(0, report as BufferSource)
  }

  async sendRaw(data: Uint8Array): Promise<void> {
    if (!this.device) return
    await this.device.sendReport(0, data as BufferSource)
  }

  // ---------------------------------------------------------------------------
  // High-level Commands
  // ---------------------------------------------------------------------------

  /** send_event_query() equivalent — handshake with Unix timestamp. */
  async query(): Promise<void> {
    const ts = Math.floor(Date.now() / 1000)
    const payload: number[] = [
      CMD_QUERY,
      0x00,
      CMD_CONFIG,
      0x00,
      0x00,
      ts & 0xff,
      (ts >> 8) & 0xff,
      (ts >> 16) & 0xff,
      (ts >> 24) & 0xff,
      0x00,
      0x00,
      0x00,
      0x00,
    ]
    await this.sendMouseCommand(payload)
  }

  /** send_event_action() equivalent. */
  async action(actionId: number, param: number): Promise<void> {
    const payload: number[] = [
      CMD_ACTION,
      0x00,
      actionId,
      param & 0xff,
      (param >> 8) & 0xff,
      (param >> 16) & 0xff,
      (param >> 24) & 0xff,
    ]
    await this.sendMouseCommand(payload)
  }

  /** send_event_ping() equivalent. */
  async ping(syncToken: number = 0): Promise<void> {
    const payload: number[] = [
      CMD_PING,
      0x00,
      syncToken & 0xff,
      (syncToken >> 8) & 0xff,
    ]
    await this.sendMouseCommand(payload)
  }

  /** send_event_mouse_param() equivalent. */
  async sendMouseConfigBlob(blob: Uint8Array): Promise<void> {
    await this.sendMouseCommand(blob)
  }

  // ---------------------------------------------------------------------------
  // Keyboard Handshake Waterfall
  // ---------------------------------------------------------------------------

  /**
   * Initiate the keyboard handshake sequence.
   *
   * The original library (hs_parse_cmd ~8064) sends a waterfall of IQ
   * commands after connection. We fire them sequentially; the caller
   * receives iq_response events for each reply.
   */
  async startKeyboardHandshake(): Promise<void> {
    await this.sendIqCommand(IQ_GET_SOFT_DRV_VER)
    await this.sendIqCommand(IQ_GET_KB_INFO)
    await this.sendIqCommand(IQ_GET_KEYCODE_BUF)
    await this.sendIqCommand(IQ_GET_RGB_COLOR_BUF)
    await this.sendIqCommand(IQ_GET_MACRO_NUM)
    await this.sendIqCommand(IQ_GET_MACRO_SIZE)
    await this.sendIqCommand(IQ_GET_MAG_DATA)
  }

  // ---------------------------------------------------------------------------
  // Receiving
  // ---------------------------------------------------------------------------

  private handleInputReport = (event: HIDInputReportEvent): void => {
    const data = new Uint8Array(event.data.buffer)
    this.emit({ type: 'raw', data: new Uint8Array(data) })

    // Strip ESB wireless prefix if present
    let payload: Uint8Array
    if (this.channel !== ESB_CHANNEL_INVALID) {
      payload = data.subarray(1)
    } else {
      payload = data
    }

    // Accumulate into receive buffer
    this.recvBuf = concatUint8Arrays(this.recvBuf, payload)

    // Parse all complete packets in buffer
    while (this.recvBuf.length >= this.reportSize) {
      const packet = this.recvBuf.subarray(0, this.reportSize)
      this.recvBuf = this.recvBuf.subarray(this.reportSize)
      this.parsePacket(packet)
    }
  }

  private parsePacket(packet: Uint8Array): void {
    const firstByte = packet[0]

    // Keyboard IQ responses start with the IQ opcode directly
    if (this.isKeyboardDevice) {
      this.parseIqResponse(packet)
      return
    }

    // Mouse packets: first byte contains length in lower 6 bits for some formats
    const length = firstByte & 0x3f
    if (length === 0) return

    const cmd = packet[2] ?? firstByte

    // Detect packet type
    if (firstByte === CMD_QUERY) {
      // Direct response to query
      this.parseQueryResponse(packet)
      return
    }

    if (cmd === CONFIG_TYPE_CRC || packet[1] === CONFIG_TYPE_CRC) {
      // CRC-wrapped config packet
      this.parseConfigPacket(packet)
      return
    }

    if (firstByte >= 0x80) {
      // Length-prefixed mouse packet
      this.parseMousePacket(packet)
      return
    }

    // Fallback: treat as raw notify
    this.emit({ type: 'notify', notifyType: firstByte, payload: packet })
  }

  private parseQueryResponse(packet: Uint8Array): void {
    // Query response format (from original library):
    // Byte 0 = CMD_QUERY (0x01)
    // Byte 1 = length
    // Bytes 2.. = device info string or binary data
    // For now, emit as raw config
    this.emit({ type: 'config', configType: CMD_QUERY, payload: packet })
  }

  private parseConfigPacket(packet: Uint8Array): void {
    // Find the actual config type after CRC envelope
    let offset = 0
    if (packet[0] >= 0x80) {
      offset = 1 // skip length prefix
    }

    // If CRC envelope present: [len|type, len, 0x24, crc_lo, crc_hi, ...payload]
    if (packet[offset + 2] === CONFIG_TYPE_CRC) {
      offset += 5 // skip CRC envelope
    }

    const configType = packet[offset]
    const payload = packet.subarray(offset)

    this.emit({ type: 'config', configType, payload })
  }

  private parseMousePacket(packet: Uint8Array): void {
    const payload = packet.subarray(1) // strip length prefix
    if (payload.length < 2) return

    // Check for 0xff 0xff 0xff 0xff sync pattern (CMD_QUERY_RESULT format)
    // Original library: recv_buf starts with sync, byte 4 = cmd, bytes 4-5 = length
    if (
      payload.length >= 4 &&
      payload[0] === 0xff &&
      payload[1] === 0xff &&
      payload[2] === 0xff &&
      payload[3] === 0xff
    ) {
      if (payload.length >= 6) {
        const cmd = payload[4] & 0x0f
        const len = ((payload[4] << 4) & 0xf00) | (payload[5] & 0xff)
        if (cmd === CMD_QUERY_RESULT && payload.length >= 6 + len) {
          const jsonBytes = payload.subarray(6, 6 + len)
          // Remove trailing null byte if present (original library does this)
          const end = jsonBytes.length > 0 && jsonBytes[jsonBytes.length - 1] === 0 ? jsonBytes.length - 1 : jsonBytes.length
          const jsonStr = String.fromCharCode(...jsonBytes.subarray(0, end))
          try {
            const deviceInfo = JSON.parse(jsonStr)
            this.emit({ type: 'device_info', info: deviceInfo })
          } catch (e) {
            console.warn('[RawmHidClient] Failed to parse device info JSON:', e)
          }
        }
      }
      return
    }

    // Normal notify packet parsing
    const notifyType = payload[1]
    this.emit({ type: 'notify', notifyType, payload })
  }

  private parseIqResponse(packet: Uint8Array): void {
    const opcode = packet[0]

    if (opcode === 0xf5) {
      // IQ_GET_SOFT_DRV_VER
      const len = packet[1]
      const version = String.fromCharCode(...packet.subarray(2, 2 + len))
      this.emit({ type: 'version', version })
    }

    this.emit({ type: 'iq_response', opcode, payload: packet })
  }

  // ---------------------------------------------------------------------------
  // Keyboard IQ Helpers
  // ---------------------------------------------------------------------------

  async sendIqCommand(opcode: number, data: number[] = []): Promise<void> {
    const payload = [opcode, ...data]
    await this.sendKeyboardCommand(payload)
  }

  /** Request a chunk of keyboard macro data (IQ_GET_MACRO_DATA_BUF). */
  async getMacroDataBuf(offset: number, length: number): Promise<void> {
    const payload = [
      IQ_GET_MACRO_DATA_BUF,
      (offset >> 8) & 0xff,
      offset & 0xff,
      length,
    ]
    await this.sendKeyboardCommand(payload)
  }
}

// =============================================================================
// Utility
// =============================================================================

function concatUint8Arrays(a: Uint8Array, b: Uint8Array): Uint8Array {
  const result = new Uint8Array(a.length + b.length)
  result.set(a, 0)
  result.set(b, a.length)
  return result
}
