import { IPermissionState } from '@/store/modules/permission'
import { IUserState } from '@/store/modules/user'
import { IPagesState } from '@/store/modules/pages'
import { IDictionaryState } from '@/store/modules/dictionary'

export interface IStore {
  permission: IPermissionState
  user: IUserState
  pages: IPagesState
  dictionary: IDictionaryState
}
