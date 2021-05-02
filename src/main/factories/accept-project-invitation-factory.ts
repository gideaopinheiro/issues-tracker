import { LogErrorMongoRepository } from '@/infra/db/mongodb/log/log-error-repository'
import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator'
import { AcceptProjectInvitationController } from '@/presentation/controllers/accept-project-invitation-controller'
import { makeAcceptProjectInvitationValidation } from './make-accept-project-invitation-validation'
import { makeDbAcceptProjectInvitation } from './make-db-accept-project-invitation'

export const makeAcceptProjectInvitationController = (): LogControllerDecorator => {
  const acceptProjectInvitationController = new AcceptProjectInvitationController(
    makeAcceptProjectInvitationValidation(),
    makeDbAcceptProjectInvitation()
  )
  const logControllerDecorator = new LogControllerDecorator(acceptProjectInvitationController, new LogErrorMongoRepository())
  return logControllerDecorator
}
