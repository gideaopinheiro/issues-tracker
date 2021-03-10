import { mockValidation } from '../mocks'
import { mockConfirmationRequest } from '../mocks/mock-confirmation-request'
import { Controller, Validation } from '../protocols'
import { ConfirmationController } from '@/presentation/controllers/confirmation-controller'
import { AccountConfirmation } from '@/domain/usecases'
import { mockAccountConfirmation } from '@/tests/domain/mocks/mock-account-confirmation'

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
})
