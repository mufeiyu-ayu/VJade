import type { FieldItemConfig } from '../../../formView'

export interface QueryBarProps {
  /** 唯一标识 */
  uid: string
  /** 是否显示 */
  visible?: boolean
  /** 表单配置 */
  fieldConfig: FieldItemConfig[]

  /** 搜索回调 */
  onSearch?: (values: Record<string, unknown>) => Promise<void> | void
}

export interface QueryBarExposeInstance {
  /**   设置表单值 */
  setFormData: (data: Record<string, unknown>) => void
  /** 表单数据 */
  formData: Record<string, unknown>
  /** 重置 */
  queryReset: () => Promise<void>
}
