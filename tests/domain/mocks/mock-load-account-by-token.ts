import { LoadAccountByToken } from '@/domain/usecases'
import { mockAccount } from './mock-account'

export const mockLoadAccountByToken = (): LoadAccountByToken => {
  class LoadAccountByTokenStub implements LoadAccountByToken {
    async load (token: string, role?: string): Promise<LoadAccountByToken.Result> {
      return Promise.resolve(mockAccount())
    }
  }
  return new LoadAccountByTokenStub()
}
