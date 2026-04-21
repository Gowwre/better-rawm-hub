<script setup lang="ts">
const modelValue = defineModel<boolean>({ default: false })
</script>

<template>
  <label class="inline-flex cursor-pointer items-center gap-2">
    <div class="relative flex items-center">
      <input
        v-model="modelValue"
        type="checkbox"
        class="peer h-4 w-4 shrink-0 cursor-pointer appearance-none rounded-sm border border-rawm-border bg-transparent shadow transition-colors checked:border-rawm-green checked:bg-rawm-green focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-rawm-green disabled:cursor-not-allowed disabled:opacity-50"
      />
      <svg
        class="pointer-events-none absolute left-1/2 top-1/2 hidden h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 text-white peer-checked:block"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </div>
    <span class="text-sm text-foreground">
      <slot />
    </span>
  </label>
</template>
