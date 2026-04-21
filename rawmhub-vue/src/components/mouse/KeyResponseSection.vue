<script setup lang="ts">
import { ref } from 'vue'
import { useMouseSettingsStore } from '@/stores/mouseSettings'

const mouseStore = useMouseSettingsStore()

const showDownUp = ref(false)
</script>

<template>
  <div id="setting-key-delay-section" class="layui-setting-section" style="margin-top: 10px;">
    <table style="width: 100%;">
      <tr>
        <td>
          <div class="layui-setting-title-container">
            <div class="layui-setting-title-bar"></div>
            <p class="layui-setting-title">{{ $t('STRID_SETTING_KEY_RESPONSE') }}</p>
          </div>
        </td>
        <td>
          <table id="setting-key-delay-select-key-container" style="display: none;">
            <tr>
              <td>
                <p>{{ $t('STRID_SETTING_MAPPING_SELECT_KEY') }}</p>
              </td>
              <td>
                <select class="layui-input" style="width: 120px; margin-left: 5px;">
                  <option value="">{{ $t('STRID_NONE') }}</option>
                </select>
              </td>
              <td>
                <button class="layui-btn layui-btn-radius layui-btn-sm" style="margin-left: 10px; background-color: #16B777;">
                  {{ $t('STRID_SETTING_KEY_GUIDE') }}
                </button>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    <p class="layui-setting-desc">{{ $t('STRID_SETTING_KEY_RESPONSE_TIPS') }}</p>
    <table style="width: 100%;">
      <tr>
        <td>
          <div id="slider-key-down-delay" style="margin-top: 30px; margin-bottom: 15px;">
            <input
              type="range"
              v-model.number="mouseStore.keyDelay.downDelay"
              min="0"
              max="50"
              step="1"
              class="layui-slider"
            />
            <span style="margin-left: 10px;">{{ mouseStore.keyDelay.downDelay }}ms</span>
          </div>
        </td>
        <td>
          <div v-if="showDownUp" id="slider-key-up-delay" style="margin-top: 30px; margin-bottom: 15px; margin-left: 15px;">
            <input
              type="range"
              v-model.number="mouseStore.keyDelay.upDelay"
              min="0"
              max="50"
              step="1"
              class="layui-slider"
            />
            <span style="margin-left: 10px;">{{ mouseStore.keyDelay.upDelay }}ms</span>
          </div>
        </td>
      </tr>
      <tr v-if="showDownUp" id="setting-key-delay-down-up" style="display: none;">
        <td>
          <p style="text-align: center;">{{ $t('STRID_SETTING_KEY_RESPONSE_DOWN') }}</p>
        </td>
        <td>
          <p style="text-align: center;">{{ $t('STRID_SETTING_KEY_RESPONSE_UP') }}</p>
        </td>
      </tr>
    </table>
  </div>
</template>
