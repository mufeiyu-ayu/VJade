import type { ComponentInternalInstance } from 'vue'
import { webStorage } from '@ayu-mu/utils'
import NProgress from 'nprogress'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const languageList = [
  { code: 'zh', name: '中文', label: '简体中文' },
  { code: 'en', name: 'English', label: 'English' },
]

export const useLanguageStory = defineStore('language', () => {
  // 当前语言代码
  const currentLanguage = ref<string | null>(webStorage.getStorageFromKey('language') as string | null)

  // 初始化语言设置
  const initLanguage = () => {
    const savedLanguageCode = webStorage.getStorageFromKey('language') as string
    if (savedLanguageCode) {
      currentLanguage.value = savedLanguageCode
    }
    else {
      // 如果没有保存的语言设置，则使用浏览器语言
      const browserLanguage = navigator.language.split('-')[0]
      // 检查浏览器语言是否在支持的语言列表中
      const supportedLanguage = languageList.find(lang => lang.code === browserLanguage)
      currentLanguage.value = supportedLanguage ? browserLanguage : 'zh'
      webStorage.setStorage('language', currentLanguage.value)
    }
  }

  // 切换语言
  const setLanguage = (languageCode: string, instance: ComponentInternalInstance | null) => {
    if (languageList.some(lang => lang.code === languageCode)) {
      NProgress.start()
      currentLanguage.value = languageCode
      webStorage.setStorage('language', languageCode)
      // 直接更新 i18n 的 locale
      const i18n = instance?.appContext.config.globalProperties.$i18n
      if (i18n) {
        i18n.locale = languageCode
      }
      NProgress.done()
    }
  }

  return {
    currentLanguage,
    initLanguage,
    setLanguage,
  }
})
