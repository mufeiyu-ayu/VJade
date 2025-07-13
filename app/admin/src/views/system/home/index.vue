<script lang="ts" setup>
import type { FormProps } from '@ayu-mu/core-common'
import { FormView } from '@ayu-mu/core-common'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const formBind = ref<FormProps>({
  componentType: 'dialog',
  visible: true,
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
  ],
  onSubmit: (data) => {
    console.log(data, '2222')
  },
})
</script>

<template>
  <div class="w-full h-full flex flex-col gap-4 items-center justify-center">
    <div class="text-4xl font-bold">
      {{ t('common.home') }} {{ $t('message') }}
    </div>
    <div class="w-full">
      <FormView v-bind="formBind" />
    </div>
    <RouterView />
  </div>
</template>
