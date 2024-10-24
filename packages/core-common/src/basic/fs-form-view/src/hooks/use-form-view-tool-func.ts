/**
 * 提供一些工具方法给外部用
 * @param formContent
 * @returns
 */
export const useFormViewToolFuc = (formContent: any) => {
  /**
   *
   *@description 设置表单数据
   * @param {*} newData
   */
  const setFormData = (newData: any) => {
    formContent.value.formData = newData
  }

  /**
   *
   *@description 获取表单数据
   * @returns
   */
  const getFormData = () => {
    return formContent.value.formData
  }

  /**
   *
   *@description 重置表单
   * @returns
   */
  const resetForm = () => {
    formContent.value.resetForm()
  }

  return {
    setFormData,
    resetForm,
    getFormData
  }
}
