<script setup lang="ts">
import { onMounted, watch } from 'vue'
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

const { locale } = useI18n()
const deviceStore = useDeviceStore()
const uiStore = useUiStore()

onMounted(() => {
  uiStore.calculateAutoZoom()
  window.addEventListener('resize', uiStore.calculateAutoZoom)
  const isSupported = 'hid' in navigator
  if (isSupported) {
    uiStore.setPanel('pair')
  } else {
    uiStore.setPanel('not-support')
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
