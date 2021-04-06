import { SendProjectInvitation } from '@/domain/usecases'

export interface SendProjectInvitationRepository {
  sendProjectInvitation: (params: SendProjectInvitationRepository.Params) => Promise<void>
}

export namespace SendProjectInvitationRepository {
  export type Params = SendProjectInvitation.Params
}
