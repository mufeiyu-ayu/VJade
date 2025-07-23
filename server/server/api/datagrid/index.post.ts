export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const pageNum = body.pageNum || 1
  const pageSize = body.pageSize || 10

  const allData = mockTableData2()
  const start = (pageNum - 1) * pageSize
  const end = start + pageSize

  // 添加1-3秒的随机延迟
  // const delay = Math.floor(Math.random() * 2000) + 1000 // 1000-3000ms
  await new Promise(resolve => setTimeout(resolve, 500))

  return useResponseSuccess({
    data: {
      record: allData.slice(start, end),
      total: allData.length,
      pageNum,
      pageSize,
    },
  })
})
