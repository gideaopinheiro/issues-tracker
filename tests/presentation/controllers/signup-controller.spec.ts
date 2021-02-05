import { SignUpController } from '@/presentation/controllers/signup-controller'
import { InvalidParamError, MissingParamError } from '@/presentation/errors'
import { Controller, Validation } from '@/presentation/protocols'
import { mockEmailValidation } from '@/tests/presentation/mocks/mock-email-validator'
import { mockRequest } from '@/tests/presentation/mocks/mock-request'
import { badRequest } from '@/presentation/helpers/http/http-helper'
import { AddAccount } from '@/domain/usecases'
import { mockAddAccount, mockAddAccountParams } from '@/tests/domain/mocks'

type SutTypes = {
  sut: Controller
  emailValidationStub: Validation
  addAccountStub: AddAccount
}

const makeSut = (): SutTypes => {
  const emailValidationStub = mockEmailValidation()
  const addAccountStub = mockAddAccount()
  const sut = new SignUpController(emailValidationStub, addAccountStub)
  return {
    sut,
    emailValidationStub,
    addAccountStub
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
    expect(httpResponse).toEqual(badRequest(new MissingParamError('name')))
  })

  test('Should return 400 if no email is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      name: 'any_name',
      password: 'any_password',
      passwordConfirmation: 'any_password'
    })
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })

  test('Should return 400 if no password is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      name: 'any_name',
      email: 'any_email@mail.com',
      passwordConfirmation: 'any_password'
    })
    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
  })

  test('Should return 400 if no passwordConfirmation is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    })
    expect(httpResponse).toEqual(badRequest(new MissingParamError('passwordConfirmation')))
  })

  test('Should call validation with correct value', async () => {
    const { sut, emailValidationStub } = makeSut()
    const validateSpy = jest.spyOn(emailValidationStub, 'validate')
    await sut.handle(mockRequest())
    expect(validateSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  test('Should return 400 if an invalid email is provided', async () => {
    const { sut, emailValidationStub } = makeSut()
    jest.spyOn(emailValidationStub, 'validate').mockReturnValueOnce(new InvalidParamError('email'))
    const httpResponse = await sut.handle({
      name: 'any_name',
      email: 'invalid_email@mail.com',
      password: 'any_passwod',
      passwordConfirmation: 'any_password'
    })
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('email')))
  })

  test('Should return 400 if the password and passwordConfirmation does not match', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
      passwordConfirmation: 'another_password'
    })
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('password')))
  })

  test('Should call addAccount with correct values', async () => {
    const { sut, addAccountStub } = makeSut()
    const addSpy = jest.spyOn(addAccountStub, 'add')
    await sut.handle(mockRequest())
    expect(addSpy).toHaveBeenCalledWith(mockAddAccountParams())
  })
})
