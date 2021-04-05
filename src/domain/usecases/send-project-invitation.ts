import { ProjectInvitationModel } from '@/domain/models'

export interface SendProjectInvitation {
  add: (params: SendProjectInvitation.Params) => Promise<SendProjectInvitation.Result>
}

export namespace SendProjectInvitation {
  export type Params = ProjectInvitationModel
  export type Result = ProjectInvitationModel
}
