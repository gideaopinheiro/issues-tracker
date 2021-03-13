import { AddProjectRepository } from '@/data/protocols/db'
import { DbAddProject } from '@/data/usecases/project/db-add-project'
import { AddProject } from '@/domain/usecases'
import { mockAddProjectRepository } from '@/tests/data/mocks'
import { mockProject, mockProjectParams } from '@/tests/domain/mocks'

type SutTypes = {
  sut: AddProject
  addProjectRepositoryStub: AddProjectRepository
}

const makeSut = (): SutTypes => {
  const addProjectRepositoryStub = mockAddProjectRepository()
  const sut = new DbAddProject(addProjectRepositoryStub)
  return {
    sut,
    addProjectRepositoryStub
  }
}

describe('DbAddProject', () => {
  it('should call addProjectRepository with correct values', async () => {
    const { sut, addProjectRepositoryStub } = makeSut()
    const addProjectSpy = jest.spyOn(addProjectRepositoryStub, 'addProject')
    await sut.add(mockProjectParams())
    expect(addProjectSpy).toHaveBeenCalledWith({
      ownerId: 'any_owner_id',
      title: 'any_title',
      description: 'any_description'
    })
  })

  it('should throw if addProjectRepository throws', async () => {
    const { sut, addProjectRepositoryStub } = makeSut()
    jest.spyOn(addProjectRepositoryStub, 'addProject').mockReturnValueOnce(Promise.reject(new Error()))
    const response = sut.add(mockProjectParams())
    await expect(response).rejects.toThrow()
  })

  it('should return a project on success', async () => {
    const { sut } = makeSut()
    const response = await sut.add(mockProjectParams())
    expect(response).toEqual(mockProject())
  })
})
