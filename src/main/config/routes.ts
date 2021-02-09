import { Express, Router } from 'express'
import signUpRouter from '@/main/routes/signup-routes'

export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)
  signUpRouter(router)
}
