import { TicketModel } from '@/domain/models'
import { AddTicket } from '@/domain/usecases/add-ticket'
import { AddTicketRepository } from '@/data/protocols/db'

export class DbAddTicket implements AddTicket {
  constructor (private readonly addTicketRepository: AddTicketRepository) {}

  async add (params: AddTicket.Params): Promise<TicketModel> {
    const ticket = await this.addTicketRepository.addTicket(params)
    return ticket
  }
}
