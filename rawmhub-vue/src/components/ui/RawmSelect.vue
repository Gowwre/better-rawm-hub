<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  options: { value: string | number; label: string }[]
}>()

const modelValue = defineModel<string | number>()

const selectedLabel = computed(() => {
  return props.options.find((o) => o.value === modelValue.value)?.label ?? ''
})
</script>

<template>
  <div class="relative">
    <select
      v-model="modelValue"
      class="h-9 w-full appearance-none rounded-md border border-rawm-border bg-transparent px-3 py-1 pr-8 text-sm text-foreground shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-rawm-green"
    >
      <option
        v-for="opt in options"
        :key="String(opt.value)"
        :value="opt.value"
        class="bg-card text-foreground"
      >
        {{ opt.label }}
      </option>
    </select>
    <svg
      class="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  </div>
</template>
