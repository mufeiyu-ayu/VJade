import { computed } from 'vue'
import type { FormProps } from '../types'
export function useFormComputed(props: FormProps) {
  console.log(props, 'props')
  const colSize = computed(() => {
    if (props.colSize) {
      return props.colSize
    }
    alert(111)
    switch (props.layout) {
      case 'horizontal':
        return 24 / props.fieldConfig.length
      case 'vertical':
        return 24
      default:
        return 12
    }
  })

  // function getParts(length: number) {}

  return {
    colSize
  }
}
