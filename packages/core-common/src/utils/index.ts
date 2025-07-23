import type { App } from 'vue'
import {
  Loading,
  VxeInput,
  VxeLoading,
  VxeTooltip,
  VxeUI,
} from 'vxe-pc-ui'
import {
  VxeColgroup,
  VxeColumn,
  VxeTable,
} from 'vxe-table'
import zhCN from 'vxe-table/lib/locale/lang/zh-CN'

/**
 * VXE 组件库插件
 * 自动注册 VXETable 和 VXE-UI 相关组件
 */
const VXEPlugin = {
  install(app: App): void {
    // 注册 VXE-UI 组件
    app.use(VxeInput)
    app.use(VxeTooltip)
    app.use(VxeLoading)
    app.use(Loading)

    // 设置 VXE-UI 国际化
    VxeUI.setI18n('zh-CN', zhCN)
    VxeUI.setLanguage('zh-CN')

    // 注册 VXETable 组件
    app.use(VxeTable)
    app.use(VxeColumn)
    app.use(VxeColgroup)
  },
}

/**
 * 设置 VXE-UI 主题
 * @param theme - 主题类型，可选值为 'light' 或 'dark'
 */
function setTheme(theme: 'light' | 'dark') {
  VxeUI.setTheme(theme)
}
export { setTheme, VXEPlugin }
