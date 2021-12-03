import { IStore } from './types'
export default {
  accountId: (state: IStore) => state.user.userInfo.accountId || null,
  dictionary: (state: IStore) => state.dictionary.list || {},
  page: (state: IStore) => state.pages.page || {}
}
