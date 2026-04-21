<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useDeviceStore } from '@/stores/device'
import { useUiStore } from '@/stores/ui'
import { useMouseSettingsStore } from '@/stores/mouseSettings'
import { RawmButton, RawmSwitch, RawmSelect } from '@/components/ui'

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
  uiStore.setPanel('device')
}

function handlePairMore() {
  uiStore.setPanel('connect')
}

function handleDownload() {
  uiStore.showDownload = !uiStore.showDownload
}

function handleLanguageChange(value: string | number | undefined) {
  if (typeof value === 'string') uiStore.setLanguage(value)
}

function handleThemeToggle(value: boolean) {
  uiStore.darkTheme = value
}

function handleFwChannelChange(value: number) {
  mouseStore.fwChannel = value
}
</script>

<template>
  <header class="app-header">
    <div class="header-left">
      <img :src="logoUrl" class="logo-img" alt="RAWM" />
      <RawmButton
        v-if="uiStore.showBackButton"
        variant="default"
        size="sm"
        @click="handleBack"
      >
        {{ t('STRID_SETTING_MAPPING_NOT_SAVED_BACK_S', '返回') }}
      </RawmButton>
    </div>

    <div class="header-center">
      <div v-if="uiStore.showUsbChannel" class="fw-channel">
        <span class="channel-label">{{ t('STRID_SETTING_FW_CHANNEL', '固件通道') }}</span>
        <label class="radio-pill">
          <input
            type="radio"
            name="fw-channel"
            :checked="mouseStore.fwChannel === 0"
            @change="handleFwChannelChange(0)"
          />
          {{ t('STRID_SETTING_FW_CHANNEL_STANDARD', '标准') }}
        </label>
        <label class="radio-pill">
          <input
            type="radio"
            name="fw-channel"
            :checked="mouseStore.fwChannel === 1"
            @change="handleFwChannelChange(1)"
          />
          {{ t('STRID_SETTING_FW_CHANNEL_GAME_ONLY', '竞技') }}
        </label>
      </div>
    </div>

    <div class="header-right">
      <RawmButton
        v-if="uiStore.showPairMore && deviceStore.devices.length > 0"
        variant="default"
        size="sm"
        @click="handlePairMore"
      >
        {{ t('STRID_WEBHUB_CONNECT_MORE_DEVICES') }}
      </RawmButton>

      <RawmButton variant="default" size="sm" @click="handleDownload">
        {{ t('STRID_WEBHUB_DOWNLOAD_APP') }}
      </RawmButton>

      <RawmSelect
        :model-value="uiStore.language"
        :options="[{ value: '', label: t('STRID_WEBHUB_SYSTEM_LANGUAGE') }, ...languages]"
        style="width: 110px;"
        @update:model-value="handleLanguageChange"
      />

      <div class="theme-toggle">
        <RawmSwitch :model-value="uiStore.darkTheme" @update:model-value="handleThemeToggle" />
        <span class="theme-label">{{ uiStore.darkTheme ? 'Dark' : 'Light' }}</span>
      </div>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 0 20px;
  background-color: hsl(var(--background) / 0.85);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid hsl(var(--border));
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-img {
  height: 36px;
}

.header-center {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
}

.fw-channel {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
}

.channel-label {
  white-space: nowrap;
  color: hsl(var(--muted-foreground));
}

.radio-pill {
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  padding: 4px 10px;
  border-radius: 4px;
  border: 1px solid hsl(var(--border));
  transition: all 0.15s;
  white-space: nowrap;
}

.radio-pill:hover {
  border-color: hsl(var(--primary));
}

.radio-pill input[type='radio'] {
  accent-color: hsl(var(--primary));
}

.header-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.theme-toggle {
  display: flex;
  align-items: center;
  gap: 6px;
}

.theme-label {
  font-size: 12px;
  white-space: nowrap;
  color: hsl(var(--muted-foreground));
}
</style>
