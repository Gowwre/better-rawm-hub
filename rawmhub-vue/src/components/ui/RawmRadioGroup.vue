<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  options: { value: string | number; label: string }[]
}>()

const modelValue = defineModel<string | number>()

function select(value: string | number) {
  modelValue.value = value
}
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <button
      v-for="opt in options"
      :key="String(opt.value)"
      type="button"
      :class="[
        'inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-rawm-green',
        modelValue === opt.value
          ? 'bg-rawm-green text-white'
          : 'border border-rawm-border bg-transparent text-foreground hover:bg-rawm-bg-card',
      ]"
      @click="select(opt.value)"
    >
      {{ opt.label }}
    </button>
  </div>
</template>
