<script setup lang="ts">
import { useMouseSettingsStore } from '@/stores/mouseSettings'

const mouseStore = useMouseSettingsStore()

function selectPollingRate(rate: number) {
  mouseStore.currentPollingRate = rate
}
</script>

<template>
  <div id="setting-polling-rate-section" class="layui-setting-section" style="margin-top: 10px;">
    <table style="width: 100%;">
      <tr>
        <td>
          <div class="layui-setting-title-container">
            <div class="layui-setting-title-bar"></div>
            <p class="layui-setting-title">{{ $t('STRID_SETTING_POLLING_RATE') }}</p>
          </div>
        </td>
        <td style="width: 100%; text-align: center;">
          <p id="glass-mode-activated" style="color: #1E9FFF;">
            {{ $t('STRID_SETTING_POLLING_RATE_GLASS_MODE') }}
          </p>
        </td>
        <td>
          <div id="x-polling">
            <label style="white-space: nowrap;">
              {{ $t('STRID_SETTING_STEPLESS_MODE') }}
              <input type="checkbox" v-model="mouseStore.xPolling" lay-skin="switch" />
            </label>
          </div>
        </td>
      </tr>
      <tr>
        <td colspan="3">
          <p class="layui-setting-desc">{{ $t('STRID_SETTING_POLLING_RATE_DESC') }}</p>
        </td>
      </tr>
    </table>

    <div id="setting-polling-rates" class="layui-form-item" style="margin-top: 8px; margin-bottom: 0px;">
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

    <div v-if="mouseStore.xPolling" id="slider-x-polling-input" style="margin-top: 30px; margin-bottom: 15px;">
      <input
        type="range"
        v-model.number="mouseStore.xPollingValue"
        min="125"
        max="8000"
        step="125"
        class="layui-slider"
      />
      <span style="margin-left: 10px;">{{ mouseStore.xPollingValue }}Hz</span>
    </div>
  </div>
</template>

<style scoped>
.polling-rate-item {
  display: inline-block;
  padding: 6px 12px;
  margin-right: 8px;
  margin-bottom: 8px;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 13px;
  border: 1px solid transparent;
}

.polling-rate-item:hover {
  border-color: var(--rawm-green);
}

.polling-rate-item.active {
  background-color: var(--rawm-green);
  color: white;
  border-color: var(--rawm-green);
}
</style>
