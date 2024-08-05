// import { FormRules } from 'element-plus'
// import { computed, getCurrentInstance, inject, onMounted, reactive, ref, watch } from 'vue'
// import { useEventBus } from '@ayu/hooks'
// import { useFormStore } from './use-form-store'
// import { FormActionEnum, FormStatusEnum } from '../types/enum'
// import { FormViewContentStateType } from '../types/typing'
// import { EditTypeEnums, EventTypeEnum, QueryCondition, Recordable, ResponseCodeEnum, ViewColumnType } from '@ayu/model'
// import type { FormContentPropsType } from '../component/form-view-content.vue'
// import { BaseApi, http, useVoConfig } from '@ayu/request'

// export const useFormViewContent: any = () => {
//   const { getVoConfig } = useVoConfig()
//   const emit = getCurrentInstance()?.emit
//   const props = getCurrentInstance()?.props as unknown as FormContentPropsType
//   const EventBus = useEventBus([
//     EventTypeEnum.FORM_VIEW_CHANGE,
//     FormActionEnum.FORM_ACTION_CONFIRM,
//     EventTypeEnum.FORM_VIEW_Add_SUCCESS,
//     FormActionEnum.FORM_ACTION_RESET,
//     FormActionEnum.FORM_ACTION_CANCEL
//   ])

//   // 表单状态
//   const formStore = useFormStore()

//   // 字段数组
//   const voFields = ref<Array<ViewColumnType>>([])

//   //表单数据
//   const formData = ref<Recordable<any>>()

//   // 请求方法
//   const requestMethods = ref<BaseApi>()

//   // 验证规则
//   const formRules = ref<FormRules>({})

//   // 子表列数据
//   const primaryKeyValue = inject<Record<string, any>>('formViewState')?.primaryKeyValue

//   const formLoadingRef = ref()

//   const state = reactive<FormViewContentStateType>({
//     //生成表单的配置
//     formItemsConfig: [],
//     //分组后生成表单的配置
//     groupFormItemsConfig: []
//   })

//   /**
//    * 一维数组分为二维数据
//    * @param {ViewColumnType[]} array 数组
//    * @param {Number} chunkSize 分组数量
//    */
//   const chunkArray = (array: ViewColumnType[], chunkSize: number) => {
//     const result = []
//     for (let i = 0; i < array.length; i += chunkSize) {
//       result.push(array.slice(i, i + chunkSize))
//     }
//     return result
//   }

//   // 分组后生成表单的配置
//   const groupFormItemsConfig = computed(() => {
//     let col = getCol()

//     if (isShowDetail.value) {
//       col = 24
//     }
//     return chunkArray(state.formItemsConfig, col!)
//   })

//   /**
//    * 计算排列多少列
//    * @returns {Number}
//    */
//   const getCol = (): number | undefined => {
//     // 字段数量
//     const length = state.formItemsConfig.length
//     if (props.col) {
//       return props.col
//     } else {
//       for (const strategy in lengthStrategies) {
//         if (lengthStrategies[strategy](length)) {
//           return Number(strategy)
//         }
//       }
//     }
//   }
// }
