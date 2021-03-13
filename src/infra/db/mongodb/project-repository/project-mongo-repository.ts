import { AddProjectRepository } from '@/data/protocols/db'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'

export class ProjectMongoRepository implements AddProjectRepository {
  async addProject (params: AddProjectRepository.Params): Promise<AddProjectRepository.Result> {
    const projectCollection = await MongoHelper.getCollection('projects')
    const result = await projectCollection.insertOne(params)
    return MongoHelper.mapProject(result.ops[0])
  }
}
