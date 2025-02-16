import { createDatabase } from 'db0'
import sqlite from 'db0/connectors/better-sqlite3'

// 创建数据库实例
export const db = createDatabase(
  sqlite({
    name: 'db' // 修改数据库文件名,
  })
)

// 初始化数据库表
export async function initDatabase() {
  // 创建用户表
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      realName TEXT,
      roles TEXT NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  // 创建表单数据表
  await db.exec(`
    CREATE TABLE IF NOT EXISTS forms (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      age INTEGER,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      address TEXT,
      money INTEGER,
      sex TEXT,
      status TEXT,
      remark TEXT,
      isDelete INTEGER DEFAULT 0,
      isEnable INTEGER DEFAULT 1,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  // 插入默认用户
  const defaultUsers = [
    {
      username: 'ayu',
      password: '123456',
      realName: 'ayu',
      roles: JSON.stringify(['super'])
    },
    {
      username: 'admin',
      password: '123456',
      realName: 'Admin',
      roles: JSON.stringify(['admin'])
    }
  ]

  for (const user of defaultUsers) {
    await db.exec(`
      INSERT OR IGNORE INTO users (username, password, realName, roles) 
      VALUES ('${user.username}', '${user.password}', '${user.realName}', '${user.roles}')
    `)
  }
}
