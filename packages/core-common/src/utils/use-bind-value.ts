import type { ViewColumnType } from '@ayu-mu/model'
import { computed } from 'vue'
import { bindStrategy } from '../common-strategy/strategies'
import { FormStatusEnum } from '../basic/fs-form-view/src/types/enum'

/**
 * 根据传入的行数据，和列数据，生成表单组件绑定的attrs
 */
export const bindEditValue = computed(() => {
  return (type: 'form' | 'table', column: ViewColumnType, row?: Record<string, any>, formStatus?: FormStatusEnum) => {
    let bindData: Record<string, any> = {
      placeholder: '请输入' + column.label
    }
    bindData = bindStrategy(bindData, column.editType)
    return {
      // 不同组件自定义配置
      ...bindData,
      // 注入通用配置
      ...column?.editOption?.customs,
      // 注入专用配置
      ...(type === 'form'
        ? column?.editOption?.editOptions?.component
        : column?.editOption?.dataGridOptions?.component),
      // 业务组件专属配置
      options: {
        placeholder: '请输入' + column.label,
        // 不同组件自定义配置
        ...bindData,
        // 注入通用配置
        ...column?.editOption?.customs,
        // 注入专用配置
        ...(type === 'form'
          ? column?.editOption?.editOptions?.component
          : column?.editOption?.dataGridOptions?.component)
      },
      row,
      column,
      formStatus
    }
  }
})

/**
 * 查看组件参数绑定处理
 */
export const bindViewValue = computed(() => {
  return (type: 'form' | 'table', column: ViewColumnType, row?: Record<string, any>, formStatus?: FormStatusEnum) => {
    return {
      // 注入通用配置
      ...column?.editOption?.customs,
      // 注入专用配置
      ...(type === 'form'
        ? column?.editOption?.displayOptions?.component
        : column?.editOption?.displayOptions?.component),
      // 业务组件专属配置
      options: column?.format
        ? column?.format?.options
        : type === 'form'
          ? column?.editOption?.displayOptions?.component
          : column?.editOption?.displayOptions?.component,
      row,
      column,
      formStatus
    }
  }
})
