import type { MenuItem } from '@ayu-mu/model'
import type { RouteRecordRaw } from 'vue-router'
import type { ResultRoute } from './type'
import { useUserStore } from '@/stores/modules/user'
import NotFound from '@/views/notFound/index.vue'
import { resetRouter, router } from './index'
import { routes } from './routes'
import { RouteNameEnum } from './type'

export function resolveRouter(routes: ResultRoute[], parentId: number | null = null) {
  // 过滤出当前 parentId 的所有路由
  const currentRoutes = routes.filter(route => route.meta.parentId === parentId)

  // 对每个路由项递归构建子路由
  return currentRoutes.map((route) => {
    // 递归找子路由
    const children = resolveRouter(routes, route.meta.id)

    // 如果有子路由，加入 children 属性
    if (children.length > 0) {
      route.children = children
    }

    return route
  })
}

interface PagePath {
  path: string
  value: () => Promise<unknown>
}
/**
 * 生成路由
 * @param menu 后端返回的路由表
 */
export async function generatorRouter(menu: MenuItem[]) {
  const { setRouteLen } = useUserStore()
  const menuList: RouteRecordRaw[] = []
  // 获取 src/page/在所有文件路径以及 vue 文件
  // 转换为数组格式
  const pagePath = import.meta.glob('@/views/page/**/*.vue')

  const pagePathList: PagePath[] = Object.entries(pagePath).map(([path, value]) => ({
    path: path
      .replace('/src/views/page', '') // 移除前缀
      .replace('/index.vue', '') // 移除 /index.vue 后缀
      .replace('.vue', ''), // 移除其他 .vue 后缀
    value: value as () => Promise<unknown>,
  }))
  menu.forEach((item) => {
    const pagePath = pagePathList.find(pageItem => pageItem.path === item.link)
    // 渲染菜单组和菜单组件
    menuList.push({
      path: item.link,
      name: item.menuCode,
      // 当在 page目录下创建页面失败时，会渲染当前组件
      component: pagePath?.value || NotFound,
      meta: {
        id: item.id,
        parentId: item.parentId,
        icon: item.icon,
        title: item.menuTitle,
      },
    })
  })

  const layout = routes.find(item => item.name === RouteNameEnum.LAYOUT)
  layout.children = [...menuList, ...layout.children]
  resetRouter()
  router.addRoute(layout)
  setRouteLen(menuList)
}
