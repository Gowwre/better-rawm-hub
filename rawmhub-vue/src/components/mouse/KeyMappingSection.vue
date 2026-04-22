<script setup lang="ts">
import { computed, ref } from 'vue'
import { useMouseSettingsStore } from '@/stores/mouseSettings'
import { RawmTabs, RawmSelect, RawmCheckbox, RawmButton } from '@/components/ui'
import { useNativeHid } from '@/composables/useNativeHid'
import { useNativeHidFlag } from '@/composables/useHidMode'
import { KEYS, MODIFIERS } from '@/lib/rawm-keymaps'
import {
  WM_KEYDOWN,
  WM_KEYUP,
  WM_MOUSEWHEEL,
  WM_MOUSEHWHEEL,
  WM_MOUSEMOVE,
  WM_MOUSEPOSITION,
} from '@/lib/rawm-protocol'
import {
  FUNCTION_TYPE_NONE,
  FUNCTION_TYPE_DPI_CLUTCH,
  FUNCTION_TYPE_DPI_CYCLE_UP,
  FUNCTION_TYPE_DPI_CYCLE_DOWN,
  FUNCTION_TYPE_TOGGLE_ESB,
  FUNCTION_TYPE_TOGGLE_BLE,
  FUNCTION_TYPE_SHOW_POWER,
  FUNCTION_TYPE_SHELL_CMD,
} from '@/lib/rawm-mouse-keymap'
import type { MacroAction as ProtoMacroAction } from '@/lib/rawm-device'

const mouseStore = useMouseSettingsStore()
const native = useNativeHid()

const busy = ref(false)
const error = ref('')

// ---------------------------------------------------------------------------
// Key ID mapping (UI string → firmware numeric id)
// ---------------------------------------------------------------------------

const KEY_ID_MAP: Record<string, number> = {
  setting_mapping_key_m1: 0,
  setting_mapping_key_m2: 1,
  setting_mapping_key_m3: 2,
  setting_mapping_key_m4: 3,
  setting_mapping_key_m5: 4,
  setting_mapping_key_m6: 5,
  setting_mapping_key_m7: 6,
  setting_mapping_key_wheel_up: 7,
  setting_mapping_key_wheel_down: 8,
}

function getSelectedKeyIds(): number[] {
  if (!mouseStore.selectedMappingKey) return []
  const id = KEY_ID_MAP[mouseStore.selectedMappingKey]
  return id !== undefined ? [id] : []
}

// ---------------------------------------------------------------------------
// Key options (built from protocol key tables)
// ---------------------------------------------------------------------------

const keyOptions = [
  { value: '', label: 'None', vCode: 0x00 },
  ...KEYS.map(k => ({ value: k.name, label: k.name, vCode: k.vCode })),
]

function findVCodeByName(name: string): number {
  const found = keyOptions.find(o => o.value === name)
  return found?.vCode ?? 0x00
}

// ---------------------------------------------------------------------------
// Modifier options
// ---------------------------------------------------------------------------

const ctrlOptions = [
  { value: '', label: 'None', vCode: 0x00 },
  ...MODIFIERS.filter(m => m.vCode !== 0x00).map(m => ({
    value: m.name,
    label: m.name,
    vCode: m.vCode,
  })),
]

function findModifierVCode(name: string): number {
  const found = ctrlOptions.find(o => o.value === name)
  return found?.vCode ?? 0x00
}

// ---------------------------------------------------------------------------
// Selected key reactive helpers
// ---------------------------------------------------------------------------

const selectedKey = computed((): { key: string; desc: string; type: string; ctrlKey1?: string; ctrlKey2?: string; mappedKey?: string; wheelDelta?: number; turbo?: any } | null => {
  if (!mouseStore.selectedMappingKey) return null
  return mouseStore.mappingKeys[mouseStore.selectedMappingKey] as any
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

const mappedKeyVal = computed({
  get: () => selectedKey.value?.mappedKey ?? '',
  set: (val: string) => {
    if (mouseStore.selectedMappingKey) {
      const current = { ...(mouseStore.mappingKeys[mouseStore.selectedMappingKey] as any) }
      current.mappedKey = val
      mouseStore.setMappingKey(mouseStore.selectedMappingKey, current)
    }
  },
})

const ctrlKey1Val = computed({
  get: () => selectedKey.value?.ctrlKey1 ?? '',
  set: (val: string) => {
    if (mouseStore.selectedMappingKey) {
      const current = { ...(mouseStore.mappingKeys[mouseStore.selectedMappingKey] as any) }
      current.ctrlKey1 = val
      mouseStore.setMappingKey(mouseStore.selectedMappingKey, current)
    }
  },
})

const ctrlKey2Val = computed({
  get: () => selectedKey.value?.ctrlKey2 ?? '',
  set: (val: string) => {
    if (mouseStore.selectedMappingKey) {
      const current = { ...(mouseStore.mappingKeys[mouseStore.selectedMappingKey] as any) }
      current.ctrlKey2 = val
      mouseStore.setMappingKey(mouseStore.selectedMappingKey, current)
    }
  },
})

const wheelDeltaVal = computed({
  get: () => selectedKey.value?.wheelDelta ?? 1,
  set: (val: number) => {
    if (mouseStore.selectedMappingKey) {
      const current = { ...(mouseStore.mappingKeys[mouseStore.selectedMappingKey] as any) }
      current.wheelDelta = val
      mouseStore.setMappingKey(mouseStore.selectedMappingKey, current)
    }
  },
})

const isWheelKey = computed(() => {
  const name = mappedKeyVal.value
  return name.includes('Wheel') && name !== ''
})

// ---------------------------------------------------------------------------
// Function mapping
// ---------------------------------------------------------------------------

const functionOptions = [
  { value: '', label: 'None', type: FUNCTION_TYPE_NONE },
  { value: 'dpi', label: 'DPI Clutch', type: FUNCTION_TYPE_DPI_CLUTCH },
  { value: 'dpiUp', label: 'DPI Cycle Up', type: FUNCTION_TYPE_DPI_CYCLE_UP },
  { value: 'dpiDown', label: 'DPI Cycle Down', type: FUNCTION_TYPE_DPI_CYCLE_DOWN },
  { value: 'esb', label: 'Toggle ESB', type: FUNCTION_TYPE_TOGGLE_ESB },
  { value: 'ble', label: 'Toggle BLE', type: FUNCTION_TYPE_TOGGLE_BLE },
  { value: 'showPower', label: 'Show Power', type: FUNCTION_TYPE_SHOW_POWER },
]

const selectedFunctionType = ref('')
const selectedFunctionParam = ref(0)

// ---------------------------------------------------------------------------
// Macro mapping
// ---------------------------------------------------------------------------

const macroTriggerOptions = [
  { value: 'press', label: '按下', type: 0 },
  { value: 'toggle', label: '切换', type: 1 },
  { value: 'hold', label: '按住', type: 2 },
]

const selectedMacroId = ref<number | null>(null)
const selectedTriggerType = ref('press')

function getMacroById(id: number | null) {
  if (id === null) return null
  return mouseStore.macros.find(m => m.id === id) ?? null
}

// ---------------------------------------------------------------------------
// Apply handlers (native mode)
// ---------------------------------------------------------------------------

async function applyKeyMapping() {
  if (!useNativeHidFlag.value) return
  error.value = ''
  busy.value = true

  try {
    const keyIds = getSelectedKeyIds()
    if (keyIds.length === 0) {
      error.value = 'No mapping key selected'
      return
    }

    const vkCode = findVCodeByName(mappedKeyVal.value)
    const modifier = findModifierVCode(ctrlKey1Val.value) | findModifierVCode(ctrlKey2Val.value)
    const wheelData = isWheelKey.value ? (wheelDeltaVal.value || 1) : 0

    await native.setMouseKeyMapping({
      keyIds,
      modifier,
      vkCode,
      macroIndex: 0,
      wheelData,
    })
  } catch (err: any) {
    error.value = err?.message || String(err)
  } finally {
    busy.value = false
  }
}

async function applyFunctionMapping() {
  if (!useNativeHidFlag.value) return
  error.value = ''
  busy.value = true

  try {
    const keyIds = getSelectedKeyIds()
    if (keyIds.length === 0) {
      error.value = 'No mapping key selected'
      return
    }

    const func = functionOptions.find(f => f.value === selectedFunctionType.value)
    if (!func || func.type === FUNCTION_TYPE_NONE) {
      error.value = 'No function selected'
      return
    }

    await native.setMouseFunctionMapping({
      keyIds,
      functionType: func.type,
      param: selectedFunctionParam.value,
    })
  } catch (err: any) {
    error.value = err?.message || String(err)
  } finally {
    busy.value = false
  }
}

async function applyMacroMapping() {
  if (!useNativeHidFlag.value) return
  error.value = ''
  busy.value = true

  try {
    const keyIds = getSelectedKeyIds()
    if (keyIds.length === 0) {
      error.value = 'No mapping key selected'
      return
    }

    const macro = getMacroById(selectedMacroId.value)
    if (!macro) {
      error.value = 'No macro selected'
      return
    }

    const trigger = macroTriggerOptions.find(t => t.value === selectedTriggerType.value)
    const triggerType = trigger?.type ?? 0

    // Convert store macro actions → protocol macro actions
    const actions: ProtoMacroAction[] = macro.actions.map((a, idx) => {
      let event = WM_KEYDOWN
      let keyCode = 0
      let mouseX = 0
      let mouseY = 0

      switch (a.type) {
        case 'keydown':
          event = WM_KEYDOWN
          keyCode = findVCodeByName(a.key || '')
          break
        case 'keyup':
          event = WM_KEYUP
          keyCode = findVCodeByName(a.key || '')
          break
        case 'wheel':
          event = a.key?.includes('Left') || a.key?.includes('Right')
            ? WM_MOUSEHWHEEL
            : WM_MOUSEWHEEL
          keyCode = (a.delta || 0) + 0x40
          break
        case 'move':
          event = WM_MOUSEMOVE
          mouseX = a.x || 0
          mouseY = a.y || 0
          keyCode = ((mouseX & 0xffff) << 16) | (mouseY & 0xffff)
          break
        case 'position':
          event = WM_MOUSEPOSITION
          mouseX = a.x || 0
          mouseY = a.y || 0
          keyCode = ((mouseX & 0xffff) << 16) | (mouseY & 0xffff)
          break
        case 'delay':
          // Delays are encoded as part of the action's delay field
          break
      }

      return {
        event,
        key_code: keyCode,
        delay: a.delay || 0,
        mouse_x: mouseX,
        mouse_y: mouseY,
      }
    })

    await native.sendMacro(keyIds, macro.id, triggerType, actions, macro.name)
  } catch (err: any) {
    error.value = err?.message || String(err)
  } finally {
    busy.value = false
  }
}
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
            <input
              v-model.number="wheelDeltaVal"
              type="number"
              class="layui-input"
              min="1"
              max="64"
              style="width: 70px;"
            />
          </div>
        </div>

        <div v-if="useNativeHidFlag" class="apply-row">
          <RawmButton variant="primary" size="sm" :disabled="busy" @click="applyKeyMapping">
            {{ $t('STRID_SETTING_MAPPING_APPLY') || 'Apply' }}
          </RawmButton>
        </div>
      </div>

      <!-- Macro mapping -->
      <div v-show="currentMappingType === '1'" class="tab-content">
        <div class="row-between">
          <div class="title-bar">
            <div class="layui-setting-title-bar" />
            <span class="title-text">{{ $t('STRID_SETTING_MAPPING_MACRO') }}</span>
          </div>
        </div>

        <p class="field-label">{{ $t('STRID_SETTING_MAPPING_MACRO_TRIGGER_TYPE') }}</p>
        <RawmSelect v-model="selectedTriggerType" :options="macroTriggerOptions" />

        <p class="field-label">Macro</p>
        <RawmSelect
          v-model="selectedMacroId"
          :options="[
            { value: null, label: 'None' },
            ...mouseStore.macros.map(m => ({ value: m.id, label: m.name })),
          ]"
        />

        <div v-if="useNativeHidFlag" class="apply-row">
          <RawmButton variant="primary" size="sm" :disabled="busy" @click="applyMacroMapping">
            {{ $t('STRID_SETTING_MAPPING_APPLY') || 'Apply' }}
          </RawmButton>
        </div>
      </div>

      <!-- Function mapping -->
      <div v-show="currentMappingType === '2'" class="tab-content">
        <div class="title-bar">
          <div class="layui-setting-title-bar" />
          <span class="title-text">{{ $t('STRID_SETTING_MAPPING_TYPE_FUNCTION_SELECT') }}</span>
        </div>

        <RawmSelect v-model="selectedFunctionType" :options="functionOptions" />

        <div v-if="selectedFunctionType === 'dpi'" class="param-row">
          <span class="field-label">DPI Value</span>
          <input v-model.number="selectedFunctionParam" type="number" class="layui-input" min="100" max="26000" step="50" style="width: 100px;" />
        </div>

        <div v-if="useNativeHidFlag" class="apply-row">
          <RawmButton variant="primary" size="sm" :disabled="busy" @click="applyFunctionMapping">
            {{ $t('STRID_SETTING_MAPPING_APPLY') || 'Apply' }}
          </RawmButton>
        </div>
      </div>

      <!-- None -->
      <div v-show="currentMappingType === '3'" class="tab-content" />
    </RawmTabs>

    <p v-if="error" class="error-text">{{ error }}</p>
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

.apply-row {
  display: flex;
  justify-content: flex-end;
  margin-top: 4px;
}

.param-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.error-text {
  font-size: 12px;
  color: var(--color-red);
  margin-top: 6px;
}
</style>
