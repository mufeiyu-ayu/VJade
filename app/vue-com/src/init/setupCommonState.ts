import type { App } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

/**
 * 注册全局组件
 * @param {App} app Vue实例
 */
export const setupComponents = (app: App) => {
  // 注册 Element plus 图标
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
}
