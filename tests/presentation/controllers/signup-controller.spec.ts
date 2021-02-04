import { Controller } from '@/presentation/protocols/controller'
import { SignUpController } from '@/presentation/controllers/signup-controller'

const makeSut = (): Controller => {
  const sut = new SignUpController()
  return sut
}

describe('SignUpController', () => {
  test('Should return 400 if no name is provided', async () => {
    const sut = makeSut()
    const httpResponse = await sut.handle({
      email: 'any_email@mail.com',
      password: 'any_password',
      passwordConfirmation: 'any_password'
    })
    expect(httpResponse.statusCode).toBe(400)
  })
})
