import { LogErrorMongoRepository } from '@/infra/db/mongodb/log/log-error-repository'
import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator'
import { SignUpController } from '@/presentation/controllers/signup-controller'
import { Controller } from '@/presentation/protocols'
import { EmailTokenGeneratorAdapter } from '@/utils/email-token-generator'
import env from '@/main/config/env'
import { makeAddAccount } from './make-add-account-factory'
import { makeSignUpValidation } from './signup-validation-factory'

export const makeSignUpController = (): Controller => {
  const emailTokenGeneratorAdapter = new EmailTokenGeneratorAdapter(env.secretConfirmationKey)
  const signUpController = new SignUpController(
    makeAddAccount(),
    makeSignUpValidation(),
    emailTokenGeneratorAdapter)
  const logErrorMongoRepository = new LogErrorMongoRepository()
  return new LogControllerDecorator(signUpController, logErrorMongoRepository)
}
