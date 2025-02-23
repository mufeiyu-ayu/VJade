import { type Router, type RouteRecordNormalized } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import { useUserStore } from '@/stores/modules/user'
import { webStorage } from '@ayu-mu/utils'

import { RouteNameEnum, ROUTER_WHITE_LIST } from '@/router/type'
import { ElMessage } from 'element-plus'

const hasRouteName = (path: string, arr: RouteRecordNormalized[]) => {
  const route = arr.find((item) => item.path === path)
  if (route) {
    return route
  }
  return false
}
/**
 * 创建权限守卫
 * @param router 路由
 */
export const createPermissionGuard = (router: Router) => {
  //前置路由守卫
  router.beforeEach(async (to, from, next) => {
    NProgress.start() // 开启进度条
    const { userMenu, initRouter, routeLen } = useUserStore()

    const isLogin = webStorage.getStorageFromKey('isLogin')

    if (isLogin) {
      // 如果已登录，访问登录页则重定向到首页，并终止执行
      if (to.name === RouteNameEnum.LOGIN) {
        // 如果已登录，访问登录页则重定向到首页，并终止执行
        return next({ name: RouteNameEnum.LAYOUT })
      } else {
        const hasRoute = router.hasRoute(to.name)
        if (userMenu && userMenu.length === 0) {
          try {
            await initRouter()
          } catch (error) {
            return next({ name: RouteNameEnum.LOGIN })
          }

          return next()
        }
        // 主要针对的是在浏览器地址栏输入地址的情况，此时动态添加的路由会消失
        if (userMenu.length > 0 && router.getRoutes().length < routeLen) {
          await initRouter()
          const path = to?.redirectedFrom?.fullPath
          const route = hasRouteName(path, router.getRoutes())
          if (path && route) {
            return next({ ...route, replace: true })
          }
        }
        if (!hasRoute) {
          // 导航到 404
          return next({ name: RouteNameEnum.NOT_FOUND, replace: true })
        }
        return next()
      }
    } else {
      // 如果用户未登录，则只能跳转到白名单
      if (ROUTER_WHITE_LIST.includes(to.name as RouteNameEnum)) {
        return next()
      } else {
        ElMessage.warning('请先登录')
        return next({ name: RouteNameEnum.LOGIN })
      }
    }
  })

  // 后置路由守卫
  router.afterEach(() => {
    // 进度条结束
    NProgress.done()
  })

  // 错误路由守卫
  router.onError((error) => {
    NProgress.start()
    console.log(error, 'error')
  })
}
