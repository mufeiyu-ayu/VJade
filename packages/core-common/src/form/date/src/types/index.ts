import type { FormItemRule } from 'element-plus'

export type DateType = 'year' | 'month' | 'date' | 'datetime' | 'week' | 'datetimerange' | 'daterange'
export type DateFormat =
  | 'YYYY-MM-DD'
  | 'YYYY/MM/DD'
  | 'YYYY-MM-DD HH:mm:ss'
  | 'YYYY-MM-DD HH:mm'
  | 'YYYY-MM-DDTHH:mm:ssZ'
  | 'YYYY-MM-DDTHH:mm:ss.SSSZ'
  | 'HH:mm:ss'
  | 'MM-DD'
  | 'dddd, MMMM D YYYY'
  | 'X' // Unix 时间戳（秒）
  | 'x' // Unix 时间戳（毫秒）

export interface AyuDateProps {
  modelValue: string
  gsName: string
  valueFormat: DateFormat
  type: DateType
  languageList?: LanguageItem[]
}
export interface LanguageItem {
  language: string
  label: string
  placeholder?: string
  status?: number
  rules?: FormItemRule[]
  options?: {
    label: string
    value: string | number | boolean
    disabled?: boolean
  }[]
}
