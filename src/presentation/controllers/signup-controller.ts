import { SendConfirmationEmail } from '@/data/protocols/comunication/send-confirmation-email'
import { AddAccount } from '@/domain/usecases'
import { EmailTokenGenerator } from '@/domain/usecases/email-token-generator'
import { EmailAlreadyInUseError } from '@/presentation/errors'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpResponse, Validation } from '@/presentation/protocols'

export class SignUpController implements Controller {
  constructor (
    private readonly addAccount: AddAccount,
    private readonly validation: Validation,
    private readonly emailTokenGenerator: EmailTokenGenerator,
    private readonly sendConfirmationEmail: SendConfirmationEmail
  ) {}

  async handle (request: SignUpController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const { name, email, password } = request
      const confirmationCode: string = await this.emailTokenGenerator.generateToken(email)
      const account = await this.addAccount.add({
        name,
        email,
        password,
        confirmationCode
      })
      if (!account) {
        return forbidden(new EmailAlreadyInUseError(email))
      }
      await this.sendConfirmationEmail.send({ name, email, confirmationCode })
      return ok('account successfully created')
    } catch (error) {
      return serverError(error)
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
