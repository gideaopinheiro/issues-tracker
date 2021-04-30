import { SendProjectInvitation } from '@/domain/usecases/send-project-invitation'

export const mockSendProjectInvitation = (): SendProjectInvitation => {
  class SendProjectInvitationStub implements SendProjectInvitation {
    async send (params: SendProjectInvitation.Params): Promise<void> {
      return Promise.resolve()
    }
  }
  return new SendProjectInvitationStub()
}
