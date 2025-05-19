import { createApp } from 'vue'
import { setupIconComponents } from '@/init/setupCommonState'
import { setupRouter } from '@/router'
import { setupStore } from '@/stores'
import App from './App.vue'
import '@ayu-mu/core-common/style.css'
import '@ayu-mu/common/style.css'
import './styles.css'

function setupApp() {
  const app = createApp(App)
  // 初始化store
  setupStore(app)
  // 初始化组件
  setupIconComponents(app)
  // 初始化路由
  setupRouter(app)
  // 挂载
  app.mount('#app')
}

setupApp()
