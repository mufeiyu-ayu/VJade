import { http } from '@ayu-mu/request'

export const getFormData = () => {
  return http.get('api/form')
}

export const postFormData = (data: any) => {
  return http.post('api/form', data)
}
