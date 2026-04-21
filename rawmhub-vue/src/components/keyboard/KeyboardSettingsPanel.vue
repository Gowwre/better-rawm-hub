<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useKeyboardSettingsStore } from '@/stores/keyboardSettings'
import { useUiStore } from '@/stores/ui'
import KbdKeySetting from '@/components/keyboard/KbdKeySetting.vue'
import KbdLightSetting from '@/components/keyboard/KbdLightSetting.vue'
import KbdAxisSetting from '@/components/keyboard/KbdAxisSetting.vue'
import KbdAdvanceKeySetting from '@/components/keyboard/KbdAdvanceKeySetting.vue'
import KbdMoreSetting from '@/components/keyboard/KbdMoreSetting.vue'

const { t } = useI18n()
const kbdStore = useKeyboardSettingsStore()
const uiStore = useUiStore()

const kbdTabs = [
  { id: 0, label: 'STRID_KBD_KEY_SETTING', icon: 'key' },
  { id: 1, label: 'STRID_KBD_LIGHT_SETTING', icon: 'light' },
  { id: 2, label: 'STRID_KBD_AXIS_SETTING', icon: 'axis' },
  { id: 3, label: 'STRID_KBD_ADVANCE_KEY_SETTING', icon: 'advance' },
  { id: 4, label: 'STRID_KBD_MORE_SETTING', icon: 'more' },
]

function selectTab(tabId: number) {
  kbdStore.activeKbdTab = tabId
}

function handleBack() {
  uiStore.setPanel('device')
}
</script>

<template>
  <div id="kbd-setting-panel" class="kbd-setting-panel layui-form">
    <div class="kbd-layout">
      <div class="kbd-sidebar">
        <div
          v-for="tab in kbdTabs"
          :key="tab.id"
          class="kbd-sidebar-item"
          :class="{ active: kbdStore.activeKbdTab === tab.id }"
          @click="selectTab(tab.id)"
        >
          <p class="kbd-sidebar-label">{{ $t(tab.label) }}</p>
        </div>
      </div>

      <div class="kbd-content">
        <KbdKeySetting v-if="kbdStore.activeKbdTab === 0" />
        <KbdLightSetting v-if="kbdStore.activeKbdTab === 1" />
        <KbdAxisSetting v-if="kbdStore.activeKbdTab === 2" />
        <KbdAdvanceKeySetting v-if="kbdStore.activeKbdTab === 3" />
        <KbdMoreSetting v-if="kbdStore.activeKbdTab === 4" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.kbd-setting-panel {
  margin: 0 10px;
  margin-bottom: 39px;
}

.kbd-layout {
  display: flex;
  min-height: 400px;
}

.kbd-sidebar {
  width: 240px;
  min-width: 240px;
  background-color: #202020;
  border-radius: 4px;
  padding: 20px 0;
  margin-top: 20px;
}

.kbd-sidebar-item {
  display: flex;
  align-items: center;
  height: 40px;
  padding: 0 30px;
  cursor: pointer;
  border-radius: 5px;
  margin: 10px 30px;
  transition: all 0.2s;
}

.kbd-sidebar-item:hover {
  background-color: #606060;
}

.kbd-sidebar-item.active {
  background-color: rgba(22, 183, 119, 0.1);
}

.kbd-sidebar-label {
  font-size: large;
  margin-left: 10px;
}

.kbd-sidebar-item.active .kbd-sidebar-label {
  color: #00f6ff;
}

.kbd-content {
  flex: 1;
  margin-left: 20px;
  padding: 20px;
}
</style>
