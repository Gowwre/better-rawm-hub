<script setup lang="ts">
import { cn } from '@/lib/utils'

const props = defineProps<{
  tabs: { value: string; label: string }[]
}>()

const modelValue = defineModel<string>()
</script>

<template>
  <div class="w-full">
    <div class="flex w-full border-b border-rawm-border">
      <button
        v-for="tab in tabs"
        :key="tab.value"
        :class="
          cn(
            'relative px-4 py-2 text-sm font-medium transition-colors hover:text-rawm-green',
            modelValue === tab.value ? 'text-rawm-green' : 'text-muted-foreground'
          )
        "
        @click="modelValue = tab.value"
      >
        {{ tab.label }}
        <span
          v-if="modelValue === tab.value"
          class="absolute bottom-0 left-0 h-0.5 w-full bg-rawm-green"
        />
      </button>
    </div>
    <div class="mt-2">
      <slot />
    </div>
  </div>
</template>
