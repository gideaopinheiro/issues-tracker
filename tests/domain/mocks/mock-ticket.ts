import { TicketModel, TicketPriority, TicketStatus, TicketType } from '@/domain/models'
import { AddTicket } from '@/domain/usecases/add-ticket'

export const mockTicketParams = (): AddTicket.Params => ({
  title: 'any_title',
  description: 'any_description',
  assignedBy: 'any_id',
  priority: TicketPriority.low,
  status: TicketStatus.opened,
  type: TicketType.bug,
  createdAt: new Date()
})

export const mockTicket = (): TicketModel => ({
  id: 'any_id',
  title: 'any_title',
  project: 'any_project_id',
  description: 'any_description',
  assignedBy: 'from_any_id',
  assignedTo: ['to_any_id1', 'to_any_id2'],
  priority: TicketPriority.low,
  status: TicketStatus.opened,
  type: TicketType.bug,
  createdAt: new Date()
})
