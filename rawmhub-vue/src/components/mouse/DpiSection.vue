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

    <div id="dpi-both-x-y" style="margin-top: 15px;">
      <label>
        <input type="checkbox" v-model="mouseStore.dpiBothXY" />
        {{ $t('STRID_SETTING_DPI_BOTH_X_Y') }}
      </label>
    </div>

    <div style="margin-top: 25px;">
      <span id="slider-dpi-x-input-label" style="position: fixed; margin-top: -6px;">X</span>
      <div id="slider-dpi-x-input" style="margin-left: 18px;">
        <input
          type="range"
          v-model.number="mouseStore.dpiLevels[mouseStore.currentDpiIndex].x"
          min="100"
          max="26000"
          step="50"
          class="layui-slider"
        />
      </div>
    </div>

    <div v-if="mouseStore.dpiBothXY" id="slider-dpi-y-input-container" style="margin-top: 40px;">
      <span id="slider-dpi-y-input-label" style="position: fixed; margin-top: -6px;">Y</span>
      <div id="slider-dpi-y-input" style="margin-left: 18px;">
        <input
          type="range"
          v-model.number="mouseStore.dpiLevels[mouseStore.currentDpiIndex].y"
          min="100"
          max="26000"
          step="50"
          class="layui-slider"
        />
      </div>
    </div>

    <div class="layui-setting-title-container" style="margin-top: 25px">
      <p>{{ $t('STRID_SETTING_DPI_LEVEL') }}</p>
      <button
        id="dpi-level-edit"
        class="layui-btn layui-btn-radius layui-btn-sm"
        style="margin-left: 20px; background-color: #16B777;"
        @click="toggleEdit"
      >
        {{ $t('STRID_EDIT') }}
      </button>
      <button
        id="dpi-level-add"
        class="layui-btn layui-btn-radius layui-btn-sm"
        style="background-color: #16B777;"
        @click="showDpiInput = true"
      >
        {{ $t('STRID_SETTING_DPI_LEVEL_ADD') }}
      </button>
    </div>

    <div id="setting-dpi-levels" style="text-align: center; width: fit-content; margin-top: 15px;">
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

    <!-- DPI input panel -->
    <div v-if="showDpiInput" id="dpi-level-input-panel" style="background-color: transparent; padding: 10px; margin-top: 10px;">
      <table class="layui-form" style="text-align: center; width: 100%;">
        <tr>
          <td>
            <button class="layui-setting-title" style="background-color: transparent; border-color: transparent;">
              {{ $t('STRID_SETTING_DPI_LEVEL_SPEED_INPUT') }}
            </button>
          </td>
        </tr>
        <tr>
          <td style="padding-top: 10px;">
            <input v-model.number="newDpiValue" type="number" class="layui-input" style="margin: 0 auto; display: block; width: 150px;" min="50" max="26000" step="50" />
          </td>
        </tr>
        <tr>
          <td>
            <button class="layui-setting-title" style="background-color: transparent; border-color: transparent; margin-top: 10px;">
              {{ $t('STRID_SETTING_DPI_LEVEL_COLOR') }}
            </button>
          </td>
        </tr>
        <tr>
          <td>
            <div class="layui-setting-light-define-section" style="width: fit-content; height: 20px; margin-top: 4px; margin: 0 auto;">
              <div id="dpi-input-colors" style="text-align: center; width: fit-content; display: flex; gap: 8px; padding: 4px;">
                <div
                  v-for="color in ['#16B777', '#1E9FFF', '#FA584D', '#FFB800', '#A020F0']"
                  :key="color"
                  style="width: 20px; height: 20px; border-radius: 50%; cursor: pointer;"
                  :style="{ backgroundColor: color }"
                ></div>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td style="padding-top: 10px;">
            <button class="layui-btn layui-btn-sm" style="background-color: #16B777;" @click="addDpiLevel">
              {{ $t('STRING_OK') }}
            </button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<style scoped>
.dpi-level-item {
  display: inline-block;
  width: 36px;
  height: 36px;
  line-height: 36px;
  border-radius: 50%;
  margin: 0 6px;
  cursor: pointer;
  color: #fff;
  font-size: 12px;
  text-align: center;
  position: relative;
  transition: transform 0.2s;
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
  background-color: #FA584D;
  color: white;
  border-radius: 50%;
  font-size: 11px;
  line-height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.layui-setting-light-define-section {
  background-color: #292929;
  border-radius: 2px;
}

body.light-theme .layui-setting-light-define-section {
  background-color: lightgray;
}
</style>
