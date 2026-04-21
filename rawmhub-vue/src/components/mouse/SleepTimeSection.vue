<script setup lang="ts">
import { useMouseSettingsStore } from '@/stores/mouseSettings'

const mouseStore = useMouseSettingsStore()
</script>

<template>
  <div id="setting-sleep-time-section" class="layui-setting-section" style="margin-top: 10px;">
    <div class="layui-setting-title-container">
      <div class="layui-setting-title-bar"></div>
      <p class="layui-setting-title">{{ $t('STRID_SETTING_SLEEP_TIME') }}</p>
    </div>
    <p class="layui-setting-desc">{{ $t('STRID_SETTING_SLEEP_TIME_TIPS') }}</p>
    <div id="slider-sleep-time" style="margin-top: 50px; margin-bottom: 10px;">
      <input
        type="range"
        v-model.number="mouseStore.sleepTime"
        min="60"
        max="3600"
        step="60"
        class="layui-slider"
      />
      <span style="margin-left: 10px;">{{ Math.floor(mouseStore.sleepTime / 60) }}min</span>
    </div>
  </div>
</template>
