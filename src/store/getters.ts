import { IStore } from './types'
export default {
  accountId: (state: IStore) => state.user.userInfo.accountId || null,
  page: (state: IStore) => state.pages.page || {}
}
