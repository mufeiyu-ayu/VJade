import type { MenuItem } from '@ayu-mu/model'
import type { LoginResult } from '../types'
import { http } from '@ayu-mu/request'

export function login(data) {
  return http.post<LoginResult>('/api/auth/login', data)
}

export function getMenuList() {
  return http.get<MenuItem[]>('/api/menu/menu')
}
