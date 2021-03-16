import { Router } from 'express'
import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { makeAddProjectController } from '@/main/factories/add-project-factory'

export default (router: Router): void => {
  router.post('/projects/add', adaptRoute(makeAddProjectController()))
}
