import type { PropType } from 'vue'

import type { VxeColumnProps } from 'vxe-table'
import type { CustomVxeColumnProps } from '../types/table.ts'
import { defineComponent } from 'vue'
import { VxeColumn } from 'vxe-table'

export const ColumnItem = defineComponent({
  name: 'ColumnItem',
  props: {
    column: {
      type: Object as PropType<CustomVxeColumnProps>,
      required: true,
    },
  },
  setup(props) {
    // 对于普通列，保持原有的渲染逻辑
    return () => (
      <VxeColumn
        {...(props.column as VxeColumnProps)}
        key={props.column.field}

        v-slots={{
          default: ({ row, rowIndex }: { row: Record<string, unknown>, rowIndex: number }) =>
            props.column.render
              ? props.column.render({ row, column: props.column, $index: rowIndex })
              : row[props.column.field as string],
        }}
      />
    )
  },
})
