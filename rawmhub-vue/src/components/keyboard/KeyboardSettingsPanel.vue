<script setup lang="ts">
import { useKeyboardSettingsStore } from '@/stores/keyboardSettings'
import { useUiStore } from '@/stores/ui'
import KbdKeySetting from '@/components/keyboard/KbdKeySetting.vue'
import KbdLightSetting from '@/components/keyboard/KbdLightSetting.vue'
import KbdAxisSetting from '@/components/keyboard/KbdAxisSetting.vue'
import KbdAdvanceKeySetting from '@/components/keyboard/KbdAdvanceKeySetting.vue'
import KbdMoreSetting from '@/components/keyboard/KbdMoreSetting.vue'

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
</script>

<template>
  <div id="kbd-setting-panel" class="layui-kbd-setting-panel layui-auto-zoom layui-form" style="margin-bottom: 39px; display: block;">
    <div style="display: flex; width: 100%; min-height: 400px;">
      <!-- Sidebar -->
      <div id="setting-mapping-section" class="layui-setting-section" style="width: 240px; min-height: 830px; margin-top: 20px;">
        <img id="kbd-product-name" src="" style="margin-top: 20px;" />
        <div
          v-for="tab in kbdTabs"
          :key="tab.id"
          class="layui-kbd-setting"
          style="display: flex; width: 180px; height: 40px; align-items: center; margin-left: 30px; margin-right: 30px; margin-top: 40px; cursor: pointer;"
          :index="tab.id"
          @click="selectTab(tab.id)"
        >
          <img :id="`kbd-main-setting-${tab.icon}-icon`" style="display: flex; width: 36px; height: 32px; margin-left: 30px;" src="" />
          <p
            :id="`kbd-main-setting-${tab.icon}`"
            class="layui-setting-title"
            style="font-size: large; margin-left: 10px;"
            :style="{ color: kbdStore.activeKbdTab === tab.id ? '#00f6ff' : '' }"
          >
            {{ $t(tab.label) }}
          </p>
        </div>
      </div>

      <!-- Content -->
      <div id="tab-kbd-main-setting-type" class="layui-tab layui-tab-brief" style="margin-bottom: 0px;">
        <ul class="layui-tab-title" style="display: none;">
          <li v-for="tab in kbdTabs" :key="tab.id" :lay-id="tab.id">{{ $t(tab.label) }}</li>
        </ul>
        <div class="layui-tab-content" style="margin-left: 20px;">
          <div class="layui-tab-item" :class="{ 'layui-show': kbdStore.activeKbdTab === 0 }">
            <KbdKeySetting />
          </div>
          <div class="layui-tab-item" :class="{ 'layui-show': kbdStore.activeKbdTab === 1 }">
            <KbdLightSetting />
          </div>
          <div class="layui-tab-item" :class="{ 'layui-show': kbdStore.activeKbdTab === 2 }">
            <KbdAxisSetting />
          </div>
          <div class="layui-tab-item" :class="{ 'layui-show': kbdStore.activeKbdTab === 3 }">
            <KbdAdvanceKeySetting />
          </div>
          <div class="layui-tab-item" :class="{ 'layui-show': kbdStore.activeKbdTab === 4 }">
            <KbdMoreSetting />
          </div>
          <div class="layui-tab-item layui-show"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.layui-kbd-setting-panel {
  width: auto;
  height: auto;
  margin-left: 10px;
  margin-bottom: 10px;
  margin-top: -60px;
}
</style>
