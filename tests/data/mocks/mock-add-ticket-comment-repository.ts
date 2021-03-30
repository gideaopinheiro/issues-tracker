import { AddTicketCommentRepository } from '@/data/protocols/db'
import { TicketComment } from '@/domain/models'
import { AddTicketComment } from '@/domain/usecases/add-ticket-comment'
import { mockComment } from '@/tests/domain/mocks'

export const mockAddTicketCommentRepository = (): AddTicketCommentRepository => {
  class AddTicketCommentRepositoryStub implements AddTicketCommentRepository {
    async addComment (params: AddTicketComment.Params): Promise<TicketComment> {
      return Promise.resolve(mockComment())
    }
  }
  return new AddTicketCommentRepositoryStub()
}
