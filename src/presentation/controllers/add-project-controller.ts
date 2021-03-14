import { ProjectModel } from '@/domain/models'
import { badRequest } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpResponse, Validation } from '@/presentation/protocols'

export class AddProjectController implements Controller {
  constructor (private readonly validation: Validation) {}

  async handle (params: AddProjectController.Params): Promise<HttpResponse> {
    const error = this.validation.validate(params)
    if (error) {
      return badRequest(error)
    }
    return null
  }
}

export namespace AddProjectController {
  export type Params = ProjectModel
}
