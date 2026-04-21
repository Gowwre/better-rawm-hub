<script setup lang="ts">
import { computed } from 'vue'
import { useDeviceStore } from '@/stores/device'
import { useUiStore } from '@/stores/ui'
import { useMouseSettingsStore } from '@/stores/mouseSettings'
import { useKeyboardSettingsStore } from '@/stores/keyboardSettings'
import MousePlaceholder from '@/components/common/MousePlaceholder.vue'

const deviceStore = useDeviceStore()
const uiStore = useUiStore()
const mouseStore = useMouseSettingsStore()
const kbdStore = useKeyboardSettingsStore()

const device = computed(() => deviceStore.currentDevice)

function goToSettings() {
  if (!device.value) return
  if (device.value.type === 'mouse') {
    mouseStore.resetToDefaults()
  } else {
    kbdStore.resetToDefaults()
  }
  uiStore.showBackButton = true
  uiStore.setPanel(device.value.type === 'mouse' ? 'mouse' : 'keyboard')
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
    class="device-panel"
    :class="{ keyboard: device.type === 'keyboard' }"
  >
    <div class="device-info">
      <p class="device-name">{{ device.name }}</p>
      <p class="device-model">{{ device.model }}</p>
      <div class="device-stats">
        <div v-if="device.battery !== undefined" class="stat">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="2" y="7" width="16" height="10" rx="2" />
            <path d="M22 11v2" />
            <rect x="4" y="9" width="12" height="6" rx="1" fill="currentColor" />
          </svg>
          <span>{{ device.battery }}%</span>
        </div>
        <div v-if="device.rssi !== undefined" class="stat">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 20v-6M8 16v-2M16 16v-2M4 12V8M20 12V8" />
          </svg>
          <span>{{ device.rssi }}%</span>
        </div>
      </div>
    </div>

    <div class="device-image-wrap" @click="goToSettings">
      <img
        v-if="device.imageUrl"
        :src="device.imageUrl"
        class="device-image"
        alt="Device"
      />
      <MousePlaceholder v-else class="device-placeholder" />
      <div class="click-hint">{{ $t('STRID_SETTING_CONFIG_CURRENT', 'Click to configure') }}</div>
    </div>

    <div class="device-footer">
      <p class="firmware-version">{{ device.firmwareVersion }}</p>
      <p
        v-if="device.hasNewFirmware"
        class="firmware-new"
        @click.stop="checkFirmwareUpdate"
      >
        {{ $t('STRID_HOME_NEW_VER_AVAIL') }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.device-panel {
  width: 419px;
  height: 504px;
  margin: 10% auto 0;
  background: linear-gradient(145deg, #e0e0e0, #c8c8c8);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  color: #303030;
  cursor: default;
}

.device-panel.keyboard {
  width: 626px;
  height: 482px;
}

.device-info {
  padding: 24px 32px 0;
}

.device-name {
  font-size: 22px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
}

.device-model {
  font-size: 14px;
  color: #555;
  margin: 4px 0 0;
}

.device-stats {
  position: absolute;
  top: 24px;
  right: 32px;
  display: flex;
  gap: 12px;
}

.stat {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  font-weight: 600;
  color: #444;
}

.icon {
  width: 16px;
  height: 16px;
}

.device-image-wrap {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
}

.device-image {
  max-width: 80%;
  max-height: 220px;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.device-placeholder {
  width: 180px;
  height: 260px;
  transition: transform 0.3s ease;
}

.device-image-wrap:hover .device-image,
.device-image-wrap:hover .device-placeholder {
  transform: scale(1.05);
}

.click-hint {
  position: absolute;
  bottom: 40px;
  font-size: 12px;
  color: #777;
  opacity: 0;
  transition: opacity 0.2s;
}

.device-image-wrap:hover .click-hint {
  opacity: 1;
}

.device-footer {
  padding: 0 32px 24px;
  text-align: center;
}

.firmware-version {
  font-size: 13px;
  color: #555;
  margin: 0;
}

.firmware-new {
  font-size: 13px;
  color: #16B777;
  margin: 6px 0 0;
  cursor: pointer;
  font-weight: 600;
}

.firmware-new:hover {
  text-decoration: underline;
}
</style>
