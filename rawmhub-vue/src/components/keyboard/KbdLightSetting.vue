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
  <div id="kbd-main-setting-light-container" class="key-shortcuts-table">
    <table style="width: 100%; margin-bottom: 30px;">
      <tr>
        <td style="width: 100%; min-width: 640px;">
          <div style="display: flex;">
            <div style="margin-left: 40px;">
              <div id="kbd-mapping-light-container" style="text-align: center; width: 934px; height: 348px;">
                <div class="keyboard-visual">
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
              </div>
            </div>

            <div style="width: 80px; margin-left: 20px; margin-right: 10px;">
              <button id="kbd-light-wasd" class="layui-btn layui-gray-button" style="width: 80px; margin-left: 10px; margin-top: 30px;">WASD</button>
              <button id="kbd-light-select-all" class="layui-btn layui-gray-button" style="width: 80px; margin-top: 20px;">{{ $t('STRID_KBD_SELECT_ALL') }}</button>
              <button id="kbd-light-reverse-all" class="layui-btn layui-gray-button" style="width: 80px; margin-top: 20px;">{{ $t('STRID_KBD_REVERSE_ALL') }}</button>
              <button id="kbd-light-clear" class="layui-btn layui-gray-button" style="width: 80px; margin-top: 20px;">{{ $t('STRID_CLEAR') }}</button>
            </div>
          </div>
        </td>
      </tr>

      <tr>
        <td style="width: 100%; align-content: center;">
          <div id="tab-kbd-setting-light-type" class="layui-tab layui-tab-brief">
            <ul id="kbd-light-type-list" class="layui-tab-title" style="width: auto;">
              <li :class="{ 'layui-this': kbdStore.activeSettingType === 0 }" @click="kbdStore.activeSettingType = 0">{{ $t('STRID_KBD_LIGHT_KEY') }}</li>
              <li :class="{ 'layui-this': kbdStore.activeSettingType === 1 }" @click="kbdStore.activeSettingType = 1">{{ $t('STRID_KBD_LIGHT_BOX') }}</li>
            </ul>
            <div class="layui-tab-content">
              <div class="layui-tab-item" :class="{ 'layui-show': kbdStore.activeSettingType === 0 }">
                <div id="kbd-setting-light-container" style="width: 1020px; margin-top: 20px;">
                  <div style="display: flex; margin-left: 40px; margin-bottom: 10px;">
                    <div style="width: 425px;">
                      <div style="width: 100%;">
                        <div class="layui-setting-title-container">
                          <div class="layui-setting-title-bar" style="margin-right: 2px;"></div>
                          <p class="layui-setting-title">{{ $t('STRID_KBD_LIGHT_MODE') }}</p>
                        </div>
                        <div class="layui-form" style="margin-top: 10px;">
                          <select v-model="kbdStore.light.mode" class="layui-input" style="width: 150px; height: 40px;">
                            <option v-for="mode in lightModes" :key="mode.value" :value="mode.value">
                              {{ mode.label }}
                            </option>
                          </select>
                        </div>
                        <div style="margin-top: 20px;">
                          <p style="color: gray;">{{ $t('STRID_KBD_LIGHT_MODE_HINT') }}</p>
                        </div>
                      </div>
                      <div style="width: 100%; margin-top: 20px;">
                        <div class="layui-setting-title-container">
                          <div class="layui-setting-title-bar" style="margin-right: 2px;"></div>
                          <p class="layui-setting-title">{{ $t('STRID_SETTING_SLEEP_TIME') }}</p>
                        </div>
                        <div class="layui-form" style="margin-top: 10px;">
                          <input type="number" v-model.number="kbdStore.light.sleepTime" class="layui-input" style="width: 150px; height: 40px;" />
                        </div>
                        <div style="margin-top: 20px;">
                          <p style="color: gray;">{{ $t('STRID_SETTING_SLEEP_TIME_TIPS') }}</p>
                        </div>
                      </div>
                    </div>

                    <div style="width: 440px; margin-left: 55px;">
                      <div class="layui-setting-title-container" style="height: 40px;">
                        <div class="layui-setting-title-bar" style="margin-right: 2px;"></div>
                        <p class="layui-setting-title" style="width: 280px;">{{ $t('STRID_KBD_LIGHT_PARAM_SETTING') }}</p>
                        <div id="kbd-light-button-container" style="display: none; margin-left: 10px;">
                          <button id="kbd-light-cancel" class="layui-btn layui-gray-button">{{ $t('STRING_CANCEL') }}</button>
                          <button id="kbd-light-save" class="layui-btn layui-bg-blue" style="margin-left: 20px;">{{ $t('STRID_SAVE') }}</button>
                        </div>
                      </div>

                      <div class="layui-sub-setting-section" style="width: 440px; margin-top: 10px;">
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

                        <div id="kbd-light-global-brightness-container" style="margin-top: 20px;">
                          <p>{{ $t('STRID_KBD_LIGHT_GLOBAL_BRIGHTNESS') }}</p>
                          <div style="display: flex; margin-left: 8px; margin-top: 20px;">
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

                        <div id="kbd-light-global-speed-container">
                          <p>{{ $t('STRID_KBD_LIGHT_GLOBAL_SPEED') }}</p>
                          <div style="display: flex; margin-left: 8px; margin-top: 20px;">
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
              </div>
              <div class="layui-tab-item" :class="{ 'layui-show': kbdStore.activeSettingType === 1 }">
                <div id="kbd-setting-light-box-container" style="width: 1020px; margin-top: 20px;">
                  <div style="display: flex; margin-left: 40px; margin-bottom: 10px;">
                    <div style="width: 425px;">
                      <div style="width: 100%;">
                        <div class="layui-setting-title-container">
                          <div class="layui-setting-title-bar" style="margin-right: 2px;"></div>
                          <p class="layui-setting-title">{{ $t('STRID_KBD_LIGHT_MODE') }}</p>
                        </div>
                        <div class="layui-form" style="margin-top: 10px;">
                          <select v-model="kbdStore.lightBox.mode" class="layui-input" style="width: 150px; height: 40px;">
                            <option v-for="mode in lightModes" :key="mode.value" :value="mode.value">
                              {{ mode.label }}
                            </option>
                          </select>
                        </div>
                        <div style="display: flex; margin-top: 20px;">
                          <p class="layui-setting-title" style="margin-right: 10px; margin-top: 6px;">{{ $t('STRID_KBD_LIGHT_BOX_COLORED') }}</p>
                          <input type="checkbox" v-model="kbdStore.lightBox.colored" lay-skin="switch" />
                        </div>
                      </div>
                    </div>

                    <div style="width: 440px; margin-left: 55px;">
                      <div class="layui-setting-title-container" style="height: 40px;">
                        <div class="layui-setting-title-bar" style="margin-right: 2px;"></div>
                        <p class="layui-setting-title" style="width: 280px;">{{ $t('STRID_KBD_LIGHT_PARAM_SETTING') }}</p>
                      </div>

                      <div class="layui-sub-setting-section" style="width: 440px; margin-top: 10px;">
                        <div style="display: flex; align-items: center;">
                          <p>{{ $t('STRID_KBD_LIGHT_COLOR_SELECT') }}</p>
                          <input
                            type="color"
                            v-model="kbdStore.lightBox.color"
                            style="background-color: #202020; border: 1px solid gray; margin-left: 10px; cursor: pointer;"
                          />
                        </div>
                        <div style="display: flex; text-align: center; align-items: center; margin-top: 10px;">
                          <p style="width: 60px;">R</p>
                          <p style="width: 60px; margin-left: 40px;">G</p>
                          <p style="width: 60px; margin-left: 40px;">B</p>
                        </div>
                        <div style="display: flex; align-items: center; margin-top: 4px;">
                          <input type="number" class="layui-input" min="0" max="255" style="width: 80px;" />
                          <input type="number" class="layui-input" min="0" max="255" style="width: 80px; margin-left: 20px;" />
                          <input type="number" class="layui-input" min="0" max="255" style="width: 80px; margin-left: 20px;" />
                        </div>

                        <div id="kbd-light-box-global-brightness-container" style="margin-top: 20px;">
                          <p>{{ $t('STRID_KBD_LIGHT_GLOBAL_BRIGHTNESS') }}</p>
                          <div style="display: flex; margin-left: 8px; margin-top: 20px;">
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

                        <div id="kbd-light-box-global-speed-container">
                          <p>{{ $t('STRID_KBD_LIGHT_GLOBAL_SPEED') }}</p>
                          <div style="display: flex; margin-left: 8px; margin-top: 20px;">
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
              <div class="layui-tab-item layui-show"></div>
            </div>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
.keyboard-visual {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.key-grid {
  display: grid;
  grid-template-columns: repeat(14, 1fr);
  gap: 4px;
  width: 100%;
  max-width: 900px;
}

.key-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--lay-color-border);
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
  color: var(--lay-color-text);
}

.key-cell:hover {
  border-color: var(--rawm-green);
}
</style>
