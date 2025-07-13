import type { Component } from 'vue'
import type { FieldType } from '../basic/formView/src/types'
import { ElInput } from 'element-plus'
import { h } from 'vue'

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
          return ElInput
        default:
          return ElInput
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
