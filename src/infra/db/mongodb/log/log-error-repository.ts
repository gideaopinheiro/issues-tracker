import { LogErrorRepository } from '@/data/protocols/db/log-error-repository'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'

export class LogErrorMongoRepository implements LogErrorRepository {
  async logError (message: string): Promise<void> {
    const logErrorCollection = await MongoHelper.getCollection('errors')
    await logErrorCollection.insertOne({
      stack: message,
      date: new Date()
    })
  }
}
