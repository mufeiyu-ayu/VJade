import type { MenuItem } from '@ayu-mu/model'
import { faker } from '@faker-js/faker'

export const MOCK_USERS: UserInfo[] = [
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

export const mockFormData: MockFormData = {
  id: 1,
  name: '张三',
  age: 18,
  email: 'zhangsan@163.com',
  phone: '12345678901',
  address: '北京市海淀区',
  createTime: '2021-01-01 12:00:00',
  updateTime: '2021-01-01 12:00:00',
  money: 1000,
  sex: '男',
  status: '启用',
  remark: '备注',
  isDelete: false,
  isEnable: true,
}
export const flatMenuList: MenuItem[] = [
  {
    id: 10001,
    parentId: null,
    menuTitle: '仪表盘',
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
    menuTitle: '系统管理',
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
    menuTitle: '用户管理',
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
    menuTitle: '用户列表',
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
    menuTitle: '角色管理',
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
    menuTitle: '权限管理',
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
    menuTitle: '菜单权限',
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
    menuTitle: '接口权限',
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
    menuTitle: '内容管理',
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
    menuTitle: '测试页面',
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
    menuTitle: '文章管理',
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
    menuTitle: '文章列表',
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
    menuTitle: '分类管理',
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
    menuTitle: '通用页面 1',
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
    menuTitle: '通用页面 2',
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
    menuTitle: '通用页面 3',
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

/**
 * 生成模拟的表格数据，包含父子层级关系
 * @returns {Array} 返回一个包含父子关系的一维数组
 */
export function mockTableData() {
  const allData = []
  let currentId = 1

  // 生成一级节点
  const firstLevelCount = 15
  for (let i = 0; i < firstLevelCount; i++) {
    const firstLevelItem = {
      id: currentId,
      parentId: null,
      userId: faker.number.int({ min: 1000, max: 9999 }),
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
      total_weight: faker.number.float({ min: 100, max: 10000, fractionDigits: 1 }),
    }
    allData.push(firstLevelItem)
    currentId++

    // 为每个一级节点生成二级节点
    const secondLevelCount = faker.number.int({ min: 2, max: 5 })
    for (let j = 0; j < secondLevelCount; j++) {
      const secondLevelItem = {
        id: currentId,
        parentId: firstLevelItem.id,
        userId: faker.number.int({ min: 1000, max: 9999 }),
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
        total_weight: faker.number.float({ min: 50, max: 5000, fractionDigits: 1 }),
      }
      allData.push(secondLevelItem)
      currentId++

      // 为每个二级节点生成三级节点
      const thirdLevelCount = faker.number.int({ min: 1, max: 3 })
      for (let k = 0; k < thirdLevelCount; k++) {
        const thirdLevelItem = {
          id: currentId,
          parentId: secondLevelItem.id,
          userId: faker.number.int({ min: 1000, max: 9999 }),
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
          total_weight: faker.number.float({ min: 20, max: 2000, fractionDigits: 1 }),
        }
        allData.push(thirdLevelItem)
        currentId++
      }
    }
  }

  return allData
}
interface FoundManageItem {
  id: string // 数据项 ID
  businessId: string // 业务 ID
  employeeAccount: string // 员工账户
  type: 10 | 20 | 30 | 40 // 类型 (10订单扣款，20订单退款，30充值，40提现)
  price: number // 价格
  beforeBalance: number // 变动前金额
  afterBalance: number // 变动后金额
  remark: string // 备注
  [key: string]: string | number // 索引签名，兼容 TableRecord 类型
}
export function mockTableData2() {
  // 帮我生成 45 条FoundManageItem的数组随机数据
  const data: FoundManageItem[] = []
  const types: (10 | 20 | 30 | 40)[] = [10, 20, 30, 40]
  const typeNames = ['订单扣款', '订单退款', '充值', '提现']

  for (let i = 1; i <= 45; i++) {
    const type = types[Math.floor(Math.random() * types.length)]
    const price = Math.floor(Math.random() * 10000) + 100 // 100-10100之间的随机价格
    const beforeBalance = Math.floor(Math.random() * 50000) + 1000 // 1000-51000之间的余额

    // 根据类型计算变动后金额
    let afterBalance: number
    if (type === 10 || type === 40) { // 订单扣款或提现，减少余额
      afterBalance = beforeBalance - price
    }
    else { // 订单退款或充值，增加余额
      afterBalance = beforeBalance + price
    }

    data.push({
      id: i.toString(),
      businessId: `BUS${i.toString().padStart(6, '0')}`,
      employeeAccount: `emp${i.toString().padStart(3, '0')}`,
      type,
      price,
      beforeBalance,
      afterBalance,
      remark: `${typeNames[types.indexOf(type)]}记录${i}`,
    })
  }
  return data
}
