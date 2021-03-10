import { Decrypter } from '@/data/protocols/criptography/decrypter'
import { LoadAccountByConfirmationToken } from '@/domain/usecases'
import { LoadAccountByConfirmationTokenRepository } from '@/data/protocols/db'

export class DbLoadAccountByConfirmationToken implements LoadAccountByConfirmationToken {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly loadAccountByConfirmationTokenRepository: LoadAccountByConfirmationTokenRepository
  ) {}

  async load (params: LoadAccountByConfirmationToken.Params): Promise<LoadAccountByConfirmationToken.Result> {
    const token = await this.decrypter.decrypt(params)
    if (token) {
      const account = await this.loadAccountByConfirmationTokenRepository.loadByToken(params)
      if (account) {
        return account
      }
    }
    return null
  }
}
