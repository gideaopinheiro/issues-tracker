import { AccountModel } from '@/domain/models/account'

export interface LoadAccountByConfirmationTokenRepository {
  loadByToken: (params: LoadAccountByConfirmationTokenRepository.Params) => Promise<LoadAccountByConfirmationTokenRepository.Result>
}

export namespace LoadAccountByConfirmationTokenRepository {
  export type Params = string
  export type Result = AccountModel
}
