<script setup lang="ts">
import { cn } from '@/lib/utils'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    variant?: 'default' | 'primary' | 'outline' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
    disabled?: boolean
  }>(),
  {
    variant: 'default',
    size: 'md',
  }
)

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'primary':
      return 'bg-rawm-green text-white hover:bg-opacity-90'
    case 'outline':
      return 'border border-rawm-border bg-transparent hover:bg-rawm-bg-card'
    case 'ghost':
      return 'bg-transparent hover:bg-rawm-bg-card'
    default:
      return 'bg-rawm-blue text-white hover:bg-opacity-90'
  }
})

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'h-7 px-3 text-xs'
    case 'lg':
      return 'h-11 px-6 text-base'
    default:
      return 'h-9 px-4 py-2 text-sm'
  }
})
</script>

<template>
  <button
    :disabled="disabled"
    :class="
      cn(
        'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-rawm-green disabled:pointer-events-none disabled:opacity-50',
        variantClasses,
        sizeClasses
      )
    "
    @click="emit('click', $event)"
  >
    <slot />
  </button>
</template>
