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
  <div id="kbd-main-setting-more-container" class="key-shortcuts-table" style="display: block;">
    <div style="margin-left: 20px;">
      <div class="layui-setting-title-container">
        <div class="layui-setting-title-bar" style="margin-right: 2px;"></div>
        <p class="layui-setting-title">{{ $t('STRID_KBD_FIREWARE_VERTION') }}</p>
        <button
          id="kbd-fireware-download"
          class="layui-btn layui-btn-radius layui-bg-blue layui-btn-lg"
          style="margin-left: 80px; margin-top: -5px;"
          @click="downloadFirmware"
        >
          {{ $t('STRID_KBD_FIREWARE_DOWNLOAD') }}
        </button>
      </div>
      <p id="kbd-fireware-current-version" style="margin-top: 10px;">{{ $t('STRID_KBD_FIREWARE_VERTION', '当前版本') }}: {{ kbdStore.firmwareVersion }}</p>
      <p id="kbd-fireware-new-version" style="margin-top: 10px;">
        <span v-if="kbdStore.hasNewFirmware" style="color: #16B777;">{{ $t('STRID_HOME_NEW_VER_AVAIL') }}</span>
        <span v-else>{{ $t('STRID_KBD_FIREWARE_VERTION', '已是最新版本') }}</span>
      </p>
      <p id="kbd-fireware-new-version-hint" style="color: gray; margin-top: 10px;" data-i18n-text="STRID_KBD_NEW_VERTION_HINT">
        {{ $t('STRID_KBD_NEW_VERTION_HINT') }}
      </p>
      <button
        id="kbd-keycode-factory-reset"
        class="layui-btn layui-btn-radius layui-bg-blue layui-btn-lg"
        style="margin-top: 40px;"
        @click="keycodeFactoryReset"
      >
        {{ $t('STRID_KBD_KEYCODE_FACTORY_RESET') }}
      </button>
      <button
        id="kbd-factory-reset"
        class="layui-btn layui-btn-radius layui-bg-blue layui-btn-lg"
        style="margin-left: 20px; margin-top: 40px;"
        @click="factoryReset"
      >
        {{ $t('STRID_SETTING_FACTORY_RESET') }}
      </button>
    </div>
  </div>
</template>

<style scoped>
</style>
