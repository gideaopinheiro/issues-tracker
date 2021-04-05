import { ProjectInvitationModel } from '@/domain/models'
import { badRequest } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpResponse, Validation } from '@/presentation/protocols'

export class SendProjectInvitationController implements Controller {
  constructor (private readonly validation: Validation) {}

  async handle (params: SendProjectInvitationController.Params): Promise<HttpResponse> {
    const error = this.validation.validate(params)
    if (error) {
      return badRequest(error)
    }
    return null
  }
}

export namespace SendProjectInvitationController {
  export type Params = ProjectInvitationModel
}
