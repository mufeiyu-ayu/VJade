import { getCurrentInstance, type ComponentInternalInstance, ref, onMounted } from 'vue'
import type { FormInstance } from 'element-plus'
import { useFormUtils } from './ayu-form-utils-hooks'
import { useFormActionHooks } from './ayu-form-action-hooks'
import { useFormComputedHooks } from './ayu-form-computed-hooks'
import type { FormProps } from '../types'

/**
 * 表单主要功能的 hook
 * @returns 表单相关的状态和方法
 */
export function useForm() {
  const instance = getCurrentInstance() as ComponentInternalInstance
  const props = instance.props as unknown as FormProps
  const { initFormData } = useFormUtils()
  const formRef = ref<FormInstance>()
  const formData = ref<Record<string, any>>({})

  const { formRules, colSize, groupComponent, groupItemConfig, formGroupConfig, allActiveName, tabsOverflowY } =
    useFormComputedHooks(props)

  const { submitForm, resetForm, handleCollapseChange, collapseIsExpand } = useFormActionHooks(
    formRef,
    formData,
    props,
    formGroupConfig
  )

  onMounted(() => {
    formData.value = initFormData(props)
  })

  return {
    formRef,
    formData,
    formRules,
    submitForm,
    resetForm,
    handleCollapseChange,
    colSize,
    groupComponent,
    groupItemConfig,
    formGroupConfig,
    allActiveName,
    collapseIsExpand,
    tabsOverflowY
  }
}
