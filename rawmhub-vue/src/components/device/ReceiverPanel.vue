<script setup lang="ts">
import { useDeviceStore } from '@/stores/device'

const deviceStore = useDeviceStore()
</script>

<template>
  <div class="receiver-panel">
    <div v-if="deviceStore.currentDevice" class="receiver-badge">
      <div class="receiver-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
          <rect x="2" y="7" width="16" height="10" rx="2" />
          <path d="M22 11v2" />
        </svg>
      </div>
      <span class="receiver-name">RAWM HS Receiver</span>
      <span class="receiver-battery">{{ deviceStore.currentDevice.battery ?? 0 }}%</span>
    </div>
  </div>
</template>

<style scoped>
.receiver-panel {
  margin: 20px auto 0;
  text-align: center;
  width: fit-content;
}

.receiver-badge {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 16px;
  background-color: hsl(var(--card));
  border: 1px solid hsl(var(--border));
  border-radius: 8px;
  color: hsl(var(--card-foreground));
}

.receiver-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: hsl(var(--primary));
}

.receiver-name {
  font-size: 14px;
  font-weight: 500;
}

.receiver-battery {
  font-size: 13px;
  font-weight: 700;
  color: hsl(var(--primary));
}
</style>
