import { initDatabase } from '../utils/db'

export default defineNitroPlugin(async (nitroApp) => {
  console.log('插件开始执行...')
  await initDatabase()
  console.log('数据库初始化完成')

  // 监听服务器事件
  nitroApp.hooks.hook('request', async () => {
    console.log('收到新的请求')
  })
})
