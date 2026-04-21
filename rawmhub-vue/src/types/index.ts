export interface UsbDevice {
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
}

export interface DpiLevel {
  id: number
  x: number
  y: number
  color: string
}

export interface PollingRate {
  value: number
  label: string
}

export interface LightMode {
  value: number
  label: string
}

export interface MappingKey {
  key: string
  desc: string
  type: 'key' | 'macro' | 'function' | 'none'
  ctrlKey1?: string
  ctrlKey2?: string
  mappedKey?: string
  wheelDelta?: number
  turbo?: {
    enabled: boolean
    freq: number
    rand: number
    downKeep: number
    upKeep: number
  }
}

export interface MacroAction {
  type: 'keydown' | 'keyup' | 'wheel' | 'move' | 'position' | 'delay'
  key?: string
  delta?: number
  x?: number
  y?: number
  loop?: number
  delay?: number
}

export interface Macro {
  id: number
  name: string
  triggerType: 'press' | 'toggle' | 'hold'
  triggerKey?: string
  stopKey?: string
  actions: MacroAction[]
}

export interface FunctionMapping {
  type: 'dpi' | 'esb' | 'ble' | 'showPower' | 'shellCmd'
  dpi?: number
  esbAddr?: string
  bleAddr?: string
  shellCmdType?: 'app' | 'web'
  shellCmd?: string
}

export interface MouseSettings {
  dpiLevels: DpiLevel[]
  currentDpiIndex: number
  dpiBothXY: boolean
  pollingRates: PollingRate[]
  currentPollingRate: number
  xPolling: boolean
  xPollingValue: number
  lightMode: number
  lightAutoOff: boolean
  brightness: number
  lightColors: string[]
  lightDefineColors: string[]
  powerModes: { value: number; label: string }[]
  currentPowerMode: number
  glassMode: boolean
  lods: { value: number; label: string }[]
  currentLod: number
  angleSnapping: boolean
  rippleControl: boolean
  motionSync: boolean
  wirelessTurbo: boolean
  rfChannels: { value: number; label: string }[]
  currentRfChannel: number
  powerSaving: boolean
  sleepTime: number
  angleTuning: number
  keyDelay: {
    enabled: boolean
    selectKey: string
    downDelay: number
    upDelay: number
  }
  onboardConfig: number
  combinationKey: string
  mappingKeys: Record<string, MappingKey>
  macros: Macro[]
}

export interface KeyboardLightSetting {
  mode: string
  sleepTime: number
  brightness: number
  speed: number
  colors: Record<string, string>
}

export interface KeyboardAxisSetting {
  type: string
  distanceMode?: 'normal' | 'fury'
  triggerPoint: number
  quickTriggerMode: boolean
  pressDistance: number
  releaseDistance: number
  deadDistance: number
}

export interface KeyboardSettings {
  mappingKeys: Record<string, string>
  keyLayer: 'default' | 'fn'
  light: KeyboardLightSetting
  lightBox: {
    mode: string
    colored: boolean
    brightness: number
    speed: number
    color: string
  }
  axis: KeyboardAxisSetting
  socd: {
    key1: string
    key2: string
    type: number
  }
  mt: {
    key: string
    longPressKey: string
    longPressTime: number
  }
  rs: {
    key1: string
    key2: string
  }
  dks: {
    keys: { key: string; actions: string[] }[]
  }
  firmwareVersion: string
  hasNewFirmware: boolean
}

export interface AppState {
  language: string
  darkTheme: boolean
  currentDevice: UsbDevice | null
  devices: UsbDevice[]
  activePanel: 'pair' | 'connect' | 'device' | 'mouse' | 'keyboard' | 'not-support'
  mouseSettings: MouseSettings
  keyboardSettings: KeyboardSettings
  activeKbdTab: number
  activeMappingType: number
  showBackButton: boolean
  showPairMore: boolean
  showDownload: boolean
  showUsbChannel: boolean
  fwChannel: number
}
