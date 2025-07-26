import type { ActionBarProps } from '../types'
import { EventTypeEnum, useEventBus } from '@ayu-mu/hooks'
import { getCurrentInstance, ref } from 'vue'

export function useActionBar() {
  const instance = getCurrentInstance()
  const props = instance?.props as unknown as ActionBarProps
  const selectedRows = ref<unknown[]>([])
  const { on } = useEventBus([
    `${props.uid}-${EventTypeEnum.DataGrid_Checkbox_Selected}`,
  ])

  /**   行选中触发 */
  on(EventTypeEnum.DataGrid_Checkbox_Selected, (...records) => {
    const res = records[0] as unknown[]
    selectedRows.value = res
  })

  /**   批量删除 */
  const handleDeleteAll = async () => {
    await props.handleDeleteAll?.(props.deleteAllParams)
  }
  //
  return {
    selectedRows,
    handleDeleteAll,
  }
}
