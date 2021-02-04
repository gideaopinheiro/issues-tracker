import { SignUpController } from '@/presentation/controllers/signup-controller'
import { InvalidParamError, MissingParamError } from '@/presentation/errors'
import { Controller } from '@/presentation/protocols/controller'
import { mockEmailValidation } from '@/tests/presentation/mocks/mock-email-validator'
import { mockRequest } from '@/tests/presentation/mocks/mock-request'
import { Validation } from '@/presentation/protocols'

type SutTypes = {
  sut: Controller
  emailValidationStub: Validation
}

const makeSut = (): SutTypes => {
  const emailValidationStub = mockEmailValidation()
  const sut = new SignUpController(emailValidationStub)
  return {
    sut,
    emailValidationStub
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

  test('Should call validation with correct value', async () => {
    const { sut, emailValidationStub } = makeSut()
    const validateSpy = jest.spyOn(emailValidationStub, 'validate')
    await sut.handle(mockRequest())
    expect(validateSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  test('Should return 400 if an invalid email is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      name: 'any_name',
      email: 'invalid_email',
      password: 'any_passwod',
      passwordConfirmation: 'any_password'
    })
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('email'))
  })
})
