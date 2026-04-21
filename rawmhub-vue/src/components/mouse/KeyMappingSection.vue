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

const keyMappingKeys = [
  { id: 'setting_mapping_key_m1', label: '①', position: { left: '30px', top: '90px' }, line: { width: '210px' } },
  { id: 'setting_mapping_key_m6', label: '⑥', position: { left: '30px', top: '180px' }, line: { width: '175px' } },
  { id: 'setting_mapping_key_m5', label: '⑤', position: { left: '30px', top: '240px' }, line: { width: '180px' } },
  { id: 'setting_mapping_key_m3', label: '③', position: { right: '30px', top: '90px' }, line: { width: '197px' }, rightAligned: true },
  { id: 'setting_mapping_key_m2', label: '②', position: { right: '30px', top: '122px' }, line: { width: '247px' }, rightAligned: true },
  { id: 'setting_mapping_key_m4', label: '④', position: { right: '30px', top: '190px' }, line: { width: '247px' }, rightAligned: true },
  { id: 'setting_mapping_key_m7', label: '⑦', position: { right: '30px', top: '302px' }, line: { width: '247px' }, rightAligned: true, hasBottomLabel: true },
  { id: 'setting_mapping_key_wheel_up', label: '▲', position: { right: '30px', top: '32px' }, line: { width: '221px' }, rightAligned: true },
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
  <div id="setting-mapping-section" class="layui-setting-section">
    <img src="https://hub.miracletek.net/hub/img/rawm_hub.png?v=202412080015" class="product-logo" />

    <p class="layui-setting-title" style="font-size: large; margin-top: 10px;">
      {{ $t('STRID_SETTING_MAPPING_TYPE') }}
    </p>

    <div class="mapping-type-tabs">
      <div
        v-for="type in mappingTypes"
        :key="type.id"
        class="tab-item"
        :class="{ active: currentMappingType === type.id }"
        @click="currentMappingType = type.id"
      >
        {{ $t(type.label) }}
      </div>
    </div>

    <div class="mapping-content">
      <div v-if="currentMappingType === 0" class="key-mapping">
        <div class="section-header">
          <p class="layui-setting-title">{{ $t('STRID_SETTING_MAPPING_SELECT_KEY') }}</p>
          <button class="layui-btn layui-btn-radius layui-btn-sm" style="background-color: #16B777;">
            {{ $t('STRID_SETTING_MAPPING_KEY_RECORD') }}
          </button>
        </div>

        <p class="layui-setting-title" style="margin-top: 12px;">{{ $t('STRID_SETTING_MAPPING_CTRL_KEY') }}</p>
        <div class="ctrl-keys">
          <select v-model="ctrlKey1Val" class="layui-input" style="width: 48%;">
            <option value="">{{ $t('STRID_NONE') }}</option>
            <option value="Ctrl">Ctrl</option>
            <option value="Alt">Alt</option>
            <option value="Shift">Shift</option>
          </select>
          <select v-model="ctrlKey2Val" class="layui-input" style="width: 48%; margin-left: 4%;">
            <option value="">{{ $t('STRID_NONE') }}</option>
            <option value="Ctrl">Ctrl</option>
            <option value="Alt">Alt</option>
            <option value="Shift">Shift</option>
          </select>
        </div>

        <p class="layui-setting-title" style="margin-top: 12px;">{{ $t('STRID_SETTING_MAPPING_TYPE_KEY') }}</p>
        <div class="mapped-key">
          <select v-model="mappedKeyVal" class="layui-input" style="width: 70%;">
            <option value="">{{ $t('STRID_NONE') }}</option>
            <option value="Left Click">Left Click</option>
            <option value="Right Click">Right Click</option>
            <option value="Middle Click">Middle Click</option>
            <option value="Wheel Up">Wheel Up</option>
            <option value="Wheel Down">Wheel Down</option>
          </select>
          <div v-if="mappedKeyVal.includes('Wheel')" class="wheel-delta">
            <p class="layui-setting-desc">{{ $t('STRID_SETTING_MAPPING_MACRO_ACTION_WHEEL_DELTA') }}</p>
            <input v-model.number="wheelDeltaVal" type="number" class="layui-input" min="1" max="64" style="width: 70px;" />
          </div>
        </div>

        <div class="turbo-section" style="margin-top: 12px;">
          <label>
            <input type="checkbox" :checked="!!selectedKey?.turbo?.enabled" @change="handleTurboToggle" />
            {{ $t('STRID_SETTING_MAPPING_KEY_TURBO') }}
          </label>
          <div v-if="selectedKey?.turbo?.enabled" class="turbo-details">
            <div class="turbo-row">
              <div>
                <p class="layui-setting-desc">{{ $t('STRID_SETTING_MAPPING_KEY_TURBO_FREQ') }}</p>
                <input v-model.number="turboFreqVal" type="number" class="layui-input" min="1" max="1000" style="width: 80px;" />
              </div>
              <div>
                <p class="layui-setting-desc">{{ $t('STRID_SETTING_MAPPING_KEY_TURBO_RAND') }}</p>
                <input v-model.number="turboRandVal" type="number" class="layui-input" min="0" style="width: 70px;" />
              </div>
            </div>
            <div class="turbo-row">
              <div>
                <p class="layui-setting-desc">{{ $t('STRID_SETTING_MAPPING_KEY_TURBO_DOWN_KEEP') }}</p>
                <input v-model.number="turboDownKeepVal" type="number" class="layui-input" min="0" style="width: 80px;" />
              </div>
              <div>
                <p class="layui-setting-desc">{{ $t('STRID_SETTING_MAPPING_KEY_TURBO_UP_KEEP') }}</p>
                <input v-model.number="turboUpKeepVal" type="number" class="layui-input" min="0" style="width: 70px;" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="currentMappingType === 1" class="macro-mapping">
        <div class="section-header">
          <p class="layui-setting-title">{{ $t('STRID_SETTING_MAPPING_MACRO') }}</p>
          <button class="layui-btn layui-btn-radius layui-btn-sm" style="background-color: #16B777;">
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
      </div>

      <div v-if="currentMappingType === 2" class="function-mapping">
        <p class="layui-setting-title">{{ $t('STRID_SETTING_MAPPING_TYPE_FUNCTION_SELECT') }}</p>
        <select class="layui-input" style="width: 100%; margin-top: 12px;">
          <option value="">{{ $t('STRID_NONE') }}</option>
          <option value="dpi">{{ $t('STRID_SETTING_DPI') }}</option>
          <option value="esb">{{ $t('STRID_SETTING_MAPPING_TYPE_FUNCTION_TOGGLE_ESB_ADDR_SUMMARY') }}</option>
          <option value="ble">{{ $t('STRID_SETTING_MAPPING_TYPE_FUNCTION_TOGGLE_BLE_DEVICE_SUMMARY') }}</option>
          <option value="showPower">{{ $t('STRID_SETTING_MAPPING_TYPE_FUNCTION_SHOW_POWER_SUMMARY') }}</option>
        </select>
      </div>
    </div>

    <div class="product-icon-panel">
      <div class="product-icon-container">
        <div class="onboard-config">
          <p class="layui-setting-title">{{ $t('STRID_SETTING_CONFIG_CURRENT') }}</p>
          <select v-model.number="mouseStore.onboardConfig" class="layui-input" style="width: 180px; margin-left: 6px;">
            <option :value="0">配置 1</option>
            <option :value="1">配置 2</option>
            <option :value="2">配置 3</option>
            <option :value="3">配置 4</option>
            <option :value="4">配置 5</option>
          </select>
        </div>

        <div class="combination-key">
          <p class="layui-setting-title">{{ $t('STRID_SETTINGD_KEY_COMBINATION_LABEL') }}</p>
          <select v-model="mouseStore.combinationKey" class="layui-input" style="width: 150px; margin-left: 6px;">
            <option value="R">R-Plus</option>
            <option value="L">L-Plus</option>
          </select>
        </div>
        <p class="layui-setting-desc">{{ $t('STRID_SETTINGD_KEY_COMBINATION_DESC') }}</p>

        <div class="mapping-keys-visual">
          <div
            v-for="key in keyMappingKeys"
            :key="key.id"
            class="mapping-key-item"
            :class="{ selected: selectedKeyId === key.id }"
            :style="{ left: key.position.left, right: key.position.right, top: key.position.top }"
            @click="selectKey(key.id)"
          >
            <div class="key-label">{{ key.label }}</div>
            <div class="key-line" :style="{ width: key.line.width }"></div>
            <p class="layui-setting-desc layui-outline key-desc">
              {{ mouseStore.mappingKeys[key.id]?.desc || $t('STRID_NONE') }}
            </p>
          </div>
          <p class="bottom-label">{{ $t('STRID_SETTING_MAPPING_BOTTOM_KEY') }}</p>
        </div>

        <div class="onboard-status">
          <label>
            {{ $t('STRID_SETTING_CONFIG_CURRENT_ALLOW_SWITCH') }}
            <input type="checkbox" v-model="mouseStore.allowSwitch" />
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.layui-setting-section {
  width: 330px;
}

.product-logo {
  height: 30px;
}

.mapping-type-tabs {
  display: flex;
  margin-top: 8px;
  border-bottom: 1px solid #444;
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

.mapping-content {
  margin-top: 12px;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.03);
  border-radius: 4px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.ctrl-keys {
  display: flex;
  gap: 4%;
  margin-top: 4px;
}

.mapped-key {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 4px;
}

.wheel-delta {
  display: flex;
  align-items: center;
  gap: 5px;
}

.turbo-row {
  display: flex;
  gap: 15px;
  margin-top: 8px;
}

.product-icon-panel {
  width: 100%;
  margin-top: 20px;
  background-color: rgba(255, 255, 255, 0.03);
  border-radius: 4px;
  padding: 15px;
}

.onboard-config, .combination-key {
  display: flex;
  align-items: center;
  margin-top: 15px;
}

.mapping-keys-visual {
  position: relative;
  height: 350px;
  margin-top: 20px;
}

.mapping-key-item {
  position: absolute;
  cursor: pointer;
  padding: 5px;
  border-radius: 4px;
  transition: all 0.2s;
}

.mapping-key-item:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

.mapping-key-item.selected {
  background-color: rgba(22, 183, 119, 0.1);
}

.key-label {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 4px;
}

.key-line {
  height: 1px;
  background-color: gray;
  margin-bottom: 4px;
}

.key-desc {
  font-size: 12px;
  line-height: 1.3em;
  margin: 4px 0;
}

.bottom-label {
  position: absolute;
  left: 50%;
  bottom: 20px;
  transform: translateX(-50%);
  font-size: 14px;
  font-weight: bold;
}

.onboard-status {
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
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
