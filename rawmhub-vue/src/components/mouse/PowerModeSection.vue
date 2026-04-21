<script setup lang="ts">
import { useMouseSettingsStore } from '@/stores/mouseSettings'

const mouseStore = useMouseSettingsStore()

function selectPowerMode(value: number) {
  mouseStore.currentPowerMode = value
}
</script>

<template>
  <div id="setting-power-mode-section" class="layui-setting-section" style="margin-top: 10px;">
    <table style="width: 100%;">
      <tr>
        <td>
          <div class="layui-setting-title-container">
            <div class="layui-setting-title-bar"></div>
            <p class="layui-setting-title">{{ $t('STRID_SETTING_POWER_MODE') }}</p>
          </div>
        </td>
        <td style="width: 100%; text-align: end;">
          <p id="surface-quality2" style="color: #16B777; margin-left: 10px; display: none;">鼠标垫性能:</p>
        </td>
        <td>
          <div id="setting-glass-mode" style="margin-right: -15px;">
            <label>
              <input type="checkbox" v-model="mouseStore.glassMode" />
              {{ $t('STRID_SETTING_POLLING_RATE_ENABLE_GLASS_MODE') }}
            </label>
          </div>
        </td>
      </tr>
      <tr>
        <td colspan="3">
          <p id="selected-power-mode-tips" style="color: #1E9FFF; margin-top: 5px;"></p>
        </td>
      </tr>
    </table>

    <table style="margin-top: 8px; margin-bottom: 0px; width: 100%;">
      <tr>
        <td>
          <div id="setting-power-modes" class="power-modes">
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
        </td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
.power-modes {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.power-mode-item {
  padding: 8px 16px;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 13px;
  border: 1px solid transparent;
}

.power-mode-item:hover {
  border-color: var(--rawm-green);
}

.power-mode-item.active {
  background-color: var(--rawm-green);
  color: white;
  border-color: var(--rawm-green);
}
</style>
