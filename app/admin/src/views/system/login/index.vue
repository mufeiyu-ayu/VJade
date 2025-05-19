<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import { Hide, View } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/modules/user'
// import { RouteNameEnum } from '@/router/type'
const userStore = useUserStore()
const router = useRouter()
const formRef = ref<FormInstance>()
const form = reactive({
  username: 'admin',
  password: '123456',
})
const loading = ref(false)
const rules = reactive<FormRules>({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
})

const passwordVisible = ref(false)
const rememberPassword = ref(false)

async function login(formEl: FormInstance | undefined) {
  loading.value = true
  if (!formEl)
    return
  await formEl.validate(async (valid) => {
    if (valid) {
      try {
        const code = await userStore.userLogin(form)

        if (code !== 0)
          return
        ElMessage.success('登录成功')
        loading.value = false
        router.push({ path: '/' })
      }
      catch (error) {
        console.log(error)
        loading.value = false
      }
    }
  })
}

async function register() {
  console.log('注册')
}
</script>

<template>
  <div class="w-screen flex h-screen">
    <div class="w-[70vw] h-full relative bg-login">
      <div class="absolute inset-0 bg-gradient-overlay">
        <div class="flex flex-col items-center justify-center h-full">
          <h1 class="text-4xl mb-4 text-red-950">
            开箱即用的后台管理系统框架
          </h1>
          <p class="text-xl text-red-950 max-w-lg text-center">
            高效管理・安全可靠・简约优雅
          </p>
        </div>
      </div>
    </div>
    <div class="flex-1 h-full flex items-center justify-center">
      <div class="w-3/5 space-y-5">
        <div class="mb-6">
          <h2 class="text-2xl font-medium text-gray-800">
            账号登录
          </h2>
          <p class="text-gray-500 text-sm mt-2">
            欢迎回来！请输入您的账号信息
          </p>
        </div>

        <ElForm
          ref="formRef"
          :model="form"
          :rules="rules"
          class="space-y-4"
        >
          <ElFormItem prop="username">
            <ElInput
              v-model="form.username"
              placeholder="请输入用户名"
              prefix-icon="User"
              class="h-9"
            />
          </ElFormItem>

          <ElFormItem prop="password">
            <ElInput
              v-model="form.password"
              :type="passwordVisible ? 'text' : 'password'"
              placeholder="请输入密码"
              class="h-9"
            >
              <template #suffix>
                <ElIcon class="cursor-pointer" @click="passwordVisible = !passwordVisible">
                  <View v-if="passwordVisible" />
                  <Hide v-else />
                </ElIcon>
              </template>
            </ElInput>
          </ElFormItem>

          <div class="flex items-center justify-between text-sm">
            <ElCheckbox v-model="rememberPassword" class="text-gray-600">
              记住密码
            </ElCheckbox>
            <ElLink type="primary" :underline="false">
              忘记密码？
            </ElLink>
          </div>

          <div class="flex gap-4">
            <ElButton
              type="primary"
              :loading="loading"
              class="w-full h-10"
              @click="login(formRef)"
            >
              登 录
            </ElButton>
            <ElButton type="danger" class="w-full h-10" @click="register">
              注 册
            </ElButton>
          </div>
        </ElForm>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-login {
  background: linear-gradient(
    135deg,
    rgba(6, 11, 40, 0.1) 0%,
    rgba(96, 165, 250, 0.15) 30%,
    rgba(147, 197, 253, 0.15) 70%,
    rgba(6, 11, 40, 0.1) 100%
  );
}

.bg-gradient-overlay {
  background: radial-gradient(circle at 50% 50%, transparent 0%, rgba(186, 230, 253, 0.05) 100%);
  backdrop-filter: blur(2px);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

:deep(.el-input__wrapper) {
  background-color: white;
}

:deep(.el-form-item__error) {
  margin-top: 2px;
}

:deep(.el-button) {
  height: 40px;
}
</style>
