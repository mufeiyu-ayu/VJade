<script lang="ts" setup>
import { AyuForm, type FormProps } from '@ayu-mu/core-common'
import { ref, onMounted, reactive } from 'vue'
import { postFormData } from '@/apis'
import { ElButton } from 'element-plus'
const formRef = ref<InstanceType<typeof AyuForm>>()
const formProps = reactive<FormProps>({
  fieldConfig: [
    {
      label: '用户名',
      field: 'username',
      type: 'input',
      group: '基础信息',
      colSize: 12,
      rules: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
      componentProps: {}
    },
    {
      label: '密码',
      field: 'password',
      type: 'input',
      group: '基础信息',
      colSize: 12,
      rules: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      componentProps: {
        placeholder: '请输入密码',
        showPassword: true
      }
    },
    {
      label: '邮箱',
      field: 'email',
      type: 'input',
      group: '基础信息',
      colSize: 24,
      rules: [{ type: 'email', required: true, message: '请输入邮箱', trigger: 'blur' }]
    },
    {
      label: '手机号',
      field: 'phone',
      type: 'input',
      group: '垃圾信息',
      colSize: 8,
      rules: [{ required: true, message: '请输入手机号', trigger: 'blur' }]
    },
    {
      label: '手机号',
      field: 'phone1',
      type: 'input',
      group: '垃圾信息',
      colSize: 8,
      rules: [{ message: '请输入手机号', trigger: 'blur' }]
    },
    {
      label: '备注',
      field: 'remark',
      type: 'input',
      group: '垃圾信息',
      colSize: 8,
      rules: [{ required: true, message: '请输入备注', trigger: 'blur' }]
    },
    {
      label: '备注1',
      field: 'remark1',
      type: 'input',
      group: '补充信息',
      colSize: 12,
      rules: [{ required: true, message: '请输入备注', trigger: 'blur' }]
    },
    {
      label: '备注2',
      field: 'remark2',
      type: 'input',
      group: '补充信息',
      colSize: 12,
      rules: [{ required: true, message: '请输入备注', trigger: 'blur' }]
    },
    {
      label: '备注3',
      field: 'remark3',
      type: 'input',
      group: '补充信息',
      colSize: 24,
      rules: [{ required: true, message: '请输入备注', trigger: 'blur' }]
    }
  ],
  isGroup: true,
  // isExpand: false,
  // groupType: 'tab',
  // tabType: 'border-card',
  // maxPaneHeight: '200px',
  onSubmit: async (params: any) => {
    console.log('submit111111!', params)
  }
})

const onClick = async () => {
  const res = await postFormData({
    name: '张三',
    age: 18,
    email: 'zhangsan',
    phone: '13812345678',
    address: '北京市海淀区',
    money: 1000,
    sex: '男',
    status: '启用',
    remark: '备注',
    isEnable: true
  })
  console.log(res, 'res')
}
onMounted(() => {
  // 应该能看到表单数据
  // console.log(formRef.value?.resetForm, 'formRef.value?.formData')
})
</script>

<template>
  <div class="w-screen flex justify-center items-center">
    <div class="w-[800px]">
      <AyuForm ref="formRef" v-bind="formProps"></AyuForm>
    </div>
  </div>
  <el-button @click="onClick" type="primary">发送请求</el-button>
</template>

<style lang="scss" scoped></style>
