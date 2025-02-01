import type { FormItemRule } from 'element-plus'
import type { ColSize, GroupType } from './enum'
import type { ComponentPropsMapping } from './utils'

// 限制 FormType 只能是 ComponentPropsMapping 的键
export type FormType = keyof ComponentPropsMapping

// 为每个组件类型创建专门的配置类型
export type FieldConfigMap = {
  [K in FormType]: {
    label: string
    field: string
    type: K
    defaultValue?: any
    rules?: FormItemRule[]
    componentProps?: ComponentPropsMapping[K]
  }
}

/** 表单项配置 */
export type BaseFieldConfig<T extends FormType> = FieldConfigMap[T]

/** 分组模式下的字段配置 */
export type GroupFieldConfig<T extends FormType = FormType> = BaseFieldConfig<T> & {
  /** 表单项分组（分组模式下必填） */
  group: string
  /** 表单项列数 */
  colSize?: ColSize
}

/** 普通模式下的字段配置 */
type NormalFieldConfig<T extends FormType = FormType> = BaseFieldConfig<T> & {
  /** 表单项分组（普通模式下不可用） */
  group?: never
  /** 表单项列数 */
  colSize?: never
}

/** 基础表单属性接口 */
interface BaseFormProps {
  /**
   * 表单布局方式
   * @defaultValue 'default'
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
 */
export interface GroupFormProps extends BaseFormProps {
  /** 列大小在分组模式下不可用 */
  colSize?: never

  /** 是否启用分组模式 */
  isGroup: true

  /** 表单项配置数组 */
  fieldConfig: GroupFieldConfig[]

  /**
   * 分组类型
   * @defaultValue 'default'
   */
  groupType?: GroupType

  /**分组类型为 collapse 时 分组是否展开 */
  isExpand?: boolean

  /** 分组类型为 tab时指定的content 高度*/
  maxPaneHeight?: string

  /** 分组类型为 tab时指定tabs 风格 类型*/
  tabType?: '' | 'card' | 'border-card'
}

/**
 * 未分组表单属性接口
 */
export interface NormalFormProps extends BaseFormProps {
  /** 是否启用分组模式 */
  isGroup?: false | undefined

  /** 表单项配置数组 */
  fieldConfig: NormalFieldConfig[]

  groupType: undefined | null
  /**
   * 表单布局方式
   * @defaultValue 'default'
   */
  layout?: 'horizontal' | 'vertical' | 'default'

  /**
   * 列大小
   * 控制表单项占据的列数
   */
  colSize?: ColSize
  /** 分组类型为 tab时指定的content 高度*/
  maxPaneHeight?: never

  tabType: never
}

/** 表单属性联合类型，可以是分组表单或普通表单 */
export type FormProps = GroupFormProps | NormalFormProps

/**
 * 表单分组配置
 */
export interface FormGroupConfig {
  /** 分组标题 */
  groupTitle: string
  /** 表单项配置数组 */
  fieldConfig: GroupFieldConfig[]
}
