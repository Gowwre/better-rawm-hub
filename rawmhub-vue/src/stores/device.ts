import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { UsbDevice } from '@/types'
import type { BridgeDevice } from '@/utils/hidBridge'
import { bridgeDeviceToUsbDevice } from '@/utils/hidBridge'

export const useDeviceStore = defineStore('device', () => {
  const devices = ref<UsbDevice[]>([])
  const currentDevice = ref<UsbDevice | null>(null)
  const isConnecting = ref(false)
  const isPairing = ref(false)

  const deviceType = computed(() => currentDevice.value?.type ?? null)
  const isMouse = computed(() => currentDevice.value?.type === 'mouse')
  const isKeyboard = computed(() => currentDevice.value?.type === 'keyboard')
  const batteryLevel = computed(() => currentDevice.value?.battery ?? null)
  const rssiLevel = computed(() => currentDevice.value?.rssi ?? null)

  function addDevice(device: UsbDevice) {
    const exists = devices.value.find((d: UsbDevice) => d.id === device.id)
    if (!exists) {
      devices.value.push(device)
    }
  }

  function removeDevice(id: string) {
    devices.value = devices.value.filter((d: UsbDevice) => d.id !== id)
    if (currentDevice.value?.id === id) {
      currentDevice.value = null
    }
  }

  function selectDevice(device: UsbDevice) {
    currentDevice.value = device
  }

  function updateBattery(id: string, battery: number) {
    const device = devices.value.find(d => d.id === id)
    if (device) {
      device.battery = battery
    }
    if (currentDevice.value?.id === id) {
      currentDevice.value.battery = battery
    }
  }

  function updateRssi(id: string, rssi: number) {
    const device = devices.value.find(d => d.id === id)
    if (device) {
      device.rssi = rssi
    }
    if (currentDevice.value?.id === id) {
      currentDevice.value.rssi = rssi
    }
  }

  function clearDevices() {
    devices.value = []
    currentDevice.value = null
  }

  function syncFromBridge(bridgeDevices: BridgeDevice[], bridgeCurrent: BridgeDevice | null) {
    // Receivers (dongles) are not user-selectable devices; skip them.
    const nonReceivers = bridgeDevices.filter(d => !d.isReceiver)
    const mapped = nonReceivers.map(bridgeDeviceToUsbDevice)

    // Remove devices that are no longer present
    const newIds = new Set(mapped.map(d => d.id))
    devices.value = devices.value.filter(d => newIds.has(d.id))

    // Add or update devices
    for (const device of mapped) {
      const idx = devices.value.findIndex(d => d.id === device.id)
      if (idx >= 0) {
        devices.value[idx] = { ...devices.value[idx], ...device }
      } else {
        devices.value.push(device)
      }
    }

    // Update current device (also skip if it's a receiver)
    if (bridgeCurrent && !bridgeCurrent.isReceiver) {
      const usbCurrent = bridgeDeviceToUsbDevice(bridgeCurrent)
      const idx = devices.value.findIndex(d => d.id === usbCurrent.id)
      if (idx >= 0) {
        devices.value[idx] = { ...devices.value[idx], ...usbCurrent }
      }
      currentDevice.value = devices.value[idx] ?? usbCurrent
      console.log('[deviceStore] currentDevice updated, imageUrl=', currentDevice.value?.imageUrl)
    } else if (devices.value.length > 0 && !currentDevice.value) {
      currentDevice.value = devices.value[0]
      console.log('[deviceStore] currentDevice fallback, imageUrl=', currentDevice.value?.imageUrl)
    }
  }

  return {
    devices,
    currentDevice,
    isConnecting,
    isPairing,
    deviceType,
    isMouse,
    isKeyboard,
    batteryLevel,
    rssiLevel,
    addDevice,
    removeDevice,
    selectDevice,
    updateBattery,
    updateRssi,
    clearDevices,
    syncFromBridge,
  }
})
