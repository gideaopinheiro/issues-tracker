import { TicketComment, TicketModel } from '@/domain/models'

export interface AddTicket {
  add: (params: AddTicket.Params) => Promise<TicketModel>
}

export namespace AddTicket {
  export type Params = {
    title: string
    description: string
    project: string
    assignedBy: string
    assignedTo?: string[]
    priority: string
    status: string
    type: string
    updatedAt?: Date
    comments?: TicketComment[]
  }
}
