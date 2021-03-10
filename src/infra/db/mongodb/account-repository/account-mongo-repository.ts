import { AddAccountRepository, LoadAccountByConfirmationTokenRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository } from '@/data/protocols/db'
import { AccountModel } from '@/domain/models/account'
import { AddAccount } from '@/domain/usecases'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { UpdateAccountRepository } from '@/data/protocols/db/update-account-repository'

export class AccountMongoRepository implements AddAccountRepository, UpdateAccessTokenRepository, LoadAccountByEmailRepository, UpdateAccountRepository, LoadAccountByConfirmationTokenRepository {
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

  async loadByEmail (email: string): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({ email })
    if (!account) {
      return null
    }
    return MongoHelper.map(account)
  }

  async updateAccount (params: UpdateAccountRepository.Params): Promise<UpdateAccountRepository.Result> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.updateOne({ email: params.email }, { $set: { status: 'active' } })
    const account = await this.loadByEmail(params.email)
    const mappedAccount = MongoHelper.map(account)
    if (mappedAccount.status === 'active') {
      return account && MongoHelper.map(account)
    }
    return null
  }

  async loadByToken (params: any): Promise<LoadAccountByConfirmationTokenRepository.Result> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    // console.log(params)
    const account = await accountCollection.findOne({ confirmationCode: params })
    if (!account) {
      return null
    }
    return MongoHelper.map(account)
  }
}