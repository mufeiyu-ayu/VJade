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
      const fieldList = props.formContentRef.value?.getFieldConfig().filter(item => item.unVisible).map(item => item.field)
      if (valid) {
        const data = { ...formData }
        fieldList?.forEach((field) => {
          delete data[field]
        })
        props.onSubmit?.(data || {})
      }
    })
  }

  return {
    handleSubmit,
  }
}
