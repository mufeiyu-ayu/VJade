<script setup lang="ts">
import type { FieldItemConfig } from '../types'
import { useComponentRender } from '../../../../componentRender/index'
import { useFormContent } from '../hooks/useForm-content'

defineProps<{
  fieldConfig: FieldItemConfig[]
}>()

const { formRef, formList, formData, formRules, handleColSize, handleSetFormData, lookupChange, fieldConfig } = useFormContent()
const { componentRender } = useComponentRender()

defineExpose({
  /**  表单实例 */
  formRef,
  /**  获取表单数据 */
  getFormData: () => formData.value,
  /**  设置表单数据 */
  setFormData: handleSetFormData,
  /**  获取表单配置 */
  getFieldConfig: () => fieldConfig.value,
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
      require-asterisk-position="right"
      label-width="auto"
      :rules="formRules"
    >
      <ElRow :gutter="20">
        <template v-for="item in formList" :key="item.field">
          <ElCol v-if="!item.unVisible" :span="handleColSize(item.colSize || 24)">
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
                    field: item.field,
                    formRef,
                    languageList: item.languageList,
                  }"
                  @lookup-change="lookupChange"
                />
              </slot>
            </ElFormItem>
          </ElCol>
        </template>
      </ElRow>
    </ElForm>
  </div>
</template>
