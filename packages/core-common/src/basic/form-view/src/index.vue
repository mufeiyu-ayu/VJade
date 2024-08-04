<script lang="ts" setup="">
import formViewContent from './component/form-view-content.vue'
import { useFormViewToolFuc } from './hooks/use-form-view-tool-func'
import { useFormView } from './hooks/use-form-view'

export interface FormViewProps {
  /* @description vo 名称 */
  voName: string
  /* @description 标题 */
  title?: string
  /* @description 表单容器 */
  layoutType?: 'div' | 'dialog' | 'drawer'
  /* @description 子列表配置 */
  children?: Record<string, any>
  /* @description 页面上下文信息 */
  content?: any
}

const { children } = withDefaults(defineProps<FormViewProps>(), {
  layoutType: 'dialog'
})

defineEmits<{
  /* @description 表单改变事件 */
  change: [value: Record<string, any>]
}>()

const {
  // 表单容器引用 ref
  formContainer,
  // 表单内容组件 ref
  formContent,
  // 表单内容组件 props
  formContentProps,
  // 当前组件
  currentComponent,
  // 表单容器绑定值
  containerBindValue,
  // 表单字段
  fields,
  // 表单状态
  state,
  // 关闭表单
  close,
  // 表单改变
  formChange
} = useFormView()

const { setFormData, resetForm, getFormData } = useFormViewToolFuc(formContent)
defineExpose({
  ref: formContent,
  state,
  containerRef: formContainer,
  setFormData,
  getFormData,
  resetForm,
  close
})
</script>

<template>
  <!--  dialog-->
  <component ref="formContainer" :is="currentComponent" v-bind="containerBindValue">
    <template v-slot:button="data">
      <slot name="button" :data="data"></slot>
    </template>
    <form-view-content
      ref="formContent"
      v-bind="formContentProps"
      :children="children"
      @close="close"
      @change="formChange"
    >
      <template v-for="item in fields" v-slot:[item]="data">
        <slot :name="item" :data="data"></slot>
      </template>
      <slot></slot>
    </form-view-content>
  </component>
</template>
