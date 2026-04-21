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
  <div id="kbd-main-setting-key-container" class="key-shortcuts-table">
    <table style="width: 100%; margin-bottom: 30px;">
      <tr>
        <td style="width: 100%; min-width: 640px;">
          <div style="display: flex;">
            <div style="margin-left: 40px;">
              <div id="kbd-mapping-key-container" style="text-align: center; width: 934px; height: 348px;">
                <div class="keyboard-visual">
                  <div class="key-grid">
                    <template v-for="(row, rowIndex) in commonKeys" :key="rowIndex">
                      <div
                        v-for="key in row"
                        :key="key"
                        class="key-cell"
                        :class="{
                          selected: kbdStore.selectedKey === key,
                          wide: key === 'Backspace' || key === 'Tab' || key === 'Caps' || key === 'Enter',
                          wider: key === 'Shift' || key === 'Space',
                        }"
                        @click="selectKey(key)"
                      >
                        {{ key }}
                      </div>
                    </template>
                  </div>
                </div>
              </div>
            </div>

            <div class="layui-container layui-auto-zoom" style="width: 20%; margin-left: 40px;">
              <div id="kbd-key-layer-container" style="margin-left: 20px; margin-top: 20px;">
                <table>
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
                </table>
              </div>

              <div id="kbd-key-desc-container" style="text-align: center; width: 300px; height: 200px; margin-top: 96px; border: 1px solid gray;">
                <table style="align-items: center; width: 100%;">
                  <tr>
                    <td style="width: 300px; height: 50px; align-items: center; justify-content: center;">
                      <p id="kbd-key-desc-title" class="layui-setting-title" style="color: gray;">{{ $t('STRID_KBD_CURRENT_KEY_FUNCTION') }}</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="width: 300px; height: 1px; align-items: center; justify-content: center;">
                      <div id="kbd-key-desc-line" style="width: 300px; height: 1px; background-color: gray;"></div>
                    </td>
                  </tr>
                  <tr>
                    <td style="display: flex; width: 300px; height: 95px; align-items: center; justify-content: center;">
                      <p v-if="!kbdStore.selectedKey" style="font-size: medium; color: gray;">{{ $t('STRID_KBD_NO_KEY_SELECTED') }}</p>
                      <template v-else>
                        <p style="font-size: medium; color: gray;">{{ kbdStore.selectedKey }}</p>
                        <p v-if="kbdStore.selectedFunction" style="margin-left: 20px; margin-right: 20px; font-weight: bold; font-size: large; color: gray;">→</p>
                        <p v-if="kbdStore.selectedFunction" style="font-size: medium; color: #16B777;">{{ kbdStore.selectedFunction }}</p>
                      </template>
                    </td>
                  </tr>
                  <tr>
                    <td style="width: 300px; height: 50px; align-items: center; justify-content: center; display: flex;">
                      <button id="kbd-key-default" class="layui-btn layui-key-desc-button" :disabled="!kbdStore.selectedKey">
                        {{ $t('STRID_KBD_DEFAULT_SETTING') }}
                      </button>
                      <button id="kbd-key-set" class="layui-btn layui-key-desc-button" style="margin-left: 90px;" :disabled="!kbdStore.selectedKey">
                        {{ $t('STRING_OK') }}
                      </button>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </td>
      </tr>

      <tr>
        <td style="width: 100%; align-content: center;">
          <div id="tab-kbd-setting-key-type" class="layui-tab layui-tab-brief">
            <ul id="kbd-key-type-list" class="layui-tab-title" style="width: auto;">
              <li :class="{ 'layui-this': kbdStore.activeSettingType === 0 }" @click="kbdStore.activeSettingType = 0">{{ $t('STRID_KBD_AND_MOUSE') }}</li>
              <li :class="{ 'layui-this': kbdStore.activeSettingType === 1 }" @click="kbdStore.activeSettingType = 1">{{ $t('STRID_KBD_FUNCTION_KEY') }}</li>
              <li :class="{ 'layui-this': kbdStore.activeSettingType === 2 }" @click="kbdStore.activeSettingType = 2">{{ $t('STRID_SETTING_MAPPING_TYPE_MACRO') }}</li>
            </ul>
            <div class="layui-tab-content">
              <div class="layui-tab-item" :class="{ 'layui-show': kbdStore.activeSettingType === 0 }">
                <div id="kbd-setting-key-base-container" style="width: auto;">
                  <div id="select-key-container" style="width: 100%; height: 280px; margin-left: 20px;">
                    <div class="key-grid" style="grid-template-columns: repeat(14, 1fr);">
                      <template v-for="(row, rowIndex) in commonKeys" :key="rowIndex">
                        <div
                          v-for="key in row"
                          :key="key"
                          class="key-cell"
                          :class="{
                            selected: kbdStore.selectedKey === key,
                            wide: key === 'Backspace' || key === 'Tab' || key === 'Caps' || key === 'Enter',
                            wider: key === 'Shift' || key === 'Space',
                          }"
                          @click="selectKey(key)"
                        >
                          {{ key }}
                        </div>
                      </template>
                    </div>
                  </div>
                  <div class="layui-setting-title-container" style="margin-left: 20px;">
                    <div class="layui-setting-title-bar" style="margin-right: 4px;"></div>
                    <p>{{ $t('STRID_KBD_MOUSE_KEY') }}</p>
                  </div>
                  <div id="mouse-select-key-container" style="width: 100%; height: 40px; margin-left: 20px; margin-bottom: 10px; display: flex; gap: 5px; margin-top: 10px;">
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
              </div>
              <div class="layui-tab-item" :class="{ 'layui-show': kbdStore.activeSettingType === 1 }">
                <div id="kbd-setting-function-container" style="width: auto; margin-left: 10px;">
                  <div style="display: flex;">
                    <div style="width: 50%;">
                      <div class="layui-setting-title-container">
                        <div class="layui-setting-title-bar" style="margin-right: 4px;"></div>
                        <p>{{ $t('STRID_KBD_KEY_RGB_CONTROL') }}</p>
                      </div>
                      <div id="kbd-key-rgb-container" style="width: 100%; height: 40px; margin-bottom: 10px; display: flex; gap: 5px; margin-top: 10px;">
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
                      <div id="kbd-key-media-container" style="width: 100%; height: 40px; margin-bottom: 10px; display: flex; gap: 5px; margin-top: 10px;">
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
                      <div id="kbd-key-windows-container" style="width: 100%; height: 40px; margin-bottom: 10px; display: flex; gap: 5px; margin-top: 10px;">
                      </div>
                    </div>
                    <div style="margin-left: 50px;">
                      <div class="layui-setting-title-container">
                        <div class="layui-setting-title-bar" style="margin-right: 4px;"></div>
                        <p>{{ $t('STRID_KBD_OTHER') }}</p>
                      </div>
                      <div style="margin-top: 10px;">
                        <button id="kbd-key-switch-wasd" class="layui-btn layui-hover-bg" style="height: 37px;">{{ $t('STRID_KBD_SWITCH_WASD') }}</button>
                        <p style="margin-top: 10px; color: gray;">{{ $t('STRID_KBD_SWITCH_WASD_HINT') }}</p>
                      </div>
                      <div style="margin-top: 20px;">
                        <button id="kbd-key-switch-mac-mode" class="layui-btn layui-hover-bg" style="height: 37px;">{{ $t('STRID_KBD_SWITCH_MAC_MODE') }}</button>
                        <p style="margin-top: 10px; color: gray;">{{ $t('STRID_KBD_SWITCH_MAC_MODE_HINT') }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="layui-tab-item" :class="{ 'layui-show': kbdStore.activeSettingType === 2 }">
                <div id="kbd-setting-macro-container" style="width: auto; margin-left: 10px;">
                  <div style="width: auto; margin-left: 10px; display: flex;">
                    <div style="width: auto;">
                      <div class="layui-setting-title-container">
                        <div class="layui-setting-title-bar" style="margin-right: 2px;"></div>
                        <p class="layui-setting-title">{{ $t('STRID_KBD_MACRO_LIST') }}</p>
                      </div>
                      <div class="layui-sub-setting-section" style="width: 440px; height: 300px; margin-top: 10px;">
                        <div id="kbd-macro-container">
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
                    </div>
                    <div style="width: auto; margin-left: 30px;">
                      <div class="layui-setting-title-container">
                        <div class="layui-setting-title-bar" style="margin-right: 2px;"></div>
                        <p class="layui-setting-title">{{ $t('STRID_KBD_MACRO_ACTION') }}</p>
                      </div>
                      <div class="layui-sub-setting-section" style="width: 800px; height: 300px; margin-top: 10px;">
                        <div id="setting-mapping-kbd-macro-edit-panel" class="layui-form" style="width: 100%; height: 240px; margin-top: 5px; overflow: scroll; overflow-x: hidden;">
                          <div id="kbd-macro-edit-container">
                            <p style="color: gray; text-align: center; margin-top: 100px;">{{ $t('STRID_KBD_NO_KEY_SELECTED') }}</p>
                          </div>
                        </div>
                        <div style="width: 100%; margin-left: 200px; margin-top: 10px; display: flex;">
                          <button id="kbd-macro-record" class="layui-btn layui-gray-button" style="width: 80px;">{{ $t('STRID_SETTING_MAPPING_MACRO_RECORD') }}</button>
                          <button id="kbd-macro-add" class="layui-btn layui-gray-button" style="width: 80px; margin-left: 20px;">{{ $t('STRID_SETTING_MAPPING_MACRO_ACTION_ADD_S') }}</button>
                          <button id="kbd-macro-clear" class="layui-btn layui-gray-button" style="width: 80px; margin-left: 20px;">{{ $t('STRID_CLEAR') }}</button>
                          <button id="kbd-macro-save" class="layui-btn layui-gray-button" style="width: 80px; margin-left: 20px;">{{ $t('STRID_SAVE') }}</button>
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

.key-cell.selected {
  background-color: rgba(22, 183, 119, 0.2);
  border-color: var(--rawm-green);
  color: var(--rawm-green);
}

.key-cell.wide {
  grid-column: span 2;
}

.key-cell.wider {
  grid-column: span 3;
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
  background-color: var(--rawm-green);
  color: white;
}
</style>
