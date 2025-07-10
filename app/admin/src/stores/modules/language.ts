import type { Ref } from 'vue'
import type { I18n } from 'vue-i18n'
import { webStorage } from '@ayu-mu/utils'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const languageList = [
  { code: 'zh', name: '中文', label: '简体中文' },
  { code: 'en', name: 'English', label: 'English' },
]

// 全局 i18n 实例
let i18nInstance: I18n | null = null

// 设置 i18n 实例
export function setI18nInstance(i18n: I18n) {
  i18nInstance = i18n
}

export const useLanguageStory = defineStore('language', () => {
  // 当前语言代码
  const currentLanguage = ref<string>(webStorage.getStorageFromKey('language') as string)

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

    // 同步到 i18n
    if (i18nInstance) {
      i18nInstance.global.locale = currentLanguage.value
    }
  }

  // 切换语言
  const setLanguage = (languageCode: string) => {
    if (languageList.some(lang => lang.code === languageCode)) {
      currentLanguage.value = languageCode
      webStorage.setStorage('language', languageCode)
      // 直接更新 i18n 的 locale
      if (i18nInstance) {
        (i18nInstance.global.locale as Ref<string>).value = languageCode
      }
    }
  }

  return {
    currentLanguage,
    initLanguage,
    setLanguage,
  }
})
