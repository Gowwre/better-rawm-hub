<script setup lang="ts">
import { useMouseSettingsStore } from '@/stores/mouseSettings'
import { RawmSlider } from '@/components/ui'

const mouseStore = useMouseSettingsStore()
</script>

<template>
  <div class="layui-setting-section">
    <div class="layui-setting-title-container">
      <div class="layui-setting-title-bar" />
      <p class="layui-setting-title">{{ $t('STRID_SETTING_KEY_RESPONSE') }}</p>
    </div>
    <p class="layui-setting-desc">{{ $t('STRID_SETTING_KEY_RESPONSE_TIPS') }}</p>
    <div class="slider-row">
      <RawmSlider v-model="mouseStore.keyDelay.downDelay" :min="0" :max="50" :step="1" />
      <span class="value-label">{{ mouseStore.keyDelay.downDelay }}ms</span>
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
  min-width: 48px;
  text-align: right;
  color: hsl(var(--card-foreground));
}
</style>
