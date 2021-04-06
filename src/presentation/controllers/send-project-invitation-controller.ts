import { ProjectInvitationModel } from '@/domain/models'
import { badRequest } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { SendProjectInvitationRepository } from '@/data/protocols/db/send-project-invitation-repository'

export class SendProjectInvitationController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly sendProjectInvitationRepository: SendProjectInvitationRepository
  ) {}

  async handle (params: SendProjectInvitationController.Params): Promise<HttpResponse> {
    const error = this.validation.validate(params)
    if (error) {
      return badRequest(error)
    }
    await this.sendProjectInvitationRepository.sendProjectInvitation(params)
    return null
  }
}

export namespace SendProjectInvitationController {
  export type Params = ProjectInvitationModel
}
