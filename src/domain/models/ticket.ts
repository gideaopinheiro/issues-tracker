export type Ticket = {
  id: string
  title: string
  description: string
  from: string
  to: string
  priority: string
  status: TicketStatus
  type: TicketType
  createdAt: Date
  updatedAt: Date
  coments: Array<{
    id: string
    message: string
    createdAt: Date
  }>
}

enum TicketStatus {
  'opened',
  'closed'
}

enum TicketType {
  'BUG',
  'ERROR'
}

// const t: Ticket = {
//   id: 'string',
//   title: 'string',
//   description: 'string',
//   from: 'string',
//   to: 'string',
//   priority: 'string',
//   status: TicketStatus.opened,
//   type: TicketType.BUG,
//   createdAt: new Date(),
//   updatedAt: new Date(),
//   coments: [{
//     id: 'string0',
//     message: 'string',
//     createdAt: new Date()
//   }, {
//     id: 'string2',
//     message: 'string',
//     createdAt: new Date()
//   }]
// }
