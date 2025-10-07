export enum AccountTypeEnum {
  STUDENT = 'STUDENT',
  SUPERVISOR = 'SUPERVISOR',
}

export interface RegisterUserDTO {
  name: string
  email: string
  password: string
  type: AccountTypeEnum
  organizationName?: string
  inviteCode?: string
}
