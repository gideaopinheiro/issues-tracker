import { AddProjectRepository, AddTicketRepository } from '@/data/protocols/db'
import { TicketModel } from '@/domain/models'
import { AddTicket } from '@/domain/usecases/add-ticket'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { ObjectId } from 'mongodb'

export class ProjectMongoRepository implements AddProjectRepository, AddTicketRepository {
  async addProject (params: AddProjectRepository.Params): Promise<AddProjectRepository.Result> {
    const projectCollection = await MongoHelper.getCollection('projects')
    const accountCollection = await MongoHelper.getCollection('accounts')

    const result = await projectCollection.insertOne(params)
    const project = MongoHelper.mapProject(result.ops[0])

    await accountCollection.findOneAndUpdate({ _id: new ObjectId(params.account) }, { $push: { projects: project.id } })

    return project
  }

  async addTicket (params: AddTicket.Params): Promise<TicketModel> {
    const ticketCollection = await MongoHelper.getCollection('tickets')
    const projectCollection = await MongoHelper.getCollection('projects')

    const result = await ticketCollection.insertOne(params)
    const ticket = MongoHelper.mapTicket(result.ops[0])

    await projectCollection.updateOne({ _id: params.project }, { $push: { tickets: ticket.id } })
    return ticket
  }
}
