import type { App } from 'vue'
import { createPinia } from 'pinia'

const store = createPinia()

/**
 * 初始化store
 * @param app
 */
function setupStore(app: App) {
  app.use(store)
}

export { setupStore, store }
