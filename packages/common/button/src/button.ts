import type { Component, ComputedRef, Ref } from 'vue'

type ButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'info'
type ButtonSize = 'large' | 'default' | 'small'
type NativeType = 'button' | 'submit' | 'reset'
export interface ButtonProps {
  /** @description button类型 */
  type?: ButtonType
  /** @description button大小 */
  size?: ButtonSize
  /** @description 是否为朴素按钮 */
  plain?: boolean
  /** @description 是否显示文字按钮背景颜色 */
  bg?: boolean
  /** @description 是否为链接按钮 */
  link?: boolean
  /** @description 是否为圆角按钮 */
  round?: boolean
  /** @description 是否为圆形按钮 */
  /** @description 是否使用节流 */
  circle?: boolean
  /** @description 是否为加载中状态 */
  loading?: boolean
  /** @description 加载中图标 */
  loadingIcon?: String | Component
  /** @description 是否为禁用状态 */
  disabled?: boolean
  /** @description 图标 */
  icon?: string | Component
  /** @description 自定义按钮颜色 */
  color?: string
  /** @description 自定义按钮标签 */
  tag?: string | Component
  nativeType?: NativeType
  /** @description 节流时长 */
  throttleDuration?: number
  /** @description  是否节流 */
  useThrottle?: boolean
}

export interface ButtonEmits {
  (e: 'click', value: MouseEvent): void
}

export interface ButtonInstance {
  /** @description button实例 */
  ref: Ref<HTMLButtonElement | void>
  /** @description 是否禁用 */
  disabled: ComputedRef<boolean>
  /** @description 按钮大小 */
  size: ComputedRef<string>
  /** @description 按钮类型 */
  type: ComputedRef<string>
}
