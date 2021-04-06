import { DbSendProjectInvitation } from '@/data/usecases/project/db-send-project-invitation'
import { ProjectMongoRepository } from '@/infra/db/mongodb/project-repository/project-mongo-repository'

export const makeDbSendProjectInvitation = (): DbSendProjectInvitation => {
  const mongoProjectRepository = new ProjectMongoRepository()
  return new DbSendProjectInvitation(mongoProjectRepository)
}
