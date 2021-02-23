import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest } from '../helpers/http/http-helper'

export class LoginController implements Controller {
  constructor (private readonly validation: Validation) {}

  async handle (request: LoginController.Request): Promise<HttpResponse> {
    const error = this.validation.validate(request)
    if (error) {
      return badRequest(error)
    }
    return null
  }
}

export namespace LoginController {
  export type Request = {
    email: string
    password: string
  }
}
