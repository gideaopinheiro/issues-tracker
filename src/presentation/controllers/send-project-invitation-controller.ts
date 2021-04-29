import { SendProjectInvitation } from '@/domain/usecases'
import { badRequest, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpResponse, Validation } from '@/presentation/protocols'

export class SendProjectInvitationController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly sendProjectInvitation: SendProjectInvitation
  ) {}

  async handle (params: SendProjectInvitationController.Params): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(params)
      if (error) {
        return badRequest(error)
      }
      await this.sendProjectInvitation.add(params)
      return ok('invitation sent')
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace SendProjectInvitationController {
  export type Params = SendProjectInvitation.Params
}
