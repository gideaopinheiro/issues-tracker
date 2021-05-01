import { AcceptProjectInvitation } from '@/domain/usecases'
import { badRequest } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpResponse, Validation } from '@/presentation/protocols'

export class AcceptProjectInvitationController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly acceptProjectInvitation: AcceptProjectInvitation
  ) {}

  async handle (params: AcceptProjectInvitationController.Params): Promise<HttpResponse> {
    const error = this.validation.validate(params)
    if (error) {
      return badRequest(error)
    }
    await this.acceptProjectInvitation.accept(params)
    return null
  }
}

export namespace AcceptProjectInvitationController {
  export type Params = {
    sentBy: string
    projectId: string
    invitationId: string
  }
}
