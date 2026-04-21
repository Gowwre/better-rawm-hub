<script setup lang="ts">
import { useMouseSettingsStore } from '@/stores/mouseSettings'

const mouseStore = useMouseSettingsStore()

function selectRfChannel(value: number) {
  mouseStore.currentRfChannel = value
}
</script>

<template>
  <div id="setting-other-section" class="layui-setting-section">
    <table style="width: 100%;">
      <tbody>
        <tr>
          <td style="width: 100%;">
            <div class="layui-setting-title-container">
              <div class="layui-setting-title-bar"></div>
              <p class="layui-setting-title">{{ $t('STRID_SETTING_ANGLE_SNAPPING') }}</p>
            </div>
          </td>
          <td>
            <input type="checkbox" v-model="mouseStore.angleSnapping" lay-skin="switch" />
          </td>
        </tr>
      </tbody>
    </table>
    <p class="layui-setting-desc">{{ $t('STRID_SETTING_ANGLE_SNAPPING_TIPS') }}</p>
    <hr class="layui-bg-gray">

    <table style="width: 100%;">
      <tbody>
        <tr>
          <td style="width: 100%;">
            <div class="layui-setting-title-container">
              <div class="layui-setting-title-bar"></div>
              <p class="layui-setting-title">{{ $t('STRID_SETTING_RIPPLE_CONTROL') }}</p>
            </div>
          </td>
          <td>
            <input type="checkbox" v-model="mouseStore.rippleControl" lay-skin="switch" />
          </td>
        </tr>
      </tbody>
    </table>
    <p class="layui-setting-desc">{{ $t('STRID_SETTING_RIPPLE_CONTROL_TIPS') }}</p>
    <hr class="layui-bg-gray">

    <table style="width: 100%;">
      <tbody>
        <tr>
          <td style="width: 100%;">
            <div class="layui-setting-title-container">
              <div class="layui-setting-title-bar"></div>
              <p class="layui-setting-title">{{ $t('STRID_SETTING_MOTION_SYNC') }}</p>
            </div>
          </td>
          <td>
            <input type="checkbox" v-model="mouseStore.motionSync" lay-skin="switch" />
          </td>
        </tr>
      </tbody>
    </table>
    <p class="layui-setting-desc">{{ $t('STRID_SETTING_MOTION_SYNC_TIPS') }}</p>
    <hr class="layui-bg-gray">

    <table style="width: 100%;">
      <tbody>
        <tr>
          <td style="width: 100%;">
            <div class="layui-setting-title-container">
              <div class="layui-setting-title-bar"></div>
              <p class="layui-setting-title">{{ $t('STRID_SETTING_WIRELESS_TURBO') }}</p>
            </div>
          </td>
          <td>
            <input type="checkbox" v-model="mouseStore.wirelessTurbo" lay-skin="switch" />
          </td>
        </tr>
      </tbody>
    </table>
    <p class="layui-setting-desc">{{ $t('STRID_SETTING_WIRELESS_TURBO_TIPS') }}</p>

    <div class="rf-channels" style="margin-top: 10px;">
      <div
        v-for="channel in mouseStore.rfChannels"
        :key="channel.value"
        class="rf-channel-item"
        :class="{ active: mouseStore.currentRfChannel === channel.value }"
        @click="selectRfChannel(channel.value)"
      >
        {{ $t(`STRID_SETTING_RF_CHANNEL_${channel.value === -1 ? 'AUTO' : channel.value}`, channel.label) }}
      </div>
      <label style="margin-left: 15px;">
        <input type="checkbox" v-model="mouseStore.powerSaving" />
        {{ $t('STRID_SETTING_MOUSE_AUTO_POWER_SAVING') }}
      </label>
    </div>
  </div>

  <div id="setting-sleep-time-section" class="layui-setting-section" style="margin-top: 10px;">
    <div class="layui-setting-title-container">
      <div class="layui-setting-title-bar"></div>
      <p class="layui-setting-title">{{ $t('STRID_SETTING_SLEEP_TIME') }}</p>
    </div>
    <p class="layui-setting-desc">{{ $t('STRID_SETTING_SLEEP_TIME_TIPS') }}</p>
    <div class="slider-row" style="margin-top: 20px;">
      <input
        type="range"
        v-model.number="mouseStore.sleepTime"
        min="60"
        max="3600"
        step="60"
        class="layui-slider"
      />
      <span class="slider-value">{{ Math.floor(mouseStore.sleepTime / 60) }}min</span>
    </div>
  </div>

  <div id="setting-angle-tuning-section" class="layui-setting-section" style="margin-top: 10px;">
    <div class="layui-setting-title-container">
      <div class="layui-setting-title-bar"></div>
      <p class="layui-setting-title">{{ $t('STRID_SETTING_ANGLE_TUNING') }}</p>
    </div>
    <p class="layui-setting-desc">{{ $t('STRID_SETTING_ANGLE_TUNING_TIPS') }}</p>
    <div class="slider-row" style="margin-top: 20px;">
      <input
        type="range"
        v-model.number="mouseStore.angleTuning"
        min="-45"
        max="45"
        step="1"
        class="layui-slider"
      />
      <span class="slider-value">{{ mouseStore.angleTuning }}°</span>
    </div>
  </div>
</template>

<style scoped>
.rf-channels {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

hr.layui-bg-gray {
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin: 10px 0;
}

.slider-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.layui-slider {
  flex: 1;
  height: 6px;
  -webkit-appearance: none;
  appearance: none;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  outline: none;
}

.layui-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #16B777;
  cursor: pointer;
}

.slider-value {
  min-width: 50px;
  text-align: right;
  font-size: 14px;
}
</style>
