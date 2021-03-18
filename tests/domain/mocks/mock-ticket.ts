import { TicketModel, TicketPriority, TicketStatus, TicketType } from '@/domain/models'
import { AddTicket } from '@/domain/usecases/add-ticket'

export const mockTicketParams = (): AddTicket.Params => ({
  title: 'any_title',
  description: 'any_description',
  from: 'any_id',
  priority: TicketPriority.low,
  status: TicketStatus.opened,
  type: TicketType.bug,
  createdAt: new Date()
})

export const mockTicket = (): TicketModel => ({
  id: 'any_id',
  title: 'any_title',
  description: 'any_description',
  from: 'from_any_id',
  to: 'to_any_id',
  priority: TicketPriority.low,
  status: TicketStatus.opened,
  type: TicketType.bug,
  createdAt: new Date()
})
