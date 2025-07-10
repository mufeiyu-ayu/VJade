import type { App } from 'vue'
import { createI18n } from 'vue-i18n'

// 注册 i18n
export function setupI18n(app: App) {
  const i18n = createI18n({
    legacy: false,
    locale: 'zh',
    fallbackLocale: 'zh',
    messages: {
      zh: {
        message: '你好',
        logout: '退出登录',
        github: 'Github',
      },
      en: {
        message: 'Hello',
        logout: 'Logout',
        github: 'Github',
      },
    },
  })
  app.use(i18n)
}
