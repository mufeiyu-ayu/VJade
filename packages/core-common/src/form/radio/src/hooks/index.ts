import type { ComponentInternalInstance } from 'vue'
import type { RadioProps, RadioSelectValue } from '../index.vue'
import { getCurrentInstance, onMounted, ref, watch } from 'vue'

export function useRadio() {
  const instance = getCurrentInstance() as ComponentInternalInstance
  const props = instance.props as unknown as RadioProps
  const emit = instance.emit
  const selectValue = ref<RadioSelectValue>()
  const selectOptions = ref<{ label: string, value: RadioSelectValue, disabled?: boolean }[]>([])

  const getOptions = async () => {
    if (props.languageList) {
      const language = localStorage.getItem('language') || 'zh'
      const languageItem = props.languageList?.find(item => item.language === language)
      selectOptions.value = languageItem?.options || props.options as { label: string, value: RadioSelectValue, disabled?: boolean }[]
      return
    }
    if (props.options) {
      selectOptions.value = props.options as { label: string, value: RadioSelectValue, disabled?: boolean }[]
      return
    }

    if (props.getOptions) {
      const { code, data } = await props.getOptions(props.queryCondition || {})
      if (code !== 0)
        return
      selectOptions.value = data
    }
    selectOptions.value = []
  }

  const handleChange = (value: RadioSelectValue | undefined): void => {
    emit('update:modelValue', value)
  }

  // 监听 modelValue 变化，同步到 selectValue
  watch(
    () => props.modelValue,
    (newVal) => {
      selectValue.value = newVal || undefined
    },
    {
      immediate: true,
    },
  )

  watch(
    () => props.options,
    (val) => {
      selectOptions.value = val || []
    },
  )

  onMounted(() => {
    getOptions()
  })

  return {
    selectValue,
    selectOptions,
    handleChange,
  }
}
