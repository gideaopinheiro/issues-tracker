import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import app from '@/main/config/app'
import env from '@/main/config/env'
import { sign } from 'jsonwebtoken'
import { Collection } from 'mongodb'
import request from 'supertest'

let accountCollection: Collection

const mockAccessToken = async (): Promise<{ token: string, accountId: string }> => {
  const res = await accountCollection.insertOne({
    name: 'Gideao',
    email: 'gideaopinheiro@gmail.com',
    password: '123',
    role: 'admin'
  })
  const id = res.ops[0]._id
  const accessToken = sign({ id }, env.secretKey)
  await accountCollection.updateOne({
    _id: id
  }, {
    $set: {
      accessToken
    }
  })
  return { token: accessToken, accountId: id }
}

describe('AddProject Route', () => {
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
    const { token, accountId } = await mockAccessToken()
    await request(app)
      .post('/api/projects/add')
      .set('access-token', token)
      .send({
        account: accountId,
        title: 'any_title',
        description: 'any_description'
      })
      .expect(200)
  })
})
