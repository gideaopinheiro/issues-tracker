import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import { MissingParamError } from '@/presentation/errors/missing-param-error'
import { badRequest } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpResponse, Validation } from '@/presentation/protocols'

export class SignUpController implements Controller {
  constructor (private readonly validation: Validation) {}

  async handle (request: SignUpController.Request): Promise<HttpResponse> {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
    for (const field of requiredFields) {
      if (!request[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
    if (!this.validation.validate(request.email)) {
      return badRequest(new InvalidParamError('email'))
    }
  }
}

export namespace SignUpController {
  export type Request = {
    name: string
    email: string
    password: string
    passwordConfirmation: string
  }
}
