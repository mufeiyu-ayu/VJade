/**
 * 路由枚举常量
 */
export enum RouteNameEnum {
  /**
   * 首页
   */
  HOME = 'home',
  /**
   * LAYOUT
   */
  LAYOUT = 'layout',
  /**
   * 登录页
   */
  LOGIN = 'login',
  /**
   * 重定向页
   */
  REDIRECT = 'redirect',
  /**
   * 403
   */
  FORBIDDEN = 'forbidden',
  /**
   * 404
   */
  NOT_FOUND = 'notfound',

  /**
   * 子表
   */
  CHILD_TABLE = 'childTable'
}

export interface ResultRoute {
  path: string
  name: string
  component: any
  meta: {
    id: number
    parentId: number
    icon: string
    title: string
  }
  children?: ResultRoute[]
}
/**
 * 路由白名单
 */
export const ROUTER_WHITE_LIST = [
  RouteNameEnum.FORBIDDEN,
  RouteNameEnum.NOT_FOUND,
  RouteNameEnum.REDIRECT,
  RouteNameEnum.LOGIN
]
