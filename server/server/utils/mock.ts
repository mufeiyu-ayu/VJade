import type { MenuItem } from '@ayu-mu/model'

export const MOCK_USERS: UserInfo[] = [
  {
    id: 0,
    password: '123456',
    realName: 'ayu',
    roles: ['super'],
    username: 'ayu'
  },
  {
    id: 1,
    password: '123456',
    realName: 'Admin',
    roles: ['admin'],
    username: 'admin'
  },
  {
    id: 2,
    password: '123456',
    realName: 'Jack',
    roles: ['user'],
    username: 'jack'
  }
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
  isEnable: true
}
export const menuList: MenuItem[] = [
  {
    menuTitle: '仪表盘',
    icon: 'Monitor',
    menuIndex: '1',
    isAdmin: false,
    link: '/dashboard',
    show: true,
    type: 1,
    routePath: 'dashboard',
    uri: '/dashboard',
    pageName: 'Dashboard',
    sort: 1
  },
  {
    menuTitle: '系统管理',
    icon: 'Setting',
    menuIndex: '2',
    isAdmin: true,
    link: '/system',
    show: true,
    type: 1,
    routePath: 'system',
    uri: '/system',
    pageName: 'SystemManage',
    sort: 2,
    children: [
      {
        menuTitle: '用户管理',
        icon: 'User',
        menuIndex: '2-1',
        isAdmin: true,
        link: '/system/user',
        show: true,
        type: 1,
        routePath: 'system/user',
        uri: '/system/user',
        pageName: 'UserManage',
        sort: 1,
        children: [
          {
            menuTitle: '用户列表',
            icon: 'List',
            menuIndex: '2-1-1',
            isAdmin: true,
            link: '/system/user/list',
            show: true,
            type: 2,
            routePath: 'system/user/list',
            uri: '/system/user/list',
            pageName: 'UserList',
            sort: 1
          },
          {
            menuTitle: '角色管理',
            icon: 'UserFilled',
            menuIndex: '2-1-2',
            isAdmin: true,
            link: '/system/user/role',
            show: true,
            type: 2,
            routePath: 'system/user/role',
            uri: '/system/user/role',
            pageName: 'RoleManage',
            sort: 2
          }
        ]
      },
      {
        menuTitle: '权限管理',
        icon: 'Lock',
        menuIndex: '2-2',
        isAdmin: true,
        link: '/system/permission',
        show: true,
        type: 1,
        routePath: 'system/permission',
        uri: '/system/permission',
        pageName: 'PermissionManage',
        sort: 2,
        children: [
          {
            menuTitle: '菜单权限',
            icon: 'Menu',
            menuIndex: '2-2-1',
            isAdmin: true,
            link: '/system/permission/menu',
            show: true,
            type: 2,
            routePath: 'system/permission/menu',
            uri: '/system/permission/menu',
            pageName: 'MenuPermission',
            sort: 1
          },
          {
            menuTitle: '接口权限',
            icon: 'Connection',
            menuIndex: '2-2-2',
            isAdmin: true,
            link: '/system/permission/api',
            show: true,
            type: 2,
            routePath: 'system/permission/api',
            uri: '/system/permission/api',
            pageName: 'ApiPermission',
            sort: 2
          }
        ]
      }
    ]
  },
  {
    menuTitle: '内容管理',
    icon: 'Document',
    menuIndex: '3',
    isAdmin: false,
    link: '/content',
    show: true,
    type: 1,
    routePath: 'content',
    uri: '/content',
    pageName: 'ContentManage',
    sort: 3,
    children: [
      {
        menuTitle: '文章管理',
        icon: 'Files',
        menuIndex: '3-1',
        isAdmin: false,
        link: '/content/article',
        show: true,
        type: 1,
        routePath: 'content/article',
        uri: '/content/article',
        pageName: 'ArticleManage',
        sort: 1,
        children: [
          {
            menuTitle: '文章列表',
            icon: 'Document',
            menuIndex: '3-1-1',
            isAdmin: false,
            link: '/content/article/list',
            show: true,
            type: 2,
            routePath: 'content/article/list',
            uri: '/content/article/list',
            pageName: 'ArticleList',
            sort: 1
          },
          {
            menuTitle: '分类管理',
            icon: 'FolderOpened',
            menuIndex: '3-1-2',
            isAdmin: false,
            link: '/content/article/category',
            show: true,
            type: 2,
            routePath: 'content/article/category',
            uri: '/content/article/category',
            pageName: 'CategoryManage',
            sort: 2
          }
        ]
      }
    ]
  }
]
