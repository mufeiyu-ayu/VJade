import type { FormInstance, FormRules } from 'element-plus'
import type { FieldItemConfig } from '../types'
import { isMobile } from '@ayu-mu/utils'
import { computed, getCurrentInstance, onBeforeMount, ref, toRefs, watch } from 'vue'

export function useFormContent() {
  const instance = getCurrentInstance()
  const { fieldConfig } = toRefs(instance?.props as unknown as { fieldConfig: FieldItemConfig[] })
  const formRef = ref<FormInstance>()
  const formRules = ref<FormRules>({})
  const formData = ref<Record<string, unknown>>({})

  /**   初始化表单数据 */
  function initFormData() {
    fieldConfig.value.forEach((item) => {
      formData.value[item.field] = item.defaultValue || null
    })
  }

  /**   初始化表单规则 */
  function initFormRules() {
    fieldConfig.value.forEach((item) => {
      formRules.value[item.field] = item.rules || []
    })
  }
  /**   表单列表 */

  const formList = computed(() => {
    return fieldConfig.value.reduce((arr: FieldItemConfig[], item) => ([
      ...arr,
      {
        ...item,
        placeholder: item.placeholder || `请输入${item.label}`,
        type: item.type,
      },
    ]), [])
  })

  /**
   * 处理列宽
   */
  const handleColSize = (colSize: number) => {
    return isMobile() ? 24 : colSize
  }

  /**
   * 设置表单数据
   */
  const handleSetFormData = (params: Record<string, unknown>) => {
    Object.keys(params).forEach((key) => {
      formData.value[key] = params[key] as string | number
    })
  }

  /**
   *
   * @param data 查找带回数据
   * @param map  隐射规则
   */
  const lookupChange = (data: Record<string, unknown>, map: Record<string, unknown>) => {
    for (const key in map) {
      const formKey = map[key] as string
      formData.value[formKey] = data[key] as string
    }
  }

  watch(
    () => fieldConfig.value,
    (_newVal) => {
      const fieldList = fieldConfig.value.filter(item => item.unVisible).map(item => item.field)
      fieldList.forEach((field) => {
        formData.value[field] = null
      })
    },
    {
      deep: true,
    },
  )
  onBeforeMount(() => {
    initFormData()
    initFormRules()
  })

  return {
    formRef,
    formRules,
    formList,
    formData,
    handleColSize,
    handleSetFormData,
    lookupChange,
    fieldConfig,
  }
}
