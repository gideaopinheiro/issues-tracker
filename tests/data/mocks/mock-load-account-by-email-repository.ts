import { AccountModel } from '@/domain/models/account'
import { mockAccount } from '@/tests/domain/mocks'
import { LoadAccountByEmailRepository } from '../protocols/db/load-account-by-email-repository'

export const mockLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async loadByEmail (email: string): Promise<AccountModel> {
      return Promise.resolve(mockAccount())
    }
  }
  return new LoadAccountByEmailRepositoryStub()
}
