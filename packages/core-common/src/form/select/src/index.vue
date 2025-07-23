<script setup lang="ts">
import type { CommonResultType } from '@ayu-mu/model'
import { useSelect } from './hooks'

export interface SelectProps {
  modelValue: string | number | unknown[] | null
  /**   名称 */
  gsName?: string
  /**   选项 */
  options?: unknown[]
  /**   获取选项 */
  getOptions?: (queryContion?: Record<string, unknown>) => Promise<CommonResultType>
  /**   映射 */
  map?: Record<string, string>
  /**   查询推荐 */
  queryCondition?: Record<string, unknown>
  /**   多语言配置 */
  languageList?: Record<string, unknown>[]
}
defineProps<SelectProps>()
const { selectOptions, selectValue, handleChange } = useSelect()
</script>

<template>
  <div class="w-full flex-1" style="flex:1">
    <ElSelect
      v-bind="$attrs"
      v-model="selectValue"
      :clearable="true"
      :placeholder="`请选择${gsName}`"
      @change="handleChange"
    >
      <ElOption
        v-for="item in selectOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        :disabled="item.disabled"
      />
    </ElSelect>
  </div>
</template>

<style scoped>
:deep(.el-select) {
  width: 100% !important;
}

.flex-1 {
  flex: 1;
}
</style>
