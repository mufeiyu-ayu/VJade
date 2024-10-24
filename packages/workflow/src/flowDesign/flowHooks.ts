import type {
  ApprovalNode,
  BranchNode,
  CcNode,
  ConditionNode,
  ErrorInfo,
  ExclusiveNode,
  FilterRules,
  FlowNode,
  NodeType,
  NotifyNode,
  Recordable,
  TimerNode
} from '../types'
import { ref } from 'vue'
import { workflowStore } from '@ayu-mu/common-state'
export const attrHooks = (props: any) => {
  const store = workflowStore()
  const nodesError = ref<Recordable<ErrorInfo[]>>({})

  const nextId = (): string => {
    const id = `node_${Math.random().toString(36).substring(2, 7)}`
    const findId = (node: FlowNode, id: string): boolean => {
      if (node.id === id) {
        return true
      }
      if (node.child) {
        return findId(node.child, id)
      }
      if ('children' in node) {
        const branchNode = node as BranchNode
        if (branchNode.children && branchNode.children.length > 0) {
          return branchNode.children.some((item) => {
            return findId(item, id)
          })
        }
      }
      return false
    }
    if (findId(store.processState, id)) {
      return nextId()
    }
    return id
  }
  const addTimer = (node: FlowNode) => {
    const child = node.child
    const id = nextId()
    node.child = {
      id,
      pid: node.id,
      name: '计时等待',
      type: 'timer',
      child,
      waitType: 'duration',
      unit: 'PT%sS',
      duration: 0,
      timeDate: undefined
    } as TimerNode
    if (child) {
      child.pid = id
    }
  }
  const addApproval = (node: FlowNode) => {
    const child = node.child
    const id = nextId()
    node.child = {
      id,
      pid: node.id,
      type: 'approval',
      name: '审批人',
      child,
      // 属性
      assigneeType: 'user',
      formUser: '',
      formRole: '',
      users: [],
      roles: [],
      leader: 1,
      orgLeader: 1,
      choice: false,
      self: false,
      multi: 'sequential',
      multiPercent: 100,
      nobody: 'pass',
      nobodyUsers: [],
      formProperties: [],
      formOption: [],
      operations: {
        complete: true,
        refuse: true,
        back: true,
        transfer: true,
        delegate: true,
        addMulti: false,
        minusMulti: false
      },
      extendProperty: {},
      assignees: []
    } as ApprovalNode
    if (child) {
      child.pid = id
    }
  }
  const addNode = (type: NodeType, node: FlowNode) => {
    const addMap: Recordable<(node: FlowNode) => void> = {
      exclusive: addExclusive,
      condition: addCondition,
      cc: addCc,
      timer: addTimer,
      notify: addNotify,
      approval: addApproval
    }
    const fun = addMap[type]
    fun && fun(node)
  }
  const addCc = (node: FlowNode) => {
    const child = node.child
    const id = nextId()
    node.child = {
      id,
      pid: node.id,
      type: 'approval',
      name: '抄送人',
      child,
      assigneeType: 'user',
      formUser: '',
      formRole: '',
      users: [],
      roles: [],
      leader: 1,
      orgLeader: 1,
      choice: false,
      self: false,
      formProperties: []
    } as CcNode
    if (child) {
      child.pid = id
    }
  }
  const addCondition = (node: FlowNode) => {
    const exclusive = node as ExclusiveNode
    exclusive.children.splice(exclusive.children.length - 1, 0, {
      id: nextId(),
      pid: exclusive.id,
      type: 'condition',
      def: false,
      name: `条件${exclusive.children.length + 1}`,
      conditions: {
        operator: 'and',
        conditions: [],
        groups: []
      } as FilterRules,
      child: undefined
    })
  }
  const addExclusive = (node: FlowNode) => {
    const child = node.child
    const id = nextId()
    const exclusiveNode = {
      id,
      pid: node.id,
      type: 'exclusive',
      name: '独占网关',
      child,
      children: []
    } as ExclusiveNode
    if (child) {
      child.pid = id
    }
    addCondition(exclusiveNode)
    addCondition(exclusiveNode)
    node.child = exclusiveNode
    if (exclusiveNode.children.length > 0) {
      const condition = exclusiveNode.children[exclusiveNode.children.length - 1] as ConditionNode
      condition.def = true
      condition.name = '默认条件'
    }
  }
  const addNotify = (node: FlowNode) => {
    const child = node.child
    const id = nextId()
    node.child = {
      id,
      pid: node.id,
      name: '消息通知',
      type: 'notify',
      child,
      assigneeType: 'user',
      formUser: '',
      formRole: '',
      users: [],
      roles: [],
      leader: 1,
      orgLeader: 1,
      choice: false,
      self: false,
      types: ['site'],
      subject: '',
      content: ''
    } as NotifyNode
    if (child) {
      child.pid = id
    }
  }

  const delError = (node: FlowNode) => {
    delete nodesError.value[node.id]
    if (node.child) {
      delError(node.child)
    }
    if ('children' in node) {
      const branchNode = node as BranchNode
      if (branchNode.children && branchNode.children.length > 0) {
        branchNode.children.forEach((item) => {
          delError(item)
        })
      }
    }
  }
  const delNodeNext = (next: FlowNode, del: FlowNode) => {
    delete nodesError.value[del.id]
    if (next.id === del.pid) {
      if ('children' in next && next.child?.id !== del.id) {
        const branchNode = next as BranchNode
        const index = branchNode.children.findIndex((item) => item.id === del.id)
        if (index !== -1) {
          if (branchNode.children.length <= 2) {
            delError(branchNode)
            delNode(branchNode)
          } else {
            delError(del)
            branchNode.children.splice(index, 1)
          }
        }
      } else {
        if (del.child && del.child.pid) {
          del.child.pid = next.id
        }
        next.child = del.child
      }
    } else {
      if (next.child) {
        delNodeNext(next.child, del)
      }
      if ('children' in next) {
        const nextBranch = next as BranchNode
        if (nextBranch.children && nextBranch.children.length > 0) {
          nextBranch.children.forEach((item) => {
            delNodeNext(item, del)
          })
        }
      }
    }
  }
  const delNode = (del: FlowNode) => {
    delete nodesError.value[del.id]
    delNodeNext(props.process, del)
  }
  const validate = () => {
    return new Promise((resolve, reject) => {
      const errors = Object.values(nodesError.value).flat()
      if (errors.length > 0) {
        reject(errors)
      } else {
        resolve(true)
      }
    })
  }

  return {
    addNode,
    validate,
    delNode,
    nodesError
  }
}
