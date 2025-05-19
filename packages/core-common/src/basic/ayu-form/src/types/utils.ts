import type { ExtractComponentProps } from '@ayu-mu/model'
import type { ElCheckbox, ElDatePicker, ElInput, ElRadio, ElSelect, ElSwitch, ElTimePicker, ElUpload } from 'element-plus'

// 定义组件属性映射
export interface ComponentPropsMapping {
  input: ExtractComponentProps<typeof ElInput>
  select: ExtractComponentProps<typeof ElSelect>
  checkbox: ExtractComponentProps<typeof ElCheckbox>
  radio: ExtractComponentProps<typeof ElRadio>
  switch: ExtractComponentProps<typeof ElSwitch>
  date: ExtractComponentProps<typeof ElDatePicker>
  time: ExtractComponentProps<typeof ElTimePicker>
  datetime: ExtractComponentProps<typeof ElDatePicker>
  upload: ExtractComponentProps<typeof ElUpload>
  textarea: ExtractComponentProps<typeof ElInput>
}
