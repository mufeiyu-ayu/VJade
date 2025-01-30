import type { FormItemRule } from 'element-plus'
import type { ColSize, GroupType } from './enum'

/** 基础字段配置 */
type BaseFieldConfig = {
  /** 表单项标签 */
  label: string
  /** 表单项字段名 */
  field: string
  /** 表单项类型 */
  type: string
  /** 表单项默认值 */
  defaultValue?: any
  /** 表单项验证规则 */
  rules?: FormItemRule[]
}

/** 分组模式下的字段配置 */
type GroupFieldConfig = BaseFieldConfig & {
  /** 表单项分组（分组模式下必填） */
  group: string
  /** 表单项列数 */
  colSize?: ColSize
}

/** 普通模式下的字段配置 */
type NormalFieldConfig = BaseFieldConfig & {
  /** 表单项分组（普通模式下不可用） */
  group?: never
  /** 表单项列数 */
  colSize?: never
}

/** 基础表单属性接口 */
interface BaseFormProps {
  /**
   * 表单布局方式
   * @default 'default'
   */
  layout?: 'horizontal' | 'vertical' | 'default'

  /**
   * 表单提交回调函数
   * @param params - 表单数据
   */
  onSubmit?: (params: any) => void

  /**
   * 表单重置回调函数
   * @param params - 表单数据
   */
  onReset?: (params: any) => void
}

/**
 * 分组表单属性接口
 * @description 分组表单属性接口
 * @interface GroupFormProps
 * @extends {BaseFormProps}
 * @property {boolean} isGroup - 是否启用分组模式
 * @property {GroupFieldConfig[]} fieldConfig - 表单项配置数组
 * @property {GroupType} groupType - 分组类型
 * @property {never} colSize - 列大小在分组模式下不可用
 */
export interface GroupFormProps extends BaseFormProps {
  /** 是否启用分组模式 */
  isGroup: true

  /** 表单项配置数组 */
  fieldConfig: GroupFieldConfig[]

  /**
   * 分组类型
   * @default 'default'
   */
  groupType?: GroupType

  /** 列大小在分组模式下不可用 */
  colSize?: never
}

/**
 * 普通表单属性接口
 * @description 普通表单属性接口
 * @interface NormalFormProps
 * @extends {BaseFormProps}
 * @property {boolean} isGroup - 是否启用分组模式
 * @property {NormalFieldConfig[]} fieldConfig - 表单项配置数组
 * @property {never} colSize - 列大小在普通模式下不可用
 */
export interface NormalFormProps extends BaseFormProps {
  /** 是否启用分组模式 */
  isGroup?: false | undefined

  /** 表单项配置数组 */
  fieldConfig: NormalFieldConfig[]

  /**
   * 表单布局方式
   * @default 'default'
   */
  layout?: 'horizontal' | 'vertical' | 'default'

  /**
   * 列大小
   * @description 控制表单项占据的列数
   */
  colSize?: ColSize
}

/**
 * 表单属性联合类型
 * @description 可以是分组表单或普通表单
 */
export type FormProps = GroupFormProps | NormalFormProps
