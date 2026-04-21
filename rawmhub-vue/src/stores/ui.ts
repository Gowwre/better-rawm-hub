import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUiStore = defineStore('ui', () => {
  const language = ref('zh_CN')
  const darkTheme = ref(true)
  const activePanel = ref<'pair' | 'connect' | 'device' | 'mouse' | 'keyboard' | 'not-support'>('pair')
  const showBackButton = ref(false)
  const showPairMore = ref(false)
  const showDownload = ref(false)
  const showUsbChannel = ref(false)
  const showKbdWaiting = ref(false)
  const autoZoom = ref(1.0)

  const dialogState = ref({
    recordMappingKey: false,
    macroEdit: false,
    macroAdd: false,
    macroRecord: false,
    factoryReset: false,
    wirelessOptimize: false,
    receiverLight: false,
    keyDelayGuide: false,
    selectKey: false,
    dpiLevelInput: false,
  })

  function setLanguage(lang: string) {
    language.value = lang
  }

  function toggleTheme() {
    darkTheme.value = !darkTheme.value
  }

  function setPanel(panel: typeof activePanel.value) {
    activePanel.value = panel
  }

  function openDialog(dialog: keyof typeof dialogState.value) {
    dialogState.value[dialog] = true
  }

  function closeDialog(dialog: keyof typeof dialogState.value) {
    dialogState.value[dialog] = false
  }

  function closeAllDialogs() {
    Object.keys(dialogState.value).forEach(key => {
      dialogState.value[key as keyof typeof dialogState.value] = false
    })
  }

  function calculateAutoZoom() {
    const width = window.innerWidth
    autoZoom.value = Math.min(1, width / 1920)
  }

  return {
    language,
    darkTheme,
    activePanel,
    showBackButton,
    showPairMore,
    showDownload,
    showUsbChannel,
    showKbdWaiting,
    autoZoom,
    dialogState,
    setLanguage,
    toggleTheme,
    setPanel,
    openDialog,
    closeDialog,
    closeAllDialogs,
    calculateAutoZoom,
  }
})
