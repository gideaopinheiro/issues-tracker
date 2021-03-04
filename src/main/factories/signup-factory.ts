import { LogErrorMongoRepository } from '@/infra/db/mongodb/log/log-error-repository'
import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator'
import { SignUpController } from '@/presentation/controllers/signup-controller'
import { Controller } from '@/presentation/protocols'
import { EmailTokenGeneratorAdapter } from '../../utils/email-token-generator'
import { makeDbAuthentication } from './db-authentication-factory'
import { makeAddAccount } from './make-add-account-factory'
import { makeSignUpValidation } from './signup-validation-factory'

export const makeSignUpController = (): Controller => {
  const emailTokenGeneratorAdapter = new EmailTokenGeneratorAdapter()
  const signUpController = new SignUpController(
    makeAddAccount(),
    makeSignUpValidation(),
    makeDbAuthentication(),
    emailTokenGeneratorAdapter)
  const logErrorMongoRepository = new LogErrorMongoRepository()
  return new LogControllerDecorator(signUpController, logErrorMongoRepository)
}
