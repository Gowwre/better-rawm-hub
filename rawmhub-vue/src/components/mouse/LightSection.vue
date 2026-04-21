<script setup lang="ts">
import { useMouseSettingsStore } from '@/stores/mouseSettings'

const mouseStore = useMouseSettingsStore()

const lightModes = [
  { value: 1, label: 'STRID_SETTING_LIGHT_LOOP' },
  { value: 2, label: 'STRID_SETTING_LIGHT_DEFINE' },
  { value: 3, label: 'STRID_SETTING_LIGHT_MODE' },
]
</script>

<template>
  <div id="setting-light-section" class="layui-setting-section" style="margin-top: 10px;">
    <div class="layui-setting-title-container">
      <div class="layui-setting-title-bar"></div>
      <p class="layui-setting-title">{{ $t('STRID_SETTING_LIGHT') }}</p>
      <div id="light" style="margin-left: 30px;">
        <label>
          <input type="checkbox" v-model="mouseStore.lightAutoOff" />
          {{ $t('STRID_SETTING_LIGHT_AUTO_OFF') }}
        </label>
      </div>
      <div id="brightness" style="width: 100%;">
        <div class="layui-input-group" style="float: right;">
          <div class="layui-input-prefix" style="white-space: nowrap">
            {{ $t('STRID_SETTING_LIGHT_BRIGHTNESS') }}
          </div>
          <input
            type="range"
            v-model.number="mouseStore.brightness"
            min="0"
            max="100"
            class="layui-slider"
            style="width: 255px;"
          />
          <span style="margin-left: 8px;">{{ mouseStore.brightness }}%</span>
        </div>
      </div>
    </div>

    <div class="layui-form-item layui-row" style="margin-top: 8px; margin-bottom: 0px; clear: both;">
      <div
        v-for="mode in lightModes"
        :key="mode.value"
        class="layui-col-xs4"
      >
        <label>
          <input
            type="radio"
            name="light-mode"
            :value="mode.value"
            :checked="mouseStore.lightMode === mode.value"
            @change="mouseStore.lightMode = mode.value"
          />
          {{ $t(mode.label) }}
        </label>
      </div>
    </div>

    <table v-if="mouseStore.lightMode === 2" id="setting-light-define-section">
      <tr>
        <td style="width: 33%;"></td>
        <td style="text-align: center;">
          <i class="layui-setting-light-define-section-arrow" style="position: absolute; margin-top: -5px;">▲</i>
          <div class="layui-setting-light-define-section" style="width: fit-content; height: 30px; margin-top: 13px;">
            <div id="setting-light-define-colors" style="margin-top: 5px; margin-bottom: 10px; text-align: center; width: fit-content; display: flex; gap: 8px; padding: 0 10px;">
              <div
                v-for="(color, index) in mouseStore.lightDefineColors"
                :key="index"
                class="color-dot"
                :style="{ backgroundColor: color }"
              ></div>
              <input type="color" v-model="mouseStore.lightDefineColors[0]" style="width: 24px; height: 24px; border: none; padding: 0; background: none; cursor: pointer;" />
            </div>
          </div>
        </td>
        <td style="width: 66%;"></td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
.layui-col-xs4 {
  width: 33.333%;
  float: left;
  box-sizing: border-box;
}

.color-dot {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: inline-block;
}

.layui-setting-light-define-section {
  background-color: #292929;
  border-radius: 2px;
}

body.light-theme .layui-setting-light-define-section {
  background-color: lightgray;
}

.layui-setting-light-define-section-arrow {
  font-size: 20px;
  color: #292929;
}

body.light-theme .layui-setting-light-define-section-arrow {
  color: lightgray;
}
</style>
