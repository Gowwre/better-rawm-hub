<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useDeviceStore } from '@/stores/device'
import { useUiStore } from '@/stores/ui'

const { t } = useI18n()
const deviceStore = useDeviceStore()
const uiStore = useUiStore()

async function refreshDevices() {
  try {
    const devices = await (navigator as any).hid.getDevices()
    for (const device of devices) {
      const product = device.productName || 'Unknown Device'
      const isKeyboard = product.toLowerCase().includes('keyboard') || product.toLowerCase().includes('kbd')
      deviceStore.addDevice({
        id: `${device.vendorId}-${device.productId}`,
        name: product,
        model: product,
        type: isKeyboard ? 'keyboard' as const : 'mouse' as const,
        battery: Math.floor(Math.random() * 100),
        rssi: Math.floor(Math.random() * 40) + 60,
        firmwareVersion: '1.0.0',
        hasNewFirmware: Math.random() > 0.5,
        imageUrl: '',
        isConnected: true,
      })
    }
  } catch (e) {
    console.error('Failed to refresh devices:', e)
  }
}
</script>

<template>
  <div id="connect-panel" class="connect-panel">
    <p class="tips">{{ t('STRID_WEBHUB_REFRESH_TIPS') }}</p>
    <button class="layui-btn layui-btn-radius layui-bg-blue" @click="refreshDevices">
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
