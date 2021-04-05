import { SendProjectInvitation } from '@/domain/usecases/send-project-invitation'
import { mockProjectInvitation } from '@/tests/domain/mocks'

export const mockSendProjectInvitation = (): SendProjectInvitation => {
  class SendProjectInvitationStub implements SendProjectInvitation {
    async add (params: SendProjectInvitation.Params): Promise<SendProjectInvitation.Result> {
      return Promise.resolve(mockProjectInvitation())
    }
  }
  return new SendProjectInvitationStub()
}
