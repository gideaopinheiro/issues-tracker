import { AcceptProjectInvitationRepository } from '@/data/protocols/db/accept-project-invitation-repository'
import { AcceptProjectInvitation } from '@/domain/usecases/accept-project-invitation'

export class DbAcceptProjectInvitation implements AcceptProjectInvitation {
  constructor (private readonly acceptProjectInvitationRepository: AcceptProjectInvitationRepository) {}

  async accept (params: AcceptProjectInvitation.Params): Promise<void> {
    this.acceptProjectInvitationRepository.acceptProjectInvitation(params)
  }
}
