export interface AcceptProjectInvitation {
  accept: (params: AcceptProjectInvitation.Params) => void
}

export namespace AcceptProjectInvitation {
  export type Params = {
    id: string
    from: string
  }
}
