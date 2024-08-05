import { ViewColumnType } from '@ayu/model'
export enum FormStatusEnum {
  /* @description 添加 */
  NEW = 'New',
  /* @description 查看 */
  VIEW = 'View',
  /* @description 编辑 */
  EDIT = 'Edit'
}

// export enum FormActionsEnum {
//   Save = 'save',
//   Save_And_Add = 'saveAndAdd',
//   Delete = 'delete',
//   Reset = 'reset',
//   Clear = 'clear'
// }

// export enum FormCreateType {
//   AUTO_CREAT = 'AUTO_CREATE',
//   MIXING_CREATE = 'MIXING_CREATE',
//   // 只通过fields创建
//   Fields_CREAT = 'Fields_CREAT',
//   // 完全插槽自定义
//   FULL_CUSTOM_CREATE = 'FULL_CUSTOM_CREATE'
// }

/**
 * eventbus内部事件
 */
export enum FormActionEnum {
  /**
   * 取消事件
   */
  FORM_ACTION_CANCEL = 'form_view_action_cancel',
  /**
   * 提交事件
   */
  FORM_ACTION_CONFIRM = 'form_view_action_confirm',
  /**
   * 重置事件
   */
  FORM_ACTION_RESET = 'form_view_action_reset'
}

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
