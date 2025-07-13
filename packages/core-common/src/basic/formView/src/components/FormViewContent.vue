<script setup lang="ts">
import type { FieldItemConfig } from '../types'
import { useComponentRender } from '../../../../componentRender/index'
import { useFormContent } from '../hooks/useForm-content'

defineProps<{
  fieldConfig: FieldItemConfig[]
}>()

const { formRef, formList, formData, formRules, handleColSize, handleSetFormData, lookupChange } = useFormContent()
const { componentRender } = useComponentRender()

defineExpose({
  /**  表单实例 */
  formRef,
  /**  获取表单数据 */
  getFormData: () => formData.value,
  /**  设置表单数据 */
  setFormData: handleSetFormData,
})
</script>

<template>
  <div class="w-full h-full">
    <ElForm
      ref="formRef"
      :validate-on-rule-change="false"
      status-icon
      :model="formData"
      scroll-to-error
      label-position="right"
      label-width="auto"
      :rules="formRules"
    >
      <ElRow :gutter="20">
        <ElCol v-for="item in formList" :key="item.field" :span="handleColSize(item.colSize || 24)">
          <ElFormItem :label="item.label" :prop="item.field">
            <slot
              :name="item.field"
              v-bind="{
                ...item.custom,
                formData,
              }"
            >
              <component
                :is="componentRender(item.type!)"
                v-model="formData[item.field]"
                :placeholder="`${item.placeholder}`"
                v-bind="{
                  gsName: item.label,
                  ...item.custom,
                  languageList: item.languageList,
                  field: item.field,
                }"
                @lookup-change="lookupChange"
              />
            </slot>
          </ElFormItem>
        </ElCol>
      </ElRow>
    </ElForm>
  </div>
</template>
