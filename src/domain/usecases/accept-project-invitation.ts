export interface AcceptProjectInvitation {
  accept: (params: AcceptProjectInvitation.Params) => Promise<void>
}

export namespace AcceptProjectInvitation {
  export type Params = {
    sentTo: string
    sentBy: string
    projectId: string
    invitationId: string
  }
}
