<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    modelValue: string | any
    options?: Record<string, any>
    column?: Record<string, any>
    row?: Record<string, any>
  }>(),
  {
    modelValue: NaN
  }
)
</script>

<template>
  <span v-bind="props?.options">{{ props?.modelValue / 100 }}%</span>
</template>
