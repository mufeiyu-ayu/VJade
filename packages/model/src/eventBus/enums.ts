/**
 * 事件总线枚举类型
 */
export enum EventTypeEnum {
  /**
   * 操作栏导出点击事件
   */
  ACTION_BAR_EXPORT_CLICK = 'action_bar_export_click',
  /**
   * 操作栏下拉选中点击事件
   */
  ACTION_BAR_SELECT_CLICK = 'action_bar_select_click',
  /**
   * 操作栏下拉选中顺序改变事件
   */
  ACTION_BAR_SELECT_CHANGE = 'action_bar_select_change',
  /**
   * 操作栏下拉选中固定列事件
   */
  ACTION_BAR_SELECT_FIXED = 'action_bar_select_fixed',
  /**
   * 操作栏状态隐藏
   */
  ACTION_BAR_STATUS_HIDE = 'action_bar_status_hide',
  /**
   * 搜索栏显示状态
   */
  QUERY_BAR_SHOW = 'query_bar_show',
  /**
   * 搜索栏打开成功
   */
  QUERY_BAR_SHOW_SUCCESS = 'query_bar_show_success',
  /**
   * 搜索栏查询点击事件
   */
  QUERY_BAR_SEARCH_CLICK = 'query_bar_search_click',
  /**
   * 表格选中变化事件
   */
  TABLE_GRID_SELECT_CHANGE = 'table_grid_select_change',
  /**
   * 表格选中变化事件
   */
  TABLE_GRID_CURRENT_CHANGE = 'table_grid_current_change',
  /**
   * 表格重置事件
   */
  TABLE_GRID_RESET = 'table_grid_reset',
  /**
   * 表格批量保存
   */
  TABLE_GRID_BATCH_UPDATE = 'table_grid_batch_update',
  /**
   * 表格批量移除选择
   */
  TABLE_GRID_BATCH_REMOVE_SELECT = 'table_grid_batch_remove_select',

  /**
   * 表格状态隐藏
   */
  TABLE_GRID_STATUS_HIDE = 'table_grid_status_hide',
  /**
   * 表单添加状态
   */
  FORM_VIEW_ADD = 'form_view_add',
  /**
   * 表单添加成功
   */
  FORM_VIEW_Add_SUCCESS = 'form_view_add_success',
  /**
   * 表单编辑状态
   */
  FORM_VIEW_EDIT = 'form_view_edit',
  /**
   * 表单查看状态
   */
  FORM_VIEW_VIEW = 'form_view_view',
  /**
   * 表单数据改变
   */
  FORM_VIEW_CHANGE = 'form_view_change',
  /**
   * 自定义对话框显示状态
   */
  CUSTOM_DIALOG_SHOW = 'custom_dialog_show'
}
