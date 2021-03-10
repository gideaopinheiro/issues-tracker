import { AccountModel } from '@/domain/models/account'

export interface AccountConfirmation {
  confirm: (params: AccountConfirmation.Params) => Promise<AccountConfirmation.Result>
}

export namespace AccountConfirmation {
  export type Params = string
  export type Result = AccountModel
}
