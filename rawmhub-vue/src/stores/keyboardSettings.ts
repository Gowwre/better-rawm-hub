import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { KeyboardLightSetting, KeyboardAxisSetting } from '@/types'

export const useKeyboardSettingsStore = defineStore('keyboardSettings', () => {
  const mappingKeys = ref<Record<string, string>>({})
  const keyLayer = ref<'default' | 'fn'>('default')
  const activeKbdTab = ref(0)
  const activeSettingType = ref(0)

  const light = ref<KeyboardLightSetting>({
    mode: 'static',
    sleepTime: 300,
    brightness: 80,
    speed: 50,
    colors: {},
  })

  const lightBox = ref({
    mode: 'static',
    colored: false,
    brightness: 80,
    speed: 50,
    color: '#0000FF',
  })

  const axis = ref<KeyboardAxisSetting>({
    type: 'jdl',
    triggerPoint: 1.0,
    quickTriggerMode: false,
    pressDistance: 2.0,
    releaseDistance: 1.5,
    deadDistance: 0.5,
  })

  const socd = ref({
    key1: '',
    key2: '',
    type: 0,
  })

  const mt = ref({
    key: '',
    longPressKey: '',
    longPressTime: 200,
  })

  const rs = ref({
    key1: '',
    key2: '',
  })

  const dks = ref({
    keys: [
      { key: '', actions: ['', '', '', ''] },
      { key: '', actions: ['', '', '', ''] },
      { key: '', actions: ['', '', '', ''] },
      { key: '', actions: ['', '', '', ''] },
    ],
  })

  const firmwareVersion = ref('1.0.0')
  const hasNewFirmware = ref(false)
  const selectedKey = ref<string | null>(null)
  const selectedFunction = ref<string | null>(null)

  const macros = ref<{ id: number; name: string; actions: { type: string; key?: string; delay?: number }[] }[]>([])
  const currentMacroId = ref<number | null>(null)

  function setMappingKey(keyId: string, value: string) {
    mappingKeys.value[keyId] = value
  }

  function setAxisType(type: string) {
    axis.value.type = type
  }

  function setSocdKeys(key1: string, key2: string) {
    socd.value.key1 = key1
    socd.value.key2 = key2
  }

  function setMtKeys(key: string, longPressKey: string) {
    mt.value.key = key
    mt.value.longPressKey = longPressKey
  }

  function setRsKeys(key1: string, key2: string) {
    rs.value.key1 = key1
    rs.value.key2 = key2
  }

  function setDksKey(index: number, key: string, actionIndex: number, action: string) {
    if (dks.value.keys[index]) {
      dks.value.keys[index].key = key
      dks.value.keys[index].actions[actionIndex] = action
    }
  }

  function clearDksKey(index: number) {
    if (dks.value.keys[index]) {
      dks.value.keys[index] = { key: '', actions: ['', '', '', ''] }
    }
  }

  function addMacroAction(macroId: number, action: { type: string; key?: string; delay?: number }) {
    const macro = macros.value.find(m => m.id === macroId)
    if (macro) {
      macro.actions.push(action)
    }
  }

  function clearMacroActions(macroId: number) {
    const macro = macros.value.find(m => m.id === macroId)
    if (macro) {
      macro.actions = []
    }
  }

  function resetToDefaults() {
    mappingKeys.value = {}
    keyLayer.value = 'default'
    light.value = { mode: 'static', sleepTime: 300, brightness: 80, speed: 50, colors: {} }
    lightBox.value = { mode: 'static', colored: false, brightness: 80, speed: 50, color: '#0000FF' }
    axis.value = { type: 'jdl', triggerPoint: 1.0, quickTriggerMode: false, pressDistance: 2.0, releaseDistance: 1.5, deadDistance: 0.5 }
    socd.value = { key1: '', key2: '', type: 0 }
    mt.value = { key: '', longPressKey: '', longPressTime: 200 }
    rs.value = { key1: '', key2: '' }
    dks.value.keys = [
      { key: '', actions: ['', '', '', ''] },
      { key: '', actions: ['', '', '', ''] },
      { key: '', actions: ['', '', '', ''] },
      { key: '', actions: ['', '', '', ''] },
    ]
  }

  return {
    mappingKeys,
    keyLayer,
    activeKbdTab,
    activeSettingType,
    light,
    lightBox,
    axis,
    socd,
    mt,
    rs,
    dks,
    firmwareVersion,
    hasNewFirmware,
    selectedKey,
    selectedFunction,
    macros,
    currentMacroId,
    setMappingKey,
    setAxisType,
    setSocdKeys,
    setMtKeys,
    setRsKeys,
    setDksKey,
    clearDksKey,
    addMacroAction,
    clearMacroActions,
    resetToDefaults,
  }
})
