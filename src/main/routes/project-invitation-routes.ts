import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { makeSendProjectInvitationController } from '@/main/factories/send-project-invitation-factory'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/project/invitation/send/', adaptRoute(makeSendProjectInvitationController()))
}
