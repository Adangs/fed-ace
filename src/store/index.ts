import { createStore, useStore as baseUseStore, Store } from 'vuex'
import { App, InjectionKey } from 'vue'
import { IStore } from './types'
import getters from './getters'
import modules from './modules'

export const store = createStore<IStore>({
  modules,
  getters
})

export const key: InjectionKey<Store<IStore>> = Symbol()

export function setupStore(app: App) {
  app.use(store, key)
}
// 定义自己的 `useStore` 组合式函数
export function useStore() {
  return baseUseStore(key)
}

export default store
