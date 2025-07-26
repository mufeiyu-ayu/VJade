import { ElButton } from 'element-plus'
import { ref } from 'vue'

export function useActionBar(uid: string) {
  const actionBarBind = ref({
    uid,
    isHideDelete: true,
    isHideRightButton: false,
    deleteAllParams: '',
    leftButtons: () => {
      return (
        <>
          <ElButton type="primary">新增</ElButton>
          <ElButton type="success">编辑</ElButton>
          <ElButton type="warning">删除</ElButton>
          <ElButton type="info">刷新</ElButton>
          <ElButton type="danger">批量删除</ElButton>
        </>
      )
    },
  })
  return {
    actionBarBind,
  }
}
