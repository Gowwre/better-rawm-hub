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
            <div class="layui-input-block">
              <input type="checkbox" v-model="mouseStore.angleSnapping" lay-skin="switch" />
            </div>
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
            <div class="layui-input-block">
              <input type="checkbox" v-model="mouseStore.rippleControl" lay-skin="switch" />
            </div>
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
            <div class="layui-input-block">
              <input type="checkbox" v-model="mouseStore.motionSync" lay-skin="switch" />
            </div>
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
              <button
                id="btn-wireless-optimize"
                class="layui-btn layui-btn-radius layui-btn-sm"
                style="margin-left: 10px; background-color: #16B777;"
              >
                {{ $t('STRID_SETTING_FACTORY_TEST') }}
              </button>
              <p id="wireless-quality" style="white-space: nowrap; color: #16B777; margin-left: 10px; width: 1px;">无线质量:</p>
            </div>
          </td>
          <td>
            <div class="layui-input-block">
              <input type="checkbox" v-model="mouseStore.wirelessTurbo" lay-skin="switch" />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <table>
      <tr>
        <td>
          <p id="setting-wireless-turbo-desc" class="layui-setting-desc">
            {{ $t('STRID_SETTING_WIRELESS_TURBO_TIPS') }}
          </p>
        </td>
      </tr>
      <tr>
        <td>
          <p id="selected-rf-channel-tips" style="color: #1E9FFF; margin-top: 5px;"></p>
        </td>
      </tr>
    </table>

    <div id="setting-rf-channels" class="layui-form-item layui-row" style="margin-bottom: 0px; margin-top: 10px;">
      <table style="width: 100%;">
        <tr>
          <td>
            <div
              v-for="channel in mouseStore.rfChannels"
              :key="channel.value"
              class="layui-col-xs3"
            >
              <label>
                <input
                  type="radio"
                  name="setting-rf-channel"
                  :value="channel.value"
                  :checked="mouseStore.currentRfChannel === channel.value"
                  @change="selectRfChannel(channel.value)"
                />
                {{ $t(`STRID_SETTING_RF_CHANNEL_${channel.value === -1 ? 'AUTO' : channel.value}`, channel.label) }}
              </label>
            </div>
          </td>
          <td>
            <div id="setting-power-saving" style="padding-top: 2px;">
              <label>
                <input type="checkbox" v-model="mouseStore.powerSaving" />
                {{ $t('STRID_SETTING_MOUSE_AUTO_POWER_SAVING') }}
              </label>
            </div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<style scoped>
.layui-input-block {
  margin-left: 10px;
}

.layui-col-xs3 {
  width: 25%;
  float: left;
  box-sizing: border-box;
}
</style>
