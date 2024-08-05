// import { dateEquals, type FormRules } from 'element-plus'
// import { computed, getCurrentInstance, inject, onMounted, reactive, ref, watch } from 'vue'
// import { useEventBus } from '@ayu/hooks'
// import { useFormStore } from './use-form-store'
// import { FormActionEnum, FormStatusEnum } from '../types/enum'
// import { FormViewContentStateType } from '../types/typing'
// import {
//   EditTypeEnums,
//   EventTypeEnum,
//   QueryCondition,
//   type Recordable,
//   ResponseCodeEnum,
//   type ViewColumnType
// } from '@ayu/model'
// import type { FormContentPropsType } from '../component/form-view-content.vue'
// import { BaseApi, http, useVoConfig } from '@ayu/request'
// import { lengthStrategies } from '../../../../common-strategy/strategies'
// import { useFormViewContentComputed } from './use-form-view-content/use-form-view-content-computed'
// import { useFormViewContentEvent } from './use-form-view-content/use-form-view-content-event'
// import { handleFileRule } from '../config/default-value'
// import { useForm } from './use-form'
// const { generateValidationRules, handleDefaultValue } = useForm()
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

//   /* @description  表单状态 */
//   const formStore = useFormStore()

//   /* @description  字段详情数组 */
//   const voFields = ref<Array<ViewColumnType>>([])

//   /* @description  表单数据 */
//   const formData = ref<Recordable<any>>()

//   /* @description  请求方法 */
//   const requestMethods = ref<BaseApi>()

//   /* @description 验证规则 */
//   const formRules = ref<FormRules>({})

//   /* @description  子表数据 */
//   const childTableColumns = ref()

//   /* @description  组件 value */
//   const primaryKeyValue = inject<Record<string, any>>('formViewState')?.primaryKeyValue

//   const formLoadingRef = ref()

//   const state = reactive<FormViewContentStateType>({
//     //生成表单的配置
//     formItemsConfig: [],
//     //分组后生成表单的配置
//     groupFormItemsConfig: []
//   })

//   const { disabled, isFullScreen, colSpan, isShowDetail, formItemDisable } = useFormViewContentComputed(
//     props,
//     formStore,
//     formData,
//     state,
//     childTableColumns
//   )

//   const {
//     handleChange,
//     handleTreeChange,
//     removeEvent,
//     revertRow,
//     insertRecord,
//     resetForm,
//     submit,
//     formRef,
//     compRef,
//     formChildTableRef
//   } = useFormViewContentEvent(
//     props,
//     emit,
//     formData,
//     EventBus,
//     childTableColumns,
//     formStore,
//     requestMethods,
//     state,
//     formRules,
//     generateValidationRules
//   )
//   /**
//    * @description 表单排几列
//    * @returns {Number} 表单排几列
//    */
//   const getCol = (): number | undefined => {
//     // 字段数量
//     const length = state.formItemsConfig.length
//     if (props.col) {
//       return props.col
//     } else {
//       /* @description  计算字段排多少列 1-3 */
//       for (const strategy in lengthStrategies) {
//         if (lengthStrategies[strategy](length)) {
//           return Number(strategy) // 排几列
//         }
//       }
//     }
//   }

//   /**
//    * 一维数组分为二维数据
//    * @example(比如有 30 个数组，分 3 列，就是有 10 组，每组 3 个数组，正好排10 行，每行 3 列)
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

//   watch(formData, (newValue) => {
//     if (props.formStatus === FormStatusEnum.NEW || props.formStatus === FormStatusEnum.EDIT) {
//       for (const newValueKey in newValue) {
//         handleFileRule(
//           newValueKey,
//           newValue[newValueKey],
//           state,
//           formStore,
//           props.showRules,
//           formRules,
//           generateValidationRules
//         )
//       }
//     }
//     emit && emit('change', newValue)
//     EventBus.emit(EventTypeEnum.FORM_VIEW_CHANGE, newValue)
//   })
// }
