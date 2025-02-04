export interface MockFormData {
  // id
  id: number
  // 名称
  name: string
  // 年龄
  age: number
  // 邮箱
  email: string
  // 电话
  phone: string
  // 地址
  address: string
  // 创建时间
  createTime: string
  // 更新时间
  updateTime: string
  // 金额
  money: number
  // 性别
  sex: string
  // 状态
  status: string
  // 备注
  remark: string
  // 是否删除
  isDelete: boolean
  // 是否启用
  isEnable: boolean
}

export const mockFormData: MockFormData = {
  id: 1,
  name: '张三',
  age: 18,
  email: 'zhangsan@163.com',
  phone: '12345678901',
  address: '北京市海淀区',
  createTime: '2021-01-01 12:00:00',
  updateTime: '2021-01-01 12:00:00',
  money: 1000,
  sex: '男',
  status: '启用',
  remark: '备注',
  isDelete: false,
  isEnable: true
}
