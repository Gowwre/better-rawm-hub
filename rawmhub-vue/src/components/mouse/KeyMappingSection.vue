<script setup lang="ts">
import { computed } from 'vue'
import { useMouseSettingsStore } from '@/stores/mouseSettings'
import { RawmTabs, RawmSelect, RawmCheckbox, RawmButton } from '@/components/ui'
import type { MappingKey } from '@/types'

const mouseStore = useMouseSettingsStore()

const selectedKey = computed((): MappingKey | null => {
  if (!mouseStore.selectedMappingKey) return null
  return mouseStore.mappingKeys[mouseStore.selectedMappingKey]
})

const currentMappingType = computed({
  get: () => String(mouseStore.activeMappingType),
  set: (val: string) => { mouseStore.activeMappingType = Number(val) },
})

const tabItems = [
  { value: '0', label: 'STRID_SETTING_MAPPING_TYPE_KEY' },
  { value: '1', label: 'STRID_SETTING_MAPPING_TYPE_MACRO' },
  { value: '2', label: 'STRID_SETTING_MAPPING_TYPE_FUNCTION' },
  { value: '3', label: 'STRID_NONE' },
]

const ctrlOptions = [
  { value: '', label: 'None' },
  { value: 'Ctrl', label: 'Ctrl' },
  { value: 'Alt', label: 'Alt' },
  { value: 'Shift', label: 'Shift' },
]

const keyOptions = [
  { value: '', label: 'None' },
  { value: 'Left Click', label: 'Left Click' },
  { value: 'Right Click', label: 'Right Click' },
  { value: 'Middle Click', label: 'Middle Click' },
  { value: 'Wheel Up', label: 'Wheel Up' },
  { value: 'Wheel Down', label: 'Wheel Down' },
]

const mappedKeyVal = computed({
  get: () => selectedKey.value?.mappedKey ?? '',
  set: (val: string) => {
    if (mouseStore.selectedMappingKey) {
      const current = mouseStore.mappingKeys[mouseStore.selectedMappingKey]
      mouseStore.setMappingKey(mouseStore.selectedMappingKey, { ...current, mappedKey: val })
    }
  },
})

const ctrlKey1Val = computed({
  get: () => selectedKey.value?.ctrlKey1 ?? '',
  set: (val: string) => {
    if (mouseStore.selectedMappingKey) {
      const current = mouseStore.mappingKeys[mouseStore.selectedMappingKey]
      mouseStore.setMappingKey(mouseStore.selectedMappingKey, { ...current, ctrlKey1: val })
    }
  },
})

const ctrlKey2Val = computed({
  get: () => selectedKey.value?.ctrlKey2 ?? '',
  set: (val: string) => {
    if (mouseStore.selectedMappingKey) {
      const current = mouseStore.mappingKeys[mouseStore.selectedMappingKey]
      mouseStore.setMappingKey(mouseStore.selectedMappingKey, { ...current, ctrlKey2: val })
    }
  },
})

const isWheelKey = computed(() => mappedKeyVal.value.includes('Wheel'))

const turboEnabled = computed({
  get: () => !!selectedKey.value?.turbo?.enabled,
  set: (val: boolean) => {
    if (mouseStore.selectedMappingKey) {
      const current = mouseStore.mappingKeys[mouseStore.selectedMappingKey]
      mouseStore.setMappingKey(mouseStore.selectedMappingKey, {
        ...current,
        turbo: val ? { enabled: true, freq: 100, rand: 0, downKeep: 0, upKeep: 0 } : undefined,
      })
    }
  },
})
</script>

<template>
  <div class="mapping-card">
    <img
      src="https://hub.miracletek.net/hub/img/rawm_hub.png?v=202412080015"
      style="height: 30px;"
      alt="RAWM"
    />

    <p class="section-title">{{ $t('STRID_SETTING_MAPPING_TYPE') }}</p>

    <RawmTabs
      v-model="currentMappingType"
      :tabs="tabItems.map(t => ({ value: t.value, label: $t(t.label) }))"
      class="mapping-tabs"
    >
      <!-- Key mapping -->
      <div v-show="currentMappingType === '0'" class="tab-content">
        <div class="row-between">
          <div class="title-bar">
            <div class="layui-setting-title-bar" />
            <span class="title-text">{{ $t('STRID_SETTING_MAPPING_SELECT_KEY') }}</span>
          </div>
          <RawmButton variant="primary" size="sm">{{ $t('STRID_SETTING_MAPPING_KEY_RECORD') }}</RawmButton>
        </div>

        <p class="field-label">{{ $t('STRID_SETTING_MAPPING_CTRL_KEY') }}</p>
        <div class="row">
          <RawmSelect v-model="ctrlKey1Val" :options="ctrlOptions" />
          <RawmSelect v-model="ctrlKey2Val" :options="ctrlOptions" />
        </div>

        <p class="field-label">{{ $t('STRID_SETTING_MAPPING_TYPE_KEY') }}</p>
        <div class="row">
          <RawmSelect v-model="mappedKeyVal" :options="keyOptions" />
          <div v-if="isWheelKey" class="wheel-delta">
            <span class="field-label">{{ $t('STRID_SETTING_MAPPING_MACRO_ACTION_WHEEL_DELTA_S') }}</span>
            <input type="number" class="layui-input" min="1" max="64" value="1" style="width: 70px;" />
          </div>
        </div>

        <div class="turbo-section">
          <RawmCheckbox v-model="turboEnabled">{{ $t('STRID_SETTING_MAPPING_KEY_TURBO') }}</RawmCheckbox>
          <div v-if="turboEnabled" class="turbo-fields">
            <div class="row">
              <label class="input-pair">
                <span>{{ $t('STRID_SETTING_MAPPING_KEY_TURBO_FREQ') }}</span>
                <input type="number" class="layui-input" min="1" max="1000" value="100" style="width: 80px;" />
              </label>
              <label class="input-pair">
                <span>{{ $t('STRID_SETTING_MAPPING_KEY_TURBO_RAND') }}</span>
                <input type="number" class="layui-input" min="0" value="0" style="width: 70px;" />
              </label>
            </div>
            <div class="row">
              <label class="input-pair">
                <span>{{ $t('STRID_SETTING_MAPPING_KEY_TURBO_DOWN_KEEP') }}</span>
                <input type="number" class="layui-input" min="0" value="0" style="width: 80px;" />
              </label>
              <label class="input-pair">
                <span>{{ $t('STRID_SETTING_MAPPING_KEY_TURBO_UP_KEEP') }}</span>
                <input type="number" class="layui-input" min="0" value="0" style="width: 70px;" />
              </label>
            </div>
          </div>
        </div>

        <div class="title-bar" style="margin-top: 12px;">
          <div class="layui-setting-title-bar" />
          <span class="title-text">{{ $t('STRID_SETTING_MAPPING_KEY_CMD') }}</span>
        </div>
      </div>

      <!-- Macro mapping -->
      <div v-show="currentMappingType === '1'" class="tab-content">
        <div class="row-between">
          <div class="title-bar">
            <div class="layui-setting-title-bar" />
            <span class="title-text">{{ $t('STRID_SETTING_MAPPING_MACRO') }}</span>
          </div>
          <RawmButton variant="primary" size="sm">{{ $t('STRID_EDIT') }}</RawmButton>
        </div>
        <p class="field-label">{{ $t('STRID_SETTING_MAPPING_MACRO_TRIGGER_TYPE') }}</p>
        <RawmSelect :options="[{ value: 'press', label: '按下' }, { value: 'toggle', label: '切换' }, { value: 'hold', label: '按住' }]" />
        <p class="field-label">{{ $t('STRID_SETTING_MAPPING_TOGGLE_KEY2') }}</p>
        <RawmSelect :options="[{ value: '', label: 'None' }]" />
        <p class="field-label">{{ $t('STRID_SETTING_MAPPING_MACRO_STOP_KEY') }}</p>
        <RawmSelect :options="[{ value: '', label: 'None' }]" />
      </div>

      <!-- Function mapping -->
      <div v-show="currentMappingType === '2'" class="tab-content">
        <div class="title-bar">
          <div class="layui-setting-title-bar" />
          <span class="title-text">{{ $t('STRID_SETTING_MAPPING_TYPE_FUNCTION_SELECT') }}</span>
        </div>
        <RawmSelect :options="[
          { value: '', label: 'None' },
          { value: 'dpi', label: 'DPI' },
          { value: 'esb', label: 'ESB' },
          { value: 'ble', label: 'BLE' },
          { value: 'showPower', label: 'Show Power' },
        ]" />
      </div>

      <!-- None -->
      <div v-show="currentMappingType === '3'" class="tab-content" />
    </RawmTabs>
  </div>
</template>

<style scoped>
.mapping-card {
  width: 330px;
  padding: 10px;
  background-color: hsl(var(--card));
  border-radius: 4px;
  box-sizing: border-box;
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 8px;
  color: hsl(var(--card-foreground));
}

.mapping-tabs {
  margin-top: 4px;
}

.tab-content {
  padding: 8px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.row {
  display: flex;
  gap: 10px;
}

.row > * {
  flex: 1;
}

.row-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.title-bar {
  display: flex;
  align-items: center;
  gap: 6px;
}

.title-text {
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
  color: hsl(var(--card-foreground));
}

.field-label {
  font-size: 13px;
  font-weight: 500;
  color: hsl(var(--muted-foreground));
}

.wheel-delta {
  display: flex;
  align-items: center;
  gap: 8px;
}

.turbo-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 4px;
}

.turbo-fields {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-left: 8px;
}

.input-pair {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  white-space: nowrap;
}

.input-pair span {
  flex: 1;
  text-align: right;
}

.input-pair input {
  flex-shrink: 0;
}
</style>
