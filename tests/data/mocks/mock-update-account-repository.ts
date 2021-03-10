import { UpdateAccountRepository } from '@/data/protocols/db'
import { mockAccount } from '@/tests/domain/mocks'

export const mockUpdateAccountRepository = (): UpdateAccountRepository => {
  class UpdateAccountRepositoryStub implements UpdateAccountRepository {
    async updateAccount (params: UpdateAccountRepository.Params): Promise<UpdateAccountRepository.Result> {
      return Promise.resolve(mockAccount())
    }
  }
  return new UpdateAccountRepositoryStub()
}
