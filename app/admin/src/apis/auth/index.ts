import { http } from '@ayu-mu/request'
import type { LoginResult } from '../types'
export const login = (data) => {
  return http.post<LoginResult>('/api/auth/login', data)
}
