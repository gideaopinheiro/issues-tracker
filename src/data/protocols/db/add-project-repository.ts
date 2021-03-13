import { ProjectModel } from '@/domain/models'
import { AddProject } from '@/domain/usecases'

export interface AddProjectRepository {
  addProject: (params: AddProject.Params) => Promise<ProjectModel>
}
