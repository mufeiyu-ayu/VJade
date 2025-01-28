import type { FormInstance } from 'element-plus'
import type { Ref } from 'vue'
import type { FormProps } from '../types'
export function useFormAction(
  formRef: Ref<FormInstance | undefined>,
  formData: Ref<Record<string, any>>,
  props: FormProps
) {
  const submitForm = async () => {
    if (!formRef.value) return
    await formRef.value.validate((valid: boolean) => {
      if (valid) {
        props.onSubmit && props.onSubmit(formData.value)
      }
    })
  }

  const resetForm = () => {
    if (!formRef.value) return
    formRef.value.resetFields()
  }

  return {
    submitForm,
    resetForm
  }
}
