import { type UserType } from '../oauth2'
import { type EnvConfigType } from '../env'
import { type MenuType } from '../menu'
import { type TenantConfigType } from '../vo'

/**
 * 本地存储字段类型
 */
export interface StorageKeyType {
  /**
   * 环境配置
   */
  envConfig: EnvConfigType
  /**
   * keep alive缓存页面
   */
  keepAlivePage: Array<string>
  /**
   * 系统主题设置
   */
  settings: Record<string, any>
  /**
   * 已访问标签页
   */
  visitedTabList: Array<any>
  /**
   * 菜单
   */
  menu: MenuType[]
  /**
   * 用户信息
   */
  userInfo: UserType
  /**
   * token
   */
  token: string
  /**
   * 登录状态
   */
  isLogin: boolean
  /**
   * 租户配置
   */
  tenantConfig: TenantConfigType
  /**
   * 低代码当前设计页面
   */
  lowcodeCurrentPage: Record<string, any>
  /**
   * 低代码当前应用
   */
  app: unknown
}
