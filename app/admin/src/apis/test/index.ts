import { http } from '@ayu-mu/request'

export function getFormData() {
  return http.get('api/form')
}

export function postFormData(data: unknown) {
  return http.post('api/form', data)
}
