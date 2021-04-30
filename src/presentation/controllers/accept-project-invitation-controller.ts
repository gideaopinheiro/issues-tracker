import { Controller, HttpResponse, Validation } from '@/presentation/protocols'

export class AcceptProjectInvitationController implements Controller {
  constructor (private readonly validation: Validation) {}

  async handle (params: AcceptProjectInvitationController.Params): Promise<HttpResponse> {
    this.validation.validate(params)
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
