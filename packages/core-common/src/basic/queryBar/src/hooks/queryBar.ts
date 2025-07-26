import type { FormInstance } from 'element-plus'
import type { FieldItemConfig } from '../../../formView'
import type { QueryBarProps } from '../types'
import { EventTypeEnum, useEventBus } from '@ayu-mu/hooks'
import { isMobile, useThrottle } from '@ayu-mu/utils'
import { computed, getCurrentInstance, onMounted, ref, toRefs, watch } from 'vue'

export function useQueryBar() {
  const props = getCurrentInstance()?.props as unknown as QueryBarProps
  const { emit, on } = useEventBus([
    `${props.uid}-${EventTypeEnum.QueryBar_SHOW}`,
    `${props.uid}-${EventTypeEnum.QueryBar_SEARCH}`,
    `${props.uid}-${EventTypeEnum.QueryBar_RESET}`,
    `${props.uid}-${EventTypeEnum.QueryBar_DATA_CHANGE}`,
    `lookup-${EventTypeEnum.QueryBar_Reset_LOOKUP}`,
  ])
  const formData = ref<Record<string, unknown>>({})
  const formRef = ref<FormInstance>()
  const { fieldConfig } = toRefs(props as unknown as { fieldConfig: FieldItemConfig[] })

  // 是否显示 querybar
  const showQueryBar = ref(props.visible || false)
  /**
   * 表单列表
   */
  const formList = computed(() => {
    const arr: FieldItemConfig[] = []
    fieldConfig.value.forEach((item) => {
      arr.push({
        ...item,
        placeholder: item.placeholder || `${item.type === 'select' ? '请选择' : '请输入'}${item.label}`,
        type: item.type,
      })
    })
    return arr
  })
  const initEvent = () => {
    on(`${props.uid}-${EventTypeEnum.QueryBar_SHOW}`, (args) => {
      const [show] = args as [boolean]
      if (props.visible) {
        showQueryBar.value = !show
      }
      else {
        showQueryBar.value = show
      }
    })
  }

  // /**  搜索 */
  const { throttled: throttledSearch } = useThrottle(() => {
    emit(`${props.uid}-${EventTypeEnum.QueryBar_SEARCH}`, formData.value)
  }, 600)

  /**  重置 */
  const { throttled: throttledReset } = useThrottle(() => {
    formRef.value?.resetFields()
    emit(`${props.uid}-${EventTypeEnum.QueryBar_RESET}`)
    emit(`lookup-${EventTypeEnum.QueryBar_Reset_LOOKUP}`)
  }, 600)

  const getColSize = (colSize: number) => {
    return isMobile() ? 24 : colSize
  }

  const isHorizontal = computed(() => {
    const allColSize = fieldConfig.value.reduce((acc, item) => acc + (item.colSize || 6), 0)
    return allColSize < 24
  })
  watch(() => props.visible, (val) => {
    showQueryBar.value = val || false
  })

  watch(formData.value, (val) => {
    // 如果对象的每个值都为 undefined 则 val为null
    if (Object.values(val).every(item => item === undefined)) {
      val = null as unknown as Record<string, unknown>
    }
    emit(`${props.uid}-${EventTypeEnum.QueryBar_DATA_CHANGE}`, val)
  }, {
    immediate: true,
  })
  const initFormData = () => {
    formList.value.forEach((item) => {
      formData.value[item.field] = item.defaultValue || null
    })
  }
  const setFormData = (data: Record<string, unknown>) => {
    Object.keys(data).forEach((key) => {
      if (key in formData.value) {
        formData.value[key] = data[key]
      }
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
      formData.value[formKey] = data[key]
    }
  }
  onMounted(() => {
    initEvent()
    initFormData()
  })

  return {
    formRef,
    formData,
    isHorizontal,
    formList,
    getColSize,
    showQueryBar,
    throttledSearch,
    throttledReset,
    setFormData,
    lookupChange,
  }
}
