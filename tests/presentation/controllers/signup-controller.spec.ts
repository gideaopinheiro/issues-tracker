import { AddAccount } from '@/domain/usecases'
import { Authentication } from '@/domain/usecases/authentication'
import { EmailTokenGenerator } from '@/domain/usecases/email-token-generator'
import { SignUpController } from '@/presentation/controllers/signup-controller'
import { EmailAlreadyInUseError } from '@/presentation/errors'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, Validation } from '@/presentation/protocols'
import { mockAddAccount, mockAddAccountParams, mockAuthentication, mockEmailTokenGenerator } from '@/tests/domain/mocks'
import { mockRequest } from '@/tests/presentation/mocks'
import { mockValidation } from '@/tests/presentation/mocks/mock-validation'

type SutTypes = {
  sut: Controller
  addAccountStub: AddAccount
  validationStub: Validation
  authenticationStub: Authentication
  emailTokenGeneratorStub: EmailTokenGenerator
}

const makeSut = (): SutTypes => {
  const addAccountStub = mockAddAccount()
  const validationStub = mockValidation()
  const authenticationStub = mockAuthentication()
  const emailTokenGeneratorStub = mockEmailTokenGenerator()
  const sut = new SignUpController(addAccountStub, validationStub, authenticationStub, emailTokenGeneratorStub)
  return {
    sut,
    addAccountStub,
    validationStub,
    authenticationStub,
    emailTokenGeneratorStub
  }
}

describe('SignUpController', () => {
  test('Should call validation with correct value', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(mockRequest())
    expect(validateSpy).toHaveBeenCalledWith(mockRequest())
  })

  test('should return 400 if validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('should returns 500 if addAccount throws', async () => {
    const { sut, addAccountStub } = makeSut()
    jest.spyOn(addAccountStub, 'add').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should call addAccount with correct values', async () => {
    const { sut, addAccountStub } = makeSut()
    const addSpy = jest.spyOn(addAccountStub, 'add')
    await sut.handle(mockRequest())
    expect(addSpy).toHaveBeenCalledWith(mockAddAccountParams())
  })

  test('should return 403 if addAccount returns null', async () => {
    const { sut, addAccountStub } = makeSut()
    jest.spyOn(addAccountStub, 'add').mockReturnValueOnce(Promise.resolve(null))
    const request = mockRequest()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(forbidden(new EmailAlreadyInUseError(request.email)))
  })

  test('should call authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut()
    const authSpy = jest.spyOn(authenticationStub, 'auth')
    await sut.handle(mockRequest())
    expect(authSpy).toHaveBeenCalledWith({ email: 'any_email@mail.com', password: 'any_password' })
  })

  test('should call emailTokenGenerator with correct value', async () => {
    const { sut, emailTokenGeneratorStub } = makeSut()
    const generateTokenSpy = jest.spyOn(emailTokenGeneratorStub, 'generateToken')
    await sut.handle(mockRequest())
    expect(generateTokenSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  test('Should return 200 on success', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(Promise.resolve('any_access_token'))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok('any_access_token'))
  })
})
