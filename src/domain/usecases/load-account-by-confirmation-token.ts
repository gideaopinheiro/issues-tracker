import { AccountModel } from '@/domain/models/account'

export interface LoadAccountByConfirmationToken {
  load: (params: LoadAccountByConfirmationToken.Params) => Promise<LoadAccountByConfirmationToken.Result>
}

export namespace LoadAccountByConfirmationToken {
  export type Result = AccountModel
  export type Params = string
}
