import { AddProjectRepository } from '@/data/protocols/db'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'

export class ProjectMongoRepository implements AddProjectRepository {
  async addProject (params: AddProjectRepository.Params): Promise<AddProjectRepository.Result> {
    const projectCollection = await MongoHelper.getCollection('projects')
    const accountCollection = await MongoHelper.getCollection('accounts')

    const result = await projectCollection.insertOne(params)
    const project = MongoHelper.mapProject(result.ops[0])

    await accountCollection.findOneAndUpdate({ _id: params.account }, { $push: { projects: project.id } })

    return project
  }
}
