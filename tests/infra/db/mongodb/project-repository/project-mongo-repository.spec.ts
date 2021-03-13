import { mockProjectParams } from '@/tests/domain/mocks'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { ProjectMongoRepository } from '@/infra/db/mongodb/project-repository/project-mongo-repository'

const makeSut = (): ProjectMongoRepository => {
  return new ProjectMongoRepository()
}

describe('ProjectMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  beforeEach(async () => {
    const projectCollection = await MongoHelper.getCollection('projects')
    await projectCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('should return a project on success', async () => {
    const sut = makeSut()
    const project = await sut.addProject(mockProjectParams())
    expect(project).toBeTruthy()
    expect(project.id).toBeTruthy()
    expect(project.description).toBe('any_description')
  })
})
