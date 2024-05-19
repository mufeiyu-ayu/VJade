export interface IconProps {
  /** @description  图标名称 */
  icon?: string
  /** @description  大小 */
  size?: number
  width?: number
  /** @description  高度 */
  height?: number
  /** @description  颜色 */
  color?: string
  /** @description  是否内联 */
  inline?: boolean
  /** @description  旋转方向 */
  flip?: string
  /** @description  旋转角度 */
  rotate?: number
  /** @description  点击事件 */
  onLoad?: () => void
  /** @description  样式 */
}
