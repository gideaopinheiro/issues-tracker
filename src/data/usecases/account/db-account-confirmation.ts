import { LoadAccountByConfirmationTokenRepository } from '@/data/protocols/db'
import { UpdateAccountRepository } from '@/data/protocols/db/update-account-repository'
import { AccountConfirmation } from '@/domain/usecases/account-confirmation'

export class DbAccountConfirmation implements AccountConfirmation {
  constructor (
    private readonly loadAccountByConfirmationTokenRepository: LoadAccountByConfirmationTokenRepository,
    private readonly updateAccountRepository: UpdateAccountRepository
  ) { }

  async confirm (params: AccountConfirmation.Params): Promise<AccountConfirmation.Result> {
    const account = await this.loadAccountByConfirmationTokenRepository.loadByConfirmationToken(params)
    if (!account) {
      return null
    }
    const newAccount = await this.updateAccountRepository.updateAccount(account)
    if (!newAccount) {
      return null
    }
    return newAccount
  }
}
