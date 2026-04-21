import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { UsbDevice } from '@/types'

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
  }
})
