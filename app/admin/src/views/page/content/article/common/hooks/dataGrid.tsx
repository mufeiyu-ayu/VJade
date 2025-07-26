import type { TableProps } from '@ayu-mu/core-common'

import type { Ref } from 'vue'
import { ref } from 'vue'
import { getTableDataApi } from '@/apis'

interface DataGridParams {
  uid: string
}
interface FoundManageItem {
  id: string // 数据项 ID
  businessId: string // 业务 ID
  employeeAccount: string // 员工账户
  type: 10 | 20 | 30 | 40 // 类型 (10订单扣款，20订单退款，30充值，40提现)
  price: number // 价格
  beforeBalance: number // 变动前金额
  afterBalance: number // 变动后金额
  remark: string // 备注
  [key: string]: string | number // 索引签名，兼容 TableRecord 类型
}

/**
 * 厂商管理-表格 hooks
 * @param params DataGridParams
 * @returns tableBind
 */
export function useDataGrid({ uid }: DataGridParams): { tableBind: Ref<TableProps<FoundManageItem>> } {
  const tableBind = ref<TableProps<FoundManageItem>>({
    uid,
    tableConfig: {
      border: true,
      stripe: true,
      height: '100%',
    },
    tableColumns: [
      {
        field: 'businessId',
        title: '业务主键编号',
      },
      {
        field: 'employeeAccount',
        title: '员工账户',
      },
      {
        field: 'type',
        title: '资金明细类型',
        // 10订单扣款 ，20 订单退款，30 充值，40 提现
        render: ({ row }) => {
          return row.type === 10 ? '订单扣款' : row.type === 20 ? '订单退款' : row.type === 30 ? '充值' : '提现'
        },
      },
      {
        field: 'price',
        title: '价格',
      },
      {
        field: 'beforeBalance',
        title: '变动前金额',
      },
      {
        field: 'afterBalance',
        title: '变动后金额',
      },
      {
        field: 'remark',
        title: '备注',
      },
    ],
    getTableData: getTableDataApi,
    showOperation: false,
    hideCheckbox: false,
  })
  return { tableBind }
}
