<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useDeviceStore } from '@/stores/device'
import { useUiStore } from '@/stores/ui'
import { useMouseSettingsStore } from '@/stores/mouseSettings'

const { t } = useI18n()
const deviceStore = useDeviceStore()
const uiStore = useUiStore()
const mouseStore = useMouseSettingsStore()

const logoUrl = 'https://hub.miracletek.net/hub/img/rawm_hub.png?v=202412080015'

const languages = [
  { value: 'zh_CN', label: '简体中文' },
  { value: 'en_US', label: 'English' },
  { value: 'zh_TW', label: '繁體中文' },
  { value: 'ko_KR', label: '한국어' },
  { value: 'ja_JP', label: '日本語' },
  { value: 'uk_UA', label: 'Українська' },
  { value: 'tr_TR', label: 'Türkçe' },
]

function handleBack() {
  uiStore.showBackButton = false
  if (deviceStore.currentDevice?.type === 'mouse') {
    uiStore.setPanel('device')
  } else {
    uiStore.setPanel('device')
  }
}

function handlePairMore() {
  uiStore.setPanel('connect')
}

function handleDownload() {
  uiStore.showDownload = !uiStore.showDownload
}

function handleLanguageChange(event: Event) {
  const target = event.target as HTMLSelectElement
  uiStore.setLanguage(target.value)
}

function handleThemeToggle() {
  uiStore.toggleTheme()
}

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

function handleFwChannelChange(value: number) {
  mouseStore.fwChannel = value
}
</script>

<template>
  <div class="layui-logo layui-auto-zoom">
    <img :src="logoUrl" class="logo-img" />
    <button
      v-if="uiStore.showBackButton"
      class="layui-btn layui-btn-radius layui-bg-blue back-btn"
      @click="handleBack"
    >
      {{ t('STRID_SETTING_MAPPING_NOT_SAVED_BACK_S', '返回') }}
    </button>
  </div>

  <div class="layui-pair-more layui-auto-zoom">
    <div class="usb-channel-selector" v-if="uiStore.showUsbChannel">
      <p class="channel-label">{{ t('STRID_SETTING_FW_CHANNEL', '固件通道') }}</p>
      <div class="layui-form">
        <label class="radio-item">
          <input type="radio" name="fw-channel" :checked="mouseStore.fwChannel === 0" @change="handleFwChannelChange(0)" />
          {{ t('STRID_SETTING_FW_CHANNEL_STANDARD', '标准') }}
        </label>
        <label class="radio-item">
          <input type="radio" name="fw-channel" :checked="mouseStore.fwChannel === 1" @change="handleFwChannelChange(1)" />
          {{ t('STRID_SETTING_FW_CHANNEL_GAME_ONLY', '竞技') }}
        </label>
      </div>
    </div>

    <button
      v-if="uiStore.showPairMore && deviceStore.devices.length > 0"
      class="layui-btn layui-btn-radius layui-bg-blue"
      @click="handlePairMore"
    >
      {{ t('STRID_WEBHUB_CONNECT_MORE_DEVICES') }}
    </button>

    <button
      class="layui-btn layui-btn-radius layui-bg-blue"
      @click="handleDownload"
    >
      {{ t('STRID_WEBHUB_DOWNLOAD_APP') }}
    </button>

    <div class="language-selector">
      <select :value="uiStore.language" @change="handleLanguageChange">
        <option value="">{{ t('STRID_WEBHUB_SYSTEM_LANGUAGE') }}</option>
        <option v-for="lang in languages" :key="lang.value" :value="lang.value">
          {{ lang.label }}
        </option>
      </select>
    </div>

    <div class="theme-toggle">
      <input
        type="checkbox"
        name="dark-theme"
        lay-skin="switch"
        :checked="uiStore.darkTheme"
        @change="handleThemeToggle"
      />
      <span>{{ uiStore.darkTheme ? '深色' : '浅色' }}</span>
    </div>

    <button
      v-if="uiStore.activePanel === 'pair'"
      class="layui-btn layui-btn-radius layui-bg-blue"
      @click="connectDevice"
      :disabled="deviceStore.isPairing"
    >
      {{ deviceStore.isPairing ? '连接中...' : t('STRID_WEBHUB_CONNECT_DEVICE') }}
    </button>
  </div>
</template>

<style scoped>
.logo-img {
  position: absolute;
  margin-left: 20px;
  margin-top: 10px;
  height: 40px;
}

.back-btn {
  position: absolute;
  margin-left: 10px;
  margin-top: 15px;
}

.usb-channel-selector {
  display: flex;
  align-items: center;
  margin-right: 15px;
}

.channel-label {
  margin-right: 10px;
  font-size: 14px;
}

.radio-item {
  margin-right: 10px;
  font-size: 13px;
}

.language-selector {
  margin-left: 15px;
}

.language-selector select {
  width: 100px;
  height: 30px;
  padding: 0 5px;
  border-radius: 4px;
  border: 1px solid #666;
  background-color: rgba(255, 255, 255, 0.1);
  color: inherit;
}

.theme-toggle {
  margin-left: 10px;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 13px;
}

.theme-toggle input[type="checkbox"] {
  cursor: pointer;
}
</style>
