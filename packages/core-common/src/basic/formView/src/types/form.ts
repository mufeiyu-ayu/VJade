import type { FormItemRule } from 'element-plus'
import type { ComponentType, FieldType } from './enum'

export interface FormProps {
  /**   表单类型 */
  componentType?: ComponentType
  /**   是否显示 */
  visible?: boolean
  /**   表单标题 */
  title?: string
  /**   表单宽度 */
  width?: number
  /**   表单高度 */
  height?: number
  /**   表单取消按钮文字 */
  cancelText?: string
  /**  确认表单按钮文字 */
  confirmText?: string
  /**   多语言配置 */
  languageList?: Record<string, unknown>[]
  /**   表单项配置 */
  fieldConfig: FieldItemConfig[]
  /**   表单提交回调 */
  onSubmit?: (data: Record<string, unknown>) => void
}

export interface FieldItemConfig {
  /** 字段名 */
  field: string
  /**  表单项类型 */
  type: FieldType
  /**   表单项名称 */
  label: string
  /**   默认值 */
  defaultValue?: string | number | unknown []
  /**   提示音 */
  placeholder: string
  /**   表单验证规则 */
  rules?: FormItemRule[]
  /**   多语言配置 */
  languageList?: Record<string, unknown>[]
  /**   表单项布局宽度 */
  colSize?: number
  /**   自定义属性 */
  custom: Record<string, unknown>
}
