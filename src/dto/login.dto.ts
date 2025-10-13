import { AccountTypeEnum } from './register-user.dto'

export interface LoginDto {
  email: string
  password: string
  type: AccountTypeEnum
}

export interface LoginReponseDto {
  access_token: string
  token_type: string
}
