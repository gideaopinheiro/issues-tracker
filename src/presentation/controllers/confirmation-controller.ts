import { badRequest, ok, unauthorized } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { AccountConfirmation } from '@/domain/usecases'

export class ConfirmationController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly accountConfirmation: AccountConfirmation
  ) {}

  async handle (request: ConfirmationController.Request): Promise<HttpResponse> {
    console.log(request)
    const error = this.validation.validate(request)
    if (error) {
      return badRequest(error)
    }
    const { confirmationCode } = request
    const account = await this.accountConfirmation.confirm(confirmationCode)
    if (!account) {
      return unauthorized()
    }
    return ok('account successfully verified')
  }
}

export namespace ConfirmationController {
  export type Request = {
    confirmationCode: string
  }
}
