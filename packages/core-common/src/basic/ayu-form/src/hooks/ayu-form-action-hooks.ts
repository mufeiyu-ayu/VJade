import type { FormInstance } from 'element-plus'
import type { Ref } from 'vue'
import type { FormGroupConfig, FormProps } from '../types'
import { ref } from 'vue'

interface FormActionHooksParams {
  formRef: Ref<FormInstance | undefined>
  formData: Ref<Record<string, unknown>>
  props: FormProps
  formGroupConfig: Ref<FormGroupConfig[]>
}

/**
 * 表单操作相关的 hook
 * @param params - 表单操作参数
 */
export function useFormActionHooks(params: FormActionHooksParams) {
  const { formRef, formData, props, formGroupConfig } = params
  const collapseIsExpand = ref<string[]>([])

  /**
   * 提交表单
   */
  const submitForm = async () => {
    console.log(formData.value)
    if (!formRef.value)
      return
    await formRef.value.validate((valid: boolean) => {
      if (valid) {
        props.onSubmit?.(formData.value)
      }
    })
  }

  /**
   * 重置表单
   */
  const resetForm = () => {
    if (!formRef.value)
      return
    formRef.value.resetFields()
  }

  /**
   * 处理折叠面板变化
   * @param val - 当前展开的面板名称数组
   */
  const handleCollapseChange = (val: string[]) => {
    if (props.groupType === 'collapse') {
      const groupSetTitle = formGroupConfig.value.map(item => item.groupTitle)
      collapseIsExpand.value = groupSetTitle.filter(item => !val.includes(item))
    }
  }

  return {
    collapseIsExpand,
    submitForm,
    resetForm,
    handleCollapseChange,
  }
}
