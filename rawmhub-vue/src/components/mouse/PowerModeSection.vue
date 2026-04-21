<script setup lang="ts">
import { useMouseSettingsStore } from '@/stores/mouseSettings'
import { RawmCheckbox, RawmRadioGroup } from '@/components/ui'

const mouseStore = useMouseSettingsStore()

const powerModeOptions = [
  { value: 0, label: '节能' },
  { value: 1, label: '平衡' },
  { value: 2, label: '性能' },
]
</script>

<template>
  <div class="layui-setting-section">
    <div class="section-header">
      <div class="layui-setting-title-container">
        <div class="layui-setting-title-bar" />
        <p class="layui-setting-title">{{ $t('STRID_SETTING_POWER_MODE') }}</p>
      </div>
      <RawmCheckbox v-model="mouseStore.glassMode">
        {{ $t('STRID_SETTING_POLLING_RATE_ENABLE_GLASS_MODE') }}
      </RawmCheckbox>
    </div>

    <RawmRadioGroup
      v-model="mouseStore.currentPowerMode"
      :options="powerModeOptions"
      style="margin-top: 10px;"
    />
  </div>
</template>

<style scoped>
.section-header {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}
</style>
