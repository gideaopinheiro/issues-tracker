import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { makeLoginController } from '@/main/factories/login-factory'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/login', adaptRoute(makeLoginController()))
}
