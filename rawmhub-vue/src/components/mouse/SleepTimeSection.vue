<script setup lang="ts">
import { computed } from 'vue'
import { useMouseSettingsStore } from '@/stores/mouseSettings'
import { RawmSlider } from '@/components/ui'

const mouseStore = useMouseSettingsStore()

const minutes = computed(() => Math.floor(mouseStore.sleepTime / 60))
</script>

<template>
  <div class="layui-setting-section">
    <div class="layui-setting-title-container">
      <div class="layui-setting-title-bar" />
      <p class="layui-setting-title">{{ $t('STRID_SETTING_SLEEP_TIME') }}</p>
    </div>
    <p class="layui-setting-desc">{{ $t('STRID_SETTING_SLEEP_TIME_TIPS') }}</p>
    <div class="slider-row">
      <RawmSlider v-model="mouseStore.sleepTime" :min="60" :max="3600" :step="60" />
      <span class="value-label">{{ minutes }}min</span>
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
