import { AddProjectRepository } from '@/data/protocols/db'
import { DbAddProject } from '@/data/usecases/project/db-add-project'
import { AddProject } from '@/domain/usecases'
import { mockAddProjectRepository } from '@/tests/data/mocks'
import { mockProjectParams } from '@/tests/domain/mocks'

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
      owner_id: 'any_owner_id',
      title: 'any_title',
      description: 'any_description'
    })
  })
})
