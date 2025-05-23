import type { RouteRecordRaw } from 'vue-router'
import ForbiddenPage from '@/views/system/exception/403.vue'
import NotFoundPage from '@/views/system/exception/404.vue'

import LoginPage from '@/views/system/login/index.vue'
import { RouteNameEnum } from '../type'

/**
 * 登录路由
 */
export const LOGIN_ROUTE: RouteRecordRaw = {
  path: '/login',
  name: RouteNameEnum.LOGIN,
  component: LoginPage,
  meta: {
    title: '登录',
  },
}
// 404
export const NOT_FOUND_ROUTE: RouteRecordRaw = {
  path: '/:pathMatch(.*)*',
  name: 'pathMatch',
  redirect: '/exception/404',
  meta: {
    title: '404',
  },
}
/**
 * 异常页路由
 */
export const EXCEPTION_ROUTE: RouteRecordRaw = {
  path: '/exception',
  redirect: '/exception/404',
  meta: {
    title: '异常页',
  },
  children: [
    {
      path: '/exception/404',
      name: RouteNameEnum.NOT_FOUND,
      component: NotFoundPage,
      meta: {
        title: '404',
      },
    },
    {
      path: '/exception/403',
      name: RouteNameEnum.FORBIDDEN,
      component: ForbiddenPage,
      meta: {
        title: '403',
      },
    },
  ],
}
