<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useMouseSettingsStore } from '@/stores/mouseSettings'
import KeyMappingSection from '@/components/mouse/KeyMappingSection.vue'
import MouseVisualPanel from '@/components/mouse/MouseVisualPanel.vue'
import DpiSection from '@/components/mouse/DpiSection.vue'
import PollingRateSection from '@/components/mouse/PollingRateSection.vue'
import LightSection from '@/components/mouse/LightSection.vue'
import PowerModeSection from '@/components/mouse/PowerModeSection.vue'
import LodSection from '@/components/mouse/LodSection.vue'
import OtherSettingsSection from '@/components/mouse/OtherSettingsSection.vue'
import SleepTimeSection from '@/components/mouse/SleepTimeSection.vue'
import AngleTuningSection from '@/components/mouse/AngleTuningSection.vue'
import KeyResponseSection from '@/components/mouse/KeyResponseSection.vue'
import { RawmButton } from '@/components/ui'
import { useDeviceStore } from '@/stores/device'
import { applySettings, factoryReset } from '@/utils/hidBridge'
import { useNativeHidFlag } from '@/composables/useHidMode'
import { useNativeHid } from '@/composables/useNativeHid'

const { t } = useI18n()
const mouseStore = useMouseSettingsStore()
const deviceStore = useDeviceStore()
const native = useNativeHid()

function handleFactoryReset() {
  if (confirm(t('STRID_SETTING_FACTORY_RESET_WARNING'))) {
    if (useNativeHidFlag.value) {
      native.factoryReset().catch(err => console.error('Factory reset failed:', err))
    } else {
      const deviceId = deviceStore.currentDevice?.id
      if (deviceId) {
        factoryReset(deviceId).catch(err => console.error('Factory reset failed:', err))
      }
    }
    mouseStore.resetToDefaults()
  }
}

async function handleApplyAndOnboard() {
  if (useNativeHidFlag.value) {
    try {
      await native.applySettings()
      alert(t('STRID_SETTING_MAPPING_APPLY_AND_ONBOARD') + ' - OK')
    } catch (err) {
      alert(t('STRID_SETTING_MAPPING_APPLY_AND_ONBOARD') + ' - Failed: ' + (err as Error).message)
    }
    return
  }

  const deviceId = deviceStore.currentDevice?.id
  if (!deviceId) {
    alert(t('STRID_SETTING_MAPPING_APPLY_AND_ONBOARD') + ' - No device selected')
    return
  }
  try {
    await applySettings(deviceId)
    alert(t('STRID_SETTING_MAPPING_APPLY_AND_ONBOARD') + ' - OK')
  } catch (err) {
    alert(t('STRID_SETTING_MAPPING_APPLY_AND_ONBOARD') + ' - Failed: ' + (err as Error).message)
  }
}
</script>

<template>
  <div class="settings-wrapper">
    <div class="settings-grid">
      <!-- Left column: mapping + mouse visual -->
      <div class="settings-col settings-col-left">
        <KeyMappingSection />
        <div class="left-stack">
          <MouseVisualPanel />
          <div class="actions-row">
            <RawmButton variant="outline" size="lg" @click="handleFactoryReset">
              {{ t('STRID_SETTING_FACTORY_RESET') }}
            </RawmButton>
            <RawmButton variant="primary" size="lg" @click="handleApplyAndOnboard">
              {{ t('STRID_SETTING_MAPPING_APPLY_AND_ONBOARD') }}
            </RawmButton>
          </div>
        </div>
      </div>

      <!-- Middle column -->
      <div class="settings-col settings-col-mid">
        <DpiSection />
        <PollingRateSection />
        <LightSection />
        <PowerModeSection />
        <LodSection />
      </div>

      <!-- Right column -->
      <div class="settings-col settings-col-right">
        <OtherSettingsSection />
        <SleepTimeSection />
        <AngleTuningSection />
        <KeyResponseSection />
      </div>
    </div>
  </div>
</template>

<style scoped>
.settings-wrapper {
  padding: 20px;
  padding-bottom: 50px; /* footer clearance */
}

.settings-grid {
  display: grid;
  grid-template-columns: auto 1fr 1fr;
  gap: 20px;
  align-items: start;
}

.settings-col {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.settings-col-left {
  flex-direction: row;
  gap: 20px;
}

.left-stack {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.actions-row {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}

.settings-col-mid,
.settings-col-right {
  min-width: 320px;
}
</style>
