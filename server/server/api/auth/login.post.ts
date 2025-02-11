export default defineEventHandler(async (event) => {
  const { password, username } = await readBody(event)
  console.log(password, username, 333)
  if (!username || !password) {
    return useResponseError('用户名或密码不能为空')
  }
  const findUser = MOCK_USERS.find((item) => item.username === username && item.password === password)
  if (!findUser) {
    return useResponseError('暂无此用户')
  }

  const accessToken = generateAccessToken(findUser)
  // const refreshToken = generateRefreshToken(findUser)

  return useResponseSuccess({
    ...findUser,
    accessToken
  })
})
