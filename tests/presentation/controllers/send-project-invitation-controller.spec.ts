import { SendProjectInvitation } from '@/domain/usecases'
import { SendProjectInvitationController } from '@/presentation/controllers/send-project-invitation-controller'
import { MissingParamError } from '@/presentation/errors'
import { badRequest, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, Validation } from '@/presentation/protocols'
import { mockProjectInvitation } from '@/tests/domain/mocks/mock-project-invitation'
import { mockValidation } from '@/tests/presentation/mocks'
import { mockSendProjectInvitation } from '@/tests/domain/mocks'

type SutTypes = {
  sut: Controller
  validationStub: Validation
  sendProjectInvitationStub: SendProjectInvitation
}

const makeSut = (): SutTypes => {
  const validationStub = mockValidation()
  const sendProjectInvitationStub = mockSendProjectInvitation()
  const sut = new SendProjectInvitationController(validationStub, sendProjectInvitationStub)
  return {
    sut,
    validationStub,
    sendProjectInvitationStub
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
    const { sut, sendProjectInvitationStub } = makeSut()
    const addSpy = jest.spyOn(sendProjectInvitationStub, 'add')
    await sut.handle(mockProjectInvitation())
    expect(addSpy).toHaveBeenCalledWith(mockProjectInvitation())
  })

  test('should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockProjectInvitation())
    expect(httpResponse).toEqual(ok('invitation sent'))
  })

  test('should return 500 if SendProjectInvitationRepository throws', async () => {
    const { sut, sendProjectInvitationStub } = makeSut()
    jest.spyOn(sendProjectInvitationStub, 'add').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(mockProjectInvitation())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
