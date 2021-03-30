import { TicketComment, TicketModel } from '@/domain/models'
import { AddTicket } from '@/domain/usecases/add-ticket'

export const mockTicketParams = (): AddTicket.Params => ({
  title: 'any_title',
  description: 'any_description',
  project: 'any_project_id',
  assignedBy: 'from_any_id',
  priority: 'low',
  status: 'opened',
  type: 'bug'
})

export const mockTicket = (): TicketModel => ({
  id: 'any_id',
  title: 'any_title',
  project: 'any_project_id',
  description: 'any_description',
  assignedBy: 'from_any_id',
  assignedTo: ['to_any_id1', 'to_any_id2'],
  priority: 'low',
  status: 'opened',
  type: 'bug',
  createdAt: new Date()
})

export const mockCommentParams = (): any => ({
  message: 'any_message'
})

export const mockComment = (): TicketComment => ({
  id: 'any_id',
  message: 'any_message',
  createdAt: new Date()
})

export const mockAddTicket = (): AddTicket => {
  class AddProjectStub implements AddTicket {
    async add (params: AddTicket.Params): Promise<TicketModel> {
      return Promise.resolve(mockTicket())
    }
  }
  return new AddProjectStub()
}
