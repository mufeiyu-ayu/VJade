<script lang="ts" setup>
// import { FormStatusEnum } from '../types/enum.ts'
import type { FormProps } from 'element-plus'
import { type ViewColumnType } from '@ayu/model'
export interface FormContentPropsType {
  uploadRefs?: any

  /** @description 服务名  */
  service?: string

  /** @description 数据源请求标识  */
  url: string

  /** @description 数据源请求地址前缀  */
  urlPrefix?: string

  /** @description vo名称  */
  voName: string

  /** @description 排列  */
  col?: number

  /** @description 字段实现规则  */
  showRules?: any

  /** @description 编辑状态  */
  formStatus?: string

  /** @description 主键值  */
  primaryKeyValue?: any

  /** @description 主键  */
  primaryKey?: number

  /** @description 文本位置  */
  labelPosition?: FormProps['labelPosition']

  /** @description 自动创建表单  */
  autoCreate?: boolean

  /** @description 插槽列表  */
  slotList?: Array<string>

  /** @description 开启子表列表  */
  isChild: boolean

  /** @description 子表列表  */
  children?: Record<string, any>
  disabledDisableKey?: string
  excludeDisableKey?: string[]
  validateCallBack?: Function

  /**
   * 自定义列字段显示
   */
  columnList?: Array<ViewColumnType>
}

// const { slotList, children } = withDefaults(defineProps<FormContentPropsType>(), {
//   labelPosition: 'right',
//   autoCreate: true,
//   isChild: false
// })

defineEmits<{
  /**
   * 表单改变事件
   */
  (event: 'change', value: Record<string, any>): void
}>()
</script>

<template>
  <div>form-view-content</div>
</template>

<style lang="scss" scoped></style>
