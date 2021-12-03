import { ActionContext } from 'vuex'
import { IStore } from '../types'

export type IDictionaryState = {
  list: DictionaryData
}
interface DictionaryData {
  label: string
  children: DictionaryList
}
interface DictionaryList {
  label: string
  value: string | number
}

const state = {
  list: {}
}
const mutations = {
  // 设置全局存储的字典map
  SET_DICTIONARY: (state: any, data: DictionaryData) => {
    state.list = {
      ...state.list,
      ...data
    }
  }
}
const actions = {
  // 获取字典表列表数据
  getDictionary({ commit }: ActionContext<IDictionaryState, IStore>) {
    return new Promise((resolve) => {
      const dict = {
        PAGE_LINK_TYPE: [
          {
            label: '微页面',
            value: 1
          },
          {
            label: '商品',
            value: 2
          }
        ]
      }
      commit('SET_DICTIONARY', dict)
      resolve(dict)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
