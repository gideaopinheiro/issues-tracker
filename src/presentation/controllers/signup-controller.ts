import { AddAccount } from '@/domain/usecases'
import { MissingParamError } from '@/presentation/errors/missing-param-error'
import { badRequest, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpResponse } from '@/presentation/protocols'
import { CompareFieldsValidation } from '@/validation/validators/compare-fields-validation'
import { EmailValidator } from '../../validation/protocols/email-validator'
import { InvalidParamError } from '../errors'

export class SignUpController implements Controller {
  constructor (
    private readonly emailValidator: EmailValidator,
    private readonly addAccount: AddAccount
  ) {}

  async handle (request: SignUpController.Request): Promise<HttpResponse> {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (!request[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { name, email, password, passwordConfirmation } = request
      const validEmail = this.emailValidator.isValid(email)
      if (!validEmail) {
        return badRequest(new InvalidParamError('email'))
      }

      const compareFieldsValidation = new CompareFieldsValidation('password', 'passwordConfirmation')
      const compareFieldsError = compareFieldsValidation.validate({ password, passwordConfirmation })
      if (compareFieldsError) {
        return badRequest(compareFieldsError)
      }
      const account = await this.addAccount.add({
        name,
        email,
        password
      })
      return ok(account)
    } catch (error) {
      return serverError()
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
