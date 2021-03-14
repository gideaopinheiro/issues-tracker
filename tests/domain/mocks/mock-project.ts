import { ProjectModel } from '@/domain/models'
import { AddProject } from '../usecases'

export const mockProject = (): ProjectModel => ({
  id: 'any_project_id',
  account: 'any_owner_id',
  title: 'any_title',
  description: 'any_description'
})

export const mockProjectParams = (): AddProject.Params => ({
  account: 'any_owner_id',
  title: 'any_title',
  description: 'any_description'
})

export const mockAddProject = (): AddProject => {
  class AddProjectStub implements AddProject {
    async add (params: AddProject.Params): Promise<ProjectModel> {
      return Promise.resolve(mockProject())
    }
  }
  return new AddProjectStub()
}
