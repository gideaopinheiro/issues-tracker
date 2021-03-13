import { ProjectModel } from '@/domain/models'
import { AddProject } from '@/domain/usecases'
import { AddProjectRepository } from '@/data/protocols/db'

export class DbAddProject implements AddProject {
  constructor (private readonly addProjectRepository: AddProjectRepository) {}

  async add (params: AddProject.Params): Promise<ProjectModel> {
    await this.addProjectRepository.addProject(params)
    return null
  }
}
