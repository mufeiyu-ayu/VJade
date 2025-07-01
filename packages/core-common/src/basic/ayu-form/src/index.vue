<script setup lang="ts">
import type { FormProps, NormalFormProps } from './types'

import { AyuIcon } from '@ayu-mu/common'
import { ElButton, ElCol, ElForm, ElFormItem, ElRow } from 'element-plus'
import { useForm } from './hooks/ayu-form-hooks'

const props = defineProps<FormProps>()
const {
  formRef,
  formData,
  resetForm,
  formRules,
  submitForm,
  groupComponent,
  groupItemConfig,
  formGroupConfig,
  allActiveName,
  handleCollapseChange,
  collapseIsExpand,
  tabsOverflowY,
  componentRender,
} = useForm()

defineExpose({
  /* @description 组件实例  */
  formRef,
  resetForm,
  submitForm,
  formData,
})
</script>

<template>
  <div class="w-full">
    <ElForm
      ref="formRef"
      label-position="right"
      label-width="auto"
      :rules="formRules"
      :model="formData"
    >
      <component
        :is="groupComponent"
        v-model="allActiveName"
        :type="tabType"
        @change="handleCollapseChange"
      >
        <template v-for="group in formGroupConfig" :key="group.groupTitle">
          <component
            :is="groupItemConfig"
            :label="group.groupTitle"
            :title="group.groupTitle"
            :name="group.groupTitle"
          >
            <div
              v-if="groupComponent === 'div' && isGroup"
              class="flex justify-start items-center p-4 mb-[10px]"
            >
              <div class="w-[5px] h-[20px] bg-[#409EFF]" />
              <div class="text-[18px] font-bold ml-[15px]">
                {{ group.groupTitle }}
              </div>
            </div>
            <!-- todo collapse-item icon -->
            <template v-if="groupType === 'collapse'" #icon>
              <div class="ml-1" />
              <AyuIcon
                :icon="
                  collapseIsExpand.includes(group.groupTitle)
                    ? 'mdi:chevron-down'
                    : 'mdi:chevron-up'
                "
              />
            </template>
            <div :class="tabsOverflowY">
              <ElRow>
                <ElCol
                  v-for="field in group.fieldConfig"
                  :key="field.field"
                  :span="
                    isGroup
                      ? field.colSize
                      : (props as NormalFormProps).colSize || field.colSize
                  "
                >
                  <ElFormItem :label="field.label" :prop="field.field">
                    <component
                      :is="componentRender(field.type)"
                      v-model="formData[field.field]"
                      v-bind="{
                        ...field.componentProps,
                      }"
                    />
                  </ElFormItem>
                </ElCol>
              </ElRow>
            </div>
          </component>
        </template>
      </component>
      <slot>
        <div class="w-full mt-10 flex justify-center">
          <ElButton type="primary" @click="submitForm">
            提交
          </ElButton>
          <ElButton @click="resetForm">
            重置11
          </ElButton>
        </div>
      </slot>
    </ElForm>
  </div>
</template>

<style scoped lang="scss"></style>
