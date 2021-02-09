import { AddAccountRepository } from '@/data/protocols/db/add-account-repository'
import { AccountModel } from '@/domain/models/account'
import { AddAccount } from '@/domain/usecases'
import { MonogHelper } from '@/infra/db/mongodb/helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository {
  async addAccount (accountParams: AddAccount.Params): Promise<AccountModel> {
    const accountCollection = MonogHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountParams)
    return MonogHelper.map(result.ops[0])
  }
}
