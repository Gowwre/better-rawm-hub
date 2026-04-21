<script setup lang="ts">
import { ref, computed } from 'vue'
import { useMouseSettingsStore } from '@/stores/mouseSettings'
import type { MappingKey } from '@/types'

const mouseStore = useMouseSettingsStore()

const selectedKeyId = ref<string | null>(null)

const mappingTypes = [
  { id: 0, label: 'STRID_SETTING_MAPPING_TYPE_KEY' },
  { id: 1, label: 'STRID_SETTING_MAPPING_TYPE_MACRO' },
  { id: 2, label: 'STRID_SETTING_MAPPING_TYPE_FUNCTION' },
  { id: 3, label: 'STRID_NONE' },
]

const leftKeys = [
  { id: 'setting_mapping_key_m1', label: '①', position: { left: '30px', top: '90px' }, line: { width: '210px' }, circle: true },
  { id: 'setting_mapping_key_m6', label: '⑥', position: { left: '30px', top: '180px' }, line: { width: '175px' }, circle: true },
  { id: 'setting_mapping_key_m5', label: '⑤', position: { left: '30px', top: '240px' }, line: { width: '180px' }, circle: true },
]

const rightKeys = [
  { id: 'setting_mapping_key_m3', label: '③', position: { right: '30px', top: '90px' }, line: { width: '197px' }, circle: true },
  { id: 'setting_mapping_key_m2', label: '②', position: { right: '30px', top: '122px' }, line: { width: '247px' }, circle: true },
  { id: 'setting_mapping_key_m4', label: '④', position: { right: '30px', top: '190px' }, line: { width: '247px' }, circle: true },
  { id: 'setting_mapping_key_m7', label: '⑦', position: { right: '30px', top: '302px' }, line: { width: '247px' }, circle: true, hasBottomLabel: true },
]

const wheelKeys = [
  { id: 'setting_mapping_key_wheel_up', label: '▲', position: { right: '30px', top: '32px' }, line: { width: '221px' } },
  { id: 'setting_mapping_key_wheel_down', label: '▼', position: { left: '80px', top: '32px' }, line: { width: '221px' } },
]

const selectedKey = computed((): MappingKey | null => {
  if (!selectedKeyId.value) return null
  return mouseStore.mappingKeys[selectedKeyId.value]
})

const ctrlKey1Val = computed({
  get: () => selectedKey.value?.ctrlKey1 ?? '',
  set: (val: string) => {
    if (selectedKeyId.value) {
      const current = mouseStore.mappingKeys[selectedKeyId.value]
      mouseStore.setMappingKey(selectedKeyId.value, { ...current, ctrlKey1: val })
    }
  },
})

const ctrlKey2Val = computed({
  get: () => selectedKey.value?.ctrlKey2 ?? '',
  set: (val: string) => {
    if (selectedKeyId.value) {
      const current = mouseStore.mappingKeys[selectedKeyId.value]
      mouseStore.setMappingKey(selectedKeyId.value, { ...current, ctrlKey2: val })
    }
  },
})

const mappedKeyVal = computed({
  get: () => selectedKey.value?.mappedKey ?? '',
  set: (val: string) => {
    if (selectedKeyId.value) {
      const current = mouseStore.mappingKeys[selectedKeyId.value]
      mouseStore.setMappingKey(selectedKeyId.value, { ...current, mappedKey: val })
    }
  },
})

const wheelDeltaVal = computed({
  get: () => selectedKey.value?.wheelDelta ?? 1,
  set: (val: number) => {
    if (selectedKeyId.value) {
      const current = mouseStore.mappingKeys[selectedKeyId.value]
      mouseStore.setMappingKey(selectedKeyId.value, { ...current, wheelDelta: val })
    }
  },
})

const turboFreqVal = computed({
  get: () => selectedKey.value?.turbo?.freq ?? 100,
  set: (val: number) => {
    if (selectedKeyId.value && selectedKey.value?.turbo) {
      const turbo = { ...selectedKey.value.turbo, freq: val }
      const current = mouseStore.mappingKeys[selectedKeyId.value]
      mouseStore.setMappingKey(selectedKeyId.value, { ...current, turbo })
    }
  },
})

const turboRandVal = computed({
  get: () => selectedKey.value?.turbo?.rand ?? 0,
  set: (val: number) => {
    if (selectedKeyId.value && selectedKey.value?.turbo) {
      const turbo = { ...selectedKey.value.turbo, rand: val }
      const current = mouseStore.mappingKeys[selectedKeyId.value]
      mouseStore.setMappingKey(selectedKeyId.value, { ...current, turbo })
    }
  },
})

const turboDownKeepVal = computed({
  get: () => selectedKey.value?.turbo?.downKeep ?? 0,
  set: (val: number) => {
    if (selectedKeyId.value && selectedKey.value?.turbo) {
      const turbo = { ...selectedKey.value.turbo, downKeep: val }
      const current = mouseStore.mappingKeys[selectedKeyId.value]
      mouseStore.setMappingKey(selectedKeyId.value, { ...current, turbo })
    }
  },
})

const turboUpKeepVal = computed({
  get: () => selectedKey.value?.turbo?.upKeep ?? 0,
  set: (val: number) => {
    if (selectedKeyId.value && selectedKey.value?.turbo) {
      const turbo = { ...selectedKey.value.turbo, upKeep: val }
      const current = mouseStore.mappingKeys[selectedKeyId.value]
      mouseStore.setMappingKey(selectedKeyId.value, { ...current, turbo })
    }
  },
})

const currentMappingType = computed({
  get: () => mouseStore.activeMappingType,
  set: (val: number) => { mouseStore.activeMappingType = val },
})

function selectKey(keyId: string) {
  selectedKeyId.value = keyId
  mouseStore.selectedMappingKey = keyId
}

function handleTurboToggle(event: Event) {
  const target = event.target as HTMLInputElement
  const enabled = target.checked
  if (selectedKeyId.value) {
    const current = mouseStore.mappingKeys[selectedKeyId.value]
    mouseStore.setMappingKey(selectedKeyId.value, {
      ...current,
      turbo: enabled ? { enabled: true, freq: 100, rand: 0, downKeep: 0, upKeep: 0 } : undefined,
    })
  }
}
</script>

<template>
  <div id="setting-mapping-section" class="layui-setting-section" style="width: 330px;">
    <img
      id="product-name"
      src="https://hub.miracletek.net/hub/img/rawm_hub.png?v=202412080015"
      style="height: 30px;"
    />

    <p class="layui-setting-title" style="font-size: large; margin-top: 10px;">
      {{ $t('STRID_SETTING_MAPPING_TYPE') }}
    </p>

    <div id="tab-mapping-key-type" class="layui-tab layui-tab-brief" style="margin-bottom: 0px;">
      <ul class="layui-tab-title">
        <li
          v-for="type in mappingTypes"
          :key="type.id"
          :class="{ 'layui-this': currentMappingType === type.id }"
          @click="currentMappingType = type.id"
        >
          {{ $t(type.label) }}
        </li>
      </ul>
      <div class="layui-tab-content" style="padding-bottom: 0px;">
        <!-- Key mapping -->
        <div class="layui-tab-item" :class="{ 'layui-show': currentMappingType === 0 }">
          <div id="mapping-key-container" class="key-shortcuts-table">
            <table style="width: 100%;">
              <tr>
                <td style="width: 100%;">
                  <div class="layui-setting-title-container">
                    <div class="layui-setting-title-bar"></div>
                    <p class="layui-setting-title">{{ $t('STRID_SETTING_MAPPING_SELECT_KEY') }}</p>
                  </div>
                </td>
                <td>
                  <button
                    id="mapping-key-record"
                    class="layui-btn layui-btn-radius layui-btn-sm"
                    style="background-color: #16B777;"
                  >
                    {{ $t('STRID_SETTING_MAPPING_KEY_RECORD') }}
                  </button>
                </td>
              </tr>
            </table>

            <p class="layui-setting-title" style="margin-left: 0px; margin-top: 12px;">
              {{ $t('STRID_SETTING_MAPPING_CTRL_KEY') }}
            </p>
            <div style="margin-top: 4px; display: flex;">
              <select v-model="ctrlKey1Val" class="layui-input" style="width: 50%;">
                <option value="">{{ $t('STRID_NONE') }}</option>
                <option value="Ctrl">Ctrl</option>
                <option value="Alt">Alt</option>
                <option value="Shift">Shift</option>
              </select>
              <select v-model="ctrlKey2Val" class="layui-input" style="width: 50%; margin-left: 12px;">
                <option value="">{{ $t('STRID_NONE') }}</option>
                <option value="Ctrl">Ctrl</option>
                <option value="Alt">Alt</option>
                <option value="Shift">Shift</option>
              </select>
            </div>

            <p class="layui-setting-title" style="margin-left: 0px; margin-top: 12px;">
              {{ $t('STRID_SETTING_MAPPING_TYPE_KEY') }}
            </p>
            <div style="margin-top: 4px; display: flex;">
              <select v-model="mappedKeyVal" class="layui-input" style="width: 100%;">
                <option value="">{{ $t('STRID_NONE') }}</option>
                <option value="Left Click">Left Click</option>
                <option value="Right Click">Right Click</option>
                <option value="Middle Click">Middle Click</option>
                <option value="Wheel Up">Wheel Up</option>
                <option value="Wheel Down">Wheel Down</option>
              </select>
              <div v-if="mappedKeyVal.includes('Wheel')" id="wheel-delta-container" style="width: 180px; display: flex; align-items: center; gap: 8px; margin-left: 8px;">
                <p class="layui-setting-desc" style="margin-left: 4px; margin-right: 4px; white-space: nowrap;">
                  {{ $t('STRID_SETTING_MAPPING_MACRO_ACTION_WHEEL_DELTA_S') }}
                </p>
                <input v-model.number="wheelDeltaVal" type="number" class="layui-input" min="1" max="64" style="width: 70px;" />
              </div>
            </div>

            <p id="keys-fw-channel-gaming-tips" class="layui-setting-desc" style="margin-top: 10px; color: #16B777;"></p>

            <div id="mapping-key-turbo-container" style="margin-top: 12px">
              <label>
                <input type="checkbox" :checked="!!selectedKey?.turbo?.enabled" @change="handleTurboToggle" />
                {{ $t('STRID_SETTING_MAPPING_KEY_TURBO') }}
              </label>
              <div v-if="selectedKey?.turbo?.enabled" id="mapping-key-turbo-detail-container" style="margin-top: 12px">
                <div style="width: 100%; display: flex;">
                  <div style="width: 50%; display: flex; align-items: center;">
                    <div class="layui-setting-mapping-key-desc-right" style="width: 100%;">
                      <p class="layui-setting-desc" style="margin-right: 4px; text-align: right;">
                        {{ $t('STRID_SETTING_MAPPING_KEY_TURBO_FREQ') }}
                      </p>
                    </div>
                    <input v-model.number="turboFreqVal" type="number" class="layui-input" min="1" max="1000" style="width: 80px; margin: 0 auto; display: block;" />
                  </div>
                  <div style="width: 50%; display: flex; align-items: center;">
                    <div class="layui-setting-mapping-key-desc-right" style="width: 100%;">
                      <p class="layui-setting-desc" style="margin-right: 4px; text-align: right;">
                        {{ $t('STRID_SETTING_MAPPING_KEY_TURBO_RAND') }}
                      </p>
                    </div>
                    <input v-model.number="turboRandVal" type="number" class="layui-input" min="0" style="width: 70px; margin: 0 auto; display: block;" />
                  </div>
                </div>
                <div style="width: 100%; margin-top: 12px; display: flex;">
                  <div style="width: 50%; display: flex; align-items: center;">
                    <div class="layui-setting-mapping-key-desc-right" style="width: 100%;">
                      <p class="layui-setting-desc" style="margin-right: 4px; text-align: right;">
                        {{ $t('STRID_SETTING_MAPPING_KEY_TURBO_DOWN_KEEP') }}
                      </p>
                    </div>
                    <input v-model.number="turboDownKeepVal" type="number" class="layui-input" min="0" style="width: 80px; margin: 0 auto; display: block;" />
                  </div>
                  <div style="width: 50%; display: flex; align-items: center;">
                    <div class="layui-setting-mapping-key-desc-right" style="width: 100%;">
                      <p class="layui-setting-desc" style="margin-right: 4px; text-align: right;">
                        {{ $t('STRID_SETTING_MAPPING_KEY_TURBO_UP_KEEP') }}
                      </p>
                    </div>
                    <input v-model.number="turboUpKeepVal" type="number" class="layui-input" min="0" style="width: 70px; margin: 0 auto; display: block;" />
                  </div>
                </div>
              </div>
            </div>

            <div class="layui-setting-title-container" style="margin-top: 16px; margin-bottom: 5px;">
              <div class="layui-setting-title-bar"></div>
              <p class="layui-setting-title">{{ $t('STRID_SETTING_MAPPING_KEY_CMD') }}</p>
            </div>
            <table id="key-shortcuts" class="layui-hide"></table>
          </div>
        </div>

        <!-- Macro mapping -->
        <div class="layui-tab-item" :class="{ 'layui-show': currentMappingType === 1 }">
          <div id="mapping-macro-container">
            <div style="display: flex;">
              <div class="layui-setting-title-container" style="width: 100%;">
                <div class="layui-setting-title-bar"></div>
                <p class="layui-setting-title">{{ $t('STRID_SETTING_MAPPING_MACRO') }}</p>
              </div>
              <button
                id="mapping-macro-edit"
                class="layui-btn layui-btn-radius layui-btn-sm"
                style="background-color: #16B777;"
              >
                {{ $t('STRID_EDIT') }}
              </button>
            </div>
            <div style="margin-top: 12px;">
              <p class="layui-setting-title">{{ $t('STRID_SETTING_MAPPING_MACRO_TRIGGER_TYPE') }}</p>
              <select class="layui-input" style="width: 100%; margin-top: 4px;">
                <option value="press">{{ $t('STRID_SETTING_MAPPING_MACRO_ACTION_KEY_DOWN') }}</option>
                <option value="toggle">{{ $t('STRID_SETTING_MAPPING_TOGGLE_KEY2') }}</option>
                <option value="hold">{{ $t('STRID_SETTING_MAPPING_MACRO_RECORD') }}</option>
              </select>
            </div>
            <div style="margin-top: 12px;">
              <p class="layui-setting-title">{{ $t('STRID_SETTING_MAPPING_TOGGLE_KEY2') }}</p>
              <select class="layui-input" style="width: 100%; margin-top: 4px;">
                <option value="">{{ $t('STRID_NONE') }}</option>
              </select>
            </div>
            <div style="margin-top: 12px;">
              <p class="layui-setting-title">{{ $t('STRID_SETTING_MAPPING_MACRO_STOP_KEY') }}</p>
              <select class="layui-input" style="width: 100%; margin-top: 4px;">
                <option value="">{{ $t('STRID_NONE') }}</option>
              </select>
            </div>
            <p id="setting-mapping-macro-actions" class="layui-setting-title" style="margin-top: 20px;"></p>
          </div>
        </div>

        <!-- Function mapping -->
        <div class="layui-tab-item" :class="{ 'layui-show': currentMappingType === 2 }">
          <div id="mapping-function-container" style="margin-top: 4px;">
            <div class="layui-setting-title-container">
              <div class="layui-setting-title-bar"></div>
              <p class="layui-setting-title">{{ $t('STRID_SETTING_MAPPING_TYPE_FUNCTION_SELECT') }}</p>
            </div>
            <select class="layui-input" style="width: 100%; margin-top: 12px;">
              <option value="">{{ $t('STRID_NONE') }}</option>
              <option value="dpi">{{ $t('STRID_SETTING_DPI') }}</option>
              <option value="esb">{{ $t('STRID_SETTING_MAPPING_TYPE_FUNCTION_TOGGLE_ESB_ADDR_SUMMARY') }}</option>
              <option value="ble">{{ $t('STRID_SETTING_MAPPING_TYPE_FUNCTION_TOGGLE_BLE_DEVICE_SUMMARY') }}</option>
              <option value="showPower">{{ $t('STRID_SETTING_MAPPING_TYPE_FUNCTION_SHOW_POWER_SUMMARY') }}</option>
            </select>
          </div>
        </div>

        <!-- None -->
        <div class="layui-tab-item layui-show" :class="{ 'layui-show': currentMappingType === 3 }"></div>
      </div>
    </div>

    <!-- Product icon panel -->
    <div style="text-align: center; padding-bottom: 5px; margin-left: auto; margin-right: auto;">
      <div id="setting_mapping_product_icon" class="layui-product-icon-panel" style="background-position: 0px 60px;">
        <div class="layui-setting-title-container" style="margin-top: 20px;">
          <table style="margin: 0 auto;">
            <tr>
              <td>
                <p class="layui-setting-title">{{ $t('STRID_SETTING_CONFIG_CURRENT') }}</p>
              </td>
              <td>
                <select v-model.number="mouseStore.onboardConfig" class="layui-input" style="width: 180px; margin-left: 6px;">
                  <option :value="0">配置 1</option>
                  <option :value="1">配置 2</option>
                  <option :value="2">配置 3</option>
                  <option :value="3">配置 4</option>
                  <option :value="4">配置 5</option>
                </select>
              </td>
              <td>
                <i
                  id="onboard-config-loading"
                  class="layui-icon layui-icon-loading layui-anim layui-anim-rotate layui-anim-loop"
                  style="font-size: 20px; color: #1E9FFF; margin-left: 5px; display: none;"
                ></i>
              </td>
            </tr>
          </table>
        </div>

        <div class="layui-setting-title-container" style="margin-top: 20px;">
          <table style="margin: 0 auto;">
            <tr>
              <td>
                <p class="layui-setting-title">{{ $t('STRID_SETTINGD_KEY_COMBINATION_LABEL') }}</p>
              </td>
              <td>
                <select v-model="mouseStore.combinationKey" class="layui-input" style="width: 150px; margin-left: 6px;">
                  <option value="R">R-Plus</option>
                  <option value="L">L-Plus</option>
                </select>
              </td>
            </tr>
          </table>
        </div>
        <p class="layui-setting-desc">{{ $t('STRID_SETTINGD_KEY_COMBINATION_DESC') }}</p>

        <!-- Mapping keys visual -->
        <div style="position: absolute; width: 647px; height: 400px; margin-top: 10px;">
          <!-- Left keys -->
          <div
            v-for="key in leftKeys"
            :key="key.id"
            :id="key.id.replace(/_/g, '-')"
            style="position: absolute; height: 50px;"
            :style="key.position"
            @click="selectKey(key.id)"
          >
            <div class="layui-setting-title-container" style="cursor: pointer;">
              <p :id="`${key.id.replace(/_/g, '-')}-text`" class="layui-setting-mapping-key-name" style="margin-top: 18px;">
                {{ key.label }}
              </p>
              <div style="cursor: pointer;">
                <div style="padding-top: 5px; text-align: left;">
                  <p :id="`${key.id.replace(/_/g, '-')}-desc`" class="layui-setting-desc layui-outline" style="margin: 4px; line-height: 1.3em;">
                    {{ mouseStore.mappingKeys[key.id]?.desc || $t('STRID_NONE') }}
                  </p>
                </div>
                <div :id="`${key.id.replace(/_/g, '-')}-line`" style="height: 1px; background-color: gray; margin-bottom: 4px;" :style="{ width: key.line.width }"></div>
              </div>
              <img :id="`${key.id.replace(/_/g, '-')}-circle`" src="" style="margin-top: 22px;" />
            </div>
          </div>

          <!-- Right keys -->
          <div
            v-for="key in rightKeys"
            :key="key.id"
            :id="key.id.replace(/_/g, '-')"
            style="position: absolute; height: 50px;"
            :style="key.position"
            @click="selectKey(key.id)"
          >
            <div class="layui-setting-title-container" style="cursor: pointer;">
              <img :id="`${key.id.replace(/_/g, '-')}-circle`" src="" style="margin-top: 22px;" />
              <div style="cursor: pointer;">
                <div style="padding-top: 5px; text-align: right;">
                  <p :id="`${key.id.replace(/_/g, '-')}-desc`" class="layui-setting-desc layui-outline" style="margin: 4px; line-height: 1.3em;">
                    {{ mouseStore.mappingKeys[key.id]?.desc || $t('STRID_NONE') }}
                  </p>
                </div>
                <div :id="`${key.id.replace(/_/g, '-')}-line`" style="height: 1px; background-color: gray; margin-bottom: 4px;" :style="{ width: key.line.width }"></div>
              </div>
              <p :id="`${key.id.replace(/_/g, '-')}-text`" class="layui-setting-mapping-key-name" style="margin-top: 18px;">
                {{ key.label }}
              </p>
              <p v-if="key.hasBottomLabel" class="layui-setting-title layui-outline" style="margin-left: -270px;">
                {{ $t('STRID_SETTING_MAPPING_BOTTOM_KEY') }}
              </p>
            </div>
          </div>

          <!-- Wheel line -->
          <div id="setting-mapping-key-wheel-line-container" style="position: absolute; left: 315px; top: 68px;">
            <div id="setting-mapping-key-wheel-line" style="width: 1px; height: 57px; margin-left: 10px; background-color: gray;"></div>
            <img id="setting-mapping-key-wheel-circle" src="" />
          </div>

          <!-- Wheel down -->
          <div
            id="setting-mapping-key-wheel-down"
            style="position: absolute; height: 50px; left: 80px; top: 32px;"
            @click="selectKey('setting_mapping_key_wheel_down')"
          >
            <div class="layui-setting-title-container" style="cursor: pointer;">
              <p id="setting-mapping-key-wheel-down-text" class="layui-setting-mapping-key-name" style="margin-top: 18px;">▼</p>
              <div style="cursor: pointer;">
                <div style="padding-top: 5px; text-align: left;">
                  <p id="setting-mapping-key-wheel-down-desc" class="layui-setting-desc layui-outline" style="margin: 4px; line-height: 1.3em;">
                    {{ mouseStore.mappingKeys['setting_mapping_key_wheel_down']?.desc || $t('STRID_NONE') }}
                  </p>
                </div>
                <div id="setting-mapping-key-wheel-down-line" style="width: 221px; height: 1px; background-color: gray; margin-bottom: 4px;"></div>
              </div>
            </div>
          </div>

          <!-- Wheel up -->
          <div
            id="setting-mapping-key-wheel-up"
            style="position: absolute; height: 50px; right: 30px; top: 32px;"
            @click="selectKey('setting_mapping_key_wheel_up')"
          >
            <div class="layui-setting-title-container" style="cursor: pointer;">
              <div style="cursor: pointer;">
                <div style="padding-top: 5px; text-align: right;">
                  <p id="setting-mapping-key-wheel-up-desc" class="layui-setting-desc layui-outline" style="margin: 4px; line-height: 1.3em;">
                    {{ mouseStore.mappingKeys['setting_mapping_key_wheel_up']?.desc || $t('STRID_NONE') }}
                  </p>
                </div>
                <div id="setting-mapping-key-wheel-up-line" style="width: 221px; height: 1px; background-color: gray; margin-bottom: 4px;"></div>
              </div>
              <p id="setting-mapping-key-wheel-up-text" class="layui-setting-mapping-key-name" style="margin-top: 18px;">▲</p>
            </div>
          </div>
        </div>

        <div id="setting-onboard_status" style="margin-top: 440px;">
          <table style="margin: 0 auto;">
            <tr>
              <td style="font-size: medium; white-space: nowrap; vertical-align: middle; padding-right: 6px;">
                {{ $t('STRID_SETTING_CONFIG_CURRENT_ALLOW_SWITCH') }}
              </td>
              <td style="padding-bottom: 8px;">
                <input type="checkbox" v-model="mouseStore.allowSwitch" />
              </td>
              <td style="font-size: medium; white-space: nowrap; vertical-align: middle; padding-right: 6px; padding-left: 20px;">
                {{ $t('STRID_SETTING_LIGHT') }}
              </td>
              <td style="padding-top: 6px;">
                <div id="setting-onboard-status-colors" style="margin-top: 6px; margin-bottom: 6px; text-align: center; width: fit-content">
                </div>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.layui-setting-mapping-key-name {
  font-size: x-large;
}

.layui-setting-mapping-key-desc-right {
  height: 22px;
  text-align: right;
}

.layui-setting-mapping-key-desc-left {
  height: 22px;
  text-align: left;
}
</style>
