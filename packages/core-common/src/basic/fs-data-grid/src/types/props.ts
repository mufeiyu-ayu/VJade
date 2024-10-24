import type { ButtonProps, PaginationProps, TableColumnCtx } from 'element-plus'
import { QueryAttribute, QueryCondition, SortParameter, SummaryParameter, ViewColumnType } from '@ayu/model'
import { type VxeTableProps } from 'vxe-table'

/**
 * 表格插槽配置
 */
export interface TableSlotConfig {
  /**
   * 主表插槽列表
   */
  slotList?: Array<string>
  /**
   * 子表插槽列表
   */
  slotListChild?: Record<string, Array<string>>
}

/**
 * 数据操作配置项
 */
export interface DataManipulationConfig {
  /**
   * 是否查询列表数据
   */
  notHandleListData?: boolean
  /**
   * 初始化时是否查询列表数据
   */
  notHandleInitListData?: boolean
  /**
   * 打印字段
   */
  exportField?: string[]
  /**
   * 表格数据转换
   */
  tableDataKey?: Array<string>
  /**
   * 查询条件
   */
  queryCondition?: QueryCondition[]
  /**
   * 合计条件
   */
  summaryParameters?: SummaryParameter[]
  /**
   * 合计条件计算
   */
  summaryParametersComputed?: any[]
  /**
   * 合计数据回调处理
   */
  summaryCallBackCollects?: any
  /**
   * 排序条件
   */
  querySort?: SortParameter[]
  /**
   * 导出配置
   */
  exportConfig?: any
  /**
   * 默认sql类型查询条件
   */
  queryAttributes?: QueryAttribute[]
}

/**
 * 界面配置项
 */
export interface InterfaceConfig {
  /**
   * select显示字段
   */
  selectShowField?: Array<string>
  /**
   * 表格配置
   */
  tableConfig?: VxeTableProps
  /**
   * 表格静态排序
   */
  tableStaticSort?: boolean
  /**
   * 表格布局
   */
  layoutConfig?: LayoutConfig
  /**
   * radio配置
   */
  radioConfig?: any
  /**
   * 是否编辑表格
   */
  isEdit?: boolean
  /**
   * 高度
   */
  height?: string
  /**
   * 原生 默认选中keys
   */
  // checkRowKeys?: Array<string>
  /**
   * queryBar是否显示
   */
  queryBarIsShow?: boolean
  /**
   * 自定义列字段显示
   */
  columnList?: Array<ViewColumnType>
}

/**
 * 事件回调配置
 */
export interface EventsConfig {
  selectChange?: (records: any) => null
}

/**
 * 子表配置
 */
export interface ChildTableConfig {
  /**
   * 是否开启子表
   */
  enable: boolean
  /**
   * 子表父vo名称
   */
  masterVoName?: string
  /**
   * 子表单条字段记录
   */
  childItem?: Record<string, any>
  /**
   * 是否展示子表
   */
  isShowSubTable?: boolean
  /**
   * 是否是表单子表  表单子表和普通子表的高度 Eventbus不一样
   */
  isFormChildTable?: boolean
}

/**
 * pagination v-bind
 */
export interface PaginationConfig extends PaginationProps {}

/**
 * option v-bind
 */
export interface ActionButtons {
  /**
   * 查看
   */
  view?: ButtonProps
  /**
   * 编辑
   */
  edit?: ButtonProps
  /**
   * 删除
   */
  remove?: ButtonProps
  /**
   * 查看子表
   */
  viewSubTable?: ButtonProps
}

/**
 * options v-bind
 */
export interface ActionsConfig {
  /**
   * 操作按钮
   */
  actionButtons?: ActionButtons
  /**
   * 操作行配置
   */
  actionColumn?: TableColumnCtx<any>
  /**
   * 选择行配置
   */
  selectionColumn?: TableColumnCtx<any>
  /**
   * 选择行配置
   */
  indexColumn?: TableColumnCtx<any>
}

/**
 * 布局layout
 */
export interface LayoutConfig {
  /**
   * 显示多选
   */
  showSelection?: boolean
  /**
   * 显示单选
   */
  showIndex?: boolean
  /**
   * 显示操作
   */
  showActions?: boolean
  /**
   * 显示分页
   */
  showPagination?: boolean
  /**
   * 分页配置
   */
  paginationConfig?: PaginationConfig
  /**
   * 选项配置
   */
  actionsConfig?: ActionsConfig
}
