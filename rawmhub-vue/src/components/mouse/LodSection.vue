<script setup lang="ts">
import { useMouseSettingsStore } from '@/stores/mouseSettings'

const mouseStore = useMouseSettingsStore()
</script>

<template>
  <div id="setting-lod-section" class="layui-setting-section" style="margin-top: 10px;">
    <div class="layui-setting-title-container">
      <div class="layui-setting-title-bar"></div>
      <p class="layui-setting-title">{{ $t('STRID_SETTING_HAND_LIFT_DISTANCE') }}</p>
      <p id="surface-quality" style="color: #16B777; margin-left: 10px; display: none;">鼠标垫性能:</p>
    </div>
    <p class="layui-setting-desc">{{ $t('STRID_SETTING_HAND_LIFT_DISTANCE_TIPS') }}</p>

    <div id="setting-lods" class="layui-form-item" style="margin-top: 8px; margin-bottom: 0px;">
      <div
        v-for="lod in mouseStore.lods"
        :key="lod.value"
        class="lod-item"
        :class="{ active: mouseStore.currentLod === lod.value }"
        @click="mouseStore.currentLod = lod.value"
      >
        {{ lod.label }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.lod-item {
  display: inline-block;
  padding: 8px 16px;
  margin-right: 8px;
  margin-bottom: 8px;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 13px;
  border: 1px solid transparent;
}

.lod-item:hover {
  border-color: var(--rawm-green);
}

.lod-item.active {
  background-color: var(--rawm-green);
  color: white;
  border-color: var(--rawm-green);
}
</style>
