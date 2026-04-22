/**
 * Native HID Composable
 *
 * Wraps RawmDeviceManager to provide the same reactive API as useBridgeSync,
 * but using direct WebHID communication instead of the iframe bridge.
 *
 * This is controlled by a feature flag and can coexist with the iframe bridge.
 */

import { ref, computed } from 'vue'
import { RawmDeviceManager } from '@/lib/rawm-device-manager'
import type { DeviceState, MacroAction } from '@/lib/rawm-device'
import type { BridgeDevice, BridgeMouseSettings, BridgeKeyboardSettings } from '@/utils/hidBridge'
import { getDeviceImageUrl } from '@/utils/deviceImage'
import { useMouseSettingsStore } from '@/stores/mouseSettings'
import type { MouseKeyMapArgs, MouseFunctionMapArgs } from '@/lib/rawm-mouse-keymap'

const nativeReady = ref(false)
const nativeError = ref<string | null>(null)
const devices = ref<BridgeDevice[]>([])
const currentDevice = ref<BridgeDevice | null>(null)
const rawSettings = ref<BridgeMouseSettings | BridgeKeyboardSettings | null>(null)

const isMouse = computed(() => currentDevice.value?.type === 'mouse')
const isKeyboard = computed(() => currentDevice.value?.type === 'keyboard')

let manager: RawmDeviceManager | null = null
let unsub: (() => void) | null = null

function mapDeviceStateToBridgeDevice(state: DeviceState): BridgeDevice {
  const isKbd = state.deviceName.includes('Z68') || state.deviceName.toLowerCase().includes('keyboard')
  const type = isKbd ? 'keyboard' : 'mouse'
  const fwInfo = state.firmwareInfo
  const hasNewFirmware =
    fwInfo && typeof fwInfo.revisionCode === 'number' && fwInfo.revisionCode > state.revisionCode
  const imageUrl = getDeviceImageUrl(state.productId, type, state.color)
  console.log('[useNativeHid] mapDeviceStateToBridgeDevice imageUrl=', imageUrl, 'color=', state.color, 'productId=', state.productId, 'type=', type)
  return {
    id: `${state.vendorId}-${state.productId}`,
    name: state.deviceName || 'RAWM Device',
    model: state.deviceName || 'RAWM Device',
    type,
    battery: state.battery,
    rssi: state.rssi,
    firmwareVersion: state.softDrvVer || '1.0.0',
    hasNewFirmware,
    imageUrl,
    isConnected: state.connected,
    isReceiver: state.isReceiver,
    virtualConnected: state.virtual_connected,
    productId: state.productId,
    vendorId: state.vendorId,
  }
}

function mapDeviceStateToMouseSettings(state: DeviceState): BridgeMouseSettings {
  const cpiLevels = state.cpi_levels
    .filter(l => l.value > 0)
    .map(l => ({
      value: l.value,
      x: l.value,
      y: l.value,
    }))

  const cpiLevelColors = state.cpi_level_colors.slice(0, cpiLevels.length)

  return {
    cpi: {
      value: state.cpi.value,
      xySupported: state.cpi.xy_supported,
    },
    cpiLevels: cpiLevels.map(l => l.value),
    cpiLevelColors,
    pollingRate: state.polling_rate,
    light: {
      mode: state.light.mode,
      brightness: state.light.brightness,
      hue: state.light.hue,
      saturation: state.light.saturation,
      auto_off: state.light.auto_off,
      define_colors: state.light.define_colors,
    },
    powerMode: state.power_mode.mode,
    lod: state.lod,
    angleSnapping: state.angle_snapping,
    angleTuning: state.angle_tuning,
    rippleControl: state.ripple_control,
    motionSync: state.motion_sync,
    wirelessTurbo: state.wirelessTurbo === 1,
    rfChannel: state.rf_channel,
    sleepTime: state.sleep_time,
    keyDelay: {
      down: state.key_delay.down_delay,
      up: state.key_delay.up_delay,
      enabled: state.key_delay.down_delay > 0 || state.key_delay.up_delay > 0,
    },
    glassMode: state.glass_mode,
    onboardIndex: state.onboardIndex,
    onboardNum: state.onboardNum,
    onboardAllowSwitch: false,
    onboardStatusColors: state.onboard_status_colors,
    colorCode: state.colorCode as any,
    colorCodes: [],
    esbAddrs: state.esb_address_arr.map(a => ({ addr: a.addr, channel: a.channel })),
    shellCmd: state.shell_cmd,
    isEnhancedCpi: state.enhancedCpi,
    isDynamicGom: state.dynamicGom,
    isOms: false,
    keys: [],
    macros: [],
    macroMaxSize: state.macro_max_size,
  }
}

/**
 * Copy live Pinia mouse settings into the manager's DeviceState so that
 * applySettings() sends the values the user actually sees in the UI.
 */
function syncMouseStoreToManagerState(state: DeviceState): void {
  const store = useMouseSettingsStore()

  // CPI
  const levels = store.dpiLevels
    .filter(l => l.x > 0)
    .map(l => ({ value: l.x }))
  state.cpi_levels = levels
  state.cpi_level_colors = store.dpiLevels.map(l => {
    // Parse '#RRGGBB' → 0xRRGGBB
    const hex = l.color.replace('#', '')
    return parseInt(hex, 16)
  })
  if (levels.length > 0) {
    const idx = store.currentDpiIndex
    const cur = levels[idx] ?? levels[0]
    state.cpi.value = cur.value
    state.cpi.x = cur.value
    state.cpi.y = store.dpiBothXY ? (store.dpiLevels[idx]?.y ?? cur.value) : cur.value
    state.cpi.xy_supported = store.dpiBothXY
  }

  // Polling
  state.polling_rate = store.currentPollingRate

  // Light
  state.light.mode = store.lightMode
  state.light.brightness = store.brightness
  state.light.auto_off = store.lightAutoOff
  // Hue/saturation are not exposed in the current UI; preserve device values

  // Power & LOD
  state.power_mode.mode = store.currentPowerMode
  state.lod = store.currentLod

  // Toggles
  state.angle_snapping = store.angleSnapping
  state.angle_tuning = store.angleTuning
  state.ripple_control = store.rippleControl
  state.motion_sync = store.motionSync
  state.wirelessTurbo = store.wirelessTurbo ? 1 : 0
  state.glass_mode = store.glassMode

  // Wireless / sleep
  state.rf_channel = store.currentRfChannel
  state.sleep_time = store.sleepTime

  // Key delay
  state.key_delay.down_delay = store.keyDelay.downDelay
  state.key_delay.up_delay = store.keyDelay.upDelay
}

let lastQueriedDeviceId: string | null = null

function onStateUpdate(state: DeviceState | null) {
  if (!state) {
    devices.value = []
    currentDevice.value = null
    rawSettings.value = null
    nativeReady.value = false
    lastQueriedDeviceId = null
    return
  }

  const bridgeDevice = mapDeviceStateToBridgeDevice(state)
  devices.value = [bridgeDevice]
  currentDevice.value = bridgeDevice

  if (bridgeDevice.type === 'mouse') {
    rawSettings.value = mapDeviceStateToMouseSettings(state)
  } else {
    // Keyboard settings mapping — placeholder for now
    rawSettings.value = {
      keyInfos: state.kbd_key_infos,
      lightInfo: state.kbd_light_info,
      axisInfos: state.kbd_axis_infos,
      macroInfos: state.kbd_macro_infos,
      macroNum: state.kbd_macro_num,
      macroMaxSize: state.kbd_macro_max_size,
    }
  }

  nativeReady.value = true
  nativeError.value = null

  // Auto-query firmware info once per device connection.
  const deviceId = `${state.vendorId}-${state.productId}`
  if (lastQueriedDeviceId !== deviceId && state.connected && state.softDrvVer) {
    lastQueriedDeviceId = deviceId
    manager?.queryFirmwareInfo().catch(() => {})
  }
}

export function useNativeHid() {
  async function start() {
    try {
      manager = new RawmDeviceManager()

      unsub = manager.on(onStateUpdate)

      // Try to auto-connect to already-granted devices first
      const connected = await manager.connectToGrantedDevice()
      if (!connected) {
        // No previously granted device — UI will show pair panel
        console.log('[NativeHID] No granted devices found. Waiting for user to pair.')
      }
    } catch (err: any) {
      nativeError.value = err?.message || String(err)
      nativeReady.value = false
      console.error('[NativeHID] Startup error:', err)
    }
  }

  /**
   * Trigger the browser HID permission dialog to pair a new device.
   * This replaces the iframe bridge's pair() action.
   */
  async function pair() {
    try {
      if (!manager) {
        manager = new RawmDeviceManager()
        unsub = manager.on(onStateUpdate)
      }
      await manager.pair()
    } catch (err: any) {
      nativeError.value = err?.message || String(err)
      console.error('[NativeHID] Pair error:', err)
      throw err
    }
  }

  function disconnect() {
    unsub?.()
    unsub = null
    manager?.disconnect()
    manager = null
    devices.value = []
    currentDevice.value = null
    rawSettings.value = null
    nativeReady.value = false
  }

  async function applySettings() {
    if (!manager) throw new Error('Device manager not initialized')
    const state = manager.getState()
    syncMouseStoreToManagerState(state)
    await manager.applySettings()
  }

  async function factoryReset() {
    await manager?.factoryReset()
  }

  async function pairReceiver(addr: string, channel: number, isSlow: boolean) {
    await manager?.pairReceiver(addr, channel, isSlow)
  }

  async function unpairReceiver(addr: string) {
    await manager?.unpairReceiver(addr)
  }

  async function selectReceiver(addr: string) {
    await manager?.selectReceiver(addr)
  }

  async function setMouseKeyMapping(args: MouseKeyMapArgs) {
    await manager?.setMouseKeyMapping(args)
  }

  async function setMouseFunctionMapping(args: MouseFunctionMapArgs) {
    await manager?.setMouseFunctionMapping(args)
  }

  async function sendMacro(
    keyIds: number[],
    macroIndex: number,
    triggerType: number,
    actions: MacroAction[],
    macroName: string
  ) {
    await manager?.sendMacro(keyIds, macroIndex, triggerType, actions, macroName)
  }

  async function queryFirmwareInfo() {
    await manager?.queryFirmwareInfo()
  }

  async function enterDfuMode() {
    await manager?.enterDfuMode()
  }

  return {
    nativeReady,
    nativeError,
    devices,
    currentDevice,
    rawSettings,
    isMouse,
    isKeyboard,
    start,
    pair,
    disconnect,
    applySettings,
    factoryReset,
    pairReceiver,
    unpairReceiver,
    selectReceiver,
    setMouseKeyMapping,
    setMouseFunctionMapping,
    sendMacro,
    queryFirmwareInfo,
    enterDfuMode,
  }
}
