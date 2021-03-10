import { Router } from 'express'
import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { makeConfirmationController } from '@/main/factories/confirmation-factory'

export default (router: Router): void => {
  router.post('/confirm-account/:confirmationCode', adaptRoute(makeConfirmationController()))
}
