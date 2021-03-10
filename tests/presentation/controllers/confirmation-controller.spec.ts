import { AccountConfirmation } from '@/domain/usecases'
import { ConfirmationController } from '@/presentation/controllers/confirmation-controller'
import { MissingParamError } from '@/presentation/errors'
import { badRequest, serverError, unauthorized } from '@/presentation/helpers/http/http-helper'
import { Controller, Validation } from '@/presentation/protocols'
import { mockAccountConfirmation } from '@/tests/domain/mocks/mock-account-confirmation'
import { mockValidation } from '../mocks'
import { mockConfirmationRequest } from '../mocks/mock-confirmation-request'

type SutTypes = {
  sut: Controller
  validationStub: Validation
  accountConfirmationStub: AccountConfirmation
}

const makeSut = (): SutTypes => {
  const validationStub = mockValidation()
  const accountConfirmationStub = mockAccountConfirmation()
  const sut = new ConfirmationController(validationStub, accountConfirmationStub)
  return {
    sut,
    validationStub,
    accountConfirmationStub
  }
}

describe('Confirmation Controller', () => {
  test('should call validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(mockConfirmationRequest())
    expect(validateSpy).toHaveBeenCalledWith({ confirmationCode: 'any_confirmation_code' })
  })

  test('should return 400 if validation fails', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('confirmationCode'))
    const response = await sut.handle({ confirmationCode: 'any_confirmation_code' })
    expect(response).toEqual(badRequest(new MissingParamError('confirmationCode')))
  })

  test('should return 401 if accountConfirmation fails', async () => {
    const { sut, accountConfirmationStub } = makeSut()
    jest.spyOn(accountConfirmationStub, 'confirm').mockReturnValueOnce(Promise.resolve(null))
    const response = await sut.handle({ confirmationCode: 'any_confirmation_code' })
    expect(response).toEqual(unauthorized())
  })

  test('shuld return 500 if accountConfirmation throws', async () => {
    const { sut, accountConfirmationStub } = makeSut()
    jest.spyOn(accountConfirmationStub, 'confirm').mockReturnValueOnce(Promise.reject(new Error()))
    const response = await sut.handle({ confirmationCode: 'any_confirmation_code' })
    expect(response).toEqual(serverError(new Error()))
  })
})
