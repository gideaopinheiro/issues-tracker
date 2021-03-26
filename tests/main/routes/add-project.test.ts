import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import app from '@/main/config/app'
import env from '@/main/config/env'
import { Collection } from 'mongodb'
import request from 'supertest'

describe('AddProject Route', () => {
  let accountCollection: Collection
  let projectCollection: Collection

  beforeAll(async () => {
    await MongoHelper.connect(env.mongoUrl)
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    projectCollection = await MongoHelper.getCollection('projects')
    await accountCollection.deleteMany({})
    await projectCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('should return 200 on success', async () => {
    const result = await accountCollection.insertOne({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'hashed_password',
      status: 'active',
      projects: []
    })
    const account = MongoHelper.mapAccount(result.ops[0])
    await request(app)
      .post('/api/projects/add')
      .send({
        account: account.id,
        title: 'any_title',
        description: 'any_description'
      })
      .expect(200)
  })
})
