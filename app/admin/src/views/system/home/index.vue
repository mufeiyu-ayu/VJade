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
      colSize: 12,
      rules: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
      placeholder: '请输入姓名',
      custom: {},
    },
    // 爱好
    {
      label: '爱好',
      field: 'hobby',
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
      colSize: 12,
      rules: [{ required: true, message: '请输入年龄', trigger: 'blur' }],
      custom: {
        min: 1,
        max: 100,
        precision: 2,
      },
    },
  ],
  onSubmit: (data) => {
    console.log(data.name, data.hobby, '2222')
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
