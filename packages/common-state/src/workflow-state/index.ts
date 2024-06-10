import { defineStore } from 'pinia'
import { ref } from 'vue'

type NodeType = 'start' | 'approval' | 'cc' | 'exclusive' | 'timer' | 'notify' | 'condition' | 'end'

interface FlowNode {
  id: string
  pid?: string
  name: string
  type: NodeType
  child?: FlowNode
}

export const workflowStore = defineStore('workflow', () => {
  const processState = ref<FlowNode | any>({})
  const handleSetProcess = (state: any) => {
    processState.value = state
  }
  return {
    processState,
    handleSetProcess
  }
})
