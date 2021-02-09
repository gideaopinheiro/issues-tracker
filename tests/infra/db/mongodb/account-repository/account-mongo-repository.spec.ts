import { AccountMongoRepository } from '@/infra/db/mongodb/account-repository/account-mongo-repository'
import { mockAddAccountParams } from '@/tests/domain/mocks'
import { MonogHelper } from '@/infra/db/mongodb/helpers/mongo-helper'

const makeSut = (): any => {
  return new AccountMongoRepository()
}

describe('AccountMongoRepository', () => {
  beforeAll(async () => {
    await MonogHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MonogHelper.disconnect()
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
