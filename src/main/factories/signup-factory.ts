import { DbAddAccount } from '@/data/usecases/account/db-add-account'
import { BcryptAdapter } from '@/infra/criptography/bcrypt-adapter'
import { AddAccountMongoRepository } from '@/infra/db/mongodb/account-repository/add-account-mongo-repository'
import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator'
import { SignUpController } from '@/presentation/controllers/signup-controller'
import { Controller } from '@/presentation/protocols'
import { LoadAccountByEmailMongoRepository } from '@/infra/db/mongodb/account-repository/load-account-by-email-mongo-repository'
import { LogErrorMongoRepository } from '@/infra/db/mongodb/log/log-error-repository'
import { makeSignUpValidation } from './signup-validation-factory'

export const makeSignUpController = (): Controller => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const addAccountMongoRepository = new AddAccountMongoRepository()
  const loadAccountByEmailMongoRepository = new LoadAccountByEmailMongoRepository()
  const addAccount = new DbAddAccount(bcryptAdapter, addAccountMongoRepository, loadAccountByEmailMongoRepository)
  const signUpController = new SignUpController(addAccount, makeSignUpValidation())
  const logErrorMongoRepository = new LogErrorMongoRepository()
  return new LogControllerDecorator(signUpController, logErrorMongoRepository)
}
