import { ActionContext } from 'vuex'
import { IStore } from '../types'

export type IPagesState = {
  current: any
  page: any
}

const state = {
  current: null,
  page: {
    id: null,
    title: null,
    pageStyle: {
      backgroundColor: '#F8F8F8'
    },
    componentList: []
  }
}
const mutations = {
  SET_CURRENT: (state: IPagesState, data: any) => {
    state.current = data || null
  }
}
const actions = {
  // 设置当前选中模块
  setCurrent({ commit }: ActionContext<IPagesState, IStore>, data: any) {
    return new Promise((resolve, reject) => {
      commit('SET_CURRENT', data)
      resolve(data)
    })
  },
  // 删除模块
  removeComponent({ commit, state }: ActionContext<IPagesState, IStore>, data: any) {
    return new Promise((resolve, reject) => {
      const findIndex = state.page.componentList.findIndex((s: { id: string | number }) => s.id === data.id)
      state.page.componentList.splice(findIndex, 1)
      resolve(true)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
