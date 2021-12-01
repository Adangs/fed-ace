export default [
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'NotFound',
    component: () => import('@/views/error/404.vue')
  }
]
