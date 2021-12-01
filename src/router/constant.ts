export default [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      hidden: false
    }
  },
  {
    path: '/404',
    component: () => import('@/views/error/404.vue'),
    meta: {
      hidden: false
    }
  }
]
