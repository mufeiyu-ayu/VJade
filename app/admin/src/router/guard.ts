import { type Router } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import { useUserStore } from '@/stores/modules/user'
import { webStorage } from '@ayu-mu/utils'

import { RouteNameEnum, ROUTER_WHITE_LIST } from '@/router/type'
import { ElMessage } from 'element-plus'
// import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
// const through = (to: RouteLocationNormalized, next: NavigationGuardNext) => {
//   // console.log(to, 'to')
//   // 如果当前路由是由于重定向而来的，则使用redirectedFrom属性提供的原
//   if (to.redirectedFrom) {
//     next(to.redirectedFrom.fullPath)
//     return
//   }
//   // 如果查询参数中包含redirect字段，则使用该字段的值进行导航。
//   if (to.query.redirect) {
//     next(to.query.redirect as string)
//     return
//   }
//   // 如果以上条件都不满足，则继续正常的路由导航。
//   next()
// }
/**
 * 创建权限守卫
 * @param router 路由
 */
export const createPermissionGuard = (router: Router) => {
  //前置路由守卫
  router.beforeEach(async (to, from, next) => {
    NProgress.start() // 开启进度条
    const { userMenu, initRouter } = useUserStore()

    const isLogin = webStorage.getStorageFromKey('isLogin')

    if (isLogin) {
      // 如果已登录，访问登录页则重定向到首页，并终止执行
      if (to.name === RouteNameEnum.LOGIN) {
        // 如果已登录，访问登录页则重定向到首页，并终止执行
        return next({ name: RouteNameEnum.LAYOUT })
      } else {
        // const hasRoute = router.hasRoute(to.name)

        // 当没有菜单表时或者用户刷新网页时

        if (userMenu && userMenu.length === 0) {
          try {
            await initRouter()
          } catch (error) {
            alert('获取菜单失败')

            return next({ name: RouteNameEnum.LOGIN })
          }

          return next()
        }

        if (userMenu.length > 0 && router.getRoutes.length < 10) {
          await initRouter()

          console.log(to, 'to')
          return next()
        }
        ElMessage.error('走着了')

        return next()

        // // 如果已登录，访问其他页面则正常放行
        // return next()
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
