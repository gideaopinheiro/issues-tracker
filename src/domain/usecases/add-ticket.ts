import { TicketComment, TicketModel, TicketPriority, TicketStatus, TicketType } from '@/domain/models'

export interface AddTicket {
  add: (params: AddTicket.Params) => Promise<TicketModel>
}

export namespace AddTicket {
  export type Params = {
    title: string
    description: string
    from: string
    to?: string
    priority: TicketPriority
    status: TicketStatus
    type: TicketType
    createdAt: Date
    updatedAt?: Date
    comments?: TicketComment[]
  }
}
