import { Router } from 'express'
import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { makeAddTicketController } from '@/main/factories/add-ticket-factory'

export default (router: Router): void => {
  router.post('/tickets/add', adaptRoute(makeAddTicketController()))
}
