import { createApp } from 'vue'
import { setupStore } from '@/stores'
import '@ayu-mu/core-common/style.css'
import '@ayu-mu/common/style.css'
import App from './App.vue'
import { setupRouter } from '@/router'
import './styles.css'
import { setupIconComponents } from '@/init/setupCommonState'

const setupApp = () => {
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
