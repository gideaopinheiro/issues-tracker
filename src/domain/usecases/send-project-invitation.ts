import { ProjectInvitationModel } from '@/domain/models'

export interface SendProjectInvitation {
  add: (params: SendProjectInvitation.Params) => Promise<void>
}

export namespace SendProjectInvitation {
  export type Params = ProjectInvitationModel
}
