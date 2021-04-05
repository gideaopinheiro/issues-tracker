import { ProjectInvitationModel } from '@/domain/models'

export interface SendProjectInvitation {
  add: (params: SendProjectInvitation.Params) => Promise<SendProjectInvitation.Result>
}

export namespace SendProjectInvitation {
  export type Params = {
    from: string
    status: string
    project: string
    message?: string
  }
  export type Result = ProjectInvitationModel
}
