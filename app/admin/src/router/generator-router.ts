import type { MenuItem } from '@ayu-mu/model'
import { RouteNameEnum, ResultRoute } from './type'
import { resetRouter } from './index'
import { routes } from './routes'
import { router } from './index'
import Test from '@/views/Test/index.vue'
import type { RouteRecordRaw } from 'vue-router'
import { NOT_FOUND_ROUTE } from './modules/base'
const resolveRouter = (routes: ResultRoute[], parentId: number | null = null) => {
  // 过滤出当前 parentId 的所有路由
  const currentRoutes = routes.filter((route) => route.meta.parentId === parentId)

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

/**
 * 生成路由
 * @param menu 后端返回的路由表
 */
export const generatorRouter = async (menu: MenuItem[]) => {
  const menuList: ResultRoute[] = []
  menu.forEach((item) => {
    menuList.push({
      path: item.link,
      name: item.menuCode,
      component: Test,
      meta: {
        id: item.id,
        parentId: item.parentId,
        icon: item.icon,
        title: item.menuTitle
      }
    })
  })
  const layout = routes.find((item) => item.name === RouteNameEnum.LAYOUT)

  const tree = resolveRouter(menuList) as RouteRecordRaw[]

  layout.children = [...tree, ...layout.children]
  resetRouter()
  router.removeRoute('pathMatch')
  router.addRoute(NOT_FOUND_ROUTE)
  router.addRoute(layout)
}
