import { TicketComment } from '@/domain/models'

export interface AddTicketCommentRepository {
  addComment: (params: AddTicketCommentRepository.Params) => Promise<AddTicketCommentRepository.Result>
}

export namespace AddTicketCommentRepository {
  export type Params = { message: string }
  export type Result = TicketComment
}
