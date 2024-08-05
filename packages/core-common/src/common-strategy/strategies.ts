// import {EditTypeEnums} from '@ayu/model'
// import {isFunction} from '@ayu/utils'

/* @description  存放排多少列的对象(8个为 1 组) */
export const lengthStrategies: Record<number, (length: number) => boolean> = {
  1: (length) => length > 0 && length <= 8,
  2: (length) => length > 8 && length <= 16,
  3: (length) => length > 16
}
