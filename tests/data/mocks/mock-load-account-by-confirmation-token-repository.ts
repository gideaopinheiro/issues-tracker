import { LoadAccountByConfirmationTokenRepository } from '@/data/protocols/db'
import { mockAccount } from '@/tests/domain/mocks'

export const mockLoadAccountByConfirmationTokenRepository = (): LoadAccountByConfirmationTokenRepository => {
  class LoadAccountByConfirmationTokenRepositoryStub implements LoadAccountByConfirmationTokenRepository {
    async loadByToken (params: LoadAccountByConfirmationTokenRepository.Params): Promise<LoadAccountByConfirmationTokenRepository.Result> {
      return Promise.resolve(mockAccount())
    }
  }
  return new LoadAccountByConfirmationTokenRepositoryStub()
}
