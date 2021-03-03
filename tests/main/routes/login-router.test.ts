import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import app from '@/main/config/app'
import env from '@/main/config/env'
import { hash } from 'bcrypt'
import { Collection } from 'mongodb'
import request from 'supertest'

describe('LoginRouter', () => {
  let accountCollection: Collection

  beforeAll(async () => {
    await MongoHelper.connect(env.mongoUrl)
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('should return 200 on login', async () => {
    const passwd = await hash('any_password', 12)
    await accountCollection.insertOne({
      name: 'Gideao',
      email: 'gideao.email@gmail.com',
      password: passwd
    })
    await request(app).post('/api/login')
      .send({
        email: 'gideao.email@gmail.com',
        password: 'any_password'
      })
      .expect(200)
  })
})
