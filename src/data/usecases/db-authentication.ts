import { Authentication, AuthenticationParams } from '@/domain/usecases/authentication'
import { LoadAccountByEmailRepository } from '@/data/protocols/db/load-account-by-email-repository'
import { HashComparer } from '@/data/protocols/criptography/hash-comparer'
import { Encrypter } from '@/data/protocols/criptography/encrypter'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter
  ) { }

  async auth (credentials: AuthenticationParams): Promise<string> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(credentials.email)
    if (account) {
      const isAuth = await this.hashComparer.compare(credentials.password, account.password)
      if (isAuth) {
        await this.encrypter.encrypt(account.id)
      }
    }
    return null
  }
}
