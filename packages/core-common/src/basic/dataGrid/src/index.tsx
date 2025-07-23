import type { PropType } from 'vue'
import type { CustomVxeColumnProps, TableExposeInstance, TableProps } from './types'
import { isMobile } from '@ayu-mu/utils'
import { ElConfigProvider, ElPagination } from 'element-plus'
// @ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import { defineComponent } from 'vue'
import { VxeColumn, VxeTable } from 'vxe-table'
import { OperationColumn } from './components/table-operation'
import { ColumnItem } from './components/table.column'
import { setupTable } from './hooks/table-hooks.ts'
import './styles/index.css'
// 定义要暴露的方法和属性的类型

export default defineComponent({
  name: 'DataGrid',
  props: {
    uid: {
      type: String as PropType<TableProps['uid']>,
      required: true,
    },
    tableConfig: {
      type: Object as PropType<TableProps['tableConfig']>,
    },
    uniqueKey: {
      type: String as PropType<TableProps['uniqueKey']>,
      default: 'id',
    },
    tableColumns: {
      type: Array as PropType<TableProps['tableColumns']>,
      required: true,
    },
    getTableData: {
      type: Function as PropType<TableProps['getTableData']>,
      required: true,
    },
    showOperation: {
      type: Boolean as PropType<TableProps['showOperation']>,
      default: true,

    },
    operationConfig: {
      type: Object as PropType<TableProps['operationConfig']>,
    },
    queryCondition: {
      type: Object as PropType<TableProps['showOperation']>,
    },
    hideCheckbox: {
      type: Boolean as PropType<TableProps['hideCheckbox']>,
      default: true,
    },
    hideRadio: {
      type: Boolean as PropType<TableProps['hideRadio']>,
      default: true,
    },
    hideSeq: {
      type: Boolean as PropType<TableProps['hideSeq']>,
      default: true,
    },
  },
  setup(props: TableProps, { expose }) {
    const {
      tableConfig,
      total,
      selectedRows,
      tableData,
      defaultPageSize,
      tableColumns: columns,
      tableRef,
      tableContainerRef,
      currentPage,
      handleSelectionChange,
      handleGetData,
      showOperation,
      listResult,
      handleRadioChange,
    } = setupTable()

    expose({
      tableRef,
      handleGetData,
      selectedRows,
      listResult,
    } as unknown as TableExposeInstance)

    return () => (
      <div class="w-full h-full flex flex-col">
        <div class="flex-1 min-h-0 overflow-auto" ref={tableContainerRef}>
          <VxeTable
            ref={tableRef}
            {...tableConfig.value}
            data={tableData.value}
            onCheckboxChange={handleSelectionChange}
            onCheckboxAll={handleSelectionChange}
            onRadioChange={handleRadioChange}
            v-slots={{
              empty: () => <span>没有更多数据啦</span>,
            }}
          >
            {!props.hideRadio && <VxeColumn type="radio" width={60} fixed="left" />}
            {!props.hideCheckbox && <VxeColumn type="checkbox" width={60} fixed="left" />}
            {!isMobile() && !props.hideSeq && <VxeColumn type="seq" fixed="left" />}
            {columns.value.map((column: CustomVxeColumnProps, index: number) => (
              <ColumnItem
                column={column}
                key={index}
              />
            ))}
            {/* 操作项 */}
            {showOperation.value && (
              <OperationColumn
                handleGetData={handleGetData}
                operationConfig={props.operationConfig}
              />
            )}
          </VxeTable>
        </div>

        <div class="shrink-0 py-4 px-4 flex justify-end items-center">
          <ElConfigProvider locale={zhCn}>
            <ElPagination
              v-model:currentPage={currentPage.value}
              layout="total, sizes, prev, pager, next,jumper"
              background
              teleported={false}
              total={total.value}
              page-sizes={[10, 20, 30, 40, 50, 60, 100]}
              v-model:page-size={defaultPageSize.value}
              defaultPageSize={defaultPageSize.value}
            />
          </ElConfigProvider>
        </div>
      </div>
    )
  },
})
