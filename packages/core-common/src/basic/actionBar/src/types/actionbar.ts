import type { JSX } from 'vue/jsx-runtime'

export interface ActionBarProps {
  /**  组件唯一标识符 */
  uid: string
  /**  是否隐藏删除按钮 */
  isHideDelete?: boolean
  /**  是否隐藏右侧按钮 */
  isHideRightButton?: boolean
  /**  删除参数 */
  deleteAllParams?: string
  /**  删除函数 */
  handleDeleteAll?: (...args: unknown[]) => Promise<unknown>
  leftButtons?: (params: unknown) => JSX.Element | string | number
}
