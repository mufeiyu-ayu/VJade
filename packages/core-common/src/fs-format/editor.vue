<script lang="ts" setup>
withDefaults(
  defineProps<{
    modelValue: Array<string>
    options?: Record<string, any>
    column?: Record<string, any>
    row?: Record<string, any>
  }>(),
  {
    modelValue: [''] as any
  }
)
</script>

<template>
  <div class="fs-query-bar-editor" v-html="modelValue"></div>
</template>
