<script setup lang="ts">
import { useMouseSettingsStore } from '@/stores/mouseSettings'
import { RawmRadioGroup } from '@/components/ui'

const mouseStore = useMouseSettingsStore()

const lodOptions = [
  { value: 0, label: '低' },
  { value: 1, label: '中' },
  { value: 2, label: '高' },
]
</script>

<template>
  <div class="layui-setting-section">
    <div class="layui-setting-title-container">
      <div class="layui-setting-title-bar" />
      <p class="layui-setting-title">{{ $t('STRID_SETTING_HAND_LIFT_DISTANCE') }}</p>
    </div>
    <p class="layui-setting-desc">{{ $t('STRID_SETTING_HAND_LIFT_DISTANCE_TIPS') }}</p>

    <RawmRadioGroup
      v-model="mouseStore.currentLod"
      :options="lodOptions"
      style="margin-top: 10px;"
    />
  </div>
</template>
