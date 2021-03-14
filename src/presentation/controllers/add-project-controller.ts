import { AddProject } from '@/domain/usecases'
import { badRequest, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpResponse, Validation } from '@/presentation/protocols'

export class AddProjectController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addProject: AddProject
  ) {}

  async handle (params: AddProjectController.Params): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(params)
      if (error) {
        return badRequest(error)
      }
      const project = await this.addProject.add(params)
      return ok(project)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace AddProjectController {
  export type Params = {
    account: string
    title: string
    description: string
    members?: Array<{ id: string, role: string }>
    tickets?: string[]
  }
}
