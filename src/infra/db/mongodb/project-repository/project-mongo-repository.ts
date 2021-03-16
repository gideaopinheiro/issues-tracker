import { AddProjectRepository } from '@/data/protocols/db'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { ObjectId } from 'mongodb'

export class ProjectMongoRepository implements AddProjectRepository {
  async addProject (params: AddProjectRepository.Params): Promise<AddProjectRepository.Result> {
    const projectCollection = await MongoHelper.getCollection('projects')
    const accountCollection = await MongoHelper.getCollection('accounts')

    const result = await projectCollection.insertOne(params)
    const project = MongoHelper.mapProject(result.ops[0])

    await accountCollection.findOneAndUpdate({ _id: new ObjectId(params.account) }, { $push: { projects: project.id } })

    return project
  }
}
