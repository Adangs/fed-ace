import { Router } from 'vue-router'

export function createRouterGuards(router: Router) {
  router.beforeEach(async (to, from, next) => {
    const Loading = window['$loading'] || null
    Loading && Loading.start()
    next()
  })

  router.afterEach((to, from, failure) => {
    const Loading = window['$loading'] || null
    Loading && Loading.finish()
  })

  router.onError((error) => {
    console.log(error, '路由错误')
  })
}
