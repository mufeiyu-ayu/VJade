import FsFormatBool from './bool.vue'
import FsFormatMoney from './money.vue'
import FsFormatPercent from './percent.vue'
import FsFormatDataTime from './data-time.vue'
import FsFormatEnum from './enum.vue'
import FsFormatDefault from './default.vue'
import FsFormatImage from './image.vue'
import FsFormatCity from './city.vue'
import FsFormatEditor from './editor.vue'
import FsFormatProgress from './progress.vue'

export {
  FsFormatBool,
  FsFormatMoney,
  FsFormatPercent,
  FsFormatDataTime,
  FsFormatEnum,
  FsFormatDefault,
  FsFormatImage,
  FsFormatCity,
  FsFormatEditor,
  FsFormatProgress
}

/* 
  @description 根据展示类型生成对应的组件
  @param {string} formatName 展示类型
  @return {VueComponent} 组件
 */

type FormatType =
  | 'fs-format-default'
  | 'fs-format-bool'
  | 'fs-format-money'
  | 'fs-format-percent'
  | 'fs-format-data-time'
  | 'fs-format-enum'
  | 'fs-format-image'
  | 'fs-format-city'
  | 'fs-format-editor'
  | 'fs-format-progress'
export const fsFormatStrategies = (formatName: FormatType) => {
  const components = {
    'fs-format-default': FsFormatDefault,
    'fs-format-bool': FsFormatBool,
    'fs-format-money': FsFormatMoney,
    'fs-format-percent': FsFormatPercent,
    'fs-format-data-time': FsFormatDataTime,
    'fs-format-enum': FsFormatEnum,
    'fs-format-image': FsFormatImage,
    'fs-format-city': FsFormatCity,
    'fs-format-editor': FsFormatEditor,
    'fs-format-progress': FsFormatProgress
  }
  return components[formatName]
}
