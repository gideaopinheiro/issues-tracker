import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { makeAcceptProjectInvitationController } from '@/main/factories/accept-project-invitation-factory'
import { makeSendProjectInvitationController } from '@/main/factories/send-project-invitation-factory'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/project/invitation/send/', adaptRoute(makeSendProjectInvitationController()))
  router.post('/project/invitation/accept/', adaptRoute(makeAcceptProjectInvitationController()))
}
