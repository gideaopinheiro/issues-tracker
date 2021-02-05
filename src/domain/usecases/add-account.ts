import { AccountModel } from '../models/account'

export interface AddAccount {
  add: (params: AddAccount.Params) => Promise<AccountModel>
}

export namespace AddAccount {
  export type Params = {
    name: string
    email: string
    password: string
  }
}
