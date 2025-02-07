import { createPinia } from 'pinia'
import type { App } from 'vue'
const store = createPinia()

/**
 * 初始化store
 * @param app
 */
const setupStore = (app: App) => {
  app.use(store)
}

export { setupStore, store }
