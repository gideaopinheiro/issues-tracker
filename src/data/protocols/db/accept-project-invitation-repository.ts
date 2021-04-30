import { AcceptProjectInvitation } from '@/domain/usecases/accept-project-invitation'

export interface AcceptProjectInvitationRepository {
  acceptProjectInvitation: (params: AcceptProjectInvitationRepository.Params) => void
}

export namespace AcceptProjectInvitationRepository {
  export type Params = AcceptProjectInvitation.Params
}
