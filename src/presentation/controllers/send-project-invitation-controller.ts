import { ProjectInvitationModel } from '@/domain/models'
import { Controller, HttpResponse, Validation } from '@/presentation/protocols'

export class SendProjectInvitationController implements Controller {
  constructor (private readonly validation: Validation) {}

  async handle (params: SendProjectInvitationController.Params): Promise<HttpResponse> {
    this.validation.validate(params)
    return null
  }
}

export namespace SendProjectInvitationController {
  export type Params = ProjectInvitationModel
}
