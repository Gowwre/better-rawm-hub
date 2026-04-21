<script setup lang="ts">
import { useKeyboardSettingsStore } from '@/stores/keyboardSettings'

const kbdStore = useKeyboardSettingsStore()

const lightModes = [
  { value: 'static', label: '静态' },
  { value: 'breathing', label: '呼吸' },
  { value: 'wave', label: '波浪' },
  { value: 'reactive', label: '响应' },
  { value: 'custom', label: '自定义' },
]

function updateColorFromInputs() {
  const r = parseInt((document.getElementById('color-r-input') as HTMLInputElement)?.value || '0')
  const g = parseInt((document.getElementById('color-g-input') as HTMLInputElement)?.value || '0')
  const b = parseInt((document.getElementById('color-b-input') as HTMLInputElement)?.value || '0')
  kbdStore.light.colors.selected = `rgb(${r}, ${g}, ${b})`
}
</script>

<template>
  <div id="kbd-main-setting-light-container" class="kbd-light-container">
    <div class="light-layout">
      <div class="light-keyboard">
        <div class="key-grid">
          <div
            v-for="i in 60"
            :key="i"
            class="key-cell"
            :style="{ backgroundColor: kbdStore.light.colors[`key${i}`] || undefined }"
          >
            {{ i }}
          </div>
        </div>
      </div>

      <div class="light-controls">
        <button class="layui-btn layui-gray-button" style="width: 80px;">WASD</button>
        <button class="layui-btn layui-gray-button" style="width: 80px; margin-top: 20px;">{{ $t('STRID_KBD_SELECT_ALL') }}</button>
        <button class="layui-btn layui-gray-button" style="width: 80px; margin-top: 20px;">{{ $t('STRID_KBD_REVERSE_ALL') }}</button>
        <button class="layui-btn layui-gray-button" style="width: 80px; margin-top: 20px;">{{ $t('STRID_CLEAR') }}</button>
      </div>
    </div>

    <div class="light-tabs">
      <div
        class="tab-item"
        :class="{ active: kbdStore.activeSettingType === 0 }"
        @click="kbdStore.activeSettingType = 0"
      >
        {{ $t('STRID_KBD_LIGHT_KEY') }}
      </div>
      <div
        class="tab-item"
        :class="{ active: kbdStore.activeSettingType === 1 }"
        @click="kbdStore.activeSettingType = 1"
      >
        {{ $t('STRID_KBD_LIGHT_BOX') }}
      </div>
    </div>

    <div v-if="kbdStore.activeSettingType === 0" class="light-settings">
      <div style="display: flex; gap: 40px;">
        <div style="width: 425px;">
          <div class="layui-setting-title-container">
            <div class="layui-setting-title-bar" style="margin-right: 2px;"></div>
            <p class="layui-setting-title">{{ $t('STRID_KBD_LIGHT_MODE') }}</p>
          </div>
          <select v-model="kbdStore.light.mode" class="layui-input" style="width: 150px; margin-top: 10px;">
            <option v-for="mode in lightModes" :key="mode.value" :value="mode.value">
              {{ mode.label }}
            </option>
          </select>
          <p style="color: gray; margin-top: 20px; font-size: 13px;">{{ $t('STRID_KBD_LIGHT_MODE_HINT') }}</p>

          <div class="layui-setting-title-container" style="margin-top: 20px;">
            <div class="layui-setting-title-bar" style="margin-right: 2px;"></div>
            <p class="layui-setting-title">{{ $t('STRID_SETTING_SLEEP_TIME') }}</p>
          </div>
          <input
            type="number"
            v-model.number="kbdStore.light.sleepTime"
            class="layui-input"
            style="width: 150px; margin-top: 10px;"
          />
          <p style="color: gray; margin-top: 10px; font-size: 13px;">{{ $t('STRID_SETTING_SLEEP_TIME_TIPS') }}</p>
        </div>

        <div style="width: 440px;">
          <div class="layui-setting-title-container" style="height: 40px;">
            <div class="layui-setting-title-bar" style="margin-right: 2px;"></div>
            <p class="layui-setting-title" style="width: 280px;">{{ $t('STRID_KBD_LIGHT_PARAM_SETTING') }}</p>
          </div>

          <div class="layui-sub-setting-section" style="margin-top: 10px;">
            <div style="display: flex; align-items: center;">
              <p>{{ $t('STRID_KBD_LIGHT_COLOR_SELECT') }}</p>
              <input
                id="pick-color"
                type="color"
                v-model="kbdStore.light.colors.selected"
                style="background-color: #202020; border: 1px solid gray; margin-left: 10px; cursor: pointer;"
                @change="updateColorFromInputs"
              />
            </div>
            <div style="display: flex; text-align: center; align-items: center; margin-top: 10px;">
              <p style="width: 60px;">R</p>
              <p style="width: 60px; margin-left: 40px;">G</p>
              <p style="width: 60px; margin-left: 40px;">B</p>
            </div>
            <div style="display: flex; align-items: center; margin-top: 4px;">
              <input id="color-r-input" type="number" class="layui-input" min="0" max="255" style="width: 80px;" @input="updateColorFromInputs" />
              <input id="color-g-input" type="number" class="layui-input" min="0" max="255" style="width: 80px; margin-left: 20px;" @input="updateColorFromInputs" />
              <input id="color-b-input" type="number" class="layui-input" min="0" max="255" style="width: 80px; margin-left: 20px;" @input="updateColorFromInputs" />
            </div>

            <div style="margin-top: 20px;">
              <p>{{ $t('STRID_KBD_LIGHT_GLOBAL_BRIGHTNESS') }}</p>
              <div style="display: flex; margin-left: 8px; margin-top: 10px;">
                <input
                  type="range"
                  v-model.number="kbdStore.light.brightness"
                  min="0"
                  max="100"
                  class="layui-slider"
                  style="width: 400px;"
                />
                <p style="margin-left: 10px; margin-top: -6px;">{{ kbdStore.light.brightness }}%</p>
              </div>
            </div>

            <div style="margin-top: 15px;">
              <p>{{ $t('STRID_KBD_LIGHT_GLOBAL_SPEED') }}</p>
              <div style="display: flex; margin-left: 8px; margin-top: 10px;">
                <input
                  type="range"
                  v-model.number="kbdStore.light.speed"
                  min="0"
                  max="100"
                  class="layui-slider"
                  style="width: 400px;"
                />
                <p style="margin-left: 10px; margin-top: -6px;">{{ kbdStore.light.speed }}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="kbdStore.activeSettingType === 1" class="light-box-settings">
      <div style="display: flex; gap: 40px;">
        <div style="width: 425px;">
          <div class="layui-setting-title-container">
            <div class="layui-setting-title-bar" style="margin-right: 2px;"></div>
            <p class="layui-setting-title">{{ $t('STRID_KBD_LIGHT_MODE') }}</p>
          </div>
          <select v-model="kbdStore.lightBox.mode" class="layui-input" style="width: 150px; margin-top: 10px;">
            <option v-for="mode in lightModes" :key="mode.value" :value="mode.value">
              {{ mode.label }}
            </option>
          </select>

          <div style="display: flex; margin-top: 20px;">
            <p class="layui-setting-title" style="margin-right: 10px; margin-top: 6px;">{{ $t('STRID_KBD_LIGHT_BOX_COLORED') }}</p>
            <input type="checkbox" v-model="kbdStore.lightBox.colored" lay-skin="switch" />
          </div>
        </div>

        <div style="width: 440px;">
          <div class="layui-setting-title-container" style="height: 40px;">
            <div class="layui-setting-title-bar" style="margin-right: 2px;"></div>
            <p class="layui-setting-title" style="width: 280px;">{{ $t('STRID_KBD_LIGHT_PARAM_SETTING') }}</p>
          </div>

          <div class="layui-sub-setting-section" style="margin-top: 10px;">
            <div style="display: flex; align-items: center;">
              <p>{{ $t('STRID_KBD_LIGHT_COLOR_SELECT') }}</p>
              <input type="color" v-model="kbdStore.lightBox.color" style="background-color: #202020; border: 1px solid gray; margin-left: 10px; cursor: pointer;" />
            </div>
            <div style="display: flex; text-align: center; align-items: center; margin-top: 10px;">
              <p style="width: 60px;">R</p>
              <p style="width: 60px; margin-left: 40px;">G</p>
              <p style="width: 60px; margin-left: 40px;">B</p>
            </div>

            <div style="margin-top: 20px;">
              <p>{{ $t('STRID_KBD_LIGHT_GLOBAL_BRIGHTNESS') }}</p>
              <div style="display: flex; margin-left: 8px; margin-top: 10px;">
                <input
                  type="range"
                  v-model.number="kbdStore.lightBox.brightness"
                  min="0"
                  max="100"
                  class="layui-slider"
                  style="width: 400px;"
                />
                <p style="margin-left: 10px; margin-top: -6px;">{{ kbdStore.lightBox.brightness }}%</p>
              </div>
            </div>

            <div style="margin-top: 15px;">
              <p>{{ $t('STRID_KBD_LIGHT_GLOBAL_SPEED') }}</p>
              <div style="display: flex; margin-left: 8px; margin-top: 10px;">
                <input
                  type="range"
                  v-model.number="kbdStore.lightBox.speed"
                  min="0"
                  max="100"
                  class="layui-slider"
                  style="width: 400px;"
                />
                <p style="margin-left: 10px; margin-top: -6px;">{{ kbdStore.lightBox.speed }}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.kbd-light-container {
  width: 100%;
}

.light-layout {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.light-keyboard {
  flex: 1;
}

.light-controls {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.light-tabs {
  display: flex;
  border-bottom: 1px solid #444;
  margin-bottom: 15px;
}

.tab-item {
  padding: 8px 16px;
  cursor: pointer;
  font-size: 14px;
  border-bottom: 2px solid transparent;
  transition: all 0.2s;
}

.tab-item:hover {
  color: #16B777;
}

.tab-item.active {
  color: #16B777;
  border-bottom-color: #16B777;
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

.layui-input {
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid #444;
  color: inherit;
  padding: 6px 10px;
  border-radius: 4px;
}

select.layui-input {
  appearance: auto;
}
</style>
