import { http } from '@ayu-mu/request'

export const login = (data) => {
  return http.post('/api/auth/login', data)
}
