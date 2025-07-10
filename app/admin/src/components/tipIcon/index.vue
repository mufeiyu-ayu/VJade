<script setup lang="ts">
defineOptions({
  name: 'TipIcon',
})
defineProps<{
  content: string
  placement?: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end'
}>()
</script>

<template>
  <ElTooltip
    effect="dark"
    :content="content"
    :placement="placement || 'top'"
  >
    <slot />
  </ElTooltip>
</template>

<style scoped>

</style>
