import { type RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/formView',
    name: 'formView',
    component: () => import('@/views/form-view.vue')
  }
]
