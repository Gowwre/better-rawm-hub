<script setup lang="ts">
import { computed } from 'vue'
import { useMouseSettingsStore } from '@/stores/mouseSettings'
import { RawmSelect, RawmCheckbox } from '@/components/ui'
import MousePlaceholder from '@/components/common/MousePlaceholder.vue'

const mouseStore = useMouseSettingsStore()

const leftKeys = [
  { id: 'setting_mapping_key_m1', label: '①', position: { left: '30px', top: '90px' }, line: { width: '210px' }, circle: true },
  { id: 'setting_mapping_key_m6', label: '⑥', position: { left: '30px', top: '180px' }, line: { width: '175px' }, circle: true },
  { id: 'setting_mapping_key_m5', label: '⑤', position: { left: '30px', top: '240px' }, line: { width: '180px' }, circle: true },
]

const rightKeys = [
  { id: 'setting_mapping_key_m3', label: '③', position: { right: '30px', top: '90px' }, line: { width: '197px' }, circle: true },
  { id: 'setting_mapping_key_m2', label: '②', position: { right: '30px', top: '122px' }, line: { width: '247px' }, circle: true },
  { id: 'setting_mapping_key_m4', label: '④', position: { right: '30px', top: '190px' }, line: { width: '247px' }, circle: true },
  { id: 'setting_mapping_key_m7', label: '⑦', position: { right: '30px', top: '302px' }, line: { width: '247px' }, circle: true, hasBottomLabel: true },
]

const onboardOptions = [
  { value: 0, label: '配置 1' },
  { value: 1, label: '配置 2' },
  { value: 2, label: '配置 3' },
  { value: 3, label: '配置 4' },
  { value: 4, label: '配置 5' },
]

const combinationOptions = [
  { value: 'R', label: 'R-Plus' },
  { value: 'L', label: 'L-Plus' },
]

function selectKey(keyId: string) {
  mouseStore.selectedMappingKey = keyId
}

const keyDesc = (keyId: string) => mouseStore.mappingKeys[keyId]?.desc || ''
</script>

<template>
  <div class="mouse-visual">
    <!-- Onboard config row -->
    <div class="config-row">
      <span class="config-label">{{ $t('STRID_SETTING_CONFIG_CURRENT') }}</span>
      <RawmSelect v-model="mouseStore.onboardConfig" :options="onboardOptions" style="width: 180px;" />
      <i
        v-if="false"
        class="layui-icon layui-icon-loading layui-anim layui-anim-rotate layui-anim-loop"
        style="font-size: 20px; color: #1E9FFF; margin-left: 5px;"
      />
    </div>

    <!-- R-Plus key row -->
    <div class="config-row">
      <span class="config-label">{{ $t('STRID_SETTINGD_KEY_COMBINATION_LABEL') }}</span>
      <RawmSelect v-model="mouseStore.combinationKey" :options="combinationOptions" style="width: 150px;" />
    </div>

    <p class="config-hint">{{ $t('STRID_SETTINGD_KEY_COMBINATION_DESC') }}</p>

    <!-- Mouse diagram -->
    <div class="mouse-diagram">
      <!-- Center mouse image -->
      <div class="mouse-image-wrap">
        <MousePlaceholder />
      </div>

      <!-- Left keys -->
      <div
        v-for="key in leftKeys"
        :key="key.id"
        class="key-annotation key-annotation-left"
        :style="key.position"
        @click="selectKey(key.id)"
      >
        <span class="key-number">{{ key.label }}</span>
        <div class="key-line-box">
          <p class="key-desc layui-outline">{{ keyDesc(key.id) }}</p>
          <div class="key-line" :style="{ width: key.line.width }" />
        </div>
        <div v-if="key.circle" class="key-circle" />
      </div>

      <!-- Right keys -->
      <div
        v-for="key in rightKeys"
        :key="key.id"
        class="key-annotation key-annotation-right"
        :style="key.position"
        @click="selectKey(key.id)"
      >
        <div v-if="key.circle" class="key-circle" />
        <div class="key-line-box">
          <p class="key-desc layui-outline">{{ keyDesc(key.id) }}</p>
          <div class="key-line" :style="{ width: key.line.width }" />
        </div>
        <span class="key-number">{{ key.label }}</span>
        <span v-if="key.hasBottomLabel" class="bottom-label">{{ $t('STRID_SETTING_MAPPING_BOTTOM_KEY') }}</span>
      </div>

      <!-- Wheel -->
      <div class="wheel-annotations">
        <div class="wheel-line-v" />
        <div class="wheel-key wheel-key-left" @click="selectKey('setting_mapping_key_wheel_down')">
          <span class="key-number">▼</span>
          <div class="key-line-box">
            <p class="key-desc layui-outline">{{ keyDesc('setting_mapping_key_wheel_down') }}</p>
            <div class="key-line" style="width: 221px;" />
          </div>
        </div>
        <div class="wheel-key wheel-key-right" @click="selectKey('setting_mapping_key_wheel_up')">
          <div class="key-line-box">
            <p class="key-desc layui-outline">{{ keyDesc('setting_mapping_key_wheel_up') }}</p>
            <div class="key-line" style="width: 221px;" />
          </div>
          <span class="key-number">▲</span>
        </div>
      </div>
    </div>

    <!-- Onboard status -->
    <div class="onboard-status">
      <RawmCheckbox v-model="mouseStore.allowSwitch">
        {{ $t('STRID_SETTING_CONFIG_CURRENT_ALLOW_SWITCH') }}
      </RawmCheckbox>
      <div class="status-colors">
        <span class="status-label">{{ $t('STRID_SETTING_LIGHT') }}</span>
        <div class="color-row">
          <div
            v-for="color in mouseStore.lightColors"
            :key="color"
            class="color-dot"
            :style="{ backgroundColor: color }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mouse-visual {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
}

.config-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.config-label {
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
  color: hsl(var(--card-foreground));
}

.config-hint {
  font-size: 12px;
  color: hsl(var(--muted-foreground));
  text-align: center;
  max-width: 400px;
}

.mouse-diagram {
  position: relative;
  width: 647px;
  height: 360px;
  margin-top: 10px;
}

.mouse-image-wrap {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.key-annotation {
  position: absolute;
  display: flex;
  align-items: center;
  height: 50px;
  cursor: pointer;
}

.key-annotation-left {
  flex-direction: row;
}

.key-annotation-right {
  flex-direction: row-reverse;
}

.key-number {
  font-size: 20px;
  font-weight: bold;
  color: hsl(var(--card-foreground));
  min-width: 28px;
  text-align: center;
}

.key-line-box {
  display: flex;
  flex-direction: column;
  padding-top: 4px;
}

.key-annotation-left .key-line-box {
  align-items: flex-start;
}

.key-annotation-right .key-line-box {
  align-items: flex-end;
}

.key-desc {
  font-size: 12px;
  line-height: 1.3;
  margin: 0 4px 4px;
  color: hsl(var(--foreground));
  min-height: 16px;
}

.key-line {
  height: 1px;
  background-color: hsl(var(--border));
}

.key-circle {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: var(--color-primary);
  margin: 0 4px;
}

.bottom-label {
  position: absolute;
  left: -270px;
  font-size: 14px;
  font-weight: 600;
  color: hsl(var(--card-foreground));
}

.wheel-annotations {
  position: absolute;
  left: 315px;
  top: 68px;
}

.wheel-line-v {
  width: 1px;
  height: 57px;
  margin-left: 10px;
  background-color: hsl(var(--border));
}

.wheel-key {
  position: absolute;
  display: flex;
  align-items: center;
  height: 50px;
  cursor: pointer;
}

.wheel-key-left {
  left: -235px;
  top: -36px;
  flex-direction: row;
}

.wheel-key-left .key-line-box {
  align-items: flex-start;
}

.wheel-key-right {
  right: -295px;
  top: -36px;
  flex-direction: row-reverse;
}

.wheel-key-right .key-line-box {
  align-items: flex-end;
}

.onboard-status {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 10px;
}

.status-colors {
  display: flex;
  align-items: center;
  gap: 8px;
}

.status-label {
  font-size: 14px;
  white-space: nowrap;
}

.color-row {
  display: flex;
  gap: 6px;
}

.color-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid transparent;
}
</style>
