import { Controller } from '@/presentation/protocols/controller'
import { SignUpController } from '@/presentation/controllers/signup-controller'
import { MissingParamError } from '@/presentation/errors/missing-param-error'
import { mockEmailValidator } from '../mocks/mock-email-validator'
import { EmailValidator } from '@/validation/protocols/email-validator'
import { mockRequest } from '../mocks/mock-request'

type SutTypes = {
  sut: Controller
  emailValidatorStub: EmailValidator
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = mockEmailValidator()
  const sut = new SignUpController(emailValidatorStub)
  return {
    sut,
    emailValidatorStub
  }
}

describe('SignUpController', () => {
  test('Should return 400 if no name is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      email: 'any_email@mail.com',
      password: 'any_password',
      passwordConfirmation: 'any_password'
    })
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
  })

  test('Should return 400 if no email is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      name: 'any_name',
      password: 'any_password',
      passwordConfirmation: 'any_password'
    })
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })

  test('Should call emailValidator with correct value', async () => {
    const { sut, emailValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    await sut.handle(mockRequest())
    expect(isValidSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
})
