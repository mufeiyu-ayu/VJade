import { type DataBaseType } from '../base'

/**
 * 菜单类型
 */
export interface MenuType extends DataBaseType {
  /**
   * 权限点
   */
  actionCode: string
  /**
   * 是否为移动端菜单
   */
  appMenu: boolean
  /**
   * 渲染类型
   */
  renderType: string
  /**
   * 菜单外链
   */
  externalink: string | null
  /**
   * 菜单图标
   */
  icon: string
  /**
   * 是否是管理员菜单
   */
  isAdmin: boolean
  /**
   * 是否是平台管理员菜单
   */
  isPlatform: boolean
  /**
   * 外链
   */
  link: string
  /**
   * 菜单编码
   */
  menuCode: string
  /**
   * 菜单名称
   */
  menuName: string
  /**
   * 请求方式
   */
  method: string | null
  /**
   * 设计页面id
   */
  pageId: string | null
  /**
   * 页面名称
   */
  pageName: string | null
  /**
   * 父级菜单主键
   */
  parentId: string | null
  /**
   * 流程业务过程KEY
   */
  procKey: string | null
  /**
   * 路由路径
   */
  routePath: string | 'DataGridView' | 'PivotGridView'
  /**
   * 是否显示菜单
   */
  show: boolean
  /**
   * 菜单排序
   */
  sort: number
  /**
   * 菜单类型
   */
  type: number
  /**
   * 前端文件路径
   */
  uri: string
  /**
   * 模板类型
   */
  viewClass: boolean
  /**
   * 子菜单
   */
  children?: Array<MenuType>
  /**
   * 菜单JSON配置
   */
  viewOption: string | ViewOptionType | null
}

/**
 * 菜单配置类型
 */
export interface ViewOptionType {
  /**
   * vo名称
   */
  voName: string
  /**
   * 主键字段
   */
  primaryKey?: string
  /**
   * 请求地址前缀，vo和业务名称不相同时需要
   */
  uri?: string
  /**
   * 服务名
   */
  service?: string
  /**
   * 查询栏配置
   */
  queryBar?: QueryBarConfigType
  /**
   * 操作栏配置
   */
  actionBar?: ActionBarConfigType
  /**
   * 表单配置
   */
  formView?: FormViewConfigType
  /**
   * 表格配置
   */
  dataGrid?: DataGridConfigType
  /**
   * 透视图配置
   */
  // pivotGrid?: DataGridConfigType
}

/**
 * 栏的基础配置参数
 */
export interface BarBaseConfigType {
  /**
   * 是否显示
   */
  visible: boolean
  /**
   * 参数
   */
  props: Record<string, any>
}

/**
 * 查询栏配置
 */
export interface QueryBarConfigType extends BarBaseConfigType {}

/**
 * 操作栏配置
 */
export interface ActionBarConfigType extends BarBaseConfigType {}

/**
 * 表单配置
 */
export interface FormViewConfigType extends BarBaseConfigType {}

/**
 * 表格配置
 */
export interface DataGridConfigType extends BarBaseConfigType {}
