export interface AcceptProjectInvitation {
  accept: (params: AcceptProjectInvitation.Params) => Promise<void>
}

export namespace AcceptProjectInvitation {
  export type Params = {
    sentBy: string
    projectId: string
    invitationId: string
  }
}
