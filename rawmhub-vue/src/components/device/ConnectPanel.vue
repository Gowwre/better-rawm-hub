<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useDeviceStore } from '@/stores/device'
import { useUiStore } from '@/stores/ui'
import { refreshDevices } from '@/utils/hidBridge'
import { useNativeHid } from '@/composables/useNativeHid'
import { useNativeHidFlag } from '@/composables/useHidMode'

const { t } = useI18n()
const deviceStore = useDeviceStore()
const uiStore = useUiStore()
const native = useNativeHid()

async function onRefresh() {
  try {
    deviceStore.isConnecting = true

    if (useNativeHidFlag.value) {
      // Native mode: try to reconnect to granted devices
      await native.start()
      // Device list updates asynchronously via the manager listener
    } else {
      refreshDevices()
    }
  } catch (e) {
    console.error('Failed to refresh devices:', e)
  } finally {
    deviceStore.isConnecting = false
  }
}
</script>

<template>
  <div id="connect-panel" class="connect-panel">
    <p class="tips">{{ t('STRID_WEBHUB_REFRESH_TIPS') }}</p>
    <button class="layui-btn layui-btn-radius layui-bg-blue" @click="onRefresh">
      {{ t('STRID_WEBHUB_REFRESH') }}
    </button>
  </div>
</template>

<style scoped>
.connect-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  text-align: center;
}

.tips {
  font-size: 16px;
  margin-bottom: 20px;
  color: #888;
}
</style>
