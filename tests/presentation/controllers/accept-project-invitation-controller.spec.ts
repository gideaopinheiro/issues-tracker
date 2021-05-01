import { AcceptProjectInvitation } from '@/domain/usecases'
import { AcceptProjectInvitationController } from '@/presentation/controllers/accept-project-invitation-controller'
import { MissingParamError } from '@/presentation/errors'
import { badRequest, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, Validation } from '@/presentation/protocols'
import { mockAcceptProjectInvitation } from '@/tests/domain/mocks/mock-accept-project-invitation'
import { mockValidation } from '@/tests/presentation/mocks'
import { mockAcceptInvitationRequest } from '@/tests/presentation/mocks/mock-accept-invitation-request'

type SutTypes = {
  sut: Controller
  validationStub: Validation
  acceptProjectInvitationStub: AcceptProjectInvitation
}

const makeSut = (): SutTypes => {
  const validationStub = mockValidation()
  const acceptProjectInvitationStub = mockAcceptProjectInvitation()
  const sut = new AcceptProjectInvitationController(validationStub, acceptProjectInvitationStub)
  return {
    sut,
    validationStub,
    acceptProjectInvitationStub
  }
}

describe('AcceptProjectInvitationController', () => {
  test('should call validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(mockAcceptInvitationRequest())
    expect(validateSpy).toHaveBeenCalledWith(mockAcceptInvitationRequest())
  })

  test('should return 400 if validation fails', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('sentBy'))
    const httpResponse = await sut.handle(mockAcceptInvitationRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('sentBy')))
  })

  test('should call AcceptProjectInvitation with correct values', async () => {
    const { sut, acceptProjectInvitationStub } = makeSut()
    const acceptSpy = jest.spyOn(acceptProjectInvitationStub, 'accept')
    await sut.handle(mockAcceptInvitationRequest())
    expect(acceptSpy).toHaveBeenCalledWith(mockAcceptInvitationRequest())
  })

  test('should return 500 if AcceptProjectInvitation fails', async () => {
    const { sut, acceptProjectInvitationStub } = makeSut()
    jest.spyOn(acceptProjectInvitationStub, 'accept').mockReturnValueOnce(Promise.reject(new Error()))
    const httpResponse = await sut.handle(mockAcceptInvitationRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockAcceptInvitationRequest())
    expect(httpResponse).toEqual(ok('invitation accepted successfully'))
  })
})
