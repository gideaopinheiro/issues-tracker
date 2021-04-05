import { SendProjectInvitation } from '@/domain/usecases'

export interface SendProjectInvitationRepository {
  sendProjectInvitation: (params: SendProjectInvitationRepository.Params) => Promise<SendProjectInvitationRepository.Result>
}

export namespace SendProjectInvitationRepository {
  export type Params = SendProjectInvitation.Params
  export type Result = SendProjectInvitation.Result
}
