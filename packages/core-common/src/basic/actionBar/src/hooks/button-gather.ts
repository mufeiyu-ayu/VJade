import { Refresh, Search } from '@element-plus/icons-vue'

export const rightButtonsGather = [
  {
    code: 'search',
    title: '搜索',
    icon: Search,
    plain: true,
    circle: true,
    type: 'primary',
  },
  // {
  //   code: 'import',
  //   title: '导入',
  //   icon: Folder,
  //   plain: true,
  //   circle: true,
  //   type: 'primary',
  // },
  // {
  //   code: 'export',
  //   title: '导出',
  //   icon: FolderOpened,
  //   plain: true,
  //   circle: true,
  //   type: 'primary',
  // },
  {
    code: 'reset',
    title: '刷新',
    icon: Refresh,
    plain: true,
    circle: true,
    type: 'primary',
  },
] as const
