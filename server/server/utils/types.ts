export interface UserInfo {
  id: number
  password: string
  realName: string
  roles: string[]
  username: string
  createdAt: string
  updatedAt: string
}

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
