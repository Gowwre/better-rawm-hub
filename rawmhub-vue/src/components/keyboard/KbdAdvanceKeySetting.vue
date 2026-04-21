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
  <div id="kbd-main-setting-advance-key-container" class="kbd-advance-container">
    <div class="advance-keyboard">
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

    <div class="advance-desc-panel">
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
              </template>
            </td>
          </tr>
          <tr>
            <td style="display: flex; height: 50px; align-items: center; justify-content: center;">
              <button class="layui-btn layui-key-desc-button" :disabled="!kbdStore.selectedKey">
                {{ $t('STRID_DELETE') }}
              </button>
              <button class="layui-btn layui-key-desc-button" style="margin-left: 90px;" :disabled="!kbdStore.selectedKey">
                {{ $t('STRING_OK') }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="advance-type-tabs">
      <div
        v-for="type in advanceKeyTypes"
        :key="type.id"
        class="tab-item"
        :class="{ active: kbdStore.activeSettingType === type.id }"
        @click="selectType(type.id)"
      >
        {{ $t(type.label) }}
      </div>
    </div>

    <div class="advance-type-content">
      <div v-if="kbdStore.activeSettingType === 0" id="kbd-setting-socd-container" class="socd-container">
        <div style="display: flex; margin-top: 10px;">
          <p>{{ $t('STRID_KBD_FUNCTION_DESC') }}</p>
          <p>{{ $t('STRID_KBD_SOCD_DESC') }}</p>
        </div>
        <div class="layui-setting-title-container" style="margin-top: 20px;">
          <div class="layui-setting-title-bar" style="margin-right: 4px;"></div>
          <p>{{ $t('STRID_KBD_SOCD_SELECT_TWO_KEY') }}</p>
        </div>
        <div style="display: flex; margin-left: 60px; margin-top: 10px;">
          <button class="layui-btn layui-key-desc-button" style="width: 100px; border: 1px solid gray;" @click="selectSocdKey1">
            {{ kbdStore.socd.key1 || $t('STRID_KBD_SOCD_KEY1') }}
          </button>
          <div style="height: 100%; margin-left: 20px; margin-right: 20px;">
            <p style="font-size: larger; margin-top: 20px;">+</p>
          </div>
          <button class="layui-btn layui-key-desc-button" style="width: 100px; border: 1px solid gray;" @click="selectSocdKey2">
            {{ kbdStore.socd.key2 || $t('STRID_KBD_SOCD_KEY2') }}
          </button>
        </div>
        <p style="color: gray; margin-top: 20px; margin-left: 70px;">{{ $t('STRID_KBD_SOCD_HINT') }}</p>

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

      <div v-if="kbdStore.activeSettingType === 1" id="kbd-setting-mt-container" class="mt-container">
        <div style="display: flex; margin-top: 10px;">
          <p>{{ $t('STRID_KBD_FUNCTION_DESC') }}</p>
          <p>{{ $t('STRID_KBD_MT_DESC') }}</p>
        </div>
        <div style="display: flex; margin-left: 60px; margin-top: 20px;">
          <div style="align-items: center; justify-content: center; width: 100px;">
            <p style="text-align: center; width: 100px;">{{ $t('STRID_KBD_MT_PRESS') }}</p>
            <button class="layui-btn layui-key-desc-button" style="width: 100px; margin-top: 10px; border: 1px solid gray;" @click="selectMtKey">
              {{ kbdStore.mt.key || $t('STRID_KBD_MT_SELECT_KEY') }}
            </button>
          </div>
          <div style="align-items: center; justify-content: center; width: 100px; margin-left: 60px;">
            <p style="text-align: center; width: 100px;">{{ $t('STRID_KBD_MT_LONGPRESS') }}</p>
            <button class="layui-btn layui-key-desc-button" style="width: 100px; margin-top: 10px; border: 1px solid gray;" @click="selectMtLongPressKey">
              {{ kbdStore.mt.longPressKey || $t('STRID_KBD_MT_SELECT_KEY') }}
            </button>
          </div>
        </div>
        <p style="color: gray; margin-top: 20px; margin-left: 70px;">{{ $t('STRID_KBD_MT_HINT') }}</p>
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

      <div v-if="kbdStore.activeSettingType === 2" id="kbd-setting-rs-container" class="rs-container">
        <div style="display: flex; margin-top: 10px;">
          <p>{{ $t('STRID_KBD_FUNCTION_DESC') }}</p>
          <p>{{ $t('STRID_KBD_RS_DESC') }}</p>
        </div>
        <div class="layui-setting-title-container" style="margin-top: 20px;">
          <div class="layui-setting-title-bar" style="margin-right: 4px;"></div>
          <p>{{ $t('STRID_KBD_SOCD_SELECT_TWO_KEY') }}</p>
        </div>
        <div style="display: flex; margin-left: 60px; margin-top: 10px;">
          <button class="layui-btn layui-key-desc-button" style="width: 100px; border: 1px solid gray;" @click="selectRsKey1">
            {{ kbdStore.rs.key1 || $t('STRID_KBD_SOCD_KEY1') }}
          </button>
          <div style="height: 100%; margin-left: 20px; margin-right: 20px;">
            <p style="font-size: larger; margin-top: 20px;">+</p>
          </div>
          <button class="layui-btn layui-key-desc-button" style="width: 100px; border: 1px solid gray;" @click="selectRsKey2">
            {{ kbdStore.rs.key2 || $t('STRID_KBD_SOCD_KEY2') }}
          </button>
        </div>
        <p style="color: gray; margin-top: 20px; margin-left: 70px;">{{ $t('STRID_KBD_SOCD_HINT') }}</p>
      </div>

      <div v-if="kbdStore.activeSettingType === 3" id="kbd-setting-dks-container" class="dks-container">
        <div style="display: flex; margin-top: 10px; margin-left: 20px;">
          <p>{{ $t('STRID_KBD_FUNCTION_DESC') }}</p>
          <p>{{ $t('STRID_KBD_DKS_DESC') }}</p>
        </div>
        <div style="display: flex; margin-left: 100px; margin-top: 20px;">
          <div style="width: 80px; text-align: center;">
            <p>{{ $t('STRID_KBD_DKS_START_PRESS') }}</p>
            <p style="color: #16B777; margin-top: 10px;">1.00mm</p>
          </div>
          <div style="width: 80px; text-align: center;">
            <p>{{ $t('STRID_KBD_DKS_BOTTOM_PRESS') }}</p>
            <p style="color: #16B777; margin-top: 10px;">3.40mm</p>
          </div>
          <div style="width: 80px; text-align: center;">
            <p>{{ $t('STRID_KBD_DKS_BOTTOM_RELEASE') }}</p>
            <p style="color: #16B777; margin-top: 10px;">3.40mm</p>
          </div>
          <div style="width: 80px; text-align: center;">
            <p>{{ $t('STRID_KBD_DKS_FULL_RELEASE') }}</p>
            <p style="color: #16B777; margin-top: 10px;">1.00mm</p>
          </div>
          <div style="width: 80px; text-align: center;">
            <p>{{ $t('STRID_CLEAR') }}</p>
          </div>
        </div>

        <div v-for="(dksKey, index) in kbdStore.dks.keys" :key="index" style="display: flex; margin-left: 20px; margin-top: 20px;">
          <button class="layui-btn layui-key-desc-button" style="width: 80px; height: 40px; border: 1px solid gray;" @click="selectDksKey(index)">
            {{ dksKey.key || $t('STRID_KBD_MT_SELECT_KEY') }}
          </button>
          <div style="display: flex; width: 320px; height: 20px; margin-left: 30px; margin-top: 10px;">
            <div
              v-for="actionIndex in 4"
              :key="actionIndex"
              class="rounded-border"
              style="position: absolute; width: 20px; height: 20px; cursor: pointer;"
              :style="{ marginLeft: `${(actionIndex - 1) * 80}px` }"
              @click="kbdStore.setDksKey(index, kbdStore.selectedKey || '', actionIndex - 1, kbdStore.selectedKey || '')"
            >
              <p style="text-align: center; font-size: x-large; color: black; margin-top: -4px;">{{ dksKey.actions[actionIndex - 1] ? '●' : '+' }}</p>
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

        <p style="color: gray; margin-top: 20px; margin-left: 120px;">{{ $t('STRID_KBD_MT_HINT') }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.kbd-advance-container {
  width: 100%;
}

.advance-keyboard {
  flex: 1;
  margin-bottom: 20px;
}

.advance-desc-panel {
  text-align: center;
  width: 300px;
  height: 200px;
  margin-left: 40px;
  margin-top: 150px;
  border: 1px solid gray;
  border-radius: 4px;
}

.advance-type-tabs {
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
</style>
