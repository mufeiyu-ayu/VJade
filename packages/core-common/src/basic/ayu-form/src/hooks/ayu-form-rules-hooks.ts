import type { FormProps } from '../types'

/**
 * 表单验证规则相关的 hook
 * @param props - 表单属性
 * @returns 包含验证规则的对象
 */
export function useFormRules(props: FormProps) {
  const rules: Record<string, any> = {}
  props.fieldConfig.forEach((item) => {
    rules[item.field] = item.rules
  })
  return {
    rules,
  }
}
