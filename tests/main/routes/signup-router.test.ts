import app from '@/main/config/app'
import request from 'supertest'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import env from '@/main/config/env'

describe('SignUp Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(env.mongoUrl)
  })

  beforeEach(async () => {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })
  test('should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      })
      .expect(200)
  })
})
