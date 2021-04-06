import { SendProjectInvitation } from '@/domain/usecases/send-project-invitation'

export const mockSendProjectInvitation = (): SendProjectInvitation => {
  class SendProjectInvitationStub implements SendProjectInvitation {
    async add (params: SendProjectInvitation.Params): Promise<void> {
      return Promise.resolve()
    }
  }
  return new SendProjectInvitationStub()
}
