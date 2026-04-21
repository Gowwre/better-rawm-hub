<script setup lang="ts">
import { useDeviceStore } from '@/stores/device'
import { useUiStore } from '@/stores/ui'

const deviceStore = useDeviceStore()
const uiStore = useUiStore()

function selectDevice(device: typeof deviceStore.devices[0]) {
  deviceStore.selectDevice(device)
  uiStore.setPanel('device')
}

function getBatteryIcon(battery?: number): string {
  if (!battery) return ''
  if (battery > 80) return '🔋'
  if (battery > 40) return '🪫'
  return '🪫'
}

function getRssiIcon(rssi?: number): string {
  if (!rssi) return ''
  if (rssi > 80) return '📶'
  if (rssi > 50) return '📶'
  return '📶'
}
</script>

<template>
  <div id="usb-client-list-panel" class="device-list-panel">
    <div id="usb-client-list" class="device-list">
      <div
        v-for="device in deviceStore.devices"
        :key="device.id"
        class="device-card"
        :class="{ active: deviceStore.currentDevice?.id === device.id }"
        @click="selectDevice(device)"
      >
        <div class="device-icon">
          {{ device.type === 'mouse' ? '🖱️' : '⌨️' }}
        </div>
        <p class="device-name">{{ device.name }}</p>
        <p class="device-model">{{ device.model }}</p>
        <div class="device-status" v-if="device.battery !== undefined">
          <span class="battery">
            {{ getBatteryIcon(device.battery) }} {{ device.battery }}%
          </span>
        </div>
        <div class="device-status" v-if="device.rssi !== undefined">
          <span class="rssi">
            {{ getRssiIcon(device.rssi) }} {{ device.rssi }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.device-list-panel {
  width: 100%;
  text-align: center;
  padding: 20px;
}

.device-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
}

.device-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 30px;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  border: 2px solid transparent;
  min-width: 150px;
}

.device-card:hover {
  background-color: rgba(255, 255, 255, 0.1);
  border-color: #1E9FFF;
}

.device-card.active {
  border-color: #16B777;
  background-color: rgba(22, 183, 119, 0.1);
}

.device-icon {
  font-size: 48px;
  margin-bottom: 10px;
}

.device-name {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
}

.device-model {
  font-size: 13px;
  color: #888;
  margin-bottom: 8px;
}

.device-status {
  display: flex;
  gap: 10px;
  font-size: 13px;
}

.battery, .rssi {
  display: flex;
  align-items: center;
  gap: 4px;
}
</style>
