import { AddTicketRepository } from '@/data/protocols/db'
import { TicketModel } from '@/domain/models'
import { AddTicket } from '@/domain/usecases/add-ticket'
import { mockTicket } from '@/tests/domain/mocks/mock-ticket'

export const mockAddTicketRepository = (): AddTicketRepository => {
  class AddTicketRepositoryStub implements AddTicketRepository {
    async addTicket (params: AddTicket.Params): Promise<TicketModel> {
      return Promise.resolve(mockTicket())
    }
  }
  return new AddTicketRepositoryStub()
}
