import { LogErrorMongoRepository } from '@/infra/db/mongodb/log/log-error-repository'
import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator'
import { SignUpController } from '@/presentation/controllers/signup-controller'
import { Controller } from '@/presentation/protocols'
import { makeAddAccount } from './make-add-account-factory'
import { makeEmailTokenGeneratorAdapter } from './make-email-token-generator-adapter-factory'
import { makeNodemailerAdapter } from './make-nodemailer-adapter'
import { makeSignUpValidation } from './signup-validation-factory'

export const makeSignUpController = (): Controller => {
  const signUpController = new SignUpController(
    makeAddAccount(),
    makeSignUpValidation(),
    makeEmailTokenGeneratorAdapter(),
    makeNodemailerAdapter()
  )
  const logErrorMongoRepository = new LogErrorMongoRepository()
  return new LogControllerDecorator(signUpController, logErrorMongoRepository)
}
