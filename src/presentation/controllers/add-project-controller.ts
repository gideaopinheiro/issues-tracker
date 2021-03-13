import { ProjectModel } from '@/domain/models'
import { Controller, HttpResponse, Validation } from '@/presentation/protocols'

export class AddProjectController implements Controller {
  constructor (private readonly validation: Validation) {}

  async handle (params: CreateProjectController.Params): Promise<HttpResponse> {
    this.validation.validate(params)
    return null
  }
}

export namespace CreateProjectController {
  export type Params = ProjectModel
}
