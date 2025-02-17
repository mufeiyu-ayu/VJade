import { type Router } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import { useUserStore } from '@/stores/modules/user'
import { webStorage } from '@ayu-mu/utils'
import { RouteNameEnum, ROUTER_WHITE_LIST } from '@/router/type'
import { ElMessage } from 'element-plus'
/**
 * 创建权限守卫
 * @param router 路由
 */
export const createPermissionGuard = (router: Router) => {
  //前置路由守卫
  router.beforeEach(async (to, from, next) => {
    NProgress.start() // 开启进度条

    const isLogin = webStorage.getStorageFromKey('isLogin')

    if (isLogin) {
      // 如果已登录，访问登录页则重定向到首页，并终止执行
      if (to.name === RouteNameEnum.LOGIN) {
        // 如果已登录，访问登录页则重定向到首页，并终止执行
        return next({ name: RouteNameEnum.LAYOUT })
      } else {
        const userStore = useUserStore()
        // const hasRoute = router.hasRoute(to.name)
        // 当没有菜单表时
        if (userStore.userMenu && userStore.userMenu.length === 0) {
          return next()
        } else {
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
