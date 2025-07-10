import type { App, Component } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

interface ComponentType {
  default: {
    name: string
    component: Component
  }
}
/**
 * 注册全局组件
 * @param {App} app Vue实例
 */
export async function setupGlobalComponents(app: App) {
  // 注册 Element plus 图标
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
  // 将 components 目录下的所有组件注册为全局组件
  const components = import.meta.glob('../components/**/*.vue')
  for (const path in components) {
    const component = await components[path]() as ComponentType
    app.component(component.default.name, component.default)
  }
}
