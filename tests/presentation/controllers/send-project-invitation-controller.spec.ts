import { SendProjectInvitationController } from '@/presentation/controllers/send-project-invitation-controller'
import { MissingParamError } from '@/presentation/errors'
import { badRequest } from '@/presentation/helpers/http/http-helper'
import { Controller, Validation } from '@/presentation/protocols'
import { mockProjectInvitation } from '@/tests/domain/mocks/mock-project-invitation'
import { mockValidation } from '@/tests/presentation/mocks'

type SutTypes = {
  sut: Controller
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const validationStub = mockValidation()
  const sut = new SendProjectInvitationController(validationStub)
  return {
    sut,
    validationStub
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
})
