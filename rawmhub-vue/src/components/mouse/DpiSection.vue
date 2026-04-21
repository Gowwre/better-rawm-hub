<script setup lang="ts">
import { ref } from 'vue'
import { useMouseSettingsStore } from '@/stores/mouseSettings'
import { RawmSlider, RawmCheckbox, RawmButton } from '@/components/ui'

const mouseStore = useMouseSettingsStore()

const showDpiInput = ref(false)
const newDpiValue = ref(800)

function selectDpiLevel(index: number) {
  mouseStore.currentDpiIndex = index
}

function addDpiLevel() {
  mouseStore.addDpiLevel(newDpiValue.value, newDpiValue.value, '#16B777')
  showDpiInput.value = false
}

function deleteDpiLevel(index: number) {
  mouseStore.removeDpiLevel(index)
}

function toggleEdit() {
  mouseStore.dpiEditing = !mouseStore.dpiEditing
}

const dpiColors = ['#16B777', '#1E9FFF', '#FA584D', '#FFB800', '#A020F0']
</script>

<template>
  <div class="layui-setting-section">
    <div class="layui-setting-title-container">
      <div class="layui-setting-title-bar" />
      <p class="layui-setting-title">{{ $t('STRID_SETTING_DPI_SPEED') }}</p>
    </div>
    <p class="layui-setting-desc">{{ $t('STRID_SETTING_DPI_SPEED_DESC') }}</p>

    <div class="field-row">
      <RawmCheckbox v-model="mouseStore.dpiBothXY">
        {{ $t('STRID_SETTING_DPI_BOTH_X_Y') }}
      </RawmCheckbox>
    </div>

    <div class="slider-row">
      <span class="axis-label">X</span>
      <RawmSlider
        v-model="mouseStore.dpiLevels[mouseStore.currentDpiIndex].x"
        :min="100"
        :max="26000"
        :step="50"
      />
      <span class="value-label">{{ mouseStore.dpiLevels[mouseStore.currentDpiIndex].x }}</span>
    </div>

    <div v-if="mouseStore.dpiBothXY" class="slider-row">
      <span class="axis-label">Y</span>
      <RawmSlider
        v-model="mouseStore.dpiLevels[mouseStore.currentDpiIndex].y"
        :min="100"
        :max="26000"
        :step="50"
      />
      <span class="value-label">{{ mouseStore.dpiLevels[mouseStore.currentDpiIndex].y }}</span>
    </div>

    <div class="level-header">
      <span class="level-title">{{ $t('STRID_SETTING_DPI_LEVEL') }}</span>
      <RawmButton variant="primary" size="sm" @click="toggleEdit">{{ $t('STRID_EDIT') }}</RawmButton>
      <RawmButton variant="primary" size="sm" @click="showDpiInput = true">{{ $t('STRID_SETTING_DPI_LEVEL_ADD') }}</RawmButton>
    </div>

    <div class="dpi-levels">
      <div
        v-for="(level, index) in mouseStore.dpiLevels"
        :key="level.id"
        class="dpi-level-item"
        :class="{ active: mouseStore.currentDpiIndex === index }"
        :style="{ backgroundColor: level.color }"
        @click="selectDpiLevel(index)"
      >
        {{ level.x }}
        <span
          v-if="mouseStore.dpiEditing && mouseStore.dpiLevels.length > 1"
          class="delete-dpi"
          @click.stop="deleteDpiLevel(index)"
        >×</span>
      </div>
    </div>

    <div v-if="showDpiInput" class="dpi-input-panel">
      <p class="field-label">{{ $t('STRID_SETTING_DPI_LEVEL_SPEED_INPUT') }}</p>
      <input v-model.number="newDpiValue" type="number" class="layui-input" min="50" max="26000" step="50" style="width: 150px; margin: 0 auto; display: block;" />
      <p class="field-label" style="margin-top: 10px;">{{ $t('STRID_SETTING_DPI_LEVEL_COLOR') }}</p>
      <div class="color-picker-row">
        <div
          v-for="color in dpiColors"
          :key="color"
          class="color-dot"
          :style="{ backgroundColor: color }"
        />
      </div>
      <RawmButton variant="primary" size="sm" style="margin-top: 10px;" @click="addDpiLevel">{{ $t('STRING_OK') }}</RawmButton>
    </div>
  </div>
</template>

<style scoped>
.field-row {
  margin-top: 12px;
}

.slider-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 16px;
}

.axis-label {
  font-size: 13px;
  font-weight: 600;
  min-width: 16px;
  color: hsl(var(--muted-foreground));
}

.value-label {
  font-size: 13px;
  font-weight: 600;
  min-width: 48px;
  text-align: right;
  color: hsl(var(--card-foreground));
}

.level-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 16px;
}

.level-title {
  font-size: 14px;
  font-weight: 600;
  margin-right: auto;
  color: hsl(var(--card-foreground));
}

.dpi-levels {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 12px;
  justify-content: center;
}

.dpi-level-item {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  color: white;
  transition: all 0.2s;
}

.dpi-level-item.active {
  box-shadow: 0 0 0 3px white, 0 0 0 5px currentColor;
}

.dpi-level-item:hover {
  transform: scale(1.1);
}

.delete-dpi {
  position: absolute;
  top: -5px;
  right: -5px;
  width: 16px;
  height: 16px;
  background-color: var(--color-red);
  color: white;
  border-radius: 50%;
  font-size: 11px;
  line-height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.dpi-input-panel {
  margin-top: 12px;
  padding: 12px;
  background-color: hsl(var(--muted));
  border-radius: 4px;
  text-align: center;
}

.field-label {
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 8px;
  color: hsl(var(--muted-foreground));
}

.color-picker-row {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 10px 0;
}

.color-dot {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid transparent;
  transition: transform 0.15s;
}

.color-dot:hover {
  transform: scale(1.15);
}
</style>
