export interface MenuItem {
  /** 标题 */
  menuTitle: string
  /** 图标*/
  icon: string
  /** 菜单索引 */
  menuIndex: string
  /** 是否为管理员 */
  isAdmin?: boolean
  /** 链接 */
  link: string
  /** 是否显示 */
  show: boolean
  /** 类型 */
  type: number
  /** 路由路径 */
  routePath: string
  /** 路由 */
  uri: string
  /** 子菜单 */
  children?: MenuItem[]
  /** 页面名称 */
  pageName: string | null
  /** 排序 */
  sort: number
}
