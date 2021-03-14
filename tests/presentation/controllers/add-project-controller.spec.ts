import { AddProjectController } from '@/presentation/controllers/add-project-controller'
import { MissingParamError } from '@/presentation/errors'
import { badRequest } from '@/presentation/helpers/http/http-helper'
import { Controller, Validation } from '@/presentation/protocols'
import { mockAddProject, mockProjectParams } from '@/tests/domain/mocks'
import { mockProjectValidation } from '@/tests/presentation/mocks'
import { AddProject } from '@/domain/usecases'

type SutTypes = {
  sut: Controller
  validationStub: Validation
  addProjectStub: AddProject
}

const makeSut = (): SutTypes => {
  const validationStub = mockProjectValidation()
  const addProjectStub = mockAddProject()
  const sut = new AddProjectController(validationStub, addProjectStub)
  return {
    sut,
    validationStub,
    addProjectStub
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

  it('should call addProject with correct values', async () => {
    const { sut, addProjectStub } = makeSut()
    const addSpy = jest.spyOn(addProjectStub, 'add')
    await sut.handle(mockProjectParams())
    expect(addSpy).toHaveBeenCalledWith(mockProjectParams())
  })
})
