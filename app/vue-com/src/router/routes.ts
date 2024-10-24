import { type RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/formView',
    name: 'formView',
    component: () => import('@/views/form-view.vue')
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('@/views/test.vue')
  }
]
