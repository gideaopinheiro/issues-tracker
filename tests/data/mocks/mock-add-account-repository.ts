import { mockAccount } from '@/tests/domain/mocks'
import { AccountModel } from '@/domain/models/account'
import { AddAccount } from '@/domain/usecases'
import { AddAccountRepository } from '@/data/protocols/db/add-account-repository'

export const mockAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async addAccount (accountParams: AddAccount.Params): Promise<AccountModel> {
      return Promise.resolve(mockAccount())
    }
  }
  return new AddAccountRepositoryStub()
}
