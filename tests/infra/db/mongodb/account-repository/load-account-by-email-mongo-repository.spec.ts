import { LoadAccountByEmailRepository } from '@/data/protocols/db/load-account-by-email-repository'
import { LoadAccountByEmailMongoRepository } from '@/infra/db/mongodb/account-repository/load-account-by-email-mongo-repository'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { mockAddAccountParams } from '@/tests/domain/mocks'
import { Collection } from 'mongodb'

const makeSut = (): LoadAccountByEmailRepository => {
  return new LoadAccountByEmailMongoRepository()
}

let accountCollection: Collection

describe('LoadAccountByEmailMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  describe('loadByEmail()', () => {
    test('Should return an account on loadByEmail success', async () => {
      const sut = makeSut()
      await accountCollection.insertOne(mockAddAccountParams())
      const account = await sut.loadByEmail('any_email@mail.com')
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.email).toBe('any_email@mail.com')
      expect(account.password).toBe('any_password')
    })
  })
})
