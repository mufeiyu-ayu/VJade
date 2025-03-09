import { initDatabase } from '../utils/db'

export default defineNitroPlugin(async (nitroApp) => {
  await initDatabase()

  // 监听服务器事件
  nitroApp.hooks.hook('request', async () => {})
})
