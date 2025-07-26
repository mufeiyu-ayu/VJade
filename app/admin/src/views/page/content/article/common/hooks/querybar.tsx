import type { QueryBarProps } from '@ayu-mu/core-common'
import type { Ref } from 'vue'
import { ref } from 'vue'

export function useQueryBar(uid: string): { queryBarBind: Ref<QueryBarProps> } {
  const queryBarBind = ref<QueryBarProps>({
    uid,
    fieldConfig: [
      {
        field: 'employeeAccount',
        label: '员工账户',
        colSize: 6,
        type: 'input',
      },
    ],
    visible: true,

  })
  return {
    queryBarBind,
  }
}
