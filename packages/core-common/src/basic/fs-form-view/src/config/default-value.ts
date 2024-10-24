import { EditTypeEnums } from '@ayu-mu/model'

// 表单默认策略
export const defaultValueStrategies: Record<string, unknown> = {
  [EditTypeEnums.JSON]: '',
  [EditTypeEnums.STRING]: '',
  [EditTypeEnums.TEXT_AREA]: '',
  [EditTypeEnums.EDITOR]: '',
  [EditTypeEnums.ENUM]: '',
  [EditTypeEnums.BOOL]: false,
  [EditTypeEnums.OBJECT]: {}
}

/**
 * 字段显隐规则处理
 * @param property 字段名称
 * @param defaultValue 字段对应对值
 * @param state
 * @param formStore
 * @param showRules
 */
export const handleFileRule = (
  property: string,
  defaultValue: any,
  state: any,
  formStore: any,
  showRules: any,
  formRules: any,
  generateValidationRules: any
) => {
  // 获取当前字段规则
  const rule = showRules.find((_item: any) => _item.field === property)

  if (rule) {
    const rules = rule?.rule?.find((_item: any) => _item.value === defaultValue)
    // 注入字段显影规则
    if (rules?.value !== undefined && rules?.value === defaultValue) {
      const formItem: any = []
      formStore.state.formItemsConfig.forEach((_item: any) => {
        const rul = rules.find((i: any) => i.field === _item.property)
        if (rul) formItem.push({ ..._item, required: rul.required })
      })
      state.formItemsConfig = formItem
      // 生成验证规则
      formRules.value = generateValidationRules(state.formItemsConfig)
    } else if (Object.prototype.toString.call(defaultValue) !== '[object Event]') {
      state.formItemsConfig = formStore.state.formItemsConfig
    }
  }
}
