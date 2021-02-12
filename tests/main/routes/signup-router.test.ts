import app from '@/main/config/app'
import request from 'supertest'
import { MonogHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import env from '@/main/config/env'

describe('SignUp Routes', () => {
  beforeAll(async () => {
    await MonogHelper.connect(env.mongoUrl)
  })

  beforeEach(async () => {
    const accountCollection = await MonogHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  afterAll(async () => {
    await MonogHelper.disconnect()
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
