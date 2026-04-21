<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useMouseSettingsStore } from '@/stores/mouseSettings'
import { useUiStore } from '@/stores/ui'
import KeyMappingSection from '@/components/mouse/KeyMappingSection.vue'
import DpiSection from '@/components/mouse/DpiSection.vue'
import PollingRateSection from '@/components/mouse/PollingRateSection.vue'
import LightSection from '@/components/mouse/LightSection.vue'
import PowerModeSection from '@/components/mouse/PowerModeSection.vue'
import OtherSettingsSection from '@/components/mouse/OtherSettingsSection.vue'

const { t } = useI18n()
const mouseStore = useMouseSettingsStore()
const uiStore = useUiStore()

function handleFactoryReset() {
  if (confirm(t('STRID_SETTING_FACTORY_RESET_WARNING'))) {
    mouseStore.resetToDefaults()
  }
}

function handleApplyAndOnboard() {
  alert(t('STRID_SETTING_MAPPING_APPLY_AND_ONBOARD'))
}

function handleBack() {
  uiStore.showBackButton = false
  uiStore.setPanel('device')
}
</script>

<template>
  <div id="setting-panel" class="setting-panel layui-form">
    <button
      v-if="uiStore.showBackButton"
      class="layui-btn layui-btn-radius layui-bg-blue back-btn"
      @click="handleBack"
    >
      {{ $t('STRID_SETTING_MAPPING_NOT_SAVED_BACK_S', '返回') }}
    </button>

    <div class="setting-layout">
      <div class="setting-left">
        <KeyMappingSection />
        <div class="setting-actions">
          <button
            class="layui-btn layui-btn-radius layui-bg-blue layui-btn-lg"
            @click="handleFactoryReset"
          >
            {{ $t('STRID_SETTING_FACTORY_RESET') }}
          </button>
          <button
            class="layui-btn layui-btn-radius layui-bg-blue layui-btn-lg"
            @click="handleApplyAndOnboard"
          >
            {{ $t('STRID_SETTING_MAPPING_APPLY_AND_ONBOARD') }}
          </button>
        </div>
      </div>

      <div class="setting-right">
        <DpiSection />
        <PollingRateSection />
        <LightSection />
        <PowerModeSection />
        <OtherSettingsSection />
      </div>
    </div>
  </div>
</template>

<style scoped>
.setting-panel {
  margin: 0 10px;
  margin-bottom: 39px;
}

.back-btn {
  position: absolute;
  margin-left: 10px;
  margin-top: 15px;
}

.setting-layout {
  display: flex;
  gap: 20px;
  min-height: 400px;
}

.setting-left {
  width: 330px;
  min-width: 330px;
}

.setting-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 340px;
}

.setting-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}
</style>
