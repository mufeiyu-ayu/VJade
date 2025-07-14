import type { SelectProps } from '../index.vue'
import { getCurrentInstance, onBeforeMount, ref, watch } from 'vue'

export function useSelect() {
  const instance = getCurrentInstance()
  const props = instance?.props as unknown as SelectProps
  const emit = instance?.emit
  const selectValue = ref()
  const selectOptions = ref<{ label: string, value: string | number, disabled?: boolean }[]>([])
  async function init() {
    if (props?.options) {
      selectOptions.value = props.options as { label: string, value: string | number, disabled?: boolean }[]
      return
    }

    if (props?.getOptions) {
      const { code, data } = await props.getOptions()
      if (!code) {
        selectOptions.value = (data as Record<string, unknown>[]).map((item) => {
          return {
            label: item[props.map?.label || 'label'] as string,
            value: item[props.map?.value || 'value'] as string,
          }
        })
      }
    }
  }

  /**  监听modelValue */
  watch(() => props.modelValue, (value) => {
    if (value) {
      selectValue.value = value
    }
  }, { immediate: true })

  /**  监听options */
  watch(
    () => props.options,
    (val) => {
      selectOptions.value = val as { label: string, value: string, disabled: boolean }[]
    },
    {
      immediate: true,
    },
  )

  function handleChange(value: string | number | unknown[] | null) {
    selectValue.value = value
    emit?.('update:modelValue', value)
  }
  onBeforeMount(() => {
    init()
  })
  return {
    selectValue,
    selectOptions,
    handleChange,
  }
}
