<script setup lang="ts">
import { useDeviceStore } from '@/stores/device'
import { useUiStore } from '@/stores/ui'

const deviceStore = useDeviceStore()
const uiStore = useUiStore()

function selectDevice(device: (typeof deviceStore.devices)[0]) {
  deviceStore.selectDevice(device)
  uiStore.setPanel('device')
}
</script>

<template>
  <div id="usb-client-list-panel" class="layui-container layui-auto-zoom" style="width: 100%;">
    <div id="usb-client-list" class="layui-nav-container">
      <ul class="layui-nav">
        <li
          v-for="device in deviceStore.devices"
          :key="device.id"
          class="layui-nav-item"
          :class="{ 'layui-this': deviceStore.currentDevice?.id === device.id }"
          @click="selectDevice(device)"
        >
          <a>
            {{ device.name }}
            <span v-if="device.battery !== undefined" style="margin-left: 8px; font-size: 12px;">
              {{ device.battery }}%
            </span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.layui-nav-container {
  margin-top: 15px;
  background-color: transparent;
  text-align: center;
  height: 95px;
}

.layui-nav {
  display: inline-block;
  list-style: none;
  padding: 0;
  margin: 0;
}

.layui-nav-item {
  display: inline-block;
  vertical-align: middle;
  line-height: 60px;
}

.layui-nav-item a {
  display: block;
  padding: 0 20px;
  color: var(--lay-color-text);
  text-decoration: none;
  transition: all 0.3s;
  cursor: pointer;
}

.layui-nav-item:hover a {
  color: var(--rawm-green);
}

.layui-nav-item.layui-this a {
  color: var(--rawm-green);
  font-weight: bold;
}
</style>
