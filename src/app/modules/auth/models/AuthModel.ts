import { UserModel } from './UserModel'

export interface AuthModel {
  user?: UserModel
  token: string
  refreshToken?: string
}
