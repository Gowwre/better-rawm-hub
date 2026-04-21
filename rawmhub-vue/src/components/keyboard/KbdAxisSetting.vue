<script setup lang="ts">
import { useKeyboardSettingsStore } from '@/stores/keyboardSettings'

const kbdStore = useKeyboardSettingsStore()

const axisTypes = [
  { id: 'jdl', label: 'STRID_KBD_AXIS_TYPE_JDL' },
  { id: 'hn-omega', label: 'STRID_KBD_AXIS_TYPE_HN_OMEGA' },
  { id: 'ttc-wcw', label: 'STRID_KBD_AXIS_TYPE_TTC_WCW' },
]

function selectAxisType(type: string) {
  kbdStore.setAxisType(type)
}
</script>

<template>
  <div id="kbd-main-setting-axis-container" class="kbd-axis-container">
    <div class="axis-layout">
      <div class="axis-keyboard">
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

      <div class="axis-controls">
        <button class="layui-btn layui-gray-button" style="width: 80px;">WASD</button>
        <button class="layui-btn layui-gray-button" style="width: 80px; margin-top: 20px;">{{ $t('STRID_KBD_SELECT_ALL') }}</button>
        <button class="layui-btn layui-gray-button" style="width: 80px; margin-top: 20px;">{{ $t('STRID_KBD_REVERSE_ALL') }}</button>
        <button class="layui-btn layui-gray-button" style="width: 80px; margin-top: 20px;">{{ $t('STRID_CLEAR') }}</button>
      </div>
    </div>

    <div class="axis-settings">
      <div style="display: flex; gap: 40px; margin-top: 20px;">
        <div style="width: 390px;">
          <div class="layui-setting-title-container">
            <div class="layui-setting-title-bar" style="margin-right: 2px;"></div>
            <p class="layui-setting-title">{{ $t('STRID_KBD_AXIS_SELECT') }}</p>
          </div>
          <div class="layui-sub-setting-section" style="margin-top: 10px;">
            <div
              v-for="type in axisTypes"
              :key="type.id"
              class="layui-axis-type"
              :class="{ active: kbdStore.axis.type === type.id }"
              style="display: flex; height: 40px; align-items: center; justify-content: center; cursor: pointer; margin-bottom: 10px;"
              @click="selectAxisType(type.id)"
            >
              <p style="width: 110px; margin-left: 10px;">{{ $t(type.label) }}</p>
            </div>
          </div>
        </div>

        <div style="width: 440px;">
          <div class="layui-setting-title-container">
            <div class="layui-setting-title-bar" style="margin-right: 2px;"></div>
            <p class="layui-setting-title">{{ $t('STRID_KBD_AXIS_SETTING') }}</p>
          </div>
          <div class="layui-sub-setting-section" style="margin-top: 10px;">
            <p>{{ $t('STRID_KBD_AXIS_TRIGGER_POINT') }}</p>
            <div style="display: flex; margin-left: 8px; margin-top: 10px;">
              <input
                type="range"
                v-model.number="kbdStore.axis.triggerPoint"
                min="0.1"
                max="4.0"
                step="0.1"
                class="layui-slider"
                style="width: 400px;"
              />
              <p style="margin-left: 10px; margin-top: -6px;">{{ kbdStore.axis.triggerPoint.toFixed(1) }}mm</p>
            </div>

            <table style="width: 100%; margin-top: 15px;">
              <tbody>
                <tr>
                  <td style="width: 100%;">
                    <p>{{ $t('STRID_KBD_AXIS_QUICK_TRIGGER_MODE') }}</p>
                  </td>
                  <td>
                    <input type="checkbox" v-model="kbdStore.axis.quickTriggerMode" lay-skin="switch" />
                  </td>
                </tr>
              </tbody>
            </table>
            <p style="font-size: x-small; color: gray;">{{ $t('STRID_KBD_AXIS_QUICK_TRIGGER_MODE_DESC') }}</p>

            <div v-if="kbdStore.axis.quickTriggerMode" style="width: 440px; height: 210px; margin-top: 20px;">
              <div style="position: absolute; width: 440px;">
                <p>{{ $t('STRID_KBD_AXIS_PRESS_DISTANCE') }}</p>
                <div style="display: flex; margin-left: 8px; margin-top: 10px;">
                  <input
                    type="range"
                    v-model.number="kbdStore.axis.pressDistance"
                    min="0.5"
                    max="4.0"
                    step="0.1"
                    class="layui-slider"
                    style="width: 400px;"
                  />
                  <p style="margin-left: 10px; margin-top: -6px;">{{ kbdStore.axis.pressDistance.toFixed(1) }}mm</p>
                </div>
              </div>
              <div style="position: absolute; width: 440px; margin-top: 70px;">
                <p>{{ $t('STRID_KBD_AXIS_RELEASE_DISTANCE') }}</p>
                <div style="display: flex; margin-left: 8px; margin-top: 10px;">
                  <input
                    type="range"
                    v-model.number="kbdStore.axis.releaseDistance"
                    min="0.5"
                    max="4.0"
                    step="0.1"
                    class="layui-slider"
                    style="width: 400px;"
                  />
                  <p style="margin-left: 10px; margin-top: -6px;">{{ kbdStore.axis.releaseDistance.toFixed(1) }}mm</p>
                </div>
              </div>
              <div style="position: absolute; width: 440px; margin-top: 140px;">
                <p>{{ $t('STRID_KBD_AXIS_DEAD_DISTANCE') }}</p>
                <div style="display: flex; margin-left: 8px; margin-top: 10px;">
                  <input
                    type="range"
                    v-model.number="kbdStore.axis.deadDistance"
                    min="0.1"
                    max="2.0"
                    step="0.1"
                    class="layui-slider"
                    style="width: 400px;"
                  />
                  <p style="margin-left: 10px; margin-top: -6px;">{{ kbdStore.axis.deadDistance.toFixed(1) }}mm</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.kbd-axis-container {
  width: 100%;
}

.axis-layout {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.axis-keyboard {
  flex: 1;
}

.axis-controls {
  display: flex;
  flex-direction: column;
  gap: 10px;
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

.layui-axis-type.active {
  border-color: #16B777;
  background-color: rgba(22, 183, 119, 0.1);
}
</style>
