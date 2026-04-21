import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { DpiLevel, PollingRate, MappingKey, Macro } from '@/types'

export const useMouseSettingsStore = defineStore('mouseSettings', () => {
  const dpiLevels = ref<DpiLevel[]>([
    { id: 0, x: 800, y: 800, color: '#16B777' },
    { id: 1, x: 1200, y: 1200, color: '#1E9FFF' },
    { id: 2, x: 1600, y: 1600, color: '#FA584D' },
    { id: 3, x: 2400, y: 2400, color: '#FFB800' },
  ])
  const currentDpiIndex = ref(0)
  const dpiBothXY = ref(false)
  const dpiEditing = ref(false)

  const pollingRates = ref<PollingRate[]>([
    { value: 125, label: '125Hz' },
    { value: 250, label: '250Hz' },
    { value: 500, label: '500Hz' },
    { value: 1000, label: '1000Hz' },
  ])
  const currentPollingRate = ref(1000)
  const xPolling = ref(false)
  const xPollingValue = ref(2000)
  const glassMode = ref(false)

  const lightMode = ref(1)
  const lightAutoOff = ref(false)
  const brightness = ref(80)
  const lightColors = ref<string[]>(['#16B777', '#1E9FFF', '#FA584D'])
  const lightDefineColors = ref<string[]>(['#16B777', '#1E9FFF', '#FA584D', '#FFB800'])

  const powerModes = ref([
    { value: 0, label: '节能' },
    { value: 1, label: '平衡' },
    { value: 2, label: '性能' },
  ])
  const currentPowerMode = ref(1)

  const lods = ref([
    { value: 0, label: '低' },
    { value: 1, label: '中' },
    { value: 2, label: '高' },
  ])
  const currentLod = ref(1)

  const angleSnapping = ref(false)
  const rippleControl = ref(false)
  const motionSync = ref(false)
  const wirelessTurbo = ref(false)

  const rfChannels = ref([
    { value: 2, label: '模式 1' },
    { value: 40, label: '模式 2' },
    { value: 80, label: '模式 3' },
    { value: -1, label: '自动' },
  ])
  const currentRfChannel = ref(-1)
  const powerSaving = ref(true)
  const sleepTime = ref(300)
  const angleTuning = ref(0)

  const keyDelay = ref({
    enabled: false,
    selectKey: '',
    downDelay: 0,
    upDelay: 0,
  })

  const onboardConfig = ref(0)
  const combinationKey = ref('R')
  const allowSwitch = ref(true)

  const mappingKeys = ref<Record<string, MappingKey>>({
    setting_mapping_key_m1: { key: '', desc: '', type: 'none' },
    setting_mapping_key_m2: { key: '', desc: '', type: 'none' },
    setting_mapping_key_m3: { key: '', desc: '', type: 'none' },
    setting_mapping_key_m4: { key: '', desc: '', type: 'none' },
    setting_mapping_key_m5: { key: '', desc: '', type: 'none' },
    setting_mapping_key_m6: { key: '', desc: '', type: 'none' },
    setting_mapping_key_m7: { key: '', desc: '', type: 'none' },
    setting_mapping_key_wheel_up: { key: '', desc: '', type: 'none' },
    setting_mapping_key_wheel_down: { key: '', desc: '', type: 'none' },
  })

  const macros = ref<Macro[]>([])
  const activeMappingType = ref(3)
  const selectedMappingKey = ref<string | null>(null)

  const fwChannel = ref(0)
  const wirelessQuality = ref(0)
  const surfaceQuality = ref(0)

  function setDpiLevel(index: number, x: number, y: number, color: string) {
    if (dpiLevels.value[index]) {
      dpiLevels.value[index] = { id: index, x, y: dpiBothXY.value ? y : x, color }
    }
  }

  function addDpiLevel(x: number, y: number, color: string) {
    const newId = dpiLevels.value.length
    dpiLevels.value.push({ id: newId, x, y: dpiBothXY.value ? y : x, color })
  }

  function removeDpiLevel(index: number) {
    if (dpiLevels.value.length > 1) {
      dpiLevels.value.splice(index, 1)
      if (currentDpiIndex.value >= dpiLevels.value.length) {
        currentDpiIndex.value = dpiLevels.value.length - 1
      }
    }
  }

  function setMappingKey(keyId: string, mapping: MappingKey) {
    mappingKeys.value[keyId] = mapping
  }

  function addMacro(macro: Macro) {
    macros.value.push(macro)
  }

  function updateMacro(id: number, macro: Macro) {
    const index = macros.value.findIndex(m => m.id === id)
    if (index !== -1) {
      macros.value[index] = macro
    }
  }

  function removeMacro(id: number) {
    macros.value = macros.value.filter(m => m.id !== id)
  }

  function resetToDefaults() {
    dpiLevels.value = [
      { id: 0, x: 800, y: 800, color: '#16B777' },
      { id: 1, x: 1200, y: 1200, color: '#1E9FFF' },
      { id: 2, x: 1600, y: 1600, color: '#FA584D' },
      { id: 3, x: 2400, y: 2400, color: '#FFB800' },
    ]
    currentDpiIndex.value = 0
    currentPollingRate.value = 1000
    lightMode.value = 1
    brightness.value = 80
    currentPowerMode.value = 1
    currentLod.value = 1
    angleSnapping.value = false
    rippleControl.value = false
    motionSync.value = false
    wirelessTurbo.value = false
    powerSaving.value = true
    sleepTime.value = 300
    angleTuning.value = 0
  }

  return {
    dpiLevels,
    currentDpiIndex,
    dpiBothXY,
    dpiEditing,
    pollingRates,
    currentPollingRate,
    xPolling,
    xPollingValue,
    glassMode,
    lightMode,
    lightAutoOff,
    brightness,
    lightColors,
    lightDefineColors,
    powerModes,
    currentPowerMode,
    lods,
    currentLod,
    angleSnapping,
    rippleControl,
    motionSync,
    wirelessTurbo,
    rfChannels,
    currentRfChannel,
    powerSaving,
    sleepTime,
    angleTuning,
    keyDelay,
    onboardConfig,
    combinationKey,
    allowSwitch,
    mappingKeys,
    macros,
    activeMappingType,
    selectedMappingKey,
    fwChannel,
    wirelessQuality,
    surfaceQuality,
    setDpiLevel,
    addDpiLevel,
    removeDpiLevel,
    setMappingKey,
    addMacro,
    updateMacro,
    removeMacro,
    resetToDefaults,
  }
})
