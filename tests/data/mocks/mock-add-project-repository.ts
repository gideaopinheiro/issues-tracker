import { mockProject } from '../../domain/mocks'
import { ProjectModel } from '../../domain/models'
import { AddProject } from '../../domain/usecases'
import { AddProjectRepository } from '../protocols/db'

export const mockAddProjectRepository = (): AddProjectRepository => {
  class AddProjectRepositoryStub implements AddProjectRepository {
    async addProject (params: AddProject.Params): Promise<ProjectModel> {
      return Promise.resolve(mockProject())
    }
  }
  return new AddProjectRepositoryStub()
}
