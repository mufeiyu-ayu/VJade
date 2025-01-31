import type { FormInstance } from 'element-plus'
import { ref, type Ref } from 'vue'
import type { FormProps, FormGroupConfig } from '../types'

/**
 * 表单操作相关的 hook
 * @param formRef - 表单实例引用
 * @param formData - 表单数据引用
 * @param props - 表单属性
 * @param formGroupConfig - 表单分组配置引用
 */
export function useFormAction(
  formRef: Ref<FormInstance | undefined>,
  formData: Ref<Record<string, any>>,
  props: FormProps,
  formGroupConfig: Ref<FormGroupConfig[]>
) {
  const isExpandSet = ref<string[]>([])

  /**
   * 提交表单
   */
  const submitForm = async () => {
    if (!formRef.value) return
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
    if (!formRef.value) return
    formRef.value.resetFields()
  }

  /**
   * 处理折叠面板变化
   * @param val - 当前展开的面板名称数组
   */
  const handleCollapseChange = (val: string[]) => {
    const groupSetTitle = formGroupConfig.value.map((item) => item.groupTitle)
    isExpandSet.value = groupSetTitle.filter((item) => !val.includes(item))
  }

  return {
    isExpandSet,
    submitForm,
    resetForm,
    handleCollapseChange
  }
}
