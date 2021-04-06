import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { makeSendProjectInvitationController } from '@/main/factories/send-project-invitation-factory'
import { auth } from '@/main/middlewares/auth'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/project/invitation/send/', auth, adaptRoute(makeSendProjectInvitationController()))
}
