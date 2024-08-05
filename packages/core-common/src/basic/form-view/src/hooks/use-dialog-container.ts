import { type ComponentInternalInstance, computed, getCurrentInstance, ref } from 'vue'
import { useEventBus } from '@ayu/hooks'
import { useFormStore } from './use-form-store'
import { FormActionEnum } from '../types/enum'

export const useDialogContainer = () => {
  const { emit } = getCurrentInstance() as ComponentInternalInstance

  /** @description 表单状态  */
  const formStore = useFormStore()

  const EventBus = useEventBus([FormActionEnum.FORM_ACTION_CONFIRM, FormActionEnum.FORM_ACTION_RESET])

  // 批量保存
  const isMultiply = ref(false)

  /** @description 取消点击事件  */
  const cancel = () => {
    emit('close')
  }

  /** @description 确认点击事件  */
  const confirm = () => EventBus.emit(FormActionEnum.FORM_ACTION_CONFIRM, isMultiply.value)

  /** @description 重置按钮点击事件  */
  const clear = () => EventBus.emit(FormActionEnum.FORM_ACTION_RESET)

  /** @description 保存并新增  */
  const saveAndAdd = () => EventBus.emit(FormActionEnum.FORM_ACTION_CONFIRM, true)

  /** @description 表单是否只读  */
  const disabled = computed(() => formStore.state.disabled)

  /**
   * 处理全屏
   * @param type 是否全屏
   */
  const fullScreenHandle = (type: boolean) => {
    formStore.state.isfullScreen = type
  }

  /** @description 取消全屏  */
  const resetComp = () => {
    formStore.state.isfullScreen = false
  }

  return {
    cancel,
    confirm,
    clear,
    isMultiply,
    fullScreenHandle,
    saveAndAdd,
    disabled,
    resetComp,
    store: formStore.state
  }
}
