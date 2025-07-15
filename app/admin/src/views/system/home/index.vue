<script lang="ts" setup>
import type { FormProps } from '@ayu-mu/core-common'
import { FormView } from '@ayu-mu/core-common'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
interface FormData {
  name: string
  hobby: string
}
const formRef = ref()

const formBind = ref<FormProps<FormData>>({
  componentType: 'dialog',
  title: '表单',
  fieldConfig: [
    {
      label: '姓名',
      field: 'name',
      type: 'input',
      defaultValue: '张三',
      colSize: 12,
      rules: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
      placeholder: '请输入姓名',
      custom: {},
    },
    // 爱好
    {
      label: '爱好',
      field: 'hobby',
      defaultValue: '篮球',
      type: 'input',
      colSize: 12,
      rules: [{ required: true, message: '请输入爱好', trigger: 'blur' }],
      placeholder: '请输入爱好',
      custom: {},
    },
    {
      label: '年龄',
      field: 'age',
      type: 'inputNumber',
      defaultValue: 18,
      colSize: 12,
      rules: [{ required: true, message: '请输入年龄', trigger: 'blur' }],
      custom: {
        min: 1,
        max: 100,
        precision: 2,
      },
    },
    {
      label: '科目',
      field: 'subject',
      type: 'select',

      colSize: 12,
      rules: [{ required: true, message: '请选择爱好', trigger: 'change' }],
      custom: {
        // options: [
        //   {
        //     label: '语文',
        //     value: 'chinese',
        //   },
        //   {
        //     label: '数学',
        //     value: 'math',
        //   },
        //   {
        //     label: '英语',
        //     value: 'english',
        //   },
        // ],
        getOptions: () => {
          return new Promise((resolve) => {
            resolve({
              code: 0,
              message: 'success',
              data: [
                {
                  label: '语文',
                  value: 'chinese',
                },
                {
                  label: '数学',
                  value: 'math',
                },
                {
                  label: '英语',
                  value: 'english',
                },
              ],
            })
          })
        },
      },
    },
    {
      label: '上传图片',
      field: 'uploadImg',
      type: 'uploadImg',
      colSize: 24,
      rules: [{ required: true, message: '请上传图片', trigger: 'blur' }],
      custom: {},
    },
  ],
  onSubmit: (data) => {
    console.log(data, 'formData')
  },
})

function handleOpen() {
  formRef.value.handleOpen()
}
</script>

<template>
  <div class="w-full h-full flex flex-col gap-4 items-center justify-center">
    <div class="text-4xl font-bold">
      {{ t('common.home') }} {{ $t('message') }}
    </div>
    <div class="w-full">
      <FormView ref="formRef" v-bind="formBind" />
      <ElButton type="primary" @click="handleOpen">
        打开表单
      </ElButton>
    </div>
    <RouterView />
  </div>
</template>
