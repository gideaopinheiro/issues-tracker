import { TicketComment } from '@/domain/models'

export interface AddTicketComment {
  add: (params: AddTicketComment.Params) => Promise<TicketComment>
}

export namespace AddTicketComment {
  export type Params = {
    ticket: string
    message: string
  }
}
