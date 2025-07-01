import type { FormInstance } from 'element-plus'
import type { ComponentInternalInstance } from 'vue'
import type { FormProps } from '../types'
import { getCurrentInstance, onMounted, ref } from 'vue'
import { useFormActionHooks } from './ayu-form-action-hooks'
import { useFormComputedHooks } from './ayu-form-computed-hooks'
import { useFormUtils } from './ayu-form-utils-hooks'

/**
 * 表单主要功能的 hook
 * @returns 表单相关的状态和方法
 */
export function useForm() {
  const instance = getCurrentInstance() as ComponentInternalInstance
  const props = instance.props as unknown as FormProps
  const { initFormData, componentRender } = useFormUtils()
  const formRef = ref<FormInstance>()
  const formData = ref<Record<string, unknown>>({})

  const { formRules, colSize, groupComponent, groupItemConfig, formGroupConfig, allActiveName, tabsOverflowY }
    = useFormComputedHooks(props)

  const { submitForm, resetForm, handleCollapseChange, collapseIsExpand } = useFormActionHooks({
    formRef,
    formData,
    props,
    formGroupConfig,
  })

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
    tabsOverflowY,
    componentRender,
  }
}
