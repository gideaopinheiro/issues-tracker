import { LogErrorRepository } from '@/data/protocols/db/log-error-repository'
import { MonogHelper } from '@/infra/db/mongodb/helpers/mongo-helper'

export class LogErrorMongoRepository implements LogErrorRepository {
  async log (message: string): Promise<void> {
    const logErrorCollection = await MonogHelper.getCollection('logErrors')
    await logErrorCollection.insertOne(message)
  }
}
