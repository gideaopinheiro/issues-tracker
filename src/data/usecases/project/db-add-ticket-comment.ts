import { TicketComment } from '@/domain/models'
import { AddTicketComment } from '@/domain/usecases/add-ticket-comment'
import { AddTicketCommentRepository } from '@/data/protocols/db'

export class DbAddTicketComment implements AddTicketComment {
  constructor (private readonly addTicketCommentRepository: AddTicketCommentRepository) {}

  async add (params: AddTicketComment.Params): Promise<TicketComment> {
    const comment = await this.addTicketCommentRepository.addComment(params)
    return comment
  }
}
