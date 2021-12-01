import { Router, RouteRecordRaw } from 'vue-router'
import { local_storage } from '@/utils/storage'
// import $store from '@/store'

const whiteList = ['/', '/404']
export function createRouterGuards(router: Router) {
  router.beforeEach(async (to, from, next) => {
    const Loading = window['$loading'] || null
    Loading && Loading.start()
    if (local_storage.get('token')) {
      if (to.path === '/login') {
        next({ path: '#/' })
      } else {
        // const { accountId } = $store.getters
        const accountId = null
        if (accountId) {
          // 判断当前用户是否已拉取完user_info信息
          next()
        } else {
          try {
            // await $store.dispatch('user/getUserInfo')
            // await $store.dispatch('permission/generateRoutes')
            // const permissionRoutes: RouteRecordRaw[] = $store.state.permission.permissionRoutes
            // permissionRoutes.forEach((route) => {
            //   router.addRoute(route)
            // })
            next({
              ...to,
              replace: true
            })
          } catch (e) {
            // 清除本地缓存用户数据并跳转到登录页重新登录
            // $store.dispatch('user/logout')
            next(`#/login?redirect=${to.fullPath}`)
          }
        }
      }
    } else {
      if (whiteList.includes(to.path)) {
        // 在免登录白名单中，直接进入
        next()
      } else {
        // 其他没有访问权限的页面将重定向到登录页面。
        next(`#/login?redirect=${to.fullPath}`)
      }
    }
  })

  router.afterEach((to, from, failure) => {
    const Loading = window['$loading'] || null
    Loading && Loading.finish()
  })

  router.onError((error) => {
    console.log(error, '路由错误')
  })
}
