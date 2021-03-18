import { AddTicket } from '@/domain/usecases/add-ticket'
import { TicketModel } from '@/domain/models'

export interface AddTicketRepository {
  addTicket: (params: AddTicket.Params) => Promise<TicketModel>
}
