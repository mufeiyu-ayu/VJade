import type { JSX } from 'vue/jsx-runtime'
import type { CustomVxeColumnProps } from './table.ts'

export type Render<T> = (params: {
  row: T
  column: CustomVxeColumnProps
  $index: number
}) => JSX.Element | string | number

export interface BtnConfig {
  [property: string]: {
    visible: boolean
    disabled: boolean
    icon: string
    code: string
    label: string
    type: 'primary' | 'danger'
  }
}
