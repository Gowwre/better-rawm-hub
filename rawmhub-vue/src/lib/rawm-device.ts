/**
 * RAWM Device State Types
 *
 * TypeScript interfaces matching the structure returned by create_device_info()
 * in the original library. These describe the complete mutable state of a
 * connected RAWM mouse or keyboard.
 */

// =============================================================================
// Core Settings
// =============================================================================

export interface CpiSetting {
  value: number
  x: number
  y: number
  xy_supported: boolean
}

export interface CpiLevel {
  value: number
}

export interface LightSetting {
  mode: number
  brightness: number
  hue: number
  saturation: number
  auto_off: boolean
  define_colors: number[]
}

export interface LightBoxSetting {
  mode: number
  colored: boolean
  brightness: number
  speed: number
  color: number
}

export interface PowerModeSetting {
  mode: number
  tips: string
}

export interface KeyDelaySetting {
  down_delay: number
  up_delay: number
}

export interface EsbAddress {
  addr: string
  channel: number
}

// =============================================================================
// Keyboard Advanced Keys
// =============================================================================

export interface MagAxisInfo {
  row: number
  col: number
  rt_enable: number
  top_dz: number
  apc_lv: number
  rt_press_lv: number
  rt_release_lv: number
  btm_dz: number
  switch_type: number
}

export interface SocdInfo {
  row1: number
  col1: number
  row2: number
  col2: number
  mode: number
}

export interface MtInfo {
  row: number
  col: number
  tap_time: number
  key_code1: number
  key_code2: number
}

export interface RsInfo {
  row1: number
  col1: number
  row2: number
  col2: number
}

export interface DksInfo {
  row: number
  col: number
  key_code1: number
  state1: number
  key_code2: number
  state2: number
  key_code3: number
  state3: number
  key_code4: number
  state4: number
}

export interface KbdKeyInfo {
  type: number
  vCode: number
  name: string
  aCode: number
  aName: string
  sCode: number
  keyId: number
  row: number
  col: number
  rect: number[]
}

export interface KbdLightInfo {
  mode: number
  brightness: number
  speed: number
  hue: number
  saturation: number
  auto_off: boolean
  colors: number[]
}

export interface KbdMacroInfo {
  id: number
  name: string
  actions: MacroAction[]
}

export interface MacroAction {
  event: number // MOUSE_KEY_EVENT_*
  key_code: number
  delay: number
  mouse_x: number
  mouse_y: number
}

// =============================================================================
// Mouse Key Mapping
// =============================================================================

export interface MouseKeyMapping {
  key_id: string
  key_type: number
  v_code: number
  modifier: number
  macro_index: number
}

export interface MouseFunctionMapping {
  key_id: string
  function_type: number
  param: number
}

// =============================================================================
// Device State
// =============================================================================

export interface DeviceState {
  // Identity
  vendorId: number
  productId: number
  deviceName: string
  revision: string
  revisionCode: number
  hardwareCode: number
  softDrvVer: string
  connected: boolean

  // Mouse Sensor
  cpi: CpiSetting
  cpi_levels: CpiLevel[]
  cpi_level_colors: number[]
  polling_rate: number
  lod: number
  angle_snapping: boolean
  angle_tuning: number
  ripple_control: boolean
  motion_sync: boolean
  glass_mode: boolean
  glass_mode_enabled: boolean
  enhancedCpi: boolean
  dynamicGom: boolean

  // Wireless / Power
  power_mode: PowerModeSetting
  sleep_time: number
  auto_tx_power: boolean
  tx_output_power: number
  tx_output_power_applied: number
  esb_address: string
  esb_address_arr: EsbAddress[]
  esb_selected: number
  rf_channel: number
  hop_channel: number
  hop_channel_supported: boolean
  wirelessTurbo: number

  // Lighting
  light: LightSetting
  light_box: LightBoxSetting
  brightness: number
  colorCode: number
  color_codes: number[]

  // Keyboard
  kbd_key_infos: KbdKeyInfo[]
  kbd_light_info: KbdLightInfo
  kbd_axis_infos: MagAxisInfo[]
  kbd_axis_mode: number
  kbd_socd_infos: SocdInfo[]
  kbd_mt_infos: MtInfo[]
  kbd_rs_infos: RsInfo[]
  kbd_dks_infos: DksInfo[]
  kbd_macro_infos: KbdMacroInfo[][]
  kbd_macro_num: number
  kbd_macro_max_size: number

  // Onboard profiles
  onboardIndex: number
  onboardNum: number
  onboard_status: number[]
  onboard_status_colors: number[]
  key_delay: KeyDelaySetting

  // Meta
  battery: number
  rssi: number
  firmwareInfo: Record<string, any>
  sensor: string
  luaStatus: number
  noack: boolean
  squal: number
  shell_cmd: string
  color: string

  // ESB / Receiver
  isReceiver: boolean
  esb_last_alive_time: number
  esb_alive_timeout: number
  virtual_connected: boolean

  // Mouse mappings
  mouse_key_mappings: MouseKeyMapping[]
  mouse_function_mappings: MouseFunctionMapping[]
  macros: KbdMacroInfo[]
  macro_max_size: number
}

// =============================================================================
// Factory (creates a blank state object)
// =============================================================================

export function createDeviceState(): DeviceState {
  return {
    vendorId: 0,
    productId: 0,
    deviceName: '',
    revision: '',
    revisionCode: 0,
    hardwareCode: 0,
    softDrvVer: '',
    connected: false,

    cpi: { value: 800, x: 800, y: 800, xy_supported: false },
    cpi_levels: Array.from({ length: 8 }, () => ({ value: 0 })),
    cpi_level_colors: Array.from({ length: 8 }, () => 0),
    polling_rate: 1000,
    lod: 1,
    angle_snapping: false,
    angle_tuning: 0,
    ripple_control: false,
    motion_sync: false,
    glass_mode: false,
    glass_mode_enabled: false,
    enhancedCpi: false,
    dynamicGom: false,

    power_mode: { mode: 1, tips: '' },
    sleep_time: 300,
    auto_tx_power: false,
    tx_output_power: 0,
    tx_output_power_applied: 0,
    esb_address: '',
    esb_address_arr: [],
    esb_selected: 0,
    rf_channel: 0,
    hop_channel: 0,
    hop_channel_supported: false,
    wirelessTurbo: 0,

    light: {
      mode: 1,
      brightness: 80,
      hue: 0,
      saturation: 255,
      auto_off: false,
      define_colors: [0x16b777, 0x1e9fff, 0xfa584d],
    },
    light_box: {
      mode: 0,
      colored: false,
      brightness: 80,
      speed: 3,
      color: 0xff0000,
    },
    brightness: 80,
    colorCode: 0,
    color_codes: [],

    kbd_key_infos: [],
    kbd_light_info: {
      mode: 0,
      brightness: 80,
      speed: 3,
      hue: 0,
      saturation: 255,
      auto_off: false,
      colors: [],
    },
    kbd_axis_infos: [],
    kbd_axis_mode: 0,
    kbd_socd_infos: [],
    kbd_mt_infos: [],
    kbd_rs_infos: [],
    kbd_dks_infos: [],
    kbd_macro_infos: [],
    kbd_macro_num: 0,
    kbd_macro_max_size: 0,

    onboardIndex: 0,
    onboardNum: 4,
    onboard_status: [0, 0, 0, 0],
    onboard_status_colors: [0x16b777, 0x1e9fff, 0xfa584d, 0xffb800],
    key_delay: { down_delay: 0, up_delay: 0 },

    battery: 0,
    rssi: 0,
    firmwareInfo: {},
    sensor: '',
    luaStatus: 0,
    noack: false,
    squal: 0,
    shell_cmd: '',
    color: '',

    // ESB / Receiver
    isReceiver: false,
    esb_last_alive_time: 0,
    esb_alive_timeout: 3000,
    virtual_connected: false,

    mouse_key_mappings: [],
    mouse_function_mappings: [],
    macros: [],
    macro_max_size: 0,
  }
}

// =============================================================================
// Classification Helpers
// =============================================================================

export function isKeyboard(productName: string): boolean {
  return productName.includes('Z68') || productName.toLowerCase().includes('keyboard')
}

export function isKeyboard5x15(productName: string): boolean {
  return productName === 'Z68A'
}

export function isHsKeyboard(productName: string): boolean {
  return productName === 'Z68A' || productName === 'Z68B'
}

export function isGamingOnlyMode(revision: string): boolean {
  return revision.startsWith('G-')
}
