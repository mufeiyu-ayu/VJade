import { computed } from 'vue'
import type { FormProps, NormalFormProps, GroupFormProps, FormGroupConfig, GroupFieldConfig } from '../types'
import { ElCollapse, ElCard, ElCollapseItem } from 'element-plus'
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

  // 分组item
  const groupItemConfig = computed(() => {
    if ((props as GroupFormProps).isGroup) {
      switch ((props as GroupFormProps).groupType) {
        case 'collapse':
          return ElCollapseItem
        case 'card':
          return ElCard
        default:
          return 'div'
      }
    }
    return 'div'
  })
  const formGroupConfig = computed<FormGroupConfig[]>(() => {
    let groupListConfig: FormGroupConfig[]
    const arr: string[] = []
    props.fieldConfig.forEach((item) => {
      if (item.group && props.isGroup) {
        arr.push(item.group)
      }
    })
    if (arr.length > 0) {
      groupListConfig = [...new Set(arr)].map((item) => {
        return {
          groupTitle: item,
          fieldConfig: props.fieldConfig.filter((field) => field.group === item) as GroupFieldConfig[]
        }
      })
    } else {
      groupListConfig = [
        {
          groupTitle: null as unknown as string,
          fieldConfig: props.fieldConfig as GroupFieldConfig[]
        }
      ]
    }
    return groupListConfig
  })

  // 所有展开的组名
  const allActiveName = computed(() => {
    return (props as GroupFormProps).isExpand ? formGroupConfig.value.map((item) => item.groupTitle) : []
  })
  return {
    colSize,
    groupComponent,
    groupItemConfig,
    formGroupConfig,
    allActiveName
  }
}
