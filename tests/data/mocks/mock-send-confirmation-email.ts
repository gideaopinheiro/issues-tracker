import { SendConfirmationEmail } from '../../data/protocols/comunication/send-confirmation-email'

export const mockSendConfirmationEmail = (): SendConfirmationEmail => {
  class SendConfirmationEmailStub implements SendConfirmationEmail {
    async send (params: SendConfirmationEmail.Params): Promise<SendConfirmationEmail.Result> {
      return Promise.resolve(true)
    }
  }
  return new SendConfirmationEmailStub()
}
