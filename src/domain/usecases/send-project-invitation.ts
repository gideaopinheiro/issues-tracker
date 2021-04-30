export interface SendProjectInvitation {
  send: (params: SendProjectInvitation.Params) => Promise<void>
}

export namespace SendProjectInvitation {
  export type Params = {
    from: string
    to: string
    status: string
    project: string
    message?: string
  }
}
