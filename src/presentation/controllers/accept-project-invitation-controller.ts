import { AcceptProjectInvitation } from '@/domain/usecases'
import { badRequest, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpResponse, Validation } from '@/presentation/protocols'

export class AcceptProjectInvitationController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly acceptProjectInvitation: AcceptProjectInvitation
  ) {}

  async handle (params: AcceptProjectInvitationController.Params): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(params)
      if (error) {
        return badRequest(error)
      }
      await this.acceptProjectInvitation.accept(params)
      return ok('invitation accepted successfully')
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace AcceptProjectInvitationController {
  export type Params = {
    sentTo: string
    sentBy: string
    projectId: string
    invitationId: string
  }
}
