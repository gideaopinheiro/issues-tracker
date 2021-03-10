import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { mockAddAccountParams } from '@/tests/domain/mocks'
import { Collection } from 'mongodb'
import { AccountMongoRepository } from '@/infra/db/mongodb/account-repository/account-mongo-repository'

const makeSut = (): AccountMongoRepository => {
  return new AccountMongoRepository()
}

let accountCollection: Collection

describe('AccountMongoRepository', () => {
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

  describe('AddAccount', () => {
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

  describe('loadByToken()', () => {
    test('should return an account on loadByToken success', async () => {
      const sut = makeSut()
      await sut.addAccount(mockAddAccountParams())
      const account = await sut.loadByToken('any_confirmation_code')
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.status).toBe('pending')
    })
  })

  describe('updateAccount', () => {
    test('should return an account on success', async () => {
      const sut = makeSut()
      await sut.addAccount(mockAddAccountParams())
      const account = await sut.updateAccount({
        id: 'any_id',
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        status: 'active',
        confirmationCode: 'any_confirmation_code'
      })
      expect(account).toBeTruthy()
      expect(account.status).toBe('active')
    })
  })
})
