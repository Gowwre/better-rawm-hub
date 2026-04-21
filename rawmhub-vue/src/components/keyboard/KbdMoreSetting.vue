<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useKeyboardSettingsStore } from '@/stores/keyboardSettings'

const { t } = useI18n()
const kbdStore = useKeyboardSettingsStore()

function downloadFirmware() {
  alert('Downloading firmware...')
}

function keycodeFactoryReset() {
  if (confirm(t('STRID_KBD_KEYCODE_FACTORY_RESET_WARNING'))) {
    kbdStore.resetToDefaults()
  }
}

function factoryReset() {
  if (confirm(t('STRID_KBD_FACTORY_RESET_WARNING'))) {
    kbdStore.resetToDefaults()
  }
}
</script>

<template>
  <div id="kbd-main-setting-more-container" class="kbd-more-container">
    <div class="layui-setting-title-container">
      <div class="layui-setting-title-bar" style="margin-right: 2px;"></div>
      <p class="layui-setting-title">{{ $t('STRID_KBD_FIREWARE_VERTION') }}</p>
      <button
        class="layui-btn layui-btn-radius layui-bg-blue layui-btn-lg"
        style="margin-left: 80px; margin-top: -5px;"
        @click="downloadFirmware"
      >
        {{ $t('STRID_KBD_FIREWARE_DOWNLOAD') }}
      </button>
    </div>

    <p style="margin-top: 10px;">{{ $t('STRID_KBD_FIREWARE_VERTION', '当前版本') }}: {{ kbdStore.firmwareVersion }}</p>
    <p v-if="kbdStore.hasNewFirmware" style="margin-top: 10px; color: #16B777;">{{ $t('STRID_HOME_NEW_VER_AVAIL') }}</p>
    <p v-else style="margin-top: 10px;">{{ $t('STRID_KBD_FIREWARE_VERTION', '已是最新版本') }}</p>
    <p style="color: gray; margin-top: 10px;">{{ $t('STRID_KBD_NEW_VERTION_HINT') }}</p>

    <div style="margin-top: 40px;">
      <button
        class="layui-btn layui-btn-radius layui-bg-blue layui-btn-lg"
        @click="keycodeFactoryReset"
      >
        {{ $t('STRID_KBD_KEYCODE_FACTORY_RESET') }}
      </button>
      <button
        class="layui-btn layui-btn-radius layui-bg-blue layui-btn-lg"
        style="margin-left: 20px;"
        @click="factoryReset"
      >
        {{ $t('STRID_SETTING_FACTORY_RESET') }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.kbd-more-container {
  margin-left: 20px;
}
</style>
