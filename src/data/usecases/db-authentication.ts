import { Authentication, AuthenticationParams } from '@/domain/usecases/authentication'
import { LoadAccountByEmailRepository } from '@/data/protocols/db/load-account-by-email-repository'

export class DbAuthentication implements Authentication {
  constructor (private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository) { }

  async auth (credentials: AuthenticationParams): Promise<string> {
    await this.loadAccountByEmailRepository.loadByEmail(credentials.email)
    return null
  }
}
