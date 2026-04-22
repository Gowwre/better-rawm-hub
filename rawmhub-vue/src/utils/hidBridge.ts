/**
 * HID Bridge Module v2
 *
 * Wraps the original RAWM library (library.min.js) in a hidden iframe.
 * The library is ~650KB of obfuscated code tightly coupled to jQuery/LayUI/DOM.
 * Rather than reimplement the HID protocol, we load the library in its natural
 * environment (hub-local.html) and bridge its internal state to the Vue app
 * via postMessage.
 */

import { getDeviceImageUrl } from './deviceImage'
import type { UsbDevice } from '@/types'

export interface BridgeDevice {
  id: string
  name: string
  model: string
  type: 'mouse' | 'keyboard'
  battery?: number
  rssi?: number
  firmwareVersion: string
  hasNewFirmware: boolean
  imageUrl: string
  isConnected: boolean
  isReceiver: boolean
  productId: number
  vendorId: number
  channel?: number
}

export interface BridgeMouseSettings {
  cpi?: { value?: number; x?: number; y?: number; xySupported?: boolean }
  cpiLevels?: number[]
  cpiLevelColors?: number[]
  pollingRate?: number
  maxPollingRate?: number
  light?: any
  lightColors?: number[]
  lightDisplayColors?: string[]
  powerMode?: number
  powerModes?: any[]
  powerModes2?: any[]
  powerModeTips?: string
  lod?: number
  lodsList?: any[]
  angleSnapping?: boolean
  angleTuning?: number
  rippleControl?: boolean
  motionSync?: boolean
  wirelessTurbo?: boolean
  rfChannel?: number
  defaultRfChannel?: number
  sleepTime?: number
  keyDelay?: any
  glassMode?: boolean
  onboardIndex?: number
  onboardNum?: number
  onboardStatus?: any
  onboardAllowSwitch?: boolean
  onboardStatusColors?: number[]
  esbAddrs?: any[]
  colorCodes?: any[]
  colorCode?: number
  shellCmd?: any
  isEnhancedCpi?: boolean
  isDynamicGom?: boolean
  isOms?: boolean
  keys?: any[]
  macros?: any[][]
  macroMaxSize?: number
}

export interface BridgeKeyboardSettings {
  keyInfos?: any[]
  keys?: any[]
  lightInfo?: any
  axisInfos?: any[]
  axisMode?: number
  socdInfos?: any[]
  socdNum?: number
  mtInfos?: any[]
  mtNum?: number
  rsInfos?: any[]
  rsNum?: number
  dksInfos?: any[]
  dksNum?: number
  macroInfos?: any[][]
  macroNum?: number
  macroMaxSize?: number
  onboardIndex?: number
  onboardNum?: number
}

interface BridgeCallbacks {
  onDevices?: (devices: BridgeDevice[], current: BridgeDevice | null) => void
  onSettings?: (device: BridgeDevice | null, settings: BridgeMouseSettings | BridgeKeyboardSettings | null) => void
  onReady?: () => void
  onError?: (err: any) => void
}

let iframe: HTMLIFrameElement | null = null
let isReady = false
let messageQueue: Array<{ command: string; payload?: any; reqId?: string }> = []
const callbacks: BridgeCallbacks = {}
let reqIdCounter = 0
const pendingReqs = new Map<string, { resolve: (val: any) => void; reject: (err: any) => void }>()

function sendToIframe(command: string, payload?: any): Promise<any> {
  if (!iframe || !iframe.contentWindow) return Promise.reject(new Error('Bridge not initialized'))

  const reqId = `req_${++reqIdCounter}`
  const msg = { source: 'rawm-hid-parent', command, payload, reqId }

  return new Promise((resolve, reject) => {
    pendingReqs.set(reqId, { resolve, reject })
    if (isReady) {
      iframe!.contentWindow!.postMessage(msg, '*')
    } else {
      messageQueue.push(msg)
    }
    // Auto-reject after timeout
    setTimeout(() => {
      if (pendingReqs.has(reqId)) {
        pendingReqs.delete(reqId)
        reject(new Error('Bridge command timeout'))
      }
    }, 5000)
  })
}

function flushQueue() {
  while (messageQueue.length > 0) {
    const msg = messageQueue.shift()
    if (msg && iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage(msg, '*')
    }
  }
}

function mapBridgeDevice(raw: any): BridgeDevice {
  const type: 'mouse' | 'keyboard' = raw.type === 'keyboard' ? 'keyboard' : 'mouse'
  const productId = Number(raw.productId) || 0
  const color = typeof raw.color === 'string' ? raw.color : undefined
  const imageUrl = getDeviceImageUrl(productId, type, color)
  console.log('[hidBridge] mapBridgeDevice imageUrl=', imageUrl, 'raw.color=', raw.color, 'raw.imageUrl=', raw.imageUrl, 'productId=', productId)

  return {
    id: raw.id || `${raw.vendorId || 0}-${productId}`,
    name: raw.name || 'Unknown Device',
    model: raw.model || raw.name || 'Unknown Device',
    type,
    battery: typeof raw.battery === 'number' ? raw.battery : undefined,
    rssi: typeof raw.rssi === 'number' ? raw.rssi : undefined,
    firmwareVersion: raw.firmwareVersion || '1.0.0',
    hasNewFirmware: !!raw.hasNewFirmware,
    imageUrl,
    isConnected: raw.isConnected !== false,
    isReceiver: !!raw.isReceiver,
    productId,
    vendorId: Number(raw.vendorId) || 0,
    channel: raw.channel,
  }
}

function handleMessage(event: MessageEvent) {
  if (!event.data || event.data.source !== 'rawm-hid-bridge') return

  const { type, payload } = event.data

  if (type === 'ready') {
    isReady = true
    flushQueue()
    callbacks.onReady?.()
  } else if (type === 'devices') {
    const devices = (payload.devices || []).map(mapBridgeDevice)
    const current = payload.current ? mapBridgeDevice(payload.current) : null
    callbacks.onDevices?.(devices, current)
  } else if (type === 'settings') {
    const device = payload.device ? mapBridgeDevice(payload.device) : null
    callbacks.onSettings?.(device, payload.settings || null)
  } else if (type === 'error') {
    console.error('[HID Bridge Error]', payload)
    callbacks.onError?.(payload)
  } else if (type === 'cmdResponse') {
    const reqId = payload?.reqId
    if (reqId && pendingReqs.has(reqId)) {
      const req = pendingReqs.get(reqId)!
      pendingReqs.delete(reqId)
      if (payload.type === 'error') {
        req.reject(payload.payload)
      } else {
        req.resolve(payload.payload)
      }
    }
  }
}

export function initBridge(cb: BridgeCallbacks) {
  if (iframe) return // already initialized

  Object.assign(callbacks, cb)
  window.addEventListener('message', handleMessage)

  iframe = document.createElement('iframe')
  iframe.src = '/hub-local.html'
  iframe.style.cssText = 'visibility:hidden;position:absolute;width:0;height:0;border:0;'
  document.body.appendChild(iframe)
}

export function refreshDevices() {
  return sendToIframe('refresh')
}

export function getDevices() {
  return sendToIframe('getDevices')
}

export function getSettings() {
  return sendToIframe('getSettings')
}

export function selectDevice(deviceId: string) {
  return sendToIframe('selectDevice', { deviceId })
}

export function setCpi(deviceId: string, value: number) {
  return sendToIframe('setCpi', { deviceId, value })
}

export function setPollingRate(deviceId: string, value: number) {
  return sendToIframe('setPollingRate', { deviceId, value })
}

export function setLight(deviceId: string, mode: number, info: any) {
  return sendToIframe('setLight', { deviceId, mode, info })
}

export function setPowerMode(deviceId: string, value: number) {
  return sendToIframe('setPowerMode', { deviceId, value })
}

export function setLod(deviceId: string, value: number) {
  return sendToIframe('setLod', { deviceId, value })
}

export function setAngleSnapping(deviceId: string, enabled: boolean) {
  return sendToIframe('setAngleSnapping', { deviceId, enabled })
}

export function setRippleControl(deviceId: string, enabled: boolean) {
  return sendToIframe('setRippleControl', { deviceId, enabled })
}

export function setMotionSync(deviceId: string, enabled: boolean) {
  return sendToIframe('setMotionSync', { deviceId, enabled })
}

export function setWirelessTurbo(deviceId: string, enabled: boolean) {
  return sendToIframe('setWirelessTurbo', { deviceId, enabled })
}

export function setSleepTime(deviceId: string, value: number) {
  return sendToIframe('setSleepTime', { deviceId, value })
}

export function setAngleTuning(deviceId: string, value: number) {
  return sendToIframe('setAngleTuning', { deviceId, value })
}

export function setKeyDelay(deviceId: string, down: number, up: number) {
  return sendToIframe('setKeyDelay', { deviceId, down, up })
}

export function setOnboardConfig(deviceId: string, index: number) {
  return sendToIframe('setOnboardConfig', { deviceId, index })
}

export function setRfChannel(deviceId: string, value: number) {
  return sendToIframe('setRfChannel', { deviceId, value })
}

export function setGlassMode(deviceId: string, enabled: boolean) {
  return sendToIframe('setGlassMode', { deviceId, enabled })
}

export function applySettings(deviceId: string) {
  return sendToIframe('applySettings', { deviceId })
}

export function factoryReset(deviceId: string) {
  return sendToIframe('factoryReset', { deviceId })
}

export function pairDevice() {
  return sendToIframe('pair')
}

export function destroyBridge() {
  window.removeEventListener('message', handleMessage)
  if (iframe) {
    iframe.remove()
    iframe = null
  }
  isReady = false
  messageQueue = []
  pendingReqs.clear()
}

export function bridgeDeviceToUsbDevice(d: BridgeDevice): UsbDevice {
  return {
    id: d.id,
    name: d.name,
    model: d.model,
    type: d.type,
    battery: d.battery,
    rssi: d.rssi,
    firmwareVersion: d.firmwareVersion,
    hasNewFirmware: d.hasNewFirmware,
    imageUrl: d.imageUrl,
    isConnected: d.isConnected,
  }
}
