// import { lo } from '@ayu-mu/utils'
import type { FormProps, FormType } from '../types'
import { ElInput } from 'element-plus'

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

  /**
   * 表单组件渲染策略
   * @param type 表单项组件类型
   * @returns  表单组件
   */
  function componentRender(type: FormType) {
    switch (type) {
      case 'input':
        return ElInput
      case 'select':
        return 'el-select'
      default:
        return 'el-input'
    }
  }

  return {
    initFormData,
    componentRender,
  }
}
