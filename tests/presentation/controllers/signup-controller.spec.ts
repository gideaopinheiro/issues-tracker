import { Controller } from '@/presentation/protocols/controller'
import { SignUpController } from '@/presentation/controllers/signup-controller'
import { MissingParamError } from '@/presentation/errors/missing-param-error'

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
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
  })

  test('Should return 400 if no email is provided', async () => {
    const sut = makeSut()
    const httpResponse = await sut.handle({
      name: 'any_name',
      password: 'any_password',
      passwordConfirmation: 'any_password'
    })
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })
})
