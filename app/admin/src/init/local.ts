import type { App } from 'vue'
import { createI18n } from 'vue-i18n'
import { setI18nInstance } from '@/stores/modules/language'

// 注册 i18n
export function setupI18n(app: App) {
  const i18n = createI18n({
    legacy: false,
    locale: 'zh',
    fallbackLocale: 'zh',
    messages: {
      zh: {
        message: '你好',
      },
      en: {
        message: 'Hello',
      },
    },
  })

  // 设置 i18n 实例到 store
  setI18nInstance(i18n)

  app.use(i18n)
}
