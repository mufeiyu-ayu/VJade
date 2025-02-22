<script setup lang="ts">
import { ElForm, ElFormItem, ElButton, ElRow, ElCol } from 'element-plus'

import { AyuIcon } from '@ayu-mu/common'
import type { FormProps, NormalFormProps } from './types'
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
  componentRender
} = useForm()

defineExpose({
  /* @description 组件实例  */
  formRef,
  resetForm,
  submitForm,
  formData
})
</script>

<template>
  <div class="w-full">
    <el-form ref="formRef" label-position="right" label-width="auto" :rules="formRules" :model="formData">
      <component :is="groupComponent" :type="tabType" v-model="allActiveName" @change="handleCollapseChange">
        <template v-for="group in formGroupConfig" :key="group.groupTitle">
          <component :is="groupItemConfig" :label="group.groupTitle" :title="group.groupTitle" :name="group.groupTitle">
            <div class="flex justify-start items-center p-4 mb-[10px]" v-if="groupComponent === 'div' && isGroup">
              <div class="w-[5px] h-[20px] bg-[#409EFF]"></div>
              <div class="text-[18px] font-bold ml-[15px]">{{ group.groupTitle }}</div>
            </div>
            <!-- todo collapse-item icon -->
            <template #icon v-if="groupType === 'collapse'">
              <div class="ml-1"></div>
              <AyuIcon :icon="collapseIsExpand.includes(group.groupTitle) ? 'mdi:chevron-down' : 'mdi:chevron-up'" />
            </template>
            <div :class="tabsOverflowY">
              <el-row>
                <el-col
                  v-for="field in group.fieldConfig"
                  :key="field.field"
                  :span="isGroup ? field.colSize : (props as NormalFormProps).colSize || field.colSize"
                >
                  <el-form-item :label="field.label" :prop="field.field">
                    <component
                      v-model="formData[field.field]"
                      :is="componentRender(field.type)"
                      v-bind="{
                        ...field.componentProps
                      }"
                    ></component>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </component>
        </template>
      </component>
      <slot>
        <div class="w-full mt-10 flex justify-center">
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button @click="resetForm">重置11</el-button>
        </div>
      </slot>
    </el-form>
  </div>
</template>

<style scoped lang="scss"></style>
