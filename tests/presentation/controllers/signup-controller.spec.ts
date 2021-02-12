import { AddAccount } from '@/domain/usecases'
import { SignUpController } from '@/presentation/controllers/signup-controller'
import { InvalidParamError, MissingParamError } from '@/presentation/errors'
import { badRequest, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller } from '@/presentation/protocols'
import { mockAccount, mockAddAccount, mockAddAccountParams } from '@/tests/domain/mocks'
import { mockEmailValidator, mockRequest } from '@/tests/presentation/mocks'
import { EmailValidator } from '@/validation/protocols/email-validator'

type SutTypes = {
  sut: Controller
  emailValidatorStub: EmailValidator
  addAccountStub: AddAccount
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = mockEmailValidator()
  const addAccountStub = mockAddAccount()
  const sut = new SignUpController(emailValidatorStub, addAccountStub)
  return {
    sut,
    emailValidatorStub,
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
    const { sut, emailValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    await sut.handle(mockRequest())
    expect(isValidSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  test('Should return 400 if an invalid email is provided', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
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

  test('Should return 500 if validation throws', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 500 if validation throws', async () => {
    const { sut, addAccountStub } = makeSut()
    jest.spyOn(addAccountStub, 'add').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(mockAccount()))
  })
})
