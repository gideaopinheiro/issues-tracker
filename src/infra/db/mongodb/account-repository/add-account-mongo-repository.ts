import { AddAccountRepository } from '@/data/protocols/db/add-account-repository'
import { AccountModel } from '@/domain/models/account'
import { AddAccount } from '@/domain/usecases'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { UpdateAccessTokenRepository } from '@/data/protocols/db/update-access-token-repository'

export class AddAccountMongoRepository implements AddAccountRepository, UpdateAccessTokenRepository {
  async addAccount (accountParams: AddAccount.Params): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne({ ...accountParams, status: 'pending' })
    return MongoHelper.map(result.ops[0])
  }

  async update (id: string, token: string): Promise<void> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.updateOne({
      _id: id
    }, {
      $set: {
        accessToken: token
      }
    })
  }
}
