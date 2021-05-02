import { RandomIdGenerator } from '@/data/protocols/criptography/random-id-generator'
import { AcceptProjectInvitationRepository, AddProjectRepository, AddTicketCommentRepository, AddTicketRepository } from '@/data/protocols/db'
import { SendProjectInvitationRepository } from '@/data/protocols/db/send-project-invitation-repository'
import { TicketModel } from '@/domain/models'
import { AddTicket } from '@/domain/usecases/add-ticket'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { ObjectId } from 'mongodb'

export class ProjectMongoRepository implements AddProjectRepository, AddTicketRepository, AddTicketCommentRepository, SendProjectInvitationRepository, AcceptProjectInvitationRepository {
  constructor (private readonly randomIdGenerator: RandomIdGenerator) {}

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

  async addComment (params: AddTicketCommentRepository.Params): Promise<AddTicketCommentRepository.Result> {
    const ticketCollection = await MongoHelper.getCollection('tickets')
    await ticketCollection.updateOne({
      _id: new ObjectId(params.ticket)
    }, {
      $push: {
        comments: {
          message: params.message,
          createdAt: new Date()
        }
      }
    })
    const result = await ticketCollection.findOne({ _id: new ObjectId(params.ticket) })
    const ticket = MongoHelper.mapTicket(result.ops[0])
    return ticket.coments[ticket.coments.length - 1]
  }

  async sendProjectInvitation (params: SendProjectInvitationRepository.Params): Promise<void> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const projectCollection = await MongoHelper.getCollection('projects')
    const invitationId = this.randomIdGenerator.generateId()
    await accountCollection.updateOne({
      _id: new ObjectId(params.to)
    }, {
      $push: {
        invitations: {
          id: invitationId,
          from: params.from,
          status: params.status,
          project: params.project,
          message: params.message
        }
      }
    })
    await projectCollection.updateOne({
      _id: new ObjectId(params.project)
    }, {
      $push: {
        invitationsSent: {
          id: invitationId,
          from: params.from,
          to: params.to,
          status: params.status,
          message: params.message
        }
      }
    })
  }

  async acceptProjectInvitation (params: AcceptProjectInvitationRepository.Params): Promise<void> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const projectCollection = await MongoHelper.getCollection('projects')
    await projectCollection.updateOne({
      _id: new ObjectId(params.projectId)
    }, {
      $pull: {
        invitationsSent: {
          id: params.invitationId
        }
      }
    })
    await accountCollection.updateOne({
      _id: new ObjectId(params.sentTo)
    }, {
      $pull: {
        invitations: {
          id: params.invitationId
        }
      }
    })
  }
}
