import { AddTicket } from '@/domain/usecases/add-ticket'
import { TicketModel } from '@/domain/models'

export interface AddTicketRepository {
  addTicket: (params: AddTicketRepository.Params) => Promise<AddTicketRepository.Result>
}

export namespace AddTicketRepository {
  export type Params = AddTicket.Params
  export type Result = TicketModel
}
