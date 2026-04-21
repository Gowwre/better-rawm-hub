<script setup lang="ts">
import { ref } from 'vue'
import { useKeyboardSettingsStore } from '@/stores/keyboardSettings'

const kbdStore = useKeyboardSettingsStore()

const keyTypes = [
  { id: 0, label: 'STRID_KBD_AND_MOUSE' },
  { id: 1, label: 'STRID_KBD_FUNCTION_KEY' },
  { id: 2, label: 'STRID_SETTING_MAPPING_TYPE_MACRO' },
]

const commonKeys = [
  ['Esc', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
  ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'],
  ['Caps', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", 'Enter'],
  ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'Shift'],
  ['Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Fn', 'Ctrl'],
]

const mouseKeys = ['Left', 'Right', 'Middle', 'Back', 'Forward']

const functionKeys = ['RGB Cycle', 'RGB+', 'RGB-', 'Brightness+', 'Brightness-', 'Media Play', 'Media Prev', 'Media Next', 'Volume+', 'Volume-', 'Mute']

const macroList = [
  { id: 1, name: 'Macro 1' },
  { id: 2, name: 'Macro 2' },
]

function selectKey(key: string) {
  kbdStore.selectedKey = key
}

function selectMacro(macroId: number) {
  kbdStore.currentMacroId = macroId
}
</script>

<template>
  <div id="kbd-main-setting-key-container" class="kbd-key-container">
    <div class="kbd-key-layout">
      <div class="keyboard-visual">
        <div class="key-grid">
          <template v-for="(row, rowIndex) in commonKeys" :key="rowIndex">
            <div
              v-for="key in row"
              :key="key"
              class="key-cell"
              :class="{
                selected: kbdStore.selectedKey === key,
                wide: ['Backspace', 'Tab', 'Caps', 'Enter', 'Shift'].includes(key) && key !== 'Shift',
                wider: key === 'Shift' || key === 'Space',
                widest: false,
              }"
              @click="selectKey(key)"
            >
              {{ key }}
            </div>
          </template>
        </div>
      </div>

      <div class="key-desc-panel">
        <table>
          <tbody>
            <tr>
              <td>
                <p class="layui-setting-title" style="color: gray;">{{ $t('STRID_KBD_CURRENT_KEY_FUNCTION') }}</p>
              </td>
            </tr>
            <tr>
              <td>
                <div style="width: 300px; height: 1px; background-color: gray;"></div>
              </td>
            </tr>
            <tr>
              <td style="display: flex; height: 95px; align-items: center; justify-content: center;">
                <p v-if="!kbdStore.selectedKey" style="font-size: medium; color: gray;">{{ $t('STRID_KBD_NO_KEY_SELECTED') }}</p>
                <template v-else>
                  <p style="font-size: medium; color: gray;">{{ kbdStore.selectedKey }}</p>
                  <p v-if="kbdStore.selectedFunction" style="margin-left: 20px; margin-right: 20px; font: bold; font-size: large; color: gray;">→</p>
                  <p v-if="kbdStore.selectedFunction" style="font-size: medium; color: #16B777;">{{ kbdStore.selectedFunction }}</p>
                </template>
              </td>
            </tr>
            <tr>
              <td style="display: flex; height: 50px; align-items: center; justify-content: center;">
                <button class="layui-btn layui-key-desc-button" :disabled="!kbdStore.selectedKey">
                  {{ $t('STRID_KBD_DEFAULT_SETTING') }}
                </button>
                <button class="layui-btn layui-key-desc-button" style="margin-left: 90px;" :disabled="!kbdStore.selectedKey">
                  {{ $t('STRING_OK') }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="key-layer-selector">
        <table>
          <tbody>
            <tr>
              <td>
                <p class="layui-setting-title">{{ $t('STRID_KBD_KEY_LAYER') }}</p>
              </td>
              <td>
                <div class="layui-form" style="margin-left: 10px;">
                  <label>
                    <input type="radio" name="kbd-key-layer" v-model="kbdStore.keyLayer" value="default" />
                    {{ $t('STRID_SETTING_DEFAULT') }}
                  </label>
                  <label>
                    <input type="radio" name="kbd-key-layer" v-model="kbdStore.keyLayer" value="fn" />
                    {{ $t('STRID_KBD_KEY_FN_LAYER') }}
                  </label>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="key-type-tabs">
      <div
        v-for="type in keyTypes"
        :key="type.id"
        class="tab-item"
        :class="{ active: kbdStore.activeSettingType === type.id }"
        @click="kbdStore.activeSettingType = type.id"
      >
        {{ $t(type.label) }}
      </div>
    </div>

    <div class="key-type-content">
      <div v-if="kbdStore.activeSettingType === 0" class="base-keys">
        <div class="select-key-container">
          <div class="key-grid" style="grid-template-columns: repeat(14, 1fr);">
            <div
              v-for="row in commonKeys"
              :key="row.join('-')"
              style="display: contents;"
            >
              <div
                v-for="key in row"
                :key="key"
                class="key-cell"
                :class="{ selected: kbdStore.selectedKey === key }"
                @click="selectKey(key)"
              >
                {{ key }}
              </div>
            </div>
          </div>
        </div>
        <div class="layui-setting-title-container" style="margin-top: 15px;">
          <div class="layui-setting-title-bar" style="margin-right: 4px;"></div>
          <p>{{ $t('STRID_KBD_MOUSE_KEY') }}</p>
        </div>
        <div class="mouse-keys">
          <div
            v-for="key in mouseKeys"
            :key="key"
            class="key-cell"
            :class="{ selected: kbdStore.selectedKey === key }"
            @click="selectKey(key)"
          >
            {{ key }}
          </div>
        </div>
      </div>

      <div v-if="kbdStore.activeSettingType === 1" class="function-keys">
        <div class="layui-setting-title-container">
          <div class="layui-setting-title-bar" style="margin-right: 4px;"></div>
          <p>{{ $t('STRID_KBD_KEY_RGB_CONTROL') }}</p>
        </div>
        <div class="function-keys-grid">
          <div
            v-for="key in functionKeys.slice(0, 6)"
            :key="key"
            class="key-cell"
            @click="selectKey(key)"
          >
            {{ key }}
          </div>
        </div>

        <div class="layui-setting-title-container" style="margin-top: 20px;">
          <div class="layui-setting-title-bar" style="margin-right: 4px;"></div>
          <p>{{ $t('STRID_KBD_KEY_MEDIA_CONTROL') }}</p>
        </div>
        <div class="function-keys-grid">
          <div
            v-for="key in functionKeys.slice(6)"
            :key="key"
            class="key-cell"
            @click="selectKey(key)"
          >
            {{ key }}
          </div>
        </div>

        <div class="layui-setting-title-container" style="margin-top: 20px;">
          <div class="layui-setting-title-bar" style="margin-right: 4px;"></div>
          <p>{{ $t('STRID_KBD_KEY_WINDOWS') }}</p>
        </div>
        <div style="margin-top: 20px;">
          <button class="layui-btn layui-hover-bg" style="height: 37px;">{{ $t('STRID_KBD_SWITCH_WASD') }}</button>
          <p style="margin-top: 10px; color: gray; font-size: 13px;">{{ $t('STRID_KBD_SWITCH_WASD_HINT') }}</p>
        </div>
        <div style="margin-top: 20px;">
          <button class="layui-btn layui-hover-bg" style="height: 37px;">{{ $t('STRID_KBD_SWITCH_MAC_MODE') }}</button>
          <p style="margin-top: 10px; color: gray; font-size: 13px;">{{ $t('STRID_KBD_SWITCH_MAC_MODE_HINT') }}</p>
        </div>
      </div>

      <div v-if="kbdStore.activeSettingType === 2" class="macro-keys">
        <div style="display: flex; gap: 30px;">
          <div>
            <div class="layui-setting-title-container">
              <div class="layui-setting-title-bar" style="margin-right: 2px;"></div>
              <p class="layui-setting-title">{{ $t('STRID_KBD_MACRO_LIST') }}</p>
            </div>
            <div class="layui-sub-setting-section" style="width: 440px; height: 300px; margin-top: 10px;">
              <div
                v-for="macro in macroList"
                :key="macro.id"
                class="macro-action-item"
                :class="{ active: kbdStore.currentMacroId === macro.id }"
                @click="selectMacro(macro.id)"
              >
                {{ macro.name }}
              </div>
            </div>
          </div>
          <div>
            <div class="layui-setting-title-container">
              <div class="layui-setting-title-bar" style="margin-right: 2px;"></div>
              <p class="layui-setting-title">{{ $t('STRID_KBD_MACRO_ACTION') }}</p>
            </div>
            <div class="layui-sub-setting-section" style="width: 800px; height: 300px; margin-top: 10px;">
              <div style="width: 100%; height: 240px; overflow: scroll;">
                <p style="color: gray; text-align: center; margin-top: 100px;">{{ $t('STRID_KBD_NO_KEY_SELECTED') }}</p>
              </div>
              <div style="display: flex; margin-left: 200px; margin-top: 10px;">
                <button class="layui-btn layui-gray-button" style="width: 80px;">{{ $t('STRID_SETTING_MAPPING_MACRO_RECORD') }}</button>
                <button class="layui-btn layui-gray-button" style="width: 80px; margin-left: 20px;">{{ $t('STRID_SETTING_MAPPING_MACRO_ACTION_ADD_S') }}</button>
                <button class="layui-btn layui-gray-button" style="width: 80px; margin-left: 20px;">{{ $t('STRID_CLEAR') }}</button>
                <button class="layui-btn layui-gray-button" style="width: 80px; margin-left: 20px;">{{ $t('STRID_SAVE') }}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.kbd-key-container {
  width: 100%;
}

.kbd-key-layout {
  display: flex;
  gap: 40px;
  margin-bottom: 30px;
}

.keyboard-visual {
  flex: 1;
}

.key-desc-panel {
  text-align: center;
  width: 300px;
  height: 200px;
  margin-top: 150px;
  border: 1px solid gray;
  border-radius: 4px;
}

.key-layer-selector {
  margin-left: 20px;
  margin-top: 20px;
}

.key-type-tabs {
  display: flex;
  gap: 0;
  border-bottom: 1px solid #444;
  margin-bottom: 15px;
}

.key-type-content {
  min-height: 300px;
}

.base-keys, .function-keys, .macro-keys {
  padding: 10px;
}

.select-key-container {
  width: 100%;
  min-height: 200px;
}

.mouse-keys {
  display: flex;
  gap: 5px;
  margin-top: 10px;
}

.function-keys-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 10px;
}

.macro-action-item {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  margin: 4px 0;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.macro-action-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.macro-action-item.active {
  background-color: #16B777;
  color: white;
}
</style>
