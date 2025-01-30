import { computed } from 'vue'
import type { FormProps, NormalFormProps, GroupFormProps } from '../types'
import { ElCollapse, ElCard } from 'element-plus'
export function useFormComputed(props: FormProps) {
  // 未分组模式
  const colSize = computed(() => {
    if (props.colSize) {
      return props.colSize
    }
    switch ((props as NormalFormProps).layout) {
      case 'horizontal':
        return 24 / props.fieldConfig.length
      case 'vertical':
        return 24
      default:
        return 12
    }
  })

  // 分组类型
  const groupComponent = computed(() => {
    if ((props as GroupFormProps).isGroup) {
      switch ((props as GroupFormProps).groupType) {
        case 'collapse':
          return ElCollapse
        case 'card':
          return ElCard
        default:
          return 'div'
      }
    }
    return 'div'
  })

  const formGroupConfig = computed(() => {
    let groupListConfig: Record<string, any>[] = []
    const arr: string[] = []
    props.fieldConfig.forEach((item) => {
      if (item.group) {
        arr.push(item.group)
      }
    })
    if (arr.length > 0) {
      groupListConfig = [...new Set(arr)].map((item) => {
        return {
          groupTitle: item,
          fieldConfig: props.fieldConfig.filter((field) => field.group === item)
        }
      })
    } else {
      groupListConfig = [
        {
          groupTitle: null,
          fieldConfig: props.fieldConfig
        }
      ]
    }
    console.log(groupListConfig, 'groupListConfig')
    return groupListConfig
  })

  return {
    colSize,
    groupComponent,
    formGroupConfig
  }
}
