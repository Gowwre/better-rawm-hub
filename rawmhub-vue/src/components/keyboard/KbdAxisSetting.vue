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
  <div id="kbd-main-setting-axis-container" class="key-shortcuts-table">
    <table style="width: 100%; margin-bottom: 30px;">
      <tr>
        <td style="width: 100%; min-width: 640px;">
          <div style="display: flex;">
            <div style="margin-left: 40px;">
              <div id="kbd-mapping-axis-container" style="text-align: center; width: 934px; height: 348px;">
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

            <div style="width: 80px; margin-left: 20px; margin-right: 10px;">
              <button class="layui-btn layui-gray-button" style="width: 80px; margin-left: 10px; margin-top: 30px;">WASD</button>
              <button class="layui-btn layui-gray-button" style="width: 80px; margin-top: 20px;">{{ $t('STRID_KBD_SELECT_ALL') }}</button>
              <button class="layui-btn layui-gray-button" style="width: 80px; margin-top: 20px;">{{ $t('STRID_KBD_REVERSE_ALL') }}</button>
              <button class="layui-btn layui-gray-button" style="width: 80px; margin-top: 20px;">{{ $t('STRID_CLEAR') }}</button>
            </div>
          </div>
        </td>
      </tr>

      <tr style="width: 100%; align-content: center;">
        <td style="width: 100%; align-content: center;">
          <div style="width: 1020px; margin-top: 20px;">
            <div style="display: flex; margin-left: 40px; margin-bottom: 10px;">
              <div style="width: 390px;">
                <div style="width: 100%;">
                  <div class="layui-setting-title-container">
                    <div class="layui-setting-title-bar" style="margin-right: 2px;"></div>
                    <p class="layui-setting-title">{{ $t('STRID_KBD_AXIS_SELECT') }}</p>
                  </div>
                  <div class="layui-sub-setting-section" style="width: 100%; margin-top: 10px;">
                    <table>
                      <tr>
                        <td>
                          <div
                            class="layui-axis-type"
                            style="display: flex; height: 40px; align-items: center; justify-content: center; cursor: pointer;"
                            :class="{ active: kbdStore.axis.type === 'jdl' }"
                            @click="selectAxisType('jdl')"
                          >
                            <p style="width: 110px; margin-left: 10px;">{{ $t('STRID_KBD_AXIS_TYPE_JDL') }}</p>
                            <img style="display: flex; width: 40px; height: 40px;" src="" />
                          </div>
                        </td>
                        <td>
                          <div
                            class="layui-axis-type"
                            style="display: flex; height: 40px; align-items: center; justify-content: center; margin-left: 20px; cursor: pointer;"
                            :class="{ active: kbdStore.axis.type === 'hn-omega' }"
                            @click="selectAxisType('hn-omega')"
                          >
                            <p style="width: 110px; margin-left: 10px;">{{ $t('STRID_KBD_AXIS_TYPE_HN_OMEGA') }}</p>
                            <img style="display: flex; width: 40px; height: 40px;" src="" />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div
                            class="layui-axis-type"
                            style="display: flex; height: 40px; margin-top: 10px; align-items: center; justify-content: center; cursor: pointer;"
                            :class="{ active: kbdStore.axis.type === 'ttc-wcw' }"
                            @click="selectAxisType('ttc-wcw')"
                          >
                            <p style="width: 110px; margin-left: 10px;">{{ $t('STRID_KBD_AXIS_TYPE_TTC_WCW') }}</p>
                            <img style="display: flex; width: 40px; height: 40px;" src="" />
                          </div>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>

                <div class="layui-setting-title-container" style="margin-top: 20px; display: none;">
                  <div class="layui-setting-title-bar" style="margin-right: 2px;"></div>
                  <p class="layui-setting-title">{{ $t('STRID_KBD_AXIS_DISTANCE_MODE') }}</p>
                </div>
                <div class="layui-form" style="margin-left: 10px; display: none;">
                  <label>
                    <input type="radio" name="kbd-axis-mode" v-model="kbdStore.axis.distanceMode" value="normal" />
                    {{ $t('STRID_KBD_AXIS_NORMAL_MODE') }}
                  </label>
                  <label>
                    <input type="radio" name="kbd-axis-mode" v-model="kbdStore.axis.distanceMode" value="fury" />
                    {{ $t('STRID_KBD_AXIS_FURY_MODE') }}
                  </label>
                </div>

                <div style="display: none; margin-top: 60px; margin-left: 120px;">
                  <button class="layui-btn layui-gray-button">{{ $t('STRING_CANCEL') }}</button>
                  <button class="layui-btn layui-bg-blue" style="margin-left: 60px;">{{ $t('STRID_SAVE') }}</button>
                </div>
              </div>

              <div style="width: 440px; margin-left: 90px;">
                <div class="layui-setting-title-container">
                  <div class="layui-setting-title-bar" style="margin-right: 2px;"></div>
                  <p class="layui-setting-title">{{ $t('STRID_KBD_AXIS_SETTING') }}</p>
                </div>
                <div class="layui-sub-setting-section" style="width: 440px; margin-top: 10px;">
                  <p>{{ $t('STRID_KBD_AXIS_TRIGGER_POINT') }}</p>
                  <div style="display: flex; margin-left: 8px; margin-top: 20px;">
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
                          <div class="layui-input-block">
                            <input type="checkbox" v-model="kbdStore.axis.quickTriggerMode" lay-skin="switch" />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <p style="font-size: x-small; color: gray;">{{ $t('STRID_KBD_AXIS_QUICK_TRIGGER_MODE_DESC') }}</p>

                  <div v-if="kbdStore.axis.quickTriggerMode" style="width: 440px; height: 210px; margin-top: 20px;">
                    <div style="position: absolute; width: 440px;">
                      <p>{{ $t('STRID_KBD_AXIS_PRESS_DISTANCE') }}</p>
                      <div style="display: flex; margin-left: 8px; margin-top: 20px;">
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
                      <div style="display: flex; margin-left: 8px; margin-top: 20px;">
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
                      <div style="display: flex; margin-left: 8px; margin-top: 20px;">
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
