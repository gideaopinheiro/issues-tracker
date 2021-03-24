import { DbAddTicket } from '@/data/usecases/project/db-add-ticket'
import { AddTicket } from '@/domain/usecases/add-ticket'
import { ProjectMongoRepository } from '@/infra/db/mongodb/project-repository/project-mongo-repository'

export const makeAddTicket = (): AddTicket => {
  const projectMongoRepository = new ProjectMongoRepository()
  return new DbAddTicket(projectMongoRepository)
}
