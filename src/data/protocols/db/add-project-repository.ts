import { ProjectModel } from '@/domain/models'
import { AddProject } from '@/domain/usecases'

export interface AddProjectRepository {
  addProject: (params: AddProjectRepository.Params) => Promise<AddProjectRepository.Result>
}

export namespace AddProjectRepository {
  export type Params = AddProject.Params
  export type Result = ProjectModel
}
