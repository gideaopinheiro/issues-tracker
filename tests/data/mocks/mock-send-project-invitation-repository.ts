import { SendProjectInvitationRepository } from '@/data/protocols/db/send-project-invitation-repository'
import { SendProjectInvitation } from '@/domain/usecases/send-project-invitation'
import { mockProjectInvitation } from '@/tests/domain/mocks/mock-project-invitation'

export const mockSendProjectInvitationRepository = (): SendProjectInvitationRepository => {
  class SendProjectInvitationRepositoryStub implements SendProjectInvitationRepository {
    async sendProjectInvitation (params: SendProjectInvitation.Params): Promise<SendProjectInvitation.Result> {
      return Promise.resolve(mockProjectInvitation())
    }
  }
  return new SendProjectInvitationRepositoryStub()
}
