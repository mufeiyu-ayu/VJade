<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { formatDate } from '@ayu-mu/utils'

const props = defineProps<{
  modelValue: string | any
  format: string
  options?: Record<string, any>
  column?: Record<string, any>
  row?: Record<string, any>
  /* @description  时间格式 */
  valueFormat?: string
}>()

const timeData = ref()

watchEffect(() => {
  timeData.value = props.modelValue ? formatDate(new Date(props.modelValue), props.valueFormat ?? props.format) : ''
})
</script>

<template>
  <span v-bind="props?.options">{{ timeData ?? '暂无' }}</span>
</template>
