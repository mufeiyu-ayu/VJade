import type { DataBaseType } from '../base'

export interface LoginParamType {
  username: string
  password: string
  grant_type: string
  client_id: string
  client_secret: string
  auth_type: string
  userType: string
  agentId?: string
}

/**
 * Auth类型
 */
export interface AuthType {
  /**
   * 访问token
   */
  access_token: string
  /**
   * 刷新token
   */
  refresh_token: boolean
  /**
   * 作用域
   */
  scope: string | null
  /**
   * token类型
   */
  token_type: string
  /**
   * 用户类型
   */
  user: UserType
}

/**
 * 用户类型
 */
export interface UserType {
  /**
   * 用户ID
   */
  id: number
  /**
   * 代码
   */
  code: string
  /**
   * 邮箱
   */
  email: string
  /**
   * 手机号
   */
  mobile: string
  /**
   * 名称
   */
  name: string
  /**
   * 用户名
   */
  username: string
  /**
   * 外部ID
   */
  externalId: string
  /**
   * 图片
   */
  image: string
  /**
   * 最后登录时间
   */
  lastLoginTime: string
  /**
   * 需要自定义密码
   */
  needModifyPassword: boolean
  /**
   * 组织
   */
  organs?: Array<OrgansType>
  /**
   * 角色
   */
  roles?: Array<RolesType>
  /**
   * 租户
   */
  tenants?: Array<TenantsType>
}

/**
 * 组织类型
 */
export interface OrgansType {
  /**
   * 组织ID
   */
  id: number
  /**
   * 代码
   */
  code: string
  /**
   * main
   */
  main: boolean
  /**
   * 名称
   */
  name: string
}

/**
 * 角色类型
 */
export interface RolesType {
  /**
   * 角色ID
   */
  id: number
  /**
   * 角色代码
   */
  code: string
  /**
   * 角色名称
   */
  name: string
}

/**
 * 租户类型
 */
export interface TenantsType {
  /**
   * 租户ID
   */
  id: number
  /**
   * 租户代码
   */
  code: string
  /**
   * 租户main
   */
  main: boolean
  /**
   * 租户名称
   */
  name: string
}

/**
 * 用户角色类型
 */
export interface UserRoleType extends DataBaseType {
  /**
   * 角色代码
   */
  roleCode: string
  /**
   * 角色名称
   */
  roleName: string
  /**
   * 用户代码
   */
  userCode: string
  /**
   * 用户id
   */
  userId: string
  /**
   * 移动端用户
   */
  userMobile: string | null
  /**
   * 用户名称
   */
  userName: string
}
