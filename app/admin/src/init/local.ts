import type { App } from 'vue'
import { createI18n } from 'vue-i18n'
import { getBrowserLanguage } from '@/utils/getBrowerLanguage'

// 注册 i18n
export function setupI18n(app: App) {
  const i18n = createI18n({
    legacy: false,
    locale: getBrowserLanguage(),
    fallbackLocale: getBrowserLanguage(),
    messages: {
      zh: {
        message: '你好',
        logout: '退出登录',
        github: 'Github',
        login: '登录',
        language: '语言',
        // 登录相关
        loginPage: {
          title: '账号登录',
          subtitle: '欢迎回来！请输入您的账号信息',
          username: '请输入用户名',
          password: '请输入密码',
          rememberPassword: '记住密码',
          forgotPassword: '忘记密码？',
          loginButton: '登 录',
          registerButton: '注 册',
          loginSuccess: '登录成功',
          register: '注册',
          frameworkTitle: '开箱即用的后台管理系统框架',
          frameworkSubtitle: '高效管理・安全可靠・简约优雅',
        },
        // 错误页面
        error: {
          forbidden: '抱歉，你无权访问这个页面。',
          notFound: '抱歉，您访问的页面不存在。',
          pageNotExist: '页面组件不存在，请检测 page 目录下的组件是否创建正确',
          home: '首页',
          back: '返回',
        },
        // 通用
        common: {
          home: '首页',
          click: '点击',
        },
      },
      en: {
        message: 'Hello',
        logout: 'Logout',
        github: 'Github',
        login: 'Login',
        language: 'Language',
        // 登录相关
        loginPage: {
          title: 'Account Login',
          subtitle: 'Welcome back! Please enter your account information',
          username: 'Please enter username',
          password: 'Please enter password',
          rememberPassword: 'Remember password',
          forgotPassword: 'Forgot password?',
          loginButton: 'Login',
          registerButton: 'Register',
          loginSuccess: 'Login successful',
          register: 'Register',
          frameworkTitle: 'Ready-to-use Admin Management System Framework',
          frameworkSubtitle: 'Efficient Management・Secure & Reliable・Simple & Elegant',
        },
        // 错误页面
        error: {
          forbidden: 'Sorry, you do not have permission to access this page.',
          notFound: 'Sorry, the page you visited does not exist.',
          pageNotExist: 'Page component does not exist, please check if the component in the page directory is created correctly',
          home: 'Home',
          back: 'Back',
        },
        // 通用
        common: {
          home: 'Home',
          click: 'Click',
        },
      },
    },
  })
  app.use(i18n)
}
