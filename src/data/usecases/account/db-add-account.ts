import { AccountModel } from '@/domain/models/account'
import { AddAccount } from '@/domain/usecases'
import { Hasher } from '@/data/protocols/criptography/hasher'

export class DbAddAccount implements AddAccount {
  constructor (private readonly hasher: Hasher) {}

  async add (accountParams: AddAccount.Params): Promise<AccountModel> {
    const { password } = accountParams
    await this.hasher.hash(password)
    return null
  }
}
