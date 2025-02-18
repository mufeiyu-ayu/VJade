import { http } from '@ayu-mu/request'
import type { LoginResult } from '../types'
import type { MenuItem } from '@ayu-mu/model'
export const login = (data) => {
  return http.post<LoginResult>('/api/auth/login', data)
}

export const getMenuList = () => {
  return http.get<MenuItem[]>('/api/menu/menu')
}
