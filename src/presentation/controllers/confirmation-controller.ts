import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest } from '@/presentation/helpers/http/http-helper'

export class ConfirmationController implements Controller {
  constructor (private readonly validation: Validation) {}

  async handle (request: ConfirmationController.Request): Promise<HttpResponse> {
    const error = this.validation.validate(request)
    if (error) {
      return badRequest(error)
    }
    return null
  }
}

export namespace ConfirmationController {
  export type Request = {
    confirmationCode: string
  }
}
