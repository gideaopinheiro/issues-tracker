import { mockValidation } from '../mocks'
import { mockConfirmationRequest } from '../mocks/mock-confirmation-request'
import { Controller, Validation } from '../protocols'
import { ConfirmationController } from '@/presentation/controllers/confirmation-controller'

type SutTypes = {
  sut: Controller
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const validationStub = mockValidation()
  const sut = new ConfirmationController(validationStub)
  return {
    sut,
    validationStub
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
