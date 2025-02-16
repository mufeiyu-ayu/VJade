import { initDatabase } from './db'

// 初始化数据库
initDatabase().catch((err) => {
  console.error('Failed to initialize database:', err)
})
