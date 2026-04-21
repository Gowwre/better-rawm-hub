<script setup lang="ts">
import { useMouseSettingsStore } from '@/stores/mouseSettings'
import { RawmSlider } from '@/components/ui'

const mouseStore = useMouseSettingsStore()
</script>

<template>
  <div class="layui-setting-section">
    <div class="layui-setting-title-container">
      <div class="layui-setting-title-bar" />
      <p class="layui-setting-title">{{ $t('STRID_SETTING_ANGLE_TUNING') }}</p>
    </div>
    <p class="layui-setting-desc">{{ $t('STRID_SETTING_ANGLE_TUNING_TIPS') }}</p>
    <div class="slider-row">
      <RawmSlider v-model="mouseStore.angleTuning" :min="-45" :max="45" :step="1" />
      <span class="value-label">{{ mouseStore.angleTuning }}°</span>
    </div>
  </div>
</template>

<style scoped>
.slider-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 16px;
}

.value-label {
  font-size: 13px;
  font-weight: 600;
  min-width: 40px;
  text-align: right;
  color: hsl(var(--card-foreground));
}
</style>
