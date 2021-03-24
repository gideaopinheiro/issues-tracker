import { ProjectModel, TicketModel } from '@/domain/models'
import { AccountModel } from '@/domain/models/account'
import { Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient,
  url: null as string,

  async connect (uri: string): Promise<void> {
    this.url = uri
    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  },

  async disconnect (): Promise<void> {
    await this.client.close()
    this.client = null
  },

  async getCollection (name: string): Promise<Collection> {
    if (!this.client?.isConnected()) {
      await this.connect(this.url)
    }
    return this.client.db().collection(name)
  },

  mapAccount (account: any): AccountModel {
    const { _id, ...accountWithoutId } = account
    return Object.assign({}, accountWithoutId, { id: _id })
  },

  mapProject (project: any): ProjectModel {
    const { _id, members, ...remainder } = project
    const parsedId = Object.assign({}, remainder, { id: _id })
    const parsedMembers = []
    if (members) {
      for (const member of members) {
        const { _id, ...r } = member
        parsedMembers.push(Object.assign({}, r, { id: _id }))
      }
    }
    return Object.assign({}, parsedId, { members: parsedMembers })
  },

  mapTicket (ticket: any): TicketModel {
    const { _id, ...ticketWithoutId } = ticket
    return Object.assign({}, ticketWithoutId, { id: _id })
  }
}
