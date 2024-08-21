import { ref, getCurrentInstance } from 'vue'

export const useSplitTable = () => {
  const splitRef = ref()
  const emitter = getCurrentInstance()?.emit

  const selectChange = (e: any) => {
    emitter && emitter('selectChange', e)
  }

  /* @description  打开子表 */
  const openSubTable = () => {
    splitRef.value && splitRef.value.open()
  }

  /* @description  关闭子表 */
  const closeSubTable = () => {
    splitRef.value && splitRef.value.close()
  }

  /* @description  获取高度 */
  const getTopHeight = () => {
    return (splitRef.value && splitRef.value.topHeight && splitRef.value.topHeight) || 0
  }

  /* @description  获取底部高度 */

  const getBottomHeight = () => {
    return (splitRef.value && splitRef.value.bottomHeight && splitRef.value.bottomHeight) || 0
  }
  return {
    splitRef,
    selectChange,
    openSubTable,
    closeSubTable,
    getTopHeight,
    getBottomHeight
  }
}
