import { AccountModel } from '@/domain/models/account'
import { AddAccount } from '@/domain/usecases'
import { Hasher } from '@/data/protocols/criptography/hasher'
import { AddAccountRepository } from '@/data/protocols/db/add-account-repository'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository
  ) {}

  async add (accountParams: AddAccount.Params): Promise<AccountModel> {
    const { password } = accountParams
    const hashedPassword = await this.hasher.hash(password)
    const account = await this.addAccountRepository.addAccount(Object.assign({}, accountParams, { password: hashedPassword }))
    return account
  }
}
