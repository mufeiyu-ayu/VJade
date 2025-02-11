<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { View, Hide } from '@element-plus/icons-vue'
import { login as userLogin } from '@/apis'

const form = reactive({
  username: 'admin',
  password: '123456'
})

const errors = reactive({
  username: '',
  password: ''
})

const passwordVisible = ref(false)

const login = async () => {
  // 重置错误信息
  errors.username = ''
  errors.password = ''

  // 校验用户名
  if (!form.username.trim()) {
    errors.username = '请输入用户名'
    return
  }

  // 校验密码
  if (!form.password) {
    errors.password = '请输入密码'
    return
  }
  const res = await userLogin(form)
  console.log(res, 'res')
  // 通过校验，继续登录逻辑...
}
</script>

<template>
  <div class="w-screen flex h-screen">
    <div class="w-[70vw] h-full relative bg-login">
      <div class="absolute inset-0 bg-gradient-overlay">
        <div class="flex flex-col items-center justify-center h-full">
          <h1 class="text-4xl mb-4 text-red-950">开箱即用的后台管理系统框架</h1>
          <p class="text-xl text-red-950 max-w-lg text-center">高效管理・安全可靠・简约优雅</p>
        </div>
      </div>
    </div>
    <div class="flex-1 h-full flex items-center justify-center">
      <div class="w-3/5 space-y-5">
        <div class="mb-6">
          <h2 class="text-2xl font-medium text-gray-800">账号登录</h2>
          <p class="text-gray-500 text-sm mt-2">欢迎回来！请输入您的账号信息</p>
        </div>

        <div class="space-y-4">
          <div class="relative">
            <input
              v-model="form.username"
              type="text"
              class="w-full h-9 px-4 border rounded-lg outline-none transition-all"
              :class="
                errors.username
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-200 focus:border-blue-400 focus:ring-blue-400'
              "
              placeholder="请输入用户名"
            />
            <div v-if="errors.username" class="text-red-500 text-sm mt-1">{{ errors.username }}</div>
          </div>

          <div class="relative">
            <input
              v-model="form.password"
              :type="passwordVisible ? 'text' : 'password'"
              class="w-full h-9 px-4 pr-10 border rounded-lg outline-none transition-all"
              :class="
                errors.password
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-200 focus:border-blue-400 focus:ring-blue-400'
              "
              placeholder="请输入密码"
            />
            <el-icon
              class="absolute right-3 top-[7px] text-gray-400 cursor-pointer hover:text-gray-600"
              @click="passwordVisible = !passwordVisible"
            >
              <View v-if="passwordVisible" />
              <Hide v-else />
            </el-icon>
            <div v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</div>
          </div>

          <div class="flex items-center justify-between text-sm">
            <label class="flex items-center text-gray-600 cursor-pointer">
              <input type="checkbox" class="w-4 h-4 mr-2 border-gray-300 rounded text-blue-500" />
              记住密码
            </label>
            <a href="#" class="text-blue-500 hover:text-blue-600">忘记密码？</a>
          </div>

          <button
            @click="login"
            class="w-full h-10 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            登 录
          </button>
        </div>
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

input::placeholder {
  color: #94a3b8;
}

/* 去除 Chrome 浏览器下的自动填充背景色 */
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus {
  -webkit-box-shadow: 0 0 0px 1000px white inset;
  transition: background-color 5000s ease-in-out 0s;
}
</style>
