import { getCurrentInstance, type ComponentInternalInstance } from 'vue'
import type { FormInstance } from 'element-plus'
import { useFormUtils } from './ayu-form-utils-hooks'
import { useFormAction } from './ayu-form-action-hooks'
import { useFormRules } from './ayu-form-rules-hooks'
import { useFormComputed } from './ayu-form-computed-hooks'
import type { FormProps } from '../types'
import { ref, onMounted } from 'vue'

export function useForm() {
  const instance = getCurrentInstance() as ComponentInternalInstance
  const props = instance.props as unknown as FormProps
  const { initFormData } = useFormUtils()
  const formRef = ref<FormInstance>()
  const formData = ref<Record<string, any>>({})
  const { submitForm, resetForm } = useFormAction(formRef, formData, props)
  const { rules } = useFormRules(props)
  const { colSize, groupComponent, formGroupConfig } = useFormComputed(props)
  onMounted(() => {
    console.log(props, 'colSize')
    formData.value = initFormData(props)
  })
  return {
    formRef,
    formData,
    rules,
    submitForm,
    resetForm,
    colSize,
    groupComponent,
    formGroupConfig
  }
}
