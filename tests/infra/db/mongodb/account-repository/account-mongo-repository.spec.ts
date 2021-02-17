import { AddAccountMongoRepository } from '@/infra/db/mongodb/account-repository/add-account-mongo-repository'
import { mockAddAccountParams } from '@/tests/domain/mocks'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { AddAccountRepository } from '@/data/protocols/db/add-account-repository'

const makeSut = (): AddAccountRepository => {
  return new AddAccountMongoRepository()
}

describe('AddAccountMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  beforeEach(async () => {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('should return an account on success', async () => {
    const sut = makeSut()
    const account = await sut.addAccount(mockAddAccountParams())
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email@mail.com')
    expect(account.password).toBe('any_password')
  })
})
