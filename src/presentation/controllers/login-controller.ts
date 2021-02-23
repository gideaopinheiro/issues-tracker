import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest } from '@/presentation/helpers/http/http-helper'
import { Authentication } from '@/domain/usecases/authentication'

export class LoginController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) {}

  async handle (request: LoginController.Request): Promise<HttpResponse> {
    const error = this.validation.validate(request)
    if (error) {
      return badRequest(error)
    }
    await this.authentication.auth(request)
    return null
  }
}

export namespace LoginController {
  export type Request = {
    email: string
    password: string
  }
}
