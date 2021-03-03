import { LogErrorMongoRepository } from '@/infra/db/mongodb/log/log-error-repository'
import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator'
import { LoginController } from '@/presentation/controllers/login-controller'
import { Controller } from '@/presentation/protocols'
import { makeDbAuthentication } from './db-authentication-factory'
import { makeLoginValidation } from './login-validation-factory'

export const makeLoginController = (): Controller => {
  const loginController = new LoginController(makeLoginValidation(), makeDbAuthentication())
  const logErrorMongoRepository = new LogErrorMongoRepository()
  return new LogControllerDecorator(loginController, logErrorMongoRepository)
}
