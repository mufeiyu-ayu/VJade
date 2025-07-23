<script setup lang="ts">
import type { FormProps } from '@ayu-mu/core-common'
import { FormView, JsonEditor } from '@ayu-mu/core-common'
import { ref, watch } from 'vue'
// 引用 LynxSelect 这个组件

const formViewRef = ref<InstanceType<typeof FormView>>()
const jsonData = ref({})
const formProps = ref<FormProps>({
  title: '表单',
  width: '30vw',
  componentType: 'dialog',
  visible: false,
  height: '300px',
  fieldConfig: [
    {
      field: 'hobby',
      type: 'select',
      label: '爱好',
      colSize: 24,
      rules: [{ required: true, message: '请输入爱好' }],
      custom: {
        options: [
          {
            label: '篮球',
            value: 'basketball',
          },
          {
            label: '足球',
            value: 'football',
          },
        ],
      },
    },
    {
      field: 'name',
      type: 'input',
      label: '姓名',
      colSize: 12,
      rules: [{ required: true, message: '请输入姓名' }],
    },
    {
      field: 'age',
      type: 'input',
      label: '年龄',
      colSize: 12,
      rules: [{ required: true, message: '请输入年龄' }],
    },
    {
      field: 'sex',
      type: 'radio',
      label: '性别',
      colSize: 12,
      rules: [{ required: true, message: '请选择性别' }],
      custom: {
        options: [
          {
            label: '男',
            value: 'male',
          },
          {
            label: '女',
            value: 'female',
          },
        ],
      },
    },
    {
      field: 'date',
      type: 'date',
      label: '日期',
      colSize: 12,
      // rules: [{ required: true, message: '请选择日期' }],
      // custom: {
      //   type: 'month',
      // },
    },
    {
      field: 'datetime',
      type: 'dateTime',
      label: '日期时间',
      rules: [{ required: true, message: '请选择日期时间' }],
      colSize: 12,
    },
  ],
  onSubmit: (value) => {
    console.log(value, '表单提交函数')
  },
})
const jsonEditorRef = ref<InstanceType<typeof JsonEditor>>()
watch(() => formViewRef.value?.formContentRef?.getFormData()?.hobby, (newVal) => {
  formProps.value.fieldConfig[1].unVisible = newVal === 'football'
}, {
  deep: true,
})
function onClick() {
  formViewRef.value.handleOpen()
  // console.log(formViewRef.value, 'formViewRef')
  // formViewRef.value?.handleOpen()
}
function onClick2() {
  console.log(formViewRef.value?.formContentRef?.getFormData(), 'formViewRef')
}
</script>

<template>
  <div class="container">
    <FormView v-bind="formProps" ref="formViewRef" />
    <ElButton @click="onClick">
      打开表单
    </ElButton>
    <ElButton @click="onClick2">
      提交表单
    </ElButton>
    <div class="flex items-center gap-2">
      <div>jsonData:{{ jsonData }}</div>
      <JsonEditor ref="jsonEditorRef" v-model="jsonData">
        <ElButton @click="jsonEditorRef.open(jsonData)">
          编辑数据
        </ElButton>
        <ElButton @click="() => console.log(jsonData, 'jsonData')">
          查看数据
        </ElButton>
      </JsonEditor>
    </div>
  </div>
</template>

<style>

</style>
