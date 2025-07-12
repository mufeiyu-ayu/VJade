import type { ComponentInternalInstance } from 'vue'
import { webStorage } from '@ayu-mu/utils'
import NProgress from 'nprogress'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { LanguageList } from '@/contants'
import { getBrowserLanguage } from '@/utils/getBrowerLanguage'

export const useLanguageStory = defineStore('language', () => {
  // 当前语言代码
  const currentLanguage = ref<string | null>(webStorage.getStorageFromKey('language') as string | null)

  // 初始化语言设置
  const initLanguage = () => {
    const savedLanguageCode = webStorage.getStorageFromKey('language') as string
    console.log('savedLanguageCode', savedLanguageCode)
    if (savedLanguageCode) {
      currentLanguage.value = savedLanguageCode
    }
    else {
      // 如果没有保存的语言设置，则使用浏览器语言
      const browserLanguage = getBrowserLanguage()
      currentLanguage.value = browserLanguage
      webStorage.setStorage('language', currentLanguage.value)
    }
    console.log('currentLanguage', currentLanguage.value)
  }

  // 切换语言
  const setLanguage = (languageCode: string, instance: ComponentInternalInstance | null) => {
    if (LanguageList.some(lang => lang.code === languageCode)) {
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
