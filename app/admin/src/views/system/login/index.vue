<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import type { ComponentInternalInstance } from 'vue'
import { Check, Hide, View } from '@element-plus/icons-vue'
import { Icon } from '@iconify/vue'
import { ElMessage } from 'element-plus'
import { getCurrentInstance, onBeforeMount, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import TipIcon from '@/components/tipIcon/index.vue'
import { LanguageList } from '@/contants'
import { useLanguageStory } from '@/stores/modules/language'
import { useUserStore } from '@/stores/modules/user'
// import { RouteNameEnum } from '@/router/type'

const { t } = useI18n()
const userStore = useUserStore()
const languageStore = useLanguageStory()
const router = useRouter()
const instance: ComponentInternalInstance | null = getCurrentInstance()
const formRef = ref<FormInstance>()
const form = reactive({
  username: 'admin',
  password: '123456',
})
const loading = ref(false)
const rules = reactive<FormRules>({
  username: [{ required: true, message: t('loginPage.username'), trigger: 'blur' }],
  password: [{ required: true, message: t('loginPage.password'), trigger: 'blur' }],
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
        ElMessage.success(t('loginPage.loginSuccess'))
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
  console.log(t('loginPage.register'))
}

onBeforeMount(() => {
  languageStore.initLanguage()
})
</script>

<template>
  <div class="w-screen flex h-screen">
    <!-- 语言切换组件 - 右上角 -->
    <div class="absolute top-4 right-4 z-10">
      <ElDropdown trigger="click">
        <span class="el-dropdown-link">
          <TipIcon :content="$t('language')">
            <Icon
              icon="ic:sharp-translate"
              width="24"
              height="24"
              class="text-gray-600 hover:text-gray-800"
            />
          </TipIcon>
        </span>
        <template #dropdown>
          <ElDropdownMenu>
            <ElDropdownItem
              v-for="language in LanguageList"
              :key="language.code"
              :class="{ 'is-active': language.code === languageStore.currentLanguage }"
              @click="languageStore.setLanguage(language.code, instance)"
            >
              <div class="flex items-center px-2">
                <div class="flex flex-col">
                  <span class="text-sm font-medium">{{ language.name }}</span>
                </div>
                <div class="w-2" />
                <ElIcon
                  v-if="language.code === languageStore.currentLanguage"
                  class="ml-2"
                >
                  <Check />
                </ElIcon>
              </div>
            </ElDropdownItem>
          </ElDropdownMenu>
        </template>
      </ElDropdown>
    </div>

    <div class="w-[70vw] h-full relative bg-login">
      <div class="absolute inset-0 bg-gradient-overlay">
        <div class="flex flex-col items-center justify-center h-full">
          <h1 class="text-4xl mb-4 text-red-950">
            {{ $t('loginPage.frameworkTitle') }}
          </h1>
          <p class="text-xl text-red-950 max-w-lg text-center">
            {{ $t('loginPage.frameworkSubtitle') }}
          </p>
        </div>
      </div>
    </div>
    <div class="flex-1 h-full flex items-center justify-center">
      <div class="w-3/5 space-y-5">
        <div class="mb-6">
          <h2 class="text-2xl font-medium text-gray-800">
            {{ $t('loginPage.title') }}
          </h2>
          <p class="text-gray-500 text-sm mt-2">
            {{ $t('loginPage.subtitle') }}
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
              :placeholder="$t('loginPage.username')"
              prefix-icon="User"
              class="h-9"
            />
          </ElFormItem>

          <ElFormItem prop="password">
            <ElInput
              v-model="form.password"
              :type="passwordVisible ? 'text' : 'password'"
              :placeholder="$t('loginPage.password')"
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
              {{ $t('loginPage.rememberPassword') }}
            </ElCheckbox>
            <ElLink type="primary" :underline="false">
              {{ $t('loginPage.forgotPassword') }}
            </ElLink>
          </div>

          <div class="flex gap-4">
            <ElButton
              type="primary"
              :loading="loading"
              class="w-full h-10"
              @click="login(formRef)"
            >
              {{ $t('loginPage.loginButton') }}
            </ElButton>
            <ElButton type="danger" class="w-full h-10" @click="register">
              {{ $t('loginPage.registerButton') }}
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

/* 语言切换组件样式 */
.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 8px;
  border-radius: 6px;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.el-dropdown-link:hover {
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-1px);
}

:deep(.el-dropdown-menu) {
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

:deep(.el-dropdown-item) {
  padding: 8px 16px;
  border-radius: 4px;
  margin: 2px 4px;
}

:deep(.el-dropdown-item:hover) {
  background-color: #f5f7fa;
}

:deep(.el-dropdown-item.is-active) {
  background-color: #e6f7ff;
  color: #1890ff;
}
</style>
