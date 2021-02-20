import { Authentication, AuthenticationParams } from '@/domain/usecases/authentication'
import { LoadAccountByEmailRepository } from '@/data/protocols/db/load-account-by-email-repository'
import { HashComparer } from '@/data/protocols/criptography/hash-comparer'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer
  ) { }

  async auth (credentials: AuthenticationParams): Promise<string> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(credentials.email)
    if (account) {
      await this.hashComparer.compare(credentials.password, account.password)
    }
    return null
  }
}
