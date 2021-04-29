import { DbAddProject } from '@/data/usecases/project/db-add-project'
import { ProjectMongoRepository } from '@/infra/db/mongodb/project-repository/project-mongo-repository'
import { UuidAdapter } from '@/infra/criptography/uuid-adapter'

export const makeAddProject = (): DbAddProject => {
  const randomIdGenerator = new UuidAdapter()
  const mongoProjectRepository = new ProjectMongoRepository(randomIdGenerator)
  return new DbAddProject(mongoProjectRepository)
}
