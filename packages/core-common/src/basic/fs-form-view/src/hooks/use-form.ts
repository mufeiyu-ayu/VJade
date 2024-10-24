import { type ViewColumnType } from '@ayu-mu/model'

import type { FormRules } from 'element-plus'
import { defaultValueStrategies } from '../config/default-value.ts'

export const useForm = () => {
  /**
   * 生成验证规则
   * @param {ViewColumnType[]} voColumn vo列字段数组
   */
  const generateValidationRules = (voColumn: ViewColumnType[]) => {
    const rules: FormRules = {}
    voColumn.forEach((item) => {
      const validationRules = []
      if (item.required) {
        const required = { required: true, message: `${item.label}不能为空！` }
        validationRules.push(required)
      }
      //处理自定义正则，在编辑类型时设置的
      if (item.editOption?.customs?.minlength) {
        const minlength = {
          min: item.editOption?.customs?.minlength,
          message: `${item.label}长度不能小于${item.editOption?.customs?.minlength}！`
        }
        validationRules.push(minlength)
      }
      if (item.editOption?.customs?.maxlength) {
        const maxlength = {
          max: item.editOption?.customs?.maxlength,
          message: `${item.label}长度不能大于${item.editOption?.customs?.maxlength}！`
        }
        validationRules.push(maxlength)
      }
      // if (item.editOption?.customs?.min) {
      //   const min = {
      //     min: item.editOption?.customs?.min,
      //     message: `${item.label}不能小于${item.editOption?.customs?.min}！`
      //   }
      //   validationRules.push(min)
      // }
      // if (item.editOption?.customs?.max) {
      //   const max = {
      //     max: item.editOption?.customs?.max,
      //     message: `${item.label}不能大于${item.editOption?.customs?.max}！`
      //   }
      //   validationRules.push(max)
      // }
      if (item.editType === 'email')
        validationRules.push({
          type: 'email',
          message: `${item.label}格式不正确！`
        })
      if (item.editType === 'tel')
        validationRules.push({
          pattern: /^1[3-9]\d{9}$/,
          message: '请输入有效的手机号码（例如：13812345678）'
        })
      if (item.editType === 'url') {
        const url = {
          type: 'url',
          message: `${item.label}格式不正确！`
        }
        validationRules.push(url)
      }
      if (item.editType === 'number') {
        const number = {
          type: 'number',
          message: `${item.label}格式不正确！`
        }
        validationRules.push(number)
      }
      if (item.editType === 'integer') {
        const number = {
          pattern: /^-?[1-9]\d*$/,
          message: `${item.label}格式不正确！`
        }
        validationRules.push(number)
      }
      if (item.editType === 'long') {
        const number = {
          pattern: /^-?\d+$/,
          message: `${item.label}格式不正确！`
        }
        validationRules.push(number)
      }
      if (item.editType === 'decimal') {
        const precision = item?.editOption?.customs?.precision || 1
        const number = {
          pattern: new RegExp(`^-?(?:\\d+(\\.\\d{1,${precision}})?|\\.\\d{1,${precision}})$`),
          message: `${item.label}格式不正确！`
        }
        validationRules.push(number)
      }
      if (validationRules.length && validationRules.length > 0) {
        ;(rules[item.property] as any) = validationRules
      }
    })
    return rules
  }

  /**
   * 生成默认值
   * @param {ViewColumnType[]} voColumn vo列字段数组
   */
  const handleDefaultValue = (voColumn: ViewColumnType[]) => {
    const defaultValue: Record<string, any> = {}

    voColumn.forEach((item) => {
      const customs = item.editOption?.customs
      const defaultVal = customs?.defaultValue ?? customs?.['defaultValue']

      if (defaultVal !== undefined) {
        defaultValue[item.property] = defaultVal
      } else {
        defaultValue[item.property] = defaultValueStrategies[item.editType]
      }
    })

    return defaultValue
  }

  return {
    generateValidationRules,
    handleDefaultValue
  }
}
