import { RouteNameEnum } from '../type'
import RedirectPage from '@/views/system/redurect/index.vue'
import HomeLayout from '@/layout/home.vue'
import HomePage from '@/views/system/home/index.vue'
/**
 * 首页路由信息
 */
export const HOME_ROUTE_INFO = {
  path: '/',
  name: RouteNameEnum.HOME,
  component: HomePage,
  meta: {
    title: '应用首页'
  }
}

/**
 * 重定向路由信息
 */
export const REDIRECT_ROUTE_INFO = {
  path: '/redirect/:path(.*)',
  name: RouteNameEnum.REDIRECT,
  component: RedirectPage,
  meta: {
    title: 'Redirect',
    hideMenu: true
  }
}
/**
 * LAYOUT路由
 */
export const HOME_ROUTE = {
  path: '/',
  name: RouteNameEnum.LAYOUT,
  component: HomeLayout,
  children: [HOME_ROUTE_INFO, REDIRECT_ROUTE_INFO]
}
