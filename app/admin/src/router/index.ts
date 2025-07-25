import type { App } from 'vue'
import type { RouteNameEnum } from './type'
import { createRouter, createWebHistory } from 'vue-router'
import { createPermissionGuard } from './guard'
import { routes } from './routes'
import { ROUTER_WHITE_LIST } from './type'

/**
 * 创建路由器实例
 */
const router = createRouter({
  history: createWebHistory(), // 基于 hash 的路由历史记录。
  routes,
  scrollBehavior: () => ({ top: 0 }), // 定义页面切换时的滚动行为，这里设置为始终回到顶部。
})

/**
 * 启动路由并开启路由守卫
 * @param app
 */
function setupRouter(app: App) {
  app.use(router)
  createPermissionGuard(router)
}

/**
 * 重置路由信息 只保存白名单内的路由
 * 遍历当前路由表，若路由名称存在且不在白名单内，则移除该路由。
 */
export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { name } = route
    if (name && !ROUTER_WHITE_LIST.includes(name as RouteNameEnum)) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}

export { router, setupRouter }
