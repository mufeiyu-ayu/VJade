import { createApp } from 'vue'
import { setupI18n } from '@/init/local'
import { setupGlobalComponents } from '@/init/setupComponent'
import { setupRouter } from '@/router'
import { setupStore } from '@/stores'
import App from './App.vue'
import '@/styles/global.scss'

function setupApp() {
  const app = createApp(App)
  // 初始化 i18n
  setupI18n(app)
  // 初始化store
  setupStore(app)
  // 初始化组件
  setupGlobalComponents(app)
  // 初始化路由
  setupRouter(app)
  // 挂载
  app.mount('#app')
}

setupApp()
