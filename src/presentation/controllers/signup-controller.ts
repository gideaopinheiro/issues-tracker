import { Controller } from '@/presentation/protocols/controller'

export class SignUpController implements Controller {
  async handle (request: SignUpController.Request): Promise<any> {
    const { name } = request
    if (!name) {
      return {
        statusCode: 400
      }
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