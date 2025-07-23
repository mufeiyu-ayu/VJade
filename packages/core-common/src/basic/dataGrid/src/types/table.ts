import type { CommonResultType } from '@ayu-mu/model'
import type { JSX } from 'vue/jsx-runtime'
import type { VxeColumnProps, VxeTableInstance, VxeTableProps } from 'vxe-table'
import type { Render } from './types'

export interface CustomVxeColumnProps extends Omit<VxeColumnProps, 'slots'> {
  render?: (params: {
    row: unknown
    column: CustomVxeColumnProps
    $index: number
  }) => JSX.Element | string | number
}

interface TableRecord {
  id: string | number

  [key: string]: unknown
}
export interface TableResponse {
  record: TableRecord[]
  total: number
  pageNum: number
  pageSize: number
}
export interface TableProps<T = object> {
  uid: string
  /**  表格配置 */
  tableConfig?: VxeTableProps
  /**  每条数据唯一标识 */
  uniqueKey?: string
  /** 表格数据 */
  tableColumns: (VxeColumnProps & {
    render?: Render<T>
  })[]
  /*   请求 */
  getTableData: (params: unknown) => Promise<CommonResultType<TableResponse>>
  /*  查询条件 */
  queryCondition?: Record<string, unknown>
  /**  是否显示操作列 */
  showOperation?: boolean
  /**  操作列配置 */
  operationConfig?: {
    /**  操作列配置 */
    columnConfig?: VxeColumnProps
    /**  操作列渲染 */
    render?: Render<T>
    /**   是否显示删除 */
    hideDelete?: boolean
    /**  删除操作 */
    deleteHandle?: (row: T) => void

  }
  /**  是否隐藏复选框 */
  hideCheckbox?: boolean
  /**   是否隐藏单选框 */
  hideRadio?: boolean
  /**  是否隐藏序号 */
  hideSeq?: boolean
}

export interface TableExposeInstance<T = unknown> {
  /**  表格实例 */
  tableRef: VxeTableInstance
  /**  获取表格数据 */
  handleGetData: () => Promise<void>
  /**  选中行 */
  selectedRows: T[]
  /**  接口返回值 */
  listResult: unknown
}
