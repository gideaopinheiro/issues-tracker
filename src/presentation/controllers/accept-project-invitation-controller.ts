import { badRequest } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpResponse, Validation } from '@/presentation/protocols'

export class AcceptProjectInvitationController implements Controller {
  constructor (private readonly validation: Validation) {}

  async handle (params: AcceptProjectInvitationController.Params): Promise<HttpResponse> {
    const error = this.validation.validate(params)
    if (error) {
      return badRequest(error)
    }
    return null
  }
}

export namespace AcceptProjectInvitationController {
  export type Params = {
    sentBy: string
    project: string
    invitationId: string
  }
}
