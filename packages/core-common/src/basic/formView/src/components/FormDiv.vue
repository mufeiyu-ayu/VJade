<script setup lang="ts">
defineProps<{
  visible: boolean
}>()
</script>

<template>
  <div v-if="visible">
    <slot />
  </div>
</template>
