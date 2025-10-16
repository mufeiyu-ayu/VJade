import axios from 'axios'

// 注册 mock
vi.mock('axios')

it('mock axios.get', async () => {
  vi.mocked(axios.get).mockResolvedValue({
    data: { code: 200, message: 'success', data: { name: 'John' } },
  })

  const res = await axios.get('/user')
  console.log(res, 'res')
  expect(res.data.data.name).toBe('John')
})
