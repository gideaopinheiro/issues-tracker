import { SendProjectInvitationRepository } from '@/data/protocols/db/send-project-invitation-repository'
import { SendProjectInvitation } from '@/domain/usecases/send-project-invitation'

export const mockSendProjectInvitationRepository = (): SendProjectInvitationRepository => {
  class SendProjectInvitationRepositoryStub implements SendProjectInvitationRepository {
    async sendProjectInvitation (params: SendProjectInvitation.Params): Promise<void> {
      return Promise.resolve()
    }
  }
  return new SendProjectInvitationRepositoryStub()
}
