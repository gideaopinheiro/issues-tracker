import { DbAcceptProjectInvitation } from '@/data/usecases/project/db-accept-project-invitation'
import { UuidAdapter } from '@/infra/criptography/uuid-adapter'
import { ProjectMongoRepository } from '@/infra/db/mongodb/project-repository/project-mongo-repository'

export const makeDbAcceptProjectInvitation = (): DbAcceptProjectInvitation => {
  const randomUuid = new UuidAdapter()
  const mongoProjectRepository = new ProjectMongoRepository(randomUuid)
  return new DbAcceptProjectInvitation(mongoProjectRepository)
}
