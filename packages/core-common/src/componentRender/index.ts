import type { Component } from 'vue'
import type { FieldType } from '../basic/formView/src/types'
import { ElInputNumber } from 'element-plus'
import { h } from 'vue'
import { AyuDate, AyuDateTime, AyuInput, AyuRadio, AyuSelect, AyuUploadImg, JsonEditor } from '../form'

export interface ComponentProps {
  'modelValue'?: unknown
  'onUpdate:modelValue'?: (val: unknown) => void
  'gsName'?: string
  [key: string]: unknown
}

export function useComponentRender() {
  function componentRender(type: FieldType, useH = false, props?: ComponentProps) {
    const getComponent = () => {
      switch (type) {
        case 'input':
          return AyuInput
        case 'inputNumber':
          return ElInputNumber
        case 'select':
          return AyuSelect
        case 'uploadImg':
          return AyuUploadImg
        case 'radio':
          return AyuRadio
        case 'jsoneditor':
          return JsonEditor
        case 'date':
          return AyuDate
        case 'dateTime':
          return AyuDateTime
        default:
          return AyuInput
      }
    }
    const component = getComponent()
    if (useH) {
      return h(component as Component, props)
    }
    return component
  }
  return {
    componentRender,
  }
}
