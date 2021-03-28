import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { makeAddProjectController } from '@/main/factories/add-project-factory'
import { auth } from '@/main/middlewares/auth'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/projects/add', auth, adaptRoute(makeAddProjectController()))
}
