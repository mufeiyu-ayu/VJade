<script setup lang="ts">
import type { CommonResultType } from '@ayu-mu/model'
import type { FormItemRule } from 'element-plus'
import { useRadio } from './hooks'

export type RadioSelectValue = string | number | boolean
export interface LanguageItem {
  language: string
  label: string
  placeholder?: string
  status?: number
  rules?: FormItemRule[]
  options?: {
    label: string
    value: string | number | boolean
    disabled?: boolean
  }[]
}
export interface RadioProps {
  /**   值 */
  modelValue: RadioSelectValue | null
  /**   查询条件 */
  queryCondition?: Record<string, unknown>
  /**   映射 */
  map?: Record<string, string>
  /**   选项 */
  options?: {
    label: string
    value: RadioSelectValue
  }[]
  /**   获取选项 */
  getOptions?: (queryContion?: Record<string, unknown>) => Promise<CommonResultType<{
    label: string
    value: RadioSelectValue
  }[]>>
  /**   名称 */
  gsName?: string
  /**   多语言配置 */
  languageList: LanguageItem[]
}
defineProps<RadioProps>()
const { selectOptions, selectValue, handleChange } = useRadio()
</script>

<template>
  <div class="w-full">
    <ElRadioGroup v-model="selectValue" v-bind="$attrs" @change="handleChange">
      <ElRadio
        v-for="(item, index) in selectOptions"
        :key="index"
        :value="item.value"
        :disabled="item.disabled"
      >
        {{ item.label }}
      </ElRadio>
    </ElRadioGroup>
  </div>
</template>
