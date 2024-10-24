import { ElLoading, type FormRules, ElMessage } from 'element-plus'
import { computed, getCurrentInstance, inject, onMounted, reactive, ref, watch } from 'vue'
import { useEventBus } from '@ayu-mu/hooks'
import { useFormStore } from './use-form-store'
import { FormActionEnum, FormStatusEnum } from '../types/enum'
import { type FormViewContentStateType } from '../types/typing'
import {
  EditTypeEnums,
  EventTypeEnum,
  QueryCondition,
  type Recordable,
  ResponseCodeEnum,
  type ViewColumnType
} from '@ayu-mu/model'
import type { FormContentPropsType } from '../component/form-view-content.vue'
import { BaseApi, http, useVoConfig } from '@ayu-mu/request'
import { lengthStrategies } from '../../../../common-strategy/strategies'
import { useFormViewContentComputed } from './use-form-view-content/use-form-view-content-computed'
import { useFormViewContentEvent } from './use-form-view-content/use-form-view-content-event'
import { handleFileRule } from '../config/default-value'
import { useForm } from './use-form'
const { generateValidationRules, handleDefaultValue } = useForm()
export const useFormViewContent: any = () => {
  const { getVoConfig } = useVoConfig()
  const emit = getCurrentInstance()?.emit
  const props = getCurrentInstance()?.props as unknown as FormContentPropsType
  const EventBus = useEventBus([
    EventTypeEnum.FORM_VIEW_CHANGE,
    FormActionEnum.FORM_ACTION_CONFIRM,
    EventTypeEnum.FORM_VIEW_Add_SUCCESS,
    FormActionEnum.FORM_ACTION_RESET,
    FormActionEnum.FORM_ACTION_CANCEL
  ])

  /* @description  表单状态 */
  const formStore = useFormStore()

  /* @description  字段详情数组 */
  const voFields = ref<Array<ViewColumnType>>([])

  /* @description  表单数据 */
  const formData = ref<Recordable<any>>()

  /* @description  请求方法 */
  const requestMethods = ref<BaseApi>()

  /* @description 验证规则 */
  const formRules = ref<FormRules>({})

  /* @description  子表数据 */
  const childTableColumns = ref()

  /* @description  组件 value */
  const primaryKeyValue = inject<Record<string, any>>('formViewState')?.primaryKeyValue

  const formLoadingRef = ref()

  const state = reactive<FormViewContentStateType>({
    //生成表单的配置
    formItemsConfig: [],
    //分组后生成表单的配置
    groupFormItemsConfig: []
  })

  const { disabled, isFullScreen, colSpan, isShowDetail, formItemDisable } = useFormViewContentComputed(
    props,
    formStore,
    formData,
    state,
    childTableColumns
  )

  const {
    handleChange,
    handleTreeChange,
    removeEvent,
    revertRow,
    insertRecord,
    resetForm,
    submit,
    formRef,
    compRef,
    formChildTableRef
  } = useFormViewContentEvent(
    props,
    emit,
    formData,
    EventBus,
    childTableColumns,
    formStore,
    requestMethods,
    state,
    formRules,
    generateValidationRules
  )
  /**
   * @description 表单排几列
   * @returns {Number} 表单排几列
   */
  const getCol = (): number | undefined => {
    // 字段数量
    const length = state.formItemsConfig.length
    if (props.col) {
      return props.col
    } else {
      /* @description  计算字段排多少列 1-3 */
      for (const strategy in lengthStrategies) {
        if (lengthStrategies[strategy](length)) {
          return Number(strategy) // 排几列
        }
      }
    }
  }

  /**
   * 一维数组分为二维数据
   * @example(比如有 30 个数组，分 3 列，就是有 10 组，每组 3 个数组，正好排10 行，每行 3 列)
   * @param {ViewColumnType[]} array 数组
   * @param {Number} chunkSize 分组数量
   */
  const chunkArray = (array: ViewColumnType[], chunkSize: number) => {
    const result = []
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize))
    }
    return result
  }

  // 分组后生成表单的配置
  const groupFormItemsConfig = computed(() => {
    let col = getCol()

    if (isShowDetail.value) {
      col = 24
    }
    return chunkArray(state.formItemsConfig, col!)
  })

  watch(formData, (newValue) => {
    if (props.formStatus === FormStatusEnum.NEW || props.formStatus === FormStatusEnum.EDIT) {
      for (const newValueKey in newValue) {
        handleFileRule(
          newValueKey,
          newValue[newValueKey],
          state,
          formStore,
          props.showRules,
          formRules,
          generateValidationRules
        )
      }
    }
    emit && emit('change', newValue)
    EventBus.emit(EventTypeEnum.FORM_VIEW_CHANGE, newValue)
  })

  /* @description  修改表单配置 */
  const setFormItemsConfig = (data: any) => {
    state.formItemsConfig = data
  }

  /* @description  修改表单某字段值 */
  const setFormItemsFieldConfig = (key: number, value: any) => {
    if (state.formItemsConfig?.[key]) state.formItemsConfig[key] = value
  }

  const reqData = (formData: any, item: any) => {
    return new QueryCondition(item.refs?.split('=')?.[1], 'eq', formData[item.refs?.split('=')?.[0]], 'and')
  }

  // 得到表单默认数据
  const initFormData = async () => {
    const loading = ElLoading.service({
      target: formLoadingRef.value // 要覆盖的 dom 节点(此时未初始化)
    })

    const res = await requestMethods.value?.edit(primaryKeyValue)
    if (res?.data) formData.value = res.data
    if (props.formStatus === FormStatusEnum.VIEW) {
      formStore.state.disabled = true
    }
    loading.close()
  }
  const generateFormItem = async () => {
    // eslint-disable-next-line prefer-const
    let { fields, options } = await getVoConfig(props?.voName, props?.service, props.urlPrefix, props?.url)
    requestMethods.value = options

    // 根据 index 排序
    fields = fields.sort((a, b) => a.index - b.index)

    // 筛选
    fields = fields.filter((item) => item.editType)
    //收集 field 字段
    //子表列
    childTableColumns.value = fields.filter((item: any) => item.editType === EditTypeEnums.DETAILS)
    voFields.value = fields.filter((item: any) => item.editType !== EditTypeEnums.DETAILS)

    //用户自己选择 fields 字段数组
    if (props.columnList) fields = props.columnList

    //生成验证规则
    formRules.value = generateValidationRules(fields)

    // 生成默认值
    formData.value = handleDefaultValue(fields)

    //生成分组后的表单项配置
    // createGroupFormItemsConfig()
    // BUG 这里请求获取的数据猫会将上方的默认值覆盖掉
    if (props.formStatus !== FormStatusEnum.NEW) {
      initFormData()
    }
  }

  //表单提交
  EventBus.on(FormActionEnum.FORM_ACTION_CONFIRM, (isMultiply) => {
    submit(isMultiply as boolean[])
  })

  // 表单取消
  EventBus.on(FormActionEnum.FORM_ACTION_CANCEL, () => emit && emit('close'))

  // 表单重置
  EventBus.on(FormActionEnum.FORM_ACTION_RESET, () => {
    resetForm()
  })

  const isUploadImage = (file: any) => {
    return Reflect.has(file, 'originalName')
  }
  //删除文件 TODO  文件的类型
  const deleteFile = async (data: any) => {
    console.log(data)
    if (isUploadImage(data)) {
      const result = await http?.remove('/system/affix/delete', [data.id])
      if (result?.code === ResponseCodeEnum.SUCCESS) {
        ElMessage.success('删除成功')
      }
    }
  }

  // 设置表单数据
  const setFormData = (key: number, value: any, isAll: boolean) => {
    if (isAll) formData.value = value
    else if (formData.value) formData.value[key] = value
  }
  onMounted(async () => {
    if (props?.voName) {
      await generateFormItem()
    }
  })

  return {
    formRules,
    state,
    formData,
    voFields,
    formRef,
    compRef,
    reqData,
    disabled,
    colSpan,
    setFormItemsConfig,
    setFormItemsFieldConfig,
    formChildTableRef,
    childTableColumns,
    insertRecord,
    removeEvent,
    revertRow,
    submit,
    resetForm,
    handleTreeChange,
    handleChange,
    // componentRenderStrategy,
    formLoadingRef,
    setFormData,
    deleteFile,
    isShowDetail,
    groupFormItemsConfig,
    isFullScreen,
    formItemDisable
  }
}
