import { badRequest } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { AddProject } from '@/domain/usecases'

export class AddProjectController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addProject: AddProject
  ) {}

  async handle (params: AddProjectController.Params): Promise<HttpResponse> {
    const error = this.validation.validate(params)
    if (error) {
      return badRequest(error)
    }
    await this.addProject.add(params)
    return null
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
