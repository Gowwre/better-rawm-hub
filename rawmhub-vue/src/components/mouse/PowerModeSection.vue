<script setup lang="ts">
import { useMouseSettingsStore } from '@/stores/mouseSettings'

const mouseStore = useMouseSettingsStore()

function selectPowerMode(value: number) {
  mouseStore.currentPowerMode = value
}
</script>

<template>
  <div id="setting-power-mode-section" class="layui-setting-section">
    <div class="layui-setting-title-container">
      <div class="layui-setting-title-bar"></div>
      <p class="layui-setting-title">{{ $t('STRID_SETTING_POWER_MODE') }}</p>
      <div id="setting-glass-mode" style="margin-left: auto;">
        <label>
          <input type="checkbox" v-model="mouseStore.glassMode" />
          {{ $t('STRID_SETTING_POLLING_RATE_ENABLE_GLASS_MODE') }}
        </label>
      </div>
    </div>

    <div class="power-modes">
      <div
        v-for="mode in mouseStore.powerModes"
        :key="mode.value"
        class="power-mode-item"
        :class="{ active: mouseStore.currentPowerMode === mode.value }"
        @click="selectPowerMode(mode.value)"
      >
        {{ mode.label }}
      </div>
    </div>
  </div>

  <div id="setting-lod-section" class="layui-setting-section" style="margin-top: 10px;">
    <div class="layui-setting-title-container">
      <div class="layui-setting-title-bar"></div>
      <p class="layui-setting-title">{{ $t('STRID_SETTING_HAND_LIFT_DISTANCE') }}</p>
    </div>
    <p class="layui-setting-desc">{{ $t('STRID_SETTING_HAND_LIFT_DISTANCE_TIPS') }}</p>

    <div class="lod-levels">
      <div
        v-for="lod in mouseStore.lods"
        :key="lod.value"
        class="lod-item"
        :class="{ active: mouseStore.currentLod === lod.value }"
        @click="mouseStore.currentLod = lod.value"
      >
        {{ lod.label }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.power-modes, .lod-levels {
  display: flex;
  gap: 10px;
  margin-top: 10px;
  flex-wrap: wrap;
}
</style>
