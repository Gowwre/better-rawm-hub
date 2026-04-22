<script setup lang="ts">
import { ref, computed } from 'vue'
import { useDeviceStore } from '@/stores/device'
import { useNativeHid } from '@/composables/useNativeHid'
import { useNativeHidFlag } from '@/composables/useHidMode'
import { RawmButton } from '@/components/ui'

const deviceStore = useDeviceStore()
const native = useNativeHid()

const newAddr = ref('')
const newChannel = ref(2)
const isSlow = ref(false)
const busy = ref(false)
const error = ref('')

const esbAddrs = computed(() => {
  if (useNativeHidFlag.value && native.rawSettings.value && 'esbAddrs' in native.rawSettings.value) {
    return (native.rawSettings.value as any).esbAddrs ?? []
  }
  return []
})

function validateAddr(addr: string): boolean {
  return /^[0-9a-fA-F]{10}$/.test(addr)
}

async function handlePair() {
  error.value = ''
  const addr = newAddr.value.trim()
  if (!validateAddr(addr)) {
    error.value = 'Address must be 10 hex chars (5 bytes), e.g. A1B2C3D4E5'
    return
  }
  busy.value = true
  try {
    await native.pairReceiver(addr.toUpperCase(), newChannel.value, isSlow.value)
    newAddr.value = ''
  } catch (err: any) {
    error.value = err?.message || String(err)
  } finally {
    busy.value = false
  }
}

async function handleUnpair(addr: string) {
  error.value = ''
  busy.value = true
  try {
    await native.unpairReceiver(addr)
  } catch (err: any) {
    error.value = err?.message || String(err)
  } finally {
    busy.value = false
  }
}

async function handleSelect(addr: string) {
  error.value = ''
  busy.value = true
  try {
    await native.selectReceiver(addr)
  } catch (err: any) {
    error.value = err?.message || String(err)
  } finally {
    busy.value = false
  }
}
</script>

<template>
  <div class="receiver-panel">
    <!-- Current receiver badge -->
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

    <!-- Native receiver management -->
    <div v-if="useNativeHidFlag.value" class="receiver-mgmt">
      <!-- Signal quality row -->
      <div class="quality-row">
        <span class="quality-label">RSSI:</span>
        <span class="quality-value" :class="{ weak: (native.currentDevice.value?.rssi ?? 0) < -70 }">
          {{ native.currentDevice.value?.rssi ?? '--' }} dBm
        </span>
        <span class="quality-label">SQual:</span>
        <span class="quality-value">{{ native.rawSettings.value && 'surfaceQuality' in native.rawSettings.value ? (native.rawSettings.value as any).surfaceQuality : '--' }}</span>
        <span
          v-if="native.currentDevice.value?.isReceiver"
          class="virtual-badge"
          :class="{ connected: native.currentDevice.value?.virtualConnected }"
        >
          {{ native.currentDevice.value?.virtualConnected ? 'Mouse Linked' : 'Mouse Offline' }}
        </span>
      </div>
      <p class="section-title">{{ $t('STRID_SETTING_RECEIVER_MANAGEMENT') || 'Receiver Management' }}</p>

      <!-- Pair new receiver -->
      <div class="pair-row">
        <input
          v-model="newAddr"
          type="text"
          placeholder="A1B2C3D4E5"
          maxlength="10"
          class="layui-input addr-input"
          :disabled="busy"
        />
        <input
          v-model.number="newChannel"
          type="number"
          min="0"
          max="100"
          class="layui-input channel-input"
          :disabled="busy"
        />
        <label class="slow-label">
          <input v-model="isSlow" type="checkbox" :disabled="busy" />
          <span>Slow</span>
        </label>
        <RawmButton variant="primary" size="sm" :disabled="busy" @click="handlePair">
          {{ $t('STRID_SETTING_RECEIVER_PAIR') || 'Pair' }}
        </RawmButton>
      </div>
      <p v-if="error" class="error-text">{{ error }}</p>

      <!-- Paired receivers list -->
      <div v-if="esbAddrs.length > 0" class="addr-list">
        <div
          v-for="(item, idx) in esbAddrs"
          :key="idx"
          class="addr-item"
        >
          <span class="addr-text">{{ item.addr }}</span>
          <span class="channel-text">CH {{ item.channel }}</span>
          <RawmButton variant="primary" size="sm" :disabled="busy" @click="handleSelect(item.addr)">
            {{ $t('STRID_SETTING_RECEIVER_SELECT') || 'Select' }}
          </RawmButton>
          <RawmButton variant="outline" size="sm" :disabled="busy" @click="handleUnpair(item.addr)">
            {{ $t('STRID_SETTING_RECEIVER_UNPAIR') || 'Unpair' }}
          </RawmButton>
        </div>
      </div>
      <p v-else class="empty-text">No paired receivers</p>
    </div>
  </div>
</template>

<style scoped>
.receiver-panel {
  margin: 20px auto 0;
  text-align: center;
  width: fit-content;
  max-width: 480px;
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

.receiver-mgmt {
  margin-top: 16px;
  padding: 12px;
  background-color: hsl(var(--card));
  border: 1px solid hsl(var(--border));
  border-radius: 8px;
  text-align: left;
}

.quality-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
  font-size: 13px;
}

.quality-label {
  color: hsl(var(--muted-foreground));
}

.quality-value {
  font-weight: 600;
  color: hsl(var(--card-foreground));
}

.quality-value.weak {
  color: var(--color-red);
}

.virtual-badge {
  margin-left: auto;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  background-color: hsl(var(--muted));
  color: hsl(var(--muted-foreground));
}

.virtual-badge.connected {
  background-color: hsl(142 76% 36%);
  color: #fff;
}

.section-title {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 10px;
  color: hsl(var(--card-foreground));
}

.pair-row {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.addr-input {
  width: 120px;
  font-family: monospace;
  font-size: 13px;
}

.channel-input {
  width: 60px;
  font-size: 13px;
}

.slow-label {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  color: hsl(var(--muted-foreground));
  cursor: pointer;
}

.error-text {
  font-size: 12px;
  color: var(--color-red);
  margin-top: 6px;
}

.addr-list {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.addr-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  background-color: hsl(var(--muted));
  border-radius: 4px;
}

.addr-text {
  font-family: monospace;
  font-size: 13px;
  font-weight: 600;
  color: hsl(var(--card-foreground));
}

.channel-text {
  font-size: 12px;
  color: hsl(var(--muted-foreground));
  margin-right: auto;
}

.empty-text {
  font-size: 13px;
  color: hsl(var(--muted-foreground));
  margin-top: 10px;
  text-align: center;
}
</style>
