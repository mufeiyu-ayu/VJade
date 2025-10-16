import { expect, it } from 'vitest'
import { sum } from './index.ts'

it('sum', () => {
  expect(sum(1, 2)).toBe(3)
})
