<script setup lang="ts">
import { ElForm, ElFormItem, ElInput, ElButton, ElRow, ElCol } from 'element-plus'
import { AyuIcon } from '@ayu-mu/common'
import type { FormProps } from './types'
import { useForm } from './hooks/ayu-form-hooks'
defineProps<FormProps>()

const {
  formRef,
  formData,
  resetForm,
  rules,
  submitForm,
  groupComponent,
  groupItemConfig,
  formGroupConfig,

  allActiveName,
  handleCollapseChange,
  isExpandSet
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
    <el-form ref="formRef" label-position="right" label-width="auto" :rules="rules" :model="formData">
      <component :is="groupComponent" v-model="allActiveName" @change="handleCollapseChange">
        <template v-for="group in formGroupConfig" :key="group.groupTitle">
          <component :is="groupItemConfig" :title="group.groupTitle" :name="group.groupTitle">
            <div class="flex justify-start items-center p-4 mb-[10px]" v-if="groupComponent === 'div' && isGroup">
              <div class="w-[5px] h-[20px] bg-[#409EFF]"></div>
              <div class="text-[18px] font-bold ml-[15px]">{{ group.groupTitle }}</div>
            </div>
            <template #icon>
              <div class="ml-1"></div>
              <AyuIcon :icon="isExpandSet.includes(group.groupTitle) ? 'mdi:chevron-down' : 'mdi:chevron-up'" />
            </template>

            <el-row>
              <el-col v-for="field in group.fieldConfig" :key="field.field" :span="colSize || field.colSize">
                <el-form-item :label="field.label" :prop="field.field">
                  <el-input v-model="formData[field.field]" :placeholder="'请输入' + field.label" v-bind="field" />
                </el-form-item>
              </el-col>
            </el-row>
          </component>
        </template>
      </component>
      <slot>
        <div class="w-full mt-10 flex justify-center">
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button @click="resetForm">重置</el-button>
        </div>
      </slot>
    </el-form>
  </div>
</template>

<style scoped lang="scss"></style>
