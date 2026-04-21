<script setup lang="ts">
import { useMouseSettingsStore } from '@/stores/mouseSettings'
import { RawmSwitch, RawmSlider, RawmRadioGroup } from '@/components/ui'

const mouseStore = useMouseSettingsStore()

const pollingOptions = [
  { value: 125, label: '125Hz' },
  { value: 250, label: '250Hz' },
  { value: 500, label: '500Hz' },
  { value: 1000, label: '1000Hz' },
]
</script>

<template>
  <div class="layui-setting-section">
    <div class="section-header">
      <div class="layui-setting-title-container">
        <div class="layui-setting-title-bar" />
        <p class="layui-setting-title">{{ $t('STRID_SETTING_POLLING_RATE') }}</p>
      </div>
      <p v-if="mouseStore.glassMode" class="glass-badge">
        {{ $t('STRID_SETTING_POLLING_RATE_GLASS_MODE') }}
      </p>
      <label class="x-polling-label">
        <span>{{ $t('STRID_SETTING_STEPLESS_MODE') }}</span>
        <RawmSwitch v-model="mouseStore.xPolling" />
      </label>
    </div>
    <p class="layui-setting-desc">{{ $t('STRID_SETTING_POLLING_RATE_DESC') }}</p>

    <RawmRadioGroup
      v-model="mouseStore.currentPollingRate"
      :options="pollingOptions"
      style="margin-top: 10px;"
    />

    <div v-if="mouseStore.xPolling" class="x-polling-slider">
      <RawmSlider v-model="mouseStore.xPollingValue" :min="125" :max="8000" :step="125" />
      <span class="value-label">{{ mouseStore.xPollingValue }}Hz</span>
    </div>
  </div>
</template>

<style scoped>
.section-header {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.glass-badge {
  font-size: 13px;
  color: var(--color-blue);
  margin-left: auto;
}

.x-polling-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  white-space: nowrap;
  color: hsl(var(--muted-foreground));
}

.x-polling-slider {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 16px;
}

.value-label {
  font-size: 13px;
  font-weight: 600;
  min-width: 56px;
  text-align: right;
  color: hsl(var(--card-foreground));
}
</style>
