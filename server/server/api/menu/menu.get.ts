export default defineEventHandler(async (event) => {
  const userinfo = verifyAccessToken(event)
  console.log('userinfo', userinfo)
  if (!userinfo) {
    return unAuthorizedResponse(event)
  }

  // 将用户角色数组转换为查询条件
  const userRoles = JSON.stringify(userinfo.roles).slice(1, -1) // 移除数组的 [] 括号
  const { rows } = await db.sql`
    SELECT * FROM menus 
    WHERE json_extract(roles, '$') LIKE '%' || ${userRoles} || '%'
  `
  console.log('rows', rows)
  return useResponseSuccess({
    data: rows,
  })
})
