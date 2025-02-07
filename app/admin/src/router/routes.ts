import type { RouteRecordRaw } from 'vue-router'
import { HOME_ROUTE } from './modules/home'

import { EXCEPTION_ROUTE, LOGIN_ROUTE, NOT_FOUND_ROUTE } from './modules/base'

// 路由信息
export const routes: Readonly<RouteRecordRaw[]> = [HOME_ROUTE, LOGIN_ROUTE, NOT_FOUND_ROUTE, EXCEPTION_ROUTE]
