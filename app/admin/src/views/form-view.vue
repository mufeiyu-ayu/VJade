<script lang="ts" setup>
import { AyuForm, type FormProps } from '@ayu-mu/core-common'
import { ref, onMounted, reactive } from 'vue'

const formRef = ref<InstanceType<typeof AyuForm>>()
const formProps = reactive<FormProps>({
  colSize: 3,
  fieldConfig: [
    {
      label: '用户名',
      field: 'username',
      type: 'input',
      group: '121',
      rules: [{ required: true, message: '请输入用户名', trigger: 'blur' }]
    },
    {
      label: '密码',
      field: 'password',
      type: 'input',
      group: '121',
      rules: [{ required: true, message: '请输入密码', trigger: 'blur' }]
    },
    {
      label: '邮箱',
      field: 'email',
      type: 'input',
      group: '121',
      rules: [{ required: true, message: '请输入邮箱', trigger: 'blur' }]
    },
    {
      label: '手机号',
      field: 'phone',
      type: 'input',
      group: '121',
      rules: [{ required: true, message: '请输入手机号', trigger: 'blur' }]
    },
    {
      label: '手机号',
      field: 'phone',
      type: 'input',
      group: '121',
      rules: [{ required: true, message: '请输入手机号', trigger: 'blur' }]
    },
    {
      label: '手机号',
      field: 'phone',
      type: 'input',
      group: '121',
      rules: [{ required: true, message: '请输入手机号', trigger: 'blur' }]
    },
    {
      label: '手机号',
      field: 'phone',
      type: 'input',
      group: '121',
      rules: [{ required: true, message: '请输入手机号', trigger: 'blur' }]
    },
    {
      label: '手机号',
      field: 'phone',
      type: 'input',
      group: '121',
      rules: [{ required: true, message: '请输入手机号', trigger: 'blur' }]
    }
  ],
  isGroup: false,
  onSubmit: async (params: any) => {
    console.log('submit111111!', params)
  }
})
onMounted(() => {
  // 应该能看到表单数据
  console.log(formRef.value?.resetForm, 'formRef.value?.formData')
})
</script>

<template>
  <div class="w-screen">
    <AyuForm ref="formRef" v-bind="formProps"></AyuForm>
  </div>
</template>

<style lang="scss" scoped>
// :deep(.el-input) {
//   width: 400px;
// }
</style>
