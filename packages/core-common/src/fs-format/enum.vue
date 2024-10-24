<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    modelValue: string | any
    values?: Array<any>
    options?: Record<string, any>
    column?: Record<string, any>
    row?: Record<string, any>
  }>(),
  {
    modelValue: ''
  }
)
</script>

<template>
  <div v-bind="props?.options">
    {{ props.values?.filter((item) => item.value === props.modelValue)?.[0]?.label }}
  </div>
</template>
