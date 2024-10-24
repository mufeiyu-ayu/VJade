import type { ViewColumnType } from '@ayu-mu/model'

/**
 * 表单内容状态
 */
export interface FormViewContentStateType {
  /**
   * 表单项配置
   */
  formItemsConfig: ViewColumnType[]
  /**
   * 分组后的表单项配置
   */
  groupFormItemsConfig: Array<Array<ViewColumnType>>
}

/**
 * 分组
 */
export interface GroupItemType {
  [key: string]: string[]
}

/**
 * 分组后的配置的每一组
 */
export interface groupFormItemsConfigType {
  title: string
  list: ViewColumnType[]
}

/**
 * 表单编辑选项
 */
export interface FormViewEditOptionType {
  /**
   * 分组名
   */
  groupName: string
  props: any
}

/**
 * 表单store类型
 */
export interface FormViewStoreType {
  formItemsConfig: ViewColumnType[]
  disabled: boolean
  isfullScreen: boolean
}

/**
 * 点击事件类型
 */
export type ClickType = 'confirm' | 'cancel' | 'clear' | 'multiply' | 'saveAndAdd'
