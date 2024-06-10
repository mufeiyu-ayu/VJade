import { computed, inject, ref, watchEffect, type Ref } from 'vue'

import type { Field, ApprovalNode, ErrorInfo } from '../../types'

interface InjectionProps {
  fields: Ref<Field[]>
  nodesError: Ref<Record<string, ErrorInfo[]>>
}

export const approvalNodeActionHooks = (props: any) => {
  const { fields, nodesError } = inject<InjectionProps>('flowDesign', {
    fields: ref([]),
    nodesError: ref({})
  })

  // 定义计算属性以处理内容
  const content = computed(() => getContentBasedOnAssigneeType(props.node))

  // 错误检测逻辑
  const hasErrors = computed(() => {
    const errors = detectErrors(props)
    return errors.length ? errors : null
  })

  const getContentBasedOnAssigneeType = (node: ApprovalNode): string => {
    const { assigneeType, users, roles, choice, leader, orgLeader, formUser, formRole } = node

    switch (assigneeType) {
      case 'user':
        return users.map((user: any) => user.name).join('、') || '未指定人员'
      case 'choice':
        return `发起人自选（${choice ? '多选' : '单选'}）`
      case 'self':
        return '发起人自己'
      case 'leader':
        return leader === 1 ? '直属上级' : `${leader}级上级`
      case 'orgLeader':
        return orgLeader === 1 ? '直属主管' : `${orgLeader}级主管`
      case 'formUser':
        return `表单内（${getFieldTitle(formUser)}）人员`
      case 'formRole':
        return `表单内（${getFieldTitle(formRole)}）角色`
      case 'role':
        return roles.map((item: any) => item.name).join('、') || '未指定角色'
      case 'autoRefuse':
        return '系统自动拒绝'
      default:
        return '未知错误'
    }
  }

  const getFieldTitle = (fieldId: string | undefined): string => {
    return fieldId ? fields.value.find((e) => e.id === fieldId)?.label || fieldId || '?' : '?'
  }

  const detectErrors = (node: ApprovalNode): ErrorInfo[] => {
    const { id, name } = node
    const errors: ErrorInfo[] = []

    switch (node.assigneeType) {
      case 'user':
        if (!node.users.length) errors.push({ id, name, message: '未指定人员' })
        break
      case 'formUser':
        if (!node.formUser) errors.push({ id, name, message: '未指定表单内人员' })
        break
      case 'formRole':
        if (!node.formRole) errors.push({ id, name, message: '未指定表单内角色' })
        break
      case 'role':
        if (!node.roles.length) errors.push({ id, name, message: '未指定角色' })
        break
      case 'nobody':
        if (node.nobody === 'assign' && (!node.nobodyUsers || !node.nobodyUsers.length)) {
          errors.push({ id, name, message: '未指定审批人为空时的处理人' })
        }
        break
    }

    return errors
  }

  watchEffect(() => {
    if (hasErrors.value) {
      nodesError.value[props.node.id] = hasErrors.value
    } else {
      delete nodesError.value[props.node.id]
    }
  })
  return {
    content
  }
}
