<script lang="ts" setup>
import { ref, watchEffect } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue: any
    options?: Record<string, any>
    column?: Record<string, any>
    row?: Record<string, any>
  }>(),
  {
    modelValue: ''
  }
)

const value = ref(props.modelValue)

/**
 * 根据数组进行取值
 * @param {*} obj 取值对象
 * @param {String[]} keys 取值数组
 */
const getValueFromNestedObject = (obj: any, keys: string[]): any => {
  return keys.reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj)
}

watchEffect(() => {
  if ((props?.column as any).editType === 'object') {
    return (value.value = getValueFromNestedObject(props?.row, [
      (props?.column as any).property,
      (props?.column as any).editOption.config.selectShowField
    ]))
  }

  if ((props?.column as any)?.property.includes('.')) {
    const fields: string[] = (props?.column as any)?.property.split('.')
    value.value = getValueFromNestedObject(props?.row, fields)
  } else {
    value.value = props.modelValue
  }
})
</script>

<template>
  <span v-bind="props?.options">{{ value }}</span>
</template>
