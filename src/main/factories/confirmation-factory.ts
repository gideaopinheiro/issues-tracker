import { Controller } from '@/presentation/protocols'
import { ConfirmationController } from '@/presentation/controllers/confirmation-controller'
import { LogControllerDecorator } from '../decorators/log-controller-decorator'
import { LogErrorMongoRepository } from '@/infra/db/mongodb/log/log-error-repository'
import { makeConfirmationValidation } from './make-confirmation-validation'
import { makeAccountConfirmation } from './make-account-confirmation'

export const makeConfirmationController = (): Controller => {
  const confirmationController = new ConfirmationController(
    makeConfirmationValidation(),
    makeAccountConfirmation()
  )
  const logErrorMongoRepository = new LogErrorMongoRepository()
  return new LogControllerDecorator(confirmationController, logErrorMongoRepository)
}
