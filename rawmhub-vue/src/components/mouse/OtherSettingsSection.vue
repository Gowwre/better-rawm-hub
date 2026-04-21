<script setup lang="ts">
import { useMouseSettingsStore } from '@/stores/mouseSettings'
import { RawmSwitch, RawmRadioGroup, RawmButton } from '@/components/ui'

const mouseStore = useMouseSettingsStore()

const rfOptions = [
  { value: -1, label: 'Auto' },
  { value: 2, label: 'Mode 1' },
  { value: 40, label: 'Mode 2' },
  { value: 80, label: 'Mode 3' },
]
</script>

<template>
  <div class="layui-setting-section">
    <!-- Angle Snapping -->
    <div class="toggle-row">
      <div class="layui-setting-title-container">
        <div class="layui-setting-title-bar" />
        <p class="layui-setting-title">{{ $t('STRID_SETTING_ANGLE_SNAPPING') }}</p>
      </div>
      <RawmSwitch v-model="mouseStore.angleSnapping" />
    </div>
    <p class="layui-setting-desc">{{ $t('STRID_SETTING_ANGLE_SNAPPING_TIPS') }}</p>
    <hr class="layui-bg-gray">

    <!-- Ripple Control -->
    <div class="toggle-row">
      <div class="layui-setting-title-container">
        <div class="layui-setting-title-bar" />
        <p class="layui-setting-title">{{ $t('STRID_SETTING_RIPPLE_CONTROL') }}</p>
      </div>
      <RawmSwitch v-model="mouseStore.rippleControl" />
    </div>
    <p class="layui-setting-desc">{{ $t('STRID_SETTING_RIPPLE_CONTROL_TIPS') }}</p>
    <hr class="layui-bg-gray">

    <!-- Motion Sync -->
    <div class="toggle-row">
      <div class="layui-setting-title-container">
        <div class="layui-setting-title-bar" />
        <p class="layui-setting-title">{{ $t('STRID_SETTING_MOTION_SYNC') }}</p>
      </div>
      <RawmSwitch v-model="mouseStore.motionSync" />
    </div>
    <p class="layui-setting-desc">{{ $t('STRID_SETTING_MOTION_SYNC_TIPS') }}</p>
    <hr class="layui-bg-gray">

    <!-- Wireless Turbo -->
    <div class="toggle-row">
      <div class="layui-setting-title-container">
        <div class="layui-setting-title-bar" />
        <p class="layui-setting-title">{{ $t('STRID_SETTING_WIRELESS_TURBO') }}</p>
        <RawmButton variant="primary" size="sm" style="margin-left: 8px;">
          {{ $t('STRID_SETTING_FACTORY_TEST') }}
        </RawmButton>
      </div>
      <RawmSwitch v-model="mouseStore.wirelessTurbo" />
    </div>
    <p class="layui-setting-desc">{{ $t('STRID_SETTING_WIRELESS_TURBO_TIPS') }}</p>

    <div class="rf-section">
      <RawmRadioGroup v-model="mouseStore.currentRfChannel" :options="rfOptions" />
      <RawmSwitch v-model="mouseStore.powerSaving" style="margin-left: auto;">
        {{ $t('STRID_SETTING_MOUSE_AUTO_POWER_SAVING') }}
      </RawmSwitch>
    </div>
  </div>
</template>

<style scoped>
.toggle-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.rf-section {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 12px;
  flex-wrap: wrap;
}
</style>
