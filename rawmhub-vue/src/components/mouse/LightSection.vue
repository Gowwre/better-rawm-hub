<script setup lang="ts">
import { useMouseSettingsStore } from '@/stores/mouseSettings'

const mouseStore = useMouseSettingsStore()

const lightModes = [
  { value: 1, label: 'STRID_SETTING_LIGHT_LOOP' },
  { value: 2, label: 'STRID_SETTING_LIGHT_DEFINE' },
  { value: 3, label: 'STRID_SETTING_LIGHT_MODE' },
]
</script>

<template>
  <div id="setting-light-section" class="layui-setting-section">
    <div class="layui-setting-title-container">
      <div class="layui-setting-title-bar"></div>
      <p class="layui-setting-title">{{ $t('STRID_SETTING_LIGHT') }}</p>
      <div id="light" style="margin-left: 30px;">
        <label>
          <input type="checkbox" v-model="mouseStore.lightAutoOff" />
          {{ $t('STRID_SETTING_LIGHT_AUTO_OFF') }}
        </label>
      </div>
    </div>

    <div id="brightness" style="width: 100%; margin-top: 10px;">
      <div class="layui-input-group" style="float: right;">
        <div class="layui-input-prefix" style="white-space: nowrap">
          {{ $t('STRID_SETTING_LIGHT_BRIGHTNESS') }}
        </div>
        <input
          type="range"
          v-model.number="mouseStore.brightness"
          min="0"
          max="100"
          class="layui-slider"
          style="width: 255px;"
        />
        <span class="slider-value">{{ mouseStore.brightness }}%</span>
      </div>
    </div>

    <div class="light-modes" style="margin-top: 8px;">
      <div
        v-for="mode in lightModes"
        :key="mode.value"
        class="light-mode-item"
        :class="{ active: mouseStore.lightMode === mode.value }"
        @click="mouseStore.lightMode = mode.value"
      >
        {{ $t(mode.label) }}
      </div>
    </div>

    <div v-if="mouseStore.lightMode === 2" class="light-define-section">
      <div class="light-colors">
        <div
          v-for="(color, index) in mouseStore.lightDefineColors"
          :key="index"
          class="color-dot"
          :style="{ backgroundColor: color }"
        ></div>
        <input type="color" class="color-picker-input" v-model="mouseStore.lightDefineColors[0]" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.light-modes {
  display: flex;
  gap: 10px;
  clear: both;
}

.light-mode-item {
  padding: 8px 16px;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 13px;
}

.light-mode-item.active {
  background-color: #16B777;
  color: white;
}

.light-mode-item:hover:not(.active) {
  background-color: rgba(255, 255, 255, 0.1);
}

.light-define-section {
  margin-top: 15px;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.03);
  border-radius: 4px;
  text-align: center;
}

.light-colors {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
}

.color-picker-input {
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  background: none;
}

.layui-slider {
  height: 6px;
  -webkit-appearance: none;
  appearance: none;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  outline: none;
}

.layui-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #16B777;
  cursor: pointer;
}

.slider-value {
  min-width: 40px;
  text-align: right;
  font-size: 13px;
  margin-left: 5px;
}
</style>
