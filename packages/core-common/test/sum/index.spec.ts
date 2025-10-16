import { sum } from './index.ts'

it('sum', () => {
  expect(sum(1, 2)).toBe(3)
})

const mockSum = vi.fn().mockImplementation(sum)
mockSum(2, 3)
console.log(mockSum.getMockName(), '--11')
console.log(mockSum.getMockImplementation(), '--')
console.log(mockSum.getMockImplementation(), '--')
