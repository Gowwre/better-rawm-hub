/**
 * RAWM Protocol Constants
 *
 * Extracted from library.formatted.js (library.min.js deobfuscated).
 * All IQ commands, CMD commands, CONFIG types, NOTIFY types, PACKET constants,
 * and device-specific constants used by RAWM gaming mice and keyboards.
 */

// =============================================================================
// IQ Commands (Keyboard Query/Response)
// =============================================================================

export const IQ_GET_PROTOCOL = 0x01
export const IQ_GET_KB_INFO = 0x02
export const IQ_SET_KB_INFO = 0x03
export const IQ_GET_KEYCODE = 0x04
export const IQ_SET_KEYCODE = 0x05
export const IQ_RESET_KEYCODE = 0x06
export const IQ_SET_CUSTOM = 0x07
export const IQ_GET_CUSTOM = 0x08
export const IQ_SAVE_DATA = 0x09
export const IQ_RECOVER = 0x0a
export const IQ_INTO_BOOT = 0x0b
export const IQ_GET_MACRO_NUM = 0x0c
export const IQ_GET_MACRO_SIZE = 0x0d
export const IQ_GET_MACRO_DATA_BUF = 0x0e
export const IQ_SET_MACRO_DATA_BUF = 0x0f
export const IQ_RESET_MACRO = 0x10
export const IQ_GET_LAYER_NUM = 0x11
export const IQ_GET_KEYCODE_BUF = 0x12
export const IQ_SET_KEYCODE_BUF = 0x13
export const IQ_GET_IS_MAG_KB = 0x16
export const IQ_GET_KEY_CFG_BUF = 0x17
export const IQ_GET_MAG_APC = 0x18
export const IQ_SET_MAG_DATA = 0x19
export const IQ_GET_MAG_DATA = 0x1a
export const IQ_GET_MAG_ADC_BUF = 0x1b
export const IQ_GET_MAG_SOCD_NUM = 0x1e
export const IQ_SET_MAG_SOCD_NUM = 0x1f
export const IQ_GET_MAG_SOCD_DATA = 0x20
export const IQ_SET_MAG_SOCD_DATA = 0x21
export const IQ_GET_MAG_MT_NUM = 0x22
export const IQ_SET_MAG_MT_NUM = 0x23
export const IQ_GET_MAG_MT_DATA = 0x24
export const IQ_SET_MAG_MT_DATA = 0x25
export const IQ_GET_MAG_TGL_NUM = 0x26
export const IQ_GET_MAG_TGL_DATA = 0x27
export const IQ_SET_MAG_TGL_DATA = 0x28
export const IQ_GET_MAG_DEV_INFO = 0x29
export const IQ_GET_MAG_DKS_NUM = 0x2a
export const IQ_SET_MAG_DKS_NUM = 0x2b
export const IQ_GET_MAG_DKS_DATA = 0x2c
export const IQ_SET_MAG_DKS_DATA = 0x2d
export const IQ_GET_MAG_RS_NUM = 0x2e
export const IQ_SET_MAG_RS_NUM = 0x2f
export const IQ_GET_MAG_RS_DATA = 0x30
export const IQ_SET_MAG_RS_DATA = 0x31
export const IQ_GET_RGB_COLOR_BUF = 0x36
export const IQ_SET_RGB_COLOR = 0x37
export const IQ_GET_RGB_COLOR = 0x38
export const IQ_GET_PROFILE_ID = 0x39
export const IQ_SET_PROFILE_ID = 0x40
export const IQ_BUFFER_DATA_SAVE = 0x41
export const IQ_GET_RT_BOOST_MODE = 0x45
export const IQ_SET_RT_BOOST_MODE = 0x46
export const IQ_GET_SN1 = 0x47
export const IQ_SET_SN1 = 0x48
export const IQ_GET_SN2 = 0x49
export const IQ_SET_SN2 = 0x4a
export const IQ_GET_SN3 = 0x4b
export const IQ_SET_SN3 = 0x4c
export const IQ_GET_TOP_ADC = 0x4d
export const IQ_GET_BOTTOM_ADC = 0x4e
export const IQ_GET_BOX_RGB_COLOR = 0x50
export const IQ_SET_BOX_RGB_COLOR = 0x51
export const IQ_GET_RGB_COLOR_SLEEP_TIME = 0x52
export const IQ_SET_RGB_COLOR_SLEEP_TIME = 0x53
export const IQ_GET_SOFT_DRV_VER = 0xf5
export const IQ_GET_KB_TEST = 0xc0
export const IQ_SET_KB_TEST = 0xc1

// =============================================================================
// CMD Commands (Mouse/Generic Packet Commands)
// =============================================================================

export const CMD_QUERY = 0x01
export const CMD_QUERY_RESULT = 0x02
export const CMD_CONFIG = 0x03
export const CMD_TOUCH = 0x04
export const CMD_FINGER = 0x05
export const CMD_ACTION = 0x06
export const CMD_SYNC = 0x07
export const CMD_MOUSE_TOUCH = 0x08
export const CMD_JOY_STICK_TOUCH = 0x09
export const CMD_ALT_MOUSE_TOUCH = 0x0a
export const CMD_NOTIFY = 0x0b
export const CMD_RAW_DATA = 0x0c
export const CMD_LOG = 0x0d
export const CMD_PING = 0x0e
export const CMD_MAX = 0x0f

// =============================================================================
// CONFIG Types (Payload type identifiers inside CMD_CONFIG / CMD_RAW_DATA)
// =============================================================================

export const CONFIG_TYPE_TOUCH = 0x00
export const CONFIG_TYPE_ACTION = 0x01
export const CONFIG_TYPE_GENERAL = 0x02
export const CONFIG_TYPE_RESET = 0x03
export const CONFIG_TYPE_SWIPE = 0x04
export const CONFIG_TYPE_MACRO = 0x05
export const CONFIG_TYPE_JOY_STICK = 0x06
export const CONFIG_TYPE_MOUSE = 0x07
export const CONFIG_TYPE_WHEEL = 0x08
export const CONFIG_TYPE_DETECT = 0x09
export const CONFIG_TYPE_ADJUST = 0x0a
export const CONFIG_TYPE_MOUSE_LINK = 0x0b
export const CONFIG_TYPE_NAV_BY_MOUSE = 0x0c
export const CONFIG_TYPE_CALL_MOUSE_POS = 0x0d
export const CONFIG_TYPE_MOUSE_TARGETED = 0x0e
export const CONFIG_TYPE_MOUSE_FOLLOWED = 0x0f
export const CONFIG_TYPE_RELOCK_MOUSE = 0x10
export const CONFIG_TYPE_FAN = 0x11
export const CONFIG_TYPE_LIGHT = 0x12
export const CONFIG_TYPE_CRYOGEN = 0x13
export const CONFIG_TYPE_MOUSE_QUICK_DROP = 0x14
export const CONFIG_TYPE_MOUSE_PARAM = 0x15
export const CONFIG_TYPE_MOUSE_KEY = 0x16
export const CONFIG_TYPE_MOUSE_ASSIST = 0x17
export const CONFIG_TYPE_MOUSE_FUNCTION = 0x18
export const CONFIG_TYPE_MASSAGE_MODE = 0x19
export const CONFIG_TYPE_MASSAGE_STRENGTH = 0x1a
export const CONFIG_TYPE_MASSAGE_TIME = 0x1b
export const CONFIG_TYPE_SET_ESB_ADDR = 0x1c
export const CONFIG_TYPE_CLEAR_ESB_ADDR = 0x1d
export const CONFIG_TYPE_SELECT_ESB_ADDR = 0x1e
export const CONFIG_TYPE_SET_COLOR_CODE = 0x1f
export const CONFIG_TYPE_COMPRESSED = 0x20
export const CONFIG_TYPE_SET_SLEEP_TIME = 0x21
export const CONFIG_TYPE_LUA = 0x22
export const CONFIG_TYPE_SET_RF_CHN = 0x23
export const CONFIG_TYPE_CRC = 0x24
export const CONFIG_TYPE_SET_NOACK = 0x25
export const CONFIG_TYPE_SN = 0x26
export const CONFIG_TYPE_GAMING_ONLY = 0x27
export const CONFIG_TYPE_MACRO_APPEND = 0x2b
export const CONFIG_TYPE_SET_BRIGHTNESS = 0x31
export const CONFIG_TYPE_SET_AUTO_HOP = 0x32

// =============================================================================
// NOTIFY Types (Device-to-Host async notifications)
// =============================================================================

export const NOTIFY_TYPE_MOUSE_CPI = 0x00
export const NOTIFY_TYPE_MOUSE_POLLING = 0x01
export const NOTIFY_TYPE_MOUSE_LIGHT = 0x02
export const NOTIFY_TYPE_MOUSE_ASSIST = 0x03
export const NOTIFY_TYPE_MOUSE_ONBOARD = 0x04
export const NOTIFY_TYPE_MOUSE_POWER_MODE = 0x05
export const NOTIFY_TYPE_MOUSE_CPI2 = 0x06
export const NOTIFY_TYPE_MOUSE_LOD = 0x07
export const NOTIFY_TYPE_MOUSE_KEY_DELAY = 0x08
export const NOTIFY_TYPE_MOUSE_CPI_LEVEL2 = 0x09
export const NOTIFY_TYPE_MOUSE_LOD_CALIB_STATUS = 0x0a
export const NOTIFY_TYPE_MOUSE_LOD_CALIB = 0x0b
export const NOTIFY_TYPE_MOUSE_ESB_ADDR = 0x0c
export const NOTIFY_TYPE_MOUSE_MOTION_SYNC = 0x0d
export const NOTIFY_TYPE_MOUSE_ANGLE_TUNING = 0x0e
export const NOTIFY_TYPE_MOUSE_ANGLE_SNAPPING = 0x0f
export const NOTIFY_TYPE_MOUSE_RIPPLE_CONTROL = 0x10
export const NOTIFY_TYPE_MOUSE_CPI_LEVEL_COLOR = 0x11
export const NOTIFY_TYPE_MOUSE_TX_POWER = 0x12
export const NOTIFY_TYPE_MOUSE_TEST_2_4G_DONE = 0x13
export const NOTIFY_TYPE_MOUSE_CONFIG = 0x14
export const NOTIFY_TYPE_MOUSE_PEER = 0x15
export const NOTIFY_TYPE_MOUSE_BATTERY_LEVELS = 0x16
export const NOTIFY_TYPE_MOUSE_BATTERY = 0x17
export const NOTIFY_TYPE_MOUSE_AUTO_TX_POWER = 0x18
export const NOTIFY_TYPE_MOUSE_COLOR_CODE = 0x19
export const NOTIFY_TYPE_MOUSE_SLEEP_TIME = 0x1a
export const NOTIFY_TYPE_MOUSE_RF_CHN = 0x1b
export const NOTIFY_TYPE_MOUSE_RSSI = 0x1c
export const NOTIFY_TYPE_MOUSE_LUA_STATUS = 0x1d
export const NOTIFY_TYPE_MOUSE_SHELL_CMD = 0x1e
export const NOTIFY_TYPE_MOUSE_DATA_ERR = 0x1f
export const NOTIFY_TYPE_MOUSE_NOACK = 0x20
export const NOTIFY_TYPE_MOUSE_GLASS_MODE = 0x21
export const NOTIFY_TYPE_MOUSE_ONBOARD_INDEX = 0x22
export const NOTIFY_TYPE_MOUSE_ONBOARD_STATUS = 0x23

// =============================================================================
// PACKET Constants (HID report framing)
// =============================================================================

export const MAXIMUM_PACKET_SIZE = 0x40 // 64 bytes
export const HS_MAXIMUM_PACKET_SIZE = 0x20 // 32 bytes (keyboard feature reports)
export const NRF_ESB_MAX_PAYLOAD_LENGTH = 0x20 // 32 bytes
export const PACKET_SIZE_MASK = 0x3f
export const PACKET_TYPE_MASK = 0xc0
export const PACKET_CHANNEL_MASK = 0x3f
export const PACKET_TYPE_RAW_DATA = 0x00
export const PACKET_TYPE_BUFFER_SIZE = 0x40
export const PACKET_TYPE_EVENT_DATA = 0x80
export const PACKET_TYPE_EXTENDED = 0xc0

// =============================================================================
// ESB (Wireless 2.4 GHz) Constants
// =============================================================================

export const ESB_ALIVE_TIMEOUT_MS = 0xbb8 // 3000 ms
export const ESB_CHANNEL_INVALID = 0xff
export const ESB_CHANNEL_MOUSE = 0x00
export const ESB_CHANNEL_NUM = 0x01

// =============================================================================
// Sync / Timing
// =============================================================================

export const SYNC_TIMEOUT_MS = 0x3e8 // 1000 ms
export const SYNC_BY_CMD_SYNC = false

// =============================================================================
// Macro Engine Constants
// =============================================================================

export const MACRO_ACTION_MAX_NUM = 0xc8 // 200
export const MACRO_ACTION_LIMIT_MEM_MAX_NUM = 0x20 // 32
export const MACRO_ACTION_SEG_SIZE = 0x38 // 56
export const MACRO_ACTION_LIMIT_MEM_SEG_SIZE = 0x05 // 5

export const MOUSE_KEY_EVENT_NONE = 0x000
export const MOUSE_KEY_EVENT_KEY_DOWN = 0x100
export const MOUSE_KEY_EVENT_KEY_UP = 0x101
export const MOUSE_KEY_EVENT_MOUSE_MOVE = 0x200
export const MOUSE_KEY_EVENT_MOUSE_WHEEL = 0x20a
export const MOUSE_KEY_EVENT_MOUSE_HWHEEL = 0x20e
export const MOUSE_KEY_EVENT_MOUSE_POSITION = 0x2ff

// =============================================================================
// Windows Message Constants (Macro event encoding)
// =============================================================================

export const WM_KEYDOWN = 0x100
export const WM_KEYUP = 0x101
export const WM_MOUSEMOVE = 0x200
export const WM_MOUSEWHEEL = 0x20a
export const WM_MOUSEHWHEEL = 0x20e
export const WM_MOUSEPOSITION = 0x2ff

// =============================================================================
// Keyboard Setting Types
// =============================================================================

export const KBD_MAIN_SETTING_TYPE_KEY = 0x00
export const KBD_MAIN_SETTING_TYPE_LIGHT = 0x01
export const KBD_MAIN_SETTING_TYPE_AXIS = 0x02
export const KBD_MAIN_SETTING_TYPE_ADVANCE_KEY = 0x03
export const KBD_MAIN_SETTING_TYPE_MORE = 0x04

export const KBD_SETTING_TYPE_KEY_BASE = 0x00
export const KBD_SETTING_TYPE_KEY_FUNCTION = 0x01
export const KBD_SETTING_TYPE_KEY_MACRO = 0x02

export const KBD_SETTING_TYPE_LIGHT_KEY = 0x00
export const KBD_SETTING_TYPE_LIGHT_BOX = 0x01

export const KBD_SETTING_TYPE_SOCD = 0x00
export const KBD_SETTING_TYPE_MT = 0x01
export const KBD_SETTING_TYPE_RS = 0x02
export const KBD_SETTING_TYPE_DKS = 0x03

// =============================================================================
// Key Modifier Masks
// =============================================================================

export const KEY_MOD_LCTRL = 0x01
export const KEY_MOD_LSHIFT = 0x02
export const KEY_MOD_LALT = 0x04
export const KEY_MOD_LMETA = 0x08
export const KEY_MOD_RCTRL = 0x10
export const KEY_MOD_RSHIFT = 0x20
export const KEY_MOD_RALT = 0x40
export const KEY_MOD_RMETA = 0x80

export const KEY_LOCK_SCROLL = 0x01
export const KEY_LOCK_CAPS = 0x02
export const KEY_LOCK_NUM = 0x04

export const KEY_TYPE_ALL = 0x00
export const KEY_TYPE_MOUSE = 0x01
export const KEY_TYPE_KBD = 0x02
export const KEY_TYPE_MEDIA = 0x03

// =============================================================================
// RAWM Vendor / Product IDs
// =============================================================================

export const RAWM_VENDOR_ID = 0x3554 // 0x1915 is also used in some firmware paths
export const RAWM_VENDOR_ID_ALT = 0x1915

export const RAWM_KNIFE_PRODUCT_ID = 0x2328
export const RAWM_SA_ML01_PRODUCT_ID = 0x2329
export const RAWM_RECEIVER_PRODUCT_ID = 0x232a
export const RAWM_RECEIVER_8K_PRODUCT_ID = 0x232b
export const RAWM_SA_MH01_PRODUCT_ID = 0x232c
export const RAWM_SA_SL01_PRODUCT_ID = 0x232d
export const RAWM_SA_SH01_PRODUCT_ID = 0x232e
export const RAWM_GS_SH01_PRODUCT_ID = 0x232f
export const RAWM_GS_SH01Pro_PRODUCT_ID = 0x2330
export const RAWM_SA_MH01Pro_PRODUCT_ID = 0x2331
export const RAWM_SA_SH01Pro_PRODUCT_ID = 0x2332
export const RAWM_ES21Pro_PRODUCT_ID = 0x2334
export const RAWM_RECEIVER_8Kn_PRODUCT_ID = 0x2335
export const RAWM_DH8_PRODUCT_ID = 0x2336
export const RAWM_ES21M_PRODUCT_ID = 0x2337
export const RAWM_ER21Pro_PRODUCT_ID = 0x2338
export const RAWM_ER21M_PRODUCT_ID = 0x2339

// =============================================================================
// Action Constants (Internal UI postMessage bus — kept for bridge parity)
// =============================================================================

export const ACTION_NONE = 0x00
export const ACTION_TOGGLE_OSD = 0x02
export const ACTION_QUICK_SETTING = 0x03
export const ACTION_SWITCH_WEAPON = 0x04
export const ACTION_EXTEND_VISION_ON = 0x05
export const ACTION_EXTEND_VISION_OFF = 0x06
export const ACTION_LOCK_VISION_ON = 0x07
export const ACTION_LOCK_VISION_OFF = 0x08
export const ACTION_ASSIST2_ON = 0x09
export const ACTION_ASSIST2_OFF = 0x0a
export const ACTION_TOGGLE_MOUSE = 0x0b
export const ACTION_ZOOM_ON = 0x0c
export const ACTION_ZOOM_OFF = 0x0d
export const ACTION_INCREASE_INTENSITY = 0x0e
export const ACTION_DECREASE_INTENSITY = 0x0f
export const ACTION_RELOCK_MOUSE = 0x10
export const ACTION_REPUSH_JOY_STICK = 0x11
export const ACTION_CHOOSE_SIGHT = 0x12
export const ACTION_GENERAL_SETTING = 0x13
export const ACTION_TOGGLE_DRIVER_MODE = 0x14
export const ACTION_LOCK_DRIVER_MODE = 0x15
export const ACTION_UNLOCK_DRIVER_MODE = 0x16
export const ACTION_LOOPBACK_KEY = 0x17
export const ACTION_TOGGLE_EXTEND_VISION = 0x18
export const ACTION_TOGGLE_LOCK_VISION = 0x19
export const ACTION_CALL_MOUSE = 0x1a
export const ACTION_MIN_SIGHT = 0x1b
export const ACTION_MAX_SIGHT = 0x1c
export const ACTION_MOUSE_SENSITIVITY2_ON = 0x1d
export const ACTION_MOUSE_SENSITIVITY2_OFF = 0x1e
export const ACTION_MOUSE_FOLLOWED_SWITCH_ON = 0x1f
export const ACTION_MOUSE_FOLLOWED_SWITCH_OFF = 0x20
export const ACTION_SHOW_MOUSE = 0x21
export const ACTION_HIDE_MOUSE = 0x22
export const ACTION_SWITCH_JOY_STICK = 0x23
export const ACTION_MOBA_CANCEL = 0x24
export const ACTION_STOP_NAVIGATE_BY_MOUSE = 0x25
export const ACTION_FIX_WEAPON = 0x26
export const ACTION_TOGGLE_AUTO_CLICK = 0x27
export const ACTION_SIGHT_AUTO_ON = 0x28
export const ACTION_TOGGLE_SIMULATOR = 0x29
export const ACTION_CANCEL_MOUSE_VISION = 0x2a
export const ACTION_SWITCH_CONNECTION = 0x2b
export const ACTION_ADD_DFU = 0x2c
export const ACTION_SIMULATOR_KEY_DOWN = 0x2d
export const ACTION_TOGGLE_DEFAULT_CFG = 0x2e
export const ACTION_SIMULATOR_KEY_UP = 0x2f
export const ACTION_FIX_SIGHT_STATUS = 0x30
export const ACTION_KEY_EVENT_DOWN = 0x31
export const ACTION_KEY_EVENT_UP = 0x32
export const ACTION_REBOOT = 0x33
export const ACTION_SAVE_CONFIG_TO_FDS = 0x34
export const ACTION_RESTORE = 0x35
export const ACTION_PERFORM_FUNCTION = 0x36
export const ACTION_SET_TEMPORARY_CPI = 0x37
export const ACTION_STOP_MOUSE_ASSIST = 0x38
export const ACTION_MOUSE_AUTO_MOVE = 0x39
export const ACTION_CONFIG_SHORTCUT = 0x3a
export const ACTION_USE_MEDICINE = 0x3b
export const ACTION_INCREASE_INTENSITY2 = 0x3c
export const ACTION_DECREASE_INTENSITY2 = 0x3d
export const ACTION_CALIB_LOD = 0x3e
export const ACTION_SHUTDOWN_GOTO_DFU = 0x3f
export const ACTION_TEST_2_4G = 0x40
export const ACTION_SET_MOUSE_NO_MOVE_TIME = 0x41
export const ACTION_READ_RSSI = 0x42
export const ACTION_MODIFIER_LOCK_KEY_STATUS = 0x43
export const ACTION_MOUSE_POSITION = 0x44
export const ACTION_KEY_STATUS = 0x45
export const ACTION_REFRESH_CLIENT_LIST = 0x46
export const ACTION_REFRESH_CURRENT_CLIENT = 0x47
export const ACTION_UI_REFRESH_CLIENT_LIST = 0x48
export const ACTION_UI_REFRESH_CURRENT_CLIENT = 0x49
export const ACTION_UI_REFRESH_CURRENT_CLIENT_RSSI = 0x4a
export const ACTION_UI_REFRESH_SETTING = 0x4b
export const ACTION_UI_REFRESH_QUAL = 0x4c
export const ACTION_UI_REFRESH_KBD_KEY = 0x4d
export const ACTION_UI_REFRESH_KBD_LIGHT = 0x4e
export const ACTION_UI_REFRESH_KBD_AXIS = 0x4f
export const ACTION_UI_REFRESH_KBD_MACRO = 0x50
export const ACTION_UI_REFRESH_KBD_ADVANCE_KEY = 0x51
export const ACTION_UI_REFRESH_KBD_ONBOARD = 0x52
export const ACTION_SEND_CLIENT_DATA = 0x53
export const ACTION_ONBOARD_CFG = 0x54

// =============================================================================
// Config Flags
// =============================================================================

export const CONFIG_FLAG_NOT_OVERRIDE = 0x01
export const CONFIG_FLAG_MACRO_BY_AUTO_CLICK = 0x02
export const CONFIG_FLAG_MACRO_IGNORE_OTHER = 0x04
export const CONFIG_FLAG_MULTI_KEY_MODE_COMPOUND = 0x08

// =============================================================================
// VK / Key Code Constants
// =============================================================================

export const VK_NONE = 0x00
export const VK_CODE_MAX = 0xff
export const VK_CODE_MOUSE_START = VK_CODE_MAX
export const VK_CODE_MEDIA_START = 0x200
export const VK_CODE_MOUSEWHEEL_UP = 0x400
export const VK_CODE_MOUSEWHEEL_DOWN = 0x401
export const VK_CODE_MOUSEWHEEL_LEFT = 0x402
export const VK_CODE_MOUSEWHEEL_RIGHT = 0x403
export const VK_CODE_MOUSE_MOVE = 0x404
export const VK_CODE_MOUSE_POSITION = 0x405
export const VK_NUM_RETURN = 0x0e

export const VK_SHIFT = 0x10
export const VK_CONTROL = 0x11
export const VK_MENU = 0x12
export const VK_LSHIFT = 0xa0
export const VK_LCONTROL = 0xa2
export const VK_LMENU = 0xa4

// =============================================================================
// Scan Code Boundaries
// =============================================================================

export const SCAN_CODE_MAX = 0xff
export const SCAN_CODE_MOUSE_START = SCAN_CODE_MAX
export const SCAN_CODE_MEDIA_START = 0x200
export const SCAN_CODE_MOUSEWHEEL_UP = 0x400
export const SCAN_CODE_MOUSEWHEEL_DOWN = 0x401
export const SCAN_CODE_MOUSEWHEEL_LEFT = 0x402
export const SCAN_CODE_MOUSEWHEEL_RIGHT = 0x403
export const SCAN_CODE_MOUSE_MOVE = 0x404
export const SCAN_CODE_MOUSE_POSITION = 0x405

// =============================================================================
// Mouse Key Types (firmware encoding for CONFIG_TYPE_MOUSE_KEY)
// =============================================================================

export const MOUSE_KEY_TYPE_KBD = 0x00
export const MOUSE_KEY_TYPE_MKEY = 0x01
export const MOUSE_KEY_TYPE_MOVE = 0x02
export const MOUSE_KEY_TYPE_WHEEL = 0x03
export const MOUSE_KEY_TYPE_MEDIA = 0x04
export const MOUSE_KEY_TYPE_AC_PAN = 0x05
export const MOUSE_KEY_TYPE_POSITION = 0x06

export const MOUSE_KEY_WHEEL_UP = 0x07
export const MOUSE_KEY_WHEEL_DOWN = 0x08

// =============================================================================
// Touch Event Types
// =============================================================================

export const TOUCH_EVENT_DOWN = 0x00
export const TOUCH_EVENT_MOVE = 0x01
export const TOUCH_EVENT_UP = 0x02
export const TOUCH_EVENT_CLICK = 0x03
export const TOUCH_EVENT_CANCEL = 0x04
export const TOUCH_EVENT_POSITION = 0x05

export const TOUCH_TYPE_NORMAL = 0x00
export const TOUCH_TYPE_REPEAT = 0x01
export const TOUCH_TYPE_PRESS = 0x02
export const TOUCH_TYPE_RELEASE = 0x03
export const TOUCH_TYPE_DOUBLE = 0x04
export const TOUCH_TYPE_CLICK = 0x05
export const TOUCH_TYPE_DOUBLE_CLICK = 0x06
export const TOUCH_TYPE_LINK = 0x07

// =============================================================================
// Property Styles (internal UI type mapping)
// =============================================================================

export const PROPERTY_STYLE_MOUSE_KEY = 0x1b
export const PROPERTY_STYLE_MOUSE_ASSIST = 0x1c
export const PROPERTY_STYLE_MOUSE_FUNCTION = 0x1d
