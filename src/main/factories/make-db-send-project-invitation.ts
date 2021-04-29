import { DbSendProjectInvitation } from '@/data/usecases/project/db-send-project-invitation'
import { ProjectMongoRepository } from '@/infra/db/mongodb/project-repository/project-mongo-repository'
import { UuidAdapter } from '@/infra/criptography/uuid-adapter'

export const makeDbSendProjectInvitation = (): DbSendProjectInvitation => {
  const randomIdGenerator = new UuidAdapter()
  const mongoProjectRepository = new ProjectMongoRepository(randomIdGenerator)
  return new DbSendProjectInvitation(mongoProjectRepository)
}
