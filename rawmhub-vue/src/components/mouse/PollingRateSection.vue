<script setup lang="ts">
import { useMouseSettingsStore } from '@/stores/mouseSettings'

const mouseStore = useMouseSettingsStore()

function selectPollingRate(rate: number) {
  mouseStore.currentPollingRate = rate
}
</script>

<template>
  <div id="setting-polling-rate-section" class="layui-setting-section">
    <div class="layui-setting-title-container">
      <div class="layui-setting-title-bar"></div>
      <p class="layui-setting-title">{{ $t('STRID_SETTING_POLLING_RATE') }}</p>
      <div id="x-polling" style="margin-left: auto;">
        <label>
          {{ $t('STRID_SETTING_STEPLESS_MODE') }}
          <input type="checkbox" v-model="mouseStore.xPolling" lay-skin="switch" />
        </label>
      </div>
    </div>
    <p class="layui-setting-desc">{{ $t('STRID_SETTING_POLLING_RATE_DESC') }}</p>

    <div v-if="mouseStore.glassMode" class="glass-mode-notice">
      <p>{{ $t('STRID_SETTING_POLLING_RATE_GLASS_MODE') }}</p>
    </div>

    <div class="polling-rates">
      <div
        v-for="rate in mouseStore.pollingRates"
        :key="rate.value"
        class="polling-rate-item"
        :class="{ active: mouseStore.currentPollingRate === rate.value }"
        @click="selectPollingRate(rate.value)"
      >
        {{ rate.label }}
      </div>
    </div>

    <div v-if="mouseStore.xPolling" class="x-polling-slider" style="margin-top: 15px;">
      <input
        type="range"
        v-model.number="mouseStore.xPollingValue"
        min="125"
        max="8000"
        step="125"
        class="layui-slider"
      />
      <span class="slider-value">{{ mouseStore.xPollingValue }}Hz</span>
    </div>
  </div>
</template>

<style scoped>
.polling-rates {
  display: flex;
  flex-wrap: wrap;
  margin-top: 8px;
}

.glass-mode-notice {
  color: #1E9FFF;
  margin-top: 5px;
  font-size: 13px;
}

.x-polling-slider {
  display: flex;
  align-items: center;
  gap: 10px;
}

.layui-slider {
  flex: 1;
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
  min-width: 60px;
  text-align: right;
  font-size: 14px;
}
</style>
