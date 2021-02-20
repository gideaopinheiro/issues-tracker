import { DbAddAccount } from '@/data/usecases/account/db-add-account'
import { DbAuthentication } from '@/data/usecases/db-authentication'
import { BcryptAdapter } from '@/infra/criptography/bcrypt-adapter'
import { AddAccountMongoRepository } from '@/infra/db/mongodb/account-repository/add-account-mongo-repository'
import { LoadAccountByEmailMongoRepository } from '@/infra/db/mongodb/account-repository/load-account-by-email-mongo-repository'
import { LogErrorMongoRepository } from '@/infra/db/mongodb/log/log-error-repository'
import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator'
import { SignUpController } from '@/presentation/controllers/signup-controller'
import { Controller } from '@/presentation/protocols'
import { makeSignUpValidation } from './signup-validation-factory'

export const makeSignUpController = (): Controller => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const addAccountMongoRepository = new AddAccountMongoRepository()
  const loadAccountByEmailMongoRepository = new LoadAccountByEmailMongoRepository()
  const addAccount = new DbAddAccount(bcryptAdapter, addAccountMongoRepository, loadAccountByEmailMongoRepository)
  const dbAuthentication = new DbAuthentication(loadAccountByEmailMongoRepository, bcryptAdapter)
  const signUpController = new SignUpController(addAccount, makeSignUpValidation(), dbAuthentication)
  const logErrorMongoRepository = new LogErrorMongoRepository()
  return new LogControllerDecorator(signUpController, logErrorMongoRepository)
}
