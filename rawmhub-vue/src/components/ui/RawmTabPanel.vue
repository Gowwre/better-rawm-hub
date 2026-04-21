<script setup lang="ts">
const props = defineProps<{
  value: string
  label: string
}>()
</script>

<template>
  <div>
    <slot />
  </div>
</template>
