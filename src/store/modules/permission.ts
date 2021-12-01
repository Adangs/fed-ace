import { sortedRoutes as asyncRoutes } from '@/router'
import { RouteRecordRaw } from 'vue-router'
import { ActionContext } from 'vuex'
import { IStore } from '../types'

/**
 * 判断权限
 * @param authorities
 * @param route
 */
function hasPermission(authorities: string[], route: RouteRecordRaw) {
  if (route?.meta?.authority) {
    return authorities.includes(route.meta.authority as string)
  }
  return true
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 */
function filterAsyncRoutes(routes: RouteRecordRaw[], authorities: string[]) {
  const res: RouteRecordRaw[] = []

  routes.forEach((route) => {
    const tmp: RouteRecordRaw = { ...route }
    if (hasPermission(authorities, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, authorities)
      }
      res.push(tmp)
    }
  })

  return res
}

export interface IPermissionState {
  permissionRoutes: RouteRecordRaw[]
}

const state = () => ({
  permissionRoutes: []
})

const actions = {
  generateRoutes({ commit, rootState }: ActionContext<IPermissionState, IStore>) {
    // 获取当前用户权限集合
    const authorities = rootState.user.userInfo.authorizationList
    return new Promise((resolve) => {
      const accessedRoutes = filterAsyncRoutes(asyncRoutes, authorities)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

const mutations = {
  SET_ROUTES: (state: IPermissionState, routes: RouteRecordRaw[]) => {
    state.permissionRoutes = routes
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
