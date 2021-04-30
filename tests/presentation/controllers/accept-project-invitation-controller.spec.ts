import { AcceptProjectInvitationController } from '@/presentation/controllers/accept-project-invitation-controller'
import { Controller, Validation } from '@/presentation/protocols'
import { mockValidation } from '@/tests/presentation/mocks'
import { mockAcceptInvitationRequest } from '@/tests/presentation/mocks/mock-accept-invitation-request'

type SutTypes = {
  sut: Controller
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const validationStub = mockValidation()
  const sut = new AcceptProjectInvitationController(validationStub)
  return {
    sut,
    validationStub
  }
}

describe('AcceptProjectInvitationController', () => {
  test('should call validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(mockAcceptInvitationRequest())
    expect(validateSpy).toHaveBeenCalledWith(mockAcceptInvitationRequest())
  })
})