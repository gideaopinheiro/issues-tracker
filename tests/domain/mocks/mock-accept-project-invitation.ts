import { AcceptProjectInvitation } from '@/domain/usecases'

export const mockAcceptProjectInvitation = (): AcceptProjectInvitation => {
  class AcceptProjectInvitationStub implements AcceptProjectInvitation {
    async accept (params: AcceptProjectInvitation.Params): Promise<void> {
    }
  }
  return new AcceptProjectInvitationStub()
}
