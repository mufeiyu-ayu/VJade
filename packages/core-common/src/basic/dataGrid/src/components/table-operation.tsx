import type { PropType } from 'vue'
import type { VxeColumnProps } from 'vxe-table'
import type { TableProps } from '../types/table'
import { isMobile } from '@ayu-mu/utils'
import { ElButton, ElPopconfirm } from 'element-plus'
import { defineComponent } from 'vue'
import { VxeColumn } from 'vxe-table'
import { useTableOperation } from '../hooks/table-operation-hooks'
/**
 * 渲染操作列
 */
export const OperationColumn = defineComponent({
  name: 'OperationColumn',
  props: {
    operationConfig: {
      type: Object as PropType<TableProps['operationConfig']>,
      required: true,
    },
    handleGetData: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const { handleDelete } = useTableOperation({
      operationConfig: props.operationConfig,
      handleGetData: props.handleGetData as () => void,
    })

    return () => (
      <VxeColumn
        {...props.operationConfig?.columnConfig}
        title={props.operationConfig?.columnConfig?.title || '操作'}
        fixed={props.operationConfig?.columnConfig?.fixed || 'right'}
        minWidth={props.operationConfig?.columnConfig?.minWidth || (isMobile() ? 120 : 200)}
        v-slots={{
          default: ({ row, rowIndex }: { row: Record<string, unknown>, rowIndex: number }) => (
            <div
              class={`
              flex items-center gap-2
              ${isMobile() ? 'overflow-x-auto overflow-y-hidden scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 pb-2' : 'justify-center'}
            `}
            >
              <div
                class={`
                flex items-center gap-2
                ${isMobile() ? 'px-1' : ''}
              `}
              >
                {props.operationConfig?.render?.({
                  row,
                  column: props.operationConfig?.columnConfig as VxeColumnProps,
                  $index: rowIndex,
                })}
                {!props.operationConfig?.hideDelete && (
                  <ElPopconfirm
                    title="确定删除吗?"
                    onConfirm={() => handleDelete(row)}
                    v-slots={{
                      reference: () => (
                        <ElButton
                          type="danger"
                          size="small"
                          class={isMobile() ? 'flex-shrink-0' : ''}
                        >
                          删除
                        </ElButton>
                      ),
                    }}
                  />
                )}
              </div>
            </div>
          ),
        }}
      />
    )
  },
})
