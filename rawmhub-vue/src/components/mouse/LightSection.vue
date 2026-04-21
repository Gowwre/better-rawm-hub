<script setup lang="ts">
import { useMouseSettingsStore } from '@/stores/mouseSettings'
import { RawmSlider, RawmCheckbox, RawmRadioGroup } from '@/components/ui'

const mouseStore = useMouseSettingsStore()

const lightModeOptions = [
  { value: 1, label: '循环' },
  { value: 2, label: '自定义' },
  { value: 3, label: 'DPI档位' },
]
</script>

<template>
  <div class="layui-setting-section">
    <div class="section-header">
      <div class="layui-setting-title-container">
        <div class="layui-setting-title-bar" />
        <p class="layui-setting-title">{{ $t('STRID_SETTING_LIGHT') }}</p>
      </div>
      <RawmCheckbox v-model="mouseStore.lightAutoOff">
        {{ $t('STRID_SETTING_LIGHT_AUTO_OFF') }}
      </RawmCheckbox>
      <div class="brightness-row">
        <span class="field-label">{{ $t('STRID_SETTING_LIGHT_BRIGHTNESS') }}</span>
        <RawmSlider v-model="mouseStore.brightness" :min="0" :max="100" :step="1" style="width: 180px;" />
        <span class="value-label">{{ mouseStore.brightness }}%</span>
      </div>
    </div>

    <RawmRadioGroup
      v-model="mouseStore.lightMode"
      :options="lightModeOptions"
      style="margin-top: 12px;"
    />

    <div v-if="mouseStore.lightMode === 2" class="color-panel">
      <div class="color-row">
        <div
          v-for="(color, index) in mouseStore.lightDefineColors"
          :key="index"
          class="color-dot"
          :style="{ backgroundColor: color }"
        />
        <input type="color" v-model="mouseStore.lightDefineColors[0]" class="native-color-picker" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.section-header {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.brightness-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: auto;
}

.field-label {
  font-size: 13px;
  white-space: nowrap;
  color: hsl(var(--muted-foreground));
}

.value-label {
  font-size: 13px;
  font-weight: 600;
  min-width: 36px;
  color: hsl(var(--card-foreground));
}

.color-panel {
  margin-top: 12px;
  padding: 8px;
  background-color: hsl(var(--muted));
  border-radius: 4px;
  display: flex;
  justify-content: center;
}

.color-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.color-dot {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid transparent;
}

.native-color-picker {
  width: 24px;
  height: 24px;
  border: none;
  padding: 0;
  background: none;
  cursor: pointer;
}
</style>
