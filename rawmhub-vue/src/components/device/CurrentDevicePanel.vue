<script setup lang="ts">
import { computed } from 'vue'
import { useDeviceStore } from '@/stores/device'
import { useUiStore } from '@/stores/ui'
import { useMouseSettingsStore } from '@/stores/mouseSettings'
import { useKeyboardSettingsStore } from '@/stores/keyboardSettings'

const deviceStore = useDeviceStore()
const uiStore = useUiStore()
const mouseStore = useMouseSettingsStore()
const kbdStore = useKeyboardSettingsStore()

const device = computed(() => deviceStore.currentDevice)

function getBatteryIcon(battery?: number): string {
  if (!battery) return ''
  if (battery > 80) return '🔋'
  if (battery > 40) return '🪫'
  return '⚠️'
}

function getRssiIcon(rssi?: number): string {
  if (!rssi) return ''
  if (rssi > 80) return '📶'
  if (rssi > 50) return '📡'
  return '⚠️'
}

function goToSettings() {
  if (device.value?.type === 'mouse') {
    mouseStore.resetToDefaults()
  } else {
    kbdStore.resetToDefaults()
  }
  uiStore.setPanel(device.value?.type === 'mouse' ? 'mouse' : 'keyboard')
}

function checkFirmwareUpdate() {
  if (device.value?.hasNewFirmware) {
    alert('New firmware version available!')
  }
}
</script>

<template>
  <div
    v-if="device"
    :id="device.type === 'mouse' ? 'current-usb-client-panel' : 'kbd-current-usb-client-panel'"
    class="current-device-panel"
    :class="device.type === 'keyboard' ? 'keyboard-panel' : ''"
  >
    <div class="device-header">
      <p class="device-name">{{ device.name }}</p>
      <p class="device-model">{{ device.model }}</p>
      <div class="device-icons">
        <span v-if="device.rssi" class="rssi-icon">{{ getRssiIcon(device.rssi) }}</span>
        <span v-if="device.battery" class="battery-icon">{{ getBatteryIcon(device.battery) }}</span>
        <span v-if="device.battery" class="battery-text">{{ device.battery }}%</span>
      </div>
    </div>

    <div class="device-image-container">
      <img
        :src="device.imageUrl || 'https://hub.miracletek.net/hub/img/rawm_hub.png'"
        class="device-image"
        @click="goToSettings"
        alt="Device"
      />
      <div class="firmware-info">
        <p class="firmware-version">{{ device.firmwareVersion }}</p>
        <p
          v-if="device.hasNewFirmware"
          class="firmware-new"
          @click="checkFirmwareUpdate"
        >
          {{ $t('STRID_HOME_NEW_VER_AVAIL') }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.current-device-panel {
  width: 419px;
  height: 504px;
  margin: 0 auto;
  margin-top: 5%;
  position: relative;
}

.keyboard-panel {
  width: 626px;
}

.device-header {
  position: absolute;
  left: 40px;
  top: 40px;
}

.device-name {
  font-size: 24px;
  font-weight: bold;
}

.device-model {
  font-size: 15px;
  color: #888;
  margin-top: 5px;
}

.device-icons {
  position: absolute;
  right: -200px;
  top: 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.rssi-icon, .battery-icon {
  font-size: 20px;
}

.battery-text {
  font-size: 15px;
  text-align: center;
  width: 47px;
}

.device-image-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.device-image {
  max-width: 300px;
  cursor: pointer;
  transition: transform 0.2s;
}

.device-image:hover {
  transform: scale(1.05);
}

.firmware-info {
  margin-top: 20px;
  text-align: center;
}

.firmware-version {
  font-size: 14px;
  color: #888;
}

.firmware-new {
  font-size: 14px;
  cursor: pointer;
  color: #16B777;
  margin-top: 5px;
}

.firmware-new:hover {
  text-decoration: underline;
}
</style>
