<script setup lang="ts">
import { computed } from 'vue'
import { SliderRoot, SliderTrack, SliderRange, SliderThumb } from 'radix-vue'

const props = defineProps<{
  min?: number
  max?: number
  step?: number
}>()

const modelValue = defineModel<number>({ default: 0 })

const sliderValue = computed({
  get: () => [modelValue.value],
  set: (val) => {
    modelValue.value = val[0]
  },
})
</script>

<template>
  <SliderRoot
    v-model="sliderValue"
    :min="min ?? 0"
    :max="max ?? 100"
    :step="step ?? 1"
    class="relative flex w-full touch-none select-none items-center"
  >
    <SliderTrack class="relative h-1.5 w-full grow overflow-hidden rounded-full bg-rawm-border">
      <SliderRange class="absolute h-full rounded-full bg-rawm-green" />
    </SliderTrack>
    <SliderThumb
      class="block h-4 w-4 rounded-full border border-rawm-green bg-rawm-green shadow transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rawm-green focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      aria-label="Slider"
    />
  </SliderRoot>
</template>
