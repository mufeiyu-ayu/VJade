export default defineEventHandler(async (event) => {
  const userinfo = verifyAccessToken(event)
  if (!userinfo) {
    return unAuthorizedResponse(event)
  }

  // return useResponseSuccess({
  //   data: menuList
  // })
})
