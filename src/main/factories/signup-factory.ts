import { DbAddAccount } from '@/data/usecases/account/db-add-account'
import { BcryptAdapter } from '@/infra/criptography/bcrypt-adapter'
import { AccountMongoRepository } from '@/infra/db/mongodb/account-repository/account-mongo-repository'
import { SignUpController } from '@/presentation/controllers/signup-controller'
import { EmailValidatorAdapter } from '@/utils/email-validator'
import { Controller } from '@/presentation/protocols'
import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator'
import { LogErrorMongoRepository } from '../../infra/db/mongodb/log/log-error-repository'

export const makeSignUpController = (): Controller => {
  const salt = 12
  const emailValidator = new EmailValidatorAdapter()
  const bcryptAdapter = new BcryptAdapter(salt)
  const addAccountMongoRepository = new AccountMongoRepository()
  const addAccount = new DbAddAccount(bcryptAdapter, addAccountMongoRepository)
  const signUpController = new SignUpController(emailValidator, addAccount)
  const logErrorMongoRepository = new LogErrorMongoRepository()
  return new LogControllerDecorator(signUpController, logErrorMongoRepository)
}
