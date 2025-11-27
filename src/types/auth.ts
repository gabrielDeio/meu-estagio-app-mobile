import { AccountTypeEnum } from '../dto/register-user.dto'

export interface User {
  id: string
  name: string
  email: string
  type: AccountTypeEnum
}

export interface AuthData {
  token: string
  user: User
  org_id: string
}

export interface AuthContextData {
  authData?: AuthData
  isLoading: boolean
  signIn: (email: string, password: string, type: AccountTypeEnum) => Promise<void>
  signOut: () => void
}
