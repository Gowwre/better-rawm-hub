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

function goToSettings() {
  if (device.value?.type === 'mouse') {
    mouseStore.resetToDefaults()
  } else {
    kbdStore.resetToDefaults()
  }
  uiStore.showBackButton = true
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
    :class="[
      'layui-current-panel',
      'layui-auto-zoom',
      device.type === 'keyboard' ? 'keyboard-panel' : ''
    ]"
    style="display: block;"
  >
    <div :style="device.type === 'mouse'
      ? { position: 'absolute', width: '419px', height: '504px' }
      : { position: 'absolute', width: '626px', height: '482px' }
    ">
      <p id="current-usb-client-name" class="layui-current-name">{{ device.name }}</p>
      <p
        id="current-usb-client-name-model"
        class="layui-current-name"
        style="margin-top: 25px; font-size: 15px;"
      >
        {{ device.model }}
      </p>
      <img
        id="current-usb-client-battery-icon"
        src=""
        style="position: absolute; left: 325px; top: 40px;"
      />
      <p
        id="current-usb-client-battery"
        style="position: absolute; left: 324px; top: 43px; width: 47px; text-align: center; font-size: 15px;"
      >
        {{ device.battery }}%
      </p>
      <img
        id="current-usb-client-rssi-icon"
        src=""
        style="position: absolute; left: 285px; top: 40px;"
      />
    </div>

    <div
      style="position: absolute; display: flex; align-items: center; justify-content: center;"
      :style="device.type === 'mouse'
        ? { width: '419px', height: '504px' }
        : { width: '626px', height: '482px' }
      "
    >
      <img
        id="current-usb-client-image"
        :src="device.imageUrl || 'https://hub.miracletek.net/hub/img/rawm_hub.png'"
        style="position: absolute; cursor: pointer;"
        @click="goToSettings"
        alt="Device"
      />
      <div
        v-if="device.type === 'mouse'"
        id="current-usb-client-models"
        style="position: absolute; margin-top: 310px; text-align: center; width: fit-content;"
      ></div>
      <table style="text-align: center; align-self: end; margin-bottom: 30px;">
        <tr>
          <td>
            <p
              id="current-usb-client-firmware"
              style="font-size: 14px; color: #303030"
            >
              {{ device.firmwareVersion }}
            </p>
          </td>
        </tr>
        <tr>
          <td>
            <p
              v-if="device.hasNewFirmware"
              id="current-usb-client-firmware-new"
              class="layui-firmware-new"
              style="color: #16B777;"
              @click="checkFirmwareUpdate"
            >
              {{ $t('STRID_HOME_NEW_VER_AVAIL') }}
            </p>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<style scoped>
.layui-current-panel {
  width: 419px;
  height: 504px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10%;
  position: relative;
  display: none;
}

.keyboard-panel {
  width: 626px;
}

.layui-current-name {
  position: absolute;
  left: 40px;
  top: 40px;
  font-size: 24px;
  color: #303030;
}

body.light-theme .layui-current-name {
  color: #404040;
}
</style>
