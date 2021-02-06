import { AccountModel } from '@/domain/models/account'
import { AddAccount } from '@/domain/usecases'

export interface AddAccountRepository {
  addAccount: (accountParams: AddAccount.Params) => Promise<AccountModel>
}
