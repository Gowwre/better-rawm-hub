<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import PairPanel from '@/components/device/PairPanel.vue'
import ConnectPanel from '@/components/device/ConnectPanel.vue'
import DeviceList from '@/components/device/DeviceList.vue'
import CurrentDevicePanel from '@/components/device/CurrentDevicePanel.vue'
import MouseSettingsPanel from '@/components/mouse/MouseSettingsPanel.vue'
import KeyboardSettingsPanel from '@/components/keyboard/KeyboardSettingsPanel.vue'
import NotSupportedPanel from '@/components/device/NotSupportedPanel.vue'
import ReceiverPanel from '@/components/device/ReceiverPanel.vue'
import DownloadPanel from '@/components/common/DownloadPanel.vue'
import { useDeviceStore } from '@/stores/device'
import { useUiStore } from '@/stores/ui'
import { useMouseSettingsStore } from '@/stores/mouseSettings'
import { useKeyboardSettingsStore } from '@/stores/keyboardSettings'
import { getDevices } from '@/utils/hidBridge'
import { useBridgeSync } from '@/composables/useBridgeSync'
import { useNativeHid } from '@/composables/useNativeHid'
import { useNativeHidFlag } from '@/composables/useHidMode'

const { locale } = useI18n()
const deviceStore = useDeviceStore()
const uiStore = useUiStore()
const mouseStore = useMouseSettingsStore()
const kbdStore = useKeyboardSettingsStore()
const bridge = useBridgeSync()
const native = useNativeHid()

function syncMouseSettings(raw: any) {
  if (!raw) return
  // DPI levels
  if (raw.cpiLevels && Array.isArray(raw.cpiLevels)) {
    mouseStore.dpiLevels = raw.cpiLevels.map((v: any, idx: number) => {
      const color = raw.cpiLevelColors?.[idx] ?? '#16B777'
      const hexColor = typeof color === 'number' ? `#${color.toString(16).padStart(6, '0')}` : color
      return {
        id: idx,
        x: typeof v === 'object' ? v.x || 800 : v,
        y: typeof v === 'object' ? v.y || 800 : v,
        color: hexColor,
      }
    })
  }
  if (raw.cpi?.value) {
    // Try to find current DPI index
    const idx = mouseStore.dpiLevels.findIndex((l: any) => l.x === raw.cpi.value)
    if (idx >= 0) mouseStore.currentDpiIndex = idx
  }
  if (raw.pollingRate) mouseStore.currentPollingRate = raw.pollingRate
  if (raw.light) {
    mouseStore.lightMode = raw.light.mode ?? mouseStore.lightMode
    mouseStore.brightness = raw.light.brightness ?? mouseStore.brightness
    mouseStore.lightAutoOff = raw.light.auto_off ?? mouseStore.lightAutoOff
  }
  if (raw.powerMode !== undefined) mouseStore.currentPowerMode = raw.powerMode
  if (raw.lod !== undefined) mouseStore.currentLod = raw.lod
  if (raw.angleSnapping !== undefined) mouseStore.angleSnapping = raw.angleSnapping
  if (raw.rippleControl !== undefined) mouseStore.rippleControl = raw.rippleControl
  if (raw.motionSync !== undefined) mouseStore.motionSync = raw.motionSync
  if (raw.wirelessTurbo !== undefined) mouseStore.wirelessTurbo = raw.wirelessTurbo
  if (raw.rfChannel !== undefined) mouseStore.currentRfChannel = raw.rfChannel
  if (raw.sleepTime !== undefined) mouseStore.sleepTime = raw.sleepTime
  if (raw.angleTuning !== undefined) mouseStore.angleTuning = raw.angleTuning
  if (raw.glassMode !== undefined) mouseStore.glassMode = raw.glassMode
  if (raw.keyDelay) {
    mouseStore.keyDelay = {
      enabled: raw.keyDelay.enabled ?? false,
      selectKey: raw.keyDelay.selectKey ?? '',
      downDelay: raw.keyDelay.down ?? 0,
      upDelay: raw.keyDelay.up ?? 0,
    }
  }
  if (raw.onboardIndex !== undefined) mouseStore.onboardConfig = raw.onboardIndex
}

function syncKeyboardSettings(raw: any) {
  if (!raw) return
  if (raw.lightInfo) {
    kbdStore.light = {
      mode: String(raw.lightInfo.mode ?? 'static'),
      sleepTime: raw.lightInfo.sleep_time ?? 300,
      brightness: raw.lightInfo.brightness ?? 80,
      speed: raw.lightInfo.speed ?? 50,
      colors: {},
    }
  }
  if (raw.axisInfos?.length > 0) {
    const first = raw.axisInfos[0]
    kbdStore.axis = {
      type: ['jdl', 'hn_omega', 'ttc_wcw'][first.switch_type] ?? 'jdl',
      triggerPoint: (first.top_dz ?? 1000) / 1000,
      quickTriggerMode: first.rt_enable === 1,
      pressDistance: (first.rt_press_lv ?? 2000) / 1000,
      releaseDistance: (first.rt_release_lv ?? 1500) / 1000,
      deadDistance: (first.btm_dz ?? 500) / 1000,
    }
  }
  if (raw.firmwareVersion) kbdStore.firmwareVersion = raw.firmwareVersion
  if (raw.hasNewFirmware !== undefined) kbdStore.hasNewFirmware = raw.hasNewFirmware
}

onMounted(() => {
  uiStore.calculateAutoZoom()
  window.addEventListener('resize', uiStore.calculateAutoZoom)
  const isSupported = 'hid' in navigator
  if (!isSupported) {
    uiStore.setPanel('not-support')
    return
  }

  uiStore.setPanel('pair')

  if (useNativeHidFlag.value) {
    // Native WebHID mode
    native.start()

    watch(() => native.devices.value, (devs) => {
      const hadDevices = deviceStore.devices.length > 0
      deviceStore.syncFromBridge(devs, native.currentDevice.value)
      const hasDevices = deviceStore.devices.length > 0

      const isOnboardingPanel = uiStore.activePanel === 'pair' || uiStore.activePanel === 'connect'
      if (hasDevices && isOnboardingPanel) {
        uiStore.setPanel('device')
      }
      if (!hasDevices && hadDevices && uiStore.activePanel === 'device') {
        uiStore.setPanel('connect')
      }
    }, { deep: true })

    watch(() => native.rawSettings.value, (raw) => {
      if (native.isMouse.value) {
        syncMouseSettings(raw)
      } else if (native.isKeyboard.value) {
        syncKeyboardSettings(raw)
      }
    }, { immediate: false })
  } else {
    // Iframe bridge mode
    bridge.start()

    watch(() => bridge.devices.value, (devs) => {
      const hadDevices = deviceStore.devices.length > 0
      deviceStore.syncFromBridge(devs, bridge.currentDevice.value)
      const hasDevices = deviceStore.devices.length > 0

      const isOnboardingPanel = uiStore.activePanel === 'pair' || uiStore.activePanel === 'connect'
      if (hasDevices && isOnboardingPanel) {
        uiStore.setPanel('device')
      }
      if (!hasDevices && hadDevices && uiStore.activePanel === 'device') {
        uiStore.setPanel('connect')
      }
    }, { deep: true })

    watch(() => bridge.rawSettings.value, (raw) => {
      if (bridge.isMouse.value) {
        syncMouseSettings(raw)
      } else if (bridge.isKeyboard.value) {
        syncKeyboardSettings(raw)
      }
    }, { immediate: false })
  }
})

watch(() => uiStore.language, (newLang) => {
  locale.value = newLang
})

watch(() => uiStore.darkTheme, (isDark) => {
  document.body.classList.toggle('light-theme', !isDark)
}, { immediate: true })
</script>

<template>
  <div :style="{ zoom: uiStore.autoZoom }">
    <AppHeader />

    <main class="main-content">
      <!-- Onboarding / connection flow -->
      <PairPanel v-if="uiStore.activePanel === 'pair'" />
      <ConnectPanel v-else-if="uiStore.activePanel === 'connect'" />
      <NotSupportedPanel v-else-if="uiStore.activePanel === 'not-support'" />

      <!-- Home view: device list + current device + receiver -->
      <template v-else-if="uiStore.activePanel === 'device'">
        <DeviceList />
        <CurrentDevicePanel />
        <ReceiverPanel />
      </template>

      <!-- Settings views -->
      <MouseSettingsPanel v-else-if="uiStore.activePanel === 'mouse'" />
      <KeyboardSettingsPanel v-else-if="uiStore.activePanel === 'keyboard'" />
    </main>

    <DownloadPanel v-if="uiStore.showDownload" />
    <AppFooter />
  </div>
</template>

<style scoped>
.main-content {
  padding-top: 60px;
  padding-bottom: 50px;
  min-height: 100vh;
}
</style>
