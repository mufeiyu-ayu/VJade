export interface dataGridItem {
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

export interface dataGridResponse {
  record: dataGridItem[]
  total: number
  pageNum: number
  pageSize: number
}
