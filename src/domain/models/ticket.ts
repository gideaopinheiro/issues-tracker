export type TicketModel = {
  id: string
  project: string
  title: string
  description: string
  assignedBy: string
  assignedTo?: string[]
  priority: string
  status: string
  type: string
  createdAt: Date
  updatedAt?: Date
  coments?: TicketComment[]
}

export type TicketComment = {
  id: string
  message: string
  createdAt: Date
}
