<script setup lang="ts">
import { ref } from 'vue'
import { useMouseSettingsStore } from '@/stores/mouseSettings'

const mouseStore = useMouseSettingsStore()

const showDpiInput = ref(false)
const newDpiValue = ref(800)
const editingIndex = ref<number | null>(null)

function selectDpiLevel(index: number) {
  mouseStore.currentDpiIndex = index
}

function startEditDpi(index: number) {
  editingIndex.value = index
  newDpiValue.value = mouseStore.dpiLevels[index].x
  showDpiInput.value = true
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
</script>

<template>
  <div id="setting-dpi-section" class="layui-setting-section">
    <div class="layui-setting-title-container">
      <div class="layui-setting-title-bar"></div>
      <p class="layui-setting-title">{{ $t('STRID_SETTING_DPI_SPEED') }}</p>
    </div>
    <p class="layui-setting-desc">{{ $t('STRID_SETTING_DPI_SPEED_DESC') }}</p>

    <div style="margin-top: 15px;">
      <label>
        <input type="checkbox" v-model="mouseStore.dpiBothXY" />
        {{ $t('STRID_SETTING_DPI_BOTH_X_Y') }}
      </label>
    </div>

    <div class="dpi-sliders" style="margin-top: 25px;">
      <div class="slider-row">
        <span class="slider-label">X</span>
        <input
          type="range"
          v-model.number="mouseStore.dpiLevels[mouseStore.currentDpiIndex].x"
          min="100"
          max="26000"
          step="50"
          class="layui-slider"
        />
        <span class="slider-value">{{ mouseStore.dpiLevels[mouseStore.currentDpiIndex]?.x || 800 }}</span>
      </div>
      <div v-if="mouseStore.dpiBothXY" class="slider-row" style="margin-top: 15px;">
        <span class="slider-label">Y</span>
        <input
          type="range"
          v-model.number="mouseStore.dpiLevels[mouseStore.currentDpiIndex].y"
          min="100"
          max="26000"
          step="50"
          class="layui-slider"
        />
        <span class="slider-value">{{ mouseStore.dpiLevels[mouseStore.currentDpiIndex]?.y || 800 }}</span>
      </div>
    </div>

    <div class="layui-setting-title-container" style="margin-top: 25px;">
      <p>{{ $t('STRID_SETTING_DPI_LEVEL') }}</p>
      <button
        class="layui-btn layui-btn-radius layui-btn-sm"
        style="margin-left: 20px; background-color: #16B777;"
        @click="toggleEdit"
      >
        {{ $t('STRID_EDIT') }}
      </button>
      <button
        class="layui-btn layui-btn-radius layui-btn-sm"
        style="background-color: #16B777;"
        @click="showDpiInput = true"
      >
        {{ $t('STRID_SETTING_DPI_LEVEL_ADD') }}
      </button>
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
      <p class="layui-setting-title">{{ $t('STRID_SETTING_DPI_LEVEL_SPEED_INPUT') }}</p>
      <input
        v-model.number="newDpiValue"
        type="number"
        class="layui-input"
        min="50"
        max="26000"
        step="50"
        style="margin: 10px auto; display: block; width: 150px;"
      />
      <div class="color-picker">
        <div
          v-for="color in ['#16B777', '#1E9FFF', '#FA584D', '#FFB800', '#A020F0']"
          :key="color"
          class="color-dot"
          :style="{ backgroundColor: color }"
          :class="{ active: newDpiValue === newDpiValue }"
          @click="newDpiValue = newDpiValue"
        ></div>
      </div>
      <button class="layui-btn layui-btn-sm" style="background-color: #16B777; margin-top: 10px;" @click="addDpiLevel">
        {{ $t('STRING_OK') }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.dpi-sliders {
  padding: 0 10px;
}

.slider-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.slider-label {
  font-weight: bold;
  min-width: 20px;
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

.dpi-levels {
  text-align: center;
  margin-top: 15px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.dpi-level-item {
  position: relative;
}

.delete-dpi {
  position: absolute;
  top: -5px;
  right: -5px;
  width: 18px;
  height: 18px;
  background-color: #FA584D;
  color: white;
  border-radius: 50%;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.dpi-input-panel {
  margin-top: 15px;
  padding: 15px;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
  text-align: center;
}

.color-picker {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 10px;
}
</style>
