import { defineEventHandler, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  try {
    // 读取请求体数据
    const body = await readBody<MockFormData>(event)

    // 验证必要字段
    if (!body.name) {
      return useResponseError('姓名不能为空')
    }

    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return useResponseError('邮箱格式不正确')
    }

    // 验证手机号格式
    const phoneRegex = /^1[3-9]\d{9}$/
    if (!phoneRegex.test(body.phone)) {
      return useResponseError('手机号格式不正确')
    }

    const now = new Date().toISOString()

    // 构建保存的数据
    const savedForm = {
      id: Date.now(),
      name: body.name,
      age: body.age,
      email: body.email,
      phone: body.phone,
      address: body.address,
      createTime: now,
      updateTime: now,
      money: body.money,
      sex: body.sex,
      status: body.status,
      remark: body.remark || '',
      isDelete: false,
      isEnable: body.isEnable
    }
    console.log(savedForm, 'savedForm')
    // 返回成功响应
    return useResponseSuccess({})
  } catch (error) {
    // 捕获并处理错误
    console.error('保存表单失败:', error)
    return useResponseError('保存表单失败')
  }
})
