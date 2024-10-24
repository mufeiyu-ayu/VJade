import { type ViewColumnType } from '@ayu-mu/model'
import { computed } from 'vue'
import { lengthStrategies } from '../../../../../common-strategy/strategies'
import { FormStatusEnum } from '../../types/enum'

/**
 *
 *
 * @param {*} props props 值
 * @param {*} formStore 表单内容
 * @param {*} formData 表单值
 * @param {*} state 表单状态
 * @param {*} childTableColumns
 */
export const useFormViewContentComputed = (
  props: any,
  formStore: any,
  formData: any,
  state: any,
  childTableColumns: any
) => {
  /* @description  表单是否只读 */
  const disabled = computed(() => formStore.state.disabled)

  /* @description  表单是否全屏 */
  const isFullScreen = computed(() => formStore.state.isfullScreen)

  /**
   * 计算排列多少列
   * @returns {Number}
   */
  const getCol = (): number | undefined => {
    // 字段数量
    const length = state.formItemsConfig.length
    if (props.col) {
      return props.col
    } else {
      for (const strategy in lengthStrategies) {
        if (lengthStrategies[strategy](length)) {
          return Number(strategy)
        }
      }
    }
  }

  /* @description  计算是否要显示详情 */
  const isShowDetail = computed(() => {
    return (
      props.isChild &&
      (props.formStatus === FormStatusEnum.NEW
        ? childTableColumns.value && childTableColumns.value.length
        : childTableColumns.value && childTableColumns.value.length && formData.value?.id)
    )
  })

  /**
   *@description 计算并生成每一列表单的宽(几份)
   *@returns {Number}
   */
  const colSpan = computed(() => {
    const colSpanMap = [24, 12, 8, 6]
    if (isShowDetail.value) {
      //主子表
      return 8
    } else {
      return colSpanMap[getCol()! - 1]
    }
  })

  /**
   * 计算是否要禁用该组件(为组件添加":disabled"属性)
   * @return {boolean}
   */
  const formItemDisable = computed(() => {
    return (item: ViewColumnType) => {
      if (props.excludeDisableKey?.includes(item.property)) {
        return false
      } else {
        if (item.readonly) {
          return true
        } else {
          return !!formData.value?.[props.disabledDisableKey!]
        }
      }
    }
  })

  return {
    disabled,
    isFullScreen,
    colSpan,
    isShowDetail,
    formItemDisable
  }
}
