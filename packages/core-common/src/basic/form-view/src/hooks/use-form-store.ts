import { reactive } from 'vue'
import type { FormViewStoreType } from '../types/typing.ts'

/* @description 管理表单状态 */
export const state = reactive<FormViewStoreType>({
  formItemsConfig: [],
  disabled: false,
  /* @description 全屏 */
  isfullScreen: false
})

export const actions = {}

export const useFormStore = () => {
  return {
    state,
    actions
  }
}
