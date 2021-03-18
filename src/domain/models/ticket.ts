export type TicketModel = {
  id: string
  title: string
  description: string
  from: string
  to?: string
  priority: TicketPriority
  status: TicketStatus
  type: TicketType
  createdAt: Date
  updatedAt?: Date
  coments?: Comment[]
}

export type TicketComment = {
  id: string
  message: string
  createdAt: Date
}

export enum TicketPriority {
  'low',
  'medium',
  'high'
}
export enum TicketStatus {
  'opened',
  'closed'
}

export enum TicketType {
  'bug',
  'error'
}
