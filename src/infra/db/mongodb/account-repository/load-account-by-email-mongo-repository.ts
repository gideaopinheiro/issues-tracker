import { LoadAccountByEmailRepository } from '@/data/protocols/db/load-account-by-email-repository'
import { AccountModel } from '@/domain/models/account'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'

export class LoadAccountByEmailMongoRepository implements LoadAccountByEmailRepository {
  async loadByEmail (email: string): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({ email: email })
    if (!account) {
      return null
    }
    return MongoHelper.map(account)
  }
}
