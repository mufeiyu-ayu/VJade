import { type EditOptionType, EditTypeEnums } from '@ayu/model'
import { isFunction } from '@ayu/utils'
import { ElInput, ElInputNumber, ElSwitch } from 'element-plus'
import { fsFormatStrategies } from '../index'
import FsSelectOption from '../form/fs-select-option/index.vue'
// 字符串 enum
export enum StringComponent {
  CRON = 'cron',
  ICON_SELECT = 'icon-select'
}

/* @description  存放排多少列的对象(8个为 1 组) */
export const lengthStrategies: Record<number, (length: number) => boolean> = {
  1: (length) => length > 0 && length <= 8,
  2: (length) => length > 8 && length <= 16,
  3: (length) => length > 16
}

/**
 * 表单绑定值策略
 * @param {T} bindData 绑定对象
 * @param {EditTypeEnums} editType 编辑类型
 */
export const bindStrategy = <T extends Record<'type' | 'format' | 'class', any>>(
  bindData: T,
  editType: EditTypeEnums
): T => {
  const strategy: Record<any, () => any> = {
    [EditTypeEnums.TEXT_AREA]: () => (bindData['type'] = 'textarea'),
    [EditTypeEnums.NUMBER]: () => (bindData['type'] = 'number'),
    [EditTypeEnums.DATETIME]: () => {
      bindData['type'] = 'datetime'
      bindData['format'] = 'YYYY-MM-DD HH:mm:ss'
      bindData['class'] = '!w-full'
    },
    [EditTypeEnums.DATE]: () => {
      bindData['type'] = 'date'
      bindData['format'] = 'YYYY-MM-DD'
      bindData['class'] = '!w-full'
    },
    [EditTypeEnums.TIME]: () => {
      bindData['type'] = 'date'
      bindData['format'] = 'HH:mm:ss'
      bindData['class'] = '!w-full'
    },
    [EditTypeEnums.BOOL]: () => void 0,
    [EditTypeEnums.ENUM]: () => void 0,
    [EditTypeEnums.STRING]: () => void 0,
    [EditTypeEnums.DICT]: () => {
      bindData['class'] = '!w-full'
    },
    [EditTypeEnums.JSON]: () => void 0,
    [EditTypeEnums.DD_TREE]: () => void 0,
    [EditTypeEnums.LOOKUP]: () => void 0,
    [EditTypeEnums.FILE]: () => void 0,
    [EditTypeEnums.DD_TABLE]: () => void 0,
    [EditTypeEnums.DETAILS]: () => void 0,
    [EditTypeEnums.EDITOR]: () => void 0,
    [EditTypeEnums.OBJECT]: () => void 0,
    [EditTypeEnums.OBJECT_COLUMN]: () => void 0
  }

  // 执行函数为 bindData 赋值
  isFunction(strategy[editType]) && strategy[editType]()
  return bindData
}

// const stringRenderStrategy = (editOption?: EditOptionType) => {
//   const comp = {
//     [StringComponent.CRON]: FsCron,
//     [StringComponent.ICON_SELECT]: FsIconSelect
//   }
//   return comp[editOption?.customs?.stringComponent] ?? FsInput
// }

/* @description  组件渲染模式 */
export const componentRenderStrategy = (key: EditTypeEnums, editOption: EditOptionType) => {
  console.log(key, key)
  console.log(editOption, 'editOption')
  const arr: Record<EditTypeEnums, any> = {
    [EditTypeEnums.STRING]: {
      edit: ElInput,
      query: ElInput,
      show: fsFormatStrategies('fs-format-default')
    },
    [EditTypeEnums.NUMBER]: {
      edit: ElInputNumber,
      query: ElInputNumber,
      show: fsFormatStrategies('fs-format-default')
    },
    [EditTypeEnums.ENUM]: {
      edit: FsSelectOption,
      query: FsSelectOption,
      show: fsFormatStrategies('fs-format-enum')
    },
    [EditTypeEnums.BOOL]: {
      edit: ElSwitch,
      query: FsSelectOption,
      show: fsFormatStrategies('fs-format-bool')
    }
  }
  console.log(arr, 'arr')
}
