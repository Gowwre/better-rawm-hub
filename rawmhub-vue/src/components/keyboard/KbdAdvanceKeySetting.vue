<script setup lang="ts">
import { useKeyboardSettingsStore } from '@/stores/keyboardSettings'

const kbdStore = useKeyboardSettingsStore()

const advanceKeyTypes = [
  { id: 0, label: 'STRID_KBD_SOCD_SETTING' },
  { id: 1, label: 'STRID_KBD_MT_SETTING' },
  { id: 2, label: 'STRID_KBD_RS_SETTING' },
  { id: 3, label: 'STRID_KBD_DKS_SETTING' },
]

function selectType(id: number) {
  kbdStore.activeSettingType = id
}

function selectSocdKey1() {
  kbdStore.socd.key1 = kbdStore.selectedKey || ''
}

function selectSocdKey2() {
  kbdStore.socd.key2 = kbdStore.selectedKey || ''
}

function selectMtKey() {
  kbdStore.mt.key = kbdStore.selectedKey || ''
}

function selectMtLongPressKey() {
  kbdStore.mt.longPressKey = kbdStore.selectedKey || ''
}

function selectRsKey1() {
  kbdStore.rs.key1 = kbdStore.selectedKey || ''
}

function selectRsKey2() {
  kbdStore.rs.key2 = kbdStore.selectedKey || ''
}

function selectDksKey(index: number) {
  if (kbdStore.selectedKey) {
    kbdStore.dks.keys[index].key = kbdStore.selectedKey
  }
}

function cleanDksKey(index: number) {
  kbdStore.clearDksKey(index)
}
</script>

<template>
  <div id="kbd-main-setting-advance-key-container" class="key-shortcuts-table">
    <table style="width: 100%; margin-bottom: 30px;">
      <tr>
        <td style="width: 100%; min-width: 640px;">
          <div style="display: flex;">
            <div style="margin-left: 40px;">
              <div id="kbd-mapping-advance-key-container" style="text-align: center; width: 934px; height: 348px;">
                <div class="keyboard-visual">
                  <div class="key-grid">
                    <div
                      v-for="i in 60"
                      :key="i"
                      class="key-cell"
                      :class="{ selected: kbdStore.selectedKey === `key${i}` }"
                      @click="kbdStore.selectedKey = `key${i}`"
                    >
                      {{ i }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div id="kbd-advance-key-desc-container" style="text-align: center; width: 300px; height: 200px; margin-left: 40px; margin-top: 150px; border: 1px solid gray;">
              <table style="align-items: center; width: 100%;">
                <tr>
                  <td style="width: 300px; height: 50px; align-items: center; justify-content: center;">
                    <p id="kbd-advance-key-desc-title" class="layui-setting-title" style="color: gray;">{{ $t('STRID_KBD_CURRENT_KEY_FUNCTION') }}</p>
                  </td>
                </tr>
                <tr>
                  <td style="width: 300px; height: 1px; align-items: center; justify-content: center;">
                    <div id="kbd-advance-key-desc-line" style="width: 300px; height: 1px; background-color: gray;"></div>
                  </td>
                </tr>
                <tr>
                  <td style="display: flex; width: 300px; height: 95px; align-items: center; justify-content: center;">
                    <p v-if="!kbdStore.selectedKey" style="font-size: medium; color: gray;">{{ $t('STRID_KBD_NO_KEY_SELECTED') }}</p>
                    <template v-else>
                      <p style="font-size: medium; color: gray;">{{ kbdStore.selectedKey }}</p>
                    </template>
                  </td>
                </tr>
                <tr>
                  <td style="width: 300px; height: 50px; align-items: center; justify-content: center; display: flex;">
                    <button id="kbd-advance-key-delete" class="layui-btn layui-key-desc-button" :disabled="!kbdStore.selectedKey">
                      {{ $t('STRID_DELETE') }}
                    </button>
                    <button id="kbd-advance-key-set" class="layui-btn layui-key-desc-button" style="margin-left: 90px;" :disabled="!kbdStore.selectedKey">
                      {{ $t('STRING_OK') }}
                    </button>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </td>
      </tr>

      <tr>
        <td style="width: 100%; align-content: center;">
          <div id="tab-kbd-setting-advance-key-type" class="layui-tab layui-tab-brief">
            <ul id="kbd-advance-key-type-list" class="layui-tab-title" style="width: auto;">
              <li
                v-for="type in advanceKeyTypes"
                :key="type.id"
                :class="{ 'layui-this': kbdStore.activeSettingType === type.id }"
                @click="selectType(type.id)"
              >
                {{ $t(type.label) }}
              </li>
            </ul>
            <div class="layui-tab-content">
              <div class="layui-tab-item" :class="{ 'layui-show': kbdStore.activeSettingType === 0 }">
                <div id="kbd-setting-socd-container" style="width: auto; padding-left: 20px; padding-right: 20px;">
                  <div style="display: flex; margin-top: 10px;">
                    <p>{{ $t('STRID_KBD_FUNCTION_DESC') }}</p>
                    <p>{{ $t('STRID_KBD_SOCD_DESC') }}</p>
                  </div>
                  <div class="layui-setting-title-container" style="margin-top: 20px;">
                    <div class="layui-setting-title-bar" style="margin-right: 4px;"></div>
                    <p>{{ $t('STRID_KBD_SOCD_SELECT_TWO_KEY') }}</p>
                  </div>
                  <div style="display: flex; margin-left: 60px; margin-top: 10px;">
                    <button id="kbd-socd-key1" class="layui-btn layui-key-desc-button" style="width: 100px; margin-top: 10px; border: 1px solid gray;" @click="selectSocdKey1">
                      {{ kbdStore.socd.key1 || $t('STRID_KBD_SOCD_KEY1') }}
                    </button>
                    <div style="height: 100%; margin-left: 20px; margin-right: 20px;">
                      <p style="font-size: larger; margin-top: 20px;">+</p>
                    </div>
                    <button id="kbd-socd-key2" class="layui-btn layui-key-desc-button" style="width: 100px; margin-top: 10px; border: 1px solid gray;" @click="selectSocdKey2">
                      {{ kbdStore.socd.key2 || $t('STRID_KBD_SOCD_KEY2') }}
                    </button>
                  </div>
                  <div style="margin-top: 20px; margin-left: 70px;">
                    <p style="color: gray;">{{ $t('STRID_KBD_SOCD_HINT') }}</p>
                  </div>
                  <div class="layui-setting-title-container" style="margin-top: 20px;">
                    <div class="layui-setting-title-bar" style="margin-right: 4px;"></div>
                    <p>{{ $t('STRID_KBD_SOCD_SELECT_FUNCTION') }}</p>
                  </div>
                  <div class="layui-form" style="margin-left: 10px; margin-bottom: 10px;">
                    <label>
                      <input type="radio" name="kbd-socd-type" v-model.number="kbdStore.socd.type" :value="0" />
                      {{ $t('STRID_KBD_SOCD_TYPE1') }}
                    </label>
                    <label>
                      <input type="radio" name="kbd-socd-type" v-model.number="kbdStore.socd.type" :value="1" />
                      {{ $t('STRID_KBD_SOCD_TYPE2') }}
                    </label>
                    <label>
                      <input type="radio" name="kbd-socd-type" v-model.number="kbdStore.socd.type" :value="2" />
                      {{ $t('STRID_KBD_SOCD_TYPE3') }}
                    </label>
                    <label>
                      <input type="radio" name="kbd-socd-type" v-model.number="kbdStore.socd.type" :value="3" />
                      {{ $t('STRID_KBD_SOCD_TYPE4') }}
                    </label>
                  </div>
                </div>
              </div>

              <div class="layui-tab-item" :class="{ 'layui-show': kbdStore.activeSettingType === 1 }">
                <div id="kbd-setting-mt-container" style="width: auto; padding-left: 20px; padding-right: 20px;">
                  <div style="display: flex; margin-top: 10px;">
                    <p>{{ $t('STRID_KBD_FUNCTION_DESC') }}</p>
                    <p>{{ $t('STRID_KBD_MT_DESC') }}</p>
                  </div>
                  <div style="display: flex; margin-left: 60px; margin-top: 20px;">
                    <div style="align-items: center; justify-content: center; width: 100px;">
                      <p style="text-align: center; width: 100px;">{{ $t('STRID_KBD_MT_PRESS') }}</p>
                      <button id="kbd-mt-key1" class="layui-btn layui-key-desc-button" style="width: 100px; margin-top: 10px; border: 1px solid gray;" @click="selectMtKey">
                        {{ kbdStore.mt.key || $t('STRID_KBD_MT_SELECT_KEY') }}
                      </button>
                    </div>
                    <div style="align-items: center; justify-content: center; width: 100px; margin-left: 60px;">
                      <p style="text-align: center; width: 100px;">{{ $t('STRID_KBD_MT_LONGPRESS') }}</p>
                      <button id="kbd-mt-key2" class="layui-btn layui-key-desc-button" style="width: 100px; margin-top: 10px; border: 1px solid gray;" @click="selectMtLongPressKey">
                        {{ kbdStore.mt.longPressKey || $t('STRID_KBD_MT_SELECT_KEY') }}
                      </button>
                    </div>
                  </div>
                  <div style="margin-top: 20px; margin-left: 70px;">
                    <p style="color: gray;">{{ $t('STRID_KBD_MT_HINT') }}</p>
                  </div>
                  <p style="margin-top: 20px;">{{ $t('STRID_KBD_MT_LONGPRESS_TIME') }}</p>
                  <div style="display: flex; margin-top: 20px; height: 30px; margin-bottom: 10px;">
                    <input
                      type="range"
                      v-model.number="kbdStore.mt.longPressTime"
                      min="50"
                      max="1000"
                      step="50"
                      class="layui-slider"
                      style="width: 400px;"
                    />
                    <p style="margin-left: 10px; margin-top: -6px;">{{ kbdStore.mt.longPressTime }}ms</p>
                  </div>
                </div>
              </div>

              <div class="layui-tab-item" :class="{ 'layui-show': kbdStore.activeSettingType === 2 }">
                <div id="kbd-setting-rs-container" style="width: auto; padding-left: 20px; padding-right: 20px;">
                  <div style="display: flex; margin-top: 10px;">
                    <p>{{ $t('STRID_KBD_FUNCTION_DESC') }}</p>
                    <p>{{ $t('STRID_KBD_RS_DESC') }}</p>
                  </div>
                  <div class="layui-setting-title-container" style="margin-top: 20px;">
                    <div class="layui-setting-title-bar" style="margin-right: 4px;"></div>
                    <p>{{ $t('STRID_KBD_SOCD_SELECT_TWO_KEY') }}</p>
                  </div>
                  <div style="display: flex; margin-left: 60px; margin-top: 10px;">
                    <button id="kbd-rs-key1" class="layui-btn layui-key-desc-button" style="width: 100px; margin-top: 10px; border: 1px solid gray;" @click="selectRsKey1">
                      {{ kbdStore.rs.key1 || $t('STRID_KBD_SOCD_KEY1') }}
                    </button>
                    <div style="height: 100%; margin-left: 20px; margin-right: 20px;">
                      <p style="font-size: larger; margin-top: 20px;">+</p>
                    </div>
                    <button id="kbd-rs-key2" class="layui-btn layui-key-desc-button" style="width: 100px; margin-top: 10px; border: 1px solid gray;" @click="selectRsKey2">
                      {{ kbdStore.rs.key2 || $t('STRID_KBD_SOCD_KEY2') }}
                    </button>
                  </div>
                  <div style="margin-top: 20px; margin-left: 70px;">
                    <p style="color: gray;">{{ $t('STRID_KBD_SOCD_HINT') }}</p>
                  </div>
                </div>
              </div>

              <div class="layui-tab-item" :class="{ 'layui-show': kbdStore.activeSettingType === 3 }">
                <div id="kbd-setting-dks-container" style="width: auto;">
                  <div style="display: flex; margin-top: 10px; margin-left: 20px;">
                    <p>{{ $t('STRID_KBD_FUNCTION_DESC') }}</p>
                    <p>{{ $t('STRID_KBD_DKS_DESC') }}</p>
                  </div>
                  <div style="display: flex; margin-left: 100px; margin-top: 20px;">
                    <div style="width: 80px; align-items: center; justify-content: center;">
                      <p style="text-align: center;">{{ $t('STRID_KBD_DKS_START_PRESS') }}</p>
                      <p style="text-align: center; color: #16B777; margin-top: 10px;">1.00mm</p>
                    </div>
                    <div style="width: 80px; align-items: center; justify-content: center;">
                      <p style="text-align: center;">{{ $t('STRID_KBD_DKS_BOTTOM_PRESS') }}</p>
                      <p style="text-align: center; color: #16B777; margin-top: 10px;">3.40mm</p>
                    </div>
                    <div style="width: 80px; align-items: center; justify-content: center;">
                      <p style="text-align: center;">{{ $t('STRID_KBD_DKS_BOTTOM_RELEASE') }}</p>
                      <p style="text-align: center; color: #16B777; margin-top: 10px;">3.40mm</p>
                    </div>
                    <div style="width: 80px; align-items: center; justify-content: center;">
                      <p style="text-align: center;">{{ $t('STRID_KBD_DKS_FULL_RELEASE') }}</p>
                      <p style="text-align: center; color: #16B777; margin-top: 10px;">1.00mm</p>
                    </div>
                    <div style="width: 80px; align-items: center; justify-content: center;">
                      <p style="text-align: center;">{{ $t('STRID_CLEAR') }}</p>
                    </div>
                  </div>

                  <div v-for="(dksKey, index) in kbdStore.dks.keys" :key="index" style="display: flex; margin-left: 20px; margin-top: 20px;">
                    <button class="layui-btn layui-key-desc-button" style="width: 80px; height: 40px; border: 1px solid gray;" @click="selectDksKey(index)">
                      {{ dksKey.key || $t('STRID_KBD_MT_SELECT_KEY') }}
                    </button>
                    <div style="display: flex; width: 320px; height: 20px; margin-left: 30px; margin-top: 10px; position: relative;">
                      <div
                        v-for="actionIndex in 4"
                        :key="actionIndex"
                        class="rounded-border"
                        style="position: absolute; width: 20px; height: 20px; cursor: pointer;"
                        :style="{ marginLeft: `${(actionIndex - 1) * 80}px` }"
                        @click="kbdStore.setDksKey(index, kbdStore.selectedKey || '', actionIndex - 1, kbdStore.selectedKey || '')"
                      >
                        <p style="text-align: center; font-size: x-large; color: black; margin-top: -4px;">
                          {{ dksKey.actions[actionIndex - 1] ? '●' : '+' }}
                        </p>
                        <div
                          v-if="dksKey.actions[actionIndex - 1]"
                          style="position: absolute; width: 10px; height: 20px; margin-left: 14px; cursor: e-resize;"
                        >
                          <p style="user-select: none; text-align: center; font-size: x-large; font-weight: bold; color: white; margin-top: -5px;">›</p>
                        </div>
                      </div>
                      <div
                        class="rounded-border"
                        style="position: absolute; width: 20px; height: 20px; margin-left: 320px; cursor: pointer;"
                        @click="cleanDksKey(index)"
                      >
                        <p style="text-align: center; font-size: x-large; color: black; margin-top: -3px;">×</p>
                      </div>
                    </div>
                  </div>

                  <div style="margin-top: 20px; margin-bottom: 20px; margin-left: 120px;">
                    <p style="color: gray;">{{ $t('STRID_KBD_MT_HINT') }}</p>
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
</style>
