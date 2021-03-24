import { LogErrorMongoRepository } from '@/infra/db/mongodb/log/log-error-repository'
import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator'
import { makeAddTicketValidation } from '@/main/factories/add-ticket-validation'
import { makeAddTicket } from '@/main/factories/make-add-ticket'
import { AddTicketController } from '@/presentation/controllers/add-ticket-controller'
import { Controller } from '@/presentation/protocols'

export const makeAddTicketController = (): Controller => {
  const ticketController = new AddTicketController(makeAddTicketValidation(), makeAddTicket())
  const logErrorMongoRepository = new LogErrorMongoRepository()
  return new LogControllerDecorator(ticketController, logErrorMongoRepository)
}
