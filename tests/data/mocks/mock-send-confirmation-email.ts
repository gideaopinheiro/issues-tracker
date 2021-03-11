import { SendConfirmationEmail } from '@/data/protocols/comunication/send-confirmation-email'

export const mockSendConfirmationEmail = (): SendConfirmationEmail => {
  class SendConfirmationEmailStub implements SendConfirmationEmail {
    async send (params: SendConfirmationEmail.Params): Promise<void> {
      return Promise.resolve()
    }
  }
  return new SendConfirmationEmailStub()
}
