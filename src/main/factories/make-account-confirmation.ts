import { DbAccountConfirmation } from '@/data/usecases/account/db-account-confirmation'
import { AccountMongoRepository } from '@/infra/db/mongodb/account-repository/account-mongo-repository'

export const makeAccountConfirmation = (): DbAccountConfirmation => {
  const accountMongoRepository = new AccountMongoRepository()
  return new DbAccountConfirmation(accountMongoRepository, accountMongoRepository)
}
