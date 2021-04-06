import { SendProjectInvitationRepository } from '@/data/protocols/db/send-project-invitation-repository'
import { SendProjectInvitationController } from '@/presentation/controllers/send-project-invitation-controller'
import { MissingParamError } from '@/presentation/errors'
import { badRequest, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, Validation } from '@/presentation/protocols'
import { mockSendProjectInvitationRepository } from '@/tests/data/mocks/mock-send-project-invitation-repository'
import { mockProjectInvitation } from '@/tests/domain/mocks/mock-project-invitation'
import { mockValidation } from '@/tests/presentation/mocks'

type SutTypes = {
  sut: Controller
  validationStub: Validation
  sendProjectInvitationRepositoryStub: SendProjectInvitationRepository
}

const makeSut = (): SutTypes => {
  const validationStub = mockValidation()
  const sendProjectInvitationRepositoryStub = mockSendProjectInvitationRepository()
  const sut = new SendProjectInvitationController(validationStub, sendProjectInvitationRepositoryStub)
  return {
    sut,
    validationStub,
    sendProjectInvitationRepositoryStub
  }
}

describe('SendProjectInvitation Controller', () => {
  test('should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(mockProjectInvitation())
    expect(validateSpy).toHaveBeenCalledWith(mockProjectInvitation())
  })

  test('should return 400 if validation fails', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('from'))
    const httpResponse = await sut.handle(mockProjectInvitation())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('from')))
  })

  test('should call SendProjectInvitationRepository with correct values', async () => {
    const { sut, sendProjectInvitationRepositoryStub } = makeSut()
    const sendProjectInvitationSpy = jest.spyOn(sendProjectInvitationRepositoryStub, 'sendProjectInvitation')
    await sut.handle(mockProjectInvitation())
    expect(sendProjectInvitationSpy).toHaveBeenCalledWith(mockProjectInvitation())
  })

  test('should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockProjectInvitation())
    expect(httpResponse).toEqual(ok('invitation sent'))
  })

  test('should return 500 if SendProjectInvitationRepository throws', async () => {
    const { sut, sendProjectInvitationRepositoryStub } = makeSut()
    jest.spyOn(sendProjectInvitationRepositoryStub, 'sendProjectInvitation').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(mockProjectInvitation())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
