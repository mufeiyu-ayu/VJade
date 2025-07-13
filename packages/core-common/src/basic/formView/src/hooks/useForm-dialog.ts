import type { FormDialogProps } from '../components/FormDialog.vue'
import { getCurrentInstance } from 'vue'

export function useFormDialog() {
  const instance = getCurrentInstance()
  const props = instance?.props as unknown as FormDialogProps

  /**
   * 提交表单
   */
  const handleSubmit = () => {
    const formRef = props.formContentRef.value?.formRef
    formRef?.validate((valid) => {
      const formData = props.formContentRef.value?.getFormData()
      if (valid) {
        props?.onSubmit?.(formData || {})
      }
    })
  }

  return {
    handleSubmit,
  }
}
