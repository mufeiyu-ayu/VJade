export default defineEventHandler(async (event) => {
  const { password, username } = await readBody(event)

  if (!username || !password) {
    return useResponseError('用户名或密码不能为空')
  }

  // 从数据库查询用户
  const { rows } = await db.sql`SELECT * FROM users WHERE username = ${username} AND password = ${password}`
  if (!rows.length)
    return
  console.log(rows)

  // 解析 JSON 字符串格式的 roles
  const userWithParsedRoles = {
    ...rows[0],
    roles: JSON.parse(rows[0].roles as string),
  } as UserInfo

  const accessToken = generateAccessToken(userWithParsedRoles)

  // 延迟 3 秒返回
  await new Promise(resolve => setTimeout(resolve, 300))
  return useResponseSuccess({
    data: {
      ...userWithParsedRoles,
      accessToken,
    },
  })
})
