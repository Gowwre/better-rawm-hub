<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useDeviceStore } from '@/stores/device'
import { useUiStore } from '@/stores/ui'
import { getDeviceImageUrl } from '@/utils/deviceImage'
import { refreshDevices } from '@/utils/hidBridge'
import { useNativeHid } from '@/composables/useNativeHid'
import { useNativeHidFlag } from '@/composables/useHidMode'

const { t } = useI18n()
const deviceStore = useDeviceStore()
const uiStore = useUiStore()
const native = useNativeHid()

async function connectDevice() {
  if (!('hid' in navigator)) return

  deviceStore.isPairing = true
  try {
    if (useNativeHidFlag.value) {
      // Native WebHID mode: pair directly through RawmDeviceManager
      await native.pair()
      // The native composable updates reactive refs automatically via manager.on()
      if (native.devices.value.length > 0) {
        uiStore.setPanel('device')
      }
    } else {
      // Iframe bridge mode: request permission + fallback population
      const rawDevices = await (navigator as any).hid.requestDevice({ filters: [] })

      for (const raw of rawDevices) {
        const product = raw.productName || 'Unknown Device'
        const isKeyboard = product.toLowerCase().includes('keyboard') || product.toLowerCase().includes('kbd')
        const type = isKeyboard ? 'keyboard' as const : 'mouse' as const
        deviceStore.addDevice({
          id: `${raw.vendorId}-${raw.productId}`,
          name: product,
          model: product,
          type,
          battery: undefined,
          rssi: undefined,
          firmwareVersion: '1.0.0',
          hasNewFirmware: false,
          imageUrl: getDeviceImageUrl(raw.productId, type),
          isConnected: true,
        })
      }

      if (deviceStore.devices.length > 0) {
        deviceStore.selectDevice(deviceStore.devices[0])
        uiStore.setPanel('device')
      }

      refreshDevices()
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
