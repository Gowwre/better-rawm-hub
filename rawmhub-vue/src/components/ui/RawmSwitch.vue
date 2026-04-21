<script setup lang="ts">
import { SwitchRoot, SwitchThumb } from 'radix-vue'

const modelValue = defineModel<boolean>({ default: false })
</script>

<template>
  <SwitchRoot
    v-model="modelValue"
    class="relative h-[22px] w-[42px] cursor-pointer rounded-full border border-transparent bg-rawm-border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rawm-green focus-visible:ring-offset-2 focus-visible:ring-offset-background data-[state=checked]:bg-rawm-green"
  >
    <SwitchThumb
      class="block h-[18px] w-[18px] rounded-full bg-white shadow transition-transform will-change-transform data-[state=checked]:translate-x-[19px] data-[state=unchecked]:translate-x-[1px]"
    />
  </SwitchRoot>
</template>
