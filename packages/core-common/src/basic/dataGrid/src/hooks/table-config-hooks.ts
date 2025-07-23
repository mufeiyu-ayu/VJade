import type { VxeColumnProps, VxeTableProps } from 'vxe-table'
import type { TableProps } from '../types/table'
import { computed, ref } from 'vue'

export function useTableConfig(props: TableProps) {
  // const tableConfig = ref<VxeTableProps>()
  // const tableColumns = ref<VxeColumnProps[]>([])

  const oldTableConfig = ref<VxeTableProps>({

    scrollX: { enabled: true },
    // height: '100%',
    autoResize: true,
    maxHeight: '100%',
    size: 'medium',
    border: true,
    align: 'center',
    round: true,
    showFooter: false,
    showOverflow: 'tooltip',
    columnConfig: {
      minWidth: 100,
      resizable: true,
    },
    rowConfig: {
      height: 100,
      isHover: true,
      useKey: true,
      // keyField: 'id', // 指定行数据的唯一标识字段
      resizable: true,
    },
    checkboxConfig: {
      highlight: true, // 高亮选中状态

      // range: true, // 开启复选框范围选择功能，启用后通过鼠标在复选框的列内滑动选中或
    },
  })

  /**
   * 初始化表格配置
   */
  const tableConfig = computed<VxeTableProps>(() => {
    return Object.assign(oldTableConfig.value, props.tableConfig)
  })

  /**
   * 初始化表格列配置
   */
  const tableColumns = computed<VxeColumnProps[]>(() => {
    return props.tableColumns.map((column) => {
      return {
        ...column,
        minWidth: column.minWidth || 60,
        maxWidth: column.maxWidth || 200,
        resizable: column.resizable ?? true,
        showOverflow: column.showOverflow || 'tooltip',
        className: column.className || column.field,
      }
    })
  })
  return {
    tableColumns,
    tableConfig,
  }
}
