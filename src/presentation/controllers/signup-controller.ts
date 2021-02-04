import { MissingParamError } from '@/presentation/errors/missing-param-error'
import { badRequest } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { CompareFieldsValidation } from '../../validation/validators/compare-fields-validation'

export class SignUpController implements Controller {
  constructor (
    private readonly emailValidation: Validation
  ) {}

  async handle (request: SignUpController.Request): Promise<HttpResponse> {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
    for (const field of requiredFields) {
      if (!request[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
    const emailValidationError = this.emailValidation.validate(request.email)
    if (emailValidationError) {
      return badRequest(emailValidationError)
    }

    const compareFieldsValidation = new CompareFieldsValidation('password', 'passwordConfirmation')
    const compareFieldsError = compareFieldsValidation.validate({ password: request.password, passwordConfirmation: request.passwordConfirmation })
    if (compareFieldsError) {
      return badRequest(compareFieldsError)
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
