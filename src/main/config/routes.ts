import { Express, Router } from 'express'
import signUpRouter from '@/main/routes/signup-routes'
import loginRouter from '@/main/routes/login-routes'
import confirmationRouter from '@/main/routes/confirmation-routes'
import addProjectRouter from '@/main/routes/add-project-routes'
import addTicketRouter from '@/main/routes/add-ticket-routes'

export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)
  signUpRouter(router)
  loginRouter(router)
  confirmationRouter(router)
  addProjectRouter(router)
  addTicketRouter(router)
}
