import { Hasher } from '@/data/protocols/criptography/hasher'
import { AddAccountRepository } from '@/data/protocols/db/add-account-repository'
import { AccountModel } from '@/domain/models/account'
import { AddAccount } from '@/domain/usecases'
import { LoadAccountByEmailRepository } from '@/data/protocols/db/load-account-by-email-repository'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  async add (accountParams: AddAccount.Params): Promise<AccountModel> {
    const { email, password } = accountParams
    const account = await this.loadAccountByEmailRepository.loadByEmail(email)
    if (!account) {
      const hashedPassword = await this.hasher.hash(password)
      const newAccount = await this.addAccountRepository.addAccount(Object.assign({}, accountParams, { password: hashedPassword }))
      return newAccount
    }
    return null
  }
}
