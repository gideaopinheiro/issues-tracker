import { TicketComment } from '@/domain/models'

export interface AddTicketCommentRepository {
  addComment: (params: AddTicketCommentRepository.Params) => Promise<AddTicketCommentRepository.Result>
}

export namespace AddTicketCommentRepository {
  export type Params = {
    ticket: string
    message: string }
  export type Result = TicketComment
}
