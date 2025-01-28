// import { lo } from '@ayu-mu/utils'
import type { FormProps } from '../types'

export function useFormUtils() {
  const initFormData = (props: FormProps) => {
    const formData: Record<string, any> = {}
    props.fieldConfig.forEach((field) => {
      formData[field.field] = '' // 初始化每个字段为空字符串
    })
    return formData
  }

  return {
    initFormData
  }
}
