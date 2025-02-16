import { computed } from 'vue'
import type { FormProps, NormalFormProps, GroupFormProps, FormGroupConfig, GroupFieldConfig } from '../types'
import { ElCollapse, ElTabs, ElCollapseItem, ElTabPane } from 'element-plus'

/**
 * 表单计算属性相关的 hook
 * @param props - 表单属性
 */
export function useFormComputedHooks(props: FormProps) {
  /** 计算表单验证规则 */
  const formRules = computed(() => {
    const rules: Record<string, any> = {}
    props.fieldConfig.forEach((item) => {
      rules[item.field] = item.rules
    })
    return rules
  })
  /** 计算列大小 */
  const colSize = computed(() => {
    if ((props as NormalFormProps).colSize) {
      return (props as NormalFormProps).colSize
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

  /** 计算分组组件类型 */
  const groupComponent = computed(() => {
    if ((props as GroupFormProps).isGroup) {
      switch ((props as GroupFormProps).groupType) {
        case 'collapse':
          return ElCollapse
        case 'tab':
          return ElTabs
        default:
          return 'div'
      }
    }
    return 'div'
  })

  /** 计算分组项组件类型 */
  const groupItemConfig = computed(() => {
    if ((props as GroupFormProps).isGroup) {
      switch ((props as GroupFormProps).groupType) {
        case 'collapse':
          return ElCollapseItem
        case 'tab':
          return ElTabPane
        default:
          return 'div'
      }
    }
    return 'div'
  })

  /** 计算表单分组配置 */
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

  /** 计算所有展开的组名 */
  const allActiveName = computed(() => {
    const activeName: string[] = formGroupConfig.value.map((item) => item.groupTitle)
    switch ((props as GroupFormProps).groupType) {
      case 'tab':
        return activeName[0]
      case 'collapse':
        return (props as GroupFormProps).isExpand ? activeName : []
      default:
        return '3'
    }
  })

  /** 计算tabs的overflowY */
  const tabsOverflowY = computed(() => {
    const bol = props.isGroup && props.groupType === 'tab' && props.maxPaneHeight
    return bol && `overflow-y-auto h-[${props.maxPaneHeight}]`
  })

  return {
    formRules,
    colSize,
    groupComponent,
    groupItemConfig,
    formGroupConfig,
    allActiveName,
    tabsOverflowY
  }
}
