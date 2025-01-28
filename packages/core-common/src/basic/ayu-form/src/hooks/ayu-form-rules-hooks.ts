import type { FormProps } from '../types'

export function useFormRules(props: FormProps) {
  const rules: Record<string, any> = {}
  props.fieldConfig.forEach((item) => {
    rules[item.field] = item.rules
  })
  return {
    rules
  }
}
