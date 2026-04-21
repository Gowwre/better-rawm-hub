<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useMouseSettingsStore } from '@/stores/mouseSettings'
import { useUiStore } from '@/stores/ui'
import KeyMappingSection from '@/components/mouse/KeyMappingSection.vue'
import DpiSection from '@/components/mouse/DpiSection.vue'
import PollingRateSection from '@/components/mouse/PollingRateSection.vue'
import LightSection from '@/components/mouse/LightSection.vue'
import PowerModeSection from '@/components/mouse/PowerModeSection.vue'
import LodSection from '@/components/mouse/LodSection.vue'
import OtherSettingsSection from '@/components/mouse/OtherSettingsSection.vue'
import SleepTimeSection from '@/components/mouse/SleepTimeSection.vue'
import AngleTuningSection from '@/components/mouse/AngleTuningSection.vue'
import KeyResponseSection from '@/components/mouse/KeyResponseSection.vue'

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
</script>

<template>
  <div id="setting-panel" class="layui-setting-panel layui-auto-zoom layui-form" style="margin-bottom: 39px; display: block;">
    <table id="settings" style="width: 100%;">
      <tr>
        <!-- Left column -->
        <td style="vertical-align: top; height: 1px;">
          <div style="display: flex; height: 100%; min-height: 400px;">
            <div style="width: 330px;">
              <KeyMappingSection />
              <div class="layui-row" style="margin-top: 15px;">
                <div class="layui-col-xs6" style="text-align: center;">
                  <button
                    id="factory-reset"
                    class="layui-btn layui-btn-radius layui-bg-blue layui-btn-lg"
                    @click="handleFactoryReset"
                  >
                    {{ $t('STRID_SETTING_FACTORY_RESET') }}
                  </button>
                </div>
                <div class="layui-col-xs6" style="text-align: center;">
                  <button
                    id="mapping-apply-and-onboard"
                    class="layui-btn layui-btn-radius layui-bg-blue layui-btn-lg"
                    @click="handleApplyAndOnboard"
                  >
                    {{ $t('STRID_SETTING_MAPPING_APPLY_AND_ONBOARD') }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </td>

        <!-- Middle column -->
        <td style="width: 35%; min-width: 340px; vertical-align: top; padding-right: 30px;">
          <DpiSection />
          <PollingRateSection />
          <LightSection />
          <PowerModeSection />
          <LodSection />
        </td>

        <!-- Right column -->
        <td style="width: 35%; min-width: 300px; vertical-align: top; padding-right: 30px;">
          <OtherSettingsSection />
          <SleepTimeSection />
          <AngleTuningSection />
          <KeyResponseSection />
        </td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
.layui-setting-panel {
  width: auto;
  height: auto;
  margin-left: 10px;
  margin-bottom: 10px;
  margin-top: -40px;
}

.layui-col-xs6 {
  width: 50%;
  float: left;
  box-sizing: border-box;
}
</style>
