export type NodeType = 'start' | 'approval' | 'cc' | 'exclusive' | 'timer' | 'notify' | 'condition' | 'end'

export interface Field {
  id: string
  type: 'formItem' | 'container'
  label: string
  name: string
  value: any
  readonly?: boolean
  required?: boolean
  hidden: boolean
  props: any
  children?: Field[]
}

export interface FlowNode {
  id: string
  pid?: string
  name: string
  type: NodeType
  child?: FlowNode
}

export interface BranchNode extends FlowNode {
  children: FlowNode[]
}

export interface Condition {
  // 筛选字段
  field: string | null
  // 条件运算符
  operator: string
  // 筛选值
  value: any | null
}

export interface ConditionNode extends FlowNode {
  def: boolean
  conditions: FilterRules
}

//组织机构负责人
export interface OrgHeadModel {
  //审批人类型:组织负责人(leader)、审批主管(approver)
  approverType?: 'leader' | 'approver'
  /**
   * 查找方式:自上而下(topBottom)
   *        自下而上(bottomTop)
   */
  findType?: string
  /**
   * 基准:发起人(initiator)
   */
  benchmark?: string
  /**
   * 层级
   */
  level?: number
  /**
   * 当发起人为审批人类型时，是否自动顺延
   *
   */
  autoForward?: boolean
}

export interface AssigneeNode extends FlowNode {
  // 审批方式 1-用户 2-角色 3-发起人自选 4-发起人自己 5-主管 6-组织主管 7-表单人员 8-表单角色
  assigneeType:
    | 'user'
    | 'role'
    | 'choice'
    | 'self'
    | 'leader'
    | 'orgLeader'
    | 'formUser'
    | 'formRole'
    | 'autoRefuse'
    | 'nobody'
  // 审批人
  users: string[]
  // 审批角色
  roles: string[]
  // 表单内人员
  formUser: string
  // 表单内角色
  formRole: string
  // 主管
  leader: number
  //岗位
  posts?: string[]
  //职位
  titles?: string[]
  // 组织主管
  orgLeader?: number
  //组织机构负责人
  orgHead?: OrgHeadModel
  // 自选：true-多选，false-单选
  choice: boolean
  // 发起人自己
  self: boolean
  // 审批人：兼容旧版本:废弃
  // assignees: any
  //监听器：兼容旧版本
  listeners?: any
  //其他属性：兼容旧版本
  extendProperty?: any
  //模型名
  entityName?: string
  formOption?: Record<string, any>[]
}

export interface CcNode extends AssigneeNode {
  formProperties: FormProperty[]
}

export interface FormProperty {
  // 字段ID
  id: string
  // 字段名称
  name: string
  // 只读
  readonly: boolean
  // 必填
  required: boolean
  // 隐藏
  hidden: boolean
}

export interface FilterRules {
  operator: 'or' | 'and'
  conditions: Condition[]
  groups: FilterRules[]
}

export interface ExclusiveNode extends BranchNode {
  children: ConditionNode[]
}

export interface ConditionNode extends FlowNode {
  def: boolean
  conditions: FilterRules
}

export interface NotifyNode extends AssigneeNode {
  types: ('site' | 'email' | 'sms' | 'wechat' | 'dingtalk' | 'feishu')[]
  subject: string
  content: string
}

export interface TimerNode extends FlowNode {
  waitType: 'duration' | 'date'
  unit: 'PT%sS' | 'PT%sM' | 'PT%sH' | 'P%sD' | 'P%sW' | 'P%sM'
  duration: number
  timeDate?: string
}

export type Recordable<T = unknown> = Record<string, T>

export interface OperationPermissions {
  // 同意
  complete: boolean
  // 拒绝
  refuse: boolean
  // 回退
  back: boolean
  // 转交
  transfer: boolean
  // 委派
  delegate: boolean
  // 加签
  addMulti: boolean
  // 减签
  minusMulti: boolean
}

export interface ApprovalNode extends AssigneeNode {
  // 多人审批方式
  multi: 'sequential' | 'joint' | 'single'
  // 审批人为空时处理方式：reject-拒绝，pass-通过，admin-管理员，assign-指定人员
  nobody: 'pass' | 'refuse' | 'assign' | 'skip' | 'initiatorLeader' | ''
  // 多人审批通过比例
  multiPercent: number
  // 审批人为空时,指定人员
  nobodyUsers: string[]
  // 表单字段
  formProperties: FormProperty[]
  // 操作权限
  operations: OperationPermissions
}

export interface ErrorInfo {
  id: string
  name: string
  message: string
}

export interface StartNode extends FlowNode {
  formProperties: FormProperty[]
}
