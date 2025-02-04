import { http } from '@ayu-mu/request'

export const testApi = () => {
  return http.get('api/test')
}
