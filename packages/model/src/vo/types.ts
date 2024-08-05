import type { QueryParameter } from '../http'
import type { DataBaseType } from '../base'
import { EditTypeEnums } from './enums'

/**
 * VO元数据
 */
export interface VoType {
  /**
   * 中文名
   */
  alias: string
  /**
   * 类名
   */
  className: string
  /**
   * 数据库ID
   */
  databaseId: string | null
  /**
   * VO代码
   */
  entityName: string
  /**
   * 字段配置
   */
  fields: ViewColumnType[]
  /**
   * 配置类型
   */
  metadataType: string
  /**
   * 功能及其它配置
   */
  option: string
  /**
   * VO包名
   */
  packageName: string
  /**
   * 父级主键
   */
  parentId: string | null
  /**
   * 主键
   */
  primaryKeys: string
  /**
   * 提供外部服务
   */
  provided: string | null
  /**
   *数据库查询SQL
   */
  query: string
  /**
   * 服务名
   */
  service: string
  /**
   * 数据库表名
   */
  tableName: string
  /**
   * 查询类型
   */
  type: string
}

/**
 * VO列定义
 */
export interface ViewColumnType extends DataBaseType {
  /**
   * 元数据ID
   */
  metadata: string
  /**
   * 列字段
   */
  field: string
  /**
   * 实体属性
   */
  property: string
  /**
   * 列名称
   */
  label: string
  /**
   * 列格式
   */
  format: FormatType
  /**
   * 是否作为查询字段
   */
  queryVisible: boolean
  /**
   * 数据长度
   */
  length: number
  /**
   * 数据精度
   */
  scale: string
  /**
   * 编辑视图是否显示
   */
  editVisible: boolean
  /**
   * 是否只读
   */
  readonly: boolean
  /**
   * 编辑类型
   */
  editType: EditTypeEnums
  /**
   * 是否展示该列
   */
  searchVisible: boolean
  /**
   * 查询数据
   */
  searchValue: string
  /**
   * 编辑选项
   */
  editOption: EditOptionType
  /**
   * 主子表关系表达式
   */
  refs: string
  /**
   * 是否更新
   */
  canUpdate: boolean
  /**
   * 排列顺序
   */
  sort: number
  /**
   * 列宽度
   */
  columnWidth: number
  /**
   * 列顺序号
   */
  index: number
  /**
   * 检验规则
   */
  validation: string
  /**
   * 是否内定字段
   */
  designated: string
  /**
   * 删除标记
   */
  deleted: string
  /**
   * 是否必填
   */
  required: string
}

/**
 * 租户配置
 */
export interface TenantConfigType {
  code?: string
  name?: string
  mobile?: string
  algorithm?: string
  apiKey?: string
  apiSecret?: string
  interfaces?: string
  fieldIsolation?: string
  vos?: Record<string, string>
}

/**
 * 格式化类型
 */
export interface FormatType {
  /**
   * 格式化组件
   */
  component: string
  /**
   * 选项
   */
  options: Record<string, any>
}

/**
 * 编辑选项
 */
export interface EditOptionType {
  /**
   * 通用配置:显示时的通用配置（在没有配置格式化时有效）
   */
  displayOptions: Record<string, any>
  /**
   * edit:edit绑定的通用配置
   */
  editOptions: {
    // form-item绑定属性
    column?: Record<string, any>
    // 组件绑定属性
    component?: Record<string, any>
  }
  /**
   * data-grid:column上绑定的通用配置
   */
  dataGridOptions: {
    // vxe-column绑定属性
    column?: Record<string, any>
    // 组件绑定属性
    component?: Record<string, any>
  }
  /**
   * query-bar:column上绑定的通用配置
   */
  queryBarOptions: {
    // form-item绑定属性
    column?: Record<string, any>
    // 组件绑定属性
    component?: Record<string, any>
  }
  /**
   * 通用配置:自定义配置
   */
  customs: EditOptionCustomType
}

/**
 * 编辑选项配置
 */
export type EditOptionCustomType =
  | EnumOptionType
  | BoolOptionType
  | DictOptionType
  | DateOptionType
  | TreeOptionType
  | LookupOptionType
  | DetailsOptionType
  | Record<string, any>
  | null

/**
 * 公用配置
 */
export interface CommonOptionType {}
/**
 * 枚举配置
 */
export interface EnumOptionType extends CommonOptionType {
  values: { value: any; label: string }[]
}

/**
 * 布尔配置
 */
export interface BoolOptionType extends CommonOptionType {
  true: string
  false: string
}

/**
 * 字典配置
 */
export interface DictOptionType extends CommonOptionType {}

/**
 * 日期时间配置
 */
export interface DateOptionType extends CommonOptionType {
  /**
   * 格式化类型
   */
  displayFormat: 'YYYY-MM-DD' | 'YYYY-MM-DD HH:mm:ss' | string
}

/**
 * 下拉树配置
 */
export interface TreeOptionType extends CommonOptionType {
  /**
   * vo名称
   */
  voName: string
  /**
   * 选中后的值
   */
  value: string
  /**
   * 下拉时展示的字段
   */
  label: string
  /**
   * 关系映射
   * map:{
   *   name : username ,
   *   age : age2
   * }
   * 将username赋值给name
   */
  map?: Record<string, string>
  /**
   * 根节点值
   */
  root: string | number
  /**
   * 当前节点字段
   */
  currentNodeKey: string
  /**
   * 根节点字段
   */
  parentKey: string
  /**
   * vo请求前缀地址
   */
  pathPrefix: string
}

/**
 * 查找带回配置
 */
export interface LookupOptionType extends CommonOptionType {
  /**
   * vo名称
   */
  voName: string
  /**
   * 需要展示的列
   */
  columns: string[]
  /**
   * 关系映射
   */
  map?: Record<string, string>
  /**
   * 查询条件
   */
  reqData: QueryParameter
  /**
   * vo请求前缀地址
   */
  pathPrefix: string
}

/**
 * 主子表配置
 */
export interface DetailsOptionType extends CommonOptionType {
  /**
   * 子表voName
   */
  voName: string
  /**
   * 自定义SQL语句
   */
  sqlQuery: boolean
}
