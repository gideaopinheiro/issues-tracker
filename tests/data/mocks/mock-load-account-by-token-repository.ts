import { mockAccount } from '../../domain/mocks'
import { AccountModel } from '../../domain/models'
import { LoadAccountByTokenRepository } from '../protocols/db'

export const mockLoadAccountByTokenRepository = (): LoadAccountByTokenRepository => {
  class LoadAccountByTokenRepositoryStub implements LoadAccountByTokenRepository {
    async loadByToken (accessToken: string, role?: string): Promise<AccountModel> {
      return Promise.resolve(mockAccount())
    }
  }
  return new LoadAccountByTokenRepositoryStub()
}
