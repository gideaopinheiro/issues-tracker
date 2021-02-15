import { LogErrorRepository } from '@/data/protocols/db/log-error-repository'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { LogErrorMongoRepository } from '@/infra/db/mongodb/log/log-error-repository'
import { Collection } from 'mongodb'

const makeSut = (): LogErrorRepository => {
  const sut = new LogErrorMongoRepository()
  return sut
}

describe('Log Mongo Repository', () => {
  let errorCollection: Collection

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  beforeEach(async () => {
    errorCollection = await MongoHelper.getCollection('errors')
    await errorCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('should create an error log on success', async () => {
    const sut = makeSut()
    await sut.logError('any_error')
    const count = await errorCollection.countDocuments()
    expect(count).toBe(1)
  })
})
