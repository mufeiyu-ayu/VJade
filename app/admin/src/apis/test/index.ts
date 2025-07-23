import type { dataGridResponse } from '../types/index'
import { http } from '@ayu-mu/request'

export function getFormData() {
  return http.get('/api/form')
}

export function postFormData(data: unknown) {
  return http.post('/api/form', data)
}

export function getTableDataApi(params: { pageNum: number, pageSize: number }) {
  return http.post<dataGridResponse>('/api/datagrid', params)
}
