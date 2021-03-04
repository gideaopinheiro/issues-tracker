import { EmailTokenGenerator } from '@/domain/usecases/email-token-generator'
import jwt from 'jsonwebtoken'

export class EmailTokenGeneratorAdapter implements EmailTokenGenerator {
  constructor (private readonly secretConfirmationKey: string) {}

  async generateToken (value: string): Promise<string> {
    const confirmationCode = jwt.sign({ email: value }, this.secretConfirmationKey)
    return Promise.resolve(confirmationCode)
  }
}
