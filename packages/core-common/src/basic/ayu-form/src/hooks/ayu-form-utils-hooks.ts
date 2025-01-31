// import { lo } from '@ayu-mu/utils'
import type { FormProps } from '../types'

export function useFormUtils() {
  /**
   * 初始化表单数据
   * @param props - 表单属性
   * @returns 初始化后的表单数据对象
   */
  function initFormData(props: FormProps) {
    const formData: Record<string, any> = {}
    props.fieldConfig.forEach((field) => {
      formData[field.field] = field.defaultValue || '' // 初始化每个字段为空字符串
    })
    return formData
  }

  return {
    initFormData
  }
}
