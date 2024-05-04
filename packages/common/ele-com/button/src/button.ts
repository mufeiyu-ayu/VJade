import { useSizeProp } from '@ayu/hooks'
import { buildProps } from 'element-plus/es/utils/vue/props/runtime'
export const buttonTypes = [
  'default',
  'primary',
  'success',
  'chinese',
  'warning',
  'info',
  'danger',
  /**
   * @deprecated
   * Text type will be deprecated in the next major version (3.0.0)
   */
  'text',
  ''
] as const
export const buttonProps = buildProps({
  size: useSizeProp,
  disabled: Boolean,
  /**
   * @description button type
   */
  type: {
    type: String,
    values: buttonTypes,
    default: ''
  },
  icon: {
    type: [String, Object, Function]
  },
  nativeType: {
    type: String,
    values: ['button', 'submit', 'reset'],
    default: 'button'
  },
  loading: Boolean,
  plain: Boolean,
  text: Boolean,
  bg: Boolean,
  round: Boolean,
  /**
   * @description 这是一个按钮样式的文档
   */
  circle: Boolean,
  link: Boolean
} as const)
