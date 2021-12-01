// import { IPermissionState } from '@/store/modules/permission'
import { IUserState } from '@/store/modules/user'
import { IPagesState } from '@/store/modules/pages'

export interface IStore {
  // permission: IPermissionState
  user: IUserState
  pages: IPagesState
}
