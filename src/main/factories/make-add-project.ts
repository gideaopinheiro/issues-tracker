import { DbAddProject } from '@/data/usecases/project/db-add-project'
import { ProjectMongoRepository } from '@/infra/db/mongodb/project-repository/project-mongo-repository'

export const makeAddProject = (): DbAddProject => {
  const mongoProjectRepository = new ProjectMongoRepository()
  return new DbAddProject(mongoProjectRepository)
}
