import type { VxeTableInstance } from 'vxe-table'
import type { TableProps } from '../types'
import { EventTypeEnum, useEventBus } from '@ayu-mu/hooks'
import { ElLoading, ElMessage } from 'element-plus'
import { computed, getCurrentInstance, nextTick, onMounted, ref, watch } from 'vue'
import { useTableConfig } from './table-config-hooks'

interface TableRow {
  id: string | number

  [key: string]: unknown
}

export function setupTable() {
  const instance = getCurrentInstance()
  const tableContainerRef = ref<HTMLElement>()
  const props = instance?.props as unknown as TableProps
  const selectRowsMap = ref<Record<string, TableRow[]>>({})
  const { emit, on } = useEventBus([
    /**   复选框选中触发 */
    `${props.uid}-${EventTypeEnum.DataGrid_Checkbox_Selected}`,
    /**   单选框选中触发 */
    `${props.uid}-${EventTypeEnum.DataGrid_Radio_Selected}`,
    /**   actionbar 刷新 */
    `${props.uid}-${EventTypeEnum.ActionBar_REFRESH}`,
    /**  queryBar 数据变化 */
    `${props.uid}-${EventTypeEnum.QueryBar_DATA_CHANGE}`,
  ])
  const selectedRows = ref<TableRow[]>([])
  const { tableConfig, tableColumns } = useTableConfig(props)
  const tableRef = ref<VxeTableInstance>()
  const tableData = ref<TableRow[]>([])
  const defaultPageSize = ref<number>(Number(localStorage.getItem('defaultPageSize')) || 10)
  const currentPage = ref<number>(1)
  const total = ref<number>()
  /*   是否显示操作列 */
  const showOperation = computed(() => props.showOperation)
  const queryBarParams = ref<Record<string, unknown>>()

  /**  接口返回值 */
  const listResult = ref<unknown>()
  /**
   * 清空所有选中状态
   */
  const clearSelection = () => {
    if (tableRef.value) {
      tableRef.value.clearCheckboxRow()
    }
  }

  /**  获取列表数据 */
  async function handleGetData() {
    const loading = ElLoading.service({
      fullscreen: false,
      text: '加载中',
      target: tableContainerRef.value,
      background: 'rgba(255, 255, 255, 0.6)',
      lock: true,
    })
    try {
      const { code, data } = await props.getTableData({
        pageNum: currentPage.value,
        pageSize: defaultPageSize.value,
        ...props?.queryCondition || null,
        ...queryBarParams.value,
      })

      if (code !== 0) {
        return
      }
      if (!data.record.length) {
        ElMessage.warning('未查询到数据')
        return
      }
      listResult.value = data.record
      tableData.value = data.record
      total.value = data.total
      // 恢复选中状态
      const selectRows = selectRowsMap.value[currentPage.value]
      if (selectRows?.length > 0) {
        nextTick(() => {
          // 通过唯一标识符（比如 id）来匹配行
          selectRows.forEach((selectedRow: TableRow) => {
            const matchedRow = tableData.value.find((row: TableRow) => row[props.uniqueKey!] === selectedRow[props.uniqueKey!])
            if (matchedRow) {
              tableRef.value?.setCheckboxRow(matchedRow, true)
            }
          })
        })
      }
    }
    catch (error) {
      console.error('获取数据失败：', error)
    }
    finally {
      loading.close()
    }
  }

  /**  监听选中行 */
  const handleSelectionChange = () => {
    const page = currentPage.value
    const checkedRows = tableRef.value?.getCheckboxRecords(true) || []
    selectRowsMap.value[page] = checkedRows
    selectedRows.value = Object.values(selectRowsMap.value).flat()
  }
  watch(
    [
      () => currentPage.value,
      () => defaultPageSize.value,
      () => props.queryCondition,
    ],
    async ([_, pageSize, __]) => {
      localStorage.setItem('defaultPageSize', pageSize.toString())
      await handleGetData()
    },
    // { immediate: true }, // 首次加载时执行一次
  )

  /**  监听选中行 */
  watch(selectedRows, (newVal) => {
    emit(EventTypeEnum.DataGrid_Checkbox_Selected, ...newVal)
  })

  const handleRadioChange = ({ row }: { row: Record<string, unknown> }) => {
    emit(`${props.uid}-${EventTypeEnum.DataGrid_Radio_Selected}`, row)
  }

  const initEvent = () => {
    // querybar 数据变化
    on(`${props.uid}-${EventTypeEnum.QueryBar_DATA_CHANGE}`, (args) => {
      const [value] = args as [Record<string, unknown>]
      queryBarParams.value = value
    })
    // 刷新
    on(`${props.uid}-${EventTypeEnum.ActionBar_REFRESH}`, () => {
      currentPage.value = 1
      handleGetData()
    })

    // querybar 搜索
    on(`${props.uid}-${EventTypeEnum.QueryBar_SEARCH}`, (args) => {
      const [value] = args as [Record<string, unknown>]
      console.log(value, 'params 查询参数')
      handleGetData()
    })
    // querybar 重置
    on(`${props.uid}-${EventTypeEnum.QueryBar_RESET}`, () => {
      handleGetData()
    })
  }
  onMounted(async () => {
    await handleGetData()
    initEvent()
    // 确保在组件完全挂载后执行
    await nextTick() // 再等一次，确保 DOM 完全更新
    tableRef.value?.recalculate(true)
  })

  return {
    tableConfig,
    tableColumns,
    showOperation,
    defaultPageSize,
    tableRef,
    currentPage,
    selectedRows,
    total,
    tableData,
    tableContainerRef,
    handleSelectionChange,
    handleGetData,
    clearSelection,
    listResult,
    handleRadioChange,
  }
}
