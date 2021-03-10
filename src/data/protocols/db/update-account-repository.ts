import { AccountModel } from '@/domain/models/account'

export interface UpdateAccountRepository {
  updateAccount: (params: UpdateAccountRepository.Params) => Promise<UpdateAccountRepository.Result>
}

export namespace UpdateAccountRepository {
  export type Params = AccountModel
  export type Result = AccountModel
}
