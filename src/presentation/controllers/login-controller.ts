import { Authentication } from '@/domain/usecases/authentication'
import { badRequest, unauthorized } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpResponse, Validation } from '@/presentation/protocols'

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
    const accessToken = await this.authentication.auth(request)
    if (!accessToken) {
      return unauthorized()
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
