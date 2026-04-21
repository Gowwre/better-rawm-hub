<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useDeviceStore } from '@/stores/device'
import { useUiStore } from '@/stores/ui'

const { t } = useI18n()
const deviceStore = useDeviceStore()
const uiStore = useUiStore()

async function connectDevice() {
  if (!('hid' in navigator)) return
  try {
    deviceStore.isPairing = true
    const devices = await (navigator as any).hid.requestDevice({ filters: [] })
    for (const device of devices) {
      const product = device.productName || 'Unknown Device'
      const isKeyboard = product.toLowerCase().includes('keyboard') || product.toLowerCase().includes('kbd')
      const newDevice = {
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
      }
      deviceStore.addDevice(newDevice)
    }
    if (deviceStore.devices.length > 0) {
      deviceStore.selectDevice(deviceStore.devices[0])
      uiStore.setPanel('device')
    }
  } catch (e) {
    console.error('Failed to connect device:', e)
  } finally {
    deviceStore.isPairing = false
  }
}
</script>

<template>
  <div id="pair-panel" class="pair-panel">
    <h1 class="slogan">{{ t('STRID_WEBHUB_RAWM_SLOGAN') }}</h1>
    <p class="desc">{{ t('STRID_WEBHUB_RAWM_HUB_DESC') }}</p>
    <p class="detail">{{ t('STRID_WEBHUB_RAWM_HUB_DETAIL') }}</p>
    <button
      class="layui-btn layui-btn-radius layui-bg-blue layui-btn-lg"
      @click="connectDevice"
      :disabled="deviceStore.isPairing"
    >
      {{ t('STRID_WEBHUB_CONNECT_DEVICE') }}
    </button>
    <i
      v-if="deviceStore.isPairing"
      class="layui-icon layui-icon-loading layui-anim layui-anim-rotate layui-anim-loop loading-icon"
    ></i>
    <p class="tips">{{ t('STRID_WEBHUB_CONNECT_TIPS') }}</p>
  </div>
</template>

<style scoped>
.pair-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
  text-align: center;
  padding: 20px;
}

.slogan {
  font-size: 60px;
  margin-bottom: 20px;
  background: transparent;
  color: inherit;
}

.desc {
  font-size: 20px;
  margin-bottom: 20px;
  color: #888;
}

.detail {
  font-size: 16px;
  margin-bottom: 80px;
  color: #666;
}

.loading-icon {
  font-size: 36px;
  margin-top: 20px;
}

.tips {
  font-size: 14px;
  margin-top: 20px;
  color: #888;
}
</style>
