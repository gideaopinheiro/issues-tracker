import { LogErrorMongoRepository } from '@/infra/db/mongodb/log/log-error-repository'
import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator'
import { SendProjectInvitationController } from '@/presentation/controllers/send-project-invitation-controller'
import { makeDbSendProjectInvitation } from './make-db-send-project-invitation'
import { makeSendProjectInvitationValidation } from './make-send-project-invitation-validation'

export const makeSendProjectInvitationController = (): LogControllerDecorator => {
  const controller = new SendProjectInvitationController(makeSendProjectInvitationValidation(), makeDbSendProjectInvitation())
  const logControllerDecorator = new LogControllerDecorator(controller, new LogErrorMongoRepository())
  return logControllerDecorator
}
