import { ProjectInvitationModel } from '@/domain/models'
import { badRequest, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { SendProjectInvitationRepository } from '@/data/protocols/db/send-project-invitation-repository'

export class SendProjectInvitationController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly sendProjectInvitationRepository: SendProjectInvitationRepository
  ) {}

  async handle (params: SendProjectInvitationController.Params): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(params)
      if (error) {
        return badRequest(error)
      }
      await this.sendProjectInvitationRepository.sendProjectInvitation(params)
      return ok('invitation sent')
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace SendProjectInvitationController {
  export type Params = ProjectInvitationModel
}
