import { AddProjectController } from '@/presentation/controllers/add-project-controller'
import { MissingParamError } from '@/presentation/errors'
import { badRequest } from '@/presentation/helpers/http/http-helper'
import { Controller, Validation } from '@/presentation/protocols'
import { mockProjectParams } from '@/tests/domain/mocks'
import { mockProjectValidation } from '@/tests/presentation/mocks'

type SutTypes = {
  sut: Controller
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const validationStub = mockProjectValidation()
  const sut = new AddProjectController(validationStub)
  return {
    sut,
    validationStub
  }
}

describe('CreateProjectController', () => {
  it('should call validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(mockProjectParams())
    expect(validateSpy).toHaveBeenCalledWith({
      account: 'any_owner_id',
      title: 'any_title',
      description: 'any_description'
    })
  })

  it('should return 400 if validation fails', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('title'))
    const error = await sut.handle(mockProjectParams())
    expect(error).toEqual(badRequest(new MissingParamError('title')))
  })
})
