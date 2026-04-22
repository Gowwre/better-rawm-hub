import { ref, computed } from 'vue'
import {
  initBridge,
  selectDevice,
  getSettings,
  type BridgeDevice,
  type BridgeMouseSettings,
  type BridgeKeyboardSettings,
} from '@/utils/hidBridge'

const bridgeReady = ref(false)
const bridgeError = ref<string | null>(null)
const devices = ref<BridgeDevice[]>([])
const currentDevice = ref<BridgeDevice | null>(null)
const rawSettings = ref<BridgeMouseSettings | BridgeKeyboardSettings | null>(null)

const isMouse = computed(() => currentDevice.value?.type === 'mouse')
const isKeyboard = computed(() => currentDevice.value?.type === 'keyboard')

export function useBridgeSync() {
  function start() {
    initBridge({
      onReady: () => {
        bridgeReady.value = true
        bridgeError.value = null
      },
      onDevices: (devs, cur) => {
        devices.value = devs
        const prevId = currentDevice.value?.id
        currentDevice.value = cur
        // If device changed, fetch its settings
        if (cur && cur.id !== prevId) {
          selectDevice(cur.id).then(() => {
            setTimeout(() => getSettings(), 200)
          })
        }
      },
      onSettings: (_device, settings) => {
        rawSettings.value = settings
      },
      onError: (err) => {
        bridgeError.value = err?.msg || String(err)
      },
    })
  }

  function refreshSettings() {
    return getSettings()
  }

  return {
    bridgeReady,
    bridgeError,
    devices,
    currentDevice,
    rawSettings,
    isMouse,
    isKeyboard,
    start,
    refreshSettings,
  }
}
