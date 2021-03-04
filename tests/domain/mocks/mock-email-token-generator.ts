import { EmailTokenGenerator } from '@/domain/usecases/email-token-generator'

export const mockEmailTokenGenerator = (): EmailTokenGenerator => {
  class EmailTokenGeneratorStub implements EmailTokenGenerator {
    async generateToken (value: string): Promise<EmailTokenGenerator.Result> {
      return Promise.resolve('any_confirmation_code')
    }
  }
  return new EmailTokenGeneratorStub()
}
