import { AsyncLocalStorage } from 'node:async_hooks'
import { mkdirSync } from 'node:fs'
import { Server } from 'node:http'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import process from 'node:process'
import { parentPort, threadId } from 'node:worker_threads'
import { faker } from 'file:///Users/lihaoran/ayu/web-build/node_modules/.pnpm/@faker-js+faker@9.4.0/node_modules/@faker-js/faker/dist/index.js'
import sqlite from 'file:///Users/lihaoran/ayu/web-build/node_modules/.pnpm/db0@0.2.4_better-sqlite3@11.8.1/node_modules/db0/connectors/better-sqlite3.mjs'
import { createDatabase } from 'file:///Users/lihaoran/ayu/web-build/node_modules/.pnpm/db0@0.2.4_better-sqlite3@11.8.1/node_modules/db0/dist/index.mjs'
import defu, { defuFn } from 'file:///Users/lihaoran/ayu/web-build/node_modules/.pnpm/defu@6.1.4/node_modules/defu/dist/defu.mjs'
import destr from 'file:///Users/lihaoran/ayu/web-build/node_modules/.pnpm/destr@2.0.3/node_modules/destr/dist/index.mjs'
import { createApp, createError, createEvent, createRouter as createRouter$1, defineEventHandler, eventHandler, fetchWithEvent, getHeader, getQuery as getQuery$1, getRequestHeader, getRouterParam, handleCacheHeaders, isEvent, lazyEventHandler, proxyRequest, readBody, send, sendRedirect, setHeaders, setResponseHeader, setResponseStatus, splitCookiesString, toNodeListener } from 'file:///Users/lihaoran/ayu/web-build/node_modules/.pnpm/h3@1.14.0/node_modules/h3/dist/index.mjs'
import { createHooks } from 'file:///Users/lihaoran/ayu/web-build/node_modules/.pnpm/hookable@5.5.3/node_modules/hookable/dist/index.mjs'
import jwt from 'file:///Users/lihaoran/ayu/web-build/node_modules/.pnpm/jsonwebtoken@9.0.2/node_modules/jsonwebtoken/index.js'
import { klona } from 'file:///Users/lihaoran/ayu/web-build/node_modules/.pnpm/klona@2.0.6/node_modules/klona/dist/index.mjs'
import { createFetch as createFetch$1, Headers as Headers$1 } from 'file:///Users/lihaoran/ayu/web-build/node_modules/.pnpm/ofetch@1.4.1/node_modules/ofetch/dist/node.mjs'
import { hash } from 'file:///Users/lihaoran/ayu/web-build/node_modules/.pnpm/ohash@1.1.4/node_modules/ohash/dist/index.mjs'
import { createRouter, toRouteMatcher } from 'file:///Users/lihaoran/ayu/web-build/node_modules/.pnpm/radix3@1.1.2/node_modules/radix3/dist/index.mjs'
import { snakeCase } from 'file:///Users/lihaoran/ayu/web-build/node_modules/.pnpm/scule@1.3.0/node_modules/scule/dist/index.mjs'
import { isWindows, provider } from 'file:///Users/lihaoran/ayu/web-build/node_modules/.pnpm/std-env@3.8.0/node_modules/std-env/dist/index.mjs'
import { getQuery, joinURL, parseURL, withoutBase, withQuery } from 'file:///Users/lihaoran/ayu/web-build/node_modules/.pnpm/ufo@1.5.4/node_modules/ufo/dist/index.mjs'
import { getContext } from 'file:///Users/lihaoran/ayu/web-build/node_modules/.pnpm/unctx@2.4.1/node_modules/unctx/dist/index.mjs'
import { createCall, createFetch } from 'file:///Users/lihaoran/ayu/web-build/node_modules/.pnpm/unenv@1.10.0/node_modules/unenv/runtime/fetch/index.mjs'
import { createStorage, prefixStorage } from 'file:///Users/lihaoran/ayu/web-build/node_modules/.pnpm/unstorage@1.14.4_db0@0.2.4_better-sqlite3@11.8.1__ioredis@5.4.2/node_modules/unstorage/dist/index.mjs'
import unstorage_47drivers_47fs from 'file:///Users/lihaoran/ayu/web-build/node_modules/.pnpm/unstorage@1.14.4_db0@0.2.4_better-sqlite3@11.8.1__ioredis@5.4.2/node_modules/unstorage/drivers/fs.mjs'

globalThis._importMeta_ = { url: import.meta.url, env: process.env }

function hasReqHeader(event, name, includes) {
  const value = getRequestHeader(event, name)
  return value && typeof value === 'string' && value.toLowerCase().includes(includes)
}
function isJsonRequest(event) {
  if (hasReqHeader(event, 'accept', 'text/html')) {
    return false
  }
  return hasReqHeader(event, 'accept', 'application/json') || hasReqHeader(event, 'user-agent', 'curl/') || hasReqHeader(event, 'user-agent', 'httpie/') || hasReqHeader(event, 'sec-fetch-mode', 'cors') || event.path.startsWith('/api/') || event.path.endsWith('.json')
}
function normalizeError(error, isDev) {
  const cwd = typeof process.cwd === 'function' ? process.cwd() : '/'
  const stack = (error.stack || '').split('\n').splice(1).filter(line => line.includes('at ')).map((line) => {
    const text = line.replace(`${cwd}/`, './').replace('webpack:/', '').replace('file://', '').trim()
    return {
      text,
      internal: line.includes('node_modules') && !line.includes('.cache') || line.includes('internal') || line.includes('new Promise'),
    }
  })
  const statusCode = error.statusCode || 500
  const statusMessage = error.statusMessage ?? (statusCode === 404 ? 'Not Found' : '')
  const message = error.message || error.toString()
  return {
    stack,
    statusCode,
    statusMessage,
    message,
  }
}
function _captureError(error, type) {
  console.error(`[nitro] [${type}]`, error)
  useNitroApp().captureError(error, { tags: [type] })
}
function trapUnhandledNodeErrors() {
  process.on(
    'unhandledRejection',
    error => _captureError(error, 'unhandledRejection'),
  )
  process.on(
    'uncaughtException',
    error => _captureError(error, 'uncaughtException'),
  )
}
function joinHeaders(value) {
  return Array.isArray(value) ? value.join(', ') : String(value)
}
function normalizeFetchResponse(response) {
  if (!response.headers.has('set-cookie')) {
    return response
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: normalizeCookieHeaders(response.headers),
  })
}
function normalizeCookieHeader(header = '') {
  return splitCookiesString(joinHeaders(header))
}
function normalizeCookieHeaders(headers) {
  const outgoingHeaders = new Headers()
  for (const [name, header] of headers) {
    if (name === 'set-cookie') {
      for (const cookie of normalizeCookieHeader(header)) {
        outgoingHeaders.append('set-cookie', cookie)
      }
    }
    else {
      outgoingHeaders.set(name, joinHeaders(header))
    }
  }
  return outgoingHeaders
}

function defineNitroErrorHandler(handler) {
  return handler
}
const errorHandler = defineNitroErrorHandler(
  (error, event) => {
    const { stack, statusCode, statusMessage, message } = normalizeError(
      error,
    )
    const showDetails = statusCode !== 404
    const errorObject = {
      url: event.path || '',
      statusCode,
      statusMessage,
      message,
      stack: showDetails ? stack.map(i => i.text) : undefined,
    }
    if (error.unhandled || error.fatal) {
      const tags = [
        '[nitro]',
        '[request error]',
        error.unhandled && '[unhandled]',
        error.fatal && '[fatal]',
      ].filter(Boolean).join(' ')
      console.error(
        tags,
        `${error.message}\n${stack.map(l => `  ${l.text}`).join('  \n')}`,
      )
    }
    if (statusCode === 404) {
      setResponseHeader(event, 'Cache-Control', 'no-cache')
    }
    setResponseStatus(event, statusCode, statusMessage)
    if (isJsonRequest(event)) {
      setResponseHeader(event, 'Content-Type', 'application/json')
      return send(event, JSON.stringify(errorObject))
    }
    setResponseHeader(event, 'Content-Type', 'text/html')
    return send(event, renderHTMLError(errorObject))
  },
)
function renderHTMLError(error) {
  const statusCode = error.statusCode || 500
  const statusMessage = error.statusMessage || 'Request Error'
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${statusCode} ${statusMessage}</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico/css/pico.min.css">
  </head>
  <body>
    <main class="container">
      <dialog open>
        <article>
          <header>
            <h2>${statusCode} ${statusMessage}</h2>
          </header>
          <code>
            ${error.message}<br><br>
            ${`\n${(error.stack || []).map(i => `&nbsp;&nbsp;${i}`).join('<br>')}`}
          </code>
          <footer>
            <a href="/" onclick="event.preventDefault();history.back();">Go Back</a>
          </footer>
        </article>
      </dialog>
    </main>
  </body>
</html>
`
}

function defineNitroPlugin(def) {
  return def
}

const MOCK_USERS = [
  {
    id: 0,
    password: '123456',
    realName: 'ayu',
    roles: ['super'],
    username: 'ayu',
    createdAt: '2021-01-01 12:00:00',
    updatedAt: '2021-01-01 12:00:00',
  },
  {
    id: 1,
    password: '123456',
    realName: 'Admin',
    roles: ['admin'],
    username: 'admin',
    createdAt: '2021-01-01 12:00:00',
    updatedAt: '2021-01-01 12:00:00',
  },
  {
    id: 2,
    password: '123456',
    realName: 'Jack',
    roles: ['user'],
    username: 'jack',
    createdAt: '2021-01-01 12:00:00',
    updatedAt: '2021-01-01 12:00:00',
  },
]
const mockFormData = {
  id: 1,
  name: '\u5F20\u4E09',
  age: 18,
  email: 'zhangsan@163.com',
  phone: '12345678901',
  address: '\u5317\u4EAC\u5E02\u6D77\u6DC0\u533A',
  createTime: '2021-01-01 12:00:00',
  updateTime: '2021-01-01 12:00:00',
  money: 1e3,
  sex: '\u7537',
  status: '\u542F\u7528',
  remark: '\u5907\u6CE8',
  isDelete: false,
  isEnable: true,
}
const flatMenuList = [
  {
    id: 10001,
    parentId: null,
    menuTitle: '\u4EEA\u8868\u76D8',
    menuCode: 'dashboard',
    icon: 'Monitor',
    menuIndex: '1',
    isAdmin: false,
    roles: ['admin'],
    link: '/dashboard',
    show: true,
    type: 1,
    routePath: '/dashboard',
    uri: '/dashboard',
    pageName: 'Dashboard',
    sort: 1,
  },
  {
    id: 10002,
    parentId: null,
    menuTitle: '\u7CFB\u7EDF\u7BA1\u7406',
    menuCode: 'system',
    icon: 'Setting',
    menuIndex: '2',
    isAdmin: true,
    roles: ['admin'],
    link: '/system',
    show: true,
    type: 1,
    routePath: 'system',
    uri: '/system',
    pageName: 'SystemManage',
    sort: 2,
  },
  {
    id: 100001,
    parentId: 10002,
    menuTitle: '\u7528\u6237\u7BA1\u7406',
    menuCode: 'user',
    icon: 'User',
    menuIndex: '2-1',
    isAdmin: true,
    roles: ['admin'],
    link: '/system/user',
    show: true,
    type: 1,
    routePath: 'system/user',
    uri: '/system/user',
    pageName: 'UserManage',
    sort: 1,
  },
  {
    id: 1000011,
    parentId: 100001,
    menuTitle: '\u7528\u6237\u5217\u8868',
    menuCode: 'userList',
    icon: 'List',
    menuIndex: '2-1-1',
    isAdmin: true,
    roles: ['admin'],
    link: '/system/user/list',
    show: true,
    type: 2,
    routePath: 'system/user/list',
    uri: '/system/user/list',
    pageName: 'UserList',
    sort: 1,
  },
  {
    id: 1000012,
    parentId: 100001,
    menuTitle: '\u89D2\u8272\u7BA1\u7406',
    menuCode: 'role',
    icon: 'UserFilled',
    menuIndex: '2-1-2',
    isAdmin: true,
    roles: ['admin'],
    link: '/system/user/role',
    show: true,
    type: 2,
    routePath: 'system/user/role',
    uri: '/system/user/role',
    pageName: 'RoleManage',
    sort: 2,
  },
  {
    id: 100012,
    parentId: 10002,
    menuTitle: '\u6743\u9650\u7BA1\u7406',
    menuCode: 'permission',
    icon: 'Lock',
    menuIndex: '2-2',
    isAdmin: true,
    roles: ['admin'],
    link: '/system/permission',
    show: true,
    type: 1,
    routePath: 'system/permission',
    uri: '/system/permission',
    pageName: 'PermissionManage',
    sort: 2,
  },
  {
    id: 1000121,
    parentId: 100012,
    menuTitle: '\u83DC\u5355\u6743\u9650',
    menuCode: 'menuPermission',
    icon: 'Menu',
    menuIndex: '2-2-1',
    isAdmin: true,
    roles: ['admin'],
    link: '/system/permission/menu',
    show: true,
    type: 2,
    routePath: 'system/permission/menu',
    uri: '/system/permission/menu',
    pageName: 'MenuPermission',
    sort: 1,
  },
  {
    id: 1000122,
    parentId: 100012,
    menuTitle: '\u63A5\u53E3\u6743\u9650',
    menuCode: 'apiPermission',
    icon: 'Connection',
    menuIndex: '2-2-2',
    isAdmin: true,
    roles: ['admin'],
    link: '/system/permission/api',
    show: true,
    type: 2,
    routePath: 'system/permission/api',
    uri: '/system/permission/api',
    pageName: 'ApiPermission',
    sort: 2,
  },
  {
    id: 10003,
    parentId: null,
    menuTitle: '\u5185\u5BB9\u7BA1\u7406',
    menuCode: 'content',
    icon: 'Document',
    menuIndex: '3',
    isAdmin: false,
    roles: ['admin'],
    link: '/content',
    show: true,
    type: 1,
    routePath: 'content',
    uri: '/content',
    pageName: 'ContentManage',
    sort: 3,
  },
  {
    id: 1000131,
    parentId: 10003,
    menuTitle: '\u6D4B\u8BD5\u9875\u9762',
    menuCode: 'article1',
    icon: 'Files',
    menuIndex: '4-1',
    isAdmin: false,
    roles: ['admin'],
    link: '/content/article1',
    show: true,
    type: 1,
    routePath: 'content/article1',
    uri: '/content/article1',
    pageName: 'ArticleManage',
    sort: 1,
  },
  {
    id: 1000031,
    parentId: 10003,
    menuTitle: '\u6587\u7AE0\u7BA1\u7406',
    menuCode: 'article',
    icon: 'Files',
    menuIndex: '3-1',
    isAdmin: false,
    roles: ['admin'],
    link: '/content/article',
    show: true,
    type: 1,
    routePath: 'content/article',
    uri: '/content/article',
    pageName: 'ArticleManage',
    sort: 1,
  },
  {
    id: 10000311,
    parentId: 1000031,
    menuTitle: '\u6587\u7AE0\u5217\u8868',
    menuCode: 'articleList',
    icon: 'Document',
    menuIndex: '3-1-1',
    isAdmin: false,
    roles: ['admin'],
    link: '/content/article/list',
    show: true,
    type: 2,
    routePath: 'content/article/list',
    uri: '/content/article/list',
    pageName: 'ArticleList',
    sort: 1,
  },
  {
    id: 10000312,
    parentId: 1000031,
    menuTitle: '\u5206\u7C7B\u7BA1\u7406',
    menuCode: 'category',
    icon: 'FolderOpened',
    menuIndex: '3-1-2',
    isAdmin: false,
    roles: ['admin'],
    link: '/content/article/category',
    show: true,
    type: 2,
    routePath: 'content/article/category',
    uri: '/content/article/category',
    pageName: 'CategoryManage',
    sort: 2,
  },
  {
    id: 10000313,
    parentId: null,
    menuTitle: '\u901A\u7528\u9875\u9762 1',
    menuCode: 'common',
    icon: 'Document',
    menuIndex: '3-1-3',
    isAdmin: false,
    roles: ['admin', 'super'],
    link: '/content/article/common',
    show: true,
    type: 2,
    routePath: 'content/article/common',
    uri: '/content/article/common',
    pageName: 'CommonPage1',
    sort: 3,
  },
  {
    id: 10000314,
    parentId: null,
    menuTitle: '\u901A\u7528\u9875\u9762 2',
    menuCode: 'common2',
    icon: 'Document',
    menuIndex: '3-1-4',
    isAdmin: false,
    roles: ['admin', 'super'],
    link: '/content/article/common2',
    show: true,
    type: 2,
    routePath: 'content/article/common2',
    uri: '/content/article/common2',
    pageName: 'CommonPage2',
    sort: 4,
  },
  {
    id: 10000315,
    parentId: null,
    menuTitle: '\u901A\u7528\u9875\u9762 3',
    menuCode: 'common3',
    icon: 'Document',
    menuIndex: '3-1-5',
    isAdmin: false,
    roles: ['admin', 'super'],
    link: '/content/article/common3',
    show: true,
    type: 2,
    routePath: 'content/article/common3',
    uri: '/content/article/common3',
    pageName: 'CommonPage3',
    sort: 5,
  },
]
function mockTableData() {
  const allData = []
  let currentId = 1
  const firstLevelCount = 15
  for (let i = 0; i < firstLevelCount; i++) {
    const firstLevelItem = {
      id: currentId,
      parentId: null,
      userId: faker.number.int({ min: 1e3, max: 9999 }),
      product_name: faker.commerce.productName(),
      product_code: faker.string.alphanumeric(8).toUpperCase(),
      meno: faker.lorem.sentence(),
      username: faker.person.fullName(),
      user_code: `USR${faker.string.numeric(6)}`,
      createTime: faker.date.past().toISOString(),
      addTime: faker.date.recent().toISOString(),
      order_id: faker.string.numeric(10),
      order_name: `Order-${faker.string.alphanumeric(6)}`,
      package_num: faker.number.int({ min: 1, max: 100 }),
      weight: faker.number.float({ min: 0.1, max: 100, fractionDigits: 1 }),
      total_weight: faker.number.float({ min: 100, max: 1e4, fractionDigits: 1 }),
    }
    allData.push(firstLevelItem)
    currentId++
    const secondLevelCount = faker.number.int({ min: 2, max: 5 })
    for (let j = 0; j < secondLevelCount; j++) {
      const secondLevelItem = {
        id: currentId,
        parentId: firstLevelItem.id,
        userId: faker.number.int({ min: 1e3, max: 9999 }),
        product_name: `${firstLevelItem.product_name} - ${faker.commerce.productName()}`,
        product_code: `${firstLevelItem.product_code}-${faker.string.alphanumeric(4)}`,
        meno: faker.lorem.sentence(),
        username: faker.person.fullName(),
        user_code: `USR${faker.string.numeric(6)}`,
        createTime: faker.date.past().toISOString(),
        addTime: faker.date.recent().toISOString(),
        order_id: faker.string.numeric(10),
        order_name: `${firstLevelItem.order_name}-${faker.string.alphanumeric(4)}`,
        package_num: faker.number.int({ min: 1, max: 50 }),
        weight: faker.number.float({ min: 0.1, max: 50, fractionDigits: 1 }),
        total_weight: faker.number.float({ min: 50, max: 5e3, fractionDigits: 1 }),
      }
      allData.push(secondLevelItem)
      currentId++
      const thirdLevelCount = faker.number.int({ min: 1, max: 3 })
      for (let k = 0; k < thirdLevelCount; k++) {
        const thirdLevelItem = {
          id: currentId,
          parentId: secondLevelItem.id,
          userId: faker.number.int({ min: 1e3, max: 9999 }),
          product_name: `${secondLevelItem.product_name} - ${faker.commerce.productName()}`,
          product_code: `${secondLevelItem.product_code}-${faker.string.alphanumeric(4)}`,
          meno: faker.lorem.sentence(),
          username: faker.person.fullName(),
          user_code: `USR${faker.string.numeric(6)}`,
          createTime: faker.date.past().toISOString(),
          addTime: faker.date.recent().toISOString(),
          order_id: faker.string.numeric(10),
          order_name: `${secondLevelItem.order_name}-${faker.string.alphanumeric(4)}`,
          package_num: faker.number.int({ min: 1, max: 20 }),
          weight: faker.number.float({ min: 0.1, max: 20, fractionDigits: 1 }),
          total_weight: faker.number.float({ min: 20, max: 2e3, fractionDigits: 1 }),
        }
        allData.push(thirdLevelItem)
        currentId++
      }
    }
  }
  return allData
}

const db = createDatabase(
  sqlite({
    name: 'db',
    // 修改数据库文件名,
  }),
)
async function initDatabase() {
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
  await db.exec(`
    CREATE TABLE IF NOT EXISTS menus (
      id INTEGER PRIMARY KEY,
      parentId INTEGER,
      menuTitle TEXT NOT NULL,
      icon TEXT,
      menuIndex TEXT,
      isAdmin INTEGER DEFAULT 0,
      roles TEXT NOT NULL,
      link TEXT,
      menuCode TEXT,
      show INTEGER DEFAULT 1,
      type INTEGER,
      routePath TEXT,
      uri TEXT,
      pageName TEXT,
      sort INTEGER
    )
  `)
  const defaultUsers = [
    {
      username: 'ayu',
      password: '123456',
      realName: 'ayu',
      roles: JSON.stringify(['super']),
    },
    {
      username: 'admin',
      password: '123456',
      realName: 'Admin',
      roles: JSON.stringify(['admin']),
    },
  ]
  for (const user of defaultUsers) {
    await db.exec(`
      INSERT OR IGNORE INTO users (username, password, realName, roles) 
      VALUES ('${user.username}', '${user.password}', '${user.realName}', '${user.roles}')
    `)
  }
  for (const menu of flatMenuList) {
    await db.exec(`
      INSERT OR IGNORE INTO menus (
        id, parentId, menuTitle, icon, menuIndex, 
        isAdmin, roles, link,menuCode, show, type, 
        routePath, uri, pageName, sort
      ) 
      VALUES (
        ${menu.id},
        ${menu.parentId === null ? 'NULL' : menu.parentId},
        '${menu.menuTitle}',
        '${menu.icon}',
        '${menu.menuIndex}',
        ${menu.isAdmin ? 1 : 0},
        '${JSON.stringify(menu.roles)}',
        '${menu.link}',
        '${menu.menuCode}',
        ${menu.show ? 1 : 0},
        ${menu.type},
        '${menu.routePath}',
        '${menu.uri}',
        '${menu.pageName}',
        ${menu.sort}
      )
    `)
  }
}

const _ro35ep7zZ2 = defineNitroPlugin(async (nitroApp) => {
  await initDatabase()
  nitroApp.hooks.hook('request', async () => {
  })
})

const plugins = [
  _ro35ep7zZ2,
]

const _lazy_XD21mC = () => Promise.resolve().then(() => { return login_post$1 })
const _lazy_Me7Sjj = () => Promise.resolve().then(() => { return form_get$1 })
const _lazy_9j4ond = () => Promise.resolve().then(() => { return form_post$1 })
const _lazy_kBZtVT = () => Promise.resolve().then(() => { return menu_get$1 })
const _lazy_BwWzaI = () => Promise.resolve().then(() => { return index_post$1 })
const _lazy_Tm4FON = () => Promise.resolve().then(() => { return test$1 })
const _lazy_GIo87M = () => Promise.resolve().then(() => { return _____$1 })

const handlers = [
  { route: '/api/auth/login', handler: _lazy_XD21mC, lazy: true, middleware: false, method: 'post' },
  { route: '/api/form', handler: _lazy_Me7Sjj, lazy: true, middleware: false, method: 'get' },
  { route: '/api/form', handler: _lazy_9j4ond, lazy: true, middleware: false, method: 'post' },
  { route: '/api/menu/menu', handler: _lazy_kBZtVT, lazy: true, middleware: false, method: 'get' },
  { route: '/api/table', handler: _lazy_BwWzaI, lazy: true, middleware: false, method: 'post' },
  { route: '/api/test', handler: _lazy_Tm4FON, lazy: true, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_GIo87M, lazy: true, middleware: false, method: undefined },
]

const serverAssets = [{ baseName: 'server', dir: '/Users/lihaoran/ayu/web-build/server/server/assets' }]

const assets = createStorage()

for (const asset of serverAssets) {
  assets.mount(asset.baseName, unstorage_47drivers_47fs({ base: asset.dir, ignore: (asset?.ignore || []) }))
}

const storage = createStorage({})

storage.mount('/assets', assets)

storage.mount('root', unstorage_47drivers_47fs({ driver: 'fs', readOnly: true, base: '/Users/lihaoran/ayu/web-build/server', ignore: ['**/node_modules/**', '**/.git/**'] }))
storage.mount('src', unstorage_47drivers_47fs({ driver: 'fs', readOnly: true, base: '/Users/lihaoran/ayu/web-build/server/server', ignore: ['**/node_modules/**', '**/.git/**'] }))
storage.mount('build', unstorage_47drivers_47fs({ driver: 'fs', readOnly: false, base: '/Users/lihaoran/ayu/web-build/server/.nitro', ignore: ['**/node_modules/**', '**/.git/**'] }))
storage.mount('cache', unstorage_47drivers_47fs({ driver: 'fs', readOnly: false, base: '/Users/lihaoran/ayu/web-build/server/.nitro/cache', ignore: ['**/node_modules/**', '**/.git/**'] }))
storage.mount('data', unstorage_47drivers_47fs({ driver: 'fs', base: '/Users/lihaoran/ayu/web-build/server/.data/kv', ignore: ['**/node_modules/**', '**/.git/**'] }))

function useStorage(base = '') {
  return base ? prefixStorage(storage, base) : storage
}

function defaultCacheOptions() {
  return {
    name: '_',
    base: '/cache',
    swr: true,
    maxAge: 1,
  }
}
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions(), ...opts }
  const pending = {}
  const group = opts.group || 'nitro/functions'
  const name = opts.name || fn.name || '_'
  const integrity = opts.integrity || hash([fn, opts])
  const validate = opts.validate || (entry => entry.value !== undefined)
  async function get(key, resolver, shouldInvalidateCache, event) {
    const cacheKey = [opts.base, group, name, `${key}.json`].filter(Boolean).join(':').replace(/:\/$/, ':index')
    let entry = await useStorage().getItem(cacheKey).catch((error) => {
      console.error(`[nitro] [cache] Cache read error.`, error)
      useNitroApp().captureError(error, { event, tags: ['cache'] })
    }) || {}
    if (typeof entry !== 'object') {
      entry = {}
      const error = new Error('Malformed data read from cache.')
      console.error('[nitro] [cache]', error)
      useNitroApp().captureError(error, { event, tags: ['cache'] })
    }
    const ttl = (opts.maxAge ?? 0) * 1e3
    if (ttl) {
      entry.expires = Date.now() + ttl
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || validate(entry) === false
    const _resolve = async () => {
      const isPending = pending[key]
      if (!isPending) {
        if (entry.value !== undefined && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = undefined
          entry.integrity = undefined
          entry.mtime = undefined
          entry.expires = undefined
        }
        pending[key] = Promise.resolve(resolver())
      }
      try {
        entry.value = await pending[key]
      }
      catch (error) {
        if (!isPending) {
          delete pending[key]
        }
        throw error
      }
      if (!isPending) {
        entry.mtime = Date.now()
        entry.integrity = integrity
        delete pending[key]
        if (validate(entry) !== false) {
          let setOpts
          if (opts.maxAge && !opts.swr) {
            setOpts = { ttl: opts.maxAge }
          }
          const promise = useStorage().setItem(cacheKey, entry, setOpts).catch((error) => {
            console.error(`[nitro] [cache] Cache write error.`, error)
            useNitroApp().captureError(error, { event, tags: ['cache'] })
          })
          if (event?.waitUntil) {
            event.waitUntil(promise)
          }
        }
      }
    }
    const _resolvePromise = expired ? _resolve() : Promise.resolve()
    if (entry.value === undefined) {
      await _resolvePromise
    }
    else if (expired && event && event.waitUntil) {
      event.waitUntil(_resolvePromise)
    }
    if (opts.swr && validate(entry) !== false) {
      _resolvePromise.catch((error) => {
        console.error(`[nitro] [cache] SWR handler error.`, error)
        useNitroApp().captureError(error, { event, tags: ['cache'] })
      })
      return entry
    }
    return _resolvePromise.then(() => entry)
  }
  return async (...args) => {
    const shouldBypassCache = await opts.shouldBypassCache?.(...args)
    if (shouldBypassCache) {
      return fn(...args)
    }
    const key = await (opts.getKey || getKey)(...args)
    const shouldInvalidateCache = await opts.shouldInvalidateCache?.(...args)
    const entry = await get(
      key,
      () => fn(...args),
      shouldInvalidateCache,
      args[0] && isEvent(args[0]) ? args[0] : undefined,
    )
    let value = entry.value
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value
    }
    return value
  }
}
function cachedFunction(fn, opts = {}) {
  return defineCachedFunction(fn, opts)
}
function getKey(...args) {
  return args.length > 0 ? hash(args, {}) : ''
}
function escapeKey(key) {
  return String(key).replace(/\W/g, '')
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions()) {
  const variableHeaderNames = (opts.varies || []).filter(Boolean).map(h => h.toLowerCase()).sort()
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const customKey = await opts.getKey?.(event)
      if (customKey) {
        return escapeKey(customKey)
      }
      const _path = event.node.req.originalUrl || event.node.req.url || event.path
      let _pathname
      try {
        _pathname = escapeKey(decodeURI(parseURL(_path).pathname)).slice(0, 16) || 'index'
      }
      catch {
        _pathname = '-'
      }
      const _hashedPath = `${_pathname}.${hash(_path)}`
      const _headers = variableHeaderNames.map(header => [header, event.node.req.headers[header]]).map(([name, value]) => `${escapeKey(name)}.${hash(value)}`)
      return [_hashedPath, ..._headers].join(':')
    },
    validate: (entry) => {
      if (!entry.value) {
        return false
      }
      if (entry.value.code >= 400) {
        return false
      }
      if (entry.value.body === undefined) {
        return false
      }
      if (entry.value.headers.etag === 'undefined' || entry.value.headers['last-modified'] === 'undefined') {
        return false
      }
      return true
    },
    group: opts.group || 'nitro/handlers',
    integrity: opts.integrity || hash([handler, opts]),
  }
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const variableHeaders = {}
      for (const header of variableHeaderNames) {
        const value = incomingEvent.node.req.headers[header]
        if (value !== undefined) {
          variableHeaders[header] = value
        }
      }
      const reqProxy = cloneWithProxy(incomingEvent.node.req, {
        headers: variableHeaders,
      })
      const resHeaders = {}
      let _resSendBody
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        writableEnded: false,
        writableFinished: false,
        headersSent: false,
        closed: false,
        getHeader(name) {
          return resHeaders[name]
        },
        setHeader(name, value) {
          resHeaders[name] = value
          return this
        },
        getHeaderNames() {
          return Object.keys(resHeaders)
        },
        hasHeader(name) {
          return name in resHeaders
        },
        removeHeader(name) {
          delete resHeaders[name]
        },
        getHeaders() {
          return resHeaders
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === 'string') {
            _resSendBody = chunk
          }
          if (typeof arg2 === 'function') {
            arg2()
          }
          if (typeof arg3 === 'function') {
            arg3()
          }
          return this
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === 'string') {
            _resSendBody = chunk
          }
          if (typeof arg2 === 'function') {
            arg2(undefined)
          }
          if (typeof arg3 === 'function') {
            arg3()
          }
          return true
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode
          if (headers2) {
            if (Array.isArray(headers2) || typeof headers2 === 'string') {
              throw new TypeError('Raw headers  is not supported.')
            }
            for (const header in headers2) {
              const value = headers2[header]
              if (value !== undefined) {
                this.setHeader(
                  header,
                  value,
                )
              }
            }
          }
          return this
        },
      })
      const event = createEvent(reqProxy, resProxy)
      event.fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: useNitroApp().localFetch,
      })
      event.$fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: globalThis.$fetch,
      })
      event.context = incomingEvent.context
      event.context.cache = {
        options: _opts,
      }
      const body = await handler(event) || _resSendBody
      const headers = event.node.res.getHeaders()
      headers.etag = String(
        headers.Etag || headers.etag || `W/"${hash(body)}"`,
      )
      headers['last-modified'] = String(
        headers['Last-Modified'] || headers['last-modified'] || (/* @__PURE__ */ new Date()).toUTCString(),
      )
      const cacheControl = []
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`)
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`)
        }
        else {
          cacheControl.push('stale-while-revalidate')
        }
      }
      else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`)
      }
      if (cacheControl.length > 0) {
        headers['cache-control'] = cacheControl.join(', ')
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body,
      }
      return cacheEntry
    },
    _opts,
  )
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return
      }
      return handler(event)
    }
    const response = await _cachedHandler(
      event,
    )
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers['last-modified']),
      etag: response.headers.etag,
      maxAge: opts.maxAge,
    })) {
      return
    }
    event.node.res.statusCode = response.code
    for (const name in response.headers) {
      const value = response.headers[name]
      if (name === 'set-cookie') {
        event.node.res.appendHeader(
          name,
          splitCookiesString(value),
        )
      }
      else {
        if (value !== undefined) {
          event.node.res.setHeader(name, value)
        }
      }
    }
    return response.body
  })
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property]
      }
      return Reflect.get(target, property, receiver)
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value
        return true
      }
      return Reflect.set(target, property, value, receiver)
    },
  })
}
const cachedEventHandler = defineCachedEventHandler

const inlineAppConfig = {}

const appConfig = defuFn(inlineAppConfig)

function getEnv(key, opts) {
  const envKey = snakeCase(key).toUpperCase()
  return destr(
    process.env[opts.prefix + envKey] ?? process.env[opts.altPrefix + envKey],
  )
}
function _isObject(input) {
  return typeof input === 'object' && !Array.isArray(input)
}
function applyEnv(obj, opts, parentKey = '') {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key
    const envValue = getEnv(subKey, opts)
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue }
        applyEnv(obj[key], opts, subKey)
      }
      else if (envValue === undefined) {
        applyEnv(obj[key], opts, subKey)
      }
      else {
        obj[key] = envValue ?? obj[key]
      }
    }
    else {
      obj[key] = envValue ?? obj[key]
    }
    if (opts.envExpansion && typeof obj[key] === 'string') {
      obj[key] = _expandFromEnv(obj[key])
    }
  }
  return obj
}
const envExpandRx = /\{\{(.*?)\}\}/g
function _expandFromEnv(value) {
  return value.replace(envExpandRx, (match, key) => {
    return process.env[key] || match
  })
}

const _inlineRuntimeConfig = {
  app: {
    baseURL: '/',
  },
  nitro: {
    routeRules: {
      '/api/**': {
        cors: true,
        headers: {
          'access-control-allow-origin': '*',
          'access-control-allow-methods': '*',
          'access-control-allow-headers': '*',
          'access-control-max-age': '0',
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Expose-Headers': '*',
        },
      },
    },
  },
}
const envOptions = {
  prefix: 'NITRO_',
  altPrefix: _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? '_',
  envExpansion: _inlineRuntimeConfig.nitro.envExpansion ?? process.env.NITRO_ENV_EXPANSION ?? false,
}
const _sharedRuntimeConfig = _deepFreeze(
  applyEnv(klona(_inlineRuntimeConfig), envOptions),
)
function useRuntimeConfig(event) {
  {
    return _sharedRuntimeConfig
  }
}
_deepFreeze(klona(appConfig))
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object)
  for (const name of propNames) {
    const value = object[name]
    if (value && typeof value === 'object') {
      _deepFreeze(value)
    }
  }
  return Object.freeze(object)
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      'Please use `useRuntimeConfig()` instead of accessing config directly.',
    )
    const runtimeConfig = useRuntimeConfig()
    if (prop in runtimeConfig) {
      return runtimeConfig[prop]
    }
    return undefined
  },
})

const nitroAsyncContext = getContext('nitro-app', {
  asyncContext: true,
  AsyncLocalStorage,
})

const config = useRuntimeConfig()
const _routeRulesMatcher = toRouteMatcher(
  createRouter({ routes: config.nitro.routeRules }),
)
function createRouteRulesHandler(ctx) {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event)
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers)
    }
    if (routeRules.redirect) {
      let target = routeRules.redirect.to
      if (target.endsWith('/**')) {
        let targetPath = event.path
        const strpBase = routeRules.redirect._redirectStripBase
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase)
        }
        target = joinURL(target.slice(0, -3), targetPath)
      }
      else if (event.path.includes('?')) {
        const query = getQuery(event.path)
        target = withQuery(target, query)
      }
      return sendRedirect(event, target, routeRules.redirect.statusCode)
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to
      if (target.endsWith('/**')) {
        let targetPath = event.path
        const strpBase = routeRules.proxy._proxyStripBase
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase)
        }
        target = joinURL(target.slice(0, -3), targetPath)
      }
      else if (event.path.includes('?')) {
        const query = getQuery(event.path)
        target = withQuery(target, query)
      }
      return proxyRequest(event, target, {
        fetch: ctx.localFetch,
        ...routeRules.proxy,
      })
    }
  })
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {}
  if (!event.context._nitro.routeRules) {
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(event.path.split('?')[0], useRuntimeConfig().app.baseURL),
    )
  }
  return event.context._nitro.routeRules
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse())
}

function createNitroApp() {
  const config = useRuntimeConfig()
  const hooks = createHooks()
  const captureError = (error, context = {}) => {
    const promise = hooks.callHookParallel('error', error, context).catch((error_) => {
      console.error('Error while capturing another error', error_)
    })
    if (context.event && isEvent(context.event)) {
      const errors = context.event.context.nitro?.errors
      if (errors) {
        errors.push({ error, context })
      }
      if (context.event.waitUntil) {
        context.event.waitUntil(promise)
      }
    }
  }
  const h3App = createApp({
    debug: destr(true),
    onError: (error, event) => {
      captureError(error, { event, tags: ['request'] })
      return errorHandler(error, event)
    },
    onRequest: async (event) => {
      await nitroApp$1.hooks.callHook('request', event).catch((error) => {
        captureError(error, { event, tags: ['request'] })
      })
    },
    onBeforeResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook('beforeResponse', event, response).catch((error) => {
        captureError(error, { event, tags: ['request', 'response'] })
      })
    },
    onAfterResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook('afterResponse', event, response).catch((error) => {
        captureError(error, { event, tags: ['request', 'response'] })
      })
    },
  })
  const router = createRouter$1({
    preemptive: true,
  })
  const localCall = createCall(toNodeListener(h3App))
  const _localFetch = createFetch(localCall, globalThis.fetch)
  const localFetch = (input, init) => _localFetch(input, init).then(
    response => normalizeFetchResponse(response),
  )
  const $fetch = createFetch$1({
    fetch: localFetch,
    Headers: Headers$1,
    defaults: { baseURL: config.app.baseURL },
  })
  globalThis.$fetch = $fetch
  h3App.use(createRouteRulesHandler({ localFetch }))
  h3App.use(
    eventHandler((event) => {
      event.context.nitro = event.context.nitro || { errors: [] }
      const envContext = event.node.req?.__unenv__
      if (envContext) {
        Object.assign(event.context, envContext)
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch })
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, {
        fetch: $fetch,
      })
      event.waitUntil = (promise) => {
        if (!event.context.nitro._waitUntilPromises) {
          event.context.nitro._waitUntilPromises = []
        }
        event.context.nitro._waitUntilPromises.push(promise)
        if (envContext?.waitUntil) {
          envContext.waitUntil(promise)
        }
      }
      event.captureError = (error, context) => {
        captureError(error, { event, ...context })
      }
    }),
  )
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || '/')).replace(
        /\/+/g,
        '/',
      )
      h3App.use(middlewareBase, handler)
    }
    else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, '_'),
      )
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: 'nitro/routes',
          ...routeRules.cache,
        })
      }
      router.use(h.route, handler, h.method)
    }
  }
  h3App.use(config.app.baseURL, router.handler)
  {
    const _handler = h3App.handler
    h3App.handler = (event) => {
      const ctx = { event }
      return nitroAsyncContext.callAsync(ctx, () => _handler(event))
    }
  }
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch,
    captureError,
  }
  return app
}
function runNitroPlugins(nitroApp2) {
  for (const plugin of plugins) {
    try {
      plugin(nitroApp2)
    }
    catch (error) {
      nitroApp2.captureError(error, { tags: ['plugin'] })
      throw error
    }
  }
}
const nitroApp$1 = createNitroApp()
function useNitroApp() {
  return nitroApp$1
}
runNitroPlugins(nitroApp$1)

const scheduledTasks = false

const tasks = {

}

const __runningTasks__ = {}
async function runTask(name, {
  payload = {},
  context = {},
} = {}) {
  if (__runningTasks__[name]) {
    return __runningTasks__[name]
  }
  if (!(name in tasks)) {
    throw createError({
      message: `Task \`${name}\` is not available!`,
      statusCode: 404,
    })
  }
  if (!tasks[name].resolve) {
    throw createError({
      message: `Task \`${name}\` is not implemented!`,
      statusCode: 501,
    })
  }
  const handler = await tasks[name].resolve()
  const taskEvent = { name, payload, context }
  __runningTasks__[name] = handler.run(taskEvent)
  try {
    const res = await __runningTasks__[name]
    return res
  }
  finally {
    delete __runningTasks__[name]
  }
}

const nitroApp = useNitroApp()
const server = new Server(toNodeListener(nitroApp.h3App))
function getAddress() {
  if (provider === 'stackblitz' || process.env.NITRO_NO_UNIX_SOCKET || process.versions.bun) {
    return 0
  }
  const socketName = `worker-${process.pid}-${threadId}.sock`
  if (isWindows) {
    return join(String.raw`\\.\pipe\nitro`, socketName)
  }
  const socketDir = join(tmpdir(), 'nitro')
  mkdirSync(socketDir, { recursive: true })
  return join(socketDir, socketName)
}
const listenAddress = getAddress()
server.listen(listenAddress, () => {
  const _address = server.address()
  parentPort?.postMessage({
    event: 'listen',
    address: typeof _address === 'string' ? { socketPath: _address } : { host: 'localhost', port: _address?.port },
  })
})
nitroApp.router.get(
  '/_nitro/tasks',
  defineEventHandler(async (event) => {
    const _tasks = await Promise.all(
      Object.entries(tasks).map(async ([name, task]) => {
        const _task = await task.resolve?.()
        return [name, { description: _task?.meta?.description }]
      }),
    )
    return {
      tasks: Object.fromEntries(_tasks),
      scheduledTasks,
    }
  }),
)
nitroApp.router.use(
  '/_nitro/tasks/:name',
  defineEventHandler(async (event) => {
    const name = getRouterParam(event, 'name')
    const payload = {
      ...getQuery$1(event),
      ...await readBody(event).then(r => r?.payload).catch(() => ({})),
    }
    return await runTask(name, { payload })
  }),
)
trapUnhandledNodeErrors()
async function onShutdown(signal) {
  await nitroApp.hooks.callHook('close')
}
parentPort?.on('message', async (msg) => {
  if (msg && msg.event === 'shutdown') {
    await onShutdown()
    parentPort?.postMessage({ event: 'exit' })
  }
})

function useResponseSuccess(data) {
  return {
    code: 0,
    ...data,
    error: null,
    message: 'ok',
  }
}
function useResponseError(message, error = null) {
  return {
    code: -1,
    data: null,
    error,
    message,
  }
}
function unAuthorizedResponse(event) {
  setResponseStatus(event, 401)
  return useResponseError('Unauthorized Exception', 'Unauthorized Exception')
}

const ACCESS_TOKEN_SECRET = 'access_token_secret'
function generateAccessToken(user) {
  return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: '7d' })
}
function verifyAccessToken(event) {
  const authHeader = getHeader(event, 'Authorization')
  if (!(authHeader == null ? undefined : authHeader.startsWith('Bearer'))) {
    return null
  }
  const token = authHeader.split(' ')[1]
  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET)
    const username = decoded.username
    const user = MOCK_USERS.find(item => item.username === username)
    const { password: _pwd, ...userinfo } = user
    return userinfo
  }
  catch {
    return null
  }
}

const login_post = defineEventHandler(async (event) => {
  const { password, username } = await readBody(event)
  if (!username || !password) {
    return useResponseError('\u7528\u6237\u540D\u6216\u5BC6\u7801\u4E0D\u80FD\u4E3A\u7A7A')
  }
  const { rows } = await db.sql`SELECT * FROM users WHERE username = ${username} AND password = ${password}`
  if (!rows.length)
    return
  console.log(rows)
  const userWithParsedRoles = {
    ...rows[0],
    roles: JSON.parse(rows[0].roles),
  }
  const accessToken = generateAccessToken(userWithParsedRoles)
  await new Promise(resolve => setTimeout(resolve, 300))
  return useResponseSuccess({
    data: {
      ...userWithParsedRoles,
      accessToken,
    },
  })
})

const login_post$1 = /* #__PURE__ */Object.freeze({
  __proto__: null,
  default: login_post,
})

const form_get = defineEventHandler((event) => {
  console.log(event, 'event')
  return useResponseSuccess({
    data: mockFormData,
  })
})

const form_get$1 = /* #__PURE__ */Object.freeze({
  __proto__: null,
  default: form_get,
})

const form_post = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    if (!body.name) {
      return useResponseError('\u59D3\u540D\u4E0D\u80FD\u4E3A\u7A7A')
    }
    const emailRegex = /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return useResponseError('\u90AE\u7BB1\u683C\u5F0F\u4E0D\u6B63\u786E')
    }
    const phoneRegex = /^1[3-9]\d{9}$/
    if (!phoneRegex.test(body.phone)) {
      return useResponseError('\u624B\u673A\u53F7\u683C\u5F0F\u4E0D\u6B63\u786E')
    }
    const now = (/* @__PURE__ */ new Date()).toISOString()
    const savedForm = {
      id: Date.now(),
      name: body.name,
      age: body.age,
      email: body.email,
      phone: body.phone,
      address: body.address,
      createTime: now,
      updateTime: now,
      money: body.money,
      sex: body.sex,
      status: body.status,
      remark: body.remark || '',
      isDelete: false,
      isEnable: body.isEnable,
    }
    console.log(savedForm, 'savedForm')
    return useResponseSuccess({})
  }
  catch (error) {
    console.error('\u4FDD\u5B58\u8868\u5355\u5931\u8D25:', error)
    return useResponseError('\u4FDD\u5B58\u8868\u5355\u5931\u8D25')
  }
})

const form_post$1 = /* #__PURE__ */Object.freeze({
  __proto__: null,
  default: form_post,
})

const menu_get = defineEventHandler(async (event) => {
  const userinfo = verifyAccessToken(event)
  console.log('userinfo', userinfo)
  if (!userinfo) {
    return unAuthorizedResponse(event)
  }
  const userRoles = JSON.stringify(userinfo.roles).slice(1, -1)
  const { rows } = await db.sql`
    SELECT * FROM menus 
    WHERE json_extract(roles, '$') LIKE '%' || ${userRoles} || '%'
  `
  console.log('rows', rows)
  return useResponseSuccess({
    data: rows,
  })
})

const menu_get$1 = /* #__PURE__ */Object.freeze({
  __proto__: null,
  default: menu_get,
})

const index_post = defineEventHandler(async (event) => {
  const body = await readBody(event)
  const page = body.page || 1
  const pageSize = body.pageSize || 10
  const allData = mockTableData()
  const start = (page - 1) * pageSize
  const end = start + pageSize
  await new Promise(resolve => setTimeout(resolve, 500))
  return useResponseSuccess({
    data: {
      list: allData.slice(start, end),
      total: allData.length,
      page,
      pageSize,
    },
  })
})

const index_post$1 = /* #__PURE__ */Object.freeze({
  __proto__: null,
  default: index_post,
})

const test = defineEventHandler(() => {
  return useResponseSuccess({
    message: 'Hello World',
  })
})

const test$1 = /* #__PURE__ */Object.freeze({
  __proto__: null,
  default: test,
})

const _____ = defineEventHandler(() => {
  return `
  <h1>Hello this is  VJade's API docs</h1>
<h2>Mock service is starting</h2>
<ul>
<li><a href="/api/user">/api/user/info</a></li>
<li><a href="/api/menu/menu">/api/menu/menu</a></li>
<li><a href="/api/table">/api/table</a></li>
<li><a href="/api/auth/codes">/api/auth/codes</a></li>
<li><a href="/api/auth/login">/api/auth/login</a></li>
<li><a href="/api/test">/api/test</a></li>

</ul>
`
})

const _____$1 = /* #__PURE__ */Object.freeze({
  __proto__: null,
  default: _____,
})
// # sourceMappingURL=index.mjs.map
