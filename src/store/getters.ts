import { IStore } from './types'
export default {
  page: (state: IStore) => state.pages.page || {}
}
