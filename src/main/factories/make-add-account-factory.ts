import { DbAddAccount } from '@/data/usecases/account/db-add-account'
import { BcryptAdapter } from '@/infra/criptography/bcrypt-adapter'
import { AddAccountMongoRepository } from '@/infra/db/mongodb/account-repository/add-account-mongo-repository'
import { LoadAccountByEmailMongoRepository } from '@/infra/db/mongodb/account-repository/load-account-by-email-mongo-repository'

export const makeAddAccount = (): DbAddAccount => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const addAccountMongoRepository = new AddAccountMongoRepository()
  const loadAccountByEmailMongoRepository = new LoadAccountByEmailMongoRepository()
  return new DbAddAccount(bcryptAdapter, addAccountMongoRepository, loadAccountByEmailMongoRepository)
}
