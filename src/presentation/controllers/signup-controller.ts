import { Controller, HttpResponse } from '@/presentation/protocols'
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http/http-helper'

export class SignUpController implements Controller {
  async handle (request: SignUpController.Request): Promise<HttpResponse> {
    const { name } = request
    if (!name) {
      return badRequest(new MissingParamError('name'))
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