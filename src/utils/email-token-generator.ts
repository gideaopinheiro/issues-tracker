import { EmailTokenGenerator } from '@/domain/usecases/email-token-generator'

export class EmailTokenGeneratorAdapter implements EmailTokenGenerator {
  async generateToken (value: string): Promise<string> {
    return null
  }
}
