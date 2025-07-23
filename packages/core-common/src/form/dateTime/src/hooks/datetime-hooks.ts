import type { ComponentInternalInstance } from 'vue'
import type { AyuDateProps } from '../../../date/src/types'
import { getCurrentInstance, ref, watch } from 'vue'

export function useDateTime() {
  const instance = getCurrentInstance() as ComponentInternalInstance
  const props = instance.props as unknown as AyuDateProps
  const emit = instance.emit
  const date = ref<string>()

  const handleChange = (val: string) => {
    emit('update:modelValue', val)
  }

  watch(
    () => props.modelValue,
    (val) => {
      date.value = val
    },
    {
      immediate: true,
    },
  )
  return {
    date,
    handleChange,
  }
}
