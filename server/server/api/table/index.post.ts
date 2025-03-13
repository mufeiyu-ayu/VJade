export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const page = body.page || 1
  const pageSize = body.pageSize || 10

  const allData = mockTableData()
  const start = (page - 1) * pageSize
  const end = start + pageSize

  // 添加1-3秒的随机延迟
  // const delay = Math.floor(Math.random() * 2000) + 1000 // 1000-3000ms
  await new Promise((resolve) => setTimeout(resolve, 500))

  return useResponseSuccess({
    data: {
      list: allData.slice(start, end),
      total: allData.length,
      page,
      pageSize
    }
  })
})
