export interface ChildTableConfig {
  /* @description  是否开启子表 */
  enable: boolean
  /* @description  子表 vo 名称 */
  masterVoName?: string
  /* @description 子表单条记录 */
  childItem?: Record<string, any>
  /* @description  是否展示子表 */
  isShowSubTable?: boolean
  /* @description 是否是表单子表，表单子表和普通子表的高度 Eventbus 不同 */
  isFormChildTable?: boolean
}

export interface TableSlotConfig {
  /* @description  主子表插槽列表 */
  slotList: Array<string>
  /* @description  子表插槽列表 */
  slotListChild: Record<string, Array<string>>
}
