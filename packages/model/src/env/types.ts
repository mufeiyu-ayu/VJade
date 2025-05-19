import type { EnvEnum, SystemArchEnum } from './enums'

/**
 * 环境配置文件
 */
export interface EnvConfigType {
  /**
   * 环境
   */
  ENV: EnvEnum
  /**
   * 项目名称
   */
  TITLE: string
  /**
   * 请求路径
   */
  BASE_URL: string
  /**
   * 文件上传路径
   */
  FILE_UPLOAD_URL: string
  /**
   * 应用Id
   */
  APP_ID: string
  /**
   * 租户Id
   */
  TENANT_ID: string
  /**
   * 是否需要权限  1需要  0不需要
   */
  AUTH: string
  /**
   * 端口号
   */
  /**
   * 文件预览地址
   */
  FILE_PREVIEW_URL: string
  POST: number
  GRANT_TYPE: string
  CLIENT_ID: string
  CLIENT_SECRET: string
  AUTH_TYPE: string

  /**
   * 企业微信登录
   */
  // appid
  WECHAT_APPID: string
  // agent_id
  WECHAT_AGENTID: string
  // secret
  WECHAT_SECRET: string
  // redirect_uri
  WECHAT_REDIRECT_URI: string
  // state
  WECHAT_STATE: string

  /**
   * 系统架构
   */
  SYSTEM_ARCH: SystemArchEnum
}

/**
 * 环境配置文件
 */
export interface EnvType {
  /**
   * 环境
   */
  VITE_GLOB_ENV: string
  /**
   * 项目名称
   */
  VITE_GLOB_TITLE: string
  /**
   * 请求路径
   */
  VITE_GLOB_BASE_URL: string
  /**
   * 文件上传路径
   */
  VITE_GLOB_FILE_UPLOAD_URL: string
  /**
   * 应用Id
   */
  VITE_GLOB_APP_ID: string
  /**
   * 租户Id
   */
  VITE_GLOB_TENANT_ID: string
  /**
   * 是否需要权限  1需要  0不需要
   */
  VITE_GLOB_AUTH: string
  /**
   * 端口号
   */
  /**
   * 文件预览地址
   */
  VITE_GLOB_FILE_PREVIEW_URL: string
  VITE_GLOB_POST: number
  VITE_GLOB_GRANT_TYPE: string
  VITE_GLOB_CLIENT_ID: string
  VITE_GLOB_CLIENT_SECRET: string
  VITE_GLOB_AUTH_TYPE: string

  /**
   * 企业微信登录
   */
  // appid
  VITE_GLOB_ENTERPRISE_WECHAT_APPID: string
  // agent_id
  VITE_GLOB_ENTERPRISE_WECHAT_AGENTID: string
  // secret
  VITE_GLOB_ENTERPRISE_WECHAT_SECRET: string
  // redirect_uri
  VITE_GLOB_ENTERPRISE_WECHAT_REDIRECT_URI: string
  // state
  VITE_GLOB_ENTERPRISE_WECHAT_STATE: string

  /**
   * 系统架构
   */
  VITE_GLOB_SYSTEM_ARCH: 'zsingle' | 'micro'
}
