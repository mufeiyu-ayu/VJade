import type { Ref } from 'vue'
import { inject, ref, getCurrentInstance, type ComponentInternalInstance } from 'vue'
import type { PopoverInstance } from 'element-plus'
export const addNodeActionHooks = () => {
  const { emit } = getCurrentInstance() as ComponentInternalInstance
  const { readOnly } = inject<{
    readOnly?: Ref<boolean>
  }>('flowDesign', { readOnly: ref(false) })
  const popoverRef = ref<PopoverInstance>()

  const addApprovalNode = () => {
    emit('addNode', 'approval')
    popoverRef.value?.hide()
  }
  const addCcNode = () => {
    emit('addNode', 'cc')
    popoverRef.value?.hide()
  }
  const addExclusiveNode = () => {
    emit('addNode', 'exclusive')
    popoverRef.value?.hide()
  }
  const addTimerNode = () => {
    emit('addNode', 'timer')
    popoverRef.value?.hide()
  }
  const addNotifyNode = () => {
    emit('addNode', 'notify')
    popoverRef.value?.hide()
  }
  return {
    readOnly,
    popoverRef,
    addApprovalNode,
    addCcNode,
    addExclusiveNode,
    addTimerNode,
    addNotifyNode
  }
}
