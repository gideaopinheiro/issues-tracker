import { Express, Router } from 'express'
import signUpRouter from '@/main/routes/signup-routes'
import loginRouter from '@/main/routes/login-routes'
import confirmationRouter from '@/main/routes/confirmation-routes'

export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)
  signUpRouter(router)
  loginRouter(router)
  confirmationRouter(router)
}
