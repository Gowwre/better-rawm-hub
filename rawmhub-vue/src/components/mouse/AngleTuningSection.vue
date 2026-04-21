<script setup lang="ts">
import { useMouseSettingsStore } from '@/stores/mouseSettings'

const mouseStore = useMouseSettingsStore()
</script>

<template>
  <div id="setting-angle-tuning-section" class="layui-setting-section" style="margin-top: 10px;">
    <div class="layui-setting-title-container">
      <div class="layui-setting-title-bar"></div>
      <p class="layui-setting-title">{{ $t('STRID_SETTING_ANGLE_TUNING') }}</p>
    </div>
    <p class="layui-setting-desc">{{ $t('STRID_SETTING_ANGLE_TUNING_TIPS') }}</p>
    <div id="slider-angle-tuning" style="margin-top: 30px; margin-bottom: 15px;">
      <input
        type="range"
        v-model.number="mouseStore.angleTuning"
        min="-45"
        max="45"
        step="1"
        class="layui-slider"
      />
      <span style="margin-left: 10px;">{{ mouseStore.angleTuning }}°</span>
    </div>
  </div>
</template>
