import { Authentication, AuthenticationParams } from '@/domain/usecases/authentication'

export const mockAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth (credentials: AuthenticationParams): Promise<string> {
      return Promise.resolve('any_access_token')
    }
  }
  return new AuthenticationStub()
}
