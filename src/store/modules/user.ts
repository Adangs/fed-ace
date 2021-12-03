import { ActionContext } from 'vuex'
import { local_storage, session_storage } from '@/utils/storage'
import { IPermissionState } from '@/store/modules/permission'
import { IStore } from '../types'

export type IUserInfo = {
  accountId: number
  userName: string
  authorizationList: string[]
}
export type IUserState = {
  token: string
  userInfo: IUserInfo
}

const state = {
  token: local_storage.get('token') || null,
  userInfo: {
    accountId: null,
    userName: null,
    authorizationList: []
  }
}

const mutations = {
  SET_TOKEN: (state: IUserState, token: string) => {
    state.token = token
  },
  SET_USERINFO: (state: IUserState, userInfo: IUserInfo) => {
    state.userInfo = userInfo
  }
}

const actions = {
  // 扫码登录
  async login({ commit }: ActionContext<IUserState, IStore>) {
    return new Promise((resolve, reject) => {
      const token = +new Date()
      commit('SET_TOKEN', token)
      local_storage.set('token', token)
      resolve(token)
    })
  },
  // 获取用户信息
  getUserInfo({ commit }: ActionContext<IPermissionState, IStore>) {
    return new Promise((resolve, reject) => {
      const data = {
        accountId: 1,
        userName: 'Adang',
        authorizationList: ['admin']
      }
      commit('SET_USERINFO', data)
      resolve(data)
    })
  },
  // 退出，清除用户信息
  logout({ commit }: ActionContext<IPermissionState, IStore>) {
    return new Promise((resolve) => {
      commit('SET_TOKEN', null)
      commit('SET_USERINFO', {
        accountId: null,
        userName: null,
        authorizationList: []
      })
      // 清除本地所有缓存
      session_storage.clear()
      // 清除本地所有缓存
      local_storage.remove('token')
      resolve(null)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
