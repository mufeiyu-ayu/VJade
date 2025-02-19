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

    const userStore = useUserStore()
    console.log(userStore, 'userStore')
    const isLogin = webStorage.getStorageFromKey('isLogin')

    if (isLogin) {
      console.log(to, 'to---------------')
      // 如果已登录，访问登录页则重定向到首页，并终止执行
      if (to.name === RouteNameEnum.LOGIN) {
        // 如果已登录，访问登录页则重定向到首页，并终止执行
        return next({ name: RouteNameEnum.LAYOUT })
      } else {
        // const hasRoute = router.hasRoute(to.name)
        console.log(userStore.userMenu, 'userStore.userMenu')
        // 当没有菜单表时或者用户刷新网页时

        if (userStore.userMenu && userStore.userMenu.length === 0) {
          alert(11)
          try {
            await userStore.initRouter()
          } catch (error) {
            alert('获取菜单失败')
            return next({ name: RouteNameEnum.LOGIN })
          }

          return next()
          // if (!hasRoute) {
          //   // 如果该路由不存在，可能是动态注册的路由，它还没准备好，需要再重定向一次到该路由
          //   next({ ...to, replace: true })
          // } else {
          //   through(to, next)
          // }
        } else {
          console.log(to, '0000000000000000000000')
          return next()
        }

        // 如果已登录，访问其他页面则正常放行
        return next()
      }
    } else {
      // 如果用户未登录，则只能跳转到白名单
      if (ROUTER_WHITE_LIST.includes(to.name as RouteNameEnum)) {
        return next()
      }
      ElMessage.warning('请先登录')
      return next({ name: RouteNameEnum.LOGIN })
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
