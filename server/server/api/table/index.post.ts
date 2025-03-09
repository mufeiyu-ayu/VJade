export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const page = body.page || 1
  const pageSize = 10

  const allData = mockTableData()
  const start = (page - 1) * pageSize
  const end = start + pageSize

  return useResponseSuccess({
    data: {
      list: allData.slice(start, end),
      total: allData.length,
      page,
      pageSize
    }
  })
})
