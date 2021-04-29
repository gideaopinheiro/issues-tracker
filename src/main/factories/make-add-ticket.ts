import { DbAddTicket } from '@/data/usecases/project/db-add-ticket'
import { AddTicket } from '@/domain/usecases/add-ticket'
import { ProjectMongoRepository } from '@/infra/db/mongodb/project-repository/project-mongo-repository'
import { UuidAdapter } from '@/infra/criptography/uuid-adapter'

export const makeAddTicket = (): AddTicket => {
  const randomIdGenerator = new UuidAdapter()
  const projectMongoRepository = new ProjectMongoRepository(randomIdGenerator)
  return new DbAddTicket(projectMongoRepository)
}
