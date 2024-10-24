import { getCurrentInstance, onMounted, ref, useAttrs, computed, nextTick, reactive, toRefs } from 'vue'
import { useVoConfig } from '@ayu-mu/request'
import { useEventBus } from '@ayu-mu/hooks'
import { type DataGridProps } from '../index.vue'
import { type ViewColumnType, EditTypeEnums, EventTypeEnum } from '@ayu-mu/model'

export const useDataGrid = (closeSubTable: any) => {
  const props = getCurrentInstance()?.props as any as DataGridProps

  /* @description  子表 columns */
  const childTableColumns = ref<Array<ViewColumnType>>()

  const attrs = useAttrs()

  /* @description  表格 ref */
  const tableBasicRef = ref()

  /* @description  字段数组 */
  const voFields = ref<Array<ViewColumnType>>([])
  /* @description  查询工具条是否显示 */
  const queryBarIsShow = ref(false)

  /* @description 触发事件  */
  const { on } = useEventBus([`${props?.voName}:${EventTypeEnum.QUERY_BAR_SHOW_SUCCESS}`])

  /* @description 初始化 vo */
  const getVoConfig = async () => {
    if (props?.voName) {
      const { getVoConfig } = useVoConfig()
      const { fields } = await getVoConfig(props?.voName)

      //主子表 fields
      childTableColumns.value = fields?.filter((item: ViewColumnType) => item.editType === EditTypeEnums.DETAILS)

      // 非主子表fields
      voFields.value = fields.filter((item: ViewColumnType) => item.editType !== EditTypeEnums.DETAILS)
    }
  }

  /* @description  是否显示主子表 */
  const isShowSubTable = computed(() => {
    return (
      childTableColumns.value &&
      childTableColumns.value.length !== 0 &&
      childTableColumns.value.length > 0 &&
      props.enableChildTable
    )
  })

  /* @description  查询条高度 */
  const heightState = reactive({
    //子表高度
    subTableHeight: '30vh'
  })

  // 查询栏高度
  const queryBarHeight = computed(() => {
    const { appContext } = getCurrentInstance() as any
    appContext.config.globalProperties.schema
    let voFieldList = voFields.value
    if (
      appContext.config.globalProperties.schema?.children?.find((item: any) => item.componentName === 'FlQueryBar')
        ?.props?.columnList
    )
      voFieldList = appContext.config.globalProperties.schema?.children?.find(
        (item: any) => item.componentName === 'FlQueryBar'
      )?.props?.columnList
    const queryField = voFieldList?.filter((item) => item.searchVisible === true)
    if (queryField && queryBarIsShow.value) {
      if (queryField.length && queryField.length > 0) {
        return Math.ceil(queryField.length / 3) * 50 + 15 + 46
      } else {
        return 50
      }
    } else {
      return 0
    }
  })

  /* @description  */
  on(`${props?.voName}:${EventTypeEnum.QUERY_BAR_SHOW_SUCCESS}`, (data: any) => {
    queryBarIsShow.value = data?.[0]
    nextTick(() => {
      // 关闭子表
      closeSubTable && closeSubTable()
    })
  })

  /* @description  设置查询栏高度 */
  const setPosition = () => {
    const tableBasicRef = document.getElementById('tableBasicRef')
    heightState.subTableHeight = `calc(100vh - ${tableBasicRef?.offsetHeight}px - 84px - ${queryBarHeight.value}px)`
  }

  onMounted(() => {
    getVoConfig()
  })

  return {
    voFields,
    childTableColumns,
    tableBasicRef,
    isShowSubTable,
    ...toRefs(heightState),
    setPosition,
    queryBarHeight,
    attrs,
    queryBarIsShow
  }
}
