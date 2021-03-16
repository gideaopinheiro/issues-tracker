import { Controller } from '@/presentation/protocols'
import { LogErrorMongoRepository } from '@/infra/db/mongodb/log/log-error-repository'
import { AddProjectController } from '@/presentation/controllers/add-project-controller'
import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator'
import { makeAddProjectValidation } from './add-project-validation-factory'
import { makeAddProject } from './make-add-project'

export const makeAddProjectController = (): Controller => {
  const addProjectController = new AddProjectController(makeAddProjectValidation(), makeAddProject())
  const logErrorMongoRepository = new LogErrorMongoRepository()
  return new LogControllerDecorator(addProjectController, logErrorMongoRepository)
}
