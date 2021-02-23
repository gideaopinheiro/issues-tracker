import { Authentication } from '@/domain/usecases/authentication'
import { LoginController } from '@/presentation/controllers/login-controller'
import { MissingParamError } from '@/presentation/errors'
import { badRequest, unauthorized } from '@/presentation/helpers/http/http-helper'
import { Controller, Validation } from '@/presentation/protocols'
import { mockAuthentication } from '@/tests/domain/mocks/mock-authentication'
import { mockLoginRequest, mockValidation } from '@/tests/presentation/mocks'

type SutTypes = {
  sut: Controller
  validationStub: Validation
  authenticationStub: Authentication
}

const makeSut = (): SutTypes => {
  const validationStub = mockValidation()
  const authenticationStub = mockAuthentication()
  const sut = new LoginController(validationStub, authenticationStub)
  return {
    sut,
    validationStub,
    authenticationStub
  }
}

describe('Login Controller', () => {
  test('should call validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(mockLoginRequest())
    expect(validateSpy).toHaveBeenCalledWith({ email: 'any_email@mail.com', password: 'any_password' })
  })

  test('should return 400 if validation fails', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('email'))
    const httpResponse = await sut.handle(mockLoginRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })

  test('should call authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut()
    const authSpy = jest.spyOn(authenticationStub, 'auth')
    await sut.handle(mockLoginRequest())
    expect(authSpy).toHaveBeenCalledWith({ email: 'any_email@mail.com', password: 'any_password' })
  })

  test('should return 401 if authentication fails', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(Promise.resolve(null))
    const httpResponse = await sut.handle(mockLoginRequest())
    expect(httpResponse).toEqual(unauthorized())
  })
})
