/**
 * Shared HID mode state
 *
 * Controls whether the app uses the iframe bridge or native WebHID.
 * Both App.vue and settings panels import this to stay in sync.
 */

import { ref } from 'vue'

// Default to iframe bridge for safety. Can be toggled at runtime.
export const useNativeHidFlag = ref(false)

export function toggleHidMode() {
  useNativeHidFlag.value = !useNativeHidFlag.value
}

export function setHidMode(native: boolean) {
  useNativeHidFlag.value = native
}
