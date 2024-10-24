import type { Recordable } from '@ayu/model'
import {
  EditTypeEnums,
  EventTypeEnum,
  type LookupOptionType,
  ResponseCodeEnum,
  type TreeOptionType,
  type ViewColumnType
} from '@ayu/model'

import { BaseApi } from '@ayu/request'
import { ElForm, ElMessage, ElMessageBox } from 'element-plus'
import { type Ref, ref } from 'vue'
import { handleFileRule } from '../../config/default-value'

/**
 *
 * @param props 组件props
 * @param emit 组件emits
 * @param formData 表单数据
 * @param EventBus 全局bus
 * @param childTableColumns 子列表数据
 * @param formStore 表单状态
 * @param requestMethods 请求方法
 * @returns
 */

export const useFormViewContentEvent = (
  props: any,
  emit: any,
  formData: Ref<Recordable<any> | undefined>,
  EventBus: any,
  childTableColumns: Ref,
  formStore: any,
  requestMethods: Ref<BaseApi | undefined>,
  state: any,
  formRules: any,
  generateValidationRules: any
): any => {
  /* @description  组件实例 */
  const compRef = ref<Array<any>>()

  /* @description  表单引用 */
  const formChildTableRef = ref<any>()

  const formRef = ref<InstanceType<typeof ElForm>>()
  /**
   * @description 重置lookup
   */
  const handlerClearLookup = () => {
    compRef.value?.forEach((item: any) => {
      if (item.lookupRef) {
        item.onReset()
      }
    })
  }

  /**
   * 子表删除事件
   * @param {*} any 当前行
   * @param {Number} index 索引
   */
  const removeEvent = async (row: any, index: number) => {
    const $table = formChildTableRef.value[index].fsTableRef
    if ($table) {
      ElMessageBox.confirm('你确定需要删除当前数据吗？', '提示', { type: 'warning', draggable: true })
        .then(async () => {
          $table.remove(row)
        })
        .catch(() => {})
    }
  }

  /**
   * 子表重置事件
   * @param row
   * @param {Number} index 索引
   */
  const revertRow = (row: any, index: number | string) => {
    const $table = formChildTableRef.value[index].fsTableRef
    if ($table) {
      return $table.revertData(row)
    }
  }

  /**
   * 子表添加事件
   * @param {Number} index 索引
   */
  const insertRecord = async (index: number) => {
    const $table = formChildTableRef.value[index].fsTableRef
    if ($table) {
      const record = {
        id: ''
      }
      console.log($table.insertAt)
      const { row: newRow } = await $table.insertAt(record, undefined)
      await $table.setEditCell(newRow, 'id')
    }
  }

  /**
   * 通过map映射设置表单数据
   */
  const setFormDataByMap = (data: any, map: Record<string, string>) => {
    //将value赋值给key
    for (const key in map) {
      const value = map[key]
      formData.value && (formData.value[key] = data?.[value])
    }
    EventBus.emit(EventTypeEnum.FORM_VIEW_CHANGE, formData.value)
  }

  /**
   * 下拉表格(查找带回)事件
   * @param data 返回数据
   * @param config 字段vo配置
   */
  const handleChange = (data: any, config: ViewColumnType) => {
    const map = (config.editOption?.customs as LookupOptionType)?.map || {}
    for (const newValueKey in formData.value) {
      if (config.property === newValueKey) {
        handleFileRule(
          newValueKey,
          formData.value[newValueKey],
          state,
          formStore,
          props.showRules,
          formRules,
          generateValidationRules
        )
      }
    }

    let pass = false
    for (let i = 0; i < props.showRules?.length; i = i + 1) {
      if (pass) {
        const formItem = formStore.state.formItemsConfig.find(
          (_item: any) => _item.property === props.showRules[i].field
        )
        formData.value![formItem.property] = formItem?.editOption?.customs?.defaultValue
      }
      if (props.showRules[i].field === config.property) {
        pass = true
      }
    }
    setFormDataByMap(data, map)
  }

  /**
   * 下拉树改变事件
   * @param data 返回数据
   * @param config 字段vo配置
   */
  const handleTreeChange = (data: any, config: ViewColumnType) => {
    const map = (config.editOption?.customs as TreeOptionType).map || {}
    setFormDataByMap(data, map)
  }

  /**
   * 重置表单
   */
  const resetForm = () => {
    formRef.value?.resetFields()
    handlerFileUpload('clean')
  }

  /**
   * 处理文件上传
   * @param {Function} target 操作
   */
  const handlerFileUpload = async (target: 'submit' | 'clean') => {
    // 判断是否有文件上传组件
    let uploadRefs = []
    if (props.uploadRefs) uploadRefs = props.uploadRefs
    else uploadRefs = compRef.value?.filter((item) => item.UploadRef) as InstanceType<any>[]
    if (uploadRefs && uploadRefs.length > 0) {
      const files = []
      const types = []
      for (let i = 0; i < uploadRefs.length; i += 1) {
        if (target === 'submit') {
          const file = await uploadRefs[i].getFileList()
          const type = await uploadRefs[i].getFileType()
          if (type) {
            // 生成保存时的types字段
            const names = file.map((item: any) => item.name)
            const typeItem = { type, names }
            types.push(typeItem)
          }
          files.push(...file)
          // await uploadRefs[i].onDeleteFile()
          // return await uploadRefs[i].onSubmitUpload()
        }
        if (target === 'clean') {
          files.push(uploadRefs[i]?.UploadRef?.clearFiles())
        }
      }
      return [files, types]
    }
    return []
  }

  /**
   * 表单提交
   * @param {Boolean[]} isMultiply 批量提交
   */
  const submit = (isMultiply: boolean[]) => {
    // 表单验证
    formRef.value?.validate(async (valid: boolean) => {
      if (!valid) return

      // 校验主子表编辑表格输入
      if (formChildTableRef.value)
        for (const item of formChildTableRef.value) {
          const errMap = await item.fsTableRef.fullValidate().catch((errMap: any) => errMap)
          if (errMap) {
            Object.values(errMap).forEach((errList: any) => {
              errList.forEach((params: any) => {
                const { rowIndex, column, rules } = params
                rules.forEach((rule: any) => {
                  ElMessage.error(`第 ${rowIndex + 1} 行 ${column.title} 校验错误：${rule.message}`)
                })
              })
            })
            return
          }
        }

      // 处理主子表数据
      for (let i = 0; i < childTableColumns.value.length; i += 1) {
        if (formData.value) {
          const arr: any = []
          formChildTableRef.value?.[i]?.fsTableRef.getTableData().tableData.forEach((item: any) => {
            if (item?._X_ROW_KEY?.includes('row_')) delete item._X_ROW_KEY
            arr.push(item)
          })
          formData.value[childTableColumns.value[i].property] = arr
        }
      }

      // 校验回调
      if (props.validateCallBack) {
        if (props.validateCallBack()) return
      }

      // 如果不要需要上传附件调用普通接口
      let result
      const hasFileField = formStore.state.formItemsConfig.some((item: any) => item.editType === EditTypeEnums.FILE)
      if (hasFileField) {
        // 验证通过调用保存接口
        result = await requestMethods.value?.addAndFile({ data: formData.value })
      } else {
        result = await requestMethods.value?.add(formData.value)
      }

      if (result?.code === ResponseCodeEnum.SUCCESS) {
        formRef.value?.resetFields()
        handlerClearLookup()
        EventBus.emit(EventTypeEnum.FORM_VIEW_Add_SUCCESS)
        EventBus.emit(`${props?.voName}:${EventTypeEnum.TABLE_GRID_RESET}`, result.data)
      }
      if (!(isMultiply as boolean[])[0] && result?.code === ResponseCodeEnum.SUCCESS) {
        emit && emit('close', true)
      }
    })
  }

  return {
    handlerClearLookup,
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
  }
}
