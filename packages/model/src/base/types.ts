/**
 * 数据基础类型
 */
export interface DataBaseType {
  /**
   * App标识
   */
  appId: string
  /**
   * 租户代码
   */
  tenantCode: string
  /**
   * 更新
   */
  update: boolean
  /**
   * 版本
   */
  version: number
  /**
   * 主键
   */
  id: string
}

export type Nullable<T = any> = T | null | undefined
export type Recordable<T = unknown> = Record<string, T>
