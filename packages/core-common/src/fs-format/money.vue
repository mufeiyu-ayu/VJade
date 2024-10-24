<script lang="ts" setup>
import { watchEffect, ref, computed } from 'vue'

const props = defineProps<{
  modelValue: string | any
  color?: string
  unit?: string
  decimal?: number
  align?: string
  //TODO 类型
  condition?: any
  options?: Record<string, any>
  column?: Record<string, any>
  row?: Record<string, any>
}>()
const value = ref(props.modelValue)

// decimal参数是保留几位小数，默认两位
const thouNumForma = (num: number | string, decimal: number = 2) => {
  let numbers: string | number
  numbers = typeof num === 'number' ? num.toFixed(decimal) : Number(num).toFixed(decimal)
  numbers = numbers.indexOf('.') < 0 ? numbers + '.' : numbers
  let newNumber = numbers.replace(/(\d)(?=(\d{3})+\.)/g, '$1,').replace(/\.$/, '')
  return newNumber
}

const currentColor = computed(() => {
  return props.color
})

watchEffect(() => {
  value.value = thouNumForma(props.modelValue, props.decimal ?? 2)
})
</script>

<template>
  <span :style="`color: ${currentColor}`" v-bind="props?.options">
    {{
      props.align === 'right'
        ? ((value === 'NaN' ? '0' : value) + props.unit ?? '')
        : (props.unit ?? '' + (value === 'NaN' ? '0' : value))
    }}
  </span>
</template>
